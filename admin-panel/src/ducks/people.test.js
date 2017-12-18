import {call, put} from 'redux-saga/effects'
import {addPersonSaga, ADD_PERSON, ADD_PERSON_START, ADD_PERSON_SUCCESS} from './people'
import {reset} from 'redux-form'
import firebase from 'firebase'

describe('people saga', () => {
    it('should add person', () => {
        const person = {
            firstName: 'Roman',
            lastName: 'Iakobchuk',
            email: 'r.iakobchuk@javascript.ru'
        }

        const action = {
            type: ADD_PERSON,
            payload: { person }
        }

        const generator = addPersonSaga(action)
        expect(generator.next().value).toEqual(put({
            type: ADD_PERSON_START,
            payload: { ...action.payload.person }
        }))

        const peopleRef = firebase.database().ref('people')

        expect(generator.next().value).toEqual(call([peopleRef, peopleRef.push], action.payload.person))

//        const { key } = yield call([peopleRef, peopleRef.push], action.payload.person)
        const key = '1234'

        expect(generator.next({ key }).value).toEqual(put({
            type: ADD_PERSON_SUCCESS,
            payload: { uid: key , ...action.payload.person }
        }))

        expect(generator.next().value).toEqual(put(reset('person')))

        expect(generator.next().done).toBe(true)

        /*
                expect(generator.next().value).toEqual(call(generateId))

                const uid = generateId()

                expect(generator.next(uid).value).toEqual(put({
                    type: ADD_PERSON_SUCCESS,
                    payload: {uid, ...person}
                }))

                expect(generator.next().value).toEqual(put(reset('person')))

                expect(generator.next().done).toBe(true)
        */

    });
});