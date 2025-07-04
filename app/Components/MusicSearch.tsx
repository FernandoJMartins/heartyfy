import { useState, useEffect, useRef, use } from 'react';



type MusicResult = {
    artworkUrl100: string;
    trackId: number;
    trackName: string;
    artistName: string;
    previewUrl: string;
};


export default function MusicSearch() {



    const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement | null>(null);

    const [selected, setSelected] = useState<string>(''); // Estado para armazenar o valor selecionado


    const [query, setQuery] = useState('');
    const [results, setResults] = useState<MusicResult[]>([]);

    const pauseAudio = (name: string, url: string) => {
        const audio = document.getElementById('audio') as HTMLAudioElement;


        console.log('Pausando áudio:', name, url);
        if (audio) {
            setSelected('');
            audio.pause();
            audio.currentTime = 0; // Reseta o tempo do áudio
            setPlayingAudio(null); // Limpa o estado do áudio em reprodução
        }
    }



    const playAudio = (name: string, author: string, url: string) => {

        console.log('Buscando vídeo no YouTube:', name, author);

        const audio = document.getElementById('audio') as HTMLAudioElement;
        setSelected(url);
        console.log('Reproduzindo áudio:', name, url);


        if (audio) {
            audio.src = url;
            setPlayingAudio(audio);
            audio.play().catch(error => {
                console.error('Erro ao reproduzir áudio:', error);
            });
        }

    }



    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.length > 2) {
                fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=4`)
                    .then(res => res.json())
                    .then(data => {
                        setResults(data.results || []);
                    });
            } else {
                setResults([]);
            }
        }, 500); // debounce de 500ms

        return () => clearTimeout(delayDebounce);
    }, [query]);



    return (
        <div className="w-[80%] max-w-md mx-auto mt-10 ">
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Legião Urbana - Tempo Perdido"
                className="w-full text-white px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />

            {results.length > 0 && (
                <ul className=" block mt-2 rounded shadow ">

                    {results.map(music =>
                        <div onClick={() => {




                            {
                                !playingAudio || playingAudio.src !== music.previewUrl ? (
                                    playAudio(music.trackName, music.artistName, music.previewUrl)

                                    // Atualiza o estado selecionado
                                ) : (
                                    pauseAudio(music.trackName, music.previewUrl)
                                );
                            }



                        }}
                            className={`flex mx-auto rounded-xl my-2 w-full h-[80px] px-4 py-3 rounded-md font-semibold text-sm transition-all duration-300
                            ${selected === music.previewUrl ? 'bg-pink-600 text-white shadow-lg scale-105 ring-2 ring-white/60' : 'bg-white text-pink-700 hover:bg-pink-100'}`}
                            key={music.trackId}>


                            {/* <button className='ml-4 bg-pink-500 text-white px-3 py-3 rounded-xl hover:bg-green-600 transition-colors'>

                            </button> */}
                            <img
                                src={music.artworkUrl100}
                                alt={music.trackName}
                                className="w-16 h-16 rounded-xl border ml-4 mt-[-4] "
                            />

                            <div className="flex-col justify-center ml-4">
                                <div className={`font-semibold text-pink-700 ${selected === music.previewUrl && 'text-white'}`}>{music.trackName} -
                                    <span className='text-sm mx-2'>{music.artistName}</span>
                                </div>
                            </div>




                            {selected === music.previewUrl && (
                                <div className='flex items-center justify-center ml-auto mr-4'>
                                    <img src='/ydBo.gif' className='mx-auto w-full h-[100px] z-99999'></img>
                                </div>
                            )}





                            <audio className='hidden' id='audio' key={music.trackId}>
                                <source src={music.previewUrl} type="audio/mpeg" />
                                Seu navegador não suporta o elemento de áudio.
                            </audio>





                        </div>
                    )}
                </ul>
            )
            }
        </div >
    );
}
