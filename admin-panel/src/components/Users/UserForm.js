import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form'
import validator from 'email-validator'
import ErrorField from '../common/ErrorField'


class UserForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div>
                    <label>First name:
                        <Field name = "firstName" component = {ErrorField} />
                    </label>
                </div>
                <div>
                    <label>Last name:
                        <Field name = "lastName" component = {ErrorField} />
                    </label>
                </div>
                <div>
                    <label>Email:
                        <Field name = "email" component = {ErrorField} />
                    </label>
                </div>
                <div>
                    <button type = "submit">add user</button>
                </div>
            </form>
        )
    }
}

const validate = ({ firstName, lastName, email }) => {
    const errors = {}

    if (!email) errors.email = 'email is a required field'
    if (email && !validator.validate(email)) errors.email = 'incorrect email format'

    if (!firstName) errors.firstName = 'First name is a required field'

    if (!lastName) errors.lastName = 'Last name is a required field'

    return errors
}

export default reduxForm({
    form : "users",
    validate
})(UserForm)