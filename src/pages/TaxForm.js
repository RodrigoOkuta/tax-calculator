import React from 'react';
import { withFormik } from 'formik';
import { object, string } from 'yup';
import NumberFormat from 'react-number-format';

import history from '../history';
import './TaxForm.css';

const TaxForm = props => {
  const { handleSubmit, handleChange, handleBlur, errors, touched, values } = props;

  return (
    <form className="ui form" onSubmit={handleSubmit} data-test="component-tax-form">
      <div className="field">
        <label htmlFor="salary">Type your Gross Salary</label>
        <NumberFormat
          name="salary"
          value={values.salary}
          thousandSeparator={true}
          onChange={handleChange}
          onBlur={handleBlur}
          allowNegative={false}
          data-test="input-number-format"
        />
        {errors.salary && touched.salary && (
          <span className="error-validation" data-test="span-error">
            {errors.salary}
          </span>
        )}
      </div>
      <button className="ui button" type="submit" data-test="button-submit">
        Submit
      </button>
    </form>
  );
};

const MyEnhancedForm = withFormik({
  mapPropsToValues: () => ({ salary: '' }),
  // validate input
  validationSchema: object().shape({
    salary: string().required('Salary is required!'),
  }),
  handleSubmit: values => {
    // send to second screen
    history.push(`/tax-detail?salary=${values.salary.replace(/[^0-9]/g, '')}`);
  },
})(TaxForm);

export default MyEnhancedForm;
