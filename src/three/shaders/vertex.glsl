varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vNoiseMultiplier;

uniform float uTime;

#include helpers;

void main() {
    // float noiseMultiplier = abs(uv.x - 0.5) - 0.3 - sin(uv.y + uTime) * 0.1;
    float noiseMultiplier = sin(uv.x * PI * 2.0 + uTime) * 0.7;
    noiseMultiplier = clamp(noiseMultiplier, 0.0, 1.0);
    noiseMultiplier = smoothstep(0.0, 1.0, pow(noiseMultiplier, 2.5));
    float noise = pnoise(position * 5.0);
    float displacement = noise * noiseMultiplier;
    vec3 pos = position + normal * displacement;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    vUv = uv;
    vPosition = pos;
    vNormal = normal;
    vNoiseMultiplier = noiseMultiplier;
}