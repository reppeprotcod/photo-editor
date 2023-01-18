import '../styles/App.css';
import * as React from 'react';
import * as Material from '@mui/material';

import { ImageView } from './ImageView';
import { EffectsView } from './EffectsView';
import { EffectsWindow } from './EffectsWindow';

const App = () => {
    const [imgLoaded, setImgLoaded] = React.useState(false);
    const [imgSrc, setImgSrc] = React.useState('');

    const [imgWidth, setImgWidth] = React.useState(0);
    const [imgHeight, setImgHeight] = React.useState(0);
    const [imgPixels, setImgPixels] = React.useState(new Uint8ClampedArray());
    const [result, setResult] = React.useState(new Uint8ClampedArray());

    const [effectsWindow, setEffectsWindow] = React.useState(false);
    const [effects, setEffects] = React.useState([]);
    const [lastKey, setLastKey] = React.useState(0);

    const onImageLoad = (e) => {
        if (!(e.path && e.path.length && e.path.length > 0)) return;
        // Display image
        const image = e.path[0];
        setImgSrc(image.src);
        setImgWidth(image.width);
        setImgHeight(image.height);
        // Draw image on canvas
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
        // Get image pixels
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        setImgPixels(data);
        setResult(data);
        setEffects([]);
        setImgLoaded(true);
    }

    const onFileLoad = (e) => {
        const image = new Image();
        image.onload = onImageLoad;
        image.src = e.target.result;
    }

    const onFileDrop = (files) => {
        if (!(files && files.length && files.length > 0)) return;
        const reader = new FileReader();
        reader.onload = onFileLoad;
        reader.readAsDataURL(files[0]);
    }

    const displayImage = (pixels) => {
        const data = new ImageData(pixels, imgWidth, imgHeight);
        const canvas = document.createElement('canvas');
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        const ctx = canvas.getContext('2d');
        ctx.putImageData(data, 0, 0);
        setImgSrc(canvas.toDataURL());
    }

    const previewEffect = (effect, args = null) => {
        if (!imgLoaded) return;
        const params = [result, imgWidth, imgHeight];
        if (args) params.push(...args);
        displayImage(effect(...params));
    }

    const addEffect = (name, color, effect, args = null) => {
        if (!imgLoaded) return;
        // Apply effect
        const params = [result, imgWidth, imgHeight];
        if (args) params.push(...args);
        const pixels = effect(...params);
        // Save effect
        const newEffect = {
            key: lastKey,
            name: name,
            color: color,
            effect: effect,
            args: args
        };
        setLastKey(lastKey + 1);
        // Save result
        displayImage(pixels);
        setResult(pixels);
        setEffects([...effects, newEffect]);
    }

    const removeEffect = (effect) => {
        const index = effects.findIndex((e) => e.key === effect.key);
        const newEffects = effects.slice(0, index).concat(effects.slice(index + 1));
        applyEffects(newEffects);
        setEffects(newEffects);
    }

    const applyEffects = (newEffects) => {
        // Copy original pixels
        let newImage = new Uint8ClampedArray(imgPixels.length);
        for (let i = 0; i < imgPixels.length; i++) {
            newImage[i] = imgPixels[i];
        }
        // Apply effects
        for (let i = 0; i < newEffects.length; i++) {
            const effect = newEffects[i].effect;
            const args = newEffects[i].args;
            const params = [newImage, imgWidth, imgHeight];
            if (args) params.push(...args);
            newImage = effect(...params);
        }
        displayImage(newImage);
        setResult(newImage);
    }

    const setVisibility = (value) => {
        setEffectsWindow(value);
    }

    const forceUpdate = () => {
        if (imgLoaded) {
            applyEffects(effects);
        }
    }

    const download = () => {
        if (imgLoaded) {
            var hiddenElement = document.createElement('a');
            hiddenElement.href = imgSrc;
            hiddenElement.target = '_blank';
            hiddenElement.download = 'export.png';
            hiddenElement.click();
        }
    }

    return (
        <div className="app">
            <input id="input-file" type="file" onChange={(e) => {
                onFileDrop(e.target.files);
            }} style={{ visibility: "hidden", position: "absolute" }}/>
            <Material.Button
                variant="contained"
                onClick={download}
                style={{position: "absolute"}}>
                Save
            </Material.Button>
            <label className="upload-button" htmlFor="input-file">
                <ImageView onDrop={onFileDrop} image={imgSrc} />
            </label>
            <div className="row">
                <EffectsView
                    effects={effects}
                    setVisibility={setVisibility}
                    removeEffect={removeEffect} />
            </div>
            <EffectsWindow
                shown={effectsWindow}
                setVisibility={setVisibility}
                addEffect={addEffect}
                previewEffect={previewEffect}
                forceUpdate={forceUpdate} />
        </div>
    );
}

export { App };
