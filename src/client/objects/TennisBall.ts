import { Mesh, SphereGeometry, MeshBasicMaterial, Vector3, Box3 } from 'three';
import { Court } from './Court';
import { Player } from './Player';

class TennisBall {
  ballMesh: Mesh;
  court: Court;
  player: Player;
  velocity: Vector3 = new Vector3(0, 0, 0);
  acceleration: Vector3 = new Vector3(0, 0, 0);
  constructor (court: Court, player: Player) {
    const geometry = new SphereGeometry(0.25, 32, 16);
    geometry.computeBoundingBox();
    const material = new MeshBasicMaterial({ color: 0xffff00 });
    this.ballMesh = new Mesh(geometry, material);
    this.ballMesh.position.set(5, 5, 5);
    this.court = court;
    this.player = player;
  }

  updatePosition (p: Vector3) {
    this.ballMesh.position.set(p.x, p.y, p.z);
  }

  calculateFrameVelocity (velocity: Vector3, acceleration: Vector3, time: number) {
    return velocity.add(acceleration.multiplyScalar(time));
  }

  tick () {
    const GRAVITY = 9.8;
    const SECONDS_PER_FRAME = 1 / 60;
    const MASS = 0.58;
    const { ballCollisionBox, courtCollisionBox, playerCollisionBox } = this.collissionBoxes();

    const force = new Vector3(0, -GRAVITY * SECONDS_PER_FRAME, 0.01);
    if (ballCollisionBox.intersectsBox(playerCollisionBox)) {
      force.z += 0.1;
    }

    this.acceleration.add(force.divideScalar(MASS));

    const exitVelocity = this.calculateFrameVelocity(this.velocity, this.acceleration, SECONDS_PER_FRAME);
    this.velocity = exitVelocity;

    if (ballCollisionBox.intersectsBox(courtCollisionBox)) {
      this.velocity.y = (-this.velocity.y * 0.8);
    }
    if (ballCollisionBox.intersectsBox(playerCollisionBox)) {
      this.velocity.z = -this.velocity.z;
    }

    this.ballMesh.position.add(this.velocity);
  }

  collissionBoxes () {
    const ballCollisionBox = new Box3();
    ballCollisionBox.copy(this.ballMesh.geometry.boundingBox || ballCollisionBox).applyMatrix4(this.ballMesh.matrixWorld);

    const courtCollisionBox = new Box3();
    courtCollisionBox.copy(this.court.courtMesh.geometry.boundingBox || ballCollisionBox).applyMatrix4(this.court.courtMesh.matrixWorld);

    const playerCollisionBox = new Box3();

    playerCollisionBox.copy(this.player.playerMesh.geometry.boundingBox || ballCollisionBox).applyMatrix4(this.player.playerMesh.matrixWorld);

    return { ballCollisionBox, courtCollisionBox, playerCollisionBox };
  }
}

export { TennisBall };
