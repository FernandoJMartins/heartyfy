'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Autoplay, FreeMode
    , Pagination
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';

interface Depoimento {
    nome: string;
    tempo: string;
    mensagem: string;
    imagem: string;
}

interface ComentariosProps {
    depoimentos: Depoimento[];
    speed?: number; // velocidade do scroll, padrão 1000ms
}

export default function Comentarios({ depoimentos, speed }: ComentariosProps) {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleRezise = () => {
            setIsMobile(window.innerWidth < 768);
        }
        handleRezise(); // inicializa o estado
        window.addEventListener('resize', handleRezise);
        return () => window.removeEventListener('resize', handleRezise);
    }, []);

    const slidesPerView = isMobile ? 1.2 : 2.9;

    return (
        <Swiper
            modules={[FreeMode
                , Autoplay]}


            slidesPerView={slidesPerView}           // importante para largura fixa funcionar


            grid={{ rows: 1, fill: 'row' }}
            spaceBetween={20}                // gap entre slides horizontal e vertical
            loop={true}
            autoplay={{
                delay: 0,
                disableOnInteraction: false,
            }}
            speed={speed}
            initialSlide={0}
            // velocidade do scroll
            freeMode={true}
            className="w-full py-8 px-10 overflow-visible"  // overflow para mostrar o "peek"
        >
            {depoimentos.map((depo, i) => (
                <SwiperSlide
                    key={i}
                    className="w-[50px] flex justify-center" // força largura fixa do slide
                >
                    <div className="bg-gradient-to-br bg-gradient-to-br from-pink-600 to-pink-700 text-white p-6 rounded-xl shadow-lg
        h-[300px] flex flex-col justify-between min-h-[200px] w-full 
        hover:border"
                    >


                        <div className="flex items-center gap-4">
                            <img
                                src={depo.imagem}
                                alt={depo.nome}
                                className="w-12 h-12 rounded-full object-cover border-2 border-white"
                            />
                            <div>
                                <h3 className="font-semibold">{depo.nome}</h3>
                                <p className="text-sm text-pink-300">{depo.tempo}</p>
                            </div>
                        </div>
                        <p className="mt-4 italic text-xl">"{depo.mensagem}"</p>
                        <div className="mt-4 text-yellow-400 text-sm">★★★★★</div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
