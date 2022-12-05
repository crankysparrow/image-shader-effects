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

var $dnGTK = parcelRequire("dnGTK");

var $9SLyD = parcelRequire("9SLyD");

var $dK6Ta = parcelRequire("dK6Ta");

var $fpyje = parcelRequire("fpyje");

var $dnGTK = parcelRequire("dnGTK");

var $9SLyD = parcelRequire("9SLyD");

var $dK6Ta = parcelRequire("dK6Ta");

var $fpyje = parcelRequire("fpyje");
var $254a8bf927772f3f$export$2e2bcd8739ae039 = /*#__PURE__*/ function() {
    "use strict";
    function Scene() {
        var _this = this;
        (0, $dnGTK.default)(this, Scene);
        (0, $dK6Ta.default)(this, "planes", []);
        (0, $dK6Ta.default)(this, "mouseX", 0);
        (0, $dK6Ta.default)(this, "mouseY", 0);
        var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
        this.windowWidth = innerWidth;
        this.windowHeight = innerHeight;
        this.scene = new $fpyje.Scene();
        this.camera = new $fpyje.OrthographicCamera(0, 1, 0, -1);
        this.camera.position.set(0, 0, 1);
        this.renderer = new $fpyje.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(innerWidth, innerHeight);
        this.clock = new $fpyje.Clock();
        this.addToDom();
        this.onResize();
        window.requestAnimationFrame(function() {
            return _this.tick();
        });
        window.addEventListener("resize", function() {
            return _this.onResize();
        });
        window.addEventListener("scroll", function() {
            return _this.onScroll();
        });
        window.addEventListener("mousemove", function(e) {
            return _this.onMouse(e);
        });
        window.addEventListener("mousemove", function(e) {
            return _this.firstMouseMove(e);
        }, {
            once: true
        });
    }
    (0, $9SLyD.default)(Scene, [
        {
            key: "firstMouseMove",
            value: function firstMouseMove(e) {
                var _this = this;
                this.mouseX = e.clientX / this.windowWidth;
                this.mouseY = e.clientY / this.windowHeight;
                this.planes.forEach(function(plane) {
                    var xOff = _this.mouseX - plane.bounds.left;
                    plane.mouseX = xOff / plane.bounds.scaleX;
                    var yOff = _this.mouseY - plane.bounds.top;
                    plane.mouseY = yOff / plane.bounds.scaleY;
                });
            }
        },
        {
            key: "addPlane",
            value: function addPlane(plane) {
                this.scene.add(plane.mesh);
                this.planes.push(plane);
            }
        },
        {
            key: "addToDom",
            value: function addToDom() {
                document.body.appendChild(this.renderer.domElement);
            }
        },
        {
            key: "tick",
            value: function tick() {
                var _this = this;
                var time = this.clock.getElapsedTime();
                this.planes.forEach(function(plane, i) {
                    var xOff = _this.mouseX - plane.bounds.left;
                    var planeMouseX = xOff / plane.bounds.scaleX;
                    var yOff = _this.mouseY - plane.bounds.top;
                    var planeMouseY = yOff / plane.bounds.scaleY;
                    plane.tick(time, planeMouseX, planeMouseY);
                // plane.tick(time, 0.5, 0.5)
                // planeMouseX goes from 0 - 1 left to right over image
                // planeMouseY goes from 0 - 1 from top to bottom of image
                });
                this.renderer.render(this.scene, this.camera);
                window.requestAnimationFrame(function() {
                    return _this.tick();
                });
            }
        },
        {
            key: "onMouse",
            value: function onMouse(e) {
                this.mouseX = e.clientX / this.windowWidth;
                this.mouseY = e.clientY / this.windowHeight;
            }
        },
        {
            key: "onResize",
            value: function onResize() {
                var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
                this.renderer.setSize(innerWidth, innerHeight);
                this.camera.updateProjectionMatrix();
                this.windowWidth = innerWidth;
                this.windowHeight = innerHeight;
                this.planes.forEach(function(plane) {
                    plane.resize(innerWidth, innerHeight);
                });
            }
        },
        {
            key: "onScroll",
            value: function onScroll() {
                var _this = this;
                this.planes.forEach(function(plane) {
                    plane.scroll(_this.windowWidth, _this.windowHeight);
                });
            }
        }
    ]);
    return Scene;
}();
function $254a8bf927772f3f$var$scale(input, aMin, aMax, bMin, bMax) {
    return (input - aMin) * (bMax - bMin) / (aMax - aMin) + bMin;
}
function $254a8bf927772f3f$var$lerp(a, b, t) {
    return a + (b - a) * t;
}


