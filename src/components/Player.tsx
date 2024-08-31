import React, { useRef, useState } from 'react'
import styles from './Player.module.css'
import Controlbar from './Controlbar'
import music from '../assets/music.png'
import { CirclePlus, Menu } from 'lucide-react'
import { LyricLine, Song } from '../DataTypes'
import { songs } from '../TestData'
import { parseLyricTime } from '../utils/util'



const Player = () => {
    const filelistRef = useRef<HTMLDivElement>(null);


    const onOpenFileList = () => {
        if (filelistRef.current) {
            filelistRef.current.style.width = '50%';
            // filelistRef get focus
            filelistRef.current.focus();
        }
    };
    const onFileListBlur = () => {
        if (filelistRef.current) {
            filelistRef.current.style.width = '0%';
        }
    };
    const onSongItemDoubleClick = (index: number) => {
        
    };

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.lyric}>

                    <img src={music} className='w-48' />

                    <div className={styles.menu}>
                        <Menu onClick={onOpenFileList} className={styles.openfilelist} />
                        <CirclePlus className={styles.addfile} />
                    </div>

                </div>

                <div ref={filelistRef} className={styles.filelist} tabIndex={0} onBlur={onFileListBlur}>
                    <ul>
                        {songs.map((song, i) => (
                            <SongItem key={i} song={song} onDoubleClick={() => onSongItemDoubleClick(i)} />
                        ))}
                    </ul>
                </div>

            </div>

            <div className={styles.controlbar}>
                <Controlbar />
            </div>
        </div>
    )
}

const SongItem = ({ song, onDoubleClick }: { song: Song, onDoubleClick: () => void }) => {
    return (
        <li onDoubleClick={onDoubleClick} className='py-2 px-4 hover:bg-gray-100 cursor-pointer'>
            {song.name}
        </li>
    )
};

export default Player