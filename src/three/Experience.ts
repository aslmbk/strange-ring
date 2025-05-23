import * as THREE from "three";
import { Engine } from "./Engine";
import { DebugController } from "./DebugController";
import { Config } from "./Config";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { Effects } from "./Effects";

export class Experience extends Engine {
  public readonly config: Config;
  public readonly debugController: DebugController;
  public readonly effects: Effects;

  constructor(domElement: HTMLElement) {
    super({ domElement, autoRender: false });
    this.config = new Config();
    this.debugController = new DebugController(this);
    this.effects = new Effects(this.renderer, this.scene, this.view);

    this.stats.activate();
    this.scene.background = new THREE.Color(this.config.clearColor);
    this.controls.enabled = false;

    const geometry = new THREE.TorusGeometry(2, 0.7, 512, 1024);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: new THREE.Uniform(0),
      },
      transparent: true,
      side: THREE.DoubleSide,
    });
    const torus = new THREE.Mesh(geometry, material);
    this.scene.add(torus);

    this.time.events.on("tick", ({ elapsed }) => {
      material.uniforms.uTime.value = elapsed;
    });
    this.time.events.on(
      "tick",
      () => {
        this.effects.render();
      },
      5
    );
    this.viewport.events.on("change", ({ width, height, pixelRatio }) => {
      this.effects.resize(width, height, pixelRatio);
    });
    this.cursor.events.on("movement", ({ x, y }) => {
      this.view.position.x = x * 5;
      this.view.position.y = y * 5;
      this.view.lookAt(torus.position);
    });
  }
}
