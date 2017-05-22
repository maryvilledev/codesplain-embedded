import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

import RuleLabel from '../../src/components/RuleLabel';

describe('<RuleLabel />', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(
      <RuleLabel
        color="blue"
        count={1}
        rule="None"
        selected={true}
        value="nada"
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
