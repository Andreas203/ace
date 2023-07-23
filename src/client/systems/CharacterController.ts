class CharacterController {
  keys: any;
  constructor () {
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      space: false,
      shift: false
    };
    document.addEventListener('keydown', (e) => this.OnKeyDown_(e), false);
    document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
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
};

export { CharacterController };
