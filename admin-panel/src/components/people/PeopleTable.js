import React, { Component } from 'react'
import {connect} from 'react-redux'
import {peopleListSelector} from '../../ducks/people'

class PeopleTable extends Component {
    static propTypes = {

    };

    render() {
        return (
            <table>
                <tbody>
                    {this.getRows()}
                </tbody>
            </table>
        )
    }

    getRows = () => this.props.people.map(this.getRow)

    getRow = (person) => (
        <tr key = {person.id}>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td>{person.email}</td>
        </tr>
    )
}

export default connect((state) => ({
    people: peopleListSelector(state)
}))(PeopleTable)