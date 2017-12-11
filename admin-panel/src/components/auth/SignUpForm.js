import React, { Component } from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'
import validator from 'email-validator'
import ErrorField from '../common/ErrorField'
import Loader from '../common/Loader'
import {loadingSelector, errorSelector} from '../../ducks/auth'

class SignUpForm extends Component {
    static propTypes = {

    };

    render() {
        const {loading, authError} = this.props
        return (
            <div>
                <h3>Sign In</h3>
                <form onSubmit={this.props.handleSubmit}>
                    <Field name='email' component={ErrorField}/>
                    <Field name='password' component={ErrorField} type='password'/>
                    {authError && <h2 style={{color: 'red'}}>{authError}</h2>}
                    {loading && <Loader />}
                    <input type='submit' />
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

export default connect(state => ({
    loading: loadingSelector(state),
    authError: errorSelector(state)
}))(reduxForm({
    form: 'auth',
    validate
})(SignUpForm))