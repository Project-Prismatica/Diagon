const { ipcRenderer, remote } = require('electron');
const { exec } = require('child_process');
var fs = require('fs');
var path = require('path');

const { validateStore } = require('./validate-store');

const homedir = require('os').homedir();
var prismdir = path.join(homedir, '.prismatica')
var diagondir = path.join(prismdir, 'Diagon')

export default function emcInstall() {
  console.log("Building EMC-Diagon-Oculus Dependencies")

}
