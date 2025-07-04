'use client'; // se estiver usando Next.js App Router

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';


interface CarrosselProps {
    fotos: string[];
}

export default function Classico({ fotos }: CarrosselProps) {



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

                delay: 4000,
                disableOnInteraction: true,
            }}

            className="mySwiper w-full h-[300px] lg:h-[350px]"
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
