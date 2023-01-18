import { clamp } from './util';

const setLightness = (imgPixels, imgWidth, imgHeight, value) => {
    const lightness = value * 3;
    const result = new Uint8ClampedArray(imgPixels.length);
    for (let i = 0; i < imgPixels.length; i += 4) {
        result[i + 0] = clamp(imgPixels[i + 0] + lightness);
        result[i + 1] = clamp(imgPixels[i + 1] + lightness);
        result[i + 2] = clamp(imgPixels[i + 2] + lightness);
        result[i + 3] = imgPixels[i + 3];
    }
    return result;
}

export { setLightness };
