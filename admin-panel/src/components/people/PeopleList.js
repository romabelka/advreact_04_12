import React, { Component } from 'react'
import {connect} from 'react-redux'
import {peopleListSelector} from '../../ducks/people'
import {List} from 'react-virtualized'
import 'react-virtualized/styles.css'

class PeopleList extends Component {
    static propTypes = {

    };

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
        return (
            <div style={style} key={key}>
                <h1>{person.firstName} <b>{person.lastName}</b></h1>
                <h3>{person.email}</h3>
            </div>
        )
    }
}

export default connect((state) => ({
    people: peopleListSelector(state)
}))(PeopleList)