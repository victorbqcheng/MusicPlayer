import React from 'react'
import styles from './Controlbar.module.css'
import { ChevronLeft, ChevronRight, Play, Volume2 } from 'lucide-react'
import { Slider } from '@mui/material'
import { formatTime } from '../utils/util'

const Controlbar = () => {
    const [volume, setVolume] = React.useState<number>(50);

    return (
        <>
            <div className='relative flex flex-col justify-center items-center my-0 md:flex md:flex-row md:space-x-8 bg-slate-300'>
                {/* media controls */}
                <div className='flex justify-center items-center space-x-4'>
                    <ChevronLeft className='p-2 w-8 h-8 rounded-full bg-blue-500 text-white hover:bg-red-400' />
                    <div className='p-2 w-12 h-12 flex justify-center items-center rounded-full bg-blue-500  text-white hover:bg-red-400'>
                        <Play />
                    </div>
                    <ChevronRight className='p-2 w-8 h-8 rounded-full bg-blue-500 text-white hover:bg-red-400' />
                </div>

                {/* progress bar */}
                <div className=' flex items-center justify-around w-full md:w-2/5 bg-pink-200'>
                    <img className='w-20' />
                    <div className='h-14 flex-1 mx-2 flex flex-col justify-center bg-gray-400'>
                        <div className=' flex justify-between w-full bg-red-500'>
                            <div className=' whitespace-nowrap overflow-hidden overflow-ellipsis'>{"song name" || "--"}</div>
                            <div className='ml-2'>{formatTime(100)}/{formatTime(200)}</div>
                        </div>

                        <Slider min={0} max={100}
                            size='small'
                        />

                    </div>
                </div>

                {/* volume controls */}
                <div tabIndex={0} className=' hidden md:flex md:items-center md:space-x-4 w-48'>
                    <Volume2 className='w-8 h-8' />
                    <Slider aria-label="Volume" value={volume} min={0} max={100} />
                    <div className='w-16'>{volume}</div>
                </div>
                <audio  controls className='hidden'>
                    <source src={""} type='audio/mpeg' />
                </audio>

            </div>
        </>
    )
}

export default Controlbar