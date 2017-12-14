import { takeLatest, put, call } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import { Record, List } from 'immutable';
import { appName } from '../config';

/**
 * Constants
 * */
export const moduleName = 'events';
const prefix = `${appName}/${moduleName}`;

export const EVENTS_REQUEST = `${prefix}/EVENTS_REQUEST`;
export const EVENTS_SUCCESS = `${prefix}/EVENTS_SUCCESS`;
export const EVENTS_ERROR = `${prefix}/EVENTS_ERROR`;

/**
 * Reducer
 * */
export const ReducerState = Record({
  data: new List([]),
  loading: false,
  error: null,
});

export const EventRecord = Record({
  id: null,
  month: null,
  submissionDeadline: null,
  title: null,
  url: null,
  when: null,
  where: null,
});

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action;

  switch (type) {
    case EVENTS_REQUEST:
      return state
        .set('loading', true);

    case EVENTS_SUCCESS:
      return state
        .set('loading', false)
        .update('data', (data) => {
          const formattedData = Object.keys(payload).map(key => (
            new EventRecord({
              id: key,
              ...payload[key],
            })
          ));

          return data.merge(formattedData);
        });

    case EVENTS_ERROR:
      return state
        .set('loading', false)
        .set('error', payload.error);

    default:
      return state;
  }
}

/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName];
export const dataSelector = createSelector(stateSelector, state => state.data);
export const errorSelector = createSelector(stateSelector, state => state.error);
export const loadingSelector = createSelector(stateSelector, state => state.loading);

/**
 * Action Creators
 * */

export function eventsRequest() {
  return {
    type: EVENTS_REQUEST,
  };
}

/**
 * Sagas
 */

export function* eventsSaga() {
  try {
    const response = yield call(fetch, 'https://advreact-386f6.firebaseio.com/events.json');
    const data = yield call([response, 'json']);

    if (!response.ok) throw data;

    yield put({
      type: EVENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: EVENTS_ERROR,
      payload: error,
    });
  }
}

export function* watchEventsSaga() {
  yield takeLatest(EVENTS_REQUEST, eventsSaga);
}
