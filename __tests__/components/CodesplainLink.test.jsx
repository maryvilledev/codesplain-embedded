import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

import CodesplainLink from '../../src/components/CodesplainLink';

describe('<CodesplainLink />', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<CodesplainLink snippetKey="birdperson.py"/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
