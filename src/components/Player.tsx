import React from 'react'
import styles from './Player.module.css'
import Controlbar from './Controlbar'

const Player = () => {
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                main
            </div>

            <div className={styles.controlbar}>
                <Controlbar />
            </div>
        </div>
    )
}

export default Player