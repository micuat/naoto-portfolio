(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node2 of mutation.addedNodes) if (node2.tagName === "LINK" && node2.rel === "modulepreload") processPreload(node2);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var scrollToAnchor_1;
var hasRequiredScrollToAnchor;
function requireScrollToAnchor() {
  if (hasRequiredScrollToAnchor) return scrollToAnchor_1;
  hasRequiredScrollToAnchor = 1;
  scrollToAnchor_1 = scrollToAnchor;
  function scrollToAnchor(anchor, options) {
    if (anchor) {
      try {
        var el = document.querySelector(anchor);
        if (el) el.scrollIntoView(options);
      } catch (e) {
      }
    }
  }
  return scrollToAnchor_1;
}
var documentReady;
var hasRequiredDocumentReady;
function requireDocumentReady() {
  if (hasRequiredDocumentReady) return documentReady;
  hasRequiredDocumentReady = 1;
  documentReady = ready;
  function ready(callback) {
    if (typeof document === "undefined") {
      throw new Error("document-ready only runs in the browser");
    }
    var state = document.readyState;
    if (state === "complete" || state === "interactive") {
      return setTimeout(callback, 0);
    }
    document.addEventListener("DOMContentLoaded", function onLoad() {
      callback();
    });
  }
  return documentReady;
}
var nanoassert;
var hasRequiredNanoassert;
function requireNanoassert() {
  if (hasRequiredNanoassert) return nanoassert;
  hasRequiredNanoassert = 1;
  assert.notEqual = notEqual;
  assert.notOk = notOk;
  assert.equal = equal;
  assert.ok = assert;
  nanoassert = assert;
  function equal(a, b, m) {
    assert(a == b, m);
  }
  function notEqual(a, b, m) {
    assert(a != b, m);
  }
  function notOk(t, m) {
    assert(!t, m);
  }
  function assert(t, m) {
    if (!t) throw new Error(m || "AssertionError");
  }
  return nanoassert;
}
var nanoscheduler;
var hasRequiredNanoscheduler;
function requireNanoscheduler() {
  if (hasRequiredNanoscheduler) return nanoscheduler;
  hasRequiredNanoscheduler = 1;
  var assert = requireNanoassert();
  var hasWindow = typeof window !== "undefined";
  function createScheduler() {
    var scheduler;
    if (hasWindow) {
      if (!window._nanoScheduler) window._nanoScheduler = new NanoScheduler(true);
      scheduler = window._nanoScheduler;
    } else {
      scheduler = new NanoScheduler();
    }
    return scheduler;
  }
  function NanoScheduler(hasWindow2) {
    this.hasWindow = hasWindow2;
    this.hasIdle = this.hasWindow && window.requestIdleCallback;
    this.method = this.hasIdle ? window.requestIdleCallback.bind(window) : this.setTimeout;
    this.scheduled = false;
    this.queue = [];
  }
  NanoScheduler.prototype.push = function(cb) {
    assert.equal(typeof cb, "function", "nanoscheduler.push: cb should be type function");
    this.queue.push(cb);
    this.schedule();
  };
  NanoScheduler.prototype.schedule = function() {
    if (this.scheduled) return;
    this.scheduled = true;
    var self = this;
    this.method(function(idleDeadline) {
      var cb;
      while (self.queue.length && idleDeadline.timeRemaining() > 0) {
        cb = self.queue.shift();
        cb(idleDeadline);
      }
      self.scheduled = false;
      if (self.queue.length) self.schedule();
    });
  };
  NanoScheduler.prototype.setTimeout = function(cb) {
    setTimeout(cb, 0, {
      timeRemaining: function() {
        return 1;
      }
    });
  };
  nanoscheduler = createScheduler;
  return nanoscheduler;
}
var browser$2;
var hasRequiredBrowser$2;
function requireBrowser$2() {
  if (hasRequiredBrowser$2) return browser$2;
  hasRequiredBrowser$2 = 1;
  var scheduler = requireNanoscheduler()();
  var assert = requireNanoassert();
  var perf;
  nanotiming.disabled = true;
  try {
    perf = window.performance;
    nanotiming.disabled = window.localStorage.DISABLE_NANOTIMING === "true" || !perf.mark;
  } catch (e) {
  }
  browser$2 = nanotiming;
  function nanotiming(name) {
    assert.equal(typeof name, "string", "nanotiming: name should be type string");
    if (nanotiming.disabled) return noop;
    var uuid = (perf.now() * 1e4).toFixed() % Number.MAX_SAFE_INTEGER;
    var startName = "start-" + uuid + "-" + name;
    perf.mark(startName);
    function end(cb) {
      var endName = "end-" + uuid + "-" + name;
      perf.mark(endName);
      scheduler.push(function() {
        var err = null;
        try {
          var measureName = name + " [" + uuid + "]";
          perf.measure(measureName, startName, endName);
          perf.clearMarks(startName);
          perf.clearMarks(endName);
        } catch (e) {
          err = e;
        }
        if (cb) cb(err, name);
      });
    }
    end.uuid = uuid;
    return end;
  }
  function noop(cb) {
    if (cb) {
      scheduler.push(function() {
        cb(new Error("nanotiming: performance API unavailable"));
      });
    }
  }
  return browser$2;
}
var trie;
var hasRequiredTrie;
function requireTrie() {
  if (hasRequiredTrie) return trie;
  hasRequiredTrie = 1;
  var assert = requireNanoassert();
  trie = Trie;
  function Trie() {
    if (!(this instanceof Trie)) return new Trie();
    this.trie = { nodes: {} };
  }
  Trie.prototype.create = function(route) {
    assert.equal(typeof route, "string", "route should be a string");
    var routes = route.replace(/^\//, "").split("/");
    function createNode(index, trie2) {
      var thisRoute = has(routes, index) && routes[index];
      if (thisRoute === false) return trie2;
      var node2 = null;
      if (/^:|^\*/.test(thisRoute)) {
        if (!has(trie2.nodes, "$$")) {
          node2 = { nodes: {} };
          trie2.nodes.$$ = node2;
        } else {
          node2 = trie2.nodes.$$;
        }
        if (thisRoute[0] === "*") {
          trie2.wildcard = true;
        }
        trie2.name = thisRoute.replace(/^:|^\*/, "");
      } else if (!has(trie2.nodes, thisRoute)) {
        node2 = { nodes: {} };
        trie2.nodes[thisRoute] = node2;
      } else {
        node2 = trie2.nodes[thisRoute];
      }
      return createNode(index + 1, node2);
    }
    return createNode(0, this.trie);
  };
  Trie.prototype.match = function(route) {
    assert.equal(typeof route, "string", "route should be a string");
    var routes = route.replace(/^\//, "").split("/");
    var params = {};
    function search(index, trie2) {
      if (trie2 === void 0) return void 0;
      var thisRoute = routes[index];
      if (thisRoute === void 0) return trie2;
      if (has(trie2.nodes, thisRoute)) {
        return search(index + 1, trie2.nodes[thisRoute]);
      } else if (trie2.name) {
        try {
          params[trie2.name] = decodeURIComponent(thisRoute);
        } catch (e) {
          return search(index, void 0);
        }
        return search(index + 1, trie2.nodes.$$);
      } else if (trie2.wildcard) {
        try {
          params.wildcard = decodeURIComponent(routes.slice(index).join("/"));
        } catch (e) {
          return search(index, void 0);
        }
        return trie2.nodes.$$;
      } else {
        return search(index + 1);
      }
    }
    var node2 = search(0, this.trie);
    if (!node2) return void 0;
    node2 = Object.assign({}, node2);
    node2.params = params;
    return node2;
  };
  Trie.prototype.mount = function(route, trie2) {
    assert.equal(typeof route, "string", "route should be a string");
    assert.equal(typeof trie2, "object", "trie should be a object");
    var split = route.replace(/^\//, "").split("/");
    var node2 = null;
    var key = null;
    if (split.length === 1) {
      key = split[0];
      node2 = this.create(key);
    } else {
      var head = split.join("/");
      key = split[0];
      node2 = this.create(head);
    }
    Object.assign(node2.nodes, trie2.nodes);
    if (trie2.name) node2.name = trie2.name;
    if (node2.nodes[""]) {
      Object.keys(node2.nodes[""]).forEach(function(key2) {
        if (key2 === "nodes") return;
        node2[key2] = node2.nodes[""][key2];
      });
      Object.assign(node2.nodes, node2.nodes[""].nodes);
      delete node2.nodes[""].nodes;
    }
  };
  function has(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }
  return trie;
}
var wayfarer;
var hasRequiredWayfarer;
function requireWayfarer() {
  if (hasRequiredWayfarer) return wayfarer;
  hasRequiredWayfarer = 1;
  var assert = requireNanoassert();
  var trie2 = requireTrie();
  wayfarer = Wayfarer;
  function Wayfarer(dft) {
    if (!(this instanceof Wayfarer)) return new Wayfarer(dft);
    var _default = (dft || "").replace(/^\//, "");
    var _trie = trie2();
    emit._trie = _trie;
    emit.on = on;
    emit.emit = emit;
    emit.match = match2;
    emit._wayfarer = true;
    return emit;
    function on(route, cb) {
      assert.equal(typeof route, "string");
      assert.equal(typeof cb, "function");
      route = route || "/";
      if (cb._wayfarer && cb._trie) {
        _trie.mount(route, cb._trie.trie);
      } else {
        var node2 = _trie.create(route);
        node2.cb = cb;
        node2.route = route;
      }
      return emit;
    }
    function emit(route) {
      var matched = match2(route);
      var args = new Array(arguments.length);
      args[0] = matched.params;
      for (var i = 1; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return matched.cb.apply(matched.cb, args);
    }
    function match2(route) {
      assert.notEqual(route, void 0, "'route' must be defined");
      var matched = _trie.match(route);
      if (matched && matched.cb) return new Route(matched);
      var dft2 = _trie.match(_default);
      if (dft2 && dft2.cb) return new Route(dft2);
      throw new Error("route '" + route + "' did not match");
    }
    function Route(matched) {
      this.cb = matched.cb;
      this.route = matched.route;
      this.params = matched.params;
    }
  }
  return wayfarer;
}
var nanorouter;
var hasRequiredNanorouter;
function requireNanorouter() {
  if (hasRequiredNanorouter) return nanorouter;
  hasRequiredNanorouter = 1;
  var assert = requireNanoassert();
  var wayfarer2 = requireWayfarer();
  var isLocalFile = /file:\/\//.test(
    typeof window === "object" && window.location && window.location.origin
  );
  var electron = "^(file://|/)(.*.html?/?)?";
  var protocol = "^(http(s)?(://))?(www.)?";
  var domain = "[a-zA-Z0-9-_.]+(:[0-9]{1,5})?(/{1})?";
  var qs = "[?].*$";
  var stripElectron = new RegExp(electron);
  var prefix2 = new RegExp(protocol + domain);
  var normalize = new RegExp("#");
  var suffix = new RegExp(qs);
  nanorouter = Nanorouter;
  function Nanorouter(opts) {
    if (!(this instanceof Nanorouter)) return new Nanorouter(opts);
    opts = opts || {};
    this.router = wayfarer2(opts.default || "/404");
  }
  Nanorouter.prototype.on = function(routename, listener) {
    assert.equal(typeof routename, "string");
    routename = routename.replace(/^[#/]/, "");
    this.router.on(routename, listener);
  };
  Nanorouter.prototype.emit = function(routename) {
    assert.equal(typeof routename, "string");
    routename = pathname(routename, isLocalFile);
    return this.router.emit(routename);
  };
  Nanorouter.prototype.match = function(routename) {
    assert.equal(typeof routename, "string");
    routename = pathname(routename, isLocalFile);
    return this.router.match(routename);
  };
  function pathname(routename, isElectron) {
    if (isElectron) routename = routename.replace(stripElectron, "");
    else routename = routename.replace(prefix2, "");
    return decodeURI(routename.replace(suffix, "").replace(normalize, "/"));
  }
  return nanorouter;
}
var events;
var hasRequiredEvents;
function requireEvents() {
  if (hasRequiredEvents) return events;
  hasRequiredEvents = 1;
  events = [
    // attribute events (can be set with attributes)
    "onclick",
    "ondblclick",
    "onmousedown",
    "onmouseup",
    "onmouseover",
    "onmousemove",
    "onmouseout",
    "onmouseenter",
    "onmouseleave",
    "ontouchcancel",
    "ontouchend",
    "ontouchmove",
    "ontouchstart",
    "ondragstart",
    "ondrag",
    "ondragenter",
    "ondragleave",
    "ondragover",
    "ondrop",
    "ondragend",
    "onkeydown",
    "onkeypress",
    "onkeyup",
    "onunload",
    "onabort",
    "onerror",
    "onresize",
    "onscroll",
    "onselect",
    "onchange",
    "onsubmit",
    "onreset",
    "onfocus",
    "onblur",
    "oninput",
    "onanimationend",
    "onanimationiteration",
    "onanimationstart",
    // other common events
    "oncontextmenu",
    "onfocusin",
    "onfocusout"
  ];
  return events;
}
var morph_1;
var hasRequiredMorph;
function requireMorph() {
  if (hasRequiredMorph) return morph_1;
  hasRequiredMorph = 1;
  var events2 = requireEvents();
  var eventsLength = events2.length;
  var ELEMENT_NODE = 1;
  var TEXT_NODE = 3;
  var COMMENT_NODE = 8;
  morph_1 = morph;
  function morph(newNode, oldNode) {
    var nodeType = newNode.nodeType;
    var nodeName = newNode.nodeName;
    if (nodeType === ELEMENT_NODE) {
      copyAttrs(newNode, oldNode);
    }
    if (nodeType === TEXT_NODE || nodeType === COMMENT_NODE) {
      if (oldNode.nodeValue !== newNode.nodeValue) {
        oldNode.nodeValue = newNode.nodeValue;
      }
    }
    if (nodeName === "INPUT") updateInput(newNode, oldNode);
    else if (nodeName === "OPTION") updateOption(newNode, oldNode);
    else if (nodeName === "TEXTAREA") updateTextarea(newNode, oldNode);
    copyEvents(newNode, oldNode);
  }
  function copyAttrs(newNode, oldNode) {
    var oldAttrs = oldNode.attributes;
    var newAttrs = newNode.attributes;
    var attrNamespaceURI = null;
    var attrValue = null;
    var fromValue = null;
    var attrName = null;
    var attr = null;
    for (var i = newAttrs.length - 1; i >= 0; --i) {
      attr = newAttrs[i];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      attrValue = attr.value;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        fromValue = oldNode.getAttributeNS(attrNamespaceURI, attrName);
        if (fromValue !== attrValue) {
          oldNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
        }
      } else {
        if (!oldNode.hasAttribute(attrName)) {
          oldNode.setAttribute(attrName, attrValue);
        } else {
          fromValue = oldNode.getAttribute(attrName);
          if (fromValue !== attrValue) {
            if (attrValue === "null" || attrValue === "undefined") {
              oldNode.removeAttribute(attrName);
            } else {
              oldNode.setAttribute(attrName, attrValue);
            }
          }
        }
      }
    }
    for (var j = oldAttrs.length - 1; j >= 0; --j) {
      attr = oldAttrs[j];
      if (attr.specified !== false) {
        attrName = attr.name;
        attrNamespaceURI = attr.namespaceURI;
        if (attrNamespaceURI) {
          attrName = attr.localName || attrName;
          if (!newNode.hasAttributeNS(attrNamespaceURI, attrName)) {
            oldNode.removeAttributeNS(attrNamespaceURI, attrName);
          }
        } else {
          if (!newNode.hasAttributeNS(null, attrName)) {
            oldNode.removeAttribute(attrName);
          }
        }
      }
    }
  }
  function copyEvents(newNode, oldNode) {
    for (var i = 0; i < eventsLength; i++) {
      var ev = events2[i];
      if (newNode[ev]) {
        oldNode[ev] = newNode[ev];
      } else if (oldNode[ev]) {
        oldNode[ev] = void 0;
      }
    }
  }
  function updateOption(newNode, oldNode) {
    updateAttribute(newNode, oldNode, "selected");
  }
  function updateInput(newNode, oldNode) {
    var newValue = newNode.value;
    var oldValue = oldNode.value;
    updateAttribute(newNode, oldNode, "checked");
    updateAttribute(newNode, oldNode, "disabled");
    if (newNode.indeterminate !== oldNode.indeterminate) {
      oldNode.indeterminate = newNode.indeterminate;
    }
    if (oldNode.type === "file") return;
    if (newValue !== oldValue) {
      oldNode.setAttribute("value", newValue);
      oldNode.value = newValue;
    }
    if (newValue === "null") {
      oldNode.value = "";
      oldNode.removeAttribute("value");
    }
    if (!newNode.hasAttributeNS(null, "value")) {
      oldNode.removeAttribute("value");
    } else if (oldNode.type === "range") {
      oldNode.value = newValue;
    }
  }
  function updateTextarea(newNode, oldNode) {
    var newValue = newNode.value;
    if (newValue !== oldNode.value) {
      oldNode.value = newValue;
    }
    if (oldNode.firstChild && oldNode.firstChild.nodeValue !== newValue) {
      if (newValue === "" && oldNode.firstChild.nodeValue === oldNode.placeholder) {
        return;
      }
      oldNode.firstChild.nodeValue = newValue;
    }
  }
  function updateAttribute(newNode, oldNode, name) {
    if (newNode[name] !== oldNode[name]) {
      oldNode[name] = newNode[name];
      if (newNode[name]) {
        oldNode.setAttribute(name, "");
      } else {
        oldNode.removeAttribute(name);
      }
    }
  }
  return morph_1;
}
var nanomorph_1;
var hasRequiredNanomorph;
function requireNanomorph() {
  if (hasRequiredNanomorph) return nanomorph_1;
  hasRequiredNanomorph = 1;
  var assert = requireNanoassert();
  var morph = requireMorph();
  var TEXT_NODE = 3;
  nanomorph_1 = nanomorph;
  function nanomorph(oldTree, newTree, options) {
    assert.equal(typeof oldTree, "object", "nanomorph: oldTree should be an object");
    assert.equal(typeof newTree, "object", "nanomorph: newTree should be an object");
    if (options && options.childrenOnly) {
      updateChildren(newTree, oldTree);
      return oldTree;
    }
    assert.notEqual(
      newTree.nodeType,
      11,
      "nanomorph: newTree should have one root node (which is not a DocumentFragment)"
    );
    return walk(newTree, oldTree);
  }
  function walk(newNode, oldNode) {
    if (!oldNode) {
      return newNode;
    } else if (!newNode) {
      return null;
    } else if (newNode.isSameNode && newNode.isSameNode(oldNode)) {
      return oldNode;
    } else if (newNode.tagName !== oldNode.tagName || getComponentId(newNode) !== getComponentId(oldNode)) {
      return newNode;
    } else {
      morph(newNode, oldNode);
      updateChildren(newNode, oldNode);
      return oldNode;
    }
  }
  function getComponentId(node2) {
    return node2.dataset ? node2.dataset.nanomorphComponentId : void 0;
  }
  function updateChildren(newNode, oldNode) {
    var oldChild, newChild, morphed, oldMatch;
    var offset = 0;
    for (var i = 0; ; i++) {
      oldChild = oldNode.childNodes[i];
      newChild = newNode.childNodes[i - offset];
      if (!oldChild && !newChild) {
        break;
      } else if (!newChild) {
        oldNode.removeChild(oldChild);
        i--;
      } else if (!oldChild) {
        oldNode.appendChild(newChild);
        offset++;
      } else if (same(newChild, oldChild)) {
        morphed = walk(newChild, oldChild);
        if (morphed !== oldChild) {
          oldNode.replaceChild(morphed, oldChild);
          offset++;
        }
      } else {
        oldMatch = null;
        for (var j = i; j < oldNode.childNodes.length; j++) {
          if (same(oldNode.childNodes[j], newChild)) {
            oldMatch = oldNode.childNodes[j];
            break;
          }
        }
        if (oldMatch) {
          morphed = walk(newChild, oldMatch);
          if (morphed !== oldMatch) offset++;
          oldNode.insertBefore(morphed, oldChild);
        } else if (!newChild.id && !oldChild.id) {
          morphed = walk(newChild, oldChild);
          if (morphed !== oldChild) {
            oldNode.replaceChild(morphed, oldChild);
            offset++;
          }
        } else {
          oldNode.insertBefore(newChild, oldChild);
          offset++;
        }
      }
    }
  }
  function same(a, b) {
    if (a.id) return a.id === b.id;
    if (a.isSameNode) return a.isSameNode(b);
    if (a.tagName !== b.tagName) return false;
    if (a.type === TEXT_NODE) return a.nodeValue === b.nodeValue;
    return false;
  }
  return nanomorph_1;
}
var browser$1;
var hasRequiredBrowser$1;
function requireBrowser$1() {
  if (hasRequiredBrowser$1) return browser$1;
  hasRequiredBrowser$1 = 1;
  var reg = /([^?=&]+)(=([^&]*))?/g;
  var assert = requireNanoassert();
  browser$1 = qs;
  function qs(url) {
    assert.equal(typeof url, "string", "nanoquery: url should be type string");
    var obj = {};
    url.replace(/^.*\?/, "").replace(reg, function(a0, a1, a2, a3) {
      var value = decodeURIComponent(a3);
      var key = decodeURIComponent(a1);
      if (obj.hasOwnProperty(key)) {
        if (Array.isArray(obj[key])) obj[key].push(value);
        else obj[key] = [obj[key], value];
      } else {
        obj[key] = value;
      }
    });
    return obj;
  }
  return browser$1;
}
var nanohref;
var hasRequiredNanohref;
function requireNanohref() {
  if (hasRequiredNanohref) return nanohref;
  hasRequiredNanohref = 1;
  var assert = requireNanoassert();
  var safeExternalLink = /(noopener|noreferrer) (noopener|noreferrer)/;
  var protocolLink = /^[\w-_]+:/;
  nanohref = href;
  function href(cb, root) {
    assert.notEqual(typeof window, "undefined", "nanohref: expected window to exist");
    root = root || window.document;
    assert.equal(typeof cb, "function", "nanohref: cb should be type function");
    assert.equal(typeof root, "object", "nanohref: root should be type object");
    window.addEventListener("click", function(e) {
      if (e.button && e.button !== 0 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.defaultPrevented) return;
      var anchor = function traverse(node2) {
        if (!node2 || node2 === root) return;
        if (node2.localName !== "a" || node2.href === void 0) {
          return traverse(node2.parentNode);
        }
        return node2;
      }(e.target);
      if (!anchor) return;
      if (window.location.protocol !== anchor.protocol || window.location.hostname !== anchor.hostname || window.location.port !== anchor.port || anchor.hasAttribute("data-nanohref-ignore") || anchor.hasAttribute("download") || anchor.getAttribute("target") === "_blank" && safeExternalLink.test(anchor.getAttribute("rel")) || protocolLink.test(anchor.getAttribute("href"))) return;
      e.preventDefault();
      cb(anchor);
    });
  }
  return nanohref;
}
var nanoraf_1;
var hasRequiredNanoraf;
function requireNanoraf() {
  if (hasRequiredNanoraf) return nanoraf_1;
  hasRequiredNanoraf = 1;
  var assert = requireNanoassert();
  nanoraf_1 = nanoraf;
  function nanoraf(render, raf) {
    assert.equal(typeof render, "function", "nanoraf: render should be a function");
    assert.ok(typeof raf === "function" || typeof raf === "undefined", "nanoraf: raf should be a function or undefined");
    if (!raf) raf = window.requestAnimationFrame;
    var redrawScheduled = false;
    var args = null;
    return function frame() {
      if (args === null && !redrawScheduled) {
        redrawScheduled = true;
        raf(function redraw() {
          redrawScheduled = false;
          var length2 = args.length;
          var _args = new Array(length2);
          for (var i = 0; i < length2; i++) _args[i] = args[i];
          render.apply(render, _args);
          args = null;
        });
      }
      args = arguments;
    };
  }
  return nanoraf_1;
}
var removeArrayItems;
var hasRequiredRemoveArrayItems;
function requireRemoveArrayItems() {
  if (hasRequiredRemoveArrayItems) return removeArrayItems;
  hasRequiredRemoveArrayItems = 1;
  removeArrayItems = function removeItems(arr, startIdx, removeCount) {
    var i, length2 = arr.length;
    if (startIdx >= length2 || removeCount === 0) {
      return;
    }
    removeCount = startIdx + removeCount > length2 ? length2 - startIdx : removeCount;
    var len = length2 - removeCount;
    for (i = startIdx; i < len; ++i) {
      arr[i] = arr[i + removeCount];
    }
    arr.length = len;
  };
  return removeArrayItems;
}
var nanobus;
var hasRequiredNanobus;
function requireNanobus() {
  if (hasRequiredNanobus) return nanobus;
  hasRequiredNanobus = 1;
  var splice = requireRemoveArrayItems();
  var nanotiming = requireBrowser$2();
  var assert = requireNanoassert();
  nanobus = Nanobus;
  function Nanobus(name) {
    if (!(this instanceof Nanobus)) return new Nanobus(name);
    this._name = name || "nanobus";
    this._starListeners = [];
    this._listeners = {};
  }
  Nanobus.prototype.emit = function(eventName) {
    assert.ok(typeof eventName === "string" || typeof eventName === "symbol", "nanobus.emit: eventName should be type string or symbol");
    var data = [];
    for (var i = 1, len = arguments.length; i < len; i++) {
      data.push(arguments[i]);
    }
    var emitTiming = nanotiming(this._name + "('" + eventName.toString() + "')");
    var listeners = this._listeners[eventName];
    if (listeners && listeners.length > 0) {
      this._emit(this._listeners[eventName], data);
    }
    if (this._starListeners.length > 0) {
      this._emit(this._starListeners, eventName, data, emitTiming.uuid);
    }
    emitTiming();
    return this;
  };
  Nanobus.prototype.on = Nanobus.prototype.addListener = function(eventName, listener) {
    assert.ok(typeof eventName === "string" || typeof eventName === "symbol", "nanobus.on: eventName should be type string or symbol");
    assert.equal(typeof listener, "function", "nanobus.on: listener should be type function");
    if (eventName === "*") {
      this._starListeners.push(listener);
    } else {
      if (!this._listeners[eventName]) this._listeners[eventName] = [];
      this._listeners[eventName].push(listener);
    }
    return this;
  };
  Nanobus.prototype.prependListener = function(eventName, listener) {
    assert.ok(typeof eventName === "string" || typeof eventName === "symbol", "nanobus.prependListener: eventName should be type string or symbol");
    assert.equal(typeof listener, "function", "nanobus.prependListener: listener should be type function");
    if (eventName === "*") {
      this._starListeners.unshift(listener);
    } else {
      if (!this._listeners[eventName]) this._listeners[eventName] = [];
      this._listeners[eventName].unshift(listener);
    }
    return this;
  };
  Nanobus.prototype.once = function(eventName, listener) {
    assert.ok(typeof eventName === "string" || typeof eventName === "symbol", "nanobus.once: eventName should be type string or symbol");
    assert.equal(typeof listener, "function", "nanobus.once: listener should be type function");
    var self = this;
    this.on(eventName, once);
    function once() {
      listener.apply(self, arguments);
      self.removeListener(eventName, once);
    }
    return this;
  };
  Nanobus.prototype.prependOnceListener = function(eventName, listener) {
    assert.ok(typeof eventName === "string" || typeof eventName === "symbol", "nanobus.prependOnceListener: eventName should be type string or symbol");
    assert.equal(typeof listener, "function", "nanobus.prependOnceListener: listener should be type function");
    var self = this;
    this.prependListener(eventName, once);
    function once() {
      listener.apply(self, arguments);
      self.removeListener(eventName, once);
    }
    return this;
  };
  Nanobus.prototype.removeListener = function(eventName, listener) {
    assert.ok(typeof eventName === "string" || typeof eventName === "symbol", "nanobus.removeListener: eventName should be type string or symbol");
    assert.equal(typeof listener, "function", "nanobus.removeListener: listener should be type function");
    if (eventName === "*") {
      this._starListeners = this._starListeners.slice();
      return remove(this._starListeners, listener);
    } else {
      if (typeof this._listeners[eventName] !== "undefined") {
        this._listeners[eventName] = this._listeners[eventName].slice();
      }
      return remove(this._listeners[eventName], listener);
    }
    function remove(arr, listener2) {
      if (!arr) return;
      var index = arr.indexOf(listener2);
      if (index !== -1) {
        splice(arr, index, 1);
        return true;
      }
    }
  };
  Nanobus.prototype.removeAllListeners = function(eventName) {
    if (eventName) {
      if (eventName === "*") {
        this._starListeners = [];
      } else {
        this._listeners[eventName] = [];
      }
    } else {
      this._starListeners = [];
      this._listeners = {};
    }
    return this;
  };
  Nanobus.prototype.listeners = function(eventName) {
    var listeners = eventName !== "*" ? this._listeners[eventName] : this._starListeners;
    var ret = [];
    if (listeners) {
      var ilength = listeners.length;
      for (var i = 0; i < ilength; i++) ret.push(listeners[i]);
    }
    return ret;
  };
  Nanobus.prototype._emit = function(arr, eventName, data, uuid) {
    if (typeof arr === "undefined") return;
    if (arr.length === 0) return;
    if (data === void 0) {
      data = eventName;
      eventName = null;
    }
    if (eventName) {
      if (uuid !== void 0) {
        data = [eventName].concat(data, uuid);
      } else {
        data = [eventName].concat(data);
      }
    }
    var length2 = arr.length;
    for (var i = 0; i < length2; i++) {
      var listener = arr[i];
      listener.apply(listener, data);
    }
  };
  return nanobus;
}
var nanolru;
var hasRequiredNanolru;
function requireNanolru() {
  if (hasRequiredNanolru) return nanolru;
  hasRequiredNanolru = 1;
  nanolru = LRU;
  function LRU(opts) {
    if (!(this instanceof LRU)) return new LRU(opts);
    if (typeof opts === "number") opts = { max: opts };
    if (!opts) opts = {};
    this.cache = {};
    this.head = this.tail = null;
    this.length = 0;
    this.max = opts.max || 1e3;
    this.maxAge = opts.maxAge || 0;
  }
  Object.defineProperty(LRU.prototype, "keys", {
    get: function() {
      return Object.keys(this.cache);
    }
  });
  LRU.prototype.clear = function() {
    this.cache = {};
    this.head = this.tail = null;
    this.length = 0;
  };
  LRU.prototype.remove = function(key) {
    if (typeof key !== "string") key = "" + key;
    if (!this.cache.hasOwnProperty(key)) return;
    var element = this.cache[key];
    delete this.cache[key];
    this._unlink(key, element.prev, element.next);
    return element.value;
  };
  LRU.prototype._unlink = function(key, prev2, next2) {
    this.length--;
    if (this.length === 0) {
      this.head = this.tail = null;
    } else {
      if (this.head === key) {
        this.head = prev2;
        this.cache[this.head].next = null;
      } else if (this.tail === key) {
        this.tail = next2;
        this.cache[this.tail].prev = null;
      } else {
        this.cache[prev2].next = next2;
        this.cache[next2].prev = prev2;
      }
    }
  };
  LRU.prototype.peek = function(key) {
    if (!this.cache.hasOwnProperty(key)) return;
    var element = this.cache[key];
    if (!this._checkAge(key, element)) return;
    return element.value;
  };
  LRU.prototype.set = function(key, value) {
    if (typeof key !== "string") key = "" + key;
    var element;
    if (this.cache.hasOwnProperty(key)) {
      element = this.cache[key];
      element.value = value;
      if (this.maxAge) element.modified = Date.now();
      if (key === this.head) return value;
      this._unlink(key, element.prev, element.next);
    } else {
      element = { value, modified: 0, next: null, prev: null };
      if (this.maxAge) element.modified = Date.now();
      this.cache[key] = element;
      if (this.length === this.max) this.evict();
    }
    this.length++;
    element.next = null;
    element.prev = this.head;
    if (this.head) this.cache[this.head].next = key;
    this.head = key;
    if (!this.tail) this.tail = key;
    return value;
  };
  LRU.prototype._checkAge = function(key, element) {
    if (this.maxAge && Date.now() - element.modified > this.maxAge) {
      this.remove(key);
      return false;
    }
    return true;
  };
  LRU.prototype.get = function(key) {
    if (typeof key !== "string") key = "" + key;
    if (!this.cache.hasOwnProperty(key)) return;
    var element = this.cache[key];
    if (!this._checkAge(key, element)) return;
    if (this.head !== key) {
      if (key === this.tail) {
        this.tail = element.next;
        this.cache[this.tail].prev = null;
      } else {
        this.cache[element.prev].next = element.next;
      }
      this.cache[element.next].prev = element.prev;
      this.cache[this.head].next = key;
      element.prev = this.head;
      element.next = null;
      this.head = key;
    }
    return element.value;
  };
  LRU.prototype.evict = function() {
    if (!this.tail) return;
    this.remove(this.tail);
  };
  return nanolru;
}
var cache;
var hasRequiredCache;
function requireCache() {
  if (hasRequiredCache) return cache;
  hasRequiredCache = 1;
  var assert = requireNanoassert();
  var LRU = requireNanolru();
  cache = ChooComponentCache;
  function ChooComponentCache(state, emit, lru) {
    assert.ok(this instanceof ChooComponentCache, "ChooComponentCache should be created with `new`");
    assert.equal(typeof state, "object", "ChooComponentCache: state should be type object");
    assert.equal(typeof emit, "function", "ChooComponentCache: emit should be type function");
    if (typeof lru === "number") this.cache = new LRU(lru);
    else this.cache = lru || new LRU(100);
    this.state = state;
    this.emit = emit;
  }
  ChooComponentCache.prototype.render = function(Component, id) {
    assert.equal(typeof Component, "function", "ChooComponentCache.render: Component should be type function");
    assert.ok(typeof id === "string" || typeof id === "number", "ChooComponentCache.render: id should be type string or type number");
    var el = this.cache.get(id);
    if (!el) {
      var args = [];
      for (var i = 2, len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
      }
      args.unshift(Component, id, this.state, this.emit);
      el = newCall.apply(newCall, args);
      this.cache.set(id, el);
    }
    return el;
  };
  function newCall(Cls) {
    return new (Cls.bind.apply(Cls, arguments))();
  }
  return cache;
}
var choo$1;
var hasRequiredChoo;
function requireChoo() {
  if (hasRequiredChoo) return choo$1;
  hasRequiredChoo = 1;
  var scrollToAnchor = requireScrollToAnchor();
  var documentReady2 = requireDocumentReady();
  var nanotiming = requireBrowser$2();
  var nanorouter2 = requireNanorouter();
  var nanomorph = requireNanomorph();
  var nanoquery = requireBrowser$1();
  var nanohref2 = requireNanohref();
  var nanoraf = requireNanoraf();
  var nanobus2 = requireNanobus();
  var assert = requireNanoassert();
  var Cache = requireCache();
  choo$1 = Choo;
  var HISTORY_OBJECT = {};
  function Choo(opts) {
    var timing = nanotiming("choo.constructor");
    if (!(this instanceof Choo)) return new Choo(opts);
    opts = opts || {};
    assert.equal(typeof opts, "object", "choo: opts should be type object");
    var self = this;
    this._events = {
      DOMCONTENTLOADED: "DOMContentLoaded",
      DOMTITLECHANGE: "DOMTitleChange",
      REPLACESTATE: "replaceState",
      PUSHSTATE: "pushState",
      NAVIGATE: "navigate",
      POPSTATE: "popState",
      RENDER: "render"
    };
    this._historyEnabled = opts.history === void 0 ? true : opts.history;
    this._hrefEnabled = opts.href === void 0 ? true : opts.href;
    this._hashEnabled = opts.hash === void 0 ? false : opts.hash;
    this._hasWindow = typeof window !== "undefined";
    this._cache = opts.cache;
    this._loaded = false;
    this._stores = [ondomtitlechange];
    this._tree = null;
    var _state = {
      events: this._events,
      components: {}
    };
    if (this._hasWindow) {
      this.state = window.initialState ? Object.assign({}, window.initialState, _state) : _state;
      delete window.initialState;
    } else {
      this.state = _state;
    }
    this.router = nanorouter2({ curry: true });
    this.emitter = nanobus2("choo.emit");
    this.emit = this.emitter.emit.bind(this.emitter);
    if (this._hasWindow) this.state.title = document.title;
    function ondomtitlechange(state) {
      self.emitter.prependListener(self._events.DOMTITLECHANGE, function(title) {
        assert.equal(typeof title, "string", "events.DOMTitleChange: title should be type string");
        state.title = title;
        if (self._hasWindow) document.title = title;
      });
    }
    timing();
  }
  Choo.prototype.route = function(route, handler) {
    var routeTiming = nanotiming("choo.route('" + route + "')");
    assert.equal(typeof route, "string", "choo.route: route should be type string");
    assert.equal(typeof handler, "function", "choo.handler: route should be type function");
    this.router.on(route, handler);
    routeTiming();
  };
  Choo.prototype.use = function(cb) {
    assert.equal(typeof cb, "function", "choo.use: cb should be type function");
    var self = this;
    this._stores.push(function(state) {
      var msg = "choo.use";
      msg = cb.storeName ? msg + "(" + cb.storeName + ")" : msg;
      var endTiming = nanotiming(msg);
      cb(state, self.emitter, self);
      endTiming();
    });
  };
  Choo.prototype.start = function() {
    assert.equal(typeof window, "object", "choo.start: window was not found. .start() must be called in a browser, use .toString() if running in Node");
    var startTiming = nanotiming("choo.start");
    var self = this;
    if (this._historyEnabled) {
      this.emitter.prependListener(this._events.NAVIGATE, function() {
        self._matchRoute(self.state);
        if (self._loaded) {
          self.emitter.emit(self._events.RENDER);
          setTimeout(scrollToAnchor.bind(null, window.location.hash), 0);
        }
      });
      this.emitter.prependListener(this._events.POPSTATE, function() {
        self.emitter.emit(self._events.NAVIGATE);
      });
      this.emitter.prependListener(this._events.PUSHSTATE, function(href) {
        assert.equal(typeof href, "string", "events.pushState: href should be type string");
        window.history.pushState(HISTORY_OBJECT, null, href);
        self.emitter.emit(self._events.NAVIGATE);
      });
      this.emitter.prependListener(this._events.REPLACESTATE, function(href) {
        assert.equal(typeof href, "string", "events.replaceState: href should be type string");
        window.history.replaceState(HISTORY_OBJECT, null, href);
        self.emitter.emit(self._events.NAVIGATE);
      });
      window.onpopstate = function() {
        self.emitter.emit(self._events.POPSTATE);
      };
      if (self._hrefEnabled) {
        nanohref2(function(location) {
          var href = location.href;
          var hash2 = location.hash;
          if (href === window.location.href) {
            if (!self._hashEnabled && hash2) scrollToAnchor(hash2);
            return;
          }
          self.emitter.emit(self._events.PUSHSTATE, href);
        });
      }
    }
    this._setCache(this.state);
    this._matchRoute(this.state);
    this._stores.forEach(function(initStore) {
      initStore(self.state);
    });
    this._tree = this._prerender(this.state);
    assert.ok(this._tree, "choo.start: no valid DOM node returned for location " + this.state.href);
    this.emitter.prependListener(self._events.RENDER, nanoraf(function() {
      var renderTiming = nanotiming("choo.render");
      var newTree = self._prerender(self.state);
      assert.ok(newTree, "choo.render: no valid DOM node returned for location " + self.state.href);
      assert.equal(self._tree.nodeName, newTree.nodeName, "choo.render: The target node <" + self._tree.nodeName.toLowerCase() + "> is not the same type as the new node <" + newTree.nodeName.toLowerCase() + ">.");
      var morphTiming = nanotiming("choo.morph");
      nanomorph(self._tree, newTree);
      morphTiming();
      renderTiming();
    }));
    documentReady2(function() {
      self.emitter.emit(self._events.DOMCONTENTLOADED);
      self._loaded = true;
    });
    startTiming();
    return this._tree;
  };
  Choo.prototype.mount = function mount(selector) {
    var mountTiming = nanotiming("choo.mount('" + selector + "')");
    if (typeof window !== "object") {
      assert.ok(typeof selector === "string", "choo.mount: selector should be type String");
      this.selector = selector;
      mountTiming();
      return this;
    }
    assert.ok(typeof selector === "string" || typeof selector === "object", "choo.mount: selector should be type String or HTMLElement");
    var self = this;
    documentReady2(function() {
      var renderTiming = nanotiming("choo.render");
      var newTree = self.start();
      if (typeof selector === "string") {
        self._tree = document.querySelector(selector);
      } else {
        self._tree = selector;
      }
      assert.ok(self._tree, "choo.mount: could not query selector: " + selector);
      assert.equal(self._tree.nodeName, newTree.nodeName, "choo.mount: The target node <" + self._tree.nodeName.toLowerCase() + "> is not the same type as the new node <" + newTree.nodeName.toLowerCase() + ">.");
      var morphTiming = nanotiming("choo.morph");
      nanomorph(self._tree, newTree);
      morphTiming();
      renderTiming();
    });
    mountTiming();
  };
  Choo.prototype.toString = function(location, state) {
    state = state || {};
    state.components = state.components || {};
    state.events = Object.assign({}, state.events, this._events);
    assert.notEqual(typeof window, "object", "choo.mount: window was found. .toString() must be called in Node, use .start() or .mount() if running in the browser");
    assert.equal(typeof location, "string", "choo.toString: location should be type string");
    assert.equal(typeof state, "object", "choo.toString: state should be type object");
    this._setCache(state);
    this._matchRoute(state, location);
    this.emitter.removeAllListeners();
    this._stores.forEach(function(initStore) {
      initStore(state);
    });
    var html2 = this._prerender(state);
    assert.ok(html2, "choo.toString: no valid value returned for the route " + location);
    assert(!Array.isArray(html2), "choo.toString: return value was an array for the route " + location);
    return typeof html2.outerHTML === "string" ? html2.outerHTML : html2.toString();
  };
  Choo.prototype._matchRoute = function(state, locationOverride) {
    var location, queryString;
    if (locationOverride) {
      location = locationOverride.replace(/\?.+$/, "").replace(/\/$/, "");
      if (!this._hashEnabled) location = location.replace(/#.+$/, "");
      queryString = locationOverride;
    } else {
      location = window.location.pathname.replace(/\/$/, "");
      if (this._hashEnabled) location += window.location.hash.replace(/^#/, "/");
      queryString = window.location.search;
    }
    var matched = this.router.match(location);
    this._handler = matched.cb;
    state.href = location;
    state.query = nanoquery(queryString);
    state.route = matched.route;
    state.params = matched.params;
  };
  Choo.prototype._prerender = function(state) {
    var routeTiming = nanotiming("choo.prerender('" + state.route + "')");
    var res = this._handler(state, this.emit);
    routeTiming();
    return res;
  };
  Choo.prototype._setCache = function(state) {
    var cache2 = new Cache(state, this.emitter.emit.bind(this.emitter), this._cache);
    state.cache = renderComponent;
    function renderComponent(Component, id) {
      assert.equal(typeof Component, "function", "choo.state.cache: Component should be type function");
      var args = [];
      for (var i = 0, len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
      }
      return cache2.render.apply(cache2, args);
    }
    renderComponent.toJSON = function() {
      return null;
    };
  };
  return choo$1;
}
var chooExports = requireChoo();
const choo = /* @__PURE__ */ getDefaultExportFromCjs(chooExports);
var hyperscriptAttributeToProperty;
var hasRequiredHyperscriptAttributeToProperty;
function requireHyperscriptAttributeToProperty() {
  if (hasRequiredHyperscriptAttributeToProperty) return hyperscriptAttributeToProperty;
  hasRequiredHyperscriptAttributeToProperty = 1;
  hyperscriptAttributeToProperty = attributeToProperty;
  var transform = {
    "class": "className",
    "for": "htmlFor",
    "http-equiv": "httpEquiv"
  };
  function attributeToProperty(h) {
    return function(tagName, attrs, children) {
      for (var attr in attrs) {
        if (attr in transform) {
          attrs[transform[attr]] = attrs[attr];
          delete attrs[attr];
        }
      }
      return h(tagName, attrs, children);
    };
  }
  return hyperscriptAttributeToProperty;
}
var hyperx;
var hasRequiredHyperx;
function requireHyperx() {
  if (hasRequiredHyperx) return hyperx;
  hasRequiredHyperx = 1;
  var attrToProp = requireHyperscriptAttributeToProperty();
  var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4;
  var ATTR_KEY = 5, ATTR_KEY_W = 6;
  var ATTR_VALUE_W = 7, ATTR_VALUE = 8;
  var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10;
  var ATTR_EQ = 11, ATTR_BREAK = 12;
  var COMMENT2 = 13;
  hyperx = function(h, opts) {
    if (!opts) opts = {};
    var concat = opts.concat || function(a, b) {
      return String(a) + String(b);
    };
    if (opts.attrToProp !== false) {
      h = attrToProp(h);
    }
    return function(strings) {
      var state = TEXT, reg = "";
      var arglen = arguments.length;
      var parts = [];
      for (var i = 0; i < strings.length; i++) {
        if (i < arglen - 1) {
          var arg = arguments[i + 1];
          var p = parse2(strings[i]);
          var xstate = state;
          if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE;
          if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE;
          if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE;
          if (xstate === ATTR) xstate = ATTR_KEY;
          if (xstate === OPEN) {
            if (reg === "/") {
              p.push([OPEN, "/", arg]);
              reg = "";
            } else {
              p.push([OPEN, arg]);
            }
          } else if (xstate === COMMENT2 && opts.comments) {
            reg += String(arg);
          } else if (xstate !== COMMENT2) {
            p.push([VAR, xstate, arg]);
          }
          parts.push.apply(parts, p);
        } else parts.push.apply(parts, parse2(strings[i]));
      }
      var tree = [null, {}, []];
      var stack = [[tree, -1]];
      for (var i = 0; i < parts.length; i++) {
        var cur = stack[stack.length - 1][0];
        var p = parts[i], s = p[0];
        if (s === OPEN && /^\//.test(p[1])) {
          var ix = stack[stack.length - 1][1];
          if (stack.length > 1) {
            stack.pop();
            stack[stack.length - 1][0][2][ix] = h(
              cur[0],
              cur[1],
              cur[2].length ? cur[2] : void 0
            );
          }
        } else if (s === OPEN) {
          var c = [p[1], {}, []];
          cur[2].push(c);
          stack.push([c, cur[2].length - 1]);
        } else if (s === ATTR_KEY || s === VAR && p[1] === ATTR_KEY) {
          var key = "";
          var copyKey;
          for (; i < parts.length; i++) {
            if (parts[i][0] === ATTR_KEY) {
              key = concat(key, parts[i][1]);
            } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
              if (typeof parts[i][2] === "object" && !key) {
                for (copyKey in parts[i][2]) {
                  if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                    cur[1][copyKey] = parts[i][2][copyKey];
                  }
                }
              } else {
                key = concat(key, parts[i][2]);
              }
            } else break;
          }
          if (parts[i][0] === ATTR_EQ) i++;
          var j = i;
          for (; i < parts.length; i++) {
            if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
              if (!cur[1][key]) cur[1][key] = strfn(parts[i][1]);
              else parts[i][1] === "" || (cur[1][key] = concat(cur[1][key], parts[i][1]));
            } else if (parts[i][0] === VAR && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
              if (!cur[1][key]) cur[1][key] = strfn(parts[i][2]);
              else parts[i][2] === "" || (cur[1][key] = concat(cur[1][key], parts[i][2]));
            } else {
              if (key.length && !cur[1][key] && i === j && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
                cur[1][key] = key.toLowerCase();
              }
              if (parts[i][0] === CLOSE) {
                i--;
              }
              break;
            }
          }
        } else if (s === ATTR_KEY) {
          cur[1][p[1]] = true;
        } else if (s === VAR && p[1] === ATTR_KEY) {
          cur[1][p[2]] = true;
        } else if (s === CLOSE) {
          if (selfClosing(cur[0]) && stack.length) {
            var ix = stack[stack.length - 1][1];
            stack.pop();
            stack[stack.length - 1][0][2][ix] = h(
              cur[0],
              cur[1],
              cur[2].length ? cur[2] : void 0
            );
          }
        } else if (s === VAR && p[1] === TEXT) {
          if (p[2] === void 0 || p[2] === null) p[2] = "";
          else if (!p[2]) p[2] = concat("", p[2]);
          if (Array.isArray(p[2][0])) {
            cur[2].push.apply(cur[2], p[2]);
          } else {
            cur[2].push(p[2]);
          }
        } else if (s === TEXT) {
          cur[2].push(p[1]);
        } else if (s === ATTR_EQ || s === ATTR_BREAK) ;
        else {
          throw new Error("unhandled: " + s);
        }
      }
      if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
        tree[2].shift();
      }
      if (tree[2].length > 2 || tree[2].length === 2 && /\S/.test(tree[2][1])) {
        if (opts.createFragment) return opts.createFragment(tree[2]);
        throw new Error(
          "multiple root elements must be wrapped in an enclosing tag"
        );
      }
      if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === "string" && Array.isArray(tree[2][0][2])) {
        tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2]);
      }
      return tree[2][0];
      function parse2(str) {
        var res = [];
        if (state === ATTR_VALUE_W) state = ATTR;
        for (var i2 = 0; i2 < str.length; i2++) {
          var c2 = str.charAt(i2);
          if (state === TEXT && c2 === "<") {
            if (reg.length) res.push([TEXT, reg]);
            reg = "";
            state = OPEN;
          } else if (c2 === ">" && !quot(state) && state !== COMMENT2) {
            if (state === OPEN && reg.length) {
              res.push([OPEN, reg]);
            } else if (state === ATTR_KEY) {
              res.push([ATTR_KEY, reg]);
            } else if (state === ATTR_VALUE && reg.length) {
              res.push([ATTR_VALUE, reg]);
            }
            res.push([CLOSE]);
            reg = "";
            state = TEXT;
          } else if (state === COMMENT2 && /-$/.test(reg) && c2 === "-") {
            if (opts.comments) {
              res.push([ATTR_VALUE, reg.substr(0, reg.length - 1)]);
            }
            reg = "";
            state = TEXT;
          } else if (state === OPEN && /^!--$/.test(reg)) {
            if (opts.comments) {
              res.push([OPEN, reg], [ATTR_KEY, "comment"], [ATTR_EQ]);
            }
            reg = c2;
            state = COMMENT2;
          } else if (state === TEXT || state === COMMENT2) {
            reg += c2;
          } else if (state === OPEN && c2 === "/" && reg.length) ;
          else if (state === OPEN && /\s/.test(c2)) {
            if (reg.length) {
              res.push([OPEN, reg]);
            }
            reg = "";
            state = ATTR;
          } else if (state === OPEN) {
            reg += c2;
          } else if (state === ATTR && /[^\s"'=/]/.test(c2)) {
            state = ATTR_KEY;
            reg = c2;
          } else if (state === ATTR && /\s/.test(c2)) {
            if (reg.length) res.push([ATTR_KEY, reg]);
            res.push([ATTR_BREAK]);
          } else if (state === ATTR_KEY && /\s/.test(c2)) {
            res.push([ATTR_KEY, reg]);
            reg = "";
            state = ATTR_KEY_W;
          } else if (state === ATTR_KEY && c2 === "=") {
            res.push([ATTR_KEY, reg], [ATTR_EQ]);
            reg = "";
            state = ATTR_VALUE_W;
          } else if (state === ATTR_KEY) {
            reg += c2;
          } else if ((state === ATTR_KEY_W || state === ATTR) && c2 === "=") {
            res.push([ATTR_EQ]);
            state = ATTR_VALUE_W;
          } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c2)) {
            res.push([ATTR_BREAK]);
            if (/[\w-]/.test(c2)) {
              reg += c2;
              state = ATTR_KEY;
            } else state = ATTR;
          } else if (state === ATTR_VALUE_W && c2 === '"') {
            state = ATTR_VALUE_DQ;
          } else if (state === ATTR_VALUE_W && c2 === "'") {
            state = ATTR_VALUE_SQ;
          } else if (state === ATTR_VALUE_DQ && c2 === '"') {
            res.push([ATTR_VALUE, reg], [ATTR_BREAK]);
            reg = "";
            state = ATTR;
          } else if (state === ATTR_VALUE_SQ && c2 === "'") {
            res.push([ATTR_VALUE, reg], [ATTR_BREAK]);
            reg = "";
            state = ATTR;
          } else if (state === ATTR_VALUE_W && !/\s/.test(c2)) {
            state = ATTR_VALUE;
            i2--;
          } else if (state === ATTR_VALUE && /\s/.test(c2)) {
            res.push([ATTR_VALUE, reg], [ATTR_BREAK]);
            reg = "";
            state = ATTR;
          } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ) {
            reg += c2;
          }
        }
        if (state === TEXT && reg.length) {
          res.push([TEXT, reg]);
          reg = "";
        } else if (state === ATTR_VALUE && reg.length) {
          res.push([ATTR_VALUE, reg]);
          reg = "";
        } else if (state === ATTR_VALUE_DQ && reg.length) {
          res.push([ATTR_VALUE, reg]);
          reg = "";
        } else if (state === ATTR_VALUE_SQ && reg.length) {
          res.push([ATTR_VALUE, reg]);
          reg = "";
        } else if (state === ATTR_KEY) {
          res.push([ATTR_KEY, reg]);
          reg = "";
        }
        return res;
      }
    };
    function strfn(x) {
      if (typeof x === "function") return x;
      else if (typeof x === "string") return x;
      else if (x && typeof x === "object") return x;
      else if (x === null || x === void 0) return x;
      else return concat("", x);
    }
  };
  function quot(state) {
    return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ;
  }
  var closeRE = RegExp("^(" + [
    "area",
    "base",
    "basefont",
    "bgsound",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
    "!--",
    // SVG TAGS
    "animate",
    "animateTransform",
    "circle",
    "cursor",
    "desc",
    "ellipse",
    "feBlend",
    "feColorMatrix",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "font-face-format",
    "font-face-name",
    "font-face-uri",
    "glyph",
    "glyphRef",
    "hkern",
    "image",
    "line",
    "missing-glyph",
    "mpath",
    "path",
    "polygon",
    "polyline",
    "rect",
    "set",
    "stop",
    "tref",
    "use",
    "view",
    "vkern"
  ].join("|") + ")(?:[.#][a-zA-Z0-9-￿_:-]+)*$");
  function selfClosing(tag) {
    return closeRE.test(tag);
  }
  return hyperx;
}
var appendChild;
var hasRequiredAppendChild;
function requireAppendChild() {
  if (hasRequiredAppendChild) return appendChild;
  hasRequiredAppendChild = 1;
  var trailingNewlineRegex = /\n[\s]+$/;
  var leadingNewlineRegex = /^\n[\s]+/;
  var trailingSpaceRegex = /[\s]+$/;
  var leadingSpaceRegex = /^[\s]+/;
  var multiSpaceRegex = /[\n\s]+/g;
  var TEXT_TAGS = [
    "a",
    "abbr",
    "b",
    "bdi",
    "bdo",
    "br",
    "cite",
    "data",
    "dfn",
    "em",
    "i",
    "kbd",
    "mark",
    "q",
    "rp",
    "rt",
    "rtc",
    "ruby",
    "s",
    "amp",
    "small",
    "span",
    "strong",
    "sub",
    "sup",
    "time",
    "u",
    "var",
    "wbr"
  ];
  var VERBATIM_TAGS = [
    "code",
    "pre",
    "textarea"
  ];
  appendChild = function appendChild2(el, childs) {
    if (!Array.isArray(childs)) return;
    var nodeName = el.nodeName.toLowerCase();
    var hadText = false;
    var value, leader;
    for (var i = 0, len = childs.length; i < len; i++) {
      var node2 = childs[i];
      if (Array.isArray(node2)) {
        appendChild2(el, node2);
        continue;
      }
      if (typeof node2 === "number" || typeof node2 === "boolean" || typeof node2 === "function" || node2 instanceof Date || node2 instanceof RegExp) {
        node2 = node2.toString();
      }
      var lastChild = el.childNodes[el.childNodes.length - 1];
      if (typeof node2 === "string") {
        hadText = true;
        if (lastChild && lastChild.nodeName === "#text") {
          lastChild.nodeValue += node2;
        } else {
          node2 = el.ownerDocument.createTextNode(node2);
          el.appendChild(node2);
          lastChild = node2;
        }
        if (i === len - 1) {
          hadText = false;
          if (TEXT_TAGS.indexOf(nodeName) === -1 && VERBATIM_TAGS.indexOf(nodeName) === -1) {
            value = lastChild.nodeValue.replace(leadingNewlineRegex, "").replace(trailingSpaceRegex, "").replace(trailingNewlineRegex, "").replace(multiSpaceRegex, " ");
            if (value === "") {
              el.removeChild(lastChild);
            } else {
              lastChild.nodeValue = value;
            }
          } else if (VERBATIM_TAGS.indexOf(nodeName) === -1) {
            leader = i === 0 ? "" : " ";
            value = lastChild.nodeValue.replace(leadingNewlineRegex, leader).replace(leadingSpaceRegex, " ").replace(trailingSpaceRegex, "").replace(trailingNewlineRegex, "").replace(multiSpaceRegex, " ");
            lastChild.nodeValue = value;
          }
        }
      } else if (node2 && node2.nodeType) {
        if (hadText) {
          hadText = false;
          if (TEXT_TAGS.indexOf(nodeName) === -1 && VERBATIM_TAGS.indexOf(nodeName) === -1) {
            value = lastChild.nodeValue.replace(leadingNewlineRegex, "").replace(trailingNewlineRegex, " ").replace(multiSpaceRegex, " ");
            if (value === "") {
              el.removeChild(lastChild);
            } else {
              lastChild.nodeValue = value;
            }
          } else if (VERBATIM_TAGS.indexOf(nodeName) === -1) {
            value = lastChild.nodeValue.replace(leadingSpaceRegex, " ").replace(leadingNewlineRegex, "").replace(trailingNewlineRegex, " ").replace(multiSpaceRegex, " ");
            lastChild.nodeValue = value;
          }
        }
        var _nodeName = node2.nodeName;
        if (_nodeName) nodeName = _nodeName.toLowerCase();
        el.appendChild(node2);
      }
    }
  };
  return appendChild;
}
var svgTags;
var hasRequiredSvgTags;
function requireSvgTags() {
  if (hasRequiredSvgTags) return svgTags;
  hasRequiredSvgTags = 1;
  svgTags = [
    "svg",
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animate",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "circle",
    "clipPath",
    "color-profile",
    "cursor",
    "defs",
    "desc",
    "ellipse",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "filter",
    "font",
    "font-face",
    "font-face-format",
    "font-face-name",
    "font-face-src",
    "font-face-uri",
    "foreignObject",
    "g",
    "glyph",
    "glyphRef",
    "hkern",
    "image",
    "line",
    "linearGradient",
    "marker",
    "mask",
    "metadata",
    "missing-glyph",
    "mpath",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "set",
    "stop",
    "switch",
    "symbol",
    "text",
    "textPath",
    "title",
    "tref",
    "tspan",
    "use",
    "view",
    "vkern"
  ];
  return svgTags;
}
var boolProps;
var hasRequiredBoolProps;
function requireBoolProps() {
  if (hasRequiredBoolProps) return boolProps;
  hasRequiredBoolProps = 1;
  boolProps = [
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "defaultchecked",
    "defer",
    "disabled",
    "formnovalidate",
    "hidden",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "selected"
  ];
  return boolProps;
}
var directProps;
var hasRequiredDirectProps;
function requireDirectProps() {
  if (hasRequiredDirectProps) return directProps;
  hasRequiredDirectProps = 1;
  directProps = [
    "indeterminate"
  ];
  return directProps;
}
var dom;
var hasRequiredDom;
function requireDom() {
  if (hasRequiredDom) return dom;
  hasRequiredDom = 1;
  var hyperx2 = requireHyperx();
  var appendChild2 = requireAppendChild();
  var SVG_TAGS = requireSvgTags();
  var BOOL_PROPS = requireBoolProps();
  var DIRECT_PROPS = requireDirectProps();
  var SVGNS = "http://www.w3.org/2000/svg";
  var XLINKNS = "http://www.w3.org/1999/xlink";
  var COMMENT_TAG = "!--";
  dom = function(document2) {
    function nanoHtmlCreateElement(tag, props, children) {
      var el;
      if (SVG_TAGS.indexOf(tag) !== -1) {
        props.namespace = SVGNS;
      }
      var ns = false;
      if (props.namespace) {
        ns = props.namespace;
        delete props.namespace;
      }
      var isCustomElement = false;
      if (props.is) {
        isCustomElement = props.is;
        delete props.is;
      }
      if (ns) {
        if (isCustomElement) {
          el = document2.createElementNS(ns, tag, { is: isCustomElement });
        } else {
          el = document2.createElementNS(ns, tag);
        }
      } else if (tag === COMMENT_TAG) {
        return document2.createComment(props.comment);
      } else if (isCustomElement) {
        el = document2.createElement(tag, { is: isCustomElement });
      } else {
        el = document2.createElement(tag);
      }
      for (var p in props) {
        if (props.hasOwnProperty(p)) {
          var key = p.toLowerCase();
          var val = props[p];
          if (key === "classname") {
            key = "class";
            p = "class";
          }
          if (p === "htmlFor") {
            p = "for";
          }
          if (BOOL_PROPS.indexOf(key) !== -1) {
            if (String(val) === "true") val = key;
            else if (String(val) === "false") continue;
          }
          if (key.slice(0, 2) === "on" || DIRECT_PROPS.indexOf(key) !== -1) {
            el[p] = val;
          } else {
            if (ns) {
              if (p === "xlink:href") {
                el.setAttributeNS(XLINKNS, p, val);
              } else if (/^xmlns($|:)/i.test(p)) ;
              else {
                el.setAttributeNS(null, p, val);
              }
            } else {
              el.setAttribute(p, val);
            }
          }
        }
      }
      appendChild2(el, children);
      return el;
    }
    function createFragment(nodes) {
      var fragment = document2.createDocumentFragment();
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i] == null) continue;
        if (Array.isArray(nodes[i])) {
          fragment.appendChild(createFragment(nodes[i]));
        } else {
          if (typeof nodes[i] === "string") nodes[i] = document2.createTextNode(nodes[i]);
          fragment.appendChild(nodes[i]);
        }
      }
      return fragment;
    }
    var exports = hyperx2(nanoHtmlCreateElement, {
      comments: true,
      createFragment
    });
    exports.default = exports;
    exports.createComment = nanoHtmlCreateElement;
    return exports;
  };
  return dom;
}
var browser;
var hasRequiredBrowser;
function requireBrowser() {
  if (hasRequiredBrowser) return browser;
  hasRequiredBrowser = 1;
  browser = requireDom()(document);
  return browser;
}
var html$1;
var hasRequiredHtml;
function requireHtml() {
  if (hasRequiredHtml) return html$1;
  hasRequiredHtml = 1;
  html$1 = requireBrowser();
  return html$1;
}
var htmlExports = requireHtml();
const html = /* @__PURE__ */ getDefaultExportFromCjs(htmlExports);
var sc = [
  {
    start: /* @__PURE__ */ new Date("November 3, 2025"),
    title: "card.glitches.me",
    type: ["workshop"],
    topic: ["dance", "card"],
    image: "/2025-11-03-card.jpg",
    collab: ["Naoto Hieda"],
    venue: "Trafó (Hungary)",
    links: ["https://trafo.hu/en/programs/mesterseges_valosagok_modina_seminar"],
    desc: html`
    Workshop at Artificial Realities Free School, supported by MODINA
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 10, 2025"),
    title: "Digitale Welten",
    type: ["workshop"],
    topic: ["code", "hackathon"],
    image: "/2025-10-10-dw.jpg",
    collab: ["Naoto Hieda"],
    venue: "Digitale Welten (Germany)",
    links: ["https://www.digitale-welten.org/"],
    desc: html`
    Participated as an artist, created a zine with Alex Roidl and Elizaveta Kazantseva
    `
  },
  {
    start: /* @__PURE__ */ new Date("September 26, 2025"),
    title: "card.glitches.me",
    type: ["workshop"],
    topic: ["dance", "card"],
    image: "/gtf2025.jpg",
    collab: ["Naoto Hieda"],
    venue: "Annual symposium of the Society for Dance Research (Germany)",
    links: ["https://www.gtf-tanzforschung.de/en/convention/symposium-2025/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("September 14, 2025"),
    title: "Introduction to live coding with Hydra",
    type: ["workshop"],
    topic: ["hydra"],
    image: "/nodecode-ws.jpg",
    collab: ["Naoto Hieda"],
    venue: "NODE+CODE (Germany)",
    links: ["https://nodeforum.org/announcements/workshop-introduction-to-live-coding-with-hydra/", "https://www.youtube.com/live/R2cvbOaA2PI"],
    desc: html``
  },
  {
    start: /* @__PURE__ */ new Date("September 13, 2025"),
    title: "NODE+CODE #21 – On The Move",
    type: ["lecture"],
    topic: ["hydra"],
    image: "/nodecode.jpg",
    collab: ["Naoto Hieda"],
    venue: "NODE+CODE (Germany)",
    links: ["https://nodeforum.org/announcements/nodecode-21-on-the-move/"],
    desc: html``
  },
  {
    start: /* @__PURE__ */ new Date("September 12, 2025"),
    title: "CCL Zine",
    type: ["publication"],
    topic: ["dance"],
    collab: ["Alex Roidl", "Naoto Hieda"],
    venue: "Choreographic Coding Lab (Germany)",
    links: ["https://ccl-zine.glitches.me/"],
    desc: html``
  },
  {
    start: /* @__PURE__ */ new Date("August 8, 2025"),
    title: "Performance",
    type: ["performance"],
    topic: ["dance"],
    venue: "Angewandte (Austria)",
    image: "/2025-08-08-angewandte.jpg",
    collab: ["Naoto Hieda", "robrrr"],
    links: ["https://www.youtube.com/live/gw-mcn26o5A"],
    desc: html``
  },
  {
    start: /* @__PURE__ */ new Date("July 21, 2025"),
    title: "card.glitches.me",
    type: ["workshop"],
    topic: ["card", "dance"],
    venue: "LACE Extended / ImPulsTanz (Austria)",
    image: "/lace.jpg",
    collab: ["Naoto Hieda"],
    links: ["https://card.glitches.me"],
    desc: html``
  },
  {
    start: /* @__PURE__ */ new Date("July 1, 2025"),
    title: "Rubber Band Memories",
    type: ["net art"],
    topic: ["body politics"],
    venue: "CHI 2025 (Japan)",
    image: "/rubberband.png",
    collab: ["Anna Brynskov", "Joana Chicau", "Sophie Grimme", "Naoto Hieda"],
    links: ["https://rubberband.glitches.me/"],
    desc: html`<div>Content created during <a href="https://bodypoliticschi.wordpress.com/" target="_blank">Body Politics Workshop at CHI 2025</a>, website by Naoto</div>`
  },
  {
    start: /* @__PURE__ */ new Date("March 24, 2025"),
    title: "Choreographic Coding Labs",
    type: ["meetup"],
    topic: ["dance"],
    venue: "A+E Lab (UK)",
    image: "/DSCF3670.jpg",
    collab: ["Naoto Hieda"],
    // links: ["https://stage.glitches.me/"],
    desc: html`<div>
<p>
Photo: Stathis Doganis
</p>
</div>`
  },
  {
    start: /* @__PURE__ */ new Date("March 20, 2025"),
    title: html`<a href="https://archive.glitches.me" target="_blank">archive.glitches.me</a>`,
    type: ["lecture"],
    topic: ["dance"],
    venue: "LAB111 / LI-MA (Netherlands)",
    image: "/vlcsnap-2025-03-30-12h44m09s867.png",
    collab: ["Naoto Hieda"],
    links: ["https://archive.glitches.me/", "https://li-ma.nl/article/transformation-digital-art-2025/"],
    desc: html`<div>
<p>

</p>
</div>`
  },
  {
    start: /* @__PURE__ */ new Date("March 8, 2025"),
    title: html`<a href="https://stage.glitches.me" target="_blank">stage.glitches.me</a>`,
    type: ["performance"],
    topic: ["dance"],
    venue: "Kanuti Gildi Saal (Estonia)",
    image: "/Marlene_Leppanen_08_03_25-330-land.jpg",
    collab: ["Naoto Hieda"],
    links: ["https://stage.glitches.me/"],
    desc: html`<div>
Photo: Marlene Leppänen
<p>

</p>
</div>`
  },
  {
    start: /* @__PURE__ */ new Date("December 20, 2024"),
    title: "Performing Code{s}",
    type: ["lecture"],
    topic: ["hydra", "algorithm"],
    venue: "Lucerne University of Applied Sciences and Arts (Switzerland)",
    image: "/vlcsnap-2024-12-21-15h13m07s208.png",
    collab: ["Joana Chicau", "Naoto Hieda"],
    links: [],
    desc: html`<div>
"In this course we will collectively analyse the theory behind artistic projects and approaches. We will engage in a series of practical explorations using algorithmic processes and programming languages (JavaScript) for performing a sequence of actions. At the end, students will present their works in a WIP show." <br />
Screenshot by Stella, Luna and Cosi
</div>`
  },
  {
    start: /* @__PURE__ */ new Date("November 26, 2024"),
    title: "Stage for Digital, Contagious, and Networked Bodies and Code++ (SFDCANBAC++)",
    type: ["performance"],
    topic: ["hydra", "dance"],
    venue: "MODINA / CoFestival / Kino Šiška (Slovenia)",
    image: "/guevara-hieda-sfdcanbac++_49.JPG",
    collab: ["Jorge Guevara", "Naoto Hieda"],
    links: ["https://sfdcanbac-ux.glitch.me/", "https://www.youtube.com/watch?v=c9YbRjCuqOs"],
    desc: html`<div>

<p>
Bodies, colorful objects, live-codes and glitter pixels continuously change their constellations on the stage – superimposing and subtracting, grouping and ungrouping – while the abundance of “actors” never arrives to a specific form.
</p>
<p>
The performance is a “petri dish” where something happens as if in the lab environment, but there is no linearity nor anecdote. It is the audience members – being active spectators – who have to make sense of the phenomena on the stage as if they are scientists.
</p>
<p>
Artists: Jorge Guevara and Naoto Hieda<br />
Sound: robrrr<br />
Artistic/Dramaturgical advice: Dani Bershan<br />
Technical Mentorship and development: Andreia Matos, William Primett and Nuno N. Correia<br />
</p>
<p>
The work is created within the framework of the MODINA project.
</p>
<p>
Photo: Urška Boljkovac/Kino Šiška
</p>
</div>`
  },
  {
    start: /* @__PURE__ */ new Date("November 8, 2024"),
    title: "Stage for Digital, Contagious, and Networked Bodies and Code++ (SFDCANBAC++)",
    type: ["performance"],
    topic: ["hydra", "dance"],
    venue: "MODINA / CNDB (Romania)",
    image: "/dc2d098958189c2d.png",
    collab: ["Jorge Guevara", "Naoto Hieda"],
    links: ["https://sfdcanbac-ux.glitch.me/"],
    desc: html`<div>

<p>
Bodies, colorful objects, live-codes and glitter pixels continuously change their constellations on the stage – superimposing and subtracting, grouping and ungrouping – while the abundance of “actors” never arrives to a specific form.
</p>
<p>
The performance is a “petri dish” where something happens as if in the lab environment, but there is no linearity nor anecdote. It is the audience members – being active spectators – who have to make sense of the phenomena on the stage as if they are scientists.
</p>
<p>
Artists: Jorge Guevara and Naoto Hieda<br />
Sound: robrrr<br />
Artistic/Dramaturgical advice: Dani Bershan<br />
Technical Mentorship and development: Andreia Matos, William Primett and Nuno N. Correia<br />
</p>
<p>
The work is created within the framework of the MODINA project.
</p>
</div>`
  },
  {
    start: /* @__PURE__ */ new Date("October 21, 2024"),
    title: "Kunstpreis 2024 der Freunde der KHM 2nd prize",
    type: ["installation"],
    topic: ["photography", "cards"],
    collab: ["Naoto Hieda"],
    venue: "Glasmoog / KHM (Germany)",
    image: "/KHM_20241022_WS24_25_Preisverleihungen_DSC_5772_c_Doerthe_Boxberg.jpg",
    links: [],
    desc: html`<div><i>Who is Naoto Hieda? Seems to me, is the essential, existential question that Naoto ask themself in every new artistic endeavor they engage into.</i> - Camilo Sandoval<br /><br />
    Alumni award and exhibition<br /> 
    Works: Naoto's Sweaters (with Frog Edogawa), Naoto's Cards (Japan-Taiwan Edition), New Banner (2023), Various prints and origami<br />
    Photo: Doerthe Boxberg</div>
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 5, 2024"),
    title: "Hands-On introduction to live coding with Hydra: Code, Remix, Break, Glitch & Dance",
    type: ["workshop"],
    topic: ["hydra"],
    collab: [],
    venue: "Aavistus Festival (Finland)",
    image: "/Aavistus_2024_HKM_Workshop_NaotoHieda_SusseSeppälä-4.jpg",
    links: ["https://www.aavistusfestival.fi/artists/workshops/naoto-hieda"],
    desc: html`Photo: Susse Seppälä
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 1, 2024"),
    title: "Stage for Digital, Contagious, and Networked Bodies and Code++ (SFDCANBAC++)",
    type: ["performance"],
    topic: ["hydra", "dance"],
    venue: "MODINA / STL (Estonia)",
    image: "/sfdcanbac-tallinn.png",
    collab: ["Jorge Guevara", "Naoto Hieda"],
    links: ["https://sfdcanbac-ux.glitch.me/"],
    desc: html`<div>

<p>
Bodies, colorful objects, live-codes and glitter pixels continuously change their constellations on the stage – superimposing and subtracting, grouping and ungrouping – while the abundance of “actors” never arrives to a specific form.
</p>
<p>
The performance is a “petri dish” where something happens as if in the lab environment, but there is no linearity nor anecdote. It is the audience members – being active spectators – who have to make sense of the phenomena on the stage as if they are scientists.
</p>
<p>
Artists: Jorge Guevara and Naoto Hieda<br />
Sound: robrrr<br />
Artistic/Dramaturgical advice: Dani Bershan<br />
Technical Mentorship and development: Andreia Matos, William Primett and Nuno N. Correia
</p>
<p>
The work is created within the framework of the MODINA project.
</p>
</div>`
  },
  {
    start: /* @__PURE__ */ new Date("September 16, 2024"),
    title: "#bestpracticesincontemporarydance Banners",
    type: ["installation"],
    topic: ["hydra"],
    collab: ["Naoto Hieda", "Jorge Guevara"],
    venue: "Sõltumatu Tantsu Festival (Estonia)",
    image: "/telliskivi-banner.jpg",
    links: [],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("August 30, 2024"),
    title: "Stage for Digital, Contagious, and Networked Bodies and Code++ (SFDCANBAC++)",
    type: ["performance"],
    topic: ["hydra", "dance"],
    venue: "MODINA / Kino Šiška (Slovenia)",
    image: "/J.GUEVARA-N.%20HIEDA-MODINA_urska%20boljkovac%20(72).jpeg",
    collab: ["Jorge Guevara", "Naoto Hieda"],
    links: ["https://sfdcanbac-ux.glitch.me/"],
    desc: html`<div>

<p>
Bodies, colorful objects, live-codes and glitter pixels continuously change their constellations on the stage – superimposing and subtracting, grouping and ungrouping – while the abundance of “actors” never arrives to a specific form.
</p>
<p>
The performance is a “petri dish” where something happens as if in the lab environment, but there is no linearity nor anecdote. It is the audience members – being active spectators – who have to make sense of the phenomena on the stage as if they are scientists.
</p>
<p>
Artists: Jorge Guevara and Naoto Hieda<br />
Sound: robrrr<br />
Artistic/Dramaturgical advice: Dani Bershan<br />
Technical Mentorship and development: Andreia Matos, William Primett and Nuno N. Correia<br />
Tech support: Kino Šiška<br />
Photo: Urška Boljkovac/Kino Šiška
</p>
<p>
The work is created within the framework of the MODINA project.
</p>
</div>`
  },
  {
    start: /* @__PURE__ */ new Date("July 21, 2024"),
    title: "Make a blog!",
    type: ["workshop"],
    topic: ["blog"],
    collab: [],
    venue: "CC Fest (online)",
    image: "/IMG_0460.jpg",
    links: ["https://ccfest-2024-blog.glitch.me/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("May 6, 2024"),
    title: "IIOANA - Aqua Park (underground demo music video)",
    type: ["video"],
    topic: ["hydra"],
    collab: ["IIOANA"],
    venue: "Festival de la Imagen (Colombia)",
    image: "/aquapark.jpg",
    links: ["https://www.youtube.com/watch?v=QX6ddYl-F8g", "https://festivaldelaimagen.com/en/portfolio-item/aqua-park/"],
    desc: html`
    Video: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("February 14, 2024"),
    title: "Stage for Digital, Contagious, and Networked Bodies and Code++ (SFDCANBAC++)",
    type: ["performance"],
    topic: ["hydra", "dance"],
    venue: "MODINA / Kino Šiška (Slovenia)",
    image: "/J.GUEVARA-N.%20HIEDA-MODINA_urska%20boljkovac%20(72).jpeg",
    collab: ["Jorge Guevara", "Naoto Hieda"],
    links: ["https://sfdcanbac-ux.glitch.me/"],
    desc: html`<div>

<p>
Bodies, colorful objects, live-codes and glitter pixels continuously change their constellations on the stage – superimposing and subtracting, grouping and ungrouping – while the abundance of “actors” never arrives to a specific form.
</p>
<p>
The performance is a “petri dish” where something happens as if in the lab environment, but there is no linearity nor anecdote. It is the audience members – being active spectators – who have to make sense of the phenomena on the stage as if they are scientists.
</p>
<p>
Artists: Jorge Guevara and Naoto Hieda<br />
Technical Mentorship and development: Andreia Matos, William Primett and Nuno N. Correia<br />
Tech support: Kino Šiška<br />
Photo: Urška Boljkovac/Kino Šiška
</p>
<p>
The work is created within the framework of the MODINA project.
</p>
</div>`
  },
  {
    start: /* @__PURE__ */ new Date("January 5, 2024"),
    title: "Naoto's Sweaters",
    type: ["net art"],
    topic: ["photography", "fashion"],
    venue: "online",
    image: "/DSC00940.jpg",
    collab: ["Frog Edogawa", "Naoto Hieda"],
    links: ["https://sweaters.glitch.me/"],
    desc: html`<div>
      <p><i>
If I were to wear only a piece of clothes, it would be a sweater.
      </i></p>
      <p>
      Photos by Frog Edogawa
      </p>
    </div>`
  },
  {
    start: /* @__PURE__ */ new Date("January 15, 2024"),
    title: "IIOANA - Aqua Park (underground demo music video)",
    type: ["video"],
    topic: [],
    collab: ["IIOANA"],
    venue: "online",
    image: "/aquapark.jpg",
    links: ["https://www.youtube.com/watch?v=QX6ddYl-F8g"],
    desc: html`
    Video: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("December 18, 2023"),
    title: "Palallel",
    type: ["publication"],
    topic: ["html"],
    venue: "Taper #11",
    image: "/palallel.png",
    collab: ["Naoto Hieda"],
    links: ["https://taper.badquar.to/11/palallel.html"],
    desc: html`<div>
      “Palallel” is generative, visual poetry around geometry, concurrence
      and the word parallel itself. A pair of two “parallel” text lines
      rewrites the dictionary definition of "parallel" by themselves,
      in “parallel” to the other pair. While the visual aspect is prominent,
      the poetry suggests different languages and cultures (English and
      Japanese in this case) exist in parallel and challenges how browsers
      render different languages. The title came from a common mistake by
      Japanese people mixing up r and l consonants. <br />
      Published by Bad Quarto
    </div>`
  },
  {
    start: /* @__PURE__ */ new Date("December 14, 2023"),
    title: "I MISS MY PRE INTERNET-BRAIN",
    type: ["performance"],
    topic: [],
    collab: ["Anastasiia Pishchanska"],
    venue: "Tama Art University (Japan)",
    image: "/411929223_1266106421443644_6534368842755878499_n.jpg",
    links: ["https://bootywithoutorgans.glitch.me/"],
    desc: html`
    <div>
Written and directed by Anastasiia Pishchanska<br />
Technical direction and development: Naoto Hieda<br />
Dance and performance: 雷はつ菜, 鈴木亜子, なおと, まお<br />
Instagram: @bootywithoutorgans
    </div>
`
  },
  {
    start: /* @__PURE__ */ new Date("December 7, 2023"),
    title: "Open House",
    type: ["performance"],
    topic: [],
    collab: ["Jorge Guevara"],
    venue: "Academy for Theater and Digitality (Germany)",
    image: "/jorge-openhouse.jpg",
    links: [],
    desc: html`
    Mentor: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 22, 2023"),
    title: "Naoto's Presentation",
    type: ["lecture"],
    topic: [],
    collab: ["Naoto Hieda"],
    venue: "Tokyo University of the Arts (Japan)",
    image: "/amc2.png",
    links: [],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 4, 2023"),
    title: "cctv.glitches.me",
    type: ["installation"],
    topic: [],
    collab: ["Naoto Hieda"],
    venue: "FIfFKon (Germany)",
    image: "/fiff.jpg",
    links: [],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 4, 2023"),
    title: "Aesthetic approaches to cyber peace work",
    type: ["lecture"],
    topic: [],
    collab: ["Ground Zero"],
    venue: "FIfFKon (Germany)",
    image: "/fiff-talk.jpg",
    links: [],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 29, 2023"),
    title: "Unarchiving Dance",
    type: ["workshop"],
    topic: [],
    collab: ["Naoto Hieda", "Tobias Hartmann"],
    venue: "Annual symposium of the Society for Dance Research (Germany)",
    image: "/gtf.jpg",
    links: ["https://www.gtf-tanzforschung.de/en/convention/symposium-2023/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 27, 2023"),
    title: "Exhibition: Code, Remix, Break & Glitch",
    type: ["installation"],
    topic: [],
    collab: ["Naoto Hieda"],
    venue: "Digitale Welten / TOR Art Space (Germany)",
    image: "https://img.glitches.me/images/2023/10/28/A9D20F93-BC08-42FC-8095-78A45D64BBDA.md.jpg",
    links: ["https://www.digitale-welten.org/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 23, 2023"),
    title: "Workshop: Code, Remix, Break & Glitch",
    type: ["workshop"],
    topic: [],
    collab: ["Naoto Hieda", "Franka Osthoff"],
    venue: "Digitale Welten (Germany)",
    image: "/53378405309_445f9d96f6_o.jpg",
    links: ["https://www.digitale-welten.org/"],
    desc: html`
    Photo: Lenz aka. Eray Aydin
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 11, 2023"),
    title: "Heartbreak Cards",
    type: ["installation", "publication"],
    topic: [],
    collab: ["Naoto Hieda"],
    venue: "Working Group for Unusual Input and Output Media / LUX Pavillon (Germany)",
    image: "https://img.glitches.me/images/2023/10/31/IMG_3702-1280.jpg",
    links: ["https://nodeforum.org/announcements/re-coding-everyday-technology/", "https://re-coding.technology/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("September 6, 2023"),
    title: "Bühne der Stille 2.0",
    type: ["installation"],
    topic: [],
    collab: ["Freiversum"],
    venue: "Teo Otto Theater der Remscheid (Germany)",
    image: "https://img.glitches.me/images/2023/09/11/339C8DCF-67BC-4A08-8972-2860764505FA.jpg",
    links: ["https://freiversum.com"],
    desc: html`
    Naoto Hieda: web interaction programming
    `
  },
  {
    start: /* @__PURE__ */ new Date("August 24, 2023"),
    title: "Show You My Screen",
    type: ["performance", "net art"],
    topic: [],
    collab: ["Takeshi Mukai", "Naoto Hieda"],
    venue: "showusyourscreens (Germany)",
    image: "/show-you.png",
    links: [],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("August 12, 2023"),
    title: "Biosensing and Sound",
    type: ["performance", "workshop", "residency"],
    topic: ["eeg"],
    collab: ["Naoto Hieda"],
    venue: "Klanginseln Großharthau (Germany)",
    image: "https://img.glitches.me/images/2023/08/14/photo1691939602.jpg",
    links: [],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("August 2, 2023"),
    title: "Dynamic Memory Lab",
    type: ["installation"],
    topic: ["web"],
    collab: ["Coalition for Pluralistic Public Discourse"],
    venue: "Grünen Salon der Volksbühne (Germany)",
    image: "https://img.glitches.me/images/2023/08/14/652F71DF-882C-4C23-94B8-4B24ADE76BA0_1_105_c.md.jpg",
    links: ["https://www.dialogueperspectives.org/blog/dynamic-memory-lab/"],
    desc: html`
    Naoto Hieda: Software development
    `
  },
  {
    start: /* @__PURE__ */ new Date("July 19, 2023"),
    title: "New Banner",
    type: ["installation"],
    topic: ["hydra"],
    collab: ["Naoto Hieda"],
    venue: "KHM Rundgang (Germany)",
    image: "https://img.glitches.me/images/2023/07/26/naoto-new-banner.jpg",
    links: [],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("July 19, 2023"),
    title: "Naoto's Nail Salon",
    type: ["performance"],
    topic: ["nail polish"],
    collab: ["Naoto Hieda"],
    venue: "KHM Rundgang (Germany)",
    image: "https://img.glitches.me/images/2023/07/26/20230722_KHM_RundgangDSC_0739_c_Doerthe_Boxberg_sq.jpg",
    links: ["https://nail.glitches.me/"],
    desc: html`Photo: Doerthe Boxberg
    `
  },
  {
    start: /* @__PURE__ */ new Date("July 19, 2023"),
    title: "[[open-lab]]",
    type: ["installation"],
    topic: ["material"],
    collab: ["exMedia Lab"],
    venue: "KHM Rundgang (Germany)",
    image: "https://img.glitches.me/images/2023/07/26/cards_sq.jpg",
    links: ["https://open-lab.glitch.me/"],
    desc: html`
    group show with open lab seminar
    `
  },
  {
    start: /* @__PURE__ */ new Date("June 14, 2023"),
    title: "Show You My Screen",
    type: ["net art"],
    topic: ["web"],
    collab: ["Naoto Hieda"],
    venue: "showusyourscreens (Germany)",
    image: "/2023-06-14-syms.jpg",
    links: ["https://www.youtube.com/watch?v=rQzWtLS43mc"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("June 9, 2023"),
    title: "Naoto's Nails",
    type: ["net art"],
    topic: ["face filter"],
    collab: ["Naoto Hieda"],
    venue: "online",
    image: "/IMG_0138.JPG",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("June 6, 2023"),
    title: "Naoto's Nail Salon",
    type: ["performance"],
    topic: ["nails"],
    collab: ["Naoto Hieda"],
    venue: "KHM (Germany)",
    image: "/2023-06-06-nail-salon-flyer.gif",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("May 24, 2023"),
    title: "UrbanRecall-Archive",
    type: ["net art"],
    topic: ["archive"],
    collab: ["UrbanRecall"],
    venue: "KoProduktionsLabor (Germany)",
    image: "https://img.glitches.me/images/2023/07/31/Screenshot-2023-07-31-at-09-58-02-urbanrecall_web_archive.png",
    links: ["https://github.com/Koproduktionslabor/UrbanRecall-Archive"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("May 8, 2023"),
    title: "Digital Corporealities",
    type: ["lecture"],
    topic: ["dance", "digitality"],
    collab: ["Naoto Hieda"],
    venue: "PACT Zollverein (Germany)",
    image: "https://img.glitches.me/images/2023/05/19/2023-05-08-pact.jpg",
    links: [
      "https://nosy-phrygian-twister.glitch.me/",
      "https://abiding-simple-inspiration.glitch.me/"
    ],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("May 7, 2023"),
    title: "Neuroqueerness and Decolonization in Media Art",
    type: ["publication"],
    topic: [],
    collab: ["Naoto Hieda"],
    venue: "Kunsthochschule für Medien Köln",
    image: "/thesis.jpg",
    links: ["https://neuroqueer.glitch.me/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("April 22, 2023"),
    title: "Hands-On: Introduction to Live-Coding with Hydra",
    type: ["workshop"],
    topic: [""],
    collab: ["Naoto Hieda"],
    venue: "Hauptsache Frei (Germany)",
    image: "/photo1682454956.jpeg",
    links: ["https://hydra-hauptsachefrei-2023-workshop.glitch.me/"],
    desc: html`Photo: Bente Stachowske
    `
  },
  {
    start: /* @__PURE__ */ new Date("April 19, 2023"),
    title: "Speculation Unit",
    type: ["workshop"],
    topic: [""],
    collab: ["elisELIS", "Shahrzad Nazarpour", "Tam Thi Pham", "Sarah Fartuun Heinze", "Sarah Wenzinger", "Jeremy Bailey", "Naoto Hieda", "Jeanne Charlotte Vogt"],
    venue: "Hauptsache Frei (Germany)",
    image: "/20230422_190312.jpg",
    links: ["https://aromatic-luminous-chicken.glitch.me/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("March 4, 2023"),
    title: html`<a href="https://solo.glitches.me" target="_blank">solo.glitches.me</a>`,
    type: ["performance"],
    topic: ["net art"],
    collab: ["Naoto Hieda"],
    venue: "#TakeMoreCare (Germany)",
    image: "https://bild.glitches.me/images/2023/03/09/wannacomecloser_naoto.md.jpg",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("March 1, 2023"),
    title: html`<a href="https://soup.glitches.me" target="_blank">soup.glitches.me</a>`,
    type: ["installation"],
    topic: ["net art"],
    collab: ["Naoto Hieda"],
    venue: "Freiraum (Germany)",
    image: "https://bild.glitches.me/images/2023/03/03/4CCFE8FB-180D-462A-A43F-0050132863A2.md.jpg",
    links: ["https://www.benjriepe.com/in-progress/freiraum-digital/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("February 17, 2023"),
    title: "festival.naotohieda.com",
    type: ["performance", "installation"],
    topic: ["body", "dance"],
    collab: ["Naoto Hieda"],
    venue: "Teatro de Garaje (Colombia)",
    image: "https://bild.glitches.me/images/2023/02/17/AD5CFFAC-99B4-4E8E-B06F-565B85A2EEDF.md.jpg",
    links: ["https://festival.naotohieda.com/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 29, 2022"),
    title: html`<a href="https://solo.glitches.me" target="_blank">solo.glitches.me</a>`,
    type: ["performance"],
    topic: ["body", "dance"],
    collab: ["Naoto Hieda"],
    venue: "National University of Colombia (Colombia)",
    image: "https://bild.glitches.me/images/2022/11/27/mitav-naoto-poster.png",
    links: ["https://solo.glitches.me/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 8, 2022"),
    title: html`<a href="https://solo.glitches.me" target="_blank">solo.glitches.me</a>`,
    type: ["performance"],
    topic: ["body", "dance"],
    collab: ["Naoto Hieda"],
    venue: "National University of Colombia (Colombia)",
    image: "/Screenshot%202022-11-10%20at%2011-50-59%202022%2011%2008%20Solo.png",
    yt: "B7vzLTwjzTM",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 4, 2022"),
    title: "Lulogear",
    type: ["installation"],
    topic: ["processing", "lithography"],
    collab: ["Naoto Hieda"],
    venue: "National University of Colombia (Colombia)",
    image: "https://bild.glitches.me/images/2022/11/05/IMG_4392.jpg",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 17, 2022"),
    title: "Glitch me on glitch me",
    type: ["installation", "net art"],
    topic: ["hydra", "livelab"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "Festival de la Imagen (Colombia)",
    image: "/IMG_3869.JPG",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 11, 2022"),
    title: html`<a href="https://solo.glitches.me" target="_blank">solo.glitches.me</a>`,
    type: ["performance"],
    topic: ["body", "language"],
    collab: ["Naoto Hieda"],
    venue: "National University of Colombia (Colombia)",
    image: "/solo.jpg",
    yt: "Zov0zYYLDwQ",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("September 23, 2022"),
    title: "Granadilla-Croissant",
    type: ["installation"],
    topic: ["hydra", "lithography"],
    collab: ["Naoto Hieda"],
    venue: "National University of Colombia (Colombia)",
    image: "/2022-09-23-IMG_3145.jpg",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("August 8, 2022"),
    title: "Exchange at Maestría interdisciplinar en Teatro y Artes vivas",
    type: ["residency"],
    topic: ["body", "language"],
    collab: ["Naoto Hieda"],
    venue: "National University of Colombia (Colombia)",
    image: "https://img.glitches.me/images/2022/09/12/IMG_2335.jpg",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("July 12, 2022"),
    title: "Best Practices Workshop",
    type: ["workshop"],
    topic: ["hydra", "livelab"],
    collab: ["Jorge Guevara", "Naoto Hieda"],
    venue: "PerformingArtsForum (France)",
    image: "/Screenshot 2022-11-10 at 11-47-42 2022 07 12 Best Practices Workshop (Participants at PAF @Jorge Guevara & Naoto Hieda).png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("June 26, 2022"),
    title: "Best Practices Workshop",
    type: ["workshop"],
    topic: ["hydra", "livelab"],
    collab: ["Jorge Guevara", "Naoto Hieda"],
    venue: "Hauptsache Frei (Germany)",
    image: "/3419B84D-C89F-460E-B646-26F6E3FF4621.jpeg",
    desc: html`
    Workshop and presentation in the frame of Beyond Digital Lab<br />
    Photo by Jeanne Charlotte Vogt
    `
  },
  {
    start: /* @__PURE__ */ new Date("June 24, 2022"),
    title: "OpenLab",
    type: ["performance"],
    topic: ["hydra", "livelab"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "Academy for Theater and Digitality (Germany)",
    image: "/openlab.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("June 21, 2022"),
    title: "Science Kitchen: Decompositions of algorithms and glitched worlds",
    type: ["lecture"],
    topic: ["hydra"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "KHM exMedia Lab (Germany)",
    image: "/scikitchen.jpg",
    links: ["https://exmedia.khm.de/science-kitchen-decompositions-of-algorithms-and-glitched-worlds/"],
    desc: html`
    Invited and organized by Karin Lingnau and Jaqueline Hen
    `
  },
  {
    start: /* @__PURE__ */ new Date("June 17, 2022"),
    title: "Live Coding Performance",
    type: ["performance"],
    topic: ["tidalcycles", "hydra"],
    collab: ["Flor de Fuego", "Alexandra Cárdenas"],
    venue: "Werk (Germany)",
    image: "/werkperformance.jpg",
    desc: html`
    Camera footage by Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("June 11, 2022"),
    title: "Hydra in the Dome",
    type: ["workshop"],
    topic: ["hydra"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "Dortmunder U (Germany)",
    image: "/domeworkshop.jpg",
    desc: html`
    Supported by Academy for Theater and Digitality and StoryLab kiU
    `
  },
  {
    start: /* @__PURE__ */ new Date("June 4, 2022"),
    title: "GlitchMe3D at Time Window",
    type: ["performance"],
    topic: ["web", "hydra"],
    collab: ["Flor de Fuego", "Terror Kittens", "Naoto Hieda"],
    venue: "Time Window (The Netherlands)",
    image: "/timewindow.jpg",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("May 31, 2022"),
    title: "MidTermReview",
    type: ["performance"],
    topic: ["movement"],
    collab: ["Flor de Fuego", "Jorge Guevara", "Naoto Hieda"],
    venue: "KHM (Germany)",
    image: "/midtermreview.png",
    desc: html`
    Sharing in the frame of MidTermReview organized by Christian Sievers
    `
  },
  {
    start: /* @__PURE__ */ new Date("May 12, 2022"),
    title: "Live Coding Sessions",
    type: ["performance"],
    topic: ["web", "hydra"],
    collab: ["Jobi", "Naoto Hieda"],
    venue: "Doka (The Netherlands)",
    image: "/dokaperformance.jpg",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("April 28, 2022"),
    title: "Leewa",
    type: ["performance"],
    topic: ["web", "hydra"],
    collab: ["Ekheo"],
    venue: "La Gaîté Lyrique (France)",
    image: "/gaitelyrique.jpg",
    desc: html`
      Video: Flor de Fuego & Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("March 22, 2022"),
    title: "Algorave Jam",
    type: ["performance"],
    topic: ["web", "hydra"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "online",
    image: "/algorave.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("March 11, 2022"),
    title: "Guest Lecture at Creative Coding Computing",
    type: ["lecture"],
    topic: ["community"],
    collab: ["Naoto Hieda"],
    venue: "University of the Arts London (online)",
    image: "/ual.png",
    desc: html`
      Invited by Joana Chicau
    `
  },
  {
    start: /* @__PURE__ */ new Date("March 10, 2022"),
    title: html`<a href="https://riso.glitches.me" target="_blank">riso.glitches.me</a>`,
    type: ["installation"],
    topic: ["risograph"],
    collab: ["Naoto Hieda"],
    venue: "Art Fair Tokyo 2022 (Japan)",
    image: "https://img.glitches.me/images/2022/03/15/riso_.jpg",
    desc: html`
<a href="https://riso.glitches.me/" target="_blank">riso.glitches.me</a> is an artwork consisting of risograph prints of the artist’s brain and a custom-made computer program.<br />

Image processing is applied to an MRI scan pattern of the brain, and the output is printed as 2-color risograph. The image processing is sophisticatedly designed so that the printing offset of risograph generates different shading for each print from the same set of master patterns. 
`
  },
  {
    start: /* @__PURE__ */ new Date("March 8, 2022"),
    title: "Livecodera",
    type: ["performance"],
    topic: ["web", "hydra"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "online",
    image: "/livecodera.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("February 17, 2022"),
    title: "ICADE",
    type: ["installation"],
    topic: ["web"],
    collab: ["KHM"],
    venue: "KHM (Germany)",
    image: "/icade.jpg",
    desc: html`
Atelier Netze präsentiert die Online- und Offline-Ausstellung „[  ]ICADE“ mit Arbeiten von Mary Mikaelyan, Ji Su Kang-Gatto, Jacob Höfle, Anne Arndt, Julia Maja Funke, Hyeseon Jeong, Yannick Westphal, Naoto Hieda. „[   ]ICADE“ entstand als Reaktion auf unbegründete Zensurmaßnahmen im Rahmen der universitätsübergreifenden ICADE-Ausstellung der Academy of Arts & Design der Tsinghua University, an der die Netze-Gruppe teilgenommen hatte. Online zu finden unter https://icade-test.glitch.me    `
  },
  {
    start: /* @__PURE__ */ new Date("February 17, 2022"),
    title: "feature request: add Japanese",
    type: ["book"],
    topic: ["javascript"],
    collab: ["Naoto Hieda"],
    venue: "KHM (Germany)",
    image: "/japaneseBook.jpg",
    links: ["https://www.khm.de/termine/news.5831.start-ins-wintersemester-2024-25-begruessung-der-erstsemester-mit-preisverleihungen-und-ausstellungseroeffnung/"],
    desc: html`Photo: Doerthe Boxberg
    `
  },
  {
    start: /* @__PURE__ */ new Date("February 11, 2022"),
    title: "#NaotoHieda",
    type: ["installation"],
    topic: ["banner", "web", "dance", "hydra"],
    collab: ["Naoto Hieda"],
    venue: "Pola Museum Annex (Japan)",
    image: "https://img.glitches.me/images/2022/02/13/banner.jpg",
    links: ["https://www.po-holdings.co.jp/m-annex/exhibition/index.html"],
    desc: html`
    #NaotoHieda is an artwork around a computer program and a body. Emerged from online collaborations since 2020 with choreographers and artists such as Jorge Guevara, Flor de Fuego, and Nien Tzu Weng, Hieda uses code as a queer expression instead of a productive tool as widely believed. A video is generated by pixel manipulation through live-painting, or live-coding to be precise, while dancing improvisationally. Its screenshot is printed as a construction banner, an ephemeral medium, to express the dynamics of code and the logic of body.<br />
<br />
Thanks to Christian Sievers, Julia Scher, Romina Dümler and Shunsuke Takawo<br />
Sponsored by Processing Community Japan (PCJ)

    `
  },
  {
    start: /* @__PURE__ */ new Date("February 1, 2022"),
    title: "Fellowship",
    type: ["residency"],
    topic: ["web", "hydra"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "Academy for Theater and Digitality (Germany)",
    image: "/fellowshipflok.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("January 6, 2022"),
    title: "#BestPracticesInContemporaryDance",
    type: ["installation"],
    topic: ["web", "dance", "hydra"],
    collab: ["Jorge Guevara", "Naoto Hieda"],
    venue: "Festival Temps d'Images / tanzhaus nrw (Germany)",
    image: "/Photo%202022-01-06%2018%2045%2049.jpg",
    links: ["https://best-ux.glitch.me/", "https://tanzhaus-nrw.de/en/event/2022/01/installations"],
    desc: html`
    Concept, artistic direction: Jorge Guevara, Naoto Hieda. Dance, choreography, coding: the public.
    `
  },
  {
    start: /* @__PURE__ */ new Date("December 17, 2021"),
    title: "Leewa",
    type: ["performance"],
    topic: ["web", "hydra"],
    collab: ["Ekheo"],
    venue: "Hijack Crack Bellmer (Germany)",
    image: "/cada0ae2-f902-428d-81e3-6a68f5e589e5_vlcsnap-2021-11-18-10h55m20s617.png",
    desc: html`
      Video: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("December 15, 2021"),
    title: "#bestpracticesincontemporarydance",
    type: ["performance", "net art"],
    topic: ["dance", "hydra"],
    collab: ["Jorge Guevara", "Naoto Hieda"],
    image: "https://img.glitches.me/images/2021/09/29/vlcsnap-2021-09-29-08h51m47s569.jpg",
    venue: "ICLC (online)",
    links: ["https://iclc.toplap.org/2021/exhibition.html"],
    desc: html`
    #bestpracticesincontemporarydance is a framework to practice a queer form of conversation between technology and bodies.
    `
  },
  {
    start: /* @__PURE__ */ new Date("December 15, 2021"),
    title: "GlitchMe Installation",
    type: ["net art"],
    topic: ["hydra", "web"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "ICLC (online)",
    links: ["https://iclc.toplap.org/2021/exhibition.html"],
    image: "https://cdn.glitch.com/9b37fb18-5c29-4916-b8ad-624764fa77cb%2F201218-codame.jpg",
    yt: "Fas_pGA2tvk",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 20, 2021"),
    title: "Glitch Vacations",
    type: ["performance", "net art"],
    topic: ["hydra"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    image: "https://img.glitches.me/images/2021/09/20/vlcsnap-2021-09-20-19h11m28s562.jpg",
    yt: "d0KMUUOrUvs",
    venue: "Piksel 21 (Norway)",
    desc: html`
    Glitch Vacations is an audiovisual performance by Flor de Fuego and Naoto Hieda - a journey through open webpages and platforms created by the artists and the community members. The generative video and sound consist of minimal elements - geometric shapes and sinusoidal waves - yet the modulation and collision of each element result in complex forms, namely a glitch. In the livestream, the artists perform as navigating through web pages, which are interlinked with each other; optionally, audience members can open a provided URL to participate in an interactive experience on their browser.
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 19, 2021"),
    title: "Leewa",
    type: ["performance"],
    topic: ["web"],
    collab: ["Ekheo"],
    venue: "Conversations with Computers (Austria)",
    links: ["https://cwc.radical-openness.org/"],
    image: "/cada0ae2-f902-428d-81e3-6a68f5e589e5_vlcsnap-2021-11-18-10h55m20s617.png",
    desc: html`
      Video: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 10, 2021"),
    title: "Naoto's Laptop",
    type: ["installation"],
    topic: ["hydra"],
    collab: ["Naoto Hieda"],
    venue: "Conversations with Computers (Austria)",
    links: ["https://cwc.radical-openness.org/"],
    image: "/f61e9156-1be6-44f2-84b8-d6fa7844ff0e_opening01.jpg",
    desc: html`
      A laptop installation and a banner
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 28, 2021"),
    title: "Empty Mind",
    type: ["performance"],
    topic: ["web"],
    collab: ["MAXLab"],
    venue: "Royal Academy of Fine Arts Antwerp (Belgium)",
    links: ["https://empty-minds.vercel.app/"],
    image: "https://empty-minds.vercel.app/assets/og.png",
    desc: html`
      Platform & UI development: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 3, 2021"),
    title: "Circles",
    type: ["performance"],
    topic: ["web"],
    collab: ["Amir Shpilman"],
    venue: "Die Irritierte Stadt (Germany)",
    links: ["https://www.irritiertestadt.de/"],
    image: "/cada0ae2-f902-428d-81e3-6a68f5e589e5_circles-stuttgarter-hymnuschorknaben-c-armin-burkhardt.jpg",
    desc: html`
      Web app: Naoto Hieda<br>
      Photo credit: Armin Burkhardt
    `
  },
  {
    start: /* @__PURE__ */ new Date("September 28, 2021"),
    title: "Best Practices in Contemporary Dance",
    type: ["performance", "net art"],
    topic: ["dance", "hydra"],
    collab: ["Jorge Guevara", "Naoto Hieda"],
    image: "https://img.glitches.me/images/2021/09/29/vlcsnap-2021-09-29-08h51m47s569.jpg",
    yt: "w5qAER81o_U",
    venue: "PerformingArtsForum (France)",
    desc: html`
    #hybridperformance #003<br>
    #bestpracticesincontemporarydance is a framework to practice a queer form of conversation between technology and bodies.
    `
  },
  {
    start: /* @__PURE__ */ new Date("September 20, 2021"),
    title: "Glitch Vacations",
    type: ["performance", "net art"],
    topic: ["hydra"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    image: "https://img.glitches.me/images/2021/09/20/vlcsnap-2021-09-20-19h11m28s562.jpg",
    yt: "d0KMUUOrUvs",
    venue: "Creative Commons Global Summit (online)",
    desc: html`
    Glitch Vacations is an audiovisual performance by Flor de Fuego and Naoto Hieda - a journey through open webpages and platforms created by the artists and the community members. The generative video and sound consist of minimal elements - geometric shapes and sinusoidal waves - yet the modulation and collision of each element result in complex forms, namely a glitch. In the livestream, the artists perform as navigating through web pages, which are interlinked with each other; optionally, audience members can open a provided URL to participate in an interactive experience on their browser.
    `
  },
  {
    start: /* @__PURE__ */ new Date("September 18, 2021"),
    title: "Best Practices in Contemporary Dance: Chat",
    type: ["discussion", "conference", "net art"],
    topic: ["dance", "hydra"],
    collab: ["Jorge Guevara", "Naoto Hieda"],
    image: "https://img.glitches.me/images/2021/09/20/chat.jpg",
    yt: "JqPZBdOrVlE",
    venue: "NEW NOW (Germany)",
    desc: html`
    #bestpracticesincontemporarydance is a framework to practice a queer form of conversation between technology and bodies.
    `
  },
  {
    start: /* @__PURE__ */ new Date("August 27, 2021"),
    title: "Die Urbane. Eine HipHop Partei",
    type: ["performance"],
    topic: ["dance"],
    collab: ["Raphael Hillebrand"],
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Frh.png",
    yt: "6jxm8a3hoQE",
    venue: "Dusseldorfer Schauspielhaus (Germany)",
    desc: html`Camera: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("August 26, 2021"),
    title: "Spheres",
    type: ["performance"],
    topic: ["dance"],
    collab: ["Charlotte Triebus"],
    // image:
    // "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Frh.png",
    venue: "NRW Forum (Germany)",
    desc: html`Software Development: Naoto Hieda
    `,
    links: ["https://www.spheres.dance/", "https://www.nrw-forum.de/en/exhibitions/welcome-to-paradise"]
  },
  {
    start: /* @__PURE__ */ new Date("July 31, 2021"),
    title: "Best Practices in Contemporary Dance",
    type: ["performance", "net art"],
    topic: ["dance", "hydra"],
    collab: ["Jorge Guevara", "Naoto Hieda"],
    image: "https://img.glitches.me/images/2021/08/01/vlcsnap-2021-08-01-13h30m13s605.jpg",
    yt: "44Oaa1MMZhc",
    venue: "IDOCDE/ImPulsTanz (Austria)",
    desc: html`
    #bestpracticesincontemporarydance is a framework to practice a queer form of conversation between technology and bodies.
    `
  },
  {
    start: /* @__PURE__ */ new Date("July 21, 2021"),
    title: "Change Your Back Lookout Point",
    type: ["installation"],
    topic: ["json"],
    venue: "Gosau (Austria)",
    collab: ["Naoto Hieda"],
    // image: "https://cdn.glitch.com/c872ab9a-264e-4ce2-91db-721811e90193%2Fnbaustelle.jpg",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2FIMG_7631.jpg",
    desc: html`Exhibition design: Rosi Grillmair`
  },
  {
    start: /* @__PURE__ */ new Date("July 21, 2021"),
    title: "Silicon Friend Camp",
    type: ["residency"],
    topic: ["net art"],
    venue: "servus.at (Austria)",
    collab: ["Silicon Friends"],
    // image: "https://cdn.glitch.com/c872ab9a-264e-4ce2-91db-721811e90193%2Fnbaustelle.jpg",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fsebastian-avatars2.jpeg",
    links: ["https://cwc.radical-openness.org/siliconfriendcamp/"],
    desc: html``
  },
  {
    start: /* @__PURE__ */ new Date("July 21, 2021"),
    title: "Best Practices in Under Construction",
    type: ["installation"],
    topic: ["hydra", "dance"],
    venue: "KHM Open",
    collab: ["Naoto Hieda", "Jorge Guevara"],
    // image: "https://cdn.glitch.com/c872ab9a-264e-4ce2-91db-721811e90193%2Fnbaustelle.jpg",
    image: "https://cdn.glitch.com/c872ab9a-264e-4ce2-91db-721811e90193%2Funderconstruction.jpg",
    links: ["http://khmn.khm.de"],
    desc: html`Naoto Hieda and Jorge Guevara have been practicing over a year, and for the first #bestpracticesincontemporarydance exhibition, they installed a triptych of their practice featuring variety of #underconstruction gifs in a construction site.`
  },
  {
    start: /* @__PURE__ */ new Date("July 21, 2021"),
    title: "netze.khm.de",
    type: ["net art"],
    topic: ["discord"],
    venue: "KHM Open",
    collab: ["Naoto Hieda"],
    image: "https://img.glitches.me/images/2021/07/09/imagecd997762728c4992.png",
    links: ["http://netze.khm.de"],
    desc: html`The poems, pictures and films are a collection of artworks electronically posted on Netze Discord, which is open for any artist to participate. Since the curatorial team is taking a vacation and failed to deliver meticulously selected artworks, all the latest artworks on Discord are indiscriminately exhibited in the gallery below and updated in real time by a competent bot.`
  },
  {
    start: /* @__PURE__ */ new Date("June 25, 2021"),
    title: "Lads",
    type: ["installation"],
    topic: ["dance", "openFrameworks", "max"],
    collab: ["Christopher Matthews"],
    venue: "Sadler's Wells Theater",
    image: "/lads-salders.jpg",
    links: ["https://www.sadlerswells.com/whats-on/2021/wild-card-christopher-matthews-formed-view-my-bodys-an-exhibition/"],
    desc: html`
      Sound programming: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("June 21, 2021"),
    title: "Six Small Sketches",
    type: ["publication"],
    topic: ["hydra", "html"],
    venue: "Taper #6",
    collab: ["Naoto Hieda"],
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Findex.png",
    links: ["https://taper.badquar.to/6/six_small_sketches.html"],
    desc: html`“Six Small Sketches” is a collection of 6 small sketches that is
inspired by Olivia Jack's Hydra live coding environment. Each sketch
is a code snippet representing the number in a geometric form, loaded
in a random sequence. The code fills, alters and paints the grid of
pixels, creating different patterns depending upon the order of
sketches.<br>
Published by Bad Quarto`
  },
  {
    start: /* @__PURE__ */ new Date("June 5, 2021"),
    title: "Live Coding Online Workshop",
    type: ["workshop"],
    topic: ["hydra"],
    venue: "CityLeaks Festival (Germany)",
    collab: ["Naoto Hieda", "Cylvester"],
    image: "https://img.glitches.me/images/2021/06/08/B68D82AB-F6B1-416D-9755-6D2288FF2639.jpg",
    links: ["https://allyourbase.art/event/live-coding-workshop-with-naoto-hieda/"],
    desc: html`photo credit @konstantinjohanneshehl`
  },
  {
    start: /* @__PURE__ */ new Date("March 27, 2021"),
    title: "Video Loop of Decolonial Resistance",
    type: ["installation"],
    topic: ["4 min 56 sec video"],
    venue: "K20 (Germany)",
    collab: ["Raphael Hillebrand"],
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fk20.jpg",
    links: ["https://www.instagram.com/p/CBm7isFnACw/"],
    desc: html`Choreography, interpretation and concept: Raphael Hillebrand<br>
    Music: Prolific the Rapper feat. John Trudell, It's not over<br>
    Camera: Naoto Hieda<br>
    Place: Academy of Performing Arts Hong Kong<br>
    Exhibited at <a href="https://www.kunstsammlung.de/en/exhibitions/joseph-beuys-jeder-mensch-ist-ein-kuenstler-en">"Everyone Is an Artist" Cosmopolitical Exercises with Joseph Beuys</a> (image on the left)<br>
    Recorded in 2019`
  },
  {
    start: /* @__PURE__ */ new Date("March 12, 2021"),
    title: `TidalCycles Workshop "Hearing Code"`,
    type: ["workshop"],
    topic: ["tidalcycles"],
    venue: "online",
    collab: ["Naoto Hieda"],
    // image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fpcd2021ogp.png",
    desc: html`Workshop at SUNY invited by Lee Tusman`
  },
  {
    start: /* @__PURE__ */ new Date("February 20, 2021"),
    title: "Processing Community Day Japan 2021",
    type: ["meetup", "curation", "workshop", "lecture"],
    topic: ["processing", "tidalcycles", "hydra"],
    venue: "online",
    collab: ["PCD Tokyo"],
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fpcd2021ogp.png",
    links: ["https://naotohieda.com/blog/processing-community-day-japan-2021-en/"],
    desc: html`Organization, curation, talk and workshop: Naoto Hieda<br>
    Poster and website: Hina Nakamura<br>
    Full credits in the link`
  },
  {
    start: /* @__PURE__ */ new Date("February 15, 2021"),
    title: "#spektrum",
    type: ["installation"],
    topic: ["10 sec video", "nail polish"],
    venue: "Cologne Main Station (Germany)",
    collab: ["Naoto Hieda"],
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2FNaoto-Hieda.jpg",
    links: ["https://www.khm.de/studentische_arbeiten/id.30115.public-space-video-im-hbf-koln/"],
    desc: html`
#spektrum is a convolution of identity questions that we face, including, but not only, the gender spectrum and autism spectrum. The fingers as an analog, imperfect medium with a color spectrum of nail polish count binary numbers mimicking a self-stimulatory behavior (stimming) to provoke and to challenge the stereotype of "binariness" of autism.<br>
Exhibited as part of "ctrl+space" by Christian Sievers`
  },
  {
    start: /* @__PURE__ */ new Date("February 13, 2021"),
    title: "Hydra meetup #4",
    type: ["meetup"],
    topic: ["hydra"],
    collab: ["Flor de Fuego", "Ritchse", "Naoto Hieda", "Olivia Jack"],
    venue: "online",
    image: "https://cdn.glitch.com/ded7bc3b-3878-467c-9524-bce0e27dfc1e%2Fposter4.png",
    links: ["https://hydra-meetup-4.glitch.me/"],
    desc: html`
      Poster: Ritchse
    `
  },
  {
    start: /* @__PURE__ */ new Date("January 24, 2021"),
    title: "Introduction to Hydra",
    type: ["workshop"],
    topic: ["hydra"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "CCFest (online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fvlcsnap-2021-01-24-22h54m34s826.png",
    links: ["https://ccfest-2021-glitchme.glitch.me/", "https://ccfest.rocks/register"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("December 20, 2020"),
    title: "TidalClub Solstice",
    type: ["performance", "net art"],
    topic: ["hydra", "livelab", "tidalcycles"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "TidalClub (online)",
    image: "https://cdn.glitch.com/9b37fb18-5c29-4916-b8ad-624764fa77cb%2F201220-tidal.jpg",
    yt: "gN9DHCetfBE",
    desc: html`
      A performance at TidalClub Solstice Marathon using GlitchMe with Flor de
      Fuego.
    `
  },
  {
    start: /* @__PURE__ */ new Date("December 18, 2020"),
    title: "GlitchMe Performance-Presentation",
    type: ["performance", "lecture", "net art"],
    topic: ["hydra", "livelab"],
    collab: ["Flor de Fuego", "Naoto Hieda"],
    venue: "CODAME (online)",
    image: "https://cdn.glitch.com/9b37fb18-5c29-4916-b8ad-624764fa77cb%2F201218-codame.jpg",
    yt: "Fas_pGA2tvk",
    desc: html`
      A performance-presentation at CODAME with Flor de Fuego.
    `
  },
  {
    start: /* @__PURE__ */ new Date("December 15, 2020"),
    title: "Introduction to TidalCycles",
    type: ["workshop"],
    topic: ["tidalcycles"],
    collab: ["Naoto Hieda"],
    venue: "Kunsthochschule für Medien Köln",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F201215-tidal.jpg",
    desc: html`
    Workshop at "Sound und..." by Tobias Hartmann
    `
  },
  {
    start: /* @__PURE__ */ new Date("December 12, 2020"),
    title: "Hydra meetup #3",
    type: ["meetup"],
    topic: ["hydra"],
    collab: ["Flor de Fuego", "Ritchse", "Naoto Hieda", "Olivia Jack"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F201212-hydra03.jpg",
    links: ["https://hydra-meetup-3.glitch.me/"],
    desc: html`
      Poster: Flor de Fuego
    `
  },
  {
    start: /* @__PURE__ */ new Date("December 6, 2020"),
    title: "Processing Community Hangout Japan 05",
    type: ["meetup"],
    collab: ["Naoto Hieda", "Shunsuke Takawo"],
    topic: ["processing", "japan"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F201206-pchj05.png",
    links: ["https://pchj05.peatix.com/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 21, 2020"),
    title: "Hydra Exhibition",
    type: ["installation", "net art"],
    topic: ["hydra", "vr"],
    collab: ["Naoto Hieda"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-11-21-hydra-exhibition.png",
    desc: html`
    Currently closed due to Twitter API
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 6, 2020"),
    title: "Showing",
    type: ["installation"],
    topic: ["openFrameworks"],
    collab: ["Vivian Lu"],
    venue: "Theater Dortmund",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F201106-theater.jpg",
    desc: html`
      Visual and interaction programming: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 23, 2020"),
    title: "Tech is Nonbinary",
    type: ["performance", "net art"],
    topic: ["hydra", "dance"],
    collab: ["Naoto Hieda"],
    venue: "Creative Commons Global Summit (online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-10-23-tech-is-nonbinary.png",
    yt: "z78i9_cHUeo",
    desc: html`
      Tech is Nonbinary is an audiovisual dance performance. Starting from a blank editor, graphics and sound are coded in real-time by live-coding environments, with expressions of body movements. The artist questions the classical way of rigid frameworks and productive scheme through an ephemeral and experimental nature of live coding. As images are generated by computer programs, the video may include flickering by accident.
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 17, 2020"),
    title: "Auf meinen Schultern",
    type: ["performance"],
    topic: ["feedback"],
    collab: ["Raphael Hillebrand"],
    venue: "Deutscher Tanzpreis / Aalto Theater (Germany)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F201017-tanzpreis.png",
    desc: html`
    Camera operator: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 8, 2020"),
    title: "Distant Movements",
    type: ["performance", "net art"],
    topic: ["dance", "zoom"],
    collab: ["Annie Abrahams", "Daniel Pinheiro", "Muriel Piqué"],
    venue: "NODE20 (Germany / online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-10-08-ccl-online.jpg",
    // "https://cdn.glitch.com/598358d5-7bf3-4992-8998-933254c78f4b%2Fdm.jpg",
    desc: html`
      Distant Movements is a project by Annie Abrahams (FR/NL), Daniel Pinheiro
      (PT) and Muriel Piqué (FR). They develop an experimental, performative
      approach to examine what «dancing together» could mean in an environment
      where bodies are entangled with machines. Questions like: “Under what
      conditions can we dance together online?, “How will a dance practice in an
      artificial environment differ from a «normal» dance practice?”, “Can the
      emergence of dance in bodies that are both distant and together become
      visible and if so how?”, guide the project, which is also a concrete
      example of a remotely activated multilingual collaborative artistic
      research. DM comes to NODE20 as a one-off welcoming everyone.<br />
      15-min performance. The session took place on
      Zoom
      and streamed to
      <a href="https://hub.greenhousenaxos.com/tPxg6Vq/stage"
        >GreenHouse NAXOS</a
      >.<br>
      Curated by Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 7, 2020"),
    title: "Multidimensional Journey",
    type: ["performance", "net art"],
    topic: ["hubs", "miro", "green screen"],
    collab: ["Nien Tzu Weng", "Naoto Hieda"],
    venue: "NODE20 (Germany / online)",
    image: "https://cdn.glitch.com/e9f27e4f-87e5-46c9-8645-e03a6aedc236%2F201007node.png",
    yt: "g5Hd_5rKggA",
    desc: html`
      At NODE20, Nien Tzu Weng and Naoto Hieda share online tools for
      interdisciplinary collaborations from the recent online residencies. We
      open the room for participants to experiment with the tools. No experience
      required.
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 7, 2020"),
    title: "Best Practices - Discussion",
    type: ["discussion"],
    topic: ["dance", "hydra"],
    collab: ["Jorge Guevara", "Naoto Hieda"],
    image: "https://cdn.glitch.com/598358d5-7bf3-4992-8998-933254c78f4b%2Fchat2.jpg",
    yt: "YZfMBoFWFZY",
    venue: "NODE20 (Germany / online)",
    desc: html`
      Jorge Guevara and Naoto Hieda discuss what they call Best Practices in
      Contemporary Dance. The session will be unstructured; they will initiate
      discussion about their experiences but everyone is welcome to join the
      conversation. In this discussion, the duo reflects on the “Best Practice”
      session that happens the day before (6th of October 2020).
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 6, 2020"),
    title: "Best Practices in Contemporary Dance",
    type: ["performance", "net art"],
    topic: ["dance", "hydra"],
    collab: ["Jorge Guevara", "Naoto Hieda"],
    image: "https://cdn.glitch.com/598358d5-7bf3-4992-8998-933254c78f4b%2F2020-09-03-best-practices-session.png",
    yt: "wxXguzTYt_I",
    // yt: "OBtI1qSLyVQ",
    // yt: "V427wRGGCZQ",
    venue: "NODE20 (Germany / online)",
    desc: html`
      Naoto Hieda and Jorge Guevara practice “Best Practices in Contemporary
      Dance” at NODE20. While they practice with their bodies, videos and
      glitches, everyone is invited to watch, to intervene and to participate in
      the session.
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 5, 2020"),
    title: "Best Practices - Discussion",
    type: ["discussion"],
    topic: ["dance", "hydra"],
    collab: ["Jorge Guevara", "Naoto Hieda"],
    venue: "NODE20 (Germany / online)",
    image: "https://cdn.glitch.com/598358d5-7bf3-4992-8998-933254c78f4b%2F201005chat.jpg",
    yt: "0-YILmKxVhY",
    desc: html`
      Jorge Guevara and Naoto Hieda discuss what they call Best Practices in
      Contemporary Dance. The session will be unstructured; they will initiate
      discussion about their experiences but everyone is welcome to join the
      conversation. Based on expertise in contemporary dance and media art, the
      duo talks about what they expect in the “Best Practice” session coming up
      on 6th of October.
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 4, 2020"),
    title: "Hydra meetup #2",
    type: ["meetup"],
    topic: ["hydra"],
    collab: ["Flor de Fuego", "Naoto Hieda", "Olivia Jack"],
    venue: "online",
    image: "https://cdn.glitch.com/598358d5-7bf3-4992-8998-933254c78f4b%2Fhydra.jpg",
    links: ["https://hydra-meetup-2.glitch.me/"],
    yt: "xTL0BjtBq5k",
    // yt: "7ioV6D_OStY",
    desc: html`
      Hydra meetup #2 made an intervention at NODE20!
      <a href="hydra.ojack.xyz">Hydra</a>
      is a live-coding environment inspired by analog video synthesizer. Olivia
      Jack, the creator of Hydra, Flor de Fuego and Naoto Hieda hosted a meetup
      starting in Zoom and then a live-coding jam in GreenHouse NAXOS (around
      20:45 CEST). Everyone with or without experiences in Hydra is welcome!
      <a href="https://hydra-meetup-2.glitch.me/">More info here.</a>
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 4, 2020"),
    title: "TDSW x PCJ Vernissage",
    type: ["meetup", "net art"],
    topic: ["touchdesigner", "processing", "vvvv"],
    image: "https://cdn.glitch.com/598358d5-7bf3-4992-8998-933254c78f4b%2Fvernissage.jpg",
    collab: ["Yasushi Harada", "Yuki Narumi", "Shunsuke Takawo", "Naoto Hieda"],
    venue: "NODE20 (Germany / online)",
    desc: html`
      Tokyo Developers Study Weekend (TDSW) and Processing Community Japan (PCJ)
      invite you to present your artworks at an exhibition, where everyone can
      virtually hang their works in the GreenHouse exhibition space. Be
      respectful to each other and let’s make a collective exhibition! The hosts
      will present in Japanese and English.
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 3, 2020"),
    talque: "https://20.nodeforum.org/program/?lectureId=fIT3yhH7pfPvnpLyMrWl",
    title: "Low Frequency Skies",
    type: ["lunch", "meetup"],
    topic: ["food"],
    collab: ["Raphaël de Courville", "Taru Muhonen"],
    venue: "NODE20 (Germany / online)",
    image: "https://cdn.glitch.com/598358d5-7bf3-4992-8998-933254c78f4b%2F201003-02.jpg",
    desc: html`
      Low Frequency Skies is a lunch session run by Raphaël de Courville during
      quarantine to open a virtual space for his friends to eat and chat
      together. The legendary lunch session comes back during NODE20 at
      GreenHouse NAXOS – bring your friends and have breakfast, lunch or dinner
      together, depending on your time zone!<br>
      Curated by Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 2, 2020"),
    title: "Choreographic Coding Labs Online",
    type: ["curation", "meetup"],
    topic: ["hydra", "dance", "food"],
    collab: ["Naoto Hieda"],
    venue: "NODE20 (Germany / online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fcconline.jpg",
    links: ["https://20.nodeforum.org/program/greenhouse-naxos/choreographic-coding-lab-online/", "https://naotohieda.com/blog/ccl-online-en/"],
    desc: html`
      Choreographic Coding Lab Online (CCLOnline) is an ever-evolving online format that welcomes dancers, choreographers, coders, artists and anyone interested in choreography and code to experiment artistic and scientific concepts within virtual spaces. During NODE20, one-to-two hours open sessions are planned regularly in GreenHouse NAXOS hosted by Naoto Hieda with a guest of the day. 
    `
  },
  {
    start: /* @__PURE__ */ new Date("September 6, 2020"),
    title: "Online Hangs",
    type: ["meetup"],
    topic: [],
    collab: ["Marie Claire LeBlanc Flanagan", "Naoto Hieda"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F200906-hangs.jpg",
    desc: html`
    Poster: Marie Claire LeBlanc Flanagan
    `
  },
  {
    start: /* @__PURE__ */ new Date("August 30, 2020"),
    title: "Processing Community Hangout Japan 03",
    type: ["meetup"],
    topic: ["processing", "japan"],
    collab: ["Naoto Hieda", "Shunsuke Takawo"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-08-30-processing-community-hangout-japan-3-neort.jpg",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("August 19, 2020"),
    title: "TidalClub: New Moon Marathon",
    type: ["performance", "net art"],
    topic: ["tidalcycles", "discord"],
    collab: ["vc-study"],
    venue: "TidalClub (online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-08-19-new-moon.png",
    links: ["https://naotohieda.com/blog/new-moon/"],
    desc: html`
      We participated in Tidal Club’s New Moon Marathon livestreaming, as a collective “vc-study” performing live-coded sound with TidalCycles. The event is a 24-hour non-stop livestreaming with 72 performance of 20 minute each. vc-study is an informal collective of Japanese artists and programmers learning or studying different creative-code related tools from scratch every week. One of the members, @FMS_Cat created tidal-bot that runs on Discord, interprets TidalCycles code mentioned on the chat and outputs sound on the voice chat. It is a neat implementation as many people can join and perform together, a similar goal as estuary but with a different approach.
    `
  },
  {
    start: /* @__PURE__ */ new Date("August 1, 2020 18:00:00 UTC"),
    title: "Hydra meetup #1",
    type: ["meetup"],
    topic: ["hydra"],
    collab: ["Flor de Fuego", "Ritchse", "Naoto Hieda", "Olivia Jack"],
    venue: "online",
    image: "https://cdn.glitch.com/9b37fb18-5c29-4916-b8ad-624764fa77cb%2Fhydra-meetup1.png",
    links: ["https://hydra-meetup-0.glitch.me/"],
    desc: html`
      The first hydra meetup was held online on 1st August (Saturday) 18:00 UTC
      (20:00 CEST / 14:00 EDT).
    `
  },
  {
    start: /* @__PURE__ */ new Date("July 21, 2020"),
    title: "Circles",
    type: ["performance"],
    topic: ["web"],
    collab: ["Amir Shpilman"],
    venue: "Die Irritierte Stadt (Germany)",
    image: "/circles.jpg",
    desc: html`
      <div>
      Web app: Naoto Hieda<br />
      <a target="_blank" href="https://www.stuttgarter-nachrichten.de/inhalt.performance-in-stuttgart-das-stadtgefuege-als-vielstimmige-klangwolke.bfab86d0-88fd-4f9c-b3f5-a21d9e25811a.html">Image source</a>
      </div>
    `
  },
  {
    start: /* @__PURE__ */ new Date("July 6, 2020"),
    title: "Digital Dancing",
    type: ["lecture"],
    topic: ["dance"],
    collab: ["Toronto Love-In"],
    venue: "Toronto Love-In (online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F200706-digitaldancing.jpg",
    links: ["http://tolovein.com/digital-dancing-fcpp/"],
    desc: html`
      Animated by Sasha Kleinplatz and Andrew Tay<br>
Guest panelists: Naoto Hieda, Brendan Jensen, Joana Chicau and Freya Björg Olafson
    `
  },
  {
    start: /* @__PURE__ */ new Date("July 5, 2020"),
    title: "Processing Community Hangout Japan 02",
    type: ["meetup"],
    topic: ["processing", "japan"],
    collab: ["Naoto Hieda", "Shunsuke Takawo"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F200705-pchj02.png",
    links: ["https://pchj02.peatix.com/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("July 1, 2020"),
    title: "Virtual Exhibition 007",
    type: ["installation", "net art"],
    topic: ["vr"],
    collab: ["Naoto Hieda"],
    venue: "nextmuseum.io (online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-07-01-virtual-exhibition-007.png",
    links: ["https://naotohieda.com/blog/virtual-exhibition-007/"],
    desc: html`
      
    `
  },
  {
    start: /* @__PURE__ */ new Date("June 11, 2020 22:00:00 UTC"),
    title: "Sortie de résidence #4 at CCOV",
    type: ["performance", "net art"],
    topic: ["zoom", "jitsi", "miro", "scratch", "hubs"],
    collab: ["Nien Tzu Weng", "Naoto Hieda"],
    venue: "Centre de Création O Vertigo (online)",
    image: "https://cdn.glitch.com/e9f27e4f-87e5-46c9-8645-e03a6aedc236%2F200611ccov.jpg",
    links: ["https://www.facebook.com/events/903037330168173/"],
    desc: html`
      Nien Tzu Weng and Naoto Hiéda, working in Montreal and Germany
      respectively, were the last artists to take part in a CCOV Residency at a
      distance. On Thursday, June 11, at 4PM (EDT), you are invited to join them
      in a Zoom room as they discuss the outcomes of their work, the
      difficulties met on the way, their strategies for creating remotely, and
      much more!
    `
  },
  {
    start: /* @__PURE__ */ new Date("June 1, 2020 16:00:00 UTC"),
    title: "CCOV Residency at a Distance",
    type: ["residency", "net art"],
    topic: ["jitsi", "miro", "cooking"],
    collab: ["Nien Tzu Weng", "Naoto Hieda"],
    venue: "Centre de Création O Vertigo (online)",
    image: "https://cdn.glitch.com/e9f27e4f-87e5-46c9-8645-e03a6aedc236%2F200601residence.png",
    yt: "HL6CTlNuzak",
    desc: html`
      Quarantine time confines a body in a limited space surrounded by flat
      walls and urges us to have a fixed routine at home that ends up in
      flatness of time. The physical world becomes stiff and tasteless.
      Meanwhile, in a digital space, time is not linear as there is no constant
      rhythm - by interrupting and confusing the network, the accelerated
      miscommunication can lead us to another channel of communication.
    `
  },
  {
    start: /* @__PURE__ */ new Date("May 31, 2020"),
    title: "Processing Community Japan 30 Minute Coding 0",
    type: ["meetup"],
    topic: ["processing", "japan"],
    collab: ["Naoto Hieda", "Shunsuke Takawo"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-05-31-processing-community-japan-30min-coding-0-en.png",
    links: ["https://naotohieda.com/blog/processing-community-japan-30min-coding-0-en/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("May 30, 2020"),
    title: "15s or less Showcase - Stories from HK",
    type: ["net art"],
    topic: ["instagram", "hong kong"],
    collab: ["Naoto Hieda"],
    venue: "Umanesimo Artificiale (online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-05-30-15s-or-less-filter.png",
    links: ["https://naotohieda.com/blog/15s-or-less/", "https://umanesimoartificiale.medium.com/15s-or-less-showcase-432f3e07fe52"],
    desc: html`
    “Stories from HK” focused on protests in Hong Kong by creating a new work and curating works that are related to the digital culture in Hong Kong (but not limited to the protest).
    `
  },
  {
    start: /* @__PURE__ */ new Date("May 24, 2020"),
    title: "Algorithm | Degeneracy",
    type: ["performance", "net art"],
    topic: ["dance", "p-code"],
    collab: ["Naoto Hieda"],
    venue: "NL_CL / iii (online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-05-24-nl-cl-2-flesh.png",
    links: ["https://naotohieda.com/blog/nl-cl-2-flesh/", "https://instrumentinventors.org/event/nl_cl-2-flesh/"],
    desc: html`
Algorithm | Degeneracy is a hybrid live-code-dance performance that travels between modalities such as images, emotions as words, sounds and movements through a perspective of high-functioning autism. Naoto Hieda, as a dancer and a live-coder, picks a word from a vocabulary of emotions and records movements overlaid on an image found on Google search. A chat interface is used to communicate with the audience; furthermore, each byte of an input text is translated into sound in a live-coding manner, adding another modality to express emotions. The performance takes place as a live-streaming and as an online installation in a custom virtual space where visitors can freely navigate. The online platform resembles a white gallery space, and the artifacts of the performance are installed on the fly. Contrary to the ephemerality of the performance, the recorded movements and sounds remain as a permanent exhibition.
`
  },
  {
    start: /* @__PURE__ */ new Date("May 16, 2020"),
    title: "Processing Community Hangout Japan 01",
    type: ["meetup"],
    topic: ["processing", "japan"],
    collab: ["Naoto Hieda", "Shunsuke Takawo"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-05-16-processing-community-hangout-japan-1-1.png",
    links: ["https://pchj01.peatix.com/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("May 9, 2020"),
    title: "Processing Community Hangout 02",
    type: ["meetup"],
    topic: ["processing"],
    collab: ["Naoto Hieda", "Saber Khan"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-05-09-processing-community-hangout-2-46.png",
    links: ["https://naotohieda.com/blog/processing-community-hangout-2-en/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("April 5, 2020"),
    title: "Processing Community Hangout 01",
    type: ["meetup"],
    topic: ["processing"],
    collab: ["Naoto Hieda", "Saber Khan"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-04-05-processing-community-hangout-1-en.png",
    links: ["https://naotohieda.com/blog/processing-community-hangout-1-en/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("April 1, 2020"),
    title: "Yoshino Gypsum Art Foundation Fellowship",
    type: ["award"],
    topic: [],
    collab: ["Naoto Hieda"],
    venue: "Yoshino Gypsum Art Foundation",
    image: "https://naotohieda.com/blog/assets/images/2020-02-06-khm-semester-1.jpg",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("February 29, 2020"),
    title: "p-code Land",
    type: ["installation", "net art"],
    topic: ["p-code"],
    collab: ["Naoto Hieda"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-02-29-p-code-land.jpg",
    links: ["https://naotohieda.com/blog/p-code-land/"],
    desc: html`
    p-code Land is an experimental virtual space for collective music live-coding. The syntax is based on <a href="https://github.com/p-code-magazine/p-code">p-code</a> but numbers denote MIDI notes not frequencies, and some features are added.
    `
  },
  {
    start: /* @__PURE__ */ new Date("February 22, 2020"),
    title: "Tweet Processing Editor",
    type: ["net art"],
    topic: ["processing"],
    collab: ["Naoto Hieda"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-02-22-tweet-processing-editor.png",
    links: ["https://naotohieda.com/blog/tweet-processing-editor/", "https://tsubuyaki-p5-editor.glitch.me/"],
    desc: html`
An editor with preview and minification of a p5.js sketch for Tweet Processing.
    `
  },
  {
    start: /* @__PURE__ */ new Date("February 14, 2020"),
    title: "Utopian Council",
    type: ["net art"],
    topic: ["vr"],
    collab: ["Utopian Council at KHM"],
    venue: "Kunsthochschule für Medien Köln",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-02-14-utopian-council.png",
    links: ["https://naotohieda.com/blog/utopian-council/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("February 11, 2020"),
    title: "Virtual Exhibition 004",
    type: ["installation", "net art"],
    topic: ["vr"],
    collab: ["Naoto Hieda"],
    venue: "online",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-02-11-virtual-exhibition-004.png",
    links: ["https://naotohieda.com/blog/virtual-exhibition-004/", "https://blog.glitch.com/post/drag-and-drop-your-art-to-the-virtual-world"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("February 5, 2020"),
    title: "Virtual Exhibition 003",
    type: ["performance"],
    topic: ["dance", "p-code"],
    collab: ["Naoto Hieda"],
    venue: "Kunsthochschule für Medien Köln",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-02-05-virtual-exhibition-003.png",
    links: ["https://naotohieda.com/blog/virtual-exhibition-003/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("February 1, 2020"),
    title: "Processing Community Day Tokyo 2020",
    type: ["meetup", "curation"],
    topic: ["processing", "japan"],
    collab: ["PCD Tokyo"],
    venue: "Yahoo! LODGE (Japan)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-02-01-processing-community-day-tokyo-2020-kids.jpg",
    links: ["https://pcd-tokyo.github.io/2020/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("January 10, 2020"),
    title: "The Body and the Other",
    type: ["performance"],
    topic: ["processing", "dance"],
    collab: ["Eleonora Siarava"],
    venue: "Festival Temps d'Images / tanzhaus nrw (Germany)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fthe-body-and-the-other-2048x862.jpg",
    links: ["https://vimeo.com/463813053"],
    desc: html`
Concept-choreography-artistic direction: Eleonora Siarava<br>
Dancers: Mina Ananiadou, Yana Novotorova<br>
Digital artist: Naoto Hieda<br>
Technology Development: Mixed Reality and Visualization Team [MIREVI]<br>
Sound Design: Jonas Knohl, MIREVI<br>
Project Coordinator: Ivana Druzetic, MIREVI<br>
Costumes-external eye: Anne Weyler<br>
`
  },
  {
    start: /* @__PURE__ */ new Date("December 28, 2019"),
    title: "Algorithm | Diversion",
    type: ["lecture"],
    topic: ["autism"],
    collab: ["Naoto Hieda"],
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F191228-ccc.jpg",
    links: ["https://naotohieda.com/blog/36c3/"],
    yt: "mh72oryqPYg",
    desc: html`
      Before media art has emerged, traditional art and dance are already applying algorithms to make sophisticated patterns in their textures or movements. Hieda is researching the use of algorithm through creation of media installations and dialog with artists, dancers, choreographers and musicians. He also presents his current interest in machine learning and art which potentially exclude (or already excluding) some populations due to the dataset and modality.
    `
  },
  {
    start: /* @__PURE__ */ new Date("December 22, 2019"),
    title: "Hydra Book",
    type: ["tutorial", "book"],
    topic: ["hydra"],
    collab: ["Naoto Hieda"],
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fhydra-book.png",
    links: ["https://hydra-book.glitch.com/"],
    desc: html`
      
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 28, 2019"),
    title: "Creative Code Köln",
    type: ["meetup"],
    topic: ["processing"],
    collab: ["Naoto Hieda"],
    venue: "Akkuraum (Germany)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2019-12-05-cck-meetup-intro.jpg",
    links: ["https://naotohieda.com/blog/creative-code-koeln-1/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 14, 2019"),
    title: "Articulation Hackathon",
    type: ["meetup"],
    topic: ["dance", "unity"],
    collab: ["Asaf Bachrach"],
    venue: "CNRS (France)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2019-11-15-articulation.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 11, 2019"),
    title: "Staebetanzen",
    type: ["performance"],
    topic: ["dance", "machine learning", "processing"],
    collab: ["Raphael Hillebrand", "Naoto Hieda", "HKAPA Students"],
    venue: "Hong Kong Academy for Performing Arts (Hong Kong)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fhkapa.jpg",
    links: ["https://vimeo.com/366438999"],
    desc: html`
    "Stäbetanz" is originally a choreography by Oskar Schlemmer. It is part of the Bauhaus dances. In honor of 100 years anniversary of Bauhaus we created a 21st century version of the "Stäbetanz". This time the poles (Stäbe) are created by a motiontracking system created by Naoto Hieda. The residency programm which made this possible is supported by the Hong Kong Academy of Performing Arts and the Goethe Institut.<br>
Choreography: Raphael Hillebrand<br>
Visual programming and machine learning: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("September 28, 2019"),
    title: "Passing Light",
    type: ["installation"],
    topic: ["vvvv", "processing", "puredata", "raspberry pi", "projection"],
    collab: ["Michael Montanaro", "Naoto Hieda", "Tatev Yesayan"],
    venue: "CHAOSMOSIS mAchInes / University of Toronto (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fpl.png",
    links: ["https://www.cdtps.utoronto.ca/events/chaosmosis-machines"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("September 16, 2019"),
    title: "HKAPA",
    type: ["residency", "workshop"],
    topic: ["dance", "machine learning", "processing"],
    collab: ["Raphael Hillebrand", "Naoto Hieda"],
    venue: "Hong Kong Academy for Performing Arts (Hong Kong)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-03-01-node-proposal-pathfinder-hkapa.jpg",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("September 12, 2019"),
    title: "XM-Profiler Prime",
    type: ["commercial"],
    topic: ["openFrameworks", "ingress"],
    collab: ["Ito-En"],
    venue: "Ito-En (Japan)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-03-12-financing-as-an-artist-2020-en.jpg",
    desc: html`
      Ingress visualizer installed in Tokyo, Sendai, Kyoto and Osaka<br>
      Visual programming: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("September 6, 2019"),
    title: "Walk 4 Me",
    type: ["installation"],
    topic: ["dance", "processing"],
    collab: ["Christopher Matthews", "Naoto Hieda"],
    venue: "Dance4 (UK)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-03-01-node-proposal-walk4me.jpg",
    desc: html`
    Concept, video: Christopher Matthews<br>
    Interaction programming: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("August 30, 2019"),
    title: "Nails | Pixels | Stimming",
    type: ["installation"],
    topic: ["weaving"],
    collab: ["Naoto Hieda"],
    venue: "Victoria and Albert Museum",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fnpsw.jpg",
    desc: html`
      V&A Friday Late at Victoria and Albert Museum (UK)
    `
  },
  {
    start: /* @__PURE__ */ new Date("June 20, 2019"),
    title: "Open, Closed, Open",
    type: ["installation"],
    topic: ["robot", "unity"],
    collab: ["Amir Shpilman", "Liat Grayver", "Yair Kira"],
    venue: "Jewish Museum Berlin",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F190620-oco.jpg",
    desc: html`
      Robotics: So Kanno, Naoto Hieda<br>
      Interactive visuals assistance: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("April 29, 2019"),
    title: "11th Choreographic Coding Lab",
    type: ["meetup"],
    topic: ["dance"],
    collab: ["Motion Bank"],
    venue: "Motion Bank",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F2020-05-24-nl-cl-2-flesh-ccl.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("April 12, 2019"),
    title: "Beyond Time",
    type: ["commercial"],
    topic: ["openFrameworks"],
    collab: ["Shiseido", "R/GA"],
    venue: "S/PARK (Japan)",
    image: "/beyondtime.jpg",
    desc: html`
      <div>
      Visual programming assistance: Naoto Hieda<br />
      Image from R/GA
      </div>
    `
  },
  {
    start: /* @__PURE__ */ new Date("February 2, 2019"),
    title: "Processing Community Day Tokyo 2019",
    type: ["meetup", "curation", "lecture"],
    topic: ["processing", "japan"],
    collab: ["PCD Tokyo"],
    venue: "Yahoo! LODGE (Japan)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fpcd2.jpg",
    links: ["https://naotohieda.com/blog/processing-community-day-tokyo-2019/"],
    desc: html`
      Organization, curation and talks: Naoto Hieda<br>
      Full credits in the link
    `
  },
  {
    start: /* @__PURE__ */ new Date("January 25, 2019"),
    title: "Cosmic Wander",
    type: ["performance"],
    topic: ["dance"],
    collab: ["Choy Ka Fai"],
    venue: "tanzhaus nrw (Germany)",
    desc: html`
      Visual programming (work-in-progress): Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("January 17, 2019"),
    title: "Dance Clinic Mobile",
    type: ["performance"],
    topic: ["dance", "eeg", "processing"],
    collab: ["Choy Ka Fai"],
    venue: "Festival Temps d'Images / tanzhaus nrw (Germany)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fdanceclinic.jpg",
    desc: html`
      Visual, interaction programming: Naoto Hieda<br>
image from tanzhaus nrw
    `
  },
  {
    start: /* @__PURE__ */ new Date("January 15, 2019"),
    title: "Algorithm | Diversion",
    type: ["lecture"],
    topic: ["dance", "autism", "processing"],
    collab: ["Naoto Hieda"],
    venue: "Festival Temps d'Images / tanzhaus nrw (Germany)",
    desc: html`
      Talk at symposium "Technological flesh!"
    `
  },
  {
    start: /* @__PURE__ */ new Date("January 15, 2019"),
    title: "fragility.jpg",
    type: ["installation"],
    topic: ["processing"],
    collab: ["Naoto Hieda"],
    venue: "Asia Culture Center (Korea)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Frwg2.jpg",
    links: ["http://thisweekendroom.com/wp/rwg2/"],
    desc: html`
      Screened in the frame of RECENT WORK GALLERY Ⅱ
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 22, 2018"),
    title: "Algorithm/Pattern/Diversity",
    type: ["lecture"],
    topic: ["autism", "processing"],
    collab: ["Naoto Hieda"],
    venue: "CITEC, Bielefeld University (Germany)",
    links: ["https://cit-ec.de/de/events/guest-talk-naoto-hieda"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 7, 2018"),
    title: "IMPACT18 - Matter in Movement",
    type: ["conference"],
    topic: ["autism"],
    collab: ["PACT Zollverein"],
    venue: "PACT Zollverein (Germany)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F181107-impact.jpg",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 1, 2018"),
    title: "XM-Profiler",
    type: ["commercial"],
    topic: ["openFrameworks", "ingress"],
    collab: ["Ito-En"],
    venue: "Ito-En (Japan)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F181101-xmprofiler.jpg",
    desc: html`
      Ingress visualizer installed in Tokyo, Sendai, Kyoto and Osaka<br>
      Visual programming: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 1, 2018"),
    title: "Jeux de Rebans",
    type: ["commercial"],
    topic: ["openFrameworks"],
    collab: ["Matilda"],
    venue: "Mikimoto (Japan)",
    image: "/cada0ae2-f902-428d-81e3-6a68f5e589e5_IMG_4349.JPG",
    desc: html`
      Visual programming: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("September 21, 2018"),
    title: "Processing and Generative Art",
    type: ["lecture", "workshop"],
    topic: ["processing"],
    collab: ["Naoto Hieda"],
    venue: "Seoul National University of Education (Korea)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fsnue-processing.jpg",
    desc: html`
      Guest talk at SNUE invited by Woosung Jung
    `
  },
  {
    start: /* @__PURE__ */ new Date("September 14, 2018"),
    title: "Usine 108",
    type: ["performance"],
    topic: ["processing", "machine learning"],
    collab: ["Evelyne Drouin", "Naoto Hieda"],
    venue: "Seoul Art Space Geumcheon (Korea)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fsasg2.jpg",
    links: ["https://blog.naver.com/sas_g/221428126204"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("September 13, 2018"),
    title: "Autistic View",
    type: ["installation"],
    topic: ["openframeworks"],
    collab: ["Naoto Hieda"],
    venue: "Seoul Art Space Geumcheon (Korea)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fautistic.png",
    desc: html`
    An installation with sauna receipts and shots on streets
    `
  },
  {
    start: /* @__PURE__ */ new Date("August 17, 2018"),
    title: "Mapping Party #3",
    type: ["meetup"],
    topic: ["processing"],
    collab: ["Naoto Hieda"],
    venue: "Seoul Art Space Geumcheon (Korea)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fmapping-party-3.jpg",
    desc: html`
      party with projection mapping
    `
  },
  {
    start: /* @__PURE__ */ new Date("August 8, 2018"),
    title: "Mapping Party #2",
    type: ["meetup"],
    topic: ["processing"],
    collab: ["Naoto Hieda"],
    venue: "Seoul Art Space Geumcheon (Korea)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fmapping-party-2.jpg",
    desc: html`
      party with projection mapping
    `
  },
  {
    start: /* @__PURE__ */ new Date("July 24, 2018"),
    title: "Deep Performance Dwelling",
    type: ["installation"],
    topic: ["vvvv"],
    collab: ["Team MTL"],
    venue: "Solar Decathlon (China)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fsolar-decathlon.png",
    desc: html`
      Visuals, interaction programming: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("July 19, 2018"),
    title: "Mapping Party #1",
    type: ["meetup"],
    topic: ["processing"],
    collab: ["Naoto Hieda"],
    venue: "Seoul Art Space Geumcheon (Korea)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fsasg.png",
    desc: html`
      party with projection mapping
    `
  },
  {
    start: /* @__PURE__ */ new Date("July 16, 2018"),
    title: "Call Stack",
    type: ["residency", "net art"],
    topic: ["processing"],
    collab: ["Janine Harrington", "Naoto Hieda"],
    venue: "Digitale Performance Web Residency / Favoriten Festival (Germany, online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fcs.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("July 3, 2018"),
    title: "Artist in Residence",
    type: ["residency"],
    topic: ["processing"],
    collab: ["Evelyne Drouin", "Naoto Hieda"],
    venue: "Seoul Art Space Geumcheon (Korea)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fusine.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("June 28, 2018"),
    title: "Skin Irony Virtual Screen",
    type: ["commercial"],
    topic: ["openFrameworks"],
    collab: ["Matilda"],
    venue: "Swatch (Japan)",
    image: "/cada0ae2-f902-428d-81e3-6a68f5e589e5_IMG_2495.JPG",
    desc: html`
      Visual programming: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("April 28, 2018"),
    title: "Choreographic Coding Lab + Pathfinder",
    type: ["workshop"],
    topic: ["processing", "pathfinder"],
    collab: ["Christian Mio Loclair", "Naoto Hieda"],
    venue: "NOVA Festival / Point (Romania)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fpathrefinder.jpg",
    desc: html`
      
    `
  },
  {
    start: /* @__PURE__ */ new Date("April 26, 2018"),
    title: "Machine Learning for Artists",
    type: ["translation"],
    topic: ["machine learning"],
    collab: ["Kenichi Yoneda", "Naoto Hieda"],
    venue: "online",
    image: "/ml4a.jpg",
    links: ["https://ml4a.github.io/ml4a/jp/neural_networks/"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("April 18, 2018"),
    title: "Pecha Kucha at TML #3",
    type: ["meetup"],
    topic: [],
    collab: ["Topological Media Lab"],
    venue: "Topological Media Lab (Canada)",
    desc: html`
      Organizer: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("April 4, 2018"),
    title: "Pecha Kucha at TML #2",
    type: ["meetup"],
    topic: [],
    collab: ["Topological Media Lab"],
    venue: "Topological Media Lab (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fpecha-kucha-2.png",
    desc: html`
      Organizer: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("March 22, 2018"),
    title: "KUU",
    type: ["installation"],
    topic: ["processing"],
    collab: ["KUU"],
    venue: "SNDO (Netherlands)",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("March 8, 2018"),
    title: "Pecha Kucha at TML #1",
    type: ["meetup"],
    topic: [],
    collab: ["Topological Media Lab"],
    venue: "Topological Media Lab (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fpecha-kucha-1.jpg",
    desc: html`
      Talk: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("March 3, 2018"),
    title: "body_code",
    type: ["performance"],
    topic: ["processing", "dance"],
    collab: ["CCOV", "perte de signal"],
    venue: "Centre de Création O Vertigo (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fbc.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("February 12, 2018"),
    title: "Machine Learning Literacy",
    type: ["conference"],
    topic: ["machine learning"],
    collab: ["School for Poetic Computation"],
    venue: "School for Poetic Computation (US)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2F180215-sfpc-drawing.jpg",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("January 13, 2018"),
    title: "Performance",
    type: ["performance"],
    topic: ["raspberry pi"],
    collab: ["Evelyne Drouin", "Naoto Hieda"],
    venue: "Centre Clark (Canada)",
    links: ["https://medium.com/@naoto_hieda/raspberry-pi-zero-for-interactive-sound-performance-at-centre-clark-8ebe96da1f2a"],
    desc: html`
      Composition and performance: Evelyne Drouin<br>
      Development: Naoto Hieda
    `
  },
  {
    start: /* @__PURE__ */ new Date("December 18, 2017"),
    title: "Artist in Residence",
    type: ["residency"],
    topic: ["dance"],
    collab: ["Nien Tzu Weng", "Naoto Hieda"],
    venue: "Studio 303 (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fpathrefinder.png",
    desc: html`
    
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 14, 2017"),
    title: "Beatdox",
    type: ["performance"],
    topic: ["dance", "eeg"],
    collab: ["Olivier Lalonde", "Naoto Hieda"],
    venue: "RIDM / Cinémathèque Québecoise (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fridm.jpg",
    desc: html`
    image from MUSICMOTION website
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 1, 2017"),
    title: "EEG Drawing",
    type: ["installation"],
    topic: ["eeg", "openFrameworks"],
    collab: ["Evelyne Drouin", "Naoto Hieda"],
    venue: "Cancerto (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fmuse.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 23, 2017"),
    title: "Mobile Brain-Computer Interface for Dance and Somatic Practice",
    type: ["installation"],
    topic: ["python", "eeg", "openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "UIST (Canada)",
    desc: html`
  
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 14, 2017"),
    title: "EEG Drawing",
    type: ["installation"],
    topic: ["eeg", "openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "NeuroTechTO / TAVES / Toronto Congress Centre (Canada)",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 5, 2017"),
    title: "Passing Light",
    type: ["installation"],
    topic: ["vvvv", "processing", "puredata", "raspberry pi", "projection"],
    collab: ["Michael Montanaro", "Naoto Hieda", "Tatev Yesayan"],
    venue: "MAPP_MTL Invisible Exhibition Micro-Mapping / Never Apart (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fpl.png",
    desc: html`
      Concept and direction: Michael Montanaro<br>
      Visual programming: Naoto Hieda<br>
      Fabrication: Tatev Yesayan
    `
  },
  {
    start: /* @__PURE__ */ new Date("August 10, 2017"),
    title: "Seismic Session",
    type: ["performance"],
    topic: ["dance"],
    collab: ["Doris Uhlich"],
    venue: "ImPulsTanz / Secession (Austria)",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("July 9, 2017"),
    title: "Lads",
    type: ["installation"],
    topic: ["dance", "openFrameworks", "max"],
    collab: ["Christopher Matthews"],
    venue: "Villa Empain (Belgium)",
    image: "/Christopher_Matthews_MBAE_WildCard_5888.jpg",
    desc: html`
      <div>
      Sound programming: Naoto Hieda<br />
      <a target="_blank" href="http://www.formedview.com/lads-201718-n">Image source</a>
      </div>
    `
  },
  {
    start: /* @__PURE__ */ new Date("June 16, 2017"),
    title: "Passing Light",
    type: ["installation"],
    topic: ["vvvv", "processing", "puredata", "raspberry pi", "projection"],
    collab: ["Michael Montanaro", "Jerome Delapierre", "Naoto Hieda", "Tatev Yesayan"],
    venue: "InTime / Topological Media Lab (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fpl.png",
    desc: html`
      Concept and direction: Michael Montanaro, Jerome Delapierre<br>
      Visual programming: Jerome Delapierre, Naoto Hieda<br>
      Fabrication: Tatev Yesayan
    `
  },
  {
    start: /* @__PURE__ */ new Date("June 10, 2017"),
    title: "Hack the Brain",
    type: ["meetup"],
    topic: ["dance"],
    collab: ["Science Gallery Dublin"],
    venue: "Science Gallery Dublin (Ireland)",
    desc: html`
    hackathon group lead
    `
  },
  {
    start: /* @__PURE__ */ new Date("May 6, 2017"),
    title: "8th Choreographic Coding Lab",
    type: ["meetup"],
    topic: ["dance"],
    collab: ["Motion Bank"],
    venue: "De Brakke Grond (Netherlands)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Feegccl.jpg",
    desc: html`
    
    `
  },
  {
    start: /* @__PURE__ */ new Date("April 27, 2017"),
    title: "Transenses",
    type: ["performance"],
    topic: ["dance", "max"],
    collab: ["Akiko Kitamura", "Navid Navab"],
    venue: "Tangente (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fts.png",
    links: ["https://vimeo.com/238534871", "https://naotohieda.com/blog/transenses/"],
    desc: html`
    Ideation, artistic direction and dramaturgy : NAVIKO (Akiko Kitamura + Navid Navab)<br>
    Choreography and performance : Akiko Kitamura<br>
    Audiovisual composition, gestural sound and interactive scenography : Navid Navab<br>
    Visual programming: Naoto Hieda, Evan Montpellier
    `
  },
  {
    start: /* @__PURE__ */ new Date("April 1, 2017"),
    title: "Pola Art Foundation Fellowship",
    type: ["award"],
    topic: [],
    collab: ["Naoto Hieda"],
    venue: "Pola Art Foundation",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("March 7, 2017"),
    title: "Chorégraphie Cérébrale",
    type: ["performance"],
    topic: ["dance", "eeg"],
    collab: ["Olivier Lalonde", "Naoto Hieda", "Marie-Noëlle De Sève"],
    venue: "Printemps Numeriques / Canadian Centre for Architecture (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fcc.jpg",
    desc: html`
    
    `
  },
  {
    start: /* @__PURE__ */ new Date("March 3, 2017"),
    title: "Performance",
    type: ["performance"],
    topic: ["arduino"],
    collab: ["Evelyne Drouin", "Captain Az!z"],
    venue: "Nuit Blanche / Société des Arts Technologiques (Canada)",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("February 13, 2017"),
    title: "Scènes Ouvertes",
    type: ["performance"],
    topic: ["scenic", "processing", "arduino"],
    collab: ["Evelyne Drouin", "Naoto Hieda"],
    venue: "Société des Arts Technologiques (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fso.jpg",
    desc: html`
    
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 12, 2016"),
    title: "EEG Drawing",
    type: ["installation"],
    topic: ["openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "TEDxMontreal (Canada)",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 2, 2016"),
    title: "EEG Drawing",
    type: ["installation"],
    topic: ["eeg", "openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "World Maker Faire (US)",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("September 23, 2016"),
    title: "An Intelligent Floor Surface for Foot-based Exploration of Geospatial Data",
    type: ["conference", "lecture"],
    topic: ["haptics"],
    collab: ["Naoto Hieda", "Jan Anlauff"],
    venue: "International Workshop on Multimedia Signal Processing (Canada)",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("August 14, 2016"),
    title: "Showing",
    type: ["performance"],
    topic: ["dance"],
    collab: ["Ainesh Madan"],
    venue: "ImPulsTanz / Leopold Museum (Austria)",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("July 29, 2016"),
    title: "That Choreographs Us!",
    type: ["performance"],
    topic: ["dance"],
    collab: ["Benoit Lachambre"],
    venue: "ImPulsTanz (Austria)",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("July 14, 2016"),
    title: "danceWEB",
    type: ["residency", "award"],
    topic: ["dance"],
    collab: ["Naoto Hieda"],
    venue: "ImPulsTanz (Austria)",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("May 31, 2016"),
    title: "Composite Particles",
    type: ["installation"],
    topic: ["unity"],
    collab: ["Evelyne Drouin", "Naoto Hieda"],
    venue: "IX Symposium (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fcomposite.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("May 27, 2016"),
    title: "Workshop on Mobile EEG for Neuroscience",
    type: ["lecture"],
    topic: ["eeg"],
    collab: ["BRAMS"],
    venue: "BRAMS (Canada)",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("April 26, 2016"),
    title: "Avian Attractor",
    type: ["installation", "conference"],
    topic: ["openFrameworks"],
    collab: ["Judith Doyle", "Naoto Hieda"],
    venue: "CHI Art Exhibition / Works/San José (US)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Favian.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("April 30, 2016"),
    title: "Glitch 3D",
    type: ["meetup"],
    topic: ["3D scan", "openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "Virtual Reality Hackathon (Canada)",
    image: "/g3.jpg",
    links: ["https://devpost.com/software/glitch-3d"],
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("April 22, 2016"),
    title: "Glitch over Emotion Transfer Protocol",
    type: ["meetup"],
    topic: ["face tracking", "openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "Hack Day (Canada)",
    image: "/goetp.jpg",
    links: ["https://vimeo.com/164074864"],
    desc: html`
    
    `
  },
  {
    start: /* @__PURE__ */ new Date("April 21, 2016"),
    title: "EEG Drawing",
    type: ["installation"],
    topic: ["eeg", "openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "NeuroTechTO / Bnotions (Canada)",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("April 12, 2016"),
    title: "Using brain waves to do art",
    type: ["workshop"],
    topic: ["eeg", "python"],
    collab: ["Naoto Hieda"],
    venue: "NeuroTechMTL (Canada)",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("February 27, 2016"),
    title: "Composite Particles",
    type: ["installation", "award"],
    topic: ["unity"],
    collab: ["Evelyne Drouin", "Naoto Hieda"],
    venue: "Nuit Blanche / Société des Arts Technologiques (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fcomposite.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("January 28, 2016"),
    title: "Igloofest",
    type: ["performance"],
    topic: ["openFrameworks"],
    collab: ["Evelyne Drouin", "Captain Az!z"],
    venue: "Igloofest (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Figloofest.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("January 25, 2016"),
    title: "EEG Drawing",
    type: ["installation"],
    topic: ["eeg", "openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "TEDxMontreal Cocktail Party (Canada)",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 8, 2015"),
    title: "MINIW",
    type: ["installation"],
    topic: ["unity"],
    collab: ["Naoto Hieda"],
    venue: "Maker Faire Ottawa (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fminiw.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("November 7, 2015"),
    title: "MINIW and Bizarrege (Play)",
    type: ["installation"],
    topic: ["openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "TEDxMontreal / Usine C (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2FbizarregePlay.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("August 27, 2015"),
    title: "4th Choreographic Coding Lab",
    type: ["meetup"],
    topic: ["dance"],
    collab: ["Motion Bank"],
    venue: "NYU (US)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fccl4smalt.png",
    desc: html`
      Cellular Body
    `
  },
  {
    start: /* @__PURE__ */ new Date("August 14, 2015"),
    title: "Crow Panel",
    type: ["installation", "conference"],
    topic: ["openFrameworks"],
    collab: ["Judith Doyle"],
    venue: "ISEA / Museum of Vancouver (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Ftelus.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("August 1, 2015"),
    title: "Bizarrege",
    type: ["installation"],
    topic: ["openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "Maker Faire Toronto / Toronto Reference Library (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fbizarrege.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("June 10, 2015"),
    title: "Digital Facial Augmentation for Interactive Entertainment",
    type: ["installation", "conference", "lecture"],
    topic: ["openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "INTETAIN (Italy)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fintetain.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("May 25, 2015"),
    title: "Google Summer of Code",
    type: ["residency"],
    topic: ["opencv"],
    collab: ["Naoto Hieda"],
    venue: "OpenCV / Google (online)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fgsoc.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("April 11, 2015"),
    title: "sharedFace2",
    type: ["installation", "conference", "lecture"],
    topic: ["openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "Laval Virtual (France)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2FsharedFace2.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("February 28, 2015"),
    title: "Mémoire Liquide",
    type: ["installation"],
    topic: ["openFrameworks"],
    collab: ["Marcella França"],
    venue: "Nuit Blanche / Société des Arts Technologiques (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fmemoire.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("October 23, 2014"),
    title: "sharedFace",
    type: ["installation", "award"],
    topic: ["openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "IVRC (Japan)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2FsharedFace.png",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("May 15, 2014"),
    title: "Image Processing with the Microsoft Kinect",
    type: ["workshop", "lecture"],
    topic: ["kinect"],
    collab: ["Naoto Hieda"],
    venue: "GRAND (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2FgrandKinect.png",
    desc: html`
    organization and lecture
    `
  },
  {
    start: /* @__PURE__ */ new Date("May 14, 2014"),
    title: "Kinetic Video Projection for Theatre Lighting",
    type: ["installation"],
    topic: ["openFrameworks"],
    collab: ["Naoto Hieda"],
    venue: "GRAND (Canada)",
    image: "https://cdn.glitch.com/cada0ae2-f902-428d-81e3-6a68f5e589e5%2Fgrand2014.jpg",
    desc: html`
    `
  },
  {
    start: /* @__PURE__ */ new Date("June 11, 2012"),
    title: "SPIDAR-mouse OSX/Linux Driver",
    type: ["installation"],
    topic: ["haptics"],
    collab: ["Naoto Hieda"],
    venue: "",
    image: "https://naotohieda.com/img/spidarMouse.jpg",
    desc: html`
    `
  }
];
const filter$1 = (state, emitter) => {
  console.log("count", sc.length);
  let id = 0;
  Intl.DateTimeFormat().resolvedOptions().timeZone;
  state.contents = sc.map((e) => {
    const dateYear = e.start.toLocaleDateString(void 0, {
      year: "numeric"
    });
    return { ...e, dateYear, id: id++ };
  });
  state.filter = {};
  const counter = [];
  for (const s of state.contents) {
    const types = [...s.type, "all"];
    for (const t of types) {
      const c = counter.find((el) => el.t == t);
      if (c == void 0) {
        counter.push({ t, count: 1 });
      } else {
        c.count++;
      }
    }
  }
  console.log(counter);
  state.types = counter.sort((a, b) => {
    if (a.count < b.count) {
      return 1;
    }
    if (a.count == b.count) {
      return 0;
    }
    return -1;
  });
};
function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
  return void 0;
}
function createStyleElement(options) {
  var tag = document.createElement("style");
  tag.setAttribute("data-emotion", options.key);
  if (options.nonce !== void 0) {
    tag.setAttribute("nonce", options.nonce);
  }
  tag.appendChild(document.createTextNode(""));
  tag.setAttribute("data-s", "");
  return tag;
}
var StyleSheet = /* @__PURE__ */ function() {
  function StyleSheet2(options) {
    var _this = this;
    this._insertTag = function(tag) {
      var before;
      if (_this.tags.length === 0) {
        if (_this.insertionPoint) {
          before = _this.insertionPoint.nextSibling;
        } else if (_this.prepend) {
          before = _this.container.firstChild;
        } else {
          before = _this.before;
        }
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }
      _this.container.insertBefore(tag, before);
      _this.tags.push(tag);
    };
    this.isSpeedy = options.speedy === void 0 ? true : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce;
    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.insertionPoint = options.insertionPoint;
    this.before = null;
  }
  var _proto = StyleSheet2.prototype;
  _proto.hydrate = function hydrate(nodes) {
    nodes.forEach(this._insertTag);
  };
  _proto.insert = function insert(rule) {
    if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }
    var tag = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);
      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e) {
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }
    this.ctr++;
  };
  _proto.flush = function flush() {
    this.tags.forEach(function(tag) {
      var _tag$parentNode;
      return (_tag$parentNode = tag.parentNode) == null ? void 0 : _tag$parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };
  return StyleSheet2;
}();
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length2) {
  return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "" };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0), root, { length: -root.length }, props);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      // ] ) " '
      case type:
        return position;
      // " '
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      // (
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      // \
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      // (
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1)
            ampersand = -1;
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      // \
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      // /
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      // {
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      // } ; \0
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          // \0 }
          case 0:
          case 125:
            scanning = 0;
          // ;
          case 59 + offset:
            if (ampersand == -1) characters2 = replace(characters2, /\f/g, "");
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
            break;
          // @ ;
          case 59:
            characters2 += ";";
          // { rule/at-rule
          default:
            append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      // :
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          // &
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          // ,
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          // @
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          // -
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
      if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
        props[k++] = z;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2);
}
function comment(value, root, parent) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
function declaration(value, root, parent, length2) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
}
function serialize(children, callback) {
  var output = "";
  var length2 = sizeof(children);
  for (var i = 0; i < length2; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case LAYER:
      if (element.children.length) break;
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      element.value = element.props.join(",");
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i = 0; i < length2; i++)
      output += collection[i](element, index, children, callback) || "";
    return output;
  };
}
function rulesheet(callback) {
  return function(element) {
    if (!element.root) {
      if (element = element.return)
        callback(element);
    }
  };
}
function memoize(fn) {
  var cache2 = /* @__PURE__ */ Object.create(null);
  return function(arg) {
    if (cache2[arg] === void 0) cache2[arg] = fn(arg);
    return cache2[arg];
  };
}
var identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index) {
  var previous = 0;
  var character2 = 0;
  while (true) {
    previous = character2;
    character2 = peek();
    if (previous === 38 && character2 === 12) {
      points[index] = 1;
    }
    if (token(character2)) {
      break;
    }
    next();
  }
  return slice(begin, position);
};
var toRules = function toRules2(parsed, points) {
  var index = -1;
  var character2 = 44;
  do {
    switch (token(character2)) {
      case 0:
        if (character2 === 38 && peek() === 12) {
          points[index] = 1;
        }
        parsed[index] += identifierWithPointTracking(position - 1, points, index);
        break;
      case 2:
        parsed[index] += delimit(character2);
        break;
      case 4:
        if (character2 === 44) {
          parsed[++index] = peek() === 58 ? "&\f" : "";
          points[index] = parsed[index].length;
          break;
        }
      // fallthrough
      default:
        parsed[index] += from(character2);
    }
  } while (character2 = next());
  return parsed;
};
var getRules = function getRules2(value, points) {
  return dealloc(toRules(alloc(value), points));
};
var fixedElements = /* @__PURE__ */ new WeakMap();
var compat = function compat2(element) {
  if (element.type !== "rule" || !element.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  element.length < 1) {
    return;
  }
  var value = element.value;
  var parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;
  while (parent.type !== "rule") {
    parent = parent.parent;
    if (!parent) return;
  }
  if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
    return;
  }
  if (isImplicitRule) {
    return;
  }
  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;
  for (var i = 0, k = 0; i < rules.length; i++) {
    for (var j = 0; j < parentRules.length; j++, k++) {
      element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
    }
  }
};
var removeLabel = function removeLabel2(element) {
  if (element.type === "decl") {
    var value = element.value;
    if (
      // charcode for l
      value.charCodeAt(0) === 108 && // charcode for b
      value.charCodeAt(2) === 98
    ) {
      element["return"] = "";
      element.value = "";
    }
  }
};
function prefix(value, length2) {
  switch (hash(value, length2)) {
    // color-adjust
    case 5103:
      return WEBKIT + "print-" + value + value;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    // flex, flex-direction
    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    // order
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    // align-items
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    // align-self
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/, "") + value;
    // align-content
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/, "") + value;
    // flex-shrink
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    // flex-basis
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    // flex-grow
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    // transition
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    // cursor
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    // background, background-image
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    // justify-content
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    // (min|max)?(width|height|inline-size|block-size)
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6) switch (charat(value, length2 + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (charat(value, length2 + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
        // (s)tretch
        case 115:
          return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2) + value : value;
      }
      break;
    // position: sticky
    case 4949:
      if (charat(value, length2 + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (charat(value, strlen(value) - 3 - (~indexof(value, "!important") && 10))) {
        // stic(k)y
        case 107:
          return replace(value, ":", ":" + WEBKIT) + value;
        // (inline-)?fl(e)x
        case 101:
          return replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
      }
      break;
    // writing-mode
    case 5936:
      switch (charat(value, length2 + 11)) {
        // vertical-l(r)
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        // vertical-r(l)
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        // horizontal(-)tb
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
      return WEBKIT + value + MS + value + value;
  }
  return value;
}
var prefixer = function prefixer2(element, index, children, callback) {
  if (element.length > -1) {
    if (!element["return"]) switch (element.type) {
      case DECLARATION:
        element["return"] = prefix(element.value, element.length);
        break;
      case KEYFRAMES:
        return serialize([copy(element, {
          value: replace(element.value, "@", "@" + WEBKIT)
        })], callback);
      case RULESET:
        if (element.length) return combine(element.props, function(value) {
          switch (match(value, /(::plac\w+|:read-\w+)/)) {
            // :read-(only|write)
            case ":read-only":
            case ":read-write":
              return serialize([copy(element, {
                props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")]
              })], callback);
            // :placeholder
            case "::placeholder":
              return serialize([copy(element, {
                props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")]
              }), copy(element, {
                props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")]
              }), copy(element, {
                props: [replace(value, /:(plac\w+)/, MS + "input-$1")]
              })], callback);
          }
          return "";
        });
    }
  }
};
var defaultStylisPlugins = [prefixer];
var createCache = function createCache2(options) {
  var key = options.key;
  if (key === "css") {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(ssrStyles, function(node2) {
      var dataEmotionAttribute = node2.getAttribute("data-emotion");
      if (dataEmotionAttribute.indexOf(" ") === -1) {
        return;
      }
      document.head.appendChild(node2);
      node2.setAttribute("data-s", "");
    });
  }
  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
  var inserted = {};
  var container;
  var nodesToHydrate = [];
  {
    container = options.container || document.head;
    Array.prototype.forEach.call(
      // this means we will ignore elements which don't have a space in them which
      // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
      document.querySelectorAll('style[data-emotion^="' + key + ' "]'),
      function(node2) {
        var attrib = node2.getAttribute("data-emotion").split(" ");
        for (var i = 1; i < attrib.length; i++) {
          inserted[attrib[i]] = true;
        }
        nodesToHydrate.push(node2);
      }
    );
  }
  var _insert;
  var omnipresentPlugins = [compat, removeLabel];
  {
    var currentSheet;
    var finalizingPlugins = [stringify, rulesheet(function(rule) {
      currentSheet.insert(rule);
    })];
    var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
    var stylis = function stylis2(styles) {
      return serialize(compile(styles), serializer);
    };
    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;
      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      if (shouldCache) {
        cache2.inserted[serialized.name] = true;
      }
    };
  }
  var cache2 = {
    key,
    sheet: new StyleSheet({
      key,
      container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend,
      insertionPoint: options.insertionPoint
    }),
    nonce: options.nonce,
    inserted,
    registered: {},
    insert: _insert
  };
  cache2.sheet.hydrate(nodesToHydrate);
  return cache2;
};
function murmur2(str) {
  var h = 0;
  var k, i = 0, len = str.length;
  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
    k = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
    k ^= /* k >>> r: */
    k >>> 24;
    h = /* Math.imul(k, m): */
    (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 255;
      h = /* Math.imul(h, m): */
      (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  h ^= h >>> 13;
  h = /* Math.imul(h, m): */
  (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}
var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var isCustomProperty = function isCustomProperty2(property) {
  return property.charCodeAt(1) === 45;
};
var isProcessableValue = function isProcessableValue2(value) {
  return value != null && typeof value !== "boolean";
};
var processStyleName = /* @__PURE__ */ memoize(function(styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
});
var processStyleValue = function processStyleValue2(key, value) {
  switch (key) {
    case "animation":
    case "animationName": {
      if (typeof value === "string") {
        return value.replace(animationRegex, function(match2, p1, p2) {
          cursor = {
            name: p1,
            styles: p2,
            next: cursor
          };
          return p1;
        });
      }
    }
  }
  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
    return value + "px";
  }
  return value;
};
function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return "";
  }
  var componentSelector = interpolation;
  if (componentSelector.__emotion_styles !== void 0) {
    return componentSelector;
  }
  switch (typeof interpolation) {
    case "boolean": {
      return "";
    }
    case "object": {
      var keyframes = interpolation;
      if (keyframes.anim === 1) {
        cursor = {
          name: keyframes.name,
          styles: keyframes.styles,
          next: cursor
        };
        return keyframes.name;
      }
      var serializedStyles = interpolation;
      if (serializedStyles.styles !== void 0) {
        var next2 = serializedStyles.next;
        if (next2 !== void 0) {
          while (next2 !== void 0) {
            cursor = {
              name: next2.name,
              styles: next2.styles,
              next: cursor
            };
            next2 = next2.next;
          }
        }
        var styles = serializedStyles.styles + ";";
        return styles;
      }
      return createStringFromObject(mergedProps, registered, interpolation);
    }
  }
  var asString = interpolation;
  if (registered == null) {
    return asString;
  }
  var cached = registered[asString];
  return cached !== void 0 ? cached : asString;
}
function createStringFromObject(mergedProps, registered, obj) {
  var string = "";
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var key in obj) {
      var value = obj[key];
      if (typeof value !== "object") {
        var asString = value;
        if (registered != null && registered[asString] !== void 0) {
          string += key + "{" + registered[asString] + "}";
        } else if (isProcessableValue(asString)) {
          string += processStyleName(key) + ":" + processStyleValue(key, asString) + ";";
        }
      } else {
        if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(key) + ":" + processStyleValue(key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);
          switch (key) {
            case "animation":
            case "animationName": {
              string += processStyleName(key) + ":" + interpolated + ";";
              break;
            }
            default: {
              string += key + "{" + interpolated + "}";
            }
          }
        }
      }
    }
  }
  return string;
}
var labelPattern = /label:\s*([^\s;{]+)\s*(;|$)/g;
var cursor;
function serializeStyles(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
    return args[0];
  }
  var stringMode = true;
  var styles = "";
  cursor = void 0;
  var strings = args[0];
  if (strings == null || strings.raw === void 0) {
    stringMode = false;
    styles += handleInterpolation(mergedProps, registered, strings);
  } else {
    var asTemplateStringsArr = strings;
    styles += asTemplateStringsArr[0];
  }
  for (var i = 1; i < args.length; i++) {
    styles += handleInterpolation(mergedProps, registered, args[i]);
    if (stringMode) {
      var templateStringsArr = strings;
      styles += templateStringsArr[i];
    }
  }
  labelPattern.lastIndex = 0;
  var identifierName = "";
  var match2;
  while ((match2 = labelPattern.exec(styles)) !== null) {
    identifierName += "-" + match2[1];
  }
  var name = murmur2(styles) + identifierName;
  return {
    name,
    styles,
    next: cursor
  };
}
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = "";
  classNames.split(" ").forEach(function(className) {
    if (registered[className] !== void 0) {
      registeredStyles.push(registered[className] + ";");
    } else if (className) {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var registerStyles = function registerStyles2(cache2, serialized, isStringTag) {
  var className = cache2.key + "-" + serialized.name;
  if (
    // we only need to add the styles to the registered cache if the
    // class name could be used further down
    // the tree but if it's a string tag, we know it won't
    // so we don't have to add it to registered cache.
    // this improves memory usage since we can avoid storing the whole style string
    cache2.registered[className] === void 0
  ) {
    cache2.registered[className] = serialized.styles;
  }
};
var insertStyles = function insertStyles2(cache2, serialized, isStringTag) {
  registerStyles(cache2, serialized);
  var className = cache2.key + "-" + serialized.name;
  if (cache2.inserted[serialized.name] === void 0) {
    var current = serialized;
    do {
      cache2.insert(serialized === current ? "." + className : "", current, cache2.sheet, true);
      current = current.next;
    } while (current !== void 0);
  }
};
function insertWithoutScoping(cache2, serialized) {
  if (cache2.inserted[serialized.name] === void 0) {
    return cache2.insert("", serialized, cache2.sheet, true);
  }
}
function merge(registered, css2, className) {
  var registeredStyles = [];
  var rawClassName = getRegisteredStyles(registered, registeredStyles, className);
  if (registeredStyles.length < 2) {
    return className;
  }
  return rawClassName + css2(registeredStyles);
}
var createEmotion = function createEmotion2(options) {
  var cache2 = createCache(options);
  cache2.sheet.speedy = function(value) {
    this.isSpeedy = value;
  };
  cache2.compat = true;
  var css2 = function css3() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var serialized = serializeStyles(args, cache2.registered, void 0);
    insertStyles(cache2, serialized);
    return cache2.key + "-" + serialized.name;
  };
  var keyframes = function keyframes2() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    var serialized = serializeStyles(args, cache2.registered);
    var animation = "animation-" + serialized.name;
    insertWithoutScoping(cache2, {
      name: serialized.name,
      styles: "@keyframes " + animation + "{" + serialized.styles + "}"
    });
    return animation;
  };
  var injectGlobal = function injectGlobal2() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    var serialized = serializeStyles(args, cache2.registered);
    insertWithoutScoping(cache2, serialized);
  };
  var cx = function cx2() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return merge(cache2.registered, css2, classnames(args));
  };
  return {
    css: css2,
    cx,
    injectGlobal,
    keyframes,
    hydrate: function hydrate(ids) {
      ids.forEach(function(key) {
        cache2.inserted[key] = true;
      });
    },
    flush: function flush() {
      cache2.registered = {};
      cache2.inserted = {};
      cache2.sheet.flush();
    },
    sheet: cache2.sheet,
    cache: cache2,
    getRegisteredStyles: getRegisteredStyles.bind(null, cache2.registered),
    merge: merge.bind(null, cache2.registered, css2)
  };
};
var classnames = function classnames2(args) {
  var cls = "";
  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;
    switch (typeof arg) {
      case "boolean":
        break;
      case "object": {
        if (Array.isArray(arg)) {
          toAdd = classnames2(arg);
        } else {
          toAdd = "";
          for (var k in arg) {
            if (arg[k] && k) {
              toAdd && (toAdd += " ");
              toAdd += k;
            }
          }
        }
        break;
      }
      default: {
        toAdd = arg;
      }
    }
    if (toAdd) {
      cls && (cls += " ");
      cls += toAdd;
    }
  }
  return cls;
};
var _createEmotion = createEmotion({
  key: "css"
}), css = _createEmotion.css;
const filter = (list, filter2) => {
  const newList = [];
  for (const l of list) {
    if (filter2 != void 0) {
      if (filter2.tag != void 0) {
        if (filter2.tag != "all" && l.type.indexOf(filter2.tag) < 0) continue;
      }
      if (filter2.year != void 0) {
        if (filter2.year != "all" && l.dateYear != filter2.year) continue;
      }
    }
    newList.push(l);
  }
  return newList;
};
const elementCss = css`
section {
  margin: 150px auto auto auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
	  justify-content: flex-start;
  }
}

@media print {
  section {
    margin: auto;
    break-inside: avoid;
  }
}

.caption {
  max-width: 700px;
  box-sizing:content-box;
  background-color: white;
  overflow-x: hidden;
  margin: 10px;
  @media only screen and (max-width: 1200px) {
    margin: 80px auto 200px auto;
  }
  width: 90%;
  box-shadow: 0 0.5px 2px #000;
  -webkit-box-shadow: 0 0.5px 2px #000;
  padding: 30px 10px 10px 10px;

  .collabs {
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 50px;
  }

  .title {
    font-style: italic;
    left: -2px;
    position: relative;
  }

  .venue, .type {
    font-size: 12pt;
  }

  .venue {
    margin-bottom: 50px;
  }

  .desc {
    font-size: 12pt;
    margin-bottom: 50px;
  }

  .links {
    font-size: 12pt;
    a {
      margin-right: 20px;
    }
  }
}

.thumbnail {
  width: 100%;
	align-items: baseline;
  display: flex;
  justify-content: center;
  
  img {
    width: 100%;
    height: auto;
    max-width: 800px;
  }
  p {
    font-family: "HK Grotesk", arial, sans-serif;
    text-align: center;
    font-style: italic;
    background-color: #ccc;
    position: relative;
    width:100%;
    height:100px;
    max-width: 800px;
    height: 300px;
    line-height:300px;
  }
}
`;
const mainCss = css`
#main {
  display: flex;
  width: 100vw;
  background-color: white;

  #container {
    width: 100%;
    display: inline-block;
    margin-bottom: 100px;

    header {
      max-width: 700px;
      background-color: white;
      padding: 30px 10px 30px 10px;
      margin: 20px auto 200px auto;
      
      h1 {
        text-align: center;
      }
      @media only screen and (max-width: 600px) {
        h1 {
        font-size: 20pt;
        }
      }

      p {
        text-align: justify;
      }
      p.note {
        text-align: justify;
        font-size: 12pt;
      }
      @media only screen and (max-width: 600px) {
        p {
          font-size: 12pt;
        }
        p.note {
          font-size: 10pt;
        }
      }
    }
  }
}
`;
const filterCss = css`
div {
  font-size: 0.75em;
  p {
    margin-right: 0.3em;
    margin-top: 0.1em;
    margin-bottom: 0.1em;
    white-space: pre;
    float: left;
    background-color: #5ef177;
    color: #000;
    padding: 0.2em;
    border: solid rgba(255, 255, 255, 0);
    a {
      text-decoration: none;
    }
  }

  p.year {
    background-color: cornflowerblue;
  }

  .selected {
    border: solid rgba(0, 0, 0, 1);
  }
}
`;
function main(state, emit) {
  state.filter.year = state.params.year ? state.params.year : "all";
  state.filter.tag = state.params.tag ? state.params.tag : "all";
  let filterDom;
  {
    const filters = [];
    for (const t of state.types) {
      const selected = state.filter.tag == void 0 ? "" : state.filter.tag == t.t ? "selected" : "";
      filters.push(
        html`
          <p class="${t.t} ${selected}"><a href="/#${state.filter.year}/${t.t}">${t.t}</a></p>
        `
      );
    }
    filters.push(
      html`
        <div class=${css`clear: both;`}></div>
      `
    );
    for (const t of [
      "all",
      "2024",
      "2023",
      "2022",
      "2021",
      "2020",
      "2019",
      "2018",
      "2017",
      "2016",
      "2015",
      "2014"
    ]) {
      const selected = state.filter.year == void 0 ? "" : state.filter.year == t ? "selected" : "";
      filters.push(
        html`
          <p class="${t} ${selected} year"><a href="/#${t}/${state.filter.tag}">${t}</a></p>
        `
      );
    }
    filterDom = html`
    <div class=${filterCss}>
      Filter by
      <div>${filters}</div>
    </div>`;
  }
  Intl.DateTimeFormat().resolvedOptions().timeZone;
  const contents = filter(state.contents, state.filter).map((s) => {
    s.start.toLocaleDateString(void 0, {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
    let { dateYear, title, topic, desc, type, image, yt, collab, venue, links } = s;
    let types = [];
    for (let i = 0; i < type.length; i++) {
      let del = i < type.length - 1 ? ", " : "";
      types.push(type[i] + del);
    }
    let topics = [];
    for (let i = 0; i < topic.length; i++) {
      let del = i < topic.length - 1 ? ", " : "";
      topics.push(topic[i] + del);
    }
    let link = [];
    if (yt != void 0) {
      link.push(html`<a target="_blank" href="https://youtu.be/${yt}">Video</a>`);
    }
    for (let i = 0; links !== void 0 && i < links.length; i++) {
      let num = i + 1;
      if (links.length == 1) {
        num = "";
      }
      link.push(html`<div><a target="_blank" href="${links[i]}">Link ${num}</a></div>`);
    }
    let collabs = [];
    if (collab != void 0) {
      let i = 0;
      for (const c of collab) {
        collabs.push(`${c}`);
        if (i == collab.length - 2) {
          collabs.push(` and `);
        } else if (i < collab.length - 1) {
          collabs.push(`, `);
        }
        i++;
      }
    }
    let venueElt;
    if (venue != void 0) {
      let prefix2 = "";
      venueElt = html`
        ${prefix2} ${venue}
      `;
    }
    let imageElt;
    if (image != void 0) {
      imageElt = html`
        <img src="${image}" loading="lazy" />
      `;
    } else {
      imageElt = html`<p>The image is currently on loan</p>`;
    }
    return html`
      <section id="section-${s.id}">
        <div class="thumbnail">${imageElt}</div>
        <div class="caption">
          <div class="collabs">${collabs}</div>
          <div><span class="title">${title}</span>, <span class="date">${dateYear}</span></div>
          <div class="type">${types}${topics.length ? "; " : ""} ${topics}</div>
          <div class="venue">${venueElt}</div>
          <p class="desc">${desc}</p>
          <p class="links">${link}</p>
        </div>
      </section>
  `;
  });
  return html`
    <div class=${mainCss}>
      <div id="main">
        <div id="container">
          <header>
            <h1>Works: Naoto Hieda</h1>
            <p>
              <a href="https://naotohieda.com">Naoto Hieda</a> (1990, Japan) is a full stack net artist.
              As one of the most important figures in the field of the
              <a href="https://best-practices.glitch.me/"
                >Best Practices in Contemporary Dance</a
              >,
              Hieda has been taking a crucial role in the
              <a href="https://bestchat.glitch.me/">Best Practices Chat</a>
              since 2020. This exhibition is an attempt not only to exhibit the
              important works by Hieda, but also to show early works and
              sketches to unveil the creativity of Hieda.
            </p>
            <p class="note">
              The exhibition is curated by Naoto Hieda. Design by <a href="https://glitches.me/" target="_blank">glitches.me</a>.
              Note that some works do not show full credits not because of
              disrespect but Naoto being sloppy. Unlike museum captions, the
              year is not the year of production but that of exhibition.
            </p>

            ${filterDom}
          </header>

          <div class=${elementCss}>
            ${contents}
          </div>
        </div>
      </div>
    </div>
  `;
}
const app = choo({ hash: true });
app.use(filter$1);
app.route("/*", notFound);
function notFound() {
  return html`
    <div>
      <a href="/">
        404 with love ❤ back to top!
      </a>
    </div>
  `;
}
app.route("/", main);
app.route("/:year", main);
app.route("/:year/:tag", main);
app.mount("#choomount");
