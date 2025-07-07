import { NextResponse } from 'next/server';
import { firestore } from '@/app/lib/firebase';
import { setDoc, doc } from 'firebase/firestore';

export async function POST(req: Request) {
    console.log("🚀 ROTA POST foi chamada");

    try {
        const body = await req.json();

        console.log("📦 Dados recebidos no body:", body);

        const {
            slug, title, description,
            dataInicio, estiloFoto,
            estiloBackground, urlFotos,
            music, status
        } = body;

        if (!slug || !title) {
            console.warn("⚠️ slug ou title estão ausentes!");
            return NextResponse.json({ error: "slug ou title estão ausentes" }, { status: 400 });
        }

        await setDoc(doc(firestore, 'sites', slug), {
            title,
            description,
            dataInicio,
            estiloFoto,
            estiloBackground,
            urlFotos,
            music,
            status
        });

        return NextResponse.json({ redirectUrl: `/${slug}` });

    } catch (err) {
        console.error("❌ Erro ao salvar no Firebase:", err);
        return NextResponse.json({ error: "Erro interno no servidor Firebase" }, { status: 500 });
    }
}
