/*! Copyright (c) 2021-23 Prolincur Technologies LLP.
All Rights Reserved.

Please check the provided LICENSE file for licensing details.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
 */
import * as y from "three";
function we(w) {
  return w && w.__esModule && Object.prototype.hasOwnProperty.call(w, "default") ? w.default : w;
}
function ke(w) {
  if (w.__esModule)
    return w;
  var s = w.default;
  if (typeof s == "function") {
    var b = function x() {
      return this instanceof x ? Reflect.construct(s, arguments, this.constructor) : s.apply(this, arguments);
    };
    b.prototype = s.prototype;
  } else
    b = {};
  return Object.defineProperty(b, "__esModule", { value: !0 }), Object.keys(w).forEach(function(x) {
    var L = Object.getOwnPropertyDescriptor(w, x);
    Object.defineProperty(b, x, L.get ? L : {
      enumerable: !0,
      get: function() {
        return w[x];
      }
    });
  }), b;
}
var de = { exports: {} };
const Me = {}, Te = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Me
}, Symbol.toStringTag, { value: "Module" })), Pe = /* @__PURE__ */ ke(Te);
(function(w, s) {
  var b = function() {
    var x = /\s*/g, L = /^\s*|\s*$/g, A = /\s+/;
    function N(t) {
      if (!t || !t.length)
        return 0;
      for (var n = 0, a = 0; n < t.length; n++)
        a = (a << 5) - a + t.charCodeAt(n) | 0;
      return a;
    }
    function l(t, n) {
      return t.getElementsByTagName(n);
    }
    function j(t, n) {
      return t.getAttribute(n);
    }
    function G(t, n) {
      return parseFloat(j(t, n));
    }
    function e(t, n) {
      var a = l(t, n);
      return a.length ? a[0] : null;
    }
    function u(t) {
      return t.normalize && t.normalize(), t;
    }
    function m(t) {
      for (var n = 0, a = []; n < t.length; n++)
        a[n] = parseFloat(t[n]);
      return a;
    }
    function i(t) {
      return t && u(t), t && t.textContent || "";
    }
    function E(t, n) {
      var a = {}, k, M;
      for (M = 0; M < n.length; M++)
        k = e(t, n[M]), k && (a[n[M]] = i(k));
      return a;
    }
    function F(t, n) {
      for (var a in n)
        t[a] = n[a];
    }
    function Y(t) {
      return m(t.replace(x, "").split(","));
    }
    function Z(t) {
      for (var n = t.replace(L, "").split(A), a = [], k = 0; k < n.length; k++)
        a.push(Y(n[k]));
      return a;
    }
    function V(t) {
      var n = [G(t, "lon"), G(t, "lat")], a = e(t, "ele"), k = e(t, "gpxtpx:hr") || e(t, "hr"), M = e(t, "time"), T;
      return a && (T = parseFloat(i(a)), isNaN(T) || n.push(T)), {
        coordinates: n,
        time: M ? i(M) : null,
        heartRate: k ? parseFloat(i(k)) : null
      };
    }
    function q() {
      return {
        type: "FeatureCollection",
        features: []
      };
    }
    var te;
    typeof XMLSerializer < "u" ? te = new XMLSerializer() : typeof process == "object" && !process.browser && (te = new Pe.XMLSerializer());
    function ie(t) {
      return t.xml !== void 0 ? t.xml : te.serializeToString(t);
    }
    var ve = {
      kml: function(t) {
        for (var n = q(), a = {}, k = {}, M = {}, T = ["Polygon", "LineString", "Point", "Track", "gx:Track"], z = l(t, "Placemark"), D = l(t, "Style"), H = l(t, "StyleMap"), U = 0; U < D.length; U++) {
          var ee = N(ie(D[U])).toString(16);
          a["#" + j(D[U], "id")] = ee, k[ee] = D[U];
        }
        for (var B = 0; B < H.length; B++) {
          a["#" + j(H[B], "id")] = N(ie(H[B])).toString(16);
          for (var $ = l(H[B], "Pair"), h = {}, c = 0; c < $.length; c++)
            h[i(e($[c], "key"))] = i(e($[c], "styleUrl"));
          M["#" + j(H[B], "id")] = h;
        }
        for (var f = 0; f < z.length; f++)
          n.features = n.features.concat(C(z[f]));
        function d(r) {
          var p, g;
          return r = r || "", r.substr(0, 1) === "#" && (r = r.substr(1)), (r.length === 6 || r.length === 3) && (p = r), r.length === 8 && (g = parseInt(r.substr(0, 2), 16) / 255, p = "#" + r.substr(6, 2) + r.substr(4, 2) + r.substr(2, 2)), [p, isNaN(g) ? void 0 : g];
        }
        function P(r) {
          return m(r.split(" "));
        }
        function S(r) {
          var p = l(r, "coord"), g = [], o = [];
          p.length === 0 && (p = l(r, "gx:coord"));
          for (var _ = 0; _ < p.length; _++)
            g.push(P(i(p[_])));
          for (var O = l(r, "when"), v = 0; v < O.length; v++)
            o.push(i(O[v]));
          return {
            coords: g,
            times: o
          };
        }
        function R(r) {
          var p, g, o, _, O, v = [], K = [];
          if (e(r, "MultiGeometry"))
            return R(e(r, "MultiGeometry"));
          if (e(r, "MultiTrack"))
            return R(e(r, "MultiTrack"));
          if (e(r, "gx:MultiTrack"))
            return R(e(r, "gx:MultiTrack"));
          for (o = 0; o < T.length; o++)
            if (g = l(r, T[o]), g) {
              for (_ = 0; _ < g.length; _++)
                if (p = g[_], T[o] === "Point")
                  v.push({
                    type: "Point",
                    coordinates: Y(i(e(p, "coordinates")))
                  });
                else if (T[o] === "LineString")
                  v.push({
                    type: "LineString",
                    coordinates: Z(i(e(p, "coordinates")))
                  });
                else if (T[o] === "Polygon") {
                  var X = l(p, "LinearRing"), Q = [];
                  for (O = 0; O < X.length; O++)
                    Q.push(Z(i(e(X[O], "coordinates"))));
                  v.push({
                    type: "Polygon",
                    coordinates: Q
                  });
                } else if (T[o] === "Track" || T[o] === "gx:Track") {
                  var I = S(p);
                  v.push({
                    type: "LineString",
                    coordinates: I.coords
                  }), I.times.length && K.push(I.times);
                }
            }
          return {
            geoms: v,
            coordTimes: K
          };
        }
        function C(r) {
          var p = R(r), g, o = {}, _ = i(e(r, "name")), O = i(e(r, "address")), v = i(e(r, "styleUrl")), K = i(e(r, "description")), X = e(r, "TimeSpan"), Q = e(r, "TimeStamp"), I = e(r, "ExtendedData"), W = e(r, "LineStyle"), J = e(r, "PolyStyle"), se = e(r, "visibility");
          if (!p.geoms.length)
            return [];
          if (_ && (o.name = _), O && (o.address = O), v) {
            v[0] !== "#" && (v = "#" + v), o.styleUrl = v, a[v] && (o.styleHash = a[v]), M[v] && (o.styleMapHash = M[v], o.styleHash = a[M[v].normal]);
            var re = k[o.styleHash];
            re && (W || (W = e(re, "LineStyle")), J || (J = e(re, "PolyStyle")));
          }
          if (K && (o.description = K), X) {
            var be = i(e(X, "begin")), Se = i(e(X, "end"));
            o.timespan = { begin: be, end: Se };
          }
          if (Q && (o.timestamp = i(e(Q, "when"))), W) {
            var ae = d(i(e(W, "color"))), le = ae[0], ue = ae[1], fe = parseFloat(i(e(W, "width")));
            le && (o.stroke = le), isNaN(ue) || (o["stroke-opacity"] = ue), isNaN(fe) || (o["stroke-width"] = fe);
          }
          if (J) {
            var ce = d(i(e(J, "color"))), pe = ce[0], he = ce[1], ge = i(e(J, "fill")), me = i(e(J, "outline"));
            pe && (o.fill = pe), isNaN(he) || (o["fill-opacity"] = he), ge && (o["fill-opacity"] = ge === "1" ? o["fill-opacity"] || 1 : 0), me && (o["stroke-opacity"] = me === "1" ? o["stroke-opacity"] || 1 : 0);
          }
          if (I) {
            var ne = l(I, "Data"), oe = l(I, "SimpleData");
            for (g = 0; g < ne.length; g++)
              o[ne[g].getAttribute("name")] = i(e(ne[g], "value"));
            for (g = 0; g < oe.length; g++)
              o[oe[g].getAttribute("name")] = i(oe[g]);
          }
          se && (o.visibility = i(se)), p.coordTimes.length && (o.coordTimes = p.coordTimes.length === 1 ? p.coordTimes[0] : p.coordTimes);
          var ye = {
            type: "Feature",
            geometry: p.geoms.length === 1 ? p.geoms[0] : {
              type: "GeometryCollection",
              geometries: p.geoms
            },
            properties: o
          };
          return j(r, "id") && (ye.id = j(r, "id")), [ye];
        }
        return n;
      },
      gpx: function(t) {
        var n, a = l(t, "trk"), k = l(t, "rte"), M = l(t, "wpt"), T = q(), z;
        for (n = 0; n < a.length; n++)
          z = H(a[n]), z && T.features.push(z);
        for (n = 0; n < k.length; n++)
          z = U(k[n]), z && T.features.push(z);
        for (n = 0; n < M.length; n++)
          T.features.push(ee(M[n]));
        function D(h, c) {
          var f = l(h, c), d = [], P = [], S = [], R = f.length;
          if (R < 2)
            return {};
          for (var C = 0; C < R; C++) {
            var r = V(f[C]);
            d.push(r.coordinates), r.time && P.push(r.time), r.heartRate && S.push(r.heartRate);
          }
          return {
            line: d,
            times: P,
            heartRates: S
          };
        }
        function H(h) {
          for (var c = l(h, "trkseg"), f = [], d = [], P = [], S, R = 0; R < c.length; R++)
            S = D(c[R], "trkpt"), S && (S.line && f.push(S.line), S.times && S.times.length && d.push(S.times), S.heartRates && S.heartRates.length && P.push(S.heartRates));
          if (f.length !== 0) {
            var C = $(h);
            return F(C, B(e(h, "extensions"))), d.length && (C.coordTimes = f.length === 1 ? d[0] : d), P.length && (C.heartRates = f.length === 1 ? P[0] : P), {
              type: "Feature",
              properties: C,
              geometry: {
                type: f.length === 1 ? "LineString" : "MultiLineString",
                coordinates: f.length === 1 ? f[0] : f
              }
            };
          }
        }
        function U(h) {
          var c = D(h, "rtept");
          if (c.line) {
            var f = $(h);
            F(f, B(e(h, "extensions")));
            var d = {
              type: "Feature",
              properties: f,
              geometry: {
                type: "LineString",
                coordinates: c.line
              }
            };
            return d;
          }
        }
        function ee(h) {
          var c = $(h);
          return F(c, E(h, ["sym"])), {
            type: "Feature",
            properties: c,
            geometry: {
              type: "Point",
              coordinates: V(h).coordinates
            }
          };
        }
        function B(h) {
          var c = {};
          if (h) {
            var f = e(h, "line");
            if (f) {
              var d = i(e(f, "color")), P = parseFloat(i(e(f, "opacity"))), S = parseFloat(i(e(f, "width")));
              d && (c.stroke = d), isNaN(P) || (c["stroke-opacity"] = P), isNaN(S) || (c["stroke-width"] = S * 96 / 25.4);
            }
          }
          return c;
        }
        function $(h) {
          var c = E(h, ["name", "cmt", "desc", "type", "time", "keywords"]), f = l(h, "link");
          f.length && (c.links = []);
          for (var d = 0, P; d < f.length; d++)
            P = { href: j(f[d], "href") }, F(P, E(f[d], ["text", "type"])), c.links.push(P);
          return c;
        }
        return T;
      }
    };
    return ve;
  }();
  w.exports = b;
})(de);
var xe = de.exports;
const Le = /* @__PURE__ */ we(xe);
/*! Copyright (c) 2021-23 Prolincur Technologies LLP.
All Rights Reserved.

Please check the provided LICENSE file for licensing details.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
 */
