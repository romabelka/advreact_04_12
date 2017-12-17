import {appName} from '../config'
import {Record, OrderedMap} from 'immutable'
import {createSelector} from 'reselect'
import {put, call, all, takeEvery, takeLatest} from 'redux-saga/effects'
import {reset} from 'redux-form'
import firebase from 'firebase'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`
export const ADD_PERSON_ERROR = `${prefix}/ADD_PERSON_ERROR`

export const GET_PEOPLE_REQUEST = `${prefix}/GET_PEOPLE_REQUEST`
export const GET_PEOPLE_SUCCESS = `${prefix}/GET_PEOPLE_SUCCESS`
export const GET_PEOPLE_ERROR = `${prefix}/GET_PEOPLE_ERROR`

/**
 * Reducer
 * */
const ReducerState = Record({
    entities: new OrderedMap({}),
    loading: false,
    error: null
})

const PersonRecord = Record({
    firstName: null,
    lastName: null,
    email: null
})

export default function reducer(state = new ReducerState(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_PERSON_REQUEST:
        case GET_PEOPLE_REQUEST:
            return state.set('loading', true)

        case ADD_PERSON_SUCCESS:
            return state
              .set('loading', false)
              .setIn(['entities', payload.uid], new PersonRecord(payload))

        case GET_PEOPLE_SUCCESS:
            let nextState = state;

            Object.entries(payload).forEach(([key, val]) => {
              nextState = nextState.setIn(['entities', key], new PersonRecord(val))
            })

            return nextState
              .set('loading', false)

        case ADD_PERSON_ERROR:
        case GET_PEOPLE_ERROR:
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
export const entitiesSelector = createSelector(stateSelector, state => state.entities)
export const peopleListSelector = createSelector(entitiesSelector, entities => entities.valueSeq().toArray())
export const loadingSelector = createSelector(stateSelector, state => state.loading)

/**
 * Action Creators
 * */

export function addPerson(person) {
    return {
        type: ADD_PERSON_REQUEST,
        payload: { person }
    }
}

export function getPeople() {
    return {
        type: GET_PEOPLE_REQUEST,
    }
}

/**
 * Sagas
 */

export const fetchPeople = function* () {
  const ref = firebase.database().ref('/people')

  try {
    const dataSnapshot = yield call([ref, ref.once], 'value')

    console.log('snapshot.val-->', dataSnapshot.val())

    yield put({
      type: GET_PEOPLE_SUCCESS,
      payload: dataSnapshot.val()
    })
  } catch (error) {
      yield put({
        type: GET_PEOPLE_ERROR,
        payload: { error }
      })
  }
}

export const addPersonSaga = function * (action) {
  const ref = firebase.database().ref('/people')
  const { person } = action.payload
  
  try {
    const data = yield call([ref, ref.push], person)

    yield put({
        type: ADD_PERSON_SUCCESS,
        payload: {uid: data.key, ...person}
    })

    yield put(reset('person'))
  } catch(error) {
      yield put({
        type: ADD_PERSON_ERROR,
        payload: { error }
      })
  }
}

export const saga = function * () {
    yield all([
        takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
        takeLatest(GET_PEOPLE_REQUEST, fetchPeople)
    ])
}