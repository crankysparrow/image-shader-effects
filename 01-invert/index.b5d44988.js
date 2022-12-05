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


var $83a28cb3e814b40d$exports = {};
$83a28cb3e814b40d$exports = "#define GLSLIFY 1\nvarying vec2 v_uv;\n\nvoid main() {\n  v_uv = uv;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}";


var $0621ec2e8b10d388$exports = {};
$0621ec2e8b10d388$exports = "#define GLSLIFY 1\nuniform vec2 u_res;\nuniform sampler2D u_image;\nuniform vec2 u_mouse;\nuniform float u_time;\n\nvarying vec2 v_uv;\n\nvoid main() {\n    vec2 uv = v_uv;\n    vec2 resolution = u_res * PR;\n\n    vec2 st = uv;\n    vec2 mouse = vec2(u_mouse.x, 1.0 - u_mouse.y);\n    // these make it so the mouse hover can be a circle,\n    // even if the image is not square \n    mouse.x *= resolution.x / resolution.y;\n    st.x *= resolution.x / resolution.y;\n\n    float pct = distance(st, mouse);\n    float offset = smoothstep(0.4, 0.399, pct);\n\n    vec4 image = texture2D(u_image, v_uv);\n    vec4 inverted = vec4(vec3(1.0 - image.rgb), 1.0);\n    vec4 img = mix(image, inverted, offset);\n\n    gl_FragColor = img;\n}";


var $b9212fa8a70c9ce6$var$loader = new $fpyje.TextureLoader();
var $b9212fa8a70c9ce6$var$scene = new (0, $254a8bf927772f3f$export$2e2bcd8739ae039)();
var $b9212fa8a70c9ce6$var$planeGeometry = new $fpyje.PlaneGeometry(1, 1);
var $b9212fa8a70c9ce6$var$planeMaterial = new $fpyje.ShaderMaterial({
    vertexShader: (0, (/*@__PURE__*/$parcel$interopDefault($83a28cb3e814b40d$exports))),
    fragmentShader: (0, (/*@__PURE__*/$parcel$interopDefault($0621ec2e8b10d388$exports))),
    defines: {
        PR: window.devicePixelRatio.toFixed(1)
    }
});
var $b9212fa8a70c9ce6$var$Plane = /*#__PURE__*/ function() {
    "use strict";
    function Plane(el) {
        (0, $dnGTK.default)(this, Plane);
        (0, $dK6Ta.default)(this, "bounds", {});
        (0, $dK6Ta.default)(this, "mouseX", -1);
        (0, $dK6Ta.default)(this, "mouseY", -1);
        this.el = el;
        this.img = el.querySelector("img");
        this.geometry = $b9212fa8a70c9ce6$var$planeGeometry;
        this.material = $b9212fa8a70c9ce6$var$planeMaterial.clone();
        this.mesh = new $fpyje.Mesh(this.geometry, this.material);
        var tex = $b9212fa8a70c9ce6$var$loader.load(this.img.src);
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
                    left: rect.left / $b9212fa8a70c9ce6$var$scene.windowWidth,
                    right: rect.right / $b9212fa8a70c9ce6$var$scene.windowWidth,
                    width: rect.width,
                    scaleX: rect.width / $b9212fa8a70c9ce6$var$scene.windowWidth,
                    top: rect.top / $b9212fa8a70c9ce6$var$scene.windowHeight,
                    bottom: rect.bottom / $b9212fa8a70c9ce6$var$scene.windowHeight,
                    height: rect.height,
                    scaleY: rect.height / $b9212fa8a70c9ce6$var$scene.windowHeight
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
                this.mouseX = $b9212fa8a70c9ce6$var$lerp(this.mouseX, mouseX, 0.1);
                this.mouseY = $b9212fa8a70c9ce6$var$lerp(this.mouseY, mouseY, 0.1);
                this.material.uniforms.u_mouse.value = [
                    this.mouseX,
                    this.mouseY
                ];
            }
        }
    ]);
    return Plane;
}();
var $b9212fa8a70c9ce6$var$els = document.querySelectorAll(".plane-wrap");
window.planes = [];
function $b9212fa8a70c9ce6$var$initPlane(el) {
    var plane = new $b9212fa8a70c9ce6$var$Plane(el);
    $b9212fa8a70c9ce6$var$scene.addPlane(plane);
    window.planes.push(plane);
}
$b9212fa8a70c9ce6$var$els.forEach(function(el) {
    var img = el.querySelector("img");
    if (img.complete) $b9212fa8a70c9ce6$var$initPlane(el);
    else img.addEventListener("load", function() {
        return $b9212fa8a70c9ce6$var$initPlane(el);
    });
});
function $b9212fa8a70c9ce6$var$lerp(a, b, t) {
    return a + (b - a) * t;
}

})();
//# sourceMappingURL=index.b5d44988.js.map
