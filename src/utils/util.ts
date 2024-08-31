
// Function to format time in seconds to minutes and seconds
// Example: 120 seconds will be formatted to "2:00"
export const formatTime = function (secs: number):string {
    const minutes = Math.floor(secs / 60) || 0;
    const seconds = (secs - minutes * 60) || 0;

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}


// timeStr: [02:06.08] --> 126.08
export const parseLyricTime = (timeStr: string):number => {
    const timeStrArr = timeStr.replace('[', '').replace(']', '').split(':');
    const minutes = parseInt(timeStrArr[0]);
    const seconds = parseFloat(timeStrArr[1]);
    let result = minutes * 60 + seconds;
    result = Math.floor(result * 100) / 100;
    return result;
};
