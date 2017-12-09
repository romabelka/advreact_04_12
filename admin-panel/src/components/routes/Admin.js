import React, { Component } from 'react';
import {Route, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import {addUser} from '../../ducks/user';
import NewUserForm from '../../components/user/NewUserForm';

class Admin extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h2>Admin Page</h2>
                <ul>
                    <li><NavLink to = '/admin/new-user' activeStyle={{color: 'red'}}>Create user</NavLink></li>
                </ul>
                <Route path='/admin/new-user' render={() => <NewUserForm onSubmit={this.onAddNewUser} />} />
            </div>
        )
    }

    onAddNewUser = ({firstName, lastName, email}) => {
        this.props.addUser(firstName, lastName, email);
    }
}

export default connect(null, {addUser})(Admin);