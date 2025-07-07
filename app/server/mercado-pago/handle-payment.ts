import 'server-only';
import useFirebase from '../../hooks/useFirebase'
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from '@/app/lib/firebase'

import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes";

import { sendEmailWithQR } from '../../utils/email';
import { generateQrCode } from '../../utils/qrCode';

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {


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








    const url = `https://heartyfy.vercel.app/${slug}`;
    const qrImageBase64 = await generateQrCode(url);

    await sendEmailWithQR(userEmail, url, qrImageBase64);


    return;
}