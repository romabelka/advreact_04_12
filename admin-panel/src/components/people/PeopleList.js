import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List} from 'react-virtualized'
import {TransitionMotion, spring} from 'react-motion'
import {fetchAllPeople, peopleListSelector} from '../../ducks/people'
import PersonCard from './PersonCard'

class PeopleList extends Component {
    static propTypes = {};

    componentDidMount() {
        this.props.fetchAllPeople()
    }

    componentDidUpdate({people}) {
        if (people.length && this.props.people.length > people.length) {
            setTimeout(() => {
                this.list.scrollToRow(this.props.people.length)
            }, 0)
        }
    }

    render() {
        return (
            <TransitionMotion
                willEnter={this.willEnter}
                styles={this.getStyles}
            >
                {interpolatedStyles =>
                    <List
                        rowRenderer={this.rowRenderer(interpolatedStyles)}
                        rowCount={interpolatedStyles.length}
                        rowHeight={100}
                        height={400}
                        width={400}
                        ref={this.setListRef}
                    />
                }
            </TransitionMotion>
        )
    }

    rowRenderer = interpolatedStyles => ({index, key, style}) =>
        <PersonCard person={this.props.people[index]} key={key}
                   style={{...style, ...interpolatedStyles[index].style}}/>

    willEnter = () => ({
        opacity: 0
    })

    getStyles = () => this.props.people.map(person => ({
        key: person.uid,
        style: {
            opacity: spring(1)
        },
        data: person
    }))

    setListRef = ref => this.list = ref
}

export default connect(state => ({
    people: peopleListSelector(state)
}), {fetchAllPeople })(PeopleList)
