import {apply, take, call, put} from 'redux-saga/effects'
import {
    signInSaga,
    signUpSaga,
    signUp,
    SIGN_IN_REQUEST,
    SIGN_IN_START,
    SIGN_IN_SUCCESS,
    SIGN_UP_REQUEST,
    SIGN_UP_START,
    SIGN_UP_SUCCESS
} from './auth'
import firebase from 'firebase'

const email = 'veresku@gmail.com'
const password = 'qweasd'
const auth = firebase.auth()
const user = {id: '123', email: email}

describe('sign in saga', () => {
    it('should sing in', () => {
        const action = {
            type: SIGN_IN_REQUEST,
            payload: {email, password}
        }

        const generator = signInSaga(action)

        expect(generator.next().value).toEqual(put({
            type: SIGN_IN_START
        }))

        expect(generator.next().value).toEqual(apply(auth, auth.signInWithEmailAndPassword, [email, password]))

        expect(generator.next(user).value).toEqual(put({
            type: SIGN_IN_SUCCESS,
            payload: {user}
        }))

        expect(generator.next().done).toBe(true)
    });
});

describe('sign up saga', () => {
    it('should sing up', () => {
        const generator = signUpSaga()

        expect(generator.next().value).toEqual(take(SIGN_UP_REQUEST))

        expect(generator.next(signUp(email, password)).value).toEqual(put({type: SIGN_UP_START}))

        expect(generator.next().value).toEqual(call([auth, auth.createUserWithEmailAndPassword], email, password))

        expect(generator.next(user).value).toEqual(put({
            type: SIGN_UP_SUCCESS,
            payload: {user}
        }))
    });
});