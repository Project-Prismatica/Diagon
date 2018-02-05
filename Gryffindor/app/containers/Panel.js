import React, { Component } from 'react';
import Radium, { Style }  from 'radium';
import {StyleRoot} from 'radium';

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getStyles() {
    const bgcolor = {
      default: "#202020"
    }
    return {
      sideBar: {
        position: "absolute",
        zIndex: "2000",
        backgroundColor: "#1e2130",
        color: "#fff",
        width: "50px",
        minHeight: "100%",
        top: "0px",
        right: "0px",
        left: "0px",
        paddingTop: "0px"
      },
      sidebarWidget: {
        position: "relative",
        zIndex: "2012",
        color: "#475070",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontSize: "14px",
        lineHeight: "20px",
        width: "100%",
        minHeight: "50px",
        marginTop: "15px"
      },
      sideIcons: {
        paddingTop: "10px",
        paddingLeft: "10px",
        fontSize: "42px",
        lineHeight: "20px",
        TextDecoration: "none"
      }
    };
  }

  render() {
    const styles = this.getStyles();
    return (
      <div style={[styles.sideBar]}>
        <div style={[styles.sidebarWidget]}>
          <span style={[styles.sideIcons]}>
          Help
          </span>
        </div>
        <div style={[styles.sidebarWidget]}>
          <span style={[styles.sideIcons]}>
          O
          </span>
        </div>
        <div style={[styles.sidebarWidget]}>
          <span style={[styles.sideIcons]}>
          J
          </span>
        </div>
        <div style={[styles.sidebarWidget]}>
          <span style={[styles.sideIcons]}>
          K
          </span>
        </div>
      </div>
    );
  }
}

export default Radium(Panel);
