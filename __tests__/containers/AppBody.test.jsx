import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

import { AppBody } from '../../src/containers/AppBody';

describe('<AppBody />', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(
      <AppBody
        snippetKey="rick-sanchez/formula_for_concentrated_dark_matter"
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
