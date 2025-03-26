import * as THREE from "three";

export class Helpers {
  scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  addAxesHelper(size: number = 5) {
    const axesHelper = new THREE.AxesHelper(size);
    this.scene.add(axesHelper);
  }

  addGridHelper(size: number = 100, divisions: number = 10) {
    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);
  }

  addCameraHelper(camera: THREE.Camera) {
    const cameraHelper = new THREE.CameraHelper(camera);
    this.scene.add(cameraHelper);
  }

  addDirectionalLightHelper(light: THREE.DirectionalLight) {
    const directionalLightHelper = new THREE.DirectionalLightHelper(light);
    this.scene.add(directionalLightHelper);
  }
}
