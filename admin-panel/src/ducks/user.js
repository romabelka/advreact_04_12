import {appName} from '../config'
import {Record} from 'immutable'
import firebase from 'firebase'

/**
 * Constants
 * */
export const moduleName = 'user'
const prefix = `${appName}/${moduleName}`

export const ADD_USER_START = `${prefix}/ADD_USER_START`
export const ADD_USER_SUCCESS = `${prefix}/ADD_USER_SUCCESS`
export const ADD_USER_FAIL = `${prefix}/ADD_USER_FAIL`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  //users: null,
  loading: false,
  error: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const {type, payload} = action

  switch (type) {
    case ADD_USER_START:
      return state.set('loading', true)

    case ADD_USER_SUCCESS:
      return state
        .set('loading', false)

    case ADD_USER_FAIL:
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

//export const userListSelector = state => state[moduleName].users
export const userLoaderSelector = state => state[moduleName].loading
export const userErrorSelector =  state => state[moduleName].error

/**
 * Action Creators
 * */

export function addUser(firstName, lastName, email) {
  return (dispatch) => {
    dispatch({
      type: ADD_USER_START
    })

    const db = firebase.database();
    const users = db.ref().child('users');

    users.push({firstName, lastName, email})
      .then(answer => dispatch({
        type: ADD_USER_SUCCESS
      }))
      .catch(error => dispatch({
        type: ADD_USER_FAIL,
        payload: { error }
      }))
  }
}
