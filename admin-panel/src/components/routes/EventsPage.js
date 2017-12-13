import React, { Component } from 'react'
import ShowEvents from '../events/ShowEvents'


class EventsPage extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h2>Events</h2>
                <ShowEvents />
            </div>
    )
    }
}

export default EventsPage