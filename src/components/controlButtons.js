import React from "react";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import Box from "@material-ui/core/Box";
import {Typography} from "@material-ui/core";

const textStyle = {
    paddingRight: '10px',
    color: 'white',
    maxLines: '1',
};

/**
 *
 * @param onClickPlay - the handler for clicking on button play
 * @param onSpeedChange - the handler when speed change
 * @param play - if I am on pay or pause
 * @param speed - the speed
 * @returns {JSX.Element}
 */
export const ControlButtons = ({onClickPlay, onSpeedFactorChange, play, speedFactor}) => {

    function valueText(value) {
        return `x${value}`;
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={onClickPlay}>
                {play ? "Pause" : "Play"}
            </Button>
            <Box mt={5} style={{marginLeft: 'auto',marginRight: 'auto',width:'70%'}} display="flex" flexDirection="row">
                <Typography style={textStyle}>
                    Vitesse (x{speedFactor})
                </Typography>
                <Slider
                    value={speedFactor}
                    getAriaValueText={valueText}
                    aria-labelledby="discrete-slider-small-steps"
                    step={0.1}
                    marks
                    min={0.1}
                    max={5}
                    valueLabelDisplay="auto"
                    onChange={(event, value) => onSpeedFactorChange(value)}
                />
            </Box>
        </div>
    );

}