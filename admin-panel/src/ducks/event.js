import {appName} from '../config'
import {Record, Map,List} from 'immutable'
import {put, call, all, takeEvery} from 'redux-saga/effects'
import {createSelector} from 'reselect'

import {saveEventsToFB, getEventsFromFB} from '../mocks/index';

/**
 * Constants
 * */

export const moduleName = 'event'
const prefix = `${appName}/${moduleName}`

export const ADD_EVENTS_REQUEST = `${prefix}/ADD_EVENTS_REQUEST`
export const ADD_EVENTS_START = `${prefix}/ADD_EVENTS_START`
export const ADD_EVENTS_SUCCESS = `${prefix}/ADD_EVENTS_SUCCESS`
export const ADD_EVENTS_ERROR = `${prefix}/ADD_EVENTS_ERROR`

export const GET_EVENTS_REQUEST = `${prefix}/GET_EVENTS_REQUEST`
export const GET_EVENTS_START = `${prefix}/GET_EVENTS_START`
export const GET_EVENTS_SUCCESS = `${prefix}/GET_EVENTS_SUCCESS`
export const GET_EVENTS_ERROR = `${prefix}/GET_EVENTS_ERROR`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new List([]),
  loading: false,
  error: null
})


export default function reducer(state = new ReducerState(), action) {
  const {type, payload} = action

  switch (type) {
    case ADD_EVENTS_START:
      return state
        .set('error', null)
        .set('loading', true)

    case GET_EVENTS_SUCCESS:
      return state
        .update('entities', entities => entities.push(Object.values(payload.events)))
        .set('loading', false)

    case ADD_EVENTS_ERROR:
    case GET_EVENTS_ERROR:
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
export const eventsSelector = createSelector(stateSelector, state => state.entities)
export const loaderSelector = createSelector(stateSelector, state => state.loading)

/**
 * Action Creators
 * */

export function saveEventsToDb() {
  return {
    type: ADD_EVENTS_REQUEST
  }
}

/**
 * Sagas
 */

export const saveEventsSaga = function * (action) {
  try {
    yield put({
      type: ADD_EVENTS_START
    })
    let events = yield call(getEventsFromFB);

    if(events === null){
      events = yield call(saveEventsToFB)
    }

    yield put({
      type: ADD_EVENTS_SUCCESS,
      payload: { events }
    })
  }catch(error){
    yield put({
      type: ADD_EVENTS_ERROR,
      payload: { error }
    })
  }
}

export const fetchEventsSaga = function * (action){
  try{
    yield put({
      type: GET_EVENTS_START
    })
    const events = yield call(getEventsFromFB)

    yield put({
      type: GET_EVENTS_SUCCESS,
      payload: { events }
    })

  }
  catch(error){
    yield put({
      type: GET_EVENTS_ERROR,
      payload: { error }
    })
  }
}


export const saga = function * () {
  yield all([
    takeEvery(ADD_EVENTS_REQUEST, saveEventsSaga),
    takeEvery(ADD_EVENTS_SUCCESS,fetchEventsSaga)
  ])
}