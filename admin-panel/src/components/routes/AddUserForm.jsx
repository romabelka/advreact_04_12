import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from '../common/Button';
import InputField from '../common/InputField';
import {
  required,
  minLength,
  maxLength,
  allowedChars,
  invalidEmail,
} from '../../helpers/reduxForm/fieldLevelValidation';

const firstAndFirstNameValidation = [required, allowedChars, minLength(3), maxLength(100)];
const emailValidation = [required, invalidEmail, maxLength(100)];
const passwordValidation = [required, minLength(8), maxLength(100)];

class AddUserForm extends React.Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    error: PropTypes.string,
  };

  static defaultProps = {
    error: '',
  };

  submit = () => { };

  render() {
    const {
      handleSubmit,
      error,
      pristine,
      reset,
      submitting,
    } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.submit)}
      >
        <Field
          name="firstname"
          type="text"
          component={InputField}
          label="Firstname"
          placeholder="Enter firstname"
          className="common-margins"
          validate={firstAndFirstNameValidation}
        />
        <Field
          name="lastName"
          type="text"
          component={InputField}
          label="Lastname"
          placeholder="Enter lastname"
          className="common-margins"
          validate={firstAndFirstNameValidation}
        />
        <Field
          name="email"
          type="text"
          component={InputField}
          label="Email"
          placeholder="Enter email"
          className="common-margins"
          validate={emailValidation}
        />
        <Field
          name="password"
          type="password"
          component={InputField}
          label="Password"
          placeholder="Enter password"
          className="common-margins"
          validate={passwordValidation}
        />
        <div>
          {
            error &&
            <strong>
              {error}
            </strong>
          }
          <div>
            <Button
              type="submit"
              disabled={submitting}
              className="common-margins"
            >
              Submit
            </Button>
            <Button
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
              className="common-margins"
            >
              Reset
            </Button>
          </div>
        </div>
      </form>

    );
  }
}

export default reduxForm({
  form: 'AddUserForm',
})(AddUserForm);
