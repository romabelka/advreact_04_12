import {appName} from '../config'
import {createSelector} from 'reselect'
import {Record} from 'immutable'
import firebase from 'firebase'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_START = `${prefix}/SIGN_IN_START`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`
export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`

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
            return state
                .set('error', null)
                .set('loading', true)

        case SIGN_IN_SUCCESS:
        case SIGN_UP_SUCCESS:
            return state
                .set('loading', false)
                .set('user', payload.user)

        case SIGN_IN_ERROR:
        case SIGN_UP_ERROR:
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
export const userSelector = createSelector(stateSelector, state => state.user)
export const errorSelector = createSelector(stateSelector, state => state.error)
export const loadingSelector = createSelector(stateSelector, state => state.loading)

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
                type: SIGN_IN_ERROR,
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
                type: SIGN_UP_ERROR,
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