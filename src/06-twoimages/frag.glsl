precision mediump float;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_time;

uniform sampler2D u_image;
uniform sampler2D u_image2;

varying vec2 v_uv;

void main() {

    vec2 res = u_res * PR;
    vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);
    st.y *= u_res.y / u_res.x;

    vec2 mouse = vec2(u_mouse.x / u_res.x, 1.0 - ( u_mouse.y / u_res.y ));
    mouse = mouse - vec2(0.5);
    mouse.y *= u_res.y / u_res.x;

    float pct = smoothstep(0.3, 0.15, distance(st, mouse));

    vec4 image = texture2D(u_image, v_uv);
    vec4 image2 = texture2D(u_image2, v_uv);

    gl_FragColor = mix(image, image2, pct);

}