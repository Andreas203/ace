import { Vector3 } from 'three';

export class ConnectedPlayer {
  position: Vector3;
  socket: any;

  constructor (socket: any, position?: Vector3) {
    this.position = position;
    this.socket = socket;
  }
}
