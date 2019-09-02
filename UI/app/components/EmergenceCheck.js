// @flow
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

import { checkCommunications, login, checkSession } from '../utils/emergence';
import { updateSettings } from '../renderers/settings-control';
import EmergenceMain from './EmergenceMain';
import styles from './Home.css';

export default class EmergenceCheck extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      testSuccessful: false,
      loginSuccessful: false,
      sessionValid: false,
      server: '',
      port: '',
      username: '',
      password: '',
      open: false
    };
    this.handleChangeServer = this.handleChangeServer.bind(this);
    this.handleChangePort = this.handleChangePort.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.checkSettings();

  }

  handleChangeServer(event) {
    this.setState({server: event.target.value});
  }
  handleChangePort(event) {
    this.setState({port: event.target.value});
  }

  handleChangeUsername(event) {
    this.setState({username:event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password:event.target.value});
  }
  openModal() {
    this.setState({
      open: true
    })
  }

  async handleSubmit(event) {
    if(this.state.testSuccessful === false) {
      //alert(`Testing server: ${this.state.server}:${this.state.port}`);
      let commsStatus = await checkCommunications(`${this.state.server}:${this.state.port}`);
      this.setState({testSuccessful: commsStatus});
    }
    else {
      let loginStatus = await login(`${this.state.server}:${this.state.port}`,this.state.username, this.state.password);
      this.setState({loginSuccessful:loginStatus});
      let sessionStatus = await checkSession(`${this.state.server}:${this.state.port}`);
      this.setState({sessionValid:sessionStatus});
      if(sessionStatus === true) {
        let emergenceSettings = {
          emergence: {
            server: `${this.state.server}:${this.state.port}`,
            credentials: {
              username: this.state.username,
              password: this.state.password,
            }
          }
        }
        updateSettings(emergenceSettings);
      }
    }
    //event.preventDefault();
  }

  async checkSettings() {
    let loginStatus = await login(this.props.settings.emergence.server,this.props.settings.emergence.credentials.username, this.props.settings.emergence.credentials.password);
    this.setState({loginSuccessful:loginStatus});
    let sessionStatus = await checkSession(this.props.settings.emergence.server);
    this.setState({sessionValid:sessionStatus, testSuccessful:sessionStatus});
  }

  render() {
    return (
      <div className={styles.authmodal}>

      { this.state.sessionValid === false ?
        (
            // If we don't have a valid session we need to run through login/configuration logic
            <div className={styles.centeredUserInput}>
              <h1>Emergence Settings</h1>

              { this.state.testSuccessful === false ?
              (
                <div>
                  <p>Step 1/2: Establish Server Connection</p>
                  <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.server} onChange={this.handleChangeServer} placeholder="Server"/>
                    <input type="text" value={this.state.port} onChange={this.handleChangePort} placeholder="Port" />
                    <input type="submit" value="Connect" />
                  </form>
                </div>
              ) :
              (
                <div>
                  <p>Step 2/2: User Login</p>
                  <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.username} onChange={this.handleChangeUsername} placeholder="Username"/>
                    <input type="password" value={this.state.password} onChange={this.handleChangePassword} placeholder="Password" />
                    <input type="submit" value="Login" />
                  </form>
                </div>
              )
              }
            </div>
        ) :
        (
          <div>
          </div>
        )
      }
      </div>
    );
  }
}
