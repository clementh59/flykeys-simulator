import Led from "./ledComponent";
import React from "react";
import Box from '@material-ui/core/Box';
import {NUMBER_OF_HORIZONTAL_LEDS} from "../constants";
import {useDispatch} from "react-redux";

const MD_COLOR = "#77fc03";
const MG_COLOR = "#0398fc";
const NOT_LIGHT_COLOR = "#666";

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
        switch (hand){
            case 'MD':
                return MD_COLOR;
            case 'MG':
                return MG_COLOR;
            default:
                return NOT_LIGHT_COLOR;
        }
    }

    render() {

        const ledPlace = this.state.width / NUMBER_OF_HORIZONTAL_LEDS;
        const ledSize = ledPlace * 2 / 3 + "px";
        const horizontalMargin = ledPlace / 6 + "px";

        return (
            <Box display="flex" flexDirection="row" style={{marginTop:"7px"}}>
                {Array.from(Array(NUMBER_OF_HORIZONTAL_LEDS).keys()).map((item) => {
                    let color = this.props.ledColors[item].color;
                    return (<Led key={item} num={item} ledSize={ledSize} horizontalMargin={horizontalMargin}
                                 color={this.getColorFromHand(color)}/>);
                })}
            </Box>
        );
    }

}