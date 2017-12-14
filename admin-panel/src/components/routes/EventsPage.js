import React, { Component } from 'react'
import EventsTable from '../events/EventsTable'

class EventsPage extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <EventsTable />
            </div>
        )
    }
}

export default EventsPage