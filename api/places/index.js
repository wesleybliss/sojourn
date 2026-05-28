import { createRequire } from 'module'; const require = createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except2, desc2) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except2)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc(from, key)) || desc2.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/.pnpm/dayjs@1.11.20/node_modules/dayjs/dayjs.min.js
var require_dayjs_min = __commonJS({
  "../../node_modules/.pnpm/dayjs@1.11.20/node_modules/dayjs/dayjs.min.js"(exports, module) {
    !(function(t, e) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e();
    })(exports, (function() {
      "use strict";
      var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
        var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
        return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
      } }, m = function(t2, e2, n2) {
        var r2 = String(t2);
        return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
      }, v = { s: m, z: function(t2) {
        var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
        return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
      }, m: function t2(e2, n2) {
        if (e2.date() < n2.date()) return -t2(n2, e2);
        var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
        return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
      }, a: function(t2) {
        return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
      }, p: function(t2) {
        return { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t2) {
        return void 0 === t2;
      } }, g = "en", D = {};
      D[g] = M;
      var p = "$isDayjsObject", S = function(t2) {
        return t2 instanceof _ || !(!t2 || !t2[p]);
      }, w = function t2(e2, n2, r2) {
        var i2;
        if (!e2) return g;
        if ("string" == typeof e2) {
          var s2 = e2.toLowerCase();
          D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
          var u2 = e2.split("-");
          if (!i2 && u2.length > 1) return t2(u2[0]);
        } else {
          var a2 = e2.name;
          D[a2] = e2, i2 = a2;
        }
        return !r2 && i2 && (g = i2), i2 || !r2 && g;
      }, O = function(t2, e2) {
        if (S(t2)) return t2.clone();
        var n2 = "object" == typeof e2 ? e2 : {};
        return n2.date = t2, n2.args = arguments, new _(n2);
      }, b = v;
      b.l = w, b.i = S, b.w = function(t2, e2) {
        return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
      };
      var _ = (function() {
        function M2(t2) {
          this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
        }
        var m2 = M2.prototype;
        return m2.parse = function(t2) {
          this.$d = (function(t3) {
            var e2 = t3.date, n2 = t3.utc;
            if (null === e2) return /* @__PURE__ */ new Date(NaN);
            if (b.u(e2)) return /* @__PURE__ */ new Date();
            if (e2 instanceof Date) return new Date(e2);
            if ("string" == typeof e2 && !/Z$/i.test(e2)) {
              var r2 = e2.match($);
              if (r2) {
                var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
                return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
              }
            }
            return new Date(e2);
          })(t2), this.init();
        }, m2.init = function() {
          var t2 = this.$d;
          this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
        }, m2.$utils = function() {
          return b;
        }, m2.isValid = function() {
          return !(this.$d.toString() === l);
        }, m2.isSame = function(t2, e2) {
          var n2 = O(t2);
          return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
        }, m2.isAfter = function(t2, e2) {
          return O(t2) < this.startOf(e2);
        }, m2.isBefore = function(t2, e2) {
          return this.endOf(e2) < O(t2);
        }, m2.$g = function(t2, e2, n2) {
          return b.u(t2) ? this[e2] : this.set(n2, t2);
        }, m2.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m2.valueOf = function() {
          return this.$d.getTime();
        }, m2.startOf = function(t2, e2) {
          var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t2), l2 = function(t3, e3) {
            var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
            return r2 ? i2 : i2.endOf(a);
          }, $2 = function(t3, e3) {
            return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
          }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
          switch (f2) {
            case h:
              return r2 ? l2(1, 0) : l2(31, 11);
            case c:
              return r2 ? l2(1, M3) : l2(0, M3 + 1);
            case o:
              var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
              return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
            case a:
            case d:
              return $2(v2 + "Hours", 0);
            case u:
              return $2(v2 + "Minutes", 1);
            case s:
              return $2(v2 + "Seconds", 2);
            case i:
              return $2(v2 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m2.endOf = function(t2) {
          return this.startOf(t2, false);
        }, m2.$set = function(t2, e2) {
          var n2, o2 = b.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
          if (o2 === c || o2 === h) {
            var y2 = this.clone().set(d, 1);
            y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
          } else l2 && this.$d[l2]($2);
          return this.init(), this;
        }, m2.set = function(t2, e2) {
          return this.clone().$set(t2, e2);
        }, m2.get = function(t2) {
          return this[b.p(t2)]();
        }, m2.add = function(r2, f2) {
          var d2, l2 = this;
          r2 = Number(r2);
          var $2 = b.p(f2), y2 = function(t2) {
            var e2 = O(l2);
            return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
          };
          if ($2 === c) return this.set(c, this.$M + r2);
          if ($2 === h) return this.set(h, this.$y + r2);
          if ($2 === a) return y2(1);
          if ($2 === o) return y2(7);
          var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
          return b.w(m3, this);
        }, m2.subtract = function(t2, e2) {
          return this.add(-1 * t2, e2);
        }, m2.format = function(t2) {
          var e2 = this, n2 = this.$locale();
          if (!this.isValid()) return n2.invalidDate || l;
          var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a2 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i3, s3) {
            return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
          }, d2 = function(t3) {
            return b.s(s2 % 12 || 12, t3, "0");
          }, $2 = f2 || function(t3, e3, n3) {
            var r3 = t3 < 12 ? "AM" : "PM";
            return n3 ? r3.toLowerCase() : r3;
          };
          return r2.replace(y, (function(t3, r3) {
            return r3 || (function(t4) {
              switch (t4) {
                case "YY":
                  return String(e2.$y).slice(-2);
                case "YYYY":
                  return b.s(e2.$y, 4, "0");
                case "M":
                  return a2 + 1;
                case "MM":
                  return b.s(a2 + 1, 2, "0");
                case "MMM":
                  return h2(n2.monthsShort, a2, c2, 3);
                case "MMMM":
                  return h2(c2, a2);
                case "D":
                  return e2.$D;
                case "DD":
                  return b.s(e2.$D, 2, "0");
                case "d":
                  return String(e2.$W);
                case "dd":
                  return h2(n2.weekdaysMin, e2.$W, o2, 2);
                case "ddd":
                  return h2(n2.weekdaysShort, e2.$W, o2, 3);
                case "dddd":
                  return o2[e2.$W];
                case "H":
                  return String(s2);
                case "HH":
                  return b.s(s2, 2, "0");
                case "h":
                  return d2(1);
                case "hh":
                  return d2(2);
                case "a":
                  return $2(s2, u2, true);
                case "A":
                  return $2(s2, u2, false);
                case "m":
                  return String(u2);
                case "mm":
                  return b.s(u2, 2, "0");
                case "s":
                  return String(e2.$s);
                case "ss":
                  return b.s(e2.$s, 2, "0");
                case "SSS":
                  return b.s(e2.$ms, 3, "0");
                case "Z":
                  return i2;
              }
              return null;
            })(t3) || i2.replace(":", "");
          }));
        }, m2.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m2.diff = function(r2, d2, l2) {
          var $2, y2 = this, M3 = b.p(d2), m3 = O(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
            return b.m(y2, m3);
          };
          switch (M3) {
            case h:
              $2 = D2() / 12;
              break;
            case c:
              $2 = D2();
              break;
            case f:
              $2 = D2() / 3;
              break;
            case o:
              $2 = (g2 - v2) / 6048e5;
              break;
            case a:
              $2 = (g2 - v2) / 864e5;
              break;
            case u:
              $2 = g2 / n;
              break;
            case s:
              $2 = g2 / e;
              break;
            case i:
              $2 = g2 / t;
              break;
            default:
              $2 = g2;
          }
          return l2 ? $2 : b.a($2);
        }, m2.daysInMonth = function() {
          return this.endOf(c).$D;
        }, m2.$locale = function() {
          return D[this.$L];
        }, m2.locale = function(t2, e2) {
          if (!t2) return this.$L;
          var n2 = this.clone(), r2 = w(t2, e2, true);
          return r2 && (n2.$L = r2), n2;
        }, m2.clone = function() {
          return b.w(this.$d, this);
        }, m2.toDate = function() {
          return new Date(this.valueOf());
        }, m2.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m2.toISOString = function() {
          return this.$d.toISOString();
        }, m2.toString = function() {
          return this.$d.toUTCString();
        }, M2;
      })(), k = _.prototype;
      return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach((function(t2) {
        k[t2[1]] = function(e2) {
          return this.$g(e2, t2[0], t2[1]);
        };
      })), O.extend = function(t2, e2) {
        return t2.$i || (t2(e2, _, O), t2.$i = true), O;
      }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {
        return O(1e3 * t2);
      }, O.en = D[g], O.Ls = D, O.p = {}, O;
    }));
  }
});

// ../../node_modules/.pnpm/dotenv@17.4.2/node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "../../node_modules/.pnpm/dotenv@17.4.2/node_modules/dotenv/lib/main.js"(exports, module) {
    var fs = __require("fs");
    var path = __require("path");
    var os = __require("os");
    var crypto2 = __require("crypto");
    var TIPS = [
      "\u25C8 encrypted .env [www.dotenvx.com]",
      "\u25C8 secrets for agents [www.dotenvx.com]",
      "\u2301 auth for agents [www.vestauth.com]",
      "\u2318 custom filepath { path: '/custom/path/.env' }",
      "\u2318 enable debugging { debug: true }",
      "\u2318 override existing { override: true }",
      "\u2318 suppress logs { quiet: true }",
      "\u2318 multiple files { path: ['.env.local', '.env'] }"
    ];
    function _getRandomTip() {
      return TIPS[Math.floor(Math.random() * TIPS.length)];
    }
    function parseBoolean(value) {
      if (typeof value === "string") {
        return !["false", "0", "no", "off", ""].includes(value.toLowerCase());
      }
      return Boolean(value);
    }
    function supportsAnsi() {
      return process.stdout.isTTY;
    }
    function dim(text3) {
      return supportsAnsi() ? `\x1B[2m${text3}\x1B[0m` : text3;
    }
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      options = options || {};
      const vaultPath = _vaultPath(options);
      options.path = vaultPath;
      const result = DotenvModule.configDotenv(options);
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _warn(message) {
      console.error(`\u26A0 ${message}`);
    }
    function _debug(message) {
      console.log(`\u2506 ${message}`);
    }
    function _log(message) {
      console.log(`\u25C7 ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path.resolve(process.cwd(), ".env.vault");
      }
      if (fs.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      const debug = parseBoolean(process.env.DOTENV_CONFIG_DEBUG || options && options.debug);
      const quiet = parseBoolean(process.env.DOTENV_CONFIG_QUIET || options && options.quiet);
      if (debug || !quiet) {
        _log("loading env from encrypted .env.vault");
      }
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      let debug = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || options && options.debug);
      let quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || options && options.quiet);
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("no encoding is specified (UTF-8 is used by default)");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path2 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs.readFileSync(path2, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`failed to load ${path2} ${e.message}`);
          }
          lastError = e;
        }
      }
      const populated = DotenvModule.populate(processEnv, parsedAll, options);
      debug = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || debug);
      quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || quiet);
      if (debug || !quiet) {
        const keysCount = Object.keys(populated).length;
        const shortPaths = [];
        for (const filePath of optionPaths) {
          try {
            const relative = path.relative(process.cwd(), filePath);
            shortPaths.push(relative);
          } catch (e) {
            if (debug) {
              _debug(`failed to load ${filePath} ${e.message}`);
            }
            lastError = e;
          }
        }
        _log(`injected env (${keysCount}) from ${shortPaths.join(",")} ${dim(`// tip: ${_getRandomTip()}`)}`);
      }
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config2(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`you set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto2.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      const populated = {};
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
            populated[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
          populated[key] = parsed[key];
        }
      }
      return populated;
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config: config2,
      decrypt,
      parse,
      populate
    };
    module.exports.configDotenv = DotenvModule.configDotenv;
    module.exports._configVault = DotenvModule._configVault;
    module.exports._parseVault = DotenvModule._parseVault;
    module.exports.config = DotenvModule.config;
    module.exports.decrypt = DotenvModule.decrypt;
    module.exports.parse = DotenvModule.parse;
    module.exports.populate = DotenvModule.populate;
    module.exports = DotenvModule;
  }
});

// ../../node_modules/.pnpm/dotenv@17.4.2/node_modules/dotenv/lib/env-options.js
var require_env_options = __commonJS({
  "../../node_modules/.pnpm/dotenv@17.4.2/node_modules/dotenv/lib/env-options.js"(exports, module) {
    var options = {};
    if (process.env.DOTENV_CONFIG_ENCODING != null) {
      options.encoding = process.env.DOTENV_CONFIG_ENCODING;
    }
    if (process.env.DOTENV_CONFIG_PATH != null) {
      options.path = process.env.DOTENV_CONFIG_PATH;
    }
    if (process.env.DOTENV_CONFIG_QUIET != null) {
      options.quiet = process.env.DOTENV_CONFIG_QUIET;
    }
    if (process.env.DOTENV_CONFIG_DEBUG != null) {
      options.debug = process.env.DOTENV_CONFIG_DEBUG;
    }
    if (process.env.DOTENV_CONFIG_OVERRIDE != null) {
      options.override = process.env.DOTENV_CONFIG_OVERRIDE;
    }
    if (process.env.DOTENV_CONFIG_DOTENV_KEY != null) {
      options.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY;
    }
    module.exports = options;
  }
});

// ../../node_modules/.pnpm/dotenv@17.4.2/node_modules/dotenv/lib/cli-options.js
var require_cli_options = __commonJS({
  "../../node_modules/.pnpm/dotenv@17.4.2/node_modules/dotenv/lib/cli-options.js"(exports, module) {
    var re = /^dotenv_config_(encoding|path|quiet|debug|override|DOTENV_KEY)=(.+)$/;
    module.exports = function optionMatcher(args) {
      const options = args.reduce(function(acc, cur) {
        const matches = cur.match(re);
        if (matches) {
          acc[matches[1]] = matches[2];
        }
        return acc;
      }, {});
      if (!("quiet" in options)) {
        options.quiet = "true";
      }
      return options;
    };
  }
});

// ../../node_modules/.pnpm/@neon-rs+load@0.0.4/node_modules/@neon-rs/load/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/.pnpm/@neon-rs+load@0.0.4/node_modules/@neon-rs/load/dist/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc2 = Object.getOwnPropertyDescriptor(m, k);
      if (!desc2 || ("get" in desc2 ? !m.__esModule : desc2.writable || desc2.configurable)) {
        desc2 = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc2);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.load = exports.currentTarget = void 0;
    var path = __importStar(__require("path"));
    var fs = __importStar(__require("fs"));
    function currentTarget() {
      let os = null;
      switch (process.platform) {
        case "android":
          switch (process.arch) {
            case "arm":
              return "android-arm-eabi";
            case "arm64":
              return "android-arm64";
          }
          os = "Android";
          break;
        case "win32":
          switch (process.arch) {
            case "x64":
              return "win32-x64-msvc";
            case "arm64":
              return "win32-arm64-msvc";
            case "ia32":
              return "win32-ia32-msvc";
          }
          os = "Windows";
          break;
        case "darwin":
          switch (process.arch) {
            case "x64":
              return "darwin-x64";
            case "arm64":
              return "darwin-arm64";
          }
          os = "macOS";
          break;
        case "linux":
          switch (process.arch) {
            case "x64":
            case "arm64":
              return isGlibc() ? `linux-${process.arch}-gnu` : `linux-${process.arch}-musl`;
            case "arm":
              return "linux-arm-gnueabihf";
          }
          os = "Linux";
          break;
        case "freebsd":
          if (process.arch === "x64") {
            return "freebsd-x64";
          }
          os = "FreeBSD";
          break;
      }
      if (os) {
        throw new Error(`Neon: unsupported ${os} architecture: ${process.arch}`);
      }
      throw new Error(`Neon: unsupported system: ${process.platform}`);
    }
    exports.currentTarget = currentTarget;
    function isGlibc() {
      const report = process.report?.getReport();
      if (typeof report !== "object" || !report || !("header" in report)) {
        return false;
      }
      const header = report.header;
      return typeof header === "object" && !!header && "glibcVersionRuntime" in header;
    }
    function load(dirname) {
      const m = path.join(dirname, "index.node");
      return fs.existsSync(m) ? __require(m) : null;
    }
    exports.load = load;
  }
});

// ../../node_modules/.pnpm/detect-libc@2.0.2/node_modules/detect-libc/lib/process.js
var require_process = __commonJS({
  "../../node_modules/.pnpm/detect-libc@2.0.2/node_modules/detect-libc/lib/process.js"(exports, module) {
    "use strict";
    var isLinux = () => process.platform === "linux";
    var report = null;
    var getReport = () => {
      if (!report) {
        report = isLinux() && process.report ? process.report.getReport() : {};
      }
      return report;
    };
    module.exports = { isLinux, getReport };
  }
});

// ../../node_modules/.pnpm/detect-libc@2.0.2/node_modules/detect-libc/lib/filesystem.js
var require_filesystem = __commonJS({
  "../../node_modules/.pnpm/detect-libc@2.0.2/node_modules/detect-libc/lib/filesystem.js"(exports, module) {
    "use strict";
    var fs = __require("fs");
    var LDD_PATH = "/usr/bin/ldd";
    var readFileSync = (path) => fs.readFileSync(path, "utf-8");
    var readFile = (path) => new Promise((resolve, reject) => {
      fs.readFile(path, "utf-8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    module.exports = {
      LDD_PATH,
      readFileSync,
      readFile
    };
  }
});

// ../../node_modules/.pnpm/detect-libc@2.0.2/node_modules/detect-libc/lib/detect-libc.js
var require_detect_libc = __commonJS({
  "../../node_modules/.pnpm/detect-libc@2.0.2/node_modules/detect-libc/lib/detect-libc.js"(exports, module) {
    "use strict";
    var childProcess = __require("child_process");
    var { isLinux, getReport } = require_process();
    var { LDD_PATH, readFile, readFileSync } = require_filesystem();
    var cachedFamilyFilesystem;
    var cachedVersionFilesystem;
    var command = "getconf GNU_LIBC_VERSION 2>&1 || true; ldd --version 2>&1 || true";
    var commandOut = "";
    var safeCommand = () => {
      if (!commandOut) {
        return new Promise((resolve) => {
          childProcess.exec(command, (err, out) => {
            commandOut = err ? " " : out;
            resolve(commandOut);
          });
        });
      }
      return commandOut;
    };
    var safeCommandSync = () => {
      if (!commandOut) {
        try {
          commandOut = childProcess.execSync(command, { encoding: "utf8" });
        } catch (_err) {
          commandOut = " ";
        }
      }
      return commandOut;
    };
    var GLIBC = "glibc";
    var RE_GLIBC_VERSION = /GLIBC\s(\d+\.\d+)/;
    var MUSL = "musl";
    var GLIBC_ON_LDD = GLIBC.toUpperCase();
    var MUSL_ON_LDD = MUSL.toLowerCase();
    var isFileMusl = (f) => f.includes("libc.musl-") || f.includes("ld-musl-");
    var familyFromReport = () => {
      const report = getReport();
      if (report.header && report.header.glibcVersionRuntime) {
        return GLIBC;
      }
      if (Array.isArray(report.sharedObjects)) {
        if (report.sharedObjects.some(isFileMusl)) {
          return MUSL;
        }
      }
      return null;
    };
    var familyFromCommand = (out) => {
      const [getconf, ldd1] = out.split(/[\r\n]+/);
      if (getconf && getconf.includes(GLIBC)) {
        return GLIBC;
      }
      if (ldd1 && ldd1.includes(MUSL)) {
        return MUSL;
      }
      return null;
    };
    var getFamilyFromLddContent = (content) => {
      if (content.includes(MUSL_ON_LDD)) {
        return MUSL;
      }
      if (content.includes(GLIBC_ON_LDD)) {
        return GLIBC;
      }
      return null;
    };
    var familyFromFilesystem = async () => {
      if (cachedFamilyFilesystem !== void 0) {
        return cachedFamilyFilesystem;
      }
      cachedFamilyFilesystem = null;
      try {
        const lddContent = await readFile(LDD_PATH);
        cachedFamilyFilesystem = getFamilyFromLddContent(lddContent);
      } catch (e) {
      }
      return cachedFamilyFilesystem;
    };
    var familyFromFilesystemSync = () => {
      if (cachedFamilyFilesystem !== void 0) {
        return cachedFamilyFilesystem;
      }
      cachedFamilyFilesystem = null;
      try {
        const lddContent = readFileSync(LDD_PATH);
        cachedFamilyFilesystem = getFamilyFromLddContent(lddContent);
      } catch (e) {
      }
      return cachedFamilyFilesystem;
    };
    var family = async () => {
      let family2 = null;
      if (isLinux()) {
        family2 = await familyFromFilesystem();
        if (!family2) {
          family2 = familyFromReport();
        }
        if (!family2) {
          const out = await safeCommand();
          family2 = familyFromCommand(out);
        }
      }
      return family2;
    };
    var familySync = () => {
      let family2 = null;
      if (isLinux()) {
        family2 = familyFromFilesystemSync();
        if (!family2) {
          family2 = familyFromReport();
        }
        if (!family2) {
          const out = safeCommandSync();
          family2 = familyFromCommand(out);
        }
      }
      return family2;
    };
    var isNonGlibcLinux = async () => isLinux() && await family() !== GLIBC;
    var isNonGlibcLinuxSync = () => isLinux() && familySync() !== GLIBC;
    var versionFromFilesystem = async () => {
      if (cachedVersionFilesystem !== void 0) {
        return cachedVersionFilesystem;
      }
      cachedVersionFilesystem = null;
      try {
        const lddContent = await readFile(LDD_PATH);
        const versionMatch = lddContent.match(RE_GLIBC_VERSION);
        if (versionMatch) {
          cachedVersionFilesystem = versionMatch[1];
        }
      } catch (e) {
      }
      return cachedVersionFilesystem;
    };
    var versionFromFilesystemSync = () => {
      if (cachedVersionFilesystem !== void 0) {
        return cachedVersionFilesystem;
      }
      cachedVersionFilesystem = null;
      try {
        const lddContent = readFileSync(LDD_PATH);
        const versionMatch = lddContent.match(RE_GLIBC_VERSION);
        if (versionMatch) {
          cachedVersionFilesystem = versionMatch[1];
        }
      } catch (e) {
      }
      return cachedVersionFilesystem;
    };
    var versionFromReport = () => {
      const report = getReport();
      if (report.header && report.header.glibcVersionRuntime) {
        return report.header.glibcVersionRuntime;
      }
      return null;
    };
    var versionSuffix = (s) => s.trim().split(/\s+/)[1];
    var versionFromCommand = (out) => {
      const [getconf, ldd1, ldd2] = out.split(/[\r\n]+/);
      if (getconf && getconf.includes(GLIBC)) {
        return versionSuffix(getconf);
      }
      if (ldd1 && ldd2 && ldd1.includes(MUSL)) {
        return versionSuffix(ldd2);
      }
      return null;
    };
    var version2 = async () => {
      let version3 = null;
      if (isLinux()) {
        version3 = await versionFromFilesystem();
        if (!version3) {
          version3 = versionFromReport();
        }
        if (!version3) {
          const out = await safeCommand();
          version3 = versionFromCommand(out);
        }
      }
      return version3;
    };
    var versionSync = () => {
      let version3 = null;
      if (isLinux()) {
        version3 = versionFromFilesystemSync();
        if (!version3) {
          version3 = versionFromReport();
        }
        if (!version3) {
          const out = safeCommandSync();
          version3 = versionFromCommand(out);
        }
      }
      return version3;
    };
    module.exports = {
      GLIBC,
      MUSL,
      family,
      familySync,
      isNonGlibcLinux,
      isNonGlibcLinuxSync,
      version: version2,
      versionSync
    };
  }
});

// ../../node_modules/.pnpm/libsql@0.5.29/node_modules/libsql/auth.js
var require_auth = __commonJS({
  "../../node_modules/.pnpm/libsql@0.5.29/node_modules/libsql/auth.js"(exports, module) {
    var Authorization = {
      /**
       * Allow access to a resource.
       * @type {number}
       */
      ALLOW: 0,
      /**
       * Deny access to a resource and throw an error in `prepare()`.
       * @type {number}
       */
      DENY: 1
    };
    module.exports = Authorization;
  }
});

// ../../node_modules/.pnpm/libsql@0.5.29/node_modules/libsql/sqlite-error.js
var require_sqlite_error = __commonJS({
  "../../node_modules/.pnpm/libsql@0.5.29/node_modules/libsql/sqlite-error.js"(exports, module) {
    "use strict";
    var descriptor = { value: "SqliteError", writable: true, enumerable: false, configurable: true };
    function SqliteError(message, code, rawCode) {
      if (new.target !== SqliteError) {
        return new SqliteError(message, code);
      }
      if (typeof code !== "string") {
        throw new TypeError("Expected second argument to be a string");
      }
      Error.call(this, message);
      descriptor.value = "" + message;
      Object.defineProperty(this, "message", descriptor);
      Error.captureStackTrace(this, SqliteError);
      this.code = code;
      this.rawCode = rawCode;
    }
    Object.setPrototypeOf(SqliteError, Error);
    Object.setPrototypeOf(SqliteError.prototype, Error.prototype);
    Object.defineProperty(SqliteError.prototype, "name", descriptor);
    module.exports = SqliteError;
  }
});

// ../../node_modules/.pnpm/libsql@0.5.29/node_modules/libsql/index.js
var require_libsql = __commonJS({
  "../../node_modules/.pnpm/libsql@0.5.29/node_modules/libsql/index.js"(exports, module) {
    "use strict";
    var { load, currentTarget } = require_dist();
    var { familySync, GLIBC, MUSL } = require_detect_libc();
    function requireNative() {
      if (process.env.LIBSQL_JS_DEV) {
        return load(__dirname);
      }
      let target = currentTarget();
      if (familySync() == GLIBC) {
        switch (target) {
          case "linux-x64-musl":
            target = "linux-x64-gnu";
            break;
          case "linux-arm64-musl":
            target = "linux-arm64-gnu";
            break;
        }
      }
      if (target === "linux-arm-gnueabihf" && familySync() == MUSL) {
        target = "linux-arm-musleabihf";
      }
      return __require(`@libsql/${target}`);
    }
    var {
      databaseOpen,
      databaseOpenWithSync,
      databaseInTransaction,
      databaseInterrupt,
      databaseClose,
      databaseSyncSync,
      databaseSyncUntilSync,
      databaseExecSync,
      databasePrepareSync,
      databaseDefaultSafeIntegers,
      databaseAuthorizer,
      databaseLoadExtension,
      databaseMaxWriteReplicationIndex,
      statementRaw,
      statementIsReader,
      statementGet,
      statementRun,
      statementInterrupt,
      statementRowsSync,
      statementColumns,
      statementSafeIntegers,
      rowsNext
    } = requireNative();
    var Authorization = require_auth();
    var SqliteError = require_sqlite_error();
    function convertError(err) {
      if (err.libsqlError) {
        return new SqliteError(err.message, err.code, err.rawCode);
      }
      return err;
    }
    var Database2 = class {
      /**
       * Creates a new database connection. If the database file pointed to by `path` does not exists, it will be created.
       *
       * @constructor
       * @param {string} path - Path to the database file.
       */
      constructor(path, opts) {
        const encryptionCipher = opts?.encryptionCipher ?? "aes256cbc";
        if (opts && opts.syncUrl) {
          var authToken = "";
          if (opts.syncAuth) {
            console.warn("Warning: The `syncAuth` option is deprecated, please use `authToken` option instead.");
            authToken = opts.syncAuth;
          } else if (opts.authToken) {
            authToken = opts.authToken;
          }
          const encryptionKey = opts?.encryptionKey ?? "";
          const syncPeriod = opts?.syncPeriod ?? 0;
          const readYourWrites = opts?.readYourWrites ?? true;
          const offline = opts?.offline ?? false;
          const remoteEncryptionKey = opts?.remoteEncryptionKey ?? "";
          this.db = databaseOpenWithSync(path, opts.syncUrl, authToken, encryptionCipher, encryptionKey, syncPeriod, readYourWrites, offline, remoteEncryptionKey);
        } else {
          const authToken2 = opts?.authToken ?? "";
          const encryptionKey = opts?.encryptionKey ?? "";
          const timeout = opts?.timeout ?? 0;
          const remoteEncryptionKey = opts?.remoteEncryptionKey ?? "";
          this.db = databaseOpen(path, authToken2, encryptionCipher, encryptionKey, timeout, remoteEncryptionKey);
        }
        this.memory = path === ":memory:";
        this.readonly = false;
        this.name = "";
        this.open = true;
        const db2 = this.db;
        Object.defineProperties(this, {
          inTransaction: {
            get() {
              return databaseInTransaction(db2);
            }
          }
        });
      }
      sync() {
        return databaseSyncSync.call(this.db);
      }
      syncUntil(replicationIndex) {
        return databaseSyncUntilSync.call(this.db, replicationIndex);
      }
      /**
       * Prepares a SQL statement for execution.
       *
       * @param {string} sql - The SQL statement string to prepare.
       */
      prepare(sql2) {
        try {
          const stmt = databasePrepareSync.call(this.db, sql2);
          return new Statement(stmt);
        } catch (err) {
          throw convertError(err);
        }
      }
      /**
       * Returns a function that executes the given function in a transaction.
       *
       * @param {function} fn - The function to wrap in a transaction.
       */
      transaction(fn) {
        if (typeof fn !== "function")
          throw new TypeError("Expected first argument to be a function");
        const db2 = this;
        const wrapTxn = (mode) => {
          return (...bindParameters) => {
            db2.exec("BEGIN " + mode);
            try {
              const result = fn(...bindParameters);
              db2.exec("COMMIT");
              return result;
            } catch (err) {
              db2.exec("ROLLBACK");
              throw err;
            }
          };
        };
        const properties = {
          default: { value: wrapTxn("") },
          deferred: { value: wrapTxn("DEFERRED") },
          immediate: { value: wrapTxn("IMMEDIATE") },
          exclusive: { value: wrapTxn("EXCLUSIVE") },
          database: { value: this, enumerable: true }
        };
        Object.defineProperties(properties.default.value, properties);
        Object.defineProperties(properties.deferred.value, properties);
        Object.defineProperties(properties.immediate.value, properties);
        Object.defineProperties(properties.exclusive.value, properties);
        return properties.default.value;
      }
      pragma(source, options) {
        if (options == null) options = {};
        if (typeof source !== "string") throw new TypeError("Expected first argument to be a string");
        if (typeof options !== "object") throw new TypeError("Expected second argument to be an options object");
        const simple = options["simple"];
        const stmt = this.prepare(`PRAGMA ${source}`, this, true);
        return simple ? stmt.pluck().get() : stmt.all();
      }
      backup(filename, options) {
        throw new Error("not implemented");
      }
      serialize(options) {
        throw new Error("not implemented");
      }
      function(name2, options, fn) {
        if (options == null) options = {};
        if (typeof options === "function") {
          fn = options;
          options = {};
        }
        if (typeof name2 !== "string")
          throw new TypeError("Expected first argument to be a string");
        if (typeof fn !== "function")
          throw new TypeError("Expected last argument to be a function");
        if (typeof options !== "object")
          throw new TypeError("Expected second argument to be an options object");
        if (!name2)
          throw new TypeError(
            "User-defined function name cannot be an empty string"
          );
        throw new Error("not implemented");
      }
      aggregate(name2, options) {
        if (typeof name2 !== "string")
          throw new TypeError("Expected first argument to be a string");
        if (typeof options !== "object" || options === null)
          throw new TypeError("Expected second argument to be an options object");
        if (!name2)
          throw new TypeError(
            "User-defined function name cannot be an empty string"
          );
        throw new Error("not implemented");
      }
      table(name2, factory) {
        if (typeof name2 !== "string")
          throw new TypeError("Expected first argument to be a string");
        if (!name2)
          throw new TypeError(
            "Virtual table module name cannot be an empty string"
          );
        throw new Error("not implemented");
      }
      authorizer(rules) {
        databaseAuthorizer.call(this.db, rules);
      }
      loadExtension(...args) {
        databaseLoadExtension.call(this.db, ...args);
      }
      maxWriteReplicationIndex() {
        return databaseMaxWriteReplicationIndex.call(this.db);
      }
      /**
       * Executes a SQL statement.
       *
       * @param {string} sql - The SQL statement string to execute.
       */
      exec(sql2) {
        try {
          databaseExecSync.call(this.db, sql2);
        } catch (err) {
          throw convertError(err);
        }
      }
      /**
       * Interrupts the database connection.
       */
      interrupt() {
        databaseInterrupt.call(this.db);
      }
      /**
       * Closes the database connection.
       */
      close() {
        databaseClose.call(this.db);
        this.open = false;
      }
      /**
       * Toggle 64-bit integer support.
       */
      defaultSafeIntegers(toggle) {
        databaseDefaultSafeIntegers.call(this.db, toggle ?? true);
        return this;
      }
      unsafeMode(...args) {
        throw new Error("not implemented");
      }
    };
    var Statement = class {
      constructor(stmt) {
        this.stmt = stmt;
        this.pluckMode = false;
      }
      /**
       * Toggle raw mode.
       *
       * @param raw Enable or disable raw mode. If you don't pass the parameter, raw mode is enabled.
       */
      raw(raw) {
        statementRaw.call(this.stmt, raw ?? true);
        return this;
      }
      /**
       * Toggle pluck mode.
       *
       * @param pluckMode Enable or disable pluck mode. If you don't pass the parameter, pluck mode is enabled.
       */
      pluck(pluckMode) {
        this.pluckMode = pluckMode ?? true;
        return this;
      }
      get reader() {
        return statementIsReader.call(this.stmt);
      }
      /**
       * Executes the SQL statement and returns an info object.
       */
      run(...bindParameters) {
        try {
          if (bindParameters.length == 1 && typeof bindParameters[0] === "object") {
            return statementRun.call(this.stmt, bindParameters[0]);
          } else {
            return statementRun.call(this.stmt, bindParameters.flat());
          }
        } catch (err) {
          throw convertError(err);
        }
      }
      /**
       * Executes the SQL statement and returns the first row.
       *
       * @param bindParameters - The bind parameters for executing the statement.
       */
      get(...bindParameters) {
        try {
          if (bindParameters.length == 1 && typeof bindParameters[0] === "object") {
            return statementGet.call(this.stmt, bindParameters[0]);
          } else {
            return statementGet.call(this.stmt, bindParameters.flat());
          }
        } catch (err) {
          throw convertError(err);
        }
      }
      /**
       * Executes the SQL statement and returns an iterator to the resulting rows.
       *
       * @param bindParameters - The bind parameters for executing the statement.
       */
      iterate(...bindParameters) {
        var rows = void 0;
        if (bindParameters.length == 1 && typeof bindParameters[0] === "object") {
          rows = statementRowsSync.call(this.stmt, bindParameters[0]);
        } else {
          rows = statementRowsSync.call(this.stmt, bindParameters.flat());
        }
        const iter = {
          nextRows: Array(100),
          nextRowIndex: 100,
          next() {
            try {
              if (this.nextRowIndex === 100) {
                rowsNext.call(rows, this.nextRows);
                this.nextRowIndex = 0;
              }
              const row = this.nextRows[this.nextRowIndex];
              this.nextRows[this.nextRowIndex] = void 0;
              if (!row) {
                return { done: true };
              }
              this.nextRowIndex++;
              return { value: row, done: false };
            } catch (err) {
              throw convertError(err);
            }
          },
          [Symbol.iterator]() {
            return this;
          }
        };
        return iter;
      }
      /**
       * Executes the SQL statement and returns an array of the resulting rows.
       *
       * @param bindParameters - The bind parameters for executing the statement.
       */
      all(...bindParameters) {
        try {
          const result = [];
          for (const row of this.iterate(...bindParameters)) {
            if (this.pluckMode) {
              result.push(row[Object.keys(row)[0]]);
            } else {
              result.push(row);
            }
          }
          return result;
        } catch (err) {
          throw convertError(err);
        }
      }
      /**
       * Interrupts the statement.
       */
      interrupt() {
        statementInterrupt.call(this.stmt);
      }
      /**
       * Returns the columns in the result set returned by this prepared statement.
       */
      columns() {
        return statementColumns.call(this.stmt);
      }
      /**
       * Toggle 64-bit integer support.
       */
      safeIntegers(toggle) {
        statementSafeIntegers.call(this.stmt, toggle ?? true);
        return this;
      }
    };
    module.exports = Database2;
    module.exports.Authorization = Authorization;
    module.exports.SqliteError = SqliteError;
  }
});

// ../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/constants.js
var require_constants = __commonJS({
  "../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/constants.js"(exports, module) {
    "use strict";
    var BINARY_TYPES = ["nodebuffer", "arraybuffer", "fragments"];
    var hasBlob = typeof Blob !== "undefined";
    if (hasBlob) BINARY_TYPES.push("blob");
    module.exports = {
      BINARY_TYPES,
      CLOSE_TIMEOUT: 3e4,
      EMPTY_BUFFER: Buffer.alloc(0),
      GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
      hasBlob,
      kForOnEventAttribute: /* @__PURE__ */ Symbol("kIsForOnEventAttribute"),
      kListener: /* @__PURE__ */ Symbol("kListener"),
      kStatusCode: /* @__PURE__ */ Symbol("status-code"),
      kWebSocket: /* @__PURE__ */ Symbol("websocket"),
      NOOP: () => {
      }
    };
  }
});

// ../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/buffer-util.js
var require_buffer_util = __commonJS({
  "../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/buffer-util.js"(exports, module) {
    "use strict";
    var { EMPTY_BUFFER } = require_constants();
    var FastBuffer = Buffer[Symbol.species];
    function concat(list, totalLength) {
      if (list.length === 0) return EMPTY_BUFFER;
      if (list.length === 1) return list[0];
      const target = Buffer.allocUnsafe(totalLength);
      let offset = 0;
      for (let i = 0; i < list.length; i++) {
        const buf = list[i];
        target.set(buf, offset);
        offset += buf.length;
      }
      if (offset < totalLength) {
        return new FastBuffer(target.buffer, target.byteOffset, offset);
      }
      return target;
    }
    function _mask(source, mask, output, offset, length) {
      for (let i = 0; i < length; i++) {
        output[offset + i] = source[i] ^ mask[i & 3];
      }
    }
    function _unmask(buffer, mask) {
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] ^= mask[i & 3];
      }
    }
    function toArrayBuffer(buf) {
      if (buf.length === buf.buffer.byteLength) {
        return buf.buffer;
      }
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
    }
    function toBuffer(data) {
      toBuffer.readOnly = true;
      if (Buffer.isBuffer(data)) return data;
      let buf;
      if (data instanceof ArrayBuffer) {
        buf = new FastBuffer(data);
      } else if (ArrayBuffer.isView(data)) {
        buf = new FastBuffer(data.buffer, data.byteOffset, data.byteLength);
      } else {
        buf = Buffer.from(data);
        toBuffer.readOnly = false;
      }
      return buf;
    }
    module.exports = {
      concat,
      mask: _mask,
      toArrayBuffer,
      toBuffer,
      unmask: _unmask
    };
    if (!process.env.WS_NO_BUFFER_UTIL) {
      try {
        const bufferUtil = __require("bufferutil");
        module.exports.mask = function(source, mask, output, offset, length) {
          if (length < 48) _mask(source, mask, output, offset, length);
          else bufferUtil.mask(source, mask, output, offset, length);
        };
        module.exports.unmask = function(buffer, mask) {
          if (buffer.length < 32) _unmask(buffer, mask);
          else bufferUtil.unmask(buffer, mask);
        };
      } catch (e) {
      }
    }
  }
});

// ../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/limiter.js
var require_limiter = __commonJS({
  "../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/limiter.js"(exports, module) {
    "use strict";
    var kDone = /* @__PURE__ */ Symbol("kDone");
    var kRun = /* @__PURE__ */ Symbol("kRun");
    var Limiter = class {
      /**
       * Creates a new `Limiter`.
       *
       * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
       *     to run concurrently
       */
      constructor(concurrency) {
        this[kDone] = () => {
          this.pending--;
          this[kRun]();
        };
        this.concurrency = concurrency || Infinity;
        this.jobs = [];
        this.pending = 0;
      }
      /**
       * Adds a job to the queue.
       *
       * @param {Function} job The job to run
       * @public
       */
      add(job) {
        this.jobs.push(job);
        this[kRun]();
      }
      /**
       * Removes a job from the queue and runs it if possible.
       *
       * @private
       */
      [kRun]() {
        if (this.pending === this.concurrency) return;
        if (this.jobs.length) {
          const job = this.jobs.shift();
          this.pending++;
          job(this[kDone]);
        }
      }
    };
    module.exports = Limiter;
  }
});

// ../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/permessage-deflate.js
var require_permessage_deflate = __commonJS({
  "../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/permessage-deflate.js"(exports, module) {
    "use strict";
    var zlib = __require("zlib");
    var bufferUtil = require_buffer_util();
    var Limiter = require_limiter();
    var { kStatusCode } = require_constants();
    var FastBuffer = Buffer[Symbol.species];
    var TRAILER = Buffer.from([0, 0, 255, 255]);
    var kPerMessageDeflate = /* @__PURE__ */ Symbol("permessage-deflate");
    var kTotalLength = /* @__PURE__ */ Symbol("total-length");
    var kCallback = /* @__PURE__ */ Symbol("callback");
    var kBuffers = /* @__PURE__ */ Symbol("buffers");
    var kError = /* @__PURE__ */ Symbol("error");
    var zlibLimiter;
    var PerMessageDeflate2 = class {
      /**
       * Creates a PerMessageDeflate instance.
       *
       * @param {Object} [options] Configuration options
       * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
       *     for, or request, a custom client window size
       * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
       *     acknowledge disabling of client context takeover
       * @param {Number} [options.concurrencyLimit=10] The number of concurrent
       *     calls to zlib
       * @param {Boolean} [options.isServer=false] Create the instance in either
       *     server or client mode
       * @param {Number} [options.maxPayload=0] The maximum allowed message length
       * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
       *     use of a custom server window size
       * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
       *     disabling of server context takeover
       * @param {Number} [options.threshold=1024] Size (in bytes) below which
       *     messages should not be compressed if context takeover is disabled
       * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
       *     deflate
       * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
       *     inflate
       */
      constructor(options) {
        this._options = options || {};
        this._threshold = this._options.threshold !== void 0 ? this._options.threshold : 1024;
        this._maxPayload = this._options.maxPayload | 0;
        this._isServer = !!this._options.isServer;
        this._deflate = null;
        this._inflate = null;
        this.params = null;
        if (!zlibLimiter) {
          const concurrency = this._options.concurrencyLimit !== void 0 ? this._options.concurrencyLimit : 10;
          zlibLimiter = new Limiter(concurrency);
        }
      }
      /**
       * @type {String}
       */
      static get extensionName() {
        return "permessage-deflate";
      }
      /**
       * Create an extension negotiation offer.
       *
       * @return {Object} Extension parameters
       * @public
       */
      offer() {
        const params = {};
        if (this._options.serverNoContextTakeover) {
          params.server_no_context_takeover = true;
        }
        if (this._options.clientNoContextTakeover) {
          params.client_no_context_takeover = true;
        }
        if (this._options.serverMaxWindowBits) {
          params.server_max_window_bits = this._options.serverMaxWindowBits;
        }
        if (this._options.clientMaxWindowBits) {
          params.client_max_window_bits = this._options.clientMaxWindowBits;
        } else if (this._options.clientMaxWindowBits == null) {
          params.client_max_window_bits = true;
        }
        return params;
      }
      /**
       * Accept an extension negotiation offer/response.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Object} Accepted configuration
       * @public
       */
      accept(configurations) {
        configurations = this.normalizeParams(configurations);
        this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
        return this.params;
      }
      /**
       * Releases all resources used by the extension.
       *
       * @public
       */
      cleanup() {
        if (this._inflate) {
          this._inflate.close();
          this._inflate = null;
        }
        if (this._deflate) {
          const callback = this._deflate[kCallback];
          this._deflate.close();
          this._deflate = null;
          if (callback) {
            callback(
              new Error(
                "The deflate stream was closed while data was being processed"
              )
            );
          }
        }
      }
      /**
       *  Accept an extension negotiation offer.
       *
       * @param {Array} offers The extension negotiation offers
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsServer(offers) {
        const opts = this._options;
        const accepted = offers.find((params) => {
          if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === "number" && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === "number" && !params.client_max_window_bits) {
            return false;
          }
          return true;
        });
        if (!accepted) {
          throw new Error("None of the extension offers can be accepted");
        }
        if (opts.serverNoContextTakeover) {
          accepted.server_no_context_takeover = true;
        }
        if (opts.clientNoContextTakeover) {
          accepted.client_no_context_takeover = true;
        }
        if (typeof opts.serverMaxWindowBits === "number") {
          accepted.server_max_window_bits = opts.serverMaxWindowBits;
        }
        if (typeof opts.clientMaxWindowBits === "number") {
          accepted.client_max_window_bits = opts.clientMaxWindowBits;
        } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
          delete accepted.client_max_window_bits;
        }
        return accepted;
      }
      /**
       * Accept the extension negotiation response.
       *
       * @param {Array} response The extension negotiation response
       * @return {Object} Accepted configuration
       * @private
       */
      acceptAsClient(response) {
        const params = response[0];
        if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
          throw new Error('Unexpected parameter "client_no_context_takeover"');
        }
        if (!params.client_max_window_bits) {
          if (typeof this._options.clientMaxWindowBits === "number") {
            params.client_max_window_bits = this._options.clientMaxWindowBits;
          }
        } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === "number" && params.client_max_window_bits > this._options.clientMaxWindowBits) {
          throw new Error(
            'Unexpected or invalid parameter "client_max_window_bits"'
          );
        }
        return params;
      }
      /**
       * Normalize parameters.
       *
       * @param {Array} configurations The extension negotiation offers/reponse
       * @return {Array} The offers/response with normalized parameters
       * @private
       */
      normalizeParams(configurations) {
        configurations.forEach((params) => {
          Object.keys(params).forEach((key) => {
            let value = params[key];
            if (value.length > 1) {
              throw new Error(`Parameter "${key}" must have only a single value`);
            }
            value = value[0];
            if (key === "client_max_window_bits") {
              if (value !== true) {
                const num = +value;
                if (!Number.isInteger(num) || num < 8 || num > 15) {
                  throw new TypeError(
                    `Invalid value for parameter "${key}": ${value}`
                  );
                }
                value = num;
              } else if (!this._isServer) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else if (key === "server_max_window_bits") {
              const num = +value;
              if (!Number.isInteger(num) || num < 8 || num > 15) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
              value = num;
            } else if (key === "client_no_context_takeover" || key === "server_no_context_takeover") {
              if (value !== true) {
                throw new TypeError(
                  `Invalid value for parameter "${key}": ${value}`
                );
              }
            } else {
              throw new Error(`Unknown parameter "${key}"`);
            }
            params[key] = value;
          });
        });
        return configurations;
      }
      /**
       * Decompress data. Concurrency limited.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      decompress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._decompress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      /**
       * Compress data. Concurrency limited.
       *
       * @param {(Buffer|String)} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @public
       */
      compress(data, fin, callback) {
        zlibLimiter.add((done) => {
          this._compress(data, fin, (err, result) => {
            done();
            callback(err, result);
          });
        });
      }
      /**
       * Decompress data.
       *
       * @param {Buffer} data Compressed data
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _decompress(data, fin, callback) {
        const endpoint = this._isServer ? "client" : "server";
        if (!this._inflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._inflate = zlib.createInflateRaw({
            ...this._options.zlibInflateOptions,
            windowBits
          });
          this._inflate[kPerMessageDeflate] = this;
          this._inflate[kTotalLength] = 0;
          this._inflate[kBuffers] = [];
          this._inflate.on("error", inflateOnError);
          this._inflate.on("data", inflateOnData);
        }
        this._inflate[kCallback] = callback;
        this._inflate.write(data);
        if (fin) this._inflate.write(TRAILER);
        this._inflate.flush(() => {
          const err = this._inflate[kError];
          if (err) {
            this._inflate.close();
            this._inflate = null;
            callback(err);
            return;
          }
          const data2 = bufferUtil.concat(
            this._inflate[kBuffers],
            this._inflate[kTotalLength]
          );
          if (this._inflate._readableState.endEmitted) {
            this._inflate.close();
            this._inflate = null;
          } else {
            this._inflate[kTotalLength] = 0;
            this._inflate[kBuffers] = [];
            if (fin && this.params[`${endpoint}_no_context_takeover`]) {
              this._inflate.reset();
            }
          }
          callback(null, data2);
        });
      }
      /**
       * Compress data.
       *
       * @param {(Buffer|String)} data Data to compress
       * @param {Boolean} fin Specifies whether or not this is the last fragment
       * @param {Function} callback Callback
       * @private
       */
      _compress(data, fin, callback) {
        const endpoint = this._isServer ? "server" : "client";
        if (!this._deflate) {
          const key = `${endpoint}_max_window_bits`;
          const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
          this._deflate = zlib.createDeflateRaw({
            ...this._options.zlibDeflateOptions,
            windowBits
          });
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          this._deflate.on("data", deflateOnData);
        }
        this._deflate[kCallback] = callback;
        this._deflate.write(data);
        this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
          if (!this._deflate) {
            return;
          }
          let data2 = bufferUtil.concat(
            this._deflate[kBuffers],
            this._deflate[kTotalLength]
          );
          if (fin) {
            data2 = new FastBuffer(data2.buffer, data2.byteOffset, data2.length - 4);
          }
          this._deflate[kCallback] = null;
          this._deflate[kTotalLength] = 0;
          this._deflate[kBuffers] = [];
          if (fin && this.params[`${endpoint}_no_context_takeover`]) {
            this._deflate.reset();
          }
          callback(null, data2);
        });
      }
    };
    module.exports = PerMessageDeflate2;
    function deflateOnData(chunk) {
      this[kBuffers].push(chunk);
      this[kTotalLength] += chunk.length;
    }
    function inflateOnData(chunk) {
      this[kTotalLength] += chunk.length;
      if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
        this[kBuffers].push(chunk);
        return;
      }
      this[kError] = new RangeError("Max payload size exceeded");
      this[kError].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH";
      this[kError][kStatusCode] = 1009;
      this.removeListener("data", inflateOnData);
      this.reset();
    }
    function inflateOnError(err) {
      this[kPerMessageDeflate]._inflate = null;
      if (this[kError]) {
        this[kCallback](this[kError]);
        return;
      }
      err[kStatusCode] = 1007;
      this[kCallback](err);
    }
  }
});

// ../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/validation.js
var require_validation = __commonJS({
  "../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/validation.js"(exports, module) {
    "use strict";
    var { isUtf8 } = __require("buffer");
    var { hasBlob } = require_constants();
    var tokenChars = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 0 - 15
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // 16 - 31
      0,
      1,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      1,
      0,
      // 32 - 47
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      // 48 - 63
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 64 - 79
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      1,
      1,
      // 80 - 95
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      // 96 - 111
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      1,
      0,
      1,
      0
      // 112 - 127
    ];
    function isValidStatusCode(code) {
      return code >= 1e3 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3e3 && code <= 4999;
    }
    function _isValidUTF8(buf) {
      const len = buf.length;
      let i = 0;
      while (i < len) {
        if ((buf[i] & 128) === 0) {
          i++;
        } else if ((buf[i] & 224) === 192) {
          if (i + 1 === len || (buf[i + 1] & 192) !== 128 || (buf[i] & 254) === 192) {
            return false;
          }
          i += 2;
        } else if ((buf[i] & 240) === 224) {
          if (i + 2 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || buf[i] === 224 && (buf[i + 1] & 224) === 128 || // Overlong
          buf[i] === 237 && (buf[i + 1] & 224) === 160) {
            return false;
          }
          i += 3;
        } else if ((buf[i] & 248) === 240) {
          if (i + 3 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || (buf[i + 3] & 192) !== 128 || buf[i] === 240 && (buf[i + 1] & 240) === 128 || // Overlong
          buf[i] === 244 && buf[i + 1] > 143 || buf[i] > 244) {
            return false;
          }
          i += 4;
        } else {
          return false;
        }
      }
      return true;
    }
    function isBlob(value) {
      return hasBlob && typeof value === "object" && typeof value.arrayBuffer === "function" && typeof value.type === "string" && typeof value.stream === "function" && (value[Symbol.toStringTag] === "Blob" || value[Symbol.toStringTag] === "File");
    }
    module.exports = {
      isBlob,
      isValidStatusCode,
      isValidUTF8: _isValidUTF8,
      tokenChars
    };
    if (isUtf8) {
      module.exports.isValidUTF8 = function(buf) {
        return buf.length < 24 ? _isValidUTF8(buf) : isUtf8(buf);
      };
    } else if (!process.env.WS_NO_UTF_8_VALIDATE) {
      try {
        const isValidUTF8 = __require("utf-8-validate");
        module.exports.isValidUTF8 = function(buf) {
          return buf.length < 32 ? _isValidUTF8(buf) : isValidUTF8(buf);
        };
      } catch (e) {
      }
    }
  }
});

// ../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/receiver.js
var require_receiver = __commonJS({
  "../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/receiver.js"(exports, module) {
    "use strict";
    var { Writable } = __require("stream");
    var PerMessageDeflate2 = require_permessage_deflate();
    var {
      BINARY_TYPES,
      EMPTY_BUFFER,
      kStatusCode,
      kWebSocket
    } = require_constants();
    var { concat, toArrayBuffer, unmask } = require_buffer_util();
    var { isValidStatusCode, isValidUTF8 } = require_validation();
    var FastBuffer = Buffer[Symbol.species];
    var GET_INFO = 0;
    var GET_PAYLOAD_LENGTH_16 = 1;
    var GET_PAYLOAD_LENGTH_64 = 2;
    var GET_MASK = 3;
    var GET_DATA = 4;
    var INFLATING = 5;
    var DEFER_EVENT = 6;
    var Receiver2 = class extends Writable {
      /**
       * Creates a Receiver instance.
       *
       * @param {Object} [options] Options object
       * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {String} [options.binaryType=nodebuffer] The type for binary data
       * @param {Object} [options.extensions] An object containing the negotiated
       *     extensions
       * @param {Boolean} [options.isServer=false] Specifies whether to operate in
       *     client or server mode
       * @param {Number} [options.maxPayload=0] The maximum allowed message length
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       */
      constructor(options = {}) {
        super();
        this._allowSynchronousEvents = options.allowSynchronousEvents !== void 0 ? options.allowSynchronousEvents : true;
        this._binaryType = options.binaryType || BINARY_TYPES[0];
        this._extensions = options.extensions || {};
        this._isServer = !!options.isServer;
        this._maxPayload = options.maxPayload | 0;
        this._skipUTF8Validation = !!options.skipUTF8Validation;
        this[kWebSocket] = void 0;
        this._bufferedBytes = 0;
        this._buffers = [];
        this._compressed = false;
        this._payloadLength = 0;
        this._mask = void 0;
        this._fragmented = 0;
        this._masked = false;
        this._fin = false;
        this._opcode = 0;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragments = [];
        this._errored = false;
        this._loop = false;
        this._state = GET_INFO;
      }
      /**
       * Implements `Writable.prototype._write()`.
       *
       * @param {Buffer} chunk The chunk of data to write
       * @param {String} encoding The character encoding of `chunk`
       * @param {Function} cb Callback
       * @private
       */
      _write(chunk, encoding, cb) {
        if (this._opcode === 8 && this._state == GET_INFO) return cb();
        this._bufferedBytes += chunk.length;
        this._buffers.push(chunk);
        this.startLoop(cb);
      }
      /**
       * Consumes `n` bytes from the buffered data.
       *
       * @param {Number} n The number of bytes to consume
       * @return {Buffer} The consumed bytes
       * @private
       */
      consume(n) {
        this._bufferedBytes -= n;
        if (n === this._buffers[0].length) return this._buffers.shift();
        if (n < this._buffers[0].length) {
          const buf = this._buffers[0];
          this._buffers[0] = new FastBuffer(
            buf.buffer,
            buf.byteOffset + n,
            buf.length - n
          );
          return new FastBuffer(buf.buffer, buf.byteOffset, n);
        }
        const dst = Buffer.allocUnsafe(n);
        do {
          const buf = this._buffers[0];
          const offset = dst.length - n;
          if (n >= buf.length) {
            dst.set(this._buffers.shift(), offset);
          } else {
            dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
            this._buffers[0] = new FastBuffer(
              buf.buffer,
              buf.byteOffset + n,
              buf.length - n
            );
          }
          n -= buf.length;
        } while (n > 0);
        return dst;
      }
      /**
       * Starts the parsing loop.
       *
       * @param {Function} cb Callback
       * @private
       */
      startLoop(cb) {
        this._loop = true;
        do {
          switch (this._state) {
            case GET_INFO:
              this.getInfo(cb);
              break;
            case GET_PAYLOAD_LENGTH_16:
              this.getPayloadLength16(cb);
              break;
            case GET_PAYLOAD_LENGTH_64:
              this.getPayloadLength64(cb);
              break;
            case GET_MASK:
              this.getMask();
              break;
            case GET_DATA:
              this.getData(cb);
              break;
            case INFLATING:
            case DEFER_EVENT:
              this._loop = false;
              return;
          }
        } while (this._loop);
        if (!this._errored) cb();
      }
      /**
       * Reads the first two bytes of a frame.
       *
       * @param {Function} cb Callback
       * @private
       */
      getInfo(cb) {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        const buf = this.consume(2);
        if ((buf[0] & 48) !== 0) {
          const error = this.createError(
            RangeError,
            "RSV2 and RSV3 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_2_3"
          );
          cb(error);
          return;
        }
        const compressed = (buf[0] & 64) === 64;
        if (compressed && !this._extensions[PerMessageDeflate2.extensionName]) {
          const error = this.createError(
            RangeError,
            "RSV1 must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_RSV_1"
          );
          cb(error);
          return;
        }
        this._fin = (buf[0] & 128) === 128;
        this._opcode = buf[0] & 15;
        this._payloadLength = buf[1] & 127;
        if (this._opcode === 0) {
          if (compressed) {
            const error = this.createError(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
            cb(error);
            return;
          }
          if (!this._fragmented) {
            const error = this.createError(
              RangeError,
              "invalid opcode 0",
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
            cb(error);
            return;
          }
          this._opcode = this._fragmented;
        } else if (this._opcode === 1 || this._opcode === 2) {
          if (this._fragmented) {
            const error = this.createError(
              RangeError,
              `invalid opcode ${this._opcode}`,
              true,
              1002,
              "WS_ERR_INVALID_OPCODE"
            );
            cb(error);
            return;
          }
          this._compressed = compressed;
        } else if (this._opcode > 7 && this._opcode < 11) {
          if (!this._fin) {
            const error = this.createError(
              RangeError,
              "FIN must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_FIN"
            );
            cb(error);
            return;
          }
          if (compressed) {
            const error = this.createError(
              RangeError,
              "RSV1 must be clear",
              true,
              1002,
              "WS_ERR_UNEXPECTED_RSV_1"
            );
            cb(error);
            return;
          }
          if (this._payloadLength > 125 || this._opcode === 8 && this._payloadLength === 1) {
            const error = this.createError(
              RangeError,
              `invalid payload length ${this._payloadLength}`,
              true,
              1002,
              "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH"
            );
            cb(error);
            return;
          }
        } else {
          const error = this.createError(
            RangeError,
            `invalid opcode ${this._opcode}`,
            true,
            1002,
            "WS_ERR_INVALID_OPCODE"
          );
          cb(error);
          return;
        }
        if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
        this._masked = (buf[1] & 128) === 128;
        if (this._isServer) {
          if (!this._masked) {
            const error = this.createError(
              RangeError,
              "MASK must be set",
              true,
              1002,
              "WS_ERR_EXPECTED_MASK"
            );
            cb(error);
            return;
          }
        } else if (this._masked) {
          const error = this.createError(
            RangeError,
            "MASK must be clear",
            true,
            1002,
            "WS_ERR_UNEXPECTED_MASK"
          );
          cb(error);
          return;
        }
        if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
        else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
        else this.haveLength(cb);
      }
      /**
       * Gets extended payload length (7+16).
       *
       * @param {Function} cb Callback
       * @private
       */
      getPayloadLength16(cb) {
        if (this._bufferedBytes < 2) {
          this._loop = false;
          return;
        }
        this._payloadLength = this.consume(2).readUInt16BE(0);
        this.haveLength(cb);
      }
      /**
       * Gets extended payload length (7+64).
       *
       * @param {Function} cb Callback
       * @private
       */
      getPayloadLength64(cb) {
        if (this._bufferedBytes < 8) {
          this._loop = false;
          return;
        }
        const buf = this.consume(8);
        const num = buf.readUInt32BE(0);
        if (num > Math.pow(2, 53 - 32) - 1) {
          const error = this.createError(
            RangeError,
            "Unsupported WebSocket frame: payload length > 2^53 - 1",
            false,
            1009,
            "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH"
          );
          cb(error);
          return;
        }
        this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
        this.haveLength(cb);
      }
      /**
       * Payload length has been read.
       *
       * @param {Function} cb Callback
       * @private
       */
      haveLength(cb) {
        if (this._payloadLength && this._opcode < 8) {
          this._totalPayloadLength += this._payloadLength;
          if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
            const error = this.createError(
              RangeError,
              "Max payload size exceeded",
              false,
              1009,
              "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
            );
            cb(error);
            return;
          }
        }
        if (this._masked) this._state = GET_MASK;
        else this._state = GET_DATA;
      }
      /**
       * Reads mask bytes.
       *
       * @private
       */
      getMask() {
        if (this._bufferedBytes < 4) {
          this._loop = false;
          return;
        }
        this._mask = this.consume(4);
        this._state = GET_DATA;
      }
      /**
       * Reads data bytes.
       *
       * @param {Function} cb Callback
       * @private
       */
      getData(cb) {
        let data = EMPTY_BUFFER;
        if (this._payloadLength) {
          if (this._bufferedBytes < this._payloadLength) {
            this._loop = false;
            return;
          }
          data = this.consume(this._payloadLength);
          if (this._masked && (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0) {
            unmask(data, this._mask);
          }
        }
        if (this._opcode > 7) {
          this.controlMessage(data, cb);
          return;
        }
        if (this._compressed) {
          this._state = INFLATING;
          this.decompress(data, cb);
          return;
        }
        if (data.length) {
          this._messageLength = this._totalPayloadLength;
          this._fragments.push(data);
        }
        this.dataMessage(cb);
      }
      /**
       * Decompresses data.
       *
       * @param {Buffer} data Compressed data
       * @param {Function} cb Callback
       * @private
       */
      decompress(data, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate2.extensionName];
        perMessageDeflate.decompress(data, this._fin, (err, buf) => {
          if (err) return cb(err);
          if (buf.length) {
            this._messageLength += buf.length;
            if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
              const error = this.createError(
                RangeError,
                "Max payload size exceeded",
                false,
                1009,
                "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"
              );
              cb(error);
              return;
            }
            this._fragments.push(buf);
          }
          this.dataMessage(cb);
          if (this._state === GET_INFO) this.startLoop(cb);
        });
      }
      /**
       * Handles a data message.
       *
       * @param {Function} cb Callback
       * @private
       */
      dataMessage(cb) {
        if (!this._fin) {
          this._state = GET_INFO;
          return;
        }
        const messageLength = this._messageLength;
        const fragments = this._fragments;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragmented = 0;
        this._fragments = [];
        if (this._opcode === 2) {
          let data;
          if (this._binaryType === "nodebuffer") {
            data = concat(fragments, messageLength);
          } else if (this._binaryType === "arraybuffer") {
            data = toArrayBuffer(concat(fragments, messageLength));
          } else if (this._binaryType === "blob") {
            data = new Blob(fragments);
          } else {
            data = fragments;
          }
          if (this._allowSynchronousEvents) {
            this.emit("message", data, true);
            this._state = GET_INFO;
          } else {
            this._state = DEFER_EVENT;
            setImmediate(() => {
              this.emit("message", data, true);
              this._state = GET_INFO;
              this.startLoop(cb);
            });
          }
        } else {
          const buf = concat(fragments, messageLength);
          if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
            const error = this.createError(
              Error,
              "invalid UTF-8 sequence",
              true,
              1007,
              "WS_ERR_INVALID_UTF8"
            );
            cb(error);
            return;
          }
          if (this._state === INFLATING || this._allowSynchronousEvents) {
            this.emit("message", buf, false);
            this._state = GET_INFO;
          } else {
            this._state = DEFER_EVENT;
            setImmediate(() => {
              this.emit("message", buf, false);
              this._state = GET_INFO;
              this.startLoop(cb);
            });
          }
        }
      }
      /**
       * Handles a control message.
       *
       * @param {Buffer} data Data to handle
       * @return {(Error|RangeError|undefined)} A possible error
       * @private
       */
      controlMessage(data, cb) {
        if (this._opcode === 8) {
          if (data.length === 0) {
            this._loop = false;
            this.emit("conclude", 1005, EMPTY_BUFFER);
            this.end();
          } else {
            const code = data.readUInt16BE(0);
            if (!isValidStatusCode(code)) {
              const error = this.createError(
                RangeError,
                `invalid status code ${code}`,
                true,
                1002,
                "WS_ERR_INVALID_CLOSE_CODE"
              );
              cb(error);
              return;
            }
            const buf = new FastBuffer(
              data.buffer,
              data.byteOffset + 2,
              data.length - 2
            );
            if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
              const error = this.createError(
                Error,
                "invalid UTF-8 sequence",
                true,
                1007,
                "WS_ERR_INVALID_UTF8"
              );
              cb(error);
              return;
            }
            this._loop = false;
            this.emit("conclude", code, buf);
            this.end();
          }
          this._state = GET_INFO;
          return;
        }
        if (this._allowSynchronousEvents) {
          this.emit(this._opcode === 9 ? "ping" : "pong", data);
          this._state = GET_INFO;
        } else {
          this._state = DEFER_EVENT;
          setImmediate(() => {
            this.emit(this._opcode === 9 ? "ping" : "pong", data);
            this._state = GET_INFO;
            this.startLoop(cb);
          });
        }
      }
      /**
       * Builds an error object.
       *
       * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
       * @param {String} message The error message
       * @param {Boolean} prefix Specifies whether or not to add a default prefix to
       *     `message`
       * @param {Number} statusCode The status code
       * @param {String} errorCode The exposed error code
       * @return {(Error|RangeError)} The error
       * @private
       */
      createError(ErrorCtor, message, prefix, statusCode, errorCode) {
        this._loop = false;
        this._errored = true;
        const err = new ErrorCtor(
          prefix ? `Invalid WebSocket frame: ${message}` : message
        );
        Error.captureStackTrace(err, this.createError);
        err.code = errorCode;
        err[kStatusCode] = statusCode;
        return err;
      }
    };
    module.exports = Receiver2;
  }
});

// ../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/sender.js
var require_sender = __commonJS({
  "../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/sender.js"(exports, module) {
    "use strict";
    var { Duplex } = __require("stream");
    var { randomFillSync } = __require("crypto");
    var {
      types: { isUint8Array }
    } = __require("util");
    var PerMessageDeflate2 = require_permessage_deflate();
    var { EMPTY_BUFFER, kWebSocket, NOOP } = require_constants();
    var { isBlob, isValidStatusCode } = require_validation();
    var { mask: applyMask, toBuffer } = require_buffer_util();
    var kByteLength = /* @__PURE__ */ Symbol("kByteLength");
    var maskBuffer = Buffer.alloc(4);
    var RANDOM_POOL_SIZE = 8 * 1024;
    var randomPool;
    var randomPoolPointer = RANDOM_POOL_SIZE;
    var DEFAULT = 0;
    var DEFLATING = 1;
    var GET_BLOB_DATA = 2;
    var Sender2 = class _Sender {
      /**
       * Creates a Sender instance.
       *
       * @param {Duplex} socket The connection socket
       * @param {Object} [extensions] An object containing the negotiated extensions
       * @param {Function} [generateMask] The function used to generate the masking
       *     key
       */
      constructor(socket, extensions, generateMask) {
        this._extensions = extensions || {};
        if (generateMask) {
          this._generateMask = generateMask;
          this._maskBuffer = Buffer.alloc(4);
        }
        this._socket = socket;
        this._firstFragment = true;
        this._compress = false;
        this._bufferedBytes = 0;
        this._queue = [];
        this._state = DEFAULT;
        this.onerror = NOOP;
        this[kWebSocket] = void 0;
      }
      /**
       * Frames a piece of data according to the HyBi WebSocket protocol.
       *
       * @param {(Buffer|String)} data The data to frame
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @return {(Buffer|String)[]} The framed data
       * @public
       */
      static frame(data, options) {
        let mask;
        let merge = false;
        let offset = 2;
        let skipMasking = false;
        if (options.mask) {
          mask = options.maskBuffer || maskBuffer;
          if (options.generateMask) {
            options.generateMask(mask);
          } else {
            if (randomPoolPointer === RANDOM_POOL_SIZE) {
              if (randomPool === void 0) {
                randomPool = Buffer.alloc(RANDOM_POOL_SIZE);
              }
              randomFillSync(randomPool, 0, RANDOM_POOL_SIZE);
              randomPoolPointer = 0;
            }
            mask[0] = randomPool[randomPoolPointer++];
            mask[1] = randomPool[randomPoolPointer++];
            mask[2] = randomPool[randomPoolPointer++];
            mask[3] = randomPool[randomPoolPointer++];
          }
          skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
          offset = 6;
        }
        let dataLength;
        if (typeof data === "string") {
          if ((!options.mask || skipMasking) && options[kByteLength] !== void 0) {
            dataLength = options[kByteLength];
          } else {
            data = Buffer.from(data);
            dataLength = data.length;
          }
        } else {
          dataLength = data.length;
          merge = options.mask && options.readOnly && !skipMasking;
        }
        let payloadLength = dataLength;
        if (dataLength >= 65536) {
          offset += 8;
          payloadLength = 127;
        } else if (dataLength > 125) {
          offset += 2;
          payloadLength = 126;
        }
        const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);
        target[0] = options.fin ? options.opcode | 128 : options.opcode;
        if (options.rsv1) target[0] |= 64;
        target[1] = payloadLength;
        if (payloadLength === 126) {
          target.writeUInt16BE(dataLength, 2);
        } else if (payloadLength === 127) {
          target[2] = target[3] = 0;
          target.writeUIntBE(dataLength, 4, 6);
        }
        if (!options.mask) return [target, data];
        target[1] |= 128;
        target[offset - 4] = mask[0];
        target[offset - 3] = mask[1];
        target[offset - 2] = mask[2];
        target[offset - 1] = mask[3];
        if (skipMasking) return [target, data];
        if (merge) {
          applyMask(data, mask, target, offset, dataLength);
          return [target];
        }
        applyMask(data, mask, data, 0, dataLength);
        return [target, data];
      }
      /**
       * Sends a close message to the other peer.
       *
       * @param {Number} [code] The status code component of the body
       * @param {(String|Buffer)} [data] The message component of the body
       * @param {Boolean} [mask=false] Specifies whether or not to mask the message
       * @param {Function} [cb] Callback
       * @public
       */
      close(code, data, mask, cb) {
        let buf;
        if (code === void 0) {
          buf = EMPTY_BUFFER;
        } else if (typeof code !== "number" || !isValidStatusCode(code)) {
          throw new TypeError("First argument must be a valid error code number");
        } else if (data === void 0 || !data.length) {
          buf = Buffer.allocUnsafe(2);
          buf.writeUInt16BE(code, 0);
        } else {
          const length = Buffer.byteLength(data);
          if (length > 123) {
            throw new RangeError("The message must not be greater than 123 bytes");
          }
          buf = Buffer.allocUnsafe(2 + length);
          buf.writeUInt16BE(code, 0);
          if (typeof data === "string") {
            buf.write(data, 2);
          } else if (isUint8Array(data)) {
            buf.set(data, 2);
          } else {
            throw new TypeError("Second argument must be a string or a Uint8Array");
          }
        }
        const options = {
          [kByteLength]: buf.length,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 8,
          readOnly: false,
          rsv1: false
        };
        if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, buf, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(buf, options), cb);
        }
      }
      /**
       * Sends a ping message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      ping(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 9,
          readOnly,
          rsv1: false
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, false, options, cb]);
          } else {
            this.getBlobData(data, false, options, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(data, options), cb);
        }
      }
      /**
       * Sends a pong message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback
       * @public
       */
      pong(data, mask, cb) {
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (byteLength > 125) {
          throw new RangeError("The data size must not be greater than 125 bytes");
        }
        const options = {
          [kByteLength]: byteLength,
          fin: true,
          generateMask: this._generateMask,
          mask,
          maskBuffer: this._maskBuffer,
          opcode: 10,
          readOnly,
          rsv1: false
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, false, options, cb]);
          } else {
            this.getBlobData(data, false, options, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, false, options, cb]);
        } else {
          this.sendFrame(_Sender.frame(data, options), cb);
        }
      }
      /**
       * Sends a data message to the other peer.
       *
       * @param {*} data The message to send
       * @param {Object} options Options object
       * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
       *     or text
       * @param {Boolean} [options.compress=false] Specifies whether or not to
       *     compress `data`
       * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Function} [cb] Callback
       * @public
       */
      send(data, options, cb) {
        const perMessageDeflate = this._extensions[PerMessageDeflate2.extensionName];
        let opcode = options.binary ? 2 : 1;
        let rsv1 = options.compress;
        let byteLength;
        let readOnly;
        if (typeof data === "string") {
          byteLength = Buffer.byteLength(data);
          readOnly = false;
        } else if (isBlob(data)) {
          byteLength = data.size;
          readOnly = false;
        } else {
          data = toBuffer(data);
          byteLength = data.length;
          readOnly = toBuffer.readOnly;
        }
        if (this._firstFragment) {
          this._firstFragment = false;
          if (rsv1 && perMessageDeflate && perMessageDeflate.params[perMessageDeflate._isServer ? "server_no_context_takeover" : "client_no_context_takeover"]) {
            rsv1 = byteLength >= perMessageDeflate._threshold;
          }
          this._compress = rsv1;
        } else {
          rsv1 = false;
          opcode = 0;
        }
        if (options.fin) this._firstFragment = true;
        const opts = {
          [kByteLength]: byteLength,
          fin: options.fin,
          generateMask: this._generateMask,
          mask: options.mask,
          maskBuffer: this._maskBuffer,
          opcode,
          readOnly,
          rsv1
        };
        if (isBlob(data)) {
          if (this._state !== DEFAULT) {
            this.enqueue([this.getBlobData, data, this._compress, opts, cb]);
          } else {
            this.getBlobData(data, this._compress, opts, cb);
          }
        } else if (this._state !== DEFAULT) {
          this.enqueue([this.dispatch, data, this._compress, opts, cb]);
        } else {
          this.dispatch(data, this._compress, opts, cb);
        }
      }
      /**
       * Gets the contents of a blob as binary data.
       *
       * @param {Blob} blob The blob
       * @param {Boolean} [compress=false] Specifies whether or not to compress
       *     the data
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @param {Function} [cb] Callback
       * @private
       */
      getBlobData(blob2, compress, options, cb) {
        this._bufferedBytes += options[kByteLength];
        this._state = GET_BLOB_DATA;
        blob2.arrayBuffer().then((arrayBuffer) => {
          if (this._socket.destroyed) {
            const err = new Error(
              "The socket was closed while the blob was being read"
            );
            process.nextTick(callCallbacks, this, err, cb);
            return;
          }
          this._bufferedBytes -= options[kByteLength];
          const data = toBuffer(arrayBuffer);
          if (!compress) {
            this._state = DEFAULT;
            this.sendFrame(_Sender.frame(data, options), cb);
            this.dequeue();
          } else {
            this.dispatch(data, compress, options, cb);
          }
        }).catch((err) => {
          process.nextTick(onError, this, err, cb);
        });
      }
      /**
       * Dispatches a message.
       *
       * @param {(Buffer|String)} data The message to send
       * @param {Boolean} [compress=false] Specifies whether or not to compress
       *     `data`
       * @param {Object} options Options object
       * @param {Boolean} [options.fin=false] Specifies whether or not to set the
       *     FIN bit
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Boolean} [options.mask=false] Specifies whether or not to mask
       *     `data`
       * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
       *     key
       * @param {Number} options.opcode The opcode
       * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
       *     modified
       * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
       *     RSV1 bit
       * @param {Function} [cb] Callback
       * @private
       */
      dispatch(data, compress, options, cb) {
        if (!compress) {
          this.sendFrame(_Sender.frame(data, options), cb);
          return;
        }
        const perMessageDeflate = this._extensions[PerMessageDeflate2.extensionName];
        this._bufferedBytes += options[kByteLength];
        this._state = DEFLATING;
        perMessageDeflate.compress(data, options.fin, (_, buf) => {
          if (this._socket.destroyed) {
            const err = new Error(
              "The socket was closed while data was being compressed"
            );
            callCallbacks(this, err, cb);
            return;
          }
          this._bufferedBytes -= options[kByteLength];
          this._state = DEFAULT;
          options.readOnly = false;
          this.sendFrame(_Sender.frame(buf, options), cb);
          this.dequeue();
        });
      }
      /**
       * Executes queued send operations.
       *
       * @private
       */
      dequeue() {
        while (this._state === DEFAULT && this._queue.length) {
          const params = this._queue.shift();
          this._bufferedBytes -= params[3][kByteLength];
          Reflect.apply(params[0], this, params.slice(1));
        }
      }
      /**
       * Enqueues a send operation.
       *
       * @param {Array} params Send operation parameters.
       * @private
       */
      enqueue(params) {
        this._bufferedBytes += params[3][kByteLength];
        this._queue.push(params);
      }
      /**
       * Sends a frame.
       *
       * @param {(Buffer | String)[]} list The frame to send
       * @param {Function} [cb] Callback
       * @private
       */
      sendFrame(list, cb) {
        if (list.length === 2) {
          this._socket.cork();
          this._socket.write(list[0]);
          this._socket.write(list[1], cb);
          this._socket.uncork();
        } else {
          this._socket.write(list[0], cb);
        }
      }
    };
    module.exports = Sender2;
    function callCallbacks(sender, err, cb) {
      if (typeof cb === "function") cb(err);
      for (let i = 0; i < sender._queue.length; i++) {
        const params = sender._queue[i];
        const callback = params[params.length - 1];
        if (typeof callback === "function") callback(err);
      }
    }
    function onError(sender, err, cb) {
      callCallbacks(sender, err, cb);
      sender.onerror(err);
    }
  }
});

// ../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/event-target.js
var require_event_target = __commonJS({
  "../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/event-target.js"(exports, module) {
    "use strict";
    var { kForOnEventAttribute, kListener } = require_constants();
    var kCode = /* @__PURE__ */ Symbol("kCode");
    var kData = /* @__PURE__ */ Symbol("kData");
    var kError = /* @__PURE__ */ Symbol("kError");
    var kMessage = /* @__PURE__ */ Symbol("kMessage");
    var kReason = /* @__PURE__ */ Symbol("kReason");
    var kTarget = /* @__PURE__ */ Symbol("kTarget");
    var kType = /* @__PURE__ */ Symbol("kType");
    var kWasClean = /* @__PURE__ */ Symbol("kWasClean");
    var Event = class {
      /**
       * Create a new `Event`.
       *
       * @param {String} type The name of the event
       * @throws {TypeError} If the `type` argument is not specified
       */
      constructor(type) {
        this[kTarget] = null;
        this[kType] = type;
      }
      /**
       * @type {*}
       */
      get target() {
        return this[kTarget];
      }
      /**
       * @type {String}
       */
      get type() {
        return this[kType];
      }
    };
    Object.defineProperty(Event.prototype, "target", { enumerable: true });
    Object.defineProperty(Event.prototype, "type", { enumerable: true });
    var CloseEvent = class extends Event {
      /**
       * Create a new `CloseEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {Number} [options.code=0] The status code explaining why the
       *     connection was closed
       * @param {String} [options.reason=''] A human-readable string explaining why
       *     the connection was closed
       * @param {Boolean} [options.wasClean=false] Indicates whether or not the
       *     connection was cleanly closed
       */
      constructor(type, options = {}) {
        super(type);
        this[kCode] = options.code === void 0 ? 0 : options.code;
        this[kReason] = options.reason === void 0 ? "" : options.reason;
        this[kWasClean] = options.wasClean === void 0 ? false : options.wasClean;
      }
      /**
       * @type {Number}
       */
      get code() {
        return this[kCode];
      }
      /**
       * @type {String}
       */
      get reason() {
        return this[kReason];
      }
      /**
       * @type {Boolean}
       */
      get wasClean() {
        return this[kWasClean];
      }
    };
    Object.defineProperty(CloseEvent.prototype, "code", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "reason", { enumerable: true });
    Object.defineProperty(CloseEvent.prototype, "wasClean", { enumerable: true });
    var ErrorEvent = class extends Event {
      /**
       * Create a new `ErrorEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {*} [options.error=null] The error that generated this event
       * @param {String} [options.message=''] The error message
       */
      constructor(type, options = {}) {
        super(type);
        this[kError] = options.error === void 0 ? null : options.error;
        this[kMessage] = options.message === void 0 ? "" : options.message;
      }
      /**
       * @type {*}
       */
      get error() {
        return this[kError];
      }
      /**
       * @type {String}
       */
      get message() {
        return this[kMessage];
      }
    };
    Object.defineProperty(ErrorEvent.prototype, "error", { enumerable: true });
    Object.defineProperty(ErrorEvent.prototype, "message", { enumerable: true });
    var MessageEvent = class extends Event {
      /**
       * Create a new `MessageEvent`.
       *
       * @param {String} type The name of the event
       * @param {Object} [options] A dictionary object that allows for setting
       *     attributes via object members of the same name
       * @param {*} [options.data=null] The message content
       */
      constructor(type, options = {}) {
        super(type);
        this[kData] = options.data === void 0 ? null : options.data;
      }
      /**
       * @type {*}
       */
      get data() {
        return this[kData];
      }
    };
    Object.defineProperty(MessageEvent.prototype, "data", { enumerable: true });
    var EventTarget = {
      /**
       * Register an event listener.
       *
       * @param {String} type A string representing the event type to listen for
       * @param {(Function|Object)} handler The listener to add
       * @param {Object} [options] An options object specifies characteristics about
       *     the event listener
       * @param {Boolean} [options.once=false] A `Boolean` indicating that the
       *     listener should be invoked at most once after being added. If `true`,
       *     the listener would be automatically removed when invoked.
       * @public
       */
      addEventListener(type, handler2, options = {}) {
        for (const listener of this.listeners(type)) {
          if (!options[kForOnEventAttribute] && listener[kListener] === handler2 && !listener[kForOnEventAttribute]) {
            return;
          }
        }
        let wrapper;
        if (type === "message") {
          wrapper = function onMessage(data, isBinary) {
            const event = new MessageEvent("message", {
              data: isBinary ? data : data.toString()
            });
            event[kTarget] = this;
            callListener(handler2, this, event);
          };
        } else if (type === "close") {
          wrapper = function onClose(code, message) {
            const event = new CloseEvent("close", {
              code,
              reason: message.toString(),
              wasClean: this._closeFrameReceived && this._closeFrameSent
            });
            event[kTarget] = this;
            callListener(handler2, this, event);
          };
        } else if (type === "error") {
          wrapper = function onError(error) {
            const event = new ErrorEvent("error", {
              error,
              message: error.message
            });
            event[kTarget] = this;
            callListener(handler2, this, event);
          };
        } else if (type === "open") {
          wrapper = function onOpen() {
            const event = new Event("open");
            event[kTarget] = this;
            callListener(handler2, this, event);
          };
        } else {
          return;
        }
        wrapper[kForOnEventAttribute] = !!options[kForOnEventAttribute];
        wrapper[kListener] = handler2;
        if (options.once) {
          this.once(type, wrapper);
        } else {
          this.on(type, wrapper);
        }
      },
      /**
       * Remove an event listener.
       *
       * @param {String} type A string representing the event type to remove
       * @param {(Function|Object)} handler The listener to remove
       * @public
       */
      removeEventListener(type, handler2) {
        for (const listener of this.listeners(type)) {
          if (listener[kListener] === handler2 && !listener[kForOnEventAttribute]) {
            this.removeListener(type, listener);
            break;
          }
        }
      }
    };
    module.exports = {
      CloseEvent,
      ErrorEvent,
      Event,
      EventTarget,
      MessageEvent
    };
    function callListener(listener, thisArg, event) {
      if (typeof listener === "object" && listener.handleEvent) {
        listener.handleEvent.call(listener, event);
      } else {
        listener.call(thisArg, event);
      }
    }
  }
});

// ../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/extension.js
var require_extension = __commonJS({
  "../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/extension.js"(exports, module) {
    "use strict";
    var { tokenChars } = require_validation();
    function push(dest, name2, elem) {
      if (dest[name2] === void 0) dest[name2] = [elem];
      else dest[name2].push(elem);
    }
    function parse(header) {
      const offers = /* @__PURE__ */ Object.create(null);
      let params = /* @__PURE__ */ Object.create(null);
      let mustUnescape = false;
      let isEscaping = false;
      let inQuotes = false;
      let extensionName;
      let paramName;
      let start = -1;
      let code = -1;
      let end = -1;
      let i = 0;
      for (; i < header.length; i++) {
        code = header.charCodeAt(i);
        if (extensionName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (i !== 0 && (code === 32 || code === 9)) {
            if (end === -1 && start !== -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            const name2 = header.slice(start, end);
            if (code === 44) {
              push(offers, name2, params);
              params = /* @__PURE__ */ Object.create(null);
            } else {
              extensionName = name2;
            }
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else if (paramName === void 0) {
          if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (code === 32 || code === 9) {
            if (end === -1 && start !== -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            push(params, header.slice(start, end), true);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            start = end = -1;
          } else if (code === 61 && start !== -1 && end === -1) {
            paramName = header.slice(start, i);
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else {
          if (isEscaping) {
            if (tokenChars[code] !== 1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (start === -1) start = i;
            else if (!mustUnescape) mustUnescape = true;
            isEscaping = false;
          } else if (inQuotes) {
            if (tokenChars[code] === 1) {
              if (start === -1) start = i;
            } else if (code === 34 && start !== -1) {
              inQuotes = false;
              end = i;
            } else if (code === 92) {
              isEscaping = true;
            } else {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
          } else if (code === 34 && header.charCodeAt(i - 1) === 61) {
            inQuotes = true;
          } else if (end === -1 && tokenChars[code] === 1) {
            if (start === -1) start = i;
          } else if (start !== -1 && (code === 32 || code === 9)) {
            if (end === -1) end = i;
          } else if (code === 59 || code === 44) {
            if (start === -1) {
              throw new SyntaxError(`Unexpected character at index ${i}`);
            }
            if (end === -1) end = i;
            let value = header.slice(start, end);
            if (mustUnescape) {
              value = value.replace(/\\/g, "");
              mustUnescape = false;
            }
            push(params, paramName, value);
            if (code === 44) {
              push(offers, extensionName, params);
              params = /* @__PURE__ */ Object.create(null);
              extensionName = void 0;
            }
            paramName = void 0;
            start = end = -1;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        }
      }
      if (start === -1 || inQuotes || code === 32 || code === 9) {
        throw new SyntaxError("Unexpected end of input");
      }
      if (end === -1) end = i;
      const token = header.slice(start, end);
      if (extensionName === void 0) {
        push(offers, token, params);
      } else {
        if (paramName === void 0) {
          push(params, token, true);
        } else if (mustUnescape) {
          push(params, paramName, token.replace(/\\/g, ""));
        } else {
          push(params, paramName, token);
        }
        push(offers, extensionName, params);
      }
      return offers;
    }
    function format(extensions) {
      return Object.keys(extensions).map((extension2) => {
        let configurations = extensions[extension2];
        if (!Array.isArray(configurations)) configurations = [configurations];
        return configurations.map((params) => {
          return [extension2].concat(
            Object.keys(params).map((k) => {
              let values = params[k];
              if (!Array.isArray(values)) values = [values];
              return values.map((v) => v === true ? k : `${k}=${v}`).join("; ");
            })
          ).join("; ");
        }).join(", ");
      }).join(", ");
    }
    module.exports = { format, parse };
  }
});

// ../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/websocket.js
var require_websocket = __commonJS({
  "../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/websocket.js"(exports, module) {
    "use strict";
    var EventEmitter = __require("events");
    var https = __require("https");
    var http = __require("http");
    var net = __require("net");
    var tls = __require("tls");
    var { randomBytes, createHash } = __require("crypto");
    var { Duplex, Readable } = __require("stream");
    var { URL: URL2 } = __require("url");
    var PerMessageDeflate2 = require_permessage_deflate();
    var Receiver2 = require_receiver();
    var Sender2 = require_sender();
    var { isBlob } = require_validation();
    var {
      BINARY_TYPES,
      CLOSE_TIMEOUT,
      EMPTY_BUFFER,
      GUID,
      kForOnEventAttribute,
      kListener,
      kStatusCode,
      kWebSocket,
      NOOP
    } = require_constants();
    var {
      EventTarget: { addEventListener, removeEventListener }
    } = require_event_target();
    var { format, parse } = require_extension();
    var { toBuffer } = require_buffer_util();
    var kAborted = /* @__PURE__ */ Symbol("kAborted");
    var protocolVersions = [8, 13];
    var readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
    var subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;
    var WebSocket2 = class _WebSocket extends EventEmitter {
      /**
       * Create a new `WebSocket`.
       *
       * @param {(String|URL)} address The URL to which to connect
       * @param {(String|String[])} [protocols] The subprotocols
       * @param {Object} [options] Connection options
       */
      constructor(address, protocols, options) {
        super();
        this._binaryType = BINARY_TYPES[0];
        this._closeCode = 1006;
        this._closeFrameReceived = false;
        this._closeFrameSent = false;
        this._closeMessage = EMPTY_BUFFER;
        this._closeTimer = null;
        this._errorEmitted = false;
        this._extensions = {};
        this._paused = false;
        this._protocol = "";
        this._readyState = _WebSocket.CONNECTING;
        this._receiver = null;
        this._sender = null;
        this._socket = null;
        if (address !== null) {
          this._bufferedAmount = 0;
          this._isServer = false;
          this._redirects = 0;
          if (protocols === void 0) {
            protocols = [];
          } else if (!Array.isArray(protocols)) {
            if (typeof protocols === "object" && protocols !== null) {
              options = protocols;
              protocols = [];
            } else {
              protocols = [protocols];
            }
          }
          initAsClient(this, address, protocols, options);
        } else {
          this._autoPong = options.autoPong;
          this._closeTimeout = options.closeTimeout;
          this._isServer = true;
        }
      }
      /**
       * For historical reasons, the custom "nodebuffer" type is used by the default
       * instead of "blob".
       *
       * @type {String}
       */
      get binaryType() {
        return this._binaryType;
      }
      set binaryType(type) {
        if (!BINARY_TYPES.includes(type)) return;
        this._binaryType = type;
        if (this._receiver) this._receiver._binaryType = type;
      }
      /**
       * @type {Number}
       */
      get bufferedAmount() {
        if (!this._socket) return this._bufferedAmount;
        return this._socket._writableState.length + this._sender._bufferedBytes;
      }
      /**
       * @type {String}
       */
      get extensions() {
        return Object.keys(this._extensions).join();
      }
      /**
       * @type {Boolean}
       */
      get isPaused() {
        return this._paused;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onclose() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onerror() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onopen() {
        return null;
      }
      /**
       * @type {Function}
       */
      /* istanbul ignore next */
      get onmessage() {
        return null;
      }
      /**
       * @type {String}
       */
      get protocol() {
        return this._protocol;
      }
      /**
       * @type {Number}
       */
      get readyState() {
        return this._readyState;
      }
      /**
       * @type {String}
       */
      get url() {
        return this._url;
      }
      /**
       * Set up the socket and the internal resources.
       *
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Object} options Options object
       * @param {Boolean} [options.allowSynchronousEvents=false] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {Function} [options.generateMask] The function used to generate the
       *     masking key
       * @param {Number} [options.maxPayload=0] The maximum allowed message size
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       * @private
       */
      setSocket(socket, head, options) {
        const receiver = new Receiver2({
          allowSynchronousEvents: options.allowSynchronousEvents,
          binaryType: this.binaryType,
          extensions: this._extensions,
          isServer: this._isServer,
          maxPayload: options.maxPayload,
          skipUTF8Validation: options.skipUTF8Validation
        });
        const sender = new Sender2(socket, this._extensions, options.generateMask);
        this._receiver = receiver;
        this._sender = sender;
        this._socket = socket;
        receiver[kWebSocket] = this;
        sender[kWebSocket] = this;
        socket[kWebSocket] = this;
        receiver.on("conclude", receiverOnConclude);
        receiver.on("drain", receiverOnDrain);
        receiver.on("error", receiverOnError);
        receiver.on("message", receiverOnMessage);
        receiver.on("ping", receiverOnPing);
        receiver.on("pong", receiverOnPong);
        sender.onerror = senderOnError;
        if (socket.setTimeout) socket.setTimeout(0);
        if (socket.setNoDelay) socket.setNoDelay();
        if (head.length > 0) socket.unshift(head);
        socket.on("close", socketOnClose);
        socket.on("data", socketOnData);
        socket.on("end", socketOnEnd);
        socket.on("error", socketOnError);
        this._readyState = _WebSocket.OPEN;
        this.emit("open");
      }
      /**
       * Emit the `'close'` event.
       *
       * @private
       */
      emitClose() {
        if (!this._socket) {
          this._readyState = _WebSocket.CLOSED;
          this.emit("close", this._closeCode, this._closeMessage);
          return;
        }
        if (this._extensions[PerMessageDeflate2.extensionName]) {
          this._extensions[PerMessageDeflate2.extensionName].cleanup();
        }
        this._receiver.removeAllListeners();
        this._readyState = _WebSocket.CLOSED;
        this.emit("close", this._closeCode, this._closeMessage);
      }
      /**
       * Start a closing handshake.
       *
       *          +----------+   +-----------+   +----------+
       *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
       *    |     +----------+   +-----------+   +----------+     |
       *          +----------+   +-----------+         |
       * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
       *          +----------+   +-----------+   |
       *    |           |                        |   +---+        |
       *                +------------------------+-->|fin| - - - -
       *    |         +---+                      |   +---+
       *     - - - - -|fin|<---------------------+
       *              +---+
       *
       * @param {Number} [code] Status code explaining why the connection is closing
       * @param {(String|Buffer)} [data] The reason why the connection is
       *     closing
       * @public
       */
      close(code, data) {
        if (this.readyState === _WebSocket.CLOSED) return;
        if (this.readyState === _WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          abortHandshake(this, this._req, msg);
          return;
        }
        if (this.readyState === _WebSocket.CLOSING) {
          if (this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted)) {
            this._socket.end();
          }
          return;
        }
        this._readyState = _WebSocket.CLOSING;
        this._sender.close(code, data, !this._isServer, (err) => {
          if (err) return;
          this._closeFrameSent = true;
          if (this._closeFrameReceived || this._receiver._writableState.errorEmitted) {
            this._socket.end();
          }
        });
        setCloseTimer(this);
      }
      /**
       * Pause the socket.
       *
       * @public
       */
      pause() {
        if (this.readyState === _WebSocket.CONNECTING || this.readyState === _WebSocket.CLOSED) {
          return;
        }
        this._paused = true;
        this._socket.pause();
      }
      /**
       * Send a ping.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the ping is sent
       * @public
       */
      ping(data, mask, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0) mask = !this._isServer;
        this._sender.ping(data || EMPTY_BUFFER, mask, cb);
      }
      /**
       * Send a pong.
       *
       * @param {*} [data] The data to send
       * @param {Boolean} [mask] Indicates whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when the pong is sent
       * @public
       */
      pong(data, mask, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof data === "function") {
          cb = data;
          data = mask = void 0;
        } else if (typeof mask === "function") {
          cb = mask;
          mask = void 0;
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        if (mask === void 0) mask = !this._isServer;
        this._sender.pong(data || EMPTY_BUFFER, mask, cb);
      }
      /**
       * Resume the socket.
       *
       * @public
       */
      resume() {
        if (this.readyState === _WebSocket.CONNECTING || this.readyState === _WebSocket.CLOSED) {
          return;
        }
        this._paused = false;
        if (!this._receiver._writableState.needDrain) this._socket.resume();
      }
      /**
       * Send a data message.
       *
       * @param {*} data The message to send
       * @param {Object} [options] Options object
       * @param {Boolean} [options.binary] Specifies whether `data` is binary or
       *     text
       * @param {Boolean} [options.compress] Specifies whether or not to compress
       *     `data`
       * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
       *     last one
       * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
       * @param {Function} [cb] Callback which is executed when data is written out
       * @public
       */
      send(data, options, cb) {
        if (this.readyState === _WebSocket.CONNECTING) {
          throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
        }
        if (typeof options === "function") {
          cb = options;
          options = {};
        }
        if (typeof data === "number") data = data.toString();
        if (this.readyState !== _WebSocket.OPEN) {
          sendAfterClose(this, data, cb);
          return;
        }
        const opts = {
          binary: typeof data !== "string",
          mask: !this._isServer,
          compress: true,
          fin: true,
          ...options
        };
        if (!this._extensions[PerMessageDeflate2.extensionName]) {
          opts.compress = false;
        }
        this._sender.send(data || EMPTY_BUFFER, opts, cb);
      }
      /**
       * Forcibly close the connection.
       *
       * @public
       */
      terminate() {
        if (this.readyState === _WebSocket.CLOSED) return;
        if (this.readyState === _WebSocket.CONNECTING) {
          const msg = "WebSocket was closed before the connection was established";
          abortHandshake(this, this._req, msg);
          return;
        }
        if (this._socket) {
          this._readyState = _WebSocket.CLOSING;
          this._socket.destroy();
        }
      }
    };
    Object.defineProperty(WebSocket2, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket2.prototype, "CONNECTING", {
      enumerable: true,
      value: readyStates.indexOf("CONNECTING")
    });
    Object.defineProperty(WebSocket2, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket2.prototype, "OPEN", {
      enumerable: true,
      value: readyStates.indexOf("OPEN")
    });
    Object.defineProperty(WebSocket2, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket2.prototype, "CLOSING", {
      enumerable: true,
      value: readyStates.indexOf("CLOSING")
    });
    Object.defineProperty(WebSocket2, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    Object.defineProperty(WebSocket2.prototype, "CLOSED", {
      enumerable: true,
      value: readyStates.indexOf("CLOSED")
    });
    [
      "binaryType",
      "bufferedAmount",
      "extensions",
      "isPaused",
      "protocol",
      "readyState",
      "url"
    ].forEach((property) => {
      Object.defineProperty(WebSocket2.prototype, property, { enumerable: true });
    });
    ["open", "error", "close", "message"].forEach((method) => {
      Object.defineProperty(WebSocket2.prototype, `on${method}`, {
        enumerable: true,
        get() {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute]) return listener[kListener];
          }
          return null;
        },
        set(handler2) {
          for (const listener of this.listeners(method)) {
            if (listener[kForOnEventAttribute]) {
              this.removeListener(method, listener);
              break;
            }
          }
          if (typeof handler2 !== "function") return;
          this.addEventListener(method, handler2, {
            [kForOnEventAttribute]: true
          });
        }
      });
    });
    WebSocket2.prototype.addEventListener = addEventListener;
    WebSocket2.prototype.removeEventListener = removeEventListener;
    module.exports = WebSocket2;
    function initAsClient(websocket, address, protocols, options) {
      const opts = {
        allowSynchronousEvents: true,
        autoPong: true,
        closeTimeout: CLOSE_TIMEOUT,
        protocolVersion: protocolVersions[1],
        maxPayload: 100 * 1024 * 1024,
        skipUTF8Validation: false,
        perMessageDeflate: true,
        followRedirects: false,
        maxRedirects: 10,
        ...options,
        socketPath: void 0,
        hostname: void 0,
        protocol: void 0,
        timeout: void 0,
        method: "GET",
        host: void 0,
        path: void 0,
        port: void 0
      };
      websocket._autoPong = opts.autoPong;
      websocket._closeTimeout = opts.closeTimeout;
      if (!protocolVersions.includes(opts.protocolVersion)) {
        throw new RangeError(
          `Unsupported protocol version: ${opts.protocolVersion} (supported versions: ${protocolVersions.join(", ")})`
        );
      }
      let parsedUrl;
      if (address instanceof URL2) {
        parsedUrl = address;
      } else {
        try {
          parsedUrl = new URL2(address);
        } catch {
          throw new SyntaxError(`Invalid URL: ${address}`);
        }
      }
      if (parsedUrl.protocol === "http:") {
        parsedUrl.protocol = "ws:";
      } else if (parsedUrl.protocol === "https:") {
        parsedUrl.protocol = "wss:";
      }
      websocket._url = parsedUrl.href;
      const isSecure = parsedUrl.protocol === "wss:";
      const isIpcUrl = parsedUrl.protocol === "ws+unix:";
      let invalidUrlMessage;
      if (parsedUrl.protocol !== "ws:" && !isSecure && !isIpcUrl) {
        invalidUrlMessage = `The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`;
      } else if (isIpcUrl && !parsedUrl.pathname) {
        invalidUrlMessage = "The URL's pathname is empty";
      } else if (parsedUrl.hash) {
        invalidUrlMessage = "The URL contains a fragment identifier";
      }
      if (invalidUrlMessage) {
        const err = new SyntaxError(invalidUrlMessage);
        if (websocket._redirects === 0) {
          throw err;
        } else {
          emitErrorAndClose(websocket, err);
          return;
        }
      }
      const defaultPort = isSecure ? 443 : 80;
      const key = randomBytes(16).toString("base64");
      const request = isSecure ? https.request : http.request;
      const protocolSet = /* @__PURE__ */ new Set();
      let perMessageDeflate;
      opts.createConnection = opts.createConnection || (isSecure ? tlsConnect : netConnect);
      opts.defaultPort = opts.defaultPort || defaultPort;
      opts.port = parsedUrl.port || defaultPort;
      opts.host = parsedUrl.hostname.startsWith("[") ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
      opts.headers = {
        ...opts.headers,
        "Sec-WebSocket-Version": opts.protocolVersion,
        "Sec-WebSocket-Key": key,
        Connection: "Upgrade",
        Upgrade: "websocket"
      };
      opts.path = parsedUrl.pathname + parsedUrl.search;
      opts.timeout = opts.handshakeTimeout;
      if (opts.perMessageDeflate) {
        perMessageDeflate = new PerMessageDeflate2({
          ...opts.perMessageDeflate,
          isServer: false,
          maxPayload: opts.maxPayload
        });
        opts.headers["Sec-WebSocket-Extensions"] = format({
          [PerMessageDeflate2.extensionName]: perMessageDeflate.offer()
        });
      }
      if (protocols.length) {
        for (const protocol of protocols) {
          if (typeof protocol !== "string" || !subprotocolRegex.test(protocol) || protocolSet.has(protocol)) {
            throw new SyntaxError(
              "An invalid or duplicated subprotocol was specified"
            );
          }
          protocolSet.add(protocol);
        }
        opts.headers["Sec-WebSocket-Protocol"] = protocols.join(",");
      }
      if (opts.origin) {
        if (opts.protocolVersion < 13) {
          opts.headers["Sec-WebSocket-Origin"] = opts.origin;
        } else {
          opts.headers.Origin = opts.origin;
        }
      }
      if (parsedUrl.username || parsedUrl.password) {
        opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
      }
      if (isIpcUrl) {
        const parts = opts.path.split(":");
        opts.socketPath = parts[0];
        opts.path = parts[1];
      }
      let req;
      if (opts.followRedirects) {
        if (websocket._redirects === 0) {
          websocket._originalIpc = isIpcUrl;
          websocket._originalSecure = isSecure;
          websocket._originalHostOrSocketPath = isIpcUrl ? opts.socketPath : parsedUrl.host;
          const headers = options && options.headers;
          options = { ...options, headers: {} };
          if (headers) {
            for (const [key2, value] of Object.entries(headers)) {
              options.headers[key2.toLowerCase()] = value;
            }
          }
        } else if (websocket.listenerCount("redirect") === 0) {
          const isSameHost = isIpcUrl ? websocket._originalIpc ? opts.socketPath === websocket._originalHostOrSocketPath : false : websocket._originalIpc ? false : parsedUrl.host === websocket._originalHostOrSocketPath;
          if (!isSameHost || websocket._originalSecure && !isSecure) {
            delete opts.headers.authorization;
            delete opts.headers.cookie;
            if (!isSameHost) delete opts.headers.host;
            opts.auth = void 0;
          }
        }
        if (opts.auth && !options.headers.authorization) {
          options.headers.authorization = "Basic " + Buffer.from(opts.auth).toString("base64");
        }
        req = websocket._req = request(opts);
        if (websocket._redirects) {
          websocket.emit("redirect", websocket.url, req);
        }
      } else {
        req = websocket._req = request(opts);
      }
      if (opts.timeout) {
        req.on("timeout", () => {
          abortHandshake(websocket, req, "Opening handshake has timed out");
        });
      }
      req.on("error", (err) => {
        if (req === null || req[kAborted]) return;
        req = websocket._req = null;
        emitErrorAndClose(websocket, err);
      });
      req.on("response", (res) => {
        const location = res.headers.location;
        const statusCode = res.statusCode;
        if (location && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
          if (++websocket._redirects > opts.maxRedirects) {
            abortHandshake(websocket, req, "Maximum redirects exceeded");
            return;
          }
          req.abort();
          let addr;
          try {
            addr = new URL2(location, address);
          } catch (e) {
            const err = new SyntaxError(`Invalid URL: ${location}`);
            emitErrorAndClose(websocket, err);
            return;
          }
          initAsClient(websocket, addr, protocols, options);
        } else if (!websocket.emit("unexpected-response", req, res)) {
          abortHandshake(
            websocket,
            req,
            `Unexpected server response: ${res.statusCode}`
          );
        }
      });
      req.on("upgrade", (res, socket, head) => {
        websocket.emit("upgrade", res);
        if (websocket.readyState !== WebSocket2.CONNECTING) return;
        req = websocket._req = null;
        const upgrade = res.headers.upgrade;
        if (upgrade === void 0 || upgrade.toLowerCase() !== "websocket") {
          abortHandshake(websocket, socket, "Invalid Upgrade header");
          return;
        }
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        if (res.headers["sec-websocket-accept"] !== digest) {
          abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Accept header");
          return;
        }
        const serverProt = res.headers["sec-websocket-protocol"];
        let protError;
        if (serverProt !== void 0) {
          if (!protocolSet.size) {
            protError = "Server sent a subprotocol but none was requested";
          } else if (!protocolSet.has(serverProt)) {
            protError = "Server sent an invalid subprotocol";
          }
        } else if (protocolSet.size) {
          protError = "Server sent no subprotocol";
        }
        if (protError) {
          abortHandshake(websocket, socket, protError);
          return;
        }
        if (serverProt) websocket._protocol = serverProt;
        const secWebSocketExtensions = res.headers["sec-websocket-extensions"];
        if (secWebSocketExtensions !== void 0) {
          if (!perMessageDeflate) {
            const message = "Server sent a Sec-WebSocket-Extensions header but no extension was requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          let extensions;
          try {
            extensions = parse(secWebSocketExtensions);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          const extensionNames = Object.keys(extensions);
          if (extensionNames.length !== 1 || extensionNames[0] !== PerMessageDeflate2.extensionName) {
            const message = "Server indicated an extension that was not requested";
            abortHandshake(websocket, socket, message);
            return;
          }
          try {
            perMessageDeflate.accept(extensions[PerMessageDeflate2.extensionName]);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Extensions header";
            abortHandshake(websocket, socket, message);
            return;
          }
          websocket._extensions[PerMessageDeflate2.extensionName] = perMessageDeflate;
        }
        websocket.setSocket(socket, head, {
          allowSynchronousEvents: opts.allowSynchronousEvents,
          generateMask: opts.generateMask,
          maxPayload: opts.maxPayload,
          skipUTF8Validation: opts.skipUTF8Validation
        });
      });
      if (opts.finishRequest) {
        opts.finishRequest(req, websocket);
      } else {
        req.end();
      }
    }
    function emitErrorAndClose(websocket, err) {
      websocket._readyState = WebSocket2.CLOSING;
      websocket._errorEmitted = true;
      websocket.emit("error", err);
      websocket.emitClose();
    }
    function netConnect(options) {
      options.path = options.socketPath;
      return net.connect(options);
    }
    function tlsConnect(options) {
      options.path = void 0;
      if (!options.servername && options.servername !== "") {
        options.servername = net.isIP(options.host) ? "" : options.host;
      }
      return tls.connect(options);
    }
    function abortHandshake(websocket, stream, message) {
      websocket._readyState = WebSocket2.CLOSING;
      const err = new Error(message);
      Error.captureStackTrace(err, abortHandshake);
      if (stream.setHeader) {
        stream[kAborted] = true;
        stream.abort();
        if (stream.socket && !stream.socket.destroyed) {
          stream.socket.destroy();
        }
        process.nextTick(emitErrorAndClose, websocket, err);
      } else {
        stream.destroy(err);
        stream.once("error", websocket.emit.bind(websocket, "error"));
        stream.once("close", websocket.emitClose.bind(websocket));
      }
    }
    function sendAfterClose(websocket, data, cb) {
      if (data) {
        const length = isBlob(data) ? data.size : toBuffer(data).length;
        if (websocket._socket) websocket._sender._bufferedBytes += length;
        else websocket._bufferedAmount += length;
      }
      if (cb) {
        const err = new Error(
          `WebSocket is not open: readyState ${websocket.readyState} (${readyStates[websocket.readyState]})`
        );
        process.nextTick(cb, err);
      }
    }
    function receiverOnConclude(code, reason) {
      const websocket = this[kWebSocket];
      websocket._closeFrameReceived = true;
      websocket._closeMessage = reason;
      websocket._closeCode = code;
      if (websocket._socket[kWebSocket] === void 0) return;
      websocket._socket.removeListener("data", socketOnData);
      process.nextTick(resume, websocket._socket);
      if (code === 1005) websocket.close();
      else websocket.close(code, reason);
    }
    function receiverOnDrain() {
      const websocket = this[kWebSocket];
      if (!websocket.isPaused) websocket._socket.resume();
    }
    function receiverOnError(err) {
      const websocket = this[kWebSocket];
      if (websocket._socket[kWebSocket] !== void 0) {
        websocket._socket.removeListener("data", socketOnData);
        process.nextTick(resume, websocket._socket);
        websocket.close(err[kStatusCode]);
      }
      if (!websocket._errorEmitted) {
        websocket._errorEmitted = true;
        websocket.emit("error", err);
      }
    }
    function receiverOnFinish() {
      this[kWebSocket].emitClose();
    }
    function receiverOnMessage(data, isBinary) {
      this[kWebSocket].emit("message", data, isBinary);
    }
    function receiverOnPing(data) {
      const websocket = this[kWebSocket];
      if (websocket._autoPong) websocket.pong(data, !this._isServer, NOOP);
      websocket.emit("ping", data);
    }
    function receiverOnPong(data) {
      this[kWebSocket].emit("pong", data);
    }
    function resume(stream) {
      stream.resume();
    }
    function senderOnError(err) {
      const websocket = this[kWebSocket];
      if (websocket.readyState === WebSocket2.CLOSED) return;
      if (websocket.readyState === WebSocket2.OPEN) {
        websocket._readyState = WebSocket2.CLOSING;
        setCloseTimer(websocket);
      }
      this._socket.end();
      if (!websocket._errorEmitted) {
        websocket._errorEmitted = true;
        websocket.emit("error", err);
      }
    }
    function setCloseTimer(websocket) {
      websocket._closeTimer = setTimeout(
        websocket._socket.destroy.bind(websocket._socket),
        websocket._closeTimeout
      );
    }
    function socketOnClose() {
      const websocket = this[kWebSocket];
      this.removeListener("close", socketOnClose);
      this.removeListener("data", socketOnData);
      this.removeListener("end", socketOnEnd);
      websocket._readyState = WebSocket2.CLOSING;
      if (!this._readableState.endEmitted && !websocket._closeFrameReceived && !websocket._receiver._writableState.errorEmitted && this._readableState.length !== 0) {
        const chunk = this.read(this._readableState.length);
        websocket._receiver.write(chunk);
      }
      websocket._receiver.end();
      this[kWebSocket] = void 0;
      clearTimeout(websocket._closeTimer);
      if (websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted) {
        websocket.emitClose();
      } else {
        websocket._receiver.on("error", receiverOnFinish);
        websocket._receiver.on("finish", receiverOnFinish);
      }
    }
    function socketOnData(chunk) {
      if (!this[kWebSocket]._receiver.write(chunk)) {
        this.pause();
      }
    }
    function socketOnEnd() {
      const websocket = this[kWebSocket];
      websocket._readyState = WebSocket2.CLOSING;
      websocket._receiver.end();
      this.end();
    }
    function socketOnError() {
      const websocket = this[kWebSocket];
      this.removeListener("error", socketOnError);
      this.on("error", NOOP);
      if (websocket) {
        websocket._readyState = WebSocket2.CLOSING;
        this.destroy();
      }
    }
  }
});

// ../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/stream.js
var require_stream = __commonJS({
  "../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/stream.js"(exports, module) {
    "use strict";
    var WebSocket2 = require_websocket();
    var { Duplex } = __require("stream");
    function emitClose(stream) {
      stream.emit("close");
    }
    function duplexOnEnd() {
      if (!this.destroyed && this._writableState.finished) {
        this.destroy();
      }
    }
    function duplexOnError(err) {
      this.removeListener("error", duplexOnError);
      this.destroy();
      if (this.listenerCount("error") === 0) {
        this.emit("error", err);
      }
    }
    function createWebSocketStream2(ws, options) {
      let terminateOnDestroy = true;
      const duplex = new Duplex({
        ...options,
        autoDestroy: false,
        emitClose: false,
        objectMode: false,
        writableObjectMode: false
      });
      ws.on("message", function message(msg, isBinary) {
        const data = !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;
        if (!duplex.push(data)) ws.pause();
      });
      ws.once("error", function error(err) {
        if (duplex.destroyed) return;
        terminateOnDestroy = false;
        duplex.destroy(err);
      });
      ws.once("close", function close() {
        if (duplex.destroyed) return;
        duplex.push(null);
      });
      duplex._destroy = function(err, callback) {
        if (ws.readyState === ws.CLOSED) {
          callback(err);
          process.nextTick(emitClose, duplex);
          return;
        }
        let called = false;
        ws.once("error", function error(err2) {
          called = true;
          callback(err2);
        });
        ws.once("close", function close() {
          if (!called) callback(err);
          process.nextTick(emitClose, duplex);
        });
        if (terminateOnDestroy) ws.terminate();
      };
      duplex._final = function(callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._final(callback);
          });
          return;
        }
        if (ws._socket === null) return;
        if (ws._socket._writableState.finished) {
          callback();
          if (duplex._readableState.endEmitted) duplex.destroy();
        } else {
          ws._socket.once("finish", function finish() {
            callback();
          });
          ws.close();
        }
      };
      duplex._read = function() {
        if (ws.isPaused) ws.resume();
      };
      duplex._write = function(chunk, encoding, callback) {
        if (ws.readyState === ws.CONNECTING) {
          ws.once("open", function open() {
            duplex._write(chunk, encoding, callback);
          });
          return;
        }
        ws.send(chunk, callback);
      };
      duplex.on("end", duplexOnEnd);
      duplex.on("error", duplexOnError);
      return duplex;
    }
    module.exports = createWebSocketStream2;
  }
});

// ../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/subprotocol.js
var require_subprotocol = __commonJS({
  "../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/subprotocol.js"(exports, module) {
    "use strict";
    var { tokenChars } = require_validation();
    function parse(header) {
      const protocols = /* @__PURE__ */ new Set();
      let start = -1;
      let end = -1;
      let i = 0;
      for (i; i < header.length; i++) {
        const code = header.charCodeAt(i);
        if (end === -1 && tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (i !== 0 && (code === 32 || code === 9)) {
          if (end === -1 && start !== -1) end = i;
        } else if (code === 44) {
          if (start === -1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
          if (end === -1) end = i;
          const protocol2 = header.slice(start, end);
          if (protocols.has(protocol2)) {
            throw new SyntaxError(`The "${protocol2}" subprotocol is duplicated`);
          }
          protocols.add(protocol2);
          start = end = -1;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      }
      if (start === -1 || end !== -1) {
        throw new SyntaxError("Unexpected end of input");
      }
      const protocol = header.slice(start, i);
      if (protocols.has(protocol)) {
        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
      }
      protocols.add(protocol);
      return protocols;
    }
    module.exports = { parse };
  }
});

// ../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/websocket-server.js
var require_websocket_server = __commonJS({
  "../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/lib/websocket-server.js"(exports, module) {
    "use strict";
    var EventEmitter = __require("events");
    var http = __require("http");
    var { Duplex } = __require("stream");
    var { createHash } = __require("crypto");
    var extension2 = require_extension();
    var PerMessageDeflate2 = require_permessage_deflate();
    var subprotocol2 = require_subprotocol();
    var WebSocket2 = require_websocket();
    var { CLOSE_TIMEOUT, GUID, kWebSocket } = require_constants();
    var keyRegex = /^[+/0-9A-Za-z]{22}==$/;
    var RUNNING = 0;
    var CLOSING = 1;
    var CLOSED = 2;
    var WebSocketServer2 = class extends EventEmitter {
      /**
       * Create a `WebSocketServer` instance.
       *
       * @param {Object} options Configuration options
       * @param {Boolean} [options.allowSynchronousEvents=true] Specifies whether
       *     any of the `'message'`, `'ping'`, and `'pong'` events can be emitted
       *     multiple times in the same tick
       * @param {Boolean} [options.autoPong=true] Specifies whether or not to
       *     automatically send a pong in response to a ping
       * @param {Number} [options.backlog=511] The maximum length of the queue of
       *     pending connections
       * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
       *     track clients
       * @param {Number} [options.closeTimeout=30000] Duration in milliseconds to
       *     wait for the closing handshake to finish after `websocket.close()` is
       *     called
       * @param {Function} [options.handleProtocols] A hook to handle protocols
       * @param {String} [options.host] The hostname where to bind the server
       * @param {Number} [options.maxPayload=104857600] The maximum allowed message
       *     size
       * @param {Boolean} [options.noServer=false] Enable no server mode
       * @param {String} [options.path] Accept only connections matching this path
       * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
       *     permessage-deflate
       * @param {Number} [options.port] The port where to bind the server
       * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
       *     server to use
       * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
       *     not to skip UTF-8 validation for text and close messages
       * @param {Function} [options.verifyClient] A hook to reject connections
       * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
       *     class to use. It must be the `WebSocket` class or class that extends it
       * @param {Function} [callback] A listener for the `listening` event
       */
      constructor(options, callback) {
        super();
        options = {
          allowSynchronousEvents: true,
          autoPong: true,
          maxPayload: 100 * 1024 * 1024,
          skipUTF8Validation: false,
          perMessageDeflate: false,
          handleProtocols: null,
          clientTracking: true,
          closeTimeout: CLOSE_TIMEOUT,
          verifyClient: null,
          noServer: false,
          backlog: null,
          // use default (511 as implemented in net.js)
          server: null,
          host: null,
          path: null,
          port: null,
          WebSocket: WebSocket2,
          ...options
        };
        if (options.port == null && !options.server && !options.noServer || options.port != null && (options.server || options.noServer) || options.server && options.noServer) {
          throw new TypeError(
            'One and only one of the "port", "server", or "noServer" options must be specified'
          );
        }
        if (options.port != null) {
          this._server = http.createServer((req, res) => {
            const body = http.STATUS_CODES[426];
            res.writeHead(426, {
              "Content-Length": body.length,
              "Content-Type": "text/plain"
            });
            res.end(body);
          });
          this._server.listen(
            options.port,
            options.host,
            options.backlog,
            callback
          );
        } else if (options.server) {
          this._server = options.server;
        }
        if (this._server) {
          const emitConnection = this.emit.bind(this, "connection");
          this._removeListeners = addListeners(this._server, {
            listening: this.emit.bind(this, "listening"),
            error: this.emit.bind(this, "error"),
            upgrade: (req, socket, head) => {
              this.handleUpgrade(req, socket, head, emitConnection);
            }
          });
        }
        if (options.perMessageDeflate === true) options.perMessageDeflate = {};
        if (options.clientTracking) {
          this.clients = /* @__PURE__ */ new Set();
          this._shouldEmitClose = false;
        }
        this.options = options;
        this._state = RUNNING;
      }
      /**
       * Returns the bound address, the address family name, and port of the server
       * as reported by the operating system if listening on an IP socket.
       * If the server is listening on a pipe or UNIX domain socket, the name is
       * returned as a string.
       *
       * @return {(Object|String|null)} The address of the server
       * @public
       */
      address() {
        if (this.options.noServer) {
          throw new Error('The server is operating in "noServer" mode');
        }
        if (!this._server) return null;
        return this._server.address();
      }
      /**
       * Stop the server from accepting new connections and emit the `'close'` event
       * when all existing connections are closed.
       *
       * @param {Function} [cb] A one-time listener for the `'close'` event
       * @public
       */
      close(cb) {
        if (this._state === CLOSED) {
          if (cb) {
            this.once("close", () => {
              cb(new Error("The server is not running"));
            });
          }
          process.nextTick(emitClose, this);
          return;
        }
        if (cb) this.once("close", cb);
        if (this._state === CLOSING) return;
        this._state = CLOSING;
        if (this.options.noServer || this.options.server) {
          if (this._server) {
            this._removeListeners();
            this._removeListeners = this._server = null;
          }
          if (this.clients) {
            if (!this.clients.size) {
              process.nextTick(emitClose, this);
            } else {
              this._shouldEmitClose = true;
            }
          } else {
            process.nextTick(emitClose, this);
          }
        } else {
          const server = this._server;
          this._removeListeners();
          this._removeListeners = this._server = null;
          server.close(() => {
            emitClose(this);
          });
        }
      }
      /**
       * See if a given request should be handled by this server instance.
       *
       * @param {http.IncomingMessage} req Request object to inspect
       * @return {Boolean} `true` if the request is valid, else `false`
       * @public
       */
      shouldHandle(req) {
        if (this.options.path) {
          const index2 = req.url.indexOf("?");
          const pathname = index2 !== -1 ? req.url.slice(0, index2) : req.url;
          if (pathname !== this.options.path) return false;
        }
        return true;
      }
      /**
       * Handle a HTTP Upgrade request.
       *
       * @param {http.IncomingMessage} req The request object
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @public
       */
      handleUpgrade(req, socket, head, cb) {
        socket.on("error", socketOnError);
        const key = req.headers["sec-websocket-key"];
        const upgrade = req.headers.upgrade;
        const version2 = +req.headers["sec-websocket-version"];
        if (req.method !== "GET") {
          const message = "Invalid HTTP method";
          abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
          return;
        }
        if (upgrade === void 0 || upgrade.toLowerCase() !== "websocket") {
          const message = "Invalid Upgrade header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (key === void 0 || !keyRegex.test(key)) {
          const message = "Missing or invalid Sec-WebSocket-Key header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
        if (version2 !== 13 && version2 !== 8) {
          const message = "Missing or invalid Sec-WebSocket-Version header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message, {
            "Sec-WebSocket-Version": "13, 8"
          });
          return;
        }
        if (!this.shouldHandle(req)) {
          abortHandshake(socket, 400);
          return;
        }
        const secWebSocketProtocol = req.headers["sec-websocket-protocol"];
        let protocols = /* @__PURE__ */ new Set();
        if (secWebSocketProtocol !== void 0) {
          try {
            protocols = subprotocol2.parse(secWebSocketProtocol);
          } catch (err) {
            const message = "Invalid Sec-WebSocket-Protocol header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        const secWebSocketExtensions = req.headers["sec-websocket-extensions"];
        const extensions = {};
        if (this.options.perMessageDeflate && secWebSocketExtensions !== void 0) {
          const perMessageDeflate = new PerMessageDeflate2({
            ...this.options.perMessageDeflate,
            isServer: true,
            maxPayload: this.options.maxPayload
          });
          try {
            const offers = extension2.parse(secWebSocketExtensions);
            if (offers[PerMessageDeflate2.extensionName]) {
              perMessageDeflate.accept(offers[PerMessageDeflate2.extensionName]);
              extensions[PerMessageDeflate2.extensionName] = perMessageDeflate;
            }
          } catch (err) {
            const message = "Invalid or unacceptable Sec-WebSocket-Extensions header";
            abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
            return;
          }
        }
        if (this.options.verifyClient) {
          const info = {
            origin: req.headers[`${version2 === 8 ? "sec-websocket-origin" : "origin"}`],
            secure: !!(req.socket.authorized || req.socket.encrypted),
            req
          };
          if (this.options.verifyClient.length === 2) {
            this.options.verifyClient(info, (verified, code, message, headers) => {
              if (!verified) {
                return abortHandshake(socket, code || 401, message, headers);
              }
              this.completeUpgrade(
                extensions,
                key,
                protocols,
                req,
                socket,
                head,
                cb
              );
            });
            return;
          }
          if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
        }
        this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
      }
      /**
       * Upgrade the connection to WebSocket.
       *
       * @param {Object} extensions The accepted extensions
       * @param {String} key The value of the `Sec-WebSocket-Key` header
       * @param {Set} protocols The subprotocols
       * @param {http.IncomingMessage} req The request object
       * @param {Duplex} socket The network socket between the server and client
       * @param {Buffer} head The first packet of the upgraded stream
       * @param {Function} cb Callback
       * @throws {Error} If called more than once with the same socket
       * @private
       */
      completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
        if (!socket.readable || !socket.writable) return socket.destroy();
        if (socket[kWebSocket]) {
          throw new Error(
            "server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration"
          );
        }
        if (this._state > RUNNING) return abortHandshake(socket, 503);
        const digest = createHash("sha1").update(key + GUID).digest("base64");
        const headers = [
          "HTTP/1.1 101 Switching Protocols",
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Accept: ${digest}`
        ];
        const ws = new this.options.WebSocket(null, void 0, this.options);
        if (protocols.size) {
          const protocol = this.options.handleProtocols ? this.options.handleProtocols(protocols, req) : protocols.values().next().value;
          if (protocol) {
            headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
            ws._protocol = protocol;
          }
        }
        if (extensions[PerMessageDeflate2.extensionName]) {
          const params = extensions[PerMessageDeflate2.extensionName].params;
          const value = extension2.format({
            [PerMessageDeflate2.extensionName]: [params]
          });
          headers.push(`Sec-WebSocket-Extensions: ${value}`);
          ws._extensions = extensions;
        }
        this.emit("headers", headers, req);
        socket.write(headers.concat("\r\n").join("\r\n"));
        socket.removeListener("error", socketOnError);
        ws.setSocket(socket, head, {
          allowSynchronousEvents: this.options.allowSynchronousEvents,
          maxPayload: this.options.maxPayload,
          skipUTF8Validation: this.options.skipUTF8Validation
        });
        if (this.clients) {
          this.clients.add(ws);
          ws.on("close", () => {
            this.clients.delete(ws);
            if (this._shouldEmitClose && !this.clients.size) {
              process.nextTick(emitClose, this);
            }
          });
        }
        cb(ws, req);
      }
    };
    module.exports = WebSocketServer2;
    function addListeners(server, map) {
      for (const event of Object.keys(map)) server.on(event, map[event]);
      return function removeListeners() {
        for (const event of Object.keys(map)) {
          server.removeListener(event, map[event]);
        }
      };
    }
    function emitClose(server) {
      server._state = CLOSED;
      server.emit("close");
    }
    function socketOnError() {
      this.destroy();
    }
    function abortHandshake(socket, code, message, headers) {
      message = message || http.STATUS_CODES[code];
      headers = {
        Connection: "close",
        "Content-Type": "text/html",
        "Content-Length": Buffer.byteLength(message),
        ...headers
      };
      socket.once("finish", socket.destroy);
      socket.end(
        `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r
` + Object.keys(headers).map((h) => `${h}: ${headers[h]}`).join("\r\n") + "\r\n\r\n" + message
      );
    }
    function abortHandshakeOrEmitwsClientError(server, req, socket, code, message, headers) {
      if (server.listenerCount("wsClientError")) {
        const err = new Error(message);
        Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);
        server.emit("wsClientError", err, socket, req);
      } else {
        abortHandshake(socket, code, message, headers);
      }
    }
  }
});

// ../../node_modules/.pnpm/promise-limit@2.7.0/node_modules/promise-limit/index.js
var require_promise_limit = __commonJS({
  "../../node_modules/.pnpm/promise-limit@2.7.0/node_modules/promise-limit/index.js"(exports, module) {
    function limiter(count) {
      var outstanding = 0;
      var jobs = [];
      function remove() {
        outstanding--;
        if (outstanding < count) {
          dequeue();
        }
      }
      function dequeue() {
        var job = jobs.shift();
        semaphore.queue = jobs.length;
        if (job) {
          run(job.fn).then(job.resolve).catch(job.reject);
        }
      }
      function queue(fn) {
        return new Promise(function(resolve, reject) {
          jobs.push({ fn, resolve, reject });
          semaphore.queue = jobs.length;
        });
      }
      function run(fn) {
        outstanding++;
        try {
          return Promise.resolve(fn()).then(function(result) {
            remove();
            return result;
          }, function(error) {
            remove();
            throw error;
          });
        } catch (err) {
          remove();
          return Promise.reject(err);
        }
      }
      var semaphore = function(fn) {
        if (outstanding >= count) {
          return queue(fn);
        } else {
          return run(fn);
        }
      };
      return semaphore;
    }
    function map(items, mapper) {
      var failed = false;
      var limit = this;
      return Promise.all(items.map(function() {
        var args = arguments;
        return limit(function() {
          if (!failed) {
            return mapper.apply(void 0, args).catch(function(e) {
              failed = true;
              throw e;
            });
          }
        });
      }));
    }
    function addExtras(fn) {
      fn.queue = 0;
      fn.map = map;
      return fn;
    }
    module.exports = function(count) {
      if (count) {
        return addExtras(limiter(count));
      } else {
        return addExtras(function(fn) {
          return fn();
        });
      }
    };
  }
});

// ../../node_modules/.pnpm/bcryptjs@3.0.3/node_modules/bcryptjs/index.js
import nodeCrypto from "crypto";
var nextTick = typeof setImmediate === "function" ? setImmediate : typeof scheduler === "object" && typeof scheduler.postTask === "function" ? scheduler.postTask.bind(scheduler) : setTimeout;
var BASE64_CODE = "./ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");

// ../../packages/shared/src/utils/index.ts
var import_dayjs = __toESM(require_dayjs_min());
var requireKeys = (source, ...keys) => {
  if (source === void 0)
    throw new Error("utils/index: requireKeys source was undefined");
  return keys.reduce((acc, it) => {
    const value = source[it];
    if (!value?.length) {
      console.error("utils/index: requireKeys", source);
      throw new Error(`${it} must be set`);
    }
    acc[it] = value;
    return acc;
  }, {});
};
var isLocalhost = typeof window !== "undefined" && Boolean(
  window.location.hostname === "localhost" || window.location.hostname === "[::1]" || window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);
var getRandomUnsplashImageUrl = async (topic) => {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey?.length)
    throw new Error("Missing UNSPLASH_ACCESS_KEY");
  const cleanTopic = encodeURIComponent(topic.replace(/[^a-zA-Z]/g, " "));
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${cleanTopic}`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${accessKey}`
      }
    });
    const data = await res.json();
    return data.urls.regular;
  } catch (e) {
    console.error("getRandomUnsplashImageUrl", e);
    return null;
  }
};

// ../../packages/shared/src/utils/firebase/client.ts
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
var firebaseEnv = requireKeys(
  {
    VITE_FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY,
    VITE_FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    VITE_FIREBASE_PROJECT_ID: process.env.VITE_FIREBASE_PROJECT_ID,
    VITE_FIREBASE_STORAGE_BUCKET: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    VITE_FIREBASE_MESSAGING_SENDER_ID: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    VITE_FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID
  },
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID"
);
var firebaseConfig = {
  apiKey: firebaseEnv.VITE_FIREBASE_API_KEY,
  authDomain: firebaseEnv.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: firebaseEnv.VITE_FIREBASE_PROJECT_ID,
  storageBucket: firebaseEnv.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: firebaseEnv.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: firebaseEnv.VITE_FIREBASE_APP_ID,
  measurementId: "@todo"
};
var app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
var auth = getAuth(app);
var googleProvider = new GoogleAuthProvider();

// ../../packages/shared/src/utils/api.ts
var ApiResponse = class {
  data;
  error;
  count;
  message;
  constructor(data, error, count, message) {
    this.data = data;
    this.error = error;
    this.count = count;
    this.message = message;
  }
};
var apiResponseBase = {
  ok: (res, data, status = 200) => res.status(status).json(new ApiResponse(data)),
  fail: (res, error, status, data) => res.status(status).json(new ApiResponse(data, error))
};
var apiResponse = {
  ...apiResponseBase,
  // Success helpers
  okMessage: (res, message) => apiResponseBase.ok(res, { message }),
  // Failure helpers
  notFound: (res, resource = "Resource") => apiResponseBase.fail(res, `${resource} not found`, 404),
  badRequest: (res, message = "Bad request") => apiResponseBase.fail(res, message, 400),
  unauthorized: (res, message = "Unauthorized") => apiResponseBase.fail(res, message, 401),
  forbidden: (res, message = "Forbidden") => apiResponseBase.fail(res, message, 403),
  invalidParams: (res, message = "Invalid params") => apiResponseBase.fail(res, message, 422),
  internalServerError: (res, message = "Internal server error") => apiResponseBase.fail(res, message ?? "Unknown error", 500)
};
var apiResponseBaseDeprecated = {
  ok: (data, status = 200) => new Response(
    JSON.stringify(data),
    { status, headers: { "Content-Type": "application/json" } }
  ),
  fail: (error, status, data) => new Response(
    JSON.stringify({ error, ...data }),
    { status, headers: { "Content-Type": "application/json" } }
  )
};
var apiResponseDeprecated = {
  ...apiResponseBaseDeprecated,
  // Success helpers
  okMessage: (message) => apiResponseBaseDeprecated.ok({ message }),
  // Failure helpers
  notFound: (resource = "Resource") => apiResponseBaseDeprecated.fail(`${resource} not found`, 404),
  badRequest: (message = "Bad request") => apiResponseBaseDeprecated.fail(message, 400),
  unauthorized: (message = "Unauthorized") => apiResponseBaseDeprecated.fail(message, 401),
  forbidden: (message = "Forbidden") => apiResponseBaseDeprecated.fail(message, 403),
  invalidParams: (message = "Invalid params") => apiResponseBaseDeprecated.fail(message, 422),
  internalServerError: (message = "Internal server error") => apiResponseBaseDeprecated.fail(message ?? "Unknown error", 500)
};

// ../../node_modules/.pnpm/dotenv@17.4.2/node_modules/dotenv/config.js
(function() {
  require_main().config(
    Object.assign(
      {},
      require_env_options(),
      require_cli_options()(process.argv)
    )
  );
})();

// ../../node_modules/.pnpm/@libsql+core@0.17.3/node_modules/@libsql/core/lib-esm/api.js
var LibsqlError = class extends Error {
  /** Machine-readable error code. */
  code;
  /** Extended error code with more specific information (e.g., SQLITE_CONSTRAINT_PRIMARYKEY). */
  extendedCode;
  /** Raw numeric error code */
  rawCode;
  constructor(message, code, extendedCode, rawCode, cause) {
    if (code !== void 0) {
      message = `${code}: ${message}`;
    }
    super(message, { cause });
    this.code = code;
    this.extendedCode = extendedCode;
    this.rawCode = rawCode;
    this.name = "LibsqlError";
  }
};
var LibsqlBatchError = class extends LibsqlError {
  /** The zero-based index of the statement that failed in the batch. */
  statementIndex;
  constructor(message, statementIndex, code, extendedCode, rawCode, cause) {
    super(message, code, extendedCode, rawCode, cause);
    this.statementIndex = statementIndex;
    this.name = "LibsqlBatchError";
  }
};

// ../../node_modules/.pnpm/@libsql+core@0.17.3/node_modules/@libsql/core/lib-esm/uri.js
function parseUri(text3) {
  const match = URI_RE.exec(text3);
  if (match === null) {
    throw new LibsqlError(`The URL '${text3}' is not in a valid format`, "URL_INVALID");
  }
  const groups = match.groups;
  const scheme = groups["scheme"];
  const authority = groups["authority"] !== void 0 ? parseAuthority(groups["authority"]) : void 0;
  const path = percentDecode(groups["path"]);
  const query = groups["query"] !== void 0 ? parseQuery(groups["query"]) : void 0;
  const fragment = groups["fragment"] !== void 0 ? percentDecode(groups["fragment"]) : void 0;
  return { scheme, authority, path, query, fragment };
}
var URI_RE = (() => {
  const SCHEME = "(?<scheme>[A-Za-z][A-Za-z.+-]*)";
  const AUTHORITY = "(?<authority>[^/?#]*)";
  const PATH = "(?<path>[^?#]*)";
  const QUERY = "(?<query>[^#]*)";
  const FRAGMENT = "(?<fragment>.*)";
  return new RegExp(`^${SCHEME}:(//${AUTHORITY})?${PATH}(\\?${QUERY})?(#${FRAGMENT})?$`, "su");
})();
function parseAuthority(text3) {
  const match = AUTHORITY_RE.exec(text3);
  if (match === null) {
    throw new LibsqlError("The authority part of the URL is not in a valid format", "URL_INVALID");
  }
  const groups = match.groups;
  const host = percentDecode(groups["host_br"] ?? groups["host"]);
  const port = groups["port"] ? parseInt(groups["port"], 10) : void 0;
  const userinfo = groups["username"] !== void 0 ? {
    username: percentDecode(groups["username"]),
    password: groups["password"] !== void 0 ? percentDecode(groups["password"]) : void 0
  } : void 0;
  return { host, port, userinfo };
}
var AUTHORITY_RE = (() => {
  return new RegExp(`^((?<username>[^:]*)(:(?<password>.*))?@)?((?<host>[^:\\[\\]]*)|(\\[(?<host_br>[^\\[\\]]*)\\]))(:(?<port>[0-9]*))?$`, "su");
})();
function parseQuery(text3) {
  const sequences = text3.split("&");
  const pairs = [];
  for (const sequence of sequences) {
    if (sequence === "") {
      continue;
    }
    let key;
    let value;
    const splitIdx = sequence.indexOf("=");
    if (splitIdx < 0) {
      key = sequence;
      value = "";
    } else {
      key = sequence.substring(0, splitIdx);
      value = sequence.substring(splitIdx + 1);
    }
    pairs.push({
      key: percentDecode(key.replaceAll("+", " ")),
      value: percentDecode(value.replaceAll("+", " "))
    });
  }
  return { pairs };
}
function percentDecode(text3) {
  try {
    return decodeURIComponent(text3);
  } catch (e) {
    if (e instanceof URIError) {
      throw new LibsqlError(`URL component has invalid percent encoding: ${e}`, "URL_INVALID", void 0, void 0, e);
    }
    throw e;
  }
}
function encodeBaseUrl(scheme, authority, path) {
  if (authority === void 0) {
    throw new LibsqlError(`URL with scheme ${JSON.stringify(scheme + ":")} requires authority (the "//" part)`, "URL_INVALID");
  }
  const schemeText = `${scheme}:`;
  const hostText = encodeHost(authority.host);
  const portText = encodePort(authority.port);
  const userinfoText = encodeUserinfo(authority.userinfo);
  const authorityText = `//${userinfoText}${hostText}${portText}`;
  let pathText = path.split("/").map(encodeURIComponent).join("/");
  if (pathText !== "" && !pathText.startsWith("/")) {
    pathText = "/" + pathText;
  }
  return new URL(`${schemeText}${authorityText}${pathText}`);
}
function encodeHost(host) {
  return host.includes(":") ? `[${encodeURI(host)}]` : encodeURI(host);
}
function encodePort(port) {
  return port !== void 0 ? `:${port}` : "";
}
function encodeUserinfo(userinfo) {
  if (userinfo === void 0) {
    return "";
  }
  const usernameText = encodeURIComponent(userinfo.username);
  const passwordText = userinfo.password !== void 0 ? `:${encodeURIComponent(userinfo.password)}` : "";
  return `${usernameText}${passwordText}@`;
}

// ../../node_modules/.pnpm/js-base64@3.7.8/node_modules/js-base64/base64.mjs
var version = "3.7.8";
var VERSION = version;
var _hasBuffer = typeof Buffer === "function";
var _TD = typeof TextDecoder === "function" ? new TextDecoder() : void 0;
var _TE = typeof TextEncoder === "function" ? new TextEncoder() : void 0;
var b64ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var b64chs = Array.prototype.slice.call(b64ch);
var b64tab = ((a) => {
  let tab = {};
  a.forEach((c, i) => tab[c] = i);
  return tab;
})(b64chs);
var b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var _fromCC = String.fromCharCode.bind(String);
var _U8Afrom = typeof Uint8Array.from === "function" ? Uint8Array.from.bind(Uint8Array) : (it) => new Uint8Array(Array.prototype.slice.call(it, 0));
var _mkUriSafe = (src) => src.replace(/=/g, "").replace(/[+\/]/g, (m0) => m0 == "+" ? "-" : "_");
var _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\+\/]/g, "");
var btoaPolyfill = (bin) => {
  let u32, c0, c1, c2, asc2 = "";
  const pad = bin.length % 3;
  for (let i = 0; i < bin.length; ) {
    if ((c0 = bin.charCodeAt(i++)) > 255 || (c1 = bin.charCodeAt(i++)) > 255 || (c2 = bin.charCodeAt(i++)) > 255)
      throw new TypeError("invalid character found");
    u32 = c0 << 16 | c1 << 8 | c2;
    asc2 += b64chs[u32 >> 18 & 63] + b64chs[u32 >> 12 & 63] + b64chs[u32 >> 6 & 63] + b64chs[u32 & 63];
  }
  return pad ? asc2.slice(0, pad - 3) + "===".substring(pad) : asc2;
};
var _btoa = typeof btoa === "function" ? (bin) => btoa(bin) : _hasBuffer ? (bin) => Buffer.from(bin, "binary").toString("base64") : btoaPolyfill;
var _fromUint8Array = _hasBuffer ? (u8a) => Buffer.from(u8a).toString("base64") : (u8a) => {
  const maxargs = 4096;
  let strs = [];
  for (let i = 0, l = u8a.length; i < l; i += maxargs) {
    strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));
  }
  return _btoa(strs.join(""));
};
var fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);
var cb_utob = (c) => {
  if (c.length < 2) {
    var cc = c.charCodeAt(0);
    return cc < 128 ? c : cc < 2048 ? _fromCC(192 | cc >>> 6) + _fromCC(128 | cc & 63) : _fromCC(224 | cc >>> 12 & 15) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  } else {
    var cc = 65536 + (c.charCodeAt(0) - 55296) * 1024 + (c.charCodeAt(1) - 56320);
    return _fromCC(240 | cc >>> 18 & 7) + _fromCC(128 | cc >>> 12 & 63) + _fromCC(128 | cc >>> 6 & 63) + _fromCC(128 | cc & 63);
  }
};
var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
var utob = (u) => u.replace(re_utob, cb_utob);
var _encode = _hasBuffer ? (s) => Buffer.from(s, "utf8").toString("base64") : _TE ? (s) => _fromUint8Array(_TE.encode(s)) : (s) => _btoa(utob(s));
var encode = (src, urlsafe = false) => urlsafe ? _mkUriSafe(_encode(src)) : _encode(src);
var encodeURI2 = (src) => encode(src, true);
var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
var cb_btou = (cccc) => {
  switch (cccc.length) {
    case 4:
      var cp = (7 & cccc.charCodeAt(0)) << 18 | (63 & cccc.charCodeAt(1)) << 12 | (63 & cccc.charCodeAt(2)) << 6 | 63 & cccc.charCodeAt(3), offset = cp - 65536;
      return _fromCC((offset >>> 10) + 55296) + _fromCC((offset & 1023) + 56320);
    case 3:
      return _fromCC((15 & cccc.charCodeAt(0)) << 12 | (63 & cccc.charCodeAt(1)) << 6 | 63 & cccc.charCodeAt(2));
    default:
      return _fromCC((31 & cccc.charCodeAt(0)) << 6 | 63 & cccc.charCodeAt(1));
  }
};
var btou = (b) => b.replace(re_btou, cb_btou);
var atobPolyfill = (asc2) => {
  asc2 = asc2.replace(/\s+/g, "");
  if (!b64re.test(asc2))
    throw new TypeError("malformed base64.");
  asc2 += "==".slice(2 - (asc2.length & 3));
  let u24, r1, r2;
  let binArray = [];
  for (let i = 0; i < asc2.length; ) {
    u24 = b64tab[asc2.charAt(i++)] << 18 | b64tab[asc2.charAt(i++)] << 12 | (r1 = b64tab[asc2.charAt(i++)]) << 6 | (r2 = b64tab[asc2.charAt(i++)]);
    if (r1 === 64) {
      binArray.push(_fromCC(u24 >> 16 & 255));
    } else if (r2 === 64) {
      binArray.push(_fromCC(u24 >> 16 & 255, u24 >> 8 & 255));
    } else {
      binArray.push(_fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255));
    }
  }
  return binArray.join("");
};
var _atob = typeof atob === "function" ? (asc2) => atob(_tidyB64(asc2)) : _hasBuffer ? (asc2) => Buffer.from(asc2, "base64").toString("binary") : atobPolyfill;
var _toUint8Array = _hasBuffer ? (a) => _U8Afrom(Buffer.from(a, "base64")) : (a) => _U8Afrom(_atob(a).split("").map((c) => c.charCodeAt(0)));
var toUint8Array = (a) => _toUint8Array(_unURI(a));
var _decode = _hasBuffer ? (a) => Buffer.from(a, "base64").toString("utf8") : _TD ? (a) => _TD.decode(_toUint8Array(a)) : (a) => btou(_atob(a));
var _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == "-" ? "+" : "/"));
var decode = (src) => _decode(_unURI(src));
var isValid = (src) => {
  if (typeof src !== "string")
    return false;
  const s = src.replace(/\s+/g, "").replace(/={0,2}$/, "");
  return !/[^\s0-9a-zA-Z\+/]/.test(s) || !/[^\s0-9a-zA-Z\-_]/.test(s);
};
var _noEnum = (v) => {
  return {
    value: v,
    enumerable: false,
    writable: true,
    configurable: true
  };
};
var extendString = function() {
  const _add = (name2, body) => Object.defineProperty(String.prototype, name2, _noEnum(body));
  _add("fromBase64", function() {
    return decode(this);
  });
  _add("toBase64", function(urlsafe) {
    return encode(this, urlsafe);
  });
  _add("toBase64URI", function() {
    return encode(this, true);
  });
  _add("toBase64URL", function() {
    return encode(this, true);
  });
  _add("toUint8Array", function() {
    return toUint8Array(this);
  });
};
var extendUint8Array = function() {
  const _add = (name2, body) => Object.defineProperty(Uint8Array.prototype, name2, _noEnum(body));
  _add("toBase64", function(urlsafe) {
    return fromUint8Array(this, urlsafe);
  });
  _add("toBase64URI", function() {
    return fromUint8Array(this, true);
  });
  _add("toBase64URL", function() {
    return fromUint8Array(this, true);
  });
};
var extendBuiltins = () => {
  extendString();
  extendUint8Array();
};
var gBase64 = {
  version,
  VERSION,
  atob: _atob,
  atobPolyfill,
  btoa: _btoa,
  btoaPolyfill,
  fromBase64: decode,
  toBase64: encode,
  encode,
  encodeURI: encodeURI2,
  encodeURL: encodeURI2,
  utob,
  btou,
  decode,
  isValid,
  fromUint8Array,
  toUint8Array,
  extendString,
  extendUint8Array,
  extendBuiltins
};

// ../../node_modules/.pnpm/@libsql+core@0.17.3/node_modules/@libsql/core/lib-esm/util.js
var supportedUrlLink = "https://github.com/libsql/libsql-client-ts#supported-urls";
function transactionModeToBegin(mode) {
  if (mode === "write") {
    return "BEGIN IMMEDIATE";
  } else if (mode === "read") {
    return "BEGIN TRANSACTION READONLY";
  } else if (mode === "deferred") {
    return "BEGIN DEFERRED";
  } else {
    throw RangeError('Unknown transaction mode, supported values are "write", "read" and "deferred"');
  }
}
var ResultSetImpl = class {
  columns;
  columnTypes;
  rows;
  rowsAffected;
  lastInsertRowid;
  constructor(columns, columnTypes, rows, rowsAffected, lastInsertRowid) {
    this.columns = columns;
    this.columnTypes = columnTypes;
    this.rows = rows;
    this.rowsAffected = rowsAffected;
    this.lastInsertRowid = lastInsertRowid;
  }
  toJSON() {
    return {
      columns: this.columns,
      columnTypes: this.columnTypes,
      rows: this.rows.map(rowToJson),
      rowsAffected: this.rowsAffected,
      lastInsertRowid: this.lastInsertRowid !== void 0 ? "" + this.lastInsertRowid : null
    };
  }
};
function rowToJson(row) {
  return Array.prototype.map.call(row, valueToJson);
}
function valueToJson(value) {
  if (typeof value === "bigint") {
    return "" + value;
  } else if (value instanceof ArrayBuffer) {
    return gBase64.fromUint8Array(new Uint8Array(value));
  } else {
    return value;
  }
}

// ../../node_modules/.pnpm/@libsql+core@0.17.3/node_modules/@libsql/core/lib-esm/config.js
var inMemoryMode = ":memory:";
function isInMemoryConfig(config2) {
  return config2.scheme === "file" && (config2.path === ":memory:" || config2.path.startsWith(":memory:?"));
}
function expandConfig(config2, preferHttp) {
  if (typeof config2 !== "object") {
    throw new TypeError(`Expected client configuration as object, got ${typeof config2}`);
  }
  let { url, authToken, tls, intMode, concurrency } = config2;
  concurrency = Math.max(0, concurrency || 20);
  intMode ??= "number";
  let connectionQueryParams = [];
  if (url === inMemoryMode) {
    url = "file::memory:";
  }
  const uri = parseUri(url);
  const originalUriScheme = uri.scheme.toLowerCase();
  const isInMemoryMode = originalUriScheme === "file" && uri.path === inMemoryMode && uri.authority === void 0;
  let queryParamsDef;
  if (isInMemoryMode) {
    queryParamsDef = {
      cache: {
        values: ["shared", "private"],
        update: (key, value) => connectionQueryParams.push(`${key}=${value}`)
      }
    };
  } else {
    queryParamsDef = {
      tls: {
        values: ["0", "1"],
        update: (_, value) => tls = value === "1"
      },
      authToken: {
        update: (_, value) => authToken = value
      }
    };
  }
  for (const { key, value } of uri.query?.pairs ?? []) {
    if (!Object.hasOwn(queryParamsDef, key)) {
      throw new LibsqlError(`Unsupported URL query parameter ${JSON.stringify(key)}`, "URL_PARAM_NOT_SUPPORTED");
    }
    const queryParamDef = queryParamsDef[key];
    if (queryParamDef.values !== void 0 && !queryParamDef.values.includes(value)) {
      throw new LibsqlError(`Unknown value for the "${key}" query argument: ${JSON.stringify(value)}. Supported values are: [${queryParamDef.values.map((x) => '"' + x + '"').join(", ")}]`, "URL_INVALID");
    }
    if (queryParamDef.update !== void 0) {
      queryParamDef?.update(key, value);
    }
  }
  const connectionQueryParamsString = connectionQueryParams.length === 0 ? "" : `?${connectionQueryParams.join("&")}`;
  const path = uri.path + connectionQueryParamsString;
  let scheme;
  if (originalUriScheme === "libsql") {
    if (tls === false) {
      if (uri.authority?.port === void 0) {
        throw new LibsqlError('A "libsql:" URL with ?tls=0 must specify an explicit port', "URL_INVALID");
      }
      scheme = preferHttp ? "http" : "ws";
    } else {
      scheme = preferHttp ? "https" : "wss";
    }
  } else {
    scheme = originalUriScheme;
  }
  if (scheme === "http" || scheme === "ws") {
    tls ??= false;
  } else {
    tls ??= true;
  }
  if (scheme !== "http" && scheme !== "ws" && scheme !== "https" && scheme !== "wss" && scheme !== "file") {
    throw new LibsqlError(`The client supports only "libsql:", "wss:", "ws:", "https:", "http:" and "file:" URLs, got ${JSON.stringify(uri.scheme + ":")}. For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
  }
  if (intMode !== "number" && intMode !== "bigint" && intMode !== "string") {
    throw new TypeError(`Invalid value for intMode, expected "number", "bigint" or "string", got ${JSON.stringify(intMode)}`);
  }
  if (uri.fragment !== void 0) {
    throw new LibsqlError(`URL fragments are not supported: ${JSON.stringify("#" + uri.fragment)}`, "URL_INVALID");
  }
  if (isInMemoryMode) {
    return {
      scheme: "file",
      tls: false,
      path,
      intMode,
      concurrency,
      syncUrl: config2.syncUrl,
      syncInterval: config2.syncInterval,
      readYourWrites: config2.readYourWrites,
      offline: config2.offline,
      fetch: config2.fetch,
      authToken: void 0,
      encryptionKey: void 0,
      remoteEncryptionKey: void 0,
      authority: void 0
    };
  }
  return {
    scheme,
    tls,
    authority: uri.authority,
    path,
    authToken,
    intMode,
    concurrency,
    encryptionKey: config2.encryptionKey,
    remoteEncryptionKey: config2.remoteEncryptionKey,
    syncUrl: config2.syncUrl,
    syncInterval: config2.syncInterval,
    readYourWrites: config2.readYourWrites,
    offline: config2.offline,
    fetch: config2.fetch
  };
}

// ../../node_modules/.pnpm/@libsql+client@0.17.3/node_modules/@libsql/client/lib-esm/sqlite3.js
var import_libsql = __toESM(require_libsql(), 1);
import { Buffer as Buffer2 } from "node:buffer";
function _createClient(config2) {
  if (config2.scheme !== "file") {
    throw new LibsqlError(`URL scheme ${JSON.stringify(config2.scheme + ":")} is not supported by the local sqlite3 client. For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
  }
  const authority = config2.authority;
  if (authority !== void 0) {
    const host = authority.host.toLowerCase();
    if (host !== "" && host !== "localhost") {
      throw new LibsqlError(`Invalid host in file URL: ${JSON.stringify(authority.host)}. A "file:" URL with an absolute path should start with one slash ("file:/absolute/path.db") or with three slashes ("file:///absolute/path.db"). For more information, please read ${supportedUrlLink}`, "URL_INVALID");
    }
    if (authority.port !== void 0) {
      throw new LibsqlError("File URL cannot have a port", "URL_INVALID");
    }
    if (authority.userinfo !== void 0) {
      throw new LibsqlError("File URL cannot have username and password", "URL_INVALID");
    }
  }
  let isInMemory = isInMemoryConfig(config2);
  if (isInMemory && config2.syncUrl) {
    throw new LibsqlError(`Embedded replica must use file for local db but URI with in-memory mode were provided instead: ${config2.path}`, "URL_INVALID");
  }
  let path = config2.path;
  if (isInMemory) {
    path = `${config2.scheme}:${config2.path}`;
  }
  const options = {
    authToken: config2.authToken,
    encryptionKey: config2.encryptionKey,
    remoteEncryptionKey: config2.remoteEncryptionKey,
    syncUrl: config2.syncUrl,
    syncPeriod: config2.syncInterval,
    readYourWrites: config2.readYourWrites,
    offline: config2.offline
  };
  const db2 = new import_libsql.default(path, options);
  executeStmt(db2, "SELECT 1 AS checkThatTheDatabaseCanBeOpened", config2.intMode);
  return new Sqlite3Client(path, options, db2, config2.intMode);
}
var Sqlite3Client = class {
  #path;
  #options;
  #db;
  #intMode;
  closed;
  protocol;
  /** @private */
  constructor(path, options, db2, intMode) {
    this.#path = path;
    this.#options = options;
    this.#db = db2;
    this.#intMode = intMode;
    this.closed = false;
    this.protocol = "file";
  }
  async execute(stmtOrSql, args) {
    let stmt;
    if (typeof stmtOrSql === "string") {
      stmt = {
        sql: stmtOrSql,
        args: args || []
      };
    } else {
      stmt = stmtOrSql;
    }
    this.#checkNotClosed();
    return executeStmt(this.#getDb(), stmt, this.#intMode);
  }
  async batch(stmts, mode = "deferred") {
    this.#checkNotClosed();
    const db2 = this.#getDb();
    try {
      executeStmt(db2, transactionModeToBegin(mode), this.#intMode);
      const resultSets = [];
      for (let i = 0; i < stmts.length; i++) {
        try {
          if (!db2.inTransaction) {
            throw new LibsqlBatchError("The transaction has been rolled back", i, "TRANSACTION_CLOSED");
          }
          const stmt = stmts[i];
          const normalizedStmt = Array.isArray(stmt) ? { sql: stmt[0], args: stmt[1] || [] } : stmt;
          resultSets.push(executeStmt(db2, normalizedStmt, this.#intMode));
        } catch (e) {
          if (e instanceof LibsqlBatchError) {
            throw e;
          }
          if (e instanceof LibsqlError) {
            throw new LibsqlBatchError(e.message, i, e.code, e.extendedCode, e.rawCode, e.cause instanceof Error ? e.cause : void 0);
          }
          throw e;
        }
      }
      executeStmt(db2, "COMMIT", this.#intMode);
      return resultSets;
    } finally {
      if (db2.inTransaction) {
        executeStmt(db2, "ROLLBACK", this.#intMode);
      }
    }
  }
  async migrate(stmts) {
    this.#checkNotClosed();
    const db2 = this.#getDb();
    try {
      executeStmt(db2, "PRAGMA foreign_keys=off", this.#intMode);
      executeStmt(db2, transactionModeToBegin("deferred"), this.#intMode);
      const resultSets = [];
      for (let i = 0; i < stmts.length; i++) {
        try {
          if (!db2.inTransaction) {
            throw new LibsqlBatchError("The transaction has been rolled back", i, "TRANSACTION_CLOSED");
          }
          resultSets.push(executeStmt(db2, stmts[i], this.#intMode));
        } catch (e) {
          if (e instanceof LibsqlBatchError) {
            throw e;
          }
          if (e instanceof LibsqlError) {
            throw new LibsqlBatchError(e.message, i, e.code, e.extendedCode, e.rawCode, e.cause instanceof Error ? e.cause : void 0);
          }
          throw e;
        }
      }
      executeStmt(db2, "COMMIT", this.#intMode);
      return resultSets;
    } finally {
      if (db2.inTransaction) {
        executeStmt(db2, "ROLLBACK", this.#intMode);
      }
      executeStmt(db2, "PRAGMA foreign_keys=on", this.#intMode);
    }
  }
  async transaction(mode = "write") {
    const db2 = this.#getDb();
    executeStmt(db2, transactionModeToBegin(mode), this.#intMode);
    this.#db = null;
    return new Sqlite3Transaction(db2, this.#intMode);
  }
  async executeMultiple(sql2) {
    this.#checkNotClosed();
    const db2 = this.#getDb();
    try {
      return executeMultiple(db2, sql2);
    } finally {
      if (db2.inTransaction) {
        executeStmt(db2, "ROLLBACK", this.#intMode);
      }
    }
  }
  async sync() {
    this.#checkNotClosed();
    const rep = await this.#getDb().sync();
    return {
      frames_synced: rep.frames_synced,
      frame_no: rep.frame_no
    };
  }
  async reconnect() {
    try {
      if (!this.closed && this.#db !== null) {
        this.#db.close();
      }
    } finally {
      this.#db = new import_libsql.default(this.#path, this.#options);
      this.closed = false;
    }
  }
  close() {
    this.closed = true;
    if (this.#db !== null) {
      this.#db.close();
      this.#db = null;
    }
  }
  #checkNotClosed() {
    if (this.closed) {
      throw new LibsqlError("The client is closed", "CLIENT_CLOSED");
    }
  }
  // Lazily creates the database connection and returns it
  #getDb() {
    if (this.#db === null) {
      this.#db = new import_libsql.default(this.#path, this.#options);
    }
    return this.#db;
  }
};
var Sqlite3Transaction = class {
  #database;
  #intMode;
  /** @private */
  constructor(database, intMode) {
    this.#database = database;
    this.#intMode = intMode;
  }
  async execute(stmtOrSql, args) {
    let stmt;
    if (typeof stmtOrSql === "string") {
      stmt = {
        sql: stmtOrSql,
        args: args || []
      };
    } else {
      stmt = stmtOrSql;
    }
    this.#checkNotClosed();
    return executeStmt(this.#database, stmt, this.#intMode);
  }
  async batch(stmts) {
    const resultSets = [];
    for (let i = 0; i < stmts.length; i++) {
      try {
        this.#checkNotClosed();
        const stmt = stmts[i];
        const normalizedStmt = Array.isArray(stmt) ? { sql: stmt[0], args: stmt[1] || [] } : stmt;
        resultSets.push(executeStmt(this.#database, normalizedStmt, this.#intMode));
      } catch (e) {
        if (e instanceof LibsqlBatchError) {
          throw e;
        }
        if (e instanceof LibsqlError) {
          throw new LibsqlBatchError(e.message, i, e.code, e.extendedCode, e.rawCode, e.cause instanceof Error ? e.cause : void 0);
        }
        throw e;
      }
    }
    return resultSets;
  }
  async executeMultiple(sql2) {
    this.#checkNotClosed();
    return executeMultiple(this.#database, sql2);
  }
  async rollback() {
    if (!this.#database.open) {
      return;
    }
    this.#checkNotClosed();
    executeStmt(this.#database, "ROLLBACK", this.#intMode);
  }
  async commit() {
    this.#checkNotClosed();
    executeStmt(this.#database, "COMMIT", this.#intMode);
  }
  close() {
    if (this.#database.inTransaction) {
      executeStmt(this.#database, "ROLLBACK", this.#intMode);
    }
  }
  get closed() {
    return !this.#database.inTransaction;
  }
  #checkNotClosed() {
    if (this.closed) {
      throw new LibsqlError("The transaction is closed", "TRANSACTION_CLOSED");
    }
  }
};
function executeStmt(db2, stmt, intMode) {
  let sql2;
  let args;
  if (typeof stmt === "string") {
    sql2 = stmt;
    args = [];
  } else {
    sql2 = stmt.sql;
    if (Array.isArray(stmt.args)) {
      args = stmt.args.map((value) => valueToSql(value, intMode));
    } else {
      args = {};
      for (const name2 in stmt.args) {
        const argName = name2[0] === "@" || name2[0] === "$" || name2[0] === ":" ? name2.substring(1) : name2;
        args[argName] = valueToSql(stmt.args[name2], intMode);
      }
    }
  }
  try {
    const sqlStmt = db2.prepare(sql2);
    sqlStmt.safeIntegers(true);
    let returnsData = true;
    try {
      sqlStmt.raw(true);
    } catch {
      returnsData = false;
    }
    if (returnsData) {
      const columns = Array.from(sqlStmt.columns().map((col) => col.name));
      const columnTypes = Array.from(sqlStmt.columns().map((col) => col.type ?? ""));
      const rows = sqlStmt.all(args).map((sqlRow) => {
        return rowFromSql(sqlRow, columns, intMode);
      });
      const rowsAffected = 0;
      const lastInsertRowid = void 0;
      return new ResultSetImpl(columns, columnTypes, rows, rowsAffected, lastInsertRowid);
    } else {
      const info = sqlStmt.run(args);
      const rowsAffected = info.changes;
      const lastInsertRowid = BigInt(info.lastInsertRowid);
      return new ResultSetImpl([], [], [], rowsAffected, lastInsertRowid);
    }
  } catch (e) {
    throw mapSqliteError(e);
  }
}
function rowFromSql(sqlRow, columns, intMode) {
  const row = {};
  Object.defineProperty(row, "length", { value: sqlRow.length });
  for (let i = 0; i < sqlRow.length; ++i) {
    const value = valueFromSql(sqlRow[i], intMode);
    Object.defineProperty(row, i, { value });
    const column = columns[i];
    if (!Object.hasOwn(row, column)) {
      Object.defineProperty(row, column, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    }
  }
  return row;
}
function valueFromSql(sqlValue, intMode) {
  if (typeof sqlValue === "bigint") {
    if (intMode === "number") {
      if (sqlValue < minSafeBigint || sqlValue > maxSafeBigint) {
        throw new RangeError("Received integer which cannot be safely represented as a JavaScript number");
      }
      return Number(sqlValue);
    } else if (intMode === "bigint") {
      return sqlValue;
    } else if (intMode === "string") {
      return "" + sqlValue;
    } else {
      throw new Error("Invalid value for IntMode");
    }
  } else if (sqlValue instanceof Buffer2) {
    return sqlValue.buffer;
  }
  return sqlValue;
}
var minSafeBigint = -9007199254740991n;
var maxSafeBigint = 9007199254740991n;
function valueToSql(value, intMode) {
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new RangeError("Only finite numbers (not Infinity or NaN) can be passed as arguments");
    }
    return value;
  } else if (typeof value === "bigint") {
    if (value < minInteger || value > maxInteger) {
      throw new RangeError("bigint is too large to be represented as a 64-bit integer and passed as argument");
    }
    return value;
  } else if (typeof value === "boolean") {
    switch (intMode) {
      case "bigint":
        return value ? 1n : 0n;
      case "string":
        return value ? "1" : "0";
      default:
        return value ? 1 : 0;
    }
  } else if (value instanceof ArrayBuffer) {
    return Buffer2.from(value);
  } else if (value instanceof Date) {
    return value.valueOf();
  } else if (value === void 0) {
    throw new TypeError("undefined cannot be passed as argument to the database");
  } else {
    return value;
  }
}
var minInteger = -9223372036854775808n;
var maxInteger = 9223372036854775807n;
function executeMultiple(db2, sql2) {
  try {
    db2.exec(sql2);
  } catch (e) {
    throw mapSqliteError(e);
  }
}
function mapSqliteError(e) {
  if (e instanceof import_libsql.default.SqliteError) {
    const extendedCode = e.code;
    const code = mapToBaseCode(e.rawCode);
    return new LibsqlError(e.message, code, extendedCode, e.rawCode, e);
  }
  return e;
}
function mapToBaseCode(rawCode) {
  if (rawCode === void 0) {
    return "SQLITE_UNKNOWN";
  }
  const baseCode = rawCode & 255;
  return sqliteErrorCodes[baseCode] ?? `SQLITE_UNKNOWN_${baseCode.toString()}`;
}
var sqliteErrorCodes = {
  1: "SQLITE_ERROR",
  2: "SQLITE_INTERNAL",
  3: "SQLITE_PERM",
  4: "SQLITE_ABORT",
  5: "SQLITE_BUSY",
  6: "SQLITE_LOCKED",
  7: "SQLITE_NOMEM",
  8: "SQLITE_READONLY",
  9: "SQLITE_INTERRUPT",
  10: "SQLITE_IOERR",
  11: "SQLITE_CORRUPT",
  12: "SQLITE_NOTFOUND",
  13: "SQLITE_FULL",
  14: "SQLITE_CANTOPEN",
  15: "SQLITE_PROTOCOL",
  16: "SQLITE_EMPTY",
  17: "SQLITE_SCHEMA",
  18: "SQLITE_TOOBIG",
  19: "SQLITE_CONSTRAINT",
  20: "SQLITE_MISMATCH",
  21: "SQLITE_MISUSE",
  22: "SQLITE_NOLFS",
  23: "SQLITE_AUTH",
  24: "SQLITE_FORMAT",
  25: "SQLITE_RANGE",
  26: "SQLITE_NOTADB",
  27: "SQLITE_NOTICE",
  28: "SQLITE_WARNING"
};

// ../../node_modules/.pnpm/ws@8.20.1/node_modules/ws/wrapper.mjs
var import_stream = __toESM(require_stream(), 1);
var import_extension = __toESM(require_extension(), 1);
var import_permessage_deflate = __toESM(require_permessage_deflate(), 1);
var import_receiver = __toESM(require_receiver(), 1);
var import_sender = __toESM(require_sender(), 1);
var import_subprotocol = __toESM(require_subprotocol(), 1);
var import_websocket = __toESM(require_websocket(), 1);
var import_websocket_server = __toESM(require_websocket_server(), 1);

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/client.js
var Client = class {
  /** @private */
  constructor() {
    this.intMode = "number";
  }
  /** Representation of integers returned from the database. See {@link IntMode}.
   *
   * This value is inherited by {@link Stream} objects created with {@link openStream}, but you can
   * override the integer mode for every stream by setting {@link Stream.intMode} on the stream.
   */
  intMode;
};

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/errors.js
var ClientError = class extends Error {
  /** @private */
  constructor(message) {
    super(message);
    this.name = "ClientError";
  }
};
var ProtoError = class extends ClientError {
  /** @private */
  constructor(message) {
    super(message);
    this.name = "ProtoError";
  }
};
var ResponseError = class extends ClientError {
  code;
  /** @internal */
  proto;
  /** @private */
  constructor(message, protoError) {
    super(message);
    this.name = "ResponseError";
    this.code = protoError.code;
    this.proto = protoError;
    this.stack = void 0;
  }
};
var ClosedError = class extends ClientError {
  /** @private */
  constructor(message, cause) {
    if (cause !== void 0) {
      super(`${message}: ${cause}`);
      this.cause = cause;
    } else {
      super(message);
    }
    this.name = "ClosedError";
  }
};
var WebSocketUnsupportedError = class extends ClientError {
  /** @private */
  constructor(message) {
    super(message);
    this.name = "WebSocketUnsupportedError";
  }
};
var WebSocketError = class extends ClientError {
  /** @private */
  constructor(message) {
    super(message);
    this.name = "WebSocketError";
  }
};
var HttpServerError = class extends ClientError {
  status;
  /** @private */
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = "HttpServerError";
  }
};
var ProtocolVersionError = class extends ClientError {
  /** @private */
  constructor(message) {
    super(message);
    this.name = "ProtocolVersionError";
  }
};
var InternalError = class extends ClientError {
  /** @private */
  constructor(message) {
    super(message);
    this.name = "InternalError";
  }
};
var MisuseError = class extends ClientError {
  /** @private */
  constructor(message) {
    super(message);
    this.name = "MisuseError";
  }
};

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/encoding/json/decode.js
function string(value) {
  if (typeof value === "string") {
    return value;
  }
  throw typeError(value, "string");
}
function stringOpt(value) {
  if (value === null || value === void 0) {
    return void 0;
  } else if (typeof value === "string") {
    return value;
  }
  throw typeError(value, "string or null");
}
function number(value) {
  if (typeof value === "number") {
    return value;
  }
  throw typeError(value, "number");
}
function boolean(value) {
  if (typeof value === "boolean") {
    return value;
  }
  throw typeError(value, "boolean");
}
function array(value) {
  if (Array.isArray(value)) {
    return value;
  }
  throw typeError(value, "array");
}
function object(value) {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  throw typeError(value, "object");
}
function arrayObjectsMap(value, fun) {
  return array(value).map((elemValue) => fun(object(elemValue)));
}
function typeError(value, expected) {
  if (value === void 0) {
    return new ProtoError(`Expected ${expected}, but the property was missing`);
  }
  let received = typeof value;
  if (value === null) {
    received = "null";
  } else if (Array.isArray(value)) {
    received = "array";
  }
  return new ProtoError(`Expected ${expected}, received ${received}`);
}
function readJsonObject(value, fun) {
  return fun(object(value));
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/encoding/json/encode.js
var ObjectWriter = class {
  #output;
  #isFirst;
  constructor(output) {
    this.#output = output;
    this.#isFirst = false;
  }
  begin() {
    this.#output.push("{");
    this.#isFirst = true;
  }
  end() {
    this.#output.push("}");
    this.#isFirst = false;
  }
  #key(name2) {
    if (this.#isFirst) {
      this.#output.push('"');
      this.#isFirst = false;
    } else {
      this.#output.push(',"');
    }
    this.#output.push(name2);
    this.#output.push('":');
  }
  string(name2, value) {
    this.#key(name2);
    this.#output.push(JSON.stringify(value));
  }
  stringRaw(name2, value) {
    this.#key(name2);
    this.#output.push('"');
    this.#output.push(value);
    this.#output.push('"');
  }
  number(name2, value) {
    this.#key(name2);
    this.#output.push("" + value);
  }
  boolean(name2, value) {
    this.#key(name2);
    this.#output.push(value ? "true" : "false");
  }
  object(name2, value, valueFun) {
    this.#key(name2);
    this.begin();
    valueFun(this, value);
    this.end();
  }
  arrayObjects(name2, values, valueFun) {
    this.#key(name2);
    this.#output.push("[");
    for (let i = 0; i < values.length; ++i) {
      if (i !== 0) {
        this.#output.push(",");
      }
      this.begin();
      valueFun(this, values[i]);
      this.end();
    }
    this.#output.push("]");
  }
};
function writeJsonObject(value, fun) {
  const output = [];
  const writer = new ObjectWriter(output);
  writer.begin();
  fun(writer, value);
  writer.end();
  return output.join("");
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/util.js
var VARINT = 0;
var FIXED_64 = 1;
var LENGTH_DELIMITED = 2;
var FIXED_32 = 5;

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/decode.js
var MessageReader = class {
  #array;
  #view;
  #pos;
  constructor(array2) {
    this.#array = array2;
    this.#view = new DataView(array2.buffer, array2.byteOffset, array2.byteLength);
    this.#pos = 0;
  }
  varint() {
    let value = 0;
    for (let shift = 0; ; shift += 7) {
      const byte = this.#array[this.#pos++];
      value |= (byte & 127) << shift;
      if (!(byte & 128)) {
        break;
      }
    }
    return value;
  }
  varintBig() {
    let value = 0n;
    for (let shift = 0n; ; shift += 7n) {
      const byte = this.#array[this.#pos++];
      value |= BigInt(byte & 127) << shift;
      if (!(byte & 128)) {
        break;
      }
    }
    return value;
  }
  bytes(length) {
    const array2 = new Uint8Array(this.#array.buffer, this.#array.byteOffset + this.#pos, length);
    this.#pos += length;
    return array2;
  }
  double() {
    const value = this.#view.getFloat64(this.#pos, true);
    this.#pos += 8;
    return value;
  }
  skipVarint() {
    for (; ; ) {
      const byte = this.#array[this.#pos++];
      if (!(byte & 128)) {
        break;
      }
    }
  }
  skip(count) {
    this.#pos += count;
  }
  eof() {
    return this.#pos >= this.#array.byteLength;
  }
};
var FieldReader = class {
  #reader;
  #wireType;
  constructor(reader) {
    this.#reader = reader;
    this.#wireType = -1;
  }
  setup(wireType) {
    this.#wireType = wireType;
  }
  #expect(expectedWireType) {
    if (this.#wireType !== expectedWireType) {
      throw new ProtoError(`Expected wire type ${expectedWireType}, got ${this.#wireType}`);
    }
    this.#wireType = -1;
  }
  bytes() {
    this.#expect(LENGTH_DELIMITED);
    const length = this.#reader.varint();
    return this.#reader.bytes(length);
  }
  string() {
    return new TextDecoder().decode(this.bytes());
  }
  message(def) {
    return readProtobufMessage(this.bytes(), def);
  }
  int32() {
    this.#expect(VARINT);
    return this.#reader.varint();
  }
  uint32() {
    return this.int32();
  }
  bool() {
    return this.int32() !== 0;
  }
  uint64() {
    this.#expect(VARINT);
    return this.#reader.varintBig();
  }
  sint64() {
    const value = this.uint64();
    return value >> 1n ^ -(value & 1n);
  }
  double() {
    this.#expect(FIXED_64);
    return this.#reader.double();
  }
  maybeSkip() {
    if (this.#wireType < 0) {
      return;
    } else if (this.#wireType === VARINT) {
      this.#reader.skipVarint();
    } else if (this.#wireType === FIXED_64) {
      this.#reader.skip(8);
    } else if (this.#wireType === LENGTH_DELIMITED) {
      const length = this.#reader.varint();
      this.#reader.skip(length);
    } else if (this.#wireType === FIXED_32) {
      this.#reader.skip(4);
    } else {
      throw new ProtoError(`Unexpected wire type ${this.#wireType}`);
    }
    this.#wireType = -1;
  }
};
function readProtobufMessage(data, def) {
  const msgReader = new MessageReader(data);
  const fieldReader = new FieldReader(msgReader);
  let value = def.default();
  while (!msgReader.eof()) {
    const key = msgReader.varint();
    const tag = key >> 3;
    const wireType = key & 7;
    fieldReader.setup(wireType);
    const tagFun = def[tag];
    if (tagFun !== void 0) {
      const returnedValue = tagFun(fieldReader, value);
      if (returnedValue !== void 0) {
        value = returnedValue;
      }
    }
    fieldReader.maybeSkip();
  }
  return value;
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/encoding/protobuf/encode.js
var MessageWriter = class _MessageWriter {
  #buf;
  #array;
  #view;
  #pos;
  constructor() {
    this.#buf = new ArrayBuffer(256);
    this.#array = new Uint8Array(this.#buf);
    this.#view = new DataView(this.#buf);
    this.#pos = 0;
  }
  #ensure(extra) {
    if (this.#pos + extra <= this.#buf.byteLength) {
      return;
    }
    let newCap = this.#buf.byteLength;
    while (newCap < this.#pos + extra) {
      newCap *= 2;
    }
    const newBuf = new ArrayBuffer(newCap);
    const newArray = new Uint8Array(newBuf);
    const newView = new DataView(newBuf);
    newArray.set(new Uint8Array(this.#buf, 0, this.#pos));
    this.#buf = newBuf;
    this.#array = newArray;
    this.#view = newView;
  }
  #varint(value) {
    this.#ensure(5);
    value = 0 | value;
    do {
      let byte = value & 127;
      value >>>= 7;
      byte |= value ? 128 : 0;
      this.#array[this.#pos++] = byte;
    } while (value);
  }
  #varintBig(value) {
    this.#ensure(10);
    value = value & 0xffffffffffffffffn;
    do {
      let byte = Number(value & 0x7fn);
      value >>= 7n;
      byte |= value ? 128 : 0;
      this.#array[this.#pos++] = byte;
    } while (value);
  }
  #tag(tag, wireType) {
    this.#varint(tag << 3 | wireType);
  }
  bytes(tag, value) {
    this.#tag(tag, LENGTH_DELIMITED);
    this.#varint(value.byteLength);
    this.#ensure(value.byteLength);
    this.#array.set(value, this.#pos);
    this.#pos += value.byteLength;
  }
  string(tag, value) {
    this.bytes(tag, new TextEncoder().encode(value));
  }
  message(tag, value, fun) {
    const writer = new _MessageWriter();
    fun(writer, value);
    this.bytes(tag, writer.data());
  }
  int32(tag, value) {
    this.#tag(tag, VARINT);
    this.#varint(value);
  }
  uint32(tag, value) {
    this.int32(tag, value);
  }
  bool(tag, value) {
    this.int32(tag, value ? 1 : 0);
  }
  sint64(tag, value) {
    this.#tag(tag, VARINT);
    this.#varintBig(value << 1n ^ value >> 63n);
  }
  double(tag, value) {
    this.#tag(tag, FIXED_64);
    this.#ensure(8);
    this.#view.setFloat64(this.#pos, value, true);
    this.#pos += 8;
  }
  data() {
    return new Uint8Array(this.#buf, 0, this.#pos);
  }
};
function writeProtobufMessage(value, fun) {
  const w = new MessageWriter();
  fun(w, value);
  return w.data();
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/id_alloc.js
var IdAlloc = class {
  // Set of all allocated ids
  #usedIds;
  // Set of all free ids lower than `#usedIds.size`
  #freeIds;
  constructor() {
    this.#usedIds = /* @__PURE__ */ new Set();
    this.#freeIds = /* @__PURE__ */ new Set();
  }
  // Returns an id that was free, and marks it as used.
  alloc() {
    for (const freeId2 of this.#freeIds) {
      this.#freeIds.delete(freeId2);
      this.#usedIds.add(freeId2);
      if (!this.#usedIds.has(this.#usedIds.size - 1)) {
        this.#freeIds.add(this.#usedIds.size - 1);
      }
      return freeId2;
    }
    const freeId = this.#usedIds.size;
    this.#usedIds.add(freeId);
    return freeId;
  }
  free(id) {
    if (!this.#usedIds.delete(id)) {
      throw new InternalError("Freeing an id that is not allocated");
    }
    this.#freeIds.delete(this.#usedIds.size);
    if (id < this.#usedIds.size) {
      this.#freeIds.add(id);
    }
  }
};

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/util.js
function impossible(value, message) {
  throw new InternalError(message);
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/value.js
function valueToProto(value) {
  if (value === null) {
    return null;
  } else if (typeof value === "string") {
    return value;
  } else if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new RangeError("Only finite numbers (not Infinity or NaN) can be passed as arguments");
    }
    return value;
  } else if (typeof value === "bigint") {
    if (value < minInteger2 || value > maxInteger2) {
      throw new RangeError("This bigint value is too large to be represented as a 64-bit integer and passed as argument");
    }
    return value;
  } else if (typeof value === "boolean") {
    return value ? 1n : 0n;
  } else if (value instanceof ArrayBuffer) {
    return new Uint8Array(value);
  } else if (value instanceof Uint8Array) {
    return value;
  } else if (value instanceof Date) {
    return +value.valueOf();
  } else if (typeof value === "object") {
    return "" + value.toString();
  } else {
    throw new TypeError("Unsupported type of value");
  }
}
var minInteger2 = -9223372036854775808n;
var maxInteger2 = 9223372036854775807n;
function valueFromProto(value, intMode) {
  if (value === null) {
    return null;
  } else if (typeof value === "number") {
    return value;
  } else if (typeof value === "string") {
    return value;
  } else if (typeof value === "bigint") {
    if (intMode === "number") {
      const num = Number(value);
      if (!Number.isSafeInteger(num)) {
        throw new RangeError("Received integer which is too large to be safely represented as a JavaScript number");
      }
      return num;
    } else if (intMode === "bigint") {
      return value;
    } else if (intMode === "string") {
      return "" + value;
    } else {
      throw new MisuseError("Invalid value for IntMode");
    }
  } else if (value instanceof Uint8Array) {
    return value.slice().buffer;
  } else if (value === void 0) {
    throw new ProtoError("Received unrecognized type of Value");
  } else {
    throw impossible(value, "Impossible type of Value");
  }
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/result.js
function stmtResultFromProto(result) {
  return {
    affectedRowCount: result.affectedRowCount,
    lastInsertRowid: result.lastInsertRowid,
    columnNames: result.cols.map((col) => col.name),
    columnDecltypes: result.cols.map((col) => col.decltype)
  };
}
function rowsResultFromProto(result, intMode) {
  const stmtResult = stmtResultFromProto(result);
  const rows = result.rows.map((row) => rowFromProto(stmtResult.columnNames, row, intMode));
  return { ...stmtResult, rows };
}
function rowResultFromProto(result, intMode) {
  const stmtResult = stmtResultFromProto(result);
  let row;
  if (result.rows.length > 0) {
    row = rowFromProto(stmtResult.columnNames, result.rows[0], intMode);
  }
  return { ...stmtResult, row };
}
function valueResultFromProto(result, intMode) {
  const stmtResult = stmtResultFromProto(result);
  let value;
  if (result.rows.length > 0 && stmtResult.columnNames.length > 0) {
    value = valueFromProto(result.rows[0][0], intMode);
  }
  return { ...stmtResult, value };
}
function rowFromProto(colNames, values, intMode) {
  const row = {};
  Object.defineProperty(row, "length", { value: values.length });
  for (let i = 0; i < values.length; ++i) {
    const value = valueFromProto(values[i], intMode);
    Object.defineProperty(row, i, { value });
    const colName = colNames[i];
    if (colName !== void 0 && !Object.hasOwn(row, colName)) {
      Object.defineProperty(row, colName, { value, enumerable: true, configurable: true, writable: true });
    }
  }
  return row;
}
function errorFromProto(error) {
  return new ResponseError(error.message, error);
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/sql.js
var Sql = class {
  #owner;
  #sqlId;
  #closed;
  /** @private */
  constructor(owner, sqlId) {
    this.#owner = owner;
    this.#sqlId = sqlId;
    this.#closed = void 0;
  }
  /** @private */
  _getSqlId(owner) {
    if (this.#owner !== owner) {
      throw new MisuseError("Attempted to use SQL text opened with other object");
    } else if (this.#closed !== void 0) {
      throw new ClosedError("SQL text is closed", this.#closed);
    }
    return this.#sqlId;
  }
  /** Remove the SQL text from the server, releasing resouces. */
  close() {
    this._setClosed(new ClientError("SQL text was manually closed"));
  }
  /** @private */
  _setClosed(error) {
    if (this.#closed === void 0) {
      this.#closed = error;
      this.#owner._closeSql(this.#sqlId);
    }
  }
  /** True if the SQL text is closed (removed from the server). */
  get closed() {
    return this.#closed !== void 0;
  }
};
function sqlToProto(owner, sql2) {
  if (sql2 instanceof Sql) {
    return { sqlId: sql2._getSqlId(owner) };
  } else {
    return { sql: "" + sql2 };
  }
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/queue.js
var Queue = class {
  #pushStack;
  #shiftStack;
  constructor() {
    this.#pushStack = [];
    this.#shiftStack = [];
  }
  get length() {
    return this.#pushStack.length + this.#shiftStack.length;
  }
  push(elem) {
    this.#pushStack.push(elem);
  }
  shift() {
    if (this.#shiftStack.length === 0 && this.#pushStack.length > 0) {
      this.#shiftStack = this.#pushStack.reverse();
      this.#pushStack = [];
    }
    return this.#shiftStack.pop();
  }
  first() {
    return this.#shiftStack.length !== 0 ? this.#shiftStack[this.#shiftStack.length - 1] : this.#pushStack[0];
  }
};

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/stmt.js
var Stmt = class {
  /** The SQL statement text. */
  sql;
  /** @private */
  _args;
  /** @private */
  _namedArgs;
  /** Initialize the statement with given SQL text. */
  constructor(sql2) {
    this.sql = sql2;
    this._args = [];
    this._namedArgs = /* @__PURE__ */ new Map();
  }
  /** Binds positional parameters from the given `values`. All previous positional bindings are cleared. */
  bindIndexes(values) {
    this._args.length = 0;
    for (const value of values) {
      this._args.push(valueToProto(value));
    }
    return this;
  }
  /** Binds a parameter by a 1-based index. */
  bindIndex(index2, value) {
    if (index2 !== (index2 | 0) || index2 <= 0) {
      throw new RangeError("Index of a positional argument must be positive integer");
    }
    while (this._args.length < index2) {
      this._args.push(null);
    }
    this._args[index2 - 1] = valueToProto(value);
    return this;
  }
  /** Binds a parameter by name. */
  bindName(name2, value) {
    this._namedArgs.set(name2, valueToProto(value));
    return this;
  }
  /** Clears all bindings. */
  unbindAll() {
    this._args.length = 0;
    this._namedArgs.clear();
    return this;
  }
};
function stmtToProto(sqlOwner, stmt, wantRows) {
  let inSql;
  let args = [];
  let namedArgs = [];
  if (stmt instanceof Stmt) {
    inSql = stmt.sql;
    args = stmt._args;
    for (const [name2, value] of stmt._namedArgs.entries()) {
      namedArgs.push({ name: name2, value });
    }
  } else if (Array.isArray(stmt)) {
    inSql = stmt[0];
    if (Array.isArray(stmt[1])) {
      args = stmt[1].map((arg) => valueToProto(arg));
    } else {
      namedArgs = Object.entries(stmt[1]).map(([name2, value]) => {
        return { name: name2, value: valueToProto(value) };
      });
    }
  } else {
    inSql = stmt;
  }
  const { sql: sql2, sqlId } = sqlToProto(sqlOwner, inSql);
  return { sql: sql2, sqlId, args, namedArgs, wantRows };
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/batch.js
var Batch = class {
  /** @private */
  _stream;
  #useCursor;
  /** @private */
  _steps;
  #executed;
  /** @private */
  constructor(stream, useCursor) {
    this._stream = stream;
    this.#useCursor = useCursor;
    this._steps = [];
    this.#executed = false;
  }
  /** Return a builder for adding a step to the batch. */
  step() {
    return new BatchStep(this);
  }
  /** Execute the batch. */
  execute() {
    if (this.#executed) {
      throw new MisuseError("This batch has already been executed");
    }
    this.#executed = true;
    const batch = {
      steps: this._steps.map((step) => step.proto)
    };
    if (this.#useCursor) {
      return executeCursor(this._stream, this._steps, batch);
    } else {
      return executeRegular(this._stream, this._steps, batch);
    }
  }
};
function executeRegular(stream, steps, batch) {
  return stream._batch(batch).then((result) => {
    for (let step = 0; step < steps.length; ++step) {
      const stepResult = result.stepResults.get(step);
      const stepError = result.stepErrors.get(step);
      steps[step].callback(stepResult, stepError);
    }
  });
}
async function executeCursor(stream, steps, batch) {
  const cursor = await stream._openCursor(batch);
  try {
    let nextStep = 0;
    let beginEntry = void 0;
    let rows = [];
    for (; ; ) {
      const entry = await cursor.next();
      if (entry === void 0) {
        break;
      }
      if (entry.type === "step_begin") {
        if (entry.step < nextStep || entry.step >= steps.length) {
          throw new ProtoError("Server produced StepBeginEntry for unexpected step");
        } else if (beginEntry !== void 0) {
          throw new ProtoError("Server produced StepBeginEntry before terminating previous step");
        }
        for (let step = nextStep; step < entry.step; ++step) {
          steps[step].callback(void 0, void 0);
        }
        nextStep = entry.step + 1;
        beginEntry = entry;
        rows = [];
      } else if (entry.type === "step_end") {
        if (beginEntry === void 0) {
          throw new ProtoError("Server produced StepEndEntry but no step is active");
        }
        const stmtResult = {
          cols: beginEntry.cols,
          rows,
          affectedRowCount: entry.affectedRowCount,
          lastInsertRowid: entry.lastInsertRowid
        };
        steps[beginEntry.step].callback(stmtResult, void 0);
        beginEntry = void 0;
        rows = [];
      } else if (entry.type === "step_error") {
        if (beginEntry === void 0) {
          if (entry.step >= steps.length) {
            throw new ProtoError("Server produced StepErrorEntry for unexpected step");
          }
          for (let step = nextStep; step < entry.step; ++step) {
            steps[step].callback(void 0, void 0);
          }
        } else {
          if (entry.step !== beginEntry.step) {
            throw new ProtoError("Server produced StepErrorEntry for unexpected step");
          }
          beginEntry = void 0;
          rows = [];
        }
        steps[entry.step].callback(void 0, entry.error);
        nextStep = entry.step + 1;
      } else if (entry.type === "row") {
        if (beginEntry === void 0) {
          throw new ProtoError("Server produced RowEntry but no step is active");
        }
        rows.push(entry.row);
      } else if (entry.type === "error") {
        throw errorFromProto(entry.error);
      } else if (entry.type === "none") {
        throw new ProtoError("Server produced unrecognized CursorEntry");
      } else {
        throw impossible(entry, "Impossible CursorEntry");
      }
    }
    if (beginEntry !== void 0) {
      throw new ProtoError("Server closed Cursor before terminating active step");
    }
    for (let step = nextStep; step < steps.length; ++step) {
      steps[step].callback(void 0, void 0);
    }
  } finally {
    cursor.close();
  }
}
var BatchStep = class {
  /** @private */
  _batch;
  #conds;
  /** @private */
  _index;
  /** @private */
  constructor(batch) {
    this._batch = batch;
    this.#conds = [];
    this._index = void 0;
  }
  /** Add the condition that needs to be satisfied to execute the statement. If you use this method multiple
   * times, we join the conditions with a logical AND. */
  condition(cond) {
    this.#conds.push(cond._proto);
    return this;
  }
  /** Add a statement that returns rows. */
  query(stmt) {
    return this.#add(stmt, true, rowsResultFromProto);
  }
  /** Add a statement that returns at most a single row. */
  queryRow(stmt) {
    return this.#add(stmt, true, rowResultFromProto);
  }
  /** Add a statement that returns at most a single value. */
  queryValue(stmt) {
    return this.#add(stmt, true, valueResultFromProto);
  }
  /** Add a statement without returning rows. */
  run(stmt) {
    return this.#add(stmt, false, stmtResultFromProto);
  }
  #add(inStmt, wantRows, fromProto) {
    if (this._index !== void 0) {
      throw new MisuseError("This BatchStep has already been added to the batch");
    }
    const stmt = stmtToProto(this._batch._stream._sqlOwner(), inStmt, wantRows);
    let condition;
    if (this.#conds.length === 0) {
      condition = void 0;
    } else if (this.#conds.length === 1) {
      condition = this.#conds[0];
    } else {
      condition = { type: "and", conds: this.#conds.slice() };
    }
    const proto = { stmt, condition };
    return new Promise((outputCallback, errorCallback) => {
      const callback = (stepResult, stepError) => {
        if (stepResult !== void 0 && stepError !== void 0) {
          errorCallback(new ProtoError("Server returned both result and error"));
        } else if (stepError !== void 0) {
          errorCallback(errorFromProto(stepError));
        } else if (stepResult !== void 0) {
          outputCallback(fromProto(stepResult, this._batch._stream.intMode));
        } else {
          outputCallback(void 0);
        }
      };
      this._index = this._batch._steps.length;
      this._batch._steps.push({ proto, callback });
    });
  }
};
var BatchCond = class _BatchCond {
  /** @private */
  _batch;
  /** @private */
  _proto;
  /** @private */
  constructor(batch, proto) {
    this._batch = batch;
    this._proto = proto;
  }
  /** Create a condition that evaluates to true when the given step executes successfully.
   *
   * If the given step fails error or is skipped because its condition evaluated to false, this
   * condition evaluates to false.
   */
  static ok(step) {
    return new _BatchCond(step._batch, { type: "ok", step: stepIndex(step) });
  }
  /** Create a condition that evaluates to true when the given step fails.
   *
   * If the given step succeeds or is skipped because its condition evaluated to false, this condition
   * evaluates to false.
   */
  static error(step) {
    return new _BatchCond(step._batch, { type: "error", step: stepIndex(step) });
  }
  /** Create a condition that is a logical negation of another condition.
   */
  static not(cond) {
    return new _BatchCond(cond._batch, { type: "not", cond: cond._proto });
  }
  /** Create a condition that is a logical AND of other conditions.
   */
  static and(batch, conds) {
    for (const cond of conds) {
      checkCondBatch(batch, cond);
    }
    return new _BatchCond(batch, { type: "and", conds: conds.map((e) => e._proto) });
  }
  /** Create a condition that is a logical OR of other conditions.
   */
  static or(batch, conds) {
    for (const cond of conds) {
      checkCondBatch(batch, cond);
    }
    return new _BatchCond(batch, { type: "or", conds: conds.map((e) => e._proto) });
  }
  /** Create a condition that evaluates to true when the SQL connection is in autocommit mode (not inside an
   * explicit transaction). This requires protocol version 3 or higher.
   */
  static isAutocommit(batch) {
    batch._stream.client()._ensureVersion(3, "BatchCond.isAutocommit()");
    return new _BatchCond(batch, { type: "is_autocommit" });
  }
};
function stepIndex(step) {
  if (step._index === void 0) {
    throw new MisuseError("Cannot add a condition referencing a step that has not been added to the batch");
  }
  return step._index;
}
function checkCondBatch(expectedBatch, cond) {
  if (cond._batch !== expectedBatch) {
    throw new MisuseError("Cannot mix BatchCond objects for different Batch objects");
  }
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/describe.js
function describeResultFromProto(result) {
  return {
    paramNames: result.params.map((p) => p.name),
    columns: result.cols,
    isExplain: result.isExplain,
    isReadonly: result.isReadonly
  };
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/stream.js
var Stream = class {
  /** @private */
  constructor(intMode) {
    this.intMode = intMode;
  }
  /** Execute a statement and return rows. */
  query(stmt) {
    return this.#execute(stmt, true, rowsResultFromProto);
  }
  /** Execute a statement and return at most a single row. */
  queryRow(stmt) {
    return this.#execute(stmt, true, rowResultFromProto);
  }
  /** Execute a statement and return at most a single value. */
  queryValue(stmt) {
    return this.#execute(stmt, true, valueResultFromProto);
  }
  /** Execute a statement without returning rows. */
  run(stmt) {
    return this.#execute(stmt, false, stmtResultFromProto);
  }
  #execute(inStmt, wantRows, fromProto) {
    const stmt = stmtToProto(this._sqlOwner(), inStmt, wantRows);
    return this._execute(stmt).then((r) => fromProto(r, this.intMode));
  }
  /** Return a builder for creating and executing a batch.
   *
   * If `useCursor` is true, the batch will be executed using a Hrana cursor, which will stream results from
   * the server to the client, which consumes less memory on the server. This requires protocol version 3 or
   * higher.
   */
  batch(useCursor = false) {
    return new Batch(this, useCursor);
  }
  /** Parse and analyze a statement. This requires protocol version 2 or higher. */
  describe(inSql) {
    const protoSql = sqlToProto(this._sqlOwner(), inSql);
    return this._describe(protoSql).then(describeResultFromProto);
  }
  /** Execute a sequence of statements separated by semicolons. This requires protocol version 2 or higher.
   * */
  sequence(inSql) {
    const protoSql = sqlToProto(this._sqlOwner(), inSql);
    return this._sequence(protoSql);
  }
  /** Representation of integers returned from the database. See {@link IntMode}.
   *
   * This value affects the results of all operations on this stream.
   */
  intMode;
};

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/cursor.js
var Cursor = class {
};

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/ws/cursor.js
var fetchChunkSize = 1e3;
var fetchQueueSize = 10;
var WsCursor = class extends Cursor {
  #client;
  #stream;
  #cursorId;
  #entryQueue;
  #fetchQueue;
  #closed;
  #done;
  /** @private */
  constructor(client, stream, cursorId) {
    super();
    this.#client = client;
    this.#stream = stream;
    this.#cursorId = cursorId;
    this.#entryQueue = new Queue();
    this.#fetchQueue = new Queue();
    this.#closed = void 0;
    this.#done = false;
  }
  /** Fetch the next entry from the cursor. */
  async next() {
    for (; ; ) {
      if (this.#closed !== void 0) {
        throw new ClosedError("Cursor is closed", this.#closed);
      }
      while (!this.#done && this.#fetchQueue.length < fetchQueueSize) {
        this.#fetchQueue.push(this.#fetch());
      }
      const entry = this.#entryQueue.shift();
      if (this.#done || entry !== void 0) {
        return entry;
      }
      await this.#fetchQueue.shift().then((response) => {
        if (response === void 0) {
          return;
        }
        for (const entry2 of response.entries) {
          this.#entryQueue.push(entry2);
        }
        this.#done ||= response.done;
      });
    }
  }
  #fetch() {
    return this.#stream._sendCursorRequest(this, {
      type: "fetch_cursor",
      cursorId: this.#cursorId,
      maxCount: fetchChunkSize
    }).then((resp) => resp, (error) => {
      this._setClosed(error);
      return void 0;
    });
  }
  /** @private */
  _setClosed(error) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#closed = error;
    this.#stream._sendCursorRequest(this, {
      type: "close_cursor",
      cursorId: this.#cursorId
    }).catch(() => void 0);
    this.#stream._cursorClosed(this);
  }
  /** Close the cursor. */
  close() {
    this._setClosed(new ClientError("Cursor was manually closed"));
  }
  /** True if the cursor is closed. */
  get closed() {
    return this.#closed !== void 0;
  }
};

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/ws/stream.js
var WsStream = class _WsStream extends Stream {
  #client;
  #streamId;
  #queue;
  #cursor;
  #closing;
  #closed;
  /** @private */
  static open(client) {
    const streamId = client._streamIdAlloc.alloc();
    const stream = new _WsStream(client, streamId);
    const responseCallback = () => void 0;
    const errorCallback = (e) => stream.#setClosed(e);
    const request = { type: "open_stream", streamId };
    client._sendRequest(request, { responseCallback, errorCallback });
    return stream;
  }
  /** @private */
  constructor(client, streamId) {
    super(client.intMode);
    this.#client = client;
    this.#streamId = streamId;
    this.#queue = new Queue();
    this.#cursor = void 0;
    this.#closing = false;
    this.#closed = void 0;
  }
  /** Get the {@link WsClient} object that this stream belongs to. */
  client() {
    return this.#client;
  }
  /** @private */
  _sqlOwner() {
    return this.#client;
  }
  /** @private */
  _execute(stmt) {
    return this.#sendStreamRequest({
      type: "execute",
      streamId: this.#streamId,
      stmt
    }).then((response) => {
      return response.result;
    });
  }
  /** @private */
  _batch(batch) {
    return this.#sendStreamRequest({
      type: "batch",
      streamId: this.#streamId,
      batch
    }).then((response) => {
      return response.result;
    });
  }
  /** @private */
  _describe(protoSql) {
    this.#client._ensureVersion(2, "describe()");
    return this.#sendStreamRequest({
      type: "describe",
      streamId: this.#streamId,
      sql: protoSql.sql,
      sqlId: protoSql.sqlId
    }).then((response) => {
      return response.result;
    });
  }
  /** @private */
  _sequence(protoSql) {
    this.#client._ensureVersion(2, "sequence()");
    return this.#sendStreamRequest({
      type: "sequence",
      streamId: this.#streamId,
      sql: protoSql.sql,
      sqlId: protoSql.sqlId
    }).then((_response) => {
      return void 0;
    });
  }
  /** Check whether the SQL connection underlying this stream is in autocommit state (i.e., outside of an
   * explicit transaction). This requires protocol version 3 or higher.
   */
  getAutocommit() {
    this.#client._ensureVersion(3, "getAutocommit()");
    return this.#sendStreamRequest({
      type: "get_autocommit",
      streamId: this.#streamId
    }).then((response) => {
      return response.isAutocommit;
    });
  }
  #sendStreamRequest(request) {
    return new Promise((responseCallback, errorCallback) => {
      this.#pushToQueue({ type: "request", request, responseCallback, errorCallback });
    });
  }
  /** @private */
  _openCursor(batch) {
    this.#client._ensureVersion(3, "cursor");
    return new Promise((cursorCallback, errorCallback) => {
      this.#pushToQueue({ type: "cursor", batch, cursorCallback, errorCallback });
    });
  }
  /** @private */
  _sendCursorRequest(cursor, request) {
    if (cursor !== this.#cursor) {
      throw new InternalError("Cursor not associated with the stream attempted to execute a request");
    }
    return new Promise((responseCallback, errorCallback) => {
      if (this.#closed !== void 0) {
        errorCallback(new ClosedError("Stream is closed", this.#closed));
      } else {
        this.#client._sendRequest(request, { responseCallback, errorCallback });
      }
    });
  }
  /** @private */
  _cursorClosed(cursor) {
    if (cursor !== this.#cursor) {
      throw new InternalError("Cursor was closed, but it was not associated with the stream");
    }
    this.#cursor = void 0;
    this.#flushQueue();
  }
  #pushToQueue(entry) {
    if (this.#closed !== void 0) {
      entry.errorCallback(new ClosedError("Stream is closed", this.#closed));
    } else if (this.#closing) {
      entry.errorCallback(new ClosedError("Stream is closing", void 0));
    } else {
      this.#queue.push(entry);
      this.#flushQueue();
    }
  }
  #flushQueue() {
    for (; ; ) {
      const entry = this.#queue.first();
      if (entry === void 0 && this.#cursor === void 0 && this.#closing) {
        this.#setClosed(new ClientError("Stream was gracefully closed"));
        break;
      } else if (entry?.type === "request" && this.#cursor === void 0) {
        const { request, responseCallback, errorCallback } = entry;
        this.#queue.shift();
        this.#client._sendRequest(request, { responseCallback, errorCallback });
      } else if (entry?.type === "cursor" && this.#cursor === void 0) {
        const { batch, cursorCallback } = entry;
        this.#queue.shift();
        const cursorId = this.#client._cursorIdAlloc.alloc();
        const cursor = new WsCursor(this.#client, this, cursorId);
        const request = {
          type: "open_cursor",
          streamId: this.#streamId,
          cursorId,
          batch
        };
        const responseCallback = () => void 0;
        const errorCallback = (e) => cursor._setClosed(e);
        this.#client._sendRequest(request, { responseCallback, errorCallback });
        this.#cursor = cursor;
        cursorCallback(cursor);
      } else {
        break;
      }
    }
  }
  #setClosed(error) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#closed = error;
    if (this.#cursor !== void 0) {
      this.#cursor._setClosed(error);
    }
    for (; ; ) {
      const entry = this.#queue.shift();
      if (entry !== void 0) {
        entry.errorCallback(error);
      } else {
        break;
      }
    }
    const request = { type: "close_stream", streamId: this.#streamId };
    const responseCallback = () => this.#client._streamIdAlloc.free(this.#streamId);
    const errorCallback = () => void 0;
    this.#client._sendRequest(request, { responseCallback, errorCallback });
  }
  /** Immediately close the stream. */
  close() {
    this.#setClosed(new ClientError("Stream was manually closed"));
  }
  /** Gracefully close the stream. */
  closeGracefully() {
    this.#closing = true;
    this.#flushQueue();
  }
  /** True if the stream is closed or closing. */
  get closed() {
    return this.#closed !== void 0 || this.#closing;
  }
};

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/shared/json_encode.js
function Stmt2(w, msg) {
  if (msg.sql !== void 0) {
    w.string("sql", msg.sql);
  }
  if (msg.sqlId !== void 0) {
    w.number("sql_id", msg.sqlId);
  }
  w.arrayObjects("args", msg.args, Value);
  w.arrayObjects("named_args", msg.namedArgs, NamedArg);
  w.boolean("want_rows", msg.wantRows);
}
function NamedArg(w, msg) {
  w.string("name", msg.name);
  w.object("value", msg.value, Value);
}
function Batch2(w, msg) {
  w.arrayObjects("steps", msg.steps, BatchStep2);
}
function BatchStep2(w, msg) {
  if (msg.condition !== void 0) {
    w.object("condition", msg.condition, BatchCond2);
  }
  w.object("stmt", msg.stmt, Stmt2);
}
function BatchCond2(w, msg) {
  w.stringRaw("type", msg.type);
  if (msg.type === "ok" || msg.type === "error") {
    w.number("step", msg.step);
  } else if (msg.type === "not") {
    w.object("cond", msg.cond, BatchCond2);
  } else if (msg.type === "and" || msg.type === "or") {
    w.arrayObjects("conds", msg.conds, BatchCond2);
  } else if (msg.type === "is_autocommit") {
  } else {
    throw impossible(msg, "Impossible type of BatchCond");
  }
}
function Value(w, msg) {
  if (msg === null) {
    w.stringRaw("type", "null");
  } else if (typeof msg === "bigint") {
    w.stringRaw("type", "integer");
    w.stringRaw("value", "" + msg);
  } else if (typeof msg === "number") {
    w.stringRaw("type", "float");
    w.number("value", msg);
  } else if (typeof msg === "string") {
    w.stringRaw("type", "text");
    w.string("value", msg);
  } else if (msg instanceof Uint8Array) {
    w.stringRaw("type", "blob");
    w.stringRaw("base64", gBase64.fromUint8Array(msg));
  } else if (msg === void 0) {
  } else {
    throw impossible(msg, "Impossible type of Value");
  }
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/ws/json_encode.js
function ClientMsg(w, msg) {
  w.stringRaw("type", msg.type);
  if (msg.type === "hello") {
    if (msg.jwt !== void 0) {
      w.string("jwt", msg.jwt);
    }
  } else if (msg.type === "request") {
    w.number("request_id", msg.requestId);
    w.object("request", msg.request, Request2);
  } else {
    throw impossible(msg, "Impossible type of ClientMsg");
  }
}
function Request2(w, msg) {
  w.stringRaw("type", msg.type);
  if (msg.type === "open_stream") {
    w.number("stream_id", msg.streamId);
  } else if (msg.type === "close_stream") {
    w.number("stream_id", msg.streamId);
  } else if (msg.type === "execute") {
    w.number("stream_id", msg.streamId);
    w.object("stmt", msg.stmt, Stmt2);
  } else if (msg.type === "batch") {
    w.number("stream_id", msg.streamId);
    w.object("batch", msg.batch, Batch2);
  } else if (msg.type === "open_cursor") {
    w.number("stream_id", msg.streamId);
    w.number("cursor_id", msg.cursorId);
    w.object("batch", msg.batch, Batch2);
  } else if (msg.type === "close_cursor") {
    w.number("cursor_id", msg.cursorId);
  } else if (msg.type === "fetch_cursor") {
    w.number("cursor_id", msg.cursorId);
    w.number("max_count", msg.maxCount);
  } else if (msg.type === "sequence") {
    w.number("stream_id", msg.streamId);
    if (msg.sql !== void 0) {
      w.string("sql", msg.sql);
    }
    if (msg.sqlId !== void 0) {
      w.number("sql_id", msg.sqlId);
    }
  } else if (msg.type === "describe") {
    w.number("stream_id", msg.streamId);
    if (msg.sql !== void 0) {
      w.string("sql", msg.sql);
    }
    if (msg.sqlId !== void 0) {
      w.number("sql_id", msg.sqlId);
    }
  } else if (msg.type === "store_sql") {
    w.number("sql_id", msg.sqlId);
    w.string("sql", msg.sql);
  } else if (msg.type === "close_sql") {
    w.number("sql_id", msg.sqlId);
  } else if (msg.type === "get_autocommit") {
    w.number("stream_id", msg.streamId);
  } else {
    throw impossible(msg, "Impossible type of Request");
  }
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/shared/protobuf_encode.js
function Stmt3(w, msg) {
  if (msg.sql !== void 0) {
    w.string(1, msg.sql);
  }
  if (msg.sqlId !== void 0) {
    w.int32(2, msg.sqlId);
  }
  for (const arg of msg.args) {
    w.message(3, arg, Value2);
  }
  for (const arg of msg.namedArgs) {
    w.message(4, arg, NamedArg2);
  }
  w.bool(5, msg.wantRows);
}
function NamedArg2(w, msg) {
  w.string(1, msg.name);
  w.message(2, msg.value, Value2);
}
function Batch3(w, msg) {
  for (const step of msg.steps) {
    w.message(1, step, BatchStep3);
  }
}
function BatchStep3(w, msg) {
  if (msg.condition !== void 0) {
    w.message(1, msg.condition, BatchCond3);
  }
  w.message(2, msg.stmt, Stmt3);
}
function BatchCond3(w, msg) {
  if (msg.type === "ok") {
    w.uint32(1, msg.step);
  } else if (msg.type === "error") {
    w.uint32(2, msg.step);
  } else if (msg.type === "not") {
    w.message(3, msg.cond, BatchCond3);
  } else if (msg.type === "and") {
    w.message(4, msg.conds, BatchCondList);
  } else if (msg.type === "or") {
    w.message(5, msg.conds, BatchCondList);
  } else if (msg.type === "is_autocommit") {
    w.message(6, void 0, Empty);
  } else {
    throw impossible(msg, "Impossible type of BatchCond");
  }
}
function BatchCondList(w, msg) {
  for (const cond of msg) {
    w.message(1, cond, BatchCond3);
  }
}
function Value2(w, msg) {
  if (msg === null) {
    w.message(1, void 0, Empty);
  } else if (typeof msg === "bigint") {
    w.sint64(2, msg);
  } else if (typeof msg === "number") {
    w.double(3, msg);
  } else if (typeof msg === "string") {
    w.string(4, msg);
  } else if (msg instanceof Uint8Array) {
    w.bytes(5, msg);
  } else if (msg === void 0) {
  } else {
    throw impossible(msg, "Impossible type of Value");
  }
}
function Empty(_w, _msg) {
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/ws/protobuf_encode.js
function ClientMsg2(w, msg) {
  if (msg.type === "hello") {
    w.message(1, msg, HelloMsg);
  } else if (msg.type === "request") {
    w.message(2, msg, RequestMsg);
  } else {
    throw impossible(msg, "Impossible type of ClientMsg");
  }
}
function HelloMsg(w, msg) {
  if (msg.jwt !== void 0) {
    w.string(1, msg.jwt);
  }
}
function RequestMsg(w, msg) {
  w.int32(1, msg.requestId);
  const request = msg.request;
  if (request.type === "open_stream") {
    w.message(2, request, OpenStreamReq);
  } else if (request.type === "close_stream") {
    w.message(3, request, CloseStreamReq);
  } else if (request.type === "execute") {
    w.message(4, request, ExecuteReq);
  } else if (request.type === "batch") {
    w.message(5, request, BatchReq);
  } else if (request.type === "open_cursor") {
    w.message(6, request, OpenCursorReq);
  } else if (request.type === "close_cursor") {
    w.message(7, request, CloseCursorReq);
  } else if (request.type === "fetch_cursor") {
    w.message(8, request, FetchCursorReq);
  } else if (request.type === "sequence") {
    w.message(9, request, SequenceReq);
  } else if (request.type === "describe") {
    w.message(10, request, DescribeReq);
  } else if (request.type === "store_sql") {
    w.message(11, request, StoreSqlReq);
  } else if (request.type === "close_sql") {
    w.message(12, request, CloseSqlReq);
  } else if (request.type === "get_autocommit") {
    w.message(13, request, GetAutocommitReq);
  } else {
    throw impossible(request, "Impossible type of Request");
  }
}
function OpenStreamReq(w, msg) {
  w.int32(1, msg.streamId);
}
function CloseStreamReq(w, msg) {
  w.int32(1, msg.streamId);
}
function ExecuteReq(w, msg) {
  w.int32(1, msg.streamId);
  w.message(2, msg.stmt, Stmt3);
}
function BatchReq(w, msg) {
  w.int32(1, msg.streamId);
  w.message(2, msg.batch, Batch3);
}
function OpenCursorReq(w, msg) {
  w.int32(1, msg.streamId);
  w.int32(2, msg.cursorId);
  w.message(3, msg.batch, Batch3);
}
function CloseCursorReq(w, msg) {
  w.int32(1, msg.cursorId);
}
function FetchCursorReq(w, msg) {
  w.int32(1, msg.cursorId);
  w.uint32(2, msg.maxCount);
}
function SequenceReq(w, msg) {
  w.int32(1, msg.streamId);
  if (msg.sql !== void 0) {
    w.string(2, msg.sql);
  }
  if (msg.sqlId !== void 0) {
    w.int32(3, msg.sqlId);
  }
}
function DescribeReq(w, msg) {
  w.int32(1, msg.streamId);
  if (msg.sql !== void 0) {
    w.string(2, msg.sql);
  }
  if (msg.sqlId !== void 0) {
    w.int32(3, msg.sqlId);
  }
}
function StoreSqlReq(w, msg) {
  w.int32(1, msg.sqlId);
  w.string(2, msg.sql);
}
function CloseSqlReq(w, msg) {
  w.int32(1, msg.sqlId);
}
function GetAutocommitReq(w, msg) {
  w.int32(1, msg.streamId);
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/shared/json_decode.js
function Error2(obj) {
  const message = string(obj["message"]);
  const code = stringOpt(obj["code"]);
  return { message, code };
}
function StmtResult(obj) {
  const cols = arrayObjectsMap(obj["cols"], Col);
  const rows = array(obj["rows"]).map((rowObj) => arrayObjectsMap(rowObj, Value3));
  const affectedRowCount = number(obj["affected_row_count"]);
  const lastInsertRowidStr = stringOpt(obj["last_insert_rowid"]);
  const lastInsertRowid = lastInsertRowidStr !== void 0 ? BigInt(lastInsertRowidStr) : void 0;
  return { cols, rows, affectedRowCount, lastInsertRowid };
}
function Col(obj) {
  const name2 = stringOpt(obj["name"]);
  const decltype = stringOpt(obj["decltype"]);
  return { name: name2, decltype };
}
function BatchResult(obj) {
  const stepResults = /* @__PURE__ */ new Map();
  array(obj["step_results"]).forEach((value, i) => {
    if (value !== null) {
      stepResults.set(i, StmtResult(object(value)));
    }
  });
  const stepErrors = /* @__PURE__ */ new Map();
  array(obj["step_errors"]).forEach((value, i) => {
    if (value !== null) {
      stepErrors.set(i, Error2(object(value)));
    }
  });
  return { stepResults, stepErrors };
}
function CursorEntry(obj) {
  const type = string(obj["type"]);
  if (type === "step_begin") {
    const step = number(obj["step"]);
    const cols = arrayObjectsMap(obj["cols"], Col);
    return { type: "step_begin", step, cols };
  } else if (type === "step_end") {
    const affectedRowCount = number(obj["affected_row_count"]);
    const lastInsertRowidStr = stringOpt(obj["last_insert_rowid"]);
    const lastInsertRowid = lastInsertRowidStr !== void 0 ? BigInt(lastInsertRowidStr) : void 0;
    return { type: "step_end", affectedRowCount, lastInsertRowid };
  } else if (type === "step_error") {
    const step = number(obj["step"]);
    const error = Error2(object(obj["error"]));
    return { type: "step_error", step, error };
  } else if (type === "row") {
    const row = arrayObjectsMap(obj["row"], Value3);
    return { type: "row", row };
  } else if (type === "error") {
    const error = Error2(object(obj["error"]));
    return { type: "error", error };
  } else {
    throw new ProtoError("Unexpected type of CursorEntry");
  }
}
function DescribeResult(obj) {
  const params = arrayObjectsMap(obj["params"], DescribeParam);
  const cols = arrayObjectsMap(obj["cols"], DescribeCol);
  const isExplain = boolean(obj["is_explain"]);
  const isReadonly = boolean(obj["is_readonly"]);
  return { params, cols, isExplain, isReadonly };
}
function DescribeParam(obj) {
  const name2 = stringOpt(obj["name"]);
  return { name: name2 };
}
function DescribeCol(obj) {
  const name2 = string(obj["name"]);
  const decltype = stringOpt(obj["decltype"]);
  return { name: name2, decltype };
}
function Value3(obj) {
  const type = string(obj["type"]);
  if (type === "null") {
    return null;
  } else if (type === "integer") {
    const value = string(obj["value"]);
    return BigInt(value);
  } else if (type === "float") {
    return number(obj["value"]);
  } else if (type === "text") {
    return string(obj["value"]);
  } else if (type === "blob") {
    return gBase64.toUint8Array(string(obj["base64"]));
  } else {
    throw new ProtoError("Unexpected type of Value");
  }
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/ws/json_decode.js
function ServerMsg(obj) {
  const type = string(obj["type"]);
  if (type === "hello_ok") {
    return { type: "hello_ok" };
  } else if (type === "hello_error") {
    const error = Error2(object(obj["error"]));
    return { type: "hello_error", error };
  } else if (type === "response_ok") {
    const requestId = number(obj["request_id"]);
    const response = Response2(object(obj["response"]));
    return { type: "response_ok", requestId, response };
  } else if (type === "response_error") {
    const requestId = number(obj["request_id"]);
    const error = Error2(object(obj["error"]));
    return { type: "response_error", requestId, error };
  } else {
    throw new ProtoError("Unexpected type of ServerMsg");
  }
}
function Response2(obj) {
  const type = string(obj["type"]);
  if (type === "open_stream") {
    return { type: "open_stream" };
  } else if (type === "close_stream") {
    return { type: "close_stream" };
  } else if (type === "execute") {
    const result = StmtResult(object(obj["result"]));
    return { type: "execute", result };
  } else if (type === "batch") {
    const result = BatchResult(object(obj["result"]));
    return { type: "batch", result };
  } else if (type === "open_cursor") {
    return { type: "open_cursor" };
  } else if (type === "close_cursor") {
    return { type: "close_cursor" };
  } else if (type === "fetch_cursor") {
    const entries = arrayObjectsMap(obj["entries"], CursorEntry);
    const done = boolean(obj["done"]);
    return { type: "fetch_cursor", entries, done };
  } else if (type === "sequence") {
    return { type: "sequence" };
  } else if (type === "describe") {
    const result = DescribeResult(object(obj["result"]));
    return { type: "describe", result };
  } else if (type === "store_sql") {
    return { type: "store_sql" };
  } else if (type === "close_sql") {
    return { type: "close_sql" };
  } else if (type === "get_autocommit") {
    const isAutocommit = boolean(obj["is_autocommit"]);
    return { type: "get_autocommit", isAutocommit };
  } else {
    throw new ProtoError("Unexpected type of Response");
  }
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/shared/protobuf_decode.js
var Error3 = {
  default() {
    return { message: "", code: void 0 };
  },
  1(r, msg) {
    msg.message = r.string();
  },
  2(r, msg) {
    msg.code = r.string();
  }
};
var StmtResult2 = {
  default() {
    return {
      cols: [],
      rows: [],
      affectedRowCount: 0,
      lastInsertRowid: void 0
    };
  },
  1(r, msg) {
    msg.cols.push(r.message(Col2));
  },
  2(r, msg) {
    msg.rows.push(r.message(Row));
  },
  3(r, msg) {
    msg.affectedRowCount = Number(r.uint64());
  },
  4(r, msg) {
    msg.lastInsertRowid = r.sint64();
  }
};
var Col2 = {
  default() {
    return { name: void 0, decltype: void 0 };
  },
  1(r, msg) {
    msg.name = r.string();
  },
  2(r, msg) {
    msg.decltype = r.string();
  }
};
var Row = {
  default() {
    return [];
  },
  1(r, msg) {
    msg.push(r.message(Value4));
  }
};
var BatchResult2 = {
  default() {
    return { stepResults: /* @__PURE__ */ new Map(), stepErrors: /* @__PURE__ */ new Map() };
  },
  1(r, msg) {
    const [key, value] = r.message(BatchResultStepResult);
    msg.stepResults.set(key, value);
  },
  2(r, msg) {
    const [key, value] = r.message(BatchResultStepError);
    msg.stepErrors.set(key, value);
  }
};
var BatchResultStepResult = {
  default() {
    return [0, StmtResult2.default()];
  },
  1(r, msg) {
    msg[0] = r.uint32();
  },
  2(r, msg) {
    msg[1] = r.message(StmtResult2);
  }
};
var BatchResultStepError = {
  default() {
    return [0, Error3.default()];
  },
  1(r, msg) {
    msg[0] = r.uint32();
  },
  2(r, msg) {
    msg[1] = r.message(Error3);
  }
};
var CursorEntry2 = {
  default() {
    return { type: "none" };
  },
  1(r) {
    return r.message(StepBeginEntry);
  },
  2(r) {
    return r.message(StepEndEntry);
  },
  3(r) {
    return r.message(StepErrorEntry);
  },
  4(r) {
    return { type: "row", row: r.message(Row) };
  },
  5(r) {
    return { type: "error", error: r.message(Error3) };
  }
};
var StepBeginEntry = {
  default() {
    return { type: "step_begin", step: 0, cols: [] };
  },
  1(r, msg) {
    msg.step = r.uint32();
  },
  2(r, msg) {
    msg.cols.push(r.message(Col2));
  }
};
var StepEndEntry = {
  default() {
    return {
      type: "step_end",
      affectedRowCount: 0,
      lastInsertRowid: void 0
    };
  },
  1(r, msg) {
    msg.affectedRowCount = r.uint32();
  },
  2(r, msg) {
    msg.lastInsertRowid = r.uint64();
  }
};
var StepErrorEntry = {
  default() {
    return {
      type: "step_error",
      step: 0,
      error: Error3.default()
    };
  },
  1(r, msg) {
    msg.step = r.uint32();
  },
  2(r, msg) {
    msg.error = r.message(Error3);
  }
};
var DescribeResult2 = {
  default() {
    return {
      params: [],
      cols: [],
      isExplain: false,
      isReadonly: false
    };
  },
  1(r, msg) {
    msg.params.push(r.message(DescribeParam2));
  },
  2(r, msg) {
    msg.cols.push(r.message(DescribeCol2));
  },
  3(r, msg) {
    msg.isExplain = r.bool();
  },
  4(r, msg) {
    msg.isReadonly = r.bool();
  }
};
var DescribeParam2 = {
  default() {
    return { name: void 0 };
  },
  1(r, msg) {
    msg.name = r.string();
  }
};
var DescribeCol2 = {
  default() {
    return { name: "", decltype: void 0 };
  },
  1(r, msg) {
    msg.name = r.string();
  },
  2(r, msg) {
    msg.decltype = r.string();
  }
};
var Value4 = {
  default() {
    return void 0;
  },
  1(r) {
    return null;
  },
  2(r) {
    return r.sint64();
  },
  3(r) {
    return r.double();
  },
  4(r) {
    return r.string();
  },
  5(r) {
    return r.bytes();
  }
};

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/ws/protobuf_decode.js
var ServerMsg2 = {
  default() {
    return { type: "none" };
  },
  1(r) {
    return { type: "hello_ok" };
  },
  2(r) {
    return r.message(HelloErrorMsg);
  },
  3(r) {
    return r.message(ResponseOkMsg);
  },
  4(r) {
    return r.message(ResponseErrorMsg);
  }
};
var HelloErrorMsg = {
  default() {
    return { type: "hello_error", error: Error3.default() };
  },
  1(r, msg) {
    msg.error = r.message(Error3);
  }
};
var ResponseErrorMsg = {
  default() {
    return { type: "response_error", requestId: 0, error: Error3.default() };
  },
  1(r, msg) {
    msg.requestId = r.int32();
  },
  2(r, msg) {
    msg.error = r.message(Error3);
  }
};
var ResponseOkMsg = {
  default() {
    return {
      type: "response_ok",
      requestId: 0,
      response: { type: "none" }
    };
  },
  1(r, msg) {
    msg.requestId = r.int32();
  },
  2(r, msg) {
    msg.response = { type: "open_stream" };
  },
  3(r, msg) {
    msg.response = { type: "close_stream" };
  },
  4(r, msg) {
    msg.response = r.message(ExecuteResp);
  },
  5(r, msg) {
    msg.response = r.message(BatchResp);
  },
  6(r, msg) {
    msg.response = { type: "open_cursor" };
  },
  7(r, msg) {
    msg.response = { type: "close_cursor" };
  },
  8(r, msg) {
    msg.response = r.message(FetchCursorResp);
  },
  9(r, msg) {
    msg.response = { type: "sequence" };
  },
  10(r, msg) {
    msg.response = r.message(DescribeResp);
  },
  11(r, msg) {
    msg.response = { type: "store_sql" };
  },
  12(r, msg) {
    msg.response = { type: "close_sql" };
  },
  13(r, msg) {
    msg.response = r.message(GetAutocommitResp);
  }
};
var ExecuteResp = {
  default() {
    return { type: "execute", result: StmtResult2.default() };
  },
  1(r, msg) {
    msg.result = r.message(StmtResult2);
  }
};
var BatchResp = {
  default() {
    return { type: "batch", result: BatchResult2.default() };
  },
  1(r, msg) {
    msg.result = r.message(BatchResult2);
  }
};
var FetchCursorResp = {
  default() {
    return { type: "fetch_cursor", entries: [], done: false };
  },
  1(r, msg) {
    msg.entries.push(r.message(CursorEntry2));
  },
  2(r, msg) {
    msg.done = r.bool();
  }
};
var DescribeResp = {
  default() {
    return { type: "describe", result: DescribeResult2.default() };
  },
  1(r, msg) {
    msg.result = r.message(DescribeResult2);
  }
};
var GetAutocommitResp = {
  default() {
    return { type: "get_autocommit", isAutocommit: false };
  },
  1(r, msg) {
    msg.isAutocommit = r.bool();
  }
};

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/ws/client.js
var subprotocolsV2 = /* @__PURE__ */ new Map([
  ["hrana2", { version: 2, encoding: "json" }],
  ["hrana1", { version: 1, encoding: "json" }]
]);
var subprotocolsV3 = /* @__PURE__ */ new Map([
  ["hrana3-protobuf", { version: 3, encoding: "protobuf" }],
  ["hrana3", { version: 3, encoding: "json" }],
  ["hrana2", { version: 2, encoding: "json" }],
  ["hrana1", { version: 1, encoding: "json" }]
]);
var WsClient = class extends Client {
  #socket;
  // List of callbacks that we queue until the socket transitions from the CONNECTING to the OPEN state.
  #openCallbacks;
  // Have we already transitioned from CONNECTING to OPEN and fired the callbacks in #openCallbacks?
  #opened;
  // Stores the error that caused us to close the client (and the socket). If we are not closed, this is
  // `undefined`.
  #closed;
  // Have we received a response to our "hello" from the server?
  #recvdHello;
  // Subprotocol negotiated with the server. It is only available after the socket transitions to the OPEN
  // state.
  #subprotocol;
  // Has the `getVersion()` function been called? This is only used to validate that the API is used
  // correctly.
  #getVersionCalled;
  // A map from request id to the responses that we expect to receive from the server.
  #responseMap;
  // An allocator of request ids.
  #requestIdAlloc;
  // An allocator of stream ids.
  /** @private */
  _streamIdAlloc;
  // An allocator of cursor ids.
  /** @private */
  _cursorIdAlloc;
  // An allocator of SQL text ids.
  #sqlIdAlloc;
  /** @private */
  constructor(socket, jwt) {
    super();
    this.#socket = socket;
    this.#openCallbacks = [];
    this.#opened = false;
    this.#closed = void 0;
    this.#recvdHello = false;
    this.#subprotocol = void 0;
    this.#getVersionCalled = false;
    this.#responseMap = /* @__PURE__ */ new Map();
    this.#requestIdAlloc = new IdAlloc();
    this._streamIdAlloc = new IdAlloc();
    this._cursorIdAlloc = new IdAlloc();
    this.#sqlIdAlloc = new IdAlloc();
    this.#socket.binaryType = "arraybuffer";
    this.#socket.addEventListener("open", () => this.#onSocketOpen());
    this.#socket.addEventListener("close", (event) => this.#onSocketClose(event));
    this.#socket.addEventListener("error", (event) => this.#onSocketError(event));
    this.#socket.addEventListener("message", (event) => this.#onSocketMessage(event));
    this.#send({ type: "hello", jwt });
  }
  // Send (or enqueue to send) a message to the server.
  #send(msg) {
    if (this.#closed !== void 0) {
      throw new InternalError("Trying to send a message on a closed client");
    }
    if (this.#opened) {
      this.#sendToSocket(msg);
    } else {
      const openCallback = () => this.#sendToSocket(msg);
      const errorCallback = () => void 0;
      this.#openCallbacks.push({ openCallback, errorCallback });
    }
  }
  // The socket transitioned from CONNECTING to OPEN
  #onSocketOpen() {
    const protocol = this.#socket.protocol;
    if (protocol === void 0) {
      this.#setClosed(new ClientError("The `WebSocket.protocol` property is undefined. This most likely means that the WebSocket implementation provided by the environment is broken. If you are using Miniflare 2, please update to Miniflare 3, which fixes this problem."));
      return;
    } else if (protocol === "") {
      this.#subprotocol = { version: 1, encoding: "json" };
    } else {
      this.#subprotocol = subprotocolsV3.get(protocol);
      if (this.#subprotocol === void 0) {
        this.#setClosed(new ProtoError(`Unrecognized WebSocket subprotocol: ${JSON.stringify(protocol)}`));
        return;
      }
    }
    for (const callbacks of this.#openCallbacks) {
      callbacks.openCallback();
    }
    this.#openCallbacks.length = 0;
    this.#opened = true;
  }
  #sendToSocket(msg) {
    const encoding = this.#subprotocol.encoding;
    if (encoding === "json") {
      const jsonMsg = writeJsonObject(msg, ClientMsg);
      this.#socket.send(jsonMsg);
    } else if (encoding === "protobuf") {
      const protobufMsg = writeProtobufMessage(msg, ClientMsg2);
      this.#socket.send(protobufMsg);
    } else {
      throw impossible(encoding, "Impossible encoding");
    }
  }
  /** Get the protocol version negotiated with the server, possibly waiting until the socket is open. */
  getVersion() {
    return new Promise((versionCallback, errorCallback) => {
      this.#getVersionCalled = true;
      if (this.#closed !== void 0) {
        errorCallback(this.#closed);
      } else if (!this.#opened) {
        const openCallback = () => versionCallback(this.#subprotocol.version);
        this.#openCallbacks.push({ openCallback, errorCallback });
      } else {
        versionCallback(this.#subprotocol.version);
      }
    });
  }
  // Make sure that the negotiated version is at least `minVersion`.
  /** @private */
  _ensureVersion(minVersion, feature) {
    if (this.#subprotocol === void 0 || !this.#getVersionCalled) {
      throw new ProtocolVersionError(`${feature} is supported only on protocol version ${minVersion} and higher, but the version supported by the WebSocket server is not yet known. Use Client.getVersion() to wait until the version is available.`);
    } else if (this.#subprotocol.version < minVersion) {
      throw new ProtocolVersionError(`${feature} is supported on protocol version ${minVersion} and higher, but the WebSocket server only supports version ${this.#subprotocol.version}`);
    }
  }
  // Send a request to the server and invoke a callback when we get the response.
  /** @private */
  _sendRequest(request, callbacks) {
    if (this.#closed !== void 0) {
      callbacks.errorCallback(new ClosedError("Client is closed", this.#closed));
      return;
    }
    const requestId = this.#requestIdAlloc.alloc();
    this.#responseMap.set(requestId, { ...callbacks, type: request.type });
    this.#send({ type: "request", requestId, request });
  }
  // The socket encountered an error.
  #onSocketError(event) {
    const eventMessage = event.message;
    const message = eventMessage ?? "WebSocket was closed due to an error";
    this.#setClosed(new WebSocketError(message));
  }
  // The socket was closed.
  #onSocketClose(event) {
    let message = `WebSocket was closed with code ${event.code}`;
    if (event.reason) {
      message += `: ${event.reason}`;
    }
    this.#setClosed(new WebSocketError(message));
  }
  // Close the client with the given error.
  #setClosed(error) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#closed = error;
    for (const callbacks of this.#openCallbacks) {
      callbacks.errorCallback(error);
    }
    this.#openCallbacks.length = 0;
    for (const [requestId, responseState] of this.#responseMap.entries()) {
      responseState.errorCallback(error);
      this.#requestIdAlloc.free(requestId);
    }
    this.#responseMap.clear();
    this.#socket.close();
  }
  // We received a message from the socket.
  #onSocketMessage(event) {
    if (this.#closed !== void 0) {
      return;
    }
    try {
      let msg;
      const encoding = this.#subprotocol.encoding;
      if (encoding === "json") {
        if (typeof event.data !== "string") {
          this.#socket.close(3003, "Only text messages are accepted with JSON encoding");
          this.#setClosed(new ProtoError("Received non-text message from server with JSON encoding"));
          return;
        }
        msg = readJsonObject(JSON.parse(event.data), ServerMsg);
      } else if (encoding === "protobuf") {
        if (!(event.data instanceof ArrayBuffer)) {
          this.#socket.close(3003, "Only binary messages are accepted with Protobuf encoding");
          this.#setClosed(new ProtoError("Received non-binary message from server with Protobuf encoding"));
          return;
        }
        msg = readProtobufMessage(new Uint8Array(event.data), ServerMsg2);
      } else {
        throw impossible(encoding, "Impossible encoding");
      }
      this.#handleMsg(msg);
    } catch (e) {
      this.#socket.close(3007, "Could not handle message");
      this.#setClosed(e);
    }
  }
  // Handle a message from the server.
  #handleMsg(msg) {
    if (msg.type === "none") {
      throw new ProtoError("Received an unrecognized ServerMsg");
    } else if (msg.type === "hello_ok" || msg.type === "hello_error") {
      if (this.#recvdHello) {
        throw new ProtoError("Received a duplicated hello response");
      }
      this.#recvdHello = true;
      if (msg.type === "hello_error") {
        throw errorFromProto(msg.error);
      }
      return;
    } else if (!this.#recvdHello) {
      throw new ProtoError("Received a non-hello message before a hello response");
    }
    if (msg.type === "response_ok") {
      const requestId = msg.requestId;
      const responseState = this.#responseMap.get(requestId);
      this.#responseMap.delete(requestId);
      if (responseState === void 0) {
        throw new ProtoError("Received unexpected OK response");
      }
      this.#requestIdAlloc.free(requestId);
      try {
        if (responseState.type !== msg.response.type) {
          console.dir({ responseState, msg });
          throw new ProtoError("Received unexpected type of response");
        }
        responseState.responseCallback(msg.response);
      } catch (e) {
        responseState.errorCallback(e);
        throw e;
      }
    } else if (msg.type === "response_error") {
      const requestId = msg.requestId;
      const responseState = this.#responseMap.get(requestId);
      this.#responseMap.delete(requestId);
      if (responseState === void 0) {
        throw new ProtoError("Received unexpected error response");
      }
      this.#requestIdAlloc.free(requestId);
      responseState.errorCallback(errorFromProto(msg.error));
    } else {
      throw impossible(msg, "Impossible ServerMsg type");
    }
  }
  /** Open a {@link WsStream}, a stream for executing SQL statements. */
  openStream() {
    return WsStream.open(this);
  }
  /** Cache a SQL text on the server. This requires protocol version 2 or higher. */
  storeSql(sql2) {
    this._ensureVersion(2, "storeSql()");
    const sqlId = this.#sqlIdAlloc.alloc();
    const sqlObj = new Sql(this, sqlId);
    const responseCallback = () => void 0;
    const errorCallback = (e) => sqlObj._setClosed(e);
    const request = { type: "store_sql", sqlId, sql: sql2 };
    this._sendRequest(request, { responseCallback, errorCallback });
    return sqlObj;
  }
  /** @private */
  _closeSql(sqlId) {
    if (this.#closed !== void 0) {
      return;
    }
    const responseCallback = () => this.#sqlIdAlloc.free(sqlId);
    const errorCallback = (e) => this.#setClosed(e);
    const request = { type: "close_sql", sqlId };
    this._sendRequest(request, { responseCallback, errorCallback });
  }
  /** Close the client and the WebSocket. */
  close() {
    this.#setClosed(new ClientError("Client was manually closed"));
  }
  /** True if the client is closed. */
  get closed() {
    return this.#closed !== void 0;
  }
};

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/queue_microtask.js
var _queueMicrotask;
if (typeof queueMicrotask !== "undefined") {
  _queueMicrotask = queueMicrotask;
} else {
  const resolved = Promise.resolve();
  _queueMicrotask = (callback) => {
    resolved.then(callback);
  };
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/byte_queue.js
var ByteQueue = class {
  #array;
  #shiftPos;
  #pushPos;
  constructor(initialCap) {
    this.#array = new Uint8Array(new ArrayBuffer(initialCap));
    this.#shiftPos = 0;
    this.#pushPos = 0;
  }
  get length() {
    return this.#pushPos - this.#shiftPos;
  }
  data() {
    return this.#array.slice(this.#shiftPos, this.#pushPos);
  }
  push(chunk) {
    this.#ensurePush(chunk.byteLength);
    this.#array.set(chunk, this.#pushPos);
    this.#pushPos += chunk.byteLength;
  }
  #ensurePush(pushLength) {
    if (this.#pushPos + pushLength <= this.#array.byteLength) {
      return;
    }
    const filledLength = this.#pushPos - this.#shiftPos;
    if (filledLength + pushLength <= this.#array.byteLength && 2 * this.#pushPos >= this.#array.byteLength) {
      this.#array.copyWithin(0, this.#shiftPos, this.#pushPos);
    } else {
      let newCap = this.#array.byteLength;
      do {
        newCap *= 2;
      } while (filledLength + pushLength > newCap);
      const newArray = new Uint8Array(new ArrayBuffer(newCap));
      newArray.set(this.#array.slice(this.#shiftPos, this.#pushPos), 0);
      this.#array = newArray;
    }
    this.#pushPos = filledLength;
    this.#shiftPos = 0;
  }
  shift(length) {
    this.#shiftPos += length;
  }
};

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/http/json_decode.js
function PipelineRespBody(obj) {
  const baton = stringOpt(obj["baton"]);
  const baseUrl = stringOpt(obj["base_url"]);
  const results = arrayObjectsMap(obj["results"], StreamResult);
  return { baton, baseUrl, results };
}
function StreamResult(obj) {
  const type = string(obj["type"]);
  if (type === "ok") {
    const response = StreamResponse(object(obj["response"]));
    return { type: "ok", response };
  } else if (type === "error") {
    const error = Error2(object(obj["error"]));
    return { type: "error", error };
  } else {
    throw new ProtoError("Unexpected type of StreamResult");
  }
}
function StreamResponse(obj) {
  const type = string(obj["type"]);
  if (type === "close") {
    return { type: "close" };
  } else if (type === "execute") {
    const result = StmtResult(object(obj["result"]));
    return { type: "execute", result };
  } else if (type === "batch") {
    const result = BatchResult(object(obj["result"]));
    return { type: "batch", result };
  } else if (type === "sequence") {
    return { type: "sequence" };
  } else if (type === "describe") {
    const result = DescribeResult(object(obj["result"]));
    return { type: "describe", result };
  } else if (type === "store_sql") {
    return { type: "store_sql" };
  } else if (type === "close_sql") {
    return { type: "close_sql" };
  } else if (type === "get_autocommit") {
    const isAutocommit = boolean(obj["is_autocommit"]);
    return { type: "get_autocommit", isAutocommit };
  } else {
    throw new ProtoError("Unexpected type of StreamResponse");
  }
}
function CursorRespBody(obj) {
  const baton = stringOpt(obj["baton"]);
  const baseUrl = stringOpt(obj["base_url"]);
  return { baton, baseUrl };
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/http/protobuf_decode.js
var PipelineRespBody2 = {
  default() {
    return { baton: void 0, baseUrl: void 0, results: [] };
  },
  1(r, msg) {
    msg.baton = r.string();
  },
  2(r, msg) {
    msg.baseUrl = r.string();
  },
  3(r, msg) {
    msg.results.push(r.message(StreamResult2));
  }
};
var StreamResult2 = {
  default() {
    return { type: "none" };
  },
  1(r) {
    return { type: "ok", response: r.message(StreamResponse2) };
  },
  2(r) {
    return { type: "error", error: r.message(Error3) };
  }
};
var StreamResponse2 = {
  default() {
    return { type: "none" };
  },
  1(r) {
    return { type: "close" };
  },
  2(r) {
    return r.message(ExecuteStreamResp);
  },
  3(r) {
    return r.message(BatchStreamResp);
  },
  4(r) {
    return { type: "sequence" };
  },
  5(r) {
    return r.message(DescribeStreamResp);
  },
  6(r) {
    return { type: "store_sql" };
  },
  7(r) {
    return { type: "close_sql" };
  },
  8(r) {
    return r.message(GetAutocommitStreamResp);
  }
};
var ExecuteStreamResp = {
  default() {
    return { type: "execute", result: StmtResult2.default() };
  },
  1(r, msg) {
    msg.result = r.message(StmtResult2);
  }
};
var BatchStreamResp = {
  default() {
    return { type: "batch", result: BatchResult2.default() };
  },
  1(r, msg) {
    msg.result = r.message(BatchResult2);
  }
};
var DescribeStreamResp = {
  default() {
    return { type: "describe", result: DescribeResult2.default() };
  },
  1(r, msg) {
    msg.result = r.message(DescribeResult2);
  }
};
var GetAutocommitStreamResp = {
  default() {
    return { type: "get_autocommit", isAutocommit: false };
  },
  1(r, msg) {
    msg.isAutocommit = r.bool();
  }
};
var CursorRespBody2 = {
  default() {
    return { baton: void 0, baseUrl: void 0 };
  },
  1(r, msg) {
    msg.baton = r.string();
  },
  2(r, msg) {
    msg.baseUrl = r.string();
  }
};

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/http/cursor.js
var HttpCursor = class extends Cursor {
  #stream;
  #encoding;
  #reader;
  #queue;
  #closed;
  #done;
  /** @private */
  constructor(stream, encoding) {
    super();
    this.#stream = stream;
    this.#encoding = encoding;
    this.#reader = void 0;
    this.#queue = new ByteQueue(16 * 1024);
    this.#closed = void 0;
    this.#done = false;
  }
  async open(response) {
    if (response.body === null) {
      throw new ProtoError("No response body for cursor request");
    }
    this.#reader = response.body[Symbol.asyncIterator]();
    const respBody = await this.#nextItem(CursorRespBody, CursorRespBody2);
    if (respBody === void 0) {
      throw new ProtoError("Empty response to cursor request");
    }
    return respBody;
  }
  /** Fetch the next entry from the cursor. */
  next() {
    return this.#nextItem(CursorEntry, CursorEntry2);
  }
  /** Close the cursor. */
  close() {
    this._setClosed(new ClientError("Cursor was manually closed"));
  }
  /** @private */
  _setClosed(error) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#closed = error;
    this.#stream._cursorClosed(this);
    if (this.#reader !== void 0) {
      this.#reader.return();
    }
  }
  /** True if the cursor is closed. */
  get closed() {
    return this.#closed !== void 0;
  }
  async #nextItem(jsonFun, protobufDef) {
    for (; ; ) {
      if (this.#done) {
        return void 0;
      } else if (this.#closed !== void 0) {
        throw new ClosedError("Cursor is closed", this.#closed);
      }
      if (this.#encoding === "json") {
        const jsonData = this.#parseItemJson();
        if (jsonData !== void 0) {
          const jsonText = new TextDecoder().decode(jsonData);
          const jsonValue = JSON.parse(jsonText);
          return readJsonObject(jsonValue, jsonFun);
        }
      } else if (this.#encoding === "protobuf") {
        const protobufData = this.#parseItemProtobuf();
        if (protobufData !== void 0) {
          return readProtobufMessage(protobufData, protobufDef);
        }
      } else {
        throw impossible(this.#encoding, "Impossible encoding");
      }
      if (this.#reader === void 0) {
        throw new InternalError("Attempted to read from HTTP cursor before it was opened");
      }
      const { value, done } = await this.#reader.next();
      if (done && this.#queue.length === 0) {
        this.#done = true;
      } else if (done) {
        throw new ProtoError("Unexpected end of cursor stream");
      } else {
        this.#queue.push(value);
      }
    }
  }
  #parseItemJson() {
    const data = this.#queue.data();
    const newlineByte = 10;
    const newlinePos = data.indexOf(newlineByte);
    if (newlinePos < 0) {
      return void 0;
    }
    const jsonData = data.slice(0, newlinePos);
    this.#queue.shift(newlinePos + 1);
    return jsonData;
  }
  #parseItemProtobuf() {
    const data = this.#queue.data();
    let varintValue = 0;
    let varintLength = 0;
    for (; ; ) {
      if (varintLength >= data.byteLength) {
        return void 0;
      }
      const byte = data[varintLength];
      varintValue |= (byte & 127) << 7 * varintLength;
      varintLength += 1;
      if (!(byte & 128)) {
        break;
      }
    }
    if (data.byteLength < varintLength + varintValue) {
      return void 0;
    }
    const protobufData = data.slice(varintLength, varintLength + varintValue);
    this.#queue.shift(varintLength + varintValue);
    return protobufData;
  }
};

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/http/json_encode.js
function PipelineReqBody(w, msg) {
  if (msg.baton !== void 0) {
    w.string("baton", msg.baton);
  }
  w.arrayObjects("requests", msg.requests, StreamRequest);
}
function StreamRequest(w, msg) {
  w.stringRaw("type", msg.type);
  if (msg.type === "close") {
  } else if (msg.type === "execute") {
    w.object("stmt", msg.stmt, Stmt2);
  } else if (msg.type === "batch") {
    w.object("batch", msg.batch, Batch2);
  } else if (msg.type === "sequence") {
    if (msg.sql !== void 0) {
      w.string("sql", msg.sql);
    }
    if (msg.sqlId !== void 0) {
      w.number("sql_id", msg.sqlId);
    }
  } else if (msg.type === "describe") {
    if (msg.sql !== void 0) {
      w.string("sql", msg.sql);
    }
    if (msg.sqlId !== void 0) {
      w.number("sql_id", msg.sqlId);
    }
  } else if (msg.type === "store_sql") {
    w.number("sql_id", msg.sqlId);
    w.string("sql", msg.sql);
  } else if (msg.type === "close_sql") {
    w.number("sql_id", msg.sqlId);
  } else if (msg.type === "get_autocommit") {
  } else {
    throw impossible(msg, "Impossible type of StreamRequest");
  }
}
function CursorReqBody(w, msg) {
  if (msg.baton !== void 0) {
    w.string("baton", msg.baton);
  }
  w.object("batch", msg.batch, Batch2);
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/http/protobuf_encode.js
function PipelineReqBody2(w, msg) {
  if (msg.baton !== void 0) {
    w.string(1, msg.baton);
  }
  for (const req of msg.requests) {
    w.message(2, req, StreamRequest2);
  }
}
function StreamRequest2(w, msg) {
  if (msg.type === "close") {
    w.message(1, msg, CloseStreamReq2);
  } else if (msg.type === "execute") {
    w.message(2, msg, ExecuteStreamReq);
  } else if (msg.type === "batch") {
    w.message(3, msg, BatchStreamReq);
  } else if (msg.type === "sequence") {
    w.message(4, msg, SequenceStreamReq);
  } else if (msg.type === "describe") {
    w.message(5, msg, DescribeStreamReq);
  } else if (msg.type === "store_sql") {
    w.message(6, msg, StoreSqlStreamReq);
  } else if (msg.type === "close_sql") {
    w.message(7, msg, CloseSqlStreamReq);
  } else if (msg.type === "get_autocommit") {
    w.message(8, msg, GetAutocommitStreamReq);
  } else {
    throw impossible(msg, "Impossible type of StreamRequest");
  }
}
function CloseStreamReq2(_w, _msg) {
}
function ExecuteStreamReq(w, msg) {
  w.message(1, msg.stmt, Stmt3);
}
function BatchStreamReq(w, msg) {
  w.message(1, msg.batch, Batch3);
}
function SequenceStreamReq(w, msg) {
  if (msg.sql !== void 0) {
    w.string(1, msg.sql);
  }
  if (msg.sqlId !== void 0) {
    w.int32(2, msg.sqlId);
  }
}
function DescribeStreamReq(w, msg) {
  if (msg.sql !== void 0) {
    w.string(1, msg.sql);
  }
  if (msg.sqlId !== void 0) {
    w.int32(2, msg.sqlId);
  }
}
function StoreSqlStreamReq(w, msg) {
  w.int32(1, msg.sqlId);
  w.string(2, msg.sql);
}
function CloseSqlStreamReq(w, msg) {
  w.int32(1, msg.sqlId);
}
function GetAutocommitStreamReq(_w, _msg) {
}
function CursorReqBody2(w, msg) {
  if (msg.baton !== void 0) {
    w.string(1, msg.baton);
  }
  w.message(2, msg.batch, Batch3);
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/http/stream.js
var HttpStream = class extends Stream {
  #client;
  #baseUrl;
  #jwt;
  #fetch;
  #remoteEncryptionKey;
  #baton;
  #queue;
  #flushing;
  #cursor;
  #closing;
  #closeQueued;
  #closed;
  #sqlIdAlloc;
  /** @private */
  constructor(client, baseUrl, jwt, customFetch, remoteEncryptionKey) {
    super(client.intMode);
    this.#client = client;
    this.#baseUrl = baseUrl.toString();
    this.#jwt = jwt;
    this.#fetch = customFetch;
    this.#remoteEncryptionKey = remoteEncryptionKey;
    this.#baton = void 0;
    this.#queue = new Queue();
    this.#flushing = false;
    this.#closing = false;
    this.#closeQueued = false;
    this.#closed = void 0;
    this.#sqlIdAlloc = new IdAlloc();
  }
  /** Get the {@link HttpClient} object that this stream belongs to. */
  client() {
    return this.#client;
  }
  /** @private */
  _sqlOwner() {
    return this;
  }
  /** Cache a SQL text on the server. */
  storeSql(sql2) {
    const sqlId = this.#sqlIdAlloc.alloc();
    this.#sendStreamRequest({ type: "store_sql", sqlId, sql: sql2 }).then(() => void 0, (error) => this._setClosed(error));
    return new Sql(this, sqlId);
  }
  /** @private */
  _closeSql(sqlId) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#sendStreamRequest({ type: "close_sql", sqlId }).then(() => this.#sqlIdAlloc.free(sqlId), (error) => this._setClosed(error));
  }
  /** @private */
  _execute(stmt) {
    return this.#sendStreamRequest({ type: "execute", stmt }).then((response) => {
      return response.result;
    });
  }
  /** @private */
  _batch(batch) {
    return this.#sendStreamRequest({ type: "batch", batch }).then((response) => {
      return response.result;
    });
  }
  /** @private */
  _describe(protoSql) {
    return this.#sendStreamRequest({
      type: "describe",
      sql: protoSql.sql,
      sqlId: protoSql.sqlId
    }).then((response) => {
      return response.result;
    });
  }
  /** @private */
  _sequence(protoSql) {
    return this.#sendStreamRequest({
      type: "sequence",
      sql: protoSql.sql,
      sqlId: protoSql.sqlId
    }).then((_response) => {
      return void 0;
    });
  }
  /** Check whether the SQL connection underlying this stream is in autocommit state (i.e., outside of an
   * explicit transaction). This requires protocol version 3 or higher.
   */
  getAutocommit() {
    this.#client._ensureVersion(3, "getAutocommit()");
    return this.#sendStreamRequest({
      type: "get_autocommit"
    }).then((response) => {
      return response.isAutocommit;
    });
  }
  #sendStreamRequest(request) {
    return new Promise((responseCallback, errorCallback) => {
      this.#pushToQueue({ type: "pipeline", request, responseCallback, errorCallback });
    });
  }
  /** @private */
  _openCursor(batch) {
    return new Promise((cursorCallback, errorCallback) => {
      this.#pushToQueue({ type: "cursor", batch, cursorCallback, errorCallback });
    });
  }
  /** @private */
  _cursorClosed(cursor) {
    if (cursor !== this.#cursor) {
      throw new InternalError("Cursor was closed, but it was not associated with the stream");
    }
    this.#cursor = void 0;
    _queueMicrotask(() => this.#flushQueue());
  }
  /** Immediately close the stream. */
  close() {
    this._setClosed(new ClientError("Stream was manually closed"));
  }
  /** Gracefully close the stream. */
  closeGracefully() {
    this.#closing = true;
    _queueMicrotask(() => this.#flushQueue());
  }
  /** True if the stream is closed. */
  get closed() {
    return this.#closed !== void 0 || this.#closing;
  }
  /** @private */
  _setClosed(error) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#closed = error;
    if (this.#cursor !== void 0) {
      this.#cursor._setClosed(error);
    }
    this.#client._streamClosed(this);
    for (; ; ) {
      const entry = this.#queue.shift();
      if (entry !== void 0) {
        entry.errorCallback(error);
      } else {
        break;
      }
    }
    if ((this.#baton !== void 0 || this.#flushing) && !this.#closeQueued) {
      this.#queue.push({
        type: "pipeline",
        request: { type: "close" },
        responseCallback: () => void 0,
        errorCallback: () => void 0
      });
      this.#closeQueued = true;
      _queueMicrotask(() => this.#flushQueue());
    }
  }
  #pushToQueue(entry) {
    if (this.#closed !== void 0) {
      throw new ClosedError("Stream is closed", this.#closed);
    } else if (this.#closing) {
      throw new ClosedError("Stream is closing", void 0);
    } else {
      this.#queue.push(entry);
      _queueMicrotask(() => this.#flushQueue());
    }
  }
  #flushQueue() {
    if (this.#flushing || this.#cursor !== void 0) {
      return;
    }
    if (this.#closing && this.#queue.length === 0) {
      this._setClosed(new ClientError("Stream was gracefully closed"));
      return;
    }
    const endpoint = this.#client._endpoint;
    if (endpoint === void 0) {
      this.#client._endpointPromise.then(() => this.#flushQueue(), (error) => this._setClosed(error));
      return;
    }
    const firstEntry = this.#queue.shift();
    if (firstEntry === void 0) {
      return;
    } else if (firstEntry.type === "pipeline") {
      const pipeline = [firstEntry];
      for (; ; ) {
        const entry = this.#queue.first();
        if (entry !== void 0 && entry.type === "pipeline") {
          pipeline.push(entry);
          this.#queue.shift();
        } else if (entry === void 0 && this.#closing && !this.#closeQueued) {
          pipeline.push({
            type: "pipeline",
            request: { type: "close" },
            responseCallback: () => void 0,
            errorCallback: () => void 0
          });
          this.#closeQueued = true;
          break;
        } else {
          break;
        }
      }
      this.#flushPipeline(endpoint, pipeline);
    } else if (firstEntry.type === "cursor") {
      this.#flushCursor(endpoint, firstEntry);
    } else {
      throw impossible(firstEntry, "Impossible type of QueueEntry");
    }
  }
  #flushPipeline(endpoint, pipeline) {
    this.#flush(() => this.#createPipelineRequest(pipeline, endpoint), (resp) => decodePipelineResponse(resp, endpoint.encoding), (respBody) => respBody.baton, (respBody) => respBody.baseUrl, (respBody) => handlePipelineResponse(pipeline, respBody), (error) => pipeline.forEach((entry) => entry.errorCallback(error)));
  }
  #flushCursor(endpoint, entry) {
    const cursor = new HttpCursor(this, endpoint.encoding);
    this.#cursor = cursor;
    this.#flush(() => this.#createCursorRequest(entry, endpoint), (resp) => cursor.open(resp), (respBody) => respBody.baton, (respBody) => respBody.baseUrl, (_respBody) => entry.cursorCallback(cursor), (error) => entry.errorCallback(error));
  }
  #flush(createRequest, decodeResponse, getBaton, getBaseUrl, handleResponse, handleError) {
    let promise;
    try {
      const request = createRequest();
      const fetch2 = this.#fetch;
      promise = fetch2(request);
    } catch (error) {
      promise = Promise.reject(error);
    }
    this.#flushing = true;
    promise.then((resp) => {
      if (!resp.ok) {
        return errorFromResponse(resp).then((error) => {
          throw error;
        });
      }
      return decodeResponse(resp);
    }).then((r) => {
      this.#baton = getBaton(r);
      this.#baseUrl = getBaseUrl(r) ?? this.#baseUrl;
      handleResponse(r);
    }).catch((error) => {
      this._setClosed(error);
      handleError(error);
    }).finally(() => {
      this.#flushing = false;
      this.#flushQueue();
    });
  }
  #createPipelineRequest(pipeline, endpoint) {
    return this.#createRequest(new URL(endpoint.pipelinePath, this.#baseUrl), {
      baton: this.#baton,
      requests: pipeline.map((entry) => entry.request)
    }, endpoint.encoding, PipelineReqBody, PipelineReqBody2);
  }
  #createCursorRequest(entry, endpoint) {
    if (endpoint.cursorPath === void 0) {
      throw new ProtocolVersionError(`Cursors are supported only on protocol version 3 and higher, but the HTTP server only supports version ${endpoint.version}.`);
    }
    return this.#createRequest(new URL(endpoint.cursorPath, this.#baseUrl), {
      baton: this.#baton,
      batch: entry.batch
    }, endpoint.encoding, CursorReqBody, CursorReqBody2);
  }
  #createRequest(url, reqBody, encoding, jsonFun, protobufFun) {
    let bodyData;
    let contentType;
    if (encoding === "json") {
      bodyData = writeJsonObject(reqBody, jsonFun);
      contentType = "application/json";
    } else if (encoding === "protobuf") {
      bodyData = writeProtobufMessage(reqBody, protobufFun);
      contentType = "application/x-protobuf";
    } else {
      throw impossible(encoding, "Impossible encoding");
    }
    const headers = new Headers();
    headers.set("content-type", contentType);
    if (this.#jwt !== void 0) {
      headers.set("authorization", `Bearer ${this.#jwt}`);
    }
    if (this.#remoteEncryptionKey !== void 0) {
      headers.set("x-turso-encryption-key", this.#remoteEncryptionKey);
    }
    return new Request(url.toString(), { method: "POST", headers, body: bodyData });
  }
};
function handlePipelineResponse(pipeline, respBody) {
  if (respBody.results.length !== pipeline.length) {
    throw new ProtoError("Server returned unexpected number of pipeline results");
  }
  for (let i = 0; i < pipeline.length; ++i) {
    const result = respBody.results[i];
    const entry = pipeline[i];
    if (result.type === "ok") {
      if (result.response.type !== entry.request.type) {
        throw new ProtoError("Received unexpected type of response");
      }
      entry.responseCallback(result.response);
    } else if (result.type === "error") {
      entry.errorCallback(errorFromProto(result.error));
    } else if (result.type === "none") {
      throw new ProtoError("Received unrecognized type of StreamResult");
    } else {
      throw impossible(result, "Received impossible type of StreamResult");
    }
  }
}
async function decodePipelineResponse(resp, encoding) {
  if (encoding === "json") {
    const respJson = await resp.json();
    return readJsonObject(respJson, PipelineRespBody);
  }
  if (encoding === "protobuf") {
    const respData = await resp.arrayBuffer();
    return readProtobufMessage(new Uint8Array(respData), PipelineRespBody2);
  }
  await resp.body?.cancel();
  throw impossible(encoding, "Impossible encoding");
}
async function errorFromResponse(resp) {
  const respType = resp.headers.get("content-type") ?? "text/plain";
  let message = `Server returned HTTP status ${resp.status}`;
  if (respType === "application/json") {
    const respBody = await resp.json();
    if ("message" in respBody) {
      return errorFromProto(respBody);
    }
    return new HttpServerError(message, resp.status);
  }
  if (respType === "text/plain") {
    const respBody = (await resp.text()).trim();
    if (respBody !== "") {
      message += `: ${respBody}`;
    }
    return new HttpServerError(message, resp.status);
  }
  await resp.body?.cancel();
  return new HttpServerError(message, resp.status);
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/http/client.js
var checkEndpoints = [
  {
    versionPath: "v3-protobuf",
    pipelinePath: "v3-protobuf/pipeline",
    cursorPath: "v3-protobuf/cursor",
    version: 3,
    encoding: "protobuf"
  }
  /*
  {
      versionPath: "v3",
      pipelinePath: "v3/pipeline",
      cursorPath: "v3/cursor",
      version: 3,
      encoding: "json",
  },
  */
];
var fallbackEndpoint = {
  versionPath: "v2",
  pipelinePath: "v2/pipeline",
  cursorPath: void 0,
  version: 2,
  encoding: "json"
};
var HttpClient = class extends Client {
  #url;
  #jwt;
  #fetch;
  #remoteEncryptionKey;
  #closed;
  #streams;
  /** @private */
  _endpointPromise;
  /** @private */
  _endpoint;
  /** @private */
  constructor(url, jwt, customFetch, remoteEncryptionKey, protocolVersion = 2) {
    super();
    this.#url = url;
    this.#jwt = jwt;
    this.#fetch = customFetch ?? globalThis.fetch;
    this.#remoteEncryptionKey = remoteEncryptionKey;
    this.#closed = void 0;
    this.#streams = /* @__PURE__ */ new Set();
    if (protocolVersion == 3) {
      this._endpointPromise = findEndpoint(this.#fetch, this.#url);
      this._endpointPromise.then((endpoint) => this._endpoint = endpoint, (error) => this.#setClosed(error));
    } else {
      this._endpointPromise = Promise.resolve(fallbackEndpoint);
      this._endpointPromise.then((endpoint) => this._endpoint = endpoint, (error) => this.#setClosed(error));
    }
  }
  /** Get the protocol version supported by the server. */
  async getVersion() {
    if (this._endpoint !== void 0) {
      return this._endpoint.version;
    }
    return (await this._endpointPromise).version;
  }
  // Make sure that the negotiated version is at least `minVersion`.
  /** @private */
  _ensureVersion(minVersion, feature) {
    if (minVersion <= fallbackEndpoint.version) {
      return;
    } else if (this._endpoint === void 0) {
      throw new ProtocolVersionError(`${feature} is supported only on protocol version ${minVersion} and higher, but the version supported by the HTTP server is not yet known. Use Client.getVersion() to wait until the version is available.`);
    } else if (this._endpoint.version < minVersion) {
      throw new ProtocolVersionError(`${feature} is supported only on protocol version ${minVersion} and higher, but the HTTP server only supports version ${this._endpoint.version}.`);
    }
  }
  /** Open a {@link HttpStream}, a stream for executing SQL statements. */
  openStream() {
    if (this.#closed !== void 0) {
      throw new ClosedError("Client is closed", this.#closed);
    }
    const stream = new HttpStream(this, this.#url, this.#jwt, this.#fetch, this.#remoteEncryptionKey);
    this.#streams.add(stream);
    return stream;
  }
  /** @private */
  _streamClosed(stream) {
    this.#streams.delete(stream);
  }
  /** Close the client and all its streams. */
  close() {
    this.#setClosed(new ClientError("Client was manually closed"));
  }
  /** True if the client is closed. */
  get closed() {
    return this.#closed !== void 0;
  }
  #setClosed(error) {
    if (this.#closed !== void 0) {
      return;
    }
    this.#closed = error;
    for (const stream of Array.from(this.#streams)) {
      stream._setClosed(new ClosedError("Client was closed", error));
    }
  }
};
async function findEndpoint(customFetch, clientUrl) {
  const fetch2 = customFetch;
  for (const endpoint of checkEndpoints) {
    const url = new URL(endpoint.versionPath, clientUrl);
    const request = new Request(url.toString(), { method: "GET" });
    const response = await fetch2(request);
    await response.arrayBuffer();
    if (response.ok) {
      return endpoint;
    }
  }
  return fallbackEndpoint;
}

// ../../node_modules/.pnpm/@libsql+hrana-client@0.10.0/node_modules/@libsql/hrana-client/lib-esm/index.js
function openWs(url, jwt, protocolVersion = 2) {
  if (typeof import_websocket.default === "undefined") {
    throw new WebSocketUnsupportedError("WebSockets are not supported in this environment");
  }
  var subprotocols = void 0;
  if (protocolVersion == 3) {
    subprotocols = Array.from(subprotocolsV3.keys());
  } else {
    subprotocols = Array.from(subprotocolsV2.keys());
  }
  const socket = new import_websocket.default(url, subprotocols);
  return new WsClient(socket, jwt);
}
function openHttp(url, jwt, customFetch, remoteEncryptionKey, protocolVersion = 2) {
  return new HttpClient(url instanceof URL ? url : new URL(url), jwt, customFetch, remoteEncryptionKey, protocolVersion);
}

// ../../node_modules/.pnpm/@libsql+client@0.17.3/node_modules/@libsql/client/lib-esm/hrana.js
var HranaTransaction = class {
  #mode;
  #version;
  // Promise that is resolved when the BEGIN statement completes, or `undefined` if we haven't executed the
  // BEGIN statement yet.
  #started;
  /** @private */
  constructor(mode, version2) {
    this.#mode = mode;
    this.#version = version2;
    this.#started = void 0;
  }
  execute(stmt) {
    return this.batch([stmt]).then((results) => results[0]);
  }
  async batch(stmts) {
    const stream = this._getStream();
    if (stream.closed) {
      throw new LibsqlError("Cannot execute statements because the transaction is closed", "TRANSACTION_CLOSED");
    }
    try {
      const hranaStmts = stmts.map(stmtToHrana);
      let rowsPromises;
      if (this.#started === void 0) {
        this._getSqlCache().apply(hranaStmts);
        const batch = stream.batch(this.#version >= 3);
        const beginStep = batch.step();
        const beginPromise = beginStep.run(transactionModeToBegin(this.#mode));
        let lastStep = beginStep;
        rowsPromises = hranaStmts.map((hranaStmt) => {
          const stmtStep = batch.step().condition(BatchCond.ok(lastStep));
          if (this.#version >= 3) {
            stmtStep.condition(BatchCond.not(BatchCond.isAutocommit(batch)));
          }
          const rowsPromise = stmtStep.query(hranaStmt);
          rowsPromise.catch(() => void 0);
          lastStep = stmtStep;
          return rowsPromise;
        });
        this.#started = batch.execute().then(() => beginPromise).then(() => void 0);
        try {
          await this.#started;
        } catch (e) {
          this.close();
          throw e;
        }
      } else {
        if (this.#version < 3) {
          await this.#started;
        } else {
        }
        this._getSqlCache().apply(hranaStmts);
        const batch = stream.batch(this.#version >= 3);
        let lastStep = void 0;
        rowsPromises = hranaStmts.map((hranaStmt) => {
          const stmtStep = batch.step();
          if (lastStep !== void 0) {
            stmtStep.condition(BatchCond.ok(lastStep));
          }
          if (this.#version >= 3) {
            stmtStep.condition(BatchCond.not(BatchCond.isAutocommit(batch)));
          }
          const rowsPromise = stmtStep.query(hranaStmt);
          rowsPromise.catch(() => void 0);
          lastStep = stmtStep;
          return rowsPromise;
        });
        await batch.execute();
      }
      const resultSets = [];
      for (let i = 0; i < rowsPromises.length; i++) {
        try {
          const rows = await rowsPromises[i];
          if (rows === void 0) {
            throw new LibsqlBatchError("Statement in a transaction was not executed, probably because the transaction has been rolled back", i, "TRANSACTION_CLOSED");
          }
          resultSets.push(resultSetFromHrana(rows));
        } catch (e) {
          if (e instanceof LibsqlBatchError) {
            throw e;
          }
          const mappedError = mapHranaError(e);
          if (mappedError instanceof LibsqlError) {
            throw new LibsqlBatchError(mappedError.message, i, mappedError.code, mappedError.extendedCode, mappedError.rawCode, mappedError.cause instanceof Error ? mappedError.cause : void 0);
          }
          throw mappedError;
        }
      }
      return resultSets;
    } catch (e) {
      throw mapHranaError(e);
    }
  }
  async executeMultiple(sql2) {
    const stream = this._getStream();
    if (stream.closed) {
      throw new LibsqlError("Cannot execute statements because the transaction is closed", "TRANSACTION_CLOSED");
    }
    try {
      if (this.#started === void 0) {
        this.#started = stream.run(transactionModeToBegin(this.#mode)).then(() => void 0);
        try {
          await this.#started;
        } catch (e) {
          this.close();
          throw e;
        }
      } else {
        await this.#started;
      }
      await stream.sequence(sql2);
    } catch (e) {
      throw mapHranaError(e);
    }
  }
  async rollback() {
    try {
      const stream = this._getStream();
      if (stream.closed) {
        return;
      }
      if (this.#started !== void 0) {
      } else {
        return;
      }
      const promise = stream.run("ROLLBACK").catch((e) => {
        throw mapHranaError(e);
      });
      stream.closeGracefully();
      await promise;
    } catch (e) {
      throw mapHranaError(e);
    } finally {
      this.close();
    }
  }
  async commit() {
    try {
      const stream = this._getStream();
      if (stream.closed) {
        throw new LibsqlError("Cannot commit the transaction because it is already closed", "TRANSACTION_CLOSED");
      }
      if (this.#started !== void 0) {
        await this.#started;
      } else {
        return;
      }
      const promise = stream.run("COMMIT").catch((e) => {
        throw mapHranaError(e);
      });
      stream.closeGracefully();
      await promise;
    } catch (e) {
      throw mapHranaError(e);
    } finally {
      this.close();
    }
  }
};
async function executeHranaBatch(mode, version2, batch, hranaStmts, disableForeignKeys = false) {
  if (disableForeignKeys) {
    batch.step().run("PRAGMA foreign_keys=off");
  }
  const beginStep = batch.step();
  const beginPromise = beginStep.run(transactionModeToBegin(mode));
  let lastStep = beginStep;
  const stmtPromises = hranaStmts.map((hranaStmt) => {
    const stmtStep = batch.step().condition(BatchCond.ok(lastStep));
    if (version2 >= 3) {
      stmtStep.condition(BatchCond.not(BatchCond.isAutocommit(batch)));
    }
    const stmtPromise = stmtStep.query(hranaStmt);
    lastStep = stmtStep;
    return stmtPromise;
  });
  const commitStep = batch.step().condition(BatchCond.ok(lastStep));
  if (version2 >= 3) {
    commitStep.condition(BatchCond.not(BatchCond.isAutocommit(batch)));
  }
  const commitPromise = commitStep.run("COMMIT");
  const rollbackStep = batch.step().condition(BatchCond.not(BatchCond.ok(commitStep)));
  rollbackStep.run("ROLLBACK").catch((_) => void 0);
  if (disableForeignKeys) {
    batch.step().run("PRAGMA foreign_keys=on");
  }
  await batch.execute();
  const resultSets = [];
  await beginPromise;
  for (let i = 0; i < stmtPromises.length; i++) {
    try {
      const hranaRows = await stmtPromises[i];
      if (hranaRows === void 0) {
        throw new LibsqlBatchError("Statement in a batch was not executed, probably because the transaction has been rolled back", i, "TRANSACTION_CLOSED");
      }
      resultSets.push(resultSetFromHrana(hranaRows));
    } catch (e) {
      if (e instanceof LibsqlBatchError) {
        throw e;
      }
      const mappedError = mapHranaError(e);
      if (mappedError instanceof LibsqlError) {
        throw new LibsqlBatchError(mappedError.message, i, mappedError.code, mappedError.extendedCode, mappedError.rawCode, mappedError.cause instanceof Error ? mappedError.cause : void 0);
      }
      throw mappedError;
    }
  }
  await commitPromise;
  return resultSets;
}
function stmtToHrana(stmt) {
  let sql2;
  let args;
  if (Array.isArray(stmt)) {
    [sql2, args] = stmt;
  } else if (typeof stmt === "string") {
    sql2 = stmt;
  } else {
    sql2 = stmt.sql;
    args = stmt.args;
  }
  const hranaStmt = new Stmt(sql2);
  if (args) {
    if (Array.isArray(args)) {
      hranaStmt.bindIndexes(args);
    } else {
      for (const [key, value] of Object.entries(args)) {
        hranaStmt.bindName(key, value);
      }
    }
  }
  return hranaStmt;
}
function resultSetFromHrana(hranaRows) {
  const columns = hranaRows.columnNames.map((c) => c ?? "");
  const columnTypes = hranaRows.columnDecltypes.map((c) => c ?? "");
  const rows = hranaRows.rows;
  const rowsAffected = hranaRows.affectedRowCount;
  const lastInsertRowid = hranaRows.lastInsertRowid !== void 0 ? hranaRows.lastInsertRowid : void 0;
  return new ResultSetImpl(columns, columnTypes, rows, rowsAffected, lastInsertRowid);
}
function mapHranaError(e) {
  if (e instanceof ClientError) {
    const code = mapHranaErrorCode(e);
    return new LibsqlError(e.message, code, void 0, void 0, e);
  }
  return e;
}
function mapHranaErrorCode(e) {
  if (e instanceof ResponseError && e.code !== void 0) {
    return e.code;
  } else if (e instanceof ProtoError) {
    return "HRANA_PROTO_ERROR";
  } else if (e instanceof ClosedError) {
    return e.cause instanceof ClientError ? mapHranaErrorCode(e.cause) : "HRANA_CLOSED_ERROR";
  } else if (e instanceof WebSocketError) {
    return "HRANA_WEBSOCKET_ERROR";
  } else if (e instanceof HttpServerError) {
    return "SERVER_ERROR";
  } else if (e instanceof ProtocolVersionError) {
    return "PROTOCOL_VERSION_ERROR";
  } else if (e instanceof InternalError) {
    return "INTERNAL_ERROR";
  } else {
    return "UNKNOWN";
  }
}

// ../../node_modules/.pnpm/@libsql+client@0.17.3/node_modules/@libsql/client/lib-esm/sql_cache.js
var SqlCache = class {
  #owner;
  #sqls;
  capacity;
  constructor(owner, capacity) {
    this.#owner = owner;
    this.#sqls = new Lru();
    this.capacity = capacity;
  }
  // Replaces SQL strings with cached `hrana.Sql` objects in the statements in `hranaStmts`. After this
  // function returns, we guarantee that all `hranaStmts` refer to valid (not closed) `hrana.Sql` objects,
  // but _we may invalidate any other `hrana.Sql` objects_ (by closing them, thus removing them from the
  // server).
  //
  // In practice, this means that after calling this function, you can use the statements only up to the
  // first `await`, because concurrent code may also use the cache and invalidate those statements.
  apply(hranaStmts) {
    if (this.capacity <= 0) {
      return;
    }
    const usedSqlObjs = /* @__PURE__ */ new Set();
    for (const hranaStmt of hranaStmts) {
      if (typeof hranaStmt.sql !== "string") {
        continue;
      }
      const sqlText = hranaStmt.sql;
      if (sqlText.length >= 5e3) {
        continue;
      }
      let sqlObj = this.#sqls.get(sqlText);
      if (sqlObj === void 0) {
        while (this.#sqls.size + 1 > this.capacity) {
          const [evictSqlText, evictSqlObj] = this.#sqls.peekLru();
          if (usedSqlObjs.has(evictSqlObj)) {
            break;
          }
          evictSqlObj.close();
          this.#sqls.delete(evictSqlText);
        }
        if (this.#sqls.size + 1 <= this.capacity) {
          sqlObj = this.#owner.storeSql(sqlText);
          this.#sqls.set(sqlText, sqlObj);
        }
      }
      if (sqlObj !== void 0) {
        hranaStmt.sql = sqlObj;
        usedSqlObjs.add(sqlObj);
      }
    }
  }
};
var Lru = class {
  // This maps keys to the cache values. The entries are ordered by their last use (entires that were used
  // most recently are at the end).
  #cache;
  constructor() {
    this.#cache = /* @__PURE__ */ new Map();
  }
  get(key) {
    const value = this.#cache.get(key);
    if (value !== void 0) {
      this.#cache.delete(key);
      this.#cache.set(key, value);
    }
    return value;
  }
  set(key, value) {
    this.#cache.set(key, value);
  }
  peekLru() {
    for (const entry of this.#cache.entries()) {
      return entry;
    }
    return void 0;
  }
  delete(key) {
    this.#cache.delete(key);
  }
  get size() {
    return this.#cache.size;
  }
};

// ../../node_modules/.pnpm/@libsql+client@0.17.3/node_modules/@libsql/client/lib-esm/ws.js
var import_promise_limit = __toESM(require_promise_limit(), 1);
function _createClient2(config2) {
  if (config2.scheme !== "wss" && config2.scheme !== "ws") {
    throw new LibsqlError(`The WebSocket client supports only "libsql:", "wss:" and "ws:" URLs, got ${JSON.stringify(config2.scheme + ":")}. For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
  }
  if (config2.encryptionKey !== void 0) {
    throw new LibsqlError("Encryption key is not supported by the remote client.", "ENCRYPTION_KEY_NOT_SUPPORTED");
  }
  if (config2.scheme === "ws" && config2.tls) {
    throw new LibsqlError(`A "ws:" URL cannot opt into TLS by using ?tls=1`, "URL_INVALID");
  } else if (config2.scheme === "wss" && !config2.tls) {
    throw new LibsqlError(`A "wss:" URL cannot opt out of TLS by using ?tls=0`, "URL_INVALID");
  }
  const url = encodeBaseUrl(config2.scheme, config2.authority, config2.path);
  let client;
  try {
    client = openWs(url, config2.authToken);
  } catch (e) {
    if (e instanceof WebSocketUnsupportedError) {
      const suggestedScheme = config2.scheme === "wss" ? "https" : "http";
      const suggestedUrl = encodeBaseUrl(suggestedScheme, config2.authority, config2.path);
      throw new LibsqlError(`This environment does not support WebSockets, please switch to the HTTP client by using a "${suggestedScheme}:" URL (${JSON.stringify(suggestedUrl)}). For more information, please read ${supportedUrlLink}`, "WEBSOCKETS_NOT_SUPPORTED");
    }
    throw mapHranaError(e);
  }
  return new WsClient2(client, url, config2.authToken, config2.intMode, config2.concurrency);
}
var maxConnAgeMillis = 60 * 1e3;
var sqlCacheCapacity = 100;
var WsClient2 = class {
  #url;
  #authToken;
  #intMode;
  // State of the current connection. The `hrana.WsClient` inside may be closed at any moment due to an
  // asynchronous error.
  #connState;
  // If defined, this is a connection that will be used in the future, once it is ready.
  #futureConnState;
  closed;
  protocol;
  #isSchemaDatabase;
  #promiseLimitFunction;
  /** @private */
  constructor(client, url, authToken, intMode, concurrency) {
    this.#url = url;
    this.#authToken = authToken;
    this.#intMode = intMode;
    this.#connState = this.#openConn(client);
    this.#futureConnState = void 0;
    this.closed = false;
    this.protocol = "ws";
    this.#promiseLimitFunction = (0, import_promise_limit.default)(concurrency);
  }
  async limit(fn) {
    return this.#promiseLimitFunction(fn);
  }
  async execute(stmtOrSql, args) {
    let stmt;
    if (typeof stmtOrSql === "string") {
      stmt = {
        sql: stmtOrSql,
        args: args || []
      };
    } else {
      stmt = stmtOrSql;
    }
    return this.limit(async () => {
      const streamState = await this.#openStream();
      try {
        const hranaStmt = stmtToHrana(stmt);
        streamState.conn.sqlCache.apply([hranaStmt]);
        const hranaRowsPromise = streamState.stream.query(hranaStmt);
        streamState.stream.closeGracefully();
        const hranaRowsResult = await hranaRowsPromise;
        return resultSetFromHrana(hranaRowsResult);
      } catch (e) {
        throw mapHranaError(e);
      } finally {
        this._closeStream(streamState);
      }
    });
  }
  async batch(stmts, mode = "deferred") {
    return this.limit(async () => {
      const streamState = await this.#openStream();
      try {
        const normalizedStmts = stmts.map((stmt) => {
          if (Array.isArray(stmt)) {
            return {
              sql: stmt[0],
              args: stmt[1] || []
            };
          }
          return stmt;
        });
        const hranaStmts = normalizedStmts.map(stmtToHrana);
        const version2 = await streamState.conn.client.getVersion();
        streamState.conn.sqlCache.apply(hranaStmts);
        const batch = streamState.stream.batch(version2 >= 3);
        const resultsPromise = executeHranaBatch(mode, version2, batch, hranaStmts);
        const results = await resultsPromise;
        return results;
      } catch (e) {
        throw mapHranaError(e);
      } finally {
        this._closeStream(streamState);
      }
    });
  }
  async migrate(stmts) {
    return this.limit(async () => {
      const streamState = await this.#openStream();
      try {
        const hranaStmts = stmts.map(stmtToHrana);
        const version2 = await streamState.conn.client.getVersion();
        const batch = streamState.stream.batch(version2 >= 3);
        const resultsPromise = executeHranaBatch("deferred", version2, batch, hranaStmts, true);
        const results = await resultsPromise;
        return results;
      } catch (e) {
        throw mapHranaError(e);
      } finally {
        this._closeStream(streamState);
      }
    });
  }
  async transaction(mode = "write") {
    return this.limit(async () => {
      const streamState = await this.#openStream();
      try {
        const version2 = await streamState.conn.client.getVersion();
        return new WsTransaction(this, streamState, mode, version2);
      } catch (e) {
        this._closeStream(streamState);
        throw mapHranaError(e);
      }
    });
  }
  async executeMultiple(sql2) {
    return this.limit(async () => {
      const streamState = await this.#openStream();
      try {
        const promise = streamState.stream.sequence(sql2);
        streamState.stream.closeGracefully();
        await promise;
      } catch (e) {
        throw mapHranaError(e);
      } finally {
        this._closeStream(streamState);
      }
    });
  }
  sync() {
    throw new LibsqlError("sync not supported in ws mode", "SYNC_NOT_SUPPORTED");
  }
  async #openStream() {
    if (this.closed) {
      throw new LibsqlError("The client is closed", "CLIENT_CLOSED");
    }
    const now = /* @__PURE__ */ new Date();
    const ageMillis = now.valueOf() - this.#connState.openTime.valueOf();
    if (ageMillis > maxConnAgeMillis && this.#futureConnState === void 0) {
      const futureConnState = this.#openConn();
      this.#futureConnState = futureConnState;
      futureConnState.client.getVersion().then((_version) => {
        if (this.#connState !== futureConnState) {
          if (this.#connState.streamStates.size === 0) {
            this.#connState.client.close();
          } else {
          }
        }
        this.#connState = futureConnState;
        this.#futureConnState = void 0;
      }, (_e) => {
        this.#futureConnState = void 0;
      });
    }
    if (this.#connState.client.closed) {
      try {
        if (this.#futureConnState !== void 0) {
          this.#connState = this.#futureConnState;
        } else {
          this.#connState = this.#openConn();
        }
      } catch (e) {
        throw mapHranaError(e);
      }
    }
    const connState = this.#connState;
    try {
      if (connState.useSqlCache === void 0) {
        connState.useSqlCache = await connState.client.getVersion() >= 2;
        if (connState.useSqlCache) {
          connState.sqlCache.capacity = sqlCacheCapacity;
        }
      }
      const stream = connState.client.openStream();
      stream.intMode = this.#intMode;
      const streamState = { conn: connState, stream };
      connState.streamStates.add(streamState);
      return streamState;
    } catch (e) {
      throw mapHranaError(e);
    }
  }
  #openConn(client) {
    try {
      client ??= openWs(this.#url, this.#authToken);
      return {
        client,
        useSqlCache: void 0,
        sqlCache: new SqlCache(client, 0),
        openTime: /* @__PURE__ */ new Date(),
        streamStates: /* @__PURE__ */ new Set()
      };
    } catch (e) {
      throw mapHranaError(e);
    }
  }
  async reconnect() {
    try {
      for (const st of Array.from(this.#connState.streamStates)) {
        try {
          st.stream.close();
        } catch {
        }
      }
      this.#connState.client.close();
    } catch {
    }
    if (this.#futureConnState) {
      try {
        this.#futureConnState.client.close();
      } catch {
      }
      this.#futureConnState = void 0;
    }
    const next = this.#openConn();
    const version2 = await next.client.getVersion();
    next.useSqlCache = version2 >= 2;
    if (next.useSqlCache) {
      next.sqlCache.capacity = sqlCacheCapacity;
    }
    this.#connState = next;
    this.closed = false;
  }
  _closeStream(streamState) {
    streamState.stream.close();
    const connState = streamState.conn;
    connState.streamStates.delete(streamState);
    if (connState.streamStates.size === 0 && connState !== this.#connState) {
      connState.client.close();
    }
  }
  close() {
    this.#connState.client.close();
    this.closed = true;
    if (this.#futureConnState) {
      try {
        this.#futureConnState.client.close();
      } catch {
      }
      this.#futureConnState = void 0;
    }
    this.closed = true;
  }
};
var WsTransaction = class extends HranaTransaction {
  #client;
  #streamState;
  /** @private */
  constructor(client, state, mode, version2) {
    super(mode, version2);
    this.#client = client;
    this.#streamState = state;
  }
  /** @private */
  _getStream() {
    return this.#streamState.stream;
  }
  /** @private */
  _getSqlCache() {
    return this.#streamState.conn.sqlCache;
  }
  close() {
    this.#client._closeStream(this.#streamState);
  }
  get closed() {
    return this.#streamState.stream.closed;
  }
};

// ../../node_modules/.pnpm/@libsql+client@0.17.3/node_modules/@libsql/client/lib-esm/http.js
var import_promise_limit2 = __toESM(require_promise_limit(), 1);
function _createClient3(config2) {
  if (config2.scheme !== "https" && config2.scheme !== "http") {
    throw new LibsqlError(`The HTTP client supports only "libsql:", "https:" and "http:" URLs, got ${JSON.stringify(config2.scheme + ":")}. For more information, please read ${supportedUrlLink}`, "URL_SCHEME_NOT_SUPPORTED");
  }
  if (config2.encryptionKey !== void 0) {
    throw new LibsqlError("Encryption key is not supported by the remote client.", "ENCRYPTION_KEY_NOT_SUPPORTED");
  }
  if (config2.scheme === "http" && config2.tls) {
    throw new LibsqlError(`A "http:" URL cannot opt into TLS by using ?tls=1`, "URL_INVALID");
  } else if (config2.scheme === "https" && !config2.tls) {
    throw new LibsqlError(`A "https:" URL cannot opt out of TLS by using ?tls=0`, "URL_INVALID");
  }
  const url = encodeBaseUrl(config2.scheme, config2.authority, config2.path);
  return new HttpClient2(url, config2.authToken, config2.intMode, config2.fetch, config2.concurrency, config2.remoteEncryptionKey);
}
var sqlCacheCapacity2 = 30;
var HttpClient2 = class {
  #client;
  protocol;
  #url;
  #intMode;
  #customFetch;
  #concurrency;
  #authToken;
  #remoteEncryptionKey;
  #promiseLimitFunction;
  /** @private */
  constructor(url, authToken, intMode, customFetch, concurrency, remoteEncryptionKey) {
    this.#url = url;
    this.#authToken = authToken;
    this.#intMode = intMode;
    this.#customFetch = customFetch;
    this.#concurrency = concurrency;
    this.#remoteEncryptionKey = remoteEncryptionKey;
    this.#client = openHttp(this.#url, this.#authToken, this.#customFetch, remoteEncryptionKey);
    this.#client.intMode = this.#intMode;
    this.protocol = "http";
    this.#promiseLimitFunction = (0, import_promise_limit2.default)(this.#concurrency);
  }
  async limit(fn) {
    return this.#promiseLimitFunction(fn);
  }
  async execute(stmtOrSql, args) {
    let stmt;
    if (typeof stmtOrSql === "string") {
      stmt = {
        sql: stmtOrSql,
        args: args || []
      };
    } else {
      stmt = stmtOrSql;
    }
    return this.limit(async () => {
      try {
        const hranaStmt = stmtToHrana(stmt);
        let rowsPromise;
        const stream = this.#client.openStream();
        try {
          rowsPromise = stream.query(hranaStmt);
        } finally {
          stream.closeGracefully();
        }
        const rowsResult = await rowsPromise;
        return resultSetFromHrana(rowsResult);
      } catch (e) {
        throw mapHranaError(e);
      }
    });
  }
  async batch(stmts, mode = "deferred") {
    return this.limit(async () => {
      try {
        const normalizedStmts = stmts.map((stmt) => {
          if (Array.isArray(stmt)) {
            return {
              sql: stmt[0],
              args: stmt[1] || []
            };
          }
          return stmt;
        });
        const hranaStmts = normalizedStmts.map(stmtToHrana);
        const version2 = await this.#client.getVersion();
        let resultsPromise;
        const stream = this.#client.openStream();
        try {
          const sqlCache = new SqlCache(stream, sqlCacheCapacity2);
          sqlCache.apply(hranaStmts);
          const batch = stream.batch(false);
          resultsPromise = executeHranaBatch(mode, version2, batch, hranaStmts);
        } finally {
          stream.closeGracefully();
        }
        const results = await resultsPromise;
        return results;
      } catch (e) {
        throw mapHranaError(e);
      }
    });
  }
  async migrate(stmts) {
    return this.limit(async () => {
      try {
        const hranaStmts = stmts.map(stmtToHrana);
        const version2 = await this.#client.getVersion();
        let resultsPromise;
        const stream = this.#client.openStream();
        try {
          const batch = stream.batch(false);
          resultsPromise = executeHranaBatch("deferred", version2, batch, hranaStmts, true);
        } finally {
          stream.closeGracefully();
        }
        const results = await resultsPromise;
        return results;
      } catch (e) {
        throw mapHranaError(e);
      }
    });
  }
  async transaction(mode = "write") {
    return this.limit(async () => {
      try {
        const version2 = await this.#client.getVersion();
        return new HttpTransaction(this.#client.openStream(), mode, version2);
      } catch (e) {
        throw mapHranaError(e);
      }
    });
  }
  async executeMultiple(sql2) {
    return this.limit(async () => {
      try {
        let promise;
        const stream = this.#client.openStream();
        try {
          promise = stream.sequence(sql2);
        } finally {
          stream.closeGracefully();
        }
        await promise;
      } catch (e) {
        throw mapHranaError(e);
      }
    });
  }
  sync() {
    throw new LibsqlError("sync not supported in http mode", "SYNC_NOT_SUPPORTED");
  }
  close() {
    this.#client.close();
  }
  async reconnect() {
    try {
      if (!this.closed) {
        this.#client.close();
      }
    } finally {
      this.#client = openHttp(this.#url, this.#authToken, this.#customFetch, this.#remoteEncryptionKey);
      this.#client.intMode = this.#intMode;
    }
  }
  get closed() {
    return this.#client.closed;
  }
};
var HttpTransaction = class extends HranaTransaction {
  #stream;
  #sqlCache;
  /** @private */
  constructor(stream, mode, version2) {
    super(mode, version2);
    this.#stream = stream;
    this.#sqlCache = new SqlCache(stream, sqlCacheCapacity2);
  }
  /** @private */
  _getStream() {
    return this.#stream;
  }
  /** @private */
  _getSqlCache() {
    return this.#sqlCache;
  }
  close() {
    this.#stream.close();
  }
  get closed() {
    return this.#stream.closed;
  }
};

// ../../node_modules/.pnpm/@libsql+client@0.17.3/node_modules/@libsql/client/lib-esm/node.js
function createClient(config2) {
  return _createClient4(expandConfig(config2, true));
}
function _createClient4(config2) {
  if (config2.scheme === "wss" || config2.scheme === "ws") {
    return _createClient2(config2);
  } else if (config2.scheme === "https" || config2.scheme === "http") {
    return _createClient3(config2);
  } else {
    return _createClient(config2);
  }
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/entity.js
var entityKind = /* @__PURE__ */ Symbol.for("drizzle:entityKind");
function is(value, type) {
  if (!value || typeof value !== "object") return false;
  if (value instanceof type) return true;
  if (!Object.prototype.hasOwnProperty.call(type, entityKind)) throw new Error(`Class "${type.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`);
  let cls = Object.getPrototypeOf(value)?.constructor;
  if (cls) while (cls) {
    if (entityKind in cls && cls[entityKind] === type[entityKind]) return true;
    cls = Object.getPrototypeOf(cls);
  }
  return false;
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/column-common.js
var OriginalColumn = /* @__PURE__ */ Symbol.for("drizzle:OriginalColumn");

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/column.js
var Column = class {
  static [entityKind] = "Column";
  name;
  keyAsName;
  primary;
  notNull;
  default;
  defaultFn;
  onUpdateFn;
  hasDefault;
  isUnique;
  uniqueName;
  uniqueType;
  dataType;
  columnType;
  enumValues = void 0;
  generated = void 0;
  generatedIdentity = void 0;
  length;
  isLengthExact;
  isAlias;
  /** @internal */
  config;
  /** @internal */
  table;
  /** @internal */
  onInit() {
  }
  constructor(table2, config2) {
    this.config = config2;
    this.onInit();
    this.table = table2;
    this.name = config2.name;
    this.isAlias = false;
    this.keyAsName = config2.keyAsName;
    this.notNull = config2.notNull;
    this.default = config2.default;
    this.defaultFn = config2.defaultFn;
    this.onUpdateFn = config2.onUpdateFn;
    this.hasDefault = config2.hasDefault;
    this.primary = config2.primaryKey;
    this.isUnique = config2.isUnique;
    this.uniqueName = config2.uniqueName;
    this.uniqueType = config2.uniqueType;
    this.dataType = config2.dataType;
    this.columnType = config2.columnType;
    this.generated = config2.generated;
    this.generatedIdentity = config2.generatedIdentity;
    this.length = config2["length"];
    this.isLengthExact = config2["isLengthExact"];
  }
  mapFromDriverValue(value) {
    return value;
  }
  mapToDriverValue(value) {
    return value;
  }
  shouldDisableInsert() {
    return this.config.generated !== void 0 && this.config.generated.type !== "byDefault";
  }
  /** @internal */
  [OriginalColumn]() {
    return this;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/subquery.js
var Subquery = class {
  static [entityKind] = "Subquery";
  constructor(sql2, fields, alias, isWith = false, usedTables = []) {
    this._ = {
      brand: "Subquery",
      sql: sql2,
      selectedFields: fields,
      alias,
      isWith,
      usedTables
    };
  }
};
var WithSubquery = class extends Subquery {
  static [entityKind] = "WithSubquery";
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/table.utils.js
var TableName = /* @__PURE__ */ Symbol.for("drizzle:Name");

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/table.js
var TableSchema = /* @__PURE__ */ Symbol.for("drizzle:Schema");
var TableColumns = /* @__PURE__ */ Symbol.for("drizzle:Columns");
var ExtraConfigColumns = /* @__PURE__ */ Symbol.for("drizzle:ExtraConfigColumns");
var OriginalName = /* @__PURE__ */ Symbol.for("drizzle:OriginalName");
var BaseName = /* @__PURE__ */ Symbol.for("drizzle:BaseName");
var IsAlias = /* @__PURE__ */ Symbol.for("drizzle:IsAlias");
var ExtraConfigBuilder = /* @__PURE__ */ Symbol.for("drizzle:ExtraConfigBuilder");
var IsDrizzleTable = /* @__PURE__ */ Symbol.for("drizzle:IsDrizzleTable");
var Table = class {
  static [entityKind] = "Table";
  /** @internal */
  static Symbol = {
    Name: TableName,
    Schema: TableSchema,
    OriginalName,
    Columns: TableColumns,
    ExtraConfigColumns,
    BaseName,
    IsAlias,
    ExtraConfigBuilder
  };
  /**
  * @internal
  * Can be changed if the table is aliased.
  */
  [TableName];
  /**
  * @internal
  * Used to store the original name of the table, before any aliasing.
  */
  [OriginalName];
  /** @internal */
  [TableSchema];
  /** @internal */
  [TableColumns];
  /** @internal */
  [ExtraConfigColumns];
  /**
  *  @internal
  * Used to store the table name before the transformation via the `tableCreator` functions.
  */
  [BaseName];
  /** @internal */
  [IsAlias] = false;
  /** @internal */
  [IsDrizzleTable] = true;
  /** @internal */
  [ExtraConfigBuilder] = void 0;
  constructor(name2, schema, baseName) {
    this[TableName] = this[OriginalName] = name2;
    this[TableSchema] = schema;
    this[BaseName] = baseName;
  }
};
function getTableName(table2) {
  return table2[TableName];
}
function getTableUniqueName(table2) {
  return `${table2[TableSchema] ?? "public"}.${table2[TableName]}`;
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/tracing-utils.js
function iife(fn, ...args) {
  return fn(...args);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/tracing.js
var tracer = { startActiveSpan(name2, fn) {
  return fn();
} };

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/view-common.js
var ViewBaseConfig = /* @__PURE__ */ Symbol.for("drizzle:ViewBaseConfig");

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sql/sql.js
var FakePrimitiveParam = class {
  static [entityKind] = "FakePrimitiveParam";
};
function isSQLWrapper(value) {
  return value !== null && value !== void 0 && typeof value.getSQL === "function";
}
function mergeQueries(queries) {
  const result = {
    sql: "",
    params: []
  };
  for (const query of queries) {
    result.sql += query.sql;
    result.params.push(...query.params);
    if (query.typings?.length) {
      if (!result.typings) result.typings = [];
      result.typings.push(...query.typings);
    }
  }
  return result;
}
var StringChunk = class {
  static [entityKind] = "StringChunk";
  value;
  constructor(value) {
    this.value = Array.isArray(value) ? value : [value];
  }
  getSQL() {
    return new SQL([this]);
  }
};
var SQL = class SQL2 {
  static [entityKind] = "SQL";
  /** @internal */
  decoder = noopDecoder;
  /** @internal */
  shouldInlineParams = false;
  /** @internal */
  usedTables = [];
  constructor(queryChunks) {
    this.queryChunks = queryChunks;
    for (const chunk of queryChunks) if (is(chunk, Table)) {
      const schemaName = chunk[Table.Symbol.Schema];
      this.usedTables.push(schemaName === void 0 ? chunk[Table.Symbol.Name] : schemaName + "." + chunk[Table.Symbol.Name]);
    }
  }
  append(query) {
    this.queryChunks.push(...query.queryChunks);
    return this;
  }
  toQuery(config2) {
    return tracer.startActiveSpan("drizzle.buildSQL", (span) => {
      const query = this.buildQueryFromSourceParams(this.queryChunks, config2);
      span?.setAttributes({
        "drizzle.query.text": query.sql,
        "drizzle.query.params": JSON.stringify(query.params)
      });
      return query;
    });
  }
  buildQueryFromSourceParams(chunks, _config) {
    const config2 = Object.assign({}, _config, {
      inlineParams: _config.inlineParams || this.shouldInlineParams,
      paramStartIndex: _config.paramStartIndex || { value: 0 }
    });
    const { casing, escapeName, escapeParam, prepareTyping, inlineParams, paramStartIndex, invokeSource } = config2;
    return mergeQueries(chunks.map((chunk) => {
      if (is(chunk, StringChunk)) return {
        sql: chunk.value.join(""),
        params: []
      };
      if (is(chunk, Name)) return {
        sql: escapeName(chunk.value),
        params: []
      };
      if (chunk === void 0) return {
        sql: "",
        params: []
      };
      if (Array.isArray(chunk)) {
        const result = [new StringChunk("(")];
        for (const [i, p] of chunk.entries()) {
          result.push(p);
          if (i < chunk.length - 1) result.push(new StringChunk(", "));
        }
        result.push(new StringChunk(")"));
        return this.buildQueryFromSourceParams(result, config2);
      }
      if (is(chunk, SQL2)) return this.buildQueryFromSourceParams(chunk.queryChunks, {
        ...config2,
        inlineParams: inlineParams || chunk.shouldInlineParams
      });
      if (is(chunk, Table)) {
        const schemaName = chunk[Table.Symbol.Schema];
        const tableName = chunk[Table.Symbol.Name];
        if (invokeSource === "mssql-view-with-schemabinding") return {
          sql: (schemaName === void 0 ? escapeName("dbo") : escapeName(schemaName)) + "." + escapeName(tableName),
          params: []
        };
        return {
          sql: schemaName === void 0 || chunk[IsAlias] ? escapeName(tableName) : escapeName(schemaName) + "." + escapeName(tableName),
          params: []
        };
      }
      if (is(chunk, Column)) {
        const columnName = casing.getColumnCasing(chunk);
        if (_config.invokeSource === "indexes") return {
          sql: escapeName(columnName),
          params: []
        };
        const schemaName = invokeSource === "mssql-check" ? void 0 : chunk.table[Table.Symbol.Schema];
        return {
          sql: chunk.isAlias ? escapeName(chunk.name) : chunk.table[IsAlias] || schemaName === void 0 ? escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(columnName) : escapeName(schemaName) + "." + escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(columnName),
          params: []
        };
      }
      if (is(chunk, View)) {
        const schemaName = chunk[ViewBaseConfig].schema;
        const viewName = chunk[ViewBaseConfig].name;
        return {
          sql: schemaName === void 0 || chunk[ViewBaseConfig].isAlias ? escapeName(viewName) : escapeName(schemaName) + "." + escapeName(viewName),
          params: []
        };
      }
      if (is(chunk, Param)) {
        if (is(chunk.value, Placeholder)) return {
          sql: escapeParam(paramStartIndex.value++, chunk),
          params: [chunk],
          typings: ["none"]
        };
        const mappedValue = chunk.value === null ? null : chunk.encoder.mapToDriverValue(chunk.value);
        if (is(mappedValue, SQL2)) return this.buildQueryFromSourceParams([mappedValue], config2);
        if (inlineParams) return {
          sql: this.mapInlineParam(mappedValue, config2),
          params: []
        };
        let typings = ["none"];
        if (prepareTyping) typings = [prepareTyping(chunk.encoder)];
        return {
          sql: escapeParam(paramStartIndex.value++, mappedValue),
          params: [mappedValue],
          typings
        };
      }
      if (is(chunk, Placeholder)) return {
        sql: escapeParam(paramStartIndex.value++, chunk),
        params: [chunk],
        typings: ["none"]
      };
      if (is(chunk, SQL2.Aliased) && chunk.fieldAlias !== void 0) return {
        sql: (chunk.origin !== void 0 ? escapeName(chunk.origin) + "." : "") + escapeName(chunk.fieldAlias),
        params: []
      };
      if (is(chunk, Subquery)) {
        if (chunk._.isWith) return {
          sql: escapeName(chunk._.alias),
          params: []
        };
        return this.buildQueryFromSourceParams([
          new StringChunk("("),
          chunk._.sql,
          new StringChunk(") "),
          new Name(chunk._.alias)
        ], config2);
      }
      if (typeof chunk === "function" && "enumName" in chunk) {
        if ("schema" in chunk && chunk.schema) return {
          sql: escapeName(chunk.schema) + "." + escapeName(chunk.enumName),
          params: []
        };
        return {
          sql: escapeName(chunk.enumName),
          params: []
        };
      }
      if (isSQLWrapper(chunk)) {
        if (chunk.shouldOmitSQLParens?.()) return this.buildQueryFromSourceParams([chunk.getSQL()], config2);
        return this.buildQueryFromSourceParams([
          new StringChunk("("),
          chunk.getSQL(),
          new StringChunk(")")
        ], config2);
      }
      if (inlineParams) return {
        sql: this.mapInlineParam(chunk, config2),
        params: []
      };
      return {
        sql: escapeParam(paramStartIndex.value++, chunk),
        params: [chunk],
        typings: ["none"]
      };
    }));
  }
  mapInlineParam(chunk, { escapeString }) {
    if (chunk === null) return "null";
    if (typeof chunk === "number" || typeof chunk === "boolean" || typeof chunk === "bigint") return chunk.toString();
    if (typeof chunk === "string") return escapeString(chunk);
    if (typeof chunk === "object") {
      const mappedValueAsString = chunk.toString();
      if (mappedValueAsString === "[object Object]") return escapeString(JSON.stringify(chunk));
      return escapeString(mappedValueAsString);
    }
    throw new Error("Unexpected param value: " + chunk);
  }
  getSQL() {
    return this;
  }
  as(alias) {
    if (alias === void 0) return this;
    return new SQL2.Aliased(this, alias);
  }
  mapWith(decoder) {
    this.decoder = typeof decoder === "function" ? { mapFromDriverValue: decoder } : decoder;
    return this;
  }
  inlineParams() {
    this.shouldInlineParams = true;
    return this;
  }
  /**
  * This method is used to conditionally include a part of the query.
  *
  * @param condition - Condition to check
  * @returns itself if the condition is `true`, otherwise `undefined`
  */
  if(condition) {
    return condition ? this : void 0;
  }
};
var Name = class {
  static [entityKind] = "Name";
  brand;
  constructor(value) {
    this.value = value;
  }
  getSQL() {
    return new SQL([this]);
  }
};
function isDriverValueEncoder(value) {
  return typeof value === "object" && value !== null && "mapToDriverValue" in value && typeof value.mapToDriverValue === "function";
}
var noopDecoder = { mapFromDriverValue: (value) => value };
var noopEncoder = { mapToDriverValue: (value) => value };
var noopMapper = {
  ...noopDecoder,
  ...noopEncoder
};
var Param = class {
  static [entityKind] = "Param";
  brand;
  /**
  * @param value - Parameter value
  * @param encoder - Encoder to convert the value to a driver parameter
  */
  constructor(value, encoder = noopEncoder) {
    this.value = value;
    this.encoder = encoder;
  }
  getSQL() {
    return new SQL([this]);
  }
};
function sql(strings, ...params) {
  const queryChunks = [];
  if (params.length > 0 || strings.length > 0 && strings[0] !== "") queryChunks.push(new StringChunk(strings[0]));
  for (const [paramIndex, param2] of params.entries()) queryChunks.push(param2, new StringChunk(strings[paramIndex + 1]));
  return new SQL(queryChunks);
}
(function(_sql) {
  function empty() {
    return new SQL([]);
  }
  _sql.empty = empty;
  function fromList(list) {
    return new SQL(list);
  }
  _sql.fromList = fromList;
  function raw(str) {
    return new SQL([new StringChunk(str)]);
  }
  _sql.raw = raw;
  function join(chunks, separator) {
    const result = [];
    for (const [i, chunk] of chunks.entries()) {
      if (i > 0 && separator !== void 0) result.push(separator);
      result.push(chunk);
    }
    return new SQL(result);
  }
  _sql.join = join;
  function identifier(value) {
    return new Name(value);
  }
  _sql.identifier = identifier;
  function placeholder2(name2) {
    return new Placeholder(name2);
  }
  _sql.placeholder = placeholder2;
  function param2(value, encoder) {
    return new Param(value, encoder);
  }
  _sql.param = param2;
  function comment(input) {
    const encoded = sqlCommenter(input);
    if (!encoded.length) return void 0;
    return sql.raw(encoded);
  }
  _sql.comment = comment;
})(sql || (sql = {}));
function sqlCommenter(input) {
  const encoded = sqlCommenter.encodeInput(input);
  if (!encoded.length) return "";
  return `/*${encoded}*/`;
}
(function(_sqlCommenter) {
  function merge(input1, input2) {
    let encoded;
    if (typeof input1 === "object" && typeof input2 === "object") encoded = encodeInput({
      ...input1,
      ...input2
    });
    else if (input1 && input2) encoded = [encodeInput(input1), encodeInput(input2)].filter((i) => i.length).join(",");
    else if (input2) encoded = encodeInput(input2);
    else if (input1) encoded = encodeInput(input1);
    else return "";
    if (!encoded.length) return "";
    return `/*${encoded}*/`;
  }
  _sqlCommenter.merge = merge;
  function encodeInput(input) {
    if (typeof input === "string") {
      if (!input.length) return input;
      return sanitizeStringInput(input);
    }
    const parts = [];
    for (const [key, value] of Object.entries(input)) {
      if (value === null || value === void 0 || value === "") continue;
      const encodedKey = sanitizeObjectElement(key);
      const encodedValue = sanitizeObjectElement(String(value));
      parts.push(`${encodedKey}='${encodedValue}'`);
    }
    if (!parts.length) return "";
    return parts.sort().join(",");
  }
  _sqlCommenter.encodeInput = encodeInput;
  function sanitizeObjectElement(key) {
    return encodeURIComponent(key).replace(/'/g, `\\'`);
  }
  _sqlCommenter.sanitizeObjectElement = sanitizeObjectElement;
  function sanitizeStringInput(input) {
    return input.replace(/\/\*/g, "/ *").replace(/\*\//g, "* /");
  }
  _sqlCommenter.sanitizeStringInput = sanitizeStringInput;
})(sqlCommenter || (sqlCommenter = {}));
(function(_SQL) {
  class Aliased {
    static [entityKind] = "SQL.Aliased";
    /** @internal */
    isSelectionField = false;
    /** @internal */
    origin;
    constructor(sql2, fieldAlias) {
      this.sql = sql2;
      this.fieldAlias = fieldAlias;
    }
    getSQL() {
      return this.sql;
    }
    /** @internal */
    clone() {
      return new Aliased(this.sql, this.fieldAlias);
    }
  }
  _SQL.Aliased = Aliased;
})(SQL || (SQL = {}));
var Placeholder = class {
  static [entityKind] = "Placeholder";
  constructor(name2) {
    this.name = name2;
  }
  getSQL() {
    return new SQL([this]);
  }
};
function fillPlaceholders(params, values) {
  return params.map((p) => {
    if (is(p, Placeholder)) {
      if (!(p.name in values)) throw new Error(`No value for placeholder "${p.name}" was provided`);
      return values[p.name];
    }
    if (is(p, Param) && is(p.value, Placeholder)) {
      if (!(p.value.name in values)) throw new Error(`No value for placeholder "${p.value.name}" was provided`);
      return p.encoder.mapToDriverValue(values[p.value.name]);
    }
    return p;
  });
}
var IsDrizzleView = /* @__PURE__ */ Symbol.for("drizzle:IsDrizzleView");
var View = class {
  static [entityKind] = "View";
  /** @internal */
  [ViewBaseConfig];
  /** @internal */
  [IsDrizzleView] = true;
  /** @internal */
  get [TableName]() {
    return this[ViewBaseConfig].name;
  }
  /** @internal */
  get [TableSchema]() {
    return this[ViewBaseConfig].schema;
  }
  /** @internal */
  get [IsAlias]() {
    return this[ViewBaseConfig].isAlias;
  }
  /** @internal */
  get [OriginalName]() {
    return this[ViewBaseConfig].originalName;
  }
  /** @internal */
  get [TableColumns]() {
    return this[ViewBaseConfig].selectedFields;
  }
  constructor({ name: name2, schema, selectedFields, query }) {
    this[ViewBaseConfig] = {
      name: name2,
      originalName: name2,
      schema,
      selectedFields,
      query,
      isExisting: !query,
      isAlias: false
    };
  }
};
Column.prototype.getSQL = function() {
  return new SQL([this]);
};
Subquery.prototype.getSQL = function() {
  return new SQL([this]);
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/utils.js
function mapResultRow(columns, row, joinsNotNullableMap) {
  const nullifyMap = {};
  const result = columns.reduce((result2, { path, field }, columnIndex) => {
    let decoder;
    if (is(field, Column)) decoder = field;
    else if (is(field, SQL)) decoder = field.decoder;
    else if (is(field, Subquery)) decoder = field._.sql.decoder;
    else decoder = field.sql.decoder;
    let node = result2;
    for (const [pathChunkIndex, pathChunk] of path.entries()) if (pathChunkIndex < path.length - 1) {
      if (!(pathChunk in node)) node[pathChunk] = {};
      node = node[pathChunk];
    } else {
      const rawValue = row[columnIndex];
      const value = node[pathChunk] = rawValue === null ? null : decoder.mapFromDriverValue(rawValue);
      if (joinsNotNullableMap && is(field, Column) && path.length === 2) {
        const objectName = path[0];
        if (!(objectName in nullifyMap)) nullifyMap[objectName] = value === null ? getTableName(field.table) : false;
        else if (typeof nullifyMap[objectName] === "string" && nullifyMap[objectName] !== getTableName(field.table)) nullifyMap[objectName] = false;
      }
    }
    return result2;
  }, {});
  if (joinsNotNullableMap && Object.keys(nullifyMap).length > 0) {
    for (const [objectName, tableName] of Object.entries(nullifyMap)) if (typeof tableName === "string" && !joinsNotNullableMap[tableName]) result[objectName] = null;
  }
  return result;
}
function orderSelectedFields(fields, pathPrefix) {
  return Object.entries(fields).reduce((result, [name2, field]) => {
    if (typeof name2 !== "string") return result;
    const newPath = pathPrefix ? [...pathPrefix, name2] : [name2];
    if (is(field, Column) || is(field, SQL) || is(field, SQL.Aliased) || is(field, Subquery)) result.push({
      path: newPath,
      field
    });
    else if (is(field, Table)) result.push(...orderSelectedFields(field[Table.Symbol.Columns], newPath));
    else result.push(...orderSelectedFields(field, newPath));
    return result;
  }, []);
}
function haveSameKeys(left, right) {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) return false;
  for (const [index2, key] of leftKeys.entries()) if (key !== rightKeys[index2]) return false;
  return true;
}
function mapUpdateSet(table2, values) {
  const entries = Object.entries(values).filter(([, value]) => value !== void 0).map(([key, value]) => {
    if (is(value, SQL) || is(value, Column)) return [key, value];
    else return [key, new Param(value, table2[Table.Symbol.Columns][key])];
  });
  if (entries.length === 0) throw new Error("No values to set");
  return Object.fromEntries(entries);
}
function applyMixins(baseClass, extendedClasses) {
  for (const extendedClass of extendedClasses) for (const name2 of Object.getOwnPropertyNames(extendedClass.prototype)) {
    if (name2 === "constructor") continue;
    Object.defineProperty(baseClass.prototype, name2, Object.getOwnPropertyDescriptor(extendedClass.prototype, name2) || /* @__PURE__ */ Object.create(null));
  }
}
function getTableColumns(table2) {
  return table2[Table.Symbol.Columns];
}
function getTableLikeName(table2) {
  return is(table2, Subquery) ? table2._.alias : is(table2, View) ? table2[ViewBaseConfig].name : is(table2, SQL) ? void 0 : table2[Table.Symbol.IsAlias] ? table2[Table.Symbol.Name] : table2[Table.Symbol.BaseName];
}
function getColumnNameAndConfig(a, b) {
  return {
    name: typeof a === "string" && a.length > 0 ? a : "",
    config: typeof a === "object" ? a : b
  };
}
var textDecoder = typeof TextDecoder === "undefined" ? null : new TextDecoder();

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/logger.js
var ConsoleLogWriter = class {
  static [entityKind] = "ConsoleLogWriter";
  write(message) {
    console.log(message);
  }
};
var DefaultLogger = class {
  static [entityKind] = "DefaultLogger";
  writer;
  constructor(config2) {
    this.writer = config2?.writer ?? new ConsoleLogWriter();
  }
  logQuery(query, params) {
    const stringifiedParams = params.map((p) => {
      try {
        return JSON.stringify(p);
      } catch {
        return String(p);
      }
    });
    const paramsStr = stringifiedParams.length ? ` -- params: [${stringifiedParams.join(", ")}]` : "";
    this.writer.write(`Query: ${query}${paramsStr}`);
  }
};
var NoopLogger = class {
  static [entityKind] = "NoopLogger";
  logQuery() {
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/cache/core/cache.js
var Cache = class {
  static [entityKind] = "Cache";
};
var NoopCache = class extends Cache {
  static [entityKind] = "NoopCache";
  strategy() {
    return "all";
  }
  async get(_key) {
  }
  async put(_hashedQuery, _response, _tables, _config) {
  }
  async onMutate(_params) {
  }
};
async function hashQuery(sql2, params) {
  const dataToHash = `${sql2}-${JSON.stringify(params, (_, v) => typeof v === "bigint" ? `${v}n` : v)}`;
  const data = new TextEncoder().encode(dataToHash);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hashBuffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sql/expressions/conditions.js
function bindIfParam(value, column) {
  if (isDriverValueEncoder(column) && !isSQLWrapper(value) && !is(value, Param) && !is(value, Placeholder) && !is(value, Column) && !is(value, Table) && !is(value, View)) return new Param(value, column);
  return value;
}
var eq = (left, right) => {
  return sql`${left} = ${bindIfParam(right, left)}`;
};
var ne = (left, right) => {
  return sql`${left} <> ${bindIfParam(right, left)}`;
};
function and(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter((c) => c !== void 0);
  if (conditions.length === 0) return;
  if (conditions.length === 1) return new SQL(conditions);
  return new SQL([
    new StringChunk("("),
    sql.join(conditions.map((c) => sql`(${c})`), new StringChunk(" and ")),
    new StringChunk(")")
  ]);
}
function or(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter((c) => c !== void 0);
  if (conditions.length === 0) return;
  if (conditions.length === 1) return new SQL(conditions);
  return new SQL([
    new StringChunk("("),
    sql.join(conditions.map((c) => sql`(${c})`), new StringChunk(" or ")),
    new StringChunk(")")
  ]);
}
function not(condition) {
  return is(condition, SQL) ? sql`not (${condition})` : sql`not ${condition}`;
}
var gt = (left, right) => {
  return sql`${left} > ${bindIfParam(right, left)}`;
};
var gte = (left, right) => {
  return sql`${left} >= ${bindIfParam(right, left)}`;
};
var lt = (left, right) => {
  return sql`${left} < ${bindIfParam(right, left)}`;
};
var lte = (left, right) => {
  return sql`${left} <= ${bindIfParam(right, left)}`;
};
function inArray(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) return sql`false`;
    return sql`${column} in ${values.map((v) => bindIfParam(v, column))}`;
  }
  return sql`${column} in ${bindIfParam(values, column)}`;
}
function notInArray(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) return sql`true`;
    return sql`${column} not in ${values.map((v) => bindIfParam(v, column))}`;
  }
  return sql`${column} not in ${bindIfParam(values, column)}`;
}
function isNull(value) {
  return sql`(${value} is null)`;
}
function isNotNull(value) {
  return sql`(${value} is not null)`;
}
function exists(subquery) {
  return sql`exists ${subquery}`;
}
function notExists(subquery) {
  return sql`not exists ${subquery}`;
}
function between(column, min, max) {
  return sql`${column} between ${bindIfParam(min, column)} and ${bindIfParam(max, column)}`;
}
function notBetween(column, min, max) {
  return sql`${column} not between ${bindIfParam(min, column)} and ${bindIfParam(max, column)}`;
}
function like(column, value) {
  return sql`${column} like ${value}`;
}
function notLike(column, value) {
  return sql`${column} not like ${value}`;
}
function ilike(column, value) {
  return sql`${column} ilike ${value}`;
}
function notIlike(column, value) {
  return sql`${column} not ilike ${value}`;
}
function arrayContains(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) throw new Error("arrayContains requires at least one value");
    const par = bindIfParam(values, column);
    return sql`${column} @> ${sql`${Array.isArray(par) ? new Param(par) : par}`}`;
  }
  return sql`${column} @> ${bindIfParam(values, column)}`;
}
function arrayContained(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) throw new Error("arrayContained requires at least one value");
    const par = bindIfParam(values, column);
    return sql`${column} <@ ${sql`${Array.isArray(par) ? new Param(par) : par}`}`;
  }
  return sql`${column} <@ ${bindIfParam(values, column)}`;
}
function arrayOverlaps(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) throw new Error("arrayOverlaps requires at least one value");
    const par = bindIfParam(values, column);
    return sql`${column} && ${sql`${Array.isArray(par) ? new Param(par) : par}`}`;
  }
  return sql`${column} && ${bindIfParam(values, column)}`;
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sql/expressions/select.js
function asc(column) {
  return sql`${column} asc`;
}
function desc(column) {
  return sql`${column} desc`;
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/utils/array.js
function parsePgArrayValue(arrayString, startFrom, inQuotes) {
  for (let i = startFrom; i < arrayString.length; i++) {
    const char2 = arrayString[i];
    if (char2 === "\\") {
      i++;
      continue;
    }
    if (char2 === '"') return [arrayString.slice(startFrom, i).replace(/\\/g, ""), i + 1];
    if (inQuotes) continue;
    if (char2 === "," || char2 === "}") return [arrayString.slice(startFrom, i).replace(/\\/g, ""), i];
  }
  return [arrayString.slice(startFrom).replace(/\\/g, ""), arrayString.length];
}
function parsePgNestedArray(arrayString, startFrom = 0) {
  const result = [];
  let i = startFrom;
  let lastCharIsComma = false;
  while (i < arrayString.length) {
    const char2 = arrayString[i];
    if (char2 === ",") {
      if (lastCharIsComma || i === startFrom) result.push("");
      lastCharIsComma = true;
      i++;
      continue;
    }
    lastCharIsComma = false;
    if (char2 === "\\") {
      i += 2;
      continue;
    }
    if (char2 === '"') {
      const [value2, startFrom2] = parsePgArrayValue(arrayString, i + 1, true);
      result.push(value2);
      i = startFrom2;
      continue;
    }
    if (char2 === "}") return [result, i + 1];
    if (char2 === "{") {
      const [value2, startFrom2] = parsePgNestedArray(arrayString, i + 1);
      result.push(value2);
      i = startFrom2;
      continue;
    }
    const [value, newStartFrom] = parsePgArrayValue(arrayString, i, false);
    result.push(value);
    i = newStartFrom;
  }
  return [result, i];
}
function parsePgArray(arrayString) {
  const [result] = parsePgNestedArray(arrayString, 1);
  return result;
}
function makePgArray(array2) {
  return `{${array2.map((item) => {
    if (Array.isArray(item)) return makePgArray(item);
    if (typeof item === "string") return `"${item.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
    return `${item}`;
  }).join(",")}}`;
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/foreign-keys.js
var ForeignKeyBuilder = class {
  static [entityKind] = "PgForeignKeyBuilder";
  /** @internal */
  reference;
  /** @internal */
  _onUpdate = "no action";
  /** @internal */
  _onDelete = "no action";
  constructor(config2, actions) {
    this.reference = () => {
      const { name: name2, columns, foreignColumns } = config2();
      return {
        name: name2,
        columns,
        foreignTable: foreignColumns[0].table,
        foreignColumns
      };
    };
    if (actions) {
      this._onUpdate = actions.onUpdate;
      this._onDelete = actions.onDelete;
    }
  }
  onUpdate(action) {
    this._onUpdate = action === void 0 ? "no action" : action;
    return this;
  }
  onDelete(action) {
    this._onDelete = action === void 0 ? "no action" : action;
    return this;
  }
  /** @internal */
  build(table2) {
    return new ForeignKey(table2, this);
  }
};
var ForeignKey = class {
  static [entityKind] = "PgForeignKey";
  reference;
  onUpdate;
  onDelete;
  name;
  constructor(table2, builder) {
    this.table = table2;
    this.reference = builder.reference;
    this.onUpdate = builder._onUpdate;
    this.onDelete = builder._onDelete;
  }
  getName() {
    const { name: name2, columns, foreignColumns } = this.reference();
    const columnNames = columns.map((column) => column.name);
    const foreignColumnNames = foreignColumns.map((column) => column.name);
    const chunks = [
      this.table[TableName],
      ...columnNames,
      foreignColumns[0].table[TableName],
      ...foreignColumnNames
    ];
    return name2 ?? `${chunks.join("_")}_fk`;
  }
  isNameExplicit() {
    return !!this.reference().name;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/common.js
var PgColumnBuilder = class {
  static [entityKind] = "PgColumnBuilder";
  foreignKeyConfigs = [];
  config;
  constructor(name2, dataType, columnType) {
    this.config = {
      name: name2,
      keyAsName: name2 === "",
      notNull: false,
      default: void 0,
      hasDefault: false,
      primaryKey: false,
      isUnique: false,
      uniqueName: void 0,
      uniqueType: void 0,
      dataType,
      columnType,
      generated: void 0,
      defaultFn: void 0,
      onUpdateFn: void 0,
      generatedIdentity: void 0
    };
  }
  /**
  * Changes the data type of the column. Commonly used with `json` columns. Also, useful for branded types.
  *
  * @example
  * ```ts
  * const users = pgTable('users', {
  * 	id: integer('id').$type<UserId>().primaryKey(),
  * 	details: json('details').$type<UserDetails>().notNull(),
  * });
  * ```
  */
  $type() {
    return this;
  }
  /**
  * Adds a `not null` clause to the column definition.
  *
  * Affects the `select` model of the table - columns *without* `not null` will be nullable on select.
  */
  notNull() {
    this.config.notNull = true;
    return this;
  }
  /**
  * Adds a `default <value>` clause to the column definition.
  *
  * Affects the `insert` model of the table - columns *with* `default` are optional on insert.
  *
  * If you need to set a dynamic default value, use {@link $defaultFn} instead.
  */
  default(value) {
    this.config.default = value;
    this.config.hasDefault = true;
    return this;
  }
  /**
  * Adds a dynamic default value to the column.
  * The function will be called when the row is inserted, and the returned value will be used as the column value.
  *
  * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
  */
  $defaultFn(fn) {
    this.config.defaultFn = fn;
    this.config.hasDefault = true;
    return this;
  }
  /**
  * Alias for {@link $defaultFn}.
  */
  $default = this.$defaultFn;
  /**
  * Adds a dynamic update value to the column.
  * The function will be called when the row is updated, and the returned value will be used as the column value if none is provided.
  * If no `default` (or `$defaultFn`) value is provided, the function will be called when the row is inserted as well, and the returned value will be used as the column value.
  *
  * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
  */
  $onUpdateFn(fn) {
    this.config.onUpdateFn = fn;
    this.config.hasDefault = true;
    return this;
  }
  /**
  * Alias for {@link $onUpdateFn}.
  */
  $onUpdate = this.$onUpdateFn;
  /**
  * Adds a `primary key` clause to the column definition. This implicitly makes the column `not null`.
  *
  * In SQLite, `integer primary key` implicitly makes the column auto-incrementing.
  */
  primaryKey() {
    this.config.primaryKey = true;
    this.config.notNull = true;
    return this;
  }
  /** @internal Sets the name of the column to the key within the table definition if a name was not given. */
  setName(name2) {
    if (this.config.name !== "") return;
    this.config.name = name2;
  }
  array(dimensions) {
    const dim = dimensions ?? "[]";
    this.config.dimensions = dim.length / 2;
    return this;
  }
  references(ref, config2 = {}) {
    this.foreignKeyConfigs.push({
      ref,
      config: config2
    });
    return this;
  }
  unique(name2, config2) {
    this.config.isUnique = true;
    this.config.uniqueName = name2;
    this.config.uniqueType = config2?.nulls;
    return this;
  }
  generatedAlwaysAs(as) {
    this.config.generated = {
      as,
      type: "always",
      mode: "stored"
    };
    return this;
  }
  /** @internal */
  buildForeignKeys(column, table2) {
    return this.foreignKeyConfigs.map(({ ref, config: config2 }) => {
      return iife((ref2, config3) => {
        const builder = new ForeignKeyBuilder(() => {
          const foreignColumn = ref2();
          return {
            name: config3.name,
            columns: [column],
            foreignColumns: [foreignColumn]
          };
        });
        if (config3.onUpdate) builder.onUpdate(config3.onUpdate);
        if (config3.onDelete) builder.onDelete(config3.onDelete);
        return builder.build(table2);
      }, ref, config2);
    });
  }
  /** @internal */
  buildExtraConfigColumn(table2) {
    return new ExtraConfigColumn(table2, {
      ...this.config,
      dimensions: this.config.dimensions ?? 0
    });
  }
};
var PgColumn = class extends Column {
  static [entityKind] = "PgColumn";
  /** @internal */
  table;
  dimensions;
  constructor(table2, config2) {
    super(table2, config2);
    this.table = table2;
    this.dimensions = config2.dimensions ?? 0;
    if (this.dimensions) {
      const originalFromDriver = this.mapFromDriverValue.bind(this);
      const originalToDriver = this.mapToDriverValue.bind(this);
      this.mapFromDriverValue = (value) => {
        if (value === null) return value;
        const arr = typeof value === "string" ? parsePgArray(value) : value;
        return this.mapArrayElements(arr, originalFromDriver, this.dimensions);
      };
      this.mapToDriverValue = (value) => {
        if (value === null) return value;
        return makePgArray(this.mapArrayElements(value, originalToDriver, this.dimensions));
      };
    }
  }
  /** @internal */
  mapArrayElements(value, mapper, depth) {
    if (depth > 0 && Array.isArray(value)) return value.map((v) => v === null ? null : this.mapArrayElements(v, mapper, depth - 1));
    return mapper(value);
  }
};
var ExtraConfigColumn = class extends PgColumn {
  static [entityKind] = "ExtraConfigColumn";
  getSQLType() {
    return this.getSQLType();
  }
  indexConfig = {
    order: this.config.order ?? "asc",
    nulls: this.config.nulls ?? "last",
    opClass: this.config.opClass
  };
  defaultConfig = {
    order: "asc",
    nulls: "last",
    opClass: void 0
  };
  asc() {
    this.indexConfig.order = "asc";
    return this;
  }
  desc() {
    this.indexConfig.order = "desc";
    return this;
  }
  nullsFirst() {
    this.indexConfig.nulls = "first";
    return this;
  }
  nullsLast() {
    this.indexConfig.nulls = "last";
    return this;
  }
  /**
  * ### PostgreSQL documentation quote
  *
  * > An operator class with optional parameters can be specified for each column of an index.
  * The operator class identifies the operators to be used by the index for that column.
  * For example, a B-tree index on four-byte integers would use the int4_ops class;
  * this operator class includes comparison functions for four-byte integers.
  * In practice the default operator class for the column's data type is usually sufficient.
  * The main point of having operator classes is that for some data types, there could be more than one meaningful ordering.
  * For example, we might want to sort a complex-number data type either by absolute value or by real part.
  * We could do this by defining two operator classes for the data type and then selecting the proper class when creating an index.
  * More information about operator classes check:
  *
  * ### Useful links
  * https://www.postgresql.org/docs/current/sql-createindex.html
  *
  * https://www.postgresql.org/docs/current/indexes-opclass.html
  *
  * https://www.postgresql.org/docs/current/xindex.html
  *
  * ### Additional types
  * If you have the `pg_vector` extension installed in your database, you can use the
  * `vector_l2_ops`, `vector_ip_ops`, `vector_cosine_ops`, `vector_l1_ops`, `bit_hamming_ops`, `bit_jaccard_ops`, `halfvec_l2_ops`, `sparsevec_l2_ops` options, which are predefined types.
  *
  * **You can always specify any string you want in the operator class, in case Drizzle doesn't have it natively in its types**
  *
  * @param opClass
  * @returns
  */
  op(opClass) {
    this.indexConfig.opClass = opClass;
    return this;
  }
};
var IndexedColumn = class {
  static [entityKind] = "IndexedColumn";
  constructor(name2, keyAsName, type, indexConfig) {
    this.name = name2;
    this.keyAsName = keyAsName;
    this.type = type;
    this.indexConfig = indexConfig;
  }
  name;
  keyAsName;
  type;
  indexConfig;
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/int.common.js
var PgIntColumnBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgIntColumnBaseBuilder";
  /**
  * Adds an `ALWAYS AS IDENTITY` clause to the column definition.
  * Available for integer column types.
  */
  generatedAlwaysAsIdentity(sequence) {
    if (sequence) {
      const { name: name2, ...options } = sequence;
      this.config.generatedIdentity = {
        type: "always",
        sequenceName: name2,
        sequenceOptions: options
      };
    } else this.config.generatedIdentity = { type: "always" };
    this.config.hasDefault = true;
    this.config.notNull = true;
    return this;
  }
  /**
  * Adds a `BY DEFAULT AS IDENTITY` clause to the column definition.
  * Available for integer column types.
  */
  generatedByDefaultAsIdentity(sequence) {
    if (sequence) {
      const { name: name2, ...options } = sequence;
      this.config.generatedIdentity = {
        type: "byDefault",
        sequenceName: name2,
        sequenceOptions: options
      };
    } else this.config.generatedIdentity = { type: "byDefault" };
    this.config.hasDefault = true;
    this.config.notNull = true;
    return this;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/bigint.js
var PgBigInt53Builder = class extends PgIntColumnBuilder {
  static [entityKind] = "PgBigInt53Builder";
  constructor(name2) {
    super(name2, "number int53", "PgBigInt53");
  }
  /** @internal */
  build(table2) {
    return new PgBigInt53(table2, this.config);
  }
};
var PgBigInt53 = class extends PgColumn {
  static [entityKind] = "PgBigInt53";
  getSQLType() {
    return "bigint";
  }
  mapFromDriverValue(value) {
    if (typeof value === "number") return value;
    return Number(value);
  }
};
var PgBigInt64Builder = class extends PgIntColumnBuilder {
  static [entityKind] = "PgBigInt64Builder";
  constructor(name2) {
    super(name2, "bigint int64", "PgBigInt64");
  }
  /** @internal */
  build(table2) {
    return new PgBigInt64(table2, this.config);
  }
};
var PgBigInt64 = class extends PgColumn {
  static [entityKind] = "PgBigInt64";
  getSQLType() {
    return "bigint";
  }
  mapFromDriverValue(value) {
    return BigInt(value);
  }
};
var PgBigIntStringBuilder = class extends PgIntColumnBuilder {
  static [entityKind] = "PgBigIntStringBuilder";
  constructor(name2) {
    super(name2, "string int64", "PgBigIntString");
  }
  /** @internal */
  build(table2) {
    return new PgBigIntString(table2, this.config);
  }
};
var PgBigIntString = class extends PgColumn {
  static [entityKind] = "PgBigIntString";
  getSQLType() {
    return "bigint";
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") return value;
    return String(value);
  }
};
function bigint(a, b) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  if (config2.mode === "number") return new PgBigInt53Builder(name2);
  if (config2.mode === "string") return new PgBigIntStringBuilder(name2);
  return new PgBigInt64Builder(name2);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/bigserial.js
var PgBigSerial53Builder = class extends PgColumnBuilder {
  static [entityKind] = "PgBigSerial53Builder";
  constructor(name2) {
    super(name2, "number int53", "PgBigSerial53");
    this.config.hasDefault = true;
    this.config.notNull = true;
  }
  /** @internal */
  build(table2) {
    return new PgBigSerial53(table2, this.config);
  }
};
var PgBigSerial53 = class extends PgColumn {
  static [entityKind] = "PgBigSerial53";
  getSQLType() {
    return "bigserial";
  }
  mapFromDriverValue(value) {
    if (typeof value === "number") return value;
    return Number(value);
  }
};
var PgBigSerial64Builder = class extends PgColumnBuilder {
  static [entityKind] = "PgBigSerial64Builder";
  constructor(name2) {
    super(name2, "bigint int64", "PgBigSerial64");
    this.config.hasDefault = true;
    this.config.notNull = true;
  }
  /** @internal */
  build(table2) {
    return new PgBigSerial64(table2, this.config);
  }
};
var PgBigSerial64 = class extends PgColumn {
  static [entityKind] = "PgBigSerial64";
  getSQLType() {
    return "bigserial";
  }
  mapFromDriverValue(value) {
    return BigInt(value);
  }
};
function bigserial(a, b) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  if (config2.mode === "number") return new PgBigSerial53Builder(name2);
  return new PgBigSerial64Builder(name2);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/boolean.js
var PgBooleanBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgBooleanBuilder";
  constructor(name2) {
    super(name2, "boolean", "PgBoolean");
  }
  /** @internal */
  build(table2) {
    return new PgBoolean(table2, this.config);
  }
};
var PgBoolean = class extends PgColumn {
  static [entityKind] = "PgBoolean";
  getSQLType() {
    return "boolean";
  }
};
function boolean2(name2) {
  return new PgBooleanBuilder(name2 ?? "");
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/char.js
var PgCharBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgCharBuilder";
  constructor(name2, config2) {
    super(name2, config2.enum?.length ? "string enum" : "string", "PgChar");
    this.config.length = config2.length ?? 1;
    this.config.setLength = config2.length !== void 0;
    this.config.enumValues = config2.enum;
  }
  /** @internal */
  build(table2) {
    return new PgChar(table2, this.config);
  }
};
var PgChar = class extends PgColumn {
  static [entityKind] = "PgChar";
  enumValues;
  setLength;
  constructor(table2, config2) {
    super(table2, config2);
    this.enumValues = config2.enumValues;
    this.setLength = config2.setLength;
  }
  getSQLType() {
    return this.setLength ? `char(${this.length})` : `char`;
  }
};
function char(a, b = {}) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgCharBuilder(name2, config2);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/cidr.js
var PgCidrBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgCidrBuilder";
  constructor(name2) {
    super(name2, "string cidr", "PgCidr");
  }
  /** @internal */
  build(table2) {
    return new PgCidr(table2, this.config);
  }
};
var PgCidr = class extends PgColumn {
  static [entityKind] = "PgCidr";
  getSQLType() {
    return "cidr";
  }
};
function cidr(name2) {
  return new PgCidrBuilder(name2 ?? "");
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/custom.js
var PgCustomColumnBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgCustomColumnBuilder";
  constructor(name2, fieldConfig, customTypeParams) {
    super(name2, "custom", "PgCustomColumn");
    this.config.fieldConfig = fieldConfig;
    this.config.customTypeParams = customTypeParams;
  }
  /** @internal */
  build(table2) {
    return new PgCustomColumn(table2, this.config);
  }
};
var PgCustomColumn = class extends PgColumn {
  static [entityKind] = "PgCustomColumn";
  sqlName;
  mapTo;
  mapFrom;
  mapJson;
  forJsonSelect;
  constructor(table2, config2) {
    super(table2, config2);
    this.sqlName = config2.customTypeParams.dataType(config2.fieldConfig);
    this.mapTo = config2.customTypeParams.toDriver;
    this.mapFrom = config2.customTypeParams.fromDriver;
    this.mapJson = config2.customTypeParams.fromJson;
    this.forJsonSelect = config2.customTypeParams.forJsonSelect;
    if (this.dimensions) {
      const elementMapper = (value) => {
        if (typeof this.mapJson === "function") return this.mapJson(value);
        if (typeof this.mapFrom === "function") return this.mapFrom(value);
        return value;
      };
      this.mapFromJsonValue = (value) => {
        if (value === null) return value;
        const arr = typeof value === "string" ? parsePgArray(value) : value;
        return this.mapJsonArrayElements(arr, elementMapper, this.dimensions);
      };
    }
  }
  /** @internal */
  mapJsonArrayElements(value, mapper, depth) {
    if (depth > 0 && Array.isArray(value)) return value.map((v) => v === null ? null : this.mapJsonArrayElements(v, mapper, depth - 1));
    return mapper(value);
  }
  getSQLType() {
    return this.sqlName;
  }
  mapFromDriverValue(value) {
    return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
  }
  mapFromJsonValue(value) {
    return typeof this.mapJson === "function" ? this.mapJson(value) : this.mapFromDriverValue(value);
  }
  jsonSelectIdentifier(identifier, sql2, arrayDimensions) {
    if (typeof this.forJsonSelect === "function") return this.forJsonSelect(identifier, sql2, arrayDimensions);
    const rawType = this.getSQLType().toLowerCase();
    const parenPos = rawType.indexOf("(");
    switch (parenPos + 1 ? rawType.slice(0, parenPos) : rawType) {
      case "bytea":
      case "geometry":
      case "timestamp":
      case "numeric":
      case "bigint": {
        const arrVal = "[]".repeat(arrayDimensions ?? 0);
        return sql2`${identifier}::text${sql2.raw(arrVal).if(arrayDimensions)}`;
      }
      default:
        return identifier;
    }
  }
  mapToDriverValue(value) {
    return typeof this.mapTo === "function" ? this.mapTo(value) : value;
  }
};
function customType(customTypeParams) {
  return (a, b) => {
    const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
    return new PgCustomColumnBuilder(name2, config2, customTypeParams);
  };
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/date.common.js
var PgDateColumnBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgDateColumnBaseBuilder";
  /**
  * Adds a `default now()` clause to the column definition.
  * Available for date/time column types.
  */
  defaultNow() {
    return this.default(sql`now()`);
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/date.js
var PgDateBuilder = class extends PgDateColumnBuilder {
  static [entityKind] = "PgDateBuilder";
  constructor(name2) {
    super(name2, "object date", "PgDate");
  }
  /** @internal */
  build(table2) {
    return new PgDate(table2, this.config);
  }
};
var PgDate = class extends PgColumn {
  static [entityKind] = "PgDate";
  getSQLType() {
    return "date";
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") return new Date(value);
    return value;
  }
  mapToDriverValue(value) {
    if (typeof value === "string") return value;
    return value.toISOString();
  }
};
var PgDateStringBuilder = class extends PgDateColumnBuilder {
  static [entityKind] = "PgDateStringBuilder";
  constructor(name2) {
    super(name2, "string date", "PgDateString");
  }
  /** @internal */
  build(table2) {
    return new PgDateString(table2, this.config);
  }
};
var PgDateString = class extends PgColumn {
  static [entityKind] = "PgDateString";
  getSQLType() {
    return "date";
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") return value;
    return value.toISOString().slice(0, -14);
  }
  mapToDriverValue(value) {
    if (typeof value === "string") return value;
    return value.toISOString();
  }
};
function date(a, b) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  if (config2?.mode === "date") return new PgDateBuilder(name2);
  return new PgDateStringBuilder(name2);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/double-precision.js
var PgDoublePrecisionBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgDoublePrecisionBuilder";
  constructor(name2) {
    super(name2, "number double", "PgDoublePrecision");
  }
  /** @internal */
  build(table2) {
    return new PgDoublePrecision(table2, this.config);
  }
};
var PgDoublePrecision = class extends PgColumn {
  static [entityKind] = "PgDoublePrecision";
  getSQLType() {
    return "double precision";
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") return Number.parseFloat(value);
    return value;
  }
};
function doublePrecision(name2) {
  return new PgDoublePrecisionBuilder(name2 ?? "");
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/inet.js
var PgInetBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgInetBuilder";
  constructor(name2) {
    super(name2, "string inet", "PgInet");
  }
  /** @internal */
  build(table2) {
    return new PgInet(table2, this.config);
  }
};
var PgInet = class extends PgColumn {
  static [entityKind] = "PgInet";
  getSQLType() {
    return "inet";
  }
};
function inet(name2) {
  return new PgInetBuilder(name2 ?? "");
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/integer.js
var PgIntegerBuilder = class extends PgIntColumnBuilder {
  static [entityKind] = "PgIntegerBuilder";
  constructor(name2) {
    super(name2, "number int32", "PgInteger");
  }
  /** @internal */
  build(table2) {
    return new PgInteger(table2, this.config);
  }
};
var PgInteger = class extends PgColumn {
  static [entityKind] = "PgInteger";
  getSQLType() {
    return "integer";
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") return Number.parseInt(value);
    return value;
  }
};
function integer(name2) {
  return new PgIntegerBuilder(name2 ?? "");
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/interval.js
var PgIntervalBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgIntervalBuilder";
  constructor(name2, intervalConfig) {
    super(name2, "string interval", "PgInterval");
    this.config.intervalConfig = intervalConfig;
  }
  /** @internal */
  build(table2) {
    return new PgInterval(table2, this.config);
  }
};
var PgInterval = class extends PgColumn {
  static [entityKind] = "PgInterval";
  fields;
  precision;
  constructor(table2, config2) {
    super(table2, config2);
    this.fields = config2.intervalConfig.fields;
    this.precision = config2.intervalConfig.precision;
  }
  getSQLType() {
    return `interval${this.fields ? ` ${this.fields}` : ""}${this.precision ? `(${this.precision})` : ""}`;
  }
};
function interval(a, b = {}) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgIntervalBuilder(name2, config2);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/json.js
var PgJsonBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgJsonBuilder";
  constructor(name2) {
    super(name2, "object json", "PgJson");
  }
  /** @internal */
  build(table2) {
    return new PgJson(table2, this.config);
  }
};
var PgJson = class extends PgColumn {
  static [entityKind] = "PgJson";
  constructor(table2, config2) {
    super(table2, config2);
  }
  getSQLType() {
    return "json";
  }
  mapToDriverValue(value) {
    return JSON.stringify(value);
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") try {
      return JSON.parse(value);
    } catch {
      return value;
    }
    return value;
  }
};
function json(name2) {
  return new PgJsonBuilder(name2 ?? "");
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/jsonb.js
var PgJsonbBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgJsonbBuilder";
  constructor(name2) {
    super(name2, "object json", "PgJsonb");
  }
  /** @internal */
  build(table2) {
    return new PgJsonb(table2, this.config);
  }
};
var PgJsonb = class extends PgColumn {
  static [entityKind] = "PgJsonb";
  constructor(table2, config2) {
    super(table2, config2);
  }
  getSQLType() {
    return "jsonb";
  }
  mapToDriverValue(value) {
    return JSON.stringify(value);
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") try {
      return JSON.parse(value);
    } catch {
      return value;
    }
    return value;
  }
};
function jsonb(name2) {
  return new PgJsonbBuilder(name2 ?? "");
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/line.js
var PgLineBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgLineBuilder";
  constructor(name2) {
    super(name2, "array line", "PgLine");
  }
  /** @internal */
  build(table2) {
    return new PgLineTuple(table2, this.config);
  }
};
var PgLineTuple = class extends PgColumn {
  static [entityKind] = "PgLine";
  mode = "tuple";
  getSQLType() {
    return "line";
  }
  mapFromDriverValue(value) {
    const [a, b, c] = value.slice(1, -1).split(",");
    return [
      Number.parseFloat(a),
      Number.parseFloat(b),
      Number.parseFloat(c)
    ];
  }
  mapToDriverValue(value) {
    return `{${value[0]},${value[1]},${value[2]}}`;
  }
};
var PgLineABCBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgLineABCBuilder";
  constructor(name2) {
    super(name2, "object line", "PgLineABC");
  }
  /** @internal */
  build(table2) {
    return new PgLineABC(table2, this.config);
  }
};
var PgLineABC = class extends PgColumn {
  static [entityKind] = "PgLineABC";
  mode = "abc";
  getSQLType() {
    return "line";
  }
  mapFromDriverValue(value) {
    const [a, b, c] = value.slice(1, -1).split(",");
    return {
      a: Number.parseFloat(a),
      b: Number.parseFloat(b),
      c: Number.parseFloat(c)
    };
  }
  mapToDriverValue(value) {
    return `{${value.a},${value.b},${value.c}}`;
  }
};
function line(a, b) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  if (!config2?.mode || config2.mode === "tuple") return new PgLineBuilder(name2);
  return new PgLineABCBuilder(name2);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/macaddr.js
var PgMacaddrBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgMacaddrBuilder";
  constructor(name2) {
    super(name2, "string macaddr", "PgMacaddr");
  }
  /** @internal */
  build(table2) {
    return new PgMacaddr(table2, this.config);
  }
};
var PgMacaddr = class extends PgColumn {
  static [entityKind] = "PgMacaddr";
  getSQLType() {
    return "macaddr";
  }
};
function macaddr(name2) {
  return new PgMacaddrBuilder(name2 ?? "");
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/macaddr8.js
var PgMacaddr8Builder = class extends PgColumnBuilder {
  static [entityKind] = "PgMacaddr8Builder";
  constructor(name2) {
    super(name2, "string macaddr8", "PgMacaddr8");
  }
  /** @internal */
  build(table2) {
    return new PgMacaddr8(table2, this.config);
  }
};
var PgMacaddr8 = class extends PgColumn {
  static [entityKind] = "PgMacaddr8";
  getSQLType() {
    return "macaddr8";
  }
};
function macaddr8(name2) {
  return new PgMacaddr8Builder(name2 ?? "");
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/numeric.js
var PgNumericBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgNumericBuilder";
  constructor(name2, precision, scale) {
    super(name2, "string numeric", "PgNumeric");
    this.config.precision = precision;
    this.config.scale = scale;
  }
  /** @internal */
  build(table2) {
    return new PgNumeric(table2, this.config);
  }
};
var PgNumeric = class extends PgColumn {
  static [entityKind] = "PgNumeric";
  precision;
  scale;
  constructor(table2, config2) {
    super(table2, config2);
    this.precision = config2.precision;
    this.scale = config2.scale;
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") return value;
    return String(value);
  }
  getSQLType() {
    if (this.precision !== void 0 && this.scale !== void 0) return `numeric(${this.precision}, ${this.scale})`;
    else if (this.precision === void 0) return "numeric";
    else return `numeric(${this.precision})`;
  }
};
var PgNumericNumberBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgNumericNumberBuilder";
  constructor(name2, precision, scale) {
    super(name2, "number", "PgNumericNumber");
    this.config.precision = precision;
    this.config.scale = scale;
  }
  /** @internal */
  build(table2) {
    return new PgNumericNumber(table2, this.config);
  }
};
var PgNumericNumber = class extends PgColumn {
  static [entityKind] = "PgNumericNumber";
  precision;
  scale;
  constructor(table2, config2) {
    super(table2, config2);
    this.precision = config2.precision;
    this.scale = config2.scale;
  }
  mapFromDriverValue(value) {
    if (typeof value === "number") return value;
    return Number(value);
  }
  mapToDriverValue(value) {
    return String(value);
  }
  getSQLType() {
    if (this.precision !== void 0 && this.scale !== void 0) return `numeric(${this.precision}, ${this.scale})`;
    else if (this.precision === void 0) return "numeric";
    else return `numeric(${this.precision})`;
  }
};
var PgNumericBigIntBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgNumericBigIntBuilder";
  constructor(name2, precision, scale) {
    super(name2, "bigint int64", "PgNumericBigInt");
    this.config.precision = precision;
    this.config.scale = scale;
  }
  /** @internal */
  build(table2) {
    return new PgNumericBigInt(table2, this.config);
  }
};
var PgNumericBigInt = class extends PgColumn {
  static [entityKind] = "PgNumericBigInt";
  precision;
  scale;
  constructor(table2, config2) {
    super(table2, config2);
    this.precision = config2.precision;
    this.scale = config2.scale;
  }
  mapFromDriverValue(value) {
    return BigInt(value);
  }
  mapToDriverValue(value) {
    return String(value);
  }
  getSQLType() {
    if (this.precision !== void 0 && this.scale !== void 0) return `numeric(${this.precision}, ${this.scale})`;
    else if (this.precision === void 0) return "numeric";
    else return `numeric(${this.precision})`;
  }
};
function numeric(a, b) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  const mode = config2?.mode;
  return mode === "number" ? new PgNumericNumberBuilder(name2, config2?.precision, config2?.scale) : mode === "bigint" ? new PgNumericBigIntBuilder(name2, config2?.precision, config2?.scale) : new PgNumericBuilder(name2, config2?.precision, config2?.scale);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/point.js
var PgPointTupleBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgPointTupleBuilder";
  constructor(name2) {
    super(name2, "array point", "PgPointTuple");
  }
  /** @internal */
  build(table2) {
    return new PgPointTuple(table2, this.config);
  }
};
var PgPointTuple = class extends PgColumn {
  static [entityKind] = "PgPointTuple";
  mode = "tuple";
  getSQLType() {
    return "point";
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") {
      const [x, y] = value.slice(1, -1).split(",");
      return [Number.parseFloat(x), Number.parseFloat(y)];
    }
    return [value.x, value.y];
  }
  mapToDriverValue(value) {
    return `(${value[0]},${value[1]})`;
  }
};
var PgPointObjectBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgPointObjectBuilder";
  constructor(name2) {
    super(name2, "object point", "PgPointObject");
  }
  /** @internal */
  build(table2) {
    return new PgPointObject(table2, this.config);
  }
};
var PgPointObject = class extends PgColumn {
  static [entityKind] = "PgPointObject";
  mode = "xy";
  getSQLType() {
    return "point";
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") {
      const [x, y] = value.slice(1, -1).split(",");
      return {
        x: Number.parseFloat(x),
        y: Number.parseFloat(y)
      };
    }
    return value;
  }
  mapToDriverValue(value) {
    return `(${value.x},${value.y})`;
  }
};
function point(a, b) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  if (!config2?.mode || config2.mode === "tuple") return new PgPointTupleBuilder(name2);
  return new PgPointObjectBuilder(name2);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/postgis_extension/utils.js
function hexToBytes(hex) {
  const bytes = [];
  for (let c = 0; c < hex.length; c += 2) bytes.push(Number.parseInt(hex.slice(c, c + 2), 16));
  return new Uint8Array(bytes);
}
function bytesToFloat64(bytes, offset) {
  const buffer = /* @__PURE__ */ new ArrayBuffer(8);
  const view = new DataView(buffer);
  for (let i = 0; i < 8; i++) view.setUint8(i, bytes[offset + i]);
  return view.getFloat64(0, true);
}
function parseEWKB(hex) {
  const bytes = hexToBytes(hex);
  let offset = 0;
  const byteOrder = bytes[offset];
  offset += 1;
  const view = new DataView(bytes.buffer);
  const geomType = view.getUint32(offset, byteOrder === 1);
  offset += 4;
  let srid;
  if (geomType & 536870912) {
    srid = view.getUint32(offset, byteOrder === 1);
    offset += 4;
  }
  if ((geomType & 65535) === 1) {
    const x = bytesToFloat64(bytes, offset);
    offset += 8;
    const y = bytesToFloat64(bytes, offset);
    offset += 8;
    return {
      srid,
      point: [x, y]
    };
  }
  throw new Error("Unsupported geometry type");
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/postgis_extension/geometry.js
var PgGeometryBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgGeometryBuilder";
  constructor(name2, srid) {
    super(name2, "array geometry", "PgGeometry");
    this.config.srid = srid;
  }
  /** @internal */
  build(table2) {
    return new PgGeometry(table2, this.config);
  }
};
var PgGeometry = class extends PgColumn {
  static [entityKind] = "PgGeometry";
  srid = this.config.srid;
  mode = "tuple";
  getSQLType() {
    return `geometry(point${this.srid === void 0 ? "" : `,${this.srid}`})`;
  }
  mapFromDriverValue(value) {
    if (typeof value !== "string") return value;
    return parseEWKB(value).point;
  }
  mapToDriverValue(value) {
    return `point(${value[0]} ${value[1]})`;
  }
};
var PgGeometryObjectBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgGeometryObjectBuilder";
  constructor(name2, srid) {
    super(name2, "object geometry", "PgGeometryObject");
    this.config.srid = srid;
  }
  /** @internal */
  build(table2) {
    return new PgGeometryObject(table2, this.config);
  }
};
var PgGeometryObject = class extends PgColumn {
  static [entityKind] = "PgGeometryObject";
  srid = this.config.srid;
  mode = "object";
  getSQLType() {
    return `geometry(point${this.srid === void 0 ? "" : `,${this.srid}`})`;
  }
  mapFromDriverValue(value) {
    const parsed = parseEWKB(value);
    return {
      x: parsed.point[0],
      y: parsed.point[1]
    };
  }
  mapToDriverValue(value) {
    return `point(${value.x} ${value.y})`;
  }
};
function geometry(a, b) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  if (!config2?.mode || config2.mode === "tuple") return new PgGeometryBuilder(name2, config2?.srid);
  return new PgGeometryObjectBuilder(name2, config2?.srid);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/real.js
var PgRealBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgRealBuilder";
  constructor(name2, length) {
    super(name2, "number float", "PgReal");
    this.config.length = length;
  }
  /** @internal */
  build(table2) {
    return new PgReal(table2, this.config);
  }
};
var PgReal = class extends PgColumn {
  static [entityKind] = "PgReal";
  constructor(table2, config2) {
    super(table2, config2);
  }
  getSQLType() {
    return "real";
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") return Number.parseFloat(value);
    return value;
  }
};
function real(name2) {
  return new PgRealBuilder(name2 ?? "");
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/serial.js
var PgSerialBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgSerialBuilder";
  constructor(name2) {
    super(name2, "number int32", "PgSerial");
    this.config.hasDefault = true;
    this.config.notNull = true;
  }
  /** @internal */
  build(table2) {
    return new PgSerial(table2, this.config);
  }
};
var PgSerial = class extends PgColumn {
  static [entityKind] = "PgSerial";
  getSQLType() {
    return "serial";
  }
};
function serial(name2) {
  return new PgSerialBuilder(name2 ?? "");
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/smallint.js
var PgSmallIntBuilder = class extends PgIntColumnBuilder {
  static [entityKind] = "PgSmallIntBuilder";
  constructor(name2) {
    super(name2, "number int16", "PgSmallInt");
  }
  /** @internal */
  build(table2) {
    return new PgSmallInt(table2, this.config);
  }
};
var PgSmallInt = class extends PgColumn {
  static [entityKind] = "PgSmallInt";
  getSQLType() {
    return "smallint";
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") return Number(value);
    return value;
  }
};
function smallint(name2) {
  return new PgSmallIntBuilder(name2 ?? "");
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/smallserial.js
var PgSmallSerialBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgSmallSerialBuilder";
  constructor(name2) {
    super(name2, "number int16", "PgSmallSerial");
    this.config.hasDefault = true;
    this.config.notNull = true;
  }
  /** @internal */
  build(table2) {
    return new PgSmallSerial(table2, this.config);
  }
};
var PgSmallSerial = class extends PgColumn {
  static [entityKind] = "PgSmallSerial";
  getSQLType() {
    return "smallserial";
  }
};
function smallserial(name2) {
  return new PgSmallSerialBuilder(name2 ?? "");
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/text.js
var PgTextBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgTextBuilder";
  constructor(name2, config2) {
    super(name2, config2.enum?.length ? "string enum" : "string", "PgText");
    this.config.enumValues = config2.enum;
  }
  /** @internal */
  build(table2) {
    return new PgText(table2, this.config, this.config.enumValues);
  }
};
var PgText = class extends PgColumn {
  static [entityKind] = "PgText";
  enumValues;
  constructor(table2, config2, enumValues) {
    super(table2, config2);
    this.enumValues = enumValues;
  }
  getSQLType() {
    return "text";
  }
};
function text(a, b = {}) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgTextBuilder(name2, config2);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/time.js
var PgTimeBuilder = class extends PgDateColumnBuilder {
  static [entityKind] = "PgTimeBuilder";
  constructor(name2, withTimezone, precision) {
    super(name2, "string time", "PgTime");
    this.withTimezone = withTimezone;
    this.precision = precision;
    this.config.withTimezone = withTimezone;
    this.config.precision = precision;
  }
  /** @internal */
  build(table2) {
    return new PgTime(table2, this.config);
  }
};
var PgTime = class extends PgColumn {
  static [entityKind] = "PgTime";
  withTimezone;
  precision;
  constructor(table2, config2) {
    super(table2, config2);
    this.withTimezone = config2.withTimezone;
    this.precision = config2.precision;
  }
  getSQLType() {
    return `time${this.precision === void 0 ? "" : `(${this.precision})`}${this.withTimezone ? " with time zone" : ""}`;
  }
};
function time(a, b = {}) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgTimeBuilder(name2, config2.withTimezone ?? false, config2.precision);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/timestamp.js
var PgTimestampBuilder = class extends PgDateColumnBuilder {
  static [entityKind] = "PgTimestampBuilder";
  constructor(name2, withTimezone, precision) {
    super(name2, "object date", "PgTimestamp");
    this.config.withTimezone = withTimezone;
    this.config.precision = precision;
  }
  /** @internal */
  build(table2) {
    return new PgTimestamp(table2, this.config);
  }
};
var PgTimestamp = class extends PgColumn {
  static [entityKind] = "PgTimestamp";
  withTimezone;
  precision;
  constructor(table2, config2) {
    super(table2, config2);
    this.withTimezone = config2.withTimezone;
    this.precision = config2.precision;
  }
  getSQLType() {
    return `timestamp${this.precision === void 0 ? "" : ` (${this.precision})`}${this.withTimezone ? " with time zone" : ""}`;
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") return new Date(this.withTimezone ? value : value + "+0000");
    return value;
  }
  mapToDriverValue(value) {
    if (typeof value === "string") return value;
    return value.toISOString();
  }
};
var PgTimestampStringBuilder = class extends PgDateColumnBuilder {
  static [entityKind] = "PgTimestampStringBuilder";
  constructor(name2, withTimezone, precision) {
    super(name2, "string timestamp", "PgTimestampString");
    this.config.withTimezone = withTimezone;
    this.config.precision = precision;
  }
  /** @internal */
  build(table2) {
    return new PgTimestampString(table2, this.config);
  }
};
var PgTimestampString = class extends PgColumn {
  static [entityKind] = "PgTimestampString";
  withTimezone;
  precision;
  constructor(table2, config2) {
    super(table2, config2);
    this.withTimezone = config2.withTimezone;
    this.precision = config2.precision;
  }
  getSQLType() {
    return `timestamp${this.precision === void 0 ? "" : `(${this.precision})`}${this.withTimezone ? " with time zone" : ""}`;
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") return value;
    const shortened = value.toISOString().slice(0, -1).replace("T", " ");
    if (this.withTimezone) return `${shortened}+00`;
    return shortened;
  }
  mapToDriverValue(value) {
    if (typeof value === "string") return value;
    return value.toISOString();
  }
};
function timestamp(a, b = {}) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  if (config2?.mode === "string") return new PgTimestampStringBuilder(name2, config2.withTimezone ?? false, config2.precision);
  return new PgTimestampBuilder(name2, config2?.withTimezone ?? false, config2?.precision);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/uuid.js
var PgUUIDBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgUUIDBuilder";
  constructor(name2) {
    super(name2, "string uuid", "PgUUID");
  }
  /**
  * Adds `default gen_random_uuid()` to the column definition.
  */
  defaultRandom() {
    return this.default(sql`gen_random_uuid()`);
  }
  /** @internal */
  build(table2) {
    return new PgUUID(table2, this.config);
  }
};
var PgUUID = class extends PgColumn {
  static [entityKind] = "PgUUID";
  getSQLType() {
    return "uuid";
  }
};
function uuid(name2) {
  return new PgUUIDBuilder(name2 ?? "");
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/varchar.js
var PgVarcharBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgVarcharBuilder";
  constructor(name2, config2) {
    super(name2, config2.enum?.length ? "string enum" : "string", "PgVarchar");
    this.config.length = config2.length;
    this.config.enumValues = config2.enum;
  }
  /** @internal */
  build(table2) {
    return new PgVarchar(table2, this.config);
  }
};
var PgVarchar = class extends PgColumn {
  static [entityKind] = "PgVarchar";
  enumValues;
  constructor(table2, config2) {
    super(table2, config2);
    this.enumValues = config2.enumValues;
  }
  getSQLType() {
    return this.length === void 0 ? `varchar` : `varchar(${this.length})`;
  }
};
function varchar(a, b = {}) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgVarcharBuilder(name2, config2);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/vector_extension/bit.js
var PgBinaryVectorBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgBinaryVectorBuilder";
  constructor(name2, config2) {
    super(name2, "string binary", "PgBinaryVector");
    this.config.length = config2.dimensions;
    this.config.isLengthExact = true;
  }
  /** @internal */
  build(table2) {
    return new PgBinaryVector(table2, this.config);
  }
};
var PgBinaryVector = class extends PgColumn {
  static [entityKind] = "PgBinaryVector";
  getSQLType() {
    return `bit(${this.length})`;
  }
};
function bit(a, b) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgBinaryVectorBuilder(name2, config2);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/vector_extension/halfvec.js
var PgHalfVectorBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgHalfVectorBuilder";
  constructor(name2, config2) {
    super(name2, "array halfvector", "PgHalfVector");
    this.config.length = config2.dimensions;
    this.config.isLengthExact = true;
  }
  /** @internal */
  build(table2) {
    return new PgHalfVector(table2, this.config);
  }
};
var PgHalfVector = class extends PgColumn {
  static [entityKind] = "PgHalfVector";
  getSQLType() {
    return `halfvec(${this.length})`;
  }
  mapToDriverValue(value) {
    return JSON.stringify(value);
  }
  mapFromDriverValue(value) {
    return value.slice(1, -1).split(",").map((v) => Number.parseFloat(v));
  }
};
function halfvec(a, b) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgHalfVectorBuilder(name2, config2);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/vector_extension/sparsevec.js
var PgSparseVectorBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgSparseVectorBuilder";
  constructor(name2, config2) {
    super(name2, "string sparsevec", "PgSparseVector");
    this.config.vectorDimensions = config2.dimensions;
  }
  /** @internal */
  build(table2) {
    return new PgSparseVector(table2, this.config);
  }
};
var PgSparseVector = class extends PgColumn {
  static [entityKind] = "PgSparseVector";
  vectorDimensions = this.config.vectorDimensions;
  getSQLType() {
    return `sparsevec(${this.vectorDimensions})`;
  }
};
function sparsevec(a, b) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgSparseVectorBuilder(name2, config2);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/vector_extension/vector.js
var PgVectorBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgVectorBuilder";
  constructor(name2, config2) {
    super(name2, "array vector", "PgVector");
    this.config.length = config2.dimensions;
    this.config.isLengthExact = true;
  }
  /** @internal */
  build(table2) {
    return new PgVector(table2, this.config);
  }
};
var PgVector = class extends PgColumn {
  static [entityKind] = "PgVector";
  getSQLType() {
    return `vector(${this.length})`;
  }
  mapToDriverValue(value) {
    return JSON.stringify(value);
  }
  mapFromDriverValue(value) {
    return value.slice(1, -1).split(",").map((v) => Number.parseFloat(v));
  }
};
function vector(a, b) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  return new PgVectorBuilder(name2, config2);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/columns/all.js
function getPgColumnBuilders() {
  return {
    bigint,
    bigserial,
    boolean: boolean2,
    char,
    cidr,
    customType,
    date,
    doublePrecision,
    inet,
    integer,
    interval,
    json,
    jsonb,
    line,
    macaddr,
    macaddr8,
    numeric,
    point,
    geometry,
    real,
    serial,
    smallint,
    smallserial,
    text,
    time,
    timestamp,
    uuid,
    varchar,
    bit,
    halfvec,
    sparsevec,
    vector
  };
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/table.js
var InlineForeignKeys = /* @__PURE__ */ Symbol.for("drizzle:PgInlineForeignKeys");
var EnableRLS = /* @__PURE__ */ Symbol.for("drizzle:EnableRLS");
var PgTable = class extends Table {
  static [entityKind] = "PgTable";
  /** @internal */
  static Symbol = Object.assign({}, Table.Symbol, {
    InlineForeignKeys,
    EnableRLS
  });
  /**@internal */
  [InlineForeignKeys] = [];
  /** @internal */
  [EnableRLS] = false;
  /** @internal */
  [Table.Symbol.ExtraConfigBuilder] = void 0;
  /** @internal */
  [Table.Symbol.ExtraConfigColumns] = {};
};
function pgTableWithSchema(name2, columns, extraConfig, schema, baseName = name2) {
  const rawTable = new PgTable(name2, schema, baseName);
  const parsedColumns = typeof columns === "function" ? columns(getPgColumnBuilders()) : columns;
  const builtColumns = Object.fromEntries(Object.entries(parsedColumns).map(([name3, colBuilderBase]) => {
    const colBuilder = colBuilderBase;
    colBuilder.setName(name3);
    const column = colBuilder.build(rawTable);
    rawTable[InlineForeignKeys].push(...colBuilder.buildForeignKeys(column, rawTable));
    return [name3, column];
  }));
  const builtColumnsForExtraConfig = Object.fromEntries(Object.entries(parsedColumns).map(([name3, colBuilderBase]) => {
    const colBuilder = colBuilderBase;
    colBuilder.setName(name3);
    return [name3, colBuilder.buildExtraConfigColumn(rawTable)];
  }));
  const table2 = Object.assign(rawTable, builtColumns);
  table2[Table.Symbol.Columns] = builtColumns;
  table2[Table.Symbol.ExtraConfigColumns] = builtColumnsForExtraConfig;
  if (extraConfig) table2[PgTable.Symbol.ExtraConfigBuilder] = extraConfig;
  return Object.assign(table2, { enableRLS: () => {
    table2[PgTable.Symbol.EnableRLS] = true;
    return table2;
  } });
}
var pgTableInternal = (name2, columns, extraConfig) => {
  return pgTableWithSchema(name2, columns, extraConfig, void 0);
};
var pgTableWithRLS = (name2, columns, extraConfig) => {
  const table2 = pgTableWithSchema(name2, columns, extraConfig, void 0);
  table2[EnableRLS] = true;
  return table2;
};
var pgTable = Object.assign(pgTableInternal, { withRLS: pgTableWithRLS });

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/pg-core/primary-keys.js
var PrimaryKeyBuilder = class {
  static [entityKind] = "PgPrimaryKeyBuilder";
  /** @internal */
  columns;
  /** @internal */
  name;
  constructor(columns, name2) {
    this.columns = columns;
    this.name = name2;
  }
  /** @internal */
  build(table2) {
    return new PrimaryKey(table2, this.columns, this.name);
  }
};
var PrimaryKey = class {
  static [entityKind] = "PgPrimaryKey";
  columns;
  name;
  isNameExplicit;
  constructor(table2, columns, name2) {
    this.table = table2;
    this.columns = columns;
    this.name = name2;
    this.isNameExplicit = !!name2;
  }
  getName() {
    return this.name ?? `${this.table[PgTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/_relations.js
var Relation = class {
  static [entityKind] = "Relation";
  referencedTableName;
  fieldName;
  constructor(sourceTable, referencedTable, relationName) {
    this.sourceTable = sourceTable;
    this.referencedTable = referencedTable;
    this.relationName = relationName;
    this.referencedTableName = referencedTable[Table.Symbol.Name];
  }
};
var Relations = class {
  static [entityKind] = "Relations";
  constructor(table2, config2) {
    this.table = table2;
    this.config = config2;
  }
};
var One = class One2 extends Relation {
  static [entityKind] = "One";
  constructor(sourceTable, referencedTable, config2, isNullable) {
    super(sourceTable, referencedTable, config2?.relationName);
    this.config = config2;
    this.isNullable = isNullable;
  }
  withFieldName(fieldName) {
    const relation = new One2(this.sourceTable, this.referencedTable, this.config, this.isNullable);
    relation.fieldName = fieldName;
    return relation;
  }
};
var Many = class Many2 extends Relation {
  static [entityKind] = "Many";
  constructor(sourceTable, referencedTable, config2) {
    super(sourceTable, referencedTable, config2?.relationName);
    this.config = config2;
  }
  withFieldName(fieldName) {
    const relation = new Many2(this.sourceTable, this.referencedTable, this.config);
    relation.fieldName = fieldName;
    return relation;
  }
};
function getOperators() {
  return {
    and,
    between,
    eq,
    exists,
    gt,
    gte,
    ilike,
    inArray,
    isNull,
    isNotNull,
    like,
    lt,
    lte,
    ne,
    not,
    notBetween,
    notExists,
    notLike,
    notIlike,
    notInArray,
    or,
    sql
  };
}
function getOrderByOperators() {
  return {
    sql,
    asc,
    desc
  };
}
function extractTablesRelationalConfig(schema, configHelpers) {
  if (Object.keys(schema).length === 1 && "default" in schema && !is(schema["default"], Table)) schema = schema["default"];
  const tableNamesMap = {};
  const relationsBuffer = {};
  const tablesConfig = {};
  for (const [key, value] of Object.entries(schema)) if (is(value, Table)) {
    const dbName = getTableUniqueName(value);
    const bufferedRelations = relationsBuffer[dbName];
    tableNamesMap[dbName] = key;
    tablesConfig[key] = {
      tsName: key,
      dbName: value[Table.Symbol.Name],
      schema: value[Table.Symbol.Schema],
      columns: value[Table.Symbol.Columns],
      relations: bufferedRelations?.relations ?? {},
      primaryKey: bufferedRelations?.primaryKey ?? []
    };
    for (const column of Object.values(value[Table.Symbol.Columns])) if (column.primary) tablesConfig[key].primaryKey.push(column);
    const extraConfig = value[Table.Symbol.ExtraConfigBuilder]?.(value[Table.Symbol.ExtraConfigColumns]);
    if (extraConfig) {
      for (const configEntry of Object.values(extraConfig)) if (is(configEntry, PrimaryKeyBuilder)) tablesConfig[key].primaryKey.push(...configEntry.columns);
    }
  } else if (is(value, Relations)) {
    const dbName = getTableUniqueName(value.table);
    const tableName = tableNamesMap[dbName];
    const relations2 = value.config(configHelpers(value.table));
    for (const [relationName, relation] of Object.entries(relations2)) if (tableName) {
      const tableConfig = tablesConfig[tableName];
      tableConfig.relations[relationName] = relation;
    } else {
      if (!(dbName in relationsBuffer)) relationsBuffer[dbName] = { relations: {} };
      relationsBuffer[dbName].relations[relationName] = relation;
    }
  }
  return {
    tables: tablesConfig,
    tableNamesMap
  };
}
function createOne(sourceTable) {
  return function one(table2, config2) {
    return new One(sourceTable, table2, config2, config2?.fields.reduce((res, f) => res && f.notNull, true) ?? false);
  };
}
function createMany(sourceTable) {
  return function many(referencedTable, config2) {
    return new Many(sourceTable, referencedTable, config2);
  };
}
function normalizeRelation(schema, tableNamesMap, relation) {
  if (is(relation, One) && relation.config) return {
    fields: relation.config.fields,
    references: relation.config.references
  };
  const referencedTableTsName = tableNamesMap[getTableUniqueName(relation.referencedTable)];
  if (!referencedTableTsName) throw new Error(`Table "${relation.referencedTable[Table.Symbol.Name]}" not found in schema`);
  const referencedTableConfig = schema[referencedTableTsName];
  if (!referencedTableConfig) throw new Error(`Table "${referencedTableTsName}" not found in schema`);
  const sourceTable = relation.sourceTable;
  const sourceTableTsName = tableNamesMap[getTableUniqueName(sourceTable)];
  if (!sourceTableTsName) throw new Error(`Table "${sourceTable[Table.Symbol.Name]}" not found in schema`);
  const reverseRelations = [];
  for (const referencedTableRelation of Object.values(referencedTableConfig.relations)) if (relation.relationName && relation !== referencedTableRelation && referencedTableRelation.relationName === relation.relationName || !relation.relationName && referencedTableRelation.referencedTable === relation.sourceTable) reverseRelations.push(referencedTableRelation);
  if (reverseRelations.length > 1) throw relation.relationName ? /* @__PURE__ */ new Error(`There are multiple relations with name "${relation.relationName}" in table "${referencedTableTsName}"`) : /* @__PURE__ */ new Error(`There are multiple relations between "${referencedTableTsName}" and "${relation.sourceTable[Table.Symbol.Name]}". Please specify relation name`);
  if (reverseRelations[0] && is(reverseRelations[0], One) && reverseRelations[0].config) return {
    fields: reverseRelations[0].config.references,
    references: reverseRelations[0].config.fields
  };
  throw new Error(`There is not enough information to infer relation "${sourceTableTsName}.${relation.fieldName}"`);
}
function createTableRelationsHelpers(sourceTable) {
  return {
    one: createOne(sourceTable),
    many: createMany(sourceTable)
  };
}
function mapRelationalRow(tablesConfig, tableConfig, row, buildQueryResultSelection, mapColumnValue = (value) => value) {
  const result = {};
  for (const [selectionItemIndex, selectionItem] of buildQueryResultSelection.entries()) if (selectionItem.isJson) {
    const relation = tableConfig.relations[selectionItem.tsKey];
    const rawSubRows = row[selectionItemIndex];
    const subRows = typeof rawSubRows === "string" ? JSON.parse(rawSubRows) : rawSubRows;
    result[selectionItem.tsKey] = is(relation, One) ? subRows && mapRelationalRow(tablesConfig, tablesConfig[selectionItem.relationTableTsKey], subRows, selectionItem.selection, mapColumnValue) : subRows.map((subRow) => mapRelationalRow(tablesConfig, tablesConfig[selectionItem.relationTableTsKey], subRow, selectionItem.selection, mapColumnValue));
  } else {
    const value = mapColumnValue(row[selectionItemIndex]);
    const field = selectionItem.field;
    let decoder;
    if (is(field, Column)) decoder = field;
    else if (is(field, SQL)) decoder = field.decoder;
    else decoder = field.sql.decoder;
    result[selectionItem.tsKey] = value === null ? null : decoder.mapFromDriverValue(value);
  }
  return result;
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/query-promise.js
var QueryPromise = class {
  static [entityKind] = "QueryPromise";
  [Symbol.toStringTag] = "QueryPromise";
  catch(onRejected) {
    return this.then(void 0, onRejected);
  }
  finally(onFinally) {
    return this.then((value) => {
      onFinally?.();
      return value;
    }, (reason) => {
      onFinally?.();
      throw reason;
    });
  }
  then(onFulfilled, onRejected) {
    return this.execute().then(onFulfilled, onRejected);
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/query-builders/_query.js
var _RelationalQueryBuilder = class {
  static [entityKind] = "SQLiteAsyncRelationalQueryBuilder";
  constructor(mode, fullSchema, schema, tableNamesMap, table2, tableConfig, dialect, session) {
    this.mode = mode;
    this.fullSchema = fullSchema;
    this.schema = schema;
    this.tableNamesMap = tableNamesMap;
    this.table = table2;
    this.tableConfig = tableConfig;
    this.dialect = dialect;
    this.session = session;
  }
  findMany(config2) {
    return this.mode === "sync" ? new SQLiteSyncRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config2 ? config2 : {}, "many") : new SQLiteRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config2 ? config2 : {}, "many");
  }
  findFirst(config2) {
    return this.mode === "sync" ? new SQLiteSyncRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config2 ? {
      ...config2,
      limit: 1
    } : { limit: 1 }, "first") : new SQLiteRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config2 ? {
      ...config2,
      limit: 1
    } : { limit: 1 }, "first");
  }
};
var SQLiteRelationalQuery = class extends QueryPromise {
  static [entityKind] = "SQLiteAsyncRelationalQuery";
  /** @internal */
  mode;
  constructor(fullSchema, schema, tableNamesMap, table2, tableConfig, dialect, session, config2, mode) {
    super();
    this.fullSchema = fullSchema;
    this.schema = schema;
    this.tableNamesMap = tableNamesMap;
    this.table = table2;
    this.tableConfig = tableConfig;
    this.dialect = dialect;
    this.session = session;
    this.config = config2;
    this.mode = mode;
  }
  /** @internal */
  getSQL() {
    return this.dialect._buildRelationalQuery({
      fullSchema: this.fullSchema,
      schema: this.schema,
      tableNamesMap: this.tableNamesMap,
      table: this.table,
      tableConfig: this.tableConfig,
      queryConfig: this.config,
      tableAlias: this.tableConfig.tsName
    }).sql;
  }
  /** @internal */
  _prepare(isOneTimeQuery = false) {
    const { query, builtQuery } = this._toSQL();
    return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](builtQuery, void 0, this.mode === "first" ? "get" : "all", true, (rawRows, mapColumnValue) => {
      const rows = rawRows.map((row) => mapRelationalRow(this.schema, this.tableConfig, row, query.selection, mapColumnValue));
      if (this.mode === "first") return rows[0];
      return rows;
    });
  }
  prepare() {
    return this._prepare(false);
  }
  _toSQL() {
    const query = this.dialect._buildRelationalQuery({
      fullSchema: this.fullSchema,
      schema: this.schema,
      tableNamesMap: this.tableNamesMap,
      table: this.table,
      tableConfig: this.tableConfig,
      queryConfig: this.config,
      tableAlias: this.tableConfig.tsName
    });
    return {
      query,
      builtQuery: this.dialect.sqlToQuery(query.sql)
    };
  }
  toSQL() {
    return this._toSQL().builtQuery;
  }
  /** @internal */
  executeRaw() {
    if (this.mode === "first") return this._prepare(false).get();
    return this._prepare(false).all();
  }
  async execute() {
    return this.executeRaw();
  }
};
var SQLiteSyncRelationalQuery = class extends SQLiteRelationalQuery {
  static [entityKind] = "SQLiteSyncRelationalQuery";
  sync() {
    return this.executeRaw();
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/query-builders/count.js
var SQLiteCountBuilder = class SQLiteCountBuilder2 extends SQL {
  sql;
  static [entityKind] = "SQLiteCountBuilderAsync";
  [Symbol.toStringTag] = "SQLiteCountBuilderAsync";
  session;
  static buildEmbeddedCount(source, filters) {
    return sql`(select count(*) from ${source}${sql.raw(" where ").if(filters)}${filters})`;
  }
  static buildCount(source, filters) {
    return sql`select count(*) from ${source}${sql.raw(" where ").if(filters)}${filters}`;
  }
  constructor(params) {
    super(SQLiteCountBuilder2.buildEmbeddedCount(params.source, params.filters).queryChunks);
    this.params = params;
    this.session = params.session;
    this.sql = SQLiteCountBuilder2.buildCount(params.source, params.filters);
  }
  then(onfulfilled, onrejected) {
    return Promise.resolve(this.session.count(this.sql)).then(onfulfilled, onrejected);
  }
  catch(onRejected) {
    return this.then(void 0, onRejected);
  }
  finally(onFinally) {
    return this.then((value) => {
      onFinally?.();
      return value;
    }, (reason) => {
      onFinally?.();
      throw reason;
    });
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/alias.js
var ColumnTableAliasProxyHandler = class {
  static [entityKind] = "ColumnTableAliasProxyHandler";
  constructor(table2, ignoreColumnAlias) {
    this.table = table2;
    this.ignoreColumnAlias = ignoreColumnAlias;
  }
  get(columnObj, prop) {
    if (prop === "table") return this.table;
    if (prop === "isAlias" && this.ignoreColumnAlias) return false;
    return columnObj[prop];
  }
};
var ViewSelectionAliasProxyHandler = class {
  static [entityKind] = "ViewSelectionAliasProxyHandler";
  constructor(view, selection, ignoreColumnAlias) {
    this.view = view;
    this.selection = selection;
    this.ignoreColumnAlias = ignoreColumnAlias;
  }
  get(selection, prop) {
    const value = selection[prop];
    if (is(value, Column)) return new Proxy(value, new ColumnTableAliasProxyHandler(this.view, this.ignoreColumnAlias));
    if (is(value, Subquery) || is(value, SQL) || is(value, SQL.Aliased) || isSQLWrapper(value) || typeof value !== "object" || value === null) return value;
    return new Proxy(value, this);
  }
};
var TableAliasProxyHandler = class {
  static [entityKind] = "TableAliasProxyHandler";
  constructor(alias, replaceOriginalName, ignoreColumnAlias) {
    this.alias = alias;
    this.replaceOriginalName = replaceOriginalName;
    this.ignoreColumnAlias = ignoreColumnAlias;
  }
  get(target, prop) {
    if (prop === Table.Symbol.IsAlias) return true;
    if (prop === Table.Symbol.Name) return this.alias;
    if (this.replaceOriginalName && prop === Table.Symbol.OriginalName) return this.alias;
    if (prop === ViewBaseConfig) return {
      ...target[ViewBaseConfig],
      name: this.alias,
      isAlias: true,
      selectedFields: new Proxy(target[ViewBaseConfig].selectedFields, new ViewSelectionAliasProxyHandler(new Proxy(target, this), target[ViewBaseConfig].selectedFields, this.ignoreColumnAlias))
    };
    if (prop === Table.Symbol.Columns) {
      const columns = target[Table.Symbol.Columns];
      if (!columns) return columns;
      if (is(target, View)) return new Proxy(target[Table.Symbol.Columns], new ViewSelectionAliasProxyHandler(new Proxy(target, this), target[Table.Symbol.Columns], this.ignoreColumnAlias));
      const proxiedColumns = {};
      Object.keys(columns).map((key) => {
        proxiedColumns[key] = new Proxy(columns[key], new ColumnTableAliasProxyHandler(new Proxy(target, this), this.ignoreColumnAlias));
      });
      return proxiedColumns;
    }
    const value = target[prop];
    if (is(value, Column)) return new Proxy(value, new ColumnTableAliasProxyHandler(new Proxy(target, this), this.ignoreColumnAlias));
    return value;
  }
};
var ColumnAliasProxyHandler = class {
  static [entityKind] = "ColumnAliasProxyHandler";
  constructor(alias) {
    this.alias = alias;
  }
  get(target, prop) {
    if (prop === "isAlias") return true;
    if (prop === "name") return this.alias;
    if (prop === "keyAsName") return false;
    if (prop === OriginalColumn) return () => target;
    return target[prop];
  }
};
var RelationTableAliasProxyHandler = class {
  static [entityKind] = "RelationTableAliasProxyHandler";
  constructor(alias) {
    this.alias = alias;
  }
  get(target, prop) {
    if (prop === "sourceTable") return aliasedTable(target.sourceTable, this.alias);
    return target[prop];
  }
};
function aliasedTable(table2, tableAlias) {
  return new Proxy(table2, new TableAliasProxyHandler(tableAlias, false, false));
}
function aliasedColumn(column, alias) {
  return new Proxy(column, new ColumnAliasProxyHandler(alias));
}
function aliasedTableColumn(column, tableAlias) {
  return new Proxy(column, new ColumnTableAliasProxyHandler(new Proxy(column.table, new TableAliasProxyHandler(tableAlias, false, false)), false));
}
function mapColumnsInAliasedSQLToAlias(query, alias) {
  return new SQL.Aliased(mapColumnsInSQLToAlias(query.sql, alias), query.fieldAlias);
}
function mapColumnsInSQLToAlias(query, alias) {
  return sql.join(query.queryChunks.map((c) => {
    if (is(c, Column)) return aliasedTableColumn(c, alias);
    if (is(c, SQL)) return mapColumnsInSQLToAlias(c, alias);
    if (is(c, SQL.Aliased)) return mapColumnsInAliasedSQLToAlias(c, alias);
    return c;
  }));
}
Column.prototype.as = function(alias) {
  return aliasedColumn(this, alias);
};
function getOriginalColumnFromAlias(column) {
  return column[OriginalColumn]();
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/errors.js
var DrizzleError = class extends Error {
  static [entityKind] = "DrizzleError";
  constructor({ message, cause }) {
    super(message);
    this.name = "DrizzleError";
    this.cause = cause;
  }
};
var DrizzleQueryError = class DrizzleQueryError2 extends Error {
  static [entityKind] = "DrizzleQueryError";
  constructor(query, params, cause) {
    super(`Failed query: ${query}
params: ${params}`);
    this.query = query;
    this.params = params;
    this.cause = cause;
    Error.captureStackTrace(this, DrizzleQueryError2);
    if (cause) this.cause = cause;
  }
};
var TransactionRollbackError = class extends DrizzleError {
  static [entityKind] = "TransactionRollbackError";
  constructor() {
    super({ message: "Rollback" });
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/relations.js
function processRelations(tablesConfig, tables) {
  for (const tableConfig of Object.values(tablesConfig)) for (const [relationFieldName, relation] of Object.entries(tableConfig.relations)) {
    if (!is(relation, Relation2)) continue;
    relation.sourceTable = tableConfig.table;
    relation.fieldName = relationFieldName;
  }
  for (const [sourceTableName, tableConfig] of Object.entries(tablesConfig)) for (const [relationFieldName, relation] of Object.entries(tableConfig.relations)) {
    if (!is(relation, Relation2)) continue;
    let reverseRelation;
    const { targetTableName, alias, sourceColumns, targetColumns, throughTable, sourceTable, through, where, sourceColumnTableNames, targetColumnTableNames } = relation;
    const relationPrintName = `relations -> ${tableConfig.name}: { ${relationFieldName}: r.${is(relation, One3) ? "one" : "many"}.${targetTableName}(...) }`;
    if (relationFieldName in tableConfig.table[TableColumns]) throw new Error(`${relationPrintName}: relation name collides with column "${relationFieldName}" of table "${tableConfig.name}"`);
    if (typeof alias === "string" && !alias) throw new Error(`${relationPrintName}: "alias" cannot be an empty string - omit it if you don't need it`);
    if (sourceColumns?.length === 0) throw new Error(`${relationPrintName}: "from" cannot be empty`);
    if (targetColumns?.length === 0) throw new Error(`${relationPrintName}: "to" cannot be empty`);
    if (sourceColumns && targetColumns) {
      if (sourceColumns.length !== targetColumns.length && !throughTable) throw new Error(`${relationPrintName}: "from" and "to" fields without "through" must have the same length`);
      for (const sName of sourceColumnTableNames) if (sName !== sourceTableName) throw new Error(`${relationPrintName}: all "from" columns must belong to table "${sourceTableName}", found column of table "${sName}"`);
      for (const tName of targetColumnTableNames) if (tName !== targetTableName) throw new Error(`${relationPrintName}: all "to" columns must belong to table "${targetTableName}", found column of table "${tName}"`);
      if (through) {
        if (through.source.length !== sourceColumns.length || through.target.length !== targetColumns.length) throw new Error(`${relationPrintName}: ".through(column)" must be used either on all columns in "from" and "to" or not defined on any of them`);
        for (const column of through.source) if (tables[column._.tableName] !== throughTable) throw new Error(`${relationPrintName}: ".through(column)" must be used on the same table by all columns of the relation`);
        for (const column of through.target) if (tables[column._.tableName] !== throughTable) throw new Error(`${relationPrintName}: ".through(column)" must be used on the same table by all columns of the relation`);
      }
      continue;
    }
    if (sourceColumns || targetColumns) throw new Error(`${relationPrintName}: relation must have either both "from" and "to" defined, or none of them`);
    const reverseTableConfig = tablesConfig[targetTableName];
    if (!reverseTableConfig) throw new Error(`${relationPrintName}: not enough data provided to build the relation - "from"/"to" are not defined, and no reverse relations of table "${targetTableName}" were found"`);
    if (alias) {
      const reverseRelations = Object.values(reverseTableConfig.relations).filter((it) => is(it, Relation2) && it.alias === alias && it !== relation);
      if (reverseRelations.length > 1) throw new Error(`${relationPrintName}: not enough data provided to build the relation - "from"/"to" are not defined, and multiple relations with alias "${alias}" found in table "${targetTableName}": ${reverseRelations.map((it) => `"${it.fieldName}"`).join(", ")}`);
      reverseRelation = reverseRelations[0];
      if (!reverseRelation) throw new Error(`${relationPrintName}: not enough data provided to build the relation - "from"/"to" are not defined, and there is no reverse relation of table "${targetTableName}" with alias "${alias}"`);
    } else {
      const reverseRelations = Object.values(reverseTableConfig.relations).filter((it) => is(it, Relation2) && it.targetTable === sourceTable && !it.alias && it !== relation);
      if (reverseRelations.length > 1) throw new Error(`${relationPrintName}: not enough data provided to build the relation - "from"/"to" are not defined, and multiple relations between "${targetTableName}" and "${sourceTableName}" were found.
Hint: you can specify "alias" on both sides of the relation with the same value`);
      reverseRelation = reverseRelations[0];
      if (!reverseRelation) throw new Error(`${relationPrintName}: not enough data provided to build the relation - "from"/"to" are not defined, and no reverse relation of table "${targetTableName}" with target table "${sourceTableName}" was found`);
    }
    if (!reverseRelation.sourceColumns || !reverseRelation.targetColumns) throw new Error(`${relationPrintName}: not enough data provided to build the relation - "from"/"to" are not defined, and reverse relation "${targetTableName}.${reverseRelation.fieldName}" does not have "from"/"to" defined`);
    relation.sourceColumns = reverseRelation.targetColumns;
    relation.targetColumns = reverseRelation.sourceColumns;
    relation.through = reverseRelation.through ? {
      source: reverseRelation.through.target,
      target: reverseRelation.through.source
    } : void 0;
    relation.throughTable = reverseRelation.throughTable;
    relation.isReversed = !where;
    relation.where = where ?? reverseRelation.where;
  }
  return tablesConfig;
}
function buildRelations(tables, config2) {
  const tablesConfig = {};
  for (const [tsName, table2] of Object.entries(tables)) tablesConfig[tsName] = {
    table: table2,
    name: tsName,
    relations: config2[tsName] ?? {}
  };
  return processRelations(tablesConfig, tables);
}
var Relation2 = class {
  static [entityKind] = "RelationV2";
  fieldName;
  sourceColumns;
  targetColumns;
  alias;
  where;
  sourceTable;
  targetTable;
  through;
  throughTable;
  isReversed;
  /** @internal */
  sourceColumnTableNames = [];
  /** @internal */
  targetColumnTableNames = [];
  constructor(targetTable, targetTableName) {
    this.targetTableName = targetTableName;
    this.targetTable = targetTable;
  }
};
var One3 = class extends Relation2 {
  static [entityKind] = "OneV2";
  relationType = "one";
  optional;
  constructor(tables, targetTable, targetTableName, config2) {
    super(targetTable, targetTableName);
    this.alias = config2?.alias;
    this.where = config2?.where;
    if (config2?.from) this.sourceColumns = (Array.isArray(config2.from) ? config2.from : [config2.from]).map((it) => {
      this.throughTable ??= it._.through ? tables[it._.through._.tableName] : void 0;
      this.sourceColumnTableNames.push(it._.tableName);
      return it._.column;
    });
    if (config2?.to) this.targetColumns = (Array.isArray(config2.to) ? config2.to : [config2.to]).map((it) => {
      this.throughTable ??= it._.through ? tables[it._.through._.tableName] : void 0;
      this.targetColumnTableNames.push(it._.tableName);
      return it._.column;
    });
    if (this.throughTable) this.through = {
      source: (Array.isArray(config2?.from) ? config2.from : config2?.from ? [config2.from] : []).map((c) => c._.through),
      target: (Array.isArray(config2?.to) ? config2.to : config2?.to ? [config2.to] : []).map((c) => c._.through)
    };
    this.optional = config2?.optional ?? true;
  }
};
var Many3 = class extends Relation2 {
  static [entityKind] = "ManyV2";
  relationType = "many";
  constructor(tables, targetTable, targetTableName, config2) {
    super(targetTable, targetTableName);
    this.config = config2;
    this.alias = config2?.alias;
    this.where = config2?.where;
    if (config2?.from) this.sourceColumns = (Array.isArray(config2.from) ? config2.from : [config2.from]).map((it) => {
      this.throughTable ??= it._.through ? tables[it._.through._.tableName] : void 0;
      this.sourceColumnTableNames.push(it._.tableName);
      return it._.column;
    });
    if (config2?.to) this.targetColumns = (Array.isArray(config2.to) ? config2.to : [config2.to]).map((it) => {
      this.throughTable ??= it._.through ? tables[it._.through._.tableName] : void 0;
      this.targetColumnTableNames.push(it._.tableName);
      return it._.column;
    });
    if (this.throughTable) this.through = {
      source: (Array.isArray(config2?.from) ? config2.from : config2?.from ? [config2.from] : []).map((c) => c._.through),
      target: (Array.isArray(config2?.to) ? config2.to : config2?.to ? [config2.to] : []).map((c) => c._.through)
    };
  }
};
var AggregatedField = class {
  static [entityKind] = "AggregatedField";
  table;
  onTable(table2) {
    this.table = table2;
    return this;
  }
};
var Count = class extends AggregatedField {
  static [entityKind] = "AggregatedFieldCount";
  query;
  getSQL() {
    if (!this.query) {
      if (!this.table) throw new Error("Table must be set before building aggregate field");
      this.query = sql`select count(*) as ${sql.identifier("r")} from ${getTableAsAliasSQL(this.table)}`.mapWith(Number);
    }
    return this.query;
  }
};
var operators = {
  and,
  between,
  eq,
  exists,
  gt,
  gte,
  ilike,
  inArray,
  arrayContains,
  arrayContained,
  arrayOverlaps,
  isNull,
  isNotNull,
  like,
  lt,
  lte,
  ne,
  not,
  notBetween,
  notExists,
  notLike,
  notIlike,
  notInArray,
  or,
  sql
};
var orderByOperators = {
  sql,
  asc,
  desc
};
function mapRelationalRow2(row, buildQueryResultSelection, mapColumnValue = (value) => value, parseJson = false, parseJsonIfString = false, path) {
  for (const selectionItem of buildQueryResultSelection) {
    if (selectionItem.selection) {
      const currentPath = `${path ? `${path}.` : ""}${selectionItem.key}`;
      if (row[selectionItem.key] === null) continue;
      if (parseJson) {
        row[selectionItem.key] = JSON.parse(row[selectionItem.key]);
        if (row[selectionItem.key] === null) continue;
      }
      if (parseJsonIfString && typeof row[selectionItem.key] === "string") row[selectionItem.key] = JSON.parse(row[selectionItem.key]);
      if (selectionItem.isArray) {
        for (const item of row[selectionItem.key]) mapRelationalRow2(item, selectionItem.selection, mapColumnValue, false, parseJsonIfString, currentPath);
        continue;
      }
      mapRelationalRow2(row[selectionItem.key], selectionItem.selection, mapColumnValue, false, parseJsonIfString, currentPath);
      continue;
    }
    const field = selectionItem.field;
    const value = mapColumnValue(row[selectionItem.key]);
    if (value === null) continue;
    let decoder;
    if (is(field, Column)) decoder = field;
    else if (is(field, SQL)) decoder = field.decoder;
    else if (is(field, SQL.Aliased)) decoder = field.sql.decoder;
    else if (is(field, Table) || is(field, View)) decoder = noopDecoder;
    else decoder = field.getSQL().decoder;
    row[selectionItem.key] = "mapFromJsonValue" in decoder ? decoder.mapFromJsonValue(value) : decoder.mapFromDriverValue(value);
  }
  return row;
}
var RelationsBuilderTable = class {
  static [entityKind] = "RelationsBuilderTable";
  _;
  constructor(table2, name2) {
    this._ = {
      name: name2,
      table: table2
    };
  }
};
var RelationsBuilderColumn = class {
  static [entityKind] = "RelationsBuilderColumn";
  _;
  constructor(column, tableName, key) {
    this._ = {
      tableName,
      column,
      key
    };
  }
  through(column) {
    return new RelationsBuilderJunctionColumn(this._.column, this._.tableName, this._.key, column);
  }
};
var RelationsBuilderJunctionColumn = class {
  static [entityKind] = "RelationsBuilderColumn";
  _;
  constructor(column, tableName, key, through) {
    this._ = {
      tableName,
      column,
      through,
      key
    };
  }
};
var RelationsHelperStatic = class {
  static [entityKind] = "RelationsHelperStatic";
  _;
  constructor(tables) {
    this._ = { tables };
    const one = {};
    const many = {};
    for (const [tableName, table2] of Object.entries(tables)) {
      one[tableName] = (config2) => {
        return new One3(tables, table2, tableName, config2);
      };
      many[tableName] = (config2) => {
        return new Many3(tables, table2, tableName, config2);
      };
    }
    this.one = one;
    this.many = many;
  }
  one;
  many;
  /** @internal - to be reworked */
  aggs = { count() {
    return new Count();
  } };
};
function createRelationsHelper(tables) {
  const helperStatic = new RelationsHelperStatic(tables);
  const relationsTables = Object.entries(tables).reduce((acc, [tKey, value]) => {
    const rTable = new RelationsBuilderTable(value, tKey);
    const columns = Object.entries(value[TableColumns]).reduce((acc2, [cKey, column]) => {
      acc2[cKey] = new RelationsBuilderColumn(column, tKey, cKey);
      return acc2;
    }, {});
    acc[tKey] = Object.assign(rTable, columns);
    return acc;
  }, {});
  return Object.assign(helperStatic, relationsTables);
}
function extractTablesFromSchema(schema) {
  return Object.fromEntries(Object.entries(schema).filter(([_, e]) => is(e, Table) || is(e, View)));
}
function defineRelations(schema, relations2) {
  const tables = extractTablesFromSchema(schema);
  return buildRelations(tables, relations2 ? relations2(createRelationsHelper(tables)) : {});
}
function fieldSelectionToSQL(table2, target) {
  const field = table2[TableColumns][target];
  return field ? is(field, Column) ? field : is(field, SQL.Aliased) ? sql`${table2}.${sql.identifier(field.fieldAlias)}` : sql`${table2}.${sql.identifier(target)}` : sql`${table2}.${sql.identifier(target)}`;
}
function relationsFieldFilterToSQL(column, filter) {
  if (typeof filter !== "object" || is(filter, Placeholder)) return eq(column, filter);
  const entries = Object.entries(filter);
  if (!entries.length) return void 0;
  const parts = [];
  for (const [target, value] of entries) {
    if (value === void 0) continue;
    switch (target) {
      case "NOT": {
        const res = relationsFieldFilterToSQL(column, value);
        if (!res) continue;
        parts.push(not(res));
        continue;
      }
      case "OR":
        if (!value.length) continue;
        parts.push(or(...value.map((subFilter) => relationsFieldFilterToSQL(column, subFilter))));
        continue;
      case "AND":
        if (!value.length) continue;
        parts.push(and(...value.map((subFilter) => relationsFieldFilterToSQL(column, subFilter))));
        continue;
      case "isNotNull":
      case "isNull":
        if (!value) continue;
        parts.push(operators[target](column));
        continue;
      case "in":
        parts.push(operators.inArray(column, value));
        continue;
      case "notIn":
        parts.push(operators.notInArray(column, value));
        continue;
      default:
        parts.push(operators[target](column, value));
        continue;
    }
  }
  if (!parts.length) return void 0;
  return and(...parts);
}
function relationsFilterToSQL(table2, filter, tableRelations = {}, tablesRelations = {}, casing, depth = 0) {
  const entries = Object.entries(filter);
  if (!entries.length) return void 0;
  const parts = [];
  for (const [target, value] of entries) {
    if (value === void 0) continue;
    switch (target) {
      case "RAW": {
        const processed = typeof value === "function" ? value(table2, operators) : value.getSQL();
        parts.push(processed);
        continue;
      }
      case "OR":
        if (!value?.length) continue;
        parts.push(or(...value.map((subFilter) => relationsFilterToSQL(table2, subFilter, tableRelations, tablesRelations, casing, depth))));
        continue;
      case "AND":
        if (!value?.length) continue;
        parts.push(and(...value.map((subFilter) => relationsFilterToSQL(table2, subFilter, tableRelations, tablesRelations, casing, depth))));
        continue;
      case "NOT": {
        if (value === void 0) continue;
        const built = relationsFilterToSQL(table2, value, tableRelations, tablesRelations, casing, depth);
        if (!built) continue;
        parts.push(not(built));
        continue;
      }
      default: {
        if (table2[TableColumns][target]) {
          const colFilter = relationsFieldFilterToSQL(fieldSelectionToSQL(table2, target), value);
          if (colFilter) parts.push(colFilter);
          continue;
        }
        const relation = tableRelations[target];
        if (!relation) throw new DrizzleError({ message: `Unknown relational filter field: "${target}"` });
        const targetTable = aliasedTable(relation.targetTable, `f${depth}`);
        const throughTable = relation.throughTable ? aliasedTable(relation.throughTable, `ft${depth}`) : void 0;
        const targetConfig = tablesRelations[relation.targetTableName];
        const { filter: relationFilter, joinCondition } = relationToSQL(casing, relation, table2, targetTable, throughTable);
        const filter2 = and(relationFilter, typeof value === "boolean" ? void 0 : relationsFilterToSQL(targetTable, value, targetConfig.relations, tablesRelations, casing, depth + 1));
        const subquery = throughTable ? sql`(select * from ${getTableAsAliasSQL(targetTable)} inner join ${getTableAsAliasSQL(throughTable)} on ${joinCondition}${sql` where ${filter2}`.if(filter2)} limit 1)` : sql`(select * from ${getTableAsAliasSQL(targetTable)}${sql` where ${filter2}`.if(filter2)} limit 1)`;
        if (filter2) parts.push((value ? exists : notExists)(subquery));
      }
    }
  }
  return and(...parts);
}
function relationsOrderToSQL(table2, orders) {
  if (typeof orders === "function") {
    const data = orders(table2, orderByOperators);
    return is(data, SQL) ? data : Array.isArray(data) ? data.length ? sql.join(data.map((o) => is(o, SQL) ? o : asc(o)), sql`, `) : void 0 : is(data, Column) ? asc(data) : void 0;
  }
  const entries = Object.entries(orders).filter(([_, value]) => value);
  if (!entries.length) return void 0;
  return sql.join(entries.map(([target, value]) => (value === "asc" ? asc : desc)(fieldSelectionToSQL(table2, target))), sql`, `);
}
function relationExtrasToSQL(table2, extras) {
  const subqueries = [];
  const selection = [];
  for (const [key, field] of Object.entries(extras)) {
    if (!field) continue;
    const extra = typeof field === "function" ? field(table2, { sql: operators.sql }) : field;
    const query = sql`(${extra.getSQL()}) as ${sql.identifier(key)}`;
    query.decoder = extra.getSQL().decoder;
    subqueries.push(query);
    selection.push({
      key,
      field: query
    });
  }
  return {
    sql: subqueries.length ? sql.join(subqueries, sql`, `) : void 0,
    selection
  };
}
function relationToSQL(casing, relation, sourceTable, targetTable, throughTable) {
  if (relation.through) {
    const outerColumnWhere = relation.sourceColumns.map((s, i) => {
      const t = relation.through.source[i];
      return eq(sql`${sourceTable}.${sql.identifier(casing.getColumnCasing(s))}`, sql`${throughTable}.${sql.identifier(is(t._.column, Column) ? casing.getColumnCasing(t._.column) : t._.key)}`);
    });
    const innerColumnWhere = relation.targetColumns.map((s, i) => {
      const t = relation.through.target[i];
      return eq(sql`${throughTable}.${sql.identifier(is(t._.column, Column) ? casing.getColumnCasing(t._.column) : t._.key)}`, sql`${targetTable}.${sql.identifier(casing.getColumnCasing(s))}`);
    });
    return {
      filter: and(relation.where ? relationsFilterToSQL(relation.isReversed ? sourceTable : targetTable, relation.where) : void 0, ...outerColumnWhere),
      joinCondition: and(...innerColumnWhere)
    };
  }
  return { filter: and(...relation.sourceColumns.map((s, i) => {
    const t = relation.targetColumns[i];
    return eq(sql`${sourceTable}.${sql.identifier(casing.getColumnCasing(s))}`, sql`${targetTable}.${sql.identifier(casing.getColumnCasing(t))}`);
  }), relation.where ? relationsFilterToSQL(relation.isReversed ? sourceTable : targetTable, relation.where) : void 0) };
}
function getTableAsAliasSQL(table2) {
  return sql`${table2[IsAlias] ? sql`${sql`${sql.identifier(table2[TableSchema] ?? "")}.`.if(table2[TableSchema])}${sql.identifier(table2[OriginalName])} as ${table2}` : table2}`;
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/query-builders/query.js
var RelationalQueryBuilder = class {
  static [entityKind] = "SQLiteAsyncRelationalQueryBuilderV2";
  constructor(mode, schema, table2, tableConfig, dialect, session, rowMode, forbidJsonb) {
    this.mode = mode;
    this.schema = schema;
    this.table = table2;
    this.tableConfig = tableConfig;
    this.dialect = dialect;
    this.session = session;
    this.rowMode = rowMode;
    this.forbidJsonb = forbidJsonb;
  }
  findMany(config2) {
    return this.mode === "sync" ? new SQLiteSyncRelationalQuery2(this.schema, this.table, this.tableConfig, this.dialect, this.session, config2 ?? true, "many", this.rowMode, this.forbidJsonb) : new SQLiteRelationalQuery2(this.schema, this.table, this.tableConfig, this.dialect, this.session, config2 ?? true, "many", this.rowMode, this.forbidJsonb);
  }
  findFirst(config2) {
    return this.mode === "sync" ? new SQLiteSyncRelationalQuery2(this.schema, this.table, this.tableConfig, this.dialect, this.session, config2 ?? true, "first", this.rowMode, this.forbidJsonb) : new SQLiteRelationalQuery2(this.schema, this.table, this.tableConfig, this.dialect, this.session, config2 ?? true, "first", this.rowMode, this.forbidJsonb);
  }
};
var SQLiteRelationalQuery2 = class extends QueryPromise {
  static [entityKind] = "SQLiteAsyncRelationalQueryV2";
  /** @internal */
  mode;
  /** @internal */
  table;
  constructor(schema, table2, tableConfig, dialect, session, config2, mode, rowMode, forbidJsonb) {
    super();
    this.schema = schema;
    this.tableConfig = tableConfig;
    this.dialect = dialect;
    this.session = session;
    this.config = config2;
    this.rowMode = rowMode;
    this.forbidJsonb = forbidJsonb;
    this.mode = mode;
    this.table = table2;
  }
  /** @internal */
  getSQL() {
    return this.dialect.buildRelationalQuery({
      schema: this.schema,
      table: this.table,
      tableConfig: this.tableConfig,
      queryConfig: this.config,
      mode: this.mode,
      jsonb: this.forbidJsonb ? sql`json` : sql`jsonb`
    }).sql;
  }
  /** @internal */
  _prepare(isOneTimeQuery = true) {
    const { query, builtQuery } = this._toSQL();
    return this.session[isOneTimeQuery ? "prepareOneTimeRelationalQuery" : "prepareRelationalQuery"](builtQuery, void 0, this.mode === "first" ? "get" : "all", (rawRows, mapColumnValue) => {
      const rows = rawRows.map((row) => mapRelationalRow2(row, query.selection, mapColumnValue, !this.rowMode));
      if (this.mode === "first") return rows[0];
      return rows;
    });
  }
  prepare() {
    return this._prepare(false);
  }
  _getQuery() {
    const jsonb2 = this.forbidJsonb ? sql`json` : sql`jsonb`;
    const query = this.dialect.buildRelationalQuery({
      schema: this.schema,
      table: this.table,
      tableConfig: this.tableConfig,
      queryConfig: this.config,
      mode: this.mode,
      isNested: this.rowMode,
      jsonb: jsonb2
    });
    if (this.rowMode) query.sql = sql`select json_object(${sql.join(query.selection.map((s) => {
      return sql`${sql.raw(this.dialect.escapeString(s.key))}, ${s.selection ? sql`${jsonb2}(${sql.identifier(s.key)})` : sql.identifier(s.key)}`;
    }), sql`, `)}) as ${sql.identifier("r")} from (${query.sql}) as ${sql.identifier("t")}`;
    return query;
  }
  _toSQL() {
    const query = this._getQuery();
    return {
      query,
      builtQuery: this.dialect.sqlToQuery(query.sql)
    };
  }
  toSQL() {
    return this._toSQL().builtQuery;
  }
  /** @internal */
  executeRaw() {
    if (this.mode === "first") return this._prepare().get();
    return this._prepare().all();
  }
  async execute() {
    return this.executeRaw();
  }
};
var SQLiteSyncRelationalQuery2 = class extends SQLiteRelationalQuery2 {
  static [entityKind] = "SQLiteSyncRelationalQueryV2";
  sync() {
    return this.executeRaw();
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/query-builders/raw.js
var SQLiteRaw = class extends QueryPromise {
  static [entityKind] = "SQLiteRaw";
  /** @internal */
  config;
  constructor(execute, getSQL, action, dialect, mapBatchResult) {
    super();
    this.execute = execute;
    this.getSQL = getSQL;
    this.dialect = dialect;
    this.mapBatchResult = mapBatchResult;
    this.config = { action };
  }
  getQuery() {
    return {
      ...this.dialect.sqlToQuery(this.getSQL()),
      method: this.config.action
    };
  }
  mapResult(result, isFromBatch) {
    return isFromBatch ? this.mapBatchResult(result) : result;
  }
  _prepare() {
    return this;
  }
  /** @internal */
  isResponseInArrayMode() {
    return false;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/selection-proxy.js
var SelectionProxyHandler = class SelectionProxyHandler2 {
  static [entityKind] = "SelectionProxyHandler";
  config;
  constructor(config2) {
    this.config = { ...config2 };
  }
  get(subquery, prop) {
    if (prop === "_") return {
      ...subquery["_"],
      selectedFields: new Proxy(subquery._.selectedFields, this)
    };
    if (prop === ViewBaseConfig) return {
      ...subquery[ViewBaseConfig],
      selectedFields: new Proxy(subquery[ViewBaseConfig].selectedFields, this)
    };
    if (typeof prop === "symbol") return subquery[prop];
    const value = (is(subquery, Subquery) ? subquery._.selectedFields : is(subquery, View) ? subquery[ViewBaseConfig].selectedFields : subquery)[prop];
    if (is(value, SQL.Aliased)) {
      if (this.config.sqlAliasedBehavior === "sql" && !value.isSelectionField) return value.sql;
      const newValue = value.clone();
      newValue.isSelectionField = true;
      newValue.origin = this.config.alias;
      return newValue;
    }
    if (is(value, SQL)) {
      if (this.config.sqlBehavior === "sql") return value;
      throw new Error(`You tried to reference "${prop}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`);
    }
    if (is(value, Column)) {
      if (this.config.alias) return new Proxy(value, new ColumnTableAliasProxyHandler(new Proxy(value.table, new TableAliasProxyHandler(this.config.alias, this.config.replaceOriginalName ?? false, true)), true));
      return value;
    }
    if (typeof value !== "object" || value === null) return value;
    return new Proxy(value, new SelectionProxyHandler2(this.config));
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/foreign-keys.js
var ForeignKeyBuilder2 = class {
  static [entityKind] = "SQLiteForeignKeyBuilder";
  /** @internal */
  reference;
  /** @internal */
  _onUpdate;
  /** @internal */
  _onDelete;
  constructor(config2, actions) {
    this.reference = () => {
      const { name: name2, columns, foreignColumns } = config2();
      return {
        name: name2,
        columns,
        foreignTable: foreignColumns[0].table,
        foreignColumns
      };
    };
    if (actions) {
      this._onUpdate = actions.onUpdate;
      this._onDelete = actions.onDelete;
    }
  }
  onUpdate(action) {
    this._onUpdate = action;
    return this;
  }
  onDelete(action) {
    this._onDelete = action;
    return this;
  }
  /** @internal */
  build(table2) {
    return new ForeignKey2(table2, this);
  }
};
var ForeignKey2 = class {
  static [entityKind] = "SQLiteForeignKey";
  reference;
  onUpdate;
  onDelete;
  constructor(table2, builder) {
    this.table = table2;
    this.reference = builder.reference;
    this.onUpdate = builder._onUpdate;
    this.onDelete = builder._onDelete;
  }
  getName() {
    const { name: name2, columns, foreignColumns } = this.reference();
    const columnNames = columns.map((column) => column.name);
    const foreignColumnNames = foreignColumns.map((column) => column.name);
    const chunks = [
      this.table[TableName],
      ...columnNames,
      foreignColumns[0].table[TableName],
      ...foreignColumnNames
    ];
    return name2 ?? `${chunks.join("_")}_fk`;
  }
  isNameExplicit() {
    return !!this.reference().name;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/column-builder.js
var ColumnBuilder = class {
  static [entityKind] = "ColumnBuilder";
  /** @internal */
  config;
  constructor(name2, dataType, columnType) {
    this.config = {
      name: name2,
      keyAsName: name2 === "",
      notNull: false,
      default: void 0,
      hasDefault: false,
      primaryKey: false,
      isUnique: false,
      uniqueName: void 0,
      uniqueType: void 0,
      dataType,
      columnType,
      generated: void 0
    };
  }
  /**
  * Changes the data type of the column. Commonly used with `json` columns. Also, useful for branded types.
  *
  * @example
  * ```ts
  * const users = pgTable('users', {
  * 	id: integer('id').$type<UserId>().primaryKey(),
  * 	details: json('details').$type<UserDetails>().notNull(),
  * });
  * ```
  */
  $type() {
    return this;
  }
  /**
  * Adds a `not null` clause to the column definition.
  *
  * Affects the `select` model of the table - columns *without* `not null` will be nullable on select.
  */
  notNull() {
    this.config.notNull = true;
    return this;
  }
  /**
  * Adds a `default <value>` clause to the column definition.
  *
  * Affects the `insert` model of the table - columns *with* `default` are optional on insert.
  *
  * If you need to set a dynamic default value, use {@link $defaultFn} instead.
  */
  default(value) {
    this.config.default = value;
    this.config.hasDefault = true;
    return this;
  }
  /**
  * Adds a dynamic default value to the column.
  * The function will be called when the row is inserted, and the returned value will be used as the column value.
  *
  * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
  */
  $defaultFn(fn) {
    this.config.defaultFn = fn;
    this.config.hasDefault = true;
    return this;
  }
  /**
  * Alias for {@link $defaultFn}.
  */
  $default = this.$defaultFn;
  /**
  * Adds a dynamic update value to the column.
  * The function will be called when the row is updated, and the returned value will be used as the column value if none is provided.
  * If no `default` (or `$defaultFn`) value is provided, the function will be called when the row is inserted as well, and the returned value will be used as the column value.
  *
  * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
  */
  $onUpdateFn(fn) {
    this.config.onUpdateFn = fn;
    this.config.hasDefault = true;
    return this;
  }
  /**
  * Alias for {@link $onUpdateFn}.
  */
  $onUpdate = this.$onUpdateFn;
  /**
  * Adds a `primary key` clause to the column definition. This implicitly makes the column `not null`.
  *
  * In SQLite, `integer primary key` implicitly makes the column auto-incrementing.
  */
  primaryKey() {
    this.config.primaryKey = true;
    this.config.notNull = true;
    return this;
  }
  /** @internal Sets the name of the column to the key within the table definition if a name was not given. */
  setName(name2) {
    if (this.config.name !== "") return;
    this.config.name = name2;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/columns/common.js
var SQLiteColumnBuilder = class extends ColumnBuilder {
  static [entityKind] = "SQLiteColumnBuilder";
  foreignKeyConfigs = [];
  references(ref, actions = {}) {
    this.foreignKeyConfigs.push({
      ref,
      actions
    });
    return this;
  }
  unique(name2) {
    this.config.isUnique = true;
    this.config.uniqueName = name2;
    return this;
  }
  generatedAlwaysAs(as, config2) {
    this.config.generated = {
      as,
      type: "always",
      mode: config2?.mode ?? "virtual"
    };
    return this;
  }
  /** @internal */
  buildForeignKeys(column, table2) {
    return this.foreignKeyConfigs.map(({ ref, actions }) => {
      return ((ref2, actions2) => {
        const builder = new ForeignKeyBuilder2(() => {
          const foreignColumn = ref2();
          return {
            columns: [column],
            foreignColumns: [foreignColumn]
          };
        });
        if (actions2.onUpdate) builder.onUpdate(actions2.onUpdate);
        if (actions2.onDelete) builder.onDelete(actions2.onDelete);
        return builder.build(table2);
      })(ref, actions);
    });
  }
};
var SQLiteColumn = class extends Column {
  static [entityKind] = "SQLiteColumn";
  /** @internal */
  table;
  constructor(table2, config2) {
    super(table2, config2);
    this.table = table2;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/columns/blob.js
function hexToText(hexString) {
  let result = "";
  for (let i = 0; i < hexString.length; i += 2) {
    const hexPair = hexString.slice(i, i + 2);
    const decimalValue = Number.parseInt(hexPair, 16);
    result += String.fromCodePoint(decimalValue);
  }
  return result;
}
var SQLiteBigIntBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteBigIntBuilder";
  constructor(name2) {
    super(name2, "bigint int64", "SQLiteBigInt");
  }
  /** @internal */
  build(table2) {
    return new SQLiteBigInt(table2, this.config);
  }
};
var SQLiteBigInt = class extends SQLiteColumn {
  static [entityKind] = "SQLiteBigInt";
  getSQLType() {
    return "blob";
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") return BigInt(hexToText(value));
    if (typeof Buffer !== "undefined" && Buffer.from) {
      const buf = Buffer.isBuffer(value) ? value : value instanceof ArrayBuffer ? Buffer.from(value) : value.buffer ? Buffer.from(value.buffer, value.byteOffset, value.byteLength) : Buffer.from(value);
      return BigInt(buf.toString("utf8"));
    }
    return BigInt(textDecoder.decode(value));
  }
  mapToDriverValue(value) {
    return Buffer.from(value.toString());
  }
};
var SQLiteBlobJsonBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteBlobJsonBuilder";
  constructor(name2) {
    super(name2, "object json", "SQLiteBlobJson");
  }
  /** @internal */
  build(table2) {
    return new SQLiteBlobJson(table2, this.config);
  }
};
var SQLiteBlobJson = class extends SQLiteColumn {
  static [entityKind] = "SQLiteBlobJson";
  getSQLType() {
    return "blob";
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") return JSON.parse(hexToText(value));
    if (typeof Buffer !== "undefined" && Buffer.from) {
      const buf = Buffer.isBuffer(value) ? value : value instanceof ArrayBuffer ? Buffer.from(value) : value.buffer ? Buffer.from(value.buffer, value.byteOffset, value.byteLength) : Buffer.from(value);
      return JSON.parse(buf.toString("utf8"));
    }
    return JSON.parse(textDecoder.decode(value));
  }
  mapToDriverValue(value) {
    return Buffer.from(JSON.stringify(value));
  }
};
var SQLiteBlobBufferBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteBlobBufferBuilder";
  constructor(name2) {
    super(name2, "object buffer", "SQLiteBlobBuffer");
  }
  /** @internal */
  build(table2) {
    return new SQLiteBlobBuffer(table2, this.config);
  }
};
var SQLiteBlobBuffer = class extends SQLiteColumn {
  static [entityKind] = "SQLiteBlobBuffer";
  mapFromDriverValue(value) {
    if (Buffer.isBuffer(value)) return value;
    if (typeof value === "string") return Buffer.from(value, "hex");
    return Buffer.from(value);
  }
  getSQLType() {
    return "blob";
  }
};
function blob(a, b) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  if (config2?.mode === "json") return new SQLiteBlobJsonBuilder(name2);
  if (config2?.mode === "bigint") return new SQLiteBigIntBuilder(name2);
  return new SQLiteBlobBufferBuilder(name2);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/columns/custom.js
var SQLiteCustomColumnBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteCustomColumnBuilder";
  constructor(name2, fieldConfig, customTypeParams) {
    super(name2, "custom", "SQLiteCustomColumn");
    this.config.fieldConfig = fieldConfig;
    this.config.customTypeParams = customTypeParams;
  }
  /** @internal */
  build(table2) {
    return new SQLiteCustomColumn(table2, this.config);
  }
};
var SQLiteCustomColumn = class extends SQLiteColumn {
  static [entityKind] = "SQLiteCustomColumn";
  sqlName;
  mapTo;
  mapFrom;
  mapJson;
  forJsonSelect;
  constructor(table2, config2) {
    super(table2, config2);
    this.sqlName = config2.customTypeParams.dataType(config2.fieldConfig);
    this.mapTo = config2.customTypeParams.toDriver;
    this.mapFrom = config2.customTypeParams.fromDriver;
    this.mapJson = config2.customTypeParams.fromJson;
    this.forJsonSelect = config2.customTypeParams.forJsonSelect;
  }
  getSQLType() {
    return this.sqlName;
  }
  mapFromDriverValue(value) {
    return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
  }
  mapFromJsonValue(value) {
    return typeof this.mapJson === "function" ? this.mapJson(value) : this.mapFromDriverValue(value);
  }
  jsonSelectIdentifier(identifier, sql2) {
    if (typeof this.forJsonSelect === "function") return this.forJsonSelect(identifier, sql2);
    const rawType = this.getSQLType().toLowerCase();
    const parenPos = rawType.indexOf("(");
    switch (parenPos + 1 ? rawType.slice(0, parenPos) : rawType) {
      case "numeric":
      case "decimal":
      case "bigint":
        return sql2`cast(${identifier} as text)`;
      case "blob":
        return sql2`hex(${identifier})`;
      default:
        return identifier;
    }
  }
  mapToDriverValue(value) {
    return typeof this.mapTo === "function" ? this.mapTo(value) : value;
  }
};
function customType2(customTypeParams) {
  return (a, b) => {
    const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
    return new SQLiteCustomColumnBuilder(name2, config2, customTypeParams);
  };
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/columns/integer.js
var SQLiteBaseIntegerBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteBaseIntegerBuilder";
  constructor(name2, dataType, columnType) {
    super(name2, dataType, columnType);
    this.config.autoIncrement = false;
  }
  primaryKey(config2) {
    if (config2?.autoIncrement) this.config.autoIncrement = true;
    this.config.hasDefault = true;
    return super.primaryKey();
  }
};
var SQLiteBaseInteger = class extends SQLiteColumn {
  static [entityKind] = "SQLiteBaseInteger";
  autoIncrement = this.config.autoIncrement;
  getSQLType() {
    return "integer";
  }
};
var SQLiteIntegerBuilder = class extends SQLiteBaseIntegerBuilder {
  static [entityKind] = "SQLiteIntegerBuilder";
  constructor(name2) {
    super(name2, "number int53", "SQLiteInteger");
  }
  build(table2) {
    return new SQLiteInteger(table2, this.config);
  }
};
var SQLiteInteger = class extends SQLiteBaseInteger {
  static [entityKind] = "SQLiteInteger";
};
var SQLiteTimestampBuilder = class extends SQLiteBaseIntegerBuilder {
  static [entityKind] = "SQLiteTimestampBuilder";
  constructor(name2, mode) {
    super(name2, "object date", "SQLiteTimestamp");
    this.config.mode = mode;
  }
  /**
  * @deprecated Use `default()` with your own expression instead.
  *
  * Adds `DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer))` to the column, which is the current epoch timestamp in milliseconds.
  */
  defaultNow() {
    return this.default(sql`(cast((julianday('now') - 2440587.5)*86400000 as integer))`);
  }
  build(table2) {
    return new SQLiteTimestamp(table2, this.config);
  }
};
var SQLiteTimestamp = class extends SQLiteBaseInteger {
  static [entityKind] = "SQLiteTimestamp";
  mode = this.config.mode;
  mapFromDriverValue(value) {
    if (typeof value === "string") return new Date(value.replaceAll('"', ""));
    if (this.config.mode === "timestamp") return /* @__PURE__ */ new Date(value * 1e3);
    return new Date(value);
  }
  mapToDriverValue(value) {
    if (typeof value === "number") return value;
    const unix = value.getTime();
    if (this.config.mode === "timestamp") return Math.floor(unix / 1e3);
    return unix;
  }
};
var SQLiteBooleanBuilder = class extends SQLiteBaseIntegerBuilder {
  static [entityKind] = "SQLiteBooleanBuilder";
  constructor(name2, mode) {
    super(name2, "boolean", "SQLiteBoolean");
    this.config.mode = mode;
  }
  build(table2) {
    return new SQLiteBoolean(table2, this.config);
  }
};
var SQLiteBoolean = class extends SQLiteBaseInteger {
  static [entityKind] = "SQLiteBoolean";
  mode = this.config.mode;
  mapFromDriverValue(value) {
    return Number(value) === 1;
  }
  mapToDriverValue(value) {
    return value ? 1 : 0;
  }
};
function integer2(a, b) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  if (config2?.mode === "timestamp" || config2?.mode === "timestamp_ms") return new SQLiteTimestampBuilder(name2, config2.mode);
  if (config2?.mode === "boolean") return new SQLiteBooleanBuilder(name2, config2.mode);
  return new SQLiteIntegerBuilder(name2);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/columns/numeric.js
var SQLiteNumericBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteNumericBuilder";
  constructor(name2) {
    super(name2, "string numeric", "SQLiteNumeric");
  }
  /** @internal */
  build(table2) {
    return new SQLiteNumeric(table2, this.config);
  }
};
var SQLiteNumeric = class extends SQLiteColumn {
  static [entityKind] = "SQLiteNumeric";
  mapFromDriverValue(value) {
    if (typeof value === "string") return value;
    return String(value);
  }
  getSQLType() {
    return "numeric";
  }
};
var SQLiteNumericNumberBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteNumericNumberBuilder";
  constructor(name2) {
    super(name2, "number", "SQLiteNumericNumber");
  }
  /** @internal */
  build(table2) {
    return new SQLiteNumericNumber(table2, this.config);
  }
};
var SQLiteNumericNumber = class extends SQLiteColumn {
  static [entityKind] = "SQLiteNumericNumber";
  mapFromDriverValue(value) {
    if (typeof value === "number") return value;
    return Number(value);
  }
  mapToDriverValue = String;
  getSQLType() {
    return "numeric";
  }
};
var SQLiteNumericBigIntBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteNumericBigIntBuilder";
  constructor(name2) {
    super(name2, "bigint int64", "SQLiteNumericBigInt");
  }
  /** @internal */
  build(table2) {
    return new SQLiteNumericBigInt(table2, this.config);
  }
};
var SQLiteNumericBigInt = class extends SQLiteColumn {
  static [entityKind] = "SQLiteNumericBigInt";
  mapFromDriverValue = BigInt;
  mapToDriverValue = String;
  getSQLType() {
    return "numeric";
  }
};
function numeric2(a, b) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  const mode = config2?.mode;
  return mode === "number" ? new SQLiteNumericNumberBuilder(name2) : mode === "bigint" ? new SQLiteNumericBigIntBuilder(name2) : new SQLiteNumericBuilder(name2);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/columns/real.js
var SQLiteRealBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteRealBuilder";
  constructor(name2) {
    super(name2, "number double", "SQLiteReal");
  }
  /** @internal */
  build(table2) {
    return new SQLiteReal(table2, this.config);
  }
};
var SQLiteReal = class extends SQLiteColumn {
  static [entityKind] = "SQLiteReal";
  getSQLType() {
    return "real";
  }
};
function real2(name2) {
  return new SQLiteRealBuilder(name2 ?? "");
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/columns/text.js
var SQLiteTextBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteTextBuilder";
  constructor(name2, config2) {
    super(name2, config2.enum?.length ? "string enum" : "string", "SQLiteText");
    this.config.enumValues = config2.enum;
    this.config.length = config2.length;
  }
  /** @internal */
  build(table2) {
    return new SQLiteText(table2, this.config);
  }
};
var SQLiteText = class extends SQLiteColumn {
  static [entityKind] = "SQLiteText";
  enumValues = this.config.enumValues;
  constructor(table2, config2) {
    super(table2, config2);
  }
  getSQLType() {
    return `text${this.config.length ? `(${this.config.length})` : ""}`;
  }
};
var SQLiteTextJsonBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteTextJsonBuilder";
  constructor(name2) {
    super(name2, "object json", "SQLiteTextJson");
  }
  /** @internal */
  build(table2) {
    return new SQLiteTextJson(table2, this.config);
  }
};
var SQLiteTextJson = class extends SQLiteColumn {
  static [entityKind] = "SQLiteTextJson";
  getSQLType() {
    return "text";
  }
  mapFromDriverValue(value) {
    return JSON.parse(value);
  }
  mapToDriverValue(value) {
    return JSON.stringify(value);
  }
};
function text2(a, b = {}) {
  const { name: name2, config: config2 } = getColumnNameAndConfig(a, b);
  if (config2.mode === "json") return new SQLiteTextJsonBuilder(name2);
  return new SQLiteTextBuilder(name2, config2);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/columns/all.js
function getSQLiteColumnBuilders() {
  return {
    blob,
    customType: customType2,
    integer: integer2,
    numeric: numeric2,
    real: real2,
    text: text2
  };
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/table.js
var InlineForeignKeys2 = /* @__PURE__ */ Symbol.for("drizzle:SQLiteInlineForeignKeys");
var SQLiteTable = class extends Table {
  static [entityKind] = "SQLiteTable";
  /** @internal */
  static Symbol = Object.assign({}, Table.Symbol, { InlineForeignKeys: InlineForeignKeys2 });
  /** @internal */
  [Table.Symbol.Columns];
  /** @internal */
  [InlineForeignKeys2] = [];
  /** @internal */
  [Table.Symbol.ExtraConfigBuilder] = void 0;
};
function sqliteTableBase(name2, columns, extraConfig, schema, baseName = name2) {
  const rawTable = new SQLiteTable(name2, schema, baseName);
  const parsedColumns = typeof columns === "function" ? columns(getSQLiteColumnBuilders()) : columns;
  const builtColumns = Object.fromEntries(Object.entries(parsedColumns).map(([name3, colBuilderBase]) => {
    const colBuilder = colBuilderBase;
    colBuilder.setName(name3);
    const column = colBuilder.build(rawTable);
    rawTable[InlineForeignKeys2].push(...colBuilder.buildForeignKeys(column, rawTable));
    return [name3, column];
  }));
  const table2 = Object.assign(rawTable, builtColumns);
  table2[Table.Symbol.Columns] = builtColumns;
  table2[Table.Symbol.ExtraConfigColumns] = builtColumns;
  if (extraConfig) table2[SQLiteTable.Symbol.ExtraConfigBuilder] = extraConfig;
  return table2;
}
var sqliteTable = (name2, columns, extraConfig) => {
  return sqliteTableBase(name2, columns, extraConfig);
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/primary-keys.js
function primaryKey(...config2) {
  if (config2[0].columns) return new PrimaryKeyBuilder2(config2[0].columns, config2[0].name);
  return new PrimaryKeyBuilder2(config2);
}
var PrimaryKeyBuilder2 = class {
  static [entityKind] = "SQLitePrimaryKeyBuilder";
  /** @internal */
  columns;
  /** @internal */
  name;
  constructor(columns, name2) {
    this.columns = columns;
    this.name = name2;
  }
  /** @internal */
  build(table2) {
    return new PrimaryKey2(table2, this.columns, this.name);
  }
};
var PrimaryKey2 = class {
  static [entityKind] = "SQLitePrimaryKey";
  columns;
  name;
  isNameExplicit;
  constructor(table2, columns, name2) {
    this.table = table2;
    this.columns = columns;
    this.name = name2;
    this.isNameExplicit = !!name2;
  }
  getName() {
    return this.name ?? `${this.table[SQLiteTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/indexes.js
var IndexBuilderOn = class {
  static [entityKind] = "SQLiteIndexBuilderOn";
  constructor(name2, unique) {
    this.name = name2;
    this.unique = unique;
  }
  on(...columns) {
    return new IndexBuilder(this.name, columns, this.unique);
  }
};
var IndexBuilder = class {
  static [entityKind] = "SQLiteIndexBuilder";
  /** @internal */
  config;
  constructor(name2, columns, unique) {
    this.config = {
      name: name2,
      columns,
      unique,
      where: void 0
    };
  }
  /**
  * Condition for partial index.
  */
  where(condition) {
    this.config.where = condition;
    return this;
  }
  /** @internal */
  build(table2) {
    return new Index(this.config, table2);
  }
};
var Index = class {
  static [entityKind] = "SQLiteIndex";
  config;
  isNameExplicit;
  constructor(config2, table2) {
    this.config = {
      ...config2,
      table: table2
    };
    this.isNameExplicit = !!config2.name;
  }
};
function uniqueIndex(name2) {
  return new IndexBuilderOn(name2, true);
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/utils.js
function extractUsedTable(table2) {
  if (is(table2, SQLiteTable)) return [`${table2[Table.Symbol.BaseName]}`];
  if (is(table2, Subquery)) return table2._.usedTables ?? [];
  if (is(table2, SQL)) return table2.usedTables ?? [];
  return [];
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/query-builders/delete.js
var SQLiteDeleteBase = class extends QueryPromise {
  static [entityKind] = "SQLiteDelete";
  /** @internal */
  config;
  constructor(table2, session, dialect, withList) {
    super();
    this.table = table2;
    this.session = session;
    this.dialect = dialect;
    this.config = {
      table: table2,
      withList
    };
  }
  /**
  * Adds a `where` clause to the query.
  *
  * Calling this method will delete only those rows that fulfill a specified condition.
  *
  * See docs: {@link https://orm.drizzle.team/docs/delete}
  *
  * @param where the `where` clause.
  *
  * @example
  * You can use conditional operators and `sql function` to filter the rows to be deleted.
  *
  * ```ts
  * // Delete all cars with green color
  * db.delete(cars).where(eq(cars.color, 'green'));
  * // or
  * db.delete(cars).where(sql`${cars.color} = 'green'`)
  * ```
  *
  * You can logically combine conditional operators with `and()` and `or()` operators:
  *
  * ```ts
  * // Delete all BMW cars with a green color
  * db.delete(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
  *
  * // Delete all cars with the green or blue color
  * db.delete(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
  * ```
  */
  where(where) {
    this.config.where = where;
    return this;
  }
  orderBy(...columns) {
    if (typeof columns[0] === "function") {
      const orderBy = columns[0](new Proxy(this.config.table[Table.Symbol.Columns], new SelectionProxyHandler({
        sqlAliasedBehavior: "alias",
        sqlBehavior: "sql"
      })));
      const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
      this.config.orderBy = orderByArray;
    } else {
      const orderByArray = columns;
      this.config.orderBy = orderByArray;
    }
    return this;
  }
  limit(limit) {
    this.config.limit = limit;
    return this;
  }
  returning(fields = this.table[SQLiteTable.Symbol.Columns]) {
    this.config.returning = orderSelectedFields(fields);
    return this;
  }
  /** @internal */
  getSQL() {
    return this.dialect.buildDeleteQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  /** @internal */
  _prepare(isOneTimeQuery = true) {
    return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run", true, void 0, {
      type: "delete",
      tables: extractUsedTable(this.config.table)
    });
  }
  prepare() {
    return this._prepare(false);
  }
  run = (placeholderValues) => {
    return this._prepare().run(placeholderValues);
  };
  all = (placeholderValues) => {
    return this._prepare().all(placeholderValues);
  };
  get = (placeholderValues) => {
    return this._prepare().get(placeholderValues);
  };
  values = (placeholderValues) => {
    return this._prepare().values(placeholderValues);
  };
  async execute(placeholderValues) {
    return this._prepare().execute(placeholderValues);
  }
  $dynamic() {
    return this;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/view-base.js
var SQLiteViewBase = class extends View {
  static [entityKind] = "SQLiteViewBase";
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/query-builders/query-builder.js
var TypedQueryBuilder = class {
  static [entityKind] = "TypedQueryBuilder";
  /** @internal */
  getSelectedFields() {
    return this._.selectedFields;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/query-builders/select.js
var SQLiteSelectBuilder = class {
  static [entityKind] = "SQLiteSelectBuilder";
  fields;
  session;
  dialect;
  withList;
  distinct;
  constructor(config2) {
    this.fields = config2.fields;
    this.session = config2.session;
    this.dialect = config2.dialect;
    this.withList = config2.withList;
    this.distinct = config2.distinct;
  }
  from(source) {
    const isPartialSelect = !!this.fields;
    let fields;
    if (this.fields) fields = this.fields;
    else if (is(source, Subquery)) fields = Object.fromEntries(Object.keys(source._.selectedFields).map((key) => [key, source[key]]));
    else if (is(source, SQLiteViewBase)) fields = source[ViewBaseConfig].selectedFields;
    else if (is(source, SQL)) fields = {};
    else fields = getTableColumns(source);
    return new SQLiteSelectBase({
      table: source,
      fields,
      isPartialSelect,
      session: this.session,
      dialect: this.dialect,
      withList: this.withList,
      distinct: this.distinct
    });
  }
};
var SQLiteSelectQueryBuilderBase = class extends TypedQueryBuilder {
  static [entityKind] = "SQLiteSelectQueryBuilder";
  _;
  /** @internal */
  config;
  joinsNotNullableMap;
  tableName;
  isPartialSelect;
  session;
  dialect;
  cacheConfig = void 0;
  usedTables = /* @__PURE__ */ new Set();
  constructor({ table: table2, fields, isPartialSelect, session, dialect, withList, distinct }) {
    super();
    this.config = {
      withList,
      table: table2,
      fields: { ...fields },
      distinct,
      setOperators: []
    };
    this.isPartialSelect = isPartialSelect;
    this.session = session;
    this.dialect = dialect;
    this._ = {
      selectedFields: fields,
      config: this.config
    };
    this.tableName = getTableLikeName(table2);
    this.joinsNotNullableMap = typeof this.tableName === "string" ? { [this.tableName]: true } : {};
    for (const item of extractUsedTable(table2)) this.usedTables.add(item);
  }
  /** @internal */
  getUsedTables() {
    return [...this.usedTables];
  }
  createJoin(joinType) {
    return (table2, on) => {
      const baseTableName = this.tableName;
      const tableName = getTableLikeName(table2);
      for (const item of extractUsedTable(table2)) this.usedTables.add(item);
      if (typeof tableName === "string" && this.config.joins?.some((join) => join.alias === tableName)) throw new Error(`Alias "${tableName}" is already used in this query`);
      if (!this.isPartialSelect) {
        if (Object.keys(this.joinsNotNullableMap).length === 1 && typeof baseTableName === "string") this.config.fields = { [baseTableName]: this.config.fields };
        if (typeof tableName === "string" && !is(table2, SQL)) {
          const selection = is(table2, Subquery) ? table2._.selectedFields : is(table2, View) ? table2[ViewBaseConfig].selectedFields : table2[Table.Symbol.Columns];
          this.config.fields[tableName] = selection;
        }
      }
      if (typeof on === "function") on = on(new Proxy(this.config.fields, new SelectionProxyHandler({
        sqlAliasedBehavior: "sql",
        sqlBehavior: "sql"
      })));
      if (!this.config.joins) this.config.joins = [];
      this.config.joins.push({
        on,
        table: table2,
        joinType,
        alias: tableName
      });
      if (typeof tableName === "string") switch (joinType) {
        case "left":
          this.joinsNotNullableMap[tableName] = false;
          break;
        case "right":
          this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false]));
          this.joinsNotNullableMap[tableName] = true;
          break;
        case "cross":
        case "inner":
          this.joinsNotNullableMap[tableName] = true;
          break;
        case "full":
          this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false]));
          this.joinsNotNullableMap[tableName] = false;
          break;
      }
      return this;
    };
  }
  /**
  * Executes a `left join` operation by adding another table to the current query.
  *
  * Calling this method associates each row of the table with the corresponding row from the joined table, if a match is found. If no matching row exists, it sets all columns of the joined table to null.
  *
  * See docs: {@link https://orm.drizzle.team/docs/joins#left-join}
  *
  * @param table the table to join.
  * @param on the `on` clause.
  *
  * @example
  *
  * ```ts
  * // Select all users and their pets
  * const usersWithPets: { user: User; pets: Pet | null; }[] = await db.select()
  *   .from(users)
  *   .leftJoin(pets, eq(users.id, pets.ownerId))
  *
  * // Select userId and petId
  * const usersIdsAndPetIds: { userId: number; petId: number | null; }[] = await db.select({
  *   userId: users.id,
  *   petId: pets.id,
  * })
  *   .from(users)
  *   .leftJoin(pets, eq(users.id, pets.ownerId))
  * ```
  */
  leftJoin = this.createJoin("left");
  /**
  * Executes a `right join` operation by adding another table to the current query.
  *
  * Calling this method associates each row of the joined table with the corresponding row from the main table, if a match is found. If no matching row exists, it sets all columns of the main table to null.
  *
  * See docs: {@link https://orm.drizzle.team/docs/joins#right-join}
  *
  * @param table the table to join.
  * @param on the `on` clause.
  *
  * @example
  *
  * ```ts
  * // Select all users and their pets
  * const usersWithPets: { user: User | null; pets: Pet; }[] = await db.select()
  *   .from(users)
  *   .rightJoin(pets, eq(users.id, pets.ownerId))
  *
  * // Select userId and petId
  * const usersIdsAndPetIds: { userId: number | null; petId: number; }[] = await db.select({
  *   userId: users.id,
  *   petId: pets.id,
  * })
  *   .from(users)
  *   .rightJoin(pets, eq(users.id, pets.ownerId))
  * ```
  */
  rightJoin = this.createJoin("right");
  /**
  * Executes an `inner join` operation, creating a new table by combining rows from two tables that have matching values.
  *
  * Calling this method retrieves rows that have corresponding entries in both joined tables. Rows without matching entries in either table are excluded, resulting in a table that includes only matching pairs.
  *
  * See docs: {@link https://orm.drizzle.team/docs/joins#inner-join}
  *
  * @param table the table to join.
  * @param on the `on` clause.
  *
  * @example
  *
  * ```ts
  * // Select all users and their pets
  * const usersWithPets: { user: User; pets: Pet; }[] = await db.select()
  *   .from(users)
  *   .innerJoin(pets, eq(users.id, pets.ownerId))
  *
  * // Select userId and petId
  * const usersIdsAndPetIds: { userId: number; petId: number; }[] = await db.select({
  *   userId: users.id,
  *   petId: pets.id,
  * })
  *   .from(users)
  *   .innerJoin(pets, eq(users.id, pets.ownerId))
  * ```
  */
  innerJoin = this.createJoin("inner");
  /**
  * Executes a `full join` operation by combining rows from two tables into a new table.
  *
  * Calling this method retrieves all rows from both main and joined tables, merging rows with matching values and filling in `null` for non-matching columns.
  *
  * See docs: {@link https://orm.drizzle.team/docs/joins#full-join}
  *
  * @param table the table to join.
  * @param on the `on` clause.
  *
  * @example
  *
  * ```ts
  * // Select all users and their pets
  * const usersWithPets: { user: User | null; pets: Pet | null; }[] = await db.select()
  *   .from(users)
  *   .fullJoin(pets, eq(users.id, pets.ownerId))
  *
  * // Select userId and petId
  * const usersIdsAndPetIds: { userId: number | null; petId: number | null; }[] = await db.select({
  *   userId: users.id,
  *   petId: pets.id,
  * })
  *   .from(users)
  *   .fullJoin(pets, eq(users.id, pets.ownerId))
  * ```
  */
  fullJoin = this.createJoin("full");
  /**
  * Executes a `cross join` operation by combining rows from two tables into a new table.
  *
  * Calling this method retrieves all rows from both main and joined tables, merging all rows from each table.
  *
  * See docs: {@link https://orm.drizzle.team/docs/joins#cross-join}
  *
  * @param table the table to join.
  *
  * @example
  *
  * ```ts
  * // Select all users, each user with every pet
  * const usersWithPets: { user: User; pets: Pet; }[] = await db.select()
  *   .from(users)
  *   .crossJoin(pets)
  *
  * // Select userId and petId
  * const usersIdsAndPetIds: { userId: number; petId: number; }[] = await db.select({
  *   userId: users.id,
  *   petId: pets.id,
  * })
  *   .from(users)
  *   .crossJoin(pets)
  * ```
  */
  crossJoin = this.createJoin("cross");
  createSetOperator(type, isAll) {
    return (rightSelection) => {
      const rightSelect = typeof rightSelection === "function" ? rightSelection(getSQLiteSetOperators()) : rightSelection;
      if (!haveSameKeys(this.getSelectedFields(), rightSelect.getSelectedFields())) throw new Error("Set operator error (union / intersect / except): selected fields are not the same or are in a different order");
      this.config.setOperators.push({
        type,
        isAll,
        rightSelect
      });
      return this;
    };
  }
  /**
  * Adds `union` set operator to the query.
  *
  * Calling this method will combine the result sets of the `select` statements and remove any duplicate rows that appear across them.
  *
  * See docs: {@link https://orm.drizzle.team/docs/set-operations#union}
  *
  * @example
  *
  * ```ts
  * // Select all unique names from customers and users tables
  * await db.select({ name: users.name })
  *   .from(users)
  *   .union(
  *     db.select({ name: customers.name }).from(customers)
  *   );
  * // or
  * import { union } from 'drizzle-orm/sqlite-core'
  *
  * await union(
  *   db.select({ name: users.name }).from(users),
  *   db.select({ name: customers.name }).from(customers)
  * );
  * ```
  */
  union = this.createSetOperator("union", false);
  /**
  * Adds `union all` set operator to the query.
  *
  * Calling this method will combine the result-set of the `select` statements and keep all duplicate rows that appear across them.
  *
  * See docs: {@link https://orm.drizzle.team/docs/set-operations#union-all}
  *
  * @example
  *
  * ```ts
  * // Select all transaction ids from both online and in-store sales
  * await db.select({ transaction: onlineSales.transactionId })
  *   .from(onlineSales)
  *   .unionAll(
  *     db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
  *   );
  * // or
  * import { unionAll } from 'drizzle-orm/sqlite-core'
  *
  * await unionAll(
  *   db.select({ transaction: onlineSales.transactionId }).from(onlineSales),
  *   db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
  * );
  * ```
  */
  unionAll = this.createSetOperator("union", true);
  /**
  * Adds `intersect` set operator to the query.
  *
  * Calling this method will retain only the rows that are present in both result sets and eliminate duplicates.
  *
  * See docs: {@link https://orm.drizzle.team/docs/set-operations#intersect}
  *
  * @example
  *
  * ```ts
  * // Select course names that are offered in both departments A and B
  * await db.select({ courseName: depA.courseName })
  *   .from(depA)
  *   .intersect(
  *     db.select({ courseName: depB.courseName }).from(depB)
  *   );
  * // or
  * import { intersect } from 'drizzle-orm/sqlite-core'
  *
  * await intersect(
  *   db.select({ courseName: depA.courseName }).from(depA),
  *   db.select({ courseName: depB.courseName }).from(depB)
  * );
  * ```
  */
  intersect = this.createSetOperator("intersect", false);
  /**
  * Adds `except` set operator to the query.
  *
  * Calling this method will retrieve all unique rows from the left query, except for the rows that are present in the result set of the right query.
  *
  * See docs: {@link https://orm.drizzle.team/docs/set-operations#except}
  *
  * @example
  *
  * ```ts
  * // Select all courses offered in department A but not in department B
  * await db.select({ courseName: depA.courseName })
  *   .from(depA)
  *   .except(
  *     db.select({ courseName: depB.courseName }).from(depB)
  *   );
  * // or
  * import { except } from 'drizzle-orm/sqlite-core'
  *
  * await except(
  *   db.select({ courseName: depA.courseName }).from(depA),
  *   db.select({ courseName: depB.courseName }).from(depB)
  * );
  * ```
  */
  except = this.createSetOperator("except", false);
  /** @internal */
  addSetOperators(setOperators) {
    this.config.setOperators.push(...setOperators);
    return this;
  }
  /**
  * Adds a `where` clause to the query.
  *
  * Calling this method will select only those rows that fulfill a specified condition.
  *
  * See docs: {@link https://orm.drizzle.team/docs/select#filtering}
  *
  * @param where the `where` clause.
  *
  * @example
  * You can use conditional operators and `sql function` to filter the rows to be selected.
  *
  * ```ts
  * // Select all cars with green color
  * await db.select().from(cars).where(eq(cars.color, 'green'));
  * // or
  * await db.select().from(cars).where(sql`${cars.color} = 'green'`)
  * ```
  *
  * You can logically combine conditional operators with `and()` and `or()` operators:
  *
  * ```ts
  * // Select all BMW cars with a green color
  * await db.select().from(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
  *
  * // Select all cars with the green or blue color
  * await db.select().from(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
  * ```
  */
  where(where) {
    if (typeof where === "function") where = where(new Proxy(this.config.fields, new SelectionProxyHandler({
      sqlAliasedBehavior: "sql",
      sqlBehavior: "sql"
    })));
    this.config.where = where;
    return this;
  }
  /**
  * Adds a `having` clause to the query.
  *
  * Calling this method will select only those rows that fulfill a specified condition. It is typically used with aggregate functions to filter the aggregated data based on a specified condition.
  *
  * See docs: {@link https://orm.drizzle.team/docs/select#aggregations}
  *
  * @param having the `having` clause.
  *
  * @example
  *
  * ```ts
  * // Select all brands with more than one car
  * await db.select({
  * 	brand: cars.brand,
  * 	count: sql<number>`cast(count(${cars.id}) as int)`,
  * })
  *   .from(cars)
  *   .groupBy(cars.brand)
  *   .having(({ count }) => gt(count, 1));
  * ```
  */
  having(having) {
    if (typeof having === "function") having = having(new Proxy(this.config.fields, new SelectionProxyHandler({
      sqlAliasedBehavior: "sql",
      sqlBehavior: "sql"
    })));
    this.config.having = having;
    return this;
  }
  groupBy(...columns) {
    if (typeof columns[0] === "function") {
      const groupBy = columns[0](new Proxy(this.config.fields, new SelectionProxyHandler({
        sqlAliasedBehavior: "alias",
        sqlBehavior: "sql"
      })));
      this.config.groupBy = Array.isArray(groupBy) ? groupBy : [groupBy];
    } else this.config.groupBy = columns;
    return this;
  }
  orderBy(...columns) {
    if (typeof columns[0] === "function") {
      const orderBy = columns[0](new Proxy(this.config.fields, new SelectionProxyHandler({
        sqlAliasedBehavior: "alias",
        sqlBehavior: "sql"
      })));
      const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
      if (this.config.setOperators.length > 0) this.config.setOperators.at(-1).orderBy = orderByArray;
      else this.config.orderBy = orderByArray;
    } else {
      const orderByArray = columns;
      if (this.config.setOperators.length > 0) this.config.setOperators.at(-1).orderBy = orderByArray;
      else this.config.orderBy = orderByArray;
    }
    return this;
  }
  /**
  * Adds a `limit` clause to the query.
  *
  * Calling this method will set the maximum number of rows that will be returned by this query.
  *
  * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
  *
  * @param limit the `limit` clause.
  *
  * @example
  *
  * ```ts
  * // Get the first 10 people from this query.
  * await db.select().from(people).limit(10);
  * ```
  */
  limit(limit) {
    if (this.config.setOperators.length > 0) this.config.setOperators.at(-1).limit = limit;
    else this.config.limit = limit;
    return this;
  }
  /**
  * Adds an `offset` clause to the query.
  *
  * Calling this method will skip a number of rows when returning results from this query.
  *
  * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
  *
  * @param offset the `offset` clause.
  *
  * @example
  *
  * ```ts
  * // Get the 10th-20th people from this query.
  * await db.select().from(people).offset(10).limit(10);
  * ```
  */
  offset(offset) {
    if (this.config.setOperators.length > 0) this.config.setOperators.at(-1).offset = offset;
    else this.config.offset = offset;
    return this;
  }
  /** @internal */
  getSQL() {
    return this.dialect.buildSelectQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  as(alias) {
    const usedTables = [];
    usedTables.push(...extractUsedTable(this.config.table));
    if (this.config.joins) for (const it of this.config.joins) usedTables.push(...extractUsedTable(it.table));
    return new Proxy(new Subquery(this.getSQL(), this.config.fields, alias, false, [...new Set(usedTables)]), new SelectionProxyHandler({
      alias,
      sqlAliasedBehavior: "alias",
      sqlBehavior: "error"
    }));
  }
  /** @internal */
  getSelectedFields() {
    return new Proxy(this.config.fields, new SelectionProxyHandler({
      alias: this.tableName,
      sqlAliasedBehavior: "alias",
      sqlBehavior: "error"
    }));
  }
  $dynamic() {
    return this;
  }
};
var SQLiteSelectBase = class extends SQLiteSelectQueryBuilderBase {
  static [entityKind] = "SQLiteSelect";
  /** @internal */
  _prepare(isOneTimeQuery = true) {
    if (!this.session) throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
    const fieldsList = orderSelectedFields(this.config.fields);
    const query = this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), fieldsList, "all", true, void 0, {
      type: "select",
      tables: [...this.usedTables]
    }, this.cacheConfig);
    query.joinsNotNullableMap = this.joinsNotNullableMap;
    return query;
  }
  $withCache(config2) {
    this.cacheConfig = config2 === void 0 ? {
      config: {},
      enabled: true,
      autoInvalidate: true
    } : config2 === false ? { enabled: false } : {
      enabled: true,
      autoInvalidate: true,
      ...config2
    };
    return this;
  }
  prepare() {
    return this._prepare(false);
  }
  run = (placeholderValues) => {
    return this._prepare().run(placeholderValues);
  };
  all = (placeholderValues) => {
    return this._prepare().all(placeholderValues);
  };
  get = (placeholderValues) => {
    return this._prepare().get(placeholderValues);
  };
  values = (placeholderValues) => {
    return this._prepare().values(placeholderValues);
  };
  async execute() {
    return this.all();
  }
};
applyMixins(SQLiteSelectBase, [QueryPromise]);
function createSetOperator(type, isAll) {
  return (leftSelect, rightSelect, ...restSelects) => {
    const setOperators = [rightSelect, ...restSelects].map((select) => ({
      type,
      isAll,
      rightSelect: select
    }));
    for (const setOperator of setOperators) if (!haveSameKeys(leftSelect.getSelectedFields(), setOperator.rightSelect.getSelectedFields())) throw new Error("Set operator error (union / intersect / except): selected fields are not the same or are in a different order");
    return leftSelect.addSetOperators(setOperators);
  };
}
var getSQLiteSetOperators = () => ({
  union,
  unionAll,
  intersect,
  except
});
var union = createSetOperator("union", false);
var unionAll = createSetOperator("union", true);
var intersect = createSetOperator("intersect", false);
var except = createSetOperator("except", false);

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/migrator.utils.js
function getMigrationsToRun(params) {
  const { localMigrations, dbMigrations } = params;
  const dbNamesSet = new Set(dbMigrations.map((m) => m.name).filter((n) => n !== null));
  return localMigrations.filter((lm) => !lm.name || !dbNamesSet.has(lm.name));
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/casing.js
function toSnakeCase(input) {
  return (input.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? []).map((word) => word.toLowerCase()).join("_");
}
function toCamelCase(input) {
  return (input.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? []).reduce((acc, word, i) => {
    return acc + (i === 0 ? word.toLowerCase() : `${word[0].toUpperCase()}${word.slice(1)}`);
  }, "");
}
function noopCase(input) {
  return input;
}
var CasingCache = class {
  static [entityKind] = "CasingCache";
  /** @internal */
  cache = {};
  cachedTables = {};
  convert;
  constructor(casing) {
    this.convert = casing === "snake_case" ? toSnakeCase : casing === "camelCase" ? toCamelCase : noopCase;
  }
  getColumnCasing(column) {
    if (!column.keyAsName) return column.name;
    const key = `${column.table[Table.Symbol.Schema] ?? "public"}.${column.table[Table.Symbol.OriginalName]}.${column.name}`;
    if (!this.cache[key]) this.cacheTable(column.table);
    return this.cache[key];
  }
  cacheTable(table2) {
    const tableKey = `${table2[Table.Symbol.Schema] ?? "public"}.${table2[Table.Symbol.OriginalName]}`;
    if (!this.cachedTables[tableKey]) {
      for (const column of Object.values(table2[Table.Symbol.Columns])) {
        if (!is(column, Column)) continue;
        const columnKey = `${tableKey}.${column.name}`;
        this.cache[columnKey] = this.convert(column.name);
      }
      this.cachedTables[tableKey] = true;
    }
  }
  clearCache() {
    this.cache = {};
    this.cachedTables = {};
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/up-migrations/utils.js
var MIGRATIONS_TABLE_VERSIONS = {
  sqlite: 1,
  pg: 1,
  effect: 1,
  mysql: 1,
  mssql: 1,
  cockroach: 1,
  singlestore: 1
};
var GET_VERSION_FOR = {
  mysql: (columns) => {
    if (columns.includes("name")) return 1;
    return 0;
  },
  pg: (columns) => {
    if (columns.includes("name")) return 1;
    return 0;
  },
  effect: (columns) => {
    if (columns.includes("name")) return 1;
    return 0;
  },
  mssql: (columns) => {
    if (columns.includes("name")) return 1;
    return 0;
  },
  cockroach: (columns) => {
    if (columns.includes("name")) return 1;
    return 0;
  },
  singlestore: (columns) => {
    if (columns.includes("name")) return 1;
    return 0;
  },
  sqlite: (columns) => {
    if (columns.includes("name")) return 1;
    return 0;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/up-migrations/sqlite.js
function upgradeSyncIfNeeded(migrationsTable, session, localMigrations) {
  if (session.all(sql`SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ${migrationsTable}`).length === 0) return { newDb: true };
  const rows = session.all(sql`SELECT name as column_name FROM pragma_table_info(${migrationsTable})`);
  const version2 = GET_VERSION_FOR.sqlite(rows.map((r) => r.column_name));
  for (let v = version2; v < MIGRATIONS_TABLE_VERSIONS.sqlite; v++) {
    const upgradeFn = upgradeSyncFunctions[v];
    if (!upgradeFn) throw new Error(`No upgrade path from migration table version ${v} to ${v + 1}`);
    upgradeFn(migrationsTable, session, localMigrations);
  }
  return { newDb: false };
}
var upgradeSyncFunctions = { 0: (migrationsTable, session, localMigrations) => {
  const table2 = sql`${sql.identifier(migrationsTable)}`;
  const dbRows = session.all(sql`SELECT id, hash, created_at FROM ${table2} ORDER BY id ASC`);
  localMigrations.sort((a, b) => a.folderMillis !== b.folderMillis ? a.folderMillis - b.folderMillis : (a.name ?? "").localeCompare(b.name ?? ""));
  const byMillis = /* @__PURE__ */ new Map();
  const byHash = /* @__PURE__ */ new Map();
  for (const lm of localMigrations) {
    if (!byMillis.has(lm.folderMillis)) byMillis.set(lm.folderMillis, []);
    byMillis.get(lm.folderMillis).push(lm);
    byHash.set(lm.hash, lm);
  }
  const toApply = [];
  let unmatched = [];
  for (const dbRow of dbRows) {
    const stringified = String(dbRow.created_at);
    const millis = Number(stringified.substring(0, stringified.length - 3) + "000");
    const candidates = byMillis.get(millis);
    let matched;
    let matchedBy = null;
    if (candidates && candidates.length === 1) {
      matched = candidates[0];
      matchedBy = "millis";
    } else if (candidates && candidates.length > 1) {
      matched = candidates.find((c) => c.hash && dbRow.hash && c.hash === dbRow.hash);
      if (matched) matchedBy = "hash";
    } else {
      matched = byHash.get(dbRow.hash);
      if (matched) matchedBy = "hash";
    }
    if (matched) toApply.push({
      id: dbRow.id,
      name: matched.name,
      hash: dbRow.hash,
      created_at: stringified,
      matchedBy: dbRow.id ? "id" : matchedBy
    });
    else unmatched.push(dbRow);
  }
  if (unmatched.length > 0) throw Error(`While upgrading your database migrations table we found ${unmatched.length} (${unmatched.map((it) => `[id: ${it.id}, created_at: ${it.created_at}]`).join(", ")}) migrations in the database that do not match any local migration. This means that some migrations were applied to the database but are missing from the local environment`);
  session.transaction((tx) => {
    tx.run(sql`ALTER TABLE ${table2} ADD COLUMN ${sql.identifier("name")} text`);
    tx.run(sql`ALTER TABLE ${table2} ADD COLUMN ${sql.identifier("applied_at")} TEXT`);
    for (const backfillEntry of toApply) {
      const updateQuery = sql`UPDATE ${table2} SET ${sql.identifier("name")} = ${backfillEntry.name}, ${sql.identifier("applied_at")} = NULL WHERE`;
      if (backfillEntry.id) updateQuery.append(sql` ${sql.identifier("id")} = ${backfillEntry.id}`);
      else if (backfillEntry.matchedBy === "millis") updateQuery.append(sql` ${sql.identifier("created_at")} = ${backfillEntry.created_at}`);
      else updateQuery.append(sql` ${sql.identifier("hash")} = ${backfillEntry.hash}`);
      tx.run(updateQuery);
    }
  });
} };
async function upgradeAsyncIfNeeded(migrationsTable, db2, localMigrations) {
  if ((await db2.session.all(sql`SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ${migrationsTable}`)).length === 0) return { newDb: true };
  const rows = await db2.session.all(sql`SELECT name as column_name FROM pragma_table_info(${migrationsTable})`);
  const version2 = GET_VERSION_FOR.sqlite(rows.map((r) => r.column_name));
  for (let v = version2; v < MIGRATIONS_TABLE_VERSIONS.sqlite; v++) {
    const upgradeFn = upgradeAsyncFunctions[v];
    if (!upgradeFn) throw new Error(`No upgrade path from migration table version ${v} to ${v + 1}`);
    await upgradeFn(migrationsTable, db2, localMigrations);
  }
  return { newDb: false };
}
var upgradeAsyncFunctions = { 0: async (migrationsTable, db2, localMigrations) => {
  const table2 = sql`${sql.identifier(migrationsTable)}`;
  const dbRows = await db2.session.all(sql`SELECT id, hash, created_at FROM ${table2} ORDER BY id ASC`);
  localMigrations.sort((a, b) => a.folderMillis !== b.folderMillis ? a.folderMillis - b.folderMillis : (a.name ?? "").localeCompare(b.name ?? ""));
  const byMillis = /* @__PURE__ */ new Map();
  const byHash = /* @__PURE__ */ new Map();
  for (const lm of localMigrations) {
    if (!byMillis.has(lm.folderMillis)) byMillis.set(lm.folderMillis, []);
    byMillis.get(lm.folderMillis).push(lm);
    byHash.set(lm.hash, lm);
  }
  const toApply = [];
  let unmatched = [];
  for (const dbRow of dbRows) {
    const stringified = String(dbRow.created_at);
    const millis = Number(stringified.substring(0, stringified.length - 3) + "000");
    const candidates = byMillis.get(millis);
    let matched;
    let matchedBy = null;
    if (candidates && candidates.length === 1) {
      matched = candidates[0];
      matchedBy = "millis";
    } else if (candidates && candidates.length > 1) {
      matched = candidates.find((c) => c.hash && dbRow.hash && c.hash === dbRow.hash);
      if (matched) matchedBy = "hash";
    } else {
      matched = byHash.get(dbRow.hash);
      if (matched) matchedBy = "hash";
    }
    if (matched) toApply.push({
      id: dbRow.id,
      name: matched.name,
      hash: dbRow.hash,
      created_at: stringified,
      matchedBy: dbRow.id ? "id" : matchedBy
    });
    else unmatched.push(dbRow);
  }
  if (unmatched.length > 0) throw Error(`While upgrading your database migrations table we found ${unmatched.length} (${unmatched.map((it) => `[id: ${it.id}, created_at: ${it.created_at}]`).join(", ")}) migrations in the database that do not match any local migration. This means that some migrations were applied to the database but are missing from the local environment`);
  const statements = [sql`ALTER TABLE ${table2} ADD COLUMN ${sql.identifier("name")} text`, sql`ALTER TABLE ${table2} ADD COLUMN ${sql.identifier("applied_at")} TEXT`];
  for (const backfillEntry of toApply) {
    const updateQuery = sql`UPDATE ${table2} SET ${sql.identifier("name")} = ${backfillEntry.name}, ${sql.identifier("applied_at")} = NULL WHERE`;
    if (backfillEntry.id) updateQuery.append(sql` ${sql.identifier("id")} = ${backfillEntry.id}`);
    else if (backfillEntry.matchedBy === "millis") updateQuery.append(sql` ${sql.identifier("created_at")} = ${backfillEntry.created_at}`);
    else updateQuery.append(sql` ${sql.identifier("hash")} = ${backfillEntry.hash}`);
    statements.push(updateQuery);
  }
  await db2.transaction(async (tx) => {
    for (const statement of statements) await tx.run(statement);
  });
} };

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/dialect.js
var SQLiteDialect = class {
  static [entityKind] = "SQLiteDialect";
  /** @internal */
  casing;
  constructor(config2) {
    this.casing = new CasingCache(config2?.casing);
  }
  escapeName(name2) {
    return `"${name2.replace(/"/g, '""')}"`;
  }
  escapeParam(_num) {
    return "?";
  }
  escapeString(str) {
    return `'${str.replace(/'/g, "''")}'`;
  }
  buildWithCTE(queries) {
    if (!queries?.length) return void 0;
    const withSqlChunks = [sql`with `];
    for (const [i, w] of queries.entries()) {
      withSqlChunks.push(sql`${sql.identifier(w._.alias)} as (${w._.sql})`);
      if (i < queries.length - 1) withSqlChunks.push(sql`, `);
    }
    withSqlChunks.push(sql` `);
    return sql.join(withSqlChunks);
  }
  buildDeleteQuery({ table: table2, where, returning, withList, limit, orderBy }) {
    const withSql = this.buildWithCTE(withList);
    const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
    return sql`${withSql}delete from ${table2}${where ? sql` where ${where}` : void 0}${returningSql}${this.buildOrderBy(orderBy)}${this.buildLimit(limit)}`;
  }
  buildUpdateSet(table2, set) {
    const tableColumns = table2[Table.Symbol.Columns];
    const columnNames = Object.keys(tableColumns).filter((colName) => set[colName] !== void 0 || tableColumns[colName]?.onUpdateFn !== void 0);
    const setLength = columnNames.length;
    return sql.join(columnNames.flatMap((colName, i) => {
      const col = tableColumns[colName];
      const onUpdateFnResult = col.onUpdateFn?.();
      const value = set[colName] ?? (is(onUpdateFnResult, SQL) ? onUpdateFnResult : sql.param(onUpdateFnResult, col));
      const res = sql`${sql.identifier(this.casing.getColumnCasing(col))} = ${value}`;
      if (i < setLength - 1) return [res, sql.raw(", ")];
      return [res];
    }));
  }
  buildUpdateQuery({ table: table2, set, where, returning, withList, joins, from, limit, orderBy }) {
    const withSql = this.buildWithCTE(withList);
    const setSql = this.buildUpdateSet(table2, set);
    const fromSql = from && sql.join([sql.raw(" from "), this.buildFromTable(from)]);
    const joinsSql = this.buildJoins(joins);
    const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
    return sql`${withSql}update ${table2} set ${setSql}${fromSql}${joinsSql}${where ? sql` where ${where}` : void 0}${returningSql}${this.buildOrderBy(orderBy)}${this.buildLimit(limit)}`;
  }
  /**
  * Builds selection SQL with provided fields/expressions
  *
  * Examples:
  *
  * `select <selection> from`
  *
  * `insert ... returning <selection>`
  *
  * If `isSingleTable` is true, then columns won't be prefixed with table name
  */
  buildSelection(fields, { isSingleTable = false } = {}) {
    const columnsLen = fields.length;
    const chunks = fields.flatMap(({ field }, i) => {
      const chunk = [];
      if (is(field, SQL.Aliased) && field.isSelectionField) {
        if (!isSingleTable && field.origin !== void 0) chunk.push(sql.identifier(field.origin), sql.raw("."));
        chunk.push(sql.identifier(field.fieldAlias));
      } else if (is(field, SQL.Aliased) || is(field, SQL)) {
        const query = is(field, SQL.Aliased) ? field.sql : field;
        if (isSingleTable) {
          const newSql = new SQL(query.queryChunks.map((c) => {
            if (is(c, Column)) return sql.identifier(this.casing.getColumnCasing(c));
            return c;
          }));
          chunk.push(query.shouldInlineParams ? newSql.inlineParams() : newSql);
        } else chunk.push(query);
        if (is(field, SQL.Aliased)) chunk.push(sql` as ${sql.identifier(field.fieldAlias)}`);
      } else if (is(field, Column)) if (field.columnType === "SQLiteNumericBigInt") if (isSingleTable) chunk.push(field.isAlias ? sql`cast(${sql.identifier(this.casing.getColumnCasing(getOriginalColumnFromAlias(field)))} as text) as ${field}` : sql`cast(${sql.identifier(this.casing.getColumnCasing(field))} as text)`);
      else chunk.push(field.isAlias ? sql`cast(${getOriginalColumnFromAlias(field)} as text) as ${field}` : sql`cast(${field} as text)`);
      else if (isSingleTable) chunk.push(field.isAlias ? sql`${sql.identifier(this.casing.getColumnCasing(getOriginalColumnFromAlias(field)))} as ${field}` : sql.identifier(this.casing.getColumnCasing(field)));
      else chunk.push(field.isAlias ? sql`${getOriginalColumnFromAlias(field)} as ${field}` : field);
      else if (is(field, Subquery)) {
        const entries = Object.entries(field._.selectedFields);
        if (entries.length === 1) {
          const entry = entries[0][1];
          const fieldDecoder = is(entry, SQL) ? entry.decoder : is(entry, Column) ? { mapFromDriverValue: (v) => entry.mapFromDriverValue(v) } : entry.sql.decoder;
          if (fieldDecoder) field._.sql.decoder = fieldDecoder;
        }
        chunk.push(field);
      }
      if (i < columnsLen - 1) chunk.push(sql`, `);
      return chunk;
    });
    return sql.join(chunks);
  }
  buildJoins(joins) {
    if (!joins || joins.length === 0) return;
    const joinsArray = [];
    if (joins) for (const [index2, joinMeta] of joins.entries()) {
      if (index2 === 0) joinsArray.push(sql` `);
      const table2 = joinMeta.table;
      const onSql = joinMeta.on ? sql` on ${joinMeta.on}` : void 0;
      if (is(table2, SQLiteTable)) {
        const tableName = table2[SQLiteTable.Symbol.Name];
        const tableSchema = table2[SQLiteTable.Symbol.Schema];
        const origTableName = table2[SQLiteTable.Symbol.OriginalName];
        const alias = tableName === origTableName ? void 0 : joinMeta.alias;
        joinsArray.push(sql`${sql.raw(joinMeta.joinType)} join ${tableSchema ? sql`${sql.identifier(tableSchema)}.` : void 0}${sql.identifier(origTableName)}${alias && sql` ${sql.identifier(alias)}`}${onSql}`);
      } else joinsArray.push(sql`${sql.raw(joinMeta.joinType)} join ${table2}${onSql}`);
      if (index2 < joins.length - 1) joinsArray.push(sql` `);
    }
    return sql.join(joinsArray);
  }
  buildLimit(limit) {
    return typeof limit === "object" || typeof limit === "number" && limit >= 0 ? sql` limit ${limit}` : void 0;
  }
  buildOrderBy(orderBy) {
    const orderByList = [];
    if (orderBy) for (const [index2, orderByValue] of orderBy.entries()) {
      orderByList.push(orderByValue);
      if (index2 < orderBy.length - 1) orderByList.push(sql`, `);
    }
    return orderByList.length > 0 ? sql` order by ${sql.join(orderByList)}` : void 0;
  }
  buildFromTable(table2) {
    if (is(table2, Table) && table2[Table.Symbol.IsAlias]) return sql`${sql`${sql.identifier(table2[Table.Symbol.Schema] ?? "")}.`.if(table2[Table.Symbol.Schema])}${sql.identifier(table2[Table.Symbol.OriginalName])} ${sql.identifier(table2[Table.Symbol.Name])}`;
    if (is(table2, View) && table2[ViewBaseConfig].isAlias) {
      let fullName = sql`${sql.identifier(table2[ViewBaseConfig].originalName)}`;
      if (table2[ViewBaseConfig].schema) fullName = sql`${sql.identifier(table2[ViewBaseConfig].schema)}.${fullName}`;
      return sql`${fullName} ${sql.identifier(table2[ViewBaseConfig].name)}`;
    }
    return table2;
  }
  buildSelectQuery({ withList, fields, fieldsFlat, where, having, table: table2, joins, orderBy, groupBy, limit, offset, distinct, setOperators }) {
    const fieldsList = fieldsFlat ?? orderSelectedFields(fields);
    for (const f of fieldsList) if (is(f.field, Column) && getTableName(f.field.table) !== (is(table2, Subquery) ? table2._.alias : is(table2, SQLiteViewBase) ? table2[ViewBaseConfig].name : is(table2, SQL) ? void 0 : getTableName(table2)) && !((table3) => joins?.some(({ alias }) => alias === (table3[Table.Symbol.IsAlias] ? getTableName(table3) : table3[Table.Symbol.BaseName])))(f.field.table)) {
      const tableName = getTableName(f.field.table);
      throw new Error(`Your "${f.path.join("->")}" field references a column "${tableName}"."${f.field.name}", but the table "${tableName}" is not part of the query! Did you forget to join it?`);
    }
    const isSingleTable = !joins || joins.length === 0;
    const withSql = this.buildWithCTE(withList);
    const distinctSql = distinct ? sql` distinct` : void 0;
    const selection = this.buildSelection(fieldsList, { isSingleTable });
    const tableSql = this.buildFromTable(table2);
    const joinsSql = this.buildJoins(joins);
    const whereSql = where ? sql` where ${where}` : void 0;
    const havingSql = having ? sql` having ${having}` : void 0;
    const groupByList = [];
    if (groupBy) for (const [index2, groupByValue] of groupBy.entries()) {
      groupByList.push(groupByValue);
      if (index2 < groupBy.length - 1) groupByList.push(sql`, `);
    }
    const finalQuery = sql`${withSql}select${distinctSql} ${selection} from ${tableSql}${joinsSql}${whereSql}${groupByList.length > 0 ? sql` group by ${sql.join(groupByList)}` : void 0}${havingSql}${this.buildOrderBy(orderBy)}${this.buildLimit(limit)}${offset ? sql` offset ${offset}` : void 0}`;
    if (setOperators.length > 0) return this.buildSetOperations(finalQuery, setOperators);
    return finalQuery;
  }
  buildSetOperations(leftSelect, setOperators) {
    const [setOperator, ...rest] = setOperators;
    if (!setOperator) throw new Error("Cannot pass undefined values to any set operator");
    if (rest.length === 0) return this.buildSetOperationQuery({
      leftSelect,
      setOperator
    });
    return this.buildSetOperations(this.buildSetOperationQuery({
      leftSelect,
      setOperator
    }), rest);
  }
  buildSetOperationQuery({ leftSelect, setOperator: { type, isAll, rightSelect, limit, orderBy, offset } }) {
    const leftChunk = sql`${leftSelect.getSQL()} `;
    const rightChunk = sql`${rightSelect.getSQL()}`;
    let orderBySql;
    if (orderBy && orderBy.length > 0) {
      const orderByValues = [];
      for (const singleOrderBy of orderBy) if (is(singleOrderBy, SQLiteColumn)) orderByValues.push(sql.identifier(singleOrderBy.name));
      else if (is(singleOrderBy, SQL)) {
        for (let i = 0; i < singleOrderBy.queryChunks.length; i++) {
          const chunk = singleOrderBy.queryChunks[i];
          if (is(chunk, SQLiteColumn)) singleOrderBy.queryChunks[i] = sql.identifier(this.casing.getColumnCasing(chunk));
        }
        orderByValues.push(sql`${singleOrderBy}`);
      } else orderByValues.push(sql`${singleOrderBy}`);
      orderBySql = sql` order by ${sql.join(orderByValues, sql`, `)}`;
    }
    const limitSql = typeof limit === "object" || typeof limit === "number" && limit >= 0 ? sql` limit ${limit}` : void 0;
    const operatorChunk = sql.raw(`${type} ${isAll ? "all " : ""}`);
    const offsetSql = offset ? sql` offset ${offset}` : void 0;
    return sql`${leftChunk}${operatorChunk}${rightChunk}${orderBySql}${limitSql}${offsetSql}`;
  }
  buildInsertQuery({ table: table2, values: valuesOrSelect, onConflict, returning, withList, select }) {
    const valuesSqlList = [];
    const columns = table2[Table.Symbol.Columns];
    const colEntries = Object.entries(columns).filter(([_, col]) => !col.shouldDisableInsert());
    const insertOrder = colEntries.map(([, column]) => sql.identifier(this.casing.getColumnCasing(column)));
    if (select) {
      const select2 = valuesOrSelect;
      if (is(select2, SQL)) valuesSqlList.push(select2);
      else valuesSqlList.push(select2.getSQL());
    } else {
      const values = valuesOrSelect;
      valuesSqlList.push(sql.raw("values "));
      for (const [valueIndex, value] of values.entries()) {
        const valueList = [];
        for (const [fieldName, col] of colEntries) {
          const colValue = value[fieldName];
          if (colValue === void 0 || is(colValue, Param) && colValue.value === void 0) {
            let defaultValue;
            if (col.default !== null && col.default !== void 0) defaultValue = is(col.default, SQL) ? col.default : sql.param(col.default, col);
            else if (col.defaultFn !== void 0) {
              const defaultFnResult = col.defaultFn();
              defaultValue = is(defaultFnResult, SQL) ? defaultFnResult : sql.param(defaultFnResult, col);
            } else if (!col.default && col.onUpdateFn !== void 0) {
              const onUpdateFnResult = col.onUpdateFn();
              defaultValue = is(onUpdateFnResult, SQL) ? onUpdateFnResult : sql.param(onUpdateFnResult, col);
            } else defaultValue = sql`null`;
            valueList.push(defaultValue);
          } else valueList.push(colValue);
        }
        valuesSqlList.push(valueList);
        if (valueIndex < values.length - 1) valuesSqlList.push(sql`, `);
      }
    }
    const withSql = this.buildWithCTE(withList);
    const valuesSql = sql.join(valuesSqlList);
    const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
    return sql`${withSql}insert into ${table2} ${insertOrder} ${valuesSql}${onConflict?.length ? sql.join(onConflict) : void 0}${returningSql}`;
  }
  sqlToQuery(sql2, invokeSource) {
    return sql2.toQuery({
      casing: this.casing,
      escapeName: this.escapeName,
      escapeParam: this.escapeParam,
      escapeString: this.escapeString,
      invokeSource
    });
  }
  /** @deprecated */
  _buildRelationalQuery({ fullSchema, schema, tableNamesMap, table: table2, tableConfig, queryConfig: config2, tableAlias, nestedQueryRelation, joinOn }) {
    let selection = [];
    let limit, offset, orderBy = [], where;
    const joins = [];
    if (config2 === true) selection = Object.entries(tableConfig.columns).map(([key, value]) => ({
      dbKey: value.name,
      tsKey: key,
      field: aliasedTableColumn(value, tableAlias),
      relationTableTsKey: void 0,
      isJson: false,
      selection: []
    }));
    else {
      const aliasedColumns = Object.fromEntries(Object.entries(tableConfig.columns).map(([key, value]) => [key, aliasedTableColumn(value, tableAlias)]));
      if (config2.where) {
        const whereSql = typeof config2.where === "function" ? config2.where(aliasedColumns, getOperators()) : config2.where;
        where = whereSql && mapColumnsInSQLToAlias(whereSql, tableAlias);
      }
      const fieldsSelection = [];
      let selectedColumns = [];
      if (config2.columns) {
        let isIncludeMode = false;
        for (const [field, value] of Object.entries(config2.columns)) {
          if (value === void 0) continue;
          if (field in tableConfig.columns) {
            if (!isIncludeMode && value === true) isIncludeMode = true;
            selectedColumns.push(field);
          }
        }
        if (selectedColumns.length > 0) selectedColumns = isIncludeMode ? selectedColumns.filter((c) => config2.columns?.[c] === true) : Object.keys(tableConfig.columns).filter((key) => !selectedColumns.includes(key));
      } else selectedColumns = Object.keys(tableConfig.columns);
      for (const field of selectedColumns) {
        const column = tableConfig.columns[field];
        fieldsSelection.push({
          tsKey: field,
          value: column
        });
      }
      let selectedRelations = [];
      if (config2.with) selectedRelations = Object.entries(config2.with).filter((entry) => !!entry[1]).map(([tsKey, queryConfig]) => ({
        tsKey,
        queryConfig,
        relation: tableConfig.relations[tsKey]
      }));
      let extras;
      if (config2.extras) {
        extras = typeof config2.extras === "function" ? config2.extras(aliasedColumns, { sql }) : config2.extras;
        for (const [tsKey, value] of Object.entries(extras)) fieldsSelection.push({
          tsKey,
          value: mapColumnsInAliasedSQLToAlias(value, tableAlias)
        });
      }
      for (const { tsKey, value } of fieldsSelection) selection.push({
        dbKey: is(value, SQL.Aliased) ? value.fieldAlias : tableConfig.columns[tsKey].name,
        tsKey,
        field: is(value, Column) ? aliasedTableColumn(value, tableAlias) : value,
        relationTableTsKey: void 0,
        isJson: false,
        selection: []
      });
      let orderByOrig = typeof config2.orderBy === "function" ? config2.orderBy(aliasedColumns, getOrderByOperators()) : config2.orderBy ?? [];
      if (!Array.isArray(orderByOrig)) orderByOrig = [orderByOrig];
      orderBy = orderByOrig.map((orderByValue) => {
        if (is(orderByValue, Column)) return aliasedTableColumn(orderByValue, tableAlias);
        return mapColumnsInSQLToAlias(orderByValue, tableAlias);
      });
      limit = config2.limit;
      offset = config2.offset;
      for (const { tsKey: selectedRelationTsKey, queryConfig: selectedRelationConfigValue, relation } of selectedRelations) {
        const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
        const relationTableTsName = tableNamesMap[getTableUniqueName(relation.referencedTable)];
        const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
        const joinOn2 = and(...normalizedRelation.fields.map((field2, i) => eq(aliasedTableColumn(normalizedRelation.references[i], relationTableAlias), aliasedTableColumn(field2, tableAlias))));
        const builtRelation = this._buildRelationalQuery({
          fullSchema,
          schema,
          tableNamesMap,
          table: fullSchema[relationTableTsName],
          tableConfig: schema[relationTableTsName],
          queryConfig: is(relation, One) ? selectedRelationConfigValue === true ? { limit: 1 } : {
            ...selectedRelationConfigValue,
            limit: 1
          } : selectedRelationConfigValue,
          tableAlias: relationTableAlias,
          joinOn: joinOn2,
          nestedQueryRelation: relation
        });
        const field = sql`(${builtRelation.sql})`.as(selectedRelationTsKey);
        selection.push({
          dbKey: selectedRelationTsKey,
          tsKey: selectedRelationTsKey,
          field,
          relationTableTsKey: relationTableTsName,
          isJson: true,
          selection: builtRelation.selection
        });
      }
    }
    if (selection.length === 0) throw new DrizzleError({ message: `No fields selected for table "${tableConfig.tsName}" ("${tableAlias}"). You need to have at least one item in "columns", "with" or "extras". If you need to select all columns, omit the "columns" key or set it to undefined.` });
    let result;
    where = and(joinOn, where);
    if (nestedQueryRelation) {
      let field = sql`json_array(${sql.join(selection.map(({ field: field2 }) => is(field2, SQLiteColumn) ? sql.identifier(this.casing.getColumnCasing(field2)) : is(field2, SQL.Aliased) ? field2.sql : field2), sql`, `)})`;
      if (is(nestedQueryRelation, Many)) field = sql`coalesce(json_group_array(${field}), json_array())`;
      const nestedSelection = [{
        dbKey: "data",
        tsKey: "data",
        field: field.as("data"),
        isJson: true,
        relationTableTsKey: tableConfig.tsName,
        selection
      }];
      if (limit !== void 0 || offset !== void 0 || orderBy.length > 0) {
        result = this.buildSelectQuery({
          table: aliasedTable(table2, tableAlias),
          fields: {},
          fieldsFlat: [{
            path: [],
            field: sql.raw("*")
          }],
          where,
          limit,
          offset,
          orderBy,
          setOperators: []
        });
        where = void 0;
        limit = void 0;
        offset = void 0;
        orderBy = void 0;
      } else result = aliasedTable(table2, tableAlias);
      result = this.buildSelectQuery({
        table: is(result, SQLiteTable) ? result : new Subquery(result, {}, tableAlias),
        fields: {},
        fieldsFlat: nestedSelection.map(({ field: field2 }) => ({
          path: [],
          field: is(field2, Column) ? aliasedTableColumn(field2, tableAlias) : field2
        })),
        joins,
        where,
        limit,
        offset,
        orderBy,
        setOperators: []
      });
    } else result = this.buildSelectQuery({
      table: aliasedTable(table2, tableAlias),
      fields: {},
      fieldsFlat: selection.map(({ field }) => ({
        path: [],
        field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field
      })),
      joins,
      where,
      limit,
      offset,
      orderBy,
      setOperators: []
    });
    return {
      tableTsKey: tableConfig.tsName,
      sql: result,
      selection
    };
  }
  nestedSelectionerror() {
    throw new DrizzleError({ message: `Views with nested selections are not supported by the relational query builder` });
  }
  buildRqbColumn(table2, column, key) {
    if (is(column, Column)) {
      const name2 = sql`${table2}.${sql.identifier(this.casing.getColumnCasing(column))}`;
      switch (column.columnType) {
        case "SQLiteBigInt":
        case "SQLiteBlobJson":
        case "SQLiteBlobBuffer":
          return sql`hex(${name2}) as ${sql.identifier(key)}`;
        case "SQLiteNumeric":
        case "SQLiteNumericNumber":
        case "SQLiteNumericBigInt":
          return sql`cast(${name2} as text) as ${sql.identifier(key)}`;
        case "SQLiteCustomColumn":
          return sql`${column.jsonSelectIdentifier(name2, sql)} as ${sql.identifier(key)}`;
        default:
          return sql`${name2} as ${sql.identifier(key)}`;
      }
    }
    return sql`${table2}.${is(column, SQL.Aliased) ? sql.identifier(column.fieldAlias) : isSQLWrapper(column) ? sql.identifier(key) : this.nestedSelectionerror()} as ${sql.identifier(key)}`;
  }
  unwrapAllColumns = (table2, selection) => {
    return sql.join(Object.entries(table2[TableColumns]).map(([k, v]) => {
      selection.push({
        key: k,
        field: v
      });
      return this.buildRqbColumn(table2, v, k);
    }), sql`, `);
  };
  getSelectedTableColumns = (table2, columns) => {
    const selectedColumns = [];
    const columnContainer = table2[TableColumns];
    const entries = Object.entries(columns);
    let colSelectionMode;
    for (const [k, v] of entries) {
      if (v === void 0) continue;
      colSelectionMode = colSelectionMode || v;
      if (v) {
        const column = columnContainer[k];
        selectedColumns.push({
          column,
          tsName: k
        });
      }
    }
    if (colSelectionMode === false) for (const [k, v] of Object.entries(columnContainer)) {
      if (columns[k] === false) continue;
      selectedColumns.push({
        column: v,
        tsName: k
      });
    }
    return selectedColumns;
  };
  buildColumns = (table2, selection, params) => params?.columns ? (() => {
    const columnIdentifiers = [];
    const selectedColumns = this.getSelectedTableColumns(table2, params?.columns);
    for (const { column, tsName } of selectedColumns) {
      columnIdentifiers.push(this.buildRqbColumn(table2, column, tsName));
      selection.push({
        key: tsName,
        field: column
      });
    }
    return columnIdentifiers.length ? sql.join(columnIdentifiers, sql`, `) : void 0;
  })() : this.unwrapAllColumns(table2, selection);
  buildRelationalQuery({ schema, table: table2, tableConfig, queryConfig: config2, relationWhere, mode, isNested, errorPath, depth, throughJoin, jsonb: jsonb2 }) {
    const selection = [];
    const isSingle = mode === "first";
    const params = config2 === true ? void 0 : config2;
    const currentPath = errorPath ?? "";
    const currentDepth = depth ?? 0;
    if (!currentDepth) table2 = aliasedTable(table2, `d${currentDepth}`);
    const limit = isSingle ? 1 : params?.limit;
    const offset = params?.offset;
    const columns = this.buildColumns(table2, selection, params);
    const where = params?.where && relationWhere ? and(relationsFilterToSQL(table2, params.where, tableConfig.relations, schema, this.casing), relationWhere) : params?.where ? relationsFilterToSQL(table2, params.where, tableConfig.relations, schema, this.casing) : relationWhere;
    const order = params?.orderBy ? relationsOrderToSQL(table2, params.orderBy) : void 0;
    const extras = params?.extras ? relationExtrasToSQL(table2, params.extras) : void 0;
    if (extras) selection.push(...extras.selection);
    const joins = params ? (() => {
      const { with: joins2 } = params;
      if (!joins2) return;
      const withEntries = Object.entries(joins2).filter(([_, v]) => v);
      if (!withEntries.length) return;
      return sql.join(withEntries.map(([k, join]) => {
        const relation = tableConfig.relations[k];
        const isSingle2 = is(relation, One3);
        const targetTable = aliasedTable(relation.targetTable, `d${currentDepth + 1}`);
        const throughTable = relation.throughTable ? aliasedTable(relation.throughTable, `tr${currentDepth}`) : void 0;
        const { filter, joinCondition } = relationToSQL(this.casing, relation, table2, targetTable, throughTable);
        const throughJoin2 = throughTable ? sql` inner join ${getTableAsAliasSQL(throughTable)} on ${joinCondition}` : void 0;
        const innerQuery = this.buildRelationalQuery({
          table: targetTable,
          mode: isSingle2 ? "first" : "many",
          schema,
          queryConfig: join,
          tableConfig: schema[relation.targetTableName],
          relationWhere: filter,
          isNested: true,
          errorPath: `${currentPath.length ? `${currentPath}.` : ""}${k}`,
          depth: currentDepth + 1,
          throughJoin: throughJoin2,
          jsonb: jsonb2
        });
        selection.push({
          field: targetTable,
          key: k,
          selection: innerQuery.selection,
          isArray: !isSingle2,
          isOptional: (relation.optional ?? false) || join !== true && !!join.where
        });
        const jsonColumns = sql.join(innerQuery.selection.map((s) => {
          return sql`${sql.raw(this.escapeString(s.key))}, ${s.selection ? sql`${jsonb2}(${sql.identifier(s.key)})` : sql.identifier(s.key)}`;
        }), sql`, `);
        const json2 = isNested ? jsonb2 : sql`json`;
        return isSingle2 ? sql`(select ${json2}_object(${jsonColumns}) as ${sql.identifier("r")} from (${innerQuery.sql}) as ${sql.identifier("t")}) as ${sql.identifier(k)}` : sql`coalesce((select ${json2}_group_array(json_object(${jsonColumns})) as ${sql.identifier("r")} from (${innerQuery.sql}) as ${sql.identifier("t")}), ${jsonb2}_array()) as ${sql.identifier(k)}`;
      }), sql`, `);
    })() : void 0;
    const selectionArr = [
      columns,
      extras?.sql,
      joins
    ].filter((e) => e !== void 0);
    if (!selectionArr.length) throw new DrizzleError({ message: `No fields selected for table "${tableConfig.name}"${currentPath ? ` ("${currentPath}")` : ""}` });
    return {
      sql: sql`select ${sql.join(selectionArr, sql`, `)} from ${getTableAsAliasSQL(table2)}${throughJoin}${sql` where ${where}`.if(where)}${sql` order by ${order}`.if(order)}${sql` limit ${limit}`.if(limit !== void 0)}${sql` offset ${offset}`.if(offset !== void 0)}`,
      selection
    };
  }
};
var SQLiteSyncDialect = class extends SQLiteDialect {
  static [entityKind] = "SQLiteSyncDialect";
  migrate(migrations, session, config2) {
    const migrationsTable = config2 === void 0 ? "__drizzle_migrations" : typeof config2 === "string" ? "__drizzle_migrations" : config2.migrationsTable ?? "__drizzle_migrations";
    const { newDb } = upgradeSyncIfNeeded(migrationsTable, session, migrations);
    if (newDb) {
      const migrationTableCreate = sql`
			CREATE TABLE IF NOT EXISTS ${sql.identifier(migrationsTable)} (
				id INTEGER PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric,
				name text,
				applied_at TEXT
			)`;
      session.run(migrationTableCreate);
    }
    const dbMigrations = session.all(sql`SELECT id, hash, created_at, name FROM ${sql.identifier(migrationsTable)}`);
    if (typeof config2 === "object" && config2.init) {
      if (dbMigrations.length) return { exitCode: "databaseMigrations" };
      if (migrations.length > 1) return { exitCode: "localMigrations" };
      const [migration] = migrations;
      if (!migration) return;
      session.run(sql`insert into ${sql.identifier(migrationsTable)} ("hash", "created_at", "name", "applied_at") values(${migration.hash}, ${migration.folderMillis}, ${migration.name}, ${(/* @__PURE__ */ new Date()).toISOString()})`);
      return;
    }
    const migrationsToRun = getMigrationsToRun({
      localMigrations: migrations,
      dbMigrations
    });
    session.run(sql`BEGIN`);
    try {
      for (const migration of migrationsToRun) {
        for (const stmt of migration.sql) session.run(sql.raw(stmt));
        session.run(sql`INSERT INTO ${sql.identifier(migrationsTable)} ("hash", "created_at", "name", "applied_at") values(${migration.hash}, ${migration.folderMillis}, ${migration.name}, ${(/* @__PURE__ */ new Date()).toISOString()})`);
      }
      session.run(sql`COMMIT`);
    } catch (e) {
      session.run(sql`ROLLBACK`);
      throw e;
    }
  }
};
var SQLiteAsyncDialect = class extends SQLiteDialect {
  static [entityKind] = "SQLiteAsyncDialect";
  async migrate(migrations, db2, config2) {
    const migrationsTable = config2 === void 0 ? "__drizzle_migrations" : typeof config2 === "string" ? "__drizzle_migrations" : config2.migrationsTable ?? "__drizzle_migrations";
    const { newDb } = await upgradeAsyncIfNeeded(migrationsTable, db2, migrations);
    if (newDb) {
      const migrationTableCreate = sql`
			CREATE TABLE IF NOT EXISTS ${sql.identifier(migrationsTable)} (
				id INTEGER PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric,
				name text,
				applied_at TEXT
		)
		`;
      await db2.session.run(migrationTableCreate);
    }
    const dbMigrations = await db2.session.all(sql`SELECT id, hash, created_at, name FROM ${sql.identifier(migrationsTable)};`);
    if (typeof config2 === "object" && config2.init) {
      if (dbMigrations.length) return { exitCode: "databaseMigrations" };
      if (migrations.length > 1) return { exitCode: "localMigrations" };
      const [migration] = migrations;
      if (!migration) return;
      await db2.session.run(sql`insert into ${sql.identifier(migrationsTable)} ("hash", "created_at", "name", "applied_at") values(${migration.hash}, ${migration.folderMillis}, ${migration.name}, ${(/* @__PURE__ */ new Date()).toISOString()})`);
      return;
    }
    const migrationsToRun = getMigrationsToRun({
      localMigrations: migrations,
      dbMigrations
    });
    await db2.session.transaction(async (tx) => {
      for (const migration of migrationsToRun) {
        for (const stmt of migration.sql) await tx.run(sql.raw(stmt));
        await tx.run(sql`insert into ${sql.identifier(migrationsTable)} ("hash", "created_at", "name", "applied_at") values(${migration.hash}, ${migration.folderMillis}, ${migration.name}, ${(/* @__PURE__ */ new Date()).toISOString()})`);
      }
    });
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/query-builders/query-builder.js
var QueryBuilder = class {
  static [entityKind] = "SQLiteQueryBuilder";
  dialect;
  dialectConfig;
  constructor(dialect) {
    this.dialect = is(dialect, SQLiteDialect) ? dialect : void 0;
    this.dialectConfig = is(dialect, SQLiteDialect) ? void 0 : dialect;
  }
  $with = (alias, selection) => {
    const queryBuilder = this;
    const as = (qb) => {
      if (typeof qb === "function") qb = qb(queryBuilder);
      return new Proxy(new WithSubquery(qb.getSQL(), selection ?? ("getSelectedFields" in qb ? qb.getSelectedFields() ?? {} : {}), alias, true), new SelectionProxyHandler({
        alias,
        sqlAliasedBehavior: "alias",
        sqlBehavior: "error"
      }));
    };
    return { as };
  };
  with(...queries) {
    const self2 = this;
    function select(fields) {
      return new SQLiteSelectBuilder({
        fields: fields ?? void 0,
        session: void 0,
        dialect: self2.getDialect(),
        withList: queries
      });
    }
    function selectDistinct(fields) {
      return new SQLiteSelectBuilder({
        fields: fields ?? void 0,
        session: void 0,
        dialect: self2.getDialect(),
        withList: queries,
        distinct: true
      });
    }
    return {
      select,
      selectDistinct
    };
  }
  select(fields) {
    return new SQLiteSelectBuilder({
      fields: fields ?? void 0,
      session: void 0,
      dialect: this.getDialect()
    });
  }
  selectDistinct(fields) {
    return new SQLiteSelectBuilder({
      fields: fields ?? void 0,
      session: void 0,
      dialect: this.getDialect(),
      distinct: true
    });
  }
  getDialect() {
    if (!this.dialect) this.dialect = new SQLiteSyncDialect(this.dialectConfig);
    return this.dialect;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/query-builders/insert.js
var SQLiteInsertBuilder = class {
  static [entityKind] = "SQLiteInsertBuilder";
  constructor(table2, session, dialect, withList) {
    this.table = table2;
    this.session = session;
    this.dialect = dialect;
    this.withList = withList;
  }
  values(values) {
    values = Array.isArray(values) ? values : [values];
    if (values.length === 0) throw new Error("values() must be called with at least one value");
    const mappedValues = values.map((entry) => {
      const result = {};
      const cols = this.table[Table.Symbol.Columns];
      for (const colKey of Object.keys(entry)) {
        const colValue = entry[colKey];
        result[colKey] = is(colValue, SQL) ? colValue : new Param(colValue, cols[colKey]);
      }
      return result;
    });
    return new SQLiteInsertBase(this.table, mappedValues, this.session, this.dialect, this.withList);
  }
  select(selectQuery) {
    const select = typeof selectQuery === "function" ? selectQuery(new QueryBuilder()) : selectQuery;
    if (!is(select, SQL) && !haveSameKeys(this.table[TableColumns], select._.selectedFields)) throw new Error("Insert select error: selected fields are not the same or are in a different order compared to the table definition");
    return new SQLiteInsertBase(this.table, select, this.session, this.dialect, this.withList, true);
  }
};
var SQLiteInsertBase = class extends QueryPromise {
  static [entityKind] = "SQLiteInsert";
  /** @internal */
  config;
  constructor(table2, values, session, dialect, withList, select) {
    super();
    this.session = session;
    this.dialect = dialect;
    this.config = {
      table: table2,
      values,
      withList,
      select
    };
  }
  returning(fields = this.config.table[SQLiteTable.Symbol.Columns]) {
    this.config.returning = orderSelectedFields(fields);
    return this;
  }
  /**
  * Adds an `on conflict do nothing` clause to the query.
  *
  * Calling this method simply avoids inserting a row as its alternative action.
  *
  * See docs: {@link https://orm.drizzle.team/docs/insert#on-conflict-do-nothing}
  *
  * @param config The `target` and `where` clauses.
  *
  * @example
  * ```ts
  * // Insert one row and cancel the insert if there's a conflict
  * await db.insert(cars)
  *   .values({ id: 1, brand: 'BMW' })
  *   .onConflictDoNothing();
  *
  * // Explicitly specify conflict target
  * await db.insert(cars)
  *   .values({ id: 1, brand: 'BMW' })
  *   .onConflictDoNothing({ target: cars.id });
  * ```
  */
  onConflictDoNothing(config2 = {}) {
    if (!this.config.onConflict) this.config.onConflict = [];
    if (config2.target === void 0) this.config.onConflict.push(sql` on conflict do nothing`);
    else {
      const targetSql = Array.isArray(config2.target) ? sql`${config2.target}` : sql`${[config2.target]}`;
      const whereSql = config2.where ? sql` where ${config2.where}` : sql``;
      this.config.onConflict.push(sql` on conflict ${targetSql} do nothing${whereSql}`);
    }
    return this;
  }
  /**
  * Adds an `on conflict do update` clause to the query.
  *
  * Calling this method will update the existing row that conflicts with the row proposed for insertion as its alternative action.
  *
  * See docs: {@link https://orm.drizzle.team/docs/insert#upserts-and-conflicts}
  *
  * @param config The `target`, `set` and `where` clauses.
  *
  * @example
  * ```ts
  * // Update the row if there's a conflict
  * await db.insert(cars)
  *   .values({ id: 1, brand: 'BMW' })
  *   .onConflictDoUpdate({
  *     target: cars.id,
  *     set: { brand: 'Porsche' }
  *   });
  *
  * // Upsert with 'where' clause
  * await db.insert(cars)
  *   .values({ id: 1, brand: 'BMW' })
  *   .onConflictDoUpdate({
  *     target: cars.id,
  *     set: { brand: 'newBMW' },
  *     where: sql`${cars.createdAt} > '2023-01-01'::date`,
  *   });
  * ```
  */
  onConflictDoUpdate(config2) {
    if (config2.where && (config2.targetWhere || config2.setWhere)) throw new Error('You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.');
    if (!this.config.onConflict) this.config.onConflict = [];
    const whereSql = config2.where ? sql` where ${config2.where}` : void 0;
    const targetWhereSql = config2.targetWhere ? sql` where ${config2.targetWhere}` : void 0;
    const setWhereSql = config2.setWhere ? sql` where ${config2.setWhere}` : void 0;
    const targetSql = Array.isArray(config2.target) ? sql`${config2.target}` : sql`${[config2.target]}`;
    const setSql = this.dialect.buildUpdateSet(this.config.table, mapUpdateSet(this.config.table, config2.set));
    this.config.onConflict.push(sql` on conflict ${targetSql}${targetWhereSql} do update set ${setSql}${whereSql}${setWhereSql}`);
    return this;
  }
  /** @internal */
  getSQL() {
    return this.dialect.buildInsertQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  /** @internal */
  _prepare(isOneTimeQuery = true) {
    return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run", true, void 0, {
      type: "insert",
      tables: extractUsedTable(this.config.table)
    });
  }
  prepare() {
    return this._prepare(false);
  }
  run = (placeholderValues) => {
    return this._prepare().run(placeholderValues);
  };
  all = (placeholderValues) => {
    return this._prepare().all(placeholderValues);
  };
  get = (placeholderValues) => {
    return this._prepare().get(placeholderValues);
  };
  values = (placeholderValues) => {
    return this._prepare().values(placeholderValues);
  };
  async execute() {
    return this.config.returning ? this.all() : this.run();
  }
  $dynamic() {
    return this;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/query-builders/update.js
var SQLiteUpdateBuilder = class {
  static [entityKind] = "SQLiteUpdateBuilder";
  constructor(table2, session, dialect, withList) {
    this.table = table2;
    this.session = session;
    this.dialect = dialect;
    this.withList = withList;
  }
  set(values) {
    return new SQLiteUpdateBase(this.table, mapUpdateSet(this.table, values), this.session, this.dialect, this.withList);
  }
};
var SQLiteUpdateBase = class extends QueryPromise {
  static [entityKind] = "SQLiteUpdate";
  /** @internal */
  config;
  constructor(table2, set, session, dialect, withList) {
    super();
    this.session = session;
    this.dialect = dialect;
    this.config = {
      set,
      table: table2,
      withList,
      joins: []
    };
  }
  from(source) {
    this.config.from = source;
    return this;
  }
  createJoin(joinType) {
    return ((table2, on) => {
      const tableName = getTableLikeName(table2);
      if (typeof tableName === "string" && this.config.joins.some((join) => join.alias === tableName)) throw new Error(`Alias "${tableName}" is already used in this query`);
      if (typeof on === "function") {
        const from = this.config.from ? is(table2, SQLiteTable) ? table2[Table.Symbol.Columns] : is(table2, Subquery) ? table2._.selectedFields : is(table2, SQLiteViewBase) ? table2[ViewBaseConfig].selectedFields : void 0 : void 0;
        on = on(new Proxy(this.config.table[Table.Symbol.Columns], new SelectionProxyHandler({
          sqlAliasedBehavior: "sql",
          sqlBehavior: "sql"
        })), from && new Proxy(from, new SelectionProxyHandler({
          sqlAliasedBehavior: "sql",
          sqlBehavior: "sql"
        })));
      }
      this.config.joins.push({
        on,
        table: table2,
        joinType,
        alias: tableName
      });
      return this;
    });
  }
  leftJoin = this.createJoin("left");
  rightJoin = this.createJoin("right");
  innerJoin = this.createJoin("inner");
  fullJoin = this.createJoin("full");
  /**
  * Adds a 'where' clause to the query.
  *
  * Calling this method will update only those rows that fulfill a specified condition.
  *
  * See docs: {@link https://orm.drizzle.team/docs/update}
  *
  * @param where the 'where' clause.
  *
  * @example
  * You can use conditional operators and `sql function` to filter the rows to be updated.
  *
  * ```ts
  * // Update all cars with green color
  * db.update(cars).set({ color: 'red' })
  *   .where(eq(cars.color, 'green'));
  * // or
  * db.update(cars).set({ color: 'red' })
  *   .where(sql`${cars.color} = 'green'`)
  * ```
  *
  * You can logically combine conditional operators with `and()` and `or()` operators:
  *
  * ```ts
  * // Update all BMW cars with a green color
  * db.update(cars).set({ color: 'red' })
  *   .where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
  *
  * // Update all cars with the green or blue color
  * db.update(cars).set({ color: 'red' })
  *   .where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
  * ```
  */
  where(where) {
    this.config.where = where;
    return this;
  }
  orderBy(...columns) {
    if (typeof columns[0] === "function") {
      const orderBy = columns[0](new Proxy(this.config.table[Table.Symbol.Columns], new SelectionProxyHandler({
        sqlAliasedBehavior: "alias",
        sqlBehavior: "sql"
      })));
      const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
      this.config.orderBy = orderByArray;
    } else {
      const orderByArray = columns;
      this.config.orderBy = orderByArray;
    }
    return this;
  }
  limit(limit) {
    this.config.limit = limit;
    return this;
  }
  returning(fields = this.config.table[SQLiteTable.Symbol.Columns]) {
    this.config.returning = orderSelectedFields(fields);
    return this;
  }
  /** @internal */
  getSQL() {
    return this.dialect.buildUpdateQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  /** @internal */
  _prepare(isOneTimeQuery = true) {
    return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run", true, void 0, {
      type: "insert",
      tables: extractUsedTable(this.config.table)
    });
  }
  prepare() {
    return this._prepare(false);
  }
  run = (placeholderValues) => {
    return this._prepare().run(placeholderValues);
  };
  all = (placeholderValues) => {
    return this._prepare().all(placeholderValues);
  };
  get = (placeholderValues) => {
    return this._prepare().get(placeholderValues);
  };
  values = (placeholderValues) => {
    return this._prepare().values(placeholderValues);
  };
  async execute() {
    return this.config.returning ? this.all() : this.run();
  }
  $dynamic() {
    return this;
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/db.js
var BaseSQLiteDatabase = class {
  static [entityKind] = "BaseSQLiteDatabase";
  /** @deprecated */
  _query;
  query;
  constructor(resultKind, dialect, session, relations2, _schema, rowModeRQB, forbidJsonb) {
    this.resultKind = resultKind;
    this.dialect = dialect;
    this.session = session;
    this.rowModeRQB = rowModeRQB;
    this.forbidJsonb = forbidJsonb;
    this._ = _schema ? {
      schema: _schema.schema,
      fullSchema: _schema.fullSchema,
      tableNamesMap: _schema.tableNamesMap,
      relations: relations2
    } : {
      schema: void 0,
      fullSchema: {},
      tableNamesMap: {},
      relations: relations2
    };
    this._query = {};
    const query = this._query;
    if (this._.schema) for (const [tableName, columns] of Object.entries(this._.schema)) query[tableName] = new _RelationalQueryBuilder(resultKind, _schema.fullSchema, this._.schema, this._.tableNamesMap, _schema.fullSchema[tableName], columns, dialect, session);
    this.query = {};
    for (const [tableName, relation] of Object.entries(relations2)) this.query[tableName] = new RelationalQueryBuilder(resultKind, relations2, relations2[relation.name].table, relation, dialect, session, rowModeRQB, forbidJsonb);
    this.$cache = { invalidate: async (_params) => {
    } };
  }
  /**
  * Creates a subquery that defines a temporary named result set as a CTE.
  *
  * It is useful for breaking down complex queries into simpler parts and for reusing the result set in subsequent parts of the query.
  *
  * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
  *
  * @param alias The alias for the subquery.
  *
  * Failure to provide an alias will result in a DrizzleTypeError, preventing the subquery from being referenced in other queries.
  *
  * @example
  *
  * ```ts
  * // Create a subquery with alias 'sq' and use it in the select query
  * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
  *
  * const result = await db.with(sq).select().from(sq);
  * ```
  *
  * To select arbitrary SQL values as fields in a CTE and reference them in other CTEs or in the main query, you need to add aliases to them:
  *
  * ```ts
  * // Select an arbitrary SQL value as a field in a CTE and reference it in the main query
  * const sq = db.$with('sq').as(db.select({
  *   name: sql<string>`upper(${users.name})`.as('name'),
  * })
  * .from(users));
  *
  * const result = await db.with(sq).select({ name: sq.name }).from(sq);
  * ```
  */
  $with = (alias, selection) => {
    const self2 = this;
    const as = (qb) => {
      if (typeof qb === "function") qb = qb(new QueryBuilder(self2.dialect));
      return new Proxy(new WithSubquery(qb.getSQL(), selection ?? ("getSelectedFields" in qb ? qb.getSelectedFields() ?? {} : {}), alias, true), new SelectionProxyHandler({
        alias,
        sqlAliasedBehavior: "alias",
        sqlBehavior: "error"
      }));
    };
    return { as };
  };
  $count(source, filters) {
    return new SQLiteCountBuilder({
      source,
      filters,
      session: this.session
    });
  }
  /**
  * Incorporates a previously defined CTE (using `$with`) into the main query.
  *
  * This method allows the main query to reference a temporary named result set.
  *
  * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
  *
  * @param queries The CTEs to incorporate into the main query.
  *
  * @example
  *
  * ```ts
  * // Define a subquery 'sq' as a CTE using $with
  * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
  *
  * // Incorporate the CTE 'sq' into the main query and select from it
  * const result = await db.with(sq).select().from(sq);
  * ```
  */
  with(...queries) {
    const self2 = this;
    function select(fields) {
      return new SQLiteSelectBuilder({
        fields: fields ?? void 0,
        session: self2.session,
        dialect: self2.dialect,
        withList: queries
      });
    }
    function selectDistinct(fields) {
      return new SQLiteSelectBuilder({
        fields: fields ?? void 0,
        session: self2.session,
        dialect: self2.dialect,
        withList: queries,
        distinct: true
      });
    }
    function update(table2) {
      return new SQLiteUpdateBuilder(table2, self2.session, self2.dialect, queries);
    }
    function insert(into) {
      return new SQLiteInsertBuilder(into, self2.session, self2.dialect, queries);
    }
    function delete_(from) {
      return new SQLiteDeleteBase(from, self2.session, self2.dialect, queries);
    }
    return {
      select,
      selectDistinct,
      update,
      insert,
      delete: delete_
    };
  }
  select(fields) {
    return new SQLiteSelectBuilder({
      fields: fields ?? void 0,
      session: this.session,
      dialect: this.dialect
    });
  }
  selectDistinct(fields) {
    return new SQLiteSelectBuilder({
      fields: fields ?? void 0,
      session: this.session,
      dialect: this.dialect,
      distinct: true
    });
  }
  /**
  * Creates an update query.
  *
  * Calling this method without `.where()` clause will update all rows in a table. The `.where()` clause specifies which rows should be updated.
  *
  * Use `.set()` method to specify which values to update.
  *
  * See docs: {@link https://orm.drizzle.team/docs/update}
  *
  * @param table The table to update.
  *
  * @example
  *
  * ```ts
  * // Update all rows in the 'cars' table
  * await db.update(cars).set({ color: 'red' });
  *
  * // Update rows with filters and conditions
  * await db.update(cars).set({ color: 'red' }).where(eq(cars.brand, 'BMW'));
  *
  * // Update with returning clause
  * const updatedCar: Car[] = await db.update(cars)
  *   .set({ color: 'red' })
  *   .where(eq(cars.id, 1))
  *   .returning();
  * ```
  */
  update(table2) {
    return new SQLiteUpdateBuilder(table2, this.session, this.dialect);
  }
  $cache;
  /**
  * Creates an insert query.
  *
  * Calling this method will create new rows in a table. Use `.values()` method to specify which values to insert.
  *
  * See docs: {@link https://orm.drizzle.team/docs/insert}
  *
  * @param table The table to insert into.
  *
  * @example
  *
  * ```ts
  * // Insert one row
  * await db.insert(cars).values({ brand: 'BMW' });
  *
  * // Insert multiple rows
  * await db.insert(cars).values([{ brand: 'BMW' }, { brand: 'Porsche' }]);
  *
  * // Insert with returning clause
  * const insertedCar: Car[] = await db.insert(cars)
  *   .values({ brand: 'BMW' })
  *   .returning();
  * ```
  */
  insert(into) {
    return new SQLiteInsertBuilder(into, this.session, this.dialect);
  }
  /**
  * Creates a delete query.
  *
  * Calling this method without `.where()` clause will delete all rows in a table. The `.where()` clause specifies which rows should be deleted.
  *
  * See docs: {@link https://orm.drizzle.team/docs/delete}
  *
  * @param table The table to delete from.
  *
  * @example
  *
  * ```ts
  * // Delete all rows in the 'cars' table
  * await db.delete(cars);
  *
  * // Delete rows with filters and conditions
  * await db.delete(cars).where(eq(cars.color, 'green'));
  *
  * // Delete with returning clause
  * const deletedCar: Car[] = await db.delete(cars)
  *   .where(eq(cars.id, 1))
  *   .returning();
  * ```
  */
  delete(from) {
    return new SQLiteDeleteBase(from, this.session, this.dialect);
  }
  run(query) {
    const sequel = typeof query === "string" ? sql.raw(query) : query.getSQL();
    if (this.resultKind === "async") return new SQLiteRaw(async () => this.session.run(sequel), () => sequel, "run", this.dialect, this.session.extractRawRunValueFromBatchResult.bind(this.session));
    return this.session.run(sequel);
  }
  all(query) {
    const sequel = typeof query === "string" ? sql.raw(query) : query.getSQL();
    if (this.resultKind === "async") return new SQLiteRaw(async () => this.session.all(sequel), () => sequel, "all", this.dialect, this.session.extractRawAllValueFromBatchResult.bind(this.session));
    return this.session.all(sequel);
  }
  get(query) {
    const sequel = typeof query === "string" ? sql.raw(query) : query.getSQL();
    if (this.resultKind === "async") return new SQLiteRaw(async () => this.session.get(sequel), () => sequel, "get", this.dialect, this.session.extractRawGetValueFromBatchResult.bind(this.session));
    return this.session.get(sequel);
  }
  values(query) {
    const sequel = typeof query === "string" ? sql.raw(query) : query.getSQL();
    if (this.resultKind === "async") return new SQLiteRaw(async () => this.session.values(sequel), () => sequel, "values", this.dialect, this.session.extractRawValuesValueFromBatchResult.bind(this.session));
    return this.session.values(sequel);
  }
  transaction(transaction, config2) {
    return this.session.transaction(transaction, config2);
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/sqlite-core/session.js
var ExecuteResultSync = class extends QueryPromise {
  static [entityKind] = "ExecuteResultSync";
  constructor(resultCb) {
    super();
    this.resultCb = resultCb;
  }
  async execute() {
    return this.resultCb();
  }
  sync() {
    return this.resultCb();
  }
};
var SQLitePreparedQuery = class {
  static [entityKind] = "PreparedQuery";
  /** @internal */
  joinsNotNullableMap;
  constructor(mode, executeMethod, query, cache, queryMetadata, cacheConfig) {
    this.mode = mode;
    this.executeMethod = executeMethod;
    this.query = query;
    this.cache = cache;
    this.queryMetadata = queryMetadata;
    this.cacheConfig = cacheConfig;
    if (cache && cache.strategy() === "all" && cacheConfig === void 0) this.cacheConfig = {
      enabled: true,
      autoInvalidate: true
    };
    if (!this.cacheConfig?.enabled) this.cacheConfig = void 0;
  }
  /** @internal */
  async queryWithCache(queryString, params, query) {
    if (this.cache === void 0 || is(this.cache, NoopCache) || this.queryMetadata === void 0) try {
      return await query();
    } catch (e) {
      throw new DrizzleQueryError(queryString, params, e);
    }
    if (this.cacheConfig && !this.cacheConfig.enabled) try {
      return await query();
    } catch (e) {
      throw new DrizzleQueryError(queryString, params, e);
    }
    if ((this.queryMetadata.type === "insert" || this.queryMetadata.type === "update" || this.queryMetadata.type === "delete") && this.queryMetadata.tables.length > 0) try {
      const [res] = await Promise.all([query(), this.cache.onMutate({ tables: this.queryMetadata.tables })]);
      return res;
    } catch (e) {
      throw new DrizzleQueryError(queryString, params, e);
    }
    if (!this.cacheConfig) try {
      return await query();
    } catch (e) {
      throw new DrizzleQueryError(queryString, params, e);
    }
    if (this.queryMetadata.type === "select") {
      const fromCache = await this.cache.get(this.cacheConfig.tag ?? await hashQuery(queryString, params), this.queryMetadata.tables, this.cacheConfig.tag !== void 0, this.cacheConfig.autoInvalidate);
      if (fromCache === void 0) {
        let result;
        try {
          result = await query();
        } catch (e) {
          throw new DrizzleQueryError(queryString, params, e);
        }
        await this.cache.put(this.cacheConfig.tag ?? await hashQuery(queryString, params), result, this.cacheConfig.autoInvalidate ? this.queryMetadata.tables : [], this.cacheConfig.tag !== void 0, this.cacheConfig.config);
        return result;
      }
      return fromCache;
    }
    try {
      return await query();
    } catch (e) {
      throw new DrizzleQueryError(queryString, params, e);
    }
  }
  getQuery() {
    return this.query;
  }
  mapRunResult(result, _isFromBatch) {
    return result;
  }
  mapAllResult(_result, _isFromBatch) {
    throw new Error("Not implemented");
  }
  mapGetResult(_result, _isFromBatch) {
    throw new Error("Not implemented");
  }
  execute(placeholderValues) {
    if (this.mode === "async") return this[this.executeMethod](placeholderValues);
    return new ExecuteResultSync(() => this[this.executeMethod](placeholderValues));
  }
  mapResult(response, isFromBatch) {
    switch (this.executeMethod) {
      case "run":
        return this.mapRunResult(response, isFromBatch);
      case "all":
        return this.mapAllResult(response, isFromBatch);
      case "get":
        return this.mapGetResult(response, isFromBatch);
    }
  }
};
var SQLiteSession = class {
  static [entityKind] = "SQLiteSession";
  constructor(dialect) {
    this.dialect = dialect;
  }
  prepareOneTimeQuery(query, fields, executeMethod, isResponseInArrayMode, customResultMapper, queryMetadata, cacheConfig) {
    return this.prepareQuery(query, fields, executeMethod, isResponseInArrayMode, customResultMapper, queryMetadata, cacheConfig);
  }
  prepareOneTimeRelationalQuery(query, fields, executeMethod, customResultMapper) {
    return this.prepareRelationalQuery(query, fields, executeMethod, customResultMapper);
  }
  run(query) {
    const staticQuery = this.dialect.sqlToQuery(query);
    try {
      return this.prepareOneTimeQuery(staticQuery, void 0, "run", false).run();
    } catch (err) {
      throw new DrizzleError({
        cause: err,
        message: `Failed to run the query '${staticQuery.sql}'`
      });
    }
  }
  /** @internal */
  extractRawRunValueFromBatchResult(result) {
    return result;
  }
  all(query) {
    return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run", false).all();
  }
  /** @internal */
  extractRawAllValueFromBatchResult(_result) {
    throw new Error("Not implemented");
  }
  get(query) {
    return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run", false).get();
  }
  /** @internal */
  extractRawGetValueFromBatchResult(_result) {
    throw new Error("Not implemented");
  }
  values(query) {
    return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run", false).values();
  }
  async count(sql2) {
    return (await this.values(sql2))[0][0];
  }
  /** @internal */
  extractRawValuesValueFromBatchResult(_result) {
    throw new Error("Not implemented");
  }
};
var SQLiteTransaction = class extends BaseSQLiteDatabase {
  static [entityKind] = "SQLiteTransaction";
  constructor(resultType, dialect, session, relations2, schema, nestedIndex = 0, rowModeRQB, forbidJsonb) {
    super(resultType, dialect, session, relations2, schema, rowModeRQB, forbidJsonb);
    this.relations = relations2;
    this.schema = schema;
    this.nestedIndex = nestedIndex;
  }
  rollback() {
    throw new TransactionRollbackError();
  }
};

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/libsql/session.js
var LibSQLSession = class LibSQLSession2 extends SQLiteSession {
  static [entityKind] = "LibSQLSession";
  logger;
  cache;
  constructor(client, dialect, relations2, schema, options, tx) {
    super(dialect);
    this.client = client;
    this.relations = relations2;
    this.schema = schema;
    this.options = options;
    this.tx = tx;
    this.logger = options.logger ?? new NoopLogger();
    this.cache = options.cache ?? new NoopCache();
  }
  prepareQuery(query, fields, executeMethod, isResponseInArrayMode, customResultMapper, queryMetadata, cacheConfig) {
    return new LibSQLPreparedQuery(this.client, query, this.logger, this.cache, queryMetadata, cacheConfig, fields, this.tx, executeMethod, isResponseInArrayMode, customResultMapper);
  }
  prepareRelationalQuery(query, fields, executeMethod, customResultMapper) {
    return new LibSQLPreparedQuery(this.client, query, this.logger, this.cache, void 0, void 0, fields, this.tx, executeMethod, false, customResultMapper, true);
  }
  async batch(queries) {
    const preparedQueries = [];
    const builtQueries = [];
    for (const query of queries) {
      const preparedQuery = query._prepare();
      const builtQuery = preparedQuery.getQuery();
      preparedQueries.push(preparedQuery);
      builtQueries.push({
        sql: builtQuery.sql,
        args: builtQuery.params
      });
    }
    return (await this.client.batch(builtQueries)).map((result, i) => preparedQueries[i].mapResult(result, true));
  }
  async migrate(queries) {
    const preparedQueries = [];
    const builtQueries = [];
    for (const query of queries) {
      const preparedQuery = query._prepare();
      const builtQuery = preparedQuery.getQuery();
      preparedQueries.push(preparedQuery);
      builtQueries.push({
        sql: builtQuery.sql,
        args: builtQuery.params
      });
    }
    return (await this.client.migrate(builtQueries)).map((result, i) => preparedQueries[i].mapResult(result, true));
  }
  async transaction(transaction, _config) {
    const libsqlTx = await this.client.transaction();
    const session = new LibSQLSession2(this.client, this.dialect, this.relations, this.schema, this.options, libsqlTx);
    const tx = new LibSQLTransaction("async", this.dialect, session, this.relations, this.schema);
    try {
      const result = await transaction(tx);
      await libsqlTx.commit();
      return result;
    } catch (err) {
      await libsqlTx.rollback();
      throw err;
    }
  }
  extractRawAllValueFromBatchResult(result) {
    return result.rows;
  }
  extractRawGetValueFromBatchResult(result) {
    return result.rows[0];
  }
  extractRawValuesValueFromBatchResult(result) {
    return result.rows;
  }
};
var LibSQLTransaction = class LibSQLTransaction2 extends SQLiteTransaction {
  static [entityKind] = "LibSQLTransaction";
  async transaction(transaction) {
    const savepointName = `sp${this.nestedIndex}`;
    const tx = new LibSQLTransaction2("async", this.dialect, this.session, this.relations, this.schema, this.nestedIndex + 1);
    await this.session.run(sql.raw(`savepoint ${savepointName}`));
    try {
      const result = await transaction(tx);
      await this.session.run(sql.raw(`release savepoint ${savepointName}`));
      return result;
    } catch (err) {
      await this.session.run(sql.raw(`rollback to savepoint ${savepointName}`));
      throw err;
    }
  }
};
var LibSQLPreparedQuery = class extends SQLitePreparedQuery {
  static [entityKind] = "LibSQLPreparedQuery";
  constructor(client, query, logger, cache, queryMetadata, cacheConfig, fields, tx, executeMethod, _isResponseInArrayMode, customResultMapper, isRqbV2Query) {
    super("async", executeMethod, query, cache, queryMetadata, cacheConfig);
    this.client = client;
    this.logger = logger;
    this.fields = fields;
    this.tx = tx;
    this._isResponseInArrayMode = _isResponseInArrayMode;
    this.customResultMapper = customResultMapper;
    this.isRqbV2Query = isRqbV2Query;
  }
  async run(placeholderValues) {
    const params = fillPlaceholders(this.query.params, placeholderValues ?? {});
    this.logger.logQuery(this.query.sql, params);
    return await this.queryWithCache(this.query.sql, params, async () => {
      const stmt = {
        sql: this.query.sql,
        args: params
      };
      return this.tx ? this.tx.execute(stmt) : this.client.execute(stmt);
    });
  }
  async all(placeholderValues) {
    if (this.isRqbV2Query) return this.allRqbV2(placeholderValues);
    const { fields, logger, query, tx, client, customResultMapper } = this;
    if (!fields && !customResultMapper) {
      const params = fillPlaceholders(query.params, placeholderValues ?? {});
      logger.logQuery(query.sql, params);
      return await this.queryWithCache(query.sql, params, async () => {
        const stmt = {
          sql: query.sql,
          args: params
        };
        return (tx ? tx.execute(stmt) : client.execute(stmt)).then(({ rows: rows2 }) => this.mapAllResult(rows2));
      });
    }
    const rows = await this.values(placeholderValues);
    return this.mapAllResult(rows);
  }
  async allRqbV2(placeholderValues) {
    const { logger, query, tx, client, customResultMapper } = this;
    const params = fillPlaceholders(query.params, placeholderValues ?? {});
    logger.logQuery(query.sql, params);
    const stmt = {
      sql: query.sql,
      args: params
    };
    return customResultMapper(await (tx ?? client).execute(stmt).then(({ rows }) => rows.map((row) => normalizeRow(row))), normalizeFieldValue);
  }
  mapAllResult(rows, isFromBatch) {
    if (isFromBatch) rows = rows.rows;
    if (!this.fields && !this.customResultMapper) return rows.map((row) => normalizeRow(row));
    if (this.customResultMapper) return this.customResultMapper(rows, normalizeFieldValue);
    return rows.map((row) => {
      return mapResultRow(this.fields, Array.prototype.slice.call(row).map((v) => normalizeFieldValue(v)), this.joinsNotNullableMap);
    });
  }
  async get(placeholderValues) {
    if (this.isRqbV2Query) return this.getRqbV2(placeholderValues);
    const { fields, logger, query, tx, client, customResultMapper } = this;
    if (!fields && !customResultMapper) {
      const params = fillPlaceholders(query.params, placeholderValues ?? {});
      logger.logQuery(query.sql, params);
      return await this.queryWithCache(query.sql, params, async () => {
        const stmt = {
          sql: query.sql,
          args: params
        };
        return (tx ? tx.execute(stmt) : client.execute(stmt)).then(({ rows: rows2 }) => this.mapGetResult(rows2));
      });
    }
    const rows = await this.values(placeholderValues);
    return this.mapGetResult(rows);
  }
  async getRqbV2(placeholderValues) {
    const { logger, query, tx, client, customResultMapper } = this;
    const params = fillPlaceholders(query.params, placeholderValues ?? {});
    logger.logQuery(query.sql, params);
    const stmt = {
      sql: query.sql,
      args: params
    };
    const { rows } = await (tx ?? client).execute(stmt);
    if (rows[0] === void 0) return;
    return customResultMapper([normalizeRow(rows[0])], normalizeFieldValue);
  }
  mapGetResult(rows, isFromBatch) {
    if (isFromBatch) rows = rows.rows;
    const row = rows[0];
    if (!this.fields && !this.customResultMapper) return normalizeRow(row);
    if (!row) return;
    if (this.customResultMapper) return this.customResultMapper(rows, normalizeFieldValue);
    return mapResultRow(this.fields, Array.prototype.slice.call(row).map((v) => normalizeFieldValue(v)), this.joinsNotNullableMap);
  }
  async values(placeholderValues) {
    const params = fillPlaceholders(this.query.params, placeholderValues ?? {});
    this.logger.logQuery(this.query.sql, params);
    return await this.queryWithCache(this.query.sql, params, async () => {
      const stmt = {
        sql: this.query.sql,
        args: params
      };
      return (this.tx ? this.tx.execute(stmt) : this.client.execute(stmt)).then(({ rows }) => rows);
    });
  }
  /** @internal */
  isResponseInArrayMode() {
    return this._isResponseInArrayMode;
  }
};
function normalizeRow(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    if (Object.prototype.propertyIsEnumerable.call(obj, key)) acc[key] = obj[key];
    return acc;
  }, {});
}
function normalizeFieldValue(value) {
  if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
    if (typeof Buffer !== "undefined") {
      if (!(value instanceof Buffer)) return Buffer.from(value);
      return value;
    }
    if (typeof TextDecoder !== "undefined") return new TextDecoder().decode(value);
    throw new Error("TextDecoder is not available. Please provide either Buffer or TextDecoder polyfill.");
  }
  return value;
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/libsql/driver-core.js
var LibSQLDatabase = class extends BaseSQLiteDatabase {
  static [entityKind] = "LibSQLDatabase";
  async batch(batch) {
    return this.session.batch(batch);
  }
};
function construct(client, config2 = {}) {
  const dialect = new SQLiteAsyncDialect({ casing: config2.casing });
  let logger;
  if (config2.logger === true) logger = new DefaultLogger();
  else if (config2.logger !== false) logger = config2.logger;
  let schema;
  if (config2.schema) {
    const tablesConfig = extractTablesRelationalConfig(config2.schema, createTableRelationsHelpers);
    schema = {
      fullSchema: config2.schema,
      schema: tablesConfig.tables,
      tableNamesMap: tablesConfig.tableNamesMap
    };
  }
  const relations2 = config2.relations ?? {};
  const db2 = new LibSQLDatabase("async", dialect, new LibSQLSession(client, dialect, relations2, schema, {
    logger,
    cache: config2.cache
  }, void 0), relations2, schema);
  db2.$client = client;
  db2.$cache = config2.cache;
  if (db2.$cache) db2.$cache["invalidate"] = config2.cache?.onMutate;
  return db2;
}

// ../../node_modules/.pnpm/drizzle-orm@1.0.0-beta.22_@libsql+client@0.17.3_@opentelemetry+api@1.9.1_@sinclair+typebox@0.34.49_zod@4.4.3/node_modules/drizzle-orm/libsql/driver.js
function drizzle(...params) {
  if (typeof params[0] === "string") return construct(createClient({ url: params[0] }), params[1]);
  const { connection, client, ...drizzleConfig } = params[0];
  if (client) return construct(client, drizzleConfig);
  return construct(typeof connection === "string" ? createClient({ url: connection }) : createClient(connection), drizzleConfig);
}
(function(_drizzle) {
  function mock(config2) {
    return construct({}, config2);
  }
  _drizzle.mock = mock;
})(drizzle || (drizzle = {}));

// ../../packages/shared/src/db/schema.ts
var schema_exports = {};
__export(schema_exports, {
  places: () => places,
  plans: () => plans,
  segments: () => segments,
  trips: () => trips,
  userTrips: () => userTrips,
  users: () => users
});

// ../../packages/shared/src/db/dbUtils.ts
var import_dayjs2 = __toESM(require_dayjs_min());
var timestampSeconds = (name2) => customType2({
  dataType() {
    return "integer";
  },
  toDriver(value) {
    if (value instanceof Date) return (0, import_dayjs2.default)(value).unix();
    if (typeof value === "number") return import_dayjs2.default.unix(value).unix();
    if (typeof value === "string") return (0, import_dayjs2.default)(value).unix();
    console.warn("toDriver unexpected input:", value);
    return value;
  },
  fromDriver(value) {
    return import_dayjs2.default.unix(value).toDate();
  }
})(name2);
var ts = (name2) => timestampSeconds(name2).default(sql.raw("(unixepoch())")).notNull();
var timestamps = {
  updatedAt: ts("updatedAt"),
  createdAt: ts("createdAt")
};
var idColumn = () => integer2("id").primaryKey({ autoIncrement: true });
var sqliteTableObject = sqliteTable;
var table = (name2, columns, extraConfig) => {
  if (!name2?.length)
    throw new Error("Table name required");
  if (!Object.keys(columns).length)
    throw new Error("Table properties required");
  const { id, ...rest } = columns;
  const finalColumns = {
    ...id === false ? {} : { id: idColumn() },
    ...timestamps,
    ...rest
  };
  return sqliteTableObject(
    name2,
    finalColumns,
    extraConfig
  );
};
var lower = (value) => sql`lower(${value})`;
var optsCascadeAll = {
  onUpdate: "cascade",
  onDelete: "cascade"
};

// ../../packages/shared/src/db/schema.ts
var users = table("users", {
  email: text2("email").notNull(),
  firebaseUid: text2("firebaseUid"),
  // Firebase UID for Google authentication
  enabled: integer2("enabled", { mode: "boolean" }).default(false),
  // Beta access control
  name: text2("name"),
  // User display name from Firebase
  photoUrl: text2("photoUrl")
  // User photo URL from Firebase
}, (table2) => [
  uniqueIndex("emailUniqueIndex").on(lower(table2.email)),
  uniqueIndex("firebaseUidUniqueIndex").on(table2.firebaseUid)
]);
var trips = table("trips", {
  userId: integer2("userId").notNull().references(() => users.id, optsCascadeAll),
  name: text2("name").notNull(),
  description: text2("description"),
  coverImageUrl: text2("coverImageUrl")
});
var userTrips = table("userTrips", {
  id: false,
  userId: integer2("userId").notNull().references(() => users.id, optsCascadeAll),
  tripId: integer2("tripId").notNull().references(() => trips.id, optsCascadeAll),
  ...timestamps
}, (table2) => ({
  pk: primaryKey({
    columns: [
      table2.userId,
      table2.tripId
    ]
  })
}));
var plans = table("plans", {
  tripId: integer2("tripId").notNull().references(() => trips.id, optsCascadeAll),
  name: text2("name").notNull(),
  description: text2("description")
});
var segments = table("segments", {
  tripId: integer2("tripId").notNull().references(() => trips.id, optsCascadeAll),
  planId: integer2("planId").notNull().references(() => plans.id, optsCascadeAll),
  name: text2("name").notNull(),
  description: text2("description"),
  startDate: timestampSeconds("startDate").notNull(),
  endDate: timestampSeconds("endDate").notNull(),
  coordsLat: real2("coordsLat"),
  coordsLng: real2("coordsLng"),
  color: text2("color").notNull(),
  flightBooked: integer2("flightBooked", { mode: "boolean" }).default(false).notNull(),
  stayBooked: integer2("stayBooked", { mode: "boolean" }).default(false).notNull(),
  isShengenRegion: integer2("isShengenRegion", { mode: "boolean" }).default(false).notNull()
});
var places = table("places", {
  name: text2("name").notNull(),
  coverImageUrl: text2("coverImageUrl"),
  focus: text2("focus"),
  quickTip: text2("quickTip"),
  personalNotes: text2("personalNotes"),
  region: text2("region"),
  travelWindow: text2("travelWindow"),
  isBookmarked: integer2("isBookmarked", { mode: "boolean" }).default(false).notNull()
});

// ../../packages/shared/src/db/relations.ts
var relations = defineRelations(schema_exports, (r) => ({
  trips: {
    members: r.many.userTrips({
      from: r.trips.id,
      to: r.userTrips.tripId,
      alias: "userTrips"
    }),
    plans: r.many.plans({
      from: r.trips.id,
      to: r.plans.tripId
    }),
    segments: r.many.segments({
      from: r.trips.id,
      to: r.segments.tripId
    })
  },
  userTrips: {
    user: r.one.users({
      from: r.userTrips.userId,
      to: r.users.id,
      alias: "userTrips"
    }),
    trip: r.one.trips({
      from: r.userTrips.tripId,
      to: r.trips.id,
      alias: "userTrips"
    })
  },
  plans: {
    trip: r.one.trips({
      from: r.plans.tripId,
      to: r.trips.id
    }),
    segments: r.many.segments({
      from: r.plans.id,
      to: r.segments.planId
    })
  },
  segments: {
    trip: r.one.trips({
      from: r.segments.tripId,
      to: r.trips.id
    }),
    plan: r.one.plans({
      from: r.segments.planId,
      to: r.plans.id
    })
  }
}));

// ../../packages/shared/src/db/index.ts
if (!process.env.TURSO_DATABASE_URL?.length) {
  console.error("Missing TURSO_DATABASE_URL env var", JSON.stringify(process.env, null, 2));
  throw new Error("Missing TURSO_DATABASE_URL env var");
}
var turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN
});
var db = drizzle({
  client: turso,
  schema: schema_exports,
  relations
});
var db_default = db;

// ../../packages/shared/src/db/repos/repo.ts
var Repository = class {
  constructor(name2, plural, schema, db2) {
    this.name = name2;
    this.plural = plural;
    this.schema = schema;
    this.db = db2 ?? db_default;
  }
  //region Helpers
  get idColumn() {
    return this.schema.id;
  }
  get createdAtColumn() {
    return this.schema.createdAt;
  }
  tx(_transaction) {
    throw new Error("Method not implemented.");
  }
  normalizeDateValue(value) {
    if (!value) return /* @__PURE__ */ new Date(0);
    if (typeof value === "string") return new Date(value);
    if (value instanceof Date) return value;
    if (typeof value === "number")
      return new Date(value < 1e12 ? value * 1e3 : value);
    return value;
  }
  //endregion Helpers
  async create(data) {
    try {
      const result = await this.db.insert(this.schema).values(data).returning();
      return result[0];
    } catch (e) {
      console.error(`Error creating ${this.name}:`, e);
      throw new Error(`Failed to create ${this.name}`);
    }
  }
  async findAll() {
    try {
      return await this.db.select().from(this.schema).orderBy(desc(this.idColumn));
    } catch (e) {
      console.error(`Error fetching ${this.plural}:`, e);
      throw new Error(`Failed to fetch ${this.plural}`);
    }
  }
  async findAllBy(key, value) {
    try {
      const field = this.schema[key];
      return await this.db.select().from(this.schema).where(eq(field, value)).orderBy(desc(this.createdAtColumn));
    } catch (e) {
      console.error(`Error fetching ${this.plural} by ${String(key)}:`, e);
      throw new Error(`Failed to fetch ${this.plural}`);
    }
  }
  async findOneBy(key, value) {
    try {
      const field = this.schema[key];
      const [item] = await this.db.select().from(this.schema).where(eq(field, value)).limit(1);
      return item ?? null;
    } catch (e) {
      console.error(`Error fetching ${this.name} by ${String(key)} = ${String(value)}:`, e);
      throw new Error(`Failed to fetch ${this.name}`);
    }
  }
  async findOneById(id) {
    return await this.findOneBy("id", id);
  }
  async updateById(id, data) {
    try {
      const result = await this.db.update(this.schema).set(data).where(eq(this.idColumn, id)).returning();
      return result[0];
    } catch (e) {
      console.error(`Error updating ${this.name} by ID ${id}:`, e);
      throw new Error(`Failed to update ${this.name}`);
    }
  }
  async deleteByIds(ids) {
    try {
      await this.db.delete(this.schema).where(inArray(this.idColumn, ids));
    } catch (e) {
      console.error(`Error deleting ${ids.length} ${this.plural}:`, e);
      throw new Error(`Failed to delete ${this.plural}`);
    }
  }
  async deleteById(id) {
    return await this.deleteByIds([id]);
  }
};
var repo_default = Repository;

// ../../packages/shared/src/db/repos/places.ts
var APlacesRepository = class extends repo_default {
};
var PlacesRepository = class _PlacesRepository extends APlacesRepository {
  constructor(db2) {
    super("place", "places", places, db2);
  }
  tx(transaction) {
    return new _PlacesRepository(transaction);
  }
};
var places_default = new PlacesRepository();

// ../../packages/shared/src/errors/HttpError.ts
var HttpError = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
};
var HttpError_default = HttpError;

// ../../packages/shared/src/utils/firebase/admin.ts
import { cert, getApps as getApps2, initializeApp as initializeApp2 } from "firebase-admin/app";
import { getAuth as getAuth2 } from "firebase-admin/auth";
var app2;
if (getApps2().length === 0) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") : void 0;
  const credential = privateKey ? cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey
  }) : void 0;
  app2 = initializeApp2({
    credential,
    projectId: process.env.FIREBASE_PROJECT_ID
  });
} else {
  app2 = getApps2()[0];
}
var adminAuth = getAuth2(app2);

// ../../packages/shared/src/utils/auth.ts
var verifyFirebaseToken = async (request) => {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    throw new HttpError_default(401, "Missing or invalid authorization header");
  const idToken = authHeader.substring(7);
  try {
    return await adminAuth.verifyIdToken(idToken);
  } catch (error) {
    console.error("Firebase token verification failed:", error);
    throw new HttpError_default(401, "Invalid or expired token");
  }
};
var getOrCreateUser = async (firebaseUser) => {
  const { uid: firebaseUid, email, name: name2, picture } = firebaseUser;
  if (!email)
    throw new HttpError_default(400, "Email not provided by authentication provider. Please contact support.");
  const normalizedEmail = email.toLowerCase().trim();
  const [existingByUid] = await db_default.select().from(users).where(eq(users.firebaseUid, firebaseUid)).limit(1);
  if (existingByUid)
    return existingByUid;
  const [existingByEmail] = await db_default.select().from(users).where(sql.raw(`lower(${users.email}) = ${normalizedEmail}`)).limit(1);
  if (existingByEmail) {
    if (existingByEmail.firebaseUid && existingByEmail.firebaseUid !== firebaseUid) {
      throw new HttpError_default(409, "This email is associated with a different account. Please contact support.");
    }
    const [updated] = await db_default.update(users).set({
      firebaseUid,
      name: name2 || existingByEmail.name,
      photoUrl: picture || existingByEmail.photoUrl
    }).where(eq(users.id, existingByEmail.id)).returning();
    return updated;
  }
  const [newUser] = await db_default.insert(users).values({
    email: normalizedEmail,
    firebaseUid,
    name: name2 || null,
    photoUrl: picture || null,
    enabled: false
  }).returning();
  return newUser;
};
var authorize = async (request) => {
  const firebaseToken = await verifyFirebaseToken(request);
  const user = await getOrCreateUser(firebaseToken);
  return { user, firebaseToken, userId: user.id };
};
var withAuth = (handler2) => {
  return async (req, res) => {
    try {
      const auth2 = await authorize(req);
      return await handler2(req, res, auth2);
    } catch (e) {
      if (e instanceof HttpError_default)
        return res.status(e.status).json({ error: e.message });
      console.error("Authorization error:", e);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

// src/handlers/places/createPlace.ts
var createPlace = withAuth(async (req, res, _context) => {
  try {
    const {
      name: name2,
      focus,
      quickTip,
      personalNotes,
      region,
      travelWindow,
      isBookmarked = false
    } = req.body;
    if (!name2?.length)
      return apiResponse.invalidParams(res, 'Param "name" required');
    const coverImageUrl = await getRandomUnsplashImageUrl(name2);
    const newPlace = await places_default.create({
      name: name2,
      coverImageUrl,
      focus,
      quickTip,
      personalNotes,
      region,
      travelWindow,
      isBookmarked
    });
    return apiResponse.ok(res, newPlace);
  } catch (e) {
    console.error("Error getting place:", e);
    return apiResponse.internalServerError(res);
  }
});

// src/handlers/places/getPlace.ts
var getPlace = withAuth(async (req, res, _context) => {
  try {
    const placeId = parseInt(req.query.placeId, 10);
    const place = await places_default.findOneById(placeId);
    return apiResponse.ok(res, place);
  } catch (e) {
    console.error("Error getting place:", e);
    return apiResponse.internalServerError(res);
  }
});

// src/handlers/places/getPlaces.ts
var getPlaces = withAuth(async (_req, res, _context) => {
  try {
    const places2 = await places_default.findAll();
    return apiResponse.ok(res, places2);
  } catch (e) {
    console.error("Error getting places:", e);
    return apiResponse.internalServerError(res);
  }
});

// src/handlers/places/updatePlace.ts
var updatePlace = withAuth(async (req, res, _context) => {
  const placeId = parseInt(req.query.id, 10);
  try {
    const body = req.body;
    if (!placeId)
      return apiResponse.badRequest(res, `Invalid place ID: "${placeId}"`);
    const [place] = await db_default.select().from(places).where(eq(places.id, placeId));
    if (!place)
      return apiResponse.notFound(res, "Place");
    const [updatedPlace] = await db_default.update(places).set({
      name: body.name,
      coverImageUrl: body.coverImageUrl,
      focus: body.focus,
      quickTip: body.quickTip,
      personalNotes: body.personalNotes,
      region: body.region,
      travelWindow: body.travelWindow,
      isBookmarked: body.isBookmarked
    }).where(eq(places.id, placeId)).returning();
    if (!updatedPlace)
      return apiResponse.notFound(res, "Place");
    return apiResponse.ok(res, {
      message: "Place updated successfully",
      data: updatedPlace
    });
  } catch (e) {
    console.error("Error updating place:", e);
    return apiResponse.internalServerError(res);
  }
});

// api/places/index.ts
var config = {
  runtime: "nodejs"
};
async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getPlaces(req, res);
    case "POST":
      return createPlace(req, res);
    default:
      return apiResponse.internalServerError(res);
  }
}
export {
  config,
  handler as default
};
//# sourceMappingURL=index.js.map
