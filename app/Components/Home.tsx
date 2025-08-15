'use client';
import Image from 'next/image';
import Comentarios from './EstilosDeImagem/Comentarios';

export default function Home() {

    const depoimentos2 = [
        {
            nome: 'Ana e Pedro',
            tempo: '2 dias atrás',
            mensagem:
                'Com a Heartfy, pude expressar meu amor de um jeito totalmente diferente. Adorei criar uma página só para nós dois.',
            imagem: '/casal/casal1.jpg',
        },
        {
            nome: 'Lucas e Carol',
            tempo: '1 semana atrás',
            mensagem:
                'Criamos uma página com fotos e uma playlist que marcou nossa história. Foi emocionante ver a reação dela!',
            imagem: '/casal/casal2.jpg',
        },
        {
            nome: 'Camila e Felipe',
            tempo: '3 meses atrás',
            mensagem:
                'A surpresa que fiz pela hearty deixou o Felipe sem palavras. Experiência linda e fácil de montar!',
            imagem: '/casal/casal3.jpg',
        },
        {
            nome: 'Vanessa e Ricardo',
            tempo: '5 dias atrás',
            mensagem:
                'Heartfy ajudou a transformar nosso aniversário de namoro em algo inesquecível. Todo detalhe contou!',
            imagem: '/casal/casal4.jpg',
        },
        {
            nome: 'Isabela e João',
            tempo: '2 meses atrás',
            mensagem:
                'Adoramos poder colocar nossas músicas e fotos preferidas em um lugar só. a Heart é incrível!',
            imagem: '/casal/casal5.jpg',
        },
        {
            nome: 'Fernanda e Thiago',
            tempo: '4 semanas atrás',
            mensagem:
                'A página ficou linda, criativa e super personalizada. Foi o presente perfeito de aniversário de namoro.',
            imagem: '/casal/casal6.jpg',
        },
        {
            nome: 'Beatriz e Henrique',
            tempo: '6 meses atrás',
            mensagem:
                'Não imaginava que um presente digital pudesse emocionar tanto!',
            imagem: '/casal/casal7.jpg',
        },
        {
            nome: 'Carla e Bruno',
            tempo: '9 dias atrás',
            mensagem:
                'Muito fácil de usar e com um resultado lindo! Meu namorado chorou de emoção quando viu a página.',
            imagem: '/casal/casal8.jpg',
        },
        {
            nome: 'Renata e Eduardo',
            tempo: '3 semanas atrás',
            mensagem:
                'Conseguimos reunir tudo que marcou nosso relacionamento em um só lugar!',
            imagem: '/casal/casal9.webp',
        },
        {
            nome: 'Laura e Rafael',
            tempo: '1 mês atrás',
            mensagem:
                'Foi o presente mais significativo que já fiz. Simples, rápido e cheio de emoção. Obrigada.',
            imagem: '/casal/casal10.webp',
        },
    ];

    const depoimentos = [
        {
            nome: "Ana e Pedro",
            tempo: "2 dias atrás",
            mensagem:
                "Com a Heart, pude expressar meu amor de um jeito totalmente diferente. Adorei criar uma página só para nós dois.",
            imagem: '/casal/casal11.webp',
        },
        {
            nome: "Camila e Felipe",
            tempo: "4 meses atrás",
            mensagem:
                "A interface é simples e criar uma página com nossas fotos e músicas favoritas foi super especial!",
            imagem: '/casal/casal12.webp',
        },
        {
            nome: "Clara e Rafael",
            tempo: "2 meses atrás",
            mensagem:
                "Usar esse app foi incrível! A plataforma é muito intuitiva e fácil de usar. Conseguimos montar um presente digital perfeito com músicas que marcaram nossa relação.",
            imagem: '/casal/casal13.webp',
        },
        {
            nome: "Vanessa e Ricardo",
            tempo: "1 semana atrás",
            mensagem:
                "Esse presente tornou nosso relacionamento ainda mais especial. Ele amou a surpresa cheia de memórias.",
            imagem: '/casal/casal14.webp',
        },
        {
            nome: "Larissa e Tiago",
            tempo: "9 meses atrás",
            mensagem:
                "Ele não esperava por uma surpresa tão personalizada. Foi emocionante montar essa página com tudo o que amamos.",
            imagem: '/casal/casal15.webp',
        },
        {
            nome: "Lucas e Carol",
            tempo: "3 meses atrás",
            mensagem:
                "Montei uma página surpresa para a Carol, com nossas fotos de viagem e uma mensagem sincera. Ela adorou! Com certeza vou usar de novo.",
            imagem: '/casal/casal16.webp',
        },
        {
            nome: "Bia e Henrique",
            tempo: "1 ano atrás",
            mensagem:
                "A página ficou incrível e personalizada! Ele não esperava por algo tão emocionante.",
            imagem: '/casal/casal17.webp',
        },
        {
            nome: "Carla e Bruno",
            tempo: "4 meses atrás",
            mensagem:
                "Comemoramos nosso primeiro ano juntos de uma forma muito especial. A página personalizada foi o presente perfeito!",
            imagem: '/casal/casal18.webp',
        },
        {
            nome: "Mariana e João",
            tempo: "1 mês atrás",
            mensagem:
                "Adorei a experiência! Pude criar uma presente especial para o João com nossas fotos favoritas, uma playlist personalizada e um texto que representa nossa história. Ele ficou super emocionado quando viu!",
            imagem: '/casal/casal20.webp',
        },
    ];



    return (
        <main id='home' className=" min-h-screen w-full text-white overflow-x-hidden">


            {/* Hero */}
            <section className="px-6 py-24 text-center w-full ">
                <h1 id='tituloPrincipal' className="w-full text-4xl md:text-6xl font-bold mb-8 mt-2 md:w-[60%] mx-auto" style={{ fontFamily: 'telegraf' }}>
                    Surpreenda com um Presente Digital <span className='text-red-500'>inesquecível.</span>
                </h1>
                <p className="text-lg md:text-xl mt-4 w-full md:w-[30%] mx-auto mb-8">

                    Transforme emoções em experiências digitais únicas com fotos, música e QR Code. Personalize com o seu toque.
                </p>
                <a
                    href="/create"
                    className="inline-block mt-4 bg-[#ff00a0] hover:bg-[#CB1E97] transition text-white font-semibold py-5 px-6 rounded-xl text-lg"
                    style={{ fontFamily: 'TT Commons Pro' }}
                >
                    CRIAR MEU PRESENTE AGORA
                </a>
            </section>







            {/* Etapas de Criação */}
            <section className="py-20 px-6 w-full">
                <h1 id='comoFazer' className="text-3xl font-bold text-center mb-14" >
                    Como fazer?
                </h1>
                <div id='grid' className="grid grid-cols-1 gap-3 w-[90%] 
                 md:w-[60%] mx-auto my-auto md:gap-4 md:grid md:grid-cols-2 md:gap-4">
                    {[
                        {
                            icon: "/icons/2.svg",
                            title: "Personalize",
                            text: "Escolha as fotos, escreva mensagens, adicione músicas e efeitos especiais. A página é sua.",

                        },
                        {
                            icon: "/icons/1.svg",
                            title: "Pague com segurança",
                            text: "Escolha o plano ideal e finalize com pagamentos 100% protegidos. Simples e rápido.",

                        },
                        {
                            icon: "/icons/3.svg",
                            title: "Receba o acesso",
                            text: "Você receberá um link exclusivo e QR Code direto no seu e-mail em poucos minutos.",

                        },
                        {
                            icon: "/icons/4.svg",
                            title: "Compartilhe o amor",
                            text: "Envie o presente digital para quem você ama e surpreenda de forma inesquecível.",

                        },
                    ].map(({ icon, title, text }, index) => (
                        <div id='card'
                            key={index}
                            className={`bg-[#3B1A50] flex flex-col items-center justify-center
               text-center rounded-xl py-6 px-7 mx-auto  w-[full] h-[250px] 
               md:w-[400px] md:h-[300px] md:px-5 max-w-[700px] shadow-md}
            `}
                        >
                            <Image
                                src={icon}
                                alt={`Ícone ${title}`}
                                width={55}
                                height={55}
                                className="mb-4"
                            />
                            <div className='align-center flex flex-col items-center text-black-500'>
                                <h2 id='text-card' className="text-2xl font-semibold mb-4">{title}</h2>
                                <h3 id='text-card' className="text-lg">{text}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            <section className="pb-12 px-6 ">

                <div className="flex flex-wrap justify-center items-start gap-4 w-[90%] md:w-full mx-auto">
                    <h1 className='text-3xl align-center w-full text-center mb-12 md:w-[30%] mt-32'>Uma declaração de amor que ficará para <span className='text-red-500'>sempre.</span></h1>
                    <Image
                        src={'/example.webp'}
                        alt={`Ícone `}
                        width={500}
                        height={500}
                        className="mb-4"
                    />

                </div>

            </section>

            {/* Prova Social */}
            <section id='feedbacks' className="py-20 px-6">
                <h1 className="text-3xl font-bold text-center w-full" >
                    O que estão dizendo?
                </h1>

            </section>

            <div className=' pb-4 border-none  w-full'>



                <Comentarios depoimentos={depoimentos} speed={15800} />
                <div className='mt-4'></div>
                <Comentarios depoimentos={depoimentos2} speed={9200} />
            </div>

            {/* CTA final */}
            <section className="py-20 px-6 text-center  ">
                <h1 className="text-3xl font-bold mb-4" >
                    Comece agora sua surpresa <span className='text-red-500'>inesquecível.</span>
                </h1>
                <p className="mb-8 text-white/90 text-lg" >
                    Leva menos de 5 minutos. Emocione alguém hoje.
                </p>
                <a
                    href="/create"
                    className="inline-block bg-[#ff00a0] hover:bg-[#CB1E97] font-semibold py-5 px-6 rounded-xl text-lg transition text-white"
                    style={{ fontFamily: 'TT Commons Pro' }}
                >
                    CRIAR MEU PRESENTE AGORA
                </a>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white text-center py-1">
                <p >&copy; {new Date().getFullYear()} Heartfy. Todos os direitos reservados.</p>
                <p className="text-sm mt-2" >
                    Feito com ❤️ para transformar emoções em memórias digitais.
                </p>
            </footer>
        </main >
    );
}
