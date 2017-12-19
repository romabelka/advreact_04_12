import React, { Component } from 'react'
import {DragLayer} from 'react-dnd'

const style = {
    position: 'fixed',
    top: 0, bottom: 0,
    left: 0, right: 0,
    pointerEvents: 'none',
    zIndex: 10000
}

class CustomDragLayer extends Component {
    static propTypes = {

    };

    getItem() {
        const {offset, item} = this.props

        if (!item.DragPreview || !offset) return null

        const style = {
            transform: `translate(${offset.x}px,${offset.y}px)`
        }

        return <div style={style}>
            <item.DragPreview {...item} />
        </div>
    }

    render() {
        const {isDragging} = this.props

        if (!isDragging) return null

        return (
            <div style={style}>
                {this.getItem()}
            </div>
        )
    }
}

const collect = monitor => ({
    isDragging: monitor.isDragging(),
    offset: monitor.getSourceClientOffset(),
    item: monitor.getItem()
})

export default DragLayer(collect)(CustomDragLayer)