import React, { Component } from 'react'
import {DropTarget} from 'react-dnd'
import {connect} from 'react-redux'
import {addPersonToEvent} from '../../ducks/events'

class SelectedEventCard extends Component {
    static propTypes = {

    };

    render() {
        const {event, connectDropTarget, canDrop, hovered} = this.props
        const dndStyle = {
            border: `1px solid ${canDrop 
                ? hovered 
                    ? 'green' 
                    : 'red'
                : 'black'}`
        }
        return connectDropTarget(
            <div style = {dndStyle}>
                <h2>{event.title}</h2>
                <p>{event.where}</p>
                <p>{event.when}</p>
            </div>
        )
    }
}

const spec = {
    drop(props, monitor) {
        props.addPersonToEvent(monitor.getItem().id, props.event.uid)
    },
/*
    canDrop() {
        return false
    }
*/
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    canDrop: monitor.canDrop(),
    hovered: monitor.isOver()
})

export default connect(
    null, { addPersonToEvent }
)(DropTarget(['person'], spec, collect)(SelectedEventCard))