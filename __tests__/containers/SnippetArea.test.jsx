import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

import { SnippetArea } from '../../src/containers/SnippetArea';

describe('<SnippetArea />', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(
      <SnippetArea
        AST={{}}
        filters={{}}
        snippet="Wubba lubba Dub Dub"
        language="bad"
        openLine={0}
        onGutterClick={jest.fn()}
        annotations={[{"0": "They're just Robots!"}]}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
