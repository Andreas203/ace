import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Vector3 } from 'three';
import { CharacterController } from '../systems/CharacterController';

class Player {
  camera: PerspectiveCamera;
  controls: CharacterController;
  name: string = 'Player';

  constructor (camera: PerspectiveCamera, private socket: any) {
    this.socket = socket;
    // const geometry = new BoxGeometry(1, 4, 1);
    // geometry.computeBoundingBox();
    // const material = new MeshBasicMaterial({ color: 0x00ff00 });
    // this.playerMesh = new Mesh(geometry, material);
    this.camera = camera
    this.camera.position.set(0, 3, -10);
    // this.playerMesh.castShadow = true;
    this.controls = new CharacterController();
  }

  tick () {

    if (this.controls.keys.forward && this.camera.position.z < 0) {
      this.camera.position.z += 0.1;
    }
    if (this.controls.keys.backward) {
      this.camera.position.z -= 0.1;
    }
    if (this.controls.keys.left) {
      this.camera.position.x += 0.1;
    }
    if (this.controls.keys.right) {
      this.camera.position.x -= 0.1;
    }
    this.socket.emit('updatePosition', this.camera.position);
  }
}

export { Player };
