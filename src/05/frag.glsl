precision mediump float;
uniform vec2 u_res;
uniform sampler2D tDiffuse;
uniform vec2 u_mouse;
uniform float u_time;

varying vec2 v_uv;


float circle(in vec2 _st, in vec2 mouse, in float _radius){
    vec2 dist = _st-mouse;
	return 1.0 - smoothstep(0.0, 0.01, dot(dist,dist) * 8.0);
    // return step(_radius, dot(dist,dist) * 4.0);
}

void main() {

    vec2 uv = v_uv;
    vec2 resolution = u_res * PR;

    vec2 st = gl_FragCoord.xy / resolution.xy;
    vec2 adjust = vec2(0.0, (resolution.y / resolution.x) * 0.5);
    st += adjust;
    st.y *= resolution.y / resolution.x;

    vec2 mouse = vec2(u_mouse.x / u_res.x, 1.0 - (u_mouse.y / u_res.y));
    mouse += adjust;
    mouse.y *= u_res.y / u_res.x;

    vec2 dist = st - mouse;
    // float pct = smoothstep(0.05, 0.001, dot(dist, dist) * 5.0);

    float pct = smoothstep(0.2, 0.001, distance(st, mouse));


    float distort = pct * 0.01;

    gl_FragColor = texture2D(tDiffuse, uv + vec2(distort, distort));


}