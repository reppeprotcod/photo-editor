const toGrayscale = (imgPixels, imgWidth, imgHeight) => {
    const result = new Uint8ClampedArray(imgPixels.length);
    for (let i = 0; i < imgPixels.length; i += 4) {
        const avg = (imgPixels[i + 0] + imgPixels[i + 1] + imgPixels[i + 2]) / 3;
        result[i + 0] = result[i + 1] = result[i + 2] = avg;
        result[i + 3] = imgPixels[i + 3];
    }
    return result;
}

export { toGrayscale };
