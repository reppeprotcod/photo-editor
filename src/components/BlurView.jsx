import * as React from 'react';
import * as Material from '@mui/material';

import { blur } from '../algorithms/blur';

const BlurView = ({ preview, apply }) => {
    const [value, setValue] = React.useState(0);

    const getAriaValueText = (value) => {
        setValue(value);
        preview(blur, [ value ]);
    }

    return (
        <div style={{ padding: "16px" }}>
            <Material.InputLabel style={{ color: "#fff" }}>
                Radius
            </Material.InputLabel>
            <Material.Slider
                style={{ margin: "8px 0px 8px 0px" }}
                size="small"
                defaultValue={2}
                aria-label="Small"
                valueLabelDisplay="auto"
                min={2}
                max={15}
                getAriaValueText={getAriaValueText}>
            </Material.Slider>
            <Material.Button
                onClick={() => apply(value)}
                variant="outlined">
                Apply
            </Material.Button>
        </div>
    );
}

export { BlurView };
