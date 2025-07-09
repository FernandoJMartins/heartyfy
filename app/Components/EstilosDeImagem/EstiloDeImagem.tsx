'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import {
    EffectCards,
    EffectCube,
    EffectFade,
    Autoplay,
    EffectCoverflow,
    Pagination
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-fade';

interface EstiloDeImagemProps {
    fotos: File[] | string[];
    estilo: string;
}

const renderSlides = (fotos: File[] | string[], imgClass: string) =>
    fotos.map((foto, i) => (
        <SwiperSlide key={i} className="flex items-center justify-center">
            <img
                src={typeof foto === 'string' ? foto : URL.createObjectURL(foto)}
                alt={`Slide ${i}`}
                className={imgClass}
            />
        </SwiperSlide>
    ));

export default function EstiloDeImagem({ fotos, estilo }: EstiloDeImagemProps) {
    const commonProps = {
        pagination: { clickable: true },
        autoplay: {
            delay: 2500,
            disableOnInteraction: true
        }
    };

    const heightClass = 'w-full h-[300px] lg:h-[350px]';

    switch (estilo) {
        case 'carrossel':
            return (
                <Swiper
                    {...commonProps}
                    effect="coverflow"
                    grabCursor
                    modules={[EffectCoverflow, Autoplay]}
                    coverflowEffect={{
                        depth: 100,
                        modifier: 1,
                        rotate: 50,
                        scale: 1,
                        slideShadows: true,
                        stretch: 0
                    }}
                    className={`mySwiper ${heightClass}`}
                >
                    {renderSlides(fotos, 'object-cover w-[80%] h-[300px] lg:h-[350px] rounded-lg')}
                </Swiper>
            );

        case 'classico':
            return (
                <Swiper
                    {...commonProps}
                    effect="cards"
                    grabCursor
                    modules={[EffectCards, Autoplay]}
                    cardsEffect={{
                        perSlideOffset: 8,
                        perSlideRotate: 0,
                        rotate: true,
                        slideShadows: true
                    }}
                    className={`mySwiper ${heightClass}`}
                >
                    {renderSlides(fotos, 'object-cover w-full h-[300px] lg:h-[350px] rounded-lg')}
                </Swiper>
            );

        case 'cubo':
            return (
                <Swiper
                    {...commonProps}
                    effect="cube"
                    modules={[EffectCube, Autoplay]}
                    cubeEffect={{
                        shadow: true,
                        shadowScale: 0.12
                    }}
                    className="mySwiper w-[80%] h-[300px] lg:h-[350px]"
                >
                    {renderSlides(fotos, 'object-cover w-full h-full rounded-lg')}
                </Swiper>
            );

        case 'romantico':
            return (
                <Swiper
                    {...commonProps}
                    effect="fade"
                    modules={[EffectFade, Autoplay]}
                    className="mySwiper w-[80%] h-[300px] lg:h-[350px]"
                >
                    {renderSlides(fotos, 'object-cover w-full h-[300px] lg:h-[350px] rounded-lg')}
                </Swiper>
            );

        default:
            return null;
    }
}
