uniform vec2 u_res;
uniform sampler2D u_image;
uniform float u_mouse;

varying vec2 v_uv;

void main() {

    vec4 image = texture2D(u_image, v_uv);
    image.rbg = 1.0 - image.rgb;
    gl_FragColor = image;
}