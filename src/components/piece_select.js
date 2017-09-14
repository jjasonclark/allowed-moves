import React from 'react';
import { connect } from 'react-redux';
import { selectPiece } from '../ducks/selected';
import { PIECES, pieceColor } from '../lib/chess';

// Show selector for current piece to place on board

const PieceSelect = ({ selected, onChange }) => (
  <div className="piece-select">
    <span>Select piece to add</span>
    <select onChange={onChange} value={selected}>
      {PIECES.map((piece, index) => (
        <option key={index} value={piece}>
          {pieceColor(piece)} - {piece}
        </option>
      ))}
    </select>
  </div>
);

export default connect(
  ({ selected }) => ({ selected }),
  dispatch => ({
    onChange: ({ target: { value } }) => dispatch(selectPiece(value)),
  })
)(PieceSelect);
