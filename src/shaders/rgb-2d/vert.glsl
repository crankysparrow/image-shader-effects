precision mediump float;
varying vec2 v_uv;
uniform float u_amount;
uniform float u_time;

void main() {
    v_uv = uv;
    vec3 pos = position;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}