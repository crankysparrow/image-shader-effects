precision mediump float;

varying vec2 v_uv;
uniform sampler2D u_image;
uniform vec2 u_mouse;
uniform vec2 u_res;
uniform float u_time;

// #pragma glslify: noise = require(glsl-noise/simplex/3d)
#include '../shaders/lygia/generative/snoise.glsl'

void main() {
    vec2 uv = v_uv;
    vec2 resolution = u_res;

    vec2 st = uv;
    vec2 mouse = vec2(u_mouse.x, 1.0 - u_mouse.y);

    // these make it so the mouse hover can be a circle,
    // even if the image is not square 
    mouse.y *= resolution.y / resolution.x;
    st.y *= resolution.y / resolution.x;

    float pct = distance(st, mouse);
    float pctadjust = smoothstep(0.4, 0.35, pct);
    // vec2 offset = pixelSize * 10.0 * pctadjust;
    vec2 offset = vec2(0.02 * pctadjust);

    vec3 noisePos = vec3(st.x - u_time, st.y, 0.0);
    float wave = snoise(noisePos) * 2.5 * pctadjust;

    float r = texture2D(u_image, uv - offset * wave).r;
    float g = texture2D(u_image, uv + offset * wave * 0.5).g;
    float b = texture2D(u_image, uv + offset * wave).b;

    vec4 image = texture2D(u_image, uv);

    gl_FragColor = vec4(r, g, b, 1.0);
    // gl_FragColor = vec4(st.y, 0.0, 0.0, 1.0);

}