// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Modal from 'react-responsive-modal';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';


const remote = require('electron').remote;

//import payloadGenerator from '../renderers/backdoor-factory';

export default class Settings extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      open: true,
    };
  }
  closeSettings() {
    this.setState({ open: false });
  }
  render() {
    return (
      <div>
        <Modal
          open={this.state.open}
          onClose={this.closeSettings.bind(this)}
          center
        >
          <div>
            <h2>Backdoor Factory</h2>
            <FormControl>

            </FormControl>
          </div>
        </Modal>
      </div>
    );
  }
}
