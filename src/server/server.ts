import THREE, { Vector3 } from "three";
import { ConnectedPlayer } from "./ConnectedPlayer";
import { Match } from "./Match";

const http = require('http')
const server = http.createServer();
const port = 3000;

const io = require('socket.io')(server,
  {
    cors: {
      origin: '*'
    }
  }
);

let players: number = 0;
let room: number = 0;

//TODO: Make rooms limited
//let rooms: number [] = new Array(10).fill(0);

let activeMatches: Match[] = []
activeMatches.push(new Match());

io.on('connection', (socket: any) => {

    if(players % 2 == 0 && players != 0){
        room += 1;
        activeMatches.push(new Match());
    }

    socket.join(room);

    activeMatches[room].addNewPlayer(new ConnectedPlayer(socket));

    players += 1;
    

    console.log(`Player ${socket.id} connected to room ${room}`)
    socket.emit('pos', (new Vector3(1,1,1), new Vector3(20,20,0)))
    
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
