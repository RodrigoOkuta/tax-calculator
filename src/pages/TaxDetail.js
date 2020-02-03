import React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import history from '../history';
import './TaxDetail.css';

const getTaxDetail = (text, value, index) => {
  return (
    <div key={index} className="statistic">
      <div className="label">{text}</div>
      <div className="label label-tax">
        <NumberFormat
          name="salary"
          value={value}
          thousandSeparator={true}
          displayType={'text'}
          decimalScale={2}
        />
      </div>
    </div>
  );
};

const calculateTax = salary => {
  // define tax tiers
  const tax2020 = [214368, 150473, 97069, 48535, 0];
  // define % per tier
  const percentageToPay = [0.33, 0.29, 0.26, 0.205, 0.15];
  let totalTax = 0;
  let i = 0;
  let salaryTax = parseInt(salary);
  const element = [];

  while (i < 5) {
    if (salaryTax > tax2020[i]) {
      const taxOverAmount = salaryTax - tax2020[i];
      const taxTier = taxOverAmount * percentageToPay[i];
      totalTax += taxTier;
      // if income higher than 214368 the logic need to subtract the amount to make the annual salary change to the tier of 214368 < salary < 150476
      if (i === 0) salaryTax = tax2020[i];
      else salaryTax -= taxOverAmount;
      // create jsx element to render on screen
      if (i === 0) element.push(getTaxDetail(`Tax over ${tax2020[i]}: `, taxTier, i));
      else
        element.push(getTaxDetail(`Tax between ${tax2020[i - 1]} ~ ${tax2020[i]}: `, taxTier, i));
    } else if (salaryTax > 0 && salaryTax <= tax2020[3]) {
      const taxOverAmount = salaryTax;
      totalTax += taxOverAmount * percentageToPay[4];
      salaryTax = 0;
    }
    i++;
  }
  // create jsx element to render on screen
  element.push(getTaxDetail(`Total Tax: `, totalTax, i));

  return element;
};

const TaxDetail = () => {
  return (
    <div className="ui horizontal statistics" data-test="component-tax-detail">
      <h3>Federal tax rates for 2020</h3>
      <h5>
        {/* return to Form screen */}
        <Link to="/">Inform Your Gross Salary</Link>
      </h5>
      <p>
        For more information how tax are calculates{' '}
        <a
          href="https://www.canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/canadian-income-tax-rates-individuals-current-previous-years.html#federal"
          target="_black"
        >
          CLICK HERE
        </a>
      </p>
      {/* render tax detail */}
      {calculateTax(history.location.search.substr(history.location.search.indexOf('=') + 1))}
    </div>
  );
};

export default TaxDetail;
