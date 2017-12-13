import {call, put, take} from 'redux-saga/effects'
import {
  signInSaga,
  SIGN_IN_REQUEST,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,

  signUpSaga,
  SIGN_UP_REQUEST,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
} from './auth';
import firebase from 'firebase'

describe('auth saga', () => {

  /**
   * Sign in tests
   */

  it('should sign in  person', () => {
    const user = {
      password: '123456',
      email: 'ivanovasvetlana1991@gmail.com'
    }

    const action = {
      type: SIGN_IN_REQUEST,
      payload: { user }
    }

    const generator = signInSaga(action)

    expect(generator.next().value).toEqual(put({
      type: SIGN_IN_START
    }))

    const auth =  firebase.auth()

    expect(JSON.stringify(generator.next().value)).toEqual(JSON.stringify(
      call(
        [auth, auth.createUserWithEmailAndPassword],
        action.payload.email,
        action.payload.password
      )
      )
    )

    expect(generator.next(user).value).toEqual(
      put({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      })
    )

  expect(generator.next().done).toBe(true)

  });

  it('should be error in sign in request', () => {
    const user = {
      password: '1236',
      email: 'ivanovasvetlana1991@gmail.com'
    }

    const action = {
      type: SIGN_IN_REQUEST,
      payload: { user }
    }

    const generator = signInSaga(action)

    expect(generator.next().value).toEqual(put({
      type: SIGN_IN_START
    }))

    const auth =  firebase.auth()

    expect(JSON.stringify(generator.next().value)).toEqual(JSON.stringify(
        call(
          [auth, auth.createUserWithEmailAndPassword],
          action.payload.email,
          action.payload.password
        )
      )
    )

    const error = new Error('something went wrong')

    expect(generator.throw(error).value).toEqual(
      put({
        type: SIGN_IN_ERROR,
        payload: { error }
      })
    )

    expect(generator.next().done).toBe(true)

  });

  /**
   * Sign up tests
   */

  it('should sign up  person', () => {
    const user = {
      password: '123456',
      email: 'ivanovasvetlana1991@gmail.com'
    }

    const action = {
      type: SIGN_UP_REQUEST,
      payload: { user }
    }

    const generator = signUpSaga()

    expect(generator.next().value).toEqual(take(SIGN_UP_REQUEST))

    expect(generator.next(action).value).toEqual(put({
      type: SIGN_UP_START
    }))

    const auth =  firebase.auth()

    expect(JSON.stringify(generator.next().value)).toEqual(JSON.stringify(
        call(
          [auth, auth.createUserWithEmailAndPassword],
          action.payload.email,
          action.payload.password
        )
      )
    )

    expect(generator.next(user).value).toEqual(
      put({
        type: SIGN_UP_SUCCESS,
        payload: { user }
      })
    )

    expect(generator.next().value).toEqual(take(SIGN_UP_REQUEST))

  });

  it('should throw error in sign up ', () => {
    const user = {
      password: '123456',
      email: 'ivanovasvetlana1991@gmail.com'
    }

    const action = {
      type: SIGN_UP_REQUEST,
      payload: { user }
    }

    const generator = signUpSaga()

    expect(generator.next().value).toEqual(take(SIGN_UP_REQUEST))

    expect(generator.next(action).value).toEqual(put({
      type: SIGN_UP_START
    }))

    const auth =  firebase.auth()

    expect(JSON.stringify(generator.next().value)).toEqual(JSON.stringify(
        call(
          [auth, auth.createUserWithEmailAndPassword],
          action.payload.email,
          action.payload.password
        )
      )
    )

    const error = new Error('something went wrong')

    expect(generator.throw(error).value).toEqual(
      put({
        type: SIGN_UP_ERROR,
        payload: { error }
      })
    )

    expect(generator.next().value).toEqual(take(SIGN_UP_REQUEST))

  });

});