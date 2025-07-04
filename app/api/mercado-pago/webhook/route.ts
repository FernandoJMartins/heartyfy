// app/api/mercadopago-webhook/route.js

import { NextResponse } from "next/server";
import { Payment } from "mercadopago";
import mpClient, { verifyMercadoPagoSignature } from "@/app/lib/mercado-pago";
import { handleMercadoPagoPayment } from "@/app/server/mercado-pago/handle-payment";

export async function POST(request: Request) {

    try {

        verifyMercadoPagoSignature(request);

        const body = await request.json();

        const { type, data } = body;

        switch (type) {

            case 'payment':
                const paymentId = data.id;

                if (!paymentId) throw new Error("paymentId não encontrado");

                const paymentClient = new Payment(mpClient);
                const paymentData = await paymentClient.get({ id: paymentId });

                if (
                    paymentData.status === 'approved' ||
                    paymentData.date_approved !== null
                ) {
                    await handleMercadoPagoPayment(paymentData);
                }
                break;
            // case "subscription_preapproval": Eventos de assinatura
            //   console.log("Subscription preapproval event");
            //   console.log(data);
            //   break;

            default:
                console.log(`Unhandled event type: ${type}`);
                break;
        }
        return NextResponse.json({ received: true }, { status: 200 });
    } catch (error) {
        console.error('Error processing Mercado Pago webhook:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

