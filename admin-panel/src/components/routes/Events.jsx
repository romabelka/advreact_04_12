import React from 'react';
import { connect } from 'react-redux';
import Loader from '../common/Loader';
import { dataSelector, loadingSelector, errorSelector, eventsRequest } from '../../ducks/events';

class Events extends React.Component {
  componentDidMount() {
    this.props.eventsRequest();
  }

  render() {
    if (this.props.loading) return <Loader />;
    if (this.props.error) return <h2 style={{ color: 'red' }}>{this.props.error}</h2>;

    return (
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Submission dead line</th>
            <th>Title</th>
            <th>URL</th>
            <th>When</th>
            <th>Where</th>
          </tr>
        </thead>
        <tbody>
          {this.props.events.map(event => (
            <tr key={event.id}>
              <td>{event.month}</td>
              <td>{event.submissionDeadline}</td>
              <td>{event.title}</td>
              <td>{event.url}</td>
              <td>{event.when}</td>
              <td>{event.where}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default connect(state => ({
  events: dataSelector(state),
  loading: loadingSelector(state),
  error: errorSelector(state),
}), { eventsRequest })(Events);
