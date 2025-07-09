import React, { useEffect, useState } from 'react';
import Classico from '../Components/EstilosDeImagem/Classico';
import Carrossel from '../Components/EstilosDeImagem/Carrossel';
import Cubo from '../Components/EstilosDeImagem/Cubo';
import Romantico from '../Components/EstilosDeImagem/Romantico';



export default function Fotos(fotos: string[] | File[], estiloFoto: string) {

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
        <>
            {fotos.length > 0 ? (


                <div className="w-full h-full  flex items-center justify-center">


                    {/* <div> */}

                    {(fotos.length === 1) ? (
                        ready &&
                        <img loading="lazy"
                            src={(fotos[0])}
                            alt="Foto do Casal"
                            className="w-64 h-64 object-cover rounded-sm transition-opacity duration-250 ease-in"
                            onLoad={(e) => e.currentTarget.style.opacity = '1'}
                            style={{ opacity: 0 }}
                        />
                    ) : (

                        <div className="relative w-full h-full overflow-hidden">

                            {estiloFoto === 'classico' && (
                                <div className='w-[80%] mx-auto h-full'>
                                    <Classico fotos={fotos} />
                                </div>
                            )}

                            {estiloFoto === 'carrossel' && (
                                <div className='w-full mx-auto h-full'>
                                    <Carrossel fotos={fotos} />
                                </div>

                            )}

                            {estiloFoto === 'cubo' && (
                                <div className='w-[full] mx-auto h-full'>
                                    <Cubo fotos={fotos} />
                                </div>
                            )}


                            {estiloFoto === 'romantico' && (
                                <div className='w-[full] mx-auto h-full'>
                                    <Romantico fotos={fotos} />
                                </div>
                            )}


                        </div>
                    )
                    }

                </div>


            ) : (
                <div className="w-[200px] h-[250px] rounded-sm border border-pink-500 flex items-center justify-center">
                    <img className="" width="80" height="80" src="https://img.icons8.com/comic/100/ffffff/camera.png" alt="camera" />
                </div>
            )}
        </>
    )
}