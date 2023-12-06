precision mediump float;
uniform vec2 u_res;
uniform sampler2D tDiffuse;
uniform vec2 u_mouse;
uniform float time;

varying vec2 v_uv;

vec3 left(vec2 resolution) {
    vec2 st = gl_FragCoord.xy / resolution.xy + ((resolution.y / resolution.x) * 0.5);
    st.y *= resolution.y / resolution.x;

    float c = st.y;

    return vec3(c, 0.0, 1.0) * (1.0 - step(0.5, gl_FragCoord.x / resolution.x));
}

vec3 right(vec2 resolution) {
    vec2 st = gl_FragCoord.xy / resolution.xy;

    float c = st.y;

    return vec3(c, 0.0, 1.0) * step(0.5, gl_FragCoord.x / resolution.x);
}

vec4 leftRight(vec2 resolution) {
    vec3 col = left(resolution) + right(resolution);
    return vec4(col, 1.0);
}

vec4 mouseSpotlight(vec2 resolution) {
    vec2 st = gl_FragCoord.xy / resolution.xy;
    // vec2 adjust = vec2(0.0, (resolution.y / resolution.x) * 0.5);
    // st += vec2(0.0, (resolution.y / resolution.x) * 0.5);
    // st.y *= resolution.y / resolution.x;



    // vec2 mouse = vec2(u_mouse.x / u_res.x, 1.0 - (u_mouse.y / u_res.y));
    // mouse += adjust;
    // mouse.y *= u_res.y / u_res.x;
    // float pct = distance(st, mouse);
    // pct = smoothstep(0.1, 0.15, pct);

    // vec3 col = vec3(st.y, 0.0, 1.0) * pct;

    float pct = distance(st, u_mouse);

    return vec4(pct, 0.0, 0.0, 1.0);
}

void main() {

    vec2 uv = v_uv;
    vec2 resolution = u_res * PR;

    gl_FragColor = mouseSpotlight(resolution);

}