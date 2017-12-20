import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAllEvents, selectEvent, eventListSelector, loadedSelector, loadingSelector} from '../../ducks/events'
import Loader from '../common/Loader'
import EventsTableRow from './EventsTableRow'

export class EventsTable extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.fetchAllEvents()
    }

    render() {
        if (this.props.loading) return <Loader />
        return (
            <table>
                <tbody>
                    {this.getRows()}
                </tbody>
            </table>
        )
    }

    getRows = () => this.props.events.map(this.getRow)

    getRow = (event) => (
        <EventsTableRow event={event} selectEvent={this.props.selectEvent}/>
    )
}

export default connect((state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
}), { fetchAllEvents, selectEvent })(EventsTable)