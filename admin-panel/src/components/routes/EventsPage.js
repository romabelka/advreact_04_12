import React, { Component } from 'react'
import VirtualizedLazyTable from '../events/VirtualizedLazyTable'

class EventsPage extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <VirtualizedLazyTable />
            </div>
        )
    }
}

export default EventsPage