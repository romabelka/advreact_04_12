import React, { Component } from 'react'
import {DragSource} from 'react-dnd'
import {getEmptyImage} from 'react-dnd-html5-backend'
import EventDragPreview from './EventDragPreview'

class EventsTableRow extends Component {

  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage())
  }

  render() {


    const { className,
      columns,
      index,
      key,
      onRowClick,
      onRowDoubleClick,
      onRowMouseOut,
      onRowMouseOver,
      onRowRightClick,
      rowData,
      style,

      isDragging,
      connectDragSource
      } = this.props;

    const dragStyles = {
      opacity: isDragging ? 0.2 : 1
    }

    const a11yProps = {};

    if (
      onRowClick ||
      onRowDoubleClick ||
      onRowMouseOut ||
      onRowMouseOver ||
      onRowRightClick
    ) {
      a11yProps['aria-label'] = 'row';
      a11yProps.tabIndex = 0;

      if (onRowClick) {
        a11yProps.onClick = event => onRowClick({ event, index, rowData });
      }
      if (onRowDoubleClick) {
        a11yProps.onDoubleClick = event =>
          onRowDoubleClick({ event, index, rowData });
      }
      if (onRowMouseOut) {
        a11yProps.onMouseOut = event => onRowMouseOut({ event, index, rowData });
      }
      if (onRowMouseOver) {
        a11yProps.onMouseOver = event => onRowMouseOver({ event, index, rowData });
      }
      if (onRowRightClick) {
        a11yProps.onContextMenu = event =>
          onRowRightClick({ event, index, rowData });
      }
    }

    return (
      connectDragSource(<div
        {...a11yProps}
        style={{...dragStyles, ...style}}
        className={className}
        key={key}
        role="row"
        >
        {columns}
      </div>
      )
    );

  }
}
const spec = {
  beginDrag(props) {
    return {
      id: props.rowData.uid,
      DragPreview: EventDragPreview
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

export default DragSource('event', spec, collect)(EventsTableRow)