'use client'; // se estiver usando Next.js App Router

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';

import { useEffect, useState } from 'react';

interface CarrosselProps {
    fotos: File[] | string[];
    estiloBackground?: string;
}

export default function Classico({ fotos, estiloBackground }: CarrosselProps) {

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
            effect="cards"

            grabCursor={true}
            pagination={{ clickable: true }}
            modules={[EffectCards, Autoplay]}

            cardsEffect={{
                perSlideOffset: 8,
                perSlideRotate: 0,
                rotate: true,
                slideShadows: true
            }}


            autoplay={{
                delay: 3500,
                disableOnInteraction: true,
            }}

            className="mySwiper w-full h-[300px] lg:h-[350px]"
        >
            {fotos.map((foto, i) => (

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


            ))}
        </Swiper>

    );
}
