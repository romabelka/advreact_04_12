//import {all} from 'redux-saga/effects'
import {appName} from '../config'
import {Record, List} from 'immutable'
import {reset} from 'redux-form'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`

export const ADD_PERSON = `${prefix}/ADD_PERSON`


/**
 * Reducer
 * */
export const PersonRecord = Record({
  firstName: null,
  lastName: null,
  email: null,
})

export default function reducer(state = new List(), action) {
  const { type, payload } = action

  switch (type) {
  case ADD_PERSON: {
    const { firstName, lastName, email } = payload
    return state.push(new PersonRecord({firstName, lastName, email}))
  }


  default:
    return state
  }
}

/**
 * Selectors
 * */

/**
 * Action Creators
 * */

export function addPerson(firstName, lastName, email) {
  return (dispatch) => {
    dispatch({
      type: ADD_PERSON,
      payload: {firstName, lastName, email}
    })

    dispatch(reset('people'))
  }
}

/**
 * Sagas
 * */

//export function* saga() {
//   yield all([
//
//   ])
//}