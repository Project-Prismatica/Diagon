// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './Home.css';

type Props = {
  increment: () => void,
  incrementIfOdd: () => void,
  incrementAsync: () => void,
  decrement: () => void,
  counter: number
};

export default class PageTemplate extends Component<Props> {
  props: Props;

  render() {
    const {
      increment,
      incrementIfOdd,
      incrementAsync,
      decrement,
      counter
    } = this.props;
    return (
      <div className={styles.menucontainer}>
        settings
      </div>
    );
  }
}
