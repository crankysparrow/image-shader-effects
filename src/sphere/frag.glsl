#ifdef GL_ES 
precision highp float;
#endif

// same name and type as VS
varying vec3 vNormal;

void main() {

    // So the reason the dot product works is that given two vectors 
    // it comes out with a number that tells you how "similar" the two vectors are. 
    // With normalised vectors, if they point in exactly the same direction, 
    // you get a value of 1. If they point in opposite directions you get a -1. 
    // What we do is take that number and apply it to our lighting. 
    // So a vertex in the top right will have a value near or equal to 1, 
    // i.e. fully lit, whereas a vertex on the side would have a value 
    // near 0 and round the back would be -1. 
    // https://aerotwist.com/tutorials/an-introduction-to-shaders-part-2/

    vec3 light = vec3(0.5, 0.2, 1.0);
    light = normalize(light);

    // calculate dot product and clamp to 0 -> 1 rather than -1 -> 1
    float dProd = max(0.0, dot(vNormal, light));

    gl_FragColor = vec4(dProd, dProd, dProd, 1.0);

}