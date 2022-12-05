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

var $eNF9K = parcelRequire("eNF9K");
var $4aedc0a0cd55085f$exports = {};
$4aedc0a0cd55085f$exports = "precision mediump float;\n#define GLSLIFY 1\nvarying vec2 v_uv;\nuniform vec2 u_mouse;\nuniform vec2 u_res;\n\nvoid main() {\n    v_uv = uv;\n\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}";


var $f281b835d71d6d1f$exports = {};
$f281b835d71d6d1f$exports = "precision mediump float;\n#define GLSLIFY 1\nuniform vec2 u_res;\nuniform sampler2D u_image;\nuniform vec2 u_mouse;\nuniform float u_time;\n\nvarying vec2 v_uv;\n\nvoid main() {\n\n    vec2 resolution = u_res * PR;\n\n    vec2 uv = v_uv;\n\n    vec2 st = gl_FragCoord.xy / resolution.xy - vec2(.5);\n    st.y *= resolution.y / resolution.x;\n\n    vec2 mouse = vec2((u_mouse.x / u_res.x) * 2. - 1., -(u_mouse.y / u_res.y) * 2. + 1.) * 0.5;\n    mouse.y *= resolution.y / resolution.x;\n\n    float pct = distance(st, mouse);\n\n    vec4 image = texture2D(u_image, uv);\n\n    gl_FragColor = image * (1.0 - smoothstep(0.1, 0.2, pct));\n    // gl_FragColor = image;\n}";


const $aa51e0976283973c$var$scene = new $eNF9K.Scene();
const $aa51e0976283973c$var$loader = new $eNF9K.TextureLoader();
let $aa51e0976283973c$var$theimage = document.getElementById("theimage");
let $aa51e0976283973c$var$rect = $aa51e0976283973c$var$theimage.getBoundingClientRect();
const $aa51e0976283973c$var$renderer = new $eNF9K.WebGLRenderer();
$aa51e0976283973c$var$renderer.setPixelRatio(window.devicePixelRatio);
$aa51e0976283973c$var$renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild($aa51e0976283973c$var$renderer.domElement);
let $aa51e0976283973c$var$camera = new $eNF9K.OrthographicCamera();
$aa51e0976283973c$var$camera.position.set(0, 0, 1);
let $aa51e0976283973c$var$image = $aa51e0976283973c$var$loader.load($aa51e0976283973c$var$theimage.src);
let $aa51e0976283973c$var$uniforms = {
    u_time: {
        value: 0
    },
    u_res: {
        value: new $eNF9K.Vector2(window.innerWidth, window.innerHeight)
    },
    u_mouse: {
        type: "v2",
        value: new $eNF9K.Vector2()
    },
    u_image: {
        type: "t",
        value: $aa51e0976283973c$var$image
    }
};
let $aa51e0976283973c$var$geometry = new $eNF9K.PlaneBufferGeometry($aa51e0976283973c$var$rect.width, $aa51e0976283973c$var$rect.height, 1, 1);
let $aa51e0976283973c$var$material = new $eNF9K.ShaderMaterial({
    uniforms: $aa51e0976283973c$var$uniforms,
    vertexShader: (0, (/*@__PURE__*/$parcel$interopDefault($4aedc0a0cd55085f$exports))),
    fragmentShader: (0, (/*@__PURE__*/$parcel$interopDefault($f281b835d71d6d1f$exports))),
    defines: {
        PR: window.devicePixelRatio.toFixed(1)
    }
});
let $aa51e0976283973c$var$mesh = new $eNF9K.Mesh($aa51e0976283973c$var$geometry, $aa51e0976283973c$var$material);
$aa51e0976283973c$var$scene.add($aa51e0976283973c$var$mesh);
document.onmousemove = function(e) {
    $aa51e0976283973c$var$uniforms.u_mouse.value.x = e.clientX;
    $aa51e0976283973c$var$uniforms.u_mouse.value.y = e.clientY;
};
// render loop
const $aa51e0976283973c$var$onAnimationFrameHandler = (timeStamp)=>{
    $aa51e0976283973c$var$renderer.render($aa51e0976283973c$var$scene, $aa51e0976283973c$var$camera);
    $aa51e0976283973c$var$uniforms.u_time.value++;
    window.requestAnimationFrame($aa51e0976283973c$var$onAnimationFrameHandler);
};
window.requestAnimationFrame($aa51e0976283973c$var$onAnimationFrameHandler);
// resize
const $aa51e0976283973c$var$windowResizeHanlder = ()=>{
    const { innerHeight: innerHeight , innerWidth: innerWidth  } = window;
    $aa51e0976283973c$var$renderer.setSize(innerWidth, innerHeight);
    $aa51e0976283973c$var$uniforms.u_res.value.x = innerWidth;
    $aa51e0976283973c$var$uniforms.u_res.value.y = innerHeight;
    $aa51e0976283973c$var$camera.left = innerWidth / -2;
    $aa51e0976283973c$var$camera.right = innerWidth / 2;
    $aa51e0976283973c$var$camera.top = innerHeight / 2;
    $aa51e0976283973c$var$camera.bottom = innerHeight / -2;
    $aa51e0976283973c$var$camera.updateProjectionMatrix();
};
$aa51e0976283973c$var$windowResizeHanlder();
window.addEventListener("resize", $aa51e0976283973c$var$windowResizeHanlder);


//# sourceMappingURL=index.dc225596.js.map
