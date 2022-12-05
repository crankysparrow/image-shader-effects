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
var $99f448f66a2df6ea$exports = {};
$99f448f66a2df6ea$exports = "#define GLSLIFY 1\nvarying vec2 v_uv;\nuniform vec2 u_mouse;\n\nvoid main() {\n    v_uv = uv;\n\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}";


var $410acd59381e514b$exports = {};
$410acd59381e514b$exports = "#define GLSLIFY 1\nuniform vec2 u_res;\nuniform sampler2D u_image;\nuniform vec2 u_mouse;\nuniform float u_time;\n\nvarying vec2 v_uv;\n\nvoid main() {\n\n    vec2 uv = v_uv;\n\n    // vec2 res = u_res * PR;\n    // vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);\n    // st.y *= u_res.y / u_res.x;\n\n    float frequency =  u_mouse.y * 30.0;\n    float amplitude = 0.03 * u_mouse.x;\n    float sineWave = sin(uv.y * frequency + u_time * 0.01) * amplitude;\n\n    // create a vec2 with our sine\n    // what happens if you put sineWave in the y slot? in Both slots?\n    vec2 distort = vec2(sineWave, 0.0);\n\n    vec4 image = texture2D(u_image, uv + distort );\n\n    gl_FragColor = image;\n}";


const $fb8635888f64e3cb$var$scene = new $eNF9K.Scene();
const $fb8635888f64e3cb$var$loader = new $eNF9K.TextureLoader();
let $fb8635888f64e3cb$var$theimage = document.getElementById("theimage");
let $fb8635888f64e3cb$var$rect = $fb8635888f64e3cb$var$theimage.getBoundingClientRect();
$fb8635888f64e3cb$var$theimage.remove();
const $fb8635888f64e3cb$var$renderer = new $eNF9K.WebGLRenderer({});
$fb8635888f64e3cb$var$renderer.setPixelRatio(window.devicePixelRatio);
$fb8635888f64e3cb$var$renderer.setSize($fb8635888f64e3cb$var$rect.width, $fb8635888f64e3cb$var$rect.height);
document.body.appendChild($fb8635888f64e3cb$var$renderer.domElement);
let $fb8635888f64e3cb$var$camera = new $eNF9K.OrthographicCamera($fb8635888f64e3cb$var$rect.width / -2, $fb8635888f64e3cb$var$rect.width / 2, $fb8635888f64e3cb$var$rect.height / 2, $fb8635888f64e3cb$var$rect.height / -2);
$fb8635888f64e3cb$var$camera.position.set(0, 0, 1);
let $fb8635888f64e3cb$var$uniforms = {
    u_time: {
        value: 0
    },
    u_res: {
        value: new $eNF9K.Vector2($fb8635888f64e3cb$var$rect.width, $fb8635888f64e3cb$var$rect.height)
    },
    u_mouse: {
        type: "v2",
        value: new $eNF9K.Vector2()
    }
};
let $fb8635888f64e3cb$var$image = $fb8635888f64e3cb$var$loader.load($fb8635888f64e3cb$var$theimage.src, ()=>{
    $fb8635888f64e3cb$var$uniforms.u_image = {
        type: "t",
        value: $fb8635888f64e3cb$var$image
    };
    let geometry = new $eNF9K.PlaneBufferGeometry();
    let material = new $eNF9K.ShaderMaterial({
        uniforms: $fb8635888f64e3cb$var$uniforms,
        vertexShader: (/*@__PURE__*/$parcel$interopDefault($99f448f66a2df6ea$exports)),
        fragmentShader: (/*@__PURE__*/$parcel$interopDefault($410acd59381e514b$exports)),
        defines: {
            PR: window.devicePixelRatio.toFixed(1)
        }
    });
    let mesh = new $eNF9K.Mesh(geometry, material);
    mesh.scale.set($fb8635888f64e3cb$var$rect.width, $fb8635888f64e3cb$var$rect.height, 1);
    $fb8635888f64e3cb$var$scene.add(mesh);
});
document.onmousemove = function(e) {
    if (e.target == $fb8635888f64e3cb$var$renderer.domElement) {
        $fb8635888f64e3cb$var$uniforms.u_mouse.value.x = (e.clientX - $fb8635888f64e3cb$var$renderer.domElement.offsetLeft) / $fb8635888f64e3cb$var$rect.width;
        $fb8635888f64e3cb$var$uniforms.u_mouse.value.y = (e.clientY - $fb8635888f64e3cb$var$renderer.domElement.offsetTop) / $fb8635888f64e3cb$var$rect.height;
    } else {
        $fb8635888f64e3cb$var$uniforms.u_mouse.value.x = 0;
        $fb8635888f64e3cb$var$uniforms.u_mouse.value.y = 0;
    }
};
// render loop
const $fb8635888f64e3cb$var$onAnimationFrameHandler = (timeStamp)=>{
    $fb8635888f64e3cb$var$renderer.render($fb8635888f64e3cb$var$scene, $fb8635888f64e3cb$var$camera);
    $fb8635888f64e3cb$var$uniforms.u_time.value++;
    window.requestAnimationFrame($fb8635888f64e3cb$var$onAnimationFrameHandler);
};
window.requestAnimationFrame($fb8635888f64e3cb$var$onAnimationFrameHandler);


//# sourceMappingURL=index.3e27b1b3.js.map
