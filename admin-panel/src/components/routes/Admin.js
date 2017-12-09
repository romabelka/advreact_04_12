import React, { Component } from 'react'
import {NavLink} from 'react-router-dom';
import ProtectedRoute from '../common/ProtectedRoute';
import People from '../people/People';

class Admin extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h2>Admin Page</h2>
                <li><NavLink to = '/admin/people' activeStyle={{color: 'red'}}>Add People</NavLink></li>
                <ProtectedRoute path='/admin/people' component={People}/>
            </div>
        )
    }
}

export default Admin