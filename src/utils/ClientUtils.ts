export class Platform {
    static readonly isAndroid = /android/i.test(navigator.userAgent);
    static readonly isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    static readonly isWindows = /windows/i.test(navigator.userAgent);
    static readonly isMacOS = /Macintosh|MacIntel|MacPPC|Mac68K/.test(navigator.userAgent);
}

export const getContrastTextColor = (color: string) => {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? "black" : "white";
};