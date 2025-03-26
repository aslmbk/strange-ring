import { toneMappingOptions } from "./Engine/utils/constants";
import { colorSpaceOptions } from "./Engine/utils/constants";
import { shadowMapTypeOptions } from "./Engine/utils/constants";
import { Experience } from "./Experience";
import * as THREE from "three";

export class DebugController {
  private color = new THREE.Color();

  constructor(experience: Experience) {
    const rendererFolder = experience.debug.addFolder({
      title: "renderer",
      expanded: true,
    });

    rendererFolder
      .addBinding(experience.config, "clearColor")
      .on("change", ({ value }) => {
        this.color.set(value);
        experience.scene.background?.copy(this.color as any);
      });

    rendererFolder.addBinding(experience.renderer, "toneMapping", {
      label: "tone mapping",
      options: toneMappingOptions,
    });

    rendererFolder.addBinding(experience.renderer, "toneMappingExposure", {
      label: "tone mapping exposure",
      min: 0,
      max: 10,
      step: 0.1,
    });

    rendererFolder.addBinding(experience.renderer, "outputColorSpace", {
      label: "color space",
      options: colorSpaceOptions,
    });

    rendererFolder.addBinding(experience.renderer.shadowMap, "type", {
      label: "shadow map type",
      options: shadowMapTypeOptions,
    });
  }
}
