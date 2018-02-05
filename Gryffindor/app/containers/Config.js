import React, { Component } from 'react';
import Radium from 'radium';

class Config extends Component {
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
        width: "100%"
      }
    };
  }

  render() {
    const styles = this.getStyles();
    return (
        <div className="container">
          config
        </div>
    );
  }
}

export default Radium(Config);
