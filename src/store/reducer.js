/**
 * Create a reducer with appropriate handlers.
 *
 * @param {*} initialState - Initial state of the reducer.
 * @param {object} handlers - Object of handlers for each action type.
 * @returns {Function} Reducer function.
 */
import {combineReducers} from "redux";

const createReducer = (initialState, handlers) => (state = initialState, action) =>
    // eslint-disable-next-line no-prototype-builtins
    handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state;

export default combineReducers({
    notesToPlay: createReducer([], {
        SET_NOTES_TO_PLAY: (state, { notesToPlay }) => notesToPlay,
    }),
    matrix: createReducer([], {
        SET_MATRIX: (state, { matrix }) => matrix,
    }),
});
