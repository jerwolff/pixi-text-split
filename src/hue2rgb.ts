﻿const ONE_SIXTH = 1 / 6;
const ONE_THIRD = 1 / 3;
const TWO_THIRDS = 2 / 3;

export const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) {
        t += 1;
    }
    if (t > 1) {
        t-= 1;
    }
    if (t < ONE_SIXTH) {
        return p + (q - p) * 6 * t;
    }
    if (t < 0.5) {
        return q;
    }
    if (t < TWO_THIRDS) {
        return p + (q - p) * (TWO_THIRDS - t) * 6;
    }
    return p;
};

export const hsl2rgb = (h: number, s: number, l: number) => {
    if (s === 0) {
        return new Array(3).fill(l);
    }
    const q =
        l < 0.5 ?
            l * s + l :
            l + s - l * s;
    const p = 2 * l - q;
    return [
        hue2rgb(p, q, h + ONE_THIRD),
        hue2rgb(p, q, h),
        hue2rgb(p, q, h - ONE_THIRD),
    ];
}