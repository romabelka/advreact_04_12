import React, { Component } from 'react'
import {connect} from 'react-redux'
import {peopleListSelector, fetchAllPeople} from '../../ducks/people'
import {List} from 'react-virtualized'
import PersonCard from './PersonCard'
import 'react-virtualized/styles.css'

class PeopleList extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.fetchAllPeople()
    }

    render() {
        return <List
            rowRenderer={this.rowRenderer}
            rowCount={this.props.people.length}
            rowHeight={100}
            height={400}
            width={400}
        />

    }

    rowRenderer = ({ style, index, key }) => {
        const person = this.props.people[index]
        return <PersonCard person = {person} key = {key} style = {style} />
    }
}

export default connect((state) => ({
    people: peopleListSelector(state)
}), { fetchAllPeople })(PeopleList)