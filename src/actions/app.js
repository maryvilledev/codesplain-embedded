export const SET_STATE = 'RESTORE_STATE';

export const setState = (newState) => ({
  type: SET_STATE,
  payload: newState,
});
