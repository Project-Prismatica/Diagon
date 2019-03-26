// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './Home.css';

const remote = require('electron').remote;
const {BrowserWindow} = require('electron').remote

//const ElectronTitlebarWindows = require('electron-titlebar-windows');

type Props = {
  increment: () => void,
  incrementIfOdd: () => void,
  incrementAsync: () => void,
  decrement: () => void,
  counter: number
};

export default class WindowControls extends Component<Props> {
  props: Props;

  windowMaximize() {
    var window = BrowserWindow.getFocusedWindow();
    if(window.isMaximized()) {
        window.unmaximize();
    } else{
        window.maximize();
    }
  }
  windowMinimize() {
    var window = BrowserWindow.getFocusedWindow();
    window.minimize();
  }
  windowClose() {
    var window = BrowserWindow.getFocusedWindow();
    window.close();
  }

  render() {
    const {
      increment,
      incrementIfOdd,
      incrementAsync,
      decrement,
      counter
    } = this.props;
    return (
      <div>
        <div className="dragbar">Prismatica | Diagon UI</div>
        <div id="title-bar-btns" className={styles.windowcontrols}>
          <div className={styles.windowClose} id="close-btn" onClick={this.windowClose.bind(this)}>
            <svg x="0px" y="0px" viewBox="0 0 10 10">
              <polygon fill="rgba(255, 255, 255, 1)" points="10,1 9,0 5,4 1,0 0,1 4,5 0,9 1,10 5,6 9,10 10,9 6,5"></polygon>
            </svg>
          </div>
          <div className={styles.windowMax} id="max-btn" onClick={this.windowMaximize.bind(this)}>
            <svg class="fullscreen-svg" x="0px" y="0px" viewBox="0 0 10 10">
                <path fill="rgba(255, 255, 255, 1)" d="M 0 0 L 0 10 L 10 10 L 10 0 L 0 0 z M 1 1 L 9 1 L 9 9 L 1 9 L 1 1 z "/>
            </svg>
          </div>
          <div className={styles.windowMin} id="min-btn" onClick={this.windowMinimize.bind(this)}>
            <svg x="0px" y="0px" viewBox="0 0 10 1">
                <rect fill="rgba(255, 255, 255, 1)" width="10" height="1"></rect>
            </svg>
          </div>
        </div>
      </div>
    );
  }
}
