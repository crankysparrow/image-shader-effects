uniform vec2 u_res;
uniform sampler2D u_image;
uniform float u_mouse;

varying vec2 v_uv;

void main() {
    vec2 res = u_res * PR;
    vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);
    st.y *= u_res.y / u_res.x;

    vec4 image = texture2D(u_image, v_uv);
    image.rbg = 1.0 - image.rgb;
    gl_FragColor = image;
}