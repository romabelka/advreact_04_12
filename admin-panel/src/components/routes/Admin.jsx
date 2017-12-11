import React, { Component } from 'react';
import AddUserForm from './AddUserForm';

class Admin extends Component {
  static propTypes = {

  };

  state = {};

  render() {
    return (
      <div>
        <h2>Admin Page</h2>
        <h3>Create user</h3>
        <AddUserForm />
      </div>
    );
  }
}

export default Admin;
