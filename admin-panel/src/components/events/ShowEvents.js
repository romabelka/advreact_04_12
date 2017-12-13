import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getEvents, eventsSelector} from '../../ducks/events'


class ShowEvents extends Component {

    componentDidMount(){
        this.props.getEvents();
    }

    render() {
        return (
        <div>
            {this.props.events.map((event) => event.map((ev) => (
                <div key={ev.title + ev.when}>{ev.title}</div>
            )))}
         </div>
        )
    }
}

const mapStateToProps = (state) => ({
    events: eventsSelector(state),
})

export default connect(mapStateToProps, {getEvents})(ShowEvents)