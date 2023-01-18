import { clamp } from "./util";

const setContrast = (imgPixels, imgWidth, imgHeight, value) => {
    const contrast = (value * 4 + 256);
    const result = new Uint8ClampedArray(imgPixels.length);
    
    const buf = new Uint8ClampedArray(256);
    let midBright = 0;
    for (let i = 0; i < imgPixels.length; i += 4) {
        midBright += imgPixels[i + 0] * 77 + imgPixels[i + 1] * 150 + imgPixels[i + 2] * 29;
    }
    midBright = Math.floor(midBright / (256 * imgPixels.length / 3));

    for (let i = 0; i < 256; i++) {
        const a = Math.floor((((i - midBright) * contrast) / 256) + midBright);
        buf[i] = clamp(a);
    }

    for (let i = 0; i < imgPixels.length; i += 4) {
        result[i + 0] = buf[imgPixels[i + 0]];
        result[i + 1] = buf[imgPixels[i + 1]];
        result[i + 2] = buf[imgPixels[i + 2]];
        result[i + 3] = imgPixels[i + 3];
    }

    return result;
}

export { setContrast };
