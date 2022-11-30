uniform vec2 u_res;
uniform sampler2D u_image;
uniform vec2 u_mouse;
uniform float u_time;

varying vec2 v_uv;

void main() {
    vec2 uv = v_uv;
    vec2 resolution = u_res * PR;

    vec2 st = uv;
    vec2 mouse = vec2(u_mouse.x, 1.0 - u_mouse.y);
    // these make it so the mouse hover can be a circle,
    // even if the image is not square 
    mouse.x *= resolution.x / resolution.y;
    st.x *= resolution.x / resolution.y;

    float pct = distance(st, mouse);
    float offset = smoothstep(0.4, 0.399, pct);

    vec4 image = texture2D(u_image, v_uv);
    vec4 inverted = vec4(vec3(1.0 - image.rgb), 1.0);
    vec4 img = mix(image, inverted, offset);

    gl_FragColor = img;
}