import { Song } from "./DataTypes";

import mp3 from './assets/With An Orchid.mp3'
import mp3_2 from './assets/Dreamcatcher.mp3'
import mp3_3 from './assets/Affections Touching Across Time.mp3'
import mp3_4 from './assets/Yesterday Once More.mp3'
import lyric1 from './assets/Yesterday Once More.lrc?raw'

export const songs: Song[] = [
    {
        name: 'With An Orchid',
        url: mp3,
    },
    {
        name: 'Dreamcatcher',
        url: mp3_2,
    },
    {
        name: 'Affections Touching Across Time',
        url: mp3_3,
    },
    {
        name: 'Yesterday Once More',
        url: mp3_4,
        lyric: lyric1
    }
];
