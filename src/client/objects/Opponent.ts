import { BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from 'three';

class Opponent {
  playerMesh: Mesh;
  name: string = 'Player';

  constructor (p: Vector3, private socket: any) {
    this.socket = socket;
    const geometry = new BoxGeometry(1, 4, 1);
    geometry.computeBoundingBox();
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    this.playerMesh = new Mesh(geometry, material);
    this.playerMesh.position.set(p.x, p.y, p.z);
    this.playerMesh.castShadow = true;
  }

  tick () {
    this.socket.on('opponentPosition', (p: Vector3) => {
      this.playerMesh.position.set(p.x, p.y, p.z);
    });
  }
}

export { Opponent };
