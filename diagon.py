import os

print "Generating Gryffindor payload"
print ""
print "Payload Details:"
print "========================================="
print "LHOST: 127.0.0.1"
print "BEACONTIME: 3000ms"
print "Saving payload to engagement directory"

from os.path import expanduser
home = expanduser("~")

prismdir = os.path.join(home, ".prismatica")
payload = os.path.join(prismdir, "Diagon", "gryffindor.js")
template = os.path.join(prismdir, "Diagon", "Arsenal", "templates", "gryffindor.js")


f = open(template, "r")
#print(f.read())

#os.system("copy C:\\Projects\\Prismatica\\Diagon\\Gryffindor\\wsh\\gryffindor.js C:\\Projects\\Prismatica\\gryffindor.js")

print "Saved to: " + payload
print "Complete!"
