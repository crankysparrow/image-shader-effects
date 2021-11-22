uniform vec2 u_res;
uniform sampler2D u_image;
uniform vec2 u_mouse;
uniform float u_time;

varying vec2 v_uv;

void main() {

    vec2 uv = v_uv;

    // vec2 res = u_res * PR;
    // vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);
    // st.y *= u_res.y / u_res.x;

    float frequency = 10.0 * u_mouse.y * 2.0;
    float amplitude = 0.03 * u_mouse.x;
    float sineWave = sin(uv.y * frequency + u_time * 0.01) * amplitude;

    // create a vec2 with our sine
    // what happens if you put sineWave in the y slot? in Both slots?
    vec2 distort = vec2(sineWave, 0.0);

    vec4 image = texture2D(u_image, uv + distort);

    gl_FragColor = image;
}