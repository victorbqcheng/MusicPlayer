import React, { useEffect } from 'react'
import styles from './Lyric.module.css'
import { LyricLine } from '../../DataTypes';


type LyricProps = {
    lyricLines?: LyricLine[] | null;
    currentTime?: number;
};

const findCurrentLineIndex = (currentTime?: number, lyricLines?:LyricLine[]|null) => {
    if (!lyricLines || !currentTime) {
        return -1;
    }
    for (let i = 0; i < lyricLines.length; i++) {
        if (lyricLines[i].time > currentTime) {
            return i - 1;
        }
    }
    return lyricLines.length - 1;
};

let lineHeight = 100;

const Lyric = ({ lyricLines, currentTime }: LyricProps) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const linesRef = React.useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if(linesRef.current && lyricLines?.length > 0) {
            // const styles = getComputedStyle(linesRef.current);
            // linesRef.current.offsetHeight;
            // console.log("styles:", styles);
            // lineHeight = parseInt(getComputedStyle(linesRef.current).height);
            // console.log('lineHeight:', lineHeight);     // lineHeight/lyricLines.length
            const linesHeight = parseInt(getComputedStyle(linesRef.current).height);
            lineHeight = linesHeight / lyricLines!.length;
        }
    }, [lyricLines]);

    useEffect(() => {
        if (linesRef.current) {
            const index = findCurrentLineIndex(currentTime, lyricLines);
            if (index >= 0) {
                const px = `${(index+0.5) * lineHeight}px`;     // 0.5 to make the lyric in the center
                linesRef.current.style.top = `calc(50% - ${px})`
            }
        }
    }, [currentTime]);



    const lyricItems = lyricLines?.map((lyricLine, index) => {
        return <LyricItem key={index} lyricLine={lyricLine} />
    });

    return (
        <div ref={containerRef} className={styles.lyriccontainer}>
            <div ref={linesRef} className={styles.lyriclines}>
                {lyricItems}
            </div>
            <div className={styles.lyricmask}></div>
        </div>
    )
}

type LyricItemProps = {
    lyricLine: LyricLine;
};

const LyricItem = ({ lyricLine }: LyricItemProps) => {
    return (
        <div style={{ fontSize: '20px', display:'flex', justifyContent:'', alignItems:'center' }}>
            <span>{lyricLine.time}</span>:&nbsp;
            <span style={{ display: "" }}>{lyricLine.timeStr}&nbsp;</span>
            <span>{lyricLine.line}</span>
        </div>
    )
};

export default Lyric