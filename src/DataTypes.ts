
export type Song = {
    name: string;
    url: string;
    lyric?: string;
};


export type LyricLine = {
    time: number;   // in seconds
    timeStr: string; // in format [mm:ss.xx]
    line: string;
};