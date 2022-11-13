import { World } from './World';
import { io } from 'socket.io-client'

async function main () {

	var socket = io(
		'ws://localhost:3000', {transports: ['websocket']}
	);
	
	// const container = document.body;

	// const world = new World(container);

	// await world.init();

	// world.start();
}

main();