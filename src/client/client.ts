import { World } from './World';
<<<<<<< HEAD
import { io } from 'socket.io-client';
=======
import { io } from 'socket.io-client'
import { PerspectiveCamera, Vector3 } from 'three';
import { Player } from './objects/Player';
>>>>>>> 9c54026 (added logic for adding a match with players on new connections)

async function main () {
	const socket = io(
		'ws://localhost:3000', { transports: ['websocket'] }
	);

<<<<<<< HEAD
=======
	var camera: PerspectiveCamera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);


	socket.on("pos", (p) => {
		camera.position.set(p.x, p.y, p.z);
	})

>>>>>>> 9c54026 (added logic for adding a match with players on new connections)
	const container = document.body;

	const world = new World(container, camera);

	await world.init();

	socket.on('playerPosition', (p) => {
		world.addPlayer(new Player(p));	
	})
	
	world.start();
}

main();
