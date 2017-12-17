import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    fetchLimitEvents,
    selectEvent,
    fetchAllEvents,
    eventLimitListSelector,
    eventListSelector
} from '../../ducks/events'
import {InfiniteLoader, List} from 'react-virtualized'
import 'react-virtualized/styles.css'

export class EventsInfiniteLoaderVirtualized extends Component {
    static propTypes = {};

    componentDidMount() {
        this.props.fetchAllEvents()
        this.loadMoreRows({startIndex: 0, stopIndex: 10})
    }

    loadMoreRows = ({startIndex, stopIndex}) => {
        this.props.fetchLimitEvents(startIndex, stopIndex)
    }

    isRowLoaded = ({index}) => {
        return !!this.props.events[index];
    }

    rowRenderer = ({key, index, style}) => {
        const {events} = this.props

        return (
            <div
                key={key}
                style={style}
            >
                {events[index] && this.getRow(events[index])}
            </div>
        )
    }

    getRow = (event) => (
        <div key={event.uid} className="test__event_div_row">
            <span>{event.title}</span>
            <span>{event.when}</span>
            <span>{event.where}</span>
        </div>
    )

    render() {
        const {eventsTotal, loading} = this.props

        return (
            <InfiniteLoader
                isRowLoaded={this.isRowLoaded}
                loadMoreRows={this.loadMoreRows}
                rowCount={eventsTotal}
            >
                {({onRowsRendered, registerChild}) => (
                    <List
                        height={200}
                        onRowsRendered={onRowsRendered}
                        ref={registerChild}
                        rowCount={eventsTotal}
                        rowHeight={20}
                        rowRenderer={this.rowRenderer}
                        width={600}
                    />
                )}
            </InfiniteLoader>
        )
    }
}

export default connect((state) => ({
    events: eventLimitListSelector(state),
    eventsTotal: eventListSelector(state).length,
}), {fetchLimitEvents, selectEvent, fetchAllEvents})(EventsInfiniteLoaderVirtualized)