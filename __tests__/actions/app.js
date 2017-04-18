import * as actions from '../../src/actions/app';

describe(`Actions: App`, () => {
  describe(`SET_STATE`, () => {
    it(`creates an action that restores state`, () => {
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
      const expected = {
        type: actions.SET_STATE,
        payload: savedState,
      };
      expect(actions.setState(savedState)).toEqual(expected);
    });
  });
});
