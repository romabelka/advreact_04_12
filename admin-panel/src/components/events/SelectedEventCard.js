import React, { Component } from 'react'
import {DropTarget} from 'react-dnd'
import {addEventToPerson, peopleListSelector} from '../../ducks/people'
import {connect} from 'react-redux'

class SelectedEventCard extends Component {
    static propTypes = {

    };

    render() {
        const {event, people, connectDropTarget, canDrop, hovered} = this.props
        const dndStyle = {
            border: `1px solid ${canDrop 
                ? hovered 
                    ? 'green' 
                    : 'red'
                : 'black'}`
        }
        const peopleList = people.map(person => person.email).join(', ')

        return connectDropTarget(
            <div style = {dndStyle}>
                <h2>{event.title}</h2>
                <h3>{event.when}</h3>
                <h3>{peopleList}</h3>
            </div>
        )
    }
}

const spec = {
    drop(props, monitor) {
        const item = monitor.getItem()
        const {event, addEventToPerson} = props
        addEventToPerson(event.uid, item.id)
    }
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    hovered: monitor.isOver()
})

export default connect((state, props) => ({
    people: peopleListSelector(state).filter(person => person.events.includes(props.event.uid))
}), { addEventToPerson })(DropTarget(['person'], spec, collect)(SelectedEventCard))