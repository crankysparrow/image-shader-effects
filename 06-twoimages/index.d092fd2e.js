(function () {
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
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
parcelRequire.register("hEzo3", function(module, exports) {

$parcel$export(module.exports, "EffectComposer", function () { return $cda19f300821cb78$export$7fe01e6ab8aa748c; });

var $dnGTK = parcelRequire("dnGTK");

var $9SLyD = parcelRequire("9SLyD");

var $fpyje = parcelRequire("fpyje");

var $9DJRR = parcelRequire("9DJRR");

var $2EzFz = parcelRequire("2EzFz");

var $hZDTX = parcelRequire("hZDTX");

var $hZDTX = parcelRequire("hZDTX");
var $cda19f300821cb78$export$7fe01e6ab8aa748c = /*#__PURE__*/ function() {
    "use strict";
    function EffectComposer(renderer, renderTarget) {
        (0, $dnGTK.default)(this, EffectComposer);
        this.renderer = renderer;
        if (renderTarget === undefined) {
            var parameters = {
                minFilter: (0, $fpyje.LinearFilter),
                magFilter: (0, $fpyje.LinearFilter),
                format: (0, $fpyje.RGBAFormat)
            };
            var size = renderer.getSize(new (0, $fpyje.Vector2)());
            this._pixelRatio = renderer.getPixelRatio();
            this._width = size.width;
            this._height = size.height;
            renderTarget = new (0, $fpyje.WebGLRenderTarget)(this._width * this._pixelRatio, this._height * this._pixelRatio, parameters);
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
        if ((0, $9DJRR.CopyShader) === undefined) console.error("THREE.EffectComposer relies on CopyShader");
        if ((0, $2EzFz.ShaderPass) === undefined) console.error("THREE.EffectComposer relies on ShaderPass");
        this.copyPass = new (0, $2EzFz.ShaderPass)((0, $9DJRR.CopyShader));
        this.clock = new (0, $fpyje.Clock)();
    }
    (0, $9SLyD.default)(EffectComposer, [
        {
            key: "swapBuffers",
            value: function swapBuffers() {
                var tmp = this.readBuffer;
                this.readBuffer = this.writeBuffer;
                this.writeBuffer = tmp;
            }
        },
        {
            key: "addPass",
            value: function addPass(pass) {
                this.passes.push(pass);
                pass.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
            }
        },
        {
            key: "insertPass",
            value: function insertPass(pass, index) {
                this.passes.splice(index, 0, pass);
                pass.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
            }
        },
        {
            key: "removePass",
            value: function removePass(pass) {
                var index = this.passes.indexOf(pass);
                if (index !== -1) this.passes.splice(index, 1);
            }
        },
        {
            key: "isLastEnabledPass",
            value: function isLastEnabledPass(passIndex) {
                for(var i = passIndex + 1; i < this.passes.length; i++){
                    if (this.passes[i].enabled) return false;
                }
                return true;
            }
        },
        {
            key: "render",
            value: function render(deltaTime) {
                // deltaTime value is in seconds
                if (deltaTime === undefined) deltaTime = this.clock.getDelta();
                var currentRenderTarget = this.renderer.getRenderTarget();
                var maskActive = false;
                for(var i = 0, il = this.passes.length; i < il; i++){
                    var pass = this.passes[i];
                    if (pass.enabled === false) continue;
                    pass.renderToScreen = this.renderToScreen && this.isLastEnabledPass(i);
                    pass.render(this.renderer, this.writeBuffer, this.readBuffer, deltaTime, maskActive);
                    if (pass.needsSwap) {
                        if (maskActive) {
                            var context = this.renderer.getContext();
                            var stencil = this.renderer.state.buffers.stencil;
                            //context.stencilFunc( context.NOTEQUAL, 1, 0xffffffff );
                            stencil.setFunc(context.NOTEQUAL, 1, 0xffffffff);
                            this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, deltaTime);
                            //context.stencilFunc( context.EQUAL, 1, 0xffffffff );
                            stencil.setFunc(context.EQUAL, 1, 0xffffffff);
                        }
                        this.swapBuffers();
                    }
                    if ((0, $hZDTX.MaskPass) !== undefined) {
                        if (pass instanceof (0, $hZDTX.MaskPass)) maskActive = true;
                        else if (pass instanceof (0, $hZDTX.ClearMaskPass)) maskActive = false;
                    }
                }
                this.renderer.setRenderTarget(currentRenderTarget);
            }
        },
        {
            key: "reset",
            value: function reset(renderTarget) {
                if (renderTarget === undefined) {
                    var size = this.renderer.getSize(new (0, $fpyje.Vector2)());
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
        },
        {
            key: "setSize",
            value: function setSize(width, height) {
                this._width = width;
                this._height = height;
                var effectiveWidth = this._width * this._pixelRatio;
                var effectiveHeight = this._height * this._pixelRatio;
                this.renderTarget1.setSize(effectiveWidth, effectiveHeight);
                this.renderTarget2.setSize(effectiveWidth, effectiveHeight);
                for(var i = 0; i < this.passes.length; i++)this.passes[i].setSize(effectiveWidth, effectiveHeight);
            }
        },
        {
            key: "setPixelRatio",
            value: function setPixelRatio(pixelRatio) {
                this._pixelRatio = pixelRatio;
                this.setSize(this._width, this._height);
            }
        }
    ]);
    return EffectComposer;
}();
var $cda19f300821cb78$export$802bc10488da99c7 = /*#__PURE__*/ function() {
    "use strict";
    function Pass() {
        (0, $dnGTK.default)(this, Pass);
        // if set to true, the pass is processed by the composer
        this.enabled = true;
        // if set to true, the pass indicates to swap read and write buffer after rendering
        this.needsSwap = true;
        // if set to true, the pass clears its buffer before rendering
        this.clear = false;
        // if set to true, the result of the pass is rendered to screen. This is set automatically by EffectComposer.
        this.renderToScreen = false;
    }
    (0, $9SLyD.default)(Pass, [
        {
            key: "setSize",
            value: function setSize() {}
        },
        {
            key: "render",
            value: function render() {
                console.error("THREE.Pass: .render() must be implemented in derived pass.");
            }
        }
    ]);
    return Pass;
}();
// Helper for passes that need to fill the viewport with a single quad.
var $cda19f300821cb78$var$_camera = new (0, $fpyje.OrthographicCamera)(-1, 1, 1, -1, 0, 1);
// https://github.com/mrdoob/three.js/pull/21358
var $cda19f300821cb78$var$_geometry = new (0, $fpyje.BufferGeometry)();
$cda19f300821cb78$var$_geometry.setAttribute("position", new (0, $fpyje.Float32BufferAttribute)([
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
$cda19f300821cb78$var$_geometry.setAttribute("uv", new (0, $fpyje.Float32BufferAttribute)([
    0,
    2,
    0,
    0,
    2,
    0
], 2));
var $cda19f300821cb78$export$3983474c8e6e978b = /*#__PURE__*/ function() {
    "use strict";
    function FullScreenQuad(material) {
        (0, $dnGTK.default)(this, FullScreenQuad);
        this._mesh = new (0, $fpyje.Mesh)($cda19f300821cb78$var$_geometry, material);
    }
    (0, $9SLyD.default)(FullScreenQuad, [
        {
            key: "dispose",
            value: function dispose() {
                this._mesh.geometry.dispose();
            }
        },
        {
            key: "render",
            value: function render(renderer) {
                renderer.render(this._mesh, $cda19f300821cb78$var$_camera);
            }
        },
        {
            key: "material",
            get: function get() {
                return this._mesh.material;
            },
            set: function set(value) {
                this._mesh.material = value;
            }
        }
    ]);
    return FullScreenQuad;
}();

});
parcelRequire.register("9DJRR", function(module, exports) {

$parcel$export(module.exports, "CopyShader", function () { return $704b55f6c908bf7c$export$57f84a24a9a6130d; });
/**
 * Full-screen textured quad shader
 */ var $704b55f6c908bf7c$export$57f84a24a9a6130d = {
    uniforms: {
        "tDiffuse": {
            value: null
        },
        "opacity": {
            value: 1.0
        }
    },
    vertexShader: "\n\n		varying vec2 vUv;\n\n		void main() {\n\n			vUv = uv;\n			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n		}",
    fragmentShader: "\n\n		uniform float opacity;\n\n		uniform sampler2D tDiffuse;\n\n		varying vec2 vUv;\n\n		void main() {\n\n			vec4 texel = texture2D( tDiffuse, vUv );\n			gl_FragColor = opacity * texel;\n\n		}"
};

});

parcelRequire.register("2EzFz", function(module, exports) {

$parcel$export(module.exports, "ShaderPass", function () { return $1eeafc6a4f5a1c77$export$c55093fd4f9e42f0; });

var $dnGTK = parcelRequire("dnGTK");

var $9SLyD = parcelRequire("9SLyD");

var $gQI4D = parcelRequire("gQI4D");

var $a0Xbx = parcelRequire("a0Xbx");

var $fpyje = parcelRequire("fpyje");

var $S1HBh = parcelRequire("S1HBh");
var $1eeafc6a4f5a1c77$export$c55093fd4f9e42f0 = /*#__PURE__*/ function(Pass) {
    "use strict";
    (0, $gQI4D.default)(ShaderPass, Pass);
    var _super = (0, $a0Xbx.default)(ShaderPass);
    function ShaderPass(shader, textureID) {
        (0, $dnGTK.default)(this, ShaderPass);
        var _this;
        _this = _super.call(this);
        _this.textureID = textureID !== undefined ? textureID : "tDiffuse";
        if (shader instanceof (0, $fpyje.ShaderMaterial)) {
            _this.uniforms = shader.uniforms;
            _this.material = shader;
        } else if (shader) {
            _this.uniforms = (0, $fpyje.UniformsUtils).clone(shader.uniforms);
            _this.material = new (0, $fpyje.ShaderMaterial)({
                defines: Object.assign({}, shader.defines),
                uniforms: _this.uniforms,
                vertexShader: shader.vertexShader,
                fragmentShader: shader.fragmentShader
            });
        }
        _this.fsQuad = new (0, $S1HBh.FullScreenQuad)(_this.material);
        return _this;
    }
    (0, $9SLyD.default)(ShaderPass, [
        {
            key: "render",
            value: function render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {
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
        }
    ]);
    return ShaderPass;
}((0, $S1HBh.Pass));

});
parcelRequire.register("S1HBh", function(module, exports) {

$parcel$export(module.exports, "Pass", function () { return $0a265d49bec692d9$export$802bc10488da99c7; });
$parcel$export(module.exports, "FullScreenQuad", function () { return $0a265d49bec692d9$export$3983474c8e6e978b; });

var $dnGTK = parcelRequire("dnGTK");

var $9SLyD = parcelRequire("9SLyD");

var $fpyje = parcelRequire("fpyje");
var $0a265d49bec692d9$export$802bc10488da99c7 = /*#__PURE__*/ function() {
    "use strict";
    function Pass() {
        (0, $dnGTK.default)(this, Pass);
        // if set to true, the pass is processed by the composer
        this.enabled = true;
        // if set to true, the pass indicates to swap read and write buffer after rendering
        this.needsSwap = true;
        // if set to true, the pass clears its buffer before rendering
        this.clear = false;
        // if set to true, the result of the pass is rendered to screen. This is set automatically by EffectComposer.
        this.renderToScreen = false;
    }
    (0, $9SLyD.default)(Pass, [
        {
            key: "setSize",
            value: function setSize() {}
        },
        {
            key: "render",
            value: function render() {
                console.error("THREE.Pass: .render() must be implemented in derived pass.");
            }
        }
    ]);
    return Pass;
}();
// Helper for passes that need to fill the viewport with a single quad.
var $0a265d49bec692d9$var$_camera = new (0, $fpyje.OrthographicCamera)(-1, 1, 1, -1, 0, 1);
// https://github.com/mrdoob/three.js/pull/21358
var $0a265d49bec692d9$var$_geometry = new (0, $fpyje.BufferGeometry)();
$0a265d49bec692d9$var$_geometry.setAttribute("position", new (0, $fpyje.Float32BufferAttribute)([
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
$0a265d49bec692d9$var$_geometry.setAttribute("uv", new (0, $fpyje.Float32BufferAttribute)([
    0,
    2,
    0,
    0,
    2,
    0
], 2));
var $0a265d49bec692d9$export$3983474c8e6e978b = /*#__PURE__*/ function() {
    "use strict";
    function FullScreenQuad(material) {
        (0, $dnGTK.default)(this, FullScreenQuad);
        this._mesh = new (0, $fpyje.Mesh)($0a265d49bec692d9$var$_geometry, material);
    }
    (0, $9SLyD.default)(FullScreenQuad, [
        {
            key: "dispose",
            value: function dispose() {
                this._mesh.geometry.dispose();
            }
        },
        {
            key: "render",
            value: function render(renderer) {
                renderer.render(this._mesh, $0a265d49bec692d9$var$_camera);
            }
        },
        {
            key: "material",
            get: function get() {
                return this._mesh.material;
            },
            set: function set(value) {
                this._mesh.material = value;
            }
        }
    ]);
    return FullScreenQuad;
}();

});


parcelRequire.register("hZDTX", function(module, exports) {

$parcel$export(module.exports, "MaskPass", function () { return $d19715cd9fe845be$export$bb424a4005d6dde0; });
$parcel$export(module.exports, "ClearMaskPass", function () { return $d19715cd9fe845be$export$8d8650aed29c6251; });

var $dnGTK = parcelRequire("dnGTK");

var $9SLyD = parcelRequire("9SLyD");

var $gQI4D = parcelRequire("gQI4D");

var $a0Xbx = parcelRequire("a0Xbx");

var $S1HBh = parcelRequire("S1HBh");
var $d19715cd9fe845be$export$bb424a4005d6dde0 = /*#__PURE__*/ function(Pass) {
    "use strict";
    (0, $gQI4D.default)(MaskPass, Pass);
    var _super = (0, $a0Xbx.default)(MaskPass);
    function MaskPass(scene, camera) {
        (0, $dnGTK.default)(this, MaskPass);
        var _this;
        _this = _super.call(this);
        _this.scene = scene;
        _this.camera = camera;
        _this.clear = true;
        _this.needsSwap = false;
        _this.inverse = false;
        return _this;
    }
    (0, $9SLyD.default)(MaskPass, [
        {
            key: "render",
            value: function render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {
                var context = renderer.getContext();
                var state = renderer.state;
                // don't update color or depth
                state.buffers.color.setMask(false);
                state.buffers.depth.setMask(false);
                // lock buffers
                state.buffers.color.setLocked(true);
                state.buffers.depth.setLocked(true);
                // set up stencil
                var writeValue, clearValue;
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
        }
    ]);
    return MaskPass;
}((0, $S1HBh.Pass));
var $d19715cd9fe845be$export$8d8650aed29c6251 = /*#__PURE__*/ function(Pass) {
    "use strict";
    (0, $gQI4D.default)(ClearMaskPass, Pass);
    var _super = (0, $a0Xbx.default)(ClearMaskPass);
    function ClearMaskPass() {
        (0, $dnGTK.default)(this, ClearMaskPass);
        var _this;
        _this = _super.call(this);
        _this.needsSwap = false;
        return _this;
    }
    (0, $9SLyD.default)(ClearMaskPass, [
        {
            key: "render",
            value: function render(renderer /*, writeBuffer, readBuffer, deltaTime, maskActive */ ) {
                renderer.state.buffers.stencil.setLocked(false);
                renderer.state.buffers.stencil.setTest(false);
            }
        }
    ]);
    return ClearMaskPass;
}((0, $S1HBh.Pass));

});


parcelRequire.register("hLSrC", function(module, exports) {

$parcel$export(module.exports, "RenderPass", function () { return $cf010efed408cf5d$export$f63ea822f020b5b0; });

var $dnGTK = parcelRequire("dnGTK");

var $9SLyD = parcelRequire("9SLyD");

var $gQI4D = parcelRequire("gQI4D");

var $a0Xbx = parcelRequire("a0Xbx");

var $fpyje = parcelRequire("fpyje");

var $S1HBh = parcelRequire("S1HBh");
var $cf010efed408cf5d$export$f63ea822f020b5b0 = /*#__PURE__*/ function(Pass) {
    "use strict";
    (0, $gQI4D.default)(RenderPass, Pass);
    var _super = (0, $a0Xbx.default)(RenderPass);
    function RenderPass(scene, camera, overrideMaterial, clearColor, clearAlpha) {
        (0, $dnGTK.default)(this, RenderPass);
        var _this;
        _this = _super.call(this);
        _this.scene = scene;
        _this.camera = camera;
        _this.overrideMaterial = overrideMaterial;
        _this.clearColor = clearColor;
        _this.clearAlpha = clearAlpha !== undefined ? clearAlpha : 0;
        _this.clear = true;
        _this.clearDepth = false;
        _this.needsSwap = false;
        _this._oldClearColor = new (0, $fpyje.Color)();
        return _this;
    }
    (0, $9SLyD.default)(RenderPass, [
        {
            key: "render",
            value: function render(renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {
                var oldAutoClear = renderer.autoClear;
                renderer.autoClear = false;
                var oldClearAlpha, oldOverrideMaterial;
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
        }
    ]);
    return RenderPass;
}((0, $S1HBh.Pass));

});

})();
//# sourceMappingURL=index.d092fd2e.js.map
