import React, { Component } from 'react'
import {Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

import UserForm from './../../user/UserForm'
import {addUser,userErrorSelector,userLoaderSelector} from '../../../ducks/user'

class Admin extends Component {
    static propTypes = {

    };

    render() {
        const {loading, error} = this.props;
        return (
            <div>
                <h2>Admin Page</h2>
                <ul>
                    <li><NavLink to = '/admin/user/add' activeStyle={{color: 'red'}}>Add User</NavLink></li>
                </ul>
                <Route path='/admin/user/add' render={() => <UserForm onSubmit={this.addUser} mode='add' />} />
                {error !== null &&
                <h4 style={{color: 'red'}}>{error}</h4>
                }
                {/*loading &&
                 <LoaderIcon/>
                 */}
                {loading &&
                <div>Loading...</div>
                }
            </div>
        )
    }

    addUser = ({ firstName,lastName, email }) => this.props.addUser(firstName, lastName, email)
}

export default connect(state => ({
    error: userErrorSelector(state),
    loading: userLoaderSelector(state)
}), { addUser})(Admin)