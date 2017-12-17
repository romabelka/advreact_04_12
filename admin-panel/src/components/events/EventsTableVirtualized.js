import React, { Component } from 'react'
import {connect} from 'react-redux'
import {fetchAllEvents, selectEvent, eventListSelector, loadedSelector, loadingSelector} from '../../ducks/events'
import Loader from '../common/Loader'
import {Table, Column, InfiniteLoader} from 'react-virtualized'
import 'react-virtualized/styles.css'

export class EventsTableVirtualized extends Component {
    static propTypes = {

    };

    componentDidMount() {
        this.props.fetchAllEvents()
    }

    render() {
        if (this.props.loading) return <Loader />
        return (
            <Table
                height={500}
                width={400}
                rowHeight={40}
                overscanRowCount={0}
                rowGetter={this.rowGetter}
                rowCount={this.props.events.length}
                headerHeight={50}
            >
                <Column
                    dataKey="title"
                    width={200}
                    label="title"
                />
                <Column
                    dataKey="when"
                    width={100}
                    label="month"
                />
                <Column
                    dataKey="where"
                    width={200}
                    label="place"
                />
            </Table>
        )
    }

    rowGetter = ({ index }) => this.props.events[index]
}

export default connect((state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
}), { fetchAllEvents, selectEvent })(EventsTableVirtualized)