import * as THREE from "three";

export const toneMappingOptions = {
  NoToneMapping: THREE.NoToneMapping,
  Neutral: THREE.NeutralToneMapping,
  Linear: THREE.LinearToneMapping,
  Cineon: THREE.CineonToneMapping,
  Reinhard: THREE.ReinhardToneMapping,
  ACESFilmic: THREE.ACESFilmicToneMapping,
};

export const colorSpaceOptions = {
  NoColorSpace: THREE.NoColorSpace,
  SRGB: THREE.SRGBColorSpace,
  LinearSRGB: THREE.LinearSRGBColorSpace,
};

export const shadowMapTypeOptions = {
  Basic: THREE.BasicShadowMap,
  PCF: THREE.PCFShadowMap,
  PCFSoft: THREE.PCFSoftShadowMap,
  VSM: THREE.VSMShadowMap,
};
