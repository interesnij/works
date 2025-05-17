
! function(e) {
function t(r) {
    if (n[r]) return n[r].exports;
    var o = n[r] = {
        i: r,
        l: !1,
        exports: {}
    };
    return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports
}
var n = {};
t.m = e, t.c = n, t.d = function(e, n, r) {
    t.o(e, n) || Object.defineProperty(e, n, {
        enumerable: !0,
        get: r
    })
}, t.r = function(e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
    }), Object.defineProperty(e, "__esModule", {
        value: !0
    })
}, t.t = function(e, n) {
    if (1 & n && (e = t(e)), 8 & n) return e;
    if (4 & n && "object" == typeof e && e && e.__esModule) return e;
    var r = Object.create(null);
    if (t.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }), 2 & n && "string" != typeof e)
        for (var o in e) t.d(r, o, function(t) {
            return e[t]
        }.bind(null, o));
    return r
}, t.n = function(e) {
    var n = e && e.__esModule ? function() {
        return e.default
    } : function() {
        return e
    };
    return t.d(n, "a", n), n
}, t.o = function(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
}, t.p = "", t(t.s = 671)
}({
1: function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = function(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
},
102: function(e, t, n) {
    e.exports = {
        default: n(125),
        __esModule: !0
    }
},
11: function(e, t) {
    var n = e.exports = {
        version: "2.6.1"
    };
    "number" == typeof __e && (__e = n)
},
12: function(e, t) {
    var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = n)
},
125: function(e, t, n) {
    n(126);
    var r = n(11).Object;
    e.exports = function(e, t, n) {
        return r.defineProperty(e, t, n)
    }
},
126: function(e, t, n) {
    var r = n(15);
    r(r.S + r.F * !n(20), "Object", {
        defineProperty: n(21).f
    })
},
15: function(e, t, n) {
    var r = n(12),
        o = n(11),
        i = n(27),
        a = n(22),
        u = n(26),
        s = function(e, t, n) {
            var c, l, f, d = e & s.F,
                h = e & s.G,
                v = e & s.S,
                p = e & s.P,
                y = e & s.B,
                g = e & s.W,
                m = h ? o : o[t] || (o[t] = {}),
                S = m.prototype,
                b = h ? r : v ? r[t] : (r[t] || {}).prototype;
            for (c in h && (n = t), n)(l = !d && b && void 0 !== b[c]) && u(m, c) || (f = l ? b[c] : n[c], m[c] = h && "function" != typeof b[c] ? n[c] : y && l ? i(f, r) : g && b[c] == f ? function(e) {
                var t = function(t, n, r) {
                    if (this instanceof e) {
                        switch (arguments.length) {
                            case 0:
                                return new e;
                            case 1:
                                return new e(t);
                            case 2:
                                return new e(t, n)
                        }
                        return new e(t, n, r)
                    }
                    return e.apply(this, arguments)
                };
                return t.prototype = e.prototype, t
            }(f) : p && "function" == typeof f ? i(Function.call, f) : f, p && ((m.virtual || (m.virtual = {}))[c] = f, e & s.R && S && !S[c] && a(S, c, f)))
        };
    s.F = 1, s.G = 2, s.S = 4, s.P = 8, s.B = 16, s.W = 32, s.U = 64, s.R = 128, e.exports = s
},
17: function(e, t) {
    e.exports = function(e) {
        return "object" == typeof e ? null !== e : "function" == typeof e
    }
},
19: function(e, t, n) {
    var r = n(17);
    e.exports = function(e) {
        if (!r(e)) throw TypeError(e + " is not an object!");
        return e
    }
},
2: function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r, o = (r = n(102)) && r.__esModule ? r : {
        default: r
    };
    t.default = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), (0, o.default)(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }()
},
20: function(e, t, n) {
    e.exports = !n(28)(function() {
        return 7 != Object.defineProperty({}, "a", {
            get: function() {
                return 7
            }
        }).a
    })
},
21: function(e, t, n) {
    var r = n(19),
        o = n(70),
        i = n(57),
        a = Object.defineProperty;
    t.f = n(20) ? Object.defineProperty : function(e, t, n) {
        if (r(e), t = i(t, !0), r(n), o) try {
            return a(e, t, n)
        } catch (e) {}
        if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
        return "value" in n && (e[t] = n.value), e
    }
},
22: function(e, t, n) {
    var r = n(21),
        o = n(36);
    e.exports = n(20) ? function(e, t, n) {
        return r.f(e, t, o(1, n))
    } : function(e, t, n) {
        return e[t] = n, e
    }
},
26: function(e, t) {
    var n = {}.hasOwnProperty;
    e.exports = function(e, t) {
        return n.call(e, t)
    }
},
27: function(e, t, n) {
    var r = n(31);
    e.exports = function(e, t, n) {
        if (r(e), void 0 === t) return e;
        switch (n) {
            case 1:
                return function(n) {
                    return e.call(t, n)
                };
            case 2:
                return function(n, r) {
                    return e.call(t, n, r)
                };
            case 3:
                return function(n, r, o) {
                    return e.call(t, n, r, o)
                }
        }
        return function() {
            return e.apply(t, arguments)
        }
    }
},
28: function(e, t) {
    e.exports = function(e) {
        try {
            return !!e()
        } catch (e) {
            return !0
        }
    }
},
31: function(e, t) {
    e.exports = function(e) {
        if ("function" != typeof e) throw TypeError(e + " is not a function!");
        return e
    }
},
36: function(e, t) {
    e.exports = function(e, t) {
        return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
        }
    }
},
40: function(e, t, n) {
    var r = n(17),
        o = n(12).document,
        i = r(o) && r(o.createElement);
    e.exports = function(e) {
        return i ? o.createElement(e) : {}
    }
},
57: function(e, t, n) {
    var r = n(17);
    e.exports = function(e, t) {
        if (!r(e)) return e;
        var n, o;
        if (t && "function" == typeof(n = e.toString) && !r(o = n.call(e))) return o;
        if ("function" == typeof(n = e.valueOf) && !r(o = n.call(e))) return o;
        if (!t && "function" == typeof(n = e.toString) && !r(o = n.call(e))) return o;
        throw TypeError("Can't convert object to primitive value")
    }
},
671: function(e, t, n) {
    "use strict";

    function r(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var o = r(n(1)),
        i = r(n(2)),
        a = function() {
            function e() {
                (0, o.default)(this, e), this.loaderActive = !1, this.readyToStart = !1, this.loaded = {
                    javascript: !1,
                    styles: !1
                }, this.cookieName = "loader_seen", this.loaderSeen = this.getLoaderSeen(), this.html = !1, this.main = !1, this.loaderEl = !1, this.interval = !1, this.animatingOut = !1, this.startLoader = this.startLoader.bind(this), this.setJsLoaded = this.setLoaded.bind(this, "javascript"), this.setStylesLoaded = this.setLoaded.bind(this, "styles")
            }
            return (0, i.default)(e, [{
                key: "checkEverythingLoaded",
                value: function() {
                    return !!(this.loaderSeen || this.readyToStart && this.loaded.javascript && this.loaded.styles) && (this.html && !this.animatingOut ? (this.animatingOut = !0, this.html.classList.remove("noScroll"), clearInterval(this.interval), this.animateOutLoader(), !0) : void 0)
                }
            }, {
                key: "animateOutLoader",
                value: function() {
                    var e = this;
                    this.loaderEl && this.loaderEl.classList.add("animateOut"), this.main && (this.main.style.opacity = "1"), setTimeout(function() {
                        e.loaderEl && e.loaderEl.remove()
                    }, 950)
                }
            }, {
                key: "startLoader",
                value: function() {
                    var e = this;
                    if (!this.loaderActive) {
                        this.loaderActive = !0, this.initServiceWorker();
                        var t = navigator.userAgent.toLowerCase(),
                            n = this.safariVersion(t);
                        (t.indexOf("firefox") > -1 || t.indexOf("msie ") > -1 || t.indexOf("trident/") > -1 || t.indexOf("edge") > -1 || n && n[0] <= 11) && this.loadAditionalStyling(), this.html = document.querySelector("html"), this.main = document.querySelector("#main"), this.loaderEl = document.querySelector(".bia_preloader");
                        var r = document.querySelectorAll(".bia_text");
                        this.html.classList.add("noScroll");
                        var o = ["Job is painting the walls", "Ready for serious fun?", "Preparing easter eggs", "Getting some coffee", "Let's Barock & Roll"];
                        o.sort(function() {
                            return .5 - Math.random()
                        }), r.forEach(function(e, t) {
                            return e.innerText = o[t]
                        });
                        var i = r.length,
                            a = 1;
                        this.loaderSeen || setTimeout(function() {
                            r[0] && r[0].classList.add("toggle"), e.interval = setInterval(function() {
                                r[a % i].classList.add("toggle");
                                var e = (a - 2) % i;
                                e >= 0 && r[e].classList.remove("toggle"), a++
                            }, 1850)
                        }, 500), setTimeout(function() {
                            e.readyToStart = !0, e.checkEverythingLoaded()
                        }, this.loaderSeen ? 500 : 2400)
                    }
                }
            }, {
                key: "setLoaded",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "javascript";
                    this.loaded[e] || (this.loaded[e] = !0, this.checkEverythingLoaded())
                }
            }, {
                key: "getLoaderSeen",
                value: function() {
                    for (var e = this.cookieName + "=", t = decodeURIComponent(document.cookie).split(";"), n = "", r = 0; r < t.length; r++) {
                        for (var o = t[r];
                            " " == o.charAt(0);) o = o.substring(1);
                        if (0 == o.indexOf(e)) {
                            n = o.substring(e.length, o.length);
                            break
                        }
                    }
                    return "true" === n
                }
            }, {
                key: "safariVersion",
                value: function(e) {
                    if (e.indexOf("safari") > -1) return [parseInt(e.substr(e.indexOf("version/") + "version/".length).substr(0, 2))];
                    if (/iP(hone|od|ad)/.test(navigator.platform)) {
                        var t = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                        return [parseInt(t[1], 10), parseInt(t[2], 10), parseInt(t[3] || 0, 10)]
                    }
                    return !1
                }
            }, {
                key: "loadAditionalStyling",
                value: function() {
                    var e = document.createElement("link");
                    e.href = window.BIA_STYLE_URL, e.type = "text/css", e.rel = "stylesheet", e.media = "screen,print", e.addEventListener("load", this.setStylesLoaded, !0), document.querySelector("head").appendChild(e)
                }
            }, {
                key: "initServiceWorker",
                value: function() {
                    if (!("serviceWorker" in navigator)) return !1;
                    var e = window.BIA_STATIC_ASSET_URL + "/serviceWorker.js";
                    e += "?js=" + encodeURIComponent(window.BIA_SRC_FILES.js), e += "&css=" + encodeURIComponent(window.BIA_SRC_FILES.css), navigator.serviceWorker.register(e).then(function(e) {
                        console.log("ServiceWorker registration successful with scope: ", e.scope)
                    }, function(e) {
                        console.log("ServiceWorker registration failed: ", e)
                    }).catch(function(e) {
                        console.log(e)
                    })
                }
            }]), e
        }();
    window.BIA_LOADER = new a;
    var u = document.querySelector(".bia_styleLoader");
    u && u.addEventListener("load", window.BIA_LOADER.setStylesLoaded), document.addEventListener("DOMContentLoaded", window.BIA_LOADER.startLoader, !0)
},
70: function(e, t, n) {
    e.exports = !n(20) && !n(28)(function() {
        return 7 != Object.defineProperty(n(40)("div"), "a", {
            get: function() {
                return 7
            }
        }).a
    })
}
})
