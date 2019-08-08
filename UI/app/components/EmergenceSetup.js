// @flow
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner';

import { checkCommunications, login, checkSession } from '../utils/emergence';
import { updateSettings } from '../renderers/settings-control';
import EmergenceMain from './EmergenceMain';
import styles from './Home.css';
import { red } from '@material-ui/core/colors';

import Button from '@material-ui/core/Button';

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default class EmergenceSetup extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      testSuccessful: false,
      loginSuccessful: false,
      sessionValid: false,
      notServerCheckFailed: true,
      notLoginCheckFailed: true,
      server: '127.0.0.1',
      port: '29001',
      username: 'admin',
      password: '',
      open: false,
      installing: false
    };
    if (this.state.sessionValid == false) {
      this.setState({open: true});
    }

    this.handleChangeServer = this.handleChangeServer.bind(this);
    this.handleChangePort = this.handleChangePort.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.autoInstall = this.autoInstall.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
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

  autoInstall() {
    console.log("Installing Emergence & Oculus to the local system")
    this.setState({installing: true});
    sleep(5000).then(() => {
      this.setState({installing: false});
    })

  }

  async handleSubmit(event) {
    if(this.state.testSuccessful === false) {
      //alert(`Testing server: ${this.state.server}:${this.state.port}`);
      let commsStatus = await checkCommunications(`${this.state.server}:${this.state.port}`);
      this.setState({notServerCheckFailed: commsStatus});
      this.setState({testSuccessful: commsStatus});
    }
    else {
      let loginStatus = await login(`${this.state.server}:${this.state.port}`,this.state.username, this.state.password);
      this.setState({notLoginCheckFailed:loginStatus});
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
        this.setState({open: false});
      }
      console.log(this.state);
    }
    //event.preventDefault();
  }

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
      { this.state.sessionValid === false && this.state.installing === false ?
        (
            // If we don't have a valid session we need to run through login/configuration logic
            <div className={styles.centeredUserInput}>
              <h1>Getting Started</h1>
              { this.state.testSuccessful === false ?
              (
                <div>
                  <p>Step 1/2: Establish Emergence Server Connection</p>
                  <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.server} onChange={this.handleChangeServer} placeholder="Server"/>
                    <input type="text" value={this.state.port} onChange={this.handleChangePort} placeholder="Port" />
                    <input type="submit" value="Connect" />
                  </form>
                  <p hidden={this.state.notServerCheckFailed} style={{color:red}}>Server Cannot be Reached:<br></br> Please validate your server information and resubmit</p>
                  <br />
                  <p>No Emergence Server? Would you like to install one automatically?</p>
                  <center><Button variant="contained" color= "primary" component="span" onClick={this.autoInstall.bind(this)}>Install</Button></center>

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
                  <p hidden={this.state.notLoginCheckFailed} style={{color:red}}>Authentication Failed:<br></br> Please doublecheck your username and password then try again</p>
                </div>
              )
              }
            </div>
        ) :
        (
          <div>
          { this.state.installing === true ?
            (
              <div>
                <h1>Installing Prismatic Components</h1>

                <div id="loaderBox" />
                <Loader
                  className="loader"
                  type="Grid"
                  color="#414a9c"
                  height="100"
                  width="100"
                />


                <p><span className={styles.successicon}><FontAwesomeIcon data-tip="Table View" onClick={this.props.toggleTableView} icon={faCheckCircle} /></span> Emergence Fabric API</p>
                <p><span className={styles.successicon}><FontAwesomeIcon data-tip="Table View" onClick={this.props.toggleTableView} icon={faCheckCircle} /></span> Oculus Malleable C2 Server</p>
              </div>
            ) :
            (
              <div>
              </div>
            )
          }
          </div>
        )
      }
      </Modal>
      </div>
    );
  }
}
