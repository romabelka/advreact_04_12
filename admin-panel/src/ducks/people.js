import {appName} from '../config'
import {Record, OrderedMap} from 'immutable'
import {createSelector} from 'reselect'
import {put, call, all, takeEvery} from 'redux-saga/effects'
import {reset} from 'redux-form'
import {generateId} from './utils'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON = `${prefix}/ADD_PERSON`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

/**
 * Reducer
 * */
const ReducerState = Record({
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
        case ADD_PERSON_SUCCESS:
            return state.setIn(['entities', payload.uid],new PersonRecord(payload))

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

    const uid = yield call(generateId)

    yield put({
        type: ADD_PERSON_SUCCESS,
        payload: {uid, ...person}
    })

    yield put(reset('person'))
}

export const saga = function * () {
    yield all([
        takeEvery(ADD_PERSON, addPersonSaga)
    ])
}