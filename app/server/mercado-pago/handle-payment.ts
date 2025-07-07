import 'server-only';

import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

import { sendEmailWithQR } from '../../utils/email';
import { generateQrCode } from '../../utils/qrCode';
import { createFirebaseCheckout } from '@/app/hooks/firebase';

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {

    console.log('entrou no handlePayment')


    const metadata = paymentData.metadata;
    const userEmail = metadata?.user_email;
    const testeId = metadata?.teste_id;

    const {
        slug,
        title,
        description,
        data_inicio,
        fotos,
        estilo_foto,
        estilo_background,
        url_fotos,
        music,
        status } = metadata;


    // const { createFirebaseCheckout } = useFirebase();


    console.log("Chamando firebase com dados:");
    console.log({
        slug,
        title,
        description,
        data_inicio,
        estilo_foto,
        fotos,
        estilo_background,
        url_fotos,
        music,
        status: 'pago'
    });


    try {
        await createFirebaseCheckout(
            {
                slug,
                title,
                description,
                dataInicio: data_inicio,
                estiloFoto: estilo_foto,
                estiloBackground: estilo_background,
                urlFotos: url_fotos,
                music,
                status: 'pago'
            }
        );

        const url = `https://heartyfy.vercel.app/${slug}`;
        const qrImageBase64 = await generateQrCode(url);


        await sendEmailWithQR(userEmail, url, qrImageBase64);
        console.log('email Enviado')

    }
    catch (e) {
        console.log('error no handle payment: ', e)
    }


    return;
}