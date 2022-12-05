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


var $eNF9K = parcelRequire("eNF9K");
class $ede2607bc5a82ab4$export$2e2bcd8739ae039 {
    firstMouseMove(e) {
        this.mouseX = e.clientX / this.windowWidth;
        this.mouseY = e.clientY / this.windowHeight;
        this.planes.forEach((plane)=>{
            let xOff = this.mouseX - plane.bounds.left;
            plane.mouseX = xOff / plane.bounds.scaleX;
            let yOff = this.mouseY - plane.bounds.top;
            plane.mouseY = yOff / plane.bounds.scaleY;
        });
    }
    addPlane(plane) {
        this.scene.add(plane.mesh);
        this.planes.push(plane);
    }
    addToDom() {
        document.body.appendChild(this.renderer.domElement);
    }
    tick() {
        let time = this.clock.getElapsedTime();
        this.planes.forEach((plane, i)=>{
            let xOff = this.mouseX - plane.bounds.left;
            let planeMouseX = xOff / plane.bounds.scaleX;
            let yOff = this.mouseY - plane.bounds.top;
            let planeMouseY = yOff / plane.bounds.scaleY;
            plane.tick(time, planeMouseX, planeMouseY);
        // plane.tick(time, 0.5, 0.5)
        // planeMouseX goes from 0 - 1 left to right over image
        // planeMouseY goes from 0 - 1 from top to bottom of image
        });
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(()=>this.tick());
    }
    onMouse(e) {
        this.mouseX = e.clientX / this.windowWidth;
        this.mouseY = e.clientY / this.windowHeight;
    }
    onResize() {
        let { innerWidth: innerWidth , innerHeight: innerHeight  } = window;
        this.renderer.setSize(innerWidth, innerHeight);
        this.camera.updateProjectionMatrix();
        this.windowWidth = innerWidth;
        this.windowHeight = innerHeight;
        this.planes.forEach((plane)=>{
            plane.resize(innerWidth, innerHeight);
        });
    }
    onScroll() {
        this.planes.forEach((plane)=>{
            plane.scroll(this.windowWidth, this.windowHeight);
        });
    }
    constructor(){
        (0, $bb679dc22b052927$export$2e2bcd8739ae039)(this, "planes", []);
        (0, $bb679dc22b052927$export$2e2bcd8739ae039)(this, "mouseX", 0);
        (0, $bb679dc22b052927$export$2e2bcd8739ae039)(this, "mouseY", 0);
        let { innerWidth: innerWidth , innerHeight: innerHeight  } = window;
        this.windowWidth = innerWidth;
        this.windowHeight = innerHeight;
        this.scene = new $eNF9K.Scene();
        this.camera = new $eNF9K.OrthographicCamera(0, 1, 0, -1);
        this.camera.position.set(0, 0, 1);
        this.renderer = new $eNF9K.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(innerWidth, innerHeight);
        this.clock = new $eNF9K.Clock();
        this.addToDom();
        this.onResize();
        window.requestAnimationFrame(()=>this.tick());
        window.addEventListener("resize", ()=>this.onResize());
        window.addEventListener("scroll", ()=>this.onScroll());
        window.addEventListener("mousemove", (e)=>this.onMouse(e));
        window.addEventListener("mousemove", (e)=>this.firstMouseMove(e), {
            once: true
        });
    }
}
function $ede2607bc5a82ab4$var$scale(input, aMin, aMax, bMin, bMax) {
    return (input - aMin) * (bMax - bMin) / (aMax - aMin) + bMin;
}
function $ede2607bc5a82ab4$var$lerp(a, b, t) {
    return a + (b - a) * t;
}


var $664b239bdc89d340$exports = {};
$664b239bdc89d340$exports = "#define GLSLIFY 1\nvarying vec2 v_uv;\n\nvoid main() {\n  v_uv = uv;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}";


var $c03b6067ce5a702c$exports = {};
$c03b6067ce5a702c$exports = "#define GLSLIFY 1\nuniform vec2 u_res;\nuniform sampler2D u_image;\nuniform vec2 u_mouse;\nuniform float u_time;\n\nvarying vec2 v_uv;\n\nvoid main() {\n    vec2 uv = v_uv;\n    vec2 resolution = u_res * PR;\n\n    vec2 st = uv;\n    vec2 mouse = vec2(u_mouse.x, 1.0 - u_mouse.y);\n    // these make it so the mouse hover can be a circle,\n    // even if the image is not square \n    mouse.x *= resolution.x / resolution.y;\n    st.x *= resolution.x / resolution.y;\n\n    float pct = distance(st, mouse);\n    float offset = smoothstep(0.4, 0.399, pct);\n\n    vec4 image = texture2D(u_image, v_uv);\n    vec4 inverted = vec4(vec3(1.0 - image.rgb), 1.0);\n    vec4 img = mix(image, inverted, offset);\n\n    gl_FragColor = img;\n}";


