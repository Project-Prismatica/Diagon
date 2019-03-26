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
import Grid from '@material-ui/core/Grid';

import styles from '../Home.css';

const remote = require('electron').remote;

import updateSettings, { getSettings } from '../../renderers/settings-control';

export default class Settings extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      settings: getSettings(),
      open: true,
    };
    this.doUpdate = this.doUpdate.bind(this)
  }
  doUpdate() {
    updateSettings(this.state.settings);
    this.props.toggleSettings()
  }
  handleChange = event => {
    var settings = {...this.state.settings}
    const name = event.target.name
    settings[name] = event.target.value
    this.setState({ settings });
  };

  render() {
    return (
      <div>
        <Modal
          open={this.state.open}
          onClose={this.props.toggleSettings}
          classNames={{
            modal: styles.settingsmodal
            }}
          center
        >
          <div>
            <h2>Prismatica Settings</h2>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel htmlFor="eServer">Emergence Server</InputLabel>
                  <Input
                    id="eServer"
                    name="emergenceServer"
                    value={ this.state.settings.emergenceServer }
                    onChange={this.handleChange}
                    inputProps={{
                      'aria-label': 'Description',
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel htmlFor="c2Server">C2 Server</InputLabel>
                  <Input
                    id="c2Server"
                    name="c2"
                    defaultValue={ this.state.settings.c2 }
                    onChange={this.handleChange}
                    inputProps={{
                      'aria-label': 'Description',
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <br />
            <br />
            <br />
            <Button variant="contained" color= "primary" component="span" onClick={this.doUpdate.bind(this)}>
              Update
            </Button>

          </div>
        </Modal>
      </div>
    );
  }
}
