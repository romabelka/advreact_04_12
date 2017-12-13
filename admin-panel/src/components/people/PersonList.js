import React, {Component} from 'react'
import PropTypes from 'prop-types'

import PersonItem from './PersonItem'

class PersonList extends Component {
    static propTypes = {
        persons: PropTypes.object
    };

    getPersonList = (persons) => {
        return (
            <ul>
                {
                    persons.map(person =>
                        <li key={person.id}>
                            <PersonItem person={person} />
                        </li>
                    )
                }
            </ul>
        )
    }

    render() {
        const {persons} = this.props

        return (
            <div>
                <h3>People list</h3>
                {persons.isEmpty() ? <p>List is empty</p> : this.getPersonList(persons)}
            </div>
        )
    }
}

export default PersonList