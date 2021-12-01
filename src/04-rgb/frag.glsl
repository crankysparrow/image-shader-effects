precision mediump float;
uniform vec2 u_res;
uniform sampler2D u_image;
uniform vec2 u_mouse;
uniform float u_time;

varying vec2 v_uv;

void main() {

    vec2 resolution = u_res * PR;
    vec2 uv = v_uv;
    vec2 pixelSize = vec2(1.0) / resolution;

    vec2 st = gl_FragCoord.xy / resolution.xy - vec2(.5);
    st.y *= resolution.y / resolution.x;

    // vec2 mouse = vec2((u_mouse.x / u_res.x), (u_mouse.y / u_res.y));
    vec2 mouse = vec2((u_mouse.x / u_res.x) * 2. - 1.,-(u_mouse.y / u_res.y) * 2. + 1.) * 0.5;
    mouse.y *= resolution.y / resolution.x;

    // float pct = 1.0 - distance(st, mouse);
    float pct = distance(st, mouse);
    // float pctadjust = 1.0 - smoothstep(0.1, 0.2, pct);
    // float pctadjust = step(pct, 0.1);
    float pctadjust = smoothstep(0.11, 0.1, pct);
    vec2 offset = pixelSize * 30.0 * pctadjust;


    vec4 rTex = texture2D(u_image, uv - offset);
    vec4 gTex = texture2D(u_image, uv);
    vec4 bTex = texture2D(u_image, uv + offset);

    vec4 color = vec4(rTex.r, gTex.g, bTex.b, 1.0);

    gl_FragColor = color;

}