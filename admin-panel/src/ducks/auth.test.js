import firebase from 'firebase'
import reducer, {
    signUpSaga, signInSaga, watchStatusChangeSaga,
    SIGN_UP_REQUEST, SIGN_UP_START, SIGN_UP_SUCCESS, SIGN_UP_ERROR,
    SIGN_IN_REQUEST, SIGN_IN_START, SIGN_IN_SUCCESS, SIGN_IN_ERROR,
    ReducerRecord
} from './auth'
import {take, call, put} from 'redux-saga/effects'
import {replace} from 'react-router-redux'

/**
 * Saga tests
 * */

it('should sign up', () => {
    const saga = signUpSaga()
    const auth = firebase.auth()
    const authData = {
        email: 'lala@example.com',
        password: '12341234'
    }

    const user = {
        email: authData.email,
        uid: Math.random().toString()
    }

    const requestAction = {
        type: SIGN_UP_REQUEST,
        payload: authData
    }

    expect(saga.next().value).toEqual(take(SIGN_UP_REQUEST))

    expect(saga.next(requestAction).value).toEqual(put({type: SIGN_UP_START}))

    expect(saga.next(requestAction).value).toEqual(call(
        [auth, auth.createUserWithEmailAndPassword],
        authData.email, authData.password
    ))

    const error = new Error

    expect(saga.throw(error).value).toEqual(put({
        type: SIGN_UP_ERROR,
        payload: {error}
    }))
})

it('should sign in', () => {
    const auth = firebase.auth()
    const authData = {
        email: 'lala@example.com',
        password: '12341234'
    }

    const user = {
        email: authData.email,
        uid: Math.random().toString()
    }

    const requestAction = {
        type: SIGN_IN_REQUEST,
        payload: authData
    }

    const saga = signInSaga(requestAction)

    expect(saga.next().value).toEqual(put({type: SIGN_IN_START}))

    expect(saga.next().value).toEqual(call(
        [auth, auth.signInWithEmailAndPassword],
        authData.email, authData.password
    ))

    const error = new Error

    expect(saga.throw(error).value).toEqual(put({
        type: SIGN_IN_ERROR,
        payload: {error}
    }))
})

it('should redirect', () => {
    const saga = watchStatusChangeSaga()

    expect(saga.next().value).toEqual(take(SIGN_IN_SUCCESS))

    expect(saga.next().value).toEqual(put(replace('/events')))
})

/**
 * Reducer Tests
 * */

it('should sign in', () => {
    const state = new ReducerRecord()
    const user = {
        email: 'lala@example.com',
        uid: Math.random().toString()
    }

    const newState = reducer(state, {
        type: SIGN_IN_SUCCESS,
        payload: {user}
    })

    expect(newState).toEqual(new ReducerRecord({user}))
})

