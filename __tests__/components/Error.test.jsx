import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

import Error from '../../src/components/Error';

describe('<Error />', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<Error snippetKey="birdperson.py"/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
