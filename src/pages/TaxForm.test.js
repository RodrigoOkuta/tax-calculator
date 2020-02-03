import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import NumberFormat from 'react-number-format';

import TaxForm from './TaxForm';
import { findByTestAttr } from '../../test/testUtils';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = (props = {}) => {
  return mount(<TaxForm {...props} />);
};

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-tax-form');

  expect(component.length).toBe(1);
});

test('renders NumberFormat', () => {
  const wrapper = setup();
  const input = findByTestAttr(wrapper, 'input-number-format');

  expect(input.length).toBe(2);
});

test('renders button submit', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'button-submit');

  expect(button.length).toBe(1);
});

test('<NumberFormat>, onChange', () => {
  const spy = jest.fn();
  const wrapper = mount(
    <NumberFormat
      value={1001.2}
      thousandSeparator=" "
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
      id="fn1"
      onChange={spy}
    />,
  );
  const cb = wrapper.find('input');
  cb.simulate('change', { target: { value: '600000', focus: () => {} } });
  expect(spy).toHaveBeenCalled();
});
