'use client';

import '../globals.css';
import Navbar from '../Components/Navbar';
import ProgressBar from '../Components/ProgressBar';
import BrowserMockup from '../Components/BrowserMockup';
import { useState } from 'react';
import MusicSearch from '../Components/MusicSearch';
import Step0 from '../Components/Steps/Step0';
import useMercadoPago from '../hooks/useMercadoPago';


export default function Root() {

    const { createMercadoPagoCheckout } = useMercadoPago();


    const [value, setValue] = useState(10); // Progress bar value
    const [step, setStep] = useState(0);
    const [fotos, setFotos] = useState<File[]>([]);
    const [plano, setPlano] = useState('vitalicio');
    const [estiloFoto, setEstiloFoto] = useState('classico');
    const [estiloBackground, setEstiloBackground] = useState('preto');

    const [url, setUrl] = useState('https://www.heartyfy.site/');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dataInicio, setDataInicio] = useState('');

    const [unit_price, setUnitPrice] = useState(16.90); // Valor do produto


    function handleEscolherPlano(plano: string) {
        escolherPlano(plano);
    }


    const escolherPlano = (plano: string) => {
        if (plano === 'mensal') {
            setPlano('mensal');
            setStep(1);
            setValue(20);
            setUnitPrice(16.90); // Valor do plano mensal
        }
        if (plano === 'anual') {
            setPlano('anual');
            setStep(1);
            setValue(20);
            setUnitPrice(19.90); // Valor do plano anual
        } else if (plano === 'vitalicio') {
            setPlano('vitalicio');
            setStep(1);
            setValue(20);
            setUnitPrice(46.90); // Valor do plano vitalício
        }
    };






    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const selectedFiles = Array.from(files);
            setFotos(selectedFiles);
        }
    };




    const step1 = (value: string) => {
        setTitle(value);
        makeUrl(value);
    };

    const betterUrl = (data: string) => {
        const dataParts = data.split('-');
        const formattedDate = dataParts.map(part => part.toLowerCase()).join('-');

        setUrl(`https://www.heartyfy.site/${formattedDate}`);
    }


    const makeUrl = (title: string) => {
        const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
        setUrl(`https://www.heartyfy.site/${formattedTitle}`);
    };









    return (


        <div>
            <Navbar />
            <ProgressBar value={value} />


            <div>
                {step === 0 && (
                    <Step0 escolherPlano={handleEscolherPlano} />
                )}
            </div>


            <div>
                {step === 1 && (

                    <div className="flex flex-col items-center mt-10 space-y-3">
                        <div className="w-[80%]">
                            <h2 className="text-white text-2xl font-bold text-center mb-4">Nome do Casal</h2>
                        </div>

                        <input
                            className="w-[80%] text-white px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            placeholder="Fernando e Scarlett (Não use emoji)"
                            onChange={(e) => step1(e.target.value)}
                            value={title}
                        />


                        <div className='flex gap-2 justify-between w-[80%]'>
                            <button
                                onClick={() => { setStep(0); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); setValue(10); }}
                                className='bg-white text-pink-700 hover:bg-pink-100 to-pink-700 w-full px-4 py-2 rounded-md mt-4 hover:bg-[#A61D4B] transition-colors duration-300'>
                                Voltar Etapa
                            </button>

                            <button
                                onClick={() => { setStep(2); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); setValue(47); }}
                                className='bg-gradient-to-br from-pink-600 to-pink-700 w-full text-white px-4 py-2 rounded-md mt-4 hover:bg-[#A61D4B] transition-colors duration-300'>
                                Próxima Etapa
                            </button>
                        </div>
                    </div>



                )}









                <div className={step === 2 ? 'flex flex-col items-center mt-10 space-y-3' : 'hidden'}>
                    <div className="w-[80%]">
                        <h2 className="text-white text-2xl font-bold text-center mb-4">Mensagem</h2>
                    </div>

                    <textarea
                        className="w-[80%] h-[250px] text-white px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none text-left"
                        placeholder="Escreva sua mensagem carinhosa, capricha bem hein! 💘"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />


                    <div className='flex gap-2 justify-between w-[80%]'>

                        <button
                            onClick={() => { setStep(1); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); setValue(20); }}
                            className='bg-white text-pink-700 hover:bg-pink-100 w-full px-4 py-2 rounded-md mt-4 hover:bg-[#A61D4B] transition-colors duration-300'>
                            Voltar Etapa
                        </button>

                        <button
                            onClick={() => { setStep(3); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); setValue(65); }}
                            className='bg-gradient-to-br from-pink-600 to-pink-700 w-full text-white px-4 py-2 rounded-md mt-4 hover:bg-[#A61D4B] transition-colors duration-300'>
                            Próxima Etapa
                        </button>
                    </div>
                </div>






                <div className={step === 3 ? 'flex flex-col items-center mt-10 space-y-3' : 'hidden'}>
                    <div className="w-[80%]">
                        <h2 className="text-white text-2xl font-bold text-center mb-4">Data de Início do Relacionamento</h2>
                    </div>

                    <input
                        type="date"
                        className="w-[80%] text-white px-4 py-2 h-12 border border-gray-300 rounded-lg shadow-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        onChange={(e) => setDataInicio(e.target.value)}
                        value={dataInicio}
                    />



                    <div className='flex gap-2 justify-between w-[80%]'>

                        <button
                            onClick={() => { setStep(2); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); setValue(47); }}
                            className='bg-white text-pink-700 hover:bg-pink-100 w-full px-4 py-2 rounded-md mt-4 hover:bg-[#A61D4B] transition-colors duration-300'>
                            Voltar Etapa
                        </button>

                        <button
                            onClick={() => { setStep(4); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); setValue(85); }}
                            className='bg-gradient-to-br from-pink-600 to-pink-700 w-full text-white px-4 py-2 rounded-md mt-4 hover:bg-[#A61D4B] transition-colors duration-300'>
                            Próxima Etapa
                        </button>
                    </div>
                </div>







                <div className={step === 4 ? 'flex flex-col items-center mt-10 space-y-3' : 'hidden'}>
                    <div className="w-[80%]">
                        <h2 className="text-white text-2xl font-bold text-center mb-4">Foto do Casal</h2>
                    </div>

                    {/* Botão customizado */}
                    <label className="block justify-center items-center cursor-pointer transition px-12 py-12 border-dotted border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none text-left">
                        <img className='justify-center mx-auto flex' width="35" height="35" src="https://img.icons8.com/material-sharp/24/ffffff/upload-to-cloud.png" alt="upload-to-cloud" />
                        {plano !== 'mensal' ? (
                            <div>
                                <div className='text-white'>Clique aqui para adicionar sua foto(s)</div>
                                <input
                                    id='images'
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleChange}
                                />
                            </div>


                        ) : (
                            <div>
                                <div className='text-white'>Clique aqui para adicionar sua foto</div>
                                <input
                                    id='images'
                                    type="file"
                                    multiple={false}
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleChange}
                                />
                            </div>
                        )}



                    </label>



                    {fotos.length > 1 && (
                        <div className="w-[80%] mb-12">
                            <h2 className="text-white text-xl font-bold mt-4 text-center mb-2">Modo de Mostrar</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Clássico', value: 'classico' },
                                    { label: 'Carrossel', value: 'carrossel' },
                                    { label: 'Cubo', value: 'cubo' },
                                    { label: 'Romântico', value: 'romantico' }
                                ].map(({ label, value }) => (
                                    <button
                                        key={value}
                                        onClick={() => setEstiloFoto(value)}
                                        className={`w-full px-4 py-3 rounded-md font-semibold text-sm transition-all duration-300
            ${estiloFoto === value
                                                ? 'bg-pink-600 text-white shadow-lg scale-105 ring-2 ring-white/60'
                                                : 'bg-white text-pink-700 hover:bg-pink-100'
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}



                    <div className='flex gap-2 justify-between w-[80%]'>

                        <button
                            onClick={() => { setStep(3); setValue(65); }}
                            className='bg-white text-pink-700 hover:bg-pink-100 w-full px-4 py-2 rounded-md mt-4 hover:bg-[#A61D4B] transition-colors duration-300'>
                            Voltar Etapa
                        </button>

                        <button
                            onClick={() => {
                                if (plano !== 'mensal') {
                                    setStep(5); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); setValue(95);
                                } else {
                                    setStep(7); createMercadoPagoCheckout({
                                        testeId: "123",
                                        userEmail: "loveyu2uqr@gmail.com",
                                        unit_price: unit_price
                                    }); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); setValue(100)
                                };
                            }}
                            className='bg-gradient-to-br from-pink-600 to-pink-700 w-full text-white px-4 py-2 rounded-md mt-4 hover:bg-[#A61D4B] transition-colors duration-300'>
                            Próxima Etapa
                        </button>
                    </div>
                </div>









                <div className={step === 5 ? 'flex flex-col items-center mt-10 space-y-3' : 'hidden'}>
                    <div className="w-[80%]">
                        <h2 className="text-white text-2xl font-bold text-center mb-[-30px]">Dedique uma música especial <span className='text-sm text-gray-500'>(Opcional)</span></h2>
                    </div>




                    {plano !== 'mensal' ? (

                        <MusicSearch />


                    ) : (
                        <h2 className="text-white text-2xl font-bold text-center mb-4">Disponível Apenas nos planos Anual e Vitalício</h2>
                    )}








                    <div className='flex gap-2 justify-between w-[80%]'>

                        <button
                            onClick={() => { setStep(4); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); setValue(85); }}
                            className='bg-white text-pink-700 hover:bg-pink-100 w-full px-4 py-2 rounded-md mt-4 hover:bg-[#A61D4B] transition-colors duration-300'>
                            Voltar Etapa
                        </button>


                        {/* botao de fundo personalizado musica e etc */}
                        <button
                            onClick={() => { setStep(6); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); setValue(98); }}
                            className='bg-gradient-to-br from-pink-600 to-pink-700 w-full text-white px-4 py-2 rounded-md mt-4 hover:bg-[#A61D4B] transition-colors duration-300'>
                            Próxima Etapa
                        </button>
                    </div>
                </div>











                <div className={step === 6 ? 'flex flex-col items-center mt-10 space-y-3' : 'hidden'}>
                    <div className="w-[80%]">
                        <h2 className="text-white text-2xl font-bold text-center mb-4">Selecione uma Cor de Fundo</h2>
                    </div>




                    {plano !== 'mensal' ? (


                        <div className="w-[80%] mb-12">

                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Preto', value: 'preto' },
                                    { label: 'Vermelho', value: 'vermelho' },
                                    { label: 'Azul', value: 'azul' },
                                    { label: 'Verde', value: 'verde' }
                                ].map(({ label, value }) => (
                                    <button
                                        key={value}
                                        onClick={() => setEstiloBackground(value)}

                                        className={`w-full px-4 py-3 rounded-md font-semibold text-sm transition-all duration-300
${estiloBackground === value
                                                ? 'bg-pink-600 text-white shadow-lg scale-105 ring-2 ring-white/60'
                                                : 'bg-white text-pink-700 hover:bg-pink-100'
                                            }`}

                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>


                    ) : (
                        <h2 className="text-white text-2xl font-bold text-center mb-4">Disponível Apenas nos planos Anual e Vitalício</h2>
                    )}








                    <div className='flex gap-2 justify-between w-[80%]'>

                        <button
                            onClick={() => { setStep(5); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); setValue(95); }}
                            className='bg-white text-pink-700 hover:bg-pink-100 w-full px-4 py-2 rounded-md mt-4 hover:bg-[#A61D4B] transition-colors duration-300'>
                            Voltar Etapa
                        </button>


                        {/* botao de fundo personalizado musica e etc */}
                        <button
                            onClick={() => {
                                setStep(7); createMercadoPagoCheckout({
                                    testeId: "123",
                                    userEmail: "loveyu2uqr@gmail.com",
                                    unit_price: unit_price
                                });
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); setValue(100);
                            }}
                            className='bg-gradient-to-br from-pink-600 to-pink-700 w-full text-white px-4 py-2 rounded-md mt-4 hover:bg-[#A61D4B] transition-colors duration-300'>
                            Realizar Pagamento
                        </button>
                    </div>
                </div>




            </div>





            <BrowserMockup url={url}
                title={title}
                description={description}
                dataInicio={dataInicio}
                fotos={fotos}
                estiloFoto={estiloFoto}
                estiloBackground={estiloBackground}
            />
        </div >
    );
};

