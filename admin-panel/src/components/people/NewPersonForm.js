import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import validateEmail from 'email-validator'
import ErrorField from '../common/ErrorField'
import Loader from '../common/Loader'

class NewPersonForm extends Component {
    static propTypes = {

    };

    render() {
        const {submitting, submitSuccess, submitError, handleSubmit} = this.props

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <Field name="firstName" label="first name" component={ErrorField}/>
                    <Field name="lastName" label="last name" component={ErrorField}/>
                    <Field name="email" label="email" component={ErrorField}/>
                    {submitting && <Loader/>}
                    {submitSuccess && <p style={{color: 'green'}}>Person was added successfully</p>}
                    {submitError && <p style={{color: 'red'}}>{submitError}</p>}
                    <div>
                        <input type="submit" disabled={submitting} />
                    </div>
                </form>
            </div>
        )
    }
}

function validate({firstName, email}) {
    const errors = {}
    if (!firstName) errors.firstName = 'first name is required'

    if (!email) errors.email = 'email is required'
    else if (!validateEmail.validate(email)) errors.email = 'email is invalid'

    return errors
}

export default reduxForm({
    form: 'person',
    validate
})(NewPersonForm)