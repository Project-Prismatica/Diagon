// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import sessions from './sessions';

const rootReducer = combineReducers({
  counter,
  sessions,
  router
});

export default rootReducer;
