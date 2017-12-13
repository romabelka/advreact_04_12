import { take, put, call, apply } from 'redux-saga/effects';
import firebase from 'firebase';
import {
  signUpSaga,
  signInSaga,
  SIGN_UP_REQUEST,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
} from './auth';

const action = {
  type: SIGN_UP_REQUEST,
  payload: {
    email: 'test@email.com',
    password: '8888888',
  },
};

const { email, password } = action.payload;

const auth = firebase.auth();

const user = {
  userData: 'data',
};

const error = new Error('Something went wrong');

describe('signUpSaga saga', () => {
  test('signup has done successfully', () => {
    const generator = signUpSaga();

    expect(generator.next().value)
      .toEqual(take(SIGN_UP_REQUEST));

    expect(generator.next(action).value)
      .toEqual(put({ type: SIGN_UP_START }));

    expect(generator.next().value)
      .toEqual(call([auth, auth.createUserWithEmailAndPassword], email, password));

    expect(generator.next(user).value)
      .toEqual(put({
        type: SIGN_UP_SUCCESS,
        payload: { user },
      }));

    expect(generator.next().done).toBe(false);
  });

  test('signup has done unsuccessfully', () => {
    const generator = signUpSaga();

    expect(generator.next().value)
      .toEqual(take(SIGN_UP_REQUEST));

    expect(generator.next(action).value)
      .toEqual(put({ type: SIGN_UP_START }));

    expect(generator.next().value)
      .toEqual(call([auth, auth.createUserWithEmailAndPassword], email, password));

    expect(generator.throw(error).value)
      .toEqual(put({
        type: SIGN_UP_ERROR,
        payload: { error },
      }));

    expect(generator.next().done).toBe(false);
  });
});

describe('signInSaga saga', () => {
  test('signin has done successfully, ', () => {
    const generator = signInSaga(action);

    expect(generator.next().value)
      .toEqual(put({ type: SIGN_IN_START }));

    expect(generator.next().value)
      .toEqual(apply(auth, auth.signInWithEmailAndPassword, [email, password]));

    expect(generator.next(user).value)
      .toEqual(put({
        type: SIGN_IN_SUCCESS,
        payload: { user },
      }));

    expect(generator.next().done).toBe(true);
  });

  test('signin has done unsuccessfully, ', () => {
    const generator = signInSaga(action);

    expect(generator.next().value)
      .toEqual(put({ type: SIGN_IN_START }));

    expect(generator.next().value)
      .toEqual(apply(auth, auth.signInWithEmailAndPassword, [email, password]));

    expect(generator.throw(error).value)
      .toEqual(put({
        type: SIGN_IN_ERROR,
        payload: { error },
      }));

    expect(generator.next().done).toBe(true);
  });
});
