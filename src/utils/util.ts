
// Function to format time in seconds to minutes and seconds
// Example: 120 seconds will be formatted to 2:00
export const formatTime = function (secs: number) {
    const minutes = Math.floor(secs / 60) || 0;
    const seconds = (secs - minutes * 60) || 0;

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

