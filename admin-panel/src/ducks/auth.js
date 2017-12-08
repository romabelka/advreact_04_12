import {appName} from '../config'
import {Record} from 'immutable'
import firebase from 'firebase'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_START = `${prefix}/SIGN_IN_START`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_FAIL = `${prefix}/SIGN_IN_FAIL`
export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_FAIL = `${prefix}/SIGN_UP_FAIL`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    user: null,
    loading: false,
    error: null
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case SIGN_IN_START:
        case SIGN_UP_START:
            return state.set('loading', true)

        case SIGN_IN_SUCCESS:
        case SIGN_UP_SUCCESS:
            return state
                .set('loading', false)
                .set('user', payload.user)
                .set('error', null)

        case SIGN_IN_FAIL:
        case SIGN_UP_FAIL:
            return state
                .set('loading', false)
                .set('error', payload.error)

        default:
            return state
    }
}

export function formReducer(state, action){
    const {type, payload} = action

    // how to block @@redux-form/SET_SUBMIT_SUCCEEDED ?
    // it dispatches after onSubmit call and set submitSucceeded to true
    // https://github.com/erikras/redux-form/issues/2509

      switch (type) {
        case SIGN_IN_START:
        case SIGN_UP_START:
            return {
                ...state,
                error: null,
                submitSucceeded: false,
                submitFailed: false,
                submitting: true
            }

        case SIGN_IN_SUCCESS:
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                error: null,
                submitSucceeded: true,
                submitFailed: false,
                submitting: false
            }

        case SIGN_IN_FAIL:
        case SIGN_UP_FAIL:
          return {
                ...state,
                error: (payload.error && payload.error.message) || null,
                submitSucceeded: false,
                submitFailed: true,
                submitting: false
            }

        default:
          return state
      }
    }

/**
 * Selectors
 * */

export const userSelector = state => state[moduleName].user
export const userLoadingSelector = state => state[moduleName].loading
export const userErrorSelector = state => state[moduleName].erroror

/**
 * Action Creators
 * */

export function signIn(email, password) {
    return (dispatch) => {
        dispatch({
            type: SIGN_IN_START
        })

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => dispatch({
                type: SIGN_IN_SUCCESS,
                payload: { user }
            }))
            .catch(error => dispatch({
                type: SIGN_IN_FAIL,
                payload: { error }
            }))
    }
}

export function signUp(email, password) {
    return (dispatch) => {
        dispatch({
            type: SIGN_UP_START
        })

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => dispatch({
                type: SIGN_UP_SUCCESS,
                payload: { user }
            }))
            .catch(error => dispatch({
                type: SIGN_UP_FAIL,
                payload: { error }
            }))
    }
}

firebase.auth().onAuthStateChanged(user => {
    if (user) window.store.dispatch({
        type: SIGN_IN_SUCCESS,
        payload: { user }
    })
})
