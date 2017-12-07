import React, { Component } from 'react'
import {Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {signIn, signUp} from '../../../ducks/auth'
import SignInForm from '../../auth/SignInForm'
import SignUpForm from '../../auth/SignUpForm'

class Auth extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h2>Auth page</h2>
                <ul>
                    <li><NavLink to = '/auth/sign-in' activeStyle={{color: 'red'}}>Sign In</NavLink></li>
                    <li><NavLink to = '/auth/sign-up' activeStyle={{color: 'red'}}>Sign Up</NavLink></li>
                </ul>
                <Route path='/auth/sign-in' render={() => <SignInForm onSubmit={this.onSignIn}/>} />
                <Route path='/auth/sign-up' render={() => <SignUpForm onSubmit={this.onSignUp}/>} />
            </div>
        )
    }

    onSignIn = ({ email, password }) => this.props.signIn(email, password)
    onSignUp = ({ email, password }) => this.props.signUp(email, password)

}

export default connect(null, { signIn, signUp })(Auth)