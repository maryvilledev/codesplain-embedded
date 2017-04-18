import * as actions from '../actions/app';

export const initialState = {
  annotations: {},
  AST: {},
  filters: {},
  snippetLanguage: 'python3',
  snippet: '',
  snippetKey: '',
  snippetTitle: '',
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case actions.RESTORE_STATE: {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
}

export default app;
