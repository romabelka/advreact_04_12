import { call, put, apply, take } from 'redux-saga/effects'
import firebase from 'firebase'
import {
    signUpSaga,
    signInSaga,
    SIGN_UP_REQUEST,
    SIGN_IN_REQUEST,
    SIGN_IN_START,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    SIGN_UP_START,
    SIGN_UP_SUCCESS,
    SIGN_UP_ERROR
} from './auth'

describe('auth saga', () => {
    it('should handle success sign up', () => {
        const action = {
            type: SIGN_UP_REQUEST,
            payload: { email: 'agent', password: '007' }
        }

        const generator = signUpSaga()

        expect(generator.next().value).toEqual(take(SIGN_UP_REQUEST))

        expect(generator.next(action).value).toEqual(
            put({
                type: SIGN_UP_START
            })
        )

        const auth = firebase.auth()

        expect(generator.next().value).toEqual(
            call(
                [auth, auth.createUserWithEmailAndPassword],
                action.payload.email,
                action.payload.password
            )
        )

        const user = { name: 'james', nickname: 'bond' }

        expect(generator.next(user).value).toEqual(
            put({
                type: SIGN_UP_SUCCESS,
                payload: { user }
            })
        )

        expect(generator.next().value).toEqual(take(SIGN_UP_REQUEST))
    })

    it('should handle fail sign up', () => {
        const action = {
            type: SIGN_UP_REQUEST,
            payload: { email: 'agent', password: '007' }
        }

        const generator = signUpSaga()

        expect(generator.next().value).toEqual(take(SIGN_UP_REQUEST))

        expect(generator.next(action).value).toEqual(
            put({
                type: SIGN_UP_START
            })
        )

        const auth = firebase.auth()

        expect(generator.next().value).toEqual(
            call(
                [auth, auth.createUserWithEmailAndPassword],
                action.payload.email,
                action.payload.password
            )
        )

        const error = new Error('BOOOM')

        expect(generator.throw(error).value).toEqual(
            put({
                type: SIGN_UP_ERROR,
                payload: { error }
            })
        )

        expect(generator.next().value).toEqual(take(SIGN_UP_REQUEST))
    })

    it('should handle success sign in', () => {
        const action = {
            type: SIGN_IN_REQUEST,
            payload: { email: 'agent', password: '007' }
        }

        const generator = signInSaga(action)

        expect(generator.next().value).toEqual(
            put({
                type: SIGN_IN_START
            })
        )

        const auth = firebase.auth()

        expect(generator.next().value).toEqual(
            apply(auth, auth.signInWithEmailAndPassword, [
                action.payload.email,
                action.payload.password
            ])
        )

        const user = { name: 'james', nickname: 'bond' }

        expect(generator.next(user).value).toEqual(
            put({
                type: SIGN_IN_SUCCESS,
                payload: { user }
            })
        )

        expect(generator.next().done).toBe(true)
    })

    it('should handle fail sign in', () => {
        const action = {
            type: SIGN_IN_REQUEST,
            payload: { email: 'agent', password: '007' }
        }

        const generator = signInSaga(action)

        expect(generator.next().value).toEqual(
            put({
                type: SIGN_IN_START
            })
        )

        const auth = firebase.auth()

        expect(generator.next().value).toEqual(
            apply(auth, auth.signInWithEmailAndPassword, [
                action.payload.email,
                action.payload.password
            ])
        )

        const error = new Error('BOOOM')

        expect(generator.throw(error).value).toEqual(
            put({
                type: SIGN_IN_ERROR,
                payload: { error }
            })
        )

        expect(generator.next().done).toBe(true)
    })
})
