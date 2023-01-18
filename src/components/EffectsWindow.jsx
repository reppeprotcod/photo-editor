import '../styles/EffectsWindow.css';
import * as React from 'react';
import * as Material from '@mui/material';
import Draggable from 'react-draggable';

import { toGrayscale } from '../algorithms/grayscale';
import { setLightness } from '../algorithms/lightness';
import { setSaturation } from '../algorithms/saturation';
import { setContrast } from '../algorithms/contrast';
import { blur } from '../algorithms/blur';

import { LightnessView } from './LightnessView';
import { SaturationView } from './SaturationView';
import { ContrastView } from './ContrastView';
import { BlurView } from './BlurView';

const EffectsWindow = ({ shown, setVisibility, addEffect, previewEffect, forceUpdate }) => {
    const [currentView, setCurrentView] = React.useState(null);

    const grayscaleEffect = () => { addEffect('Grayscale', '#111', toGrayscale); close(); }
    const lightnessEffect = (value) => { addEffect('Lightness', '#555', setLightness, [value]); close(); }
    const saturationEffect = (value) => { addEffect('Saturation', '#334', setSaturation, [value]); close(); }
    const contrastEffect = (value) => { addEffect('Contrast', '#243', setContrast, [value]); close(); }
    const blurEffect = (value) => { addEffect('Blur', '#543', blur, [value]); close(); }

    const close = (force = false) => {
        setCurrentView(null);
        setVisibility(false);
        if (force) forceUpdate();
    }

    const showLightnessView = () => {
        setCurrentView(<LightnessView preview={previewEffect} apply={lightnessEffect} />);
    }

    const showSaturationView = () => {
        setCurrentView(<SaturationView preview={previewEffect} apply={saturationEffect} />);
    }

    const showContrastView = () => {
        setCurrentView(<ContrastView preview={previewEffect} apply={contrastEffect} />);
    }

    const showBlurView = () => {
        setCurrentView(<BlurView preview={previewEffect} apply={blurEffect} />);
    }

    return (
        shown ? <Draggable handle=".row" defaultPosition={{ x: 10, y: 10 }}>
            <div className="effects-window">
                <div style={{ display: "flex" }}>
                    {
                        currentView
                            ? <div onClick={() => { setCurrentView(null); forceUpdate(); }} className="back-button">‹</div>
                            : null
                    }
                    <div className="row">
                        <label className="title-bar">Filters</label>
                    </div>
                    <div onClick={() => close(true)} className="close-button">✕</div>
                </div>
                <div style={{ margin: "10px 0px 10px 0px", overflowY: "auto", overflowX: "hidden" }}>
                    {
                        currentView ? currentView :
                            <Material.List>
                                <Material.ListItem
                                    className="effects-list-item"
                                    onClick={grayscaleEffect}>
                                    Grayscale
                                </Material.ListItem>
                                <Material.ListItem
                                    className="effects-list-item"
                                    onClick={showLightnessView}>
                                    Lightness
                                </Material.ListItem>
                                <Material.ListItem
                                    className="effects-list-item"
                                    onClick={showSaturationView}>
                                    Saturation
                                </Material.ListItem>
                                <Material.ListItem
                                    className="effects-list-item"
                                    onClick={showContrastView}>
                                    Contrast
                                </Material.ListItem>
                                <Material.ListItem
                                    className="effects-list-item"
                                    onClick={showBlurView}>
                                    Blur
                                </Material.ListItem>
                            </Material.List>
                    }
                </div>
            </div>
        </Draggable> : null
    );
}

export { EffectsWindow };
