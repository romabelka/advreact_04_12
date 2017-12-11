import React, { Component } from 'react'
import People from './people'

class Admin extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h2>Admin Page</h2>
                <People />
            </div>
        )
    }
}

export default Admin