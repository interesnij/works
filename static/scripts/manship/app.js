function initMap() {
    function e() {
        marker.setAnimation(google.maps.Animation.BOUNCE)
    }
    map = new google.maps.Map(document.getElementById("map"), {
        center: {
            lat: 32.3137676,
            lng: -90.1785163
        },
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        disableDefaultUI: !0,
        styles: styles
    }), marker = new google.maps.Marker({
        map: map,
        draggable: !1,
        animation: google.maps.Animation.DROP,
        position: {
            lat: 32.3141972,
            lng: -90.1777316
        },
        icon: "/static/images/manship/pin.png"
    }), e()
}! function(e) {
    e.fn.hoverIntent = function(n, t, a) {
        var s = {
            interval: 100,
            sensitivity: 6,
            timeout: 0
        };
        s = "object" == typeof n ? e.extend(s, n) : e.isFunction(t) ? e.extend(s, {
            over: n,
            out: t,
            selector: a
        }) : e.extend(s, {
            over: n,
            out: n,
            selector: t
        });
        var o, i, p, r, m = function(e) {
                o = e.pageX, i = e.pageY
            },
            l = function(n, t) {
                return t.hoverIntent_t = clearTimeout(t.hoverIntent_t), Math.sqrt((p - o) * (p - o) + (r - i) * (r - i)) < s.sensitivity ? (e(t).off("mousemove.hoverIntent", m), t.hoverIntent_s = !0, s.over.apply(t, [n])) : (p = o, r = i, t.hoverIntent_t = setTimeout(function() {
                    l(n, t)
                }, s.interval), void 0)
            },
            d = function(e, n) {
                return n.hoverIntent_t = clearTimeout(n.hoverIntent_t), n.hoverIntent_s = !1, s.out.apply(n, [e])
            },
            h = function(n) {
                var t = e.extend({}, n),
                    a = this;
                a.hoverIntent_t && (a.hoverIntent_t = clearTimeout(a.hoverIntent_t)), "mouseenter" === n.type ? (p = t.pageX, r = t.pageY, e(a).on("mousemove.hoverIntent", m), a.hoverIntent_s || (a.hoverIntent_t = setTimeout(function() {
                    l(t, a)
                }, s.interval))) : (e(a).off("mousemove.hoverIntent", m), a.hoverIntent_s && (a.hoverIntent_t = setTimeout(function() {
                    d(t, a)
                }, s.timeout)))
            };
        return this.on({
            "mouseenter.hoverIntent": h,
            "mouseleave.hoverIntent": h
        }, s.selector)
    }
}(jQuery);
var styles = [{
        featureType: "poi",
        stylers: [{
            visibility: "off"
        }]
    }, {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{
            invert_lightness: !0
        }, {
            color: "#ffffff"
        }, {
            weight: 10
        }]
    }, {
        elementType: "labels.text.stroke",
        stylers: [{
            visibility: "off"
        }, {
            color: "#E7E3D3"
        }, {
            weight: 2
        }]
    }, {}],
    map;
