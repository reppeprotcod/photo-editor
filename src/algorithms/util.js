const clamp = (value) => {
    return Math.max(0, Math.min(Math.floor(value), 255));
}


export { clamp };
