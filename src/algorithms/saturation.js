const applyMatrix = (mat, r, g, b) => {
    const tr = r * mat[0][0] + g * mat[1][0] + b * mat[2][0] + mat[3][0];
    const tg = r * mat[0][1] + g * mat[1][1] + b * mat[2][1] + mat[3][1];
    const tb = r * mat[0][2] + g * mat[1][2] + b * mat[2][2] + mat[3][2];
    return [tr, tg, tb];
}

const setSaturation = (imgPixels, imgWidth, imgHeight, value) => {
    const result = new Uint8ClampedArray(imgPixels.length);
    const s = (Number(value) * 2 + 100) / 100;
    const rwgt = 0.3086;
    const gwgt = 0.6094;
    const bwgt = 0.0820;
    const a = (1.0 - s) * rwgt + s;
    const b = (1.0 - s) * rwgt;
    const c = (1.0 - s) * rwgt;
    const d = (1.0 - s) * gwgt;
    const e = (1.0 - s) * gwgt + s;
    const f = (1.0 - s) * gwgt;
    const g = (1.0 - s) * bwgt;
    const h = (1.0 - s) * bwgt;
    const i = (1.0 - s) * bwgt + s;
    const matrix = [
        [a, b, c, 0],
        [d, e, f, 0],
        [g, h, i, 0],
        [0, 0, 0, 1]
    ];
    for (let i = 0; i < imgPixels.length; i += 4) {
        const rgb = applyMatrix(matrix, imgPixels[i + 0], imgPixels[i + 1], imgPixels[i + 2]);
        result[i + 0] = rgb[0];
        result[i + 1] = rgb[1];
        result[i + 2] = rgb[2];
        result[i + 3] = imgPixels[i + 3];
    }
    return result;
}

export { setSaturation };
