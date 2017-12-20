import React, { Component } from 'react'
import {connect} from 'react-redux'
import {DropTarget} from 'react-dnd'
import {removeEvent} from '../../ducks/events'

class Bucket extends Component {

  render() {
    const {connectDropTarget, canDrop, hovered} = this.props

    const dndStyle = {
      border: `2px solid ${canDrop
        ? hovered
        ? 'green'
        : 'red'
        : 'black'}`,
      width:'100px',
      height:'100px'
    }

    return connectDropTarget(
      <div>
      <h3>Bucket:</h3>
      <div style={{...dndStyle}}></div>
      </div>
    )
  }
}
const spec = {
  drop(props, monitor) {
    props.removeEvent(monitor.getItem().id)
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  hovered: monitor.isOver()
})

export default connect(null, {removeEvent})(DropTarget(['event'], spec, collect)(Bucket))
