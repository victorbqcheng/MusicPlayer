import React, { KeyboardEvent, useEffect, useRef } from 'react'
import styles from './Controlbar.module.css'
import { ChevronLeft, ChevronRight, Pause, Play, Volume2 } from 'lucide-react'
import { Slider } from '@mui/material'
import { formatTime } from '../utils/util'
import music from '../assets/music.png'

type Song = {
    name: string;
    url: string;
};

type Props = {
    song?: Song;
    onPrev?: () => void;
    onNext?: () => void;
    onTimeUpdate?: (currentTime: number) => void;
};

const Controlbar = ({ song, onPrev, onNext, onTimeUpdate }: Props) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = React.useState<number>(0);
    const [duration, setDuration] = React.useState<number>(0);
    const [isChangingSlider, setIsChangingSlider] = React.useState<boolean>(false);
    const [volume, setVolume] = React.useState<number>(50);

    useEffect(() => {
        audioRef.current!.volume = volume / 100;
    }, []);

    useEffect(() => {
        if (song && audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = song.url;
            audioRef.current.play();
        }
    }, [song]);
    // Keyboard left and right arrow keys control playback progress
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (audioRef.current?.src === '') {
            return;
        }
        if (e.key === "ArrowLeft") { // left arrow key
            audioRef.current!.currentTime -= 5;
        } else if (e.key === "ArrowRight") { // right arrow key
            audioRef.current!.currentTime += 5;
        }
    };

    const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        let newVolume = 0;

        if (e.deltaY < 0) {
            newVolume = Math.min(volume + 5, 100);
            setVolume(newVolume);
        } else {
            newVolume = Math.max(volume - 5, 0);
            setVolume(newVolume);
        }
        audioRef.current!.volume = newVolume / 100;
    };

    const onPlayBtnClick = () => {
        if (!song) {
            return;
        }

        if (audioRef.current?.paused) {
            audioRef.current?.play();
        }
        else {
            audioRef.current?.pause();
        }
    };

    // audio callbacks
    const onAudioTimeUpdate = () => {
        const progress = audioRef.current!.currentTime;
        if (!isChangingSlider) {
            setProgress(progress);
        }
        onTimeUpdate?.(progress);
    };

    const onDurationChange = () => {
        setDuration(audioRef.current!.duration);
    };


    // progress slider callbacks
    const onSliderChange = (_event: Event, value: number | number[]) => {

        setIsChangingSlider(true);
        setProgress(value as number);
    }
    const onSliderChangeCommitted = (_event: React.SyntheticEvent | Event, value: number | number[]) => {
        audioRef.current!.currentTime = value as number;
        audioRef.current?.play();
        setIsChangingSlider(false);
    }
    // volume slider callbacks
    const onVolumeSliderChange = (_event: Event, value: number | number[]) => {
        console.log("onVolumeSliderChange");
        setVolume(value as number);
        audioRef.current!.volume = value as number / 100;
    };

    //
    const PlayOrPauseIcon = () => {
        if (!song) {
            return <Play />
        }
        return audioRef.current?.paused ? <Play /> : <Pause />
    };

    return (
        <>
            <div tabIndex={0}
                onKeyDown={handleKeyDown}
                onWheel={onWheel}
                className='relative flex flex-col justify-center items-center my-0 select-none md:flex md:flex-row md:space-x-8'>
                {/* media controls */}
                <div className=' flex items-center justify-around w-full md:w-auto md:space-x-4'>
                    <ChevronLeft onClick={onPrev} className='p-2 w-8 h-8 rounded-full bg-blue-500 text-white hover:bg-red-400' />
                    <div onClick={onPlayBtnClick} className='p-2 w-12 h-12 flex justify-center items-center rounded-full bg-blue-500  text-white hover:bg-red-400'>
                        {PlayOrPauseIcon()}
                    </div>
                    <ChevronRight onClick={onNext} className='p-2 w-8 h-8 rounded-full bg-blue-500 text-white hover:bg-red-400' />
                </div>

                {/* progress bar */}
                <div className=' flex items-center justify-around w-full md:w-2/5'>
                    <img className='w-20' src={music} />
                    <div className='h-14 flex-1 mx-2 flex flex-col justify-center'>
                        <div className=' flex justify-between w-full'>
                            <div className=' whitespace-nowrap overflow-hidden overflow-ellipsis'>{song?.name || "--"}</div>
                            <div className='ml-2'>{formatTime(Math.round(progress))}/{formatTime(Math.round(duration))}</div>
                        </div>

                        <Slider min={0} max={duration} value={progress}
                            size='small'
                            onChange={onSliderChange}
                            onChangeCommitted={onSliderChangeCommitted} />

                    </div>
                </div>

                {/* volume controls */}
                <div tabIndex={0} className=' hidden md:flex md:items-center md:space-x-4 w-48'>
                    <Volume2 className='w-8 h-8' />
                    <Slider aria-label="Volume" value={volume} min={0} max={100}
                        onChange={onVolumeSliderChange} />
                    <div className='w-16'>{volume}</div>
                </div>
                <audio ref={audioRef} controls className='hidden'
                    onDurationChange={onDurationChange}
                    onTimeUpdate={() => onAudioTimeUpdate()}>
                    <source src={""} type='audio/mpeg' />
                </audio>
            </div>
        </>
    )
}

export default Controlbar