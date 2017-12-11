import { appName } from '../config'
import { Record, List, Map } from 'immutable'
import { put, call, all, takeEvery } from 'redux-saga/effects'
import { generateId } from './utils'
import { reset } from 'redux-form'
import firebase from 'firebase'
import {createSelector} from 'reselect'
import {LOCATION_CHANGE} from 'react-router-redux'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const FIND_PEOPLE_REQUEST = `${prefix}/FIND_PEOPLE_REQUEST`
export const FIND_PEOPLE_START = `${prefix}/FIND_PEOPLE_START`
export const FIND_PEOPLE_SUCCESS = `${prefix}/FIND_PEOPLE_SUCCESS`
export const FIND_PEOPLE_ERROR = `${prefix}/FIND_PEOPLE_ERROR`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_START = `${prefix}/ADD_PERSON_START`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`
export const ADD_PERSON_ERROR = `${prefix}/ADD_PERSON_ERROR`

/**
 * Reducer
 * */
const ReducerState = Record({
    entities: new List([])
})

const PersonRecord = Record({
    id: null,
    firstName: null,
    lastName: null,
    email: null
})

export default function reducer(state = new ReducerState(), action) {
    const {type, payload} = action

    switch (type) {
        case FIND_PEOPLE_SUCCESS:
            return state.update('entities', entities => entities.concat(new Map(payload.entities).map((val, key) => {
                val.id = key
                return new PersonRecord(val)
            }).toList()))

        case ADD_PERSON_SUCCESS:
            return state.update('entities', entities => entities.push(new PersonRecord(payload.person)))

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const peopleSelector = createSelector(stateSelector, state => state.entities)

/**
 * Action Creators
 * */

export function findPeople() {
    return {
        type: FIND_PEOPLE_REQUEST
    }
}

export function addPerson(person) {
    return {
        type: ADD_PERSON_REQUEST,
        payload: { person }
    }
}

/**
 * Sagas
 */

 export const routeChangeSaga = function* (action) {
    const { pathname } = action.payload

    // an experiment instead of using didMount
    if (pathname === '/people/list') {
        const action = yield call(findPeople)
        yield put(action)
    }
 }

 export const findPeopleSaga = function* (action) {
    yield put({ type: FIND_PEOPLE_START })

    try {
        const db = firebase.database()

        const peopleRef = yield call([db, db.ref], `/people`)

        const peopleSnapshot = yield call([peopleRef, peopleRef.once], 'value')

        const people = yield call([peopleSnapshot, peopleSnapshot.val])

        yield put({ type: FIND_PEOPLE_SUCCESS, payload: { entities: people } })
    } catch (error) {
        yield put({ type: FIND_PEOPLE_ERROR, payload: { error } })
    }
 }

export const addPersonSaga = function * (action) {
    const { person } = action.payload

    yield put({ type: ADD_PERSON_START })

    try {
        const id = yield call(generateId)

        const db = firebase.database()

        const personRef = yield call([db, db.ref], `/people/${id}`)

        yield call([personRef, personRef.set], person)

        yield put({
            type: ADD_PERSON_SUCCESS,
            payload: { id, ...person }
        })

        yield put(reset('person'))
    } catch (error) {
        yield put({
            type: ADD_PERSON_ERROR,
            payload: { error }
        })
    }
}

export const saga = function* () {
    yield all([
        takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
        takeEvery(FIND_PEOPLE_REQUEST, findPeopleSaga),
        takeEvery(LOCATION_CHANGE, routeChangeSaga)
    ])
}
