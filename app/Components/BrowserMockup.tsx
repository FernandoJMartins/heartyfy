'use client';

import { useEffect, useState } from "react";
import Carrossel from "./EstilosDeImagem/Carrossel";
import Classico from "./EstilosDeImagem/Classico";
import Cubo from "./EstilosDeImagem/Cubo";
import Romantico from "./EstilosDeImagem/Romantico";


type Props = {
    url: string;
    title: string;
    description: string;
    dataInicio: string;
    urlFotos: string[];
    estiloFoto: string;// Array of File objects for photos
    estiloBackground?: string; // Optional background style
};

export default function BrowserMockup({ url, title, description, dataInicio, urlFotos, estiloFoto, estiloBackground }: Props) {



    console.log(urlFotos)

    let bgColor = '#1e1e1e'; // Default color

    if (estiloBackground === 'preto') {
        bgColor = '#1e1e1e';
    } else if (estiloBackground === 'vermelho') {
        bgColor = '#3C0D0D';
    } else if (estiloBackground === 'azul') {
        bgColor = '#0A2342';
    } else if (estiloBackground === 'verde') {
        bgColor = '#1F4032';
    }




    const [tempo, setTempo] = useState('');


    const [fotosState, setFotosState] = useState<string[]>([]);

    useEffect(() => {
        setFotosState(urlFotos);
    }, [urlFotos]);



    const [indexAtual, setIndexAtual] = useState(0);

    const irParaSlide = (i: number) => setIndexAtual(i);

    useEffect(() => {
        const intervalo = setInterval(() => {
            setIndexAtual((prev) => (prev + 1) % urlFotos.length);
        }, 4000);

        return () => clearInterval(intervalo);
    }, [urlFotos.length]);



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

         text-white w-[370px] h-[896px] mt-12 mx-auto
          rounded-xl overflow-hidden shadow-xl
           border border-white/10 mx-auto`}>

            < div className="flex items-center gap-2 px-3 py-2 bg-[#fff] text-black" >
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <input
                    className="mx-auto bg-gray-100 text-sm px-3 py-1 rounded-md outline-none  w-[80%] "
                    value={url}
                    readOnly
                />
            </div >


            <div className="flex flex-col items-center justify-center p-6 min-h-[300px] ">

                {urlFotos.length > 0 ? (





                    <div className="w-full h-full  flex items-center justify-center">


                        {/* <div> */}




                        {(urlFotos.length === 1) ? (

                            <img
                                src={(urlFotos[0])}
                                alt="Foto do Casal"
                                className="w-64 h-64 object-cover rounded-sm "
                            />
                        ) : (

                            <div className="relative w-full h-full overflow-hidden">



                                {estiloFoto === 'classico' && (
                                    <div className='w-[80%] mx-auto h-full'>
                                        <Classico fotos={urlFotos} />
                                    </div>
                                )}





                                {estiloFoto === 'carrossel' && (
                                    <div className='w-full mx-auto h-full'>
                                        <Carrossel fotos={urlFotos} />
                                    </div>

                                )}

                                {estiloFoto === 'cubo' && (
                                    <div className='w-[full] mx-auto h-full'>
                                        <Cubo fotos={urlFotos} />
                                    </div>
                                )}


                                {estiloFoto === 'romantico' && (
                                    <div className='w-[full] mx-auto h-full'>
                                        <Romantico fotos={urlFotos} />
                                    </div>
                                )}


                            </div>
                        )
                        }









                    </div>


                ) : (
                    <div className="w-[200px] h-[250px] border border-pink-500 flex items-center justify-center">
                        <img className="" width="80" height="80" src="https://img.icons8.com/comic/100/ffffff/camera.png" alt="camera" />
                    </div>
                )}




                <h2 className='mt-4 text-xl font-semibold'>{title}</h2>
                <p className="text-sm text-pink-200 mt-4 text-center">{description}</p>

                <div className="block">
                    <p className="text-sm text-white mt-16 text-center">Início do relacionamento:
                    </p>
                    <p className="text-sm text-white mt-2 mb-8 text-center">{dataCorrigida2}</p>
                </div>

                {dataInicio && (
                    <p className="text-lg text-white mt-4 text-center">
                        Juntos a:
                        <strong> {tempo}</strong>

                    </p>
                )}


            </div>


        </div >
    );
}