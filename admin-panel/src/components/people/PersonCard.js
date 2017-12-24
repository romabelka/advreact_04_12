import React, { Component } from 'react'
import {DragSource} from 'react-dnd'
import {TransitionMotion, spring} from 'react-motion'
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
            <TransitionMotion
                willEnter={this.willEnter}
                styles={[{
                  key: this.props.person.uid,
                  style: {
                      opacity: spring(1, { stiffness: 60, damping: 40 })
                  }
                }]}
            >
                {interpolatedData => (
                    <div style={{...dragStyles, ...style, ...interpolatedData[0].style}} key={interpolatedData[0].key}>
                        {connectDragSource(<h1>{person.firstName} <b>{person.lastName}</b></h1>)}
                        <h3>{person.email}</h3>
                    </div>
                )}
            </TransitionMotion>
        )
    }

    willEnter = () => ({
        opacity: 0
    })
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