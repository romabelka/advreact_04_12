import React, { Component } from 'react'
import {Route, NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../ducks/auth'
import AuthPage from './routes/auth'
import AdminPage from './routes/Admin'
import ProtectedRoute from './common/ProtectedRoute'
import PersonPage from './routes/PersonPage'
import EventsPage from './routes/EventsPage'
import CustomDragLayer from './common/CustomDragLayer'

class App extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <button onClick={this.props.signOut}>SignOut</button>
                <ul>
                    <li><NavLink to = '/admin' activeStyle = {{color: 'red'}}>admin</NavLink></li>
                    <li><NavLink to = '/people' activeStyle = {{color: 'red'}}>people</NavLink></li>
                    <li><NavLink to = '/events' activeStyle = {{color: 'red'}}>events</NavLink></li>
                </ul>
                <ProtectedRoute path = '/admin' component = {AdminPage}/>
                <ProtectedRoute path = '/people' component={PersonPage}/>
                <ProtectedRoute path = '/events' component={EventsPage}/>
                <Route path = '/auth' component = {AuthPage}/>
                <CustomDragLayer />
            </div>
        )
    }
}

export default connect(null, { signOut }, null, { pure: false })(App)