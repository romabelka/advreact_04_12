import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import ErrorField from '../common/ErrorField'
import {validate} from './utils'

class SignInForm extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h3>Sign In</h3>
                <form onSubmit={this.props.handleSubmit}>
                    <div>
                        email: <Field name='email' component={ErrorField}/>
                    </div>
                    <div>
                        password: <Field name='password' component={ErrorField} type='password'/>
                    </div>
                    <input type='submit' />
                </form>

            </div>
        )
    }
}

export default reduxForm({
    form: 'auth',
    validate
})(SignInForm)