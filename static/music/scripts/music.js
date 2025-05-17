function get_browser_info() {
    var t, e = navigator.userAgent,
        i = e.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    return /trident/i.test(i[1]) ? (t = /\brv[ :]+(\d+)/g.exec(e) || [], {
        name: "IE",
        version: t[1] || ""
    }) : "Chrome" === i[1] && null != (t = e.match(/\bOPR\/(\d+)/)) ? {
        name: "Opera",
        version: t[1]
    } : (i = i[2] ? [i[1], i[2]] : [navigator.appName, navigator.appVersion, "-?"], null != (t = e.match(/version\/(\d+)/i)) && i.splice(1, 1, t[1]), {
        name: i[0],
        version: i[1]
    })
}

function positionPoster() {
    if (xPos = getRandomInt(50, contentWidth - posterWidth - 50), yPos = getRandomInt(50, contentHeight - posterHeight - 50), xPos > (contentWidth - vpW) / 2 - posterWidth - 50 && xPos < (contentWidth + vpW) / 2 && yPos > (contentHeight - vpH) / 2 - posterHeight - 50 && yPos < (contentHeight + vpH) / 2) return void positionPoster();
    if (start) posterPos[posterCount] = new Array, posterPos[0][0] = xPos, posterPos[0][1] = yPos, start = !1;
    else {
        for (var t in posterPos)
            if (Math.abs(xPos - posterPos[t][0]) < posterWidth / 1.3 && throttle < 1e3) return throttle++, void positionPoster();
        throttle = 0, posterCount++, posterPos[posterCount] = new Array, posterPos[posterCount][0] = xPos, posterPos[posterCount][1] = yPos
    }
}

function tooltipDragCursor(t) {
    return classie.add(tooltipPlay, "hide"), classie.add(tooltipSeek, "hide"), !1
}

function tooltipPlayCursor(t) {
    return classie.remove(tooltipPlay, "hide"), tooltipPlay.style.top = t.pageY + 70 + "px", tooltipPlay.style.left = t.pageX - 45 + "px", !1
}

function seekPosition(t) {
    return seekPositionValue = t.pageX / vpW, classie.remove(tooltipSeek, "hide"), tooltipSeek.style.top = t.pageY + 70 + "px", tooltipSeek.style.left = t.pageX - 30 + "px", tooltipSeek.innerHTML = Math.round(seekPositionValue * (thisSongDuration / 60 || 0)) + " min", !1
}

function goToPosition(t) {
    return classie.add(progressBarValue, "seek"), seekPositionValue = t.pageX / vpW, player.audio.currentTime = seekPositionValue * (thisSongDuration || 0), setTimeout(function() {
        classie.remove(progressBarValue, "seek")
    }, 1e3), !1
}

function draggablePoster() {
    dragPoster = Draggable.create(".blok-poster", {
        bounds: {
            top: boundTop,
            left: boundLeft,
            width: boundWidth,
            height: boundHeight
        },
        edgeResistance: .65,
        type: "x,y",
        throwProps: !0,
        onDrag: function(t) {
            classie.add(this.target, "dragging")
        },
        onDragEnd: function() {
            classie.remove(this.target, "dragging")
        },
        onClick: function(t) {
            var e = this.target;
            if (player.playing) pausePlayer();
            else {
                var i = document.querySelector(".blok-poster.play");
                if (e == i) return !1;
                if (i) {
                    setTimeout(function() {
                        i.style.height = posterHeight + "px", i.style.top = parseInt(i.style.top, 10) - newTopValuePoster + "px"
                    }, 280);
                    for (var n = 0, r = allPosters.length; n < r; n++) classie.remove(allPosters[n], "play")
                } else
                    for (var n = 0, r = allPosters.length; n < r; n++) classie.remove(allPosters[n], "play")
            }
            tooltipPlayState && (classie.add(tooltipPlay, "hide"), tooltipPlayState = !1, setTimeout(function() {
                tooltipPlay.style.display = "none"
            }, 200)), thisSong = e.getAttribute("data-soundcloud"), player.resolve(thisSong, render), classie.add(e, "play"), setTimeout(function() {
                e.style.height = posterWidth + "px", e.style.top = parseInt(e.style.top, 10) + newTopValuePoster + "px"
            }, 300)
        },
        onPress: function(t) {
            t.stopPropagation()
        }
    })
}

function draggableContainer(t, e) {
    Draggable.create("#container", {
        type: t,
        edgeResistance: e,
        throwProps: !0,
        onClick: function(t) {
            if (player.playing) pausePlayer();
            else {
                var e = document.querySelector(".blok-poster.play");
                e && classie.remove(e, "play"), classie.remove(progressBar, "is-visible"), document.title = originalDocumentTitle, clearInterval(checkIfPlayingTimer), setTimeout(function() {
                    e.style.height = posterHeight + "px", e.style.top = parseInt(e.style.top, 10) - newTopValuePoster + "px"
                }, 280)
            }
        }
    })
}

function checkIfPlaying() {
    checkIfPlayingTimer = setInterval(function() {
        player.audio.currentTime >= .2 && (classie.remove(document.querySelector(".play .music--loading"), "is-visible"), TweenLite.to(rotateDisc[rotateDiscIndex], 1, {
            timeScale: 1
        }), rotateDisc[rotateDiscIndex].play(), clearInterval(checkIfPlayingTimer))
    }, 50)
}

function pausePlayer(t) {
    var e = document.querySelector(".blok-poster.play"),
        i = document.querySelector(".show-pause-btn");
    clearInterval(checkIfPlayingTimer), t && player.stop(), i && classie.remove(i, "show-pause-btn"), classie.remove(progressBar, "is-visible"), TweenLite.to(rotateDisc, 1.2, {
        timeScale: 0
    }), setTimeout(function() {
        classie.remove(e, "play"), setTimeout(function() {
            e.style.height = posterHeight + "px", e.style.top = parseInt(e.style.top, 10) - newTopValuePoster + "px"
        }, 280)
    }, 1e3), player.pause(), clearInterval(progressBarInterval), progressBarValue.style.width = "0%", document.title = originalDocumentTitle
}

function getTransform(t) {
    var e = window.getComputedStyle(t, null).getPropertyValue(transformPropPrefix),
        i = e.match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}.+))(?:, (-{0,1}.+))\))/);
    return i ? "3d" == i[1] ? i.slice(2, 5) : (i.push(0), i.slice(5, 8)) : [0, 0, 0]
}

function getRandomInt(t, e) {
    return Math.floor(Math.random() * (e - t + 1)) + t
}

function positionGIFs() {
    var t = Math.floor(Math.random() * aniCellAmount);
    if (aniCount != allAnimations.length) {
        if (!aniCells[t][2]) {
            var e = aniCells[t][0] + contentWidth / aniCellRows / 3 - Math.random() * (contentWidth / aniCellRows / 1.5),
                i = aniCells[t][1] + contentWidth / aniCellRows / 3 - Math.random() * (contentWidth / aniCellRows / 1.5);
            if (e > (contentWidth - vpW) / 2 && e < (contentWidth + vpW) / 2 && i > (contentHeight - vpH) / 2 && i < (contentHeight + vpH) / 2) return void positionGIFs();
            allAnimations[aniCount].style.left = e + "px", allAnimations[aniCount].style.top = i + "px", aniCells[t][2] = !0, aniCount++
        }
        positionGIFs()
    }
}

function getActualDay(t, e) {
    var i = new Date;
    i.setYear(parseInt("20" + t.toString().substr(0, 2))), i.setDate(parseInt(t.toString().substr(4, 2))), i.setMonth(parseInt(t.toString().substr(2, 2) - 1));
    var n = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"][i.getDay()];
    return e && (n = n.substr(0, 2)), n
}

function insertGifs() {
    for (var t = ["300", "320", "400", "176", "400"], e = ["405", "250", "267", "300", "250"], i = 0; i < 5; i++) content.insertAdjacentHTML("afterBegin", '<div class="gif-items" style="background-image: url(' + rootUrl + i + ".gif); width:" + t[i] + "px; height:" + e[i] + 'px;"></div>');
    allAnimations = document.querySelectorAll(".gif-items")
}

function resetProgress() {
    loadedImageCount = 0
}

function updateProgress(t) {
    preloadPercentage = t / imageCount * 100 - 100, TweenLite.to(preloaderBar, .5, {
        y: preloadPercentage + "%"
    })
}

function onProgress(t, e) {
    loadedImageCount++, updateProgress(loadedImageCount)
}

