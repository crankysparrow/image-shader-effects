(function () {
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

var $fpyje = parcelRequire("fpyje");
var $250db9b7c7015140$exports = {};
$250db9b7c7015140$exports = "precision mediump float;\n#define GLSLIFY 1\nvarying vec2 v_uv;\nuniform vec2 u_mouse;\nuniform vec2 u_res;\n\nvoid main() {\n    v_uv = uv;\n\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}";


var $6842d3cae1a32dea$exports = {};
$6842d3cae1a32dea$exports = "precision mediump float;\n#define GLSLIFY 1\nuniform vec2 u_res;\nuniform sampler2D u_image;\nuniform vec2 u_mouse;\nuniform float u_time;\n\nvarying vec2 v_uv;\n\nvoid main() {\n\n    vec2 resolution = u_res * PR;\n\n    vec2 uv = v_uv;\n\n    vec2 st = gl_FragCoord.xy / resolution.xy - vec2(.5);\n    st.y *= resolution.y / resolution.x;\n\n    vec2 mouse = vec2((u_mouse.x / u_res.x) * 2. - 1., -(u_mouse.y / u_res.y) * 2. + 1.) * 0.5;\n    mouse.y *= resolution.y / resolution.x;\n\n    float pct = distance(st, mouse);\n\n    vec4 image = texture2D(u_image, uv);\n\n    gl_FragColor = image * (1.0 - smoothstep(0.1, 0.2, pct));\n    // gl_FragColor = image;\n}";


var $604a06a03690a0cf$var$scene = new $fpyje.Scene();
var $604a06a03690a0cf$var$loader = new $fpyje.TextureLoader();
var $604a06a03690a0cf$var$theimage = document.getElementById("theimage");
var $604a06a03690a0cf$var$rect = $604a06a03690a0cf$var$theimage.getBoundingClientRect();
var $604a06a03690a0cf$var$renderer = new $fpyje.WebGLRenderer();
$604a06a03690a0cf$var$renderer.setPixelRatio(window.devicePixelRatio);
$604a06a03690a0cf$var$renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild($604a06a03690a0cf$var$renderer.domElement);
var $604a06a03690a0cf$var$camera = new $fpyje.OrthographicCamera();
$604a06a03690a0cf$var$camera.position.set(0, 0, 1);
var $604a06a03690a0cf$var$image = $604a06a03690a0cf$var$loader.load($604a06a03690a0cf$var$theimage.src);
var $604a06a03690a0cf$var$uniforms = {
    u_time: {
        value: 0
    },
    u_res: {
        value: new $fpyje.Vector2(window.innerWidth, window.innerHeight)
    },
    u_mouse: {
        type: "v2",
        value: new $fpyje.Vector2()
    },
    u_image: {
        type: "t",
        value: $604a06a03690a0cf$var$image
    }
};
var $604a06a03690a0cf$var$geometry = new $fpyje.PlaneBufferGeometry($604a06a03690a0cf$var$rect.width, $604a06a03690a0cf$var$rect.height, 1, 1);
var $604a06a03690a0cf$var$material = new $fpyje.ShaderMaterial({
    uniforms: $604a06a03690a0cf$var$uniforms,
    vertexShader: (0, (/*@__PURE__*/$parcel$interopDefault($250db9b7c7015140$exports))),
    fragmentShader: (0, (/*@__PURE__*/$parcel$interopDefault($6842d3cae1a32dea$exports))),
    defines: {
        PR: window.devicePixelRatio.toFixed(1)
    }
});
var $604a06a03690a0cf$var$mesh = new $fpyje.Mesh($604a06a03690a0cf$var$geometry, $604a06a03690a0cf$var$material);
$604a06a03690a0cf$var$scene.add($604a06a03690a0cf$var$mesh);
document.onmousemove = function(e) {
    $604a06a03690a0cf$var$uniforms.u_mouse.value.x = e.clientX;
    $604a06a03690a0cf$var$uniforms.u_mouse.value.y = e.clientY;
};
// render loop
var $604a06a03690a0cf$var$onAnimationFrameHandler = function(timeStamp) {
    $604a06a03690a0cf$var$renderer.render($604a06a03690a0cf$var$scene, $604a06a03690a0cf$var$camera);
    $604a06a03690a0cf$var$uniforms.u_time.value++;
    window.requestAnimationFrame($604a06a03690a0cf$var$onAnimationFrameHandler);
};
window.requestAnimationFrame($604a06a03690a0cf$var$onAnimationFrameHandler);
// resize
var $604a06a03690a0cf$var$windowResizeHanlder = function() {
    var innerHeight = window.innerHeight, innerWidth = window.innerWidth;
    $604a06a03690a0cf$var$renderer.setSize(innerWidth, innerHeight);
    $604a06a03690a0cf$var$uniforms.u_res.value.x = innerWidth;
    $604a06a03690a0cf$var$uniforms.u_res.value.y = innerHeight;
    $604a06a03690a0cf$var$camera.left = innerWidth / -2;
    $604a06a03690a0cf$var$camera.right = innerWidth / 2;
    $604a06a03690a0cf$var$camera.top = innerHeight / 2;
    $604a06a03690a0cf$var$camera.bottom = innerHeight / -2;
    $604a06a03690a0cf$var$camera.updateProjectionMatrix();
};
$604a06a03690a0cf$var$windowResizeHanlder();
window.addEventListener("resize", $604a06a03690a0cf$var$windowResizeHanlder);

})();
//# sourceMappingURL=index.fba03d9f.js.map
