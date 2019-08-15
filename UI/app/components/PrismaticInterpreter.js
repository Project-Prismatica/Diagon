// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import $ from 'jquery';

import Terminal from 'terminal-in-react';
import SessionTracker from '../utils/SessionTracker';

import MenuBar from './MenuBar';
import WindowControls from './WindowControls';
import SessionTable from './SessionTable';
import LootTable from './LootTable';
import PrismShell from './PrismShell';

const remote = require('electron').remote;

import { getSettings } from '../renderers/settings-control';
import { getSessions } from '../utils/em-diagon';

import EmergenceSetup from './EmergenceSetup';
import EmergenceCheck from './EmergenceCheck';


type Props = {
  addSession: () => void,
  updateSession: () => void,
  sessions: [],
  results: []
};

export default class PrismaticInterpreter extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
       hideCompleted: false,
       sessionTable: false,
       lootView: false,
       settings: getSettings(),
       agentid: '',
       task: '',
       cmdRet: '',
       oldCmdRet: '',
       cmdResponse: [],
       prompt: 'PRISM> ',
       session: '',
       loot: [],
       tabs: [],
    };
    this.toggleTableView = this.toggleTableView.bind(this)
    this.toggleLootView = this.toggleLootView.bind(this)

  }
  componentDidMount() {
    this.interval = setInterval(() => {
      //UI Checks
      this.setState({
        settings: getSettings()
      })


      fetch('http://' + this.state.settings.emergence.server + '/api/c2', {
        method: 'POST',
        credentials: 'include',
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
        //console.log(data),
        this.setState({cmdRet: data}),
        this.emTaskResponse()
      );
      //Data to Mount
      //Check for new sessions
      fetch('http://' + this.state.settings.emergence.server + '/api/sessions', {
        method: 'POST',
        credentials: 'include',
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
      //console.log(dm)
      const {
        sessions,
        addSession,
        updateSession
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
      } else {
        //Update current sessions
        Object.keys(dm).map(function(key) {
          var elapsedtime = Date.now() - dm[key].last
          updateSession(dm[key].agentid, String(Math.floor(elapsedtime/1000)) + "s")
        });


        //Check for new loot
        fetch('http://' + this.state.settings.emergence.server + '/api/loot', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            collection: "LOOT"
          })
        })
        .then(response => response.json())
        .then(data =>
          this.setState({loot: data})
        );


      }
    }, 1000);
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
  toggleLootView() {
    console.log("test")
    console.log(this.state.lootView)
    if (this.state.lootView == true) {
      this.setState({ lootView: false });
    } else {
      this.setState({ lootView: true });
    }
  }
  //Emergence Controls
  emCreateTask(task) {
    //Shell tasks and CMD passthrough
    //var cmd = task._.join(" ");
    var cmd = task;

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

    fetch('http://' + this.state.settings.emergence.server + '/api/task', {
      method: 'POST',
      credentials: 'include',
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
      if (this.state.oldCmdRet._id != this.state.cmdRet._id) {
        let tmp = this.state.cmdRet
        tmp.retval = atob(this.state.cmdRet.retval)
        this.setState({
          cmdRet: tmp
        });
        //console.log(this.state.cmdRet)
        this.setState({
          oldCmdRet: this.state.cmdRet,
          cmdResponse: [...this.state.cmdResponse, this.state.cmdRet]
        });
        //console.log(cmdcont)
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
        <MenuBar toggleTableView={this.toggleTableView} toggleLootView={this.toggleLootView}/>
        {/* typeof this.state.settings.emergence === 'undefined' ? <EmergenceSetup/> : <EmergenceSetup/> <EmergenceCheck settings={this.state.settings}/> */}
        { typeof this.state.settings.emergence === 'undefined' ? <EmergenceSetup/> : <EmergenceCheck settings={this.state.settings}/> }


        { this.state.sessionTable ? <SessionTable sessions={this.props.sessions} /> : null }
        { this.state.lootView ? <LootTable loot={this.state.loot} settings={this.state.settings} /> : null }


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
            <PrismShell cmdResponse={this.state.cmdResponse} sessions={this.props.sessions} settings={this.state.settings}/>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
