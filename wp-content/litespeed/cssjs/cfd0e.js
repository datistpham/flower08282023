/*!
 * jQuery UI Position 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function(I) {
    return function() {
        I.ui = I.ui || {};
        var o, H, x = Math.max,
            T = Math.abs,
            L = Math.round,
            n = /left|center|right/,
            l = /top|center|bottom/,
            f = /[\+\-]\d+(\.[\d]+)?%?/,
            s = /^\w+/,
            h = /%$/,
            e = I.fn.position;

        function P(t, i, e) {
            return [parseFloat(t[0]) * (h.test(t[0]) ? i / 100 : 1), parseFloat(t[1]) * (h.test(t[1]) ? e / 100 : 1)]
        }

        function D(t, i) {
            return parseInt(I.css(t, i), 10) || 0
        }
        I.position = {
                scrollbarWidth: function() {
                    if (void 0 !== o) return o;
                    var t, i = I("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                        e = i.children()[0];
                    return I("body").append(i), t = e.offsetWidth, i.css("overflow", "scroll"), t === (e = e.offsetWidth) && (e = i[0].clientWidth), i.remove(), o = t - e
                },
                getScrollInfo: function(t) {
                    var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
                        e = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
                        i = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth;
                    return {
                        width: "scroll" === e || "auto" === e && t.height < t.element[0].scrollHeight ? I.position.scrollbarWidth() : 0,
                        height: i ? I.position.scrollbarWidth() : 0
                    }
                },
                getWithinInfo: function(t) {
                    var i = I(t || window),
                        e = I.isWindow(i[0]),
                        t = !!i[0] && 9 === i[0].nodeType;
                    return {
                        element: i,
                        isWindow: e,
                        isDocument: t,
                        offset: i.offset() || {
                            left: 0,
                            top: 0
                        },
                        scrollLeft: i.scrollLeft(),
                        scrollTop: i.scrollTop(),
                        width: e || t ? i.width() : i.outerWidth(),
                        height: e || t ? i.height() : i.outerHeight()
                    }
                }
            }, I.fn.position = function(c) {
                if (!c || !c.of) return e.apply(this, arguments);
                c = I.extend({}, c);
                var d, a, g, u, m, t, w = I(c.of),
                    W = I.position.getWithinInfo(c.within),
                    y = I.position.getScrollInfo(W),
                    v = (c.collision || "flip").split(" "),
                    b = {},
                    i = 9 === (t = (i = w)[0]).nodeType ? {
                        width: i.width(),
                        height: i.height(),
                        offset: {
                            top: 0,
                            left: 0
                        }
                    } : I.isWindow(t) ? {
                        width: i.width(),
                        height: i.height(),
                        offset: {
                            top: i.scrollTop(),
                            left: i.scrollLeft()
                        }
                    } : t.preventDefault ? {
                        width: 0,
                        height: 0,
                        offset: {
                            top: t.pageY,
                            left: t.pageX
                        }
                    } : {
                        width: i.outerWidth(),
                        height: i.outerHeight(),
                        offset: i.offset()
                    };
                return w[0].preventDefault && (c.at = "left top"), a = i.width, g = i.height, m = I.extend({}, u = i.offset), I.each(["my", "at"], function() {
                    var t, i, e = (c[this] || "").split(" ");
                    (e = 1 === e.length ? n.test(e[0]) ? e.concat(["center"]) : l.test(e[0]) ? ["center"].concat(e) : ["center", "center"] : e)[0] = n.test(e[0]) ? e[0] : "center", e[1] = l.test(e[1]) ? e[1] : "center", t = f.exec(e[0]), i = f.exec(e[1]), b[this] = [t ? t[0] : 0, i ? i[0] : 0], c[this] = [s.exec(e[0])[0], s.exec(e[1])[0]]
                }), 1 === v.length && (v[1] = v[0]), "right" === c.at[0] ? m.left += a : "center" === c.at[0] && (m.left += a / 2), "bottom" === c.at[1] ? m.top += g : "center" === c.at[1] && (m.top += g / 2), d = P(b.at, a, g), m.left += d[0], m.top += d[1], this.each(function() {
                    var e, t, f = I(this),
                        s = f.outerWidth(),
                        h = f.outerHeight(),
                        i = D(this, "marginLeft"),
                        o = D(this, "marginTop"),
                        n = s + i + D(this, "marginRight") + y.width,
                        l = h + o + D(this, "marginBottom") + y.height,
                        r = I.extend({}, m),
                        p = P(b.my, f.outerWidth(), f.outerHeight());
                    "right" === c.my[0] ? r.left -= s : "center" === c.my[0] && (r.left -= s / 2), "bottom" === c.my[1] ? r.top -= h : "center" === c.my[1] && (r.top -= h / 2), r.left += p[0], r.top += p[1], H || (r.left = L(r.left), r.top = L(r.top)), e = {
                        marginLeft: i,
                        marginTop: o
                    }, I.each(["left", "top"], function(t, i) {
                        I.ui.position[v[t]] && I.ui.position[v[t]][i](r, {
                            targetWidth: a,
                            targetHeight: g,
                            elemWidth: s,
                            elemHeight: h,
                            collisionPosition: e,
                            collisionWidth: n,
                            collisionHeight: l,
                            offset: [d[0] + p[0], d[1] + p[1]],
                            my: c.my,
                            at: c.at,
                            within: W,
                            elem: f
                        })
                    }), c.using && (t = function(t) {
                        var i = u.left - r.left,
                            e = i + a - s,
                            o = u.top - r.top,
                            n = o + g - h,
                            l = {
                                target: {
                                    element: w,
                                    left: u.left,
                                    top: u.top,
                                    width: a,
                                    height: g
                                },
                                element: {
                                    element: f,
                                    left: r.left,
                                    top: r.top,
                                    width: s,
                                    height: h
                                },
                                horizontal: e < 0 ? "left" : 0 < i ? "right" : "center",
                                vertical: n < 0 ? "top" : 0 < o ? "bottom" : "middle"
                            };
                        a < s && T(i + e) < a && (l.horizontal = "center"), g < h && T(o + n) < g && (l.vertical = "middle"), x(T(i), T(e)) > x(T(o), T(n)) ? l.important = "horizontal" : l.important = "vertical", c.using.call(this, t, l)
                    }), f.offset(I.extend(r, {
                        using: t
                    }))
                })
            }, I.ui.position = {
                fit: {
                    left: function(t, i) {
                        var e = i.within,
                            o = e.isWindow ? e.scrollLeft : e.offset.left,
                            n = e.width,
                            l = t.left - i.collisionPosition.marginLeft,
                            f = o - l,
                            s = l + i.collisionWidth - n - o;
                        i.collisionWidth > n ? 0 < f && s <= 0 ? (e = t.left + f + i.collisionWidth - n - o, t.left += f - e) : t.left = !(0 < s && f <= 0) && s < f ? o + n - i.collisionWidth : o : 0 < f ? t.left += f : 0 < s ? t.left -= s : t.left = x(t.left - l, t.left)
                    },
                    top: function(t, i) {
                        var e = i.within,
                            o = e.isWindow ? e.scrollTop : e.offset.top,
                            n = i.within.height,
                            l = t.top - i.collisionPosition.marginTop,
                            f = o - l,
                            s = l + i.collisionHeight - n - o;
                        i.collisionHeight > n ? 0 < f && s <= 0 ? (e = t.top + f + i.collisionHeight - n - o, t.top += f - e) : t.top = !(0 < s && f <= 0) && s < f ? o + n - i.collisionHeight : o : 0 < f ? t.top += f : 0 < s ? t.top -= s : t.top = x(t.top - l, t.top)
                    }
                },
                flip: {
                    left: function(t, i) {
                        var e = i.within,
                            o = e.offset.left + e.scrollLeft,
                            n = e.width,
                            l = e.isWindow ? e.scrollLeft : e.offset.left,
                            f = t.left - i.collisionPosition.marginLeft,
                            s = f - l,
                            h = f + i.collisionWidth - n - l,
                            r = "left" === i.my[0] ? -i.elemWidth : "right" === i.my[0] ? i.elemWidth : 0,
                            e = "left" === i.at[0] ? i.targetWidth : "right" === i.at[0] ? -i.targetWidth : 0,
                            f = -2 * i.offset[0];
                        s < 0 ? ((o = t.left + r + e + f + i.collisionWidth - n - o) < 0 || o < T(s)) && (t.left += r + e + f) : 0 < h && (0 < (l = t.left - i.collisionPosition.marginLeft + r + e + f - l) || T(l) < h) && (t.left += r + e + f)
                    },
                    top: function(t, i) {
                        var e = i.within,
                            o = e.offset.top + e.scrollTop,
                            n = e.height,
                            l = e.isWindow ? e.scrollTop : e.offset.top,
                            f = t.top - i.collisionPosition.marginTop,
                            s = f - l,
                            h = f + i.collisionHeight - n - l,
                            r = "top" === i.my[1] ? -i.elemHeight : "bottom" === i.my[1] ? i.elemHeight : 0,
                            e = "top" === i.at[1] ? i.targetHeight : "bottom" === i.at[1] ? -i.targetHeight : 0,
                            f = -2 * i.offset[1];
                        s < 0 ? ((o = t.top + r + e + f + i.collisionHeight - n - o) < 0 || o < T(s)) && (t.top += r + e + f) : 0 < h && (0 < (l = t.top - i.collisionPosition.marginTop + r + e + f - l) || T(l) < h) && (t.top += r + e + f)
                    }
                },
                flipfit: {
                    left: function() {
                        I.ui.position.flip.left.apply(this, arguments), I.ui.position.fit.left.apply(this, arguments)
                    },
                    top: function() {
                        I.ui.position.flip.top.apply(this, arguments), I.ui.position.fit.top.apply(this, arguments)
                    }
                }
            },
            function() {
                var t, i = document.getElementsByTagName("body")[0],
                    e = document.createElement("div"),
                    o = document.createElement(i ? "div" : "body"),
                    n = {
                        visibility: "hidden",
                        width: 0,
                        height: 0,
                        border: 0,
                        margin: 0,
                        background: "none"
                    };
                for (t in i && I.extend(n, {
                        position: "absolute",
                        left: "-1000px",
                        top: "-1000px"
                    }), n) o.style[t] = n[t];
                o.appendChild(e), (i = i || document.documentElement).insertBefore(o, i.firstChild), e.style.cssText = "position: absolute; left: 10.7432222px;", e = I(e).offset().left, H = 10 < e && e < 11, o.innerHTML = "", i.removeChild(o)
            }()
    }(), I.ui.position
});