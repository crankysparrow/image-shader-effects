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

var $eNF9K = parcelRequire("eNF9K");
/**
 * Full-screen textured quad shader
 */ var $b7285e2881b1aef9$export$57f84a24a9a6130d = {
    uniforms: {
        "tDiffuse": {
            value: null
        },
        "opacity": {
            value: 1.0
        }
    },
    vertexShader: /* glsl */ `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
    fragmentShader: /* glsl */ `

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;

		}`
};



var $eNF9K = parcelRequire("eNF9K");

var $eNF9K = parcelRequire("eNF9K");
class $981c2bc119598b38$export$802bc10488da99c7 {
    setSize() {}
    render() {
        console.error("THREE.Pass: .render() must be implemented in derived pass.");
    }
    constructor(){
        // if set to true, the pass is processed by the composer
        this.enabled = true;
        // if set to true, the pass indicates to swap read and write buffer after rendering
        this.needsSwap = true;
        // if set to true, the pass clears its buffer before rendering
        this.clear = false;
        // if set to true, the result of the pass is rendered to screen. This is set automatically by EffectComposer.
        this.renderToScreen = false;
    }
}
// Helper for passes that need to fill the viewport with a single quad.
const $981c2bc119598b38$var$_camera = new (0, $eNF9K.OrthographicCamera)(-1, 1, 1, -1, 0, 1);
// https://github.com/mrdoob/three.js/pull/21358
const $981c2bc119598b38$var$_geometry = new (0, $eNF9K.BufferGeometry)();
$981c2bc119598b38$var$_geometry.setAttribute("position", new (0, $eNF9K.Float32BufferAttribute)([
    -1,
    3,
    0,
    -1,
    -1,
    0,
    3,
    -1,
    0
], 3));
$981c2bc119598b38$var$_geometry.setAttribute("uv", new (0, $eNF9K.Float32BufferAttribute)([
    0,
    2,
    0,
    0,
    2,
    0
], 2));
class $981c2bc119598b38$export$3983474c8e6e978b {
    dispose() {
        this._mesh.geometry.dispose();
    }
    render(renderer) {
        renderer.render(this._mesh, $981c2bc119598b38$var$_camera);
    }
    get material() {
        return this._mesh.material;
    }
    set material(value) {
        this._mesh.material = value;
    }
    constructor(material){
        this._mesh = new (0, $eNF9K.Mesh)($981c2bc119598b38$var$_geometry, material);
    }
}


class $bf1bbbc292db1fab$export$c55093fd4f9e42f0 extends (0, $981c2bc119598b38$export$802bc10488da99c7) {
    render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {
        if (this.uniforms[this.textureID]) this.uniforms[this.textureID].value = readBuffer.texture;
        this.fsQuad.material = this.material;
        if (this.renderToScreen) {
            renderer.setRenderTarget(null);
            this.fsQuad.render(renderer);
        } else {
            renderer.setRenderTarget(writeBuffer);
            // TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600
            if (this.clear) renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
            this.fsQuad.render(renderer);
        }
    }
    constructor(shader, textureID){
        super();
        this.textureID = textureID !== undefined ? textureID : "tDiffuse";
        if (shader instanceof (0, $eNF9K.ShaderMaterial)) {
            this.uniforms = shader.uniforms;
            this.material = shader;
        } else if (shader) {
            this.uniforms = (0, $eNF9K.UniformsUtils).clone(shader.uniforms);
            this.material = new (0, $eNF9K.ShaderMaterial)({
                defines: Object.assign({}, shader.defines),
                uniforms: this.uniforms,
                vertexShader: shader.vertexShader,
                fragmentShader: shader.fragmentShader
            });
        }
        this.fsQuad = new (0, $981c2bc119598b38$export$3983474c8e6e978b)(this.material);
    }
}



class $90fc5ba8125e0768$export$bb424a4005d6dde0 extends (0, $981c2bc119598b38$export$802bc10488da99c7) {
    render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {
        const context = renderer.getContext();
        const state = renderer.state;
        // don't update color or depth
        state.buffers.color.setMask(false);
        state.buffers.depth.setMask(false);
        // lock buffers
        state.buffers.color.setLocked(true);
        state.buffers.depth.setLocked(true);
        // set up stencil
        let writeValue, clearValue;
        if (this.inverse) {
            writeValue = 0;
            clearValue = 1;
        } else {
            writeValue = 1;
            clearValue = 0;
        }
        state.buffers.stencil.setTest(true);
        state.buffers.stencil.setOp(context.REPLACE, context.REPLACE, context.REPLACE);
        state.buffers.stencil.setFunc(context.ALWAYS, writeValue, 0xffffffff);
        state.buffers.stencil.setClear(clearValue);
        state.buffers.stencil.setLocked(true);
        // draw into the stencil buffer
        renderer.setRenderTarget(readBuffer);
        if (this.clear) renderer.clear();
        renderer.render(this.scene, this.camera);
        renderer.setRenderTarget(writeBuffer);
        if (this.clear) renderer.clear();
        renderer.render(this.scene, this.camera);
        // unlock color and depth buffer for subsequent rendering
        state.buffers.color.setLocked(false);
        state.buffers.depth.setLocked(false);
        // only render where stencil is set to 1
        state.buffers.stencil.setLocked(false);
        state.buffers.stencil.setFunc(context.EQUAL, 1, 0xffffffff); // draw if == 1
        state.buffers.stencil.setOp(context.KEEP, context.KEEP, context.KEEP);
        state.buffers.stencil.setLocked(true);
    }
    constructor(scene, camera){
        super();
        this.scene = scene;
        this.camera = camera;
        this.clear = true;
        this.needsSwap = false;
        this.inverse = false;
    }
}
class $90fc5ba8125e0768$export$8d8650aed29c6251 extends (0, $981c2bc119598b38$export$802bc10488da99c7) {
    render(renderer /*, writeBuffer, readBuffer, deltaTime, maskActive */ ) {
        renderer.state.buffers.stencil.setLocked(false);
        renderer.state.buffers.stencil.setTest(false);
    }
    constructor(){
        super();
        this.needsSwap = false;
    }
}



class $870530fa1955d012$export$7fe01e6ab8aa748c {
    swapBuffers() {
        const tmp = this.readBuffer;
        this.readBuffer = this.writeBuffer;
        this.writeBuffer = tmp;
    }
    addPass(pass) {
        this.passes.push(pass);
        pass.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    insertPass(pass, index) {
        this.passes.splice(index, 0, pass);
        pass.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
    }
    removePass(pass) {
        const index = this.passes.indexOf(pass);
        if (index !== -1) this.passes.splice(index, 1);
    }
    isLastEnabledPass(passIndex) {
        for(let i = passIndex + 1; i < this.passes.length; i++){
            if (this.passes[i].enabled) return false;
        }
        return true;
    }
    render(deltaTime) {
        // deltaTime value is in seconds
        if (deltaTime === undefined) deltaTime = this.clock.getDelta();
        const currentRenderTarget = this.renderer.getRenderTarget();
        let maskActive = false;
        for(let i = 0, il = this.passes.length; i < il; i++){
            const pass = this.passes[i];
            if (pass.enabled === false) continue;
            pass.renderToScreen = this.renderToScreen && this.isLastEnabledPass(i);
            pass.render(this.renderer, this.writeBuffer, this.readBuffer, deltaTime, maskActive);
            if (pass.needsSwap) {
                if (maskActive) {
                    const context = this.renderer.getContext();
                    const stencil = this.renderer.state.buffers.stencil;
                    //context.stencilFunc( context.NOTEQUAL, 1, 0xffffffff );
                    stencil.setFunc(context.NOTEQUAL, 1, 0xffffffff);
                    this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, deltaTime);
                    //context.stencilFunc( context.EQUAL, 1, 0xffffffff );
                    stencil.setFunc(context.EQUAL, 1, 0xffffffff);
                }
                this.swapBuffers();
            }
            if ((0, $90fc5ba8125e0768$export$bb424a4005d6dde0) !== undefined) {
                if (pass instanceof (0, $90fc5ba8125e0768$export$bb424a4005d6dde0)) maskActive = true;
                else if (pass instanceof (0, $90fc5ba8125e0768$export$8d8650aed29c6251)) maskActive = false;
            }
        }
        this.renderer.setRenderTarget(currentRenderTarget);
    }
    reset(renderTarget) {
        if (renderTarget === undefined) {
            const size = this.renderer.getSize(new (0, $eNF9K.Vector2)());
            this._pixelRatio = this.renderer.getPixelRatio();
            this._width = size.width;
            this._height = size.height;
            renderTarget = this.renderTarget1.clone();
            renderTarget.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
        }
        this.renderTarget1.dispose();
        this.renderTarget2.dispose();
        this.renderTarget1 = renderTarget;
        this.renderTarget2 = renderTarget.clone();
        this.writeBuffer = this.renderTarget1;
        this.readBuffer = this.renderTarget2;
    }
    setSize(width, height) {
        this._width = width;
        this._height = height;
        const effectiveWidth = this._width * this._pixelRatio;
        const effectiveHeight = this._height * this._pixelRatio;
        this.renderTarget1.setSize(effectiveWidth, effectiveHeight);
        this.renderTarget2.setSize(effectiveWidth, effectiveHeight);
        for(let i = 0; i < this.passes.length; i++)this.passes[i].setSize(effectiveWidth, effectiveHeight);
    }
    setPixelRatio(pixelRatio) {
        this._pixelRatio = pixelRatio;
        this.setSize(this._width, this._height);
    }
    constructor(renderer, renderTarget){
        this.renderer = renderer;
        if (renderTarget === undefined) {
            const parameters = {
                minFilter: (0, $eNF9K.LinearFilter),
                magFilter: (0, $eNF9K.LinearFilter),
                format: (0, $eNF9K.RGBAFormat)
            };
            const size = renderer.getSize(new (0, $eNF9K.Vector2)());
            this._pixelRatio = renderer.getPixelRatio();
            this._width = size.width;
            this._height = size.height;
            renderTarget = new (0, $eNF9K.WebGLRenderTarget)(this._width * this._pixelRatio, this._height * this._pixelRatio, parameters);
            renderTarget.texture.name = "EffectComposer.rt1";
        } else {
            this._pixelRatio = 1;
            this._width = renderTarget.width;
            this._height = renderTarget.height;
        }
        this.renderTarget1 = renderTarget;
        this.renderTarget2 = renderTarget.clone();
        this.renderTarget2.texture.name = "EffectComposer.rt2";
        this.writeBuffer = this.renderTarget1;
        this.readBuffer = this.renderTarget2;
        this.renderToScreen = true;
        this.passes = [];
        // dependencies
        if ((0, $b7285e2881b1aef9$export$57f84a24a9a6130d) === undefined) console.error("THREE.EffectComposer relies on CopyShader");
        if ((0, $bf1bbbc292db1fab$export$c55093fd4f9e42f0) === undefined) console.error("THREE.EffectComposer relies on ShaderPass");
        this.copyPass = new (0, $bf1bbbc292db1fab$export$c55093fd4f9e42f0)((0, $b7285e2881b1aef9$export$57f84a24a9a6130d));
        this.clock = new (0, $eNF9K.Clock)();
    }
}
class $870530fa1955d012$export$802bc10488da99c7 {
    setSize() {}
    render() {
        console.error("THREE.Pass: .render() must be implemented in derived pass.");
    }
    constructor(){
        // if set to true, the pass is processed by the composer
        this.enabled = true;
        // if set to true, the pass indicates to swap read and write buffer after rendering
        this.needsSwap = true;
        // if set to true, the pass clears its buffer before rendering
        this.clear = false;
        // if set to true, the result of the pass is rendered to screen. This is set automatically by EffectComposer.
        this.renderToScreen = false;
    }
}
// Helper for passes that need to fill the viewport with a single quad.
const $870530fa1955d012$var$_camera = new (0, $eNF9K.OrthographicCamera)(-1, 1, 1, -1, 0, 1);
// https://github.com/mrdoob/three.js/pull/21358
const $870530fa1955d012$var$_geometry = new (0, $eNF9K.BufferGeometry)();
$870530fa1955d012$var$_geometry.setAttribute("position", new (0, $eNF9K.Float32BufferAttribute)([
    -1,
    3,
    0,
    -1,
    -1,
    0,
    3,
    -1,
    0
], 3));
$870530fa1955d012$var$_geometry.setAttribute("uv", new (0, $eNF9K.Float32BufferAttribute)([
    0,
    2,
    0,
    0,
    2,
    0
], 2));
class $870530fa1955d012$export$3983474c8e6e978b {
    dispose() {
        this._mesh.geometry.dispose();
    }
    render(renderer) {
        renderer.render(this._mesh, $870530fa1955d012$var$_camera);
    }
    get material() {
        return this._mesh.material;
    }
    set material(value) {
        this._mesh.material = value;
    }
    constructor(material){
        this._mesh = new (0, $eNF9K.Mesh)($870530fa1955d012$var$_geometry, material);
    }
}



var $eNF9K = parcelRequire("eNF9K");

class $1ee953c98900ef83$export$f63ea822f020b5b0 extends (0, $981c2bc119598b38$export$802bc10488da99c7) {
    render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {
        const oldAutoClear = renderer.autoClear;
        renderer.autoClear = false;
        let oldClearAlpha, oldOverrideMaterial;
        if (this.overrideMaterial !== undefined) {
            oldOverrideMaterial = this.scene.overrideMaterial;
            this.scene.overrideMaterial = this.overrideMaterial;
        }
        if (this.clearColor) {
            renderer.getClearColor(this._oldClearColor);
            oldClearAlpha = renderer.getClearAlpha();
            renderer.setClearColor(this.clearColor, this.clearAlpha);
        }
        if (this.clearDepth) renderer.clearDepth();
        renderer.setRenderTarget(this.renderToScreen ? null : readBuffer);
        // TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600
        if (this.clear) renderer.clear(renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil);
        renderer.render(this.scene, this.camera);
        if (this.clearColor) renderer.setClearColor(this._oldClearColor, oldClearAlpha);
        if (this.overrideMaterial !== undefined) this.scene.overrideMaterial = oldOverrideMaterial;
        renderer.autoClear = oldAutoClear;
    }
    constructor(scene, camera, overrideMaterial, clearColor, clearAlpha){
        super();
        this.scene = scene;
        this.camera = camera;
        this.overrideMaterial = overrideMaterial;
        this.clearColor = clearColor;
        this.clearAlpha = clearAlpha !== undefined ? clearAlpha : 0;
        this.clear = true;
        this.clearDepth = false;
        this.needsSwap = false;
        this._oldClearColor = new (0, $eNF9K.Color)();
    }
}



var $ee0b0adec7ea7ab2$exports = {};
$ee0b0adec7ea7ab2$exports = "#define GLSLIFY 1\nuniform float time;\nuniform sampler2D tDiffuse;\nuniform vec2 resolution;\nvarying vec2 vUv;\nuniform vec2 uMouse;\n\nfloat circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {\n    uv -= disc_center;\n    uv*=resolution;\n    float dist = sqrt(dot(uv, uv));\n    return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);\n}\nvoid main()  {\n    vec2 newUV = vUv;\n    float c = circle(vUv, uMouse, 0.0, 0.2);\n    float r = texture2D(tDiffuse, newUV.xy += c * (0.1 * .5)).x;\n    float g = texture2D(tDiffuse, newUV.xy += c * (0.1 * .525)).y;\n    float b = texture2D(tDiffuse, newUV.xy += c * (0.1 * .55)).z;\n    vec4 color = vec4(r, g, b, 1.);\n    gl_FragColor = color;\n}";


var $82e71465fb7e5ad8$exports = {};
$82e71465fb7e5ad8$exports = "precision mediump float;\n#define GLSLIFY 1\nuniform vec2 u_res;\nuniform sampler2D tDiffuse;\nuniform vec2 u_mouse;\nuniform float u_time;\n\nvarying vec2 v_uv;\n\nfloat circle(in vec2 _st, in vec2 mouse, in float _radius){\n    vec2 dist = _st-mouse;\n	return 1.0 - smoothstep(0.0, 0.01, dot(dist,dist) * 8.0);\n    // return step(_radius, dot(dist,dist) * 4.0);\n}\n\nvoid main() {\n\n    vec2 uv = v_uv;\n    vec2 resolution = u_res * PR;\n\n    vec2 st = gl_FragCoord.xy / resolution.xy;\n    vec2 adjust = vec2(0.0, (resolution.y / resolution.x) * 0.5);\n    st += adjust;\n    st.y *= resolution.y / resolution.x;\n\n    vec2 mouse = vec2(u_mouse.x / u_res.x, 1.0 - (u_mouse.y / u_res.y));\n    mouse += adjust;\n    mouse.y *= u_res.y / u_res.x;\n\n    float pct = smoothstep(0.2, 0.001, distance(st, mouse));\n    float distort = pct * 0.01;\n\n    gl_FragColor = texture2D(tDiffuse, uv + vec2(distort, distort));\n\n}";


var $fd4c222ab64e6fa3$exports = {};
$fd4c222ab64e6fa3$exports = "precision mediump float;\n#define GLSLIFY 1\nvarying vec2 v_uv;\nuniform vec2 u_mouse;\nuniform vec2 u_res;\n\nvoid main() {\n    v_uv = uv;\n\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}";


const $93fb6c15359c84af$var$loader = new $eNF9K.TextureLoader();
if (null) null.dispose(()=>{
    window.location.reload();
});
var $93fb6c15359c84af$var$camera, $93fb6c15359c84af$var$scene, $93fb6c15359c84af$var$renderer, $93fb6c15359c84af$var$composer, $93fb6c15359c84af$var$renderPass, $93fb6c15359c84af$var$customPass;
var $93fb6c15359c84af$var$geometry, $93fb6c15359c84af$var$material, $93fb6c15359c84af$var$mesh, $93fb6c15359c84af$var$texture, $93fb6c15359c84af$var$u_mouse = new $eNF9K.Vector2(0, 0);
let $93fb6c15359c84af$var$theimage = document.getElementById("texture");
$93fb6c15359c84af$var$texture = $93fb6c15359c84af$var$loader.load($93fb6c15359c84af$var$theimage.src);
$93fb6c15359c84af$var$init();
$93fb6c15359c84af$var$animate();
function $93fb6c15359c84af$var$init() {
    $93fb6c15359c84af$var$scene = new $eNF9K.Scene();
    // https://codepen.io/trusktr/pen/EbOoNx
    let perspective = 800;
    let fov = 180 * (2 * Math.atan(innerHeight / 2 / perspective)) / Math.PI;
    $93fb6c15359c84af$var$camera = new $eNF9K.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    $93fb6c15359c84af$var$camera.position.set(0, 0, perspective);
    $93fb6c15359c84af$var$geometry = new $eNF9K.PlaneGeometry(500, 333);
    $93fb6c15359c84af$var$material = new $eNF9K.MeshBasicMaterial({
        map: $93fb6c15359c84af$var$texture
    });
    $93fb6c15359c84af$var$mesh = new $eNF9K.Mesh($93fb6c15359c84af$var$geometry, $93fb6c15359c84af$var$material);
    $93fb6c15359c84af$var$scene.add($93fb6c15359c84af$var$mesh);
    $93fb6c15359c84af$var$renderer = new $eNF9K.WebGLRenderer({
        antialias: true
    });
    $93fb6c15359c84af$var$renderer.setSize(window.innerWidth, window.innerHeight);
    $93fb6c15359c84af$var$renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.outputEncoding = THREE.sRGBEncoding
    document.body.appendChild($93fb6c15359c84af$var$renderer.domElement);
    window.renderer = $93fb6c15359c84af$var$renderer;
    // post processing
    $93fb6c15359c84af$var$composer = new (0, $870530fa1955d012$export$7fe01e6ab8aa748c)($93fb6c15359c84af$var$renderer);
    $93fb6c15359c84af$var$renderPass = new (0, $1ee953c98900ef83$export$f63ea822f020b5b0)($93fb6c15359c84af$var$scene, $93fb6c15359c84af$var$camera);
    $93fb6c15359c84af$var$composer.addPass($93fb6c15359c84af$var$renderPass);
    var myEffect = {
        uniforms: {
            tDiffuse: {
                value: null
            },
            u_res: {
                value: new $eNF9K.Vector2(window.innerWidth, window.innerHeight)
            },
            // resolution: { value: new THREE.Vector2(1, window.innerHeight / window.innerWidth) },
            u_mouse: {
                value: new $eNF9K.Vector2(-10, -10)
            },
            u_time: {
                value: 0
            }
        },
        vertexShader: (0, (/*@__PURE__*/$parcel$interopDefault($fd4c222ab64e6fa3$exports))),
        fragmentShader: (0, (/*@__PURE__*/$parcel$interopDefault($82e71465fb7e5ad8$exports))),
        defines: {
            PR: window.devicePixelRatio.toFixed(1)
        }
    };
    $93fb6c15359c84af$var$customPass = new (0, $bf1bbbc292db1fab$export$c55093fd4f9e42f0)(myEffect);
    $93fb6c15359c84af$var$customPass.renderToScreen = true;
    $93fb6c15359c84af$var$composer.addPass($93fb6c15359c84af$var$customPass);
}
document.addEventListener("mousemove", (e)=>{
    // mousemove / touchmove
    // u_mouse.x = e.clientX / window.innerWidth
    // u_mouse.y = 1 - e.clientY / window.innerHeight
    $93fb6c15359c84af$var$u_mouse.x = e.clientX;
    $93fb6c15359c84af$var$u_mouse.y = e.clientY;
});
function $93fb6c15359c84af$var$animate() {
    $93fb6c15359c84af$var$customPass.uniforms.u_mouse.value = $93fb6c15359c84af$var$u_mouse;
    $93fb6c15359c84af$var$customPass.uniforms.u_time.value++;
    requestAnimationFrame($93fb6c15359c84af$var$animate);
    // renderer.render(scene, camera)
    $93fb6c15359c84af$var$composer.render();
}


//# sourceMappingURL=index.9c6ae2c3.js.map
