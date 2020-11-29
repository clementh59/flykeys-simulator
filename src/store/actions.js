
/**
 * I store the id to know if I have to play again or not
 * @param {Array<{key,id}>} notesToPlay.
 * @returns {object} Action object.
 */
export const setNotesToPlay = notesToPlay => ({
  type: 'SET_NOTES_TO_PLAY',
  notesToPlay,
});

/**
 * reducer for setMatrix
 * @param {Array} matrix.
 * @returns {object} Action object.
 */
export const setMatrix = matrix => ({
  type: 'SET_MATRIX',
  matrix,
});