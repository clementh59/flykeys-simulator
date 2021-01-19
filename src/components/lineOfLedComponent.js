import Led from "./ledComponent";
import React from "react";
import Box from '@material-ui/core/Box';
import {NUMBER_OF_HORIZONTAL_LEDS} from "../constants";
import {MD, MD_RP, MG, MG_RP} from "../constants/constants";

const MD_COLOR = "#77fc03";
const MG_COLOR = "#0398fc";
const MD_RP_COLOR = "#fff";
const MG_RP_COLOR = "#fff";
export const NOT_LIGHT_COLOR = "#624c30";

export default class LineOfLed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {width: 0, height: 0};
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        //window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        //window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    getColorFromHand = (hand) => {
        switch (hand) {
            case MD:
                return MD_COLOR;
            case MG:
                return MG_COLOR;
            case MD_RP:
                return MD_RP_COLOR;
            case MG_RP:
                return MG_RP_COLOR;
            default:
                return NOT_LIGHT_COLOR;
        }
    }

    render() {

        const ledPlace = this.state.width / NUMBER_OF_HORIZONTAL_LEDS;
        const ledSize = ledPlace * 12 / 14 + "px";
        const horizontalMargin = ledPlace / 14 + "px";

        return (

            <Box display="flex" flexDirection="row" style={{marginTop: horizontalMargin}}>
                {Array.from(Array(NUMBER_OF_HORIZONTAL_LEDS).keys()).map((item) => {
                    let color = this.props.ledColors[item].color;
                    return (<Led key={item} num={item} ledSize={ledSize} horizontalMargin={horizontalMargin}
                                 color={this.getColorFromHand(color)}/>);
                })}
            </Box>
        );
    }

}