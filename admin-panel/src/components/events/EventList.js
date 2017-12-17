import React, {Component} from 'react'
import firebase from 'firebase/index'

class EventList extends Component {
    static propTypes = {

    };

    state = {
        events: null
    }

    componentDidMount = () => {
        const eventsRef = firebase.database().ref('events/');

        eventsRef.on('value', (snapshot) => {
            let events = []

            snapshot.forEach((childSnapshot) => {
                events.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            });

            this.setState({events: events});
        });
    }

    getEventList = (events) => {
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

    render() {
        const {events} = this.state

        return (
            <div>
                {!events ? <p>List is empty</p> : this.getEventList(events)}
            </div>
        )
    }
}

export default EventList