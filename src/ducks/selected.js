import typeToReducer from 'type-to-reducer';
import { CLEAR } from './board';
import { PIECES } from '../lib/chess';

export const SELECT_PIECE = 'SELECTED/SELECT-PIECE';

export const selectPiece = piece => ({ type: SELECT_PIECE, piece });

// Assume first choice from piece list. Track selection from then on.
const INITIAL_STATE = PIECES[0];

const selectPieceReducer = (state, { piece }) => {
  return piece;
};

// Reset to initial state
const clearReducer = (state, action) => {
  return INITIAL_STATE;
};

const actionHandlers = {
  [CLEAR]: clearReducer,
  [SELECT_PIECE]: selectPieceReducer,
};

export default typeToReducer(actionHandlers, INITIAL_STATE);
