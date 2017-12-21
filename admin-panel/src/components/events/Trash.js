import React, { Component } from 'react'
import {DropTarget} from 'react-dnd'
import {connect} from 'react-redux'
import {deleteEvent, stateSelector} from '../../ducks/events'
import Loader from '../common/Loader'
import {Motion, spring} from 'react-motion'

class Trash extends Component {
    static propTypes = {

    };

    render() {
        const {connectDropTarget, isOver, loading} = this.props
        const dndStyle = {
            border: `1px solid ${isOver ? 'green' : 'black'}`,
            width: 100, height: 100,
            position: 'fixed',
            top: 0, right: 0
        }

        return <Motion
            defaultStyle = {{ opacity: 0 }}
            style = {{ opacity: spring(1, {stiffness: 50, damping: 50}) }}
            onRest = {() => console.log('---', 'ready')}
        >
            {style => {
                console.log('---', style)
                return connectDropTarget(
                    <div style = {{...dndStyle, ...style}}>
                        Trash
                        {loading && <Loader/>}
                    </div>
                )
            }}
        </Motion>
    }
}

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
})

const spec = {
    drop(props, monitor) {
        const item = monitor.getItem()
        props.deleteEvent(item.uid)
    }
}

export default connect(state => ({
    loading: stateSelector(state).loading
}), { deleteEvent })(DropTarget('event', spec, collect)(Trash))