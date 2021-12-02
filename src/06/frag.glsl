precision mediump float;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform sampler2D u_image;

varying vec2 v_uv;

void main() {

    vec2 res = u_resolution * PR;
    vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);
    st.y *= u_resolution.y / u_resolution.x;

    vec4 image = texture2D(u_image, v_uv);

    gl_FragColor = image;

}