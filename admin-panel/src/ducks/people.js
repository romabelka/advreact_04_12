import { appName } from "../config";
import { Record } from "immutable";
import firebase from "firebase";

/**
 * Constants
 * */
export const moduleName = "people";
const prefix = `${appName}/${moduleName}`;

export const ADD_PEOPLE_START = `${prefix}/ADD_PEOPLE_START`;
export const ADD_PEOPLE_SUCCESS = `${prefix}/ADD_PEOPLE_SUCCESS`;

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: null,
  loading: false,
  error: null,
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_PEOPLE_START:
      return state.set("loading", true);

    case ADD_PEOPLE_SUCCESS:
      return state.set("loading", false).set("user", payload.user);
    default:
      return state;
  }
}

/**
 * Selectors
 * */


/**
 * Action Creators
 * */

export function addPeople(people) {
  return dispatch => {
    dispatch({
      type: ADD_PEOPLE_START,
    });

    var newPostKey = firebase
      .database()
      .ref()
      .child("people")
      .push().key;

    var updates = {};
    updates["/people/" + newPostKey] = people;

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() =>
        dispatch({
          type: ADD_PEOPLE_SUCCESS
        }),
      );
  };
}

