import React, { Component } from 'react'
import {connect} from 'react-redux'
import {selectedEvents} from '../../ducks/events'
import SelectedEventCard from './SelectedEventCard'
import {TransitionMotion, spring} from 'react-motion'

class SelectedEvents extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h2>Selected Events</h2>
                <TransitionMotion
                    styles = {this.getStyles()}
                    willEnter = {this.willEnter}
                    willLeave = {this.willLeave}
                >
                    {interpolatedData => (
                        <div>
                            {interpolatedData.map(interpolated => (
                                <div style = {interpolated.style} key = {interpolated.key}>
                                    <SelectedEventCard event = {interpolated.data}/>
                                </div>
                            ))}
                        </div>
                    )}
                </TransitionMotion>
            </div>
        )
    }

    willLeave = () => ({
        opacity: spring(0, { stiffness: 20 })
    })

    willEnter = () => ({
        opacity: 0
    })

    getStyles() {
        return this.props.events.map(event => ({
            key: event.uid,
            style: {
                opacity: spring(1, { stiffness: 40 })
            },
            data: event
        }))
    }
}

export default connect(state => ({
    events: selectedEvents(state)
}))(SelectedEvents)