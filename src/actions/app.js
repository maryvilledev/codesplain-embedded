export const RESTORE_STATE = 'RESTORE_STATE';

export const restoreState = (newState) => ({
  type: RESTORE_STATE,
  payload: newState,
});
