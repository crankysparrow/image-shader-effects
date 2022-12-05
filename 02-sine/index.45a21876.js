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
var $94483cd247df8723$exports = {};
$94483cd247df8723$exports = "#define GLSLIFY 1\nvarying vec2 v_uv;\nuniform vec2 u_mouse;\n\nvoid main() {\n    v_uv = uv;\n\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}";


var $8ca5ee3b6da93088$exports = {};
$8ca5ee3b6da93088$exports = "#define GLSLIFY 1\nuniform vec2 u_res;\nuniform sampler2D u_image;\nuniform vec2 u_mouse;\nuniform float u_time;\n\nvarying vec2 v_uv;\n\nvoid main() {\n\n    vec2 uv = v_uv;\n\n    // vec2 res = u_res * PR;\n    // vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);\n    // st.y *= u_res.y / u_res.x;\n\n    float frequency =  u_mouse.y * 30.0;\n    float amplitude = 0.03 * u_mouse.x;\n    float sineWave = sin(uv.y * frequency + u_time * 0.01) * amplitude;\n\n    // create a vec2 with our sine\n    // what happens if you put sineWave in the y slot? in Both slots?\n    vec2 distort = vec2(sineWave, 0.0);\n\n    vec4 image = texture2D(u_image, uv + distort );\n\n    gl_FragColor = image;\n}";


var $a43589df0dfe4576$var$scene = new $fpyje.Scene();
var $a43589df0dfe4576$var$loader = new $fpyje.TextureLoader();
var $a43589df0dfe4576$var$theimage = document.getElementById("theimage");
var $a43589df0dfe4576$var$rect = $a43589df0dfe4576$var$theimage.getBoundingClientRect();
$a43589df0dfe4576$var$theimage.remove();
var $a43589df0dfe4576$var$renderer = new $fpyje.WebGLRenderer({});
$a43589df0dfe4576$var$renderer.setPixelRatio(window.devicePixelRatio);
$a43589df0dfe4576$var$renderer.setSize($a43589df0dfe4576$var$rect.width, $a43589df0dfe4576$var$rect.height);
document.body.appendChild($a43589df0dfe4576$var$renderer.domElement);
var $a43589df0dfe4576$var$camera = new $fpyje.OrthographicCamera($a43589df0dfe4576$var$rect.width / -2, $a43589df0dfe4576$var$rect.width / 2, $a43589df0dfe4576$var$rect.height / 2, $a43589df0dfe4576$var$rect.height / -2);
$a43589df0dfe4576$var$camera.position.set(0, 0, 1);
var $a43589df0dfe4576$var$uniforms = {
    u_time: {
        value: 0
    },
    u_res: {
        value: new $fpyje.Vector2($a43589df0dfe4576$var$rect.width, $a43589df0dfe4576$var$rect.height)
    },
    u_mouse: {
        type: "v2",
        value: new $fpyje.Vector2()
    }
};
var $a43589df0dfe4576$var$image = $a43589df0dfe4576$var$loader.load($a43589df0dfe4576$var$theimage.src, function() {
    $a43589df0dfe4576$var$uniforms.u_image = {
        type: "t",
        value: $a43589df0dfe4576$var$image
    };
    var geometry = new $fpyje.PlaneBufferGeometry();
    var material = new $fpyje.ShaderMaterial({
        uniforms: $a43589df0dfe4576$var$uniforms,
        vertexShader: (0, (/*@__PURE__*/$parcel$interopDefault($94483cd247df8723$exports))),
        fragmentShader: (0, (/*@__PURE__*/$parcel$interopDefault($8ca5ee3b6da93088$exports))),
        defines: {
            PR: window.devicePixelRatio.toFixed(1)
        }
    });
    var mesh = new $fpyje.Mesh(geometry, material);
    mesh.scale.set($a43589df0dfe4576$var$rect.width, $a43589df0dfe4576$var$rect.height, 1);
    $a43589df0dfe4576$var$scene.add(mesh);
});
document.onmousemove = function(e) {
    if (e.target == $a43589df0dfe4576$var$renderer.domElement) {
        $a43589df0dfe4576$var$uniforms.u_mouse.value.x = (e.clientX - $a43589df0dfe4576$var$renderer.domElement.offsetLeft) / $a43589df0dfe4576$var$rect.width;
        $a43589df0dfe4576$var$uniforms.u_mouse.value.y = (e.clientY - $a43589df0dfe4576$var$renderer.domElement.offsetTop) / $a43589df0dfe4576$var$rect.height;
    } else {
        $a43589df0dfe4576$var$uniforms.u_mouse.value.x = 0;
        $a43589df0dfe4576$var$uniforms.u_mouse.value.y = 0;
    }
};
// render loop
var $a43589df0dfe4576$var$onAnimationFrameHandler = function(timeStamp) {
    $a43589df0dfe4576$var$renderer.render($a43589df0dfe4576$var$scene, $a43589df0dfe4576$var$camera);
    $a43589df0dfe4576$var$uniforms.u_time.value++;
    window.requestAnimationFrame($a43589df0dfe4576$var$onAnimationFrameHandler);
};
window.requestAnimationFrame($a43589df0dfe4576$var$onAnimationFrameHandler);

})();
//# sourceMappingURL=index.45a21876.js.map
