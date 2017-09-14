import React from 'react';
import { connect } from 'react-redux';
import { clearBoard } from '../ducks/board';

// Allow user to reset the board back to empty
const ClearButton = props => <button {...props}>Reset Board</button>;

export default connect(null, dispatch => ({ onClick: () => dispatch(clearBoard()) }))(ClearButton);
