'use client'; // se estiver usando Next.js App Router

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';



interface CarrosselProps {
    fotos: File[] | string[];
}

export default function Carrossel({ fotos }: CarrosselProps) {


    return (



        <Swiper
            effect="coverflow"

            grabCursor={true}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Autoplay]}

            coverflowEffect={{
                depth: 100,
                modifier: 1,
                rotate: 50,
                scale: 1,
                slideShadows: true,
                stretch: 0
            }}

            autoplay={{

                delay: 4000,
                disableOnInteraction: true,
            }}

            className="mySwiper w-full h-[300px] lg:h-[350px]"
        >
            {fotos.map((foto, i) => (
                <SwiperSlide key={i} className='flex items-center justify-center'>
                    <img
                        src={foto}
                        alt={`Slide ${i}`}
                        className="object-cover w-[80%] mx-auto h-[300px] lg:h-[350px] rounded-lg z-99999"
                    />
                </SwiperSlide>
            ))}
        </Swiper>

    );
}
