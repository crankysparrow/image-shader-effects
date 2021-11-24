varying vec2 v_uv;
uniform vec2 u_mouse;

void main() {
    v_uv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}