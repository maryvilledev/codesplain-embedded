export const SET_STATE = 'RESTORE_STATE';
export const SET_SELECTED_LINE = 'SET_SELECTED_LINE';
export const TOGGLE_RULE = 'TOGGLE_RULE';

export const setState = (newState) => ({
  type: SET_STATE,
  payload: newState,
});

export const setSelectedLine = (line) => ({
  type: SET_SELECTED_LINE,
  payload: line,
});

export const toggleRule = (rule) => ({
  type: TOGGLE_RULE,
  payload: rule,
});
