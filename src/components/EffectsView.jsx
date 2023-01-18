import '../styles/EffectsView.css';
import * as React from 'react';

const AddButton = ({ onClick }) => {
    return (
        <div onClick={onClick} className="effect" style={{ cursor: "pointer", backgroundColor: "#444" }}>
            <div className="add-button">+</div>
        </div>
    );
}

const Effect = ({ removeEffect, effect }) => {
    return (
        <div
            className="effect"
            style={{ backgroundColor: effect.color }}
            onClick={() => removeEffect(effect)}
        >
            {effect.name}
            <br></br>
            {effect.args}
        </div>
    );
}

const EffectsView = ({ effects, setVisibility, removeEffect }) => {
    return (
        <div className="effects-view">
            <AddButton onClick={() => setVisibility(true)} />
            {
                effects.map(effect => {
                    return <Effect
                        key={effect.key}
                        removeEffect={removeEffect}
                        effect={effect}
                    />;
                })
            }
        </div>
    );
}

export { EffectsView };
