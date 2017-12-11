import { appName } from '../config'
import { Record, List, Map } from 'immutable'
import { put, call, all, takeEvery } from 'redux-saga/effects'
import firebase from 'firebase'
import { createSelector } from 'reselect'
import { LOCATION_CHANGE } from 'react-router-redux'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const FIND_EVENTS_REQUEST = `${prefix}/FIND_EVENTS_REQUEST`
export const FIND_EVENTS_START = `${prefix}/FIND_EVENTS_START`
export const FIND_EVENTS_SUCCESS = `${prefix}/FIND_EVENTS_SUCCESS`
export const FIND_EVENTS_ERROR = `${prefix}/FIND_EVENTS_ERROR`

/**
 * Reducer
 * */
const ReducerState = Record({
    entities: new List([])
})

const EventRecord = Record({
    id: null,
    month: null,
    submissionDeadline: null,
    title: null,
    url: null,
    when: null,
    where: null
})

export default function reducer(state = new ReducerState(), action) {
    const { type, payload } = action

    switch (type) {
        case FIND_EVENTS_SUCCESS:
            return state.update('entities', entities =>
                entities.concat(
                    new Map(payload.entities)
                        .map((val, key) => {
                            val.id = key
                            return new EventRecord(val)
                        })
                        .toList()
                )
            )

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const eventsSelector = createSelector(
    stateSelector,
    state => state.entities
)

/**
 * Action Creators
 * */

export function findEvents() {
    return {
        type: FIND_EVENTS_REQUEST
    }
}

/**
 * Sagas
 */

export const routeChangeSaga = function*(action) {
    const { pathname } = action.payload

    // an experiment instead of using didMount
    if (pathname === '/events/list') {
        const action = yield call(findEvents)
        yield put(action)
    }
}

export const findEventsSaga = function*(action) {
    yield put({ type: FIND_EVENTS_START })

    try {
        const db = firebase.database()

        const eventsRef = yield call([db, db.ref], `/events`)

        const eventsSnapshot = yield call([eventsRef, eventsRef.once], 'value')

        const events = yield call([eventsSnapshot, eventsSnapshot.val])

        yield put({ type: FIND_EVENTS_SUCCESS, payload: { entities: events } })
    } catch (error) {
        yield put({ type: FIND_EVENTS_ERROR, payload: { error } })
    }
}

export const saga = function*() {
    yield all([
        takeEvery(FIND_EVENTS_REQUEST, findEventsSaga),
        takeEvery(LOCATION_CHANGE, routeChangeSaga)
    ])
}
