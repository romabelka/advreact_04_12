import {appName} from '../config'
import {Record} from 'immutable'
import {put, all, take, call} from 'redux-saga/effects'
import {createSelector} from "reselect"
import firebase from 'firebase/index'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const LOAD_EVENTS_REQUEST = `${prefix}/LOAD_EVENTS_REQUEST`
export const LOAD_EVENTS_START = `${prefix}/LOAD_EVENTS_START`
export const LOAD_EVENTS_SUCCESS = `${prefix}/LOAD_EVENTS_SUCCESS`
export const LOAD_EVENTS_ERROR = `${prefix}/LOAD_EVENTS_ERROR`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    data: null,
    loading: false,
    error: null
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case LOAD_EVENTS_START:
            return state
                .set('error', null)
                .set('loading', true)
        case LOAD_EVENTS_SUCCESS:
            return state
                .set('loading', false)
                .set('data', payload)
        case LOAD_EVENTS_ERROR:
            return state
                .set('loading', false)
                .set('error', payload.error.message)
        default:
            return state
    }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName]
export const eventsSelector = createSelector(stateSelector, state => state.data)
export const loadingSelector = createSelector(stateSelector, state => state.loading)
export const errorSelector = createSelector(stateSelector, state => state.error)

/**
 * Action Creators
 * */

export function loadEvents() {
    return {
        type: LOAD_EVENTS_REQUEST
    }
}

/**
 * Sagas
 */
function getFBEvents(ref) {
    return ref.once('value').then(function(snapshot) {
        let events = [];

        snapshot.forEach(function(childSnapshot) {
            events.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            })
        });
        return events;
    });
}

export const loadEventsSaga = function * () {
    while (true) {
        yield take(LOAD_EVENTS_REQUEST)

        yield put({
            type: LOAD_EVENTS_START
        })

        try {
            const db = firebase.database();
            const eventsRef = yield call([db, db.ref], 'events/');
            const events = yield call(getFBEvents, eventsRef)

            yield put({
                type: LOAD_EVENTS_SUCCESS,
                payload: events
            })

        } catch (error) {
            yield put({
                type: LOAD_EVENTS_ERROR,
                payload: {error}
            })
        }
    }
}

export const saga = function * () {
    yield all([
        loadEventsSaga()
    ])
}