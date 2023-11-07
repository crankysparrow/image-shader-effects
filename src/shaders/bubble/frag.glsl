precision mediump float;

uniform vec2 u_res;
uniform sampler2D tDiffuse;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_radius;
uniform float u_vel;
uniform float u_angle;
uniform float u_type;

varying vec2 v_uv;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d) 

void main() {
    vec2 uv = v_uv;
    vec2 resolution = u_res;

    vec2 st = uv;
    vec2 mouse = u_mouse;

    mouse.y *= resolution.y / resolution.x;
    st.y *= resolution.y / resolution.x;

    float amt = smoothstep(u_radius, u_radius * 0.1,  distance(st, mouse)) * u_vel;

    vec4 color = vec4(0.0);

    if ( u_type == 1.0 ) { // dissolve

        vec2 noisePos = vec2(uv.x, uv.y) * 1000.0;
        float noise = snoise2(noisePos);
        vec2 offsetUv = uv + vec2(noise) * amt * 3.0;
        color = texture2D(tDiffuse, offsetUv);

    } else if ( u_type == 2.0 ) { // zoom 

        vec2 distort = vec2(cos(u_angle) * amt, sin(u_angle) * amt);
        vec2 distortedUv = uv + distort;
        color = texture2D(tDiffuse, distortedUv);

    } else if ( u_type == 3.0 ) { // zoom + color 

        vec2 distort = vec2(cos(u_angle) * amt, sin(u_angle) * amt);
        vec2 distortedUv = uv + distort;

        float r = texture2D(tDiffuse, distortedUv + distort.x).r;
        float g = texture2D(tDiffuse, distortedUv + distort.y).g;
        float b = texture2D(tDiffuse, distortedUv + distort.xy * 0.5).b;
        color = vec4(r, g, b, 1.0);

    }




    gl_FragColor = color;

}