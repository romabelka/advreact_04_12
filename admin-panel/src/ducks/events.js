import {all, takeEvery, put, call} from 'redux-saga/effects'
import {appName} from '../config'
import {Record, OrderedSet, OrderedMap, List} from 'immutable'
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
export const FETCH_LIMIT_REQUEST = `${prefix}/FETCH_LIMIT_REQUEST`
export const FETCH_LIMIT_START = `${prefix}/FETCH_LIMIT_START`
export const FETCH_LIMIT_SUCCESS = `${prefix}/FETCH_LIMIT_SUCCESS`

export const SELECT = `${prefix}/SELECT`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    loading: false,
    loadingLimit: false,
    loaded: false,
    loadedLimit: false,
    selected: new OrderedSet(),
    entities: new OrderedMap({}),
    entitiesLimit: new List([])
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
        case FETCH_LIMIT_START:
            return state.set('loadingLimit', true)
        case FETCH_ALL_SUCCESS:
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('entities', fbToEntities(payload, EventRecord))
        case FETCH_LIMIT_SUCCESS:
            return state
                .set('loadingLimit', false)
                .set('loadedLimit', true)
                .set('entitiesLimit', fbToEntities(payload, EventRecord))
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
export const entitiesLimitSelector = createSelector(stateSelector, state => state.entitiesLimit)
export const loadingSelector = createSelector(stateSelector, state => state.loading)
export const loadingLimitSelector = createSelector(stateSelector, state => state.loadingLimit)
export const loadedSelector = createSelector(stateSelector, state => state.loaded)
export const loadedLimitSelector = createSelector(stateSelector, state => state.loadedLimit)
export const eventListSelector = createSelector(entitiesSelector, entities => entities.valueSeq().toArray())
export const eventLimitListSelector = createSelector(entitiesLimitSelector, entitiesLimitSelector => entitiesLimitSelector.valueSeq().toArray())

/**
 * Action Creators
 * */

export function fetchAllEvents() {
    return {
        type: FETCH_ALL_REQUEST
    }
}

export function fetchLimitEvents(startAt, limit) {
    return {
        type: FETCH_LIMIT_REQUEST,
        payload: {startAt, limit}
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

    yield put({
        type: FETCH_ALL_SUCCESS,
        payload: snapshot.val()
    })
}

export function* fetchLimitSaga(action) {

    const {startAt, limit} = action.payload
    const ref = firebase.database().ref('events').orderByKey().startAt(startAt.toString()).limitToFirst(limit)

    yield put({
        type: FETCH_LIMIT_START
    })

    const snapshot = yield call([ref, ref.once], 'value')

    yield put({
        type: FETCH_LIMIT_SUCCESS,
        payload: snapshot.val()
    })
}

export function* saga() {
    yield all([
        takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
        takeEvery(FETCH_LIMIT_REQUEST, fetchLimitSaga)
    ])
}