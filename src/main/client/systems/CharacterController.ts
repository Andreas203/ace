import { PerspectiveCamera, Vector2 } from "three";

class CharacterController {
  keys: any;
  mouse: any = new Vector2();
  target: any = new Vector2();
  windowHalf: any = new Vector2( window.innerWidth / 2, window.innerHeight / 2 );
  camera: PerspectiveCamera;
constructor (camera: PerspectiveCamera) {
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      space: false,
      shift: false
    };
    this.camera = camera;
    console.log(this.windowHalf);
    document.addEventListener('keydown', (e) => this.OnKeyDown_(e), false);
    document.addEventListener('keyup', (e) => this._onKeyUp(e), false);

    document.addEventListener( 'mousemove', (e) => this._onMouseMove(e), false );

  }

  OnKeyDown_ (event: any) {
    if (event.currentTarget.activeElement !== document.body) {
      return;
    }
    switch (event.keyCode) {
    case 87: // w
      this.keys.forward = true;
      break;
    case 65: // a
      this.keys.left = true;
      break;
    case 83: // s
      this.keys.backward = true;
      break;
    case 68: // d
      this.keys.right = true;
      break;
    case 32: // SPACE
      this.keys.space = true;
      break;
    case 16: // SHIFT
      this.keys.shift = true;
      break;
    }
  }

  _onKeyUp (event: any) {
    if (event.currentTarget.activeElement !== document.body) {
      return;
    }
    switch (event.keyCode) {
    case 87: // w
      this.keys.forward = false;
      break;
    case 65: // a
      this.keys.left = false;
      break;
    case 83: // s
      this.keys.backward = false;
      break;
    case 68: // d
      this.keys.right = false;
      break;
    case 32: // SPACE
      this.keys.space = false;
      break;
    case 16: // SHIFT
      this.keys.shift = false;
      break;
    }
  }

  _onMouseMove( event: any ) {

    this.mouse.x = ( event.clientX - this.windowHalf.x );
    this.mouse.y = ( event.clientY - this.windowHalf.x );

  }


  animate() {

    this.target.x = ( 1 - this.mouse.x ) * 0.0002;
    this.target.y = ( 1 - this.mouse.y ) * 0.0002;
    
    this.camera.rotation.x += 1 * ( this.target.y - this.camera.rotation.x );
    this.camera.rotation.y += 1 * ( this.target.x - this.camera.rotation.y );

  }
};

export { CharacterController };
