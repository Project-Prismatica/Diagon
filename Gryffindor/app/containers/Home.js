import React, { Component } from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';
import Dashboard from '../components/Dashboard';
import Search from '../components/Search';
import Results from '../components/Results';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getStyles() {
    const bgcolor = {
      default: "white"
    }
    return {
      landingFooter: {
        position: "absolute",
        bottom: "0",
        left: "0",
        right: "0",
        width: "100%"
      }
    };
  }

  render() {
    const styles = this.getStyles();
    return (
      <StyleRoot>
        <div className="container">
          <Dashboard />
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(Layout);
