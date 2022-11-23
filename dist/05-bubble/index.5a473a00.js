// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"3IExq":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "a0ef35dd5a473a00";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"cmd3X":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _three = require("three");
var _effectComposer = require("three/examples/jsm/postprocessing/EffectComposer");
var _renderPass = require("three/examples/jsm/postprocessing/RenderPass");
var _shaderPass = require("three/examples/jsm/postprocessing/ShaderPass");
var _frag2Glsl = require("./frag2.glsl");
var _frag2GlslDefault = parcelHelpers.interopDefault(_frag2Glsl);
var _fragGlsl = require("./frag.glsl");
var _fragGlslDefault = parcelHelpers.interopDefault(_fragGlsl);
var _vertGlsl = require("./vert.glsl");
var _vertGlslDefault = parcelHelpers.interopDefault(_vertGlsl);
const loader = new _three.TextureLoader();
if (module.hot) module.hot.dispose(()=>{
    window.location.reload();
});
var camera, scene, renderer, composer, renderPass, customPass;
var geometry, material, mesh, texture, u_mouse = new _three.Vector2(0, 0);
let theimage = document.getElementById("texture");
texture = loader.load(theimage.src);
init();
animate();
function init() {
    console.log(texture);
    scene = new _three.Scene();
    // https://codepen.io/trusktr/pen/EbOoNx
    let perspective = 800;
    let fov = 180 * (2 * Math.atan(innerHeight / 2 / perspective)) / Math.PI;
    camera = new _three.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, perspective);
    geometry = new _three.PlaneGeometry(500, 333);
    material = new _three.MeshBasicMaterial({
        map: texture
    });
    mesh = new _three.Mesh(geometry, material);
    scene.add(mesh);
    renderer = new _three.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.outputEncoding = THREE.sRGBEncoding
    document.body.appendChild(renderer.domElement);
    window.renderer = renderer;
    // post processing
    composer = new (0, _effectComposer.EffectComposer)(renderer);
    renderPass = new (0, _renderPass.RenderPass)(scene, camera);
    composer.addPass(renderPass);
    var myEffect = {
        uniforms: {
            tDiffuse: {
                value: null
            },
            u_res: {
                value: new _three.Vector2(window.innerWidth, window.innerHeight)
            },
            // resolution: { value: new THREE.Vector2(1, window.innerHeight / window.innerWidth) },
            u_mouse: {
                value: new _three.Vector2(-10, -10)
            },
            u_time: {
                value: 0
            }
        },
        vertexShader: (0, _vertGlslDefault.default),
        fragmentShader: (0, _fragGlslDefault.default),
        defines: {
            PR: window.devicePixelRatio.toFixed(1)
        }
    };
    customPass = new (0, _shaderPass.ShaderPass)(myEffect);
    customPass.renderToScreen = true;
    composer.addPass(customPass);
}
document.addEventListener("mousemove", (e)=>{
    // mousemove / touchmove
    // u_mouse.x = e.clientX / window.innerWidth
    // u_mouse.y = 1 - e.clientY / window.innerHeight
    u_mouse.x = e.clientX;
    u_mouse.y = e.clientY;
});
function animate() {
    customPass.uniforms.u_mouse.value = u_mouse;
    customPass.uniforms.u_time.value++;
    requestAnimationFrame(animate);
    // renderer.render(scene, camera)
    composer.render();
}

},{"three":"ktPTu","three/examples/jsm/postprocessing/EffectComposer":"e5jie","three/examples/jsm/postprocessing/RenderPass":"hXnUO","three/examples/jsm/postprocessing/ShaderPass":"5IxTN","./frag2.glsl":"5Ffvr","./frag.glsl":"4UwIv","./vert.glsl":"9Bz9o","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"e5jie":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EffectComposer", ()=>EffectComposer);
parcelHelpers.export(exports, "Pass", ()=>Pass);
parcelHelpers.export(exports, "FullScreenQuad", ()=>FullScreenQuad);
var _three = require("three");
var _copyShaderJs = require("../shaders/CopyShader.js");
var _shaderPassJs = require("../postprocessing/ShaderPass.js");
var _maskPassJs = require("../postprocessing/MaskPass.js");
class EffectComposer {
    constructor(renderer, renderTarget){
        this.renderer = renderer;
        if (renderTarget === undefined) {
            const parameters = {
                minFilter: (0, _three.LinearFilter),
                magFilter: (0, _three.LinearFilter),
                format: (0, _three.RGBAFormat)
            };
            const size = renderer.getSize(new (0, _three.Vector2)());
            this._pixelRatio = renderer.getPixelRatio();
            this._width = size.width;
            this._height = size.height;
            renderTarget = new (0, _three.WebGLRenderTarget)(this._width * this._pixelRatio, this._height * this._pixelRatio, parameters);
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
        if ((0, _copyShaderJs.CopyShader) === undefined) console.error("THREE.EffectComposer relies on CopyShader");
        if ((0, _shaderPassJs.ShaderPass) === undefined) console.error("THREE.EffectComposer relies on ShaderPass");
        this.copyPass = new (0, _shaderPassJs.ShaderPass)((0, _copyShaderJs.CopyShader));
        this.clock = new (0, _three.Clock)();
    }
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
            if ((0, _maskPassJs.MaskPass) !== undefined) {
                if (pass instanceof (0, _maskPassJs.MaskPass)) maskActive = true;
                else if (pass instanceof (0, _maskPassJs.ClearMaskPass)) maskActive = false;
            }
        }
        this.renderer.setRenderTarget(currentRenderTarget);
    }
    reset(renderTarget) {
        if (renderTarget === undefined) {
            const size = this.renderer.getSize(new (0, _three.Vector2)());
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
}
class Pass {
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
    setSize() {}
    render() {
        console.error("THREE.Pass: .render() must be implemented in derived pass.");
    }
}
// Helper for passes that need to fill the viewport with a single quad.
const _camera = new (0, _three.OrthographicCamera)(-1, 1, 1, -1, 0, 1);
// https://github.com/mrdoob/three.js/pull/21358
const _geometry = new (0, _three.BufferGeometry)();
_geometry.setAttribute("position", new (0, _three.Float32BufferAttribute)([
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
_geometry.setAttribute("uv", new (0, _three.Float32BufferAttribute)([
    0,
    2,
    0,
    0,
    2,
    0
], 2));
class FullScreenQuad {
    constructor(material){
        this._mesh = new (0, _three.Mesh)(_geometry, material);
    }
    dispose() {
        this._mesh.geometry.dispose();
    }
    render(renderer) {
        renderer.render(this._mesh, _camera);
    }
    get material() {
        return this._mesh.material;
    }
    set material(value) {
        this._mesh.material = value;
    }
}

},{"three":"ktPTu","../shaders/CopyShader.js":"d0PyX","../postprocessing/ShaderPass.js":"5IxTN","../postprocessing/MaskPass.js":"jn76N","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"d0PyX":[function(require,module,exports) {
/**
 * Full-screen textured quad shader
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CopyShader", ()=>CopyShader);
var CopyShader = {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5IxTN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ShaderPass", ()=>ShaderPass);
var _three = require("three");
var _passJs = require("../postprocessing/Pass.js");
class ShaderPass extends (0, _passJs.Pass) {
    constructor(shader, textureID){
        super();
        this.textureID = textureID !== undefined ? textureID : "tDiffuse";
        if (shader instanceof (0, _three.ShaderMaterial)) {
            this.uniforms = shader.uniforms;
            this.material = shader;
        } else if (shader) {
            this.uniforms = (0, _three.UniformsUtils).clone(shader.uniforms);
            this.material = new (0, _three.ShaderMaterial)({
                defines: Object.assign({}, shader.defines),
                uniforms: this.uniforms,
                vertexShader: shader.vertexShader,
                fragmentShader: shader.fragmentShader
            });
        }
        this.fsQuad = new (0, _passJs.FullScreenQuad)(this.material);
    }
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
}

},{"three":"ktPTu","../postprocessing/Pass.js":"i2IfB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"i2IfB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Pass", ()=>Pass);
parcelHelpers.export(exports, "FullScreenQuad", ()=>FullScreenQuad);
var _three = require("three");
class Pass {
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
    setSize() {}
    render() {
        console.error("THREE.Pass: .render() must be implemented in derived pass.");
    }
}
// Helper for passes that need to fill the viewport with a single quad.
const _camera = new (0, _three.OrthographicCamera)(-1, 1, 1, -1, 0, 1);
// https://github.com/mrdoob/three.js/pull/21358
const _geometry = new (0, _three.BufferGeometry)();
_geometry.setAttribute("position", new (0, _three.Float32BufferAttribute)([
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
_geometry.setAttribute("uv", new (0, _three.Float32BufferAttribute)([
    0,
    2,
    0,
    0,
    2,
    0
], 2));
class FullScreenQuad {
    constructor(material){
        this._mesh = new (0, _three.Mesh)(_geometry, material);
    }
    dispose() {
        this._mesh.geometry.dispose();
    }
    render(renderer) {
        renderer.render(this._mesh, _camera);
    }
    get material() {
        return this._mesh.material;
    }
    set material(value) {
        this._mesh.material = value;
    }
}

},{"three":"ktPTu","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jn76N":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MaskPass", ()=>MaskPass);
parcelHelpers.export(exports, "ClearMaskPass", ()=>ClearMaskPass);
var _passJs = require("../postprocessing/Pass.js");
class MaskPass extends (0, _passJs.Pass) {
    constructor(scene, camera){
        super();
        this.scene = scene;
        this.camera = camera;
        this.clear = true;
        this.needsSwap = false;
        this.inverse = false;
    }
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
}
class ClearMaskPass extends (0, _passJs.Pass) {
    constructor(){
        super();
        this.needsSwap = false;
    }
    render(renderer /*, writeBuffer, readBuffer, deltaTime, maskActive */ ) {
        renderer.state.buffers.stencil.setLocked(false);
        renderer.state.buffers.stencil.setTest(false);
    }
}

},{"../postprocessing/Pass.js":"i2IfB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hXnUO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "RenderPass", ()=>RenderPass);
var _three = require("three");
var _passJs = require("../postprocessing/Pass.js");
class RenderPass extends (0, _passJs.Pass) {
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
        this._oldClearColor = new (0, _three.Color)();
    }
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
}

},{"three":"ktPTu","../postprocessing/Pass.js":"i2IfB","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5Ffvr":[function(require,module,exports) {
module.exports = "#define GLSLIFY 1\nuniform float time;\nuniform sampler2D tDiffuse;\nuniform vec2 resolution;\nvarying vec2 vUv;\nuniform vec2 uMouse;\n\nfloat circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {\n    uv -= disc_center;\n    uv*=resolution;\n    float dist = sqrt(dot(uv, uv));\n    return smoothstep(disc_radius+border_size, disc_radius-border_size, dist);\n}\nvoid main()  {\n    vec2 newUV = vUv;\n    float c = circle(vUv, uMouse, 0.0, 0.2);\n    float r = texture2D(tDiffuse, newUV.xy += c * (0.1 * .5)).x;\n    float g = texture2D(tDiffuse, newUV.xy += c * (0.1 * .525)).y;\n    float b = texture2D(tDiffuse, newUV.xy += c * (0.1 * .55)).z;\n    vec4 color = vec4(r, g, b, 1.);\n    gl_FragColor = color;\n}";

},{}],"4UwIv":[function(require,module,exports) {
module.exports = "precision mediump float;\n#define GLSLIFY 1\nuniform vec2 u_res;\nuniform sampler2D tDiffuse;\nuniform vec2 u_mouse;\nuniform float u_time;\n\nvarying vec2 v_uv;\n\nfloat circle(in vec2 _st, in vec2 mouse, in float _radius){\n    vec2 dist = _st-mouse;\n	return 1.0 - smoothstep(0.0, 0.01, dot(dist,dist) * 8.0);\n    // return step(_radius, dot(dist,dist) * 4.0);\n}\n\nvoid main() {\n\n    vec2 uv = v_uv;\n    vec2 resolution = u_res * PR;\n\n    vec2 st = gl_FragCoord.xy / resolution.xy;\n    vec2 adjust = vec2(0.0, (resolution.y / resolution.x) * 0.5);\n    st += adjust;\n    st.y *= resolution.y / resolution.x;\n\n    vec2 mouse = vec2(u_mouse.x / u_res.x, 1.0 - (u_mouse.y / u_res.y));\n    mouse += adjust;\n    mouse.y *= u_res.y / u_res.x;\n\n    float pct = smoothstep(0.2, 0.001, distance(st, mouse));\n    float distort = pct * 0.01;\n\n    gl_FragColor = texture2D(tDiffuse, uv + vec2(distort, distort));\n\n}";

},{}],"9Bz9o":[function(require,module,exports) {
module.exports = "precision mediump float;\n#define GLSLIFY 1\nvarying vec2 v_uv;\nuniform vec2 u_mouse;\nuniform vec2 u_res;\n\nvoid main() {\n    v_uv = uv;\n\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}";

},{}]},["3IExq","cmd3X"], "cmd3X", "parcelRequireb594")

//# sourceMappingURL=index.5a473a00.js.map
