'use client'; // se estiver usando Next.js App Router

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';


interface RomanticoProps {
    fotos: string[];
}

export default function Romantico({ fotos }: RomanticoProps) {

    return (

        <Swiper
            effect="fade"
            pagination={{ clickable: true }}
            modules={[EffectFade, Autoplay]}
            autoplay={{
                delay: 4000,
                disableOnInteraction: true,
            }}
            className="mySwiper w-[80%] h-[300px] lg:h-[350px]"
        >
            {fotos.map((foto, i) => (
                <SwiperSlide key={i}>
                    <img
                        src={foto}
                        alt={`Slide ${i}`}
                        className="object-cover w-full h-[300px] lg:h-[350px] rounded-lg z-99999"
                    />
                </SwiperSlide>
            ))}
        </Swiper>

    );
}
