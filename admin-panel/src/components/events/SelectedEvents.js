import React, { Component } from 'react'
import {connect} from 'react-redux'
import {selectedEvents} from '../../ducks/events'
import SelectedEventCard from './SelectedEventCard'

class SelectedEvents extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h2>Selected Events</h2>
                {this.props.events.map(event => <SelectedEventCard event = {event} key = {event.uid}/>)}
            </div>
        )
    }
}

export default connect(state => ({
    events: selectedEvents(state)
}))(SelectedEvents)