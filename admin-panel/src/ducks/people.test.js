import {call, put} from 'redux-saga/effects'
import {addPersonSaga, ADD_PERSON, ADD_PERSON_SUCCESS} from './people'
import {reset} from 'redux-form'
import {generateId} from './utils'

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

        expect(generator.next().value).toEqual(call(generateId))

        const uid = generateId()

        expect(generator.next(uid).value).toEqual(put({
            type: ADD_PERSON_SUCCESS,
            payload: {uid, ...person}
        }))

        expect(generator.next().value).toEqual(put(reset('person')))

        expect(generator.next().done).toBe(true)

    });
});