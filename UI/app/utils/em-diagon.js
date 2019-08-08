import React, { Component } from 'react';
import $ from 'jquery';

export async function getSessions(server) {
  fetch(`http://${server}/api/sessions`, {
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
    console.log(data),
    //this.setState({sessionData: data})
  );
}
