import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {addPerson} from '../../ducks/people'
import NewPersonForm from '../people/NewPersonForm'
import PersonList from '../people/PersonList'
import {peopleSelector} from '../../ducks/people'

class PersonPage extends Component {
    static propTypes = {
        persons: PropTypes.object,
        addPerson: PropTypes.func.isRequired
    };

    render() {
        const {persons, addPerson} = this.props

        return (
            <div>
                <PersonList persons={persons}/>
                <h2>Add new person</h2>
                <NewPersonForm onSubmit={addPerson}/>
            </div>
        )
    }
}

export default connect(state => ({
    persons: peopleSelector(state)
}), {addPerson})(PersonPage)