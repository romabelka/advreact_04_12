import {appName} from '../config'
import {Record} from 'immutable'
import {arrayToMap} from '../helpers'
import {createSelector} from 'reselect'

/**
 * Constants
 * */
export const moduleName = 'users'
const prefix = `${appName}/${moduleName}`

export const ADD_USER_START = `${prefix}/_START`
export const ADD_USER_SUCCESS = `${prefix}/_SUCCESS`

/**
 * Reducer
 * */

const UsersListRecord = Record({
    id : null,
    firstName : null,
    lastName : null,
    email : null,
})

const ReducerRecord = Record({
    entities : arrayToMap([], UsersListRecord),
    loading : false,
    loaded : false,
})

const defaultState = new ReducerRecord();

export default function reducer(state = defaultState, action) {
    const {type, payload} = action

    switch (type) {
        case ADD_USER_START : {
            return state.set('loading', true);
        }
        case ADD_USER_SUCCESS : {
            let {randomId : id, firstName, lastName, email} = payload;
            state = state.set('loading', false);
            return state.setIn(['entities', id], new UsersListRecord({
                id,
                firstName,
                lastName,
                email,
            }))
        }
        default:
            return state
    }
}

/**
 * Selectors
 * */

export const usersMapSelector = state => state[moduleName].entities

export const usersSelector = createSelector(usersMapSelector, usersMap => usersMap.valueSeq().toArray())

export const usersLoadingSelector = state => state[moduleName].loading

/**
 * Action Creators
 * */

export const addUser = (params) => {
    let {firstName, lastName, email} = params;
    return (dispatch) => {
        dispatch({
            type : ADD_USER_START,
        });
        new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 3000)
        }).then(() => {
            dispatch({
                type : ADD_USER_SUCCESS,
                payload : {
                    generateId : true,
                    firstName,
                    lastName,
                    email
                }
            })
        })

    }
}