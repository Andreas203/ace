import { Object3D, ObjectLoader } from 'three';

class Racket {

  constructor (scene: Object3D) {
    // Instantiate a loader
    const loader = new ObjectLoader();

    // Load a glTF resource
    loader.load(
      // resource URL
      'models/racket.json',
      // called when the resource is loaded
      ( obj ) => {
        console.log("loaded racket");
        scene.add( obj );
      },
      // called while loading is progressing
      function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

      },
      // called when loading has errors
      function ( error ) {
        console.log( 'An error happened' );
        console.log(error);
      }
    );
  }
  
}

export { Racket };
