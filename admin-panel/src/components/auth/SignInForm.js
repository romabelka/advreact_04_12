import React, { Component } from 'react'
import {reduxForm, Field} from 'redux-form'
import PropTypes from "prop-types"

class SignInForm extends Component {
    static propTypes = {
        authError: PropTypes.object,
        authLoading: PropTypes.bool.isRequired
    };

    render() {
        const {authError, authLoading} = this.props;

        return (
            <div>
                <h3>Sign In</h3>
                <form onSubmit={this.props.handleSubmit}>
                    <div>
                        email: <Field name='email' component='input'/>
                    </div>
                    <div>
                        password: <Field name='password' component='input' type='password'/>
                    </div>

                    {authLoading && <p>Loading...</p>}
                    {authError && <p style={{color: 'red'}}>{authError.message}</p>}

                    <input type='submit' />
                </form>

            </div>
        )
    }
}

export default reduxForm({
    form: 'auth'
})(SignInForm)