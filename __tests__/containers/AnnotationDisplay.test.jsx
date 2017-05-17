import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json'

import { AnnotationDisplay } from '../../src/containers/AnnotationDisplay';

describe('<AnnotationDisplay />', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(
      <AnnotationDisplay
        annotations={[{annotation: "They're just Robots!"}]}
        selectedLine={0}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