var $1fd4177b7e772b96$exports = {};
$1fd4177b7e772b96$exports = "precision mediump float;\n#define GLSLIFY 1\n\nvarying vec2 v_uv;\nuniform sampler2D u_image;\nuniform vec2 u_mouse;\nuniform vec2 u_res;\nuniform float u_time;\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x) {\n     return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_0 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_0;\n  vec3 i1 = min( g_0.xyz, l.zxy );\n  vec3 i2 = max( g_0.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289(i);\n  vec4 p = permute( permute( permute(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\nvoid main() {\n    vec2 uv = v_uv;\n    vec2 resolution = u_res;\n\n    vec2 st = uv;\n    vec2 mouse = vec2(u_mouse.x, 1.0 - u_mouse.y);\n\n    // these make it so the mouse hover can be a circle,\n    // even if the image is not square \n    mouse.y *= resolution.y / resolution.x;\n    st.y *= resolution.y / resolution.x;\n\n    float pct = distance(st, mouse);\n    float pctadjust = smoothstep(0.4, 0.35, pct);\n    // vec2 offset = pixelSize * 10.0 * pctadjust;\n    vec2 offset = vec2(0.02 * pctadjust);\n\n    vec3 noisePos = vec3(st.x - u_time, st.y, 0.0);\n    float wave = snoise(noisePos) * 2.5 * pctadjust;\n\n    float r = texture2D(u_image, uv - offset * wave).r;\n    float g = texture2D(u_image, uv + offset * wave * 0.5).g;\n    float b = texture2D(u_image, uv + offset * wave).b;\n\n    vec4 image = texture2D(u_image, uv);\n\n    gl_FragColor = vec4(r, g, b, 1.0);\n    // gl_FragColor = vec4(st.y, 0.0, 0.0, 1.0);\n\n}";


var $7194a53bd6c21b03$exports = {};
$7194a53bd6c21b03$exports = "precision mediump float;\n#define GLSLIFY 1\nvarying vec2 v_uv;\nvarying float v_wave;\nuniform float u_amount;\nuniform float u_time;\n\nvoid main() {\n    v_uv = uv;\n    vec3 pos = position;\n\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n}";


var $d332d96ae583f536$var$loader = new $fpyje.TextureLoader();
var $d332d96ae583f536$var$planeGeometry = new $fpyje.PlaneGeometry(1, 1);
var $d332d96ae583f536$var$planeMaterial = new $fpyje.ShaderMaterial({
    vertexShader: (0, (/*@__PURE__*/$parcel$interopDefault($7194a53bd6c21b03$exports))),
    fragmentShader: (0, (/*@__PURE__*/$parcel$interopDefault($1fd4177b7e772b96$exports))),
    defines: {
        PR: window.devicePixelRatio.toFixed(1)
    }
});
var $d332d96ae583f536$var$scene = new (0, $254a8bf927772f3f$export$2e2bcd8739ae039)();
window.scene = $d332d96ae583f536$var$scene;
var $d332d96ae583f536$var$Plane = /*#__PURE__*/ function() {
    "use strict";
    function Plane(el) {
        (0, $dnGTK.default)(this, Plane);
        (0, $dK6Ta.default)(this, "bounds", {});
        this.el = el;
        this.img = el.querySelector("img");
        this.geometry = $d332d96ae583f536$var$planeGeometry;
        this.material = $d332d96ae583f536$var$planeMaterial.clone();
        this.mesh = new $fpyje.Mesh(this.geometry, this.material);
        var tex = $d332d96ae583f536$var$loader.load(this.img.src);
        this.setBounds();
        this.setPos();
        this.material.uniforms = {
            u_time: {
                value: 0
            },
            u_image: {
                type: "t",
                value: tex
            },
            u_amount: {
                value: 0
            },
            u_mouse: {
                type: "v2",
                value: new $fpyje.Vector2()
            },
            u_res: {
                type: "v2",
                value: new $fpyje.Vector2(this.bounds.width, this.bounds.height)
            }
        };
    }
    (0, $9SLyD.default)(Plane, [
        {
            key: "setBounds",
            value: function setBounds() {
                var rect = this.img.getBoundingClientRect();
                this.bounds = {
                    left: rect.left / $d332d96ae583f536$var$scene.windowWidth,
                    right: rect.right / $d332d96ae583f536$var$scene.windowWidth,
                    width: rect.width,
                    scaleX: rect.width / $d332d96ae583f536$var$scene.windowWidth,
                    top: rect.top / $d332d96ae583f536$var$scene.windowHeight,
                    bottom: rect.bottom / $d332d96ae583f536$var$scene.windowHeight,
                    height: rect.height,
                    scaleY: rect.height / $d332d96ae583f536$var$scene.windowHeight
                };
            }
        },
        {
            key: "setPos",
            value: function setPos() {
                this.mesh.scale.set(this.bounds.scaleX, this.bounds.scaleY);
                this.mesh.position.x = this.bounds.left + this.bounds.scaleX / 2;
                this.mesh.position.y = -this.bounds.top - this.bounds.scaleY / 2;
            }
        },
        {
            key: "resize",
            value: function resize() {
                this.setBounds();
                this.setPos();
            }
        },
        {
            key: "scroll",
            value: function scroll() {
                this.setBounds();
                this.setPos();
            }
        },
        {
            key: "tick",
            value: function tick(time, mouseX, mouseY) {
                this.material.uniforms.u_time.value = time;
                this.material.uniforms.u_mouse.value = [
                    mouseX,
                    mouseY
                ];
            }
        }
    ]);
    return Plane;
}();
var $d332d96ae583f536$var$els = document.querySelectorAll(".plane-wrap");
window.planes = [];
function $d332d96ae583f536$var$initPlane(el) {
    var plane = new $d332d96ae583f536$var$Plane(el);
    $d332d96ae583f536$var$scene.addPlane(plane);
    window.planes.push(plane);
}
$d332d96ae583f536$var$els.forEach(function(el) {
    var img = el.querySelector("img");
    if (img.complete) $d332d96ae583f536$var$initPlane(el);
    else img.addEventListener("load", function() {
        return $d332d96ae583f536$var$initPlane(el);
    });
});

})();
//# sourceMappingURL=index.0853fd0a.js.map
