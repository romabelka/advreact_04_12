import {appName} from '../config'
import {Record, OrderedMap} from 'immutable'
import {createSelector} from 'reselect'
import {put, call, all, takeEvery} from 'redux-saga/effects'
import {reset} from 'redux-form'
import firebase from "firebase/index"
import {fbToEntities} from "./utils"

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_START = `${prefix}/ADD_PERSON_START`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`
export const ADD_PERSON_ERROR = `${prefix}/ADD_PERSON_ERROR`
export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_START = `${prefix}/FETCH_ALL_START`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

/**
 * Reducer
 * */
const ReducerState = Record({
    addPersonLoading: false,
    addPersonSuccess: false,
    addPersonError: null,
    loading: false,
    loaded: false,
    entities: new OrderedMap({})
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
        case ADD_PERSON_START:
            return state.set('addPersonLoading', true)
        case ADD_PERSON_SUCCESS:
            return state
                .set('addPersonLoading', false)
                .set('addPersonSuccess', true)
        case ADD_PERSON_ERROR:
            return state
                .set('addPersonLoading', false)
                .set('addPersonError', payload.error.message)
        case FETCH_ALL_START:
            return state.set('loading', true)

        case FETCH_ALL_SUCCESS:
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('entities', fbToEntities(payload, PersonRecord))
        default:
            return state
    }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName]
export const addPersonLoadingSelector = createSelector(stateSelector, state => state.addPersonLoading)
export const addPersonSuccessSelector = createSelector(stateSelector, state => state.addPersonSuccess)
export const addPersonErrorSelector = createSelector(stateSelector, state => state.addPersonError)
export const loadingSelector = createSelector(stateSelector, state => state.loading)
export const loadedSelector = createSelector(stateSelector, state => state.loaded)
export const entitiesSelector = createSelector(stateSelector, state => state.entities)
export const peopleListSelector = createSelector(entitiesSelector, entities => entities.valueSeq().toArray())

/**
 * Action Creators
 * */

export function addPerson(person) {
    return {
        type: ADD_PERSON_REQUEST,
        payload: { person }
    }
}

export function fetchAllPeople() {
    return {
        type: FETCH_ALL_REQUEST
    }
}

/**
 * Sagas
 */

export const addPersonSaga = function * (action) {
    const { person } = action.payload

    const ref = firebase.database().ref('/people')

    yield put({
        type: ADD_PERSON_START
    })

    try {
        yield call([ref, ref.push], person)

        yield put({
            type: ADD_PERSON_SUCCESS,
        })

        // update peolple
        yield put({
            type: FETCH_ALL_REQUEST
        })

        yield put(reset('person'))
    } catch (error) {

        yield put({
            type: ADD_PERSON_ERROR,
            payload: {error}
        })
    }
}

export function* fetchAllSaga() {
    const ref = firebase.database().ref('people')

    yield put({
        type: FETCH_ALL_START
    })

    const snapshot = yield call([ref, ref.once], 'value')

    yield put({
        type: FETCH_ALL_SUCCESS,
        payload: snapshot.val()
    })
}

export const saga = function * () {
    yield all([
        takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
        takeEvery(FETCH_ALL_REQUEST, fetchAllSaga)
    ])
}