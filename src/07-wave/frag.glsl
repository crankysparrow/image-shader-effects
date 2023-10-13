precision mediump float;

varying float v_wave;
varying vec2 v_uv;
uniform sampler2D u_image;

void main() {
  vec2 uv = v_uv;
  vec4 image = texture2D(u_image, uv);
  float wave = v_wave;

  float r = texture2D(u_image, vec2(uv.x + wave * 0.25, uv.y + wave * -0.1)).r;
  float g = texture2D(u_image, uv - wave * 0.).g;
  float b =
      texture2D(u_image, vec2(uv.x + wave * -0.15, uv.y + wave * -0.05)).b;

  vec3 texture = vec3(r, g, b);
  gl_FragColor = vec4(texture, 1.0);
}