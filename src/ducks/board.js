import typeToReducer from 'type-to-reducer';
import { replaceChar } from '../lib/strings';
import { getHighlighters, boardLocation } from '../lib/chess';

export const CLEAR = 'BOARD/CLEAR';
export const ADD_PIECE = 'BOARD/ADD-PIECE';

export const clearBoard = () => ({ type: CLEAR });
export const addPiece = (x, y, kind) => ({ type: ADD_PIECE, x, y, kind });

// Board is a string of 64 spaces. 8 rows joined together without any spaces
// Location for x, y on board is 8 * y to find the row, + x to find the column
const INITIAL_BOARD = '                                                                ';

// Store both the pieces locations and their highlights
const INITIAL_STATE = {
  pieces: INITIAL_BOARD,
  highlights: INITIAL_BOARD,
};

// Create highlight board
// Get highlight changing functions array for the type of piece
// Process each function in order until final highlight board is created
const highlightMoves = (board, x, y, kind) =>
  getHighlighters(kind).reduce((highlights, func) => func(board, highlights, x, y), INITIAL_BOARD);

// Add a new piece to the board
const addPieceReducer = (state, { x, y, kind }) => {
  const loc = boardLocation(x, y);
  if (loc == null) {
    return state;
  }
  // set the piece
  const pieces = replaceChar(state.pieces, loc, kind);
  return {
    ...state,
    pieces,
    highlights: highlightMoves(pieces, x, y, kind),
  };
};

// Reset board back to initial state
const clearReducer = (state, action) => {
  return { ...INITIAL_STATE };
};

const actionHandlers = {
  [CLEAR]: clearReducer,
  [ADD_PIECE]: addPieceReducer,
};

export default typeToReducer(actionHandlers, INITIAL_STATE);
