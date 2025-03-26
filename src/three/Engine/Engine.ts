import * as THREE from "three";
import { Debug } from "./Debug";
import { Time } from "./Time";
import { Viewport } from "./Viewport";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Loader } from "./Loader";
import { Stats } from "./Stats";
import { Helpers } from "./Helpers";

export type EngineOptions = {
  domElement: HTMLElement;
  autoRender?: boolean;
};

export class Engine {
  public readonly domElement!: HTMLElement;
  public readonly debug!: Debug;
  public readonly time!: Time;
  public readonly viewport!: Viewport;
  public readonly scene!: THREE.Scene;
  public readonly view!: THREE.PerspectiveCamera;
  public readonly renderer!: THREE.WebGLRenderer;
  public readonly controls!: OrbitControls;
  public readonly loader!: Loader;
  public readonly stats!: Stats;
  public readonly helpers!: Helpers;

  private autoRender: boolean;

  constructor({ domElement, autoRender = true }: EngineOptions) {
    this.domElement = domElement;
    this.autoRender = autoRender;

    this.debug = new Debug();
    this.time = new Time();
    this.viewport = new Viewport(this.domElement);
    this.scene = new THREE.Scene();
    this.view = new THREE.PerspectiveCamera(75, this.viewport.ratio, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.controls = new OrbitControls(this.view, this.renderer.domElement);
    this.loader = new Loader();
    this.stats = new Stats();
    this.helpers = new Helpers(this.scene);

    this.scene.add(this.view);
    this.view.position.set(0, 0, 6);
    this.controls.enableDamping = true;
    this.domElement.appendChild(this.renderer.domElement);

    this.registerEvents();
  }

  private registerEvents() {
    this.time.events.on(
      "tick",
      () => {
        if (this.autoRender) {
          this.renderer.render(this.scene, this.view);
        }
      },
      5
    );
    this.time.events.on("tick", () => {
      this.controls.update();
      this.stats.update();
    });
    this.viewport.events.on("change", () => {
      this.view.aspect = this.viewport.ratio;
      this.view.updateProjectionMatrix();
      this.renderer.setSize(this.viewport.width, this.viewport.height);
      this.renderer.setPixelRatio(this.viewport.pixelRatio);
    });
  }
}
