import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Vector3 } from "three";

class Player {
    playerMesh: Mesh

    constructor(p: Vector3){
        const geometry = new BoxGeometry( 1, 1, 1 );
		const material = new MeshBasicMaterial( { color: 0x00ff00 } );
		this.playerMesh = new Mesh( geometry, material );

        this.playerMesh.position.set(p.x, p.y, p.z)
    }

    updatePosition(p: Vector3) {
        this.playerMesh.position.set(p.x, p.y, p.z)
    }

}

export { Player };
