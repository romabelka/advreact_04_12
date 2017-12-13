import React, { Component } from 'react'
import {connect} from 'react-redux'
import {saveEventsToDb, eventsSelector, loaderSelector} from '../../ducks/event'


class EventsPage extends Component {
  static propTypes = {

  };

  render() {
    const {saveEventsToDb,eventList, loading } = this.props;
    return (
      <div>
        <h2>Events Page</h2>
        <button onClick={saveEventsToDb}>Upload Events</button>

        <h2>Events List</h2>
        <table>
          <thead>
          <tr>
            <th>month</th>
            <th>submissionDeadline</th>
            <th>title</th>
            <th>url</th>
            <th>when</th>
            <th>where</th>
          </tr>
          </thead>
          <tbody>

          {!loading && eventList.map(value =>
            value.map((prop,key) =>
                <tr key={key}>
                  <td>{prop.month}</td>
                  <td>{prop.submissionDeadline}</td>
                  <td>{prop.title}</td>
                  <td>{prop.url}</td>
                  <td>{prop.when}</td>
                  <td>{prop.where}</td>
                </tr>
            )
          )}
          {loading && <tr><td><h1>Loading...</h1></td></tr>}
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(state => ({
  eventList: eventsSelector(state),
  loading:loaderSelector(state)
}), {saveEventsToDb})(EventsPage)