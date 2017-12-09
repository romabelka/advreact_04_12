import {appName} from '../config';
import {Record} from 'immutable';
import firebase from 'firebase';

/**
 * Constants
 * */
export const moduleName = 'user';
const prefix = `${appName}/${moduleName}`;

export const ADD_USER_START = `${prefix}/ADD_USER_START`;
export const ADD_USER_SUCCESS = `${prefix}/ADD_USER_SUCCESS`;

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
        case ADD_USER_START:
            return state.set('loading', true)

        case ADD_USER_SUCCESS:
            return state
                .set('loading', false)
                .set('user', payload.user)
        default:
            return state
    }
}

/**
 * Selectors
 * */

export const userSelector = state => state[moduleName].user

/**
 * Action Creators
 * */

export function addUser(firstName, lastName, email) {
    return (dispatch) => {
        dispatch({
            type: ADD_USER_START
        })

        console.log('addUser', firstName, lastName, email);
    }
}