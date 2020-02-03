import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import App from './App';
import { findByTestAttr } from '../test/testUtils';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}) => {
  return mount(<App {...props} />);
};

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');

  expect(component.length).toBe(1);
});

test('renders TaxForm component', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-tax-form');

  expect(component.length).toBe(1);
});
