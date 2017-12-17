import React, { Component } from 'react'
import {connect} from 'react-redux'
import {peopleListSelector, fetchAllPeople, loadingSelector} from '../../ducks/people'
import {List} from 'react-virtualized'
import Loader from '../common/Loader'
import 'react-virtualized/styles.css'

class PeopleList extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.fetchAllPeople()
    }

    render() {
        const {people, loading} = this.props

        if (loading) return <Loader />

        return <List
            rowRenderer={this.rowRenderer}
            rowCount={people.length}
            rowHeight={100}
            height={400}
            width={400}
        />

    }

    rowRenderer = ({ style, index, key }) => {
        const person = this.props.people[index]
        return (
            <div style={style} key={key}>
                <h1>{person.firstName} <b>{person.lastName}</b></h1>
                <h3>{person.email}</h3>
            </div>
        )
    }

    getRow = (person) => (
        <tr key = {person.id}>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td>{person.email}</td>
        </tr>
    )
}

export default connect((state) => ({
    people: peopleListSelector(state),
    loading: loadingSelector(state),
}), {fetchAllPeople})(PeopleList)