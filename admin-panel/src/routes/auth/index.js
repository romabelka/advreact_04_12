import React, { Component } from 'react'
import {Route, NavLink} from 'react-router-dom'
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
                <Route path='/auth/sign-in' component={SignInForm} />
                <Route path='/auth/sign-up' component={SignUpForm} />
            </div>
        )
    }
}

export default Auth