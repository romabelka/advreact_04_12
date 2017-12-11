import React, { Component } from 'react'
import {Route, NavLink} from 'react-router-dom'
import AuthPage from './routes/auth'
import AdminPage from './routes/Admin'
import ProtectedRoute from './common/ProtectedRoute'
import PersonPage from './routes/PersonPage'
import PeopleListPage from './routes/PeopleListPage'

class App extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h1>Hello world</h1>
                <ul>
                    <li><NavLink to='/admin' activeStyle = {{color: 'red'}}>admin</NavLink></li>
                    <li><NavLink to='/people' activeStyle = {{color: 'red'}}>people</NavLink></li>
                </ul>
                <ProtectedRoute path = '/admin' component = {AdminPage}/>
                <ProtectedRoute path="/people" exact component={PersonPage}/>
                <ProtectedRoute path="/people/list" component={PeopleListPage}/>
                <Route path = '/auth' component = {AuthPage}/>
            </div>
        )
    }
}

export default App
