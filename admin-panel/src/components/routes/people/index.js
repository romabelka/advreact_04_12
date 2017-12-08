import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import CreateForm from '../../people/CreateForm'

class People extends Component {
    static propTypes = {}

    render() {
        return (
            <div>
                <h2>People page</h2>
                <ul>
                    <li><NavLink to="/people/create" activeStyle={{ color: 'red' }}>Create</NavLink></li>
                </ul>
                <Route path='/people/create' render={() => <CreateForm onSubmit={this.onCreate}/>} />
            </div>
        )
    }

    onCreate = ({ email, firstName, lastName }) => {
        console.log({ email, firstName, lastName })
    }
}

export default connect(null, {})(People)
