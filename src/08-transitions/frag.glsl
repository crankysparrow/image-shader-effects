precision mediump float;

varying vec2 v_uv;
uniform sampler2D u_tex1;
uniform sampler2D u_tex2;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_scale1;
uniform vec2 u_scale2;

void main() {
    float amt = max(0.0, mod(u_time, 4.0) - 2.0) / 2.0;
    float steps = 20.0;

    vec2 uv1 = (v_uv - vec2(0.5)) * u_scale1 + vec2(0.5);
    float factor1 = max(floor(uv1.x * steps) / steps, 0.0);

    vec2 uv2 = (v_uv - vec2(0.5)) * u_scale2 + vec2(0.5);
    float factor2 = max(floor(uv2.x * steps) / steps, 0.0);

    uv1.x -= factor1;
    uv1 = uv1 - (uv1 * vec2(1.0, 0.0)) * amt * 0.7;
    uv1.x += factor1;

    uv2.x -= factor2;
    uv2 = uv2 - (uv2 * vec2(1.0, 0.0)) * (1.0 - amt) * 0.7;
    uv2.x += factor2;

    vec4 image1 = texture2D(u_tex1, uv1);
    vec4 image2 = texture2D(u_tex2, uv2);

    gl_FragColor = mix(image1, image2, amt);

}
