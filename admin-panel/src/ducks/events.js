import {all, takeEvery, put, call} from 'redux-saga/effects'
import {appName} from '../config'
import {Record, OrderedSet, OrderedMap} from 'immutable'
import firebase from 'firebase'
import {createSelector} from 'reselect'
import {fbToEntities} from './utils'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const SELECT = `${prefix}/SELECT`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    loading: false,
    loaded: false,
    selected: new OrderedSet(),
    entities: new OrderedMap({})
})

export const EventRecord = Record({
    uid: null,
    month: null,
    submissionDeadline: null,
    title: null,
    url: null,
    when: null,
    where: null
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case FETCH_ALL_START:
            return state.set('loading', true)

        case FETCH_ALL_SUCCESS:
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('entities', fbToEntities(payload, EventRecord))

        case SELECT:
            return state.update('selected', selected => selected.has(payload.uid)
                ? selected.remove(payload.uid)
                : selected.add(payload.uid)
            )

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const entitiesSelector = createSelector(stateSelector, state => state.entities)
export const loadingSelector = createSelector(stateSelector, state => state.loading)
export const loadedSelector = createSelector(stateSelector, state => state.loaded)
export const eventListSelector = createSelector(entitiesSelector, entities => entities.valueSeq().toArray())

/**
 * Action Creators
 * */

export function fetchAllEvents() {
    return {
        type: FETCH_ALL_REQUEST
    }
}

export function selectEvent(uid) {
    return {
        type: SELECT,
        payload: { uid }
    }
}

/**
 * Sagas
 * */

export function* fetchAllSaga() {
    const ref = firebase.database().ref('events')

    yield put({
        type: FETCH_ALL_START
    })

    const snapshot = yield call([ref, ref.once], 'value')

    console.log('---', snapshot)

    yield put({
        type: FETCH_ALL_SUCCESS,
        payload: snapshot.val()
    })
}

export function* saga() {
    yield all([
        takeEvery(FETCH_ALL_REQUEST, fetchAllSaga)
    ])
}