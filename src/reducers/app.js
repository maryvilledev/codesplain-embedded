import * as actions from '../actions/app';

export const initialState = {
  annotations: {},
  AST: {},
  filters: {},
  snippetLanguage: 'python3',
  snippet: '',
  snippetKey: '',
  snippetTitle: '',
  selectedLine: undefined,
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_STATE: {
      return Object.assign({}, action.payload);
    }
    case actions.TOGGLE_RULE: {
      const currentFilters = state.filters;
      const toggledRule = action.payload;
      return {
        ...state,
        filters: {
          ...currentFilters,
          [toggledRule]: {
            ...currentFilters[toggledRule],
            selected: !currentFilters[toggledRule].selected,
          },
        },
      };
    }
    case actions.SET_SELECTED_LINE: {
      if (state.selectedLine === action.payload) {
        return {
          ...state,
          selectedLine: undefined,
        };
      }
      return {
        ...state,
        selectedLine: action.payload,
      }
    }
    default: {
      return state;
    }
  }
}

export default app;
