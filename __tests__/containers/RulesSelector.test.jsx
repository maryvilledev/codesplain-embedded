import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

import { RulesSelector } from '../../src/containers/RulesSelector';

describe('<RulesSelector />', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(
      <RulesSelector
        dispatchToggleRule={jest.fn()}
        filters={{
          "bool": {
            color: "red",
            count: 2,
            prettyTokenName: "Boolean",
            selected: false
          }
        }}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
