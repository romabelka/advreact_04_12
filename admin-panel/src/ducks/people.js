import {appName} from '../config'
import {Record, List} from 'immutable'
import {put, call, all, takeEvery} from 'redux-saga/effects'
import {createSelector} from 'reselect'
import {reset} from 'redux-form';
import {generateId} from './utils'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON = `${prefix}/ADD_PERSON`
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
        case ADD_PERSON_SUCCESS:
            return state.update('entities', entities => entities.push(new PersonRecord(payload)))

        default:
            return state
    }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName]
export const peopleSelector = createSelector(stateSelector, state => state.entities.toJS())

/**
 * Action Creators
 * */

export function addPerson(person) {
    return {
        type: ADD_PERSON,
        payload: { person }
    }
}

/**
 * Sagas
 */

export const addPersonSaga = function * (action) {
    const { person } = action.payload

    try {
        const id = yield call(generateId)

        yield put({
            type: ADD_PERSON_SUCCESS,
            payload: { id, ...person }
        })
        yield put(reset('person'))
    }catch(error){
        yield put({
            type: ADD_PERSON_ERROR,
            payload: { error }
        })
    }
}

export const saga = function * () {
    yield all([
        takeEvery(ADD_PERSON, addPersonSaga)
    ])
}