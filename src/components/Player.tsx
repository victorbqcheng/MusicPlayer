import React, { useRef, useState } from 'react'
import styles from './Player.module.css'
import Controlbar from './Controlbar'
import music from '../assets/music.png'
import { CirclePlus, Menu } from 'lucide-react'
import { LyricLine, Song } from '../DataTypes'
import { songs } from '../TestData'
import { parseLyricTime } from '../utils/util'
import Lyric from './Lyric'



const Player = () => {
    const filelistRef = useRef<HTMLDivElement>(null);
    const [selectedSong, setSelectedSong] = useState<Song>();
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [lyricLines, setLyricLines] = useState<LyricLine[] | null>(null);

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
        const song = songs[index];
        setSelectedSong(song);
        setSelectedIndex(index);
        if (song.lyric) {
            const lines = song.lyric.split('\n').map((line, _index) => {
                const timeStr = line.match(/\[\d+:\d+\.\d+\]/);
                const time = timeStr ? parseLyricTime(timeStr[0]) : 0;
                const lyric = line.replace(timeStr![0], '')
                return { time: time, timeStr: timeStr![0], line: lyric };
            });
            setLyricLines(lines);
        } else {
            setLyricLines(null);
        }
    };
    const onPrev = () => {
        if (selectedIndex === 0) {
            setSelectedIndex(songs.length - 1);
            setSelectedSong(songs[songs.length - 1]);
            return;
        }
        setSelectedIndex(selectedIndex - 1);
        setSelectedSong(songs[selectedIndex - 1]);
    };
    const onNext = () => {
        if (selectedIndex === songs.length - 1) {
            setSelectedIndex(0);
            setSelectedSong(songs[0]);
            return;
        }
        setSelectedIndex(selectedIndex + 1);
        setSelectedSong(songs[selectedIndex + 1]);
    }
    const onTimeUpdate = (currentTime: number) => {
        setCurrentTime(currentTime);
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

                    {
                        (selectedSong ) && <Lyric currentTime={currentTime} lyricLines={lyricLines} />
                    }

                </div>

                <div ref={filelistRef} className={styles.filelist} tabIndex={0} onBlur={onFileListBlur}>
                    <ul>
                        {songs.map((song, i) => (
                            <SongItem key={i} song={song} onDoubleClick={() => onSongItemDoubleClick(i)} isSelected={i===selectedIndex}/>
                        ))}
                    </ul>
                </div>

            </div>

            <div className={styles.controlbar}>
                <Controlbar song={selectedSong}
                    onPrev={onPrev}
                    onNext={onNext}
                    onTimeUpdate={onTimeUpdate}/>
            </div>
        </div>
    )
}

type SongItemProps = {
    song: Song,
    onDoubleClick: () => void,
    isSelected: boolean
};

const SongItem = ({ song, onDoubleClick, isSelected }: SongItemProps) => {
    const style = isSelected ? 'bg-gray-100' : '';
    return (
        <li onDoubleClick={onDoubleClick} className={`py-2 px-4 hover:bg-gray-100 cursor-pointer ${style}`}>
            {song.name}
        </li>
    )
};

export default Player