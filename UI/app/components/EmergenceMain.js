// @flow
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

import MenuBar from './MenuBar';
import styles from './Home.css';
import { Menu } from '@material-ui/core';

export default class EmergenceMain extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      holder: "test",
    };
  }

  render() {
    return (
        <div>
          <MenuBar/>
        </div>
    );
  }
}
