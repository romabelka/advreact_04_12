import React, { Component } from 'react'
import EventsTableVirtualized from '../events/EventsTableVirtualized'
import EventsInfiniteLoaderVirtualized from '../events/EventsInfiniteLoaderVirtualized'

class EventsPage extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <EventsInfiniteLoaderVirtualized />
            </div>
        )
    }
}

export default EventsPage