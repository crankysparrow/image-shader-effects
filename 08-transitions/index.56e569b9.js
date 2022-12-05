function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequireb594"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequireb594"] = parcelRequire;
}
function $bb679dc22b052927$export$2e2bcd8739ae039(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}



var $eNF9K = parcelRequire("eNF9K");
var $be767dd01d41cef2$exports = {};
$be767dd01d41cef2$exports = "precision mediump float;\n#define GLSLIFY 1\n\nvarying float v_wave;\nvarying vec2 v_uv;\nuniform sampler2D u_image;\n\nvoid main() {\n    vec2 uv = v_uv;\n    vec4 image = texture2D(u_image, uv);\n    float wave = v_wave;\n\n    float r = texture2D(u_image, vec2(uv.x + wave * 0.25, uv.y + wave * -0.1)).r;\n    float g = texture2D(u_image, uv - wave * 0.).g;\n    float b = texture2D(u_image, vec2(uv.x + wave * -0.15, uv.y + wave * -0.05)).b;\n\n    vec3 texture = vec3(r, g, b);\n    gl_FragColor = vec4(texture, 1.0);\n\n}";


var $ae6367bb64cdcd94$exports = {};
$ae6367bb64cdcd94$exports = "precision mediump float;\n#define GLSLIFY 1\nvarying vec2 v_uv;\nvarying float v_wave;\nuniform float u_amount;\nuniform float u_time;\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\nvoid main() {\n    v_uv = uv;\n    vec3 pos = position;\n\n    vec3 noisePos = vec3(pos.x - u_time * 1.2, pos.y + u_time * 0.1, 0.0);\n    float wave = snoise(noisePos) * 1.75 * u_amount;\n\n    pos.z += wave;\n    v_wave = wave * 0.1;\n\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n}";


const $2e52274ec66d275b$var$loader = new $eNF9K.TextureLoader();
const $2e52274ec66d275b$var$planeGeometry = new $eNF9K.PlaneGeometry(1, 1, 32, 32);
const $2e52274ec66d275b$var$planeMaterial = new $eNF9K.ShaderMaterial({
    vertexShader: (/*@__PURE__*/$parcel$interopDefault($ae6367bb64cdcd94$exports)),
    fragmentShader: (/*@__PURE__*/$parcel$interopDefault($be767dd01d41cef2$exports))
});
class $2e52274ec66d275b$var$Scene {
    addToDom() {
        document.body.appendChild(this.renderer.domElement);
    }
    addPlane() {
        this.geometry = $2e52274ec66d275b$var$planeGeometry;
        this.material = $2e52274ec66d275b$var$planeMaterial.clone();
        this.material.uniforms = {
            u_time: {
                value: 0
            },
            texture1: {
                type: "t",
                value: this.textures[0]
            },
            texture2: {
                type: "t",
                value: this.textures[1]
            }
        };
        this.plane = new $eNF9K.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
    }
    addImgs(cb) {
        const promises = [];
        this.imgs.forEach((url, i)=>{
            let promise = new Promise((resolve)=>{
                $2e52274ec66d275b$var$loader.load(url, resolve);
            });
            promises.push(promise);
        });
        Promise.all(promises).then((res)=>{
            this.textures = res;
            cb();
        });
    }
    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }
    constructor(imgs){
        (0, $bb679dc22b052927$export$2e2bcd8739ae039)(this, "textures", []);
        (0, $bb679dc22b052927$export$2e2bcd8739ae039)(this, "current", 0);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.scene = new $eNF9K.Scene();
        this.camera = new $eNF9K.PerspectiveCamera(10, this.width, this.height, 0.1, 100);
        this.camera.position.set(0, 0, 2);
        this.renderer = new $eNF9K.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.imgs = imgs;
        this.addImgs(()=>{
            this.addPlane();
            this.addToDom();
        });
    }
}
let $2e52274ec66d275b$var$imgs = [];
let $2e52274ec66d275b$var$imgEls = document.querySelectorAll("img");
$2e52274ec66d275b$var$imgEls.forEach((img)=>$2e52274ec66d275b$var$imgs.push(img.src));
console.log($2e52274ec66d275b$var$imgs);
let $2e52274ec66d275b$var$scene = new $2e52274ec66d275b$var$Scene($2e52274ec66d275b$var$imgs);


//# sourceMappingURL=index.56e569b9.js.map
