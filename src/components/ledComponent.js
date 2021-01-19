import React from "react";
import {NOT_LIGHT_COLOR} from "./lineOfLedComponent";

export default function Led({ledSize, horizontalMargin, color}) {

    return (
        <div
            style={{
                backgroundColor: NOT_LIGHT_COLOR,
            }}
        >
            <div
                style={{
                    width: ledSize,
                    height: ledSize,
                    backgroundColor: color,
                    marginLeft: horizontalMargin,
                    marginRight: horizontalMargin,
                }}
                onClick={onclick}
            />
        </div>
    );

}