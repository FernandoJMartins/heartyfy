'use client';
import Image from 'next/image';

export default function Home() {
    return (
        <main className="min-h-screen w-full text-white">

            {/* Hero */}
            <section className="px-6 py-24 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'telegraf' }}>
                    Surpreenda com um Presente Digital Inesquecível 💖
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8" style={{ fontFamily: 'barlow' }}>
                    Transforme emoções em experiências digitais únicas com fotos, música e QR Code. Personalize com o seu toque.
                </p>
                <a
                    href="/create"
                    className="inline-block bg-[#860B6C] hover:bg-[#a84f8e] transition text-white font-semibold py-3 px-6 rounded-xl text-lg"
                    style={{ fontFamily: 'TT Commons Pro' }}
                >
                    Criar meu presente agora
                </a>
            </section>





            {/* Etapas de Criação */}
            <section className="bg-[#860B6C] py-20 px-6 text-white">
                <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: 'telegraf' }}>
                    Crie seu presente em poucos passos
                </h2>

                <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
                    {[
                        {
                            step: '1',
                            title: 'Personalize',
                            text: 'Escolha suas fotos, escreva mensagens, adicione músicas e efeitos especiais. A página é feita do seu jeito.',
                            icon: '/images/placeholder-customize.png',
                        },
                        {
                            step: '2',
                            title: 'Pague com segurança',
                            text: 'Escolha o plano ideal e finalize com pagamentos 100% protegidos. Simples e rápido.',
                            icon: '/images/placeholder-payment.png',
                        },
                        {
                            step: '3',
                            title: 'Receba o acesso',
                            text: 'Você receberá um link exclusivo e QR Code direto no seu e-mail em poucos minutos.',
                            icon: '/images/placeholder-qr.png',
                        },
                        {
                            step: '4',
                            title: 'Compartilhe o amor',
                            text: 'Envie o presente digital para quem você ama e surpreenda de forma inesquecível.',
                            icon: '/images/placeholder-share.png',
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white text-[#17203F] rounded-2xl p-6 text-center flex flex-col items-center justify-between shadow-md"
                        >
                            <div className="text-4xl font-bold bg-[#17203F] text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                {item.step}
                            </div>
                            <Image
                                src={item.icon}
                                alt={item.title}
                                width={64}
                                height={64}
                                className="mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'garet' }}>
                                {item.title}
                            </h3>
                            <p className="text-sm" style={{ fontFamily: 'barlow' }}>{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>



            {/* Benefícios */}
            <section className="py-20 px-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: 'barlow' }}>
                    Por que usar o Heartyfy?
                </h2>
                <div className="grid md:grid-cols-3 gap-10">
                    {[
                        {
                            title: "100% Personalizado",
                            desc: "Monte sua página com fotos, mensagens e músicas. Uma lembrança única, feita por você.",
                        },
                        {
                            title: "Compartilhamento fácil",
                            desc: "Receba um link e QR Code exclusivo para enviar por onde quiser. Simples e mágico.",
                        },
                        {
                            title: "Memórias eternizadas",
                            desc: "Guarde sentimentos importantes de forma moderna e tocante, acessível sempre.",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="rounded-2xl p-6 shadow-md border border-white/10 bg-white text-[#17203F]"
                        >
                            <Image
                                src="/images/placeholder-benefit.png"
                                alt="benefício"
                                width={100}
                                height={100}
                                className="mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2 text-center" style={{ fontFamily: 'garet' }}>
                                {item.title}
                            </h3>
                            <p className="text-sm text-center" style={{ fontFamily: 'barlow' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>





            {/* Prova Social */}
            <section className="py-20 px-6 bg-[#860B6C]">
                <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: 'barlow' }}>
                    O que estão dizendo 💬
                </h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[
                        {
                            name: "Ana Luiza",
                            text: "Presenteei meu namorado e ele chorou. O Heartyfy tornou tudo inesquecível!",
                        },
                        {
                            name: "Gabriel R.",
                            text: "Fácil de montar, lindo visualmente e super diferente. Amei demais!",
                        },
                        {
                            name: "Juliana M.",
                            text: "É como criar um pedacinho da nossa história em uma página. Muito especial.",
                        },
                    ].map((item, i) => (
                        <div key={i} className="bg-white text-[#17203F] rounded-xl p-6" style={{ fontFamily: 'garet' }}>
                            <p className="italic mb-4">“{item.text}”</p>
                            <span className="font-bold">– {item.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA final */}
            <section className="py-20 px-6 text-center">
                <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'barlow' }}>
                    Comece agora sua surpresa inesquecível!
                </h2>
                <p className="mb-8 text-white/90" style={{ fontFamily: 'garet' }}>
                    Leva menos de 5 minutos. Emocione alguém hoje.
                </p>
                <a
                    href="/create"
                    className="inline-block bg-[#860B6C] hover:bg-[#a84f8e] font-semibold py-3 px-6 rounded-xl text-lg transition text-white"
                    style={{ fontFamily: 'TT Commons Pro' }}
                >
                    Criar presente digital
                </a>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white text-center py-1">
                <p style={{ fontFamily: 'barlow' }}>&copy; {new Date().getFullYear()} Heartyfy. Todos os direitos reservados.</p>
                <p className="text-sm mt-2" style={{ fontFamily: 'garet' }}>
                    Feito com ❤️ para transformar emoções em memórias digitais.
                </p>
            </footer>
        </main>
    );
}
