import React, { Component } from 'react';
import $ from 'jquery';

export async function checkCommunications(server) {
    return new Promise((resolve, reject) => {
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": `http://${server}/hash`,
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
        },
        "processData": false,
        "data": "{\"data\":\"test\"}"
      }

      $.ajax(settings).done((response) => {
        if(typeof response.hash !== 'undefined') {
          resolve(true);
        } else {
          resolve(false);
        }
      }).fail((data) => {
          resolve(false);
      });
    });
}

export async function login(server, username, password) {
  return new Promise((resolve, reject) => {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `http://${server}/login?username=${username}&password=${password}`,
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
      },
      "processData": false,
    }

    $.ajax(settings).done((response) => {
      if(typeof response.status !== 'undefined') {
        if(response.status === "login success") {
          resolve(true);
        } else {
          resolve(false);
        }
      } else {
        resolve(false);
      }
    }).fail((data) => {
        resolve(false);
    });
  });
}

export async function checkSession(server) {
  return new Promise((resolve, reject) => {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `http://${server}/requires-session`,
      "method": "GET",
      "processData": false,
    }

    $.ajax(settings).done((response) => {
      if(typeof response.status !== 'undefined') {
        if(response.status === "you had a valid session!") {
          resolve(true);
        } else {
          resolve(false);
        }
      } else {
        resolve(false);
      }
    }).fail((data) => {
        resolve(false);
    });
  });
}
