import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form'
import validator from 'email-validator'
import ErrorField from '../common/ErrorField'

class PeopleForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            First-name: <Field name='firstName' component={ErrorField}/>
          </div>
          <div>
            Last-name: <Field name='lastName' component={ErrorField}/>
          </div>
          <div>
            Email: <Field name='email' component={ErrorField}/>
          </div>
          <input type='submit' />
        </form>

      </div>
    )
  }
}

const validate = ({firstName, lastName, email}) => {
  const errors = {}

  if (!firstName) errors.firstName = 'First name is required'

  if (!lastName) errors.lastName = 'Last name is required'

  if (!email) errors.email = 'email is a required field'
  if (email && !validator.validate(email)) errors.email = 'incorrect email format'

  return errors
}

export default reduxForm({
  form: 'people',
  validate
})(PeopleForm)
