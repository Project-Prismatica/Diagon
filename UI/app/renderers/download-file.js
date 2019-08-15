const { ipcRenderer, remote } = require('electron');
var fs = require('fs');
const https = require('https');
const http = require('http');
const url = require("url");
const path = require("path");


const homedir = require('os').homedir();

export default function downloadFile(location , filesys){
  var file = path.join(homedir, path.basename(url.parse(location).pathname));
  var file0 = fs.createWriteStream(file);
  var request = http.get(location, function(response) {
    response.pipe(file0);
  });
}
