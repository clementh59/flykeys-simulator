/**
 * read the Flykeys file and return a JSON.
 * @param data - the file as a string
 * @returns {Object} {speed, ledMatrix} - empty objet if the file isn't good.
 * ledMatrix is the matrix of LED but with each possible layer until the end of the song
 */
import {Note} from "../notes/note";
import {NUMBER_OF_HORIZONTAL_LEDS} from "../constants";
import {MD_RP, MG_RP, SUFFIX_RP} from "../constants/constants";

export function buildDefaultLayerMatrix() {
    return Array.from(Array(NUMBER_OF_HORIZONTAL_LEDS).keys()).map(item => {
        return {
            id: 0,
            color: '',
        };
    });
}

/**
 *
 * @param led
 * @returns {boolean} - true if the color is a R&P color, false otherwise
 */
const isRAndP = (led) => {
    return led.color === MD_RP || led.color === MG_RP;
}

/**
 *
 * @param led
 * @returns {boolean} - true if the color isn't empty, false otherwise
 */
const isOn = (led) => {
    return led.color !== "";
}

/**
 * set the note with the id passed in param to R&P
 * @param matrix
 * @param id - the id of the note to set to RP
 * @param layer - the layer of the first note to set
 * @param key - the key of the note
 */
const setIsRP = (matrix, id, layer, key) => {
    while (layer < matrix.length && matrix[layer][key].id === id) {
        matrix[layer][key].color += SUFFIX_RP;
        layer++;
    }
}

/**
 * if a note needs to be R&P, it is configured in this function
 * @param {Array} matrix - the led matrix
 */
const setAllTheRPForMatrix = (matrix) => {
    for (let layer = 1; layer < matrix.length; layer++) {
        for (let led = 0; led < NUMBER_OF_HORIZONTAL_LEDS; led++) {
            // si deux leds d'affilée sont allumées
            if (isOn(matrix[layer - 1][led]) && isOn(matrix[layer][led])) {
                // si les notes sont deux notes différentes
                if (matrix[layer - 1][led].id !== matrix[layer][led].id) {
                    // et que la note d'en dessous n'est pas déjà R&P
                    if (!isRAndP(matrix[layer - 1][led])) {
                        setIsRP(matrix, matrix[layer][led].id, layer, led);
                    }
                }
            }
        }
    }
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

    setAllTheRPForMatrix(ledMatrix);

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