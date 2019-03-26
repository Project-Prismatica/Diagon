import { combineReducers } from 'redux'
import {
  GET_CURRENT_SESSION,
  GET_SESSION_LIST,
  ADD_NEW_SESSION
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
    default:
      return state
  }
}