const $a59218e1a4fa094a$var$loader = new $eNF9K.TextureLoader();
const $a59218e1a4fa094a$var$scene = new (0, $ede2607bc5a82ab4$export$2e2bcd8739ae039)();
const $a59218e1a4fa094a$var$planeGeometry = new $eNF9K.PlaneGeometry(1, 1);
const $a59218e1a4fa094a$var$planeMaterial = new $eNF9K.ShaderMaterial({
    vertexShader: (/*@__PURE__*/$parcel$interopDefault($664b239bdc89d340$exports)),
    fragmentShader: (/*@__PURE__*/$parcel$interopDefault($c03b6067ce5a702c$exports)),
    defines: {
        PR: window.devicePixelRatio.toFixed(1)
    }
});
class $a59218e1a4fa094a$var$Plane {
    setBounds() {
        const rect = this.img.getBoundingClientRect();
        this.bounds = {
            left: rect.left / $a59218e1a4fa094a$var$scene.windowWidth,
            right: rect.right / $a59218e1a4fa094a$var$scene.windowWidth,
            width: rect.width,
            scaleX: rect.width / $a59218e1a4fa094a$var$scene.windowWidth,
            top: rect.top / $a59218e1a4fa094a$var$scene.windowHeight,
            bottom: rect.bottom / $a59218e1a4fa094a$var$scene.windowHeight,
            height: rect.height,
            scaleY: rect.height / $a59218e1a4fa094a$var$scene.windowHeight
        };
    }
    setPos() {
        this.mesh.scale.set(this.bounds.scaleX, this.bounds.scaleY);
        this.mesh.position.x = this.bounds.left + this.bounds.scaleX / 2;
        this.mesh.position.y = -this.bounds.top - this.bounds.scaleY / 2;
    }
    resize() {
        this.setBounds();
        this.setPos();
    }
    scroll() {
        this.setBounds();
        this.setPos();
    }
    tick(time, mouseX, mouseY) {
        this.material.uniforms.u_time.value = time;
        this.mouseX = $a59218e1a4fa094a$var$lerp(this.mouseX, mouseX, 0.1);
        this.mouseY = $a59218e1a4fa094a$var$lerp(this.mouseY, mouseY, 0.1);
        this.material.uniforms.u_mouse.value = [
            this.mouseX,
            this.mouseY
        ];
    }
    constructor(el){
        (0, $bb679dc22b052927$export$2e2bcd8739ae039)(this, "bounds", {});
        (0, $bb679dc22b052927$export$2e2bcd8739ae039)(this, "mouseX", -1);
        (0, $bb679dc22b052927$export$2e2bcd8739ae039)(this, "mouseY", -1);
        this.el = el;
        this.img = el.querySelector("img");
        this.geometry = $a59218e1a4fa094a$var$planeGeometry;
        this.material = $a59218e1a4fa094a$var$planeMaterial.clone();
        this.mesh = new $eNF9K.Mesh(this.geometry, this.material);
        let tex = $a59218e1a4fa094a$var$loader.load(this.img.src);
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
                value: new $eNF9K.Vector2()
            },
            u_res: {
                type: "v2",
                value: new $eNF9K.Vector2(this.bounds.width, this.bounds.height)
            }
        };
    }
}
let $a59218e1a4fa094a$var$els = document.querySelectorAll(".plane-wrap");
window.planes = [];
function $a59218e1a4fa094a$var$initPlane(el) {
    let plane = new $a59218e1a4fa094a$var$Plane(el);
    $a59218e1a4fa094a$var$scene.addPlane(plane);
    window.planes.push(plane);
}
$a59218e1a4fa094a$var$els.forEach((el)=>{
    let img = el.querySelector("img");
    if (img.complete) $a59218e1a4fa094a$var$initPlane(el);
    else img.addEventListener("load", ()=>$a59218e1a4fa094a$var$initPlane(el));
});
function $a59218e1a4fa094a$var$lerp(a, b, t) {
    return a + (b - a) * t;
}


//# sourceMappingURL=index.b3f44eb8.js.map
