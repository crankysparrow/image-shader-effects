precision mediump float;
uniform vec2 u_res;
uniform sampler2D u_image;
uniform vec2 u_mouse;
uniform float u_time;

varying vec2 v_uv;

void main() {

    vec2 resolution = u_res * PR;

    vec2 uv = v_uv;

    vec2 st = gl_FragCoord.xy / resolution.xy - vec2(.5);
    // vec2 st = gl_FragCoord.xy / resolution.xy;
    st.y *= resolution.y / resolution.x;

    vec2 mouse = vec2((u_mouse.x / u_res.x) * 2. - 1.,-(u_mouse.y / u_res.y) * 2. + 1.) * 0.5;
    mouse.y *= resolution.y / resolution.x;

    float pct = distance(st, mouse);

    vec4 image = texture2D(u_image, uv);

    gl_FragColor = image * (1.0 - smoothstep(0.1, 0.2, pct));
    // gl_FragColor = image;
}