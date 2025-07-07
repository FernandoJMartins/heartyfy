import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import mpClient from "@/app/lib/mercado-pago"; // seu client MercadoPago configurado

export async function POST(req: NextRequest) {
    try {
        const {
            testeId,
            userEmail,
            unit_price,
            slug,
            title,
            description,
            dataInicio,
            fotos,
            estiloFoto,
            estiloBackground,
            urlFotos,
            music,
            status
        } = await req.json();

        const preference = new Preference(mpClient);

        const createdPreference = await preference.create({
            body: {
                external_reference: testeId, // sua referência interna para correlacionar depois
                metadata: {
                    testeId,
                    userEmail,
                    unit_price,
                    slug,
                    title,
                    description,
                    dataInicio,
                    fotos,
                    estiloFoto,
                    estiloBackground,
                    urlFotos,
                    music,
                    status
                },
                ...(userEmail && {
                    payer: {
                        email: userEmail,
                    },
                }),
                items: [
                    {
                        id: "id-do-seu-produto",
                        description: "Heartyfy",
                        title: "Heartyfy - Presenteie com Amor",
                        quantity: 1,
                        unit_price,
                        currency_id: "BRL",
                        category_id: "category",
                    },
                ],
                payment_methods: {
                    installments: 12,
                },
                auto_return: "approved",
                back_urls: {
                    success: `https://heartyfy.vercel.app/sucesso`,
                    failure: `https://heartyfy.vercel.app/?status=falha`,
                    pending: `https://heartyfy.vercel.app/api/mercado-pago/pending`,
                },
            },
        });

        if (!createdPreference.id) throw new Error("No preferenceID");

        return NextResponse.json({
            preferenceId: createdPreference.id,
            initPoint: createdPreference.init_point,
        });
    } catch (error) {
        console.error("Erro ao criar preferência:", error);
        return NextResponse.error();
    }
}
