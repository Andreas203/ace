import { Mesh, PlaneGeometry, MeshBasicMaterial, DoubleSide, Vector3 } from 'three';
import { CourtType } from '../courts/CourtType';

class Court {
  courtMesh: Mesh;
  courtType: CourtType;
  serviceBoxes: Mesh[] = [];
  net: Mesh;

  constructor (courtType: CourtType) {
    this.courtType = courtType;
    const geometry = new PlaneGeometry(40, 100);
    geometry.computeBoundingBox();
    const material = new MeshBasicMaterial({ color: 'blue' });
    this.courtMesh = new Mesh(geometry, material);
    this.courtMesh.rotateOnAxis(new Vector3(1, 0, 0), -Math.PI / 2);

    const geometry1 = new PlaneGeometry(3, 27);
    const material1 = new MeshBasicMaterial({ color: 'white', side: DoubleSide, transparent: true, opacity: 0.25 });
    this.net = new Mesh(geometry1, material1);
    this.net.position.set(0, 1.5, 0);
    this.net.rotateOnAxis(new Vector3(0, 0, 1), -Math.PI / 2);
  }
}

export { Court };
