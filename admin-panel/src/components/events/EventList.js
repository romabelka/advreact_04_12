import React, {Component} from 'react'

class EventList extends Component {
    static propTypes = {

    };

    render() {
        const {events} = this.props

        return (
            <table>
                <thead>
                <tr>
                    <th>Month</th>
                    <th>Deadline</th>
                    <th>Title</th>
                    <th>URL</th>
                    <th>When</th>
                    <th>Where</th>
                </tr>
                </thead>
                <tbody>
                {
                    events.map(event =>
                        <tr key={event.id}>
                            <td>{event.month}</td>
                            <td>{event.submissionDeadline}</td>
                            <td>{event.title}</td>
                            <td>{event.url}</td>
                            <td>{event.when}</td>
                            <td>{event.where}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        )
    }
}

export default EventList