function onAlways() {
    (new Blazy).load(document.querySelectorAll(".b-lazy"), !0);
    var t = getRandomInt(1, 2);
    classie.remove(documentBody, "loading"), setTimeout(function() {
        classie.add(preloader, "hide"), classie.add(documentBody, "lucky-" + t), setTimeout(function() {
            preloader.remove(), vpW > 640 && (insertGifs(), positionGIFs())
        }, 1500)
    }, 500)
}! function() {
    "use strict";

    function t(e, n) {
        var r;
        if (n = n || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = n.touchBoundary || 10, this.layer = e, this.tapDelay = n.tapDelay || 200, this.tapTimeout = n.tapTimeout || 700, !t.notNeeded(e)) {
            for (var s = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], o = this, a = 0, l = s.length; a < l; a++) o[s[a]] = function(t, e) {
                return function() {
                    return t.apply(e, arguments)
                }
            }(o[s[a]], o);
            i && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function(t, i, n) {
                var r = Node.prototype.removeEventListener;
                "click" === t ? r.call(e, t, i.hijacked || i, n) : r.call(e, t, i, n)
            }, e.addEventListener = function(t, i, n) {
                var r = Node.prototype.addEventListener;
                "click" === t ? r.call(e, t, i.hijacked || (i.hijacked = function(t) {
                    t.propagationStopped || i(t)
                }), n) : r.call(e, t, i, n)
            }), "function" == typeof e.onclick && (r = e.onclick, e.addEventListener("click", function(t) {
                r(t)
            }, !1), e.onclick = null)
        }
    }
    var e = navigator.userAgent.indexOf("Windows Phone") >= 0,
        i = navigator.userAgent.indexOf("Android") > 0 && !e,
        n = /iP(ad|hone|od)/.test(navigator.userAgent) && !e,
        r = n && /OS 4_\d(_\d)?/.test(navigator.userAgent),
        s = n && /OS [6-7]_\d/.test(navigator.userAgent),
        o = navigator.userAgent.indexOf("BB10") > 0;
    t.prototype.needsClick = function(t) {
        switch (t.nodeName.toLowerCase()) {
            case "button":
            case "select":
            case "textarea":
                if (t.disabled) return !0;
                break;
            case "input":
                if (n && "file" === t.type || t.disabled) return !0;
                break;
            case "label":
            case "iframe":
            case "video":
                return !0
        }
        return /\bneedsclick\b/.test(t.className)
    }, t.prototype.needsFocus = function(t) {
        switch (t.nodeName.toLowerCase()) {
            case "textarea":
                return !0;
            case "select":
                return !i;
            case "input":
                switch (t.type) {
                    case "button":
                    case "checkbox":
                    case "file":
                    case "image":
                    case "radio":
                    case "submit":
                        return !1
                }
                return !t.disabled && !t.readOnly;
            default:
                return /\bneedsfocus\b/.test(t.className)
        }
    }, t.prototype.sendClick = function(t, e) {
        var i, n;
        document.activeElement && document.activeElement !== t && document.activeElement.blur(), n = e.changedTouches[0], i = document.createEvent("MouseEvents"), i.initMouseEvent(this.determineEventType(t), !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), i.forwardedTouchEvent = !0, t.dispatchEvent(i)
    }, t.prototype.determineEventType = function(t) {
        return i && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
    }, t.prototype.focus = function(t) {
        var e;
        n && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
    }, t.prototype.updateScrollParent = function(t) {
        var e, i;
        if (!(e = t.fastClickScrollParent) || !e.contains(t)) {
            i = t;
            do {
                if (i.scrollHeight > i.offsetHeight) {
                    e = i, t.fastClickScrollParent = i;
                    break
                }
                i = i.parentElement
            } while (i)
        }
        e && (e.fastClickLastScrollTop = e.scrollTop)
    }, t.prototype.getTargetElementFromEventTarget = function(t) {
        return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
    }, t.prototype.onTouchStart = function(t) {
        var e, i, s;
        if (t.targetTouches.length > 1) return !0;
        if (e = this.getTargetElementFromEventTarget(t.target), i = t.targetTouches[0], n) {
            if (s = window.getSelection(), s.rangeCount && !s.isCollapsed) return !0;
            if (!r) {
                if (i.identifier && i.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
                this.lastTouchIdentifier = i.identifier, this.updateScrollParent(e)
            }
        }
        return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = i.pageX, this.touchStartY = i.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
    }, t.prototype.touchHasMoved = function(t) {
        var e = t.changedTouches[0],
            i = this.touchBoundary;
        return Math.abs(e.pageX - this.touchStartX) > i || Math.abs(e.pageY - this.touchStartY) > i
    }, t.prototype.onTouchMove = function(t) {
        return !this.trackingClick || ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0)
    }, t.prototype.findControl = function(t) {
        return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }, t.prototype.onTouchEnd = function(t) {
        var e, o, a, l, h, c = this.targetElement;
        if (!this.trackingClick) return !0;
        if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
        if (t.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
        if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, o = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, s && (h = t.changedTouches[0], c = document.elementFromPoint(h.pageX - window.pageXOffset, h.pageY - window.pageYOffset) || c, c.fastClickScrollParent = this.targetElement.fastClickScrollParent), "label" === (a = c.tagName.toLowerCase())) {
            if (e = this.findControl(c)) {
                if (this.focus(c), i) return !1;
                c = e
            }
        } else if (this.needsFocus(c)) return t.timeStamp - o > 100 || n && window.top !== window && "input" === a ? (this.targetElement = null, !1) : (this.focus(c), this.sendClick(c, t), n && "select" === a || (this.targetElement = null, t.preventDefault()), !1);
        return !(!n || r || !(l = c.fastClickScrollParent) || l.fastClickLastScrollTop === l.scrollTop) || (this.needsClick(c) || (t.preventDefault(), this.sendClick(c, t)), !1)
    }, t.prototype.onTouchCancel = function() {
        this.trackingClick = !1, this.targetElement = null
    }, t.prototype.onMouse = function(t) {
        return !this.targetElement || (!!t.forwardedTouchEvent || (!t.cancelable || (!(!this.needsClick(this.targetElement) || this.cancelNextClick) || (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1))))
    }, t.prototype.onClick = function(t) {
        var e;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail || (e = this.onMouse(t), e || (this.targetElement = null), e)
    }, t.prototype.destroy = function() {
        var t = this.layer;
        i && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }, t.notNeeded = function(t) {
        var e, n, r;
        if (void 0 === window.ontouchstart) return !0;
        if (n = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
            if (!i) return !0;
            if (e = document.querySelector("meta[name=viewport]")) {
                if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
                if (n > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
            }
        }
        if (o && (r = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), r[1] >= 10 && r[2] >= 3 && (e = document.querySelector("meta[name=viewport]")))) {
            if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
            if (document.documentElement.scrollWidth <= window.outerWidth) return !0
        }
        return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction || (!!(+(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1] >= 27 && (e = document.querySelector("meta[name=viewport]")) && (-1 !== e.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) || ("none" === t.style.touchAction || "manipulation" === t.style.touchAction))
    }, t.attach = function(e, i) {
        return new t(e, i)
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
        return t
    }) : "undefined" != typeof module && module.exports ? (module.exports = t.attach, module.exports.FastClick = t) : window.FastClick = t
}(),
function(t, e) {
    "function" == typeof define && define.amd ? define(e) : "object" == typeof exports ? module.exports = e() : t.Blazy = e()
}(this, function() {
    function t(t) {
        var i = t._util;
        i.elements = r(t.options.selector), i.count = i.elements.length, i.destroyed && (i.destroyed = !1, t.options.container && l(t.options.container, function(t) {
            o(t, "scroll", i.validateT)
        }), o(window, "resize", i.saveViewportOffsetT), o(window, "resize", i.validateT), o(window, "scroll", i.validateT)), e(t)
    }

    function e(t) {
        for (var e = t._util, i = 0; i < e.count; i++) {
            var r = e.elements[i],
                s = r.getBoundingClientRect();
            (s.right >= u.left && s.bottom >= u.top && s.left <= u.right && s.top <= u.bottom || n(r, t.options.successClass)) && (t.load(r), e.elements.splice(i, 1), e.count--, i--)
        }
        0 === e.count && t.destroy()
    }

    function i(t, e, i) {
        if (!n(t, i.successClass) && (e || i.loadInvisible || 0 < t.offsetWidth && 0 < t.offsetHeight))
            if (e = t.getAttribute(c) || t.getAttribute(i.src)) {
                e = e.split(i.separator);
                var r = e[p && 1 < e.length ? 1 : 0],
                    s = "img" === t.nodeName.toLowerCase();
                l(i.breakpoints, function(e) {
                    t.removeAttribute(e.src)
                }), t.removeAttribute(i.src), s || void 0 === t.src ? (e = new Image, e.onerror = function() {
                    i.error && i.error(t, "invalid"), t.className = t.className + " " + i.errorClass
                }, e.onload = function() {
                    s ? t.src = r : t.style.backgroundImage = 'url("' + r + '")', t.className = t.className + " " + i.successClass, i.success && i.success(t)
                }, e.src = r) : (t.src = r, t.className = t.className + " " + i.successClass)
            } else i.error && i.error(t, "missing"), n(t, i.errorClass) || (t.className = t.className + " " + i.errorClass)
    }

    function n(t, e) {
        return -1 !== (" " + t.className + " ").indexOf(" " + e + " ")
    }

    function r(t) {
        var e = [];
        t = document.querySelectorAll(t);
        for (var i = t.length; i--; e.unshift(t[i]));
        return e
    }

    function s(t) {
        u.bottom = (window.innerHeight || document.documentElement.clientHeight) + t, u.right = (window.innerWidth || document.documentElement.clientWidth) + t
    }

    function o(t, e, i) {
        t.attachEvent ? t.attachEvent && t.attachEvent("on" + e, i) : t.addEventListener(e, i, !1)
    }

    function a(t, e, i) {
        t.detachEvent ? t.detachEvent && t.detachEvent("on" + e, i) : t.removeEventListener(e, i, !1)
    }

    function l(t, e) {
        if (t && e)
            for (var i = t.length, n = 0; n < i && !1 !== e(t[n], n); n++);
    }

    function h(t, e, i) {
        var n = 0;
        return function() {
            var r = +new Date;
            r - n < e || (n = r, t.apply(i, arguments))
        }
    }
    var c, u, p;
    return function(n) {
        if (!document.querySelectorAll) {
            var r = document.createStyleSheet();
            document.querySelectorAll = function(t, e, i, n, s) {
                for (s = document.all, e = [], t = t.replace(/\[for\b/gi, "[htmlFor").split(","), i = t.length; i--;) {
                    for (r.addRule(t[i], "k:v"), n = s.length; n--;) s[n].currentStyle.k && e.push(s[n]);
                    r.removeRule(0)
                }
                return e
            }
        }
        var o = this,
            f = o._util = {};
        f.elements = [], f.destroyed = !0, o.options = n || {}, o.options.error = o.options.error || !1, o.options.offset = o.options.offset || 100, o.options.success = o.options.success || !1, o.options.selector = o.options.selector || ".b-lazy", o.options.separator = o.options.separator || "|", o.options.container = !!o.options.container && document.querySelectorAll(o.options.container), o.options.errorClass = o.options.errorClass || "b-error", o.options.breakpoints = o.options.breakpoints || !1, o.options.loadInvisible = o.options.loadInvisible || !1, o.options.successClass = o.options.successClass || "b-loaded", o.options.validateDelay = o.options.validateDelay || 25, o.options.saveViewportOffsetDelay = o.options.saveViewportOffsetDelay || 50, o.options.src = c = o.options.src || "data-src", p = 1 < window.devicePixelRatio, u = {}, u.top = 0 - o.options.offset, u.left = 0 - o.options.offset, o.revalidate = function() {
            t(this)
        }, o.load = function(t, e) {
            var n = this.options;
            void 0 === t.length ? i(t, e, n) : l(t, function(t) {
                i(t, e, n)
            })
        }, o.destroy = function() {
            var t = this._util;
            this.options.container && l(this.options.container, function(e) {
                a(e, "scroll", t.validateT)
            }), a(window, "scroll", t.validateT), a(window, "resize", t.validateT), a(window, "resize", t.saveViewportOffsetT), t.count = 0, t.elements.length = 0, t.destroyed = !0
        }, f.validateT = h(function() {
            e(o)
        }, o.options.validateDelay, o), f.saveViewportOffsetT = h(function() {
            s(o.options.offset)
        }, o.options.saveViewportOffsetDelay, o), s(o.options.offset), l(o.options.breakpoints, function(t) {
            if (t.width >= window.screen.width) return c = t.src, !1
        }), t(o)
    }
}), Function.prototype.debounce = function(t, e) {
    var i = this,
        n = null,
        r = t;
    return function() {
        function t() {
            i.apply(s, o), n = null
        }
        var s = e || this,
            o = arguments;
        n && clearTimeout(n), n = setTimeout(t, r)
    }
}, Function.prototype.throttle = function(t, e) {
    var i = this,
        n = null,
        r = t;
    return function() {
        var t = e || this,
            s = arguments,
            o = Date.now();
        (!n || o - n >= r) && (n = o, i.apply(t, s))
    }
};
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("utils.Draggable", ["events.EventDispatcher", "TweenLite", "plugins.CSSPlugin"], function(t, e, i) {
            var n, r, s, o, a, l, h, c, u, p = {
                    css: {}
                },
                f = {
                    css: {}
                },
                d = {
                    css: {}
                },
                m = {
                    css: {}
                },
                _ = _gsScope._gsDefine.globals,
                g = {},
                v = {
                    style: {}
                },
                y = _gsScope.document || {
                    createElement: function() {
                        return v
                    }
                },
                x = y.documentElement || {},
                w = function(t) {
                    return y.createElementNS ? y.createElementNS("http://www.w3.org/1999/xhtml", t) : y.createElement(t)
                },
                T = w("div"),
                b = [],
                P = function() {
                    return !1
                },
                k = 180 / Math.PI,
                S = 999999999999999,
                C = Date.now || function() {
                    return (new Date).getTime()
                },
                O = !(y.addEventListener || !y.all),
                E = y.createElement("div"),
                A = [],
                R = {},
                D = 0,
                M = /^(?:a|input|textarea|button|select)$/i,
                L = 0,
                I = _gsScope.navigator && -1 !== _gsScope.navigator.userAgent.toLowerCase().indexOf("android"),
                N = 0,
                B = {},
                X = {},
                F = function(t) {
                    if ("string" == typeof t && (t = e.selector(t)), !t || t.nodeType) return [t];
                    var i, n = [],
                        r = t.length;
                    for (i = 0; i !== r; n.push(t[i++]));
                    return n
                },
                W = function(t, e) {
                    var i, n = {};
                    if (e)
                        for (i in t) n[i] = t[i] * e;
                    else
                        for (i in t) n[i] = t[i];
                    return n
                },
                Y = function() {
                    for (var t = A.length; --t > -1;) A[t]()
                },
                z = function(t) {
                    A.push(t), 1 === A.length && e.ticker.addEventListener("tick", Y, this, !1, 1)
                },
                H = function(t) {
                    for (var i = A.length; --i > -1;) A[i] === t && A.splice(i, 1);
                    e.to(V, 0, {
                        overwrite: "all",
                        delay: 15,
                        onComplete: V
                    })
                },
                V = function() {
                    A.length || e.ticker.removeEventListener("tick", Y)
                },
                j = function(t, e) {
                    var i;
                    for (i in e) void 0 === t[i] && (t[i] = e[i]);
                    return t
                },
                q = function() {
                    return null != window.pageYOffset ? window.pageYOffset : null != y.scrollTop ? y.scrollTop : x.scrollTop || y.body.scrollTop || 0
                },
                G = function() {
                    return null != window.pageXOffset ? window.pageXOffset : null != y.scrollLeft ? y.scrollLeft : x.scrollLeft || y.body.scrollLeft || 0
                },
                U = function(t, e) {
                    It(t, "scroll", e), $(t.parentNode) || U(t.parentNode, e)
                },
                Z = function(t, e) {
                    Nt(t, "scroll", e), $(t.parentNode) || Z(t.parentNode, e)
                },
                $ = function(t) {
                    return !(t && t !== x && t !== y && t !== y.body && t !== window && t.nodeType && t.parentNode)
                },
                Q = function(t, e) {
                    var i = "x" === e ? "Width" : "Height",
                        n = "scroll" + i,
                        r = "client" + i,
                        s = y.body;
                    return Math.max(0, $(t) ? Math.max(x[n], s[n]) - (window["inner" + i] || x[r] || s[r]) : t[n] - t[r])
                },
                K = function(t) {
                    var e = $(t),
                        i = Q(t, "x"),
                        n = Q(t, "y");
                    e ? t = X : K(t.parentNode), t._gsMaxScrollX = i, t._gsMaxScrollY = n, t._gsScrollX = t.scrollLeft || 0, t._gsScrollY = t.scrollTop || 0
                },
                J = function(t, e) {
                    return t = t || window.event, g.pageX = t.clientX + y.body.scrollLeft + x.scrollLeft, g.pageY = t.clientY + y.body.scrollTop + x.scrollTop, e && (t.returnValue = !1), g
                },
                tt = function(t) {
                    return t ? ("string" == typeof t && (t = e.selector(t)), t.length && t !== window && t[0] && t[0].style && !t.nodeType && (t = t[0]), t === window || t.nodeType && t.style ? t : null) : t
                },
                et = function(t, e) {
                    var i, r, s, o = t.style;
                    if (void 0 === o[e]) {
                        for (s = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5, i = e.charAt(0).toUpperCase() + e.substr(1); --r > -1 && void 0 === o[s[r] + i];);
                        if (0 > r) return "";
                        n = 3 === r ? "ms" : s[r], e = n + i
                    }
                    return e
                },
                it = function(t, e, i) {
                    var n = t.style;
                    n && (void 0 === n[e] && (e = et(t, e)), null == i ? n.removeProperty ? n.removeProperty(e.replace(/([A-Z])/g, "-$1").toLowerCase()) : n.removeAttribute(e) : void 0 !== n[e] && (n[e] = i))
                },
                nt = y.defaultView ? y.defaultView.getComputedStyle : P,
                rt = /(?:Left|Right|Width)/i,
                st = /(?:\d|\-|\+|=|#|\.)*/g,
                ot = function(t, e, i, n, r) {
                    if ("px" === n || !n) return i;
                    if ("auto" === n || !i) return 0;
                    var s, o = rt.test(e),
                        a = t,
                        l = T.style,
                        h = 0 > i;
                    return h && (i = -i), "%" === n && -1 !== e.indexOf("border") ? s = i / 100 * (o ? t.clientWidth : t.clientHeight) : (l.cssText = "border:0 solid red;position:" + lt(t, "position", !0) + ";line-height:0;", "%" !== n && a.appendChild ? l[o ? "borderLeftWidth" : "borderTopWidth"] = i + n : (a = t.parentNode || y.body, l[o ? "width" : "height"] = i + n), a.appendChild(T), s = parseFloat(T[o ? "offsetWidth" : "offsetHeight"]), a.removeChild(T), 0 !== s || r || (s = ot(t, e, i, n, !0))), h ? -s : s
                },
                at = function(t, e) {
                    if ("absolute" !== lt(t, "position", !0)) return 0;
                    var i = "left" === e ? "Left" : "Top",
                        n = lt(t, "margin" + i, !0);
                    return t["offset" + i] - (ot(t, e, parseFloat(n), (n + "").replace(st, "")) || 0)
                },
                lt = function(t, e, i) {
                    var n, r = (t._gsTransform || {})[e];
                    return r || 0 === r ? r : (t.style[e] ? r = t.style[e] : (n = nt(t)) ? (r = n.getPropertyValue(e.replace(/([A-Z])/g, "-$1").toLowerCase()), r = r || n.length ? r : n[e]) : t.currentStyle && (r = t.currentStyle[e]), "auto" !== r || "top" !== e && "left" !== e || (r = at(t, e)), i ? r : parseFloat(r) || 0)
                },
                ht = function(t, e, i) {
                    var n = t.vars,
                        r = n[i],
                        s = t._listeners[e];
                    "function" == typeof r && r.apply(n[i + "Scope"] || n.callbackScope || t, n[i + "Params"] || [t.pointerEvent]), s && t.dispatchEvent(e)
                },
                ct = function(t, e) {
                    var i, n, r, s = tt(t);
                    return s ? At(s, e) : void 0 !== t.left ? (r = Pt(e), {
                        left: t.left - r.x,
                        top: t.top - r.y,
                        width: t.width,
                        height: t.height
                    }) : (n = t.min || t.minX || t.minRotation || 0, i = t.min || t.minY || 0, {
                        left: n,
                        top: i,
                        width: (t.max || t.maxX || t.maxRotation || 0) - n,
                        height: (t.max || t.maxY || 0) - i
                    })
                },
                ut = function() {
                    if (!y.createElementNS) return o = 0, void(a = !1);
                    var t, e, i, n, r = w("div"),
                        s = y.createElementNS("http://www.w3.org/2000/svg", "svg"),
                        u = w("div"),
                        p = r.style,
                        f = y.body || x,
                        d = "flex" === lt(f, "display", !0);
                    y.body && dt && (p.position = "absolute", f.appendChild(u), u.appendChild(r), n = r.offsetParent, u.style[dt] = "rotate(1deg)", c = r.offsetParent === n, u.style.position = "absolute", p.height = "10px", n = r.offsetTop, u.style.border = "5px solid red", h = n !== r.offsetTop, f.removeChild(u)), p = s.style, s.setAttributeNS(null, "width", "400px"), s.setAttributeNS(null, "height", "400px"), s.setAttributeNS(null, "viewBox", "0 0 400 400"), p.display = "block", p.boxSizing = "border-box", p.border = "0px solid red", p.transform = "none", r.style.cssText = "width:100px;height:100px;overflow:scroll;-ms-overflow-style:none;", f.appendChild(r), r.appendChild(s), i = s.createSVGPoint().matrixTransform(s.getScreenCTM()), e = i.y, r.scrollTop = 100, i.x = i.y = 0, i = i.matrixTransform(s.getScreenCTM()), l = e - i.y < 100.1 ? 0 : e - i.y - 150, r.removeChild(s), f.removeChild(r), f.appendChild(s), d && (f.style.display = "block"), t = s.getScreenCTM(), e = t.e, p.border = "50px solid red", t = s.getScreenCTM(), 0 === e && 0 === t.e && 0 === t.f && 1 === t.a ? (o = 1, a = !0) : (o = e !== t.e ? 1 : 0, a = 1 !== t.a), d && (f.style.display = "flex"), f.removeChild(s)
                },
                pt = "" !== et(T, "perspective"),
                ft = et(T, "transformOrigin").replace(/^ms/g, "Ms").replace(/([A-Z])/g, "-$1").toLowerCase(),
                dt = et(T, "transform"),
                mt = dt.replace(/^ms/g, "Ms").replace(/([A-Z])/g, "-$1").toLowerCase(),
                _t = {},
                gt = {},
                vt = _gsScope.SVGElement,
                yt = function(t) {
                    return !!(vt && "function" == typeof t.getBBox && t.getCTM && (!t.parentNode || t.parentNode.getBBox && t.parentNode.getCTM))
                },
                xt = (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(navigator.userAgent)) && parseFloat(RegExp.$1) < 11,
                wt = [],
                Tt = [],
                bt = function(t) {
                    if (!t.getBoundingClientRect || !t.parentNode || !dt) return {
                        offsetTop: 0,
                        offsetLeft: 0,
                        scaleX: 1,
                        scaleY: 1,
                        offsetParent: x
                    };
                    if (!1 !== jt.cacheSVGData && t._dCache && t._dCache.lastUpdate === e.ticker.frame) return t._dCache;
                    var i, n, r, s, h, c, u, p, f, d, m, _, g = t,
                        v = kt(t);
                    if (v.lastUpdate = e.ticker.frame, t.getBBox && !v.isSVGRoot) {
                        for (g = t.parentNode, i = t.getBBox(); g && "svg" !== (g.nodeName + "").toLowerCase();) g = g.parentNode;
                        return s = bt(g), v.offsetTop = i.y * s.scaleY, v.offsetLeft = i.x * s.scaleX, v.scaleX = s.scaleX, v.scaleY = s.scaleY, v.offsetParent = g || x, v
                    }
                    for (r = v.offsetParent, r === y.body && (r = x), Tt.length = wt.length = 0; g && (h = lt(g, dt, !0), "matrix(1, 0, 0, 1, 0, 0)" !== h && "none" !== h && "translate3d(0px, 0px, 0px)" !== h && (Tt.push(g), wt.push(g.style[dt]), g.style[dt] = "none"), g !== r);) g = g.parentNode;
                    for (n = r.getBoundingClientRect(), h = t.getScreenCTM(), p = t.createSVGPoint(), u = p.matrixTransform(h), p.x = p.y = 10, p = p.matrixTransform(h), v.scaleX = (p.x - u.x) / 10, v.scaleY = (p.y - u.y) / 10, void 0 === o && ut(), v.borderBox && !a && t.getAttribute("width") && (s = nt(t) || {}, f = parseFloat(s.borderLeftWidth) + parseFloat(s.borderRightWidth) || 0, d = parseFloat(s.borderTopWidth) + parseFloat(s.borderBottomWidth) || 0, m = parseFloat(s.width) || 0, _ = parseFloat(s.height) || 0, v.scaleX *= (m - f) / m, v.scaleY *= (_ - d) / _), l ? (i = t.getBoundingClientRect(), v.offsetLeft = i.left - n.left, v.offsetTop = i.top - n.top) : (v.offsetLeft = u.x - n.left, v.offsetTop = u.y - n.top), v.offsetParent = r, c = Tt.length; --c > -1;) Tt[c].style[dt] = wt[c];
                    return v
                },
                Pt = function(t, i) {
                    if (i = i || {}, !t || t === x || !t.parentNode || t === window) return {
                        x: 0,
                        y: 0
                    };
                    var n = nt(t),
                        r = ft && n ? n.getPropertyValue(ft) : "50% 50%",
                        s = r.split(" "),
                        o = -1 !== r.indexOf("left") ? "0%" : -1 !== r.indexOf("right") ? "100%" : s[0],
                        a = -1 !== r.indexOf("top") ? "0%" : -1 !== r.indexOf("bottom") ? "100%" : s[1];
                    return ("center" === a || null == a) && (a = "50%"), ("center" === o || isNaN(parseFloat(o))) && (o = "50%"), t.getBBox && yt(t) ? (t._gsTransform || (e.set(t, {
                        x: "+=0",
                        overwrite: !1
                    }), void 0 === t._gsTransform.xOrigin && console.log("Draggable requires at least GSAP 1.17.0")), r = t.getBBox(), i.x = t._gsTransform.xOrigin - r.x, i.y = t._gsTransform.yOrigin - r.y) : (t.getBBox && -1 !== (o + a).indexOf("%") && (t = t.getBBox(), t = {
                        offsetWidth: t.width,
                        offsetHeight: t.height
                    }), i.x = -1 !== o.indexOf("%") ? t.offsetWidth * parseFloat(o) / 100 : parseFloat(o), i.y = -1 !== a.indexOf("%") ? t.offsetHeight * parseFloat(a) / 100 : parseFloat(a)), i
                },
                kt = function(t) {
                    if (!1 !== jt.cacheSVGData && t._dCache && t._dCache.lastUpdate === e.ticker.frame) return t._dCache;
                    var i, n = t._dCache = t._dCache || {},
                        r = nt(t),
                        s = t.getBBox && yt(t),
                        o = "svg" === (t.nodeName + "").toLowerCase();
                    if (n.isSVG = s, n.isSVGRoot = o, n.borderBox = "border-box" === r.boxSizing, n.computedStyle = r, o) i = t.parentNode || x, i.insertBefore(T, t), n.offsetParent = T.offsetParent || x, i.removeChild(T);
                    else if (s) {
                        for (i = t.parentNode; i && "svg" !== (i.nodeName + "").toLowerCase();) i = i.parentNode;
                        n.offsetParent = i
                    } else n.offsetParent = t.offsetParent;
                    return n
                },
                St = function(t, e, i, n, r) {
                    if (t === window || !t || !t.style || !t.parentNode) return [1, 0, 0, 1, 0, 0];
                    var s, a, l, u, p, f, d, m, _, g, v, w, T, b, P = t._dCache || kt(t),
                        k = t.parentNode,
                        S = k._dCache || kt(k),
                        C = P.computedStyle,
                        O = P.isSVG ? S.offsetParent : k.offsetParent;
                    return s = P.isSVG && -1 !== (t.style[dt] + "").indexOf("matrix") ? t.style[dt] : C ? C.getPropertyValue(mt) : t.currentStyle ? t.currentStyle[dt] : "1,0,0,1,0,0", t.getBBox && -1 !== (t.getAttribute("transform") + "").indexOf("matrix") && (s = t.getAttribute("transform")), s = (s + "").match(/(?:\-|\.|\b)(\d|\.|e\-)+/g) || [1, 0, 0, 1, 0, 0], s.length > 6 && (s = [s[0], s[1], s[4], s[5], s[12], s[13]]), n ? s[4] = s[5] = 0 : P.isSVG && (p = t._gsTransform) && (p.xOrigin || p.yOrigin) && (s[0] = parseFloat(s[0]), s[1] = parseFloat(s[1]), s[2] = parseFloat(s[2]), s[3] = parseFloat(s[3]), s[4] = parseFloat(s[4]) - (p.xOrigin - (p.xOrigin * s[0] + p.yOrigin * s[2])), s[5] = parseFloat(s[5]) - (p.yOrigin - (p.xOrigin * s[1] + p.yOrigin * s[3]))), e && (void 0 === o && ut(), l = P.isSVG || P.isSVGRoot ? bt(t) : t, P.isSVG ? (u = t.getBBox(), g = S.isSVGRoot ? {
                        x: 0,
                        y: 0
                    } : k.getBBox(), l = {
                        offsetLeft: u.x - g.x,
                        offsetTop: u.y - g.y,
                        offsetParent: P.offsetParent
                    }) : P.isSVGRoot ? (v = parseInt(C.borderTopWidth, 10) || 0, w = parseInt(C.borderLeftWidth, 10) || 0, T = (s[0] - o) * w + s[2] * v, b = s[1] * w + (s[3] - o) * v, f = e.x, d = e.y, m = f - (f * s[0] + d * s[2]), _ = d - (f * s[1] + d * s[3]), s[4] = parseFloat(s[4]) + m, s[5] = parseFloat(s[5]) + _, e.x -= m, e.y -= _, f = l.scaleX, d = l.scaleY, r || (e.x *= f, e.y *= d), s[0] *= f, s[1] *= d, s[2] *= f, s[3] *= d, xt || (e.x += T, e.y += b), O === y.body && l.offsetParent === x && (O = x)) : !h && t.offsetParent && (e.x += parseInt(lt(t.offsetParent, "borderLeftWidth"), 10) || 0, e.y += parseInt(lt(t.offsetParent, "borderTopWidth"), 10) || 0), a = k === x || k === y.body, s[4] = Number(s[4]) + e.x + (l.offsetLeft || 0) - i.x - (a ? 0 : k.scrollLeft || 0), s[5] = Number(s[5]) + e.y + (l.offsetTop || 0) - i.y - (a ? 0 : k.scrollTop || 0), k && "fixed" === lt(t, "position", C) && (s[4] += G(), s[5] += q()), !k || k === x || O !== l.offsetParent || S.isSVG || c && "100100" !== St(k).join("") || (l = S.isSVGRoot ? bt(k) : k, s[4] -= l.offsetLeft || 0, s[5] -= l.offsetTop || 0, h || !S.offsetParent || P.isSVG || P.isSVGRoot || (s[4] -= parseInt(lt(S.offsetParent, "borderLeftWidth"), 10) || 0, s[5] -= parseInt(lt(S.offsetParent, "borderTopWidth"), 10) || 0))), s
                },
                Ct = function(t, e) {
                    if (!t || t === window || !t.parentNode) return [1, 0, 0, 1, 0, 0];
                    for (var i, n, r, s, o, a, l, h, c = Pt(t, _t), u = Pt(t.parentNode, gt), p = St(t, c, u, !1, !0);
                        (t = t.parentNode) && t.parentNode && t !== x;) c = u, u = Pt(t.parentNode, c === _t ? gt : _t), l = St(t, c, u), i = p[0], n = p[1], r = p[2], s = p[3], o = p[4], a = p[5], p[0] = i * l[0] + n * l[2], p[1] = i * l[1] + n * l[3], p[2] = r * l[0] + s * l[2], p[3] = r * l[1] + s * l[3], p[4] = o * l[0] + a * l[2] + l[4], p[5] = o * l[1] + a * l[3] + l[5];
                    return e && (i = p[0], n = p[1], r = p[2], s = p[3], o = p[4], a = p[5], h = i * s - n * r, p[0] = s / h, p[1] = -n / h, p[2] = -r / h, p[3] = i / h, p[4] = (r * a - s * o) / h, p[5] = -(i * a - n * o) / h), p
                },
                Ot = function(t, e, i, n, r) {
                    t = tt(t);
                    var s = Ct(t, !1),
                        o = e.x,
                        a = e.y;
                    return i && (Pt(t, e), o -= e.x, a -= e.y), n = !0 === n ? e : n || {}, n.x = o * s[0] + a * s[2] + s[4], n.y = o * s[1] + a * s[3] + s[5], n
                },
                Et = function(t, e, i) {
                    var n = t.x * e[0] + t.y * e[2] + e[4],
                        r = t.x * e[1] + t.y * e[3] + e[5];
                    return t.x = n * i[0] + r * i[2] + i[4], t.y = n * i[1] + r * i[3] + i[5], t
                },
                At = function(t, e, i) {
                    if (!(t = tt(t))) return null;
                    e = tt(e);
                    var n, r, s, o, a, l, h, c, u, p, f, d, m, _, g, v, w, T, b, P, k, S, C = t.getBBox && yt(t);
                    if (t === window) o = q(), r = G(), s = r + (x.clientWidth || t.innerWidth || y.body.clientWidth || 0), a = o + ((t.innerHeight || 0) - 20 < x.clientHeight ? x.clientHeight : t.innerHeight || y.body.clientHeight || 0);
                    else {
                        if (void 0 === e || e === window) return t.getBoundingClientRect();
                        n = Pt(t), r = -n.x, o = -n.y, C ? (d = t.getBBox(), m = d.width, _ = d.height) : "svg" !== (t.nodeName + "").toLowerCase() && t.offsetWidth ? (m = t.offsetWidth, _ = t.offsetHeight) : (k = nt(t), m = parseFloat(k.width), _ = parseFloat(k.height)), s = r + m, a = o + _, "svg" !== t.nodeName.toLowerCase() || O || (g = bt(t), S = g.computedStyle || {}, T = (t.getAttribute("viewBox") || "0 0").split(" "), b = parseFloat(T[0]), P = parseFloat(T[1]), v = parseFloat(S.borderLeftWidth) || 0, w = parseFloat(S.borderTopWidth) || 0, s -= m - (m - v) / g.scaleX - b, a -= _ - (_ - w) / g.scaleY - P, r -= v / g.scaleX - b, o -= w / g.scaleY - P, k && (s += (parseFloat(S.borderRightWidth) + v) / g.scaleX, a += (w + parseFloat(S.borderBottomWidth)) / g.scaleY))
                    }
                    return t === e ? {
                        left: r,
                        top: o,
                        width: s - r,
                        height: a - o
                    } : (l = Ct(t), h = Ct(e, !0), c = Et({
                        x: r,
                        y: o
                    }, l, h), u = Et({
                        x: s,
                        y: o
                    }, l, h), p = Et({
                        x: s,
                        y: a
                    }, l, h), f = Et({
                        x: r,
                        y: a
                    }, l, h), r = Math.min(c.x, u.x, p.x, f.x), o = Math.min(c.y, u.y, p.y, f.y), B.x = B.y = 0, i && Pt(e, B), {
                        left: r + B.x,
                        top: o + B.y,
                        width: Math.max(c.x, u.x, p.x, f.x) - r,
                        height: Math.max(c.y, u.y, p.y, f.y) - o
                    })
                },
                Rt = function(t) {
                    return !!(t && t.length && t[0] && (t[0].nodeType && t[0].style && !t.nodeType || t[0].length && t[0][0]))
                },
                Dt = function(t) {
                    var e, i, n, r = [],
                        s = t.length;
                    for (e = 0; s > e; e++)
                        if (i = t[e], Rt(i))
                            for (n = i.length, n = 0; n < i.length; n++) r.push(i[n]);
                        else i && 0 !== i.length && r.push(i);
                    return r
                },
                Mt = "ontouchstart" in x && "orientation" in window,
                Lt = function(t) {
                    for (var e = t.split(","), i = (void 0 !== T.onpointerdown ? "pointerdown,pointermove,pointerup,pointercancel" : void 0 !== T.onmspointerdown ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : t).split(","), n = {}, r = 8; --r > -1;) n[e[r]] = i[r], n[i[r]] = e[r];
                    return n
                }("touchstart,touchmove,touchend,touchcancel"),
                It = function(t, e, i, n) {
                    t.addEventListener ? t.addEventListener(Lt[e] || e, i, n) : t.attachEvent && t.attachEvent("on" + e, i)
                },
                Nt = function(t, e, i) {
                    t.removeEventListener ? t.removeEventListener(Lt[e] || e, i) : t.detachEvent && t.detachEvent("on" + e, i)
                },
                Bt = function(t, e) {
                    for (var i = t.length; --i > -1;)
                        if (t[i].identifier === e) return !0;
                    return !1
                },
                Xt = function(t) {
                    r = t.touches && L < t.touches.length, Nt(t.target, "touchend", Xt)
                },
                Ft = function(t) {
                    r = t.touches && L < t.touches.length, It(t.target, "touchend", Xt)
                },
                Wt = function(t, e, i, n, r, s) {
                    var o, a, l, h = {};
                    if (e)
                        if (1 !== r && e instanceof Array) {
                            if (h.end = o = [], l = e.length, "object" == typeof e[0])
                                for (a = 0; l > a; a++) o[a] = W(e[a], r);
                            else
                                for (a = 0; l > a; a++) o[a] = e[a] * r;
                            i += 1.1, n -= 1.1
                        } else h.end = "function" == typeof e ? function(i) {
                            var n, s, o = e.call(t, i);
                            if (1 !== r && "object" == typeof o) {
                                n = {};
                                for (s in o) n[s] = o[s] * r;
                                o = n
                            }
                            return o
                        } : e;
                    return (i || 0 === i) && (h.max = i), (n || 0 === n) && (h.min = n), s && (h.velocity = 0), h
                },
                Yt = function(t) {
                    var e;
                    return !(!t || !t.getAttribute || "BODY" === t.nodeName) && (!("true" !== (e = t.getAttribute("data-clickable")) && ("false" === e || !t.onclick && !M.test(t.nodeName + "") && "true" !== t.getAttribute("contentEditable"))) || Yt(t.parentNode))
                },
                zt = function(t, e) {
                    for (var i, n = t.length; --n > -1;) i = t[n], i.ondragstart = i.onselectstart = e ? null : P, it(i, "userSelect", e ? "text" : "none")
                },
                Ht = function() {
                    var t, e = y.createElement("div"),
                        i = y.createElement("div"),
                        n = i.style,
                        r = y.body || T;
                    return n.display = "inline-block", n.position = "relative", e.style.cssText = i.innerHTML = "width:90px; height:40px; padding:10px; overflow:auto; visibility: hidden", e.appendChild(i), r.appendChild(e), u = i.offsetHeight + 18 > e.scrollHeight, n.width = "100%", dt || (n.paddingRight = "500px", t = e.scrollLeft = e.scrollWidth - e.clientWidth, n.left = "-90px", t = t !== e.scrollLeft), r.removeChild(e), t
                }(),
                Vt = function(t, i) {
                    t = tt(t), i = i || {};
                    var n, r, s, o, a, l, h = y.createElement("div"),
                        c = h.style,
                        p = t.firstChild,
                        f = 0,
                        d = 0,
                        m = t.scrollTop,
                        _ = t.scrollLeft,
                        g = t.scrollWidth,
                        v = t.scrollHeight,
                        x = 0,
                        w = 0,
                        T = 0;
                    pt && !1 !== i.force3D ? (a = "translate3d(", l = "px,0px)") : dt && (a = "translate(", l = "px)"), this.scrollTop = function(t, e) {
                        return arguments.length ? void this.top(-t, e) : -this.top()
                    }, this.scrollLeft = function(t, e) {
                        return arguments.length ? void this.left(-t, e) : -this.left()
                    }, this.left = function(n, r) {
                        if (!arguments.length) return -(t.scrollLeft + d);
                        var s = t.scrollLeft - _,
                            o = d;
                        return (s > 2 || -2 > s) && !r ? (_ = t.scrollLeft, e.killTweensOf(this, !0, {
                            left: 1,
                            scrollLeft: 1
                        }), this.left(-_), void(i.onKill && i.onKill())) : (n = -n, 0 > n ? (d = n - .5 | 0, n = 0) : n > w ? (d = n - w | 0, n = w) : d = 0, (d || o) && (a ? this._suspendTransforms || (c[dt] = a + -d + "px," + -f + l) : c.left = -d + "px", Ht && d + x >= 0 && (c.paddingRight = d + x + "px")), t.scrollLeft = 0 | n, void(_ = t.scrollLeft))
                    }, this.top = function(n, r) {
                        if (!arguments.length) return -(t.scrollTop + f);
                        var s = t.scrollTop - m,
                            o = f;
                        return (s > 2 || -2 > s) && !r ? (m = t.scrollTop, e.killTweensOf(this, !0, {
                            top: 1,
                            scrollTop: 1
                        }), this.top(-m), void(i.onKill && i.onKill())) : (n = -n, 0 > n ? (f = n - .5 | 0, n = 0) : n > T ? (f = n - T | 0, n = T) : f = 0, (f || o) && (a ? this._suspendTransforms || (c[dt] = a + -d + "px," + -f + l) : c.top = -f + "px"), t.scrollTop = 0 | n, void(m = t.scrollTop))
                    }, this.maxScrollTop = function() {
                        return T
                    }, this.maxScrollLeft = function() {
                        return w
                    }, this.disable = function() {
                        for (p = h.firstChild; p;) o = p.nextSibling, t.appendChild(p), p = o;
                        t === h.parentNode && t.removeChild(h)
                    }, this.enable = function() {
                        if ((p = t.firstChild) !== h) {
                            for (; p;) o = p.nextSibling, h.appendChild(p), p = o;
                            t.appendChild(h), this.calibrate()
                        }
                    }, this.calibrate = function(e) {
                        var i, o, a = t.clientWidth === n;
                        m = t.scrollTop, _ = t.scrollLeft, (!a || t.clientHeight !== r || h.offsetHeight !== s || g !== t.scrollWidth || v !== t.scrollHeight || e) && ((f || d) && (i = this.left(), o = this.top(), this.left(-t.scrollLeft), this.top(-t.scrollTop)), (!a || e) && (c.display = "block", c.width = "auto", c.paddingRight = "0px", (x = Math.max(0, t.scrollWidth - t.clientWidth)) && (x += lt(t, "paddingLeft") + (u ? lt(t, "paddingRight") : 0))), c.display = "inline-block", c.position = "relative", c.overflow = "visible", c.verticalAlign = "top", c.width = "100%", c.paddingRight = x + "px", u && (c.paddingBottom = lt(t, "paddingBottom", !0)), O && (c.zoom = "1"), n = t.clientWidth, r = t.clientHeight, g = t.scrollWidth, v = t.scrollHeight, w = t.scrollWidth - n, T = t.scrollHeight - r, s = h.offsetHeight, c.display = "block", (i || o) && (this.left(i), this.top(o)))
                    }, this.content = h, this.element = t, this._suspendTransforms = !1, this.enable()
                },
                jt = function(n, o) {
                    t.call(this, n), n = tt(n), s || (s = _.com.greensock.plugins.ThrowPropsPlugin), this.vars = o = W(o || {}), this.target = n, this.x = this.y = this.rotation = 0, this.dragResistance = parseFloat(o.dragResistance) || 0, this.edgeResistance = isNaN(o.edgeResistance) ? 1 : parseFloat(o.edgeResistance) || 0, this.lockAxis = o.lockAxis, this.autoScroll = o.autoScroll || 0, this.lockedAxis = null, this.allowEventDefault = !!o.allowEventDefault;
                    var a, l, h, c, u, g, v, w, T, P, A, M, Y, V, q, G, Q, et, nt, rt, st, ot, at, ut, pt, ft, dt, mt, _t, gt, vt, xt, wt, Tt, bt = (o.type || (O ? "top,left" : "x,y")).toLowerCase(),
                        Pt = -1 !== bt.indexOf("x") || -1 !== bt.indexOf("y"),
                        kt = -1 !== bt.indexOf("rotation"),
                        St = kt ? "rotation" : Pt ? "x" : "left",
                        Et = Pt ? "y" : "top",
                        At = -1 !== bt.indexOf("x") || -1 !== bt.indexOf("left") || "scroll" === bt,
                        Rt = -1 !== bt.indexOf("y") || -1 !== bt.indexOf("top") || "scroll" === bt,
                        Dt = o.minimumMovement || 2,
                        Xt = this,
                        Ht = F(o.trigger || o.handle || n),
                        qt = {},
                        Gt = 0,
                        Ut = !1,
                        $t = o.clickableTest || Yt,
                        Qt = 0,
                        Kt = function(t) {
                            return Xt.isPressed && t.which < 2 ? void Xt.endDrag() : (t.preventDefault(), t.stopPropagation(), !1)
                        },
                        Jt = function(t) {
                            if (Xt.autoScroll && Xt.isDragging && (Ut || et)) {
                                var e, i, r, s, o, a, h, c, u = n,
                                    p = 15 * Xt.autoScroll;
                                for (Ut = !1, X.scrollTop = null != window.pageYOffset ? window.pageYOffset : null != x.scrollTop ? x.scrollTop : y.body.scrollTop, X.scrollLeft = null != window.pageXOffset ? window.pageXOffset : null != x.scrollLeft ? x.scrollLeft : y.body.scrollLeft, s = Xt.pointerX - X.scrollLeft, o = Xt.pointerY - X.scrollTop; u && !i;) i = $(u.parentNode), e = i ? X : u.parentNode, r = i ? {
                                    bottom: Math.max(x.clientHeight, window.innerHeight || 0),
                                    right: Math.max(x.clientWidth, window.innerWidth || 0),
                                    left: 0,
                                    top: 0
                                } : e.getBoundingClientRect(), a = h = 0, Rt && (c = e._gsMaxScrollY - e.scrollTop, 0 > c ? h = c : o > r.bottom - 40 && c ? (Ut = !0, h = Math.min(c, p * (1 - Math.max(0, r.bottom - o) / 40) | 0)) : o < r.top + 40 && e.scrollTop && (Ut = !0, h = -Math.min(e.scrollTop, p * (1 - Math.max(0, o - r.top) / 40) | 0)), h && (e.scrollTop += h)), At && (c = e._gsMaxScrollX - e.scrollLeft, 0 > c ? a = c : s > r.right - 40 && c ? (Ut = !0, a = Math.min(c, p * (1 - Math.max(0, r.right - s) / 40) | 0)) : s < r.left + 40 && e.scrollLeft && (Ut = !0, a = -Math.min(e.scrollLeft, p * (1 - Math.max(0, s - r.left) / 40) | 0)), a && (e.scrollLeft += a)), i && (a || h) && (window.scrollTo(e.scrollLeft, e.scrollTop), fe(Xt.pointerX + a, Xt.pointerY + h)), u = e
                            }
                            if (et) {
                                var f = Xt.x,
                                    d = Xt.y,
                                    m = 1e-6;
                                m > f && f > -m && (f = 0), m > d && d > -m && (d = 0), kt ? (Xt.deltaX = f - _t.data.rotation, _t.data.rotation = Xt.rotation = f, _t.setRatio(1)) : l ? (Rt && (Xt.deltaY = d - l.top(), l.top(d)), At && (Xt.deltaX = f - l.left(), l.left(f))) : Pt ? (Rt && (Xt.deltaY = d - _t.data.y, _t.data.y = d), At && (Xt.deltaX = f - _t.data.x, _t.data.x = f), _t.setRatio(1)) : (Rt && (Xt.deltaY = d - parseFloat(n.style.top || 0), n.style.top = d + "px"), At && (Xt.deltaY = f - parseFloat(n.style.left || 0), n.style.left = f + "px")), !w || t || xt || (xt = !0, ht(Xt, "drag", "onDrag"), xt = !1)
                            }
                            et = !1
                        },
                        te = function(t, i) {
                            var r, s = Xt.x,
                                o = Xt.y;
                            n._gsTransform || !Pt && !kt || e.set(n, {
                                x: "+=0",
                                overwrite: !1
                            }), Pt ? (Xt.y = n._gsTransform.y, Xt.x = n._gsTransform.x) : kt ? Xt.x = Xt.rotation = n._gsTransform.rotation : l ? (Xt.y = l.top(), Xt.x = l.left()) : (Xt.y = parseInt(n.style.top, 10) || 0, Xt.x = parseInt(n.style.left, 10) || 0), (rt || st || ot) && !i && (Xt.isDragging || Xt.isThrowing) && (ot && (B.x = Xt.x, B.y = Xt.y, r = ot(B), r.x !== Xt.x && (Xt.x = r.x, et = !0), r.y !== Xt.y && (Xt.y = r.y, et = !0)), rt && (r = rt(Xt.x)) !== Xt.x && (Xt.x = r, kt && (Xt.rotation = r), et = !0), st && (r = st(Xt.y), r !== Xt.y && (Xt.y = r), et = !0)), et && Jt(!0), t || (Xt.deltaX = Xt.x - s, Xt.deltaY = Xt.y - o, ht(Xt, "throwupdate", "onThrowUpdate"))
                        },
                        ee = function() {
                            var t, e, i, r;
                            v = !1, l ? (l.calibrate(), Xt.minX = P = -l.maxScrollLeft(), Xt.minY = M = -l.maxScrollTop(), Xt.maxX = T = Xt.maxY = A = 0, v = !0) : o.bounds && (t = ct(o.bounds, n.parentNode), kt ? (Xt.minX = P = t.left, Xt.maxX = T = t.left + t.width, Xt.minY = M = Xt.maxY = A = 0) : void 0 !== o.bounds.maxX || void 0 !== o.bounds.maxY ? (t = o.bounds, Xt.minX = P = t.minX, Xt.minY = M = t.minY, Xt.maxX = T = t.maxX, Xt.maxY = A = t.maxY) : (e = ct(n, n.parentNode), Xt.minX = P = lt(n, St) + t.left - e.left, Xt.minY = M = lt(n, Et) + t.top - e.top, Xt.maxX = T = P + (t.width - e.width), Xt.maxY = A = M + (t.height - e.height)), P > T && (Xt.minX = T, Xt.maxX = T = P, P = Xt.minX), M > A && (Xt.minY = A, Xt.maxY = A = M, M = Xt.minY), kt && (Xt.minRotation = P, Xt.maxRotation = T), v = !0), o.liveSnap && (i = !0 === o.liveSnap ? o.snap || {} : o.liveSnap, r = i instanceof Array || "function" == typeof i, kt ? (rt = he(r ? i : i.rotation, P, T, 1), st = null) : i.points ? ot = ce(r ? i : i.points, P, T, M, A, i.radius, l ? -1 : 1) : (At && (rt = he(r ? i : i.x || i.left || i.scrollLeft, P, T, l ? -1 : 1)), Rt && (st = he(r ? i : i.y || i.top || i.scrollTop, M, A, l ? -1 : 1))))
                        },
                        ie = function() {
                            Xt.isThrowing = !1, ht(Xt, "throwcomplete", "onThrowComplete")
                        },
                        ne = function() {
                            Xt.isThrowing = !1
                        },
                        re = function(t, e) {
                            var i, r, a, h;
                            t && s ? (!0 === t && (i = o.snap || o.liveSnap || {}, r = i instanceof Array || "function" == typeof i, t = {
                                resistance: (o.throwResistance || o.resistance || 1e3) / (kt ? 10 : 1)
                            }, kt ? t.rotation = Wt(Xt, r ? i : i.rotation, T, P, 1, e) : (At && (t[St] = Wt(Xt, r ? i : i.points || i.x || i.left || i.scrollLeft, T, P, l ? -1 : 1, e || "x" === Xt.lockedAxis)), Rt && (t[Et] = Wt(Xt, r ? i : i.points || i.y || i.top || i.scrollTop, A, M, l ? -1 : 1, e || "y" === Xt.lockedAxis)), (i.points || i instanceof Array && "object" == typeof i[0]) && (t.linkedProps = St + "," + Et, t.radius = i.radius))), Xt.isThrowing = !0, h = isNaN(o.overshootTolerance) ? 1 === o.edgeResistance ? 0 : 1 - Xt.edgeResistance + .2 : o.overshootTolerance, Xt.tween = a = s.to(l || n, {
                                throwProps: t,
                                ease: o.ease || _.Power3.easeOut,
                                onComplete: ie,
                                onOverwrite: ne,
                                onUpdate: o.fastMode ? ht : te,
                                onUpdateParams: o.fastMode ? [Xt, "onthrowupdate", "onThrowUpdate"] : i && i.radius ? [!1, !0] : b
                            }, isNaN(o.maxDuration) ? 2 : o.maxDuration, isNaN(o.minDuration) ? 0 === h || "object" == typeof t && t.resistance > 1e3 ? 0 : .5 : o.minDuration, h), o.fastMode || (l && (l._suspendTransforms = !0), a.render(a.duration(), !0, !0), te(!0, !0), Xt.endX = Xt.x, Xt.endY = Xt.y, kt && (Xt.endRotation = Xt.x), a.play(0), te(!0, !0), l && (l._suspendTransforms = !1))) : v && Xt.applyBounds()
                        },
                        se = function(t) {
                            var e, i, r, s, o, a, l, u, p, f = pt || [1, 0, 0, 1, 0, 0];
                            pt = Ct(n.parentNode, !0), t && Xt.isPressed && f.join(",") !== pt.join(",") && (e = f[0], i = f[1], r = f[2], s = f[3], o = f[4], a = f[5], l = e * s - i * r, u = h * (s / l) + c * (-r / l) + (r * a - s * o) / l, p = h * (-i / l) + c * (e / l) + -(e * a - i * o) / l, c = u * pt[1] + p * pt[3] + pt[5], h = u * pt[0] + p * pt[2] + pt[4]), pt[1] || pt[2] || 1 != pt[0] || 1 != pt[3] || 0 != pt[4] || 0 != pt[5] || (pt = null)
                        },
                        oe = function() {
                            var t = 1 - Xt.edgeResistance;
                            se(!1), pt && (h = Xt.pointerX * pt[0] + Xt.pointerY * pt[2] + pt[4], c = Xt.pointerX * pt[1] + Xt.pointerY * pt[3] + pt[5]), et && (fe(Xt.pointerX, Xt.pointerY), Jt(!0)), l ? (ee(), g = l.top(), u = l.left()) : (ae() ? (te(!0, !0), ee()) : Xt.applyBounds(), kt ? (Q = Xt.rotationOrigin = Ot(n, {
                                x: 0,
                                y: 0
                            }), te(!0, !0), u = Xt.x, g = Xt.y = Math.atan2(Q.y - Xt.pointerY, Xt.pointerX - Q.x) * k) : (dt = n.parentNode ? n.parentNode.scrollTop || 0 : 0, mt = n.parentNode ? n.parentNode.scrollLeft || 0 : 0, g = lt(n, Et), u = lt(n, St))), v && t && (u > T ? u = T + (u - T) / t : P > u && (u = P - (P - u) / t), kt || (g > A ? g = A + (g - A) / t : M > g && (g = M - (M - g) / t))), Xt.startX = u, Xt.startY = g
                        },
                        ae = function() {
                            return Xt.tween && Xt.tween.isActive()
                        },
                        le = function() {
                            !E.parentNode || ae() || Xt.isDragging || E.parentNode.removeChild(E)
                        },
                        he = function(t, e, i, n) {
                            return "function" == typeof t ? function(r) {
                                var s = Xt.isPressed ? 1 - Xt.edgeResistance : 1;
                                return t.call(Xt, r > i ? i + (r - i) * s : e > r ? e + (r - e) * s : r) * n
                            } : t instanceof Array ? function(n) {
                                for (var r, s, o = t.length, a = 0, l = S; --o > -1;) r = t[o], s = r - n, 0 > s && (s = -s), l > s && r >= e && i >= r && (a = o, l = s);
                                return t[a]
                            } : isNaN(t) ? function(t) {
                                return t
                            } : function() {
                                return t * n
                            }
                        },
                        ce = function(t, e, i, n, r, s, o) {
                            return s = s && S > s ? s * s : S, "function" == typeof t ? function(a) {
                                var l, h, c, u = Xt.isPressed ? 1 - Xt.edgeResistance : 1,
                                    p = a.x,
                                    f = a.y;
                                return a.x = p = p > i ? i + (p - i) * u : e > p ? e + (p - e) * u : p, a.y = f = f > r ? r + (f - r) * u : n > f ? n + (f - n) * u : f, l = t.call(Xt, a), l !== a && (a.x = l.x, a.y = l.y), 1 !== o && (a.x *= o, a.y *= o), S > s && (h = a.x - p, c = a.y - f, h * h + c * c > s && (a.x = p, a.y = f)), a
                            } : t instanceof Array ? function(e) {
                                for (var i, n, r, o, a = t.length, l = 0, h = S; --a > -1;) r = t[a], i = r.x - e.x, n = r.y - e.y, o = i * i + n * n, h > o && (l = a, h = o);
                                return s >= h ? t[l] : e
                            } : function(t) {
                                return t
                            }
                        },
                        ue = function(t) {
                            var i;
                            if (!(!a || Xt.isPressed || !t || ("mousedown" === t.type || "pointerdown" === t.type) && C() - Qt < 30 && Lt[Xt.pointerEvent.type])) {
                                if (ft = ae(), Xt.pointerEvent = t, Lt[t.type] ? (ut = -1 !== t.type.indexOf("touch") ? t.currentTarget || t.target : y, It(ut, "touchend", de), It(ut, "touchmove", pe), It(ut, "touchcancel", de), It(y, "touchstart", Ft)) : (ut = null, It(y, "mousemove", pe)), vt = null, It(y, "mouseup", de), t && t.target && It(t.target, "mouseup", de), at = $t.call(Xt, t.target) && !o.dragClickables) return It(t.target, "change", de), ht(Xt, "press", "onPress"), void zt(Ht, !0);
                                if (gt = !(!ut || At === Rt || !1 === Xt.vars.allowNativeTouchScrolling) && (At ? "y" : "x"), O ? t = J(t, !0) : gt || Xt.allowEventDefault || (t.preventDefault(), t.preventManipulation && t.preventManipulation()), t.changedTouches ? (t = q = t.changedTouches[0], G = t.identifier) : t.pointerId ? G = t.pointerId : q = G = null, L++, z(Jt), c = Xt.pointerY = t.pageY, h = Xt.pointerX = t.pageX, (gt || Xt.autoScroll) && K(n.parentNode), n.parentNode && (l || Xt.autoScroll && !kt && n.parentNode._gsMaxScrollX && !E.parentNode) && !n.getBBox && (E.style.width = n.parentNode.scrollWidth + "px", n.parentNode.appendChild(E)), oe(), Xt.tween && Xt.tween.kill(), Xt.isThrowing = !1, e.killTweensOf(l || n, !0, qt), l && e.killTweensOf(n, !0, {
                                        scrollTo: 1
                                    }), Xt.tween = Xt.lockedAxis = null, (o.zIndexBoost || !kt && !l && !1 !== o.zIndexBoost) && (n.style.zIndex = jt.zIndex++), Xt.isPressed = !0, w = !(!o.onDrag && !Xt._listeners.drag), !kt)
                                    for (i = Ht.length; --i > -1;) it(Ht[i], "cursor", o.cursor || "move");
                                ht(Xt, "press", "onPress")
                            }
                        },
                        pe = function(t) {
                            var e, i, n, s, o, l, u = t;
                            if (a && !r && Xt.isPressed && t) {
                                if (Xt.pointerEvent = t, e = t.changedTouches) {
                                    if ((t = e[0]) !== q && t.identifier !== G) {
                                        for (s = e.length; --s > -1 && (t = e[s]).identifier !== G;);
                                        if (0 > s) return
                                    }
                                } else if (t.pointerId && G && t.pointerId !== G) return;
                                if (O) t = J(t, !0);
                                else {
                                    if (ut && gt && !vt && (i = t.pageX, n = t.pageY, pt && (s = i * pt[0] + n * pt[2] + pt[4], n = i * pt[1] + n * pt[3] + pt[5], i = s), o = Math.abs(i - h), l = Math.abs(n - c), (o !== l && (o > Dt || l > Dt) || I && gt === vt) && (vt = o > l && At ? "x" : "y", !1 !== Xt.vars.lockAxisOnTouchScroll && (Xt.lockedAxis = "x" === vt ? "y" : "x", "function" == typeof Xt.vars.onLockAxis && Xt.vars.onLockAxis.call(Xt, u)), I && gt === vt))) return void de(u);
                                    Xt.allowEventDefault || gt && (!vt || gt === vt) || !1 === u.cancelable || (u.preventDefault(), u.preventManipulation && u.preventManipulation())
                                }
                                Xt.autoScroll && (Ut = !0), fe(t.pageX, t.pageY)
                            }
                        },
                        fe = function(t, e) {
                            var i, n, r, s, o, a, l = 1 - Xt.dragResistance,
                                p = 1 - Xt.edgeResistance;
                            Xt.pointerX = t, Xt.pointerY = e, kt ? (s = Math.atan2(Q.y - e, t - Q.x) * k, o = Xt.y - s, Xt.y = s, o > 180 ? g -= 360 : -180 > o && (g += 360), r = u + (g - s) * l) : (pt && (a = t * pt[0] + e * pt[2] + pt[4], e = t * pt[1] + e * pt[3] + pt[5], t = a), n = e - c, i = t - h, Dt > n && n > -Dt && (n = 0), Dt > i && i > -Dt && (i = 0), (Xt.lockAxis || Xt.lockedAxis) && (i || n) && (a = Xt.lockedAxis, a || (Xt.lockedAxis = a = At && Math.abs(i) > Math.abs(n) ? "y" : Rt ? "x" : null, a && "function" == typeof Xt.vars.onLockAxis && Xt.vars.onLockAxis.call(Xt, Xt.pointerEvent)), "y" === a ? n = 0 : "x" === a && (i = 0)), r = u + i * l, s = g + n * l), (rt || st || ot) && (Xt.x !== r || Xt.y !== s && !kt) ? (ot && (B.x = r, B.y = s, a = ot(B), r = a.x, s = a.y), rt && (r = rt(r)), st && (s = st(s))) : v && (r > T ? r = T + (r - T) * p : P > r && (r = P + (r - P) * p), kt || (s > A ? s = A + (s - A) * p : M > s && (s = M + (s - M) * p))), kt || pt || (r = Math.round(r), s = Math.round(s)), (Xt.x !== r || Xt.y !== s && !kt) && (kt ? (Xt.endRotation = Xt.x = Xt.endX = r, et = !0) : (Rt && (Xt.y = Xt.endY = s, et = !0), At && (Xt.x = Xt.endX = r, et = !0)), !Xt.isDragging && Xt.isPressed && (Xt.isDragging = !0, ht(Xt, "dragstart", "onDragStart")))
                        },
                        de = function(t, i) {
                            if (a && Xt.isPressed && (!t || null == G || i || !(t.pointerId && t.pointerId !== G || t.changedTouches && !Bt(t.changedTouches, G)))) {
                                Xt.isPressed = !1;
                                var r, s, l, h, c, u = t,
                                    p = Xt.isDragging,
                                    f = e.delayedCall(.001, le);
                                if (ut ? (Nt(ut, "touchend", de), Nt(ut, "touchmove", pe), Nt(ut, "touchcancel", de), Nt(y, "touchstart", Ft)) : Nt(y, "mousemove", pe), Nt(y, "mouseup", de), t && t.target && Nt(t.target, "mouseup", de), et = !1, at) return t && Nt(t.target, "change", de), zt(Ht, !1), ht(Xt, "release", "onRelease"), ht(Xt, "click", "onClick"), void(at = !1);
                                if (H(Jt), !kt)
                                    for (s = Ht.length; --s > -1;) it(Ht[s], "cursor", o.cursor || "move");
                                if (p && (Gt = N = C(), Xt.isDragging = !1), L--, t) {
                                    if (O && (t = J(t, !1)), (r = t.changedTouches) && (t = r[0]) !== q && t.identifier !== G) {
                                        for (s = r.length; --s > -1 && (t = r[s]).identifier !== G;);
                                        if (0 > s) return
                                    }
                                    Xt.pointerEvent = u, Xt.pointerX = t.pageX, Xt.pointerY = t.pageY
                                }
                                return u && !p ? (ft && (o.snap || o.bounds) && re(o.throwProps), ht(Xt, "release", "onRelease"), I && "touchmove" === u.type || (ht(Xt, "click", "onClick"), h = u.target || u.srcElement || n, Qt = C(), c = function() {
                                    Qt !== wt && Xt.enabled() && !Xt.isPressed && (h.click ? h.click() : y.createEvent && (l = y.createEvent("MouseEvents"), l.initMouseEvent("click", !0, !0, window, 1, Xt.pointerEvent.screenX, Xt.pointerEvent.screenY, Xt.pointerX, Xt.pointerY, !1, !1, !1, !1, 0, null), h.dispatchEvent(l)))
                                }, I || u.defaultPrevented || e.delayedCall(1e-5, c))) : (re(o.throwProps), O || Xt.allowEventDefault || !u || !o.dragClickables && $t.call(Xt, u.target) || !p || gt && (!vt || gt !== vt) || !1 === u.cancelable || (u.preventDefault(), u.preventManipulation && u.preventManipulation()), ht(Xt, "release", "onRelease")), ae() && f.duration(Xt.tween.duration()), p && ht(Xt, "dragend", "onDragEnd"), !0
                            }
                        },
                        me = function(t) {
                            if (t && Xt.isDragging && !l) {
                                var e = t.target || t.srcElement || n.parentNode,
                                    i = e.scrollLeft - e._gsScrollX,
                                    r = e.scrollTop - e._gsScrollY;
                                (i || r) && (pt ? (h -= i * pt[0] + r * pt[2], c -= r * pt[3] + i * pt[1]) : (h -= i, c -= r), e._gsScrollX += i, e._gsScrollY += r, fe(Xt.pointerX, Xt.pointerY))
                            }
                        },
                        _e = function(t) {
                            var e = C(),
                                i = 40 > e - Qt,
                                n = 40 > e - Gt,
                                r = i && wt === Qt,
                                s = !!t.preventDefault,
                                o = Xt.pointerEvent && Xt.pointerEvent.defaultPrevented,
                                a = i && Tt === Qt,
                                l = t.isTrusted || null == t.isTrusted && i && r;
                            return s && (r || n && !1 !== Xt.vars.suppressClickOnDrag) && t.stopImmediatePropagation(), !i || Xt.pointerEvent && Xt.pointerEvent.defaultPrevented || r && l === a ? void((Xt.isPressed || n || i) && (s ? l && t.detail && i && !o || (t.preventDefault(), t.preventManipulation && t.preventManipulation()) : t.returnValue = !1)) : (l && r && (Tt = Qt), void(wt = Qt))
                        };
                    nt = jt.get(this.target), nt && nt.kill(), this.startDrag = function(t) {
                        ue(t), Xt.isDragging || (Xt.isDragging = !0, ht(Xt, "dragstart", "onDragStart"))
                    }, this.drag = pe, this.endDrag = function(t) {
                        de(t, !0)
                    }, this.timeSinceDrag = function() {
                        return Xt.isDragging ? 0 : (C() - Gt) / 1e3
                    }, this.hitTest = function(t, e) {
                        return jt.hitTest(Xt.target, t, e)
                    }, this.getDirection = function(t, e) {
                        var i, n, r, o, a, l, h = "velocity" === t && s ? t : "object" != typeof t || kt ? "start" : "element";
                        return "element" === h && (a = Zt(Xt.target), l = Zt(t)), i = "start" === h ? Xt.x - u : "velocity" === h ? s.getVelocity(this.target, St) : a.left + a.width / 2 - (l.left + l.width / 2), kt ? 0 > i ? "counter-clockwise" : "clockwise" : (e = e || 2, n = "start" === h ? Xt.y - g : "velocity" === h ? s.getVelocity(this.target, Et) : a.top + a.height / 2 - (l.top + l.height / 2), r = Math.abs(i / n), o = 1 / e > r ? "" : 0 > i ? "left" : "right", e > r && ("" !== o && (o += "-"), o += 0 > n ? "up" : "down"), o)
                    }, this.applyBounds = function(t) {
                        var e, i, r, s, a, l;
                        if (t && o.bounds !== t) return o.bounds = t, Xt.update(!0);
                        if (te(!0), ee(), v) {
                            if (e = Xt.x, i = Xt.y, e > T ? e = T : P > e && (e = P), i > A ? i = A : M > i && (i = M), (Xt.x !== e || Xt.y !== i) && (r = !0, Xt.x = Xt.endX = e, kt ? Xt.endRotation = e : Xt.y = Xt.endY = i, et = !0, Jt(!0), Xt.autoScroll && !Xt.isDragging))
                                for (K(n.parentNode), s = n, X.scrollTop = null != window.pageYOffset ? window.pageYOffset : null != x.scrollTop ? x.scrollTop : y.body.scrollTop, X.scrollLeft = null != window.pageXOffset ? window.pageXOffset : null != x.scrollLeft ? x.scrollLeft : y.body.scrollLeft; s && !l;) l = $(s.parentNode), a = l ? X : s.parentNode, Rt && a.scrollTop > a._gsMaxScrollY && (a.scrollTop = a._gsMaxScrollY), At && a.scrollLeft > a._gsMaxScrollX && (a.scrollLeft = a._gsMaxScrollX), s = a;
                            Xt.isThrowing && (r || Xt.endX > T || Xt.endX < P || Xt.endY > A || Xt.endY < M) && re(o.throwProps, r)
                        }
                        return Xt
                    }, this.update = function(t, e, i) {
                        var r = Xt.x,
                            s = Xt.y;
                        return se(!e), t ? Xt.applyBounds() : (et && i && Jt(!0), te(!0)), e && (fe(Xt.pointerX, Xt.pointerY), et && Jt(!0)), Xt.isPressed && !e && (At && Math.abs(r - Xt.x) > .01 || Rt && Math.abs(s - Xt.y) > .01 && !kt) && oe(), Xt.autoScroll && (K(n.parentNode), Ut = Xt.isDragging, Jt(!0)), Xt.autoScroll && (Z(n, me), U(n, me)), Xt
                    }, this.enable = function(t) {
                        var r, h, c;
                        if ("soft" !== t) {
                            for (h = Ht.length; --h > -1;) c = Ht[h], It(c, "mousedown", ue), It(c, "touchstart", ue), It(c, "click", _e, !0), kt || it(c, "cursor", o.cursor || "move"), it(c, "touchCallout", "none"), it(c, "touchAction", At === Rt ? "none" : At ? "pan-y" : "pan-x"), yt(c) && it(c.ownerSVGElement || c, "touchAction", At === Rt ? "none" : At ? "pan-y" : "pan-x"), this.vars.allowContextMenu || It(c, "contextmenu", Kt);
                            zt(Ht, !1)
                        }
                        return U(n, me), a = !0, s && "soft" !== t && s.track(l || n, Pt ? "x,y" : kt ? "rotation" : "top,left"), l && l.enable(), n._gsDragID = r = "d" + D++, R[r] = this, l && (l.element._gsDragID = r), e.set(n, {
                            x: "+=0",
                            overwrite: !1
                        }), _t = {
                            t: n,
                            data: O ? V : n._gsTransform,
                            tween: {},
                            setRatio: O ? function() {
                                e.set(n, Y)
                            } : i._internals.setTransformRatio || i._internals.set3DTransformRatio
                        }, oe(), Xt.update(!0), Xt
                    }, this.disable = function(t) {
                        var e, i, r = Xt.isDragging;
                        if (!kt)
                            for (e = Ht.length; --e > -1;) it(Ht[e], "cursor", null);
                        if ("soft" !== t) {
                            for (e = Ht.length; --e > -1;) i = Ht[e], it(i, "touchCallout", null), it(i, "touchAction", null), Nt(i, "mousedown", ue), Nt(i, "touchstart", ue), Nt(i, "click", _e), Nt(i, "contextmenu", Kt);
                            zt(Ht, !0), ut && (Nt(ut, "touchcancel", de), Nt(ut, "touchend", de), Nt(ut, "touchmove", pe)), Nt(y, "mouseup", de), Nt(y, "mousemove", pe)
                        }
                        return Z(n, me), a = !1, s && "soft" !== t && s.untrack(l || n, Pt ? "x,y" : kt ? "rotation" : "top,left"), l && l.disable(), H(Jt), Xt.isDragging = Xt.isPressed = at = !1, r && ht(Xt, "dragend", "onDragEnd"), Xt
                    }, this.enabled = function(t, e) {
                        return arguments.length ? t ? Xt.enable(e) : Xt.disable(e) : a
                    }, this.kill = function() {
                        return Xt.isThrowing = !1, e.killTweensOf(l || n, !0, qt), Xt.disable(), delete R[n._gsDragID], Xt
                    }, -1 !== bt.indexOf("scroll") && (l = this.scrollProxy = new Vt(n, j({
                        onKill: function() {
                            Xt.isPressed && de(null)
                        }
                    }, o)), n.style.overflowY = Rt && !Mt ? "auto" : "hidden", n.style.overflowX = At && !Mt ? "auto" : "hidden", n = l.content), !1 !== o.force3D && e.set(n, {
                        force3D: !0
                    }), kt ? qt.rotation = 1 : (At && (qt[St] = 1), Rt && (qt[Et] = 1)), kt ? (Y = m, V = Y.css, Y.overwrite = !1) : Pt && (Y = At && Rt ? p : At ? f : d, V = Y.css, Y.overwrite = !1), this.enable()
                },
                qt = jt.prototype = new t;
            qt.constructor = jt, qt.pointerX = qt.pointerY = qt.startX = qt.startY = qt.deltaX = qt.deltaY = 0, qt.isDragging = qt.isPressed = !1, jt.version = "0.15.1", jt.zIndex = 1e3, It(y, "touchcancel", function() {}), It(y, "contextmenu", function(t) {
                var e;
                for (e in R) R[e].isPressed && R[e].endDrag()
            }), jt.create = function(t, i) {
                "string" == typeof t && (t = e.selector(t));
                for (var n = t && 0 !== t.length ? Rt(t) ? Dt(t) : [t] : [], r = n.length; --r > -1;) n[r] = new jt(n[r], i);
                return n
            }, jt.get = function(t) {
                return R[(tt(t) || {})._gsDragID]
            }, jt.timeSinceDrag = function() {
                return (C() - N) / 1e3
            };
            var Gt = {},
                Ut = function(t) {
                    var e, i, n = 0,
                        r = 0;
                    for (t = tt(t), e = t.offsetWidth, i = t.offsetHeight; t;) n += t.offsetTop, r += t.offsetLeft, t = t.offsetParent;
                    return {
                        top: n,
                        left: r,
                        width: e,
                        height: i
                    }
                },
                Zt = function(t, e) {
                    if (t === window) return Gt.left = Gt.top = 0, Gt.width = Gt.right = x.clientWidth || t.innerWidth || y.body.clientWidth || 0, Gt.height = Gt.bottom = (t.innerHeight || 0) - 20 < x.clientHeight ? x.clientHeight : t.innerHeight || y.body.clientHeight || 0, Gt;
                    var i = t.pageX !== e ? {
                        left: t.pageX - G(),
                        top: t.pageY - q(),
                        right: t.pageX - G() + 1,
                        bottom: t.pageY - q() + 1
                    } : t.nodeType || t.left === e || t.top === e ? O ? Ut(t) : tt(t).getBoundingClientRect() : t;
                    return i.right === e && i.width !== e ? (i.right = i.left + i.width, i.bottom = i.top + i.height) : i.width === e && (i = {
                        width: i.right - i.left,
                        height: i.bottom - i.top,
                        right: i.right,
                        left: i.left,
                        bottom: i.bottom,
                        top: i.top
                    }), i
                };
            return jt.hitTest = function(t, e, i) {
                if (t === e) return !1;
                var n, r, s, o = Zt(t),
                    a = Zt(e),
                    l = a.left > o.right || a.right < o.left || a.top > o.bottom || a.bottom < o.top;
                return l || !i ? !l : (s = -1 !== (i + "").indexOf("%"), i = parseFloat(i) || 0, n = {
                    left: Math.max(o.left, a.left),
                    top: Math.max(o.top, a.top)
                }, n.width = Math.min(o.right, a.right) - n.left, n.height = Math.min(o.bottom, a.bottom) - n.top, !(n.width < 0 || n.height < 0) && (s ? (i *= .01, (r = n.width * n.height) >= o.width * o.height * i || r >= a.width * a.height * i) : n.width > i && n.height > i))
            }, E.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;", jt
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t) {
        "use strict";
        var e = function() {
            return (_gsScope.GreenSockGlobals || _gsScope).Draggable
        };
        "undefined" != typeof module && module.exports ? (require("../TweenLite.min.js"), require("../plugins/CSSPlugin.min.js"), module.exports = e()) : "function" == typeof define && define.amd && define(["TweenLite", "CSSPlugin"], e)
    }();
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("plugins.ThrowPropsPlugin", ["plugins.TweenPlugin", "TweenLite", "easing.Ease", "utils.VelocityTracker"], function(t, e, i, n) {
            var r, s, o, a, l = function(e, i) {
                    t.call(this, "throwProps"), this._overwriteProps.length = 0
                },
                h = 999999999999999,
                c = _gsScope._gsDefine.globals,
                u = !1,
                p = {
                    x: 1,
                    y: 1,
                    z: 2,
                    scale: 1,
                    scaleX: 1,
                    scaleY: 1,
                    rotation: 1,
                    rotationZ: 1,
                    rotationX: 2,
                    rotationY: 2,
                    skewX: 1,
                    skewY: 1,
                    xPercent: 1,
                    yPercent: 1
                },
                f = function(t, e, i, n, r) {
                    var s, o, a, l, c = e.length,
                        u = 0,
                        p = h;
                    if ("object" == typeof t) {
                        for (; --c > -1;) {
                            s = e[c], o = 0;
                            for (a in t) l = s[a] - t[a], o += l * l;
                            p > o && (u = c, p = o)
                        }
                        if (h > (r || h) && r < Math.sqrt(p)) return t
                    } else
                        for (; --c > -1;) s = e[c], o = s - t, 0 > o && (o = -o), p > o && s >= n && i >= s && (u = c, p = o);
                    return e[u]
                },
                d = function(t, e, i, n, r, s) {
                    if ("auto" === t.end) return t;
                    var o, a, l = t.end;
                    if (i = isNaN(i) ? h : i, n = isNaN(n) ? -h : n, "object" == typeof e) {
                        if (o = e.calculated ? e : ("function" == typeof l ? l(e) : f(e, l, i, n, s)) || e, !e.calculated) {
                            for (a in o) e[a] = o[a];
                            e.calculated = !0
                        }
                        o = o[r]
                    } else o = "function" == typeof l ? l(e) : l instanceof Array ? f(e, l, i, n, s) : Number(l);
                    return o > i ? o = i : n > o && (o = n), {
                        max: o,
                        min: o,
                        unitFactor: t.unitFactor
                    }
                },
                m = function(t, e, i) {
                    for (var n in e) void 0 === t[n] && n !== i && (t[n] = e[n]);
                    return t
                },
                _ = l.calculateChange = function(t, n, r, s) {
                    return null == s && (s = .05), r * s * t / (n instanceof i ? n : n ? new i(n) : e.defaultEase).getRatio(s)
                },
                g = l.calculateDuration = function(t, n, r, s, o) {
                    o = o || .05;
                    var a = s instanceof i ? s : s ? new i(s) : e.defaultEase;
                    return Math.abs((n - t) * a.getRatio(o) / r / o)
                },
                v = l.calculateTweenDuration = function(t, r, s, o, a, h) {
                    if ("string" == typeof t && (t = e.selector(t)), !t) return 0;
                    null == s && (s = 10), null == o && (o = .2), null == a && (a = 1), t.length && (t = t[0] || t);
                    var c, p, f, v, y, x, w, T, b, P, k, S, C, O = 0,
                        E = 9999999999,
                        A = r.throwProps || r,
                        R = r.ease instanceof i ? r.ease : r.ease ? new i(r.ease) : e.defaultEase,
                        D = isNaN(A.checkpoint) ? .05 : Number(A.checkpoint),
                        M = isNaN(A.resistance) ? l.defaultResistance : Number(A.resistance);
                    if (A.linkedProps)
                        for (S = A.linkedProps.split(","), k = {}, C = 0; C < S.length; C++) c = S[C], (p = A[c]) && (void 0 !== p.velocity && "number" == typeof p.velocity ? v = Number(p.velocity) || 0 : (b = b || n.getByTarget(t), v = b && b.isTrackingProp(c) ? b.getVelocity(c) : 0), y = isNaN(p.resistance) ? M : Number(p.resistance), f = v * y > 0 ? v / y : v / -y, x = "function" == typeof t[c] ? t[c.indexOf("set") || "function" != typeof t["get" + c.substr(3)] ? c : "get" + c.substr(3)]() : t[c] || 0, k[c] = x + _(v, R, f, D));
                    for (c in A) "resistance" !== c && "checkpoint" !== c && "preventOvershoot" !== c && "linkedProps" !== c && "radius" !== c && (p = A[c], "object" != typeof p && (b = b || n.getByTarget(t), b && b.isTrackingProp(c) ? p = "number" == typeof p ? {
                        velocity: p
                    } : {
                        velocity: b.getVelocity(c)
                    } : (v = Number(p) || 0, f = v * M > 0 ? v / M : v / -M)), "object" == typeof p && (void 0 !== p.velocity && "number" == typeof p.velocity ? v = Number(p.velocity) || 0 : (b = b || n.getByTarget(t), v = b && b.isTrackingProp(c) ? b.getVelocity(c) : 0), y = isNaN(p.resistance) ? M : Number(p.resistance), f = v * y > 0 ? v / y : v / -y, x = "function" == typeof t[c] ? t[c.indexOf("set") || "function" != typeof t["get" + c.substr(3)] ? c : "get" + c.substr(3)]() : t[c] || 0, w = x + _(v, R, f, D), void 0 !== p.end && (p = d(p, k && c in k ? k : w, p.max, p.min, c, A.radius), (h || u) && (A[c] = m(p, A[c], "end"))), void 0 !== p.max && w > Number(p.max) + 1e-10 ? (P = p.unitFactor || l.defaultUnitFactors[c] || 1, T = x > p.max && p.min !== p.max || v * P > -15 && 45 > v * P ? o + .1 * (s - o) : g(x, p.max, v, R, D), E > T + a && (E = T + a)) : void 0 !== p.min && w < Number(p.min) - 1e-10 && (P = p.unitFactor || l.defaultUnitFactors[c] || 1, T = x < p.min && p.min !== p.max || v * P > -45 && 15 > v * P ? o + .1 * (s - o) : g(x, p.min, v, R, D), E > T + a && (E = T + a)), T > O && (O = T)), f > O && (O = f));
                    return O > E && (O = E), O > s ? s : o > O ? o : O
                },
                y = l.prototype = new t("throwProps");
            return y.constructor = l, l.version = "0.11.1", l.API = 2, l._autoCSS = !0, l.defaultResistance = 100, l.defaultUnitFactors = {
                time: 1e3,
                totalTime: 1e3
            }, l.track = function(t, e, i) {
                return n.track(t, e, i)
            }, l.untrack = function(t, e) {
                n.untrack(t, e)
            }, l.isTracking = function(t, e) {
                return n.isTracking(t, e)
            }, l.getVelocity = function(t, e) {
                var i = n.getByTarget(t);
                return i ? i.getVelocity(e) : NaN
            }, l._cssRegister = function() {
                var t = c.com.greensock.plugins.CSSPlugin;
                if (t) {
                    var e = t._internals,
                        i = e._parseToProxy,
                        o = e._setPluginRatio,
                        a = e.CSSPropTween;
                    e._registerComplexSpecialProp("throwProps", {
                        parser: function(t, e, h, c, u, f) {
                            f = new l;
                            var d, m, _, g, v = {},
                                y = {},
                                x = {},
                                w = {},
                                T = {},
                                b = {};
                            s = {};
                            for (m in e) "resistance" !== m && "preventOvershoot" !== m && "linkedProps" !== m && "radius" !== m && (d = e[m], "object" == typeof d ? (void 0 !== d.velocity && "number" == typeof d.velocity ? v[m] = Number(d.velocity) || 0 : (g = g || n.getByTarget(t), v[m] = g && g.isTrackingProp(m) ? g.getVelocity(m) : 0), void 0 !== d.end && (w[m] = d.end), void 0 !== d.min && (y[m] = d.min), void 0 !== d.max && (x[m] = d.max), d.preventOvershoot && (b[m] = !0), void 0 !== d.resistance && (!0, T[m] = d.resistance)) : "number" == typeof d ? v[m] = d : (g = g || n.getByTarget(t), g && g.isTrackingProp(m) ? v[m] = g.getVelocity(m) : v[m] = d || 0), p[m] && c._enableTransforms(2 === p[m]));
                            _ = i(t, v, c, u, f), r = _.proxy, v = _.end;
                            for (m in r) s[m] = {
                                velocity: v[m],
                                min: y[m],
                                max: x[m],
                                end: w[m],
                                resistance: T[m],
                                preventOvershoot: b[m]
                            };
                            return null != e.resistance && (s.resistance = e.resistance), null != e.linkedProps && (s.linkedProps = e.linkedProps), null != e.radius && (s.radius = e.radius), e.preventOvershoot && (s.preventOvershoot = !0), u = new a(t, "throwProps", 0, 0, _.pt, 2), c._overwriteProps.pop(), u.plugin = f, u.setRatio = o, u.data = _, f._onInitTween(r, s, c._tween), u
                        }
                    })
                }
            }, l.to = function(t, i, n, l, h) {
                i.throwProps || (i = {
                    throwProps: i
                }), 0 === h && (i.throwProps.preventOvershoot = !0), u = !0;
                var c = new e(t, l || 1, i);
                return c.render(0, !0, !0), c.vars.css ? (c.duration(v(r, {
                    throwProps: s,
                    ease: i.ease
                }, n, l, h)), c._delay && !c.vars.immediateRender ? c.invalidate() : o._onInitTween(r, a, c), u = !1, c) : (c.kill(), c = new e(t, v(t, i, n, l, h), i), u = !1, c)
            }, y._onInitTween = function(t, e, i, r) {
                this.target = t, this._props = [], o = this, a = e;
                var s, l, h, c, p, f, g, v, y, x, w, T, b = i._ease,
                    P = isNaN(e.checkpoint) ? .05 : Number(e.checkpoint),
                    k = i._duration,
                    S = e.preventOvershoot,
                    C = 0;
                if (e.linkedProps)
                    for (w = e.linkedProps.split(","), x = {}, T = 0; T < w.length; T++) s = w[T], (l = e[s]) && (void 0 !== l.velocity && "number" == typeof l.velocity ? p = Number(l.velocity) || 0 : (y = y || n.getByTarget(t), p = y && y.isTrackingProp(s) ? y.getVelocity(s) : 0), h = "function" == typeof t[s] ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : t[s] || 0, x[s] = h + _(p, b, k, P));
                for (s in e)
                    if ("resistance" !== s && "checkpoint" !== s && "preventOvershoot" !== s && "linkedProps" !== s && "radius" !== s) {
                        if (l = e[s], "function" == typeof l && (l = l(r, t)), "number" == typeof l) p = Number(l) || 0;
                        else if ("object" != typeof l || isNaN(l.velocity)) {
                            if (!(y = y || n.getByTarget(t)) || !y.isTrackingProp(s)) throw "ERROR: No velocity was defined in the throwProps tween of " + t + " property: " + s;
                            p = y.getVelocity(s)
                        } else p = Number(l.velocity);
                        f = _(p, b, k, P), v = 0, c = "function" == typeof t[s], h = c ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : t[s], "object" == typeof l && (g = h + f, void 0 !== l.end && (l = d(l, x && s in x ? x : g, l.max, l.min, s, e.radius), u && (e[s] = m(l, e[s], "end"))), void 0 !== l.max && Number(l.max) < g ? S || l.preventOvershoot ? f = l.max - h : v = l.max - h - f : void 0 !== l.min && Number(l.min) > g && (S || l.preventOvershoot ? f = l.min - h : v = l.min - h - f)), this._overwriteProps[C] = s, this._props[C++] = {
                            p: s,
                            s: h,
                            c1: f,
                            c2: v,
                            f: c,
                            r: !1
                        }
                    } return !0
            }, y._kill = function(e) {
                for (var i = this._props.length; --i > -1;) null != e[this._props[i].p] && this._props.splice(i, 1);
                return t.prototype._kill.call(this, e)
            }, y._mod = function(t) {
                for (var e, i = this._props, n = i.length; --n > -1;) "function" == typeof(e = t[i[n].p] || t.throwProps) && (i[n].m = e)
            }, y.setRatio = function(t) {
                for (var e, i, n = this._props.length; --n > -1;) e = this._props[n], i = e.s + e.c1 * t + e.c2 * t * t, e.m ? i = e.m(i, this.target) : 1 === t && (i = (1e4 * i + (0 > i ? -.5 : .5) | 0) / 1e4), e.f ? this.target[e.p](i) : this.target[e.p] = i
            }, t.activate([l]), l
        }, !0), _gsScope._gsDefine("utils.VelocityTracker", ["TweenLite"], function(t) {
            var e, i, n, r, s = /([A-Z])/g,
                o = {},
                a = _gsScope.document,
                l = {
                    x: 1,
                    y: 1,
                    z: 2,
                    scale: 1,
                    scaleX: 1,
                    scaleY: 1,
                    rotation: 1,
                    rotationZ: 1,
                    rotationX: 2,
                    rotationY: 2,
                    skewX: 1,
                    skewY: 1,
                    xPercent: 1,
                    yPercent: 1
                },
                h = a.defaultView ? a.defaultView.getComputedStyle : function() {},
                c = function(t, e, i) {
                    var n = (t._gsTransform || o)[e];
                    return n || 0 === n ? n : (t.style[e] ? n = t.style[e] : (i = i || h(t, null)) ? n = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(s, "-$1").toLowerCase()) : t.currentStyle && (n = t.currentStyle[e]), parseFloat(n) || 0)
                },
                u = t.ticker,
                p = function(t, e, i) {
                    this.p = t, this.f = e, this.v1 = this.v2 = 0, this.t1 = this.t2 = u.time,
                        this.css = !1, this.type = "", this._prev = null, i && (this._next = i, i._prev = this)
                },
                f = function() {
                    var t, i, s = e,
                        o = u.time;
                    if (o - n >= .03)
                        for (r = n, n = o; s;) {
                            for (i = s._firstVP; i;) t = i.css ? c(s.target, i.p) : i.f ? s.target[i.p]() : s.target[i.p], (t !== i.v1 || o - i.t1 > .15) && (i.v2 = i.v1, i.v1 = t, i.t2 = i.t1, i.t1 = o), i = i._next;
                            s = s._next
                        }
                },
                d = function(t) {
                    this._lookup = {}, this.target = t, this.elem = !(!t.style || !t.nodeType), i || (u.addEventListener("tick", f, null, !1, -100), n = r = u.time, i = !0), e && (this._next = e, e._prev = this), e = this
                },
                m = d.getByTarget = function(t) {
                    for (var i = e; i;) {
                        if (i.target === t) return i;
                        i = i._next
                    }
                },
                _ = d.prototype;
            return _.addProp = function(e, i) {
                if (!this._lookup[e]) {
                    var n = this.target,
                        r = "function" == typeof n[e],
                        s = r ? this._altProp(e) : e,
                        o = this._firstVP;
                    this._firstVP = this._lookup[e] = this._lookup[s] = o = new p(s !== e && 0 === e.indexOf("set") ? s : e, r, o), o.css = this.elem && (void 0 !== this.target.style[o.p] || l[o.p]), o.css && l[o.p] && !n._gsTransform && t.set(n, {
                        x: "+=0",
                        overwrite: !1
                    }), o.type = i || o.css && 0 === e.indexOf("rotation") ? "deg" : "", o.v1 = o.v2 = o.css ? c(n, o.p) : r ? n[o.p]() : n[o.p]
                }
            }, _.removeProp = function(t) {
                var e = this._lookup[t];
                e && (e._prev ? e._prev._next = e._next : e === this._firstVP && (this._firstVP = e._next), e._next && (e._next._prev = e._prev), this._lookup[t] = 0, e.f && (this._lookup[this._altProp(t)] = 0))
            }, _.isTrackingProp = function(t) {
                return this._lookup[t] instanceof p
            }, _.getVelocity = function(t) {
                var e, i, n, r = this._lookup[t],
                    s = this.target;
                if (!r) throw "The velocity of " + t + " is not being tracked.";
                return e = r.css ? c(s, r.p) : r.f ? s[r.p]() : s[r.p], i = e - r.v2, ("rad" === r.type || "deg" === r.type) && (n = "rad" === r.type ? 2 * Math.PI : 360, (i %= n) !== i % (n / 2) && (i = 0 > i ? i + n : i - n)), i / (u.time - r.t2)
            }, _._altProp = function(t) {
                var e = t.substr(0, 3),
                    i = ("get" === e ? "set" : "set" === e ? "get" : e) + t.substr(3);
                return "function" == typeof this.target[i] ? i : t
            }, d.getByTarget = function(i) {
                var n = e;
                for ("string" == typeof i && (i = t.selector(i)), i.length && i !== window && i[0] && i[0].style && !i.nodeType && (i = i[0]); n;) {
                    if (n.target === i) return n;
                    n = n._next
                }
            }, d.track = function(t, e, i) {
                var n = m(t),
                    r = e.split(","),
                    s = r.length;
                for (i = (i || "").split(","), n || (n = new d(t)); --s > -1;) n.addProp(r[s], i[s] || i[0]);
                return n
            }, d.untrack = function(t, i) {
                var n = m(t),
                    r = (i || "").split(","),
                    s = r.length;
                if (n) {
                    for (; --s > -1;) n.removeProp(r[s]);
                    n._firstVP && i || (n._prev ? n._prev._next = n._next : n === e && (e = n._next), n._next && (n._next._prev = n._prev))
                }
            }, d.isTracking = function(t, e) {
                var i = m(t);
                return !!i && (!(e || !i._firstVP) || i.isTrackingProp(e))
            }, d
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t) {
        "use strict";
        var e = function() {
            return (_gsScope.GreenSockGlobals || _gsScope).ThrowPropsPlugin
        };
        "undefined" != typeof module && module.exports ? (require("../TweenLite.min.js"), module.exports = e()) : "function" == typeof define && define.amd && define(["TweenLite"], e)
    }();
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var n = function(t) {
                        var e, i = [],
                            n = t.length;
                        for (e = 0; e !== n; i.push(t[e++]));
                        return i
                    },
                    r = function(t, e, i) {
                        var n, r, s = t.cycle;
                        for (n in s) r = s[n], t[n] = "function" == typeof r ? r(i, e[i]) : r[i % r.length];
                        delete t.cycle
                    },
                    s = function(t, e, n) {
                        i.call(this, t, e, n), this._cycle = 0, this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = s.prototype.render
                    },
                    o = 1e-10,
                    a = i._internals,
                    l = a.isSelector,
                    h = a.isArray,
                    c = s.prototype = i.to({}, .1, {}),
                    u = [];
                s.version = "1.20.2", c.constructor = s, c.kill()._gc = !1, s.killTweensOf = s.killDelayedCallsTo = i.killTweensOf, s.getTweensOf = i.getTweensOf, s.lagSmoothing = i.lagSmoothing, s.ticker = i.ticker, s.render = i.render, c.invalidate = function() {
                    return this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._yoyoEase = null, this._uncache(!0), i.prototype.invalidate.call(this)
                }, c.updateTo = function(t, e) {
                    var n, r = this.ratio,
                        s = this.vars.immediateRender || t.immediateRender;
                    e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                    for (n in t) this.vars[n] = t[n];
                    if (this._initted || s)
                        if (e) this._initted = !1, s && this.render(0, !0, !0);
                        else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                        var o = this._totalTime;
                        this.render(0, !0, !1), this._initted = !1, this.render(o, !0, !1)
                    } else if (this._initted = !1, this._init(), this._time > 0 || s)
                        for (var a, l = 1 / (1 - r), h = this._firstPT; h;) a = h.s + h.c, h.c *= l, h.s = a - h.c, h = h._next;
                    return this
                }, c.render = function(t, e, n) {
                    this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                    var r, s, l, h, c, u, p, f, d, m = this._dirty ? this.totalDuration() : this._totalDuration,
                        _ = this._time,
                        g = this._totalTime,
                        v = this._cycle,
                        y = this._duration,
                        x = this._rawPrevTime;
                    if (t >= m - 1e-7 && t >= 0 ? (this._totalTime = m, this._cycle = this._repeat, this._yoyo && 0 != (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = y, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (r = !0, s = "onComplete", n = n || this._timeline.autoRemoveChildren), 0 === y && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (t = 0), (0 > x || 0 >= t && t >= -1e-7 || x === o && "isPause" !== this.data) && x !== t && (n = !0, x > o && (s = "onReverseComplete")), this._rawPrevTime = f = !e || t || x === t ? t : o)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== g || 0 === y && x > 0) && (s = "onReverseComplete", r = this._reversed), 0 > t && (this._active = !1, 0 === y && (this._initted || !this.vars.lazy || n) && (x >= 0 && (n = !0), this._rawPrevTime = f = !e || t || x === t ? t : o)), this._initted || (n = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (h = y + this._repeatDelay, this._cycle = this._totalTime / h >> 0, 0 !== this._cycle && this._cycle === this._totalTime / h && t >= g && this._cycle--, this._time = this._totalTime - this._cycle * h, this._yoyo && 0 != (1 & this._cycle) && (this._time = y - this._time, (d = this._yoyoEase || this.vars.yoyoEase) && (this._yoyoEase || (!0 !== d || this._initted ? this._yoyoEase = d = !0 === d ? this._ease : d instanceof Ease ? d : Ease.map[d] : (d = this.vars.ease, this._yoyoEase = d = d ? d instanceof Ease ? d : "function" == typeof d ? new Ease(d, this.vars.easeParams) : Ease.map[d] || i.defaultEase : i.defaultEase)), this.ratio = d ? 1 - d.getRatio((y - this._time) / y) : 0)), this._time > y ? this._time = y : this._time < 0 && (this._time = 0)), this._easeType && !d ? (c = this._time / y, u = this._easeType, p = this._easePower, (1 === u || 3 === u && c >= .5) && (c = 1 - c), 3 === u && (c *= 2), 1 === p ? c *= c : 2 === p ? c *= c * c : 3 === p ? c *= c * c * c : 4 === p && (c *= c * c * c * c), 1 === u ? this.ratio = 1 - c : 2 === u ? this.ratio = c : this._time / y < .5 ? this.ratio = c / 2 : this.ratio = 1 - c / 2) : d || (this.ratio = this._ease.getRatio(this._time / y))), _ === this._time && !n && v === this._cycle) return void(g !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!n && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = _, this._totalTime = g, this._rawPrevTime = x, this._cycle = v, a.lazyTweens.push(this), void(this._lazy = [t, e]);
                        !this._time || r || d ? r && this._ease._calcEnd && !d && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) : this.ratio = this._ease.getRatio(this._time / y)
                    }
                    for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== _ && t >= 0 && (this._active = !0), 0 === g && (2 === this._initted && t > 0 && this._init(), this._startAt && (t >= 0 ? this._startAt.render(t, e, n) : s || (s = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === y) && (e || this._callback("onStart"))), l = this._firstPT; l;) l.f ? l.t[l.p](l.c * this.ratio + l.s) : l.t[l.p] = l.c * this.ratio + l.s, l = l._next;
                    this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, n), e || (this._totalTime !== g || s) && this._callback("onUpdate")), this._cycle !== v && (e || this._gc || this.vars.onRepeat && this._callback("onRepeat")), s && (!this._gc || n) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, n), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[s] && this._callback(s), 0 === y && this._rawPrevTime === o && f !== o && (this._rawPrevTime = 0))
                }, s.to = function(t, e, i) {
                    return new s(t, e, i)
                }, s.from = function(t, e, i) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new s(t, e, i)
                }, s.fromTo = function(t, e, i, n) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new s(t, e, n)
                }, s.staggerTo = s.allTo = function(t, e, o, a, c, p, f) {
                    a = a || 0;
                    var d, m, _, g, v = 0,
                        y = [],
                        x = function() {
                            o.onComplete && o.onComplete.apply(o.onCompleteScope || this, arguments), c.apply(f || o.callbackScope || this, p || u)
                        },
                        w = o.cycle,
                        T = o.startAt && o.startAt.cycle;
                    for (h(t) || ("string" == typeof t && (t = i.selector(t) || t), l(t) && (t = n(t))), t = t || [], 0 > a && (t = n(t), t.reverse(), a *= -1), d = t.length - 1, _ = 0; d >= _; _++) {
                        m = {};
                        for (g in o) m[g] = o[g];
                        if (w && (r(m, t, _), null != m.duration && (e = m.duration, delete m.duration)), T) {
                            T = m.startAt = {};
                            for (g in o.startAt) T[g] = o.startAt[g];
                            r(m.startAt, t, _)
                        }
                        m.delay = v + (m.delay || 0), _ === d && c && (m.onComplete = x), y[_] = new s(t[_], e, m), v += a
                    }
                    return y
                }, s.staggerFrom = s.allFrom = function(t, e, i, n, r, o, a) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, s.staggerTo(t, e, i, n, r, o, a)
                }, s.staggerFromTo = s.allFromTo = function(t, e, i, n, r, o, a, l) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, s.staggerTo(t, e, n, r, o, a, l)
                }, s.delayedCall = function(t, e, i, n, r) {
                    return new s(e, 0, {
                        delay: t,
                        onComplete: e,
                        onCompleteParams: i,
                        callbackScope: n,
                        onReverseComplete: e,
                        onReverseCompleteParams: i,
                        immediateRender: !1,
                        useFrames: r,
                        overwrite: 0
                    })
                }, s.set = function(t, e) {
                    return new s(t, 0, e)
                }, s.isTweening = function(t) {
                    return i.getTweensOf(t, !0).length > 0
                };
                var p = function(t, e) {
                        for (var n = [], r = 0, s = t._first; s;) s instanceof i ? n[r++] = s : (e && (n[r++] = s), n = n.concat(p(s, e)), r = n.length), s = s._next;
                        return n
                    },
                    f = s.getAllTweens = function(e) {
                        return p(t._rootTimeline, e).concat(p(t._rootFramesTimeline, e))
                    };
                s.killAll = function(t, i, n, r) {
                    null == i && (i = !0), null == n && (n = !0);
                    var s, o, a, l = f(0 != r),
                        h = l.length,
                        c = i && n && r;
                    for (a = 0; h > a; a++) o = l[a], (c || o instanceof e || (s = o.target === o.vars.onComplete) && n || i && !s) && (t ? o.totalTime(o._reversed ? 0 : o.totalDuration()) : o._enabled(!1, !1))
                }, s.killChildTweensOf = function(t, e) {
                    if (null != t) {
                        var r, o, c, u, p, f = a.tweenLookup;
                        if ("string" == typeof t && (t = i.selector(t) || t), l(t) && (t = n(t)), h(t))
                            for (u = t.length; --u > -1;) s.killChildTweensOf(t[u], e);
                        else {
                            r = [];
                            for (c in f)
                                for (o = f[c].target.parentNode; o;) o === t && (r = r.concat(f[c].tweens)), o = o.parentNode;
                            for (p = r.length, u = 0; p > u; u++) e && r[u].totalTime(r[u].totalDuration()), r[u]._enabled(!1, !1)
                        }
                    }
                };
                var d = function(t, i, n, r) {
                    i = !1 !== i, n = !1 !== n, r = !1 !== r;
                    for (var s, o, a = f(r), l = i && n && r, h = a.length; --h > -1;) o = a[h], (l || o instanceof e || (s = o.target === o.vars.onComplete) && n || i && !s) && o.paused(t)
                };
                return s.pauseAll = function(t, e, i) {
                    d(!0, t, e, i)
                }, s.resumeAll = function(t, e, i) {
                    d(!1, t, e, i)
                }, s.globalTimeScale = function(e) {
                    var n = t._rootTimeline,
                        r = i.ticker.time;
                    return arguments.length ? (e = e || o, n._startTime = r - (r - n._startTime) * n._timeScale / e, n = t._rootFramesTimeline, r = i.ticker.frame, n._startTime = r - (r - n._startTime) * n._timeScale / e, n._timeScale = t._rootTimeline._timeScale = e, e) : n._timeScale
                }, c.progress = function(t, e) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
                }, c.totalProgress = function(t, e) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
                }, c.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                }, c.duration = function(e) {
                    return arguments.length ? t.prototype.duration.call(this, e) : this._duration
                }, c.totalDuration = function(t) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
                }, c.repeat = function(t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                }, c.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                }, c.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, s
            }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var n = function(t) {
                        e.call(this, t), this._labels = {}, this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren, this.smoothChildTiming = !0 === this.vars.smoothChildTiming, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                        var i, n, r = this.vars;
                        for (n in r) i = r[n], l(i) && -1 !== i.join("").indexOf("{self}") && (r[n] = this._swapSelfInParams(i));
                        l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
                    },
                    r = 1e-10,
                    s = i._internals,
                    o = n._internals = {},
                    a = s.isSelector,
                    l = s.isArray,
                    h = s.lazyTweens,
                    c = s.lazyRender,
                    u = _gsScope._gsDefine.globals,
                    p = function(t) {
                        var e, i = {};
                        for (e in t) i[e] = t[e];
                        return i
                    },
                    f = function(t, e, i) {
                        var n, r, s = t.cycle;
                        for (n in s) r = s[n], t[n] = "function" == typeof r ? r(i, e[i]) : r[i % r.length];
                        delete t.cycle
                    },
                    d = o.pauseCallback = function() {},
                    m = function(t) {
                        var e, i = [],
                            n = t.length;
                        for (e = 0; e !== n; i.push(t[e++]));
                        return i
                    },
                    _ = n.prototype = new e;
                return n.version = "1.20.2", _.constructor = n, _.kill()._gc = _._forcingPlayhead = _._hasPause = !1, _.to = function(t, e, n, r) {
                    var s = n.repeat && u.TweenMax || i;
                    return e ? this.add(new s(t, e, n), r) : this.set(t, n, r)
                }, _.from = function(t, e, n, r) {
                    return this.add((n.repeat && u.TweenMax || i).from(t, e, n), r)
                }, _.fromTo = function(t, e, n, r, s) {
                    var o = r.repeat && u.TweenMax || i;
                    return e ? this.add(o.fromTo(t, e, n, r), s) : this.set(t, r, s)
                }, _.staggerTo = function(t, e, r, s, o, l, h, c) {
                    var u, d, _ = new n({
                            onComplete: l,
                            onCompleteParams: h,
                            callbackScope: c,
                            smoothChildTiming: this.smoothChildTiming
                        }),
                        g = r.cycle;
                    for ("string" == typeof t && (t = i.selector(t) || t), t = t || [], a(t) && (t = m(t)), s = s || 0, 0 > s && (t = m(t), t.reverse(), s *= -1), d = 0; d < t.length; d++) u = p(r), u.startAt && (u.startAt = p(u.startAt), u.startAt.cycle && f(u.startAt, t, d)), g && (f(u, t, d), null != u.duration && (e = u.duration, delete u.duration)), _.to(t[d], e, u, d * s);
                    return this.add(_, o)
                }, _.staggerFrom = function(t, e, i, n, r, s, o, a) {
                    return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, n, r, s, o, a)
                }, _.staggerFromTo = function(t, e, i, n, r, s, o, a, l) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, n, r, s, o, a, l)
                }, _.call = function(t, e, n, r) {
                    return this.add(i.delayedCall(0, t, e, n), r)
                }, _.set = function(t, e, n) {
                    return n = this._parseTimeOrLabel(n, 0, !0), null == e.immediateRender && (e.immediateRender = n === this._time && !this._paused), this.add(new i(t, 0, e), n)
                }, n.exportRoot = function(t, e) {
                    t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
                    var r, s, o = new n(t),
                        a = o._timeline;
                    for (null == e && (e = !0), a._remove(o, !0), o._startTime = 0, o._rawPrevTime = o._time = o._totalTime = a._time, r = a._first; r;) s = r._next, e && r instanceof i && r.target === r.vars.onComplete || o.add(r, r._startTime - r._delay), r = s;
                    return a.add(o, 0), o
                }, _.add = function(r, s, o, a) {
                    var h, c, u, p, f, d;
                    if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, r)), !(r instanceof t)) {
                        if (r instanceof Array || r && r.push && l(r)) {
                            for (o = o || "normal", a = a || 0, h = s, c = r.length, u = 0; c > u; u++) l(p = r[u]) && (p = new n({
                                tweens: p
                            })), this.add(p, h), "string" != typeof p && "function" != typeof p && ("sequence" === o ? h = p._startTime + p.totalDuration() / p._timeScale : "start" === o && (p._startTime -= p.delay())), h += a;
                            return this._uncache(!0)
                        }
                        if ("string" == typeof r) return this.addLabel(r, s);
                        if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                        r = i.delayedCall(0, r)
                    }
                    if (e.prototype.add.call(this, r, s), r._time && r.render((this.rawTime() - r._startTime) * r._timeScale, !1, !1), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                        for (f = this, d = f.rawTime() > r._startTime; f._timeline;) d && f._timeline.smoothChildTiming ? f.totalTime(f._totalTime, !0) : f._gc && f._enabled(!0, !1), f = f._timeline;
                    return this
                }, _.remove = function(e) {
                    if (e instanceof t) {
                        this._remove(e, !1);
                        var i = e._timeline = e.vars.useFrames ? t._rootFramesTimeline : t._rootTimeline;
                        return e._startTime = (e._paused ? e._pauseTime : i._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale, this
                    }
                    if (e instanceof Array || e && e.push && l(e)) {
                        for (var n = e.length; --n > -1;) this.remove(e[n]);
                        return this
                    }
                    return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
                }, _._remove = function(t, i) {
                    return e.prototype._remove.call(this, t, i), this._last ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
                }, _.append = function(t, e) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
                }, _.insert = _.insertMultiple = function(t, e, i, n) {
                    return this.add(t, e || 0, i, n)
                }, _.appendMultiple = function(t, e, i, n) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, n)
                }, _.addLabel = function(t, e) {
                    return this._labels[t] = this._parseTimeOrLabel(e), this
                }, _.addPause = function(t, e, n, r) {
                    var s = i.delayedCall(0, d, n, r || this);
                    return s.vars.onComplete = s.vars.onReverseComplete = e, s.data = "isPause", this._hasPause = !0, this.add(s, t)
                }, _.removeLabel = function(t) {
                    return delete this._labels[t], this
                }, _.getLabelTime = function(t) {
                    return null != this._labels[t] ? this._labels[t] : -1
                }, _._parseTimeOrLabel = function(e, i, n, r) {
                    var s, o;
                    if (r instanceof t && r.timeline === this) this.remove(r);
                    else if (r && (r instanceof Array || r.push && l(r)))
                        for (o = r.length; --o > -1;) r[o] instanceof t && r[o].timeline === this && this.remove(r[o]);
                    if (s = this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration, "string" == typeof i) return this._parseTimeOrLabel(i, n && "number" == typeof e && null == this._labels[i] ? e - s : 0, n);
                    if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = s);
                    else {
                        if (-1 === (o = e.indexOf("="))) return null == this._labels[e] ? n ? this._labels[e] = s + i : i : this._labels[e] + i;
                        i = parseInt(e.charAt(o - 1) + "1", 10) * Number(e.substr(o + 1)), e = o > 1 ? this._parseTimeOrLabel(e.substr(0, o - 1), 0, n) : s
                    }
                    return Number(e) + i
                }, _.seek = function(t, e) {
                    return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), !1 !== e)
                }, _.stop = function() {
                    return this.paused(!0)
                }, _.gotoAndPlay = function(t, e) {
                    return this.play(t, e)
                }, _.gotoAndStop = function(t, e) {
                    return this.pause(t, e)
                }, _.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var n, s, o, a, l, u, p, f = this._dirty ? this.totalDuration() : this._totalDuration,
                        d = this._time,
                        m = this._startTime,
                        _ = this._timeScale,
                        g = this._paused;
                    if (t >= f - 1e-7 && t >= 0) this._totalTime = this._time = f, this._reversed || this._hasPausedChild() || (s = !0, a = "onComplete", l = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= t && t >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (l = !0, this._rawPrevTime > r && (a = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = f + 1e-4;
                    else if (1e-7 > t)
                        if (this._totalTime = this._time = 0, (0 !== d || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (a = "onReverseComplete", s = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (l = s = !0, a = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t;
                        else {
                            if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, 0 === t && s)
                                for (n = this._first; n && 0 === n._startTime;) n._duration || (s = !1), n = n._next;
                            t = 0, this._initted || (l = !0)
                        }
                    else {
                        if (this._hasPause && !this._forcingPlayhead && !e) {
                            if (t >= d)
                                for (n = this._first; n && n._startTime <= t && !u;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (u = n), n = n._next;
                            else
                                for (n = this._last; n && n._startTime >= t && !u;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (u = n), n = n._prev;
                            u && (this._time = t = u._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                        }
                        this._totalTime = this._time = this._rawPrevTime = t
                    }
                    if (this._time !== d && this._first || i || l || u) {
                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== d && t > 0 && (this._active = !0), 0 === d && this.vars.onStart && (0 === this._time && this._duration || e || this._callback("onStart")), (p = this._time) >= d)
                            for (n = this._first; n && (o = n._next, p === this._time && (!this._paused || g));)(n._active || n._startTime <= p && !n._paused && !n._gc) && (u === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = o;
                        else
                            for (n = this._last; n && (o = n._prev, p === this._time && (!this._paused || g));) {
                                if (n._active || n._startTime <= d && !n._paused && !n._gc) {
                                    if (u === n) {
                                        for (u = n._prev; u && u.endTime() > this._time;) u.render(u._reversed ? u.totalDuration() - (t - u._startTime) * u._timeScale : (t - u._startTime) * u._timeScale, e, i), u = u._prev;
                                        u = null, this.pause()
                                    }
                                    n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)
                                }
                                n = o
                            }
                        this._onUpdate && (e || (h.length && c(), this._callback("onUpdate"))), a && (this._gc || (m === this._startTime || _ !== this._timeScale) && (0 === this._time || f >= this.totalDuration()) && (s && (h.length && c(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[a] && this._callback(a)))
                    }
                }, _._hasPausedChild = function() {
                    for (var t = this._first; t;) {
                        if (t._paused || t instanceof n && t._hasPausedChild()) return !0;
                        t = t._next
                    }
                    return !1
                }, _.getChildren = function(t, e, n, r) {
                    r = r || -9999999999;
                    for (var s = [], o = this._first, a = 0; o;) o._startTime < r || (o instanceof i ? !1 !== e && (s[a++] = o) : (!1 !== n && (s[a++] = o), !1 !== t && (s = s.concat(o.getChildren(!0, e, n)), a = s.length))), o = o._next;
                    return s
                }, _.getTweensOf = function(t, e) {
                    var n, r, s = this._gc,
                        o = [],
                        a = 0;
                    for (s && this._enabled(!0, !0), n = i.getTweensOf(t), r = n.length; --r > -1;)(n[r].timeline === this || e && this._contains(n[r])) && (o[a++] = n[r]);
                    return s && this._enabled(!1, !0), o
                }, _.recent = function() {
                    return this._recent
                }, _._contains = function(t) {
                    for (var e = t.timeline; e;) {
                        if (e === this) return !0;
                        e = e.timeline
                    }
                    return !1
                }, _.shiftChildren = function(t, e, i) {
                    i = i || 0;
                    for (var n, r = this._first, s = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
                    if (e)
                        for (n in s) s[n] >= i && (s[n] += t);
                    return this._uncache(!0)
                }, _._kill = function(t, e) {
                    if (!t && !e) return this._enabled(!1, !1);
                    for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), n = i.length, r = !1; --n > -1;) i[n]._kill(t, e) && (r = !0);
                    return r
                }, _.clear = function(t) {
                    var e = this.getChildren(!1, !0, !0),
                        i = e.length;
                    for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
                    return !1 !== t && (this._labels = {}), this._uncache(!0)
                }, _.invalidate = function() {
                    for (var e = this._first; e;) e.invalidate(), e = e._next;
                    return t.prototype.invalidate.call(this)
                }, _._enabled = function(t, i) {
                    if (t === this._gc)
                        for (var n = this._first; n;) n._enabled(t, !0), n = n._next;
                    return e.prototype._enabled.call(this, t, i)
                }, _.totalTime = function(e, i, n) {
                    this._forcingPlayhead = !0;
                    var r = t.prototype.totalTime.apply(this, arguments);
                    return this._forcingPlayhead = !1, r
                }, _.duration = function(t) {
                    return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
                }, _.totalDuration = function(t) {
                    if (!arguments.length) {
                        if (this._dirty) {
                            for (var e, i, n = 0, r = this._last, s = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > s && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : s = r._startTime, r._startTime < 0 && !r._paused && (n -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), s = 0), i = r._startTime + r._totalDuration / r._timeScale, i > n && (n = i), r = e;
                            this._duration = this._totalDuration = n, this._dirty = !1
                        }
                        return this._totalDuration
                    }
                    return t && this.totalDuration() ? this.timeScale(this._totalDuration / t) : this
                }, _.paused = function(e) {
                    if (!e)
                        for (var i = this._first, n = this._time; i;) i._startTime === n && "isPause" === i.data && (i._rawPrevTime = 0), i = i._next;
                    return t.prototype.paused.apply(this, arguments)
                }, _.usesFrames = function() {
                    for (var e = this._timeline; e._timeline;) e = e._timeline;
                    return e === t._rootFramesTimeline
                }, _.rawTime = function(t) {
                    return t && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(t) - this._startTime) * this._timeScale
                }, n
            }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(t, e, i) {
                var n = function(e) {
                        t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = !0 === this.vars.yoyo, this._dirty = !0
                    },
                    r = 1e-10,
                    s = e._internals,
                    o = s.lazyTweens,
                    a = s.lazyRender,
                    l = _gsScope._gsDefine.globals,
                    h = new i(null, null, 1, 0),
                    c = n.prototype = new t;
                return c.constructor = n, c.kill()._gc = !1, n.version = "1.20.2", c.invalidate = function() {
                    return this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
                }, c.addCallback = function(t, i, n, r) {
                    return this.add(e.delayedCall(0, t, n, r), i)
                }, c.removeCallback = function(t, e) {
                    if (t)
                        if (null == e) this._kill(null, t);
                        else
                            for (var i = this.getTweensOf(t, !1), n = i.length, r = this._parseTimeOrLabel(e); --n > -1;) i[n]._startTime === r && i[n]._enabled(!1, !1);
                    return this
                }, c.removePause = function(e) {
                    return this.removeCallback(t._internals.pauseCallback, e)
                }, c.tweenTo = function(t, i) {
                    i = i || {};
                    var n, r, s, o = {
                            ease: h,
                            useFrames: this.usesFrames(),
                            immediateRender: !1
                        },
                        a = i.repeat && l.TweenMax || e;
                    for (r in i) o[r] = i[r];
                    return o.time = this._parseTimeOrLabel(t), n = Math.abs(Number(o.time) - this._time) / this._timeScale || .001, s = new a(this, n, o), o.onStart = function() {
                        s.target.paused(!0), s.vars.time !== s.target.time() && n === s.duration() && s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || i.callbackScope || s, i.onStartParams || [])
                    }, s
                }, c.tweenFromTo = function(t, e, i) {
                    i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
                        onComplete: this.seek,
                        onCompleteParams: [t],
                        callbackScope: this
                    }, i.immediateRender = !1 !== i.immediateRender;
                    var n = this.tweenTo(e, i);
                    return n.duration(Math.abs(n.vars.time - t) / this._timeScale || .001)
                }, c.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var n, s, l, h, c, u, p, f, d = this._dirty ? this.totalDuration() : this._totalDuration,
                        m = this._duration,
                        _ = this._time,
                        g = this._totalTime,
                        v = this._startTime,
                        y = this._timeScale,
                        x = this._rawPrevTime,
                        w = this._paused,
                        T = this._cycle;
                    if (t >= d - 1e-7 && t >= 0) this._locked || (this._totalTime = d, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (s = !0, h = "onComplete", c = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= t && t >= -1e-7 || 0 > x || x === r) && x !== t && this._first && (c = !0, x > r && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, this._yoyo && 0 != (1 & this._cycle) ? this._time = t = 0 : (this._time = m, t = m + 1e-4);
                    else if (1e-7 > t)
                        if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== _ || 0 === m && x !== r && (x > 0 || 0 > t && x >= 0) && !this._locked) && (h = "onReverseComplete", s = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (c = s = !0, h = "onReverseComplete") : x >= 0 && this._first && (c = !0), this._rawPrevTime = t;
                        else {
                            if (this._rawPrevTime = m || !e || t || this._rawPrevTime === t ? t : r, 0 === t && s)
                                for (n = this._first; n && 0 === n._startTime;) n._duration || (s = !1), n = n._next;
                            t = 0, this._initted || (c = !0)
                        }
                    else if (0 === m && 0 > x && (c = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (u = m + this._repeatDelay, this._cycle = this._totalTime / u >> 0, 0 !== this._cycle && this._cycle === this._totalTime / u && t >= g && this._cycle--, this._time = this._totalTime - this._cycle * u, this._yoyo && 0 != (1 & this._cycle) && (this._time = m - this._time), this._time > m ? (this._time = m, t = m + 1e-4) : this._time < 0 ? this._time = t = 0 : t = this._time)), this._hasPause && !this._forcingPlayhead && !e) {
                        if ((t = this._time) >= _ || this._repeat && T !== this._cycle)
                            for (n = this._first; n && n._startTime <= t && !p;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (p = n), n = n._next;
                        else
                            for (n = this._last; n && n._startTime >= t && !p;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (p = n), n = n._prev;
                        p && p._startTime < m && (this._time = t = p._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                    }
                    if (this._cycle !== T && !this._locked) {
                        var b = this._yoyo && 0 != (1 & T),
                            P = b === (this._yoyo && 0 != (1 & this._cycle)),
                            k = this._totalTime,
                            S = this._cycle,
                            C = this._rawPrevTime,
                            O = this._time;
                        if (this._totalTime = T * m, this._cycle < T ? b = !b : this._totalTime += m, this._time = _, this._rawPrevTime = 0 === m ? x - 1e-4 : x, this._cycle = T, this._locked = !0, _ = b ? 0 : m, this.render(_, e, 0 === m), e || this._gc || this.vars.onRepeat && (this._cycle = S, this._locked = !1, this._callback("onRepeat")), _ !== this._time) return;
                        if (P && (this._cycle = T, this._locked = !0, _ = b ? m + 1e-4 : -1e-4, this.render(_, !0, !1)), this._locked = !1, this._paused && !w) return;
                        this._time = O, this._totalTime = k, this._cycle = S, this._rawPrevTime = C
                    }
                    if (!(this._time !== _ && this._first || i || c || p)) return void(g !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== g && t > 0 && (this._active = !0), 0 === g && this.vars.onStart && (0 === this._totalTime && this._totalDuration || e || this._callback("onStart")), (f = this._time) >= _)
                        for (n = this._first; n && (l = n._next, f === this._time && (!this._paused || w));)(n._active || n._startTime <= this._time && !n._paused && !n._gc) && (p === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = l;
                    else
                        for (n = this._last; n && (l = n._prev, f === this._time && (!this._paused || w));) {
                            if (n._active || n._startTime <= _ && !n._paused && !n._gc) {
                                if (p === n) {
                                    for (p = n._prev; p && p.endTime() > this._time;) p.render(p._reversed ? p.totalDuration() - (t - p._startTime) * p._timeScale : (t - p._startTime) * p._timeScale, e, i), p = p._prev;
                                    p = null, this.pause()
                                }
                                n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)
                            }
                            n = l
                        }
                    this._onUpdate && (e || (o.length && a(), this._callback("onUpdate"))), h && (this._locked || this._gc || (v === this._startTime || y !== this._timeScale) && (0 === this._time || d >= this.totalDuration()) && (s && (o.length && a(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[h] && this._callback(h)))
                }, c.getActive = function(t, e, i) {
                    null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
                    var n, r, s = [],
                        o = this.getChildren(t, e, i),
                        a = 0,
                        l = o.length;
                    for (n = 0; l > n; n++) r = o[n], r.isActive() && (s[a++] = r);
                    return s
                }, c.getLabelAfter = function(t) {
                    t || 0 !== t && (t = this._time);
                    var e, i = this.getLabelsArray(),
                        n = i.length;
                    for (e = 0; n > e; e++)
                        if (i[e].time > t) return i[e].name;
                    return null
                }, c.getLabelBefore = function(t) {
                    null == t && (t = this._time);
                    for (var e = this.getLabelsArray(), i = e.length; --i > -1;)
                        if (e[i].time < t) return e[i].name;
                    return null
                }, c.getLabelsArray = function() {
                    var t, e = [],
                        i = 0;
                    for (t in this._labels) e[i++] = {
                        time: this._labels[t],
                        name: t
                    };
                    return e.sort(function(t, e) {
                        return t.time - e.time
                    }), e
                }, c.invalidate = function() {
                    return this._locked = !1, t.prototype.invalidate.call(this)
                }, c.progress = function(t, e) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration() || 0
                }, c.totalProgress = function(t, e) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration() || 0
                }, c.totalDuration = function(e) {
                    return arguments.length ? -1 !== this._repeat && e ? this.timeScale(this.totalDuration() / e) : this : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                }, c.time = function(t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                }, c.repeat = function(t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                }, c.repeatDelay = function(t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                }, c.yoyo = function(t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, c.currentLabel = function(t) {
                    return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
                }, n
            }, !0),
            function() {
                var t = 180 / Math.PI,
                    e = [],
                    i = [],
                    n = [],
                    r = {},
                    s = _gsScope._gsDefine.globals,
                    o = function(t, e, i, n) {
                        i === n && (i = n - (n - e) / 1e6), t === e && (e = t + (i - t) / 1e6), this.a = t, this.b = e, this.c = i, this.d = n, this.da = n - t, this.ca = i - t, this.ba = e - t
                    },
                    a = function(t, e, i, n) {
                        var r = {
                                a: t
                            },
                            s = {},
                            o = {},
                            a = {
                                c: n
                            },
                            l = (t + e) / 2,
                            h = (e + i) / 2,
                            c = (i + n) / 2,
                            u = (l + h) / 2,
                            p = (h + c) / 2,
                            f = (p - u) / 8;
                        return r.b = l + (t - l) / 4, s.b = u + f, r.c = s.a = (r.b + s.b) / 2, s.c = o.a = (u + p) / 2, o.b = p - f, a.b = c + (n - c) / 4, o.c = a.a = (o.b + a.b) / 2, [r, s, o, a]
                    },
                    l = function(t, r, s, o, l) {
                        var h, c, u, p, f, d, m, _, g, v, y, x, w, T = t.length - 1,
                            b = 0,
                            P = t[0].a;
                        for (h = 0; T > h; h++) f = t[b], c = f.a, u = f.d, p = t[b + 1].d, l ? (y = e[h], x = i[h], w = (x + y) * r * .25 / (o ? .5 : n[h] || .5), d = u - (u - c) * (o ? .5 * r : 0 !== y ? w / y : 0), m = u + (p - u) * (o ? .5 * r : 0 !== x ? w / x : 0), _ = u - (d + ((m - d) * (3 * y / (y + x) + .5) / 4 || 0))) : (d = u - (u - c) * r * .5, m = u + (p - u) * r * .5, _ = u - (d + m) / 2), d += _, m += _, f.c = g = d, f.b = 0 !== h ? P : P = f.a + .6 * (f.c - f.a), f.da = u - c, f.ca = g - c, f.ba = P - c, s ? (v = a(c, P, g, u), t.splice(b, 1, v[0], v[1], v[2], v[3]), b += 4) : b++, P = m;
                        f = t[b], f.b = P, f.c = P + .4 * (f.d - P), f.da = f.d - f.a, f.ca = f.c - f.a, f.ba = P - f.a, s && (v = a(f.a, P, f.c, f.d), t.splice(b, 1, v[0], v[1], v[2], v[3]))
                    },
                    h = function(t, n, r, s) {
                        var a, l, h, c, u, p, f = [];
                        if (s)
                            for (t = [s].concat(t), l = t.length; --l > -1;) "string" == typeof(p = t[l][n]) && "=" === p.charAt(1) && (t[l][n] = s[n] + Number(p.charAt(0) + p.substr(2)));
                        if (0 > (a = t.length - 2)) return f[0] = new o(t[0][n], 0, 0, t[0][n]), f;
                        for (l = 0; a > l; l++) h = t[l][n], c = t[l + 1][n], f[l] = new o(h, 0, 0, c), r && (u = t[l + 2][n], e[l] = (e[l] || 0) + (c - h) * (c - h), i[l] = (i[l] || 0) + (u - c) * (u - c));
                        return f[l] = new o(t[l][n], 0, 0, t[l + 1][n]), f
                    },
                    c = function(t, s, o, a, c, u) {
                        var p, f, d, m, _, g, v, y, x = {},
                            w = [],
                            T = u || t[0];
                        c = "string" == typeof c ? "," + c + "," : ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,", null == s && (s = 1);
                        for (f in t[0]) w.push(f);
                        if (t.length > 1) {
                            for (y = t[t.length - 1], v = !0, p = w.length; --p > -1;)
                                if (f = w[p], Math.abs(T[f] - y[f]) > .05) {
                                    v = !1;
                                    break
                                } v && (t = t.concat(), u && t.unshift(u), t.push(t[1]), u = t[t.length - 3])
                        }
                        for (e.length = i.length = n.length = 0, p = w.length; --p > -1;) f = w[p], r[f] = -1 !== c.indexOf("," + f + ","), x[f] = h(t, f, r[f], u);
                        for (p = e.length; --p > -1;) e[p] = Math.sqrt(e[p]), i[p] = Math.sqrt(i[p]);
                        if (!a) {
                            for (p = w.length; --p > -1;)
                                if (r[f])
                                    for (d = x[w[p]], g = d.length - 1, m = 0; g > m; m++) _ = d[m + 1].da / i[m] + d[m].da / e[m] || 0, n[m] = (n[m] || 0) + _ * _;
                            for (p = n.length; --p > -1;) n[p] = Math.sqrt(n[p])
                        }
                        for (p = w.length, m = o ? 4 : 1; --p > -1;) f = w[p], d = x[f], l(d, s, o, a, r[f]), v && (d.splice(0, m), d.splice(d.length - m, m));
                        return x
                    },
                    u = function(t, e, i) {
                        e = e || "soft";
                        var n, r, s, a, l, h, c, u, p, f, d, m = {},
                            _ = "cubic" === e ? 3 : 2,
                            g = "soft" === e,
                            v = [];
                        if (g && i && (t = [i].concat(t)), null == t || t.length < _ + 1) throw "invalid Bezier data";
                        for (p in t[0]) v.push(p);
                        for (h = v.length; --h > -1;) {
                            for (p = v[h], m[p] = l = [], f = 0, u = t.length, c = 0; u > c; c++) n = null == i ? t[c][p] : "string" == typeof(d = t[c][p]) && "=" === d.charAt(1) ? i[p] + Number(d.charAt(0) + d.substr(2)) : Number(d), g && c > 1 && u - 1 > c && (l[f++] = (n + l[f - 2]) / 2), l[f++] = n;
                            for (u = f - _ + 1, f = 0, c = 0; u > c; c += _) n = l[c], r = l[c + 1], s = l[c + 2], a = 2 === _ ? 0 : l[c + 3], l[f++] = d = 3 === _ ? new o(n, r, s, a) : new o(n, (2 * r + n) / 3, (2 * r + s) / 3, s);
                            l.length = f
                        }
                        return m
                    },
                    p = function(t, e, i) {
                        for (var n, r, s, o, a, l, h, c, u, p, f, d = 1 / i, m = t.length; --m > -1;)
                            for (p = t[m], s = p.a, o = p.d - s, a = p.c - s, l = p.b - s, n = r = 0, c = 1; i >= c; c++) h = d * c, u = 1 - h, n = r - (r = (h * h * o + 3 * u * (h * a + u * l)) * h), f = m * i + c - 1, e[f] = (e[f] || 0) + n * n
                    },
                    f = function(t, e) {
                        e = e >> 0 || 6;
                        var i, n, r, s, o = [],
                            a = [],
                            l = 0,
                            h = 0,
                            c = e - 1,
                            u = [],
                            f = [];
                        for (i in t) p(t[i], o, e);
                        for (r = o.length, n = 0; r > n; n++) l += Math.sqrt(o[n]), s = n % e, f[s] = l, s === c && (h += l, s = n / e >> 0, u[s] = f, a[s] = h, l = 0, f = []);
                        return {
                            length: h,
                            lengths: a,
                            segments: u
                        }
                    },
                    d = _gsScope._gsDefine.plugin({
                        propName: "bezier",
                        priority: -1,
                        version: "1.3.8",
                        API: 2,
                        global: !0,
                        init: function(t, e, i) {
                            this._target = t, e instanceof Array && (e = {
                                values: e
                            }), this._func = {}, this._mod = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                            var n, r, s, o, a, l = e.values || [],
                                h = {},
                                p = l[0],
                                d = e.autoRotate || i.vars.orientToBezier;
                            this._autoRotate = d ? d instanceof Array ? d : [
                                ["x", "y", "rotation", !0 === d ? 0 : Number(d) || 0]
                            ] : null;
                            for (n in p) this._props.push(n);
                            for (s = this._props.length; --s > -1;) n = this._props[s], this._overwriteProps.push(n), r = this._func[n] = "function" == typeof t[n], h[n] = r ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(t[n]), a || h[n] !== l[0][n] && (a = h);
                            if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? c(l, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, a) : u(l, e.type, h), this._segCount = this._beziers[n].length, this._timeRes) {
                                var m = f(this._beziers, this._timeRes);
                                this._length = m.length, this._lengths = m.lengths, this._segments = m.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                            }
                            if (d = this._autoRotate)
                                for (this._initialRotations = [], d[0] instanceof Array || (this._autoRotate = d = [d]), s = d.length; --s > -1;) {
                                    for (o = 0; 3 > o; o++) n = d[s][o], this._func[n] = "function" == typeof t[n] && t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)];
                                    n = d[s][2], this._initialRotations[s] = (this._func[n] ? this._func[n].call(this._target) : this._target[n]) || 0, this._overwriteProps.push(n)
                                }
                            return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
                        },
                        set: function(e) {
                            var i, n, r, s, o, a, l, h, c, u, p = this._segCount,
                                f = this._func,
                                d = this._target,
                                m = e !== this._startRatio;
                            if (this._timeRes) {
                                if (c = this._lengths, u = this._curSeg, e *= this._length, r = this._li, e > this._l2 && p - 1 > r) {
                                    for (h = p - 1; h > r && (this._l2 = c[++r]) <= e;);
                                    this._l1 = c[r - 1], this._li = r, this._curSeg = u = this._segments[r], this._s2 = u[this._s1 = this._si = 0]
                                } else if (e < this._l1 && r > 0) {
                                    for (; r > 0 && (this._l1 = c[--r]) >= e;);
                                    0 === r && e < this._l1 ? this._l1 = 0 : r++, this._l2 = c[r], this._li = r, this._curSeg = u = this._segments[r], this._s1 = u[(this._si = u.length - 1) - 1] || 0, this._s2 = u[this._si]
                                }
                                if (i = r, e -= this._l1, r = this._si, e > this._s2 && r < u.length - 1) {
                                    for (h = u.length - 1; h > r && (this._s2 = u[++r]) <= e;);
                                    this._s1 = u[r - 1], this._si = r
                                } else if (e < this._s1 && r > 0) {
                                    for (; r > 0 && (this._s1 = u[--r]) >= e;);
                                    0 === r && e < this._s1 ? this._s1 = 0 : r++, this._s2 = u[r], this._si = r
                                }
                                a = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec || 0
                            } else i = 0 > e ? 0 : e >= 1 ? p - 1 : p * e >> 0, a = (e - i * (1 / p)) * p;
                            for (n = 1 - a, r = this._props.length; --r > -1;) s = this._props[r], o = this._beziers[s][i], l = (a * a * o.da + 3 * n * (a * o.ca + n * o.ba)) * a + o.a, this._mod[s] && (l = this._mod[s](l, d)), f[s] ? d[s](l) : d[s] = l;
                            if (this._autoRotate) {
                                var _, g, v, y, x, w, T, b = this._autoRotate;
                                for (r = b.length; --r > -1;) s = b[r][2], w = b[r][3] || 0, T = !0 === b[r][4] ? 1 : t, o = this._beziers[b[r][0]], _ = this._beziers[b[r][1]], o && _ && (o = o[i], _ = _[i], g = o.a + (o.b - o.a) * a, y = o.b + (o.c - o.b) * a, g += (y - g) * a, y += (o.c + (o.d - o.c) * a - y) * a, v = _.a + (_.b - _.a) * a, x = _.b + (_.c - _.b) * a, v += (x - v) * a, x += (_.c + (_.d - _.c) * a - x) * a, l = m ? Math.atan2(x - v, y - g) * T + w : this._initialRotations[r], this._mod[s] && (l = this._mod[s](l, d)), f[s] ? d[s](l) : d[s] = l)
                            }
                        }
                    }),
                    m = d.prototype;
                d.bezierThrough = c, d.cubicToQuadratic = a, d._autoCSS = !0, d.quadraticToCubic = function(t, e, i) {
                    return new o(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
                }, d._cssRegister = function() {
                    var t = s.CSSPlugin;
                    if (t) {
                        var e = t._internals,
                            i = e._parseToProxy,
                            n = e._setPluginRatio,
                            r = e.CSSPropTween;
                        e._registerComplexSpecialProp("bezier", {
                            parser: function(t, e, s, o, a, l) {
                                e instanceof Array && (e = {
                                    values: e
                                }), l = new d;
                                var h, c, u, p = e.values,
                                    f = p.length - 1,
                                    m = [],
                                    _ = {};
                                if (0 > f) return a;
                                for (h = 0; f >= h; h++) u = i(t, p[h], o, a, l, f !== h), m[h] = u.end;
                                for (c in e) _[c] = e[c];
                                return _.values = m, a = new r(t, "bezier", 0, 0, u.pt, 2), a.data = u, a.plugin = l, a.setRatio = n, 0 === _.autoRotate && (_.autoRotate = !0), !_.autoRotate || _.autoRotate instanceof Array || (h = !0 === _.autoRotate ? 0 : Number(_.autoRotate), _.autoRotate = null != u.end.left ? [
                                    ["left", "top", "rotation", h, !1]
                                ] : null != u.end.x && [
                                    ["x", "y", "rotation", h, !1]
                                ]), _.autoRotate && (o._transform || o._enableTransforms(!1), u.autoRotate = o._target._gsTransform, u.proxy.rotation = u.autoRotate.rotation || 0, o._overwriteProps.push("rotation")), l._onInitTween(u.proxy, _, o._tween), a
                            }
                        })
                    }
                }, m._mod = function(t) {
                    for (var e, i = this._overwriteProps, n = i.length; --n > -1;)(e = t[i[n]]) && "function" == typeof e && (this._mod[i[n]] = e)
                }, m._kill = function(t) {
                    var e, i, n = this._props;
                    for (e in this._beziers)
                        if (e in t)
                            for (delete this._beziers[e], delete this._func[e], i = n.length; --i > -1;) n[i] === e && n.splice(i, 1);
                    if (n = this._autoRotate)
                        for (i = n.length; --i > -1;) t[n[i][2]] && n.splice(i, 1);
                    return this._super._kill.call(this, t)
                }
            }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(t, e) {
                var i, n, r, s, o = function() {
                        t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = o.prototype.setRatio
                    },
                    a = _gsScope._gsDefine.globals,
                    l = {},
                    h = o.prototype = new t("css");
                h.constructor = o, o.version = "1.20.0", o.API = 2, o.defaultTransformPerspective = 0, o.defaultSkewType = "compensated", o.defaultSmoothOrigin = !0, h = "px", o.suffixMap = {
                    top: h,
                    right: h,
                    bottom: h,
                    left: h,
                    width: h,
                    height: h,
                    fontSize: h,
                    padding: h,
                    margin: h,
                    perspective: h,
                    lineHeight: ""
                };
                var c, u, p, f, d, m, _, g, v = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
                    y = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                    x = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                    w = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                    T = /(?:\d|\-|\+|=|#|\.)*/g,
                    b = /opacity *= *([^)]*)/i,
                    P = /opacity:([^;]*)/i,
                    k = /alpha\(opacity *=.+?\)/i,
                    S = /^(rgb|hsl)/,
                    C = /([A-Z])/g,
                    O = /-([a-z])/gi,
                    E = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                    A = function(t, e) {
                        return e.toUpperCase()
                    },
                    R = /(?:Left|Right|Width)/i,
                    D = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                    M = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                    L = /,(?=[^\)]*(?:\(|$))/gi,
                    I = /[\s,\(]/i,
                    N = Math.PI / 180,
                    B = 180 / Math.PI,
                    X = {},
                    F = {
                        style: {}
                    },
                    W = _gsScope.document || {
                        createElement: function() {
                            return F
                        }
                    },
                    Y = function(t, e) {
                        return W.createElementNS ? W.createElementNS(e || "http://www.w3.org/1999/xhtml", t) : W.createElement(t)
                    },
                    z = Y("div"),
                    H = Y("img"),
                    V = o._internals = {
                        _specialProps: l
                    },
                    j = (_gsScope.navigator || {}).userAgent || "",
                    q = function() {
                        var t = j.indexOf("Android"),
                            e = Y("a");
                        return p = -1 !== j.indexOf("Safari") && -1 === j.indexOf("Chrome") && (-1 === t || parseFloat(j.substr(t + 8, 2)) > 3), d = p && parseFloat(j.substr(j.indexOf("Version/") + 8, 2)) < 6, f = -1 !== j.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(j) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(j)) && (m = parseFloat(RegExp.$1)), !!e && (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity))
                    }(),
                    G = function(t) {
                        return b.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                    },
                    U = function(t) {
                        _gsScope.console && console.log(t)
                    },
                    Z = "",
                    $ = "",
                    Q = function(t, e) {
                        e = e || z;
                        var i, n, r = e.style;
                        if (void 0 !== r[t]) return t;
                        for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === r[i[n] + t];);
                        return n >= 0 ? ($ = 3 === n ? "ms" : i[n], Z = "-" + $.toLowerCase() + "-", $ + t) : null
                    },
                    K = W.defaultView ? W.defaultView.getComputedStyle : function() {},
                    J = o.getStyle = function(t, e, i, n, r) {
                        var s;
                        return q || "opacity" !== e ? (!n && t.style[e] ? s = t.style[e] : (i = i || K(t)) ? s = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(C, "-$1").toLowerCase()) : t.currentStyle && (s = t.currentStyle[e]), null == r || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : r) : G(t)
                    },
                    tt = V.convertToPixels = function(t, i, n, r, s) {
                        if ("px" === r || !r && "lineHeight" !== i) return n;
                        if ("auto" === r || !n) return 0;
                        var a, l, h, c = R.test(i),
                            u = t,
                            p = z.style,
                            f = 0 > n,
                            d = 1 === n;
                        if (f && (n = -n), d && (n *= 100), "lineHeight" !== i || r)
                            if ("%" === r && -1 !== i.indexOf("border")) a = n / 100 * (c ? t.clientWidth : t.clientHeight);
                            else {
                                if (p.cssText = "border:0 solid red;position:" + J(t, "position") + ";line-height:0;", "%" !== r && u.appendChild && "v" !== r.charAt(0) && "rem" !== r) p[c ? "borderLeftWidth" : "borderTopWidth"] = n + r;
                                else {
                                    if (u = t.parentNode || W.body, -1 !== J(u, "display").indexOf("flex") && (p.position = "absolute"), l = u._gsCache, h = e.ticker.frame, l && c && l.time === h) return l.width * n / 100;
                                    p[c ? "width" : "height"] = n + r
                                }
                                u.appendChild(z), a = parseFloat(z[c ? "offsetWidth" : "offsetHeight"]), u.removeChild(z), c && "%" === r && !1 !== o.cacheWidths && (l = u._gsCache = u._gsCache || {}, l.time = h, l.width = a / n * 100), 0 !== a || s || (a = tt(t, i, n, r, !0))
                            }
                        else l = K(t).lineHeight, t.style.lineHeight = n, a = parseFloat(K(t).lineHeight), t.style.lineHeight = l;
                        return d && (a /= 100), f ? -a : a
                    },
                    et = V.calculateOffset = function(t, e, i) {
                        if ("absolute" !== J(t, "position", i)) return 0;
                        var n = "left" === e ? "Left" : "Top",
                            r = J(t, "margin" + n, i);
                        return t["offset" + n] - (tt(t, e, parseFloat(r), r.replace(T, "")) || 0)
                    },
                    it = function(t, e) {
                        var i, n, r, s = {};
                        if (e = e || K(t, null))
                            if (i = e.length)
                                for (; --i > -1;) r = e[i], (-1 === r.indexOf("-transform") || Et === r) && (s[r.replace(O, A)] = e.getPropertyValue(r));
                            else
                                for (i in e)(-1 === i.indexOf("Transform") || Ot === i) && (s[i] = e[i]);
                        else if (e = t.currentStyle || t.style)
                            for (i in e) "string" == typeof i && void 0 === s[i] && (s[i.replace(O, A)] = e[i]);
                        return q || (s.opacity = G(t)), n = Ht(t, e, !1), s.rotation = n.rotation, s.skewX = n.skewX, s.scaleX = n.scaleX, s.scaleY = n.scaleY, s.x = n.x, s.y = n.y, Rt && (s.z = n.z, s.rotationX = n.rotationX, s.rotationY = n.rotationY, s.scaleZ = n.scaleZ), s.filters && delete s.filters, s
                    },
                    nt = function(t, e, i, n, r) {
                        var s, o, a, l = {},
                            h = t.style;
                        for (o in i) "cssText" !== o && "length" !== o && isNaN(o) && (e[o] !== (s = i[o]) || r && r[o]) && -1 === o.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (l[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof e[o] || "" === e[o].replace(w, "") ? s : 0 : et(t, o), void 0 !== h[o] && (a = new vt(h, o, h[o], a)));
                        if (n)
                            for (o in n) "className" !== o && (l[o] = n[o]);
                        return {
                            difs: l,
                            firstMPT: a
                        }
                    },
                    rt = {
                        width: ["Left", "Right"],
                        height: ["Top", "Bottom"]
                    },
                    st = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                    ot = function(t, e, i) {
                        if ("svg" === (t.nodeName + "").toLowerCase()) return (i || K(t))[e] || 0;
                        if (t.getCTM && Wt(t)) return t.getBBox()[e] || 0;
                        var n = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                            r = rt[e],
                            s = r.length;
                        for (i = i || K(t, null); --s > -1;) n -= parseFloat(J(t, "padding" + r[s], i, !0)) || 0, n -= parseFloat(J(t, "border" + r[s] + "Width", i, !0)) || 0;
                        return n
                    },
                    at = function(t, e) {
                        if ("contain" === t || "auto" === t || "auto auto" === t) return t + " ";
                        (null == t || "" === t) && (t = "0 0");
                        var i, n = t.split(" "),
                            r = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : n[0],
                            s = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : n[1];
                        if (n.length > 3 && !e) {
                            for (n = t.split(", ").join(",").split(","), t = [], i = 0; i < n.length; i++) t.push(at(n[i]));
                            return t.join(",")
                        }
                        return null == s ? s = "center" === r ? "50%" : "0" : "center" === s && (s = "50%"), ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"), t = r + " " + s + (n.length > 2 ? " " + n[2] : ""), e && (e.oxp = -1 !== r.indexOf("%"), e.oyp = -1 !== s.indexOf("%"), e.oxr = "=" === r.charAt(1), e.oyr = "=" === s.charAt(1), e.ox = parseFloat(r.replace(w, "")), e.oy = parseFloat(s.replace(w, "")), e.v = t), e || t
                    },
                    lt = function(t, e) {
                        return "function" == typeof t && (t = t(g, _)), "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e) || 0
                    },
                    ht = function(t, e) {
                        return "function" == typeof t && (t = t(g, _)), null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t) || 0
                    },
                    ct = function(t, e, i, n) {
                        var r, s, o, a, l;
                        return "function" == typeof t && (t = t(g, _)), null == t ? a = e : "number" == typeof t ? a = t : (r = 360, s = t.split("_"), l = "=" === t.charAt(1), o = (l ? parseInt(t.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === t.indexOf("rad") ? 1 : B) - (l ? 0 : e), s.length && (n && (n[i] = e + o), -1 !== t.indexOf("short") && (o %= r) !== o % (r / 2) && (o = 0 > o ? o + r : o - r), -1 !== t.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * r) % r - (o / r | 0) * r : -1 !== t.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * r) % r - (o / r | 0) * r)), a = e + o), 1e-6 > a && a > -1e-6 && (a = 0), a
                    },
                    ut = {
                        aqua: [0, 255, 255],
                        lime: [0, 255, 0],
                        silver: [192, 192, 192],
                        black: [0, 0, 0],
                        maroon: [128, 0, 0],
                        teal: [0, 128, 128],
                        blue: [0, 0, 255],
                        navy: [0, 0, 128],
                        white: [255, 255, 255],
                        fuchsia: [255, 0, 255],
                        olive: [128, 128, 0],
                        yellow: [255, 255, 0],
                        orange: [255, 165, 0],
                        gray: [128, 128, 128],
                        purple: [128, 0, 128],
                        green: [0, 128, 0],
                        red: [255, 0, 0],
                        pink: [255, 192, 203],
                        cyan: [0, 255, 255],
                        transparent: [255, 255, 255, 0]
                    },
                    pt = function(t, e, i) {
                        return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 255 * (1 > 6 * t ? e + (i - e) * t * 6 : .5 > t ? i : 2 > 3 * t ? e + (i - e) * (2 / 3 - t) * 6 : e) + .5 | 0
                    },
                    ft = o.parseColor = function(t, e) {
                        var i, n, r, s, o, a, l, h, c, u, p;
                        if (t)
                            if ("number" == typeof t) i = [t >> 16, t >> 8 & 255, 255 & t];
                            else {
                                if ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ut[t]) i = ut[t];
                                else if ("#" === t.charAt(0)) 4 === t.length && (n = t.charAt(1), r = t.charAt(2), s = t.charAt(3), t = "#" + n + n + r + r + s + s), t = parseInt(t.substr(1), 16), i = [t >> 16, t >> 8 & 255, 255 & t];
                                else if ("hsl" === t.substr(0, 3))
                                    if (i = p = t.match(v), e) {
                                        if (-1 !== t.indexOf("=")) return t.match(y)
                                    } else o = Number(i[0]) % 360 / 360, a = Number(i[1]) / 100, l = Number(i[2]) / 100, r = .5 >= l ? l * (a + 1) : l + a - l * a, n = 2 * l - r, i.length > 3 && (i[3] = Number(t[3])), i[0] = pt(o + 1 / 3, n, r), i[1] = pt(o, n, r), i[2] = pt(o - 1 / 3, n, r);
                                else i = t.match(v) || ut.transparent;
                                i[0] = Number(i[0]), i[1] = Number(i[1]), i[2] = Number(i[2]), i.length > 3 && (i[3] = Number(i[3]))
                            }
                        else i = ut.black;
                        return e && !p && (n = i[0] / 255, r = i[1] / 255, s = i[2] / 255, h = Math.max(n, r, s), c = Math.min(n, r, s), l = (h + c) / 2, h === c ? o = a = 0 : (u = h - c, a = l > .5 ? u / (2 - h - c) : u / (h + c), o = h === n ? (r - s) / u + (s > r ? 6 : 0) : h === r ? (s - n) / u + 2 : (n - r) / u + 4, o *= 60), i[0] = o + .5 | 0, i[1] = 100 * a + .5 | 0, i[2] = 100 * l + .5 | 0), i
                    },
                    dt = function(t, e) {
                        var i, n, r, s = t.match(mt) || [],
                            o = 0,
                            a = "";
                        if (!s.length) return t;
                        for (i = 0; i < s.length; i++) n = s[i], r = t.substr(o, t.indexOf(n, o) - o), o += r.length + n.length, n = ft(n, e), 3 === n.length && n.push(1), a += r + (e ? "hsla(" + n[0] + "," + n[1] + "%," + n[2] + "%," + n[3] : "rgba(" + n.join(",")) + ")";
                        return a + t.substr(o)
                    },
                    mt = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
                for (h in ut) mt += "|" + h + "\\b";
                mt = new RegExp(mt + ")", "gi"), o.colorStringFilter = function(t) {
                    var e, i = t[0] + " " + t[1];
                    mt.test(i) && (e = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("), t[0] = dt(t[0], e), t[1] = dt(t[1], e)), mt.lastIndex = 0
                }, e.defaultStringFilter || (e.defaultStringFilter = o.colorStringFilter);
                var _t = function(t, e, i, n) {
                        if (null == t) return function(t) {
                            return t
                        };
                        var r, s = e ? (t.match(mt) || [""])[0] : "",
                            o = t.split(s).join("").match(x) || [],
                            a = t.substr(0, t.indexOf(o[0])),
                            l = ")" === t.charAt(t.length - 1) ? ")" : "",
                            h = -1 !== t.indexOf(" ") ? " " : ",",
                            c = o.length,
                            u = c > 0 ? o[0].replace(v, "") : "";
                        return c ? r = e ? function(t) {
                            var e, p, f, d;
                            if ("number" == typeof t) t += u;
                            else if (n && L.test(t)) {
                                for (d = t.replace(L, "|").split("|"), f = 0; f < d.length; f++) d[f] = r(d[f]);
                                return d.join(",")
                            }
                            if (e = (t.match(mt) || [s])[0], p = t.split(e).join("").match(x) || [], f = p.length, c > f--)
                                for (; ++f < c;) p[f] = i ? p[(f - 1) / 2 | 0] : o[f];
                            return a + p.join(h) + h + e + l + (-1 !== t.indexOf("inset") ? " inset" : "")
                        } : function(t) {
                            var e, s, p;
                            if ("number" == typeof t) t += u;
                            else if (n && L.test(t)) {
                                for (s = t.replace(L, "|").split("|"), p = 0; p < s.length; p++) s[p] = r(s[p]);
                                return s.join(",")
                            }
                            if (e = t.match(x) || [], p = e.length, c > p--)
                                for (; ++p < c;) e[p] = i ? e[(p - 1) / 2 | 0] : o[p];
                            return a + e.join(h) + l
                        } : function(t) {
                            return t
                        }
                    },
                    gt = function(t) {
                        return t = t.split(","),
                            function(e, i, n, r, s, o, a) {
                                var l, h = (i + "").split(" ");
                                for (a = {}, l = 0; 4 > l; l++) a[t[l]] = h[l] = h[l] || h[(l - 1) / 2 >> 0];
                                return r.parse(e, a, s, o)
                            }
                    },
                    vt = (V._setPluginRatio = function(t) {
                        this.plugin.setRatio(t);
                        for (var e, i, n, r, s, o = this.data, a = o.proxy, l = o.firstMPT; l;) e = a[l.v], l.r ? e = Math.round(e) : 1e-6 > e && e > -1e-6 && (e = 0), l.t[l.p] = e, l = l._next;
                        if (o.autoRotate && (o.autoRotate.rotation = o.mod ? o.mod(a.rotation, this.t) : a.rotation), 1 === t || 0 === t)
                            for (l = o.firstMPT, s = 1 === t ? "e" : "b"; l;) {
                                if (i = l.t, i.type) {
                                    if (1 === i.type) {
                                        for (r = i.xs0 + i.s + i.xs1, n = 1; n < i.l; n++) r += i["xn" + n] + i["xs" + (n + 1)];
                                        i[s] = r
                                    }
                                } else i[s] = i.s + i.xs0;
                                l = l._next
                            }
                    }, function(t, e, i, n, r) {
                        this.t = t, this.p = e, this.v = i, this.r = r, n && (n._prev = this, this._next = n)
                    }),
                    yt = (V._parseToProxy = function(t, e, i, n, r, s) {
                        var o, a, l, h, c, u = n,
                            p = {},
                            f = {},
                            d = i._transform,
                            m = X;
                        for (i._transform = null, X = e, n = c = i.parse(t, e, n, r), X = m, s && (i._transform = d, u && (u._prev = null, u._prev && (u._prev._next = null))); n && n !== u;) {
                            if (n.type <= 1 && (a = n.p, f[a] = n.s + n.c, p[a] = n.s, s || (h = new vt(n, "s", a, h, n.r), n.c = 0), 1 === n.type))
                                for (o = n.l; --o > 0;) l = "xn" + o, a = n.p + "_" + l, f[a] = n.data[l], p[a] = n[l], s || (h = new vt(n, l, a, h, n.rxp[l]));
                            n = n._next
                        }
                        return {
                            proxy: p,
                            end: f,
                            firstMPT: h,
                            pt: c
                        }
                    }, V.CSSPropTween = function(t, e, n, r, o, a, l, h, c, u, p) {
                        this.t = t, this.p = e, this.s = n, this.c = r, this.n = l || e, t instanceof yt || s.push(this.n), this.r = h, this.type = a || 0, c && (this.pr = c, i = !0), this.b = void 0 === u ? n : u, this.e = void 0 === p ? n + r : p, o && (this._next = o, o._prev = this)
                    }),
                    xt = function(t, e, i, n, r, s) {
                        var o = new yt(t, e, i, n - i, r, -1, s);
                        return o.b = i, o.e = o.xs0 = n, o
                    },
                    wt = o.parseComplex = function(t, e, i, n, r, s, a, l, h, u) {
                        i = i || s || "", "function" == typeof n && (n = n(g, _)), a = new yt(t, e, 0, 0, a, u ? 2 : 1, null, !1, l, i, n), n += "", r && mt.test(n + i) && (n = [i, n], o.colorStringFilter(n), i = n[0], n = n[1]);
                        var p, f, d, m, x, w, T, b, P, k, S, C, O, E = i.split(", ").join(",").split(" "),
                            A = n.split(", ").join(",").split(" "),
                            R = E.length,
                            D = !1 !== c;
                        for ((-1 !== n.indexOf(",") || -1 !== i.indexOf(",")) && (E = E.join(" ").replace(L, ", ").split(" "), A = A.join(" ").replace(L, ", ").split(" "), R = E.length), R !== A.length && (E = (s || "").split(" "), R = E.length), a.plugin = h, a.setRatio = u, mt.lastIndex = 0, p = 0; R > p; p++)
                            if (m = E[p], x = A[p], (b = parseFloat(m)) || 0 === b) a.appendXtra("", b, lt(x, b), x.replace(y, ""), D && -1 !== x.indexOf("px"), !0);
                            else if (r && mt.test(m)) C = x.indexOf(")") + 1, C = ")" + (C ? x.substr(C) : ""), O = -1 !== x.indexOf("hsl") && q, k = x, m = ft(m, O), x = ft(x, O), P = m.length + x.length > 6, P && !q && 0 === x[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(A[p]).join("transparent")) : (q || (P = !1), O ? a.appendXtra(k.substr(0, k.indexOf("hsl")) + (P ? "hsla(" : "hsl("), m[0], lt(x[0], m[0]), ",", !1, !0).appendXtra("", m[1], lt(x[1], m[1]), "%,", !1).appendXtra("", m[2], lt(x[2], m[2]), P ? "%," : "%" + C, !1) : a.appendXtra(k.substr(0, k.indexOf("rgb")) + (P ? "rgba(" : "rgb("), m[0], x[0] - m[0], ",", !0, !0).appendXtra("", m[1], x[1] - m[1], ",", !0).appendXtra("", m[2], x[2] - m[2], P ? "," : C, !0), P && (m = m.length < 4 ? 1 : m[3], a.appendXtra("", m, (x.length < 4 ? 1 : x[3]) - m, C, !1))), mt.lastIndex = 0;
                        else if (w = m.match(v)) {
                            if (!(T = x.match(y)) || T.length !== w.length) return a;
                            for (d = 0, f = 0; f < w.length; f++) S = w[f], k = m.indexOf(S, d), a.appendXtra(m.substr(d, k - d), Number(S), lt(T[f], S), "", D && "px" === m.substr(k + S.length, 2), 0 === f), d = k + S.length;
                            a["xs" + a.l] += m.substr(d)
                        } else a["xs" + a.l] += a.l || a["xs" + a.l] ? " " + x : x;
                        if (-1 !== n.indexOf("=") && a.data) {
                            for (C = a.xs0 + a.data.s, p = 1; p < a.l; p++) C += a["xs" + p] + a.data["xn" + p];
                            a.e = C + a["xs" + p]
                        }
                        return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a
                    },
                    Tt = 9;
                for (h = yt.prototype, h.l = h.pr = 0; --Tt > 0;) h["xn" + Tt] = 0, h["xs" + Tt] = "";
                h.xs0 = "", h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null, h.appendXtra = function(t, e, i, n, r, s) {
                    var o = this,
                        a = o.l;
                    return o["xs" + a] += s && (a || o["xs" + a]) ? " " + t : t || "", i || 0 === a || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = n || "", a > 0 ? (o.data["xn" + a] = e + i, o.rxp["xn" + a] = r, o["xn" + a] = e, o.plugin || (o.xfirst = new yt(o, "xn" + a, e, i, o.xfirst || o, 0, o.n, r, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {
                        s: e + i
                    }, o.rxp = {}, o.s = e, o.c = i, o.r = r, o)) : (o["xs" + a] += e + (n || ""), o)
                };
                var bt = function(t, e) {
                        e = e || {}, this.p = e.prefix ? Q(t) || t : t, l[t] = l[this.p] = this, this.format = e.formatter || _t(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
                    },
                    Pt = V._registerComplexSpecialProp = function(t, e, i) {
                        "object" != typeof e && (e = {
                            parser: i
                        });
                        var n, r = t.split(","),
                            s = e.defaultValue;
                        for (i = i || [s], n = 0; n < r.length; n++) e.prefix = 0 === n && e.prefix, e.defaultValue = i[n] || s, new bt(r[n], e)
                    },
                    kt = V._registerPluginProp = function(t) {
                        if (!l[t]) {
                            var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                            Pt(t, {
                                parser: function(t, i, n, r, s, o, h) {
                                    var c = a.com.greensock.plugins[e];
                                    return c ? (c._cssRegister(), l[n].parse(t, i, n, r, s, o, h)) : (U("Error: " + e + " js file not loaded."), s)
                                }
                            })
                        }
                    };
                h = bt.prototype, h.parseComplex = function(t, e, i, n, r, s) {
                    var o, a, l, h, c, u, p = this.keyword;
                    if (this.multi && (L.test(i) || L.test(e) ? (a = e.replace(L, "|").split("|"), l = i.replace(L, "|").split("|")) : p && (a = [e], l = [i])), l) {
                        for (h = l.length > a.length ? l.length : a.length, o = 0; h > o; o++) e = a[o] = a[o] || this.dflt, i = l[o] = l[o] || this.dflt, p && (c = e.indexOf(p), u = i.indexOf(p), c !== u && (-1 === u ? a[o] = a[o].split(p).join("") : -1 === c && (a[o] += " " + p)));
                        e = a.join(", "), i = l.join(", ")
                    }
                    return wt(t, this.p, e, i, this.clrs, this.dflt, n, this.pr, r, s)
                }, h.parse = function(t, e, i, n, s, o, a) {
                    return this.parseComplex(t.style, this.format(J(t, this.p, r, !1, this.dflt)), this.format(e), s, o)
                }, o.registerSpecialProp = function(t, e, i) {
                    Pt(t, {
                        parser: function(t, n, r, s, o, a, l) {
                            var h = new yt(t, r, 0, 0, o, 2, r, !1, i);
                            return h.plugin = a, h.setRatio = e(t, n, s._tween, r), h
                        },
                        priority: i
                    })
                }, o.useSVGTransformAttr = !0;
                var St, Ct = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                    Ot = Q("transform"),
                    Et = Z + "transform",
                    At = Q("transformOrigin"),
                    Rt = null !== Q("perspective"),
                    Dt = V.Transform = function() {
                        this.perspective = parseFloat(o.defaultTransformPerspective) || 0, this.force3D = !(!1 === o.defaultForce3D || !Rt) && (o.defaultForce3D || "auto")
                    },
                    Mt = _gsScope.SVGElement,
                    Lt = function(t, e, i) {
                        var n, r = W.createElementNS("http://www.w3.org/2000/svg", t),
                            s = /([a-z])([A-Z])/g;
                        for (n in i) r.setAttributeNS(null, n.replace(s, "$1-$2").toLowerCase(), i[n]);
                        return e.appendChild(r), r
                    },
                    It = W.documentElement || {},
                    Nt = function() {
                        var t, e, i, n = m || /Android/i.test(j) && !_gsScope.chrome;
                        return W.createElementNS && !n && (t = Lt("svg", It), e = Lt("rect", t, {
                            width: 100,
                            height: 50,
                            x: 100
                        }), i = e.getBoundingClientRect().width, e.style[At] = "50% 50%", e.style[Ot] = "scaleX(0.5)", n = i === e.getBoundingClientRect().width && !(f && Rt), It.removeChild(t)), n
                    }(),
                    Bt = function(t, e, i, n, r, s) {
                        var a, l, h, c, u, p, f, d, m, _, g, v, y, x, w = t._gsTransform,
                            T = zt(t, !0);
                        w && (y = w.xOrigin, x = w.yOrigin), (!n || (a = n.split(" ")).length < 2) && (f = t.getBBox(), 0 === f.x && 0 === f.y && f.width + f.height === 0 && (f = {
                            x: parseFloat(t.hasAttribute("x") ? t.getAttribute("x") : t.hasAttribute("cx") ? t.getAttribute("cx") : 0) || 0,
                            y: parseFloat(t.hasAttribute("y") ? t.getAttribute("y") : t.hasAttribute("cy") ? t.getAttribute("cy") : 0) || 0,
                            width: 0,
                            height: 0
                        }), e = at(e).split(" "), a = [(-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * f.width : parseFloat(e[0])) + f.x, (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * f.height : parseFloat(e[1])) + f.y]), i.xOrigin = c = parseFloat(a[0]), i.yOrigin = u = parseFloat(a[1]), n && T !== Yt && (p = T[0], f = T[1], d = T[2], m = T[3], _ = T[4], g = T[5], (v = p * m - f * d) && (l = c * (m / v) + u * (-d / v) + (d * g - m * _) / v, h = c * (-f / v) + u * (p / v) - (p * g - f * _) / v, c = i.xOrigin = a[0] = l, u = i.yOrigin = a[1] = h)), w && (s && (i.xOffset = w.xOffset, i.yOffset = w.yOffset, w = i), r || !1 !== r && !1 !== o.defaultSmoothOrigin ? (l = c - y, h = u - x, w.xOffset += l * T[0] + h * T[2] - l, w.yOffset += l * T[1] + h * T[3] - h) : w.xOffset = w.yOffset = 0), s || t.setAttribute("data-svg-origin", a.join(" "))
                    },
                    Xt = function(t) {
                        var e, i = Y("svg", this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                            n = this.parentNode,
                            r = this.nextSibling,
                            s = this.style.cssText;
                        if (It.appendChild(i), i.appendChild(this), this.style.display = "block", t) try {
                            e = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = Xt
                        } catch (t) {} else this._originalGetBBox && (e = this._originalGetBBox());
                        return r ? n.insertBefore(this, r) : n.appendChild(this), It.removeChild(i), this.style.cssText = s, e
                    },
                    Ft = function(t) {
                        try {
                            return t.getBBox()
                        } catch (e) {
                            return Xt.call(t, !0)
                        }
                    },
                    Wt = function(t) {
                        return !(!(Mt && t.getCTM && Ft(t)) || t.parentNode && !t.ownerSVGElement)
                    },
                    Yt = [1, 0, 0, 1, 0, 0],
                    zt = function(t, e) {
                        var i, n, r, s, o, a, l = t._gsTransform || new Dt,
                            h = t.style;
                        if (Ot ? n = J(t, Et, null, !0) : t.currentStyle && (n = t.currentStyle.filter.match(D), n = n && 4 === n.length ? [n[0].substr(4), Number(n[2].substr(4)), Number(n[1].substr(4)), n[3].substr(4), l.x || 0, l.y || 0].join(",") : ""), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, !Ot || !(a = "none" === K(t).display) && t.parentNode || (a && (s = h.display, h.display = "block"), t.parentNode || (o = 1, It.appendChild(t)), n = J(t, Et, null, !0), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, s ? h.display = s : a && Gt(h, "display"), o && It.removeChild(t)), (l.svg || t.getCTM && Wt(t)) && (i && -1 !== (h[Ot] + "").indexOf("matrix") && (n = h[Ot], i = 0), r = t.getAttribute("transform"), i && r && (-1 !== r.indexOf("matrix") ? (n = r, i = 0) : -1 !== r.indexOf("translate") && (n = "matrix(1,0,0,1," + r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", i = 0))), i) return Yt;
                        for (r = (n || "").match(v) || [], Tt = r.length; --Tt > -1;) s = Number(r[Tt]), r[Tt] = (o = s - (s |= 0)) ? (1e5 * o + (0 > o ? -.5 : .5) | 0) / 1e5 + s : s;
                        return e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r
                    },
                    Ht = V.getTransform = function(t, i, n, r) {
                        if (t._gsTransform && n && !r) return t._gsTransform;
                        var s, a, l, h, c, u, p = n ? t._gsTransform || new Dt : new Dt,
                            f = p.scaleX < 0,
                            d = 2e-5,
                            m = 1e5,
                            _ = Rt ? parseFloat(J(t, At, i, !1, "0 0 0").split(" ")[2]) || p.zOrigin || 0 : 0,
                            g = parseFloat(o.defaultTransformPerspective) || 0;
                        if (p.svg = !(!t.getCTM || !Wt(t)), p.svg && (Bt(t, J(t, At, i, !1, "50% 50%") + "", p, t.getAttribute("data-svg-origin")), St = o.useSVGTransformAttr || Nt), (s = zt(t)) !== Yt) {
                            if (16 === s.length) {
                                var v, y, x, w, T, b = s[0],
                                    P = s[1],
                                    k = s[2],
                                    S = s[3],
                                    C = s[4],
                                    O = s[5],
                                    E = s[6],
                                    A = s[7],
                                    R = s[8],
                                    D = s[9],
                                    M = s[10],
                                    L = s[12],
                                    I = s[13],
                                    N = s[14],
                                    X = s[11],
                                    F = Math.atan2(E, M);
                                p.zOrigin && (N = -p.zOrigin, L = R * N - s[12], I = D * N - s[13], N = M * N + p.zOrigin - s[14]), p.rotationX = F * B, F && (w = Math.cos(-F), T = Math.sin(-F), v = C * w + R * T, y = O * w + D * T, x = E * w + M * T, R = C * -T + R * w, D = O * -T + D * w, M = E * -T + M * w, X = A * -T + X * w, C = v, O = y, E = x), F = Math.atan2(-k, M), p.rotationY = F * B, F && (w = Math.cos(-F), T = Math.sin(-F), v = b * w - R * T, y = P * w - D * T, x = k * w - M * T, D = P * T + D * w, M = k * T + M * w, X = S * T + X * w, b = v, P = y, k = x), F = Math.atan2(P, b), p.rotation = F * B, F && (w = Math.cos(F), T = Math.sin(F), v = b * w + P * T, y = C * w + O * T, x = R * w + D * T, P = P * w - b * T, O = O * w - C * T, D = D * w - R * T, b = v, C = y, R = x), p.rotationX && Math.abs(p.rotationX) + Math.abs(p.rotation) > 359.9 && (p.rotationX = p.rotation = 0, p.rotationY = 180 - p.rotationY), F = Math.atan2(C, O), p.scaleX = (Math.sqrt(b * b + P * P + k * k) * m + .5 | 0) / m, p.scaleY = (Math.sqrt(O * O + E * E) * m + .5 | 0) / m, p.scaleZ = (Math.sqrt(R * R + D * D + M * M) * m + .5 | 0) / m, b /= p.scaleX, C /= p.scaleY, P /= p.scaleX, O /= p.scaleY, Math.abs(F) > d ? (p.skewX = F * B, C = 0, "simple" !== p.skewType && (p.scaleY *= 1 / Math.cos(F))) : p.skewX = 0, p.perspective = X ? 1 / (0 > X ? -X : X) : 0, p.x = L, p.y = I, p.z = N, p.svg && (p.x -= p.xOrigin - (p.xOrigin * b - p.yOrigin * C), p.y -= p.yOrigin - (p.yOrigin * P - p.xOrigin * O))
                            } else if (!Rt || r || !s.length || p.x !== s[4] || p.y !== s[5] || !p.rotationX && !p.rotationY) {
                                var W = s.length >= 6,
                                    Y = W ? s[0] : 1,
                                    z = s[1] || 0,
                                    H = s[2] || 0,
                                    V = W ? s[3] : 1;
                                p.x = s[4] || 0, p.y = s[5] || 0, l = Math.sqrt(Y * Y + z * z), h = Math.sqrt(V * V + H * H), c = Y || z ? Math.atan2(z, Y) * B : p.rotation || 0, u = H || V ? Math.atan2(H, V) * B + c : p.skewX || 0, p.scaleX = l, p.scaleY = h, p.rotation = c, p.skewX = u, Rt && (p.rotationX = p.rotationY = p.z = 0, p.perspective = g, p.scaleZ = 1), p.svg && (p.x -= p.xOrigin - (p.xOrigin * Y + p.yOrigin * H), p.y -= p.yOrigin - (p.xOrigin * z + p.yOrigin * V))
                            }
                            Math.abs(p.skewX) > 90 && Math.abs(p.skewX) < 270 && (f ? (p.scaleX *= -1, p.skewX += p.rotation <= 0 ? 180 : -180, p.rotation += p.rotation <= 0 ? 180 : -180) : (p.scaleY *= -1, p.skewX += p.skewX <= 0 ? 180 : -180)), p.zOrigin = _;
                            for (a in p) p[a] < d && p[a] > -d && (p[a] = 0)
                        }
                        return n && (t._gsTransform = p, p.svg && (St && t.style[Ot] ? e.delayedCall(.001, function() {
                            Gt(t.style, Ot)
                        }) : !St && t.getAttribute("transform") && e.delayedCall(.001, function() {
                            t.removeAttribute("transform")
                        }))), p
                    },
                    Vt = function(t) {
                        var e, i, n = this.data,
                            r = -n.rotation * N,
                            s = r + n.skewX * N,
                            o = 1e5,
                            a = (Math.cos(r) * n.scaleX * o | 0) / o,
                            l = (Math.sin(r) * n.scaleX * o | 0) / o,
                            h = (Math.sin(s) * -n.scaleY * o | 0) / o,
                            c = (Math.cos(s) * n.scaleY * o | 0) / o,
                            u = this.t.style,
                            p = this.t.currentStyle;
                        if (p) {
                            i = l, l = -h, h = -i, e = p.filter, u.filter = "";
                            var f, d, _ = this.t.offsetWidth,
                                g = this.t.offsetHeight,
                                v = "absolute" !== p.position,
                                y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + l + ", M21=" + h + ", M22=" + c,
                                x = n.x + _ * n.xPercent / 100,
                                w = n.y + g * n.yPercent / 100;
                            if (null != n.ox && (f = (n.oxp ? _ * n.ox * .01 : n.ox) - _ / 2, d = (n.oyp ? g * n.oy * .01 : n.oy) - g / 2, x += f - (f * a + d * l), w += d - (f * h + d * c)), v ? (f = _ / 2, d = g / 2, y += ", Dx=" + (f - (f * a + d * l) + x) + ", Dy=" + (d - (f * h + d * c) + w) + ")") : y += ", sizingMethod='auto expand')", -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? u.filter = e.replace(M, y) : u.filter = y + " " + e, (0 === t || 1 === t) && 1 === a && 0 === l && 0 === h && 1 === c && (v && -1 === y.indexOf("Dx=0, Dy=0") || b.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && u.removeAttribute("filter")), !v) {
                                var P, k, S, C = 8 > m ? 1 : -1;
                                for (f = n.ieOffsetX || 0, d = n.ieOffsetY || 0, n.ieOffsetX = Math.round((_ - ((0 > a ? -a : a) * _ + (0 > l ? -l : l) * g)) / 2 + x), n.ieOffsetY = Math.round((g - ((0 > c ? -c : c) * g + (0 > h ? -h : h) * _)) / 2 + w), Tt = 0; 4 > Tt; Tt++) k = st[Tt], P = p[k], i = -1 !== P.indexOf("px") ? parseFloat(P) : tt(this.t, k, parseFloat(P), P.replace(T, "")) || 0, S = i !== n[k] ? 2 > Tt ? -n.ieOffsetX : -n.ieOffsetY : 2 > Tt ? f - n.ieOffsetX : d - n.ieOffsetY, u[k] = (n[k] = Math.round(i - S * (0 === Tt || 2 === Tt ? 1 : C))) + "px"
                            }
                        }
                    },
                    jt = V.set3DTransformRatio = V.setTransformRatio = function(t) {
                        var e, i, n, r, s, o, a, l, h, c, u, p, d, m, _, g, v, y, x, w, T, b, P, k = this.data,
                            S = this.t.style,
                            C = k.rotation,
                            O = k.rotationX,
                            E = k.rotationY,
                            A = k.scaleX,
                            R = k.scaleY,
                            D = k.scaleZ,
                            M = k.x,
                            L = k.y,
                            I = k.z,
                            B = k.svg,
                            X = k.perspective,
                            F = k.force3D,
                            W = k.skewY,
                            Y = k.skewX;
                        if (W && (Y += W, C += W), ((1 === t || 0 === t) && "auto" === F && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !F) && !I && !X && !E && !O && 1 === D || St && B || !Rt) return void(C || Y || B ? (C *= N, b = Y * N, P = 1e5, i = Math.cos(C) * A, s = Math.sin(C) * A, n = Math.sin(C - b) * -R, o = Math.cos(C - b) * R, b && "simple" === k.skewType && (e = Math.tan(b - W * N), e = Math.sqrt(1 + e * e), n *= e, o *= e, W && (e = Math.tan(W * N), e = Math.sqrt(1 + e * e), i *= e, s *= e)), B && (M += k.xOrigin - (k.xOrigin * i + k.yOrigin * n) + k.xOffset, L += k.yOrigin - (k.xOrigin * s + k.yOrigin * o) + k.yOffset, St && (k.xPercent || k.yPercent) && (_ = this.t.getBBox(), M += .01 * k.xPercent * _.width, L += .01 * k.yPercent * _.height), _ = 1e-6, _ > M && M > -_ && (M = 0), _ > L && L > -_ && (L = 0)),
                            x = (i * P | 0) / P + "," + (s * P | 0) / P + "," + (n * P | 0) / P + "," + (o * P | 0) / P + "," + M + "," + L + ")", B && St ? this.t.setAttribute("transform", "matrix(" + x) : S[Ot] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix(" : "matrix(") + x) : S[Ot] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix(" : "matrix(") + A + ",0,0," + R + "," + M + "," + L + ")");
                        if (f && (_ = 1e-4, _ > A && A > -_ && (A = D = 2e-5), _ > R && R > -_ && (R = D = 2e-5), !X || k.z || k.rotationX || k.rotationY || (X = 0)), C || Y) C *= N, g = i = Math.cos(C), v = s = Math.sin(C), Y && (C -= Y * N, g = Math.cos(C), v = Math.sin(C), "simple" === k.skewType && (e = Math.tan((Y - W) * N), e = Math.sqrt(1 + e * e), g *= e, v *= e, k.skewY && (e = Math.tan(W * N), e = Math.sqrt(1 + e * e), i *= e, s *= e))), n = -v, o = g;
                        else {
                            if (!(E || O || 1 !== D || X || B)) return void(S[Ot] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) translate3d(" : "translate3d(") + M + "px," + L + "px," + I + "px)" + (1 !== A || 1 !== R ? " scale(" + A + "," + R + ")" : ""));
                            i = o = 1, n = s = 0
                        }
                        c = 1, r = a = l = h = u = p = 0, d = X ? -1 / X : 0, m = k.zOrigin, _ = 1e-6, w = ",", T = "0", C = E * N, C && (g = Math.cos(C), v = Math.sin(C), l = -v, u = d * -v, r = i * v, a = s * v, c = g, d *= g, i *= g, s *= g), C = O * N, C && (g = Math.cos(C), v = Math.sin(C), e = n * g + r * v, y = o * g + a * v, h = c * v, p = d * v, r = n * -v + r * g, a = o * -v + a * g, c *= g, d *= g, n = e, o = y), 1 !== D && (r *= D, a *= D, c *= D, d *= D), 1 !== R && (n *= R, o *= R, h *= R, p *= R), 1 !== A && (i *= A, s *= A, l *= A, u *= A), (m || B) && (m && (M += r * -m, L += a * -m, I += c * -m + m), B && (M += k.xOrigin - (k.xOrigin * i + k.yOrigin * n) + k.xOffset, L += k.yOrigin - (k.xOrigin * s + k.yOrigin * o) + k.yOffset), _ > M && M > -_ && (M = T), _ > L && L > -_ && (L = T), _ > I && I > -_ && (I = 0)), x = k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix3d(" : "matrix3d(", x += (_ > i && i > -_ ? T : i) + w + (_ > s && s > -_ ? T : s) + w + (_ > l && l > -_ ? T : l), x += w + (_ > u && u > -_ ? T : u) + w + (_ > n && n > -_ ? T : n) + w + (_ > o && o > -_ ? T : o), O || E || 1 !== D ? (x += w + (_ > h && h > -_ ? T : h) + w + (_ > p && p > -_ ? T : p) + w + (_ > r && r > -_ ? T : r), x += w + (_ > a && a > -_ ? T : a) + w + (_ > c && c > -_ ? T : c) + w + (_ > d && d > -_ ? T : d) + w) : x += ",0,0,0,0,1,0,", x += M + w + L + w + I + w + (X ? 1 + -I / X : 1) + ")", S[Ot] = x
                    };
                h = Dt.prototype, h.x = h.y = h.z = h.skewX = h.skewY = h.rotation = h.rotationX = h.rotationY = h.zOrigin = h.xPercent = h.yPercent = h.xOffset = h.yOffset = 0, h.scaleX = h.scaleY = h.scaleZ = 1, Pt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                    parser: function(t, e, i, n, s, a, l) {
                        if (n._lastParsedTransform === l) return s;
                        n._lastParsedTransform = l;
                        var h, c = l.scale && "function" == typeof l.scale ? l.scale : 0;
                        "function" == typeof l[i] && (h = l[i], l[i] = e), c && (l.scale = c(g, t));
                        var u, p, f, d, m, v, y, x, w, T = t._gsTransform,
                            b = t.style,
                            P = Ct.length,
                            k = l,
                            S = {},
                            C = "transformOrigin",
                            O = Ht(t, r, !0, k.parseTransform),
                            E = k.transform && ("function" == typeof k.transform ? k.transform(g, _) : k.transform);
                        if (O.skewType = k.skewType || O.skewType || o.defaultSkewType, n._transform = O, E && "string" == typeof E && Ot) p = z.style, p[Ot] = E, p.display = "block", p.position = "absolute", W.body.appendChild(z), u = Ht(z, null, !1), "simple" === O.skewType && (u.scaleY *= Math.cos(u.skewX * N)), O.svg && (v = O.xOrigin, y = O.yOrigin, u.x -= O.xOffset, u.y -= O.yOffset, (k.transformOrigin || k.svgOrigin) && (E = {}, Bt(t, at(k.transformOrigin), E, k.svgOrigin, k.smoothOrigin, !0), v = E.xOrigin, y = E.yOrigin, u.x -= E.xOffset - O.xOffset, u.y -= E.yOffset - O.yOffset), (v || y) && (x = zt(z, !0), u.x -= v - (v * x[0] + y * x[2]), u.y -= y - (v * x[1] + y * x[3]))), W.body.removeChild(z), u.perspective || (u.perspective = O.perspective), null != k.xPercent && (u.xPercent = ht(k.xPercent, O.xPercent)), null != k.yPercent && (u.yPercent = ht(k.yPercent, O.yPercent));
                        else if ("object" == typeof k) {
                            if (u = {
                                    scaleX: ht(null != k.scaleX ? k.scaleX : k.scale, O.scaleX),
                                    scaleY: ht(null != k.scaleY ? k.scaleY : k.scale, O.scaleY),
                                    scaleZ: ht(k.scaleZ, O.scaleZ),
                                    x: ht(k.x, O.x),
                                    y: ht(k.y, O.y),
                                    z: ht(k.z, O.z),
                                    xPercent: ht(k.xPercent, O.xPercent),
                                    yPercent: ht(k.yPercent, O.yPercent),
                                    perspective: ht(k.transformPerspective, O.perspective)
                                }, null != (m = k.directionalRotation))
                                if ("object" == typeof m)
                                    for (p in m) k[p] = m[p];
                                else k.rotation = m;
                            "string" == typeof k.x && -1 !== k.x.indexOf("%") && (u.x = 0, u.xPercent = ht(k.x, O.xPercent)), "string" == typeof k.y && -1 !== k.y.indexOf("%") && (u.y = 0, u.yPercent = ht(k.y, O.yPercent)), u.rotation = ct("rotation" in k ? k.rotation : "shortRotation" in k ? k.shortRotation + "_short" : "rotationZ" in k ? k.rotationZ : O.rotation, O.rotation, "rotation", S), Rt && (u.rotationX = ct("rotationX" in k ? k.rotationX : "shortRotationX" in k ? k.shortRotationX + "_short" : O.rotationX || 0, O.rotationX, "rotationX", S), u.rotationY = ct("rotationY" in k ? k.rotationY : "shortRotationY" in k ? k.shortRotationY + "_short" : O.rotationY || 0, O.rotationY, "rotationY", S)), u.skewX = ct(k.skewX, O.skewX), u.skewY = ct(k.skewY, O.skewY)
                        }
                        for (Rt && null != k.force3D && (O.force3D = k.force3D, d = !0), (f = O.force3D || O.z || O.rotationX || O.rotationY || u.z || u.rotationX || u.rotationY || u.perspective) || null == k.scale || (u.scaleZ = 1); --P > -1;) w = Ct[P], ((E = u[w] - O[w]) > 1e-6 || -1e-6 > E || null != k[w] || null != X[w]) && (d = !0, s = new yt(O, w, O[w], E, s), w in S && (s.e = S[w]), s.xs0 = 0, s.plugin = a, n._overwriteProps.push(s.n));
                        return E = k.transformOrigin, O.svg && (E || k.svgOrigin) && (v = O.xOffset, y = O.yOffset, Bt(t, at(E), u, k.svgOrigin, k.smoothOrigin), s = xt(O, "xOrigin", (T ? O : u).xOrigin, u.xOrigin, s, C), s = xt(O, "yOrigin", (T ? O : u).yOrigin, u.yOrigin, s, C), (v !== O.xOffset || y !== O.yOffset) && (s = xt(O, "xOffset", T ? v : O.xOffset, O.xOffset, s, C), s = xt(O, "yOffset", T ? y : O.yOffset, O.yOffset, s, C)), E = "0px 0px"), (E || Rt && f && O.zOrigin) && (Ot ? (d = !0, w = At, E = (E || J(t, w, r, !1, "50% 50%")) + "", s = new yt(b, w, 0, 0, s, -1, C), s.b = b[w], s.plugin = a, Rt ? (p = O.zOrigin, E = E.split(" "), O.zOrigin = (E.length > 2 && (0 === p || "0px" !== E[2]) ? parseFloat(E[2]) : p) || 0, s.xs0 = s.e = E[0] + " " + (E[1] || "50%") + " 0px", s = new yt(O, "zOrigin", 0, 0, s, -1, s.n), s.b = p, s.xs0 = s.e = O.zOrigin) : s.xs0 = s.e = E) : at(E + "", O)), d && (n._transformType = O.svg && St || !f && 3 !== this._transformType ? 2 : 3), h && (l[i] = h), c && (l.scale = c), s
                    },
                    prefix: !0
                }), Pt("boxShadow", {
                    defaultValue: "0px 0px 0px 0px #999",
                    prefix: !0,
                    color: !0,
                    multi: !0,
                    keyword: "inset"
                }), Pt("borderRadius", {
                    defaultValue: "0px",
                    parser: function(t, e, i, s, o, a) {
                        e = this.format(e);
                        var l, h, c, u, p, f, d, m, _, g, v, y, x, w, T, b, P = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                            k = t.style;
                        for (_ = parseFloat(t.offsetWidth), g = parseFloat(t.offsetHeight), l = e.split(" "), h = 0; h < P.length; h++) this.p.indexOf("border") && (P[h] = Q(P[h])), p = u = J(t, P[h], r, !1, "0px"), -1 !== p.indexOf(" ") && (u = p.split(" "), p = u[0], u = u[1]), f = c = l[h], d = parseFloat(p), y = p.substr((d + "").length), x = "=" === f.charAt(1), x ? (m = parseInt(f.charAt(0) + "1", 10), f = f.substr(2), m *= parseFloat(f), v = f.substr((m + "").length - (0 > m ? 1 : 0)) || "") : (m = parseFloat(f), v = f.substr((m + "").length)), "" === v && (v = n[i] || y), v !== y && (w = tt(t, "borderLeft", d, y), T = tt(t, "borderTop", d, y), "%" === v ? (p = w / _ * 100 + "%", u = T / g * 100 + "%") : "em" === v ? (b = tt(t, "borderLeft", 1, "em"), p = w / b + "em", u = T / b + "em") : (p = w + "px", u = T + "px"), x && (f = parseFloat(p) + m + v, c = parseFloat(u) + m + v)), o = wt(k, P[h], p + " " + u, f + " " + c, !1, "0px", o);
                        return o
                    },
                    prefix: !0,
                    formatter: _t("0px 0px 0px 0px", !1, !0)
                }), Pt("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
                    defaultValue: "0px",
                    parser: function(t, e, i, n, s, o) {
                        return wt(t.style, i, this.format(J(t, i, r, !1, "0px 0px")), this.format(e), !1, "0px", s)
                    },
                    prefix: !0,
                    formatter: _t("0px 0px", !1, !0)
                }), Pt("backgroundPosition", {
                    defaultValue: "0 0",
                    parser: function(t, e, i, n, s, o) {
                        var a, l, h, c, u, p, f = "background-position",
                            d = r || K(t, null),
                            _ = this.format((d ? m ? d.getPropertyValue(f + "-x") + " " + d.getPropertyValue(f + "-y") : d.getPropertyValue(f) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                            g = this.format(e);
                        if (-1 !== _.indexOf("%") != (-1 !== g.indexOf("%")) && g.split(",").length < 2 && (p = J(t, "backgroundImage").replace(E, "")) && "none" !== p) {
                            for (a = _.split(" "), l = g.split(" "), H.setAttribute("src", p), h = 2; --h > -1;) _ = a[h], (c = -1 !== _.indexOf("%")) !== (-1 !== l[h].indexOf("%")) && (u = 0 === h ? t.offsetWidth - H.width : t.offsetHeight - H.height, a[h] = c ? parseFloat(_) / 100 * u + "px" : parseFloat(_) / u * 100 + "%");
                            _ = a.join(" ")
                        }
                        return this.parseComplex(t.style, _, g, s, o)
                    },
                    formatter: at
                }), Pt("backgroundSize", {
                    defaultValue: "0 0",
                    formatter: function(t) {
                        return t += "", at(-1 === t.indexOf(" ") ? t + " " + t : t)
                    }
                }), Pt("perspective", {
                    defaultValue: "0px",
                    prefix: !0
                }), Pt("perspectiveOrigin", {
                    defaultValue: "50% 50%",
                    prefix: !0
                }), Pt("transformStyle", {
                    prefix: !0
                }), Pt("backfaceVisibility", {
                    prefix: !0
                }), Pt("userSelect", {
                    prefix: !0
                }), Pt("margin", {
                    parser: gt("marginTop,marginRight,marginBottom,marginLeft")
                }), Pt("padding", {
                    parser: gt("paddingTop,paddingRight,paddingBottom,paddingLeft")
                }), Pt("clip", {
                    defaultValue: "rect(0px,0px,0px,0px)",
                    parser: function(t, e, i, n, s, o) {
                        var a, l, h;
                        return 9 > m ? (l = t.currentStyle, h = 8 > m ? " " : ",", a = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")", e = this.format(e).split(",").join(h)) : (a = this.format(J(t, this.p, r, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, a, e, s, o)
                    }
                }), Pt("textShadow", {
                    defaultValue: "0px 0px 0px #999",
                    color: !0,
                    multi: !0
                }), Pt("autoRound,strictUnits", {
                    parser: function(t, e, i, n, r) {
                        return r
                    }
                }), Pt("border", {
                    defaultValue: "0px solid #000",
                    parser: function(t, e, i, n, s, o) {
                        var a = J(t, "borderTopWidth", r, !1, "0px"),
                            l = this.format(e).split(" "),
                            h = l[0].replace(T, "");
                        return "px" !== h && (a = parseFloat(a) / tt(t, "borderTopWidth", 1, h) + h), this.parseComplex(t.style, this.format(a + " " + J(t, "borderTopStyle", r, !1, "solid") + " " + J(t, "borderTopColor", r, !1, "#000")), l.join(" "), s, o)
                    },
                    color: !0,
                    formatter: function(t) {
                        var e = t.split(" ");
                        return e[0] + " " + (e[1] || "solid") + " " + (t.match(mt) || ["#000"])[0]
                    }
                }), Pt("borderWidth", {
                    parser: gt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
                }), Pt("float,cssFloat,styleFloat", {
                    parser: function(t, e, i, n, r, s) {
                        var o = t.style,
                            a = "cssFloat" in o ? "cssFloat" : "styleFloat";
                        return new yt(o, a, 0, 0, r, -1, i, !1, 0, o[a], e)
                    }
                });
                var qt = function(t) {
                    var e, i = this.t,
                        n = i.filter || J(this.data, "filter") || "",
                        r = this.s + this.c * t | 0;
                    100 === r && (-1 === n.indexOf("atrix(") && -1 === n.indexOf("radient(") && -1 === n.indexOf("oader(") ? (i.removeAttribute("filter"), e = !J(this.data, "filter")) : (i.filter = n.replace(k, ""), e = !0)), e || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), -1 === n.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(b, "opacity=" + r))
                };
                Pt("opacity,alpha,autoAlpha", {
                    defaultValue: "1",
                    parser: function(t, e, i, n, s, o) {
                        var a = parseFloat(J(t, "opacity", r, !1, "1")),
                            l = t.style,
                            h = "autoAlpha" === i;
                        return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + a), h && 1 === a && "hidden" === J(t, "visibility", r) && 0 !== e && (a = 0), q ? s = new yt(l, "opacity", a, e - a, s) : (s = new yt(l, "opacity", 100 * a, 100 * (e - a), s), s.xn1 = h ? 1 : 0, l.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = t, s.plugin = o, s.setRatio = qt), h && (s = new yt(l, "visibility", 0, 0, s, -1, null, !1, 0, 0 !== a ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), s.xs0 = "inherit", n._overwriteProps.push(s.n), n._overwriteProps.push(i)), s
                    }
                });
                var Gt = function(t, e) {
                        e && (t.removeProperty ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) && (e = "-" + e), t.removeProperty(e.replace(C, "-$1").toLowerCase())) : t.removeAttribute(e))
                    },
                    Ut = function(t) {
                        if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                            this.t.setAttribute("class", 0 === t ? this.b : this.e);
                            for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Gt(i, e.p), e = e._next;
                            1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                        } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                    };
                Pt("className", {
                    parser: function(t, e, n, s, o, a, l) {
                        var h, c, u, p, f, d = t.getAttribute("class") || "",
                            m = t.style.cssText;
                        if (o = s._classNamePT = new yt(t, n, 0, 0, o, 2), o.setRatio = Ut, o.pr = -11, i = !0, o.b = d, c = it(t, r), u = t._gsClassPT) {
                            for (p = {}, f = u.data; f;) p[f.p] = 1, f = f._next;
                            u.setRatio(1)
                        }
                        return t._gsClassPT = o, o.e = "=" !== e.charAt(1) ? e : d.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), t.setAttribute("class", o.e), h = nt(t, c, it(t), l, p), t.setAttribute("class", d), o.data = h.firstMPT, t.style.cssText = m, o = o.xfirst = s.parse(t, h.difs, o, a)
                    }
                });
                var Zt = function(t) {
                    if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                        var e, i, n, r, s, o = this.t.style,
                            a = l.transform.parse;
                        if ("all" === this.e) o.cssText = "", r = !0;
                        else
                            for (e = this.e.split(" ").join("").split(","), n = e.length; --n > -1;) i = e[n], l[i] && (l[i].parse === a ? r = !0 : i = "transformOrigin" === i ? At : l[i].p), Gt(o, i);
                        r && (Gt(o, Ot), (s = this.t._gsTransform) && (s.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
                    }
                };
                for (Pt("clearProps", {
                        parser: function(t, e, n, r, s) {
                            return s = new yt(t, n, 0, 0, s, 2), s.setRatio = Zt, s.e = e, s.pr = -10, s.data = r._tween, i = !0, s
                        }
                    }), h = "bezier,throwProps,physicsProps,physics2D".split(","), Tt = h.length; Tt--;) kt(h[Tt]);
                h = o.prototype, h._firstPT = h._lastParsedTransform = h._transform = null, h._onInitTween = function(t, e, a, h) {
                    if (!t.nodeType) return !1;
                    this._target = _ = t, this._tween = a, this._vars = e, g = h, c = e.autoRound, i = !1, n = e.suffixMap || o.suffixMap, r = K(t, ""), s = this._overwriteProps;
                    var f, m, v, y, x, w, T, b, k, S = t.style;
                    if (u && "" === S.zIndex && ("auto" === (f = J(t, "zIndex", r)) || "" === f) && this._addLazySet(S, "zIndex", 0), "string" == typeof e && (y = S.cssText, f = it(t, r), S.cssText = y + ";" + e, f = nt(t, f, it(t)).difs, !q && P.test(e) && (f.opacity = parseFloat(RegExp.$1)), e = f, S.cssText = y), e.className ? this._firstPT = m = l.className.parse(t, e.className, "className", this, null, null, e) : this._firstPT = m = this.parse(t, e, null), this._transformType) {
                        for (k = 3 === this._transformType, Ot ? p && (u = !0, "" === S.zIndex && ("auto" === (T = J(t, "zIndex", r)) || "" === T) && this._addLazySet(S, "zIndex", 0), d && this._addLazySet(S, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (k ? "visible" : "hidden"))) : S.zoom = 1, v = m; v && v._next;) v = v._next;
                        b = new yt(t, "transform", 0, 0, null, 2), this._linkCSSP(b, null, v), b.setRatio = Ot ? jt : Vt, b.data = this._transform || Ht(t, r, !0), b.tween = a, b.pr = -1, s.pop()
                    }
                    if (i) {
                        for (; m;) {
                            for (w = m._next, v = y; v && v.pr > m.pr;) v = v._next;
                            (m._prev = v ? v._prev : x) ? m._prev._next = m: y = m, (m._next = v) ? v._prev = m : x = m, m = w
                        }
                        this._firstPT = y
                    }
                    return !0
                }, h.parse = function(t, e, i, s) {
                    var o, a, h, u, p, f, d, m, v, y, x = t.style;
                    for (o in e) {
                        if (f = e[o], "function" == typeof f && (f = f(g, _)), a = l[o]) i = a.parse(t, f, o, this, i, s, e);
                        else {
                            if ("--" === o.substr(0, 2)) {
                                this._tween._propLookup[o] = this._addTween.call(this._tween, t.style, "setProperty", K(t).getPropertyValue(o) + "", f + "", o, !1, o);
                                continue
                            }
                            p = J(t, o, r) + "", v = "string" == typeof f, "color" === o || "fill" === o || "stroke" === o || -1 !== o.indexOf("Color") || v && S.test(f) ? (v || (f = ft(f), f = (f.length > 3 ? "rgba(" : "rgb(") + f.join(",") + ")"), i = wt(x, o, p, f, !0, "transparent", i, 0, s)) : v && I.test(f) ? i = wt(x, o, p, f, !0, null, i, 0, s) : (h = parseFloat(p), d = h || 0 === h ? p.substr((h + "").length) : "", ("" === p || "auto" === p) && ("width" === o || "height" === o ? (h = ot(t, o, r), d = "px") : "left" === o || "top" === o ? (h = et(t, o, r), d = "px") : (h = "opacity" !== o ? 0 : 1, d = "")), y = v && "=" === f.charAt(1), y ? (u = parseInt(f.charAt(0) + "1", 10), f = f.substr(2), u *= parseFloat(f), m = f.replace(T, "")) : (u = parseFloat(f), m = v ? f.replace(T, "") : ""), "" === m && (m = o in n ? n[o] : d), f = u || 0 === u ? (y ? u + h : u) + m : e[o], d !== m && ("" !== m || "lineHeight" === o) && (u || 0 === u) && h && (h = tt(t, o, h, d), "%" === m ? (h /= tt(t, o, 100, "%") / 100, !0 !== e.strictUnits && (p = h + "%")) : "em" === m || "rem" === m || "vw" === m || "vh" === m ? h /= tt(t, o, 1, m) : "px" !== m && (u = tt(t, o, u, m), m = "px"), y && (u || 0 === u) && (f = u + h + m)), y && (u += h), !h && 0 !== h || !u && 0 !== u ? void 0 !== x[o] && (f || f + "" != "NaN" && null != f) ? (i = new yt(x, o, u || h || 0, 0, i, -1, o, !1, 0, p, f), i.xs0 = "none" !== f || "display" !== o && -1 === o.indexOf("Style") ? f : p) : U("invalid " + o + " tween value: " + e[o]) : (i = new yt(x, o, h, u - h, i, 0, o, !1 !== c && ("px" === m || "zIndex" === o), 0, p, f), i.xs0 = m))
                        }
                        s && i && !i.plugin && (i.plugin = s)
                    }
                    return i
                }, h.setRatio = function(t) {
                    var e, i, n, r = this._firstPT;
                    if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                        if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || -1e-6 === this._tween._rawPrevTime)
                            for (; r;) {
                                if (e = r.c * t + r.s, r.r ? e = Math.round(e) : 1e-6 > e && e > -1e-6 && (e = 0), r.type)
                                    if (1 === r.type)
                                        if (2 === (n = r.l)) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                                        else if (3 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                else if (4 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                else if (5 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                                else {
                                    for (i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                    r.t[r.p] = i
                                } else -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
                                else r.t[r.p] = e + r.xs0;
                                r = r._next
                            } else
                                for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next;
                        else
                            for (; r;) {
                                if (2 !== r.type)
                                    if (r.r && -1 !== r.type)
                                        if (e = Math.round(r.s + r.c), r.type) {
                                            if (1 === r.type) {
                                                for (n = r.l, i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                                r.t[r.p] = i
                                            }
                                        } else r.t[r.p] = e + r.xs0;
                                else r.t[r.p] = r.e;
                                else r.setRatio(t);
                                r = r._next
                            }
                }, h._enableTransforms = function(t) {
                    this._transform = this._transform || Ht(this._target, r, !0), this._transformType = this._transform.svg && St || !t && 3 !== this._transformType ? 2 : 3
                };
                var $t = function(t) {
                    this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
                };
                h._addLazySet = function(t, e, i) {
                    var n = this._firstPT = new yt(t, e, 0, 0, this._firstPT, 2);
                    n.e = i, n.setRatio = $t, n.data = this
                }, h._linkCSSP = function(t, e, i, n) {
                    return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, n = !0), i ? i._next = t : n || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
                }, h._mod = function(t) {
                    for (var e = this._firstPT; e;) "function" == typeof t[e.p] && t[e.p] === Math.round && (e.r = 1), e = e._next
                }, h._kill = function(e) {
                    var i, n, r, s = e;
                    if (e.autoAlpha || e.alpha) {
                        s = {};
                        for (n in e) s[n] = e[n];
                        s.opacity = 1, s.autoAlpha && (s.visibility = 1)
                    }
                    for (e.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), i = this._firstPT; i;) i.plugin && i.plugin !== n && i.plugin._kill && (i.plugin._kill(e), n = i.plugin), i = i._next;
                    return t.prototype._kill.call(this, s)
                };
                var Qt = function(t, e, i) {
                    var n, r, s, o;
                    if (t.slice)
                        for (r = t.length; --r > -1;) Qt(t[r], e, i);
                    else
                        for (n = t.childNodes, r = n.length; --r > -1;) s = n[r], o = s.type, s.style && (e.push(it(s)), i && i.push(s)), 1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || Qt(s, e, i)
                };
                return o.cascadeTo = function(t, i, n) {
                    var r, s, o, a, l = e.to(t, i, n),
                        h = [l],
                        c = [],
                        u = [],
                        p = [],
                        f = e._internals.reservedProps;
                    for (t = l._targets || l.target, Qt(t, c, p), l.render(i, !0, !0), Qt(t, u), l.render(0, !0, !0), l._enabled(!0), r = p.length; --r > -1;)
                        if (s = nt(p[r], c[r], u[r]), s.firstMPT) {
                            s = s.difs;
                            for (o in n) f[o] && (s[o] = n[o]);
                            a = {};
                            for (o in s) a[o] = c[r][o];
                            h.push(e.fromTo(p[r], i, a, s))
                        } return h
                }, t.activate([o]), o
            }, !0),
            function() {
                var t = _gsScope._gsDefine.plugin({
                        propName: "roundProps",
                        version: "1.6.0",
                        priority: -1,
                        API: 2,
                        init: function(t, e, i) {
                            return this._tween = i, !0
                        }
                    }),
                    e = function(t) {
                        for (; t;) t.f || t.blob || (t.m = Math.round), t = t._next
                    },
                    i = t.prototype;
                i._onInitAllProps = function() {
                    for (var t, i, n, r = this._tween, s = r.vars.roundProps.join ? r.vars.roundProps : r.vars.roundProps.split(","), o = s.length, a = {}, l = r._propLookup.roundProps; --o > -1;) a[s[o]] = Math.round;
                    for (o = s.length; --o > -1;)
                        for (t = s[o], i = r._firstPT; i;) n = i._next, i.pg ? i.t._mod(a) : i.n === t && (2 === i.f && i.t ? e(i.t._firstPT) : (this._add(i.t, t, i.s, i.c), n && (n._prev = i._prev), i._prev ? i._prev._next = n : r._firstPT === i && (r._firstPT = n), i._next = i._prev = null, r._propLookup[t] = l)), i = n;
                    return !1
                }, i._add = function(t, e, i, n) {
                    this._addTween(t, e, i, i + n, e, Math.round), this._overwriteProps.push(e)
                }
            }(),
            function() {
                _gsScope._gsDefine.plugin({
                    propName: "attr",
                    API: 2,
                    version: "0.6.1",
                    init: function(t, e, i, n) {
                        var r, s;
                        if ("function" != typeof t.setAttribute) return !1;
                        for (r in e) s = e[r], "function" == typeof s && (s = s(n, t)), this._addTween(t, "setAttribute", t.getAttribute(r) + "", s + "", r, !1, r), this._overwriteProps.push(r);
                        return !0
                    }
                })
            }(), _gsScope._gsDefine.plugin({
                propName: "directionalRotation",
                version: "0.3.1",
                API: 2,
                init: function(t, e, i, n) {
                    "object" != typeof e && (e = {
                        rotation: e
                    }), this.finals = {};
                    var r, s, o, a, l, h, c = !0 === e.useRadians ? 2 * Math.PI : 360;
                    for (r in e) "useRadians" !== r && (a = e[r], "function" == typeof a && (a = a(n, t)), h = (a + "").split("_"), s = h[0], o = parseFloat("function" != typeof t[r] ? t[r] : t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)]()), a = this.finals[r] = "string" == typeof s && "=" === s.charAt(1) ? o + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0, l = a - o, h.length && (s = h.join("_"), -1 !== s.indexOf("short") && (l %= c) !== l % (c / 2) && (l = 0 > l ? l + c : l - c), -1 !== s.indexOf("_cw") && 0 > l ? l = (l + 9999999999 * c) % c - (l / c | 0) * c : -1 !== s.indexOf("ccw") && l > 0 && (l = (l - 9999999999 * c) % c - (l / c | 0) * c)), (l > 1e-6 || -1e-6 > l) && (this._addTween(t, r, o, o + l, r), this._overwriteProps.push(r)));
                    return !0
                },
                set: function(t) {
                    var e;
                    if (1 !== t) this._super.setRatio.call(this, t);
                    else
                        for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
                }
            })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(t) {
                var e, i, n, r = _gsScope.GreenSockGlobals || _gsScope,
                    s = r.com.greensock,
                    o = 2 * Math.PI,
                    a = Math.PI / 2,
                    l = s._class,
                    h = function(e, i) {
                        var n = l("easing." + e, function() {}, !0),
                            r = n.prototype = new t;
                        return r.constructor = n, r.getRatio = i, n
                    },
                    c = t.register || function() {},
                    u = function(t, e, i, n, r) {
                        var s = l("easing." + t, {
                            easeOut: new e,
                            easeIn: new i,
                            easeInOut: new n
                        }, !0);
                        return c(s, t), s
                    },
                    p = function(t, e, i) {
                        this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
                    },
                    f = function(e, i) {
                        var n = l("easing." + e, function(t) {
                                this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                            }, !0),
                            r = n.prototype = new t;
                        return r.constructor = n, r.getRatio = i, r.config = function(t) {
                            return new n(t)
                        }, n
                    },
                    d = u("Back", f("BackOut", function(t) {
                        return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
                    }), f("BackIn", function(t) {
                        return t * t * ((this._p1 + 1) * t - this._p1)
                    }), f("BackInOut", function(t) {
                        return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
                    })),
                    m = l("easing.SlowMo", function(t, e, i) {
                        e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = !0 === i
                    }, !0),
                    _ = m.prototype = new t;
                return _.constructor = m, _.getRatio = function(t) {
                    var e = t + (.5 - t) * this._p;
                    return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
                }, m.ease = new m(.7, .7), _.config = m.config = function(t, e, i) {
                    return new m(t, e, i)
                }, e = l("easing.SteppedEase", function(t, e) {
                    t = t || 1, this._p1 = 1 / t, this._p2 = t + (e ? 0 : 1), this._p3 = e ? 1 : 0
                }, !0), _ = e.prototype = new t, _.constructor = e, _.getRatio = function(t) {
                    return 0 > t ? t = 0 : t >= 1 && (t = .999999999), ((this._p2 * t | 0) + this._p3) * this._p1
                }, _.config = e.config = function(t, i) {
                    return new e(t, i)
                }, i = l("easing.RoughEase", function(e) {
                    e = e || {};
                    for (var i, n, r, s, o, a, l = e.taper || "none", h = [], c = 0, u = 0 | (e.points || 20), f = u, d = !1 !== e.randomize, m = !0 === e.clamp, _ = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --f > -1;) i = d ? Math.random() : 1 / u * f, n = _ ? _.getRatio(i) : i, "none" === l ? r = g : "out" === l ? (s = 1 - i, r = s * s * g) : "in" === l ? r = i * i * g : .5 > i ? (s = 2 * i, r = s * s * .5 * g) : (s = 2 * (1 - i), r = s * s * .5 * g), d ? n += Math.random() * r - .5 * r : f % 2 ? n += .5 * r : n -= .5 * r, m && (n > 1 ? n = 1 : 0 > n && (n = 0)), h[c++] = {
                        x: i,
                        y: n
                    };
                    for (h.sort(function(t, e) {
                            return t.x - e.x
                        }), a = new p(1, 1, null), f = u; --f > -1;) o = h[f], a = new p(o.x, o.y, a);
                    this._prev = new p(0, 0, 0 !== a.t ? a : a.next)
                }, !0), _ = i.prototype = new t, _.constructor = i, _.getRatio = function(t) {
                    var e = this._prev;
                    if (t > e.t) {
                        for (; e.next && t >= e.t;) e = e.next;
                        e = e.prev
                    } else
                        for (; e.prev && t <= e.t;) e = e.prev;
                    return this._prev = e, e.v + (t - e.t) / e.gap * e.c
                }, _.config = function(t) {
                    return new i(t)
                }, i.ease = new i, u("Bounce", h("BounceOut", function(t) {
                    return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                }), h("BounceIn", function(t) {
                    return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                }), h("BounceInOut", function(t) {
                    var e = .5 > t;
                    return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
                })), u("Circ", h("CircOut", function(t) {
                    return Math.sqrt(1 - (t -= 1) * t)
                }), h("CircIn", function(t) {
                    return -(Math.sqrt(1 - t * t) - 1)
                }), h("CircInOut", function(t) {
                    return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                })), n = function(e, i, n) {
                    var r = l("easing." + e, function(t, e) {
                            this._p1 = t >= 1 ? t : 1, this._p2 = (e || n) / (1 > t ? t : 1), this._p3 = this._p2 / o * (Math.asin(1 / this._p1) || 0), this._p2 = o / this._p2
                        }, !0),
                        s = r.prototype = new t;
                    return s.constructor = r, s.getRatio = i, s.config = function(t, e) {
                        return new r(t, e)
                    }, r
                }, u("Elastic", n("ElasticOut", function(t) {
                    return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
                }, .3), n("ElasticIn", function(t) {
                    return -this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)
                }, .3), n("ElasticInOut", function(t) {
                    return (t *= 2) < 1 ? this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * -.5 : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * .5 + 1
                }, .45)), u("Expo", h("ExpoOut", function(t) {
                    return 1 - Math.pow(2, -10 * t)
                }), h("ExpoIn", function(t) {
                    return Math.pow(2, 10 * (t - 1)) - .001
                }), h("ExpoInOut", function(t) {
                    return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
                })), u("Sine", h("SineOut", function(t) {
                    return Math.sin(t * a)
                }), h("SineIn", function(t) {
                    return 1 - Math.cos(t * a)
                }), h("SineInOut", function(t) {
                    return -.5 * (Math.cos(Math.PI * t) - 1)
                })), l("easing.EaseLookup", {
                    find: function(e) {
                        return t.map[e]
                    }
                }, !0), c(r.SlowMo, "SlowMo", "ease,"), c(i, "RoughEase", "ease,"), c(e, "SteppedEase", "ease,"), d
            }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(t, e) {
        "use strict";
        var i = {},
            n = t.document,
            r = t.GreenSockGlobals = t.GreenSockGlobals || t;
        if (!r.TweenLite) {
            var s, o, a, l, h, c = function(t) {
                    var e, i = t.split("."),
                        n = r;
                    for (e = 0; e < i.length; e++) n[i[e]] = n = n[i[e]] || {};
                    return n
                },
                u = c("com.greensock"),
                p = 1e-10,
                f = function(t) {
                    var e, i = [],
                        n = t.length;
                    for (e = 0; e !== n; i.push(t[e++]));
                    return i
                },
                d = function() {},
                m = function() {
                    var t = Object.prototype.toString,
                        e = t.call([]);
                    return function(i) {
                        return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
                    }
                }(),
                _ = {},
                g = function(n, s, o, a) {
                    this.sc = _[n] ? _[n].sc : [], _[n] = this, this.gsClass = null, this.func = o;
                    var l = [];
                    this.check = function(h) {
                        for (var u, p, f, d, m = s.length, v = m; --m > -1;)(u = _[s[m]] || new g(s[m], [])).gsClass ? (l[m] = u.gsClass, v--) : h && u.sc.push(this);
                        if (0 === v && o) {
                            if (p = ("com.greensock." + n).split("."), f = p.pop(), d = c(p.join("."))[f] = this.gsClass = o.apply(o, l), a)
                                if (r[f] = i[f] = d, "undefined" != typeof module && module.exports)
                                    if (n === e) {
                                        module.exports = i[e] = d;
                                        for (m in i) d[m] = i[m]
                                    } else i[e] && (i[e][f] = d);
                            else "function" == typeof define && define.amd && define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + n.split(".").pop(), [], function() {
                                return d
                            });
                            for (m = 0; m < this.sc.length; m++) this.sc[m].check()
                        }
                    }, this.check(!0)
                },
                v = t._gsDefine = function(t, e, i, n) {
                    return new g(t, e, i, n)
                },
                y = u._class = function(t, e, i) {
                    return e = e || function() {}, v(t, [], function() {
                        return e
                    }, i), e
                };
            v.globals = r;
            var x = [0, 0, 1, 1],
                w = y("easing.Ease", function(t, e, i, n) {
                    this._func = t, this._type = i || 0, this._power = n || 0, this._params = e ? x.concat(e) : x
                }, !0),
                T = w.map = {},
                b = w.register = function(t, e, i, n) {
                    for (var r, s, o, a, l = e.split(","), h = l.length, c = (i || "easeIn,easeOut,easeInOut").split(","); --h > -1;)
                        for (s = l[h], r = n ? y("easing." + s, null, !0) : u.easing[s] || {}, o = c.length; --o > -1;) a = c[o], T[s + "." + a] = T[a + s] = r[a] = t.getRatio ? t : t[a] || new t
                };
            for (a = w.prototype, a._calcEnd = !1, a.getRatio = function(t) {
                    if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                    var e = this._type,
                        i = this._power,
                        n = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
                    return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === e ? 1 - n : 2 === e ? n : .5 > t ? n / 2 : 1 - n / 2
                }, s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], o = s.length; --o > -1;) a = s[o] + ",Power" + o, b(new w(null, null, 1, o), a, "easeOut", !0), b(new w(null, null, 2, o), a, "easeIn" + (0 === o ? ",easeNone" : "")), b(new w(null, null, 3, o), a, "easeInOut");
            T.linear = u.easing.Linear.easeIn, T.swing = u.easing.Quad.easeInOut;
            var P = y("events.EventDispatcher", function(t) {
                this._listeners = {}, this._eventTarget = t || this
            });
            a = P.prototype, a.addEventListener = function(t, e, i, n, r) {
                r = r || 0;
                var s, o, a = this._listeners[t],
                    c = 0;
                for (this !== l || h || l.wake(), null == a && (this._listeners[t] = a = []), o = a.length; --o > -1;) s = a[o], s.c === e && s.s === i ? a.splice(o, 1) : 0 === c && s.pr < r && (c = o + 1);
                a.splice(c, 0, {
                    c: e,
                    s: i,
                    up: n,
                    pr: r
                })
            }, a.removeEventListener = function(t, e) {
                var i, n = this._listeners[t];
                if (n)
                    for (i = n.length; --i > -1;)
                        if (n[i].c === e) return void n.splice(i, 1)
            }, a.dispatchEvent = function(t) {
                var e, i, n, r = this._listeners[t];
                if (r)
                    for (e = r.length, e > 1 && (r = r.slice(0)), i = this._eventTarget; --e > -1;)(n = r[e]) && (n.up ? n.c.call(n.s || i, {
                        type: t,
                        target: i
                    }) : n.c.call(n.s || i))
            };
            var k = t.requestAnimationFrame,
                S = t.cancelAnimationFrame,
                C = Date.now || function() {
                    return (new Date).getTime()
                },
                O = C();
            for (s = ["ms", "moz", "webkit", "o"], o = s.length; --o > -1 && !k;) k = t[s[o] + "RequestAnimationFrame"], S = t[s[o] + "CancelAnimationFrame"] || t[s[o] + "CancelRequestAnimationFrame"];
            y("Ticker", function(t, e) {
                var i, r, s, o, a, c = this,
                    u = C(),
                    f = !(!1 === e || !k) && "auto",
                    m = 500,
                    _ = 33,
                    g = function(t) {
                        var e, n, l = C() - O;
                        l > m && (u += l - _), O += l, c.time = (O - u) / 1e3, e = c.time - a, (!i || e > 0 || !0 === t) && (c.frame++, a += e + (e >= o ? .004 : o - e), n = !0), !0 !== t && (s = r(g)), n && c.dispatchEvent("tick")
                    };
                P.call(c), c.time = c.frame = 0, c.tick = function() {
                    g(!0)
                }, c.lagSmoothing = function(t, e) {
                    m = t || 1 / p, _ = Math.min(e, m, 0)
                }, c.sleep = function() {
                    null != s && (f && S ? S(s) : clearTimeout(s), r = d, s = null, c === l && (h = !1))
                }, c.wake = function(t) {
                    null !== s ? c.sleep() : t ? u += -O + (O = C()) : c.frame > 10 && (O = C() - m + 5), r = 0 === i ? d : f && k ? k : function(t) {
                        return setTimeout(t, 1e3 * (a - c.time) + 1 | 0)
                    }, c === l && (h = !0), g(2)
                }, c.fps = function(t) {
                    return arguments.length ? (i = t, o = 1 / (i || 60), a = this.time + o, void c.wake()) : i
                }, c.useRAF = function(t) {
                    return arguments.length ? (c.sleep(), f = t, void c.fps(i)) : f
                }, c.fps(t), setTimeout(function() {
                    "auto" === f && c.frame < 5 && "hidden" !== n.visibilityState && c.useRAF(!1)
                }, 1500)
            }), a = u.Ticker.prototype = new u.events.EventDispatcher, a.constructor = u.Ticker;
            var E = y("core.Animation", function(t, e) {
                if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = !0 === e.immediateRender, this.data = e.data, this._reversed = !0 === e.reversed, Z) {
                    h || l.wake();
                    var i = this.vars.useFrames ? U : Z;
                    i.add(this, i._time), this.vars.paused && this.paused(!0)
                }
            });
            l = E.ticker = new u.Ticker, a = E.prototype, a._dirty = a._gc = a._initted = a._paused = !1, a._totalTime = a._time = 0, a._rawPrevTime = -1, a._next = a._last = a._onUpdate = a._timeline = a.timeline = null, a._paused = !1;
            var A = function() {
                h && C() - O > 2e3 && "hidden" !== n.visibilityState && l.wake();
                var t = setTimeout(A, 2e3);
                t.unref && t.unref()
            };
            A(), a.play = function(t, e) {
                return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
            }, a.pause = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!0)
            }, a.resume = function(t, e) {
                return null != t && this.seek(t, e), this.paused(!1)
            }, a.seek = function(t, e) {
                return this.totalTime(Number(t), !1 !== e)
            }, a.restart = function(t, e) {
                return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, !1 !== e, !0)
            }, a.reverse = function(t, e) {
                return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
            }, a.render = function(t, e, i) {}, a.invalidate = function() {
                return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
            }, a.isActive = function() {
                var t, e = this._timeline,
                    i = this._startTime;
                return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime(!0)) >= i && t < i + this.totalDuration() / this._timeScale - 1e-7
            }, a._enabled = function(t, e) {
                return h || l.wake(), this._gc = !t, this._active = this.isActive(), !0 !== e && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
            }, a._kill = function(t, e) {
                return this._enabled(!1, !1)
            }, a.kill = function(t, e) {
                return this._kill(t, e), this
            }, a._uncache = function(t) {
                for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
                return this
            }, a._swapSelfInParams = function(t) {
                for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
                return i
            }, a._callback = function(t) {
                var e = this.vars,
                    i = e[t],
                    n = e[t + "Params"],
                    r = e[t + "Scope"] || e.callbackScope || this;
                switch (n ? n.length : 0) {
                    case 0:
                        i.call(r);
                        break;
                    case 1:
                        i.call(r, n[0]);
                        break;
                    case 2:
                        i.call(r, n[0], n[1]);
                        break;
                    default:
                        i.apply(r, n)
                }
            }, a.eventCallback = function(t, e, i, n) {
                if ("on" === (t || "").substr(0, 2)) {
                    var r = this.vars;
                    if (1 === arguments.length) return r[t];
                    null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = m(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = n), "onUpdate" === t && (this._onUpdate = e)
                }
                return this
            }, a.delay = function(t) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
            }, a.duration = function(t) {
                return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0),
                    this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, a.totalDuration = function(t) {
                return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
            }, a.time = function(t, e) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
            }, a.totalTime = function(t, e, i) {
                if (h || l.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var n = this._totalDuration,
                            r = this._timeline;
                        if (t > n && !i && (t = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
                            for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                    }
                    this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (I.length && Q(), this.render(t, e, !1), I.length && Q())
                }
                return this
            }, a.progress = a.totalProgress = function(t, e) {
                var i = this.duration();
                return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio
            }, a.startTime = function(t) {
                return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
            }, a.endTime = function(t) {
                return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
            }, a.timeScale = function(t) {
                if (!arguments.length) return this._timeScale;
                if (t = t || p, this._timeline && this._timeline.smoothChildTiming) {
                    var e = this._pauseTime,
                        i = e || 0 === e ? e : this._timeline.totalTime();
                    this._startTime = i - (i - this._startTime) * this._timeScale / t
                }
                return this._timeScale = t, this._uncache(!1)
            }, a.reversed = function(t) {
                return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, a.paused = function(t) {
                if (!arguments.length) return this._paused;
                var e, i, n = this._timeline;
                return t != this._paused && n && (h || t || l.wake(), e = n.rawTime(), i = e - this._pauseTime, !t && n.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== i && this._initted && this.duration() && (e = n.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, this.render(e, e === this._totalTime, !0))), this._gc && !t && this._enabled(!0, !1), this
            };
            var R = y("core.SimpleTimeline", function(t) {
                E.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            a = R.prototype = new E, a.constructor = R, a.kill()._gc = !1, a._first = a._last = a._recent = null, a._sortChildren = !1, a.add = a.insert = function(t, e, i, n) {
                var r, s;
                if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), r = this._last, this._sortChildren)
                    for (s = t._startTime; r && r._startTime > s;) r = r._prev;
                return r ? (t._next = r._next, r._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = r, this._recent = t, this._timeline && this._uncache(!0), this
            }, a._remove = function(t, e) {
                return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
            }, a.render = function(t, e, i) {
                var n, r = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = t; r;) n = r._next, (r._active || t >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = n
            }, a.rawTime = function() {
                return h || l.wake(), this._totalTime
            };
            var D = y("TweenLite", function(e, i, n) {
                    if (E.call(this, i, n), this.render = D.prototype.render, null == e) throw "Cannot tween a null target.";
                    this.target = e = "string" != typeof e ? e : D.selector(e) || e;
                    var r, s, o, a = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                        l = this.vars.overwrite;
                    if (this._overwrite = l = null == l ? G[D.defaultOverwrite] : "number" == typeof l ? l >> 0 : G[l], (a || e instanceof Array || e.push && m(e)) && "number" != typeof e[0])
                        for (this._targets = o = f(e), this._propLookup = [], this._siblings = [], r = 0; r < o.length; r++) s = o[r], s ? "string" != typeof s ? s.length && s !== t && s[0] && (s[0] === t || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(r--, 1), this._targets = o = o.concat(f(s))) : (this._siblings[r] = K(s, this, !1), 1 === l && this._siblings[r].length > 1 && tt(s, this, null, 1, this._siblings[r])) : "string" == typeof(s = o[r--] = D.selector(s)) && o.splice(r + 1, 1) : o.splice(r--, 1);
                    else this._propLookup = {}, this._siblings = K(e, this, !1), 1 === l && this._siblings.length > 1 && tt(e, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === i && 0 === this._delay && !1 !== this.vars.immediateRender) && (this._time = -p, this.render(Math.min(0, -this._delay)))
                }, !0),
                M = function(e) {
                    return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
                },
                L = function(t, e) {
                    var i, n = {};
                    for (i in t) q[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!H[i] || H[i] && H[i]._autoCSS) || (n[i] = t[i], delete t[i]);
                    t.css = n
                };
            a = D.prototype = new E, a.constructor = D, a.kill()._gc = !1, a.ratio = 0, a._firstPT = a._targets = a._overwrittenProps = a._startAt = null, a._notifyPluginsOfEnabled = a._lazy = !1, D.version = "1.20.2", D.defaultEase = a._ease = new w(null, null, 1, 1), D.defaultOverwrite = "auto", D.ticker = l, D.autoSleep = 120, D.lagSmoothing = function(t, e) {
                l.lagSmoothing(t, e)
            }, D.selector = t.$ || t.jQuery || function(e) {
                var i = t.$ || t.jQuery;
                return i ? (D.selector = i, i(e)) : void 0 === n ? e : n.querySelectorAll ? n.querySelectorAll(e) : n.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
            };
            var I = [],
                N = {},
                B = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
                X = /[\+-]=-?[\.\d]/,
                F = function(t) {
                    for (var e, i = this._firstPT; i;) e = i.blob ? 1 === t && this.end ? this.end : t ? this.join("") : this.start : i.c * t + i.s, i.m ? e = i.m(e, this._target || i.t) : 1e-6 > e && e > -1e-6 && !i.blob && (e = 0), i.f ? i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e) : i.t[i.p] = e, i = i._next
                },
                W = function(t, e, i, n) {
                    var r, s, o, a, l, h, c, u = [],
                        p = 0,
                        f = "",
                        d = 0;
                    for (u.start = t, u.end = e, t = u[0] = t + "", e = u[1] = e + "", i && (i(u), t = u[0], e = u[1]), u.length = 0, r = t.match(B) || [], s = e.match(B) || [], n && (n._next = null, n.blob = 1, u._firstPT = u._applyPT = n), l = s.length, a = 0; l > a; a++) c = s[a], h = e.substr(p, e.indexOf(c, p) - p), f += h || !a ? h : ",", p += h.length, d ? d = (d + 1) % 5 : "rgba(" === h.substr(-5) && (d = 1), c === r[a] || r.length <= a ? f += c : (f && (u.push(f), f = ""), o = parseFloat(r[a]), u.push(o), u._firstPT = {
                        _next: u._firstPT,
                        t: u,
                        p: u.length - 1,
                        s: o,
                        c: ("=" === c.charAt(1) ? parseInt(c.charAt(0) + "1", 10) * parseFloat(c.substr(2)) : parseFloat(c) - o) || 0,
                        f: 0,
                        m: d && 4 > d ? Math.round : 0
                    }), p += c.length;
                    return f += e.substr(p), f && u.push(f), u.setRatio = F, X.test(e) && (u.end = 0), u
                },
                Y = function(t, e, i, n, r, s, o, a, l) {
                    "function" == typeof n && (n = n(l || 0, t));
                    var h, c = typeof t[e],
                        u = "function" !== c ? "" : e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3),
                        p = "get" !== i ? i : u ? o ? t[u](o) : t[u]() : t[e],
                        f = "string" == typeof n && "=" === n.charAt(1),
                        d = {
                            t: t,
                            p: e,
                            s: p,
                            f: "function" === c,
                            pg: 0,
                            n: r || e,
                            m: s ? "function" == typeof s ? s : Math.round : 0,
                            pr: 0,
                            c: f ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - p || 0
                        };
                    return ("number" != typeof p || "number" != typeof n && !f) && (o || isNaN(p) || !f && isNaN(n) || "boolean" == typeof p || "boolean" == typeof n ? (d.fp = o, h = W(p, f ? parseFloat(d.s) + d.c : n, a || D.defaultStringFilter, d), d = {
                        t: h,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: 2,
                        pg: 0,
                        n: r || e,
                        pr: 0,
                        m: 0
                    }) : (d.s = parseFloat(p), f || (d.c = parseFloat(n) - d.s || 0))), d.c ? ((d._next = this._firstPT) && (d._next._prev = d), this._firstPT = d, d) : void 0
                },
                z = D._internals = {
                    isArray: m,
                    isSelector: M,
                    lazyTweens: I,
                    blobDif: W
                },
                H = D._plugins = {},
                V = z.tweenLookup = {},
                j = 0,
                q = z.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1,
                    stringFilter: 1,
                    id: 1,
                    yoyoEase: 1
                },
                G = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    true: 1,
                    false: 0
                },
                U = E._rootFramesTimeline = new R,
                Z = E._rootTimeline = new R,
                $ = 30,
                Q = z.lazyRender = function() {
                    var t, e = I.length;
                    for (N = {}; --e > -1;)(t = I[e]) && !1 !== t._lazy && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
                    I.length = 0
                };
            Z._startTime = l.time, U._startTime = l.frame, Z._active = U._active = !0, setTimeout(Q, 1), E._updateRoot = D.render = function() {
                var t, e, i;
                if (I.length && Q(), Z.render((l.time - Z._startTime) * Z._timeScale, !1, !1), U.render((l.frame - U._startTime) * U._timeScale, !1, !1), I.length && Q(), l.frame >= $) {
                    $ = l.frame + (parseInt(D.autoSleep, 10) || 120);
                    for (i in V) {
                        for (e = V[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
                        0 === e.length && delete V[i]
                    }
                    if ((!(i = Z._first) || i._paused) && D.autoSleep && !U._first && 1 === l._listeners.tick.length) {
                        for (; i && i._paused;) i = i._next;
                        i || l.sleep()
                    }
                }
            }, l.addEventListener("tick", E._updateRoot);
            var K = function(t, e, i) {
                    var n, r, s = t._gsTweenID;
                    if (V[s || (t._gsTweenID = s = "t" + j++)] || (V[s] = {
                            target: t,
                            tweens: []
                        }), e && (n = V[s].tweens, n[r = n.length] = e, i))
                        for (; --r > -1;) n[r] === e && n.splice(r, 1);
                    return V[s].tweens
                },
                J = function(t, e, i, n) {
                    var r, s, o = t.vars.onOverwrite;
                    return o && (r = o(t, e, i, n)), o = D.onOverwrite, o && (s = o(t, e, i, n)), !1 !== r && !1 !== s
                },
                tt = function(t, e, i, n, r) {
                    var s, o, a, l;
                    if (1 === n || n >= 4) {
                        for (l = r.length, s = 0; l > s; s++)
                            if ((a = r[s]) !== e) a._gc || a._kill(null, t, e) && (o = !0);
                            else if (5 === n) break;
                        return o
                    }
                    var h, c = e._startTime + p,
                        u = [],
                        f = 0,
                        d = 0 === e._duration;
                    for (s = r.length; --s > -1;)(a = r[s]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (h = h || et(e, 0, d), 0 === et(a, h, d) && (u[f++] = a)) : a._startTime <= c && a._startTime + a.totalDuration() / a._timeScale > c && ((d || !a._initted) && c - a._startTime <= 2e-10 || (u[f++] = a)));
                    for (s = f; --s > -1;)
                        if (a = u[s], 2 === n && a._kill(i, t, e) && (o = !0), 2 !== n || !a._firstPT && a._initted) {
                            if (2 !== n && !J(a, e)) continue;
                            a._enabled(!1, !1) && (o = !0)
                        } return o
                },
                et = function(t, e, i) {
                    for (var n = t._timeline, r = n._timeScale, s = t._startTime; n._timeline;) {
                        if (s += n._startTime, r *= n._timeScale, n._paused) return -100;
                        n = n._timeline
                    }
                    return s /= r, s > e ? s - e : i && s === e || !t._initted && 2 * p > s - e ? p : (s += t.totalDuration() / t._timeScale / r) > e + p ? 0 : s - e - p
                };
            a._init = function() {
                var t, e, i, n, r, s, o = this.vars,
                    a = this._overwrittenProps,
                    l = this._duration,
                    h = !!o.immediateRender,
                    c = o.ease;
                if (o.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
                    for (n in o.startAt) r[n] = o.startAt[n];
                    if (r.overwrite = !1, r.immediateRender = !0, r.lazy = h && !1 !== o.lazy, r.startAt = r.delay = null, r.onUpdate = o.onUpdate, r.onUpdateScope = o.onUpdateScope || o.callbackScope || this, this._startAt = D.to(this.target, 0, r), h)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== l) return
                } else if (o.runBackwards && 0 !== l)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        0 !== this._time && (h = !1), i = {};
                        for (n in o) q[n] && "autoCSS" !== n || (i[n] = o[n]);
                        if (i.overwrite = 0, i.data = "isFromStart", i.lazy = h && !1 !== o.lazy, i.immediateRender = h, this._startAt = D.to(this.target, 0, i), h) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    } if (this._ease = c = c ? c instanceof w ? c : "function" == typeof c ? new w(c, o.easeParams) : T[c] || D.defaultEase : D.defaultEase, o.easeParams instanceof Array && c.config && (this._ease = c.config.apply(c, o.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (s = this._targets.length, t = 0; s > t; t++) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null, t) && (e = !0);
                else e = this._initProps(this.target, this._propLookup, this._siblings, a, 0);
                if (e && D._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), o.runBackwards)
                    for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                this._onUpdate = o.onUpdate, this._initted = !0
            }, a._initProps = function(e, i, n, r, s) {
                var o, a, l, h, c, u;
                if (null == e) return !1;
                N[e._gsTweenID] && Q(), this.vars.css || e.style && e !== t && e.nodeType && H.css && !1 !== this.vars.autoCSS && L(this.vars, e);
                for (o in this.vars)
                    if (u = this.vars[o], q[o]) u && (u instanceof Array || u.push && m(u)) && -1 !== u.join("").indexOf("{self}") && (this.vars[o] = u = this._swapSelfInParams(u, this));
                    else if (H[o] && (h = new H[o])._onInitTween(e, this.vars[o], this, s)) {
                    for (this._firstPT = c = {
                            _next: this._firstPT,
                            t: h,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 1,
                            n: o,
                            pg: 1,
                            pr: h._priority,
                            m: 0
                        }, a = h._overwriteProps.length; --a > -1;) i[h._overwriteProps[a]] = this._firstPT;
                    (h._priority || h._onInitAllProps) && (l = !0), (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0), c._next && (c._next._prev = c)
                } else i[o] = Y.call(this, e, o, "get", u, o, 0, null, this.vars.stringFilter, s);
                return r && this._kill(r, e) ? this._initProps(e, i, n, r, s) : this._overwrite > 1 && this._firstPT && n.length > 1 && tt(e, this, i, this._overwrite, n) ? (this._kill(i, e), this._initProps(e, i, n, r, s)) : (this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) && (N[e._gsTweenID] = !0), l)
            }, a.render = function(t, e, i) {
                var n, r, s, o, a = this._time,
                    l = this._duration,
                    h = this._rawPrevTime;
                if (t >= l - 1e-7 && t >= 0) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 > h || 0 >= t && t >= -1e-7 || h === p && "isPause" !== this.data) && h !== t && (i = !0, h > p && (r = "onReverseComplete")), this._rawPrevTime = o = !e || t || h === t ? t : p);
                else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === l && h > 0) && (r = "onReverseComplete", n = this._reversed), 0 > t && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (h !== p || "isPause" !== this.data) && (i = !0), this._rawPrevTime = o = !e || t || h === t ? t : p)), (!this._initted || this._startAt && this._startAt.progress()) && (i = !0);
                else if (this._totalTime = this._time = t, this._easeType) {
                    var c = t / l,
                        u = this._easeType,
                        f = this._easePower;
                    (1 === u || 3 === u && c >= .5) && (c = 1 - c), 3 === u && (c *= 2), 1 === f ? c *= c : 2 === f ? c *= c * c : 3 === f ? c *= c * c * c : 4 === f && (c *= c * c * c * c), this.ratio = 1 === u ? 1 - c : 2 === u ? c : .5 > t / l ? c / 2 : 1 - c / 2
                } else this.ratio = this._ease.getRatio(t / l);
                if (this._time !== a || i) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = a, this._rawPrevTime = h, I.push(this), void(this._lazy = [t, e]);
                        this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0), 0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
                    this._onUpdate && (0 > t && this._startAt && -1e-4 !== t && this._startAt.render(t, e, i), e || (this._time !== a || n || i) && this._callback("onUpdate")), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && -1e-4 !== t && this._startAt.render(t, e, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === l && this._rawPrevTime === p && o !== p && (this._rawPrevTime = 0))
                }
            }, a._kill = function(t, e, i) {
                if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                e = "string" != typeof e ? e || this._targets || this.target : D.selector(e) || e;
                var n, r, s, o, a, l, h, c, u, p = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
                if ((m(e) || M(e)) && "number" != typeof e[0])
                    for (n = e.length; --n > -1;) this._kill(t, e[n], i) && (l = !0);
                else {
                    if (this._targets) {
                        for (n = this._targets.length; --n > -1;)
                            if (e === this._targets[n]) {
                                a = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[n] = t ? this._overwrittenProps[n] || {} : "all";
                                break
                            }
                    } else {
                        if (e !== this.target) return !1;
                        a = this._propLookup, r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                    }
                    if (a) {
                        if (h = t || a, c = t !== r && "all" !== r && t !== a && ("object" != typeof t || !t._tempKill), i && (D.onOverwrite || this.vars.onOverwrite)) {
                            for (s in h) a[s] && (u || (u = []), u.push(s));
                            if ((u || !t) && !J(this, i, e, u)) return !1
                        }
                        for (s in h)(o = a[s]) && (p && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s, l = !0), o.pg && o.t._kill(h) && (l = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete a[s]), c && (r[s] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return l
            }, a.invalidate = function() {
                return this._notifyPluginsOfEnabled && D._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], E.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -p, this.render(Math.min(0, -this._delay))), this
            }, a._enabled = function(t, e) {
                if (h || l.wake(), t && this._gc) {
                    var i, n = this._targets;
                    if (n)
                        for (i = n.length; --i > -1;) this._siblings[i] = K(n[i], this, !0);
                    else this._siblings = K(this.target, this, !0)
                }
                return E.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && D._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
            }, D.to = function(t, e, i) {
                return new D(t, e, i)
            }, D.from = function(t, e, i) {
                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new D(t, e, i)
            }, D.fromTo = function(t, e, i, n) {
                return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new D(t, e, n)
            }, D.delayedCall = function(t, e, i, n, r) {
                return new D(e, 0, {
                    delay: t,
                    onComplete: e,
                    onCompleteParams: i,
                    callbackScope: n,
                    onReverseComplete: e,
                    onReverseCompleteParams: i,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: r,
                    overwrite: 0
                })
            }, D.set = function(t, e) {
                return new D(t, 0, e)
            }, D.getTweensOf = function(t, e) {
                if (null == t) return [];
                t = "string" != typeof t ? t : D.selector(t) || t;
                var i, n, r, s;
                if ((m(t) || M(t)) && "number" != typeof t[0]) {
                    for (i = t.length, n = []; --i > -1;) n = n.concat(D.getTweensOf(t[i], e));
                    for (i = n.length; --i > -1;)
                        for (s = n[i], r = i; --r > -1;) s === n[r] && n.splice(i, 1)
                } else if (t._gsTweenID)
                    for (n = K(t).concat(), i = n.length; --i > -1;)(n[i]._gc || e && !n[i].isActive()) && n.splice(i, 1);
                return n || []
            }, D.killTweensOf = D.killDelayedCallsTo = function(t, e, i) {
                "object" == typeof e && (i = e, e = !1);
                for (var n = D.getTweensOf(t, e), r = n.length; --r > -1;) n[r]._kill(i, t)
            };
            var it = y("plugins.TweenPlugin", function(t, e) {
                this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = it.prototype
            }, !0);
            if (a = it.prototype, it.version = "1.19.0", it.API = 2, a._firstPT = null, a._addTween = Y, a.setRatio = F, a._kill = function(t) {
                    var e, i = this._overwriteProps,
                        n = this._firstPT;
                    if (null != t[this._propName]) this._overwriteProps = [];
                    else
                        for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
                    for (; n;) null != t[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
                    return !1
                }, a._mod = a._roundProps = function(t) {
                    for (var e, i = this._firstPT; i;) e = t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")], e && "function" == typeof e && (2 === i.f ? i.t._applyPT.m = e : i.m = e), i = i._next
                }, D._onPluginEvent = function(t, e) {
                    var i, n, r, s, o, a = e._firstPT;
                    if ("_onInitAllProps" === t) {
                        for (; a;) {
                            for (o = a._next, n = r; n && n.pr > a.pr;) n = n._next;
                            (a._prev = n ? n._prev : s) ? a._prev._next = a: r = a, (a._next = n) ? n._prev = a : s = a, a = o
                        }
                        a = e._firstPT = r
                    }
                    for (; a;) a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0), a = a._next;
                    return i
                }, it.activate = function(t) {
                    for (var e = t.length; --e > -1;) t[e].API === it.API && (H[(new t[e])._propName] = t[e]);
                    return !0
                }, v.plugin = function(t) {
                    if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                    var e, i = t.propName,
                        n = t.priority || 0,
                        r = t.overwriteProps,
                        s = {
                            init: "_onInitTween",
                            set: "setRatio",
                            kill: "_kill",
                            round: "_mod",
                            mod: "_mod",
                            initAll: "_onInitAllProps"
                        },
                        o = y("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
                            it.call(this, i, n), this._overwriteProps = r || []
                        }, !0 === t.global),
                        a = o.prototype = new it(i);
                    a.constructor = o, o.API = t.API;
                    for (e in s) "function" == typeof t[e] && (a[s[e]] = t[e]);
                    return o.version = t.version, it.activate([o]), o
                }, s = t._gsQueue) {
                for (o = 0; o < s.length; o++) s[o]();
                for (a in _) _[a].func || t.console.log("GSAP encountered missing dependency: " + a)
            }
            h = !1
        }
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax"),
    function() {
        "use strict";

        function t() {}

        function e(t, e) {
            for (var i = t.length; i--;)
                if (t[i].listener === e) return i;
            return -1
        }

        function i(t) {
            return function() {
                return this[t].apply(this, arguments)
            }
        }
        var n = t.prototype,
            r = this,
            s = r.EventEmitter;
        n.getListeners = function(t) {
            var e, i, n = this._getEvents();
            if ("object" == typeof t) {
                e = {};
                for (i in n) n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i])
            } else e = n[t] || (n[t] = []);
            return e
        }, n.flattenListeners = function(t) {
            var e, i = [];
            for (e = 0; e < t.length; e += 1) i.push(t[e].listener);
            return i
        }, n.getListenersAsObject = function(t) {
            var e, i = this.getListeners(t);
            return i instanceof Array && (e = {}, e[t] = i), e || i
        }, n.addListener = function(t, i) {
            var n, r = this.getListenersAsObject(t),
                s = "object" == typeof i;
            for (n in r) r.hasOwnProperty(n) && -1 === e(r[n], i) && r[n].push(s ? i : {
                listener: i,
                once: !1
            });
            return this
        }, n.on = i("addListener"), n.addOnceListener = function(t, e) {
            return this.addListener(t, {
                listener: e,
                once: !0
            })
        }, n.once = i("addOnceListener"), n.defineEvent = function(t) {
            return this.getListeners(t), this
        }, n.defineEvents = function(t) {
            for (var e = 0; e < t.length; e += 1) this.defineEvent(t[e]);
            return this
        }, n.removeListener = function(t, i) {
            var n, r, s = this.getListenersAsObject(t);
            for (r in s) s.hasOwnProperty(r) && -1 !== (n = e(s[r], i)) && s[r].splice(n, 1);
            return this
        }, n.off = i("removeListener"), n.addListeners = function(t, e) {
            return this.manipulateListeners(!1, t, e)
        }, n.removeListeners = function(t, e) {
            return this.manipulateListeners(!0, t, e)
        }, n.manipulateListeners = function(t, e, i) {
            var n, r, s = t ? this.removeListener : this.addListener,
                o = t ? this.removeListeners : this.addListeners;
            if ("object" != typeof e || e instanceof RegExp)
                for (n = i.length; n--;) s.call(this, e, i[n]);
            else
                for (n in e) e.hasOwnProperty(n) && (r = e[n]) && ("function" == typeof r ? s.call(this, n, r) : o.call(this, n, r));
            return this
        }, n.removeEvent = function(t) {
            var e, i = typeof t,
                n = this._getEvents();
            if ("string" === i) delete n[t];
            else if ("object" === i)
                for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e];
            else delete this._events;
            return this
        }, n.removeAllListeners = i("removeEvent"), n.emitEvent = function(t, e) {
            var i, n, r, s = this.getListenersAsObject(t);
            for (r in s)
                if (s.hasOwnProperty(r))
                    for (n = s[r].length; n--;) i = s[r][n], !0 === i.once && this.removeListener(t, i.listener), i.listener.apply(this, e || []) === this._getOnceReturnValue() && this.removeListener(t, i.listener);
            return this
        }, n.trigger = i("emitEvent"), n.emit = function(t) {
            var e = Array.prototype.slice.call(arguments, 1);
            return this.emitEvent(t, e)
        }, n.setOnceReturnValue = function(t) {
            return this._onceReturnValue = t, this
        }, n._getOnceReturnValue = function() {
            return !this.hasOwnProperty("_onceReturnValue") || this._onceReturnValue
        }, n._getEvents = function() {
            return this._events || (this._events = {})
        }, t.noConflict = function() {
            return r.EventEmitter = s, t
        }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
            return t
        }) : "object" == typeof module && module.exports ? module.exports = t : this.EventEmitter = t
    }.call(this),
    function(t) {
        function e(e) {
            var i = t.event;
            return i.target = i.target || i.srcElement || e, i
        }
        var i = document.documentElement,
            n = function() {};
        i.addEventListener ? n = function(t, e, i) {
            t.addEventListener(e, i, !1)
        } : i.attachEvent && (n = function(t, i, n) {
            t[i + n] = n.handleEvent ? function() {
                var i = e(t);
                n.handleEvent.call(n, i)
            } : function() {
                var i = e(t);
                n.call(t, i)
            }, t.attachEvent("on" + i, t[i + n])
        });
        var r = function() {};
        i.removeEventListener ? r = function(t, e, i) {
            t.removeEventListener(e, i, !1)
        } : i.detachEvent && (r = function(t, e, i) {
            t.detachEvent("on" + e, t[e + i]);
            try {
                delete t[e + i]
            } catch (n) {
                t[e + i] = void 0
            }
        });
        var s = {
            bind: n,
            unbind: r
        };
        "function" == typeof define && define.amd ? define("eventie/eventie", s) : t.eventie = s
    }(this),
    function(t, e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function(i, n) {
            return e(t, i, n)
        }) : "object" == typeof module && module.exports ? module.exports = e(t, require("wolfy87-eventemitter"), require("eventie")) : t.imagesLoaded = e(t, t.EventEmitter, t.eventie)
    }(window, function(t, e, i) {
        function n(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        function r(t) {
            return "[object Array]" == u.call(t)
        }

        function s(t) {
            var e = [];
            if (r(t)) e = t;
            else if ("number" == typeof t.length)
                for (var i = 0; i < t.length; i++) e.push(t[i]);
            else e.push(t);
            return e
        }

        function o(t, e, i) {
            if (!(this instanceof o)) return new o(t, e, i);
            "string" == typeof t && (t = document.querySelectorAll(t)), this.elements = s(t), this.options = n({}, this.options), "function" == typeof e ? i = e : n(this.options, e), i && this.on("always", i), this.getImages(), h && (this.jqDeferred = new h.Deferred);
            var r = this;
            setTimeout(function() {
                r.check()
            })
        }

        function a(t) {
            this.img = t
        }

        function l(t, e) {
            this.url = t, this.element = e, this.img = new Image
        }
        var h = t.jQuery,
            c = t.console,
            u = Object.prototype.toString;
        o.prototype = new e, o.prototype.options = {}, o.prototype.getImages = function() {
            this.images = [];
            for (var t = 0; t < this.elements.length; t++) {
                var e = this.elements[t];
                this.addElementImages(e)
            }
        }, o.prototype.addElementImages = function(t) {
            "IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
            var e = t.nodeType;
            if (e && p[e]) {
                for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                    var r = i[n];
                    this.addImage(r)
                }
                if ("string" == typeof this.options.background) {
                    var s = t.querySelectorAll(this.options.background);
                    for (n = 0; n < s.length; n++) {
                        var o = s[n];
                        this.addElementBackgroundImages(o)
                    }
                }
            }
        };
        var p = {
            1: !0,
            9: !0,
            11: !0
        };
        o.prototype.addElementBackgroundImages = function(t) {
            for (var e = f(t), i = /url\(['"]*([^'"\)]+)['"]*\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                var r = n && n[1];
                r && this.addBackground(r, t), n = i.exec(e.backgroundImage)
            }
        };
        var f = t.getComputedStyle || function(t) {
            return t.currentStyle
        };
        return o.prototype.addImage = function(t) {
            var e = new a(t);
            this.images.push(e)
        }, o.prototype.addBackground = function(t, e) {
            var i = new l(t, e);
            this.images.push(i)
        }, o.prototype.check = function() {
            function t(t, i, n) {
                setTimeout(function() {
                    e.progress(t, i, n)
                })
            }
            var e = this;
            if (this.progressedCount = 0, this.hasAnyBroken = !1, !this.images.length) return void this.complete();
            for (var i = 0; i < this.images.length; i++) {
                var n = this.images[i];
                n.once("progress", t), n.check()
            }
        }, o.prototype.progress = function(t, e, i) {
            this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emit("progress", this, t, e), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && c && c.log("progress: " + i, t, e)
        }, o.prototype.complete = function() {
            var t = this.hasAnyBroken ? "fail" : "done";
            if (this.isComplete = !0, this.emit(t, this), this.emit("always", this), this.jqDeferred) {
                var e = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[e](this)
            }
        }, a.prototype = new e, a.prototype.check = function() {
            return this.getIsImageComplete() ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, i.bind(this.proxyImage, "load", this), i.bind(this.proxyImage, "error", this), i.bind(this.img, "load", this), i.bind(this.img, "error", this), void(this.proxyImage.src = this.img.src))
        }, a.prototype.getIsImageComplete = function() {
            return this.img.complete && void 0 !== this.img.naturalWidth
        }, a.prototype.confirm = function(t, e) {
            this.isLoaded = t, this.emit("progress", this, this.img, e)
        }, a.prototype.handleEvent = function(t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, a.prototype.onload = function() {
            this.confirm(!0, "onload"), this.unbindEvents()
        }, a.prototype.onerror = function() {
            this.confirm(!1, "onerror"), this.unbindEvents()
        }, a.prototype.unbindEvents = function() {
            i.unbind(this.proxyImage, "load", this), i.unbind(this.proxyImage, "error", this), i.unbind(this.img, "load", this), i.unbind(this.img, "error", this)
        }, l.prototype = new a, l.prototype.check = function() {
            i.bind(this.img, "load", this), i.bind(this.img, "error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
        }, l.prototype.unbindEvents = function() {
            i.unbind(this.img, "load", this), i.unbind(this.img, "error", this)
        }, l.prototype.confirm = function(t, e) {
            this.isLoaded = t, this.emit("progress", this, this.element, e)
        }, o.makeJQueryPlugin = function(e) {
            (e = e || t.jQuery) && (h = e, h.fn.imagesLoaded = function(t, e) {
                return new o(this, t, e).jqDeferred.promise(h(this))
            })
        }, o.makeJQueryPlugin(), o
    }),
    function(t) {
        "use strict";

        function e(t) {
            return new RegExp("(^|\\s+)" + t + "(\\s+|$)")
        }

        function i(t, e) {
            (n(t, e) ? s : r)(t, e)
        }
        var n, r, s;
        "classList" in document.documentElement ? (n = function(t, e) {
            return t.classList.contains(e)
        }, r = function(t, e) {
            t.classList.add(e)
        }, s = function(t, e) {
            t.classList.remove(e)
        }) : (n = function(t, i) {
            return e(i).test(t.className)
        }, r = function(t, e) {
            n(t, e) || (t.className = t.className + " " + e)
        }, s = function(t, i) {
            t.className = t.className.replace(e(i), " ")
        });
        var o = {
            hasClass: n,
            addClass: r,
            removeClass: s,
            toggleClass: i,
            has: n,
            add: r,
            remove: s,
            toggle: i
        };
        "function" == typeof define && define.amd ? define(o) : "object" == typeof exports ? module.exports = o : t.classie = o
    }(window),
    function() {
        function t(t) {
            return a || (a = t.matches ? t.matches : t.webkitMatchesSelector ? t.webkitMatchesSelector : t.mozMatchesSelector ? t.mozMatchesSelector : t.msMatchesSelector ? t.msMatchesSelector : t.oMatchesSelector ? t.oMatchesSelector : o.matchesSelector)
        }

        function e(i, n, r) {
            if ("_root" == n) return r;
            if (i !== r) {
                if (t(i).call(i, n)) return i;
                if (i.parentNode) return l++, e(i.parentNode, n, r)
            }
        }

        function i(t, e, i, n) {
            c[t.id] || (c[t.id] = {}), c[t.id][e] || (c[t.id][e] = {}), c[t.id][e][i] || (c[t.id][e][i] = []), c[t.id][e][i].push(n)
        }

        function n(t, e, i, n) {
            if (c[t.id])
                if (e)
                    if (n || i)
                        if (n) {
                            if (c[t.id][e][i])
                                for (r = 0; r < c[t.id][e][i].length; r++)
                                    if (c[t.id][e][i][r] === n) {
                                        c[t.id][e][i].splice(r, 1);
                                        break
                                    }
                        } else delete c[t.id][e][i];
            else c[t.id][e] = {};
            else
                for (var r in c[t.id]) c[t.id].hasOwnProperty(r) && (c[t.id][r] = {})
        }

        function r(t, i, n) {
            if (c[t][n]) {
                var r, s, a = i.target || i.srcElement,
                    h = {},
                    p = s = 0;
                l = 0;
                for (r in c[t][n]) c[t][n].hasOwnProperty(r) && (s = e(a, r, u[t].element)) && o.matchesEvent(n, u[t].element, s, "_root" == r, i) && (l++, c[t][n][r].match = s, h[l] = c[t][n][r]);
                for (i.stopPropagation = function() {
                        i.cancelBubble = !0
                    }, s = 0; s <= l; s++)
                    if (h[s])
                        for (p = 0; p < h[s].length; p++) {
                            if (!1 === h[s][p].call(h[s].match, i)) return void o.cancel(i);
                            if (i.cancelBubble) return
                        }
            }
        }

        function s(t, e, s, a) {
            if (this.element) {
                t instanceof Array || (t = [t]), s || "function" != typeof e || (s = e, e = "_root");
                var l, h = this.id;
                for (l = 0; l < t.length; l++) a ? n(this, t[l], e, s) : (c[h] && c[h][t[l]] || o.addEvent(this, t[l], function(t) {
                    return function(e) {
                        r(h, e, t)
                    }
                }(t[l])), i(this, t[l], e, s));
                return this
            }
        }

        function o(t, e) {
            if (!(this instanceof o)) {
                for (var i in u)
                    if (u[i].element === t) return u[i];
                return h++, u[h] = new o(t, h), u[h]
            }
            this.element = t, this.id = e
        }
        var a, l = 0,
            h = 0,
            c = {},
            u = {};
        o.prototype.on = function(t, e, i) {
            return s.call(this, t, e, i)
        }, o.prototype.off = function(t, e, i) {
            return s.call(this, t, e, i, !0)
        }, o.matchesSelector = function() {}, o.cancel = function(t) {
            t.preventDefault(), t.stopPropagation()
        }, o.addEvent = function(t, e, i) {
            t.element.addEventListener(e, i, "blur" == e || "focus" == e)
        }, o.matchesEvent = function() {
            return !0
        }, "undefined" != typeof module && module.exports && (module.exports = o), window.Gator = o
    }(),
    function(t) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
        else if ("function" == typeof define && define.amd) define([], t);
        else {
            var e;
            e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.SoundCloudAudio = t()
        }
    }(function() {
        return function t(e, i, n) {
            function r(o, a) {
                if (!i[o]) {
                    if (!e[o]) {
                        var l = "function" == typeof require && require;
                        if (!a && l) return l(o, !0);
                        if (s) return s(o, !0);
                        var h = new Error("Cannot find module '" + o + "'");
                        throw h.code = "MODULE_NOT_FOUND", h
                    }
                    var c = i[o] = {
                        exports: {}
                    };
                    e[o][0].call(c.exports, function(t) {
                        var i = e[o][1][t];
                        return r(i || t)
                    }, c, c.exports, t, e, i, n)
                }
                return i[o].exports
            }
            for (var s = "function" == typeof require && require, o = 0; o < n.length; o++) r(n[o]);
            return r
        }({
            1: [function(t, e, i) {
                "use strict";

                function n(t) {
                    o || (o = document.createElement("a")), o.href = t || "";
                    for (var e = {}, i = 0, n = a.length; i < n; i++) {
                        var r = a[i];
                        e[r] = o[r]
                    }
                    return e
                }

                function r(t, e, i) {
                    var r = n(t),
                        s = /\?(?:.*)$/,
                        o = s.test(r.search) ? "&" : "?";
                    return r.protocol + "//" + r.host + r.port + r.pathname + r.search + o + e + "=" + i + r.hash
                }

                function s(t) {
                    if (!(this instanceof s)) return new s(t);
                    if (!t) throw new Error("SoundCloud API clientId is required, get it - https://developers.soundcloud.com/");
                    this._events = {}, this._clientId = t, this._baseUrl = "https://api.soundcloud.com", this.playing = !1, this.duration = 0, this.audio = document.createElement("audio")
                }
                var o, a = "protocol hostname host pathname port search hash href".split(" ");
                s.prototype.resolve = function(t, e) {
                    if (songAvailable = !1, !t) throw new Error("SoundCloud track or playlist url is required");
                    var i = this._baseUrl + "/resolve.json?url=" + encodeURIComponent(t) + "&client_id=" + this._clientId;
                    this._json(i, function(i) {
                        if (this.cleanData(), songAvailable = !0, Array.isArray(i)) {
                            i = {
                                tracks: i
                            }, this._playlist = i
                        } else if (i.tracks) this._playlist = i;
                        else {
                            this._track = i;
                            var r = n(t);
                            this._track.stream_url += r.hash
                        }
                        this.duration = i.duration && !isNaN(i.duration) ? i.duration / 1e3 : 0, e(i)
                    }.bind(this))
                }, s.prototype._jsonp = function(t, e) {
                    var i = document.getElementsByTagName("script")[0] || document.head,
                        n = document.createElement("script"),
                        s = "jsonp_callback_" + (new Date).valueOf() + Math.floor(1e3 * Math.random());
                    window[s] = function(t) {
                        n.parentNode && n.parentNode.removeChild(n), window[s] = function() {}, e(t)
                    }, n.src = r(t, "callback", s), i.parentNode.insertBefore(n, i)
                }, s.prototype._json = function(t, e) {
                    var i = new XMLHttpRequest;
                    i.open("GET", t), i.onreadystatechange = function() {
                        if (4 === i.readyState && 200 === i.status) {
                            var t = {};
                            try {
                                t = JSON.parse(i.responseText)
                            } catch (t) {}
                            e(t)
                        }
                    }, i.send(null)
                }, s.prototype.on = function(t, e) {
                    this._events[t] = e, this.audio.addEventListener(t, e, !1)
                }, s.prototype.off = function(t, e) {
                    this._events[t] = null, this.audio.removeEventListener(t, e)
                }, s.prototype.unbindAll = function() {
                    for (var t in this._events) {
                        var e = this._events[t];
                        e && this.off(t, e)
                    }
                }, s.prototype.preload = function(t) {
                    this._track = {
                        stream_url: t
                    }, this.audio.src = r(t, "client_id", this._clientId)
                }, s.prototype.play = function(t) {
                    t = t || {};
                    var e;
                    if (t.streamUrl) e = t.streamUrl;
                    else if (this._playlist) {
                        var i = this._playlist.tracks.length;
                        if (i) {
                            if (this._playlistIndex = t.playlistIndex || 0, this._playlistIndex >= i || this._playlistIndex < 0) return void(this._playlistIndex = 0);
                            e = this._playlist.tracks[this._playlistIndex].stream_url
                        }
                    } else this._track && (e = this._track.stream_url);
                    if (!e) throw new Error("There is no tracks to play, use `streamUrl` option or `load` method");
                    e = r(e, "client_id", this._clientId), e !== this.audio.src && (this.audio.src = e), this.playing = e, this.audio.play()
                }, s.prototype.pause = function() {
                    this.audio.pause(), this.playing = !1
                }, s.prototype.stop = function() {
                    this.audio.pause(), this.audio.currentTime = 0, this.playing = !1
                }, s.prototype.next = function() {
                    var t = this._playlist.tracks.length;
                    this._playlistIndex >= t - 1 || this._playlist && t && this.play({
                        playlistIndex: ++this._playlistIndex
                    })
                }, s.prototype.previous = function() {
                    this._playlistIndex <= 0 || this._playlist && this._playlist.tracks.length && this.play({
                        playlistIndex: --this._playlistIndex
                    })
                }, s.prototype.seek = function(t) {
                    if (!this.audio.readyState) return !1;
                    var e = t.offsetX / t.target.offsetWidth || (t.layerX - t.target.offsetLeft) / t.target.offsetWidth;
                    this.audio.currentTime = e * (this.audio.duration || 0)
                }, s.prototype.cleanData = function() {
                    this._track = void 0, this._playlist = void 0
                }, e.exports = s
            }, {}]
        }, {}, [1])(1)
    });
var documentBody = document.body,
    container = document.getElementById("container"),
    content = document.getElementById("content"),
    allPosters = document.querySelectorAll(".blok-poster"),
    monthPlan = document.querySelector(".blok-poster__events"),
    nav = document.getElementById("nav"),
    navOverlay = document.getElementById("nav-overlay"),
    navOverlayInner = document.getElementById("nav-overlay__inner"),
    posterOverview = document.getElementById("poster-overview"),
    imprint = document.getElementById("impressum"),
    imprintLink = document.getElementById("impressum-link"),
    imprintOpen = !1,
    preloader = document.getElementById("preloader"),
    preloaderBar = document.getElementById("preloader-bar"),
    progressBar = document.getElementById("progress-wrapper"),
    progressBarValue = document.getElementById("sc-progress"),
    overlayMessage = document.getElementById("overlay-message"),
    allAnimations, originalDocumentTitle = document.title,
    rootUrl = "/static/images/",
    vpH = window.innerHeight,
    vpW = window.innerWidth,
    contentWidth, contentHeight, activePlayer, closeAll, thisSong, thisSongDuration, seekPositionValue, currentPositionValue, progressBarInterval, artistTitle, trackTitle, songAvailable = !0,
    tooltipPlay = document.querySelector(".tooltip-play"),
    tooltipPlayState = !0,
    _tooltipPlayCursorThrottle, tooltipSeek = document.querySelector(".tooltip-seek"),
    seekPositionThrottle, dragPoster, posterHeight, posterWidth, newTopValuePoster, boundTop, boundLeft, boundWidth, boundHeight;
"addEventListener" in document && document.addEventListener("DOMContentLoaded", function() {
        FastClick.attach(document.body)
    }, !1),
    function(t) {
        "use strict";

        function e(t) {
            if (t) {
                if ("string" == typeof n[t]) return t;
                t = t.charAt(0).toUpperCase() + t.slice(1);
                for (var e, r = 0, s = i.length; r < s; r++)
                    if (e = i[r] + t, "string" == typeof n[e]) return e
            }
        }
        var i = "Webkit Moz ms Ms O".split(" "),
            n = document.documentElement.style;
        t.getStyleProperty = e
    }(window);
var transformProp = getStyleProperty("transform");
if (vpW > 640) {
    var browserCheck = get_browser_info();
    ("Safari" === browserCheck.name && browserCheck.version < 7 || "Firefox" === browserCheck.name && browserCheck.version < 35 || "Chrome" === browserCheck.name && browserCheck.version < 40) && classie.add(documentBody, "not-supported"), posterHeight = Math.round(.8 * vpH), posterWidth = Math.round(.7 * posterHeight), newTopValuePoster = (posterHeight - posterWidth) / 2, contentWidth = Math.sqrt(posterWidth * posterHeight * (allPosters.length - 2.7) * 3) + Math.sqrt(vpH * vpW), contentHeight = contentWidth;
    var xPos = 0,
        yPos = 0,
        posterPos = new Array,
        posterCount = 0,
        start = !0,
        throttle = 0,
        horZero = (contentHeight - vpH) / 2 - 5,
        verZero = (contentWidth - vpW) / 2 - 10,
        aniCellSize = 800,
        aniCount = 0,
        aniCells = new Array,
        aniCellRows = Math.round(contentWidth / aniCellSize),
        aniCellAmount = 0;
    boundTop = 50, boundLeft = 50, boundBottom = 50, boundRight = 50, boundWidth = contentWidth - 100, boundHeight = contentHeight - 100, container.style.width = vpW + "px", container.style.height = vpH + "px", content.style.width = contentWidth + "px", content.style.height = contentHeight + "px";
    for (var i = 0; i < aniCellRows; i++)
        for (var s = 0; s < aniCellRows; s++) aniCells[aniCellAmount] = new Array, aniCells[aniCellAmount][0] = contentWidth / aniCellRows * s + contentWidth / aniCellRows / 2 - 150, aniCells[aniCellAmount][1] = contentWidth / aniCellRows * i + contentWidth / aniCellRows / 2 - 150, aniCells[aniCellAmount][2] = !1, aniCellAmount++;
    for (var i = 0, tot = allPosters.length; i < tot; i++) allPosters[i].style.height = posterHeight + "px", allPosters[i].style.width = posterWidth + "px", classie.has(allPosters[i], "blok-poster--current") ? (allPosters[i].style.top = horZero + (vpH - posterHeight) / 2 + "px", allPosters[i].style.left = verZero + vpW / 2 - posterWidth + "px") : (positionPoster(), allPosters[i].style.top = yPos + "px", allPosters[i].style.left = xPos + "px");
    monthPlan.clientHeight > vpH - 60 ? (classie.add(monthPlan, "shrink-size"), monthPlan.style.top = horZero + (vpH - monthPlan.clientHeight) / 2 + "px") : monthPlan.style.top = horZero + (vpH - posterHeight) / 2 + "px", monthPlan.style.left = verZero + vpW / 2 + posterWidth / 3 + "px", draggablePoster(), container.scrollTop = (contentHeight - vpH) / 2, container.scrollLeft = (contentWidth - vpW) / 2, draggableContainer("scroll", .8), _tooltipDragCursorThrottle = tooltipDragCursor.throttle(5), Gator(document).on("mousemove", "#content", _tooltipDragCursorThrottle), _tooltipPlayCursorThrottle = tooltipPlayCursor.throttle(5), Gator(document).on("mousemove", ".blok-poster", _tooltipPlayCursorThrottle), seekPositionThrottle = seekPosition.throttle(25), Gator(document).on("mousemove", "#progress-wrapper", seekPositionThrottle), Gator(document).on("click", "#progress-wrapper", goToPosition)
} else {
    posterHeight = Math.round(.8 * vpH), posterWidth = Math.round(.71 * posterHeight), newTopValuePoster = (posterHeight - posterWidth) / 2, contentHeight = Math.sqrt(posterWidth * posterHeight * (allPosters.length - 2) * 3) + Math.sqrt(vpH * vpW) + vpH, contentWidth = vpW, boundTop = -100, boundLeft = -150, boundRight = -150, boundBottom = -100, boundWidth = contentWidth + 300, boundHeight = contentHeight, container.style.width = vpW + "px", container.style.height = vpH + "px", content.style.width = vpW + "px", content.style.height = contentHeight + "px", navOverlayInner.style.height = vpH + "px", draggablePoster();
    for (var i = 0, tot = allPosters.length; i < tot; i++) allPosters[i].style.height = posterHeight + "px", allPosters[i].style.width = posterWidth + "px", classie.has(allPosters[i], "blok-poster--current") ? (allPosters[i].style.top = .5 * vpH - .5 * posterHeight <= 70 ? "70px" : .5 * vpH - .5 * posterHeight + "px", allPosters[i].style.left = .5 * vpW - .5 * posterWidth + "px") : (allPosters[i].style.top = getRandomInt(vpH + monthPlan.clientHeight, contentHeight - vpH) + "px", allPosters[i].style.left = getRandomInt(-150, vpW - .5 * posterWidth) + "px");
    monthPlan.style.top = vpH + 20 + "px", monthPlan.style.left = (contentWidth - vpW) / 2 + "px", monthPlan.style.width = vpW + "px", draggableContainer("scrollTop", .1)
}
var rotateDisc = [],
    rotateDiscIndex, discElement = document.querySelectorAll(".music-player-lp ");
for (i = 0; i < discElement.length; i++) rotateDisc[i] = new TweenMax.to(discElement[i], .15, {
    rotation: "360",
    ease: Linear.easeNone,
    repeat: -1,
    paused: !0
}).timeScale(0);
var player = new SoundCloudAudio("cb4aaa60c1882fd4f9d0ef36e37db2e6"),
    render = function(t) {
        player.unbindAll(), player.on("ended", function(t) {
            pausePlayer(stop)
        })
    };
Gator(document).on("click", ".sc-play-pause", function(t) {
    function e() {
        currentPositionValue = player.audio.currentTime / thisSongDuration, progressBarValue.style.width = 100 * currentPositionValue + "%"
    }
    return artistTitle = document.querySelector(".play span.top").textContent, trackTitle = document.querySelector(".play span.bottom").textContent, rotateDiscIndex = this.nextElementSibling.getAttribute("disc-index") - 1, songAvailable ? (player.playing ? (TweenLite.to(rotateDisc[rotateDiscIndex], 2, {
        timeScale: 0,
        onComplete: function() {
            this.pause()
        }
    }), classie.remove(this, "show-pause-btn"), classie.remove(this, "now-playing"), player.pause(), clearInterval(progressBarInterval)) : (classie.add(this.previousElementSibling, "is-visible"), classie.add(this, "now-playing"), classie.add(this, "show-pause-btn"), classie.add(progressBar, "is-visible"), checkIfPlaying(), player.play(), document.title = "  Исполнитель " + artistTitle + ":: трек" + trackTitle, thisSongDuration = player.duration, progressBarInterval = setInterval(e, 1e3)), !1) : (overlayMessage.style.display = "table", setTimeout(function() {
        classie.add(overlayMessage, "is-visible")
    }, 50), !1)
});
var checkIfPlayingTimer;
Gator(document).on("click", "#menu", function(t) {
    return classie.has(documentBody, "nav-open") ? (closeAll = 10, imprintOpen && (classie.remove(documentBody, "impressum--visible"), classie.remove(imprintLink, "open"), closeAll = 350), setTimeout(function() {
        classie.remove(documentBody, "nav-open"), classie.remove(navOverlay, "is-visible"), setTimeout(function() {
            navOverlay.style.display = "none", imprintOpen = !1
        }, 550)
    }, closeAll)) : (navOverlay.style.display = "block", classie.add(documentBody, "nav-open"), setTimeout(function() {
        classie.add(navOverlay, "is-visible")
    }, 20)), !1
}), Gator(document).on("click", "#impressum-link", function(t) {
    return imprintOpen ? (classie.remove(navOverlay, "impressum--visible"), classie.remove(documentBody, "impressum--visible"), classie.remove(this, "open"), imprintOpen = !1) : (classie.add(navOverlay, "impressum--visible"), classie.add(documentBody, "impressum--visible"), classie.add(this, "open"), imprintOpen = !0), !1
});
var transformPropPrefix = "transform";
transformPropPrefix = "WebkitTransform" === transformProp ? "-webkit-transform" : "transform", Gator(document).on("click", ".poster-overview__item", function(t) {
    var e = this.getAttribute("data-index"),
        i = parseInt(allPosters[e].style.top, 10),
        n = parseInt(allPosters[e].style.left, 10),
        r = getTransform(allPosters[e]),
        s = Math.round(r[1]),
        o = Math.round(r[0]);
    return container.scrollTop = i - (vpH / 2 - posterHeight / 2) + s, container.scrollLeft = n - (vpW / 2 - posterWidth / 2) + o, TweenLite.set(allPosters[e], {
        zIndex: Draggable.zIndex++
    }), container.style.visibility = "visible", imprintOpen ? (classie.remove(documentBody, "impressum--visible"), classie.remove(imprintLink, "open"), imprintOpen = !1, setTimeout(function() {
        container.style.visibility = "visible", classie.remove(documentBody, "nav-open"), classie.remove(navOverlay, "is-visible")
    }, 350), setTimeout(function() {
        navOverlay.style.display = "none"
    }, 1e3)) : (container.style.visibility = "visible", classie.remove(documentBody, "nav-open"), classie.remove(navOverlay, "is-visible"), setTimeout(function() {
        navOverlay.style.display = "none"
    }, 650)), !1
});
var d = new Date,
    actualDay = d.getDate(),
    actualMonth = d.getMonth() + 1,
    actualYear = d.getFullYear(),
    monthEvents = document.querySelectorAll(".month-event"),
    hours = d.getHours();
hours < 3 && actualDay > 1 && actualDay--, actualYear = actualYear.toString().substr(2, 2), actualMonth = actualMonth.toString(), actualMonth.length < 2 && (actualMonth = "0" + actualMonth), actualDay = actualDay.toString(), actualDay.length < 2 && (actualDay = "0" + actualDay);
var actualDate = parseInt(actualYear + actualMonth + actualDay);
for (i = 0; i < monthEvents.length; i++) monthEvents[i][0] = monthEvents[i].getAttribute("data-date"), j = parseInt(i) - 1, j < 0 && (j = 0), monthEvents[i][0] == actualDate ? (monthEvents[i][1] = "next", monthEvents[i][2] = "Сегодня вечером") : monthEvents[i][0] > actualDate && monthEvents[j][0] < actualDate || i == j && monthEvents[i][0] > actualDate ? (monthEvents[i][1] = "next", monthEvents[i][2] = "Это " + getActualDay(monthEvents[i][0])) : monthEvents[i][0] < actualDate ? (monthEvents[i][1] = "past", monthEvents[i][2] = getActualDay(monthEvents[i][0], !0) + " " + monthEvents[i][0].toString().substr(4, 2) + "." + monthEvents[i][0].toString().substr(2, 2) + ".") : (monthEvents[i][1] = "future", monthEvents[i][2] = getActualDay(monthEvents[i][0], !0) + " " + monthEvents[i][0].toString().substr(4, 2) + "." + monthEvents[i][0].toString().substr(2, 2) + "."), monthEvents[i].children[0].innerHTML = monthEvents[i][2], classie.add(monthEvents[i], monthEvents[i][1]);
Element.prototype.remove = function() {
    this.parentElement.removeChild(this)
}, NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for (var t = this.length - 1; t >= 0; t--) this[t] && this[t].parentElement && this[t].parentElement.removeChild(this[t])
}, classie.remove(documentBody, "loading");
for (var loadedImageCount, imageCount, preloadPercentage, preloadImagesArray = [], preloadImages = document.querySelectorAll(".b-lazy"), i = 0, len = preloadImages.length; i < len; i++) {
    var preloadImageUrl = preloadImages[i].getAttribute("data-src"),
        img = new Image;
    img.src = preloadImages[i].getAttribute("data-src"), preloadImagesArray[i] = img
}! function() {
    vpW <= 640 && posterOverview.remove();
    var t = imagesLoaded(preloadImagesArray);
    t.on("progress", onProgress), t.on("always", onAlways), imageCount = t.images.length, resetProgress(), updateProgress(0)
}(), Gator(document).on("click", "#overlay-message", function(t) {
    return classie.remove(this, "is-visible"), setTimeout(function() {
        overlayMessage.style.display = "none"
    }, 300), !1
}), window.addEventListener("resize", function() {
    clearTimeout(window.resizedFinished), window.resizedFinished = setTimeout(function() {
        vpH = window.innerHeight, vpW = window.innerWidth, container.style.width = vpW + "px", container.style.height = vpH + "px"
    }, 250)
}, !0);
