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
                console.log(paymentId)
                if (!paymentId) throw new Error("paymentId não encontrado");

                const paymentClient = new Payment(mpClient);
                const paymentData = await paymentClient.get({ id: paymentId });

                if (
                    paymentData.status === 'approved' ||
                    paymentData.date_approved !== null
                ) {

                    await handleMercadoPagoPayment(paymentData);

                }
            case 'merchant_order':
                // implemente se precisar tratar merchant order
                console.log("Merchant order recebido", data);
                break;
            case 'subscription_preapproval':
                console.log("Evento de assinatura recebido", data);
                break;
            default:
                console.log(`Unhandled event type: ${type}`);
                break;
        }

        return NextResponse.json({ received: true }, { status: 200 });

    } catch (err: any) {
        // Se for 404 (payment não encontrado), retorna 200 para o Mercado Pago não tentar novamente
        if (err?.status === 404 || err?.message === 'Payment not found') {
            return NextResponse.json({ received: true }, { status: 200 });
        }
        console.error('Error processing Mercado Pago webhook:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

