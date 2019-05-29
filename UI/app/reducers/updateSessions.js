import { combineReducers } from 'redux'
import {
  GET_CURRENT_SESSION,
  GET_SESSION_LIST,
  ADD_NEW_SESSION,
  UPDATE_EXITING_SESSION
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
    case UPDATE_EXITING_SESSION:
      const {aid, last} = action.payload

      // This returns a new array instead of mutating the old one
      return state.map(peep => {
        if (peep.aid === aid) {
          peep.last = last;
        }
        return peep;
      });

    default:
      return state
  }
}
