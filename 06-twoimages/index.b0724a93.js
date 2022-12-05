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

var $fpyje = parcelRequire("fpyje");

var $hEzo3 = parcelRequire("hEzo3");

var $hLSrC = parcelRequire("hLSrC");

var $2EzFz = parcelRequire("2EzFz");
function $a9f56826dd19a7eb$var$createCamera() {
    // https://codepen.io/trusktr/pen/EbOoNx
    var perspective = 800;
    var fov = 180 * (2 * Math.atan(innerHeight / 2 / perspective)) / Math.PI;
    var camera = new $fpyje.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, perspective);
    return camera;
}
function $a9f56826dd19a7eb$var$createMesh(texture) {
    var geometry = new $fpyje.PlaneGeometry(500, 333);
    var material = new $fpyje.MeshBasicMaterial({
        map: texture
    });
    var mesh = new $fpyje.Mesh(geometry, material);
    return mesh;
}
function $a9f56826dd19a7eb$var$createRenderer() {
    var renderer = new $fpyje.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.outputEncoding = THREE.sRGBEncoding
    document.body.appendChild(renderer.domElement);
    return renderer;
}
function $a9f56826dd19a7eb$var$loadImageAsTexture(src) {
    var loader = new $fpyje.TextureLoader();
    var texture = loader.load(src);
    return texture;
}
function $a9f56826dd19a7eb$var$createComposer(renderer, scene, camera) {
    var composer = new (0, $hEzo3.EffectComposer)(renderer);
    var renderPass = new (0, $hLSrC.RenderPass)(scene, camera);
    composer.addPass(renderPass);
    return composer;
}
function $a9f56826dd19a7eb$var$createShaderPass(effect, composer) {
    var customPass = new (0, $2EzFz.ShaderPass)(effect);
    customPass.renderToScreen = true;
    composer.addPass(customPass);
    return customPass;
}
var $a9f56826dd19a7eb$export$2e2bcd8739ae039 = makeStuff = {
    createCamera: $a9f56826dd19a7eb$var$createCamera,
    createMesh: $a9f56826dd19a7eb$var$createMesh,
    createRenderer: $a9f56826dd19a7eb$var$createRenderer,
    loadImageAsTexture: $a9f56826dd19a7eb$var$loadImageAsTexture,
    createComposer: $a9f56826dd19a7eb$var$createComposer,
    createShaderPass: $a9f56826dd19a7eb$var$createShaderPass
};


var $11e4acfaa078227a$exports = {};
$11e4acfaa078227a$exports = "precision mediump float;\n#define GLSLIFY 1\nuniform vec2 u_res;\nuniform vec2 u_mouse;\nuniform float u_time;\n\nuniform sampler2D u_image;\nuniform sampler2D u_image2;\n\nvarying vec2 v_uv;\n\nvoid main() {\n\n    vec2 res = u_res * PR;\n    vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);\n    st.y *= u_res.y / u_res.x;\n\n    vec2 mouse = vec2(u_mouse.x / u_res.x, 1.0 - ( u_mouse.y / u_res.y ));\n    mouse = mouse - vec2(0.5);\n    mouse.y *= u_res.y / u_res.x;\n\n    float pct = smoothstep(0.3, 0.15, distance(st, mouse));\n\n    vec4 image = texture2D(u_image, v_uv);\n    vec4 image2 = texture2D(u_image2, v_uv);\n\n    gl_FragColor = mix(image, image2, pct);\n\n}";


var $e133e0623dd173d9$exports = {};
$e133e0623dd173d9$exports = "precision mediump float;\n#define GLSLIFY 1\nvarying vec2 v_uv;\nuniform vec2 u_mouse;\nuniform vec2 u_res;\n\nvoid main() {\n    v_uv = uv;\n\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}";


