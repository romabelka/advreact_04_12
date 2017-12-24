import {appName} from '../config'
import {Record, OrderedMap} from 'immutable'
import {createSelector} from 'reselect'
import {put, call, all, takeEvery, select, fork, spawn, cancel, cancelled, race, take} from 'redux-saga/effects'
import {delay, eventChannel} from 'redux-saga'
import {reset} from 'redux-form'
import firebase from 'firebase'
import {fbToEntities} from './utils'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON = `${prefix}/ADD_PERSON`
export const ADD_PERSON_START = `${prefix}/ADD_PERSON_START`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const ADD_EVENT_REQUEST = `${prefix}/ADD_EVENT_REQUEST`
export const ADD_EVENT_SUCCESS = `${prefix}/ADD_EVENT_SUCCESS`

/**
 * Reducer
 * */
const ReducerState = Record({
    entities: new OrderedMap({})
})

const PersonRecord = Record({
    uid: null,
    firstName: null,
    lastName: null,
    email: null,
    events: []
})

export default function reducer(state = new ReducerState(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_PERSON_SUCCESS:
            return state.setIn(['entities', payload.uid],new PersonRecord(payload))

        case FETCH_ALL_SUCCESS:
            return state.set('entities', fbToEntities(payload, PersonRecord))

        case ADD_EVENT_SUCCESS:
            return state.setIn(['entities', payload.personId, 'events'], payload.events)

        default:
            return state
    }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName]
export const entitiesSelector = createSelector(stateSelector, state => state.entities)
export const peopleListSelector = createSelector(entitiesSelector, entities => entities.valueSeq().toArray())
export const idSelector = (_, props) => props.id
export const personSelector = createSelector(entitiesSelector, idSelector, (entities, id) => entities.get(id))

/**
 * Action Creators
 * */

export function addPerson(person) {
    return {
        type: ADD_PERSON,
        payload: { person }
    }
}

export function fetchAllPeople() {
    return {
        type: FETCH_ALL_REQUEST
    }
}

export function addEventToPerson(eventId, personId) {
    return {
        type: ADD_EVENT_REQUEST,
        payload: { eventId, personId }
    }
}

/**
 * Sagas
 */

export function * addPersonSaga(action) {

    yield put({
        type: ADD_PERSON_START,
        payload: { ...action.payload.person }
    })

    const peopleRef = firebase.database().ref('people')

    const { key } = yield call([peopleRef, peopleRef.push], action.payload.person)

    yield put({
        type: ADD_PERSON_SUCCESS,
        payload: { uid: key , ...action.payload.person }
    })

    yield put(reset('person'))
}

export function * fetchAllSaga() {
    const peopleRef = firebase.database().ref('people')

    const data = yield call([peopleRef, peopleRef.once], 'value')

    yield put({
        type: FETCH_ALL_SUCCESS,
        payload: data.val()
    })
}

export function * addEventToPersonSaga({ payload: { eventId, personId } }) {
    const eventsRef = firebase.database().ref(`people/${personId}/events`)

    const state = yield select(stateSelector)
    const events = state.getIn(['entities', personId, 'events']).concat(eventId)

    yield call([eventsRef, eventsRef.set], events)

    yield put({
        type: ADD_EVENT_SUCCESS,
        payload: { events, personId }
    })
}

export function * syncPeopleWithShortPolling() {
    let i = 0
    while (true) {
        console.log('---', i)
        if (i++ > 2) throw new Error('hohoho')
        yield call(fetchAllSaga)
        yield delay(1500)
    }

/*
    try {
        while (true) {
            yield call(fetchAllSaga)
            yield delay(1500)
        }
    } finally {
        if (yield cancelled) {
            console.log('---', 'cancelled')
        }
    }
*/
}

export function* cancellableSync() {
    const res = yield race({
        timeout: delay(10000),
        sync: syncPeopleWithShortPolling()
    })

    console.log('---', 'canceled', res)
/*
    const task = yield fork(syncPeopleWithShortPolling)
    yield delay(5000)
    yield cancel(task)
    console.log('---', 'cancelled')
*/
}

const createSocket = () => eventChannel(emit => {
    const callback = data => emit({ data })
    firebase.database().ref('people').on('value', callback)

    return () => firebase.database().ref('people').off('value', callback)
})

export function * syncRealTime() {
    const chanel = yield call(createSocket)

    while (true) {
        const { data } = yield take(chanel)

        yield put({
            type: FETCH_ALL_SUCCESS,
            payload: data.val()
        })
    }
}


export const saga = function * () {
    yield spawn(syncRealTime)

    yield all([
        takeEvery(ADD_PERSON, addPersonSaga),
        takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
        takeEvery(ADD_EVENT_REQUEST, addEventToPersonSaga)
    ])
}