import React, { Component } from 'react'
import {Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {addUser} from '../../ducks/users'
import UsersList from '../Users'

class Users extends Component {
    render() {
        return (
            <div>
                <h2>Users page</h2>
                <ul>
                    <li><NavLink to = '/users/list' activeStyle={{color: 'red'}}>Users list</NavLink></li>
                </ul>
                <Route path='/users/list' render={() => <UsersList onSubmit={this.onAddUser}/>} />
            </div>
        )
    }

    onAddUser = ({firstName, lastName, email}) => this.props.addUser({firstName, lastName, email})

}

export default connect(null, { addUser })(Users)