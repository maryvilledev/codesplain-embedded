import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

import Editor from '../../src/components/Editor';

describe('<Editor />', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(
      <Editor
        markedLines={[0]}
        AST={{}}
        filters={{}}
        snippet="Wubba lubba Dub Dub"
        language="bad"
        openLine={0}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