jQuery(function(e) {
     n = 0;

    function t() {
        e(".fadeup").each(function(n) {
            a(this, .5) && i() > 768 ? e(this).addClass("anim-fadeup") : i() < 992 && e(this).addClass("anim-fadeup")
        })
    }

    function a(e, n) {
        var t = e.offsetHeight,
            a = p(),
            i = a + o(),
            r = s(e).top,
            m = r + t,
            n = n || 0;
        return r + t * n <= i && m >= a
    }

    function s(e) {
        var n = 0,
            t = 0;
        do isNaN(e.offsetTop) || (n += e.offsetTop), isNaN(e.offsetLeft) || (t += e.offsetLeft); while (e = e.offsetParent);
        return {
            top: n,
            left: t
        }
    }

    function o() {
        var e = window.document.documentElement,
            n = e.clientHeight,
            t = window.innerHeight;
        return n < t ? t : n
    }

    function i() {
        var e = window.document.documentElement,
            n = e.clientWidth,
            t = window.innerWidth;
        return n < t ? t : n
    }

    function p() {
        var e = window.document.documentElement;
        return window.pageYOffset || e.scrollTop
    }

    function r() {
        var e, n = document.createElement("fakeelement"),
            t = {
                transition: "transitionend",
                OTransition: "oTransitionEnd",
                MozTransition: "transitionend",
                WebkitTransition: "webkitTransitionEnd"
            };
        for (e in t)
            if (void 0 !== n.style[e]) return t[e]
    }

    function m() {
        var e, n = document.createElement("fakeelement"),
            t = {
                animation: "animationend",
                OAnimation: "oAnimationEnd",
                MozAnimation: "animationend",
                WebkitAnimation: "webkitAnimationEnd"
            };
        for (e in t)
            if (void 0 !== n.style[e]) return t[e]
    }

    function l(e) {
        var n = new Image,
            t = e.attr("data-src");
        n.className = e.attr("class"), n.onload = function() {
            e.parent ? e.replaceWith(n) : e.src = t
        }, n.src = t
    }

    function d(e, n) {
        n.setThreshold(e.target.value, !0)
    }

    function h(n) {
        e(n.getElement()).parent().addClass("complete"), e("body").addClass("complete"), n.dispose()
    }
    Date.now();
    e(".iframe").modaal({
        type: "iframe",
        width: 320,
        height: 480
    }), e('input[type="submit"]').addClass("btn btn-lg btn-default"), e("textarea").removeAttr("rows"), e(".subpage-nav li a").addClass("btn btn-lg btn-default");
    Date.now();
    e("#open-status").length && n;
    var c = m();
    c = "undefined" != typeof c ? m() : "custom", e(document).on("click", ".activate-menu", function(n) {
        n.preventDefault(), n.stopPropagation(), e(".main-menu").slideToggle(500, function() {
            e(this).is(":hidden") && e(this).removeAttr("style")
        })
    }), t(), e(window).on("scroll", function() {
        t()
    });
    var u = 0,
        g = 50;
    e(window).on("scroll", function(n) {
        var t = Math.abs(e(window).scrollTop() - u);
        t > g && (e(".smoke").removeClass("active"), u = e(window).scrollTop()), 0 == e(window).scrollTop() && e(".smoke").addClass("active")
    });
    var v = new Sketcher("logo", "/static/images/manship/manship_logo_lines.png", "/static/images/manship/manship_logo_mask.png"),
        f = new Sketcher("logo", "/static/images/manship/manship_logo_lines.png", "/static/images/manship/manship_logo_mask2.png"),
        y = function(e, n) {
            return jQuery({
                count: e
            }).animate({
                count: n
            }, {
                duration: 900,
                easing: "easeInOutCubic",
                step: function() {
                    v.setThreshold(this.count, !0)
                }
            })
        },
        w = function(e, n) {
            return jQuery({
                count: e
            }).animate({
                count: n
            }, {
                duration: 900,
                easing: "easeInOutCubic",
                step: function() {
                    f.setThreshold(this.count, !0)
                }
            })
        };
    e("#overlay_logo").append(v.getElement()), y(0, 1);
    var b = function() {
        var n = !0,
            t = !0;
        e(".hero-img")[0].complete || (n = !1, setTimeout(function() {
            b()
        }, 100)), "undefined" != typeof e(".hero-img")[0].naturalWidth && 0 === e(".hero-img")[0].naturalWidth && (t = !1), n && t && (e(".hero-img").height() > o() ? e(".hero-wrapper_inner, .smoke").height(o()) : e(".hero-wrapper_inner, .smoke").height(e(".hero-img").height()))
    };
    if (i() > 768 ? (e("html").addClass("desktop"), e(".hero-img").length && b(), e(".home").length ? (e(".overlay").one(c, function(n) {
            e("body").removeClass("onload-page"), e(".hero-caption_copy, #content").addClass("anim-fadeup"), e(".branding").addClass("onload"), e(".main-menu ul").one(c, function(n) {
                e(".branding").removeClass("onload").addClass("active"), e(".smoke").addClass("active")
            }), "custom" == c && setTimeout(function() {
                e(".main-menu ul").trigger(c)
            }, 1e3)
        }), "custom" == c && setTimeout(function() {
            e(".overlay").trigger(c)
        }, 1e3)) : e(".manship-story").length ? (e(".branding").addClass("active"), setTimeout(function() {
            e("body").removeClass("onload-page")
        }, 2e3), e(".branding").hoverIntent(function() {
            e("html").is(".desktop") && (e(".branding").removeClass("hide-nav"), e(".story-menu").removeClass("in"))
        }, function() {
            setTimeout(function() {
                e("html").is(".desktop") && (e(".branding").addClass("hide-nav"), e(".story-menu").addClass("in")), e(".child-open").length && e(".child-open .sub-menu").slideUp(400, function() {
                    e("ul, li").removeAttr("style"), e(".child-open").removeClass("child-open")
                })
            }, 500)
        }), e(document).on("click", ".story-menu", function() {
            e("html").is(".desktop") && (e(".branding").removeClass("hide-nav"), e(".story-menu").removeClass("in"))
        })) : (e(".branding").addClass("active"), e(".overlay").one(c, function(n) {
            e("body").removeClass("onload-page"), e(".hero-caption_copy, #content").addClass("anim-fadeup")
        }), "custom" == c && setTimeout(function() {
            e(".overlay").trigger(c)
        }, 1e3)), e(document).on("click.nav", ".desktop .has-children > a", function(n) {
            n.preventDefault(), n.stopPropagation();
            var t = this;
            e(t).parent().hasClass("child-open") ? (e(t).parent().removeClass("child-open"), e(t).next(".sub-menu").slideToggle()) : e(".has-children").hasClass("child-open") ? e(".child-open .sub-menu").slideToggle(400, function() {
                e(".child-open").removeClass("child-open"), e(t).next(".sub-menu").slideToggle(), e(t).parent().addClass("child-open")
            }) : (e(t).parent().addClass("child-open"), e(t).next(".sub-menu").slideToggle())
        }), e(".main-menu li > a").not(".has-children > a").click(function(n) {
            n.preventDefault(), n.stopPropagation();
            var t = this.getAttribute("href");
            e("#overlay_logo canvas").remove(), e("#overlay_logo").append(f.getElement()), w(1, 0), e(".overlay").css({
                visibility: "visible",
                opacity: 1
            }), e(".overlay").one(r(), function() {
                window.location = t
            }), "custom" == c && setTimeout(function() {
                window.location = t
            }, 1e3)
        })) : (e("html").addClass("mobile"), e(".branding").addClass("active"), e(".overlay").one(m(), function(n) {
            e("body").removeClass("onload-page"), e(".hero-caption_copy, #content").addClass("anim-fadeup")
        }), e(".hero-wrapper_inner, .smoke").removeAttr("style")), e(window).resize(function() {
            if (i() > 768 && e(".mobile").length) e("html").removeClass("mobile").addClass("desktop"), e(".branding").addClass("hide-nav"), e(".story-menu").length || e(".branding .logo").append('<span class="story-menu">MENU</span>'), e(".story-menu").addClass("in"), e(document).off(".nav"), e(document).on("click.nav", ".desktop .has-children > a", function(n) {
                n.preventDefault(), n.stopPropagation();
                var t = this;
                e(t).parent().hasClass("child-open") ? (e(t).parent().removeClass("child-open"), e(t).next(".sub-menu").slideToggle()) : e(".has-children").hasClass("child-open") ? e(".child-open .sub-menu").slideToggle(400, function() {
                    e(".child-open").removeClass("child-open"), e(t).next(".sub-menu").slideToggle(), e(t).parent().addClass("child-open")
                }) : (e(t).parent().addClass("child-open"), e(t).next(".sub-menu").slideToggle())
            });
            else if (i() < 769 && e(".desktop").length && (e("html").removeClass("desktop").addClass("mobile"), e(".branding").removeClass("hide-nav"), e(".story-menu").length && e(".story-menu").remove(), e(".manship-story").length)) {
                for (var n = 1; n <= 7; n++) e("#story-slider").append('<div class="slide-' + n + '"></div>');
                setTimeout(function() {
                    e("#story-slider").slick({
                        infinite: !1
                    })
                }, 100)
            }
            i() > 768 ? e(".hero-img").height() > o() ? e(".hero-wrapper_inner, .smoke").height(o()) : e(".hero-wrapper_inner, .smoke").height(e(".hero-img").height()) : (e(".hero-wrapper_inner, .sub-menu, .smoke").removeAttr("style"), e(".has-children").removeClass("child-open"))
        }), e(".manship-story").length) {
        e(".step, #story-slider").css({
            width: i,
            height: o
        }), e(window).on("resize", function() {
            e(".step, #story-slider").css({
                width: i,
                height: o
            })
        }), e(document).on("touchstart click", ".clicker", function(e) {
            e.preventDefault(), e.stopPropagation(), impress().next()
        }), e(document).on("touchstart click", "#intro.past", function(n) {
            n.preventDefault(), n.stopPropagation(), e("#illuminated").is(".complete.present") && (e("html").is(".desktop") && !e(".branding").hasClass("hide-nav") && (e(".branding").addClass("hide-nav"), e(".story-menu").addClass("in")), impress()["goto"]("fire", 0)), e("#fire").is(".complete.present") && (e("html").is(".desktop") && !e(".branding").hasClass("hide-nav") && (e(".branding").addClass("hide-nav"), e(".story-menu").addClass("in")), impress()["goto"]("new-possibilities", 4e3))
        }), e(document).on("touchstart click", "#new-possibilities.present", function(n) {
            n.preventDefault(), n.stopPropagation(), e("#new-possibilities").is(".complete.present") && (e("html").is(".desktop") && !e(".branding").hasClass("hide-nav") && (e(".branding").addClass("hide-nav"), e(".story-menu").addClass("in")), impress()["goto"]("inspired", 2e3))
        }), e(document).on("touchstart click", "#inspired.present", function(n) {
            n.preventDefault(), n.stopPropagation(), e("#inspired").is(".complete.present") && (e("html").is(".desktop") && !e(".branding").hasClass("hide-nav") && (e(".branding").addClass("hide-nav"), e(".story-menu").addClass("in")), impress()["goto"]("dishes", 2e3))
        }), e(document).on("touchstart click", "#inspired.past", function(n) {
            n.preventDefault(), n.stopPropagation(), e("#dishes").is(".complete.present") && (e("html").is(".desktop") && !e(".branding").hasClass("hide-nav") && (e(".branding").addClass("hide-nav"), e(".story-menu").addClass("in")), impress()["goto"]("table", 2e3))
        }), e(document).on("touchstart click", "#table.present", function(n) {
            n.preventDefault(), n.stopPropagation(), e("#table").is(".complete.present") && (e("html").is(".desktop") && !e(".branding").hasClass("hide-nav") && (e(".branding").addClass("hide-nav"), e(".story-menu").addClass("in")), impress()["goto"]("oven", 2e3))
        });
        var C = new TimelineLite;
        if (e("#impress").on("impress:stepenter", function(n) {
                var t = e(n.target).attr("id");
                if ("intro" == t && C.to({
                        value: 0
                    }, 0, {
                        delay: 2,
                        onStart: function() {
                            e("html").is(".desktop") && (e(".branding").addClass("hide-nav"), e(".story-menu").length || setTimeout(function() {
                                e(".branding .logo").append('<span class="story-menu">МЕНЮ</span>'), e(".story-menu").addClass("in")
                            }, 2e3))
                        }
                    }).to({
                        value: 0
                    }, 0, {
                        onStart: function() {
                            e("body").hasClass("impress-on-intro") && impress()["goto"]("illuminated", 2e3)
                        }
                    }, "+=1.5"), "illuminated" == t && !e("#illuminated").hasClass("complete")) {
                    var a = new Sketcher("illuminated-canvas", "/static/images/manship/illuminated2.png", "/static/images/manship/illuminated_map9.jpg");
                    e("#illuminated").append(a.getElement()), C.to({
                        value: 0
                    }, 3, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", a],
                        onComplete: h,
                        onCompleteParams: [a]
                    })
                }
                if ("fire" == t && !e("#fire").hasClass("complete")) {
                    var s = new Sketcher("banner-canvas", "/static/images/manship/fire-banner2.png", "/static/images/manship/fire-banner_map2.jpg");
                    e("#fire").append(s.getElement());
                    var o = new Sketcher("cb-canvas", "/static/images/manship/fire-banner-copy2.png", "/static/images/manship/fire-banner-copy_map.jpg");
                    e("#fire").append(o.getElement());
                    var i = new Sketcher("withFire-canvas", "/static/images/manship/fire-copy2.png", "/static/images/manship/fire-copy_map2.jpg");
                    e("#fire").append(i.getElement()), C.to({
                        value: 0
                    }, 1, {
                        onStart: function() {
                            e("#illuminated canvas").fadeOut(1e3)
                        }
                    }).to({
                        value: 0
                    }, 2, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", s]
                    }, "-=.5").to({
                        value: 0
                    }, 2, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", o]
                    }, "-=1").to({
                        value: 0
                    }, 2, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", i],
                        onComplete: h,
                        onCompleteParams: [i]
                    }, "-=1")
                }
                if ("new-possibilities" == t && !e("#new-possibilities").hasClass("complete")) {
                    e(".tree-left, .tree-right").remove(), l(e(".moon")), l(e(".earth"));
                    var p = new Sketcher("npStars", "/static/images/manship/np-stars2.png", "/static/images/manship/np-stars-map.jpg");
                    e("#new-possibilities").append(p.getElement());
                    var r = new Sketcher("npBanner", "/static/images/manship/np-banner2.png", "/static/images/manship/np-banner-map.jpg");
                    e("#new-possibilities").append(r.getElement());
                    var m = new Sketcher("npBannerCopy", "/static/images/manship/np-banner-copy2.png", "/static/images/manship/np-banner-copy-map.jpg");
                    e("#new-possibilities").append(m.getElement());
                    var c = new Sketcher("npCopy", "/static/images/manship/np-copy2.png", "/static/images/manship/np-copy-map.jpg");
                    e("#new-possibilities").append(c.getElement()), C.to({
                        value: 0
                    }, 3, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", p]
                    }).to({
                        value: 0
                    }, 2, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", r]
                    }, "-=1").to({
                        value: 0
                    }, 2, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", m]
                    }, "-=1").to({
                        value: 0
                    }, 2, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", c],
                        onComplete: h,
                        onCompleteParams: [c]
                    }, "-=1")
                }
                if ("inspired" == t && !e("#inspired").hasClass("complete")) {
                    l(e(".wood-top")), l(e(".plate")), l(e(".glass"));
                    var u = new Sketcher("earthBanner", "/static/images/manship/inspired-banners2.png", "/static/images/manship/inspired-banners-map.jpg");
                    e("#inspired").append(u.getElement());
                    var g = new Sketcher("earth", "/static/images/manship/inspired-earth3.png", "/static/images/manship/inspired-earth-copy-map.jpg");
                    e("#inspired").append(g.getElement());
                    var v = new Sketcher("earthCopy", "/static/images/manship/inspired-earth-copy2.png", "/static/images/manship/inspired-earth-copy-map.jpg");
                    e("#inspired").append(v.getElement());
                    var f = new Sketcher("bannerTopCopy", "/static/images/manship/inspired-banner-top-copy2.png", "/static/images/manship/inspired-banner-top-copy-map.jpg");
                    e("#inspired").append(f.getElement());
                    var y = new Sketcher("bannerBottomCopy", "/static/images/manship/inspired-banner-bottom-copy2.png", "/static/images/manship/inspired-banner-bottom-copy-map.jpg");
                    e("#inspired").append(y.getElement()), C.to({
                        value: 0
                    }, 2, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", u]
                    }).to({
                        value: 0
                    }, 2, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", f]
                    }, "-=1").to({
                        value: 0
                    }, 2, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", g]
                    }).to({
                        value: 0
                    }, 2, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", v]
                    }, "-=2").to({
                        value: 0
                    }, 2, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", y],
                        onComplete: h,
                        onCompleteParams: [y]
                    }, "-=1")
                }
                if ("dishes" == t && !e("#dishes").hasClass("complete")) {
                    l(e(".wine-left")), l(e(".wine-right")), l(e(".wood-fire"));
                    var w = new Sketcher("dishesFood", "/static/images/manship/dishes-food2.png", "/static/images/manship/dishes-food2-map.jpg");
                    e("#dishes").append(w.getElement());
                    var b = new Sketcher("dishesTopCopyUnder", "/static/images/manship/dishes-top-copy-under2.png", "/static/images/manship/dishes-top-copy-under2-map.jpg");
                    e("#dishes").append(b.getElement());
                    var k = new Sketcher("dishesTopCopy", "/static/images/manship/dishes-top-copy2.png", "/static/images/manship/dishes-top-copy2-map.jpg");
                    e("#dishes").append(k.getElement());
                    var T = new Sketcher("dishesBotomCopy", "/static/images/manship/dishes-bottom-copy2.png", "/static/images/manship/dishes-bottom-copy2-map.jpg");
                    e("#dishes").append(T.getElement());
                    var U = new Sketcher("dishesBanner", "/static/images/manship/dishes-banner2.png", "/static/images/manship/dishes-banner-map2.jpg");
                    e("#dishes").append(U.getElement());
                    var P = new Sketcher("dishesBannerTopCopy", "/static/images/manship/dishes-banner-top-copy2.png", "/static/images/manship/dishes-banner-top-copy2-map.jpg");
                    e("#dishes").append(P.getElement());
                    var S = new Sketcher("dishesBannerBottomCopy", "/static/images/manship/dishes-banner-bottom-copy2.png", "/static/images/manship/dishes-banner-bottom-copy2-map.jpg");
                    e("#dishes").append(S.getElement()), C.to({
                        value: 0
                    }, 2, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", w]
                    }).to({
                        value: 0
                    }, 2, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", U]
                    }).to({
                        value: 0
                    }, 1.5, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", b]
                    }).to({
                        value: 0
                    }, 1.5, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", k]
                    }, "-=1.5").to({
                        value: 0
                    }, 1.5, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", P]
                    }, "-=.75").to({
                        value: 0
                    }, 1.5, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", T]
                    }).to({
                        value: 0
                    }, 1.5, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", S],
                        onComplete: h,
                        onCompleteParams: [S]
                    }, "-=.75")
                }
                if ("table" == t && !e("#table").hasClass("complete")) {
                    var _ = new Sketcher("handsCopy", "/static/images/manship/hands-copy2.png", "/static/images/manship/hands-copy-map.jpg");
                    e("#table").append(_.getElement());
                    var E = new Sketcher("handsBanner", "/static/images/manship/hands-banner2.png", "/static/images/manship/hands-banner-map.jpg");
                    e("#table").append(E.getElement());
                    var j = new Sketcher("bannerCopy", "/static/images/manship/hands-banner-copy2.png", "/static/images/manship/hands-banner-copy-map.jpg");
                    e("#table").append(j.getElement()), C.to({
                        value: 0
                    }, 2, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", _]
                    }).to({
                        value: 0
                    }, 2, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", E]
                    }, "-=1").to({
                        value: 0
                    }, 2, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", j],
                        onComplete: h,
                        onCompleteParams: [j]
                    }, "-=1")
                }
                if ("oven" == t && !e("#oven").hasClass("complete")) {
                    e("#table").hide();
                    var N = new Sketcher("ovenTopCopy", "/static/images/manship/oven-top-copy2.png", "/static/images/manship/oven-top-copy-map.jpg");
                    e("#oven").append(N.getElement());
                    var I = new Sketcher("ovenBanner", "/static/images/manship/oven-banner2.png", "/static/images/manship/oven-banner-map.jpg");
                    e("#oven").append(I.getElement());
                    var L = new Sketcher("ovenBannerCopy", "/static/images/manship/oven-banner-copy2.png", "/static/images/manship/oven-banner-copy-map.jpg");
                    e("#oven").append(L.getElement());
                    var B = new Sketcher("ovenBottomCopy", "/static/images/manship/oven-bottom-copy2.png", "/static/images/manship/oven-bottom-copy-map.jpg");
                    e("#oven").append(B.getElement()), C.to({
                        value: 0
                    }, 2, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", N]
                    }).to({
                        value: 0
                    }, 2, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", I]
                    }, "-=1").to({
                        value: 0
                    }, 2, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", L]
                    }, "-=1").to({
                        value: 0
                    }, 2, {
                        ease: Linear.easeNone,
                        value: 1,
                        onUpdate: d,
                        onUpdateParams: ["{self}", B],
                        onComplete: h,
                        onCompleteParams: [B]
                    }, "-=1").to({
                        value: 0
                    }, 0, {
                        onStart: function() {
                            e(".fin").fadeIn()
                        }
                    }, "+=1.5")
                }
            }), e("#impress").on("impress:stepleave", function(n) {
                e(n.target).attr("id");
                e("body").removeClass("complete")
            }), impress().init(), e(".mobile").length) {
            for (var k = 1; k <= 7; k++) e("#story-slider").append('<div class="slide-' + k + '"></div>');
            e("#story-slider").slick({
                infinite: !1
            })
        }
    }
    e(".gallery").length && e(".gallery").slick({
        arrows: !0,
        slide: ".gallery-item",
        speed: 750,
        autoplaySpeed: 7500,
        slidesToShow: 1,
        slidesToScroll: 1
    }), e(".table-responsive").length && e(".table-responsive").footable(), e("body.libations").length && e(".libations-slider").slick({
        centerMode: !0,
        centerPadding: "0px",
        infinite: !0,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: !0,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: !0,
                centerMode: !0,
                arrows: !0
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    }), e(document).on("touchstart click", ".header-phone", function(e) {
        ga("send", "event", "call", "primary", "header-phone")
    }), e(document).on("touchstart click", ".contact-phone", function(e) {
        ga("send", "event", "call", "primary", "contact-phone")
    }), e(document).on("touchstart click", ".contact-catering", function(e) {
        ga("send", "event", "call", "catering", "contact-catering")
    }), e(document).on("touchstart click", "#gform_submit_button_1", function(e) {
        jQuery("#gform_1")[0].checkValidity && !jQuery("#gform_1")[0].checkValidity() || ga("send", "event", "form", "submit", "private-dining-request")
    }), e(document).on("keypress", function(e) {
        13 == e.which && (jQuery("#gform_1")[0].checkValidity && !jQuery("#gform_1")[0].checkValidity() || ga("send", "event", "form", "submit", "private-dining-request"))
    })
});
