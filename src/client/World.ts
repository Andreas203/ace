import { createRenderer } from './systems/renderer';
import { PerspectiveCamera, Scene, WebGLRenderer, Color } from 'three';
import { Loop } from './systems/Loop';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createControls } from './systems/controls';

class World {
  camera: PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
  loop: Loop;
  controls: OrbitControls;

  constructor (container: HTMLElement) {
    this.camera = new PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.scene = this.createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.controls = createControls(this.camera, this.renderer.domElement);

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
    this.loop.updatables.push();
  }

  private createScene () {
    const scene = new Scene();

    scene.background = new Color('skyblue');

    return scene;
  }
}

export { World };
