precision mediump float;

varying vec2 v_uv;
uniform sampler2D u_image;
uniform vec2 u_mouse;
uniform vec2 u_res;
uniform float u_time;
uniform float u_radius;

#pragma glslify: noise = require(glsl-noise/simplex/3d)

void main() {
    vec2 uv = v_uv;
    vec2 resolution = u_res;
    
    vec2 st = uv;
    vec2 mouse = vec2(u_mouse.x, 1.0 - u_mouse.y);

    mouse.y *= resolution.y / resolution.x;
    st.y *= resolution.y / resolution.x;

    float pct = distance(st, mouse);
    float amt = smoothstep(u_radius * 0.5, u_radius * 0.3, pct) * 0.2;

    vec3 noisePos = vec3(st.x, st.y, u_time * 0.5);
    float wave = noise(noisePos) * amt;

    float r = texture2D(u_image, uv + vec2(wave * 0.5, wave * -0.5)).r;
    float g = texture2D(u_image, uv - wave).g;
    float b = texture2D(u_image, uv + wave).b;

    vec3 rgb = vec3(r, g, b);

    gl_FragColor = vec4(rgb, 1.0);

}