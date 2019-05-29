// @flow
import type { GetState, Dispatch } from '../reducers/types';

export const GET_CURRENT_SESSION = 'GET_CURRENT_SESSION';
export const GET_SESSION_LIST = 'GET_SESSION_LIST';
export const ADD_NEW_SESSION = 'ADD_NEW_SESSION';
export const UPDATE_EXISTING_SESSION = 'UPDATE_EXISTING_SESSION';

let nextSessionId = 0
export const addSession = payload => ({
  type: 'ADD_NEW_SESSION',
  id: nextSessionId++,
  payload
})

export const updateSession = (aid, last) => ({
  type: 'UPDATE_EXISTING_SESSION',
  payload: {
    aid,
    last
  }
})

export function session() {
  return (dispatch: Dispatch, getState: GetState) => {
    const { counter } = getState();
    type: GET_CURRENT_SESSION,
    text
  };
}

export function getSession() {
  return { type: GET_CURRENT_SESSION, text }
}

export function getSessionList() {
  return { type: GET_SESSION_LIST }
}
