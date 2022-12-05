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

var $hEzo3 = parcelRequire("hEzo3");

var $hLSrC = parcelRequire("hLSrC");

var $2EzFz = parcelRequire("2EzFz");
var $7b9849646bfa0381$exports = {};
$7b9849646bfa0381$exports = "#define GLSLIFY 1\nuniform float time;\nuniform sampler2D tDiffuse;\nuniform vec2 resolution;\nvarying vec2 vUv;\nuniform vec2 uMouse;\n\nfloat circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {\n    uv -= disc_center;\n    uv*=resolution;\n    float dist = sqrt(dot(uv, uv));\n    return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);\n}\nvoid main()  {\n    vec2 newUV = vUv;\n    float c = circle(vUv, uMouse, 0.0, 0.2);\n    float r = texture2D(tDiffuse, newUV.xy += c * (0.1 * .5)).x;\n    float g = texture2D(tDiffuse, newUV.xy += c * (0.1 * .525)).y;\n    float b = texture2D(tDiffuse, newUV.xy += c * (0.1 * .55)).z;\n    vec4 color = vec4(r, g, b, 1.);\n    gl_FragColor = color;\n}";


var $f955599c26f5222d$exports = {};
$f955599c26f5222d$exports = "precision mediump float;\n#define GLSLIFY 1\nuniform vec2 u_res;\nuniform sampler2D tDiffuse;\nuniform vec2 u_mouse;\nuniform float u_time;\n\nvarying vec2 v_uv;\n\nfloat circle(in vec2 _st, in vec2 mouse, in float _radius){\n    vec2 dist = _st-mouse;\n	return 1.0 - smoothstep(0.0, 0.01, dot(dist,dist) * 8.0);\n    // return step(_radius, dot(dist,dist) * 4.0);\n}\n\nvoid main() {\n\n    vec2 uv = v_uv;\n    vec2 resolution = u_res * PR;\n\n    vec2 st = gl_FragCoord.xy / resolution.xy;\n    vec2 adjust = vec2(0.0, (resolution.y / resolution.x) * 0.5);\n    st += adjust;\n    st.y *= resolution.y / resolution.x;\n\n    vec2 mouse = vec2(u_mouse.x / u_res.x, 1.0 - (u_mouse.y / u_res.y));\n    mouse += adjust;\n    mouse.y *= u_res.y / u_res.x;\n\n    float pct = smoothstep(0.2, 0.001, distance(st, mouse));\n    float distort = pct * 0.01;\n\n    gl_FragColor = texture2D(tDiffuse, uv + vec2(distort, distort));\n\n}";


var $6a1a26a52530080d$exports = {};
$6a1a26a52530080d$exports = "precision mediump float;\n#define GLSLIFY 1\nvarying vec2 v_uv;\nuniform vec2 u_mouse;\nuniform vec2 u_res;\n\nvoid main() {\n    v_uv = uv;\n\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}";


var $6834179e401aeef6$var$loader = new $fpyje.TextureLoader();
if (null) null.dispose(function() {
    window.location.reload();
});
var $6834179e401aeef6$var$camera, $6834179e401aeef6$var$scene, $6834179e401aeef6$var$renderer, $6834179e401aeef6$var$composer, $6834179e401aeef6$var$renderPass, $6834179e401aeef6$var$customPass;
var $6834179e401aeef6$var$geometry, $6834179e401aeef6$var$material, $6834179e401aeef6$var$mesh, $6834179e401aeef6$var$texture, $6834179e401aeef6$var$u_mouse = new $fpyje.Vector2(0, 0);
var $6834179e401aeef6$var$theimage = document.getElementById("texture");
$6834179e401aeef6$var$texture = $6834179e401aeef6$var$loader.load($6834179e401aeef6$var$theimage.src);
$6834179e401aeef6$var$init();
$6834179e401aeef6$var$animate();
function $6834179e401aeef6$var$init() {
    $6834179e401aeef6$var$scene = new $fpyje.Scene();
    // https://codepen.io/trusktr/pen/EbOoNx
    var perspective = 800;
    var fov = 180 * (2 * Math.atan(innerHeight / 2 / perspective)) / Math.PI;
    $6834179e401aeef6$var$camera = new $fpyje.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    $6834179e401aeef6$var$camera.position.set(0, 0, perspective);
    $6834179e401aeef6$var$geometry = new $fpyje.PlaneGeometry(500, 333);
    $6834179e401aeef6$var$material = new $fpyje.MeshBasicMaterial({
        map: $6834179e401aeef6$var$texture
    });
    $6834179e401aeef6$var$mesh = new $fpyje.Mesh($6834179e401aeef6$var$geometry, $6834179e401aeef6$var$material);
    $6834179e401aeef6$var$scene.add($6834179e401aeef6$var$mesh);
    $6834179e401aeef6$var$renderer = new $fpyje.WebGLRenderer({
        antialias: true
    });
    $6834179e401aeef6$var$renderer.setSize(window.innerWidth, window.innerHeight);
    $6834179e401aeef6$var$renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.outputEncoding = THREE.sRGBEncoding
    document.body.appendChild($6834179e401aeef6$var$renderer.domElement);
    window.renderer = $6834179e401aeef6$var$renderer;
    // post processing
    $6834179e401aeef6$var$composer = new (0, $hEzo3.EffectComposer)($6834179e401aeef6$var$renderer);
    $6834179e401aeef6$var$renderPass = new (0, $hLSrC.RenderPass)($6834179e401aeef6$var$scene, $6834179e401aeef6$var$camera);
    $6834179e401aeef6$var$composer.addPass($6834179e401aeef6$var$renderPass);
    var myEffect = {
        uniforms: {
            tDiffuse: {
                value: null
            },
            u_res: {
                value: new $fpyje.Vector2(window.innerWidth, window.innerHeight)
            },
            // resolution: { value: new THREE.Vector2(1, window.innerHeight / window.innerWidth) },
            u_mouse: {
                value: new $fpyje.Vector2(-10, -10)
            },
            u_time: {
                value: 0
            }
        },
        vertexShader: (0, (/*@__PURE__*/$parcel$interopDefault($6a1a26a52530080d$exports))),
        fragmentShader: (0, (/*@__PURE__*/$parcel$interopDefault($f955599c26f5222d$exports))),
        defines: {
            PR: window.devicePixelRatio.toFixed(1)
        }
    };
    $6834179e401aeef6$var$customPass = new (0, $2EzFz.ShaderPass)(myEffect);
    $6834179e401aeef6$var$customPass.renderToScreen = true;
    $6834179e401aeef6$var$composer.addPass($6834179e401aeef6$var$customPass);
}
document.addEventListener("mousemove", function(e) {
    // mousemove / touchmove
    // u_mouse.x = e.clientX / window.innerWidth
    // u_mouse.y = 1 - e.clientY / window.innerHeight
    $6834179e401aeef6$var$u_mouse.x = e.clientX;
    $6834179e401aeef6$var$u_mouse.y = e.clientY;
});
function $6834179e401aeef6$var$animate() {
    $6834179e401aeef6$var$customPass.uniforms.u_mouse.value = $6834179e401aeef6$var$u_mouse;
    $6834179e401aeef6$var$customPass.uniforms.u_time.value++;
    requestAnimationFrame($6834179e401aeef6$var$animate);
    // renderer.render(scene, camera)
    $6834179e401aeef6$var$composer.render();
}

})();
//# sourceMappingURL=index.4c560eec.js.map
