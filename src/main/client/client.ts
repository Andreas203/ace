import { World } from './World';
import { io } from 'socket.io-client';
import { PerspectiveCamera } from 'three';

async function main () {
  const socket = io(
    'ws://localhost:3000', { transports: ['websocket'] }
  );

  console.log('connected to server');

  const camera: PerspectiveCamera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 3, -5);
  const container = document.body;

  const world = new World(container, camera);

  await world.init();

  world.start();

  socket.on('startGame', () => {
    console.log('starting game');
    world.startGame(socket);
  });
}

main();
