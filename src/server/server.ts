import { Vector3 } from 'three';
import { ConnectedPlayer } from './ConnectedPlayer.ts';
import { Match } from './Match.ts';
import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer();
const port = 3000;

const io = new Server(server,
  {
    cors: {
      origin: '*'
    }
  }
);

let players: number = 0;
let room: number = 0;

// TODO: Make rooms limited
// let rooms: number [] = new Array(10).fill(0);

const activeMatches: Match[] = [];
activeMatches.push(new Match(room));

io.on('connection', (socket: any) => {
  socket.join(room);

  socket.on('updatePosition', (playerPosition: Vector3) => {
    const socketRooms = socket.rooms;
    socketRooms.delete(socket.id);
    socket.in(socketRooms.values().next().value).emit('opponentPosition', playerPosition);
  });

  activeMatches[room].addNewPlayer(new ConnectedPlayer(socket, players % 2 === 0 ? new Vector3(0, 2, 35) : new Vector3(0, 2, -35)));
  players += 1;

  if (players % 2 === 0 && players !== 0) {
    if (activeMatches[room].players.length === 2) {
      console.log('starting game', room);
      socket.in(room).emit('startGame');
      socket.emit('startGame');
    }
    room += 1;
    activeMatches.push(new Match(room));
  }
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
