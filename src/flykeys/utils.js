/**
 * read the Flykeys file and return a JSON.
 * @param data - the file as a string
 * @returns {Object} {speed, ledMatrix} - empty objet if the file isn't good.
 * ledMatrix is the matrix of LED but with each possible layer until the end of the song
 */
import {Note} from "../notes/note";
import {NUMBER_OF_HORIZONTAL_LEDS} from "../constants";

export function buildDefaultLayerMatrix() {
    return Array.from(Array(NUMBER_OF_HORIZONTAL_LEDS).keys()).map(item => {
        return {
            id: 0,
            color: '',
        };
    });
}

export function songFromFlykeys(data) {
    const listeNotes = [];
    const lines = data.split('\n');

    if (lines.length === 0) {
        alert("Le fichier ne contient aucune information!");
        return {};
    }

    // @ts-ignore
    const [tempoStr, scaleStr, speedStr] = lines.shift().split(';');

    const tempo = parseInt(tempoStr);
    const scale = parseInt(scaleStr);
    const speed = parseInt(speedStr);

    if (!tempo || !scale || !speed) {
        alert("Le fichier ne contient pas le bon header!");
        return {};
    }

    let ID = 0;

    lines.forEach((line) => {
        const [keyStr, tickOnStr, tickOffStr, color] = line.split(' ');

        const key = parseInt(keyStr);
        const tickOn = parseInt(tickOnStr);
        const tickOff = parseInt(tickOffStr);

        if (key && tickOn && tickOff && color) {
            listeNotes.push(Note(ID++, tickOn, tickOff, key, color));
        }
    });

    const maxTick = getMaxTick(listeNotes);

    // un tableau de NUMBER_OF_VERTICAL_LAYERS*NUMBER_OF_HORIZONTAL_LEDS
    // contient les indications de couleur pour chaque Led de la matrice
    // une couleur peut etre par exemple : "" (default), "MD", "MG", ...
    const ledMatrix = Array.from(Array(maxTick).keys()).map(item => (
        buildDefaultLayerMatrix()
    ));

    listeNotes.forEach((note) => {
        for (let i = note.tickON; i < note.tickOFF; i++) {
            ledMatrix[i][note.key] = {id: note.id, color: note.color};
        }
    });

    return {
        speed: speed,
        ledMatrix: ledMatrix,
    };
}

/**
 * return {int} the higher tick
 */
const getMaxTick = (listeNotes) => {
    let tick = 0;
    listeNotes.forEach(note => {
        if (note.tickOFF > tick)
            tick = note.tickOFF;
    });

    return tick;
};