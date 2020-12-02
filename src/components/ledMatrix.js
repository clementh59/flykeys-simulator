import React, {useEffect, useState} from "react";
import {NUMBER_OF_VERTICAL_LAYERS} from "../constants";
import LineOfLed from "./lineOfLedComponent";
import {buildDefaultLayerMatrix} from "../flykeys/utils";
import {useDispatch, useSelector} from "react-redux";
import {setNotesToPlay} from "../store/actions";

//const initValueOfTick = -NUMBER_OF_VERTICAL_LAYERS-1;
const initValueOfTick = 0;

export default function LedMatrix({player, speed, play}) {

    const dispatch = useDispatch();
    const [tick, setTick] = useState(initValueOfTick);
    const matrix = useSelector(state => state.matrix);

    // un tableau de NUMBER_OF_VERTICAL_LAYERS*NUMBER_OF_HORIZONTAL_LEDS
    // contient les indications de couleur pour chaque Led de la matrice
    // une couleur peut etre par exemple : "" (default), "MD", "MG", ...
    const actualLedMatrix = Array.from(Array(NUMBER_OF_VERTICAL_LAYERS).keys()).map(item => (
        buildDefaultLayerMatrix()
    ));

    for (let i=0; i<NUMBER_OF_VERTICAL_LAYERS; i++) {
        if (tick>=0 && tick+i<matrix.length) {
            actualLedMatrix[i] = matrix[tick + i];
        }
        else
            actualLedMatrix[i] = buildDefaultLayerMatrix();
    }

    const incrementTick = () => {
        const notesToPlay = [];
        matrix[tick]?.forEach((item, key)=>{
            if (item.color!=='') {
                notesToPlay.push({key:key,id:item.id});
            }
        });
        dispatch(setNotesToPlay(notesToPlay));
        setTick(tick+1);
    }

    useEffect(() => {
        if (play) {
            const fn = setTimeout(incrementTick, speed);
            return () => {
                clearTimeout(fn);
            }
        }
    });

    useEffect(() => {
        window.setTick = (value) => {
            setTick(value);
        }
    });

    return (
        <div>
            <span style={{color:'white'}}>tick actuel : {tick}</span>
            {Array.from(Array(NUMBER_OF_VERTICAL_LAYERS).keys()).map(item => (
                <LineOfLed key={item} ledColors={actualLedMatrix[NUMBER_OF_VERTICAL_LAYERS-item-1]}/>
            ))}
        </div>
    );
}