precision mediump float;
varying vec2 v_uv;
varying float v_wave;
uniform float u_amount;
uniform float u_time;

#include '../shaders/lygia/generative/snoise.glsl'

void main() {
    v_uv = uv;
    vec3 pos = position;

    vec3 noisePos = vec3(pos.x - u_time * 1.2, pos.y + u_time * 0.1, 0.0);
    float wave = snoise(noisePos) * 1.75 * u_amount;

    pos.z += wave;
    v_wave = wave * 0.1;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}