import { combineReducers } from 'redux';
import board from './board';
import selected from './selected';

const rootReducer = combineReducers({
  board,
  selected,
});

export default rootReducer;
