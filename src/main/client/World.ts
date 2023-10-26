import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';
import { PerspectiveCamera, Scene, Vector3, WebGLRenderer, LineBasicMaterial, BufferGeometry, Line, BoxGeometry, Mesh, MeshBasicMaterial, BackSide, TextureLoader } from 'three';

import { Loop } from './systems/Loop';
import { Player } from './objects/Player';
import { Opponent } from './objects/Opponent';
import { HardCourt } from './courts/CourtType';
import { Court } from './objects/Court';
import { Racket } from './objects/Racket';

class World {
  camera: PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
  loop: Loop;
  // controls: OrbitControls;
  resizer: Resizer;

  constructor (container: HTMLElement, camera: PerspectiveCamera) {
    this.camera = camera;
    this.scene = this.createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    // this.controls = createControls(this.camera, this.renderer.domElement);
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
    this.initSkybox();
    this.loop.updatables.push();
  }

  private createScene () {
    const scene = new Scene();
    return scene;
  }

  public startGame (socket: any) {
    const court = this.initCourt();
    const player = new Player(this.camera, socket);
    const opponent = new Opponent(new Vector3(0, 0, 10), socket);
    this.initBall(court, player, opponent);
    // this.scene.add(player.playerMesh);
    const racket = new Racket(this.scene);
    this.scene.add(opponent.playerMesh);

    this.loop.updatables.push(player);
    this.loop.updatables.push(opponent);
    this.loop.updatables.push(racket);
  }

  public initCourt () {
    const court = new Court(new HardCourt());
    this.scene.add(court.courtMesh);
    this.scene.add(court.net);
    const material = new LineBasicMaterial({ color: 0xffff });
    const points = [];

    // Service box 1
    points.push(new Vector3(0, 0, 0));
    points.push(new Vector3(0, 0, 13.5));
    points.push(new Vector3(13.5, 0, 13.5));
    points.push(new Vector3(13.5, 0, 0));
    points.push(new Vector3(0, 0, 0));

    // Service box 2
    points.push(new Vector3(0, 0, 0));
    points.push(new Vector3(0, 0, 13.5));
    points.push(new Vector3(-13.5, 0, 13.5));
    points.push(new Vector3(-13.5, 0, 0));
    points.push(new Vector3(0, 0, 0));

    // Service box 3
    points.push(new Vector3(0, 0, 0));
    points.push(new Vector3(0, 0, -13.5));
    points.push(new Vector3(13.5, 0, -13.5));
    points.push(new Vector3(13.5, 0, 0));
    points.push(new Vector3(0, 0, 0));

    // Service box 4
    points.push(new Vector3(0, 0, 0));
    points.push(new Vector3(0, 0, -13.5));
    points.push(new Vector3(-13.5, 0, -13.5));
    points.push(new Vector3(-13.5, 0, 0));
    points.push(new Vector3(0, 0, 0));

    const geometry = new BufferGeometry().setFromPoints(points);
    const line = new Line(geometry, material);
    line.renderOrder = 1;
    this.scene.add(line);

    const material1 = new LineBasicMaterial({ color: 0xffff });
    const points1 = [];

    // court lines
    points1.push(new Vector3(-13.5, 0, -39));
    points1.push(new Vector3(-13.5, 0, 39));
    points1.push(new Vector3(13.5, 0, 39));
    points1.push(new Vector3(13.5, 0, -39));
    points1.push(new Vector3(-13.5, 0, -39));

    const geometry1 = new BufferGeometry().setFromPoints(points1);
    const line1 = new Line(geometry1, material1);
    line1.renderOrder = 1;
    this.scene.add(line1);

    return court;
  }

  public initBall (court: Court, player: Player, opponent: Opponent) {
    // const ball = new TennisBall(court, new Player(new Vector3(0, 0, 0), null));
    // this.scene.add(ball.ballMesh);
    // this.loop.updatables.push(ball);
  }

  public initSkybox () {
    const loader = new TextureLoader();

    // load a resource
    loader.load(
      // resource URL
      'textures/skybox/pruplenebula.jpg',

      // onLoad callback
      (texture: any) => {
        console.log('texture loaded');
        // in this example we create the material when the texture is loaded
        const material = new MeshBasicMaterial({
          map: texture,
          side: BackSide
        });

        const skyboxGeo = new BoxGeometry(40, 80, 100);

        const skybox = new Mesh(skyboxGeo, material);
        this.scene.add(skybox);
      },

      // onProgress callback currently not supported
      undefined,

      // onError callback
      function (err: any) {
        console.error('An error happened.', err);
      }
    );
  }
}

export { World };
