import { World } from './World';

async function main () {
  const container = document.body;

  const world = new World(container);

  await world.init();

  world.start();
}

main();
