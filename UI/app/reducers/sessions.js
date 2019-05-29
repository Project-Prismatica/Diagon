import { combineReducers } from 'redux'
import {
  GET_CURRENT_SESSION,
  GET_SESSION_LIST,
  ADD_NEW_SESSION,
  UPDATE_EXISTING_SESSION
} from '../actions/sessionTracker'

export default function sessions(state = [], action) {
  switch (action.type) {
    case ADD_NEW_SESSION:
      return [
        ...state,
        {
          id: action.id,
          aid: action.payload.aid,
          type: action.payload.type,
          name: action.payload.name,
          user: action.payload.user,
          delay: action.payload.delay + "s",
          last: action.payload.last,
          dead: false
        }
        ]
    case UPDATE_EXISTING_SESSION:
      const {aid, last} = action.payload

      return state.map(sessions => {
        if (sessions.aid == action.payload.aid) {
          //console.log(sessions.aid)
          return {...sessions, last: action.payload.last}
        };
        return sessions;
      });

    default:
      return state
  }
}
