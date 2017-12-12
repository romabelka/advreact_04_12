import React, { Component } from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'
import ErrorField from '../common/ErrorField'
import Loader from '../common/Loader'
import {loadingSelector, errorSelector} from '../../ducks/auth'

class SignInForm extends Component {
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

export default connect(state => ({
        loading: loadingSelector(state),
        authError: errorSelector(state)
}))(reduxForm({
    form: 'auth'
})(SignInForm))