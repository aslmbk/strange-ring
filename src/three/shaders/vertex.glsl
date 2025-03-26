varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

uniform float uTime;

#include helpers;

void main() {
    float noiseMultiplier = abs(uv.x - 0.5) - 0.3 - sin(uv.y + uTime) * 0.1;
    noiseMultiplier = clamp(noiseMultiplier * 2.0, 0.0, 1.0);
    float noise = pnoise(position * 5.0);
    float displacement = noise * noiseMultiplier;
    vec3 pos = position + normal * displacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    vUv = uv;
    vPosition = pos;
    vNormal = normal;
}