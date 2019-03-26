// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndustry, faTerminal, faScroll, faBars, faBug, faKey, faServer, faRadiation, faHeadphones, faTable } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-responsive-modal';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


import styles from './Home.css';

const remote = require('electron').remote;

import Settings from './menus/Settings';
import Listeners from './menus/Listeners';

import payloadGenerator from '../renderers/backdoor-factory';


export default class MenuBar extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      showSettings: false,
      showListeners: false,
      payload: "Gryffindor",
      listener: "",
      loader: false,
    };
    this.toggleSettings = this.toggleSettings.bind(this)
    this.toggleListeners = this.toggleListeners.bind(this)
  }

  toggleSettings() {
    if (this.state.showSettings == true) {
      this.setState({ showSettings: false });
    } else {
      this.setState({ showSettings: true });
    }
  }
  toggleListeners() {
    if (this.state.showListeners == true) {
      this.setState({ showListeners: false });
    } else {
      this.setState({ showListeners: true });
    }
  }
  openBackdoorFactory() {
    this.setState({ open: true });
  }
  closeBackdoorFactory() {
    this.setState({ open: false });
  }
  generatePayload() {
    this.closeBackdoorFactory();
    this.showLoader();

    var settings = {
      "name": "Gryffindor",
      "listener": this.state.listener
    }

    payloadGenerator(settings);
  }
  showLoader() {
    this.setState({ loader: true });
    setTimeout(function() { //Start the timer
      this.setState({loader: false}) //After 1 second, set render to true
    }.bind(this), 3000)
  }

  handleChange = name => event => {
  this.setState({ [name]: event.target.value });
  };

  render() {
    const {
      increment,
      incrementIfOdd,
      incrementAsync,
      decrement,
      counter
    } = this.props;
    const { open } = this.state;
    const payloads = [
      {
        name: "Gryffindor"
      }
    ]
    const Loading = () => {
      return (
        <div>

          <h3 className={styles.terminalText}>Saving payload to engagement directory...</h3>
        </div>
        )
    }
    return (
      <div className={styles.menucontainer}>
        <div className={styles.loader}>
          {this.state.loader ? <Loading /> : null }
        </div>
        <ReactTooltip place="bottom" type="info" effect="solid"/>
        <div className={styles.menugroup}>
          <div className={styles.menuitem}>
            <FontAwesomeIcon data-tip="Table View" onClick={this.props.toggleTableView} icon={faTable} />
          </div>
          <div className={styles.menuitem}>
            <FontAwesomeIcon data-tip="Console View" onClick={this.props.toggleTableView} icon={faTerminal} />
          </div>
          <div className={styles.menuitem}>
            <FontAwesomeIcon data-tip="Configure Listeners" onClick={this.toggleListeners.bind(this)} icon={faHeadphones} />
          </div>
          <div className={styles.menuitem}>
            <FontAwesomeIcon data-tip="Generate Payloads" onClick={this.openBackdoorFactory.bind(this)} icon={faIndustry} />
          </div>
          <div className={styles.menuitem}>
            <FontAwesomeIcon data-tip="Script Console (Coming Soon)" icon={faScroll} />
          </div>
          <div className={styles.menuitem}>
            <FontAwesomeIcon data-tip="Attacks (Coming Soon)" icon={faRadiation} />
          </div>
          <div className={styles.menuitem}>
            <FontAwesomeIcon data-tip="Loot (Coming Soon)" icon={faServer} />
          </div>
          <div className={styles.menuitem}>
            <FontAwesomeIcon data-tip="Credentials (Coming Soon)" icon={faKey} />
          </div>
          <div className={styles.menuitem}>
            <FontAwesomeIcon data-tip="Alerts (Coming Soon)" icon={faBug} />
          </div>
          <div className={styles.menusettings}>
            <FontAwesomeIcon data-tip="Settings" icon={faBars} onClick={this.toggleSettings.bind(this)} />
          </div>
        </div>
        <Modal
          open={open}
          onClose={this.closeBackdoorFactory.bind(this)}
          classNames={{
            modal: styles.customModalContainer,
          }}
          center
        >
          <div className={styles.customModal}>
            <h2>Backdoor Factory</h2>
            <div style={{ padding: 20 }}>
              <Grid container spacing={24}>
                <FormControl>
                  <Grid item xs={24}>
                    <TextField
                      id="standard-select-currency"
                      select
                      label="Payload"
                      value={this.state.payload}
                      className={styles.modalTextField}
                      onChange={this.handleChange('payload')}
                      SelectProps={{
                        native: true,
                        MenuProps: {
                          className: styles.menuSpacing,
                        },
                      }}
                      helperText="Please select your payload"
                      margin="normal"
                    >
                      {payloads.map(option => (
                        <option key={option.name} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                </FormControl>
              </Grid>
              <br />
              <br />
              <Grid container spacing={24}>
                <FormControl className="boxpadding">
                  <Grid item xs={10}>
                    <InputLabel htmlFor="listener">Listener</InputLabel>
                    <Input
                      id="listener"
                      name="listener"
                      defaultValue={this.state.listener}
                      onChange={this.handleChange('listener')}
                      inputProps={{
                        'aria-label': 'Description',
                      }}
                    />
                  </Grid>
                </FormControl>
                <FormControl>
                  <Grid item xs={10}>
                    <InputLabel htmlFor="c2Server">C2 Profile</InputLabel>
                    <Input
                      id="c2Server"
                      name="c2"
                      defaultValue="coming soon"
                      onChange={this.handleChange}
                      inputProps={{
                        'aria-label': 'Description',
                      }}
                    />
                  </Grid>
                </FormControl>
              </Grid>
              <br />
              <br />
            </div>

            <Button variant="contained" color= "primary" component="span" onClick={this.generatePayload.bind(this)}>
              Generate
            </Button>


          </div>
        </Modal>
        {this.state.showSettings ? <Settings toggleSettings={this.toggleSettings} /> : null }
        {this.state.showListeners ? <Listeners toggleListeners={this.toggleListeners} /> : null }
      </div>
    );
  }
}
