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
function Se(M) {
  return M && M.__esModule && Object.prototype.hasOwnProperty.call(M, "default") ? M.default : M;
}
function ke(M) {
  if (M.__esModule)
    return M;
  var o = M.default;
  if (typeof o == "function") {
    var c = function v() {
      return this instanceof v ? Reflect.construct(o, arguments, this.constructor) : o.apply(this, arguments);
    };
    c.prototype = o.prototype;
  } else
    c = {};
  return Object.defineProperty(c, "__esModule", { value: !0 }), Object.keys(M).forEach(function(v) {
    var S = Object.getOwnPropertyDescriptor(M, v);
    Object.defineProperty(c, v, S.get ? S : {
      enumerable: !0,
      get: function() {
        return M[v];
      }
    });
  }), c;
}
var ye = { exports: {} };
const Me = {}, Te = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Me
}, Symbol.toStringTag, { value: "Module" })), Pe = /* @__PURE__ */ ke(Te);
(function(M, o) {
  var c = function() {
    var v = /\s*/g, S = /^\s*|\s*$/g, A = /\s+/;
    function C(t) {
      if (!t || !t.length)
        return 0;
      for (var n = 0, a = 0; n < t.length; n++)
        a = (a << 5) - a + t.charCodeAt(n) | 0;
      return a;
    }
    function l(t, n) {
      return t.getElementsByTagName(n);
    }
    function G(t, n) {
      return t.getAttribute(n);
    }
    function B(t, n) {
      return parseFloat(G(t, n));
    }
    function e(t, n) {
      var a = l(t, n);
      return a.length ? a[0] : null;
    }
    function u(t) {
      return t.normalize && t.normalize(), t;
    }
    function d(t) {
      for (var n = 0, a = []; n < t.length; n++)
        a[n] = parseFloat(t[n]);
      return a;
    }
    function s(t) {
      return t && u(t), t && t.textContent || "";
    }
    function F(t, n) {
      var a = {}, T, P;
      for (P = 0; P < n.length; P++)
        T = e(t, n[P]), T && (a[n[P]] = s(T));
      return a;
    }
    function N(t, n) {
      for (var a in n)
        t[a] = n[a];
    }
    function Y(t) {
      return d(t.replace(v, "").split(","));
    }
    function Z(t) {
      for (var n = t.replace(S, "").split(A), a = [], T = 0; T < n.length; T++)
        a.push(Y(n[T]));
      return a;
    }
    function V(t) {
      var n = [B(t, "lon"), B(t, "lat")], a = e(t, "ele"), T = e(t, "gpxtpx:hr") || e(t, "hr"), P = e(t, "time"), x;
      return a && (x = parseFloat(s(a)), isNaN(x) || n.push(x)), {
        coordinates: n,
        time: P ? s(P) : null,
        heartRate: T ? parseFloat(s(T)) : null
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
        for (var n = q(), a = {}, T = {}, P = {}, x = ["Polygon", "LineString", "Point", "Track", "gx:Track"], O = l(t, "Placemark"), D = l(t, "Style"), H = l(t, "StyleMap"), U = 0; U < D.length; U++) {
          var ee = C(ie(D[U])).toString(16);
          a["#" + G(D[U], "id")] = ee, T[ee] = D[U];
        }
        for (var z = 0; z < H.length; z++) {
          a["#" + G(H[z], "id")] = C(ie(H[z])).toString(16);
          for (var J = l(H[z], "Pair"), g = {}, p = 0; p < J.length; p++)
            g[s(e(J[p], "key"))] = s(e(J[p], "styleUrl"));
          P["#" + G(H[z], "id")] = g;
        }
        for (var f = 0; f < O.length; f++)
          n.features = n.features.concat(_(O[f]));
        function b(r) {
          var h, m;
          return r = r || "", r.substr(0, 1) === "#" && (r = r.substr(1)), (r.length === 6 || r.length === 3) && (h = r), r.length === 8 && (m = parseInt(r.substr(0, 2), 16) / 255, h = "#" + r.substr(6, 2) + r.substr(4, 2) + r.substr(2, 2)), [h, isNaN(m) ? void 0 : m];
        }
        function L(r) {
          return d(r.split(" "));
        }
        function k(r) {
          var h = l(r, "coord"), m = [], i = [];
          h.length === 0 && (h = l(r, "gx:coord"));
          for (var R = 0; R < h.length; R++)
            m.push(L(s(h[R])));
          for (var j = l(r, "when"), w = 0; w < j.length; w++)
            i.push(s(j[w]));
          return {
            coords: m,
            times: i
          };
        }
        function E(r) {
          var h, m, i, R, j, w = [], K = [];
          if (e(r, "MultiGeometry"))
            return E(e(r, "MultiGeometry"));
          if (e(r, "MultiTrack"))
            return E(e(r, "MultiTrack"));
          if (e(r, "gx:MultiTrack"))
            return E(e(r, "gx:MultiTrack"));
          for (i = 0; i < x.length; i++)
            if (m = l(r, x[i]), m) {
              for (R = 0; R < m.length; R++)
                if (h = m[R], x[i] === "Point")
                  w.push({
                    type: "Point",
                    coordinates: Y(s(e(h, "coordinates")))
                  });
                else if (x[i] === "LineString")
                  w.push({
                    type: "LineString",
                    coordinates: Z(s(e(h, "coordinates")))
                  });
                else if (x[i] === "Polygon") {
                  var I = l(h, "LinearRing"), Q = [];
                  for (j = 0; j < I.length; j++)
                    Q.push(Z(s(e(I[j], "coordinates"))));
                  w.push({
                    type: "Polygon",
                    coordinates: Q
                  });
                } else if (x[i] === "Track" || x[i] === "gx:Track") {
                  var $ = k(h);
                  w.push({
                    type: "LineString",
                    coordinates: $.coords
                  }), $.times.length && K.push($.times);
                }
            }
          return {
            geoms: w,
            coordTimes: K
          };
        }
        function _(r) {
          var h = E(r), m, i = {}, R = s(e(r, "name")), j = s(e(r, "address")), w = s(e(r, "styleUrl")), K = s(e(r, "description")), I = e(r, "TimeSpan"), Q = e(r, "TimeStamp"), $ = e(r, "ExtendedData"), W = e(r, "LineStyle"), X = e(r, "PolyStyle"), se = e(r, "visibility");
          if (!h.geoms.length)
            return [];
          if (R && (i.name = R), j && (i.address = j), w) {
            w[0] !== "#" && (w = "#" + w), i.styleUrl = w, a[w] && (i.styleHash = a[w]), P[w] && (i.styleMapHash = P[w], i.styleHash = a[P[w].normal]);
            var re = T[i.styleHash];
            re && (W || (W = e(re, "LineStyle")), X || (X = e(re, "PolyStyle")));
          }
          if (K && (i.description = K), I) {
            var be = s(e(I, "begin")), we = s(e(I, "end"));
            i.timespan = { begin: be, end: we };
          }
          if (Q && (i.timestamp = s(e(Q, "when"))), W) {
            var ae = b(s(e(W, "color"))), le = ae[0], ue = ae[1], fe = parseFloat(s(e(W, "width")));
            le && (i.stroke = le), isNaN(ue) || (i["stroke-opacity"] = ue), isNaN(fe) || (i["stroke-width"] = fe);
          }
          if (X) {
            var ce = b(s(e(X, "color"))), pe = ce[0], he = ce[1], ge = s(e(X, "fill")), me = s(e(X, "outline"));
            pe && (i.fill = pe), isNaN(he) || (i["fill-opacity"] = he), ge && (i["fill-opacity"] = ge === "1" ? i["fill-opacity"] || 1 : 0), me && (i["stroke-opacity"] = me === "1" ? i["stroke-opacity"] || 1 : 0);
          }
          if ($) {
            var ne = l($, "Data"), oe = l($, "SimpleData");
            for (m = 0; m < ne.length; m++)
              i[ne[m].getAttribute("name")] = s(e(ne[m], "value"));
            for (m = 0; m < oe.length; m++)
              i[oe[m].getAttribute("name")] = s(oe[m]);
          }
          se && (i.visibility = s(se)), h.coordTimes.length && (i.coordTimes = h.coordTimes.length === 1 ? h.coordTimes[0] : h.coordTimes);
          var de = {
            type: "Feature",
            geometry: h.geoms.length === 1 ? h.geoms[0] : {
              type: "GeometryCollection",
              geometries: h.geoms
            },
            properties: i
          };
          return G(r, "id") && (de.id = G(r, "id")), [de];
        }
        return n;
      },
      gpx: function(t) {
        var n, a = l(t, "trk"), T = l(t, "rte"), P = l(t, "wpt"), x = q(), O;
        for (n = 0; n < a.length; n++)
          O = H(a[n]), O && x.features.push(O);
        for (n = 0; n < T.length; n++)
          O = U(T[n]), O && x.features.push(O);
        for (n = 0; n < P.length; n++)
          x.features.push(ee(P[n]));
        function D(g, p) {
          var f = l(g, p), b = [], L = [], k = [], E = f.length;
          if (E < 2)
            return {};
          for (var _ = 0; _ < E; _++) {
            var r = V(f[_]);
            b.push(r.coordinates), r.time && L.push(r.time), r.heartRate && k.push(r.heartRate);
          }
          return {
            line: b,
            times: L,
            heartRates: k
          };
        }
        function H(g) {
          for (var p = l(g, "trkseg"), f = [], b = [], L = [], k, E = 0; E < p.length; E++)
            k = D(p[E], "trkpt"), k && (k.line && f.push(k.line), k.times && k.times.length && b.push(k.times), k.heartRates && k.heartRates.length && L.push(k.heartRates));
          if (f.length !== 0) {
            var _ = J(g);
            return N(_, z(e(g, "extensions"))), b.length && (_.coordTimes = f.length === 1 ? b[0] : b), L.length && (_.heartRates = f.length === 1 ? L[0] : L), {
              type: "Feature",
              properties: _,
              geometry: {
                type: f.length === 1 ? "LineString" : "MultiLineString",
                coordinates: f.length === 1 ? f[0] : f
              }
            };
          }
        }
        function U(g) {
          var p = D(g, "rtept");
          if (p.line) {
            var f = J(g);
            N(f, z(e(g, "extensions")));
            var b = {
              type: "Feature",
              properties: f,
              geometry: {
                type: "LineString",
                coordinates: p.line
              }
            };
            return b;
          }
        }
        function ee(g) {
          var p = J(g);
          return N(p, F(g, ["sym"])), {
            type: "Feature",
            properties: p,
            geometry: {
              type: "Point",
              coordinates: V(g).coordinates
            }
          };
        }
        function z(g) {
          var p = {};
          if (g) {
            var f = e(g, "line");
            if (f) {
              var b = s(e(f, "color")), L = parseFloat(s(e(f, "opacity"))), k = parseFloat(s(e(f, "width")));
              b && (p.stroke = b), isNaN(L) || (p["stroke-opacity"] = L), isNaN(k) || (p["stroke-width"] = k * 96 / 25.4);
            }
          }
          return p;
        }
        function J(g) {
          var p = F(g, ["name", "cmt", "desc", "type", "time", "keywords"]), f = l(g, "link");
          f.length && (p.links = []);
          for (var b = 0, L; b < f.length; b++)
            L = { href: G(f[b], "href") }, N(L, F(f[b], ["text", "type"])), p.links.push(L);
          return p;
        }
        return x;
      }
    };
    return ve;
  }();
  M.exports = c;
})(ye);
var xe = ye.exports;
const Le = /* @__PURE__ */ Se(xe);
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
class Ne extends y.FileLoader {
  constructor(o) {
    super(o), this.responseType = "json", this.color = 16777215, this.transform = new y.Matrix4();
  }
  setColor(o) {
    return this.color = o, this;
  }
  setTransform(o) {
    return o instanceof y.Matrix4 && (this.transform = o), this;
  }
  load(o, c, v, S) {
    const A = this;
    return super.load(
      o,
      (C) => {
        try {
          const l = A.parse(C);
          c(l);
        } catch (l) {
          S(l);
        }
      },
      v,
      S
    );
  }
  parse(o) {
    if (!o)
      return null;
    const c = this, v = (e) => {
      const u = new y.Vector3(e[0], e[1], 0);
      return u.applyMatrix4(c.transform), u;
    }, S = (e) => {
      const u = new y.BufferGeometry(), d = v(e), s = [];
      s.push(d.x, d.y, d.z), u.setAttribute("position", new y.Float32BufferAttribute(s, 3));
      const F = new y.PointsMaterial({ color: c.color });
      return new y.Points(u, F);
    }, A = (e) => {
      const u = new y.BufferGeometry(), d = [];
      e == null || e.forEach((F) => {
        const N = v(F);
        d.push(N.x, N.y, N.z);
      }), u.setAttribute("position", new y.Float32BufferAttribute(d, 3));
      const s = new y.LineBasicMaterial({ color: c.color });
      return new y.Line(u, s);
    }, C = (e) => {
      let u = null;
      e.forEach((F) => {
        const N = new y.Shape();
        F.forEach((Y, Z) => {
          const [V, q] = Y;
          Z === 0 ? N.moveTo(V, q) : N.lineTo(V, q);
        }), N.lineTo(F[0][0], F[0][1]), u ? u.holes.push(N) : u = N;
      });
      const d = new y.ShapeGeometry(u), s = new y.MeshBasicMaterial({ color: c.color, side: y.DoubleSide });
      return new y.Mesh(d, s);
    }, l = (e) => {
      const u = [];
      switch (e == null ? void 0 : e.type) {
        case "Point":
          u.push(S(e.coordinates));
          break;
        case "LineString":
          u.push(A(e.coordinates));
          break;
        case "Polygon":
          u.push(C(e.coordinates));
          break;
        case "MultiPoint":
          e.coordinates.forEach((d) => {
            u.push(S(d));
          });
          break;
        case "MultiPolygon":
          e.coordinates.forEach((d) => {
            u.push(C(d));
          });
          break;
        case "MultiLineString":
          e.coordinates.forEach((d) => {
            u.push(A(d));
          });
          break;
      }
      return u;
    }, G = (e) => {
      if (e.geometry) {
        const u = l(e.geometry);
        return u.forEach((d) => {
          e.properties && (d.userData = {
            ...e.properties
          });
        }), u;
      }
      return [];
    };
    let B = [];
    if (Array.isArray(o) ? B = o : o.type === "FeatureCollection" ? B = o.features : o.type === "Feature" && (B = [o]), B.length) {
      const e = new y.Group();
      return B.forEach((u) => {
        G(u).forEach((d) => {
          e.add(d);
        });
      }), e;
    }
    return null;
  }
}
class Fe extends y.FileLoader {
  constructor(o) {
    super(o), this.color = 16777215, this.transform = new y.Matrix4();
  }
  setColor(o) {
    return this.color = o, this;
  }
  setTransform(o) {
    return o instanceof y.Matrix4 && (this.transform = o), this;
  }
  load(o, c, v, S) {
    const A = this;
    return super.load(
      o,
      (C) => {
        try {
          const l = A.parse(C);
          c(l);
        } catch (l) {
          S(l);
        }
      },
      v,
      S
    );
  }
  parse(o) {
    const c = this, v = c.parseToGeoJson(o);
    if (!v)
      return null;
    const S = new Ne();
    return S.setColor(c.color), S.setTransform(c.transform), S.parse(v);
  }
  parseToGeoJson(o) {
    if (!o)
      return null;
    let c = null;
    const v = window || {};
    return typeof o == "string" ? c = new DOMParser().parseFromString(o, "text/xml") : (v.Node && o instanceof v.Node || console.warn("Unsupported input", o), c = o), Le.kml(c, { styles: !0 });
  }
}
export {
  Fe as KmlLoader
};
