'use client'; // se estiver usando Next.js App Router

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

import { useEffect, useState } from 'react';

interface CuboProps {
    fotos: File[] | string[];
    estiloBackground?: string;
}

export default function Cubo({ fotos, estiloBackground }: CuboProps) {

    const [ready, setReady] = useState(false); // controle de estado para imagens carregadas

    useEffect(() => {
        const preloadImages = async () => {
            const promises = fotos.map(src => new Promise((res) => {
                const img = new Image();
                img.src = src as string;
                img.onload = res;
            }));

            await Promise.all(promises);
            setReady(true); // controle de estado
        };

        preloadImages();
    }, [fotos]);


    return (



        <Swiper
            effect="cube"
            pagination={{ clickable: true }}
            modules={[EffectCube, Autoplay]}
            cubeEffect={{
                shadow: true,
                shadowScale: 0.12,

            }}

            // navigation={nextEl}


            autoplay={{
                delay: 4500,
                disableOnInteraction: true,
            }}
            className="mySwiper w-[80%] h-[300px] lg:h-[350px]"
        >
            {
                fotos.map((foto, i) => (
                    ready && // renderiza apenas se as imagens estiverem carregadas
                    <SwiperSlide key={i} >
                        <img
                            loading="lazy"
                            src={foto}
                            alt={`Slide ${i}`}
                            className="object-cover w-full h-full rounded-lg transition-opacity duration-250 ease-in"
                            onLoad={(e) => e.currentTarget.style.opacity = '1'}
                            style={{ opacity: 0 }}

                        />
                    </SwiperSlide>
                ))
            }
        </Swiper >

    );
}
