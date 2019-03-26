const { ipcRenderer, remote } = require('electron');
const { exec } = require('child_process');
var fs = require('fs');
var path = require('path');
const https = require('https');
const homedir = require('os').homedir();
var prismdir = path.join(homedir, '.prismatica')
var diagondir = path.join(prismdir, 'Diagon')

export default function payloadGenerator(payload) {

  if (!fs.existsSync(prismdir)) {
    fs.mkdirSync(prismdir);
    fs.writeFile(settingsconf, '{"test":"tmp"}');
  }
  if (!fs.existsSync(diagondir)) {
    fs.mkdirSync(diagondir);
    var arsenal = path.join(diagondir, 'Arsenal')
    var templates = path.join(arsenal, 'templates')
    fs.mkdirSync(arsenal);
    fs.mkdirSync(templates);

    //Get diagon.py
    var file0 = fs.createWriteStream(path.join(diagondir, 'diagon.py'));
    var request = https.get("https://raw.githubusercontent.com/Project-Prismatica/Diagon/master/diagon.py", function(response) {
      response.pipe(file0);
    });

    //Get gryffindor config
    var file = fs.createWriteStream(path.join(arsenal, 'gryffindor.json'));
    var request = https.get("https://raw.githubusercontent.com/Project-Prismatica/Diagon/master/Arsenal/Gryffindor.json", function(response) {
      response.pipe(file);
    });

    //Get gryffindor template
    var file2 = fs.createWriteStream(path.join(templates, 'gryffindor.js'));
    var request = https.get("https://raw.githubusercontent.com/Project-Prismatica/Diagon/master/Arsenal/templates/gryffindor.js", function(response) {
      response.pipe(file2);
    });

    }

  //Get payload build conf
  fs.readFile(path.join(diagondir, 'Arsenal', 'gryffindor.json'), 'utf8', function(err, contents) {
  //Exec all build commands
  Object.entries(JSON.parse(contents).buildcmds).forEach(entry => {
    let key = entry[0];
    let value = entry[1];
    var command = ""
    for (var i = 0; i < value.cmd.length; i++) {
      if (value.cmd[i] == "path") {
        i++
        var filepath = path.join(diagondir, value.cmd[i])
        command = command + ' "' + filepath + '"'
      } else if (i == 0) {
        command = value.cmd[i]
      } else {
        command = command + " " + value.cmd[i]
      }
    }
    command = command + " " + payload.listener

    exec(command, (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        return;
      }

      // the *entire* stdout and stderr (buffered)
      console.log(`${stdout}`);
      console.log(`${stderr}`);
    });
  });
  });
}
