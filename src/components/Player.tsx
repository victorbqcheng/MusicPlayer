import React from 'react'
import styles from './Player.module.css'
import Controlbar from './Controlbar'
import music from '../assets/music.png'
import { CirclePlus, Menu } from 'lucide-react'

const Player = () => {

    const onOpenFileList = () => {
        
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


            </div>

            <div className={styles.controlbar}>
                <Controlbar />
            </div>
        </div>
    )
}

export default Player