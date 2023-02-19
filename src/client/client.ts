import { World } from './World';
import { io } from 'socket.io-client';
import { PerspectiveCamera } from 'three';
import { Player } from './objects/Player';

async function main () {
  const socket = io(
    'ws://localhost:3000', { transports: ['websocket'] }
  );

  const camera: PerspectiveCamera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

  socket.on('pos', (p) => {
    camera.position.set(p.x, p.y, p.z);
  });

  const container = document.body;

  const world = new World(container, camera);

  await world.init();

  socket.on('playerPosition', (p) => {
    console.log('newPlayer connected');
    world.addPlayer(new Player(p));
  });

  world.start();
}

main();
