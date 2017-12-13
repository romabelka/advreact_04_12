import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import validator from 'email-validator'

import ErrorField from '../common/ErrorField'

class UserForm extends Component {
  static propTypes = {

  };

  render() {
    const {mode} =  this.props;
    return (
      <div>
        <h3>{mode === 'add' ? 'Add user' : 'Edit User' }</h3>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            First name: <Field name='firstName' component='input'/>
          </div>
          <div>
           Last name: <Field name='lastName' component='input'/>
          </div>
          <div>
            email: <Field component={ErrorField} name='email'/>
          </div>
          <input type='submit' />
        </form>

      </div>
    )
  }
}
const validate = ({ email }) => {
  const errors = {}

  if (!email) errors.email = 'email is a required field'
  if (email && !validator.validate(email)) errors.email = 'incorrect email format'

  return errors
}

export default reduxForm({
  form: 'user',
  validate
})(UserForm)