class Fe extends y.FileLoader {
  constructor(s) {
    super(s), this.responseType = "json", this.color = 16777215, this.transform = new y.Matrix4();
  }
  setColor(s) {
    return this.color = s, this;
  }
  setTransform(s) {
    return s instanceof y.Matrix4 && (this.transform = s), this;
  }
  load(s, b, x, L) {
    const A = this;
    return super.load(
      s,
      (N) => {
        try {
          const l = A.parse(N);
          b(l);
        } catch (l) {
          L(l);
        }
      },
      x,
      L
    );
  }
  parse(s) {
    if (!s)
      return null;
    const b = this, x = (e) => {
      const u = new y.Vector3(e[0], e[1], 0);
      return u.applyMatrix4(b.transform), u;
    }, L = (e) => {
      const u = new y.BufferGeometry(), m = x(e), i = [];
      i.push(m.x, m.y, m.z), u.setAttribute("position", new y.Float32BufferAttribute(i, 3));
      const E = new y.PointsMaterial({ color: b.color });
      return new y.Points(u, E);
    }, A = (e) => {
      const u = new y.BufferGeometry(), m = [];
      e == null || e.forEach((E) => {
        const F = x(E);
        m.push(F.x, F.y, F.z);
      }), u.setAttribute("position", new y.Float32BufferAttribute(m, 3));
      const i = new y.LineBasicMaterial({ color: b.color });
      return new y.Line(u, i);
    }, N = (e) => {
      let u = null;
      e.forEach((E) => {
        const F = new y.Shape();
        E.forEach((Y, Z) => {
          const [V, q] = Y;
          Z === 0 ? F.moveTo(V, q) : F.lineTo(V, q);
        }), F.lineTo(E[0][0], E[0][1]), u ? u.holes.push(F) : u = F;
      });
      const m = new y.ShapeGeometry(u), i = new y.MeshBasicMaterial({ color: b.color, side: y.DoubleSide });
      return new y.Mesh(m, i);
    }, l = (e) => {
      const u = [];
      switch (e == null ? void 0 : e.type) {
        case "Point":
          u.push(L(e.coordinates));
          break;
        case "LineString":
          u.push(A(e.coordinates));
          break;
        case "Polygon":
          u.push(N(e.coordinates));
          break;
        case "MultiPoint":
          e.coordinates.forEach((m) => {
            u.push(L(m));
          });
          break;
        case "MultiPolygon":
          e.coordinates.forEach((m) => {
            u.push(N(m));
          });
          break;
        case "MultiLineString":
          e.coordinates.forEach((m) => {
            u.push(A(m));
          });
          break;
      }
      return u;
    }, j = (e) => {
      if (e.geometry) {
        const u = l(e.geometry);
        return u.forEach((m) => {
          e.properties && (m.userData = {
            ...e.properties
          });
        }), u;
      }
      return [];
    };
    let G = [];
    if (Array.isArray(s) ? G = s : s.type === "FeatureCollection" ? G = s.features : s.type === "Feature" && (G = [s]), G.length) {
      const e = new y.Group();
      return G.forEach((u) => {
        j(u).forEach((m) => {
          e.add(m);
        });
      }), e;
    }
    return null;
  }
}
class Ne extends y.FileLoader {
  constructor(s) {
    super(s), this.color = 16777215, this.transform = new y.Matrix4();
  }
  setColor(s) {
    return this.color = s, this;
  }
  setTransform(s) {
    return s instanceof y.Matrix4 && (this.transform = s), this;
  }
  load(s, b, x, L) {
    const A = this;
    return super.load(
      s,
      (N) => {
        try {
          const l = A.parse(N);
          b(l);
        } catch (l) {
          L(l);
        }
      },
      x,
      L
    );
  }
  parse(s) {
    if (!s)
      return null;
    const b = this, L = new DOMParser().parseFromString(s, "text/xml"), A = Le.kml(L, { styles: !0 }), N = new Fe();
    return N.setColor(b.color), N.setTransform(b.transform), N.parse(A);
  }
}
export {
  Ne as KmlLoader
};
