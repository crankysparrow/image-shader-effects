// switch on high precision floats
#ifdef GL_ES
precision highp float;
#endif

// shared variable for VS and FS containing the normal
varying vec3 vNormal;

void main() {

    // set value to the attribute value passed in by Three.js
    vNormal = normal;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}