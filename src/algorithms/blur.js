const blur = (imgPixels, imgWidth, imgHeight, radius) => {
    const pixelCount = imgPixels.length / 4;

    const result = new Uint8ClampedArray(imgPixels.length);
    const resultR = new Uint8ClampedArray(pixelCount);
    const resultG = new Uint8ClampedArray(pixelCount);
    const resultB = new Uint8ClampedArray(pixelCount);

    const pixelsR = new Uint8ClampedArray(pixelCount);
    const pixelsG = new Uint8ClampedArray(pixelCount);
    const pixelsB = new Uint8ClampedArray(pixelCount);

    // Split channels
    for (let i = 0; i < pixelCount; i++) {
        pixelsR[i] = imgPixels[i * 4 + 0];
        pixelsG[i] = imgPixels[i * 4 + 1];
        pixelsB[i] = imgPixels[i * 4 + 2];
        result[i * 4 + 3] = imgPixels[i * 4 + 3];
    }

    const bxs = boxesForGauss(radius, 3);
    // Red channel
    boxBlur(pixelsR, resultR, imgWidth, imgHeight, (bxs[0] - 1) / 2);
    boxBlur(resultR, pixelsR, imgWidth, imgHeight, (bxs[1] - 1) / 2);
    boxBlur(pixelsR, resultR, imgWidth, imgHeight, (bxs[2] - 1) / 2);
    // Green channel
    boxBlur(pixelsG, resultG, imgWidth, imgHeight, (bxs[0] - 1) / 2);
    boxBlur(resultG, pixelsG, imgWidth, imgHeight, (bxs[1] - 1) / 2);
    boxBlur(pixelsG, resultG, imgWidth, imgHeight, (bxs[2] - 1) / 2);
    // Blue channel
    boxBlur(pixelsB, resultB, imgWidth, imgHeight, (bxs[0] - 1) / 2);
    boxBlur(resultB, pixelsB, imgWidth, imgHeight, (bxs[1] - 1) / 2);
    boxBlur(pixelsB, resultB, imgWidth, imgHeight, (bxs[2] - 1) / 2);

    // Join channels
    for (let i = 0; i < pixelCount; i++) {
        result[i * 4 + 0] = resultR[i];
        result[i * 4 + 1] = resultG[i];
        result[i * 4 + 2] = resultB[i];
    }

    return result;
}

const boxesForGauss = (sigma, n) => {
    var wIdeal = Math.sqrt((12 * sigma * sigma / n) + 1);
    var wl = Math.floor(wIdeal); if (wl % 2 === 0) wl--;
    var wu = wl + 2;

    var mIdeal = (12 * sigma * sigma - n * wl * wl - 4 * n * wl - 3 * n) / (-4 * wl - 4);
    var m = Math.round(mIdeal);

    var sizes = []; for (var i = 0; i < n; i++) sizes.push(i < m ? wl : wu);
    return sizes;
}

const boxBlur = (scl, tcl, w, h, r) => {
    for (var i = 0; i < scl.length; i++) tcl[i] = scl[i];
    boxBlurH(tcl, scl, w, h, r);
    boxBlurT(scl, tcl, w, h, r);
}

const boxBlurH = (scl, tcl, w, h, r) => {
    for (var i = 0; i < h; i++)
        for (var j = 0; j < w; j++) {
            var val = 0;
            for (var ix = j - r; ix < j + r + 1; ix++) {
                var x = Math.min(w - 1, Math.max(0, ix));
                val += scl[i * w + x];
            }
            tcl[i * w + j] = val / (r + r + 1);
        }
}

const boxBlurT = (scl, tcl, w, h, r) => {
    for (var i = 0; i < h; i++) {
        for (var j = 0; j < w; j++) {
            var val = 0;
            for (var iy = i - r; iy < i + r + 1; iy++) {
                var y = Math.min(h - 1, Math.max(0, iy));
                val += scl[y * w + j];
            }
            tcl[i * w + j] = val / (r + r + 1);
        }
    }
}

export { blur };
