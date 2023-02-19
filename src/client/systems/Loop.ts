import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';

class Loop {
  camera: PerspectiveCamera;
  scene: Scene;
  renderer: WebGLRenderer;
  updatables: any;

  constructor (camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  tick () {
    for (const object of this.updatables) {
      object.tick();
    }
  }

  start () {
    this.renderer.setAnimationLoop(() => {
      this.tick();

      // render a frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop () {
    this.renderer.setAnimationLoop(null);
  }
}

export { Loop };
