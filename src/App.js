import './App.css';
import React, {useState} from "react";
import LedMatrix from "./components/ledMatrix";
import Soundfont from "soundfont-player";
import CircularProgress from "@material-ui/core/CircularProgress";
import {songFromFlykeys} from "./flykeys/utils";
import {ControlButtons} from "./components/controlButtons";
import {Player} from "./sound/player";
import {useDispatch, useSelector} from "react-redux";
import {setMatrix} from "./store/actions";

function App() {

    const dispatch = useDispatch();
    const [player, setPlayer] = useState(null);
    const [speed, setSpeed] = useState(null);
    const [speedFactor, setSpeedFactor] = useState(1);
    const matrix = useSelector(state => state.matrix);
    const [play, setPlay] = useState(false);

    const readImportFlykeysFile = (input) => {
        if (input.files === null || input.files.length === 0) {
            return
        }

        const file = input.files[0]
        const reader = new FileReader();
        Soundfont.instrument(new AudioContext(), 'acoustic_grand_piano').then(function (_player) {
            setPlayer(_player);
        })

        reader.onload = (e) => {
            const buf = e.target.result;
            const song = songFromFlykeys(buf);
            if (song.ledMatrix && song.speed) {
                setSpeed(song.speed);
                setSpeedFactor(1);
                dispatch(setMatrix(song.ledMatrix));
            }
        }

        reader.readAsText(file);
    }

    const onClickOpenFlykeys = (e) => readImportFlykeysFile(e.currentTarget)

    if (player === null)
        return (
            <div className="App">
                <input
                    accept=".txt, .flks"
                    type="file"
                    onChange={onClickOpenFlykeys}
                />
            </div>
        );

    if (matrix === null || speed === null)
        return (
            <div className="App">
                <CircularProgress/>
            </div>
        );

    /*******************            Control buttons callbacks       ****************/

    const onClickPlay = () => {
        setPlay(!play);
    }

    const onSpeedFactorChange = (speedFactor) => {
        setSpeedFactor(speedFactor);
    }

    return (
        <div className="App">
            <Player player={player} />
            <ControlButtons
                onClickPlay={onClickPlay}
                onSpeedFactorChange={onSpeedFactorChange}
                play={play}
                speedFactor={speedFactor}
            />
            <LedMatrix
                player={player}
                speed={speed / speedFactor}
                play={play}
            />
        </div>
    );
}

export default App;
