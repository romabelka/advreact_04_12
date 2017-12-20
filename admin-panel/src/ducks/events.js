import {all, takeEvery, put, call, take, select} from 'redux-saga/effects'
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

export const FETCH_LAZY_REQUEST = `${prefix}/FETCH_LAZY_REQUEST`
export const FETCH_LAZY_START = `${prefix}/FETCH_LAZY_START`
export const FETCH_LAZY_SUCCESS = `${prefix}/FETCH_LAZY_SUCCESS`

export const SELECT = `${prefix}/SELECT`
export const ADD_PERSON_TO_EVENT = `${prefix}/ADD_PERSON_TO_EVENT`

export const REMOVE = `${prefix}/REMOVE`

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
        case FETCH_LAZY_START:
            return state.set('loading', true)

        case FETCH_ALL_SUCCESS:
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('entities', fbToEntities(payload, EventRecord))

        case FETCH_LAZY_SUCCESS:
            return state
                .set('loading', false)
                .mergeIn(['entities'], fbToEntities(payload, EventRecord))
                .set('loaded', Object.keys(payload).length < 10)

        case SELECT:
            return state.update('selected', selected => selected.has(payload.uid)
                ? selected.remove(payload.uid)
                : selected.add(payload.uid)
            )
        case REMOVE:
            return state.update('entities', entities =>  entities.delete(payload.eventId))


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
export const selectionSelector = createSelector(stateSelector, state => state.selected)
export const selectedEvents = createSelector(eventListSelector, selectionSelector, (events, selected) =>
    events.filter(event => selected.has(event.uid))
)
export const idSelector = (_, props) => props.id
export const eventSelector = createSelector(entitiesSelector, idSelector, (entities, id) => entities.get(id) !== undefined?entities.get(id):EventRecord)

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

export function fetchLazy() {
    return {
        type: FETCH_LAZY_REQUEST
    }
}

export function addPersonToEvent(personId, eventId) {
    return {
        type: ADD_PERSON_TO_EVENT,
        payload: { personId, eventId }
    }
}

export function removeEvent(eventId){
    return {
        type: REMOVE,
        payload:{eventId}
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

export const fetchLazySaga = function * () {
    while (true) {
        yield take(FETCH_LAZY_REQUEST)

        const state = yield select(stateSelector)

        if (state.loading || state.loaded) continue
//        if (state.loaded) return

        yield put({
            type: FETCH_LAZY_START
        })

        const lastEvent = state.entities.last()

        const ref = firebase.database().ref('events')
            .orderByKey()
            .limitToFirst(10)
            .startAt(lastEvent ? lastEvent.uid : '')

        const data = yield call([ref, ref.once], 'value')

        yield put({
            type: FETCH_LAZY_SUCCESS,
            payload: data.val()
        })
    }
}

export function* saga() {
    yield all([
        takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
        fetchLazySaga()
    ])
}