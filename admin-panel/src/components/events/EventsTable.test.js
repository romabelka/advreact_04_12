import React from 'react'
import {shallow} from 'enzyme'
import events from '../../mocks/conferences'

import {EventsTable} from './EventsTable'
import Loader from '../common/Loader'

const eventList = events.map(event => ({...event, uid: Math.random()}))

describe('Events Table', () => {
    it('should render a loader', () => {
        const table = shallow(<EventsTable
            loading
        />, { disableLifecycleMethods: true })

        expect(table.contains(<Loader />))
    });

    it('should render N rows', () => {
        const table = shallow(<EventsTable
            events = {eventList}
        />, { disableLifecycleMethods: true })

        expect(table.find('.test__event_table_row').length).toBe(eventList.length)
    });

    it('should request fetch all events', function (done) {
        shallow(<EventsTable
            events = {[]}
            fetchAllEvents = {() => done()}
        />)
    });

    it('should select an event', () => {
        let selected = null

        const table = shallow(<EventsTable
            events = {eventList}
            selectEvent = {(uid) => selected = uid}
        />, { disableLifecycleMethods: true })

        table.find('.test__event_table_row').first().simulate('click')

        expect(selected).toEqual(eventList[0].uid)

    });

});