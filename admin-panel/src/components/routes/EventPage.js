import React, { Component } from 'react'

import EventList from '../events/EventList'

class EventPage extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h2>Events</h2>
                <EventList />
            </div>
        )
    }
}

export default EventPage