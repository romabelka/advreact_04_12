import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import EventList from '../events/EventList'
import {loadEvents, eventsSelector, loadingSelector, errorSelector} from "../../ducks/events"
import Loader from '../common/Loader'

class EventPage extends Component {
    static propTypes = {
        events: PropTypes.array,
        loading: PropTypes.bool,
        error: PropTypes.string
    };

    componentDidMount = () => {
        this.props.loadEvents()
    }

    render() {
        const {events, loading, error} = this.props

        return (
            <div>
                <h2>Events</h2>
                {loading && <Loader/>}
                {error && <h2 style={{color: 'red'}}>{error}</h2>}
                {events && <EventList events={events} />}
            </div>
        )
    }
}

export default connect(state => ({
    events: eventsSelector(state),
    loading: loadingSelector(state),
    error: errorSelector(state)
}), {loadEvents})(EventPage)