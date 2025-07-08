'use client';

import '../globals.css';

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Navbar from '../Components/Navbar';
import ProgressBar from '../Components/ProgressBar';
import BrowserMockup from '../Components/BrowserMockup';
import MusicSearch from '../Components/MusicSearch';
import Step0 from '../Components/Steps/Step0';


import useMercadoPago from '../hooks/useMercadoPago';


import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from '@/app/lib/firebase'
import { create } from 'domain';








export default function Root() {


    const [email, setEmail] = useState('');


    const uniqueTesteId = uuidv4();

    const { createMercadoPagoCheckout } = useMercadoPago();

    const [value, setValue] = useState(10); // Progress bar value
    const [step, setStep] = useState(0);

    const [maxFiles, setMaxFiles] = useState(1);

    const [fotos, setFotos] = useState<File[]>([]);
    const [urlFotos, setUrlFotos] = useState<string[]>([]);


    const [musicSelectedFromChild, musicSetSelectedFromChild] = useState('')

    const handleSelectedChange = (callback: (valor: string) => void) => {
        return (valor: string) =>
            callback(valor);
    }


    const handleUpload = async () => {
        if (!fotos || fotos.length === 0) {
            console.warn("Nenhuma foto selecionada para upload.");
            return;
        }

        try {
            const uploadPromises = fotos.map(async (f) => {
                const storageRef = ref(storage, `fotos/${f.name}`);
                const snapshot = await uploadBytes(storageRef, f);
                const downloadUrl = await getDownloadURL(snapshot.ref);
                console.log("uploaded", f.name);
                return downloadUrl;
            });

            const downloadUrls = await Promise.all(uploadPromises);
            setUrlFotos(downloadUrls);
            // Aqui você pode salvar as URLs no Firestore, se quiser
        } catch (error) {
            console.error("Erro ao fazer upload das imagens:", error);
        }
    };




    const handleChangeFoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;


        if (files) {

            if (files.length > maxFiles) {
                alert(`você pode enviar no máximo ${maxFiles} imagens`)
                event.target.value = '';
                return;
            }
            const selectedFiles = Array.from(files);
            await setFotos(selectedFiles);


        };
    }


    useEffect(() => {
        handleUpload();
    }, [fotos])


    const [plano, setPlano] = useState('vitalicio');
    const [estiloFoto, setEstiloFoto] = useState('classico');
    const [estiloBackground, setEstiloBackground] = useState('#1e1e1e');

    const [url, setUrl] = useState('https://www.heartyfy.site/');

    const [slug, setSlug] = useState(url);

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
            setMaxFiles(1);
            setUnitPrice(24.90); // Valor do plano mensal
        }
        if (plano === 'anual') {
            setPlano('anual');
            setMaxFiles(4);
            setStep(1);
            setValue(20);
            setUnitPrice(178.80); // Valor do plano anual
        } else if (plano === 'vitalicio') {
            setPlano('vitalicio');
            setMaxFiles(8);
            setStep(1);
            setValue(20);
            setUnitPrice(97.90); // Valor do plano vitalício
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


        setSlug(formattedTitle)
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


                    <div className="flex flex-col items-center mt-15 space-y-3">
                        <div className="w-[80%]">

                            <h1 className="text-white text-3xl
                             font-bold mb-4
                             rounded-3xl 
                             ">Nome do Casal</h1>
                            <h3 className='mb-7'>Escreva o titulo dedicatório para a página. Ex: Eduardo e Mônica ou Feliz Aniversário ou etc!

                            </h3>
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
                                onClick={() => { { if (title == '') return alert('Escreva o nome do casal'); setStep(1) }; setStep(2); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); setValue(47); }}
                                className='bg-gradient-to-br from-pink-600 to-pink-700 w-full text-white px-4 py-2 rounded-md mt-4 hover:bg-[#A61D4B] transition-colors duration-300'>
                                Próxima Etapa
                            </button>
                        </div>
                    </div>



                )}









                <div className={step === 2 ? 'flex flex-col items-center mt-15 space-y-3' : 'hidden'}>
                    <div className="w-[80%]">
                        <h1 className="text-white text-3xl
                             font-bold mb-4
                             rounded-3xl">Mensagem</h1>
                        <h3 className='mb-7'>Escreva sua mensagem carinhosa, capricha bem hein!</h3>
                    </div>

                    <textarea
                        className="w-[80%] h-[250px] text-white px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none text-left"
                        placeholder=""
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






                <div className={step === 3 ? 'flex flex-col items-center mt-15 space-y-3' : 'hidden'}>
                    <div className="w-[80%]">
                        <h1 className="text-white text-3xl
                             font-bold mb-4
                             rounded-3xl">Data de Início do Relacionamento</h1>
                        <h3 className='mb-7'>Qual foi o dia em que tudo começou? Relacionamento, amizade, parceria... você decide!

                        </h3>
                    </div>

                    <input
                        id='date'
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
                            onClick={() => { { if (dataInicio == '') return alert('Selecione uma Data'); setStep(3) }; setStep(4); window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); setValue(85); }}
                            className='bg-gradient-to-br from-pink-600 to-pink-700 w-full text-white px-4 py-2 rounded-md mt-4 hover:bg-[#A61D4B] transition-colors duration-300'>
                            Próxima Etapa
                        </button>
                    </div>
                </div>







                <div className={step === 4 ? 'flex flex-col items-center mt-15 space-y-3' : 'hidden'}>
                    <div className="w-[80%]">
                        <h1 className="text-white text-3xl
                             font-bold mb-4
                             rounded-3xl ">Fotos</h1>

                        {maxFiles == 1 ? (
                            <h3 className='mb-7'>    Anexe uma foto especial para deixar sua página única. Você pode adicionar {maxFiles} foto.</h3>
                        ) :
                            (
                                <h3 className='mb-7'>Anexe fotos e escolha o modo de exibição para personalizar a página. Você pode adicionar até {maxFiles} fotos</h3>

                            )}



                    </div>

                    {/* Botão customizado */}
                    <label className="w-[80%]  block justify-center items-center cursor-pointer transition px-12 py-12 border-dotted border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none text-left">
                        <img className='justify-center mx-auto flex' width="35" height="35" src="https://img.icons8.com/material-sharp/24/ffffff/upload-to-cloud.png" alt="upload-to-cloud" />
                        {plano !== 'mensal' ? (
                            <div>
                                <p id='fotosTexto' className='text-white'>Clique aqui para adicionar sua(s) foto(s)</p>


                                <input
                                    id='images'
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleChangeFoto}
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
                                    onChange={handleChangeFoto}
                                />
                            </div>
                        )}



                    </label>



                    {fotos.length > 1 && (
                        <div className="w-[80%] mb-12">
                            <h1 className="text-white text-2xl
                             font-bold mb-6 mt-6
                             rounded-3xl">Tipo de Slide</h1>
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
                                    setStep(7);

                                    window.scrollTo({
                                        top: 0, left: 0,
                                        behavior: 'smooth'
                                    }); setValue(99)
                                };
                            }}
                            className='bg-gradient-to-br from-pink-600 to-pink-700 w-full text-white px-4 py-2 rounded-md mt-4 hover:bg-[#A61D4B] transition-colors duration-300'>
                            Próxima Etapa
                        </button>
                    </div>
                </div>









                <div className={step === 5 ? 'flex flex-col items-center mt-15 space-y-3' : 'hidden'}>
                    <div className="w-[80%]">
                        <h1 className="text-white text-3xl
                             font-bold mb-4
                             rounded-3xl ">Dedique uma música especial <span className='text-sm text-gray-500'>(Opcional)</span></h1>
                        <h3> Escolha uma música especial — ela tocará automaticamente na página e deixará tudo mais emocionante.</h3>
                    </div>




                    {plano !== 'mensal' ? (

                        <MusicSearch onSelectedChange={handleSelectedChange(musicSetSelectedFromChild)} />


                    ) : (
                        <h1 className="text-white text-3xl
                             font-bold mb-4
                             rounded-3xl ">Disponível Apenas nos planos Anual e Vitalício</h1>
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











                <div className={step === 6 ? 'flex flex-col items-center mt-15 space-y-3' : 'hidden'}>
                    <div className="w-[80%]">
                        <h1 className="text-white text-3xl
                             font-bold mb-4
                             rounded-3xl ">Selecione uma Cor de Fundo</h1>
                        <h3 className='mb-7'>Selecione a cor ideal para dar o tom da sua homenagem. Ela será aplicada no fundo da página.</h3>
                    </div>




                    {plano !== 'mensal' ? (


                        <div className="w-[80%] mb-12">


                            <div className='block'>
                                <input
                                    id="colorPicker"
                                    type="color"
                                    onChange={(e) => { setEstiloBackground(e.target.value); console.log(e.target.value) }}
                                    className="w-full h-10 rounded-xl border-black   cursor-pointer"
                                />

                                <p id='bg' className='mt-[-33px] ml-[20px] '>Clique aqui para Escolher a Cor</p>
                            </div>


                        </div>


                    ) : (
                        <h1 className="text-white text-3xl font-bold text-center mb-4">Disponível Apenas nos planos Anual e Vitalício</h1>
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
                                setStep(7);
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); setValue(99);
                            }}
                            className='bg-gradient-to-br from-pink-600 to-pink-700 w-full text-white px-4 py-2 rounded-md mt-4 hover:bg-[#A61D4B] transition-colors duration-300'>
                            Próxima Etapa
                        </button>
                    </div>
                </div>













                <div className={step === 7 ? 'flex flex-col items-center mt-15 space-y-3' : 'hidden'}>
                    <div className="w-[80%]">
                        <h1 className="text-white text-3xl
                             font-bold mb-4
                             rounded-3xl ">Insira seu email para receber o QRCODE</h1>
                        <h3 className='mb-7'>Você receberá o acesso completo à sua página personalizada por e-mail.</h3>
                    </div>

                    <input
                        className="w-[80%] text-white px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                        placeholder="joao@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />



                    <div className='flex gap-2 justify-between w-[80%]'>

                        <button
                            onClick={() => {

                                if (plano == 'mensal') {
                                    setStep(4);
                                }
                                else {
                                    setStep(6);
                                }


                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); setValue(98);
                            }}
                            className='bg-white text-pink-700 hover:bg-pink-100 w-full px-4 py-2 rounded-md mt-4 hover:bg-[#A61D4B] transition-colors duration-300'>
                            Voltar Etapa
                        </button>

                        <button
                            onClick={() => {
                                { if (email == '') return alert('Selecione um Email'); setStep(7) };
                                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

                                setValue(100);


                                createMercadoPagoCheckout({
                                    testeId: uniqueTesteId, //MUDAR TESTE IDDDDDDDDDDDDDDDDDDDD
                                    userEmail: email,
                                    unit_price: unit_price,
                                    slug: slug,
                                    title: title,
                                    description: description,
                                    dataInicio: dataInicio,
                                    fotos: fotos,
                                    estiloFoto: estiloFoto,
                                    estiloBackground: estiloBackground,
                                    urlFotos: urlFotos,
                                    music: musicSelectedFromChild,
                                    status: 'pago'
                                });


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
                urlFotos={fotos}
                estiloFoto={estiloFoto}
                estiloBackground={estiloBackground}
                music=''
                status=''
            />
        </div >
    );
};

