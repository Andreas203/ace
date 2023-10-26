import { Mesh, SphereGeometry, MeshBasicMaterial, Vector3, Box3 } from 'three';
import { Court } from './Court';
import { Player } from './Player';

class TennisBall {
  SECONDS_PER_FRAME = 1 / 30;
  GRAVITY = -9.8;
  MASS = 0.58;
  ballMesh: Mesh;
  court: Court;
  player: Player;
  acceleration: Vector3;
  velocity: Vector3;

  constructor (court: Court, player: Player) {
    const geometry = new SphereGeometry(0.25, 32, 16);
    geometry.computeBoundingBox();
    const material = new MeshBasicMaterial({ color: 0xffff00 });
    this.ballMesh = new Mesh(geometry, material);
    this.ballMesh.position.set(5, 5, 5);
    this.court = court;
    this.player = player;
    this.acceleration = new Vector3(0, 0, 0);
    this.velocity = new Vector3(0, 0, 0);
  }

  tick () {
    const { ballCollisionBox, courtCollisionBox } = this.collissionBoxes();

    this.acceleration = new Vector3(0, this.GRAVITY * this.SECONDS_PER_FRAME, 0);

    if (ballCollisionBox.intersectsBox(courtCollisionBox)) {
      this.acceleration.add(new Vector3(0, -(this.GRAVITY * this.SECONDS_PER_FRAME * 2), 0));
    }
    console.log('Velocity before: ', this.velocity);
    const exitVelocity = this.calculateFrameVelocity();
    this.velocity = exitVelocity;
    console.log('Velocity after: ', this.velocity);

    if (ballCollisionBox.intersectsBox(courtCollisionBox)) {
      // this.velocity.y *= -0.8;
    }

    this.ballMesh.position.add(this.velocity);
  }

  private collissionBoxes () {
    const ballCollisionBox = new Box3();
    ballCollisionBox.copy(this.ballMesh.geometry.boundingBox || ballCollisionBox).applyMatrix4(this.ballMesh.matrixWorld);

    const courtCollisionBox = new Box3();
    courtCollisionBox.copy(this.court.courtMesh.geometry.boundingBox || ballCollisionBox).applyMatrix4(this.court.courtMesh.matrixWorld);

    // const playerCollisionBox = new Box3();
    // playerCollisionBox.copy(this.player.playerMesh.geometry.boundingBox || ballCollisionBox).applyMatrix4(this.player.playerMesh.matrixWorld);

    return { ballCollisionBox, courtCollisionBox };
  }

  private updatePosition (p: Vector3) {
    this.ballMesh.position.set(p.x, p.y, p.z);
  }

  calculateFrameVelocity () {
    const accel = this.acceleration.clone();
    return accel.multiplyScalar(this.SECONDS_PER_FRAME);
  }
}

export { TennisBall };
