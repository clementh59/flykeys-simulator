import React from "react";

export default function Led({ledSize, horizontalMargin, color}) {

    return (
        <div
            style={{
                width: ledSize,
                height: ledSize,
                borderRadius: ledSize,
                backgroundColor: color,
                marginLeft: horizontalMargin,
                marginRight: horizontalMargin,
            }}
            onClick={onclick}
        >

        </div>
    );

}