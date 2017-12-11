import React from 'react'
import { connect } from 'react-redux'
import { eventsSelector } from '../../ducks/events'

function EventsListPage(props) {
    return (
        <div>
            <h2>Events List</h2>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>month</th>
                        <th>submissionDeadline</th>
                        <th>title</th>
                        <th>url</th>
                        <th>when</th>
                        <th>where</th>
                    </tr>
                </thead>
                <tbody>
                    {props.events.map((e, idx) => (
                        <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{e.month}</td>
                            <td>{e.submissionDeadline}</td>
                            <td>{e.title}</td>
                            <td>{e.url}</td>
                            <td>{e.when}</td>
                            <td>{e.where}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default connect(state => {
    return {
        events: eventsSelector(state)
    }
}, {})(EventsListPage)
