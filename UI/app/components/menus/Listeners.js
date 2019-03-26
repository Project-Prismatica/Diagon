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

import { getSettings } from '../../renderers/settings-control';

export default class Listeners extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      settings: getSettings(),
      lport: "80",
      type: "HTTP Listener",
      open: true,
    };
    this.startListener = this.startListener.bind(this)
  }
  startListener() {
    console.log("[+] Starting Oculus Listener")
    fetch('http://' + this.state.settings.emergenceServer + ':29000/api/update', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:  JSON.stringify({
        "component": "oculus",
        "action": {
          "start_listener": {
            "name": "httplistener",
            "type": "http",
            "lport": "80",
            "lhost": "127.0.0.1"
          }
        }
      })
    })
    this.props.toggleListeners()
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
          onClose={this.props.toggleListeners}
          classNames={{
            modal: styles.settingsmodal
            }}
          center
        >
          <div>
            <h2>New Listener (Customizations Coming Soon)</h2>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel htmlFor="eServer">Oculus Server</InputLabel>
                  <Input
                    disabled
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
                  <InputLabel htmlFor="c2Server">Port</InputLabel>
                  <Input
                    disabled
                    id="c2Server"
                    name="c2"
                    defaultValue={ this.state.lport }
                    onChange={this.handleChange}
                    inputProps={{
                      'aria-label': 'Description',
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel htmlFor="c2Server">Type</InputLabel>
                  <Input
                    disabled
                    id="c2Server"
                    name="c2"
                    defaultValue={ this.state.type }
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
            <Button variant="contained" color= "primary" component="span" onClick={this.startListener.bind(this)}>
              Start Listener
            </Button>

          </div>
        </Modal>
      </div>
    );
  }
}
