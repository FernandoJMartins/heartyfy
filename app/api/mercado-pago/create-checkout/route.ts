import { NextRequest, NextResponse } from "next/server";
import { Preference } from "mercadopago";
import mpClient from "@/app/lib/mercado-pago";

export async function POST(req: NextRequest) {
    const { testeId, userEmail, unit_price } = await req.json();

    console.log('unit_price:', unit_price);
    try {

        const preference = new Preference(mpClient);

        const createdPreference = await preference.create({
            body: {
                external_reference: testeId, // IMPORTANTE: Isso aumenta a pontuação da sua integração com o Mercado Pago - É o id da compra no nosso sistema
                metadata: {
                    testeId, // O Mercado Pago converte para snake_case, ou seja, testeId vai virar teste_id
                    // userEmail: userEmail,
                    // plan: '123'
                    //etc
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
                        unit_price: unit_price,
                        currency_id: "BRL",
                        category_id: "category", // Recomendado inserir, mesmo que não tenha categoria - Aumenta a pontuação da sua integração com o Mercado Pago
                    },
                ],
                payment_methods: {
                    // Descomente para desativar métodos de pagamento
                    //   excluded_payment_methods: [
                    //     {
                    //       id: "bolbradesco",
                    //     },
                    //     {
                    //       id: "pec",
                    //     },
                    //   ],
                    //   excluded_payment_types: [
                    //     {
                    //       id: "debit_card",
                    //     },
                    //     {
                    //       id: "credit_card",
                    //     },
                    //   ],
                    installments: 12, // Número máximo de parcelas permitidas - calculo feito automaticamente
                },
                auto_return: "approved",
                back_urls: {
                    success: `https://heartyfy.vercel.app/?status=sucesso`,
                    failure: `https://heartyfy.vercel.app/?status=falha`,
                    pending: `https://heartyfy.vercel.app/api/mercado-pago/pending`, // Criamos uma rota para lidar com pagamentos pendentes
                },
            },
        });

        if (!createdPreference.id) {
            throw new Error("No preferenceID");
        }

        return NextResponse.json({
            preferenceId: createdPreference.id,
            initPoint: createdPreference.init_point,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.error();
    }
}