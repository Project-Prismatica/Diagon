import React, { Component } from 'react';
import { PluginBase } from 'terminal-in-react';

export default class SessionTracker extends PluginBase {
    static displayName = 'PRISM-SessionTracker';
    static version = '1.0.0';
    static defaultData = '';

    static descriptions = {};
    static shortcuts = {};

    constructor(api, config) {
      super(api, config);
      this.api = api;
      this.config = config;
      this.commands = {
        echo: this.runEcho(),
        interact: this.enterSession(),
        exit: this.exitSessions(),
      };
      this.descriptions = {};
      this.shortcuts = {};

      this.updateApi = newApi => (this.api = newApi);
      this.getPublicMethods = () => ({});
      this.readStdOut = () => true;

      this.state = {
        sessions: config.sessions
      }
      //this.api.printLine(config);

    }


    runEcho() {
      return {
        method: (args) => {
          if (args._.length > 0) {
            if (args._.indexOf('>>') > -1) {
              const split = args._.join(' ').split(' >> ');
              const path = this.parsePath(split[1]);
              this.writeToFile(path, split[0], { flag: 'a' });
            } else {
              this.api.printLine(args._.join(' '));
            }
          }
        },
      };
    }

    listSessions(config) {
      return {
        method: (args) => {
          this.api.printLine(config);
        },
      };
    }

    enterSession() {
      return {
        method: (args) => {
          if (args._.length > 0) {
              if (args._.join(' ') == "exit" || args._.join(' ') == "back") {
                this.api.setPromptPrefix("");
              } else {
                this.api.setPromptPrefix("(" + args._.join(' ') + ") ");
                var retrievedData = localStorage.getItem("test");
                localStorage.setItem("currentSession", args._.join(' '));
              }
          }
        },
      };
    }
    exitSessions() {
      return {
        method: (args) => {
          this.api.setPromptPrefix("");
        },
      };
    }
}
