import React, { Component } from 'react'
import {DragSource} from 'react-dnd'

class PersonCard extends Component {
    static propTypes = {

    };

    render() {
        const {style, person, connectDragSource, isDragging} = this.props
        const dragStyles = {
            opacity: isDragging ? 0.2 : 1
        }
        return (
            <div style={{...dragStyles, ...style}}>
                {connectDragSource(<h1>{person.firstName} <b>{person.lastName}</b></h1>)}
                <h3>{person.email}</h3>
            </div>
        )
    }
}

const spec = {
    beginDrag(props) {
        return {
            id: props.person.uid
        }
    }
}

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
})

export default DragSource('person', spec, collect)(PersonCard)