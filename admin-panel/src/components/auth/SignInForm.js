import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import validator from 'email-validator'
import ErrorField from '../common/ErrorField'

class SignInForm extends Component {
    static propTypes = {

    };

    render() {
        const {handleSubmit, invalid, pristine, submitting, error} = this.props
        const errorMessage = error && <h4 style={{color: 'red'}}>{error}</h4>

        return (
            <div>
                <h3>Sign In</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        email: <Field name='email' component={ErrorField}/>
                    </div>
                    <div>
                        password: <Field name='password' component={ErrorField} type='password'/>
                    </div>
                    {submitting && 'Submitting...'}
                    {errorMessage}
                    <input type='submit' disabled={invalid || pristine || submitting} />
                </form>

            </div>
        )
    }
}

const validate = ({ email, password }) => {
    const errors = {}

    if (!email) errors.email = 'email is a required field'
    if (email && !validator.validate(email)) errors.email = 'incorrect email format'

    if (!password) errors.password = 'password is a required field'
    if (password && password.length < 8) errors.password = 'password is to short'

    return errors
}

export default reduxForm({
    form: 'auth',
    validate
})(SignInForm)
