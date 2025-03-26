varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;
varying float vNoiseMultiplier;

uniform float uTime;

#include helpers;

void main() {;
    float noise = pnoise(vec3(vPosition.z * 50.0));
    vec3 purpleColor = vec3(3., 0.9, 0.06) / vec3(0.4941, 0.4941, 0.051) * 3.0;
    vec3 color = vec3(noise) * purpleColor;
    float multiplier = smoothstep(0.0, 1.0, pow(vNoiseMultiplier, 1.2));
    float alpha = clamp(multiplier * color.r * color.g * color.b, 0.0, 1.0);
    gl_FragColor = vec4(color, alpha);
}