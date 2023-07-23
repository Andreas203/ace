import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';
import { PerspectiveCamera, Scene, Vector3, WebGLRenderer, LineBasicMaterial, BufferGeometry, Line, BoxGeometry } from 'three';

import { Loop } from './systems/Loop';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createControls } from './systems/controls';
import { Player } from './objects/Player';
import { Opponent } from './objects/Opponent';
import { HardCourt } from './courts/CourtType';
import { Court } from './objects/Court';
import { TennisBall } from './objects/TennisBall';

class World {
  camera: PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
  loop: Loop;
  controls: OrbitControls;
  resizer: Resizer;

  constructor (container: HTMLElement, camera: PerspectiveCamera) {
    this.camera = camera;
    this.scene = this.createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.controls = createControls(this.camera, this.renderer.domElement);
    this.resizer = new Resizer(container, this.camera, this.renderer);
    container.appendChild(this.renderer.domElement);
  }

  render () {
    this.renderer.render(this.scene, this.camera);
  }

  start () {
    this.loop.start();
  }

  stop () {
    this.loop.stop();
  }

  async init () {
    // Adding animations to loop
    this.initCourt();
    this.loop.updatables.push();
  }

  private createScene () {
    const scene = new Scene();
    return scene;
  }

  public startGame (socket: any) {
    const player = new Player(new Vector3(1,1,1), socket);
    const opponent = new Opponent(new Vector3(0, 0, 0), socket);
    this.scene.add(player.playerMesh);
    this.scene.add(opponent.playerMesh);
    this.loop.updatables.push(player);
    this.loop.updatables.push(opponent);
  }

  public initCourt () {
    const court = new Court(new HardCourt());
    this.scene.add(court.courtMesh);

    this.scene.add(court.net);
    const material = new LineBasicMaterial( { color: 0xffff } );
    const points = [];
    points.push( new Vector3( -13.5, 0, 0 ) );
    points.push( new Vector3( -13.5, 0, 13.5 ) );
    points.push( new Vector3( 13.5, 0, 13.5 ) );
    points.push( new Vector3( 13.5, 0, 0 ) );
    points.push( new Vector3( 13.5, 0, -13.5 ) );
    points.push( new Vector3( -13.5, 0, -13.5 ) );
    points.push( new Vector3( -13.5, 0, 0 ) );
    points.push( new Vector3( 0, 0, 0 ) );
    points.push( new Vector3( 0, 0, 13.5 ) );
    points.push( new Vector3( 0, 0, -13.5 ) );
    points.push( new Vector3( 0, 0, 0 ) );
    points.push( new Vector3( 13.5, 0, 0 ) );

    const geometry = new BufferGeometry().setFromPoints( points );
    const line = new Line( geometry, material );  
    line.renderOrder = 1;
    this.scene.add( line );
    // this.initBall(court);
  }

  public initBall (court: Court) {
    const ball = new TennisBall(court, new Player(new Vector3(0, 0, 0), null));
    this.scene.add(ball.ballMesh);
    this.loop.updatables.push(ball);
  }

}

export { World };
