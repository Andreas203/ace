import { Vector3 } from "three";

class ConnectedPlayer{
    position: Vector3;
    socket: any;

    constructor(socket: any){
        this.position = new Vector3(Math.random() * 3,0 ,Math.random() * 3);
        this.socket = socket;
        this.socket.emit('playerPosition', this.position)
    }

}

export {ConnectedPlayer}