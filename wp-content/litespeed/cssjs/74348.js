! function(e) {
    var i, t, r = document.attachEvent,
        s = !1,
        n = e.fn.resize;
    if (e.fn.resize = function(e) {
            return this.each(function() {
                this == window ? n.call(jQuery(this), e) : addResizeListener(this, e)
            })
        }, e.fn.removeResize = function(e) {
            return this.each(function() {
                removeResizeListener(this, e)
            })
        }, !r) {
        var o = (t = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(e) {
                return window.setTimeout(e, 20)
            }, function(e) {
                return t(e)
            }),
            a = (i = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout, function(e) {
                return i(e)
            });

        function _(e) {
            var i = e.__resizeTriggers__,
                t = i.firstElementChild,
                r = i.lastElementChild,
                s = t.firstElementChild;
            r.scrollLeft = r.scrollWidth, r.scrollTop = r.scrollHeight, s.style.width = t.offsetWidth + 1 + "px", s.style.height = t.offsetHeight + 1 + "px", t.scrollLeft = t.scrollWidth, t.scrollTop = t.scrollHeight
        }

        function d(i) {
            var t = this;
            _(this), this.__resizeRAF__ && a(this.__resizeRAF__), this.__resizeRAF__ = o(function() {
                var e;
                ((e = t).offsetWidth != e.__resizeLast__.width || e.offsetHeight != e.__resizeLast__.height) && (t.__resizeLast__.width = t.offsetWidth, t.__resizeLast__.height = t.offsetHeight, t.__resizeListeners__.forEach(function(e) {
                    e.call(t, i)
                }))
            })
        }
        var c = !1,
            l = "",
            h = "animationstart",
            m = "Webkit Moz O ms".split(" "),
            f = "webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" "),
            g = "",
            u = document.createElement("fakeelement");
        if (void 0 !== u.style.animationName && (c = !0), !1 === c)
            for (var z = 0; z < m.length; z++)
                if (void 0 !== u.style[m[z] + "AnimationName"]) {
                    (g = m[z]) + "Animation", l = "-" + g.toLowerCase() + "-", h = f[z], c = !0;
                    break
                }
        var v = "resizeanim",
            w = "@" + l + "keyframes " + v + " { from { opacity: 0; } to { opacity: 0; } } ",
            p = l + "animation: 1ms " + v + "; "
    }
    window.addResizeListener = function(i, e) {
        r ? i.attachEvent("onresize", e) : (i.__resizeTriggers__ || ("static" == getComputedStyle(i).position && (i.style.position = "relative"), function() {
            if (!s) {
                var e = (w || "") + ".resize-triggers { " + (p || "") + 'visibility: hidden; opacity: 0; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
                    i = document.head || document.getElementsByTagName("head")[0],
                    t = document.createElement("style");
                t.type = "text/css", t.styleSheet ? t.styleSheet.cssText = e : t.appendChild(document.createTextNode(e)), i.appendChild(t), s = !0
            }
        }(), i.__resizeLast__ = {}, i.__resizeListeners__ = [], (i.__resizeTriggers__ = document.createElement("div")).className = "resize-triggers", i.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div><div class="contract-trigger"></div>', i.appendChild(i.__resizeTriggers__), _(i), i.addEventListener("scroll", d, !0), h && i.__resizeTriggers__.addEventListener(h, function(e) {
            e.animationName == v && _(i)
        })), i.__resizeListeners__.push(e))
    }, window.removeResizeListener = function(e, i) {
        r ? e.detachEvent("onresize", i) : (e.__resizeListeners__.splice(e.__resizeListeners__.indexOf(i), 1), e.__resizeListeners__.length || (e.removeEventListener("scroll", d), e.__resizeTriggers__ = !e.removeChild(e.__resizeTriggers__)))
    }
}(jQuery);