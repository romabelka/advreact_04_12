import React, {Component} from 'react'
import PropTypes from 'prop-types'

class PersonItem extends Component {
    static propTypes = {
        person: PropTypes.object.isRequired
    };

    render() {
        const {person} = this.props

        return (
            <div>
                <div>Email: {person.email}</div>
                <div>First name: {person.firstName}</div>
                <div>Last name: {person.lastName}</div>
            </div>
        )
    }
}

export default PersonItem