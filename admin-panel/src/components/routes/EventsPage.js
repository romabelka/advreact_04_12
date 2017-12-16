import React, { Component } from 'react'
import EventsTableVirtualized from '../events/EventsTableVirtualized'

class EventsPage extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <EventsTableVirtualized />
            </div>
        )
    }
}

export default EventsPage