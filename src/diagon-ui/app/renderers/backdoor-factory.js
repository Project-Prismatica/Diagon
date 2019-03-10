const { ipcRenderer, remote } = require('electron');
const { exec } = require('child_process');
var fs = require('fs');


export default function payloadGenerator(payload) {

  //Get payload build conf
  fs.readFile('C:\\Projects\\Prismatica\\Diagon\\Arsenal\\' + payload + '.json', 'utf8', function(err, contents) {


  //Exec all build commands
  Object.entries(JSON.parse(contents).buildcmds).forEach(entry => {
    let key = entry[0];
    let value = entry[1];

    exec(value.cmd, (err, stdout, stderr) => {
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
