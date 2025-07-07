import 'server-only';

import firebase from '../../hooks/firebase';


import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

import { sendEmailWithQR } from '../../utils/email';
import { generateQrCode } from '../../utils/qrCode';

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {

    console.log('entrou no handlePayment')


    const metadata = paymentData.metadata;
    const userEmail = metadata?.user_email;
    const testeId = metadata?.teste_id;
    const slug = metadata?.slug;
    const title = metadata?.title;
    const description = metadata?.description;
    const dataInicio = metadata?.dataInicio;
    const fotos = metadata?.fotos;
    const estiloFoto = metadata?.estiloFoto;
    const estiloBackground = metadata?.estiloBackground;
    const urlFotos = metadata?.urlFotos;
    const musicSelectedFromChild = metadata?.musicSelectedFromChild;


    // const { createFirebaseCheckout } = useFirebase();


    await firebase(
        {
            slug: slug,
            title: title,
            description: description,
            dataInicio: dataInicio,
            fotos: fotos,
            estiloFoto: estiloFoto,
            estiloBackground: estiloBackground,
            urlFotos: urlFotos,
            music: musicSelectedFromChild,
            status: 'pago'
        }
    );


    console.log(metadata)

    const url = `https://heartyfy.vercel.app/${slug}`;
    const qrImageBase64 = await generateQrCode(url);

    console.log(url);
    console.log(qrImageBase64)

    await sendEmailWithQR(userEmail, url, qrImageBase64);
    console.log('email Enviado')

    return;
}