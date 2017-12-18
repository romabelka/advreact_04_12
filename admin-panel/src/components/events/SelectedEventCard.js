import React, { Component } from 'react'

class SelectedEventCard extends Component {
    static propTypes = {

    };

    render() {
        const {event} = this.props
        return (
            <div>
                <h2>{event.title}</h2>
                <p>{event.where}</p>
                <p>{event.when}</p>
            </div>
        )
    }
}

export default SelectedEventCard