precision mediump float;
uniform vec2 u_res;
uniform sampler2D u_image;
uniform vec2 u_mouse;
uniform float u_time;

varying vec2 v_uv;

void main() {

    vec2 resolution = u_res;
    vec2 uv = v_uv;
    vec2 pixelSize = vec2(1.0) / resolution;



    vec2 st = gl_FragCoord.xy / resolution.xy - vec2(.5);
    st.y *= resolution.y / resolution.x;

    // vec2 mouse = vec2((u_mouse.x / u_res.x) * 2. - 1.,-(u_mouse.y / u_res.y) * 2. + 1.);
    // mouse.y *= resolution.y / resolution.x;

    vec2 mouse = vec2((u_mouse.x / u_res.x), (u_mouse.y / u_res.y));

    float pct = 1.0 - distance(st, mouse);
    vec2 offset = pixelSize * 20.0 * pct;

    vec4 rTex = texture2D(u_image, uv - offset);
    vec4 gTex = texture2D(u_image, uv);
    vec4 bTex = texture2D(u_image, uv + offset);

    vec4 color = vec4(rTex.r, gTex.g, bTex.b, 1.0);
    gl_FragColor = vec4(mouse.x, mouse.x, mouse.x, 1.0);



}