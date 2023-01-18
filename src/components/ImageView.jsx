import '../styles/ImageView.css';
import * as React from 'react';
import { FileDrop } from 'react-file-drop';

const ImageView = ({ onDrop, image }) => {
    return (
        <FileDrop targetClassName='imageview-drop-target' onDrop={onDrop}>
            <div style={{
                width: "100%",
                height: "100%",
                background: "center / contain no-repeat url('" + image.replace(/(\r\n|\r|\n)/gm, '') + "')"
            }} />
        </FileDrop>
    );
}

export { ImageView };
