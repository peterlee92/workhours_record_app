import React from 'react';
import { mount, shallow } from 'enzyme';
import App from './App';

test('renders successfully', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});
