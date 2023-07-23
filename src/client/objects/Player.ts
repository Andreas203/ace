import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three';
import { CharacterController } from '../systems/CharacterController';

class Player {
  playerMesh: Mesh;
  controls: CharacterController;
  name: string = 'Player';

  constructor (p: Vector3, private socket: any) {
    this.socket = socket;
    const geometry = new BoxGeometry(1, 4, 1);
    geometry.computeBoundingBox();
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    this.playerMesh = new Mesh(geometry, material);
    this.playerMesh.position.set(p.x, p.y, p.z);
    this.playerMesh.castShadow = true;
    this.controls = new CharacterController();
  }

  tick () {
    if (this.controls.keys.forward) {
      this.playerMesh.position.z -= 0.1;
    }
    if (this.controls.keys.backward) {
      this.playerMesh.position.z += 0.1;
    }
    if (this.controls.keys.left) {
      this.playerMesh.position.x -= 0.1;
    }
    if (this.controls.keys.right) {
      this.playerMesh.position.x += 0.1;
    }
    this.socket.emit('updatePosition', this.playerMesh.position);
  }
}

export { Player };
