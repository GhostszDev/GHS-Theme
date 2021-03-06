/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.6
 *
 */
(function (e) {
    e.fn.extend({
        slimScroll: function (g) {
            var a = e.extend({
                width: "auto",
                height: "250px",
                size: "7px",
                color: "#000",
                position: "right",
                distance: "1px",
                start: "top",
                opacity: .4,
                alwaysVisible: !1,
                disableFadeOut: !1,
                railVisible: !1,
                railColor: "#333",
                railOpacity: .2,
                railDraggable: !0,
                railClass: "slimScrollRail",
                barClass: "slimScrollBar",
                wrapperClass: "slimScrollDiv",
                allowPageScroll: !1,
                wheelStep: 20,
                touchScrollStep: 200,
                borderRadius: "7px",
                railBorderRadius: "7px"
            }, g);
            this.each(function () {
                function v(d) {
                    if (r) {
                        d = d || window.event;
                        var c = 0;
                        d.wheelDelta && (c = -d.wheelDelta / 120);
                        d.detail && (c = d.detail / 3);
                        e(d.target || d.srcTarget || d.srcElement).closest("." + a.wrapperClass).is(b.parent()) && m(c, !0);
                        d.preventDefault && !k && d.preventDefault();
                        k || (d.returnValue = !1)
                    }
                }

                function m(d, e, g) {
                    k = !1;
                    var f = d, h = b.outerHeight() - c.outerHeight();
                    e && (f = parseInt(c.css("top")) + d * parseInt(a.wheelStep) / 100 * c.outerHeight(), f = Math.min(Math.max(f, 0), h), f = 0 < d ? Math.ceil(f) : Math.floor(f), c.css({top: f + "px"}));
                    l = parseInt(c.css("top")) / (b.outerHeight() - c.outerHeight());
                    f = l * (b[0].scrollHeight - b.outerHeight());
                    g && (f = d, d = f / b[0].scrollHeight * b.outerHeight(), d = Math.min(Math.max(d, 0), h), c.css({top: d + "px"}));
                    b.scrollTop(f);
                    b.trigger("slimscrolling", ~~f);
                    w();
                    p()
                }

                function x() {
                    u = Math.max(b.outerHeight() / b[0].scrollHeight * b.outerHeight(), 30);
                    c.css({height: u + "px"});
                    var a = u == b.outerHeight() ? "none" : "block";
                    c.css({display: a})
                }

                function w() {
                    x();
                    clearTimeout(B);
                    l == ~~l ? (k = a.allowPageScroll, C != l && b.trigger("slimscroll", 0 == ~~l ? "top" : "bottom")) : k = !1;
                    C = l;
                    u >= b.outerHeight() ? k = !0 : (c.stop(!0,
                        !0).fadeIn("fast"), a.railVisible && h.stop(!0, !0).fadeIn("fast"))
                }

                function p() {
                    a.alwaysVisible || (B = setTimeout(function () {
                        a.disableFadeOut && r || y || z || (c.fadeOut("slow"), h.fadeOut("slow"))
                    }, 1E3))
                }

                var r, y, z, B, A, u, l, C, k = !1, b = e(this);
                if (b.parent().hasClass(a.wrapperClass)) {
                    var n = b.scrollTop(), c = b.closest("." + a.barClass), h = b.closest("." + a.railClass);
                    x();
                    if (e.isPlainObject(g)) {
                        if ("height" in g && "auto" == g.height) {
                            b.parent().css("height", "auto");
                            b.css("height", "auto");
                            var q = b.parent().parent().height();
                            b.parent().css("height",
                                q);
                            b.css("height", q)
                        }
                        if ("scrollTo" in g) n = parseInt(a.scrollTo); else if ("scrollBy" in g) n += parseInt(a.scrollBy); else if ("destroy" in g) {
                            c.remove();
                            h.remove();
                            b.unwrap();
                            return
                        }
                        m(n, !1, !0)
                    }
                } else if (!(e.isPlainObject(g) && "destroy" in g)) {
                    a.height = "auto" == a.height ? b.parent().height() : a.height;
                    n = e("<div></div>").addClass(a.wrapperClass).css({
                        position: "relative",
                        overflow: "hidden",
                        width: a.width,
                        height: a.height
                    });
                    b.css({overflow: "hidden", width: a.width, height: a.height});
                    var h = e("<div></div>").addClass(a.railClass).css({
                        width: a.size,
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        display: a.alwaysVisible && a.railVisible ? "block" : "none",
                        "border-radius": a.railBorderRadius,
                        background: a.railColor,
                        opacity: a.railOpacity,
                        zIndex: 90
                    }), c = e("<div></div>").addClass(a.barClass).css({
                        background: a.color,
                        width: a.size,
                        position: "absolute",
                        top: 0,
                        opacity: a.opacity,
                        display: a.alwaysVisible ? "block" : "none",
                        "border-radius": a.borderRadius,
                        BorderRadius: a.borderRadius,
                        MozBorderRadius: a.borderRadius,
                        WebkitBorderRadius: a.borderRadius,
                        zIndex: 99
                    }), q = "right" == a.position ?
                        {right: a.distance} : {left: a.distance};
                    h.css(q);
                    c.css(q);
                    b.wrap(n);
                    b.parent().append(c);
                    b.parent().append(h);
                    a.railDraggable && c.bind("mousedown", function (a) {
                        var b = e(document);
                        z = !0;
                        t = parseFloat(c.css("top"));
                        pageY = a.pageY;
                        b.bind("mousemove.slimscroll", function (a) {
                            currTop = t + a.pageY - pageY;
                            c.css("top", currTop);
                            m(0, c.position().top, !1)
                        });
                        b.bind("mouseup.slimscroll", function (a) {
                            z = !1;
                            p();
                            b.unbind(".slimscroll")
                        });
                        return !1
                    }).bind("selectstart.slimscroll", function (a) {
                        a.stopPropagation();
                        a.preventDefault();
                        return !1
                    });
                    h.hover(function () {
                        w()
                    }, function () {
                        p()
                    });
                    c.hover(function () {
                        y = !0
                    }, function () {
                        y = !1
                    });
                    b.hover(function () {
                        r = !0;
                        w();
                        p()
                    }, function () {
                        r = !1;
                        p()
                    });
                    b.bind("touchstart", function (a, b) {
                        a.originalEvent.touches.length && (A = a.originalEvent.touches[0].pageY)
                    });
                    b.bind("touchmove", function (b) {
                        k || b.originalEvent.preventDefault();
                        b.originalEvent.touches.length && (m((A - b.originalEvent.touches[0].pageY) / a.touchScrollStep, !0), A = b.originalEvent.touches[0].pageY)
                    });
                    x();
                    "bottom" === a.start ? (c.css({top: b.outerHeight() - c.outerHeight()}),
                        m(0, !0)) : "top" !== a.start && (m(e(a.start).position().top, null, !0), a.alwaysVisible || c.hide());
                    window.addEventListener ? (this.addEventListener("DOMMouseScroll", v, !1), this.addEventListener("mousewheel", v, !1)) : document.attachEvent("onmousewheel", v)
                }
            });
            return this
        }
    });
    e.fn.extend({slimscroll: e.fn.slimScroll})
})(jQuery);

// Peity jQuery plugin version 3.2.0
// (c) 2015 Ben Pickles
//
// http://benpickles.github.io/peity
//
// Released under MIT license.
(function (k, w, h, v) {
    var d = k.fn.peity = function (a, b) {
        y && this.each(function () {
            var e = k(this), c = e.data("_peity");
            c ? (a && (c.type = a), k.extend(c.opts, b)) : (c = new x(e, a, k.extend({}, d.defaults[a], e.data("peity"), b)), e.change(function () {
                c.draw()
            }).data("_peity", c));
            c.draw()
        });
        return this
    }, x = function (a, b, e) {
        this.$el = a;
        this.type = b;
        this.opts = e
    }, o = x.prototype, q = o.svgElement = function (a, b) {
        return k(w.createElementNS("http://www.w3.org/2000/svg", a)).attr(b)
    }, y = "createElementNS" in w && q("svg", {})[0].createSVGRect;
    o.draw =
        function () {
            var a = this.opts;
            d.graphers[this.type].call(this, a);
            a.after && a.after.call(this, a)
        };
    o.fill = function () {
        var a = this.opts.fill;
        return k.isFunction(a) ? a : function (b, e) {
            return a[e % a.length]
        }
    };
    o.prepare = function (a, b) {
        this.$svg || this.$el.hide().after(this.$svg = q("svg", {"class": "peity"}));
        return this.$svg.empty().data("peity", this).attr({height: b, width: a})
    };
    o.values = function () {
        return k.map(this.$el.text().split(this.opts.delimiter), function (a) {
            return parseFloat(a)
        })
    };
    d.defaults = {};
    d.graphers = {};
    d.register =
        function (a, b, e) {
            this.defaults[a] = b;
            this.graphers[a] = e
        };
    d.register("pie", {fill: ["#ff9900", "#fff4dd", "#ffc66e"], radius: 8}, function (a) {
        if (!a.delimiter) {
            var b = this.$el.text().match(/[^0-9\.]/);
            a.delimiter = b ? b[0] : ","
        }
        b = k.map(this.values(), function (a) {
            return 0 < a ? a : 0
        });
        if ("/" == a.delimiter) var e = b[0], b = [e, h.max(0, b[1] - e)];
        for (var c = 0, e = b.length, t = 0; c < e; c++) t += b[c];
        t || (e = 2, t = 1, b = [0, 1]);
        var l = 2 * a.radius, l = this.prepare(a.width || l, a.height || l), c = l.width(), f = l.height(), j = c / 2,
            d = f / 2, f = h.min(j, d), a = a.innerRadius;
        "donut" == this.type && !a && (a = 0.5 * f);
        for (var r = h.PI, s = this.fill(), g = this.scale = function (a, b) {
            var c = a / t * r * 2 - r / 2;
            return [b * h.cos(c) + j, b * h.sin(c) + d]
        }, m = 0, c = 0; c < e; c++) {
            var u = b[c], i = u / t;
            if (0 != i) {
                if (1 == i) if (a) var i = j - 0.01, p = d - f, n = d - a,
                    i = q("path", {d: ["M", j, p, "A", f, f, 0, 1, 1, i, p, "L", i, n, "A", a, a, 0, 1, 0, j, n].join(" ")}); else i = q("circle", {
                    cx: j,
                    cy: d,
                    r: f
                }); else p = m + u, n = ["M"].concat(g(m, f), "A", f, f, 0, 0.5 < i ? 1 : 0, 1, g(p, f), "L"), a ? n = n.concat(g(p, a), "A", a, a, 0, 0.5 < i ? 1 : 0, 0, g(m, a)) : n.push(j, d), m += u, i = q("path", {d: n.join(" ")});
                i.attr("fill", s.call(this, u, c, b));
                l.append(i)
            }
        }
    });
    d.register("donut", k.extend(!0, {}, d.defaults.pie), function (a) {
        d.graphers.pie.call(this, a)
    });
    d.register("line", {
        delimiter: ",",
        fill: "#c6d9fd",
        height: 16,
        min: 0,
        stroke: "#4d89f9",
        strokeWidth: 1,
        width: 32
    }, function (a) {
        var b = this.values();
        1 == b.length && b.push(b[0]);
        for (var e = h.max.apply(h, a.max == v ? b : b.concat(a.max)), c = h.min.apply(h, a.min == v ? b : b.concat(a.min)), d = this.prepare(a.width, a.height), l = a.strokeWidth, f = d.width(), j = d.height() - l, k = e - c, e = this.x = function (a) {
            return a *
                (f / (b.length - 1))
        }, r = this.y = function (a) {
            var b = j;
            k && (b -= (a - c) / k * j);
            return b + l / 2
        }, s = r(h.max(c, 0)), g = [0, s], m = 0; m < b.length; m++) g.push(e(m), r(b[m]));
        g.push(f, s);
        a.fill && d.append(q("polygon", {fill: a.fill, points: g.join(" ")}));
        l && d.append(q("polyline", {
            fill: "none",
            points: g.slice(2, g.length - 2).join(" "),
            stroke: a.stroke,
            "stroke-width": l,
            "stroke-linecap": "square"
        }))
    });
    d.register("bar", {delimiter: ",", fill: ["#4D89F9"], height: 16, min: 0, padding: 0.1, width: 32}, function (a) {
        for (var b = this.values(), e = h.max.apply(h, a.max ==
        v ? b : b.concat(a.max)), c = h.min.apply(h, a.min == v ? b : b.concat(a.min)), d = this.prepare(a.width, a.height), l = d.width(), f = d.height(), j = e - c, a = a.padding, k = this.fill(), r = this.x = function (a) {
            return a * l / b.length
        }, s = this.y = function (a) {
            return f - (j ? (a - c) / j * f : 1)
        }, g = 0; g < b.length; g++) {
            var m = r(g + a), u = r(g + 1 - a) - m, i = b[g], p = s(i), n = p, o;
            j ? 0 > i ? n = s(h.min(e, 0)) : p = s(h.max(c, 0)) : o = 1;
            o = p - n;
            0 == o && (o = 1, 0 < e && j && n--);
            d.append(q("rect", {fill: k.call(this, i, g, b), x: m, y: n, width: u, height: o}))
        }
    })
})(jQuery, document, Math);


/* Javascript plotting library for jQuery, v. 0.7.
 *
 * Released under the MIT license by IOLA, December 2007.
 *
 */
(function (b) {
    b.color = {};
    b.color.make = function (d, e, g, f) {
        var c = {};
        c.r = d || 0;
        c.g = e || 0;
        c.b = g || 0;
        c.a = f != null ? f : 1;
        c.add = function (h, j) {
            for (var k = 0; k < h.length; ++k) {
                c[h.charAt(k)] += j
            }
            return c.normalize()
        };
        c.scale = function (h, j) {
            for (var k = 0; k < h.length; ++k) {
                c[h.charAt(k)] *= j
            }
            return c.normalize()
        };
        c.toString = function () {
            if (c.a >= 1) {
                return "rgb(" + [c.r, c.g, c.b].join(",") + ")"
            } else {
                return "rgba(" + [c.r, c.g, c.b, c.a].join(",") + ")"
            }
        };
        c.normalize = function () {
            function h(k, j, l) {
                return j < k ? k : (j > l ? l : j)
            }

            c.r = h(0, parseInt(c.r), 255);
            c.g = h(0, parseInt(c.g), 255);
            c.b = h(0, parseInt(c.b), 255);
            c.a = h(0, c.a, 1);
            return c
        };
        c.clone = function () {
            return b.color.make(c.r, c.b, c.g, c.a)
        };
        return c.normalize()
    };
    b.color.extract = function (d, e) {
        var c;
        do {
            c = d.css(e).toLowerCase();
            if (c != "" && c != "transparent") {
                break
            }
            d = d.parent()
        } while (!b.nodeName(d.get(0), "body"));
        if (c == "rgba(0, 0, 0, 0)") {
            c = "transparent"
        }
        return b.color.parse(c)
    };
    b.color.parse = function (c) {
        var d, f = b.color.make;
        if (d = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(c)) {
            return f(parseInt(d[1], 10), parseInt(d[2], 10), parseInt(d[3], 10))
        }
        if (d = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(c)) {
            return f(parseInt(d[1], 10), parseInt(d[2], 10), parseInt(d[3], 10), parseFloat(d[4]))
        }
        if (d = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(c)) {
            return f(parseFloat(d[1]) * 2.55, parseFloat(d[2]) * 2.55, parseFloat(d[3]) * 2.55)
        }
        if (d = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(c)) {
            return f(parseFloat(d[1]) * 2.55, parseFloat(d[2]) * 2.55, parseFloat(d[3]) * 2.55, parseFloat(d[4]))
        }
        if (d = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(c)) {
            return f(parseInt(d[1], 16), parseInt(d[2], 16), parseInt(d[3], 16))
        }
        if (d = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(c)) {
            return f(parseInt(d[1] + d[1], 16), parseInt(d[2] + d[2], 16), parseInt(d[3] + d[3], 16))
        }
        var e = b.trim(c).toLowerCase();
        if (e == "transparent") {
            return f(255, 255, 255, 0)
        } else {
            d = a[e] || [0, 0, 0];
            return f(d[0], d[1], d[2])
        }
    };
    var a = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0]
    }
})(jQuery);
(function (c) {
    function b(av, ai, J, af) {
        var Q = [], O = {
                colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"],
                legend: {
                    show: true,
                    noColumns: 1,
                    labelFormatter: null,
                    labelBoxBorderColor: "#ccc",
                    container: null,
                    position: "ne",
                    margin: 5,
                    backgroundColor: null,
                    backgroundOpacity: 0.85
                },
                xaxis: {
                    show: null,
                    position: "bottom",
                    mode: null,
                    color: null,
                    tickColor: null,
                    transform: null,
                    inverseTransform: null,
                    min: null,
                    max: null,
                    autoscaleMargin: null,
                    ticks: null,
                    tickFormatter: null,
                    labelWidth: null,
                    labelHeight: null,
                    reserveSpace: null,
                    tickLength: null,
                    alignTicksWithAxis: null,
                    tickDecimals: null,
                    tickSize: null,
                    minTickSize: null,
                    monthNames: null,
                    timeformat: null,
                    twelveHourClock: false
                },
                yaxis: {autoscaleMargin: 0.02, position: "left"},
                xaxes: [],
                yaxes: [],
                series: {
                    points: {show: false, radius: 3, lineWidth: 2, fill: true, fillColor: "#ffffff", symbol: "circle"},
                    lines: {lineWidth: 2, fill: false, fillColor: null, steps: false},
                    bars: {
                        show: false,
                        lineWidth: 2,
                        barWidth: 1,
                        fill: true,
                        fillColor: null,
                        align: "left",
                        horizontal: false
                    },
                    shadowSize: 3
                },
                grid: {
                    show: true,
                    aboveData: false,
                    color: "#545454",
                    backgroundColor: null,
                    borderColor: null,
                    tickColor: null,
                    labelMargin: 5,
                    axisMargin: 8,
                    borderWidth: 2,
                    minBorderMargin: null,
                    markings: null,
                    markingsColor: "#f4f4f4",
                    markingsLineWidth: 2,
                    clickable: false,
                    hoverable: false,
                    autoHighlight: true,
                    mouseActiveRadius: 10
                },
                hooks: {}
            }, az = null, ad = null, y = null, H = null, A = null, p = [], aw = [],
            q = {left: 0, right: 0, top: 0, bottom: 0}, G = 0, I = 0, h = 0, w = 0, ak = {
                processOptions: [],
                processRawData: [],
                processDatapoints: [],
                drawSeries: [],
                draw: [],
                bindEvents: [],
                drawOverlay: [],
                shutdown: []
            }, aq = this;
        aq.setData = aj;
        aq.setupGrid = t;
        aq.draw = W;
        aq.getPlaceholder = function () {
            return av
        };
        aq.getCanvas = function () {
            return az
        };
        aq.getPlotOffset = function () {
            return q
        };
        aq.width = function () {
            return h
        };
        aq.height = function () {
            return w
        };
        aq.offset = function () {
            var aB = y.offset();
            aB.left += q.left;
            aB.top += q.top;
            return aB
        };
        aq.getData = function () {
            return Q
        };
        aq.getAxes = function () {
            var aC = {}, aB;
            c.each(p.concat(aw), function (aD, aE) {
                if (aE) {
                    aC[aE.direction + (aE.n != 1 ? aE.n : "") + "axis"] = aE
                }
            });
            return aC
        };
        aq.getXAxes = function () {
            return p
        };
        aq.getYAxes = function () {
            return aw
        };
        aq.c2p = C;
        aq.p2c = ar;
        aq.getOptions = function () {
            return O
        };
        aq.highlight = x;
        aq.unhighlight = T;
        aq.triggerRedrawOverlay = f;
        aq.pointOffset = function (aB) {
            return {
                left: parseInt(p[aA(aB, "x") - 1].p2c(+aB.x) + q.left),
                top: parseInt(aw[aA(aB, "y") - 1].p2c(+aB.y) + q.top)
            }
        };
        aq.shutdown = ag;
        aq.resize = function () {
            B();
            g(az);
            g(ad)
        };
        aq.hooks = ak;
        F(aq);
        Z(J);
        X();
        aj(ai);
        t();
        W();
        ah();

        function an(aD, aB) {
            aB = [aq].concat(aB);
            for (var aC = 0; aC < aD.length; ++aC) {
                aD[aC].apply(this, aB)
            }
        }

        function F() {
            for (var aB = 0; aB < af.length; ++aB) {
                var aC = af[aB];
                aC.init(aq);
                if (aC.options) {
                    c.extend(true, O, aC.options)
                }
            }
        }

        function Z(aC) {
            var aB;
            c.extend(true, O, aC);
            if (O.xaxis.color == null) {
                O.xaxis.color = O.grid.color
            }
            if (O.yaxis.color == null) {
                O.yaxis.color = O.grid.color
            }
            if (O.xaxis.tickColor == null) {
                O.xaxis.tickColor = O.grid.tickColor
            }
            if (O.yaxis.tickColor == null) {
                O.yaxis.tickColor = O.grid.tickColor
            }
            if (O.grid.borderColor == null) {
                O.grid.borderColor = O.grid.color
            }
            if (O.grid.tickColor == null) {
                O.grid.tickColor = c.color.parse(O.grid.color).scale("a", 0.22).toString()
            }
            for (aB = 0; aB < Math.max(1, O.xaxes.length); ++aB) {
                O.xaxes[aB] = c.extend(true, {}, O.xaxis, O.xaxes[aB])
            }
            for (aB = 0; aB < Math.max(1, O.yaxes.length); ++aB) {
                O.yaxes[aB] = c.extend(true, {}, O.yaxis, O.yaxes[aB])
            }
            if (O.xaxis.noTicks && O.xaxis.ticks == null) {
                O.xaxis.ticks = O.xaxis.noTicks
            }
            if (O.yaxis.noTicks && O.yaxis.ticks == null) {
                O.yaxis.ticks = O.yaxis.noTicks
            }
            if (O.x2axis) {
                O.xaxes[1] = c.extend(true, {}, O.xaxis, O.x2axis);
                O.xaxes[1].position = "top"
            }
            if (O.y2axis) {
                O.yaxes[1] = c.extend(true, {}, O.yaxis, O.y2axis);
                O.yaxes[1].position = "right"
            }
            if (O.grid.coloredAreas) {
                O.grid.markings = O.grid.coloredAreas
            }
            if (O.grid.coloredAreasColor) {
                O.grid.markingsColor = O.grid.coloredAreasColor
            }
            if (O.lines) {
                c.extend(true, O.series.lines, O.lines)
            }
            if (O.points) {
                c.extend(true, O.series.points, O.points)
            }
            if (O.bars) {
                c.extend(true, O.series.bars, O.bars)
            }
            if (O.shadowSize != null) {
                O.series.shadowSize = O.shadowSize
            }
            for (aB = 0; aB < O.xaxes.length; ++aB) {
                V(p, aB + 1).options = O.xaxes[aB]
            }
            for (aB = 0; aB < O.yaxes.length; ++aB) {
                V(aw, aB + 1).options = O.yaxes[aB]
            }
            for (var aD in ak) {
                if (O.hooks[aD] && O.hooks[aD].length) {
                    ak[aD] = ak[aD].concat(O.hooks[aD])
                }
            }
            an(ak.processOptions, [O])
        }

        function aj(aB) {
            Q = Y(aB);
            ax();
            z()
        }

        function Y(aE) {
            var aC = [];
            for (var aB = 0; aB < aE.length; ++aB) {
                var aD = c.extend(true, {}, O.series);
                if (aE[aB].data != null) {
                    aD.data = aE[aB].data;
                    delete aE[aB].data;
                    c.extend(true, aD, aE[aB]);
                    aE[aB].data = aD.data
                } else {
                    aD.data = aE[aB]
                }
                aC.push(aD)
            }
            return aC
        }

        function aA(aC, aD) {
            var aB = aC[aD + "axis"];
            if (typeof aB == "object") {
                aB = aB.n
            }
            if (typeof aB != "number") {
                aB = 1
            }
            return aB
        }

        function m() {
            return c.grep(p.concat(aw), function (aB) {
                return aB
            })
        }

        function C(aE) {
            var aC = {}, aB, aD;
            for (aB = 0; aB < p.length; ++aB) {
                aD = p[aB];
                if (aD && aD.used) {
                    aC["x" + aD.n] = aD.c2p(aE.left)
                }
            }
            for (aB = 0; aB < aw.length; ++aB) {
                aD = aw[aB];
                if (aD && aD.used) {
                    aC["y" + aD.n] = aD.c2p(aE.top)
                }
            }
            if (aC.x1 !== undefined) {
                aC.x = aC.x1
            }
            if (aC.y1 !== undefined) {
                aC.y = aC.y1
            }
            return aC
        }

        function ar(aF) {
            var aD = {}, aC, aE, aB;
            for (aC = 0; aC < p.length; ++aC) {
                aE = p[aC];
                if (aE && aE.used) {
                    aB = "x" + aE.n;
                    if (aF[aB] == null && aE.n == 1) {
                        aB = "x"
                    }
                    if (aF[aB] != null) {
                        aD.left = aE.p2c(aF[aB]);
                        break
                    }
                }
            }
            for (aC = 0; aC < aw.length; ++aC) {
                aE = aw[aC];
                if (aE && aE.used) {
                    aB = "y" + aE.n;
                    if (aF[aB] == null && aE.n == 1) {
                        aB = "y"
                    }
                    if (aF[aB] != null) {
                        aD.top = aE.p2c(aF[aB]);
                        break
                    }
                }
            }
            return aD
        }

        function V(aC, aB) {
            if (!aC[aB - 1]) {
                aC[aB - 1] = {
                    n: aB,
                    direction: aC == p ? "x" : "y",
                    options: c.extend(true, {}, aC == p ? O.xaxis : O.yaxis)
                }
            }
            return aC[aB - 1]
        }

        function ax() {
            var aG;
            var aM = Q.length, aB = [], aE = [];
            for (aG = 0; aG < Q.length; ++aG) {
                var aJ = Q[aG].color;
                if (aJ != null) {
                    --aM;
                    if (typeof aJ == "number") {
                        aE.push(aJ)
                    } else {
                        aB.push(c.color.parse(Q[aG].color))
                    }
                }
            }
            for (aG = 0; aG < aE.length; ++aG) {
                aM = Math.max(aM, aE[aG] + 1)
            }
            var aC = [], aF = 0;
            aG = 0;
            while (aC.length < aM) {
                var aI;
                if (O.colors.length == aG) {
                    aI = c.color.make(100, 100, 100)
                } else {
                    aI = c.color.parse(O.colors[aG])
                }
                var aD = aF % 2 == 1 ? -1 : 1;
                aI.scale("rgb", 1 + aD * Math.ceil(aF / 2) * 0.2);
                aC.push(aI);
                ++aG;
                if (aG >= O.colors.length) {
                    aG = 0;
                    ++aF
                }
            }
            var aH = 0, aN;
            for (aG = 0; aG < Q.length; ++aG) {
                aN = Q[aG];
                if (aN.color == null) {
                    aN.color = aC[aH].toString();
                    ++aH
                } else {
                    if (typeof aN.color == "number") {
                        aN.color = aC[aN.color].toString()
                    }
                }
                if (aN.lines.show == null) {
                    var aL, aK = true;
                    for (aL in aN) {
                        if (aN[aL] && aN[aL].show) {
                            aK = false;
                            break
                        }
                    }
                    if (aK) {
                        aN.lines.show = true
                    }
                }
                aN.xaxis = V(p, aA(aN, "x"));
                aN.yaxis = V(aw, aA(aN, "y"))
            }
        }

        function z() {
            var aO = Number.POSITIVE_INFINITY, aI = Number.NEGATIVE_INFINITY, aB = Number.MAX_VALUE, aU, aS, aR, aN, aD,
                aJ, aT, aP, aH, aG, aC, a0, aX, aL;

            function aF(a3, a2, a1) {
                if (a2 < a3.datamin && a2 != -aB) {
                    a3.datamin = a2
                }
                if (a1 > a3.datamax && a1 != aB) {
                    a3.datamax = a1
                }
            }

            c.each(m(), function (a1, a2) {
                a2.datamin = aO;
                a2.datamax = aI;
                a2.used = false
            });
            for (aU = 0; aU < Q.length; ++aU) {
                aJ = Q[aU];
                aJ.datapoints = {points: []};
                an(ak.processRawData, [aJ, aJ.data, aJ.datapoints])
            }
            for (aU = 0; aU < Q.length; ++aU) {
                aJ = Q[aU];
                var aZ = aJ.data, aW = aJ.datapoints.format;
                if (!aW) {
                    aW = [];
                    aW.push({x: true, number: true, required: true});
                    aW.push({y: true, number: true, required: true});
                    if (aJ.bars.show || (aJ.lines.show && aJ.lines.fill)) {
                        aW.push({y: true, number: true, required: false, defaultValue: 0});
                        if (aJ.bars.horizontal) {
                            delete aW[aW.length - 1].y;
                            aW[aW.length - 1].x = true
                        }
                    }
                    aJ.datapoints.format = aW
                }
                if (aJ.datapoints.pointsize != null) {
                    continue
                }
                aJ.datapoints.pointsize = aW.length;
                aP = aJ.datapoints.pointsize;
                aT = aJ.datapoints.points;
                insertSteps = aJ.lines.show && aJ.lines.steps;
                aJ.xaxis.used = aJ.yaxis.used = true;
                for (aS = aR = 0; aS < aZ.length; ++aS, aR += aP) {
                    aL = aZ[aS];
                    var aE = aL == null;
                    if (!aE) {
                        for (aN = 0; aN < aP; ++aN) {
                            a0 = aL[aN];
                            aX = aW[aN];
                            if (aX) {
                                if (aX.number && a0 != null) {
                                    a0 = +a0;
                                    if (isNaN(a0)) {
                                        a0 = null
                                    } else {
                                        if (a0 == Infinity) {
                                            a0 = aB
                                        } else {
                                            if (a0 == -Infinity) {
                                                a0 = -aB
                                            }
                                        }
                                    }
                                }
                                if (a0 == null) {
                                    if (aX.required) {
                                        aE = true
                                    }
                                    if (aX.defaultValue != null) {
                                        a0 = aX.defaultValue
                                    }
                                }
                            }
                            aT[aR + aN] = a0
                        }
                    }
                    if (aE) {
                        for (aN = 0; aN < aP; ++aN) {
                            a0 = aT[aR + aN];
                            if (a0 != null) {
                                aX = aW[aN];
                                if (aX.x) {
                                    aF(aJ.xaxis, a0, a0)
                                }
                                if (aX.y) {
                                    aF(aJ.yaxis, a0, a0)
                                }
                            }
                            aT[aR + aN] = null
                        }
                    } else {
                        if (insertSteps && aR > 0 && aT[aR - aP] != null && aT[aR - aP] != aT[aR] && aT[aR - aP + 1] != aT[aR + 1]) {
                            for (aN = 0; aN < aP; ++aN) {
                                aT[aR + aP + aN] = aT[aR + aN]
                            }
                            aT[aR + 1] = aT[aR - aP + 1];
                            aR += aP
                        }
                    }
                }
            }
            for (aU = 0; aU < Q.length; ++aU) {
                aJ = Q[aU];
                an(ak.processDatapoints, [aJ, aJ.datapoints])
            }
            for (aU = 0; aU < Q.length; ++aU) {
                aJ = Q[aU];
                aT = aJ.datapoints.points, aP = aJ.datapoints.pointsize;
                var aK = aO, aQ = aO, aM = aI, aV = aI;
                for (aS = 0; aS < aT.length; aS += aP) {
                    if (aT[aS] == null) {
                        continue
                    }
                    for (aN = 0; aN < aP; ++aN) {
                        a0 = aT[aS + aN];
                        aX = aW[aN];
                        if (!aX || a0 == aB || a0 == -aB) {
                            continue
                        }
                        if (aX.x) {
                            if (a0 < aK) {
                                aK = a0
                            }
                            if (a0 > aM) {
                                aM = a0
                            }
                        }
                        if (aX.y) {
                            if (a0 < aQ) {
                                aQ = a0
                            }
                            if (a0 > aV) {
                                aV = a0
                            }
                        }
                    }
                }
                if (aJ.bars.show) {
                    var aY = aJ.bars.align == "left" ? 0 : -aJ.bars.barWidth / 2;
                    if (aJ.bars.horizontal) {
                        aQ += aY;
                        aV += aY + aJ.bars.barWidth
                    } else {
                        aK += aY;
                        aM += aY + aJ.bars.barWidth
                    }
                }
                aF(aJ.xaxis, aK, aM);
                aF(aJ.yaxis, aQ, aV)
            }
            c.each(m(), function (a1, a2) {
                if (a2.datamin == aO) {
                    a2.datamin = null
                }
                if (a2.datamax == aI) {
                    a2.datamax = null
                }
            })
        }

        function j(aB, aC) {
            var aD = document.createElement("canvas");
            aD.className = aC;
            aD.width = G;
            aD.height = I;
            if (!aB) {
                c(aD).css({position: "absolute", left: 0, top: 0})
            }
            c(aD).appendTo(av);
            if (!aD.getContext) {
                aD = window.G_vmlCanvasManager.initElement(aD)
            }
            aD.getContext("2d").save();
            return aD
        }

        function B() {
            G = av.width();
            I = av.height();
            if (G <= 0 || I <= 0) {
                throw"Invalid dimensions for plot, width = " + G + ", height = " + I
            }
        }

        function g(aC) {
            if (aC.width != G) {
                aC.width = G
            }
            if (aC.height != I) {
                aC.height = I
            }
            var aB = aC.getContext("2d");
            aB.restore();
            aB.save()
        }

        function X() {
            var aC, aB = av.children("canvas.base"), aD = av.children("canvas.overlay");
            if (aB.length == 0 || aD == 0) {
                av.html("");
                av.css({padding: 0});
                if (av.css("position") == "static") {
                    av.css("position", "relative")
                }
                B();
                az = j(true, "base");
                ad = j(false, "overlay");
                aC = false
            } else {
                az = aB.get(0);
                ad = aD.get(0);
                aC = true
            }
            H = az.getContext("2d");
            A = ad.getContext("2d");
            y = c([ad, az]);
            if (aC) {
                av.data("plot").shutdown();
                aq.resize();
                A.clearRect(0, 0, G, I);
                y.unbind();
                av.children().not([az, ad]).remove()
            }
            av.data("plot", aq)
        }

        function ah() {
            if (O.grid.hoverable) {
                y.mousemove(aa);
                y.mouseleave(l)
            }
            if (O.grid.clickable) {
                y.click(R)
            }
            an(ak.bindEvents, [y])
        }

        function ag() {
            if (M) {
                clearTimeout(M)
            }
            y.unbind("mousemove", aa);
            y.unbind("mouseleave", l);
            y.unbind("click", R);
            an(ak.shutdown, [y])
        }

        function r(aG) {
            function aC(aH) {
                return aH
            }

            var aF, aB, aD = aG.options.transform || aC, aE = aG.options.inverseTransform;
            if (aG.direction == "x") {
                aF = aG.scale = h / Math.abs(aD(aG.max) - aD(aG.min));
                aB = Math.min(aD(aG.max), aD(aG.min))
            } else {
                aF = aG.scale = w / Math.abs(aD(aG.max) - aD(aG.min));
                aF = -aF;
                aB = Math.max(aD(aG.max), aD(aG.min))
            }
            if (aD == aC) {
                aG.p2c = function (aH) {
                    return (aH - aB) * aF
                }
            } else {
                aG.p2c = function (aH) {
                    return (aD(aH) - aB) * aF
                }
            }
            if (!aE) {
                aG.c2p = function (aH) {
                    return aB + aH / aF
                }
            } else {
                aG.c2p = function (aH) {
                    return aE(aB + aH / aF)
                }
            }
        }

        function L(aD) {
            var aB = aD.options, aF, aJ = aD.ticks || [], aI = [], aE, aK = aB.labelWidth, aG = aB.labelHeight, aC;

            function aH(aM, aL) {
                return c('<div style="position:absolute;top:-10000px;' + aL + 'font-size:smaller"><div class="' + aD.direction + "Axis " + aD.direction + aD.n + 'Axis">' + aM.join("") + "</div></div>").appendTo(av)
            }

            if (aD.direction == "x") {
                if (aK == null) {
                    aK = Math.floor(G / (aJ.length > 0 ? aJ.length : 1))
                }
                if (aG == null) {
                    aI = [];
                    for (aF = 0; aF < aJ.length; ++aF) {
                        aE = aJ[aF].label;
                        if (aE) {
                            aI.push('<div class="tickLabel" style="float:left;width:' + aK + 'px">' + aE + "</div>")
                        }
                    }
                    if (aI.length > 0) {
                        aI.push('<div style="clear:left"></div>');
                        aC = aH(aI, "width:10000px;");
                        aG = aC.height();
                        aC.remove()
                    }
                }
            } else {
                if (aK == null || aG == null) {
                    for (aF = 0; aF < aJ.length; ++aF) {
                        aE = aJ[aF].label;
                        if (aE) {
                            aI.push('<div class="tickLabel">' + aE + "</div>")
                        }
                    }
                    if (aI.length > 0) {
                        aC = aH(aI, "");
                        if (aK == null) {
                            aK = aC.children().width()
                        }
                        if (aG == null) {
                            aG = aC.find("div.tickLabel").height()
                        }
                        aC.remove()
                    }
                }
            }
            if (aK == null) {
                aK = 0
            }
            if (aG == null) {
                aG = 0
            }
            aD.labelWidth = aK;
            aD.labelHeight = aG
        }

        function au(aD) {
            var aC = aD.labelWidth, aL = aD.labelHeight, aH = aD.options.position, aF = aD.options.tickLength,
                aG = O.grid.axisMargin, aJ = O.grid.labelMargin, aK = aD.direction == "x" ? p : aw, aE;
            var aB = c.grep(aK, function (aN) {
                return aN && aN.options.position == aH && aN.reserveSpace
            });
            if (c.inArray(aD, aB) == aB.length - 1) {
                aG = 0
            }
            if (aF == null) {
                aF = "full"
            }
            var aI = c.grep(aK, function (aN) {
                return aN && aN.reserveSpace
            });
            var aM = c.inArray(aD, aI) == 0;
            if (!aM && aF == "full") {
                aF = 5
            }
            if (!isNaN(+aF)) {
                aJ += +aF
            }
            if (aD.direction == "x") {
                aL += aJ;
                if (aH == "bottom") {
                    q.bottom += aL + aG;
                    aD.box = {top: I - q.bottom, height: aL}
                } else {
                    aD.box = {top: q.top + aG, height: aL};
                    q.top += aL + aG
                }
            } else {
                aC += aJ;
                if (aH == "left") {
                    aD.box = {left: q.left + aG, width: aC};
                    q.left += aC + aG
                } else {
                    q.right += aC + aG;
                    aD.box = {left: G - q.right, width: aC}
                }
            }
            aD.position = aH;
            aD.tickLength = aF;
            aD.box.padding = aJ;
            aD.innermost = aM
        }

        function U(aB) {
            if (aB.direction == "x") {
                aB.box.left = q.left;
                aB.box.width = h
            } else {
                aB.box.top = q.top;
                aB.box.height = w
            }
        }

        function t() {
            var aC, aE = m();
            c.each(aE, function (aF, aG) {
                aG.show = aG.options.show;
                if (aG.show == null) {
                    aG.show = aG.used
                }
                aG.reserveSpace = aG.show || aG.options.reserveSpace;
                n(aG)
            });
            allocatedAxes = c.grep(aE, function (aF) {
                return aF.reserveSpace
            });
            q.left = q.right = q.top = q.bottom = 0;
            if (O.grid.show) {
                c.each(allocatedAxes, function (aF, aG) {
                    S(aG);
                    P(aG);
                    ap(aG, aG.ticks);
                    L(aG)
                });
                for (aC = allocatedAxes.length - 1; aC >= 0; --aC) {
                    au(allocatedAxes[aC])
                }
                var aD = O.grid.minBorderMargin;
                if (aD == null) {
                    aD = 0;
                    for (aC = 0; aC < Q.length; ++aC) {
                        aD = Math.max(aD, Q[aC].points.radius + Q[aC].points.lineWidth / 2)
                    }
                }
                for (var aB in q) {
                    q[aB] += O.grid.borderWidth;
                    q[aB] = Math.max(aD, q[aB])
                }
            }
            h = G - q.left - q.right;
            w = I - q.bottom - q.top;
            c.each(aE, function (aF, aG) {
                r(aG)
            });
            if (O.grid.show) {
                c.each(allocatedAxes, function (aF, aG) {
                    U(aG)
                });
                k()
            }
            o()
        }

        function n(aE) {
            var aF = aE.options, aD = +(aF.min != null ? aF.min : aE.datamin),
                aB = +(aF.max != null ? aF.max : aE.datamax), aH = aB - aD;
            if (aH == 0) {
                var aC = aB == 0 ? 1 : 0.01;
                if (aF.min == null) {
                    aD -= aC
                }
                if (aF.max == null || aF.min != null) {
                    aB += aC
                }
            } else {
                var aG = aF.autoscaleMargin;
                if (aG != null) {
                    if (aF.min == null) {
                        aD -= aH * aG;
                        if (aD < 0 && aE.datamin != null && aE.datamin >= 0) {
                            aD = 0
                        }
                    }
                    if (aF.max == null) {
                        aB += aH * aG;
                        if (aB > 0 && aE.datamax != null && aE.datamax <= 0) {
                            aB = 0
                        }
                    }
                }
            }
            aE.min = aD;
            aE.max = aB
        }

        function S(aG) {
            var aM = aG.options;
            var aH;
            if (typeof aM.ticks == "number" && aM.ticks > 0) {
                aH = aM.ticks
            } else {
                aH = 0.3 * Math.sqrt(aG.direction == "x" ? G : I)
            }
            var aT = (aG.max - aG.min) / aH, aO, aB, aN, aR, aS, aQ, aI;
            if (aM.mode == "time") {
                var aJ = {
                    second: 1000,
                    minute: 60 * 1000,
                    hour: 60 * 60 * 1000,
                    day: 24 * 60 * 60 * 1000,
                    month: 30 * 24 * 60 * 60 * 1000,
                    year: 365.2425 * 24 * 60 * 60 * 1000
                };
                var aK = [[1, "second"], [2, "second"], [5, "second"], [10, "second"], [30, "second"], [1, "minute"], [2, "minute"], [5, "minute"], [10, "minute"], [30, "minute"], [1, "hour"], [2, "hour"], [4, "hour"], [8, "hour"], [12, "hour"], [1, "day"], [2, "day"], [3, "day"], [0.25, "month"], [0.5, "month"], [1, "month"], [2, "month"], [3, "month"], [6, "month"], [1, "year"]];
                var aC = 0;
                if (aM.minTickSize != null) {
                    if (typeof aM.tickSize == "number") {
                        aC = aM.tickSize
                    } else {
                        aC = aM.minTickSize[0] * aJ[aM.minTickSize[1]]
                    }
                }
                for (var aS = 0; aS < aK.length - 1; ++aS) {
                    if (aT < (aK[aS][0] * aJ[aK[aS][1]] + aK[aS + 1][0] * aJ[aK[aS + 1][1]]) / 2 && aK[aS][0] * aJ[aK[aS][1]] >= aC) {
                        break
                    }
                }
                aO = aK[aS][0];
                aN = aK[aS][1];
                if (aN == "year") {
                    aQ = Math.pow(10, Math.floor(Math.log(aT / aJ.year) / Math.LN10));
                    aI = (aT / aJ.year) / aQ;
                    if (aI < 1.5) {
                        aO = 1
                    } else {
                        if (aI < 3) {
                            aO = 2
                        } else {
                            if (aI < 7.5) {
                                aO = 5
                            } else {
                                aO = 10
                            }
                        }
                    }
                    aO *= aQ
                }
                aG.tickSize = aM.tickSize || [aO, aN];
                aB = function (aX) {
                    var a2 = [], a0 = aX.tickSize[0], a3 = aX.tickSize[1], a1 = new Date(aX.min);
                    var aW = a0 * aJ[a3];
                    if (a3 == "second") {
                        a1.setUTCSeconds(a(a1.getUTCSeconds(), a0))
                    }
                    if (a3 == "minute") {
                        a1.setUTCMinutes(a(a1.getUTCMinutes(), a0))
                    }
                    if (a3 == "hour") {
                        a1.setUTCHours(a(a1.getUTCHours(), a0))
                    }
                    if (a3 == "month") {
                        a1.setUTCMonth(a(a1.getUTCMonth(), a0))
                    }
                    if (a3 == "year") {
                        a1.setUTCFullYear(a(a1.getUTCFullYear(), a0))
                    }
                    a1.setUTCMilliseconds(0);
                    if (aW >= aJ.minute) {
                        a1.setUTCSeconds(0)
                    }
                    if (aW >= aJ.hour) {
                        a1.setUTCMinutes(0)
                    }
                    if (aW >= aJ.day) {
                        a1.setUTCHours(0)
                    }
                    if (aW >= aJ.day * 4) {
                        a1.setUTCDate(1)
                    }
                    if (aW >= aJ.year) {
                        a1.setUTCMonth(0)
                    }
                    var a5 = 0, a4 = Number.NaN, aY;
                    do {
                        aY = a4;
                        a4 = a1.getTime();
                        a2.push(a4);
                        if (a3 == "month") {
                            if (a0 < 1) {
                                a1.setUTCDate(1);
                                var aV = a1.getTime();
                                a1.setUTCMonth(a1.getUTCMonth() + 1);
                                var aZ = a1.getTime();
                                a1.setTime(a4 + a5 * aJ.hour + (aZ - aV) * a0);
                                a5 = a1.getUTCHours();
                                a1.setUTCHours(0)
                            } else {
                                a1.setUTCMonth(a1.getUTCMonth() + a0)
                            }
                        } else {
                            if (a3 == "year") {
                                a1.setUTCFullYear(a1.getUTCFullYear() + a0)
                            } else {
                                a1.setTime(a4 + aW)
                            }
                        }
                    } while (a4 < aX.max && a4 != aY);
                    return a2
                };
                aR = function (aV, aY) {
                    var a0 = new Date(aV);
                    if (aM.timeformat != null) {
                        return c.plot.formatDate(a0, aM.timeformat, aM.monthNames)
                    }
                    var aW = aY.tickSize[0] * aJ[aY.tickSize[1]];
                    var aX = aY.max - aY.min;
                    var aZ = (aM.twelveHourClock) ? " %p" : "";
                    if (aW < aJ.minute) {
                        fmt = "%h:%M:%S" + aZ
                    } else {
                        if (aW < aJ.day) {
                            if (aX < 2 * aJ.day) {
                                fmt = "%h:%M" + aZ
                            } else {
                                fmt = "%b %d %h:%M" + aZ
                            }
                        } else {
                            if (aW < aJ.month) {
                                fmt = "%b %d"
                            } else {
                                if (aW < aJ.year) {
                                    if (aX < aJ.year) {
                                        fmt = "%b"
                                    } else {
                                        fmt = "%b %y"
                                    }
                                } else {
                                    fmt = "%y"
                                }
                            }
                        }
                    }
                    return c.plot.formatDate(a0, fmt, aM.monthNames)
                }
            } else {
                var aU = aM.tickDecimals;
                var aP = -Math.floor(Math.log(aT) / Math.LN10);
                if (aU != null && aP > aU) {
                    aP = aU
                }
                aQ = Math.pow(10, -aP);
                aI = aT / aQ;
                if (aI < 1.5) {
                    aO = 1
                } else {
                    if (aI < 3) {
                        aO = 2;
                        if (aI > 2.25 && (aU == null || aP + 1 <= aU)) {
                            aO = 2.5;
                            ++aP
                        }
                    } else {
                        if (aI < 7.5) {
                            aO = 5
                        } else {
                            aO = 10
                        }
                    }
                }
                aO *= aQ;
                if (aM.minTickSize != null && aO < aM.minTickSize) {
                    aO = aM.minTickSize
                }
                aG.tickDecimals = Math.max(0, aU != null ? aU : aP);
                aG.tickSize = aM.tickSize || aO;
                aB = function (aX) {
                    var aZ = [];
                    var a0 = a(aX.min, aX.tickSize), aW = 0, aV = Number.NaN, aY;
                    do {
                        aY = aV;
                        aV = a0 + aW * aX.tickSize;
                        aZ.push(aV);
                        ++aW
                    } while (aV < aX.max && aV != aY);
                    return aZ
                };
                aR = function (aV, aW) {
                    return aV.toFixed(aW.tickDecimals)
                }
            }
            if (aM.alignTicksWithAxis != null) {
                var aF = (aG.direction == "x" ? p : aw)[aM.alignTicksWithAxis - 1];
                if (aF && aF.used && aF != aG) {
                    var aL = aB(aG);
                    if (aL.length > 0) {
                        if (aM.min == null) {
                            aG.min = Math.min(aG.min, aL[0])
                        }
                        if (aM.max == null && aL.length > 1) {
                            aG.max = Math.max(aG.max, aL[aL.length - 1])
                        }
                    }
                    aB = function (aX) {
                        var aY = [], aV, aW;
                        for (aW = 0; aW < aF.ticks.length; ++aW) {
                            aV = (aF.ticks[aW].v - aF.min) / (aF.max - aF.min);
                            aV = aX.min + aV * (aX.max - aX.min);
                            aY.push(aV)
                        }
                        return aY
                    };
                    if (aG.mode != "time" && aM.tickDecimals == null) {
                        var aE = Math.max(0, -Math.floor(Math.log(aT) / Math.LN10) + 1), aD = aB(aG);
                        if (!(aD.length > 1 && /\..*0$/.test((aD[1] - aD[0]).toFixed(aE)))) {
                            aG.tickDecimals = aE
                        }
                    }
                }
            }
            aG.tickGenerator = aB;
            if (c.isFunction(aM.tickFormatter)) {
                aG.tickFormatter = function (aV, aW) {
                    return "" + aM.tickFormatter(aV, aW)
                }
            } else {
                aG.tickFormatter = aR
            }
        }

        function P(aF) {
            var aH = aF.options.ticks, aG = [];
            if (aH == null || (typeof aH == "number" && aH > 0)) {
                aG = aF.tickGenerator(aF)
            } else {
                if (aH) {
                    if (c.isFunction(aH)) {
                        aG = aH({min: aF.min, max: aF.max})
                    } else {
                        aG = aH
                    }
                }
            }
            var aE, aB;
            aF.ticks = [];
            for (aE = 0; aE < aG.length; ++aE) {
                var aC = null;
                var aD = aG[aE];
                if (typeof aD == "object") {
                    aB = +aD[0];
                    if (aD.length > 1) {
                        aC = aD[1]
                    }
                } else {
                    aB = +aD
                }
                if (aC == null) {
                    aC = aF.tickFormatter(aB, aF)
                }
                if (!isNaN(aB)) {
                    aF.ticks.push({v: aB, label: aC})
                }
            }
        }

        function ap(aB, aC) {
            if (aB.options.autoscaleMargin && aC.length > 0) {
                if (aB.options.min == null) {
                    aB.min = Math.min(aB.min, aC[0].v)
                }
                if (aB.options.max == null && aC.length > 1) {
                    aB.max = Math.max(aB.max, aC[aC.length - 1].v)
                }
            }
        }

        function W() {
            H.clearRect(0, 0, G, I);
            var aC = O.grid;
            if (aC.show && aC.backgroundColor) {
                N()
            }
            if (aC.show && !aC.aboveData) {
                ac()
            }
            for (var aB = 0; aB < Q.length; ++aB) {
                an(ak.drawSeries, [H, Q[aB]]);
                d(Q[aB])
            }
            an(ak.draw, [H]);
            if (aC.show && aC.aboveData) {
                ac()
            }
        }

        function D(aB, aI) {
            var aE, aH, aG, aD, aF = m();
            for (i = 0; i < aF.length; ++i) {
                aE = aF[i];
                if (aE.direction == aI) {
                    aD = aI + aE.n + "axis";
                    if (!aB[aD] && aE.n == 1) {
                        aD = aI + "axis"
                    }
                    if (aB[aD]) {
                        aH = aB[aD].from;
                        aG = aB[aD].to;
                        break
                    }
                }
            }
            if (!aB[aD]) {
                aE = aI == "x" ? p[0] : aw[0];
                aH = aB[aI + "1"];
                aG = aB[aI + "2"]
            }
            if (aH != null && aG != null && aH > aG) {
                var aC = aH;
                aH = aG;
                aG = aC
            }
            return {from: aH, to: aG, axis: aE}
        }

        function N() {
            H.save();
            H.translate(q.left, q.top);
            H.fillStyle = am(O.grid.backgroundColor, w, 0, "rgba(255, 255, 255, 0)");
            H.fillRect(0, 0, h, w);
            H.restore()
        }

        function ac() {
            var aF;
            H.save();
            H.translate(q.left, q.top);
            var aH = O.grid.markings;
            if (aH) {
                if (c.isFunction(aH)) {
                    var aK = aq.getAxes();
                    aK.xmin = aK.xaxis.min;
                    aK.xmax = aK.xaxis.max;
                    aK.ymin = aK.yaxis.min;
                    aK.ymax = aK.yaxis.max;
                    aH = aH(aK)
                }
                for (aF = 0; aF < aH.length; ++aF) {
                    var aD = aH[aF], aC = D(aD, "x"), aI = D(aD, "y");
                    if (aC.from == null) {
                        aC.from = aC.axis.min
                    }
                    if (aC.to == null) {
                        aC.to = aC.axis.max
                    }
                    if (aI.from == null) {
                        aI.from = aI.axis.min
                    }
                    if (aI.to == null) {
                        aI.to = aI.axis.max
                    }
                    if (aC.to < aC.axis.min || aC.from > aC.axis.max || aI.to < aI.axis.min || aI.from > aI.axis.max) {
                        continue
                    }
                    aC.from = Math.max(aC.from, aC.axis.min);
                    aC.to = Math.min(aC.to, aC.axis.max);
                    aI.from = Math.max(aI.from, aI.axis.min);
                    aI.to = Math.min(aI.to, aI.axis.max);
                    if (aC.from == aC.to && aI.from == aI.to) {
                        continue
                    }
                    aC.from = aC.axis.p2c(aC.from);
                    aC.to = aC.axis.p2c(aC.to);
                    aI.from = aI.axis.p2c(aI.from);
                    aI.to = aI.axis.p2c(aI.to);
                    if (aC.from == aC.to || aI.from == aI.to) {
                        H.beginPath();
                        H.strokeStyle = aD.color || O.grid.markingsColor;
                        H.lineWidth = aD.lineWidth || O.grid.markingsLineWidth;
                        H.moveTo(aC.from, aI.from);
                        H.lineTo(aC.to, aI.to);
                        H.stroke()
                    } else {
                        H.fillStyle = aD.color || O.grid.markingsColor;
                        H.fillRect(aC.from, aI.to, aC.to - aC.from, aI.from - aI.to)
                    }
                }
            }
            var aK = m(), aM = O.grid.borderWidth;
            for (var aE = 0; aE < aK.length; ++aE) {
                var aB = aK[aE], aG = aB.box, aQ = aB.tickLength, aN, aL, aP, aJ;
                if (!aB.show || aB.ticks.length == 0) {
                    continue
                }
                H.strokeStyle = aB.options.tickColor || c.color.parse(aB.options.color).scale("a", 0.22).toString();
                H.lineWidth = 1;
                if (aB.direction == "x") {
                    aN = 0;
                    if (aQ == "full") {
                        aL = (aB.position == "top" ? 0 : w)
                    } else {
                        aL = aG.top - q.top + (aB.position == "top" ? aG.height : 0)
                    }
                } else {
                    aL = 0;
                    if (aQ == "full") {
                        aN = (aB.position == "left" ? 0 : h)
                    } else {
                        aN = aG.left - q.left + (aB.position == "left" ? aG.width : 0)
                    }
                }
                if (!aB.innermost) {
                    H.beginPath();
                    aP = aJ = 0;
                    if (aB.direction == "x") {
                        aP = h
                    } else {
                        aJ = w
                    }
                    if (H.lineWidth == 1) {
                        aN = Math.floor(aN) + 0.5;
                        aL = Math.floor(aL) + 0.5
                    }
                    H.moveTo(aN, aL);
                    H.lineTo(aN + aP, aL + aJ);
                    H.stroke()
                }
                H.beginPath();
                for (aF = 0; aF < aB.ticks.length; ++aF) {
                    var aO = aB.ticks[aF].v;
                    aP = aJ = 0;
                    if (aO < aB.min || aO > aB.max || (aQ == "full" && aM > 0 && (aO == aB.min || aO == aB.max))) {
                        continue
                    }
                    if (aB.direction == "x") {
                        aN = aB.p2c(aO);
                        aJ = aQ == "full" ? -w : aQ;
                        if (aB.position == "top") {
                            aJ = -aJ
                        }
                    } else {
                        aL = aB.p2c(aO);
                        aP = aQ == "full" ? -h : aQ;
                        if (aB.position == "left") {
                            aP = -aP
                        }
                    }
                    if (H.lineWidth == 1) {
                        if (aB.direction == "x") {
                            aN = Math.floor(aN) + 0.5
                        } else {
                            aL = Math.floor(aL) + 0.5
                        }
                    }
                    H.moveTo(aN, aL);
                    H.lineTo(aN + aP, aL + aJ)
                }
                H.stroke()
            }
            if (aM) {
                H.lineWidth = aM;
                H.strokeStyle = O.grid.borderColor;
                H.strokeRect(-aM / 2, -aM / 2, h + aM, w + aM)
            }
            H.restore()
        }

        function k() {
            av.find(".tickLabels").remove();
            var aG = ['<div class="tickLabels" style="font-size:smaller">'];
            var aJ = m();
            for (var aD = 0; aD < aJ.length; ++aD) {
                var aC = aJ[aD], aF = aC.box;
                if (!aC.show) {
                    continue
                }
                aG.push('<div class="' + aC.direction + "Axis " + aC.direction + aC.n + 'Axis" style="color:' + aC.options.color + '">');
                for (var aE = 0; aE < aC.ticks.length; ++aE) {
                    var aH = aC.ticks[aE];
                    if (!aH.label || aH.v < aC.min || aH.v > aC.max) {
                        continue
                    }
                    var aK = {}, aI;
                    if (aC.direction == "x") {
                        aI = "center";
                        aK.left = Math.round(q.left + aC.p2c(aH.v) - aC.labelWidth / 2);
                        if (aC.position == "bottom") {
                            aK.top = aF.top + aF.padding
                        } else {
                            aK.bottom = I - (aF.top + aF.height - aF.padding)
                        }
                    } else {
                        aK.top = Math.round(q.top + aC.p2c(aH.v) - aC.labelHeight / 2);
                        if (aC.position == "left") {
                            aK.right = G - (aF.left + aF.width - aF.padding);
                            aI = "right"
                        } else {
                            aK.left = aF.left + aF.padding;
                            aI = "left"
                        }
                    }
                    aK.width = aC.labelWidth;
                    var aB = ["position:absolute", "text-align:" + aI];
                    for (var aL in aK) {
                        aB.push(aL + ":" + aK[aL] + "px")
                    }
                    aG.push('<div class="tickLabel" style="' + aB.join(";") + '">' + aH.label + "</div>")
                }
                aG.push("</div>")
            }
            aG.push("</div>");
            av.append(aG.join(""))
        }

        function d(aB) {
            if (aB.lines.show) {
                at(aB)
            }
            if (aB.bars.show) {
                e(aB)
            }
            if (aB.points.show) {
                ao(aB)
            }
        }

        function at(aE) {
            function aD(aP, aQ, aI, aU, aT) {
                var aV = aP.points, aJ = aP.pointsize, aN = null, aM = null;
                H.beginPath();
                for (var aO = aJ; aO < aV.length; aO += aJ) {
                    var aL = aV[aO - aJ], aS = aV[aO - aJ + 1], aK = aV[aO], aR = aV[aO + 1];
                    if (aL == null || aK == null) {
                        continue
                    }
                    if (aS <= aR && aS < aT.min) {
                        if (aR < aT.min) {
                            continue
                        }
                        aL = (aT.min - aS) / (aR - aS) * (aK - aL) + aL;
                        aS = aT.min
                    } else {
                        if (aR <= aS && aR < aT.min) {
                            if (aS < aT.min) {
                                continue
                            }
                            aK = (aT.min - aS) / (aR - aS) * (aK - aL) + aL;
                            aR = aT.min
                        }
                    }
                    if (aS >= aR && aS > aT.max) {
                        if (aR > aT.max) {
                            continue
                        }
                        aL = (aT.max - aS) / (aR - aS) * (aK - aL) + aL;
                        aS = aT.max
                    } else {
                        if (aR >= aS && aR > aT.max) {
                            if (aS > aT.max) {
                                continue
                            }
                            aK = (aT.max - aS) / (aR - aS) * (aK - aL) + aL;
                            aR = aT.max
                        }
                    }
                    if (aL <= aK && aL < aU.min) {
                        if (aK < aU.min) {
                            continue
                        }
                        aS = (aU.min - aL) / (aK - aL) * (aR - aS) + aS;
                        aL = aU.min
                    } else {
                        if (aK <= aL && aK < aU.min) {
                            if (aL < aU.min) {
                                continue
                            }
                            aR = (aU.min - aL) / (aK - aL) * (aR - aS) + aS;
                            aK = aU.min
                        }
                    }
                    if (aL >= aK && aL > aU.max) {
                        if (aK > aU.max) {
                            continue
                        }
                        aS = (aU.max - aL) / (aK - aL) * (aR - aS) + aS;
                        aL = aU.max
                    } else {
                        if (aK >= aL && aK > aU.max) {
                            if (aL > aU.max) {
                                continue
                            }
                            aR = (aU.max - aL) / (aK - aL) * (aR - aS) + aS;
                            aK = aU.max
                        }
                    }
                    if (aL != aN || aS != aM) {
                        H.moveTo(aU.p2c(aL) + aQ, aT.p2c(aS) + aI)
                    }
                    aN = aK;
                    aM = aR;
                    H.lineTo(aU.p2c(aK) + aQ, aT.p2c(aR) + aI)
                }
                H.stroke()
            }

            function aF(aI, aQ, aP) {
                var aW = aI.points, aV = aI.pointsize, aN = Math.min(Math.max(0, aP.min), aP.max), aX = 0, aU,
                    aT = false, aM = 1, aL = 0, aR = 0;
                while (true) {
                    if (aV > 0 && aX > aW.length + aV) {
                        break
                    }
                    aX += aV;
                    var aZ = aW[aX - aV], aK = aW[aX - aV + aM], aY = aW[aX], aJ = aW[aX + aM];
                    if (aT) {
                        if (aV > 0 && aZ != null && aY == null) {
                            aR = aX;
                            aV = -aV;
                            aM = 2;
                            continue
                        }
                        if (aV < 0 && aX == aL + aV) {
                            H.fill();
                            aT = false;
                            aV = -aV;
                            aM = 1;
                            aX = aL = aR + aV;
                            continue
                        }
                    }
                    if (aZ == null || aY == null) {
                        continue
                    }
                    if (aZ <= aY && aZ < aQ.min) {
                        if (aY < aQ.min) {
                            continue
                        }
                        aK = (aQ.min - aZ) / (aY - aZ) * (aJ - aK) + aK;
                        aZ = aQ.min
                    } else {
                        if (aY <= aZ && aY < aQ.min) {
                            if (aZ < aQ.min) {
                                continue
                            }
                            aJ = (aQ.min - aZ) / (aY - aZ) * (aJ - aK) + aK;
                            aY = aQ.min
                        }
                    }
                    if (aZ >= aY && aZ > aQ.max) {
                        if (aY > aQ.max) {
                            continue
                        }
                        aK = (aQ.max - aZ) / (aY - aZ) * (aJ - aK) + aK;
                        aZ = aQ.max
                    } else {
                        if (aY >= aZ && aY > aQ.max) {
                            if (aZ > aQ.max) {
                                continue
                            }
                            aJ = (aQ.max - aZ) / (aY - aZ) * (aJ - aK) + aK;
                            aY = aQ.max
                        }
                    }
                    if (!aT) {
                        H.beginPath();
                        H.moveTo(aQ.p2c(aZ), aP.p2c(aN));
                        aT = true
                    }
                    if (aK >= aP.max && aJ >= aP.max) {
                        H.lineTo(aQ.p2c(aZ), aP.p2c(aP.max));
                        H.lineTo(aQ.p2c(aY), aP.p2c(aP.max));
                        continue
                    } else {
                        if (aK <= aP.min && aJ <= aP.min) {
                            H.lineTo(aQ.p2c(aZ), aP.p2c(aP.min));
                            H.lineTo(aQ.p2c(aY), aP.p2c(aP.min));
                            continue
                        }
                    }
                    var aO = aZ, aS = aY;
                    if (aK <= aJ && aK < aP.min && aJ >= aP.min) {
                        aZ = (aP.min - aK) / (aJ - aK) * (aY - aZ) + aZ;
                        aK = aP.min
                    } else {
                        if (aJ <= aK && aJ < aP.min && aK >= aP.min) {
                            aY = (aP.min - aK) / (aJ - aK) * (aY - aZ) + aZ;
                            aJ = aP.min
                        }
                    }
                    if (aK >= aJ && aK > aP.max && aJ <= aP.max) {
                        aZ = (aP.max - aK) / (aJ - aK) * (aY - aZ) + aZ;
                        aK = aP.max
                    } else {
                        if (aJ >= aK && aJ > aP.max && aK <= aP.max) {
                            aY = (aP.max - aK) / (aJ - aK) * (aY - aZ) + aZ;
                            aJ = aP.max
                        }
                    }
                    if (aZ != aO) {
                        H.lineTo(aQ.p2c(aO), aP.p2c(aK))
                    }
                    H.lineTo(aQ.p2c(aZ), aP.p2c(aK));
                    H.lineTo(aQ.p2c(aY), aP.p2c(aJ));
                    if (aY != aS) {
                        H.lineTo(aQ.p2c(aY), aP.p2c(aJ));
                        H.lineTo(aQ.p2c(aS), aP.p2c(aJ))
                    }
                }
            }

            H.save();
            H.translate(q.left, q.top);
            H.lineJoin = "round";
            var aG = aE.lines.lineWidth, aB = aE.shadowSize;
            if (aG > 0 && aB > 0) {
                H.lineWidth = aB;
                H.strokeStyle = "rgba(0,0,0,0.1)";
                var aH = Math.PI / 18;
                aD(aE.datapoints, Math.sin(aH) * (aG / 2 + aB / 2), Math.cos(aH) * (aG / 2 + aB / 2), aE.xaxis, aE.yaxis);
                H.lineWidth = aB / 2;
                aD(aE.datapoints, Math.sin(aH) * (aG / 2 + aB / 4), Math.cos(aH) * (aG / 2 + aB / 4), aE.xaxis, aE.yaxis)
            }
            H.lineWidth = aG;
            H.strokeStyle = aE.color;
            var aC = ae(aE.lines, aE.color, 0, w);
            if (aC) {
                H.fillStyle = aC;
                aF(aE.datapoints, aE.xaxis, aE.yaxis)
            }
            if (aG > 0) {
                aD(aE.datapoints, 0, 0, aE.xaxis, aE.yaxis)
            }
            H.restore()
        }

        function ao(aE) {
            function aH(aN, aM, aU, aK, aS, aT, aQ, aJ) {
                var aR = aN.points, aI = aN.pointsize;
                for (var aL = 0; aL < aR.length; aL += aI) {
                    var aP = aR[aL], aO = aR[aL + 1];
                    if (aP == null || aP < aT.min || aP > aT.max || aO < aQ.min || aO > aQ.max) {
                        continue
                    }
                    H.beginPath();
                    aP = aT.p2c(aP);
                    aO = aQ.p2c(aO) + aK;
                    if (aJ == "circle") {
                        H.arc(aP, aO, aM, 0, aS ? Math.PI : Math.PI * 2, false)
                    } else {
                        aJ(H, aP, aO, aM, aS)
                    }
                    H.closePath();
                    if (aU) {
                        H.fillStyle = aU;
                        H.fill()
                    }
                    H.stroke()
                }
            }

            H.save();
            H.translate(q.left, q.top);
            var aG = aE.points.lineWidth, aC = aE.shadowSize, aB = aE.points.radius, aF = aE.points.symbol;
            if (aG > 0 && aC > 0) {
                var aD = aC / 2;
                H.lineWidth = aD;
                H.strokeStyle = "rgba(0,0,0,0.1)";
                aH(aE.datapoints, aB, null, aD + aD / 2, true, aE.xaxis, aE.yaxis, aF);
                H.strokeStyle = "rgba(0,0,0,0.2)";
                aH(aE.datapoints, aB, null, aD / 2, true, aE.xaxis, aE.yaxis, aF)
            }
            H.lineWidth = aG;
            H.strokeStyle = aE.color;
            aH(aE.datapoints, aB, ae(aE.points, aE.color), 0, false, aE.xaxis, aE.yaxis, aF);
            H.restore()
        }

        function E(aN, aM, aV, aI, aQ, aF, aD, aL, aK, aU, aR, aC) {
            var aE, aT, aJ, aP, aG, aB, aO, aH, aS;
            if (aR) {
                aH = aB = aO = true;
                aG = false;
                aE = aV;
                aT = aN;
                aP = aM + aI;
                aJ = aM + aQ;
                if (aT < aE) {
                    aS = aT;
                    aT = aE;
                    aE = aS;
                    aG = true;
                    aB = false
                }
            } else {
                aG = aB = aO = true;
                aH = false;
                aE = aN + aI;
                aT = aN + aQ;
                aJ = aV;
                aP = aM;
                if (aP < aJ) {
                    aS = aP;
                    aP = aJ;
                    aJ = aS;
                    aH = true;
                    aO = false
                }
            }
            if (aT < aL.min || aE > aL.max || aP < aK.min || aJ > aK.max) {
                return
            }
            if (aE < aL.min) {
                aE = aL.min;
                aG = false
            }
            if (aT > aL.max) {
                aT = aL.max;
                aB = false
            }
            if (aJ < aK.min) {
                aJ = aK.min;
                aH = false
            }
            if (aP > aK.max) {
                aP = aK.max;
                aO = false
            }
            aE = aL.p2c(aE);
            aJ = aK.p2c(aJ);
            aT = aL.p2c(aT);
            aP = aK.p2c(aP);
            if (aD) {
                aU.beginPath();
                aU.moveTo(aE, aJ);
                aU.lineTo(aE, aP);
                aU.lineTo(aT, aP);
                aU.lineTo(aT, aJ);
                aU.fillStyle = aD(aJ, aP);
                aU.fill()
            }
            if (aC > 0 && (aG || aB || aO || aH)) {
                aU.beginPath();
                aU.moveTo(aE, aJ + aF);
                if (aG) {
                    aU.lineTo(aE, aP + aF)
                } else {
                    aU.moveTo(aE, aP + aF)
                }
                if (aO) {
                    aU.lineTo(aT, aP + aF)
                } else {
                    aU.moveTo(aT, aP + aF)
                }
                if (aB) {
                    aU.lineTo(aT, aJ + aF)
                } else {
                    aU.moveTo(aT, aJ + aF)
                }
                if (aH) {
                    aU.lineTo(aE, aJ + aF)
                } else {
                    aU.moveTo(aE, aJ + aF)
                }
                aU.stroke()
            }
        }

        function e(aD) {
            function aC(aJ, aI, aL, aG, aK, aN, aM) {
                var aO = aJ.points, aF = aJ.pointsize;
                for (var aH = 0; aH < aO.length; aH += aF) {
                    if (aO[aH] == null) {
                        continue
                    }
                    E(aO[aH], aO[aH + 1], aO[aH + 2], aI, aL, aG, aK, aN, aM, H, aD.bars.horizontal, aD.bars.lineWidth)
                }
            }

            H.save();
            H.translate(q.left, q.top);
            H.lineWidth = aD.bars.lineWidth;
            H.strokeStyle = aD.color;
            var aB = aD.bars.align == "left" ? 0 : -aD.bars.barWidth / 2;
            var aE = aD.bars.fill ? function (aF, aG) {
                return ae(aD.bars, aD.color, aF, aG)
            } : null;
            aC(aD.datapoints, aB, aB + aD.bars.barWidth, 0, aE, aD.xaxis, aD.yaxis);
            H.restore()
        }

        function ae(aD, aB, aC, aF) {
            var aE = aD.fill;
            if (!aE) {
                return null
            }
            if (aD.fillColor) {
                return am(aD.fillColor, aC, aF, aB)
            }
            var aG = c.color.parse(aB);
            aG.a = typeof aE == "number" ? aE : 0.4;
            aG.normalize();
            return aG.toString()
        }

        function o() {
            av.find(".legend").remove();
            if (!O.legend.show) {
                return
            }
            var aH = [], aF = false, aN = O.legend.labelFormatter, aM, aJ;
            for (var aE = 0; aE < Q.length; ++aE) {
                aM = Q[aE];
                aJ = aM.label;
                if (!aJ) {
                    continue
                }
                if (aE % O.legend.noColumns == 0) {
                    if (aF) {
                        aH.push("</tr>")
                    }
                    aH.push("<tr>");
                    aF = true
                }
                if (aN) {
                    aJ = aN(aJ, aM)
                }
                aH.push('<td class="legendColorBox"><div style="border:1px solid ' + O.legend.labelBoxBorderColor + ';padding:1px"><div style="width:4px;height:0;border:5px solid ' + aM.color + ';overflow:hidden"></div></div></td><td class="legendLabel">' + aJ + "</td>")
            }
            if (aF) {
                aH.push("</tr>")
            }
            if (aH.length == 0) {
                return
            }
            var aL = '<table style="font-size:smaller;color:' + O.grid.color + '">' + aH.join("") + "</table>";
            if (O.legend.container != null) {
                c(O.legend.container).html(aL)
            } else {
                var aI = "", aC = O.legend.position, aD = O.legend.margin;
                if (aD[0] == null) {
                    aD = [aD, aD]
                }
                if (aC.charAt(0) == "n") {
                    aI += "top:" + (aD[1] + q.top) + "px;"
                } else {
                    if (aC.charAt(0) == "s") {
                        aI += "bottom:" + (aD[1] + q.bottom) + "px;"
                    }
                }
                if (aC.charAt(1) == "e") {
                    aI += "right:" + (aD[0] + q.right) + "px;"
                } else {
                    if (aC.charAt(1) == "w") {
                        aI += "left:" + (aD[0] + q.left) + "px;"
                    }
                }
                var aK = c('<div class="legend">' + aL.replace('style="', 'style="position:absolute;' + aI + ";") + "</div>").appendTo(av);
                if (O.legend.backgroundOpacity != 0) {
                    var aG = O.legend.backgroundColor;
                    if (aG == null) {
                        aG = O.grid.backgroundColor;
                        if (aG && typeof aG == "string") {
                            aG = c.color.parse(aG)
                        } else {
                            aG = c.color.extract(aK, "background-color")
                        }
                        aG.a = 1;
                        aG = aG.toString()
                    }
                    var aB = aK.children();
                    c('<div style="position:absolute;width:' + aB.width() + "px;height:" + aB.height() + "px;" + aI + "background-color:" + aG + ';"> </div>').prependTo(aK).css("opacity", O.legend.backgroundOpacity)
                }
            }
        }

        var ab = [], M = null;

        function K(aI, aG, aD) {
            var aO = O.grid.mouseActiveRadius, a0 = aO * aO + 1, aY = null, aR = false, aW, aU;
            for (aW = Q.length - 1; aW >= 0; --aW) {
                if (!aD(Q[aW])) {
                    continue
                }
                var aP = Q[aW], aH = aP.xaxis, aF = aP.yaxis, aV = aP.datapoints.points, aT = aP.datapoints.pointsize,
                    aQ = aH.c2p(aI), aN = aF.c2p(aG), aC = aO / aH.scale, aB = aO / aF.scale;
                if (aH.options.inverseTransform) {
                    aC = Number.MAX_VALUE
                }
                if (aF.options.inverseTransform) {
                    aB = Number.MAX_VALUE
                }
                if (aP.lines.show || aP.points.show) {
                    for (aU = 0; aU < aV.length; aU += aT) {
                        var aK = aV[aU], aJ = aV[aU + 1];
                        if (aK == null) {
                            continue
                        }
                        if (aK - aQ > aC || aK - aQ < -aC || aJ - aN > aB || aJ - aN < -aB) {
                            continue
                        }
                        var aM = Math.abs(aH.p2c(aK) - aI), aL = Math.abs(aF.p2c(aJ) - aG), aS = aM * aM + aL * aL;
                        if (aS < a0) {
                            a0 = aS;
                            aY = [aW, aU / aT]
                        }
                    }
                }
                if (aP.bars.show && !aY) {
                    var aE = aP.bars.align == "left" ? 0 : -aP.bars.barWidth / 2, aX = aE + aP.bars.barWidth;
                    for (aU = 0; aU < aV.length; aU += aT) {
                        var aK = aV[aU], aJ = aV[aU + 1], aZ = aV[aU + 2];
                        if (aK == null) {
                            continue
                        }
                        if (Q[aW].bars.horizontal ? (aQ <= Math.max(aZ, aK) && aQ >= Math.min(aZ, aK) && aN >= aJ + aE && aN <= aJ + aX) : (aQ >= aK + aE && aQ <= aK + aX && aN >= Math.min(aZ, aJ) && aN <= Math.max(aZ, aJ))) {
                            aY = [aW, aU / aT]
                        }
                    }
                }
            }
            if (aY) {
                aW = aY[0];
                aU = aY[1];
                aT = Q[aW].datapoints.pointsize;
                return {
                    datapoint: Q[aW].datapoints.points.slice(aU * aT, (aU + 1) * aT),
                    dataIndex: aU,
                    series: Q[aW],
                    seriesIndex: aW
                }
            }
            return null
        }

        function aa(aB) {
            if (O.grid.hoverable) {
                u("plothover", aB, function (aC) {
                    return aC.hoverable != false
                })
            }
        }

        function l(aB) {
            if (O.grid.hoverable) {
                u("plothover", aB, function (aC) {
                    return false
                })
            }
        }

        function R(aB) {
            u("plotclick", aB, function (aC) {
                return aC.clickable != false
            })
        }

        function u(aC, aB, aD) {
            var aE = y.offset(), aH = aB.pageX - aE.left - q.left, aF = aB.pageY - aE.top - q.top,
                aJ = C({left: aH, top: aF});
            aJ.pageX = aB.pageX;
            aJ.pageY = aB.pageY;
            var aK = K(aH, aF, aD);
            if (aK) {
                aK.pageX = parseInt(aK.series.xaxis.p2c(aK.datapoint[0]) + aE.left + q.left);
                aK.pageY = parseInt(aK.series.yaxis.p2c(aK.datapoint[1]) + aE.top + q.top)
            }
            if (O.grid.autoHighlight) {
                for (var aG = 0; aG < ab.length; ++aG) {
                    var aI = ab[aG];
                    if (aI.auto == aC && !(aK && aI.series == aK.series && aI.point[0] == aK.datapoint[0] && aI.point[1] == aK.datapoint[1])) {
                        T(aI.series, aI.point)
                    }
                }
                if (aK) {
                    x(aK.series, aK.datapoint, aC)
                }
            }
            av.trigger(aC, [aJ, aK])
        }

        function f() {
            if (!M) {
                M = setTimeout(s, 30)
            }
        }

        function s() {
            M = null;
            A.save();
            A.clearRect(0, 0, G, I);
            A.translate(q.left, q.top);
            var aC, aB;
            for (aC = 0; aC < ab.length; ++aC) {
                aB = ab[aC];
                if (aB.series.bars.show) {
                    v(aB.series, aB.point)
                } else {
                    ay(aB.series, aB.point)
                }
            }
            A.restore();
            an(ak.drawOverlay, [A])
        }

        function x(aD, aB, aF) {
            if (typeof aD == "number") {
                aD = Q[aD]
            }
            if (typeof aB == "number") {
                var aE = aD.datapoints.pointsize;
                aB = aD.datapoints.points.slice(aE * aB, aE * (aB + 1))
            }
            var aC = al(aD, aB);
            if (aC == -1) {
                ab.push({series: aD, point: aB, auto: aF});
                f()
            } else {
                if (!aF) {
                    ab[aC].auto = false
                }
            }
        }

        function T(aD, aB) {
            if (aD == null && aB == null) {
                ab = [];
                f()
            }
            if (typeof aD == "number") {
                aD = Q[aD]
            }
            if (typeof aB == "number") {
                aB = aD.data[aB]
            }
            var aC = al(aD, aB);
            if (aC != -1) {
                ab.splice(aC, 1);
                f()
            }
        }

        function al(aD, aE) {
            for (var aB = 0; aB < ab.length; ++aB) {
                var aC = ab[aB];
                if (aC.series == aD && aC.point[0] == aE[0] && aC.point[1] == aE[1]) {
                    return aB
                }
            }
            return -1
        }

        function ay(aE, aD) {
            var aC = aD[0], aI = aD[1], aH = aE.xaxis, aG = aE.yaxis;
            if (aC < aH.min || aC > aH.max || aI < aG.min || aI > aG.max) {
                return
            }
            var aF = aE.points.radius + aE.points.lineWidth / 2;
            A.lineWidth = aF;
            A.strokeStyle = c.color.parse(aE.color).scale("a", 0.5).toString();
            var aB = 1.5 * aF, aC = aH.p2c(aC), aI = aG.p2c(aI);
            A.beginPath();
            if (aE.points.symbol == "circle") {
                A.arc(aC, aI, aB, 0, 2 * Math.PI, false)
            } else {
                aE.points.symbol(A, aC, aI, aB, false)
            }
            A.closePath();
            A.stroke()
        }

        function v(aE, aB) {
            A.lineWidth = aE.bars.lineWidth;
            A.strokeStyle = c.color.parse(aE.color).scale("a", 0.5).toString();
            var aD = c.color.parse(aE.color).scale("a", 0.5).toString();
            var aC = aE.bars.align == "left" ? 0 : -aE.bars.barWidth / 2;
            E(aB[0], aB[1], aB[2] || 0, aC, aC + aE.bars.barWidth, 0, function () {
                return aD
            }, aE.xaxis, aE.yaxis, A, aE.bars.horizontal, aE.bars.lineWidth)
        }

        function am(aJ, aB, aH, aC) {
            if (typeof aJ == "string") {
                return aJ
            } else {
                var aI = H.createLinearGradient(0, aH, 0, aB);
                for (var aE = 0, aD = aJ.colors.length; aE < aD; ++aE) {
                    var aF = aJ.colors[aE];
                    if (typeof aF != "string") {
                        var aG = c.color.parse(aC);
                        if (aF.brightness != null) {
                            aG = aG.scale("rgb", aF.brightness)
                        }
                        if (aF.opacity != null) {
                            aG.a *= aF.opacity
                        }
                        aF = aG.toString()
                    }
                    aI.addColorStop(aE / (aD - 1), aF)
                }
                return aI
            }
        }
    }

    c.plot = function (g, e, d) {
        var f = new b(c(g), e, d, c.plot.plugins);
        return f
    };
    c.plot.version = "0.7";
    c.plot.plugins = [];
    c.plot.formatDate = function (l, f, h) {
        var o = function (d) {
            d = "" + d;
            return d.length == 1 ? "0" + d : d
        };
        var e = [];
        var p = false, j = false;
        var n = l.getUTCHours();
        var k = n < 12;
        if (h == null) {
            h = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        }
        if (f.search(/%p|%P/) != -1) {
            if (n > 12) {
                n = n - 12
            } else {
                if (n == 0) {
                    n = 12
                }
            }
        }
        for (var g = 0; g < f.length; ++g) {
            var m = f.charAt(g);
            if (p) {
                switch (m) {
                    case"h":
                        m = "" + n;
                        break;
                    case"H":
                        m = o(n);
                        break;
                    case"M":
                        m = o(l.getUTCMinutes());
                        break;
                    case"S":
                        m = o(l.getUTCSeconds());
                        break;
                    case"d":
                        m = "" + l.getUTCDate();
                        break;
                    case"m":
                        m = "" + (l.getUTCMonth() + 1);
                        break;
                    case"y":
                        m = "" + l.getUTCFullYear();
                        break;
                    case"b":
                        m = "" + h[l.getUTCMonth()];
                        break;
                    case"p":
                        m = (k) ? ("am") : ("pm");
                        break;
                    case"P":
                        m = (k) ? ("AM") : ("PM");
                        break;
                    case"0":
                        m = "";
                        j = true;
                        break
                }
                if (m && j) {
                    m = o(m);
                    j = false
                }
                e.push(m);
                if (!j) {
                    p = false
                }
            } else {
                if (m == "%") {
                    p = true
                } else {
                    e.push(m)
                }
            }
        }
        return e.join("")
    };

    function a(e, d) {
        return d * Math.floor(e / d)
    }
})(jQuery);

/*!
 * JQVMap: jQuery Vector Map Library
 * @author me@peterschmalfeldt.com
 * @version 1.4.0
 * @link http://jqvmap.com
 * @license Unauthorized copying of this file, via any medium is strictly prohibited.
 * This file cannot be copied and/or distributed without express written consent from @author.
 * @builddate 2015/12/06
 */

var VectorCanvas = function (a, b, c) {
    if (this.mode = window.SVGAngle ? "svg" : "vml", this.params = c, "svg" === this.mode) this.createSvgNode = function (a) {
        return document.createElementNS(this.svgns, a)
    }; else {
        try {
            document.namespaces.rvml || document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), this.createVmlNode = function (a) {
                return document.createElement("<rvml:" + a + ' class="rvml">')
            }
        } catch (d) {
            this.createVmlNode = function (a) {
                return document.createElement("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
            }
        }
        document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)")
    }
    "svg" === this.mode ? this.canvas = this.createSvgNode("svg") : (this.canvas = this.createVmlNode("group"), this.canvas.style.position = "absolute"), this.setSize(a, b)
};
VectorCanvas.prototype = {svgns: "http://www.w3.org/2000/svg", mode: "svg", width: 0, height: 0, canvas: null};
var ColorScale = function (a, b, c, d) {
    a && this.setColors(a), b && this.setNormalizeFunction(b), c && this.setMin(c), c && this.setMax(d)
};
ColorScale.prototype = {colors: []};
var JQVMap = function (a) {
    a = a || {};
    var b, c = this, d = JQVMap.maps[a.map];
    if (!d) throw new Error('Invalid "' + a.map + '" map parameter. Please make sure you have loaded this map file in your HTML.');
    this.selectedRegions = [], this.multiSelectRegion = a.multiSelectRegion, this.container = a.container, this.defaultWidth = d.width, this.defaultHeight = d.height, this.color = a.color, this.selectedColor = a.selectedColor, this.hoverColor = a.hoverColor, this.hoverOpacity = a.hoverOpacity, this.setBackgroundColor(a.backgroundColor), this.width = a.container.width(), this.height = a.container.height(), this.resize(), jQuery(window).resize(function () {
        var d = a.container.width(), e = a.container.height();
        if (d && e) {
            c.width = d, c.height = e, c.resize(), c.canvas.setSize(c.width, c.height), c.applyTransform();
            var f = jQuery.Event("resize.jqvmap");
            jQuery(a.container).trigger(f, [d, e]), b && (jQuery(".jqvmap_pin").remove(), c.pinHandlers = !1, c.placePins(b.pins, b.mode))
        }
    }), this.canvas = new VectorCanvas(this.width, this.height, a), a.container.append(this.canvas.canvas), this.makeDraggable(), this.rootGroup = this.canvas.createGroup(!0), this.index = JQVMap.mapIndex, this.label = jQuery("<div/>").addClass("jqvmap-label").appendTo(jQuery("body")).hide(), a.enableZoom && (jQuery("<div/>").addClass("jqvmap-zoomin").text("+").appendTo(a.container), jQuery("<div/>").addClass("jqvmap-zoomout").html("&#x2212;").appendTo(a.container)), c.countries = [];
    for (var e in d.paths) {
        var f = this.canvas.createPath({path: d.paths[e].path});
        f.setFill(this.color), f.id = c.getCountryId(e), c.countries[e] = f, "svg" === this.canvas.mode ? f.setAttribute("class", "jvectormap-region") : jQuery(f).addClass("jvectormap-region"), jQuery(this.rootGroup).append(f)
    }
    if (jQuery(a.container).delegate("svg" === this.canvas.mode ? "path" : "shape", "mouseover mouseout", function (b) {
        var e = b.target, f = b.target.id.split("_").pop(), g = jQuery.Event("labelShow.jqvmap"),
            h = jQuery.Event("regionMouseOver.jqvmap");
        f = f.toLowerCase(), "mouseover" === b.type ? (jQuery(a.container).trigger(h, [f, d.paths[f].name]), h.isDefaultPrevented() || c.highlight(f, e), a.showTooltip && (c.label.text(d.paths[f].name), jQuery(a.container).trigger(g, [c.label, f]), g.isDefaultPrevented() || (c.label.show(), c.labelWidth = c.label.width(), c.labelHeight = c.label.height()))) : (c.unhighlight(f, e), c.label.hide(), jQuery(a.container).trigger("regionMouseOut.jqvmap", [f, d.paths[f].name]))
    }), jQuery(a.container).delegate("svg" === this.canvas.mode ? "path" : "shape", "click", function (b) {
        if (!a.multiSelectRegion) for (var e in d.paths) c.countries[e].currentFillColor = c.countries[e].getOriginalFill(), c.countries[e].setFill(c.countries[e].getOriginalFill());
        var f = b.target, g = b.target.id.split("_").pop(), h = jQuery.Event("regionClick.jqvmap");
        g = g.toLowerCase(), jQuery(a.container).trigger(h, [g, d.paths[g].name]), h.isDefaultPrevented() || (c.isSelected(g) ? c.deselect(g, f) : c.select(g, f))
    }), a.showTooltip && a.container.mousemove(function (a) {
        if (c.label.is(":visible")) {
            var b = a.pageX - 15 - c.labelWidth, d = a.pageY - 15 - c.labelHeight;
            0 > b && (b = a.pageX + 15), 0 > d && (d = a.pageY + 15), c.label.css({left: b, top: d})
        }
    }), this.setColors(a.colors), this.canvas.canvas.appendChild(this.rootGroup), this.applyTransform(), this.colorScale = new ColorScale(a.scaleColors, a.normalizeFunction, a.valueMin, a.valueMax), a.values && (this.values = a.values, this.setValues(a.values)), a.selectedRegions) if (a.selectedRegions instanceof Array) for (var g in a.selectedRegions) this.select(a.selectedRegions[g].toLowerCase()); else this.select(a.selectedRegions.toLowerCase());
    if (this.bindZoomButtons(), a.pins && (b = {
        pins: a.pins,
        mode: a.pinMode
    }, this.pinHandlers = !1, this.placePins(a.pins, a.pinMode)), a.showLabels) {
        this.pinHandlers = !1;
        var h = {};
        for (e in c.countries) "function" != typeof c.countries[e] && (a.pins && a.pins[e] || (h[e] = e.toUpperCase()));
        b = {pins: h, mode: "content"}, this.placePins(h, "content")
    }
    JQVMap.mapIndex++
};
JQVMap.prototype = {
    transX: 0,
    transY: 0,
    scale: 1,
    baseTransX: 0,
    baseTransY: 0,
    baseScale: 1,
    width: 0,
    height: 0,
    countries: {},
    countriesColors: {},
    countriesData: {},
    zoomStep: 1.4,
    zoomMaxStep: 4,
    zoomCurStep: 1
}, JQVMap.xlink = "http://www.w3.org/1999/xlink", JQVMap.mapIndex = 1, JQVMap.maps = {}, function () {
    var a = {
        colors: 1,
        values: 1,
        backgroundColor: 1,
        scaleColors: 1,
        normalizeFunction: 1,
        enableZoom: 1,
        showTooltip: 1,
        borderColor: 1,
        borderWidth: 1,
        borderOpacity: 1,
        selectedRegions: 1,
        multiSelectRegion: 1
    }, b = {
        onLabelShow: "labelShow",
        onLoad: "load",
        onRegionOver: "regionMouseOver",
        onRegionOut: "regionMouseOut",
        onRegionClick: "regionClick",
        onRegionSelect: "regionSelect",
        onRegionDeselect: "regionDeselect",
        onResize: "resize"
    };
    jQuery.fn.vectorMap = function (c) {
        var d = {
            map: "world_en",
            backgroundColor: "#a5bfdd",
            color: "#f4f3f0",
            hoverColor: "#c9dfaf",
            selectedColor: "#c9dfaf",
            scaleColors: ["#b6d6ff", "#005ace"],
            normalizeFunction: "linear",
            enableZoom: !0,
            showTooltip: !0,
            borderColor: "#818181",
            borderWidth: 1,
            borderOpacity: .25,
            selectedRegions: null,
            multiSelectRegion: !1
        }, e = this.data("mapObject");
        if ("addMap" === c) JQVMap.maps[arguments[1]] = arguments[2]; else {
            if ("set" !== c || !a[arguments[1]]) {
                if ("string" == typeof c && "function" == typeof e[c]) return e[c].apply(e, Array.prototype.slice.call(arguments, 1));
                jQuery.extend(d, c), d.container = this, this.css({
                    position: "relative",
                    overflow: "hidden"
                }), e = new JQVMap(d), this.data("mapObject", e), this.unbind(".jqvmap");
                for (var f in b) d[f] && this.bind(b[f] + ".jqvmap", d[f]);
                var g = jQuery.Event("load.jqvmap");
                return jQuery(d.container).trigger(g, e), e
            }
            e["set" + arguments[1].charAt(0).toUpperCase() + arguments[1].substr(1)].apply(e, Array.prototype.slice.call(arguments, 2))
        }
    }
}(jQuery), ColorScale.arrayToRgb = function (a) {
    for (var b, c = "#", d = 0; d < a.length; d++) b = a[d].toString(16), c += 1 === b.length ? "0" + b : b;
    return c
}, ColorScale.prototype.getColor = function (a) {
    "function" == typeof this.normalize && (a = this.normalize(a));
    for (var b, c = [], d = 0, e = 0; e < this.colors.length - 1; e++) b = this.vectorLength(this.vectorSubtract(this.colors[e + 1], this.colors[e])), c.push(b), d += b;
    var f = (this.maxValue - this.minValue) / d;
    for (e = 0; e < c.length; e++) c[e] *= f;
    for (e = 0, a -= this.minValue; a - c[e] >= 0;) a -= c[e], e++;
    var g;
    for (g = e === this.colors.length - 1 ? this.vectorToNum(this.colors[e]).toString(16) : this.vectorToNum(this.vectorAdd(this.colors[e], this.vectorMult(this.vectorSubtract(this.colors[e + 1], this.colors[e]), a / c[e]))).toString(16); g.length < 6;) g = "0" + g;
    return "#" + g
}, ColorScale.rgbToArray = function (a) {
    return a = a.substr(1), [parseInt(a.substr(0, 2), 16), parseInt(a.substr(2, 2), 16), parseInt(a.substr(4, 2), 16)]
}, ColorScale.prototype.setColors = function (a) {
    for (var b = 0; b < a.length; b++) a[b] = ColorScale.rgbToArray(a[b]);
    this.colors = a
}, ColorScale.prototype.setMax = function (a) {
    this.clearMaxValue = a, "function" == typeof this.normalize ? this.maxValue = this.normalize(a) : this.maxValue = a
}, ColorScale.prototype.setMin = function (a) {
    this.clearMinValue = a, "function" == typeof this.normalize ? this.minValue = this.normalize(a) : this.minValue = a
}, ColorScale.prototype.setNormalizeFunction = function (a) {
    "polynomial" === a ? this.normalize = function (a) {
        return Math.pow(a, .2)
    } : "linear" === a ? delete this.normalize : this.normalize = a, this.setMin(this.clearMinValue), this.setMax(this.clearMaxValue)
}, ColorScale.prototype.vectorAdd = function (a, b) {
    for (var c = [], d = 0; d < a.length; d++) c[d] = a[d] + b[d];
    return c
}, ColorScale.prototype.vectorLength = function (a) {
    for (var b = 0, c = 0; c < a.length; c++) b += a[c] * a[c];
    return Math.sqrt(b)
}, ColorScale.prototype.vectorMult = function (a, b) {
    for (var c = [], d = 0; d < a.length; d++) c[d] = a[d] * b;
    return c
}, ColorScale.prototype.vectorSubtract = function (a, b) {
    for (var c = [], d = 0; d < a.length; d++) c[d] = a[d] - b[d];
    return c
}, ColorScale.prototype.vectorToNum = function (a) {
    for (var b = 0, c = 0; c < a.length; c++) b += Math.round(a[c]) * Math.pow(256, a.length - c - 1);
    return b
}, JQVMap.prototype.applyTransform = function () {
    var a, b, c, d;
    this.defaultWidth * this.scale <= this.width ? (a = (this.width - this.defaultWidth * this.scale) / (2 * this.scale), c = (this.width - this.defaultWidth * this.scale) / (2 * this.scale)) : (a = 0, c = (this.width - this.defaultWidth * this.scale) / this.scale), this.defaultHeight * this.scale <= this.height ? (b = (this.height - this.defaultHeight * this.scale) / (2 * this.scale), d = (this.height - this.defaultHeight * this.scale) / (2 * this.scale)) : (b = 0, d = (this.height - this.defaultHeight * this.scale) / this.scale), this.transY > b ? this.transY = b : this.transY < d && (this.transY = d), this.transX > a ? this.transX = a : this.transX < c && (this.transX = c), this.canvas.applyTransformParams(this.scale, this.transX, this.transY)
}, JQVMap.prototype.bindZoomButtons = function () {
    var a = this;
    this.container.find(".jqvmap-zoomin").click(function () {
        a.zoomIn()
    }), this.container.find(".jqvmap-zoomout").click(function () {
        a.zoomOut()
    })
}, JQVMap.prototype.deselect = function (a, b) {
    if (a = a.toLowerCase(), b = b || jQuery("#" + this.getCountryId(a))[0], this.isSelected(a)) this.selectedRegions.splice(this.selectIndex(a), 1), jQuery(this.container).trigger("regionDeselect.jqvmap", [a]), b.currentFillColor = b.getOriginalFill(), b.setFill(b.getOriginalFill()); else for (var c in this.countries) this.selectedRegions.splice(this.selectedRegions.indexOf(c), 1), this.countries[c].currentFillColor = this.color, this.countries[c].setFill(this.color)
}, JQVMap.prototype.getCountryId = function (a) {
    return "jqvmap" + this.index + "_" + a
}, JQVMap.prototype.getPin = function (a) {
    var b = jQuery("#" + this.getPinId(a));
    return b.html()
}, JQVMap.prototype.getPinId = function (a) {
    return this.getCountryId(a) + "_pin"
}, JQVMap.prototype.getPins = function () {
    var a = this.container.find(".jqvmap_pin"), b = {};
    return jQuery.each(a, function (a, c) {
        c = jQuery(c);
        var d = c.attr("for").toLowerCase(), e = c.html();
        b[d] = e
    }), JSON.stringify(b)
}, JQVMap.prototype.highlight = function (a, b) {
    b = b || jQuery("#" + this.getCountryId(a))[0], this.hoverOpacity ? b.setOpacity(this.hoverOpacity) : this.hoverColor && (b.currentFillColor = b.getFill() + "", b.setFill(this.hoverColor))
}, JQVMap.prototype.isSelected = function (a) {
    return this.selectIndex(a) >= 0
}, JQVMap.prototype.makeDraggable = function () {
    var a, b, c = !1, d = this;
    d.isMoving = !1, d.isMovingTimeout = !1;
    var e, f, g, h, i, j, k;
    this.container.mousemove(function (e) {
        return c && (d.transX -= (a - e.pageX) / d.scale, d.transY -= (b - e.pageY) / d.scale, d.applyTransform(), a = e.pageX, b = e.pageY, d.isMoving = !0, d.isMovingTimeout && clearTimeout(d.isMovingTimeout), d.container.trigger("drag")), !1
    }).mousedown(function (d) {
        return c = !0, a = d.pageX, b = d.pageY, !1
    }).mouseup(function () {
        return c = !1, clearTimeout(d.isMovingTimeout), d.isMovingTimeout = setTimeout(function () {
            d.isMoving = !1
        }, 100), !1
    }).mouseout(function () {
        return c && d.isMoving ? (clearTimeout(d.isMovingTimeout), d.isMovingTimeout = setTimeout(function () {
            c = !1, d.isMoving = !1
        }, 100), !1) : void 0
    }), jQuery(this.container).bind("touchmove", function (a) {
        var b, c, l, m, n = a.originalEvent.touches;
        if (1 === n.length) {
            if (1 === e) {
                if (j === n[0].pageX && k === n[0].pageY) return;
                l = d.transX, m = d.transY, d.transX -= (j - n[0].pageX) / d.scale, d.transY -= (k - n[0].pageY) / d.scale, d.applyTransform(), (l !== d.transX || m !== d.transY) && a.preventDefault(), d.isMoving = !0, d.isMovingTimeout && clearTimeout(d.isMovingTimeout)
            }
            j = n[0].pageX, k = n[0].pageY
        } else 2 === n.length && (2 === e ? (c = Math.sqrt(Math.pow(n[0].pageX - n[1].pageX, 2) + Math.pow(n[0].pageY - n[1].pageY, 2)) / h, d.setScale(i * c, f, g), a.preventDefault()) : (b = jQuery(d.container).offset(), f = n[0].pageX > n[1].pageX ? n[1].pageX + (n[0].pageX - n[1].pageX) / 2 : n[0].pageX + (n[1].pageX - n[0].pageX) / 2, g = n[0].pageY > n[1].pageY ? n[1].pageY + (n[0].pageY - n[1].pageY) / 2 : n[0].pageY + (n[1].pageY - n[0].pageY) / 2, f -= b.left, g -= b.top, i = d.scale, h = Math.sqrt(Math.pow(n[0].pageX - n[1].pageX, 2) + Math.pow(n[0].pageY - n[1].pageY, 2))));
        e = n.length
    }), jQuery(this.container).bind("touchstart", function () {
        e = 0
    }), jQuery(this.container).bind("touchend", function () {
        e = 0
    })
}, JQVMap.prototype.placePins = function (a, b) {
    var c = this;
    if ((!b || "content" !== b && "id" !== b) && (b = "content"), "content" === b ? jQuery.each(a, function (a, b) {
        if (0 !== jQuery("#" + c.getCountryId(a)).length) {
            var d = c.getPinId(a), e = jQuery("#" + d);
            e.length > 0 && e.remove(), c.container.append('<div id="' + d + '" for="' + a + '" class="jqvmap_pin" style="position:absolute">' + b + "</div>")
        }
    }) : jQuery.each(a, function (a, b) {
        if (0 !== jQuery("#" + c.getCountryId(a)).length) {
            var d = c.getPinId(a), e = jQuery("#" + d);
            e.length > 0 && e.remove(), c.container.append('<div id="' + d + '" for="' + a + '" class="jqvmap_pin" style="position:absolute"></div>'), e.append(jQuery("#" + b))
        }
    }), this.positionPins(), !this.pinHandlers) {
        this.pinHandlers = !0;
        var d = function () {
            c.positionPins()
        };
        this.container.bind("zoomIn", d).bind("zoomOut", d).bind("drag", d)
    }
}, JQVMap.prototype.positionPins = function () {
    var a = this, b = this.container.find(".jqvmap_pin");
    jQuery.each(b, function (b, c) {
        c = jQuery(c);
        var d = a.getCountryId(c.attr("for").toLowerCase()), e = jQuery("#" + d),
            f = document.getElementById(d).getBBox(), g = e.position(), h = a.scale,
            i = g.left + f.width / 2 * h - c.width() / 2, j = g.top + f.height / 2 * h - c.height() / 2;
        c.css("left", i).css("top", j)
    })
}, JQVMap.prototype.removePin = function (a) {
    a = a.toLowerCase(), jQuery("#" + this.getPinId(a)).remove()
}, JQVMap.prototype.removePins = function () {
    this.container.find(".jqvmap_pin").remove()
}, JQVMap.prototype.reset = function () {
    for (var a in this.countries) this.countries[a].setFill(this.color);
    this.scale = this.baseScale, this.transX = this.baseTransX, this.transY = this.baseTransY, this.applyTransform()
}, JQVMap.prototype.resize = function () {
    var a = this.baseScale;
    this.width / this.height > this.defaultWidth / this.defaultHeight ? (this.baseScale = this.height / this.defaultHeight, this.baseTransX = Math.abs(this.width - this.defaultWidth * this.baseScale) / (2 * this.baseScale)) : (this.baseScale = this.width / this.defaultWidth, this.baseTransY = Math.abs(this.height - this.defaultHeight * this.baseScale) / (2 * this.baseScale)), this.scale *= this.baseScale / a, this.transX *= this.baseScale / a, this.transY *= this.baseScale / a
}, JQVMap.prototype.select = function (a, b) {
    a = a.toLowerCase(), b = b || jQuery("#" + this.getCountryId(a))[0], this.isSelected(a) || (this.multiSelectRegion ? this.selectedRegions.push(a) : this.selectedRegions = [a], jQuery(this.container).trigger("regionSelect.jqvmap", [a]), this.selectedColor && b && (b.currentFillColor = this.selectedColor, b.setFill(this.selectedColor)))
}, JQVMap.prototype.selectIndex = function (a) {
    a = a.toLowerCase();
    for (var b = 0; b < this.selectedRegions.length; b++) if (a === this.selectedRegions[b]) return b;
    return -1
}, JQVMap.prototype.setBackgroundColor = function (a) {
    this.container.css("background-color", a)
}, JQVMap.prototype.setColors = function (a, b) {
    if ("string" == typeof a) this.countries[a].setFill(b), this.countries[a].setAttribute("original", b); else {
        var c = a;
        for (var d in c) this.countries[d] && (this.countries[d].setFill(c[d]), this.countries[d].setAttribute("original", c[d]))
    }
}, JQVMap.prototype.setNormalizeFunction = function (a) {
    this.colorScale.setNormalizeFunction(a), this.values && this.setValues(this.values)
}, JQVMap.prototype.setScale = function (a) {
    this.scale = a, this.applyTransform()
}, JQVMap.prototype.setScaleColors = function (a) {
    this.colorScale.setColors(a), this.values && this.setValues(this.values)
}, JQVMap.prototype.setValues = function (a) {
    var b, c = 0, d = Number.MAX_VALUE;
    for (var e in a) e = e.toLowerCase(), b = parseFloat(a[e]), isNaN(b) || (b > c && (c = a[e]), d > b && (d = b));
    d === c && c++, this.colorScale.setMin(d), this.colorScale.setMax(c);
    var f = {};
    for (e in a) e = e.toLowerCase(), b = parseFloat(a[e]), f[e] = isNaN(b) ? this.color : this.colorScale.getColor(b);
    this.setColors(f), this.values = a
}, JQVMap.prototype.unhighlight = function (a, b) {
    a = a.toLowerCase(), b = b || jQuery("#" + this.getCountryId(a))[0], b.setOpacity(1), b.currentFillColor && b.setFill(b.currentFillColor)
}, JQVMap.prototype.zoomIn = function () {
    var a = this, b = (jQuery("#zoom").innerHeight() - 12 - 30 - 6 - 7 - 6) / (this.zoomMaxStep - this.zoomCurStep);
    if (a.zoomCurStep < a.zoomMaxStep) {
        a.transX -= (a.width / a.scale - a.width / (a.scale * a.zoomStep)) / 2, a.transY -= (a.height / a.scale - a.height / (a.scale * a.zoomStep)) / 2, a.setScale(a.scale * a.zoomStep), a.zoomCurStep++;
        var c = jQuery("#zoomSlider");
        c.css("top", parseInt(c.css("top"), 10) - b), a.container.trigger("zoomIn")
    }
}, JQVMap.prototype.zoomOut = function () {
    var a = this, b = (jQuery("#zoom").innerHeight() - 12 - 30 - 6 - 7 - 6) / (this.zoomMaxStep - this.zoomCurStep);
    if (a.zoomCurStep > 1) {
        a.transX += (a.width / (a.scale / a.zoomStep) - a.width / a.scale) / 2, a.transY += (a.height / (a.scale / a.zoomStep) - a.height / a.scale) / 2, a.setScale(a.scale / a.zoomStep), a.zoomCurStep--;
        var c = jQuery("#zoomSlider");
        c.css("top", parseInt(c.css("top"), 10) + b), a.container.trigger("zoomOut")
    }
}, VectorCanvas.prototype.applyTransformParams = function (a, b, c) {
    "svg" === this.mode ? this.rootGroup.setAttribute("transform", "scale(" + a + ") translate(" + b + ", " + c + ")") : (this.rootGroup.coordorigin = this.width - b + "," + (this.height - c), this.rootGroup.coordsize = this.width / a + "," + this.height / a)
}, VectorCanvas.prototype.createGroup = function (a) {
    var b;
    return "svg" === this.mode ? b = this.createSvgNode("g") : (b = this.createVmlNode("group"), b.style.width = this.width + "px", b.style.height = this.height + "px", b.style.left = "0px", b.style.top = "0px", b.coordorigin = "0 0", b.coordsize = this.width + " " + this.height), a && (this.rootGroup = b), b
}, VectorCanvas.prototype.createPath = function (a) {
    var b;
    if ("svg" === this.mode) b = this.createSvgNode("path"), b.setAttribute("d", a.path), null !== this.params.borderColor && b.setAttribute("stroke", this.params.borderColor), this.params.borderWidth > 0 && (b.setAttribute("stroke-width", this.params.borderWidth), b.setAttribute("stroke-linecap", "round"), b.setAttribute("stroke-linejoin", "round")), this.params.borderOpacity > 0 && b.setAttribute("stroke-opacity", this.params.borderOpacity), b.setFill = function (a) {
        this.setAttribute("fill", a), null === this.getAttribute("original") && this.setAttribute("original", a)
    }, b.getFill = function () {
        return this.getAttribute("fill")
    }, b.getOriginalFill = function () {
        return this.getAttribute("original")
    }, b.setOpacity = function (a) {
        this.setAttribute("fill-opacity", a)
    }; else {
        b = this.createVmlNode("shape"), b.coordorigin = "0 0", b.coordsize = this.width + " " + this.height, b.style.width = this.width + "px", b.style.height = this.height + "px", b.fillcolor = JQVMap.defaultFillColor, b.stroked = !1, b.path = VectorCanvas.pathSvgToVml(a.path);
        var c = this.createVmlNode("skew");
        c.on = !0, c.matrix = "0.01,0,0,0.01,0,0", c.offset = "0,0", b.appendChild(c);
        var d = this.createVmlNode("fill");
        b.appendChild(d), b.setFill = function (a) {
            this.getElementsByTagName("fill")[0].color = a, null === this.getAttribute("original") && this.setAttribute("original", a)
        }, b.getFill = function () {
            return this.getElementsByTagName("fill")[0].color
        }, b.getOriginalFill = function () {
            return this.getAttribute("original")
        }, b.setOpacity = function (a) {
            this.getElementsByTagName("fill")[0].opacity = parseInt(100 * a, 10) + "%"
        }
    }
    return b
}, VectorCanvas.prototype.pathSvgToVml = function (a) {
    var b, c, d = "", e = 0, f = 0;
    return a.replace(/([MmLlHhVvCcSs])((?:-?(?:\d+)?(?:\.\d+)?,?\s?)+)/g, function (a, g, h) {
        h = h.replace(/(\d)-/g, "$1,-").replace(/\s+/g, ",").split(","), h[0] || h.shift();
        for (var i = 0, j = h.length; j > i; i++) h[i] = Math.round(100 * h[i]);
        switch (g) {
            case"m":
                e += h[0], f += h[1], d = "t" + h.join(",");
                break;
            case"M":
                e = h[0], f = h[1], d = "m" + h.join(",");
                break;
            case"l":
                e += h[0], f += h[1], d = "r" + h.join(",");
                break;
            case"L":
                e = h[0], f = h[1], d = "l" + h.join(",");
                break;
            case"h":
                e += h[0], d = "r" + h[0] + ",0";
                break;
            case"H":
                e = h[0], d = "l" + e + "," + f;
                break;
            case"v":
                f += h[0], d = "r0," + h[0];
                break;
            case"V":
                f = h[0], d = "l" + e + "," + f;
                break;
            case"c":
                b = e + h[h.length - 4], c = f + h[h.length - 3], e += h[h.length - 2], f += h[h.length - 1], d = "v" + h.join(",");
                break;
            case"C":
                b = h[h.length - 4], c = h[h.length - 3], e = h[h.length - 2], f = h[h.length - 1], d = "c" + h.join(",");
                break;
            case"s":
                h.unshift(f - c), h.unshift(e - b), b = e + h[h.length - 4], c = f + h[h.length - 3], e += h[h.length - 2], f += h[h.length - 1], d = "v" + h.join(",");
                break;
            case"S":
                h.unshift(f + f - c), h.unshift(e + e - b), b = h[h.length - 4], c = h[h.length - 3], e = h[h.length - 2], f = h[h.length - 1], d = "c" + h.join(",")
        }
        return d
    }).replace(/z/g, "")
}, VectorCanvas.prototype.setSize = function (a, b) {
    if ("svg" === this.mode) this.canvas.setAttribute("width", a), this.canvas.setAttribute("height", b); else if (this.canvas.style.width = a + "px", this.canvas.style.height = b + "px", this.canvas.coordsize = a + " " + b, this.canvas.coordorigin = "0 0", this.rootGroup) {
        for (var c = this.rootGroup.getElementsByTagName("shape"), d = 0, e = c.length; e > d; d++) c[d].coordsize = a + " " + b, c[d].style.width = a + "px", c[d].style.height = b + "px";
        this.rootGroup.coordsize = a + " " + b, this.rootGroup.style.width = a + "px", this.rootGroup.style.height = b + "px"
    }
    this.width = a, this.height = b
};


/** Add USA Map Data Points */
jQuery.fn.vectorMap('addMap', 'usa_en', {
    "width": 959,
    "height": 593,
    "paths": {
        "hi": {
            "path": "m244.66,512.25c-2.48,3.8 2.23,4.04 4.74,5.38 3.06,0.16 3.51,-4.28 2.66,-6.56 -2.72,-0.77 -5.01,-0.19 -7.41,1.19z m-9.31,3.97c-4.02,5.11 3.64,0.48 0.63,-0.09l-0.5,0.07 -0.14,0.02z m39.69,7.97c-0.62,2.09 1.91,6.73 4.39,6.2 2.41,-1.46 3.73,1.73 6.48,0.56 1.23,-1.48 -3.77,-3.2 -3.7,-6.08 -0.95,-3.8 -3.28,-3.2 -5.96,-1.28 -0.41,0.2 -0.81,0.4 -1.22,0.6z m19.94,10.03c3.58,0.95 7.91,2.99 11.25,0.47 -1.05,-1.63 -5.06,-0.59 -7.1,-0.86 -1.44,0.01 -3.54,-1.63 -4.15,0.39z m12.13,4.38c2.33,2.45 3.64,6.83 7.24,7.4 2.36,-0.69 6.84,-0.66 7.32,-3.43 -2.09,-2.51 -5.77,-3.35 -8.88,-4.29 -2.53,-1.2 -4.11,-3.25 -5.68,0.33z m-7.06,1c-0.29,3.69 5.55,3.98 3.67,0.55 -0.27,-1.25 -3.83,-1.74 -3.67,-0.55z m23.66,14.69c0.27,2.45 3.18,3.93 0.47,6.15 -0.65,2.42 -5.54,2.87 -2.52,5.53 2.36,1.46 2.01,4.85 2.92,7.14 -0.72,2.69 -1.43,6.78 1.72,8.06 2.8,2.95 4.5,-1.93 6.19,-3.68 1.27,-1.69 3.85,-4.1 5.94,-2.59 3.04,-0.81 6.3,-2.42 7.78,-5.22 -2.79,-1.31 -4.88,-3.19 -5.57,-6.29 -2.4,-5.33 -8.95,-6.26 -13.58,-8.98 -1.29,-0.52 -2.26,-1.62 -3.34,-0.11z",
            "name": "Hawaii"
        },
        "ak": {
            "path": "m107.84,436.56c-2.27,0.55 -4.87,0.32 -6.84,-0.34 -2.41,1.22 -5.63,4.03 -8.25,1.88 -3.1,0.93 -3.51,3.84 -5.22,5.97 -1.82,2.52 -4.21,3.65 -7.31,3.14 -2.5,-0.94 -5.49,-1.15 -7.5,0.98 2.03,4.34 6.39,8.13 5.82,13.23 -1.85,2.94 6.31,2.99 2.68,5.02 0.15,2.8 3.07,5.68 2.91,7.88 -2.35,2.21 -5.24,-0.38 -7.71,-1.06 -3.24,-0.64 -2.73,-3.35 -0.82,-5.22 -1.57,-1.51 -7.35,-1.81 -6.51,1.12 -2.01,0.04 -3.81,-1.66 -6.27,-0.77 -3.72,-0.44 -5.97,0.65 -2.94,4.05 3.68,1.45 1.06,4.72 1.17,7.57 0.76,2.63 3.66,4.89 6.67,4.17 3.2,-0.06 5.87,3.59 9.21,1.65 2.16,-1.3 5.33,-0.99 4.79,1.89 -2.53,2.07 -1.36,6.13 -2.78,8.75 -1.96,1.88 -4.53,1.59 -6.59,0.16 -1.52,1.37 -4.7,3.68 -6.28,2.22 0.72,-3.71 -4.77,-3.63 -5.51,-0.61 -1.21,3.97 -6.27,4.46 -8.31,7.63 -0.7,2.42 -1.55,6.7 1.74,6.3 1.26,1.11 -1.2,4.8 -2.77,5.52 1.62,2.19 2.65,4.59 2.72,7.34 1.71,1.55 6.35,1.98 7.5,-0.16 2.45,-0.95 1.79,4.1 2.08,5.97 2.47,2.95 -4.02,1.28 -1.61,4.56 -0.85,2.93 -1.76,5.02 2,2.72 2.76,-0.47 5.11,-0.69 5.66,2.09 2.59,-3.91 2.26,2.78 3.25,4.66 0.59,-0.75 1.3,-5.69 3.94,-3.06 -0.17,4.52 5.33,-0.45 5.78,-0.04 0.54,2.92 -1.63,4.24 -2.86,6.41 -1.51,2.24 -2.07,5.63 -4.21,7.17 -3.87,-0.42 -3.37,4.1 -5.5,5.02 -2.65,-0.72 -5.73,0.71 -8.44,1.41 -1.35,2.41 -3.61,4.2 -5.78,1.81 -2.56,0.05 -5.63,0.68 -7.63,2.33 -2.48,2.43 -6.32,3.11 -9.66,2.29 -2.78,-1.91 -7.11,3.41 -3.11,2.31 2.5,-1.91 4.66,0.64 7.25,0.63 2.21,-1.15 4.17,-2.75 6.84,-2.06 2.32,-3.35 5.1,-0.32 7.92,-1.16 2.31,-0.39 7.01,-3.91 5.26,0.66 0.09,-2.91 3.42,-2.73 5.54,-2.04 4.21,0.96 0.29,-3.16 2.08,-3.43 3.47,-2.05 7.52,-2.41 11.2,-3.72 5.48,-3.19 11.62,-5.7 16.21,-10.1 4.27,-2.97 -2.78,-3.48 -1.21,-6.32 1.68,-2.43 4.58,-3.81 7.47,-4.5 1.5,-3.07 3.53,-6.11 5.88,-8.52 2.49,-1.32 4.83,-3.39 7.83,-2.32 2.67,0.71 3.74,5.32 -0.52,3.66 -1.27,-1.88 -5.56,-0.09 -5.25,2.41 -0.21,2.44 -2.56,4.22 -3.06,6.66 4.79,0.85 0.24,3.54 -1.38,3.8 1.67,1.91 5.66,0.6 7.57,-1.14 1.25,-1.85 3.43,-3.8 5.41,-4.22 1.81,2.8 5.1,-1.16 5.74,2.72 0.71,2.78 6.02,-4.86 3.34,-3.1 -3.03,3.11 -3.78,2.86 -1.94,-1.24 1.43,-4.85 -1.76,6.17 -1.45,0.81 -0.81,-3.19 -0.93,-6.03 3.05,-6.4 2.7,-0.86 5.37,-0.87 5.79,2.52 0.42,3.48 3.8,2.84 5.95,4.76 2.41,2.2 4.76,1.95 7.8,1.78 4.34,-0.47 8.01,4.04 12.28,3.17 2.49,-0.42 5.1,-5.2 4.29,-0.23 -2.26,2.83 -0.02,4.12 2.5,5.41 3.13,1.35 5.87,3.14 7.94,5.85 1.31,3.02 6.05,0.28 6.18,2.43 -3.83,1.25 -1.23,3.54 0.21,5.47 1.81,1.95 0.33,5.72 3.64,5.82 1.14,1.28 3.49,7.44 4.01,5.38 -0.35,-2.32 -0.7,-7.86 1.61,-3.76 0.37,1.42 1.04,8.7 2.07,4.74 1.07,-4.88 3.18,0.18 2.22,2.93 3.33,1.69 -1.23,3.33 0.69,4.88 0.69,-3.24 1.31,-0.36 2.16,1.56 1.05,1 1.54,3.94 3.13,3.72 -1.68,-1.72 -2.94,-6.23 0.4,-3 2.42,2.79 4.05,2.12 2.74,-1.66 -2.65,-2.66 0.28,-4.96 2.58,-2.29 3.12,-0.05 2.84,5.21 5.28,4.53 3.31,-3.17 1.5,-7.87 0.69,-11.7 -3.3,-1.55 -7.04,-2.54 -10.22,-4.06 -1.5,-5.33 -6.29,-8.69 -8.4,-13.77 -0.44,-3.33 -4.71,-2.62 -5.75,-5.23 -2.32,-1.72 -2.7,-4.4 -4.56,-6.35 -1.65,-1.53 -5.22,0.95 -5.51,2.94 0.59,3.09 -3.23,3.04 -5.06,4.72 0.05,-4.27 -4.3,-6.15 -6.7,-9.1 -1.33,-1.99 -1.32,-5.36 -4.45,-2.34 -2.37,0.24 -6.38,-0.31 -5.34,-3.62 0.1,-27.7 0.2,-55.4 0.31,-83.09 -2.75,-1.88 -5.88,-4.17 -9.15,-4.4 -2.52,1.72 -5.07,1.09 -7.39,-0.62 -2.72,0.23 -5.12,-0.65 -7.7,-2.89 -3.08,-2.74 -8.58,0.17 -10.98,-3.65 1.13,-3.56 -3.22,-4.83 -5,-2.09 -2.09,0.26 -0.65,-4.31 -3.64,-4.93 -2.57,-2.85 -4.01,-1.28 -5.86,1.21z M36.38,480.63c-0.67,3.11 4.27,1.31 4.72,4.66 0.24,3.82 5.37,3.9 2.34,-0.08 -0.1,-3.22 -3.92,-1.83 -5.06,-4.43 -0.76,-2.02 -0.9,-1.86 -2,-0.16z m-17.16,23.16c2.57,4.06 1.45,1.37 0.13,-1.28 -0.36,0.01 0,1 -0.13,1.28z m21.84,14.81c1.27,1.79 4.99,5.58 6.22,2.03 2.26,-3.3 -3.27,-2.89 -5.23,-3.68 -1.83,-0.9 -0.88,0.54 -0.99,1.65z m91.72,18.78c0.06,3.21 2.81,-1.98 0,0z m-31.47,14.69c-3.2,2.91 -7.24,4.67 -10.56,7.38 0.22,2.75 0.99,7.64 4.67,5.15 2.5,-1.44 4.98,-2.9 7.45,-4.37 -1.84,-3.31 -0.81,-3.15 -4.55,-3.48 -4.15,0.09 1.06,-3.73 2.64,-1.62 3.74,-1.04 3.95,-2.36 1.5,-3.66 0.7,-1.08 -1,0.61 -1.16,0.59z M55.75,570.75c1.42,2.83 3.53,-1.99 0,0z m-35.78,0.34c0.53,2.46 -4.04,4.84 1.05,3.59 4.2,0.47 3.46,-4.35 0.01,-3.84 -0.35,0.08 -0.7,0.16 -1.06,0.24z m62.19,0.69c1.57,2.91 1.31,-2.03 0,0z M58.63,573.13c3.23,0.49 0.99,-3.05 0,0z m-49,0.09c-4.84,2.56 -0.44,1.81 2.29,0.58 2.89,0.16 5.05,-0.48 0.84,-1.46 -1.04,0.29 -2.08,0.58 -3.13,0.88z m7.25,1.38c1.28,0.21 -2.23,-0.59 0,0z",
            "name": "Alaska"
        },
        "fl": {
            "path": "m748.38,439.94c1.69,2.92 1.5,6.12 1.16,9.34 -4.12,0.54 -2.15,-4.69 -5.56,-3.99 -6.18,-0.07 -12.34,1.13 -18.54,1.19 -10.09,0.29 -20.37,2.14 -30.33,0.64 -2.57,-1.57 -2.84,-6.15 -6.5,-5.33 -9.12,-0.12 -18.18,1.79 -27.26,2.55 -5.82,0.63 -11.62,1.37 -17.43,2.12 -1.42,3.25 2.6,4.37 4.06,6.34 0.8,2.28 -1.56,8.42 2.19,7.1 4.11,-1.2 8.08,-2.93 12.48,-2.72 3.34,-0.82 6.63,-0.73 9.89,0.45 4.09,0.8 7.77,3.09 11.41,4.98 1.77,1.94 5.5,1.87 5.97,5 -0.14,3.27 4.32,-0.94 6.5,0.53 3.19,-0.8 5.24,-3.68 7.69,-5.5 4.86,1.69 0.62,-2.9 3.27,-3.97 3.13,-0.83 6.62,-1.39 9.35,0.79 3.04,0.57 5.43,2 6.57,4.99 3.68,0.02 2.88,4.13 5.48,5.3 2.96,0.49 2.98,4.52 6.3,4.3 2.91,0.36 5.45,1.15 5.84,4.45 2.05,2.11 3.92,4.26 3.09,7.41 0.18,3.68 0.12,7.33 -1.44,10.75 0.39,3.68 1.37,7.94 3.28,10.78 2.25,-3.46 0.17,-3.87 -1.74,-6.03 2.19,-1.76 4.86,-0.22 7.3,0.16 0.82,3.15 -2.16,5.6 -3.48,8.19 -3.3,2.21 1.65,4.09 2.73,6.3 3.11,3.34 4.35,7.94 7.53,11.26 0.78,2.29 2.51,7.47 4.63,3.09 2.54,-0.24 3.88,3.44 5.28,5.41 -0.02,2.26 1.93,7.04 3.59,6.44 2.88,-0.8 6.04,0.65 8.28,2.59 2.56,3.3 4.58,6.98 4.56,11.27 1.37,2.73 4.55,0.44 5.81,-1.14 3.74,0.45 7.26,-1.25 9.22,-4.47 -1.01,-2.36 -0.57,-4.83 -0.32,-7.17 -0.04,-2.18 4.33,-3.19 2.25,-6.51 -0.98,-6.33 -0.19,-12.96 -1.87,-19.25 -2.46,-6.93 -7.54,-12.74 -10.4,-19.56 -1.51,-2.41 -4.24,-3.92 -4.62,-7.04 -0.94,-2.28 -2.67,-4.95 -0.07,-6.71 -0.39,-3.56 -4.86,-5.42 -6.84,-8.41 -5.38,-5.57 -8.29,-12.94 -12.35,-19.44 -2.15,-5.53 -4.29,-11.07 -5.91,-16.78 -3.43,0.07 -7.3,-1.03 -10.46,-0.35l-0.34,0.37 -0.26,0.29z m52.91,109.22c-1.9,4.58 0.72,0.38 0.66,-1.91 -0.22,0.64 -0.44,1.27 -0.66,1.91z m-4.69,9.91c2.56,-1.97 3.68,-6.84 1.04,-1.68 -0.35,0.56 -0.69,1.12 -1.04,1.68z m-2.25,2.22c1.46,-1.22 2.04,-2.07 0.18,-0.18l-0.18,0.18z m-5.72,4.16c-5.23,3.69 4.03,-2.14 0.33,-0.19l-0.33,0.19z m-10.72,3.22c-3.41,3.16 5.71,-0.32 4.1,-0.81 -1.8,-0.56 -2.56,-0.71 -4.1,0.81z m-4.59,3.16c0.08,0.16 0.4,-0.3 0,0z",
            "name": "Florida"
        },
        "nh": {
            "path": "m862.56,94c-1.4,-0.41 -3.87,-0.72 -3.05,3 0.22,3.63 -0.73,7.84 2.23,10.59 0.33,2.78 0.08,5.36 -2.17,7.29 -0.19,2.83 -5.98,2.58 -3.35,5.32 1.16,7.35 -0.56,15.03 -0.62,22.51 1.2,1.95 0.98,4.39 0.76,6.75 -1.07,3.79 4.84,-0.05 6.89,0.06 3.93,-1.29 8.46,-1.74 12.04,-3.54 0.77,-3.1 4.37,-2.75 5.94,-4.96 2.59,-3.52 -3.01,-2.73 -2,-6.59 -3.83,0.01 -4.27,-2.46 -4.66,-5.62 -3.84,-11.98 -7.32,-24.45 -11.49,-36.1 -0.18,0.43 -0.35,0.85 -0.53,1.28z",
            "name": "New Hampshire"
        },
        "mi": {
            "path": "M697.86,177.24L694.63,168.99L692.36,159.94L689.94,156.71L687.35,154.93L685.74,156.06L681.86,157.84L679.92,162.85L677.17,166.57L676.04,167.21L674.58,166.57C674.58,166.57 671.99,165.11 672.16,164.47C672.32,163.82 672.64,159.45 672.64,159.45L676.04,158.16L676.84,154.77L677.49,152.18L679.92,150.56L679.59,140.54L677.98,138.28L676.68,137.47L675.87,135.37L676.68,134.56L678.3,134.88L678.46,133.27L676.04,131L674.74,128.42L672.16,128.42L667.63,126.96L662.13,123.57L659.38,123.57L658.74,124.21L657.77,123.73L654.7,121.46L651.79,123.24L648.88,125.51L649.2,129.06L650.17,129.39L652.27,129.87L652.76,130.68L650.17,131.49L647.58,131.81L646.13,133.59L645.81,135.69L646.13,137.31L646.45,142.8L642.9,144.9L642.25,144.74L642.25,140.54L643.54,138.12L644.19,135.69L643.38,134.88L641.44,135.69L640.47,139.89L637.72,141.02L635.94,142.96L635.78,143.93L636.43,144.74L635.78,147.33L633.52,147.81L633.52,148.95L634.33,151.37L633.2,157.51L631.58,161.56L632.23,166.24L632.71,167.38L631.9,169.8L631.58,170.61L631.26,173.36L634.81,179.34L637.72,185.8L639.18,190.65L638.37,195.34L637.4,201.32L634.97,206.5L634.65,209.25L631.39,212.33L635.8,212.17L657.22,209.91L664.5,208.92L664.59,210.58L671.45,209.37L681.74,207.87L685.6,207.41L685.74,206.82L685.9,205.37L688,201.65L690,199.91L689.78,194.86L691.37,193.26L692.46,192.92L692.69,189.36L694.22,186.33L695.27,186.94L695.44,187.58L696.24,187.74L698.18,186.77L697.86,177.24z M581.62,82.06L583.45,80L585.62,79.2L590.99,75.31L593.28,74.74L593.74,75.2L588.59,80.34L585.28,82.29L583.22,83.2L581.62,82.06z M667.79,114.19L668.44,116.69L671.67,116.85L672.97,115.64C672.97,115.64 672.89,114.19 672.56,114.03C672.24,113.86 670.95,112.17 670.95,112.17L668.76,112.41L667.15,112.57L666.82,113.7L667.79,114.19z M567.49,111.21L568.21,110.63L570.96,109.82L574.51,107.56L574.51,106.59L575.16,105.94L581.14,104.97L583.57,103.03L587.93,100.93L588.09,99.64L590.03,96.73L591.81,95.92L593.1,94.14L595.37,91.88L599.73,89.46L604.42,88.97L605.55,90.1L605.23,91.07L601.51,92.04L600.06,95.11L597.79,95.92L597.31,98.35L594.88,101.58L594.56,104.17L595.37,104.65L596.34,103.52L599.89,100.61L601.19,101.9L603.45,101.9L606.68,102.87L608.14,104L609.59,107.08L612.34,109.82L616.22,109.66L617.68,108.69L619.29,109.99L620.91,110.47L622.2,109.66L623.33,109.66L624.95,108.69L628.99,105.14L632.39,104L639.02,103.68L643.54,101.74L646.13,100.45L647.58,100.61L647.58,106.27L648.07,106.59L650.98,107.4L652.92,106.91L659.06,105.3L660.19,104.17L661.65,104.65L661.65,111.6L664.88,114.67L666.17,115.32L667.47,116.29L666.17,116.61L665.37,116.29L661.65,115.81L659.55,116.45L657.28,116.29L654.05,117.75L652.27,117.75L646.45,116.45L641.28,116.61L639.34,119.2L632.39,119.85L629.96,120.66L628.83,123.73L627.54,124.86L627.05,124.7L625.6,123.08L621.07,125.51L620.42,125.51L619.29,123.89L618.48,124.05L616.54,128.42L615.57,132.46L612.39,139.46L611.22,138.42L609.85,137.39L607.9,127.1L604.36,125.73L602.31,123.45L590.19,120.7L587.33,119.67L579.1,117.5L571.21,116.36L567.49,111.21z",
            "name": "Michigan"
        },
        "vt": {
            "path": "m833.16,106.59c0.19,6 4.65,11.21 3.72,17.28 -2.48,4.23 4.52,7.29 2.22,11.58 0.9,1.59 4.66,1.96 4.06,5.25 1.08,4.21 2.86,8.34 1.84,12.76 3.35,-0.51 7.06,-1.17 10.13,-1.97 -0.21,-2.13 1.51,-5.75 -0.53,-7.81 0.2,-7.64 1.01,-15.26 1.13,-22.91 -3.25,-2.41 0.32,-3.79 2.12,-5.18 1.96,-2.28 3.9,-5.07 2.6,-8.1 -2.62,-1.63 -1.02,-5.94 -2.39,-7.22 -8.3,2.1 -16.59,4.21 -24.89,6.31z",
            "name": "Vermont"
        },
        "me": {
            "path": "m889.88,40.22c-2.16,1.31 -3.69,2.74 -4.84,4.69 -2.29,0.6 -4.99,-1.37 -4.88,-3.94 -2.97,-0.82 -3.33,3.68 -4.37,5.71 -1.09,4.29 -3.27,8.39 -3.97,12.69 -0.06,3.04 1,6.63 -1.35,9.09 0.08,2.92 -0.75,6.18 2,8.16 -1.37,5.7 -6.23,10.36 -5.41,16.56 -4.27,-2.21 -1.74,2.47 -1.09,4.73 3.51,11.08 7.19,22.16 10.25,33.35 0.21,3.01 5.81,1.35 4.53,5.7 2.9,2 2.06,-3.92 2.66,-5.87 -1.01,-3.29 2.7,-4.63 0.66,-7.62 0.94,-1.05 2.92,-5.9 4.61,-3.46 2.03,1.03 5.28,-1.89 6.74,-3.19 -0.98,-4.02 4.21,-1.75 4.73,-5.32 -1.11,-2.61 0.74,-5.45 -0.57,-7.44 -2.42,-1.59 3.53,-4.63 3.31,-0.78 2.27,0.48 2.15,2.8 3.66,3.93 1.94,-2.82 -2.15,-3.81 0.35,-6.03 2.43,-0.81 3.1,-3.96 6,-3.31 -0.17,1.46 1.03,3.34 2.26,1.38 2.94,-2.9 5.24,-7.08 9.37,-8.34 1.17,-2.61 3.34,-5.74 0.71,-8.24 -0.55,-1.64 -3.68,-4.84 -4.15,-2.58 -0.75,2.6 -4.66,-0.65 -4.92,-2.22 0.1,-2.8 0.29,-7.17 -3.8,-5.81 -3.96,1.36 -3.64,-3.04 -4.69,-5.61C905.22,58.3 902.75,50.15 900.28,42c-2.86,-1.25 -5.71,-2.92 -8.81,-3.38 -0.53,0.53 -1.06,1.06 -1.59,1.59z m20.47,61c-2.81,1.7 1.87,5.16 1.13,1.22 1.48,-0.9 0.13,-2.4 -1.13,-1.22z m-7.81,7.81c3.16,6.67 2.63,-3.59 0,0z",
            "name": "Maine"
        },
        "ri": {
            "path": "m871,164.28c1.15,4.66 2.29,9.31 3.44,13.97 2.56,-0.49 4.66,-2.29 5.84,-4.56 4.17,0.76 4,-2.64 1.51,-4.97 -1.79,-1.94 -3.16,-5.31 -5.74,-5.92 -1.68,0.49 -3.37,0.99 -5.05,1.48z",
            "name": "Rhode Island"
        },
        "ny": {
            "path": "m825.56,108.66c-2.7,1.12 -5.45,1.68 -8.33,1.43 -5.07,0.72 -10.17,2.73 -12.92,7.31 -2.84,3.43 -4.89,7.49 -7.18,11.2 -1.65,2.36 -5.82,3.73 -5.55,6.84 -0.17,3.56 5.77,0.73 4.43,4.38 -2.69,2.3 0.8,4.23 0.56,6.59 0.5,3.47 -4.26,1.99 -5.36,4 -1.62,2.71 -3.35,6.62 -7.22,6.05 -3.04,-0.43 -5.35,2.05 -7.98,2.63 -2.5,-0.75 -4.7,-2.05 -7.59,-1.31 -5.31,0.21 -10.62,1.98 -15.23,4.53 -0.29,1.77 0.61,6.25 3.17,6.14 1.55,2.48 2.09,4.96 -0.63,6.72 -1.51,1.76 -1.8,4.25 -4.16,5.3 -1.93,1.14 -2.68,3.51 -4.8,4.54 0.33,3.07 -0.22,7.29 4.08,5.12 22.14,-4.26 44.26,-8.68 66.23,-13.74 0.98,3.85 5.67,1.32 6.44,4 0.64,2.93 1.36,7.4 5.33,6.88 3.14,1.9 6.9,3.68 10.69,4.22 2.71,0.47 7.18,1.43 6.44,5.06 -0.33,1.97 -1.62,7.56 1.97,5.93 5.3,-1.65 10.96,-2.84 15.06,-6.85 3.23,-2.49 6.76,-4.64 9.35,-7.86 -2.99,-2.44 -4.65,0.46 -6.81,2.42 -2.91,1.56 -6.01,3.51 -9.16,4.32 -2.6,-0.63 -4.83,-0.86 -6.18,2.07 -1.03,2.04 -4.86,2.98 -3.98,-0.15 4.26,-1.87 -2.17,-3.97 -0.33,-6.21 1.19,-3.13 0.56,-6.87 0.42,-10.21 -1.43,-7.38 -3.69,-14.76 -2.54,-22.36 -0.08,-4.46 1.55,-8.97 -0.51,-13.21 -1.22,-2.56 -0.47,-6.83 -4.05,-7.34 -2.99,-0.66 0.75,-4.31 -1.57,-6.2 -1.7,-2.43 -3.17,-4.91 -1.54,-7.81 0.38,-5.77 -3.83,-10.57 -3.55,-16.35 -2.32,0.65 -4.65,1.29 -6.97,1.94z",
            "name": "New York"
        },
        "pa": {
            "path": "m798.88,181.63c-17.5,3.38 -34.87,7.42 -52.47,10.28 -0.61,-2 0.48,-8.42 -2.41,-4.31 -2.18,2.73 -5.48,3.74 -8.09,5.97 1.52,9.75 2.63,19.57 5.44,29.05 1.14,6.09 2.27,12.17 3.41,18.26 8.85,-1.42 17.79,-2.25 26.51,-4.41 16.39,-3.45 33.03,-6.46 49.33,-9.87 2.48,-3.07 8.03,-1.69 8.97,-6.19 0.64,-2.36 4.86,-3.99 4.33,-5.9 -2.3,-1.89 -5.94,-2.77 -6.39,-6.13 -3.14,1.09 -4.42,-3.94 -3.12,-5.32 3.86,-1.1 -0.49,-3.68 0.55,-5.96 2.52,-1.88 1.12,-5.15 2.81,-7.07 3.87,-2.7 -2.98,-1.1 -3.72,-3.99 -1.35,-2.18 -0.28,-7.24 -4.16,-5.92 -2.34,-1.13 -3.87,-3.75 -7.09,-1.7 -4.64,1.07 -9.28,2.15 -13.92,3.22z",
            "name": "Pennsylvania"
        },
        "nj": {
            "path": "m827.84,191.34c1.03,2.99 -1.82,4.8 -2.06,7.47 2.86,1.63 0.49,4.87 -0.92,5.73 -0.41,3.86 4.01,1.68 4.16,5.14 1.37,2.19 4.72,3.02 6.26,4.94 -0.15,2.61 -3.85,3.5 -4.69,6.06 -0.26,3.07 -4.09,3.19 -4.18,5.96 -0.99,2.38 -0.74,5.09 1.7,6.47 2.85,2.76 6.86,3.99 10.73,4.38 0.48,1.55 -1.84,7.18 1.1,3.59 1.5,-2.42 0.59,-5.95 3.11,-8.01 2.5,-4.08 5.03,-8.84 4.88,-13.61 -1.35,-4.07 0.8,-9.01 -1.81,-12.82 -1.1,1.32 -6.17,1.23 -4.13,-0.8 2.39,-1.39 3.37,-3.62 2.39,-6.31 0.21,-2.31 1.58,-5.42 -1.69,-6.19 -4.35,-1.15 -8.82,-2.13 -12.88,-4.26 -0.66,0.75 -1.31,1.5 -1.97,2.25z",
            "name": "New Jersey"
        },
        "de": {
            "path": "m824.88,225.34c-3.72,0.25 -3.47,3.52 -1.91,6.13 3.35,6.89 3.86,14.58 6.03,21.81 3.45,0.11 6.81,-0.49 10.16,-1.25 -1.2,-2.17 -0.68,-6.38 -3.32,-6.38 -2.9,-1.2 -4.17,-3.69 -4.9,-6.58 -0.91,-3.11 -3.62,-4.96 -5.48,-7.35 -1.85,-1.82 0.94,-5.5 -0.26,-6.47l-0.33,0.09z",
            "name": "Delaware"
        },
        "md": {
            "path": "m813.59,229.19c-17.31,3.18 -34.53,6.83 -51.78,10.28 0.74,3.02 1.31,6.08 1.78,9.16 2.14,-1.9 3.29,-5.35 6.59,-5.34 2.14,-1.85 2.67,-5.25 5.77,-3.55 3.46,0.18 5.43,-5.35 9.01,-3.85 2.63,1.63 5.66,2.79 7.34,5.59 4.19,0.11 3.68,3.73 5.74,4.96 2.73,1.11 5.02,1.18 6.38,-0.53 4.29,1.38 2.24,3.74 1.44,6.9 0.09,2.97 -3.7,4.92 -1.66,7.97 3.1,1.31 6.4,1.2 9.63,1.4 2.17,1.58 6.83,1.03 3.79,-2.1 0.41,-2.74 -3.08,-3.35 -3.32,-6.04 -1.7,-2.67 -1.42,-5.47 -0.36,-8.32 1.68,-2.42 -2.83,-3.82 -0.4,-5.41 1.25,-1.53 0.43,-4.16 2.98,-4.7 1.62,-3.02 5.1,-1.45 2.35,1.02 -2.54,2.98 -0.81,4.5 0.57,6.3 1.41,3.55 -0.68,5.07 -1.53,7.31 -0.22,-0.81 3.62,-1.01 3.22,1.79 -3.15,1.64 -1.45,6.12 1.09,7.31 2.98,0.99 5.58,-1.8 6.98,2.14 1.5,3.75 4.92,0.81 7.41,-0.02 2.74,-1.21 3.47,-4.93 2.78,-7.7 -1.13,-1.58 -4.82,0.92 -7.13,0.4 -3.86,1.26 -4.9,-1.25 -5.28,-4.64 -1.68,-5.97 -2.14,-12.33 -5.16,-17.9 -0.04,-4.32 -2.71,-4.2 -6.07,-2.91 -0.73,0.16 -1.45,0.31 -2.18,0.47z m10.94,32.59c1.32,0.99 0.59,4.97 2.06,4.63 -0.48,-1.31 -0.36,-4.99 -2.06,-4.63z",
            "name": "Maryland"
        },
        "va": {
            "path": "m792.88,242.88c-0.16,1.46 0.24,5.89 -2.4,4.29 -2.58,-0.67 -6.42,-3.2 -8.23,-2.73 0.7,3.72 -1.46,6.77 -2.99,9.94 -3.05,1.14 -2.29,5.83 -5.84,5.58 -1.62,1.74 -1.47,5.31 -2.45,7.73 -3.09,1.14 -5.37,-0.48 -7.28,-1.75 0.11,6.5 -3.72,11.95 -5.91,17.84 -1.69,1.73 1.19,3.8 -0.74,5.77 -1.35,3.56 -3.79,2.72 -6.19,4.19 -2.72,1.1 -4.9,0.5 -5.4,4.61 -2.07,1.14 -4.83,2.63 -6.91,0.47 -2.38,1.51 -5.02,3.21 -7.81,1.6 -2.69,-0.01 -3.9,-6.55 -6.07,-2.94 -3.27,4.09 -7.89,7.48 -10.21,12.09 0.43,3.25 -4.46,3.32 -6.42,5.15 -4.27,1.95 3.62,-0.11 5.16,-0.07 5.56,-0.79 11.14,-1.37 16.76,-1.36 1.95,-2.65 4.98,-1.81 7.77,-1.65 7.86,-0.32 15.65,-2.12 23.48,-2.99 12.85,-1.4 25.44,-4.27 38.04,-7.05 11.65,-2.52 23.3,-5.03 34.96,-7.55 -1.64,-2.66 -2.75,-6.67 -6.42,-4.14 -1.99,2.03 -6.61,-1.82 -2.7,-2.48 2.65,-1.62 -1.75,-4.07 -1.8,-5.97 -2.73,-0.62 -2.88,-5.12 0.54,-3.6 -0.17,-1.37 -1.24,-3.62 -1.62,-5.68 1.47,-3.51 -0.84,-4.97 -3.72,-5.16 0.31,-3.42 -2.9,-2.93 -5.22,-3.97 -3.33,0.21 -7.06,-0.25 -9.91,-1.66 -1.22,-2.41 -0.91,-5.12 1.25,-6.88 1.39,-2.83 -0.28,-5.7 -3.3,-6.27 -2.65,-0.83 -6.97,-0.29 -5.73,-4.3 -0.83,-0.3 -2.05,-1.06 -2.69,-1.06z m39.16,21.59c0.44,4.71 -3.15,8.7 -2.62,13.48 -0.34,4.11 2.64,5.72 3.48,0.92 1.71,-3.04 -0.23,-6.47 0.8,-9.73 0.4,-2.53 3.66,-3.88 3.52,-6.73 -1.73,0.69 -3.46,1.38 -5.19,2.06z",
            "name": "Virginia"
        },
        "wv": {
            "path": "m739.75,223.25c-1.6,2.23 1.3,5.02 0.25,7.75 -0.18,4.04 -0.63,8.11 -0.84,12.13 -1.94,3.58 -4.43,7.35 -8.16,9.13 -3.15,-1.33 -3.92,3.25 -5.76,4.98 -1.56,2.28 2.64,4.93 -0.3,6.69 -2.57,3.58 -2.6,-4.8 -4.46,-0.71 -1.32,2.59 0.02,6.02 -1.35,8.33 -1.82,1.54 -0.53,5.19 -4.16,4.81 -2.23,0.13 -1.45,6.19 1,6.81 2.24,1.47 2.49,4.74 5.5,5.92 1.92,1.96 2.28,5.18 5.39,6.05 1.64,2.19 3.07,4.96 6.25,4.88 2.63,0.5 4.77,-3.86 7.22,-1.35 1.49,0.81 3.93,-0.57 4.58,-1.83 0.43,-4.57 3.42,-2.71 6.03,-4.39 2.39,-0.94 4.82,-0.98 5.62,-4.44 -1.26,-2.59 0.3,-5 1.56,-7.64 2.23,-4.81 4.72,-9.61 4.67,-15.05 2.65,-2.31 3.72,3.56 7.05,1.41 1.64,-1.77 1.12,-5.67 2.6,-7.59 3.47,0.39 2.97,-3.96 5.76,-5.21 2.29,-3.11 3.52,-6.8 3.06,-10.7 1.06,-1.29 5.1,1.62 7.23,2.15 3.3,3.35 4.34,-1.98 2.85,-4.05 -2,-2.28 -5.12,-3.7 -7.62,-4.75 -3.31,0.98 -5.44,5.47 -9.38,3.97 -1.86,-0.23 -2.38,3.98 -4.86,3.88 -2.89,0.71 -3.79,4.38 -6.03,6.22 -1.1,-0.06 -0.99,-4.82 -1.62,-6.64 -0.01,-3.93 -1.77,-5.3 -5.48,-3.82 -4.21,0.6 -8.41,1.23 -12.61,1.91 -1.17,-6.45 -2.29,-12.92 -3.44,-19.38l-0.35,0.35 -0.18,0.18z",
            "name": "West Virginia"
        },
        "oh": {
            "path": "m729.5,197.78c-4.85,2.06 -7.38,6.9 -11.47,9.97 -4.08,0.86 -8.09,1.75 -11.72,3.88 -3.41,1.61 -4.39,-4.09 -7.67,-2.63 -3.13,1.35 -5.49,-1.1 -8.11,-2.41 -8.6,1.15 -17.15,2.64 -25.66,4.38 1.45,17.83 4.12,35.53 5.87,53.33 -0.69,3.82 4.06,2.26 6.23,1.48 2.74,0.41 4.83,2.16 5.48,4.94 1.26,2.48 5.82,-0.87 6.96,2.54 2.19,1.53 4.46,-2.33 7.03,-0.58 2.52,0.04 5.62,1.51 6.84,-1.56 1.49,-0.55 5.37,-3.85 5.41,-0.71 0.38,2.53 3.82,3.57 5.77,4.7 3.53,0.63 2.32,-3.91 4.21,-5.51 -0.11,-2.74 0.21,-5.73 1.39,-8.13 2.53,-2.81 3.8,4.53 4.98,0.39 -2.02,-2.27 -0.99,-5.41 0.93,-7.41 1.07,-4.06 4.05,-2.41 6.5,-4.39 2.93,-3.16 6.59,-6.57 5.97,-11.27 0.44,-4.71 1.18,-9.75 -0.53,-14.23 1.47,-2.48 2.58,-4.29 0.96,-7.33 -2.04,-7.53 -2.56,-15.37 -3.93,-23.04 -1.81,1.2 -3.63,2.4 -5.44,3.59z",
            "name": "Ohio"
        },
        "in": {
            "path": "m658.66,210.31c-9.12,0.93 -18.35,1.98 -27.41,2.68 -2.6,0.39 -4.21,5.08 -6.89,2.98 -3.83,-2.84 -2.64,1.83 -2.41,4.45 1.1,14.81 2.73,29.61 3.44,44.42 -0.76,3.69 -1.39,7.89 1.36,10.91 0.1,2.99 1.4,6.28 -1.14,8.65 -1.83,2.73 -2.55,6.09 -5.02,8.42 0.09,2.08 -2.02,8.2 1.63,5.16 3.49,-0.6 7.25,-1.53 10.69,-1.34 2.36,4.08 2.67,-0.62 5.26,-1.29 2.03,-2.62 4.78,2.05 5.34,1.04 -1.26,-3.41 3.05,-3.77 5.1,-5.22 1.09,0.63 6.05,3.38 5.3,-0.64 -0.46,-2.47 2.02,-4.71 3.65,-6.34 3.11,-1.39 4.33,-3.9 4.16,-7.23 1.83,-1 4.93,-1.01 6.97,-2.47 4.23,-1.03 0.26,-3.48 1.22,-5.92 -0.83,-12.56 -2.8,-25.13 -4.08,-37.69 -0.85,-6.99 -1.44,-14.01 -2.14,-21.02 -1.68,0.16 -3.35,0.31 -5.03,0.47z",
            "name": "Indiana"
        },
        "il": {
            "path": "m569.75,200.44c-0.29,2.58 4.2,1.83 3.73,5.07 2.07,2.09 5.71,4.21 4.38,7.77 -0.31,3.04 -2.61,5.44 -3.08,8.4 -2.38,2.71 -6.06,2.98 -9.31,3.94 -1.61,2.47 -1.05,4.91 1.28,6.47 0.63,3.25 -1.08,5.07 -2.74,7.38 1.41,3.63 -2.39,2.86 -3.56,5.02 1.08,3.12 -2.11,3.8 -2.53,6.64 0.19,3.95 1.33,8.21 3.28,11.58 3.68,3.96 7.38,7.9 12.21,10.47 -0.61,2.88 -0.64,6.7 3.43,5.71 2.05,0 6.18,0.38 6.26,2.68 -0.19,4.39 -3.6,8.24 -3.28,12.53 1.6,3.83 5.33,6.26 8.59,8.42 3.37,-0.29 5.36,1.27 5.9,4.6 1.01,2.64 3.84,4.73 1.73,7.67 0.55,1.74 2.58,7.7 4.31,4.05 1.21,-2.98 5.41,-4.78 8.07,-2.46 3.1,2.46 5.94,0.47 3.13,-2.8 -0.98,-3.39 2.61,-4.96 5.37,-5.33 1.01,-1.55 -1.6,-4.46 1.4,-5.97 1.8,-3.97 -0.56,-9.39 3.32,-12.49 1.43,-2.97 3.23,-5.97 4.4,-8.97 0.13,-3 -0.7,-5.7 -2.34,-8.16 -0.45,-4.59 1.31,-9.09 0.02,-13.65 -1.16,-15 -2.22,-30.05 -3.67,-45.01 -1.02,-3.1 -1.61,-6.46 -4.04,-8.77 -2.27,-1.83 -0.51,-5.93 -1.97,-7.32 -14.76,0.83 -29.52,1.67 -44.28,2.5z",
            "name": "Illinois"
        },
        "ct": {
            "path": "m865.78,165.41c-6.91,1.54 -13.81,3.08 -20.72,4.63 2.17,6.2 2.74,12.83 2.44,19.34 -2.62,4.3 2.61,2.38 3.97,-0.21 2.09,-1.89 4.19,-3.71 5.99,-5.88 2.06,1.35 4.78,-1.86 7.44,-1.46 2.98,-0.68 5.69,-2.24 8.56,-3.26 -1.15,-4.67 -2.29,-9.33 -3.44,-14 -1.42,0.28 -2.83,0.56 -4.25,0.84z",
            "name": "Connecticut"
        },
        "wi": {
            "path": "m559.53,104.97c-4.06,2.75 -8.71,4.92 -13.53,5.84 -2.88,-1.08 -5.54,-1.12 -5.57,2.68 -0.48,3.34 0.51,7.03 -0.47,10.17 -2.02,3.26 -6.91,4.03 -7.36,8.38 -2.63,2.78 2.21,3.06 2.23,5.53 1.79,2.9 -2.13,4.74 -1.33,7.65 0.29,2.93 -0.4,6.49 1.14,8.93 1.33,3.48 5.88,0.21 6.64,3.93 1.56,2.26 5.47,1.03 6.19,4.78 2.15,5.1 9.7,4.85 11.21,10.39 0.68,3.38 0.35,7.34 1.94,10.32 3.26,1.05 1.94,4.34 0.25,6.21 -0.79,3.96 2.53,8.34 6.75,8.25 2.28,1.6 4.86,1.65 7.83,1.19 13.03,-0.77 26.07,-1.53 39.1,-2.3 -0.02,-4.45 -1.98,-8.61 -1.86,-13.13 -1.7,-2.04 -0.86,-4.17 -0.04,-6.39 0.32,-2.84 3.07,-4.93 1.51,-7.87 -1.05,-2.94 -0.88,-6.21 1.73,-8.27 -0.2,-2.83 -0.5,-5.03 -0.16,-7.93 -1.14,-4.2 2.64,-7.5 3.69,-11.36 0.92,-1.13 3.15,-8.34 0.73,-4.93 -2.65,3.81 -4.99,8.01 -8.18,11.29 -0.86,2.06 -3.21,4.55 -5.21,4.5 -2.57,-1.26 0.28,-4.49 0.9,-6.41 0.47,-2.94 3.2,-4.25 4.09,-6.85 -3.31,-1.29 -2.77,-5.03 -3.54,-7.92 0.02,-3.09 -1.23,-5.08 -4.29,-5.57 -2.14,-3.67 -7.04,-2.78 -10.59,-4.12 -7.13,-1.87 -14.21,-4.39 -21.67,-4.99 -2.48,-0.54 -2.84,-5.51 -5.51,-4.73 -1.71,-1.54 -3.85,-0.7 -5.82,0.13 -2.8,-1.32 0.68,-4.59 1.5,-6.38 2.18,-1.34 -1.53,-2.14 -2.31,-1z",
            "name": "Wisconsin"
        },
        "nc": {
            "path": "m830.06,295.97c-18.3,3.8 -36.53,8 -54.86,11.65 -12.74,1.51 -25.38,4.07 -38.18,4.94 -3.32,-0.82 -1.17,3.72 -2.5,5.53 -2.62,1.34 -3.49,4.59 -5.03,6.38 -3.24,-1.36 -5.07,1.46 -6.34,3.97 -1.09,-0.57 -2.96,0.03 -3.41,-1.41 -2.02,1.96 -4.37,3.73 -4.31,6.81 -3.66,1.1 -6.31,3.82 -9.28,5.96 -2.64,0.94 -5.76,2.16 -7.4,4.35 0.73,4.06 -2.98,3.3 -5.1,5.29 -1.98,4.69 2.74,2.66 5.58,2.5 6.41,-1.19 13.32,-0.49 19.18,-3.73 5.04,-1.9 9.41,-5.9 15.06,-5.67 6.5,-0.64 13.15,-0.6 19.62,-0.69 2.99,0.53 3.36,4.79 5.58,5.01 5.37,-0.81 10.87,-1.67 16.25,-1.79 5.38,1.36 9.61,5.45 14.52,7.93 3.59,2.64 6.93,5.66 10.43,8.44 3.15,-0.86 6.32,-1.58 9.59,-1.72 1.06,-4.55 2.04,-9.29 5.39,-12.78 4.2,-4.27 9.23,-8.29 15.33,-9.29 2.91,1.95 3.69,-2.9 5.27,-4.53 2.72,-5 -2.44,3.91 -2.46,-1.22 -3.87,0.7 -5.43,-0.26 -3.29,-4 2.77,-4.25 -2.73,-2.51 -2.12,-6.02 -1.42,-3.76 2.84,2.19 5.06,0.81 2.81,0.12 5.1,-1.87 5.59,-4.6 0.45,-2.9 4.59,-2.7 3.28,-6.48 -4.02,-2.43 4.25,-0.66 0.4,-3.93 -3.52,-3.44 -5.24,-8.33 -7.23,-12.76 -1.54,0.35 -3.08,0.71 -4.63,1.06z m17.13,23.72c1.55,2.61 -4.64,4.26 -0.52,2.69 1.38,-1.92 0.21,-5.22 0.24,-7.62 -0.74,-2.05 0.37,4.57 0.28,4.94z",
            "name": "North Carolina"
        },
        "dc": {
            "path": "m803.44,248.16c2.67,3.43 3.85,-1.02 0.55,-0.75l-0.29,0.4 -0.25,0.35z",
            "name": "District of Columbia"
        },
        "ma": {
            "path": "m877.59,144.41c-1.04,3.1 -4.01,3.5 -6.79,4.13 -8.62,2.32 -17.17,4.6 -25.96,6.12 -0.11,4.77 -1.17,9.59 -0.03,14.31 10.66,-2.6 21.54,-4.29 32,-7.44 3.57,2.81 6.01,6.73 8.28,10.59 2.13,-0.78 0.01,-5.15 3.77,-5.38 2.93,-3.28 1.83,4.78 3.17,2.62 2.13,-3.09 6.1,-3.9 9.41,-5.21 -0.11,-3.41 -2.21,-8.55 -6.38,-7.53 1.64,-0.1 4.89,0.87 4.91,3.82 0.85,2.24 -2.55,3.71 -4.35,4.24 -3.37,0.51 -4.99,-1.76 -6.32,-4.47 -1.38,-2.05 -3.58,-6.56 -6.3,-3.6 -1.89,-1.72 -3.13,-4.04 -1.33,-6.3 2.3,-2.34 1.23,-6.2 -1.28,-7.16 -0.93,0.41 -1.86,0.82 -2.79,1.24z M902.25,172.69c-1.6,2.76 3.05,-2.44 0.08,-0.32l-0.08,0.32z m-11.28,1.28c1.59,0.78 6.09,-2.26 1.78,-2.03 -0.59,0.68 -1.19,1.35 -1.78,2.03z",
            "name": "Massachusetts"
        },
        "tn": {
            "path": "m730.41,314.34c-8.87,-0.11 -17.76,1.5 -26.57,2.73 -10.24,2.86 -20.99,2.66 -31.48,4.02 -16.34,1.45 -32.65,3.29 -48.96,4.95 -4.57,-1.71 -0.43,5.74 -5.06,4.14 -6.97,0.06 -13.87,1.23 -20.84,0.71 -0.95,4.26 -1.37,9.04 -3.6,12.76 -3.45,1.82 -4.01,5.81 -4.43,9.33 -3.1,1.1 -4.68,2.61 -2.53,5.59 -1.75,3.9 -0.58,5.24 3.51,3.98 33.91,-3.26 67.83,-6.53 101.74,-9.79 -0.23,-2.54 0.72,-5.31 3.53,-5.69 3.11,-0.4 0.99,-5.41 4.88,-5.81 2.77,-2.02 6.49,-2.19 8.62,-5.18 1.76,-2.26 6.31,-1.64 5.78,-5.38 1.19,-1.77 3.1,-3.84 5.03,-4.85 1.04,-0.39 0.28,1.78 1.72,1.19 2.38,0.56 2.2,-4.36 5.22,-3.86 3.3,1.27 2.68,-2.92 4.96,-4.18 2.05,-0.94 3.81,-6.68 0.92,-6.59 -0.81,0.64 -1.63,1.27 -2.44,1.91z",
            "name": "Tennessee"
        },
        "ar": {
            "path": "m509.47,335.31c1.73,4.9 1.5,10.02 1.53,15.12 2.15,12.21 1.13,24.64 1.47,36.97 0.02,3.71 0.04,7.42 0.06,11.13 2.06,3.2 5.05,-1.45 7.69,1.47 1.53,1.76 -0.88,7.54 2.97,6.49 17.61,-0.36 35.23,-0.72 52.84,-1.08 1.97,-2.6 0.41,-5.9 -1.28,-8.22 3.3,-1.61 -1.59,-3.96 0.84,-6.53 0.75,-2.77 0.62,-6.34 3.78,-7.69 -1.88,-3.07 2.08,-5.24 3.19,-7.88 3.77,-0.38 1.58,-3.3 2.64,-5.42 1.12,-2.67 2.56,-5.28 4.85,-6.58 1.2,-4.12 0.21,-2.67 -1.53,-5.61 -2.76,-3.32 1.95,-3.96 2.36,-6.84 -0.05,-1.94 3.31,-6.69 1.22,-6.75 -2.65,0.85 -5.34,-0.18 -8.02,-0.33 -0.09,-3.38 4.4,-3.88 4.22,-7.3 0.58,-3.87 -3.58,-3.68 -6.34,-3.26 -24.17,0.77 -48.34,1.54 -72.5,2.31z",
            "name": "Arkansas"
        },
        "mo": {
            "path": "m490.44,245.63c-2.39,-0.46 -0.19,4.05 0.07,5.6 2.45,3.32 4.51,7.86 8.55,9.22 2.81,-0.24 3.61,2.67 2.79,4.84 -3.22,1.64 -1.72,5.03 0.19,7.07 0.9,2.55 4.61,3.05 4.89,5.61 2.1,12.97 1.12,26.14 1.51,39.22 0,5.72 0.08,11.44 0.72,17.13 24.99,-0.94 49.98,-1.8 74.97,-2.51 3.02,-1.12 4.35,1.72 5.31,3.98 0.52,3.48 -2.86,4.46 -4.14,6.86 2.37,0.64 5.57,0.65 8.21,-0.08 1.46,-3.59 1.87,-7.45 2.38,-11.22 0.84,-2.83 5.27,-2.89 4.61,-6.03 1.37,-2.94 0.14,-4.6 -2.22,-4.28 -2.15,-1.81 -2.84,-5.03 -2.86,-7.6 1.45,-2.84 -2.08,-5.07 -2.44,-7.89 -0.66,-3.24 -5.34,-0.87 -6.89,-3.66 -2.64,-2.34 -6.24,-3.94 -6.91,-7.76 -0.94,-3.21 1.52,-6.47 2.17,-9.64 2.2,-3.53 -1.34,-4.7 -4.33,-4.5 -2.66,0.39 -5.34,-1.15 -4.81,-4.1 0.86,-4.07 -4.71,-4.05 -6.43,-6.93 -2.7,-3.4 -6.72,-6.05 -7.25,-10.67 -1.1,-3.16 -2.12,-6.86 -0.62,-10.06 -2.3,-1.34 -2.28,-5.77 -5.37,-4.89 -20.69,0.77 -41.38,1.53 -62.06,2.3z",
            "name": "Missouri"
        },
        "ga": {
            "path": "m672.78,356c-0.74,7.06 4.28,12.69 5.29,19.4 1.36,6.57 3.44,12.96 5.03,19.44 0.94,4.88 2.17,9.95 5.53,13.75 -0.85,3.5 3.37,3.17 2.59,6.44 -1.89,4.45 -3.57,9.65 -0.84,14.13 0.05,2.63 0.94,5.4 -0.38,7.88 2.95,0.94 1.45,4.01 3.07,6.01 1.35,2.67 3.68,4.75 6.83,4 12.35,-0.01 24.69,-1.31 37.03,-1.92 3.32,-0.58 6.67,-0.74 10.04,-0.59 -0.78,4.24 3.04,4.15 2.09,-0.09 -0.9,-2.14 -2.94,-6.23 0.59,-6.62 3.2,0.5 6.42,0.91 9.66,1.02 -0.84,-3.8 -0.8,-7.57 0.5,-11.27 0.2,-3.54 2.62,-6.73 2.21,-10.21 -0.72,-2.93 3.26,-5.26 2.85,-8.05 -2.19,1.37 -5.29,-0.71 -5.34,-3.19 -0.56,-3.12 -2.71,-5.83 -6.03,-6.06 -1.33,-3.9 -2.62,-8.17 -4.99,-11.43 -3.12,-1.07 -6.13,-2.99 -7.17,-6.29 -2.06,-2.33 -5.23,-3.21 -6.66,-6.16 -2.08,-2.2 -5.24,-2.83 -7.66,-4.19 -0.76,-2.53 -3.21,-4.09 -3.94,-6.67 -1.36,-2.63 -2.97,-4.65 -6.15,-3.77 -2.33,-1.57 -7.15,-3.38 -5.31,-6.97 2.02,-2.01 3.76,-4.11 -0.8,-3.11 -12.68,1.51 -25.37,3.01 -38.05,4.52z",
            "name": "Georgia"
        },
        "sc": {
            "path": "m737.03,343.19c-4.26,0.4 -8.64,0.43 -12.24,3.07 -3.2,1.75 -6.48,3.19 -9.88,4.49 2.21,3.31 -4.28,2.74 -2.34,6.44 2.27,2.24 5.2,4.13 8.5,3.28 2.53,3.15 3.83,6.94 6.53,9.88 0.91,2.76 5.13,2.06 6.85,4.46 2.18,1.38 2.96,4.25 5.62,5.01 2.99,1.95 3.36,6.38 7.26,7.24 3.61,0.62 3.77,4.77 5.34,7.38 0.38,3.35 2.02,4.84 4.79,5.96 3.36,1.79 1.76,7.23 5.67,8.16 3.63,-1.38 5.8,-4.63 8.38,-7.34 -2.35,-3.93 0.29,-3.32 3.01,-4.44 1.95,-2.4 5.02,-3.3 6.25,-6.28 2.17,-2 3.86,-4.52 5.4,-6.9 2.81,-0.17 3.42,-3.58 4.92,-5.03 -0.28,-4.13 1.3,-7.89 3.12,-11.47 1.03,-2.11 7.03,-4.5 3.47,-6.34 -5.97,-5.35 -12.78,-9.5 -19.71,-13.47 -4.45,-2.68 -9.74,-0.07 -14.57,-0.06 -2.57,-0.23 -6.63,2.48 -7.32,-1.28 -1.66,-4.5 -6.93,-2.82 -10.63,-2.96 -2.8,0.07 -5.61,0.14 -8.41,0.21z",
            "name": "South Carolina"
        },
        "ky": {
            "path": "m675,267.5c-2.76,-0.77 -6,1.11 -3.38,3.78 1.52,3.15 -3.12,4.12 -5.19,5.27 -2.94,0.53 -4.71,1.29 -4.3,4.82 -1.15,2.66 -5.3,3.24 -6.32,6.32 -2.16,1.4 0.74,6.22 -2.84,5.92 -3.06,0.61 -4.36,-2.79 -7.09,0.11 -2.26,0.51 -1.1,6.98 -3.85,3.1 -2.27,-2.54 -5.57,0.14 -6.16,2.81 -1.91,1.07 -3.4,-3.73 -6.02,-1.91 -3.32,0.61 -7.48,0.47 -9.92,2.91 0.08,2.65 -3.39,3.78 -1.7,6.05 2.34,2.66 -2.23,2.68 -3.86,3.3 -3.57,1.35 -0.68,4.35 -0.76,6.72 0.33,3.45 -3.76,1.44 -5.49,0.72 -2.5,-2.29 -6.26,-0.38 -7.13,2.53 2.86,2.28 -0.04,4.76 0.41,7.66 -3.47,2.04 -3.19,2.73 0.94,2.35 5.84,0.01 11.64,-0.95 17.5,-0.76 -0.7,-3.74 0.98,-4.99 4.56,-4.19 24.33,-3.01 48.82,-4.7 73.16,-7.43 4.3,-0.7 8.2,-2.38 11.75,-4.88 3.3,-0.8 4.04,-2.71 5.12,-5.35 3.46,-4.09 7.13,-8.06 10.79,-12 -3.27,-1.24 -3.03,-5.51 -6.21,-6.95 -2.6,-1.25 -2.07,-4.66 -5.16,-5.36 -2.38,-2.64 0.8,-7.28 -3.02,-8.87 -3.02,-0.01 -2.37,-4.65 -4.57,-3.51 -2.95,0.61 -3.67,4.78 -7.02,3.29 -2.69,-0.23 -5.51,-1.19 -7.82,0.71 -3,0.83 -3.99,-3.61 -7.44,-2.06 -3.51,0.82 -2.17,-5.19 -5.65,-5.26C677.17,266.43 676.21,267.17 675,267.5z",
            "name": "Kentucky"
        },
        "al": {
            "path": "m628.53,359.63c-0.2,14.37 0.12,28.75 -0.54,43.12 -0.04,9.01 -0.88,18.1 -0.07,27.07 1.55,10 2.94,20.01 3.85,30.09 3.07,1.09 3.69,-1.92 4.4,-4.18 -0.3,-3.89 4.27,-3.02 4.89,-0.04 0.72,2.06 4.08,5.27 0.77,6.65 -0.15,0.92 6.17,-0.9 5.88,-2.89 -0.44,-3.01 0.64,-6.86 -2.87,-8.19 -2.29,-0.88 -3.03,-5.59 -0.32,-5.67 14.08,-1.86 28.21,-3.59 42.35,-4.8 2.7,1.07 6.76,-0.25 2.97,-2.5 -1.8,-2 0.95,-5.03 -0.27,-7.65 -0.31,-3.1 -2.63,-5.9 -1.31,-9.15 0.01,-2.92 2.49,-5.36 1.93,-8.3 -3.52,-0.45 -1.34,-5.11 -4.26,-6.7 -3.48,-5.82 -3.36,-13.04 -5.96,-19.21 -2.02,-8.09 -3.34,-16.41 -7.25,-23.88 -0.51,-2.39 -1.08,-4.85 -0.72,-7.31 -14.49,1.18 -28.98,2.35 -43.47,3.53z",
            "name": "Alabama"
        },
        "la": {
            "path": "m521.09,407.28c0.1,7.53 -0.24,15.32 1.67,22.61 2.08,2.49 2.82,5.51 3.15,8.67 1.87,2.78 5.27,4.95 4.59,8.72 1.61,2.18 -0.21,5.69 0.08,8.38 0.42,2.64 -4.36,4.89 -2.01,7.12 1.07,2.26 -0.92,5.31 -0.53,7.95 0.38,3.22 -2.37,5.7 -1.55,8.93 5.18,-2.4 10.98,-0.86 16.47,-1.09 5.72,1.7 11.56,4.87 17.56,4.26 2.93,-2.25 5.94,0.36 8.98,0.93 1.08,-3.4 -4.22,-0.81 -5.8,-2.2 -1.91,-0.36 -2.89,-2.3 -1.17,-3.4 2.08,-1.1 4.08,-1.09 5.66,0.04 2.15,-1.39 5.6,-0.24 6.26,2.38 -0.33,3.62 3.42,1.7 5.28,3.15 3.83,1.5 -1.41,4.07 0.83,5.37 2.88,0.97 5.73,2.94 8.62,3.29 3.51,-0.05 2.81,-4.53 6.47,-4.17 1.83,-2.9 4.44,-0.25 4.39,2.31 1.53,1.64 4,-3.68 1.98,-3.66 0.22,-3.37 2.17,-3.21 4.31,-5.41 1.59,0.95 0.91,2.82 1.41,4.16 3.33,0.39 7.44,1.09 9.34,4.06 2.79,0.08 5.17,1.1 5.56,-2.56 -2.68,-0.27 -4.15,-3.88 -7.35,-3.19 -2.31,0.06 -6.3,-1.62 -6.15,-3.77 1.62,-3.62 2.23,-1.74 2.03,-4.38 2.88,1.09 5.69,-2.27 3.22,-4.47 0.46,-4.62 -3.73,-0.15 -3.34,2.19 -1.36,1.21 -6.35,-0.96 -4.6,-3.27 1.71,-1.84 4.2,-4.5 2.19,-6.95 -0.13,-3.26 -2.69,-5.21 -4.47,-7.38 0.52,-2.7 2.26,-7.35 -2.36,-5.46 -10.43,1.28 -20.97,0.69 -31.45,1.12 -1.61,-3.72 -0.02,-7.76 0.16,-11.59 2.66,-4.86 5.46,-9.65 8.25,-14.44 -2.04,-2.82 3.52,-4.45 -0.74,-6.48 -0.53,-2.15 -1.29,-4.65 -2.32,-6.83 -0.08,-3.1 0.9,-7.3 -3.62,-5.79 -17,0.28 -34,0.57 -51,0.85z",
            "name": "Louisiana"
        },
        "ms": {
            "path": "m591.03,363.5c-1.45,1.74 -4.03,3.15 -4.63,6.03 -1.4,2.22 1.43,5.74 -2.69,6.07 -1.48,1.97 -4.77,4.42 -3.4,7.17 -1.36,1.83 -3.59,3.95 -3.48,7.01 -2.16,2.66 1.55,5.28 -0.27,7.12 -0.45,1.84 2.25,4.42 1.35,7.03 -1.92,2.71 -1.63,6.55 -0.61,9.53 1.6,2.4 0.78,5.54 3.73,6.94 -0.95,2.53 -1.41,3.75 -1.87,6.31 -2.55,4.96 -6.07,9.62 -7.89,14.84 0.01,2.98 -1.44,6.14 -0.14,8.97 11.4,-0.36 22.87,0.25 34.19,-1.5 2.75,2.21 -2.19,6.39 1.33,8.15 2.82,1.62 2.28,5.18 3.89,7.63 2.07,-1.86 2.51,-6.19 5.82,-4.07 3.21,-0.67 6.85,-3.02 9.89,-0.64 3.62,0.73 6.01,-0.27 4.42,-4.26 -0.81,-10.1 -2.99,-20.07 -3.84,-30.15 0.14,-21.99 1.48,-43.98 0.64,-65.97 -12.15,1.26 -24.29,2.52 -36.44,3.78z",
            "name": "Mississippi"
        },
        "ia": {
            "path": "m476.25,181.16c-3.42,-0.05 -2.16,5.68 0.72,6.29 0.54,2.07 -0.75,5.06 -1.41,7.35 -2.13,2.82 -0.93,5.45 1.04,7.92 1.22,4.34 2.24,8.85 4.05,13.06 0.6,3.22 1.29,6.38 3.41,9 0.02,3.49 1.27,6.69 2.3,9.91 -0.04,3.54 0.03,7.05 2.08,10.09 22.2,-1.02 44.44,-1.75 66.66,-2.63 0.77,1.43 3.25,7.11 4.37,4.25 -0.96,-2.5 1.19,-4.52 3.57,-4.72 -0.88,-2.62 1.19,-4.59 2.5,-6.28 1.27,-2.92 -1.39,-4.02 -2.41,-6.31 0.69,-2.9 1.79,-5.3 5.13,-5.46 2.88,-0.83 6.57,-1.81 6.65,-5.41 1.76,-3.04 3.73,-8.01 -0.26,-10.18 -2.74,-1.06 -1.75,-5.27 -5.21,-5.14 -0.64,-1.97 -0.85,-4.76 -4.19,-4.21 -2.75,-0.8 -4.55,-3.47 -5.37,-6 -1.36,-2.89 2.01,-4.72 1.65,-7.28 -3.82,-0.4 -1.19,-6.5 -5.03,-5.47 -26.75,0.41 -53.5,0.81 -80.25,1.22z",
            "name": "Iowa"
        },
        "mn": {
            "path": "m497.03,53.84c-0.69,2.52 0.93,7.42 -1.31,8.34 -9.65,-0.01 -19.29,-0.02 -28.94,-0.03 1.16,2.87 2.18,5.76 0.97,8.81 0.05,5.74 -0.79,11.86 2.51,16.95 2.04,3.78 0.64,8.47 1.5,12.6 0.82,6.84 1.76,13.67 3.55,20.32 0.05,3.83 0.88,7.8 0.03,11.53 -1.57,1.74 -4.91,3.29 -2.22,5.78 1.89,1.83 5.05,2.94 4.58,6.1 0.28,11.9 0.25,23.83 0.42,35.75 26.72,-0.38 53.44,-0.75 80.16,-1.13 -0.15,-3.62 -0.46,-7.93 -4.36,-9.47 -3.02,-1.66 -6.24,-3.1 -7.63,-6.5 -0.72,-3.61 -5.32,-1.16 -6.05,-4.61 -1.56,-2.09 -5.29,-0.37 -6.57,-3.78 -1.66,-2.1 -0.52,-5.5 -1.1,-8.1 -1.34,-2.93 1.65,-4.99 1.47,-7.54 -0.2,-3.22 -5.36,-3.85 -2.24,-7.43 0.41,-4.47 5.39,-5.33 7.61,-8.59 0.24,-3.87 -0.73,-8.14 0.52,-11.77 1.76,-3.14 5.17,-5.1 8.28,-6.26 1.92,-2.08 3.66,-4.57 6.13,-5.81 2.54,-4.97 6.04,-9.99 11.81,-11.4 4.55,-1.98 9.12,-3.92 13.6,-6.04 0.73,-3.15 -3.7,-0.18 -5.06,0.03 -0.82,-3.87 -4.2,-3.09 -7.28,-2.87 -2.25,-0.87 -5.34,2.83 -6,-0.66 -1.13,-3.5 -4.51,0.72 -5.88,2.13 -2.33,1.63 -6.22,1.16 -8.06,-0.56 0.94,-3.05 -4.61,-0.39 -4.53,-3.96 -0.16,-2.3 -3.48,1.3 -5.77,-1.2 -3.04,-0.91 -5.5,-3.22 -8.29,-4.38 -2.49,0.4 -5.86,-2.38 -6.7,1.5 -1.17,0.79 -7.15,1.83 -5.93,-1.54 -2.99,0.03 -6.03,-0.05 -7.53,-1.75 -2.6,0.59 -5.72,-0.41 -5.9,-3.43 -0.88,-3.28 -1.44,-6.61 -1.88,-9.98 -1.23,-0.6 -2.54,-1.02 -3.91,-1.06z",
            "name": "Minnesota"
        },
        "ok": {
            "path": "m363.31,330.03c17.51,1.12 35.04,1.73 52.56,2.47 -1.37,13.62 -2.89,27.23 -2.83,40.93 -0.92,3.93 3.48,5.78 6.14,7.66 0.56,-5.56 2.96,1.46 4.25,-1.31 0.93,-1.5 5.57,1.68 3.39,4.42 1.59,0.66 4.76,0.51 6.73,1.82 2.79,-0.99 5.16,3.32 7.03,1.26 1.82,-1.93 5.59,-0.31 6.5,2.02 2.44,0.79 1.71,5.84 4.76,3.05 1.39,-1.65 6.25,-1.17 6.69,1.21 1.28,1.5 5.69,3.72 7.39,1.92 0.33,-2.75 3.38,-5.95 4.59,-1.83 3.59,0.38 6.96,2 10.46,3 2.28,-1.86 2.44,-4.68 6.53,-3.41 2.53,1.92 3.8,-1.41 6.31,-1.16 0.85,2.42 5.2,2.41 6.19,-0.5 3.2,-0.2 3.66,3.71 6.55,4.35 1.86,0.4 6.31,3.63 5.36,0.18 -0.32,-12.27 0.1,-24.59 -0.7,-36.82 -1.15,-6.03 -1.01,-12.18 -1.43,-18.25 -1.32,-5.29 -2.05,-10.73 -2.07,-16.18 -20.01,0.66 -40.04,-0.04 -60.06,-0.22 -27.85,-1.32 -55.73,-2.3 -83.53,-4.56 -0.27,3.31 -0.54,6.63 -0.81,9.94z",
            "name": "Oklahoma"
        },
        "tx": {
            "path": "m359.47,330.97c2.34,-0.11 -0.86,-1.81 0,0z m0.72,18.31c-1.64,20.84 -2.52,41.75 -4.68,62.55 -0.51,4.33 -0.99,8.66 -1.51,12.98 -17.84,-0.87 -35.67,-1.93 -53.42,-3.89 -4.16,-0.41 -8.32,-0.76 -12.48,-1.11 -0.67,3.74 2.27,3.68 4.04,6.12 2.26,1.83 1.13,6.03 4.65,6.5 3.52,0.48 2.9,4.6 5.45,6.34 3.38,3.15 5.5,7.91 10.27,9.06 1.91,1.27 4,3.22 4.53,5.46 0.69,3.96 4.53,7.02 3.47,11.33 -0.88,5.15 2.22,9.63 5.93,12.88 2.18,2.95 5.14,4.76 8.63,5.78 1.88,1.95 3.01,3.88 5.72,4.88 2.59,0.18 5.38,4.34 7.35,1.18 2.59,-3.14 5.48,-6.41 6.05,-10.55 1.26,-2.82 3.58,-4.32 6.5,-5.06 2.72,-1.59 5.32,-2.13 7.47,0.62 4.91,0.57 10.2,0.53 14.79,2.22 2.83,1.43 2.56,4.53 5.17,6.33 1.73,2.05 4.83,3.37 5.81,5.82 1.37,2.07 2.66,4.26 2.69,7.03 1.62,4.34 4.17,8.51 5.31,12.94 -0.24,2.77 4.65,2.49 4.95,5.51 2.24,4.08 4.37,9.17 9.21,10.49 3.28,2 0.03,5.04 0.91,7.5 3.28,0.87 -0.01,4.68 0.94,6.67 2.53,1.36 4.37,3.2 4.22,6.44 0.39,3.34 2.13,6.83 5.69,7.54 3.01,1.93 6.69,2.13 9.87,3.4 2.28,1.79 5.15,4.09 8.16,2.83 3.46,0.46 6.77,1.29 9.37,3.75 1.43,2.54 6.51,-0.91 4.31,-2.89 -2.04,-3.39 -1.3,-7.79 -2.83,-11.46 -0.63,-3.07 -2.39,-5.95 -0.99,-9.1 1.17,-4.9 2.87,-9.76 4.04,-14.71 -3.37,-1.01 -2.07,-5.47 1.21,-4.71 3.99,0.42 3.65,-6.43 7.81,-6.05 5.25,-1.56 9.07,-6 14.16,-8.05 6.91,-2.81 13.62,-6.46 18.72,-12.05 2.58,-2.98 7.09,-3.95 8.69,-7.75 5,-2.22 9.8,-4.93 15.22,-6 -0.97,-2.64 0.52,-4.86 1.32,-7.22 0.39,-2.99 0.19,-6.07 1.18,-8.94 -3.15,-2.27 0.38,-4.91 1.38,-7.41 -0.2,-2.8 1.42,-6.25 0.09,-8.66 0.3,-2.93 -1.49,-5.14 -3.35,-7.29 -2.46,-2.64 -1.11,-6.91 -3.87,-9.52 -2.53,-4.57 -1.59,-10.19 -2.25,-15.22 0.02,-5 0.19,-10 -0.5,-14.97 -2.63,-2.31 -5.52,2.33 -7.52,-1.37 -3.1,-2.07 -7.66,-2.1 -9.73,-5.68 -2.31,-2.48 -3.82,2.84 -7.18,0.96 -1.91,-2.73 -3.59,0.03 -5.98,0.18 -2.27,-1.15 -6.07,-1.48 -6.09,1.76 -2.76,2.37 -5.95,-0.93 -8.94,-1.28 -3,1.38 -5.23,-3.83 -6.3,-1.87 -0.15,2.66 -2.52,5.1 -5.13,3.34 -3.23,-0.15 -4.91,-2.49 -6.57,-3.89 -2.95,-1.74 -4.3,2.32 -6.94,0.88 -1.48,-1.39 -1.87,-3.6 -3.92,-5.65 -3.06,-2.83 -5.03,3.17 -7.13,0.23 -2.05,-2.11 -5.57,-0.83 -7.94,-2.69 -3.56,0.59 -5.54,-0.24 -4.13,-4.11 -1.89,-1.85 -2.28,1.21 -4.77,-0.14 -0.59,-0.41 -3.45,1.78 -5,-1.11 -1.9,-1.9 -5.13,-3.22 -4.18,-6.45 0.03,-10.58 0.25,-21.15 1.66,-31.65 0.3,-2.99 0.6,-5.98 0.89,-8.98 -17.65,-0.63 -35.3,-1.27 -52.94,-2.22 -0.52,6.07 -1.04,12.15 -1.56,18.22z M466.53,518.63c-5.2,7.17 2.93,-3.27 0,0z",
            "name": "Texas"
        },
        "nm": {
            "path": "m242.72,428.78c4.82,0.63 9.65,1.25 14.47,1.88 0.43,-3.33 0.85,-6.67 1.28,-10 9.7,0.89 19.4,1.86 29.09,2.78 -0.9,-3.14 -1.39,-5.98 2.84,-4.5 18.29,1.28 36.48,3.79 54.81,4.49 2.45,-0.6 7.66,2.13 7.99,-1.01 3.06,-22.93 3.75,-46.09 5.59,-69.14 0.54,-7.79 1.39,-15.56 2.02,-23.34 3.21,0.65 1.17,-4.81 2.07,-6.86 1.79,-4.38 -2.87,-3.37 -5.73,-3.85 -32.35,-3.3 -64.71,-6.59 -97.06,-9.89 -5.79,39.81 -11.58,79.63 -17.38,119.44z",
            "name": "New Mexico"
        },
        "ks": {
            "path": "m380.53,320.34c25.06,1.17 50.11,2.71 75.19,3.35 17.22,0.07 34.44,0.63 51.66,0.18 -0.25,-12.69 0.23,-25.42 -0.47,-38.08 -0.61,-2.83 -0.17,-6.27 -1.38,-8.74 -3.04,-2.03 -6.02,-5.19 -6.68,-8.77 -0.43,-2.51 4.3,-4.59 1.29,-6.64 -3.02,0.54 -4.05,-3.34 -7.17,-2.43 -36.21,-0.82 -72.43,-1.33 -108.63,-2.5 -1.27,21.21 -2.54,42.42 -3.81,63.63z",
            "name": "Kansas"
        },
        "ne": {
            "path": "m353.38,230.59c10.76,0.96 21.27,2.72 32.03,3.66 -0.37,7.11 -0.71,14.23 -1.06,21.34 36.49,1.29 73,1.84 109.5,2.56 -0.31,-1.17 -3.13,-4.05 -4.03,-6.15 -1.99,-2.11 -0.36,-5.13 -2.45,-7.34 -2.42,-3.19 -1.66,-7.14 -2.2,-10.79 -1.66,-2.86 -1.45,-6.25 -2.29,-9.26 -2.94,-2.85 -2.34,-7.01 -3.95,-10.49 -1.13,-3.1 -2.18,-6.19 -2.62,-9.47 -3.51,1.32 -2.89,-3.07 -4.85,-4.29 -2.4,-1.68 -5.57,-1.85 -7.72,-3.93 -3.79,0.07 -7.65,1.04 -11.13,1.94 -2.52,-2.2 -6.03,-3.13 -7.91,-6.06 -13.61,0.96 -27.23,-0.49 -40.83,-1.11 -15.5,-1.05 -31.02,-1.79 -46.51,-2.86 -1.67,14.08 -2.83,28.17 -4,42.25z",
            "name": "Nebraska"
        },
        "sd": {
            "path": "m357.44,187.41c25.68,1.58 51.37,3.15 77.06,4.26 3.58,-0.01 7.34,-0.51 10.81,-0.23 1.8,2.9 5.24,3.85 7.69,6 3.55,-1.45 7.52,-1.89 11.25,-1.91 2.45,2.67 7.26,2.29 9.15,5.33 1.32,4.76 3.27,1.86 0.18,-1.15 -1.53,-2.17 1.46,-4.6 1.56,-6.99 1.2,-2.87 1.38,-5.28 -1.58,-6.75 -0.5,-2.04 -0.73,-6.65 2.41,-5.84 2.62,-0.28 0.39,-5.28 1.06,-7.5 -0.32,-9.7 0.19,-19.47 -0.64,-29.13 -0.24,-3.58 -6.26,-4.19 -5.42,-8.4 1.09,-1.22 5.81,-4.38 2.75,-5.4 -27.23,-0.89 -54.5,-1.01 -81.67,-3.15 -9.79,-0.62 -19.57,-1.24 -29.36,-1.86 -1.75,20.91 -3.5,41.81 -5.25,62.72z",
            "name": "South Dakota"
        },
        "nd": {
            "path": "m362.88,123.72c26.46,1.49 52.89,3.7 79.4,3.91 10.84,0.26 21.67,0.52 32.51,0.78 0.01,-5.53 -1.38,-10.82 -2.5,-16.17 -1.27,-7.42 -2.05,-14.89 -2.13,-22.42 -2.61,-4.16 -4.11,-9 -3.48,-13.94 -0.44,-3.25 0.67,-6.57 0.3,-9.7 -0.15,-4.01 -2.83,-4.61 -6.31,-4.12 -25.15,-0.47 -50.33,-1.05 -75.41,-3.06 -5.17,-0.49 -10.33,-0.98 -15.5,-1.47 -2.29,22.06 -4.58,44.13 -6.88,66.19z",
            "name": "North Dakota"
        },
        "wy": {
            "path": "m240.16,217.84c37.4,4.49 74.29,8.23 111.69,12.72 2.5,-29.2 5.5,-57.65 8,-86.84 -35.26,-4.45 -70.52,-8.9 -105.78,-13.34 -4.64,29.16 -9.27,58.31 -13.91,87.47z",
            "name": "Wyoming"
        },
        "mt": {
            "path": "m192.59,52.19c0.84,2.76 3.25,5.4 3.2,8.23 -1.5,2.79 -1,5.49 0.52,8.15 3.4,0.39 4.18,3.44 5.26,6.16 1.43,3.34 2.55,6.88 5.37,9.34 0.88,2.21 5.27,1.18 4.34,4.72 -2.23,6.21 -5.45,12.23 -7.06,18.56 0.02,3.34 3.4,5.25 5.73,2.22 1.61,-2.43 5.63,-3.04 4.69,0.97 -0.5,5.3 1.81,10.35 2.59,15.53 1.9,2 5.27,3.44 5.68,6.31 -0.71,1.91 -0.39,8.78 2.32,5.14 1.85,-1.89 4.93,-0.29 6.85,0.86 3.28,-1.63 7.26,-1.21 10.34,0.69 3.69,0.41 1.52,-5 5.95,-4.08 2.71,-0.42 2.01,6.69 3.21,4.1 0.56,-3.26 1.09,-6.54 1.68,-9.8 35.57,4.49 71.15,8.96 106.72,13.44 2.9,-28.44 5.79,-56.88 8.69,-85.31 -28.84,-2.29 -57.55,-5.91 -86.19,-9.99 -26.71,-4.12 -53.36,-8.71 -79.73,-14.68 -3.05,-0.61 -6.99,-2.59 -6.53,2.19 -1.21,5.75 -2.42,11.51 -3.62,17.26z",
            "name": "Montana"
        },
        "co": {
            "path": "m260.17,308.53c39.89,4.09 79.51,8.26 119.39,11.91 1.61,-28.46 3.23,-56.92 4.84,-85.38 -37.47,-4.17 -74.94,-8.33 -112.41,-12.5 -4.03,28.98 -7.8,56.99 -11.83,85.97z",
            "name": "Colorado"
        },
        "id": {
            "path": "m169.84,91.72c0.52,3.07 2.27,5.25 4.94,6.78 0.4,3.02 -0.61,5.46 -3.03,7.31 -2.3,2.7 -4.38,5.97 -6.09,8.83 0.39,2.93 -2.57,3.54 -4.23,4.8 -1.77,2.31 -4.28,4.3 -3.93,7.5 -0.64,2.43 4.69,0.57 4.09,4.34 -5.19,11.17 -6.78,23.51 -10.13,35.32 -0.79,3.16 -1.22,4.91 -2.01,8.08 56.92,12.84 62.26,13.45 93.58,19.41 2.75,-17.6 5.5,-35.21 8.25,-52.81 -2.66,-0.84 -0.58,-6.52 -4.23,-4.97 -1.24,1.7 -1.62,4.95 -5.17,3.47 -3.11,-1.99 -6.81,-1.34 -10.13,-0.56 -2.53,-1.76 -5.91,-2.01 -7.69,0.88 -1.75,-0.05 -3.29,-3.39 -2.79,-5.36 1.91,-3.98 -2.85,-5.89 -5.05,-8.27 -0.98,-5.88 -3.48,-11.64 -2.5,-17.69 -1.86,-0.01 -4.25,2.69 -6.47,3.63 -2.21,0.18 -4.52,-3.09 -4.1,-5.31 1.19,-5.37 4.07,-10.37 5.88,-15.6 1.95,-2.64 1.12,-5.57 -2.41,-5.62 -1.55,-3.37 -4.92,-5.66 -5.61,-9.53 -1.31,-2.63 -1.42,-6.47 -5.06,-6.76 -0.99,-1.85 -3.18,-4.47 -1.91,-6.73 2.09,-2.98 -0.34,-5.7 -1.53,-8.5 -2.13,-3.05 0.55,-6.68 0.67,-10.01 0.9,-4.35 1.8,-8.69 2.69,-13.04 -4.18,-0.78 -8.35,-1.56 -12.53,-2.34 -4.5,20.92 -9,41.83 -13.5,62.75z",
            "name": "Idaho"
        },
        "ut": {
            "path": "m176.34,297.78c27.57,3.92 55.15,7.83 82.72,11.75 4.04,-29.08 8.08,-58.17 12.13,-87.25 -10.83,-1.14 -21.65,-2.33 -32.47,-3.59 1.43,-7.93 2.82,-15.85 3.84,-23.84 -15.27,-2.85 -30.54,-5.71 -45.81,-8.56 -6.8,37.17 -13.6,74.33 -20.41,111.5z",
            "name": "Utah"
        },
        "az": {
            "path": "m173.19,314.66c-2.49,-0.06 -3.05,4.43 -6.38,2.94 -0.74,-2.87 -3.59,-2.82 -5.59,-4.22 -3.74,0.74 -2.37,4.58 -2.68,7.41 -0.52,5.04 -0.42,10.21 -0.89,15.22 -2.19,2.33 -2.44,5.78 -0.24,8.19 2.32,2.62 0.58,7.52 4.09,9.09 0.98,3.59 -2.89,4.83 -5.41,6.09 -3.29,2.46 -3.28,6.86 -3.88,10.47 -1.25,2.44 -4.81,2.39 -4.92,4.97 0.47,2.18 6.18,0.38 3.42,4.54 -0.65,2.75 -3.14,3.45 -5.62,3.78 -3.6,1.45 -2.69,4.7 0.77,5.44 14.69,7.84 28.52,17.13 43.01,25.32 5.79,3.19 11.27,7.21 17.27,9.88 11.71,2.83 23.75,3.45 35.68,4.87 5.71,-39.38 11.42,-78.75 17.13,-118.13 -27.58,-3.93 -55.17,-7.85 -82.75,-11.78 -1,5.31 -2,10.63 -3,15.94z",
            "name": "Arizona"
        },
        "nv": {
            "path": "m84.84,232.41c22.96,34.61 45.92,69.23 68.88,103.84 3.66,2.65 3.19,-3.47 3.27,-5.71 0.37,-5.43 0.36,-11.24 1.08,-16.44 2.05,-2.03 4.26,-2 6.08,-0.39 2.62,-0.16 3.86,5.9 6.03,1.27 2.74,-0.82 2.66,-3.64 3.13,-6.41 7.5,-40.87 15,-81.75 22.51,-122.62 -30.72,-6.81 -61.44,-13.63 -92.16,-20.44 -6.27,22.3 -12.54,44.6 -18.81,66.91z",
            "name": "Nevada"
        },
        "or": {
            "path": "M67.16,62.81C64.24,70.42 62.73,78.57 58.5,85.63c-2.86,8.53 -5.96,16.93 -10.17,24.89 -3.06,6.61 -8,12.31 -11.32,18.7 -1.03,6.5 -0.64,13.05 -0.36,19.6 37.23,8.7 74.46,16.69 111.69,25.39 3.45,-13.15 6.51,-25.75 10.19,-38.81 1.2,-2.48 3.15,-6.06 -1.1,-5.42 -2.58,-1.78 -0.23,-4.45 -0.38,-6.91 2.3,-2.82 4.36,-5.82 7.47,-7.75 1.75,-5.08 5.43,-9.19 9.03,-13.06 1.66,-3.48 -2.46,-3.92 -3.39,-6.47 -0.25,-3.79 -3.56,-4.26 -6.62,-4.99 -7.63,-2.2 -15.38,-4.2 -23.21,-5.54 -4.9,0.03 -9.79,0.06 -14.69,0.09 -0.95,-2.84 -4.67,1.86 -7.11,0.5 -2.61,0.82 -4.42,-2.63 -6.57,-1.28 -2.61,-0.06 -5.23,0.11 -7.15,-1.87 -3.09,-1.53 -6.33,-1.81 -9.5,-3.1 -1.87,3.03 -5.69,1.22 -8.53,1.31 -1.65,-1.64 -5.79,-3.02 -6.03,-4.81 1.1,-2.44 0.78,-5.93 0.53,-8.59 -0.42,-3.92 -4.72,-2.63 -6.25,-4.49C74.59,58.67 69.45,62.45 67.16,62.81z",
            "name": "Oregon"
        },
        "wa": {
            "path": "m101.38,8.72c0.05,2.75 2.93,5.39 3.25,8.16 -1.92,2.33 -1.78,5.19 -1.32,7.71 -1.81,2.64 1.63,4.82 0.67,7.42 -3.6,1.52 -2.43,-3.7 -4.86,-4.99 -3.34,-2.24 1.47,-3.87 1.17,-5.42 -2.5,-1.11 -2.24,3.88 -3.69,4.17C92.33,26.39 88.86,23.04 84.76,22.57 79.82,20.66 75.28,17.69 72.25,13.25c-3.13,-0.98 -1.96,4.97 -3.25,6.95 -0.63,2.8 2.59,5.06 1.41,8.21 0.52,3.86 -1.29,7.55 0.18,11.29 -1.06,2.88 4.75,5.54 2.94,6.39 -3.45,-1.05 -6.2,3.2 -2.25,4.34 1.57,0.97 -0.61,6.32 -3.3,5.43 -1.83,2.15 1.28,6.86 4.14,4.17 3.77,-1.55 2.75,3.51 5.83,3.13 2.81,-0.24 4.26,3.31 4.54,5.61 0.04,2.48 -0.15,6.02 -0.26,7.78 2.63,1.76 5.01,4.26 8.46,3.62 3.2,0.66 4.7,-3.26 7.97,-0.5 3.01,0.48 6.37,1.55 8.79,3.66 3.03,0.92 6.02,-1.78 8.19,1.05 3.44,1.3 6.67,0.03 9.84,-1.4 0.99,1.78 4.42,1.32 7,1.3 5.35,-0.19 10.68,-0.16 15.82,1.55 6.99,1.44 13.78,3.45 20.65,5.4 4.47,-20.85 8.94,-41.71 13.41,-62.56 -19.81,-3.93 -39.37,-9.21 -58.73,-14.66 -7.27,-1.53 -14.4,-3.52 -21.46,-5.87L101.75,8.45 101.38,8.72z M95.5,15.16C94.05,13.72 92.15,14.26 94.72,17.63 94.39,13.84 99.19,18.11 98.98,14.18 98.24,12.75 96.05,14.08 95.5,15.16z m2.31,1.91c-3.13,3.04 1.36,2.18 0.16,-0.25l-0.16,0.25z",
            "name": "Washington"
        },
        "ca": {
            "path": "m35.06,153.94c-0.1,4.04 0.4,8.21 -1.99,11.75 -1.86,3.68 -2.55,8.24 -6.48,10.38 -1.19,2.11 -3.49,3.38 -3.59,6.45 -1.94,3.49 2.49,5.65 2.91,8.98 1.54,3.39 2.34,6.94 1.63,10.65 0,2.92 -2.79,5.01 -2.24,8.14 0.05,2.97 -2.24,5.87 0.04,8.54 2.58,5 6.38,9.93 6.71,15.69 -0.54,2.77 -0.99,5.37 1.81,7.17 1.6,1.95 4.49,3.66 2.79,6.46 -1.73,3.87 -1.14,8.04 -1.09,12.16 1.68,2.67 2.83,6.76 6.66,6.53 1.48,2.33 0.97,4.84 -0.22,7.13 -2.5,1.53 -4.36,2.73 -3.66,6.08 0.27,3.49 4.27,5.34 4.36,9.01 1.46,6.2 4.13,11.92 7.59,17.25 0.71,2.57 2.16,4.34 2.9,6.41 -0.24,3.33 -1.93,6.49 -2.41,9.87 -1.66,2.61 1.19,5.52 3.99,5.12 4.03,0.15 7.27,3.31 11.01,4.04 3,-0.55 4.74,2.9 6.07,5.11 1.54,2.71 2.37,6 5.76,6.88 2.51,1.14 6.19,0.05 7.17,3.45 2.41,2.72 -2.39,5.05 1.41,5.17 2.73,1.87 5.56,-1.74 7.56,-0.74 2.13,2.06 4.05,4.2 4.93,7.05 4.3,4.9 1.44,11.77 2.79,17.52 14.73,1.94 29.44,4.72 44.27,5.38 2.78,1.19 6.19,-4.43 2.84,-4.65 -3.13,0.64 -2.83,-4.02 -1.36,-4.66 3.15,-0.88 4.92,-3.83 4.65,-7.04 0.47,-3.98 3.27,-7.43 7.22,-8.4 3.43,-2.04 -0.33,-3.58 -0.79,-5.79 -0.23,-3.65 -1.95,-6.81 -3.62,-9.89 2.02,-3.66 -2.22,-3.32 -3.16,-6.24 -22.6,-34.1 -45.2,-68.19 -67.81,-102.29 6.27,-22.44 12.54,-44.88 18.81,-67.31 -22.04,-5.16 -44.08,-10.31 -66.13,-15.47 -0.45,1.38 -0.9,2.75 -1.34,4.13z m24.13,184.72c-0.27,3.05 7.99,3.06 4.7,2.07 -1.63,-0.35 -3.17,-2.46 -4.7,-2.07z m-5.16,0.38c0.33,3.71 5.81,0.51 1.31,-0.04 -0.44,0.01 -0.88,0.02 -1.31,0.04z M79.69,357.5c-0.2,1.58 4.42,6 3.16,2.37C82.22,358.91 80.8,357.6 79.69,357.5z M77.75,369.13c-0.14,1.55 3.2,3.89 1.32,1.26C78.6,369.72 77.39,366.55 77.75,369.13z",
            "name": "California"
        }
    }
});

/*!
 * @author https://darkskyapp.github.io/skycons/

 * @link http://jqvmap.com
 * @license Unauthorized copying of this file, via any medium is strictly prohibited.
 * This file cannot be copied and/or distributed without express written consent from @author.
 * @builddate 2015/12/06
 */
!function (t) {
    "use strict";

    function n(t, n, i, e) {
        t.beginPath(), t.arc(n, i, e, 0, p, !1), t.fill()
    }

    function i(t, n, i, e, a) {
        t.beginPath(), t.moveTo(n, i), t.lineTo(e, a), t.stroke()
    }

    function e(t, i, e, a, o, r, l, s) {
        var h = Math.cos(i * p), c = Math.sin(i * p);
        s -= l, n(t, e - c * o, a + h * r + .5 * s, l + (1 - .5 * h) * s)
    }

    function a(t, n, i, a, o, r, l, s) {
        var h;
        for (h = 5; h--;) e(t, n + h / 5, i, a, o, r, l, s)
    }

    function o(t, n, i, e, o, r, l) {
        n /= 3e4;
        var s = .21 * o, h = .12 * o, c = .24 * o, u = .28 * o;
        t.fillStyle = l, a(t, n, i, e, s, h, c, u), t.globalCompositeOperation = "destination-out", a(t, n, i, e, s, h, c - r, u - r), t.globalCompositeOperation = "source-over"
    }

    function r(t, n, e, a, o, r, l) {
        n /= 12e4;
        var s, h, c, u, f = .25 * o - .5 * r, v = .32 * o + .5 * r, d = .5 * o - .5 * r;
        for (t.strokeStyle = l, t.lineWidth = r, t.lineCap = "round", t.lineJoin = "round", t.beginPath(), t.arc(e, a, f, 0, p, !1), t.stroke(), s = 8; s--;) h = (n + s / 8) * p, c = Math.cos(h), u = Math.sin(h), i(t, e + c * v, a + u * v, e + c * d, a + u * d)
    }

    function l(t, n, i, e, a, o, r) {
        n /= 15e3;
        var l = .29 * a - .5 * o, s = .05 * a, h = Math.cos(n * p), c = h * p / -16;
        t.strokeStyle = r, t.lineWidth = o, t.lineCap = "round", t.lineJoin = "round", i += h * s, t.beginPath(), t.arc(i, e, l, c + p / 8, c + 7 * p / 8, !1), t.arc(i + Math.cos(c) * l * C, e + Math.sin(c) * l * C, l, c + 5 * p / 8, c + 3 * p / 8, !0), t.closePath(), t.stroke()
    }

    function s(t, n, i, e, a, o, r) {
        n /= 1350;
        var l, s, h, c, u = .16 * a, f = 11 * p / 12, v = 7 * p / 12;
        for (t.fillStyle = r, l = 4; l--;) s = (n + l / 4) % 1, h = i + (l - 1.5) / 1.5 * (1 === l || 2 === l ? -1 : 1) * u, c = e + s * s * a, t.beginPath(), t.moveTo(h, c - 1.5 * o), t.arc(h, c, .75 * o, f, v, !1), t.fill()
    }

    function h(t, n, e, a, o, r, l) {
        n /= 750;
        var s, h, c, u, f = .1875 * o;
        for (t.strokeStyle = l, t.lineWidth = .5 * r, t.lineCap = "round", t.lineJoin = "round", s = 4; s--;) h = (n + s / 4) % 1, c = Math.floor(e + (s - 1.5) / 1.5 * (1 === s || 2 === s ? -1 : 1) * f) + .5, u = a + h * o, i(t, c, u - 1.5 * r, c, u + 1.5 * r)
    }

    function c(t, n, e, a, o, r, l) {
        n /= 3e3;
        var s, h, c, u, f = .16 * o, v = .75 * r, d = n * p * .7, m = Math.cos(d) * v, g = Math.sin(d) * v,
            M = d + p / 3, C = Math.cos(M) * v, w = Math.sin(M) * v, y = d + 2 * p / 3, b = Math.cos(y) * v,
            k = Math.sin(y) * v;
        for (t.strokeStyle = l, t.lineWidth = .5 * r, t.lineCap = "round", t.lineJoin = "round", s = 4; s--;) h = (n + s / 4) % 1, c = e + Math.sin((h + s / 4) * p) * f, u = a + h * o, i(t, c - m, u - g, c + m, u + g), i(t, c - C, u - w, c + C, u + w), i(t, c - b, u - k, c + b, u + k)
    }

    function u(t, n, i, e, o, r, l) {
        n /= 3e4;
        var s = .21 * o, h = .06 * o, c = .21 * o, u = .28 * o;
        t.fillStyle = l, a(t, n, i, e, s, h, c, u), t.globalCompositeOperation = "destination-out", a(t, n, i, e, s, h, c - r, u - r), t.globalCompositeOperation = "source-over"
    }

    function f(t, n, i, e, a, o, r) {
        var l = a / 8, s = l / 3, h = 2 * s, c = n % 1 * p, u = Math.cos(c), f = Math.sin(c);
        t.fillStyle = r, t.strokeStyle = r, t.lineWidth = o, t.lineCap = "round", t.lineJoin = "round", t.beginPath(), t.arc(i, e, l, c, c + Math.PI, !1), t.arc(i - s * u, e - s * f, h, c + Math.PI, c, !1), t.arc(i + h * u, e + h * f, s, c + Math.PI, c, !0), t.globalCompositeOperation = "destination-out", t.fill(), t.globalCompositeOperation = "source-over", t.stroke()
    }

    function v(t, n, i, e, a, o, r, l, s) {
        n /= 2500;
        var h, c, u, v, d = w[r], m = (n + r - y[r].start) % l, g = (n + r - y[r].end) % l, M = (n + r) % l;
        if (t.strokeStyle = s, t.lineWidth = o, t.lineCap = "round", t.lineJoin = "round", 1 > m) {
            if (t.beginPath(), m *= d.length / 2 - 1, h = Math.floor(m), m -= h, h *= 2, h += 2, t.moveTo(i + (d[h - 2] * (1 - m) + d[h] * m) * a, e + (d[h - 1] * (1 - m) + d[h + 1] * m) * a), 1 > g) {
                for (g *= d.length / 2 - 1, c = Math.floor(g), g -= c, c *= 2, c += 2, v = h; v !== c; v += 2) t.lineTo(i + d[v] * a, e + d[v + 1] * a);
                t.lineTo(i + (d[c - 2] * (1 - g) + d[c] * g) * a, e + (d[c - 1] * (1 - g) + d[c + 1] * g) * a)
            } else for (v = h; v !== d.length; v += 2) t.lineTo(i + d[v] * a, e + d[v + 1] * a);
            t.stroke()
        } else if (1 > g) {
            for (t.beginPath(), g *= d.length / 2 - 1, c = Math.floor(g), g -= c, c *= 2, c += 2, t.moveTo(i + d[0] * a, e + d[1] * a), v = 2; v !== c; v += 2) t.lineTo(i + d[v] * a, e + d[v + 1] * a);
            t.lineTo(i + (d[c - 2] * (1 - g) + d[c] * g) * a, e + (d[c - 1] * (1 - g) + d[c + 1] * g) * a), t.stroke()
        }
        1 > M && (M *= d.length / 2 - 1, u = Math.floor(M), M -= u, u *= 2, u += 2, f(t, n, i + (d[u - 2] * (1 - M) + d[u] * M) * a, e + (d[u - 1] * (1 - M) + d[u + 1] * M) * a, a, o, s))
    }

    var d, m;
    !function () {
        var n = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || t.msRequestAnimationFrame,
            i = t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || t.msCancelAnimationFrame;
        n && i ? (d = function (t, i) {
            function e() {
                a.value = n(e), t()
            }

            var a = {value: null};
            return e(), a
        }, m = function (t) {
            i(t.value)
        }) : (d = setInterval, m = clearInterval)
    }();
    var g = 500, M = .08, p = 2 * Math.PI, C = 2 / Math.sqrt(2),
        w = [[-.75, -.18, -.7219, -.1527, -.6971, -.1225, -.6739, -.091, -.6516, -.0588, -.6298, -.0262, -.6083, .0065, -.5868, .0396, -.5643, .0731, -.5372, .1041, -.5033, .1259, -.4662, .1406, -.4275, .1493, -.3881, .153, -.3487, .1526, -.3095, .1488, -.2708, .1421, -.2319, .1342, -.1943, .1217, -.16, .1025, -.129, .0785, -.1012, .0509, -.0764, .0206, -.0547, -.012, -.0378, -.0472, -.0324, -.0857, -.0389, -.1241, -.0546, -.1599, -.0814, -.1876, -.1193, -.1964, -.1582, -.1935, -.1931, -.1769, -.2157, -.1453, -.229, -.1085, -.2327, -.0697, -.224, -.0317, -.2064, .0033, -.1853, .0362, -.1613, .0672, -.135, .0961, -.1051, .1213, -.0706, .1397, -.0332, .1512, .0053, .158, .0442, .1624, .0833, .1636, .1224, .1615, .1613, .1565, .1999, .15, .2378, .1402, .2749, .1279, .3118, .1147, .3487, .1015, .3858, .0892, .4236, .0787, .4621, .0715, .5012, .0702, .5398, .0766, .5768, .089, .6123, .1055, .6466, .1244, .6805, .144, .7147, .163, .75, .18], [-.75, 0, -.7033, .0195, -.6569, .0399, -.6104, .06, -.5634, .0789, -.5155, .0954, -.4667, .1089, -.4174, .1206, -.3676, .1299, -.3174, .1365, -.2669, .1398, -.2162, .1391, -.1658, .1347, -.1157, .1271, -.0661, .1169, -.017, .1046, .0316, .0903, .0791, .0728, .1259, .0534, .1723, .0331, .2188, .0129, .2656, -.0064, .3122, -.0263, .3586, -.0466, .4052, -.0665, .4525, -.0847, .5007, -.1002, .5497, -.113, .5991, -.124, .6491, -.1325, .6994, -.138, .75, -.14]],
        y = [{start: .36, end: .11}, {start: .56, end: .16}], b = function (t) {
            this.list = [], this.interval = null, this.color = t && t.color ? t.color : "black", this.resizeClear = !(!t || !t.resizeClear)
        };
    b.CLEAR_DAY = function (t, n, i) {
        var e = t.canvas.width, a = t.canvas.height, o = Math.min(e, a);
        r(t, n, .5 * e, .5 * a, o, o * M, i)
    }, b.CLEAR_NIGHT = function (t, n, i) {
        var e = t.canvas.width, a = t.canvas.height, o = Math.min(e, a);
        l(t, n, .5 * e, .5 * a, o, o * M, i)
    }, b.PARTLY_CLOUDY_DAY = function (t, n, i) {
        var e = t.canvas.width, a = t.canvas.height, l = Math.min(e, a);
        r(t, n, .625 * e, .375 * a, .75 * l, l * M, i), o(t, n, .375 * e, .625 * a, .75 * l, l * M, i)
    }, b.PARTLY_CLOUDY_NIGHT = function (t, n, i) {
        var e = t.canvas.width, a = t.canvas.height, r = Math.min(e, a);
        l(t, n, .667 * e, .375 * a, .75 * r, r * M, i), o(t, n, .375 * e, .625 * a, .75 * r, r * M, i)
    }, b.CLOUDY = function (t, n, i) {
        var e = t.canvas.width, a = t.canvas.height, r = Math.min(e, a);
        o(t, n, .5 * e, .5 * a, r, r * M, i)
    }, b.RAIN = function (t, n, i) {
        var e = t.canvas.width, a = t.canvas.height, r = Math.min(e, a);
        s(t, n, .5 * e, .37 * a, .9 * r, r * M, i), o(t, n, .5 * e, .37 * a, .9 * r, r * M, i)
    }, b.SLEET = function (t, n, i) {
        var e = t.canvas.width, a = t.canvas.height, r = Math.min(e, a);
        h(t, n, .5 * e, .37 * a, .9 * r, r * M, i), o(t, n, .5 * e, .37 * a, .9 * r, r * M, i)
    }, b.SNOW = function (t, n, i) {
        var e = t.canvas.width, a = t.canvas.height, r = Math.min(e, a);
        c(t, n, .5 * e, .37 * a, .9 * r, r * M, i), o(t, n, .5 * e, .37 * a, .9 * r, r * M, i)
    }, b.WIND = function (t, n, i) {
        var e = t.canvas.width, a = t.canvas.height, o = Math.min(e, a);
        v(t, n, .5 * e, .5 * a, o, o * M, 0, 2, i), v(t, n, .5 * e, .5 * a, o, o * M, 1, 2, i)
    }, b.FOG = function (t, n, e) {
        var a = t.canvas.width, o = t.canvas.height, r = Math.min(a, o), l = r * M;
        u(t, n, .5 * a, .32 * o, .75 * r, l, e), n /= 5e3;
        var s = Math.cos(n * p) * r * .02, h = Math.cos((n + .25) * p) * r * .02, c = Math.cos((n + .5) * p) * r * .02,
            f = Math.cos((n + .75) * p) * r * .02, v = .936 * o, d = Math.floor(v - .5 * l) + .5,
            m = Math.floor(v - 2.5 * l) + .5;
        t.strokeStyle = e, t.lineWidth = l, t.lineCap = "round", t.lineJoin = "round", i(t, s + .2 * a + .5 * l, d, h + .8 * a - .5 * l, d), i(t, c + .2 * a + .5 * l, m, f + .8 * a - .5 * l, m)
    }, b.prototype = {
        _determineDrawingFunction: function (t) {
            return "string" == typeof t && (t = b[t.toUpperCase().replace(/-/g, "_")] || null), t
        }, add: function (t, n) {
            var i;
            "string" == typeof t && (t = document.getElementById(t)), null !== t && (n = this._determineDrawingFunction(n), "function" == typeof n && (i = {
                element: t,
                context: t.getContext("2d"),
                drawing: n
            }, this.list.push(i), this.draw(i, g)))
        }, set: function (t, n) {
            var i;
            for ("string" == typeof t && (t = document.getElementById(t)), i = this.list.length; i--;) if (this.list[i].element === t) return this.list[i].drawing = this._determineDrawingFunction(n), void this.draw(this.list[i], g);
            this.add(t, n)
        }, remove: function (t) {
            var n;
            for ("string" == typeof t && (t = document.getElementById(t)), n = this.list.length; n--;) if (this.list[n].element === t) return void this.list.splice(n, 1)
        }, draw: function (t, n) {
            var i = t.context.canvas;
            this.resizeClear ? i.width = i.width : t.context.clearRect(0, 0, i.width, i.height), t.drawing(t.context, n, this.color)
        }, play: function () {
            var t = this;
            this.pause(), this.interval = d(function () {
                var n, i = Date.now();
                for (n = t.list.length; n--;) t.draw(t.list[n], i)
            }, 1e3 / 60)
        }, pause: function () {
            this.interval && (m(this.interval), this.interval = null)
        }
    }, t.Skycons = b
}(this);


/*!
 * jCider v3.0.6 (http://pratinav.tk/jCider)
 * (c) 2015 Pratinav Bagla (http://pratinav.tk)
 * Released under the MIT License (https://github.com/Pratinav/jCider/blob/master/LICENSE.txt)
 **/
!function ($) {
    function n(n, i) {
        void 0 === i && (i = "");
        for (var t = "", e = "", o = "", a = "tag", r = 0; r < n.length; r++) {
            var s = n[r];
            "." !== s ? "#" !== s ? "tag" === a ? t += s : "class" === a ? e += s : "id" === a && (o += s) : a = "id" : (e += r > 1 ? " " : "", a = "class")
        }
        return el = "<" + t, "" !== o && (el += ' id="' + o + '"'), "" !== e && (el += ' class="' + e + '"'), el += ">" + i + "</" + t + ">", el
    }

    function i() {
        var n = window.navigator.userAgent, i = n.indexOf("MSIE ");
        parseInt(n.substring(i + 5, n.indexOf(".", i)));
        return i > 0 || navigator.userAgent.match(/Trident.*rv\:11\./) ? !0 : !1
    }

    function t() {
        if (!window.getComputedStyle) return !1;
        var n, i = document.createElement("p"), t = [], e = {
            webkitTransform: "-webkit-transform",
            OTransform: "-o-transform",
            msTransform: "-ms-transform",
            MozTransform: "-moz-transform",
            transform: "transform"
        };
        document.body.insertBefore(i, null);
        for (var o in e) void 0 !== i.style[o] && (t.push(), i.style[o] = "translate3d(1px,1px,1px)", n = window.getComputedStyle(i).getPropertyValue(e[o]));
        return document.body.removeChild(i), void 0 !== n && n.length > 0 && "none" !== n ? "3d" : t.length > 0 ? "2d" : !1
    }

    $.fn.jcider = function (e) {
        var o = $.extend({
            looping: !0,
            visibleSlides: 1,
            variableWidth: !1,
            variableHeight: !0,
            fading: !1,
            easing: "cubic-bezier(.694, .0482, .335, 1)",
            transitionDuration: 400,
            autoplay: !1,
            slideDuration: 3e3,
            controls: !0,
            controlsWrapper: "div.jcider-nav",
            controlsLeft: ["span.jcider-nav-left", ""],
            controlsRight: ["span.jcider-nav-right", ""],
            pagination: !0,
            paginationWrapper: "div.jcider-pagination",
            paginationPoint: "div.jcider-pagination-point"
        }, e);
        return this.each(function () {
            function e() {
                if (!o.fading) {
                    var n = 0;
                    A = [];
                    for (var i = 0; E > i; i++) A[i] = -n, M.eq(i).css("left", n), n += M.eq(i).outerWidth(!0)
                }
            }

            function a() {
                var i = o.controlsWrapper.split("");
                O.append(n(i)), $controlsWrapper = O.find(o.controlsWrapper), $controlsWrapper.append(n(o.controlsLeft[0].split(""), o.controlsLeft[1])), $controlsWrapper.append(n(o.controlsRight[0].split(""), o.controlsRight[1])), j = $controlsWrapper.find(o.controlsLeft[0]), C = $controlsWrapper.find(o.controlsRight[0]), o.pagination !== !0 && $controlsWrapper.hide()
            }

            function r() {
                var i = n(o.paginationWrapper.split(""));
                O.append(i), S = O.find(o.paginationWrapper);
                for (var t = n(o.paginationPoint.split("")), e = 0; e < Math.ceil(E / o.visibleSlides); e++) S.append(t);
                k = S.children(o.paginationPoint), o.pagination !== !0 && S.hide()
            }

            function s(n) {
                "3d" === R ? L.css({
                    "-webkit-transform": "translate3d(" + n + "px,0, 0)",
                    "-moz-transform": "translate3d(" + n + "px,0, 0)",
                    transform: "translate3d(" + n + "px,0, 0)"
                }) : "2d" === R ? L.css({
                    "-webkit-transform": "translate(" + n + "px,0)",
                    "-moz-transform": "translate(" + n + "px,0)",
                    "-ms-transform": "translate(" + n + "px,0)",
                    "-o-transform": "translate(" + n + "px,0)",
                    transform: "translate(" + n + "px,0)"
                }) : L.css({left: n + "px"})
            }

            function l(n) {
                var i = 0 > n, t = n + o.visibleSlides === E + 1;
                if (!o.looping) {
                    if (i || t) return;
                    j.hasClass("disabled") && j.removeClass("disabled"), C.hasClass("disabled") && C.removeClass("disabled"), 0 === n ? j.addClass("disabled") : n + o.visibleSlides > E && C.addClass("disabled")
                }
                var e;
                if (X) {
                    if (e = M.filter(".active"), e.index() === n) return;
                    e.removeClass("active"), o.pagination && k.filter(".active").removeClass("active")
                }
                if (t ? n = 0 : (i || n + o.visibleSlides > E) && (n = E - o.visibleSlides), P = M.eq(n), 1 === o.visibleSlides && (o.variableHeight && (T = P.height(), O.css({height: T + "px"})), o.variableWidth && (D = P.width(), O.css({width: D + "px"}))), o.pagination) {
                    var a = Math.floor(n / o.visibleSlides);
                    n === E - o.visibleSlides && (a = Math.floor((E - 1) / o.visibleSlides)), k.eq(a).addClass("active")
                }
                P.addClass("active"), o.fading ? (X && e.fadeOut(o.transitionDuration), P.fadeIn(o.transitionDuration)) : (nextOffset = A[n], s(nextOffset)), X || (X = !0)
            }

            function c() {
                l(P.index() + 1)
            }

            function d() {
                l(P.index() - 1)
            }

            function p() {
                return o.autoplay || (o.autoplay = !0), I ? void(I = !1) : void setTimeout(function () {
                    c(), p()
                }, o.slideDuration)
            }

            function f() {
                o.autoplay && (o.autoplay = !1), I || (I = !0)
            }

            function u() {
                I ? (I = !1, p()) : f()
            }

            function v() {
                o.controls && (o.controls = !1), "none" !== $controlsWrapper.css("display") && $controlsWrapper.hide()
            }

            function g() {
                o.controls || (o.controls = !0), "none" === $controlsWrapper.css("display") && $controlsWrapper.show()
            }

            function h() {
                o.controls ? o.controls = !1 : o.controls = !0, "none" !== $controlsWrapper.css("display") ? $controlsWrapper.hide() : $controlsWrapper.show()
            }

            function m() {
                o.pagination && (o.pagination = !1), "none" !== S.css("display") && S.hide()
            }

            function b() {
                o.pagination || (o.pagination = !0), "none" === S.css("display") && S.show()
            }

            function y() {
                o.pagination ? o.pagination = !1 : o.pagination = !0, "none" !== S.css("display") ? S.hide() : S.show()
            }

            function w() {
                k.on("click", function (n) {
                    n.stopPropagation();
                    var i = $(this).index() * o.visibleSlides;
                    return l(i), !1
                }), j.on("click", function (n) {
                    return n.stopPropagation(), d(), !1
                }), C.on("click", function (n) {
                    return n.stopPropagation(), c(), !1
                })
            }

            function x() {
                if (O.css({
                    position: "relative",
                    overflow: "hidden",
                    transition: "all " + o.transitionDuration + "ms ease-out"
                }), L.css({height: "100%", width: "100%"}), M.css({
                    position: "absolute",
                    left: "0"
                }), o.fading ? (L.css({width: "100%"}), M.not(0).fadeOut()) : (L.css({
                    transition: "all " + o.transitionDuration + "ms " + o.easing,
                    left: "0",
                    cursor: "move"
                }), "3d" === R && L.css({
                    "-webkit-backface-visibility": "hidden",
                    "-moz-backface-visibility": "hidden",
                    "-ms-backface-visibility": "hidden",
                    "backface-visibility": "hidden",
                    "-webkit-perspective": "1000",
                    "-moz-perspective": "1000",
                    "-ms-perspective": "1000",
                    perspective: "1000"
                })), a(), r(), w(), e(), void 0 !== P) {
                    var n = P.index();
                    l(0), l(n)
                } else l(0);
                o.autoplay && p(), O.load(function () {
                    e()
                })
            }

            function W(n) {
                if (void 0 !== n) for (var i in n) o.hasOwnProperty(i) && (o[i] = n[i]);
                $controlsWrapper.remove(), S.remove(), x()
            }

            var j, C, S, k, P, D, T, z = $(window), O = $(this), L = O.children(), M = L.children(), E = M.length,
                X = !1, R = t(), q = i(), I = !1, A = [];
            x();
            var H = !1, Y = !1, B = 0, Q = 0, V = 0, F = 0;
            O.on({
                mousedown: function (n) {
                    H = !0, B = q ? event.clientX + document.body.scrollLeft : n.pageX
                }, mouseup: function (n) {
                    if (H = !1, Y) {
                        Y = !1;
                        var i = 10;
                        B > Q + i ? c() : Q + i > B && d()
                    }
                }, mousemove: function (n) {
                    H && (Y = !0, Q = q ? event.clientX + document.body.scrollLeft : n.pageX)
                }, touchstart: function (n) {
                    V = n.originalEvent.touches[0].clientY, F = n.originalEvent.touches[0].clientX
                }, touchend: function (n) {
                    var i = n.originalEvent.changedTouches[0].clientY, t = n.originalEvent.changedTouches[0].clientX,
                        e = V - i, o = F - t;
                    Math.abs(o) > Math.abs(e) && (o > 5 ? c() : d()), V = null, F = null
                }, touchmove: function (n) {
                    n.preventDefault && n.preventDefault()
                }
            }), z.resize(function () {
                o.fading || (e(), l(P.index()))
            }), $.fn.jcider.reset = W, $.fn.jcider.moveTo = l, $.fn.jcider.moveRight = c, $.fn.jcider.moveLeft = d, $.fn.jcider.play = p, $.fn.jcider.pause = f, $.fn.jcider.togglePlay = u, $.fn.jcider.hidePagination = m, $.fn.jcider.showPagination = b, $.fn.jcider.togglePagination = y, $.fn.jcider.hideControls = v, $.fn.jcider.showControls = g, $.fn.jcider.toggleControls = h
        })
    }
}(jQuery);


/*!
 * Rickshaw Charts
 * Released under the MIT License
 **/
var Rickshaw = {
    namespace: function (namespace, obj) {
        var parts = namespace.split(".");
        var parent = Rickshaw;
        for (var i = 1, length = parts.length; i < length; i++) {
            var currentPart = parts[i];
            parent[currentPart] = parent[currentPart] || {};
            parent = parent[currentPart]
        }
        return parent
    }, keys: function (obj) {
        var keys = [];
        for (var key in obj) keys.push(key);
        return keys
    }, extend: function (destination, source) {
        for (var property in source) {
            destination[property] = source[property]
        }
        return destination
    }, clone: function (obj) {
        return JSON.parse(JSON.stringify(obj))
    }
};
if (typeof module !== "undefined" && module.exports) {
    var d3 = require("d3");
    module.exports = Rickshaw
}
(function (globalContext) {
    var _toString = Object.prototype.toString, NULL_TYPE = "Null", UNDEFINED_TYPE = "Undefined",
        BOOLEAN_TYPE = "Boolean", NUMBER_TYPE = "Number", STRING_TYPE = "String", OBJECT_TYPE = "Object",
        FUNCTION_CLASS = "[object Function]";

    function isFunction(object) {
        return _toString.call(object) === FUNCTION_CLASS
    }

    function extend(destination, source) {
        for (var property in source) if (source.hasOwnProperty(property)) destination[property] = source[property];
        return destination
    }

    function keys(object) {
        if (Type(object) !== OBJECT_TYPE) {
            throw new TypeError
        }
        var results = [];
        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                results.push(property)
            }
        }
        return results
    }

    function Type(o) {
        switch (o) {
            case null:
                return NULL_TYPE;
            case void 0:
                return UNDEFINED_TYPE
        }
        var type = typeof o;
        switch (type) {
            case"boolean":
                return BOOLEAN_TYPE;
            case"number":
                return NUMBER_TYPE;
            case"string":
                return STRING_TYPE
        }
        return OBJECT_TYPE
    }

    function isUndefined(object) {
        return typeof object === "undefined"
    }

    var slice = Array.prototype.slice;

    function argumentNames(fn) {
        var names = fn.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, "").replace(/\s+/g, "").split(",");
        return names.length == 1 && !names[0] ? [] : names
    }

    function wrap(fn, wrapper) {
        var __method = fn;
        return function () {
            var a = update([bind(__method, this)], arguments);
            return wrapper.apply(this, a)
        }
    }

    function update(array, args) {
        var arrayLength = array.length, length = args.length;
        while (length--) array[arrayLength + length] = args[length];
        return array
    }

    function merge(array, args) {
        array = slice.call(array, 0);
        return update(array, args)
    }

    function bind(fn, context) {
        if (arguments.length < 2 && isUndefined(arguments[0])) return this;
        var __method = fn, args = slice.call(arguments, 2);
        return function () {
            var a = merge(args, arguments);
            return __method.apply(context, a)
        }
    }

    var emptyFunction = function () {
    };
    var Class = function () {
        var IS_DONTENUM_BUGGY = function () {
            for (var p in{toString: 1}) {
                if (p === "toString") return false
            }
            return true
        }();

        function subclass() {
        }

        function create() {
            var parent = null, properties = [].slice.apply(arguments);
            if (isFunction(properties[0])) parent = properties.shift();

            function klass() {
                this.initialize.apply(this, arguments)
            }

            extend(klass, Class.Methods);
            klass.superclass = parent;
            klass.subclasses = [];
            if (parent) {
                subclass.prototype = parent.prototype;
                klass.prototype = new subclass;
                try {
                    parent.subclasses.push(klass)
                } catch (e) {
                }
            }
            for (var i = 0, length = properties.length; i < length; i++) klass.addMethods(properties[i]);
            if (!klass.prototype.initialize) klass.prototype.initialize = emptyFunction;
            klass.prototype.constructor = klass;
            return klass
        }

        function addMethods(source) {
            var ancestor = this.superclass && this.superclass.prototype, properties = keys(source);
            if (IS_DONTENUM_BUGGY) {
                if (source.toString != Object.prototype.toString) properties.push("toString");
                if (source.valueOf != Object.prototype.valueOf) properties.push("valueOf")
            }
            for (var i = 0, length = properties.length; i < length; i++) {
                var property = properties[i], value = source[property];
                if (ancestor && isFunction(value) && argumentNames(value)[0] == "$super") {
                    var method = value;
                    value = wrap(function (m) {
                        return function () {
                            return ancestor[m].apply(this, arguments)
                        }
                    }(property), method);
                    value.valueOf = bind(method.valueOf, method);
                    value.toString = bind(method.toString, method)
                }
                this.prototype[property] = value
            }
            return this
        }

        return {create: create, Methods: {addMethods: addMethods}}
    }();
    if (globalContext.exports) {
        globalContext.exports.Class = Class
    } else {
        globalContext.Class = Class
    }
})(Rickshaw);
Rickshaw.namespace("Rickshaw.Compat.ClassList");
Rickshaw.Compat.ClassList = function () {
    if (typeof document !== "undefined" && !("classList" in document.createElement("a"))) {
        (function (view) {
            "use strict";
            var classListProp = "classList", protoProp = "prototype",
                elemCtrProto = (view.HTMLElement || view.Element)[protoProp], objCtr = Object,
                strTrim = String[protoProp].trim || function () {
                    return this.replace(/^\s+|\s+$/g, "")
                }, arrIndexOf = Array[protoProp].indexOf || function (item) {
                    var i = 0, len = this.length;
                    for (; i < len; i++) {
                        if (i in this && this[i] === item) {
                            return i
                        }
                    }
                    return -1
                }, DOMEx = function (type, message) {
                    this.name = type;
                    this.code = DOMException[type];
                    this.message = message
                }, checkTokenAndGetIndex = function (classList, token) {
                    if (token === "") {
                        throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified")
                    }
                    if (/\s/.test(token)) {
                        throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character")
                    }
                    return arrIndexOf.call(classList, token)
                }, ClassList = function (elem) {
                    var trimmedClasses = strTrim.call(elem.className),
                        classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [], i = 0, len = classes.length;
                    for (; i < len; i++) {
                        this.push(classes[i])
                    }
                    this._updateClassName = function () {
                        elem.className = this.toString()
                    }
                }, classListProto = ClassList[protoProp] = [], classListGetter = function () {
                    return new ClassList(this)
                };
            DOMEx[protoProp] = Error[protoProp];
            classListProto.item = function (i) {
                return this[i] || null
            };
            classListProto.contains = function (token) {
                token += "";
                return checkTokenAndGetIndex(this, token) !== -1
            };
            classListProto.add = function (token) {
                token += "";
                if (checkTokenAndGetIndex(this, token) === -1) {
                    this.push(token);
                    this._updateClassName()
                }
            };
            classListProto.remove = function (token) {
                token += "";
                var index = checkTokenAndGetIndex(this, token);
                if (index !== -1) {
                    this.splice(index, 1);
                    this._updateClassName()
                }
            };
            classListProto.toggle = function (token) {
                token += "";
                if (checkTokenAndGetIndex(this, token) === -1) {
                    this.add(token)
                } else {
                    this.remove(token)
                }
            };
            classListProto.toString = function () {
                return this.join(" ")
            };
            if (objCtr.defineProperty) {
                var classListPropDesc = {get: classListGetter, enumerable: true, configurable: true};
                try {
                    objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc)
                } catch (ex) {
                    if (ex.number === -2146823252) {
                        classListPropDesc.enumerable = false;
                        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc)
                    }
                }
            } else if (objCtr[protoProp].__defineGetter__) {
                elemCtrProto.__defineGetter__(classListProp, classListGetter)
            }
        })(window)
    }
};
if (typeof RICKSHAW_NO_COMPAT !== "undefined" && !RICKSHAW_NO_COMPAT || typeof RICKSHAW_NO_COMPAT === "undefined") {
    new Rickshaw.Compat.ClassList
}
Rickshaw.namespace("Rickshaw.Graph");
Rickshaw.Graph = function (args) {
    var self = this;
    this.initialize = function (args) {
        if (!args.element) throw"Rickshaw.Graph needs a reference to an element";
        if (args.element.nodeType !== 1) throw"Rickshaw.Graph element was defined but not an HTML element";
        this.element = args.element;
        this.series = args.series;
        this.window = {};
        this.updateCallbacks = [];
        this.configureCallbacks = [];
        this.defaults = {
            interpolation: "cardinal",
            offset: "zero",
            min: undefined,
            max: undefined,
            preserve: false,
            xScale: undefined,
            yScale: undefined
        };
        this._loadRenderers();
        this.configure(args);
        this.validateSeries(args.series);
        this.series.active = function () {
            return self.series.filter(function (s) {
                return !s.disabled
            })
        };
        this.setSize({width: args.width, height: args.height});
        this.element.classList.add("rickshaw_graph");
        this.vis = d3.select(this.element).append("svg:svg").attr("width", this.width).attr("height", this.height);
        this.discoverRange()
    };
    this._loadRenderers = function () {
        for (var name in Rickshaw.Graph.Renderer) {
            if (!name || !Rickshaw.Graph.Renderer.hasOwnProperty(name)) continue;
            var r = Rickshaw.Graph.Renderer[name];
            if (!r || !r.prototype || !r.prototype.render) continue;
            self.registerRenderer(new r({graph: self}))
        }
    };
    this.validateSeries = function (series) {
        if (!Array.isArray(series) && !(series instanceof Rickshaw.Series)) {
            var seriesSignature = Object.prototype.toString.apply(series);
            throw"series is not an array: " + seriesSignature
        }
        var pointsCount;
        series.forEach(function (s) {
            if (!(s instanceof Object)) {
                throw"series element is not an object: " + s
            }
            if (!s.data) {
                throw"series has no data: " + JSON.stringify(s)
            }
            if (!Array.isArray(s.data)) {
                throw"series data is not an array: " + JSON.stringify(s.data)
            }
            var x = s.data[0].x;
            var y = s.data[0].y;
            if (typeof x != "number" || typeof y != "number" && y !== null) {
                throw"x and y properties of points should be numbers instead of " + typeof x + " and " + typeof y
            }
            if (s.data.length >= 3) {
                if (s.data[2].x < s.data[1].x || s.data[1].x < s.data[0].x || s.data[s.data.length - 1].x < s.data[0].x) {
                    throw"series data needs to be sorted on x values for series name: " + s.name
                }
            }
        }, this)
    };
    this.dataDomain = function () {
        var data = this.series.map(function (s) {
            return s.data
        });
        var min = d3.min(data.map(function (d) {
            return d[0].x
        }));
        var max = d3.max(data.map(function (d) {
            return d[d.length - 1].x
        }));
        return [min, max]
    };
    this.discoverRange = function () {
        var domain = this.renderer.domain();
        this.x = (this.xScale || d3.scale.linear()).domain(domain.x).range([0, this.width]);
        this.y = (this.yScale || d3.scale.linear()).domain(domain.y).range([this.height, 0]);
        this.y.magnitude = d3.scale.linear().domain([domain.y[0] - domain.y[0], domain.y[1] - domain.y[0]]).range([0, this.height])
    };
    this.render = function () {
        var stackedData = this.stackData();
        this.discoverRange();
        this.renderer.render();
        this.updateCallbacks.forEach(function (callback) {
            callback()
        })
    };
    this.update = this.render;
    this.stackData = function () {
        var data = this.series.active().map(function (d) {
            return d.data
        }).map(function (d) {
            return d.filter(function (d) {
                return this._slice(d)
            }, this)
        }, this);
        var preserve = this.preserve;
        if (!preserve) {
            this.series.forEach(function (series) {
                if (series.scale) {
                    preserve = true
                }
            })
        }
        data = preserve ? Rickshaw.clone(data) : data;
        this.series.active().forEach(function (series, index) {
            if (series.scale) {
                var seriesData = data[index];
                if (seriesData) {
                    seriesData.forEach(function (d) {
                        d.y = series.scale(d.y)
                    })
                }
            }
        });
        this.stackData.hooks.data.forEach(function (entry) {
            data = entry.f.apply(self, [data])
        });
        var stackedData;
        if (!this.renderer.unstack) {
            this._validateStackable();
            var layout = d3.layout.stack();
            layout.offset(self.offset);
            stackedData = layout(data)
        }
        stackedData = stackedData || data;
        if (this.renderer.unstack) {
            stackedData.forEach(function (seriesData) {
                seriesData.forEach(function (d) {
                    d.y0 = d.y0 === undefined ? 0 : d.y0
                })
            })
        }
        this.stackData.hooks.after.forEach(function (entry) {
            stackedData = entry.f.apply(self, [data])
        });
        var i = 0;
        this.series.forEach(function (series) {
            if (series.disabled) return;
            series.stack = stackedData[i++]
        });
        this.stackedData = stackedData;
        return stackedData
    };
    this._validateStackable = function () {
        var series = this.series;
        var pointsCount;
        series.forEach(function (s) {
            pointsCount = pointsCount || s.data.length;
            if (pointsCount && s.data.length != pointsCount) {
                throw"stacked series cannot have differing numbers of points: " + pointsCount + " vs " + s.data.length + "; see Rickshaw.Series.fill()"
            }
        }, this)
    };
    this.stackData.hooks = {data: [], after: []};
    this._slice = function (d) {
        if (this.window.xMin || this.window.xMax) {
            var isInRange = true;
            if (this.window.xMin && d.x < this.window.xMin) isInRange = false;
            if (this.window.xMax && d.x > this.window.xMax) isInRange = false;
            return isInRange
        }
        return true
    };
    this.onUpdate = function (callback) {
        this.updateCallbacks.push(callback)
    };
    this.onConfigure = function (callback) {
        this.configureCallbacks.push(callback)
    };
    this.registerRenderer = function (renderer) {
        this._renderers = this._renderers || {};
        this._renderers[renderer.name] = renderer
    };
    this.configure = function (args) {
        this.config = this.config || {};
        if (args.width || args.height) {
            this.setSize(args)
        }
        Rickshaw.keys(this.defaults).forEach(function (k) {
            this.config[k] = k in args ? args[k] : k in this ? this[k] : this.defaults[k]
        }, this);
        Rickshaw.keys(this.config).forEach(function (k) {
            this[k] = this.config[k]
        }, this);
        var renderer = args.renderer || this.renderer && this.renderer.name || "stack";
        this.setRenderer(renderer, args);
        this.configureCallbacks.forEach(function (callback) {
            callback(args)
        })
    };
    this.setRenderer = function (r, args) {
        if (typeof r == "function") {
            this.renderer = new r({graph: self});
            this.registerRenderer(this.renderer)
        } else {
            if (!this._renderers[r]) {
                throw"couldn't find renderer " + r
            }
            this.renderer = this._renderers[r]
        }
        if (typeof args == "object") {
            this.renderer.configure(args)
        }
    };
    this.setSize = function (args) {
        args = args || {};
        if (typeof window !== undefined) {
            var style = window.getComputedStyle(this.element, null);
            var elementWidth = parseInt(style.getPropertyValue("width"), 10);
            var elementHeight = parseInt(style.getPropertyValue("height"), 10)
        }
        this.width = args.width || elementWidth || 400;
        this.height = args.height || elementHeight || 250;
        this.vis && this.vis.attr("width", this.width).attr("height", this.height)
    };
    this.initialize(args)
};
Rickshaw.namespace("Rickshaw.Fixtures.Color");
Rickshaw.Fixtures.Color = function () {
    this.schemes = {};
    this.schemes.spectrum14 = ["#ecb796", "#dc8f70", "#b2a470", "#92875a", "#716c49", "#d2ed82", "#bbe468", "#a1d05d", "#e7cbe6", "#d8aad6", "#a888c2", "#9dc2d3", "#649eb9", "#387aa3"].reverse();
    this.schemes.spectrum2000 = ["#57306f", "#514c76", "#646583", "#738394", "#6b9c7d", "#84b665", "#a7ca50", "#bfe746", "#e2f528", "#fff726", "#ecdd00", "#d4b11d", "#de8800", "#de4800", "#c91515", "#9a0000", "#7b0429", "#580839", "#31082b"];
    this.schemes.spectrum2001 = ["#2f243f", "#3c2c55", "#4a3768", "#565270", "#6b6b7c", "#72957f", "#86ad6e", "#a1bc5e", "#b8d954", "#d3e04e", "#ccad2a", "#cc8412", "#c1521d", "#ad3821", "#8a1010", "#681717", "#531e1e", "#3d1818", "#320a1b"];
    this.schemes.classic9 = ["#423d4f", "#4a6860", "#848f39", "#a2b73c", "#ddcb53", "#c5a32f", "#7d5836", "#963b20", "#7c2626", "#491d37", "#2f254a"].reverse();
    this.schemes.httpStatus = {
        503: "#ea5029",
        502: "#d23f14",
        500: "#bf3613",
        410: "#efacea",
        409: "#e291dc",
        403: "#f457e8",
        408: "#e121d2",
        401: "#b92dae",
        405: "#f47ceb",
        404: "#a82a9f",
        400: "#b263c6",
        301: "#6fa024",
        302: "#87c32b",
        307: "#a0d84c",
        304: "#28b55c",
        200: "#1a4f74",
        206: "#27839f",
        201: "#52adc9",
        202: "#7c979f",
        203: "#a5b8bd",
        204: "#c1cdd1"
    };
    this.schemes.colorwheel = ["#b5b6a9", "#858772", "#785f43", "#96557e", "#4682b4", "#65b9ac", "#73c03a", "#cb513a"].reverse();
    this.schemes.cool = ["#5e9d2f", "#73c03a", "#4682b4", "#7bc3b8", "#a9884e", "#c1b266", "#a47493", "#c09fb5"];
    this.schemes.munin = ["#00cc00", "#0066b3", "#ff8000", "#ffcc00", "#330099", "#990099", "#ccff00", "#ff0000", "#808080", "#008f00", "#00487d", "#b35a00", "#b38f00", "#6b006b", "#8fb300", "#b30000", "#bebebe", "#80ff80", "#80c9ff", "#ffc080", "#ffe680", "#aa80ff", "#ee00cc", "#ff8080", "#666600", "#ffbfff", "#00ffcc", "#cc6699", "#999900"]
};
Rickshaw.namespace("Rickshaw.Fixtures.RandomData");
Rickshaw.Fixtures.RandomData = function (timeInterval) {
    var addData;
    timeInterval = timeInterval || 1;
    var lastRandomValue = 200;
    var timeBase = Math.floor((new Date).getTime() / 1e3);
    this.addData = function (data) {
        var randomValue = Math.random() * 100 + 15 + lastRandomValue;
        var index = data[0].length;
        var counter = 1;
        data.forEach(function (series) {
            var randomVariance = Math.random() * 20;
            var v = randomValue / 25 + counter++ + (Math.cos(index * counter * 11 / 960) + 2) * 15 + (Math.cos(index / 7) + 2) * 7 + (Math.cos(index / 17) + 2) * 1;
            series.push({x: index * timeInterval + timeBase, y: v + randomVariance})
        });
        lastRandomValue = randomValue * .85
    };
    this.removeData = function (data) {
        data.forEach(function (series) {
            series.shift()
        });
        timeBase += timeInterval
    }
};
Rickshaw.namespace("Rickshaw.Fixtures.Time");
Rickshaw.Fixtures.Time = function () {
    var self = this;
    this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.units = [{
        name: "decade", seconds: 86400 * 365.25 * 10, formatter: function (d) {
            return parseInt(d.getUTCFullYear() / 10, 10) * 10
        }
    }, {
        name: "year", seconds: 86400 * 365.25, formatter: function (d) {
            return d.getUTCFullYear()
        }
    }, {
        name: "month", seconds: 86400 * 30.5, formatter: function (d) {
            return self.months[d.getUTCMonth()]
        }
    }, {
        name: "week", seconds: 86400 * 7, formatter: function (d) {
            return self.formatDate(d)
        }
    }, {
        name: "day", seconds: 86400, formatter: function (d) {
            return d.getUTCDate()
        }
    }, {
        name: "6 hour", seconds: 3600 * 6, formatter: function (d) {
            return self.formatTime(d)
        }
    }, {
        name: "hour", seconds: 3600, formatter: function (d) {
            return self.formatTime(d)
        }
    }, {
        name: "15 minute", seconds: 60 * 15, formatter: function (d) {
            return self.formatTime(d)
        }
    }, {
        name: "minute", seconds: 60, formatter: function (d) {
            return d.getUTCMinutes()
        }
    }, {
        name: "15 second", seconds: 15, formatter: function (d) {
            return d.getUTCSeconds() + "s"
        }
    }, {
        name: "second", seconds: 1, formatter: function (d) {
            return d.getUTCSeconds() + "s"
        }
    }, {
        name: "decisecond", seconds: 1 / 10, formatter: function (d) {
            return d.getUTCMilliseconds() + "ms"
        }
    }, {
        name: "centisecond", seconds: 1 / 100, formatter: function (d) {
            return d.getUTCMilliseconds() + "ms"
        }
    }];
    this.unit = function (unitName) {
        return this.units.filter(function (unit) {
            return unitName == unit.name
        }).shift()
    };
    this.formatDate = function (d) {
        return d3.time.format("%b %e")(d)
    };
    this.formatTime = function (d) {
        return d.toUTCString().match(/(\d+:\d+):/)[1]
    };
    this.ceil = function (time, unit) {
        var date, floor, year;
        if (unit.name == "month") {
            date = new Date(time * 1e3);
            floor = Date.UTC(date.getUTCFullYear(), date.getUTCMonth()) / 1e3;
            if (floor == time) return time;
            year = date.getUTCFullYear();
            var month = date.getUTCMonth();
            if (month == 11) {
                month = 0;
                year = year + 1
            } else {
                month += 1
            }
            return Date.UTC(year, month) / 1e3
        }
        if (unit.name == "year") {
            date = new Date(time * 1e3);
            floor = Date.UTC(date.getUTCFullYear(), 0) / 1e3;
            if (floor == time) return time;
            year = date.getUTCFullYear() + 1;
            return Date.UTC(year, 0) / 1e3
        }
        return Math.ceil(time / unit.seconds) * unit.seconds
    }
};
Rickshaw.namespace("Rickshaw.Fixtures.Time.Local");
Rickshaw.Fixtures.Time.Local = function () {
    var self = this;
    this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    this.units = [{
        name: "decade", seconds: 86400 * 365.25 * 10, formatter: function (d) {
            return parseInt(d.getFullYear() / 10, 10) * 10
        }
    }, {
        name: "year", seconds: 86400 * 365.25, formatter: function (d) {
            return d.getFullYear()
        }
    }, {
        name: "month", seconds: 86400 * 30.5, formatter: function (d) {
            return self.months[d.getMonth()]
        }
    }, {
        name: "week", seconds: 86400 * 7, formatter: function (d) {
            return self.formatDate(d)
        }
    }, {
        name: "day", seconds: 86400, formatter: function (d) {
            return d.getDate()
        }
    }, {
        name: "6 hour", seconds: 3600 * 6, formatter: function (d) {
            return self.formatTime(d)
        }
    }, {
        name: "hour", seconds: 3600, formatter: function (d) {
            return self.formatTime(d)
        }
    }, {
        name: "15 minute", seconds: 60 * 15, formatter: function (d) {
            return self.formatTime(d)
        }
    }, {
        name: "minute", seconds: 60, formatter: function (d) {
            return d.getMinutes()
        }
    }, {
        name: "15 second", seconds: 15, formatter: function (d) {
            return d.getSeconds() + "s"
        }
    }, {
        name: "second", seconds: 1, formatter: function (d) {
            return d.getSeconds() + "s"
        }
    }, {
        name: "decisecond", seconds: 1 / 10, formatter: function (d) {
            return d.getMilliseconds() + "ms"
        }
    }, {
        name: "centisecond", seconds: 1 / 100, formatter: function (d) {
            return d.getMilliseconds() + "ms"
        }
    }];
    this.unit = function (unitName) {
        return this.units.filter(function (unit) {
            return unitName == unit.name
        }).shift()
    };
    this.formatDate = function (d) {
        return d3.time.format("%b %e")(d)
    };
    this.formatTime = function (d) {
        return d.toString().match(/(\d+:\d+):/)[1]
    };
    this.ceil = function (time, unit) {
        var date, floor, year;
        if (unit.name == "day") {
            var nearFuture = new Date((time + unit.seconds - 1) * 1e3);
            var rounded = new Date(0);
            rounded.setMilliseconds(0);
            rounded.setSeconds(0);
            rounded.setMinutes(0);
            rounded.setHours(0);
            rounded.setDate(nearFuture.getDate());
            rounded.setMonth(nearFuture.getMonth());
            rounded.setFullYear(nearFuture.getFullYear());
            return rounded.getTime() / 1e3
        }
        if (unit.name == "month") {
            date = new Date(time * 1e3);
            floor = new Date(date.getFullYear(), date.getMonth()).getTime() / 1e3;
            if (floor == time) return time;
            year = date.getFullYear();
            var month = date.getMonth();
            if (month == 11) {
                month = 0;
                year = year + 1
            } else {
                month += 1
            }
            return new Date(year, month).getTime() / 1e3
        }
        if (unit.name == "year") {
            date = new Date(time * 1e3);
            floor = new Date(date.getUTCFullYear(), 0).getTime() / 1e3;
            if (floor == time) return time;
            year = date.getFullYear() + 1;
            return new Date(year, 0).getTime() / 1e3
        }
        return Math.ceil(time / unit.seconds) * unit.seconds
    }
};
Rickshaw.namespace("Rickshaw.Fixtures.Number");
Rickshaw.Fixtures.Number.formatKMBT = function (y) {
    var abs_y = Math.abs(y);
    if (abs_y >= 1e12) {
        return y / 1e12 + "T"
    } else if (abs_y >= 1e9) {
        return y / 1e9 + "B"
    } else if (abs_y >= 1e6) {
        return y / 1e6 + "M"
    } else if (abs_y >= 1e3) {
        return y / 1e3 + "K"
    } else if (abs_y < 1 && y > 0) {
        return y.toFixed(2)
    } else if (abs_y === 0) {
        return ""
    } else {
        return y
    }
};
Rickshaw.Fixtures.Number.formatBase1024KMGTP = function (y) {
    var abs_y = Math.abs(y);
    if (abs_y >= 0x4000000000000) {
        return y / 0x4000000000000 + "P"
    } else if (abs_y >= 1099511627776) {
        return y / 1099511627776 + "T"
    } else if (abs_y >= 1073741824) {
        return y / 1073741824 + "G"
    } else if (abs_y >= 1048576) {
        return y / 1048576 + "M"
    } else if (abs_y >= 1024) {
        return y / 1024 + "K"
    } else if (abs_y < 1 && y > 0) {
        return y.toFixed(2)
    } else if (abs_y === 0) {
        return ""
    } else {
        return y
    }
};
Rickshaw.namespace("Rickshaw.Color.Palette");
Rickshaw.Color.Palette = function (args) {
    var color = new Rickshaw.Fixtures.Color;
    args = args || {};
    this.schemes = {};
    this.scheme = color.schemes[args.scheme] || args.scheme || color.schemes.colorwheel;
    this.runningIndex = 0;
    this.generatorIndex = 0;
    if (args.interpolatedStopCount) {
        var schemeCount = this.scheme.length - 1;
        var i, j, scheme = [];
        for (i = 0; i < schemeCount; i++) {
            scheme.push(this.scheme[i]);
            var generator = d3.interpolateHsl(this.scheme[i], this.scheme[i + 1]);
            for (j = 1; j < args.interpolatedStopCount; j++) {
                scheme.push(generator(1 / args.interpolatedStopCount * j))
            }
        }
        scheme.push(this.scheme[this.scheme.length - 1]);
        this.scheme = scheme
    }
    this.rotateCount = this.scheme.length;
    this.color = function (key) {
        return this.scheme[key] || this.scheme[this.runningIndex++] || this.interpolateColor() || "#808080"
    };
    this.interpolateColor = function () {
        if (!Array.isArray(this.scheme)) return;
        var color;
        if (this.generatorIndex == this.rotateCount * 2 - 1) {
            color = d3.interpolateHsl(this.scheme[this.generatorIndex], this.scheme[0])(.5);
            this.generatorIndex = 0;
            this.rotateCount *= 2
        } else {
            color = d3.interpolateHsl(this.scheme[this.generatorIndex], this.scheme[this.generatorIndex + 1])(.5);
            this.generatorIndex++
        }
        this.scheme.push(color);
        return color
    }
};
Rickshaw.namespace("Rickshaw.Graph.Ajax");
Rickshaw.Graph.Ajax = Rickshaw.Class.create({
    initialize: function (args) {
        this.dataURL = args.dataURL;
        this.onData = args.onData || function (d) {
            return d
        };
        this.onComplete = args.onComplete || function () {
        };
        this.onError = args.onError || function () {
        };
        this.args = args;
        this.request()
    }, request: function () {
        $.ajax({url: this.dataURL, dataType: "json", success: this.success.bind(this), error: this.error.bind(this)})
    }, error: function () {
        console.log("error loading dataURL: " + this.dataURL);
        this.onError(this)
    }, success: function (data, status) {
        data = this.onData(data);
        this.args.series = this._splice({data: data, series: this.args.series});
        this.graph = this.graph || new Rickshaw.Graph(this.args);
        this.graph.render();
        this.onComplete(this)
    }, _splice: function (args) {
        var data = args.data;
        var series = args.series;
        if (!args.series) return data;
        series.forEach(function (s) {
            var seriesKey = s.key || s.name;
            if (!seriesKey) throw"series needs a key or a name";
            data.forEach(function (d) {
                var dataKey = d.key || d.name;
                if (!dataKey) throw"data needs a key or a name";
                if (seriesKey == dataKey) {
                    var properties = ["color", "name", "data"];
                    properties.forEach(function (p) {
                        if (d[p]) s[p] = d[p]
                    })
                }
            })
        });
        return series
    }
});
Rickshaw.namespace("Rickshaw.Graph.Annotate");
Rickshaw.Graph.Annotate = function (args) {
    var graph = this.graph = args.graph;
    this.elements = {timeline: args.element};
    var self = this;
    this.data = {};
    this.elements.timeline.classList.add("rickshaw_annotation_timeline");
    this.add = function (time, content, end_time) {
        self.data[time] = self.data[time] || {boxes: []};
        self.data[time].boxes.push({content: content, end: end_time})
    };
    this.update = function () {
        Rickshaw.keys(self.data).forEach(function (time) {
            var annotation = self.data[time];
            var left = self.graph.x(time);
            if (left < 0 || left > self.graph.x.range()[1]) {
                if (annotation.element) {
                    annotation.line.classList.add("offscreen");
                    annotation.element.style.display = "none"
                }
                annotation.boxes.forEach(function (box) {
                    if (box.rangeElement) box.rangeElement.classList.add("offscreen")
                });
                return
            }
            if (!annotation.element) {
                var element = annotation.element = document.createElement("div");
                element.classList.add("annotation");
                this.elements.timeline.appendChild(element);
                element.addEventListener("click", function (e) {
                    element.classList.toggle("active");
                    annotation.line.classList.toggle("active");
                    annotation.boxes.forEach(function (box) {
                        if (box.rangeElement) box.rangeElement.classList.toggle("active")
                    })
                }, false)
            }
            annotation.element.style.left = left + "px";
            annotation.element.style.display = "block";
            annotation.boxes.forEach(function (box) {
                var element = box.element;
                if (!element) {
                    element = box.element = document.createElement("div");
                    element.classList.add("content");
                    element.innerHTML = box.content;
                    annotation.element.appendChild(element);
                    annotation.line = document.createElement("div");
                    annotation.line.classList.add("annotation_line");
                    self.graph.element.appendChild(annotation.line);
                    if (box.end) {
                        box.rangeElement = document.createElement("div");
                        box.rangeElement.classList.add("annotation_range");
                        self.graph.element.appendChild(box.rangeElement)
                    }
                }
                if (box.end) {
                    var annotationRangeStart = left;
                    var annotationRangeEnd = Math.min(self.graph.x(box.end), self.graph.x.range()[1]);
                    if (annotationRangeStart > annotationRangeEnd) {
                        annotationRangeEnd = left;
                        annotationRangeStart = Math.max(self.graph.x(box.end), self.graph.x.range()[0])
                    }
                    var annotationRangeWidth = annotationRangeEnd - annotationRangeStart;
                    box.rangeElement.style.left = annotationRangeStart + "px";
                    box.rangeElement.style.width = annotationRangeWidth + "px";
                    box.rangeElement.classList.remove("offscreen")
                }
                annotation.line.classList.remove("offscreen");
                annotation.line.style.left = left + "px"
            })
        }, this)
    };
    this.graph.onUpdate(function () {
        self.update()
    })
};
Rickshaw.namespace("Rickshaw.Graph.Axis.Time");
Rickshaw.Graph.Axis.Time = function (args) {
    var self = this;
    this.graph = args.graph;
    this.elements = [];
    this.ticksTreatment = args.ticksTreatment || "plain";
    this.fixedTimeUnit = args.timeUnit;
    var time = args.timeFixture || new Rickshaw.Fixtures.Time;
    this.appropriateTimeUnit = function () {
        var unit;
        var units = time.units;
        var domain = this.graph.x.domain();
        var rangeSeconds = domain[1] - domain[0];
        units.forEach(function (u) {
            if (Math.floor(rangeSeconds / u.seconds) >= 2) {
                unit = unit || u
            }
        });
        return unit || time.units[time.units.length - 1]
    };
    this.tickOffsets = function () {
        var domain = this.graph.x.domain();
        var unit = this.fixedTimeUnit || this.appropriateTimeUnit();
        var count = Math.ceil((domain[1] - domain[0]) / unit.seconds);
        var runningTick = domain[0];
        var offsets = [];
        for (var i = 0; i < count; i++) {
            var tickValue = time.ceil(runningTick, unit);
            runningTick = tickValue + unit.seconds / 2;
            offsets.push({value: tickValue, unit: unit})
        }
        return offsets
    };
    this.render = function () {
        this.elements.forEach(function (e) {
            e.parentNode.removeChild(e)
        });
        this.elements = [];
        var offsets = this.tickOffsets();
        offsets.forEach(function (o) {
            if (self.graph.x(o.value) > self.graph.x.range()[1]) return;
            var element = document.createElement("div");
            element.style.left = self.graph.x(o.value) + "px";
            element.classList.add("x_tick");
            element.classList.add(self.ticksTreatment);
            var title = document.createElement("div");
            title.classList.add("title");
            title.innerHTML = o.unit.formatter(new Date(o.value * 1e3));
            element.appendChild(title);
            self.graph.element.appendChild(element);
            self.elements.push(element)
        })
    };
    this.graph.onUpdate(function () {
        self.render()
    })
};
Rickshaw.namespace("Rickshaw.Graph.Axis.X");
Rickshaw.Graph.Axis.X = function (args) {
    var self = this;
    var berthRate = .1;
    this.initialize = function (args) {
        this.graph = args.graph;
        this.orientation = args.orientation || "top";
        this.pixelsPerTick = args.pixelsPerTick || 75;
        if (args.ticks) this.staticTicks = args.ticks;
        if (args.tickValues) this.tickValues = args.tickValues;
        this.tickSize = args.tickSize || 4;
        this.ticksTreatment = args.ticksTreatment || "plain";
        if (args.element) {
            this.element = args.element;
            this._discoverSize(args.element, args);
            this.vis = d3.select(args.element).append("svg:svg").attr("height", this.height).attr("width", this.width).attr("class", "rickshaw_graph x_axis_d3");
            this.element = this.vis[0][0];
            this.element.style.position = "relative";
            this.setSize({width: args.width, height: args.height})
        } else {
            this.vis = this.graph.vis
        }
        this.graph.onUpdate(function () {
            self.render()
        })
    };
    this.setSize = function (args) {
        args = args || {};
        if (!this.element) return;
        this._discoverSize(this.element.parentNode, args);
        this.vis.attr("height", this.height).attr("width", this.width * (1 + berthRate));
        var berth = Math.floor(this.width * berthRate / 2);
        this.element.style.left = -1 * berth + "px"
    };
    this.render = function () {
        if (this._renderWidth !== undefined && this.graph.width !== this._renderWidth) this.setSize({auto: true});
        var axis = d3.svg.axis().scale(this.graph.x).orient(this.orientation);
        axis.tickFormat(args.tickFormat || function (x) {
            return x
        });
        if (this.tickValues) axis.tickValues(this.tickValues);
        this.ticks = this.staticTicks || Math.floor(this.graph.width / this.pixelsPerTick);
        var berth = Math.floor(this.width * berthRate / 2) || 0;
        var transform;
        if (this.orientation == "top") {
            var yOffset = this.height || this.graph.height;
            transform = "translate(" + berth + "," + yOffset + ")"
        } else {
            transform = "translate(" + berth + ", 0)"
        }
        if (this.element) {
            this.vis.selectAll("*").remove()
        }
        this.vis.append("svg:g").attr("class", ["x_ticks_d3", this.ticksTreatment].join(" ")).attr("transform", transform).call(axis.ticks(this.ticks).tickSubdivide(0).tickSize(this.tickSize));
        var gridSize = (this.orientation == "bottom" ? 1 : -1) * this.graph.height;
        this.graph.vis.append("svg:g").attr("class", "x_grid_d3").call(axis.ticks(this.ticks).tickSubdivide(0).tickSize(gridSize)).selectAll("text").each(function () {
            this.parentNode.setAttribute("data-x-value", this.textContent)
        });
        this._renderHeight = this.graph.height
    };
    this._discoverSize = function (element, args) {
        if (typeof window !== "undefined") {
            var style = window.getComputedStyle(element, null);
            var elementHeight = parseInt(style.getPropertyValue("height"), 10);
            if (!args.auto) {
                var elementWidth = parseInt(style.getPropertyValue("width"), 10)
            }
        }
        this.width = (args.width || elementWidth || this.graph.width) * (1 + berthRate);
        this.height = args.height || elementHeight || 40
    };
    this.initialize(args)
};
Rickshaw.namespace("Rickshaw.Graph.Axis.Y");
Rickshaw.Graph.Axis.Y = Rickshaw.Class.create({
    initialize: function (args) {
        this.graph = args.graph;
        this.orientation = args.orientation || "right";
        this.pixelsPerTick = args.pixelsPerTick || 75;
        if (args.ticks) this.staticTicks = args.ticks;
        if (args.tickValues) this.tickValues = args.tickValues;
        this.tickSize = args.tickSize || 4;
        this.ticksTreatment = args.ticksTreatment || "plain";
        this.tickFormat = args.tickFormat || function (y) {
            return y
        };
        this.berthRate = .1;
        if (args.element) {
            this.element = args.element;
            this.vis = d3.select(args.element).append("svg:svg").attr("class", "rickshaw_graph y_axis");
            this.element = this.vis[0][0];
            this.element.style.position = "relative";
            this.setSize({width: args.width, height: args.height})
        } else {
            this.vis = this.graph.vis
        }
        var self = this;
        this.graph.onUpdate(function () {
            self.render()
        })
    }, setSize: function (args) {
        args = args || {};
        if (!this.element) return;
        if (typeof window !== "undefined") {
            var style = window.getComputedStyle(this.element.parentNode, null);
            var elementWidth = parseInt(style.getPropertyValue("width"), 10);
            if (!args.auto) {
                var elementHeight = parseInt(style.getPropertyValue("height"), 10)
            }
        }
        this.width = args.width || elementWidth || this.graph.width * this.berthRate;
        this.height = args.height || elementHeight || this.graph.height;
        this.vis.attr("width", this.width).attr("height", this.height * (1 + this.berthRate));
        var berth = this.height * this.berthRate;
        if (this.orientation == "left") {
            this.element.style.top = -1 * berth + "px"
        }
    }, render: function () {
        if (this._renderHeight !== undefined && this.graph.height !== this._renderHeight) this.setSize({auto: true});
        this.ticks = this.staticTicks || Math.floor(this.graph.height / this.pixelsPerTick);
        var axis = this._drawAxis(this.graph.y);
        this._drawGrid(axis);
        this._renderHeight = this.graph.height
    }, _drawAxis: function (scale) {
        var axis = d3.svg.axis().scale(scale).orient(this.orientation);
        axis.tickFormat(this.tickFormat);
        if (this.tickValues) axis.tickValues(this.tickValues);
        if (this.orientation == "left") {
            var berth = this.height * this.berthRate;
            var transform = "translate(" + this.width + ", " + berth + ")"
        }
        if (this.element) {
            this.vis.selectAll("*").remove()
        }
        this.vis.append("svg:g").attr("class", ["y_ticks", this.ticksTreatment].join(" ")).attr("transform", transform).call(axis.ticks(this.ticks).tickSubdivide(0).tickSize(this.tickSize));
        return axis
    }, _drawGrid: function (axis) {
        var gridSize = (this.orientation == "right" ? 1 : -1) * this.graph.width;
        this.graph.vis.append("svg:g").attr("class", "y_grid").call(axis.ticks(this.ticks).tickSubdivide(0).tickSize(gridSize)).selectAll("text").each(function () {
            this.parentNode.setAttribute("data-y-value", this.textContent)
        })
    }
});
Rickshaw.namespace("Rickshaw.Graph.Axis.Y.Scaled");
Rickshaw.Graph.Axis.Y.Scaled = Rickshaw.Class.create(Rickshaw.Graph.Axis.Y, {
    initialize: function ($super, args) {
        if (typeof args.scale === "undefined") {
            throw new Error("Scaled requires scale")
        }
        this.scale = args.scale;
        if (typeof args.grid === "undefined") {
            this.grid = true
        } else {
            this.grid = args.grid
        }
        $super(args)
    }, _drawAxis: function ($super, scale) {
        var domain = this.scale.domain();
        var renderDomain = this.graph.renderer.domain().y;
        var extents = [Math.min.apply(Math, domain), Math.max.apply(Math, domain)];
        var extentMap = d3.scale.linear().domain([0, 1]).range(extents);
        var adjExtents = [extentMap(renderDomain[0]), extentMap(renderDomain[1])];
        var adjustment = d3.scale.linear().domain(extents).range(adjExtents);
        var adjustedScale = this.scale.copy().domain(domain.map(adjustment)).range(scale.range());
        return $super(adjustedScale)
    }, _drawGrid: function ($super, axis) {
        if (this.grid) {
            $super(axis)
        }
    }
});
Rickshaw.namespace("Rickshaw.Graph.Behavior.Series.Highlight");
Rickshaw.Graph.Behavior.Series.Highlight = function (args) {
    this.graph = args.graph;
    this.legend = args.legend;
    var self = this;
    var colorSafe = {};
    var activeLine = null;
    var disabledColor = args.disabledColor || function (seriesColor) {
        return d3.interpolateRgb(seriesColor, d3.rgb("#d8d8d8"))(.8).toString()
    };
    this.addHighlightEvents = function (l) {
        l.element.addEventListener("mouseover", function (e) {
            if (activeLine) return; else activeLine = l;
            self.legend.lines.forEach(function (line) {
                if (l === line) {
                    if (self.graph.renderer.unstack && (line.series.renderer ? line.series.renderer.unstack : true)) {
                        var seriesIndex = self.graph.series.indexOf(line.series);
                        line.originalIndex = seriesIndex;
                        var series = self.graph.series.splice(seriesIndex, 1)[0];
                        self.graph.series.push(series)
                    }
                    return
                }
                colorSafe[line.series.name] = colorSafe[line.series.name] || line.series.color;
                line.series.color = disabledColor(line.series.color)
            });
            self.graph.update()
        }, false);
        l.element.addEventListener("mouseout", function (e) {
            if (!activeLine) return; else activeLine = null;
            self.legend.lines.forEach(function (line) {
                if (l === line && line.hasOwnProperty("originalIndex")) {
                    var series = self.graph.series.pop();
                    self.graph.series.splice(line.originalIndex, 0, series);
                    delete line.originalIndex
                }
                if (colorSafe[line.series.name]) {
                    line.series.color = colorSafe[line.series.name]
                }
            });
            self.graph.update()
        }, false)
    };
    if (this.legend) {
        this.legend.lines.forEach(function (l) {
            self.addHighlightEvents(l)
        })
    }
};
Rickshaw.namespace("Rickshaw.Graph.Behavior.Series.Order");
Rickshaw.Graph.Behavior.Series.Order = function (args) {
    this.graph = args.graph;
    this.legend = args.legend;
    var self = this;
    if (typeof window.$ == "undefined") {
        throw"couldn't find jQuery at window.$"
    }
    if (typeof window.$.ui == "undefined") {
        throw"couldn't find jQuery UI at window.$.ui"
    }
    $(function () {
        $(self.legend.list).sortable({
            containment: "parent", tolerance: "pointer", update: function (event, ui) {
                var series = [];
                $(self.legend.list).find("li").each(function (index, item) {
                    if (!item.series) return;
                    series.push(item.series)
                });
                for (var i = self.graph.series.length - 1; i >= 0; i--) {
                    self.graph.series[i] = series.shift()
                }
                self.graph.update()
            }
        });
        $(self.legend.list).disableSelection()
    });
    this.graph.onUpdate(function () {
        var h = window.getComputedStyle(self.legend.element).height;
        self.legend.element.style.height = h
    })
};
Rickshaw.namespace("Rickshaw.Graph.Behavior.Series.Toggle");
Rickshaw.Graph.Behavior.Series.Toggle = function (args) {
    this.graph = args.graph;
    this.legend = args.legend;
    var self = this;
    this.addAnchor = function (line) {
        var anchor = document.createElement("a");
        anchor.innerHTML = "&#10004;";
        anchor.classList.add("action");
        line.element.insertBefore(anchor, line.element.firstChild);
        anchor.onclick = function (e) {
            if (line.series.disabled) {
                line.series.enable();
                line.element.classList.remove("disabled")
            } else {
                if (this.graph.series.filter(function (s) {
                    return !s.disabled
                }).length <= 1) return;
                line.series.disable();
                line.element.classList.add("disabled")
            }
        }.bind(this);
        var label = line.element.getElementsByTagName("span")[0];
        label.onclick = function (e) {
            var disableAllOtherLines = line.series.disabled;
            if (!disableAllOtherLines) {
                for (var i = 0; i < self.legend.lines.length; i++) {
                    var l = self.legend.lines[i];
                    if (line.series === l.series) {
                    } else if (l.series.disabled) {
                    } else {
                        disableAllOtherLines = true;
                        break
                    }
                }
            }
            if (disableAllOtherLines) {
                line.series.enable();
                line.element.classList.remove("disabled");
                self.legend.lines.forEach(function (l) {
                    if (line.series === l.series) {
                    } else {
                        l.series.disable();
                        l.element.classList.add("disabled")
                    }
                })
            } else {
                self.legend.lines.forEach(function (l) {
                    l.series.enable();
                    l.element.classList.remove("disabled")
                })
            }
        }
    };
    if (this.legend) {
        if (typeof $ != "undefined" && $(this.legend.list).sortable) {
            $(this.legend.list).sortable({
                start: function (event, ui) {
                    ui.item.bind("no.onclick", function (event) {
                        event.preventDefault()
                    })
                }, stop: function (event, ui) {
                    setTimeout(function () {
                        ui.item.unbind("no.onclick")
                    }, 250)
                }
            })
        }
        this.legend.lines.forEach(function (l) {
            self.addAnchor(l)
        })
    }
    this._addBehavior = function () {
        this.graph.series.forEach(function (s) {
            s.disable = function () {
                if (self.graph.series.length <= 1) {
                    throw"only one series left"
                }
                s.disabled = true;
                self.graph.update()
            };
            s.enable = function () {
                s.disabled = false;
                self.graph.update()
            }
        })
    };
    this._addBehavior();
    this.updateBehaviour = function () {
        this._addBehavior()
    }
};
Rickshaw.namespace("Rickshaw.Graph.HoverDetail");
Rickshaw.Graph.HoverDetail = Rickshaw.Class.create({
    initialize: function (args) {
        var graph = this.graph = args.graph;
        this.xFormatter = args.xFormatter || function (x) {
            return new Date(x * 1e3).toUTCString()
        };
        this.yFormatter = args.yFormatter || function (y) {
            return y === null ? y : y.toFixed(2)
        };
        var element = this.element = document.createElement("div");
        element.className = "detail";
        this.visible = true;
        graph.element.appendChild(element);
        this.lastEvent = null;
        this._addListeners();
        this.onShow = args.onShow;
        this.onHide = args.onHide;
        this.onRender = args.onRender;
        this.formatter = args.formatter || this.formatter
    }, formatter: function (series, x, y, formattedX, formattedY, d) {
        return series.name + ":&nbsp;" + formattedY
    }, update: function (e) {
        e = e || this.lastEvent;
        if (!e) return;
        this.lastEvent = e;
        if (!e.target.nodeName.match(/^(path|svg|rect|circle)$/)) return;
        var graph = this.graph;
        var eventX = e.offsetX || e.layerX;
        var eventY = e.offsetY || e.layerY;
        var j = 0;
        var points = [];
        var nearestPoint;
        this.graph.series.active().forEach(function (series) {
            var data = this.graph.stackedData[j++];
            if (!data.length) return;
            var domainX = graph.x.invert(eventX);
            var domainIndexScale = d3.scale.linear().domain([data[0].x, data.slice(-1)[0].x]).range([0, data.length - 1]);
            var approximateIndex = Math.round(domainIndexScale(domainX));
            if (approximateIndex == data.length - 1) approximateIndex--;
            var dataIndex = Math.min(approximateIndex || 0, data.length - 1);
            for (var i = approximateIndex; i < data.length - 1;) {
                if (!data[i] || !data[i + 1]) break;
                if (data[i].x <= domainX && data[i + 1].x > domainX) {
                    dataIndex = Math.abs(domainX - data[i].x) < Math.abs(domainX - data[i + 1].x) ? i : i + 1;
                    break
                }
                if (data[i + 1].x <= domainX) {
                    i++
                } else {
                    i--
                }
            }
            if (dataIndex < 0) dataIndex = 0;
            var value = data[dataIndex];
            var distance = Math.sqrt(Math.pow(Math.abs(graph.x(value.x) - eventX), 2) + Math.pow(Math.abs(graph.y(value.y + value.y0) - eventY), 2));
            var xFormatter = series.xFormatter || this.xFormatter;
            var yFormatter = series.yFormatter || this.yFormatter;
            var point = {
                formattedXValue: xFormatter(value.x),
                formattedYValue: yFormatter(series.scale ? series.scale.invert(value.y) : value.y),
                series: series,
                value: value,
                distance: distance,
                order: j,
                name: series.name
            };
            if (!nearestPoint || distance < nearestPoint.distance) {
                nearestPoint = point
            }
            points.push(point)
        }, this);
        if (!nearestPoint) return;
        nearestPoint.active = true;
        var domainX = nearestPoint.value.x;
        var formattedXValue = nearestPoint.formattedXValue;
        this.element.innerHTML = "";
        this.element.style.left = graph.x(domainX) + "px";
        this.visible && this.render({
            points: points,
            detail: points,
            mouseX: eventX,
            mouseY: eventY,
            formattedXValue: formattedXValue,
            domainX: domainX
        })
    }, hide: function () {
        this.visible = false;
        this.element.classList.add("inactive");
        if (typeof this.onHide == "function") {
            this.onHide()
        }
    }, show: function () {
        this.visible = true;
        this.element.classList.remove("inactive");
        if (typeof this.onShow == "function") {
            this.onShow()
        }
    }, render: function (args) {
        var graph = this.graph;
        var points = args.points;
        var point = points.filter(function (p) {
            return p.active
        }).shift();
        if (point.value.y === null) return;
        var formattedXValue = point.formattedXValue;
        var formattedYValue = point.formattedYValue;
        this.element.innerHTML = "";
        this.element.style.left = graph.x(point.value.x) + "px";
        var xLabel = document.createElement("div");
        xLabel.className = "x_label";
        xLabel.innerHTML = formattedXValue;
        this.element.appendChild(xLabel);
        var item = document.createElement("div");
        item.className = "item";
        var series = point.series;
        var actualY = series.scale ? series.scale.invert(point.value.y) : point.value.y;
        item.innerHTML = this.formatter(series, point.value.x, actualY, formattedXValue, formattedYValue, point);
        item.style.top = this.graph.y(point.value.y0 + point.value.y) + "px";
        this.element.appendChild(item);
        var dot = document.createElement("div");
        dot.className = "dot";
        dot.style.top = item.style.top;
        dot.style.borderColor = series.color;
        this.element.appendChild(dot);
        if (point.active) {
            item.classList.add("active");
            dot.classList.add("active")
        }
        var alignables = [xLabel, item];
        alignables.forEach(function (el) {
            el.classList.add("left")
        });
        this.show();
        var leftAlignError = this._calcLayoutError(alignables);
        if (leftAlignError > 0) {
            alignables.forEach(function (el) {
                el.classList.remove("left");
                el.classList.add("right")
            });
            var rightAlignError = this._calcLayoutError(alignables);
            if (rightAlignError > leftAlignError) {
                alignables.forEach(function (el) {
                    el.classList.remove("right");
                    el.classList.add("left")
                })
            }
        }
        if (typeof this.onRender == "function") {
            this.onRender(args)
        }
    }, _calcLayoutError: function (alignables) {
        var parentRect = this.element.parentNode.getBoundingClientRect();
        var error = 0;
        var alignRight = alignables.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            if (!rect.width) {
                return
            }
            if (rect.right > parentRect.right) {
                error += rect.right - parentRect.right
            }
            if (rect.left < parentRect.left) {
                error += parentRect.left - rect.left
            }
        });
        return error
    }, _addListeners: function () {
        this.graph.element.addEventListener("mousemove", function (e) {
            this.visible = true;
            this.update(e)
        }.bind(this), false);
        this.graph.onUpdate(function () {
            this.update()
        }.bind(this));
        this.graph.element.addEventListener("mouseout", function (e) {
            if (e.relatedTarget && !(e.relatedTarget.compareDocumentPosition(this.graph.element) & Node.DOCUMENT_POSITION_CONTAINS)) {
                this.hide()
            }
        }.bind(this), false)
    }
});
Rickshaw.namespace("Rickshaw.Graph.JSONP");
Rickshaw.Graph.JSONP = Rickshaw.Class.create(Rickshaw.Graph.Ajax, {
    request: function () {
        $.ajax({url: this.dataURL, dataType: "jsonp", success: this.success.bind(this), error: this.error.bind(this)})
    }
});
Rickshaw.namespace("Rickshaw.Graph.Legend");
Rickshaw.Graph.Legend = Rickshaw.Class.create({
    className: "rickshaw_legend", initialize: function (args) {
        this.element = args.element;
        this.graph = args.graph;
        this.naturalOrder = args.naturalOrder;
        this.element.classList.add(this.className);
        this.list = document.createElement("ul");
        this.element.appendChild(this.list);
        this.render();
        this.graph.onUpdate(function () {
        })
    }, render: function () {
        var self = this;
        while (this.list.firstChild) {
            this.list.removeChild(this.list.firstChild)
        }
        this.lines = [];
        var series = this.graph.series.map(function (s) {
            return s
        });
        if (!this.naturalOrder) {
            series = series.reverse()
        }
        series.forEach(function (s) {
            self.addLine(s)
        })
    }, addLine: function (series) {
        var line = document.createElement("li");
        line.className = "line";
        if (series.disabled) {
            line.className += " disabled"
        }
        if (series.className) {
            d3.select(line).classed(series.className, true)
        }
        var swatch = document.createElement("div");
        swatch.className = "swatch";
        swatch.style.backgroundColor = series.color;
        line.appendChild(swatch);
        var label = document.createElement("span");
        label.className = "label";
        label.innerHTML = series.name;
        line.appendChild(label);
        this.list.appendChild(line);
        line.series = series;
        if (series.noLegend) {
            line.style.display = "none"
        }
        var _line = {element: line, series: series};
        if (this.shelving) {
            this.shelving.addAnchor(_line);
            this.shelving.updateBehaviour()
        }
        if (this.highlighter) {
            this.highlighter.addHighlightEvents(_line)
        }
        this.lines.push(_line);
        return line
    }
});
Rickshaw.namespace("Rickshaw.Graph.RangeSlider");
Rickshaw.Graph.RangeSlider = Rickshaw.Class.create({
    initialize: function (args) {
        var element = this.element = args.element;
        var graph = this.graph = args.graph;
        this.build();
        graph.onUpdate(function () {
            this.update()
        }.bind(this))
    }, build: function () {
        var element = this.element;
        var graph = this.graph;
        var domain = graph.dataDomain();
        $(function () {
            $(element).slider({
                range: true,
                min: domain[0],
                max: domain[1],
                values: [domain[0], domain[1]],
                slide: function (event, ui) {
                    if (ui.values[1] <= ui.values[0]) return;
                    graph.window.xMin = ui.values[0];
                    graph.window.xMax = ui.values[1];
                    graph.update();
                    var domain = graph.dataDomain();
                    if (domain[0] == ui.values[0]) {
                        graph.window.xMin = undefined
                    }
                    if (domain[1] == ui.values[1]) {
                        graph.window.xMax = undefined
                    }
                }
            })
        });
        $(element)[0].style.width = graph.width + "px"
    }, update: function () {
        var element = this.element;
        var graph = this.graph;
        var values = $(element).slider("option", "values");
        var domain = graph.dataDomain();
        $(element).slider("option", "min", domain[0]);
        $(element).slider("option", "max", domain[1]);
        if (graph.window.xMin == null) {
            values[0] = domain[0]
        }
        if (graph.window.xMax == null) {
            values[1] = domain[1]
        }
        $(element).slider("option", "values", values)
    }
});
Rickshaw.namespace("Rickshaw.Graph.RangeSlider.Preview");
Rickshaw.Graph.RangeSlider.Preview = Rickshaw.Class.create({
    initialize: function (args) {
        if (!args.element) throw"Rickshaw.Graph.RangeSlider.Preview needs a reference to an element";
        if (!args.graph && !args.graphs) throw"Rickshaw.Graph.RangeSlider.Preview needs a reference to an graph or an array of graphs";
        this.element = args.element;
        this.graphs = args.graph ? [args.graph] : args.graphs;
        this.defaults = {
            height: 75,
            width: 400,
            gripperColor: undefined,
            frameTopThickness: 3,
            frameHandleThickness: 10,
            frameColor: "#d4d4d4",
            frameOpacity: 1,
            minimumFrameWidth: 0
        };
        this.defaults.gripperColor = d3.rgb(this.defaults.frameColor).darker().toString();
        this.configureCallbacks = [];
        this.previews = [];
        args.width = args.width || this.graphs[0].width || this.defaults.width;
        args.height = args.height || this.graphs[0].height / 5 || this.defaults.height;
        this.configure(args);
        this.render()
    }, onConfigure: function (callback) {
        this.configureCallbacks.push(callback)
    }, configure: function (args) {
        this.config = {};
        this.configureCallbacks.forEach(function (callback) {
            callback(args)
        });
        Rickshaw.keys(this.defaults).forEach(function (k) {
            this.config[k] = k in args ? args[k] : k in this.config ? this.config[k] : this.defaults[k]
        }, this);
        if (args.width) {
            this.previews.forEach(function (preview) {
                var width = args.width - this.config.frameHandleThickness * 2;
                preview.setSize({width: width})
            }, this)
        }
        if (args.height) {
            this.previews.forEach(function (preview) {
                var height = this.previewHeight / this.graphs.length;
                preview.setSize({height: height})
            }, this)
        }
    }, render: function () {
        var self = this;
        this.svg = d3.select(this.element).selectAll("svg.rickshaw_range_slider_preview").data([null]);
        this.previewHeight = this.config.height - this.config.frameTopThickness * 2;
        this.previewWidth = this.config.width - this.config.frameHandleThickness * 2;
        this.currentFrame = [0, this.previewWidth];
        var buildGraph = function (parent, index) {
            var graphArgs = Rickshaw.extend({}, parent.config);
            var height = self.previewHeight / self.graphs.length;
            Rickshaw.extend(graphArgs, {
                element: this.appendChild(document.createElement("div")),
                height: height,
                width: self.previewWidth,
                series: parent.series
            });
            var graph = new Rickshaw.Graph(graphArgs);
            self.previews.push(graph);
            parent.onUpdate(function () {
                graph.render();
                self.render()
            });
            parent.onConfigure(function (args) {
                delete args.height;
                graph.configure(args);
                graph.render()
            });
            graph.render()
        };
        var graphContainer = d3.select(this.element).selectAll("div.rickshaw_range_slider_preview_container").data(this.graphs);
        var translateCommand = "translate(" + this.config.frameHandleThickness + "px, " + this.config.frameTopThickness + "px)";
        graphContainer.enter().append("div").classed("rickshaw_range_slider_preview_container", true).style("-webkit-transform", translateCommand).style("-moz-transform", translateCommand).style("-ms-transform", translateCommand).style("transform", translateCommand).each(buildGraph);
        graphContainer.exit().remove();
        var masterGraph = this.graphs[0];
        var domainScale = d3.scale.linear().domain([0, this.previewWidth]).range(masterGraph.dataDomain());
        var currentWindow = [masterGraph.window.xMin, masterGraph.window.xMax];
        this.currentFrame[0] = currentWindow[0] === undefined ? 0 : Math.round(domainScale.invert(currentWindow[0]));
        if (this.currentFrame[0] < 0) this.currentFrame[0] = 0;
        this.currentFrame[1] = currentWindow[1] === undefined ? this.previewWidth : domainScale.invert(currentWindow[1]);
        if (this.currentFrame[1] - this.currentFrame[0] < self.config.minimumFrameWidth) {
            this.currentFrame[1] = (this.currentFrame[0] || 0) + self.config.minimumFrameWidth
        }
        this.svg.enter().append("svg").classed("rickshaw_range_slider_preview", true).style("height", this.config.height + "px").style("width", this.config.width + "px").style("position", "relative").style("top", -this.previewHeight + "px");
        this._renderDimming();
        this._renderFrame();
        this._renderGrippers();
        this._renderHandles();
        this._renderMiddle();
        this._registerMouseEvents()
    }, _renderDimming: function () {
        var element = this.svg.selectAll("path.dimming").data([null]);
        element.enter().append("path").attr("fill", "white").attr("fill-opacity", "0.7").attr("fill-rule", "evenodd").classed("dimming", true);
        var path = "";
        path += " M " + this.config.frameHandleThickness + " " + this.config.frameTopThickness;
        path += " h " + this.previewWidth;
        path += " v " + this.previewHeight;
        path += " h " + -this.previewWidth;
        path += " z ";
        path += " M " + Math.max(this.currentFrame[0], this.config.frameHandleThickness) + " " + this.config.frameTopThickness;
        path += " H " + Math.min(this.currentFrame[1] + this.config.frameHandleThickness * 2, this.previewWidth + this.config.frameHandleThickness);
        path += " v " + this.previewHeight;
        path += " H " + Math.max(this.currentFrame[0], this.config.frameHandleThickness);
        path += " z";
        element.attr("d", path)
    }, _renderFrame: function () {
        var element = this.svg.selectAll("path.frame").data([null]);
        element.enter().append("path").attr("stroke", "white").attr("stroke-width", "1px").attr("stroke-linejoin", "round").attr("fill", this.config.frameColor).attr("fill-opacity", this.config.frameOpacity).attr("fill-rule", "evenodd").classed("frame", true);
        var path = "";
        path += " M " + this.currentFrame[0] + " 0";
        path += " H " + (this.currentFrame[1] + this.config.frameHandleThickness * 2);
        path += " V " + this.config.height;
        path += " H " + this.currentFrame[0];
        path += " z";
        path += " M " + (this.currentFrame[0] + this.config.frameHandleThickness) + " " + this.config.frameTopThickness;
        path += " H " + (this.currentFrame[1] + this.config.frameHandleThickness);
        path += " v " + this.previewHeight;
        path += " H " + (this.currentFrame[0] + this.config.frameHandleThickness);
        path += " z";
        element.attr("d", path)
    }, _renderGrippers: function () {
        var gripper = this.svg.selectAll("path.gripper").data([null]);
        gripper.enter().append("path").attr("stroke", this.config.gripperColor).classed("gripper", true);
        var path = "";
        [.4, .6].forEach(function (spacing) {
            path += " M " + Math.round(this.currentFrame[0] + this.config.frameHandleThickness * spacing) + " " + Math.round(this.config.height * .3);
            path += " V " + Math.round(this.config.height * .7);
            path += " M " + Math.round(this.currentFrame[1] + this.config.frameHandleThickness * (1 + spacing)) + " " + Math.round(this.config.height * .3);
            path += " V " + Math.round(this.config.height * .7)
        }.bind(this));
        gripper.attr("d", path)
    }, _renderHandles: function () {
        var leftHandle = this.svg.selectAll("rect.left_handle").data([null]);
        leftHandle.enter().append("rect").attr("width", this.config.frameHandleThickness).attr("height", this.config.height).style("cursor", "ew-resize").style("fill-opacity", "0").classed("left_handle", true);
        leftHandle.attr("x", this.currentFrame[0]);
        var rightHandle = this.svg.selectAll("rect.right_handle").data([null]);
        rightHandle.enter().append("rect").attr("width", this.config.frameHandleThickness).attr("height", this.config.height).style("cursor", "ew-resize").style("fill-opacity", "0").classed("right_handle", true);
        rightHandle.attr("x", this.currentFrame[1] + this.config.frameHandleThickness)
    }, _renderMiddle: function () {
        var middleHandle = this.svg.selectAll("rect.middle_handle").data([null]);
        middleHandle.enter().append("rect").attr("height", this.config.height).style("cursor", "move").style("fill-opacity", "0").classed("middle_handle", true);
        middleHandle.attr("width", Math.max(0, this.currentFrame[1] - this.currentFrame[0])).attr("x", this.currentFrame[0] + this.config.frameHandleThickness)
    }, _registerMouseEvents: function () {
        var element = d3.select(this.element);
        var drag = {target: null, start: null, stop: null, left: false, right: false, rigid: false};
        var self = this;

        function onMousemove(datum, index) {
            drag.stop = self._getClientXFromEvent(d3.event, drag);
            var distanceTraveled = drag.stop - drag.start;
            var frameAfterDrag = self.frameBeforeDrag.slice(0);
            var minimumFrameWidth = self.config.minimumFrameWidth;
            if (drag.rigid) {
                minimumFrameWidth = self.frameBeforeDrag[1] - self.frameBeforeDrag[0]
            }
            if (drag.left) {
                frameAfterDrag[0] = Math.max(frameAfterDrag[0] + distanceTraveled, 0)
            }
            if (drag.right) {
                frameAfterDrag[1] = Math.min(frameAfterDrag[1] + distanceTraveled, self.previewWidth)
            }
            var currentFrameWidth = frameAfterDrag[1] - frameAfterDrag[0];
            if (currentFrameWidth <= minimumFrameWidth) {
                if (drag.left) {
                    frameAfterDrag[0] = frameAfterDrag[1] - minimumFrameWidth
                }
                if (drag.right) {
                    frameAfterDrag[1] = frameAfterDrag[0] + minimumFrameWidth
                }
                if (frameAfterDrag[0] <= 0) {
                    frameAfterDrag[1] -= frameAfterDrag[0];
                    frameAfterDrag[0] = 0
                }
                if (frameAfterDrag[1] >= self.previewWidth) {
                    frameAfterDrag[0] -= frameAfterDrag[1] - self.previewWidth;
                    frameAfterDrag[1] = self.previewWidth
                }
            }
            self.graphs.forEach(function (graph) {
                var domainScale = d3.scale.linear().interpolate(d3.interpolateRound).domain([0, self.previewWidth]).range(graph.dataDomain());
                var windowAfterDrag = [domainScale(frameAfterDrag[0]), domainScale(frameAfterDrag[1])];
                if (frameAfterDrag[0] === 0) {
                    windowAfterDrag[0] = undefined
                }
                if (frameAfterDrag[1] === self.previewWidth) {
                    windowAfterDrag[1] = undefined
                }
                graph.window.xMin = windowAfterDrag[0];
                graph.window.xMax = windowAfterDrag[1];
                graph.update()
            })
        }

        function onMousedown() {
            drag.target = d3.event.target;
            drag.start = self._getClientXFromEvent(d3.event, drag);
            self.frameBeforeDrag = self.currentFrame.slice();
            d3.event.preventDefault ? d3.event.preventDefault() : d3.event.returnValue = false;
            d3.select(document).on("mousemove.rickshaw_range_slider_preview", onMousemove);
            d3.select(document).on("mouseup.rickshaw_range_slider_preview", onMouseup);
            d3.select(document).on("touchmove.rickshaw_range_slider_preview", onMousemove);
            d3.select(document).on("touchend.rickshaw_range_slider_preview", onMouseup);
            d3.select(document).on("touchcancel.rickshaw_range_slider_preview", onMouseup)
        }

        function onMousedownLeftHandle(datum, index) {
            drag.left = true;
            onMousedown()
        }

        function onMousedownRightHandle(datum, index) {
            drag.right = true;
            onMousedown()
        }

        function onMousedownMiddleHandle(datum, index) {
            drag.left = true;
            drag.right = true;
            drag.rigid = true;
            onMousedown()
        }

        function onMouseup(datum, index) {
            d3.select(document).on("mousemove.rickshaw_range_slider_preview", null);
            d3.select(document).on("mouseup.rickshaw_range_slider_preview", null);
            d3.select(document).on("touchmove.rickshaw_range_slider_preview", null);
            d3.select(document).on("touchend.rickshaw_range_slider_preview", null);
            d3.select(document).on("touchcancel.rickshaw_range_slider_preview", null);
            delete self.frameBeforeDrag;
            drag.left = false;
            drag.right = false;
            drag.rigid = false
        }

        element.select("rect.left_handle").on("mousedown", onMousedownLeftHandle);
        element.select("rect.right_handle").on("mousedown", onMousedownRightHandle);
        element.select("rect.middle_handle").on("mousedown", onMousedownMiddleHandle);
        element.select("rect.left_handle").on("touchstart", onMousedownLeftHandle);
        element.select("rect.right_handle").on("touchstart", onMousedownRightHandle);
        element.select("rect.middle_handle").on("touchstart", onMousedownMiddleHandle)
    }, _getClientXFromEvent: function (event, drag) {
        switch (event.type) {
            case"touchstart":
            case"touchmove":
                var touchList = event.changedTouches;
                var touch = null;
                for (var touchIndex = 0; touchIndex < touchList.length; touchIndex++) {
                    if (touchList[touchIndex].target === drag.target) {
                        touch = touchList[touchIndex];
                        break
                    }
                }
                return touch !== null ? touch.clientX : undefined;
            default:
                return event.clientX
        }
    }
});
Rickshaw.namespace("Rickshaw.Graph.Renderer");
Rickshaw.Graph.Renderer = Rickshaw.Class.create({
    initialize: function (args) {
        this.graph = args.graph;
        this.tension = args.tension || this.tension;
        this.configure(args)
    }, seriesPathFactory: function () {
    }, seriesStrokeFactory: function () {
    }, defaults: function () {
        return {
            tension: .8,
            strokeWidth: 2,
            unstack: true,
            padding: {top: .01, right: 0, bottom: .01, left: 0},
            stroke: false,
            fill: false
        }
    }, domain: function (data) {
        var stackedData = data || this.graph.stackedData || this.graph.stackData();
        var firstPoint = stackedData[0][0];
        if (firstPoint === undefined) {
            return {x: [null, null], y: [null, null]}
        }
        var xMin = firstPoint.x;
        var xMax = firstPoint.x;
        var yMin = firstPoint.y + firstPoint.y0;
        var yMax = firstPoint.y + firstPoint.y0;
        stackedData.forEach(function (series) {
            series.forEach(function (d) {
                if (d.y == null) return;
                var y = d.y + d.y0;
                if (y < yMin) yMin = y;
                if (y > yMax) yMax = y
            });
            if (!series.length) return;
            if (series[0].x < xMin) xMin = series[0].x;
            if (series[series.length - 1].x > xMax) xMax = series[series.length - 1].x
        });
        xMin -= (xMax - xMin) * this.padding.left;
        xMax += (xMax - xMin) * this.padding.right;
        yMin = this.graph.min === "auto" ? yMin : this.graph.min || 0;
        yMax = this.graph.max === undefined ? yMax : this.graph.max;
        if (this.graph.min === "auto" || yMin < 0) {
            yMin -= (yMax - yMin) * this.padding.bottom
        }
        if (this.graph.max === undefined) {
            yMax += (yMax - yMin) * this.padding.top
        }
        return {x: [xMin, xMax], y: [yMin, yMax]}
    }, render: function (args) {
        args = args || {};
        var graph = this.graph;
        var series = args.series || graph.series;
        var vis = args.vis || graph.vis;
        vis.selectAll("*").remove();
        var data = series.filter(function (s) {
            return !s.disabled
        }).map(function (s) {
            return s.stack
        });
        var pathNodes = vis.selectAll("path.path").data(data).enter().append("svg:path").classed("path", true).attr("d", this.seriesPathFactory());
        if (this.stroke) {
            var strokeNodes = vis.selectAll("path.stroke").data(data).enter().append("svg:path").classed("stroke", true).attr("d", this.seriesStrokeFactory())
        }
        var i = 0;
        series.forEach(function (series) {
            if (series.disabled) return;
            series.path = pathNodes[0][i];
            if (this.stroke) series.stroke = strokeNodes[0][i];
            this._styleSeries(series);
            i++
        }, this)
    }, _styleSeries: function (series) {
        var fill = this.fill ? series.color : "none";
        var stroke = this.stroke ? series.color : "none";
        series.path.setAttribute("fill", fill);
        series.path.setAttribute("stroke", stroke);
        series.path.setAttribute("stroke-width", this.strokeWidth);
        if (series.className) {
            d3.select(series.path).classed(series.className, true)
        }
        if (series.className && this.stroke) {
            d3.select(series.stroke).classed(series.className, true)
        }
    }, configure: function (args) {
        args = args || {};
        Rickshaw.keys(this.defaults()).forEach(function (key) {
            if (!args.hasOwnProperty(key)) {
                this[key] = this[key] || this.graph[key] || this.defaults()[key];
                return
            }
            if (typeof this.defaults()[key] == "object") {
                Rickshaw.keys(this.defaults()[key]).forEach(function (k) {
                    this[key][k] = args[key][k] !== undefined ? args[key][k] : this[key][k] !== undefined ? this[key][k] : this.defaults()[key][k]
                }, this)
            } else {
                this[key] = args[key] !== undefined ? args[key] : this[key] !== undefined ? this[key] : this.graph[key] !== undefined ? this.graph[key] : this.defaults()[key]
            }
        }, this)
    }, setStrokeWidth: function (strokeWidth) {
        if (strokeWidth !== undefined) {
            this.strokeWidth = strokeWidth
        }
    }, setTension: function (tension) {
        if (tension !== undefined) {
            this.tension = tension
        }
    }
});
Rickshaw.namespace("Rickshaw.Graph.Renderer.Line");
Rickshaw.Graph.Renderer.Line = Rickshaw.Class.create(Rickshaw.Graph.Renderer, {
    name: "line",
    defaults: function ($super) {
        return Rickshaw.extend($super(), {unstack: true, fill: false, stroke: true})
    },
    seriesPathFactory: function () {
        var graph = this.graph;
        var factory = d3.svg.line().x(function (d) {
            return graph.x(d.x)
        }).y(function (d) {
            return graph.y(d.y)
        }).interpolate(this.graph.interpolation).tension(this.tension);
        factory.defined && factory.defined(function (d) {
            return d.y !== null
        });
        return factory
    }
});
Rickshaw.namespace("Rickshaw.Graph.Renderer.Stack");
Rickshaw.Graph.Renderer.Stack = Rickshaw.Class.create(Rickshaw.Graph.Renderer, {
    name: "stack",
    defaults: function ($super) {
        return Rickshaw.extend($super(), {fill: true, stroke: false, unstack: false})
    },
    seriesPathFactory: function () {
        var graph = this.graph;
        var factory = d3.svg.area().x(function (d) {
            return graph.x(d.x)
        }).y0(function (d) {
            return graph.y(d.y0)
        }).y1(function (d) {
            return graph.y(d.y + d.y0)
        }).interpolate(this.graph.interpolation).tension(this.tension);
        factory.defined && factory.defined(function (d) {
            return d.y !== null
        });
        return factory
    }
});
Rickshaw.namespace("Rickshaw.Graph.Renderer.Bar");
Rickshaw.Graph.Renderer.Bar = Rickshaw.Class.create(Rickshaw.Graph.Renderer, {
    name: "bar", defaults: function ($super) {
        var defaults = Rickshaw.extend($super(), {gapSize: .05, unstack: false});
        delete defaults.tension;
        return defaults
    }, initialize: function ($super, args) {
        args = args || {};
        this.gapSize = args.gapSize || this.gapSize;
        $super(args)
    }, domain: function ($super) {
        var domain = $super();
        var frequentInterval = this._frequentInterval(this.graph.stackedData.slice(-1).shift());
        domain.x[1] += Number(frequentInterval.magnitude);
        return domain
    }, barWidth: function (series) {
        var frequentInterval = this._frequentInterval(series.stack);
        var barWidth = this.graph.x(series.stack[0].x + frequentInterval.magnitude * (1 - this.gapSize));
        return barWidth
    }, render: function (args) {
        args = args || {};
        var graph = this.graph;
        var series = args.series || graph.series;
        var vis = args.vis || graph.vis;
        vis.selectAll("*").remove();
        var barWidth = this.barWidth(series.active()[0]);
        var barXOffset = 0;
        var activeSeriesCount = series.filter(function (s) {
            return !s.disabled
        }).length;
        var seriesBarWidth = this.unstack ? barWidth / activeSeriesCount : barWidth;
        var transform = function (d) {
            var matrix = [1, 0, 0, d.y < 0 ? -1 : 1, 0, d.y < 0 ? graph.y.magnitude(Math.abs(d.y)) * 2 : 0];
            return "matrix(" + matrix.join(",") + ")"
        };
        series.forEach(function (series) {
            if (series.disabled) return;
            var barWidth = this.barWidth(series);
            var nodes = vis.selectAll("path").data(series.stack.filter(function (d) {
                return d.y !== null
            })).enter().append("svg:rect").attr("x", function (d) {
                return graph.x(d.x) + barXOffset
            }).attr("y", function (d) {
                return graph.y(d.y0 + Math.abs(d.y)) * (d.y < 0 ? -1 : 1)
            }).attr("width", seriesBarWidth).attr("height", function (d) {
                return graph.y.magnitude(Math.abs(d.y))
            }).attr("transform", transform);
            Array.prototype.forEach.call(nodes[0], function (n) {
                n.setAttribute("fill", series.color)
            });
            if (this.unstack) barXOffset += seriesBarWidth
        }, this)
    }, _frequentInterval: function (data) {
        var intervalCounts = {};
        for (var i = 0; i < data.length - 1; i++) {
            var interval = data[i + 1].x - data[i].x;
            intervalCounts[interval] = intervalCounts[interval] || 0;
            intervalCounts[interval]++
        }
        var frequentInterval = {count: 0, magnitude: 1};
        Rickshaw.keys(intervalCounts).forEach(function (i) {
            if (frequentInterval.count < intervalCounts[i]) {
                frequentInterval = {count: intervalCounts[i], magnitude: i}
            }
        });
        return frequentInterval
    }
});
Rickshaw.namespace("Rickshaw.Graph.Renderer.Area");
Rickshaw.Graph.Renderer.Area = Rickshaw.Class.create(Rickshaw.Graph.Renderer, {
    name: "area",
    defaults: function ($super) {
        return Rickshaw.extend($super(), {unstack: false, fill: false, stroke: false})
    },
    seriesPathFactory: function () {
        var graph = this.graph;
        var factory = d3.svg.area().x(function (d) {
            return graph.x(d.x)
        }).y0(function (d) {
            return graph.y(d.y0)
        }).y1(function (d) {
            return graph.y(d.y + d.y0)
        }).interpolate(graph.interpolation).tension(this.tension);
        factory.defined && factory.defined(function (d) {
            return d.y !== null
        });
        return factory
    },
    seriesStrokeFactory: function () {
        var graph = this.graph;
        var factory = d3.svg.line().x(function (d) {
            return graph.x(d.x)
        }).y(function (d) {
            return graph.y(d.y + d.y0)
        }).interpolate(graph.interpolation).tension(this.tension);
        factory.defined && factory.defined(function (d) {
            return d.y !== null
        });
        return factory
    },
    render: function (args) {
        args = args || {};
        var graph = this.graph;
        var series = args.series || graph.series;
        var vis = args.vis || graph.vis;
        vis.selectAll("*").remove();
        var method = this.unstack ? "append" : "insert";
        var data = series.filter(function (s) {
            return !s.disabled
        }).map(function (s) {
            return s.stack
        });
        var nodes = vis.selectAll("path").data(data).enter()[method]("svg:g", "g");
        nodes.append("svg:path").attr("d", this.seriesPathFactory()).attr("class", "area");
        if (this.stroke) {
            nodes.append("svg:path").attr("d", this.seriesStrokeFactory()).attr("class", "line")
        }
        var i = 0;
        series.forEach(function (series) {
            if (series.disabled) return;
            series.path = nodes[0][i++];
            this._styleSeries(series)
        }, this)
    },
    _styleSeries: function (series) {
        if (!series.path) return;
        d3.select(series.path).select(".area").attr("fill", series.color);
        if (this.stroke) {
            d3.select(series.path).select(".line").attr("fill", "none").attr("stroke", series.stroke || d3.interpolateRgb(series.color, "black")(.125)).attr("stroke-width", this.strokeWidth)
        }
        if (series.className) {
            series.path.setAttribute("class", series.className)
        }
    }
});
Rickshaw.namespace("Rickshaw.Graph.Renderer.ScatterPlot");
Rickshaw.Graph.Renderer.ScatterPlot = Rickshaw.Class.create(Rickshaw.Graph.Renderer, {
    name: "scatterplot",
    defaults: function ($super) {
        return Rickshaw.extend($super(), {
            unstack: true,
            fill: true,
            stroke: false,
            padding: {top: .01, right: .01, bottom: .01, left: .01},
            dotSize: 4
        })
    },
    initialize: function ($super, args) {
        $super(args)
    },
    render: function (args) {
        args = args || {};
        var graph = this.graph;
        var series = args.series || graph.series;
        var vis = args.vis || graph.vis;
        var dotSize = this.dotSize;
        vis.selectAll("*").remove();
        series.forEach(function (series) {
            if (series.disabled) return;
            var nodes = vis.selectAll("path").data(series.stack.filter(function (d) {
                return d.y !== null
            })).enter().append("svg:circle").attr("cx", function (d) {
                return graph.x(d.x)
            }).attr("cy", function (d) {
                return graph.y(d.y)
            }).attr("r", function (d) {
                return "r" in d ? d.r : dotSize
            });
            if (series.className) {
                nodes.classed(series.className, true)
            }
            Array.prototype.forEach.call(nodes[0], function (n) {
                n.setAttribute("fill", series.color)
            })
        }, this)
    }
});
Rickshaw.namespace("Rickshaw.Graph.Renderer.Multi");
Rickshaw.Graph.Renderer.Multi = Rickshaw.Class.create(Rickshaw.Graph.Renderer, {
    name: "multi",
    initialize: function ($super, args) {
        $super(args)
    },
    defaults: function ($super) {
        return Rickshaw.extend($super(), {unstack: true, fill: false, stroke: true})
    },
    configure: function ($super, args) {
        args = args || {};
        this.config = args;
        $super(args)
    },
    domain: function ($super) {
        this.graph.stackData();
        var domains = [];
        var groups = this._groups();
        this._stack(groups);
        groups.forEach(function (group) {
            var data = group.series.filter(function (s) {
                return !s.disabled
            }).map(function (s) {
                return s.stack
            });
            if (!data.length) return;
            var domain = $super(data);
            domains.push(domain)
        });
        var xMin = d3.min(domains.map(function (d) {
            return d.x[0]
        }));
        var xMax = d3.max(domains.map(function (d) {
            return d.x[1]
        }));
        var yMin = d3.min(domains.map(function (d) {
            return d.y[0]
        }));
        var yMax = d3.max(domains.map(function (d) {
            return d.y[1]
        }));
        return {x: [xMin, xMax], y: [yMin, yMax]}
    },
    _groups: function () {
        var graph = this.graph;
        var renderGroups = {};
        graph.series.forEach(function (series) {
            if (series.disabled) return;
            if (!renderGroups[series.renderer]) {
                var ns = "http://www.w3.org/2000/svg";
                var vis = document.createElementNS(ns, "g");
                graph.vis[0][0].appendChild(vis);
                var renderer = graph._renderers[series.renderer];
                var config = {};
                var defaults = [this.defaults(), renderer.defaults(), this.config, this.graph];
                defaults.forEach(function (d) {
                    Rickshaw.extend(config, d)
                });
                renderer.configure(config);
                renderGroups[series.renderer] = {renderer: renderer, series: [], vis: d3.select(vis)}
            }
            renderGroups[series.renderer].series.push(series)
        }, this);
        var groups = [];
        Object.keys(renderGroups).forEach(function (key) {
            var group = renderGroups[key];
            groups.push(group)
        });
        return groups
    },
    _stack: function (groups) {
        groups.forEach(function (group) {
            var series = group.series.filter(function (series) {
                return !series.disabled
            });
            var data = series.map(function (series) {
                return series.stack
            });
            if (!group.renderer.unstack) {
                var layout = d3.layout.stack();
                var stackedData = Rickshaw.clone(layout(data));
                series.forEach(function (series, index) {
                    series._stack = Rickshaw.clone(stackedData[index])
                })
            }
        }, this);
        return groups
    },
    render: function () {
        this.graph.series.forEach(function (series) {
            if (!series.renderer) {
                throw new Error("Each series needs a renderer for graph 'multi' renderer")
            }
        });
        this.graph.vis.selectAll("*").remove();
        var groups = this._groups();
        groups = this._stack(groups);
        groups.forEach(function (group) {
            var series = group.series.filter(function (series) {
                return !series.disabled
            });
            series.active = function () {
                return series
            };
            group.renderer.render({series: series, vis: group.vis});
            series.forEach(function (s) {
                s.stack = s._stack || s.stack || s.data
            })
        })
    }
});
Rickshaw.namespace("Rickshaw.Graph.Renderer.LinePlot");
Rickshaw.Graph.Renderer.LinePlot = Rickshaw.Class.create(Rickshaw.Graph.Renderer, {
    name: "lineplot",
    defaults: function ($super) {
        return Rickshaw.extend($super(), {
            unstack: true,
            fill: false,
            stroke: true,
            padding: {top: .01, right: .01, bottom: .01, left: .01},
            dotSize: 3,
            strokeWidth: 2
        })
    },
    initialize: function ($super, args) {
        $super(args)
    },
    seriesPathFactory: function () {
        var graph = this.graph;
        var factory = d3.svg.line().x(function (d) {
            return graph.x(d.x)
        }).y(function (d) {
            return graph.y(d.y)
        }).interpolate(this.graph.interpolation).tension(this.tension);
        factory.defined && factory.defined(function (d) {
            return d.y !== null
        });
        return factory
    },
    _renderDots: function () {
        var graph = this.graph;
        graph.series.forEach(function (series) {
            if (series.disabled) return;
            var nodes = graph.vis.selectAll("x").data(series.stack.filter(function (d) {
                return d.y !== null
            })).enter().append("svg:circle").attr("cx", function (d) {
                return graph.x(d.x)
            }).attr("cy", function (d) {
                return graph.y(d.y)
            }).attr("r", function (d) {
                return "r" in d ? d.r : graph.renderer.dotSize
            });
            Array.prototype.forEach.call(nodes[0], function (n) {
                if (!n) return;
                n.setAttribute("data-color", series.color);
                n.setAttribute("fill", "white");
                n.setAttribute("stroke", series.color);
                n.setAttribute("stroke-width", this.strokeWidth)
            }.bind(this))
        }, this)
    },
    _renderLines: function () {
        var graph = this.graph;
        var nodes = graph.vis.selectAll("path").data(this.graph.stackedData).enter().append("svg:path").attr("d", this.seriesPathFactory());
        var i = 0;
        graph.series.forEach(function (series) {
            if (series.disabled) return;
            series.path = nodes[0][i++];
            this._styleSeries(series)
        }, this)
    },
    render: function () {
        var graph = this.graph;
        graph.vis.selectAll("*").remove();
        this._renderLines();
        this._renderDots()
    }
});
Rickshaw.namespace("Rickshaw.Graph.Smoother");
Rickshaw.Graph.Smoother = Rickshaw.Class.create({
    initialize: function (args) {
        this.graph = args.graph;
        this.element = args.element;
        this.aggregationScale = 1;
        this.build();
        this.graph.stackData.hooks.data.push({name: "smoother", orderPosition: 50, f: this.transformer.bind(this)})
    }, build: function () {
        var self = this;
        if (this.element) {
            $(function () {
                $(self.element).slider({
                    min: 1, max: 100, slide: function (event, ui) {
                        self.setScale(ui.value);
                        self.graph.update()
                    }
                })
            })
        }
    }, setScale: function (scale) {
        if (scale < 1) {
            throw"scale out of range: " + scale
        }
        this.aggregationScale = scale;
        this.graph.update()
    }, transformer: function (data) {
        if (this.aggregationScale == 1) return data;
        var aggregatedData = [];
        data.forEach(function (seriesData) {
            var aggregatedSeriesData = [];
            while (seriesData.length) {
                var avgX = 0, avgY = 0;
                var slice = seriesData.splice(0, this.aggregationScale);
                slice.forEach(function (d) {
                    avgX += d.x / slice.length;
                    avgY += d.y / slice.length
                });
                aggregatedSeriesData.push({x: avgX, y: avgY})
            }
            aggregatedData.push(aggregatedSeriesData)
        }.bind(this));
        return aggregatedData
    }
});
Rickshaw.namespace("Rickshaw.Graph.Socketio");
Rickshaw.Graph.Socketio = Rickshaw.Class.create(Rickshaw.Graph.Ajax, {
    request: function () {
        var socket = io.connect(this.dataURL);
        var self = this;
        socket.on("rickshaw", function (data) {
            self.success(data)
        })
    }
});
Rickshaw.namespace("Rickshaw.Series");
Rickshaw.Series = Rickshaw.Class.create(Array, {
    initialize: function (data, palette, options) {
        options = options || {};
        this.palette = new Rickshaw.Color.Palette(palette);
        this.timeBase = typeof options.timeBase === "undefined" ? Math.floor((new Date).getTime() / 1e3) : options.timeBase;
        var timeInterval = typeof options.timeInterval == "undefined" ? 1e3 : options.timeInterval;
        this.setTimeInterval(timeInterval);
        if (data && typeof data == "object" && Array.isArray(data)) {
            data.forEach(function (item) {
                this.addItem(item)
            }, this)
        }
    }, addItem: function (item) {
        if (typeof item.name === "undefined") {
            throw"addItem() needs a name"
        }
        item.color = item.color || this.palette.color(item.name);
        item.data = item.data || [];
        if (item.data.length === 0 && this.length && this.getIndex() > 0) {
            this[0].data.forEach(function (plot) {
                item.data.push({x: plot.x, y: 0})
            })
        } else if (item.data.length === 0) {
            item.data.push({x: this.timeBase - (this.timeInterval || 0), y: 0})
        }
        this.push(item);
        if (this.legend) {
            this.legend.addLine(this.itemByName(item.name))
        }
    }, addData: function (data, x) {
        var index = this.getIndex();
        Rickshaw.keys(data).forEach(function (name) {
            if (!this.itemByName(name)) {
                this.addItem({name: name})
            }
        }, this);
        this.forEach(function (item) {
            item.data.push({x: x || (index * this.timeInterval || 1) + this.timeBase, y: data[item.name] || 0})
        }, this)
    }, getIndex: function () {
        return this[0] && this[0].data && this[0].data.length ? this[0].data.length : 0
    }, itemByName: function (name) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].name == name) return this[i]
        }
    }, setTimeInterval: function (iv) {
        this.timeInterval = iv / 1e3
    }, setTimeBase: function (t) {
        this.timeBase = t
    }, dump: function () {
        var data = {timeBase: this.timeBase, timeInterval: this.timeInterval, items: []};
        this.forEach(function (item) {
            var newItem = {color: item.color, name: item.name, data: []};
            item.data.forEach(function (plot) {
                newItem.data.push({x: plot.x, y: plot.y})
            });
            data.items.push(newItem)
        });
        return data
    }, load: function (data) {
        if (data.timeInterval) {
            this.timeInterval = data.timeInterval
        }
        if (data.timeBase) {
            this.timeBase = data.timeBase
        }
        if (data.items) {
            data.items.forEach(function (item) {
                this.push(item);
                if (this.legend) {
                    this.legend.addLine(this.itemByName(item.name))
                }
            }, this)
        }
    }
});
Rickshaw.Series.zeroFill = function (series) {
    Rickshaw.Series.fill(series, 0)
};
Rickshaw.Series.fill = function (series, fill) {
    var x;
    var i = 0;
    var data = series.map(function (s) {
        return s.data
    });
    while (i < Math.max.apply(null, data.map(function (d) {
        return d.length
    }))) {
        x = Math.min.apply(null, data.filter(function (d) {
            return d[i]
        }).map(function (d) {
            return d[i].x
        }));
        data.forEach(function (d) {
            if (!d[i] || d[i].x != x) {
                d.splice(i, 0, {x: x, y: fill})
            }
        });
        i++
    }
};
Rickshaw.namespace("Rickshaw.Series.FixedDuration");
Rickshaw.Series.FixedDuration = Rickshaw.Class.create(Rickshaw.Series, {
    initialize: function (data, palette, options) {
        options = options || {};
        if (typeof options.timeInterval === "undefined") {
            throw new Error("FixedDuration series requires timeInterval")
        }
        if (typeof options.maxDataPoints === "undefined") {
            throw new Error("FixedDuration series requires maxDataPoints")
        }
        this.palette = new Rickshaw.Color.Palette(palette);
        this.timeBase = typeof options.timeBase === "undefined" ? Math.floor((new Date).getTime() / 1e3) : options.timeBase;
        this.setTimeInterval(options.timeInterval);
        if (this[0] && this[0].data && this[0].data.length) {
            this.currentSize = this[0].data.length;
            this.currentIndex = this[0].data.length
        } else {
            this.currentSize = 0;
            this.currentIndex = 0
        }
        this.maxDataPoints = options.maxDataPoints;
        if (data && typeof data == "object" && Array.isArray(data)) {
            data.forEach(function (item) {
                this.addItem(item)
            }, this);
            this.currentSize += 1;
            this.currentIndex += 1
        }
        this.timeBase -= (this.maxDataPoints - this.currentSize) * this.timeInterval;
        if (typeof this.maxDataPoints !== "undefined" && this.currentSize < this.maxDataPoints) {
            for (var i = this.maxDataPoints - this.currentSize - 1; i > 1; i--) {
                this.currentSize += 1;
                this.currentIndex += 1;
                this.forEach(function (item) {
                    item.data.unshift({x: ((i - 1) * this.timeInterval || 1) + this.timeBase, y: 0, i: i})
                }, this)
            }
        }
    }, addData: function ($super, data, x) {
        $super(data, x);
        this.currentSize += 1;
        this.currentIndex += 1;
        if (this.maxDataPoints !== undefined) {
            while (this.currentSize > this.maxDataPoints) {
                this.dropData()
            }
        }
    }, dropData: function () {
        this.forEach(function (item) {
            item.data.splice(0, 1)
        });
        this.currentSize -= 1
    }, getIndex: function () {
        return this.currentIndex
    }
});

!function () {
    function t(t, n) {
        try {
            for (var e in n) Object.defineProperty(t.prototype, e, {value: n[e], enumerable: !1})
        } catch (r) {
            t.prototype = n
        }
    }

    function n(t) {
        for (var n = -1, e = t.length, r = []; ++n < e;) r.push(t[n]);
        return r
    }

    function e(t) {
        return Array.prototype.slice.call(t)
    }

    function r() {
    }

    function u(t) {
        return t
    }

    function a() {
        return this
    }

    function i() {
        return !0
    }

    function o(t) {
        return "function" == typeof t ? t : function () {
            return t
        }
    }

    function c(t, n, e) {
        return function () {
            var r = e.apply(n, arguments);
            return arguments.length ? t : r
        }
    }

    function l(t) {
        return null != t && !isNaN(t)
    }

    function s(t) {
        return t.length
    }

    function f(t) {
        return null == t
    }

    function h(t) {
        return t.trim().replace(/\s+/g, " ")
    }

    function d(t) {
        for (var n = 1; t * n % 1;) n *= 10;
        return n
    }

    function g() {
    }

    function m(t) {
        function n() {
            for (var n, r = e, u = -1, a = r.length; ++u < a;) (n = r[u].on) && n.apply(this, arguments);
            return t
        }

        var e = [], u = new r;
        return n.on = function (n, r) {
            var a, i = u.get(n);
            return arguments.length < 2 ? i && i.on : (i && (i.on = null, e = e.slice(0, a = e.indexOf(i)).concat(e.slice(a + 1)), u.remove(n)), r && e.push(u.set(n, {on: r})), t)
        }, n
    }

    function p(t, n) {
        return n - (t ? 1 + Math.floor(Math.log(t + Math.pow(10, 1 + Math.floor(Math.log(t) / Math.LN10) - n)) / Math.LN10) : 1)
    }

    function v(t) {
        return t + ""
    }

    function y(t) {
        for (var n = t.lastIndexOf("."), e = n >= 0 ? t.substring(n) : (n = t.length, ""), r = []; n > 0;) r.push(t.substring(n -= 3, n + 3));
        return r.reverse().join(",") + e
    }

    function x(t, n) {
        var e = Math.pow(10, 3 * Math.abs(8 - n));
        return {
            scale: n > 8 ? function (t) {
                return t / e
            } : function (t) {
                return t * e
            }, symbol: t
        }
    }

    function b(t) {
        return function (n) {
            return 0 >= n ? 0 : n >= 1 ? 1 : t(n)
        }
    }

    function M(t) {
        return function (n) {
            return 1 - t(1 - n)
        }
    }

    function _(t) {
        return function (n) {
            return .5 * (.5 > n ? t(2 * n) : 2 - t(2 - 2 * n))
        }
    }

    function w(t) {
        return t
    }

    function k(t) {
        return function (n) {
            return Math.pow(n, t)
        }
    }

    function A(t) {
        return 1 - Math.cos(t * Math.PI / 2)
    }

    function N(t) {
        return Math.pow(2, 10 * (t - 1))
    }

    function S(t) {
        return 1 - Math.sqrt(1 - t * t)
    }

    function C(t, n) {
        var e;
        return arguments.length < 2 && (n = .45), arguments.length < 1 ? (t = 1, e = n / 4) : e = n / (2 * Math.PI) * Math.asin(1 / t), function (r) {
            return 1 + t * Math.pow(2, 10 * -r) * Math.sin(2 * (r - e) * Math.PI / n)
        }
    }

    function T(t) {
        return t || (t = 1.70158), function (n) {
            return n * n * ((t + 1) * n - t)
        }
    }

    function q(t) {
        return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
    }

    function z() {
        d3.event.stopPropagation(), d3.event.preventDefault()
    }

    function E() {
        for (var t, n = d3.event; t = n.sourceEvent;) n = t;
        return n
    }

    function D(t) {
        for (var n = new g, e = 0, r = arguments.length; ++e < r;) n[arguments[e]] = m(n);
        return n.of = function (e, r) {
            return function (u) {
                try {
                    var a = u.sourceEvent = d3.event;
                    u.target = t, d3.event = u, n[u.type].apply(e, r)
                } finally {
                    d3.event = a
                }
            }
        }, n
    }

    function P(t) {
        var n = [t.a, t.b], e = [t.c, t.d], r = F(n), u = L(n, e), a = F(I(e, n, -u)) || 0;
        n[0] * e[1] < e[0] * n[1] && (n[0] *= -1, n[1] *= -1, r *= -1, u *= -1), this.rotate = (r ? Math.atan2(n[1], n[0]) : Math.atan2(-e[0], e[1])) * oa, this.translate = [t.e, t.f], this.scale = [r, a], this.skew = a ? Math.atan2(u, a) * oa : 0
    }

    function L(t, n) {
        return t[0] * n[0] + t[1] * n[1]
    }

    function F(t) {
        var n = Math.sqrt(L(t, t));
        return n && (t[0] /= n, t[1] /= n), n
    }

    function I(t, n, e) {
        return t[0] += e * n[0], t[1] += e * n[1], t
    }

    function H(t) {
        return "transform" == t ? d3.interpolateTransform : d3.interpolate
    }

    function O(t, n) {
        return n = n - (t = +t) ? 1 / (n - t) : 0, function (e) {
            return (e - t) * n
        }
    }

    function R(t, n) {
        return n = n - (t = +t) ? 1 / (n - t) : 0, function (e) {
            return Math.max(0, Math.min(1, (e - t) * n))
        }
    }

    function j() {
    }

    function Y(t, n, e) {
        return new U(t, n, e)
    }

    function U(t, n, e) {
        this.r = t, this.g = n, this.b = e
    }

    function V(t) {
        return 16 > t ? "0" + Math.max(0, t).toString(16) : Math.min(255, t).toString(16)
    }

    function Z(t, n, e) {
        var r, u, a, i = 0, o = 0, c = 0;
        if (r = /([a-z]+)\((.*)\)/i.exec(t)) switch (u = r[2].split(","), r[1]) {
            case"hsl":
                return e(parseFloat(u[0]), parseFloat(u[1]) / 100, parseFloat(u[2]) / 100);
            case"rgb":
                return n(G(u[0]), G(u[1]), G(u[2]))
        }
        return (a = fa.get(t)) ? n(a.r, a.g, a.b) : (null != t && "#" === t.charAt(0) && (4 === t.length ? (i = t.charAt(1), i += i, o = t.charAt(2), o += o, c = t.charAt(3), c += c) : 7 === t.length && (i = t.substring(1, 3), o = t.substring(3, 5), c = t.substring(5, 7)), i = parseInt(i, 16), o = parseInt(o, 16), c = parseInt(c, 16)), n(i, o, c))
    }

    function B(t, n, e) {
        var r, u, a = Math.min(t /= 255, n /= 255, e /= 255), i = Math.max(t, n, e), o = i - a, c = (i + a) / 2;
        return o ? (u = .5 > c ? o / (i + a) : o / (2 - i - a), r = t == i ? (n - e) / o + (e > n ? 6 : 0) : n == i ? (e - t) / o + 2 : (t - n) / o + 4, r *= 60) : u = r = 0, K(r, u, c)
    }

    function X(t, n, e) {
        t = $(t), n = $(n), e = $(e);
        var r = cn((.4124564 * t + .3575761 * n + .1804375 * e) / ma),
            u = cn((.2126729 * t + .7151522 * n + .072175 * e) / pa),
            a = cn((.0193339 * t + .119192 * n + .9503041 * e) / va);
        return en(116 * u - 16, 500 * (r - u), 200 * (u - a))
    }

    function $(t) {
        return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
    }

    function G(t) {
        var n = parseFloat(t);
        return "%" === t.charAt(t.length - 1) ? Math.round(2.55 * n) : n
    }

    function K(t, n, e) {
        return new J(t, n, e)
    }

    function J(t, n, e) {
        this.h = t, this.s = n, this.l = e
    }

    function Q(t, n, e) {
        function r(t) {
            return t > 360 ? t -= 360 : 0 > t && (t += 360), 60 > t ? a + (i - a) * t / 60 : 180 > t ? i : 240 > t ? a + (i - a) * (240 - t) / 60 : a
        }

        function u(t) {
            return Math.round(255 * r(t))
        }

        var a, i;
        return t %= 360, 0 > t && (t += 360), n = 0 > n ? 0 : n > 1 ? 1 : n, e = 0 > e ? 0 : e > 1 ? 1 : e, i = .5 >= e ? e * (1 + n) : e + n - e * n, a = 2 * e - i, Y(u(t + 120), u(t), u(t - 120))
    }

    function W(t, n, e) {
        return new tn(t, n, e)
    }

    function tn(t, n, e) {
        this.h = t, this.c = n, this.l = e
    }

    function nn(t, n, e) {
        return en(e, Math.cos(t *= Math.PI / 180) * n, Math.sin(t) * n)
    }

    function en(t, n, e) {
        return new rn(t, n, e)
    }

    function rn(t, n, e) {
        this.l = t, this.a = n, this.b = e
    }

    function un(t, n, e) {
        var r = (t + 16) / 116, u = r + n / 500, a = r - e / 200;
        return u = on(u) * ma, r = on(r) * pa, a = on(a) * va, Y(ln(3.2404542 * u - 1.5371385 * r - .4985314 * a), ln(-.969266 * u + 1.8760108 * r + .041556 * a), ln(.0556434 * u - .2040259 * r + 1.0572252 * a))
    }

    function an(t, n, e) {
        return W(Math.atan2(e, n) / Math.PI * 180, Math.sqrt(n * n + e * e), t)
    }

    function on(t) {
        return t > .206893034 ? t * t * t : (t - 4 / 29) / 7.787037
    }

    function cn(t) {
        return t > .008856 ? Math.pow(t, 1 / 3) : 7.787037 * t + 4 / 29
    }

    function ln(t) {
        return Math.round(255 * (.00304 >= t ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055))
    }

    function sn(t) {
        return Xu(t, ka), t
    }

    function fn(t) {
        return function () {
            return xa(t, this)
        }
    }

    function hn(t) {
        return function () {
            return ba(t, this)
        }
    }

    function dn(t, n) {
        function e() {
            this.removeAttribute(t)
        }

        function r() {
            this.removeAttributeNS(t.space, t.local)
        }

        function u() {
            this.setAttribute(t, n)
        }

        function a() {
            this.setAttributeNS(t.space, t.local, n)
        }

        function i() {
            var e = n.apply(this, arguments);
            null == e ? this.removeAttribute(t) : this.setAttribute(t, e)
        }

        function o() {
            var e = n.apply(this, arguments);
            null == e ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e)
        }

        return t = d3.ns.qualify(t), null == n ? t.local ? r : e : "function" == typeof n ? t.local ? o : i : t.local ? a : u
    }

    function gn(t) {
        return new RegExp("(?:^|\\s+)" + d3.requote(t) + "(?:\\s+|$)", "g")
    }

    function mn(t, n) {
        function e() {
            for (var e = -1; ++e < u;) t[e](this, n)
        }

        function r() {
            for (var e = -1, r = n.apply(this, arguments); ++e < u;) t[e](this, r)
        }

        t = t.trim().split(/\s+/).map(pn);
        var u = t.length;
        return "function" == typeof n ? r : e
    }

    function pn(t) {
        var n = gn(t);
        return function (e, r) {
            if (u = e.classList) return r ? u.add(t) : u.remove(t);
            var u = e.className, a = null != u.baseVal, i = a ? u.baseVal : u;
            r ? (n.lastIndex = 0, n.test(i) || (i = h(i + " " + t), a ? u.baseVal = i : e.className = i)) : i && (i = h(i.replace(n, " ")), a ? u.baseVal = i : e.className = i)
        }
    }

    function vn(t, n, e) {
        function r() {
            this.style.removeProperty(t)
        }

        function u() {
            this.style.setProperty(t, n, e)
        }

        function a() {
            var r = n.apply(this, arguments);
            null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, e)
        }

        return null == n ? r : "function" == typeof n ? a : u
    }

    function yn(t, n) {
        function e() {
            delete this[t]
        }

        function r() {
            this[t] = n
        }

        function u() {
            var e = n.apply(this, arguments);
            null == e ? delete this[t] : this[t] = e
        }

        return null == n ? e : "function" == typeof n ? u : r
    }

    function xn(t) {
        return {__data__: t}
    }

    function bn(t) {
        return function () {
            return wa(this, t)
        }
    }

    function Mn(t) {
        return arguments.length || (t = d3.ascending), function (n, e) {
            return t(n && n.__data__, e && e.__data__)
        }
    }

    function _n(t, n, e) {
        function r() {
            var n = this[a];
            n && (this.removeEventListener(t, n, n.$), delete this[a])
        }

        function u() {
            function u(t) {
                var e = d3.event;
                d3.event = t, o[0] = i.__data__;
                try {
                    n.apply(i, o)
                } finally {
                    d3.event = e
                }
            }

            var i = this, o = arguments;
            r.call(this), this.addEventListener(t, this[a] = u, u.$ = e), u._ = n
        }

        var a = "__on" + t, i = t.indexOf(".");
        return i > 0 && (t = t.substring(0, i)), n ? u : r
    }

    function wn(t, n) {
        for (var e = 0, r = t.length; r > e; e++) for (var u, a = t[e], i = 0, o = a.length; o > i; i++) (u = a[i]) && n(u, i, e);
        return t
    }

    function kn(t) {
        return Xu(t, Na), t
    }

    function An(t, n, e) {
        Xu(t, Sa);
        var u = new r, a = d3.dispatch("start", "end"), i = La;
        return t.id = n, t.time = e, t.tween = function (n, e) {
            return arguments.length < 2 ? u.get(n) : (null == e ? u.remove(n) : u.set(n, e), t)
        }, t.ease = function (n) {
            return arguments.length ? (i = "function" == typeof n ? n : d3.ease.apply(d3, arguments), t) : i
        }, t.each = function (n, e) {
            return arguments.length < 2 ? Nn.call(t, n) : (a.on(n, e), t)
        }, d3.timer(function (r) {
            return wn(t, function (t, o) {
                function c(r) {
                    return g.active > n ? s() : (g.active = n, u.forEach(function (n, e) {
                        (e = e.call(t, m, o)) && f.push(e)
                    }), a.start.call(t, m, o), l(r) || d3.timer(l, 0, e), 1)
                }

                function l(e) {
                    if (g.active !== n) return s();
                    for (var r = (e - h) / d, u = i(r), c = f.length; c > 0;) f[--c].call(t, u);
                    return r >= 1 ? (s(), Ta = n, a.end.call(t, m, o), Ta = 0, 1) : void 0
                }

                function s() {
                    return --g.count || delete t.__transition__, 1
                }

                var f = [], h = t.delay, d = t.duration,
                    g = (t = t.node).__transition__ || (t.__transition__ = {active: 0, count: 0}), m = t.__data__;
                ++g.count, r >= h ? c(r) : d3.timer(c, h, e)
            })
        }, 0, e), t
    }

    function Nn(t) {
        var n = Ta, e = La, r = Da, u = Pa;
        return Ta = this.id, La = this.ease(), wn(this, function (n, e, r) {
            Da = n.delay, Pa = n.duration, t.call(n = n.node, n.__data__, e, r)
        }), Ta = n, La = e, Da = r, Pa = u, this
    }

    function Sn(t, n, e) {
        return "" != e && Ha
    }

    function Cn(t, n) {
        return d3.tween(t, H(n))
    }

    function Tn() {
        for (var t, n = Date.now(), e = ja; e;) t = n - e.then, t >= e.delay && (e.flush = e.callback(t)), e = e.next;
        var r = qn() - n;
        r > 24 ? (isFinite(r) && (clearTimeout(Ia), Ia = setTimeout(Tn, r)), Fa = 0) : (Fa = 1, Ya(Tn))
    }

    function qn() {
        for (var t = null, n = ja, e = 1 / 0; n;) n.flush ? (delete Ra[n.callback.id], n = t ? t.next = n.next : ja = n.next) : (e = Math.min(e, n.then + n.delay), n = (t = n).next);
        return e
    }

    function zn(t, n) {
        var e = t.ownerSVGElement || t;
        if (e.createSVGPoint) {
            var r = e.createSVGPoint();
            if (0 > Ua && (window.scrollX || window.scrollY)) {
                e = d3.select(document.body).append("svg").style("position", "absolute").style("top", 0).style("left", 0);
                var u = e[0][0].getScreenCTM();
                Ua = !(u.f || u.e), e.remove()
            }
            return Ua ? (r.x = n.pageX, r.y = n.pageY) : (r.x = n.clientX, r.y = n.clientY), r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y]
        }
        var a = t.getBoundingClientRect();
        return [n.clientX - a.left - t.clientLeft, n.clientY - a.top - t.clientTop]
    }

    function En(t) {
        var n = t[0], e = t[t.length - 1];
        return e > n ? [n, e] : [e, n]
    }

    function Dn(t) {
        return t.rangeExtent ? t.rangeExtent() : En(t.range())
    }

    function Pn(t, n) {
        var e, r = 0, u = t.length - 1, a = t[r], i = t[u];
        return a > i && (e = r, r = u, u = e, e = a, a = i, i = e), (n = n(i - a)) && (t[r] = n.floor(a), t[u] = n.ceil(i)), t
    }

    function Ln() {
        return Math
    }

    function Fn(t, n, e, r) {
        function u() {
            var u = Math.min(t.length, n.length) > 2 ? Un : Yn, c = r ? R : O;
            return i = u(t, n, c, e), o = u(n, t, c, d3.interpolate), a
        }

        function a(t) {
            return i(t)
        }

        var i, o;
        return a.invert = function (t) {
            return o(t)
        }, a.domain = function (n) {
            return arguments.length ? (t = n.map(Number), u()) : t
        }, a.range = function (t) {
            return arguments.length ? (n = t, u()) : n
        }, a.rangeRound = function (t) {
            return a.range(t).interpolate(d3.interpolateRound)
        }, a.clamp = function (t) {
            return arguments.length ? (r = t, u()) : r
        }, a.interpolate = function (t) {
            return arguments.length ? (e = t, u()) : e
        }, a.ticks = function (n) {
            return Rn(t, n)
        }, a.tickFormat = function (n) {
            return jn(t, n)
        }, a.nice = function () {
            return Pn(t, Hn), u()
        }, a.copy = function () {
            return Fn(t, n, e, r)
        }, u()
    }

    function In(t, n) {
        return d3.rebind(t, n, "range", "rangeRound", "interpolate", "clamp")
    }

    function Hn(t) {
        return t = Math.pow(10, Math.round(Math.log(t) / Math.LN10) - 1), t && {
            floor: function (n) {
                return Math.floor(n / t) * t
            }, ceil: function (n) {
                return Math.ceil(n / t) * t
            }
        }
    }

    function On(t, n) {
        var e = En(t), r = e[1] - e[0], u = Math.pow(10, Math.floor(Math.log(r / n) / Math.LN10)), a = n / r * u;
        return .15 >= a ? u *= 10 : .35 >= a ? u *= 5 : .75 >= a && (u *= 2), e[0] = Math.ceil(e[0] / u) * u, e[1] = Math.floor(e[1] / u) * u + .5 * u, e[2] = u, e
    }

    function Rn(t, n) {
        return d3.range.apply(d3, On(t, n))
    }

    function jn(t, n) {
        return d3.format(",." + Math.max(0, -Math.floor(Math.log(On(t, n)[2]) / Math.LN10 + .01)) + "f")
    }

    function Yn(t, n, e, r) {
        var u = e(t[0], t[1]), a = r(n[0], n[1]);
        return function (t) {
            return a(u(t))
        }
    }

    function Un(t, n, e, r) {
        var u = [], a = [], i = 0, o = Math.min(t.length, n.length) - 1;
        for (t[o] < t[0] && (t = t.slice().reverse(), n = n.slice().reverse()); ++i <= o;) u.push(e(t[i - 1], t[i])), a.push(r(n[i - 1], n[i]));
        return function (n) {
            var e = d3.bisect(t, n, 1, o) - 1;
            return a[e](u[e](n))
        }
    }

    function Vn(t, n) {
        function e(e) {
            return t(n(e))
        }

        var r = n.pow;
        return e.invert = function (n) {
            return r(t.invert(n))
        }, e.domain = function (u) {
            return arguments.length ? (n = u[0] < 0 ? Bn : Zn, r = n.pow, t.domain(u.map(n)), e) : t.domain().map(r)
        }, e.nice = function () {
            return t.domain(Pn(t.domain(), Ln)), e
        }, e.ticks = function () {
            var e = En(t.domain()), u = [];
            if (e.every(isFinite)) {
                var a = Math.floor(e[0]), i = Math.ceil(e[1]), o = r(e[0]), c = r(e[1]);
                if (n === Bn) for (u.push(r(a)); a++ < i;) for (var l = 9; l > 0; l--) u.push(r(a) * l); else {
                    for (; i > a; a++) for (var l = 1; 10 > l; l++) u.push(r(a) * l);
                    u.push(r(a))
                }
                for (a = 0; u[a] < o; a++) ;
                for (i = u.length; u[i - 1] > c; i--) ;
                u = u.slice(a, i)
            }
            return u
        }, e.tickFormat = function (t, u) {
            if (arguments.length < 2 && (u = Va), arguments.length < 1) return u;
            var a, i = Math.max(.1, t / e.ticks().length),
                o = n === Bn ? (a = -1e-12, Math.floor) : (a = 1e-12, Math.ceil);
            return function (t) {
                return t / r(o(n(t) + a)) <= i ? u(t) : ""
            }
        }, e.copy = function () {
            return Vn(t.copy(), n)
        }, In(e, t)
    }

    function Zn(t) {
        return Math.log(0 > t ? 0 : t) / Math.LN10
    }

    function Bn(t) {
        return -Math.log(t > 0 ? 0 : -t) / Math.LN10
    }

    function Xn(t, n) {
        function e(n) {
            return t(r(n))
        }

        var r = $n(n), u = $n(1 / n);
        return e.invert = function (n) {
            return u(t.invert(n))
        }, e.domain = function (n) {
            return arguments.length ? (t.domain(n.map(r)), e) : t.domain().map(u)
        }, e.ticks = function (t) {
            return Rn(e.domain(), t)
        }, e.tickFormat = function (t) {
            return jn(e.domain(), t)
        }, e.nice = function () {
            return e.domain(Pn(e.domain(), Hn))
        }, e.exponent = function (t) {
            if (!arguments.length) return n;
            var a = e.domain();
            return r = $n(n = t), u = $n(1 / n), e.domain(a)
        }, e.copy = function () {
            return Xn(t.copy(), n)
        }, In(e, t)
    }

    function $n(t) {
        return function (n) {
            return 0 > n ? -Math.pow(-n, t) : Math.pow(n, t)
        }
    }

    function Gn(t, n) {
        function e(n) {
            return i[((a.get(n) || a.set(n, t.push(n))) - 1) % i.length]
        }

        function u(n, e) {
            return d3.range(t.length).map(function (t) {
                return n + e * t
            })
        }

        var a, i, o;
        return e.domain = function (u) {
            if (!arguments.length) return t;
            t = [], a = new r;
            for (var i, o = -1, c = u.length; ++o < c;) a.has(i = u[o]) || a.set(i, t.push(i));
            return e[n.t].apply(e, n.a)
        }, e.range = function (t) {
            return arguments.length ? (i = t, o = 0, n = {t: "range", a: arguments}, e) : i
        }, e.rangePoints = function (r, a) {
            arguments.length < 2 && (a = 0);
            var c = r[0], l = r[1], s = (l - c) / (Math.max(1, t.length - 1) + a);
            return i = u(t.length < 2 ? (c + l) / 2 : c + s * a / 2, s), o = 0, n = {t: "rangePoints", a: arguments}, e
        }, e.rangeBands = function (r, a, c) {
            arguments.length < 2 && (a = 0), arguments.length < 3 && (c = a);
            var l = r[1] < r[0], s = r[l - 0], f = r[1 - l], h = (f - s) / (t.length - a + 2 * c);
            return i = u(s + h * c, h), l && i.reverse(), o = h * (1 - a), n = {t: "rangeBands", a: arguments}, e
        }, e.rangeRoundBands = function (r, a, c) {
            arguments.length < 2 && (a = 0), arguments.length < 3 && (c = a);
            var l = r[1] < r[0], s = r[l - 0], f = r[1 - l], h = Math.floor((f - s) / (t.length - a + 2 * c)),
                d = f - s - (t.length - a) * h;
            return i = u(s + Math.round(d / 2), h), l && i.reverse(), o = Math.round(h * (1 - a)), n = {
                t: "rangeRoundBands",
                a: arguments
            }, e
        }, e.rangeBand = function () {
            return o
        }, e.rangeExtent = function () {
            return En(n.a[0])
        }, e.copy = function () {
            return Gn(t, n)
        }, e.domain(t)
    }

    function Kn(t, n) {
        function e() {
            var e = 0, a = (t.length, n.length);
            for (u = []; ++e < a;) u[e - 1] = d3.quantile(t, e / a);
            return r
        }

        function r(t) {
            return isNaN(t = +t) ? 0 / 0 : n[d3.bisect(u, t)]
        }

        var u;
        return r.domain = function (n) {
            return arguments.length ? (t = n.filter(function (t) {
                return !isNaN(t)
            }).sort(d3.ascending), e()) : t
        }, r.range = function (t) {
            return arguments.length ? (n = t, e()) : n
        }, r.quantiles = function () {
            return u
        }, r.copy = function () {
            return Kn(t, n)
        }, e()
    }

    function Jn(t, n, e) {
        function r(n) {
            return e[Math.max(0, Math.min(i, Math.floor(a * (n - t))))]
        }

        function u() {
            return a = e.length / (n - t), i = e.length - 1, r
        }

        var a, i;
        return r.domain = function (e) {
            return arguments.length ? (t = +e[0], n = +e[e.length - 1], u()) : [t, n]
        }, r.range = function (t) {
            return arguments.length ? (e = t, u()) : e
        }, r.copy = function () {
            return Jn(t, n, e)
        }, u()
    }

    function Qn(t, n) {
        function e(e) {
            return n[d3.bisect(t, e)]
        }

        return e.domain = function (n) {
            return arguments.length ? (t = n, e) : t
        }, e.range = function (t) {
            return arguments.length ? (n = t, e) : n
        }, e.copy = function () {
            return Qn(t, n)
        }, e
    }

    function Wn(t) {
        function n(t) {
            return +t
        }

        return n.invert = n, n.domain = n.range = function (e) {
            return arguments.length ? (t = e.map(n), n) : t
        }, n.ticks = function (n) {
            return Rn(t, n)
        }, n.tickFormat = function (n) {
            return jn(t, n)
        }, n.copy = function () {
            return Wn(t)
        }, n
    }

    function te(t) {
        return t.innerRadius
    }

    function ne(t) {
        return t.outerRadius
    }

    function ee(t) {
        return t.startAngle
    }

    function re(t) {
        return t.endAngle
    }

    function ue(t) {
        function n(n) {
            function i() {
                s.push("M", a(t(f), l))
            }

            for (var c, s = [], f = [], h = -1, d = n.length, g = o(e), m = o(r); ++h < d;) u.call(this, c = n[h], h) ? f.push([+g.call(this, c, h), +m.call(this, c, h)]) : f.length && (i(), f = []);
            return f.length && i(), s.length ? s.join("") : null
        }

        var e = ae, r = ie, u = i, a = oe, c = a.key, l = .7;
        return n.x = function (t) {
            return arguments.length ? (e = t, n) : e
        }, n.y = function (t) {
            return arguments.length ? (r = t, n) : r
        }, n.defined = function (t) {
            return arguments.length ? (u = t, n) : u
        }, n.interpolate = function (t) {
            return arguments.length ? (c = "function" == typeof t ? a = t : (a = Ja.get(t) || oe).key, n) : c
        }, n.tension = function (t) {
            return arguments.length ? (l = t, n) : l
        }, n
    }

    function ae(t) {
        return t[0]
    }

    function ie(t) {
        return t[1]
    }

    function oe(t) {
        return t.join("L")
    }

    function ce(t) {
        return oe(t) + "Z"
    }

    function le(t) {
        for (var n = 0, e = t.length, r = t[0], u = [r[0], ",", r[1]]; ++n < e;) u.push("V", (r = t[n])[1], "H", r[0]);
        return u.join("")
    }

    function se(t) {
        for (var n = 0, e = t.length, r = t[0], u = [r[0], ",", r[1]]; ++n < e;) u.push("H", (r = t[n])[0], "V", r[1]);
        return u.join("")
    }

    function fe(t, n) {
        return t.length < 4 ? oe(t) : t[1] + ge(t.slice(1, t.length - 1), me(t, n))
    }

    function he(t, n) {
        return t.length < 3 ? oe(t) : t[0] + ge((t.push(t[0]), t), me([t[t.length - 2]].concat(t, [t[1]]), n))
    }

    function de(t, n) {
        return t.length < 3 ? oe(t) : t[0] + ge(t, me(t, n))
    }

    function ge(t, n) {
        if (n.length < 1 || t.length != n.length && t.length != n.length + 2) return oe(t);
        var e = t.length != n.length, r = "", u = t[0], a = t[1], i = n[0], o = i, c = 1;
        if (e && (r += "Q" + (a[0] - 2 * i[0] / 3) + "," + (a[1] - 2 * i[1] / 3) + "," + a[0] + "," + a[1], u = t[1], c = 2), n.length > 1) {
            o = n[1], a = t[c], c++, r += "C" + (u[0] + i[0]) + "," + (u[1] + i[1]) + "," + (a[0] - o[0]) + "," + (a[1] - o[1]) + "," + a[0] + "," + a[1];
            for (var l = 2; l < n.length; l++, c++) a = t[c], o = n[l], r += "S" + (a[0] - o[0]) + "," + (a[1] - o[1]) + "," + a[0] + "," + a[1]
        }
        if (e) {
            var s = t[c];
            r += "Q" + (a[0] + 2 * o[0] / 3) + "," + (a[1] + 2 * o[1] / 3) + "," + s[0] + "," + s[1]
        }
        return r
    }

    function me(t, n) {
        for (var e, r = [], u = (1 - n) / 2, a = t[0], i = t[1], o = 1, c = t.length; ++o < c;) e = a, a = i, i = t[o], r.push([u * (i[0] - e[0]), u * (i[1] - e[1])]);
        return r
    }

    function pe(t) {
        if (t.length < 3) return oe(t);
        var n = 1, e = t.length, r = t[0], u = r[0], a = r[1], i = [u, u, u, (r = t[1])[0]], o = [a, a, a, r[1]],
            c = [u, ",", a];
        for (Me(c, i, o); ++n < e;) r = t[n], i.shift(), i.push(r[0]), o.shift(), o.push(r[1]), Me(c, i, o);
        for (n = -1; ++n < 2;) i.shift(), i.push(r[0]), o.shift(), o.push(r[1]), Me(c, i, o);
        return c.join("")
    }

    function ve(t) {
        if (t.length < 4) return oe(t);
        for (var n, e = [], r = -1, u = t.length, a = [0], i = [0]; ++r < 3;) n = t[r], a.push(n[0]), i.push(n[1]);
        for (e.push(be(ti, a) + "," + be(ti, i)), --r; ++r < u;) n = t[r], a.shift(), a.push(n[0]), i.shift(), i.push(n[1]), Me(e, a, i);
        return e.join("")
    }

    function ye(t) {
        for (var n, e, r = -1, u = t.length, a = u + 4, i = [], o = []; ++r < 4;) e = t[r % u], i.push(e[0]), o.push(e[1]);
        for (n = [be(ti, i), ",", be(ti, o)], --r; ++r < a;) e = t[r % u], i.shift(), i.push(e[0]), o.shift(), o.push(e[1]), Me(n, i, o);
        return n.join("")
    }

    function xe(t, n) {
        var e = t.length - 1;
        if (e) for (var r, u, a = t[0][0], i = t[0][1], o = t[e][0] - a, c = t[e][1] - i, l = -1; ++l <= e;) r = t[l], u = l / e, r[0] = n * r[0] + (1 - n) * (a + u * o), r[1] = n * r[1] + (1 - n) * (i + u * c);
        return pe(t)
    }

    function be(t, n) {
        return t[0] * n[0] + t[1] * n[1] + t[2] * n[2] + t[3] * n[3]
    }

    function Me(t, n, e) {
        t.push("C", be(Qa, n), ",", be(Qa, e), ",", be(Wa, n), ",", be(Wa, e), ",", be(ti, n), ",", be(ti, e))
    }

    function _e(t, n) {
        return (n[1] - t[1]) / (n[0] - t[0])
    }

    function we(t) {
        for (var n = 0, e = t.length - 1, r = [], u = t[0], a = t[1], i = r[0] = _e(u, a); ++n < e;) r[n] = (i + (i = _e(u = a, a = t[n + 1]))) / 2;
        return r[n] = i, r
    }

    function ke(t) {
        for (var n, e, r, u, a = [], i = we(t), o = -1, c = t.length - 1; ++o < c;) n = _e(t[o], t[o + 1]), Math.abs(n) < 1e-6 ? i[o] = i[o + 1] = 0 : (e = i[o] / n, r = i[o + 1] / n, u = e * e + r * r, u > 9 && (u = 3 * n / Math.sqrt(u), i[o] = u * e, i[o + 1] = u * r));
        for (o = -1; ++o <= c;) u = (t[Math.min(c, o + 1)][0] - t[Math.max(0, o - 1)][0]) / (6 * (1 + i[o] * i[o])), a.push([u || 0, i[o] * u || 0]);
        return a
    }

    function Ae(t) {
        return t.length < 3 ? oe(t) : t[0] + ge(t, ke(t))
    }

    function Ne(t) {
        for (var n, e, r, u = -1, a = t.length; ++u < a;) n = t[u], e = n[0], r = n[1] + Ga, n[0] = e * Math.cos(r), n[1] = e * Math.sin(r);
        return t
    }

    function Se(t) {
        function n(n) {
            function i() {
                p.push("M", l(t(y), d), h, f(t(v.reverse()), d), "Z")
            }

            for (var s, g, m, p = [], v = [], y = [], x = -1, b = n.length, M = o(e), _ = o(u), w = e === r ? function () {
                return g
            } : o(r), k = u === a ? function () {
                return m
            } : o(a); ++x < b;) c.call(this, s = n[x], x) ? (v.push([g = +M.call(this, s, x), m = +_.call(this, s, x)]), y.push([+w.call(this, s, x), +k.call(this, s, x)])) : v.length && (i(), v = [], y = []);
            return v.length && i(), p.length ? p.join("") : null
        }

        var e = ae, r = ae, u = 0, a = ie, c = i, l = oe, s = l.key, f = l, h = "L", d = .7;
        return n.x = function (t) {
            return arguments.length ? (e = r = t, n) : r
        }, n.x0 = function (t) {
            return arguments.length ? (e = t, n) : e
        }, n.x1 = function (t) {
            return arguments.length ? (r = t, n) : r
        }, n.y = function (t) {
            return arguments.length ? (u = a = t, n) : a
        }, n.y0 = function (t) {
            return arguments.length ? (u = t, n) : u
        }, n.y1 = function (t) {
            return arguments.length ? (a = t, n) : a
        }, n.defined = function (t) {
            return arguments.length ? (c = t, n) : c
        }, n.interpolate = function (t) {
            return arguments.length ? (s = "function" == typeof t ? l = t : (l = Ja.get(t) || oe).key, f = l.reverse || l, h = l.closed ? "M" : "L", n) : s
        }, n.tension = function (t) {
            return arguments.length ? (d = t, n) : d
        }, n
    }

    function Ce(t) {
        return t.source
    }

    function Te(t) {
        return t.target
    }

    function qe(t) {
        return t.radius
    }

    function ze(t) {
        return [t.x, t.y]
    }

    function Ee(t) {
        return function () {
            var n = t.apply(this, arguments), e = n[0], r = n[1] + Ga;
            return [e * Math.cos(r), e * Math.sin(r)]
        }
    }

    function De() {
        return 64
    }

    function Pe() {
        return "circle"
    }

    function Le(t) {
        var n = Math.sqrt(t / Math.PI);
        return "M0," + n + "A" + n + "," + n + " 0 1,1 0," + -n + "A" + n + "," + n + " 0 1,1 0," + n + "Z"
    }

    function Fe(t, n) {
        t.attr("transform", function (t) {
            return "translate(" + n(t) + ",0)"
        })
    }

    function Ie(t, n) {
        t.attr("transform", function (t) {
            return "translate(0," + n(t) + ")"
        })
    }

    function He(t, n, e) {
        if (r = [], e && n.length > 1) {
            for (var r, u, a, i = En(t.domain()), o = -1, c = n.length, l = (n[1] - n[0]) / ++e; ++o < c;) for (u = e; --u > 0;) (a = +n[o] - u * l) >= i[0] && r.push(a);
            for (--o, u = 0; ++u < e && (a = +n[o] + u * l) < i[1];) r.push(a)
        }
        return r
    }

    function Oe() {
        ii || (ii = d3.select("body").append("div").style("visibility", "hidden").style("top", 0).style("height", 0).style("width", 0).style("overflow-y", "scroll").append("div").style("height", "2000px").node().parentNode);
        var t, n = d3.event;
        try {
            ii.scrollTop = 1e3, ii.dispatchEvent(n), t = 1e3 - ii.scrollTop
        } catch (e) {
            t = n.wheelDelta || 5 * -n.detail
        }
        return t
    }

    function Re(t) {
        for (var n = t.source, e = t.target, r = Ye(n, e), u = [n]; n !== r;) n = n.parent, u.push(n);
        for (var a = u.length; e !== r;) u.splice(a, 0, e), e = e.parent;
        return u
    }

    function je(t) {
        for (var n = [], e = t.parent; null != e;) n.push(t), t = e, e = e.parent;
        return n.push(t), n
    }

    function Ye(t, n) {
        if (t === n) return t;
        for (var e = je(t), r = je(n), u = e.pop(), a = r.pop(), i = null; u === a;) i = u, u = e.pop(), a = r.pop();
        return i
    }

    function Ue(t) {
        t.fixed |= 2
    }

    function Ve(t) {
        t.fixed &= 1
    }

    function Ze(t) {
        t.fixed |= 4
    }

    function Be(t) {
        t.fixed &= 3
    }

    function Xe(t, n, e) {
        var r = 0, u = 0;
        if (t.charge = 0, !t.leaf) for (var a, i = t.nodes, o = i.length, c = -1; ++c < o;) a = i[c], null != a && (Xe(a, n, e), t.charge += a.charge, r += a.charge * a.cx, u += a.charge * a.cy);
        if (t.point) {
            t.leaf || (t.point.x += Math.random() - .5, t.point.y += Math.random() - .5);
            var l = n * e[t.point.index];
            t.charge += t.pointCharge = l, r += l * t.point.x, u += l * t.point.y
        }
        t.cx = r / t.charge, t.cy = u / t.charge
    }

    function $e() {
        return 20
    }

    function Ge() {
        return 1
    }

    function Ke(t) {
        return t.x
    }

    function Je(t) {
        return t.y
    }

    function Qe(t, n, e) {
        t.y0 = n, t.y = e
    }

    function We(t) {
        return d3.range(t.length)
    }

    function tr(t) {
        for (var n = -1, e = t[0].length, r = []; ++n < e;) r[n] = 0;
        return r
    }

    function nr(t) {
        for (var n, e = 1, r = 0, u = t[0][1], a = t.length; a > e; ++e) (n = t[e][1]) > u && (r = e, u = n);
        return r
    }

    function er(t) {
        return t.reduce(rr, 0)
    }

    function rr(t, n) {
        return t + n[1]
    }

    function ur(t, n) {
        return ar(t, Math.ceil(Math.log(n.length) / Math.LN2 + 1))
    }

    function ar(t, n) {
        for (var e = -1, r = +t[0], u = (t[1] - r) / n, a = []; ++e <= n;) a[e] = u * e + r;
        return a
    }

    function ir(t) {
        return [d3.min(t), d3.max(t)]
    }

    function or(t, n) {
        return d3.rebind(t, n, "sort", "children", "value"), t.links = fr, t.nodes = function (n) {
            return fi = !0, (t.nodes = t)(n)
        }, t
    }

    function cr(t) {
        return t.children
    }

    function lr(t) {
        return t.value
    }

    function sr(t, n) {
        return n.value - t.value
    }

    function fr(t) {
        return d3.merge(t.map(function (t) {
            return (t.children || []).map(function (n) {
                return {source: t, target: n}
            })
        }))
    }

    function hr(t, n) {
        return t.value - n.value
    }

    function dr(t, n) {
        var e = t._pack_next;
        t._pack_next = n, n._pack_prev = t, n._pack_next = e, e._pack_prev = n
    }

    function gr(t, n) {
        t._pack_next = n, n._pack_prev = t
    }

    function mr(t, n) {
        var e = n.x - t.x, r = n.y - t.y, u = t.r + n.r;
        return u * u - e * e - r * r > .001
    }

    function pr(t) {
        function n(t) {
            s = Math.min(t.x - t.r, s), f = Math.max(t.x + t.r, f), h = Math.min(t.y - t.r, h), d = Math.max(t.y + t.r, d)
        }

        if ((e = t.children) && (l = e.length)) {
            var e, r, u, a, i, o, c, l, s = 1 / 0, f = -1 / 0, h = 1 / 0, d = -1 / 0;
            if (e.forEach(vr), r = e[0], r.x = -r.r, r.y = 0, n(r), l > 1 && (u = e[1], u.x = u.r, u.y = 0, n(u), l > 2)) for (a = e[2], br(r, u, a), n(a), dr(r, a), r._pack_prev = a, dr(a, u), u = r._pack_next, i = 3; l > i; i++) {
                br(r, u, a = e[i]);
                var g = 0, m = 1, p = 1;
                for (o = u._pack_next; o !== u; o = o._pack_next, m++) if (mr(o, a)) {
                    g = 1;
                    break
                }
                if (1 == g) for (c = r._pack_prev; c !== o._pack_prev && !mr(c, a); c = c._pack_prev, p++) ;
                g ? (p > m || m == p && u.r < r.r ? gr(r, u = o) : gr(r = c, u), i--) : (dr(r, a), u = a, n(a))
            }
            var v = (s + f) / 2, y = (h + d) / 2, x = 0;
            for (i = 0; l > i; i++) a = e[i], a.x -= v, a.y -= y, x = Math.max(x, a.r + Math.sqrt(a.x * a.x + a.y * a.y));
            t.r = x, e.forEach(yr)
        }
    }

    function vr(t) {
        t._pack_next = t._pack_prev = t
    }

    function yr(t) {
        delete t._pack_next, delete t._pack_prev
    }

    function xr(t, n, e, r) {
        var u = t.children;
        if (t.x = n += r * t.x, t.y = e += r * t.y, t.r *= r, u) for (var a = -1, i = u.length; ++a < i;) xr(u[a], n, e, r)
    }

    function br(t, n, e) {
        var r = t.r + e.r, u = n.x - t.x, a = n.y - t.y;
        if (r && (u || a)) {
            var i = n.r + e.r, o = u * u + a * a;
            i *= i, r *= r;
            var c = .5 + (r - i) / (2 * o),
                l = Math.sqrt(Math.max(0, 2 * i * (r + o) - (r -= o) * r - i * i)) / (2 * o);
            e.x = t.x + c * u + l * a, e.y = t.y + c * a - l * u
        } else e.x = t.x + r, e.y = t.y
    }

    function Mr(t) {
        return 1 + d3.max(t, function (t) {
            return t.y
        })
    }

    function _r(t) {
        return t.reduce(function (t, n) {
            return t + n.x
        }, 0) / t.length
    }

    function wr(t) {
        var n = t.children;
        return n && n.length ? wr(n[0]) : t
    }

    function kr(t) {
        var n, e = t.children;
        return e && (n = e.length) ? kr(e[n - 1]) : t
    }

    function Ar(t, n) {
        return t.parent == n.parent ? 1 : 2
    }

    function Nr(t) {
        var n = t.children;
        return n && n.length ? n[0] : t._tree.thread
    }

    function Sr(t) {
        var n, e = t.children;
        return e && (n = e.length) ? e[n - 1] : t._tree.thread
    }

    function Cr(t, n) {
        var e = t.children;
        if (e && (u = e.length)) for (var r, u, a = -1; ++a < u;) n(r = Cr(e[a], n), t) > 0 && (t = r);
        return t
    }

    function Tr(t, n) {
        return t.x - n.x
    }

    function qr(t, n) {
        return n.x - t.x
    }

    function zr(t, n) {
        return t.depth - n.depth
    }

    function Er(t, n) {
        function e(t, r) {
            var u = t.children;
            if (u && (i = u.length)) for (var a, i, o = null, c = -1; ++c < i;) a = u[c], e(a, o), o = a;
            n(t, r)
        }

        e(t, null)
    }

    function Dr(t) {
        for (var n, e = 0, r = 0, u = t.children, a = u.length; --a >= 0;) n = u[a]._tree, n.prelim += e, n.mod += e, e += n.shift + (r += n.change)
    }

    function Pr(t, n, e) {
        t = t._tree, n = n._tree;
        var r = e / (n.number - t.number);
        t.change += r, n.change -= r, n.shift += e, n.prelim += e, n.mod += e
    }

    function Lr(t, n, e) {
        return t._tree.ancestor.parent == n.parent ? t._tree.ancestor : e
    }

    function Fr(t) {
        return {x: t.x, y: t.y, dx: t.dx, dy: t.dy}
    }

    function Ir(t, n) {
        var e = t.x + n[3], r = t.y + n[0], u = t.dx - n[1] - n[3], a = t.dy - n[0] - n[2];
        return 0 > u && (e += u / 2, u = 0), 0 > a && (r += a / 2, a = 0), {x: e, y: r, dx: u, dy: a}
    }

    function Hr(t, n) {
        function e(t, r) {
            d3.text(t, n, function (t) {
                r(t && e.parse(t))
            })
        }

        function r(n) {
            return n.map(u).join(t)
        }

        function u(t) {
            return i.test(t) ? '"' + t.replace(/\"/g, '""') + '"' : t
        }

        var a = new RegExp("\r\n|[" + t + "\r\n]", "g"), i = new RegExp('["' + t + "\n]"), o = t.charCodeAt(0);
        return e.parse = function (t) {
            var n;
            return e.parseRows(t, function (t, e) {
                if (e) {
                    for (var r = {}, u = -1, a = n.length; ++u < a;) r[n[u]] = t[u];
                    return r
                }
                return n = t, null
            })
        }, e.parseRows = function (t, n) {
            function e() {
                if (a.lastIndex >= t.length) return c;
                if (u) return u = !1, i;
                var n = a.lastIndex;
                if (34 === t.charCodeAt(n)) {
                    for (var e = n; e++ < t.length;) if (34 === t.charCodeAt(e)) {
                        if (34 !== t.charCodeAt(e + 1)) break;
                        e++
                    }
                    a.lastIndex = e + 2;
                    var r = t.charCodeAt(e + 1);
                    return 13 === r ? (u = !0, 10 === t.charCodeAt(e + 2) && a.lastIndex++) : 10 === r && (u = !0), t.substring(n + 1, e).replace(/""/g, '"')
                }
                var l = a.exec(t);
                return l ? (u = l[0].charCodeAt(0) !== o, t.substring(n, l.index)) : (a.lastIndex = t.length, t.substring(n))
            }

            var r, u, i = {}, c = {}, l = [], s = 0;
            for (a.lastIndex = 0; (r = e()) !== c;) {
                for (var f = []; r !== i && r !== c;) f.push(r), r = e();
                (!n || (f = n(f, s++))) && l.push(f)
            }
            return l
        }, e.format = function (t) {
            return t.map(r).join("\n")
        }, e
    }

    function Or(t, n) {
        return function (e) {
            return e && t.hasOwnProperty(e.type) ? t[e.type](e) : n
        }
    }

    function Rr(t) {
        return "m0," + t + "a" + t + "," + t + " 0 1,1 0," + -2 * t + "a" + t + "," + t + " 0 1,1 0," + 2 * t + "z"
    }

    function jr(t, n) {
        di.hasOwnProperty(t.type) && di[t.type](t, n)
    }

    function Yr(t, n) {
        jr(t.geometry, n)
    }

    function Ur(t, n) {
        for (var e = t.features, r = 0, u = e.length; u > r; r++) jr(e[r].geometry, n)
    }

    function Vr(t, n) {
        for (var e = t.geometries, r = 0, u = e.length; u > r; r++) jr(e[r], n)
    }

    function Zr(t, n) {
        for (var e = t.coordinates, r = 0, u = e.length; u > r; r++) n.apply(null, e[r])
    }

    function Br(t, n) {
        for (var e = t.coordinates, r = 0, u = e.length; u > r; r++) for (var a = e[r], i = 0, o = a.length; o > i; i++) n.apply(null, a[i])
    }

    function Xr(t, n) {
        for (var e = t.coordinates, r = 0, u = e.length; u > r; r++) for (var a = e[r][0], i = 0, o = a.length; o > i; i++) n.apply(null, a[i])
    }

    function $r(t, n) {
        n.apply(null, t.coordinates)
    }

    function Gr(t, n) {
        for (var e = t.coordinates[0], r = 0, u = e.length; u > r; r++) n.apply(null, e[r])
    }

    function Kr(t) {
        return t.source
    }

    function Jr(t) {
        return t.target
    }

    function Qr() {
        function t(t) {
            var n = Math.sin(t *= d) * g, e = Math.sin(d - t) * g, r = e * a + n * f, o = e * i + n * h,
                c = e * u + n * s;
            return [Math.atan2(o, r) / hi, Math.atan2(c, Math.sqrt(r * r + o * o)) / hi]
        }

        var n, e, r, u, a, i, o, c, l, s, f, h, d, g;
        return t.distance = function () {
            return null == d && (g = 1 / Math.sin(d = Math.acos(Math.max(-1, Math.min(1, u * s + r * l * Math.cos(o - n)))))), d
        }, t.source = function (o) {
            var c = Math.cos(n = o[0] * hi), l = Math.sin(n);
            return r = Math.cos(e = o[1] * hi), u = Math.sin(e), a = r * c, i = r * l, d = null, t
        }, t.target = function (n) {
            var e = Math.cos(o = n[0] * hi), r = Math.sin(o);
            return l = Math.cos(c = n[1] * hi), s = Math.sin(c), f = l * e, h = l * r, d = null, t
        }, t
    }

    function Wr(t, n) {
        var e = Qr().source(t).target(n);
        return e.distance(), e
    }

    function tu(t) {
        for (var n = 0, e = 0; ;) {
            if (t(n, e)) return [n, e];
            0 === n ? (n = e + 1, e = 0) : (n -= 1, e += 1)
        }
    }

    function nu(t, n, e, r) {
        var u, a, i, o, c, l, s;
        return u = r[t], a = u[0], i = u[1], u = r[n], o = u[0], c = u[1], u = r[e], l = u[0], s = u[1], (s - i) * (o - a) - (c - i) * (l - a) > 0
    }

    function eu(t, n, e) {
        return (e[0] - n[0]) * (t[1] - n[1]) < (e[1] - n[1]) * (t[0] - n[0])
    }

    function ru(t, n, e, r) {
        var u = t[0], a = n[0], i = e[0], o = r[0], c = t[1], l = n[1], s = e[1], f = r[1], h = u - i, d = a - u,
            g = o - i, m = c - s, p = l - c, v = f - s, y = (g * m - v * h) / (v * d - g * p);
        return [u + y * d, c + y * p]
    }

    function uu(t, n) {
        var e = {
            list: t.map(function (t, n) {
                return {index: n, x: t[0], y: t[1]}
            }).sort(function (t, n) {
                return t.y < n.y ? -1 : t.y > n.y ? 1 : t.x < n.x ? -1 : t.x > n.x ? 1 : 0
            }), bottomSite: null
        }, r = {
            list: [], leftEnd: null, rightEnd: null, init: function () {
                r.leftEnd = r.createHalfEdge(null, "l"), r.rightEnd = r.createHalfEdge(null, "l"), r.leftEnd.r = r.rightEnd, r.rightEnd.l = r.leftEnd, r.list.unshift(r.leftEnd, r.rightEnd)
            }, createHalfEdge: function (t, n) {
                return {edge: t, side: n, vertex: null, l: null, r: null}
            }, insert: function (t, n) {
                n.l = t, n.r = t.r, t.r.l = n, t.r = n
            }, leftBound: function (t) {
                var n = r.leftEnd;
                do n = n.r; while (n != r.rightEnd && u.rightOf(n, t));
                return n = n.l
            }, del: function (t) {
                t.l.r = t.r, t.r.l = t.l, t.edge = null
            }, right: function (t) {
                return t.r
            }, left: function (t) {
                return t.l
            }, leftRegion: function (t) {
                return null == t.edge ? e.bottomSite : t.edge.region[t.side]
            }, rightRegion: function (t) {
                return null == t.edge ? e.bottomSite : t.edge.region[pi[t.side]]
            }
        }, u = {
            bisect: function (t, n) {
                var e = {region: {l: t, r: n}, ep: {l: null, r: null}}, r = n.x - t.x, u = n.y - t.y,
                    a = r > 0 ? r : -r, i = u > 0 ? u : -u;
                return e.c = t.x * r + t.y * u + .5 * (r * r + u * u), a > i ? (e.a = 1, e.b = u / r, e.c /= r) : (e.b = 1, e.a = r / u, e.c /= u), e
            }, intersect: function (t, n) {
                var e = t.edge, r = n.edge;
                if (!e || !r || e.region.r == r.region.r) return null;
                var u = e.a * r.b - e.b * r.a;
                if (Math.abs(u) < 1e-10) return null;
                var a, i, o = (e.c * r.b - r.c * e.b) / u, c = (r.c * e.a - e.c * r.a) / u, l = e.region.r,
                    s = r.region.r;
                l.y < s.y || l.y == s.y && l.x < s.x ? (a = t, i = e) : (a = n, i = r);
                var f = o >= i.region.r.x;
                return f && "l" === a.side || !f && "r" === a.side ? null : {x: o, y: c}
            }, rightOf: function (t, n) {
                var e = t.edge, r = e.region.r, u = n.x > r.x;
                if (u && "l" === t.side) return 1;
                if (!u && "r" === t.side) return 0;
                if (1 === e.a) {
                    var a = n.y - r.y, i = n.x - r.x, o = 0, c = 0;
                    if (!u && e.b < 0 || u && e.b >= 0 ? c = o = a >= e.b * i : (c = n.x + n.y * e.b > e.c, e.b < 0 && (c = !c), c || (o = 1)), !o) {
                        var l = r.x - e.region.l.x;
                        c = e.b * (i * i - a * a) < l * a * (1 + 2 * i / l + e.b * e.b), e.b < 0 && (c = !c)
                    }
                } else {
                    var s = e.c - e.a * n.x, f = n.y - s, h = n.x - r.x, d = s - r.y;
                    c = f * f > h * h + d * d
                }
                return "l" === t.side ? c : !c
            }, endPoint: function (t, e, r) {
                t.ep[e] = r, t.ep[pi[e]] && n(t)
            }, distance: function (t, n) {
                var e = t.x - n.x, r = t.y - n.y;
                return Math.sqrt(e * e + r * r)
            }
        }, a = {
            list: [], insert: function (t, n, e) {
                t.vertex = n, t.ystar = n.y + e;
                for (var r = 0, u = a.list, i = u.length; i > r; r++) {
                    var o = u[r];
                    if (!(t.ystar > o.ystar || t.ystar == o.ystar && n.x > o.vertex.x)) break
                }
                u.splice(r, 0, t)
            }, del: function (t) {
                for (var n = 0, e = a.list, r = e.length; r > n && e[n] != t; ++n) ;
                e.splice(n, 1)
            }, empty: function () {
                return 0 === a.list.length
            }, nextEvent: function (t) {
                for (var n = 0, e = a.list, r = e.length; r > n; ++n) if (e[n] == t) return e[n + 1];
                return null
            }, min: function () {
                var t = a.list[0];
                return {x: t.vertex.x, y: t.ystar}
            }, extractMin: function () {
                return a.list.shift()
            }
        };
        r.init(), e.bottomSite = e.list.shift();
        for (var i, o, c, l, s, f, h, d, g, m, p, v, y, x = e.list.shift(); ;) if (a.empty() || (i = a.min()), x && (a.empty() || x.y < i.y || x.y == i.y && x.x < i.x)) o = r.leftBound(x), c = r.right(o), h = r.rightRegion(o), v = u.bisect(h, x), f = r.createHalfEdge(v, "l"), r.insert(o, f), m = u.intersect(o, f), m && (a.del(o), a.insert(o, m, u.distance(m, x))), o = f, f = r.createHalfEdge(v, "r"), r.insert(o, f), m = u.intersect(f, c), m && a.insert(f, m, u.distance(m, x)), x = e.list.shift(); else {
            if (a.empty()) break;
            o = a.extractMin(), l = r.left(o), c = r.right(o), s = r.right(c), h = r.leftRegion(o), d = r.rightRegion(c), p = o.vertex, u.endPoint(o.edge, o.side, p), u.endPoint(c.edge, c.side, p), r.del(o), a.del(c), r.del(c), y = "l", h.y > d.y && (g = h, h = d, d = g, y = "r"), v = u.bisect(h, d), f = r.createHalfEdge(v, y), r.insert(l, f), u.endPoint(v, pi[y], p), m = u.intersect(l, f), m && (a.del(l), a.insert(l, m, u.distance(m, h))), m = u.intersect(f, s), m && a.insert(f, m, u.distance(m, h))
        }
        for (o = r.right(r.leftEnd); o != r.rightEnd; o = r.right(o)) n(o.edge)
    }

    function au() {
        return {leaf: !0, nodes: [], point: null}
    }

    function iu(t, n, e, r, u, a) {
        if (!t(n, e, r, u, a)) {
            var i = .5 * (e + u), o = .5 * (r + a), c = n.nodes;
            c[0] && iu(t, c[0], e, r, i, o), c[1] && iu(t, c[1], i, r, u, o), c[2] && iu(t, c[2], e, o, i, a), c[3] && iu(t, c[3], i, o, u, a)
        }
    }

    function ou(t) {
        return {x: t[0], y: t[1]}
    }

    function cu() {
        this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
    }

    function lu(t) {
        return t.substring(0, 3)
    }

    function su(t, n, e, r) {
        for (var u, a, i = 0, o = n.length, c = e.length; o > i;) {
            if (r >= c) return -1;
            if (u = n.charCodeAt(i++), 37 == u) {
                if (a = Hi[n.charAt(i++)], !a || (r = a(t, e, r)) < 0) return -1
            } else if (u != e.charCodeAt(r++)) return -1
        }
        return r
    }

    function fu(t) {
        return new RegExp("^(?:" + t.map(d3.requote).join("|") + ")", "i")
    }

    function hu(t) {
        for (var n = new r, e = -1, u = t.length; ++e < u;) n.set(t[e].toLowerCase(), e);
        return n
    }

    function du(t, n, e) {
        Ei.lastIndex = 0;
        var r = Ei.exec(n.substring(e));
        return r ? e += r[0].length : -1
    }

    function gu(t, n, e) {
        zi.lastIndex = 0;
        var r = zi.exec(n.substring(e));
        return r ? e += r[0].length : -1
    }

    function mu(t, n, e) {
        Li.lastIndex = 0;
        var r = Li.exec(n.substring(e));
        return r ? (t.m = Fi.get(r[0].toLowerCase()), e += r[0].length) : -1
    }

    function pu(t, n, e) {
        Di.lastIndex = 0;
        var r = Di.exec(n.substring(e));
        return r ? (t.m = Pi.get(r[0].toLowerCase()), e += r[0].length) : -1
    }

    function vu(t, n, e) {
        return su(t, Ii.c.toString(), n, e)
    }

    function yu(t, n, e) {
        return su(t, Ii.x.toString(), n, e)
    }

    function xu(t, n, e) {
        return su(t, Ii.X.toString(), n, e)
    }

    function bu(t, n, e) {
        Oi.lastIndex = 0;
        var r = Oi.exec(n.substring(e, e + 4));
        return r ? (t.y = +r[0], e += r[0].length) : -1
    }

    function Mu(t, n, e) {
        Oi.lastIndex = 0;
        var r = Oi.exec(n.substring(e, e + 2));
        return r ? (t.y = _u(+r[0]), e += r[0].length) : -1
    }

    function _u(t) {
        return t + (t > 68 ? 1900 : 2e3)
    }

    function wu(t, n, e) {
        Oi.lastIndex = 0;
        var r = Oi.exec(n.substring(e, e + 2));
        return r ? (t.m = r[0] - 1, e += r[0].length) : -1
    }

    function ku(t, n, e) {
        Oi.lastIndex = 0;
        var r = Oi.exec(n.substring(e, e + 2));
        return r ? (t.d = +r[0], e += r[0].length) : -1
    }

    function Au(t, n, e) {
        Oi.lastIndex = 0;
        var r = Oi.exec(n.substring(e, e + 2));
        return r ? (t.H = +r[0], e += r[0].length) : -1
    }

    function Nu(t, n, e) {
        Oi.lastIndex = 0;
        var r = Oi.exec(n.substring(e, e + 2));
        return r ? (t.M = +r[0], e += r[0].length) : -1
    }

    function Su(t, n, e) {
        Oi.lastIndex = 0;
        var r = Oi.exec(n.substring(e, e + 2));
        return r ? (t.S = +r[0], e += r[0].length) : -1
    }

    function Cu(t, n, e) {
        Oi.lastIndex = 0;
        var r = Oi.exec(n.substring(e, e + 3));
        return r ? (t.L = +r[0], e += r[0].length) : -1
    }

    function Tu(t, n, e) {
        var r = Ri.get(n.substring(e, e += 2).toLowerCase());
        return null == r ? -1 : (t.p = r, e)
    }

    function qu(t) {
        var n = t.getTimezoneOffset(), e = n > 0 ? "-" : "+", r = ~~(Math.abs(n) / 60), u = Math.abs(n) % 60;
        return e + Si(r) + Si(u)
    }

    function zu(t) {
        return t.toISOString()
    }

    function Eu(t, n, e) {
        function r(n) {
            var e = t(n), r = a(e, 1);
            return r - n > n - e ? e : r
        }

        function u(e) {
            return n(e = t(new vi(e - 1)), 1), e
        }

        function a(t, e) {
            return n(t = new vi(+t), e), t
        }

        function i(t, r, a) {
            var i = u(t), o = [];
            if (a > 1) for (; r > i;) e(i) % a || o.push(new Date(+i)), n(i, 1); else for (; r > i;) o.push(new Date(+i)), n(i, 1);
            return o
        }

        function o(t, n, e) {
            try {
                vi = cu;
                var r = new cu;
                return r._ = t, i(r, n, e)
            } finally {
                vi = Date
            }
        }

        t.floor = t, t.round = r, t.ceil = u, t.offset = a, t.range = i;
        var c = t.utc = Du(t);
        return c.floor = c, c.round = Du(r), c.ceil = Du(u), c.offset = Du(a), c.range = o, t
    }

    function Du(t) {
        return function (n, e) {
            try {
                vi = cu;
                var r = new cu;
                return r._ = n, t(r, e)._
            } finally {
                vi = Date
            }
        }
    }

    function Pu(t, n, e) {
        function r(n) {
            return t(n)
        }

        return r.invert = function (n) {
            return Fu(t.invert(n))
        }, r.domain = function (n) {
            return arguments.length ? (t.domain(n), r) : t.domain().map(Fu)
        }, r.nice = function (t) {
            return r.domain(Pn(r.domain(), function () {
                return t
            }))
        }, r.ticks = function (e, u) {
            var a = Lu(r.domain());
            if ("function" != typeof e) {
                var i = a[1] - a[0], o = i / e, c = d3.bisect(Yi, o);
                if (c == Yi.length) return n.year(a, e);
                if (!c) return t.ticks(e).map(Fu);
                Math.log(o / Yi[c - 1]) < Math.log(Yi[c] / o) && --c, e = n[c], u = e[1], e = e[0].range
            }
            return e(a[0], new Date(+a[1] + 1), u)
        }, r.tickFormat = function () {
            return e
        }, r.copy = function () {
            return Pu(t.copy(), n, e)
        }, d3.rebind(r, t, "range", "rangeRound", "interpolate", "clamp")
    }

    function Lu(t) {
        var n = t[0], e = t[t.length - 1];
        return e > n ? [n, e] : [e, n]
    }

    function Fu(t) {
        return new Date(t)
    }

    function Iu(t) {
        return function (n) {
            for (var e = t.length - 1, r = t[e]; !r[1](n);) r = t[--e];
            return r[0](n)
        }
    }

    function Hu(t) {
        var n = new Date(t, 0, 1);
        return n.setFullYear(t), n
    }

    function Ou(t) {
        var n = t.getFullYear(), e = Hu(n), r = Hu(n + 1);
        return n + (t - e) / (r - e)
    }

    function Ru(t) {
        var n = new Date(Date.UTC(t, 0, 1));
        return n.setUTCFullYear(t), n
    }

    function ju(t) {
        var n = t.getUTCFullYear(), e = Ru(n), r = Ru(n + 1);
        return n + (t - e) / (r - e)
    }

    Date.now || (Date.now = function () {
        return +new Date
    });
    try {
        document.createElement("div").style.setProperty("opacity", 0, "")
    } catch (Yu) {
        var Uu = CSSStyleDeclaration.prototype, Vu = Uu.setProperty;
        Uu.setProperty = function (t, n, e) {
            Vu.call(this, t, n + "", e)
        }
    }
    d3 = {version: "2.10.3"};
    var Zu = e;
    try {
        Zu(document.documentElement.childNodes)[0].nodeType
    } catch (Bu) {
        Zu = n
    }
    var Xu = [].__proto__ ? function (t, n) {
        t.__proto__ = n
    } : function (t, n) {
        for (var e in n) t[e] = n[e]
    };
    d3.map = function (t) {
        var n = new r;
        for (var e in t) n.set(e, t[e]);
        return n
    }, t(r, {
        has: function (t) {
            return $u + t in this
        }, get: function (t) {
            return this[$u + t]
        }, set: function (t, n) {
            return this[$u + t] = n
        }, remove: function (t) {
            return t = $u + t, t in this && delete this[t]
        }, keys: function () {
            var t = [];
            return this.forEach(function (n) {
                t.push(n)
            }), t
        }, values: function () {
            var t = [];
            return this.forEach(function (n, e) {
                t.push(e)
            }), t
        }, entries: function () {
            var t = [];
            return this.forEach(function (n, e) {
                t.push({key: n, value: e})
            }), t
        }, forEach: function (t) {
            for (var n in this) n.charCodeAt(0) === Gu && t.call(this, n.substring(1), this[n])
        }
    });
    var $u = "\x00", Gu = $u.charCodeAt(0);
    d3.functor = o, d3.rebind = function (t, n) {
        for (var e, r = 1, u = arguments.length; ++r < u;) t[e = arguments[r]] = c(t, n, n[e]);
        return t
    }, d3.ascending = function (t, n) {
        return n > t ? -1 : t > n ? 1 : t >= n ? 0 : 0 / 0
    }, d3.descending = function (t, n) {
        return t > n ? -1 : n > t ? 1 : n >= t ? 0 : 0 / 0
    }, d3.mean = function (t, n) {
        var e, r = t.length, u = 0, a = -1, i = 0;
        if (1 === arguments.length) for (; ++a < r;) l(e = t[a]) && (u += (e - u) / ++i); else for (; ++a < r;) l(e = n.call(t, t[a], a)) && (u += (e - u) / ++i);
        return i ? u : void 0
    }, d3.median = function (t, n) {
        return arguments.length > 1 && (t = t.map(n)), t = t.filter(l), t.length ? d3.quantile(t.sort(d3.ascending), .5) : void 0
    }, d3.min = function (t, n) {
        var e, r, u = -1, a = t.length;
        if (1 === arguments.length) {
            for (; ++u < a && (null == (e = t[u]) || e != e);) e = void 0;
            for (; ++u < a;) null != (r = t[u]) && e > r && (e = r)
        } else {
            for (; ++u < a && (null == (e = n.call(t, t[u], u)) || e != e);) e = void 0;
            for (; ++u < a;) null != (r = n.call(t, t[u], u)) && e > r && (e = r)
        }
        return e
    }, d3.max = function (t, n) {
        var e, r, u = -1, a = t.length;
        if (1 === arguments.length) {
            for (; ++u < a && (null == (e = t[u]) || e != e);) e = void 0;
            for (; ++u < a;) null != (r = t[u]) && r > e && (e = r)
        } else {
            for (; ++u < a && (null == (e = n.call(t, t[u], u)) || e != e);) e = void 0;
            for (; ++u < a;) null != (r = n.call(t, t[u], u)) && r > e && (e = r)
        }
        return e
    }, d3.extent = function (t, n) {
        var e, r, u, a = -1, i = t.length;
        if (1 === arguments.length) {
            for (; ++a < i && (null == (e = u = t[a]) || e != e);) e = u = void 0;
            for (; ++a < i;) null != (r = t[a]) && (e > r && (e = r), r > u && (u = r))
        } else {
            for (; ++a < i && (null == (e = u = n.call(t, t[a], a)) || e != e);) e = void 0;
            for (; ++a < i;) null != (r = n.call(t, t[a], a)) && (e > r && (e = r), r > u && (u = r))
        }
        return [e, u]
    }, d3.random = {
        normal: function (t, n) {
            var e = arguments.length;
            return 2 > e && (n = 1), 1 > e && (t = 0), function () {
                var e, r, u;
                do e = 2 * Math.random() - 1, r = 2 * Math.random() - 1, u = e * e + r * r; while (!u || u > 1);
                return t + n * e * Math.sqrt(-2 * Math.log(u) / u)
            }
        }, logNormal: function (t, n) {
            var e = arguments.length;
            2 > e && (n = 1), 1 > e && (t = 0);
            var r = d3.random.normal();
            return function () {
                return Math.exp(t + n * r())
            }
        }, irwinHall: function (t) {
            return function () {
                for (var n = 0, e = 0; t > e; e++) n += Math.random();
                return n / t
            }
        }
    }, d3.sum = function (t, n) {
        var e, r = 0, u = t.length, a = -1;
        if (1 === arguments.length) for (; ++a < u;) isNaN(e = +t[a]) || (r += e); else for (; ++a < u;) isNaN(e = +n.call(t, t[a], a)) || (r += e);
        return r
    }, d3.quantile = function (t, n) {
        var e = (t.length - 1) * n + 1, r = Math.floor(e), u = t[r - 1], a = e - r;
        return a ? u + a * (t[r] - u) : u
    }, d3.transpose = function (t) {
        return d3.zip.apply(d3, t)
    }, d3.zip = function () {
        if (!(r = arguments.length)) return [];
        for (var t = -1, n = d3.min(arguments, s), e = new Array(n); ++t < n;) for (var r, u = -1, a = e[t] = new Array(r); ++u < r;) a[u] = arguments[u][t];
        return e
    }, d3.bisector = function (t) {
        return {
            left: function (n, e, r, u) {
                for (arguments.length < 3 && (r = 0), arguments.length < 4 && (u = n.length); u > r;) {
                    var a = r + u >>> 1;
                    t.call(n, n[a], a) < e ? r = a + 1 : u = a
                }
                return r
            }, right: function (n, e, r, u) {
                for (arguments.length < 3 && (r = 0), arguments.length < 4 && (u = n.length); u > r;) {
                    var a = r + u >>> 1;
                    e < t.call(n, n[a], a) ? u = a : r = a + 1
                }
                return r
            }
        }
    };
    var Ku = d3.bisector(function (t) {
        return t
    });
    d3.bisectLeft = Ku.left, d3.bisect = d3.bisectRight = Ku.right, d3.first = function (t, n) {
        var e, r = 0, u = t.length, a = t[0];
        for (1 === arguments.length && (n = d3.ascending); ++r < u;) n.call(t, a, e = t[r]) > 0 && (a = e);
        return a
    }, d3.last = function (t, n) {
        var e, r = 0, u = t.length, a = t[0];
        for (1 === arguments.length && (n = d3.ascending); ++r < u;) n.call(t, a, e = t[r]) <= 0 && (a = e);
        return a
    }, d3.nest = function () {
        function t(n, o) {
            if (o >= i.length) return u ? u.call(a, n) : e ? n.sort(e) : n;
            for (var c, l, s, f = -1, h = n.length, d = i[o++], g = new r, m = {}; ++f < h;) (s = g.get(c = d(l = n[f]))) ? s.push(l) : g.set(c, [l]);
            return g.forEach(function (n, e) {
                m[n] = t(e, o)
            }), m
        }

        function n(t, e) {
            if (e >= i.length) return t;
            var r, u = [], a = o[e++];
            for (r in t) u.push({key: r, values: n(t[r], e)});
            return a && u.sort(function (t, n) {
                return a(t.key, n.key)
            }), u
        }

        var e, u, a = {}, i = [], o = [];
        return a.map = function (n) {
            return t(n, 0)
        }, a.entries = function (e) {
            return n(t(e, 0), 0)
        }, a.key = function (t) {
            return i.push(t), a
        }, a.sortKeys = function (t) {
            return o[i.length - 1] = t, a
        }, a.sortValues = function (t) {
            return e = t, a
        }, a.rollup = function (t) {
            return u = t, a
        }, a
    }, d3.keys = function (t) {
        var n = [];
        for (var e in t) n.push(e);
        return n
    }, d3.values = function (t) {
        var n = [];
        for (var e in t) n.push(t[e]);
        return n
    }, d3.entries = function (t) {
        var n = [];
        for (var e in t) n.push({key: e, value: t[e]});
        return n
    }, d3.permute = function (t, n) {
        for (var e = [], r = -1, u = n.length; ++r < u;) e[r] = t[n[r]];
        return e
    }, d3.merge = function (t) {
        return Array.prototype.concat.apply([], t)
    }, d3.split = function (t, n) {
        var e, r = [], u = [], a = -1, i = t.length;
        for (arguments.length < 2 && (n = f); ++a < i;) n.call(u, e = t[a], a) ? u = [] : (u.length || r.push(u), u.push(e));
        return r
    }, d3.range = function (t, n, e) {
        if (arguments.length < 3 && (e = 1, arguments.length < 2 && (n = t, t = 0)), (n - t) / e === 1 / 0) throw new Error("infinite range");
        var r, u = [], a = d(Math.abs(e)), i = -1;
        if (t *= a, n *= a, e *= a, 0 > e) for (; (r = t + e * ++i) > n;) u.push(r / a); else for (; (r = t + e * ++i) < n;) u.push(r / a);
        return u
    }, d3.requote = function (t) {
        return t.replace(Ju, "\\$&")
    };
    var Ju = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
    d3.round = function (t, n) {
        return n ? Math.round(t * (n = Math.pow(10, n))) / n : Math.round(t)
    }, d3.xhr = function (t, n, e) {
        var r = new XMLHttpRequest;
        arguments.length < 3 ? (e = n, n = null) : n && r.overrideMimeType && r.overrideMimeType(n), r.open("GET", t, !0), n && r.setRequestHeader("Accept", n), r.onreadystatechange = function () {
            if (4 === r.readyState) {
                var t = r.status;
                e(!t && r.response || t >= 200 && 300 > t || 304 === t ? r : null)
            }
        }, r.send(null)
    }, d3.text = function (t, n, e) {
        function r(t) {
            e(t && t.responseText)
        }

        arguments.length < 3 && (e = n, n = null), d3.xhr(t, n, r)
    }, d3.json = function (t, n) {
        d3.text(t, "application/json", function (t) {
            n(t ? JSON.parse(t) : null)
        })
    }, d3.html = function (t, n) {
        d3.text(t, "text/html", function (t) {
            if (null != t) {
                var e = document.createRange();
                e.selectNode(document.body), t = e.createContextualFragment(t)
            }
            n(t)
        })
    }, d3.xml = function (t, n, e) {
        function r(t) {
            e(t && t.responseXML)
        }

        arguments.length < 3 && (e = n, n = null), d3.xhr(t, n, r)
    };
    var Qu = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };
    d3.ns = {
        prefix: Qu, qualify: function (t) {
            var n = t.indexOf(":"), e = t;
            return n >= 0 && (e = t.substring(0, n), t = t.substring(n + 1)), Qu.hasOwnProperty(e) ? {
                space: Qu[e],
                local: t
            } : t
        }
    }, d3.dispatch = function () {
        for (var t = new g, n = -1, e = arguments.length; ++n < e;) t[arguments[n]] = m(t);
        return t
    }, g.prototype.on = function (t, n) {
        var e = t.indexOf("."), r = "";
        return e > 0 && (r = t.substring(e + 1), t = t.substring(0, e)), arguments.length < 2 ? this[t].on(r) : this[t].on(r, n)
    }, d3.format = function (t) {
        var n = Wu.exec(t), e = n[1] || " ", r = n[3] || "", u = n[5], a = +n[6], i = n[7], o = n[8], c = n[9], l = 1,
            s = "", f = !1;
        switch (o && (o = +o.substring(1)), u && (e = "0", i && (a -= Math.floor((a - 1) / 4))), c) {
            case"n":
                i = !0, c = "g";
                break;
            case"%":
                l = 100, s = "%", c = "f";
                break;
            case"p":
                l = 100, s = "%", c = "r";
                break;
            case"d":
                f = !0, o = 0;
                break;
            case"s":
                l = -1, c = "r"
        }
        return "r" != c || o || (c = "g"), c = ta.get(c) || v, function (t) {
            if (f && t % 1) return "";
            var n = 0 > t && (t = -t) ? "-" : r;
            if (0 > l) {
                var h = d3.formatPrefix(t, o);
                t = h.scale(t), s = h.symbol
            } else t *= l;
            if (t = c(t, o), u) {
                var d = t.length + n.length;
                a > d && (t = new Array(a - d + 1).join(e) + t), i && (t = y(t)), t = n + t
            } else {
                i && (t = y(t)), t = n + t;
                var d = t.length;
                a > d && (t = new Array(a - d + 1).join(e) + t)
            }
            return t + s
        }
    };
    var Wu = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/, ta = d3.map({
        g: function (t, n) {
            return t.toPrecision(n)
        }, e: function (t, n) {
            return t.toExponential(n)
        }, f: function (t, n) {
            return t.toFixed(n)
        }, r: function (t, n) {
            return d3.round(t, n = p(t, n)).toFixed(Math.max(0, Math.min(20, n)))
        }
    }), na = ["y", "z", "a", "f", "p", "n", "Î¼", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(x);
    d3.formatPrefix = function (t, n) {
        var e = 0;
        return t && (0 > t && (t *= -1), n && (t = d3.round(t, p(t, n))), e = 1 + Math.floor(1e-12 + Math.log(t) / Math.LN10), e = Math.max(-24, Math.min(24, 3 * Math.floor((0 >= e ? e + 1 : e - 1) / 3)))), na[8 + e / 3]
    };
    var ea = k(2), ra = k(3), ua = function () {
        return w
    }, aa = d3.map({
        linear: ua, poly: k, quad: function () {
            return ea
        }, cubic: function () {
            return ra
        }, sin: function () {
            return A
        }, exp: function () {
            return N
        }, circle: function () {
            return S
        }, elastic: C, back: T, bounce: function () {
            return q
        }
    }), ia = d3.map({
        "in": w, out: M, "in-out": _, "out-in": function (t) {
            return _(M(t))
        }
    });
    d3.ease = function (t) {
        var n = t.indexOf("-"), e = n >= 0 ? t.substring(0, n) : t, r = n >= 0 ? t.substring(n + 1) : "in";
        return e = aa.get(e) || ua, r = ia.get(r) || w, b(r(e.apply(null, Array.prototype.slice.call(arguments, 1))))
    }, d3.event = null, d3.transform = function (t) {
        var n = document.createElementNS(d3.ns.prefix.svg, "g");
        return (d3.transform = function (t) {
            n.setAttribute("transform", t);
            var e = n.transform.baseVal.consolidate();
            return new P(e ? e.matrix : ca)
        })(t)
    }, P.prototype.toString = function () {
        return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
    };
    var oa = 180 / Math.PI, ca = {a: 1, b: 0, c: 0, d: 1, e: 0, f: 0};
    d3.interpolate = function (t, n) {
        for (var e, r = d3.interpolators.length; --r >= 0 && !(e = d3.interpolators[r](t, n));) ;
        return e
    }, d3.interpolateNumber = function (t, n) {
        return n -= t, function (e) {
            return t + n * e
        }
    }, d3.interpolateRound = function (t, n) {
        return n -= t, function (e) {
            return Math.round(t + n * e)
        }
    }, d3.interpolateString = function (t, n) {
        var e, r, u, a, i, o = 0, c = 0, l = [], s = [];
        for (la.lastIndex = 0, r = 0; e = la.exec(n); ++r) e.index && l.push(n.substring(o, c = e.index)), s.push({
            i: l.length,
            x: e[0]
        }), l.push(null), o = la.lastIndex;
        for (o < n.length && l.push(n.substring(o)), r = 0, a = s.length; (e = la.exec(t)) && a > r; ++r) if (i = s[r], i.x == e[0]) {
            if (i.i) if (null == l[i.i + 1]) for (l[i.i - 1] += i.x, l.splice(i.i, 1), u = r + 1; a > u; ++u) s[u].i--; else for (l[i.i - 1] += i.x + l[i.i + 1], l.splice(i.i, 2), u = r + 1; a > u; ++u) s[u].i -= 2; else if (null == l[i.i + 1]) l[i.i] = i.x; else for (l[i.i] = i.x + l[i.i + 1], l.splice(i.i + 1, 1), u = r + 1; a > u; ++u) s[u].i--;
            s.splice(r, 1), a--, r--
        } else i.x = d3.interpolateNumber(parseFloat(e[0]), parseFloat(i.x));
        for (; a > r;) i = s.pop(), null == l[i.i + 1] ? l[i.i] = i.x : (l[i.i] = i.x + l[i.i + 1], l.splice(i.i + 1, 1)), a--;
        return 1 === l.length ? null == l[0] ? s[0].x : function () {
            return n
        } : function (t) {
            for (r = 0; a > r; ++r) l[(i = s[r]).i] = i.x(t);
            return l.join("")
        }
    }, d3.interpolateTransform = function (t, n) {
        var e, r = [], u = [], a = d3.transform(t), i = d3.transform(n), o = a.translate, c = i.translate, l = a.rotate,
            s = i.rotate, f = a.skew, h = i.skew, d = a.scale, g = i.scale;
        return o[0] != c[0] || o[1] != c[1] ? (r.push("translate(", null, ",", null, ")"), u.push({
            i: 1,
            x: d3.interpolateNumber(o[0], c[0])
        }, {
            i: 3,
            x: d3.interpolateNumber(o[1], c[1])
        })) : r.push(c[0] || c[1] ? "translate(" + c + ")" : ""), l != s ? (l - s > 180 ? s += 360 : s - l > 180 && (l += 360), u.push({
            i: r.push(r.pop() + "rotate(", null, ")") - 2,
            x: d3.interpolateNumber(l, s)
        })) : s && r.push(r.pop() + "rotate(" + s + ")"), f != h ? u.push({
            i: r.push(r.pop() + "skewX(", null, ")") - 2,
            x: d3.interpolateNumber(f, h)
        }) : h && r.push(r.pop() + "skewX(" + h + ")"), d[0] != g[0] || d[1] != g[1] ? (e = r.push(r.pop() + "scale(", null, ",", null, ")"), u.push({
            i: e - 4,
            x: d3.interpolateNumber(d[0], g[0])
        }, {
            i: e - 2,
            x: d3.interpolateNumber(d[1], g[1])
        })) : (1 != g[0] || 1 != g[1]) && r.push(r.pop() + "scale(" + g + ")"), e = u.length, function (t) {
            for (var n, a = -1; ++a < e;) r[(n = u[a]).i] = n.x(t);
            return r.join("")
        }
    }, d3.interpolateRgb = function (t, n) {
        t = d3.rgb(t), n = d3.rgb(n);
        var e = t.r, r = t.g, u = t.b, a = n.r - e, i = n.g - r, o = n.b - u;
        return function (t) {
            return "#" + V(Math.round(e + a * t)) + V(Math.round(r + i * t)) + V(Math.round(u + o * t))
        }
    }, d3.interpolateHsl = function (t, n) {
        t = d3.hsl(t), n = d3.hsl(n);
        var e = t.h, r = t.s, u = t.l, a = n.h - e, i = n.s - r, o = n.l - u;
        return a > 180 ? a -= 360 : -180 > a && (a += 360), function (t) {
            return Q(e + a * t, r + i * t, u + o * t) + ""
        }
    }, d3.interpolateLab = function (t, n) {
        t = d3.lab(t), n = d3.lab(n);
        var e = t.l, r = t.a, u = t.b, a = n.l - e, i = n.a - r, o = n.b - u;
        return function (t) {
            return un(e + a * t, r + i * t, u + o * t) + ""
        }
    }, d3.interpolateHcl = function (t, n) {
        t = d3.hcl(t), n = d3.hcl(n);
        var e = t.h, r = t.c, u = t.l, a = n.h - e, i = n.c - r, o = n.l - u;
        return a > 180 ? a -= 360 : -180 > a && (a += 360), function (t) {
            return nn(e + a * t, r + i * t, u + o * t) + ""
        }
    }, d3.interpolateArray = function (t, n) {
        var e, r = [], u = [], a = t.length, i = n.length, o = Math.min(t.length, n.length);
        for (e = 0; o > e; ++e) r.push(d3.interpolate(t[e], n[e]));
        for (; a > e; ++e) u[e] = t[e];
        for (; i > e; ++e) u[e] = n[e];
        return function (t) {
            for (e = 0; o > e; ++e) u[e] = r[e](t);
            return u
        }
    }, d3.interpolateObject = function (t, n) {
        var e, r = {}, u = {};
        for (e in t) e in n ? r[e] = H(e)(t[e], n[e]) : u[e] = t[e];
        for (e in n) e in t || (u[e] = n[e]);
        return function (t) {
            for (e in r) u[e] = r[e](t);
            return u
        }
    };
    var la = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
    d3.interpolators = [d3.interpolateObject, function (t, n) {
        return n instanceof Array && d3.interpolateArray(t, n)
    }, function (t, n) {
        return ("string" == typeof t || "string" == typeof n) && d3.interpolateString(t + "", n + "")
    }, function (t, n) {
        return ("string" == typeof n ? fa.has(n) || /^(#|rgb\(|hsl\()/.test(n) : n instanceof j) && d3.interpolateRgb(t, n)
    }, function (t, n) {
        return !isNaN(t = +t) && !isNaN(n = +n) && d3.interpolateNumber(t, n)
    }], j.prototype.toString = function () {
        return this.rgb() + ""
    }, d3.rgb = function (t, n, e) {
        return 1 === arguments.length ? t instanceof U ? Y(t.r, t.g, t.b) : Z("" + t, Y, Q) : Y(~~t, ~~n, ~~e)
    };
    var sa = U.prototype = new j;
    sa.brighter = function (t) {
        t = Math.pow(.7, arguments.length ? t : 1);
        var n = this.r, e = this.g, r = this.b, u = 30;
        return n || e || r ? (n && u > n && (n = u), e && u > e && (e = u), r && u > r && (r = u), Y(Math.min(255, Math.floor(n / t)), Math.min(255, Math.floor(e / t)), Math.min(255, Math.floor(r / t)))) : Y(u, u, u)
    }, sa.darker = function (t) {
        return t = Math.pow(.7, arguments.length ? t : 1), Y(Math.floor(t * this.r), Math.floor(t * this.g), Math.floor(t * this.b))
    }, sa.hsl = function () {
        return B(this.r, this.g, this.b)
    }, sa.toString = function () {
        return "#" + V(this.r) + V(this.g) + V(this.b)
    };
    var fa = d3.map({
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkgrey: "#a9a9a9",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        grey: "#808080",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
    });
    fa.forEach(function (t, n) {
        fa.set(t, Z(n, Y, Q))
    }), d3.hsl = function (t, n, e) {
        return 1 === arguments.length ? t instanceof J ? K(t.h, t.s, t.l) : Z("" + t, B, K) : K(+t, +n, +e)
    };
    var ha = J.prototype = new j;
    ha.brighter = function (t) {
        return t = Math.pow(.7, arguments.length ? t : 1), K(this.h, this.s, this.l / t)
    }, ha.darker = function (t) {
        return t = Math.pow(.7, arguments.length ? t : 1), K(this.h, this.s, t * this.l)
    }, ha.rgb = function () {
        return Q(this.h, this.s, this.l)
    }, d3.hcl = function (t, n, e) {
        return 1 === arguments.length ? t instanceof tn ? W(t.h, t.c, t.l) : t instanceof rn ? an(t.l, t.a, t.b) : an((t = X((t = d3.rgb(t)).r, t.g, t.b)).l, t.a, t.b) : W(+t, +n, +e)
    };
    var da = tn.prototype = new j;
    da.brighter = function (t) {
        return W(this.h, this.c, Math.min(100, this.l + ga * (arguments.length ? t : 1)))
    }, da.darker = function (t) {
        return W(this.h, this.c, Math.max(0, this.l - ga * (arguments.length ? t : 1)))
    }, da.rgb = function () {
        return nn(this.h, this.c, this.l).rgb()
    }, d3.lab = function (t, n, e) {
        return 1 === arguments.length ? t instanceof rn ? en(t.l, t.a, t.b) : t instanceof tn ? nn(t.l, t.c, t.h) : X((t = d3.rgb(t)).r, t.g, t.b) : en(+t, +n, +e)
    };
    var ga = 18, ma = .95047, pa = 1, va = 1.08883, ya = rn.prototype = new j;
    ya.brighter = function (t) {
        return en(Math.min(100, this.l + ga * (arguments.length ? t : 1)), this.a, this.b)
    }, ya.darker = function (t) {
        return en(Math.max(0, this.l - ga * (arguments.length ? t : 1)), this.a, this.b)
    }, ya.rgb = function () {
        return un(this.l, this.a, this.b)
    };
    var xa = function (t, n) {
            return n.querySelector(t)
        }, ba = function (t, n) {
            return n.querySelectorAll(t)
        }, Ma = document.documentElement,
        _a = Ma.matchesSelector || Ma.webkitMatchesSelector || Ma.mozMatchesSelector || Ma.msMatchesSelector || Ma.oMatchesSelector,
        wa = function (t, n) {
            return _a.call(t, n)
        };
    "function" == typeof Sizzle && (xa = function (t, n) {
        return Sizzle(t, n)[0] || null
    }, ba = function (t, n) {
        return Sizzle.uniqueSort(Sizzle(t, n))
    }, wa = Sizzle.matchesSelector);
    var ka = [];
    d3.selection = function () {
        return Aa
    }, d3.selection.prototype = ka, ka.select = function (t) {
        var n, e, r, u, a = [];
        "function" != typeof t && (t = fn(t));
        for (var i = -1, o = this.length; ++i < o;) {
            a.push(n = []), n.parentNode = (r = this[i]).parentNode;
            for (var c = -1, l = r.length; ++c < l;) (u = r[c]) ? (n.push(e = t.call(u, u.__data__, c)), e && "__data__" in u && (e.__data__ = u.__data__)) : n.push(null)
        }
        return sn(a)
    }, ka.selectAll = function (t) {
        var n, e, r = [];
        "function" != typeof t && (t = hn(t));
        for (var u = -1, a = this.length; ++u < a;) for (var i = this[u], o = -1, c = i.length; ++o < c;) (e = i[o]) && (r.push(n = Zu(t.call(e, e.__data__, o))), n.parentNode = e);
        return sn(r)
    }, ka.attr = function (t, n) {
        if (arguments.length < 2) {
            if ("string" == typeof t) {
                var e = this.node();
                return t = d3.ns.qualify(t), t.local ? e.getAttributeNS(t.space, t.local) : e.getAttribute(t)
            }
            for (n in t) this.each(dn(n, t[n]));
            return this
        }
        return this.each(dn(t, n))
    }, ka.classed = function (t, n) {
        if (arguments.length < 2) {
            if ("string" == typeof t) {
                var e = this.node(), r = (t = t.trim().split(/^|\s+/g)).length, u = -1;
                if (n = e.classList) {
                    for (; ++u < r;) if (!n.contains(t[u])) return !1
                } else for (n = e.className, null != n.baseVal && (n = n.baseVal); ++u < r;) if (!gn(t[u]).test(n)) return !1;
                return !0
            }
            for (n in t) this.each(mn(n, t[n]));
            return this
        }
        return this.each(mn(t, n))
    }, ka.style = function (t, n, e) {
        var r = arguments.length;
        if (3 > r) {
            if ("string" != typeof t) {
                2 > r && (n = "");
                for (e in t) this.each(vn(e, t[e], n));
                return this
            }
            if (2 > r) return window.getComputedStyle(this.node(), null).getPropertyValue(t);
            e = ""
        }
        return this.each(vn(t, n, e))
    }, ka.property = function (t, n) {
        if (arguments.length < 2) {
            if ("string" == typeof t) return this.node()[t];
            for (n in t) this.each(yn(n, t[n]));
            return this
        }
        return this.each(yn(t, n))
    }, ka.text = function (t) {
        return arguments.length < 1 ? this.node().textContent : this.each("function" == typeof t ? function () {
            var n = t.apply(this, arguments);
            this.textContent = null == n ? "" : n
        } : null == t ? function () {
            this.textContent = ""
        } : function () {
            this.textContent = t
        })
    }, ka.html = function (t) {
        return arguments.length < 1 ? this.node().innerHTML : this.each("function" == typeof t ? function () {
            var n = t.apply(this, arguments);
            this.innerHTML = null == n ? "" : n
        } : null == t ? function () {
            this.innerHTML = ""
        } : function () {
            this.innerHTML = t
        })
    }, ka.append = function (t) {
        function n() {
            return this.appendChild(document.createElementNS(this.namespaceURI, t))
        }

        function e() {
            return this.appendChild(document.createElementNS(t.space, t.local))
        }

        return t = d3.ns.qualify(t), this.select(t.local ? e : n)
    }, ka.insert = function (t, n) {
        function e() {
            return this.insertBefore(document.createElementNS(this.namespaceURI, t), xa(n, this))
        }

        function r() {
            return this.insertBefore(document.createElementNS(t.space, t.local), xa(n, this))
        }

        return t = d3.ns.qualify(t), this.select(t.local ? r : e)
    }, ka.remove = function () {
        return this.each(function () {
            var t = this.parentNode;
            t && t.removeChild(this)
        })
    }, ka.data = function (t, n) {
        function e(t, e) {
            var u, a, i, o = t.length, f = e.length, h = Math.min(o, f), d = Math.max(o, f), g = [], m = [], p = [];
            if (n) {
                var v, y = new r, x = [], b = e.length;
                for (u = -1; ++u < o;) v = n.call(a = t[u], a.__data__, u), y.has(v) ? p[b++] = a : y.set(v, a), x.push(v);
                for (u = -1; ++u < f;) v = n.call(e, i = e[u], u), y.has(v) ? (g[u] = a = y.get(v), a.__data__ = i, m[u] = p[u] = null) : (m[u] = xn(i), g[u] = p[u] = null), y.remove(v);
                for (u = -1; ++u < o;) y.has(x[u]) && (p[u] = t[u])
            } else {
                for (u = -1; ++u < h;) a = t[u], i = e[u], a ? (a.__data__ = i, g[u] = a, m[u] = p[u] = null) : (m[u] = xn(i), g[u] = p[u] = null);
                for (; f > u; ++u) m[u] = xn(e[u]), g[u] = p[u] = null;
                for (; d > u; ++u) p[u] = t[u], m[u] = g[u] = null
            }
            m.update = g, m.parentNode = g.parentNode = p.parentNode = t.parentNode, c.push(m), l.push(g), s.push(p)
        }

        var u, a, i = -1, o = this.length;
        if (!arguments.length) {
            for (t = new Array(o = (u = this[0]).length); ++i < o;) (a = u[i]) && (t[i] = a.__data__);
            return t
        }
        var c = kn([]), l = sn([]), s = sn([]);
        if ("function" == typeof t) for (; ++i < o;) e(u = this[i], t.call(u, u.parentNode.__data__, i)); else for (; ++i < o;) e(u = this[i], t);
        return l.enter = function () {
            return c
        }, l.exit = function () {
            return s
        }, l
    }, ka.datum = ka.map = function (t) {
        return arguments.length < 1 ? this.property("__data__") : this.property("__data__", t)
    }, ka.filter = function (t) {
        var n, e, r, u = [];
        "function" != typeof t && (t = bn(t));
        for (var a = 0, i = this.length; i > a; a++) {
            u.push(n = []), n.parentNode = (e = this[a]).parentNode;
            for (var o = 0, c = e.length; c > o; o++) (r = e[o]) && t.call(r, r.__data__, o) && n.push(r)
        }
        return sn(u)
    }, ka.order = function () {
        for (var t = -1, n = this.length; ++t < n;) for (var e, r = this[t], u = r.length - 1, a = r[u]; --u >= 0;) (e = r[u]) && (a && a !== e.nextSibling && a.parentNode.insertBefore(e, a), a = e);
        return this
    }, ka.sort = function (t) {
        t = Mn.apply(this, arguments);
        for (var n = -1, e = this.length; ++n < e;) this[n].sort(t);
        return this.order()
    }, ka.on = function (t, n, e) {
        var r = arguments.length;
        if (3 > r) {
            if ("string" != typeof t) {
                2 > r && (n = !1);
                for (e in t) this.each(_n(e, t[e], n));
                return this
            }
            if (2 > r) return (r = this.node()["__on" + t]) && r._;
            e = !1
        }
        return this.each(_n(t, n, e))
    }, ka.each = function (t) {
        return wn(this, function (n, e, r) {
            t.call(n, n.__data__, e, r)
        })
    }, ka.call = function (t) {
        return t.apply(this, (arguments[0] = this, arguments)), this
    }, ka.empty = function () {
        return !this.node()
    }, ka.node = function () {
        for (var t = 0, n = this.length; n > t; t++) for (var e = this[t], r = 0, u = e.length; u > r; r++) {
            var a = e[r];
            if (a) return a
        }
        return null
    }, ka.transition = function () {
        for (var t, n, e = [], r = -1, u = this.length; ++r < u;) {
            e.push(t = []);
            for (var a = this[r], i = -1, o = a.length; ++i < o;) t.push((n = a[i]) ? {
                node: n,
                delay: Da,
                duration: Pa
            } : null)
        }
        return An(e, Ta || ++Ca, Date.now())
    };
    var Aa = sn([[document]]);
    Aa[0].parentNode = Ma, d3.select = function (t) {
        return "string" == typeof t ? Aa.select(t) : sn([[t]])
    }, d3.selectAll = function (t) {
        return "string" == typeof t ? Aa.selectAll(t) : sn([Zu(t)])
    };
    var Na = [];
    d3.selection.enter = kn, d3.selection.enter.prototype = Na, Na.append = ka.append, Na.insert = ka.insert, Na.empty = ka.empty, Na.node = ka.node, Na.select = function (t) {
        for (var n, e, r, u, a, i = [], o = -1, c = this.length; ++o < c;) {
            r = (u = this[o]).update, i.push(n = []), n.parentNode = u.parentNode;
            for (var l = -1, s = u.length; ++l < s;) (a = u[l]) ? (n.push(r[l] = e = t.call(u.parentNode, a.__data__, l)), e.__data__ = a.__data__) : n.push(null)
        }
        return sn(i)
    };
    var Sa = [], Ca = 0, Ta = 0, qa = 0, za = 250, Ea = d3.ease("cubic-in-out"), Da = qa, Pa = za, La = Ea;
    Sa.call = ka.call, d3.transition = function (t) {
        return arguments.length ? Ta ? t.transition() : t : Aa.transition()
    }, d3.transition.prototype = Sa, Sa.select = function (t) {
        var n, e, r, u = [];
        "function" != typeof t && (t = fn(t));
        for (var a = -1, i = this.length; ++a < i;) {
            u.push(n = []);
            for (var o = this[a], c = -1, l = o.length; ++c < l;) (r = o[c]) && (e = t.call(r.node, r.node.__data__, c)) ? ("__data__" in r.node && (e.__data__ = r.node.__data__), n.push({
                node: e,
                delay: r.delay,
                duration: r.duration
            })) : n.push(null)
        }
        return An(u, this.id, this.time).ease(this.ease())
    }, Sa.selectAll = function (t) {
        var n, e, r, u = [];
        "function" != typeof t && (t = hn(t));
        for (var a = -1, i = this.length; ++a < i;) for (var o = this[a], c = -1, l = o.length; ++c < l;) if (r = o[c]) {
            e = t.call(r.node, r.node.__data__, c), u.push(n = []);
            for (var s = -1, f = e.length; ++s < f;) n.push({node: e[s], delay: r.delay, duration: r.duration})
        }
        return An(u, this.id, this.time).ease(this.ease())
    }, Sa.filter = function (t) {
        var n, e, r, u = [];
        "function" != typeof t && (t = bn(t));
        for (var a = 0, i = this.length; i > a; a++) {
            u.push(n = []);
            for (var e = this[a], o = 0, c = e.length; c > o; o++) (r = e[o]) && t.call(r.node, r.node.__data__, o) && n.push(r)
        }
        return An(u, this.id, this.time).ease(this.ease())
    }, Sa.attr = function (t, n) {
        if (arguments.length < 2) {
            for (n in t) this.attrTween(n, Cn(t[n], n));
            return this
        }
        return this.attrTween(t, Cn(n, t))
    }, Sa.attrTween = function (t, n) {
        function e(t, e) {
            var r = n.call(this, t, e, this.getAttribute(u));
            return r === Ha ? (this.removeAttribute(u), null) : r && function (t) {
                this.setAttribute(u, r(t))
            }
        }

        function r(t, e) {
            var r = n.call(this, t, e, this.getAttributeNS(u.space, u.local));
            return r === Ha ? (this.removeAttributeNS(u.space, u.local), null) : r && function (t) {
                this.setAttributeNS(u.space, u.local, r(t))
            }
        }

        var u = d3.ns.qualify(t);
        return this.tween("attr." + t, u.local ? r : e)
    }, Sa.style = function (t, n, e) {
        var r = arguments.length;
        if (3 > r) {
            if ("string" != typeof t) {
                2 > r && (n = "");
                for (e in t) this.styleTween(e, Cn(t[e], e), n);
                return this
            }
            e = ""
        }
        return this.styleTween(t, Cn(n, t), e)
    }, Sa.styleTween = function (t, n, e) {
        return arguments.length < 3 && (e = ""), this.tween("style." + t, function (r, u) {
            var a = n.call(this, r, u, window.getComputedStyle(this, null).getPropertyValue(t));
            return a === Ha ? (this.style.removeProperty(t), null) : a && function (n) {
                this.style.setProperty(t, a(n), e)
            }
        })
    }, Sa.text = function (t) {
        return this.tween("text", function (n, e) {
            this.textContent = "function" == typeof t ? t.call(this, n, e) : t
        })
    }, Sa.remove = function () {
        return this.each("end.transition", function () {
            var t;
            !this.__transition__ && (t = this.parentNode) && t.removeChild(this)
        })
    }, Sa.delay = function (t) {
        return wn(this, "function" == typeof t ? function (n, e, r) {
            n.delay = 0 | t.call(n = n.node, n.__data__, e, r)
        } : (t = 0 | t, function (n) {
            n.delay = t
        }))
    }, Sa.duration = function (t) {
        return wn(this, "function" == typeof t ? function (n, e, r) {
            n.duration = Math.max(1, 0 | t.call(n = n.node, n.__data__, e, r))
        } : (t = Math.max(1, 0 | t), function (n) {
            n.duration = t
        }))
    }, Sa.transition = function () {
        return this.select(a)
    }, d3.tween = function (t, n) {
        function e(e, r, u) {
            var a = t.call(this, e, r);
            return null == a ? "" != u && Ha : u != a && n(u, a + "")
        }

        function r(e, r, u) {
            return u != t && n(u, t)
        }

        return "function" == typeof t ? e : null == t ? Sn : (t += "", r)
    };
    var Fa, Ia, Ha = {}, Oa = 0, Ra = {}, ja = null;
    d3.timer = function (t, n, e) {
        if (arguments.length < 3) {
            if (arguments.length < 2) n = 0; else if (!isFinite(n)) return;
            e = Date.now()
        }
        var r = Ra[t.id];
        r && r.callback === t ? (r.then = e, r.delay = n) : Ra[t.id = ++Oa] = ja = {
            callback: t,
            then: e,
            delay: n,
            next: ja
        }, Fa || (Ia = clearTimeout(Ia), Fa = 1, Ya(Tn))
    }, d3.timer.flush = function () {
        for (var t, n = Date.now(), e = ja; e;) t = n - e.then, e.delay || (e.flush = e.callback(t)), e = e.next;
        qn()
    };
    var Ya = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
        setTimeout(t, 17)
    };
    d3.mouse = function (t) {
        return zn(t, E())
    };
    var Ua = /WebKit/.test(navigator.userAgent) ? -1 : 0;
    d3.touches = function (t, n) {
        return arguments.length < 2 && (n = E().touches), n ? Zu(n).map(function (n) {
            var e = zn(t, n);
            return e.identifier = n.identifier, e
        }) : []
    }, d3.scale = {}, d3.scale.linear = function () {
        return Fn([0, 1], [0, 1], d3.interpolate, !1)
    }, d3.scale.log = function () {
        return Vn(d3.scale.linear(), Zn)
    };
    var Va = d3.format(".0e");
    Zn.pow = function (t) {
        return Math.pow(10, t)
    }, Bn.pow = function (t) {
        return -Math.pow(10, -t)
    }, d3.scale.pow = function () {
        return Xn(d3.scale.linear(), 1)
    }, d3.scale.sqrt = function () {
        return d3.scale.pow().exponent(.5)
    }, d3.scale.ordinal = function () {
        return Gn([], {t: "range", a: [[]]})
    }, d3.scale.category10 = function () {
        return d3.scale.ordinal().range(Za)
    }, d3.scale.category20 = function () {
        return d3.scale.ordinal().range(Ba)
    }, d3.scale.category20b = function () {
        return d3.scale.ordinal().range(Xa)
    }, d3.scale.category20c = function () {
        return d3.scale.ordinal().range($a)
    };
    var Za = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"],
        Ba = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f", "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"],
        Xa = ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94", "#843c39", "#ad494a", "#d6616b", "#e7969c", "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"],
        $a = ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9"];
    d3.scale.quantile = function () {
        return Kn([], [])
    }, d3.scale.quantize = function () {
        return Jn(0, 1, [0, 1])
    }, d3.scale.threshold = function () {
        return Qn([.5], [0, 1])
    }, d3.scale.identity = function () {
        return Wn([0, 1])
    }, d3.svg = {}, d3.svg.arc = function () {
        function t() {
            var t = n.apply(this, arguments), a = e.apply(this, arguments), i = r.apply(this, arguments) + Ga,
                o = u.apply(this, arguments) + Ga, c = (i > o && (c = i, i = o, o = c), o - i),
                l = c < Math.PI ? "0" : "1", s = Math.cos(i), f = Math.sin(i), h = Math.cos(o), d = Math.sin(o);
            return c >= Ka ? t ? "M0," + a + "A" + a + "," + a + " 0 1,1 0," + -a + "A" + a + "," + a + " 0 1,1 0," + a + "M0," + t + "A" + t + "," + t + " 0 1,0 0," + -t + "A" + t + "," + t + " 0 1,0 0," + t + "Z" : "M0," + a + "A" + a + "," + a + " 0 1,1 0," + -a + "A" + a + "," + a + " 0 1,1 0," + a + "Z" : t ? "M" + a * s + "," + a * f + "A" + a + "," + a + " 0 " + l + ",1 " + a * h + "," + a * d + "L" + t * h + "," + t * d + "A" + t + "," + t + " 0 " + l + ",0 " + t * s + "," + t * f + "Z" : "M" + a * s + "," + a * f + "A" + a + "," + a + " 0 " + l + ",1 " + a * h + "," + a * d + "L0,0Z"
        }

        var n = te, e = ne, r = ee, u = re;
        return t.innerRadius = function (e) {
            return arguments.length ? (n = o(e), t) : n
        }, t.outerRadius = function (n) {
            return arguments.length ? (e = o(n), t) : e
        }, t.startAngle = function (n) {
            return arguments.length ? (r = o(n), t) : r
        }, t.endAngle = function (n) {
            return arguments.length ? (u = o(n), t) : u
        }, t.centroid = function () {
            var t = (n.apply(this, arguments) + e.apply(this, arguments)) / 2,
                a = (r.apply(this, arguments) + u.apply(this, arguments)) / 2 + Ga;
            return [Math.cos(a) * t, Math.sin(a) * t]
        }, t
    };
    var Ga = -Math.PI / 2, Ka = 2 * Math.PI - 1e-6;
    d3.svg.line = function () {
        return ue(u)
    };
    var Ja = d3.map({
        linear: oe,
        "linear-closed": ce,
        "step-before": le,
        "step-after": se,
        basis: pe,
        "basis-open": ve,
        "basis-closed": ye,
        bundle: xe,
        cardinal: de,
        "cardinal-open": fe,
        "cardinal-closed": he,
        monotone: Ae
    });
    Ja.forEach(function (t, n) {
        n.key = t, n.closed = /-closed$/.test(t)
    });
    var Qa = [0, 2 / 3, 1 / 3, 0], Wa = [0, 1 / 3, 2 / 3, 0], ti = [0, 1 / 6, 2 / 3, 1 / 6];
    d3.svg.line.radial = function () {
        var t = ue(Ne);
        return t.radius = t.x, delete t.x, t.angle = t.y, delete t.y, t
    }, le.reverse = se, se.reverse = le, d3.svg.area = function () {
        return Se(u)
    }, d3.svg.area.radial = function () {
        var t = Se(Ne);
        return t.radius = t.x, delete t.x, t.innerRadius = t.x0, delete t.x0, t.outerRadius = t.x1, delete t.x1, t.angle = t.y, delete t.y, t.startAngle = t.y0, delete t.y0, t.endAngle = t.y1, delete t.y1, t
    }, d3.svg.chord = function () {
        function t(t, o) {
            var c = n(this, a, t, o), l = n(this, i, t, o);
            return "M" + c.p0 + r(c.r, c.p1, c.a1 - c.a0) + (e(c, l) ? u(c.r, c.p1, c.r, c.p0) : u(c.r, c.p1, l.r, l.p0) + r(l.r, l.p1, l.a1 - l.a0) + u(l.r, l.p1, c.r, c.p0)) + "Z"
        }

        function n(t, n, e, r) {
            var u = n.call(t, e, r), a = c.call(t, u, r), i = l.call(t, u, r) + Ga, o = s.call(t, u, r) + Ga;
            return {r: a, a0: i, a1: o, p0: [a * Math.cos(i), a * Math.sin(i)], p1: [a * Math.cos(o), a * Math.sin(o)]}
        }

        function e(t, n) {
            return t.a0 == n.a0 && t.a1 == n.a1
        }

        function r(t, n, e) {
            return "A" + t + "," + t + " 0 " + +(e > Math.PI) + ",1 " + n
        }

        function u(t, n, e, r) {
            return "Q 0,0 " + r
        }

        var a = Ce, i = Te, c = qe, l = ee, s = re;
        return t.radius = function (n) {
            return arguments.length ? (c = o(n), t) : c
        }, t.source = function (n) {
            return arguments.length ? (a = o(n), t) : a
        }, t.target = function (n) {
            return arguments.length ? (i = o(n), t) : i
        }, t.startAngle = function (n) {
            return arguments.length ? (l = o(n), t) : l
        }, t.endAngle = function (n) {
            return arguments.length ? (s = o(n), t) : s
        }, t
    }, d3.svg.diagonal = function () {
        function t(t, u) {
            var a = n.call(this, t, u), i = e.call(this, t, u), o = (a.y + i.y) / 2,
                c = [a, {x: a.x, y: o}, {x: i.x, y: o}, i];
            return c = c.map(r), "M" + c[0] + "C" + c[1] + " " + c[2] + " " + c[3]
        }

        var n = Ce, e = Te, r = ze;
        return t.source = function (e) {
            return arguments.length ? (n = o(e), t) : n
        }, t.target = function (n) {
            return arguments.length ? (e = o(n), t) : e
        }, t.projection = function (n) {
            return arguments.length ? (r = n, t) : r
        }, t
    }, d3.svg.diagonal.radial = function () {
        var t = d3.svg.diagonal(), n = ze, e = t.projection;
        return t.projection = function (t) {
            return arguments.length ? e(Ee(n = t)) : n
        }, t
    }, d3.svg.mouse = d3.mouse, d3.svg.touches = d3.touches, d3.svg.symbol = function () {
        function t(t, r) {
            return (ni.get(n.call(this, t, r)) || Le)(e.call(this, t, r))
        }

        var n = Pe, e = De;
        return t.type = function (e) {
            return arguments.length ? (n = o(e), t) : n
        }, t.size = function (n) {
            return arguments.length ? (e = o(n), t) : e
        }, t
    };
    var ni = d3.map({
        circle: Le, cross: function (t) {
            var n = Math.sqrt(t / 5) / 2;
            return "M" + -3 * n + "," + -n + "H" + -n + "V" + -3 * n + "H" + n + "V" + -n + "H" + 3 * n + "V" + n + "H" + n + "V" + 3 * n + "H" + -n + "V" + n + "H" + -3 * n + "Z"
        }, diamond: function (t) {
            var n = Math.sqrt(t / (2 * ri)), e = n * ri;
            return "M0," + -n + "L" + e + ",0 0," + n + " " + -e + ",0Z"
        }, square: function (t) {
            var n = Math.sqrt(t) / 2;
            return "M" + -n + "," + -n + "L" + n + "," + -n + " " + n + "," + n + " " + -n + "," + n + "Z"
        }, "triangle-down": function (t) {
            var n = Math.sqrt(t / ei), e = n * ei / 2;
            return "M0," + e + "L" + n + "," + -e + " " + -n + "," + -e + "Z"
        }, "triangle-up": function (t) {
            var n = Math.sqrt(t / ei), e = n * ei / 2;
            return "M0," + -e + "L" + n + "," + e + " " + -n + "," + e + "Z"
        }
    });
    d3.svg.symbolTypes = ni.keys();
    var ei = Math.sqrt(3), ri = Math.tan(30 * Math.PI / 180);
    d3.svg.axis = function () {
        function t(t) {
            t.each(function () {
                var t, f = d3.select(this), h = null == l ? e.ticks ? e.ticks.apply(e, c) : e.domain() : l,
                    d = null == n ? e.tickFormat ? e.tickFormat.apply(e, c) : String : n, g = He(e, h, s),
                    m = f.selectAll(".minor").data(g, String),
                    p = m.enter().insert("line", "g").attr("class", "tick minor").style("opacity", 1e-6),
                    v = d3.transition(m.exit()).style("opacity", 1e-6).remove(),
                    y = d3.transition(m).style("opacity", 1), x = f.selectAll("g").data(h, String),
                    b = x.enter().insert("g", "path").style("opacity", 1e-6),
                    M = d3.transition(x.exit()).style("opacity", 1e-6).remove(),
                    _ = d3.transition(x).style("opacity", 1), w = Dn(e), k = f.selectAll(".domain").data([0]),
                    A = (k.enter().append("path").attr("class", "domain"), d3.transition(k)), N = e.copy(),
                    S = this.__chart__ || N;
                this.__chart__ = N, b.append("line").attr("class", "tick"), b.append("text");
                var C = b.select("line"), T = _.select("line"), q = x.select("text").text(d), z = b.select("text"),
                    E = _.select("text");
                switch (r) {
                    case"bottom":
                        t = Fe, p.attr("y2", a), y.attr("x2", 0).attr("y2", a), C.attr("y2", u), z.attr("y", Math.max(u, 0) + o), T.attr("x2", 0).attr("y2", u), E.attr("x", 0).attr("y", Math.max(u, 0) + o), q.attr("dy", ".71em").attr("text-anchor", "middle"), A.attr("d", "M" + w[0] + "," + i + "V0H" + w[1] + "V" + i);
                        break;
                    case"top":
                        t = Fe, p.attr("y2", -a), y.attr("x2", 0).attr("y2", -a), C.attr("y2", -u), z.attr("y", -(Math.max(u, 0) + o)), T.attr("x2", 0).attr("y2", -u), E.attr("x", 0).attr("y", -(Math.max(u, 0) + o)), q.attr("dy", "0em").attr("text-anchor", "middle"), A.attr("d", "M" + w[0] + "," + -i + "V0H" + w[1] + "V" + -i);
                        break;
                    case"left":
                        t = Ie, p.attr("x2", -a), y.attr("x2", -a).attr("y2", 0), C.attr("x2", -u), z.attr("x", -(Math.max(u, 0) + o)), T.attr("x2", -u).attr("y2", 0), E.attr("x", -(Math.max(u, 0) + o)).attr("y", 0), q.attr("dy", ".32em").attr("text-anchor", "end"), A.attr("d", "M" + -i + "," + w[0] + "H0V" + w[1] + "H" + -i);
                        break;
                    case"right":
                        t = Ie, p.attr("x2", a), y.attr("x2", a).attr("y2", 0), C.attr("x2", u), z.attr("x", Math.max(u, 0) + o), T.attr("x2", u).attr("y2", 0), E.attr("x", Math.max(u, 0) + o).attr("y", 0), q.attr("dy", ".32em").attr("text-anchor", "start"), A.attr("d", "M" + i + "," + w[0] + "H0V" + w[1] + "H" + i)
                }
                if (e.ticks) b.call(t, S), _.call(t, N), M.call(t, N), p.call(t, S), y.call(t, N), v.call(t, N); else {
                    var D = N.rangeBand() / 2, P = function (t) {
                        return N(t) + D
                    };
                    b.call(t, P), _.call(t, P)
                }
            })
        }

        var n, e = d3.scale.linear(), r = "bottom", u = 6, a = 6, i = 6, o = 3, c = [10], l = null, s = 0;
        return t.scale = function (n) {
            return arguments.length ? (e = n, t) : e
        }, t.orient = function (n) {
            return arguments.length ? (r = n, t) : r
        }, t.ticks = function () {
            return arguments.length ? (c = arguments, t) : c
        }, t.tickValues = function (n) {
            return arguments.length ? (l = n, t) : l
        }, t.tickFormat = function (e) {
            return arguments.length ? (n = e, t) : n
        }, t.tickSize = function (n, e) {
            if (!arguments.length) return u;
            var r = arguments.length - 1;
            return u = +n, a = r > 1 ? +e : u, i = r > 0 ? +arguments[r] : u, t
        }, t.tickPadding = function (n) {
            return arguments.length ? (o = +n, t) : o
        }, t.tickSubdivide = function (n) {
            return arguments.length ? (s = +n, t) : s
        }, t
    }, d3.svg.brush = function () {
        function t(a) {
            a.each(function () {
                var a, i = d3.select(this), s = i.selectAll(".background").data([0]),
                    f = i.selectAll(".extent").data([0]), h = i.selectAll(".resize").data(l, String);
                i.style("pointer-events", "all").on("mousedown.brush", u).on("touchstart.brush", u), s.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"), f.enter().append("rect").attr("class", "extent").style("cursor", "move"), h.enter().append("g").attr("class", function (t) {
                    return "resize " + t
                }).style("cursor", function (t) {
                    return ui[t]
                }).append("rect").attr("x", function (t) {
                    return /[ew]$/.test(t) ? -3 : null
                }).attr("y", function (t) {
                    return /^[ns]/.test(t) ? -3 : null
                }).attr("width", 6).attr("height", 6).style("visibility", "hidden"), h.style("display", t.empty() ? "none" : null), h.exit().remove(), o && (a = Dn(o), s.attr("x", a[0]).attr("width", a[1] - a[0]), e(i)), c && (a = Dn(c), s.attr("y", a[0]).attr("height", a[1] - a[0]), r(i)), n(i)
            })
        }

        function n(t) {
            t.selectAll(".resize").attr("transform", function (t) {
                return "translate(" + s[+/e$/.test(t)][0] + "," + s[+/^s/.test(t)][1] + ")"
            })
        }

        function e(t) {
            t.select(".extent").attr("x", s[0][0]), t.selectAll(".extent,.n>rect,.s>rect").attr("width", s[1][0] - s[0][0])
        }

        function r(t) {
            t.select(".extent").attr("y", s[0][1]), t.selectAll(".extent,.e>rect,.w>rect").attr("height", s[1][1] - s[0][1])
        }

        function u() {
            function u() {
                var t = d3.event.changedTouches;
                return t ? d3.touches(v, t)[0] : d3.mouse(v)
            }

            function l() {
                32 == d3.event.keyCode && (k || (m = null, A[0] -= s[1][0], A[1] -= s[1][1], k = 2), z())
            }

            function f() {
                32 == d3.event.keyCode && 2 == k && (A[0] += s[1][0], A[1] += s[1][1], k = 0, z())
            }

            function h() {
                var t = u(), a = !1;
                p && (t[0] += p[0], t[1] += p[1]), k || (d3.event.altKey ? (m || (m = [(s[0][0] + s[1][0]) / 2, (s[0][1] + s[1][1]) / 2]), A[0] = s[+(t[0] < m[0])][0], A[1] = s[+(t[1] < m[1])][1]) : m = null), _ && d(t, o, 0) && (e(b), a = !0), w && d(t, c, 1) && (r(b), a = !0), a && (n(b), x({
                    type: "brush",
                    mode: k ? "move" : "resize"
                }))
            }

            function d(t, n, e) {
                var r, u, i = Dn(n), o = i[0], c = i[1], l = A[e], f = s[1][e] - s[0][e];
                return k && (o -= l, c -= f + l), r = Math.max(o, Math.min(c, t[e])), k ? u = (r += l) + f : (m && (l = Math.max(o, Math.min(c, 2 * m[e] - r))), r > l ? (u = r, r = l) : u = l), s[0][e] !== r || s[1][e] !== u ? (a = null, s[0][e] = r, s[1][e] = u, !0) : void 0
            }

            function g() {
                h(), b.style("pointer-events", "all").selectAll(".resize").style("display", t.empty() ? "none" : null), d3.select("body").style("cursor", null), N.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null), x({type: "brushend"}), z()
            }

            var m, p, v = this, y = d3.select(d3.event.target), x = i.of(v, arguments), b = d3.select(v), M = y.datum(),
                _ = !/^(n|s)$/.test(M) && o, w = !/^(e|w)$/.test(M) && c, k = y.classed("extent"), A = u(),
                N = d3.select(window).on("mousemove.brush", h).on("mouseup.brush", g).on("touchmove.brush", h).on("touchend.brush", g).on("keydown.brush", l).on("keyup.brush", f);
            if (k) A[0] = s[0][0] - A[0], A[1] = s[0][1] - A[1]; else if (M) {
                var S = +/w$/.test(M), C = +/^n/.test(M);
                p = [s[1 - S][0] - A[0], s[1 - C][1] - A[1]], A[0] = s[S][0], A[1] = s[C][1]
            } else d3.event.altKey && (m = A.slice());
            b.style("pointer-events", "none").selectAll(".resize").style("display", null), d3.select("body").style("cursor", y.style("cursor")), x({type: "brushstart"}), h(), z()
        }

        var a, i = D(t, "brushstart", "brush", "brushend"), o = null, c = null, l = ai[0], s = [[0, 0], [0, 0]];
        return t.x = function (n) {
            return arguments.length ? (o = n, l = ai[!o << 1 | !c], t) : o
        }, t.y = function (n) {
            return arguments.length ? (c = n, l = ai[!o << 1 | !c], t) : c
        }, t.extent = function (n) {
            var e, r, u, i, l;
            return arguments.length ? (a = [[0, 0], [0, 0]], o && (e = n[0], r = n[1], c && (e = e[0], r = r[0]), a[0][0] = e, a[1][0] = r, o.invert && (e = o(e), r = o(r)), e > r && (l = e, e = r, r = l), s[0][0] = 0 | e, s[1][0] = 0 | r), c && (u = n[0], i = n[1], o && (u = u[1], i = i[1]), a[0][1] = u, a[1][1] = i, c.invert && (u = c(u), i = c(i)), u > i && (l = u, u = i, i = l), s[0][1] = 0 | u, s[1][1] = 0 | i), t) : (n = a || s, o && (e = n[0][0], r = n[1][0], a || (e = s[0][0], r = s[1][0], o.invert && (e = o.invert(e), r = o.invert(r)), e > r && (l = e, e = r, r = l))), c && (u = n[0][1], i = n[1][1], a || (u = s[0][1], i = s[1][1], c.invert && (u = c.invert(u), i = c.invert(i)), u > i && (l = u, u = i, i = l))), o && c ? [[e, u], [r, i]] : o ? [e, r] : c && [u, i])
        }, t.clear = function () {
            return a = null, s[0][0] = s[0][1] = s[1][0] = s[1][1] = 0, t
        }, t.empty = function () {
            return o && s[0][0] === s[1][0] || c && s[0][1] === s[1][1]
        }, d3.rebind(t, i, "on")
    };
    var ui = {
        n: "ns-resize",
        e: "ew-resize",
        s: "ns-resize",
        w: "ew-resize",
        nw: "nwse-resize",
        ne: "nesw-resize",
        se: "nwse-resize",
        sw: "nesw-resize"
    }, ai = [["n", "e", "s", "w", "nw", "ne", "se", "sw"], ["e", "w"], ["n", "s"], []];
    d3.behavior = {}, d3.behavior.drag = function () {
        function t() {
            this.on("mousedown.drag", n).on("touchstart.drag", n)
        }

        function n() {
            function t() {
                var t = o.parentNode;
                return s ? d3.touches(t).filter(function (t) {
                    return t.identifier === s
                })[0] : d3.mouse(t)
            }

            function n() {
                if (!o.parentNode) return u();
                var n = t(), e = n[0] - f[0], r = n[1] - f[1];
                h |= e | r, f = n, z(), c({type: "drag", x: n[0] + i[0], y: n[1] + i[1], dx: e, dy: r})
            }

            function u() {
                c({type: "dragend"}), h && (z(), d3.event.target === l && d.on("click.drag", a, !0)), d.on(s ? "touchmove.drag-" + s : "mousemove.drag", null).on(s ? "touchend.drag-" + s : "mouseup.drag", null)
            }

            function a() {
                z(), d.on("click.drag", null)
            }

            var i, o = this, c = e.of(o, arguments), l = d3.event.target,
                s = d3.event.touches && d3.event.changedTouches[0].identifier, f = t(), h = 0,
                d = d3.select(window).on(s ? "touchmove.drag-" + s : "mousemove.drag", n).on(s ? "touchend.drag-" + s : "mouseup.drag", u, !0);
            r ? (i = r.apply(o, arguments), i = [i.x - f[0], i.y - f[1]]) : i = [0, 0], s || z(), c({type: "dragstart"})
        }

        var e = D(t, "drag", "dragstart", "dragend"), r = null;
        return t.origin = function (n) {
            return arguments.length ? (r = n, t) : r
        }, d3.rebind(t, e, "on")
    }, d3.behavior.zoom = function () {
        function t() {
            this.on("mousedown.zoom", i).on("mousewheel.zoom", o).on("mousemove.zoom", c).on("DOMMouseScroll.zoom", o).on("dblclick.zoom", l).on("touchstart.zoom", s).on("touchmove.zoom", f).on("touchend.zoom", s)
        }

        function n(t) {
            return [(t[0] - x[0]) / b, (t[1] - x[1]) / b]
        }

        function e(t) {
            return [t[0] * b + x[0], t[1] * b + x[1]]
        }

        function r(t) {
            b = Math.max(M[0], Math.min(M[1], t))
        }

        function u(t, n) {
            n = e(n), x[0] += t[0] - n[0], x[1] += t[1] - n[1]
        }

        function a(t) {
            m && m.domain(g.range().map(function (t) {
                return (t - x[0]) / b
            }).map(g.invert)), v && v.domain(p.range().map(function (t) {
                return (t - x[1]) / b
            }).map(p.invert)), d3.event.preventDefault(), t({type: "zoom", scale: b, translate: x})
        }

        function i() {
            function t() {
                l = 1, u(d3.mouse(i), f), a(o)
            }

            function e() {
                l && z(), s.on("mousemove.zoom", null).on("mouseup.zoom", null), l && d3.event.target === c && s.on("click.zoom", r, !0)
            }

            function r() {
                z(), s.on("click.zoom", null)
            }

            var i = this, o = _.of(i, arguments), c = d3.event.target, l = 0,
                s = d3.select(window).on("mousemove.zoom", t).on("mouseup.zoom", e), f = n(d3.mouse(i));
            window.focus(), z()
        }

        function o() {
            h || (h = n(d3.mouse(this))), r(Math.pow(2, .002 * Oe()) * b), u(d3.mouse(this), h), a(_.of(this, arguments))
        }

        function c() {
            h = null
        }

        function l() {
            var t = d3.mouse(this), e = n(t);
            r(d3.event.shiftKey ? b / 2 : 2 * b), u(t, e), a(_.of(this, arguments))
        }

        function s() {
            var t = d3.touches(this), e = Date.now();
            if (d = b, h = {}, t.forEach(function (t) {
                h[t.identifier] = n(t)
            }), z(), 1 === t.length) {
                if (500 > e - y) {
                    var i = t[0], o = n(t[0]);
                    r(2 * b), u(i, o), a(_.of(this, arguments))
                }
                y = e
            }
        }

        function f() {
            var t = d3.touches(this), n = t[0], e = h[n.identifier];
            if (i = t[1]) {
                var i, o = h[i.identifier];
                n = [(n[0] + i[0]) / 2, (n[1] + i[1]) / 2], e = [(e[0] + o[0]) / 2, (e[1] + o[1]) / 2], r(d3.event.scale * d)
            }
            u(n, e), y = null, a(_.of(this, arguments))
        }

        var h, d, g, m, p, v, y, x = [0, 0], b = 1, M = oi, _ = D(t, "zoom");
        return t.translate = function (n) {
            return arguments.length ? (x = n.map(Number), t) : x
        }, t.scale = function (n) {
            return arguments.length ? (b = +n, t) : b
        }, t.scaleExtent = function (n) {
            return arguments.length ? (M = null == n ? oi : n.map(Number), t) : M
        }, t.x = function (n) {
            return arguments.length ? (m = n, g = n.copy(), t) : m
        }, t.y = function (n) {
            return arguments.length ? (v = n, p = n.copy(), t) : v
        }, d3.rebind(t, _, "on")
    };
    var ii, oi = [0, 1 / 0];
    d3.layout = {}, d3.layout.bundle = function () {
        return function (t) {
            for (var n = [], e = -1, r = t.length; ++e < r;) n.push(Re(t[e]));
            return n
        }
    }, d3.layout.chord = function () {
        function t() {
            var t, l, f, h, d, g = {}, m = [], p = d3.range(a), v = [];
            for (e = [], r = [], t = 0, h = -1; ++h < a;) {
                for (l = 0, d = -1; ++d < a;) l += u[h][d];
                m.push(l), v.push(d3.range(a)), t += l
            }
            for (i && p.sort(function (t, n) {
                return i(m[t], m[n])
            }), o && v.forEach(function (t, n) {
                t.sort(function (t, e) {
                    return o(u[n][t], u[n][e])
                })
            }), t = (2 * Math.PI - s * a) / t, l = 0, h = -1; ++h < a;) {
                for (f = l, d = -1; ++d < a;) {
                    var y = p[h], x = v[y][d], b = u[y][x], M = l, _ = l += b * t;
                    g[y + "-" + x] = {index: y, subindex: x, startAngle: M, endAngle: _, value: b}
                }
                r[y] = {index: y, startAngle: f, endAngle: l, value: (l - f) / t}, l += s
            }
            for (h = -1; ++h < a;) for (d = h - 1; ++d < a;) {
                var w = g[h + "-" + d], k = g[d + "-" + h];
                (w.value || k.value) && e.push(w.value < k.value ? {source: k, target: w} : {source: w, target: k})
            }
            c && n()
        }

        function n() {
            e.sort(function (t, n) {
                return c((t.source.value + t.target.value) / 2, (n.source.value + n.target.value) / 2)
            })
        }

        var e, r, u, a, i, o, c, l = {}, s = 0;
        return l.matrix = function (t) {
            return arguments.length ? (a = (u = t) && u.length, e = r = null, l) : u
        }, l.padding = function (t) {
            return arguments.length ? (s = t, e = r = null, l) : s
        }, l.sortGroups = function (t) {
            return arguments.length ? (i = t, e = r = null, l) : i
        }, l.sortSubgroups = function (t) {
            return arguments.length ? (o = t, e = null, l) : o
        }, l.sortChords = function (t) {
            return arguments.length ? (c = t, e && n(), l) : c
        }, l.chords = function () {
            return e || t(), e
        }, l.groups = function () {
            return r || t(), r
        }, l
    }, d3.layout.force = function () {
        function t(t) {
            return function (n, e, r, u) {
                if (n.point !== t) {
                    var a = n.cx - t.x, i = n.cy - t.y, o = 1 / Math.sqrt(a * a + i * i);
                    if (v > (u - e) * o) {
                        var c = n.charge * o * o;
                        return t.px -= a * c, t.py -= i * c, !0
                    }
                    if (n.point && isFinite(o)) {
                        var c = n.pointCharge * o * o;
                        t.px -= a * c, t.py -= i * c
                    }
                }
                return !n.charge
            }
        }

        function n(t) {
            t.px = d3.event.x, t.py = d3.event.y, l.resume()
        }

        var e, r, a, i, c, l = {}, s = d3.dispatch("start", "tick", "end"), f = [1, 1], h = .9, d = $e, g = Ge, m = -30,
            p = .1, v = .8, y = [], x = [];
        return l.tick = function () {
            if ((r *= .99) < .005) return s.end({type: "end", alpha: r = 0}), !0;
            var n, e, u, o, l, d, g, v, b, M = y.length, _ = x.length;
            for (e = 0; _ > e; ++e) u = x[e], o = u.source, l = u.target, v = l.x - o.x, b = l.y - o.y, (d = v * v + b * b) && (d = r * i[e] * ((d = Math.sqrt(d)) - a[e]) / d, v *= d, b *= d, l.x -= v * (g = o.weight / (l.weight + o.weight)), l.y -= b * g, o.x += v * (g = 1 - g), o.y += b * g);
            if ((g = r * p) && (v = f[0] / 2, b = f[1] / 2, e = -1, g)) for (; ++e < M;) u = y[e], u.x += (v - u.x) * g, u.y += (b - u.y) * g;
            if (m) for (Xe(n = d3.geom.quadtree(y), r, c), e = -1; ++e < M;) (u = y[e]).fixed || n.visit(t(u));
            for (e = -1; ++e < M;) u = y[e], u.fixed ? (u.x = u.px, u.y = u.py) : (u.x -= (u.px - (u.px = u.x)) * h, u.y -= (u.py - (u.py = u.y)) * h);
            s.tick({type: "tick", alpha: r})
        }, l.nodes = function (t) {
            return arguments.length ? (y = t, l) : y
        }, l.links = function (t) {
            return arguments.length ? (x = t, l) : x
        }, l.size = function (t) {
            return arguments.length ? (f = t, l) : f
        }, l.linkDistance = function (t) {
            return arguments.length ? (d = o(t), l) : d
        }, l.distance = l.linkDistance, l.linkStrength = function (t) {
            return arguments.length ? (g = o(t), l) : g
        }, l.friction = function (t) {
            return arguments.length ? (h = t, l) : h
        }, l.charge = function (t) {
            return arguments.length ? (m = "function" == typeof t ? t : +t, l) : m
        }, l.gravity = function (t) {
            return arguments.length ? (p = t, l) : p
        }, l.theta = function (t) {
            return arguments.length ? (v = t, l) : v
        }, l.alpha = function (t) {
            return arguments.length ? (r ? r = t > 0 ? t : 0 : t > 0 && (s.start({
                type: "start",
                alpha: r = t
            }), d3.timer(l.tick)), l) : r
        }, l.start = function () {
            function t(t, r) {
                for (var u, a = n(e), i = -1, o = a.length; ++i < o;) if (!isNaN(u = a[i][t])) return u;
                return Math.random() * r
            }

            function n() {
                if (!u) {
                    for (u = [], r = 0; s > r; ++r) u[r] = [];
                    for (r = 0; h > r; ++r) {
                        var t = x[r];
                        u[t.source.index].push(t.target), u[t.target.index].push(t.source)
                    }
                }
                return u[e]
            }

            var e, r, u, o, s = y.length, h = x.length, p = f[0], v = f[1];
            for (e = 0; s > e; ++e) (o = y[e]).index = e, o.weight = 0;
            for (a = [], i = [], e = 0; h > e; ++e) o = x[e], "number" == typeof o.source && (o.source = y[o.source]), "number" == typeof o.target && (o.target = y[o.target]), a[e] = d.call(this, o, e), i[e] = g.call(this, o, e), ++o.source.weight, ++o.target.weight;
            for (e = 0; s > e; ++e) o = y[e], isNaN(o.x) && (o.x = t("x", p)), isNaN(o.y) && (o.y = t("y", v)), isNaN(o.px) && (o.px = o.x), isNaN(o.py) && (o.py = o.y);
            if (c = [], "function" == typeof m) for (e = 0; s > e; ++e) c[e] = +m.call(this, y[e], e); else for (e = 0; s > e; ++e) c[e] = m;
            return l.resume()
        }, l.resume = function () {
            return l.alpha(.1)
        }, l.stop = function () {
            return l.alpha(0)
        }, l.drag = function () {
            e || (e = d3.behavior.drag().origin(u).on("dragstart", Ue).on("drag", n).on("dragend", Ve)), this.on("mouseover.force", Ze).on("mouseout.force", Be).call(e)
        }, d3.rebind(l, s, "on")
    }, d3.layout.partition = function () {
        function t(n, e, r, u) {
            var a = n.children;
            if (n.x = e, n.y = n.depth * u, n.dx = r, n.dy = u, a && (i = a.length)) {
                var i, o, c, l = -1;
                for (r = n.value ? r / n.value : 0; ++l < i;) t(o = a[l], e, c = o.value * r, u), e += c
            }
        }

        function n(t) {
            var e = t.children, r = 0;
            if (e && (u = e.length)) for (var u, a = -1; ++a < u;) r = Math.max(r, n(e[a]));
            return 1 + r
        }

        function e(e, a) {
            var i = r.call(this, e, a);
            return t(i[0], 0, u[0], u[1] / n(i[0])), i
        }

        var r = d3.layout.hierarchy(), u = [1, 1];
        return e.size = function (t) {
            return arguments.length ? (u = t, e) : u
        }, or(e, r)
    }, d3.layout.pie = function () {
        function t(a) {
            var i = a.map(function (e, r) {
                    return +n.call(t, e, r)
                }), o = +("function" == typeof r ? r.apply(this, arguments) : r),
                c = (("function" == typeof u ? u.apply(this, arguments) : u) - r) / d3.sum(i), l = d3.range(a.length);
            null != e && l.sort(e === ci ? function (t, n) {
                return i[n] - i[t]
            } : function (t, n) {
                return e(a[t], a[n])
            });
            var s = [];
            return l.forEach(function (t) {
                var n;
                s[t] = {data: a[t], value: n = i[t], startAngle: o, endAngle: o += n * c}
            }), s
        }

        var n = Number, e = ci, r = 0, u = 2 * Math.PI;
        return t.value = function (e) {
            return arguments.length ? (n = e, t) : n
        }, t.sort = function (n) {
            return arguments.length ? (e = n, t) : e
        }, t.startAngle = function (n) {
            return arguments.length ? (r = n, t) : r
        }, t.endAngle = function (n) {
            return arguments.length ? (u = n, t) : u
        }, t
    };
    var ci = {};
    d3.layout.stack = function () {
        function t(u, c) {
            var l = u.map(function (e, r) {
                return n.call(t, e, r)
            }), s = l.map(function (n) {
                return n.map(function (n, e) {
                    return [i.call(t, n, e), o.call(t, n, e)]
                })
            }), f = e.call(t, s, c);
            l = d3.permute(l, f), s = d3.permute(s, f);
            var h, d, g, m = r.call(t, s, c), p = l.length, v = l[0].length;
            for (d = 0; v > d; ++d) for (a.call(t, l[0][d], g = m[d], s[0][d][1]), h = 1; p > h; ++h) a.call(t, l[h][d], g += s[h - 1][d][1], s[h][d][1]);
            return u
        }

        var n = u, e = We, r = tr, a = Qe, i = Ke, o = Je;
        return t.values = function (e) {
            return arguments.length ? (n = e, t) : n
        }, t.order = function (n) {
            return arguments.length ? (e = "function" == typeof n ? n : li.get(n) || We, t) : e
        }, t.offset = function (n) {
            return arguments.length ? (r = "function" == typeof n ? n : si.get(n) || tr, t) : r
        }, t.x = function (n) {
            return arguments.length ? (i = n, t) : i
        }, t.y = function (n) {
            return arguments.length ? (o = n, t) : o
        }, t.out = function (n) {
            return arguments.length ? (a = n, t) : a
        }, t
    };
    var li = d3.map({
        "inside-out": function (t) {
            var n, e, r = t.length, u = t.map(nr), a = t.map(er), i = d3.range(r).sort(function (t, n) {
                return u[t] - u[n]
            }), o = 0, c = 0, l = [], s = [];
            for (n = 0; r > n; ++n) e = i[n], c > o ? (o += a[e], l.push(e)) : (c += a[e], s.push(e));
            return s.reverse().concat(l)
        }, reverse: function (t) {
            return d3.range(t.length).reverse()
        }, "default": We
    }), si = d3.map({
        silhouette: function (t) {
            var n, e, r, u = t.length, a = t[0].length, i = [], o = 0, c = [];
            for (e = 0; a > e; ++e) {
                for (n = 0, r = 0; u > n; n++) r += t[n][e][1];
                r > o && (o = r), i.push(r)
            }
            for (e = 0; a > e; ++e) c[e] = (o - i[e]) / 2;
            return c
        }, wiggle: function (t) {
            var n, e, r, u, a, i, o, c, l, s = t.length, f = t[0], h = f.length, d = [];
            for (d[0] = c = l = 0, e = 1; h > e; ++e) {
                for (n = 0, u = 0; s > n; ++n) u += t[n][e][1];
                for (n = 0, a = 0, o = f[e][0] - f[e - 1][0]; s > n; ++n) {
                    for (r = 0, i = (t[n][e][1] - t[n][e - 1][1]) / (2 * o); n > r; ++r) i += (t[r][e][1] - t[r][e - 1][1]) / o;
                    a += i * t[n][e][1]
                }
                d[e] = c -= u ? a / u * o : 0, l > c && (l = c)
            }
            for (e = 0; h > e; ++e) d[e] -= l;
            return d
        }, expand: function (t) {
            var n, e, r, u = t.length, a = t[0].length, i = 1 / u, o = [];
            for (e = 0; a > e; ++e) {
                for (n = 0, r = 0; u > n; n++) r += t[n][e][1];
                if (r) for (n = 0; u > n; n++) t[n][e][1] /= r; else for (n = 0; u > n; n++) t[n][e][1] = i
            }
            for (e = 0; a > e; ++e) o[e] = 0;
            return o
        }, zero: tr
    });
    d3.layout.histogram = function () {
        function t(t, a) {
            for (var i, o, c = [], l = t.map(e, this), s = r.call(this, l, a), f = u.call(this, s, l, a), a = -1, h = l.length, d = f.length - 1, g = n ? 1 : 1 / h; ++a < d;) i = c[a] = [], i.dx = f[a + 1] - (i.x = f[a]), i.y = 0;
            if (d > 0) for (a = -1; ++a < h;) o = l[a], o >= s[0] && o <= s[1] && (i = c[d3.bisect(f, o, 1, d) - 1], i.y += g, i.push(t[a]));
            return c
        }

        var n = !0, e = Number, r = ir, u = ur;
        return t.value = function (n) {
            return arguments.length ? (e = n, t) : e
        }, t.range = function (n) {
            return arguments.length ? (r = o(n), t) : r
        }, t.bins = function (n) {
            return arguments.length ? (u = "number" == typeof n ? function (t) {
                return ar(t, n)
            } : o(n), t) : u
        }, t.frequency = function (e) {
            return arguments.length ? (n = !!e, t) : n
        }, t
    }, d3.layout.hierarchy = function () {
        function t(n, i, o) {
            var c = u.call(e, n, i), l = fi ? n : {data: n};
            if (l.depth = i, o.push(l), c && (s = c.length)) {
                for (var s, f, h = -1, d = l.children = [], g = 0, m = i + 1; ++h < s;) f = t(c[h], m, o), f.parent = l, d.push(f), g += f.value;
                r && d.sort(r), a && (l.value = g)
            } else a && (l.value = +a.call(e, n, i) || 0);
            return l
        }

        function n(t, r) {
            var u = t.children, i = 0;
            if (u && (o = u.length)) for (var o, c = -1, l = r + 1; ++c < o;) i += n(u[c], l); else a && (i = +a.call(e, fi ? t : t.data, r) || 0);
            return a && (t.value = i), i
        }

        function e(n) {
            var e = [];
            return t(n, 0, e), e
        }

        var r = sr, u = cr, a = lr;
        return e.sort = function (t) {
            return arguments.length ? (r = t, e) : r
        }, e.children = function (t) {
            return arguments.length ? (u = t, e) : u
        }, e.value = function (t) {
            return arguments.length ? (a = t, e) : a
        }, e.revalue = function (t) {
            return n(t, 0), t
        }, e
    };
    var fi = !1;
    d3.layout.pack = function () {
        function t(t, u) {
            var a = n.call(this, t, u), i = a[0];
            i.x = 0, i.y = 0, Er(i, function (t) {
                t.r = Math.sqrt(t.value)
            }), Er(i, pr);
            var o = r[0], c = r[1], l = Math.max(2 * i.r / o, 2 * i.r / c);
            if (e > 0) {
                var s = e * l / 2;
                Er(i, function (t) {
                    t.r += s
                }), Er(i, pr), Er(i, function (t) {
                    t.r -= s
                }), l = Math.max(2 * i.r / o, 2 * i.r / c)
            }
            return xr(i, o / 2, c / 2, 1 / l), a
        }

        var n = d3.layout.hierarchy().sort(hr), e = 0, r = [1, 1];
        return t.size = function (n) {
            return arguments.length ? (r = n, t) : r
        }, t.padding = function (n) {
            return arguments.length ? (e = +n, t) : e
        }, or(t, n)
    }, d3.layout.cluster = function () {
        function t(t, u) {
            var a, i = n.call(this, t, u), o = i[0], c = 0;
            Er(o, function (t) {
                var n = t.children;
                n && n.length ? (t.x = _r(n), t.y = Mr(n)) : (t.x = a ? c += e(t, a) : 0, t.y = 0, a = t)
            });
            var l = wr(o), s = kr(o), f = l.x - e(l, s) / 2, h = s.x + e(s, l) / 2;
            return Er(o, function (t) {
                t.x = (t.x - f) / (h - f) * r[0], t.y = (1 - (o.y ? t.y / o.y : 1)) * r[1]
            }), i
        }

        var n = d3.layout.hierarchy().sort(null).value(null), e = Ar, r = [1, 1];
        return t.separation = function (n) {
            return arguments.length ? (e = n, t) : e
        }, t.size = function (n) {
            return arguments.length ? (r = n, t) : r
        }, or(t, n)
    }, d3.layout.tree = function () {
        function t(t, u) {
            function a(t, n) {
                var r = t.children, u = t._tree;
                if (r && (i = r.length)) {
                    for (var i, c, l, s = r[0], f = s, h = -1; ++h < i;) l = r[h], a(l, c), f = o(l, c, f), c = l;
                    Dr(t);
                    var d = .5 * (s._tree.prelim + l._tree.prelim);
                    n ? (u.prelim = n._tree.prelim + e(t, n), u.mod = u.prelim - d) : u.prelim = d
                } else n && (u.prelim = n._tree.prelim + e(t, n))
            }

            function i(t, n) {
                t.x = t._tree.prelim + n;
                var e = t.children;
                if (e && (r = e.length)) {
                    var r, u = -1;
                    for (n += t._tree.mod; ++u < r;) i(e[u], n)
                }
            }

            function o(t, n, r) {
                if (n) {
                    for (var u, a = t, i = t, o = n, c = t.parent.children[0], l = a._tree.mod, s = i._tree.mod, f = o._tree.mod, h = c._tree.mod; o = Sr(o), a = Nr(a), o && a;) c = Nr(c), i = Sr(i), i._tree.ancestor = t, u = o._tree.prelim + f - a._tree.prelim - l + e(o, a), u > 0 && (Pr(Lr(o, t, r), t, u), l += u, s += u), f += o._tree.mod, l += a._tree.mod, h += c._tree.mod, s += i._tree.mod;
                    o && !Sr(i) && (i._tree.thread = o, i._tree.mod += f - s), a && !Nr(c) && (c._tree.thread = a, c._tree.mod += l - h, r = t)
                }
                return r
            }

            var c = n.call(this, t, u), l = c[0];
            Er(l, function (t, n) {
                t._tree = {ancestor: t, prelim: 0, mod: 0, change: 0, shift: 0, number: n ? n._tree.number + 1 : 0}
            }), a(l), i(l, -l._tree.prelim);
            var s = Cr(l, qr), f = Cr(l, Tr), h = Cr(l, zr), d = s.x - e(s, f) / 2, g = f.x + e(f, s) / 2,
                m = h.depth || 1;
            return Er(l, function (t) {
                t.x = (t.x - d) / (g - d) * r[0], t.y = t.depth / m * r[1], delete t._tree
            }), c
        }

        var n = d3.layout.hierarchy().sort(null).value(null), e = Ar, r = [1, 1];
        return t.separation = function (n) {
            return arguments.length ? (e = n, t) : e
        }, t.size = function (n) {
            return arguments.length ? (r = n, t) : r
        }, or(t, n)
    }, d3.layout.treemap = function () {
        function t(t, n) {
            for (var e, r, u = -1, a = t.length; ++u < a;) r = (e = t[u]).value * (0 > n ? 0 : n), e.area = isNaN(r) || 0 >= r ? 0 : r
        }

        function n(e) {
            var a = e.children;
            if (a && a.length) {
                var i, o, c, l = f(e), s = [], h = a.slice(), d = 1 / 0, g = Math.min(l.dx, l.dy);
                for (t(h, l.dx * l.dy / e.value), s.area = 0; (c = h.length) > 0;) s.push(i = h[c - 1]), s.area += i.area, (o = r(s, g)) <= d ? (h.pop(), d = o) : (s.area -= s.pop().area, u(s, g, l, !1), g = Math.min(l.dx, l.dy), s.length = s.area = 0, d = 1 / 0);
                s.length && (u(s, g, l, !0), s.length = s.area = 0), a.forEach(n)
            }
        }

        function e(n) {
            var r = n.children;
            if (r && r.length) {
                var a, i = f(n), o = r.slice(), c = [];
                for (t(o, i.dx * i.dy / n.value), c.area = 0; a = o.pop();) c.push(a), c.area += a.area, null != a.z && (u(c, a.z ? i.dx : i.dy, i, !o.length), c.length = c.area = 0);
                r.forEach(e)
            }
        }

        function r(t, n) {
            for (var e, r = t.area, u = 0, a = 1 / 0, i = -1, o = t.length; ++i < o;) (e = t[i].area) && (a > e && (a = e), e > u && (u = e));
            return r *= r, n *= n, r ? Math.max(n * u * d / r, r / (n * a * d)) : 1 / 0
        }

        function u(t, n, e, r) {
            var u, a = -1, i = t.length, o = e.x, l = e.y, s = n ? c(t.area / n) : 0;
            if (n == e.dx) {
                for ((r || s > e.dy) && (s = e.dy); ++a < i;) u = t[a], u.x = o, u.y = l, u.dy = s, o += u.dx = Math.min(e.x + e.dx - o, s ? c(u.area / s) : 0);
                u.z = !0, u.dx += e.x + e.dx - o, e.y += s, e.dy -= s
            } else {
                for ((r || s > e.dx) && (s = e.dx); ++a < i;) u = t[a], u.x = o, u.y = l, u.dx = s, l += u.dy = Math.min(e.y + e.dy - l, s ? c(u.area / s) : 0);
                u.z = !1, u.dy += e.y + e.dy - l, e.x += s, e.dx -= s
            }
        }

        function a(r) {
            var u = i || o(r), a = u[0];
            return a.x = 0, a.y = 0, a.dx = l[0], a.dy = l[1], i && o.revalue(a), t([a], a.dx * a.dy / a.value), (i ? e : n)(a), h && (i = u), u
        }

        var i, o = d3.layout.hierarchy(), c = Math.round, l = [1, 1], s = null, f = Fr, h = !1,
            d = .5 * (1 + Math.sqrt(5));
        return a.size = function (t) {
            return arguments.length ? (l = t, a) : l
        }, a.padding = function (t) {
            function n(n) {
                var e = t.call(a, n, n.depth);
                return null == e ? Fr(n) : Ir(n, "number" == typeof e ? [e, e, e, e] : e)
            }

            function e(n) {
                return Ir(n, t)
            }

            if (!arguments.length) return s;
            var r;
            return f = null == (s = t) ? Fr : "function" == (r = typeof t) ? n : "number" === r ? (t = [t, t, t, t], e) : e, a
        }, a.round = function (t) {
            return arguments.length ? (c = t ? Math.round : Number, a) : c != Number
        }, a.sticky = function (t) {
            return arguments.length ? (h = t, i = null, a) : h
        }, a.ratio = function (t) {
            return arguments.length ? (d = t, a) : d
        }, or(a, o)
    }, d3.csv = Hr(",", "text/csv"), d3.tsv = Hr("	", "text/tab-separated-values"), d3.geo = {};
    var hi = Math.PI / 180;
    d3.geo.azimuthal = function () {
        function t(t) {
            var n, r = t[0] * hi - e, l = t[1] * hi, s = Math.cos(r), f = Math.sin(r), h = Math.cos(l), d = Math.sin(l),
                g = "orthographic" !== i ? a * d + u * h * s : null,
                m = "stereographic" === i ? 1 / (1 + g) : "gnomonic" === i ? 1 / g : "equidistant" === i ? (n = Math.acos(g), n ? n / Math.sin(n) : 0) : "equalarea" === i ? Math.sqrt(2 / (1 + g)) : 1,
                p = m * h * f, v = m * (a * h * s - u * d);
            return [o * p + c[0], o * v + c[1]]
        }

        var n, e, r, u, a, i = "orthographic", o = 200, c = [480, 250];
        return t.invert = function (t) {
            var n = (t[0] - c[0]) / o, r = (t[1] - c[1]) / o, l = Math.sqrt(n * n + r * r),
                s = "stereographic" === i ? 2 * Math.atan(l) : "gnomonic" === i ? Math.atan(l) : "equidistant" === i ? l : "equalarea" === i ? 2 * Math.asin(.5 * l) : Math.asin(l),
                f = Math.sin(s), h = Math.cos(s);
            return [(e + Math.atan2(n * f, l * u * h + r * a * f)) / hi, Math.asin(h * a - (l ? r * f * u / l : 0)) / hi]
        }, t.mode = function (n) {
            return arguments.length ? (i = n + "", t) : i
        }, t.origin = function (i) {
            return arguments.length ? (n = i, e = n[0] * hi, r = n[1] * hi, u = Math.cos(r), a = Math.sin(r), t) : n
        }, t.scale = function (n) {
            return arguments.length ? (o = +n, t) : o
        }, t.translate = function (n) {
            return arguments.length ? (c = [+n[0], +n[1]], t) : c
        }, t.origin([0, 0])
    }, d3.geo.albers = function () {
        function t(t) {
            var n = r * (hi * t[0] - e), i = Math.sqrt(u - 2 * r * Math.sin(hi * t[1])) / r;
            return [c * i * Math.sin(n) + l[0], c * (i * Math.cos(n) - a) + l[1]]
        }

        function n() {
            var n = hi * o[0], c = hi * o[1], l = hi * i[1], s = Math.sin(n), f = Math.cos(n);
            return e = hi * i[0], r = .5 * (s + Math.sin(c)), u = f * f + 2 * r * s, a = Math.sqrt(u - 2 * r * Math.sin(l)) / r, t
        }

        var e, r, u, a, i = [-98, 38], o = [29.5, 45.5], c = 1e3, l = [480, 250];
        return t.invert = function (t) {
            var n = (t[0] - l[0]) / c, i = (t[1] - l[1]) / c, o = a + i, s = Math.atan2(n, o),
                f = Math.sqrt(n * n + o * o);
            return [(e + s / r) / hi, Math.asin((u - f * f * r * r) / (2 * r)) / hi]
        }, t.origin = function (t) {
            return arguments.length ? (i = [+t[0], +t[1]], n()) : i
        }, t.parallels = function (t) {
            return arguments.length ? (o = [+t[0], +t[1]], n()) : o
        }, t.scale = function (n) {
            return arguments.length ? (c = +n, t) : c
        }, t.translate = function (n) {
            return arguments.length ? (l = [+n[0], +n[1]], t) : l
        }, n()
    }, d3.geo.albersUsa = function () {
        function t(t) {
            var a = t[0], i = t[1];
            return (i > 50 ? e : -140 > a ? r : 21 > i ? u : n)(t)
        }

        var n = d3.geo.albers(), e = d3.geo.albers().origin([-160, 60]).parallels([55, 65]),
            r = d3.geo.albers().origin([-160, 20]).parallels([8, 18]),
            u = d3.geo.albers().origin([-60, 10]).parallels([8, 18]);
        return t.scale = function (a) {
            return arguments.length ? (n.scale(a), e.scale(.6 * a), r.scale(a), u.scale(1.5 * a), t.translate(n.translate())) : n.scale()
        }, t.translate = function (a) {
            if (!arguments.length) return n.translate();
            var i = n.scale() / 1e3, o = a[0], c = a[1];
            return n.translate(a), e.translate([o - 400 * i, c + 170 * i]), r.translate([o - 190 * i, c + 200 * i]), u.translate([o + 580 * i, c + 430 * i]), t
        }, t.scale(n.scale())
    }, d3.geo.bonne = function () {
        function t(t) {
            var o = t[0] * hi - n, c = t[1] * hi - e;
            if (r) {
                var l = u + r - c, s = o * Math.cos(c) / l;
                o = l * Math.sin(s), c = l * Math.cos(s) - u
            } else o *= Math.cos(c), c *= -1;
            return [a * o + i[0], a * c + i[1]]
        }

        var n, e, r, u, a = 200, i = [480, 250];
        return t.invert = function (t) {
            var e = (t[0] - i[0]) / a, o = (t[1] - i[1]) / a;
            if (r) {
                var c = u + o, l = Math.sqrt(e * e + c * c);
                o = u + r - l, e = n + l * Math.atan2(e, c) / Math.cos(o)
            } else o *= -1, e /= Math.cos(o);
            return [e / hi, o / hi]
        }, t.parallel = function (n) {
            return arguments.length ? (u = 1 / Math.tan(r = n * hi), t) : r / hi
        }, t.origin = function (r) {
            return arguments.length ? (n = r[0] * hi, e = r[1] * hi, t) : [n / hi, e / hi]
        }, t.scale = function (n) {
            return arguments.length ? (a = +n, t) : a
        }, t.translate = function (n) {
            return arguments.length ? (i = [+n[0], +n[1]], t) : i
        }, t.origin([0, 0]).parallel(45)
    }, d3.geo.equirectangular = function () {
        function t(t) {
            var r = t[0] / 360, u = -t[1] / 360;
            return [n * r + e[0], n * u + e[1]]
        }

        var n = 500, e = [480, 250];
        return t.invert = function (t) {
            var r = (t[0] - e[0]) / n, u = (t[1] - e[1]) / n;
            return [360 * r, -360 * u]
        }, t.scale = function (e) {
            return arguments.length ? (n = +e, t) : n
        }, t.translate = function (n) {
            return arguments.length ? (e = [+n[0], +n[1]], t) : e
        }, t
    }, d3.geo.mercator = function () {
        function t(t) {
            var r = t[0] / 360, u = -(Math.log(Math.tan(Math.PI / 4 + t[1] * hi / 2)) / hi) / 360;
            return [n * r + e[0], n * Math.max(-.5, Math.min(.5, u)) + e[1]]
        }

        var n = 500, e = [480, 250];
        return t.invert = function (t) {
            var r = (t[0] - e[0]) / n, u = (t[1] - e[1]) / n;
            return [360 * r, 2 * Math.atan(Math.exp(-360 * u * hi)) / hi - 90]
        }, t.scale = function (e) {
            return arguments.length ? (n = +e, t) : n
        }, t.translate = function (n) {
            return arguments.length ? (e = [+n[0], +n[1]], t) : e
        }, t
    }, d3.geo.path = function () {
        function t(t) {
            "function" == typeof a && (i = Rr(a.apply(this, arguments))), l(t);
            var n = c.length ? c.join("") : null;
            return c = [], n
        }

        function n(t) {
            return o(t).join(",")
        }

        function e(t) {
            for (var n = u(t[0]), e = 0, r = t.length; ++e < r;) n -= u(t[e]);
            return n
        }

        function r(t) {
            for (var n = d3.geom.polygon(t[0].map(o)), e = n.area(), r = n.centroid(0 > e ? (e *= -1, 1) : -1), u = r[0], a = r[1], i = e, c = 0, l = t.length; ++c < l;) n = d3.geom.polygon(t[c].map(o)), e = n.area(), r = n.centroid(0 > e ? (e *= -1, 1) : -1), u -= r[0], a -= r[1], i -= e;
            return [u, a, 6 * i]
        }

        function u(t) {
            return Math.abs(d3.geom.polygon(t.map(o)).area())
        }

        var a = 4.5, i = Rr(a), o = d3.geo.albersUsa(), c = [], l = Or({
            FeatureCollection: function (t) {
                for (var n = t.features, e = -1, r = n.length; ++e < r;) c.push(l(n[e].geometry))
            }, Feature: function (t) {
                l(t.geometry)
            }, Point: function (t) {
                c.push("M", n(t.coordinates), i)
            }, MultiPoint: function (t) {
                for (var e = t.coordinates, r = -1, u = e.length; ++r < u;) c.push("M", n(e[r]), i)
            }, LineString: function (t) {
                var e = t.coordinates, r = -1, u = e.length;
                for (c.push("M"); ++r < u;) c.push(n(e[r]), "L");
                c.pop()
            }, MultiLineString: function (t) {
                for (var e, r, u, a = t.coordinates, i = -1, o = a.length; ++i < o;) {
                    for (e = a[i], r = -1, u = e.length, c.push("M"); ++r < u;) c.push(n(e[r]), "L");
                    c.pop()
                }
            }, Polygon: function (t) {
                for (var e, r, u, a = t.coordinates, i = -1, o = a.length; ++i < o;) if (e = a[i], r = -1, (u = e.length - 1) > 0) {
                    for (c.push("M"); ++r < u;) c.push(n(e[r]), "L");
                    c[c.length - 1] = "Z"
                }
            }, MultiPolygon: function (t) {
                for (var e, r, u, a, i, o, l = t.coordinates, s = -1, f = l.length; ++s < f;) for (e = l[s], r = -1, u = e.length; ++r < u;) if (a = e[r], i = -1, (o = a.length - 1) > 0) {
                    for (c.push("M"); ++i < o;) c.push(n(a[i]), "L");
                    c[c.length - 1] = "Z"
                }
            }, GeometryCollection: function (t) {
                for (var n = t.geometries, e = -1, r = n.length; ++e < r;) c.push(l(n[e]))
            }
        }), s = t.area = Or({
            FeatureCollection: function (t) {
                for (var n = 0, e = t.features, r = -1, u = e.length; ++r < u;) n += s(e[r]);
                return n
            }, Feature: function (t) {
                return s(t.geometry)
            }, Polygon: function (t) {
                return e(t.coordinates)
            }, MultiPolygon: function (t) {
                for (var n = 0, r = t.coordinates, u = -1, a = r.length; ++u < a;) n += e(r[u]);
                return n
            }, GeometryCollection: function (t) {
                for (var n = 0, e = t.geometries, r = -1, u = e.length; ++r < u;) n += s(e[r]);
                return n
            }
        }, 0), f = t.centroid = Or({
            Feature: function (t) {
                return f(t.geometry)
            }, Polygon: function (t) {
                var n = r(t.coordinates);
                return [n[0] / n[2], n[1] / n[2]]
            }, MultiPolygon: function (t) {
                for (var n, e = t.coordinates, u = 0, a = 0, i = 0, o = -1, c = e.length; ++o < c;) n = r(e[o]), u += n[0], a += n[1], i += n[2];
                return [u / i, a / i]
            }
        });
        return t.projection = function (n) {
            return o = n, t
        }, t.pointRadius = function (n) {
            return "function" == typeof n ? a = n : (a = +n, i = Rr(a)), t
        }, t
    }, d3.geo.bounds = function (t) {
        var n = 1 / 0, e = 1 / 0, r = -1 / 0, u = -1 / 0;
        return jr(t, function (t, a) {
            n > t && (n = t), t > r && (r = t), e > a && (e = a), a > u && (u = a)
        }), [[n, e], [r, u]]
    };
    var di = {
        Feature: Yr,
        FeatureCollection: Ur,
        GeometryCollection: Vr,
        LineString: Zr,
        MultiLineString: Br,
        MultiPoint: Zr,
        MultiPolygon: Xr,
        Point: $r,
        Polygon: Gr
    };
    d3.geo.circle = function () {
        function t() {
        }

        function n(t) {
            return c.distance(t) < o
        }

        function e(t) {
            for (var n, e, u, a, i, l = -1, s = t.length, f = []; ++l < s;) i = c.distance(u = t[l]), o > i ? (e && f.push(Wr(e, u)((a - o) / (a - i))), f.push(u), n = e = null) : (e = u, !n && f.length && (f.push(Wr(f[f.length - 1], e)((o - a) / (i - a))), n = e)), a = i;
            return n = t[0], e = f[0], !e || u[0] !== n[0] || u[1] !== n[1] || u[0] === e[0] && u[1] === e[1] || f.push(e), r(f)
        }

        function r(t) {
            for (var n, e, r, u = 0, a = t.length, i = a ? [t[0]] : t, o = c.source(); ++u < a;) for (r = c.source(t[u - 1])(t[u]).coordinates, n = 0, e = r.length; ++n < e;) i.push(r[n]);
            return c.source(o), i
        }

        var a = [0, 0], i = 89.99, o = i * hi, c = d3.geo.greatArc().source(a).target(u);
        t.clip = function (t) {
            return "function" == typeof a && c.source(a.apply(this, arguments)), l(t) || null
        };
        var l = Or({
            FeatureCollection: function (t) {
                var n = t.features.map(l).filter(u);
                return n && (t = Object.create(t), t.features = n, t)
            }, Feature: function (t) {
                var n = l(t.geometry);
                return n && (t = Object.create(t), t.geometry = n, t)
            }, Point: function (t) {
                return n(t.coordinates) && t
            }, MultiPoint: function (t) {
                var e = t.coordinates.filter(n);
                return e.length && {type: t.type, coordinates: e}
            }, LineString: function (t) {
                var n = e(t.coordinates);
                return n.length && (t = Object.create(t), t.coordinates = n, t)
            }, MultiLineString: function (t) {
                var n = t.coordinates.map(e).filter(function (t) {
                    return t.length
                });
                return n.length && (t = Object.create(t), t.coordinates = n, t)
            }, Polygon: function (t) {
                var n = t.coordinates.map(e);
                return n[0].length && (t = Object.create(t), t.coordinates = n, t)
            }, MultiPolygon: function (t) {
                var n = t.coordinates.map(function (t) {
                    return t.map(e)
                }).filter(function (t) {
                    return t[0].length
                });
                return n.length && (t = Object.create(t), t.coordinates = n, t)
            }, GeometryCollection: function (t) {
                var n = t.geometries.map(l).filter(u);
                return n.length && (t = Object.create(t), t.geometries = n, t)
            }
        });
        return t.origin = function (n) {
            return arguments.length ? (a = n, "function" != typeof a && c.source(a), t) : a
        }, t.angle = function (n) {
            return arguments.length ? (o = (i = +n) * hi, t) : i
        }, d3.rebind(t, c, "precision")
    }, d3.geo.greatArc = function () {
        function t() {
            for (var r = t.distance.apply(this, arguments), u = 0, o = a / r, c = [n]; (u += o) < 1;) c.push(i(u));
            return c.push(e), {type: "LineString", coordinates: c}
        }

        var n, e, r = Kr, u = Jr, a = 6 * hi, i = Qr();
        return t.distance = function () {
            return "function" == typeof r && i.source(n = r.apply(this, arguments)), "function" == typeof u && i.target(e = u.apply(this, arguments)), i.distance()
        }, t.source = function (e) {
            return arguments.length ? (r = e, "function" != typeof r && i.source(n = r), t) : r
        }, t.target = function (n) {
            return arguments.length ? (u = n, "function" != typeof u && i.target(e = u), t) : u
        }, t.precision = function (n) {
            return arguments.length ? (a = n * hi, t) : a / hi
        }, t
    }, d3.geo.greatCircle = d3.geo.circle, d3.geom = {}, d3.geom.contour = function (t, n) {
        var e = n || tu(t), r = [], u = e[0], a = e[1], i = 0, o = 0, c = 0 / 0, l = 0 / 0, s = 0;
        do s = 0, t(u - 1, a - 1) && (s += 1), t(u, a - 1) && (s += 2), t(u - 1, a) && (s += 4), t(u, a) && (s += 8), 6 === s ? (i = -1 === l ? -1 : 1, o = 0) : 9 === s ? (i = 0, o = 1 === c ? -1 : 1) : (i = gi[s], o = mi[s]), i != c && o != l && (r.push([u, a]), c = i, l = o), u += i, a += o; while (e[0] != u || e[1] != a);
        return r
    };
    var gi = [1, 0, 1, 1, -1, 0, -1, 1, 0, 0, 0, 0, -1, 0, -1, 0 / 0],
        mi = [0, -1, 0, 0, 0, -1, 0, 0, 1, -1, 1, 1, 0, -1, 0, 0 / 0];
    d3.geom.hull = function (t) {
        if (t.length < 3) return [];
        var n, e, r, u, a, i, o, c, l, s, f = t.length, h = f - 1, d = [], g = [], m = 0;
        for (n = 1; f > n; ++n) t[n][1] < t[m][1] ? m = n : t[n][1] == t[m][1] && (m = t[n][0] < t[m][0] ? n : m);
        for (n = 0; f > n; ++n) n !== m && (u = t[n][1] - t[m][1], r = t[n][0] - t[m][0], d.push({
            angle: Math.atan2(u, r),
            index: n
        }));
        for (d.sort(function (t, n) {
            return t.angle - n.angle
        }), l = d[0].angle, c = d[0].index, o = 0, n = 1; h > n; ++n) e = d[n].index, l == d[n].angle ? (r = t[c][0] - t[m][0], u = t[c][1] - t[m][1], a = t[e][0] - t[m][0], i = t[e][1] - t[m][1], r * r + u * u >= a * a + i * i ? d[n].index = -1 : (d[o].index = -1, l = d[n].angle, o = n, c = e)) : (l = d[n].angle, o = n, c = e);
        for (g.push(m), n = 0, e = 0; 2 > n; ++e) -1 !== d[e].index && (g.push(d[e].index), n++);
        for (s = g.length; h > e; ++e) if (-1 !== d[e].index) {
            for (; !nu(g[s - 2], g[s - 1], d[e].index, t);) --s;
            g[s++] = d[e].index
        }
        var p = [];
        for (n = 0; s > n; ++n) p.push(t[g[n]]);
        return p
    }, d3.geom.polygon = function (t) {
        return t.area = function () {
            for (var n = 0, e = t.length, r = t[e - 1][0] * t[0][1], u = t[e - 1][1] * t[0][0]; ++n < e;) r += t[n - 1][0] * t[n][1], u += t[n - 1][1] * t[n][0];
            return .5 * (u - r)
        }, t.centroid = function (n) {
            var e, r, u = -1, a = t.length, i = 0, o = 0, c = t[a - 1];
            for (arguments.length || (n = -1 / (6 * t.area())); ++u < a;) e = c, c = t[u], r = e[0] * c[1] - c[0] * e[1], i += (e[0] + c[0]) * r, o += (e[1] + c[1]) * r;
            return [i * n, o * n]
        }, t.clip = function (n) {
            for (var e, r, u, a, i, o, c = -1, l = t.length, s = t[l - 1]; ++c < l;) {
                for (e = n.slice(), n.length = 0, a = t[c], i = e[(u = e.length) - 1], r = -1; ++r < u;) o = e[r], eu(o, s, a) ? (eu(i, s, a) || n.push(ru(i, o, s, a)), n.push(o)) : eu(i, s, a) && n.push(ru(i, o, s, a)), i = o;
                s = a
            }
            return n
        }, t
    }, d3.geom.voronoi = function (t) {
        var n = t.map(function () {
            return []
        });
        return uu(t, function (t) {
            var e, r, u, a, i, o;
            1 === t.a && t.b >= 0 ? (e = t.ep.r, r = t.ep.l) : (e = t.ep.l, r = t.ep.r), 1 === t.a ? (i = e ? e.y : -1e6, u = t.c - t.b * i, o = r ? r.y : 1e6, a = t.c - t.b * o) : (u = e ? e.x : -1e6, i = t.c - t.a * u, a = r ? r.x : 1e6, o = t.c - t.a * a);
            var c = [u, i], l = [a, o];
            n[t.region.l.index].push(c, l), n[t.region.r.index].push(c, l)
        }), n.map(function (n, e) {
            var r = t[e][0], u = t[e][1];
            return n.forEach(function (t) {
                t.angle = Math.atan2(t[0] - r, t[1] - u)
            }), n.sort(function (t, n) {
                return t.angle - n.angle
            }).filter(function (t, e) {
                return !e || t.angle - n[e - 1].angle > 1e-10
            })
        })
    };
    var pi = {l: "r", r: "l"};
    d3.geom.delaunay = function (t) {
        var n = t.map(function () {
            return []
        }), e = [];
        return uu(t, function (e) {
            n[e.region.l.index].push(t[e.region.r.index])
        }), n.forEach(function (n, r) {
            var u = t[r], a = u[0], i = u[1];
            n.forEach(function (t) {
                t.angle = Math.atan2(t[0] - a, t[1] - i)
            }), n.sort(function (t, n) {
                return t.angle - n.angle
            });
            for (var o = 0, c = n.length - 1; c > o; o++) e.push([u, n[o], n[o + 1]])
        }), e
    }, d3.geom.quadtree = function (t, n, e, r, u) {
        function a(t, n, e, r, u, a) {
            if (!isNaN(n.x) && !isNaN(n.y)) if (t.leaf) {
                var o = t.point;
                o ? Math.abs(o.x - n.x) + Math.abs(o.y - n.y) < .01 ? i(t, n, e, r, u, a) : (t.point = null, i(t, o, e, r, u, a), i(t, n, e, r, u, a)) : t.point = n
            } else i(t, n, e, r, u, a)
        }

        function i(t, n, e, r, u, i) {
            var o = .5 * (e + u), c = .5 * (r + i), l = n.x >= o, s = n.y >= c, f = (s << 1) + l;
            t.leaf = !1, t = t.nodes[f] || (t.nodes[f] = au()), l ? e = o : u = o, s ? r = c : i = c, a(t, n, e, r, u, i)
        }

        var o, c = -1, l = t.length;
        if (l && isNaN(t[0].x) && (t = t.map(ou)), arguments.length < 5) if (3 === arguments.length) u = r = e, e = n; else {
            for (n = e = 1 / 0, r = u = -1 / 0; ++c < l;) o = t[c], o.x < n && (n = o.x), o.y < e && (e = o.y), o.x > r && (r = o.x), o.y > u && (u = o.y);
            var s = r - n, f = u - e;
            s > f ? u = e + s : r = n + f
        }
        var h = au();
        return h.add = function (t) {
            a(h, t, n, e, r, u)
        }, h.visit = function (t) {
            iu(t, h, n, e, r, u)
        }, t.forEach(h.add), h
    }, d3.time = {};
    var vi = Date, yi = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    cu.prototype = {
        getDate: function () {
            return this._.getUTCDate()
        }, getDay: function () {
            return this._.getUTCDay()
        }, getFullYear: function () {
            return this._.getUTCFullYear()
        }, getHours: function () {
            return this._.getUTCHours()
        }, getMilliseconds: function () {
            return this._.getUTCMilliseconds()
        }, getMinutes: function () {
            return this._.getUTCMinutes()
        }, getMonth: function () {
            return this._.getUTCMonth()
        }, getSeconds: function () {
            return this._.getUTCSeconds()
        }, getTime: function () {
            return this._.getTime()
        }, getTimezoneOffset: function () {
            return 0
        }, valueOf: function () {
            return this._.valueOf()
        }, setDate: function () {
            xi.setUTCDate.apply(this._, arguments)
        }, setDay: function () {
            xi.setUTCDay.apply(this._, arguments)
        }, setFullYear: function () {
            xi.setUTCFullYear.apply(this._, arguments)
        }, setHours: function () {
            xi.setUTCHours.apply(this._, arguments)
        }, setMilliseconds: function () {
            xi.setUTCMilliseconds.apply(this._, arguments)
        }, setMinutes: function () {
            xi.setUTCMinutes.apply(this._, arguments)
        }, setMonth: function () {
            xi.setUTCMonth.apply(this._, arguments)
        }, setSeconds: function () {
            xi.setUTCSeconds.apply(this._, arguments)
        }, setTime: function () {
            xi.setTime.apply(this._, arguments)
        }
    };
    var xi = Date.prototype, bi = "%a %b %e %H:%M:%S %Y", Mi = "%m/%d/%y", _i = "%H:%M:%S", wi = yi, ki = wi.map(lu),
        Ai = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        Ni = Ai.map(lu);
    d3.time.format = function (t) {
        function n(n) {
            for (var r, u, a = [], i = -1, o = 0; ++i < e;) 37 == t.charCodeAt(i) && (a.push(t.substring(o, i), (u = Ii[r = t.charAt(++i)]) ? u(n) : r), o = i + 1);
            return a.push(t.substring(o, i)), a.join("")
        }

        var e = t.length;
        return n.parse = function (n) {
            var e = {y: 1900, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0}, r = su(e, t, n, 0);
            if (r != n.length) return null;
            "p" in e && (e.H = e.H % 12 + 12 * e.p);
            var u = new vi;
            return u.setFullYear(e.y, e.m, e.d), u.setHours(e.H, e.M, e.S, e.L), u
        }, n.toString = function () {
            return t
        }, n
    };
    var Si = d3.format("02d"), Ci = d3.format("03d"), Ti = d3.format("04d"), qi = d3.format("2d"), zi = fu(wi),
        Ei = fu(ki), Di = fu(Ai), Pi = hu(Ai), Li = fu(Ni), Fi = hu(Ni), Ii = {
            a: function (t) {
                return ki[t.getDay()]
            }, A: function (t) {
                return wi[t.getDay()]
            }, b: function (t) {
                return Ni[t.getMonth()]
            }, B: function (t) {
                return Ai[t.getMonth()]
            }, c: d3.time.format(bi), d: function (t) {
                return Si(t.getDate())
            }, e: function (t) {
                return qi(t.getDate())
            }, H: function (t) {
                return Si(t.getHours())
            }, I: function (t) {
                return Si(t.getHours() % 12 || 12)
            }, j: function (t) {
                return Ci(1 + d3.time.dayOfYear(t))
            }, L: function (t) {
                return Ci(t.getMilliseconds())
            }, m: function (t) {
                return Si(t.getMonth() + 1)
            }, M: function (t) {
                return Si(t.getMinutes())
            }, p: function (t) {
                return t.getHours() >= 12 ? "PM" : "AM"
            }, S: function (t) {
                return Si(t.getSeconds())
            }, U: function (t) {
                return Si(d3.time.sundayOfYear(t))
            }, w: function (t) {
                return t.getDay()
            }, W: function (t) {
                return Si(d3.time.mondayOfYear(t))
            }, x: d3.time.format(Mi), X: d3.time.format(_i), y: function (t) {
                return Si(t.getFullYear() % 100)
            }, Y: function (t) {
                return Ti(t.getFullYear() % 1e4)
            }, Z: qu, "%": function () {
                return "%"
            }
        }, Hi = {
            a: du,
            A: gu,
            b: mu,
            B: pu,
            c: vu,
            d: ku,
            e: ku,
            H: Au,
            I: Au,
            L: Cu,
            m: wu,
            M: Nu,
            p: Tu,
            S: Su,
            x: yu,
            X: xu,
            y: Mu,
            Y: bu
        }, Oi = /^\s*\d+/, Ri = d3.map({am: 0, pm: 1});
    d3.time.format.utc = function (t) {
        function n(t) {
            try {
                vi = cu;
                var n = new vi;
                return n._ = t, e(n)
            } finally {
                vi = Date
            }
        }

        var e = d3.time.format(t);
        return n.parse = function (t) {
            try {
                vi = cu;
                var n = e.parse(t);
                return n && n._
            } finally {
                vi = Date
            }
        }, n.toString = e.toString, n
    };
    var ji = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");
    d3.time.format.iso = Date.prototype.toISOString ? zu : ji, zu.parse = function (t) {
        var n = new Date(t);
        return isNaN(n) ? null : n
    }, zu.toString = ji.toString, d3.time.second = Eu(function (t) {
        return new vi(1e3 * Math.floor(t / 1e3))
    }, function (t, n) {
        t.setTime(t.getTime() + 1e3 * Math.floor(n))
    }, function (t) {
        return t.getSeconds()
    }), d3.time.seconds = d3.time.second.range, d3.time.seconds.utc = d3.time.second.utc.range, d3.time.minute = Eu(function (t) {
        return new vi(6e4 * Math.floor(t / 6e4))
    }, function (t, n) {
        t.setTime(t.getTime() + 6e4 * Math.floor(n))
    }, function (t) {
        return t.getMinutes()
    }), d3.time.minutes = d3.time.minute.range, d3.time.minutes.utc = d3.time.minute.utc.range, d3.time.hour = Eu(function (t) {
        var n = t.getTimezoneOffset() / 60;
        return new vi(36e5 * (Math.floor(t / 36e5 - n) + n))
    }, function (t, n) {
        t.setTime(t.getTime() + 36e5 * Math.floor(n))
    }, function (t) {
        return t.getHours()
    }), d3.time.hours = d3.time.hour.range, d3.time.hours.utc = d3.time.hour.utc.range, d3.time.day = Eu(function (t) {
        var n = new vi(1970, 0);
        return n.setFullYear(t.getFullYear(), t.getMonth(), t.getDate()), n
    }, function (t, n) {
        t.setDate(t.getDate() + n)
    }, function (t) {
        return t.getDate() - 1
    }), d3.time.days = d3.time.day.range, d3.time.days.utc = d3.time.day.utc.range, d3.time.dayOfYear = function (t) {
        var n = d3.time.year(t);
        return Math.floor((t - n - 6e4 * (t.getTimezoneOffset() - n.getTimezoneOffset())) / 864e5)
    }, yi.forEach(function (t, n) {
        t = t.toLowerCase(), n = 7 - n;
        var e = d3.time[t] = Eu(function (t) {
            return (t = d3.time.day(t)).setDate(t.getDate() - (t.getDay() + n) % 7), t
        }, function (t, n) {
            t.setDate(t.getDate() + 7 * Math.floor(n))
        }, function (t) {
            var e = d3.time.year(t).getDay();
            return Math.floor((d3.time.dayOfYear(t) + (e + n) % 7) / 7) - (e !== n)
        });
        d3.time[t + "s"] = e.range, d3.time[t + "s"].utc = e.utc.range, d3.time[t + "OfYear"] = function (t) {
            var e = d3.time.year(t).getDay();
            return Math.floor((d3.time.dayOfYear(t) + (e + n) % 7) / 7)
        }
    }), d3.time.week = d3.time.sunday, d3.time.weeks = d3.time.sunday.range, d3.time.weeks.utc = d3.time.sunday.utc.range, d3.time.weekOfYear = d3.time.sundayOfYear, d3.time.month = Eu(function (t) {
        return t = d3.time.day(t), t.setDate(1), t
    }, function (t, n) {
        t.setMonth(t.getMonth() + n)
    }, function (t) {
        return t.getMonth()
    }), d3.time.months = d3.time.month.range, d3.time.months.utc = d3.time.month.utc.range, d3.time.year = Eu(function (t) {
        return t = d3.time.day(t), t.setMonth(0, 1), t
    }, function (t, n) {
        t.setFullYear(t.getFullYear() + n)
    }, function (t) {
        return t.getFullYear()
    }), d3.time.years = d3.time.year.range, d3.time.years.utc = d3.time.year.utc.range;
    var Yi = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6],
        Ui = [[d3.time.second, 1], [d3.time.second, 5], [d3.time.second, 15], [d3.time.second, 30], [d3.time.minute, 1], [d3.time.minute, 5], [d3.time.minute, 15], [d3.time.minute, 30], [d3.time.hour, 1], [d3.time.hour, 3], [d3.time.hour, 6], [d3.time.hour, 12], [d3.time.day, 1], [d3.time.day, 2], [d3.time.week, 1], [d3.time.month, 1], [d3.time.month, 3], [d3.time.year, 1]],
        Vi = [[d3.time.format("%Y"), function () {
            return !0
        }], [d3.time.format("%B"), function (t) {
            return t.getMonth()
        }], [d3.time.format("%b %d"), function (t) {
            return 1 != t.getDate()
        }], [d3.time.format("%a %d"), function (t) {
            return t.getDay() && 1 != t.getDate()
        }], [d3.time.format("%I %p"), function (t) {
            return t.getHours()
        }], [d3.time.format("%I:%M"), function (t) {
            return t.getMinutes()
        }], [d3.time.format(":%S"), function (t) {
            return t.getSeconds()
        }], [d3.time.format(".%L"), function (t) {
            return t.getMilliseconds()
        }]], Zi = d3.scale.linear(), Bi = Iu(Vi);
    Ui.year = function (t, n) {
        return Zi.domain(t.map(Ou)).ticks(n).map(Hu)
    }, d3.time.scale = function () {
        return Pu(d3.scale.linear(), Ui, Bi)
    };
    var Xi = Ui.map(function (t) {
        return [t[0].utc, t[1]]
    }), $i = [[d3.time.format.utc("%Y"), function () {
        return !0
    }], [d3.time.format.utc("%B"), function (t) {
        return t.getUTCMonth()
    }], [d3.time.format.utc("%b %d"), function (t) {
        return 1 != t.getUTCDate()
    }], [d3.time.format.utc("%a %d"), function (t) {
        return t.getUTCDay() && 1 != t.getUTCDate()
    }], [d3.time.format.utc("%I %p"), function (t) {
        return t.getUTCHours()
    }], [d3.time.format.utc("%I:%M"), function (t) {
        return t.getUTCMinutes()
    }], [d3.time.format.utc(":%S"), function (t) {
        return t.getUTCSeconds()
    }], [d3.time.format.utc(".%L"), function (t) {
        return t.getUTCMilliseconds()
    }]], Gi = Iu($i);
    Xi.year = function (t, n) {
        return Zi.domain(t.map(ju)).ticks(n).map(Ru)
    }, d3.time.scale.utc = function () {
        return Pu(d3.scale.linear(), Xi, Gi)
    }
}();


/*!
 * Pie Chart
 * Released under the MIT License
 **/
!function (t) {
    t.fn.drawPieChart = function (e, i) {
        function a(i) {
            var a = t(this).data().order;
            q.text(e[a].title + ": " + e[a].value).fadeIn(200), "active" !== S[a][0].getAttribute("data-active") && y[a].animate({opacity: .8}, 180), b.onPieMouseenter.apply(t(this), [i, e])
        }

        function n(i) {
            var a = t(this).data().order;
            q.hide(), "active" !== S[a][0].getAttribute("data-active") && y[a].animate({opacity: b.lightPiesOpacity}, 100), b.onPieMouseleave.apply(t(this), [i, e])
        }

        function s(t) {
            q.css({top: t.pageY + b.tipOffsetY, left: t.pageX - q.width() / 2 + b.tipOffsetX})
        }

        function o(i) {
            for (var a = t(this).data().order, n = S[a][0], s = 0, o = e.length; o > s; s++) s !== a && (S[s][0].setAttribute("data-active", ""), y[s].css({opacity: b.lightPiesOpacity}));
            "active" === n.getAttribute("data-active") ? (n.setAttribute("data-active", ""), y[a].css({opacity: .8})) : (n.setAttribute("data-active", "active"), y[a].css({opacity: 1})), b.onPieClick.apply(t(this), [i, e])
        }

        function r(t) {
            var i = -v / 2, a = 1;
            b.animation && (a = t), T[0].setAttribute("opacity", t);
            for (var n = 0, s = e.length; s > n; n++) {
                var o = a * (e[n].value / M) * 2 * v, r = i + o, u = (r - i) % (2 * v) > v ? 1 : 0, l = m + d(i) * x,
                    c = h + w(i) * x, f = m + d(r) * x, p = h + w(r) * x, g = m + d(i) * (x + b.lightPiesOffset),
                    A = h + w(i) * (x + b.lightPiesOffset), P = m + d(r) * (x + b.lightPiesOffset),
                    O = h + w(r) * (x + b.lightPiesOffset), S = ["M", l, c, "A", x, x, 0, u, 1, f, p, "L", m, h, "Z"],
                    C = ["M", g, A, "A", x + b.lightPiesOffset, x + b.lightPiesOffset, 0, u, 1, P, O, "L", m, h, "Z"];
                k[n][0].setAttribute("d", S.join(" ")), y[n][0].setAttribute("d", C.join(" ")), i += o
            }
        }

        function u() {
            b.animation ? P(l) : r(1)
        }

        function l() {
            G += j, r(C(G)), 1 > G ? P(arguments.callee) : b.afterDrawed.call(f)
        }

        function c(t) {
            return Math.min.apply(null, t)
        }

        var f = this, p = f.width(), g = f.height(), m = p / 2, h = g / 2, d = Math.cos, w = Math.sin, v = Math.PI,
            b = t.extend({
                segmentShowStroke: !0,
                segmentStrokeColor: "#fff",
                segmentStrokeWidth: 1,
                baseColor: "#fff",
                baseOffset: 15,
                edgeOffset: 30,
                pieSegmentGroupClass: "pieSegmentGroup",
                pieSegmentClass: "pieSegment",
                lightPiesOffset: 12,
                lightPiesOpacity: .3,
                lightPieClass: "lightPie",
                animation: !0,
                animationSteps: 90,
                animationEasing: "easeInOutExpo",
                tipOffsetX: -15,
                tipOffsetY: -45,
                tipClass: "pieTip",
                beforeDraw: function () {
                },
                afterDrawed: function () {
                },
                onPieMouseenter: function () {
                },
                onPieMouseleave: function () {
                },
                onPieClick: function () {
                }
            }, i), A = {
                linear: function (t) {
                    return t
                }, easeInOutExpo: function (t) {
                    var e = .5 > t ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
                    return e > 1 ? 1 : e
                }
            }, P = function () {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
                    window.setTimeout(t, 1e3 / 60)
                }
            }(),
            O = t('<svg width="' + p + '" height="' + g + '" viewBox="0 0 ' + p + " " + g + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>').appendTo(f),
            S = [], k = [], y = [], C = A[b.animationEasing], x = c([g / 2, p / 2]) - b.edgeOffset, M = 0,
            E = (function () {
                {
                    var e = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    t(e).appendTo(O)
                }
                e.setAttribute("cx", m), e.setAttribute("cy", h), e.setAttribute("r", x + b.baseOffset), e.setAttribute("fill", b.baseColor)
            }(), document.createElementNS("http://www.w3.org/2000/svg", "g")), T = t(E).appendTo(O);
        T[0].setAttribute("opacity", 0);
        for (var q = t('<div class="' + b.tipClass + '" />').appendTo("body").hide(), F = (q.width(), q.height(), 0), N = e.length; N > F; F++) {
            M += e[F].value;
            var D = document.createElementNS("http://www.w3.org/2000/svg", "g");
            D.setAttribute("data-order", F), D.setAttribute("class", b.pieSegmentGroupClass), S[F] = t(D).appendTo(T), S[F].on("mouseenter", a).on("mouseleave", n).on("mousemove", s).on("click", o);
            var I = document.createElementNS("http://www.w3.org/2000/svg", "path");
            I.setAttribute("stroke-width", b.segmentStrokeWidth), I.setAttribute("stroke", b.segmentStrokeColor), I.setAttribute("stroke-miterlimit", 2), I.setAttribute("fill", e[F].color), I.setAttribute("class", b.pieSegmentClass), k[F] = t(I).appendTo(S[F]);
            var R = document.createElementNS("http://www.w3.org/2000/svg", "path");
            R.setAttribute("stroke-width", b.segmentStrokeWidth), R.setAttribute("stroke", b.segmentStrokeColor), R.setAttribute("stroke-miterlimit", 2), R.setAttribute("fill", e[F].color), R.setAttribute("opacity", b.lightPiesOpacity), R.setAttribute("class", b.lightPieClass), y[F] = t(R).appendTo(S[F])
        }
        b.beforeDraw.call(f), u();
        var j = b.animation ? 1 / b.animationSteps : 1, G = b.animation ? 0 : 1;
        return f
    }
}(jQuery);


/*!
 * jquery.drawDoughnutChart.js
 * Version: 0.3(Beta)
 * Inspired by Chart.js(http://www.chartjs.org/)
 *
 * Copyright 2013 hiro
 * https://github.com/githiro/drawDoughnutChart
 * Released under the MIT license.
 * 
 */
!function (t) {
    t.fn.drawDoughnutChart = function (e, n) {
        function a(n) {
            var a = t(this).data().order;
            L.text(e[a].title + ": " + e[a].value).fadeIn(200), C.onPathEnter.apply(t(this), [n, e])
        }

        function o(n) {
            L.hide(), C.onPathLeave.apply(t(this), [n, e])
        }

        function i(t) {
            L.css({top: t.pageY + C.tipOffsetY, left: t.pageX - L.width() / 2 + C.tipOffsetX})
        }

        function r(t) {
            var n = -T / 2, a = 1;
            C.animation && C.animateRotate && (a = t), s(t, N), I.attr("opacity", t);
            for (var o = 0, i = e.length; i > o; o++) {
                var r = a * (e[o].value / N) * 2 * T, u = n + r, m = (u - n) % (2 * T) > T ? 1 : 0, p = w + v(n) * k,
                    l = g + y(n) * k, f = w + v(n) * E, d = g + y(n) * E, c = w + v(u) * k, h = g + y(u) * k,
                    x = w + v(u) * E, b = g + y(u) * E,
                    S = ["M", p, l, "A", k, k, 0, m, 1, c, h, "L", x, b, "A", E, E, 0, m, 0, f, d, "Z"];
                A[o].attr("d", S.join(" ")), n += r
            }
        }

        function s(t, e) {
            D.css({opacity: t}).text((e * t).toFixed(1))
        }

        function u(t, e) {
            var n = C.animation ? f(O(t), null, 0) : 1;
            e(n)
        }

        function m(t) {
            var e = C.animation ? 1 / f(C.animationSteps, Number.MAX_VALUE, 1) : 1, n = C.animation ? 0 : 1;
            b(function () {
                n += e, u(n, t), 1 >= n ? b(arguments.callee) : C.afterDrawed.call(d)
            })
        }

        function p(t) {
            return Math.min.apply(null, t)
        }

        function l(t) {
            return !isNaN(parseFloat(t)) && isFinite(t)
        }

        function f(t, e, n) {
            return l(e) && t > e ? e : l(n) && n > t ? n : t
        }

        var d = this, c = d.width(), h = d.height(), w = c / 2, g = h / 2, v = Math.cos, y = Math.sin, T = Math.PI,
            C = t.extend({
                segmentShowStroke: !0,
                segmentStrokeColor: "#0C1013",
                segmentStrokeWidth: 1,
                baseColor: "rgba(0,0,0,0.5)",
                baseOffset: 4,
                edgeOffset: 10,
                percentageInnerCutout: 75,
                animation: !0,
                animationSteps: 90,
                animationEasing: "easeInOutExpo",
                animateRotate: !0,
                tipOffsetX: -8,
                tipOffsetY: -45,
                tipClass: "doughnutTip",
                summaryClass: "doughnutSummary",
                summaryTitle: "TOTAL:",
                summaryTitleClass: "doughnutSummaryTitle",
                summaryNumberClass: "doughnutSummaryNumber",
                beforeDraw: function () {
                },
                afterDrawed: function () {
                },
                onPathEnter: function () {
                },
                onPathLeave: function () {
                }
            }, n), x = {
                linear: function (t) {
                    return t
                }, easeInOutExpo: function (t) {
                    var e = .5 > t ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
                    return e > 1 ? 1 : e
                }
            }, b = function () {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
                    window.setTimeout(t, 1e3 / 60)
                }
            }();
        C.beforeDraw.call(d);
        var S = t('<svg width="' + c + '" height="' + h + '" viewBox="0 0 ' + c + " " + h + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>').appendTo(d),
            A = [], O = x[C.animationEasing], k = p([h / 2, c / 2]) - C.edgeOffset,
            E = k * (C.percentageInnerCutout / 100), N = 0, F = k + C.baseOffset, M = E - C.baseOffset,
            I = (function () {
                var e = -1.57, n = 4.7131, a = w + v(e) * F, o = g + y(e) * F, i = w + v(e) * M, r = g + y(e) * M,
                    s = w + v(n) * F, u = g + y(n) * F, m = w + v(n) * M, p = g + y(n) * M,
                    l = ["M", a, o, "A", F, F, 0, 1, 1, s, u, "L", m, p, "A", M, M, 0, 1, 0, i, r, "Z"];
                t(document.createElementNS("http://www.w3.org/2000/svg", "path")).attr({
                    d: l.join(" "),
                    fill: C.baseColor
                }).appendTo(S)
            }(), t(document.createElementNS("http://www.w3.org/2000/svg", "g")));
        I.attr({opacity: 0}).appendTo(S);
        for (var L = t('<div class="' + C.tipClass + '" />').appendTo("body").hide(), R = (L.width(), L.height(), 2 * (E - (k - E))), q = t('<div class="' + C.summaryClass + '" />').appendTo(d).css({
            width: R + "px",
            height: R + "px",
            "margin-left": -(R / 2) + "px",
            "margin-top": -(R / 2) + "px"
        }), D = (t('<p class="' + C.summaryTitleClass + '">' + C.summaryTitle + "</p>").appendTo(q), t('<p class="' + C.summaryNumberClass + '"></p>').appendTo(q).css({opacity: 0})), P = 0, X = e.length; X > P; P++) N += e[P].value, A[P] = t(document.createElementNS("http://www.w3.org/2000/svg", "path")).attr({
            "stroke-width": C.segmentStrokeWidth,
            stroke: C.segmentStrokeColor,
            fill: e[P].color,
            "data-order": P
        }).appendTo(I).on("mouseenter", a).on("mouseleave", o).on("mousemove", i);
        return m(r), d
    }
}(jQuery);


/**
 * downCount: Simple Countdown clock with offset
 * Author: Sonny T. <hi@sonnyt.com>, sonnyt.com
 */

!function (e) {
    e.fn.downCount = function (t, n) {
        function r() {
            var e = new Date(o.date), t = i(), r = e - t;
            if (0 > r) return clearInterval(a), void(n && "function" == typeof n && n());
            var d = 1e3, s = 60 * d, u = 60 * s, l = 24 * u, h = Math.floor(r / l), c = Math.floor(r % l / u),
                g = Math.floor(r % u / s), v = Math.floor(r % s / d);
            h = String(h).length >= 2 ? h : "0" + h, c = String(c).length >= 2 ? c : "0" + c, g = String(g).length >= 2 ? g : "0" + g, v = String(v).length >= 2 ? v : "0" + v;
            var x = 1 === h ? "day" : "days", m = 1 === c ? "hour" : "hours", y = 1 === g ? "minute" : "minutes",
                D = 1 === v ? "second" : "seconds";
            f.find(".days").text(h), f.find(".hours").text(c), f.find(".minutes").text(g), f.find(".seconds").text(v), f.find(".days_ref").text(x), f.find(".hours_ref").text(m), f.find(".minutes_ref").text(y), f.find(".seconds_ref").text(D)
        }

        var o = e.extend({date: null, offset: null}, t);
        o.date || e.error("Date is not defined."), Date.parse(o.date) || e.error("Incorrect date format, it should look like this, 12/24/2012 12:00:00.");
        var f = this, i = function () {
            var e = new Date, t = e.getTime() + 6e4 * e.getTimezoneOffset(), n = new Date(t + 36e5 * o.offset);
            return n
        }, a = setInterval(r, 1e3)
    }
}(jQuery);


/*

	jQuery Tags Input Plugin 1.3.3
	
	Copyright (c) 2011 XOXCO, Inc
	
	Documentation for this plugin lives here:
	http://xoxco.com/clickable/jquery-tags-input
	
	Licensed under the MIT license:
	http://www.opensource.org/licenses/mit-license.php

	ben@xoxco.com

*/

!function (t) {
    var a = new Array, e = new Array;
    t.fn.doAutosize = function (a) {
        var e = t(this).data("minwidth"), i = t(this).data("maxwidth"), n = "", u = t(this),
            d = t("#" + t(this).data("tester_id"));
        if (n !== (n = u.val())) {
            var o = n.replace(/&/g, "&amp;").replace(/\s/g, " ").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            d.html(o);
            var r = d.width(), s = r + a.comfortZone >= e ? r + a.comfortZone : e, l = u.width(),
                p = l > s && s >= e || s > e && i > s;
            p && u.width(s)
        }
    }, t.fn.resetAutosize = function (a) {
        var e = t(this).data("minwidth") || a.minInputWidth || t(this).width(),
            i = t(this).data("maxwidth") || a.maxInputWidth || t(this).closest(".tagsinput").width() - a.inputPadding,
            n = t(this), u = t("<tester/>").css({
                position: "absolute",
                top: -9999,
                left: -9999,
                width: "auto",
                fontSize: n.css("fontSize"),
                fontFamily: n.css("fontFamily"),
                fontWeight: n.css("fontWeight"),
                letterSpacing: n.css("letterSpacing"),
                whiteSpace: "nowrap"
            }), d = t(this).attr("id") + "_autosize_tester";
        !t("#" + d).length > 0 && (u.attr("id", d), u.appendTo("body")), n.data("minwidth", e), n.data("maxwidth", i), n.data("tester_id", d), n.css("width", e)
    }, t.fn.addTag = function (i, n) {
        return n = jQuery.extend({focus: !1, callback: !0}, n), this.each(function () {
            var u = t(this).attr("id"), d = t(this).val().split(a[u]);
            if ("" == d[0] && (d = new Array), i = jQuery.trim(i), n.unique) {
                var o = t(this).tagExist(i);
                1 == o && t("#" + u + "_tag").addClass("not_valid")
            } else var o = !1;
            if ("" != i && 1 != o) {
                if (t("<span>").addClass("tag").append(t("<span>").text(i).append("&nbsp;&nbsp;"), t("<a>", {
                    href: "#",
                    title: "Removing tag",
                    text: "x"
                }).click(function () {
                    return t("#" + u).removeTag(escape(i))
                })).insertBefore("#" + u + "_addTag"), d.push(i), t("#" + u + "_tag").val(""), n.focus ? t("#" + u + "_tag").focus() : t("#" + u + "_tag").blur(), t.fn.tagsInput.updateTagsField(this, d), n.callback && e[u] && e[u].onAddTag) {
                    var r = e[u].onAddTag;
                    r.call(this, i)
                }
                if (e[u] && e[u].onChange) {
                    var s = d.length, r = e[u].onChange;
                    r.call(this, t(this), d[s - 1])
                }
            }
        }), !1
    }, t.fn.removeTag = function (n) {
        return n = unescape(n), this.each(function () {
            var u = t(this).attr("id"), d = t(this).val().split(a[u]);
            for (t("#" + u + "_tagsinput .tag").remove(), str = "", i = 0; i < d.length; i++) d[i] != n && (str = str + a[u] + d[i]);
            if (t.fn.tagsInput.importTags(this, str), e[u] && e[u].onRemoveTag) {
                var o = e[u].onRemoveTag;
                o.call(this, n)
            }
        }), !1
    }, t.fn.tagExist = function (e) {
        var i = t(this).attr("id"), n = t(this).val().split(a[i]);
        return jQuery.inArray(e, n) >= 0
    }, t.fn.importTags = function (a) {
        id = t(this).attr("id"), t("#" + id + "_tagsinput .tag").remove(), t.fn.tagsInput.importTags(this, a)
    }, t.fn.tagsInput = function (i) {
        var n = jQuery.extend({
            interactive: !0,
            defaultText: "add a tag",
            minChars: 0,
            width: "300px",
            height: "100px",
            autocomplete: {selectFirst: !1},
            hide: !0,
            delimiter: ",",
            unique: !0,
            removeWithBackspace: !0,
            placeholderColor: "#666666",
            autosize: !0,
            comfortZone: 20,
            inputPadding: 12
        }, i);
        return this.each(function () {
            n.hide && t(this).hide();
            var i = t(this).attr("id");
            (!i || a[t(this).attr("id")]) && (i = t(this).attr("id", "tags" + (new Date).getTime()).attr("id"));
            var u = jQuery.extend({
                pid: i,
                real_input: "#" + i,
                holder: "#" + i + "_tagsinput",
                input_wrapper: "#" + i + "_addTag",
                fake_input: "#" + i + "_tag"
            }, n);
            a[i] = u.delimiter, (n.onAddTag || n.onRemoveTag || n.onChange) && (e[i] = new Array, e[i].onAddTag = n.onAddTag, e[i].onRemoveTag = n.onRemoveTag, e[i].onChange = n.onChange);
            var d = '<div id="' + i + '_tagsinput" class="tagsinput"><div id="' + i + '_addTag">';
            if (n.interactive && (d = d + '<input id="' + i + '_tag" value="" data-default="' + n.defaultText + '" />'), d += '</div><div class="tags_clear"></div></div>', t(d).insertAfter(this), t(u.holder).css("width", n.width), t(u.holder).css("min-height", n.height), t(u.holder).css("height", n.height), "" != t(u.real_input).val() && t.fn.tagsInput.importTags(t(u.real_input), t(u.real_input).val()), n.interactive) {
                if (t(u.fake_input).val(t(u.fake_input).attr("data-default")), t(u.fake_input).css("color", n.placeholderColor), t(u.fake_input).resetAutosize(n), t(u.holder).bind("click", u, function (a) {
                    t(a.data.fake_input).focus()
                }), t(u.fake_input).bind("focus", u, function (a) {
                    t(a.data.fake_input).val() == t(a.data.fake_input).attr("data-default") && t(a.data.fake_input).val(""), t(a.data.fake_input).css("color", "#000000")
                }), void 0 != n.autocomplete_url) {
                    autocomplete_options = {source: n.autocomplete_url};
                    for (attrname in n.autocomplete) autocomplete_options[attrname] = n.autocomplete[attrname];
                    void 0 !== jQuery.Autocompleter ? (t(u.fake_input).autocomplete(n.autocomplete_url, n.autocomplete), t(u.fake_input).bind("result", u, function (a, e, u) {
                        e && t("#" + i).addTag(e[0] + "", {focus: !0, unique: n.unique})
                    })) : void 0 !== jQuery.ui.autocomplete && (t(u.fake_input).autocomplete(autocomplete_options), t(u.fake_input).bind("autocompleteselect", u, function (a, e) {
                        return t(a.data.real_input).addTag(e.item.value, {focus: !0, unique: n.unique}), !1
                    }))
                } else t(u.fake_input).bind("blur", u, function (a) {
                    var e = t(this).attr("data-default");
                    return "" != t(a.data.fake_input).val() && t(a.data.fake_input).val() != e ? a.data.minChars <= t(a.data.fake_input).val().length && (!a.data.maxChars || a.data.maxChars >= t(a.data.fake_input).val().length) && t(a.data.real_input).addTag(t(a.data.fake_input).val(), {
                        focus: !0,
                        unique: n.unique
                    }) : (t(a.data.fake_input).val(t(a.data.fake_input).attr("data-default")), t(a.data.fake_input).css("color", n.placeholderColor)), !1
                });
                t(u.fake_input).bind("keypress", u, function (a) {
                    return a.which == a.data.delimiter.charCodeAt(0) || 13 == a.which ? (a.preventDefault(), a.data.minChars <= t(a.data.fake_input).val().length && (!a.data.maxChars || a.data.maxChars >= t(a.data.fake_input).val().length) && t(a.data.real_input).addTag(t(a.data.fake_input).val(), {
                        focus: !0,
                        unique: n.unique
                    }), t(a.data.fake_input).resetAutosize(n), !1) : void(a.data.autosize && t(a.data.fake_input).doAutosize(n))
                }), u.removeWithBackspace && t(u.fake_input).bind("keydown", function (a) {
                    if (8 == a.keyCode && "" == t(this).val()) {
                        a.preventDefault();
                        var e = t(this).closest(".tagsinput").find(".tag:last").text(),
                            i = t(this).attr("id").replace(/_tag$/, "");
                        e = e.replace(/[\s]+x$/, ""), t("#" + i).removeTag(escape(e)), t(this).trigger("focus")
                    }
                }), t(u.fake_input).blur(), u.unique && t(u.fake_input).keydown(function (a) {
                    (8 == a.keyCode || String.fromCharCode(a.which).match(/\w+|[Ã¡Ã©Ã­Ã³ÃºÃÃ‰ÃÃ“ÃšÃ±Ã‘,\/]+/)) && t(this).removeClass("not_valid")
                })
            }
        }), this
    }, t.fn.tagsInput.updateTagsField = function (e, i) {
        var n = t(e).attr("id");
        t(e).val(i.join(a[n]))
    }, t.fn.tagsInput.importTags = function (n, u) {
        t(n).val("");
        var d = t(n).attr("id"), o = u.split(a[d]);
        for (i = 0; i < o.length; i++) t(n).addTag(o[i], {focus: !1, callback: !1});
        if (e[d] && e[d].onChange) {
            var r = e[d].onChange;
            r.call(n, n, o[i])
        }
    }
}(jQuery);


/*!
 * FullCalendar v1.6.4
 * Docs & License: http://arshaw.com/fullcalendar/
 * (c) 2013 Adam Shaw
 */
(function (t, e) {
    function n(e) {
        t.extend(!0, Ce, e)
    }

    function r(n, r, c) {
        function u(t) {
            ae ? p() && (S(), M(t)) : f()
        }

        function f() {
            oe = r.theme ? "ui" : "fc", n.addClass("fc"), r.isRTL ? n.addClass("fc-rtl") : n.addClass("fc-ltr"), r.theme && n.addClass("ui-widget"), ae = t("<div class='fc-content' style='position:relative'/>").prependTo(n), ne = new a(ee, r), re = ne.render(), re && n.prepend(re), y(r.defaultView), r.handleWindowResize && t(window).resize(x), m() || v()
        }

        function v() {
            setTimeout(function () {
                !ie.start && m() && C()
            }, 0)
        }

        function h() {
            ie && (te("viewDestroy", ie, ie, ie.element), ie.triggerEventDestroy()), t(window).unbind("resize", x), ne.destroy(), ae.remove(), n.removeClass("fc fc-rtl ui-widget")
        }

        function p() {
            return n.is(":visible")
        }

        function m() {
            return t("body").is(":visible")
        }

        function y(t) {
            ie && t == ie.name || D(t)
        }

        function D(e) {
            he++, ie && (te("viewDestroy", ie, ie, ie.element), Y(), ie.triggerEventDestroy(), G(), ie.element.remove(), ne.deactivateButton(ie.name)), ne.activateButton(e), ie = new Se[e](t("<div class='fc-view fc-view-" + e + "' style='position:relative'/>").appendTo(ae), ee), C(), $(), he--
        }

        function C(t) {
            (!ie.start || t || ie.start > ge || ge >= ie.end) && p() && M(t)
        }

        function M(t) {
            he++, ie.start && (te("viewDestroy", ie, ie, ie.element), Y(), N()), G(), ie.render(ge, t || 0), T(), $(), (ie.afterRender || A)(), _(), P(), te("viewRender", ie, ie, ie.element), ie.trigger("viewDisplay", de), he--, z()
        }

        function E() {
            p() && (Y(), N(), S(), T(), F())
        }

        function S() {
            le = r.contentHeight ? r.contentHeight : r.height ? r.height - (re ? re.height() : 0) - R(ae) : Math.round(ae.width() / Math.max(r.aspectRatio, .5))
        }

        function T() {
            le === e && S(), he++, ie.setHeight(le), ie.setWidth(ae.width()), he--, se = n.outerWidth()
        }

        function x() {
            if (!he) if (ie.start) {
                var t = ++ve;
                setTimeout(function () {
                    t == ve && !he && p() && se != (se = n.outerWidth()) && (he++, E(), ie.trigger("windowResize", de), he--)
                }, 200)
            } else v()
        }

        function k() {
            N(), W()
        }

        function H(t) {
            N(), F(t)
        }

        function F(t) {
            p() && (ie.setEventData(pe), ie.renderEvents(pe, t), ie.trigger("eventAfterAllRender"))
        }

        function N() {
            ie.triggerEventDestroy(), ie.clearEvents(), ie.clearEventData()
        }

        function z() {
            !r.lazyFetching || ue(ie.visStart, ie.visEnd) ? W() : F()
        }

        function W() {
            fe(ie.visStart, ie.visEnd)
        }

        function O(t) {
            pe = t, F()
        }

        function L(t) {
            H(t)
        }

        function _() {
            ne.updateTitle(ie.title)
        }

        function P() {
            var t = new Date;
            t >= ie.start && ie.end > t ? ne.disableButton("today") : ne.enableButton("today")
        }

        function q(t, n, r) {
            ie.select(t, n, r === e ? !0 : r)
        }

        function Y() {
            ie && ie.unselect()
        }

        function B() {
            C(-1)
        }

        function j() {
            C(1)
        }

        function I() {
            i(ge, -1), C()
        }

        function X() {
            i(ge, 1), C()
        }

        function J() {
            ge = new Date, C()
        }

        function V(t, e, n) {
            t instanceof Date ? ge = d(t) : g(ge, t, e, n), C()
        }

        function U(t, n, r) {
            t !== e && i(ge, t), n !== e && s(ge, n), r !== e && l(ge, r), C()
        }

        function Z() {
            return d(ge)
        }

        function G() {
            ae.css({width: "100%", height: ae.height(), overflow: "hidden"})
        }

        function $() {
            ae.css({width: "", height: "", overflow: ""})
        }

        function Q() {
            return ie
        }

        function K(t, n) {
            return n === e ? r[t] : (("height" == t || "contentHeight" == t || "aspectRatio" == t) && (r[t] = n, E()), e)
        }

        function te(t, n) {
            return r[t] ? r[t].apply(n || de, Array.prototype.slice.call(arguments, 2)) : e
        }

        var ee = this;
        ee.options = r, ee.render = u, ee.destroy = h, ee.refetchEvents = k, ee.reportEvents = O, ee.reportEventChange = L, ee.rerenderEvents = H, ee.changeView = y, ee.select = q, ee.unselect = Y, ee.prev = B, ee.next = j, ee.prevYear = I, ee.nextYear = X, ee.today = J, ee.gotoDate = V, ee.incrementDate = U, ee.formatDate = function (t, e) {
            return w(t, e, r)
        }, ee.formatDates = function (t, e, n) {
            return b(t, e, n, r)
        }, ee.getDate = Z, ee.getView = Q, ee.option = K, ee.trigger = te, o.call(ee, r, c);
        var ne, re, ae, oe, ie, se, le, ce, ue = ee.isFetchNeeded, fe = ee.fetchEvents, de = n[0], ve = 0, he = 0,
            ge = new Date, pe = [];
        g(ge, r.year, r.month, r.date), r.droppable && t(document).bind("dragstart", function (e, n) {
            var a = e.target, o = t(a);
            if (!o.parents(".fc").length) {
                var i = r.dropAccept;
                (t.isFunction(i) ? i.call(a, o) : o.is(i)) && (ce = a, ie.dragStart(ce, e, n))
            }
        }).bind("dragstop", function (t, e) {
            ce && (ie.dragStop(ce, t, e), ce = null)
        })
    }

    function a(n, r) {
        function a() {
            v = r.theme ? "ui" : "fc";
            var n = r.header;
            return n ? h = t("<table class='fc-header' style='width:100%'/>").append(t("<tr/>").append(i("left")).append(i("center")).append(i("right"))) : e
        }

        function o() {
            h.remove()
        }

        function i(e) {
            var a = t("<td class='fc-header-" + e + "'/>"), o = r.header[e];
            return o && t.each(o.split(" "), function (e) {
                e > 0 && a.append("<span class='fc-header-space'/>");
                var o;
                t.each(this.split(","), function (e, i) {
                    if ("title" == i) a.append("<span class='fc-header-title'><h2>&nbsp;</h2></span>"), o && o.addClass(v + "-corner-right"), o = null; else {
                        var s;
                        if (n[i] ? s = n[i] : Se[i] && (s = function () {
                            u.removeClass(v + "-state-hover"), n.changeView(i)
                        }), s) {
                            var l = r.theme ? P(r.buttonIcons, i) : null, c = P(r.buttonText, i),
                                u = t("<span class='fc-button fc-button-" + i + " " + v + "-state-default'>" + (l ? "<span class='fc-icon-wrap'><span class='ui-icon ui-icon-" + l + "'/>" + "</span>" : c) + "</span>").click(function () {
                                    u.hasClass(v + "-state-disabled") || s()
                                }).mousedown(function () {
                                    u.not("." + v + "-state-active").not("." + v + "-state-disabled").addClass(v + "-state-down")
                                }).mouseup(function () {
                                    u.removeClass(v + "-state-down")
                                }).hover(function () {
                                    u.not("." + v + "-state-active").not("." + v + "-state-disabled").addClass(v + "-state-hover")
                                }, function () {
                                    u.removeClass(v + "-state-hover").removeClass(v + "-state-down")
                                }).appendTo(a);
                            Y(u), o || u.addClass(v + "-corner-left"), o = u
                        }
                    }
                }), o && o.addClass(v + "-corner-right")
            }), a
        }

        function s(t) {
            h.find("h2").html(t)
        }

        function l(t) {
            h.find("span.fc-button-" + t).addClass(v + "-state-active")
        }

        function c(t) {
            h.find("span.fc-button-" + t).removeClass(v + "-state-active")
        }

        function u(t) {
            h.find("span.fc-button-" + t).addClass(v + "-state-disabled")
        }

        function f(t) {
            h.find("span.fc-button-" + t).removeClass(v + "-state-disabled")
        }

        var d = this;
        d.render = a, d.destroy = o, d.updateTitle = s, d.activateButton = l, d.deactivateButton = c, d.disableButton = u, d.enableButton = f;
        var v, h = t([])
    }

    function o(n, r) {
        function a(t, e) {
            return !E || E > t || e > S
        }

        function o(t, e) {
            E = t, S = e, W = [];
            var n = ++R, r = F.length;
            N = r;
            for (var a = 0; r > a; a++) i(F[a], n)
        }

        function i(e, r) {
            s(e, function (a) {
                if (r == R) {
                    if (a) {
                        n.eventDataTransform && (a = t.map(a, n.eventDataTransform)), e.eventDataTransform && (a = t.map(a, e.eventDataTransform));
                        for (var o = 0; a.length > o; o++) a[o].source = e, w(a[o]);
                        W = W.concat(a)
                    }
                    N--, N || k(W)
                }
            })
        }

        function s(r, a) {
            var o, i, l = Ee.sourceFetchers;
            for (o = 0; l.length > o; o++) {
                if (i = l[o](r, E, S, a), i === !0) return;
                if ("object" == typeof i) return s(i, a), e
            }
            var c = r.events;
            if (c) t.isFunction(c) ? (m(), c(d(E), d(S), function (t) {
                a(t), y()
            })) : t.isArray(c) ? a(c) : a(); else {
                var u = r.url;
                if (u) {
                    var f, v = r.success, h = r.error, g = r.complete;
                    f = t.isFunction(r.data) ? r.data() : r.data;
                    var p = t.extend({}, f || {}), w = X(r.startParam, n.startParam), b = X(r.endParam, n.endParam);
                    w && (p[w] = Math.round(+E / 1e3)), b && (p[b] = Math.round(+S / 1e3)), m(), t.ajax(t.extend({}, Te, r, {
                        data: p,
                        success: function (e) {
                            e = e || [];
                            var n = I(v, this, arguments);
                            t.isArray(n) && (e = n), a(e)
                        },
                        error: function () {
                            I(h, this, arguments), a()
                        },
                        complete: function () {
                            I(g, this, arguments), y()
                        }
                    }))
                } else a()
            }
        }

        function l(t) {
            t = c(t), t && (N++, i(t, R))
        }

        function c(n) {
            return t.isFunction(n) || t.isArray(n) ? n = {events: n} : "string" == typeof n && (n = {url: n}), "object" == typeof n ? (b(n), F.push(n), n) : e
        }

        function u(e) {
            F = t.grep(F, function (t) {
                return !D(t, e)
            }), W = t.grep(W, function (t) {
                return !D(t.source, e)
            }), k(W)
        }

        function f(t) {
            var e, n, r = W.length, a = x().defaultEventEnd, o = t.start - t._start,
                i = t.end ? t.end - (t._end || a(t)) : 0;
            for (e = 0; r > e; e++) n = W[e], n._id == t._id && n != t && (n.start = new Date(+n.start + o), n.end = t.end ? n.end ? new Date(+n.end + i) : new Date(+a(n) + i) : null, n.title = t.title, n.url = t.url, n.allDay = t.allDay, n.className = t.className, n.editable = t.editable, n.color = t.color, n.backgroundColor = t.backgroundColor, n.borderColor = t.borderColor, n.textColor = t.textColor, w(n));
            w(t), k(W)
        }

        function v(t, e) {
            w(t), t.source || (e && (H.events.push(t), t.source = H), W.push(t)), k(W)
        }

        function h(e) {
            if (e) {
                if (!t.isFunction(e)) {
                    var n = e + "";
                    e = function (t) {
                        return t._id == n
                    }
                }
                W = t.grep(W, e, !0);
                for (var r = 0; F.length > r; r++) t.isArray(F[r].events) && (F[r].events = t.grep(F[r].events, e, !0))
            } else {
                W = [];
                for (var r = 0; F.length > r; r++) t.isArray(F[r].events) && (F[r].events = [])
            }
            k(W)
        }

        function g(e) {
            return t.isFunction(e) ? t.grep(W, e) : e ? (e += "", t.grep(W, function (t) {
                return t._id == e
            })) : W
        }

        function m() {
            z++ || T("loading", null, !0, x())
        }

        function y() {
            --z || T("loading", null, !1, x())
        }

        function w(t) {
            var r = t.source || {}, a = X(r.ignoreTimezone, n.ignoreTimezone);
            t._id = t._id || (t.id === e ? "_fc" + xe++ : t.id + ""), t.date && (t.start || (t.start = t.date), delete t.date), t._start = d(t.start = p(t.start, a)), t.end = p(t.end, a), t.end && t.end <= t.start && (t.end = null), t._end = t.end ? d(t.end) : null, t.allDay === e && (t.allDay = X(r.allDayDefault, n.allDayDefault)), t.className ? "string" == typeof t.className && (t.className = t.className.split(/\s+/)) : t.className = []
        }

        function b(t) {
            t.className ? "string" == typeof t.className && (t.className = t.className.split(/\s+/)) : t.className = [];
            for (var e = Ee.sourceNormalizers, n = 0; e.length > n; n++) e[n](t)
        }

        function D(t, e) {
            return t && e && C(t) == C(e)
        }

        function C(t) {
            return ("object" == typeof t ? t.events || t.url : "") || t
        }

        var M = this;
        M.isFetchNeeded = a, M.fetchEvents = o, M.addEventSource = l, M.removeEventSource = u, M.updateEvent = f, M.renderEvent = v, M.removeEvents = h, M.clientEvents = g, M.normalizeEvent = w;
        for (var E, S, T = M.trigger, x = M.getView, k = M.reportEvents, H = {events: []}, F = [H], R = 0, N = 0, z = 0, W = [], A = 0; r.length > A; A++) c(r[A])
    }

    function i(t, e, n) {
        return t.setFullYear(t.getFullYear() + e), n || f(t), t
    }

    function s(t, e, n) {
        if (+t) {
            var r = t.getMonth() + e, a = d(t);
            for (a.setDate(1), a.setMonth(r), t.setMonth(r), n || f(t); t.getMonth() != a.getMonth();) t.setDate(t.getDate() + (a > t ? 1 : -1))
        }
        return t
    }

    function l(t, e, n) {
        if (+t) {
            var r = t.getDate() + e, a = d(t);
            a.setHours(9), a.setDate(r), t.setDate(r), n || f(t), c(t, a)
        }
        return t
    }

    function c(t, e) {
        if (+t) for (; t.getDate() != e.getDate();) t.setTime(+t + (e > t ? 1 : -1) * Fe)
    }

    function u(t, e) {
        return t.setMinutes(t.getMinutes() + e), t
    }

    function f(t) {
        return t.setHours(0), t.setMinutes(0), t.setSeconds(0), t.setMilliseconds(0), t
    }

    function d(t, e) {
        return e ? f(new Date(+t)) : new Date(+t)
    }

    function v() {
        var t, e = 0;
        do t = new Date(1970, e++, 1); while (t.getHours());
        return t
    }

    function h(t, e) {
        return Math.round((d(t, !0) - d(e, !0)) / He)
    }

    function g(t, n, r, a) {
        n !== e && n != t.getFullYear() && (t.setDate(1), t.setMonth(0), t.setFullYear(n)), r !== e && r != t.getMonth() && (t.setDate(1), t.setMonth(r)), a !== e && t.setDate(a)
    }

    function p(t, n) {
        return "object" == typeof t ? t : "number" == typeof t ? new Date(1e3 * t) : "string" == typeof t ? t.match(/^\d+(\.\d+)?$/) ? new Date(1e3 * parseFloat(t)) : (n === e && (n = !0), m(t, n) || (t ? new Date(t) : null)) : null
    }

    function m(t, e) {
        var n = t.match(/^([0-9]{4})(-([0-9]{2})(-([0-9]{2})([T ]([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2})(:?([0-9]{2}))?))?)?)?)?$/);
        if (!n) return null;
        var r = new Date(n[1], 0, 1);
        if (e || !n[13]) {
            var a = new Date(n[1], 0, 1, 9, 0);
            n[3] && (r.setMonth(n[3] - 1), a.setMonth(n[3] - 1)), n[5] && (r.setDate(n[5]), a.setDate(n[5])), c(r, a), n[7] && r.setHours(n[7]), n[8] && r.setMinutes(n[8]), n[10] && r.setSeconds(n[10]), n[12] && r.setMilliseconds(1e3 * Number("0." + n[12])), c(r, a)
        } else if (r.setUTCFullYear(n[1], n[3] ? n[3] - 1 : 0, n[5] || 1), r.setUTCHours(n[7] || 0, n[8] || 0, n[10] || 0, n[12] ? 1e3 * Number("0." + n[12]) : 0), n[14]) {
            var o = 60 * Number(n[16]) + (n[18] ? Number(n[18]) : 0);
            o *= "-" == n[15] ? 1 : -1, r = new Date(+r + 1e3 * 60 * o)
        }
        return r
    }

    function y(t) {
        if ("number" == typeof t) return 60 * t;
        if ("object" == typeof t) return 60 * t.getHours() + t.getMinutes();
        var e = t.match(/(\d+)(?::(\d+))?\s*(\w+)?/);
        if (e) {
            var n = parseInt(e[1], 10);
            return e[3] && (n %= 12, "p" == e[3].toLowerCase().charAt(0) && (n += 12)), 60 * n + (e[2] ? parseInt(e[2], 10) : 0)
        }
    }

    function w(t, e, n) {
        return b(t, null, e, n)
    }

    function b(t, e, n, r) {
        r = r || Ce;
        var a, o, i, s, l = t, c = e, u = n.length, f = "";
        for (a = 0; u > a; a++) if (o = n.charAt(a), "'" == o) {
            for (i = a + 1; u > i; i++) if ("'" == n.charAt(i)) {
                l && (f += i == a + 1 ? "'" : n.substring(a + 1, i), a = i);
                break
            }
        } else if ("(" == o) {
            for (i = a + 1; u > i; i++) if (")" == n.charAt(i)) {
                var d = w(l, n.substring(a + 1, i), r);
                parseInt(d.replace(/\D/, ""), 10) && (f += d), a = i;
                break
            }
        } else if ("[" == o) {
            for (i = a + 1; u > i; i++) if ("]" == n.charAt(i)) {
                var v = n.substring(a + 1, i), d = w(l, v, r);
                d != w(c, v, r) && (f += d), a = i;
                break
            }
        } else if ("{" == o) l = e, c = t; else if ("}" == o) l = t, c = e; else {
            for (i = u; i > a; i--) if (s = Ne[n.substring(a, i)]) {
                l && (f += s(l, r)), a = i - 1;
                break
            }
            i == a && l && (f += o)
        }
        return f
    }

    function D(t) {
        var e, n = new Date(t.getTime());
        return n.setDate(n.getDate() + 4 - (n.getDay() || 7)), e = n.getTime(), n.setMonth(0), n.setDate(1), Math.floor(Math.round((e - n) / 864e5) / 7) + 1
    }

    function C(t) {
        return t.end ? M(t.end, t.allDay) : l(d(t.start), 1)
    }

    function M(t, e) {
        return t = d(t), e || t.getHours() || t.getMinutes() ? l(t, 1) : f(t)
    }

    function E(n, r, a) {
        n.unbind("mouseover").mouseover(function (n) {
            for (var o, i, s, l = n.target; l != this;) o = l, l = l.parentNode;
            (i = o._fci) !== e && (o._fci = e, s = r[i], a(s.event, s.element, s), t(n.target).trigger(n)), n.stopPropagation()
        })
    }

    function S(e, n, r) {
        for (var a, o = 0; e.length > o; o++) a = t(e[o]), a.width(Math.max(0, n - x(a, r)))
    }

    function T(e, n, r) {
        for (var a, o = 0; e.length > o; o++) a = t(e[o]), a.height(Math.max(0, n - R(a, r)))
    }

    function x(t, e) {
        return k(t) + F(t) + (e ? H(t) : 0)
    }

    function k(e) {
        return (parseFloat(t.css(e[0], "paddingLeft", !0)) || 0) + (parseFloat(t.css(e[0], "paddingRight", !0)) || 0)
    }

    function H(e) {
        return (parseFloat(t.css(e[0], "marginLeft", !0)) || 0) + (parseFloat(t.css(e[0], "marginRight", !0)) || 0)
    }

    function F(e) {
        return (parseFloat(t.css(e[0], "borderLeftWidth", !0)) || 0) + (parseFloat(t.css(e[0], "borderRightWidth", !0)) || 0)
    }

    function R(t, e) {
        return N(t) + W(t) + (e ? z(t) : 0)
    }

    function N(e) {
        return (parseFloat(t.css(e[0], "paddingTop", !0)) || 0) + (parseFloat(t.css(e[0], "paddingBottom", !0)) || 0)
    }

    function z(e) {
        return (parseFloat(t.css(e[0], "marginTop", !0)) || 0) + (parseFloat(t.css(e[0], "marginBottom", !0)) || 0)
    }

    function W(e) {
        return (parseFloat(t.css(e[0], "borderTopWidth", !0)) || 0) + (parseFloat(t.css(e[0], "borderBottomWidth", !0)) || 0)
    }

    function A() {
    }

    function O(t, e) {
        return t - e
    }

    function L(t) {
        return Math.max.apply(Math, t)
    }

    function _(t) {
        return (10 > t ? "0" : "") + t
    }

    function P(t, n) {
        if (t[n] !== e) return t[n];
        for (var r, a = n.split(/(?=[A-Z])/), o = a.length - 1; o >= 0; o--) if (r = t[a[o].toLowerCase()], r !== e) return r;
        return t[""]
    }

    function q(t) {
        return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;").replace(/\n/g, "<br />")
    }

    function Y(t) {
        t.attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui", function () {
            return !1
        })
    }

    function B(t) {
        t.children().removeClass("fc-first fc-last").filter(":first-child").addClass("fc-first").end().filter(":last-child").addClass("fc-last")
    }

    function j(t, e) {
        var n = t.source || {}, r = t.color, a = n.color, o = e("eventColor"),
            i = t.backgroundColor || r || n.backgroundColor || a || e("eventBackgroundColor") || o,
            s = t.borderColor || r || n.borderColor || a || e("eventBorderColor") || o,
            l = t.textColor || n.textColor || e("eventTextColor"), c = [];
        return i && c.push("background-color:" + i), s && c.push("border-color:" + s), l && c.push("color:" + l), c.join(";")
    }

    function I(e, n, r) {
        if (t.isFunction(e) && (e = [e]), e) {
            var a, o;
            for (a = 0; e.length > a; a++) o = e[a].apply(n, r) || o;
            return o
        }
    }

    function X() {
        for (var t = 0; arguments.length > t; t++) if (arguments[t] !== e) return arguments[t]
    }

    function J(t, e) {
        function n(t, e) {
            e && (s(t, e), t.setDate(1));
            var n = a("firstDay"), f = d(t, !0);
            f.setDate(1);
            var v = s(d(f), 1), g = d(f);
            l(g, -((g.getDay() - n + 7) % 7)), i(g);
            var p = d(v);
            l(p, (7 - p.getDay() + n) % 7), i(p, -1, !0);
            var m = c(), y = Math.round(h(p, g) / 7);
            "fixed" == a("weekMode") && (l(p, 7 * (6 - y)), y = 6), r.title = u(f, a("titleFormat")), r.start = f, r.end = v, r.visStart = g, r.visEnd = p, o(y, m, !0)
        }

        var r = this;
        r.render = n, Z.call(r, t, e, "month");
        var a = r.opt, o = r.renderBasic, i = r.skipHiddenDays, c = r.getCellsPerWeek, u = e.formatDate
    }

    function V(t, e) {
        function n(t, e) {
            e && l(t, 7 * e);
            var n = l(d(t), -((t.getDay() - a("firstDay") + 7) % 7)), u = l(d(n), 7), f = d(n);
            i(f);
            var v = d(u);
            i(v, -1, !0);
            var h = s();
            r.start = n, r.end = u, r.visStart = f, r.visEnd = v, r.title = c(f, l(d(v), -1), a("titleFormat")), o(1, h, !1)
        }

        var r = this;
        r.render = n, Z.call(r, t, e, "basicWeek");
        var a = r.opt, o = r.renderBasic, i = r.skipHiddenDays, s = r.getCellsPerWeek, c = e.formatDates
    }

    function U(t, e) {
        function n(t, e) {
            e && l(t, e), i(t, 0 > e ? -1 : 1);
            var n = d(t, !0), c = l(d(n), 1);
            r.title = s(t, a("titleFormat")), r.start = r.visStart = n, r.end = r.visEnd = c, o(1, 1, !1)
        }

        var r = this;
        r.render = n, Z.call(r, t, e, "basicDay");
        var a = r.opt, o = r.renderBasic, i = r.skipHiddenDays, s = e.formatDate
    }

    function Z(e, n, r) {
        function a(t, e, n) {
            ee = t, ne = e, re = n, o(), j || i(), s()
        }

        function o() {
            le = he("theme") ? "ui" : "fc", ce = he("columnFormat"), ue = he("weekNumbers"), de = he("weekNumberTitle"), ve = "iso" != he("weekNumberCalculation") ? "w" : "W"
        }

        function i() {
            Z = t("<div class='fc-event-container' style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(e)
        }

        function s() {
            var n = c();
            L && L.remove(), L = t(n).appendTo(e), _ = L.find("thead"), P = _.find(".fc-day-header"), j = L.find("tbody"), I = j.find("tr"), X = j.find(".fc-day"), J = I.find("td:first-child"), V = I.eq(0).find(".fc-day > div"), U = I.eq(0).find(".fc-day-content > div"), B(_.add(_.find("tr"))), B(I), I.eq(0).addClass("fc-first"), I.filter(":last").addClass("fc-last"), X.each(function (e, n) {
                var r = Ee(Math.floor(e / ne), e % ne);
                ge("dayRender", O, r, t(n))
            }), y(X)
        }

        function c() {
            var t = "<table class='fc-border-separate' style='width:100%' cellspacing='0'>" + u() + v() + "</table>";
            return t
        }

        function u() {
            var t, e, n = le + "-widget-header", r = "";
            for (r += "<thead><tr>", ue && (r += "<th class='fc-week-number " + n + "'>" + q(de) + "</th>"), t = 0; ne > t; t++) e = Ee(0, t), r += "<th class='fc-day-header fc-" + ke[e.getDay()] + " " + n + "'>" + q(xe(e, ce)) + "</th>";
            return r += "</tr></thead>"
        }

        function v() {
            var t, e, n, r = le + "-widget-content", a = "";
            for (a += "<tbody>", t = 0; ee > t; t++) {
                for (a += "<tr class='fc-week'>", ue && (n = Ee(t, 0), a += "<td class='fc-week-number " + r + "'>" + "<div>" + q(xe(n, ve)) + "</div>" + "</td>"), e = 0; ne > e; e++) n = Ee(t, e), a += h(n);
                a += "</tr>"
            }
            return a += "</tbody>"
        }

        function h(t) {
            var e = le + "-widget-content", n = O.start.getMonth(), r = f(new Date), a = "",
                o = ["fc-day", "fc-" + ke[t.getDay()], e];
            return t.getMonth() != n && o.push("fc-other-month"), +t == +r ? o.push("fc-today", le + "-state-highlight") : r > t ? o.push("fc-past") : o.push("fc-future"), a += "<td class='" + o.join(" ") + "'" + " data-date='" + xe(t, "yyyy-MM-dd") + "'" + ">" + "<div>", re && (a += "<div class='fc-day-number'>" + t.getDate() + "</div>"), a += "<div class='fc-day-content'><div style='position:relative'>&nbsp;</div></div></div></td>"
        }

        function g(e) {
            Q = e;
            var n, r, a, o = Q - _.height();
            "variable" == he("weekMode") ? n = r = Math.floor(o / (1 == ee ? 2 : 6)) : (n = Math.floor(o / ee), r = o - n * (ee - 1)), J.each(function (e, o) {
                ee > e && (a = t(o), a.find("> div").css("min-height", (e == ee - 1 ? r : n) - R(a)))
            })
        }

        function p(t) {
            $ = t, ie.clear(), se.clear(), te = 0, ue && (te = _.find("th.fc-week-number").outerWidth()), K = Math.floor(($ - te) / ne), S(P.slice(0, -1), K)
        }

        function y(t) {
            t.click(w).mousedown(Me)
        }

        function w(e) {
            if (!he("selectable")) {
                var n = m(t(this).data("date"));
                ge("dayClick", this, n, !0, e)
            }
        }

        function b(t, e, n) {
            n && ae.build();
            for (var r = Te(t, e), a = 0; r.length > a; a++) {
                var o = r[a];
                y(D(o.row, o.leftCol, o.row, o.rightCol))
            }
        }

        function D(t, n, r, a) {
            var o = ae.rect(t, n, r, a, e);
            return be(o, e)
        }

        function C(t) {
            return d(t)
        }

        function M(t, e) {
            b(t, l(d(e), 1), !0)
        }

        function E() {
            Ce()
        }

        function T(t, e, n) {
            var r = Se(t), a = X[r.row * ne + r.col];
            ge("dayClick", a, t, e, n)
        }

        function x(t, e) {
            oe.start(function (t) {
                Ce(), t && D(t.row, t.col, t.row, t.col)
            }, e)
        }

        function k(t, e, n) {
            var r = oe.stop();
            if (Ce(), r) {
                var a = Ee(r);
                ge("drop", t, a, !0, e, n)
            }
        }

        function H(t) {
            return d(t.start)
        }

        function F(t) {
            return ie.left(t)
        }

        function N(t) {
            return ie.right(t)
        }

        function z(t) {
            return se.left(t)
        }

        function W(t) {
            return se.right(t)
        }

        function A(t) {
            return I.eq(t)
        }

        var O = this;
        O.renderBasic = a, O.setHeight = g, O.setWidth = p, O.renderDayOverlay = b, O.defaultSelectionEnd = C, O.renderSelection = M, O.clearSelection = E, O.reportDayClick = T, O.dragStart = x, O.dragStop = k, O.defaultEventEnd = H, O.getHoverListener = function () {
            return oe
        }, O.colLeft = F, O.colRight = N, O.colContentLeft = z, O.colContentRight = W, O.getIsCellAllDay = function () {
            return !0
        }, O.allDayRow = A, O.getRowCnt = function () {
            return ee
        }, O.getColCnt = function () {
            return ne
        }, O.getColWidth = function () {
            return K
        }, O.getDaySegmentContainer = function () {
            return Z
        }, fe.call(O, e, n, r), me.call(O), pe.call(O), G.call(O);
        var L, _, P, j, I, X, J, V, U, Z, $, Q, K, te, ee, ne, re, ae, oe, ie, se, le, ce, ue, de, ve, he = O.opt,
            ge = O.trigger, be = O.renderOverlay, Ce = O.clearOverlays, Me = O.daySelectionMousedown, Ee = O.cellToDate,
            Se = O.dateToCell, Te = O.rangeToSegments, xe = n.formatDate;
        Y(e.addClass("fc-grid")), ae = new ye(function (e, n) {
            var r, a, o;
            P.each(function (e, i) {
                r = t(i), a = r.offset().left, e && (o[1] = a), o = [a], n[e] = o
            }), o[1] = a + r.outerWidth(), I.each(function (n, i) {
                ee > n && (r = t(i), a = r.offset().top, n && (o[1] = a), o = [a], e[n] = o)
            }), o[1] = a + r.outerHeight()
        }), oe = new we(ae), ie = new De(function (t) {
            return V.eq(t)
        }), se = new De(function (t) {
            return U.eq(t)
        })
    }

    function G() {
        function t(t, e) {
            n.renderDayEvents(t, e)
        }

        function e() {
            n.getDaySegmentContainer().empty()
        }

        var n = this;
        n.renderEvents = t, n.clearEvents = e, de.call(n)
    }

    function $(t, e) {
        function n(t, e) {
            e && l(t, 7 * e);
            var n = l(d(t), -((t.getDay() - a("firstDay") + 7) % 7)), u = l(d(n), 7), f = d(n);
            i(f);
            var v = d(u);
            i(v, -1, !0);
            var h = s();
            r.title = c(f, l(d(v), -1), a("titleFormat")), r.start = n, r.end = u, r.visStart = f, r.visEnd = v, o(h)
        }

        var r = this;
        r.render = n, K.call(r, t, e, "agendaWeek");
        var a = r.opt, o = r.renderAgenda, i = r.skipHiddenDays, s = r.getCellsPerWeek, c = e.formatDates
    }

    function Q(t, e) {
        function n(t, e) {
            e && l(t, e), i(t, 0 > e ? -1 : 1);
            var n = d(t, !0), c = l(d(n), 1);
            r.title = s(t, a("titleFormat")), r.start = r.visStart = n, r.end = r.visEnd = c, o(1)
        }

        var r = this;
        r.render = n, K.call(r, t, e, "agendaDay");
        var a = r.opt, o = r.renderAgenda, i = r.skipHiddenDays, s = e.formatDate
    }

    function K(n, r, a) {
        function o(t) {
            We = t, i(), K ? c() : s()
        }

        function i() {
            qe = Ue("theme") ? "ui" : "fc", Ye = Ue("isRTL"), Be = y(Ue("minTime")), je = y(Ue("maxTime")), Ie = Ue("columnFormat"), Xe = Ue("weekNumbers"), Je = Ue("weekNumberTitle"), Ve = "iso" != Ue("weekNumberCalculation") ? "w" : "W", Re = Ue("snapMinutes") || Ue("slotMinutes")
        }

        function s() {
            var e, r, a, o, i, s = qe + "-widget-header", l = qe + "-widget-content", f = 0 == Ue("slotMinutes") % 15;
            for (c(), ce = t("<div style='position:absolute;z-index:2;left:0;width:100%'/>").appendTo(n), Ue("allDaySlot") ? (ue = t("<div class='fc-event-container' style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(ce), e = "<table style='width:100%' class='fc-agenda-allday' cellspacing='0'><tr><th class='" + s + " fc-agenda-axis'>" + Ue("allDayText") + "</th>" + "<td>" + "<div class='fc-day-content'><div style='position:relative'/></div>" + "</td>" + "<th class='" + s + " fc-agenda-gutter'>&nbsp;</th>" + "</tr>" + "</table>", de = t(e).appendTo(ce), ve = de.find("tr"), C(ve.find("td")), ce.append("<div class='fc-agenda-divider " + s + "'>" + "<div class='fc-agenda-divider-inner'/>" + "</div>")) : ue = t([]), he = t("<div style='position:absolute;width:100%;overflow-x:hidden;overflow-y:auto'/>").appendTo(ce), ge = t("<div style='position:relative;width:100%;overflow:hidden'/>").appendTo(he), be = t("<div class='fc-event-container' style='position:absolute;z-index:8;top:0;left:0'/>").appendTo(ge), e = "<table class='fc-agenda-slots' style='width:100%' cellspacing='0'><tbody>", r = v(), o = u(d(r), je), u(r, Be), Ae = 0, a = 0; o > r; a++) i = r.getMinutes(), e += "<tr class='fc-slot" + a + " " + (i ? "fc-minor" : "") + "'>" + "<th class='fc-agenda-axis " + s + "'>" + (f && i ? "&nbsp;" : on(r, Ue("axisFormat"))) + "</th>" + "<td class='" + l + "'>" + "<div style='position:relative'>&nbsp;</div>" + "</td>" + "</tr>", u(r, Ue("slotMinutes")), Ae++;
            e += "</tbody></table>", Ce = t(e).appendTo(ge), M(Ce.find("td"))
        }

        function c() {
            var e = h();
            K && K.remove(), K = t(e).appendTo(n), ee = K.find("thead"), ne = ee.find("th").slice(1, -1), re = K.find("tbody"), ae = re.find("td").slice(0, -1), oe = ae.find("> div"), ie = ae.find(".fc-day-content > div"), se = ae.eq(0), le = oe.eq(0), B(ee.add(ee.find("tr"))), B(re.add(re.find("tr")))
        }

        function h() {
            var t = "<table style='width:100%' class='fc-agenda-days fc-border-separate' cellspacing='0'>" + g() + p() + "</table>";
            return t
        }

        function g() {
            var t, e, n, r = qe + "-widget-header", a = "";
            for (a += "<thead><tr>", Xe ? (t = nn(0, 0), e = on(t, Ve), Ye ? e += Je : e = Je + e, a += "<th class='fc-agenda-axis fc-week-number " + r + "'>" + q(e) + "</th>") : a += "<th class='fc-agenda-axis " + r + "'>&nbsp;</th>", n = 0; We > n; n++) t = nn(0, n), a += "<th class='fc-" + ke[t.getDay()] + " fc-col" + n + " " + r + "'>" + q(on(t, Ie)) + "</th>";
            return a += "<th class='fc-agenda-gutter " + r + "'>&nbsp;</th>" + "</tr>" + "</thead>"
        }

        function p() {
            var t, e, n, r, a, o = qe + "-widget-header", i = qe + "-widget-content", s = f(new Date), l = "";
            for (l += "<tbody><tr><th class='fc-agenda-axis " + o + "'>&nbsp;</th>", n = "", e = 0; We > e; e++) t = nn(0, e), a = ["fc-col" + e, "fc-" + ke[t.getDay()], i], +t == +s ? a.push(qe + "-state-highlight", "fc-today") : s > t ? a.push("fc-past") : a.push("fc-future"), r = "<td class='" + a.join(" ") + "'>" + "<div>" + "<div class='fc-day-content'>" + "<div style='position:relative'>&nbsp;</div>" + "</div>" + "</div>" + "</td>", n += r;
            return l += n, l += "<td class='fc-agenda-gutter " + i + "'>&nbsp;</td>" + "</tr>" + "</tbody>"
        }

        function m(t) {
            t === e && (t = Se), Se = t, sn = {};
            var n = re.position().top, r = he.position().top, a = Math.min(t - n, Ce.height() + r + 1);
            le.height(a - R(se)), ce.css("top", n), he.height(a - r - 1), Fe = Ce.find("tr:first").height() + 1, Ne = Ue("slotMinutes") / Re, ze = Fe / Ne
        }

        function w(e) {
            Ee = e, _e.clear(), Pe.clear();
            var n = ee.find("th:first");
            de && (n = n.add(de.find("th:first"))), n = n.add(Ce.find("th:first")), Te = 0, S(n.width("").each(function (e, n) {
                Te = Math.max(Te, t(n).outerWidth())
            }), Te);
            var r = K.find(".fc-agenda-gutter");
            de && (r = r.add(de.find("th.fc-agenda-gutter")));
            var a = he[0].clientWidth;
            He = he.width() - a, He ? (S(r, He), r.show().prev().removeClass("fc-last")) : r.hide().prev().addClass("fc-last"), xe = Math.floor((a - Te) / We), S(ne.slice(0, -1), xe)
        }

        function b() {
            function t() {
                he.scrollTop(r)
            }

            var e = v(), n = d(e);
            n.setHours(Ue("firstHour"));
            var r = _(e, n) + 1;
            t(), setTimeout(t, 0)
        }

        function D() {
            b()
        }

        function C(t) {
            t.click(E).mousedown(tn)
        }

        function M(t) {
            t.click(E).mousedown(U)
        }

        function E(t) {
            if (!Ue("selectable")) {
                var e = Math.min(We - 1, Math.floor((t.pageX - K.offset().left - Te) / xe)), n = nn(0, e),
                    r = this.parentNode.className.match(/fc-slot(\d+)/);
                if (r) {
                    var a = parseInt(r[1]) * Ue("slotMinutes"), o = Math.floor(a / 60);
                    n.setHours(o), n.setMinutes(a % 60 + Be), Ze("dayClick", ae[e], n, !1, t)
                } else Ze("dayClick", ae[e], n, !0, t)
            }
        }

        function x(t, e, n) {
            n && Oe.build();
            for (var r = an(t, e), a = 0; r.length > a; a++) {
                var o = r[a];
                C(k(o.row, o.leftCol, o.row, o.rightCol))
            }
        }

        function k(t, e, n, r) {
            var a = Oe.rect(t, e, n, r, ce);
            return Ge(a, ce)
        }

        function H(t, e) {
            for (var n = 0; We > n; n++) {
                var r = nn(0, n), a = l(d(r), 1), o = new Date(Math.max(r, t)), i = new Date(Math.min(a, e));
                if (i > o) {
                    var s = Oe.rect(0, n, 0, n, ge), c = _(r, o), u = _(r, i);
                    s.top = c, s.height = u - c, M(Ge(s, ge))
                }
            }
        }

        function F(t) {
            return _e.left(t)
        }

        function N(t) {
            return Pe.left(t)
        }

        function z(t) {
            return _e.right(t)
        }

        function W(t) {
            return Pe.right(t)
        }

        function A(t) {
            return Ue("allDaySlot") && !t.row
        }

        function L(t) {
            var e = nn(0, t.col), n = t.row;
            return Ue("allDaySlot") && n--, n >= 0 && u(e, Be + n * Re), e
        }

        function _(t, n) {
            if (t = d(t, !0), u(d(t), Be) > n) return 0;
            if (n >= u(d(t), je)) return Ce.height();
            var r = Ue("slotMinutes"), a = 60 * n.getHours() + n.getMinutes() - Be, o = Math.floor(a / r), i = sn[o];
            return i === e && (i = sn[o] = Ce.find("tr").eq(o).find("td div")[0].offsetTop), Math.max(0, Math.round(i - 1 + Fe * (a % r / r)))
        }

        function P() {
            return ve
        }

        function j(t) {
            var e = d(t.start);
            return t.allDay ? e : u(e, Ue("defaultEventMinutes"))
        }

        function I(t, e) {
            return e ? d(t) : u(d(t), Ue("slotMinutes"))
        }

        function X(t, e, n) {
            n ? Ue("allDaySlot") && x(t, l(d(e), 1), !0) : J(t, e)
        }

        function J(e, n) {
            var r = Ue("selectHelper");
            if (Oe.build(), r) {
                var a = rn(e).col;
                if (a >= 0 && We > a) {
                    var o = Oe.rect(0, a, 0, a, ge), i = _(e, e), s = _(e, n);
                    if (s > i) {
                        if (o.top = i, o.height = s - i, o.left += 2, o.width -= 5, t.isFunction(r)) {
                            var l = r(e, n);
                            l && (o.position = "absolute", Me = t(l).css(o).appendTo(ge))
                        } else o.isStart = !0, o.isEnd = !0, Me = t(en({
                            title: "",
                            start: e,
                            end: n,
                            className: ["fc-select-helper"],
                            editable: !1
                        }, o)), Me.css("opacity", Ue("dragOpacity"));
                        Me && (M(Me), ge.append(Me), S(Me, o.width, !0), T(Me, o.height, !0))
                    }
                }
            } else H(e, n)
        }

        function V() {
            $e(), Me && (Me.remove(), Me = null)
        }

        function U(e) {
            if (1 == e.which && Ue("selectable")) {
                Ke(e);
                var n;
                Le.start(function (t, e) {
                    if (V(), t && t.col == e.col && !A(t)) {
                        var r = L(e), a = L(t);
                        n = [r, u(d(r), Re), a, u(d(a), Re)].sort(O), J(n[0], n[3])
                    } else n = null
                }, e), t(document).one("mouseup", function (t) {
                    Le.stop(), n && (+n[0] == +n[1] && Z(n[0], !1, t), Qe(n[0], n[3], !1, t))
                })
            }
        }

        function Z(t, e, n) {
            Ze("dayClick", ae[rn(t).col], t, e, n)
        }

        function G(t, e) {
            Le.start(function (t) {
                if ($e(), t) if (A(t)) k(t.row, t.col, t.row, t.col); else {
                    var e = L(t), n = u(d(e), Ue("defaultEventMinutes"));
                    H(e, n)
                }
            }, e)
        }

        function $(t, e, n) {
            var r = Le.stop();
            $e(), r && Ze("drop", t, L(r), A(r), e, n)
        }

        var Q = this;
        Q.renderAgenda = o, Q.setWidth = w, Q.setHeight = m, Q.afterRender = D, Q.defaultEventEnd = j, Q.timePosition = _, Q.getIsCellAllDay = A, Q.allDayRow = P, Q.getCoordinateGrid = function () {
            return Oe
        }, Q.getHoverListener = function () {
            return Le
        }, Q.colLeft = F, Q.colRight = z, Q.colContentLeft = N, Q.colContentRight = W, Q.getDaySegmentContainer = function () {
            return ue
        }, Q.getSlotSegmentContainer = function () {
            return be
        }, Q.getMinMinute = function () {
            return Be
        }, Q.getMaxMinute = function () {
            return je
        }, Q.getSlotContainer = function () {
            return ge
        }, Q.getRowCnt = function () {
            return 1
        }, Q.getColCnt = function () {
            return We
        }, Q.getColWidth = function () {
            return xe
        }, Q.getSnapHeight = function () {
            return ze
        }, Q.getSnapMinutes = function () {
            return Re
        }, Q.defaultSelectionEnd = I, Q.renderDayOverlay = x, Q.renderSelection = X, Q.clearSelection = V, Q.reportDayClick = Z, Q.dragStart = G, Q.dragStop = $, fe.call(Q, n, r, a), me.call(Q), pe.call(Q), te.call(Q);
        var K, ee, ne, re, ae, oe, ie, se, le, ce, ue, de, ve, he, ge, be, Ce, Me, Ee, Se, Te, xe, He, Fe, Re, Ne, ze,
            We, Ae, Oe, Le, _e, Pe, qe, Ye, Be, je, Ie, Xe, Je, Ve, Ue = Q.opt, Ze = Q.trigger, Ge = Q.renderOverlay,
            $e = Q.clearOverlays, Qe = Q.reportSelection, Ke = Q.unselect, tn = Q.daySelectionMousedown,
            en = Q.slotSegHtml, nn = Q.cellToDate, rn = Q.dateToCell, an = Q.rangeToSegments, on = r.formatDate,
            sn = {};
        Y(n.addClass("fc-agenda")), Oe = new ye(function (e, n) {
            function r(t) {
                return Math.max(l, Math.min(c, t))
            }

            var a, o, i;
            ne.each(function (e, r) {
                a = t(r), o = a.offset().left, e && (i[1] = o), i = [o], n[e] = i
            }), i[1] = o + a.outerWidth(), Ue("allDaySlot") && (a = ve, o = a.offset().top, e[0] = [o, o + a.outerHeight()]);
            for (var s = ge.offset().top, l = he.offset().top, c = l + he.outerHeight(), u = 0; Ae * Ne > u; u++) e.push([r(s + ze * u), r(s + ze * (u + 1))])
        }), Le = new we(Oe), _e = new De(function (t) {
            return oe.eq(t)
        }), Pe = new De(function (t) {
            return ie.eq(t)
        })
    }

    function te() {
        function n(t, e) {
            var n, r = t.length, o = [], i = [];
            for (n = 0; r > n; n++) t[n].allDay ? o.push(t[n]) : i.push(t[n]);
            y("allDaySlot") && (te(o, e), k()), s(a(i), e)
        }

        function r() {
            H().empty(), F().empty()
        }

        function a(e) {
            var n, r, a, s, l, c = Y(), f = W(), v = z(), h = t.map(e, i), g = [];
            for (r = 0; c > r; r++) for (n = P(0, r), u(n, f), l = o(e, h, n, u(d(n), v - f)), l = ee(l), a = 0; l.length > a; a++) s = l[a], s.col = r, g.push(s);
            return g
        }

        function o(t, e, n, r) {
            var a, o, i, s, l, c, u, f, v = [], h = t.length;
            for (a = 0; h > a; a++) o = t[a], i = o.start, s = e[a], s > n && r > i && (n > i ? (l = d(n), u = !1) : (l = i, u = !0), s > r ? (c = d(r), f = !1) : (c = s, f = !0), v.push({
                event: o,
                start: l,
                end: c,
                isStart: u,
                isEnd: f
            }));
            return v.sort(ue)
        }

        function i(t) {
            return t.end ? d(t.end) : u(d(t.start), y("defaultEventMinutes"))
        }

        function s(n, r) {
            var a, o, i, s, l, u, d, v, h, g, p, m, b, D, C, M, S = n.length, T = "", k = F(), H = y("isRTL");
            for (a = 0; S > a; a++) o = n[a], i = o.event, s = A(o.start, o.start), l = A(o.start, o.end), u = L(o.col), d = _(o.col), v = d - u, d -= .025 * v, v = d - u, h = v * (o.forwardCoord - o.backwardCoord), y("slotEventOverlap") && (h = Math.max(2 * (h - 10), h)), H ? (p = d - o.backwardCoord * v, g = p - h) : (g = u + o.backwardCoord * v, p = g + h), g = Math.max(g, u), p = Math.min(p, d), h = p - g, o.top = s, o.left = g, o.outerWidth = h, o.outerHeight = l - s, T += c(i, o);
            for (k[0].innerHTML = T, m = k.children(), a = 0; S > a; a++) o = n[a], i = o.event, b = t(m[a]), D = w("eventRender", i, i, b), D === !1 ? b.remove() : (D && D !== !0 && (b.remove(), b = t(D).css({
                position: "absolute",
                top: o.top,
                left: o.left
            }).appendTo(k)), o.element = b, i._id === r ? f(i, b, o) : b[0]._fci = a, V(i, b));
            for (E(k, n, f), a = 0; S > a; a++) o = n[a], (b = o.element) && (o.vsides = R(b, !0), o.hsides = x(b, !0), C = b.find(".fc-event-title"), C.length && (o.contentTop = C[0].offsetTop));
            for (a = 0; S > a; a++) o = n[a], (b = o.element) && (b[0].style.width = Math.max(0, o.outerWidth - o.hsides) + "px", M = Math.max(0, o.outerHeight - o.vsides), b[0].style.height = M + "px", i = o.event, o.contentTop !== e && 10 > M - o.contentTop && (b.find("div.fc-event-time").text(re(i.start, y("timeFormat")) + " - " + i.title), b.find("div.fc-event-title").remove()), w("eventAfterRender", i, i, b))
        }

        function c(t, e) {
            var n = "<", r = t.url, a = j(t, y), o = ["fc-event", "fc-event-vert"];
            return b(t) && o.push("fc-event-draggable"), e.isStart && o.push("fc-event-start"), e.isEnd && o.push("fc-event-end"), o = o.concat(t.className), t.source && (o = o.concat(t.source.className || [])), n += r ? "a href='" + q(t.url) + "'" : "div", n += " class='" + o.join(" ") + "'" + " style=" + "'" + "position:absolute;" + "top:" + e.top + "px;" + "left:" + e.left + "px;" + a + "'" + ">" + "<div class='fc-event-inner'>" + "<div class='fc-event-time'>" + q(ae(t.start, t.end, y("timeFormat"))) + "</div>" + "<div class='fc-event-title'>" + q(t.title || "") + "</div>" + "</div>" + "<div class='fc-event-bg'></div>", e.isEnd && D(t) && (n += "<div class='ui-resizable-handle ui-resizable-s'>=</div>"), n += "</" + (r ? "a" : "div") + ">"
        }

        function f(t, e, n) {
            var r = e.find("div.fc-event-time");
            b(t) && g(t, e, r), n.isEnd && D(t) && p(t, e, r), S(t, e)
        }

        function v(t, e, n) {
            function r() {
                c || (e.width(a).height("").draggable("option", "grid", null), c = !0)
            }

            var a, o, i, s = n.isStart, c = !0, u = N(), f = B(), v = I(), g = X(), p = W();
            e.draggable({
                opacity: y("dragOpacity", "month"), revertDuration: y("dragRevertDuration"), start: function (n, p) {
                    w("eventDragStart", e, t, n, p), Z(t, e), a = e.width(), u.start(function (n, a) {
                        if (K(), n) {
                            o = !1;
                            var u = P(0, a.col), p = P(0, n.col);
                            i = h(p, u), n.row ? s ? c && (e.width(f - 10), T(e, v * Math.round((t.end ? (t.end - t.start) / Re : y("defaultEventMinutes")) / g)), e.draggable("option", "grid", [f, 1]), c = !1) : o = !0 : (Q(l(d(t.start), i), l(C(t), i)), r()), o = o || c && !i
                        } else r(), o = !0;
                        e.draggable("option", "revert", o)
                    }, n, "drag")
                }, stop: function (n, a) {
                    if (u.stop(), K(), w("eventDragStop", e, t, n, a), o) r(), e.css("filter", ""), U(t, e); else {
                        var s = 0;
                        c || (s = Math.round((e.offset().top - J().offset().top) / v) * g + p - (60 * t.start.getHours() + t.start.getMinutes())), G(this, t, i, s, c, n, a)
                    }
                }
            })
        }

        function g(t, e, n) {
            function r() {
                K(), s && (f ? (n.hide(), e.draggable("option", "grid", null), Q(l(d(t.start), b), l(C(t), b))) : (a(D), n.css("display", ""), e.draggable("option", "grid", [T, x])))
            }

            function a(e) {
                var r, a = u(d(t.start), e);
                t.end && (r = u(d(t.end), e)), n.text(ae(a, r, y("timeFormat")))
            }

            var o, i, s, c, f, v, g, p, b, D, M, E = m.getCoordinateGrid(), S = Y(), T = B(), x = I(), k = X();
            e.draggable({
                scroll: !1,
                grid: [T, x],
                axis: 1 == S ? "y" : !1,
                opacity: y("dragOpacity"),
                revertDuration: y("dragRevertDuration"),
                start: function (n, r) {
                    w("eventDragStart", e, t, n, r), Z(t, e), E.build(), o = e.position(), i = E.cell(n.pageX, n.pageY), s = c = !0, f = v = O(i), g = p = 0, b = 0, D = M = 0
                },
                drag: function (t, n) {
                    var a = E.cell(t.pageX, t.pageY);
                    if (s = !!a) {
                        if (f = O(a), g = Math.round((n.position.left - o.left) / T), g != p) {
                            var l = P(0, i.col), u = i.col + g;
                            u = Math.max(0, u), u = Math.min(S - 1, u);
                            var d = P(0, u);
                            b = h(d, l)
                        }
                        f || (D = Math.round((n.position.top - o.top) / x) * k)
                    }
                    (s != c || f != v || g != p || D != M) && (r(), c = s, v = f, p = g, M = D), e.draggable("option", "revert", !s)
                },
                stop: function (n, a) {
                    K(), w("eventDragStop", e, t, n, a), s && (f || b || D) ? G(this, t, b, f ? 0 : D, f, n, a) : (s = !0, f = !1, g = 0, b = 0, D = 0, r(), e.css("filter", ""), e.css(o), U(t, e))
                }
            })
        }

        function p(t, e, n) {
            var r, a, o = I(), i = X();
            e.resizable({
                handles: {s: ".ui-resizable-handle"}, grid: o, start: function (n, o) {
                    r = a = 0, Z(t, e), w("eventResizeStart", this, t, n, o)
                }, resize: function (s, l) {
                    r = Math.round((Math.max(o, e.height()) - l.originalSize.height) / o), r != a && (n.text(ae(t.start, r || t.end ? u(M(t), i * r) : null, y("timeFormat"))), a = r)
                }, stop: function (n, a) {
                    w("eventResizeStop", this, t, n, a), r ? $(this, t, 0, i * r, n, a) : U(t, e)
                }
            })
        }

        var m = this;
        m.renderEvents = n, m.clearEvents = r, m.slotSegHtml = c, de.call(m);
        var y = m.opt, w = m.trigger, b = m.isEventDraggable, D = m.isEventResizable, M = m.eventEnd,
            S = m.eventElementHandlers, k = m.setHeight, H = m.getDaySegmentContainer, F = m.getSlotSegmentContainer,
            N = m.getHoverListener, z = m.getMaxMinute, W = m.getMinMinute, A = m.timePosition, O = m.getIsCellAllDay,
            L = m.colContentLeft, _ = m.colContentRight, P = m.cellToDate, Y = m.getColCnt, B = m.getColWidth,
            I = m.getSnapHeight, X = m.getSnapMinutes, J = m.getSlotContainer, V = m.reportEventElement,
            U = m.showEvents, Z = m.hideEvents, G = m.eventDrop, $ = m.eventResize, Q = m.renderDayOverlay,
            K = m.clearOverlays, te = m.renderDayEvents, ne = m.calendar, re = ne.formatDate, ae = ne.formatDates;
        m.draggableDayEvent = v
    }

    function ee(t) {
        var e, n = ne(t), r = n[0];
        if (re(n), r) {
            for (e = 0; r.length > e; e++) ae(r[e]);
            for (e = 0; r.length > e; e++) oe(r[e], 0, 0)
        }
        return ie(n)
    }

    function ne(t) {
        var e, n, r, a = [];
        for (e = 0; t.length > e; e++) {
            for (n = t[e], r = 0; a.length > r && se(n, a[r]).length; r++) ;
            (a[r] || (a[r] = [])).push(n)
        }
        return a
    }

    function re(t) {
        var e, n, r, a, o;
        for (e = 0; t.length > e; e++) for (n = t[e], r = 0; n.length > r; r++) for (a = n[r], a.forwardSegs = [], o = e + 1; t.length > o; o++) se(a, t[o], a.forwardSegs)
    }

    function ae(t) {
        var n, r, a = t.forwardSegs, o = 0;
        if (t.forwardPressure === e) {
            for (n = 0; a.length > n; n++) r = a[n], ae(r), o = Math.max(o, 1 + r.forwardPressure);
            t.forwardPressure = o
        }
    }

    function oe(t, n, r) {
        var a, o = t.forwardSegs;
        if (t.forwardCoord === e) for (o.length ? (o.sort(ce), oe(o[0], n + 1, r), t.forwardCoord = o[0].backwardCoord) : t.forwardCoord = 1, t.backwardCoord = t.forwardCoord - (t.forwardCoord - r) / (n + 1), a = 0; o.length > a; a++) oe(o[a], 0, t.forwardCoord)
    }

    function ie(t) {
        var e, n, r, a = [];
        for (e = 0; t.length > e; e++) for (n = t[e], r = 0; n.length > r; r++) a.push(n[r]);
        return a
    }

    function se(t, e, n) {
        n = n || [];
        for (var r = 0; e.length > r; r++) le(t, e[r]) && n.push(e[r]);
        return n
    }

    function le(t, e) {
        return t.end > e.start && t.start < e.end
    }

    function ce(t, e) {
        return e.forwardPressure - t.forwardPressure || (t.backwardCoord || 0) - (e.backwardCoord || 0) || ue(t, e)
    }

    function ue(t, e) {
        return t.start - e.start || e.end - e.start - (t.end - t.start) || (t.event.title || "").localeCompare(e.event.title)
    }

    function fe(n, r, a) {
        function o(e, n) {
            var r = V[e];
            return t.isPlainObject(r) ? P(r, n || a) : r
        }

        function i(t, e) {
            return r.trigger.apply(r, [t, e || _].concat(Array.prototype.slice.call(arguments, 2), [_]))
        }

        function s(t) {
            var e = t.source || {};
            return X(t.startEditable, e.startEditable, o("eventStartEditable"), t.editable, e.editable, o("editable")) && !o("disableDragging")
        }

        function c(t) {
            var e = t.source || {};
            return X(t.durationEditable, e.durationEditable, o("eventDurationEditable"), t.editable, e.editable, o("editable")) && !o("disableResizing")
        }

        function f(t) {
            j = {};
            var e, n, r = t.length;
            for (e = 0; r > e; e++) n = t[e], j[n._id] ? j[n._id].push(n) : j[n._id] = [n]
        }

        function v() {
            j = {}, I = {}, J = []
        }

        function g(t) {
            return t.end ? d(t.end) : q(t)
        }

        function p(t, e) {
            J.push({event: t, element: e}), I[t._id] ? I[t._id].push(e) : I[t._id] = [e]
        }

        function m() {
            t.each(J, function (t, e) {
                _.trigger("eventDestroy", e.event, e.event, e.element)
            })
        }

        function y(t, n) {
            n.click(function (r) {
                return n.hasClass("ui-draggable-dragging") || n.hasClass("ui-resizable-resizing") ? e : i("eventClick", this, t, r)
            }).hover(function (e) {
                i("eventMouseover", this, t, e)
            }, function (e) {
                i("eventMouseout", this, t, e)
            })
        }

        function w(t, e) {
            D(t, e, "show")
        }

        function b(t, e) {
            D(t, e, "hide")
        }

        function D(t, e, n) {
            var r, a = I[t._id], o = a.length;
            for (r = 0; o > r; r++) e && a[r][0] == e[0] || a[r][n]()
        }

        function C(t, e, n, r, a, o, s) {
            var l = e.allDay, c = e._id;
            E(j[c], n, r, a), i("eventDrop", t, e, n, r, a, function () {
                E(j[c], -n, -r, l), B(c)
            }, o, s), B(c)
        }

        function M(t, e, n, r, a, o) {
            var s = e._id;
            S(j[s], n, r), i("eventResize", t, e, n, r, function () {
                S(j[s], -n, -r), B(s)
            }, a, o), B(s)
        }

        function E(t, n, r, a) {
            r = r || 0;
            for (var o, i = t.length, s = 0; i > s; s++) o = t[s], a !== e && (o.allDay = a), u(l(o.start, n, !0), r), o.end && (o.end = u(l(o.end, n, !0), r)), Y(o, V)
        }

        function S(t, e, n) {
            n = n || 0;
            for (var r, a = t.length, o = 0; a > o; o++) r = t[o], r.end = u(l(g(r), e, !0), n), Y(r, V)
        }

        function T(t) {
            return "object" == typeof t && (t = t.getDay()), G[t]
        }

        function x() {
            return U
        }

        function k(t, e, n) {
            for (e = e || 1; G[(t.getDay() + (n ? e : 0) + 7) % 7];) l(t, e)
        }

        function H() {
            var t = F.apply(null, arguments), e = R(t), n = N(e);
            return n
        }

        function F(t, e) {
            var n = _.getColCnt(), r = K ? -1 : 1, a = K ? n - 1 : 0;
            "object" == typeof t && (e = t.col, t = t.row);
            var o = t * n + (e * r + a);
            return o
        }

        function R(t) {
            var e = _.visStart.getDay();
            return t += $[e], 7 * Math.floor(t / U) + Q[(t % U + U) % U] - e
        }

        function N(t) {
            var e = d(_.visStart);
            return l(e, t), e
        }

        function z(t) {
            var e = W(t), n = A(e), r = O(n);
            return r
        }

        function W(t) {
            return h(t, _.visStart)
        }

        function A(t) {
            var e = _.visStart.getDay();
            return t += e, Math.floor(t / 7) * U + $[(t % 7 + 7) % 7] - $[e]
        }

        function O(t) {
            var e = _.getColCnt(), n = K ? -1 : 1, r = K ? e - 1 : 0, a = Math.floor(t / e),
                o = (t % e + e) % e * n + r;
            return {row: a, col: o}
        }

        function L(t, e) {
            for (var n = _.getRowCnt(), r = _.getColCnt(), a = [], o = W(t), i = W(e), s = A(o), l = A(i) - 1, c = 0; n > c; c++) {
                var u = c * r, f = u + r - 1, d = Math.max(s, u), v = Math.min(l, f);
                if (v >= d) {
                    var h = O(d), g = O(v), p = [h.col, g.col].sort(), m = R(d) == o, y = R(v) + 1 == i;
                    a.push({row: c, leftCol: p[0], rightCol: p[1], isStart: m, isEnd: y})
                }
            }
            return a
        }

        var _ = this;
        _.element = n, _.calendar = r, _.name = a, _.opt = o, _.trigger = i, _.isEventDraggable = s, _.isEventResizable = c, _.setEventData = f, _.clearEventData = v, _.eventEnd = g, _.reportEventElement = p, _.triggerEventDestroy = m, _.eventElementHandlers = y, _.showEvents = w, _.hideEvents = b, _.eventDrop = C, _.eventResize = M;
        var q = _.defaultEventEnd, Y = r.normalizeEvent, B = r.reportEventChange, j = {}, I = {}, J = [], V = r.options;
        _.isHiddenDay = T, _.skipHiddenDays = k, _.getCellsPerWeek = x, _.dateToCell = z, _.dateToDayOffset = W, _.dayOffsetToCellOffset = A, _.cellOffsetToCell = O, _.cellToDate = H, _.cellToCellOffset = F, _.cellOffsetToDayOffset = R, _.dayOffsetToDate = N, _.rangeToSegments = L;
        var U, Z = o("hiddenDays") || [], G = [], $ = [], Q = [], K = o("isRTL");
        (function () {
            o("weekends") === !1 && Z.push(0, 6);
            for (var e = 0, n = 0; 7 > e; e++) $[e] = n, G[e] = -1 != t.inArray(e, Z), G[e] || (Q[n] = e, n++);
            if (U = n, !U) throw"invalid hiddenDays"
        })()
    }

    function de() {
        function e(t, e) {
            var n = r(t, !1, !0);
            he(n, function (t, e) {
                N(t.event, e)
            }), w(n, e), he(n, function (t, e) {
                k("eventAfterRender", t.event, t.event, e)
            })
        }

        function n(t, e, n) {
            var a = r([t], !0, !1), o = [];
            return he(a, function (t, r) {
                t.row === e && r.css("top", n), o.push(r[0])
            }), o
        }

        function r(e, n, r) {
            var o, l, c = Z(), d = n ? t("<div/>") : c, v = a(e);
            return i(v), o = s(v), d[0].innerHTML = o, l = d.children(), n && c.append(l), u(v, l), he(v, function (t, e) {
                t.hsides = x(e, !0)
            }), he(v, function (t, e) {
                e.width(Math.max(0, t.outerWidth - t.hsides))
            }), he(v, function (t, e) {
                t.outerHeight = e.outerHeight(!0)
            }), f(v, r), v
        }

        function a(t) {
            for (var e = [], n = 0; t.length > n; n++) {
                var r = o(t[n]);
                e.push.apply(e, r)
            }
            return e
        }

        function o(t) {
            for (var e = t.start, n = C(t), r = ee(e, n), a = 0; r.length > a; a++) r[a].event = t;
            return r
        }

        function i(t) {
            for (var e = T("isRTL"), n = 0; t.length > n; n++) {
                var r = t[n], a = (e ? r.isEnd : r.isStart) ? V : X, o = (e ? r.isStart : r.isEnd) ? U : J,
                    i = a(r.leftCol), s = o(r.rightCol);
                r.left = i, r.outerWidth = s - i
            }
        }

        function s(t) {
            for (var e = "", n = 0; t.length > n; n++) e += c(t[n]);
            return e
        }

        function c(t) {
            var e = "", n = T("isRTL"), r = t.event, a = r.url, o = ["fc-event", "fc-event-hori"];
            H(r) && o.push("fc-event-draggable"), t.isStart && o.push("fc-event-start"), t.isEnd && o.push("fc-event-end"), o = o.concat(r.className), r.source && (o = o.concat(r.source.className || []));
            var i = j(r, T);
            return e += a ? "<a href='" + q(a) + "'" : "<div", e += " class='" + o.join(" ") + "'" + " style=" + "'" + "position:absolute;" + "left:" + t.left + "px;" + i + "'" + ">" + "<div class='fc-event-inner'>", !r.allDay && t.isStart && (e += "<span class='fc-event-time'>" + q(G(r.start, r.end, T("timeFormat"))) + "</span>"), e += "<span class='fc-event-title'>" + q(r.title || "") + "</span>" + "</div>", t.isEnd && F(r) && (e += "<div class='ui-resizable-handle ui-resizable-" + (n ? "w" : "e") + "'>" + "&nbsp;&nbsp;&nbsp;" + "</div>"), e += "</" + (a ? "a" : "div") + ">"
        }

        function u(e, n) {
            for (var r = 0; e.length > r; r++) {
                var a = e[r], o = a.event, i = n.eq(r), s = k("eventRender", o, o, i);
                s === !1 ? i.remove() : (s && s !== !0 && (s = t(s).css({
                    position: "absolute",
                    left: a.left
                }), i.replaceWith(s), i = s), a.element = i)
            }
        }

        function f(t, e) {
            var n = v(t), r = y(), a = [];
            if (e) for (var o = 0; r.length > o; o++) r[o].height(n[o]);
            for (var o = 0; r.length > o; o++) a.push(r[o].position().top);
            he(t, function (t, e) {
                e.css("top", a[t.row] + t.top)
            })
        }

        function v(t) {
            for (var e = P(), n = B(), r = [], a = g(t), o = 0; e > o; o++) {
                for (var i = a[o], s = [], l = 0; n > l; l++) s.push(0);
                for (var c = 0; i.length > c; c++) {
                    var u = i[c];
                    u.top = L(s.slice(u.leftCol, u.rightCol + 1));
                    for (var l = u.leftCol; u.rightCol >= l; l++) s[l] = u.top + u.outerHeight
                }
                r.push(L(s))
            }
            return r
        }

        function g(t) {
            var e, n, r, a = P(), o = [];
            for (e = 0; t.length > e; e++) n = t[e], r = n.row, n.element && (o[r] ? o[r].push(n) : o[r] = [n]);
            for (r = 0; a > r; r++) o[r] = p(o[r] || []);
            return o
        }

        function p(t) {
            for (var e = [], n = m(t), r = 0; n.length > r; r++) e.push.apply(e, n[r]);
            return e
        }

        function m(t) {
            t.sort(ge);
            for (var e = [], n = 0; t.length > n; n++) {
                for (var r = t[n], a = 0; e.length > a && ve(r, e[a]); a++) ;
                e[a] ? e[a].push(r) : e[a] = [r]
            }
            return e
        }

        function y() {
            var t, e = P(), n = [];
            for (t = 0; e > t; t++) n[t] = I(t).find("div.fc-day-content > div");
            return n
        }

        function w(t, e) {
            var n = Z();
            he(t, function (t, n, r) {
                var a = t.event;
                a._id === e ? b(a, n, t) : n[0]._fci = r
            }), E(n, t, b)
        }

        function b(t, e, n) {
            H(t) && S.draggableDayEvent(t, e, n), n.isEnd && F(t) && S.resizableDayEvent(t, e, n), z(t, e)
        }

        function D(t, e) {
            var n, r = te();
            e.draggable({
                delay: 50,
                opacity: T("dragOpacity"),
                revertDuration: T("dragRevertDuration"),
                start: function (a, o) {
                    k("eventDragStart", e, t, a, o), A(t, e), r.start(function (r, a, o, i) {
                        if (e.draggable("option", "revert", !r || !o && !i), Q(), r) {
                            var s = ne(a), c = ne(r);
                            n = h(c, s), $(l(d(t.start), n), l(C(t), n))
                        } else n = 0
                    }, a, "drag")
                },
                stop: function (a, o) {
                    r.stop(), Q(), k("eventDragStop", e, t, a, o), n ? O(this, t, n, 0, t.allDay, a, o) : (e.css("filter", ""), W(t, e))
                }
            })
        }

        function M(e, r, a) {
            var o = T("isRTL"), i = o ? "w" : "e", s = r.find(".ui-resizable-" + i), c = !1;
            Y(r), r.mousedown(function (t) {
                t.preventDefault()
            }).click(function (t) {
                c && (t.preventDefault(), t.stopImmediatePropagation())
            }), s.mousedown(function (o) {
                function s(n) {
                    k("eventResizeStop", this, e, n), t("body").css("cursor", ""), u.stop(), Q(), f && _(this, e, f, 0, n), setTimeout(function () {
                        c = !1
                    }, 0)
                }

                if (1 == o.which) {
                    c = !0;
                    var u = te();
                    P(), B();
                    var f, d, v = r.css("top"), h = t.extend({}, e), g = ie(oe(e.start));
                    K(), t("body").css("cursor", i + "-resize").one("mouseup", s), k("eventResizeStart", this, e, o), u.start(function (r, o) {
                        if (r) {
                            var s = re(o), c = re(r);
                            if (c = Math.max(c, g), f = ae(c) - ae(s)) {
                                h.end = l(R(e), f, !0);
                                var u = d;
                                d = n(h, a.row, v), d = t(d), d.find("*").css("cursor", i + "-resize"), u && u.remove(), A(e)
                            } else d && (W(e), d.remove(), d = null);
                            Q(), $(e.start, l(C(e), f))
                        }
                    }, o)
                }
            })
        }

        var S = this;
        S.renderDayEvents = e, S.draggableDayEvent = D, S.resizableDayEvent = M;
        var T = S.opt, k = S.trigger, H = S.isEventDraggable, F = S.isEventResizable, R = S.eventEnd,
            N = S.reportEventElement, z = S.eventElementHandlers, W = S.showEvents, A = S.hideEvents, O = S.eventDrop,
            _ = S.eventResize, P = S.getRowCnt, B = S.getColCnt;
        S.getColWidth;
        var I = S.allDayRow, X = S.colLeft, J = S.colRight, V = S.colContentLeft, U = S.colContentRight;
        S.dateToCell;
        var Z = S.getDaySegmentContainer, G = S.calendar.formatDates, $ = S.renderDayOverlay, Q = S.clearOverlays,
            K = S.clearSelection, te = S.getHoverListener, ee = S.rangeToSegments, ne = S.cellToDate,
            re = S.cellToCellOffset, ae = S.cellOffsetToDayOffset, oe = S.dateToDayOffset, ie = S.dayOffsetToCellOffset
    }

    function ve(t, e) {
        for (var n = 0; e.length > n; n++) {
            var r = e[n];
            if (r.leftCol <= t.rightCol && r.rightCol >= t.leftCol) return !0
        }
        return !1
    }

    function he(t, e) {
        for (var n = 0; t.length > n; n++) {
            var r = t[n], a = r.element;
            a && e(r, a, n)
        }
    }

    function ge(t, e) {
        return e.rightCol - e.leftCol - (t.rightCol - t.leftCol) || e.event.allDay - t.event.allDay || t.event.start - e.event.start || (t.event.title || "").localeCompare(e.event.title)
    }

    function pe() {
        function e(t, e, a) {
            n(), e || (e = l(t, a)), c(t, e, a), r(t, e, a)
        }

        function n(t) {
            f && (f = !1, u(), s("unselect", null, t))
        }

        function r(t, e, n, r) {
            f = !0, s("select", null, t, e, n, r)
        }

        function a(e) {
            var a = o.cellToDate, s = o.getIsCellAllDay, l = o.getHoverListener(), f = o.reportDayClick;
            if (1 == e.which && i("selectable")) {
                n(e);
                var d;
                l.start(function (t, e) {
                    u(), t && s(t) ? (d = [a(e), a(t)].sort(O), c(d[0], d[1], !0)) : d = null
                }, e), t(document).one("mouseup", function (t) {
                    l.stop(), d && (+d[0] == +d[1] && f(d[0], !0, t), r(d[0], d[1], !0, t))
                })
            }
        }

        var o = this;
        o.select = e, o.unselect = n, o.reportSelection = r, o.daySelectionMousedown = a;
        var i = o.opt, s = o.trigger, l = o.defaultSelectionEnd, c = o.renderSelection, u = o.clearSelection, f = !1;
        i("selectable") && i("unselectAuto") && t(document).mousedown(function (e) {
            var r = i("unselectCancel");
            r && t(e.target).parents(r).length || n(e)
        })
    }

    function me() {
        function e(e, n) {
            var r = o.shift();
            return r || (r = t("<div class='fc-cell-overlay' style='position:absolute;z-index:3'/>")), r[0].parentNode != n[0] && r.appendTo(n), a.push(r.css(e).show()), r
        }

        function n() {
            for (var t; t = a.shift();) o.push(t.hide().unbind())
        }

        var r = this;
        r.renderOverlay = e, r.clearOverlays = n;
        var a = [], o = []
    }

    function ye(t) {
        var e, n, r = this;
        r.build = function () {
            e = [], n = [], t(e, n)
        }, r.cell = function (t, r) {
            var a, o = e.length, i = n.length, s = -1, l = -1;
            for (a = 0; o > a; a++) if (r >= e[a][0] && e[a][1] > r) {
                s = a;
                break
            }
            for (a = 0; i > a; a++) if (t >= n[a][0] && n[a][1] > t) {
                l = a;
                break
            }
            return s >= 0 && l >= 0 ? {row: s, col: l} : null
        }, r.rect = function (t, r, a, o, i) {
            var s = i.offset();
            return {top: e[t][0] - s.top, left: n[r][0] - s.left, width: n[o][1] - n[r][0], height: e[a][1] - e[t][0]}
        }
    }

    function we(e) {
        function n(t) {
            be(t);
            var n = e.cell(t.pageX, t.pageY);
            (!n != !i || n && (n.row != i.row || n.col != i.col)) && (n ? (o || (o = n), a(n, o, n.row - o.row, n.col - o.col)) : a(n, o), i = n)
        }

        var r, a, o, i, s = this;
        s.start = function (s, l, c) {
            a = s, o = i = null, e.build(), n(l), r = c || "mousemove", t(document).bind(r, n)
        }, s.stop = function () {
            return t(document).unbind(r, n), i
        }
    }

    function be(t) {
        t.pageX === e && (t.pageX = t.originalEvent.pageX, t.pageY = t.originalEvent.pageY)
    }

    function De(t) {
        function n(e) {
            return a[e] = a[e] || t(e)
        }

        var r = this, a = {}, o = {}, i = {};
        r.left = function (t) {
            return o[t] = o[t] === e ? n(t).position().left : o[t]
        }, r.right = function (t) {
            return i[t] = i[t] === e ? r.left(t) + n(t).width() : i[t]
        }, r.clear = function () {
            a = {}, o = {}, i = {}
        }
    }

    var Ce = {
        defaultView: "month",
        aspectRatio: 1.35,
        header: {left: "title", center: "", right: "today prev,next"},
        weekends: !0,
        weekNumbers: !1,
        weekNumberCalculation: "iso",
        weekNumberTitle: "W",
        allDayDefault: !0,
        ignoreTimezone: !0,
        lazyFetching: !0,
        startParam: "start",
        endParam: "end",
        titleFormat: {month: "MMMM yyyy", week: "MMM d[ yyyy]{ '&#8212;'[ MMM] d yyyy}", day: "dddd, MMM d, yyyy"},
        columnFormat: {month: "ddd", week: "ddd M/d", day: "dddd M/d"},
        timeFormat: {"": "h(:mm)t"},
        isRTL: !1,
        firstDay: 0,
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        buttonText: {
            prev: "<span class='fc-text-arrow'>&lsaquo;</span>",
            next: "<span class='fc-text-arrow'>&rsaquo;</span>",
            prevYear: "<span class='fc-text-arrow'>&laquo;</span>",
            nextYear: "<span class='fc-text-arrow'>&raquo;</span>",
            today: "today",
            month: "month",
            week: "week",
            day: "day"
        },
        theme: !1,
        buttonIcons: {prev: "circle-triangle-w", next: "circle-triangle-e"},
        unselectAuto: !0,
        dropAccept: "*",
        handleWindowResize: !0
    }, Me = {
        header: {left: "next,prev today", center: "", right: "title"},
        buttonText: {
            prev: "<span class='fc-text-arrow'>&rsaquo;</span>",
            next: "<span class='fc-text-arrow'>&lsaquo;</span>",
            prevYear: "<span class='fc-text-arrow'>&raquo;</span>",
            nextYear: "<span class='fc-text-arrow'>&laquo;</span>"
        },
        buttonIcons: {prev: "circle-triangle-e", next: "circle-triangle-w"}
    }, Ee = t.fullCalendar = {version: "1.6.4"}, Se = Ee.views = {};
    t.fn.fullCalendar = function (n) {
        if ("string" == typeof n) {
            var a, o = Array.prototype.slice.call(arguments, 1);
            return this.each(function () {
                var r = t.data(this, "fullCalendar");
                if (r && t.isFunction(r[n])) {
                    var i = r[n].apply(r, o);
                    a === e && (a = i), "destroy" == n && t.removeData(this, "fullCalendar")
                }
            }), a !== e ? a : this
        }
        n = n || {};
        var i = n.eventSources || [];
        return delete n.eventSources, n.events && (i.push(n.events), delete n.events), n = t.extend(!0, {}, Ce, n.isRTL || n.isRTL === e && Ce.isRTL ? Me : {}, n), this.each(function (e, a) {
            var o = t(a), s = new r(o, n, i);
            o.data("fullCalendar", s), s.render()
        }), this
    }, Ee.sourceNormalizers = [], Ee.sourceFetchers = [];
    var Te = {dataType: "json", cache: !1}, xe = 1;
    Ee.addDays = l, Ee.cloneDate = d, Ee.parseDate = p, Ee.parseISO8601 = m, Ee.parseTime = y, Ee.formatDate = w, Ee.formatDates = b;
    var ke = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], He = 864e5, Fe = 36e5, Re = 6e4, Ne = {
        s: function (t) {
            return t.getSeconds()
        }, ss: function (t) {
            return _(t.getSeconds())
        }, m: function (t) {
            return t.getMinutes()
        }, mm: function (t) {
            return _(t.getMinutes())
        }, h: function (t) {
            return t.getHours() % 12 || 12
        }, hh: function (t) {
            return _(t.getHours() % 12 || 12)
        }, H: function (t) {
            return t.getHours()
        }, HH: function (t) {
            return _(t.getHours())
        }, d: function (t) {
            return t.getDate()
        }, dd: function (t) {
            return _(t.getDate())
        }, ddd: function (t, e) {
            return e.dayNamesShort[t.getDay()]
        }, dddd: function (t, e) {
            return e.dayNames[t.getDay()]
        }, M: function (t) {
            return t.getMonth() + 1
        }, MM: function (t) {
            return _(t.getMonth() + 1)
        }, MMM: function (t, e) {
            return e.monthNamesShort[t.getMonth()]
        }, MMMM: function (t, e) {
            return e.monthNames[t.getMonth()]
        }, yy: function (t) {
            return (t.getFullYear() + "").substring(2)
        }, yyyy: function (t) {
            return t.getFullYear()
        }, t: function (t) {
            return 12 > t.getHours() ? "a" : "p"
        }, tt: function (t) {
            return 12 > t.getHours() ? "am" : "pm"
        }, T: function (t) {
            return 12 > t.getHours() ? "A" : "P"
        }, TT: function (t) {
            return 12 > t.getHours() ? "AM" : "PM"
        }, u: function (t) {
            return w(t, "yyyy-MM-dd'T'HH:mm:ss'Z'")
        }, S: function (t) {
            var e = t.getDate();
            return e > 10 && 20 > e ? "th" : ["st", "nd", "rd"][e % 10 - 1] || "th"
        }, w: function (t, e) {
            return e.weekNumberCalculation(t)
        }, W: function (t) {
            return D(t)
        }
    };
    Ee.dateFormatters = Ne, Ee.applyAll = I, Se.month = J, Se.basicWeek = V, Se.basicDay = U, n({weekMode: "fixed"}), Se.agendaWeek = $, Se.agendaDay = Q, n({
        allDaySlot: !0,
        allDayText: "all-day",
        firstHour: 6,
        slotMinutes: 30,
        defaultEventMinutes: 120,
        axisFormat: "h(:mm)tt",
        timeFormat: {agenda: "h:mm{ - h:mm}"},
        dragOpacity: {agenda: .5},
        minTime: 0,
        maxTime: 24,
        slotEventOverlap: !0
    })
})(jQuery);

/**
 * jquery.Jcrop.min.js v0.9.10 (build:20120626)
 * jQuery Image Cropping Plugin - released under MIT License
 * Copyright (c) 2008-2012 Tapmodo Interactive LLC
 * https://github.com/tapmodo/Jcrop
 */
(function (a) {
    a.Jcrop = function (b, c) {
        function h(a) {
            return Math.round(a) + "px"
        }

        function i(a) {
            return d.baseClass + "-" + a
        }

        function j() {
            return a.fx.step.hasOwnProperty("backgroundColor")
        }

        function k(b) {
            var c = a(b).offset();
            return [c.left, c.top]
        }

        function l(a) {
            return [a.pageX - e[0], a.pageY - e[1]]
        }

        function m(b) {
            typeof b != "object" && (b = {}), d = a.extend(d, b), a.each(["onChange", "onSelect", "onRelease", "onDblClick"], function (a, b) {
                typeof d[b] != "function" && (d[b] = function () {
                })
            })
        }

        function n(a, b) {
            e = k(C), bb.setCursor(a === "move" ? a : a + "-resize");
            if (a === "move") return bb.activateHandlers(p(b), u);
            var c = Z.getFixed(), d = q(a), f = Z.getCorner(q(d));
            Z.setPressed(Z.getCorner(d)), Z.setCurrent(f), bb.activateHandlers(o(a, c), u)
        }

        function o(a, b) {
            return function (c) {
                if (!d.aspectRatio) switch (a) {
                    case"e":
                        c[1] = b.y2;
                        break;
                    case"w":
                        c[1] = b.y2;
                        break;
                    case"n":
                        c[0] = b.x2;
                        break;
                    case"s":
                        c[0] = b.x2
                } else switch (a) {
                    case"e":
                        c[1] = b.y + 1;
                        break;
                    case"w":
                        c[1] = b.y + 1;
                        break;
                    case"n":
                        c[0] = b.x + 1;
                        break;
                    case"s":
                        c[0] = b.x + 1
                }
                Z.setCurrent(c), ba.update()
            }
        }

        function p(a) {
            var b = a;
            return bc.watchKeys(), function (
                a) {
                Z.moveOffset([a[0] - b[0], a[1] - b[1]]), b = a, ba.update()
            }
        }

        function q(a) {
            switch (a) {
                case"n":
                    return "sw";
                case"s":
                    return "nw";
                case"e":
                    return "nw";
                case"w":
                    return "ne";
                case"ne":
                    return "sw";
                case"nw":
                    return "se";
                case"se":
                    return "nw";
                case"sw":
                    return "ne"
            }
        }

        function r(a) {
            return function (b) {
                return d.disabled ? !1 : a === "move" && !d.allowMove ? !1 : (e = k(C), V = !0, n(a, l(b)), b.stopPropagation(), b.preventDefault(), !1)
            }
        }

        function s(a, b, c) {
            var d = a.width(), e = a.height();
            d > b && b > 0 && (d = b, e = b / a.width() * a.height()), e > c && c > 0 && (e = c, d = c / a.height() * a.width()), S = a.width() / d, T = a.height() / e, a.width(d).height(e)
        }

        function t(a) {
            return {x: a.x * S, y: a.y * T, x2: a.x2 * S, y2: a.y2 * T, w: a.w * S, h: a.h * T}
        }

        function u(a) {
            var b = Z.getFixed();
            b.w > d.minSelect[0] && b.h > d.minSelect[1] ? (ba.enableHandles(), ba.done()) : ba.release(), bb.setCursor(d.allowSelect ? "crosshair" : "default")
        }

        function v(a) {
            if (d.disabled) return !1;
            if (!d.allowSelect) return !1;
            V = !0, e = k(C), ba.disableHandles(), bb.setCursor("crosshair");
            var b = l(a);
            return Z.setPressed(b), ba.update(), bb.activateHandlers(w, u), bc.watchKeys(), a.stopPropagation
            (), a.preventDefault(), !1
        }

        function w(a) {
            Z.setCurrent(a), ba.update()
        }

        function x() {
            var b = a("<div></div>").addClass(i("tracker"));
            return a.browser.msie && b.css({opacity: 0, backgroundColor: "white"}), b
        }

        function bd(a) {
            F.removeClass().addClass(i("holder")).addClass(a)
        }

        function be(a, b) {
            function t() {
                window.setTimeout(u, l)
            }

            var c = a[0] / S, e = a[1] / T, f = a[2] / S, g = a[3] / T;
            if (W) return;
            var h = Z.flipCoords(c, e, f, g), i = Z.getFixed(), j = [i.x, i.y, i.x2, i.y2], k = j, l = d.animationDelay,
                m = h[0] - j[0], n = h[1] - j[1], o = h[2] - j[2], p = h[3] - j[3], q = 0, r = d.swingSpeed;
            c = k[0], e = k[1], f = k[2], g = k[3], ba.animMode(!0);
            var s, u = function () {
                return function () {
                    q += (100 - q) / r, k[0] = Math.round(c + q / 100 * m), k[1] = Math.round(e + q / 100 * n), k[2] = Math.round(f + q / 100 * o), k[3] = Math.round(g + q / 100 * p), q >= 99.8 && (q = 100), q < 100 ? (bg(k), t()) : (ba.done(), ba.animMode(!1), typeof b == "function" && b.call(br))
                }
            }();
            t()
        }

        function bf(a) {
            bg([a[0] / S, a[1] / T, a[2] / S, a[3] / T]), d.onSelect.call(br, t(Z.getFixed())), ba.enableHandles()
        }

        function bg(a) {
            Z.setPressed([a[0], a[1]]), Z.setCurrent([a[2], a[3]]), ba.update()
        }

        function bh() {
            return t
            (Z.getFixed())
        }

        function bi() {
            return Z.getFixed()
        }

        function bj(a) {
            m(a), bq()
        }

        function bk() {
            d.disabled = !0, ba.disableHandles(), ba.setCursor("default"), bb.setCursor("default")
        }

        function bl() {
            d.disabled = !1, bq()
        }

        function bm() {
            ba.done(), bb.activateHandlers(null, null)
        }

        function bn() {
            F.remove(), z.show(), a(b).removeData("Jcrop")
        }

        function bo(a, b) {
            ba.release(), bk();
            var c = new Image;
            c.onload = function () {
                var e = c.width, f = c.height, g = d.boxWidth, h = d.boxHeight;
                C.width(e).height(f), C.attr("src", a), G.attr("src", a), s(C, g, h), D = C.width(), E = C.height(), G.width(D).height(E), L.width(D + K * 2).height(E + K * 2), F.width(D).height(E), _.resize(D, E), bl(), typeof b == "function" && b.call(br)
            }, c.src = a
        }

        function bp(a, b, c) {
            var e = b || d.bgColor;
            d.bgFade && j() && d.fadeTime && !c ? a.animate({backgroundColor: e}, {
                queue: !1,
                duration: d.fadeTime
            }) : a.css("backgroundColor", e)
        }

        function bq(a) {
            d.allowResize ? a ? ba.enableOnly() : ba.enableHandles() : ba.disableHandles(), bb.setCursor(d.allowSelect ? "crosshair" : "default"), ba.setCursor(d.allowMove ? "move" : "default"), d.hasOwnProperty("trueSize") &&
            (S = d.trueSize[0] / D, T = d.trueSize[1] / E), d.hasOwnProperty("setSelect") && (bf(d.setSelect), ba.done(), delete d.setSelect), _.refresh(), d.bgColor != M && (bp(d.shade ? _.getShades() : F, d.shade ? d.shadeColor || d.bgColor : d.bgColor), M = d.bgColor), N != d.bgOpacity && (N = d.bgOpacity, d.shade ? _.refresh() : ba.setBgOpacity(N)), O = d.maxSize[0] || 0, P = d.maxSize[1] || 0, Q = d.minSize[0] || 0, R = d.minSize[1] || 0, d.hasOwnProperty("outerImage") && (C.attr("src", d.outerImage), delete d.outerImage), ba.refresh()
        }

        var d = a.extend({}, a.Jcrop.defaults), e, f, g = !1;
        a.browser.msie && a.browser.version.split(".")[0] === "6" && (g = !0), typeof b != "object" && (b = a(b)[0]), typeof c != "object" && (c = {}), m(c);
        var y = {border: "none", visibility: "visible", margin: 0, padding: 0, position: "absolute", top: 0, left: 0},
            z = a(b), A = !0;
        if (b.tagName == "IMG") {
            if (z[0].width != 0 && z[0].height != 0) z.width(z[0].width), z.height(z[0].height); else {
                var B = new Image;
                B.src = z[0].src, z.width(B.width), z.height(B.height)
            }
            var C = z.clone().removeAttr("id").css(y).show();
            C.width(z.width()), C.height(z.height()), z.after(C).hide()
        } else C = z.css
        (y).show(), A = !1, d.shade === null && (d.shade = !0);
        s(C, d.boxWidth, d.boxHeight);
        var D = C.width(), E = C.height(), F = a("<div />").width(D).height(E).addClass(i("holder")).css({
            position: "relative",
            backgroundColor: d.bgColor
        }).insertAfter(z).append(C);
        d.addClass && F.addClass(d.addClass);
        var G = a("<div />"),
            H = a("<div />").width("100%").height("100%").css({zIndex: 310, position: "absolute", overflow: "hidden"}),
            I = a("<div />").width("100%").height("100%").css("zIndex", 320),
            J = a("<div />").css({position: "absolute", zIndex: 600}).dblclick(function () {
                var a = Z.getFixed();
                d.onDblClick.call(br, a)
            }).insertBefore(C).append(H, I);
        A && (G = a("<img />").attr("src", C.attr("src")).css(y).width(D).height(E), H.append(G)), g && J.css({overflowY: "hidden"});
        var K = d.boundary, L = x().width(D + K * 2).height(E + K * 2).css({
            position: "absolute",
            top: h(-K),
            left: h(-K),
            zIndex: 290
        }).mousedown(v), M = d.bgColor, N = d.bgOpacity, O, P, Q, R, S, T, U = !0, V, W, X;
        e = k(C);
        var Y = function () {
            function a() {
                var a = {}, b = ["touchstart", "touchmove", "touchend"], c = document.createElement("div"), d;
                try {
                    for (d = 0; d < b.length
                        ; d++) {
                        var e = b[d];
                        e = "on" + e;
                        var f = e in c;
                        f || (c.setAttribute(e, "return;"), f = typeof c[e] == "function"), a[b[d]] = f
                    }
                    return a.touchstart && a.touchend && a.touchmove
                } catch (g) {
                    return !1
                }
            }

            function b() {
                return d.touchSupport === !0 || d.touchSupport === !1 ? d.touchSupport : a()
            }

            return {
                createDragger: function (a) {
                    return function (b) {
                        return b.pageX = b.originalEvent.changedTouches[0].pageX, b.pageY = b.originalEvent.changedTouches[0].pageY, d.disabled ? !1 : a === "move" && !d.allowMove ? !1 : (V = !0, n(a, l(b)), b.stopPropagation(), b.preventDefault(), !1)
                    }
                }, newSelection: function (a) {
                    return a.pageX = a.originalEvent.changedTouches[0].pageX, a.pageY = a.originalEvent.changedTouches[0].pageY, v(a)
                }, isSupported: a, support: b()
            }
        }(), Z = function () {
            function h(d) {
                d = n(d), c = a = d[0], e = b = d[1]
            }

            function i(a) {
                a = n(a), f = a[0] - c, g = a[1] - e, c = a[0], e = a[1]
            }

            function j() {
                return [f, g]
            }

            function k(d) {
                var f = d[0], g = d[1];
                0 > a + f && (f -= f + a), 0 > b + g && (g -= g + b), E < e + g && (g += E - (e + g)), D < c + f && (f += D - (c + f)), a += f, c += f, b += g, e += g
            }

            function l(a) {
                var b = m();
                switch (a) {
                    case"ne":
                        return [b.x2, b.y];
                    case"nw":
                        return [b.x, b.y];
                    case"se":
                        return [
                            b.x2, b.y2];
                    case"sw":
                        return [b.x, b.y2]
                }
            }

            function m() {
                if (!d.aspectRatio) return p();
                var f = d.aspectRatio, g = d.minSize[0] / S, h = d.maxSize[0] / S, i = d.maxSize[1] / T, j = c - a,
                    k = e - b, l = Math.abs(j), m = Math.abs(k), n = l / m, r, s, t, u;
                return h === 0 && (h = D * 10), i === 0 && (i = E * 10), n < f ? (s = e, t = m * f, r = j < 0 ? a - t : t + a, r < 0 ? (r = 0, u = Math.abs((r - a) / f), s = k < 0 ? b - u : u + b) : r > D && (r = D, u = Math.abs((r - a) / f), s = k < 0 ? b - u : u + b)) : (r = c, u = l / f, s = k < 0 ? b - u : b + u, s < 0 ? (s = 0, t = Math.abs((s - b) * f), r = j < 0 ? a - t : t + a) : s > E && (s = E, t = Math.abs(s - b) * f, r = j < 0 ? a - t : t + a)), r > a ? (r - a < g ? r = a + g : r - a > h && (r = a + h), s > b ? s = b + (r - a) / f : s = b - (r - a) / f) : r < a && (a - r < g ? r = a - g : a - r > h && (r = a - h), s > b ? s = b + (a - r) / f : s = b - (a - r) / f), r < 0 ? (a -= r, r = 0) : r > D && (a -= r - D, r = D), s < 0 ? (b -= s, s = 0) : s > E && (b -= s - E, s = E), q(o(a, b, r, s))
            }

            function n(a) {
                return a[0] < 0 && (a[0] = 0), a[1] < 0 && (a[1] = 0), a[0] > D && (a[0] = D), a[1] > E && (a[1] = E), [a[0], a[1]]
            }

            function o(a, b, c, d) {
                var e = a, f = c, g = b, h = d;
                return c < a && (e = c, f = a), d < b && (g = d, h = b), [e, g, f, h]
            }

            function p() {
                var d = c - a, f = e - b, g;
                return O && Math.abs(d) > O && (c = d > 0 ? a + O : a - O), P && Math.abs(f) > P && (e = f > 0 ? b + P : b - P), R / T && Math.abs(f) < R / T && (e = f > 0 ? b + R / T : b - R / T), Q / S && Math.abs(d) < Q / S && (c = d > 0 ? a + Q / S : a - Q / S), a < 0 && (c -= a, a -= a), b < 0 && (e -= b, b -= b), c < 0 && (a -= c, c -= c), e < 0 && (b -= e, e -= e), c > D && (g = c - D, a -= g, c -= g), e > E && (g = e - E, b -= g, e -= g), a > D && (g = a - E, e -= g, b -= g), b > E && (g = b - E, e -= g, b -= g), q(o(a, b, c, e))
            }

            function q(a) {
                return {x: a[0], y: a[1], x2: a[2], y2: a[3], w: a[2] - a[0], h: a[3] - a[1]}
            }

            var a = 0, b = 0, c = 0, e = 0, f, g;
            return {flipCoords: o, setPressed: h, setCurrent: i, getOffset: j, moveOffset: k, getCorner: l, getFixed: m}
        }(), _ = function () {
            function f(a, b) {
                e.left.css({height: h(b)}), e.right.css({height: h(b)})
            }

            function g() {
                return i(Z.getFixed())
            }

            function i(a) {
                e.top.css({left: h(a.x), width: h(a.w), height: h(a.y)}), e.bottom.css({
                    top: h(a.y2),
                    left: h(a.x),
                    width: h(a.w),
                    height: h(E - a.y2)
                }), e.right.css({left: h(a.x2), width: h(D - a.x2)}), e.left.css({width: h(a.x)})
            }

            function j() {
                return a("<div />").css({position: "absolute", backgroundColor: d.shadeColor || d.bgColor}).appendTo(c)
            }

            function k() {
                b || (b = !0, c.insertBefore(C), g(), ba.setBgOpacity(1, 0, 1), G.hide(), l(d.shadeColor || d.bgColor, 1), ba.isAwake() ? n(d.bgOpacity, 1) : n(1, 1))
            }

            function l(a, b) {
                bp(p(), a, b)
            }

            function m() {
                b && (c.remove(), G.show(), b = !1, ba.isAwake() ? ba.setBgOpacity(d.bgOpacity, 1, 1) : (ba.setBgOpacity(1, 1, 1), ba.disableHandles()), bp(F, 0, 1))
            }

            function n(a, e) {
                b && (d.bgFade && !e ? c.animate({opacity: 1 - a}, {
                    queue: !1,
                    duration: d.fadeTime
                }) : c.css({opacity: 1 - a}))
            }

            function o() {
                d.shade ? k() : m(), ba.isAwake() && n(d.bgOpacity)
            }

            function p() {
                return c.children()
            }

            var b = !1, c = a("<div />").css({position: "absolute", zIndex: 240, opacity: 0}),
                e = {top: j(), left: j().height(E), right: j().height(E), bottom: j()};
            return {
                update: g,
                updateRaw: i,
                getShades: p,
                setBgColor: l,
                enable: k,
                disable: m,
                resize: f,
                refresh: o,
                opacity: n
            }
        }(), ba = function () {
            function k(b) {
                var c = a("<div />").css({position: "absolute", opacity: d.borderOpacity}).addClass(i(b));
                return H.append(c), c
            }

            function l(b, c) {
                var d = a("<div />").mousedown(r(b)).css({
                    cursor: b + "-resize",
                    position: "absolute",
                    zIndex: c
                }).addClass("ord-" + b);
                return Y.support && d.bind("touchstart.jcrop", Y.createDragger(b)), I.append(d), d
            }

            function m(a) {
                var b = d.handleSize;
                return l(a, c++).css({opacity: d.handleOpacity}).width(b).height(b).addClass(i("handle"
                ))
            }

            function n(a) {
                return l(a, c++).addClass("jcrop-dragbar")
            }

            function o(a) {
                var b;
                for (b = 0; b < a.length; b++) g[a[b]] = n(a[b])
            }

            function p(a) {
                var b, c;
                for (c = 0; c < a.length; c++) {
                    switch (a[c]) {
                        case"n":
                            b = "hline";
                            break;
                        case"s":
                            b = "hline bottom";
                            break;
                        case"e":
                            b = "vline right";
                            break;
                        case"w":
                            b = "vline"
                    }
                    e[a[c]] = k(b)
                }
            }

            function q(a) {
                var b;
                for (b = 0; b < a.length; b++) f[a[b]] = m(a[b])
            }

            function s(a, b) {
                d.shade || G.css({top: h(-b), left: h(-a)}), J.css({top: h(b), left: h(a)})
            }

            function u(a, b) {
                J.width(Math.round(a)).height(Math.round(b))
            }

            function v() {
                var a = Z.getFixed();
                Z.setPressed([a.x, a.y]), Z.setCurrent([a.x2, a.y2]), w()
            }

            function w(a) {
                if (b) return y(a)
            }

            function y(a) {
                var c = Z.getFixed();
                u(c.w, c.h), s(c.x, c.y), d.shade && _.updateRaw(c), b || A(), a ? d.onSelect.call(br, t(c)) : d.onChange.call(br, t(c))
            }

            function z(a, c, e) {
                if (!b && !c) return;
                d.bgFade && !e ? C.animate({opacity: a}, {queue: !1, duration: d.fadeTime}) : C.css("opacity", a)
            }

            function A() {
                J.show(), d.shade ? _.opacity(N) : z(N, !0), b = !0
            }

            function B() {
                F(), J.hide(), d.shade ? _.opacity(1) : z(1), b = !1, d.onRelease.call(br)
            }

            function D() {
                j && I.show()
            }

            function E() {
                j = !0;
                if (d.allowResize) return I.show(), !0
            }

            function F() {
                j = !1, I.hide()
            }

            function K(a) {
                a ? (W = !0, F()) : (W = !1, E())
            }

            function L() {
                K(!1), v()
            }

            var b, c = 370, e = {}, f = {}, g = {}, j = !1;
            d.dragEdges && a.isArray(d.createDragbars) && o(d.createDragbars), a.isArray(d.createHandles) && q(d.createHandles), d.drawBorders && a.isArray(d.createBorders) && p(d.createBorders), a(document).bind("touchstart.jcrop-ios", function (b) {
                a(b.currentTarget).hasClass("jcrop-tracker") && b.stopPropagation()
            });
            var M = x().mousedown(r("move")).css({cursor: "move", position: "absolute", zIndex: 360});
            return Y.support && M.bind("touchstart.jcrop", Y.createDragger("move")), H.append(M), F(), {
                updateVisible: w,
                update: y,
                release: B,
                refresh: v,
                isAwake: function () {
                    return b
                },
                setCursor: function (a) {
                    M.css("cursor", a)
                },
                enableHandles: E,
                enableOnly: function () {
                    j = !0
                },
                showHandles: D,
                disableHandles: F,
                animMode: K,
                setBgOpacity: z,
                done: L
            }
        }(), bb = function () {
            function f() {
                L.css({zIndex: 450}), Y.support && a(document).bind("touchmove.jcrop", k).bind("touchend.jcrop", m), e && a(document).bind("mousemove.jcrop"
                    , h).bind("mouseup.jcrop", i)
            }

            function g() {
                L.css({zIndex: 290}), a(document).unbind(".jcrop")
            }

            function h(a) {
                return b(l(a)), !1
            }

            function i(a) {
                return a.preventDefault(), a.stopPropagation(), V && (V = !1, c(l(a)), ba.isAwake() && d.onSelect.call(br, t(Z.getFixed())), g(), b = function () {
                }, c = function () {
                }), !1
            }

            function j(a, d) {
                return V = !0, b = a, c = d, f(), !1
            }

            function k(a) {
                return a.pageX = a.originalEvent.changedTouches[0].pageX, a.pageY = a.originalEvent.changedTouches[0].pageY, h(a)
            }

            function m(a) {
                return a.pageX = a.originalEvent.changedTouches[0].pageX, a.pageY = a.originalEvent.changedTouches[0].pageY, i(a)
            }

            function n(a) {
                L.css("cursor", a)
            }

            var b = function () {
            }, c = function () {
            }, e = d.trackDocument;
            return e || L.mousemove(h).mouseup(i).mouseout(i), C.before(L), {activateHandlers: j, setCursor: n}
        }(), bc = function () {
            function e() {
                d.keySupport && (b.show(), b.focus())
            }

            function f(a) {
                b.hide()
            }

            function h(a, b, c) {
                d.allowMove && (Z.moveOffset([b, c]), ba.updateVisible(!0)), a.preventDefault(), a.stopPropagation()
            }

            function i(a) {
                if (a.ctrlKey || a.metaKey) return !0;
                X = a.shiftKey ? !0 : !1;
                var b = X ? 10
                    : 1;
                switch (a.keyCode) {
                    case 37:
                        h(a, -b, 0);
                        break;
                    case 39:
                        h(a, b, 0);
                        break;
                    case 38:
                        h(a, 0, -b);
                        break;
                    case 40:
                        h(a, 0, b);
                        break;
                    case 27:
                        d.allowSelect && ba.release();
                        break;
                    case 9:
                        return !0
                }
                return !1
            }

            var b = a('<input type="radio" />').css({
                position: "fixed",
                left: "-120px",
                width: "12px"
            }).addClass("jcrop-keymgr"), c = a("<div />").css({position: "absolute", overflow: "hidden"}).append(b);
            return d.keySupport && (b.keydown(i).blur(f), g || !d.fixedSupport ? (b.css({
                position: "absolute",
                left: "-20px"
            }), c.append(b).insertBefore(C)) : b.insertBefore(C)), {watchKeys: e}
        }();
        Y.support && L.bind("touchstart.jcrop", Y.newSelection), I.hide(), bq(!0);
        var br = {
            setImage: bo,
            animateTo: be,
            setSelect: bf,
            setOptions: bj,
            tellSelect: bh,
            tellScaled: bi,
            setClass: bd,
            disable: bk,
            enable: bl,
            cancel: bm,
            release: ba.release,
            destroy: bn,
            focus: bc.watchKeys,
            getBounds: function () {
                return [D * S, E * T]
            },
            getWidgetSize: function () {
                return [D, E]
            },
            getScaleFactor: function () {
                return [S, T]
            },
            getOptions: function () {
                return d
            },
            ui: {holder: F, selection: J}
        };
        return a.browser.msie && F.bind("selectstart", function () {
            return !1
        }), z.data
        ("Jcrop", br), br
    }, a.fn.Jcrop = function (b, c) {
        var d;
        return this.each(function () {
            if (a(this).data("Jcrop")) {
                if (b === "api") return a(this).data("Jcrop");
                a(this).data("Jcrop").setOptions(b)
            } else this.tagName == "IMG" ? a.Jcrop.Loader(this, function () {
                a(this).css({
                    display: "block",
                    visibility: "hidden"
                }), d = a.Jcrop(this, b), a.isFunction(c) && c.call(d)
            }) : (a(this).css({
                display: "block",
                visibility: "hidden"
            }), d = a.Jcrop(this, b), a.isFunction(c) && c.call(d))
        }), this
    }, a.Jcrop.Loader = function (b, c, d) {
        function g() {
            f.complete ? (e.unbind(".jcloader"), a.isFunction(c) && c.call(f)) : window.setTimeout(g, 50)
        }

        var e = a(b), f = e[0];
        e.bind("load.jcloader", g).bind("error.jcloader", function (b) {
            e.unbind(".jcloader"), a.isFunction(d) && d.call(f)
        }), f.complete && a.isFunction(c) && (e.unbind(".jcloader"), c.call(f))
    }, a.Jcrop.defaults = {
        allowSelect: !0,
        allowMove: !0,
        allowResize: !0,
        trackDocument: !0,
        baseClass: "jcrop",
        addClass: null,
        bgColor: "black",
        bgOpacity: .6,
        bgFade: !1,
        borderOpacity: .4,
        handleOpacity: .5,
        handleSize: 7,
        aspectRatio: 0,
        keySupport: !0,
        createHandles: ["n", "s", "e", "w", "nw", "ne"
            , "se", "sw"],
        createDragbars: ["n", "s", "e", "w"],
        createBorders: ["n", "s", "e", "w"],
        drawBorders: !0,
        dragEdges: !0,
        fixedSupport: !0,
        touchSupport: null,
        shade: null,
        boxWidth: 0,
        boxHeight: 0,
        boundary: 2,
        fadeTime: 400,
        animationDelay: 20,
        swingSpeed: 3,
        minSelect: [0, 0],
        maxSize: [0, 0],
        minSize: [0, 0],
        onChange: function () {
        },
        onSelect: function () {
        },
        onDblClick: function () {
        },
        onRelease: function () {
        }
    }
})(jQuery);

/**
 * Intro.js v1.0.0
 * https://github.com/usablica/intro.js
 * MIT licensed
 *
 * Copyright (C) 2013 usabli.ca - A weekend project by Afshin Mehrabani (@afshinmeh)
 */
!function (t, e) {
    "object" == typeof exports ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t)
}(this, function (t) {
    function e(t) {
        this._targetElement = t, this._options = {
            nextLabel: "Next &rarr;",
            prevLabel: "&larr; Back",
            skipLabel: "Skip",
            doneLabel: "Done",
            tooltipPosition: "bottom",
            tooltipClass: "",
            highlightClass: "",
            exitOnEsc: !0,
            exitOnOverlayClick: !0,
            showStepNumbers: !0,
            keyboardNavigation: !0,
            showButtons: !0,
            showBullets: !0,
            showProgress: !1,
            scrollToElement: !0,
            overlayOpacity: .8,
            positionPrecedence: ["bottom", "top", "right", "left"],
            disableInteraction: !1
        }
    }

    function n(t) {
        var e = [], n = this;
        if (this._options.steps) for (var i = [], a = 0, c = this._options.steps.length; c > a; a++) {
            var h = o(this._options.steps[a]);
            if (h.step = e.length + 1, "string" == typeof h.element && (h.element = document.querySelector(h.element)), "undefined" == typeof h.element || null == h.element) {
                var u = document.querySelector(".introjsFloatingElement");
                null == u && (u = document.createElement("div"), u.className = "introjsFloatingElement", document.body.appendChild(u)), h.element = u, h.position = "floating"
            }
            null != h.element && e.push(h)
        } else {
            var i = t.querySelectorAll("*[data-intro]");
            if (i.length < 1) return !1;
            for (var a = 0, d = i.length; d > a; a++) {
                var f = i[a], m = parseInt(f.getAttribute("data-step"), 10);
                m > 0 && (e[m - 1] = {
                    element: f,
                    intro: f.getAttribute("data-intro"),
                    step: parseInt(f.getAttribute("data-step"), 10),
                    tooltipClass: f.getAttribute("data-tooltipClass"),
                    highlightClass: f.getAttribute("data-highlightClass"),
                    position: f.getAttribute("data-position") || this._options.tooltipPosition
                })
            }
            for (var g = 0, a = 0, d = i.length; d > a; a++) {
                var f = i[a];
                if (null == f.getAttribute("data-step")) {
                    for (; ;) {
                        if ("undefined" == typeof e[g]) break;
                        g++
                    }
                    e[g] = {
                        element: f,
                        intro: f.getAttribute("data-intro"),
                        step: g + 1,
                        tooltipClass: f.getAttribute("data-tooltipClass"),
                        highlightClass: f.getAttribute("data-highlightClass"),
                        position: f.getAttribute("data-position") || this._options.tooltipPosition
                    }
                }
            }
        }
        for (var b = [], v = 0; v < e.length; v++) e[v] && b.push(e[v]);
        if (e = b, e.sort(function (t, e) {
            return t.step - e.step
        }), n._introItems = e, y.call(n, t)) {
            r.call(n);
            {
                t.querySelector(".introjs-skipbutton"), t.querySelector(".introjs-nextbutton")
            }
            n._onKeyDown = function (e) {
                if (27 === e.keyCode && 1 == n._options.exitOnEsc) l.call(n, t), void 0 != n._introExitCallback && n._introExitCallback.call(n); else if (37 === e.keyCode) s.call(n); else if (39 === e.keyCode) r.call(n); else if (13 === e.keyCode) {
                    var o = e.target || e.srcElement;
                    o && o.className.indexOf("introjs-prevbutton") > 0 ? s.call(n) : o && o.className.indexOf("introjs-skipbutton") > 0 ? l.call(n, t) : r.call(n), e.preventDefault ? e.preventDefault() : e.returnValue = !1
                }
            }, n._onResize = function () {
                p.call(n, document.querySelector(".introjs-helperLayer")), p.call(n, document.querySelector(".introjs-tooltipReferenceLayer"))
            }, window.addEventListener ? (this._options.keyboardNavigation && window.addEventListener("keydown", n._onKeyDown, !0), window.addEventListener("resize", n._onResize, !0)) : document.attachEvent && (this._options.keyboardNavigation && document.attachEvent("onkeydown", n._onKeyDown), document.attachEvent("onresize", n._onResize))
        }
        return !1
    }

    function o(t) {
        if (null == t || "object" != typeof t || "undefined" != typeof t.nodeType) return t;
        var e = {};
        for (var n in t) e[n] = o(t[n]);
        return e
    }

    function i(t) {
        this._currentStep = t - 2, "undefined" != typeof this._introItems && r.call(this)
    }

    function r() {
        if (this._direction = "forward", "undefined" == typeof this._currentStep ? this._currentStep = 0 : ++this._currentStep, this._introItems.length <= this._currentStep) return "function" == typeof this._introCompleteCallback && this._introCompleteCallback.call(this), void l.call(this, this._targetElement);
        var t = this._introItems[this._currentStep];
        "undefined" != typeof this._introBeforeChangeCallback && this._introBeforeChangeCallback.call(this, t.element), d.call(this, t)
    }

    function s() {
        if (this._direction = "backward", 0 === this._currentStep) return !1;
        var t = this._introItems[--this._currentStep];
        "undefined" != typeof this._introBeforeChangeCallback && this._introBeforeChangeCallback.call(this, t.element), d.call(this, t)
    }

    function l(t) {
        var e = t.querySelector(".introjs-overlay");
        if (null != e) {
            e.style.opacity = 0, setTimeout(function () {
                e.parentNode && e.parentNode.removeChild(e)
            }, 500);
            var n = t.querySelector(".introjs-helperLayer");
            n && n.parentNode.removeChild(n);
            var o = t.querySelector(".introjs-tooltipReferenceLayer");
            o && o.parentNode.removeChild(o);
            var i = t.querySelector(".introjs-disableInteraction");
            i && i.parentNode.removeChild(i);
            var r = document.querySelector(".introjsFloatingElement");
            r && r.parentNode.removeChild(r);
            var s = document.querySelector(".introjs-showElement");
            s && (s.className = s.className.replace(/introjs-[a-zA-Z]+/g, "").replace(/^\s+|\s+$/g, ""));
            var l = document.querySelectorAll(".introjs-fixParent");
            if (l && l.length > 0) for (var a = l.length - 1; a >= 0; a--) l[a].className = l[a].className.replace(/introjs-fixParent/g, "").replace(/^\s+|\s+$/g, "");
            window.removeEventListener ? window.removeEventListener("keydown", this._onKeyDown, !0) : document.detachEvent && document.detachEvent("onkeydown", this._onKeyDown), this._currentStep = void 0
        }
    }

    function a(t, e, n, o) {
        var i, r, s, l = "";
        if (e.style.top = null, e.style.right = null, e.style.bottom = null, e.style.left = null, e.style.marginLeft = null, e.style.marginTop = null, n.style.display = "inherit", "undefined" != typeof o && null != o && (o.style.top = null, o.style.left = null), this._introItems[this._currentStep]) {
            i = this._introItems[this._currentStep], l = "string" == typeof i.tooltipClass ? i.tooltipClass : this._options.tooltipClass, e.className = ("introjs-tooltip " + l).replace(/^\s+|\s+$/g, "");
            var l = this._options.tooltipClass;
            currentTooltipPosition = this._introItems[this._currentStep].position, ("auto" == currentTooltipPosition || "auto" == this._options.tooltipPosition) && "floating" != currentTooltipPosition && (currentTooltipPosition = c.call(this, t, e, currentTooltipPosition));
            var a = b(t), h = b(e).height, p = m();
            switch (currentTooltipPosition) {
                case"top":
                    e.style.left = "15px", e.style.top = "-" + (h + 10) + "px", n.className = "introjs-arrow bottom";
                    break;
                case"right":
                    e.style.left = b(t).width + 20 + "px", a.top + h > p.height && (n.className = "introjs-arrow left-bottom", e.style.top = "-" + (h - a.height - 20) + "px"), n.className = "introjs-arrow left";
                    break;
                case"left":
                    1 == this._options.showStepNumbers && (e.style.top = "15px"), a.top + h > p.height ? (e.style.top = "-" + (h - a.height - 20) + "px", n.className = "introjs-arrow right-bottom") : n.className = "introjs-arrow right", e.style.right = a.width + 20 + "px";
                    break;
                case"floating":
                    n.style.display = "none", r = b(e), e.style.left = "50%", e.style.top = "50%", e.style.marginLeft = "-" + r.width / 2 + "px", e.style.marginTop = "-" + r.height / 2 + "px", "undefined" != typeof o && null != o && (o.style.left = "-" + (r.width / 2 + 18) + "px", o.style.top = "-" + (r.height / 2 + 18) + "px");
                    break;
                case"bottom-right-aligned":
                    n.className = "introjs-arrow top-right", e.style.right = "0px", e.style.bottom = "-" + (b(e).height + 10) + "px";
                    break;
                case"bottom-middle-aligned":
                    s = b(t), r = b(e), n.className = "introjs-arrow top-middle", e.style.left = s.width / 2 - r.width / 2 + "px", e.style.bottom = "-" + (r.height + 10) + "px";
                    break;
                case"bottom-left-aligned":
                case"bottom":
                default:
                    e.style.bottom = "-" + (b(e).height + 10) + "px", e.style.left = b(t).width / 2 - b(e).width / 2 + "px", n.className = "introjs-arrow top"
            }
        }
    }

    function c(t, e, n) {
        var o = this._options.positionPrecedence.slice(), i = m(), r = b(e).height + 10, s = b(e).width + 20, l = b(t),
            a = "floating";
        return l.left + s > i.width || l.left + l.width / 2 - s < 0 ? (h(o, "bottom"), h(o, "top")) : (l.height + l.top + r > i.height && h(o, "bottom"), l.top - r < 0 && h(o, "top")), l.width + l.left + s > i.width && h(o, "right"), l.left - s < 0 && h(o, "left"), o.length > 0 && (a = o[0]), n && "auto" != n && o.indexOf(n) > -1 && (a = n), a
    }

    function h(t, e) {
        t.indexOf(e) > -1 && t.splice(t.indexOf(e), 1)
    }

    function p(t) {
        if (t) {
            if (!this._introItems[this._currentStep]) return;
            var e = this._introItems[this._currentStep], n = b(e.element), o = 10;
            "floating" == e.position && (o = 0), t.setAttribute("style", "width: " + (n.width + o) + "px; height:" + (n.height + o) + "px; top:" + (n.top - 5) + "px;left: " + (n.left - 5) + "px;")
        }
    }

    function u() {
        var t = document.querySelector(".introjs-disableInteraction");
        null === t && (t = document.createElement("div"), t.className = "introjs-disableInteraction", this._targetElement.appendChild(t)), p.call(this, t)
    }

    function d(t) {
        "undefined" != typeof this._introChangeCallback && this._introChangeCallback.call(this, t.element);
        {
            var e = this, n = document.querySelector(".introjs-helperLayer"),
                o = document.querySelector(".introjs-tooltipReferenceLayer"), i = "introjs-helperLayer";
            b(t.element)
        }
        if ("string" == typeof t.highlightClass && (i += " " + t.highlightClass), "string" == typeof this._options.highlightClass && (i += " " + this._options.highlightClass), null != n) {
            var c = o.querySelector(".introjs-helperNumberLayer"), h = o.querySelector(".introjs-tooltiptext"),
                d = o.querySelector(".introjs-arrow"), y = o.querySelector(".introjs-tooltip"),
                _ = o.querySelector(".introjs-skipbutton"), w = o.querySelector(".introjs-prevbutton"),
                C = o.querySelector(".introjs-nextbutton");
            if (n.className = i, y.style.opacity = 0, y.style.display = "none", null != c) {
                var j = this._introItems[t.step - 2 >= 0 ? t.step - 2 : 0];
                (null != j && "forward" == this._direction && "floating" == j.position || "backward" == this._direction && "floating" == t.position) && (c.style.opacity = 0)
            }
            p.call(e, n), p.call(e, o);
            var x = document.querySelectorAll(".introjs-fixParent");
            if (x && x.length > 0) for (var N = x.length - 1; N >= 0; N--) x[N].className = x[N].className.replace(/introjs-fixParent/g, "").replace(/^\s+|\s+$/g, "");
            var S = document.querySelector(".introjs-showElement");
            S.className = S.className.replace(/introjs-[a-zA-Z]+/g, "").replace(/^\s+|\s+$/g, ""), e._lastShowElementTimer && clearTimeout(e._lastShowElementTimer), e._lastShowElementTimer = setTimeout(function () {
                null != c && (c.innerHTML = t.step), h.innerHTML = t.intro, y.style.display = "block", a.call(e, t.element, y, d, c), o.querySelector(".introjs-bullets li > a.active").className = "", o.querySelector('.introjs-bullets li > a[data-stepnumber="' + t.step + '"]').className = "active", o.querySelector(".introjs-progress .introjs-progressbar").setAttribute("style", "width:" + v.call(e) + "%;"), y.style.opacity = 1, c && (c.style.opacity = 1), -1 === C.tabIndex ? _.focus() : C.focus()
            }, 350)
        } else {
            var k = document.createElement("div"), E = document.createElement("div"), L = document.createElement("div"),
                I = document.createElement("div"), T = document.createElement("div"), q = document.createElement("div"),
                A = document.createElement("div"), P = document.createElement("div");
            k.className = i, E.className = "introjs-tooltipReferenceLayer", p.call(e, k), p.call(e, E), this._targetElement.appendChild(k), this._targetElement.appendChild(E), L.className = "introjs-arrow", T.className = "introjs-tooltiptext", T.innerHTML = t.intro, q.className = "introjs-bullets", this._options.showBullets === !1 && (q.style.display = "none");
            for (var H = document.createElement("ul"), N = 0, O = this._introItems.length; O > N; N++) {
                var B = document.createElement("li"), M = document.createElement("a");
                M.onclick = function () {
                    e.goToStep(this.getAttribute("data-stepnumber"))
                }, N === t.step - 1 && (M.className = "active"), M.href = "javascript:void(0);", M.innerHTML = "&nbsp;", M.setAttribute("data-stepnumber", this._introItems[N].step), B.appendChild(M), H.appendChild(B)
            }
            q.appendChild(H), A.className = "introjs-progress", this._options.showProgress === !1 && (A.style.display = "none");
            var R = document.createElement("div");
            if (R.className = "introjs-progressbar", R.setAttribute("style", "width:" + v.call(this) + "%;"), A.appendChild(R), P.className = "introjs-tooltipbuttons", this._options.showButtons === !1 && (P.style.display = "none"), I.className = "introjs-tooltip", I.appendChild(T), I.appendChild(q), I.appendChild(A), 1 == this._options.showStepNumbers) {
                var z = document.createElement("span");
                z.className = "introjs-helperNumberLayer", z.innerHTML = t.step, E.appendChild(z)
            }
            I.appendChild(L), E.appendChild(I);
            var C = document.createElement("a");
            C.onclick = function () {
                e._introItems.length - 1 != e._currentStep && r.call(e)
            }, C.href = "javascript:void(0);", C.innerHTML = this._options.nextLabel;
            var w = document.createElement("a");
            w.onclick = function () {
                0 != e._currentStep && s.call(e)
            }, w.href = "javascript:void(0);", w.innerHTML = this._options.prevLabel;
            var _ = document.createElement("a");
            _.className = "introjs-button introjs-skipbutton", _.href = "javascript:void(0);", _.innerHTML = this._options.skipLabel, _.onclick = function () {
                e._introItems.length - 1 == e._currentStep && "function" == typeof e._introCompleteCallback && e._introCompleteCallback.call(e), e._introItems.length - 1 != e._currentStep && "function" == typeof e._introExitCallback && e._introExitCallback.call(e), l.call(e, e._targetElement)
            }, P.appendChild(_), this._introItems.length > 1 && (P.appendChild(w), P.appendChild(C)), I.appendChild(P), a.call(e, t.element, I, L, z)
        }
        this._options.disableInteraction === !0 && u.call(e), w.removeAttribute("tabIndex"), C.removeAttribute("tabIndex"), 0 == this._currentStep && this._introItems.length > 1 ? (w.className = "introjs-button introjs-prevbutton introjs-disabled", w.tabIndex = "-1", C.className = "introjs-button introjs-nextbutton", _.innerHTML = this._options.skipLabel) : this._introItems.length - 1 == this._currentStep || 1 == this._introItems.length ? (_.innerHTML = this._options.doneLabel, w.className = "introjs-button introjs-prevbutton", C.className = "introjs-button introjs-nextbutton introjs-disabled", C.tabIndex = "-1") : (w.className = "introjs-button introjs-prevbutton", C.className = "introjs-button introjs-nextbutton", _.innerHTML = this._options.skipLabel), C.focus(), t.element.className += " introjs-showElement";
        var D = f(t.element, "position");
        "absolute" !== D && "relative" !== D && (t.element.className += " introjs-relativePosition");
        for (var K = t.element.parentNode; null != K && "body" !== K.tagName.toLowerCase();) {
            var V = f(K, "z-index"), W = parseFloat(f(K, "opacity")),
                $ = f(K, "transform") || f(K, "-webkit-transform") || f(K, "-moz-transform") || f(K, "-ms-transform") || f(K, "-o-transform");
            (/[0-9]+/.test(V) || 1 > W || "none" !== $) && (K.className += " introjs-fixParent"), K = K.parentNode
        }
        if (!g(t.element) && this._options.scrollToElement === !0) {
            var F = t.element.getBoundingClientRect(), Z = m().height, J = F.bottom - (F.bottom - F.top),
                G = F.bottom - Z;
            0 > J || t.element.clientHeight > Z ? window.scrollBy(0, J - 30) : window.scrollBy(0, G + 100)
        }
        "undefined" != typeof this._introAfterChangeCallback && this._introAfterChangeCallback.call(this, t.element)
    }

    function f(t, e) {
        var n = "";
        return t.currentStyle ? n = t.currentStyle[e] : document.defaultView && document.defaultView.getComputedStyle && (n = document.defaultView.getComputedStyle(t, null).getPropertyValue(e)), n && n.toLowerCase ? n.toLowerCase() : n
    }

    function m() {
        if (void 0 != window.innerWidth) return {width: window.innerWidth, height: window.innerHeight};
        var t = document.documentElement;
        return {width: t.clientWidth, height: t.clientHeight}
    }

    function g(t) {
        var e = t.getBoundingClientRect();
        return e.top >= 0 && e.left >= 0 && e.bottom + 80 <= window.innerHeight && e.right <= window.innerWidth
    }

    function y(t) {
        var e = document.createElement("div"), n = "", o = this;
        if (e.className = "introjs-overlay", "body" === t.tagName.toLowerCase()) n += "top: 0;bottom: 0; left: 0;right: 0;position: fixed;", e.setAttribute("style", n); else {
            var i = b(t);
            i && (n += "width: " + i.width + "px; height:" + i.height + "px; top:" + i.top + "px;left: " + i.left + "px;", e.setAttribute("style", n))
        }
        return t.appendChild(e), e.onclick = function () {
            1 == o._options.exitOnOverlayClick && (l.call(o, t), void 0 != o._introExitCallback && o._introExitCallback.call(o))
        }, setTimeout(function () {
            n += "opacity: " + o._options.overlayOpacity.toString() + ";", e.setAttribute("style", n)
        }, 10), !0
    }

    function b(t) {
        var e = {};
        e.width = t.offsetWidth, e.height = t.offsetHeight;
        for (var n = 0, o = 0; t && !isNaN(t.offsetLeft) && !isNaN(t.offsetTop);) n += t.offsetLeft, o += t.offsetTop, t = t.offsetParent;
        return e.top = o, e.left = n, e
    }

    function v() {
        var t = parseInt(this._currentStep + 1, 10);
        return t / this._introItems.length * 100
    }

    function _(t, e) {
        var n = {};
        for (var o in t) n[o] = t[o];
        for (var o in e) n[o] = e[o];
        return n
    }

    var w = "1.0.0", C = function (t) {
        if ("object" == typeof t) return new e(t);
        if ("string" == typeof t) {
            var n = document.querySelector(t);
            if (n) return new e(n);
            throw new Error("There is no element with given selector.")
        }
        return new e(document.body)
    };
    return C.version = w, C.fn = e.prototype = {
        clone: function () {
            return new e(this)
        }, setOption: function (t, e) {
            return this._options[t] = e, this
        }, setOptions: function (t) {
            return this._options = _(this._options, t), this
        }, start: function () {
            return n.call(this, this._targetElement), this
        }, goToStep: function (t) {
            return i.call(this, t), this
        }, nextStep: function () {
            return r.call(this), this
        }, previousStep: function () {
            return s.call(this), this
        }, exit: function () {
            return l.call(this, this._targetElement), this
        }, refresh: function () {
            return p.call(this, document.querySelector(".introjs-helperLayer")), p.call(this, document.querySelector(".introjs-tooltipReferenceLayer")), this
        }, onbeforechange: function (t) {
            if ("function" != typeof t) throw new Error("Provided callback for onbeforechange was not a function");
            return this._introBeforeChangeCallback = t, this
        }, onchange: function (t) {
            if ("function" != typeof t) throw new Error("Provided callback for onchange was not a function.");
            return this._introChangeCallback = t, this
        }, onafterchange: function (t) {
            if ("function" != typeof t) throw new Error("Provided callback for onafterchange was not a function");
            return this._introAfterChangeCallback = t, this
        }, oncomplete: function (t) {
            if ("function" != typeof t) throw new Error("Provided callback for oncomplete was not a function.");
            return this._introCompleteCallback = t, this
        }, onexit: function (t) {
            if ("function" != typeof t) throw new Error("Provided callback for onexit was not a function.");
            return this._introExitCallback = t, this
        }
    }, t.introJs = C, C
});


/*
 * SmartWizard 3.3.1 plugin
 * jQuery Wizard control Plugin
 * by Dipu
 *
 * Refactored and extended:
 * https://github.com/mstratman/jQuery-Smart-Wizard
 *
 * Original URLs:
 * http://www.techlaboratory.net
 * http://tech-laboratory.blogspot.com
 */

function SmartWizard(t, e) {
    this.target = t, this.options = e, this.curStepIdx = e.selected, this.steps = $(t).children("ul").children("li").children("a"), this.contentWidth = 0, this.msgBox = $('<div class="msgBox"><div class="content"></div><a href="#" class="close">X</a></div>'), this.elmStepContainer = $("<div></div>").addClass("stepContainer"), this.loader = $("<div>Loading</div>").addClass("loader"), this.buttons = {
        next: $("<a>" + e.labelNext + "</a>").attr("href", "#").addClass("buttonNext"),
        previous: $("<a>" + e.labelPrevious + "</a>").attr("href", "#").addClass("buttonPrevious"),
        finish: $("<a>" + e.labelFinish + "</a>").attr("href", "#").addClass("buttonFinish")
    };
    var s = function (e) {
        var s = $("<div></div>").addClass("actionBar");
        s.append(e.msgBox), $(".close", e.msgBox).click(function () {
            return e.msgBox.fadeOut("normal"), !1
        });
        var n = e.target.children("div");
        if (0 == e.target.children("ul").length) {
            var a = $("<ul/>");
            t.prepend(a), n.each(function (t, e) {
                var s = $(e).first().children(".StepTitle").text(), i = $(e).attr("id");
                void 0 == i && (i = "step-" + (t + 1), $(e).attr("id", i));
                var n = $("<span/>").addClass("stepDesc").text(s),
                    r = $("<li></li>").append($("<a></a>").attr("href", "#" + i).append($("<label></label>").addClass("stepNumber").text(t + 1)).append(n));
                a.append(r)
            }), e.steps = $(t).children("ul").children("li").children("a")
        }
        e.target.children("ul").addClass("anchor"), n.addClass("content"), e.options.errorSteps && e.options.errorSteps.length > 0 && $.each(e.options.errorSteps, function (t, s) {
            e.setError({stepnum: s, iserror: !0})
        }), e.elmStepContainer.append(n), s.append(e.loader), e.target.append(e.elmStepContainer), e.options.includeFinishButton && s.append(e.buttons.finish), s.append(e.buttons.next).append(e.buttons.previous), e.target.append(s), this.contentWidth = e.elmStepContainer.width(), $(e.buttons.next).click(function () {
            return e.goForward(), !1
        }), $(e.buttons.previous).click(function () {
            return e.goBackward(), !1
        }), $(e.buttons.finish).click(function () {
            if (!$(this).hasClass("buttonDisabled")) if ($.isFunction(e.options.onFinish)) {
                var t = {fromStep: e.curStepIdx + 1};
                if (!e.options.onFinish.call(this, $(e.steps), t)) return !1
            } else {
                var s = e.target.parents("form");
                s && s.length && s.submit()
            }
            return !1
        }), $(e.steps).bind("click", function () {
            if (e.steps.index(this) == e.curStepIdx) return !1;
            var t = e.steps.index(this), s = e.steps.eq(t).attr("isDone") - 0;
            return 1 == s && r(e, t), !1
        }), e.options.keyNavigation && $(document).keyup(function (t) {
            39 == t.which ? e.goForward() : 37 == t.which && e.goBackward()
        }), i(e), r(e, e.curStepIdx)
    }, i = function (t) {
        t.options.enableAllSteps ? ($(t.steps, t.target).removeClass("selected").removeClass("disabled").addClass("done"), $(t.steps, t.target).attr("isDone", 1)) : ($(t.steps, t.target).removeClass("selected").removeClass("done").addClass("disabled"), $(t.steps, t.target).attr("isDone", 0)), $(t.steps, t.target).each(function (e) {
            $($(this).attr("href").replace(/^.+#/, "#"), t.target).hide(), $(this).attr("rel", e + 1)
        })
    }, n = function (t, e) {
        return $($(e, t.target).attr("href").replace(/^.+#/, "#"), t.target)
    }, r = function (t, e) {
        var s = t.steps.eq(e), i = t.options.contentURL, r = t.options.contentURLData, o = s.data("hasContent"),
            d = e + 1;
        if (i && i.length > 0) if (t.options.contentCache && o) a(t, e); else {
            var l = {
                url: i,
                type: t.options.ajaxType,
                data: {step_number: d},
                dataType: "text",
                beforeSend: function () {
                    t.loader.show()
                },
                error: function () {
                    t.loader.hide()
                },
                success: function (i) {
                    t.loader.hide(), i && i.length > 0 && (s.data("hasContent", !0), n(t, s).html(i), a(t, e))
                }
            };
            r && (l = $.extend(l, r(d))), $.ajax(l)
        } else a(t, e)
    }, a = function (t, e) {
        var s = t.steps.eq(e), i = t.steps.eq(t.curStepIdx);
        if (e != t.curStepIdx && $.isFunction(t.options.onLeaveStep)) {
            var r = {fromStep: t.curStepIdx + 1, toStep: e + 1};
            if (!t.options.onLeaveStep.call(t, $(i), r)) return !1
        }
        t.elmStepContainer.height(n(t, s).outerHeight());
        var a = t.curStepIdx;
        if (t.curStepIdx = e, "slide" == t.options.transitionEffect) n(t, i).slideUp("fast", function () {
            n(t, s).slideDown("fast"), o(t, i, s)
        }); else if ("fade" == t.options.transitionEffect) n(t, i).fadeOut("fast", function () {
            n(t, s).fadeIn("fast"), o(t, i, s)
        }); else if ("slideleft" == t.options.transitionEffect) {
            var d = null, l = 0;
            e > a ? (d = t.elmStepContainer.width() + 10, nextElmLeft2 = 0, l = 0 - n(t, i).outerWidth()) : (d = 0 - n(t, s).outerWidth() + 20, nextElmLeft2 = 0, l = 10 + n(t, i).outerWidth()), e == a ? (d = $($(s, t.target).attr("href"), t.target).outerWidth() + 20, nextElmLeft2 = 0, l = 0 - $($(i, t.target).attr("href"), t.target).outerWidth()) : $($(i, t.target).attr("href"), t.target).animate({left: l}, "fast", function () {
                $($(i, t.target).attr("href"), t.target).hide()
            }), n(t, s).css("left", d).show().animate({left: nextElmLeft2}, "fast", function () {
                o(t, i, s)
            })
        } else n(t, i).hide(), n(t, s).show(), o(t, i, s);
        return !0
    }, o = function (t, e, s) {
        if ($(e, t.target).removeClass("selected"), $(e, t.target).addClass("done"), $(s, t.target).removeClass("disabled"), $(s, t.target).removeClass("done"), $(s, t.target).addClass("selected"), $(s, t.target).attr("isDone", 1), d(t), $.isFunction(t.options.onShowStep)) {
            var i = {fromStep: parseInt($(e).attr("rel")), toStep: parseInt($(s).attr("rel"))};
            if (!t.options.onShowStep.call(this, $(s), i)) return !1
        }
        if (t.options.noForwardJumping) for (var n = t.curStepIdx + 2; n <= t.steps.length; n++) t.disableStep(n)
    }, d = function (t) {
        t.options.cycleSteps || (0 >= t.curStepIdx ? ($(t.buttons.previous).addClass("buttonDisabled"), t.options.hideButtonsOnDisabled && $(t.buttons.previous).hide()) : ($(t.buttons.previous).removeClass("buttonDisabled"), t.options.hideButtonsOnDisabled && $(t.buttons.previous).show()), t.steps.length - 1 <= t.curStepIdx ? ($(t.buttons.next).addClass("buttonDisabled"), t.options.hideButtonsOnDisabled && $(t.buttons.next).hide()) : ($(t.buttons.next).removeClass("buttonDisabled"), t.options.hideButtonsOnDisabled && $(t.buttons.next).show())), t.options.includeFinishButton && (!t.steps.hasClass("disabled") || t.options.enableFinishButton ? ($(t.buttons.finish).removeClass("buttonDisabled"), t.options.hideButtonsOnDisabled && $(t.buttons.finish).show()) : ($(t.buttons.finish).addClass("buttonDisabled"), t.options.hideButtonsOnDisabled && $(t.buttons.finish).hide()))
    };
    SmartWizard.prototype.goForward = function () {
        var t = this.curStepIdx + 1;
        if (this.steps.length <= t) {
            if (!this.options.cycleSteps) return !1;
            t = 0
        }
        r(this, t)
    }, SmartWizard.prototype.goBackward = function () {
        var t = this.curStepIdx - 1;
        if (0 > t) {
            if (!this.options.cycleSteps) return !1;
            t = this.steps.length - 1
        }
        r(this, t)
    }, SmartWizard.prototype.goToStep = function (t) {
        var e = t - 1;
        e >= 0 && e < this.steps.length && r(this, e)
    }, SmartWizard.prototype.enableStep = function (t) {
        var e = t - 1;
        if (e == this.curStepIdx || 0 > e || e >= this.steps.length) return !1;
        var s = this.steps.eq(e);
        $(s, this.target).attr("isDone", 1), $(s, this.target).removeClass("disabled").removeClass("selected").addClass("done")
    }, SmartWizard.prototype.disableStep = function (t) {
        var e = t - 1;
        if (e == this.curStepIdx || 0 > e || e >= this.steps.length) return !1;
        var s = this.steps.eq(e);
        $(s, this.target).attr("isDone", 0), $(s, this.target).removeClass("done").removeClass("selected").addClass("disabled")
    }, SmartWizard.prototype.currentStep = function () {
        return this.curStepIdx + 1
    }, SmartWizard.prototype.showMessage = function (t) {
        $(".content", this.msgBox).html(t), this.msgBox.show()
    }, SmartWizard.prototype.hideMessage = function () {
        this.msgBox.fadeOut("normal")
    }, SmartWizard.prototype.showError = function (t) {
        this.setError(t, !0)
    }, SmartWizard.prototype.hideError = function (t) {
        this.setError(t, !1)
    }, SmartWizard.prototype.setError = function (t, e) {
        "object" == typeof t && (e = t.iserror, t = t.stepnum), e ? $(this.steps.eq(t - 1), this.target).addClass("error") : $(this.steps.eq(t - 1), this.target).removeClass("error")
    }, SmartWizard.prototype.fixHeight = function () {
        var t = 0, e = this.steps.eq(this.curStepIdx), s = n(this, e);
        s.children().each(function () {
            $(this).is(":visible") && (t += $(this).outerHeight())
        }), s.height(t + 5), this.elmStepContainer.height(t + 20)
    }, s(this)
}

!function (t) {
    t.fn.smartWizard = function (e) {
        var s = arguments, i = void 0, n = this.each(function () {
            var n = t(this).data("smartWizard");
            if ("object" != typeof e && e && n) {
                if ("function" == typeof SmartWizard.prototype[e]) return i = SmartWizard.prototype[e].apply(n, Array.prototype.slice.call(s, 1));
                t.error("Method " + e + " does not exist on jQuery.smartWizard")
            } else {
                var r = t.extend({}, t.fn.smartWizard.defaults, e || {});
                n || (n = new SmartWizard(t(this), r), t(this).data("smartWizard", n))
            }
        });
        return void 0 === i ? n : i
    }, t.fn.smartWizard.defaults = {
        selected: 0,
        keyNavigation: !0,
        enableAllSteps: !1,
        transitionEffect: "fade",
        contentURL: null,
        contentCache: !0,
        cycleSteps: !1,
        enableFinishButton: !1,
        hideButtonsOnDisabled: !1,
        errorSteps: [],
        labelNext: "Next",
        labelPrevious: "Previous",
        labelFinish: "Finish",
        noForwardJumping: !1,
        ajaxType: "POST",
        onLeaveStep: null,
        onShowStep: null,
        onFinish: null,
        includeFinishButton: !0
    }
}(jQuery);

// Ion.RangeSlider | version 2.0.2 | https://github.com/IonDen/ion.rangeSlider
(function (e, s, g, q, u) {
    var t = 0, p = function () {
        var a = q.userAgent, b = /msie\s\d+/i;
        return 0 < a.search(b) && (a = b.exec(a).toString(), a = a.split(" ")[1], 9 > a) ? (e("html").addClass("lt-ie9"), !0) : !1
    }(), l = "ontouchstart" in g || 0 < q.msMaxTouchPoints;
    Function.prototype.bind || (Function.prototype.bind = function (a) {
        var b = this, c = [].slice;
        if ("function" != typeof b) throw new TypeError;
        var d = c.call(arguments, 1), h = function () {
            if (this instanceof h) {
                var f = function () {
                };
                f.prototype = b.prototype;
                var f = new f, k = b.apply(f, d.concat(c.call(arguments)));
                return Object(k) === k ? k : f
            }
            return b.apply(a, d.concat(c.call(arguments)))
        };
        return h
    });
    var r = function (a, b, c) {
        this.VERSION = "2.0.2";
        this.input = a;
        this.plugin_count = c;
        this.old_to = this.old_from = this.calc_count = this.current_plugin = 0;
        this.raf_id = null;
        this.is_update = this.is_key = this.force_redraw = this.dragging = !1;
        this.is_start = !0;
        this.is_click = this.is_resize = this.is_active = !1;
        this.$cache = {
            win: e(g),
            body: e(s.body),
            input: e(a),
            cont: null,
            rs: null,
            min: null,
            max: null,
            from: null,
            to: null,
            single: null,
            bar: null,
            line: null,
            s_single: null,
            s_from: null,
            s_to: null,
            shad_single: null,
            shad_from: null,
            shad_to: null,
            grid: null,
            grid_labels: []
        };
        a = this.$cache.input;
        a = {
            type: a.data("type"),
            min: a.data("min"),
            max: a.data("max"),
            from: a.data("from"),
            to: a.data("to"),
            step: a.data("step"),
            min_interval: a.data("minInterval"),
            max_interval: a.data("maxInterval"),
            drag_interval: a.data("dragInterval"),
            values: a.data("values"),
            from_fixed: a.data("fromFixed"),
            from_min: a.data("fromMin"),
            from_max: a.data("fromMax"),
            from_shadow: a.data("fromShadow"),
            to_fixed: a.data("toFixed"),
            to_min: a.data("toMin"),
            to_max: a.data("toMax"),
            to_shadow: a.data("toShadow"),
            prettify_enabled: a.data("prettifyEnabled"),
            prettify_separator: a.data("prettifySeparator"),
            force_edges: a.data("forceEdges"),
            keyboard: a.data("keyboard"),
            keyboard_step: a.data("keyboardStep"),
            grid: a.data("grid"),
            grid_margin: a.data("gridMargin"),
            grid_num: a.data("gridNum"),
            grid_snap: a.data("gridSnap"),
            hide_min_max: a.data("hideMinMax"),
            hide_from_to: a.data("hideFromTo"),
            prefix: a.data("prefix"),
            postfix: a.data("postfix"),
            max_postfix: a.data("maxPostfix"),
            decorate_both: a.data("decorateBoth"),
            values_separator: a.data("valuesSeparator"),
            disable: a.data("disable")
        };
        a.values = a.values && a.values.split(",");
        b = e.extend(a, b);
        this.options = e.extend({
            type: "single",
            min: 10,
            max: 100,
            from: null,
            to: null,
            step: 1,
            min_interval: 0,
            max_interval: 0,
            drag_interval: !1,
            values: [],
            p_values: [],
            from_fixed: !1,
            from_min: null,
            from_max: null,
            from_shadow: !1,
            to_fixed: !1,
            to_min: null,
            to_max: null,
            to_shadow: !1,
            prettify_enabled: !0,
            prettify_separator: " ",
            prettify: null,
            force_edges: !1,
            keyboard: !1,
            keyboard_step: 5,
            grid: !1,
            grid_margin: !0,
            grid_num: 4,
            grid_snap: !1,
            hide_min_max: !1,
            hide_from_to: !1,
            prefix: "",
            postfix: "",
            max_postfix: "",
            decorate_both: !0,
            values_separator: " \u2014 ",
            disable: !1,
            onStart: null,
            onChange: null,
            onFinish: null,
            onUpdate: null
        }, b);
        this.validate();
        this.result = {
            input: this.$cache.input,
            slider: null,
            min: this.options.min,
            max: this.options.max,
            from: this.options.from,
            from_percent: 0,
            from_value: null,
            to: this.options.to,
            to_percent: 0,
            to_value: null
        };
        this.coords = {
            x_gap: 0,
            x_pointer: 0,
            w_rs: 0,
            w_rs_old: 0,
            w_handle: 0,
            p_gap: 0,
            p_gap_left: 0,
            p_gap_right: 0,
            p_step: 0,
            p_pointer: 0,
            p_handle: 0,
            p_single: 0,
            p_single_real: 0,
            p_from: 0,
            p_from_real: 0,
            p_to: 0,
            p_to_real: 0,
            p_bar_x: 0,
            p_bar_w: 0,
            grid_gap: 0,
            big_num: 0,
            big: [],
            big_w: [],
            big_p: [],
            big_x: []
        };
        this.labels = {
            w_min: 0,
            w_max: 0,
            w_from: 0,
            w_to: 0,
            w_single: 0,
            p_min: 0,
            p_max: 0,
            p_from: 0,
            p_from_left: 0,
            p_to: 0,
            p_to_left: 0,
            p_single: 0,
            p_single_left: 0
        };
        this.init()
    };
    r.prototype = {
        init: function (a) {
            this.coords.p_step = this.options.step / ((this.options.max - this.options.min) / 100);
            this.target = "base";
            this.toggleInput();
            this.append();
            this.setMinMax();
            if (a) {
                if (this.force_redraw = !0, this.calc(!0), this.options.onUpdate && "function" === typeof this.options.onUpdate) this.options.onUpdate(this.result)
            } else if (this.force_redraw = !0, this.calc(!0), this.options.onStart && "function" === typeof this.options.onStart) this.options.onStart(this.result);
            this.updateScene();
            this.raf_id = requestAnimationFrame(this.updateScene.bind(this))
        }, append: function () {
            this.$cache.input.before('<span class="irs js-irs-' + this.plugin_count + '"></span>');
            this.$cache.input.prop("readonly",
                !0);
            this.$cache.cont = this.$cache.input.prev();
            this.result.slider = this.$cache.cont;
            this.$cache.cont.html('<span class="irs"><span class="irs-line" tabindex="-1"><span class="irs-line-left"></span><span class="irs-line-mid"></span><span class="irs-line-right"></span></span><span class="irs-min">0</span><span class="irs-max">1</span><span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span></span><span class="irs-grid"></span><span class="irs-bar"></span>');
            this.$cache.rs =
                this.$cache.cont.find(".irs");
            this.$cache.min = this.$cache.cont.find(".irs-min");
            this.$cache.max = this.$cache.cont.find(".irs-max");
            this.$cache.from = this.$cache.cont.find(".irs-from");
            this.$cache.to = this.$cache.cont.find(".irs-to");
            this.$cache.single = this.$cache.cont.find(".irs-single");
            this.$cache.bar = this.$cache.cont.find(".irs-bar");
            this.$cache.line = this.$cache.cont.find(".irs-line");
            this.$cache.grid = this.$cache.cont.find(".irs-grid");
            "single" === this.options.type ? (this.$cache.cont.append('<span class="irs-bar-edge"></span><span class="irs-shadow shadow-single"></span><span class="irs-slider single"></span>'),
                this.$cache.s_single = this.$cache.cont.find(".single"), this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.shad_single = this.$cache.cont.find(".shadow-single")) : (this.$cache.cont.append('<span class="irs-shadow shadow-from"></span><span class="irs-shadow shadow-to"></span><span class="irs-slider from"></span><span class="irs-slider to"></span>'), this.$cache.s_from = this.$cache.cont.find(".from"), this.$cache.s_to = this.$cache.cont.find(".to"), this.$cache.shad_from =
                this.$cache.cont.find(".shadow-from"), this.$cache.shad_to = this.$cache.cont.find(".shadow-to"));
            this.options.hide_from_to && (this.$cache.from[0].style.display = "none", this.$cache.to[0].style.display = "none", this.$cache.single[0].style.display = "none");
            this.appendGrid();
            this.options.disable ? this.appendDisableMask() : (this.$cache.cont.removeClass("irs-disabled"), this.bindEvents())
        }, appendDisableMask: function () {
            this.$cache.cont.append('<span class="irs-disable-mask"></span>');
            this.$cache.cont.addClass("irs-disabled")
        },
        remove: function () {
            this.$cache.cont.remove();
            this.$cache.cont = null;
            this.$cache.line.off("keydown.irs_" + this.plugin_count);
            l ? (this.$cache.body.off("touchmove.irs_" + this.plugin_count), this.$cache.win.off("touchend.irs_" + this.plugin_count)) : (this.$cache.body.off("mousemove.irs_" + this.plugin_count), this.$cache.win.off("mouseup.irs_" + this.plugin_count), p && (this.$cache.body.off("mouseup.irs_" + this.plugin_count), this.$cache.body.off("mouseleave.irs_" + this.plugin_count)));
            this.$cache.grid_labels = [];
            this.coords.big =
                [];
            this.coords.big_w = [];
            this.coords.big_p = [];
            this.coords.big_x = [];
            cancelAnimationFrame(this.raf_id)
        }, bindEvents: function () {
            if (l) {
                this.$cache.body.on("touchmove.irs_" + this.plugin_count, this.pointerMove.bind(this));
                this.$cache.win.on("touchend.irs_" + this.plugin_count, this.pointerUp.bind(this));
                this.$cache.line.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                if (this.options.drag_interval && "double" === this.options.type) this.$cache.bar.on("touchstart.irs_" + this.plugin_count,
                    this.pointerDown.bind(this, "both")); else this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                "single" === this.options.type ? (this.$cache.s_single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.shad_single.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))) : (this.$cache.s_from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.s_to.on("touchstart.irs_" + this.plugin_count,
                    this.pointerDown.bind(this, "to")), this.$cache.shad_from.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.shad_to.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")))
            } else {
                if (this.options.keyboard) this.$cache.line.on("keydown.irs_" + this.plugin_count, this.key.bind(this, "keyboard"));
                this.$cache.body.on("mousemove.irs_" + this.plugin_count, this.pointerMove.bind(this));
                this.$cache.win.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this));
                p && (this.$cache.body.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this)), this.$cache.body.on("mouseleave.irs_" + this.plugin_count, this.pointerUp.bind(this)));
                this.$cache.line.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                if (this.options.drag_interval && "double" === this.options.type) this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "both")); else this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                "single" === this.options.type ? (this.$cache.s_single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.shad_single.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))) : (this.$cache.s_from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.s_to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.shad_from.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")),
                    this.$cache.shad_to.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")))
            }
        }, pointerMove: function (a) {
            this.dragging && (this.coords.x_pointer = (l ? a.originalEvent.touches[0] : a).pageX - this.coords.x_gap, this.calc())
        }, pointerUp: function (a) {
            if (this.current_plugin === this.plugin_count && this.is_active) {
                this.is_active = !1;
                var b = this.options.onFinish && "function" === typeof this.options.onFinish;
                a = e.contains(this.$cache.cont[0], a.target) || this.dragging;
                if (b && a) this.options.onFinish(this.result);
                this.force_redraw = !0;
                this.dragging = !1;
                p && e("*").prop("unselectable", !1)
            }
        }, pointerDown: function (a, b) {
            b.preventDefault();
            var c = l ? b.originalEvent.touches[0] : b;
            if (2 !== b.button) {
                this.current_plugin = this.plugin_count;
                this.target = a;
                this.dragging = this.is_active = !0;
                this.coords.x_gap = this.$cache.rs.offset().left;
                this.coords.x_pointer = c.pageX - this.coords.x_gap;
                this.calcPointer();
                switch (a) {
                    case "single":
                        this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_single);
                        break;
                    case "from":
                        this.coords.p_gap =
                            this.toFixed(this.coords.p_pointer - this.coords.p_from);
                        this.$cache.s_from.addClass("type_last");
                        this.$cache.s_to.removeClass("type_last");
                        break;
                    case "to":
                        this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_to);
                        this.$cache.s_to.addClass("type_last");
                        this.$cache.s_from.removeClass("type_last");
                        break;
                    case "both":
                        this.coords.p_gap_left = this.toFixed(this.coords.p_pointer - this.coords.p_from), this.coords.p_gap_right = this.toFixed(this.coords.p_to - this.coords.p_pointer), this.$cache.s_to.removeClass("type_last"),
                            this.$cache.s_from.removeClass("type_last")
                }
                p && e("*").prop("unselectable", !0);
                this.$cache.line.trigger("focus")
            }
        }, pointerClick: function (a, b) {
            b.preventDefault();
            var c = l ? b.originalEvent.touches[0] : b;
            2 !== b.button && (this.current_plugin = this.plugin_count, this.target = a, this.is_click = !0, this.coords.x_gap = this.$cache.rs.offset().left, this.coords.x_pointer = +(c.pageX - this.coords.x_gap).toFixed(), this.force_redraw = !0, this.calc(), this.$cache.line.trigger("focus"))
        }, key: function (a, b) {
            if (!(this.current_plugin !==
                this.plugin_count || b.altKey || b.ctrlKey || b.shiftKey || b.metaKey)) {
                switch (b.which) {
                    case 83:
                    case 65:
                    case 40:
                    case 37:
                        b.preventDefault();
                        this.moveByKey(!1);
                        break;
                    case 87:
                    case 68:
                    case 38:
                    case 39:
                        b.preventDefault(), this.moveByKey(!0)
                }
                return !0
            }
        }, moveByKey: function (a) {
            var b = this.coords.p_pointer, b = a ? b + this.options.keyboard_step : b - this.options.keyboard_step;
            this.coords.x_pointer = this.toFixed(this.coords.w_rs / 100 * b);
            this.is_key = !0;
            this.calc()
        }, setMinMax: function () {
            this.options.hide_min_max ? (this.$cache.min[0].style.display =
                "none", this.$cache.max[0].style.display = "none") : (this.options.values.length ? (this.$cache.min.html(this.decorate(this.options.p_values[this.options.min])), this.$cache.max.html(this.decorate(this.options.p_values[this.options.max]))) : (this.$cache.min.html(this.decorate(this._prettify(this.options.min), this.options.min)), this.$cache.max.html(this.decorate(this._prettify(this.options.max), this.options.max))), this.labels.w_min = this.$cache.min.outerWidth(!1), this.labels.w_max = this.$cache.max.outerWidth(!1))
        },
        calc: function (a) {
            this.calc_count++;
            if (10 === this.calc_count || a) this.calc_count = 0, this.coords.w_rs = this.$cache.rs.outerWidth(!1), this.coords.w_handle = "single" === this.options.type ? this.$cache.s_single.outerWidth(!1) : this.$cache.s_from.outerWidth(!1);
            if (this.coords.w_rs) {
                this.calcPointer();
                this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100);
                a = 100 - this.coords.p_handle;
                var b = this.toFixed(this.coords.p_pointer - this.coords.p_gap);
                "click" === this.target && (b = this.toFixed(this.coords.p_pointer -
                    this.coords.p_handle / 2), this.target = this.chooseHandle(b));
                0 > b ? b = 0 : b > a && (b = a);
                switch (this.target) {
                    case "base":
                        b = (this.options.max - this.options.min) / 100;
                        a = (this.result.from - this.options.min) / b;
                        b = (this.result.to - this.options.min) / b;
                        this.coords.p_single_real = this.toFixed(a);
                        this.coords.p_from_real = this.toFixed(a);
                        this.coords.p_to_real = this.toFixed(b);
                        this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max);
                        this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real,
                            this.options.from_min, this.options.from_max);
                        this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                        this.coords.p_single = this.toFixed(a - this.coords.p_handle / 100 * a);
                        this.coords.p_from = this.toFixed(a - this.coords.p_handle / 100 * a);
                        this.coords.p_to = this.toFixed(b - this.coords.p_handle / 100 * b);
                        this.target = null;
                        break;
                    case "single":
                        if (this.options.from_fixed) break;
                        this.coords.p_single_real = this.calcWithStep(b / a * 100);
                        this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real,
                            this.options.from_min, this.options.from_max);
                        this.coords.p_single = this.toFixed(this.coords.p_single_real / 100 * a);
                        break;
                    case "from":
                        if (this.options.from_fixed) break;
                        this.coords.p_from_real = this.calcWithStep(b / a * 100);
                        this.coords.p_from_real > this.coords.p_to_real && (this.coords.p_from_real = this.coords.p_to_real);
                        this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                        this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real,
                            "from");
                        this.coords.p_from_real = this.checkMaxInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
                        this.coords.p_from = this.toFixed(this.coords.p_from_real / 100 * a);
                        break;
                    case "to":
                        if (this.options.to_fixed) break;
                        this.coords.p_to_real = this.calcWithStep(b / a * 100);
                        this.coords.p_to_real < this.coords.p_from_real && (this.coords.p_to_real = this.coords.p_from_real);
                        this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                        this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real,
                            this.coords.p_from_real, "to");
                        this.coords.p_to_real = this.checkMaxInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
                        this.coords.p_to = this.toFixed(this.coords.p_to_real / 100 * a);
                        break;
                    case "both":
                        b = this.toFixed(b + .1 * this.coords.p_handle), this.coords.p_from_real = this.calcWithStep((b - this.coords.p_gap_left) / a * 100), this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max), this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real,
                            this.coords.p_to_real, "from"), this.coords.p_from = this.toFixed(this.coords.p_from_real / 100 * a), this.coords.p_to_real = this.calcWithStep((b + this.coords.p_gap_right) / a * 100), this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max), this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to"), this.coords.p_to = this.toFixed(this.coords.p_to_real / 100 * a)
                }
                "single" === this.options.type ? (this.coords.p_bar_x = this.coords.p_handle / 2, this.coords.p_bar_w =
                    this.coords.p_single, this.result.from_percent = this.coords.p_single_real, this.result.from = this.calcReal(this.coords.p_single_real), this.options.values.length && (this.result.from_value = this.options.values[this.result.from])) : (this.coords.p_bar_x = this.toFixed(this.coords.p_from + this.coords.p_handle / 2), this.coords.p_bar_w = this.toFixed(this.coords.p_to - this.coords.p_from), this.result.from_percent = this.coords.p_from_real, this.result.from = this.calcReal(this.coords.p_from_real), this.result.to_percent = this.coords.p_to_real,
                    this.result.to = this.calcReal(this.coords.p_to_real), this.options.values.length && (this.result.from_value = this.options.values[this.result.from], this.result.to_value = this.options.values[this.result.to]));
                this.calcMinMax();
                this.calcLabels()
            }
        }, calcPointer: function () {
            this.coords.w_rs ? (0 > this.coords.x_pointer ? this.coords.x_pointer = 0 : this.coords.x_pointer > this.coords.w_rs && (this.coords.x_pointer = this.coords.w_rs), this.coords.p_pointer = this.toFixed(this.coords.x_pointer / this.coords.w_rs * 100)) : this.coords.p_pointer =
                0
        }, chooseHandle: function (a) {
            return "single" === this.options.type ? "single" : a >= this.coords.p_from_real + (this.coords.p_to_real - this.coords.p_from_real) / 2 ? "to" : "from"
        }, calcMinMax: function () {
            this.coords.w_rs && (this.labels.p_min = this.labels.w_min / this.coords.w_rs * 100, this.labels.p_max = this.labels.w_max / this.coords.w_rs * 100)
        }, calcLabels: function () {
            this.coords.w_rs && !this.options.hide_from_to && ("single" === this.options.type ? (this.labels.w_single = this.$cache.single.outerWidth(!1), this.labels.p_single = this.labels.w_single /
                this.coords.w_rs * 100, this.labels.p_single_left = this.coords.p_single + this.coords.p_handle / 2 - this.labels.p_single / 2) : (this.labels.w_from = this.$cache.from.outerWidth(!1), this.labels.p_from = this.labels.w_from / this.coords.w_rs * 100, this.labels.p_from_left = this.coords.p_from + this.coords.p_handle / 2 - this.labels.p_from / 2, this.labels.p_from_left = this.toFixed(this.labels.p_from_left), this.labels.p_from_left = this.checkEdges(this.labels.p_from_left, this.labels.p_from), this.labels.w_to = this.$cache.to.outerWidth(!1),
                this.labels.p_to = this.labels.w_to / this.coords.w_rs * 100, this.labels.p_to_left = this.coords.p_to + this.coords.p_handle / 2 - this.labels.p_to / 2, this.labels.p_to_left = this.toFixed(this.labels.p_to_left), this.labels.p_to_left = this.checkEdges(this.labels.p_to_left, this.labels.p_to), this.labels.w_single = this.$cache.single.outerWidth(!1), this.labels.p_single = this.labels.w_single / this.coords.w_rs * 100, this.labels.p_single_left = (this.labels.p_from_left + this.labels.p_to_left + this.labels.p_to) / 2 - this.labels.p_single /
                2, this.labels.p_single_left = this.toFixed(this.labels.p_single_left)), this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single))
        }, updateScene: function () {
            this.drawHandles();
            this.raf_id = requestAnimationFrame(this.updateScene.bind(this))
        }, drawHandles: function () {
            this.coords.w_rs = this.$cache.rs.outerWidth(!1);
            this.coords.w_rs !== this.coords.w_rs_old && (this.target = "base", this.is_resize = !0);
            if (this.coords.w_rs !== this.coords.w_rs_old || this.force_redraw) this.setMinMax(), this.calc(!0),
                this.drawLabels(), this.options.grid && (this.calcGridMargin(), this.calcGridLabels()), this.force_redraw = !0, this.coords.w_rs_old = this.coords.w_rs, this.drawShadow();
            if (this.coords.w_rs && (this.dragging || this.force_redraw || this.is_key)) {
                if (this.old_from !== this.result.from || this.old_to !== this.result.to || this.force_redraw || this.is_key) {
                    this.drawLabels();
                    this.$cache.bar[0].style.left = this.coords.p_bar_x + "%";
                    this.$cache.bar[0].style.width = this.coords.p_bar_w + "%";
                    if ("single" === this.options.type) this.$cache.s_single[0].style.left =
                        this.coords.p_single + "%", this.$cache.single[0].style.left = this.labels.p_single_left + "%", this.options.values.length ? (this.$cache.input.prop("value", this.result.from_value), this.$cache.input.data("from", this.result.from_value)) : (this.$cache.input.prop("value", this.result.from), this.$cache.input.data("from", this.result.from)); else {
                        this.$cache.s_from[0].style.left = this.coords.p_from + "%";
                        this.$cache.s_to[0].style.left = this.coords.p_to + "%";
                        if (this.old_from !== this.result.from || this.force_redraw) this.$cache.from[0].style.left =
                            this.labels.p_from_left + "%";
                        if (this.old_to !== this.result.to || this.force_redraw) this.$cache.to[0].style.left = this.labels.p_to_left + "%";
                        this.$cache.single[0].style.left = this.labels.p_single_left + "%";
                        this.options.values.length ? (this.$cache.input.prop("value", this.result.from_value + ";" + this.result.to_value), this.$cache.input.data("from", this.result.from_value), this.$cache.input.data("to", this.result.to_value)) : (this.$cache.input.prop("value", this.result.from + ";" + this.result.to), this.$cache.input.data("from",
                            this.result.from), this.$cache.input.data("to", this.result.to))
                    }
                    this.old_from === this.result.from && this.old_to === this.result.to || this.is_start || this.$cache.input.trigger("change");
                    this.old_from = this.result.from;
                    this.old_to = this.result.to;
                    if (this.options.onChange && "function" === typeof this.options.onChange && !this.is_resize && !this.is_update && !this.is_start) this.options.onChange(this.result);
                    if (this.options.onFinish && "function" === typeof this.options.onFinish && (this.is_key || this.is_click)) this.options.onFinish(this.result);
                    this.is_resize = this.is_update = !1
                }
                this.force_redraw = this.is_click = this.is_key = this.is_start = !1
            }
        }, drawLabels: function () {
            var a = this.options.values.length, b = this.options.p_values, c;
            if (!this.options.hide_from_to) if ("single" === this.options.type) a = a ? this.decorate(b[this.result.from]) : this.decorate(this._prettify(this.result.from), this.result.from), this.$cache.single.html(a), this.calcLabels(), this.$cache.min[0].style.visibility = this.labels.p_single_left < this.labels.p_min + 1 ? "hidden" : "visible", this.$cache.max[0].style.visibility =
                this.labels.p_single_left + this.labels.p_single > 100 - this.labels.p_max - 1 ? "hidden" : "visible"; else {
                a ? (this.options.decorate_both ? (a = this.decorate(b[this.result.from]), a += this.options.values_separator, a += this.decorate(b[this.result.to])) : a = this.decorate(b[this.result.from] + this.options.values_separator + b[this.result.to]), c = this.decorate(b[this.result.from]), b = this.decorate(b[this.result.to])) : (this.options.decorate_both ? (a = this.decorate(this._prettify(this.result.from)), a += this.options.values_separator,
                    a += this.decorate(this._prettify(this.result.to))) : a = this.decorate(this._prettify(this.result.from) + this.options.values_separator + this._prettify(this.result.to), this.result.from), c = this.decorate(this._prettify(this.result.from), this.result.from), b = this.decorate(this._prettify(this.result.to), this.result.to));
                this.$cache.single.html(a);
                this.$cache.from.html(c);
                this.$cache.to.html(b);
                this.calcLabels();
                b = Math.min(this.labels.p_single_left, this.labels.p_from_left);
                a = this.labels.p_single_left + this.labels.p_single;
                c = this.labels.p_to_left + this.labels.p_to;
                var d = Math.max(a, c);
                this.labels.p_from_left + this.labels.p_from >= this.labels.p_to_left ? (this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.single[0].style.visibility = "visible", this.result.from === this.result.to ? (this.$cache.from[0].style.visibility = "visible", this.$cache.single[0].style.visibility = "hidden", d = c) : (this.$cache.from[0].style.visibility = "hidden", this.$cache.single[0].style.visibility = "visible", d = Math.max(a,
                    c))) : (this.$cache.from[0].style.visibility = "visible", this.$cache.to[0].style.visibility = "visible", this.$cache.single[0].style.visibility = "hidden");
                this.$cache.min[0].style.visibility = b < this.labels.p_min + 1 ? "hidden" : "visible";
                this.$cache.max[0].style.visibility = d > 100 - this.labels.p_max - 1 ? "hidden" : "visible"
            }
        }, drawShadow: function () {
            var a = this.options, b = this.$cache, c, d;
            "single" === a.type ? a.from_shadow && (a.from_min || a.from_max) ? (c = this.calcPercent(a.from_min || a.min), d = this.calcPercent(a.from_max || a.max) -
                c, c = this.toFixed(c - this.coords.p_handle / 100 * c), d = this.toFixed(d - this.coords.p_handle / 100 * d), c += this.coords.p_handle / 2, b.shad_single[0].style.display = "block", b.shad_single[0].style.left = c + "%", b.shad_single[0].style.width = d + "%") : b.shad_single[0].style.display = "none" : (a.from_shadow && (a.from_min || a.from_max) ? (c = this.calcPercent(a.from_min || a.min), d = this.calcPercent(a.from_max || a.max) - c, c = this.toFixed(c - this.coords.p_handle / 100 * c), d = this.toFixed(d - this.coords.p_handle / 100 * d), c += this.coords.p_handle / 2,
                b.shad_from[0].style.display = "block", b.shad_from[0].style.left = c + "%", b.shad_from[0].style.width = d + "%") : b.shad_from[0].style.display = "none", a.to_shadow && (a.to_min || a.to_max) ? (c = this.calcPercent(a.to_min || a.min), a = this.calcPercent(a.to_max || a.max) - c, c = this.toFixed(c - this.coords.p_handle / 100 * c), a = this.toFixed(a - this.coords.p_handle / 100 * a), c += this.coords.p_handle / 2, b.shad_to[0].style.display = "block", b.shad_to[0].style.left = c + "%", b.shad_to[0].style.width = a + "%") : b.shad_to[0].style.display = "none")
        }, toggleInput: function () {
            this.$cache.input.toggleClass("irs-hidden-input")
        },
        calcPercent: function (a) {
            return this.toFixed((a - this.options.min) / ((this.options.max - this.options.min) / 100))
        }, calcReal: function (a) {
            var b = this.options.min, c = this.options.max, d = 0;
            0 > b && (d = Math.abs(b), b += d, c += d);
            a = (c - b) / 100 * a + b;
            (b = this.options.step.toString().split(".")[1]) ? a = +a.toFixed(b.length) : (a /= this.options.step, a *= this.options.step, a = +a.toFixed(0));
            d && (a -= d);
            a < this.options.min ? a = this.options.min : a > this.options.max && (a = this.options.max);
            return b ? +a.toFixed(b.length) : this.toFixed(a)
        }, calcWithStep: function (a) {
            var b =
                Math.round(a / this.coords.p_step) * this.coords.p_step;
            100 < b && (b = 100);
            100 === a && (b = 100);
            return this.toFixed(b)
        }, checkMinInterval: function (a, b, c) {
            var d = this.options;
            if (!d.min_interval) return a;
            a = this.calcReal(a);
            b = this.calcReal(b);
            "from" === c ? b - a < d.min_interval && (a = b - d.min_interval) : a - b < d.min_interval && (a = b + d.min_interval);
            return this.calcPercent(a)
        }, checkMaxInterval: function (a, b, c) {
            var d = this.options;
            if (!d.max_interval) return a;
            a = this.calcReal(a);
            b = this.calcReal(b);
            "from" === c ? b - a > d.max_interval && (a = b -
                d.max_interval) : a - b > d.max_interval && (a = b + d.max_interval);
            return this.calcPercent(a)
        }, checkDiapason: function (a, b, c) {
            a = this.calcReal(a);
            var d = this.options;
            b && "number" === typeof b || (b = d.min);
            c && "number" === typeof c || (c = d.max);
            a < b && (a = b);
            a > c && (a = c);
            return this.calcPercent(a)
        }, toFixed: function (a) {
            a = a.toFixed(5);
            return +a
        }, _prettify: function (a) {
            return this.options.prettify_enabled ? this.options.prettify && "function" === typeof this.options.prettify ? this.options.prettify(a) : this.prettify(a) : a
        }, prettify: function (a) {
            return a.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g,
                "$1" + this.options.prettify_separator)
        }, checkEdges: function (a, b) {
            if (!this.options.force_edges) return this.toFixed(a);
            0 > a ? a = 0 : a > 100 - b && (a = 100 - b);
            return this.toFixed(a)
        }, validate: function () {
            var a = this.options, b = this.result, c = a.values, d = c.length, h, f;
            "string" === typeof a.min && (a.min = +a.min);
            "string" === typeof a.max && (a.max = +a.max);
            "string" === typeof a.from && (a.from = +a.from);
            "string" === typeof a.to && (a.to = +a.to);
            "string" === typeof a.step && (a.step = +a.step);
            "string" === typeof a.from_min && (a.from_min = +a.from_min);
            "string" === typeof a.from_max && (a.from_max = +a.from_max);
            "string" === typeof a.to_min && (a.to_min = +a.to_min);
            "string" === typeof a.to_max && (a.to_max = +a.to_max);
            "string" === typeof a.keyboard_step && (a.keyboard_step = +a.keyboard_step);
            "string" === typeof a.grid_num && (a.grid_num = +a.grid_num);
            a.max <= a.min && (a.max = a.min ? 2 * a.min : a.min + 1, a.step = 1);
            if (d) for (a.p_values = [], a.min = 0, a.max = d - 1, a.step = 1, a.grid_num = a.max, a.grid_snap = !0, f = 0; f < d; f++) h = +c[f], isNaN(h) ? h = c[f] : (c[f] = h, h = this._prettify(h)), a.p_values.push(h);
            if ("number" !==
                typeof a.from || isNaN(a.from)) a.from = a.min;
            if ("number" !== typeof a.to || isNaN(a.from)) a.to = a.max;
            if (a.from < a.min || a.from > a.max) a.from = a.min;
            if (a.to > a.max || a.to < a.min) a.to = a.max;
            "double" === a.type && a.from > a.to && (a.from = a.to);
            if ("number" !== typeof a.step || isNaN(a.step) || !a.step || 0 > a.step) a.step = 1;
            if ("number" !== typeof a.keyboard_step || isNaN(a.keyboard_step) || !a.keyboard_step || 0 > a.keyboard_step) a.keyboard_step = 5;
            a.from_min && a.from < a.from_min && (a.from = a.from_min);
            a.from_max && a.from > a.from_max && (a.from = a.from_max);
            a.to_min && a.to < a.to_min && (a.to = a.to_min);
            a.to_max && a.from > a.to_max && (a.to = a.to_max);
            if (b) {
                b.min !== a.min && (b.min = a.min);
                b.max !== a.max && (b.max = a.max);
                if (b.from < b.min || b.from > b.max) b.from = a.from;
                if (b.to < b.min || b.to > b.max) b.to = a.to
            }
            if ("number" !== typeof a.min_interval || isNaN(a.min_interval) || !a.min_interval || 0 > a.min_interval) a.min_interval = 0;
            if ("number" !== typeof a.max_interval || isNaN(a.max_interval) || !a.max_interval || 0 > a.max_interval) a.max_interval = 0;
            a.min_interval && a.min_interval > a.max - a.min && (a.min_interval =
                a.max - a.min);
            a.max_interval && a.max_interval > a.max - a.min && (a.max_interval = a.max - a.min)
        }, decorate: function (a, b) {
            var c = "", d = this.options;
            d.prefix && (c += d.prefix);
            c += a;
            d.max_postfix && (d.values.length && a === d.p_values[d.max] ? (c += d.max_postfix, d.postfix && (c += " ")) : b === d.max && (c += d.max_postfix, d.postfix && (c += " ")));
            d.postfix && (c += d.postfix);
            return c
        }, updateFrom: function () {
            this.result.from = this.options.from;
            this.result.from_percent = this.calcPercent(this.result.from);
            this.options.values && (this.result.from_value =
                this.options.values[this.result.from])
        }, updateTo: function () {
            this.result.to = this.options.to;
            this.result.to_percent = this.calcPercent(this.result.to);
            this.options.values && (this.result.to_value = this.options.values[this.result.to])
        }, updateResult: function () {
            this.result.min = this.options.min;
            this.result.max = this.options.max;
            this.updateFrom();
            this.updateTo()
        }, appendGrid: function () {
            if (this.options.grid) {
                var a = this.options, b, c;
                b = a.max - a.min;
                var d = a.grid_num, h = 0, f = 0, k = 4, e, g, m = 0, n = "";
                this.calcGridMargin();
                a.grid_snap ?
                    (d = b / a.step, h = this.toFixed(a.step / (b / 100))) : h = this.toFixed(100 / d);
                4 < d && (k = 3);
                7 < d && (k = 2);
                14 < d && (k = 1);
                28 < d && (k = 0);
                for (b = 0; b < d + 1; b++) {
                    e = k;
                    f = this.toFixed(h * b);
                    100 < f && (f = 100, e -= 2, 0 > e && (e = 0));
                    this.coords.big[b] = f;
                    g = (f - h * (b - 1)) / (e + 1);
                    for (c = 1; c <= e && 0 !== f; c++) m = this.toFixed(f - g * c), n += '<span class="irs-grid-pol small" style="left: ' + m + '%"></span>';
                    n += '<span class="irs-grid-pol" style="left: ' + f + '%"></span>';
                    m = this.calcReal(f);
                    m = a.values.length ? a.p_values[m] : this._prettify(m);
                    n += '<span class="irs-grid-text js-grid-text-' +
                        b + '" style="left: ' + f + '%">' + m + "</span>"
                }
                this.coords.big_num = Math.ceil(d + 1);
                this.$cache.cont.addClass("irs-with-grid");
                this.$cache.grid.html(n);
                this.cacheGridLabels()
            }
        }, cacheGridLabels: function () {
            var a, b, c = this.coords.big_num;
            for (b = 0; b < c; b++) a = this.$cache.grid.find(".js-grid-text-" + b), this.$cache.grid_labels.push(a);
            this.calcGridLabels()
        }, calcGridLabels: function () {
            var a, b;
            b = [];
            var c = [], d = this.coords.big_num;
            for (a = 0; a < d; a++) this.coords.big_w[a] = this.$cache.grid_labels[a].outerWidth(!1), this.coords.big_p[a] =
                this.toFixed(this.coords.big_w[a] / this.coords.w_rs * 100), this.coords.big_x[a] = this.toFixed(this.coords.big_p[a] / 2), b[a] = this.toFixed(this.coords.big[a] - this.coords.big_x[a]), c[a] = this.toFixed(b[a] + this.coords.big_p[a]);
            this.options.force_edges && (b[0] < this.coords.grid_gap && (b[0] = this.coords.grid_gap, c[0] = this.toFixed(b[0] + this.coords.big_p[0]), this.coords.big_x[0] = this.coords.grid_gap), c[d - 1] > 100 - this.coords.grid_gap && (c[d - 1] = 100 - this.coords.grid_gap, b[d - 1] = this.toFixed(c[d - 1] - this.coords.big_p[d - 1]),
                this.coords.big_x[d - 1] = this.toFixed(this.coords.big_p[d - 1] - this.coords.grid_gap)));
            this.calcGridCollision(2, b, c);
            this.calcGridCollision(4, b, c);
            for (a = 0; a < d; a++) b = this.$cache.grid_labels[a][0], b.style.marginLeft = -this.coords.big_x[a] + "%"
        }, calcGridCollision: function (a, b, c) {
            var d, e, f, g = this.coords.big_num;
            for (d = 0; d < g; d += a) {
                e = d + a / 2;
                if (e >= g) break;
                f = this.$cache.grid_labels[e][0];
                f.style.visibility = c[d] <= b[e] ? "visible" : "hidden"
            }
        }, calcGridMargin: function () {
            this.options.grid_margin && (this.coords.w_rs = this.$cache.rs.outerWidth(!1),
            this.coords.w_rs && (this.coords.w_handle = "single" === this.options.type ? this.$cache.s_single.outerWidth(!1) : this.$cache.s_from.outerWidth(!1), this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100), this.coords.grid_gap = this.toFixed(this.coords.p_handle / 2 - .1), this.$cache.grid[0].style.width = this.toFixed(100 - this.coords.p_handle) + "%", this.$cache.grid[0].style.left = this.coords.grid_gap + "%"))
        }, update: function (a) {
            this.is_update = !0;
            this.options = e.extend(this.options, a);
            this.validate();
            this.updateResult(a);
            this.toggleInput();
            this.remove();
            this.init(!0)
        }, reset: function () {
            this.updateResult();
            this.update()
        }, destroy: function () {
            this.toggleInput();
            this.$cache.input.prop("readonly", !1);
            e.data(this.input, "ionRangeSlider", null);
            this.remove();
            this.options = this.input = null
        }
    };
    e.fn.ionRangeSlider = function (a) {
        return this.each(function () {
            e.data(this, "ionRangeSlider") || e.data(this, "ionRangeSlider", new r(this, a, t++))
        })
    };
    (function () {
        for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !g.requestAnimationFrame; ++c) g.requestAnimationFrame =
            g[b[c] + "RequestAnimationFrame"], g.cancelAnimationFrame = g[b[c] + "CancelAnimationFrame"] || g[b[c] + "CancelRequestAnimationFrame"];
        g.requestAnimationFrame || (g.requestAnimationFrame = function (b, c) {
            var f = (new Date).getTime(), e = Math.max(0, 16 - (f - a)), l = g.setTimeout(function () {
                b(f + e)
            }, e);
            a = f + e;
            return l
        });
        g.cancelAnimationFrame || (g.cancelAnimationFrame = function (a) {
            clearTimeout(a)
        })
    })()
})(jQuery, document, window, navigator);


/*
 * HTML5 Sortable jQuery Plugin
 * https://github.com/voidberg/html5sortable
 *
 * Original code copyright 2012 Ali Farhadi.
 * This version is mantained by Alexandru Badiu <andu@ctrlz.ro>
 *
 * Thanks to the following contributors: andyburke, bistoco, daemianmack, drskullster, flying-sheep, OscarGodson, Parikshit N. Samant, rodolfospalenza, ssafejava
 *
 * Released under the MIT license.
 */
"use strict";
!function (t) {
    var e, a, r = t();
    t.fn.sortable = function (i) {
        var n = String(i);
        return i = t.extend({connectWith: !1, placeholder: null, dragImage: null}, i), this.each(function () {
            if ("reload" === n && t(this).children(i.items).off("dragstart.h5s dragend.h5s selectstart.h5s dragover.h5s dragenter.h5s drop.h5s"), /^enable|disable|destroy$/.test(n)) {
                var s = t(this).children(t(this).data("items")).attr("draggable", "enable" === n);
                return void("destroy" === n && (t(this).off("sortupdate"), t(this).removeData("opts"), s.add(this).removeData("connectWith items").off("dragstart.h5s dragend.h5s selectstart.h5s dragover.h5s dragenter.h5s drop.h5s").off("sortupdate")))
            }
            var d = t(this).data("opts");
            "undefined" == typeof d ? t(this).data("opts", i) : i = d;
            var o, h, l, g, c = t(this).children(i.items),
                f = null === i.placeholder ? t("<" + (/^ul|ol$/i.test(this.tagName) ? "li" : "div") + ' class="sortable-placeholder"/>') : t(i.placeholder).addClass("sortable-placeholder");
            c.find(i.handle).mousedown(function () {
                o = !0
            }).mouseup(function () {
                o = !1
            }), t(this).data("items", i.items), r = r.add(f), i.connectWith && t(i.connectWith).add(this).data("connectWith", i.connectWith), c.attr("role", "option"), c.attr("aria-grabbed", "false"), c.attr("draggable", "true").on("dragstart.h5s", function (r) {
                if (r.stopImmediatePropagation(), i.handle && !o) return !1;
                o = !1;
                var n = r.originalEvent.dataTransfer;
                n.effectAllowed = "move", n.setData("text", ""), i.dragImage && n.setDragImage && n.setDragImage(i.dragImage, 0, 0), h = (e = t(this)).addClass("sortable-dragging").attr("aria-grabbed", "true").index(), a = e.outerHeight(), l = t(this).parent()
            }).on("dragend.h5s", function () {
                e && (e.removeClass("sortable-dragging").attr("aria-grabbed", "false").show(), r.detach(), g = t(this).parent(), (h !== e.index() || l.get(0) !== g.get(0)) && e.parent().triggerHandler("sortupdate", {
                    item: e,
                    oldindex: h,
                    startparent: l,
                    endparent: g
                }), e = null, a = null)
            }).not("a[href], img").on("selectstart.h5s", function () {
                return i.handle && !o ? !0 : (this.dragDrop && this.dragDrop(), !1)
            }).end().add([this, f]).on("dragover.h5s dragenter.h5s drop.h5s", function (n) {
                if (!c.is(e) && i.connectWith !== t(e).parent().data("connectWith")) return !0;
                if ("drop" === n.type) return n.stopPropagation(), r.filter(":visible").after(e), e.trigger("dragend.h5s"), !1;
                if (n.preventDefault(), n.originalEvent.dataTransfer.dropEffect = "move", c.is(this)) {
                    var s = t(this).outerHeight();
                    if (i.forcePlaceholderSize && f.height(a), s > a) {
                        var d = s - a, o = t(this).offset().top;
                        if (f.index() < t(this).index() && n.originalEvent.pageY < o + d) return !1;
                        if (f.index() > t(this).index() && n.originalEvent.pageY > o + s - d) return !1
                    }
                    e.hide(), t(this)[f.index() < t(this).index() ? "after" : "before"](f), r.not(f).detach()
                } else r.is(this) || t(this).children(i.items).length || (r.detach(), t(this).append(f));
                return !1
            })
        })
    }
}(jQuery);


/**
 * Tabular Data Table
 */
(function ($) {
    $.extend({
        tablesorter: new
        function () {
            var parsers = [], widgets = [];
            this.defaults = {
                cssHeader: "header",
                cssAsc: "headerSortUp",
                cssDesc: "headerSortDown",
                cssChildRow: "expand-child",
                sortInitialOrder: "asc",
                sortMultiSortKey: "shiftKey",
                sortForce: null,
                sortAppend: null,
                sortLocaleCompare: true,
                textExtraction: "simple",
                parsers: {},
                widgets: [],
                widgetZebra: {css: ["even", "odd"]},
                headers: {},
                widthFixed: false,
                cancelSelection: true,
                sortList: [],
                headerList: [],
                dateFormat: "us",
                decimal: '/\.|\,/g',
                onRenderHeader: null,
                selectorHeaders: 'thead th',
                debug: false
            };

            function benchmark(s, d) {
                log(s + "," + (new Date().getTime() - d.getTime()) + "ms");
            }

            this.benchmark = benchmark;

            function log(s) {
                if (typeof console != "undefined" && typeof console.debug != "undefined") {
                    console.log(s);
                } else {
                    alert(s);
                }
            }

            function buildParserCache(table, $headers) {
                if (table.config.debug) {
                    var parsersDebug = "";
                }
                if (table.tBodies.length == 0) return;
                var rows = table.tBodies[0].rows;
                if (rows[0]) {
                    var list = [], cells = rows[0].cells, l = cells.length;
                    for (var i = 0; i < l; i++) {
                        var p = false;
                        if ($.metadata && ($($headers[i]).metadata() && $($headers[i]).metadata().sorter)) {
                            p = getParserById($($headers[i]).metadata().sorter);
                        } else if ((table.config.headers[i] && table.config.headers[i].sorter)) {
                            p = getParserById(table.config.headers[i].sorter);
                        }
                        if (!p) {
                            p = detectParserForColumn(table, rows, -1, i);
                        }
                        if (table.config.debug) {
                            parsersDebug += "column:" + i + " parser:" + p.id + "\n";
                        }
                        list.push(p);
                    }
                }
                if (table.config.debug) {
                    log(parsersDebug);
                }
                return list;
            };

            function detectParserForColumn(table, rows, rowIndex, cellIndex) {
                var l = parsers.length, node = false, nodeValue = false, keepLooking = true;
                while (nodeValue == '' && keepLooking) {
                    rowIndex++;
                    if (rows[rowIndex]) {
                        node = getNodeFromRowAndCellIndex(rows, rowIndex, cellIndex);
                        nodeValue = trimAndGetNodeText(table.config, node);
                        if (table.config.debug) {
                            log('Checking if value was empty on row:' + rowIndex);
                        }
                    } else {
                        keepLooking = false;
                    }
                }
                for (var i = 1; i < l; i++) {
                    if (parsers[i].is(nodeValue, table, node)) {
                        return parsers[i];
                    }
                }
                return parsers[0];
            }

            function getNodeFromRowAndCellIndex(rows, rowIndex, cellIndex) {
                return rows[rowIndex].cells[cellIndex];
            }

            function trimAndGetNodeText(config, node) {
                return $.trim(getElementText(config, node));
            }

            function getParserById(name) {
                var l = parsers.length;
                for (var i = 0; i < l; i++) {
                    if (parsers[i].id.toLowerCase() == name.toLowerCase()) {
                        return parsers[i];
                    }
                }
                return false;
            }

            function buildCache(table) {
                if (table.config.debug) {
                    var cacheTime = new Date();
                }
                var totalRows = (table.tBodies[0] && table.tBodies[0].rows.length) || 0,
                    totalCells = (table.tBodies[0].rows[0] && table.tBodies[0].rows[0].cells.length) || 0,
                    parsers = table.config.parsers, cache = {row: [], normalized: []};
                for (var i = 0; i < totalRows; ++i) {
                    var c = $(table.tBodies[0].rows[i]), cols = [];
                    if (c.hasClass(table.config.cssChildRow)) {
                        cache.row[cache.row.length - 1] = cache.row[cache.row.length - 1].add(c);
                        continue;
                    }
                    cache.row.push(c);
                    for (var j = 0; j < totalCells; ++j) {
                        cols.push(parsers[j].format(getElementText(table.config, c[0].cells[j]), table, c[0].cells[j]));
                    }
                    cols.push(cache.normalized.length);
                    cache.normalized.push(cols);
                    cols = null;
                }
                ;
                if (table.config.debug) {
                    benchmark("Building cache for " + totalRows + " rows:", cacheTime);
                }
                return cache;
            };

            function getElementText(config, node) {
                var text = "";
                if (!node) return "";
                if (!config.supportsTextContent) config.supportsTextContent = node.textContent || false;
                if (config.textExtraction == "simple") {
                    if (config.supportsTextContent) {
                        text = node.textContent;
                    } else {
                        if (node.childNodes[0] && node.childNodes[0].hasChildNodes()) {
                            text = node.childNodes[0].innerHTML;
                        } else {
                            text = node.innerHTML;
                        }
                    }
                } else {
                    if (typeof(config.textExtraction) == "function") {
                        text = config.textExtraction(node);
                    } else {
                        text = $(node).text();
                    }
                }
                return text;
            }

            function appendToTable(table, cache) {
                if (table.config.debug) {
                    var appendTime = new Date()
                }
                var c = cache, r = c.row, n = c.normalized, totalRows = n.length, checkCell = (n[0].length - 1),
                    tableBody = $(table.tBodies[0]), rows = [];
                for (var i = 0; i < totalRows; i++) {
                    var pos = n[i][checkCell];
                    rows.push(r[pos]);
                    if (!table.config.appender) {
                        var l = r[pos].length;
                        for (var j = 0; j < l; j++) {
                            tableBody[0].appendChild(r[pos][j]);
                        }
                    }
                }
                if (table.config.appender) {
                    table.config.appender(table, rows);
                }
                rows = null;
                if (table.config.debug) {
                    benchmark("Rebuilt table:", appendTime);
                }
                applyWidget(table);
                setTimeout(function () {
                    $(table).trigger("sortEnd");
                }, 0);
            };

            function buildHeaders(table) {
                if (table.config.debug) {
                    var time = new Date();
                }
                var meta = ($.metadata) ? true : false;
                var header_index = computeTableHeaderCellIndexes(table);
                $tableHeaders = $(table.config.selectorHeaders, table).each(function (index) {
                    this.column = header_index[this.parentNode.rowIndex + "-" + this.cellIndex];
                    this.order = formatSortingOrder(table.config.sortInitialOrder);
                    this.count = this.order;
                    if (checkHeaderMetadata(this) || checkHeaderOptions(table, index)) this.sortDisabled = true;
                    if (checkHeaderOptionsSortingLocked(table, index)) this.order = this.lockedOrder = checkHeaderOptionsSortingLocked(table, index);
                    if (!this.sortDisabled) {
                        var $th = $(this).addClass(table.config.cssHeader);
                        if (table.config.onRenderHeader) table.config.onRenderHeader.apply($th);
                    }
                    table.config.headerList[index] = this;
                });
                if (table.config.debug) {
                    benchmark("Built headers:", time);
                    log($tableHeaders);
                }
                return $tableHeaders;
            };

            function computeTableHeaderCellIndexes(t) {
                var matrix = [];
                var lookup = {};
                var thead = t.getElementsByTagName('THEAD')[0];
                var trs = thead.getElementsByTagName('TR');
                for (var i = 0; i < trs.length; i++) {
                    var cells = trs[i].cells;
                    for (var j = 0; j < cells.length; j++) {
                        var c = cells[j];
                        var rowIndex = c.parentNode.rowIndex;
                        var cellId = rowIndex + "-" + c.cellIndex;
                        var rowSpan = c.rowSpan || 1;
                        var colSpan = c.colSpan || 1
                        var firstAvailCol;
                        if (typeof(matrix[rowIndex]) == "undefined") {
                            matrix[rowIndex] = [];
                        }
                        for (var k = 0; k < matrix[rowIndex].length + 1; k++) {
                            if (typeof(matrix[rowIndex][k]) == "undefined") {
                                firstAvailCol = k;
                                break;
                            }
                        }
                        lookup[cellId] = firstAvailCol;
                        for (var k = rowIndex; k < rowIndex + rowSpan; k++) {
                            if (typeof(matrix[k]) == "undefined") {
                                matrix[k] = [];
                            }
                            var matrixrow = matrix[k];
                            for (var l = firstAvailCol; l < firstAvailCol + colSpan; l++) {
                                matrixrow[l] = "x";
                            }
                        }
                    }
                }
                return lookup;
            }

            function checkCellColSpan(table, rows, row) {
                var arr = [], r = table.tHead.rows, c = r[row].cells;
                for (var i = 0; i < c.length; i++) {
                    var cell = c[i];
                    if (cell.colSpan > 1) {
                        arr = arr.concat(checkCellColSpan(table, headerArr, row++));
                    } else {
                        if (table.tHead.length == 1 || (cell.rowSpan > 1 || !r[row + 1])) {
                            arr.push(cell);
                        }
                    }
                }
                return arr;
            };

            function checkHeaderMetadata(cell) {
                if (($.metadata) && ($(cell).metadata().sorter === false)) {
                    return true;
                }
                ;
                return false;
            }

            function checkHeaderOptions(table, i) {
                if ((table.config.headers[i]) && (table.config.headers[i].sorter === false)) {
                    return true;
                }
                ;
                return false;
            }

            function checkHeaderOptionsSortingLocked(table, i) {
                if ((table.config.headers[i]) && (table.config.headers[i].lockedOrder)) return table.config.headers[i].lockedOrder;
                return false;
            }

            function applyWidget(table) {
                var c = table.config.widgets;
                var l = c.length;
                for (var i = 0; i < l; i++) {
                    getWidgetById(c[i]).format(table);
                }
            }

            function getWidgetById(name) {
                var l = widgets.length;
                for (var i = 0; i < l; i++) {
                    if (widgets[i].id.toLowerCase() == name.toLowerCase()) {
                        return widgets[i];
                    }
                }
            };

            function formatSortingOrder(v) {
                if (typeof(v) != "Number") {
                    return (v.toLowerCase() == "desc") ? 1 : 0;
                } else {
                    return (v == 1) ? 1 : 0;
                }
            }

            function isValueInArray(v, a) {
                var l = a.length;
                for (var i = 0; i < l; i++) {
                    if (a[i][0] == v) {
                        return true;
                    }
                }
                return false;
            }

            function setHeadersCss(table, $headers, list, css) {
                $headers.removeClass(css[0]).removeClass(css[1]);
                var h = [];
                $headers.each(function (offset) {
                    if (!this.sortDisabled) {
                        h[this.column] = $(this);
                    }
                });
                var l = list.length;
                for (var i = 0; i < l; i++) {
                    h[list[i][0]].addClass(css[list[i][1]]);
                }
            }

            function fixColumnWidth(table, $headers) {
                var c = table.config;
                if (c.widthFixed) {
                    var colgroup = $('<colgroup>');
                    $("tr:first td", table.tBodies[0]).each(function () {
                        colgroup.append($('<col>').css('width', $(this).width()));
                    });
                    $(table).prepend(colgroup);
                }
                ;
            }

            function updateHeaderSortCount(table, sortList) {
                var c = table.config, l = sortList.length;
                for (var i = 0; i < l; i++) {
                    var s = sortList[i], o = c.headerList[s[0]];
                    o.count = s[1];
                    o.count++;
                }
            }

            function multisort(table, sortList, cache) {
                if (table.config.debug) {
                    var sortTime = new Date();
                }
                var dynamicExp = "var sortWrapper = function(a,b) {", l = sortList.length;
                for (var i = 0; i < l; i++) {
                    var c = sortList[i][0];
                    var order = sortList[i][1];
                    var s = (table.config.parsers[c].type == "text") ? ((order == 0) ? makeSortFunction("text", "asc", c) : makeSortFunction("text", "desc", c)) : ((order == 0) ? makeSortFunction("numeric", "asc", c) : makeSortFunction("numeric", "desc", c));
                    var e = "e" + i;
                    dynamicExp += "var " + e + " = " + s;
                    dynamicExp += "if(" + e + ") { return " + e + "; } ";
                    dynamicExp += "else { ";
                }
                var orgOrderCol = cache.normalized[0].length - 1;
                dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";
                for (var i = 0; i < l; i++) {
                    dynamicExp += "}; ";
                }
                dynamicExp += "return 0; ";
                dynamicExp += "}; ";
                if (table.config.debug) {
                    benchmark("Evaling expression:" + dynamicExp, new Date());
                }
                eval(dynamicExp);
                cache.normalized.sort(sortWrapper);
                if (table.config.debug) {
                    benchmark("Sorting on " + sortList.toString() + " and dir " + order + " time:", sortTime);
                }
                return cache;
            };

            function makeSortFunction(type, direction, index) {
                var a = "a[" + index + "]", b = "b[" + index + "]";
                if (type == 'text' && direction == 'asc') {
                    return "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : (" + a + " < " + b + ") ? -1 : 1 )));";
                } else if (type == 'text' && direction == 'desc') {
                    return "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : (" + b + " < " + a + ") ? -1 : 1 )));";
                } else if (type == 'numeric' && direction == 'asc') {
                    return "(" + a + " === null && " + b + " === null) ? 0 :(" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + a + " - " + b + "));";
                } else if (type == 'numeric' && direction == 'desc') {
                    return "(" + a + " === null && " + b + " === null) ? 0 :(" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + b + " - " + a + "));";
                }
            };

            function makeSortText(i) {
                return "((a[" + i + "] < b[" + i + "]) ? -1 : ((a[" + i + "] > b[" + i + "]) ? 1 : 0));";
            };

            function makeSortTextDesc(i) {
                return "((b[" + i + "] < a[" + i + "]) ? -1 : ((b[" + i + "] > a[" + i + "]) ? 1 : 0));";
            };

            function makeSortNumeric(i) {
                return "a[" + i + "]-b[" + i + "];";
            };

            function makeSortNumericDesc(i) {
                return "b[" + i + "]-a[" + i + "];";
            };

            function sortText(a, b) {
                if (table.config.sortLocaleCompare) return a.localeCompare(b);
                return ((a < b) ? -1 : ((a > b) ? 1 : 0));
            };

            function sortTextDesc(a, b) {
                if (table.config.sortLocaleCompare) return b.localeCompare(a);
                return ((b < a) ? -1 : ((b > a) ? 1 : 0));
            };

            function sortNumeric(a, b) {
                return a - b;
            };

            function sortNumericDesc(a, b) {
                return b - a;
            };

            function getCachedSortType(parsers, i) {
                return parsers[i].type;
            };this.construct = function (settings) {
                return this.each(function () {
                    if (!this.tHead || !this.tBodies) return;
                    var $this, $document, $headers, cache, config, shiftDown = 0, sortOrder;
                    this.config = {};
                    config = $.extend(this.config, $.tablesorter.defaults, settings);
                    $this = $(this);
                    $.data(this, "tablesorter", config);
                    $headers = buildHeaders(this);
                    this.config.parsers = buildParserCache(this, $headers);
                    cache = buildCache(this);
                    var sortCSS = [config.cssDesc, config.cssAsc];
                    fixColumnWidth(this);
                    $headers.click(function (e) {
                        var totalRows = ($this[0].tBodies[0] && $this[0].tBodies[0].rows.length) || 0;
                        if (!this.sortDisabled && totalRows > 0) {
                            $this.trigger("sortStart");
                            var $cell = $(this);
                            var i = this.column;
                            this.order = this.count++ % 2;
                            if (this.lockedOrder) this.order = this.lockedOrder;
                            if (!e[config.sortMultiSortKey]) {
                                config.sortList = [];
                                if (config.sortForce != null) {
                                    var a = config.sortForce;
                                    for (var j = 0; j < a.length; j++) {
                                        if (a[j][0] != i) {
                                            config.sortList.push(a[j]);
                                        }
                                    }
                                }
                                config.sortList.push([i, this.order]);
                            } else {
                                if (isValueInArray(i, config.sortList)) {
                                    for (var j = 0; j < config.sortList.length; j++) {
                                        var s = config.sortList[j], o = config.headerList[s[0]];
                                        if (s[0] == i) {
                                            o.count = s[1];
                                            o.count++;
                                            s[1] = o.count % 2;
                                        }
                                    }
                                } else {
                                    config.sortList.push([i, this.order]);
                                }
                            }
                            ;setTimeout(function () {
                                setHeadersCss($this[0], $headers, config.sortList, sortCSS);
                                appendToTable($this[0], multisort($this[0], config.sortList, cache));
                            }, 1);
                            return false;
                        }
                    }).mousedown(function () {
                        if (config.cancelSelection) {
                            this.onselectstart = function () {
                                return false
                            };
                            return false;
                        }
                    });
                    $this.bind("update", function () {
                        var me = this;
                        setTimeout(function () {
                            me.config.parsers = buildParserCache(me, $headers);
                            cache = buildCache(me);
                        }, 1);
                    }).bind("updateCell", function (e, cell) {
                        var config = this.config;
                        var pos = [(cell.parentNode.rowIndex - 1), cell.cellIndex];
                        cache.normalized[pos[0]][pos[1]] = config.parsers[pos[1]].format(getElementText(config, cell), cell);
                    }).bind("sorton", function (e, list) {
                        $(this).trigger("sortStart");
                        config.sortList = list;
                        var sortList = config.sortList;
                        updateHeaderSortCount(this, sortList);
                        setHeadersCss(this, $headers, sortList, sortCSS);
                        appendToTable(this, multisort(this, sortList, cache));
                    }).bind("appendCache", function () {
                        appendToTable(this, cache);
                    }).bind("applyWidgetId", function (e, id) {
                        getWidgetById(id).format(this);
                    }).bind("applyWidgets", function () {
                        applyWidget(this);
                    });
                    if ($.metadata && ($(this).metadata() && $(this).metadata().sortlist)) {
                        config.sortList = $(this).metadata().sortlist;
                    }
                    if (config.sortList.length > 0) {
                        $this.trigger("sorton", [config.sortList]);
                    }
                    applyWidget(this);
                });
            };
            this.addParser = function (parser) {
                var l = parsers.length, a = true;
                for (var i = 0; i < l; i++) {
                    if (parsers[i].id.toLowerCase() == parser.id.toLowerCase()) {
                        a = false;
                    }
                }
                if (a) {
                    parsers.push(parser);
                }
                ;
            };
            this.addWidget = function (widget) {
                widgets.push(widget);
            };
            this.formatFloat = function (s) {
                var i = parseFloat(s);
                return (isNaN(i)) ? 0 : i;
            };
            this.formatInt = function (s) {
                var i = parseInt(s);
                return (isNaN(i)) ? 0 : i;
            };
            this.isDigit = function (s, config) {
                return /^[-+]?\d*$/.test($.trim(s.replace(/[,.']/g, '')));
            };
            this.clearTableBody = function (table) {
                if ($.browser.msie) {
                    function empty() {
                        while (this.firstChild) this.removeChild(this.firstChild);
                    }

                    empty.apply(table.tBodies[0]);
                } else {
                    table.tBodies[0].innerHTML = "";
                }
            };
        }
    });
    $.fn.extend({tablesorter: $.tablesorter.construct});
    var ts = $.tablesorter;
    ts.addParser({
        id: "text", is: function (s) {
            return true;
        }, format: function (s) {
            return $.trim(s.toLocaleLowerCase());
        }, type: "text"
    });
    ts.addParser({
        id: "digit", is: function (s, table) {
            var c = table.config;
            return $.tablesorter.isDigit(s, c);
        }, format: function (s) {
            return $.tablesorter.formatFloat(s);
        }, type: "numeric"
    });
    ts.addParser({
        id: "currency", is: function (s) {
            return /^[£$€?.]/.test(s);
        }, format: function (s) {
            return $.tablesorter.formatFloat(s.replace(new RegExp(/[£$€]/g), ""));
        }, type: "numeric"
    });
    ts.addParser({
        id: "ipAddress", is: function (s) {
            return /^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(s);
        }, format: function (s) {
            var a = s.split("."), r = "", l = a.length;
            for (var i = 0; i < l; i++) {
                var item = a[i];
                if (item.length == 2) {
                    r += "0" + item;
                } else {
                    r += item;
                }
            }
            return $.tablesorter.formatFloat(r);
        }, type: "numeric"
    });
    ts.addParser({
        id: "url", is: function (s) {
            return /^(https?|ftp|file):\/\/$/.test(s);
        }, format: function (s) {
            return jQuery.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//), ''));
        }, type: "text"
    });
    ts.addParser({
        id: "isoDate", is: function (s) {
            return /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s);
        }, format: function (s) {
            return $.tablesorter.formatFloat((s != "") ? new Date(s.replace(new RegExp(/-/g), "/")).getTime() : "0");
        }, type: "numeric"
    });
    ts.addParser({
        id: "percent", is: function (s) {
            return /\%$/.test($.trim(s));
        }, format: function (s) {
            return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g), ""));
        }, type: "numeric"
    });
    ts.addParser({
        id: "usLongDate", is: function (s) {
            return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/));
        }, format: function (s) {
            return $.tablesorter.formatFloat(new Date(s).getTime());
        }, type: "numeric"
    });
    ts.addParser({
        id: "shortDate", is: function (s) {
            return /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(s);
        }, format: function (s, table) {
            var c = table.config;
            s = s.replace(/\-/g, "/");
            if (c.dateFormat == "us") {
                s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$1/$2");
            } else if (c.dateFormat == "uk") {
                s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$2/$1");
            } else if (c.dateFormat == "dd/mm/yy" || c.dateFormat == "dd-mm-yy") {
                s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, "$1/$2/$3");
            }
            return $.tablesorter.formatFloat(new Date(s).getTime());
        }, type: "numeric"
    });
    ts.addParser({
        id: "time", is: function (s) {
            return /^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(s);
        }, format: function (s) {
            return $.tablesorter.formatFloat(new Date("2000/01/01 " + s).getTime());
        }, type: "numeric"
    });
    ts.addParser({
        id: "metadata", is: function (s) {
            return false;
        }, format: function (s, table, cell) {
            var c = table.config, p = (!c.parserMetadataName) ? 'sortValue' : c.parserMetadataName;
            return $(cell).metadata()[p];
        }, type: "numeric"
    });
    ts.addWidget({
        id: "zebra", format: function (table) {
            if (table.config.debug) {
                var time = new Date();
            }
            var $tr, row = -1, odd;
            $("tr:visible", table.tBodies[0]).each(function (i) {
                $tr = $(this);
                if (!$tr.hasClass(table.config.cssChildRow)) row++;
                odd = (row % 2 == 0);
                $tr.removeClass(table.config.widgetZebra.css[odd ? 0 : 1]).addClass(table.config.widgetZebra.css[odd ? 1 : 0])
            });
            if (table.config.debug) {
                $.tablesorter.benchmark("Applying Zebra widget", time);
            }
        }
    });
})(jQuery);


/* jquery.poptrox.js v2.5.1 | (c) n33 | n33.co | MIT licensed */
!function (e) {
    e.fn.poptrox_disableSelection = function () {
        return e(this).css("user-select", "none").css("-khtml-user-select", "none").css("-moz-user-select", "none").css("-o-user-select", "none").css("-webkit-user-select", "none")
    }, e.fn.poptrox = function (o) {
        function t() {
            p = e(window).width(), s = e(window).height() + r.windowHeightPad;
            var o = Math.abs(x.width() - x.outerWidth()), t = Math.abs(x.height() - x.outerHeight()),
                i = (w.width(), w.height(), p - 2 * r.windowMargin - o), n = s - 2 * r.windowMargin - t;
            x.css("min-width", r.popupWidth).css("min-height", r.popupHeight), v.children().css("max-width", i).css("max-height", n)
        }

        if (0 == this.length) return e(this);
        if (this.length > 1) {
            for (var i = 0; i < this.length; i++) e(this[i]).poptrox(o);
            return e(this)
        }
        var p, s, r = e.extend({
                preload: !1,
                baseZIndex: 1e3,
                fadeSpeed: 300,
                overlayColor: "#000000",
                overlayOpacity: .6,
                overlayClass: "poptrox-overlay",
                windowMargin: 50,
                windowHeightPad: 0,
                selector: "a",
                caption: null,
                parent: "body",
                popupSpeed: 300,
                popupWidth: 200,
                popupHeight: 100,
                popupIsFixed: !1,
                useBodyOverflow: !1,
                usePopupEasyClose: !0,
                usePopupForceClose: !1,
                usePopupLoader: !0,
                usePopupCloser: !0,
                usePopupCaption: !1,
                usePopupNav: !1,
                usePopupDefaultStyling: !0,
                popupBackgroundColor: "#FFFFFF",
                popupTextColor: "#000000",
                popupLoaderTextSize: "2em",
                popupCloserBackgroundColor: "#000000",
                popupCloserTextColor: "#FFFFFF",
                popupCloserTextSize: "20px",
                popupPadding: 10,
                popupCaptionHeight: 60,
                popupCaptionTextSize: null,
                popupBlankCaptionText: "(untitled)",
                popupCloserText: "&#215;",
                popupLoaderText: "&bull;&bull;&bull;&bull;",
                popupClass: "poptrox-popup",
                popupSelector: null,
                popupLoaderSelector: ".loader",
                popupCloserSelector: ".closer",
                popupCaptionSelector: ".caption",
                popupNavPreviousSelector: ".nav-previous",
                popupNavNextSelector: ".nav-next",
                onPopupClose: null,
                onPopupOpen: null
            }, o), n = e(this), a = e("body"), l = e('<div class="' + r.overlayClass + '"></div>'), u = e(window), d = [],
            h = 0, g = !1, f = new Array;
        r.usePopupLoader || (r.popupLoaderSelector = null), r.usePopupCloser || (r.popupCloserSelector = null), r.usePopupCaption || (r.popupCaptionSelector = null), r.usePopupNav || (r.popupNavPreviousSelector = null, r.popupNavNextSelector = null);
        var x;
        x = e(r.popupSelector ? r.popupSelector : '<div class="' + r.popupClass + '">' + (r.popupLoaderSelector ? '<div class="loader">' + r.popupLoaderText + "</div>" : "") + '<div class="pic"></div>' + (r.popupCaptionSelector ? '<div class="caption"></div>' : "") + (r.popupCloserSelector ? '<span class="closer">' + r.popupCloserText + "</span>" : "") + (r.popupNavPreviousSelector ? '<div class="nav-previous"></div>' : "") + (r.popupNavNextSelector ? '<div class="nav-next"></div>' : "") + "</div>");
        var v = x.find(".pic"), w = e(), b = x.find(r.popupLoaderSelector), m = x.find(r.popupCaptionSelector),
            y = x.find(r.popupCloserSelector), S = x.find(r.popupNavNextSelector),
            C = x.find(r.popupNavPreviousSelector), P = S.add(C);
        if (r.usePopupDefaultStyling && (x.css("background", r.popupBackgroundColor).css("color", r.popupTextColor).css("padding", r.popupPadding + "px"), m.length > 0 && (x.css("padding-bottom", r.popupCaptionHeight + "px"), m.css("position", "absolute").css("left", "0").css("bottom", "0").css("width", "100%").css("text-align", "center").css("height", r.popupCaptionHeight + "px").css("line-height", r.popupCaptionHeight + "px"), r.popupCaptionTextSize && m.css("font-size", popupCaptionTextSize)), y.length > 0 && y.html(r.popupCloserText).css("font-size", r.popupCloserTextSize).css("background", r.popupCloserBackgroundColor).css("color", r.popupCloserTextColor).css("display", "block").css("width", "40px").css("height", "40px").css("line-height", "40px").css("text-align", "center").css("position", "absolute").css("text-decoration", "none").css("outline", "0").css("top", "0").css("right", "-40px"), b.length > 0 && b.html("").css("position", "relative").css("font-size", r.popupLoaderTextSize).on("startSpinning", function (o) {
            var t = e("<div>" + r.popupLoaderText + "</div>");
            t.css("height", Math.floor(r.popupHeight / 2) + "px").css("overflow", "hidden").css("line-height", Math.floor(r.popupHeight / 2) + "px").css("text-align", "center").css("margin-top", Math.floor((x.height() - t.height() + (m.length > 0 ? m.height() : 0)) / 2)).css("color", r.popupTextColor ? r.popupTextColor : "").on("xfin", function () {
                t.fadeTo(300, .5, function () {
                    t.trigger("xfout")
                })
            }).on("xfout", function () {
                t.fadeTo(300, .05, function () {
                    t.trigger("xfin")
                })
            }).trigger("xfin"), b.append(t)
        }).on("stopSpinning", function (e) {
            var o = b.find("div");
            o.remove()
        }), 2 == P.length)) {
            P.css("font-size", "75px").css("text-align", "center").css("color", "#fff").css("text-shadow", "none").css("height", "100%").css("position", "absolute").css("top", "0").css("opacity", "0.35").css("cursor", "pointer").css("box-shadow", "inset 0px 0px 10px 0px rgba(0,0,0,0)").poptrox_disableSelection();
            var k, T;
            r.usePopupEasyClose ? (k = "100px", T = "100px") : (k = "75%", T = "25%"), S.css("right", "0").css("width", k).html('<div style="position: absolute; height: 100px; width: 125px; top: 50%; right: 0; margin-top: -50px;">&gt;</div>'), C.css("left", "0").css("width", T).html('<div style="position: absolute; height: 100px; width: 125px; top: 50%; left: 0; margin-top: -50px;">&lt;</div>')
        }
        return u.on("resize orientationchange", function () {
            t()
        }), m.on("update", function (e, o) {
            o && 0 != o.length || (o = r.popupBlankCaptionText), m.html(o)
        }), y.css("cursor", "pointer").on("click", function (e) {
            return e.preventDefault(), e.stopPropagation(), x.trigger("poptrox_close"), !0
        }), S.on("click", function (e) {
            e.stopPropagation(), e.preventDefault(), x.trigger("poptrox_next")
        }), C.on("click", function (e) {
            e.stopPropagation(), e.preventDefault(), x.trigger("poptrox_previous")
        }), l.css("position", "fixed").css("left", 0).css("top", 0).css("z-index", r.baseZIndex).css("width", "100%").css("height", "100%").css("text-align", "center").css("cursor", "pointer").appendTo(r.parent).prepend('<div style="display:inline-block;height:100%;vertical-align:middle;"></div>').append('<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:' + r.overlayColor + ";opacity:" + r.overlayOpacity + ";filter:alpha(opacity=" + 100 * r.overlayOpacity + ');"></div>').hide().on("touchmove", function (e) {
            return !1
        }).on("click", function (e) {
            e.preventDefault(), e.stopPropagation(), x.trigger("poptrox_close")
        }), x.css("display", "inline-block").css("vertical-align", "middle").css("position", "relative").css("z-index", 1).css("cursor", "auto").appendTo(l).hide().on("poptrox_next", function () {
            var e = h + 1;
            e >= d.length && (e = 0), x.trigger("poptrox_switch", [e])
        }).on("poptrox_previous", function () {
            var e = h - 1;
            0 > e && (e = d.length - 1), x.trigger("poptrox_switch", [e])
        }).on("poptrox_reset", function () {
            t(), x.data("width", r.popupWidth).data("height", r.popupHeight), b.hide().trigger("stopSpinning"), m.hide(), y.hide(), P.hide(), v.hide(), w.attr("src", "").detach()
        }).on("poptrox_open", function (e, o) {
            return g ? !0 : (g = !0, r.useBodyOverflow && a.css("overflow", "hidden"), r.onPopupOpen && r.onPopupOpen(), void l.fadeTo(r.fadeSpeed, 1, function () {
                x.trigger("poptrox_switch", [o, !0])
            }))
        }).on("poptrox_switch", function (o, i, p) {
            var s;
            if (!p && g) return !0;
            if (g = !0, x.css("width", x.data("width")).css("height", x.data("height")), m.hide(), w.attr("src") && w.attr("src", ""), w.detach(), s = d[i], w = s.object, w.off("load"), v.css("text-indent", "-9999px").show().append(w), "ajax" == s.type ? e.get(s.src, function (e) {
                w.html(e), w.trigger("load")
            }) : w.attr("src", s.src), "image" != s.type) {
                var n, a;
                n = s.width, a = s.height, "%" == n.slice(-1) && (n = parseInt(n.substring(0, n.length - 1)) / 100 * u.width()), "%" == a.slice(-1) && (a = parseInt(a.substring(0, a.length - 1)) / 100 * u.height()), w.css("position", "relative").css("outline", "0").css("z-index", r.baseZIndex + 100).width(n).height(a)
            }
            b.trigger("startSpinning").fadeIn(300), x.show(), r.popupIsFixed ? (x.width(r.popupWidth).height(r.popupHeight), w.load(function () {
                w.off("load"), b.hide().trigger("stopSpinning"), m.trigger("update", [s.captionText]).fadeIn(r.fadeSpeed), y.fadeIn(r.fadeSpeed), v.css("text-indent", 0).hide().fadeIn(r.fadeSpeed, function () {
                    g = !1
                }), h = i, P.fadeIn(r.fadeSpeed)
            })) : w.load(function () {
                t(), w.off("load"), b.hide().trigger("stopSpinning");
                var e = w.width(), o = w.height(), p = function () {
                    m.trigger("update", [s.captionText]).fadeIn(r.fadeSpeed), y.fadeIn(r.fadeSpeed), v.css("text-indent", 0).hide().fadeIn(r.fadeSpeed, function () {
                        g = !1
                    }), h = i, P.fadeIn(r.fadeSpeed), x.data("width", e).data("height", o).css("width", "auto").css("height", "auto")
                };
                e == x.data("width") && o == x.data("height") ? p() : x.animate({
                    width: e,
                    height: o
                }, r.popupSpeed, "swing", p)
            }), "image" != s.type && w.trigger("load")
        }).on("poptrox_close", function () {
            return g && !r.usePopupForceClose ? !0 : (g = !0, x.hide().trigger("poptrox_reset"), r.onPopupClose && r.onPopupClose(), void l.fadeOut(r.fadeSpeed, function () {
                r.useBodyOverflow && a.css("overflow", "auto"), g = !1
            }))
        }).trigger("poptrox_reset"), r.usePopupEasyClose ? (m.on("click", "a", function (e) {
            e.stopPropagation()
        }), x.css("cursor", "pointer").on("click", function (e) {
            e.stopPropagation(), e.preventDefault(), x.trigger("poptrox_close")
        })) : x.on("click", function (e) {
            e.stopPropagation()
        }), u.keydown(function (e) {
            if (x.is(":visible")) switch (e.keyCode) {
                case 37:
                case 32:
                    if (r.usePopupNav) return x.trigger("poptrox_previous"), !1;
                    break;
                case 39:
                    if (r.usePopupNav) return x.trigger("poptrox_next"), !1;
                    break;
                case 27:
                    return x.trigger("poptrox_close"), !1
            }
        }), n.find(r.selector).each(function (o) {
            var t, i, p = e(this), s = p.find("img"), n = p.data("poptrox");
            if ("ignore" != n && p.attr("href")) {
                if (t = {
                    src: p.attr("href"),
                    captionText: s.attr("title"),
                    width: null,
                    height: null,
                    type: null,
                    object: null,
                    options: null
                }, r.caption) {
                    if ("function" == typeof r.caption) c = r.caption(p); else if ("selector" in r.caption) {
                        var a;
                        a = p.find(r.caption.selector), "attribute" in r.caption ? c = a.attr(r.caption.attribute) : (c = a.html(), r.caption.remove === !0 && a.remove())
                    }
                } else c = s.attr("title");
                if (t.captionText = c, n) {
                    var l = n.split(",");
                    0 in l && (t.type = l[0]), 1 in l && (i = l[1].match(/([0-9%]+)x([0-9%]+)/), i && 3 == i.length && (t.width = i[1], t.height = i[2])), 2 in l && (t.options = l[2])
                }
                if (!t.type) switch (i = t.src.match(/\/\/([a-z0-9\.]+)\/.*/), (!i || i.length < 2) && (i = [!1]), i[1]) {
                    case"api.soundcloud.com":
                        t.type = "soundcloud";
                        break;
                    case"youtu.be":
                        t.type = "youtube";
                        break;
                    case"vimeo.com":
                        t.type = "vimeo";
                        break;
                    case"wistia.net":
                        t.type = "wistia";
                        break;
                    case"bcove.me":
                        t.type = "bcove";
                        break;
                    default:
                        t.type = "image"
                }
                switch (i = t.src.match(/\/\/[a-z0-9\.]+\/(.*)/), t.type) {
                    case"iframe":
                        t.object = e('<iframe src="" frameborder="0"></iframe>'), t.object.on("click", function (e) {
                            e.stopPropagation()
                        }).css("cursor", "auto"), t.width && t.height || (t.width = "600", t.height = "400");
                        break;
                    case"ajax":
                        t.object = e('<div class="poptrox-ajax"></div>'), t.object.on("click", function (e) {
                            e.stopPropagation()
                        }).css("cursor", "auto").css("overflow", "auto"), t.width && t.height || (t.width = "600", t.height = "400");
                        break;
                    case"soundcloud":
                        t.object = e('<iframe scrolling="no" frameborder="no" src=""></iframe>'), t.src = "//w.soundcloud.com/player/?url=" + escape(t.src) + (t.options ? "&" + t.options : ""), t.width = "600", t.height = "166";
                        break;
                    case"youtube":
                        t.object = e('<iframe src="" frameborder="0" allowfullscreen="1"></iframe>'), t.src = "//www.youtube.com/embed/" + i[1] + (t.options ? "?" + t.options : ""), t.width && t.height || (t.width = "800", t.height = "480");
                        break;
                    case"vimeo":
                        t.object = e('<iframe src="" frameborder="0" allowFullScreen="1"></iframe>'), t.src = "//player.vimeo.com/video/" + i[1] + (t.options ? "?" + t.options : ""), t.width && t.height || (t.width = "800", t.height = "480");
                        break;
                    case"wistia":
                        t.object = e('<iframe src="" frameborder="0" allowFullScreen="1"></iframe>'), t.src = "//fast.wistia.net/" + i[1] + (t.options ? "?" + t.options : ""), t.width && t.height || (t.width = "800", t.height = "480");
                        break;
                    case"bcove":
                        t.object = e('<iframe src="" frameborder="0" allowFullScreen="1" width="100%"></iframe>'), t.src = "//bcove.me/" + i[1] + (t.options ? "?" + t.options : ""), t.width && t.height || (t.width = "640", t.height = "360");
                        break;
                    default:
                        if (t.object = e('<img src="" alt="" style="vertical-align:bottom" />'), r.preload) {
                            var i = document.createElement("img");
                            i.src = t.src, f.push(i)
                        }
                        t.width = p.attr("width"), t.height = p.attr("height")
                }
                "file:" == window.location.protocol && t.src.match(/^\/\//) && (t.src = "http:" + t.src), d.push(t), s.attr("title", ""), p.attr("href", "").css("outline", 0).on("click", function (e) {
                    e.preventDefault(), e.stopPropagation(), x.trigger("poptrox_open", [o])
                })
            }
        }), e(this)
    }
}(jQuery);


(function ($) {
    $.fn.userincr = function (options) {
        options = $.extend({}, $.fn.userincr.defaults, options || {});
        // ??? optins is shared between all invocations of a function?
        return this.each(function () {
            var edit = $(this);
            var oldvalue = edit.val();
            var op = OPS.add;
            var delta = 1;
            edit.attr('title', (options.title) || edit.attr('title') || 'Enter "+x" or "+x%" or "*x" \nto change increment');
            edit.on('change', function (e) {
                // console.log('change-handler-enter');
                var v = edit.val();
                if (0) {
                } else if ('%' == v.substr(-1)) {
                    v = parseFloat(v.substr(0, v.length - 1))
                    if (v > 0) newdelta(OPS.mul, 1 + v / 100, 'inc');
                    else newdelta(OPS.mul, 1 / (1 + v / 100), 'dec');
                } else if ('-' === v.substr(0, 1) && edit.data('min') >= 0) {
                    newdelta(OPS.add, -parseFloat(v), 'dec');
                } else if ('+' == v.substr(0, 1)) {
                    v = parseFloat(v.substr(1));
                    if (v < 0) newdelta(OPS.add, -v, 'dec');
                    else newdelta(OPS.add, v, 'inc');
                } else if ('*' == v.substr(0, 1)) {
                    v = parseFloat(v.substr(1));
                    if (v > 1) newdelta(OPS.mul, v, 'inc');
                    else newdelta(OPS.mul, 1 / v, 'dec');
                } else if ('/' == v.substr(0, 1)) {
                    v = parseFloat(v.substr(1));
                    if (v > 1) newdelta(OPS.mul, v, 'dec');
                    else newdelta(OPS.mul, 1 / v, 'inc');
                } else {
                    btn[1].focus();
                }
                limit_val();
                oldvalue = edit.val();
                // console.log('change-handler-exit');
            });
            var limit_val = function () {
                var t = edit.data('min')
                if (parseFloat(edit.val()) < t) edit.val(t);
                t = edit.data('max')
                if (parseFloat(edit.val()) > t) edit.val(t);
            }
            var newdelta = function (newop, newdelta, spinop) {
                op = newop;
                delta = newdelta;
                update_tooltip();
                spin(spinop);
            }
            var spin = function (spinop) {
                edit.val(op[spinop](parseFloat(oldvalue), delta));
                limit_val();
                btn[spinop === 'dec' ? 0 : 1].focus();
                oldvalue = edit.val();
                // console.log('trigger-spin');
                edit.trigger('spin');
            };

            var btn = $.map(['dec', 'inc'], function (id) {
                return $("<input>", {type: "button", value: options.buttonlabels[id], "class": 'userincr-btn-' + id})
                    .on('click', function () {
                        spin(id)
                    });
            });
            var update_tooltip = function () {
                btn[1].attr({title: op.incfmt(delta)});
                btn[0].attr({title: op.decfmt(delta)});
            };
            update_tooltip();
            if (1 != edit.parent().children().length) edit.wrap('<span class="userincr-container">');
            edit.parent().append(btn);
        });
    };
    var OPS = {
        add: {
            inc: function (x, delta) {
                return x + delta
            },
            dec: function (x, delta) {
                return x - delta
            },
            incfmt: function (delta) {
                return "+" + delta
            },
            decfmt: function (delta) {
                return "âˆ’" + delta
            }
        },
        mul: {
            inc: function (x, delta) {
                return x * delta
            },
            dec: function (x, delta) {
                return x / delta
            },
            incfmt: function (delta) {
                return "Ã—" + delta
            },
            decfmt: function (delta) {
                return "Ã·" + delta
            }
        }
    };
    $.fn.userincr.defaults = {
        buttonlabels: {dec: 'â–¼', inc: 'â–²'} //â— â–· â—€ â–¶ â–½ â–³ â–¼ â–²
    };
}(jQuery));