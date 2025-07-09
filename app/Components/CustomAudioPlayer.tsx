'use client';

import { useRef, useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

type Props = {
    src: string;
};

export default function CustomAudioPlayer({ src }: Props) {

    const [audioExists, setAudioExists] = useState(true);

    useEffect(() => {
        setAudioExists(src.trim() !== '');
    }, [src]);


    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (


        <div className={`flex items-center gap-4 px-4 
        py-2 rounded-full bg-white/10
        backdrop-blur-md shadow-lg border border-white/20 ${!audioExists && 'hidden'}`} >
            <button
                onClick={togglePlay}
                className="text-white hover:text-pink-400 transition"
            >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <audio ref={audioRef} src={src} preload="auto" />
            <span className="text-sm text-white opacity-80">
                {isPlaying ? 'Reproduzindo' : 'Pausado'}
            </span>
        </div>


    );
}
