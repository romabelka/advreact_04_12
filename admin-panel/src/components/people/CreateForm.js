import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import ErrorField from '../common/ErrorField'
import validator from 'email-validator'

class Create extends Component {
    static propTypes = {}

    render() {
        const {handleSubmit, invalid, pristine} = this.props

        return (
            <div>
                <h3>Create</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        E-Mail: <Field name="email" component={ErrorField} />
                    </div>
                    <div>
                        Last Name:
                        <Field
                            name="lastName"
                            component={ErrorField}
                            type="text"
                        />
                    </div>
                    <div>
                        First Name:
                        <Field
                            name="firstName"
                            component={ErrorField}
                            type="text"
                        />
                    </div>
                    <input type="submit" disabled={invalid || pristine} />
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
    form: 'people-create',
    validate
})(Create)
