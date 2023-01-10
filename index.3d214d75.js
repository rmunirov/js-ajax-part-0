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
})({"awEvQ":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "0a8ecb283d214d75";
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

},{}],"bB7Pu":[function(require,module,exports) {
var _api = require("/api");
var _utils = require("/utils");
var _history = require("/history");
const request = document.getElementById("request");
const searchResult = document.getElementById("searchResult");
const searchContent = document.getElementById("searchContent");
const history = document.getElementById("history");
const error = document.getElementById("error");
(async ()=>{
    // init history
    try {
        (0, _history.initHistory)(createHistoryLinks);
    } catch (e) {
        error.innerHTML = e.message;
    }
    // show history if not empty
    if (!(0, _history.historyIsEmpty)()) createHistoryLinks();
    else history.classList.add("history_hide");
    function showRequestResult(items) {
        const MAX_COUNT_TO_SHOW = 10;
        if (!Array.isArray(items)) throw new TypeError("is not array");
        if (items.length === 0) return;
        (0, _utils.clearHTMLContainer)(searchResult);
        for(let i = 0; i < items.length; i++){
            if (i >= MAX_COUNT_TO_SHOW) break;
            const node = createSearchResultItemNode(items[i]);
            searchResult.appendChild(node);
        }
        searchResult.classList.add("search-line__result_shown");
    }
    async function showDetails(id) {
        const details = await (0, _api.loadAnimeDetails)(id);
        (0, _utils.clearHTMLContainer)(searchContent);
        searchContent.appendChild(createDetailsNode(details));
        return details;
    }
    function createHistoryLinks() {
        const historyCount = (0, _history.getHistoryItemsCount)();
        if (historyCount === 0) return;
        const MAX_HISTORY_LIKNS_TO_SHOW = 3;
        try {
            history.classList.remove("history_hide");
            (0, _utils.clearHTMLContainer)(history);
            const title = document.createElement("h2");
            title.classList.add("heading", "heading_level-2");
            title.textContent = "Recent results:";
            history.appendChild(title);
            for(let i = 0; i < MAX_HISTORY_LIKNS_TO_SHOW; i++){
                if (i >= historyCount) break;
                const data = (0, _history.getFromHistory)(i);
                const link = document.createElement("a");
                link.href = "#";
                link.textContent = data.animeTitle;
                link.onclick = async (event)=>{
                    event.preventDefault();
                    request.value = "";
                    await showDetails(data.animeId);
                };
                history.appendChild(link);
            }
        } catch (e) {
            error.innerHTML = e.message;
        }
    }
    function createDetailsNode(details) {
        // create root node
        const container = document.createElement("div");
        container.classList.add("details");
        // create title
        const title = document.createElement("h2");
        title.classList.add("heading", "heading_level-2");
        title.innerHTML = details.animeTitle;
        container.appendChild(title);
        // create image container with image
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("details__image-container");
        const image = document.createElement("img");
        image.src = details.animeImg;
        image.alt = "anime image";
        imageContainer.appendChild(image);
        container.appendChild(imageContainer);
        // create info container with info
        const info = document.createElement("div");
        info.classList.add("details__info");
        info.innerHTML = `<p><strong>Genres: </strong>${details.genres.join(", ")}</p>`;
        info.innerHTML += `<p><strong>Release date: </strong>${details.releasedDate}</p>`;
        info.innerHTML += `<p><strong>Total episodes: </strong>${details.totalEpisodes}</p>`;
        info.innerHTML += `<p><strong>Synopsis: </strong>${details.synopsis}</p>`;
        container.appendChild(info);
        return container;
    }
    function createSearchResultItemNode(data) {
        const item = document.createElement("div");
        item.classList.add("search-line__result-item");
        if (data.isHistory) item.classList.add("search-line__result-item_history");
        item.innerHTML = data.animeTitle;
        const value = document.createElement("input");
        value.type = "hidden";
        value.value = data.animeId;
        item.appendChild(value);
        item.addEventListener("click", ()=>{
            const id = item.getElementsByTagName("input")[0].value;
            request.value = data.animeTitle;
            handleActiveId(id);
            (0, _utils.clearHTMLContainer)(searchResult);
            searchResult.classList.remove("search-line__result_shown");
        });
        return item;
    }
    async function handleActiveId(id) {
        try {
            const details = await showDetails(id);
            // save to storage
            (0, _history.saveToHistory)(id, details.animeTitle);
            // update the history links
            createHistoryLinks();
        } catch (e) {
            error.innerHTML = "Cant show details, please update the page";
        }
    }
    async function handleRequestInput(event) {
        const MIN_QUERY_LENGTH = 2;
        const MAX_HISTORY_ITEMS = 5;
        const value = event.target.value;
        if (value.length < MIN_QUERY_LENGTH) return;
        try {
            const data = await (0, _api.loadAnimeList)(value);
            // get items from storage
            const historyInStorage = (0, _history.findInHistory)(value).map((item)=>({
                    ...item,
                    isHistory: true
                })).slice(0, MAX_HISTORY_ITEMS);
            const itemsToShow = historyInStorage.concat(data.filter((item)=>!(0, _history.historyIncludesId)(item.animeId)).map((item)=>({
                    ...item,
                    isHistory: false
                })));
            showRequestResult(itemsToShow);
        } catch (e) {
            error.innerHTML = "Cant show results, please update the page";
        }
    }
    function handleRequestFocus(event) {
        try {
            const value = event.target.value;
            if (value === "") {
                const historyInStorage = (0, _history.findInHistory)(value).map((item)=>({
                        ...item,
                        isHistory: true
                    }));
                showRequestResult(historyInStorage);
            }
        } catch (e) {
            error.innerHTML = "Cant show results, please update the page";
        }
    }
    function handleDocumentClick(event) {
        if (event.target === request) return;
        (0, _utils.clearHTMLContainer)(searchResult);
        searchResult.classList.remove("search-line__result_shown");
    }
    const debouncedHandleInput = (0, _utils.debounce)(handleRequestInput, 500);
    request.addEventListener("input", debouncedHandleInput);
    request.addEventListener("focus", handleRequestFocus);
    document.addEventListener("click", handleDocumentClick);
})();

},{"/utils":"bIDtH","/api":"eqUwj","/history":"8eSCw"}],"bIDtH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "debounce", ()=>debounce);
parcelHelpers.export(exports, "clearHTMLContainer", ()=>clearHTMLContainer);
function debounce(func, timeoutMs) {
    return function perform(...args) {
        const prevCall = this.lastCall;
        this.lastCall = Date.now();
        if (prevCall && this.lastCall - prevCall <= timeoutMs) clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            func(...args);
        }, timeoutMs);
    };
}
function clearHTMLContainer(container) {
    while(container.firstChild)container.removeChild(container.firstChild);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"eqUwj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "loadAnimeList", ()=>loadAnimeList);
parcelHelpers.export(exports, "loadAnimeDetails", ()=>loadAnimeDetails);
async function getData(url) {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow"
    });
    return response.json();
}
async function loadAnimeList(name) {
    const response = await getData(`https://gogoanime.consumet.org/search?keyw=${name}`);
    if (response && response.length === 0) throw Error("request is wrong");
    return response;
}
async function loadAnimeDetails(id) {
    const response = await getData(`https://gogoanime.consumet.org/anime-details/${id}`);
    if (response && response.error) throw new Error(response.error.message);
    return response;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8eSCw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initHistory", ()=>initHistory);
parcelHelpers.export(exports, "findInHistory", ()=>findInHistory);
parcelHelpers.export(exports, "historyIncludesId", ()=>historyIncludesId);
parcelHelpers.export(exports, "saveToHistory", ()=>saveToHistory);
parcelHelpers.export(exports, "getFromHistory", ()=>getFromHistory);
parcelHelpers.export(exports, "getHistoryItemsCount", ()=>getHistoryItemsCount);
parcelHelpers.export(exports, "historyIsEmpty", ()=>historyIsEmpty);
const HISTORY_CURSOR_KEY = "history_cursor";
const HISTORY_MAX_LENGTH_KEY = "history_max";
const HISTORY_COUNT_KEY = "history_count";
const HISTORY_MAX_LENGTH = 100;
function safeLocalStorageSet(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        throw new Error("History error, please update the page");
    }
}
function initHistory(callback) {
    if (!localStorage.getItem(HISTORY_CURSOR_KEY)) safeLocalStorageSet(HISTORY_CURSOR_KEY, 0);
    if (!localStorage.getItem(HISTORY_MAX_LENGTH_KEY)) safeLocalStorageSet(HISTORY_MAX_LENGTH_KEY, HISTORY_MAX_LENGTH);
    if (!localStorage.getItem(HISTORY_COUNT_KEY)) safeLocalStorageSet(HISTORY_COUNT_KEY, 0);
    // listen to an event onstorage
    window.addEventListener("storage", ()=>{
        callback();
    });
}
function findInHistory(str) {
    const result = [];
    if (historyIsEmpty()) return [];
    try {
        for(let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i);
            if (key !== HISTORY_CURSOR_KEY && key !== HISTORY_COUNT_KEY && key !== HISTORY_MAX_LENGTH_KEY) {
                const value = JSON.parse(localStorage.getItem(key));
                const regex = new RegExp(str.toLowerCase());
                if (regex.test(value.animeTitle.toLowerCase())) result.push(value);
            }
        }
    } catch (e) {
        throw new Error("History error, please update the page");
    }
    return result;
}
function historyIncludesId(id) {
    try {
        for(let i = 0; i < localStorage.length; i++){
            const key = localStorage.key(i);
            if (key && key !== HISTORY_CURSOR_KEY && key !== HISTORY_COUNT_KEY && key !== HISTORY_MAX_LENGTH_KEY) {
                const value = JSON.parse(localStorage.getItem(key));
                if (value.animeId === id) return true;
            }
        }
        return false;
    } catch (error) {
        throw new Error("History error, please update the page");
    }
}
function saveToHistory(id, title) {
    let cursor = Number(localStorage.getItem(HISTORY_CURSOR_KEY));
    let count = Number(localStorage.getItem(HISTORY_COUNT_KEY));
    const max = Number(localStorage.getItem(HISTORY_MAX_LENGTH_KEY));
    if (!cursor || !count || !max) throw new Error("History error, please update the page");
    // find same animeId
    if (historyIncludesId(id)) return;
    // save if not find
    safeLocalStorageSet(cursor, JSON.stringify({
        animeId: id,
        animeTitle: title
    }));
    cursor = (cursor + 1) % max;
    if (count < max) {
        count += 1;
        safeLocalStorageSet(HISTORY_COUNT_KEY, count);
    }
    safeLocalStorageSet(HISTORY_CURSOR_KEY, cursor);
}
function getFromHistory(index) {
    try {
        const count = Number(localStorage.getItem(HISTORY_COUNT_KEY));
        if (count && index >= count) throw new RangeError("Passed index very big");
        const cursor = Number(localStorage.getItem(HISTORY_CURSOR_KEY));
        const max = Number(localStorage.getItem(HISTORY_MAX_LENGTH_KEY));
        if (!cursor || !max) throw new Error("History error, please update the page");
        let itemIndex = cursor - 1 - index;
        if (itemIndex < 0) itemIndex += max;
        return JSON.parse(localStorage.getItem(itemIndex));
    } catch (error) {
        if (error instanceof SyntaxError) throw new Error("History error, please update the page");
        throw error;
    }
}
function getHistoryItemsCount() {
    return Number(localStorage.getItem(HISTORY_COUNT_KEY));
}
function historyIsEmpty() {
    return localStorage.length <= 3;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["awEvQ","bB7Pu"], "bB7Pu", "parcelRequire95a9")

//# sourceMappingURL=index.3d214d75.js.map
