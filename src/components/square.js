import React from 'react';
import { connect } from 'react-redux';
import { addPiece } from '../ducks/board';
import { boardLocation } from '../lib/chess';

// Show a single game board square
// Indicate piece or square or empty
// Indicate valid move location for last placed piece
// Indicate valid capture location for last placed piece

// Show either the piece with optional highlight div wrapper
// Empty locations use html entity nbsp to fill highlight area
const highlightedPiece = (highlight, piece) => {
  if (highlight) {
    if (piece === ' ') {
      return <div className={highlight}>&nbsp;</div>;
    }
    return <div className={highlight}>{piece}</div>;
  }
  return piece;
};

const highlightClass = highlight => {
  switch (highlight) {
    case 'V':
      return 'valid-move';

    case 'A':
      return 'valid-attack';

    default:
      return null;
  }
};

const Square = ({ piece, highlight, onClick }) => (
  <td onClick={onClick}>{highlightedPiece(highlight, piece)}</td>
);

export default connect(
  ({ board: { pieces, highlights }, selected }, { x, y }) => ({
    piece: pieces.charAt(boardLocation(x, y)),
    highlight: highlights.charAt(boardLocation(x, y)),
    kind: selected,
  }),
  null,
  ({ kind, piece, highlight }, { dispatch }, { x, y }) => ({
    piece,
    highlight: highlightClass(highlight),
    onClick: () => dispatch(addPiece(x, y, kind)),
  })
)(Square);
