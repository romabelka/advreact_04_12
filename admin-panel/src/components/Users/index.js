import React, {Component} from 'react'
import UserForm from './UserForm'
import {connect} from 'react-redux'
import {usersSelector, usersLoadingSelector} from '../../ducks/users'

class Users extends Component {
    render() {
        return (
            <div>
                <h2>Users page</h2>
                {
                    this.renderUserList()
                }
                <UserForm onSubmit = {this.props.onSubmit} />
            </div>
        )
    }
    renderUserList = () => {
        let {users, isLoading} = this.props;
        if (isLoading) return <div>Uploading new user...</div>
        return (
            users.length ?
            <ul>
                {
                    users.map(u=>(
                        <li key = {u.id}>
                            <p>First Name: {u.firstName}</p>
                            <p>Last Name: {u.lastName}</p>
                            <p>email: {u.email}</p>
                        </li>
                    ))
                }
            </ul> :
            <h3>no user</h3>
        )
    }
}

export default connect(
    state => ({
        users : usersSelector(state),
        isLoading : usersLoadingSelector(state),
    })
)(Users)