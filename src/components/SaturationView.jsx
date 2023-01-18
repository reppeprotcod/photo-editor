import * as React from 'react';
import * as Material from '@mui/material';

import { setSaturation } from '../algorithms/saturation';

const SaturationView = ({ preview, apply }) => {
    const [value, setValue] = React.useState(0);

    const getAriaValueText = (value) => {
        setValue(value);
        preview(setSaturation, [ value ]);
    }

    return (
        <div style={{ padding: "16px" }}>
            <Material.InputLabel style={{ color: "#fff" }}>
                Saturation
            </Material.InputLabel>
            <Material.Slider
                style={{ margin: "8px 0px 8px 0px" }}
                size="small"
                defaultValue={0}
                aria-label="Small"
                valueLabelDisplay="auto"
                min={-50}
                max={50}
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

export { SaturationView };