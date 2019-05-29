// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindows } from '@fortawesome/free-brands-svg-icons';

import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

import styles from './PrismShell.css';

const StyledInput = withStyles({
  root: {
    border: 0,
    position: "relative",
    top: "-3px",
    color: "#a097a9",
    width: "60%",
    fontFamily: "monospace",
    fontWeight: "bold",
    whiteSpace: "normal",
  },
})(Input);

export default class PrismShell extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      order: 'asc',
      orderBy: 'calories',
      selected: [],
      history: [],
      commands: [],
      agent: 0,
      command: "",
      page: 0,
      rowsPerPage: 5,
    }
    this.keyPress = this.keyPress.bind(this);
    this.emCreateTask = this.emCreateTask.bind(this);
    this.setSession = this.setSession.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }
  setSession(aid) {
    this.setState({ agent: aid });
  }
  keyPress(e) {
    //var settings = {...this.state.settings}
    //const name = event.target.name
    var cmd = event.target.value
    this.setState({ command: cmd });

    if (this.state.agent === 0) {
      this.setState({agent: this.props.sessions[0].aid})
    }

    if(e.keyCode == 13) {
      console.log('value', e.target.value);
      this.setState({ command: "" });
      // Send command
      this.emCreateTask(e.target.value)

    }
  }
  //Emergence Controls
  emCreateTask(task) {
    //Shell tasks and CMD passthrough
    //var cmd = task._.join(" ");
    var cmd = task;
    var agentid = this.state.agent;

    //If no id user not interacting with session

    fetch('http://' + this.props.settings.emergenceServer + ':29001/api/task', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agentid: agentid.toString(),
        datetime: "now",
        cmd: cmd
      })
    })
  }
  scrollToBottom = () => {
    if (this.props.cmdResponse.length > this.state.page) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      this.setState({page: this.props.cmdResponse.length})
    }
  }
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const options = {
      filterType: 'dropdown',
      viewColumns: false,
      selectableRows: false
    };
    let rows = this.props.sessions.map((session, index) => {
      return [session.name, session.aid, session.ip, session.user, session.user, session.note, session.last];
    });
    //console.log(this.props.cmdResponse)

    return (
      <div className={styles.commandview}>
        <div className={styles.agentpanel}>
          <div className={styles.agentcontainer}>
            {rows.map(function(data, idx) {
              return (
                <div key={idx} className={styles.agentbox} onClick={e => this.setSession(data[1])}>
                  <div className={styles.agentdetails}>
                    <span className={styles.agentname}>ID: {data[1]}</span> <br/>
                    {data[3]}
                  </div>


                  <FontAwesomeIcon className={styles.osfont} icon={faWindows} />
                  <div className={styles.lastb}>{data[6]}</div>
                </div>
              )
            }, this)}

          </div>
        </div>

        <div className={styles.terminterface}>
          <div className={styles.terminalcontainer}>
            <div className={styles.termbox}>
              {this.props.cmdResponse.map(function(data, idx) {
                return <ul key={idx}><li className={styles.cmdprompt}>PRISM ({data.agentid})> {data.aid}<span className={styles.cmdexec}>{data.cmd}</span></li><li><pre>{atob(data.retval)}</pre></li></ul>;
              })}

              <div style={{ float:"left", clear: "both" }}
                   ref={(el) => { this.messagesEnd = el; }}>
              </div>
            </div>
          </div>


          <div className={styles.promptcontainer}>
          <div className={styles.promptbox}>
            <span>
            <span className={styles.prompt}> ({this.state.agent})> </span>
            <StyledInput
              id="c2Server"
              name="c2"
              value={ this.state.command }
              onChange={this.handleChange}
              onKeyDown={this.keyPress}
              InputProps={{
                className: styles.promptinput
              }}
            />
            </span>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
