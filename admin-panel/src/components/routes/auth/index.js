import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

import {signIn, signUp} from '../../../ducks/auth'
import {errorSelector, loadingSelector} from '../../../ducks/auth'
import SignInForm from '../../auth/SignInForm'
import SignUpForm from '../../auth/SignUpForm'

class Auth extends Component {
    static propTypes = {
        authError: PropTypes.object,
        authLoading: PropTypes.bool.isRequired
    };

    render() {
        const {authLoading, authError} = this.props;

        return (
            <div>
                <h2>Auth page</h2>
                <ul>
                    <li><NavLink to = '/auth/sign-in' activeStyle={{color: 'red'}}>Sign In</NavLink></li>
                    <li><NavLink to = '/auth/sign-up' activeStyle={{color: 'red'}}>Sign Up</NavLink></li>
                </ul>
                <Route path='/auth/sign-in' render={() => <SignInForm onSubmit={this.onSignIn} authError={authError} authLoading={authLoading} />} />
                <Route path='/auth/sign-up' render={() => <SignUpForm onSubmit={this.onSignUp}/>} />
            </div>
        )
    }

    onSignIn = ({ email, password }) => this.props.signIn(email, password)
    onSignUp = ({ email, password }) => this.props.signUp(email, password)

}

export default connect(state => ({
    authError: errorSelector(state),
    authLoading: loadingSelector(state)
}), { signIn, signUp })(Auth)