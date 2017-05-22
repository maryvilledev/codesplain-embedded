import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

import { Title } from '../../src/containers/Title';

describe('<Title />', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(
      <Title
        title="The Formula For Concentrated Darkmatter"
        language="squanchy"
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
