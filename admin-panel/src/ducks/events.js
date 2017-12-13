import {appName} from '../config'
import {Record, List} from 'immutable'
import {put, all, call, takeEvery} from 'redux-saga/effects'
import { getEvents as getEventsDB } from '../ducks/utils'
import {createSelector} from 'reselect'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const EVENTS_REQUEST = `${prefix}/EVENTS_REQUEST`
export const EVENTS_REQUEST_SUCCESS = `${prefix}/EVENTS_REQUEST_SUCCESS`
export const EVENTS_REQUEST_FAIL = `${prefix}/EVENTS_REQUEST_FAIL`

/**
 * Reducer
 * */
const ReducerState = Record({
    entities: new List([]),
    error: null
})


export default function reducer(state = new ReducerState(), action) {
    const {type, payload} = action

    switch (type) {
        case EVENTS_REQUEST:
            return state

        case EVENTS_REQUEST_SUCCESS:
            return state.update('entities', entities => entities.push(Object.values(payload.data)))

        case EVENTS_REQUEST_FAIL:
            return
                state.set('error', payload.message)

        default:
            return state
    }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName]
export const eventsSelector = createSelector(stateSelector, state => state.entities)
/**
 * Action Creators
 * */

export function getEvents() {
    return {
        type: EVENTS_REQUEST,
    }
}
export function getEventsSuccess(data) {
    return {
        type: EVENTS_REQUEST_SUCCESS,
        payload: { data }
    }
}
export function getEventsFail(message) {
    return {
        type: EVENTS_REQUEST_FAIL,
        payload: { message }
    }
}

/**
 * Sagas
 */


export const getEventsSaga = function * () {

    try{
        const  data = yield call(getEventsDB);
        yield put(getEventsSuccess(data))
    }catch (e){
        yield put(getEventsFail(e.message))
    }
}

export const saga = function * () {
    yield all([
        takeEvery(EVENTS_REQUEST, getEventsSaga)
    ])
}