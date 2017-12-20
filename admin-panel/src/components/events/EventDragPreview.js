import React, { Component } from 'react'
import {connect} from 'react-redux'
import {eventSelector} from '../../ducks/events'

class EventDragPreview extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div>
        <h2>{this.props.event.title}</h2>
      </div>
    )
  }
}

export default connect((state, ownProps) => ({
  event: eventSelector(state, ownProps)
}))(EventDragPreview)