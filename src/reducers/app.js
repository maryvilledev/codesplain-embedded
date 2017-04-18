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
    case actions.SET_STATE: {
      return Object.assign({}, action.payload);
    }
    default: {
      return state;
    }
  }
}

export default app;
