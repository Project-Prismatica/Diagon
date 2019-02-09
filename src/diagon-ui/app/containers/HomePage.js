// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as CounterActions from '../actions/counter';
import * as SessionActions from '../actions/sessionTracker';
import PrismaticInterpreter from '../components/PrismaticInterpreter';

function mapStateToProps(state) {
  return {
    sessions: state.sessions,
    counter: state.counter
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(SessionActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrismaticInterpreter);
