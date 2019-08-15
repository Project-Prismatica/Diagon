const { ipcRenderer, remote } = require('electron');
const { exec } = require('child_process');
var fs = require('fs');
var path = require('path');

const homedir = require('os').homedir();
var prismdir = path.join(homedir, '.prismatica')
var diagondir = path.join(prismdir, 'Diagon')

export default function validateStore() {
  if (!fs.existsSync(prismdir)) {
    fs.mkdirSync(prismdir);
    fs.writeFile(settingsconf, '{"homedir": "' + homdir + ' "}');
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
}
