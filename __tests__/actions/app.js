import * as actions from '../../src/actions/app';

describe(`Actions: App`, () => {
  describe(`RESTORE_STATE`, () => {
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
        type: actions.RESTORE_STATE,
        payload: savedState,
      };
      expect(actions.restoreState(savedState)).toEqual(expected);
    });
  });
});
