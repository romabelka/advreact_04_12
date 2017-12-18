import React, { Component } from 'react'
import {DragSource} from 'react-dnd'
import {getEmptyImage} from 'react-dnd-html5-backend'
import PersonDragPreview from './PersonDragPreview'

class PersonCard extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.connectDragPreview(getEmptyImage())
    }

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
            id: props.person.uid,
            DragPreview: PersonDragPreview
        }
    }
}

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
})

export default DragSource('person', spec, collect)(PersonCard)