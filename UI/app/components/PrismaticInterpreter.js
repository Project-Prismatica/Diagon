// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';

import Terminal from 'terminal-in-react';
import SessionTracker from '../utils/SessionTracker';

import MenuBar from './MenuBar';
import WindowControls from './WindowControls';
import SessionTable from './SessionTable';

const remote = require('electron').remote;

import { getSettings } from '../renderers/settings-control';



type Props = {
  addSession: () => void,
  sessions: []
};

export default class PrismaticInterpreter extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
       hideCompleted: false,
       sessionTable: false,
       settings: getSettings(),
       agentid: '',
       task: '',
       cmdRet: '',
       oldCmdRet: '',
       prompt: 'PRISM> ',
       session: '',
       tabs: []
    };
    this.toggleTableView = this.toggleTableView.bind(this)
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      fetch('http://' + this.state.settings.emergenceServer + ':29001/api/c2', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collection: "C2"
        })
      })
      .then(response => response.json())
      .then(data =>
        this.setState({cmdRet: data}),
        this.emTaskResponse()
      );
      //Data to Mount
      //Check for new sessions
      fetch('http://' + this.state.settings.emergenceServer + ':29001/api/sessions', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          collection: "SESSIONS"
        })
      })
      .then(response => response.json())
      .then(data =>
        this.setState({sessionData: data})
      );
      var dm = this.state.sessionData;
      const {
        sessions,
        addSession
      } = this.props;

      if (Object.keys(sessions).length < Object.keys(dm).length) {
        Object.keys(dm).map(function(key) {
          //console.log(key)
          //console.log(Object.keys(sessions).length)
          if (key >= Object.keys(sessions).length) {
            addSession({
                aid: dm[key].agentid,
                type: dm[key].type,
                name: "",
                user: dm[key].user,
                delay: dm[key].delay,
                last: dm[key].last
            })
          }
        });
      }
    }, 2000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  toggleTableView() {
    if (this.state.sessionTable == true) {
      this.setState({ sessionTable: false });
    } else {
      this.setState({ sessionTable: true });
    }
  }
  //Emergence Controls
  emCreateTask(task) {
    //Shell tasks and CMD passthrough
    var cmd = task._.join(" ");

    //Get Session ID from localStorage
    var sid = localStorage.getItem("currentSession")

    //Match SID to AID
    var agentid = ''
    let data = this.props.sessions
    var sessionDetails = Object.keys(data).map(function(key) {
        if (data[key].id == sid) {
          agentid = data[key].aid
          //console.log(data[key].aid)
        }
    });
    //If no id user not interacting with session

    fetch('http://' + this.state.settings.emergenceServer + ':29001/api/task', {
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

  emTaskResponse() {
    try {
      if (this.state.oldCmdRet.retval != this.state.cmdRet.retval) {
        console.log(atob(this.state.cmdRet.retval));
        this.setState({
          oldCmdRet: this.state.cmdRet
        });
      }
    } catch(e) {
      let tmptmp = 0;
    }
  }
  listSessions() {

    let data = this.props.sessions

    console.log("Active Sessions:")
    console.log("================")
    console.log("Id   Type               Name          User Context        Delay  Last Seen")
    console.log("--   ----               ----          ------------        -----  ---------")

    var activeSessions = 0;
    var sessionDetails = Object.keys(data).map(function(key) {
      var sessionInfo = ''
      if (data[key].id != null) {sessionInfo += data[key].id.toString().padEnd(5, " ")} else {sessionInfo += "     "}
      if (data[key].type != null) {sessionInfo += data[key].type.toString().padEnd(19, " ")} else {sessionInfo += "                   "}
      if (data[key].name != null) {sessionInfo += data[key].name.toString().padEnd(14, " ")} else {sessionInfo += "             "}
      if (data[key].user != null) {sessionInfo += data[key].user.toString().padEnd(20, " ")} else {sessionInfo += "                   "}
      if (data[key].delay != null) {sessionInfo += data[key].delay.toString().padEnd(7, " ")} else {sessionInfo += "       "}
      if (data[key].last != null) {sessionInfo += data[key].last.toString().padEnd(10, " ")} else {sessionInfo += "          "}

      console.log(sessionInfo);
      activeSessions++;
      //return [Number(key), data[key].id, data[key].dead];
    });

    console.log("")
    console.log("There are " + activeSessions + " active agents")

    return sessionDetails
  }

  handleChange() {
    console.log("here")
  }



  render() {
    const {
      sessions,
      addSession
    } = this.props;
    return (
      <div className={styles.basecontainer}>

        <WindowControls />
        <MenuBar toggleTableView={this.toggleTableView}/>
        { this.state.sessionTable ? <SessionTable sessions={this.props.sessions} /> : null }

        <div className={styles.container} data-tid="container">
        <div className={styles.termcontainer}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw"
          }}
          >
            <Terminal
             plugins={[
               {
                 class: SessionTracker,
                 config: {
                   sessions: sessions
                 }
               }
             ]}
             color='green'
             value="ttt"
             onChange={this.handleChange}
             promptSymbol={this.state.prompt}
             backgroundColor='black'
             barColor='black'
             startState='maximised'
             style={{ fontWeight: "bold", fontSize: "1em", width: "100%" }}
             actionHandlers={{
                handleClose: (toggleClose) => {
                  // do something on close
                  toggleClose();
                },
                handleMaximise: (toggleMaximise) => {
                  // do something on maximise
                  toggleMaximise();
                }
             }}
             commands={{
                sessions: {
                  method: (args, print, runCommand) => {
                    let ret = this.listSessions()
                    //print(ret)


                  }
                },
                shell: {
                  method: (args, print, runCommand) => {
                    this.setState({
                       task: args._[0],
                       agentid: this.state.session
                    });
                    this.emCreateTask(args);
                  }
                },
                interact: {
                  method: (args, print, runCommand) => {
                    this.setState({
                       prompt: "PROMPT(" + args._[0].toString() + ") > ",
                       session: args._[0]
                    });
                  }
                }
             }}
             descriptions={{
                'open-google': 'opens google.com',
                sessions: 'list all active sessions',
                shell: 'run a shell command on the current session',
                interact: 'interact with a given session id'
             }}
             watchConsoleLogging
             setPromptPrefix='true'
             allowTabs="false"
            />
          </div>
          </div>
        </div>
      </div>
    );
  }
}
