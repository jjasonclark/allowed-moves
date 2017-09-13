import typeToReducer from 'type-to-reducer';

export const CLEAR = 'BOARD/CLEAR';

export const clearBoard = () => ({
  type: CLEAR,
});

const INITIAL_STATE = [[], [], [], [], [], [], [], []]

const clearReducer = (state, action) => {
  return INITIAL_STATE;
};

const actionHandlers = {
  [CLEAR]: clearReducer,
};

export default typeToReducer(actionHandlers, INITIAL_STATE);
