const { ipcRenderer, remote } = require('electron');
const { exec } = require('child_process');
var fs = require('fs');
var path = require('path');
const homedir = require('os').homedir();
var prismdir = path.join(homedir, '.prismatica')
var settingsconf = path.join(homedir, '.prismatica', 'settings.json')

export function updateSettings(newsettings) {

  //console.log(settingsconf)
  //console.log(newsettings)

  if (!fs.existsSync(prismdir)) {
      fs.mkdirSync(prismdir);
      fs.writeFile(settingsconf, '{"emergence": {},"c2":"127.0.0.1"}');
  }

  //Get current configuration
  let curconf = JSON.parse(fs.readFileSync(settingsconf));
  console.log(curconf)

  fs.writeFile(settingsconf, JSON.stringify(newsettings), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("Prismatica configuration updated!");
  });
}

export function getSettings() {

  if (!fs.existsSync(prismdir)) {
      fs.mkdirSync(prismdir);
      fs.writeFile(settingsconf, '{"emergence": {},"c2":"127.0.0.1"}');
  }

  //Get current configuration
  function loadconf() {
    let curconf = JSON.parse(fs.readFileSync(settingsconf));
    return curconf
  }
  try {
    let curconf = JSON.parse(fs.readFileSync(settingsconf));
    return curconf
  } catch(e) {
    let curconf = '{"emergence": {},"c2":"127.0.0.1"}';
    return curconf
  }
}
