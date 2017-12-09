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
export const SIGN_IN_FAILURE = `${prefix}/SIGN_IN_FAILURE`
export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`

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
        case SIGN_IN_FAILURE:
            return state
                .set('loading', false)
                .set('error', payload.error)
        default:
            return state
    }
}

/**
 * Selectors
 * */

export const userSelector = state => state[moduleName].user
export const errorSelector = state => state[moduleName].error
export const loadingSelector = state => state[moduleName].loading

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
                type: SIGN_IN_FAILURE,
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
    }
}

firebase.auth().onAuthStateChanged(user => {
    if (user) window.store.dispatch({
        type: SIGN_IN_SUCCESS,
        payload: { user }
    })
})