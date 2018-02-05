import React, { Component } from 'react';
import Radium, { Style }  from 'radium';
import {StyleRoot} from 'radium';
import { ipcRenderer } from "electron";
import Search from '../components/Search';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getStyles() {
    const bgcolor = {
      default: "#202020"
    }
    return {
      topNav: {
        position: "absolute",
        zIndex: "2000",
        backgroundColor: "#363b4e",
        color: "#99a2ac",
        height: "50px",
        width: "100%",
        top: "0px",
        right: "0px",
        left: "50px",
        borderBottom: "2px solid ##272c3c"
      },
        navText: {
          position: "relative",
          top: "15px"
        },
      searchCont: {
        position: "relative",
        zIndex: "2012",
        float: "left",
        marginLeft: "20px",
        marginRight: "30px",
        width: "260px",
        minHeight: "50px"
      },
        searchText: {
          position: "relative",
          top: "0px"
        },
      topBtn: {
        position: "relative",
        zIndex: "2012",
        float: "left",
        top: "15px",
        marginRight: "30px",
        width: "35px"
      },
      pnameCont: {
        position: "relative",
        zIndex: "2012",
        float: "right",
        overflow: "hidden",
        marginRight: "30px",
        width: "200px",
        minHeight: "50px",
        maxHeight: "50px"
      },
      settingsCont: {
        position: "relative",
        zIndex: "2012",
        float: "right",
        top: "15px",
        marginRight: "30px",
        width: "90px"
      }
    };
  }

  render() {
    const styles = this.getStyles();
    return (
        <div style={[styles.topNav]}>
          <div style={[styles.searchCont]}>
            <span style={[styles.searchText]}>
              <Search />
            </span>
          </div>
          <div style={[styles.topBtn]}>
            Imp
          </div>
          <div style={[styles.topBtn]}>
            Exp
          </div>
          <div className="close" style={[styles.settingsCont]}>
            S
          </div>
          <div style={[styles.pnameCont]}>
            <span style={[styles.navText]}>
              TGT Target VA
            </span>
          </div>
        </div>
    );
  }
}

export default Radium(Nav);
