'use client';

import { useEffect, useState } from "react";
import Carrossel from "./EstilosDeImagem/Carrossel";
import Classico from "./EstilosDeImagem/Classico";
import Cubo from "./EstilosDeImagem/Cubo";
import Romantico from "./EstilosDeImagem/Romantico";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Fotos from "./Fotos";
import CustomAudioPlayer from "./CustomAudioPlayer";


type Props = {
    url: string;
    title: string;
    description: string;
    dataInicio: string;
    urlFotos: string[] | File[];
    estiloFoto: string;// Array of File objects for photos
    estiloBackground?: string;
    music: string;
    status: string;
};

export default function BrowserMockup({ url, title, description, dataInicio, urlFotos, estiloFoto, estiloBackground, music, status }: Props) {


    const [fotosState, setFotosState] = useState<string[] | File[]>([]);



    var bgColor = estiloBackground;

    if (status === 'pago') {
        document.body.style.backgroundColor = estiloBackground || '#021935';
    }



    useEffect(() => {
        if (urlFotos.length === 0) return;

        if (typeof urlFotos[0] === 'string') {
            setFotosState(urlFotos as string[])
        }
        else {
            const fileUrls = (urlFotos as File[]).map((f) => URL.createObjectURL(f))
            setFotosState(fileUrls)
        }
    }, [urlFotos]);



    const [tempo, setTempo] = useState('');



    var dataCorrigida2 = 'Aguardando o Grande dia...'

    const dataCorrigida = new Date(dataInicio + "T00:00:00-03:00");
    if (dataCorrigida.toString() !== 'Invalid Date') {
        dataCorrigida2 = dataCorrigida.toLocaleDateString('pt-BR'); // Formata a data para o padrão brasileiro
    }



    useEffect(() => {
        const updateTempo = () => {
            if (!dataInicio) {
                setTempo('Aguardando o Grande dia...');
                return;
            }

            const offsetMs = 3 * 60 * 60 * 1000; // ajustar UTC+3 se dataInicio estiver em UTC puro
            const startDate = new Date(new Date(dataInicio).getTime() + offsetMs);
            const now = new Date();

            let anos = now.getFullYear() - startDate.getFullYear();
            let meses = now.getMonth() - startDate.getMonth();
            let dias = now.getDate() - startDate.getDate();

            if (dias < 0) {
                meses -= 1;
                const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                dias += prevMonth.getDate();
            }

            if (meses < 0) {
                anos -= 1;
                meses += 12;
            }

            const horas = now.getHours() - startDate.getHours();
            const minutos = now.getMinutes() - startDate.getMinutes();
            const segundos = now.getSeconds() - startDate.getSeconds();

            // semanas (baseadas em dias restantes)
            const semanas = Math.floor(dias / 7);
            const diasRestantes = dias % 7;

            // Monta a string dinamicamente conforme o tempo
            let tempoStr = '';
            if (anos > 0) tempoStr += `${anos} anos `;
            if (meses > 0 || anos > 0) tempoStr += `${meses} meses `;
            if (semanas > 0 || meses > 0 || anos > 0) tempoStr += `${semanas} semanas `;
            tempoStr += `${diasRestantes} dias ${horas} horas ${minutos} minutos ${segundos} segundos`;

            setTempo(tempoStr.trim());
        };
        updateTempo();
        const interval = setInterval(updateTempo, 1000);
        return () => clearInterval(interval);
    }, [dataInicio]);



    return (




        <div style={{
            backgroundColor: bgColor,
        }}


            className={`block justify-center items-center mb-12
                ${status == 'pago' ? (
                    'w-[420px] h-full'
                ) : (
                    ' w-[370px] h-[50%] border border-white/10 shadow-xl'
                )}
         text-white  mt-12 mx-auto
          rounded-xl overflow-hidden 
            mx-auto`}>






            {status != 'pago' && (

                < div className="flex items-center gap-2 px-3 py-2 bg-[#fff] text-black" >
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <input id='url'
                        className="mx-auto bg-gray-100 text-sm px-3 py-1 rounded-md outline-none  w-[80%] "
                        value={url}
                        readOnly
                    />
                </div >


            )}



            <div className="flex flex-col items-center justify-center p-6 min-h-[300px] ">




                {Fotos(fotosState, estiloFoto)}


                <h2 className='mt-4 text-xl font-semibold'>{title}</h2>
                <p className="text-sm text-gray-200 mt-4 text-center">{description}</p>

                <div className="block">
                    <p className="text-sm text-white mt-16 text-center">Desde: <span>{dataCorrigida2}</span>
                    </p>
                </div>

                {dataInicio && (
                    <p className="text-lg text-white mt-4 text-center">
                        Juntos a:
                        <strong> {tempo}</strong>

                    </p>
                )}



            </div>

            {status == 'pago' && (
                <div className="flex flex-col items-center justify-center mt-8">
                    <CustomAudioPlayer src={music} />
                </div>


            )}

        </div >

    );
}