import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';

import { PerspectiveCamera, Scene, WebGLRenderer, Color, MeshBasicMaterial, BoxGeometry, Mesh } from 'three';

import { Loop } from './systems/Loop';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createControls } from './systems/controls';
import { Player } from './objects/Player';

class World {
	camera: PerspectiveCamera;
	scene: Scene;
	renderer: WebGLRenderer;
	loop: Loop;
	controls: OrbitControls;

	constructor (container: HTMLElement, camera: PerspectiveCamera) {
		this.camera = camera;
		this.scene = this.createScene();
		this.renderer = createRenderer();
		this.loop = new Loop(this.camera, this.scene, this.renderer);
		this.controls = createControls(this.camera, this.renderer.domElement);

		container.appendChild(this.renderer.domElement);

		const resizer = new Resizer(container, this.camera, this.renderer);
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
		return scene
	}
	
	public addPlayer(player: Player) {
		this.scene.add(player.playerMesh)
	}

}

export { World };
