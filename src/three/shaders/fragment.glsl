varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;

uniform float uTime;

#include helpers;

void main() {
    float noise = pnoise(vec3(vPosition.z * 50.0));
    vec3 purpleColor = vec3(0.498, 0.2039, 0.8314) / vec3(0.4941, 0.4941, 0.051) * 3.0;
    vec3 color = vec3(noise) * purpleColor;
    gl_FragColor = vec4(color, 1.0);
}