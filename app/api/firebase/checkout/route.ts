import { NextResponse } from 'next/server';
import { firestore } from '@/app/lib/firebase'
import { setDoc, doc } from 'firebase/firestore'

export async function POST(req: Request) {
    console.log("🚀 ROTA POST foi chamada");
    const body = await req.json();

    console.log(body)

    const { slug, title, description, dataInicio, fotos, estiloFoto, estiloBackground, urlFotos } = body;




    await setDoc(doc(firestore, 'sites', slug), {

        title: title,
        description: description,
        dataInicio: dataInicio,
        fotos: fotos,
        estiloFoto: estiloFoto,
        estiloBackground: estiloBackground,
        urlFotos: urlFotos,
    })

    return NextResponse.json({ redirectUrl: `/${slug}` })

}