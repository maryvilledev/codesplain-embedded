import * as actions from '../../src/actions/app';
import reducer, { initialState } from '../../src/reducers/app';

describe(`Reducer: App`, () => {
  describe(`initialState`, () => {
    it(`matches snapshot`, () => {
      expect(initialState).toMatchSnapshot();
    });
  });

  it(`handles SET_STATE`, () => {
    const savedState = {
      snippet: `print('test')`,
      snippetTitle: `Test Snippet`,
      annotations: {},
      AST: {
        type: 'file_input',
        begin: 0,
        end: 1,
        children: [
          'NEWLINE',
          'INDENT',
        ]
      },
      filters: {}
    };
    const action = {
      type: actions.SET_STATE,
      payload: savedState,
    };
    expect(reducer(undefined, action)).toEqual(savedState);
  });

  it(`handles SET_SELECTED_LINE`, () => {
    const selectedLine = 0;
    const expected = {
      ...initialState,
      selectedLine,
    }
    const action = {
      type: actions.SET_SELECTED_LINE,
      payload: selectedLine,
    };
    expect(reducer(undefined, action)).toEqual(expected);
  })
});
