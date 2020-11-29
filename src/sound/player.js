/**
 * Include it in your tree to let him plays the notes according to the store state
 */
import {useSelector} from "react-redux";
import React from "react";

const removeKeyFromNotePlayed = (notePlayed, key) => {
    return notePlayed.filter(note => note.key !== key);
};

/**
 * Regarde si item.key est déjà joué
 * @param notePlayed
 * @param item
 * @return 0 si non
 * 1 si oui
 * 2 si oui mais il faut la rejouer
 */
const estDejaJoue = (notePlayed, item) => {
    const note = notePlayed.find(note => note.key === item.key);
    const note2 = notePlayed.find(note => note.id === item.id);

    if (note == null || note.id === undefined)
        return 0;

    if (note2 == null)
        return 2;
    return 1;
}

let notesPlayed = [];

/**
 * Put it at the beginning of your component tree
 * @param player
 * @constructor
 */
export const Player = ({player}) => {

    const notesToPlay = useSelector(state => state.notesToPlay);

    notesToPlay.forEach((note) => {
        switch (estDejaJoue(notesPlayed, note)) {
            case 0:// je dois la jouer
                player.play(note.key);
                notesPlayed.push(note);
                break;
            case 1:// elle est déjà jouée
                break;
            case 2:// elle est déjà jouée, mais je dois R&P
                notesPlayed = removeKeyFromNotePlayed(notesPlayed, note.key);
                player.play(note.key);
                notesPlayed.push(note);
                break;
            default:
                break;
        }
    });

    return (<div/>);
}