if (null) null.dispose(function() {
    window.location.reload();
});
var $48594b3e100b8f8a$var$size = 800;
var $48594b3e100b8f8a$var$width = $48594b3e100b8f8a$var$size;
var $48594b3e100b8f8a$var$height = $48594b3e100b8f8a$var$size;
var $48594b3e100b8f8a$var$loader = new $fpyje.TextureLoader();
var $48594b3e100b8f8a$var$scene = new $fpyje.Scene();
var $48594b3e100b8f8a$var$renderer = new $fpyje.WebGLRenderer({});
$48594b3e100b8f8a$var$renderer.setPixelRatio(window.devicePixelRatio);
$48594b3e100b8f8a$var$renderer.setSize($48594b3e100b8f8a$var$width, $48594b3e100b8f8a$var$height);
document.body.appendChild($48594b3e100b8f8a$var$renderer.domElement);
var $48594b3e100b8f8a$var$light = new $fpyje.AmbientLight(0xffffff);
$48594b3e100b8f8a$var$scene.add($48594b3e100b8f8a$var$light);
var $48594b3e100b8f8a$var$tex1 = $48594b3e100b8f8a$var$loader.load("https://picsum.photos/".concat($48594b3e100b8f8a$var$size, "?random=1"));
var $48594b3e100b8f8a$var$tex2 = $48594b3e100b8f8a$var$loader.load("https://picsum.photos/".concat($48594b3e100b8f8a$var$size, "?random=2"));
var $48594b3e100b8f8a$var$uniforms = {
    u_image: {
        type: "t",
        value: $48594b3e100b8f8a$var$tex1
    },
    u_image2: {
        type: "t",
        value: $48594b3e100b8f8a$var$tex2
    },
    u_time: {
        value: 0
    },
    u_res: {
        value: new $fpyje.Vector2($48594b3e100b8f8a$var$width, $48594b3e100b8f8a$var$height)
    },
    u_mouse: {
        value: new $fpyje.Vector2(0, 0)
    }
};
var $48594b3e100b8f8a$var$geometry = new $fpyje.PlaneBufferGeometry(1, 1, 1, 1);
var $48594b3e100b8f8a$var$material = new $fpyje.ShaderMaterial({
    uniforms: $48594b3e100b8f8a$var$uniforms,
    vertexShader: (0, (/*@__PURE__*/$parcel$interopDefault($e133e0623dd173d9$exports))),
    fragmentShader: (0, (/*@__PURE__*/$parcel$interopDefault($11e4acfaa078227a$exports))),
    defines: {
        PR: window.devicePixelRatio.toFixed(1)
    }
});
var $48594b3e100b8f8a$var$mesh = new $fpyje.Mesh($48594b3e100b8f8a$var$geometry, $48594b3e100b8f8a$var$material);
$48594b3e100b8f8a$var$mesh.scale.set($48594b3e100b8f8a$var$width, $48594b3e100b8f8a$var$height, 1);
$48594b3e100b8f8a$var$scene.add($48594b3e100b8f8a$var$mesh);
var $48594b3e100b8f8a$var$camera = new $fpyje.OrthographicCamera($48594b3e100b8f8a$var$width / -2, $48594b3e100b8f8a$var$width / 2, $48594b3e100b8f8a$var$height / 2, $48594b3e100b8f8a$var$height / -2, 1, 10);
$48594b3e100b8f8a$var$camera.position.set(0, 0, 1);
$48594b3e100b8f8a$var$renderer.render($48594b3e100b8f8a$var$scene, $48594b3e100b8f8a$var$camera);
var $48594b3e100b8f8a$var$mouse = new $fpyje.Vector2(0, 0);
window.mouse = $48594b3e100b8f8a$var$mouse;
var $48594b3e100b8f8a$var$rect = $48594b3e100b8f8a$var$renderer.domElement.getBoundingClientRect();
window.rect = $48594b3e100b8f8a$var$rect;
document.addEventListener("mousemove", function(e) {
    $48594b3e100b8f8a$var$mouse.x = e.pageX - $48594b3e100b8f8a$var$rect.left;
    $48594b3e100b8f8a$var$mouse.y = e.pageY - $48594b3e100b8f8a$var$rect.top;
});
function $48594b3e100b8f8a$var$animate() {
    $48594b3e100b8f8a$var$mesh.material.uniforms.u_time.value += 1;
    $48594b3e100b8f8a$var$mesh.material.uniforms.u_mouse.value = $48594b3e100b8f8a$var$mouse;
    requestAnimationFrame($48594b3e100b8f8a$var$animate);
    $48594b3e100b8f8a$var$renderer.render($48594b3e100b8f8a$var$scene, $48594b3e100b8f8a$var$camera);
}
$48594b3e100b8f8a$var$animate();
var $48594b3e100b8f8a$var$windowResizeHandler = function() {
    $48594b3e100b8f8a$var$rect = $48594b3e100b8f8a$var$renderer.domElement.getBoundingClientRect();
// const { innerWidth, innerHeight } = window
// renderer.setSize(innerWidth, innerHeight)
// camera.left = innerWidth / -2
// camera.right = innerWidth / 2
// camera.top = innerHeight / 2
// camera.bottom = innerHeight / -2
// mesh.material.uniforms.u_res.value = new THREE.Vector2(innerWidth, innerHeight)
// mesh.scale.set(innerWidth, innerHeight, 1)
// camera.updateProjectionMatrix()
};
window.addEventListener("resize", $48594b3e100b8f8a$var$windowResizeHandler);

})();
//# sourceMappingURL=index.b0724a93.js.map
