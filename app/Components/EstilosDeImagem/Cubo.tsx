'use client'; // se estiver usando Next.js App Router

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';


interface CuboProps {
    fotos: File[] | string[];
}

export default function Cubo({ fotos }: CuboProps) {



    return (



        <Swiper
            effect="cube"
            pagination={{ clickable: true }}
            modules={[EffectCube, Autoplay, Navigation, Pagination]}
            cubeEffect={{
                shadow: true,
                shadowScale: 0.12,

            }}

            // navigation={nextEl}


            autoplay={{
                delay: 4000,
                disableOnInteraction: true,
            }}
            className="mySwiper w-[80%] h-[300px] lg:h-[350px]"
        >
            {
                fotos.map((foto, i) => (
                    <SwiperSlide key={i}>
                        <img
                            src={foto}
                            alt={`Slide ${i}`}
                            className="object-cover w-full h-[300px] lg:h-[350px] rounded-lg z-99999"
                        />
                    </SwiperSlide>
                ))
            }
        </Swiper >

    );
}
