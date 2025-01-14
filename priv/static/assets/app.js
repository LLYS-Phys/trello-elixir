(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
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
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // vendor/topbar.js
  var require_topbar = __commonJS({
    "vendor/topbar.js"(exports, module) {
      (function(window2, document2) {
        "use strict";
        (function() {
          var lastTime = 0;
          var vendors = ["ms", "moz", "webkit", "o"];
          for (var x = 0; x < vendors.length && !window2.requestAnimationFrame; ++x) {
            window2.requestAnimationFrame = window2[vendors[x] + "RequestAnimationFrame"];
            window2.cancelAnimationFrame = window2[vendors[x] + "CancelAnimationFrame"] || window2[vendors[x] + "CancelRequestAnimationFrame"];
          }
          if (!window2.requestAnimationFrame)
            window2.requestAnimationFrame = function(callback, element) {
              var currTime = (/* @__PURE__ */ new Date()).getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window2.setTimeout(function() {
                callback(currTime + timeToCall);
              }, timeToCall);
              lastTime = currTime + timeToCall;
              return id;
            };
          if (!window2.cancelAnimationFrame)
            window2.cancelAnimationFrame = function(id) {
              clearTimeout(id);
            };
        })();
        var canvas, currentProgress, showing, progressTimerId = null, fadeTimerId = null, delayTimerId = null, addEvent = function(elem, type, handler) {
          if (elem.addEventListener)
            elem.addEventListener(type, handler, false);
          else if (elem.attachEvent)
            elem.attachEvent("on" + type, handler);
          else
            elem["on" + type] = handler;
        }, options = {
          autoRun: true,
          barThickness: 3,
          barColors: {
            0: "rgba(26,  188, 156, .9)",
            ".25": "rgba(52,  152, 219, .9)",
            ".50": "rgba(241, 196, 15,  .9)",
            ".75": "rgba(230, 126, 34,  .9)",
            "1.0": "rgba(211, 84,  0,   .9)"
          },
          shadowBlur: 10,
          shadowColor: "rgba(0,   0,   0,   .6)",
          className: null
        }, repaint = function() {
          canvas.width = window2.innerWidth;
          canvas.height = options.barThickness * 5;
          var ctx = canvas.getContext("2d");
          ctx.shadowBlur = options.shadowBlur;
          ctx.shadowColor = options.shadowColor;
          var lineGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          for (var stop in options.barColors)
            lineGradient.addColorStop(stop, options.barColors[stop]);
          ctx.lineWidth = options.barThickness;
          ctx.beginPath();
          ctx.moveTo(0, options.barThickness / 2);
          ctx.lineTo(
            Math.ceil(currentProgress * canvas.width),
            options.barThickness / 2
          );
          ctx.strokeStyle = lineGradient;
          ctx.stroke();
        }, createCanvas = function() {
          canvas = document2.createElement("canvas");
          var style = canvas.style;
          style.position = "fixed";
          style.top = style.left = style.right = style.margin = style.padding = 0;
          style.zIndex = 100001;
          style.display = "none";
          if (options.className)
            canvas.classList.add(options.className);
          document2.body.appendChild(canvas);
          addEvent(window2, "resize", repaint);
        }, topbar2 = {
          config: function(opts) {
            for (var key in opts)
              if (options.hasOwnProperty(key))
                options[key] = opts[key];
          },
          show: function(delay) {
            if (showing)
              return;
            if (delay) {
              if (delayTimerId)
                return;
              delayTimerId = setTimeout(() => topbar2.show(), delay);
            } else {
              showing = true;
              if (fadeTimerId !== null)
                window2.cancelAnimationFrame(fadeTimerId);
              if (!canvas)
                createCanvas();
              canvas.style.opacity = 1;
              canvas.style.display = "block";
              topbar2.progress(0);
              if (options.autoRun) {
                (function loop() {
                  progressTimerId = window2.requestAnimationFrame(loop);
                  topbar2.progress(
                    "+" + 0.05 * Math.pow(1 - Math.sqrt(currentProgress), 2)
                  );
                })();
              }
            }
          },
          progress: function(to) {
            if (typeof to === "undefined")
              return currentProgress;
            if (typeof to === "string") {
              to = (to.indexOf("+") >= 0 || to.indexOf("-") >= 0 ? currentProgress : 0) + parseFloat(to);
            }
            currentProgress = to > 1 ? 1 : to;
            repaint();
            return currentProgress;
          },
          hide: function() {
            clearTimeout(delayTimerId);
            delayTimerId = null;
            if (!showing)
              return;
            showing = false;
            if (progressTimerId != null) {
              window2.cancelAnimationFrame(progressTimerId);
              progressTimerId = null;
            }
            (function loop() {
              if (topbar2.progress("+.1") >= 1) {
                canvas.style.opacity -= 0.05;
                if (canvas.style.opacity <= 0.05) {
                  canvas.style.display = "none";
                  fadeTimerId = null;
                  return;
                }
              }
              fadeTimerId = window2.requestAnimationFrame(loop);
            })();
          }
        };
        if (typeof module === "object" && typeof module.exports === "object") {
          module.exports = topbar2;
        } else if (typeof define === "function" && define.amd) {
          define(function() {
            return topbar2;
          });
        } else {
          this.topbar = topbar2;
        }
      }).call(exports, window, document);
    }
  });

  // js/external.js
  var require_external = __commonJS({
    "js/external.js"(exports, module) {
      !function(e, n) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (e = "undefined" != typeof globalThis ? globalThis : e || self).flatpickr = n();
      }(exports, function() {
        "use strict";
        var e = function() {
          return (e = Object.assign || function(e2) {
            for (var n2, t2 = 1, a2 = arguments.length; t2 < a2; t2++)
              for (var i3 in n2 = arguments[t2])
                Object.prototype.hasOwnProperty.call(n2, i3) && (e2[i3] = n2[i3]);
            return e2;
          }).apply(this, arguments);
        };
        function n() {
          for (var e2 = 0, n2 = 0, t2 = arguments.length; n2 < t2; n2++)
            e2 += arguments[n2].length;
          var a2 = Array(e2), i3 = 0;
          for (n2 = 0; n2 < t2; n2++)
            for (var o2 = arguments[n2], r2 = 0, l2 = o2.length; r2 < l2; r2++, i3++)
              a2[i3] = o2[r2];
          return a2;
        }
        var t = ["onChange", "onClose", "onDayCreate", "onDestroy", "onKeyDown", "onMonthChange", "onOpen", "onParseConfig", "onReady", "onValueUpdate", "onYearChange", "onPreCalendarPosition"], a = { _disable: [], allowInput: false, allowInvalidPreload: false, altFormat: "F j, Y", altInput: false, altInputClass: "form-control input", animate: "object" == typeof window && -1 === window.navigator.userAgent.indexOf("MSIE"), ariaDateFormat: "F j, Y", autoFillDefaultTime: true, clickOpens: true, closeOnSelect: true, conjunction: ", ", dateFormat: "Y-m-d", defaultHour: 12, defaultMinute: 0, defaultSeconds: 0, disable: [], disableMobile: false, enableSeconds: false, enableTime: false, errorHandler: function(e2) {
          return "undefined" != typeof console && console.warn(e2);
        }, getWeek: function(e2) {
          var n2 = new Date(e2.getTime());
          n2.setHours(0, 0, 0, 0), n2.setDate(n2.getDate() + 3 - (n2.getDay() + 6) % 7);
          var t2 = new Date(n2.getFullYear(), 0, 4);
          return 1 + Math.round(((n2.getTime() - t2.getTime()) / 864e5 - 3 + (t2.getDay() + 6) % 7) / 7);
        }, hourIncrement: 1, ignoredFocusElements: [], inline: false, locale: "default", minuteIncrement: 5, mode: "single", monthSelectorType: "dropdown", nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>", noCalendar: false, now: /* @__PURE__ */ new Date(), onChange: [], onClose: [], onDayCreate: [], onDestroy: [], onKeyDown: [], onMonthChange: [], onOpen: [], onParseConfig: [], onReady: [], onValueUpdate: [], onYearChange: [], onPreCalendarPosition: [], plugins: [], position: "auto", positionElement: void 0, prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>", shorthandCurrentMonth: false, showMonths: 1, static: false, time_24hr: false, weekNumbers: false, wrap: false }, i2 = { weekdays: { shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], longhand: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] }, months: { shorthand: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], longhand: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] }, daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], firstDayOfWeek: 0, ordinal: function(e2) {
          var n2 = e2 % 100;
          if (n2 > 3 && n2 < 21)
            return "th";
          switch (n2 % 10) {
            case 1:
              return "st";
            case 2:
              return "nd";
            case 3:
              return "rd";
            default:
              return "th";
          }
        }, rangeSeparator: " to ", weekAbbreviation: "Wk", scrollTitle: "Scroll to increment", toggleTitle: "Click to toggle", amPM: ["AM", "PM"], yearAriaLabel: "Year", monthAriaLabel: "Month", hourAriaLabel: "Hour", minuteAriaLabel: "Minute", time_24hr: false }, o = function(e2, n2) {
          return void 0 === n2 && (n2 = 2), ("000" + e2).slice(-1 * n2);
        }, r = function(e2) {
          return true === e2 ? 1 : 0;
        };
        function l(e2, n2) {
          var t2;
          return function() {
            var a2 = this, i3 = arguments;
            clearTimeout(t2), t2 = setTimeout(function() {
              return e2.apply(a2, i3);
            }, n2);
          };
        }
        var c = function(e2) {
          return e2 instanceof Array ? e2 : [e2];
        };
        function s(e2, n2, t2) {
          if (true === t2)
            return e2.classList.add(n2);
          e2.classList.remove(n2);
        }
        function d(e2, n2, t2) {
          var a2 = window.document.createElement(e2);
          return n2 = n2 || "", t2 = t2 || "", a2.className = n2, void 0 !== t2 && (a2.textContent = t2), a2;
        }
        function u(e2) {
          for (; e2.firstChild; )
            e2.removeChild(e2.firstChild);
        }
        function f(e2, n2) {
          return n2(e2) ? e2 : e2.parentNode ? f(e2.parentNode, n2) : void 0;
        }
        function m(e2, n2) {
          var t2 = d("div", "numInputWrapper"), a2 = d("input", "numInput " + e2), i3 = d("span", "arrowUp"), o2 = d("span", "arrowDown");
          if (-1 === navigator.userAgent.indexOf("MSIE 9.0") ? a2.type = "number" : (a2.type = "text", a2.pattern = "\\d*"), void 0 !== n2)
            for (var r2 in n2)
              a2.setAttribute(r2, n2[r2]);
          return t2.appendChild(a2), t2.appendChild(i3), t2.appendChild(o2), t2;
        }
        function g(e2) {
          try {
            return "function" == typeof e2.composedPath ? e2.composedPath()[0] : e2.target;
          } catch (n2) {
            return e2.target;
          }
        }
        var p = function() {
        }, h = function(e2, n2, t2) {
          return t2.months[n2 ? "shorthand" : "longhand"][e2];
        }, v = { D: p, F: function(e2, n2, t2) {
          e2.setMonth(t2.months.longhand.indexOf(n2));
        }, G: function(e2, n2) {
          e2.setHours((e2.getHours() >= 12 ? 12 : 0) + parseFloat(n2));
        }, H: function(e2, n2) {
          e2.setHours(parseFloat(n2));
        }, J: function(e2, n2) {
          e2.setDate(parseFloat(n2));
        }, K: function(e2, n2, t2) {
          e2.setHours(e2.getHours() % 12 + 12 * r(new RegExp(t2.amPM[1], "i").test(n2)));
        }, M: function(e2, n2, t2) {
          e2.setMonth(t2.months.shorthand.indexOf(n2));
        }, S: function(e2, n2) {
          e2.setSeconds(parseFloat(n2));
        }, U: function(e2, n2) {
          return new Date(1e3 * parseFloat(n2));
        }, W: function(e2, n2, t2) {
          var a2 = parseInt(n2), i3 = new Date(e2.getFullYear(), 0, 2 + 7 * (a2 - 1), 0, 0, 0, 0);
          return i3.setDate(i3.getDate() - i3.getDay() + t2.firstDayOfWeek), i3;
        }, Y: function(e2, n2) {
          e2.setFullYear(parseFloat(n2));
        }, Z: function(e2, n2) {
          return new Date(n2);
        }, d: function(e2, n2) {
          e2.setDate(parseFloat(n2));
        }, h: function(e2, n2) {
          e2.setHours((e2.getHours() >= 12 ? 12 : 0) + parseFloat(n2));
        }, i: function(e2, n2) {
          e2.setMinutes(parseFloat(n2));
        }, j: function(e2, n2) {
          e2.setDate(parseFloat(n2));
        }, l: p, m: function(e2, n2) {
          e2.setMonth(parseFloat(n2) - 1);
        }, n: function(e2, n2) {
          e2.setMonth(parseFloat(n2) - 1);
        }, s: function(e2, n2) {
          e2.setSeconds(parseFloat(n2));
        }, u: function(e2, n2) {
          return new Date(parseFloat(n2));
        }, w: p, y: function(e2, n2) {
          e2.setFullYear(2e3 + parseFloat(n2));
        } }, D = { D: "", F: "", G: "(\\d\\d|\\d)", H: "(\\d\\d|\\d)", J: "(\\d\\d|\\d)\\w+", K: "", M: "", S: "(\\d\\d|\\d)", U: "(.+)", W: "(\\d\\d|\\d)", Y: "(\\d{4})", Z: "(.+)", d: "(\\d\\d|\\d)", h: "(\\d\\d|\\d)", i: "(\\d\\d|\\d)", j: "(\\d\\d|\\d)", l: "", m: "(\\d\\d|\\d)", n: "(\\d\\d|\\d)", s: "(\\d\\d|\\d)", u: "(.+)", w: "(\\d\\d|\\d)", y: "(\\d{2})" }, w = { Z: function(e2) {
          return e2.toISOString();
        }, D: function(e2, n2, t2) {
          return n2.weekdays.shorthand[w.w(e2, n2, t2)];
        }, F: function(e2, n2, t2) {
          return h(w.n(e2, n2, t2) - 1, false, n2);
        }, G: function(e2, n2, t2) {
          return o(w.h(e2, n2, t2));
        }, H: function(e2) {
          return o(e2.getHours());
        }, J: function(e2, n2) {
          return void 0 !== n2.ordinal ? e2.getDate() + n2.ordinal(e2.getDate()) : e2.getDate();
        }, K: function(e2, n2) {
          return n2.amPM[r(e2.getHours() > 11)];
        }, M: function(e2, n2) {
          return h(e2.getMonth(), true, n2);
        }, S: function(e2) {
          return o(e2.getSeconds());
        }, U: function(e2) {
          return e2.getTime() / 1e3;
        }, W: function(e2, n2, t2) {
          return t2.getWeek(e2);
        }, Y: function(e2) {
          return o(e2.getFullYear(), 4);
        }, d: function(e2) {
          return o(e2.getDate());
        }, h: function(e2) {
          return e2.getHours() % 12 ? e2.getHours() % 12 : 12;
        }, i: function(e2) {
          return o(e2.getMinutes());
        }, j: function(e2) {
          return e2.getDate();
        }, l: function(e2, n2) {
          return n2.weekdays.longhand[e2.getDay()];
        }, m: function(e2) {
          return o(e2.getMonth() + 1);
        }, n: function(e2) {
          return e2.getMonth() + 1;
        }, s: function(e2) {
          return e2.getSeconds();
        }, u: function(e2) {
          return e2.getTime();
        }, w: function(e2) {
          return e2.getDay();
        }, y: function(e2) {
          return String(e2.getFullYear()).substring(2);
        } }, b = function(e2) {
          var n2 = e2.config, t2 = void 0 === n2 ? a : n2, o2 = e2.l10n, r2 = void 0 === o2 ? i2 : o2, l2 = e2.isMobile, c2 = void 0 !== l2 && l2;
          return function(e3, n3, a2) {
            var i3 = a2 || r2;
            return void 0 === t2.formatDate || c2 ? n3.split("").map(function(n4, a3, o3) {
              return w[n4] && "\\" !== o3[a3 - 1] ? w[n4](e3, i3, t2) : "\\" !== n4 ? n4 : "";
            }).join("") : t2.formatDate(e3, n3, i3);
          };
        }, C = function(e2) {
          var n2 = e2.config, t2 = void 0 === n2 ? a : n2, o2 = e2.l10n, r2 = void 0 === o2 ? i2 : o2;
          return function(e3, n3, i3, o3) {
            if (0 === e3 || e3) {
              var l2, c2 = o3 || r2, s2 = e3;
              if (e3 instanceof Date)
                l2 = new Date(e3.getTime());
              else if ("string" != typeof e3 && void 0 !== e3.toFixed)
                l2 = new Date(e3);
              else if ("string" == typeof e3) {
                var d2 = n3 || (t2 || a).dateFormat, u2 = String(e3).trim();
                if ("today" === u2)
                  l2 = /* @__PURE__ */ new Date(), i3 = true;
                else if (t2 && t2.parseDate)
                  l2 = t2.parseDate(e3, d2);
                else if (/Z$/.test(u2) || /GMT$/.test(u2))
                  l2 = new Date(e3);
                else {
                  for (var f2 = void 0, m2 = [], g2 = 0, p2 = 0, h2 = ""; g2 < d2.length; g2++) {
                    var w2 = d2[g2], b2 = "\\" === w2, C2 = "\\" === d2[g2 - 1] || b2;
                    if (D[w2] && !C2) {
                      h2 += D[w2];
                      var M2 = new RegExp(h2).exec(e3);
                      M2 && (f2 = true) && m2["Y" !== w2 ? "push" : "unshift"]({ fn: v[w2], val: M2[++p2] });
                    } else
                      b2 || (h2 += ".");
                  }
                  l2 = t2 && t2.noCalendar ? new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)) : new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1, 0, 0, 0, 0), m2.forEach(function(e4) {
                    var n4 = e4.fn, t3 = e4.val;
                    return l2 = n4(l2, t3, c2) || l2;
                  }), l2 = f2 ? l2 : void 0;
                }
              }
              if (l2 instanceof Date && !isNaN(l2.getTime()))
                return true === i3 && l2.setHours(0, 0, 0, 0), l2;
              t2.errorHandler(new Error("Invalid date provided: " + s2));
            }
          };
        };
        function M(e2, n2, t2) {
          return void 0 === t2 && (t2 = true), false !== t2 ? new Date(e2.getTime()).setHours(0, 0, 0, 0) - new Date(n2.getTime()).setHours(0, 0, 0, 0) : e2.getTime() - n2.getTime();
        }
        var y = function(e2, n2, t2) {
          return 3600 * e2 + 60 * n2 + t2;
        }, x = 864e5;
        function E(e2) {
          var n2 = e2.defaultHour, t2 = e2.defaultMinute, a2 = e2.defaultSeconds;
          if (void 0 !== e2.minDate) {
            var i3 = e2.minDate.getHours(), o2 = e2.minDate.getMinutes(), r2 = e2.minDate.getSeconds();
            n2 < i3 && (n2 = i3), n2 === i3 && t2 < o2 && (t2 = o2), n2 === i3 && t2 === o2 && a2 < r2 && (a2 = e2.minDate.getSeconds());
          }
          if (void 0 !== e2.maxDate) {
            var l2 = e2.maxDate.getHours(), c2 = e2.maxDate.getMinutes();
            (n2 = Math.min(n2, l2)) === l2 && (t2 = Math.min(c2, t2)), n2 === l2 && t2 === c2 && (a2 = e2.maxDate.getSeconds());
          }
          return { hours: n2, minutes: t2, seconds: a2 };
        }
        "function" != typeof Object.assign && (Object.assign = function(e2) {
          for (var n2 = [], t2 = 1; t2 < arguments.length; t2++)
            n2[t2 - 1] = arguments[t2];
          if (!e2)
            throw TypeError("Cannot convert undefined or null to object");
          for (var a2 = function(n3) {
            n3 && Object.keys(n3).forEach(function(t3) {
              return e2[t3] = n3[t3];
            });
          }, i3 = 0, o2 = n2; i3 < o2.length; i3++) {
            var r2 = o2[i3];
            a2(r2);
          }
          return e2;
        });
        function k(p2, v2) {
          var w2 = { config: e(e({}, a), I.defaultConfig), l10n: i2 };
          function k2() {
            var e2;
            return (null === (e2 = w2.calendarContainer) || void 0 === e2 ? void 0 : e2.getRootNode()).activeElement || document.activeElement;
          }
          function T2(e2) {
            return e2.bind(w2);
          }
          function S() {
            var e2 = w2.config;
            false === e2.weekNumbers && 1 === e2.showMonths || true !== e2.noCalendar && window.requestAnimationFrame(function() {
              if (void 0 !== w2.calendarContainer && (w2.calendarContainer.style.visibility = "hidden", w2.calendarContainer.style.display = "block"), void 0 !== w2.daysContainer) {
                var n2 = (w2.days.offsetWidth + 1) * e2.showMonths;
                w2.daysContainer.style.width = n2 + "px", w2.calendarContainer.style.width = n2 + (void 0 !== w2.weekWrapper ? w2.weekWrapper.offsetWidth : 0) + "px", w2.calendarContainer.style.removeProperty("visibility"), w2.calendarContainer.style.removeProperty("display");
              }
            });
          }
          function _(e2) {
            if (0 === w2.selectedDates.length) {
              var n2 = void 0 === w2.config.minDate || M(/* @__PURE__ */ new Date(), w2.config.minDate) >= 0 ? /* @__PURE__ */ new Date() : new Date(w2.config.minDate.getTime()), t2 = E(w2.config);
              n2.setHours(t2.hours, t2.minutes, t2.seconds, n2.getMilliseconds()), w2.selectedDates = [n2], w2.latestSelectedDateObj = n2;
            }
            void 0 !== e2 && "blur" !== e2.type && function(e3) {
              e3.preventDefault();
              var n3 = "keydown" === e3.type, t3 = g(e3), a3 = t3;
              void 0 !== w2.amPM && t3 === w2.amPM && (w2.amPM.textContent = w2.l10n.amPM[r(w2.amPM.textContent === w2.l10n.amPM[0])]);
              var i3 = parseFloat(a3.getAttribute("min")), l2 = parseFloat(a3.getAttribute("max")), c2 = parseFloat(a3.getAttribute("step")), s2 = parseInt(a3.value, 10), d2 = e3.delta || (n3 ? 38 === e3.which ? 1 : -1 : 0), u2 = s2 + c2 * d2;
              if (void 0 !== a3.value && 2 === a3.value.length) {
                var f2 = a3 === w2.hourElement, m2 = a3 === w2.minuteElement;
                u2 < i3 ? (u2 = l2 + u2 + r(!f2) + (r(f2) && r(!w2.amPM)), m2 && L(void 0, -1, w2.hourElement)) : u2 > l2 && (u2 = a3 === w2.hourElement ? u2 - l2 - r(!w2.amPM) : i3, m2 && L(void 0, 1, w2.hourElement)), w2.amPM && f2 && (1 === c2 ? u2 + s2 === 23 : Math.abs(u2 - s2) > c2) && (w2.amPM.textContent = w2.l10n.amPM[r(w2.amPM.textContent === w2.l10n.amPM[0])]), a3.value = o(u2);
              }
            }(e2);
            var a2 = w2._input.value;
            O(), ye(), w2._input.value !== a2 && w2._debouncedChange();
          }
          function O() {
            if (void 0 !== w2.hourElement && void 0 !== w2.minuteElement) {
              var e2, n2, t2 = (parseInt(w2.hourElement.value.slice(-2), 10) || 0) % 24, a2 = (parseInt(w2.minuteElement.value, 10) || 0) % 60, i3 = void 0 !== w2.secondElement ? (parseInt(w2.secondElement.value, 10) || 0) % 60 : 0;
              void 0 !== w2.amPM && (e2 = t2, n2 = w2.amPM.textContent, t2 = e2 % 12 + 12 * r(n2 === w2.l10n.amPM[1]));
              var o2 = void 0 !== w2.config.minTime || w2.config.minDate && w2.minDateHasTime && w2.latestSelectedDateObj && 0 === M(w2.latestSelectedDateObj, w2.config.minDate, true), l2 = void 0 !== w2.config.maxTime || w2.config.maxDate && w2.maxDateHasTime && w2.latestSelectedDateObj && 0 === M(w2.latestSelectedDateObj, w2.config.maxDate, true);
              if (void 0 !== w2.config.maxTime && void 0 !== w2.config.minTime && w2.config.minTime > w2.config.maxTime) {
                var c2 = y(w2.config.minTime.getHours(), w2.config.minTime.getMinutes(), w2.config.minTime.getSeconds()), s2 = y(w2.config.maxTime.getHours(), w2.config.maxTime.getMinutes(), w2.config.maxTime.getSeconds()), d2 = y(t2, a2, i3);
                if (d2 > s2 && d2 < c2) {
                  var u2 = function(e3) {
                    var n3 = Math.floor(e3 / 3600), t3 = (e3 - 3600 * n3) / 60;
                    return [n3, t3, e3 - 3600 * n3 - 60 * t3];
                  }(c2);
                  t2 = u2[0], a2 = u2[1], i3 = u2[2];
                }
              } else {
                if (l2) {
                  var f2 = void 0 !== w2.config.maxTime ? w2.config.maxTime : w2.config.maxDate;
                  (t2 = Math.min(t2, f2.getHours())) === f2.getHours() && (a2 = Math.min(a2, f2.getMinutes())), a2 === f2.getMinutes() && (i3 = Math.min(i3, f2.getSeconds()));
                }
                if (o2) {
                  var m2 = void 0 !== w2.config.minTime ? w2.config.minTime : w2.config.minDate;
                  (t2 = Math.max(t2, m2.getHours())) === m2.getHours() && a2 < m2.getMinutes() && (a2 = m2.getMinutes()), a2 === m2.getMinutes() && (i3 = Math.max(i3, m2.getSeconds()));
                }
              }
              A(t2, a2, i3);
            }
          }
          function F(e2) {
            var n2 = e2 || w2.latestSelectedDateObj;
            n2 && n2 instanceof Date && A(n2.getHours(), n2.getMinutes(), n2.getSeconds());
          }
          function A(e2, n2, t2) {
            void 0 !== w2.latestSelectedDateObj && w2.latestSelectedDateObj.setHours(e2 % 24, n2, t2 || 0, 0), w2.hourElement && w2.minuteElement && !w2.isMobile && (w2.hourElement.value = o(w2.config.time_24hr ? e2 : (12 + e2) % 12 + 12 * r(e2 % 12 == 0)), w2.minuteElement.value = o(n2), void 0 !== w2.amPM && (w2.amPM.textContent = w2.l10n.amPM[r(e2 >= 12)]), void 0 !== w2.secondElement && (w2.secondElement.value = o(t2)));
          }
          function N(e2) {
            var n2 = g(e2), t2 = parseInt(n2.value) + (e2.delta || 0);
            (t2 / 1e3 > 1 || "Enter" === e2.key && !/[^\d]/.test(t2.toString())) && ee(t2);
          }
          function P(e2, n2, t2, a2) {
            return n2 instanceof Array ? n2.forEach(function(n3) {
              return P(e2, n3, t2, a2);
            }) : e2 instanceof Array ? e2.forEach(function(e3) {
              return P(e3, n2, t2, a2);
            }) : (e2.addEventListener(n2, t2, a2), void w2._handlers.push({ remove: function() {
              return e2.removeEventListener(n2, t2, a2);
            } }));
          }
          function Y() {
            De("onChange");
          }
          function j(e2, n2) {
            var t2 = void 0 !== e2 ? w2.parseDate(e2) : w2.latestSelectedDateObj || (w2.config.minDate && w2.config.minDate > w2.now ? w2.config.minDate : w2.config.maxDate && w2.config.maxDate < w2.now ? w2.config.maxDate : w2.now), a2 = w2.currentYear, i3 = w2.currentMonth;
            try {
              void 0 !== t2 && (w2.currentYear = t2.getFullYear(), w2.currentMonth = t2.getMonth());
            } catch (e3) {
              e3.message = "Invalid date supplied: " + t2, w2.config.errorHandler(e3);
            }
            n2 && w2.currentYear !== a2 && (De("onYearChange"), q()), !n2 || w2.currentYear === a2 && w2.currentMonth === i3 || De("onMonthChange"), w2.redraw();
          }
          function H(e2) {
            var n2 = g(e2);
            ~n2.className.indexOf("arrow") && L(e2, n2.classList.contains("arrowUp") ? 1 : -1);
          }
          function L(e2, n2, t2) {
            var a2 = e2 && g(e2), i3 = t2 || a2 && a2.parentNode && a2.parentNode.firstChild, o2 = we("increment");
            o2.delta = n2, i3 && i3.dispatchEvent(o2);
          }
          function R(e2, n2, t2, a2) {
            var i3 = ne(n2, true), o2 = d("span", e2, n2.getDate().toString());
            return o2.dateObj = n2, o2.$i = a2, o2.setAttribute("aria-label", w2.formatDate(n2, w2.config.ariaDateFormat)), -1 === e2.indexOf("hidden") && 0 === M(n2, w2.now) && (w2.todayDateElem = o2, o2.classList.add("today"), o2.setAttribute("aria-current", "date")), i3 ? (o2.tabIndex = -1, be(n2) && (o2.classList.add("selected"), w2.selectedDateElem = o2, "range" === w2.config.mode && (s(o2, "startRange", w2.selectedDates[0] && 0 === M(n2, w2.selectedDates[0], true)), s(o2, "endRange", w2.selectedDates[1] && 0 === M(n2, w2.selectedDates[1], true)), "nextMonthDay" === e2 && o2.classList.add("inRange")))) : o2.classList.add("flatpickr-disabled"), "range" === w2.config.mode && function(e3) {
              return !("range" !== w2.config.mode || w2.selectedDates.length < 2) && (M(e3, w2.selectedDates[0]) >= 0 && M(e3, w2.selectedDates[1]) <= 0);
            }(n2) && !be(n2) && o2.classList.add("inRange"), w2.weekNumbers && 1 === w2.config.showMonths && "prevMonthDay" !== e2 && a2 % 7 == 6 && w2.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + w2.config.getWeek(n2) + "</span>"), De("onDayCreate", o2), o2;
          }
          function W(e2) {
            e2.focus(), "range" === w2.config.mode && oe(e2);
          }
          function B(e2) {
            for (var n2 = e2 > 0 ? 0 : w2.config.showMonths - 1, t2 = e2 > 0 ? w2.config.showMonths : -1, a2 = n2; a2 != t2; a2 += e2)
              for (var i3 = w2.daysContainer.children[a2], o2 = e2 > 0 ? 0 : i3.children.length - 1, r2 = e2 > 0 ? i3.children.length : -1, l2 = o2; l2 != r2; l2 += e2) {
                var c2 = i3.children[l2];
                if (-1 === c2.className.indexOf("hidden") && ne(c2.dateObj))
                  return c2;
              }
          }
          function J(e2, n2) {
            var t2 = k2(), a2 = te(t2 || document.body), i3 = void 0 !== e2 ? e2 : a2 ? t2 : void 0 !== w2.selectedDateElem && te(w2.selectedDateElem) ? w2.selectedDateElem : void 0 !== w2.todayDateElem && te(w2.todayDateElem) ? w2.todayDateElem : B(n2 > 0 ? 1 : -1);
            void 0 === i3 ? w2._input.focus() : a2 ? function(e3, n3) {
              for (var t3 = -1 === e3.className.indexOf("Month") ? e3.dateObj.getMonth() : w2.currentMonth, a3 = n3 > 0 ? w2.config.showMonths : -1, i4 = n3 > 0 ? 1 : -1, o2 = t3 - w2.currentMonth; o2 != a3; o2 += i4)
                for (var r2 = w2.daysContainer.children[o2], l2 = t3 - w2.currentMonth === o2 ? e3.$i + n3 : n3 < 0 ? r2.children.length - 1 : 0, c2 = r2.children.length, s2 = l2; s2 >= 0 && s2 < c2 && s2 != (n3 > 0 ? c2 : -1); s2 += i4) {
                  var d2 = r2.children[s2];
                  if (-1 === d2.className.indexOf("hidden") && ne(d2.dateObj) && Math.abs(e3.$i - s2) >= Math.abs(n3))
                    return W(d2);
                }
              w2.changeMonth(i4), J(B(i4), 0);
            }(i3, n2) : W(i3);
          }
          function K(e2, n2) {
            for (var t2 = (new Date(e2, n2, 1).getDay() - w2.l10n.firstDayOfWeek + 7) % 7, a2 = w2.utils.getDaysInMonth((n2 - 1 + 12) % 12, e2), i3 = w2.utils.getDaysInMonth(n2, e2), o2 = window.document.createDocumentFragment(), r2 = w2.config.showMonths > 1, l2 = r2 ? "prevMonthDay hidden" : "prevMonthDay", c2 = r2 ? "nextMonthDay hidden" : "nextMonthDay", s2 = a2 + 1 - t2, u2 = 0; s2 <= a2; s2++, u2++)
              o2.appendChild(R("flatpickr-day " + l2, new Date(e2, n2 - 1, s2), 0, u2));
            for (s2 = 1; s2 <= i3; s2++, u2++)
              o2.appendChild(R("flatpickr-day", new Date(e2, n2, s2), 0, u2));
            for (var f2 = i3 + 1; f2 <= 42 - t2 && (1 === w2.config.showMonths || u2 % 7 != 0); f2++, u2++)
              o2.appendChild(R("flatpickr-day " + c2, new Date(e2, n2 + 1, f2 % i3), 0, u2));
            var m2 = d("div", "dayContainer");
            return m2.appendChild(o2), m2;
          }
          function U() {
            if (void 0 !== w2.daysContainer) {
              u(w2.daysContainer), w2.weekNumbers && u(w2.weekNumbers);
              for (var e2 = document.createDocumentFragment(), n2 = 0; n2 < w2.config.showMonths; n2++) {
                var t2 = new Date(w2.currentYear, w2.currentMonth, 1);
                t2.setMonth(w2.currentMonth + n2), e2.appendChild(K(t2.getFullYear(), t2.getMonth()));
              }
              w2.daysContainer.appendChild(e2), w2.days = w2.daysContainer.firstChild, "range" === w2.config.mode && 1 === w2.selectedDates.length && oe();
            }
          }
          function q() {
            if (!(w2.config.showMonths > 1 || "dropdown" !== w2.config.monthSelectorType)) {
              var e2 = function(e3) {
                return !(void 0 !== w2.config.minDate && w2.currentYear === w2.config.minDate.getFullYear() && e3 < w2.config.minDate.getMonth()) && !(void 0 !== w2.config.maxDate && w2.currentYear === w2.config.maxDate.getFullYear() && e3 > w2.config.maxDate.getMonth());
              };
              w2.monthsDropdownContainer.tabIndex = -1, w2.monthsDropdownContainer.innerHTML = "";
              for (var n2 = 0; n2 < 12; n2++)
                if (e2(n2)) {
                  var t2 = d("option", "flatpickr-monthDropdown-month");
                  t2.value = new Date(w2.currentYear, n2).getMonth().toString(), t2.textContent = h(n2, w2.config.shorthandCurrentMonth, w2.l10n), t2.tabIndex = -1, w2.currentMonth === n2 && (t2.selected = true), w2.monthsDropdownContainer.appendChild(t2);
                }
            }
          }
          function $() {
            var e2, n2 = d("div", "flatpickr-month"), t2 = window.document.createDocumentFragment();
            w2.config.showMonths > 1 || "static" === w2.config.monthSelectorType ? e2 = d("span", "cur-month") : (w2.monthsDropdownContainer = d("select", "flatpickr-monthDropdown-months"), w2.monthsDropdownContainer.setAttribute("aria-label", w2.l10n.monthAriaLabel), P(w2.monthsDropdownContainer, "change", function(e3) {
              var n3 = g(e3), t3 = parseInt(n3.value, 10);
              w2.changeMonth(t3 - w2.currentMonth), De("onMonthChange");
            }), q(), e2 = w2.monthsDropdownContainer);
            var a2 = m("cur-year", { tabindex: "-1" }), i3 = a2.getElementsByTagName("input")[0];
            i3.setAttribute("aria-label", w2.l10n.yearAriaLabel), w2.config.minDate && i3.setAttribute("min", w2.config.minDate.getFullYear().toString()), w2.config.maxDate && (i3.setAttribute("max", w2.config.maxDate.getFullYear().toString()), i3.disabled = !!w2.config.minDate && w2.config.minDate.getFullYear() === w2.config.maxDate.getFullYear());
            var o2 = d("div", "flatpickr-current-month");
            return o2.appendChild(e2), o2.appendChild(a2), t2.appendChild(o2), n2.appendChild(t2), { container: n2, yearElement: i3, monthElement: e2 };
          }
          function V() {
            u(w2.monthNav), w2.monthNav.appendChild(w2.prevMonthNav), w2.config.showMonths && (w2.yearElements = [], w2.monthElements = []);
            for (var e2 = w2.config.showMonths; e2--; ) {
              var n2 = $();
              w2.yearElements.push(n2.yearElement), w2.monthElements.push(n2.monthElement), w2.monthNav.appendChild(n2.container);
            }
            w2.monthNav.appendChild(w2.nextMonthNav);
          }
          function z() {
            w2.weekdayContainer ? u(w2.weekdayContainer) : w2.weekdayContainer = d("div", "flatpickr-weekdays");
            for (var e2 = w2.config.showMonths; e2--; ) {
              var n2 = d("div", "flatpickr-weekdaycontainer");
              w2.weekdayContainer.appendChild(n2);
            }
            return G(), w2.weekdayContainer;
          }
          function G() {
            if (w2.weekdayContainer) {
              var e2 = w2.l10n.firstDayOfWeek, t2 = n(w2.l10n.weekdays.shorthand);
              e2 > 0 && e2 < t2.length && (t2 = n(t2.splice(e2, t2.length), t2.splice(0, e2)));
              for (var a2 = w2.config.showMonths; a2--; )
                w2.weekdayContainer.children[a2].innerHTML = "\n      <span class='flatpickr-weekday'>\n        " + t2.join("</span><span class='flatpickr-weekday'>") + "\n      </span>\n      ";
            }
          }
          function Z(e2, n2) {
            void 0 === n2 && (n2 = true);
            var t2 = n2 ? e2 : e2 - w2.currentMonth;
            t2 < 0 && true === w2._hidePrevMonthArrow || t2 > 0 && true === w2._hideNextMonthArrow || (w2.currentMonth += t2, (w2.currentMonth < 0 || w2.currentMonth > 11) && (w2.currentYear += w2.currentMonth > 11 ? 1 : -1, w2.currentMonth = (w2.currentMonth + 12) % 12, De("onYearChange"), q()), U(), De("onMonthChange"), Ce());
          }
          function Q(e2) {
            return w2.calendarContainer.contains(e2);
          }
          function X(e2) {
            if (w2.isOpen && !w2.config.inline) {
              var n2 = g(e2), t2 = Q(n2), a2 = !(n2 === w2.input || n2 === w2.altInput || w2.element.contains(n2) || e2.path && e2.path.indexOf && (~e2.path.indexOf(w2.input) || ~e2.path.indexOf(w2.altInput))) && !t2 && !Q(e2.relatedTarget), i3 = !w2.config.ignoredFocusElements.some(function(e3) {
                return e3.contains(n2);
              });
              a2 && i3 && (w2.config.allowInput && w2.setDate(w2._input.value, false, w2.config.altInput ? w2.config.altFormat : w2.config.dateFormat), void 0 !== w2.timeContainer && void 0 !== w2.minuteElement && void 0 !== w2.hourElement && "" !== w2.input.value && void 0 !== w2.input.value && _(), w2.close(), w2.config && "range" === w2.config.mode && 1 === w2.selectedDates.length && w2.clear(false));
            }
          }
          function ee(e2) {
            if (!(!e2 || w2.config.minDate && e2 < w2.config.minDate.getFullYear() || w2.config.maxDate && e2 > w2.config.maxDate.getFullYear())) {
              var n2 = e2, t2 = w2.currentYear !== n2;
              w2.currentYear = n2 || w2.currentYear, w2.config.maxDate && w2.currentYear === w2.config.maxDate.getFullYear() ? w2.currentMonth = Math.min(w2.config.maxDate.getMonth(), w2.currentMonth) : w2.config.minDate && w2.currentYear === w2.config.minDate.getFullYear() && (w2.currentMonth = Math.max(w2.config.minDate.getMonth(), w2.currentMonth)), t2 && (w2.redraw(), De("onYearChange"), q());
            }
          }
          function ne(e2, n2) {
            var t2;
            void 0 === n2 && (n2 = true);
            var a2 = w2.parseDate(e2, void 0, n2);
            if (w2.config.minDate && a2 && M(a2, w2.config.minDate, void 0 !== n2 ? n2 : !w2.minDateHasTime) < 0 || w2.config.maxDate && a2 && M(a2, w2.config.maxDate, void 0 !== n2 ? n2 : !w2.maxDateHasTime) > 0)
              return false;
            if (!w2.config.enable && 0 === w2.config.disable.length)
              return true;
            if (void 0 === a2)
              return false;
            for (var i3 = !!w2.config.enable, o2 = null !== (t2 = w2.config.enable) && void 0 !== t2 ? t2 : w2.config.disable, r2 = 0, l2 = void 0; r2 < o2.length; r2++) {
              if ("function" == typeof (l2 = o2[r2]) && l2(a2))
                return i3;
              if (l2 instanceof Date && void 0 !== a2 && l2.getTime() === a2.getTime())
                return i3;
              if ("string" == typeof l2) {
                var c2 = w2.parseDate(l2, void 0, true);
                return c2 && c2.getTime() === a2.getTime() ? i3 : !i3;
              }
              if ("object" == typeof l2 && void 0 !== a2 && l2.from && l2.to && a2.getTime() >= l2.from.getTime() && a2.getTime() <= l2.to.getTime())
                return i3;
            }
            return !i3;
          }
          function te(e2) {
            return void 0 !== w2.daysContainer && (-1 === e2.className.indexOf("hidden") && -1 === e2.className.indexOf("flatpickr-disabled") && w2.daysContainer.contains(e2));
          }
          function ae(e2) {
            var n2 = e2.target === w2._input, t2 = w2._input.value.trimEnd() !== Me();
            !n2 || !t2 || e2.relatedTarget && Q(e2.relatedTarget) || w2.setDate(w2._input.value, true, e2.target === w2.altInput ? w2.config.altFormat : w2.config.dateFormat);
          }
          function ie(e2) {
            var n2 = g(e2), t2 = w2.config.wrap ? p2.contains(n2) : n2 === w2._input, a2 = w2.config.allowInput, i3 = w2.isOpen && (!a2 || !t2), o2 = w2.config.inline && t2 && !a2;
            if (13 === e2.keyCode && t2) {
              if (a2)
                return w2.setDate(w2._input.value, true, n2 === w2.altInput ? w2.config.altFormat : w2.config.dateFormat), w2.close(), n2.blur();
              w2.open();
            } else if (Q(n2) || i3 || o2) {
              var r2 = !!w2.timeContainer && w2.timeContainer.contains(n2);
              switch (e2.keyCode) {
                case 13:
                  r2 ? (e2.preventDefault(), _(), fe()) : me(e2);
                  break;
                case 27:
                  e2.preventDefault(), fe();
                  break;
                case 8:
                case 46:
                  t2 && !w2.config.allowInput && (e2.preventDefault(), w2.clear());
                  break;
                case 37:
                case 39:
                  if (r2 || t2)
                    w2.hourElement && w2.hourElement.focus();
                  else {
                    e2.preventDefault();
                    var l2 = k2();
                    if (void 0 !== w2.daysContainer && (false === a2 || l2 && te(l2))) {
                      var c2 = 39 === e2.keyCode ? 1 : -1;
                      e2.ctrlKey ? (e2.stopPropagation(), Z(c2), J(B(1), 0)) : J(void 0, c2);
                    }
                  }
                  break;
                case 38:
                case 40:
                  e2.preventDefault();
                  var s2 = 40 === e2.keyCode ? 1 : -1;
                  w2.daysContainer && void 0 !== n2.$i || n2 === w2.input || n2 === w2.altInput ? e2.ctrlKey ? (e2.stopPropagation(), ee(w2.currentYear - s2), J(B(1), 0)) : r2 || J(void 0, 7 * s2) : n2 === w2.currentYearElement ? ee(w2.currentYear - s2) : w2.config.enableTime && (!r2 && w2.hourElement && w2.hourElement.focus(), _(e2), w2._debouncedChange());
                  break;
                case 9:
                  if (r2) {
                    var d2 = [w2.hourElement, w2.minuteElement, w2.secondElement, w2.amPM].concat(w2.pluginElements).filter(function(e3) {
                      return e3;
                    }), u2 = d2.indexOf(n2);
                    if (-1 !== u2) {
                      var f2 = d2[u2 + (e2.shiftKey ? -1 : 1)];
                      e2.preventDefault(), (f2 || w2._input).focus();
                    }
                  } else
                    !w2.config.noCalendar && w2.daysContainer && w2.daysContainer.contains(n2) && e2.shiftKey && (e2.preventDefault(), w2._input.focus());
              }
            }
            if (void 0 !== w2.amPM && n2 === w2.amPM)
              switch (e2.key) {
                case w2.l10n.amPM[0].charAt(0):
                case w2.l10n.amPM[0].charAt(0).toLowerCase():
                  w2.amPM.textContent = w2.l10n.amPM[0], O(), ye();
                  break;
                case w2.l10n.amPM[1].charAt(0):
                case w2.l10n.amPM[1].charAt(0).toLowerCase():
                  w2.amPM.textContent = w2.l10n.amPM[1], O(), ye();
              }
            (t2 || Q(n2)) && De("onKeyDown", e2);
          }
          function oe(e2, n2) {
            if (void 0 === n2 && (n2 = "flatpickr-day"), 1 === w2.selectedDates.length && (!e2 || e2.classList.contains(n2) && !e2.classList.contains("flatpickr-disabled"))) {
              for (var t2 = e2 ? e2.dateObj.getTime() : w2.days.firstElementChild.dateObj.getTime(), a2 = w2.parseDate(w2.selectedDates[0], void 0, true).getTime(), i3 = Math.min(t2, w2.selectedDates[0].getTime()), o2 = Math.max(t2, w2.selectedDates[0].getTime()), r2 = false, l2 = 0, c2 = 0, s2 = i3; s2 < o2; s2 += x)
                ne(new Date(s2), true) || (r2 = r2 || s2 > i3 && s2 < o2, s2 < a2 && (!l2 || s2 > l2) ? l2 = s2 : s2 > a2 && (!c2 || s2 < c2) && (c2 = s2));
              Array.from(w2.rContainer.querySelectorAll("*:nth-child(-n+" + w2.config.showMonths + ") > ." + n2)).forEach(function(n3) {
                var i4, o3, s3, d2 = n3.dateObj.getTime(), u2 = l2 > 0 && d2 < l2 || c2 > 0 && d2 > c2;
                if (u2)
                  return n3.classList.add("notAllowed"), void ["inRange", "startRange", "endRange"].forEach(function(e3) {
                    n3.classList.remove(e3);
                  });
                r2 && !u2 || (["startRange", "inRange", "endRange", "notAllowed"].forEach(function(e3) {
                  n3.classList.remove(e3);
                }), void 0 !== e2 && (e2.classList.add(t2 <= w2.selectedDates[0].getTime() ? "startRange" : "endRange"), a2 < t2 && d2 === a2 ? n3.classList.add("startRange") : a2 > t2 && d2 === a2 && n3.classList.add("endRange"), d2 >= l2 && (0 === c2 || d2 <= c2) && (o3 = a2, s3 = t2, (i4 = d2) > Math.min(o3, s3) && i4 < Math.max(o3, s3)) && n3.classList.add("inRange")));
              });
            }
          }
          function re() {
            !w2.isOpen || w2.config.static || w2.config.inline || de();
          }
          function le(e2) {
            return function(n2) {
              var t2 = w2.config["_" + e2 + "Date"] = w2.parseDate(n2, w2.config.dateFormat), a2 = w2.config["_" + ("min" === e2 ? "max" : "min") + "Date"];
              void 0 !== t2 && (w2["min" === e2 ? "minDateHasTime" : "maxDateHasTime"] = t2.getHours() > 0 || t2.getMinutes() > 0 || t2.getSeconds() > 0), w2.selectedDates && (w2.selectedDates = w2.selectedDates.filter(function(e3) {
                return ne(e3);
              }), w2.selectedDates.length || "min" !== e2 || F(t2), ye()), w2.daysContainer && (ue(), void 0 !== t2 ? w2.currentYearElement[e2] = t2.getFullYear().toString() : w2.currentYearElement.removeAttribute(e2), w2.currentYearElement.disabled = !!a2 && void 0 !== t2 && a2.getFullYear() === t2.getFullYear());
            };
          }
          function ce() {
            return w2.config.wrap ? p2.querySelector("[data-input]") : p2;
          }
          function se() {
            "object" != typeof w2.config.locale && void 0 === I.l10ns[w2.config.locale] && w2.config.errorHandler(new Error("flatpickr: invalid locale " + w2.config.locale)), w2.l10n = e(e({}, I.l10ns.default), "object" == typeof w2.config.locale ? w2.config.locale : "default" !== w2.config.locale ? I.l10ns[w2.config.locale] : void 0), D.D = "(" + w2.l10n.weekdays.shorthand.join("|") + ")", D.l = "(" + w2.l10n.weekdays.longhand.join("|") + ")", D.M = "(" + w2.l10n.months.shorthand.join("|") + ")", D.F = "(" + w2.l10n.months.longhand.join("|") + ")", D.K = "(" + w2.l10n.amPM[0] + "|" + w2.l10n.amPM[1] + "|" + w2.l10n.amPM[0].toLowerCase() + "|" + w2.l10n.amPM[1].toLowerCase() + ")", void 0 === e(e({}, v2), JSON.parse(JSON.stringify(p2.dataset || {}))).time_24hr && void 0 === I.defaultConfig.time_24hr && (w2.config.time_24hr = w2.l10n.time_24hr), w2.formatDate = b(w2), w2.parseDate = C({ config: w2.config, l10n: w2.l10n });
          }
          function de(e2) {
            if ("function" != typeof w2.config.position) {
              if (void 0 !== w2.calendarContainer) {
                De("onPreCalendarPosition");
                var n2 = e2 || w2._positionElement, t2 = Array.prototype.reduce.call(w2.calendarContainer.children, function(e3, n3) {
                  return e3 + n3.offsetHeight;
                }, 0), a2 = w2.calendarContainer.offsetWidth, i3 = w2.config.position.split(" "), o2 = i3[0], r2 = i3.length > 1 ? i3[1] : null, l2 = n2.getBoundingClientRect(), c2 = window.innerHeight - l2.bottom, d2 = "above" === o2 || "below" !== o2 && c2 < t2 && l2.top > t2, u2 = window.pageYOffset + l2.top + (d2 ? -t2 - 2 : n2.offsetHeight + 2);
                if (s(w2.calendarContainer, "arrowTop", !d2), s(w2.calendarContainer, "arrowBottom", d2), !w2.config.inline) {
                  var f2 = window.pageXOffset + l2.left, m2 = false, g2 = false;
                  "center" === r2 ? (f2 -= (a2 - l2.width) / 2, m2 = true) : "right" === r2 && (f2 -= a2 - l2.width, g2 = true), s(w2.calendarContainer, "arrowLeft", !m2 && !g2), s(w2.calendarContainer, "arrowCenter", m2), s(w2.calendarContainer, "arrowRight", g2);
                  var p3 = window.document.body.offsetWidth - (window.pageXOffset + l2.right), h2 = f2 + a2 > window.document.body.offsetWidth, v3 = p3 + a2 > window.document.body.offsetWidth;
                  if (s(w2.calendarContainer, "rightMost", h2), !w2.config.static)
                    if (w2.calendarContainer.style.top = u2 + "px", h2)
                      if (v3) {
                        var D2 = function() {
                          for (var e3 = null, n3 = 0; n3 < document.styleSheets.length; n3++) {
                            var t3 = document.styleSheets[n3];
                            if (t3.cssRules) {
                              try {
                                t3.cssRules;
                              } catch (e4) {
                                continue;
                              }
                              e3 = t3;
                              break;
                            }
                          }
                          return null != e3 ? e3 : (a3 = document.createElement("style"), document.head.appendChild(a3), a3.sheet);
                          var a3;
                        }();
                        if (void 0 === D2)
                          return;
                        var b2 = window.document.body.offsetWidth, C2 = Math.max(0, b2 / 2 - a2 / 2), M2 = D2.cssRules.length, y2 = "{left:" + l2.left + "px;right:auto;}";
                        s(w2.calendarContainer, "rightMost", false), s(w2.calendarContainer, "centerMost", true), D2.insertRule(".flatpickr-calendar.centerMost:before,.flatpickr-calendar.centerMost:after" + y2, M2), w2.calendarContainer.style.left = C2 + "px", w2.calendarContainer.style.right = "auto";
                      } else
                        w2.calendarContainer.style.left = "auto", w2.calendarContainer.style.right = p3 + "px";
                    else
                      w2.calendarContainer.style.left = f2 + "px", w2.calendarContainer.style.right = "auto";
                }
              }
            } else
              w2.config.position(w2, e2);
          }
          function ue() {
            w2.config.noCalendar || w2.isMobile || (q(), Ce(), U());
          }
          function fe() {
            w2._input.focus(), -1 !== window.navigator.userAgent.indexOf("MSIE") || void 0 !== navigator.msMaxTouchPoints ? setTimeout(w2.close, 0) : w2.close();
          }
          function me(e2) {
            e2.preventDefault(), e2.stopPropagation();
            var n2 = f(g(e2), function(e3) {
              return e3.classList && e3.classList.contains("flatpickr-day") && !e3.classList.contains("flatpickr-disabled") && !e3.classList.contains("notAllowed");
            });
            if (void 0 !== n2) {
              var t2 = n2, a2 = w2.latestSelectedDateObj = new Date(t2.dateObj.getTime()), i3 = (a2.getMonth() < w2.currentMonth || a2.getMonth() > w2.currentMonth + w2.config.showMonths - 1) && "range" !== w2.config.mode;
              if (w2.selectedDateElem = t2, "single" === w2.config.mode)
                w2.selectedDates = [a2];
              else if ("multiple" === w2.config.mode) {
                var o2 = be(a2);
                o2 ? w2.selectedDates.splice(parseInt(o2), 1) : w2.selectedDates.push(a2);
              } else
                "range" === w2.config.mode && (2 === w2.selectedDates.length && w2.clear(false, false), w2.latestSelectedDateObj = a2, w2.selectedDates.push(a2), 0 !== M(a2, w2.selectedDates[0], true) && w2.selectedDates.sort(function(e3, n3) {
                  return e3.getTime() - n3.getTime();
                }));
              if (O(), i3) {
                var r2 = w2.currentYear !== a2.getFullYear();
                w2.currentYear = a2.getFullYear(), w2.currentMonth = a2.getMonth(), r2 && (De("onYearChange"), q()), De("onMonthChange");
              }
              if (Ce(), U(), ye(), i3 || "range" === w2.config.mode || 1 !== w2.config.showMonths ? void 0 !== w2.selectedDateElem && void 0 === w2.hourElement && w2.selectedDateElem && w2.selectedDateElem.focus() : W(t2), void 0 !== w2.hourElement && void 0 !== w2.hourElement && w2.hourElement.focus(), w2.config.closeOnSelect) {
                var l2 = "single" === w2.config.mode && !w2.config.enableTime, c2 = "range" === w2.config.mode && 2 === w2.selectedDates.length && !w2.config.enableTime;
                (l2 || c2) && fe();
              }
              Y();
            }
          }
          w2.parseDate = C({ config: w2.config, l10n: w2.l10n }), w2._handlers = [], w2.pluginElements = [], w2.loadedPlugins = [], w2._bind = P, w2._setHoursFromDate = F, w2._positionCalendar = de, w2.changeMonth = Z, w2.changeYear = ee, w2.clear = function(e2, n2) {
            void 0 === e2 && (e2 = true);
            void 0 === n2 && (n2 = true);
            w2.input.value = "", void 0 !== w2.altInput && (w2.altInput.value = "");
            void 0 !== w2.mobileInput && (w2.mobileInput.value = "");
            w2.selectedDates = [], w2.latestSelectedDateObj = void 0, true === n2 && (w2.currentYear = w2._initialDate.getFullYear(), w2.currentMonth = w2._initialDate.getMonth());
            if (true === w2.config.enableTime) {
              var t2 = E(w2.config), a2 = t2.hours, i3 = t2.minutes, o2 = t2.seconds;
              A(a2, i3, o2);
            }
            w2.redraw(), e2 && De("onChange");
          }, w2.close = function() {
            w2.isOpen = false, w2.isMobile || (void 0 !== w2.calendarContainer && w2.calendarContainer.classList.remove("open"), void 0 !== w2._input && w2._input.classList.remove("active"));
            De("onClose");
          }, w2.onMouseOver = oe, w2._createElement = d, w2.createDay = R, w2.destroy = function() {
            void 0 !== w2.config && De("onDestroy");
            for (var e2 = w2._handlers.length; e2--; )
              w2._handlers[e2].remove();
            if (w2._handlers = [], w2.mobileInput)
              w2.mobileInput.parentNode && w2.mobileInput.parentNode.removeChild(w2.mobileInput), w2.mobileInput = void 0;
            else if (w2.calendarContainer && w2.calendarContainer.parentNode)
              if (w2.config.static && w2.calendarContainer.parentNode) {
                var n2 = w2.calendarContainer.parentNode;
                if (n2.lastChild && n2.removeChild(n2.lastChild), n2.parentNode) {
                  for (; n2.firstChild; )
                    n2.parentNode.insertBefore(n2.firstChild, n2);
                  n2.parentNode.removeChild(n2);
                }
              } else
                w2.calendarContainer.parentNode.removeChild(w2.calendarContainer);
            w2.altInput && (w2.input.type = "text", w2.altInput.parentNode && w2.altInput.parentNode.removeChild(w2.altInput), delete w2.altInput);
            w2.input && (w2.input.type = w2.input._type, w2.input.classList.remove("flatpickr-input"), w2.input.removeAttribute("readonly"));
            ["_showTimeInput", "latestSelectedDateObj", "_hideNextMonthArrow", "_hidePrevMonthArrow", "__hideNextMonthArrow", "__hidePrevMonthArrow", "isMobile", "isOpen", "selectedDateElem", "minDateHasTime", "maxDateHasTime", "days", "daysContainer", "_input", "_positionElement", "innerContainer", "rContainer", "monthNav", "todayDateElem", "calendarContainer", "weekdayContainer", "prevMonthNav", "nextMonthNav", "monthsDropdownContainer", "currentMonthElement", "currentYearElement", "navigationCurrentMonth", "selectedDateElem", "config"].forEach(function(e3) {
              try {
                delete w2[e3];
              } catch (e4) {
              }
            });
          }, w2.isEnabled = ne, w2.jumpToDate = j, w2.updateValue = ye, w2.open = function(e2, n2) {
            void 0 === n2 && (n2 = w2._positionElement);
            if (true === w2.isMobile) {
              if (e2) {
                e2.preventDefault();
                var t2 = g(e2);
                t2 && t2.blur();
              }
              return void 0 !== w2.mobileInput && (w2.mobileInput.focus(), w2.mobileInput.click()), void De("onOpen");
            }
            if (w2._input.disabled || w2.config.inline)
              return;
            var a2 = w2.isOpen;
            w2.isOpen = true, a2 || (w2.calendarContainer.classList.add("open"), w2._input.classList.add("active"), De("onOpen"), de(n2));
            true === w2.config.enableTime && true === w2.config.noCalendar && (false !== w2.config.allowInput || void 0 !== e2 && w2.timeContainer.contains(e2.relatedTarget) || setTimeout(function() {
              return w2.hourElement.select();
            }, 50));
          }, w2.redraw = ue, w2.set = function(e2, n2) {
            if (null !== e2 && "object" == typeof e2)
              for (var a2 in Object.assign(w2.config, e2), e2)
                void 0 !== ge[a2] && ge[a2].forEach(function(e3) {
                  return e3();
                });
            else
              w2.config[e2] = n2, void 0 !== ge[e2] ? ge[e2].forEach(function(e3) {
                return e3();
              }) : t.indexOf(e2) > -1 && (w2.config[e2] = c(n2));
            w2.redraw(), ye(true);
          }, w2.setDate = function(e2, n2, t2) {
            void 0 === n2 && (n2 = false);
            void 0 === t2 && (t2 = w2.config.dateFormat);
            if (0 !== e2 && !e2 || e2 instanceof Array && 0 === e2.length)
              return w2.clear(n2);
            pe(e2, t2), w2.latestSelectedDateObj = w2.selectedDates[w2.selectedDates.length - 1], w2.redraw(), j(void 0, n2), F(), 0 === w2.selectedDates.length && w2.clear(false);
            ye(n2), n2 && De("onChange");
          }, w2.toggle = function(e2) {
            if (true === w2.isOpen)
              return w2.close();
            w2.open(e2);
          };
          var ge = { locale: [se, G], showMonths: [V, S, z], minDate: [j], maxDate: [j], positionElement: [ve], clickOpens: [function() {
            true === w2.config.clickOpens ? (P(w2._input, "focus", w2.open), P(w2._input, "click", w2.open)) : (w2._input.removeEventListener("focus", w2.open), w2._input.removeEventListener("click", w2.open));
          }] };
          function pe(e2, n2) {
            var t2 = [];
            if (e2 instanceof Array)
              t2 = e2.map(function(e3) {
                return w2.parseDate(e3, n2);
              });
            else if (e2 instanceof Date || "number" == typeof e2)
              t2 = [w2.parseDate(e2, n2)];
            else if ("string" == typeof e2)
              switch (w2.config.mode) {
                case "single":
                case "time":
                  t2 = [w2.parseDate(e2, n2)];
                  break;
                case "multiple":
                  t2 = e2.split(w2.config.conjunction).map(function(e3) {
                    return w2.parseDate(e3, n2);
                  });
                  break;
                case "range":
                  t2 = e2.split(w2.l10n.rangeSeparator).map(function(e3) {
                    return w2.parseDate(e3, n2);
                  });
              }
            else
              w2.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(e2)));
            w2.selectedDates = w2.config.allowInvalidPreload ? t2 : t2.filter(function(e3) {
              return e3 instanceof Date && ne(e3, false);
            }), "range" === w2.config.mode && w2.selectedDates.sort(function(e3, n3) {
              return e3.getTime() - n3.getTime();
            });
          }
          function he(e2) {
            return e2.slice().map(function(e3) {
              return "string" == typeof e3 || "number" == typeof e3 || e3 instanceof Date ? w2.parseDate(e3, void 0, true) : e3 && "object" == typeof e3 && e3.from && e3.to ? { from: w2.parseDate(e3.from, void 0), to: w2.parseDate(e3.to, void 0) } : e3;
            }).filter(function(e3) {
              return e3;
            });
          }
          function ve() {
            w2._positionElement = w2.config.positionElement || w2._input;
          }
          function De(e2, n2) {
            if (void 0 !== w2.config) {
              var t2 = w2.config[e2];
              if (void 0 !== t2 && t2.length > 0)
                for (var a2 = 0; t2[a2] && a2 < t2.length; a2++)
                  t2[a2](w2.selectedDates, w2.input.value, w2, n2);
              "onChange" === e2 && (w2.input.dispatchEvent(we("change")), w2.input.dispatchEvent(we("input")));
            }
          }
          function we(e2) {
            var n2 = document.createEvent("Event");
            return n2.initEvent(e2, true, true), n2;
          }
          function be(e2) {
            for (var n2 = 0; n2 < w2.selectedDates.length; n2++) {
              var t2 = w2.selectedDates[n2];
              if (t2 instanceof Date && 0 === M(t2, e2))
                return "" + n2;
            }
            return false;
          }
          function Ce() {
            w2.config.noCalendar || w2.isMobile || !w2.monthNav || (w2.yearElements.forEach(function(e2, n2) {
              var t2 = new Date(w2.currentYear, w2.currentMonth, 1);
              t2.setMonth(w2.currentMonth + n2), w2.config.showMonths > 1 || "static" === w2.config.monthSelectorType ? w2.monthElements[n2].textContent = h(t2.getMonth(), w2.config.shorthandCurrentMonth, w2.l10n) + " " : w2.monthsDropdownContainer.value = t2.getMonth().toString(), e2.value = t2.getFullYear().toString();
            }), w2._hidePrevMonthArrow = void 0 !== w2.config.minDate && (w2.currentYear === w2.config.minDate.getFullYear() ? w2.currentMonth <= w2.config.minDate.getMonth() : w2.currentYear < w2.config.minDate.getFullYear()), w2._hideNextMonthArrow = void 0 !== w2.config.maxDate && (w2.currentYear === w2.config.maxDate.getFullYear() ? w2.currentMonth + 1 > w2.config.maxDate.getMonth() : w2.currentYear > w2.config.maxDate.getFullYear()));
          }
          function Me(e2) {
            var n2 = e2 || (w2.config.altInput ? w2.config.altFormat : w2.config.dateFormat);
            return w2.selectedDates.map(function(e3) {
              return w2.formatDate(e3, n2);
            }).filter(function(e3, n3, t2) {
              return "range" !== w2.config.mode || w2.config.enableTime || t2.indexOf(e3) === n3;
            }).join("range" !== w2.config.mode ? w2.config.conjunction : w2.l10n.rangeSeparator);
          }
          function ye(e2) {
            void 0 === e2 && (e2 = true), void 0 !== w2.mobileInput && w2.mobileFormatStr && (w2.mobileInput.value = void 0 !== w2.latestSelectedDateObj ? w2.formatDate(w2.latestSelectedDateObj, w2.mobileFormatStr) : ""), w2.input.value = Me(w2.config.dateFormat), void 0 !== w2.altInput && (w2.altInput.value = Me(w2.config.altFormat)), false !== e2 && De("onValueUpdate");
          }
          function xe(e2) {
            var n2 = g(e2), t2 = w2.prevMonthNav.contains(n2), a2 = w2.nextMonthNav.contains(n2);
            t2 || a2 ? Z(t2 ? -1 : 1) : w2.yearElements.indexOf(n2) >= 0 ? n2.select() : n2.classList.contains("arrowUp") ? w2.changeYear(w2.currentYear + 1) : n2.classList.contains("arrowDown") && w2.changeYear(w2.currentYear - 1);
          }
          return function() {
            w2.element = w2.input = p2, w2.isOpen = false, function() {
              var n3 = ["wrap", "weekNumbers", "allowInput", "allowInvalidPreload", "clickOpens", "time_24hr", "enableTime", "noCalendar", "altInput", "shorthandCurrentMonth", "inline", "static", "enableSeconds", "disableMobile"], i3 = e(e({}, JSON.parse(JSON.stringify(p2.dataset || {}))), v2), o2 = {};
              w2.config.parseDate = i3.parseDate, w2.config.formatDate = i3.formatDate, Object.defineProperty(w2.config, "enable", { get: function() {
                return w2.config._enable;
              }, set: function(e2) {
                w2.config._enable = he(e2);
              } }), Object.defineProperty(w2.config, "disable", { get: function() {
                return w2.config._disable;
              }, set: function(e2) {
                w2.config._disable = he(e2);
              } });
              var r2 = "time" === i3.mode;
              if (!i3.dateFormat && (i3.enableTime || r2)) {
                var l2 = I.defaultConfig.dateFormat || a.dateFormat;
                o2.dateFormat = i3.noCalendar || r2 ? "H:i" + (i3.enableSeconds ? ":S" : "") : l2 + " H:i" + (i3.enableSeconds ? ":S" : "");
              }
              if (i3.altInput && (i3.enableTime || r2) && !i3.altFormat) {
                var s2 = I.defaultConfig.altFormat || a.altFormat;
                o2.altFormat = i3.noCalendar || r2 ? "h:i" + (i3.enableSeconds ? ":S K" : " K") : s2 + " h:i" + (i3.enableSeconds ? ":S" : "") + " K";
              }
              Object.defineProperty(w2.config, "minDate", { get: function() {
                return w2.config._minDate;
              }, set: le("min") }), Object.defineProperty(w2.config, "maxDate", { get: function() {
                return w2.config._maxDate;
              }, set: le("max") });
              var d2 = function(e2) {
                return function(n4) {
                  w2.config["min" === e2 ? "_minTime" : "_maxTime"] = w2.parseDate(n4, "H:i:S");
                };
              };
              Object.defineProperty(w2.config, "minTime", { get: function() {
                return w2.config._minTime;
              }, set: d2("min") }), Object.defineProperty(w2.config, "maxTime", { get: function() {
                return w2.config._maxTime;
              }, set: d2("max") }), "time" === i3.mode && (w2.config.noCalendar = true, w2.config.enableTime = true);
              Object.assign(w2.config, o2, i3);
              for (var u2 = 0; u2 < n3.length; u2++)
                w2.config[n3[u2]] = true === w2.config[n3[u2]] || "true" === w2.config[n3[u2]];
              t.filter(function(e2) {
                return void 0 !== w2.config[e2];
              }).forEach(function(e2) {
                w2.config[e2] = c(w2.config[e2] || []).map(T2);
              }), w2.isMobile = !w2.config.disableMobile && !w2.config.inline && "single" === w2.config.mode && !w2.config.disable.length && !w2.config.enable && !w2.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
              for (u2 = 0; u2 < w2.config.plugins.length; u2++) {
                var f2 = w2.config.plugins[u2](w2) || {};
                for (var m2 in f2)
                  t.indexOf(m2) > -1 ? w2.config[m2] = c(f2[m2]).map(T2).concat(w2.config[m2]) : void 0 === i3[m2] && (w2.config[m2] = f2[m2]);
              }
              i3.altInputClass || (w2.config.altInputClass = ce().className + " " + w2.config.altInputClass);
              De("onParseConfig");
            }(), se(), function() {
              if (w2.input = ce(), !w2.input)
                return void w2.config.errorHandler(new Error("Invalid input element specified"));
              w2.input._type = w2.input.type, w2.input.type = "text", w2.input.classList.add("flatpickr-input"), w2._input = w2.input, w2.config.altInput && (w2.altInput = d(w2.input.nodeName, w2.config.altInputClass), w2._input = w2.altInput, w2.altInput.placeholder = w2.input.placeholder, w2.altInput.disabled = w2.input.disabled, w2.altInput.required = w2.input.required, w2.altInput.tabIndex = w2.input.tabIndex, w2.altInput.type = "text", w2.input.setAttribute("type", "hidden"), !w2.config.static && w2.input.parentNode && w2.input.parentNode.insertBefore(w2.altInput, w2.input.nextSibling));
              w2.config.allowInput || w2._input.setAttribute("readonly", "readonly");
              ve();
            }(), function() {
              w2.selectedDates = [], w2.now = w2.parseDate(w2.config.now) || /* @__PURE__ */ new Date();
              var e2 = w2.config.defaultDate || ("INPUT" !== w2.input.nodeName && "TEXTAREA" !== w2.input.nodeName || !w2.input.placeholder || w2.input.value !== w2.input.placeholder ? w2.input.value : null);
              e2 && pe(e2, w2.config.dateFormat);
              w2._initialDate = w2.selectedDates.length > 0 ? w2.selectedDates[0] : w2.config.minDate && w2.config.minDate.getTime() > w2.now.getTime() ? w2.config.minDate : w2.config.maxDate && w2.config.maxDate.getTime() < w2.now.getTime() ? w2.config.maxDate : w2.now, w2.currentYear = w2._initialDate.getFullYear(), w2.currentMonth = w2._initialDate.getMonth(), w2.selectedDates.length > 0 && (w2.latestSelectedDateObj = w2.selectedDates[0]);
              void 0 !== w2.config.minTime && (w2.config.minTime = w2.parseDate(w2.config.minTime, "H:i"));
              void 0 !== w2.config.maxTime && (w2.config.maxTime = w2.parseDate(w2.config.maxTime, "H:i"));
              w2.minDateHasTime = !!w2.config.minDate && (w2.config.minDate.getHours() > 0 || w2.config.minDate.getMinutes() > 0 || w2.config.minDate.getSeconds() > 0), w2.maxDateHasTime = !!w2.config.maxDate && (w2.config.maxDate.getHours() > 0 || w2.config.maxDate.getMinutes() > 0 || w2.config.maxDate.getSeconds() > 0);
            }(), w2.utils = { getDaysInMonth: function(e2, n3) {
              return void 0 === e2 && (e2 = w2.currentMonth), void 0 === n3 && (n3 = w2.currentYear), 1 === e2 && (n3 % 4 == 0 && n3 % 100 != 0 || n3 % 400 == 0) ? 29 : w2.l10n.daysInMonth[e2];
            } }, w2.isMobile || function() {
              var e2 = window.document.createDocumentFragment();
              if (w2.calendarContainer = d("div", "flatpickr-calendar"), w2.calendarContainer.tabIndex = -1, !w2.config.noCalendar) {
                if (e2.appendChild((w2.monthNav = d("div", "flatpickr-months"), w2.yearElements = [], w2.monthElements = [], w2.prevMonthNav = d("span", "flatpickr-prev-month"), w2.prevMonthNav.innerHTML = w2.config.prevArrow, w2.nextMonthNav = d("span", "flatpickr-next-month"), w2.nextMonthNav.innerHTML = w2.config.nextArrow, V(), Object.defineProperty(w2, "_hidePrevMonthArrow", { get: function() {
                  return w2.__hidePrevMonthArrow;
                }, set: function(e3) {
                  w2.__hidePrevMonthArrow !== e3 && (s(w2.prevMonthNav, "flatpickr-disabled", e3), w2.__hidePrevMonthArrow = e3);
                } }), Object.defineProperty(w2, "_hideNextMonthArrow", { get: function() {
                  return w2.__hideNextMonthArrow;
                }, set: function(e3) {
                  w2.__hideNextMonthArrow !== e3 && (s(w2.nextMonthNav, "flatpickr-disabled", e3), w2.__hideNextMonthArrow = e3);
                } }), w2.currentYearElement = w2.yearElements[0], Ce(), w2.monthNav)), w2.innerContainer = d("div", "flatpickr-innerContainer"), w2.config.weekNumbers) {
                  var n3 = function() {
                    w2.calendarContainer.classList.add("hasWeeks");
                    var e3 = d("div", "flatpickr-weekwrapper");
                    e3.appendChild(d("span", "flatpickr-weekday", w2.l10n.weekAbbreviation));
                    var n4 = d("div", "flatpickr-weeks");
                    return e3.appendChild(n4), { weekWrapper: e3, weekNumbers: n4 };
                  }(), t2 = n3.weekWrapper, a2 = n3.weekNumbers;
                  w2.innerContainer.appendChild(t2), w2.weekNumbers = a2, w2.weekWrapper = t2;
                }
                w2.rContainer = d("div", "flatpickr-rContainer"), w2.rContainer.appendChild(z()), w2.daysContainer || (w2.daysContainer = d("div", "flatpickr-days"), w2.daysContainer.tabIndex = -1), U(), w2.rContainer.appendChild(w2.daysContainer), w2.innerContainer.appendChild(w2.rContainer), e2.appendChild(w2.innerContainer);
              }
              w2.config.enableTime && e2.appendChild(function() {
                w2.calendarContainer.classList.add("hasTime"), w2.config.noCalendar && w2.calendarContainer.classList.add("noCalendar");
                var e3 = E(w2.config);
                w2.timeContainer = d("div", "flatpickr-time"), w2.timeContainer.tabIndex = -1;
                var n4 = d("span", "flatpickr-time-separator", ":"), t3 = m("flatpickr-hour", { "aria-label": w2.l10n.hourAriaLabel });
                w2.hourElement = t3.getElementsByTagName("input")[0];
                var a3 = m("flatpickr-minute", { "aria-label": w2.l10n.minuteAriaLabel });
                w2.minuteElement = a3.getElementsByTagName("input")[0], w2.hourElement.tabIndex = w2.minuteElement.tabIndex = -1, w2.hourElement.value = o(w2.latestSelectedDateObj ? w2.latestSelectedDateObj.getHours() : w2.config.time_24hr ? e3.hours : function(e4) {
                  switch (e4 % 24) {
                    case 0:
                    case 12:
                      return 12;
                    default:
                      return e4 % 12;
                  }
                }(e3.hours)), w2.minuteElement.value = o(w2.latestSelectedDateObj ? w2.latestSelectedDateObj.getMinutes() : e3.minutes), w2.hourElement.setAttribute("step", w2.config.hourIncrement.toString()), w2.minuteElement.setAttribute("step", w2.config.minuteIncrement.toString()), w2.hourElement.setAttribute("min", w2.config.time_24hr ? "0" : "1"), w2.hourElement.setAttribute("max", w2.config.time_24hr ? "23" : "12"), w2.hourElement.setAttribute("maxlength", "2"), w2.minuteElement.setAttribute("min", "0"), w2.minuteElement.setAttribute("max", "59"), w2.minuteElement.setAttribute("maxlength", "2"), w2.timeContainer.appendChild(t3), w2.timeContainer.appendChild(n4), w2.timeContainer.appendChild(a3), w2.config.time_24hr && w2.timeContainer.classList.add("time24hr");
                if (w2.config.enableSeconds) {
                  w2.timeContainer.classList.add("hasSeconds");
                  var i4 = m("flatpickr-second");
                  w2.secondElement = i4.getElementsByTagName("input")[0], w2.secondElement.value = o(w2.latestSelectedDateObj ? w2.latestSelectedDateObj.getSeconds() : e3.seconds), w2.secondElement.setAttribute("step", w2.minuteElement.getAttribute("step")), w2.secondElement.setAttribute("min", "0"), w2.secondElement.setAttribute("max", "59"), w2.secondElement.setAttribute("maxlength", "2"), w2.timeContainer.appendChild(d("span", "flatpickr-time-separator", ":")), w2.timeContainer.appendChild(i4);
                }
                w2.config.time_24hr || (w2.amPM = d("span", "flatpickr-am-pm", w2.l10n.amPM[r((w2.latestSelectedDateObj ? w2.hourElement.value : w2.config.defaultHour) > 11)]), w2.amPM.title = w2.l10n.toggleTitle, w2.amPM.tabIndex = -1, w2.timeContainer.appendChild(w2.amPM));
                return w2.timeContainer;
              }());
              s(w2.calendarContainer, "rangeMode", "range" === w2.config.mode), s(w2.calendarContainer, "animate", true === w2.config.animate), s(w2.calendarContainer, "multiMonth", w2.config.showMonths > 1), w2.calendarContainer.appendChild(e2);
              var i3 = void 0 !== w2.config.appendTo && void 0 !== w2.config.appendTo.nodeType;
              if ((w2.config.inline || w2.config.static) && (w2.calendarContainer.classList.add(w2.config.inline ? "inline" : "static"), w2.config.inline && (!i3 && w2.element.parentNode ? w2.element.parentNode.insertBefore(w2.calendarContainer, w2._input.nextSibling) : void 0 !== w2.config.appendTo && w2.config.appendTo.appendChild(w2.calendarContainer)), w2.config.static)) {
                var l2 = d("div", "flatpickr-wrapper");
                w2.element.parentNode && w2.element.parentNode.insertBefore(l2, w2.element), l2.appendChild(w2.element), w2.altInput && l2.appendChild(w2.altInput), l2.appendChild(w2.calendarContainer);
              }
              w2.config.static || w2.config.inline || (void 0 !== w2.config.appendTo ? w2.config.appendTo : window.document.body).appendChild(w2.calendarContainer);
            }(), function() {
              w2.config.wrap && ["open", "close", "toggle", "clear"].forEach(function(e3) {
                Array.prototype.forEach.call(w2.element.querySelectorAll("[data-" + e3 + "]"), function(n4) {
                  return P(n4, "click", w2[e3]);
                });
              });
              if (w2.isMobile)
                return void function() {
                  var e3 = w2.config.enableTime ? w2.config.noCalendar ? "time" : "datetime-local" : "date";
                  w2.mobileInput = d("input", w2.input.className + " flatpickr-mobile"), w2.mobileInput.tabIndex = 1, w2.mobileInput.type = e3, w2.mobileInput.disabled = w2.input.disabled, w2.mobileInput.required = w2.input.required, w2.mobileInput.placeholder = w2.input.placeholder, w2.mobileFormatStr = "datetime-local" === e3 ? "Y-m-d\\TH:i:S" : "date" === e3 ? "Y-m-d" : "H:i:S", w2.selectedDates.length > 0 && (w2.mobileInput.defaultValue = w2.mobileInput.value = w2.formatDate(w2.selectedDates[0], w2.mobileFormatStr));
                  w2.config.minDate && (w2.mobileInput.min = w2.formatDate(w2.config.minDate, "Y-m-d"));
                  w2.config.maxDate && (w2.mobileInput.max = w2.formatDate(w2.config.maxDate, "Y-m-d"));
                  w2.input.getAttribute("step") && (w2.mobileInput.step = String(w2.input.getAttribute("step")));
                  w2.input.type = "hidden", void 0 !== w2.altInput && (w2.altInput.type = "hidden");
                  try {
                    w2.input.parentNode && w2.input.parentNode.insertBefore(w2.mobileInput, w2.input.nextSibling);
                  } catch (e4) {
                  }
                  P(w2.mobileInput, "change", function(e4) {
                    w2.setDate(g(e4).value, false, w2.mobileFormatStr), De("onChange"), De("onClose");
                  });
                }();
              var e2 = l(re, 50);
              w2._debouncedChange = l(Y, 300), w2.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent) && P(w2.daysContainer, "mouseover", function(e3) {
                "range" === w2.config.mode && oe(g(e3));
              });
              P(w2._input, "keydown", ie), void 0 !== w2.calendarContainer && P(w2.calendarContainer, "keydown", ie);
              w2.config.inline || w2.config.static || P(window, "resize", e2);
              void 0 !== window.ontouchstart ? P(window.document, "touchstart", X) : P(window.document, "mousedown", X);
              P(window.document, "focus", X, { capture: true }), true === w2.config.clickOpens && (P(w2._input, "focus", w2.open), P(w2._input, "click", w2.open));
              void 0 !== w2.daysContainer && (P(w2.monthNav, "click", xe), P(w2.monthNav, ["keyup", "increment"], N), P(w2.daysContainer, "click", me));
              if (void 0 !== w2.timeContainer && void 0 !== w2.minuteElement && void 0 !== w2.hourElement) {
                var n3 = function(e3) {
                  return g(e3).select();
                };
                P(w2.timeContainer, ["increment"], _), P(w2.timeContainer, "blur", _, { capture: true }), P(w2.timeContainer, "click", H), P([w2.hourElement, w2.minuteElement], ["focus", "click"], n3), void 0 !== w2.secondElement && P(w2.secondElement, "focus", function() {
                  return w2.secondElement && w2.secondElement.select();
                }), void 0 !== w2.amPM && P(w2.amPM, "click", function(e3) {
                  _(e3);
                });
              }
              w2.config.allowInput && P(w2._input, "blur", ae);
            }(), (w2.selectedDates.length || w2.config.noCalendar) && (w2.config.enableTime && F(w2.config.noCalendar ? w2.latestSelectedDateObj : void 0), ye(false)), S();
            var n2 = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            !w2.isMobile && n2 && de(), De("onReady");
          }(), w2;
        }
        function T(e2, n2) {
          for (var t2 = Array.prototype.slice.call(e2).filter(function(e3) {
            return e3 instanceof HTMLElement;
          }), a2 = [], i3 = 0; i3 < t2.length; i3++) {
            var o2 = t2[i3];
            try {
              if (null !== o2.getAttribute("data-fp-omit"))
                continue;
              void 0 !== o2._flatpickr && (o2._flatpickr.destroy(), o2._flatpickr = void 0), o2._flatpickr = k(o2, n2 || {}), a2.push(o2._flatpickr);
            } catch (e3) {
              console.error(e3);
            }
          }
          return 1 === a2.length ? a2[0] : a2;
        }
        "undefined" != typeof HTMLElement && "undefined" != typeof HTMLCollection && "undefined" != typeof NodeList && (HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(e2) {
          return T(this, e2);
        }, HTMLElement.prototype.flatpickr = function(e2) {
          return T([this], e2);
        });
        var I = function(e2, n2) {
          return "string" == typeof e2 ? T(window.document.querySelectorAll(e2), n2) : e2 instanceof Node ? T([e2], n2) : T(e2, n2);
        };
        return I.defaultConfig = {}, I.l10ns = { en: e({}, i2), default: e({}, i2) }, I.localize = function(n2) {
          I.l10ns.default = e(e({}, I.l10ns.default), n2);
        }, I.setDefaults = function(n2) {
          I.defaultConfig = e(e({}, I.defaultConfig), n2);
        }, I.parseDate = C({}), I.formatDate = b({}), I.compareDates = M, "undefined" != typeof jQuery && void 0 !== jQuery.fn && (jQuery.fn.flatpickr = function(e2) {
          return T(this, e2);
        }), Date.prototype.fp_incr = function(e2) {
          return new Date(this.getFullYear(), this.getMonth(), this.getDate() + ("string" == typeof e2 ? parseInt(e2, 10) : e2));
        }, "undefined" != typeof window && (window.flatpickr = I), I;
      });
      !function(t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).Chart = e();
      }(exports, function() {
        var _a2, _b, _c, _d, _e2, _f, _g, _h, _i2, _j, _k;
        "use strict";
        var t = Object.freeze({ __proto__: null, get Colors() {
          return Go;
        }, get Decimation() {
          return Qo;
        }, get Filler() {
          return ma;
        }, get Legend() {
          return ya;
        }, get SubTitle() {
          return ka;
        }, get Title() {
          return Ma;
        }, get Tooltip() {
          return Ba;
        } });
        function e() {
        }
        const i2 = (() => {
          let t2 = 0;
          return () => t2++;
        })();
        function s(t2) {
          return null == t2;
        }
        function n(t2) {
          if (Array.isArray && Array.isArray(t2))
            return true;
          const e2 = Object.prototype.toString.call(t2);
          return "[object" === e2.slice(0, 7) && "Array]" === e2.slice(-6);
        }
        function o(t2) {
          return null !== t2 && "[object Object]" === Object.prototype.toString.call(t2);
        }
        function a(t2) {
          return ("number" == typeof t2 || t2 instanceof Number) && isFinite(+t2);
        }
        function r(t2, e2) {
          return a(t2) ? t2 : e2;
        }
        function l(t2, e2) {
          return void 0 === t2 ? e2 : t2;
        }
        const h = (t2, e2) => "string" == typeof t2 && t2.endsWith("%") ? parseFloat(t2) / 100 : +t2 / e2, c = (t2, e2) => "string" == typeof t2 && t2.endsWith("%") ? parseFloat(t2) / 100 * e2 : +t2;
        function d(t2, e2, i3) {
          if (t2 && "function" == typeof t2.call)
            return t2.apply(i3, e2);
        }
        function u(t2, e2, i3, s2) {
          let a2, r2, l2;
          if (n(t2))
            if (r2 = t2.length, s2)
              for (a2 = r2 - 1; a2 >= 0; a2--)
                e2.call(i3, t2[a2], a2);
            else
              for (a2 = 0; a2 < r2; a2++)
                e2.call(i3, t2[a2], a2);
          else if (o(t2))
            for (l2 = Object.keys(t2), r2 = l2.length, a2 = 0; a2 < r2; a2++)
              e2.call(i3, t2[l2[a2]], l2[a2]);
        }
        function f(t2, e2) {
          let i3, s2, n2, o2;
          if (!t2 || !e2 || t2.length !== e2.length)
            return false;
          for (i3 = 0, s2 = t2.length; i3 < s2; ++i3)
            if (n2 = t2[i3], o2 = e2[i3], n2.datasetIndex !== o2.datasetIndex || n2.index !== o2.index)
              return false;
          return true;
        }
        function g(t2) {
          if (n(t2))
            return t2.map(g);
          if (o(t2)) {
            const e2 = /* @__PURE__ */ Object.create(null), i3 = Object.keys(t2), s2 = i3.length;
            let n2 = 0;
            for (; n2 < s2; ++n2)
              e2[i3[n2]] = g(t2[i3[n2]]);
            return e2;
          }
          return t2;
        }
        function p(t2) {
          return -1 === ["__proto__", "prototype", "constructor"].indexOf(t2);
        }
        function m(t2, e2, i3, s2) {
          if (!p(t2))
            return;
          const n2 = e2[t2], a2 = i3[t2];
          o(n2) && o(a2) ? x(n2, a2, s2) : e2[t2] = g(a2);
        }
        function x(t2, e2, i3) {
          const s2 = n(e2) ? e2 : [e2], a2 = s2.length;
          if (!o(t2))
            return t2;
          const r2 = (i3 = i3 || {}).merger || m;
          let l2;
          for (let e3 = 0; e3 < a2; ++e3) {
            if (l2 = s2[e3], !o(l2))
              continue;
            const n2 = Object.keys(l2);
            for (let e4 = 0, s3 = n2.length; e4 < s3; ++e4)
              r2(n2[e4], t2, l2, i3);
          }
          return t2;
        }
        function b(t2, e2) {
          return x(t2, e2, { merger: _ });
        }
        function _(t2, e2, i3) {
          if (!p(t2))
            return;
          const s2 = e2[t2], n2 = i3[t2];
          o(s2) && o(n2) ? b(s2, n2) : Object.prototype.hasOwnProperty.call(e2, t2) || (e2[t2] = g(n2));
        }
        const y = { "": (t2) => t2, x: (t2) => t2.x, y: (t2) => t2.y };
        function v(t2) {
          const e2 = t2.split("."), i3 = [];
          let s2 = "";
          for (const t3 of e2)
            s2 += t3, s2.endsWith("\\") ? s2 = s2.slice(0, -1) + "." : (i3.push(s2), s2 = "");
          return i3;
        }
        function M(t2, e2) {
          const i3 = y[e2] || (y[e2] = function(t3) {
            const e3 = v(t3);
            return (t4) => {
              for (const i4 of e3) {
                if ("" === i4)
                  break;
                t4 = t4 && t4[i4];
              }
              return t4;
            };
          }(e2));
          return i3(t2);
        }
        function w(t2) {
          return t2.charAt(0).toUpperCase() + t2.slice(1);
        }
        const k = (t2) => void 0 !== t2, S = (t2) => "function" == typeof t2, P = (t2, e2) => {
          if (t2.size !== e2.size)
            return false;
          for (const i3 of t2)
            if (!e2.has(i3))
              return false;
          return true;
        };
        function D(t2) {
          return "mouseup" === t2.type || "click" === t2.type || "contextmenu" === t2.type;
        }
        const C = Math.PI, O = 2 * C, A = O + C, T = Number.POSITIVE_INFINITY, L = C / 180, E = C / 2, R = C / 4, I = 2 * C / 3, z = Math.log10, F = Math.sign;
        function V(t2, e2, i3) {
          return Math.abs(t2 - e2) < i3;
        }
        function B(t2) {
          const e2 = Math.round(t2);
          t2 = V(t2, e2, t2 / 1e3) ? e2 : t2;
          const i3 = Math.pow(10, Math.floor(z(t2))), s2 = t2 / i3;
          return (s2 <= 1 ? 1 : s2 <= 2 ? 2 : s2 <= 5 ? 5 : 10) * i3;
        }
        function W(t2) {
          const e2 = [], i3 = Math.sqrt(t2);
          let s2;
          for (s2 = 1; s2 < i3; s2++)
            t2 % s2 == 0 && (e2.push(s2), e2.push(t2 / s2));
          return i3 === (0 | i3) && e2.push(i3), e2.sort((t3, e3) => t3 - e3).pop(), e2;
        }
        function N(t2) {
          return !isNaN(parseFloat(t2)) && isFinite(t2);
        }
        function H(t2, e2) {
          const i3 = Math.round(t2);
          return i3 - e2 <= t2 && i3 + e2 >= t2;
        }
        function j(t2, e2, i3) {
          let s2, n2, o2;
          for (s2 = 0, n2 = t2.length; s2 < n2; s2++)
            o2 = t2[s2][i3], isNaN(o2) || (e2.min = Math.min(e2.min, o2), e2.max = Math.max(e2.max, o2));
        }
        function $(t2) {
          return t2 * (C / 180);
        }
        function Y(t2) {
          return t2 * (180 / C);
        }
        function U(t2) {
          if (!a(t2))
            return;
          let e2 = 1, i3 = 0;
          for (; Math.round(t2 * e2) / e2 !== t2; )
            e2 *= 10, i3++;
          return i3;
        }
        function X(t2, e2) {
          const i3 = e2.x - t2.x, s2 = e2.y - t2.y, n2 = Math.sqrt(i3 * i3 + s2 * s2);
          let o2 = Math.atan2(s2, i3);
          return o2 < -0.5 * C && (o2 += O), { angle: o2, distance: n2 };
        }
        function q(t2, e2) {
          return Math.sqrt(Math.pow(e2.x - t2.x, 2) + Math.pow(e2.y - t2.y, 2));
        }
        function K(t2, e2) {
          return (t2 - e2 + A) % O - C;
        }
        function G(t2) {
          return (t2 % O + O) % O;
        }
        function Z(t2, e2, i3, s2) {
          const n2 = G(t2), o2 = G(e2), a2 = G(i3), r2 = G(o2 - n2), l2 = G(a2 - n2), h2 = G(n2 - o2), c2 = G(n2 - a2);
          return n2 === o2 || n2 === a2 || s2 && o2 === a2 || r2 > l2 && h2 < c2;
        }
        function J(t2, e2, i3) {
          return Math.max(e2, Math.min(i3, t2));
        }
        function Q(t2) {
          return J(t2, -32768, 32767);
        }
        function tt(t2, e2, i3, s2 = 1e-6) {
          return t2 >= Math.min(e2, i3) - s2 && t2 <= Math.max(e2, i3) + s2;
        }
        function et(t2, e2, i3) {
          i3 = i3 || ((i4) => t2[i4] < e2);
          let s2, n2 = t2.length - 1, o2 = 0;
          for (; n2 - o2 > 1; )
            s2 = o2 + n2 >> 1, i3(s2) ? o2 = s2 : n2 = s2;
          return { lo: o2, hi: n2 };
        }
        const it = (t2, e2, i3, s2) => et(t2, i3, s2 ? (s3) => {
          const n2 = t2[s3][e2];
          return n2 < i3 || n2 === i3 && t2[s3 + 1][e2] === i3;
        } : (s3) => t2[s3][e2] < i3), st = (t2, e2, i3) => et(t2, i3, (s2) => t2[s2][e2] >= i3);
        function nt(t2, e2, i3) {
          let s2 = 0, n2 = t2.length;
          for (; s2 < n2 && t2[s2] < e2; )
            s2++;
          for (; n2 > s2 && t2[n2 - 1] > i3; )
            n2--;
          return s2 > 0 || n2 < t2.length ? t2.slice(s2, n2) : t2;
        }
        const ot = ["push", "pop", "shift", "splice", "unshift"];
        function at(t2, e2) {
          t2._chartjs ? t2._chartjs.listeners.push(e2) : (Object.defineProperty(t2, "_chartjs", { configurable: true, enumerable: false, value: { listeners: [e2] } }), ot.forEach((e3) => {
            const i3 = "_onData" + w(e3), s2 = t2[e3];
            Object.defineProperty(t2, e3, { configurable: true, enumerable: false, value(...e4) {
              const n2 = s2.apply(this, e4);
              return t2._chartjs.listeners.forEach((t3) => {
                "function" == typeof t3[i3] && t3[i3](...e4);
              }), n2;
            } });
          }));
        }
        function rt(t2, e2) {
          const i3 = t2._chartjs;
          if (!i3)
            return;
          const s2 = i3.listeners, n2 = s2.indexOf(e2);
          -1 !== n2 && s2.splice(n2, 1), s2.length > 0 || (ot.forEach((e3) => {
            delete t2[e3];
          }), delete t2._chartjs);
        }
        function lt(t2) {
          const e2 = new Set(t2);
          return e2.size === t2.length ? t2 : Array.from(e2);
        }
        const ht = "undefined" == typeof window ? function(t2) {
          return t2();
        } : window.requestAnimationFrame;
        function ct(t2, e2) {
          let i3 = [], s2 = false;
          return function(...n2) {
            i3 = n2, s2 || (s2 = true, ht.call(window, () => {
              s2 = false, t2.apply(e2, i3);
            }));
          };
        }
        function dt(t2, e2) {
          let i3;
          return function(...s2) {
            return e2 ? (clearTimeout(i3), i3 = setTimeout(t2, e2, s2)) : t2.apply(this, s2), e2;
          };
        }
        const ut = (t2) => "start" === t2 ? "left" : "end" === t2 ? "right" : "center", ft = (t2, e2, i3) => "start" === t2 ? e2 : "end" === t2 ? i3 : (e2 + i3) / 2, gt = (t2, e2, i3, s2) => t2 === (s2 ? "left" : "right") ? i3 : "center" === t2 ? (e2 + i3) / 2 : e2;
        function pt(t2, e2, i3) {
          const s2 = e2.length;
          let n2 = 0, o2 = s2;
          if (t2._sorted) {
            const { iScale: a2, _parsed: r2 } = t2, l2 = a2.axis, { min: h2, max: c2, minDefined: d2, maxDefined: u2 } = a2.getUserBounds();
            d2 && (n2 = J(Math.min(it(r2, l2, h2).lo, i3 ? s2 : it(e2, l2, a2.getPixelForValue(h2)).lo), 0, s2 - 1)), o2 = u2 ? J(Math.max(it(r2, a2.axis, c2, true).hi + 1, i3 ? 0 : it(e2, l2, a2.getPixelForValue(c2), true).hi + 1), n2, s2) - n2 : s2 - n2;
          }
          return { start: n2, count: o2 };
        }
        function mt(t2) {
          const { xScale: e2, yScale: i3, _scaleRanges: s2 } = t2, n2 = { xmin: e2.min, xmax: e2.max, ymin: i3.min, ymax: i3.max };
          if (!s2)
            return t2._scaleRanges = n2, true;
          const o2 = s2.xmin !== e2.min || s2.xmax !== e2.max || s2.ymin !== i3.min || s2.ymax !== i3.max;
          return Object.assign(s2, n2), o2;
        }
        class xt {
          constructor() {
            this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = false, this._lastDate = void 0;
          }
          _notify(t2, e2, i3, s2) {
            const n2 = e2.listeners[s2], o2 = e2.duration;
            n2.forEach((s3) => s3({ chart: t2, initial: e2.initial, numSteps: o2, currentStep: Math.min(i3 - e2.start, o2) }));
          }
          _refresh() {
            this._request || (this._running = true, this._request = ht.call(window, () => {
              this._update(), this._request = null, this._running && this._refresh();
            }));
          }
          _update(t2 = Date.now()) {
            let e2 = 0;
            this._charts.forEach((i3, s2) => {
              if (!i3.running || !i3.items.length)
                return;
              const n2 = i3.items;
              let o2, a2 = n2.length - 1, r2 = false;
              for (; a2 >= 0; --a2)
                o2 = n2[a2], o2._active ? (o2._total > i3.duration && (i3.duration = o2._total), o2.tick(t2), r2 = true) : (n2[a2] = n2[n2.length - 1], n2.pop());
              r2 && (s2.draw(), this._notify(s2, i3, t2, "progress")), n2.length || (i3.running = false, this._notify(s2, i3, t2, "complete"), i3.initial = false), e2 += n2.length;
            }), this._lastDate = t2, 0 === e2 && (this._running = false);
          }
          _getAnims(t2) {
            const e2 = this._charts;
            let i3 = e2.get(t2);
            return i3 || (i3 = { running: false, initial: true, items: [], listeners: { complete: [], progress: [] } }, e2.set(t2, i3)), i3;
          }
          listen(t2, e2, i3) {
            this._getAnims(t2).listeners[e2].push(i3);
          }
          add(t2, e2) {
            e2 && e2.length && this._getAnims(t2).items.push(...e2);
          }
          has(t2) {
            return this._getAnims(t2).items.length > 0;
          }
          start(t2) {
            const e2 = this._charts.get(t2);
            e2 && (e2.running = true, e2.start = Date.now(), e2.duration = e2.items.reduce((t3, e3) => Math.max(t3, e3._duration), 0), this._refresh());
          }
          running(t2) {
            if (!this._running)
              return false;
            const e2 = this._charts.get(t2);
            return !!(e2 && e2.running && e2.items.length);
          }
          stop(t2) {
            const e2 = this._charts.get(t2);
            if (!e2 || !e2.items.length)
              return;
            const i3 = e2.items;
            let s2 = i3.length - 1;
            for (; s2 >= 0; --s2)
              i3[s2].cancel();
            e2.items = [], this._notify(t2, e2, Date.now(), "complete");
          }
          remove(t2) {
            return this._charts.delete(t2);
          }
        }
        var bt = new xt();
        function _t(t2) {
          return t2 + 0.5 | 0;
        }
        const yt = (t2, e2, i3) => Math.max(Math.min(t2, i3), e2);
        function vt(t2) {
          return yt(_t(2.55 * t2), 0, 255);
        }
        function Mt(t2) {
          return yt(_t(255 * t2), 0, 255);
        }
        function wt(t2) {
          return yt(_t(t2 / 2.55) / 100, 0, 1);
        }
        function kt(t2) {
          return yt(_t(100 * t2), 0, 100);
        }
        const St = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, Pt = [..."0123456789ABCDEF"], Dt = (t2) => Pt[15 & t2], Ct = (t2) => Pt[(240 & t2) >> 4] + Pt[15 & t2], Ot = (t2) => (240 & t2) >> 4 == (15 & t2);
        function At(t2) {
          var e2 = ((t3) => Ot(t3.r) && Ot(t3.g) && Ot(t3.b) && Ot(t3.a))(t2) ? Dt : Ct;
          return t2 ? "#" + e2(t2.r) + e2(t2.g) + e2(t2.b) + ((t3, e3) => t3 < 255 ? e3(t3) : "")(t2.a, e2) : void 0;
        }
        const Tt = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
        function Lt(t2, e2, i3) {
          const s2 = e2 * Math.min(i3, 1 - i3), n2 = (e3, n3 = (e3 + t2 / 30) % 12) => i3 - s2 * Math.max(Math.min(n3 - 3, 9 - n3, 1), -1);
          return [n2(0), n2(8), n2(4)];
        }
        function Et(t2, e2, i3) {
          const s2 = (s3, n2 = (s3 + t2 / 60) % 6) => i3 - i3 * e2 * Math.max(Math.min(n2, 4 - n2, 1), 0);
          return [s2(5), s2(3), s2(1)];
        }
        function Rt(t2, e2, i3) {
          const s2 = Lt(t2, 1, 0.5);
          let n2;
          for (e2 + i3 > 1 && (n2 = 1 / (e2 + i3), e2 *= n2, i3 *= n2), n2 = 0; n2 < 3; n2++)
            s2[n2] *= 1 - e2 - i3, s2[n2] += e2;
          return s2;
        }
        function It(t2) {
          const e2 = t2.r / 255, i3 = t2.g / 255, s2 = t2.b / 255, n2 = Math.max(e2, i3, s2), o2 = Math.min(e2, i3, s2), a2 = (n2 + o2) / 2;
          let r2, l2, h2;
          return n2 !== o2 && (h2 = n2 - o2, l2 = a2 > 0.5 ? h2 / (2 - n2 - o2) : h2 / (n2 + o2), r2 = function(t3, e3, i4, s3, n3) {
            return t3 === n3 ? (e3 - i4) / s3 + (e3 < i4 ? 6 : 0) : e3 === n3 ? (i4 - t3) / s3 + 2 : (t3 - e3) / s3 + 4;
          }(e2, i3, s2, h2, n2), r2 = 60 * r2 + 0.5), [0 | r2, l2 || 0, a2];
        }
        function zt(t2, e2, i3, s2) {
          return (Array.isArray(e2) ? t2(e2[0], e2[1], e2[2]) : t2(e2, i3, s2)).map(Mt);
        }
        function Ft(t2, e2, i3) {
          return zt(Lt, t2, e2, i3);
        }
        function Vt(t2) {
          return (t2 % 360 + 360) % 360;
        }
        function Bt(t2) {
          const e2 = Tt.exec(t2);
          let i3, s2 = 255;
          if (!e2)
            return;
          e2[5] !== i3 && (s2 = e2[6] ? vt(+e2[5]) : Mt(+e2[5]));
          const n2 = Vt(+e2[2]), o2 = +e2[3] / 100, a2 = +e2[4] / 100;
          return i3 = "hwb" === e2[1] ? function(t3, e3, i4) {
            return zt(Rt, t3, e3, i4);
          }(n2, o2, a2) : "hsv" === e2[1] ? function(t3, e3, i4) {
            return zt(Et, t3, e3, i4);
          }(n2, o2, a2) : Ft(n2, o2, a2), { r: i3[0], g: i3[1], b: i3[2], a: s2 };
        }
        const Wt = { x: "dark", Z: "light", Y: "re", X: "blu", W: "gr", V: "medium", U: "slate", A: "ee", T: "ol", S: "or", B: "ra", C: "lateg", D: "ights", R: "in", Q: "turquois", E: "hi", P: "ro", O: "al", N: "le", M: "de", L: "yello", F: "en", K: "ch", G: "arks", H: "ea", I: "ightg", J: "wh" }, Nt = { OiceXe: "f0f8ff", antiquewEte: "faebd7", aqua: "ffff", aquamarRe: "7fffd4", azuY: "f0ffff", beige: "f5f5dc", bisque: "ffe4c4", black: "0", blanKedOmond: "ffebcd", Xe: "ff", XeviTet: "8a2be2", bPwn: "a52a2a", burlywood: "deb887", caMtXe: "5f9ea0", KartYuse: "7fff00", KocTate: "d2691e", cSO: "ff7f50", cSnflowerXe: "6495ed", cSnsilk: "fff8dc", crimson: "dc143c", cyan: "ffff", xXe: "8b", xcyan: "8b8b", xgTMnPd: "b8860b", xWay: "a9a9a9", xgYF: "6400", xgYy: "a9a9a9", xkhaki: "bdb76b", xmagFta: "8b008b", xTivegYF: "556b2f", xSange: "ff8c00", xScEd: "9932cc", xYd: "8b0000", xsOmon: "e9967a", xsHgYF: "8fbc8f", xUXe: "483d8b", xUWay: "2f4f4f", xUgYy: "2f4f4f", xQe: "ced1", xviTet: "9400d3", dAppRk: "ff1493", dApskyXe: "bfff", dimWay: "696969", dimgYy: "696969", dodgerXe: "1e90ff", fiYbrick: "b22222", flSOwEte: "fffaf0", foYstWAn: "228b22", fuKsia: "ff00ff", gaRsbSo: "dcdcdc", ghostwEte: "f8f8ff", gTd: "ffd700", gTMnPd: "daa520", Way: "808080", gYF: "8000", gYFLw: "adff2f", gYy: "808080", honeyMw: "f0fff0", hotpRk: "ff69b4", RdianYd: "cd5c5c", Rdigo: "4b0082", ivSy: "fffff0", khaki: "f0e68c", lavFMr: "e6e6fa", lavFMrXsh: "fff0f5", lawngYF: "7cfc00", NmoncEffon: "fffacd", ZXe: "add8e6", ZcSO: "f08080", Zcyan: "e0ffff", ZgTMnPdLw: "fafad2", ZWay: "d3d3d3", ZgYF: "90ee90", ZgYy: "d3d3d3", ZpRk: "ffb6c1", ZsOmon: "ffa07a", ZsHgYF: "20b2aa", ZskyXe: "87cefa", ZUWay: "778899", ZUgYy: "778899", ZstAlXe: "b0c4de", ZLw: "ffffe0", lime: "ff00", limegYF: "32cd32", lRF: "faf0e6", magFta: "ff00ff", maPon: "800000", VaquamarRe: "66cdaa", VXe: "cd", VScEd: "ba55d3", VpurpN: "9370db", VsHgYF: "3cb371", VUXe: "7b68ee", VsprRggYF: "fa9a", VQe: "48d1cc", VviTetYd: "c71585", midnightXe: "191970", mRtcYam: "f5fffa", mistyPse: "ffe4e1", moccasR: "ffe4b5", navajowEte: "ffdead", navy: "80", Tdlace: "fdf5e6", Tive: "808000", TivedBb: "6b8e23", Sange: "ffa500", SangeYd: "ff4500", ScEd: "da70d6", pOegTMnPd: "eee8aa", pOegYF: "98fb98", pOeQe: "afeeee", pOeviTetYd: "db7093", papayawEp: "ffefd5", pHKpuff: "ffdab9", peru: "cd853f", pRk: "ffc0cb", plum: "dda0dd", powMrXe: "b0e0e6", purpN: "800080", YbeccapurpN: "663399", Yd: "ff0000", Psybrown: "bc8f8f", PyOXe: "4169e1", saddNbPwn: "8b4513", sOmon: "fa8072", sandybPwn: "f4a460", sHgYF: "2e8b57", sHshell: "fff5ee", siFna: "a0522d", silver: "c0c0c0", skyXe: "87ceeb", UXe: "6a5acd", UWay: "708090", UgYy: "708090", snow: "fffafa", sprRggYF: "ff7f", stAlXe: "4682b4", tan: "d2b48c", teO: "8080", tEstN: "d8bfd8", tomato: "ff6347", Qe: "40e0d0", viTet: "ee82ee", JHt: "f5deb3", wEte: "ffffff", wEtesmoke: "f5f5f5", Lw: "ffff00", LwgYF: "9acd32" };
        let Ht;
        function jt(t2) {
          Ht || (Ht = function() {
            const t3 = {}, e3 = Object.keys(Nt), i3 = Object.keys(Wt);
            let s2, n2, o2, a2, r2;
            for (s2 = 0; s2 < e3.length; s2++) {
              for (a2 = r2 = e3[s2], n2 = 0; n2 < i3.length; n2++)
                o2 = i3[n2], r2 = r2.replace(o2, Wt[o2]);
              o2 = parseInt(Nt[a2], 16), t3[r2] = [o2 >> 16 & 255, o2 >> 8 & 255, 255 & o2];
            }
            return t3;
          }(), Ht.transparent = [0, 0, 0, 0]);
          const e2 = Ht[t2.toLowerCase()];
          return e2 && { r: e2[0], g: e2[1], b: e2[2], a: 4 === e2.length ? e2[3] : 255 };
        }
        const $t = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
        const Yt = (t2) => t2 <= 31308e-7 ? 12.92 * t2 : 1.055 * Math.pow(t2, 1 / 2.4) - 0.055, Ut = (t2) => t2 <= 0.04045 ? t2 / 12.92 : Math.pow((t2 + 0.055) / 1.055, 2.4);
        function Xt(t2, e2, i3) {
          if (t2) {
            let s2 = It(t2);
            s2[e2] = Math.max(0, Math.min(s2[e2] + s2[e2] * i3, 0 === e2 ? 360 : 1)), s2 = Ft(s2), t2.r = s2[0], t2.g = s2[1], t2.b = s2[2];
          }
        }
        function qt(t2, e2) {
          return t2 ? Object.assign(e2 || {}, t2) : t2;
        }
        function Kt(t2) {
          var e2 = { r: 0, g: 0, b: 0, a: 255 };
          return Array.isArray(t2) ? t2.length >= 3 && (e2 = { r: t2[0], g: t2[1], b: t2[2], a: 255 }, t2.length > 3 && (e2.a = Mt(t2[3]))) : (e2 = qt(t2, { r: 0, g: 0, b: 0, a: 1 })).a = Mt(e2.a), e2;
        }
        function Gt(t2) {
          return "r" === t2.charAt(0) ? function(t3) {
            const e2 = $t.exec(t3);
            let i3, s2, n2, o2 = 255;
            if (e2) {
              if (e2[7] !== i3) {
                const t4 = +e2[7];
                o2 = e2[8] ? vt(t4) : yt(255 * t4, 0, 255);
              }
              return i3 = +e2[1], s2 = +e2[3], n2 = +e2[5], i3 = 255 & (e2[2] ? vt(i3) : yt(i3, 0, 255)), s2 = 255 & (e2[4] ? vt(s2) : yt(s2, 0, 255)), n2 = 255 & (e2[6] ? vt(n2) : yt(n2, 0, 255)), { r: i3, g: s2, b: n2, a: o2 };
            }
          }(t2) : Bt(t2);
        }
        class Zt {
          constructor(t2) {
            if (t2 instanceof Zt)
              return t2;
            const e2 = typeof t2;
            let i3;
            var s2, n2, o2;
            "object" === e2 ? i3 = Kt(t2) : "string" === e2 && (o2 = (s2 = t2).length, "#" === s2[0] && (4 === o2 || 5 === o2 ? n2 = { r: 255 & 17 * St[s2[1]], g: 255 & 17 * St[s2[2]], b: 255 & 17 * St[s2[3]], a: 5 === o2 ? 17 * St[s2[4]] : 255 } : 7 !== o2 && 9 !== o2 || (n2 = { r: St[s2[1]] << 4 | St[s2[2]], g: St[s2[3]] << 4 | St[s2[4]], b: St[s2[5]] << 4 | St[s2[6]], a: 9 === o2 ? St[s2[7]] << 4 | St[s2[8]] : 255 })), i3 = n2 || jt(t2) || Gt(t2)), this._rgb = i3, this._valid = !!i3;
          }
          get valid() {
            return this._valid;
          }
          get rgb() {
            var t2 = qt(this._rgb);
            return t2 && (t2.a = wt(t2.a)), t2;
          }
          set rgb(t2) {
            this._rgb = Kt(t2);
          }
          rgbString() {
            return this._valid ? (t2 = this._rgb) && (t2.a < 255 ? `rgba(${t2.r}, ${t2.g}, ${t2.b}, ${wt(t2.a)})` : `rgb(${t2.r}, ${t2.g}, ${t2.b})`) : void 0;
            var t2;
          }
          hexString() {
            return this._valid ? At(this._rgb) : void 0;
          }
          hslString() {
            return this._valid ? function(t2) {
              if (!t2)
                return;
              const e2 = It(t2), i3 = e2[0], s2 = kt(e2[1]), n2 = kt(e2[2]);
              return t2.a < 255 ? `hsla(${i3}, ${s2}%, ${n2}%, ${wt(t2.a)})` : `hsl(${i3}, ${s2}%, ${n2}%)`;
            }(this._rgb) : void 0;
          }
          mix(t2, e2) {
            if (t2) {
              const i3 = this.rgb, s2 = t2.rgb;
              let n2;
              const o2 = e2 === n2 ? 0.5 : e2, a2 = 2 * o2 - 1, r2 = i3.a - s2.a, l2 = ((a2 * r2 == -1 ? a2 : (a2 + r2) / (1 + a2 * r2)) + 1) / 2;
              n2 = 1 - l2, i3.r = 255 & l2 * i3.r + n2 * s2.r + 0.5, i3.g = 255 & l2 * i3.g + n2 * s2.g + 0.5, i3.b = 255 & l2 * i3.b + n2 * s2.b + 0.5, i3.a = o2 * i3.a + (1 - o2) * s2.a, this.rgb = i3;
            }
            return this;
          }
          interpolate(t2, e2) {
            return t2 && (this._rgb = function(t3, e3, i3) {
              const s2 = Ut(wt(t3.r)), n2 = Ut(wt(t3.g)), o2 = Ut(wt(t3.b));
              return { r: Mt(Yt(s2 + i3 * (Ut(wt(e3.r)) - s2))), g: Mt(Yt(n2 + i3 * (Ut(wt(e3.g)) - n2))), b: Mt(Yt(o2 + i3 * (Ut(wt(e3.b)) - o2))), a: t3.a + i3 * (e3.a - t3.a) };
            }(this._rgb, t2._rgb, e2)), this;
          }
          clone() {
            return new Zt(this.rgb);
          }
          alpha(t2) {
            return this._rgb.a = Mt(t2), this;
          }
          clearer(t2) {
            return this._rgb.a *= 1 - t2, this;
          }
          greyscale() {
            const t2 = this._rgb, e2 = _t(0.3 * t2.r + 0.59 * t2.g + 0.11 * t2.b);
            return t2.r = t2.g = t2.b = e2, this;
          }
          opaquer(t2) {
            return this._rgb.a *= 1 + t2, this;
          }
          negate() {
            const t2 = this._rgb;
            return t2.r = 255 - t2.r, t2.g = 255 - t2.g, t2.b = 255 - t2.b, this;
          }
          lighten(t2) {
            return Xt(this._rgb, 2, t2), this;
          }
          darken(t2) {
            return Xt(this._rgb, 2, -t2), this;
          }
          saturate(t2) {
            return Xt(this._rgb, 1, t2), this;
          }
          desaturate(t2) {
            return Xt(this._rgb, 1, -t2), this;
          }
          rotate(t2) {
            return function(t3, e2) {
              var i3 = It(t3);
              i3[0] = Vt(i3[0] + e2), i3 = Ft(i3), t3.r = i3[0], t3.g = i3[1], t3.b = i3[2];
            }(this._rgb, t2), this;
          }
        }
        function Jt(t2) {
          if (t2 && "object" == typeof t2) {
            const e2 = t2.toString();
            return "[object CanvasPattern]" === e2 || "[object CanvasGradient]" === e2;
          }
          return false;
        }
        function Qt(t2) {
          return Jt(t2) ? t2 : new Zt(t2);
        }
        function te(t2) {
          return Jt(t2) ? t2 : new Zt(t2).saturate(0.5).darken(0.1).hexString();
        }
        const ee = ["x", "y", "borderWidth", "radius", "tension"], ie = ["color", "borderColor", "backgroundColor"];
        const se = /* @__PURE__ */ new Map();
        function ne(t2, e2, i3) {
          return function(t3, e3) {
            e3 = e3 || {};
            const i4 = t3 + JSON.stringify(e3);
            let s2 = se.get(i4);
            return s2 || (s2 = new Intl.NumberFormat(t3, e3), se.set(i4, s2)), s2;
          }(e2, i3).format(t2);
        }
        const oe = { values: (t2) => n(t2) ? t2 : "" + t2, numeric(t2, e2, i3) {
          if (0 === t2)
            return "0";
          const s2 = this.chart.options.locale;
          let n2, o2 = t2;
          if (i3.length > 1) {
            const e3 = Math.max(Math.abs(i3[0].value), Math.abs(i3[i3.length - 1].value));
            (e3 < 1e-4 || e3 > 1e15) && (n2 = "scientific"), o2 = function(t3, e4) {
              let i4 = e4.length > 3 ? e4[2].value - e4[1].value : e4[1].value - e4[0].value;
              Math.abs(i4) >= 1 && t3 !== Math.floor(t3) && (i4 = t3 - Math.floor(t3));
              return i4;
            }(t2, i3);
          }
          const a2 = z(Math.abs(o2)), r2 = isNaN(a2) ? 1 : Math.max(Math.min(-1 * Math.floor(a2), 20), 0), l2 = { notation: n2, minimumFractionDigits: r2, maximumFractionDigits: r2 };
          return Object.assign(l2, this.options.ticks.format), ne(t2, s2, l2);
        }, logarithmic(t2, e2, i3) {
          if (0 === t2)
            return "0";
          const s2 = i3[e2].significand || t2 / Math.pow(10, Math.floor(z(t2)));
          return [1, 2, 3, 5, 10, 15].includes(s2) || e2 > 0.8 * i3.length ? oe.numeric.call(this, t2, e2, i3) : "";
        } };
        var ae = { formatters: oe };
        const re = /* @__PURE__ */ Object.create(null), le = /* @__PURE__ */ Object.create(null);
        function he(t2, e2) {
          if (!e2)
            return t2;
          const i3 = e2.split(".");
          for (let e3 = 0, s2 = i3.length; e3 < s2; ++e3) {
            const s3 = i3[e3];
            t2 = t2[s3] || (t2[s3] = /* @__PURE__ */ Object.create(null));
          }
          return t2;
        }
        function ce(t2, e2, i3) {
          return "string" == typeof e2 ? x(he(t2, e2), i3) : x(he(t2, ""), e2);
        }
        class de {
          constructor(t2, e2) {
            this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (t3) => t3.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = ["mousemove", "mouseout", "click", "touchstart", "touchmove"], this.font = { family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", size: 12, style: "normal", lineHeight: 1.2, weight: null }, this.hover = {}, this.hoverBackgroundColor = (t3, e3) => te(e3.backgroundColor), this.hoverBorderColor = (t3, e3) => te(e3.borderColor), this.hoverColor = (t3, e3) => te(e3.color), this.indexAxis = "x", this.interaction = { mode: "nearest", intersect: true, includeInvisible: false }, this.maintainAspectRatio = true, this.onHover = null, this.onClick = null, this.parsing = true, this.plugins = {}, this.responsive = true, this.scale = void 0, this.scales = {}, this.showLine = true, this.drawActiveElementsOnTop = true, this.describe(t2), this.apply(e2);
          }
          set(t2, e2) {
            return ce(this, t2, e2);
          }
          get(t2) {
            return he(this, t2);
          }
          describe(t2, e2) {
            return ce(le, t2, e2);
          }
          override(t2, e2) {
            return ce(re, t2, e2);
          }
          route(t2, e2, i3, s2) {
            const n2 = he(this, t2), a2 = he(this, i3), r2 = "_" + e2;
            Object.defineProperties(n2, { [r2]: { value: n2[e2], writable: true }, [e2]: { enumerable: true, get() {
              const t3 = this[r2], e3 = a2[s2];
              return o(t3) ? Object.assign({}, e3, t3) : l(t3, e3);
            }, set(t3) {
              this[r2] = t3;
            } } });
          }
          apply(t2) {
            t2.forEach((t3) => t3(this));
          }
        }
        var ue = new de({ _scriptable: (t2) => !t2.startsWith("on"), _indexable: (t2) => "events" !== t2, hover: { _fallback: "interaction" }, interaction: { _scriptable: false, _indexable: false } }, [function(t2) {
          t2.set("animation", { delay: void 0, duration: 1e3, easing: "easeOutQuart", fn: void 0, from: void 0, loop: void 0, to: void 0, type: void 0 }), t2.describe("animation", { _fallback: false, _indexable: false, _scriptable: (t3) => "onProgress" !== t3 && "onComplete" !== t3 && "fn" !== t3 }), t2.set("animations", { colors: { type: "color", properties: ie }, numbers: { type: "number", properties: ee } }), t2.describe("animations", { _fallback: "animation" }), t2.set("transitions", { active: { animation: { duration: 400 } }, resize: { animation: { duration: 0 } }, show: { animations: { colors: { from: "transparent" }, visible: { type: "boolean", duration: 0 } } }, hide: { animations: { colors: { to: "transparent" }, visible: { type: "boolean", easing: "linear", fn: (t3) => 0 | t3 } } } });
        }, function(t2) {
          t2.set("layout", { autoPadding: true, padding: { top: 0, right: 0, bottom: 0, left: 0 } });
        }, function(t2) {
          t2.set("scale", { display: true, offset: false, reverse: false, beginAtZero: false, bounds: "ticks", clip: true, grace: 0, grid: { display: true, lineWidth: 1, drawOnChartArea: true, drawTicks: true, tickLength: 8, tickWidth: (t3, e2) => e2.lineWidth, tickColor: (t3, e2) => e2.color, offset: false }, border: { display: true, dash: [], dashOffset: 0, width: 1 }, title: { display: false, text: "", padding: { top: 4, bottom: 4 } }, ticks: { minRotation: 0, maxRotation: 50, mirror: false, textStrokeWidth: 0, textStrokeColor: "", padding: 3, display: true, autoSkip: true, autoSkipPadding: 3, labelOffset: 0, callback: ae.formatters.values, minor: {}, major: {}, align: "center", crossAlign: "near", showLabelBackdrop: false, backdropColor: "rgba(255, 255, 255, 0.75)", backdropPadding: 2 } }), t2.route("scale.ticks", "color", "", "color"), t2.route("scale.grid", "color", "", "borderColor"), t2.route("scale.border", "color", "", "borderColor"), t2.route("scale.title", "color", "", "color"), t2.describe("scale", { _fallback: false, _scriptable: (t3) => !t3.startsWith("before") && !t3.startsWith("after") && "callback" !== t3 && "parser" !== t3, _indexable: (t3) => "borderDash" !== t3 && "tickBorderDash" !== t3 && "dash" !== t3 }), t2.describe("scales", { _fallback: "scale" }), t2.describe("scale.ticks", { _scriptable: (t3) => "backdropPadding" !== t3 && "callback" !== t3, _indexable: (t3) => "backdropPadding" !== t3 });
        }]);
        function fe() {
          return "undefined" != typeof window && "undefined" != typeof document;
        }
        function ge(t2) {
          let e2 = t2.parentNode;
          return e2 && "[object ShadowRoot]" === e2.toString() && (e2 = e2.host), e2;
        }
        function pe(t2, e2, i3) {
          let s2;
          return "string" == typeof t2 ? (s2 = parseInt(t2, 10), -1 !== t2.indexOf("%") && (s2 = s2 / 100 * e2.parentNode[i3])) : s2 = t2, s2;
        }
        const me = (t2) => t2.ownerDocument.defaultView.getComputedStyle(t2, null);
        function xe(t2, e2) {
          return me(t2).getPropertyValue(e2);
        }
        const be = ["top", "right", "bottom", "left"];
        function _e(t2, e2, i3) {
          const s2 = {};
          i3 = i3 ? "-" + i3 : "";
          for (let n2 = 0; n2 < 4; n2++) {
            const o2 = be[n2];
            s2[o2] = parseFloat(t2[e2 + "-" + o2 + i3]) || 0;
          }
          return s2.width = s2.left + s2.right, s2.height = s2.top + s2.bottom, s2;
        }
        const ye = (t2, e2, i3) => (t2 > 0 || e2 > 0) && (!i3 || !i3.shadowRoot);
        function ve(t2, e2) {
          if ("native" in t2)
            return t2;
          const { canvas: i3, currentDevicePixelRatio: s2 } = e2, n2 = me(i3), o2 = "border-box" === n2.boxSizing, a2 = _e(n2, "padding"), r2 = _e(n2, "border", "width"), { x: l2, y: h2, box: c2 } = function(t3, e3) {
            const i4 = t3.touches, s3 = i4 && i4.length ? i4[0] : t3, { offsetX: n3, offsetY: o3 } = s3;
            let a3, r3, l3 = false;
            if (ye(n3, o3, t3.target))
              a3 = n3, r3 = o3;
            else {
              const t4 = e3.getBoundingClientRect();
              a3 = s3.clientX - t4.left, r3 = s3.clientY - t4.top, l3 = true;
            }
            return { x: a3, y: r3, box: l3 };
          }(t2, i3), d2 = a2.left + (c2 && r2.left), u2 = a2.top + (c2 && r2.top);
          let { width: f2, height: g2 } = e2;
          return o2 && (f2 -= a2.width + r2.width, g2 -= a2.height + r2.height), { x: Math.round((l2 - d2) / f2 * i3.width / s2), y: Math.round((h2 - u2) / g2 * i3.height / s2) };
        }
        const Me = (t2) => Math.round(10 * t2) / 10;
        function we(t2, e2, i3, s2) {
          const n2 = me(t2), o2 = _e(n2, "margin"), a2 = pe(n2.maxWidth, t2, "clientWidth") || T, r2 = pe(n2.maxHeight, t2, "clientHeight") || T, l2 = function(t3, e3, i4) {
            let s3, n3;
            if (void 0 === e3 || void 0 === i4) {
              const o3 = t3 && ge(t3);
              if (o3) {
                const t4 = o3.getBoundingClientRect(), a3 = me(o3), r3 = _e(a3, "border", "width"), l3 = _e(a3, "padding");
                e3 = t4.width - l3.width - r3.width, i4 = t4.height - l3.height - r3.height, s3 = pe(a3.maxWidth, o3, "clientWidth"), n3 = pe(a3.maxHeight, o3, "clientHeight");
              } else
                e3 = t3.clientWidth, i4 = t3.clientHeight;
            }
            return { width: e3, height: i4, maxWidth: s3 || T, maxHeight: n3 || T };
          }(t2, e2, i3);
          let { width: h2, height: c2 } = l2;
          if ("content-box" === n2.boxSizing) {
            const t3 = _e(n2, "border", "width"), e3 = _e(n2, "padding");
            h2 -= e3.width + t3.width, c2 -= e3.height + t3.height;
          }
          h2 = Math.max(0, h2 - o2.width), c2 = Math.max(0, s2 ? h2 / s2 : c2 - o2.height), h2 = Me(Math.min(h2, a2, l2.maxWidth)), c2 = Me(Math.min(c2, r2, l2.maxHeight)), h2 && !c2 && (c2 = Me(h2 / 2));
          return (void 0 !== e2 || void 0 !== i3) && s2 && l2.height && c2 > l2.height && (c2 = l2.height, h2 = Me(Math.floor(c2 * s2))), { width: h2, height: c2 };
        }
        function ke(t2, e2, i3) {
          const s2 = e2 || 1, n2 = Math.floor(t2.height * s2), o2 = Math.floor(t2.width * s2);
          t2.height = Math.floor(t2.height), t2.width = Math.floor(t2.width);
          const a2 = t2.canvas;
          return a2.style && (i3 || !a2.style.height && !a2.style.width) && (a2.style.height = `${t2.height}px`, a2.style.width = `${t2.width}px`), (t2.currentDevicePixelRatio !== s2 || a2.height !== n2 || a2.width !== o2) && (t2.currentDevicePixelRatio = s2, a2.height = n2, a2.width = o2, t2.ctx.setTransform(s2, 0, 0, s2, 0, 0), true);
        }
        const Se = function() {
          let t2 = false;
          try {
            const e2 = { get passive() {
              return t2 = true, false;
            } };
            fe() && (window.addEventListener("test", null, e2), window.removeEventListener("test", null, e2));
          } catch (t3) {
          }
          return t2;
        }();
        function Pe(t2, e2) {
          const i3 = xe(t2, e2), s2 = i3 && i3.match(/^(\d+)(\.\d+)?px$/);
          return s2 ? +s2[1] : void 0;
        }
        function De(t2) {
          return !t2 || s(t2.size) || s(t2.family) ? null : (t2.style ? t2.style + " " : "") + (t2.weight ? t2.weight + " " : "") + t2.size + "px " + t2.family;
        }
        function Ce(t2, e2, i3, s2, n2) {
          let o2 = e2[n2];
          return o2 || (o2 = e2[n2] = t2.measureText(n2).width, i3.push(n2)), o2 > s2 && (s2 = o2), s2;
        }
        function Oe(t2, e2, i3, s2) {
          let o2 = (s2 = s2 || {}).data = s2.data || {}, a2 = s2.garbageCollect = s2.garbageCollect || [];
          s2.font !== e2 && (o2 = s2.data = {}, a2 = s2.garbageCollect = [], s2.font = e2), t2.save(), t2.font = e2;
          let r2 = 0;
          const l2 = i3.length;
          let h2, c2, d2, u2, f2;
          for (h2 = 0; h2 < l2; h2++)
            if (u2 = i3[h2], null == u2 || n(u2)) {
              if (n(u2))
                for (c2 = 0, d2 = u2.length; c2 < d2; c2++)
                  f2 = u2[c2], null == f2 || n(f2) || (r2 = Ce(t2, o2, a2, r2, f2));
            } else
              r2 = Ce(t2, o2, a2, r2, u2);
          t2.restore();
          const g2 = a2.length / 2;
          if (g2 > i3.length) {
            for (h2 = 0; h2 < g2; h2++)
              delete o2[a2[h2]];
            a2.splice(0, g2);
          }
          return r2;
        }
        function Ae(t2, e2, i3) {
          const s2 = t2.currentDevicePixelRatio, n2 = 0 !== i3 ? Math.max(i3 / 2, 0.5) : 0;
          return Math.round((e2 - n2) * s2) / s2 + n2;
        }
        function Te(t2, e2) {
          (e2 || t2) && ((e2 = e2 || t2.getContext("2d")).save(), e2.resetTransform(), e2.clearRect(0, 0, t2.width, t2.height), e2.restore());
        }
        function Le(t2, e2, i3, s2) {
          Ee(t2, e2, i3, s2, null);
        }
        function Ee(t2, e2, i3, s2, n2) {
          let o2, a2, r2, l2, h2, c2, d2, u2;
          const f2 = e2.pointStyle, g2 = e2.rotation, p2 = e2.radius;
          let m2 = (g2 || 0) * L;
          if (f2 && "object" == typeof f2 && (o2 = f2.toString(), "[object HTMLImageElement]" === o2 || "[object HTMLCanvasElement]" === o2))
            return t2.save(), t2.translate(i3, s2), t2.rotate(m2), t2.drawImage(f2, -f2.width / 2, -f2.height / 2, f2.width, f2.height), void t2.restore();
          if (!(isNaN(p2) || p2 <= 0)) {
            switch (t2.beginPath(), f2) {
              default:
                n2 ? t2.ellipse(i3, s2, n2 / 2, p2, 0, 0, O) : t2.arc(i3, s2, p2, 0, O), t2.closePath();
                break;
              case "triangle":
                c2 = n2 ? n2 / 2 : p2, t2.moveTo(i3 + Math.sin(m2) * c2, s2 - Math.cos(m2) * p2), m2 += I, t2.lineTo(i3 + Math.sin(m2) * c2, s2 - Math.cos(m2) * p2), m2 += I, t2.lineTo(i3 + Math.sin(m2) * c2, s2 - Math.cos(m2) * p2), t2.closePath();
                break;
              case "rectRounded":
                h2 = 0.516 * p2, l2 = p2 - h2, a2 = Math.cos(m2 + R) * l2, d2 = Math.cos(m2 + R) * (n2 ? n2 / 2 - h2 : l2), r2 = Math.sin(m2 + R) * l2, u2 = Math.sin(m2 + R) * (n2 ? n2 / 2 - h2 : l2), t2.arc(i3 - d2, s2 - r2, h2, m2 - C, m2 - E), t2.arc(i3 + u2, s2 - a2, h2, m2 - E, m2), t2.arc(i3 + d2, s2 + r2, h2, m2, m2 + E), t2.arc(i3 - u2, s2 + a2, h2, m2 + E, m2 + C), t2.closePath();
                break;
              case "rect":
                if (!g2) {
                  l2 = Math.SQRT1_2 * p2, c2 = n2 ? n2 / 2 : l2, t2.rect(i3 - c2, s2 - l2, 2 * c2, 2 * l2);
                  break;
                }
                m2 += R;
              case "rectRot":
                d2 = Math.cos(m2) * (n2 ? n2 / 2 : p2), a2 = Math.cos(m2) * p2, r2 = Math.sin(m2) * p2, u2 = Math.sin(m2) * (n2 ? n2 / 2 : p2), t2.moveTo(i3 - d2, s2 - r2), t2.lineTo(i3 + u2, s2 - a2), t2.lineTo(i3 + d2, s2 + r2), t2.lineTo(i3 - u2, s2 + a2), t2.closePath();
                break;
              case "crossRot":
                m2 += R;
              case "cross":
                d2 = Math.cos(m2) * (n2 ? n2 / 2 : p2), a2 = Math.cos(m2) * p2, r2 = Math.sin(m2) * p2, u2 = Math.sin(m2) * (n2 ? n2 / 2 : p2), t2.moveTo(i3 - d2, s2 - r2), t2.lineTo(i3 + d2, s2 + r2), t2.moveTo(i3 + u2, s2 - a2), t2.lineTo(i3 - u2, s2 + a2);
                break;
              case "star":
                d2 = Math.cos(m2) * (n2 ? n2 / 2 : p2), a2 = Math.cos(m2) * p2, r2 = Math.sin(m2) * p2, u2 = Math.sin(m2) * (n2 ? n2 / 2 : p2), t2.moveTo(i3 - d2, s2 - r2), t2.lineTo(i3 + d2, s2 + r2), t2.moveTo(i3 + u2, s2 - a2), t2.lineTo(i3 - u2, s2 + a2), m2 += R, d2 = Math.cos(m2) * (n2 ? n2 / 2 : p2), a2 = Math.cos(m2) * p2, r2 = Math.sin(m2) * p2, u2 = Math.sin(m2) * (n2 ? n2 / 2 : p2), t2.moveTo(i3 - d2, s2 - r2), t2.lineTo(i3 + d2, s2 + r2), t2.moveTo(i3 + u2, s2 - a2), t2.lineTo(i3 - u2, s2 + a2);
                break;
              case "line":
                a2 = n2 ? n2 / 2 : Math.cos(m2) * p2, r2 = Math.sin(m2) * p2, t2.moveTo(i3 - a2, s2 - r2), t2.lineTo(i3 + a2, s2 + r2);
                break;
              case "dash":
                t2.moveTo(i3, s2), t2.lineTo(i3 + Math.cos(m2) * (n2 ? n2 / 2 : p2), s2 + Math.sin(m2) * p2);
                break;
              case false:
                t2.closePath();
            }
            t2.fill(), e2.borderWidth > 0 && t2.stroke();
          }
        }
        function Re(t2, e2, i3) {
          return i3 = i3 || 0.5, !e2 || t2 && t2.x > e2.left - i3 && t2.x < e2.right + i3 && t2.y > e2.top - i3 && t2.y < e2.bottom + i3;
        }
        function Ie(t2, e2) {
          t2.save(), t2.beginPath(), t2.rect(e2.left, e2.top, e2.right - e2.left, e2.bottom - e2.top), t2.clip();
        }
        function ze(t2) {
          t2.restore();
        }
        function Fe(t2, e2, i3, s2, n2) {
          if (!e2)
            return t2.lineTo(i3.x, i3.y);
          if ("middle" === n2) {
            const s3 = (e2.x + i3.x) / 2;
            t2.lineTo(s3, e2.y), t2.lineTo(s3, i3.y);
          } else
            "after" === n2 != !!s2 ? t2.lineTo(e2.x, i3.y) : t2.lineTo(i3.x, e2.y);
          t2.lineTo(i3.x, i3.y);
        }
        function Ve(t2, e2, i3, s2) {
          if (!e2)
            return t2.lineTo(i3.x, i3.y);
          t2.bezierCurveTo(s2 ? e2.cp1x : e2.cp2x, s2 ? e2.cp1y : e2.cp2y, s2 ? i3.cp2x : i3.cp1x, s2 ? i3.cp2y : i3.cp1y, i3.x, i3.y);
        }
        function Be(t2, e2, i3, s2, n2) {
          if (n2.strikethrough || n2.underline) {
            const o2 = t2.measureText(s2), a2 = e2 - o2.actualBoundingBoxLeft, r2 = e2 + o2.actualBoundingBoxRight, l2 = i3 - o2.actualBoundingBoxAscent, h2 = i3 + o2.actualBoundingBoxDescent, c2 = n2.strikethrough ? (l2 + h2) / 2 : h2;
            t2.strokeStyle = t2.fillStyle, t2.beginPath(), t2.lineWidth = n2.decorationWidth || 2, t2.moveTo(a2, c2), t2.lineTo(r2, c2), t2.stroke();
          }
        }
        function We(t2, e2) {
          const i3 = t2.fillStyle;
          t2.fillStyle = e2.color, t2.fillRect(e2.left, e2.top, e2.width, e2.height), t2.fillStyle = i3;
        }
        function Ne(t2, e2, i3, o2, a2, r2 = {}) {
          const l2 = n(e2) ? e2 : [e2], h2 = r2.strokeWidth > 0 && "" !== r2.strokeColor;
          let c2, d2;
          for (t2.save(), t2.font = a2.string, function(t3, e3) {
            e3.translation && t3.translate(e3.translation[0], e3.translation[1]), s(e3.rotation) || t3.rotate(e3.rotation), e3.color && (t3.fillStyle = e3.color), e3.textAlign && (t3.textAlign = e3.textAlign), e3.textBaseline && (t3.textBaseline = e3.textBaseline);
          }(t2, r2), c2 = 0; c2 < l2.length; ++c2)
            d2 = l2[c2], r2.backdrop && We(t2, r2.backdrop), h2 && (r2.strokeColor && (t2.strokeStyle = r2.strokeColor), s(r2.strokeWidth) || (t2.lineWidth = r2.strokeWidth), t2.strokeText(d2, i3, o2, r2.maxWidth)), t2.fillText(d2, i3, o2, r2.maxWidth), Be(t2, i3, o2, d2, r2), o2 += Number(a2.lineHeight);
          t2.restore();
        }
        function He(t2, e2) {
          const { x: i3, y: s2, w: n2, h: o2, radius: a2 } = e2;
          t2.arc(i3 + a2.topLeft, s2 + a2.topLeft, a2.topLeft, 1.5 * C, C, true), t2.lineTo(i3, s2 + o2 - a2.bottomLeft), t2.arc(i3 + a2.bottomLeft, s2 + o2 - a2.bottomLeft, a2.bottomLeft, C, E, true), t2.lineTo(i3 + n2 - a2.bottomRight, s2 + o2), t2.arc(i3 + n2 - a2.bottomRight, s2 + o2 - a2.bottomRight, a2.bottomRight, E, 0, true), t2.lineTo(i3 + n2, s2 + a2.topRight), t2.arc(i3 + n2 - a2.topRight, s2 + a2.topRight, a2.topRight, 0, -E, true), t2.lineTo(i3 + a2.topLeft, s2);
        }
        function je(t2, e2 = [""], i3, s2, n2 = () => t2[0]) {
          const o2 = i3 || t2;
          void 0 === s2 && (s2 = ti("_fallback", t2));
          const a2 = { [Symbol.toStringTag]: "Object", _cacheable: true, _scopes: t2, _rootScopes: o2, _fallback: s2, _getTarget: n2, override: (i4) => je([i4, ...t2], e2, o2, s2) };
          return new Proxy(a2, { deleteProperty: (e3, i4) => (delete e3[i4], delete e3._keys, delete t2[0][i4], true), get: (i4, s3) => qe(i4, s3, () => function(t3, e3, i5, s4) {
            let n3;
            for (const o3 of e3)
              if (n3 = ti(Ue(o3, t3), i5), void 0 !== n3)
                return Xe(t3, n3) ? Je(i5, s4, t3, n3) : n3;
          }(s3, e2, t2, i4)), getOwnPropertyDescriptor: (t3, e3) => Reflect.getOwnPropertyDescriptor(t3._scopes[0], e3), getPrototypeOf: () => Reflect.getPrototypeOf(t2[0]), has: (t3, e3) => ei(t3).includes(e3), ownKeys: (t3) => ei(t3), set(t3, e3, i4) {
            const s3 = t3._storage || (t3._storage = n2());
            return t3[e3] = s3[e3] = i4, delete t3._keys, true;
          } });
        }
        function $e(t2, e2, i3, s2) {
          const a2 = { _cacheable: false, _proxy: t2, _context: e2, _subProxy: i3, _stack: /* @__PURE__ */ new Set(), _descriptors: Ye(t2, s2), setContext: (e3) => $e(t2, e3, i3, s2), override: (n2) => $e(t2.override(n2), e2, i3, s2) };
          return new Proxy(a2, { deleteProperty: (e3, i4) => (delete e3[i4], delete t2[i4], true), get: (t3, e3, i4) => qe(t3, e3, () => function(t4, e4, i5) {
            const { _proxy: s3, _context: a3, _subProxy: r2, _descriptors: l2 } = t4;
            let h2 = s3[e4];
            S(h2) && l2.isScriptable(e4) && (h2 = function(t5, e5, i6, s4) {
              const { _proxy: n2, _context: o2, _subProxy: a4, _stack: r3 } = i6;
              if (r3.has(t5))
                throw new Error("Recursion detected: " + Array.from(r3).join("->") + "->" + t5);
              r3.add(t5);
              let l3 = e5(o2, a4 || s4);
              r3.delete(t5), Xe(t5, l3) && (l3 = Je(n2._scopes, n2, t5, l3));
              return l3;
            }(e4, h2, t4, i5));
            n(h2) && h2.length && (h2 = function(t5, e5, i6, s4) {
              const { _proxy: n2, _context: a4, _subProxy: r3, _descriptors: l3 } = i6;
              if (void 0 !== a4.index && s4(t5))
                return e5[a4.index % e5.length];
              if (o(e5[0])) {
                const i7 = e5, s5 = n2._scopes.filter((t6) => t6 !== i7);
                e5 = [];
                for (const o2 of i7) {
                  const i8 = Je(s5, n2, t5, o2);
                  e5.push($e(i8, a4, r3 && r3[t5], l3));
                }
              }
              return e5;
            }(e4, h2, t4, l2.isIndexable));
            Xe(e4, h2) && (h2 = $e(h2, a3, r2 && r2[e4], l2));
            return h2;
          }(t3, e3, i4)), getOwnPropertyDescriptor: (e3, i4) => e3._descriptors.allKeys ? Reflect.has(t2, i4) ? { enumerable: true, configurable: true } : void 0 : Reflect.getOwnPropertyDescriptor(t2, i4), getPrototypeOf: () => Reflect.getPrototypeOf(t2), has: (e3, i4) => Reflect.has(t2, i4), ownKeys: () => Reflect.ownKeys(t2), set: (e3, i4, s3) => (t2[i4] = s3, delete e3[i4], true) });
        }
        function Ye(t2, e2 = { scriptable: true, indexable: true }) {
          const { _scriptable: i3 = e2.scriptable, _indexable: s2 = e2.indexable, _allKeys: n2 = e2.allKeys } = t2;
          return { allKeys: n2, scriptable: i3, indexable: s2, isScriptable: S(i3) ? i3 : () => i3, isIndexable: S(s2) ? s2 : () => s2 };
        }
        const Ue = (t2, e2) => t2 ? t2 + w(e2) : e2, Xe = (t2, e2) => o(e2) && "adapters" !== t2 && (null === Object.getPrototypeOf(e2) || e2.constructor === Object);
        function qe(t2, e2, i3) {
          if (Object.prototype.hasOwnProperty.call(t2, e2) || "constructor" === e2)
            return t2[e2];
          const s2 = i3();
          return t2[e2] = s2, s2;
        }
        function Ke(t2, e2, i3) {
          return S(t2) ? t2(e2, i3) : t2;
        }
        const Ge = (t2, e2) => true === t2 ? e2 : "string" == typeof t2 ? M(e2, t2) : void 0;
        function Ze(t2, e2, i3, s2, n2) {
          for (const o2 of e2) {
            const e3 = Ge(i3, o2);
            if (e3) {
              t2.add(e3);
              const o3 = Ke(e3._fallback, i3, n2);
              if (void 0 !== o3 && o3 !== i3 && o3 !== s2)
                return o3;
            } else if (false === e3 && void 0 !== s2 && i3 !== s2)
              return null;
          }
          return false;
        }
        function Je(t2, e2, i3, s2) {
          const a2 = e2._rootScopes, r2 = Ke(e2._fallback, i3, s2), l2 = [...t2, ...a2], h2 = /* @__PURE__ */ new Set();
          h2.add(s2);
          let c2 = Qe(h2, l2, i3, r2 || i3, s2);
          return null !== c2 && ((void 0 === r2 || r2 === i3 || (c2 = Qe(h2, l2, r2, c2, s2), null !== c2)) && je(Array.from(h2), [""], a2, r2, () => function(t3, e3, i4) {
            const s3 = t3._getTarget();
            e3 in s3 || (s3[e3] = {});
            const a3 = s3[e3];
            if (n(a3) && o(i4))
              return i4;
            return a3 || {};
          }(e2, i3, s2)));
        }
        function Qe(t2, e2, i3, s2, n2) {
          for (; i3; )
            i3 = Ze(t2, e2, i3, s2, n2);
          return i3;
        }
        function ti(t2, e2) {
          for (const i3 of e2) {
            if (!i3)
              continue;
            const e3 = i3[t2];
            if (void 0 !== e3)
              return e3;
          }
        }
        function ei(t2) {
          let e2 = t2._keys;
          return e2 || (e2 = t2._keys = function(t3) {
            const e3 = /* @__PURE__ */ new Set();
            for (const i3 of t3)
              for (const t4 of Object.keys(i3).filter((t5) => !t5.startsWith("_")))
                e3.add(t4);
            return Array.from(e3);
          }(t2._scopes)), e2;
        }
        function ii(t2, e2, i3, s2) {
          const { iScale: n2 } = t2, { key: o2 = "r" } = this._parsing, a2 = new Array(s2);
          let r2, l2, h2, c2;
          for (r2 = 0, l2 = s2; r2 < l2; ++r2)
            h2 = r2 + i3, c2 = e2[h2], a2[r2] = { r: n2.parse(M(c2, o2), h2) };
          return a2;
        }
        const si = Number.EPSILON || 1e-14, ni = (t2, e2) => e2 < t2.length && !t2[e2].skip && t2[e2], oi = (t2) => "x" === t2 ? "y" : "x";
        function ai(t2, e2, i3, s2) {
          const n2 = t2.skip ? e2 : t2, o2 = e2, a2 = i3.skip ? e2 : i3, r2 = q(o2, n2), l2 = q(a2, o2);
          let h2 = r2 / (r2 + l2), c2 = l2 / (r2 + l2);
          h2 = isNaN(h2) ? 0 : h2, c2 = isNaN(c2) ? 0 : c2;
          const d2 = s2 * h2, u2 = s2 * c2;
          return { previous: { x: o2.x - d2 * (a2.x - n2.x), y: o2.y - d2 * (a2.y - n2.y) }, next: { x: o2.x + u2 * (a2.x - n2.x), y: o2.y + u2 * (a2.y - n2.y) } };
        }
        function ri(t2, e2 = "x") {
          const i3 = oi(e2), s2 = t2.length, n2 = Array(s2).fill(0), o2 = Array(s2);
          let a2, r2, l2, h2 = ni(t2, 0);
          for (a2 = 0; a2 < s2; ++a2)
            if (r2 = l2, l2 = h2, h2 = ni(t2, a2 + 1), l2) {
              if (h2) {
                const t3 = h2[e2] - l2[e2];
                n2[a2] = 0 !== t3 ? (h2[i3] - l2[i3]) / t3 : 0;
              }
              o2[a2] = r2 ? h2 ? F(n2[a2 - 1]) !== F(n2[a2]) ? 0 : (n2[a2 - 1] + n2[a2]) / 2 : n2[a2 - 1] : n2[a2];
            }
          !function(t3, e3, i4) {
            const s3 = t3.length;
            let n3, o3, a3, r3, l3, h3 = ni(t3, 0);
            for (let c2 = 0; c2 < s3 - 1; ++c2)
              l3 = h3, h3 = ni(t3, c2 + 1), l3 && h3 && (V(e3[c2], 0, si) ? i4[c2] = i4[c2 + 1] = 0 : (n3 = i4[c2] / e3[c2], o3 = i4[c2 + 1] / e3[c2], r3 = Math.pow(n3, 2) + Math.pow(o3, 2), r3 <= 9 || (a3 = 3 / Math.sqrt(r3), i4[c2] = n3 * a3 * e3[c2], i4[c2 + 1] = o3 * a3 * e3[c2])));
          }(t2, n2, o2), function(t3, e3, i4 = "x") {
            const s3 = oi(i4), n3 = t3.length;
            let o3, a3, r3, l3 = ni(t3, 0);
            for (let h3 = 0; h3 < n3; ++h3) {
              if (a3 = r3, r3 = l3, l3 = ni(t3, h3 + 1), !r3)
                continue;
              const n4 = r3[i4], c2 = r3[s3];
              a3 && (o3 = (n4 - a3[i4]) / 3, r3[`cp1${i4}`] = n4 - o3, r3[`cp1${s3}`] = c2 - o3 * e3[h3]), l3 && (o3 = (l3[i4] - n4) / 3, r3[`cp2${i4}`] = n4 + o3, r3[`cp2${s3}`] = c2 + o3 * e3[h3]);
            }
          }(t2, o2, e2);
        }
        function li(t2, e2, i3) {
          return Math.max(Math.min(t2, i3), e2);
        }
        function hi(t2, e2, i3, s2, n2) {
          let o2, a2, r2, l2;
          if (e2.spanGaps && (t2 = t2.filter((t3) => !t3.skip)), "monotone" === e2.cubicInterpolationMode)
            ri(t2, n2);
          else {
            let i4 = s2 ? t2[t2.length - 1] : t2[0];
            for (o2 = 0, a2 = t2.length; o2 < a2; ++o2)
              r2 = t2[o2], l2 = ai(i4, r2, t2[Math.min(o2 + 1, a2 - (s2 ? 0 : 1)) % a2], e2.tension), r2.cp1x = l2.previous.x, r2.cp1y = l2.previous.y, r2.cp2x = l2.next.x, r2.cp2y = l2.next.y, i4 = r2;
          }
          e2.capBezierPoints && function(t3, e3) {
            let i4, s3, n3, o3, a3, r3 = Re(t3[0], e3);
            for (i4 = 0, s3 = t3.length; i4 < s3; ++i4)
              a3 = o3, o3 = r3, r3 = i4 < s3 - 1 && Re(t3[i4 + 1], e3), o3 && (n3 = t3[i4], a3 && (n3.cp1x = li(n3.cp1x, e3.left, e3.right), n3.cp1y = li(n3.cp1y, e3.top, e3.bottom)), r3 && (n3.cp2x = li(n3.cp2x, e3.left, e3.right), n3.cp2y = li(n3.cp2y, e3.top, e3.bottom)));
          }(t2, i3);
        }
        const ci = (t2) => 0 === t2 || 1 === t2, di = (t2, e2, i3) => -Math.pow(2, 10 * (t2 -= 1)) * Math.sin((t2 - e2) * O / i3), ui = (t2, e2, i3) => Math.pow(2, -10 * t2) * Math.sin((t2 - e2) * O / i3) + 1, fi = { linear: (t2) => t2, easeInQuad: (t2) => t2 * t2, easeOutQuad: (t2) => -t2 * (t2 - 2), easeInOutQuad: (t2) => (t2 /= 0.5) < 1 ? 0.5 * t2 * t2 : -0.5 * (--t2 * (t2 - 2) - 1), easeInCubic: (t2) => t2 * t2 * t2, easeOutCubic: (t2) => (t2 -= 1) * t2 * t2 + 1, easeInOutCubic: (t2) => (t2 /= 0.5) < 1 ? 0.5 * t2 * t2 * t2 : 0.5 * ((t2 -= 2) * t2 * t2 + 2), easeInQuart: (t2) => t2 * t2 * t2 * t2, easeOutQuart: (t2) => -((t2 -= 1) * t2 * t2 * t2 - 1), easeInOutQuart: (t2) => (t2 /= 0.5) < 1 ? 0.5 * t2 * t2 * t2 * t2 : -0.5 * ((t2 -= 2) * t2 * t2 * t2 - 2), easeInQuint: (t2) => t2 * t2 * t2 * t2 * t2, easeOutQuint: (t2) => (t2 -= 1) * t2 * t2 * t2 * t2 + 1, easeInOutQuint: (t2) => (t2 /= 0.5) < 1 ? 0.5 * t2 * t2 * t2 * t2 * t2 : 0.5 * ((t2 -= 2) * t2 * t2 * t2 * t2 + 2), easeInSine: (t2) => 1 - Math.cos(t2 * E), easeOutSine: (t2) => Math.sin(t2 * E), easeInOutSine: (t2) => -0.5 * (Math.cos(C * t2) - 1), easeInExpo: (t2) => 0 === t2 ? 0 : Math.pow(2, 10 * (t2 - 1)), easeOutExpo: (t2) => 1 === t2 ? 1 : 1 - Math.pow(2, -10 * t2), easeInOutExpo: (t2) => ci(t2) ? t2 : t2 < 0.5 ? 0.5 * Math.pow(2, 10 * (2 * t2 - 1)) : 0.5 * (2 - Math.pow(2, -10 * (2 * t2 - 1))), easeInCirc: (t2) => t2 >= 1 ? t2 : -(Math.sqrt(1 - t2 * t2) - 1), easeOutCirc: (t2) => Math.sqrt(1 - (t2 -= 1) * t2), easeInOutCirc: (t2) => (t2 /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t2 * t2) - 1) : 0.5 * (Math.sqrt(1 - (t2 -= 2) * t2) + 1), easeInElastic: (t2) => ci(t2) ? t2 : di(t2, 0.075, 0.3), easeOutElastic: (t2) => ci(t2) ? t2 : ui(t2, 0.075, 0.3), easeInOutElastic(t2) {
          const e2 = 0.1125;
          return ci(t2) ? t2 : t2 < 0.5 ? 0.5 * di(2 * t2, e2, 0.45) : 0.5 + 0.5 * ui(2 * t2 - 1, e2, 0.45);
        }, easeInBack(t2) {
          const e2 = 1.70158;
          return t2 * t2 * ((e2 + 1) * t2 - e2);
        }, easeOutBack(t2) {
          const e2 = 1.70158;
          return (t2 -= 1) * t2 * ((e2 + 1) * t2 + e2) + 1;
        }, easeInOutBack(t2) {
          let e2 = 1.70158;
          return (t2 /= 0.5) < 1 ? t2 * t2 * ((1 + (e2 *= 1.525)) * t2 - e2) * 0.5 : 0.5 * ((t2 -= 2) * t2 * ((1 + (e2 *= 1.525)) * t2 + e2) + 2);
        }, easeInBounce: (t2) => 1 - fi.easeOutBounce(1 - t2), easeOutBounce(t2) {
          const e2 = 7.5625, i3 = 2.75;
          return t2 < 1 / i3 ? e2 * t2 * t2 : t2 < 2 / i3 ? e2 * (t2 -= 1.5 / i3) * t2 + 0.75 : t2 < 2.5 / i3 ? e2 * (t2 -= 2.25 / i3) * t2 + 0.9375 : e2 * (t2 -= 2.625 / i3) * t2 + 0.984375;
        }, easeInOutBounce: (t2) => t2 < 0.5 ? 0.5 * fi.easeInBounce(2 * t2) : 0.5 * fi.easeOutBounce(2 * t2 - 1) + 0.5 };
        function gi(t2, e2, i3, s2) {
          return { x: t2.x + i3 * (e2.x - t2.x), y: t2.y + i3 * (e2.y - t2.y) };
        }
        function pi(t2, e2, i3, s2) {
          return { x: t2.x + i3 * (e2.x - t2.x), y: "middle" === s2 ? i3 < 0.5 ? t2.y : e2.y : "after" === s2 ? i3 < 1 ? t2.y : e2.y : i3 > 0 ? e2.y : t2.y };
        }
        function mi(t2, e2, i3, s2) {
          const n2 = { x: t2.cp2x, y: t2.cp2y }, o2 = { x: e2.cp1x, y: e2.cp1y }, a2 = gi(t2, n2, i3), r2 = gi(n2, o2, i3), l2 = gi(o2, e2, i3), h2 = gi(a2, r2, i3), c2 = gi(r2, l2, i3);
          return gi(h2, c2, i3);
        }
        const xi = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, bi = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
        function _i(t2, e2) {
          const i3 = ("" + t2).match(xi);
          if (!i3 || "normal" === i3[1])
            return 1.2 * e2;
          switch (t2 = +i3[2], i3[3]) {
            case "px":
              return t2;
            case "%":
              t2 /= 100;
          }
          return e2 * t2;
        }
        const yi = (t2) => +t2 || 0;
        function vi(t2, e2) {
          const i3 = {}, s2 = o(e2), n2 = s2 ? Object.keys(e2) : e2, a2 = o(t2) ? s2 ? (i4) => l(t2[i4], t2[e2[i4]]) : (e3) => t2[e3] : () => t2;
          for (const t3 of n2)
            i3[t3] = yi(a2(t3));
          return i3;
        }
        function Mi(t2) {
          return vi(t2, { top: "y", right: "x", bottom: "y", left: "x" });
        }
        function wi(t2) {
          return vi(t2, ["topLeft", "topRight", "bottomLeft", "bottomRight"]);
        }
        function ki(t2) {
          const e2 = Mi(t2);
          return e2.width = e2.left + e2.right, e2.height = e2.top + e2.bottom, e2;
        }
        function Si(t2, e2) {
          t2 = t2 || {}, e2 = e2 || ue.font;
          let i3 = l(t2.size, e2.size);
          "string" == typeof i3 && (i3 = parseInt(i3, 10));
          let s2 = l(t2.style, e2.style);
          s2 && !("" + s2).match(bi) && (console.warn('Invalid font style specified: "' + s2 + '"'), s2 = void 0);
          const n2 = { family: l(t2.family, e2.family), lineHeight: _i(l(t2.lineHeight, e2.lineHeight), i3), size: i3, style: s2, weight: l(t2.weight, e2.weight), string: "" };
          return n2.string = De(n2), n2;
        }
        function Pi(t2, e2, i3, s2) {
          let o2, a2, r2, l2 = true;
          for (o2 = 0, a2 = t2.length; o2 < a2; ++o2)
            if (r2 = t2[o2], void 0 !== r2 && (void 0 !== e2 && "function" == typeof r2 && (r2 = r2(e2), l2 = false), void 0 !== i3 && n(r2) && (r2 = r2[i3 % r2.length], l2 = false), void 0 !== r2))
              return s2 && !l2 && (s2.cacheable = false), r2;
        }
        function Di(t2, e2, i3) {
          const { min: s2, max: n2 } = t2, o2 = c(e2, (n2 - s2) / 2), a2 = (t3, e3) => i3 && 0 === t3 ? 0 : t3 + e3;
          return { min: a2(s2, -Math.abs(o2)), max: a2(n2, o2) };
        }
        function Ci(t2, e2) {
          return Object.assign(Object.create(t2), e2);
        }
        function Oi(t2, e2, i3) {
          return t2 ? function(t3, e3) {
            return { x: (i4) => t3 + t3 + e3 - i4, setWidth(t4) {
              e3 = t4;
            }, textAlign: (t4) => "center" === t4 ? t4 : "right" === t4 ? "left" : "right", xPlus: (t4, e4) => t4 - e4, leftForLtr: (t4, e4) => t4 - e4 };
          }(e2, i3) : { x: (t3) => t3, setWidth(t3) {
          }, textAlign: (t3) => t3, xPlus: (t3, e3) => t3 + e3, leftForLtr: (t3, e3) => t3 };
        }
        function Ai(t2, e2) {
          let i3, s2;
          "ltr" !== e2 && "rtl" !== e2 || (i3 = t2.canvas.style, s2 = [i3.getPropertyValue("direction"), i3.getPropertyPriority("direction")], i3.setProperty("direction", e2, "important"), t2.prevTextDirection = s2);
        }
        function Ti(t2, e2) {
          void 0 !== e2 && (delete t2.prevTextDirection, t2.canvas.style.setProperty("direction", e2[0], e2[1]));
        }
        function Li(t2) {
          return "angle" === t2 ? { between: Z, compare: K, normalize: G } : { between: tt, compare: (t3, e2) => t3 - e2, normalize: (t3) => t3 };
        }
        function Ei({ start: t2, end: e2, count: i3, loop: s2, style: n2 }) {
          return { start: t2 % i3, end: e2 % i3, loop: s2 && (e2 - t2 + 1) % i3 == 0, style: n2 };
        }
        function Ri(t2, e2, i3) {
          if (!i3)
            return [t2];
          const { property: s2, start: n2, end: o2 } = i3, a2 = e2.length, { compare: r2, between: l2, normalize: h2 } = Li(s2), { start: c2, end: d2, loop: u2, style: f2 } = function(t3, e3, i4) {
            const { property: s3, start: n3, end: o3 } = i4, { between: a3, normalize: r3 } = Li(s3), l3 = e3.length;
            let h3, c3, { start: d3, end: u3, loop: f3 } = t3;
            if (f3) {
              for (d3 += l3, u3 += l3, h3 = 0, c3 = l3; h3 < c3 && a3(r3(e3[d3 % l3][s3]), n3, o3); ++h3)
                d3--, u3--;
              d3 %= l3, u3 %= l3;
            }
            return u3 < d3 && (u3 += l3), { start: d3, end: u3, loop: f3, style: t3.style };
          }(t2, e2, i3), g2 = [];
          let p2, m2, x2, b2 = false, _2 = null;
          const y2 = () => b2 || l2(n2, x2, p2) && 0 !== r2(n2, x2), v2 = () => !b2 || 0 === r2(o2, p2) || l2(o2, x2, p2);
          for (let t3 = c2, i4 = c2; t3 <= d2; ++t3)
            m2 = e2[t3 % a2], m2.skip || (p2 = h2(m2[s2]), p2 !== x2 && (b2 = l2(p2, n2, o2), null === _2 && y2() && (_2 = 0 === r2(p2, n2) ? t3 : i4), null !== _2 && v2() && (g2.push(Ei({ start: _2, end: t3, loop: u2, count: a2, style: f2 })), _2 = null), i4 = t3, x2 = p2));
          return null !== _2 && g2.push(Ei({ start: _2, end: d2, loop: u2, count: a2, style: f2 })), g2;
        }
        function Ii(t2, e2) {
          const i3 = [], s2 = t2.segments;
          for (let n2 = 0; n2 < s2.length; n2++) {
            const o2 = Ri(s2[n2], t2.points, e2);
            o2.length && i3.push(...o2);
          }
          return i3;
        }
        function zi(t2, e2) {
          const i3 = t2.points, s2 = t2.options.spanGaps, n2 = i3.length;
          if (!n2)
            return [];
          const o2 = !!t2._loop, { start: a2, end: r2 } = function(t3, e3, i4, s3) {
            let n3 = 0, o3 = e3 - 1;
            if (i4 && !s3)
              for (; n3 < e3 && !t3[n3].skip; )
                n3++;
            for (; n3 < e3 && t3[n3].skip; )
              n3++;
            for (n3 %= e3, i4 && (o3 += n3); o3 > n3 && t3[o3 % e3].skip; )
              o3--;
            return o3 %= e3, { start: n3, end: o3 };
          }(i3, n2, o2, s2);
          if (true === s2)
            return Fi(t2, [{ start: a2, end: r2, loop: o2 }], i3, e2);
          return Fi(t2, function(t3, e3, i4, s3) {
            const n3 = t3.length, o3 = [];
            let a3, r3 = e3, l2 = t3[e3];
            for (a3 = e3 + 1; a3 <= i4; ++a3) {
              const i5 = t3[a3 % n3];
              i5.skip || i5.stop ? l2.skip || (s3 = false, o3.push({ start: e3 % n3, end: (a3 - 1) % n3, loop: s3 }), e3 = r3 = i5.stop ? a3 : null) : (r3 = a3, l2.skip && (e3 = a3)), l2 = i5;
            }
            return null !== r3 && o3.push({ start: e3 % n3, end: r3 % n3, loop: s3 }), o3;
          }(i3, a2, r2 < a2 ? r2 + n2 : r2, !!t2._fullLoop && 0 === a2 && r2 === n2 - 1), i3, e2);
        }
        function Fi(t2, e2, i3, s2) {
          return s2 && s2.setContext && i3 ? function(t3, e3, i4, s3) {
            const n2 = t3._chart.getContext(), o2 = Vi(t3.options), { _datasetIndex: a2, options: { spanGaps: r2 } } = t3, l2 = i4.length, h2 = [];
            let c2 = o2, d2 = e3[0].start, u2 = d2;
            function f2(t4, e4, s4, n3) {
              const o3 = r2 ? -1 : 1;
              if (t4 !== e4) {
                for (t4 += l2; i4[t4 % l2].skip; )
                  t4 -= o3;
                for (; i4[e4 % l2].skip; )
                  e4 += o3;
                t4 % l2 != e4 % l2 && (h2.push({ start: t4 % l2, end: e4 % l2, loop: s4, style: n3 }), c2 = n3, d2 = e4 % l2);
              }
            }
            for (const t4 of e3) {
              d2 = r2 ? d2 : t4.start;
              let e4, o3 = i4[d2 % l2];
              for (u2 = d2 + 1; u2 <= t4.end; u2++) {
                const r3 = i4[u2 % l2];
                e4 = Vi(s3.setContext(Ci(n2, { type: "segment", p0: o3, p1: r3, p0DataIndex: (u2 - 1) % l2, p1DataIndex: u2 % l2, datasetIndex: a2 }))), Bi(e4, c2) && f2(d2, u2 - 1, t4.loop, c2), o3 = r3, c2 = e4;
              }
              d2 < u2 - 1 && f2(d2, u2 - 1, t4.loop, c2);
            }
            return h2;
          }(t2, e2, i3, s2) : e2;
        }
        function Vi(t2) {
          return { backgroundColor: t2.backgroundColor, borderCapStyle: t2.borderCapStyle, borderDash: t2.borderDash, borderDashOffset: t2.borderDashOffset, borderJoinStyle: t2.borderJoinStyle, borderWidth: t2.borderWidth, borderColor: t2.borderColor };
        }
        function Bi(t2, e2) {
          if (!e2)
            return false;
          const i3 = [], s2 = function(t3, e3) {
            return Jt(e3) ? (i3.includes(e3) || i3.push(e3), i3.indexOf(e3)) : e3;
          };
          return JSON.stringify(t2, s2) !== JSON.stringify(e2, s2);
        }
        var Wi = Object.freeze({ __proto__: null, HALF_PI: E, INFINITY: T, PI: C, PITAU: A, QUARTER_PI: R, RAD_PER_DEG: L, TAU: O, TWO_THIRDS_PI: I, _addGrace: Di, _alignPixel: Ae, _alignStartEnd: ft, _angleBetween: Z, _angleDiff: K, _arrayUnique: lt, _attachContext: $e, _bezierCurveTo: Ve, _bezierInterpolation: mi, _boundSegment: Ri, _boundSegments: Ii, _capitalize: w, _computeSegments: zi, _createResolver: je, _decimalPlaces: U, _deprecated: function(t2, e2, i3, s2) {
          void 0 !== e2 && console.warn(t2 + ': "' + i3 + '" is deprecated. Please use "' + s2 + '" instead');
        }, _descriptors: Ye, _elementsEqual: f, _factorize: W, _filterBetween: nt, _getParentNode: ge, _getStartAndCountOfVisiblePoints: pt, _int16Range: Q, _isBetween: tt, _isClickEvent: D, _isDomSupported: fe, _isPointInArea: Re, _limitValue: J, _longestText: Oe, _lookup: et, _lookupByKey: it, _measureText: Ce, _merger: m, _mergerIf: _, _normalizeAngle: G, _parseObjectDataRadialScale: ii, _pointInLine: gi, _readValueToProps: vi, _rlookupByKey: st, _scaleRangesChanged: mt, _setMinAndMaxByKey: j, _splitKey: v, _steppedInterpolation: pi, _steppedLineTo: Fe, _textX: gt, _toLeftRightCenter: ut, _updateBezierControlPoints: hi, addRoundedRectPath: He, almostEquals: V, almostWhole: H, callback: d, clearCanvas: Te, clipArea: Ie, clone: g, color: Qt, createContext: Ci, debounce: dt, defined: k, distanceBetweenPoints: q, drawPoint: Le, drawPointLegend: Ee, each: u, easingEffects: fi, finiteOrDefault: r, fontString: function(t2, e2, i3) {
          return e2 + " " + t2 + "px " + i3;
        }, formatNumber: ne, getAngleFromPoint: X, getHoverColor: te, getMaximumSize: we, getRelativePosition: ve, getRtlAdapter: Oi, getStyle: xe, isArray: n, isFinite: a, isFunction: S, isNullOrUndef: s, isNumber: N, isObject: o, isPatternOrGradient: Jt, listenArrayEvents: at, log10: z, merge: x, mergeIf: b, niceNum: B, noop: e, overrideTextDirection: Ai, readUsedSize: Pe, renderText: Ne, requestAnimFrame: ht, resolve: Pi, resolveObjectKey: M, restoreTextDirection: Ti, retinaScale: ke, setsEqual: P, sign: F, splineCurve: ai, splineCurveMonotone: ri, supportsEventListenerOptions: Se, throttled: ct, toDegrees: Y, toDimension: c, toFont: Si, toFontString: De, toLineHeight: _i, toPadding: ki, toPercentage: h, toRadians: $, toTRBL: Mi, toTRBLCorners: wi, uid: i2, unclipArea: ze, unlistenArrayEvents: rt, valueOrDefault: l });
        function Ni(t2, e2, i3, s2) {
          const { controller: n2, data: o2, _sorted: a2 } = t2, r2 = n2._cachedMeta.iScale;
          if (r2 && e2 === r2.axis && "r" !== e2 && a2 && o2.length) {
            const t3 = r2._reversePixels ? st : it;
            if (!s2)
              return t3(o2, e2, i3);
            if (n2._sharedOptions) {
              const s3 = o2[0], n3 = "function" == typeof s3.getRange && s3.getRange(e2);
              if (n3) {
                const s4 = t3(o2, e2, i3 - n3), a3 = t3(o2, e2, i3 + n3);
                return { lo: s4.lo, hi: a3.hi };
              }
            }
          }
          return { lo: 0, hi: o2.length - 1 };
        }
        function Hi(t2, e2, i3, s2, n2) {
          const o2 = t2.getSortedVisibleDatasetMetas(), a2 = i3[e2];
          for (let t3 = 0, i4 = o2.length; t3 < i4; ++t3) {
            const { index: i5, data: r2 } = o2[t3], { lo: l2, hi: h2 } = Ni(o2[t3], e2, a2, n2);
            for (let t4 = l2; t4 <= h2; ++t4) {
              const e3 = r2[t4];
              e3.skip || s2(e3, i5, t4);
            }
          }
        }
        function ji(t2, e2, i3, s2, n2) {
          const o2 = [];
          if (!n2 && !t2.isPointInArea(e2))
            return o2;
          return Hi(t2, i3, e2, function(i4, a2, r2) {
            (n2 || Re(i4, t2.chartArea, 0)) && i4.inRange(e2.x, e2.y, s2) && o2.push({ element: i4, datasetIndex: a2, index: r2 });
          }, true), o2;
        }
        function $i(t2, e2, i3, s2, n2, o2) {
          let a2 = [];
          const r2 = function(t3) {
            const e3 = -1 !== t3.indexOf("x"), i4 = -1 !== t3.indexOf("y");
            return function(t4, s3) {
              const n3 = e3 ? Math.abs(t4.x - s3.x) : 0, o3 = i4 ? Math.abs(t4.y - s3.y) : 0;
              return Math.sqrt(Math.pow(n3, 2) + Math.pow(o3, 2));
            };
          }(i3);
          let l2 = Number.POSITIVE_INFINITY;
          return Hi(t2, i3, e2, function(i4, h2, c2) {
            const d2 = i4.inRange(e2.x, e2.y, n2);
            if (s2 && !d2)
              return;
            const u2 = i4.getCenterPoint(n2);
            if (!(!!o2 || t2.isPointInArea(u2)) && !d2)
              return;
            const f2 = r2(e2, u2);
            f2 < l2 ? (a2 = [{ element: i4, datasetIndex: h2, index: c2 }], l2 = f2) : f2 === l2 && a2.push({ element: i4, datasetIndex: h2, index: c2 });
          }), a2;
        }
        function Yi(t2, e2, i3, s2, n2, o2) {
          return o2 || t2.isPointInArea(e2) ? "r" !== i3 || s2 ? $i(t2, e2, i3, s2, n2, o2) : function(t3, e3, i4, s3) {
            let n3 = [];
            return Hi(t3, i4, e3, function(t4, i5, o3) {
              const { startAngle: a2, endAngle: r2 } = t4.getProps(["startAngle", "endAngle"], s3), { angle: l2 } = X(t4, { x: e3.x, y: e3.y });
              Z(l2, a2, r2) && n3.push({ element: t4, datasetIndex: i5, index: o3 });
            }), n3;
          }(t2, e2, i3, n2) : [];
        }
        function Ui(t2, e2, i3, s2, n2) {
          const o2 = [], a2 = "x" === i3 ? "inXRange" : "inYRange";
          let r2 = false;
          return Hi(t2, i3, e2, (t3, s3, l2) => {
            t3[a2](e2[i3], n2) && (o2.push({ element: t3, datasetIndex: s3, index: l2 }), r2 = r2 || t3.inRange(e2.x, e2.y, n2));
          }), s2 && !r2 ? [] : o2;
        }
        var Xi = { evaluateInteractionItems: Hi, modes: { index(t2, e2, i3, s2) {
          const n2 = ve(e2, t2), o2 = i3.axis || "x", a2 = i3.includeInvisible || false, r2 = i3.intersect ? ji(t2, n2, o2, s2, a2) : Yi(t2, n2, o2, false, s2, a2), l2 = [];
          return r2.length ? (t2.getSortedVisibleDatasetMetas().forEach((t3) => {
            const e3 = r2[0].index, i4 = t3.data[e3];
            i4 && !i4.skip && l2.push({ element: i4, datasetIndex: t3.index, index: e3 });
          }), l2) : [];
        }, dataset(t2, e2, i3, s2) {
          const n2 = ve(e2, t2), o2 = i3.axis || "xy", a2 = i3.includeInvisible || false;
          let r2 = i3.intersect ? ji(t2, n2, o2, s2, a2) : Yi(t2, n2, o2, false, s2, a2);
          if (r2.length > 0) {
            const e3 = r2[0].datasetIndex, i4 = t2.getDatasetMeta(e3).data;
            r2 = [];
            for (let t3 = 0; t3 < i4.length; ++t3)
              r2.push({ element: i4[t3], datasetIndex: e3, index: t3 });
          }
          return r2;
        }, point: (t2, e2, i3, s2) => ji(t2, ve(e2, t2), i3.axis || "xy", s2, i3.includeInvisible || false), nearest(t2, e2, i3, s2) {
          const n2 = ve(e2, t2), o2 = i3.axis || "xy", a2 = i3.includeInvisible || false;
          return Yi(t2, n2, o2, i3.intersect, s2, a2);
        }, x: (t2, e2, i3, s2) => Ui(t2, ve(e2, t2), "x", i3.intersect, s2), y: (t2, e2, i3, s2) => Ui(t2, ve(e2, t2), "y", i3.intersect, s2) } };
        const qi = ["left", "top", "right", "bottom"];
        function Ki(t2, e2) {
          return t2.filter((t3) => t3.pos === e2);
        }
        function Gi(t2, e2) {
          return t2.filter((t3) => -1 === qi.indexOf(t3.pos) && t3.box.axis === e2);
        }
        function Zi(t2, e2) {
          return t2.sort((t3, i3) => {
            const s2 = e2 ? i3 : t3, n2 = e2 ? t3 : i3;
            return s2.weight === n2.weight ? s2.index - n2.index : s2.weight - n2.weight;
          });
        }
        function Ji(t2, e2) {
          const i3 = function(t3) {
            const e3 = {};
            for (const i4 of t3) {
              const { stack: t4, pos: s3, stackWeight: n3 } = i4;
              if (!t4 || !qi.includes(s3))
                continue;
              const o3 = e3[t4] || (e3[t4] = { count: 0, placed: 0, weight: 0, size: 0 });
              o3.count++, o3.weight += n3;
            }
            return e3;
          }(t2), { vBoxMaxWidth: s2, hBoxMaxHeight: n2 } = e2;
          let o2, a2, r2;
          for (o2 = 0, a2 = t2.length; o2 < a2; ++o2) {
            r2 = t2[o2];
            const { fullSize: a3 } = r2.box, l2 = i3[r2.stack], h2 = l2 && r2.stackWeight / l2.weight;
            r2.horizontal ? (r2.width = h2 ? h2 * s2 : a3 && e2.availableWidth, r2.height = n2) : (r2.width = s2, r2.height = h2 ? h2 * n2 : a3 && e2.availableHeight);
          }
          return i3;
        }
        function Qi(t2, e2, i3, s2) {
          return Math.max(t2[i3], e2[i3]) + Math.max(t2[s2], e2[s2]);
        }
        function ts(t2, e2) {
          t2.top = Math.max(t2.top, e2.top), t2.left = Math.max(t2.left, e2.left), t2.bottom = Math.max(t2.bottom, e2.bottom), t2.right = Math.max(t2.right, e2.right);
        }
        function es(t2, e2, i3, s2) {
          const { pos: n2, box: a2 } = i3, r2 = t2.maxPadding;
          if (!o(n2)) {
            i3.size && (t2[n2] -= i3.size);
            const e3 = s2[i3.stack] || { size: 0, count: 1 };
            e3.size = Math.max(e3.size, i3.horizontal ? a2.height : a2.width), i3.size = e3.size / e3.count, t2[n2] += i3.size;
          }
          a2.getPadding && ts(r2, a2.getPadding());
          const l2 = Math.max(0, e2.outerWidth - Qi(r2, t2, "left", "right")), h2 = Math.max(0, e2.outerHeight - Qi(r2, t2, "top", "bottom")), c2 = l2 !== t2.w, d2 = h2 !== t2.h;
          return t2.w = l2, t2.h = h2, i3.horizontal ? { same: c2, other: d2 } : { same: d2, other: c2 };
        }
        function is(t2, e2) {
          const i3 = e2.maxPadding;
          function s2(t3) {
            const s3 = { left: 0, top: 0, right: 0, bottom: 0 };
            return t3.forEach((t4) => {
              s3[t4] = Math.max(e2[t4], i3[t4]);
            }), s3;
          }
          return s2(t2 ? ["left", "right"] : ["top", "bottom"]);
        }
        function ss(t2, e2, i3, s2) {
          const n2 = [];
          let o2, a2, r2, l2, h2, c2;
          for (o2 = 0, a2 = t2.length, h2 = 0; o2 < a2; ++o2) {
            r2 = t2[o2], l2 = r2.box, l2.update(r2.width || e2.w, r2.height || e2.h, is(r2.horizontal, e2));
            const { same: a3, other: d2 } = es(e2, i3, r2, s2);
            h2 |= a3 && n2.length, c2 = c2 || d2, l2.fullSize || n2.push(r2);
          }
          return h2 && ss(n2, e2, i3, s2) || c2;
        }
        function ns(t2, e2, i3, s2, n2) {
          t2.top = i3, t2.left = e2, t2.right = e2 + s2, t2.bottom = i3 + n2, t2.width = s2, t2.height = n2;
        }
        function os(t2, e2, i3, s2) {
          const n2 = i3.padding;
          let { x: o2, y: a2 } = e2;
          for (const r2 of t2) {
            const t3 = r2.box, l2 = s2[r2.stack] || { count: 1, placed: 0, weight: 1 }, h2 = r2.stackWeight / l2.weight || 1;
            if (r2.horizontal) {
              const s3 = e2.w * h2, o3 = l2.size || t3.height;
              k(l2.start) && (a2 = l2.start), t3.fullSize ? ns(t3, n2.left, a2, i3.outerWidth - n2.right - n2.left, o3) : ns(t3, e2.left + l2.placed, a2, s3, o3), l2.start = a2, l2.placed += s3, a2 = t3.bottom;
            } else {
              const s3 = e2.h * h2, a3 = l2.size || t3.width;
              k(l2.start) && (o2 = l2.start), t3.fullSize ? ns(t3, o2, n2.top, a3, i3.outerHeight - n2.bottom - n2.top) : ns(t3, o2, e2.top + l2.placed, a3, s3), l2.start = o2, l2.placed += s3, o2 = t3.right;
            }
          }
          e2.x = o2, e2.y = a2;
        }
        var as = { addBox(t2, e2) {
          t2.boxes || (t2.boxes = []), e2.fullSize = e2.fullSize || false, e2.position = e2.position || "top", e2.weight = e2.weight || 0, e2._layers = e2._layers || function() {
            return [{ z: 0, draw(t3) {
              e2.draw(t3);
            } }];
          }, t2.boxes.push(e2);
        }, removeBox(t2, e2) {
          const i3 = t2.boxes ? t2.boxes.indexOf(e2) : -1;
          -1 !== i3 && t2.boxes.splice(i3, 1);
        }, configure(t2, e2, i3) {
          e2.fullSize = i3.fullSize, e2.position = i3.position, e2.weight = i3.weight;
        }, update(t2, e2, i3, s2) {
          if (!t2)
            return;
          const n2 = ki(t2.options.layout.padding), o2 = Math.max(e2 - n2.width, 0), a2 = Math.max(i3 - n2.height, 0), r2 = function(t3) {
            const e3 = function(t4) {
              const e4 = [];
              let i5, s4, n4, o4, a4, r4;
              for (i5 = 0, s4 = (t4 || []).length; i5 < s4; ++i5)
                n4 = t4[i5], { position: o4, options: { stack: a4, stackWeight: r4 = 1 } } = n4, e4.push({ index: i5, box: n4, pos: o4, horizontal: n4.isHorizontal(), weight: n4.weight, stack: a4 && o4 + a4, stackWeight: r4 });
              return e4;
            }(t3), i4 = Zi(e3.filter((t4) => t4.box.fullSize), true), s3 = Zi(Ki(e3, "left"), true), n3 = Zi(Ki(e3, "right")), o3 = Zi(Ki(e3, "top"), true), a3 = Zi(Ki(e3, "bottom")), r3 = Gi(e3, "x"), l3 = Gi(e3, "y");
            return { fullSize: i4, leftAndTop: s3.concat(o3), rightAndBottom: n3.concat(l3).concat(a3).concat(r3), chartArea: Ki(e3, "chartArea"), vertical: s3.concat(n3).concat(l3), horizontal: o3.concat(a3).concat(r3) };
          }(t2.boxes), l2 = r2.vertical, h2 = r2.horizontal;
          u(t2.boxes, (t3) => {
            "function" == typeof t3.beforeLayout && t3.beforeLayout();
          });
          const c2 = l2.reduce((t3, e3) => e3.box.options && false === e3.box.options.display ? t3 : t3 + 1, 0) || 1, d2 = Object.freeze({ outerWidth: e2, outerHeight: i3, padding: n2, availableWidth: o2, availableHeight: a2, vBoxMaxWidth: o2 / 2 / c2, hBoxMaxHeight: a2 / 2 }), f2 = Object.assign({}, n2);
          ts(f2, ki(s2));
          const g2 = Object.assign({ maxPadding: f2, w: o2, h: a2, x: n2.left, y: n2.top }, n2), p2 = Ji(l2.concat(h2), d2);
          ss(r2.fullSize, g2, d2, p2), ss(l2, g2, d2, p2), ss(h2, g2, d2, p2) && ss(l2, g2, d2, p2), function(t3) {
            const e3 = t3.maxPadding;
            function i4(i5) {
              const s3 = Math.max(e3[i5] - t3[i5], 0);
              return t3[i5] += s3, s3;
            }
            t3.y += i4("top"), t3.x += i4("left"), i4("right"), i4("bottom");
          }(g2), os(r2.leftAndTop, g2, d2, p2), g2.x += g2.w, g2.y += g2.h, os(r2.rightAndBottom, g2, d2, p2), t2.chartArea = { left: g2.left, top: g2.top, right: g2.left + g2.w, bottom: g2.top + g2.h, height: g2.h, width: g2.w }, u(r2.chartArea, (e3) => {
            const i4 = e3.box;
            Object.assign(i4, t2.chartArea), i4.update(g2.w, g2.h, { left: 0, top: 0, right: 0, bottom: 0 });
          });
        } };
        class rs {
          acquireContext(t2, e2) {
          }
          releaseContext(t2) {
            return false;
          }
          addEventListener(t2, e2, i3) {
          }
          removeEventListener(t2, e2, i3) {
          }
          getDevicePixelRatio() {
            return 1;
          }
          getMaximumSize(t2, e2, i3, s2) {
            return e2 = Math.max(0, e2 || t2.width), i3 = i3 || t2.height, { width: e2, height: Math.max(0, s2 ? Math.floor(e2 / s2) : i3) };
          }
          isAttached(t2) {
            return true;
          }
          updateConfig(t2) {
          }
        }
        class ls extends rs {
          acquireContext(t2) {
            return t2 && t2.getContext && t2.getContext("2d") || null;
          }
          updateConfig(t2) {
            t2.options.animation = false;
          }
        }
        const hs = "$chartjs", cs = { touchstart: "mousedown", touchmove: "mousemove", touchend: "mouseup", pointerenter: "mouseenter", pointerdown: "mousedown", pointermove: "mousemove", pointerup: "mouseup", pointerleave: "mouseout", pointerout: "mouseout" }, ds = (t2) => null === t2 || "" === t2;
        const us = !!Se && { passive: true };
        function fs(t2, e2, i3) {
          t2 && t2.canvas && t2.canvas.removeEventListener(e2, i3, us);
        }
        function gs(t2, e2) {
          for (const i3 of t2)
            if (i3 === e2 || i3.contains(e2))
              return true;
        }
        function ps(t2, e2, i3) {
          const s2 = t2.canvas, n2 = new MutationObserver((t3) => {
            let e3 = false;
            for (const i4 of t3)
              e3 = e3 || gs(i4.addedNodes, s2), e3 = e3 && !gs(i4.removedNodes, s2);
            e3 && i3();
          });
          return n2.observe(document, { childList: true, subtree: true }), n2;
        }
        function ms(t2, e2, i3) {
          const s2 = t2.canvas, n2 = new MutationObserver((t3) => {
            let e3 = false;
            for (const i4 of t3)
              e3 = e3 || gs(i4.removedNodes, s2), e3 = e3 && !gs(i4.addedNodes, s2);
            e3 && i3();
          });
          return n2.observe(document, { childList: true, subtree: true }), n2;
        }
        const xs = /* @__PURE__ */ new Map();
        let bs = 0;
        function _s() {
          const t2 = window.devicePixelRatio;
          t2 !== bs && (bs = t2, xs.forEach((e2, i3) => {
            i3.currentDevicePixelRatio !== t2 && e2();
          }));
        }
        function ys(t2, e2, i3) {
          const s2 = t2.canvas, n2 = s2 && ge(s2);
          if (!n2)
            return;
          const o2 = ct((t3, e3) => {
            const s3 = n2.clientWidth;
            i3(t3, e3), s3 < n2.clientWidth && i3();
          }, window), a2 = new ResizeObserver((t3) => {
            const e3 = t3[0], i4 = e3.contentRect.width, s3 = e3.contentRect.height;
            0 === i4 && 0 === s3 || o2(i4, s3);
          });
          return a2.observe(n2), function(t3, e3) {
            xs.size || window.addEventListener("resize", _s), xs.set(t3, e3);
          }(t2, o2), a2;
        }
        function vs(t2, e2, i3) {
          i3 && i3.disconnect(), "resize" === e2 && function(t3) {
            xs.delete(t3), xs.size || window.removeEventListener("resize", _s);
          }(t2);
        }
        function Ms(t2, e2, i3) {
          const s2 = t2.canvas, n2 = ct((e3) => {
            null !== t2.ctx && i3(function(t3, e4) {
              const i4 = cs[t3.type] || t3.type, { x: s3, y: n3 } = ve(t3, e4);
              return { type: i4, chart: e4, native: t3, x: void 0 !== s3 ? s3 : null, y: void 0 !== n3 ? n3 : null };
            }(e3, t2));
          }, t2);
          return function(t3, e3, i4) {
            t3 && t3.addEventListener(e3, i4, us);
          }(s2, e2, n2), n2;
        }
        class ws extends rs {
          acquireContext(t2, e2) {
            const i3 = t2 && t2.getContext && t2.getContext("2d");
            return i3 && i3.canvas === t2 ? (function(t3, e3) {
              const i4 = t3.style, s2 = t3.getAttribute("height"), n2 = t3.getAttribute("width");
              if (t3[hs] = { initial: { height: s2, width: n2, style: { display: i4.display, height: i4.height, width: i4.width } } }, i4.display = i4.display || "block", i4.boxSizing = i4.boxSizing || "border-box", ds(n2)) {
                const e4 = Pe(t3, "width");
                void 0 !== e4 && (t3.width = e4);
              }
              if (ds(s2))
                if ("" === t3.style.height)
                  t3.height = t3.width / (e3 || 2);
                else {
                  const e4 = Pe(t3, "height");
                  void 0 !== e4 && (t3.height = e4);
                }
            }(t2, e2), i3) : null;
          }
          releaseContext(t2) {
            const e2 = t2.canvas;
            if (!e2[hs])
              return false;
            const i3 = e2[hs].initial;
            ["height", "width"].forEach((t3) => {
              const n3 = i3[t3];
              s(n3) ? e2.removeAttribute(t3) : e2.setAttribute(t3, n3);
            });
            const n2 = i3.style || {};
            return Object.keys(n2).forEach((t3) => {
              e2.style[t3] = n2[t3];
            }), e2.width = e2.width, delete e2[hs], true;
          }
          addEventListener(t2, e2, i3) {
            this.removeEventListener(t2, e2);
            const s2 = t2.$proxies || (t2.$proxies = {}), n2 = { attach: ps, detach: ms, resize: ys }[e2] || Ms;
            s2[e2] = n2(t2, e2, i3);
          }
          removeEventListener(t2, e2) {
            const i3 = t2.$proxies || (t2.$proxies = {}), s2 = i3[e2];
            if (!s2)
              return;
            ({ attach: vs, detach: vs, resize: vs }[e2] || fs)(t2, e2, s2), i3[e2] = void 0;
          }
          getDevicePixelRatio() {
            return window.devicePixelRatio;
          }
          getMaximumSize(t2, e2, i3, s2) {
            return we(t2, e2, i3, s2);
          }
          isAttached(t2) {
            const e2 = t2 && ge(t2);
            return !(!e2 || !e2.isConnected);
          }
        }
        function ks(t2) {
          return !fe() || "undefined" != typeof OffscreenCanvas && t2 instanceof OffscreenCanvas ? ls : ws;
        }
        var Ss = Object.freeze({ __proto__: null, BasePlatform: rs, BasicPlatform: ls, DomPlatform: ws, _detectPlatform: ks });
        const Ps = "transparent", Ds = { boolean: (t2, e2, i3) => i3 > 0.5 ? e2 : t2, color(t2, e2, i3) {
          const s2 = Qt(t2 || Ps), n2 = s2.valid && Qt(e2 || Ps);
          return n2 && n2.valid ? n2.mix(s2, i3).hexString() : e2;
        }, number: (t2, e2, i3) => t2 + (e2 - t2) * i3 };
        class Cs {
          constructor(t2, e2, i3, s2) {
            const n2 = e2[i3];
            s2 = Pi([t2.to, s2, n2, t2.from]);
            const o2 = Pi([t2.from, n2, s2]);
            this._active = true, this._fn = t2.fn || Ds[t2.type || typeof o2], this._easing = fi[t2.easing] || fi.linear, this._start = Math.floor(Date.now() + (t2.delay || 0)), this._duration = this._total = Math.floor(t2.duration), this._loop = !!t2.loop, this._target = e2, this._prop = i3, this._from = o2, this._to = s2, this._promises = void 0;
          }
          active() {
            return this._active;
          }
          update(t2, e2, i3) {
            if (this._active) {
              this._notify(false);
              const s2 = this._target[this._prop], n2 = i3 - this._start, o2 = this._duration - n2;
              this._start = i3, this._duration = Math.floor(Math.max(o2, t2.duration)), this._total += n2, this._loop = !!t2.loop, this._to = Pi([t2.to, e2, s2, t2.from]), this._from = Pi([t2.from, s2, e2]);
            }
          }
          cancel() {
            this._active && (this.tick(Date.now()), this._active = false, this._notify(false));
          }
          tick(t2) {
            const e2 = t2 - this._start, i3 = this._duration, s2 = this._prop, n2 = this._from, o2 = this._loop, a2 = this._to;
            let r2;
            if (this._active = n2 !== a2 && (o2 || e2 < i3), !this._active)
              return this._target[s2] = a2, void this._notify(true);
            e2 < 0 ? this._target[s2] = n2 : (r2 = e2 / i3 % 2, r2 = o2 && r2 > 1 ? 2 - r2 : r2, r2 = this._easing(Math.min(1, Math.max(0, r2))), this._target[s2] = this._fn(n2, a2, r2));
          }
          wait() {
            const t2 = this._promises || (this._promises = []);
            return new Promise((e2, i3) => {
              t2.push({ res: e2, rej: i3 });
            });
          }
          _notify(t2) {
            const e2 = t2 ? "res" : "rej", i3 = this._promises || [];
            for (let t3 = 0; t3 < i3.length; t3++)
              i3[t3][e2]();
          }
        }
        class Os {
          constructor(t2, e2) {
            this._chart = t2, this._properties = /* @__PURE__ */ new Map(), this.configure(e2);
          }
          configure(t2) {
            if (!o(t2))
              return;
            const e2 = Object.keys(ue.animation), i3 = this._properties;
            Object.getOwnPropertyNames(t2).forEach((s2) => {
              const a2 = t2[s2];
              if (!o(a2))
                return;
              const r2 = {};
              for (const t3 of e2)
                r2[t3] = a2[t3];
              (n(a2.properties) && a2.properties || [s2]).forEach((t3) => {
                t3 !== s2 && i3.has(t3) || i3.set(t3, r2);
              });
            });
          }
          _animateOptions(t2, e2) {
            const i3 = e2.options, s2 = function(t3, e3) {
              if (!e3)
                return;
              let i4 = t3.options;
              if (!i4)
                return void (t3.options = e3);
              i4.$shared && (t3.options = i4 = Object.assign({}, i4, { $shared: false, $animations: {} }));
              return i4;
            }(t2, i3);
            if (!s2)
              return [];
            const n2 = this._createAnimations(s2, i3);
            return i3.$shared && function(t3, e3) {
              const i4 = [], s3 = Object.keys(e3);
              for (let e4 = 0; e4 < s3.length; e4++) {
                const n3 = t3[s3[e4]];
                n3 && n3.active() && i4.push(n3.wait());
              }
              return Promise.all(i4);
            }(t2.options.$animations, i3).then(() => {
              t2.options = i3;
            }, () => {
            }), n2;
          }
          _createAnimations(t2, e2) {
            const i3 = this._properties, s2 = [], n2 = t2.$animations || (t2.$animations = {}), o2 = Object.keys(e2), a2 = Date.now();
            let r2;
            for (r2 = o2.length - 1; r2 >= 0; --r2) {
              const l2 = o2[r2];
              if ("$" === l2.charAt(0))
                continue;
              if ("options" === l2) {
                s2.push(...this._animateOptions(t2, e2));
                continue;
              }
              const h2 = e2[l2];
              let c2 = n2[l2];
              const d2 = i3.get(l2);
              if (c2) {
                if (d2 && c2.active()) {
                  c2.update(d2, h2, a2);
                  continue;
                }
                c2.cancel();
              }
              d2 && d2.duration ? (n2[l2] = c2 = new Cs(d2, t2, l2, h2), s2.push(c2)) : t2[l2] = h2;
            }
            return s2;
          }
          update(t2, e2) {
            if (0 === this._properties.size)
              return void Object.assign(t2, e2);
            const i3 = this._createAnimations(t2, e2);
            return i3.length ? (bt.add(this._chart, i3), true) : void 0;
          }
        }
        function As(t2, e2) {
          const i3 = t2 && t2.options || {}, s2 = i3.reverse, n2 = void 0 === i3.min ? e2 : 0, o2 = void 0 === i3.max ? e2 : 0;
          return { start: s2 ? o2 : n2, end: s2 ? n2 : o2 };
        }
        function Ts(t2, e2) {
          const i3 = [], s2 = t2._getSortedDatasetMetas(e2);
          let n2, o2;
          for (n2 = 0, o2 = s2.length; n2 < o2; ++n2)
            i3.push(s2[n2].index);
          return i3;
        }
        function Ls(t2, e2, i3, s2 = {}) {
          const n2 = t2.keys, o2 = "single" === s2.mode;
          let r2, l2, h2, c2;
          if (null !== e2) {
            for (r2 = 0, l2 = n2.length; r2 < l2; ++r2) {
              if (h2 = +n2[r2], h2 === i3) {
                if (s2.all)
                  continue;
                break;
              }
              c2 = t2.values[h2], a(c2) && (o2 || 0 === e2 || F(e2) === F(c2)) && (e2 += c2);
            }
            return e2;
          }
        }
        function Es(t2, e2) {
          const i3 = t2 && t2.options.stacked;
          return i3 || void 0 === i3 && void 0 !== e2.stack;
        }
        function Rs(t2, e2, i3) {
          const s2 = t2[e2] || (t2[e2] = {});
          return s2[i3] || (s2[i3] = {});
        }
        function Is(t2, e2, i3, s2) {
          for (const n2 of e2.getMatchingVisibleMetas(s2).reverse()) {
            const e3 = t2[n2.index];
            if (i3 && e3 > 0 || !i3 && e3 < 0)
              return n2.index;
          }
          return null;
        }
        function zs(t2, e2) {
          const { chart: i3, _cachedMeta: s2 } = t2, n2 = i3._stacks || (i3._stacks = {}), { iScale: o2, vScale: a2, index: r2 } = s2, l2 = o2.axis, h2 = a2.axis, c2 = function(t3, e3, i4) {
            return `${t3.id}.${e3.id}.${i4.stack || i4.type}`;
          }(o2, a2, s2), d2 = e2.length;
          let u2;
          for (let t3 = 0; t3 < d2; ++t3) {
            const i4 = e2[t3], { [l2]: o3, [h2]: d3 } = i4;
            u2 = (i4._stacks || (i4._stacks = {}))[h2] = Rs(n2, c2, o3), u2[r2] = d3, u2._top = Is(u2, a2, true, s2.type), u2._bottom = Is(u2, a2, false, s2.type);
            (u2._visualValues || (u2._visualValues = {}))[r2] = d3;
          }
        }
        function Fs(t2, e2) {
          const i3 = t2.scales;
          return Object.keys(i3).filter((t3) => i3[t3].axis === e2).shift();
        }
        function Vs(t2, e2) {
          const i3 = t2.controller.index, s2 = t2.vScale && t2.vScale.axis;
          if (s2) {
            e2 = e2 || t2._parsed;
            for (const t3 of e2) {
              const e3 = t3._stacks;
              if (!e3 || void 0 === e3[s2] || void 0 === e3[s2][i3])
                return;
              delete e3[s2][i3], void 0 !== e3[s2]._visualValues && void 0 !== e3[s2]._visualValues[i3] && delete e3[s2]._visualValues[i3];
            }
          }
        }
        const Bs = (t2) => "reset" === t2 || "none" === t2, Ws = (t2, e2) => e2 ? t2 : Object.assign({}, t2);
        class Ns {
          constructor(t2, e2) {
            this.chart = t2, this._ctx = t2.ctx, this.index = e2, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = false, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = false, this.supportsDecimation = false, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
          }
          initialize() {
            const t2 = this._cachedMeta;
            this.configure(), this.linkScales(), t2._stacked = Es(t2.vScale, t2), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
          }
          updateIndex(t2) {
            this.index !== t2 && Vs(this._cachedMeta), this.index = t2;
          }
          linkScales() {
            const t2 = this.chart, e2 = this._cachedMeta, i3 = this.getDataset(), s2 = (t3, e3, i4, s3) => "x" === t3 ? e3 : "r" === t3 ? s3 : i4, n2 = e2.xAxisID = l(i3.xAxisID, Fs(t2, "x")), o2 = e2.yAxisID = l(i3.yAxisID, Fs(t2, "y")), a2 = e2.rAxisID = l(i3.rAxisID, Fs(t2, "r")), r2 = e2.indexAxis, h2 = e2.iAxisID = s2(r2, n2, o2, a2), c2 = e2.vAxisID = s2(r2, o2, n2, a2);
            e2.xScale = this.getScaleForId(n2), e2.yScale = this.getScaleForId(o2), e2.rScale = this.getScaleForId(a2), e2.iScale = this.getScaleForId(h2), e2.vScale = this.getScaleForId(c2);
          }
          getDataset() {
            return this.chart.data.datasets[this.index];
          }
          getMeta() {
            return this.chart.getDatasetMeta(this.index);
          }
          getScaleForId(t2) {
            return this.chart.scales[t2];
          }
          _getOtherScale(t2) {
            const e2 = this._cachedMeta;
            return t2 === e2.iScale ? e2.vScale : e2.iScale;
          }
          reset() {
            this._update("reset");
          }
          _destroy() {
            const t2 = this._cachedMeta;
            this._data && rt(this._data, this), t2._stacked && Vs(t2);
          }
          _dataCheck() {
            const t2 = this.getDataset(), e2 = t2.data || (t2.data = []), i3 = this._data;
            if (o(e2)) {
              const t3 = this._cachedMeta;
              this._data = function(t4, e3) {
                const { iScale: i4, vScale: s2 } = e3, n2 = "x" === i4.axis ? "x" : "y", o2 = "x" === s2.axis ? "x" : "y", a2 = Object.keys(t4), r2 = new Array(a2.length);
                let l2, h2, c2;
                for (l2 = 0, h2 = a2.length; l2 < h2; ++l2)
                  c2 = a2[l2], r2[l2] = { [n2]: c2, [o2]: t4[c2] };
                return r2;
              }(e2, t3);
            } else if (i3 !== e2) {
              if (i3) {
                rt(i3, this);
                const t3 = this._cachedMeta;
                Vs(t3), t3._parsed = [];
              }
              e2 && Object.isExtensible(e2) && at(e2, this), this._syncList = [], this._data = e2;
            }
          }
          addElements() {
            const t2 = this._cachedMeta;
            this._dataCheck(), this.datasetElementType && (t2.dataset = new this.datasetElementType());
          }
          buildOrUpdateElements(t2) {
            const e2 = this._cachedMeta, i3 = this.getDataset();
            let s2 = false;
            this._dataCheck();
            const n2 = e2._stacked;
            e2._stacked = Es(e2.vScale, e2), e2.stack !== i3.stack && (s2 = true, Vs(e2), e2.stack = i3.stack), this._resyncElements(t2), (s2 || n2 !== e2._stacked) && zs(this, e2._parsed);
          }
          configure() {
            const t2 = this.chart.config, e2 = t2.datasetScopeKeys(this._type), i3 = t2.getOptionScopes(this.getDataset(), e2, true);
            this.options = t2.createResolver(i3, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
          }
          parse(t2, e2) {
            const { _cachedMeta: i3, _data: s2 } = this, { iScale: a2, _stacked: r2 } = i3, l2 = a2.axis;
            let h2, c2, d2, u2 = 0 === t2 && e2 === s2.length || i3._sorted, f2 = t2 > 0 && i3._parsed[t2 - 1];
            if (false === this._parsing)
              i3._parsed = s2, i3._sorted = true, d2 = s2;
            else {
              d2 = n(s2[t2]) ? this.parseArrayData(i3, s2, t2, e2) : o(s2[t2]) ? this.parseObjectData(i3, s2, t2, e2) : this.parsePrimitiveData(i3, s2, t2, e2);
              const a3 = () => null === c2[l2] || f2 && c2[l2] < f2[l2];
              for (h2 = 0; h2 < e2; ++h2)
                i3._parsed[h2 + t2] = c2 = d2[h2], u2 && (a3() && (u2 = false), f2 = c2);
              i3._sorted = u2;
            }
            r2 && zs(this, d2);
          }
          parsePrimitiveData(t2, e2, i3, s2) {
            const { iScale: n2, vScale: o2 } = t2, a2 = n2.axis, r2 = o2.axis, l2 = n2.getLabels(), h2 = n2 === o2, c2 = new Array(s2);
            let d2, u2, f2;
            for (d2 = 0, u2 = s2; d2 < u2; ++d2)
              f2 = d2 + i3, c2[d2] = { [a2]: h2 || n2.parse(l2[f2], f2), [r2]: o2.parse(e2[f2], f2) };
            return c2;
          }
          parseArrayData(t2, e2, i3, s2) {
            const { xScale: n2, yScale: o2 } = t2, a2 = new Array(s2);
            let r2, l2, h2, c2;
            for (r2 = 0, l2 = s2; r2 < l2; ++r2)
              h2 = r2 + i3, c2 = e2[h2], a2[r2] = { x: n2.parse(c2[0], h2), y: o2.parse(c2[1], h2) };
            return a2;
          }
          parseObjectData(t2, e2, i3, s2) {
            const { xScale: n2, yScale: o2 } = t2, { xAxisKey: a2 = "x", yAxisKey: r2 = "y" } = this._parsing, l2 = new Array(s2);
            let h2, c2, d2, u2;
            for (h2 = 0, c2 = s2; h2 < c2; ++h2)
              d2 = h2 + i3, u2 = e2[d2], l2[h2] = { x: n2.parse(M(u2, a2), d2), y: o2.parse(M(u2, r2), d2) };
            return l2;
          }
          getParsed(t2) {
            return this._cachedMeta._parsed[t2];
          }
          getDataElement(t2) {
            return this._cachedMeta.data[t2];
          }
          applyStack(t2, e2, i3) {
            const s2 = this.chart, n2 = this._cachedMeta, o2 = e2[t2.axis];
            return Ls({ keys: Ts(s2, true), values: e2._stacks[t2.axis]._visualValues }, o2, n2.index, { mode: i3 });
          }
          updateRangeFromParsed(t2, e2, i3, s2) {
            const n2 = i3[e2.axis];
            let o2 = null === n2 ? NaN : n2;
            const a2 = s2 && i3._stacks[e2.axis];
            s2 && a2 && (s2.values = a2, o2 = Ls(s2, n2, this._cachedMeta.index)), t2.min = Math.min(t2.min, o2), t2.max = Math.max(t2.max, o2);
          }
          getMinMax(t2, e2) {
            const i3 = this._cachedMeta, s2 = i3._parsed, n2 = i3._sorted && t2 === i3.iScale, o2 = s2.length, r2 = this._getOtherScale(t2), l2 = ((t3, e3, i4) => t3 && !e3.hidden && e3._stacked && { keys: Ts(i4, true), values: null })(e2, i3, this.chart), h2 = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY }, { min: c2, max: d2 } = function(t3) {
              const { min: e3, max: i4, minDefined: s3, maxDefined: n3 } = t3.getUserBounds();
              return { min: s3 ? e3 : Number.NEGATIVE_INFINITY, max: n3 ? i4 : Number.POSITIVE_INFINITY };
            }(r2);
            let u2, f2;
            function g2() {
              f2 = s2[u2];
              const e3 = f2[r2.axis];
              return !a(f2[t2.axis]) || c2 > e3 || d2 < e3;
            }
            for (u2 = 0; u2 < o2 && (g2() || (this.updateRangeFromParsed(h2, t2, f2, l2), !n2)); ++u2)
              ;
            if (n2) {
              for (u2 = o2 - 1; u2 >= 0; --u2)
                if (!g2()) {
                  this.updateRangeFromParsed(h2, t2, f2, l2);
                  break;
                }
            }
            return h2;
          }
          getAllParsedValues(t2) {
            const e2 = this._cachedMeta._parsed, i3 = [];
            let s2, n2, o2;
            for (s2 = 0, n2 = e2.length; s2 < n2; ++s2)
              o2 = e2[s2][t2.axis], a(o2) && i3.push(o2);
            return i3;
          }
          getMaxOverflow() {
            return false;
          }
          getLabelAndValue(t2) {
            const e2 = this._cachedMeta, i3 = e2.iScale, s2 = e2.vScale, n2 = this.getParsed(t2);
            return { label: i3 ? "" + i3.getLabelForValue(n2[i3.axis]) : "", value: s2 ? "" + s2.getLabelForValue(n2[s2.axis]) : "" };
          }
          _update(t2) {
            const e2 = this._cachedMeta;
            this.update(t2 || "default"), e2._clip = function(t3) {
              let e3, i3, s2, n2;
              return o(t3) ? (e3 = t3.top, i3 = t3.right, s2 = t3.bottom, n2 = t3.left) : e3 = i3 = s2 = n2 = t3, { top: e3, right: i3, bottom: s2, left: n2, disabled: false === t3 };
            }(l(this.options.clip, function(t3, e3, i3) {
              if (false === i3)
                return false;
              const s2 = As(t3, i3), n2 = As(e3, i3);
              return { top: n2.end, right: s2.end, bottom: n2.start, left: s2.start };
            }(e2.xScale, e2.yScale, this.getMaxOverflow())));
          }
          update(t2) {
          }
          draw() {
            const t2 = this._ctx, e2 = this.chart, i3 = this._cachedMeta, s2 = i3.data || [], n2 = e2.chartArea, o2 = [], a2 = this._drawStart || 0, r2 = this._drawCount || s2.length - a2, l2 = this.options.drawActiveElementsOnTop;
            let h2;
            for (i3.dataset && i3.dataset.draw(t2, n2, a2, r2), h2 = a2; h2 < a2 + r2; ++h2) {
              const e3 = s2[h2];
              e3.hidden || (e3.active && l2 ? o2.push(e3) : e3.draw(t2, n2));
            }
            for (h2 = 0; h2 < o2.length; ++h2)
              o2[h2].draw(t2, n2);
          }
          getStyle(t2, e2) {
            const i3 = e2 ? "active" : "default";
            return void 0 === t2 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(i3) : this.resolveDataElementOptions(t2 || 0, i3);
          }
          getContext(t2, e2, i3) {
            const s2 = this.getDataset();
            let n2;
            if (t2 >= 0 && t2 < this._cachedMeta.data.length) {
              const e3 = this._cachedMeta.data[t2];
              n2 = e3.$context || (e3.$context = function(t3, e4, i4) {
                return Ci(t3, { active: false, dataIndex: e4, parsed: void 0, raw: void 0, element: i4, index: e4, mode: "default", type: "data" });
              }(this.getContext(), t2, e3)), n2.parsed = this.getParsed(t2), n2.raw = s2.data[t2], n2.index = n2.dataIndex = t2;
            } else
              n2 = this.$context || (this.$context = function(t3, e3) {
                return Ci(t3, { active: false, dataset: void 0, datasetIndex: e3, index: e3, mode: "default", type: "dataset" });
              }(this.chart.getContext(), this.index)), n2.dataset = s2, n2.index = n2.datasetIndex = this.index;
            return n2.active = !!e2, n2.mode = i3, n2;
          }
          resolveDatasetElementOptions(t2) {
            return this._resolveElementOptions(this.datasetElementType.id, t2);
          }
          resolveDataElementOptions(t2, e2) {
            return this._resolveElementOptions(this.dataElementType.id, e2, t2);
          }
          _resolveElementOptions(t2, e2 = "default", i3) {
            const s2 = "active" === e2, n2 = this._cachedDataOpts, o2 = t2 + "-" + e2, a2 = n2[o2], r2 = this.enableOptionSharing && k(i3);
            if (a2)
              return Ws(a2, r2);
            const l2 = this.chart.config, h2 = l2.datasetElementScopeKeys(this._type, t2), c2 = s2 ? [`${t2}Hover`, "hover", t2, ""] : [t2, ""], d2 = l2.getOptionScopes(this.getDataset(), h2), u2 = Object.keys(ue.elements[t2]), f2 = l2.resolveNamedOptions(d2, u2, () => this.getContext(i3, s2, e2), c2);
            return f2.$shared && (f2.$shared = r2, n2[o2] = Object.freeze(Ws(f2, r2))), f2;
          }
          _resolveAnimations(t2, e2, i3) {
            const s2 = this.chart, n2 = this._cachedDataOpts, o2 = `animation-${e2}`, a2 = n2[o2];
            if (a2)
              return a2;
            let r2;
            if (false !== s2.options.animation) {
              const s3 = this.chart.config, n3 = s3.datasetAnimationScopeKeys(this._type, e2), o3 = s3.getOptionScopes(this.getDataset(), n3);
              r2 = s3.createResolver(o3, this.getContext(t2, i3, e2));
            }
            const l2 = new Os(s2, r2 && r2.animations);
            return r2 && r2._cacheable && (n2[o2] = Object.freeze(l2)), l2;
          }
          getSharedOptions(t2) {
            if (t2.$shared)
              return this._sharedOptions || (this._sharedOptions = Object.assign({}, t2));
          }
          includeOptions(t2, e2) {
            return !e2 || Bs(t2) || this.chart._animationsDisabled;
          }
          _getSharedOptions(t2, e2) {
            const i3 = this.resolveDataElementOptions(t2, e2), s2 = this._sharedOptions, n2 = this.getSharedOptions(i3), o2 = this.includeOptions(e2, n2) || n2 !== s2;
            return this.updateSharedOptions(n2, e2, i3), { sharedOptions: n2, includeOptions: o2 };
          }
          updateElement(t2, e2, i3, s2) {
            Bs(s2) ? Object.assign(t2, i3) : this._resolveAnimations(e2, s2).update(t2, i3);
          }
          updateSharedOptions(t2, e2, i3) {
            t2 && !Bs(e2) && this._resolveAnimations(void 0, e2).update(t2, i3);
          }
          _setStyle(t2, e2, i3, s2) {
            t2.active = s2;
            const n2 = this.getStyle(e2, s2);
            this._resolveAnimations(e2, i3, s2).update(t2, { options: !s2 && this.getSharedOptions(n2) || n2 });
          }
          removeHoverStyle(t2, e2, i3) {
            this._setStyle(t2, i3, "active", false);
          }
          setHoverStyle(t2, e2, i3) {
            this._setStyle(t2, i3, "active", true);
          }
          _removeDatasetHoverStyle() {
            const t2 = this._cachedMeta.dataset;
            t2 && this._setStyle(t2, void 0, "active", false);
          }
          _setDatasetHoverStyle() {
            const t2 = this._cachedMeta.dataset;
            t2 && this._setStyle(t2, void 0, "active", true);
          }
          _resyncElements(t2) {
            const e2 = this._data, i3 = this._cachedMeta.data;
            for (const [t3, e3, i4] of this._syncList)
              this[t3](e3, i4);
            this._syncList = [];
            const s2 = i3.length, n2 = e2.length, o2 = Math.min(n2, s2);
            o2 && this.parse(0, o2), n2 > s2 ? this._insertElements(s2, n2 - s2, t2) : n2 < s2 && this._removeElements(n2, s2 - n2);
          }
          _insertElements(t2, e2, i3 = true) {
            const s2 = this._cachedMeta, n2 = s2.data, o2 = t2 + e2;
            let a2;
            const r2 = (t3) => {
              for (t3.length += e2, a2 = t3.length - 1; a2 >= o2; a2--)
                t3[a2] = t3[a2 - e2];
            };
            for (r2(n2), a2 = t2; a2 < o2; ++a2)
              n2[a2] = new this.dataElementType();
            this._parsing && r2(s2._parsed), this.parse(t2, e2), i3 && this.updateElements(n2, t2, e2, "reset");
          }
          updateElements(t2, e2, i3, s2) {
          }
          _removeElements(t2, e2) {
            const i3 = this._cachedMeta;
            if (this._parsing) {
              const s2 = i3._parsed.splice(t2, e2);
              i3._stacked && Vs(i3, s2);
            }
            i3.data.splice(t2, e2);
          }
          _sync(t2) {
            if (this._parsing)
              this._syncList.push(t2);
            else {
              const [e2, i3, s2] = t2;
              this[e2](i3, s2);
            }
            this.chart._dataChanges.push([this.index, ...t2]);
          }
          _onDataPush() {
            const t2 = arguments.length;
            this._sync(["_insertElements", this.getDataset().data.length - t2, t2]);
          }
          _onDataPop() {
            this._sync(["_removeElements", this._cachedMeta.data.length - 1, 1]);
          }
          _onDataShift() {
            this._sync(["_removeElements", 0, 1]);
          }
          _onDataSplice(t2, e2) {
            e2 && this._sync(["_removeElements", t2, e2]);
            const i3 = arguments.length - 2;
            i3 && this._sync(["_insertElements", t2, i3]);
          }
          _onDataUnshift() {
            this._sync(["_insertElements", 0, arguments.length]);
          }
        }
        __publicField(Ns, "defaults", {});
        __publicField(Ns, "datasetElementType", null);
        __publicField(Ns, "dataElementType", null);
        class Hs {
          constructor() {
            __publicField(this, "x");
            __publicField(this, "y");
            __publicField(this, "active", false);
            __publicField(this, "options");
            __publicField(this, "$animations");
          }
          tooltipPosition(t2) {
            const { x: e2, y: i3 } = this.getProps(["x", "y"], t2);
            return { x: e2, y: i3 };
          }
          hasValue() {
            return N(this.x) && N(this.y);
          }
          getProps(t2, e2) {
            const i3 = this.$animations;
            if (!e2 || !i3)
              return this;
            const s2 = {};
            return t2.forEach((t3) => {
              s2[t3] = i3[t3] && i3[t3].active() ? i3[t3]._to : this[t3];
            }), s2;
          }
        }
        __publicField(Hs, "defaults", {});
        __publicField(Hs, "defaultRoutes");
        function js(t2, e2) {
          const i3 = t2.options.ticks, n2 = function(t3) {
            const e3 = t3.options.offset, i4 = t3._tickSize(), s2 = t3._length / i4 + (e3 ? 0 : 1), n3 = t3._maxLength / i4;
            return Math.floor(Math.min(s2, n3));
          }(t2), o2 = Math.min(i3.maxTicksLimit || n2, n2), a2 = i3.major.enabled ? function(t3) {
            const e3 = [];
            let i4, s2;
            for (i4 = 0, s2 = t3.length; i4 < s2; i4++)
              t3[i4].major && e3.push(i4);
            return e3;
          }(e2) : [], r2 = a2.length, l2 = a2[0], h2 = a2[r2 - 1], c2 = [];
          if (r2 > o2)
            return function(t3, e3, i4, s2) {
              let n3, o3 = 0, a3 = i4[0];
              for (s2 = Math.ceil(s2), n3 = 0; n3 < t3.length; n3++)
                n3 === a3 && (e3.push(t3[n3]), o3++, a3 = i4[o3 * s2]);
            }(e2, c2, a2, r2 / o2), c2;
          const d2 = function(t3, e3, i4) {
            const s2 = function(t4) {
              const e4 = t4.length;
              let i5, s3;
              if (e4 < 2)
                return false;
              for (s3 = t4[0], i5 = 1; i5 < e4; ++i5)
                if (t4[i5] - t4[i5 - 1] !== s3)
                  return false;
              return s3;
            }(t3), n3 = e3.length / i4;
            if (!s2)
              return Math.max(n3, 1);
            const o3 = W(s2);
            for (let t4 = 0, e4 = o3.length - 1; t4 < e4; t4++) {
              const e5 = o3[t4];
              if (e5 > n3)
                return e5;
            }
            return Math.max(n3, 1);
          }(a2, e2, o2);
          if (r2 > 0) {
            let t3, i4;
            const n3 = r2 > 1 ? Math.round((h2 - l2) / (r2 - 1)) : null;
            for ($s(e2, c2, d2, s(n3) ? 0 : l2 - n3, l2), t3 = 0, i4 = r2 - 1; t3 < i4; t3++)
              $s(e2, c2, d2, a2[t3], a2[t3 + 1]);
            return $s(e2, c2, d2, h2, s(n3) ? e2.length : h2 + n3), c2;
          }
          return $s(e2, c2, d2), c2;
        }
        function $s(t2, e2, i3, s2, n2) {
          const o2 = l(s2, 0), a2 = Math.min(l(n2, t2.length), t2.length);
          let r2, h2, c2, d2 = 0;
          for (i3 = Math.ceil(i3), n2 && (r2 = n2 - s2, i3 = r2 / Math.floor(r2 / i3)), c2 = o2; c2 < 0; )
            d2++, c2 = Math.round(o2 + d2 * i3);
          for (h2 = Math.max(o2, 0); h2 < a2; h2++)
            h2 === c2 && (e2.push(t2[h2]), d2++, c2 = Math.round(o2 + d2 * i3));
        }
        const Ys = (t2, e2, i3) => "top" === e2 || "left" === e2 ? t2[e2] + i3 : t2[e2] - i3, Us = (t2, e2) => Math.min(e2 || t2, t2);
        function Xs(t2, e2) {
          const i3 = [], s2 = t2.length / e2, n2 = t2.length;
          let o2 = 0;
          for (; o2 < n2; o2 += s2)
            i3.push(t2[Math.floor(o2)]);
          return i3;
        }
        function qs(t2, e2, i3) {
          const s2 = t2.ticks.length, n2 = Math.min(e2, s2 - 1), o2 = t2._startPixel, a2 = t2._endPixel, r2 = 1e-6;
          let l2, h2 = t2.getPixelForTick(n2);
          if (!(i3 && (l2 = 1 === s2 ? Math.max(h2 - o2, a2 - h2) : 0 === e2 ? (t2.getPixelForTick(1) - h2) / 2 : (h2 - t2.getPixelForTick(n2 - 1)) / 2, h2 += n2 < e2 ? l2 : -l2, h2 < o2 - r2 || h2 > a2 + r2)))
            return h2;
        }
        function Ks(t2) {
          return t2.drawTicks ? t2.tickLength : 0;
        }
        function Gs(t2, e2) {
          if (!t2.display)
            return 0;
          const i3 = Si(t2.font, e2), s2 = ki(t2.padding);
          return (n(t2.text) ? t2.text.length : 1) * i3.lineHeight + s2.height;
        }
        function Zs(t2, e2, i3) {
          let s2 = ut(t2);
          return (i3 && "right" !== e2 || !i3 && "right" === e2) && (s2 = ((t3) => "left" === t3 ? "right" : "right" === t3 ? "left" : t3)(s2)), s2;
        }
        class Js extends Hs {
          constructor(t2) {
            super(), this.id = t2.id, this.type = t2.type, this.options = void 0, this.ctx = t2.ctx, this.chart = t2.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = { left: 0, right: 0, top: 0, bottom: 0 }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = false, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = false, this.$context = void 0;
          }
          init(t2) {
            this.options = t2.setContext(this.getContext()), this.axis = t2.axis, this._userMin = this.parse(t2.min), this._userMax = this.parse(t2.max), this._suggestedMin = this.parse(t2.suggestedMin), this._suggestedMax = this.parse(t2.suggestedMax);
          }
          parse(t2, e2) {
            return t2;
          }
          getUserBounds() {
            let { _userMin: t2, _userMax: e2, _suggestedMin: i3, _suggestedMax: s2 } = this;
            return t2 = r(t2, Number.POSITIVE_INFINITY), e2 = r(e2, Number.NEGATIVE_INFINITY), i3 = r(i3, Number.POSITIVE_INFINITY), s2 = r(s2, Number.NEGATIVE_INFINITY), { min: r(t2, i3), max: r(e2, s2), minDefined: a(t2), maxDefined: a(e2) };
          }
          getMinMax(t2) {
            let e2, { min: i3, max: s2, minDefined: n2, maxDefined: o2 } = this.getUserBounds();
            if (n2 && o2)
              return { min: i3, max: s2 };
            const a2 = this.getMatchingVisibleMetas();
            for (let r2 = 0, l2 = a2.length; r2 < l2; ++r2)
              e2 = a2[r2].controller.getMinMax(this, t2), n2 || (i3 = Math.min(i3, e2.min)), o2 || (s2 = Math.max(s2, e2.max));
            return i3 = o2 && i3 > s2 ? s2 : i3, s2 = n2 && i3 > s2 ? i3 : s2, { min: r(i3, r(s2, i3)), max: r(s2, r(i3, s2)) };
          }
          getPadding() {
            return { left: this.paddingLeft || 0, top: this.paddingTop || 0, right: this.paddingRight || 0, bottom: this.paddingBottom || 0 };
          }
          getTicks() {
            return this.ticks;
          }
          getLabels() {
            const t2 = this.chart.data;
            return this.options.labels || (this.isHorizontal() ? t2.xLabels : t2.yLabels) || t2.labels || [];
          }
          getLabelItems(t2 = this.chart.chartArea) {
            return this._labelItems || (this._labelItems = this._computeLabelItems(t2));
          }
          beforeLayout() {
            this._cache = {}, this._dataLimitsCached = false;
          }
          beforeUpdate() {
            d(this.options.beforeUpdate, [this]);
          }
          update(t2, e2, i3) {
            const { beginAtZero: s2, grace: n2, ticks: o2 } = this.options, a2 = o2.sampleSize;
            this.beforeUpdate(), this.maxWidth = t2, this.maxHeight = e2, this._margins = i3 = Object.assign({ left: 0, right: 0, top: 0, bottom: 0 }, i3), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + i3.left + i3.right : this.height + i3.top + i3.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = Di(this, n2, s2), this._dataLimitsCached = true), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
            const r2 = a2 < this.ticks.length;
            this._convertTicksToLabels(r2 ? Xs(this.ticks, a2) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), o2.display && (o2.autoSkip || "auto" === o2.source) && (this.ticks = js(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), r2 && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
          }
          configure() {
            let t2, e2, i3 = this.options.reverse;
            this.isHorizontal() ? (t2 = this.left, e2 = this.right) : (t2 = this.top, e2 = this.bottom, i3 = !i3), this._startPixel = t2, this._endPixel = e2, this._reversePixels = i3, this._length = e2 - t2, this._alignToPixels = this.options.alignToPixels;
          }
          afterUpdate() {
            d(this.options.afterUpdate, [this]);
          }
          beforeSetDimensions() {
            d(this.options.beforeSetDimensions, [this]);
          }
          setDimensions() {
            this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
          }
          afterSetDimensions() {
            d(this.options.afterSetDimensions, [this]);
          }
          _callHooks(t2) {
            this.chart.notifyPlugins(t2, this.getContext()), d(this.options[t2], [this]);
          }
          beforeDataLimits() {
            this._callHooks("beforeDataLimits");
          }
          determineDataLimits() {
          }
          afterDataLimits() {
            this._callHooks("afterDataLimits");
          }
          beforeBuildTicks() {
            this._callHooks("beforeBuildTicks");
          }
          buildTicks() {
            return [];
          }
          afterBuildTicks() {
            this._callHooks("afterBuildTicks");
          }
          beforeTickToLabelConversion() {
            d(this.options.beforeTickToLabelConversion, [this]);
          }
          generateTickLabels(t2) {
            const e2 = this.options.ticks;
            let i3, s2, n2;
            for (i3 = 0, s2 = t2.length; i3 < s2; i3++)
              n2 = t2[i3], n2.label = d(e2.callback, [n2.value, i3, t2], this);
          }
          afterTickToLabelConversion() {
            d(this.options.afterTickToLabelConversion, [this]);
          }
          beforeCalculateLabelRotation() {
            d(this.options.beforeCalculateLabelRotation, [this]);
          }
          calculateLabelRotation() {
            const t2 = this.options, e2 = t2.ticks, i3 = Us(this.ticks.length, t2.ticks.maxTicksLimit), s2 = e2.minRotation || 0, n2 = e2.maxRotation;
            let o2, a2, r2, l2 = s2;
            if (!this._isVisible() || !e2.display || s2 >= n2 || i3 <= 1 || !this.isHorizontal())
              return void (this.labelRotation = s2);
            const h2 = this._getLabelSizes(), c2 = h2.widest.width, d2 = h2.highest.height, u2 = J(this.chart.width - c2, 0, this.maxWidth);
            o2 = t2.offset ? this.maxWidth / i3 : u2 / (i3 - 1), c2 + 6 > o2 && (o2 = u2 / (i3 - (t2.offset ? 0.5 : 1)), a2 = this.maxHeight - Ks(t2.grid) - e2.padding - Gs(t2.title, this.chart.options.font), r2 = Math.sqrt(c2 * c2 + d2 * d2), l2 = Y(Math.min(Math.asin(J((h2.highest.height + 6) / o2, -1, 1)), Math.asin(J(a2 / r2, -1, 1)) - Math.asin(J(d2 / r2, -1, 1)))), l2 = Math.max(s2, Math.min(n2, l2))), this.labelRotation = l2;
          }
          afterCalculateLabelRotation() {
            d(this.options.afterCalculateLabelRotation, [this]);
          }
          afterAutoSkip() {
          }
          beforeFit() {
            d(this.options.beforeFit, [this]);
          }
          fit() {
            const t2 = { width: 0, height: 0 }, { chart: e2, options: { ticks: i3, title: s2, grid: n2 } } = this, o2 = this._isVisible(), a2 = this.isHorizontal();
            if (o2) {
              const o3 = Gs(s2, e2.options.font);
              if (a2 ? (t2.width = this.maxWidth, t2.height = Ks(n2) + o3) : (t2.height = this.maxHeight, t2.width = Ks(n2) + o3), i3.display && this.ticks.length) {
                const { first: e3, last: s3, widest: n3, highest: o4 } = this._getLabelSizes(), r2 = 2 * i3.padding, l2 = $(this.labelRotation), h2 = Math.cos(l2), c2 = Math.sin(l2);
                if (a2) {
                  const e4 = i3.mirror ? 0 : c2 * n3.width + h2 * o4.height;
                  t2.height = Math.min(this.maxHeight, t2.height + e4 + r2);
                } else {
                  const e4 = i3.mirror ? 0 : h2 * n3.width + c2 * o4.height;
                  t2.width = Math.min(this.maxWidth, t2.width + e4 + r2);
                }
                this._calculatePadding(e3, s3, c2, h2);
              }
            }
            this._handleMargins(), a2 ? (this.width = this._length = e2.width - this._margins.left - this._margins.right, this.height = t2.height) : (this.width = t2.width, this.height = this._length = e2.height - this._margins.top - this._margins.bottom);
          }
          _calculatePadding(t2, e2, i3, s2) {
            const { ticks: { align: n2, padding: o2 }, position: a2 } = this.options, r2 = 0 !== this.labelRotation, l2 = "top" !== a2 && "x" === this.axis;
            if (this.isHorizontal()) {
              const a3 = this.getPixelForTick(0) - this.left, h2 = this.right - this.getPixelForTick(this.ticks.length - 1);
              let c2 = 0, d2 = 0;
              r2 ? l2 ? (c2 = s2 * t2.width, d2 = i3 * e2.height) : (c2 = i3 * t2.height, d2 = s2 * e2.width) : "start" === n2 ? d2 = e2.width : "end" === n2 ? c2 = t2.width : "inner" !== n2 && (c2 = t2.width / 2, d2 = e2.width / 2), this.paddingLeft = Math.max((c2 - a3 + o2) * this.width / (this.width - a3), 0), this.paddingRight = Math.max((d2 - h2 + o2) * this.width / (this.width - h2), 0);
            } else {
              let i4 = e2.height / 2, s3 = t2.height / 2;
              "start" === n2 ? (i4 = 0, s3 = t2.height) : "end" === n2 && (i4 = e2.height, s3 = 0), this.paddingTop = i4 + o2, this.paddingBottom = s3 + o2;
            }
          }
          _handleMargins() {
            this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
          }
          afterFit() {
            d(this.options.afterFit, [this]);
          }
          isHorizontal() {
            const { axis: t2, position: e2 } = this.options;
            return "top" === e2 || "bottom" === e2 || "x" === t2;
          }
          isFullSize() {
            return this.options.fullSize;
          }
          _convertTicksToLabels(t2) {
            let e2, i3;
            for (this.beforeTickToLabelConversion(), this.generateTickLabels(t2), e2 = 0, i3 = t2.length; e2 < i3; e2++)
              s(t2[e2].label) && (t2.splice(e2, 1), i3--, e2--);
            this.afterTickToLabelConversion();
          }
          _getLabelSizes() {
            let t2 = this._labelSizes;
            if (!t2) {
              const e2 = this.options.ticks.sampleSize;
              let i3 = this.ticks;
              e2 < i3.length && (i3 = Xs(i3, e2)), this._labelSizes = t2 = this._computeLabelSizes(i3, i3.length, this.options.ticks.maxTicksLimit);
            }
            return t2;
          }
          _computeLabelSizes(t2, e2, i3) {
            const { ctx: o2, _longestTextCache: a2 } = this, r2 = [], l2 = [], h2 = Math.floor(e2 / Us(e2, i3));
            let c2, d2, f2, g2, p2, m2, x2, b2, _2, y2, v2, M2 = 0, w2 = 0;
            for (c2 = 0; c2 < e2; c2 += h2) {
              if (g2 = t2[c2].label, p2 = this._resolveTickFontOptions(c2), o2.font = m2 = p2.string, x2 = a2[m2] = a2[m2] || { data: {}, gc: [] }, b2 = p2.lineHeight, _2 = y2 = 0, s(g2) || n(g2)) {
                if (n(g2))
                  for (d2 = 0, f2 = g2.length; d2 < f2; ++d2)
                    v2 = g2[d2], s(v2) || n(v2) || (_2 = Ce(o2, x2.data, x2.gc, _2, v2), y2 += b2);
              } else
                _2 = Ce(o2, x2.data, x2.gc, _2, g2), y2 = b2;
              r2.push(_2), l2.push(y2), M2 = Math.max(_2, M2), w2 = Math.max(y2, w2);
            }
            !function(t3, e3) {
              u(t3, (t4) => {
                const i4 = t4.gc, s2 = i4.length / 2;
                let n2;
                if (s2 > e3) {
                  for (n2 = 0; n2 < s2; ++n2)
                    delete t4.data[i4[n2]];
                  i4.splice(0, s2);
                }
              });
            }(a2, e2);
            const k2 = r2.indexOf(M2), S2 = l2.indexOf(w2), P2 = (t3) => ({ width: r2[t3] || 0, height: l2[t3] || 0 });
            return { first: P2(0), last: P2(e2 - 1), widest: P2(k2), highest: P2(S2), widths: r2, heights: l2 };
          }
          getLabelForValue(t2) {
            return t2;
          }
          getPixelForValue(t2, e2) {
            return NaN;
          }
          getValueForPixel(t2) {
          }
          getPixelForTick(t2) {
            const e2 = this.ticks;
            return t2 < 0 || t2 > e2.length - 1 ? null : this.getPixelForValue(e2[t2].value);
          }
          getPixelForDecimal(t2) {
            this._reversePixels && (t2 = 1 - t2);
            const e2 = this._startPixel + t2 * this._length;
            return Q(this._alignToPixels ? Ae(this.chart, e2, 0) : e2);
          }
          getDecimalForPixel(t2) {
            const e2 = (t2 - this._startPixel) / this._length;
            return this._reversePixels ? 1 - e2 : e2;
          }
          getBasePixel() {
            return this.getPixelForValue(this.getBaseValue());
          }
          getBaseValue() {
            const { min: t2, max: e2 } = this;
            return t2 < 0 && e2 < 0 ? e2 : t2 > 0 && e2 > 0 ? t2 : 0;
          }
          getContext(t2) {
            const e2 = this.ticks || [];
            if (t2 >= 0 && t2 < e2.length) {
              const i3 = e2[t2];
              return i3.$context || (i3.$context = function(t3, e3, i4) {
                return Ci(t3, { tick: i4, index: e3, type: "tick" });
              }(this.getContext(), t2, i3));
            }
            return this.$context || (this.$context = Ci(this.chart.getContext(), { scale: this, type: "scale" }));
          }
          _tickSize() {
            const t2 = this.options.ticks, e2 = $(this.labelRotation), i3 = Math.abs(Math.cos(e2)), s2 = Math.abs(Math.sin(e2)), n2 = this._getLabelSizes(), o2 = t2.autoSkipPadding || 0, a2 = n2 ? n2.widest.width + o2 : 0, r2 = n2 ? n2.highest.height + o2 : 0;
            return this.isHorizontal() ? r2 * i3 > a2 * s2 ? a2 / i3 : r2 / s2 : r2 * s2 < a2 * i3 ? r2 / i3 : a2 / s2;
          }
          _isVisible() {
            const t2 = this.options.display;
            return "auto" !== t2 ? !!t2 : this.getMatchingVisibleMetas().length > 0;
          }
          _computeGridLineItems(t2) {
            const e2 = this.axis, i3 = this.chart, s2 = this.options, { grid: n2, position: a2, border: r2 } = s2, h2 = n2.offset, c2 = this.isHorizontal(), d2 = this.ticks.length + (h2 ? 1 : 0), u2 = Ks(n2), f2 = [], g2 = r2.setContext(this.getContext()), p2 = g2.display ? g2.width : 0, m2 = p2 / 2, x2 = function(t3) {
              return Ae(i3, t3, p2);
            };
            let b2, _2, y2, v2, M2, w2, k2, S2, P2, D2, C2, O2;
            if ("top" === a2)
              b2 = x2(this.bottom), w2 = this.bottom - u2, S2 = b2 - m2, D2 = x2(t2.top) + m2, O2 = t2.bottom;
            else if ("bottom" === a2)
              b2 = x2(this.top), D2 = t2.top, O2 = x2(t2.bottom) - m2, w2 = b2 + m2, S2 = this.top + u2;
            else if ("left" === a2)
              b2 = x2(this.right), M2 = this.right - u2, k2 = b2 - m2, P2 = x2(t2.left) + m2, C2 = t2.right;
            else if ("right" === a2)
              b2 = x2(this.left), P2 = t2.left, C2 = x2(t2.right) - m2, M2 = b2 + m2, k2 = this.left + u2;
            else if ("x" === e2) {
              if ("center" === a2)
                b2 = x2((t2.top + t2.bottom) / 2 + 0.5);
              else if (o(a2)) {
                const t3 = Object.keys(a2)[0], e3 = a2[t3];
                b2 = x2(this.chart.scales[t3].getPixelForValue(e3));
              }
              D2 = t2.top, O2 = t2.bottom, w2 = b2 + m2, S2 = w2 + u2;
            } else if ("y" === e2) {
              if ("center" === a2)
                b2 = x2((t2.left + t2.right) / 2);
              else if (o(a2)) {
                const t3 = Object.keys(a2)[0], e3 = a2[t3];
                b2 = x2(this.chart.scales[t3].getPixelForValue(e3));
              }
              M2 = b2 - m2, k2 = M2 - u2, P2 = t2.left, C2 = t2.right;
            }
            const A2 = l(s2.ticks.maxTicksLimit, d2), T2 = Math.max(1, Math.ceil(d2 / A2));
            for (_2 = 0; _2 < d2; _2 += T2) {
              const t3 = this.getContext(_2), e3 = n2.setContext(t3), s3 = r2.setContext(t3), o2 = e3.lineWidth, a3 = e3.color, l2 = s3.dash || [], d3 = s3.dashOffset, u3 = e3.tickWidth, g3 = e3.tickColor, p3 = e3.tickBorderDash || [], m3 = e3.tickBorderDashOffset;
              y2 = qs(this, _2, h2), void 0 !== y2 && (v2 = Ae(i3, y2, o2), c2 ? M2 = k2 = P2 = C2 = v2 : w2 = S2 = D2 = O2 = v2, f2.push({ tx1: M2, ty1: w2, tx2: k2, ty2: S2, x1: P2, y1: D2, x2: C2, y2: O2, width: o2, color: a3, borderDash: l2, borderDashOffset: d3, tickWidth: u3, tickColor: g3, tickBorderDash: p3, tickBorderDashOffset: m3 }));
            }
            return this._ticksLength = d2, this._borderValue = b2, f2;
          }
          _computeLabelItems(t2) {
            const e2 = this.axis, i3 = this.options, { position: s2, ticks: a2 } = i3, r2 = this.isHorizontal(), l2 = this.ticks, { align: h2, crossAlign: c2, padding: d2, mirror: u2 } = a2, f2 = Ks(i3.grid), g2 = f2 + d2, p2 = u2 ? -d2 : g2, m2 = -$(this.labelRotation), x2 = [];
            let b2, _2, y2, v2, M2, w2, k2, S2, P2, D2, C2, O2, A2 = "middle";
            if ("top" === s2)
              w2 = this.bottom - p2, k2 = this._getXAxisLabelAlignment();
            else if ("bottom" === s2)
              w2 = this.top + p2, k2 = this._getXAxisLabelAlignment();
            else if ("left" === s2) {
              const t3 = this._getYAxisLabelAlignment(f2);
              k2 = t3.textAlign, M2 = t3.x;
            } else if ("right" === s2) {
              const t3 = this._getYAxisLabelAlignment(f2);
              k2 = t3.textAlign, M2 = t3.x;
            } else if ("x" === e2) {
              if ("center" === s2)
                w2 = (t2.top + t2.bottom) / 2 + g2;
              else if (o(s2)) {
                const t3 = Object.keys(s2)[0], e3 = s2[t3];
                w2 = this.chart.scales[t3].getPixelForValue(e3) + g2;
              }
              k2 = this._getXAxisLabelAlignment();
            } else if ("y" === e2) {
              if ("center" === s2)
                M2 = (t2.left + t2.right) / 2 - g2;
              else if (o(s2)) {
                const t3 = Object.keys(s2)[0], e3 = s2[t3];
                M2 = this.chart.scales[t3].getPixelForValue(e3);
              }
              k2 = this._getYAxisLabelAlignment(f2).textAlign;
            }
            "y" === e2 && ("start" === h2 ? A2 = "top" : "end" === h2 && (A2 = "bottom"));
            const T2 = this._getLabelSizes();
            for (b2 = 0, _2 = l2.length; b2 < _2; ++b2) {
              y2 = l2[b2], v2 = y2.label;
              const t3 = a2.setContext(this.getContext(b2));
              S2 = this.getPixelForTick(b2) + a2.labelOffset, P2 = this._resolveTickFontOptions(b2), D2 = P2.lineHeight, C2 = n(v2) ? v2.length : 1;
              const e3 = C2 / 2, i4 = t3.color, o2 = t3.textStrokeColor, h3 = t3.textStrokeWidth;
              let d3, f3 = k2;
              if (r2 ? (M2 = S2, "inner" === k2 && (f3 = b2 === _2 - 1 ? this.options.reverse ? "left" : "right" : 0 === b2 ? this.options.reverse ? "right" : "left" : "center"), O2 = "top" === s2 ? "near" === c2 || 0 !== m2 ? -C2 * D2 + D2 / 2 : "center" === c2 ? -T2.highest.height / 2 - e3 * D2 + D2 : -T2.highest.height + D2 / 2 : "near" === c2 || 0 !== m2 ? D2 / 2 : "center" === c2 ? T2.highest.height / 2 - e3 * D2 : T2.highest.height - C2 * D2, u2 && (O2 *= -1), 0 === m2 || t3.showLabelBackdrop || (M2 += D2 / 2 * Math.sin(m2))) : (w2 = S2, O2 = (1 - C2) * D2 / 2), t3.showLabelBackdrop) {
                const e4 = ki(t3.backdropPadding), i5 = T2.heights[b2], s3 = T2.widths[b2];
                let n2 = O2 - e4.top, o3 = 0 - e4.left;
                switch (A2) {
                  case "middle":
                    n2 -= i5 / 2;
                    break;
                  case "bottom":
                    n2 -= i5;
                }
                switch (k2) {
                  case "center":
                    o3 -= s3 / 2;
                    break;
                  case "right":
                    o3 -= s3;
                    break;
                  case "inner":
                    b2 === _2 - 1 ? o3 -= s3 : b2 > 0 && (o3 -= s3 / 2);
                }
                d3 = { left: o3, top: n2, width: s3 + e4.width, height: i5 + e4.height, color: t3.backdropColor };
              }
              x2.push({ label: v2, font: P2, textOffset: O2, options: { rotation: m2, color: i4, strokeColor: o2, strokeWidth: h3, textAlign: f3, textBaseline: A2, translation: [M2, w2], backdrop: d3 } });
            }
            return x2;
          }
          _getXAxisLabelAlignment() {
            const { position: t2, ticks: e2 } = this.options;
            if (-$(this.labelRotation))
              return "top" === t2 ? "left" : "right";
            let i3 = "center";
            return "start" === e2.align ? i3 = "left" : "end" === e2.align ? i3 = "right" : "inner" === e2.align && (i3 = "inner"), i3;
          }
          _getYAxisLabelAlignment(t2) {
            const { position: e2, ticks: { crossAlign: i3, mirror: s2, padding: n2 } } = this.options, o2 = t2 + n2, a2 = this._getLabelSizes().widest.width;
            let r2, l2;
            return "left" === e2 ? s2 ? (l2 = this.right + n2, "near" === i3 ? r2 = "left" : "center" === i3 ? (r2 = "center", l2 += a2 / 2) : (r2 = "right", l2 += a2)) : (l2 = this.right - o2, "near" === i3 ? r2 = "right" : "center" === i3 ? (r2 = "center", l2 -= a2 / 2) : (r2 = "left", l2 = this.left)) : "right" === e2 ? s2 ? (l2 = this.left + n2, "near" === i3 ? r2 = "right" : "center" === i3 ? (r2 = "center", l2 -= a2 / 2) : (r2 = "left", l2 -= a2)) : (l2 = this.left + o2, "near" === i3 ? r2 = "left" : "center" === i3 ? (r2 = "center", l2 += a2 / 2) : (r2 = "right", l2 = this.right)) : r2 = "right", { textAlign: r2, x: l2 };
          }
          _computeLabelArea() {
            if (this.options.ticks.mirror)
              return;
            const t2 = this.chart, e2 = this.options.position;
            return "left" === e2 || "right" === e2 ? { top: 0, left: this.left, bottom: t2.height, right: this.right } : "top" === e2 || "bottom" === e2 ? { top: this.top, left: 0, bottom: this.bottom, right: t2.width } : void 0;
          }
          drawBackground() {
            const { ctx: t2, options: { backgroundColor: e2 }, left: i3, top: s2, width: n2, height: o2 } = this;
            e2 && (t2.save(), t2.fillStyle = e2, t2.fillRect(i3, s2, n2, o2), t2.restore());
          }
          getLineWidthForValue(t2) {
            const e2 = this.options.grid;
            if (!this._isVisible() || !e2.display)
              return 0;
            const i3 = this.ticks.findIndex((e3) => e3.value === t2);
            if (i3 >= 0) {
              return e2.setContext(this.getContext(i3)).lineWidth;
            }
            return 0;
          }
          drawGrid(t2) {
            const e2 = this.options.grid, i3 = this.ctx, s2 = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t2));
            let n2, o2;
            const a2 = (t3, e3, s3) => {
              s3.width && s3.color && (i3.save(), i3.lineWidth = s3.width, i3.strokeStyle = s3.color, i3.setLineDash(s3.borderDash || []), i3.lineDashOffset = s3.borderDashOffset, i3.beginPath(), i3.moveTo(t3.x, t3.y), i3.lineTo(e3.x, e3.y), i3.stroke(), i3.restore());
            };
            if (e2.display)
              for (n2 = 0, o2 = s2.length; n2 < o2; ++n2) {
                const t3 = s2[n2];
                e2.drawOnChartArea && a2({ x: t3.x1, y: t3.y1 }, { x: t3.x2, y: t3.y2 }, t3), e2.drawTicks && a2({ x: t3.tx1, y: t3.ty1 }, { x: t3.tx2, y: t3.ty2 }, { color: t3.tickColor, width: t3.tickWidth, borderDash: t3.tickBorderDash, borderDashOffset: t3.tickBorderDashOffset });
              }
          }
          drawBorder() {
            const { chart: t2, ctx: e2, options: { border: i3, grid: s2 } } = this, n2 = i3.setContext(this.getContext()), o2 = i3.display ? n2.width : 0;
            if (!o2)
              return;
            const a2 = s2.setContext(this.getContext(0)).lineWidth, r2 = this._borderValue;
            let l2, h2, c2, d2;
            this.isHorizontal() ? (l2 = Ae(t2, this.left, o2) - o2 / 2, h2 = Ae(t2, this.right, a2) + a2 / 2, c2 = d2 = r2) : (c2 = Ae(t2, this.top, o2) - o2 / 2, d2 = Ae(t2, this.bottom, a2) + a2 / 2, l2 = h2 = r2), e2.save(), e2.lineWidth = n2.width, e2.strokeStyle = n2.color, e2.beginPath(), e2.moveTo(l2, c2), e2.lineTo(h2, d2), e2.stroke(), e2.restore();
          }
          drawLabels(t2) {
            if (!this.options.ticks.display)
              return;
            const e2 = this.ctx, i3 = this._computeLabelArea();
            i3 && Ie(e2, i3);
            const s2 = this.getLabelItems(t2);
            for (const t3 of s2) {
              const i4 = t3.options, s3 = t3.font;
              Ne(e2, t3.label, 0, t3.textOffset, s3, i4);
            }
            i3 && ze(e2);
          }
          drawTitle() {
            const { ctx: t2, options: { position: e2, title: i3, reverse: s2 } } = this;
            if (!i3.display)
              return;
            const a2 = Si(i3.font), r2 = ki(i3.padding), l2 = i3.align;
            let h2 = a2.lineHeight / 2;
            "bottom" === e2 || "center" === e2 || o(e2) ? (h2 += r2.bottom, n(i3.text) && (h2 += a2.lineHeight * (i3.text.length - 1))) : h2 += r2.top;
            const { titleX: c2, titleY: d2, maxWidth: u2, rotation: f2 } = function(t3, e3, i4, s3) {
              const { top: n2, left: a3, bottom: r3, right: l3, chart: h3 } = t3, { chartArea: c3, scales: d3 } = h3;
              let u3, f3, g2, p2 = 0;
              const m2 = r3 - n2, x2 = l3 - a3;
              if (t3.isHorizontal()) {
                if (f3 = ft(s3, a3, l3), o(i4)) {
                  const t4 = Object.keys(i4)[0], s4 = i4[t4];
                  g2 = d3[t4].getPixelForValue(s4) + m2 - e3;
                } else
                  g2 = "center" === i4 ? (c3.bottom + c3.top) / 2 + m2 - e3 : Ys(t3, i4, e3);
                u3 = l3 - a3;
              } else {
                if (o(i4)) {
                  const t4 = Object.keys(i4)[0], s4 = i4[t4];
                  f3 = d3[t4].getPixelForValue(s4) - x2 + e3;
                } else
                  f3 = "center" === i4 ? (c3.left + c3.right) / 2 - x2 + e3 : Ys(t3, i4, e3);
                g2 = ft(s3, r3, n2), p2 = "left" === i4 ? -E : E;
              }
              return { titleX: f3, titleY: g2, maxWidth: u3, rotation: p2 };
            }(this, h2, e2, l2);
            Ne(t2, i3.text, 0, 0, a2, { color: i3.color, maxWidth: u2, rotation: f2, textAlign: Zs(l2, e2, s2), textBaseline: "middle", translation: [c2, d2] });
          }
          draw(t2) {
            this._isVisible() && (this.drawBackground(), this.drawGrid(t2), this.drawBorder(), this.drawTitle(), this.drawLabels(t2));
          }
          _layers() {
            const t2 = this.options, e2 = t2.ticks && t2.ticks.z || 0, i3 = l(t2.grid && t2.grid.z, -1), s2 = l(t2.border && t2.border.z, 0);
            return this._isVisible() && this.draw === Js.prototype.draw ? [{ z: i3, draw: (t3) => {
              this.drawBackground(), this.drawGrid(t3), this.drawTitle();
            } }, { z: s2, draw: () => {
              this.drawBorder();
            } }, { z: e2, draw: (t3) => {
              this.drawLabels(t3);
            } }] : [{ z: e2, draw: (t3) => {
              this.draw(t3);
            } }];
          }
          getMatchingVisibleMetas(t2) {
            const e2 = this.chart.getSortedVisibleDatasetMetas(), i3 = this.axis + "AxisID", s2 = [];
            let n2, o2;
            for (n2 = 0, o2 = e2.length; n2 < o2; ++n2) {
              const o3 = e2[n2];
              o3[i3] !== this.id || t2 && o3.type !== t2 || s2.push(o3);
            }
            return s2;
          }
          _resolveTickFontOptions(t2) {
            return Si(this.options.ticks.setContext(this.getContext(t2)).font);
          }
          _maxDigits() {
            const t2 = this._resolveTickFontOptions(0).lineHeight;
            return (this.isHorizontal() ? this.width : this.height) / t2;
          }
        }
        class Qs {
          constructor(t2, e2, i3) {
            this.type = t2, this.scope = e2, this.override = i3, this.items = /* @__PURE__ */ Object.create(null);
          }
          isForType(t2) {
            return Object.prototype.isPrototypeOf.call(this.type.prototype, t2.prototype);
          }
          register(t2) {
            const e2 = Object.getPrototypeOf(t2);
            let i3;
            (function(t3) {
              return "id" in t3 && "defaults" in t3;
            })(e2) && (i3 = this.register(e2));
            const s2 = this.items, n2 = t2.id, o2 = this.scope + "." + n2;
            if (!n2)
              throw new Error("class does not have id: " + t2);
            return n2 in s2 || (s2[n2] = t2, function(t3, e3, i4) {
              const s3 = x(/* @__PURE__ */ Object.create(null), [i4 ? ue.get(i4) : {}, ue.get(e3), t3.defaults]);
              ue.set(e3, s3), t3.defaultRoutes && function(t4, e4) {
                Object.keys(e4).forEach((i5) => {
                  const s4 = i5.split("."), n3 = s4.pop(), o3 = [t4].concat(s4).join("."), a2 = e4[i5].split("."), r2 = a2.pop(), l2 = a2.join(".");
                  ue.route(o3, n3, l2, r2);
                });
              }(e3, t3.defaultRoutes);
              t3.descriptors && ue.describe(e3, t3.descriptors);
            }(t2, o2, i3), this.override && ue.override(t2.id, t2.overrides)), o2;
          }
          get(t2) {
            return this.items[t2];
          }
          unregister(t2) {
            const e2 = this.items, i3 = t2.id, s2 = this.scope;
            i3 in e2 && delete e2[i3], s2 && i3 in ue[s2] && (delete ue[s2][i3], this.override && delete re[i3]);
          }
        }
        class tn {
          constructor() {
            this.controllers = new Qs(Ns, "datasets", true), this.elements = new Qs(Hs, "elements"), this.plugins = new Qs(Object, "plugins"), this.scales = new Qs(Js, "scales"), this._typedRegistries = [this.controllers, this.scales, this.elements];
          }
          add(...t2) {
            this._each("register", t2);
          }
          remove(...t2) {
            this._each("unregister", t2);
          }
          addControllers(...t2) {
            this._each("register", t2, this.controllers);
          }
          addElements(...t2) {
            this._each("register", t2, this.elements);
          }
          addPlugins(...t2) {
            this._each("register", t2, this.plugins);
          }
          addScales(...t2) {
            this._each("register", t2, this.scales);
          }
          getController(t2) {
            return this._get(t2, this.controllers, "controller");
          }
          getElement(t2) {
            return this._get(t2, this.elements, "element");
          }
          getPlugin(t2) {
            return this._get(t2, this.plugins, "plugin");
          }
          getScale(t2) {
            return this._get(t2, this.scales, "scale");
          }
          removeControllers(...t2) {
            this._each("unregister", t2, this.controllers);
          }
          removeElements(...t2) {
            this._each("unregister", t2, this.elements);
          }
          removePlugins(...t2) {
            this._each("unregister", t2, this.plugins);
          }
          removeScales(...t2) {
            this._each("unregister", t2, this.scales);
          }
          _each(t2, e2, i3) {
            [...e2].forEach((e3) => {
              const s2 = i3 || this._getRegistryForType(e3);
              i3 || s2.isForType(e3) || s2 === this.plugins && e3.id ? this._exec(t2, s2, e3) : u(e3, (e4) => {
                const s3 = i3 || this._getRegistryForType(e4);
                this._exec(t2, s3, e4);
              });
            });
          }
          _exec(t2, e2, i3) {
            const s2 = w(t2);
            d(i3["before" + s2], [], i3), e2[t2](i3), d(i3["after" + s2], [], i3);
          }
          _getRegistryForType(t2) {
            for (let e2 = 0; e2 < this._typedRegistries.length; e2++) {
              const i3 = this._typedRegistries[e2];
              if (i3.isForType(t2))
                return i3;
            }
            return this.plugins;
          }
          _get(t2, e2, i3) {
            const s2 = e2.get(t2);
            if (void 0 === s2)
              throw new Error('"' + t2 + '" is not a registered ' + i3 + ".");
            return s2;
          }
        }
        var en = new tn();
        class sn {
          constructor() {
            this._init = [];
          }
          notify(t2, e2, i3, s2) {
            "beforeInit" === e2 && (this._init = this._createDescriptors(t2, true), this._notify(this._init, t2, "install"));
            const n2 = s2 ? this._descriptors(t2).filter(s2) : this._descriptors(t2), o2 = this._notify(n2, t2, e2, i3);
            return "afterDestroy" === e2 && (this._notify(n2, t2, "stop"), this._notify(this._init, t2, "uninstall")), o2;
          }
          _notify(t2, e2, i3, s2) {
            s2 = s2 || {};
            for (const n2 of t2) {
              const t3 = n2.plugin;
              if (false === d(t3[i3], [e2, s2, n2.options], t3) && s2.cancelable)
                return false;
            }
            return true;
          }
          invalidate() {
            s(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
          }
          _descriptors(t2) {
            if (this._cache)
              return this._cache;
            const e2 = this._cache = this._createDescriptors(t2);
            return this._notifyStateChanges(t2), e2;
          }
          _createDescriptors(t2, e2) {
            const i3 = t2 && t2.config, s2 = l(i3.options && i3.options.plugins, {}), n2 = function(t3) {
              const e3 = {}, i4 = [], s3 = Object.keys(en.plugins.items);
              for (let t4 = 0; t4 < s3.length; t4++)
                i4.push(en.getPlugin(s3[t4]));
              const n3 = t3.plugins || [];
              for (let t4 = 0; t4 < n3.length; t4++) {
                const s4 = n3[t4];
                -1 === i4.indexOf(s4) && (i4.push(s4), e3[s4.id] = true);
              }
              return { plugins: i4, localIds: e3 };
            }(i3);
            return false !== s2 || e2 ? function(t3, { plugins: e3, localIds: i4 }, s3, n3) {
              const o2 = [], a2 = t3.getContext();
              for (const r2 of e3) {
                const e4 = r2.id, l2 = nn(s3[e4], n3);
                null !== l2 && o2.push({ plugin: r2, options: on(t3.config, { plugin: r2, local: i4[e4] }, l2, a2) });
              }
              return o2;
            }(t2, n2, s2, e2) : [];
          }
          _notifyStateChanges(t2) {
            const e2 = this._oldCache || [], i3 = this._cache, s2 = (t3, e3) => t3.filter((t4) => !e3.some((e4) => t4.plugin.id === e4.plugin.id));
            this._notify(s2(e2, i3), t2, "stop"), this._notify(s2(i3, e2), t2, "start");
          }
        }
        function nn(t2, e2) {
          return e2 || false !== t2 ? true === t2 ? {} : t2 : null;
        }
        function on(t2, { plugin: e2, local: i3 }, s2, n2) {
          const o2 = t2.pluginScopeKeys(e2), a2 = t2.getOptionScopes(s2, o2);
          return i3 && e2.defaults && a2.push(e2.defaults), t2.createResolver(a2, n2, [""], { scriptable: false, indexable: false, allKeys: true });
        }
        function an(t2, e2) {
          const i3 = ue.datasets[t2] || {};
          return ((e2.datasets || {})[t2] || {}).indexAxis || e2.indexAxis || i3.indexAxis || "x";
        }
        function rn(t2) {
          if ("x" === t2 || "y" === t2 || "r" === t2)
            return t2;
        }
        function ln(t2, ...e2) {
          if (rn(t2))
            return t2;
          for (const s2 of e2) {
            const e3 = s2.axis || ("top" === (i3 = s2.position) || "bottom" === i3 ? "x" : "left" === i3 || "right" === i3 ? "y" : void 0) || t2.length > 1 && rn(t2[0].toLowerCase());
            if (e3)
              return e3;
          }
          var i3;
          throw new Error(`Cannot determine type of '${t2}' axis. Please provide 'axis' or 'position' option.`);
        }
        function hn(t2, e2, i3) {
          if (i3[e2 + "AxisID"] === t2)
            return { axis: e2 };
        }
        function cn(t2, e2) {
          const i3 = re[t2.type] || { scales: {} }, s2 = e2.scales || {}, n2 = an(t2.type, e2), a2 = /* @__PURE__ */ Object.create(null);
          return Object.keys(s2).forEach((e3) => {
            const r2 = s2[e3];
            if (!o(r2))
              return console.error(`Invalid scale configuration for scale: ${e3}`);
            if (r2._proxy)
              return console.warn(`Ignoring resolver passed as options for scale: ${e3}`);
            const l2 = ln(e3, r2, function(t3, e4) {
              if (e4.data && e4.data.datasets) {
                const i4 = e4.data.datasets.filter((e5) => e5.xAxisID === t3 || e5.yAxisID === t3);
                if (i4.length)
                  return hn(t3, "x", i4[0]) || hn(t3, "y", i4[0]);
              }
              return {};
            }(e3, t2), ue.scales[r2.type]), h2 = function(t3, e4) {
              return t3 === e4 ? "_index_" : "_value_";
            }(l2, n2), c2 = i3.scales || {};
            a2[e3] = b(/* @__PURE__ */ Object.create(null), [{ axis: l2 }, r2, c2[l2], c2[h2]]);
          }), t2.data.datasets.forEach((i4) => {
            const n3 = i4.type || t2.type, o2 = i4.indexAxis || an(n3, e2), r2 = (re[n3] || {}).scales || {};
            Object.keys(r2).forEach((t3) => {
              const e3 = function(t4, e4) {
                let i5 = t4;
                return "_index_" === t4 ? i5 = e4 : "_value_" === t4 && (i5 = "x" === e4 ? "y" : "x"), i5;
              }(t3, o2), n4 = i4[e3 + "AxisID"] || e3;
              a2[n4] = a2[n4] || /* @__PURE__ */ Object.create(null), b(a2[n4], [{ axis: e3 }, s2[n4], r2[t3]]);
            });
          }), Object.keys(a2).forEach((t3) => {
            const e3 = a2[t3];
            b(e3, [ue.scales[e3.type], ue.scale]);
          }), a2;
        }
        function dn(t2) {
          const e2 = t2.options || (t2.options = {});
          e2.plugins = l(e2.plugins, {}), e2.scales = cn(t2, e2);
        }
        function un(t2) {
          return (t2 = t2 || {}).datasets = t2.datasets || [], t2.labels = t2.labels || [], t2;
        }
        const fn = /* @__PURE__ */ new Map(), gn = /* @__PURE__ */ new Set();
        function pn(t2, e2) {
          let i3 = fn.get(t2);
          return i3 || (i3 = e2(), fn.set(t2, i3), gn.add(i3)), i3;
        }
        const mn = (t2, e2, i3) => {
          const s2 = M(e2, i3);
          void 0 !== s2 && t2.add(s2);
        };
        class xn {
          constructor(t2) {
            this._config = function(t3) {
              return (t3 = t3 || {}).data = un(t3.data), dn(t3), t3;
            }(t2), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
          }
          get platform() {
            return this._config.platform;
          }
          get type() {
            return this._config.type;
          }
          set type(t2) {
            this._config.type = t2;
          }
          get data() {
            return this._config.data;
          }
          set data(t2) {
            this._config.data = un(t2);
          }
          get options() {
            return this._config.options;
          }
          set options(t2) {
            this._config.options = t2;
          }
          get plugins() {
            return this._config.plugins;
          }
          update() {
            const t2 = this._config;
            this.clearCache(), dn(t2);
          }
          clearCache() {
            this._scopeCache.clear(), this._resolverCache.clear();
          }
          datasetScopeKeys(t2) {
            return pn(t2, () => [[`datasets.${t2}`, ""]]);
          }
          datasetAnimationScopeKeys(t2, e2) {
            return pn(`${t2}.transition.${e2}`, () => [[`datasets.${t2}.transitions.${e2}`, `transitions.${e2}`], [`datasets.${t2}`, ""]]);
          }
          datasetElementScopeKeys(t2, e2) {
            return pn(`${t2}-${e2}`, () => [[`datasets.${t2}.elements.${e2}`, `datasets.${t2}`, `elements.${e2}`, ""]]);
          }
          pluginScopeKeys(t2) {
            const e2 = t2.id;
            return pn(`${this.type}-plugin-${e2}`, () => [[`plugins.${e2}`, ...t2.additionalOptionScopes || []]]);
          }
          _cachedScopes(t2, e2) {
            const i3 = this._scopeCache;
            let s2 = i3.get(t2);
            return s2 && !e2 || (s2 = /* @__PURE__ */ new Map(), i3.set(t2, s2)), s2;
          }
          getOptionScopes(t2, e2, i3) {
            const { options: s2, type: n2 } = this, o2 = this._cachedScopes(t2, i3), a2 = o2.get(e2);
            if (a2)
              return a2;
            const r2 = /* @__PURE__ */ new Set();
            e2.forEach((e3) => {
              t2 && (r2.add(t2), e3.forEach((e4) => mn(r2, t2, e4))), e3.forEach((t3) => mn(r2, s2, t3)), e3.forEach((t3) => mn(r2, re[n2] || {}, t3)), e3.forEach((t3) => mn(r2, ue, t3)), e3.forEach((t3) => mn(r2, le, t3));
            });
            const l2 = Array.from(r2);
            return 0 === l2.length && l2.push(/* @__PURE__ */ Object.create(null)), gn.has(e2) && o2.set(e2, l2), l2;
          }
          chartOptionScopes() {
            const { options: t2, type: e2 } = this;
            return [t2, re[e2] || {}, ue.datasets[e2] || {}, { type: e2 }, ue, le];
          }
          resolveNamedOptions(t2, e2, i3, s2 = [""]) {
            const o2 = { $shared: true }, { resolver: a2, subPrefixes: r2 } = bn(this._resolverCache, t2, s2);
            let l2 = a2;
            if (function(t3, e3) {
              const { isScriptable: i4, isIndexable: s3 } = Ye(t3);
              for (const o3 of e3) {
                const e4 = i4(o3), a3 = s3(o3), r3 = (a3 || e4) && t3[o3];
                if (e4 && (S(r3) || _n(r3)) || a3 && n(r3))
                  return true;
              }
              return false;
            }(a2, e2)) {
              o2.$shared = false;
              l2 = $e(a2, i3 = S(i3) ? i3() : i3, this.createResolver(t2, i3, r2));
            }
            for (const t3 of e2)
              o2[t3] = l2[t3];
            return o2;
          }
          createResolver(t2, e2, i3 = [""], s2) {
            const { resolver: n2 } = bn(this._resolverCache, t2, i3);
            return o(e2) ? $e(n2, e2, void 0, s2) : n2;
          }
        }
        function bn(t2, e2, i3) {
          let s2 = t2.get(e2);
          s2 || (s2 = /* @__PURE__ */ new Map(), t2.set(e2, s2));
          const n2 = i3.join();
          let o2 = s2.get(n2);
          if (!o2) {
            o2 = { resolver: je(e2, i3), subPrefixes: i3.filter((t3) => !t3.toLowerCase().includes("hover")) }, s2.set(n2, o2);
          }
          return o2;
        }
        const _n = (t2) => o(t2) && Object.getOwnPropertyNames(t2).some((e2) => S(t2[e2]));
        const yn = ["top", "bottom", "left", "right", "chartArea"];
        function vn(t2, e2) {
          return "top" === t2 || "bottom" === t2 || -1 === yn.indexOf(t2) && "x" === e2;
        }
        function Mn(t2, e2) {
          return function(i3, s2) {
            return i3[t2] === s2[t2] ? i3[e2] - s2[e2] : i3[t2] - s2[t2];
          };
        }
        function wn(t2) {
          const e2 = t2.chart, i3 = e2.options.animation;
          e2.notifyPlugins("afterRender"), d(i3 && i3.onComplete, [t2], e2);
        }
        function kn(t2) {
          const e2 = t2.chart, i3 = e2.options.animation;
          d(i3 && i3.onProgress, [t2], e2);
        }
        function Sn(t2) {
          return fe() && "string" == typeof t2 ? t2 = document.getElementById(t2) : t2 && t2.length && (t2 = t2[0]), t2 && t2.canvas && (t2 = t2.canvas), t2;
        }
        const Pn = {}, Dn = (t2) => {
          const e2 = Sn(t2);
          return Object.values(Pn).filter((t3) => t3.canvas === e2).pop();
        };
        function Cn(t2, e2, i3) {
          const s2 = Object.keys(t2);
          for (const n2 of s2) {
            const s3 = +n2;
            if (s3 >= e2) {
              const o2 = t2[n2];
              delete t2[n2], (i3 > 0 || s3 > e2) && (t2[s3 + i3] = o2);
            }
          }
        }
        function On(t2, e2, i3) {
          return t2.options.clip ? t2[i3] : e2[i3];
        }
        class An {
          static register(...t2) {
            en.add(...t2), Tn();
          }
          static unregister(...t2) {
            en.remove(...t2), Tn();
          }
          constructor(t2, e2) {
            const s2 = this.config = new xn(e2), n2 = Sn(t2), o2 = Dn(n2);
            if (o2)
              throw new Error("Canvas is already in use. Chart with ID '" + o2.id + "' must be destroyed before the canvas with ID '" + o2.canvas.id + "' can be reused.");
            const a2 = s2.createResolver(s2.chartOptionScopes(), this.getContext());
            this.platform = new (s2.platform || ks(n2))(), this.platform.updateConfig(s2);
            const r2 = this.platform.acquireContext(n2, a2.aspectRatio), l2 = r2 && r2.canvas, h2 = l2 && l2.height, c2 = l2 && l2.width;
            this.id = i2(), this.ctx = r2, this.canvas = l2, this.width = c2, this.height = h2, this._options = a2, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new sn(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = false, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = dt((t3) => this.update(t3), a2.resizeDelay || 0), this._dataChanges = [], Pn[this.id] = this, r2 && l2 ? (bt.listen(this, "complete", wn), bt.listen(this, "progress", kn), this._initialize(), this.attached && this.update()) : console.error("Failed to create chart: can't acquire context from the given item");
          }
          get aspectRatio() {
            const { options: { aspectRatio: t2, maintainAspectRatio: e2 }, width: i3, height: n2, _aspectRatio: o2 } = this;
            return s(t2) ? e2 && o2 ? o2 : n2 ? i3 / n2 : null : t2;
          }
          get data() {
            return this.config.data;
          }
          set data(t2) {
            this.config.data = t2;
          }
          get options() {
            return this._options;
          }
          set options(t2) {
            this.config.options = t2;
          }
          get registry() {
            return en;
          }
          _initialize() {
            return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : ke(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
          }
          clear() {
            return Te(this.canvas, this.ctx), this;
          }
          stop() {
            return bt.stop(this), this;
          }
          resize(t2, e2) {
            bt.running(this) ? this._resizeBeforeDraw = { width: t2, height: e2 } : this._resize(t2, e2);
          }
          _resize(t2, e2) {
            const i3 = this.options, s2 = this.canvas, n2 = i3.maintainAspectRatio && this.aspectRatio, o2 = this.platform.getMaximumSize(s2, t2, e2, n2), a2 = i3.devicePixelRatio || this.platform.getDevicePixelRatio(), r2 = this.width ? "resize" : "attach";
            this.width = o2.width, this.height = o2.height, this._aspectRatio = this.aspectRatio, ke(this, a2, true) && (this.notifyPlugins("resize", { size: o2 }), d(i3.onResize, [this, o2], this), this.attached && this._doResize(r2) && this.render());
          }
          ensureScalesHaveIDs() {
            u(this.options.scales || {}, (t2, e2) => {
              t2.id = e2;
            });
          }
          buildOrUpdateScales() {
            const t2 = this.options, e2 = t2.scales, i3 = this.scales, s2 = Object.keys(i3).reduce((t3, e3) => (t3[e3] = false, t3), {});
            let n2 = [];
            e2 && (n2 = n2.concat(Object.keys(e2).map((t3) => {
              const i4 = e2[t3], s3 = ln(t3, i4), n3 = "r" === s3, o2 = "x" === s3;
              return { options: i4, dposition: n3 ? "chartArea" : o2 ? "bottom" : "left", dtype: n3 ? "radialLinear" : o2 ? "category" : "linear" };
            }))), u(n2, (e3) => {
              const n3 = e3.options, o2 = n3.id, a2 = ln(o2, n3), r2 = l(n3.type, e3.dtype);
              void 0 !== n3.position && vn(n3.position, a2) === vn(e3.dposition) || (n3.position = e3.dposition), s2[o2] = true;
              let h2 = null;
              if (o2 in i3 && i3[o2].type === r2)
                h2 = i3[o2];
              else {
                h2 = new (en.getScale(r2))({ id: o2, type: r2, ctx: this.ctx, chart: this }), i3[h2.id] = h2;
              }
              h2.init(n3, t2);
            }), u(s2, (t3, e3) => {
              t3 || delete i3[e3];
            }), u(i3, (t3) => {
              as.configure(this, t3, t3.options), as.addBox(this, t3);
            });
          }
          _updateMetasets() {
            const t2 = this._metasets, e2 = this.data.datasets.length, i3 = t2.length;
            if (t2.sort((t3, e3) => t3.index - e3.index), i3 > e2) {
              for (let t3 = e2; t3 < i3; ++t3)
                this._destroyDatasetMeta(t3);
              t2.splice(e2, i3 - e2);
            }
            this._sortedMetasets = t2.slice(0).sort(Mn("order", "index"));
          }
          _removeUnreferencedMetasets() {
            const { _metasets: t2, data: { datasets: e2 } } = this;
            t2.length > e2.length && delete this._stacks, t2.forEach((t3, i3) => {
              0 === e2.filter((e3) => e3 === t3._dataset).length && this._destroyDatasetMeta(i3);
            });
          }
          buildOrUpdateControllers() {
            const t2 = [], e2 = this.data.datasets;
            let i3, s2;
            for (this._removeUnreferencedMetasets(), i3 = 0, s2 = e2.length; i3 < s2; i3++) {
              const s3 = e2[i3];
              let n2 = this.getDatasetMeta(i3);
              const o2 = s3.type || this.config.type;
              if (n2.type && n2.type !== o2 && (this._destroyDatasetMeta(i3), n2 = this.getDatasetMeta(i3)), n2.type = o2, n2.indexAxis = s3.indexAxis || an(o2, this.options), n2.order = s3.order || 0, n2.index = i3, n2.label = "" + s3.label, n2.visible = this.isDatasetVisible(i3), n2.controller)
                n2.controller.updateIndex(i3), n2.controller.linkScales();
              else {
                const e3 = en.getController(o2), { datasetElementType: s4, dataElementType: a2 } = ue.datasets[o2];
                Object.assign(e3, { dataElementType: en.getElement(a2), datasetElementType: s4 && en.getElement(s4) }), n2.controller = new e3(this, i3), t2.push(n2.controller);
              }
            }
            return this._updateMetasets(), t2;
          }
          _resetElements() {
            u(this.data.datasets, (t2, e2) => {
              this.getDatasetMeta(e2).controller.reset();
            }, this);
          }
          reset() {
            this._resetElements(), this.notifyPlugins("reset");
          }
          update(t2) {
            const e2 = this.config;
            e2.update();
            const i3 = this._options = e2.createResolver(e2.chartOptionScopes(), this.getContext()), s2 = this._animationsDisabled = !i3.animation;
            if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), false === this.notifyPlugins("beforeUpdate", { mode: t2, cancelable: true }))
              return;
            const n2 = this.buildOrUpdateControllers();
            this.notifyPlugins("beforeElementsUpdate");
            let o2 = 0;
            for (let t3 = 0, e3 = this.data.datasets.length; t3 < e3; t3++) {
              const { controller: e4 } = this.getDatasetMeta(t3), i4 = !s2 && -1 === n2.indexOf(e4);
              e4.buildOrUpdateElements(i4), o2 = Math.max(+e4.getMaxOverflow(), o2);
            }
            o2 = this._minPadding = i3.layout.autoPadding ? o2 : 0, this._updateLayout(o2), s2 || u(n2, (t3) => {
              t3.reset();
            }), this._updateDatasets(t2), this.notifyPlugins("afterUpdate", { mode: t2 }), this._layers.sort(Mn("z", "_idx"));
            const { _active: a2, _lastEvent: r2 } = this;
            r2 ? this._eventHandler(r2, true) : a2.length && this._updateHoverStyles(a2, a2, true), this.render();
          }
          _updateScales() {
            u(this.scales, (t2) => {
              as.removeBox(this, t2);
            }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
          }
          _checkEventBindings() {
            const t2 = this.options, e2 = new Set(Object.keys(this._listeners)), i3 = new Set(t2.events);
            P(e2, i3) && !!this._responsiveListeners === t2.responsive || (this.unbindEvents(), this.bindEvents());
          }
          _updateHiddenIndices() {
            const { _hiddenIndices: t2 } = this, e2 = this._getUniformDataChanges() || [];
            for (const { method: i3, start: s2, count: n2 } of e2) {
              Cn(t2, s2, "_removeElements" === i3 ? -n2 : n2);
            }
          }
          _getUniformDataChanges() {
            const t2 = this._dataChanges;
            if (!t2 || !t2.length)
              return;
            this._dataChanges = [];
            const e2 = this.data.datasets.length, i3 = (e3) => new Set(t2.filter((t3) => t3[0] === e3).map((t3, e4) => e4 + "," + t3.splice(1).join(","))), s2 = i3(0);
            for (let t3 = 1; t3 < e2; t3++)
              if (!P(s2, i3(t3)))
                return;
            return Array.from(s2).map((t3) => t3.split(",")).map((t3) => ({ method: t3[1], start: +t3[2], count: +t3[3] }));
          }
          _updateLayout(t2) {
            if (false === this.notifyPlugins("beforeLayout", { cancelable: true }))
              return;
            as.update(this, this.width, this.height, t2);
            const e2 = this.chartArea, i3 = e2.width <= 0 || e2.height <= 0;
            this._layers = [], u(this.boxes, (t3) => {
              i3 && "chartArea" === t3.position || (t3.configure && t3.configure(), this._layers.push(...t3._layers()));
            }, this), this._layers.forEach((t3, e3) => {
              t3._idx = e3;
            }), this.notifyPlugins("afterLayout");
          }
          _updateDatasets(t2) {
            if (false !== this.notifyPlugins("beforeDatasetsUpdate", { mode: t2, cancelable: true })) {
              for (let t3 = 0, e2 = this.data.datasets.length; t3 < e2; ++t3)
                this.getDatasetMeta(t3).controller.configure();
              for (let e2 = 0, i3 = this.data.datasets.length; e2 < i3; ++e2)
                this._updateDataset(e2, S(t2) ? t2({ datasetIndex: e2 }) : t2);
              this.notifyPlugins("afterDatasetsUpdate", { mode: t2 });
            }
          }
          _updateDataset(t2, e2) {
            const i3 = this.getDatasetMeta(t2), s2 = { meta: i3, index: t2, mode: e2, cancelable: true };
            false !== this.notifyPlugins("beforeDatasetUpdate", s2) && (i3.controller._update(e2), s2.cancelable = false, this.notifyPlugins("afterDatasetUpdate", s2));
          }
          render() {
            false !== this.notifyPlugins("beforeRender", { cancelable: true }) && (bt.has(this) ? this.attached && !bt.running(this) && bt.start(this) : (this.draw(), wn({ chart: this })));
          }
          draw() {
            let t2;
            if (this._resizeBeforeDraw) {
              const { width: t3, height: e3 } = this._resizeBeforeDraw;
              this._resize(t3, e3), this._resizeBeforeDraw = null;
            }
            if (this.clear(), this.width <= 0 || this.height <= 0)
              return;
            if (false === this.notifyPlugins("beforeDraw", { cancelable: true }))
              return;
            const e2 = this._layers;
            for (t2 = 0; t2 < e2.length && e2[t2].z <= 0; ++t2)
              e2[t2].draw(this.chartArea);
            for (this._drawDatasets(); t2 < e2.length; ++t2)
              e2[t2].draw(this.chartArea);
            this.notifyPlugins("afterDraw");
          }
          _getSortedDatasetMetas(t2) {
            const e2 = this._sortedMetasets, i3 = [];
            let s2, n2;
            for (s2 = 0, n2 = e2.length; s2 < n2; ++s2) {
              const n3 = e2[s2];
              t2 && !n3.visible || i3.push(n3);
            }
            return i3;
          }
          getSortedVisibleDatasetMetas() {
            return this._getSortedDatasetMetas(true);
          }
          _drawDatasets() {
            if (false === this.notifyPlugins("beforeDatasetsDraw", { cancelable: true }))
              return;
            const t2 = this.getSortedVisibleDatasetMetas();
            for (let e2 = t2.length - 1; e2 >= 0; --e2)
              this._drawDataset(t2[e2]);
            this.notifyPlugins("afterDatasetsDraw");
          }
          _drawDataset(t2) {
            const e2 = this.ctx, i3 = t2._clip, s2 = !i3.disabled, n2 = function(t3, e3) {
              const { xScale: i4, yScale: s3 } = t3;
              return i4 && s3 ? { left: On(i4, e3, "left"), right: On(i4, e3, "right"), top: On(s3, e3, "top"), bottom: On(s3, e3, "bottom") } : e3;
            }(t2, this.chartArea), o2 = { meta: t2, index: t2.index, cancelable: true };
            false !== this.notifyPlugins("beforeDatasetDraw", o2) && (s2 && Ie(e2, { left: false === i3.left ? 0 : n2.left - i3.left, right: false === i3.right ? this.width : n2.right + i3.right, top: false === i3.top ? 0 : n2.top - i3.top, bottom: false === i3.bottom ? this.height : n2.bottom + i3.bottom }), t2.controller.draw(), s2 && ze(e2), o2.cancelable = false, this.notifyPlugins("afterDatasetDraw", o2));
          }
          isPointInArea(t2) {
            return Re(t2, this.chartArea, this._minPadding);
          }
          getElementsAtEventForMode(t2, e2, i3, s2) {
            const n2 = Xi.modes[e2];
            return "function" == typeof n2 ? n2(this, t2, i3, s2) : [];
          }
          getDatasetMeta(t2) {
            const e2 = this.data.datasets[t2], i3 = this._metasets;
            let s2 = i3.filter((t3) => t3 && t3._dataset === e2).pop();
            return s2 || (s2 = { type: null, data: [], dataset: null, controller: null, hidden: null, xAxisID: null, yAxisID: null, order: e2 && e2.order || 0, index: t2, _dataset: e2, _parsed: [], _sorted: false }, i3.push(s2)), s2;
          }
          getContext() {
            return this.$context || (this.$context = Ci(null, { chart: this, type: "chart" }));
          }
          getVisibleDatasetCount() {
            return this.getSortedVisibleDatasetMetas().length;
          }
          isDatasetVisible(t2) {
            const e2 = this.data.datasets[t2];
            if (!e2)
              return false;
            const i3 = this.getDatasetMeta(t2);
            return "boolean" == typeof i3.hidden ? !i3.hidden : !e2.hidden;
          }
          setDatasetVisibility(t2, e2) {
            this.getDatasetMeta(t2).hidden = !e2;
          }
          toggleDataVisibility(t2) {
            this._hiddenIndices[t2] = !this._hiddenIndices[t2];
          }
          getDataVisibility(t2) {
            return !this._hiddenIndices[t2];
          }
          _updateVisibility(t2, e2, i3) {
            const s2 = i3 ? "show" : "hide", n2 = this.getDatasetMeta(t2), o2 = n2.controller._resolveAnimations(void 0, s2);
            k(e2) ? (n2.data[e2].hidden = !i3, this.update()) : (this.setDatasetVisibility(t2, i3), o2.update(n2, { visible: i3 }), this.update((e3) => e3.datasetIndex === t2 ? s2 : void 0));
          }
          hide(t2, e2) {
            this._updateVisibility(t2, e2, false);
          }
          show(t2, e2) {
            this._updateVisibility(t2, e2, true);
          }
          _destroyDatasetMeta(t2) {
            const e2 = this._metasets[t2];
            e2 && e2.controller && e2.controller._destroy(), delete this._metasets[t2];
          }
          _stop() {
            let t2, e2;
            for (this.stop(), bt.remove(this), t2 = 0, e2 = this.data.datasets.length; t2 < e2; ++t2)
              this._destroyDatasetMeta(t2);
          }
          destroy() {
            this.notifyPlugins("beforeDestroy");
            const { canvas: t2, ctx: e2 } = this;
            this._stop(), this.config.clearCache(), t2 && (this.unbindEvents(), Te(t2, e2), this.platform.releaseContext(e2), this.canvas = null, this.ctx = null), delete Pn[this.id], this.notifyPlugins("afterDestroy");
          }
          toBase64Image(...t2) {
            return this.canvas.toDataURL(...t2);
          }
          bindEvents() {
            this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = true;
          }
          bindUserEvents() {
            const t2 = this._listeners, e2 = this.platform, i3 = (i4, s3) => {
              e2.addEventListener(this, i4, s3), t2[i4] = s3;
            }, s2 = (t3, e3, i4) => {
              t3.offsetX = e3, t3.offsetY = i4, this._eventHandler(t3);
            };
            u(this.options.events, (t3) => i3(t3, s2));
          }
          bindResponsiveEvents() {
            this._responsiveListeners || (this._responsiveListeners = {});
            const t2 = this._responsiveListeners, e2 = this.platform, i3 = (i4, s3) => {
              e2.addEventListener(this, i4, s3), t2[i4] = s3;
            }, s2 = (i4, s3) => {
              t2[i4] && (e2.removeEventListener(this, i4, s3), delete t2[i4]);
            }, n2 = (t3, e3) => {
              this.canvas && this.resize(t3, e3);
            };
            let o2;
            const a2 = () => {
              s2("attach", a2), this.attached = true, this.resize(), i3("resize", n2), i3("detach", o2);
            };
            o2 = () => {
              this.attached = false, s2("resize", n2), this._stop(), this._resize(0, 0), i3("attach", a2);
            }, e2.isAttached(this.canvas) ? a2() : o2();
          }
          unbindEvents() {
            u(this._listeners, (t2, e2) => {
              this.platform.removeEventListener(this, e2, t2);
            }), this._listeners = {}, u(this._responsiveListeners, (t2, e2) => {
              this.platform.removeEventListener(this, e2, t2);
            }), this._responsiveListeners = void 0;
          }
          updateHoverStyle(t2, e2, i3) {
            const s2 = i3 ? "set" : "remove";
            let n2, o2, a2, r2;
            for ("dataset" === e2 && (n2 = this.getDatasetMeta(t2[0].datasetIndex), n2.controller["_" + s2 + "DatasetHoverStyle"]()), a2 = 0, r2 = t2.length; a2 < r2; ++a2) {
              o2 = t2[a2];
              const e3 = o2 && this.getDatasetMeta(o2.datasetIndex).controller;
              e3 && e3[s2 + "HoverStyle"](o2.element, o2.datasetIndex, o2.index);
            }
          }
          getActiveElements() {
            return this._active || [];
          }
          setActiveElements(t2) {
            const e2 = this._active || [], i3 = t2.map(({ datasetIndex: t3, index: e3 }) => {
              const i4 = this.getDatasetMeta(t3);
              if (!i4)
                throw new Error("No dataset found at index " + t3);
              return { datasetIndex: t3, element: i4.data[e3], index: e3 };
            });
            !f(i3, e2) && (this._active = i3, this._lastEvent = null, this._updateHoverStyles(i3, e2));
          }
          notifyPlugins(t2, e2, i3) {
            return this._plugins.notify(this, t2, e2, i3);
          }
          isPluginEnabled(t2) {
            return 1 === this._plugins._cache.filter((e2) => e2.plugin.id === t2).length;
          }
          _updateHoverStyles(t2, e2, i3) {
            const s2 = this.options.hover, n2 = (t3, e3) => t3.filter((t4) => !e3.some((e4) => t4.datasetIndex === e4.datasetIndex && t4.index === e4.index)), o2 = n2(e2, t2), a2 = i3 ? t2 : n2(t2, e2);
            o2.length && this.updateHoverStyle(o2, s2.mode, false), a2.length && s2.mode && this.updateHoverStyle(a2, s2.mode, true);
          }
          _eventHandler(t2, e2) {
            const i3 = { event: t2, replay: e2, cancelable: true, inChartArea: this.isPointInArea(t2) }, s2 = (e3) => (e3.options.events || this.options.events).includes(t2.native.type);
            if (false === this.notifyPlugins("beforeEvent", i3, s2))
              return;
            const n2 = this._handleEvent(t2, e2, i3.inChartArea);
            return i3.cancelable = false, this.notifyPlugins("afterEvent", i3, s2), (n2 || i3.changed) && this.render(), this;
          }
          _handleEvent(t2, e2, i3) {
            const { _active: s2 = [], options: n2 } = this, o2 = e2, a2 = this._getActiveElements(t2, s2, i3, o2), r2 = D(t2), l2 = function(t3, e3, i4, s3) {
              return i4 && "mouseout" !== t3.type ? s3 ? e3 : t3 : null;
            }(t2, this._lastEvent, i3, r2);
            i3 && (this._lastEvent = null, d(n2.onHover, [t2, a2, this], this), r2 && d(n2.onClick, [t2, a2, this], this));
            const h2 = !f(a2, s2);
            return (h2 || e2) && (this._active = a2, this._updateHoverStyles(a2, s2, e2)), this._lastEvent = l2, h2;
          }
          _getActiveElements(t2, e2, i3, s2) {
            if ("mouseout" === t2.type)
              return [];
            if (!i3)
              return e2;
            const n2 = this.options.hover;
            return this.getElementsAtEventForMode(t2, n2.mode, n2, s2);
          }
        }
        __publicField(An, "defaults", ue);
        __publicField(An, "instances", Pn);
        __publicField(An, "overrides", re);
        __publicField(An, "registry", en);
        __publicField(An, "version", "4.4.3");
        __publicField(An, "getChart", Dn);
        function Tn() {
          return u(An.instances, (t2) => t2._plugins.invalidate());
        }
        function Ln() {
          throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
        }
        class En {
          constructor(t2) {
            __publicField(this, "options");
            this.options = t2 || {};
          }
          static override(t2) {
            Object.assign(En.prototype, t2);
          }
          init() {
          }
          formats() {
            return Ln();
          }
          parse() {
            return Ln();
          }
          format() {
            return Ln();
          }
          add() {
            return Ln();
          }
          diff() {
            return Ln();
          }
          startOf() {
            return Ln();
          }
          endOf() {
            return Ln();
          }
        }
        var Rn = { _date: En };
        function In(t2) {
          const e2 = t2.iScale, i3 = function(t3, e3) {
            if (!t3._cache.$bar) {
              const i4 = t3.getMatchingVisibleMetas(e3);
              let s3 = [];
              for (let e4 = 0, n3 = i4.length; e4 < n3; e4++)
                s3 = s3.concat(i4[e4].controller.getAllParsedValues(t3));
              t3._cache.$bar = lt(s3.sort((t4, e4) => t4 - e4));
            }
            return t3._cache.$bar;
          }(e2, t2.type);
          let s2, n2, o2, a2, r2 = e2._length;
          const l2 = () => {
            32767 !== o2 && -32768 !== o2 && (k(a2) && (r2 = Math.min(r2, Math.abs(o2 - a2) || r2)), a2 = o2);
          };
          for (s2 = 0, n2 = i3.length; s2 < n2; ++s2)
            o2 = e2.getPixelForValue(i3[s2]), l2();
          for (a2 = void 0, s2 = 0, n2 = e2.ticks.length; s2 < n2; ++s2)
            o2 = e2.getPixelForTick(s2), l2();
          return r2;
        }
        function zn(t2, e2, i3, s2) {
          return n(t2) ? function(t3, e3, i4, s3) {
            const n2 = i4.parse(t3[0], s3), o2 = i4.parse(t3[1], s3), a2 = Math.min(n2, o2), r2 = Math.max(n2, o2);
            let l2 = a2, h2 = r2;
            Math.abs(a2) > Math.abs(r2) && (l2 = r2, h2 = a2), e3[i4.axis] = h2, e3._custom = { barStart: l2, barEnd: h2, start: n2, end: o2, min: a2, max: r2 };
          }(t2, e2, i3, s2) : e2[i3.axis] = i3.parse(t2, s2), e2;
        }
        function Fn(t2, e2, i3, s2) {
          const n2 = t2.iScale, o2 = t2.vScale, a2 = n2.getLabels(), r2 = n2 === o2, l2 = [];
          let h2, c2, d2, u2;
          for (h2 = i3, c2 = i3 + s2; h2 < c2; ++h2)
            u2 = e2[h2], d2 = {}, d2[n2.axis] = r2 || n2.parse(a2[h2], h2), l2.push(zn(u2, d2, o2, h2));
          return l2;
        }
        function Vn(t2) {
          return t2 && void 0 !== t2.barStart && void 0 !== t2.barEnd;
        }
        function Bn(t2, e2, i3, s2) {
          let n2 = e2.borderSkipped;
          const o2 = {};
          if (!n2)
            return void (t2.borderSkipped = o2);
          if (true === n2)
            return void (t2.borderSkipped = { top: true, right: true, bottom: true, left: true });
          const { start: a2, end: r2, reverse: l2, top: h2, bottom: c2 } = function(t3) {
            let e3, i4, s3, n3, o3;
            return t3.horizontal ? (e3 = t3.base > t3.x, i4 = "left", s3 = "right") : (e3 = t3.base < t3.y, i4 = "bottom", s3 = "top"), e3 ? (n3 = "end", o3 = "start") : (n3 = "start", o3 = "end"), { start: i4, end: s3, reverse: e3, top: n3, bottom: o3 };
          }(t2);
          "middle" === n2 && i3 && (t2.enableBorderRadius = true, (i3._top || 0) === s2 ? n2 = h2 : (i3._bottom || 0) === s2 ? n2 = c2 : (o2[Wn(c2, a2, r2, l2)] = true, n2 = h2)), o2[Wn(n2, a2, r2, l2)] = true, t2.borderSkipped = o2;
        }
        function Wn(t2, e2, i3, s2) {
          var n2, o2, a2;
          return s2 ? (a2 = i3, t2 = Nn(t2 = (n2 = t2) === (o2 = e2) ? a2 : n2 === a2 ? o2 : n2, i3, e2)) : t2 = Nn(t2, e2, i3), t2;
        }
        function Nn(t2, e2, i3) {
          return "start" === t2 ? e2 : "end" === t2 ? i3 : t2;
        }
        function Hn(t2, { inflateAmount: e2 }, i3) {
          t2.inflateAmount = "auto" === e2 ? 1 === i3 ? 0.33 : 0 : e2;
        }
        class jn extends Ns {
          constructor(t2, e2) {
            super(t2, e2), this.enableOptionSharing = true, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
          }
          linkScales() {
          }
          parse(t2, e2) {
            const i3 = this.getDataset().data, s2 = this._cachedMeta;
            if (false === this._parsing)
              s2._parsed = i3;
            else {
              let n2, a2, r2 = (t3) => +i3[t3];
              if (o(i3[t2])) {
                const { key: t3 = "value" } = this._parsing;
                r2 = (e3) => +M(i3[e3], t3);
              }
              for (n2 = t2, a2 = t2 + e2; n2 < a2; ++n2)
                s2._parsed[n2] = r2(n2);
            }
          }
          _getRotation() {
            return $(this.options.rotation - 90);
          }
          _getCircumference() {
            return $(this.options.circumference);
          }
          _getRotationExtents() {
            let t2 = O, e2 = -O;
            for (let i3 = 0; i3 < this.chart.data.datasets.length; ++i3)
              if (this.chart.isDatasetVisible(i3) && this.chart.getDatasetMeta(i3).type === this._type) {
                const s2 = this.chart.getDatasetMeta(i3).controller, n2 = s2._getRotation(), o2 = s2._getCircumference();
                t2 = Math.min(t2, n2), e2 = Math.max(e2, n2 + o2);
              }
            return { rotation: t2, circumference: e2 - t2 };
          }
          update(t2) {
            const e2 = this.chart, { chartArea: i3 } = e2, s2 = this._cachedMeta, n2 = s2.data, o2 = this.getMaxBorderWidth() + this.getMaxOffset(n2) + this.options.spacing, a2 = Math.max((Math.min(i3.width, i3.height) - o2) / 2, 0), r2 = Math.min(h(this.options.cutout, a2), 1), l2 = this._getRingWeight(this.index), { circumference: d2, rotation: u2 } = this._getRotationExtents(), { ratioX: f2, ratioY: g2, offsetX: p2, offsetY: m2 } = function(t3, e3, i4) {
              let s3 = 1, n3 = 1, o3 = 0, a3 = 0;
              if (e3 < O) {
                const r3 = t3, l3 = r3 + e3, h2 = Math.cos(r3), c2 = Math.sin(r3), d3 = Math.cos(l3), u3 = Math.sin(l3), f3 = (t4, e4, s4) => Z(t4, r3, l3, true) ? 1 : Math.max(e4, e4 * i4, s4, s4 * i4), g3 = (t4, e4, s4) => Z(t4, r3, l3, true) ? -1 : Math.min(e4, e4 * i4, s4, s4 * i4), p3 = f3(0, h2, d3), m3 = f3(E, c2, u3), x3 = g3(C, h2, d3), b3 = g3(C + E, c2, u3);
                s3 = (p3 - x3) / 2, n3 = (m3 - b3) / 2, o3 = -(p3 + x3) / 2, a3 = -(m3 + b3) / 2;
              }
              return { ratioX: s3, ratioY: n3, offsetX: o3, offsetY: a3 };
            }(u2, d2, r2), x2 = (i3.width - o2) / f2, b2 = (i3.height - o2) / g2, _2 = Math.max(Math.min(x2, b2) / 2, 0), y2 = c(this.options.radius, _2), v2 = (y2 - Math.max(y2 * r2, 0)) / this._getVisibleDatasetWeightTotal();
            this.offsetX = p2 * y2, this.offsetY = m2 * y2, s2.total = this.calculateTotal(), this.outerRadius = y2 - v2 * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - v2 * l2, 0), this.updateElements(n2, 0, n2.length, t2);
          }
          _circumference(t2, e2) {
            const i3 = this.options, s2 = this._cachedMeta, n2 = this._getCircumference();
            return e2 && i3.animation.animateRotate || !this.chart.getDataVisibility(t2) || null === s2._parsed[t2] || s2.data[t2].hidden ? 0 : this.calculateCircumference(s2._parsed[t2] * n2 / O);
          }
          updateElements(t2, e2, i3, s2) {
            const n2 = "reset" === s2, o2 = this.chart, a2 = o2.chartArea, r2 = o2.options.animation, l2 = (a2.left + a2.right) / 2, h2 = (a2.top + a2.bottom) / 2, c2 = n2 && r2.animateScale, d2 = c2 ? 0 : this.innerRadius, u2 = c2 ? 0 : this.outerRadius, { sharedOptions: f2, includeOptions: g2 } = this._getSharedOptions(e2, s2);
            let p2, m2 = this._getRotation();
            for (p2 = 0; p2 < e2; ++p2)
              m2 += this._circumference(p2, n2);
            for (p2 = e2; p2 < e2 + i3; ++p2) {
              const e3 = this._circumference(p2, n2), i4 = t2[p2], o3 = { x: l2 + this.offsetX, y: h2 + this.offsetY, startAngle: m2, endAngle: m2 + e3, circumference: e3, outerRadius: u2, innerRadius: d2 };
              g2 && (o3.options = f2 || this.resolveDataElementOptions(p2, i4.active ? "active" : s2)), m2 += e3, this.updateElement(i4, p2, o3, s2);
            }
          }
          calculateTotal() {
            const t2 = this._cachedMeta, e2 = t2.data;
            let i3, s2 = 0;
            for (i3 = 0; i3 < e2.length; i3++) {
              const n2 = t2._parsed[i3];
              null === n2 || isNaN(n2) || !this.chart.getDataVisibility(i3) || e2[i3].hidden || (s2 += Math.abs(n2));
            }
            return s2;
          }
          calculateCircumference(t2) {
            const e2 = this._cachedMeta.total;
            return e2 > 0 && !isNaN(t2) ? O * (Math.abs(t2) / e2) : 0;
          }
          getLabelAndValue(t2) {
            const e2 = this._cachedMeta, i3 = this.chart, s2 = i3.data.labels || [], n2 = ne(e2._parsed[t2], i3.options.locale);
            return { label: s2[t2] || "", value: n2 };
          }
          getMaxBorderWidth(t2) {
            let e2 = 0;
            const i3 = this.chart;
            let s2, n2, o2, a2, r2;
            if (!t2) {
              for (s2 = 0, n2 = i3.data.datasets.length; s2 < n2; ++s2)
                if (i3.isDatasetVisible(s2)) {
                  o2 = i3.getDatasetMeta(s2), t2 = o2.data, a2 = o2.controller;
                  break;
                }
            }
            if (!t2)
              return 0;
            for (s2 = 0, n2 = t2.length; s2 < n2; ++s2)
              r2 = a2.resolveDataElementOptions(s2), "inner" !== r2.borderAlign && (e2 = Math.max(e2, r2.borderWidth || 0, r2.hoverBorderWidth || 0));
            return e2;
          }
          getMaxOffset(t2) {
            let e2 = 0;
            for (let i3 = 0, s2 = t2.length; i3 < s2; ++i3) {
              const t3 = this.resolveDataElementOptions(i3);
              e2 = Math.max(e2, t3.offset || 0, t3.hoverOffset || 0);
            }
            return e2;
          }
          _getRingWeightOffset(t2) {
            let e2 = 0;
            for (let i3 = 0; i3 < t2; ++i3)
              this.chart.isDatasetVisible(i3) && (e2 += this._getRingWeight(i3));
            return e2;
          }
          _getRingWeight(t2) {
            return Math.max(l(this.chart.data.datasets[t2].weight, 1), 0);
          }
          _getVisibleDatasetWeightTotal() {
            return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
          }
        }
        __publicField(jn, "id", "doughnut");
        __publicField(jn, "defaults", { datasetElementType: false, dataElementType: "arc", animation: { animateRotate: true, animateScale: false }, animations: { numbers: { type: "number", properties: ["circumference", "endAngle", "innerRadius", "outerRadius", "startAngle", "x", "y", "offset", "borderWidth", "spacing"] } }, cutout: "50%", rotation: 0, circumference: 360, radius: "100%", spacing: 0, indexAxis: "r" });
        __publicField(jn, "descriptors", { _scriptable: (t2) => "spacing" !== t2, _indexable: (t2) => "spacing" !== t2 && !t2.startsWith("borderDash") && !t2.startsWith("hoverBorderDash") });
        __publicField(jn, "overrides", { aspectRatio: 1, plugins: { legend: { labels: { generateLabels(t2) {
          const e2 = t2.data;
          if (e2.labels.length && e2.datasets.length) {
            const { labels: { pointStyle: i3, color: s2 } } = t2.legend.options;
            return e2.labels.map((e3, n2) => {
              const o2 = t2.getDatasetMeta(0).controller.getStyle(n2);
              return { text: e3, fillStyle: o2.backgroundColor, strokeStyle: o2.borderColor, fontColor: s2, lineWidth: o2.borderWidth, pointStyle: i3, hidden: !t2.getDataVisibility(n2), index: n2 };
            });
          }
          return [];
        } }, onClick(t2, e2, i3) {
          i3.chart.toggleDataVisibility(e2.index), i3.chart.update();
        } } } });
        class $n extends Ns {
          constructor(t2, e2) {
            super(t2, e2), this.innerRadius = void 0, this.outerRadius = void 0;
          }
          getLabelAndValue(t2) {
            const e2 = this._cachedMeta, i3 = this.chart, s2 = i3.data.labels || [], n2 = ne(e2._parsed[t2].r, i3.options.locale);
            return { label: s2[t2] || "", value: n2 };
          }
          parseObjectData(t2, e2, i3, s2) {
            return ii.bind(this)(t2, e2, i3, s2);
          }
          update(t2) {
            const e2 = this._cachedMeta.data;
            this._updateRadius(), this.updateElements(e2, 0, e2.length, t2);
          }
          getMinMax() {
            const t2 = this._cachedMeta, e2 = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY };
            return t2.data.forEach((t3, i3) => {
              const s2 = this.getParsed(i3).r;
              !isNaN(s2) && this.chart.getDataVisibility(i3) && (s2 < e2.min && (e2.min = s2), s2 > e2.max && (e2.max = s2));
            }), e2;
          }
          _updateRadius() {
            const t2 = this.chart, e2 = t2.chartArea, i3 = t2.options, s2 = Math.min(e2.right - e2.left, e2.bottom - e2.top), n2 = Math.max(s2 / 2, 0), o2 = (n2 - Math.max(i3.cutoutPercentage ? n2 / 100 * i3.cutoutPercentage : 1, 0)) / t2.getVisibleDatasetCount();
            this.outerRadius = n2 - o2 * this.index, this.innerRadius = this.outerRadius - o2;
          }
          updateElements(t2, e2, i3, s2) {
            const n2 = "reset" === s2, o2 = this.chart, a2 = o2.options.animation, r2 = this._cachedMeta.rScale, l2 = r2.xCenter, h2 = r2.yCenter, c2 = r2.getIndexAngle(0) - 0.5 * C;
            let d2, u2 = c2;
            const f2 = 360 / this.countVisibleElements();
            for (d2 = 0; d2 < e2; ++d2)
              u2 += this._computeAngle(d2, s2, f2);
            for (d2 = e2; d2 < e2 + i3; d2++) {
              const e3 = t2[d2];
              let i4 = u2, g2 = u2 + this._computeAngle(d2, s2, f2), p2 = o2.getDataVisibility(d2) ? r2.getDistanceFromCenterForValue(this.getParsed(d2).r) : 0;
              u2 = g2, n2 && (a2.animateScale && (p2 = 0), a2.animateRotate && (i4 = g2 = c2));
              const m2 = { x: l2, y: h2, innerRadius: 0, outerRadius: p2, startAngle: i4, endAngle: g2, options: this.resolveDataElementOptions(d2, e3.active ? "active" : s2) };
              this.updateElement(e3, d2, m2, s2);
            }
          }
          countVisibleElements() {
            const t2 = this._cachedMeta;
            let e2 = 0;
            return t2.data.forEach((t3, i3) => {
              !isNaN(this.getParsed(i3).r) && this.chart.getDataVisibility(i3) && e2++;
            }), e2;
          }
          _computeAngle(t2, e2, i3) {
            return this.chart.getDataVisibility(t2) ? $(this.resolveDataElementOptions(t2, e2).angle || i3) : 0;
          }
        }
        __publicField($n, "id", "polarArea");
        __publicField($n, "defaults", { dataElementType: "arc", animation: { animateRotate: true, animateScale: true }, animations: { numbers: { type: "number", properties: ["x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius"] } }, indexAxis: "r", startAngle: 0 });
        __publicField($n, "overrides", { aspectRatio: 1, plugins: { legend: { labels: { generateLabels(t2) {
          const e2 = t2.data;
          if (e2.labels.length && e2.datasets.length) {
            const { labels: { pointStyle: i3, color: s2 } } = t2.legend.options;
            return e2.labels.map((e3, n2) => {
              const o2 = t2.getDatasetMeta(0).controller.getStyle(n2);
              return { text: e3, fillStyle: o2.backgroundColor, strokeStyle: o2.borderColor, fontColor: s2, lineWidth: o2.borderWidth, pointStyle: i3, hidden: !t2.getDataVisibility(n2), index: n2 };
            });
          }
          return [];
        } }, onClick(t2, e2, i3) {
          i3.chart.toggleDataVisibility(e2.index), i3.chart.update();
        } } }, scales: { r: { type: "radialLinear", angleLines: { display: false }, beginAtZero: true, grid: { circular: true }, pointLabels: { display: false }, startAngle: 0 } } });
        var Yn = Object.freeze({ __proto__: null, BarController: (_a2 = class extends Ns {
          parsePrimitiveData(t2, e2, i3, s2) {
            return Fn(t2, e2, i3, s2);
          }
          parseArrayData(t2, e2, i3, s2) {
            return Fn(t2, e2, i3, s2);
          }
          parseObjectData(t2, e2, i3, s2) {
            const { iScale: n2, vScale: o2 } = t2, { xAxisKey: a2 = "x", yAxisKey: r2 = "y" } = this._parsing, l2 = "x" === n2.axis ? a2 : r2, h2 = "x" === o2.axis ? a2 : r2, c2 = [];
            let d2, u2, f2, g2;
            for (d2 = i3, u2 = i3 + s2; d2 < u2; ++d2)
              g2 = e2[d2], f2 = {}, f2[n2.axis] = n2.parse(M(g2, l2), d2), c2.push(zn(M(g2, h2), f2, o2, d2));
            return c2;
          }
          updateRangeFromParsed(t2, e2, i3, s2) {
            super.updateRangeFromParsed(t2, e2, i3, s2);
            const n2 = i3._custom;
            n2 && e2 === this._cachedMeta.vScale && (t2.min = Math.min(t2.min, n2.min), t2.max = Math.max(t2.max, n2.max));
          }
          getMaxOverflow() {
            return 0;
          }
          getLabelAndValue(t2) {
            const e2 = this._cachedMeta, { iScale: i3, vScale: s2 } = e2, n2 = this.getParsed(t2), o2 = n2._custom, a2 = Vn(o2) ? "[" + o2.start + ", " + o2.end + "]" : "" + s2.getLabelForValue(n2[s2.axis]);
            return { label: "" + i3.getLabelForValue(n2[i3.axis]), value: a2 };
          }
          initialize() {
            this.enableOptionSharing = true, super.initialize();
            this._cachedMeta.stack = this.getDataset().stack;
          }
          update(t2) {
            const e2 = this._cachedMeta;
            this.updateElements(e2.data, 0, e2.data.length, t2);
          }
          updateElements(t2, e2, i3, n2) {
            const o2 = "reset" === n2, { index: a2, _cachedMeta: { vScale: r2 } } = this, l2 = r2.getBasePixel(), h2 = r2.isHorizontal(), c2 = this._getRuler(), { sharedOptions: d2, includeOptions: u2 } = this._getSharedOptions(e2, n2);
            for (let f2 = e2; f2 < e2 + i3; f2++) {
              const e3 = this.getParsed(f2), i4 = o2 || s(e3[r2.axis]) ? { base: l2, head: l2 } : this._calculateBarValuePixels(f2), g2 = this._calculateBarIndexPixels(f2, c2), p2 = (e3._stacks || {})[r2.axis], m2 = { horizontal: h2, base: i4.base, enableBorderRadius: !p2 || Vn(e3._custom) || a2 === p2._top || a2 === p2._bottom, x: h2 ? i4.head : g2.center, y: h2 ? g2.center : i4.head, height: h2 ? g2.size : Math.abs(i4.size), width: h2 ? Math.abs(i4.size) : g2.size };
              u2 && (m2.options = d2 || this.resolveDataElementOptions(f2, t2[f2].active ? "active" : n2));
              const x2 = m2.options || t2[f2].options;
              Bn(m2, x2, p2, a2), Hn(m2, x2, c2.ratio), this.updateElement(t2[f2], f2, m2, n2);
            }
          }
          _getStacks(t2, e2) {
            const { iScale: i3 } = this._cachedMeta, n2 = i3.getMatchingVisibleMetas(this._type).filter((t3) => t3.controller.options.grouped), o2 = i3.options.stacked, a2 = [], r2 = (t3) => {
              const i4 = t3.controller.getParsed(e2), n3 = i4 && i4[t3.vScale.axis];
              if (s(n3) || isNaN(n3))
                return true;
            };
            for (const i4 of n2)
              if ((void 0 === e2 || !r2(i4)) && ((false === o2 || -1 === a2.indexOf(i4.stack) || void 0 === o2 && void 0 === i4.stack) && a2.push(i4.stack), i4.index === t2))
                break;
            return a2.length || a2.push(void 0), a2;
          }
          _getStackCount(t2) {
            return this._getStacks(void 0, t2).length;
          }
          _getStackIndex(t2, e2, i3) {
            const s2 = this._getStacks(t2, i3), n2 = void 0 !== e2 ? s2.indexOf(e2) : -1;
            return -1 === n2 ? s2.length - 1 : n2;
          }
          _getRuler() {
            const t2 = this.options, e2 = this._cachedMeta, i3 = e2.iScale, s2 = [];
            let n2, o2;
            for (n2 = 0, o2 = e2.data.length; n2 < o2; ++n2)
              s2.push(i3.getPixelForValue(this.getParsed(n2)[i3.axis], n2));
            const a2 = t2.barThickness;
            return { min: a2 || In(e2), pixels: s2, start: i3._startPixel, end: i3._endPixel, stackCount: this._getStackCount(), scale: i3, grouped: t2.grouped, ratio: a2 ? 1 : t2.categoryPercentage * t2.barPercentage };
          }
          _calculateBarValuePixels(t2) {
            const { _cachedMeta: { vScale: e2, _stacked: i3, index: n2 }, options: { base: o2, minBarLength: a2 } } = this, r2 = o2 || 0, l2 = this.getParsed(t2), h2 = l2._custom, c2 = Vn(h2);
            let d2, u2, f2 = l2[e2.axis], g2 = 0, p2 = i3 ? this.applyStack(e2, l2, i3) : f2;
            p2 !== f2 && (g2 = p2 - f2, p2 = f2), c2 && (f2 = h2.barStart, p2 = h2.barEnd - h2.barStart, 0 !== f2 && F(f2) !== F(h2.barEnd) && (g2 = 0), g2 += f2);
            const m2 = s(o2) || c2 ? g2 : o2;
            let x2 = e2.getPixelForValue(m2);
            if (d2 = this.chart.getDataVisibility(t2) ? e2.getPixelForValue(g2 + p2) : x2, u2 = d2 - x2, Math.abs(u2) < a2) {
              u2 = function(t4, e3, i4) {
                return 0 !== t4 ? F(t4) : (e3.isHorizontal() ? 1 : -1) * (e3.min >= i4 ? 1 : -1);
              }(u2, e2, r2) * a2, f2 === r2 && (x2 -= u2 / 2);
              const t3 = e2.getPixelForDecimal(0), s2 = e2.getPixelForDecimal(1), o3 = Math.min(t3, s2), h3 = Math.max(t3, s2);
              x2 = Math.max(Math.min(x2, h3), o3), d2 = x2 + u2, i3 && !c2 && (l2._stacks[e2.axis]._visualValues[n2] = e2.getValueForPixel(d2) - e2.getValueForPixel(x2));
            }
            if (x2 === e2.getPixelForValue(r2)) {
              const t3 = F(u2) * e2.getLineWidthForValue(r2) / 2;
              x2 += t3, u2 -= t3;
            }
            return { size: u2, base: x2, head: d2, center: d2 + u2 / 2 };
          }
          _calculateBarIndexPixels(t2, e2) {
            const i3 = e2.scale, n2 = this.options, o2 = n2.skipNull, a2 = l(n2.maxBarThickness, 1 / 0);
            let r2, h2;
            if (e2.grouped) {
              const i4 = o2 ? this._getStackCount(t2) : e2.stackCount, l2 = "flex" === n2.barThickness ? function(t3, e3, i5, s2) {
                const n3 = e3.pixels, o3 = n3[t3];
                let a3 = t3 > 0 ? n3[t3 - 1] : null, r3 = t3 < n3.length - 1 ? n3[t3 + 1] : null;
                const l3 = i5.categoryPercentage;
                null === a3 && (a3 = o3 - (null === r3 ? e3.end - e3.start : r3 - o3)), null === r3 && (r3 = o3 + o3 - a3);
                const h3 = o3 - (o3 - Math.min(a3, r3)) / 2 * l3;
                return { chunk: Math.abs(r3 - a3) / 2 * l3 / s2, ratio: i5.barPercentage, start: h3 };
              }(t2, e2, n2, i4) : function(t3, e3, i5, n3) {
                const o3 = i5.barThickness;
                let a3, r3;
                return s(o3) ? (a3 = e3.min * i5.categoryPercentage, r3 = i5.barPercentage) : (a3 = o3 * n3, r3 = 1), { chunk: a3 / n3, ratio: r3, start: e3.pixels[t3] - a3 / 2 };
              }(t2, e2, n2, i4), c2 = this._getStackIndex(this.index, this._cachedMeta.stack, o2 ? t2 : void 0);
              r2 = l2.start + l2.chunk * c2 + l2.chunk / 2, h2 = Math.min(a2, l2.chunk * l2.ratio);
            } else
              r2 = i3.getPixelForValue(this.getParsed(t2)[i3.axis], t2), h2 = Math.min(a2, e2.min * e2.ratio);
            return { base: r2 - h2 / 2, head: r2 + h2 / 2, center: r2, size: h2 };
          }
          draw() {
            const t2 = this._cachedMeta, e2 = t2.vScale, i3 = t2.data, s2 = i3.length;
            let n2 = 0;
            for (; n2 < s2; ++n2)
              null === this.getParsed(n2)[e2.axis] || i3[n2].hidden || i3[n2].draw(this._ctx);
          }
        }, __publicField(_a2, "id", "bar"), __publicField(_a2, "defaults", { datasetElementType: false, dataElementType: "bar", categoryPercentage: 0.8, barPercentage: 0.9, grouped: true, animations: { numbers: { type: "number", properties: ["x", "y", "base", "width", "height"] } } }), __publicField(_a2, "overrides", { scales: { _index_: { type: "category", offset: true, grid: { offset: true } }, _value_: { type: "linear", beginAtZero: true } } }), _a2), BubbleController: (_b = class extends Ns {
          initialize() {
            this.enableOptionSharing = true, super.initialize();
          }
          parsePrimitiveData(t2, e2, i3, s2) {
            const n2 = super.parsePrimitiveData(t2, e2, i3, s2);
            for (let t3 = 0; t3 < n2.length; t3++)
              n2[t3]._custom = this.resolveDataElementOptions(t3 + i3).radius;
            return n2;
          }
          parseArrayData(t2, e2, i3, s2) {
            const n2 = super.parseArrayData(t2, e2, i3, s2);
            for (let t3 = 0; t3 < n2.length; t3++) {
              const s3 = e2[i3 + t3];
              n2[t3]._custom = l(s3[2], this.resolveDataElementOptions(t3 + i3).radius);
            }
            return n2;
          }
          parseObjectData(t2, e2, i3, s2) {
            const n2 = super.parseObjectData(t2, e2, i3, s2);
            for (let t3 = 0; t3 < n2.length; t3++) {
              const s3 = e2[i3 + t3];
              n2[t3]._custom = l(s3 && s3.r && +s3.r, this.resolveDataElementOptions(t3 + i3).radius);
            }
            return n2;
          }
          getMaxOverflow() {
            const t2 = this._cachedMeta.data;
            let e2 = 0;
            for (let i3 = t2.length - 1; i3 >= 0; --i3)
              e2 = Math.max(e2, t2[i3].size(this.resolveDataElementOptions(i3)) / 2);
            return e2 > 0 && e2;
          }
          getLabelAndValue(t2) {
            const e2 = this._cachedMeta, i3 = this.chart.data.labels || [], { xScale: s2, yScale: n2 } = e2, o2 = this.getParsed(t2), a2 = s2.getLabelForValue(o2.x), r2 = n2.getLabelForValue(o2.y), l2 = o2._custom;
            return { label: i3[t2] || "", value: "(" + a2 + ", " + r2 + (l2 ? ", " + l2 : "") + ")" };
          }
          update(t2) {
            const e2 = this._cachedMeta.data;
            this.updateElements(e2, 0, e2.length, t2);
          }
          updateElements(t2, e2, i3, s2) {
            const n2 = "reset" === s2, { iScale: o2, vScale: a2 } = this._cachedMeta, { sharedOptions: r2, includeOptions: l2 } = this._getSharedOptions(e2, s2), h2 = o2.axis, c2 = a2.axis;
            for (let d2 = e2; d2 < e2 + i3; d2++) {
              const e3 = t2[d2], i4 = !n2 && this.getParsed(d2), u2 = {}, f2 = u2[h2] = n2 ? o2.getPixelForDecimal(0.5) : o2.getPixelForValue(i4[h2]), g2 = u2[c2] = n2 ? a2.getBasePixel() : a2.getPixelForValue(i4[c2]);
              u2.skip = isNaN(f2) || isNaN(g2), l2 && (u2.options = r2 || this.resolveDataElementOptions(d2, e3.active ? "active" : s2), n2 && (u2.options.radius = 0)), this.updateElement(e3, d2, u2, s2);
            }
          }
          resolveDataElementOptions(t2, e2) {
            const i3 = this.getParsed(t2);
            let s2 = super.resolveDataElementOptions(t2, e2);
            s2.$shared && (s2 = Object.assign({}, s2, { $shared: false }));
            const n2 = s2.radius;
            return "active" !== e2 && (s2.radius = 0), s2.radius += l(i3 && i3._custom, n2), s2;
          }
        }, __publicField(_b, "id", "bubble"), __publicField(_b, "defaults", { datasetElementType: false, dataElementType: "point", animations: { numbers: { type: "number", properties: ["x", "y", "borderWidth", "radius"] } } }), __publicField(_b, "overrides", { scales: { x: { type: "linear" }, y: { type: "linear" } } }), _b), DoughnutController: jn, LineController: (_c = class extends Ns {
          initialize() {
            this.enableOptionSharing = true, this.supportsDecimation = true, super.initialize();
          }
          update(t2) {
            const e2 = this._cachedMeta, { dataset: i3, data: s2 = [], _dataset: n2 } = e2, o2 = this.chart._animationsDisabled;
            let { start: a2, count: r2 } = pt(e2, s2, o2);
            this._drawStart = a2, this._drawCount = r2, mt(e2) && (a2 = 0, r2 = s2.length), i3._chart = this.chart, i3._datasetIndex = this.index, i3._decimated = !!n2._decimated, i3.points = s2;
            const l2 = this.resolveDatasetElementOptions(t2);
            this.options.showLine || (l2.borderWidth = 0), l2.segment = this.options.segment, this.updateElement(i3, void 0, { animated: !o2, options: l2 }, t2), this.updateElements(s2, a2, r2, t2);
          }
          updateElements(t2, e2, i3, n2) {
            const o2 = "reset" === n2, { iScale: a2, vScale: r2, _stacked: l2, _dataset: h2 } = this._cachedMeta, { sharedOptions: c2, includeOptions: d2 } = this._getSharedOptions(e2, n2), u2 = a2.axis, f2 = r2.axis, { spanGaps: g2, segment: p2 } = this.options, m2 = N(g2) ? g2 : Number.POSITIVE_INFINITY, x2 = this.chart._animationsDisabled || o2 || "none" === n2, b2 = e2 + i3, _2 = t2.length;
            let y2 = e2 > 0 && this.getParsed(e2 - 1);
            for (let i4 = 0; i4 < _2; ++i4) {
              const g3 = t2[i4], _3 = x2 ? g3 : {};
              if (i4 < e2 || i4 >= b2) {
                _3.skip = true;
                continue;
              }
              const v2 = this.getParsed(i4), M2 = s(v2[f2]), w2 = _3[u2] = a2.getPixelForValue(v2[u2], i4), k2 = _3[f2] = o2 || M2 ? r2.getBasePixel() : r2.getPixelForValue(l2 ? this.applyStack(r2, v2, l2) : v2[f2], i4);
              _3.skip = isNaN(w2) || isNaN(k2) || M2, _3.stop = i4 > 0 && Math.abs(v2[u2] - y2[u2]) > m2, p2 && (_3.parsed = v2, _3.raw = h2.data[i4]), d2 && (_3.options = c2 || this.resolveDataElementOptions(i4, g3.active ? "active" : n2)), x2 || this.updateElement(g3, i4, _3, n2), y2 = v2;
            }
          }
          getMaxOverflow() {
            const t2 = this._cachedMeta, e2 = t2.dataset, i3 = e2.options && e2.options.borderWidth || 0, s2 = t2.data || [];
            if (!s2.length)
              return i3;
            const n2 = s2[0].size(this.resolveDataElementOptions(0)), o2 = s2[s2.length - 1].size(this.resolveDataElementOptions(s2.length - 1));
            return Math.max(i3, n2, o2) / 2;
          }
          draw() {
            const t2 = this._cachedMeta;
            t2.dataset.updateControlPoints(this.chart.chartArea, t2.iScale.axis), super.draw();
          }
        }, __publicField(_c, "id", "line"), __publicField(_c, "defaults", { datasetElementType: "line", dataElementType: "point", showLine: true, spanGaps: false }), __publicField(_c, "overrides", { scales: { _index_: { type: "category" }, _value_: { type: "linear" } } }), _c), PieController: (_d = class extends jn {
        }, __publicField(_d, "id", "pie"), __publicField(_d, "defaults", { cutout: 0, rotation: 0, circumference: 360, radius: "100%" }), _d), PolarAreaController: $n, RadarController: (_e2 = class extends Ns {
          getLabelAndValue(t2) {
            const e2 = this._cachedMeta.vScale, i3 = this.getParsed(t2);
            return { label: e2.getLabels()[t2], value: "" + e2.getLabelForValue(i3[e2.axis]) };
          }
          parseObjectData(t2, e2, i3, s2) {
            return ii.bind(this)(t2, e2, i3, s2);
          }
          update(t2) {
            const e2 = this._cachedMeta, i3 = e2.dataset, s2 = e2.data || [], n2 = e2.iScale.getLabels();
            if (i3.points = s2, "resize" !== t2) {
              const e3 = this.resolveDatasetElementOptions(t2);
              this.options.showLine || (e3.borderWidth = 0);
              const o2 = { _loop: true, _fullLoop: n2.length === s2.length, options: e3 };
              this.updateElement(i3, void 0, o2, t2);
            }
            this.updateElements(s2, 0, s2.length, t2);
          }
          updateElements(t2, e2, i3, s2) {
            const n2 = this._cachedMeta.rScale, o2 = "reset" === s2;
            for (let a2 = e2; a2 < e2 + i3; a2++) {
              const e3 = t2[a2], i4 = this.resolveDataElementOptions(a2, e3.active ? "active" : s2), r2 = n2.getPointPositionForValue(a2, this.getParsed(a2).r), l2 = o2 ? n2.xCenter : r2.x, h2 = o2 ? n2.yCenter : r2.y, c2 = { x: l2, y: h2, angle: r2.angle, skip: isNaN(l2) || isNaN(h2), options: i4 };
              this.updateElement(e3, a2, c2, s2);
            }
          }
        }, __publicField(_e2, "id", "radar"), __publicField(_e2, "defaults", { datasetElementType: "line", dataElementType: "point", indexAxis: "r", showLine: true, elements: { line: { fill: "start" } } }), __publicField(_e2, "overrides", { aspectRatio: 1, scales: { r: { type: "radialLinear" } } }), _e2), ScatterController: (_f = class extends Ns {
          getLabelAndValue(t2) {
            const e2 = this._cachedMeta, i3 = this.chart.data.labels || [], { xScale: s2, yScale: n2 } = e2, o2 = this.getParsed(t2), a2 = s2.getLabelForValue(o2.x), r2 = n2.getLabelForValue(o2.y);
            return { label: i3[t2] || "", value: "(" + a2 + ", " + r2 + ")" };
          }
          update(t2) {
            const e2 = this._cachedMeta, { data: i3 = [] } = e2, s2 = this.chart._animationsDisabled;
            let { start: n2, count: o2 } = pt(e2, i3, s2);
            if (this._drawStart = n2, this._drawCount = o2, mt(e2) && (n2 = 0, o2 = i3.length), this.options.showLine) {
              this.datasetElementType || this.addElements();
              const { dataset: n3, _dataset: o3 } = e2;
              n3._chart = this.chart, n3._datasetIndex = this.index, n3._decimated = !!o3._decimated, n3.points = i3;
              const a2 = this.resolveDatasetElementOptions(t2);
              a2.segment = this.options.segment, this.updateElement(n3, void 0, { animated: !s2, options: a2 }, t2);
            } else
              this.datasetElementType && (delete e2.dataset, this.datasetElementType = false);
            this.updateElements(i3, n2, o2, t2);
          }
          addElements() {
            const { showLine: t2 } = this.options;
            !this.datasetElementType && t2 && (this.datasetElementType = this.chart.registry.getElement("line")), super.addElements();
          }
          updateElements(t2, e2, i3, n2) {
            const o2 = "reset" === n2, { iScale: a2, vScale: r2, _stacked: l2, _dataset: h2 } = this._cachedMeta, c2 = this.resolveDataElementOptions(e2, n2), d2 = this.getSharedOptions(c2), u2 = this.includeOptions(n2, d2), f2 = a2.axis, g2 = r2.axis, { spanGaps: p2, segment: m2 } = this.options, x2 = N(p2) ? p2 : Number.POSITIVE_INFINITY, b2 = this.chart._animationsDisabled || o2 || "none" === n2;
            let _2 = e2 > 0 && this.getParsed(e2 - 1);
            for (let c3 = e2; c3 < e2 + i3; ++c3) {
              const e3 = t2[c3], i4 = this.getParsed(c3), p3 = b2 ? e3 : {}, y2 = s(i4[g2]), v2 = p3[f2] = a2.getPixelForValue(i4[f2], c3), M2 = p3[g2] = o2 || y2 ? r2.getBasePixel() : r2.getPixelForValue(l2 ? this.applyStack(r2, i4, l2) : i4[g2], c3);
              p3.skip = isNaN(v2) || isNaN(M2) || y2, p3.stop = c3 > 0 && Math.abs(i4[f2] - _2[f2]) > x2, m2 && (p3.parsed = i4, p3.raw = h2.data[c3]), u2 && (p3.options = d2 || this.resolveDataElementOptions(c3, e3.active ? "active" : n2)), b2 || this.updateElement(e3, c3, p3, n2), _2 = i4;
            }
            this.updateSharedOptions(d2, n2, c2);
          }
          getMaxOverflow() {
            const t2 = this._cachedMeta, e2 = t2.data || [];
            if (!this.options.showLine) {
              let t3 = 0;
              for (let i4 = e2.length - 1; i4 >= 0; --i4)
                t3 = Math.max(t3, e2[i4].size(this.resolveDataElementOptions(i4)) / 2);
              return t3 > 0 && t3;
            }
            const i3 = t2.dataset, s2 = i3.options && i3.options.borderWidth || 0;
            if (!e2.length)
              return s2;
            const n2 = e2[0].size(this.resolveDataElementOptions(0)), o2 = e2[e2.length - 1].size(this.resolveDataElementOptions(e2.length - 1));
            return Math.max(s2, n2, o2) / 2;
          }
        }, __publicField(_f, "id", "scatter"), __publicField(_f, "defaults", { datasetElementType: false, dataElementType: "point", showLine: false, fill: false }), __publicField(_f, "overrides", { interaction: { mode: "point" }, scales: { x: { type: "linear" }, y: { type: "linear" } } }), _f) });
        function Un(t2, e2, i3, s2) {
          const n2 = vi(t2.options.borderRadius, ["outerStart", "outerEnd", "innerStart", "innerEnd"]);
          const o2 = (i3 - e2) / 2, a2 = Math.min(o2, s2 * e2 / 2), r2 = (t3) => {
            const e3 = (i3 - Math.min(o2, t3)) * s2 / 2;
            return J(t3, 0, Math.min(o2, e3));
          };
          return { outerStart: r2(n2.outerStart), outerEnd: r2(n2.outerEnd), innerStart: J(n2.innerStart, 0, a2), innerEnd: J(n2.innerEnd, 0, a2) };
        }
        function Xn(t2, e2, i3, s2) {
          return { x: i3 + t2 * Math.cos(e2), y: s2 + t2 * Math.sin(e2) };
        }
        function qn(t2, e2, i3, s2, n2, o2) {
          const { x: a2, y: r2, startAngle: l2, pixelMargin: h2, innerRadius: c2 } = e2, d2 = Math.max(e2.outerRadius + s2 + i3 - h2, 0), u2 = c2 > 0 ? c2 + s2 + i3 + h2 : 0;
          let f2 = 0;
          const g2 = n2 - l2;
          if (s2) {
            const t3 = ((c2 > 0 ? c2 - s2 : 0) + (d2 > 0 ? d2 - s2 : 0)) / 2;
            f2 = (g2 - (0 !== t3 ? g2 * t3 / (t3 + s2) : g2)) / 2;
          }
          const p2 = (g2 - Math.max(1e-3, g2 * d2 - i3 / C) / d2) / 2, m2 = l2 + p2 + f2, x2 = n2 - p2 - f2, { outerStart: b2, outerEnd: _2, innerStart: y2, innerEnd: v2 } = Un(e2, u2, d2, x2 - m2), M2 = d2 - b2, w2 = d2 - _2, k2 = m2 + b2 / M2, S2 = x2 - _2 / w2, P2 = u2 + y2, D2 = u2 + v2, O2 = m2 + y2 / P2, A2 = x2 - v2 / D2;
          if (t2.beginPath(), o2) {
            const e3 = (k2 + S2) / 2;
            if (t2.arc(a2, r2, d2, k2, e3), t2.arc(a2, r2, d2, e3, S2), _2 > 0) {
              const e4 = Xn(w2, S2, a2, r2);
              t2.arc(e4.x, e4.y, _2, S2, x2 + E);
            }
            const i4 = Xn(D2, x2, a2, r2);
            if (t2.lineTo(i4.x, i4.y), v2 > 0) {
              const e4 = Xn(D2, A2, a2, r2);
              t2.arc(e4.x, e4.y, v2, x2 + E, A2 + Math.PI);
            }
            const s3 = (x2 - v2 / u2 + (m2 + y2 / u2)) / 2;
            if (t2.arc(a2, r2, u2, x2 - v2 / u2, s3, true), t2.arc(a2, r2, u2, s3, m2 + y2 / u2, true), y2 > 0) {
              const e4 = Xn(P2, O2, a2, r2);
              t2.arc(e4.x, e4.y, y2, O2 + Math.PI, m2 - E);
            }
            const n3 = Xn(M2, m2, a2, r2);
            if (t2.lineTo(n3.x, n3.y), b2 > 0) {
              const e4 = Xn(M2, k2, a2, r2);
              t2.arc(e4.x, e4.y, b2, m2 - E, k2);
            }
          } else {
            t2.moveTo(a2, r2);
            const e3 = Math.cos(k2) * d2 + a2, i4 = Math.sin(k2) * d2 + r2;
            t2.lineTo(e3, i4);
            const s3 = Math.cos(S2) * d2 + a2, n3 = Math.sin(S2) * d2 + r2;
            t2.lineTo(s3, n3);
          }
          t2.closePath();
        }
        function Kn(t2, e2, i3, s2, n2) {
          const { fullCircles: o2, startAngle: a2, circumference: r2, options: l2 } = e2, { borderWidth: h2, borderJoinStyle: c2, borderDash: d2, borderDashOffset: u2 } = l2, f2 = "inner" === l2.borderAlign;
          if (!h2)
            return;
          t2.setLineDash(d2 || []), t2.lineDashOffset = u2, f2 ? (t2.lineWidth = 2 * h2, t2.lineJoin = c2 || "round") : (t2.lineWidth = h2, t2.lineJoin = c2 || "bevel");
          let g2 = e2.endAngle;
          if (o2) {
            qn(t2, e2, i3, s2, g2, n2);
            for (let e3 = 0; e3 < o2; ++e3)
              t2.stroke();
            isNaN(r2) || (g2 = a2 + (r2 % O || O));
          }
          f2 && function(t3, e3, i4) {
            const { startAngle: s3, pixelMargin: n3, x: o3, y: a3, outerRadius: r3, innerRadius: l3 } = e3;
            let h3 = n3 / r3;
            t3.beginPath(), t3.arc(o3, a3, r3, s3 - h3, i4 + h3), l3 > n3 ? (h3 = n3 / l3, t3.arc(o3, a3, l3, i4 + h3, s3 - h3, true)) : t3.arc(o3, a3, n3, i4 + E, s3 - E), t3.closePath(), t3.clip();
          }(t2, e2, g2), o2 || (qn(t2, e2, i3, s2, g2, n2), t2.stroke());
        }
        function Gn(t2, e2, i3 = e2) {
          t2.lineCap = l(i3.borderCapStyle, e2.borderCapStyle), t2.setLineDash(l(i3.borderDash, e2.borderDash)), t2.lineDashOffset = l(i3.borderDashOffset, e2.borderDashOffset), t2.lineJoin = l(i3.borderJoinStyle, e2.borderJoinStyle), t2.lineWidth = l(i3.borderWidth, e2.borderWidth), t2.strokeStyle = l(i3.borderColor, e2.borderColor);
        }
        function Zn(t2, e2, i3) {
          t2.lineTo(i3.x, i3.y);
        }
        function Jn(t2, e2, i3 = {}) {
          const s2 = t2.length, { start: n2 = 0, end: o2 = s2 - 1 } = i3, { start: a2, end: r2 } = e2, l2 = Math.max(n2, a2), h2 = Math.min(o2, r2), c2 = n2 < a2 && o2 < a2 || n2 > r2 && o2 > r2;
          return { count: s2, start: l2, loop: e2.loop, ilen: h2 < l2 && !c2 ? s2 + h2 - l2 : h2 - l2 };
        }
        function Qn(t2, e2, i3, s2) {
          const { points: n2, options: o2 } = e2, { count: a2, start: r2, loop: l2, ilen: h2 } = Jn(n2, i3, s2), c2 = function(t3) {
            return t3.stepped ? Fe : t3.tension || "monotone" === t3.cubicInterpolationMode ? Ve : Zn;
          }(o2);
          let d2, u2, f2, { move: g2 = true, reverse: p2 } = s2 || {};
          for (d2 = 0; d2 <= h2; ++d2)
            u2 = n2[(r2 + (p2 ? h2 - d2 : d2)) % a2], u2.skip || (g2 ? (t2.moveTo(u2.x, u2.y), g2 = false) : c2(t2, f2, u2, p2, o2.stepped), f2 = u2);
          return l2 && (u2 = n2[(r2 + (p2 ? h2 : 0)) % a2], c2(t2, f2, u2, p2, o2.stepped)), !!l2;
        }
        function to(t2, e2, i3, s2) {
          const n2 = e2.points, { count: o2, start: a2, ilen: r2 } = Jn(n2, i3, s2), { move: l2 = true, reverse: h2 } = s2 || {};
          let c2, d2, u2, f2, g2, p2, m2 = 0, x2 = 0;
          const b2 = (t3) => (a2 + (h2 ? r2 - t3 : t3)) % o2, _2 = () => {
            f2 !== g2 && (t2.lineTo(m2, g2), t2.lineTo(m2, f2), t2.lineTo(m2, p2));
          };
          for (l2 && (d2 = n2[b2(0)], t2.moveTo(d2.x, d2.y)), c2 = 0; c2 <= r2; ++c2) {
            if (d2 = n2[b2(c2)], d2.skip)
              continue;
            const e3 = d2.x, i4 = d2.y, s3 = 0 | e3;
            s3 === u2 ? (i4 < f2 ? f2 = i4 : i4 > g2 && (g2 = i4), m2 = (x2 * m2 + e3) / ++x2) : (_2(), t2.lineTo(e3, i4), u2 = s3, x2 = 0, f2 = g2 = i4), p2 = i4;
          }
          _2();
        }
        function eo(t2) {
          const e2 = t2.options, i3 = e2.borderDash && e2.borderDash.length;
          return !(t2._decimated || t2._loop || e2.tension || "monotone" === e2.cubicInterpolationMode || e2.stepped || i3) ? to : Qn;
        }
        const io = "function" == typeof Path2D;
        function so(t2, e2, i3, s2) {
          io && !e2.options.segment ? function(t3, e3, i4, s3) {
            let n2 = e3._path;
            n2 || (n2 = e3._path = new Path2D(), e3.path(n2, i4, s3) && n2.closePath()), Gn(t3, e3.options), t3.stroke(n2);
          }(t2, e2, i3, s2) : function(t3, e3, i4, s3) {
            const { segments: n2, options: o2 } = e3, a2 = eo(e3);
            for (const r2 of n2)
              Gn(t3, o2, r2.style), t3.beginPath(), a2(t3, e3, r2, { start: i4, end: i4 + s3 - 1 }) && t3.closePath(), t3.stroke();
          }(t2, e2, i3, s2);
        }
        class no extends Hs {
          constructor(t2) {
            super(), this.animated = true, this.options = void 0, this._chart = void 0, this._loop = void 0, this._fullLoop = void 0, this._path = void 0, this._points = void 0, this._segments = void 0, this._decimated = false, this._pointsUpdated = false, this._datasetIndex = void 0, t2 && Object.assign(this, t2);
          }
          updateControlPoints(t2, e2) {
            const i3 = this.options;
            if ((i3.tension || "monotone" === i3.cubicInterpolationMode) && !i3.stepped && !this._pointsUpdated) {
              const s2 = i3.spanGaps ? this._loop : this._fullLoop;
              hi(this._points, i3, t2, s2, e2), this._pointsUpdated = true;
            }
          }
          set points(t2) {
            this._points = t2, delete this._segments, delete this._path, this._pointsUpdated = false;
          }
          get points() {
            return this._points;
          }
          get segments() {
            return this._segments || (this._segments = zi(this, this.options.segment));
          }
          first() {
            const t2 = this.segments, e2 = this.points;
            return t2.length && e2[t2[0].start];
          }
          last() {
            const t2 = this.segments, e2 = this.points, i3 = t2.length;
            return i3 && e2[t2[i3 - 1].end];
          }
          interpolate(t2, e2) {
            const i3 = this.options, s2 = t2[e2], n2 = this.points, o2 = Ii(this, { property: e2, start: s2, end: s2 });
            if (!o2.length)
              return;
            const a2 = [], r2 = function(t3) {
              return t3.stepped ? pi : t3.tension || "monotone" === t3.cubicInterpolationMode ? mi : gi;
            }(i3);
            let l2, h2;
            for (l2 = 0, h2 = o2.length; l2 < h2; ++l2) {
              const { start: h3, end: c2 } = o2[l2], d2 = n2[h3], u2 = n2[c2];
              if (d2 === u2) {
                a2.push(d2);
                continue;
              }
              const f2 = r2(d2, u2, Math.abs((s2 - d2[e2]) / (u2[e2] - d2[e2])), i3.stepped);
              f2[e2] = t2[e2], a2.push(f2);
            }
            return 1 === a2.length ? a2[0] : a2;
          }
          pathSegment(t2, e2, i3) {
            return eo(this)(t2, this, e2, i3);
          }
          path(t2, e2, i3) {
            const s2 = this.segments, n2 = eo(this);
            let o2 = this._loop;
            e2 = e2 || 0, i3 = i3 || this.points.length - e2;
            for (const a2 of s2)
              o2 &= n2(t2, this, a2, { start: e2, end: e2 + i3 - 1 });
            return !!o2;
          }
          draw(t2, e2, i3, s2) {
            const n2 = this.options || {};
            (this.points || []).length && n2.borderWidth && (t2.save(), so(t2, this, i3, s2), t2.restore()), this.animated && (this._pointsUpdated = false, this._path = void 0);
          }
        }
        __publicField(no, "id", "line");
        __publicField(no, "defaults", { borderCapStyle: "butt", borderDash: [], borderDashOffset: 0, borderJoinStyle: "miter", borderWidth: 3, capBezierPoints: true, cubicInterpolationMode: "default", fill: false, spanGaps: false, stepped: false, tension: 0 });
        __publicField(no, "defaultRoutes", { backgroundColor: "backgroundColor", borderColor: "borderColor" });
        __publicField(no, "descriptors", { _scriptable: true, _indexable: (t2) => "borderDash" !== t2 && "fill" !== t2 });
        function oo(t2, e2, i3, s2) {
          const n2 = t2.options, { [i3]: o2 } = t2.getProps([i3], s2);
          return Math.abs(e2 - o2) < n2.radius + n2.hitRadius;
        }
        function ao(t2, e2) {
          const { x: i3, y: s2, base: n2, width: o2, height: a2 } = t2.getProps(["x", "y", "base", "width", "height"], e2);
          let r2, l2, h2, c2, d2;
          return t2.horizontal ? (d2 = a2 / 2, r2 = Math.min(i3, n2), l2 = Math.max(i3, n2), h2 = s2 - d2, c2 = s2 + d2) : (d2 = o2 / 2, r2 = i3 - d2, l2 = i3 + d2, h2 = Math.min(s2, n2), c2 = Math.max(s2, n2)), { left: r2, top: h2, right: l2, bottom: c2 };
        }
        function ro(t2, e2, i3, s2) {
          return t2 ? 0 : J(e2, i3, s2);
        }
        function lo(t2) {
          const e2 = ao(t2), i3 = e2.right - e2.left, s2 = e2.bottom - e2.top, n2 = function(t3, e3, i4) {
            const s3 = t3.options.borderWidth, n3 = t3.borderSkipped, o2 = Mi(s3);
            return { t: ro(n3.top, o2.top, 0, i4), r: ro(n3.right, o2.right, 0, e3), b: ro(n3.bottom, o2.bottom, 0, i4), l: ro(n3.left, o2.left, 0, e3) };
          }(t2, i3 / 2, s2 / 2), a2 = function(t3, e3, i4) {
            const { enableBorderRadius: s3 } = t3.getProps(["enableBorderRadius"]), n3 = t3.options.borderRadius, a3 = wi(n3), r2 = Math.min(e3, i4), l2 = t3.borderSkipped, h2 = s3 || o(n3);
            return { topLeft: ro(!h2 || l2.top || l2.left, a3.topLeft, 0, r2), topRight: ro(!h2 || l2.top || l2.right, a3.topRight, 0, r2), bottomLeft: ro(!h2 || l2.bottom || l2.left, a3.bottomLeft, 0, r2), bottomRight: ro(!h2 || l2.bottom || l2.right, a3.bottomRight, 0, r2) };
          }(t2, i3 / 2, s2 / 2);
          return { outer: { x: e2.left, y: e2.top, w: i3, h: s2, radius: a2 }, inner: { x: e2.left + n2.l, y: e2.top + n2.t, w: i3 - n2.l - n2.r, h: s2 - n2.t - n2.b, radius: { topLeft: Math.max(0, a2.topLeft - Math.max(n2.t, n2.l)), topRight: Math.max(0, a2.topRight - Math.max(n2.t, n2.r)), bottomLeft: Math.max(0, a2.bottomLeft - Math.max(n2.b, n2.l)), bottomRight: Math.max(0, a2.bottomRight - Math.max(n2.b, n2.r)) } } };
        }
        function ho(t2, e2, i3, s2) {
          const n2 = null === e2, o2 = null === i3, a2 = t2 && !(n2 && o2) && ao(t2, s2);
          return a2 && (n2 || tt(e2, a2.left, a2.right)) && (o2 || tt(i3, a2.top, a2.bottom));
        }
        function co(t2, e2) {
          t2.rect(e2.x, e2.y, e2.w, e2.h);
        }
        function uo(t2, e2, i3 = {}) {
          const s2 = t2.x !== i3.x ? -e2 : 0, n2 = t2.y !== i3.y ? -e2 : 0, o2 = (t2.x + t2.w !== i3.x + i3.w ? e2 : 0) - s2, a2 = (t2.y + t2.h !== i3.y + i3.h ? e2 : 0) - n2;
          return { x: t2.x + s2, y: t2.y + n2, w: t2.w + o2, h: t2.h + a2, radius: t2.radius };
        }
        var fo = Object.freeze({ __proto__: null, ArcElement: (_g = class extends Hs {
          constructor(t2) {
            super();
            __publicField(this, "circumference");
            __publicField(this, "endAngle");
            __publicField(this, "fullCircles");
            __publicField(this, "innerRadius");
            __publicField(this, "outerRadius");
            __publicField(this, "pixelMargin");
            __publicField(this, "startAngle");
            this.options = void 0, this.circumference = void 0, this.startAngle = void 0, this.endAngle = void 0, this.innerRadius = void 0, this.outerRadius = void 0, this.pixelMargin = 0, this.fullCircles = 0, t2 && Object.assign(this, t2);
          }
          inRange(t2, e2, i3) {
            const s2 = this.getProps(["x", "y"], i3), { angle: n2, distance: o2 } = X(s2, { x: t2, y: e2 }), { startAngle: a2, endAngle: r2, innerRadius: h2, outerRadius: c2, circumference: d2 } = this.getProps(["startAngle", "endAngle", "innerRadius", "outerRadius", "circumference"], i3), u2 = (this.options.spacing + this.options.borderWidth) / 2, f2 = l(d2, r2 - a2) >= O || Z(n2, a2, r2), g2 = tt(o2, h2 + u2, c2 + u2);
            return f2 && g2;
          }
          getCenterPoint(t2) {
            const { x: e2, y: i3, startAngle: s2, endAngle: n2, innerRadius: o2, outerRadius: a2 } = this.getProps(["x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius"], t2), { offset: r2, spacing: l2 } = this.options, h2 = (s2 + n2) / 2, c2 = (o2 + a2 + l2 + r2) / 2;
            return { x: e2 + Math.cos(h2) * c2, y: i3 + Math.sin(h2) * c2 };
          }
          tooltipPosition(t2) {
            return this.getCenterPoint(t2);
          }
          draw(t2) {
            const { options: e2, circumference: i3 } = this, s2 = (e2.offset || 0) / 4, n2 = (e2.spacing || 0) / 2, o2 = e2.circular;
            if (this.pixelMargin = "inner" === e2.borderAlign ? 0.33 : 0, this.fullCircles = i3 > O ? Math.floor(i3 / O) : 0, 0 === i3 || this.innerRadius < 0 || this.outerRadius < 0)
              return;
            t2.save();
            const a2 = (this.startAngle + this.endAngle) / 2;
            t2.translate(Math.cos(a2) * s2, Math.sin(a2) * s2);
            const r2 = s2 * (1 - Math.sin(Math.min(C, i3 || 0)));
            t2.fillStyle = e2.backgroundColor, t2.strokeStyle = e2.borderColor, function(t3, e3, i4, s3, n3) {
              const { fullCircles: o3, startAngle: a3, circumference: r3 } = e3;
              let l2 = e3.endAngle;
              if (o3) {
                qn(t3, e3, i4, s3, l2, n3);
                for (let e4 = 0; e4 < o3; ++e4)
                  t3.fill();
                isNaN(r3) || (l2 = a3 + (r3 % O || O));
              }
              qn(t3, e3, i4, s3, l2, n3), t3.fill();
            }(t2, this, r2, n2, o2), Kn(t2, this, r2, n2, o2), t2.restore();
          }
        }, __publicField(_g, "id", "arc"), __publicField(_g, "defaults", { borderAlign: "center", borderColor: "#fff", borderDash: [], borderDashOffset: 0, borderJoinStyle: void 0, borderRadius: 0, borderWidth: 2, offset: 0, spacing: 0, angle: void 0, circular: true }), __publicField(_g, "defaultRoutes", { backgroundColor: "backgroundColor" }), __publicField(_g, "descriptors", { _scriptable: true, _indexable: (t2) => "borderDash" !== t2 }), _g), BarElement: (_h = class extends Hs {
          constructor(t2) {
            super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t2 && Object.assign(this, t2);
          }
          draw(t2) {
            const { inflateAmount: e2, options: { borderColor: i3, backgroundColor: s2 } } = this, { inner: n2, outer: o2 } = lo(this), a2 = (r2 = o2.radius).topLeft || r2.topRight || r2.bottomLeft || r2.bottomRight ? He : co;
            var r2;
            t2.save(), o2.w === n2.w && o2.h === n2.h || (t2.beginPath(), a2(t2, uo(o2, e2, n2)), t2.clip(), a2(t2, uo(n2, -e2, o2)), t2.fillStyle = i3, t2.fill("evenodd")), t2.beginPath(), a2(t2, uo(n2, e2)), t2.fillStyle = s2, t2.fill(), t2.restore();
          }
          inRange(t2, e2, i3) {
            return ho(this, t2, e2, i3);
          }
          inXRange(t2, e2) {
            return ho(this, t2, null, e2);
          }
          inYRange(t2, e2) {
            return ho(this, null, t2, e2);
          }
          getCenterPoint(t2) {
            const { x: e2, y: i3, base: s2, horizontal: n2 } = this.getProps(["x", "y", "base", "horizontal"], t2);
            return { x: n2 ? (e2 + s2) / 2 : e2, y: n2 ? i3 : (i3 + s2) / 2 };
          }
          getRange(t2) {
            return "x" === t2 ? this.width / 2 : this.height / 2;
          }
        }, __publicField(_h, "id", "bar"), __publicField(_h, "defaults", { borderSkipped: "start", borderWidth: 0, borderRadius: 0, inflateAmount: "auto", pointStyle: void 0 }), __publicField(_h, "defaultRoutes", { backgroundColor: "backgroundColor", borderColor: "borderColor" }), _h), LineElement: no, PointElement: (_i2 = class extends Hs {
          constructor(t2) {
            super();
            __publicField(this, "parsed");
            __publicField(this, "skip");
            __publicField(this, "stop");
            this.options = void 0, this.parsed = void 0, this.skip = void 0, this.stop = void 0, t2 && Object.assign(this, t2);
          }
          inRange(t2, e2, i3) {
            const s2 = this.options, { x: n2, y: o2 } = this.getProps(["x", "y"], i3);
            return Math.pow(t2 - n2, 2) + Math.pow(e2 - o2, 2) < Math.pow(s2.hitRadius + s2.radius, 2);
          }
          inXRange(t2, e2) {
            return oo(this, t2, "x", e2);
          }
          inYRange(t2, e2) {
            return oo(this, t2, "y", e2);
          }
          getCenterPoint(t2) {
            const { x: e2, y: i3 } = this.getProps(["x", "y"], t2);
            return { x: e2, y: i3 };
          }
          size(t2) {
            let e2 = (t2 = t2 || this.options || {}).radius || 0;
            e2 = Math.max(e2, e2 && t2.hoverRadius || 0);
            return 2 * (e2 + (e2 && t2.borderWidth || 0));
          }
          draw(t2, e2) {
            const i3 = this.options;
            this.skip || i3.radius < 0.1 || !Re(this, e2, this.size(i3) / 2) || (t2.strokeStyle = i3.borderColor, t2.lineWidth = i3.borderWidth, t2.fillStyle = i3.backgroundColor, Le(t2, i3, this.x, this.y));
          }
          getRange() {
            const t2 = this.options || {};
            return t2.radius + t2.hitRadius;
          }
        }, __publicField(_i2, "id", "point"), __publicField(_i2, "defaults", { borderWidth: 1, hitRadius: 1, hoverBorderWidth: 1, hoverRadius: 4, pointStyle: "circle", radius: 3, rotation: 0 }), __publicField(_i2, "defaultRoutes", { backgroundColor: "backgroundColor", borderColor: "borderColor" }), _i2) });
        function go(t2, e2, i3, s2) {
          const n2 = t2.indexOf(e2);
          if (-1 === n2)
            return ((t3, e3, i4, s3) => ("string" == typeof e3 ? (i4 = t3.push(e3) - 1, s3.unshift({ index: i4, label: e3 })) : isNaN(e3) && (i4 = null), i4))(t2, e2, i3, s2);
          return n2 !== t2.lastIndexOf(e2) ? i3 : n2;
        }
        function po(t2) {
          const e2 = this.getLabels();
          return t2 >= 0 && t2 < e2.length ? e2[t2] : t2;
        }
        function mo(t2, e2, { horizontal: i3, minRotation: s2 }) {
          const n2 = $(s2), o2 = (i3 ? Math.sin(n2) : Math.cos(n2)) || 1e-3, a2 = 0.75 * e2 * ("" + t2).length;
          return Math.min(e2 / o2, a2);
        }
        class xo extends Js {
          constructor(t2) {
            super(t2), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
          }
          parse(t2, e2) {
            return s(t2) || ("number" == typeof t2 || t2 instanceof Number) && !isFinite(+t2) ? null : +t2;
          }
          handleTickRangeOptions() {
            const { beginAtZero: t2 } = this.options, { minDefined: e2, maxDefined: i3 } = this.getUserBounds();
            let { min: s2, max: n2 } = this;
            const o2 = (t3) => s2 = e2 ? s2 : t3, a2 = (t3) => n2 = i3 ? n2 : t3;
            if (t2) {
              const t3 = F(s2), e3 = F(n2);
              t3 < 0 && e3 < 0 ? a2(0) : t3 > 0 && e3 > 0 && o2(0);
            }
            if (s2 === n2) {
              let e3 = 0 === n2 ? 1 : Math.abs(0.05 * n2);
              a2(n2 + e3), t2 || o2(s2 - e3);
            }
            this.min = s2, this.max = n2;
          }
          getTickLimit() {
            const t2 = this.options.ticks;
            let e2, { maxTicksLimit: i3, stepSize: s2 } = t2;
            return s2 ? (e2 = Math.ceil(this.max / s2) - Math.floor(this.min / s2) + 1, e2 > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${s2} would result generating up to ${e2} ticks. Limiting to 1000.`), e2 = 1e3)) : (e2 = this.computeTickLimit(), i3 = i3 || 11), i3 && (e2 = Math.min(i3, e2)), e2;
          }
          computeTickLimit() {
            return Number.POSITIVE_INFINITY;
          }
          buildTicks() {
            const t2 = this.options, e2 = t2.ticks;
            let i3 = this.getTickLimit();
            i3 = Math.max(2, i3);
            const n2 = function(t3, e3) {
              const i4 = [], { bounds: n3, step: o2, min: a2, max: r2, precision: l2, count: h2, maxTicks: c2, maxDigits: d2, includeBounds: u2 } = t3, f2 = o2 || 1, g2 = c2 - 1, { min: p2, max: m2 } = e3, x2 = !s(a2), b2 = !s(r2), _2 = !s(h2), y2 = (m2 - p2) / (d2 + 1);
              let v2, M2, w2, k2, S2 = B((m2 - p2) / g2 / f2) * f2;
              if (S2 < 1e-14 && !x2 && !b2)
                return [{ value: p2 }, { value: m2 }];
              k2 = Math.ceil(m2 / S2) - Math.floor(p2 / S2), k2 > g2 && (S2 = B(k2 * S2 / g2 / f2) * f2), s(l2) || (v2 = Math.pow(10, l2), S2 = Math.ceil(S2 * v2) / v2), "ticks" === n3 ? (M2 = Math.floor(p2 / S2) * S2, w2 = Math.ceil(m2 / S2) * S2) : (M2 = p2, w2 = m2), x2 && b2 && o2 && H((r2 - a2) / o2, S2 / 1e3) ? (k2 = Math.round(Math.min((r2 - a2) / S2, c2)), S2 = (r2 - a2) / k2, M2 = a2, w2 = r2) : _2 ? (M2 = x2 ? a2 : M2, w2 = b2 ? r2 : w2, k2 = h2 - 1, S2 = (w2 - M2) / k2) : (k2 = (w2 - M2) / S2, k2 = V(k2, Math.round(k2), S2 / 1e3) ? Math.round(k2) : Math.ceil(k2));
              const P2 = Math.max(U(S2), U(M2));
              v2 = Math.pow(10, s(l2) ? P2 : l2), M2 = Math.round(M2 * v2) / v2, w2 = Math.round(w2 * v2) / v2;
              let D2 = 0;
              for (x2 && (u2 && M2 !== a2 ? (i4.push({ value: a2 }), M2 < a2 && D2++, V(Math.round((M2 + D2 * S2) * v2) / v2, a2, mo(a2, y2, t3)) && D2++) : M2 < a2 && D2++); D2 < k2; ++D2) {
                const t4 = Math.round((M2 + D2 * S2) * v2) / v2;
                if (b2 && t4 > r2)
                  break;
                i4.push({ value: t4 });
              }
              return b2 && u2 && w2 !== r2 ? i4.length && V(i4[i4.length - 1].value, r2, mo(r2, y2, t3)) ? i4[i4.length - 1].value = r2 : i4.push({ value: r2 }) : b2 && w2 !== r2 || i4.push({ value: w2 }), i4;
            }({ maxTicks: i3, bounds: t2.bounds, min: t2.min, max: t2.max, precision: e2.precision, step: e2.stepSize, count: e2.count, maxDigits: this._maxDigits(), horizontal: this.isHorizontal(), minRotation: e2.minRotation || 0, includeBounds: false !== e2.includeBounds }, this._range || this);
            return "ticks" === t2.bounds && j(n2, this, "value"), t2.reverse ? (n2.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), n2;
          }
          configure() {
            const t2 = this.ticks;
            let e2 = this.min, i3 = this.max;
            if (super.configure(), this.options.offset && t2.length) {
              const s2 = (i3 - e2) / Math.max(t2.length - 1, 1) / 2;
              e2 -= s2, i3 += s2;
            }
            this._startValue = e2, this._endValue = i3, this._valueRange = i3 - e2;
          }
          getLabelForValue(t2) {
            return ne(t2, this.chart.options.locale, this.options.ticks.format);
          }
        }
        class bo extends xo {
          determineDataLimits() {
            const { min: t2, max: e2 } = this.getMinMax(true);
            this.min = a(t2) ? t2 : 0, this.max = a(e2) ? e2 : 1, this.handleTickRangeOptions();
          }
          computeTickLimit() {
            const t2 = this.isHorizontal(), e2 = t2 ? this.width : this.height, i3 = $(this.options.ticks.minRotation), s2 = (t2 ? Math.sin(i3) : Math.cos(i3)) || 1e-3, n2 = this._resolveTickFontOptions(0);
            return Math.ceil(e2 / Math.min(40, n2.lineHeight / s2));
          }
          getPixelForValue(t2) {
            return null === t2 ? NaN : this.getPixelForDecimal((t2 - this._startValue) / this._valueRange);
          }
          getValueForPixel(t2) {
            return this._startValue + this.getDecimalForPixel(t2) * this._valueRange;
          }
        }
        __publicField(bo, "id", "linear");
        __publicField(bo, "defaults", { ticks: { callback: ae.formatters.numeric } });
        const _o = (t2) => Math.floor(z(t2)), yo = (t2, e2) => Math.pow(10, _o(t2) + e2);
        function vo(t2) {
          return 1 === t2 / Math.pow(10, _o(t2));
        }
        function Mo(t2, e2, i3) {
          const s2 = Math.pow(10, i3), n2 = Math.floor(t2 / s2);
          return Math.ceil(e2 / s2) - n2;
        }
        function wo(t2, { min: e2, max: i3 }) {
          e2 = r(t2.min, e2);
          const s2 = [], n2 = _o(e2);
          let o2 = function(t3, e3) {
            let i4 = _o(e3 - t3);
            for (; Mo(t3, e3, i4) > 10; )
              i4++;
            for (; Mo(t3, e3, i4) < 10; )
              i4--;
            return Math.min(i4, _o(t3));
          }(e2, i3), a2 = o2 < 0 ? Math.pow(10, Math.abs(o2)) : 1;
          const l2 = Math.pow(10, o2), h2 = n2 > o2 ? Math.pow(10, n2) : 0, c2 = Math.round((e2 - h2) * a2) / a2, d2 = Math.floor((e2 - h2) / l2 / 10) * l2 * 10;
          let u2 = Math.floor((c2 - d2) / Math.pow(10, o2)), f2 = r(t2.min, Math.round((h2 + d2 + u2 * Math.pow(10, o2)) * a2) / a2);
          for (; f2 < i3; )
            s2.push({ value: f2, major: vo(f2), significand: u2 }), u2 >= 10 ? u2 = u2 < 15 ? 15 : 20 : u2++, u2 >= 20 && (o2++, u2 = 2, a2 = o2 >= 0 ? 1 : a2), f2 = Math.round((h2 + d2 + u2 * Math.pow(10, o2)) * a2) / a2;
          const g2 = r(t2.max, f2);
          return s2.push({ value: g2, major: vo(g2), significand: u2 }), s2;
        }
        class ko extends Js {
          constructor(t2) {
            super(t2), this.start = void 0, this.end = void 0, this._startValue = void 0, this._valueRange = 0;
          }
          parse(t2, e2) {
            const i3 = xo.prototype.parse.apply(this, [t2, e2]);
            if (0 !== i3)
              return a(i3) && i3 > 0 ? i3 : null;
            this._zero = true;
          }
          determineDataLimits() {
            const { min: t2, max: e2 } = this.getMinMax(true);
            this.min = a(t2) ? Math.max(0, t2) : null, this.max = a(e2) ? Math.max(0, e2) : null, this.options.beginAtZero && (this._zero = true), this._zero && this.min !== this._suggestedMin && !a(this._userMin) && (this.min = t2 === yo(this.min, 0) ? yo(this.min, -1) : yo(this.min, 0)), this.handleTickRangeOptions();
          }
          handleTickRangeOptions() {
            const { minDefined: t2, maxDefined: e2 } = this.getUserBounds();
            let i3 = this.min, s2 = this.max;
            const n2 = (e3) => i3 = t2 ? i3 : e3, o2 = (t3) => s2 = e2 ? s2 : t3;
            i3 === s2 && (i3 <= 0 ? (n2(1), o2(10)) : (n2(yo(i3, -1)), o2(yo(s2, 1)))), i3 <= 0 && n2(yo(s2, -1)), s2 <= 0 && o2(yo(i3, 1)), this.min = i3, this.max = s2;
          }
          buildTicks() {
            const t2 = this.options, e2 = wo({ min: this._userMin, max: this._userMax }, this);
            return "ticks" === t2.bounds && j(e2, this, "value"), t2.reverse ? (e2.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), e2;
          }
          getLabelForValue(t2) {
            return void 0 === t2 ? "0" : ne(t2, this.chart.options.locale, this.options.ticks.format);
          }
          configure() {
            const t2 = this.min;
            super.configure(), this._startValue = z(t2), this._valueRange = z(this.max) - z(t2);
          }
          getPixelForValue(t2) {
            return void 0 !== t2 && 0 !== t2 || (t2 = this.min), null === t2 || isNaN(t2) ? NaN : this.getPixelForDecimal(t2 === this.min ? 0 : (z(t2) - this._startValue) / this._valueRange);
          }
          getValueForPixel(t2) {
            const e2 = this.getDecimalForPixel(t2);
            return Math.pow(10, this._startValue + e2 * this._valueRange);
          }
        }
        __publicField(ko, "id", "logarithmic");
        __publicField(ko, "defaults", { ticks: { callback: ae.formatters.logarithmic, major: { enabled: true } } });
        function So(t2) {
          const e2 = t2.ticks;
          if (e2.display && t2.display) {
            const t3 = ki(e2.backdropPadding);
            return l(e2.font && e2.font.size, ue.font.size) + t3.height;
          }
          return 0;
        }
        function Po(t2, e2, i3, s2, n2) {
          return t2 === s2 || t2 === n2 ? { start: e2 - i3 / 2, end: e2 + i3 / 2 } : t2 < s2 || t2 > n2 ? { start: e2 - i3, end: e2 } : { start: e2, end: e2 + i3 };
        }
        function Do(t2) {
          const e2 = { l: t2.left + t2._padding.left, r: t2.right - t2._padding.right, t: t2.top + t2._padding.top, b: t2.bottom - t2._padding.bottom }, i3 = Object.assign({}, e2), s2 = [], o2 = [], a2 = t2._pointLabels.length, r2 = t2.options.pointLabels, l2 = r2.centerPointLabels ? C / a2 : 0;
          for (let u2 = 0; u2 < a2; u2++) {
            const a3 = r2.setContext(t2.getPointLabelContext(u2));
            o2[u2] = a3.padding;
            const f2 = t2.getPointPosition(u2, t2.drawingArea + o2[u2], l2), g2 = Si(a3.font), p2 = (h2 = t2.ctx, c2 = g2, d2 = n(d2 = t2._pointLabels[u2]) ? d2 : [d2], { w: Oe(h2, c2.string, d2), h: d2.length * c2.lineHeight });
            s2[u2] = p2;
            const m2 = G(t2.getIndexAngle(u2) + l2), x2 = Math.round(Y(m2));
            Co(i3, e2, m2, Po(x2, f2.x, p2.w, 0, 180), Po(x2, f2.y, p2.h, 90, 270));
          }
          var h2, c2, d2;
          t2.setCenterPoint(e2.l - i3.l, i3.r - e2.r, e2.t - i3.t, i3.b - e2.b), t2._pointLabelItems = function(t3, e3, i4) {
            const s3 = [], n2 = t3._pointLabels.length, o3 = t3.options, { centerPointLabels: a3, display: r3 } = o3.pointLabels, l3 = { extra: So(o3) / 2, additionalAngle: a3 ? C / n2 : 0 };
            let h3;
            for (let o4 = 0; o4 < n2; o4++) {
              l3.padding = i4[o4], l3.size = e3[o4];
              const n3 = Oo(t3, o4, l3);
              s3.push(n3), "auto" === r3 && (n3.visible = Ao(n3, h3), n3.visible && (h3 = n3));
            }
            return s3;
          }(t2, s2, o2);
        }
        function Co(t2, e2, i3, s2, n2) {
          const o2 = Math.abs(Math.sin(i3)), a2 = Math.abs(Math.cos(i3));
          let r2 = 0, l2 = 0;
          s2.start < e2.l ? (r2 = (e2.l - s2.start) / o2, t2.l = Math.min(t2.l, e2.l - r2)) : s2.end > e2.r && (r2 = (s2.end - e2.r) / o2, t2.r = Math.max(t2.r, e2.r + r2)), n2.start < e2.t ? (l2 = (e2.t - n2.start) / a2, t2.t = Math.min(t2.t, e2.t - l2)) : n2.end > e2.b && (l2 = (n2.end - e2.b) / a2, t2.b = Math.max(t2.b, e2.b + l2));
        }
        function Oo(t2, e2, i3) {
          const s2 = t2.drawingArea, { extra: n2, additionalAngle: o2, padding: a2, size: r2 } = i3, l2 = t2.getPointPosition(e2, s2 + n2 + a2, o2), h2 = Math.round(Y(G(l2.angle + E))), c2 = function(t3, e3, i4) {
            90 === i4 || 270 === i4 ? t3 -= e3 / 2 : (i4 > 270 || i4 < 90) && (t3 -= e3);
            return t3;
          }(l2.y, r2.h, h2), d2 = function(t3) {
            if (0 === t3 || 180 === t3)
              return "center";
            if (t3 < 180)
              return "left";
            return "right";
          }(h2), u2 = function(t3, e3, i4) {
            "right" === i4 ? t3 -= e3 : "center" === i4 && (t3 -= e3 / 2);
            return t3;
          }(l2.x, r2.w, d2);
          return { visible: true, x: l2.x, y: c2, textAlign: d2, left: u2, top: c2, right: u2 + r2.w, bottom: c2 + r2.h };
        }
        function Ao(t2, e2) {
          if (!e2)
            return true;
          const { left: i3, top: s2, right: n2, bottom: o2 } = t2;
          return !(Re({ x: i3, y: s2 }, e2) || Re({ x: i3, y: o2 }, e2) || Re({ x: n2, y: s2 }, e2) || Re({ x: n2, y: o2 }, e2));
        }
        function To(t2, e2, i3) {
          const { left: n2, top: o2, right: a2, bottom: r2 } = i3, { backdropColor: l2 } = e2;
          if (!s(l2)) {
            const i4 = wi(e2.borderRadius), s2 = ki(e2.backdropPadding);
            t2.fillStyle = l2;
            const h2 = n2 - s2.left, c2 = o2 - s2.top, d2 = a2 - n2 + s2.width, u2 = r2 - o2 + s2.height;
            Object.values(i4).some((t3) => 0 !== t3) ? (t2.beginPath(), He(t2, { x: h2, y: c2, w: d2, h: u2, radius: i4 }), t2.fill()) : t2.fillRect(h2, c2, d2, u2);
          }
        }
        function Lo(t2, e2, i3, s2) {
          const { ctx: n2 } = t2;
          if (i3)
            n2.arc(t2.xCenter, t2.yCenter, e2, 0, O);
          else {
            let i4 = t2.getPointPosition(0, e2);
            n2.moveTo(i4.x, i4.y);
            for (let o2 = 1; o2 < s2; o2++)
              i4 = t2.getPointPosition(o2, e2), n2.lineTo(i4.x, i4.y);
          }
        }
        class Eo extends xo {
          constructor(t2) {
            super(t2), this.xCenter = void 0, this.yCenter = void 0, this.drawingArea = void 0, this._pointLabels = [], this._pointLabelItems = [];
          }
          setDimensions() {
            const t2 = this._padding = ki(So(this.options) / 2), e2 = this.width = this.maxWidth - t2.width, i3 = this.height = this.maxHeight - t2.height;
            this.xCenter = Math.floor(this.left + e2 / 2 + t2.left), this.yCenter = Math.floor(this.top + i3 / 2 + t2.top), this.drawingArea = Math.floor(Math.min(e2, i3) / 2);
          }
          determineDataLimits() {
            const { min: t2, max: e2 } = this.getMinMax(false);
            this.min = a(t2) && !isNaN(t2) ? t2 : 0, this.max = a(e2) && !isNaN(e2) ? e2 : 0, this.handleTickRangeOptions();
          }
          computeTickLimit() {
            return Math.ceil(this.drawingArea / So(this.options));
          }
          generateTickLabels(t2) {
            xo.prototype.generateTickLabels.call(this, t2), this._pointLabels = this.getLabels().map((t3, e2) => {
              const i3 = d(this.options.pointLabels.callback, [t3, e2], this);
              return i3 || 0 === i3 ? i3 : "";
            }).filter((t3, e2) => this.chart.getDataVisibility(e2));
          }
          fit() {
            const t2 = this.options;
            t2.display && t2.pointLabels.display ? Do(this) : this.setCenterPoint(0, 0, 0, 0);
          }
          setCenterPoint(t2, e2, i3, s2) {
            this.xCenter += Math.floor((t2 - e2) / 2), this.yCenter += Math.floor((i3 - s2) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(t2, e2, i3, s2));
          }
          getIndexAngle(t2) {
            return G(t2 * (O / (this._pointLabels.length || 1)) + $(this.options.startAngle || 0));
          }
          getDistanceFromCenterForValue(t2) {
            if (s(t2))
              return NaN;
            const e2 = this.drawingArea / (this.max - this.min);
            return this.options.reverse ? (this.max - t2) * e2 : (t2 - this.min) * e2;
          }
          getValueForDistanceFromCenter(t2) {
            if (s(t2))
              return NaN;
            const e2 = t2 / (this.drawingArea / (this.max - this.min));
            return this.options.reverse ? this.max - e2 : this.min + e2;
          }
          getPointLabelContext(t2) {
            const e2 = this._pointLabels || [];
            if (t2 >= 0 && t2 < e2.length) {
              const i3 = e2[t2];
              return function(t3, e3, i4) {
                return Ci(t3, { label: i4, index: e3, type: "pointLabel" });
              }(this.getContext(), t2, i3);
            }
          }
          getPointPosition(t2, e2, i3 = 0) {
            const s2 = this.getIndexAngle(t2) - E + i3;
            return { x: Math.cos(s2) * e2 + this.xCenter, y: Math.sin(s2) * e2 + this.yCenter, angle: s2 };
          }
          getPointPositionForValue(t2, e2) {
            return this.getPointPosition(t2, this.getDistanceFromCenterForValue(e2));
          }
          getBasePosition(t2) {
            return this.getPointPositionForValue(t2 || 0, this.getBaseValue());
          }
          getPointLabelPosition(t2) {
            const { left: e2, top: i3, right: s2, bottom: n2 } = this._pointLabelItems[t2];
            return { left: e2, top: i3, right: s2, bottom: n2 };
          }
          drawBackground() {
            const { backgroundColor: t2, grid: { circular: e2 } } = this.options;
            if (t2) {
              const i3 = this.ctx;
              i3.save(), i3.beginPath(), Lo(this, this.getDistanceFromCenterForValue(this._endValue), e2, this._pointLabels.length), i3.closePath(), i3.fillStyle = t2, i3.fill(), i3.restore();
            }
          }
          drawGrid() {
            const t2 = this.ctx, e2 = this.options, { angleLines: i3, grid: s2, border: n2 } = e2, o2 = this._pointLabels.length;
            let a2, r2, l2;
            if (e2.pointLabels.display && function(t3, e3) {
              const { ctx: i4, options: { pointLabels: s3 } } = t3;
              for (let n3 = e3 - 1; n3 >= 0; n3--) {
                const e4 = t3._pointLabelItems[n3];
                if (!e4.visible)
                  continue;
                const o3 = s3.setContext(t3.getPointLabelContext(n3));
                To(i4, o3, e4);
                const a3 = Si(o3.font), { x: r3, y: l3, textAlign: h2 } = e4;
                Ne(i4, t3._pointLabels[n3], r3, l3 + a3.lineHeight / 2, a3, { color: o3.color, textAlign: h2, textBaseline: "middle" });
              }
            }(this, o2), s2.display && this.ticks.forEach((t3, e3) => {
              if (0 !== e3 || 0 === e3 && this.min < 0) {
                r2 = this.getDistanceFromCenterForValue(t3.value);
                const i4 = this.getContext(e3), a3 = s2.setContext(i4), l3 = n2.setContext(i4);
                !function(t4, e4, i5, s3, n3) {
                  const o3 = t4.ctx, a4 = e4.circular, { color: r3, lineWidth: l4 } = e4;
                  !a4 && !s3 || !r3 || !l4 || i5 < 0 || (o3.save(), o3.strokeStyle = r3, o3.lineWidth = l4, o3.setLineDash(n3.dash), o3.lineDashOffset = n3.dashOffset, o3.beginPath(), Lo(t4, i5, a4, s3), o3.closePath(), o3.stroke(), o3.restore());
                }(this, a3, r2, o2, l3);
              }
            }), i3.display) {
              for (t2.save(), a2 = o2 - 1; a2 >= 0; a2--) {
                const s3 = i3.setContext(this.getPointLabelContext(a2)), { color: n3, lineWidth: o3 } = s3;
                o3 && n3 && (t2.lineWidth = o3, t2.strokeStyle = n3, t2.setLineDash(s3.borderDash), t2.lineDashOffset = s3.borderDashOffset, r2 = this.getDistanceFromCenterForValue(e2.ticks.reverse ? this.min : this.max), l2 = this.getPointPosition(a2, r2), t2.beginPath(), t2.moveTo(this.xCenter, this.yCenter), t2.lineTo(l2.x, l2.y), t2.stroke());
              }
              t2.restore();
            }
          }
          drawBorder() {
          }
          drawLabels() {
            const t2 = this.ctx, e2 = this.options, i3 = e2.ticks;
            if (!i3.display)
              return;
            const s2 = this.getIndexAngle(0);
            let n2, o2;
            t2.save(), t2.translate(this.xCenter, this.yCenter), t2.rotate(s2), t2.textAlign = "center", t2.textBaseline = "middle", this.ticks.forEach((s3, a2) => {
              if (0 === a2 && this.min >= 0 && !e2.reverse)
                return;
              const r2 = i3.setContext(this.getContext(a2)), l2 = Si(r2.font);
              if (n2 = this.getDistanceFromCenterForValue(this.ticks[a2].value), r2.showLabelBackdrop) {
                t2.font = l2.string, o2 = t2.measureText(s3.label).width, t2.fillStyle = r2.backdropColor;
                const e3 = ki(r2.backdropPadding);
                t2.fillRect(-o2 / 2 - e3.left, -n2 - l2.size / 2 - e3.top, o2 + e3.width, l2.size + e3.height);
              }
              Ne(t2, s3.label, 0, -n2, l2, { color: r2.color, strokeColor: r2.textStrokeColor, strokeWidth: r2.textStrokeWidth });
            }), t2.restore();
          }
          drawTitle() {
          }
        }
        __publicField(Eo, "id", "radialLinear");
        __publicField(Eo, "defaults", { display: true, animate: true, position: "chartArea", angleLines: { display: true, lineWidth: 1, borderDash: [], borderDashOffset: 0 }, grid: { circular: false }, startAngle: 0, ticks: { showLabelBackdrop: true, callback: ae.formatters.numeric }, pointLabels: { backdropColor: void 0, backdropPadding: 2, display: true, font: { size: 10 }, callback: (t2) => t2, padding: 5, centerPointLabels: false } });
        __publicField(Eo, "defaultRoutes", { "angleLines.color": "borderColor", "pointLabels.color": "color", "ticks.color": "color" });
        __publicField(Eo, "descriptors", { angleLines: { _fallback: "grid" } });
        const Ro = { millisecond: { common: true, size: 1, steps: 1e3 }, second: { common: true, size: 1e3, steps: 60 }, minute: { common: true, size: 6e4, steps: 60 }, hour: { common: true, size: 36e5, steps: 24 }, day: { common: true, size: 864e5, steps: 30 }, week: { common: false, size: 6048e5, steps: 4 }, month: { common: true, size: 2628e6, steps: 12 }, quarter: { common: false, size: 7884e6, steps: 4 }, year: { common: true, size: 3154e7 } }, Io = Object.keys(Ro);
        function zo(t2, e2) {
          return t2 - e2;
        }
        function Fo(t2, e2) {
          if (s(e2))
            return null;
          const i3 = t2._adapter, { parser: n2, round: o2, isoWeekday: r2 } = t2._parseOpts;
          let l2 = e2;
          return "function" == typeof n2 && (l2 = n2(l2)), a(l2) || (l2 = "string" == typeof n2 ? i3.parse(l2, n2) : i3.parse(l2)), null === l2 ? null : (o2 && (l2 = "week" !== o2 || !N(r2) && true !== r2 ? i3.startOf(l2, o2) : i3.startOf(l2, "isoWeek", r2)), +l2);
        }
        function Vo(t2, e2, i3, s2) {
          const n2 = Io.length;
          for (let o2 = Io.indexOf(t2); o2 < n2 - 1; ++o2) {
            const t3 = Ro[Io[o2]], n3 = t3.steps ? t3.steps : Number.MAX_SAFE_INTEGER;
            if (t3.common && Math.ceil((i3 - e2) / (n3 * t3.size)) <= s2)
              return Io[o2];
          }
          return Io[n2 - 1];
        }
        function Bo(t2, e2, i3) {
          if (i3) {
            if (i3.length) {
              const { lo: s2, hi: n2 } = et(i3, e2);
              t2[i3[s2] >= e2 ? i3[s2] : i3[n2]] = true;
            }
          } else
            t2[e2] = true;
        }
        function Wo(t2, e2, i3) {
          const s2 = [], n2 = {}, o2 = e2.length;
          let a2, r2;
          for (a2 = 0; a2 < o2; ++a2)
            r2 = e2[a2], n2[r2] = a2, s2.push({ value: r2, major: false });
          return 0 !== o2 && i3 ? function(t3, e3, i4, s3) {
            const n3 = t3._adapter, o3 = +n3.startOf(e3[0].value, s3), a3 = e3[e3.length - 1].value;
            let r3, l2;
            for (r3 = o3; r3 <= a3; r3 = +n3.add(r3, 1, s3))
              l2 = i4[r3], l2 >= 0 && (e3[l2].major = true);
            return e3;
          }(t2, s2, n2, i3) : s2;
        }
        class No extends Js {
          constructor(t2) {
            super(t2), this._cache = { data: [], labels: [], all: [] }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = false, this._parseOpts = void 0;
          }
          init(t2, e2 = {}) {
            const i3 = t2.time || (t2.time = {}), s2 = this._adapter = new Rn._date(t2.adapters.date);
            s2.init(e2), b(i3.displayFormats, s2.formats()), this._parseOpts = { parser: i3.parser, round: i3.round, isoWeekday: i3.isoWeekday }, super.init(t2), this._normalized = e2.normalized;
          }
          parse(t2, e2) {
            return void 0 === t2 ? null : Fo(this, t2);
          }
          beforeLayout() {
            super.beforeLayout(), this._cache = { data: [], labels: [], all: [] };
          }
          determineDataLimits() {
            const t2 = this.options, e2 = this._adapter, i3 = t2.time.unit || "day";
            let { min: s2, max: n2, minDefined: o2, maxDefined: r2 } = this.getUserBounds();
            function l2(t3) {
              o2 || isNaN(t3.min) || (s2 = Math.min(s2, t3.min)), r2 || isNaN(t3.max) || (n2 = Math.max(n2, t3.max));
            }
            o2 && r2 || (l2(this._getLabelBounds()), "ticks" === t2.bounds && "labels" === t2.ticks.source || l2(this.getMinMax(false))), s2 = a(s2) && !isNaN(s2) ? s2 : +e2.startOf(Date.now(), i3), n2 = a(n2) && !isNaN(n2) ? n2 : +e2.endOf(Date.now(), i3) + 1, this.min = Math.min(s2, n2 - 1), this.max = Math.max(s2 + 1, n2);
          }
          _getLabelBounds() {
            const t2 = this.getLabelTimestamps();
            let e2 = Number.POSITIVE_INFINITY, i3 = Number.NEGATIVE_INFINITY;
            return t2.length && (e2 = t2[0], i3 = t2[t2.length - 1]), { min: e2, max: i3 };
          }
          buildTicks() {
            const t2 = this.options, e2 = t2.time, i3 = t2.ticks, s2 = "labels" === i3.source ? this.getLabelTimestamps() : this._generate();
            "ticks" === t2.bounds && s2.length && (this.min = this._userMin || s2[0], this.max = this._userMax || s2[s2.length - 1]);
            const n2 = this.min, o2 = nt(s2, n2, this.max);
            return this._unit = e2.unit || (i3.autoSkip ? Vo(e2.minUnit, this.min, this.max, this._getLabelCapacity(n2)) : function(t3, e3, i4, s3, n3) {
              for (let o3 = Io.length - 1; o3 >= Io.indexOf(i4); o3--) {
                const i5 = Io[o3];
                if (Ro[i5].common && t3._adapter.diff(n3, s3, i5) >= e3 - 1)
                  return i5;
              }
              return Io[i4 ? Io.indexOf(i4) : 0];
            }(this, o2.length, e2.minUnit, this.min, this.max)), this._majorUnit = i3.major.enabled && "year" !== this._unit ? function(t3) {
              for (let e3 = Io.indexOf(t3) + 1, i4 = Io.length; e3 < i4; ++e3)
                if (Ro[Io[e3]].common)
                  return Io[e3];
            }(this._unit) : void 0, this.initOffsets(s2), t2.reverse && o2.reverse(), Wo(this, o2, this._majorUnit);
          }
          afterAutoSkip() {
            this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t2) => +t2.value));
          }
          initOffsets(t2 = []) {
            let e2, i3, s2 = 0, n2 = 0;
            this.options.offset && t2.length && (e2 = this.getDecimalForValue(t2[0]), s2 = 1 === t2.length ? 1 - e2 : (this.getDecimalForValue(t2[1]) - e2) / 2, i3 = this.getDecimalForValue(t2[t2.length - 1]), n2 = 1 === t2.length ? i3 : (i3 - this.getDecimalForValue(t2[t2.length - 2])) / 2);
            const o2 = t2.length < 3 ? 0.5 : 0.25;
            s2 = J(s2, 0, o2), n2 = J(n2, 0, o2), this._offsets = { start: s2, end: n2, factor: 1 / (s2 + 1 + n2) };
          }
          _generate() {
            const t2 = this._adapter, e2 = this.min, i3 = this.max, s2 = this.options, n2 = s2.time, o2 = n2.unit || Vo(n2.minUnit, e2, i3, this._getLabelCapacity(e2)), a2 = l(s2.ticks.stepSize, 1), r2 = "week" === o2 && n2.isoWeekday, h2 = N(r2) || true === r2, c2 = {};
            let d2, u2, f2 = e2;
            if (h2 && (f2 = +t2.startOf(f2, "isoWeek", r2)), f2 = +t2.startOf(f2, h2 ? "day" : o2), t2.diff(i3, e2, o2) > 1e5 * a2)
              throw new Error(e2 + " and " + i3 + " are too far apart with stepSize of " + a2 + " " + o2);
            const g2 = "data" === s2.ticks.source && this.getDataTimestamps();
            for (d2 = f2, u2 = 0; d2 < i3; d2 = +t2.add(d2, a2, o2), u2++)
              Bo(c2, d2, g2);
            return d2 !== i3 && "ticks" !== s2.bounds && 1 !== u2 || Bo(c2, d2, g2), Object.keys(c2).sort(zo).map((t3) => +t3);
          }
          getLabelForValue(t2) {
            const e2 = this._adapter, i3 = this.options.time;
            return i3.tooltipFormat ? e2.format(t2, i3.tooltipFormat) : e2.format(t2, i3.displayFormats.datetime);
          }
          format(t2, e2) {
            const i3 = this.options.time.displayFormats, s2 = this._unit, n2 = e2 || i3[s2];
            return this._adapter.format(t2, n2);
          }
          _tickFormatFunction(t2, e2, i3, s2) {
            const n2 = this.options, o2 = n2.ticks.callback;
            if (o2)
              return d(o2, [t2, e2, i3], this);
            const a2 = n2.time.displayFormats, r2 = this._unit, l2 = this._majorUnit, h2 = r2 && a2[r2], c2 = l2 && a2[l2], u2 = i3[e2], f2 = l2 && c2 && u2 && u2.major;
            return this._adapter.format(t2, s2 || (f2 ? c2 : h2));
          }
          generateTickLabels(t2) {
            let e2, i3, s2;
            for (e2 = 0, i3 = t2.length; e2 < i3; ++e2)
              s2 = t2[e2], s2.label = this._tickFormatFunction(s2.value, e2, t2);
          }
          getDecimalForValue(t2) {
            return null === t2 ? NaN : (t2 - this.min) / (this.max - this.min);
          }
          getPixelForValue(t2) {
            const e2 = this._offsets, i3 = this.getDecimalForValue(t2);
            return this.getPixelForDecimal((e2.start + i3) * e2.factor);
          }
          getValueForPixel(t2) {
            const e2 = this._offsets, i3 = this.getDecimalForPixel(t2) / e2.factor - e2.end;
            return this.min + i3 * (this.max - this.min);
          }
          _getLabelSize(t2) {
            const e2 = this.options.ticks, i3 = this.ctx.measureText(t2).width, s2 = $(this.isHorizontal() ? e2.maxRotation : e2.minRotation), n2 = Math.cos(s2), o2 = Math.sin(s2), a2 = this._resolveTickFontOptions(0).size;
            return { w: i3 * n2 + a2 * o2, h: i3 * o2 + a2 * n2 };
          }
          _getLabelCapacity(t2) {
            const e2 = this.options.time, i3 = e2.displayFormats, s2 = i3[e2.unit] || i3.millisecond, n2 = this._tickFormatFunction(t2, 0, Wo(this, [t2], this._majorUnit), s2), o2 = this._getLabelSize(n2), a2 = Math.floor(this.isHorizontal() ? this.width / o2.w : this.height / o2.h) - 1;
            return a2 > 0 ? a2 : 1;
          }
          getDataTimestamps() {
            let t2, e2, i3 = this._cache.data || [];
            if (i3.length)
              return i3;
            const s2 = this.getMatchingVisibleMetas();
            if (this._normalized && s2.length)
              return this._cache.data = s2[0].controller.getAllParsedValues(this);
            for (t2 = 0, e2 = s2.length; t2 < e2; ++t2)
              i3 = i3.concat(s2[t2].controller.getAllParsedValues(this));
            return this._cache.data = this.normalize(i3);
          }
          getLabelTimestamps() {
            const t2 = this._cache.labels || [];
            let e2, i3;
            if (t2.length)
              return t2;
            const s2 = this.getLabels();
            for (e2 = 0, i3 = s2.length; e2 < i3; ++e2)
              t2.push(Fo(this, s2[e2]));
            return this._cache.labels = this._normalized ? t2 : this.normalize(t2);
          }
          normalize(t2) {
            return lt(t2.sort(zo));
          }
        }
        __publicField(No, "id", "time");
        __publicField(No, "defaults", { bounds: "data", adapters: {}, time: { parser: false, unit: false, round: false, isoWeekday: false, minUnit: "millisecond", displayFormats: {} }, ticks: { source: "auto", callback: false, major: { enabled: false } } });
        function Ho(t2, e2, i3) {
          let s2, n2, o2, a2, r2 = 0, l2 = t2.length - 1;
          i3 ? (e2 >= t2[r2].pos && e2 <= t2[l2].pos && ({ lo: r2, hi: l2 } = it(t2, "pos", e2)), { pos: s2, time: o2 } = t2[r2], { pos: n2, time: a2 } = t2[l2]) : (e2 >= t2[r2].time && e2 <= t2[l2].time && ({ lo: r2, hi: l2 } = it(t2, "time", e2)), { time: s2, pos: o2 } = t2[r2], { time: n2, pos: a2 } = t2[l2]);
          const h2 = n2 - s2;
          return h2 ? o2 + (a2 - o2) * (e2 - s2) / h2 : o2;
        }
        var jo = Object.freeze({ __proto__: null, CategoryScale: (_j = class extends Js {
          constructor(t2) {
            super(t2), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
          }
          init(t2) {
            const e2 = this._addedLabels;
            if (e2.length) {
              const t3 = this.getLabels();
              for (const { index: i3, label: s2 } of e2)
                t3[i3] === s2 && t3.splice(i3, 1);
              this._addedLabels = [];
            }
            super.init(t2);
          }
          parse(t2, e2) {
            if (s(t2))
              return null;
            const i3 = this.getLabels();
            return ((t3, e3) => null === t3 ? null : J(Math.round(t3), 0, e3))(e2 = isFinite(e2) && i3[e2] === t2 ? e2 : go(i3, t2, l(e2, t2), this._addedLabels), i3.length - 1);
          }
          determineDataLimits() {
            const { minDefined: t2, maxDefined: e2 } = this.getUserBounds();
            let { min: i3, max: s2 } = this.getMinMax(true);
            "ticks" === this.options.bounds && (t2 || (i3 = 0), e2 || (s2 = this.getLabels().length - 1)), this.min = i3, this.max = s2;
          }
          buildTicks() {
            const t2 = this.min, e2 = this.max, i3 = this.options.offset, s2 = [];
            let n2 = this.getLabels();
            n2 = 0 === t2 && e2 === n2.length - 1 ? n2 : n2.slice(t2, e2 + 1), this._valueRange = Math.max(n2.length - (i3 ? 0 : 1), 1), this._startValue = this.min - (i3 ? 0.5 : 0);
            for (let i4 = t2; i4 <= e2; i4++)
              s2.push({ value: i4 });
            return s2;
          }
          getLabelForValue(t2) {
            return po.call(this, t2);
          }
          configure() {
            super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
          }
          getPixelForValue(t2) {
            return "number" != typeof t2 && (t2 = this.parse(t2)), null === t2 ? NaN : this.getPixelForDecimal((t2 - this._startValue) / this._valueRange);
          }
          getPixelForTick(t2) {
            const e2 = this.ticks;
            return t2 < 0 || t2 > e2.length - 1 ? null : this.getPixelForValue(e2[t2].value);
          }
          getValueForPixel(t2) {
            return Math.round(this._startValue + this.getDecimalForPixel(t2) * this._valueRange);
          }
          getBasePixel() {
            return this.bottom;
          }
        }, __publicField(_j, "id", "category"), __publicField(_j, "defaults", { ticks: { callback: po } }), _j), LinearScale: bo, LogarithmicScale: ko, RadialLinearScale: Eo, TimeScale: No, TimeSeriesScale: (_k = class extends No {
          constructor(t2) {
            super(t2), this._table = [], this._minPos = void 0, this._tableRange = void 0;
          }
          initOffsets() {
            const t2 = this._getTimestampsForTable(), e2 = this._table = this.buildLookupTable(t2);
            this._minPos = Ho(e2, this.min), this._tableRange = Ho(e2, this.max) - this._minPos, super.initOffsets(t2);
          }
          buildLookupTable(t2) {
            const { min: e2, max: i3 } = this, s2 = [], n2 = [];
            let o2, a2, r2, l2, h2;
            for (o2 = 0, a2 = t2.length; o2 < a2; ++o2)
              l2 = t2[o2], l2 >= e2 && l2 <= i3 && s2.push(l2);
            if (s2.length < 2)
              return [{ time: e2, pos: 0 }, { time: i3, pos: 1 }];
            for (o2 = 0, a2 = s2.length; o2 < a2; ++o2)
              h2 = s2[o2 + 1], r2 = s2[o2 - 1], l2 = s2[o2], Math.round((h2 + r2) / 2) !== l2 && n2.push({ time: l2, pos: o2 / (a2 - 1) });
            return n2;
          }
          _generate() {
            const t2 = this.min, e2 = this.max;
            let i3 = super.getDataTimestamps();
            return i3.includes(t2) && i3.length || i3.splice(0, 0, t2), i3.includes(e2) && 1 !== i3.length || i3.push(e2), i3.sort((t3, e3) => t3 - e3);
          }
          _getTimestampsForTable() {
            let t2 = this._cache.all || [];
            if (t2.length)
              return t2;
            const e2 = this.getDataTimestamps(), i3 = this.getLabelTimestamps();
            return t2 = e2.length && i3.length ? this.normalize(e2.concat(i3)) : e2.length ? e2 : i3, t2 = this._cache.all = t2, t2;
          }
          getDecimalForValue(t2) {
            return (Ho(this._table, t2) - this._minPos) / this._tableRange;
          }
          getValueForPixel(t2) {
            const e2 = this._offsets, i3 = this.getDecimalForPixel(t2) / e2.factor - e2.end;
            return Ho(this._table, i3 * this._tableRange + this._minPos, true);
          }
        }, __publicField(_k, "id", "timeseries"), __publicField(_k, "defaults", No.defaults), _k) });
        const $o = ["rgb(54, 162, 235)", "rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"], Yo = $o.map((t2) => t2.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
        function Uo(t2) {
          return $o[t2 % $o.length];
        }
        function Xo(t2) {
          return Yo[t2 % Yo.length];
        }
        function qo(t2) {
          let e2 = 0;
          return (i3, s2) => {
            const n2 = t2.getDatasetMeta(s2).controller;
            n2 instanceof jn ? e2 = function(t3, e3) {
              return t3.backgroundColor = t3.data.map(() => Uo(e3++)), e3;
            }(i3, e2) : n2 instanceof $n ? e2 = function(t3, e3) {
              return t3.backgroundColor = t3.data.map(() => Xo(e3++)), e3;
            }(i3, e2) : n2 && (e2 = function(t3, e3) {
              return t3.borderColor = Uo(e3), t3.backgroundColor = Xo(e3), ++e3;
            }(i3, e2));
          };
        }
        function Ko(t2) {
          let e2;
          for (e2 in t2)
            if (t2[e2].borderColor || t2[e2].backgroundColor)
              return true;
          return false;
        }
        var Go = { id: "colors", defaults: { enabled: true, forceOverride: false }, beforeLayout(t2, e2, i3) {
          if (!i3.enabled)
            return;
          const { data: { datasets: s2 }, options: n2 } = t2.config, { elements: o2 } = n2;
          if (!i3.forceOverride && (Ko(s2) || (a2 = n2) && (a2.borderColor || a2.backgroundColor) || o2 && Ko(o2)))
            return;
          var a2;
          const r2 = qo(t2);
          s2.forEach(r2);
        } };
        function Zo(t2) {
          if (t2._decimated) {
            const e2 = t2._data;
            delete t2._decimated, delete t2._data, Object.defineProperty(t2, "data", { configurable: true, enumerable: true, writable: true, value: e2 });
          }
        }
        function Jo(t2) {
          t2.data.datasets.forEach((t3) => {
            Zo(t3);
          });
        }
        var Qo = { id: "decimation", defaults: { algorithm: "min-max", enabled: false }, beforeElementsUpdate: (t2, e2, i3) => {
          if (!i3.enabled)
            return void Jo(t2);
          const n2 = t2.width;
          t2.data.datasets.forEach((e3, o2) => {
            const { _data: a2, indexAxis: r2 } = e3, l2 = t2.getDatasetMeta(o2), h2 = a2 || e3.data;
            if ("y" === Pi([r2, t2.options.indexAxis]))
              return;
            if (!l2.controller.supportsDecimation)
              return;
            const c2 = t2.scales[l2.xAxisID];
            if ("linear" !== c2.type && "time" !== c2.type)
              return;
            if (t2.options.parsing)
              return;
            let { start: d2, count: u2 } = function(t3, e4) {
              const i4 = e4.length;
              let s2, n3 = 0;
              const { iScale: o3 } = t3, { min: a3, max: r3, minDefined: l3, maxDefined: h3 } = o3.getUserBounds();
              return l3 && (n3 = J(it(e4, o3.axis, a3).lo, 0, i4 - 1)), s2 = h3 ? J(it(e4, o3.axis, r3).hi + 1, n3, i4) - n3 : i4 - n3, { start: n3, count: s2 };
            }(l2, h2);
            if (u2 <= (i3.threshold || 4 * n2))
              return void Zo(e3);
            let f2;
            switch (s(a2) && (e3._data = h2, delete e3.data, Object.defineProperty(e3, "data", { configurable: true, enumerable: true, get: function() {
              return this._decimated;
            }, set: function(t3) {
              this._data = t3;
            } })), i3.algorithm) {
              case "lttb":
                f2 = function(t3, e4, i4, s2, n3) {
                  const o3 = n3.samples || s2;
                  if (o3 >= i4)
                    return t3.slice(e4, e4 + i4);
                  const a3 = [], r3 = (i4 - 2) / (o3 - 2);
                  let l3 = 0;
                  const h3 = e4 + i4 - 1;
                  let c3, d3, u3, f3, g2, p2 = e4;
                  for (a3[l3++] = t3[p2], c3 = 0; c3 < o3 - 2; c3++) {
                    let s3, n4 = 0, o4 = 0;
                    const h4 = Math.floor((c3 + 1) * r3) + 1 + e4, m2 = Math.min(Math.floor((c3 + 2) * r3) + 1, i4) + e4, x2 = m2 - h4;
                    for (s3 = h4; s3 < m2; s3++)
                      n4 += t3[s3].x, o4 += t3[s3].y;
                    n4 /= x2, o4 /= x2;
                    const b2 = Math.floor(c3 * r3) + 1 + e4, _2 = Math.min(Math.floor((c3 + 1) * r3) + 1, i4) + e4, { x: y2, y: v2 } = t3[p2];
                    for (u3 = f3 = -1, s3 = b2; s3 < _2; s3++)
                      f3 = 0.5 * Math.abs((y2 - n4) * (t3[s3].y - v2) - (y2 - t3[s3].x) * (o4 - v2)), f3 > u3 && (u3 = f3, d3 = t3[s3], g2 = s3);
                    a3[l3++] = d3, p2 = g2;
                  }
                  return a3[l3++] = t3[h3], a3;
                }(h2, d2, u2, n2, i3);
                break;
              case "min-max":
                f2 = function(t3, e4, i4, n3) {
                  let o3, a3, r3, l3, h3, c3, d3, u3, f3, g2, p2 = 0, m2 = 0;
                  const x2 = [], b2 = e4 + i4 - 1, _2 = t3[e4].x, y2 = t3[b2].x - _2;
                  for (o3 = e4; o3 < e4 + i4; ++o3) {
                    a3 = t3[o3], r3 = (a3.x - _2) / y2 * n3, l3 = a3.y;
                    const e5 = 0 | r3;
                    if (e5 === h3)
                      l3 < f3 ? (f3 = l3, c3 = o3) : l3 > g2 && (g2 = l3, d3 = o3), p2 = (m2 * p2 + a3.x) / ++m2;
                    else {
                      const i5 = o3 - 1;
                      if (!s(c3) && !s(d3)) {
                        const e6 = Math.min(c3, d3), s2 = Math.max(c3, d3);
                        e6 !== u3 && e6 !== i5 && x2.push(__spreadProps(__spreadValues({}, t3[e6]), { x: p2 })), s2 !== u3 && s2 !== i5 && x2.push(__spreadProps(__spreadValues({}, t3[s2]), { x: p2 }));
                      }
                      o3 > 0 && i5 !== u3 && x2.push(t3[i5]), x2.push(a3), h3 = e5, m2 = 0, f3 = g2 = l3, c3 = d3 = u3 = o3;
                    }
                  }
                  return x2;
                }(h2, d2, u2, n2);
                break;
              default:
                throw new Error(`Unsupported decimation algorithm '${i3.algorithm}'`);
            }
            e3._decimated = f2;
          });
        }, destroy(t2) {
          Jo(t2);
        } };
        function ta(t2, e2, i3, s2) {
          if (s2)
            return;
          let n2 = e2[t2], o2 = i3[t2];
          return "angle" === t2 && (n2 = G(n2), o2 = G(o2)), { property: t2, start: n2, end: o2 };
        }
        function ea(t2, e2, i3) {
          for (; e2 > t2; e2--) {
            const t3 = i3[e2];
            if (!isNaN(t3.x) && !isNaN(t3.y))
              break;
          }
          return e2;
        }
        function ia(t2, e2, i3, s2) {
          return t2 && e2 ? s2(t2[i3], e2[i3]) : t2 ? t2[i3] : e2 ? e2[i3] : 0;
        }
        function sa(t2, e2) {
          let i3 = [], s2 = false;
          return n(t2) ? (s2 = true, i3 = t2) : i3 = function(t3, e3) {
            const { x: i4 = null, y: s3 = null } = t3 || {}, n2 = e3.points, o2 = [];
            return e3.segments.forEach(({ start: t4, end: e4 }) => {
              e4 = ea(t4, e4, n2);
              const a2 = n2[t4], r2 = n2[e4];
              null !== s3 ? (o2.push({ x: a2.x, y: s3 }), o2.push({ x: r2.x, y: s3 })) : null !== i4 && (o2.push({ x: i4, y: a2.y }), o2.push({ x: i4, y: r2.y }));
            }), o2;
          }(t2, e2), i3.length ? new no({ points: i3, options: { tension: 0 }, _loop: s2, _fullLoop: s2 }) : null;
        }
        function na(t2) {
          return t2 && false !== t2.fill;
        }
        function oa(t2, e2, i3) {
          let s2 = t2[e2].fill;
          const n2 = [e2];
          let o2;
          if (!i3)
            return s2;
          for (; false !== s2 && -1 === n2.indexOf(s2); ) {
            if (!a(s2))
              return s2;
            if (o2 = t2[s2], !o2)
              return false;
            if (o2.visible)
              return s2;
            n2.push(s2), s2 = o2.fill;
          }
          return false;
        }
        function aa(t2, e2, i3) {
          const s2 = function(t3) {
            const e3 = t3.options, i4 = e3.fill;
            let s3 = l(i4 && i4.target, i4);
            void 0 === s3 && (s3 = !!e3.backgroundColor);
            if (false === s3 || null === s3)
              return false;
            if (true === s3)
              return "origin";
            return s3;
          }(t2);
          if (o(s2))
            return !isNaN(s2.value) && s2;
          let n2 = parseFloat(s2);
          return a(n2) && Math.floor(n2) === n2 ? function(t3, e3, i4, s3) {
            "-" !== t3 && "+" !== t3 || (i4 = e3 + i4);
            if (i4 === e3 || i4 < 0 || i4 >= s3)
              return false;
            return i4;
          }(s2[0], e2, n2, i3) : ["origin", "start", "end", "stack", "shape"].indexOf(s2) >= 0 && s2;
        }
        function ra(t2, e2, i3) {
          const s2 = [];
          for (let n2 = 0; n2 < i3.length; n2++) {
            const o2 = i3[n2], { first: a2, last: r2, point: l2 } = la(o2, e2, "x");
            if (!(!l2 || a2 && r2)) {
              if (a2)
                s2.unshift(l2);
              else if (t2.push(l2), !r2)
                break;
            }
          }
          t2.push(...s2);
        }
        function la(t2, e2, i3) {
          const s2 = t2.interpolate(e2, i3);
          if (!s2)
            return {};
          const n2 = s2[i3], o2 = t2.segments, a2 = t2.points;
          let r2 = false, l2 = false;
          for (let t3 = 0; t3 < o2.length; t3++) {
            const e3 = o2[t3], s3 = a2[e3.start][i3], h2 = a2[e3.end][i3];
            if (tt(n2, s3, h2)) {
              r2 = n2 === s3, l2 = n2 === h2;
              break;
            }
          }
          return { first: r2, last: l2, point: s2 };
        }
        class ha {
          constructor(t2) {
            this.x = t2.x, this.y = t2.y, this.radius = t2.radius;
          }
          pathSegment(t2, e2, i3) {
            const { x: s2, y: n2, radius: o2 } = this;
            return e2 = e2 || { start: 0, end: O }, t2.arc(s2, n2, o2, e2.end, e2.start, true), !i3.bounds;
          }
          interpolate(t2) {
            const { x: e2, y: i3, radius: s2 } = this, n2 = t2.angle;
            return { x: e2 + Math.cos(n2) * s2, y: i3 + Math.sin(n2) * s2, angle: n2 };
          }
        }
        function ca(t2) {
          const { chart: e2, fill: i3, line: s2 } = t2;
          if (a(i3))
            return function(t3, e3) {
              const i4 = t3.getDatasetMeta(e3), s3 = i4 && t3.isDatasetVisible(e3);
              return s3 ? i4.dataset : null;
            }(e2, i3);
          if ("stack" === i3)
            return function(t3) {
              const { scale: e3, index: i4, line: s3 } = t3, n3 = [], o2 = s3.segments, a2 = s3.points, r2 = function(t4, e4) {
                const i5 = [], s4 = t4.getMatchingVisibleMetas("line");
                for (let t5 = 0; t5 < s4.length; t5++) {
                  const n4 = s4[t5];
                  if (n4.index === e4)
                    break;
                  n4.hidden || i5.unshift(n4.dataset);
                }
                return i5;
              }(e3, i4);
              r2.push(sa({ x: null, y: e3.bottom }, s3));
              for (let t4 = 0; t4 < o2.length; t4++) {
                const e4 = o2[t4];
                for (let t5 = e4.start; t5 <= e4.end; t5++)
                  ra(n3, a2[t5], r2);
              }
              return new no({ points: n3, options: {} });
            }(t2);
          if ("shape" === i3)
            return true;
          const n2 = function(t3) {
            const e3 = t3.scale || {};
            if (e3.getPointPositionForValue)
              return function(t4) {
                const { scale: e4, fill: i4 } = t4, s3 = e4.options, n3 = e4.getLabels().length, a2 = s3.reverse ? e4.max : e4.min, r2 = function(t5, e5, i5) {
                  let s4;
                  return s4 = "start" === t5 ? i5 : "end" === t5 ? e5.options.reverse ? e5.min : e5.max : o(t5) ? t5.value : e5.getBaseValue(), s4;
                }(i4, e4, a2), l2 = [];
                if (s3.grid.circular) {
                  const t5 = e4.getPointPositionForValue(0, a2);
                  return new ha({ x: t5.x, y: t5.y, radius: e4.getDistanceFromCenterForValue(r2) });
                }
                for (let t5 = 0; t5 < n3; ++t5)
                  l2.push(e4.getPointPositionForValue(t5, r2));
                return l2;
              }(t3);
            return function(t4) {
              const { scale: e4 = {}, fill: i4 } = t4, s3 = function(t5, e5) {
                let i5 = null;
                return "start" === t5 ? i5 = e5.bottom : "end" === t5 ? i5 = e5.top : o(t5) ? i5 = e5.getPixelForValue(t5.value) : e5.getBasePixel && (i5 = e5.getBasePixel()), i5;
              }(i4, e4);
              if (a(s3)) {
                const t5 = e4.isHorizontal();
                return { x: t5 ? s3 : null, y: t5 ? null : s3 };
              }
              return null;
            }(t3);
          }(t2);
          return n2 instanceof ha ? n2 : sa(n2, s2);
        }
        function da(t2, e2, i3) {
          const s2 = ca(e2), { line: n2, scale: o2, axis: a2 } = e2, r2 = n2.options, l2 = r2.fill, h2 = r2.backgroundColor, { above: c2 = h2, below: d2 = h2 } = l2 || {};
          s2 && n2.points.length && (Ie(t2, i3), function(t3, e3) {
            const { line: i4, target: s3, above: n3, below: o3, area: a3, scale: r3 } = e3, l3 = i4._loop ? "angle" : e3.axis;
            t3.save(), "x" === l3 && o3 !== n3 && (ua(t3, s3, a3.top), fa(t3, { line: i4, target: s3, color: n3, scale: r3, property: l3 }), t3.restore(), t3.save(), ua(t3, s3, a3.bottom));
            fa(t3, { line: i4, target: s3, color: o3, scale: r3, property: l3 }), t3.restore();
          }(t2, { line: n2, target: s2, above: c2, below: d2, area: i3, scale: o2, axis: a2 }), ze(t2));
        }
        function ua(t2, e2, i3) {
          const { segments: s2, points: n2 } = e2;
          let o2 = true, a2 = false;
          t2.beginPath();
          for (const r2 of s2) {
            const { start: s3, end: l2 } = r2, h2 = n2[s3], c2 = n2[ea(s3, l2, n2)];
            o2 ? (t2.moveTo(h2.x, h2.y), o2 = false) : (t2.lineTo(h2.x, i3), t2.lineTo(h2.x, h2.y)), a2 = !!e2.pathSegment(t2, r2, { move: a2 }), a2 ? t2.closePath() : t2.lineTo(c2.x, i3);
          }
          t2.lineTo(e2.first().x, i3), t2.closePath(), t2.clip();
        }
        function fa(t2, e2) {
          const { line: i3, target: s2, property: n2, color: o2, scale: a2 } = e2, r2 = function(t3, e3, i4) {
            const s3 = t3.segments, n3 = t3.points, o3 = e3.points, a3 = [];
            for (const t4 of s3) {
              let { start: s4, end: r3 } = t4;
              r3 = ea(s4, r3, n3);
              const l2 = ta(i4, n3[s4], n3[r3], t4.loop);
              if (!e3.segments) {
                a3.push({ source: t4, target: l2, start: n3[s4], end: n3[r3] });
                continue;
              }
              const h2 = Ii(e3, l2);
              for (const e4 of h2) {
                const s5 = ta(i4, o3[e4.start], o3[e4.end], e4.loop), r4 = Ri(t4, n3, s5);
                for (const t5 of r4)
                  a3.push({ source: t5, target: e4, start: { [i4]: ia(l2, s5, "start", Math.max) }, end: { [i4]: ia(l2, s5, "end", Math.min) } });
              }
            }
            return a3;
          }(i3, s2, n2);
          for (const { source: e3, target: l2, start: h2, end: c2 } of r2) {
            const { style: { backgroundColor: r3 = o2 } = {} } = e3, d2 = true !== s2;
            t2.save(), t2.fillStyle = r3, ga(t2, a2, d2 && ta(n2, h2, c2)), t2.beginPath();
            const u2 = !!i3.pathSegment(t2, e3);
            let f2;
            if (d2) {
              u2 ? t2.closePath() : pa(t2, s2, c2, n2);
              const e4 = !!s2.pathSegment(t2, l2, { move: u2, reverse: true });
              f2 = u2 && e4, f2 || pa(t2, s2, h2, n2);
            }
            t2.closePath(), t2.fill(f2 ? "evenodd" : "nonzero"), t2.restore();
          }
        }
        function ga(t2, e2, i3) {
          const { top: s2, bottom: n2 } = e2.chart.chartArea, { property: o2, start: a2, end: r2 } = i3 || {};
          "x" === o2 && (t2.beginPath(), t2.rect(a2, s2, r2 - a2, n2 - s2), t2.clip());
        }
        function pa(t2, e2, i3, s2) {
          const n2 = e2.interpolate(i3, s2);
          n2 && t2.lineTo(n2.x, n2.y);
        }
        var ma = { id: "filler", afterDatasetsUpdate(t2, e2, i3) {
          const s2 = (t2.data.datasets || []).length, n2 = [];
          let o2, a2, r2, l2;
          for (a2 = 0; a2 < s2; ++a2)
            o2 = t2.getDatasetMeta(a2), r2 = o2.dataset, l2 = null, r2 && r2.options && r2 instanceof no && (l2 = { visible: t2.isDatasetVisible(a2), index: a2, fill: aa(r2, a2, s2), chart: t2, axis: o2.controller.options.indexAxis, scale: o2.vScale, line: r2 }), o2.$filler = l2, n2.push(l2);
          for (a2 = 0; a2 < s2; ++a2)
            l2 = n2[a2], l2 && false !== l2.fill && (l2.fill = oa(n2, a2, i3.propagate));
        }, beforeDraw(t2, e2, i3) {
          const s2 = "beforeDraw" === i3.drawTime, n2 = t2.getSortedVisibleDatasetMetas(), o2 = t2.chartArea;
          for (let e3 = n2.length - 1; e3 >= 0; --e3) {
            const i4 = n2[e3].$filler;
            i4 && (i4.line.updateControlPoints(o2, i4.axis), s2 && i4.fill && da(t2.ctx, i4, o2));
          }
        }, beforeDatasetsDraw(t2, e2, i3) {
          if ("beforeDatasetsDraw" !== i3.drawTime)
            return;
          const s2 = t2.getSortedVisibleDatasetMetas();
          for (let e3 = s2.length - 1; e3 >= 0; --e3) {
            const i4 = s2[e3].$filler;
            na(i4) && da(t2.ctx, i4, t2.chartArea);
          }
        }, beforeDatasetDraw(t2, e2, i3) {
          const s2 = e2.meta.$filler;
          na(s2) && "beforeDatasetDraw" === i3.drawTime && da(t2.ctx, s2, t2.chartArea);
        }, defaults: { propagate: true, drawTime: "beforeDatasetDraw" } };
        const xa = (t2, e2) => {
          let { boxHeight: i3 = e2, boxWidth: s2 = e2 } = t2;
          return t2.usePointStyle && (i3 = Math.min(i3, e2), s2 = t2.pointStyleWidth || Math.min(s2, e2)), { boxWidth: s2, boxHeight: i3, itemHeight: Math.max(e2, i3) };
        };
        class ba extends Hs {
          constructor(t2) {
            super(), this._added = false, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = false, this.chart = t2.chart, this.options = t2.options, this.ctx = t2.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
          }
          update(t2, e2, i3) {
            this.maxWidth = t2, this.maxHeight = e2, this._margins = i3, this.setDimensions(), this.buildLabels(), this.fit();
          }
          setDimensions() {
            this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
          }
          buildLabels() {
            const t2 = this.options.labels || {};
            let e2 = d(t2.generateLabels, [this.chart], this) || [];
            t2.filter && (e2 = e2.filter((e3) => t2.filter(e3, this.chart.data))), t2.sort && (e2 = e2.sort((e3, i3) => t2.sort(e3, i3, this.chart.data))), this.options.reverse && e2.reverse(), this.legendItems = e2;
          }
          fit() {
            const { options: t2, ctx: e2 } = this;
            if (!t2.display)
              return void (this.width = this.height = 0);
            const i3 = t2.labels, s2 = Si(i3.font), n2 = s2.size, o2 = this._computeTitleHeight(), { boxWidth: a2, itemHeight: r2 } = xa(i3, n2);
            let l2, h2;
            e2.font = s2.string, this.isHorizontal() ? (l2 = this.maxWidth, h2 = this._fitRows(o2, n2, a2, r2) + 10) : (h2 = this.maxHeight, l2 = this._fitCols(o2, s2, a2, r2) + 10), this.width = Math.min(l2, t2.maxWidth || this.maxWidth), this.height = Math.min(h2, t2.maxHeight || this.maxHeight);
          }
          _fitRows(t2, e2, i3, s2) {
            const { ctx: n2, maxWidth: o2, options: { labels: { padding: a2 } } } = this, r2 = this.legendHitBoxes = [], l2 = this.lineWidths = [0], h2 = s2 + a2;
            let c2 = t2;
            n2.textAlign = "left", n2.textBaseline = "middle";
            let d2 = -1, u2 = -h2;
            return this.legendItems.forEach((t3, f2) => {
              const g2 = i3 + e2 / 2 + n2.measureText(t3.text).width;
              (0 === f2 || l2[l2.length - 1] + g2 + 2 * a2 > o2) && (c2 += h2, l2[l2.length - (f2 > 0 ? 0 : 1)] = 0, u2 += h2, d2++), r2[f2] = { left: 0, top: u2, row: d2, width: g2, height: s2 }, l2[l2.length - 1] += g2 + a2;
            }), c2;
          }
          _fitCols(t2, e2, i3, s2) {
            const { ctx: n2, maxHeight: o2, options: { labels: { padding: a2 } } } = this, r2 = this.legendHitBoxes = [], l2 = this.columnSizes = [], h2 = o2 - t2;
            let c2 = a2, d2 = 0, u2 = 0, f2 = 0, g2 = 0;
            return this.legendItems.forEach((t3, o3) => {
              const { itemWidth: p2, itemHeight: m2 } = function(t4, e3, i4, s3, n3) {
                const o4 = function(t5, e4, i5, s4) {
                  let n4 = t5.text;
                  n4 && "string" != typeof n4 && (n4 = n4.reduce((t6, e5) => t6.length > e5.length ? t6 : e5));
                  return e4 + i5.size / 2 + s4.measureText(n4).width;
                }(s3, t4, e3, i4), a3 = function(t5, e4, i5) {
                  let s4 = t5;
                  "string" != typeof e4.text && (s4 = _a(e4, i5));
                  return s4;
                }(n3, s3, e3.lineHeight);
                return { itemWidth: o4, itemHeight: a3 };
              }(i3, e2, n2, t3, s2);
              o3 > 0 && u2 + m2 + 2 * a2 > h2 && (c2 += d2 + a2, l2.push({ width: d2, height: u2 }), f2 += d2 + a2, g2++, d2 = u2 = 0), r2[o3] = { left: f2, top: u2, col: g2, width: p2, height: m2 }, d2 = Math.max(d2, p2), u2 += m2 + a2;
            }), c2 += d2, l2.push({ width: d2, height: u2 }), c2;
          }
          adjustHitBoxes() {
            if (!this.options.display)
              return;
            const t2 = this._computeTitleHeight(), { legendHitBoxes: e2, options: { align: i3, labels: { padding: s2 }, rtl: n2 } } = this, o2 = Oi(n2, this.left, this.width);
            if (this.isHorizontal()) {
              let n3 = 0, a2 = ft(i3, this.left + s2, this.right - this.lineWidths[n3]);
              for (const r2 of e2)
                n3 !== r2.row && (n3 = r2.row, a2 = ft(i3, this.left + s2, this.right - this.lineWidths[n3])), r2.top += this.top + t2 + s2, r2.left = o2.leftForLtr(o2.x(a2), r2.width), a2 += r2.width + s2;
            } else {
              let n3 = 0, a2 = ft(i3, this.top + t2 + s2, this.bottom - this.columnSizes[n3].height);
              for (const r2 of e2)
                r2.col !== n3 && (n3 = r2.col, a2 = ft(i3, this.top + t2 + s2, this.bottom - this.columnSizes[n3].height)), r2.top = a2, r2.left += this.left + s2, r2.left = o2.leftForLtr(o2.x(r2.left), r2.width), a2 += r2.height + s2;
            }
          }
          isHorizontal() {
            return "top" === this.options.position || "bottom" === this.options.position;
          }
          draw() {
            if (this.options.display) {
              const t2 = this.ctx;
              Ie(t2, this), this._draw(), ze(t2);
            }
          }
          _draw() {
            const { options: t2, columnSizes: e2, lineWidths: i3, ctx: s2 } = this, { align: n2, labels: o2 } = t2, a2 = ue.color, r2 = Oi(t2.rtl, this.left, this.width), h2 = Si(o2.font), { padding: c2 } = o2, d2 = h2.size, u2 = d2 / 2;
            let f2;
            this.drawTitle(), s2.textAlign = r2.textAlign("left"), s2.textBaseline = "middle", s2.lineWidth = 0.5, s2.font = h2.string;
            const { boxWidth: g2, boxHeight: p2, itemHeight: m2 } = xa(o2, d2), x2 = this.isHorizontal(), b2 = this._computeTitleHeight();
            f2 = x2 ? { x: ft(n2, this.left + c2, this.right - i3[0]), y: this.top + c2 + b2, line: 0 } : { x: this.left + c2, y: ft(n2, this.top + b2 + c2, this.bottom - e2[0].height), line: 0 }, Ai(this.ctx, t2.textDirection);
            const _2 = m2 + c2;
            this.legendItems.forEach((y2, v2) => {
              s2.strokeStyle = y2.fontColor, s2.fillStyle = y2.fontColor;
              const M2 = s2.measureText(y2.text).width, w2 = r2.textAlign(y2.textAlign || (y2.textAlign = o2.textAlign)), k2 = g2 + u2 + M2;
              let S2 = f2.x, P2 = f2.y;
              r2.setWidth(this.width), x2 ? v2 > 0 && S2 + k2 + c2 > this.right && (P2 = f2.y += _2, f2.line++, S2 = f2.x = ft(n2, this.left + c2, this.right - i3[f2.line])) : v2 > 0 && P2 + _2 > this.bottom && (S2 = f2.x = S2 + e2[f2.line].width + c2, f2.line++, P2 = f2.y = ft(n2, this.top + b2 + c2, this.bottom - e2[f2.line].height));
              if (function(t3, e3, i4) {
                if (isNaN(g2) || g2 <= 0 || isNaN(p2) || p2 < 0)
                  return;
                s2.save();
                const n3 = l(i4.lineWidth, 1);
                if (s2.fillStyle = l(i4.fillStyle, a2), s2.lineCap = l(i4.lineCap, "butt"), s2.lineDashOffset = l(i4.lineDashOffset, 0), s2.lineJoin = l(i4.lineJoin, "miter"), s2.lineWidth = n3, s2.strokeStyle = l(i4.strokeStyle, a2), s2.setLineDash(l(i4.lineDash, [])), o2.usePointStyle) {
                  const a3 = { radius: p2 * Math.SQRT2 / 2, pointStyle: i4.pointStyle, rotation: i4.rotation, borderWidth: n3 }, l2 = r2.xPlus(t3, g2 / 2);
                  Ee(s2, a3, l2, e3 + u2, o2.pointStyleWidth && g2);
                } else {
                  const o3 = e3 + Math.max((d2 - p2) / 2, 0), a3 = r2.leftForLtr(t3, g2), l2 = wi(i4.borderRadius);
                  s2.beginPath(), Object.values(l2).some((t4) => 0 !== t4) ? He(s2, { x: a3, y: o3, w: g2, h: p2, radius: l2 }) : s2.rect(a3, o3, g2, p2), s2.fill(), 0 !== n3 && s2.stroke();
                }
                s2.restore();
              }(r2.x(S2), P2, y2), S2 = gt(w2, S2 + g2 + u2, x2 ? S2 + k2 : this.right, t2.rtl), function(t3, e3, i4) {
                Ne(s2, i4.text, t3, e3 + m2 / 2, h2, { strikethrough: i4.hidden, textAlign: r2.textAlign(i4.textAlign) });
              }(r2.x(S2), P2, y2), x2)
                f2.x += k2 + c2;
              else if ("string" != typeof y2.text) {
                const t3 = h2.lineHeight;
                f2.y += _a(y2, t3) + c2;
              } else
                f2.y += _2;
            }), Ti(this.ctx, t2.textDirection);
          }
          drawTitle() {
            const t2 = this.options, e2 = t2.title, i3 = Si(e2.font), s2 = ki(e2.padding);
            if (!e2.display)
              return;
            const n2 = Oi(t2.rtl, this.left, this.width), o2 = this.ctx, a2 = e2.position, r2 = i3.size / 2, l2 = s2.top + r2;
            let h2, c2 = this.left, d2 = this.width;
            if (this.isHorizontal())
              d2 = Math.max(...this.lineWidths), h2 = this.top + l2, c2 = ft(t2.align, c2, this.right - d2);
            else {
              const e3 = this.columnSizes.reduce((t3, e4) => Math.max(t3, e4.height), 0);
              h2 = l2 + ft(t2.align, this.top, this.bottom - e3 - t2.labels.padding - this._computeTitleHeight());
            }
            const u2 = ft(a2, c2, c2 + d2);
            o2.textAlign = n2.textAlign(ut(a2)), o2.textBaseline = "middle", o2.strokeStyle = e2.color, o2.fillStyle = e2.color, o2.font = i3.string, Ne(o2, e2.text, u2, h2, i3);
          }
          _computeTitleHeight() {
            const t2 = this.options.title, e2 = Si(t2.font), i3 = ki(t2.padding);
            return t2.display ? e2.lineHeight + i3.height : 0;
          }
          _getLegendItemAt(t2, e2) {
            let i3, s2, n2;
            if (tt(t2, this.left, this.right) && tt(e2, this.top, this.bottom)) {
              for (n2 = this.legendHitBoxes, i3 = 0; i3 < n2.length; ++i3)
                if (s2 = n2[i3], tt(t2, s2.left, s2.left + s2.width) && tt(e2, s2.top, s2.top + s2.height))
                  return this.legendItems[i3];
            }
            return null;
          }
          handleEvent(t2) {
            const e2 = this.options;
            if (!function(t3, e3) {
              if (("mousemove" === t3 || "mouseout" === t3) && (e3.onHover || e3.onLeave))
                return true;
              if (e3.onClick && ("click" === t3 || "mouseup" === t3))
                return true;
              return false;
            }(t2.type, e2))
              return;
            const i3 = this._getLegendItemAt(t2.x, t2.y);
            if ("mousemove" === t2.type || "mouseout" === t2.type) {
              const o2 = this._hoveredItem, a2 = (n2 = i3, null !== (s2 = o2) && null !== n2 && s2.datasetIndex === n2.datasetIndex && s2.index === n2.index);
              o2 && !a2 && d(e2.onLeave, [t2, o2, this], this), this._hoveredItem = i3, i3 && !a2 && d(e2.onHover, [t2, i3, this], this);
            } else
              i3 && d(e2.onClick, [t2, i3, this], this);
            var s2, n2;
          }
        }
        function _a(t2, e2) {
          return e2 * (t2.text ? t2.text.length : 0);
        }
        var ya = { id: "legend", _element: ba, start(t2, e2, i3) {
          const s2 = t2.legend = new ba({ ctx: t2.ctx, options: i3, chart: t2 });
          as.configure(t2, s2, i3), as.addBox(t2, s2);
        }, stop(t2) {
          as.removeBox(t2, t2.legend), delete t2.legend;
        }, beforeUpdate(t2, e2, i3) {
          const s2 = t2.legend;
          as.configure(t2, s2, i3), s2.options = i3;
        }, afterUpdate(t2) {
          const e2 = t2.legend;
          e2.buildLabels(), e2.adjustHitBoxes();
        }, afterEvent(t2, e2) {
          e2.replay || t2.legend.handleEvent(e2.event);
        }, defaults: { display: true, position: "top", align: "center", fullSize: true, reverse: false, weight: 1e3, onClick(t2, e2, i3) {
          const s2 = e2.datasetIndex, n2 = i3.chart;
          n2.isDatasetVisible(s2) ? (n2.hide(s2), e2.hidden = true) : (n2.show(s2), e2.hidden = false);
        }, onHover: null, onLeave: null, labels: { color: (t2) => t2.chart.options.color, boxWidth: 40, padding: 10, generateLabels(t2) {
          const e2 = t2.data.datasets, { labels: { usePointStyle: i3, pointStyle: s2, textAlign: n2, color: o2, useBorderRadius: a2, borderRadius: r2 } } = t2.legend.options;
          return t2._getSortedDatasetMetas().map((t3) => {
            const l2 = t3.controller.getStyle(i3 ? 0 : void 0), h2 = ki(l2.borderWidth);
            return { text: e2[t3.index].label, fillStyle: l2.backgroundColor, fontColor: o2, hidden: !t3.visible, lineCap: l2.borderCapStyle, lineDash: l2.borderDash, lineDashOffset: l2.borderDashOffset, lineJoin: l2.borderJoinStyle, lineWidth: (h2.width + h2.height) / 4, strokeStyle: l2.borderColor, pointStyle: s2 || l2.pointStyle, rotation: l2.rotation, textAlign: n2 || l2.textAlign, borderRadius: a2 && (r2 || l2.borderRadius), datasetIndex: t3.index };
          }, this);
        } }, title: { color: (t2) => t2.chart.options.color, display: false, position: "center", text: "" } }, descriptors: { _scriptable: (t2) => !t2.startsWith("on"), labels: { _scriptable: (t2) => !["generateLabels", "filter", "sort"].includes(t2) } } };
        class va extends Hs {
          constructor(t2) {
            super(), this.chart = t2.chart, this.options = t2.options, this.ctx = t2.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
          }
          update(t2, e2) {
            const i3 = this.options;
            if (this.left = 0, this.top = 0, !i3.display)
              return void (this.width = this.height = this.right = this.bottom = 0);
            this.width = this.right = t2, this.height = this.bottom = e2;
            const s2 = n(i3.text) ? i3.text.length : 1;
            this._padding = ki(i3.padding);
            const o2 = s2 * Si(i3.font).lineHeight + this._padding.height;
            this.isHorizontal() ? this.height = o2 : this.width = o2;
          }
          isHorizontal() {
            const t2 = this.options.position;
            return "top" === t2 || "bottom" === t2;
          }
          _drawArgs(t2) {
            const { top: e2, left: i3, bottom: s2, right: n2, options: o2 } = this, a2 = o2.align;
            let r2, l2, h2, c2 = 0;
            return this.isHorizontal() ? (l2 = ft(a2, i3, n2), h2 = e2 + t2, r2 = n2 - i3) : ("left" === o2.position ? (l2 = i3 + t2, h2 = ft(a2, s2, e2), c2 = -0.5 * C) : (l2 = n2 - t2, h2 = ft(a2, e2, s2), c2 = 0.5 * C), r2 = s2 - e2), { titleX: l2, titleY: h2, maxWidth: r2, rotation: c2 };
          }
          draw() {
            const t2 = this.ctx, e2 = this.options;
            if (!e2.display)
              return;
            const i3 = Si(e2.font), s2 = i3.lineHeight / 2 + this._padding.top, { titleX: n2, titleY: o2, maxWidth: a2, rotation: r2 } = this._drawArgs(s2);
            Ne(t2, e2.text, 0, 0, i3, { color: e2.color, maxWidth: a2, rotation: r2, textAlign: ut(e2.align), textBaseline: "middle", translation: [n2, o2] });
          }
        }
        var Ma = { id: "title", _element: va, start(t2, e2, i3) {
          !function(t3, e3) {
            const i4 = new va({ ctx: t3.ctx, options: e3, chart: t3 });
            as.configure(t3, i4, e3), as.addBox(t3, i4), t3.titleBlock = i4;
          }(t2, i3);
        }, stop(t2) {
          const e2 = t2.titleBlock;
          as.removeBox(t2, e2), delete t2.titleBlock;
        }, beforeUpdate(t2, e2, i3) {
          const s2 = t2.titleBlock;
          as.configure(t2, s2, i3), s2.options = i3;
        }, defaults: { align: "center", display: false, font: { weight: "bold" }, fullSize: true, padding: 10, position: "top", text: "", weight: 2e3 }, defaultRoutes: { color: "color" }, descriptors: { _scriptable: true, _indexable: false } };
        const wa = /* @__PURE__ */ new WeakMap();
        var ka = { id: "subtitle", start(t2, e2, i3) {
          const s2 = new va({ ctx: t2.ctx, options: i3, chart: t2 });
          as.configure(t2, s2, i3), as.addBox(t2, s2), wa.set(t2, s2);
        }, stop(t2) {
          as.removeBox(t2, wa.get(t2)), wa.delete(t2);
        }, beforeUpdate(t2, e2, i3) {
          const s2 = wa.get(t2);
          as.configure(t2, s2, i3), s2.options = i3;
        }, defaults: { align: "center", display: false, font: { weight: "normal" }, fullSize: true, padding: 0, position: "top", text: "", weight: 1500 }, defaultRoutes: { color: "color" }, descriptors: { _scriptable: true, _indexable: false } };
        const Sa = { average(t2) {
          if (!t2.length)
            return false;
          let e2, i3, s2 = /* @__PURE__ */ new Set(), n2 = 0, o2 = 0;
          for (e2 = 0, i3 = t2.length; e2 < i3; ++e2) {
            const i4 = t2[e2].element;
            if (i4 && i4.hasValue()) {
              const t3 = i4.tooltipPosition();
              s2.add(t3.x), n2 += t3.y, ++o2;
            }
          }
          return { x: [...s2].reduce((t3, e3) => t3 + e3) / s2.size, y: n2 / o2 };
        }, nearest(t2, e2) {
          if (!t2.length)
            return false;
          let i3, s2, n2, o2 = e2.x, a2 = e2.y, r2 = Number.POSITIVE_INFINITY;
          for (i3 = 0, s2 = t2.length; i3 < s2; ++i3) {
            const s3 = t2[i3].element;
            if (s3 && s3.hasValue()) {
              const t3 = q(e2, s3.getCenterPoint());
              t3 < r2 && (r2 = t3, n2 = s3);
            }
          }
          if (n2) {
            const t3 = n2.tooltipPosition();
            o2 = t3.x, a2 = t3.y;
          }
          return { x: o2, y: a2 };
        } };
        function Pa(t2, e2) {
          return e2 && (n(e2) ? Array.prototype.push.apply(t2, e2) : t2.push(e2)), t2;
        }
        function Da(t2) {
          return ("string" == typeof t2 || t2 instanceof String) && t2.indexOf("\n") > -1 ? t2.split("\n") : t2;
        }
        function Ca(t2, e2) {
          const { element: i3, datasetIndex: s2, index: n2 } = e2, o2 = t2.getDatasetMeta(s2).controller, { label: a2, value: r2 } = o2.getLabelAndValue(n2);
          return { chart: t2, label: a2, parsed: o2.getParsed(n2), raw: t2.data.datasets[s2].data[n2], formattedValue: r2, dataset: o2.getDataset(), dataIndex: n2, datasetIndex: s2, element: i3 };
        }
        function Oa(t2, e2) {
          const i3 = t2.chart.ctx, { body: s2, footer: n2, title: o2 } = t2, { boxWidth: a2, boxHeight: r2 } = e2, l2 = Si(e2.bodyFont), h2 = Si(e2.titleFont), c2 = Si(e2.footerFont), d2 = o2.length, f2 = n2.length, g2 = s2.length, p2 = ki(e2.padding);
          let m2 = p2.height, x2 = 0, b2 = s2.reduce((t3, e3) => t3 + e3.before.length + e3.lines.length + e3.after.length, 0);
          if (b2 += t2.beforeBody.length + t2.afterBody.length, d2 && (m2 += d2 * h2.lineHeight + (d2 - 1) * e2.titleSpacing + e2.titleMarginBottom), b2) {
            m2 += g2 * (e2.displayColors ? Math.max(r2, l2.lineHeight) : l2.lineHeight) + (b2 - g2) * l2.lineHeight + (b2 - 1) * e2.bodySpacing;
          }
          f2 && (m2 += e2.footerMarginTop + f2 * c2.lineHeight + (f2 - 1) * e2.footerSpacing);
          let _2 = 0;
          const y2 = function(t3) {
            x2 = Math.max(x2, i3.measureText(t3).width + _2);
          };
          return i3.save(), i3.font = h2.string, u(t2.title, y2), i3.font = l2.string, u(t2.beforeBody.concat(t2.afterBody), y2), _2 = e2.displayColors ? a2 + 2 + e2.boxPadding : 0, u(s2, (t3) => {
            u(t3.before, y2), u(t3.lines, y2), u(t3.after, y2);
          }), _2 = 0, i3.font = c2.string, u(t2.footer, y2), i3.restore(), x2 += p2.width, { width: x2, height: m2 };
        }
        function Aa(t2, e2, i3, s2) {
          const { x: n2, width: o2 } = i3, { width: a2, chartArea: { left: r2, right: l2 } } = t2;
          let h2 = "center";
          return "center" === s2 ? h2 = n2 <= (r2 + l2) / 2 ? "left" : "right" : n2 <= o2 / 2 ? h2 = "left" : n2 >= a2 - o2 / 2 && (h2 = "right"), function(t3, e3, i4, s3) {
            const { x: n3, width: o3 } = s3, a3 = i4.caretSize + i4.caretPadding;
            return "left" === t3 && n3 + o3 + a3 > e3.width || "right" === t3 && n3 - o3 - a3 < 0 || void 0;
          }(h2, t2, e2, i3) && (h2 = "center"), h2;
        }
        function Ta(t2, e2, i3) {
          const s2 = i3.yAlign || e2.yAlign || function(t3, e3) {
            const { y: i4, height: s3 } = e3;
            return i4 < s3 / 2 ? "top" : i4 > t3.height - s3 / 2 ? "bottom" : "center";
          }(t2, i3);
          return { xAlign: i3.xAlign || e2.xAlign || Aa(t2, e2, i3, s2), yAlign: s2 };
        }
        function La(t2, e2, i3, s2) {
          const { caretSize: n2, caretPadding: o2, cornerRadius: a2 } = t2, { xAlign: r2, yAlign: l2 } = i3, h2 = n2 + o2, { topLeft: c2, topRight: d2, bottomLeft: u2, bottomRight: f2 } = wi(a2);
          let g2 = function(t3, e3) {
            let { x: i4, width: s3 } = t3;
            return "right" === e3 ? i4 -= s3 : "center" === e3 && (i4 -= s3 / 2), i4;
          }(e2, r2);
          const p2 = function(t3, e3, i4) {
            let { y: s3, height: n3 } = t3;
            return "top" === e3 ? s3 += i4 : s3 -= "bottom" === e3 ? n3 + i4 : n3 / 2, s3;
          }(e2, l2, h2);
          return "center" === l2 ? "left" === r2 ? g2 += h2 : "right" === r2 && (g2 -= h2) : "left" === r2 ? g2 -= Math.max(c2, u2) + n2 : "right" === r2 && (g2 += Math.max(d2, f2) + n2), { x: J(g2, 0, s2.width - e2.width), y: J(p2, 0, s2.height - e2.height) };
        }
        function Ea(t2, e2, i3) {
          const s2 = ki(i3.padding);
          return "center" === e2 ? t2.x + t2.width / 2 : "right" === e2 ? t2.x + t2.width - s2.right : t2.x + s2.left;
        }
        function Ra(t2) {
          return Pa([], Da(t2));
        }
        function Ia(t2, e2) {
          const i3 = e2 && e2.dataset && e2.dataset.tooltip && e2.dataset.tooltip.callbacks;
          return i3 ? t2.override(i3) : t2;
        }
        const za = { beforeTitle: e, title(t2) {
          if (t2.length > 0) {
            const e2 = t2[0], i3 = e2.chart.data.labels, s2 = i3 ? i3.length : 0;
            if (this && this.options && "dataset" === this.options.mode)
              return e2.dataset.label || "";
            if (e2.label)
              return e2.label;
            if (s2 > 0 && e2.dataIndex < s2)
              return i3[e2.dataIndex];
          }
          return "";
        }, afterTitle: e, beforeBody: e, beforeLabel: e, label(t2) {
          if (this && this.options && "dataset" === this.options.mode)
            return t2.label + ": " + t2.formattedValue || t2.formattedValue;
          let e2 = t2.dataset.label || "";
          e2 && (e2 += ": ");
          const i3 = t2.formattedValue;
          return s(i3) || (e2 += i3), e2;
        }, labelColor(t2) {
          const e2 = t2.chart.getDatasetMeta(t2.datasetIndex).controller.getStyle(t2.dataIndex);
          return { borderColor: e2.borderColor, backgroundColor: e2.backgroundColor, borderWidth: e2.borderWidth, borderDash: e2.borderDash, borderDashOffset: e2.borderDashOffset, borderRadius: 0 };
        }, labelTextColor() {
          return this.options.bodyColor;
        }, labelPointStyle(t2) {
          const e2 = t2.chart.getDatasetMeta(t2.datasetIndex).controller.getStyle(t2.dataIndex);
          return { pointStyle: e2.pointStyle, rotation: e2.rotation };
        }, afterLabel: e, afterBody: e, beforeFooter: e, footer: e, afterFooter: e };
        function Fa(t2, e2, i3, s2) {
          const n2 = t2[e2].call(i3, s2);
          return void 0 === n2 ? za[e2].call(i3, s2) : n2;
        }
        class Va extends Hs {
          constructor(t2) {
            super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = t2.chart, this.options = t2.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
          }
          initialize(t2) {
            this.options = t2, this._cachedAnimations = void 0, this.$context = void 0;
          }
          _resolveAnimations() {
            const t2 = this._cachedAnimations;
            if (t2)
              return t2;
            const e2 = this.chart, i3 = this.options.setContext(this.getContext()), s2 = i3.enabled && e2.options.animation && i3.animations, n2 = new Os(this.chart, s2);
            return s2._cacheable && (this._cachedAnimations = Object.freeze(n2)), n2;
          }
          getContext() {
            return this.$context || (this.$context = (t2 = this.chart.getContext(), e2 = this, i3 = this._tooltipItems, Ci(t2, { tooltip: e2, tooltipItems: i3, type: "tooltip" })));
            var t2, e2, i3;
          }
          getTitle(t2, e2) {
            const { callbacks: i3 } = e2, s2 = Fa(i3, "beforeTitle", this, t2), n2 = Fa(i3, "title", this, t2), o2 = Fa(i3, "afterTitle", this, t2);
            let a2 = [];
            return a2 = Pa(a2, Da(s2)), a2 = Pa(a2, Da(n2)), a2 = Pa(a2, Da(o2)), a2;
          }
          getBeforeBody(t2, e2) {
            return Ra(Fa(e2.callbacks, "beforeBody", this, t2));
          }
          getBody(t2, e2) {
            const { callbacks: i3 } = e2, s2 = [];
            return u(t2, (t3) => {
              const e3 = { before: [], lines: [], after: [] }, n2 = Ia(i3, t3);
              Pa(e3.before, Da(Fa(n2, "beforeLabel", this, t3))), Pa(e3.lines, Fa(n2, "label", this, t3)), Pa(e3.after, Da(Fa(n2, "afterLabel", this, t3))), s2.push(e3);
            }), s2;
          }
          getAfterBody(t2, e2) {
            return Ra(Fa(e2.callbacks, "afterBody", this, t2));
          }
          getFooter(t2, e2) {
            const { callbacks: i3 } = e2, s2 = Fa(i3, "beforeFooter", this, t2), n2 = Fa(i3, "footer", this, t2), o2 = Fa(i3, "afterFooter", this, t2);
            let a2 = [];
            return a2 = Pa(a2, Da(s2)), a2 = Pa(a2, Da(n2)), a2 = Pa(a2, Da(o2)), a2;
          }
          _createItems(t2) {
            const e2 = this._active, i3 = this.chart.data, s2 = [], n2 = [], o2 = [];
            let a2, r2, l2 = [];
            for (a2 = 0, r2 = e2.length; a2 < r2; ++a2)
              l2.push(Ca(this.chart, e2[a2]));
            return t2.filter && (l2 = l2.filter((e3, s3, n3) => t2.filter(e3, s3, n3, i3))), t2.itemSort && (l2 = l2.sort((e3, s3) => t2.itemSort(e3, s3, i3))), u(l2, (e3) => {
              const i4 = Ia(t2.callbacks, e3);
              s2.push(Fa(i4, "labelColor", this, e3)), n2.push(Fa(i4, "labelPointStyle", this, e3)), o2.push(Fa(i4, "labelTextColor", this, e3));
            }), this.labelColors = s2, this.labelPointStyles = n2, this.labelTextColors = o2, this.dataPoints = l2, l2;
          }
          update(t2, e2) {
            const i3 = this.options.setContext(this.getContext()), s2 = this._active;
            let n2, o2 = [];
            if (s2.length) {
              const t3 = Sa[i3.position].call(this, s2, this._eventPosition);
              o2 = this._createItems(i3), this.title = this.getTitle(o2, i3), this.beforeBody = this.getBeforeBody(o2, i3), this.body = this.getBody(o2, i3), this.afterBody = this.getAfterBody(o2, i3), this.footer = this.getFooter(o2, i3);
              const e3 = this._size = Oa(this, i3), a2 = Object.assign({}, t3, e3), r2 = Ta(this.chart, i3, a2), l2 = La(i3, a2, r2, this.chart);
              this.xAlign = r2.xAlign, this.yAlign = r2.yAlign, n2 = { opacity: 1, x: l2.x, y: l2.y, width: e3.width, height: e3.height, caretX: t3.x, caretY: t3.y };
            } else
              0 !== this.opacity && (n2 = { opacity: 0 });
            this._tooltipItems = o2, this.$context = void 0, n2 && this._resolveAnimations().update(this, n2), t2 && i3.external && i3.external.call(this, { chart: this.chart, tooltip: this, replay: e2 });
          }
          drawCaret(t2, e2, i3, s2) {
            const n2 = this.getCaretPosition(t2, i3, s2);
            e2.lineTo(n2.x1, n2.y1), e2.lineTo(n2.x2, n2.y2), e2.lineTo(n2.x3, n2.y3);
          }
          getCaretPosition(t2, e2, i3) {
            const { xAlign: s2, yAlign: n2 } = this, { caretSize: o2, cornerRadius: a2 } = i3, { topLeft: r2, topRight: l2, bottomLeft: h2, bottomRight: c2 } = wi(a2), { x: d2, y: u2 } = t2, { width: f2, height: g2 } = e2;
            let p2, m2, x2, b2, _2, y2;
            return "center" === n2 ? (_2 = u2 + g2 / 2, "left" === s2 ? (p2 = d2, m2 = p2 - o2, b2 = _2 + o2, y2 = _2 - o2) : (p2 = d2 + f2, m2 = p2 + o2, b2 = _2 - o2, y2 = _2 + o2), x2 = p2) : (m2 = "left" === s2 ? d2 + Math.max(r2, h2) + o2 : "right" === s2 ? d2 + f2 - Math.max(l2, c2) - o2 : this.caretX, "top" === n2 ? (b2 = u2, _2 = b2 - o2, p2 = m2 - o2, x2 = m2 + o2) : (b2 = u2 + g2, _2 = b2 + o2, p2 = m2 + o2, x2 = m2 - o2), y2 = b2), { x1: p2, x2: m2, x3: x2, y1: b2, y2: _2, y3: y2 };
          }
          drawTitle(t2, e2, i3) {
            const s2 = this.title, n2 = s2.length;
            let o2, a2, r2;
            if (n2) {
              const l2 = Oi(i3.rtl, this.x, this.width);
              for (t2.x = Ea(this, i3.titleAlign, i3), e2.textAlign = l2.textAlign(i3.titleAlign), e2.textBaseline = "middle", o2 = Si(i3.titleFont), a2 = i3.titleSpacing, e2.fillStyle = i3.titleColor, e2.font = o2.string, r2 = 0; r2 < n2; ++r2)
                e2.fillText(s2[r2], l2.x(t2.x), t2.y + o2.lineHeight / 2), t2.y += o2.lineHeight + a2, r2 + 1 === n2 && (t2.y += i3.titleMarginBottom - a2);
            }
          }
          _drawColorBox(t2, e2, i3, s2, n2) {
            const a2 = this.labelColors[i3], r2 = this.labelPointStyles[i3], { boxHeight: l2, boxWidth: h2 } = n2, c2 = Si(n2.bodyFont), d2 = Ea(this, "left", n2), u2 = s2.x(d2), f2 = l2 < c2.lineHeight ? (c2.lineHeight - l2) / 2 : 0, g2 = e2.y + f2;
            if (n2.usePointStyle) {
              const e3 = { radius: Math.min(h2, l2) / 2, pointStyle: r2.pointStyle, rotation: r2.rotation, borderWidth: 1 }, i4 = s2.leftForLtr(u2, h2) + h2 / 2, o2 = g2 + l2 / 2;
              t2.strokeStyle = n2.multiKeyBackground, t2.fillStyle = n2.multiKeyBackground, Le(t2, e3, i4, o2), t2.strokeStyle = a2.borderColor, t2.fillStyle = a2.backgroundColor, Le(t2, e3, i4, o2);
            } else {
              t2.lineWidth = o(a2.borderWidth) ? Math.max(...Object.values(a2.borderWidth)) : a2.borderWidth || 1, t2.strokeStyle = a2.borderColor, t2.setLineDash(a2.borderDash || []), t2.lineDashOffset = a2.borderDashOffset || 0;
              const e3 = s2.leftForLtr(u2, h2), i4 = s2.leftForLtr(s2.xPlus(u2, 1), h2 - 2), r3 = wi(a2.borderRadius);
              Object.values(r3).some((t3) => 0 !== t3) ? (t2.beginPath(), t2.fillStyle = n2.multiKeyBackground, He(t2, { x: e3, y: g2, w: h2, h: l2, radius: r3 }), t2.fill(), t2.stroke(), t2.fillStyle = a2.backgroundColor, t2.beginPath(), He(t2, { x: i4, y: g2 + 1, w: h2 - 2, h: l2 - 2, radius: r3 }), t2.fill()) : (t2.fillStyle = n2.multiKeyBackground, t2.fillRect(e3, g2, h2, l2), t2.strokeRect(e3, g2, h2, l2), t2.fillStyle = a2.backgroundColor, t2.fillRect(i4, g2 + 1, h2 - 2, l2 - 2));
            }
            t2.fillStyle = this.labelTextColors[i3];
          }
          drawBody(t2, e2, i3) {
            const { body: s2 } = this, { bodySpacing: n2, bodyAlign: o2, displayColors: a2, boxHeight: r2, boxWidth: l2, boxPadding: h2 } = i3, c2 = Si(i3.bodyFont);
            let d2 = c2.lineHeight, f2 = 0;
            const g2 = Oi(i3.rtl, this.x, this.width), p2 = function(i4) {
              e2.fillText(i4, g2.x(t2.x + f2), t2.y + d2 / 2), t2.y += d2 + n2;
            }, m2 = g2.textAlign(o2);
            let x2, b2, _2, y2, v2, M2, w2;
            for (e2.textAlign = o2, e2.textBaseline = "middle", e2.font = c2.string, t2.x = Ea(this, m2, i3), e2.fillStyle = i3.bodyColor, u(this.beforeBody, p2), f2 = a2 && "right" !== m2 ? "center" === o2 ? l2 / 2 + h2 : l2 + 2 + h2 : 0, y2 = 0, M2 = s2.length; y2 < M2; ++y2) {
              for (x2 = s2[y2], b2 = this.labelTextColors[y2], e2.fillStyle = b2, u(x2.before, p2), _2 = x2.lines, a2 && _2.length && (this._drawColorBox(e2, t2, y2, g2, i3), d2 = Math.max(c2.lineHeight, r2)), v2 = 0, w2 = _2.length; v2 < w2; ++v2)
                p2(_2[v2]), d2 = c2.lineHeight;
              u(x2.after, p2);
            }
            f2 = 0, d2 = c2.lineHeight, u(this.afterBody, p2), t2.y -= n2;
          }
          drawFooter(t2, e2, i3) {
            const s2 = this.footer, n2 = s2.length;
            let o2, a2;
            if (n2) {
              const r2 = Oi(i3.rtl, this.x, this.width);
              for (t2.x = Ea(this, i3.footerAlign, i3), t2.y += i3.footerMarginTop, e2.textAlign = r2.textAlign(i3.footerAlign), e2.textBaseline = "middle", o2 = Si(i3.footerFont), e2.fillStyle = i3.footerColor, e2.font = o2.string, a2 = 0; a2 < n2; ++a2)
                e2.fillText(s2[a2], r2.x(t2.x), t2.y + o2.lineHeight / 2), t2.y += o2.lineHeight + i3.footerSpacing;
            }
          }
          drawBackground(t2, e2, i3, s2) {
            const { xAlign: n2, yAlign: o2 } = this, { x: a2, y: r2 } = t2, { width: l2, height: h2 } = i3, { topLeft: c2, topRight: d2, bottomLeft: u2, bottomRight: f2 } = wi(s2.cornerRadius);
            e2.fillStyle = s2.backgroundColor, e2.strokeStyle = s2.borderColor, e2.lineWidth = s2.borderWidth, e2.beginPath(), e2.moveTo(a2 + c2, r2), "top" === o2 && this.drawCaret(t2, e2, i3, s2), e2.lineTo(a2 + l2 - d2, r2), e2.quadraticCurveTo(a2 + l2, r2, a2 + l2, r2 + d2), "center" === o2 && "right" === n2 && this.drawCaret(t2, e2, i3, s2), e2.lineTo(a2 + l2, r2 + h2 - f2), e2.quadraticCurveTo(a2 + l2, r2 + h2, a2 + l2 - f2, r2 + h2), "bottom" === o2 && this.drawCaret(t2, e2, i3, s2), e2.lineTo(a2 + u2, r2 + h2), e2.quadraticCurveTo(a2, r2 + h2, a2, r2 + h2 - u2), "center" === o2 && "left" === n2 && this.drawCaret(t2, e2, i3, s2), e2.lineTo(a2, r2 + c2), e2.quadraticCurveTo(a2, r2, a2 + c2, r2), e2.closePath(), e2.fill(), s2.borderWidth > 0 && e2.stroke();
          }
          _updateAnimationTarget(t2) {
            const e2 = this.chart, i3 = this.$animations, s2 = i3 && i3.x, n2 = i3 && i3.y;
            if (s2 || n2) {
              const i4 = Sa[t2.position].call(this, this._active, this._eventPosition);
              if (!i4)
                return;
              const o2 = this._size = Oa(this, t2), a2 = Object.assign({}, i4, this._size), r2 = Ta(e2, t2, a2), l2 = La(t2, a2, r2, e2);
              s2._to === l2.x && n2._to === l2.y || (this.xAlign = r2.xAlign, this.yAlign = r2.yAlign, this.width = o2.width, this.height = o2.height, this.caretX = i4.x, this.caretY = i4.y, this._resolveAnimations().update(this, l2));
            }
          }
          _willRender() {
            return !!this.opacity;
          }
          draw(t2) {
            const e2 = this.options.setContext(this.getContext());
            let i3 = this.opacity;
            if (!i3)
              return;
            this._updateAnimationTarget(e2);
            const s2 = { width: this.width, height: this.height }, n2 = { x: this.x, y: this.y };
            i3 = Math.abs(i3) < 1e-3 ? 0 : i3;
            const o2 = ki(e2.padding), a2 = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
            e2.enabled && a2 && (t2.save(), t2.globalAlpha = i3, this.drawBackground(n2, t2, s2, e2), Ai(t2, e2.textDirection), n2.y += o2.top, this.drawTitle(n2, t2, e2), this.drawBody(n2, t2, e2), this.drawFooter(n2, t2, e2), Ti(t2, e2.textDirection), t2.restore());
          }
          getActiveElements() {
            return this._active || [];
          }
          setActiveElements(t2, e2) {
            const i3 = this._active, s2 = t2.map(({ datasetIndex: t3, index: e3 }) => {
              const i4 = this.chart.getDatasetMeta(t3);
              if (!i4)
                throw new Error("Cannot find a dataset at index " + t3);
              return { datasetIndex: t3, element: i4.data[e3], index: e3 };
            }), n2 = !f(i3, s2), o2 = this._positionChanged(s2, e2);
            (n2 || o2) && (this._active = s2, this._eventPosition = e2, this._ignoreReplayEvents = true, this.update(true));
          }
          handleEvent(t2, e2, i3 = true) {
            if (e2 && this._ignoreReplayEvents)
              return false;
            this._ignoreReplayEvents = false;
            const s2 = this.options, n2 = this._active || [], o2 = this._getActiveElements(t2, n2, e2, i3), a2 = this._positionChanged(o2, t2), r2 = e2 || !f(o2, n2) || a2;
            return r2 && (this._active = o2, (s2.enabled || s2.external) && (this._eventPosition = { x: t2.x, y: t2.y }, this.update(true, e2))), r2;
          }
          _getActiveElements(t2, e2, i3, s2) {
            const n2 = this.options;
            if ("mouseout" === t2.type)
              return [];
            if (!s2)
              return e2.filter((t3) => this.chart.data.datasets[t3.datasetIndex] && void 0 !== this.chart.getDatasetMeta(t3.datasetIndex).controller.getParsed(t3.index));
            const o2 = this.chart.getElementsAtEventForMode(t2, n2.mode, n2, i3);
            return n2.reverse && o2.reverse(), o2;
          }
          _positionChanged(t2, e2) {
            const { caretX: i3, caretY: s2, options: n2 } = this, o2 = Sa[n2.position].call(this, t2, e2);
            return false !== o2 && (i3 !== o2.x || s2 !== o2.y);
          }
        }
        __publicField(Va, "positioners", Sa);
        var Ba = { id: "tooltip", _element: Va, positioners: Sa, afterInit(t2, e2, i3) {
          i3 && (t2.tooltip = new Va({ chart: t2, options: i3 }));
        }, beforeUpdate(t2, e2, i3) {
          t2.tooltip && t2.tooltip.initialize(i3);
        }, reset(t2, e2, i3) {
          t2.tooltip && t2.tooltip.initialize(i3);
        }, afterDraw(t2) {
          const e2 = t2.tooltip;
          if (e2 && e2._willRender()) {
            const i3 = { tooltip: e2 };
            if (false === t2.notifyPlugins("beforeTooltipDraw", __spreadProps(__spreadValues({}, i3), { cancelable: true })))
              return;
            e2.draw(t2.ctx), t2.notifyPlugins("afterTooltipDraw", i3);
          }
        }, afterEvent(t2, e2) {
          if (t2.tooltip) {
            const i3 = e2.replay;
            t2.tooltip.handleEvent(e2.event, i3, e2.inChartArea) && (e2.changed = true);
          }
        }, defaults: { enabled: true, external: null, position: "average", backgroundColor: "rgba(0,0,0,0.8)", titleColor: "#fff", titleFont: { weight: "bold" }, titleSpacing: 2, titleMarginBottom: 6, titleAlign: "left", bodyColor: "#fff", bodySpacing: 2, bodyFont: {}, bodyAlign: "left", footerColor: "#fff", footerSpacing: 2, footerMarginTop: 6, footerFont: { weight: "bold" }, footerAlign: "left", padding: 6, caretPadding: 2, caretSize: 5, cornerRadius: 6, boxHeight: (t2, e2) => e2.bodyFont.size, boxWidth: (t2, e2) => e2.bodyFont.size, multiKeyBackground: "#fff", displayColors: true, boxPadding: 0, borderColor: "rgba(0,0,0,0)", borderWidth: 0, animation: { duration: 400, easing: "easeOutQuart" }, animations: { numbers: { type: "number", properties: ["x", "y", "width", "height", "caretX", "caretY"] }, opacity: { easing: "linear", duration: 200 } }, callbacks: za }, defaultRoutes: { bodyFont: "font", footerFont: "font", titleFont: "font" }, descriptors: { _scriptable: (t2) => "filter" !== t2 && "itemSort" !== t2 && "external" !== t2, _indexable: false, callbacks: { _scriptable: false, _indexable: false }, animation: { _fallback: false }, animations: { _fallback: "animation" } }, additionalOptionScopes: ["interaction"] };
        return An.register(Yn, jo, fo, t), An.helpers = __spreadValues({}, Wi), An._adapters = Rn, An.Animation = Cs, An.Animations = Os, An.animator = bt, An.controllers = en.controllers.items, An.DatasetController = Ns, An.Element = Hs, An.elements = fo, An.Interaction = Xi, An.layouts = as, An.platforms = Ss, An.Scale = Js, An.Ticks = ae, Object.assign(An, Yn, jo, fo, t, Ss), An.Chart = An, "undefined" != typeof window && (window.Chart = An), An;
      });
    }
  });

  // ../deps/phoenix_html/priv/static/phoenix_html.js
  (function() {
    var PolyfillEvent = eventConstructor();
    function eventConstructor() {
      if (typeof window.CustomEvent === "function")
        return window.CustomEvent;
      function CustomEvent2(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: void 0 };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }
      CustomEvent2.prototype = window.Event.prototype;
      return CustomEvent2;
    }
    function buildHiddenInput(name, value) {
      var input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      return input;
    }
    function handleClick(element, targetModifierKey) {
      var to = element.getAttribute("data-to"), method = buildHiddenInput("_method", element.getAttribute("data-method")), csrf = buildHiddenInput("_csrf_token", element.getAttribute("data-csrf")), form = document.createElement("form"), submit = document.createElement("input"), target = element.getAttribute("target");
      form.method = element.getAttribute("data-method") === "get" ? "get" : "post";
      form.action = to;
      form.style.display = "none";
      if (target)
        form.target = target;
      else if (targetModifierKey)
        form.target = "_blank";
      form.appendChild(csrf);
      form.appendChild(method);
      document.body.appendChild(form);
      submit.type = "submit";
      form.appendChild(submit);
      submit.click();
    }
    window.addEventListener("click", function(e) {
      var element = e.target;
      if (e.defaultPrevented)
        return;
      while (element && element.getAttribute) {
        var phoenixLinkEvent = new PolyfillEvent("phoenix.link.click", {
          "bubbles": true,
          "cancelable": true
        });
        if (!element.dispatchEvent(phoenixLinkEvent)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return false;
        }
        if (element.getAttribute("data-method") && element.getAttribute("data-to")) {
          handleClick(element, e.metaKey || e.shiftKey);
          e.preventDefault();
          return false;
        } else {
          element = element.parentNode;
        }
      }
    }, false);
    window.addEventListener("phoenix.link.click", function(e) {
      var message = e.target.getAttribute("data-confirm");
      if (message && !window.confirm(message)) {
        e.preventDefault();
      }
    }, false);
  })();

  // ../deps/phoenix/priv/static/phoenix.mjs
  var closure = (value) => {
    if (typeof value === "function") {
      return value;
    } else {
      let closure22 = function() {
        return value;
      };
      return closure22;
    }
  };
  var globalSelf = typeof self !== "undefined" ? self : null;
  var phxWindow = typeof window !== "undefined" ? window : null;
  var global = globalSelf || phxWindow || global;
  var DEFAULT_VSN = "2.0.0";
  var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
  var DEFAULT_TIMEOUT = 1e4;
  var WS_CLOSE_NORMAL = 1e3;
  var CHANNEL_STATES = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving"
  };
  var CHANNEL_EVENTS = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave"
  };
  var TRANSPORTS = {
    longpoll: "longpoll",
    websocket: "websocket"
  };
  var XHR_STATES = {
    complete: 4
  };
  var Push = class {
    constructor(channel, event, payload, timeout) {
      this.channel = channel;
      this.event = event;
      this.payload = payload || function() {
        return {};
      };
      this.receivedResp = null;
      this.timeout = timeout;
      this.timeoutTimer = null;
      this.recHooks = [];
      this.sent = false;
    }
    /**
     *
     * @param {number} timeout
     */
    resend(timeout) {
      this.timeout = timeout;
      this.reset();
      this.send();
    }
    /**
     *
     */
    send() {
      if (this.hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload(),
        ref: this.ref,
        join_ref: this.channel.joinRef()
      });
    }
    /**
     *
     * @param {*} status
     * @param {*} callback
     */
    receive(status, callback) {
      if (this.hasReceived(status)) {
        callback(this.receivedResp.response);
      }
      this.recHooks.push({ status, callback });
      return this;
    }
    /**
     * @private
     */
    reset() {
      this.cancelRefEvent();
      this.ref = null;
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
    }
    /**
     * @private
     */
    matchReceive({ status, response, _ref }) {
      this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
    }
    /**
     * @private
     */
    cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
    /**
     * @private
     */
    cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    /**
     * @private
     */
    startTimeout() {
      if (this.timeoutTimer) {
        this.cancelTimeout();
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);
      this.channel.on(this.refEvent, (payload) => {
        this.cancelRefEvent();
        this.cancelTimeout();
        this.receivedResp = payload;
        this.matchReceive(payload);
      });
      this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout);
    }
    /**
     * @private
     */
    hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
    /**
     * @private
     */
    trigger(status, response) {
      this.channel.trigger(this.refEvent, { status, response });
    }
  };
  var Timer = class {
    constructor(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = null;
      this.tries = 0;
    }
    reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }
    /**
     * Cancels any previous scheduleTimeout and schedules callback
     */
    scheduleTimeout() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tries = this.tries + 1;
        this.callback();
      }, this.timerCalc(this.tries + 1));
    }
  };
  var Channel = class {
    constructor(topic, params, socket) {
      this.state = CHANNEL_STATES.closed;
      this.topic = topic;
      this.params = closure(params || {});
      this.socket = socket;
      this.bindings = [];
      this.bindingRef = 0;
      this.timeout = this.socket.timeout;
      this.joinedOnce = false;
      this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
      this.pushBuffer = [];
      this.stateChangeRefs = [];
      this.rejoinTimer = new Timer(() => {
        if (this.socket.isConnected()) {
          this.rejoin();
        }
      }, this.socket.rejoinAfterMs);
      this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset()));
      this.stateChangeRefs.push(
        this.socket.onOpen(() => {
          this.rejoinTimer.reset();
          if (this.isErrored()) {
            this.rejoin();
          }
        })
      );
      this.joinPush.receive("ok", () => {
        this.state = CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this.joinPush.receive("error", () => {
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.onClose(() => {
        this.rejoinTimer.reset();
        if (this.socket.hasLogger())
          this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
        this.state = CHANNEL_STATES.closed;
        this.socket.remove(this);
      });
      this.onError((reason) => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `error ${this.topic}`, reason);
        if (this.isJoining()) {
          this.joinPush.reset();
        }
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.joinPush.receive("timeout", () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout);
        let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout);
        leavePush.send();
        this.state = CHANNEL_STATES.errored;
        this.joinPush.reset();
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
        this.trigger(this.replyEventName(ref), payload);
      });
    }
    /**
     * Join the channel
     * @param {integer} timeout
     * @returns {Push}
     */
    join(timeout = this.timeout) {
      if (this.joinedOnce) {
        throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
      } else {
        this.timeout = timeout;
        this.joinedOnce = true;
        this.rejoin();
        return this.joinPush;
      }
    }
    /**
     * Hook into channel close
     * @param {Function} callback
     */
    onClose(callback) {
      this.on(CHANNEL_EVENTS.close, callback);
    }
    /**
     * Hook into channel errors
     * @param {Function} callback
     */
    onError(callback) {
      return this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
    }
    /**
     * Subscribes on channel events
     *
     * Subscription returns a ref counter, which can be used later to
     * unsubscribe the exact event listener
     *
     * @example
     * const ref1 = channel.on("event", do_stuff)
     * const ref2 = channel.on("event", do_other_stuff)
     * channel.off("event", ref1)
     * // Since unsubscription, do_stuff won't fire,
     * // while do_other_stuff will keep firing on the "event"
     *
     * @param {string} event
     * @param {Function} callback
     * @returns {integer} ref
     */
    on(event, callback) {
      let ref = this.bindingRef++;
      this.bindings.push({ event, ref, callback });
      return ref;
    }
    /**
     * Unsubscribes off of channel events
     *
     * Use the ref returned from a channel.on() to unsubscribe one
     * handler, or pass nothing for the ref to unsubscribe all
     * handlers for the given event.
     *
     * @example
     * // Unsubscribe the do_stuff handler
     * const ref1 = channel.on("event", do_stuff)
     * channel.off("event", ref1)
     *
     * // Unsubscribe all handlers from event
     * channel.off("event")
     *
     * @param {string} event
     * @param {integer} ref
     */
    off(event, ref) {
      this.bindings = this.bindings.filter((bind) => {
        return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
      });
    }
    /**
     * @private
     */
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    /**
     * Sends a message `event` to phoenix with the payload `payload`.
     * Phoenix receives this in the `handle_in(event, payload, socket)`
     * function. if phoenix replies or it times out (default 10000ms),
     * then optionally the reply can be received.
     *
     * @example
     * channel.push("event")
     *   .receive("ok", payload => console.log("phoenix replied:", payload))
     *   .receive("error", err => console.log("phoenix errored", err))
     *   .receive("timeout", () => console.log("timed out pushing"))
     * @param {string} event
     * @param {Object} payload
     * @param {number} [timeout]
     * @returns {Push}
     */
    push(event, payload, timeout = this.timeout) {
      payload = payload || {};
      if (!this.joinedOnce) {
        throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
      }
      let pushEvent = new Push(this, event, function() {
        return payload;
      }, timeout);
      if (this.canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }
      return pushEvent;
    }
    /** Leaves the channel
     *
     * Unsubscribes from server events, and
     * instructs channel to terminate on server
     *
     * Triggers onClose() hooks
     *
     * To receive leave acknowledgements, use the `receive`
     * hook to bind to the server ack, ie:
     *
     * @example
     * channel.leave().receive("ok", () => alert("left!") )
     *
     * @param {integer} timeout
     * @returns {Push}
     */
    leave(timeout = this.timeout) {
      this.rejoinTimer.reset();
      this.joinPush.cancelTimeout();
      this.state = CHANNEL_STATES.leaving;
      let onClose = () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `leave ${this.topic}`);
        this.trigger(CHANNEL_EVENTS.close, "leave");
      };
      let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
      leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }
      return leavePush;
    }
    /**
     * Overridable message hook
     *
     * Receives all events for specialized message handling
     * before dispatching to the channel callbacks.
     *
     * Must return the payload, modified or unmodified
     * @param {string} event
     * @param {Object} payload
     * @param {integer} ref
     * @returns {Object}
     */
    onMessage(_event, payload, _ref) {
      return payload;
    }
    /**
     * @private
     */
    isMember(topic, event, payload, joinRef) {
      if (this.topic !== topic) {
        return false;
      }
      if (joinRef && joinRef !== this.joinRef()) {
        if (this.socket.hasLogger())
          this.socket.log("channel", "dropping outdated message", { topic, event, payload, joinRef });
        return false;
      } else {
        return true;
      }
    }
    /**
     * @private
     */
    joinRef() {
      return this.joinPush.ref;
    }
    /**
     * @private
     */
    rejoin(timeout = this.timeout) {
      if (this.isLeaving()) {
        return;
      }
      this.socket.leaveOpenTopic(this.topic);
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    /**
     * @private
     */
    trigger(event, payload, ref, joinRef) {
      let handledPayload = this.onMessage(event, payload, ref, joinRef);
      if (payload && !handledPayload) {
        throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
      }
      let eventBindings = this.bindings.filter((bind) => bind.event === event);
      for (let i2 = 0; i2 < eventBindings.length; i2++) {
        let bind = eventBindings[i2];
        bind.callback(handledPayload, ref, joinRef || this.joinRef());
      }
    }
    /**
     * @private
     */
    replyEventName(ref) {
      return `chan_reply_${ref}`;
    }
    /**
     * @private
     */
    isClosed() {
      return this.state === CHANNEL_STATES.closed;
    }
    /**
     * @private
     */
    isErrored() {
      return this.state === CHANNEL_STATES.errored;
    }
    /**
     * @private
     */
    isJoined() {
      return this.state === CHANNEL_STATES.joined;
    }
    /**
     * @private
     */
    isJoining() {
      return this.state === CHANNEL_STATES.joining;
    }
    /**
     * @private
     */
    isLeaving() {
      return this.state === CHANNEL_STATES.leaving;
    }
  };
  var Ajax = class {
    static request(method, endPoint, accept, body, timeout, ontimeout, callback) {
      if (global.XDomainRequest) {
        let req = new global.XDomainRequest();
        return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
      } else {
        let req = new global.XMLHttpRequest();
        return this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
      }
    }
    static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
      req.timeout = timeout;
      req.open(method, endPoint);
      req.onload = () => {
        let response = this.parseJSON(req.responseText);
        callback && callback(response);
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.onprogress = () => {
      };
      req.send(body);
      return req;
    }
    static xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
      req.open(method, endPoint, true);
      req.timeout = timeout;
      req.setRequestHeader("Content-Type", accept);
      req.onerror = () => callback && callback(null);
      req.onreadystatechange = () => {
        if (req.readyState === XHR_STATES.complete && callback) {
          let response = this.parseJSON(req.responseText);
          callback(response);
        }
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.send(body);
      return req;
    }
    static parseJSON(resp) {
      if (!resp || resp === "") {
        return null;
      }
      try {
        return JSON.parse(resp);
      } catch (e) {
        console && console.log("failed to parse JSON response", resp);
        return null;
      }
    }
    static serialize(obj, parentKey) {
      let queryStr = [];
      for (var key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
          continue;
        }
        let paramKey = parentKey ? `${parentKey}[${key}]` : key;
        let paramVal = obj[key];
        if (typeof paramVal === "object") {
          queryStr.push(this.serialize(paramVal, paramKey));
        } else {
          queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
        }
      }
      return queryStr.join("&");
    }
    static appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }
      let prefix = url.match(/\?/) ? "&" : "?";
      return `${url}${prefix}${this.serialize(params)}`;
    }
  };
  var arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i2 = 0; i2 < len; i2++) {
      binary += String.fromCharCode(bytes[i2]);
    }
    return btoa(binary);
  };
  var LongPoll = class {
    constructor(endPoint) {
      this.endPoint = null;
      this.token = null;
      this.skipHeartbeat = true;
      this.reqs = /* @__PURE__ */ new Set();
      this.awaitingBatchAck = false;
      this.currentBatch = null;
      this.currentBatchTimer = null;
      this.batchBuffer = [];
      this.onopen = function() {
      };
      this.onerror = function() {
      };
      this.onmessage = function() {
      };
      this.onclose = function() {
      };
      this.pollEndpoint = this.normalizeEndpoint(endPoint);
      this.readyState = SOCKET_STATES.connecting;
      setTimeout(() => this.poll(), 0);
    }
    normalizeEndpoint(endPoint) {
      return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
    }
    endpointURL() {
      return Ajax.appendParams(this.pollEndpoint, { token: this.token });
    }
    closeAndRetry(code, reason, wasClean) {
      this.close(code, reason, wasClean);
      this.readyState = SOCKET_STATES.connecting;
    }
    ontimeout() {
      this.onerror("timeout");
      this.closeAndRetry(1005, "timeout", false);
    }
    isActive() {
      return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
    }
    poll() {
      this.ajax("GET", "application/json", null, () => this.ontimeout(), (resp) => {
        if (resp) {
          var { status, token, messages } = resp;
          this.token = token;
        } else {
          status = 0;
        }
        switch (status) {
          case 200:
            messages.forEach((msg) => {
              setTimeout(() => this.onmessage({ data: msg }), 0);
            });
            this.poll();
            break;
          case 204:
            this.poll();
            break;
          case 410:
            this.readyState = SOCKET_STATES.open;
            this.onopen({});
            this.poll();
            break;
          case 403:
            this.onerror(403);
            this.close(1008, "forbidden", false);
            break;
          case 0:
          case 500:
            this.onerror(500);
            this.closeAndRetry(1011, "internal server error", 500);
            break;
          default:
            throw new Error(`unhandled poll status ${status}`);
        }
      });
    }
    // we collect all pushes within the current event loop by
    // setTimeout 0, which optimizes back-to-back procedural
    // pushes against an empty buffer
    send(body) {
      if (typeof body !== "string") {
        body = arrayBufferToBase64(body);
      }
      if (this.currentBatch) {
        this.currentBatch.push(body);
      } else if (this.awaitingBatchAck) {
        this.batchBuffer.push(body);
      } else {
        this.currentBatch = [body];
        this.currentBatchTimer = setTimeout(() => {
          this.batchSend(this.currentBatch);
          this.currentBatch = null;
        }, 0);
      }
    }
    batchSend(messages) {
      this.awaitingBatchAck = true;
      this.ajax("POST", "application/x-ndjson", messages.join("\n"), () => this.onerror("timeout"), (resp) => {
        this.awaitingBatchAck = false;
        if (!resp || resp.status !== 200) {
          this.onerror(resp && resp.status);
          this.closeAndRetry(1011, "internal server error", false);
        } else if (this.batchBuffer.length > 0) {
          this.batchSend(this.batchBuffer);
          this.batchBuffer = [];
        }
      });
    }
    close(code, reason, wasClean) {
      for (let req of this.reqs) {
        req.abort();
      }
      this.readyState = SOCKET_STATES.closed;
      let opts = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code, reason, wasClean });
      this.batchBuffer = [];
      clearTimeout(this.currentBatchTimer);
      this.currentBatchTimer = null;
      if (typeof CloseEvent !== "undefined") {
        this.onclose(new CloseEvent("close", opts));
      } else {
        this.onclose(opts);
      }
    }
    ajax(method, contentType, body, onCallerTimeout, callback) {
      let req;
      let ontimeout = () => {
        this.reqs.delete(req);
        onCallerTimeout();
      };
      req = Ajax.request(method, this.endpointURL(), contentType, body, this.timeout, ontimeout, (resp) => {
        this.reqs.delete(req);
        if (this.isActive()) {
          callback(resp);
        }
      });
      this.reqs.add(req);
    }
  };
  var serializer_default = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: { push: 0, reply: 1, broadcast: 2 },
    encode(msg, callback) {
      if (msg.payload.constructor === ArrayBuffer) {
        return callback(this.binaryEncode(msg));
      } else {
        let payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
        return callback(JSON.stringify(payload));
      }
    },
    decode(rawPayload, callback) {
      if (rawPayload.constructor === ArrayBuffer) {
        return callback(this.binaryDecode(rawPayload));
      } else {
        let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
        return callback({ join_ref, ref, topic, event, payload });
      }
    },
    // private
    binaryEncode(message) {
      let { join_ref, ref, event, topic, payload } = message;
      let metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event.length;
      let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
      let view = new DataView(header);
      let offset = 0;
      view.setUint8(offset++, this.KINDS.push);
      view.setUint8(offset++, join_ref.length);
      view.setUint8(offset++, ref.length);
      view.setUint8(offset++, topic.length);
      view.setUint8(offset++, event.length);
      Array.from(join_ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(event, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      var combined = new Uint8Array(header.byteLength + payload.byteLength);
      combined.set(new Uint8Array(header), 0);
      combined.set(new Uint8Array(payload), header.byteLength);
      return combined.buffer;
    },
    binaryDecode(buffer) {
      let view = new DataView(buffer);
      let kind = view.getUint8(0);
      let decoder = new TextDecoder();
      switch (kind) {
        case this.KINDS.push:
          return this.decodePush(buffer, view, decoder);
        case this.KINDS.reply:
          return this.decodeReply(buffer, view, decoder);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(buffer, view, decoder);
      }
    },
    decodePush(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let topicSize = view.getUint8(2);
      let eventSize = view.getUint8(3);
      let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: joinRef, ref: null, topic, event, payload: data };
    },
    decodeReply(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let refSize = view.getUint8(2);
      let topicSize = view.getUint8(3);
      let eventSize = view.getUint8(4);
      let offset = this.HEADER_LENGTH + this.META_LENGTH;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let ref = decoder.decode(buffer.slice(offset, offset + refSize));
      offset = offset + refSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      let payload = { status: event, response: data };
      return { join_ref: joinRef, ref, topic, event: CHANNEL_EVENTS.reply, payload };
    },
    decodeBroadcast(buffer, view, decoder) {
      let topicSize = view.getUint8(1);
      let eventSize = view.getUint8(2);
      let offset = this.HEADER_LENGTH + 2;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: null, ref: null, topic, event, payload: data };
    }
  };
  var Socket = class {
    constructor(endPoint, opts = {}) {
      this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
      this.channels = [];
      this.sendBuffer = [];
      this.ref = 0;
      this.timeout = opts.timeout || DEFAULT_TIMEOUT;
      this.transport = opts.transport || global.WebSocket || LongPoll;
      this.primaryPassedHealthCheck = false;
      this.longPollFallbackMs = opts.longPollFallbackMs;
      this.fallbackTimer = null;
      this.sessionStore = opts.sessionStorage || global && global.sessionStorage;
      this.establishedConnections = 0;
      this.defaultEncoder = serializer_default.encode.bind(serializer_default);
      this.defaultDecoder = serializer_default.decode.bind(serializer_default);
      this.closeWasClean = false;
      this.binaryType = opts.binaryType || "arraybuffer";
      this.connectClock = 1;
      if (this.transport !== LongPoll) {
        this.encode = opts.encode || this.defaultEncoder;
        this.decode = opts.decode || this.defaultDecoder;
      } else {
        this.encode = this.defaultEncoder;
        this.decode = this.defaultDecoder;
      }
      let awaitingConnectionOnPageShow = null;
      if (phxWindow && phxWindow.addEventListener) {
        phxWindow.addEventListener("pagehide", (_e) => {
          if (this.conn) {
            this.disconnect();
            awaitingConnectionOnPageShow = this.connectClock;
          }
        });
        phxWindow.addEventListener("pageshow", (_e) => {
          if (awaitingConnectionOnPageShow === this.connectClock) {
            awaitingConnectionOnPageShow = null;
            this.connect();
          }
        });
      }
      this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
      this.rejoinAfterMs = (tries) => {
        if (opts.rejoinAfterMs) {
          return opts.rejoinAfterMs(tries);
        } else {
          return [1e3, 2e3, 5e3][tries - 1] || 1e4;
        }
      };
      this.reconnectAfterMs = (tries) => {
        if (opts.reconnectAfterMs) {
          return opts.reconnectAfterMs(tries);
        } else {
          return [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][tries - 1] || 5e3;
        }
      };
      this.logger = opts.logger || null;
      if (!this.logger && opts.debug) {
        this.logger = (kind, msg, data) => {
          console.log(`${kind}: ${msg}`, data);
        };
      }
      this.longpollerTimeout = opts.longpollerTimeout || 2e4;
      this.params = closure(opts.params || {});
      this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
      this.vsn = opts.vsn || DEFAULT_VSN;
      this.heartbeatTimeoutTimer = null;
      this.heartbeatTimer = null;
      this.pendingHeartbeatRef = null;
      this.reconnectTimer = new Timer(() => {
        this.teardown(() => this.connect());
      }, this.reconnectAfterMs);
    }
    /**
     * Returns the LongPoll transport reference
     */
    getLongPollTransport() {
      return LongPoll;
    }
    /**
     * Disconnects and replaces the active transport
     *
     * @param {Function} newTransport - The new transport class to instantiate
     *
     */
    replaceTransport(newTransport) {
      this.connectClock++;
      this.closeWasClean = true;
      clearTimeout(this.fallbackTimer);
      this.reconnectTimer.reset();
      if (this.conn) {
        this.conn.close();
        this.conn = null;
      }
      this.transport = newTransport;
    }
    /**
     * Returns the socket protocol
     *
     * @returns {string}
     */
    protocol() {
      return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    /**
     * The fully qualified socket url
     *
     * @returns {string}
     */
    endPointURL() {
      let uri = Ajax.appendParams(
        Ajax.appendParams(this.endPoint, this.params()),
        { vsn: this.vsn }
      );
      if (uri.charAt(0) !== "/") {
        return uri;
      }
      if (uri.charAt(1) === "/") {
        return `${this.protocol()}:${uri}`;
      }
      return `${this.protocol()}://${location.host}${uri}`;
    }
    /**
     * Disconnects the socket
     *
     * See https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes for valid status codes.
     *
     * @param {Function} callback - Optional callback which is called after socket is disconnected.
     * @param {integer} code - A status code for disconnection (Optional).
     * @param {string} reason - A textual description of the reason to disconnect. (Optional)
     */
    disconnect(callback, code, reason) {
      this.connectClock++;
      this.closeWasClean = true;
      clearTimeout(this.fallbackTimer);
      this.reconnectTimer.reset();
      this.teardown(callback, code, reason);
    }
    /**
     *
     * @param {Object} params - The params to send when connecting, for example `{user_id: userToken}`
     *
     * Passing params to connect is deprecated; pass them in the Socket constructor instead:
     * `new Socket("/socket", {params: {user_id: userToken}})`.
     */
    connect(params) {
      if (params) {
        console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
        this.params = closure(params);
      }
      if (this.conn) {
        return;
      }
      if (this.longPollFallbackMs && this.transport !== LongPoll) {
        this.connectWithFallback(LongPoll, this.longPollFallbackMs);
      } else {
        this.transportConnect();
      }
    }
    /**
     * Logs the message. Override `this.logger` for specialized logging. noops by default
     * @param {string} kind
     * @param {string} msg
     * @param {Object} data
     */
    log(kind, msg, data) {
      this.logger && this.logger(kind, msg, data);
    }
    /**
     * Returns true if a logger has been set on this socket.
     */
    hasLogger() {
      return this.logger !== null;
    }
    /**
     * Registers callbacks for connection open events
     *
     * @example socket.onOpen(function(){ console.info("the socket was opened") })
     *
     * @param {Function} callback
     */
    onOpen(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.open.push([ref, callback]);
      return ref;
    }
    /**
     * Registers callbacks for connection close events
     * @param {Function} callback
     */
    onClose(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.close.push([ref, callback]);
      return ref;
    }
    /**
     * Registers callbacks for connection error events
     *
     * @example socket.onError(function(error){ alert("An error occurred") })
     *
     * @param {Function} callback
     */
    onError(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.error.push([ref, callback]);
      return ref;
    }
    /**
     * Registers callbacks for connection message events
     * @param {Function} callback
     */
    onMessage(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.message.push([ref, callback]);
      return ref;
    }
    /**
     * Pings the server and invokes the callback with the RTT in milliseconds
     * @param {Function} callback
     *
     * Returns true if the ping was pushed or false if unable to be pushed.
     */
    ping(callback) {
      if (!this.isConnected()) {
        return false;
      }
      let ref = this.makeRef();
      let startTime = Date.now();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref });
      let onMsgRef = this.onMessage((msg) => {
        if (msg.ref === ref) {
          this.off([onMsgRef]);
          callback(Date.now() - startTime);
        }
      });
      return true;
    }
    /**
     * @private
     */
    transportConnect() {
      this.connectClock++;
      this.closeWasClean = false;
      this.conn = new this.transport(this.endPointURL());
      this.conn.binaryType = this.binaryType;
      this.conn.timeout = this.longpollerTimeout;
      this.conn.onopen = () => this.onConnOpen();
      this.conn.onerror = (error) => this.onConnError(error);
      this.conn.onmessage = (event) => this.onConnMessage(event);
      this.conn.onclose = (event) => this.onConnClose(event);
    }
    getSession(key) {
      return this.sessionStore && this.sessionStore.getItem(key);
    }
    storeSession(key, val) {
      this.sessionStore && this.sessionStore.setItem(key, val);
    }
    connectWithFallback(fallbackTransport, fallbackThreshold = 2500) {
      clearTimeout(this.fallbackTimer);
      let established = false;
      let primaryTransport = true;
      let openRef, errorRef;
      let fallback = (reason) => {
        this.log("transport", `falling back to ${fallbackTransport.name}...`, reason);
        this.off([openRef, errorRef]);
        primaryTransport = false;
        this.replaceTransport(fallbackTransport);
        this.transportConnect();
      };
      if (this.getSession(`phx:fallback:${fallbackTransport.name}`)) {
        return fallback("memorized");
      }
      this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
      errorRef = this.onError((reason) => {
        this.log("transport", "error", reason);
        if (primaryTransport && !established) {
          clearTimeout(this.fallbackTimer);
          fallback(reason);
        }
      });
      this.onOpen(() => {
        established = true;
        if (!primaryTransport) {
          if (!this.primaryPassedHealthCheck) {
            this.storeSession(`phx:fallback:${fallbackTransport.name}`, "true");
          }
          return this.log("transport", `established ${fallbackTransport.name} fallback`);
        }
        clearTimeout(this.fallbackTimer);
        this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
        this.ping((rtt) => {
          this.log("transport", "connected to primary after", rtt);
          this.primaryPassedHealthCheck = true;
          clearTimeout(this.fallbackTimer);
        });
      });
      this.transportConnect();
    }
    clearHeartbeats() {
      clearTimeout(this.heartbeatTimer);
      clearTimeout(this.heartbeatTimeoutTimer);
    }
    onConnOpen() {
      if (this.hasLogger())
        this.log("transport", `${this.transport.name} connected to ${this.endPointURL()}`);
      this.closeWasClean = false;
      this.establishedConnections++;
      this.flushSendBuffer();
      this.reconnectTimer.reset();
      this.resetHeartbeat();
      this.stateChangeCallbacks.open.forEach(([, callback]) => callback());
    }
    /**
     * @private
     */
    heartbeatTimeout() {
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        if (this.hasLogger()) {
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
        }
        this.triggerChanError();
        this.closeWasClean = false;
        this.teardown(() => this.reconnectTimer.scheduleTimeout(), WS_CLOSE_NORMAL, "heartbeat timeout");
      }
    }
    resetHeartbeat() {
      if (this.conn && this.conn.skipHeartbeat) {
        return;
      }
      this.pendingHeartbeatRef = null;
      this.clearHeartbeats();
      this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
    }
    teardown(callback, code, reason) {
      if (!this.conn) {
        return callback && callback();
      }
      this.waitForBufferDone(() => {
        if (this.conn) {
          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }
        }
        this.waitForSocketClosed(() => {
          if (this.conn) {
            this.conn.onopen = function() {
            };
            this.conn.onerror = function() {
            };
            this.conn.onmessage = function() {
            };
            this.conn.onclose = function() {
            };
            this.conn = null;
          }
          callback && callback();
        });
      });
    }
    waitForBufferDone(callback, tries = 1) {
      if (tries === 5 || !this.conn || !this.conn.bufferedAmount) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForBufferDone(callback, tries + 1);
      }, 150 * tries);
    }
    waitForSocketClosed(callback, tries = 1) {
      if (tries === 5 || !this.conn || this.conn.readyState === SOCKET_STATES.closed) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForSocketClosed(callback, tries + 1);
      }, 150 * tries);
    }
    onConnClose(event) {
      let closeCode = event && event.code;
      if (this.hasLogger())
        this.log("transport", "close", event);
      this.triggerChanError();
      this.clearHeartbeats();
      if (!this.closeWasClean && closeCode !== 1e3) {
        this.reconnectTimer.scheduleTimeout();
      }
      this.stateChangeCallbacks.close.forEach(([, callback]) => callback(event));
    }
    /**
     * @private
     */
    onConnError(error) {
      if (this.hasLogger())
        this.log("transport", error);
      let transportBefore = this.transport;
      let establishedBefore = this.establishedConnections;
      this.stateChangeCallbacks.error.forEach(([, callback]) => {
        callback(error, transportBefore, establishedBefore);
      });
      if (transportBefore === this.transport || establishedBefore > 0) {
        this.triggerChanError();
      }
    }
    /**
     * @private
     */
    triggerChanError() {
      this.channels.forEach((channel) => {
        if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
          channel.trigger(CHANNEL_EVENTS.error);
        }
      });
    }
    /**
     * @returns {string}
     */
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return "connecting";
        case SOCKET_STATES.open:
          return "open";
        case SOCKET_STATES.closing:
          return "closing";
        default:
          return "closed";
      }
    }
    /**
     * @returns {boolean}
     */
    isConnected() {
      return this.connectionState() === "open";
    }
    /**
     * @private
     *
     * @param {Channel}
     */
    remove(channel) {
      this.off(channel.stateChangeRefs);
      this.channels = this.channels.filter((c) => c !== channel);
    }
    /**
     * Removes `onOpen`, `onClose`, `onError,` and `onMessage` registrations.
     *
     * @param {refs} - list of refs returned by calls to
     *                 `onOpen`, `onClose`, `onError,` and `onMessage`
     */
    off(refs) {
      for (let key in this.stateChangeCallbacks) {
        this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref]) => {
          return refs.indexOf(ref) === -1;
        });
      }
    }
    /**
     * Initiates a new channel for the given topic
     *
     * @param {string} topic
     * @param {Object} chanParams - Parameters for the channel
     * @returns {Channel}
     */
    channel(topic, chanParams = {}) {
      let chan = new Channel(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
    /**
     * @param {Object} data
     */
    push(data) {
      if (this.hasLogger()) {
        let { topic, event, payload, ref, join_ref } = data;
        this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
      }
      if (this.isConnected()) {
        this.encode(data, (result) => this.conn.send(result));
      } else {
        this.sendBuffer.push(() => this.encode(data, (result) => this.conn.send(result)));
      }
    }
    /**
     * Return the next message ref, accounting for overflows
     * @returns {string}
     */
    makeRef() {
      let newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }
      return this.ref.toString();
    }
    sendHeartbeat() {
      if (this.pendingHeartbeatRef && !this.isConnected()) {
        return;
      }
      this.pendingHeartbeatRef = this.makeRef();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
      this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
    }
    flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach((callback) => callback());
        this.sendBuffer = [];
      }
    }
    onConnMessage(rawMessage) {
      this.decode(rawMessage.data, (msg) => {
        let { topic, event, payload, ref, join_ref } = msg;
        if (ref && ref === this.pendingHeartbeatRef) {
          this.clearHeartbeats();
          this.pendingHeartbeatRef = null;
          this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        if (this.hasLogger())
          this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
        for (let i2 = 0; i2 < this.channels.length; i2++) {
          const channel = this.channels[i2];
          if (!channel.isMember(topic, event, payload, join_ref)) {
            continue;
          }
          channel.trigger(event, payload, ref, join_ref);
        }
        for (let i2 = 0; i2 < this.stateChangeCallbacks.message.length; i2++) {
          let [, callback] = this.stateChangeCallbacks.message[i2];
          callback(msg);
        }
      });
    }
    leaveOpenTopic(topic) {
      let dupChannel = this.channels.find((c) => c.topic === topic && (c.isJoined() || c.isJoining()));
      if (dupChannel) {
        if (this.hasLogger())
          this.log("transport", `leaving duplicate topic "${topic}"`);
        dupChannel.leave();
      }
    }
  };

  // ../deps/phoenix_live_view/priv/static/phoenix_live_view.esm.js
  var CONSECUTIVE_RELOADS = "consecutive-reloads";
  var MAX_RELOADS = 10;
  var RELOAD_JITTER_MIN = 5e3;
  var RELOAD_JITTER_MAX = 1e4;
  var FAILSAFE_JITTER = 3e4;
  var PHX_EVENT_CLASSES = [
    "phx-click-loading",
    "phx-change-loading",
    "phx-submit-loading",
    "phx-keydown-loading",
    "phx-keyup-loading",
    "phx-blur-loading",
    "phx-focus-loading",
    "phx-hook-loading"
  ];
  var PHX_COMPONENT = "data-phx-component";
  var PHX_LIVE_LINK = "data-phx-link";
  var PHX_TRACK_STATIC = "track-static";
  var PHX_LINK_STATE = "data-phx-link-state";
  var PHX_REF_LOADING = "data-phx-ref-loading";
  var PHX_REF_SRC = "data-phx-ref-src";
  var PHX_REF_LOCK = "data-phx-ref-lock";
  var PHX_TRACK_UPLOADS = "track-uploads";
  var PHX_UPLOAD_REF = "data-phx-upload-ref";
  var PHX_PREFLIGHTED_REFS = "data-phx-preflighted-refs";
  var PHX_DONE_REFS = "data-phx-done-refs";
  var PHX_DROP_TARGET = "drop-target";
  var PHX_ACTIVE_ENTRY_REFS = "data-phx-active-refs";
  var PHX_LIVE_FILE_UPDATED = "phx:live-file:updated";
  var PHX_SKIP = "data-phx-skip";
  var PHX_MAGIC_ID = "data-phx-id";
  var PHX_PRUNE = "data-phx-prune";
  var PHX_CONNECTED_CLASS = "phx-connected";
  var PHX_LOADING_CLASS = "phx-loading";
  var PHX_ERROR_CLASS = "phx-error";
  var PHX_CLIENT_ERROR_CLASS = "phx-client-error";
  var PHX_SERVER_ERROR_CLASS = "phx-server-error";
  var PHX_PARENT_ID = "data-phx-parent-id";
  var PHX_MAIN = "data-phx-main";
  var PHX_ROOT_ID = "data-phx-root-id";
  var PHX_VIEWPORT_TOP = "viewport-top";
  var PHX_VIEWPORT_BOTTOM = "viewport-bottom";
  var PHX_TRIGGER_ACTION = "trigger-action";
  var PHX_HAS_FOCUSED = "phx-has-focused";
  var FOCUSABLE_INPUTS = ["text", "textarea", "number", "email", "password", "search", "tel", "url", "date", "time", "datetime-local", "color", "range"];
  var CHECKABLE_INPUTS = ["checkbox", "radio"];
  var PHX_HAS_SUBMITTED = "phx-has-submitted";
  var PHX_SESSION = "data-phx-session";
  var PHX_VIEW_SELECTOR = `[${PHX_SESSION}]`;
  var PHX_STICKY = "data-phx-sticky";
  var PHX_STATIC = "data-phx-static";
  var PHX_READONLY = "data-phx-readonly";
  var PHX_DISABLED = "data-phx-disabled";
  var PHX_DISABLE_WITH = "disable-with";
  var PHX_DISABLE_WITH_RESTORE = "data-phx-disable-with-restore";
  var PHX_HOOK = "hook";
  var PHX_DEBOUNCE = "debounce";
  var PHX_THROTTLE = "throttle";
  var PHX_UPDATE = "update";
  var PHX_STREAM = "stream";
  var PHX_STREAM_REF = "data-phx-stream";
  var PHX_KEY = "key";
  var PHX_PRIVATE = "phxPrivate";
  var PHX_AUTO_RECOVER = "auto-recover";
  var PHX_LV_DEBUG = "phx:live-socket:debug";
  var PHX_LV_PROFILE = "phx:live-socket:profiling";
  var PHX_LV_LATENCY_SIM = "phx:live-socket:latency-sim";
  var PHX_LV_HISTORY_POSITION = "phx:nav-history-position";
  var PHX_PROGRESS = "progress";
  var PHX_MOUNTED = "mounted";
  var PHX_RELOAD_STATUS = "__phoenix_reload_status__";
  var LOADER_TIMEOUT = 1;
  var MAX_CHILD_JOIN_ATTEMPTS = 3;
  var BEFORE_UNLOAD_LOADER_TIMEOUT = 200;
  var BINDING_PREFIX = "phx-";
  var PUSH_TIMEOUT = 3e4;
  var DEBOUNCE_TRIGGER = "debounce-trigger";
  var THROTTLED = "throttled";
  var DEBOUNCE_PREV_KEY = "debounce-prev-key";
  var DEFAULTS = {
    debounce: 300,
    throttle: 300
  };
  var PHX_PENDING_ATTRS = [PHX_REF_LOADING, PHX_REF_SRC, PHX_REF_LOCK];
  var DYNAMICS = "d";
  var STATIC = "s";
  var ROOT = "r";
  var COMPONENTS = "c";
  var EVENTS = "e";
  var REPLY = "r";
  var TITLE = "t";
  var TEMPLATES = "p";
  var STREAM = "stream";
  var EntryUploader = class {
    constructor(entry, config, liveSocket2) {
      let { chunk_size, chunk_timeout } = config;
      this.liveSocket = liveSocket2;
      this.entry = entry;
      this.offset = 0;
      this.chunkSize = chunk_size;
      this.chunkTimeout = chunk_timeout;
      this.chunkTimer = null;
      this.errored = false;
      this.uploadChannel = liveSocket2.channel(`lvu:${entry.ref}`, { token: entry.metadata() });
    }
    error(reason) {
      if (this.errored) {
        return;
      }
      this.uploadChannel.leave();
      this.errored = true;
      clearTimeout(this.chunkTimer);
      this.entry.error(reason);
    }
    upload() {
      this.uploadChannel.onError((reason) => this.error(reason));
      this.uploadChannel.join().receive("ok", (_data) => this.readNextChunk()).receive("error", (reason) => this.error(reason));
    }
    isDone() {
      return this.offset >= this.entry.file.size;
    }
    readNextChunk() {
      let reader = new window.FileReader();
      let blob = this.entry.file.slice(this.offset, this.chunkSize + this.offset);
      reader.onload = (e) => {
        if (e.target.error === null) {
          this.offset += e.target.result.byteLength;
          this.pushChunk(e.target.result);
        } else {
          return logError("Read error: " + e.target.error);
        }
      };
      reader.readAsArrayBuffer(blob);
    }
    pushChunk(chunk) {
      if (!this.uploadChannel.isJoined()) {
        return;
      }
      this.uploadChannel.push("chunk", chunk, this.chunkTimeout).receive("ok", () => {
        this.entry.progress(this.offset / this.entry.file.size * 100);
        if (!this.isDone()) {
          this.chunkTimer = setTimeout(() => this.readNextChunk(), this.liveSocket.getLatencySim() || 0);
        }
      }).receive("error", ({ reason }) => this.error(reason));
    }
  };
  var logError = (msg, obj) => console.error && console.error(msg, obj);
  var isCid = (cid) => {
    let type = typeof cid;
    return type === "number" || type === "string" && /^(0|[1-9]\d*)$/.test(cid);
  };
  function detectDuplicateIds() {
    let ids = /* @__PURE__ */ new Set();
    let elems = document.querySelectorAll("*[id]");
    for (let i2 = 0, len = elems.length; i2 < len; i2++) {
      if (ids.has(elems[i2].id)) {
        console.error(`Multiple IDs detected: ${elems[i2].id}. Ensure unique element ids.`);
      } else {
        ids.add(elems[i2].id);
      }
    }
  }
  var debug = (view, kind, msg, obj) => {
    if (view.liveSocket.isDebugEnabled()) {
      console.log(`${view.id} ${kind}: ${msg} - `, obj);
    }
  };
  var closure2 = (val) => typeof val === "function" ? val : function() {
    return val;
  };
  var clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
  var closestPhxBinding = (el, binding, borderEl) => {
    do {
      if (el.matches(`[${binding}]`) && !el.disabled) {
        return el;
      }
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1 && !(borderEl && borderEl.isSameNode(el) || el.matches(PHX_VIEW_SELECTOR)));
    return null;
  };
  var isObject = (obj) => {
    return obj !== null && typeof obj === "object" && !(obj instanceof Array);
  };
  var isEqualObj = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
  var isEmpty = (obj) => {
    for (let x in obj) {
      return false;
    }
    return true;
  };
  var maybe = (el, callback) => el && callback(el);
  var channelUploader = function(entries, onError, resp, liveSocket2) {
    entries.forEach((entry) => {
      let entryUploader = new EntryUploader(entry, resp.config, liveSocket2);
      entryUploader.upload();
    });
  };
  var Browser = {
    canPushState() {
      return typeof history.pushState !== "undefined";
    },
    dropLocal(localStorage, namespace, subkey) {
      return localStorage.removeItem(this.localKey(namespace, subkey));
    },
    updateLocal(localStorage, namespace, subkey, initial, func) {
      let current = this.getLocal(localStorage, namespace, subkey);
      let key = this.localKey(namespace, subkey);
      let newVal = current === null ? initial : func(current);
      localStorage.setItem(key, JSON.stringify(newVal));
      return newVal;
    },
    getLocal(localStorage, namespace, subkey) {
      return JSON.parse(localStorage.getItem(this.localKey(namespace, subkey)));
    },
    updateCurrentState(callback) {
      if (!this.canPushState()) {
        return;
      }
      history.replaceState(callback(history.state || {}), "", window.location.href);
    },
    pushState(kind, meta, to) {
      if (this.canPushState()) {
        if (to !== window.location.href) {
          if (meta.type == "redirect" && meta.scroll) {
            let currentState = history.state || {};
            currentState.scroll = meta.scroll;
            history.replaceState(currentState, "", window.location.href);
          }
          delete meta.scroll;
          history[kind + "State"](meta, "", to || null);
          window.requestAnimationFrame(() => {
            let hashEl = this.getHashTargetEl(window.location.hash);
            if (hashEl) {
              hashEl.scrollIntoView();
            } else if (meta.type === "redirect") {
              window.scroll(0, 0);
            }
          });
        }
      } else {
        this.redirect(to);
      }
    },
    setCookie(name, value, maxAgeSeconds) {
      let expires = typeof maxAgeSeconds === "number" ? ` max-age=${maxAgeSeconds};` : "";
      document.cookie = `${name}=${value};${expires} path=/`;
    },
    getCookie(name) {
      return document.cookie.replace(new RegExp(`(?:(?:^|.*;s*)${name}s*=s*([^;]*).*$)|^.*$`), "$1");
    },
    deleteCookie(name) {
      document.cookie = `${name}=; max-age=-1; path=/`;
    },
    redirect(toURL, flash) {
      if (flash) {
        this.setCookie("__phoenix_flash__", flash, 60);
      }
      window.location = toURL;
    },
    localKey(namespace, subkey) {
      return `${namespace}-${subkey}`;
    },
    getHashTargetEl(maybeHash) {
      let hash = maybeHash.toString().substring(1);
      if (hash === "") {
        return;
      }
      return document.getElementById(hash) || document.querySelector(`a[name="${hash}"]`);
    }
  };
  var browser_default = Browser;
  var DOM = {
    byId(id) {
      return document.getElementById(id) || logError(`no id found for ${id}`);
    },
    removeClass(el, className) {
      el.classList.remove(className);
      if (el.classList.length === 0) {
        el.removeAttribute("class");
      }
    },
    all(node, query, callback) {
      if (!node) {
        return [];
      }
      let array = Array.from(node.querySelectorAll(query));
      return callback ? array.forEach(callback) : array;
    },
    childNodeLength(html) {
      let template = document.createElement("template");
      template.innerHTML = html;
      return template.content.childElementCount;
    },
    isUploadInput(el) {
      return el.type === "file" && el.getAttribute(PHX_UPLOAD_REF) !== null;
    },
    isAutoUpload(inputEl) {
      return inputEl.hasAttribute("data-phx-auto-upload");
    },
    findUploadInputs(node) {
      const formId = node.id;
      const inputsOutsideForm = this.all(document, `input[type="file"][${PHX_UPLOAD_REF}][form="${formId}"]`);
      return this.all(node, `input[type="file"][${PHX_UPLOAD_REF}]`).concat(inputsOutsideForm);
    },
    findComponentNodeList(node, cid) {
      return this.filterWithinSameLiveView(this.all(node, `[${PHX_COMPONENT}="${cid}"]`), node);
    },
    isPhxDestroyed(node) {
      return node.id && DOM.private(node, "destroyed") ? true : false;
    },
    wantsNewTab(e) {
      let wantsNewTab = e.ctrlKey || e.shiftKey || e.metaKey || e.button && e.button === 1;
      let isDownload = e.target instanceof HTMLAnchorElement && e.target.hasAttribute("download");
      let isTargetBlank = e.target.hasAttribute("target") && e.target.getAttribute("target").toLowerCase() === "_blank";
      let isTargetNamedTab = e.target.hasAttribute("target") && !e.target.getAttribute("target").startsWith("_");
      return wantsNewTab || isTargetBlank || isDownload || isTargetNamedTab;
    },
    isUnloadableFormSubmit(e) {
      let isDialogSubmit = e.target && e.target.getAttribute("method") === "dialog" || e.submitter && e.submitter.getAttribute("formmethod") === "dialog";
      if (isDialogSubmit) {
        return false;
      } else {
        return !e.defaultPrevented && !this.wantsNewTab(e);
      }
    },
    isNewPageClick(e, currentLocation) {
      let href = e.target instanceof HTMLAnchorElement ? e.target.getAttribute("href") : null;
      let url;
      if (e.defaultPrevented || href === null || this.wantsNewTab(e)) {
        return false;
      }
      if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        return false;
      }
      if (e.target.isContentEditable) {
        return false;
      }
      try {
        url = new URL(href);
      } catch (e2) {
        try {
          url = new URL(href, currentLocation);
        } catch (e3) {
          return true;
        }
      }
      if (url.host === currentLocation.host && url.protocol === currentLocation.protocol) {
        if (url.pathname === currentLocation.pathname && url.search === currentLocation.search) {
          return url.hash === "" && !url.href.endsWith("#");
        }
      }
      return url.protocol.startsWith("http");
    },
    markPhxChildDestroyed(el) {
      if (this.isPhxChild(el)) {
        el.setAttribute(PHX_SESSION, "");
      }
      this.putPrivate(el, "destroyed", true);
    },
    findPhxChildrenInFragment(html, parentId) {
      let template = document.createElement("template");
      template.innerHTML = html;
      return this.findPhxChildren(template.content, parentId);
    },
    isIgnored(el, phxUpdate) {
      return (el.getAttribute(phxUpdate) || el.getAttribute("data-phx-update")) === "ignore";
    },
    isPhxUpdate(el, phxUpdate, updateTypes) {
      return el.getAttribute && updateTypes.indexOf(el.getAttribute(phxUpdate)) >= 0;
    },
    findPhxSticky(el) {
      return this.all(el, `[${PHX_STICKY}]`);
    },
    findPhxChildren(el, parentId) {
      return this.all(el, `${PHX_VIEW_SELECTOR}[${PHX_PARENT_ID}="${parentId}"]`);
    },
    findExistingParentCIDs(node, cids) {
      let parentCids = /* @__PURE__ */ new Set();
      let childrenCids = /* @__PURE__ */ new Set();
      cids.forEach((cid) => {
        this.filterWithinSameLiveView(this.all(node, `[${PHX_COMPONENT}="${cid}"]`), node).forEach((parent) => {
          parentCids.add(cid);
          this.all(parent, `[${PHX_COMPONENT}]`).map((el) => parseInt(el.getAttribute(PHX_COMPONENT))).forEach((childCID) => childrenCids.add(childCID));
        });
      });
      childrenCids.forEach((childCid) => parentCids.delete(childCid));
      return parentCids;
    },
    filterWithinSameLiveView(nodes, parent) {
      if (parent.querySelector(PHX_VIEW_SELECTOR)) {
        return nodes.filter((el) => this.withinSameLiveView(el, parent));
      } else {
        return nodes;
      }
    },
    withinSameLiveView(node, parent) {
      while (node = node.parentNode) {
        if (node.isSameNode(parent)) {
          return true;
        }
        if (node.getAttribute(PHX_SESSION) !== null) {
          return false;
        }
      }
    },
    private(el, key) {
      return el[PHX_PRIVATE] && el[PHX_PRIVATE][key];
    },
    deletePrivate(el, key) {
      el[PHX_PRIVATE] && delete el[PHX_PRIVATE][key];
    },
    putPrivate(el, key, value) {
      if (!el[PHX_PRIVATE]) {
        el[PHX_PRIVATE] = {};
      }
      el[PHX_PRIVATE][key] = value;
    },
    updatePrivate(el, key, defaultVal, updateFunc) {
      let existing = this.private(el, key);
      if (existing === void 0) {
        this.putPrivate(el, key, updateFunc(defaultVal));
      } else {
        this.putPrivate(el, key, updateFunc(existing));
      }
    },
    syncPendingAttrs(fromEl, toEl) {
      if (!fromEl.hasAttribute(PHX_REF_SRC)) {
        return;
      }
      PHX_EVENT_CLASSES.forEach((className) => {
        fromEl.classList.contains(className) && toEl.classList.add(className);
      });
      PHX_PENDING_ATTRS.filter((attr) => fromEl.hasAttribute(attr)).forEach((attr) => {
        toEl.setAttribute(attr, fromEl.getAttribute(attr));
      });
    },
    copyPrivates(target, source) {
      if (source[PHX_PRIVATE]) {
        target[PHX_PRIVATE] = source[PHX_PRIVATE];
      }
    },
    putTitle(str) {
      let titleEl = document.querySelector("title");
      if (titleEl) {
        let { prefix, suffix, default: defaultTitle } = titleEl.dataset;
        let isEmpty2 = typeof str !== "string" || str.trim() === "";
        if (isEmpty2 && typeof defaultTitle !== "string") {
          return;
        }
        let inner = isEmpty2 ? defaultTitle : str;
        document.title = `${prefix || ""}${inner || ""}${suffix || ""}`;
      } else {
        document.title = str;
      }
    },
    debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, asyncFilter, callback) {
      let debounce = el.getAttribute(phxDebounce);
      let throttle = el.getAttribute(phxThrottle);
      if (debounce === "") {
        debounce = defaultDebounce;
      }
      if (throttle === "") {
        throttle = defaultThrottle;
      }
      let value = debounce || throttle;
      switch (value) {
        case null:
          return callback();
        case "blur":
          if (this.once(el, "debounce-blur")) {
            el.addEventListener("blur", () => {
              if (asyncFilter()) {
                callback();
              }
            });
          }
          return;
        default:
          let timeout = parseInt(value);
          let trigger = () => throttle ? this.deletePrivate(el, THROTTLED) : callback();
          let currentCycle = this.incCycle(el, DEBOUNCE_TRIGGER, trigger);
          if (isNaN(timeout)) {
            return logError(`invalid throttle/debounce value: ${value}`);
          }
          if (throttle) {
            let newKeyDown = false;
            if (event.type === "keydown") {
              let prevKey = this.private(el, DEBOUNCE_PREV_KEY);
              this.putPrivate(el, DEBOUNCE_PREV_KEY, event.key);
              newKeyDown = prevKey !== event.key;
            }
            if (!newKeyDown && this.private(el, THROTTLED)) {
              return false;
            } else {
              callback();
              const t = setTimeout(() => {
                if (asyncFilter()) {
                  this.triggerCycle(el, DEBOUNCE_TRIGGER);
                }
              }, timeout);
              this.putPrivate(el, THROTTLED, t);
            }
          } else {
            setTimeout(() => {
              if (asyncFilter()) {
                this.triggerCycle(el, DEBOUNCE_TRIGGER, currentCycle);
              }
            }, timeout);
          }
          let form = el.form;
          if (form && this.once(form, "bind-debounce")) {
            form.addEventListener("submit", () => {
              Array.from(new FormData(form).entries(), ([name]) => {
                let input = form.querySelector(`[name="${name}"]`);
                this.incCycle(input, DEBOUNCE_TRIGGER);
                this.deletePrivate(input, THROTTLED);
              });
            });
          }
          if (this.once(el, "bind-debounce")) {
            el.addEventListener("blur", () => {
              clearTimeout(this.private(el, THROTTLED));
              this.triggerCycle(el, DEBOUNCE_TRIGGER);
            });
          }
      }
    },
    triggerCycle(el, key, currentCycle) {
      let [cycle, trigger] = this.private(el, key);
      if (!currentCycle) {
        currentCycle = cycle;
      }
      if (currentCycle === cycle) {
        this.incCycle(el, key);
        trigger();
      }
    },
    once(el, key) {
      if (this.private(el, key) === true) {
        return false;
      }
      this.putPrivate(el, key, true);
      return true;
    },
    incCycle(el, key, trigger = function() {
    }) {
      let [currentCycle] = this.private(el, key) || [0, trigger];
      currentCycle++;
      this.putPrivate(el, key, [currentCycle, trigger]);
      return currentCycle;
    },
    // maintains or adds privately used hook information
    // fromEl and toEl can be the same element in the case of a newly added node
    // fromEl and toEl can be any HTML node type, so we need to check if it's an element node
    maintainPrivateHooks(fromEl, toEl, phxViewportTop, phxViewportBottom) {
      if (fromEl.hasAttribute && fromEl.hasAttribute("data-phx-hook") && !toEl.hasAttribute("data-phx-hook")) {
        toEl.setAttribute("data-phx-hook", fromEl.getAttribute("data-phx-hook"));
      }
      if (toEl.hasAttribute && (toEl.hasAttribute(phxViewportTop) || toEl.hasAttribute(phxViewportBottom))) {
        toEl.setAttribute("data-phx-hook", "Phoenix.InfiniteScroll");
      }
    },
    putCustomElHook(el, hook) {
      if (el.isConnected) {
        el.setAttribute("data-phx-hook", "");
      } else {
        console.error(`
        hook attached to non-connected DOM element
        ensure you are calling createHook within your connectedCallback. ${el.outerHTML}
      `);
      }
      this.putPrivate(el, "custom-el-hook", hook);
    },
    getCustomElHook(el) {
      return this.private(el, "custom-el-hook");
    },
    isUsedInput(el) {
      return el.nodeType === Node.ELEMENT_NODE && (this.private(el, PHX_HAS_FOCUSED) || this.private(el, PHX_HAS_SUBMITTED));
    },
    resetForm(form) {
      Array.from(form.elements).forEach((input) => {
        this.deletePrivate(input, PHX_HAS_FOCUSED);
        this.deletePrivate(input, PHX_HAS_SUBMITTED);
      });
    },
    isPhxChild(node) {
      return node.getAttribute && node.getAttribute(PHX_PARENT_ID);
    },
    isPhxSticky(node) {
      return node.getAttribute && node.getAttribute(PHX_STICKY) !== null;
    },
    isChildOfAny(el, parents) {
      return !!parents.find((parent) => parent.contains(el));
    },
    firstPhxChild(el) {
      return this.isPhxChild(el) ? el : this.all(el, `[${PHX_PARENT_ID}]`)[0];
    },
    dispatchEvent(target, name, opts = {}) {
      let defaultBubble = true;
      let isUploadTarget = target.nodeName === "INPUT" && target.type === "file";
      if (isUploadTarget && name === "click") {
        defaultBubble = false;
      }
      let bubbles = opts.bubbles === void 0 ? defaultBubble : !!opts.bubbles;
      let eventOpts = { bubbles, cancelable: true, detail: opts.detail || {} };
      let event = name === "click" ? new MouseEvent("click", eventOpts) : new CustomEvent(name, eventOpts);
      target.dispatchEvent(event);
    },
    cloneNode(node, html) {
      if (typeof html === "undefined") {
        return node.cloneNode(true);
      } else {
        let cloned = node.cloneNode(false);
        cloned.innerHTML = html;
        return cloned;
      }
    },
    // merge attributes from source to target
    // if an element is ignored, we only merge data attributes
    // including removing data attributes that are no longer in the source
    mergeAttrs(target, source, opts = {}) {
      let exclude = new Set(opts.exclude || []);
      let isIgnored = opts.isIgnored;
      let sourceAttrs = source.attributes;
      for (let i2 = sourceAttrs.length - 1; i2 >= 0; i2--) {
        let name = sourceAttrs[i2].name;
        if (!exclude.has(name)) {
          const sourceValue = source.getAttribute(name);
          if (target.getAttribute(name) !== sourceValue && (!isIgnored || isIgnored && name.startsWith("data-"))) {
            target.setAttribute(name, sourceValue);
          }
        } else {
          if (name === "value" && target.value === source.value) {
            target.setAttribute("value", source.getAttribute(name));
          }
        }
      }
      let targetAttrs = target.attributes;
      for (let i2 = targetAttrs.length - 1; i2 >= 0; i2--) {
        let name = targetAttrs[i2].name;
        if (isIgnored) {
          if (name.startsWith("data-") && !source.hasAttribute(name) && !PHX_PENDING_ATTRS.includes(name)) {
            target.removeAttribute(name);
          }
        } else {
          if (!source.hasAttribute(name)) {
            target.removeAttribute(name);
          }
        }
      }
    },
    mergeFocusedInput(target, source) {
      if (!(target instanceof HTMLSelectElement)) {
        DOM.mergeAttrs(target, source, { exclude: ["value"] });
      }
      if (source.readOnly) {
        target.setAttribute("readonly", true);
      } else {
        target.removeAttribute("readonly");
      }
    },
    hasSelectionRange(el) {
      return el.setSelectionRange && (el.type === "text" || el.type === "textarea");
    },
    restoreFocus(focused, selectionStart, selectionEnd) {
      if (focused instanceof HTMLSelectElement) {
        focused.focus();
      }
      if (!DOM.isTextualInput(focused)) {
        return;
      }
      let wasFocused = focused.matches(":focus");
      if (!wasFocused) {
        focused.focus();
      }
      if (this.hasSelectionRange(focused)) {
        focused.setSelectionRange(selectionStart, selectionEnd);
      }
    },
    isFormInput(el) {
      return /^(?:input|select|textarea)$/i.test(el.tagName) && el.type !== "button";
    },
    syncAttrsToProps(el) {
      if (el instanceof HTMLInputElement && CHECKABLE_INPUTS.indexOf(el.type.toLocaleLowerCase()) >= 0) {
        el.checked = el.getAttribute("checked") !== null;
      }
    },
    isTextualInput(el) {
      return FOCUSABLE_INPUTS.indexOf(el.type) >= 0;
    },
    isNowTriggerFormExternal(el, phxTriggerExternal) {
      return el.getAttribute && el.getAttribute(phxTriggerExternal) !== null;
    },
    cleanChildNodes(container, phxUpdate) {
      if (DOM.isPhxUpdate(container, phxUpdate, ["append", "prepend"])) {
        let toRemove = [];
        container.childNodes.forEach((childNode) => {
          if (!childNode.id) {
            let isEmptyTextNode = childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue.trim() === "";
            if (!isEmptyTextNode && childNode.nodeType !== Node.COMMENT_NODE) {
              logError(`only HTML element tags with an id are allowed inside containers with phx-update.

removing illegal node: "${(childNode.outerHTML || childNode.nodeValue).trim()}"

`);
            }
            toRemove.push(childNode);
          }
        });
        toRemove.forEach((childNode) => childNode.remove());
      }
    },
    replaceRootContainer(container, tagName, attrs) {
      let retainedAttrs = /* @__PURE__ */ new Set(["id", PHX_SESSION, PHX_STATIC, PHX_MAIN, PHX_ROOT_ID]);
      if (container.tagName.toLowerCase() === tagName.toLowerCase()) {
        Array.from(container.attributes).filter((attr) => !retainedAttrs.has(attr.name.toLowerCase())).forEach((attr) => container.removeAttribute(attr.name));
        Object.keys(attrs).filter((name) => !retainedAttrs.has(name.toLowerCase())).forEach((attr) => container.setAttribute(attr, attrs[attr]));
        return container;
      } else {
        let newContainer = document.createElement(tagName);
        Object.keys(attrs).forEach((attr) => newContainer.setAttribute(attr, attrs[attr]));
        retainedAttrs.forEach((attr) => newContainer.setAttribute(attr, container.getAttribute(attr)));
        newContainer.innerHTML = container.innerHTML;
        container.replaceWith(newContainer);
        return newContainer;
      }
    },
    getSticky(el, name, defaultVal) {
      let op = (DOM.private(el, "sticky") || []).find(([existingName]) => name === existingName);
      if (op) {
        let [_name, _op, stashedResult] = op;
        return stashedResult;
      } else {
        return typeof defaultVal === "function" ? defaultVal() : defaultVal;
      }
    },
    deleteSticky(el, name) {
      this.updatePrivate(el, "sticky", [], (ops) => {
        return ops.filter(([existingName, _]) => existingName !== name);
      });
    },
    putSticky(el, name, op) {
      let stashedResult = op(el);
      this.updatePrivate(el, "sticky", [], (ops) => {
        let existingIndex = ops.findIndex(([existingName]) => name === existingName);
        if (existingIndex >= 0) {
          ops[existingIndex] = [name, op, stashedResult];
        } else {
          ops.push([name, op, stashedResult]);
        }
        return ops;
      });
    },
    applyStickyOperations(el) {
      let ops = DOM.private(el, "sticky");
      if (!ops) {
        return;
      }
      ops.forEach(([name, op, _stashed]) => this.putSticky(el, name, op));
    }
  };
  var dom_default = DOM;
  var UploadEntry = class {
    static isActive(fileEl, file) {
      let isNew = file._phxRef === void 0;
      let activeRefs = fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      let isActive = activeRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return file.size > 0 && (isNew || isActive);
    }
    static isPreflighted(fileEl, file) {
      let preflightedRefs = fileEl.getAttribute(PHX_PREFLIGHTED_REFS).split(",");
      let isPreflighted = preflightedRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return isPreflighted && this.isActive(fileEl, file);
    }
    static isPreflightInProgress(file) {
      return file._preflightInProgress === true;
    }
    static markPreflightInProgress(file) {
      file._preflightInProgress = true;
    }
    constructor(fileEl, file, view, autoUpload) {
      this.ref = LiveUploader.genFileRef(file);
      this.fileEl = fileEl;
      this.file = file;
      this.view = view;
      this.meta = null;
      this._isCancelled = false;
      this._isDone = false;
      this._progress = 0;
      this._lastProgressSent = -1;
      this._onDone = function() {
      };
      this._onElUpdated = this.onElUpdated.bind(this);
      this.fileEl.addEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
      this.autoUpload = autoUpload;
    }
    metadata() {
      return this.meta;
    }
    progress(progress) {
      this._progress = Math.floor(progress);
      if (this._progress > this._lastProgressSent) {
        if (this._progress >= 100) {
          this._progress = 100;
          this._lastProgressSent = 100;
          this._isDone = true;
          this.view.pushFileProgress(this.fileEl, this.ref, 100, () => {
            LiveUploader.untrackFile(this.fileEl, this.file);
            this._onDone();
          });
        } else {
          this._lastProgressSent = this._progress;
          this.view.pushFileProgress(this.fileEl, this.ref, this._progress);
        }
      }
    }
    isCancelled() {
      return this._isCancelled;
    }
    cancel() {
      this.file._preflightInProgress = false;
      this._isCancelled = true;
      this._isDone = true;
      this._onDone();
    }
    isDone() {
      return this._isDone;
    }
    error(reason = "failed") {
      this.fileEl.removeEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
      this.view.pushFileProgress(this.fileEl, this.ref, { error: reason });
      if (!this.isAutoUpload()) {
        LiveUploader.clearFiles(this.fileEl);
      }
    }
    isAutoUpload() {
      return this.autoUpload;
    }
    //private
    onDone(callback) {
      this._onDone = () => {
        this.fileEl.removeEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
        callback();
      };
    }
    onElUpdated() {
      let activeRefs = this.fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      if (activeRefs.indexOf(this.ref) === -1) {
        LiveUploader.untrackFile(this.fileEl, this.file);
        this.cancel();
      }
    }
    toPreflightPayload() {
      return {
        last_modified: this.file.lastModified,
        name: this.file.name,
        relative_path: this.file.webkitRelativePath,
        size: this.file.size,
        type: this.file.type,
        ref: this.ref,
        meta: typeof this.file.meta === "function" ? this.file.meta() : void 0
      };
    }
    uploader(uploaders) {
      if (this.meta.uploader) {
        let callback = uploaders[this.meta.uploader] || logError(`no uploader configured for ${this.meta.uploader}`);
        return { name: this.meta.uploader, callback };
      } else {
        return { name: "channel", callback: channelUploader };
      }
    }
    zipPostFlight(resp) {
      this.meta = resp.entries[this.ref];
      if (!this.meta) {
        logError(`no preflight upload response returned with ref ${this.ref}`, { input: this.fileEl, response: resp });
      }
    }
  };
  var liveUploaderFileRef = 0;
  var LiveUploader = class _LiveUploader {
    static genFileRef(file) {
      let ref = file._phxRef;
      if (ref !== void 0) {
        return ref;
      } else {
        file._phxRef = (liveUploaderFileRef++).toString();
        return file._phxRef;
      }
    }
    static getEntryDataURL(inputEl, ref, callback) {
      let file = this.activeFiles(inputEl).find((file2) => this.genFileRef(file2) === ref);
      callback(URL.createObjectURL(file));
    }
    static hasUploadsInProgress(formEl) {
      let active = 0;
      dom_default.findUploadInputs(formEl).forEach((input) => {
        if (input.getAttribute(PHX_PREFLIGHTED_REFS) !== input.getAttribute(PHX_DONE_REFS)) {
          active++;
        }
      });
      return active > 0;
    }
    static serializeUploads(inputEl) {
      let files = this.activeFiles(inputEl);
      let fileData = {};
      files.forEach((file) => {
        let entry = { path: inputEl.name };
        let uploadRef = inputEl.getAttribute(PHX_UPLOAD_REF);
        fileData[uploadRef] = fileData[uploadRef] || [];
        entry.ref = this.genFileRef(file);
        entry.last_modified = file.lastModified;
        entry.name = file.name || entry.ref;
        entry.relative_path = file.webkitRelativePath;
        entry.type = file.type;
        entry.size = file.size;
        if (typeof file.meta === "function") {
          entry.meta = file.meta();
        }
        fileData[uploadRef].push(entry);
      });
      return fileData;
    }
    static clearFiles(inputEl) {
      inputEl.value = null;
      inputEl.removeAttribute(PHX_UPLOAD_REF);
      dom_default.putPrivate(inputEl, "files", []);
    }
    static untrackFile(inputEl, file) {
      dom_default.putPrivate(inputEl, "files", dom_default.private(inputEl, "files").filter((f) => !Object.is(f, file)));
    }
    static trackFiles(inputEl, files, dataTransfer) {
      if (inputEl.getAttribute("multiple") !== null) {
        let newFiles = files.filter((file) => !this.activeFiles(inputEl).find((f) => Object.is(f, file)));
        dom_default.updatePrivate(inputEl, "files", [], (existing) => existing.concat(newFiles));
        inputEl.value = null;
      } else {
        if (dataTransfer && dataTransfer.files.length > 0) {
          inputEl.files = dataTransfer.files;
        }
        dom_default.putPrivate(inputEl, "files", files);
      }
    }
    static activeFileInputs(formEl) {
      let fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter((el) => el.files && this.activeFiles(el).length > 0);
    }
    static activeFiles(input) {
      return (dom_default.private(input, "files") || []).filter((f) => UploadEntry.isActive(input, f));
    }
    static inputsAwaitingPreflight(formEl) {
      let fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter((input) => this.filesAwaitingPreflight(input).length > 0);
    }
    static filesAwaitingPreflight(input) {
      return this.activeFiles(input).filter((f) => !UploadEntry.isPreflighted(input, f) && !UploadEntry.isPreflightInProgress(f));
    }
    static markPreflightInProgress(entries) {
      entries.forEach((entry) => UploadEntry.markPreflightInProgress(entry.file));
    }
    constructor(inputEl, view, onComplete) {
      this.autoUpload = dom_default.isAutoUpload(inputEl);
      this.view = view;
      this.onComplete = onComplete;
      this._entries = Array.from(_LiveUploader.filesAwaitingPreflight(inputEl) || []).map((file) => new UploadEntry(inputEl, file, view, this.autoUpload));
      _LiveUploader.markPreflightInProgress(this._entries);
      this.numEntriesInProgress = this._entries.length;
    }
    isAutoUpload() {
      return this.autoUpload;
    }
    entries() {
      return this._entries;
    }
    initAdapterUpload(resp, onError, liveSocket2) {
      this._entries = this._entries.map((entry) => {
        if (entry.isCancelled()) {
          this.numEntriesInProgress--;
          if (this.numEntriesInProgress === 0) {
            this.onComplete();
          }
        } else {
          entry.zipPostFlight(resp);
          entry.onDone(() => {
            this.numEntriesInProgress--;
            if (this.numEntriesInProgress === 0) {
              this.onComplete();
            }
          });
        }
        return entry;
      });
      let groupedEntries = this._entries.reduce((acc, entry) => {
        if (!entry.meta) {
          return acc;
        }
        let { name, callback } = entry.uploader(liveSocket2.uploaders);
        acc[name] = acc[name] || { callback, entries: [] };
        acc[name].entries.push(entry);
        return acc;
      }, {});
      for (let name in groupedEntries) {
        let { callback, entries } = groupedEntries[name];
        callback(entries, onError, resp, liveSocket2);
      }
    }
  };
  var ARIA = {
    anyOf(instance, classes) {
      return classes.find((name) => instance instanceof name);
    },
    isFocusable(el, interactiveOnly) {
      return el instanceof HTMLAnchorElement && el.rel !== "ignore" || el instanceof HTMLAreaElement && el.href !== void 0 || !el.disabled && this.anyOf(el, [HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement, HTMLButtonElement]) || el instanceof HTMLIFrameElement || (el.tabIndex > 0 || !interactiveOnly && el.getAttribute("tabindex") !== null && el.getAttribute("aria-hidden") !== "true");
    },
    attemptFocus(el, interactiveOnly) {
      if (this.isFocusable(el, interactiveOnly)) {
        try {
          el.focus();
        } catch (e) {
        }
      }
      return !!document.activeElement && document.activeElement.isSameNode(el);
    },
    focusFirstInteractive(el) {
      let child = el.firstElementChild;
      while (child) {
        if (this.attemptFocus(child, true) || this.focusFirstInteractive(child, true)) {
          return true;
        }
        child = child.nextElementSibling;
      }
    },
    focusFirst(el) {
      let child = el.firstElementChild;
      while (child) {
        if (this.attemptFocus(child) || this.focusFirst(child)) {
          return true;
        }
        child = child.nextElementSibling;
      }
    },
    focusLast(el) {
      let child = el.lastElementChild;
      while (child) {
        if (this.attemptFocus(child) || this.focusLast(child)) {
          return true;
        }
        child = child.previousElementSibling;
      }
    }
  };
  var aria_default = ARIA;
  var Hooks = {
    LiveFileUpload: {
      activeRefs() {
        return this.el.getAttribute(PHX_ACTIVE_ENTRY_REFS);
      },
      preflightedRefs() {
        return this.el.getAttribute(PHX_PREFLIGHTED_REFS);
      },
      mounted() {
        this.preflightedWas = this.preflightedRefs();
      },
      updated() {
        let newPreflights = this.preflightedRefs();
        if (this.preflightedWas !== newPreflights) {
          this.preflightedWas = newPreflights;
          if (newPreflights === "") {
            this.__view().cancelSubmit(this.el.form);
          }
        }
        if (this.activeRefs() === "") {
          this.el.value = null;
        }
        this.el.dispatchEvent(new CustomEvent(PHX_LIVE_FILE_UPDATED));
      }
    },
    LiveImgPreview: {
      mounted() {
        this.ref = this.el.getAttribute("data-phx-entry-ref");
        this.inputEl = document.getElementById(this.el.getAttribute(PHX_UPLOAD_REF));
        LiveUploader.getEntryDataURL(this.inputEl, this.ref, (url) => {
          this.url = url;
          this.el.src = url;
        });
      },
      destroyed() {
        URL.revokeObjectURL(this.url);
      }
    },
    FocusWrap: {
      mounted() {
        this.focusStart = this.el.firstElementChild;
        this.focusEnd = this.el.lastElementChild;
        this.focusStart.addEventListener("focus", () => aria_default.focusLast(this.el));
        this.focusEnd.addEventListener("focus", () => aria_default.focusFirst(this.el));
        this.el.addEventListener("phx:show-end", () => this.el.focus());
        if (window.getComputedStyle(this.el).display !== "none") {
          aria_default.focusFirst(this.el);
        }
      }
    }
  };
  var findScrollContainer = (el) => {
    if (["HTML", "BODY"].indexOf(el.nodeName.toUpperCase()) >= 0)
      return null;
    if (["scroll", "auto"].indexOf(getComputedStyle(el).overflowY) >= 0)
      return el;
    return findScrollContainer(el.parentElement);
  };
  var scrollTop = (scrollContainer) => {
    if (scrollContainer) {
      return scrollContainer.scrollTop;
    } else {
      return document.documentElement.scrollTop || document.body.scrollTop;
    }
  };
  var bottom = (scrollContainer) => {
    if (scrollContainer) {
      return scrollContainer.getBoundingClientRect().bottom;
    } else {
      return window.innerHeight || document.documentElement.clientHeight;
    }
  };
  var top = (scrollContainer) => {
    if (scrollContainer) {
      return scrollContainer.getBoundingClientRect().top;
    } else {
      return 0;
    }
  };
  var isAtViewportTop = (el, scrollContainer) => {
    let rect = el.getBoundingClientRect();
    return Math.ceil(rect.top) >= top(scrollContainer) && Math.ceil(rect.left) >= 0 && Math.floor(rect.top) <= bottom(scrollContainer);
  };
  var isAtViewportBottom = (el, scrollContainer) => {
    let rect = el.getBoundingClientRect();
    return Math.ceil(rect.bottom) >= top(scrollContainer) && Math.ceil(rect.left) >= 0 && Math.floor(rect.bottom) <= bottom(scrollContainer);
  };
  var isWithinViewport = (el, scrollContainer) => {
    let rect = el.getBoundingClientRect();
    return Math.ceil(rect.top) >= top(scrollContainer) && Math.ceil(rect.left) >= 0 && Math.floor(rect.top) <= bottom(scrollContainer);
  };
  Hooks.InfiniteScroll = {
    mounted() {
      this.scrollContainer = findScrollContainer(this.el);
      let scrollBefore = scrollTop(this.scrollContainer);
      let topOverran = false;
      let throttleInterval = 500;
      let pendingOp = null;
      let onTopOverrun = this.throttle(throttleInterval, (topEvent, firstChild) => {
        pendingOp = () => true;
        this.liveSocket.execJSHookPush(this.el, topEvent, { id: firstChild.id, _overran: true }, () => {
          pendingOp = null;
        });
      });
      let onFirstChildAtTop = this.throttle(throttleInterval, (topEvent, firstChild) => {
        pendingOp = () => firstChild.scrollIntoView({ block: "start" });
        this.liveSocket.execJSHookPush(this.el, topEvent, { id: firstChild.id }, () => {
          pendingOp = null;
          window.requestAnimationFrame(() => {
            if (!isWithinViewport(firstChild, this.scrollContainer)) {
              firstChild.scrollIntoView({ block: "start" });
            }
          });
        });
      });
      let onLastChildAtBottom = this.throttle(throttleInterval, (bottomEvent, lastChild) => {
        pendingOp = () => lastChild.scrollIntoView({ block: "end" });
        this.liveSocket.execJSHookPush(this.el, bottomEvent, { id: lastChild.id }, () => {
          pendingOp = null;
          window.requestAnimationFrame(() => {
            if (!isWithinViewport(lastChild, this.scrollContainer)) {
              lastChild.scrollIntoView({ block: "end" });
            }
          });
        });
      });
      this.onScroll = (_e) => {
        let scrollNow = scrollTop(this.scrollContainer);
        if (pendingOp) {
          scrollBefore = scrollNow;
          return pendingOp();
        }
        let rect = this.el.getBoundingClientRect();
        let topEvent = this.el.getAttribute(this.liveSocket.binding("viewport-top"));
        let bottomEvent = this.el.getAttribute(this.liveSocket.binding("viewport-bottom"));
        let lastChild = this.el.lastElementChild;
        let firstChild = this.el.firstElementChild;
        let isScrollingUp = scrollNow < scrollBefore;
        let isScrollingDown = scrollNow > scrollBefore;
        if (isScrollingUp && topEvent && !topOverran && rect.top >= 0) {
          topOverran = true;
          onTopOverrun(topEvent, firstChild);
        } else if (isScrollingDown && topOverran && rect.top <= 0) {
          topOverran = false;
        }
        if (topEvent && isScrollingUp && isAtViewportTop(firstChild, this.scrollContainer)) {
          onFirstChildAtTop(topEvent, firstChild);
        } else if (bottomEvent && isScrollingDown && isAtViewportBottom(lastChild, this.scrollContainer)) {
          onLastChildAtBottom(bottomEvent, lastChild);
        }
        scrollBefore = scrollNow;
      };
      if (this.scrollContainer) {
        this.scrollContainer.addEventListener("scroll", this.onScroll);
      } else {
        window.addEventListener("scroll", this.onScroll);
      }
    },
    destroyed() {
      if (this.scrollContainer) {
        this.scrollContainer.removeEventListener("scroll", this.onScroll);
      } else {
        window.removeEventListener("scroll", this.onScroll);
      }
    },
    throttle(interval, callback) {
      let lastCallAt = 0;
      let timer;
      return (...args) => {
        let now = Date.now();
        let remainingTime = interval - (now - lastCallAt);
        if (remainingTime <= 0 || remainingTime > interval) {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          lastCallAt = now;
          callback(...args);
        } else if (!timer) {
          timer = setTimeout(() => {
            lastCallAt = Date.now();
            timer = null;
            callback(...args);
          }, remainingTime);
        }
      };
    }
  };
  var hooks_default = Hooks;
  var ElementRef = class {
    constructor(el) {
      this.el = el;
      this.loadingRef = el.hasAttribute(PHX_REF_LOADING) ? parseInt(el.getAttribute(PHX_REF_LOADING), 10) : null;
      this.lockRef = el.hasAttribute(PHX_REF_LOCK) ? parseInt(el.getAttribute(PHX_REF_LOCK), 10) : null;
    }
    // public
    maybeUndo(ref, phxEvent, eachCloneCallback) {
      if (!this.isWithin(ref)) {
        return;
      }
      this.undoLocks(ref, phxEvent, eachCloneCallback);
      this.undoLoading(ref, phxEvent);
      if (this.isFullyResolvedBy(ref)) {
        this.el.removeAttribute(PHX_REF_SRC);
      }
    }
    // private
    isWithin(ref) {
      return !(this.loadingRef !== null && this.loadingRef > ref && (this.lockRef !== null && this.lockRef > ref));
    }
    // Check for cloned PHX_REF_LOCK element that has been morphed behind
    // the scenes while this element was locked in the DOM.
    // When we apply the cloned tree to the active DOM element, we must
    //
    //   1. execute pending mounted hooks for nodes now in the DOM
    //   2. undo any ref inside the cloned tree that has since been ack'd
    undoLocks(ref, phxEvent, eachCloneCallback) {
      if (!this.isLockUndoneBy(ref)) {
        return;
      }
      let clonedTree = dom_default.private(this.el, PHX_REF_LOCK);
      if (clonedTree) {
        eachCloneCallback(clonedTree);
        dom_default.deletePrivate(this.el, PHX_REF_LOCK);
      }
      this.el.removeAttribute(PHX_REF_LOCK);
      let opts = { detail: { ref, event: phxEvent }, bubbles: true, cancelable: false };
      this.el.dispatchEvent(new CustomEvent(`phx:undo-lock:${this.lockRef}`, opts));
    }
    undoLoading(ref, phxEvent) {
      if (!this.isLoadingUndoneBy(ref)) {
        if (this.canUndoLoading(ref) && this.el.classList.contains("phx-submit-loading")) {
          this.el.classList.remove("phx-change-loading");
        }
        return;
      }
      if (this.canUndoLoading(ref)) {
        this.el.removeAttribute(PHX_REF_LOADING);
        let disabledVal = this.el.getAttribute(PHX_DISABLED);
        let readOnlyVal = this.el.getAttribute(PHX_READONLY);
        if (readOnlyVal !== null) {
          this.el.readOnly = readOnlyVal === "true" ? true : false;
          this.el.removeAttribute(PHX_READONLY);
        }
        if (disabledVal !== null) {
          this.el.disabled = disabledVal === "true" ? true : false;
          this.el.removeAttribute(PHX_DISABLED);
        }
        let disableRestore = this.el.getAttribute(PHX_DISABLE_WITH_RESTORE);
        if (disableRestore !== null) {
          this.el.innerText = disableRestore;
          this.el.removeAttribute(PHX_DISABLE_WITH_RESTORE);
        }
        let opts = { detail: { ref, event: phxEvent }, bubbles: true, cancelable: false };
        this.el.dispatchEvent(new CustomEvent(`phx:undo-loading:${this.loadingRef}`, opts));
      }
      PHX_EVENT_CLASSES.forEach((name) => {
        if (name !== "phx-submit-loading" || this.canUndoLoading(ref)) {
          dom_default.removeClass(this.el, name);
        }
      });
    }
    isLoadingUndoneBy(ref) {
      return this.loadingRef === null ? false : this.loadingRef <= ref;
    }
    isLockUndoneBy(ref) {
      return this.lockRef === null ? false : this.lockRef <= ref;
    }
    isFullyResolvedBy(ref) {
      return (this.loadingRef === null || this.loadingRef <= ref) && (this.lockRef === null || this.lockRef <= ref);
    }
    // only remove the phx-submit-loading class if we are not locked
    canUndoLoading(ref) {
      return this.lockRef === null || this.lockRef <= ref;
    }
  };
  var DOMPostMorphRestorer = class {
    constructor(containerBefore, containerAfter, updateType) {
      let idsBefore = /* @__PURE__ */ new Set();
      let idsAfter = new Set([...containerAfter.children].map((child) => child.id));
      let elementsToModify = [];
      Array.from(containerBefore.children).forEach((child) => {
        if (child.id) {
          idsBefore.add(child.id);
          if (idsAfter.has(child.id)) {
            let previousElementId = child.previousElementSibling && child.previousElementSibling.id;
            elementsToModify.push({ elementId: child.id, previousElementId });
          }
        }
      });
      this.containerId = containerAfter.id;
      this.updateType = updateType;
      this.elementsToModify = elementsToModify;
      this.elementIdsToAdd = [...idsAfter].filter((id) => !idsBefore.has(id));
    }
    // We do the following to optimize append/prepend operations:
    //   1) Track ids of modified elements & of new elements
    //   2) All the modified elements are put back in the correct position in the DOM tree
    //      by storing the id of their previous sibling
    //   3) New elements are going to be put in the right place by morphdom during append.
    //      For prepend, we move them to the first position in the container
    perform() {
      let container = dom_default.byId(this.containerId);
      this.elementsToModify.forEach((elementToModify) => {
        if (elementToModify.previousElementId) {
          maybe(document.getElementById(elementToModify.previousElementId), (previousElem) => {
            maybe(document.getElementById(elementToModify.elementId), (elem) => {
              let isInRightPlace = elem.previousElementSibling && elem.previousElementSibling.id == previousElem.id;
              if (!isInRightPlace) {
                previousElem.insertAdjacentElement("afterend", elem);
              }
            });
          });
        } else {
          maybe(document.getElementById(elementToModify.elementId), (elem) => {
            let isInRightPlace = elem.previousElementSibling == null;
            if (!isInRightPlace) {
              container.insertAdjacentElement("afterbegin", elem);
            }
          });
        }
      });
      if (this.updateType == "prepend") {
        this.elementIdsToAdd.reverse().forEach((elemId) => {
          maybe(document.getElementById(elemId), (elem) => container.insertAdjacentElement("afterbegin", elem));
        });
      }
    }
  };
  var DOCUMENT_FRAGMENT_NODE = 11;
  function morphAttrs(fromNode, toNode) {
    var toNodeAttrs = toNode.attributes;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;
    if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE || fromNode.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return;
    }
    for (var i2 = toNodeAttrs.length - 1; i2 >= 0; i2--) {
      attr = toNodeAttrs[i2];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      attrValue = attr.value;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);
        if (fromValue !== attrValue) {
          if (attr.prefix === "xmlns") {
            attrName = attr.name;
          }
          fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
        }
      } else {
        fromValue = fromNode.getAttribute(attrName);
        if (fromValue !== attrValue) {
          fromNode.setAttribute(attrName, attrValue);
        }
      }
    }
    var fromNodeAttrs = fromNode.attributes;
    for (var d = fromNodeAttrs.length - 1; d >= 0; d--) {
      attr = fromNodeAttrs[d];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        if (!toNode.hasAttributeNS(attrNamespaceURI, attrName)) {
          fromNode.removeAttributeNS(attrNamespaceURI, attrName);
        }
      } else {
        if (!toNode.hasAttribute(attrName)) {
          fromNode.removeAttribute(attrName);
        }
      }
    }
  }
  var range;
  var NS_XHTML = "http://www.w3.org/1999/xhtml";
  var doc = typeof document === "undefined" ? void 0 : document;
  var HAS_TEMPLATE_SUPPORT = !!doc && "content" in doc.createElement("template");
  var HAS_RANGE_SUPPORT = !!doc && doc.createRange && "createContextualFragment" in doc.createRange();
  function createFragmentFromTemplate(str) {
    var template = doc.createElement("template");
    template.innerHTML = str;
    return template.content.childNodes[0];
  }
  function createFragmentFromRange(str) {
    if (!range) {
      range = doc.createRange();
      range.selectNode(doc.body);
    }
    var fragment = range.createContextualFragment(str);
    return fragment.childNodes[0];
  }
  function createFragmentFromWrap(str) {
    var fragment = doc.createElement("body");
    fragment.innerHTML = str;
    return fragment.childNodes[0];
  }
  function toElement(str) {
    str = str.trim();
    if (HAS_TEMPLATE_SUPPORT) {
      return createFragmentFromTemplate(str);
    } else if (HAS_RANGE_SUPPORT) {
      return createFragmentFromRange(str);
    }
    return createFragmentFromWrap(str);
  }
  function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;
    var fromCodeStart, toCodeStart;
    if (fromNodeName === toNodeName) {
      return true;
    }
    fromCodeStart = fromNodeName.charCodeAt(0);
    toCodeStart = toNodeName.charCodeAt(0);
    if (fromCodeStart <= 90 && toCodeStart >= 97) {
      return fromNodeName === toNodeName.toUpperCase();
    } else if (toCodeStart <= 90 && fromCodeStart >= 97) {
      return toNodeName === fromNodeName.toUpperCase();
    } else {
      return false;
    }
  }
  function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ? doc.createElement(name) : doc.createElementNS(namespaceURI, name);
  }
  function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
      var nextChild = curChild.nextSibling;
      toEl.appendChild(curChild);
      curChild = nextChild;
    }
    return toEl;
  }
  function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
      fromEl[name] = toEl[name];
      if (fromEl[name]) {
        fromEl.setAttribute(name, "");
      } else {
        fromEl.removeAttribute(name);
      }
    }
  }
  var specialElHandlers = {
    OPTION: function(fromEl, toEl) {
      var parentNode = fromEl.parentNode;
      if (parentNode) {
        var parentName = parentNode.nodeName.toUpperCase();
        if (parentName === "OPTGROUP") {
          parentNode = parentNode.parentNode;
          parentName = parentNode && parentNode.nodeName.toUpperCase();
        }
        if (parentName === "SELECT" && !parentNode.hasAttribute("multiple")) {
          if (fromEl.hasAttribute("selected") && !toEl.selected) {
            fromEl.setAttribute("selected", "selected");
            fromEl.removeAttribute("selected");
          }
          parentNode.selectedIndex = -1;
        }
      }
      syncBooleanAttrProp(fromEl, toEl, "selected");
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(fromEl, toEl) {
      syncBooleanAttrProp(fromEl, toEl, "checked");
      syncBooleanAttrProp(fromEl, toEl, "disabled");
      if (fromEl.value !== toEl.value) {
        fromEl.value = toEl.value;
      }
      if (!toEl.hasAttribute("value")) {
        fromEl.removeAttribute("value");
      }
    },
    TEXTAREA: function(fromEl, toEl) {
      var newValue = toEl.value;
      if (fromEl.value !== newValue) {
        fromEl.value = newValue;
      }
      var firstChild = fromEl.firstChild;
      if (firstChild) {
        var oldValue = firstChild.nodeValue;
        if (oldValue == newValue || !newValue && oldValue == fromEl.placeholder) {
          return;
        }
        firstChild.nodeValue = newValue;
      }
    },
    SELECT: function(fromEl, toEl) {
      if (!toEl.hasAttribute("multiple")) {
        var selectedIndex = -1;
        var i2 = 0;
        var curChild = fromEl.firstChild;
        var optgroup;
        var nodeName;
        while (curChild) {
          nodeName = curChild.nodeName && curChild.nodeName.toUpperCase();
          if (nodeName === "OPTGROUP") {
            optgroup = curChild;
            curChild = optgroup.firstChild;
          } else {
            if (nodeName === "OPTION") {
              if (curChild.hasAttribute("selected")) {
                selectedIndex = i2;
                break;
              }
              i2++;
            }
            curChild = curChild.nextSibling;
            if (!curChild && optgroup) {
              curChild = optgroup.nextSibling;
              optgroup = null;
            }
          }
        }
        fromEl.selectedIndex = selectedIndex;
      }
    }
  };
  var ELEMENT_NODE = 1;
  var DOCUMENT_FRAGMENT_NODE$1 = 11;
  var TEXT_NODE = 3;
  var COMMENT_NODE = 8;
  function noop() {
  }
  function defaultGetNodeKey(node) {
    if (node) {
      return node.getAttribute && node.getAttribute("id") || node.id;
    }
  }
  function morphdomFactory(morphAttrs2) {
    return function morphdom2(fromNode, toNode, options) {
      if (!options) {
        options = {};
      }
      if (typeof toNode === "string") {
        if (fromNode.nodeName === "#document" || fromNode.nodeName === "HTML" || fromNode.nodeName === "BODY") {
          var toNodeHtml = toNode;
          toNode = doc.createElement("html");
          toNode.innerHTML = toNodeHtml;
        } else {
          toNode = toElement(toNode);
        }
      } else if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
        toNode = toNode.firstElementChild;
      }
      var getNodeKey = options.getNodeKey || defaultGetNodeKey;
      var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
      var onNodeAdded = options.onNodeAdded || noop;
      var onBeforeElUpdated = options.onBeforeElUpdated || noop;
      var onElUpdated = options.onElUpdated || noop;
      var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
      var onNodeDiscarded = options.onNodeDiscarded || noop;
      var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
      var skipFromChildren = options.skipFromChildren || noop;
      var addChild = options.addChild || function(parent, child) {
        return parent.appendChild(child);
      };
      var childrenOnly = options.childrenOnly === true;
      var fromNodesLookup = /* @__PURE__ */ Object.create(null);
      var keyedRemovalList = [];
      function addKeyedRemoval(key) {
        keyedRemovalList.push(key);
      }
      function walkDiscardedChildNodes(node, skipKeyedNodes) {
        if (node.nodeType === ELEMENT_NODE) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = void 0;
            if (skipKeyedNodes && (key = getNodeKey(curChild))) {
              addKeyedRemoval(key);
            } else {
              onNodeDiscarded(curChild);
              if (curChild.firstChild) {
                walkDiscardedChildNodes(curChild, skipKeyedNodes);
              }
            }
            curChild = curChild.nextSibling;
          }
        }
      }
      function removeNode(node, parentNode, skipKeyedNodes) {
        if (onBeforeNodeDiscarded(node) === false) {
          return;
        }
        if (parentNode) {
          parentNode.removeChild(node);
        }
        onNodeDiscarded(node);
        walkDiscardedChildNodes(node, skipKeyedNodes);
      }
      function indexTree(node) {
        if (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = getNodeKey(curChild);
            if (key) {
              fromNodesLookup[key] = curChild;
            }
            indexTree(curChild);
            curChild = curChild.nextSibling;
          }
        }
      }
      indexTree(fromNode);
      function handleNodeAdded(el) {
        onNodeAdded(el);
        var curChild = el.firstChild;
        while (curChild) {
          var nextSibling = curChild.nextSibling;
          var key = getNodeKey(curChild);
          if (key) {
            var unmatchedFromEl = fromNodesLookup[key];
            if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
              curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
              morphEl(unmatchedFromEl, curChild);
            } else {
              handleNodeAdded(curChild);
            }
          } else {
            handleNodeAdded(curChild);
          }
          curChild = nextSibling;
        }
      }
      function cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey) {
        while (curFromNodeChild) {
          var fromNextSibling = curFromNodeChild.nextSibling;
          if (curFromNodeKey = getNodeKey(curFromNodeChild)) {
            addKeyedRemoval(curFromNodeKey);
          } else {
            removeNode(
              curFromNodeChild,
              fromEl,
              true
              /* skip keyed nodes */
            );
          }
          curFromNodeChild = fromNextSibling;
        }
      }
      function morphEl(fromEl, toEl, childrenOnly2) {
        var toElKey = getNodeKey(toEl);
        if (toElKey) {
          delete fromNodesLookup[toElKey];
        }
        if (!childrenOnly2) {
          var beforeUpdateResult = onBeforeElUpdated(fromEl, toEl);
          if (beforeUpdateResult === false) {
            return;
          } else if (beforeUpdateResult instanceof HTMLElement) {
            fromEl = beforeUpdateResult;
            indexTree(fromEl);
          }
          morphAttrs2(fromEl, toEl);
          onElUpdated(fromEl);
          if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
            return;
          }
        }
        if (fromEl.nodeName !== "TEXTAREA") {
          morphChildren(fromEl, toEl);
        } else {
          specialElHandlers.TEXTAREA(fromEl, toEl);
        }
      }
      function morphChildren(fromEl, toEl) {
        var skipFrom = skipFromChildren(fromEl, toEl);
        var curToNodeChild = toEl.firstChild;
        var curFromNodeChild = fromEl.firstChild;
        var curToNodeKey;
        var curFromNodeKey;
        var fromNextSibling;
        var toNextSibling;
        var matchingFromEl;
        outer:
          while (curToNodeChild) {
            toNextSibling = curToNodeChild.nextSibling;
            curToNodeKey = getNodeKey(curToNodeChild);
            while (!skipFrom && curFromNodeChild) {
              fromNextSibling = curFromNodeChild.nextSibling;
              if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              curFromNodeKey = getNodeKey(curFromNodeChild);
              var curFromNodeType = curFromNodeChild.nodeType;
              var isCompatible = void 0;
              if (curFromNodeType === curToNodeChild.nodeType) {
                if (curFromNodeType === ELEMENT_NODE) {
                  if (curToNodeKey) {
                    if (curToNodeKey !== curFromNodeKey) {
                      if (matchingFromEl = fromNodesLookup[curToNodeKey]) {
                        if (fromNextSibling === matchingFromEl) {
                          isCompatible = false;
                        } else {
                          fromEl.insertBefore(matchingFromEl, curFromNodeChild);
                          if (curFromNodeKey) {
                            addKeyedRemoval(curFromNodeKey);
                          } else {
                            removeNode(
                              curFromNodeChild,
                              fromEl,
                              true
                              /* skip keyed nodes */
                            );
                          }
                          curFromNodeChild = matchingFromEl;
                          curFromNodeKey = getNodeKey(curFromNodeChild);
                        }
                      } else {
                        isCompatible = false;
                      }
                    }
                  } else if (curFromNodeKey) {
                    isCompatible = false;
                  }
                  isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                  if (isCompatible) {
                    morphEl(curFromNodeChild, curToNodeChild);
                  }
                } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                  isCompatible = true;
                  if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
                    curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                  }
                }
              }
              if (isCompatible) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              if (curFromNodeKey) {
                addKeyedRemoval(curFromNodeKey);
              } else {
                removeNode(
                  curFromNodeChild,
                  fromEl,
                  true
                  /* skip keyed nodes */
                );
              }
              curFromNodeChild = fromNextSibling;
            }
            if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
              if (!skipFrom) {
                addChild(fromEl, matchingFromEl);
              }
              morphEl(matchingFromEl, curToNodeChild);
            } else {
              var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
              if (onBeforeNodeAddedResult !== false) {
                if (onBeforeNodeAddedResult) {
                  curToNodeChild = onBeforeNodeAddedResult;
                }
                if (curToNodeChild.actualize) {
                  curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                }
                addChild(fromEl, curToNodeChild);
                handleNodeAdded(curToNodeChild);
              }
            }
            curToNodeChild = toNextSibling;
            curFromNodeChild = fromNextSibling;
          }
        cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey);
        var specialElHandler = specialElHandlers[fromEl.nodeName];
        if (specialElHandler) {
          specialElHandler(fromEl, toEl);
        }
      }
      var morphedNode = fromNode;
      var morphedNodeType = morphedNode.nodeType;
      var toNodeType = toNode.nodeType;
      if (!childrenOnly) {
        if (morphedNodeType === ELEMENT_NODE) {
          if (toNodeType === ELEMENT_NODE) {
            if (!compareNodeNames(fromNode, toNode)) {
              onNodeDiscarded(fromNode);
              morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
            }
          } else {
            morphedNode = toNode;
          }
        } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) {
          if (toNodeType === morphedNodeType) {
            if (morphedNode.nodeValue !== toNode.nodeValue) {
              morphedNode.nodeValue = toNode.nodeValue;
            }
            return morphedNode;
          } else {
            morphedNode = toNode;
          }
        }
      }
      if (morphedNode === toNode) {
        onNodeDiscarded(fromNode);
      } else {
        if (toNode.isSameNode && toNode.isSameNode(morphedNode)) {
          return;
        }
        morphEl(morphedNode, toNode, childrenOnly);
        if (keyedRemovalList) {
          for (var i2 = 0, len = keyedRemovalList.length; i2 < len; i2++) {
            var elToRemove = fromNodesLookup[keyedRemovalList[i2]];
            if (elToRemove) {
              removeNode(elToRemove, elToRemove.parentNode, false);
            }
          }
        }
      }
      if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
        if (morphedNode.actualize) {
          morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
        }
        fromNode.parentNode.replaceChild(morphedNode, fromNode);
      }
      return morphedNode;
    };
  }
  var morphdom = morphdomFactory(morphAttrs);
  var morphdom_esm_default = morphdom;
  var DOMPatch = class {
    static patchWithClonedTree(container, clonedTree, liveSocket2) {
      let focused = liveSocket2.getActiveElement();
      let { selectionStart, selectionEnd } = focused && dom_default.hasSelectionRange(focused) ? focused : {};
      let phxUpdate = liveSocket2.binding(PHX_UPDATE);
      morphdom_esm_default(container, clonedTree, {
        childrenOnly: false,
        onBeforeElUpdated: (fromEl, toEl) => {
          dom_default.syncPendingAttrs(fromEl, toEl);
          if (!container.isSameNode(fromEl) && fromEl.hasAttribute(PHX_REF_LOCK)) {
            return false;
          }
          if (dom_default.isIgnored(fromEl, phxUpdate)) {
            return false;
          }
          if (focused && focused.isSameNode(fromEl) && dom_default.isFormInput(fromEl)) {
            dom_default.mergeFocusedInput(fromEl, toEl);
            return false;
          }
        }
      });
      liveSocket2.silenceEvents(() => dom_default.restoreFocus(focused, selectionStart, selectionEnd));
    }
    constructor(view, container, id, html, streams, targetCID) {
      this.view = view;
      this.liveSocket = view.liveSocket;
      this.container = container;
      this.id = id;
      this.rootID = view.root.id;
      this.html = html;
      this.streams = streams;
      this.streamInserts = {};
      this.streamComponentRestore = {};
      this.targetCID = targetCID;
      this.cidPatch = isCid(this.targetCID);
      this.pendingRemoves = [];
      this.phxRemove = this.liveSocket.binding("remove");
      this.targetContainer = this.isCIDPatch() ? this.targetCIDContainer(html) : container;
      this.callbacks = {
        beforeadded: [],
        beforeupdated: [],
        beforephxChildAdded: [],
        afteradded: [],
        afterupdated: [],
        afterdiscarded: [],
        afterphxChildAdded: [],
        aftertransitionsDiscarded: []
      };
    }
    before(kind, callback) {
      this.callbacks[`before${kind}`].push(callback);
    }
    after(kind, callback) {
      this.callbacks[`after${kind}`].push(callback);
    }
    trackBefore(kind, ...args) {
      this.callbacks[`before${kind}`].forEach((callback) => callback(...args));
    }
    trackAfter(kind, ...args) {
      this.callbacks[`after${kind}`].forEach((callback) => callback(...args));
    }
    markPrunableContentForRemoval() {
      let phxUpdate = this.liveSocket.binding(PHX_UPDATE);
      dom_default.all(this.container, `[${phxUpdate}=append] > *, [${phxUpdate}=prepend] > *`, (el) => {
        el.setAttribute(PHX_PRUNE, "");
      });
    }
    perform(isJoinPatch) {
      let { view, liveSocket: liveSocket2, html, container, targetContainer } = this;
      if (this.isCIDPatch() && !targetContainer) {
        return;
      }
      let focused = liveSocket2.getActiveElement();
      let { selectionStart, selectionEnd } = focused && dom_default.hasSelectionRange(focused) ? focused : {};
      let phxUpdate = liveSocket2.binding(PHX_UPDATE);
      let phxViewportTop = liveSocket2.binding(PHX_VIEWPORT_TOP);
      let phxViewportBottom = liveSocket2.binding(PHX_VIEWPORT_BOTTOM);
      let phxTriggerExternal = liveSocket2.binding(PHX_TRIGGER_ACTION);
      let added = [];
      let updates = [];
      let appendPrependUpdates = [];
      let externalFormTriggered = null;
      function morph(targetContainer2, source, withChildren = false) {
        let morphCallbacks = {
          // normally, we are running with childrenOnly, as the patch HTML for a LV
          // does not include the LV attrs (data-phx-session, etc.)
          // when we are patching a live component, we do want to patch the root element as well;
          // another case is the recursive patch of a stream item that was kept on reset (-> onBeforeNodeAdded)
          childrenOnly: targetContainer2.getAttribute(PHX_COMPONENT) === null && !withChildren,
          getNodeKey: (node) => {
            if (dom_default.isPhxDestroyed(node)) {
              return null;
            }
            if (isJoinPatch) {
              return node.id;
            }
            return node.id || node.getAttribute && node.getAttribute(PHX_MAGIC_ID);
          },
          // skip indexing from children when container is stream
          skipFromChildren: (from) => {
            return from.getAttribute(phxUpdate) === PHX_STREAM;
          },
          // tell morphdom how to add a child
          addChild: (parent, child) => {
            let { ref, streamAt } = this.getStreamInsert(child);
            if (ref === void 0) {
              return parent.appendChild(child);
            }
            this.setStreamRef(child, ref);
            if (streamAt === 0) {
              parent.insertAdjacentElement("afterbegin", child);
            } else if (streamAt === -1) {
              let lastChild = parent.lastElementChild;
              if (lastChild && !lastChild.hasAttribute(PHX_STREAM_REF)) {
                let nonStreamChild = Array.from(parent.children).find((c) => !c.hasAttribute(PHX_STREAM_REF));
                parent.insertBefore(child, nonStreamChild);
              } else {
                parent.appendChild(child);
              }
            } else if (streamAt > 0) {
              let sibling = Array.from(parent.children)[streamAt];
              parent.insertBefore(child, sibling);
            }
          },
          onBeforeNodeAdded: (el) => {
            dom_default.maintainPrivateHooks(el, el, phxViewportTop, phxViewportBottom);
            this.trackBefore("added", el);
            let morphedEl = el;
            if (this.streamComponentRestore[el.id]) {
              morphedEl = this.streamComponentRestore[el.id];
              delete this.streamComponentRestore[el.id];
              morph.call(this, morphedEl, el, true);
            }
            return morphedEl;
          },
          onNodeAdded: (el) => {
            if (el.getAttribute) {
              this.maybeReOrderStream(el, true);
            }
            if (el instanceof HTMLImageElement && el.srcset) {
              el.srcset = el.srcset;
            } else if (el instanceof HTMLVideoElement && el.autoplay) {
              el.play();
            }
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            if (dom_default.isPhxChild(el) && view.ownsElement(el) || dom_default.isPhxSticky(el) && view.ownsElement(el.parentNode)) {
              this.trackAfter("phxChildAdded", el);
            }
            added.push(el);
          },
          onNodeDiscarded: (el) => this.onNodeDiscarded(el),
          onBeforeNodeDiscarded: (el) => {
            if (el.getAttribute && el.getAttribute(PHX_PRUNE) !== null) {
              return true;
            }
            if (el.parentElement !== null && el.id && dom_default.isPhxUpdate(el.parentElement, phxUpdate, [PHX_STREAM, "append", "prepend"])) {
              return false;
            }
            if (this.maybePendingRemove(el)) {
              return false;
            }
            if (this.skipCIDSibling(el)) {
              return false;
            }
            return true;
          },
          onElUpdated: (el) => {
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            updates.push(el);
            this.maybeReOrderStream(el, false);
          },
          onBeforeElUpdated: (fromEl, toEl) => {
            if (fromEl.id && fromEl.isSameNode(targetContainer2) && fromEl.id !== toEl.id) {
              morphCallbacks.onNodeDiscarded(fromEl);
              fromEl.replaceWith(toEl);
              return morphCallbacks.onNodeAdded(toEl);
            }
            dom_default.syncPendingAttrs(fromEl, toEl);
            dom_default.maintainPrivateHooks(fromEl, toEl, phxViewportTop, phxViewportBottom);
            dom_default.cleanChildNodes(toEl, phxUpdate);
            if (this.skipCIDSibling(toEl)) {
              this.maybeReOrderStream(fromEl);
              return false;
            }
            if (dom_default.isPhxSticky(fromEl)) {
              [PHX_SESSION, PHX_STATIC, PHX_ROOT_ID].map((attr) => [attr, fromEl.getAttribute(attr), toEl.getAttribute(attr)]).forEach(([attr, fromVal, toVal]) => {
                if (toVal && fromVal !== toVal) {
                  fromEl.setAttribute(attr, toVal);
                }
              });
              return false;
            }
            if (dom_default.isIgnored(fromEl, phxUpdate) || fromEl.form && fromEl.form.isSameNode(externalFormTriggered)) {
              this.trackBefore("updated", fromEl, toEl);
              dom_default.mergeAttrs(fromEl, toEl, { isIgnored: dom_default.isIgnored(fromEl, phxUpdate) });
              updates.push(fromEl);
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            if (fromEl.type === "number" && (fromEl.validity && fromEl.validity.badInput)) {
              return false;
            }
            let isFocusedFormEl = focused && fromEl.isSameNode(focused) && dom_default.isFormInput(fromEl);
            let focusedSelectChanged = isFocusedFormEl && this.isChangedSelect(fromEl, toEl);
            if (fromEl.hasAttribute(PHX_REF_SRC)) {
              if (dom_default.isUploadInput(fromEl)) {
                dom_default.mergeAttrs(fromEl, toEl, { isIgnored: true });
                this.trackBefore("updated", fromEl, toEl);
                updates.push(fromEl);
              }
              dom_default.applyStickyOperations(fromEl);
              let isLocked = fromEl.hasAttribute(PHX_REF_LOCK);
              let clone2 = isLocked ? dom_default.private(fromEl, PHX_REF_LOCK) || fromEl.cloneNode(true) : null;
              if (clone2) {
                dom_default.putPrivate(fromEl, PHX_REF_LOCK, clone2);
                if (!isFocusedFormEl) {
                  fromEl = clone2;
                }
              }
            }
            if (dom_default.isPhxChild(toEl)) {
              let prevSession = fromEl.getAttribute(PHX_SESSION);
              dom_default.mergeAttrs(fromEl, toEl, { exclude: [PHX_STATIC] });
              if (prevSession !== "") {
                fromEl.setAttribute(PHX_SESSION, prevSession);
              }
              fromEl.setAttribute(PHX_ROOT_ID, this.rootID);
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            dom_default.copyPrivates(toEl, fromEl);
            if (isFocusedFormEl && fromEl.type !== "hidden" && !focusedSelectChanged) {
              this.trackBefore("updated", fromEl, toEl);
              dom_default.mergeFocusedInput(fromEl, toEl);
              dom_default.syncAttrsToProps(fromEl);
              updates.push(fromEl);
              dom_default.applyStickyOperations(fromEl);
              return false;
            } else {
              if (focusedSelectChanged) {
                fromEl.blur();
              }
              if (dom_default.isPhxUpdate(toEl, phxUpdate, ["append", "prepend"])) {
                appendPrependUpdates.push(new DOMPostMorphRestorer(fromEl, toEl, toEl.getAttribute(phxUpdate)));
              }
              dom_default.syncAttrsToProps(toEl);
              dom_default.applyStickyOperations(toEl);
              this.trackBefore("updated", fromEl, toEl);
              return fromEl;
            }
          }
        };
        morphdom_esm_default(targetContainer2, source, morphCallbacks);
      }
      this.trackBefore("added", container);
      this.trackBefore("updated", container, container);
      liveSocket2.time("morphdom", () => {
        this.streams.forEach(([ref, inserts, deleteIds, reset]) => {
          inserts.forEach(([key, streamAt, limit]) => {
            this.streamInserts[key] = { ref, streamAt, limit, reset };
          });
          if (reset !== void 0) {
            dom_default.all(container, `[${PHX_STREAM_REF}="${ref}"]`, (child) => {
              this.removeStreamChildElement(child);
            });
          }
          deleteIds.forEach((id) => {
            let child = container.querySelector(`[id="${id}"]`);
            if (child) {
              this.removeStreamChildElement(child);
            }
          });
        });
        if (isJoinPatch) {
          dom_default.all(this.container, `[${phxUpdate}=${PHX_STREAM}]`, (el) => {
            this.liveSocket.owner(el, (view2) => {
              if (view2 === this.view) {
                Array.from(el.children).forEach((child) => {
                  this.removeStreamChildElement(child);
                });
              }
            });
          });
        }
        morph.call(this, targetContainer, html);
      });
      if (liveSocket2.isDebugEnabled()) {
        detectDuplicateIds();
        Array.from(document.querySelectorAll("input[name=id]")).forEach((node) => {
          if (node.form) {
            console.error('Detected an input with name="id" inside a form! This will cause problems when patching the DOM.\n', node);
          }
        });
      }
      if (appendPrependUpdates.length > 0) {
        liveSocket2.time("post-morph append/prepend restoration", () => {
          appendPrependUpdates.forEach((update) => update.perform());
        });
      }
      liveSocket2.silenceEvents(() => dom_default.restoreFocus(focused, selectionStart, selectionEnd));
      dom_default.dispatchEvent(document, "phx:update");
      added.forEach((el) => this.trackAfter("added", el));
      updates.forEach((el) => this.trackAfter("updated", el));
      this.transitionPendingRemoves();
      if (externalFormTriggered) {
        liveSocket2.unload();
        Object.getPrototypeOf(externalFormTriggered).submit.call(externalFormTriggered);
      }
      return true;
    }
    onNodeDiscarded(el) {
      if (dom_default.isPhxChild(el) || dom_default.isPhxSticky(el)) {
        this.liveSocket.destroyViewByEl(el);
      }
      this.trackAfter("discarded", el);
    }
    maybePendingRemove(node) {
      if (node.getAttribute && node.getAttribute(this.phxRemove) !== null) {
        this.pendingRemoves.push(node);
        return true;
      } else {
        return false;
      }
    }
    removeStreamChildElement(child) {
      if (this.streamInserts[child.id]) {
        this.streamComponentRestore[child.id] = child;
        child.remove();
      } else {
        if (!this.maybePendingRemove(child)) {
          child.remove();
          this.onNodeDiscarded(child);
        }
      }
    }
    getStreamInsert(el) {
      let insert = el.id ? this.streamInserts[el.id] : {};
      return insert || {};
    }
    setStreamRef(el, ref) {
      dom_default.putSticky(el, PHX_STREAM_REF, (el2) => el2.setAttribute(PHX_STREAM_REF, ref));
    }
    maybeReOrderStream(el, isNew) {
      let { ref, streamAt, reset } = this.getStreamInsert(el);
      if (streamAt === void 0) {
        return;
      }
      this.setStreamRef(el, ref);
      if (!reset && !isNew) {
        return;
      }
      if (!el.parentElement) {
        return;
      }
      if (streamAt === 0) {
        el.parentElement.insertBefore(el, el.parentElement.firstElementChild);
      } else if (streamAt > 0) {
        let children = Array.from(el.parentElement.children);
        let oldIndex = children.indexOf(el);
        if (streamAt >= children.length - 1) {
          el.parentElement.appendChild(el);
        } else {
          let sibling = children[streamAt];
          if (oldIndex > streamAt) {
            el.parentElement.insertBefore(el, sibling);
          } else {
            el.parentElement.insertBefore(el, sibling.nextElementSibling);
          }
        }
      }
      this.maybeLimitStream(el);
    }
    maybeLimitStream(el) {
      let { limit } = this.getStreamInsert(el);
      let children = limit !== null && Array.from(el.parentElement.children);
      if (limit && limit < 0 && children.length > limit * -1) {
        children.slice(0, children.length + limit).forEach((child) => this.removeStreamChildElement(child));
      } else if (limit && limit >= 0 && children.length > limit) {
        children.slice(limit).forEach((child) => this.removeStreamChildElement(child));
      }
    }
    transitionPendingRemoves() {
      let { pendingRemoves, liveSocket: liveSocket2 } = this;
      if (pendingRemoves.length > 0) {
        liveSocket2.transitionRemoves(pendingRemoves, false, () => {
          pendingRemoves.forEach((el) => {
            let child = dom_default.firstPhxChild(el);
            if (child) {
              liveSocket2.destroyViewByEl(child);
            }
            el.remove();
          });
          this.trackAfter("transitionsDiscarded", pendingRemoves);
        });
      }
    }
    isChangedSelect(fromEl, toEl) {
      if (!(fromEl instanceof HTMLSelectElement) || fromEl.multiple) {
        return false;
      }
      if (fromEl.options.length !== toEl.options.length) {
        return true;
      }
      toEl.value = fromEl.value;
      return !fromEl.isEqualNode(toEl);
    }
    isCIDPatch() {
      return this.cidPatch;
    }
    skipCIDSibling(el) {
      return el.nodeType === Node.ELEMENT_NODE && el.hasAttribute(PHX_SKIP);
    }
    targetCIDContainer(html) {
      if (!this.isCIDPatch()) {
        return;
      }
      let [first, ...rest] = dom_default.findComponentNodeList(this.container, this.targetCID);
      if (rest.length === 0 && dom_default.childNodeLength(html) === 1) {
        return first;
      } else {
        return first && first.parentNode;
      }
    }
    indexOf(parent, child) {
      return Array.from(parent.children).indexOf(child);
    }
  };
  var VOID_TAGS = /* @__PURE__ */ new Set([
    "area",
    "base",
    "br",
    "col",
    "command",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ]);
  var quoteChars = /* @__PURE__ */ new Set(["'", '"']);
  var modifyRoot = (html, attrs, clearInnerHTML) => {
    let i2 = 0;
    let insideComment = false;
    let beforeTag, afterTag, tag, tagNameEndsAt, id, newHTML;
    let lookahead = html.match(/^(\s*(?:<!--.*?-->\s*)*)<([^\s\/>]+)/);
    if (lookahead === null) {
      throw new Error(`malformed html ${html}`);
    }
    i2 = lookahead[0].length;
    beforeTag = lookahead[1];
    tag = lookahead[2];
    tagNameEndsAt = i2;
    for (i2; i2 < html.length; i2++) {
      if (html.charAt(i2) === ">") {
        break;
      }
      if (html.charAt(i2) === "=") {
        let isId = html.slice(i2 - 3, i2) === " id";
        i2++;
        let char = html.charAt(i2);
        if (quoteChars.has(char)) {
          let attrStartsAt = i2;
          i2++;
          for (i2; i2 < html.length; i2++) {
            if (html.charAt(i2) === char) {
              break;
            }
          }
          if (isId) {
            id = html.slice(attrStartsAt + 1, i2);
            break;
          }
        }
      }
    }
    let closeAt = html.length - 1;
    insideComment = false;
    while (closeAt >= beforeTag.length + tag.length) {
      let char = html.charAt(closeAt);
      if (insideComment) {
        if (char === "-" && html.slice(closeAt - 3, closeAt) === "<!-") {
          insideComment = false;
          closeAt -= 4;
        } else {
          closeAt -= 1;
        }
      } else if (char === ">" && html.slice(closeAt - 2, closeAt) === "--") {
        insideComment = true;
        closeAt -= 3;
      } else if (char === ">") {
        break;
      } else {
        closeAt -= 1;
      }
    }
    afterTag = html.slice(closeAt + 1, html.length);
    let attrsStr = Object.keys(attrs).map((attr) => attrs[attr] === true ? attr : `${attr}="${attrs[attr]}"`).join(" ");
    if (clearInnerHTML) {
      let idAttrStr = id ? ` id="${id}"` : "";
      if (VOID_TAGS.has(tag)) {
        newHTML = `<${tag}${idAttrStr}${attrsStr === "" ? "" : " "}${attrsStr}/>`;
      } else {
        newHTML = `<${tag}${idAttrStr}${attrsStr === "" ? "" : " "}${attrsStr}></${tag}>`;
      }
    } else {
      let rest = html.slice(tagNameEndsAt, closeAt + 1);
      newHTML = `<${tag}${attrsStr === "" ? "" : " "}${attrsStr}${rest}`;
    }
    return [newHTML, beforeTag, afterTag];
  };
  var Rendered = class {
    static extract(diff) {
      let { [REPLY]: reply, [EVENTS]: events, [TITLE]: title } = diff;
      delete diff[REPLY];
      delete diff[EVENTS];
      delete diff[TITLE];
      return { diff, title, reply: reply || null, events: events || [] };
    }
    constructor(viewId, rendered) {
      this.viewId = viewId;
      this.rendered = {};
      this.magicId = 0;
      this.mergeDiff(rendered);
    }
    parentViewId() {
      return this.viewId;
    }
    toString(onlyCids) {
      let [str, streams] = this.recursiveToString(this.rendered, this.rendered[COMPONENTS], onlyCids, true, {});
      return [str, streams];
    }
    recursiveToString(rendered, components = rendered[COMPONENTS], onlyCids, changeTracking, rootAttrs) {
      onlyCids = onlyCids ? new Set(onlyCids) : null;
      let output = { buffer: "", components, onlyCids, streams: /* @__PURE__ */ new Set() };
      this.toOutputBuffer(rendered, null, output, changeTracking, rootAttrs);
      return [output.buffer, output.streams];
    }
    componentCIDs(diff) {
      return Object.keys(diff[COMPONENTS] || {}).map((i2) => parseInt(i2));
    }
    isComponentOnlyDiff(diff) {
      if (!diff[COMPONENTS]) {
        return false;
      }
      return Object.keys(diff).length === 1;
    }
    getComponent(diff, cid) {
      return diff[COMPONENTS][cid];
    }
    resetRender(cid) {
      if (this.rendered[COMPONENTS][cid]) {
        this.rendered[COMPONENTS][cid].reset = true;
      }
    }
    mergeDiff(diff) {
      let newc = diff[COMPONENTS];
      let cache = {};
      delete diff[COMPONENTS];
      this.rendered = this.mutableMerge(this.rendered, diff);
      this.rendered[COMPONENTS] = this.rendered[COMPONENTS] || {};
      if (newc) {
        let oldc = this.rendered[COMPONENTS];
        for (let cid in newc) {
          newc[cid] = this.cachedFindComponent(cid, newc[cid], oldc, newc, cache);
        }
        for (let cid in newc) {
          oldc[cid] = newc[cid];
        }
        diff[COMPONENTS] = newc;
      }
    }
    cachedFindComponent(cid, cdiff, oldc, newc, cache) {
      if (cache[cid]) {
        return cache[cid];
      } else {
        let ndiff, stat, scid = cdiff[STATIC];
        if (isCid(scid)) {
          let tdiff;
          if (scid > 0) {
            tdiff = this.cachedFindComponent(scid, newc[scid], oldc, newc, cache);
          } else {
            tdiff = oldc[-scid];
          }
          stat = tdiff[STATIC];
          ndiff = this.cloneMerge(tdiff, cdiff, true);
          ndiff[STATIC] = stat;
        } else {
          ndiff = cdiff[STATIC] !== void 0 || oldc[cid] === void 0 ? cdiff : this.cloneMerge(oldc[cid], cdiff, false);
        }
        cache[cid] = ndiff;
        return ndiff;
      }
    }
    mutableMerge(target, source) {
      if (source[STATIC] !== void 0) {
        return source;
      } else {
        this.doMutableMerge(target, source);
        return target;
      }
    }
    doMutableMerge(target, source) {
      for (let key in source) {
        let val = source[key];
        let targetVal = target[key];
        let isObjVal = isObject(val);
        if (isObjVal && val[STATIC] === void 0 && isObject(targetVal)) {
          this.doMutableMerge(targetVal, val);
        } else {
          target[key] = val;
        }
      }
      if (target[ROOT]) {
        target.newRender = true;
      }
    }
    // Merges cid trees together, copying statics from source tree.
    //
    // The `pruneMagicId` is passed to control pruning the magicId of the
    // target. We must always prune the magicId when we are sharing statics
    // from another component. If not pruning, we replicate the logic from
    // mutableMerge, where we set newRender to true if there is a root
    // (effectively forcing the new version to be rendered instead of skipped)
    //
    cloneMerge(target, source, pruneMagicId) {
      let merged = __spreadValues(__spreadValues({}, target), source);
      for (let key in merged) {
        let val = source[key];
        let targetVal = target[key];
        if (isObject(val) && val[STATIC] === void 0 && isObject(targetVal)) {
          merged[key] = this.cloneMerge(targetVal, val, pruneMagicId);
        } else if (val === void 0 && isObject(targetVal)) {
          merged[key] = this.cloneMerge(targetVal, {}, pruneMagicId);
        }
      }
      if (pruneMagicId) {
        delete merged.magicId;
        delete merged.newRender;
      } else if (target[ROOT]) {
        merged.newRender = true;
      }
      return merged;
    }
    componentToString(cid) {
      let [str, streams] = this.recursiveCIDToString(this.rendered[COMPONENTS], cid, null);
      let [strippedHTML, _before, _after] = modifyRoot(str, {});
      return [strippedHTML, streams];
    }
    pruneCIDs(cids) {
      cids.forEach((cid) => delete this.rendered[COMPONENTS][cid]);
    }
    // private
    get() {
      return this.rendered;
    }
    isNewFingerprint(diff = {}) {
      return !!diff[STATIC];
    }
    templateStatic(part, templates) {
      if (typeof part === "number") {
        return templates[part];
      } else {
        return part;
      }
    }
    nextMagicID() {
      this.magicId++;
      return `m${this.magicId}-${this.parentViewId()}`;
    }
    // Converts rendered tree to output buffer.
    //
    // changeTracking controls if we can apply the PHX_SKIP optimization.
    // It is disabled for comprehensions since we must re-render the entire collection
    // and no individual element is tracked inside the comprehension.
    toOutputBuffer(rendered, templates, output, changeTracking, rootAttrs = {}) {
      if (rendered[DYNAMICS]) {
        return this.comprehensionToBuffer(rendered, templates, output);
      }
      let { [STATIC]: statics } = rendered;
      statics = this.templateStatic(statics, templates);
      let isRoot = rendered[ROOT];
      let prevBuffer = output.buffer;
      if (isRoot) {
        output.buffer = "";
      }
      if (changeTracking && isRoot && !rendered.magicId) {
        rendered.newRender = true;
        rendered.magicId = this.nextMagicID();
      }
      output.buffer += statics[0];
      for (let i2 = 1; i2 < statics.length; i2++) {
        this.dynamicToBuffer(rendered[i2 - 1], templates, output, changeTracking);
        output.buffer += statics[i2];
      }
      if (isRoot) {
        let skip = false;
        let attrs;
        if (changeTracking || rendered.magicId) {
          skip = changeTracking && !rendered.newRender;
          attrs = __spreadValues({ [PHX_MAGIC_ID]: rendered.magicId }, rootAttrs);
        } else {
          attrs = rootAttrs;
        }
        if (skip) {
          attrs[PHX_SKIP] = true;
        }
        let [newRoot, commentBefore, commentAfter] = modifyRoot(output.buffer, attrs, skip);
        rendered.newRender = false;
        output.buffer = prevBuffer + commentBefore + newRoot + commentAfter;
      }
    }
    comprehensionToBuffer(rendered, templates, output) {
      let { [DYNAMICS]: dynamics, [STATIC]: statics, [STREAM]: stream } = rendered;
      let [_ref, _inserts, deleteIds, reset] = stream || [null, {}, [], null];
      statics = this.templateStatic(statics, templates);
      let compTemplates = templates || rendered[TEMPLATES];
      for (let d = 0; d < dynamics.length; d++) {
        let dynamic = dynamics[d];
        output.buffer += statics[0];
        for (let i2 = 1; i2 < statics.length; i2++) {
          let changeTracking = false;
          this.dynamicToBuffer(dynamic[i2 - 1], compTemplates, output, changeTracking);
          output.buffer += statics[i2];
        }
      }
      if (stream !== void 0 && (rendered[DYNAMICS].length > 0 || deleteIds.length > 0 || reset)) {
        delete rendered[STREAM];
        rendered[DYNAMICS] = [];
        output.streams.add(stream);
      }
    }
    dynamicToBuffer(rendered, templates, output, changeTracking) {
      if (typeof rendered === "number") {
        let [str, streams] = this.recursiveCIDToString(output.components, rendered, output.onlyCids);
        output.buffer += str;
        output.streams = /* @__PURE__ */ new Set([...output.streams, ...streams]);
      } else if (isObject(rendered)) {
        this.toOutputBuffer(rendered, templates, output, changeTracking, {});
      } else {
        output.buffer += rendered;
      }
    }
    recursiveCIDToString(components, cid, onlyCids) {
      let component = components[cid] || logError(`no component for CID ${cid}`, components);
      let attrs = { [PHX_COMPONENT]: cid };
      let skip = onlyCids && !onlyCids.has(cid);
      component.newRender = !skip;
      component.magicId = `c${cid}-${this.parentViewId()}`;
      let changeTracking = !component.reset;
      let [html, streams] = this.recursiveToString(component, components, onlyCids, changeTracking, attrs);
      delete component.reset;
      return [html, streams];
    }
  };
  var focusStack = [];
  var default_transition_time = 200;
  var JS = {
    // private
    exec(e, eventType, phxEvent, view, sourceEl, defaults) {
      let [defaultKind, defaultArgs] = defaults || [null, { callback: defaults && defaults.callback }];
      let commands = phxEvent.charAt(0) === "[" ? JSON.parse(phxEvent) : [[defaultKind, defaultArgs]];
      commands.forEach(([kind, args]) => {
        if (kind === defaultKind) {
          args = __spreadValues(__spreadValues({}, defaultArgs), args);
          args.callback = args.callback || defaultArgs.callback;
        }
        this.filterToEls(view.liveSocket, sourceEl, args).forEach((el) => {
          this[`exec_${kind}`](e, eventType, phxEvent, view, sourceEl, el, args);
        });
      });
    },
    isVisible(el) {
      return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length > 0);
    },
    // returns true if any part of the element is inside the viewport
    isInViewport(el) {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;
      return rect.right > 0 && rect.bottom > 0 && rect.left < windowWidth && rect.top < windowHeight;
    },
    // private
    // commands
    exec_exec(e, eventType, phxEvent, view, sourceEl, el, { attr, to }) {
      let nodes = to ? dom_default.all(document, to) : [sourceEl];
      nodes.forEach((node) => {
        let encodedJS = node.getAttribute(attr);
        if (!encodedJS) {
          throw new Error(`expected ${attr} to contain JS command on "${to}"`);
        }
        view.liveSocket.execJS(node, encodedJS, eventType);
      });
    },
    exec_dispatch(e, eventType, phxEvent, view, sourceEl, el, { event, detail, bubbles }) {
      detail = detail || {};
      detail.dispatcher = sourceEl;
      dom_default.dispatchEvent(el, event, { detail, bubbles });
    },
    exec_push(e, eventType, phxEvent, view, sourceEl, el, args) {
      let { event, data, target, page_loading, loading, value, dispatcher, callback } = args;
      let pushOpts = { loading, value, target, page_loading: !!page_loading };
      let targetSrc = eventType === "change" && dispatcher ? dispatcher : sourceEl;
      let phxTarget = target || targetSrc.getAttribute(view.binding("target")) || targetSrc;
      view.withinTargets(phxTarget, (targetView, targetCtx) => {
        if (!targetView.isConnected()) {
          return;
        }
        if (eventType === "change") {
          let { newCid, _target } = args;
          _target = _target || (dom_default.isFormInput(sourceEl) ? sourceEl.name : void 0);
          if (_target) {
            pushOpts._target = _target;
          }
          targetView.pushInput(sourceEl, targetCtx, newCid, event || phxEvent, pushOpts, callback);
        } else if (eventType === "submit") {
          let { submitter } = args;
          targetView.submitForm(sourceEl, targetCtx, event || phxEvent, submitter, pushOpts, callback);
        } else {
          targetView.pushEvent(eventType, sourceEl, targetCtx, event || phxEvent, data, pushOpts, callback);
        }
      });
    },
    exec_navigate(e, eventType, phxEvent, view, sourceEl, el, { href, replace }) {
      view.liveSocket.historyRedirect(e, href, replace ? "replace" : "push", null, sourceEl);
    },
    exec_patch(e, eventType, phxEvent, view, sourceEl, el, { href, replace }) {
      view.liveSocket.pushHistoryPatch(e, href, replace ? "replace" : "push", sourceEl);
    },
    exec_focus(e, eventType, phxEvent, view, sourceEl, el) {
      window.requestAnimationFrame(() => aria_default.attemptFocus(el));
    },
    exec_focus_first(e, eventType, phxEvent, view, sourceEl, el) {
      window.requestAnimationFrame(() => aria_default.focusFirstInteractive(el) || aria_default.focusFirst(el));
    },
    exec_push_focus(e, eventType, phxEvent, view, sourceEl, el) {
      window.requestAnimationFrame(() => focusStack.push(el || sourceEl));
    },
    exec_pop_focus(_e, _eventType, _phxEvent, _view, _sourceEl, _el) {
      window.requestAnimationFrame(() => {
        const el = focusStack.pop();
        if (el) {
          el.focus();
        }
      });
    },
    exec_add_class(e, eventType, phxEvent, view, sourceEl, el, { names, transition, time, blocking }) {
      this.addOrRemoveClasses(el, names, [], transition, time, view, blocking);
    },
    exec_remove_class(e, eventType, phxEvent, view, sourceEl, el, { names, transition, time, blocking }) {
      this.addOrRemoveClasses(el, [], names, transition, time, view, blocking);
    },
    exec_toggle_class(e, eventType, phxEvent, view, sourceEl, el, { names, transition, time, blocking }) {
      this.toggleClasses(el, names, transition, time, view, blocking);
    },
    exec_toggle_attr(e, eventType, phxEvent, view, sourceEl, el, { attr: [attr, val1, val2] }) {
      this.toggleAttr(el, attr, val1, val2);
    },
    exec_transition(e, eventType, phxEvent, view, sourceEl, el, { time, transition, blocking }) {
      this.addOrRemoveClasses(el, [], [], transition, time, view, blocking);
    },
    exec_toggle(e, eventType, phxEvent, view, sourceEl, el, { display, ins, outs, time, blocking }) {
      this.toggle(eventType, view, el, display, ins, outs, time, blocking);
    },
    exec_show(e, eventType, phxEvent, view, sourceEl, el, { display, transition, time, blocking }) {
      this.show(eventType, view, el, display, transition, time, blocking);
    },
    exec_hide(e, eventType, phxEvent, view, sourceEl, el, { display, transition, time, blocking }) {
      this.hide(eventType, view, el, display, transition, time, blocking);
    },
    exec_set_attr(e, eventType, phxEvent, view, sourceEl, el, { attr: [attr, val] }) {
      this.setOrRemoveAttrs(el, [[attr, val]], []);
    },
    exec_remove_attr(e, eventType, phxEvent, view, sourceEl, el, { attr }) {
      this.setOrRemoveAttrs(el, [], [attr]);
    },
    // utils for commands
    show(eventType, view, el, display, transition, time, blocking) {
      if (!this.isVisible(el)) {
        this.toggle(eventType, view, el, display, transition, null, time, blocking);
      }
    },
    hide(eventType, view, el, display, transition, time, blocking) {
      if (this.isVisible(el)) {
        this.toggle(eventType, view, el, display, null, transition, time, blocking);
      }
    },
    toggle(eventType, view, el, display, ins, outs, time, blocking) {
      time = time || default_transition_time;
      let [inClasses, inStartClasses, inEndClasses] = ins || [[], [], []];
      let [outClasses, outStartClasses, outEndClasses] = outs || [[], [], []];
      if (inClasses.length > 0 || outClasses.length > 0) {
        if (this.isVisible(el)) {
          let onStart = () => {
            this.addOrRemoveClasses(el, outStartClasses, inClasses.concat(inStartClasses).concat(inEndClasses));
            window.requestAnimationFrame(() => {
              this.addOrRemoveClasses(el, outClasses, []);
              window.requestAnimationFrame(() => this.addOrRemoveClasses(el, outEndClasses, outStartClasses));
            });
          };
          let onEnd = () => {
            this.addOrRemoveClasses(el, [], outClasses.concat(outEndClasses));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = "none");
            el.dispatchEvent(new Event("phx:hide-end"));
          };
          el.dispatchEvent(new Event("phx:hide-start"));
          if (blocking === false) {
            onStart();
            setTimeout(onEnd, time);
          } else {
            view.transition(time, onStart, onEnd);
          }
        } else {
          if (eventType === "remove") {
            return;
          }
          let onStart = () => {
            this.addOrRemoveClasses(el, inStartClasses, outClasses.concat(outStartClasses).concat(outEndClasses));
            let stickyDisplay = display || this.defaultDisplay(el);
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = stickyDisplay);
            window.requestAnimationFrame(() => {
              this.addOrRemoveClasses(el, inClasses, []);
              window.requestAnimationFrame(() => this.addOrRemoveClasses(el, inEndClasses, inStartClasses));
            });
          };
          let onEnd = () => {
            this.addOrRemoveClasses(el, [], inClasses.concat(inEndClasses));
            el.dispatchEvent(new Event("phx:show-end"));
          };
          el.dispatchEvent(new Event("phx:show-start"));
          if (blocking === false) {
            onStart();
            setTimeout(onEnd, time);
          } else {
            view.transition(time, onStart, onEnd);
          }
        }
      } else {
        if (this.isVisible(el)) {
          window.requestAnimationFrame(() => {
            el.dispatchEvent(new Event("phx:hide-start"));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = "none");
            el.dispatchEvent(new Event("phx:hide-end"));
          });
        } else {
          window.requestAnimationFrame(() => {
            el.dispatchEvent(new Event("phx:show-start"));
            let stickyDisplay = display || this.defaultDisplay(el);
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = stickyDisplay);
            el.dispatchEvent(new Event("phx:show-end"));
          });
        }
      }
    },
    toggleClasses(el, classes, transition, time, view, blocking) {
      window.requestAnimationFrame(() => {
        let [prevAdds, prevRemoves] = dom_default.getSticky(el, "classes", [[], []]);
        let newAdds = classes.filter((name) => prevAdds.indexOf(name) < 0 && !el.classList.contains(name));
        let newRemoves = classes.filter((name) => prevRemoves.indexOf(name) < 0 && el.classList.contains(name));
        this.addOrRemoveClasses(el, newAdds, newRemoves, transition, time, view, blocking);
      });
    },
    toggleAttr(el, attr, val1, val2) {
      if (el.hasAttribute(attr)) {
        if (val2 !== void 0) {
          if (el.getAttribute(attr) === val1) {
            this.setOrRemoveAttrs(el, [[attr, val2]], []);
          } else {
            this.setOrRemoveAttrs(el, [[attr, val1]], []);
          }
        } else {
          this.setOrRemoveAttrs(el, [], [attr]);
        }
      } else {
        this.setOrRemoveAttrs(el, [[attr, val1]], []);
      }
    },
    addOrRemoveClasses(el, adds, removes, transition, time, view, blocking) {
      time = time || default_transition_time;
      let [transitionRun, transitionStart, transitionEnd] = transition || [[], [], []];
      if (transitionRun.length > 0) {
        let onStart = () => {
          this.addOrRemoveClasses(el, transitionStart, [].concat(transitionRun).concat(transitionEnd));
          window.requestAnimationFrame(() => {
            this.addOrRemoveClasses(el, transitionRun, []);
            window.requestAnimationFrame(() => this.addOrRemoveClasses(el, transitionEnd, transitionStart));
          });
        };
        let onDone = () => this.addOrRemoveClasses(el, adds.concat(transitionEnd), removes.concat(transitionRun).concat(transitionStart));
        if (blocking === false) {
          onStart();
          setTimeout(onDone, time);
        } else {
          view.transition(time, onStart, onDone);
        }
        return;
      }
      window.requestAnimationFrame(() => {
        let [prevAdds, prevRemoves] = dom_default.getSticky(el, "classes", [[], []]);
        let keepAdds = adds.filter((name) => prevAdds.indexOf(name) < 0 && !el.classList.contains(name));
        let keepRemoves = removes.filter((name) => prevRemoves.indexOf(name) < 0 && el.classList.contains(name));
        let newAdds = prevAdds.filter((name) => removes.indexOf(name) < 0).concat(keepAdds);
        let newRemoves = prevRemoves.filter((name) => adds.indexOf(name) < 0).concat(keepRemoves);
        dom_default.putSticky(el, "classes", (currentEl) => {
          currentEl.classList.remove(...newRemoves);
          currentEl.classList.add(...newAdds);
          return [newAdds, newRemoves];
        });
      });
    },
    setOrRemoveAttrs(el, sets, removes) {
      let [prevSets, prevRemoves] = dom_default.getSticky(el, "attrs", [[], []]);
      let alteredAttrs = sets.map(([attr, _val]) => attr).concat(removes);
      let newSets = prevSets.filter(([attr, _val]) => !alteredAttrs.includes(attr)).concat(sets);
      let newRemoves = prevRemoves.filter((attr) => !alteredAttrs.includes(attr)).concat(removes);
      dom_default.putSticky(el, "attrs", (currentEl) => {
        newRemoves.forEach((attr) => currentEl.removeAttribute(attr));
        newSets.forEach(([attr, val]) => currentEl.setAttribute(attr, val));
        return [newSets, newRemoves];
      });
    },
    hasAllClasses(el, classes) {
      return classes.every((name) => el.classList.contains(name));
    },
    isToggledOut(el, outClasses) {
      return !this.isVisible(el) || this.hasAllClasses(el, outClasses);
    },
    filterToEls(liveSocket2, sourceEl, { to }) {
      let defaultQuery = () => {
        if (typeof to === "string") {
          return document.querySelectorAll(to);
        } else if (to.closest) {
          let toEl = sourceEl.closest(to.closest);
          return toEl ? [toEl] : [];
        } else if (to.inner) {
          return sourceEl.querySelectorAll(to.inner);
        }
      };
      return to ? liveSocket2.jsQuerySelectorAll(sourceEl, to, defaultQuery) : [sourceEl];
    },
    defaultDisplay(el) {
      return { tr: "table-row", td: "table-cell" }[el.tagName.toLowerCase()] || "block";
    },
    transitionClasses(val) {
      if (!val) {
        return null;
      }
      let [trans, tStart, tEnd] = Array.isArray(val) ? val : [val.split(" "), [], []];
      trans = Array.isArray(trans) ? trans : trans.split(" ");
      tStart = Array.isArray(tStart) ? tStart : tStart.split(" ");
      tEnd = Array.isArray(tEnd) ? tEnd : tEnd.split(" ");
      return [trans, tStart, tEnd];
    }
  };
  var js_default = JS;
  var HOOK_ID = "hookId";
  var viewHookID = 1;
  var ViewHook = class {
    static makeID() {
      return viewHookID++;
    }
    static elementID(el) {
      return dom_default.private(el, HOOK_ID);
    }
    constructor(view, el, callbacks) {
      this.el = el;
      this.__attachView(view);
      this.__callbacks = callbacks;
      this.__listeners = /* @__PURE__ */ new Set();
      this.__isDisconnected = false;
      dom_default.putPrivate(this.el, HOOK_ID, this.constructor.makeID());
      for (let key in this.__callbacks) {
        this[key] = this.__callbacks[key];
      }
    }
    __attachView(view) {
      if (view) {
        this.__view = () => view;
        this.liveSocket = view.liveSocket;
      } else {
        this.__view = () => {
          throw new Error(`hook not yet attached to a live view: ${this.el.outerHTML}`);
        };
        this.liveSocket = null;
      }
    }
    __mounted() {
      this.mounted && this.mounted();
    }
    __updated() {
      this.updated && this.updated();
    }
    __beforeUpdate() {
      this.beforeUpdate && this.beforeUpdate();
    }
    __destroyed() {
      this.destroyed && this.destroyed();
      dom_default.deletePrivate(this.el, HOOK_ID);
    }
    __reconnected() {
      if (this.__isDisconnected) {
        this.__isDisconnected = false;
        this.reconnected && this.reconnected();
      }
    }
    __disconnected() {
      this.__isDisconnected = true;
      this.disconnected && this.disconnected();
    }
    /**
     * Binds the hook to JS commands.
     *
     * @param {ViewHook} hook - The ViewHook instance to bind.
     *
     * @returns {Object} An object with methods to manipulate the DOM and execute JavaScript.
     */
    js() {
      let hook = this;
      return {
        /**
         * Executes encoded JavaScript in the context of the hook element.
         *
         * @param {string} encodedJS - The encoded JavaScript string to execute.
         */
        exec(encodedJS) {
          hook.__view().liveSocket.execJS(hook.el, encodedJS, "hook");
        },
        /**
         * Shows an element.
         *
         * @param {HTMLElement} el - The element to show.
         * @param {Object} [opts={}] - Optional settings.
         * @param {string} [opts.display] - The CSS display value to set. Defaults "block".
         * @param {string} [opts.transition] - The CSS transition classes to set when showing.
         * @param {number} [opts.time] - The transition duration in milliseconds. Defaults 200.
         * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
         *  Defaults `true`.
         */
        show(el, opts = {}) {
          let owner = hook.__view().liveSocket.owner(el);
          js_default.show("hook", owner, el, opts.display, opts.transition, opts.time, opts.blocking);
        },
        /**
         * Hides an element.
         *
         * @param {HTMLElement} el - The element to hide.
         * @param {Object} [opts={}] - Optional settings.
         * @param {string} [opts.transition] - The CSS transition classes to set when hiding.
         * @param {number} [opts.time] - The transition duration in milliseconds. Defaults 200.
         * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
         *   Defaults `true`.
         */
        hide(el, opts = {}) {
          let owner = hook.__view().liveSocket.owner(el);
          js_default.hide("hook", owner, el, null, opts.transition, opts.time, opts.blocking);
        },
        /**
         * Toggles the visibility of an element.
         *
         * @param {HTMLElement} el - The element to toggle.
         * @param {Object} [opts={}] - Optional settings.
         * @param {string} [opts.display] - The CSS display value to set. Defaults "block".
         * @param {string} [opts.in] - The CSS transition classes for showing.
         *   Accepts either the string of classes to apply when toggling in, or
         *   a 3-tuple containing the transition class, the class to apply
         *   to start the transition, and the ending transition class, such as:
         *
         *       ["ease-out duration-300", "opacity-0", "opacity-100"]
         *
         * @param {string} [opts.out] - The CSS transition classes for hiding.
         *   Accepts either string of classes to apply when toggling out, or
         *   a 3-tuple containing the transition class, the class to apply
         *   to start the transition, and the ending transition class, such as:
         *
         *       ["ease-out duration-300", "opacity-100", "opacity-0"]
         *
         * @param {number} [opts.time] - The transition duration in milliseconds.
         *
         * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
         *   Defaults `true`.
         */
        toggle(el, opts = {}) {
          let owner = hook.__view().liveSocket.owner(el);
          opts.in = js_default.transitionClasses(opts.in);
          opts.out = js_default.transitionClasses(opts.out);
          js_default.toggle("hook", owner, el, opts.display, opts.in, opts.out, opts.time, opts.blocking);
        },
        /**
         * Adds CSS classes to an element.
         *
         * @param {HTMLElement} el - The element to add classes to.
         * @param {string|string[]} names - The class name(s) to add.
         * @param {Object} [opts={}] - Optional settings.
         * @param {string} [opts.transition] - The CSS transition property to set.
         *   Accepts a string of classes to apply when adding classes or
         *   a 3-tuple containing the transition class, the class to apply
         *   to start the transition, and the ending transition class, such as:
         *
         *       ["ease-out duration-300", "opacity-0", "opacity-100"]
         *
         * @param {number} [opts.time] - The transition duration in milliseconds.
         * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
         *   Defaults `true`.
         */
        addClass(el, names, opts = {}) {
          names = Array.isArray(names) ? names : names.split(" ");
          let owner = hook.__view().liveSocket.owner(el);
          js_default.addOrRemoveClasses(el, names, [], opts.transition, opts.time, owner, opts.blocking);
        },
        /**
         * Removes CSS classes from an element.
         *
         * @param {HTMLElement} el - The element to remove classes from.
         * @param {string|string[]} names - The class name(s) to remove.
         * @param {Object} [opts={}] - Optional settings.
         * @param {string} [opts.transition] - The CSS transition classes to set.
         *   Accepts a string of classes to apply when removing classes or
         *   a 3-tuple containing the transition class, the class to apply
         *   to start the transition, and the ending transition class, such as:
         *
         *       ["ease-out duration-300", "opacity-100", "opacity-0"]
         *
         * @param {number} [opts.time] - The transition duration in milliseconds.
         * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
         *   Defaults `true`.
         */
        removeClass(el, names, opts = {}) {
          opts.transition = js_default.transitionClasses(opts.transition);
          names = Array.isArray(names) ? names : names.split(" ");
          let owner = hook.__view().liveSocket.owner(el);
          js_default.addOrRemoveClasses(el, [], names, opts.transition, opts.time, owner, opts.blocking);
        },
        /**
         * Toggles CSS classes on an element.
         *
         * @param {HTMLElement} el - The element to toggle classes on.
         * @param {string|string[]} names - The class name(s) to toggle.
         * @param {Object} [opts={}] - Optional settings.
         * @param {string} [opts.transition] - The CSS transition classes to set.
         *   Accepts a string of classes to apply when toggling classes or
         *   a 3-tuple containing the transition class, the class to apply
         *   to start the transition, and the ending transition class, such as:
         *
         *       ["ease-out duration-300", "opacity-100", "opacity-0"]
         *
         * @param {number} [opts.time] - The transition duration in milliseconds.
         * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
         *   Defaults `true`.
         */
        toggleClass(el, names, opts = {}) {
          opts.transition = js_default.transitionClasses(opts.transition);
          names = Array.isArray(names) ? names : names.split(" ");
          let owner = hook.__view().liveSocket.owner(el);
          js_default.toggleClasses(el, names, opts.transition, opts.time, owner, opts.blocking);
        },
        /**
         * Applies a CSS transition to an element.
         *
         * @param {HTMLElement} el - The element to apply the transition to.
         * @param {string|string[]} transition - The transition class(es) to apply.
         *   Accepts a string of classes to apply when transitioning or
         *   a 3-tuple containing the transition class, the class to apply
         *   to start the transition, and the ending transition class, such as:
         *
         *       ["ease-out duration-300", "opacity-100", "opacity-0"]
         *
         * @param {Object} [opts={}] - Optional settings.
         * @param {number} [opts.time] - The transition duration in milliseconds.
         * @param {boolean} [opts.blocking] - The boolean flag to block the UI during the transition.
         *   Defaults `true`.
         */
        transition(el, transition, opts = {}) {
          let owner = hook.__view().liveSocket.owner(el);
          js_default.addOrRemoveClasses(el, [], [], js_default.transitionClasses(transition), opts.time, owner, opts.blocking);
        },
        /**
         * Sets an attribute on an element.
         *
         * @param {HTMLElement} el - The element to set the attribute on.
         * @param {string} attr - The attribute name to set.
         * @param {string} val - The value to set for the attribute.
         */
        setAttribute(el, attr, val) {
          js_default.setOrRemoveAttrs(el, [[attr, val]], []);
        },
        /**
         * Removes an attribute from an element.
         *
         * @param {HTMLElement} el - The element to remove the attribute from.
         * @param {string} attr - The attribute name to remove.
         */
        removeAttribute(el, attr) {
          js_default.setOrRemoveAttrs(el, [], [attr]);
        },
        /**
         * Toggles an attribute on an element between two values.
         *
         * @param {HTMLElement} el - The element to toggle the attribute on.
         * @param {string} attr - The attribute name to toggle.
         * @param {string} val1 - The first value to toggle between.
         * @param {string} val2 - The second value to toggle between.
         */
        toggleAttribute(el, attr, val1, val2) {
          js_default.toggleAttr(el, attr, val1, val2);
        }
      };
    }
    pushEvent(event, payload = {}, onReply) {
      if (onReply === void 0) {
        return new Promise((resolve, reject) => {
          try {
            const ref = this.__view().pushHookEvent(this.el, null, event, payload, (reply, _ref) => resolve(reply));
            if (ref === false) {
              reject(new Error("unable to push hook event. LiveView not connected"));
            }
          } catch (error) {
            reject(error);
          }
        });
      }
      return this.__view().pushHookEvent(this.el, null, event, payload, onReply);
    }
    pushEventTo(phxTarget, event, payload = {}, onReply) {
      if (onReply === void 0) {
        return new Promise((resolve, reject) => {
          try {
            this.__view().withinTargets(phxTarget, (view, targetCtx) => {
              const ref = view.pushHookEvent(this.el, targetCtx, event, payload, (reply, _ref) => resolve(reply));
              if (ref === false) {
                reject(new Error("unable to push hook event. LiveView not connected"));
              }
            });
          } catch (error) {
            reject(error);
          }
        });
      }
      return this.__view().withinTargets(phxTarget, (view, targetCtx) => {
        return view.pushHookEvent(this.el, targetCtx, event, payload, onReply);
      });
    }
    handleEvent(event, callback) {
      let callbackRef = (customEvent, bypass) => bypass ? event : callback(customEvent.detail);
      window.addEventListener(`phx:${event}`, callbackRef);
      this.__listeners.add(callbackRef);
      return callbackRef;
    }
    removeHandleEvent(callbackRef) {
      let event = callbackRef(null, true);
      window.removeEventListener(`phx:${event}`, callbackRef);
      this.__listeners.delete(callbackRef);
    }
    upload(name, files) {
      return this.__view().dispatchUploads(null, name, files);
    }
    uploadTo(phxTarget, name, files) {
      return this.__view().withinTargets(phxTarget, (view, targetCtx) => {
        view.dispatchUploads(targetCtx, name, files);
      });
    }
    __cleanup__() {
      this.__listeners.forEach((callbackRef) => this.removeHandleEvent(callbackRef));
    }
  };
  var prependFormDataKey = (key, prefix) => {
    let isArray = key.endsWith("[]");
    let baseKey = isArray ? key.slice(0, -2) : key;
    baseKey = baseKey.replace(/([^\[\]]+)(\]?$)/, `${prefix}$1$2`);
    if (isArray) {
      baseKey += "[]";
    }
    return baseKey;
  };
  var serializeForm = (form, metadata, onlyNames = []) => {
    const _a = metadata, { submitter } = _a, meta = __objRest(_a, ["submitter"]);
    let injectedElement;
    if (submitter && submitter.name) {
      const input = document.createElement("input");
      input.type = "hidden";
      const formId = submitter.getAttribute("form");
      if (formId) {
        input.setAttribute("form", formId);
      }
      input.name = submitter.name;
      input.value = submitter.value;
      submitter.parentElement.insertBefore(input, submitter);
      injectedElement = input;
    }
    const formData = new FormData(form);
    const toRemove = [];
    formData.forEach((val, key, _index) => {
      if (val instanceof File) {
        toRemove.push(key);
      }
    });
    toRemove.forEach((key) => formData.delete(key));
    const params = new URLSearchParams();
    let elements = Array.from(form.elements);
    for (let [key, val] of formData.entries()) {
      if (onlyNames.length === 0 || onlyNames.indexOf(key) >= 0) {
        let inputs = elements.filter((input) => input.name === key);
        let isUnused = !inputs.some((input) => dom_default.private(input, PHX_HAS_FOCUSED) || dom_default.private(input, PHX_HAS_SUBMITTED));
        let hidden = inputs.every((input) => input.type === "hidden");
        if (isUnused && !(submitter && submitter.name == key) && !hidden) {
          params.append(prependFormDataKey(key, "_unused_"), "");
        }
        params.append(key, val);
      }
    }
    if (submitter && injectedElement) {
      submitter.parentElement.removeChild(injectedElement);
    }
    for (let metaKey in meta) {
      params.append(metaKey, meta[metaKey]);
    }
    return params.toString();
  };
  var View = class _View {
    static closestView(el) {
      let liveViewEl = el.closest(PHX_VIEW_SELECTOR);
      return liveViewEl ? dom_default.private(liveViewEl, "view") : null;
    }
    constructor(el, liveSocket2, parentView, flash, liveReferer) {
      this.isDead = false;
      this.liveSocket = liveSocket2;
      this.flash = flash;
      this.parent = parentView;
      this.root = parentView ? parentView.root : this;
      this.el = el;
      dom_default.putPrivate(this.el, "view", this);
      this.id = this.el.id;
      this.ref = 0;
      this.lastAckRef = null;
      this.childJoins = 0;
      this.loaderTimer = null;
      this.pendingDiffs = [];
      this.pendingForms = /* @__PURE__ */ new Set();
      this.redirect = false;
      this.href = null;
      this.joinCount = this.parent ? this.parent.joinCount - 1 : 0;
      this.joinAttempts = 0;
      this.joinPending = true;
      this.destroyed = false;
      this.joinCallback = function(onDone) {
        onDone && onDone();
      };
      this.stopCallback = function() {
      };
      this.pendingJoinOps = this.parent ? null : [];
      this.viewHooks = {};
      this.formSubmits = [];
      this.children = this.parent ? null : {};
      this.root.children[this.id] = {};
      this.formsForRecovery = {};
      this.channel = this.liveSocket.channel(`lv:${this.id}`, () => {
        let url = this.href && this.expandURL(this.href);
        return {
          redirect: this.redirect ? url : void 0,
          url: this.redirect ? void 0 : url || void 0,
          params: this.connectParams(liveReferer),
          session: this.getSession(),
          static: this.getStatic(),
          flash: this.flash
        };
      });
    }
    setHref(href) {
      this.href = href;
    }
    setRedirect(href) {
      this.redirect = true;
      this.href = href;
    }
    isMain() {
      return this.el.hasAttribute(PHX_MAIN);
    }
    connectParams(liveReferer) {
      let params = this.liveSocket.params(this.el);
      let manifest = dom_default.all(document, `[${this.binding(PHX_TRACK_STATIC)}]`).map((node) => node.src || node.href).filter((url) => typeof url === "string");
      if (manifest.length > 0) {
        params["_track_static"] = manifest;
      }
      params["_mounts"] = this.joinCount;
      params["_mount_attempts"] = this.joinAttempts;
      params["_live_referer"] = liveReferer;
      this.joinAttempts++;
      return params;
    }
    isConnected() {
      return this.channel.canPush();
    }
    getSession() {
      return this.el.getAttribute(PHX_SESSION);
    }
    getStatic() {
      let val = this.el.getAttribute(PHX_STATIC);
      return val === "" ? null : val;
    }
    destroy(callback = function() {
    }) {
      this.destroyAllChildren();
      this.destroyed = true;
      delete this.root.children[this.id];
      if (this.parent) {
        delete this.root.children[this.parent.id][this.id];
      }
      clearTimeout(this.loaderTimer);
      let onFinished = () => {
        callback();
        for (let id in this.viewHooks) {
          this.destroyHook(this.viewHooks[id]);
        }
      };
      dom_default.markPhxChildDestroyed(this.el);
      this.log("destroyed", () => ["the child has been removed from the parent"]);
      this.channel.leave().receive("ok", onFinished).receive("error", onFinished).receive("timeout", onFinished);
    }
    setContainerClasses(...classes) {
      this.el.classList.remove(
        PHX_CONNECTED_CLASS,
        PHX_LOADING_CLASS,
        PHX_ERROR_CLASS,
        PHX_CLIENT_ERROR_CLASS,
        PHX_SERVER_ERROR_CLASS
      );
      this.el.classList.add(...classes);
    }
    showLoader(timeout) {
      clearTimeout(this.loaderTimer);
      if (timeout) {
        this.loaderTimer = setTimeout(() => this.showLoader(), timeout);
      } else {
        for (let id in this.viewHooks) {
          this.viewHooks[id].__disconnected();
        }
        this.setContainerClasses(PHX_LOADING_CLASS);
      }
    }
    execAll(binding) {
      dom_default.all(this.el, `[${binding}]`, (el) => this.liveSocket.execJS(el, el.getAttribute(binding)));
    }
    hideLoader() {
      clearTimeout(this.loaderTimer);
      this.setContainerClasses(PHX_CONNECTED_CLASS);
      this.execAll(this.binding("connected"));
    }
    triggerReconnected() {
      for (let id in this.viewHooks) {
        this.viewHooks[id].__reconnected();
      }
    }
    log(kind, msgCallback) {
      this.liveSocket.log(this, kind, msgCallback);
    }
    transition(time, onStart, onDone = function() {
    }) {
      this.liveSocket.transition(time, onStart, onDone);
    }
    // calls the callback with the view and target element for the given phxTarget
    // targets can be:
    //  * an element itself, then it is simply passed to liveSocket.owner;
    //  * a CID (Component ID), then we first search the component's element in the DOM
    //  * a selector, then we search the selector in the DOM and call the callback
    //    for each element found with the corresponding owner view
    withinTargets(phxTarget, callback, dom = document, viewEl) {
      if (phxTarget instanceof HTMLElement || phxTarget instanceof SVGElement) {
        return this.liveSocket.owner(phxTarget, (view) => callback(view, phxTarget));
      }
      if (isCid(phxTarget)) {
        let targets = dom_default.findComponentNodeList(viewEl || this.el, phxTarget);
        if (targets.length === 0) {
          logError(`no component found matching phx-target of ${phxTarget}`);
        } else {
          callback(this, parseInt(phxTarget));
        }
      } else {
        let targets = Array.from(dom.querySelectorAll(phxTarget));
        if (targets.length === 0) {
          logError(`nothing found matching the phx-target selector "${phxTarget}"`);
        }
        targets.forEach((target) => this.liveSocket.owner(target, (view) => callback(view, target)));
      }
    }
    applyDiff(type, rawDiff, callback) {
      this.log(type, () => ["", clone(rawDiff)]);
      let { diff, reply, events, title } = Rendered.extract(rawDiff);
      callback({ diff, reply, events });
      if (typeof title === "string" || type == "mount") {
        window.requestAnimationFrame(() => dom_default.putTitle(title));
      }
    }
    onJoin(resp) {
      let { rendered, container, liveview_version } = resp;
      if (container) {
        let [tag, attrs] = container;
        this.el = dom_default.replaceRootContainer(this.el, tag, attrs);
      }
      this.childJoins = 0;
      this.joinPending = true;
      this.flash = null;
      if (this.root === this) {
        this.formsForRecovery = this.getFormsForRecovery();
      }
      if (this.isMain() && window.history.state === null) {
        this.liveSocket.replaceRootHistory();
      }
      if (liveview_version !== this.liveSocket.version()) {
        console.error(`LiveView asset version mismatch. JavaScript version ${this.liveSocket.version()} vs. server ${liveview_version}. To avoid issues, please ensure that your assets use the same version as the server.`);
      }
      browser_default.dropLocal(this.liveSocket.localStorage, window.location.pathname, CONSECUTIVE_RELOADS);
      this.applyDiff("mount", rendered, ({ diff, events }) => {
        this.rendered = new Rendered(this.id, diff);
        let [html, streams] = this.renderContainer(null, "join");
        this.dropPendingRefs();
        this.joinCount++;
        this.joinAttempts = 0;
        this.maybeRecoverForms(html, () => {
          this.onJoinComplete(resp, html, streams, events);
        });
      });
    }
    dropPendingRefs() {
      dom_default.all(document, `[${PHX_REF_SRC}="${this.refSrc()}"]`, (el) => {
        el.removeAttribute(PHX_REF_LOADING);
        el.removeAttribute(PHX_REF_SRC);
        el.removeAttribute(PHX_REF_LOCK);
      });
    }
    onJoinComplete({ live_patch }, html, streams, events) {
      if (this.joinCount > 1 || this.parent && !this.parent.isJoinPending()) {
        return this.applyJoinPatch(live_patch, html, streams, events);
      }
      let newChildren = dom_default.findPhxChildrenInFragment(html, this.id).filter((toEl) => {
        let fromEl = toEl.id && this.el.querySelector(`[id="${toEl.id}"]`);
        let phxStatic = fromEl && fromEl.getAttribute(PHX_STATIC);
        if (phxStatic) {
          toEl.setAttribute(PHX_STATIC, phxStatic);
        }
        if (fromEl) {
          fromEl.setAttribute(PHX_ROOT_ID, this.root.id);
        }
        return this.joinChild(toEl);
      });
      if (newChildren.length === 0) {
        if (this.parent) {
          this.root.pendingJoinOps.push([this, () => this.applyJoinPatch(live_patch, html, streams, events)]);
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
          this.applyJoinPatch(live_patch, html, streams, events);
        }
      } else {
        this.root.pendingJoinOps.push([this, () => this.applyJoinPatch(live_patch, html, streams, events)]);
      }
    }
    attachTrueDocEl() {
      this.el = dom_default.byId(this.id);
      this.el.setAttribute(PHX_ROOT_ID, this.root.id);
    }
    // this is invoked for dead and live views, so we must filter by
    // by owner to ensure we aren't duplicating hooks across disconnect
    // and connected states. This also handles cases where hooks exist
    // in a root layout with a LV in the body
    execNewMounted(parent = this.el) {
      let phxViewportTop = this.binding(PHX_VIEWPORT_TOP);
      let phxViewportBottom = this.binding(PHX_VIEWPORT_BOTTOM);
      dom_default.all(parent, `[${phxViewportTop}], [${phxViewportBottom}]`, (hookEl) => {
        if (this.ownsElement(hookEl)) {
          dom_default.maintainPrivateHooks(hookEl, hookEl, phxViewportTop, phxViewportBottom);
          this.maybeAddNewHook(hookEl);
        }
      });
      dom_default.all(parent, `[${this.binding(PHX_HOOK)}], [data-phx-${PHX_HOOK}]`, (hookEl) => {
        if (this.ownsElement(hookEl)) {
          this.maybeAddNewHook(hookEl);
        }
      });
      dom_default.all(parent, `[${this.binding(PHX_MOUNTED)}]`, (el) => {
        if (this.ownsElement(el)) {
          this.maybeMounted(el);
        }
      });
    }
    applyJoinPatch(live_patch, html, streams, events) {
      this.attachTrueDocEl();
      let patch = new DOMPatch(this, this.el, this.id, html, streams, null);
      patch.markPrunableContentForRemoval();
      this.performPatch(patch, false, true);
      this.joinNewChildren();
      this.execNewMounted();
      this.joinPending = false;
      this.liveSocket.dispatchEvents(events);
      this.applyPendingUpdates();
      if (live_patch) {
        let { kind, to } = live_patch;
        this.liveSocket.historyPatch(to, kind);
      }
      this.hideLoader();
      if (this.joinCount > 1) {
        this.triggerReconnected();
      }
      this.stopCallback();
    }
    triggerBeforeUpdateHook(fromEl, toEl) {
      this.liveSocket.triggerDOM("onBeforeElUpdated", [fromEl, toEl]);
      let hook = this.getHook(fromEl);
      let isIgnored = hook && dom_default.isIgnored(fromEl, this.binding(PHX_UPDATE));
      if (hook && !fromEl.isEqualNode(toEl) && !(isIgnored && isEqualObj(fromEl.dataset, toEl.dataset))) {
        hook.__beforeUpdate();
        return hook;
      }
    }
    maybeMounted(el) {
      let phxMounted = el.getAttribute(this.binding(PHX_MOUNTED));
      let hasBeenInvoked = phxMounted && dom_default.private(el, "mounted");
      if (phxMounted && !hasBeenInvoked) {
        this.liveSocket.execJS(el, phxMounted);
        dom_default.putPrivate(el, "mounted", true);
      }
    }
    maybeAddNewHook(el) {
      let newHook = this.addHook(el);
      if (newHook) {
        newHook.__mounted();
      }
    }
    performPatch(patch, pruneCids, isJoinPatch = false) {
      let removedEls = [];
      let phxChildrenAdded = false;
      let updatedHookIds = /* @__PURE__ */ new Set();
      this.liveSocket.triggerDOM("onPatchStart", [patch.targetContainer]);
      patch.after("added", (el) => {
        this.liveSocket.triggerDOM("onNodeAdded", [el]);
        let phxViewportTop = this.binding(PHX_VIEWPORT_TOP);
        let phxViewportBottom = this.binding(PHX_VIEWPORT_BOTTOM);
        dom_default.maintainPrivateHooks(el, el, phxViewportTop, phxViewportBottom);
        this.maybeAddNewHook(el);
        if (el.getAttribute) {
          this.maybeMounted(el);
        }
      });
      patch.after("phxChildAdded", (el) => {
        if (dom_default.isPhxSticky(el)) {
          this.liveSocket.joinRootViews();
        } else {
          phxChildrenAdded = true;
        }
      });
      patch.before("updated", (fromEl, toEl) => {
        let hook = this.triggerBeforeUpdateHook(fromEl, toEl);
        if (hook) {
          updatedHookIds.add(fromEl.id);
        }
      });
      patch.after("updated", (el) => {
        if (updatedHookIds.has(el.id)) {
          this.getHook(el).__updated();
        }
      });
      patch.after("discarded", (el) => {
        if (el.nodeType === Node.ELEMENT_NODE) {
          removedEls.push(el);
        }
      });
      patch.after("transitionsDiscarded", (els) => this.afterElementsRemoved(els, pruneCids));
      patch.perform(isJoinPatch);
      this.afterElementsRemoved(removedEls, pruneCids);
      this.liveSocket.triggerDOM("onPatchEnd", [patch.targetContainer]);
      return phxChildrenAdded;
    }
    afterElementsRemoved(elements, pruneCids) {
      let destroyedCIDs = [];
      elements.forEach((parent) => {
        let components = dom_default.all(parent, `[${PHX_COMPONENT}]`);
        let hooks = dom_default.all(parent, `[${this.binding(PHX_HOOK)}], [data-phx-hook]`);
        components.concat(parent).forEach((el) => {
          let cid = this.componentID(el);
          if (isCid(cid) && destroyedCIDs.indexOf(cid) === -1) {
            destroyedCIDs.push(cid);
          }
        });
        hooks.concat(parent).forEach((hookEl) => {
          let hook = this.getHook(hookEl);
          hook && this.destroyHook(hook);
        });
      });
      if (pruneCids) {
        this.maybePushComponentsDestroyed(destroyedCIDs);
      }
    }
    joinNewChildren() {
      dom_default.findPhxChildren(this.el, this.id).forEach((el) => this.joinChild(el));
    }
    maybeRecoverForms(html, callback) {
      const phxChange = this.binding("change");
      const oldForms = this.root.formsForRecovery;
      let template = document.createElement("template");
      template.innerHTML = html;
      const rootEl = template.content.firstElementChild;
      rootEl.id = this.id;
      rootEl.setAttribute(PHX_ROOT_ID, this.root.id);
      rootEl.setAttribute(PHX_SESSION, this.getSession());
      rootEl.setAttribute(PHX_STATIC, this.getStatic());
      rootEl.setAttribute(PHX_PARENT_ID, this.parent ? this.parent.id : null);
      const formsToRecover = (
        // we go over all forms in the new DOM; because this is only the HTML for the current
        // view, we can be sure that all forms are owned by this view:
        dom_default.all(template.content, "form").filter((newForm) => newForm.id && oldForms[newForm.id]).filter((newForm) => !this.pendingForms.has(newForm.id)).filter((newForm) => oldForms[newForm.id].getAttribute(phxChange) === newForm.getAttribute(phxChange)).map((newForm) => {
          return [oldForms[newForm.id], newForm];
        })
      );
      if (formsToRecover.length === 0) {
        return callback();
      }
      formsToRecover.forEach(([oldForm, newForm], i2) => {
        this.pendingForms.add(newForm.id);
        this.pushFormRecovery(oldForm, newForm, template.content.firstElementChild, () => {
          this.pendingForms.delete(newForm.id);
          if (i2 === formsToRecover.length - 1) {
            callback();
          }
        });
      });
    }
    getChildById(id) {
      return this.root.children[this.id][id];
    }
    getDescendentByEl(el) {
      var _a;
      if (el.id === this.id) {
        return this;
      } else {
        return (_a = this.children[el.getAttribute(PHX_PARENT_ID)]) == null ? void 0 : _a[el.id];
      }
    }
    destroyDescendent(id) {
      for (let parentId in this.root.children) {
        for (let childId in this.root.children[parentId]) {
          if (childId === id) {
            return this.root.children[parentId][childId].destroy();
          }
        }
      }
    }
    joinChild(el) {
      let child = this.getChildById(el.id);
      if (!child) {
        let view = new _View(el, this.liveSocket, this);
        this.root.children[this.id][view.id] = view;
        view.join();
        this.childJoins++;
        return true;
      }
    }
    isJoinPending() {
      return this.joinPending;
    }
    ackJoin(_child) {
      this.childJoins--;
      if (this.childJoins === 0) {
        if (this.parent) {
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
        }
      }
    }
    onAllChildJoinsComplete() {
      this.pendingForms.clear();
      this.formsForRecovery = {};
      this.joinCallback(() => {
        this.pendingJoinOps.forEach(([view, op]) => {
          if (!view.isDestroyed()) {
            op();
          }
        });
        this.pendingJoinOps = [];
      });
    }
    update(diff, events) {
      if (this.isJoinPending() || this.liveSocket.hasPendingLink() && this.root.isMain()) {
        return this.pendingDiffs.push({ diff, events });
      }
      this.rendered.mergeDiff(diff);
      let phxChildrenAdded = false;
      if (this.rendered.isComponentOnlyDiff(diff)) {
        this.liveSocket.time("component patch complete", () => {
          let parentCids = dom_default.findExistingParentCIDs(this.el, this.rendered.componentCIDs(diff));
          parentCids.forEach((parentCID) => {
            if (this.componentPatch(this.rendered.getComponent(diff, parentCID), parentCID)) {
              phxChildrenAdded = true;
            }
          });
        });
      } else if (!isEmpty(diff)) {
        this.liveSocket.time("full patch complete", () => {
          let [html, streams] = this.renderContainer(diff, "update");
          let patch = new DOMPatch(this, this.el, this.id, html, streams, null);
          phxChildrenAdded = this.performPatch(patch, true);
        });
      }
      this.liveSocket.dispatchEvents(events);
      if (phxChildrenAdded) {
        this.joinNewChildren();
      }
    }
    renderContainer(diff, kind) {
      return this.liveSocket.time(`toString diff (${kind})`, () => {
        let tag = this.el.tagName;
        let cids = diff ? this.rendered.componentCIDs(diff) : null;
        let [html, streams] = this.rendered.toString(cids);
        return [`<${tag}>${html}</${tag}>`, streams];
      });
    }
    componentPatch(diff, cid) {
      if (isEmpty(diff))
        return false;
      let [html, streams] = this.rendered.componentToString(cid);
      let patch = new DOMPatch(this, this.el, this.id, html, streams, cid);
      let childrenAdded = this.performPatch(patch, true);
      return childrenAdded;
    }
    getHook(el) {
      return this.viewHooks[ViewHook.elementID(el)];
    }
    addHook(el) {
      let hookElId = ViewHook.elementID(el);
      if (hookElId && !this.viewHooks[hookElId]) {
        let hook = dom_default.getCustomElHook(el) || logError(`no hook found for custom element: ${el.id}`);
        this.viewHooks[hookElId] = hook;
        hook.__attachView(this);
        return hook;
      } else if (hookElId || !el.getAttribute) {
        return;
      } else {
        let hookName = el.getAttribute(`data-phx-${PHX_HOOK}`) || el.getAttribute(this.binding(PHX_HOOK));
        if (hookName && !this.ownsElement(el)) {
          return;
        }
        let callbacks = this.liveSocket.getHookCallbacks(hookName);
        if (callbacks) {
          if (!el.id) {
            logError(`no DOM ID for hook "${hookName}". Hooks require a unique ID on each element.`, el);
          }
          let hook = new ViewHook(this, el, callbacks);
          this.viewHooks[ViewHook.elementID(hook.el)] = hook;
          return hook;
        } else if (hookName !== null) {
          logError(`unknown hook found for "${hookName}"`, el);
        }
      }
    }
    destroyHook(hook) {
      hook.__destroyed();
      hook.__cleanup__();
      delete this.viewHooks[ViewHook.elementID(hook.el)];
    }
    applyPendingUpdates() {
      this.pendingDiffs.forEach(({ diff, events }) => this.update(diff, events));
      this.pendingDiffs = [];
      this.eachChild((child) => child.applyPendingUpdates());
    }
    eachChild(callback) {
      let children = this.root.children[this.id] || {};
      for (let id in children) {
        callback(this.getChildById(id));
      }
    }
    onChannel(event, cb) {
      this.liveSocket.onChannel(this.channel, event, (resp) => {
        if (this.isJoinPending()) {
          this.root.pendingJoinOps.push([this, () => cb(resp)]);
        } else {
          this.liveSocket.requestDOMUpdate(() => cb(resp));
        }
      });
    }
    bindChannel() {
      this.liveSocket.onChannel(this.channel, "diff", (rawDiff) => {
        this.liveSocket.requestDOMUpdate(() => {
          this.applyDiff("update", rawDiff, ({ diff, events }) => this.update(diff, events));
        });
      });
      this.onChannel("redirect", ({ to, flash }) => this.onRedirect({ to, flash }));
      this.onChannel("live_patch", (redir) => this.onLivePatch(redir));
      this.onChannel("live_redirect", (redir) => this.onLiveRedirect(redir));
      this.channel.onError((reason) => this.onError(reason));
      this.channel.onClose((reason) => this.onClose(reason));
    }
    destroyAllChildren() {
      this.eachChild((child) => child.destroy());
    }
    onLiveRedirect(redir) {
      let { to, kind, flash } = redir;
      let url = this.expandURL(to);
      let e = new CustomEvent("phx:server-navigate", { detail: { to, kind, flash } });
      this.liveSocket.historyRedirect(e, url, kind, flash);
    }
    onLivePatch(redir) {
      let { to, kind } = redir;
      this.href = this.expandURL(to);
      this.liveSocket.historyPatch(to, kind);
    }
    expandURL(to) {
      return to.startsWith("/") ? `${window.location.protocol}//${window.location.host}${to}` : to;
    }
    onRedirect({ to, flash, reloadToken }) {
      this.liveSocket.redirect(to, flash, reloadToken);
    }
    isDestroyed() {
      return this.destroyed;
    }
    joinDead() {
      this.isDead = true;
    }
    joinPush() {
      this.joinPush = this.joinPush || this.channel.join();
      return this.joinPush;
    }
    join(callback) {
      this.showLoader(this.liveSocket.loaderTimeout);
      this.bindChannel();
      if (this.isMain()) {
        this.stopCallback = this.liveSocket.withPageLoading({ to: this.href, kind: "initial" });
      }
      this.joinCallback = (onDone) => {
        onDone = onDone || function() {
        };
        callback ? callback(this.joinCount, onDone) : onDone();
      };
      this.wrapPush(() => this.channel.join(), {
        ok: (resp) => this.liveSocket.requestDOMUpdate(() => this.onJoin(resp)),
        error: (error) => this.onJoinError(error),
        timeout: () => this.onJoinError({ reason: "timeout" })
      });
    }
    onJoinError(resp) {
      if (resp.reason === "reload") {
        this.log("error", () => [`failed mount with ${resp.status}. Falling back to page reload`, resp]);
        this.onRedirect({ to: this.root.href, reloadToken: resp.token });
        return;
      } else if (resp.reason === "unauthorized" || resp.reason === "stale") {
        this.log("error", () => ["unauthorized live_redirect. Falling back to page request", resp]);
        this.onRedirect({ to: this.root.href });
        return;
      }
      if (resp.redirect || resp.live_redirect) {
        this.joinPending = false;
        this.channel.leave();
      }
      if (resp.redirect) {
        return this.onRedirect(resp.redirect);
      }
      if (resp.live_redirect) {
        return this.onLiveRedirect(resp.live_redirect);
      }
      this.log("error", () => ["unable to join", resp]);
      if (this.isMain()) {
        this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS]);
        if (this.liveSocket.isConnected()) {
          this.liveSocket.reloadWithJitter(this);
        }
      } else {
        if (this.joinAttempts >= MAX_CHILD_JOIN_ATTEMPTS) {
          this.root.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS]);
          this.log("error", () => [`giving up trying to mount after ${MAX_CHILD_JOIN_ATTEMPTS} tries`, resp]);
          this.destroy();
        }
        let trueChildEl = dom_default.byId(this.el.id);
        if (trueChildEl) {
          dom_default.mergeAttrs(trueChildEl, this.el);
          this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS]);
          this.el = trueChildEl;
        } else {
          this.destroy();
        }
      }
    }
    onClose(reason) {
      if (this.isDestroyed()) {
        return;
      }
      if (this.isMain() && this.liveSocket.hasPendingLink() && reason !== "leave") {
        return this.liveSocket.reloadWithJitter(this);
      }
      this.destroyAllChildren();
      this.liveSocket.dropActiveElement(this);
      if (document.activeElement) {
        document.activeElement.blur();
      }
      if (this.liveSocket.isUnloaded()) {
        this.showLoader(BEFORE_UNLOAD_LOADER_TIMEOUT);
      }
    }
    onError(reason) {
      this.onClose(reason);
      if (this.liveSocket.isConnected()) {
        this.log("error", () => ["view crashed", reason]);
      }
      if (!this.liveSocket.isUnloaded()) {
        if (this.liveSocket.isConnected()) {
          this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS]);
        } else {
          this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_CLIENT_ERROR_CLASS]);
        }
      }
    }
    displayError(classes) {
      if (this.isMain()) {
        dom_default.dispatchEvent(window, "phx:page-loading-start", { detail: { to: this.href, kind: "error" } });
      }
      this.showLoader();
      this.setContainerClasses(...classes);
      this.execAll(this.binding("disconnected"));
    }
    wrapPush(callerPush, receives) {
      let latency = this.liveSocket.getLatencySim();
      let withLatency = latency ? (cb) => setTimeout(() => !this.isDestroyed() && cb(), latency) : (cb) => !this.isDestroyed() && cb();
      withLatency(() => {
        callerPush().receive("ok", (resp) => withLatency(() => receives.ok && receives.ok(resp))).receive("error", (reason) => withLatency(() => receives.error && receives.error(reason))).receive("timeout", () => withLatency(() => receives.timeout && receives.timeout()));
      });
    }
    pushWithReply(refGenerator, event, payload) {
      if (!this.isConnected()) {
        return Promise.reject({ error: "noconnection" });
      }
      let [ref, [el], opts] = refGenerator ? refGenerator() : [null, [], {}];
      let oldJoinCount = this.joinCount;
      let onLoadingDone = function() {
      };
      if (opts.page_loading) {
        onLoadingDone = this.liveSocket.withPageLoading({ kind: "element", target: el });
      }
      if (typeof payload.cid !== "number") {
        delete payload.cid;
      }
      return new Promise((resolve, reject) => {
        this.wrapPush(() => this.channel.push(event, payload, PUSH_TIMEOUT), {
          ok: (resp) => {
            if (ref !== null) {
              this.lastAckRef = ref;
            }
            let finish = (hookReply) => {
              if (resp.redirect) {
                this.onRedirect(resp.redirect);
              }
              if (resp.live_patch) {
                this.onLivePatch(resp.live_patch);
              }
              if (resp.live_redirect) {
                this.onLiveRedirect(resp.live_redirect);
              }
              onLoadingDone();
              resolve({ resp, reply: hookReply });
            };
            if (resp.diff) {
              this.liveSocket.requestDOMUpdate(() => {
                this.applyDiff("update", resp.diff, ({ diff, reply, events }) => {
                  if (ref !== null) {
                    this.undoRefs(ref, payload.event);
                  }
                  this.update(diff, events);
                  finish(reply);
                });
              });
            } else {
              if (ref !== null) {
                this.undoRefs(ref, payload.event);
              }
              finish(null);
            }
          },
          error: (reason) => reject({ error: reason }),
          timeout: () => {
            reject({ timeout: true });
            if (this.joinCount === oldJoinCount) {
              this.liveSocket.reloadWithJitter(this, () => {
                this.log("timeout", () => ["received timeout while communicating with server. Falling back to hard refresh for recovery"]);
              });
            }
          }
        });
      });
    }
    undoRefs(ref, phxEvent, onlyEls) {
      if (!this.isConnected()) {
        return;
      }
      let selector = `[${PHX_REF_SRC}="${this.refSrc()}"]`;
      if (onlyEls) {
        onlyEls = new Set(onlyEls);
        dom_default.all(document, selector, (parent) => {
          if (onlyEls && !onlyEls.has(parent)) {
            return;
          }
          dom_default.all(parent, selector, (child) => this.undoElRef(child, ref, phxEvent));
          this.undoElRef(parent, ref, phxEvent);
        });
      } else {
        dom_default.all(document, selector, (el) => this.undoElRef(el, ref, phxEvent));
      }
    }
    undoElRef(el, ref, phxEvent) {
      let elRef = new ElementRef(el);
      elRef.maybeUndo(ref, phxEvent, (clonedTree) => {
        let hook = this.triggerBeforeUpdateHook(el, clonedTree);
        DOMPatch.patchWithClonedTree(el, clonedTree, this.liveSocket);
        dom_default.all(el, `[${PHX_REF_SRC}="${this.refSrc()}"]`, (child) => this.undoElRef(child, ref, phxEvent));
        this.execNewMounted(el);
        if (hook) {
          hook.__updated();
        }
      });
    }
    refSrc() {
      return this.el.id;
    }
    putRef(elements, phxEvent, eventType, opts = {}) {
      let newRef = this.ref++;
      let disableWith = this.binding(PHX_DISABLE_WITH);
      if (opts.loading) {
        let loadingEls = dom_default.all(document, opts.loading).map((el) => {
          return { el, lock: true, loading: true };
        });
        elements = elements.concat(loadingEls);
      }
      for (let { el, lock, loading } of elements) {
        if (!lock && !loading) {
          throw new Error("putRef requires lock or loading");
        }
        el.setAttribute(PHX_REF_SRC, this.refSrc());
        if (loading) {
          el.setAttribute(PHX_REF_LOADING, newRef);
        }
        if (lock) {
          el.setAttribute(PHX_REF_LOCK, newRef);
        }
        if (!loading || opts.submitter && !(el === opts.submitter || el === opts.form)) {
          continue;
        }
        let lockCompletePromise = new Promise((resolve) => {
          el.addEventListener(`phx:undo-lock:${newRef}`, () => resolve(detail), { once: true });
        });
        let loadingCompletePromise = new Promise((resolve) => {
          el.addEventListener(`phx:undo-loading:${newRef}`, () => resolve(detail), { once: true });
        });
        el.classList.add(`phx-${eventType}-loading`);
        let disableText = el.getAttribute(disableWith);
        if (disableText !== null) {
          if (!el.getAttribute(PHX_DISABLE_WITH_RESTORE)) {
            el.setAttribute(PHX_DISABLE_WITH_RESTORE, el.innerText);
          }
          if (disableText !== "") {
            el.innerText = disableText;
          }
          el.setAttribute(PHX_DISABLED, el.getAttribute(PHX_DISABLED) || el.disabled);
          el.setAttribute("disabled", "");
        }
        let detail = {
          event: phxEvent,
          eventType,
          ref: newRef,
          isLoading: loading,
          isLocked: lock,
          lockElements: elements.filter(({ lock: lock2 }) => lock2).map(({ el: el2 }) => el2),
          loadingElements: elements.filter(({ loading: loading2 }) => loading2).map(({ el: el2 }) => el2),
          unlock: (els) => {
            els = Array.isArray(els) ? els : [els];
            this.undoRefs(newRef, phxEvent, els);
          },
          lockComplete: lockCompletePromise,
          loadingComplete: loadingCompletePromise,
          lock: (lockEl) => {
            return new Promise((resolve) => {
              if (this.isAcked(newRef)) {
                return resolve(detail);
              }
              lockEl.setAttribute(PHX_REF_LOCK, newRef);
              lockEl.setAttribute(PHX_REF_SRC, this.refSrc());
              lockEl.addEventListener(`phx:lock-stop:${newRef}`, () => resolve(detail), { once: true });
            });
          }
        };
        el.dispatchEvent(new CustomEvent("phx:push", {
          detail,
          bubbles: true,
          cancelable: false
        }));
        if (phxEvent) {
          el.dispatchEvent(new CustomEvent(`phx:push:${phxEvent}`, {
            detail,
            bubbles: true,
            cancelable: false
          }));
        }
      }
      return [newRef, elements.map(({ el }) => el), opts];
    }
    isAcked(ref) {
      return this.lastAckRef !== null && this.lastAckRef >= ref;
    }
    componentID(el) {
      let cid = el.getAttribute && el.getAttribute(PHX_COMPONENT);
      return cid ? parseInt(cid) : null;
    }
    targetComponentID(target, targetCtx, opts = {}) {
      if (isCid(targetCtx)) {
        return targetCtx;
      }
      let cidOrSelector = opts.target || target.getAttribute(this.binding("target"));
      if (isCid(cidOrSelector)) {
        return parseInt(cidOrSelector);
      } else if (targetCtx && (cidOrSelector !== null || opts.target)) {
        return this.closestComponentID(targetCtx);
      } else {
        return null;
      }
    }
    closestComponentID(targetCtx) {
      if (isCid(targetCtx)) {
        return targetCtx;
      } else if (targetCtx) {
        return maybe(targetCtx.closest(`[${PHX_COMPONENT}]`), (el) => this.ownsElement(el) && this.componentID(el));
      } else {
        return null;
      }
    }
    pushHookEvent(el, targetCtx, event, payload, onReply) {
      if (!this.isConnected()) {
        this.log("hook", () => ["unable to push hook event. LiveView not connected", event, payload]);
        return false;
      }
      let [ref, els, opts] = this.putRef([{ el, loading: true, lock: true }], event, "hook");
      this.pushWithReply(() => [ref, els, opts], "event", {
        type: "hook",
        event,
        value: payload,
        cid: this.closestComponentID(targetCtx)
      }).then(({ resp: _resp, reply: hookReply }) => onReply(hookReply, ref));
      return ref;
    }
    extractMeta(el, meta, value) {
      let prefix = this.binding("value-");
      for (let i2 = 0; i2 < el.attributes.length; i2++) {
        if (!meta) {
          meta = {};
        }
        let name = el.attributes[i2].name;
        if (name.startsWith(prefix)) {
          meta[name.replace(prefix, "")] = el.getAttribute(name);
        }
      }
      if (el.value !== void 0 && !(el instanceof HTMLFormElement)) {
        if (!meta) {
          meta = {};
        }
        meta.value = el.value;
        if (el.tagName === "INPUT" && CHECKABLE_INPUTS.indexOf(el.type) >= 0 && !el.checked) {
          delete meta.value;
        }
      }
      if (value) {
        if (!meta) {
          meta = {};
        }
        for (let key in value) {
          meta[key] = value[key];
        }
      }
      return meta;
    }
    pushEvent(type, el, targetCtx, phxEvent, meta, opts = {}, onReply) {
      this.pushWithReply(() => this.putRef([{ el, loading: true, lock: true }], phxEvent, type, opts), "event", {
        type,
        event: phxEvent,
        value: this.extractMeta(el, meta, opts.value),
        cid: this.targetComponentID(el, targetCtx, opts)
      }).then(({ reply }) => onReply && onReply(reply));
    }
    pushFileProgress(fileEl, entryRef, progress, onReply = function() {
    }) {
      this.liveSocket.withinOwners(fileEl.form, (view, targetCtx) => {
        view.pushWithReply(null, "progress", {
          event: fileEl.getAttribute(view.binding(PHX_PROGRESS)),
          ref: fileEl.getAttribute(PHX_UPLOAD_REF),
          entry_ref: entryRef,
          progress,
          cid: view.targetComponentID(fileEl.form, targetCtx)
        }).then(({ resp }) => onReply(resp));
      });
    }
    pushInput(inputEl, targetCtx, forceCid, phxEvent, opts, callback) {
      if (!inputEl.form) {
        throw new Error("form events require the input to be inside a form");
      }
      let uploads;
      let cid = isCid(forceCid) ? forceCid : this.targetComponentID(inputEl.form, targetCtx, opts);
      let refGenerator = () => {
        return this.putRef([
          { el: inputEl, loading: true, lock: true },
          { el: inputEl.form, loading: true, lock: true }
        ], phxEvent, "change", opts);
      };
      let formData;
      let meta = this.extractMeta(inputEl.form);
      if (inputEl instanceof HTMLButtonElement) {
        meta.submitter = inputEl;
      }
      if (inputEl.getAttribute(this.binding("change"))) {
        formData = serializeForm(inputEl.form, __spreadValues({ _target: opts._target }, meta), [inputEl.name]);
      } else {
        formData = serializeForm(inputEl.form, __spreadValues({ _target: opts._target }, meta));
      }
      if (dom_default.isUploadInput(inputEl) && inputEl.files && inputEl.files.length > 0) {
        LiveUploader.trackFiles(inputEl, Array.from(inputEl.files));
      }
      uploads = LiveUploader.serializeUploads(inputEl);
      let event = {
        type: "form",
        event: phxEvent,
        value: formData,
        uploads,
        cid
      };
      this.pushWithReply(refGenerator, "event", event).then(({ resp }) => {
        if (dom_default.isUploadInput(inputEl) && dom_default.isAutoUpload(inputEl)) {
          if (LiveUploader.filesAwaitingPreflight(inputEl).length > 0) {
            let [ref, _els] = refGenerator();
            this.undoRefs(ref, phxEvent, [inputEl.form]);
            this.uploadFiles(inputEl.form, phxEvent, targetCtx, ref, cid, (_uploads) => {
              callback && callback(resp);
              this.triggerAwaitingSubmit(inputEl.form, phxEvent);
              this.undoRefs(ref, phxEvent);
            });
          }
        } else {
          callback && callback(resp);
        }
      });
    }
    triggerAwaitingSubmit(formEl, phxEvent) {
      let awaitingSubmit = this.getScheduledSubmit(formEl);
      if (awaitingSubmit) {
        let [_el, _ref, _opts, callback] = awaitingSubmit;
        this.cancelSubmit(formEl, phxEvent);
        callback();
      }
    }
    getScheduledSubmit(formEl) {
      return this.formSubmits.find(([el, _ref, _opts, _callback]) => el.isSameNode(formEl));
    }
    scheduleSubmit(formEl, ref, opts, callback) {
      if (this.getScheduledSubmit(formEl)) {
        return true;
      }
      this.formSubmits.push([formEl, ref, opts, callback]);
    }
    cancelSubmit(formEl, phxEvent) {
      this.formSubmits = this.formSubmits.filter(([el, ref, _opts, _callback]) => {
        if (el.isSameNode(formEl)) {
          this.undoRefs(ref, phxEvent);
          return false;
        } else {
          return true;
        }
      });
    }
    disableForm(formEl, phxEvent, opts = {}) {
      let filterIgnored = (el) => {
        let userIgnored = closestPhxBinding(el, `${this.binding(PHX_UPDATE)}=ignore`, el.form);
        return !(userIgnored || closestPhxBinding(el, "data-phx-update=ignore", el.form));
      };
      let filterDisables = (el) => {
        return el.hasAttribute(this.binding(PHX_DISABLE_WITH));
      };
      let filterButton = (el) => el.tagName == "BUTTON";
      let filterInput = (el) => ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
      let formElements = Array.from(formEl.elements);
      let disables = formElements.filter(filterDisables);
      let buttons = formElements.filter(filterButton).filter(filterIgnored);
      let inputs = formElements.filter(filterInput).filter(filterIgnored);
      buttons.forEach((button) => {
        button.setAttribute(PHX_DISABLED, button.disabled);
        button.disabled = true;
      });
      inputs.forEach((input) => {
        input.setAttribute(PHX_READONLY, input.readOnly);
        input.readOnly = true;
        if (input.files) {
          input.setAttribute(PHX_DISABLED, input.disabled);
          input.disabled = true;
        }
      });
      let formEls = disables.concat(buttons).concat(inputs).map((el) => {
        return { el, loading: true, lock: true };
      });
      let els = [{ el: formEl, loading: true, lock: false }].concat(formEls).reverse();
      return this.putRef(els, phxEvent, "submit", opts);
    }
    pushFormSubmit(formEl, targetCtx, phxEvent, submitter, opts, onReply) {
      let refGenerator = () => this.disableForm(formEl, phxEvent, __spreadProps(__spreadValues({}, opts), {
        form: formEl,
        submitter
      }));
      let cid = this.targetComponentID(formEl, targetCtx);
      if (LiveUploader.hasUploadsInProgress(formEl)) {
        let [ref, _els] = refGenerator();
        let push = () => this.pushFormSubmit(formEl, targetCtx, phxEvent, submitter, opts, onReply);
        return this.scheduleSubmit(formEl, ref, opts, push);
      } else if (LiveUploader.inputsAwaitingPreflight(formEl).length > 0) {
        let [ref, els] = refGenerator();
        let proxyRefGen = () => [ref, els, opts];
        this.uploadFiles(formEl, phxEvent, targetCtx, ref, cid, (_uploads) => {
          if (LiveUploader.inputsAwaitingPreflight(formEl).length > 0) {
            return this.undoRefs(ref, phxEvent);
          }
          let meta = this.extractMeta(formEl);
          let formData = serializeForm(formEl, __spreadValues({ submitter }, meta));
          this.pushWithReply(proxyRefGen, "event", {
            type: "form",
            event: phxEvent,
            value: formData,
            cid
          }).then(({ resp }) => onReply(resp));
        });
      } else if (!(formEl.hasAttribute(PHX_REF_SRC) && formEl.classList.contains("phx-submit-loading"))) {
        let meta = this.extractMeta(formEl);
        let formData = serializeForm(formEl, __spreadValues({ submitter }, meta));
        this.pushWithReply(refGenerator, "event", {
          type: "form",
          event: phxEvent,
          value: formData,
          cid
        }).then(({ resp }) => onReply(resp));
      }
    }
    uploadFiles(formEl, phxEvent, targetCtx, ref, cid, onComplete) {
      let joinCountAtUpload = this.joinCount;
      let inputEls = LiveUploader.activeFileInputs(formEl);
      let numFileInputsInProgress = inputEls.length;
      inputEls.forEach((inputEl) => {
        let uploader = new LiveUploader(inputEl, this, () => {
          numFileInputsInProgress--;
          if (numFileInputsInProgress === 0) {
            onComplete();
          }
        });
        let entries = uploader.entries().map((entry) => entry.toPreflightPayload());
        if (entries.length === 0) {
          numFileInputsInProgress--;
          return;
        }
        let payload = {
          ref: inputEl.getAttribute(PHX_UPLOAD_REF),
          entries,
          cid: this.targetComponentID(inputEl.form, targetCtx)
        };
        this.log("upload", () => ["sending preflight request", payload]);
        this.pushWithReply(null, "allow_upload", payload).then(({ resp }) => {
          this.log("upload", () => ["got preflight response", resp]);
          uploader.entries().forEach((entry) => {
            if (resp.entries && !resp.entries[entry.ref]) {
              this.handleFailedEntryPreflight(entry.ref, "failed preflight", uploader);
            }
          });
          if (resp.error || Object.keys(resp.entries).length === 0) {
            this.undoRefs(ref, phxEvent);
            let errors = resp.error || [];
            errors.map(([entry_ref, reason]) => {
              this.handleFailedEntryPreflight(entry_ref, reason, uploader);
            });
          } else {
            let onError = (callback) => {
              this.channel.onError(() => {
                if (this.joinCount === joinCountAtUpload) {
                  callback();
                }
              });
            };
            uploader.initAdapterUpload(resp, onError, this.liveSocket);
          }
        });
      });
    }
    handleFailedEntryPreflight(uploadRef, reason, uploader) {
      if (uploader.isAutoUpload()) {
        let entry = uploader.entries().find((entry2) => entry2.ref === uploadRef.toString());
        if (entry) {
          entry.cancel();
        }
      } else {
        uploader.entries().map((entry) => entry.cancel());
      }
      this.log("upload", () => [`error for entry ${uploadRef}`, reason]);
    }
    dispatchUploads(targetCtx, name, filesOrBlobs) {
      let targetElement = this.targetCtxElement(targetCtx) || this.el;
      let inputs = dom_default.findUploadInputs(targetElement).filter((el) => el.name === name);
      if (inputs.length === 0) {
        logError(`no live file inputs found matching the name "${name}"`);
      } else if (inputs.length > 1) {
        logError(`duplicate live file inputs found matching the name "${name}"`);
      } else {
        dom_default.dispatchEvent(inputs[0], PHX_TRACK_UPLOADS, { detail: { files: filesOrBlobs } });
      }
    }
    targetCtxElement(targetCtx) {
      if (isCid(targetCtx)) {
        let [target] = dom_default.findComponentNodeList(this.el, targetCtx);
        return target;
      } else if (targetCtx) {
        return targetCtx;
      } else {
        return null;
      }
    }
    pushFormRecovery(oldForm, newForm, templateDom, callback) {
      const phxChange = this.binding("change");
      const phxTarget = newForm.getAttribute(this.binding("target")) || newForm;
      const phxEvent = newForm.getAttribute(this.binding(PHX_AUTO_RECOVER)) || newForm.getAttribute(this.binding("change"));
      const inputs = Array.from(oldForm.elements).filter((el) => dom_default.isFormInput(el) && el.name && !el.hasAttribute(phxChange));
      if (inputs.length === 0) {
        return;
      }
      inputs.forEach((input2) => input2.hasAttribute(PHX_UPLOAD_REF) && LiveUploader.clearFiles(input2));
      let input = inputs.find((el) => el.type !== "hidden") || inputs[0];
      let pending = 0;
      this.withinTargets(phxTarget, (targetView, targetCtx) => {
        const cid = this.targetComponentID(newForm, targetCtx);
        pending++;
        targetView.pushInput(input, targetCtx, cid, phxEvent, { _target: input.name }, () => {
          pending--;
          if (pending === 0) {
            callback();
          }
        });
      }, templateDom, templateDom);
    }
    pushLinkPatch(e, href, targetEl, callback) {
      let linkRef = this.liveSocket.setPendingLink(href);
      let loading = e.isTrusted && e.type !== "popstate";
      let refGen = targetEl ? () => this.putRef([{ el: targetEl, loading, lock: true }], null, "click") : null;
      let fallback = () => this.liveSocket.redirect(window.location.href);
      let url = href.startsWith("/") ? `${location.protocol}//${location.host}${href}` : href;
      this.pushWithReply(refGen, "live_patch", { url }).then(
        ({ resp }) => {
          this.liveSocket.requestDOMUpdate(() => {
            if (resp.link_redirect) {
              this.liveSocket.replaceMain(href, null, callback, linkRef);
            } else {
              if (this.liveSocket.commitPendingLink(linkRef)) {
                this.href = href;
              }
              this.applyPendingUpdates();
              callback && callback(linkRef);
            }
          });
        },
        ({ error: _error, timeout: _timeout }) => fallback()
      );
    }
    getFormsForRecovery() {
      if (this.joinCount === 0) {
        return {};
      }
      let phxChange = this.binding("change");
      return dom_default.all(this.el, `form[${phxChange}]`).filter((form) => form.id).filter((form) => form.elements.length > 0).filter((form) => form.getAttribute(this.binding(PHX_AUTO_RECOVER)) !== "ignore").map((form) => form.cloneNode(true)).reduce((acc, form) => {
        acc[form.id] = form;
        return acc;
      }, {});
    }
    maybePushComponentsDestroyed(destroyedCIDs) {
      let willDestroyCIDs = destroyedCIDs.filter((cid) => {
        return dom_default.findComponentNodeList(this.el, cid).length === 0;
      });
      if (willDestroyCIDs.length > 0) {
        willDestroyCIDs.forEach((cid) => this.rendered.resetRender(cid));
        this.pushWithReply(null, "cids_will_destroy", { cids: willDestroyCIDs }).then(() => {
          this.liveSocket.requestDOMUpdate(() => {
            let completelyDestroyCIDs = willDestroyCIDs.filter((cid) => {
              return dom_default.findComponentNodeList(this.el, cid).length === 0;
            });
            if (completelyDestroyCIDs.length > 0) {
              this.pushWithReply(null, "cids_destroyed", { cids: completelyDestroyCIDs }).then(({ resp }) => {
                this.rendered.pruneCIDs(resp.cids);
              });
            }
          });
        });
      }
    }
    ownsElement(el) {
      let parentViewEl = el.closest(PHX_VIEW_SELECTOR);
      return el.getAttribute(PHX_PARENT_ID) === this.id || parentViewEl && parentViewEl.id === this.id || !parentViewEl && this.isDead;
    }
    submitForm(form, targetCtx, phxEvent, submitter, opts = {}) {
      dom_default.putPrivate(form, PHX_HAS_SUBMITTED, true);
      const inputs = Array.from(form.elements);
      inputs.forEach((input) => dom_default.putPrivate(input, PHX_HAS_SUBMITTED, true));
      this.liveSocket.blurActiveElement(this);
      this.pushFormSubmit(form, targetCtx, phxEvent, submitter, opts, () => {
        this.liveSocket.restorePreviouslyActiveFocus();
      });
    }
    binding(kind) {
      return this.liveSocket.binding(kind);
    }
  };
  var LiveSocket = class {
    constructor(url, phxSocket, opts = {}) {
      this.unloaded = false;
      if (!phxSocket || phxSocket.constructor.name === "Object") {
        throw new Error(`
      a phoenix Socket must be provided as the second argument to the LiveSocket constructor. For example:

          import {Socket} from "phoenix"
          import {LiveSocket} from "phoenix_live_view"
          let liveSocket = new LiveSocket("/live", Socket, {...})
      `);
      }
      this.socket = new phxSocket(url, opts);
      this.bindingPrefix = opts.bindingPrefix || BINDING_PREFIX;
      this.opts = opts;
      this.params = closure2(opts.params || {});
      this.viewLogger = opts.viewLogger;
      this.metadataCallbacks = opts.metadata || {};
      this.defaults = Object.assign(clone(DEFAULTS), opts.defaults || {});
      this.activeElement = null;
      this.prevActive = null;
      this.silenced = false;
      this.main = null;
      this.outgoingMainEl = null;
      this.clickStartedAtTarget = null;
      this.linkRef = 1;
      this.roots = {};
      this.href = window.location.href;
      this.pendingLink = null;
      this.currentLocation = clone(window.location);
      this.hooks = opts.hooks || {};
      this.uploaders = opts.uploaders || {};
      this.loaderTimeout = opts.loaderTimeout || LOADER_TIMEOUT;
      this.reloadWithJitterTimer = null;
      this.maxReloads = opts.maxReloads || MAX_RELOADS;
      this.reloadJitterMin = opts.reloadJitterMin || RELOAD_JITTER_MIN;
      this.reloadJitterMax = opts.reloadJitterMax || RELOAD_JITTER_MAX;
      this.failsafeJitter = opts.failsafeJitter || FAILSAFE_JITTER;
      this.localStorage = opts.localStorage || window.localStorage;
      this.sessionStorage = opts.sessionStorage || window.sessionStorage;
      this.boundTopLevelEvents = false;
      this.boundEventNames = /* @__PURE__ */ new Set();
      this.serverCloseRef = null;
      this.domCallbacks = Object.assign(
        {
          jsQuerySelectorAll: null,
          onPatchStart: closure2(),
          onPatchEnd: closure2(),
          onNodeAdded: closure2(),
          onBeforeElUpdated: closure2()
        },
        opts.dom || {}
      );
      this.transitions = new TransitionSet();
      this.currentHistoryPosition = parseInt(this.sessionStorage.getItem(PHX_LV_HISTORY_POSITION)) || 0;
      window.addEventListener("pagehide", (_e) => {
        this.unloaded = true;
      });
      this.socket.onOpen(() => {
        if (this.isUnloaded()) {
          window.location.reload();
        }
      });
    }
    // public
    version() {
      return "1.0.1";
    }
    isProfileEnabled() {
      return this.sessionStorage.getItem(PHX_LV_PROFILE) === "true";
    }
    isDebugEnabled() {
      return this.sessionStorage.getItem(PHX_LV_DEBUG) === "true";
    }
    isDebugDisabled() {
      return this.sessionStorage.getItem(PHX_LV_DEBUG) === "false";
    }
    enableDebug() {
      this.sessionStorage.setItem(PHX_LV_DEBUG, "true");
    }
    enableProfiling() {
      this.sessionStorage.setItem(PHX_LV_PROFILE, "true");
    }
    disableDebug() {
      this.sessionStorage.setItem(PHX_LV_DEBUG, "false");
    }
    disableProfiling() {
      this.sessionStorage.removeItem(PHX_LV_PROFILE);
    }
    enableLatencySim(upperBoundMs) {
      this.enableDebug();
      console.log("latency simulator enabled for the duration of this browser session. Call disableLatencySim() to disable");
      this.sessionStorage.setItem(PHX_LV_LATENCY_SIM, upperBoundMs);
    }
    disableLatencySim() {
      this.sessionStorage.removeItem(PHX_LV_LATENCY_SIM);
    }
    getLatencySim() {
      let str = this.sessionStorage.getItem(PHX_LV_LATENCY_SIM);
      return str ? parseInt(str) : null;
    }
    getSocket() {
      return this.socket;
    }
    connect() {
      if (window.location.hostname === "localhost" && !this.isDebugDisabled()) {
        this.enableDebug();
      }
      let doConnect = () => {
        this.resetReloadStatus();
        if (this.joinRootViews()) {
          this.bindTopLevelEvents();
          this.socket.connect();
        } else if (this.main) {
          this.socket.connect();
        } else {
          this.bindTopLevelEvents({ dead: true });
        }
        this.joinDeadView();
      };
      if (["complete", "loaded", "interactive"].indexOf(document.readyState) >= 0) {
        doConnect();
      } else {
        document.addEventListener("DOMContentLoaded", () => doConnect());
      }
    }
    disconnect(callback) {
      clearTimeout(this.reloadWithJitterTimer);
      if (this.serverCloseRef) {
        this.socket.off(this.serverCloseRef);
        this.serverCloseRef = null;
      }
      this.socket.disconnect(callback);
    }
    replaceTransport(transport) {
      clearTimeout(this.reloadWithJitterTimer);
      this.socket.replaceTransport(transport);
      this.connect();
    }
    execJS(el, encodedJS, eventType = null) {
      let e = new CustomEvent("phx:exec", { detail: { sourceElement: el } });
      this.owner(el, (view) => js_default.exec(e, eventType, encodedJS, view, el));
    }
    // private
    execJSHookPush(el, phxEvent, data, callback) {
      this.withinOwners(el, (view) => {
        let e = new CustomEvent("phx:exec", { detail: { sourceElement: el } });
        js_default.exec(e, "hook", phxEvent, view, el, ["push", { data, callback }]);
      });
    }
    unload() {
      if (this.unloaded) {
        return;
      }
      if (this.main && this.isConnected()) {
        this.log(this.main, "socket", () => ["disconnect for page nav"]);
      }
      this.unloaded = true;
      this.destroyAllViews();
      this.disconnect();
    }
    triggerDOM(kind, args) {
      this.domCallbacks[kind](...args);
    }
    time(name, func) {
      if (!this.isProfileEnabled() || !console.time) {
        return func();
      }
      console.time(name);
      let result = func();
      console.timeEnd(name);
      return result;
    }
    log(view, kind, msgCallback) {
      if (this.viewLogger) {
        let [msg, obj] = msgCallback();
        this.viewLogger(view, kind, msg, obj);
      } else if (this.isDebugEnabled()) {
        let [msg, obj] = msgCallback();
        debug(view, kind, msg, obj);
      }
    }
    requestDOMUpdate(callback) {
      this.transitions.after(callback);
    }
    transition(time, onStart, onDone = function() {
    }) {
      this.transitions.addTransition(time, onStart, onDone);
    }
    onChannel(channel, event, cb) {
      channel.on(event, (data) => {
        let latency = this.getLatencySim();
        if (!latency) {
          cb(data);
        } else {
          setTimeout(() => cb(data), latency);
        }
      });
    }
    reloadWithJitter(view, log) {
      clearTimeout(this.reloadWithJitterTimer);
      this.disconnect();
      let minMs = this.reloadJitterMin;
      let maxMs = this.reloadJitterMax;
      let afterMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
      let tries = browser_default.updateLocal(this.localStorage, window.location.pathname, CONSECUTIVE_RELOADS, 0, (count) => count + 1);
      if (tries >= this.maxReloads) {
        afterMs = this.failsafeJitter;
      }
      this.reloadWithJitterTimer = setTimeout(() => {
        if (view.isDestroyed() || view.isConnected()) {
          return;
        }
        view.destroy();
        log ? log() : this.log(view, "join", () => [`encountered ${tries} consecutive reloads`]);
        if (tries >= this.maxReloads) {
          this.log(view, "join", () => [`exceeded ${this.maxReloads} consecutive reloads. Entering failsafe mode`]);
        }
        if (this.hasPendingLink()) {
          window.location = this.pendingLink;
        } else {
          window.location.reload();
        }
      }, afterMs);
    }
    getHookCallbacks(name) {
      return name && name.startsWith("Phoenix.") ? hooks_default[name.split(".")[1]] : this.hooks[name];
    }
    isUnloaded() {
      return this.unloaded;
    }
    isConnected() {
      return this.socket.isConnected();
    }
    getBindingPrefix() {
      return this.bindingPrefix;
    }
    binding(kind) {
      return `${this.getBindingPrefix()}${kind}`;
    }
    channel(topic, params) {
      return this.socket.channel(topic, params);
    }
    joinDeadView() {
      let body = document.body;
      if (body && !this.isPhxView(body) && !this.isPhxView(document.firstElementChild)) {
        let view = this.newRootView(body);
        view.setHref(this.getHref());
        view.joinDead();
        if (!this.main) {
          this.main = view;
        }
        window.requestAnimationFrame(() => view.execNewMounted());
      }
    }
    joinRootViews() {
      let rootsFound = false;
      dom_default.all(document, `${PHX_VIEW_SELECTOR}:not([${PHX_PARENT_ID}])`, (rootEl) => {
        if (!this.getRootById(rootEl.id)) {
          let view = this.newRootView(rootEl);
          view.setHref(this.getHref());
          view.join();
          if (rootEl.hasAttribute(PHX_MAIN)) {
            this.main = view;
          }
        }
        rootsFound = true;
      });
      return rootsFound;
    }
    redirect(to, flash, reloadToken) {
      if (reloadToken) {
        browser_default.setCookie(PHX_RELOAD_STATUS, reloadToken, 60);
      }
      this.unload();
      browser_default.redirect(to, flash);
    }
    replaceMain(href, flash, callback = null, linkRef = this.setPendingLink(href)) {
      let liveReferer = this.currentLocation.href;
      this.outgoingMainEl = this.outgoingMainEl || this.main.el;
      let removeEls = dom_default.all(this.outgoingMainEl, `[${this.binding("remove")}]`);
      let newMainEl = dom_default.cloneNode(this.outgoingMainEl, "");
      this.main.showLoader(this.loaderTimeout);
      this.main.destroy();
      this.main = this.newRootView(newMainEl, flash, liveReferer);
      this.main.setRedirect(href);
      this.transitionRemoves(removeEls, true);
      this.main.join((joinCount, onDone) => {
        if (joinCount === 1 && this.commitPendingLink(linkRef)) {
          this.requestDOMUpdate(() => {
            removeEls.forEach((el) => el.remove());
            dom_default.findPhxSticky(document).forEach((el) => newMainEl.appendChild(el));
            this.outgoingMainEl.replaceWith(newMainEl);
            this.outgoingMainEl = null;
            callback && callback(linkRef);
            onDone();
          });
        }
      });
    }
    transitionRemoves(elements, skipSticky, callback) {
      let removeAttr = this.binding("remove");
      if (skipSticky) {
        const stickies = dom_default.findPhxSticky(document) || [];
        elements = elements.filter((el) => !dom_default.isChildOfAny(el, stickies));
      }
      let silenceEvents = (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
      };
      elements.forEach((el) => {
        for (let event of this.boundEventNames) {
          el.addEventListener(event, silenceEvents, true);
        }
        this.execJS(el, el.getAttribute(removeAttr), "remove");
      });
      this.requestDOMUpdate(() => {
        elements.forEach((el) => {
          for (let event of this.boundEventNames) {
            el.removeEventListener(event, silenceEvents, true);
          }
        });
        callback && callback();
      });
    }
    isPhxView(el) {
      return el.getAttribute && el.getAttribute(PHX_SESSION) !== null;
    }
    newRootView(el, flash, liveReferer) {
      let view = new View(el, this, null, flash, liveReferer);
      this.roots[view.id] = view;
      return view;
    }
    owner(childEl, callback) {
      let view = maybe(childEl.closest(PHX_VIEW_SELECTOR), (el) => this.getViewByEl(el)) || this.main;
      return view && callback ? callback(view) : view;
    }
    withinOwners(childEl, callback) {
      this.owner(childEl, (view) => callback(view, childEl));
    }
    getViewByEl(el) {
      let rootId = el.getAttribute(PHX_ROOT_ID);
      return maybe(this.getRootById(rootId), (root) => root.getDescendentByEl(el));
    }
    getRootById(id) {
      return this.roots[id];
    }
    destroyAllViews() {
      for (let id in this.roots) {
        this.roots[id].destroy();
        delete this.roots[id];
      }
      this.main = null;
    }
    destroyViewByEl(el) {
      let root = this.getRootById(el.getAttribute(PHX_ROOT_ID));
      if (root && root.id === el.id) {
        root.destroy();
        delete this.roots[root.id];
      } else if (root) {
        root.destroyDescendent(el.id);
      }
    }
    getActiveElement() {
      return document.activeElement;
    }
    dropActiveElement(view) {
      if (this.prevActive && view.ownsElement(this.prevActive)) {
        this.prevActive = null;
      }
    }
    restorePreviouslyActiveFocus() {
      if (this.prevActive && this.prevActive !== document.body) {
        this.prevActive.focus();
      }
    }
    blurActiveElement() {
      this.prevActive = this.getActiveElement();
      if (this.prevActive !== document.body) {
        this.prevActive.blur();
      }
    }
    bindTopLevelEvents({ dead } = {}) {
      if (this.boundTopLevelEvents) {
        return;
      }
      this.boundTopLevelEvents = true;
      this.serverCloseRef = this.socket.onClose((event) => {
        if (event && event.code === 1e3 && this.main) {
          return this.reloadWithJitter(this.main);
        }
      });
      document.body.addEventListener("click", function() {
      });
      window.addEventListener("pageshow", (e) => {
        if (e.persisted) {
          this.getSocket().disconnect();
          this.withPageLoading({ to: window.location.href, kind: "redirect" });
          window.location.reload();
        }
      }, true);
      if (!dead) {
        this.bindNav();
      }
      this.bindClicks();
      if (!dead) {
        this.bindForms();
      }
      this.bind({ keyup: "keyup", keydown: "keydown" }, (e, type, view, targetEl, phxEvent, _phxTarget) => {
        let matchKey = targetEl.getAttribute(this.binding(PHX_KEY));
        let pressedKey = e.key && e.key.toLowerCase();
        if (matchKey && matchKey.toLowerCase() !== pressedKey) {
          return;
        }
        let data = __spreadValues({ key: e.key }, this.eventMeta(type, e, targetEl));
        js_default.exec(e, type, phxEvent, view, targetEl, ["push", { data }]);
      });
      this.bind({ blur: "focusout", focus: "focusin" }, (e, type, view, targetEl, phxEvent, phxTarget) => {
        if (!phxTarget) {
          let data = __spreadValues({ key: e.key }, this.eventMeta(type, e, targetEl));
          js_default.exec(e, type, phxEvent, view, targetEl, ["push", { data }]);
        }
      });
      this.bind({ blur: "blur", focus: "focus" }, (e, type, view, targetEl, phxEvent, phxTarget) => {
        if (phxTarget === "window") {
          let data = this.eventMeta(type, e, targetEl);
          js_default.exec(e, type, phxEvent, view, targetEl, ["push", { data }]);
        }
      });
      this.on("dragover", (e) => e.preventDefault());
      this.on("drop", (e) => {
        e.preventDefault();
        let dropTargetId = maybe(closestPhxBinding(e.target, this.binding(PHX_DROP_TARGET)), (trueTarget) => {
          return trueTarget.getAttribute(this.binding(PHX_DROP_TARGET));
        });
        let dropTarget = dropTargetId && document.getElementById(dropTargetId);
        let files = Array.from(e.dataTransfer.files || []);
        if (!dropTarget || dropTarget.disabled || files.length === 0 || !(dropTarget.files instanceof FileList)) {
          return;
        }
        LiveUploader.trackFiles(dropTarget, files, e.dataTransfer);
        dropTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
      this.on(PHX_TRACK_UPLOADS, (e) => {
        let uploadTarget = e.target;
        if (!dom_default.isUploadInput(uploadTarget)) {
          return;
        }
        let files = Array.from(e.detail.files || []).filter((f) => f instanceof File || f instanceof Blob);
        LiveUploader.trackFiles(uploadTarget, files);
        uploadTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }
    eventMeta(eventName, e, targetEl) {
      let callback = this.metadataCallbacks[eventName];
      return callback ? callback(e, targetEl) : {};
    }
    setPendingLink(href) {
      this.linkRef++;
      this.pendingLink = href;
      this.resetReloadStatus();
      return this.linkRef;
    }
    // anytime we are navigating or connecting, drop reload cookie in case
    // we issue the cookie but the next request was interrupted and the server never dropped it
    resetReloadStatus() {
      browser_default.deleteCookie(PHX_RELOAD_STATUS);
    }
    commitPendingLink(linkRef) {
      if (this.linkRef !== linkRef) {
        return false;
      } else {
        this.href = this.pendingLink;
        this.pendingLink = null;
        return true;
      }
    }
    getHref() {
      return this.href;
    }
    hasPendingLink() {
      return !!this.pendingLink;
    }
    bind(events, callback) {
      for (let event in events) {
        let browserEventName = events[event];
        this.on(browserEventName, (e) => {
          let binding = this.binding(event);
          let windowBinding = this.binding(`window-${event}`);
          let targetPhxEvent = e.target.getAttribute && e.target.getAttribute(binding);
          if (targetPhxEvent) {
            this.debounce(e.target, e, browserEventName, () => {
              this.withinOwners(e.target, (view) => {
                callback(e, event, view, e.target, targetPhxEvent, null);
              });
            });
          } else {
            dom_default.all(document, `[${windowBinding}]`, (el) => {
              let phxEvent = el.getAttribute(windowBinding);
              this.debounce(el, e, browserEventName, () => {
                this.withinOwners(el, (view) => {
                  callback(e, event, view, el, phxEvent, "window");
                });
              });
            });
          }
        });
      }
    }
    bindClicks() {
      this.on("mousedown", (e) => this.clickStartedAtTarget = e.target);
      this.bindClick("click", "click");
    }
    bindClick(eventName, bindingName) {
      let click = this.binding(bindingName);
      window.addEventListener(eventName, (e) => {
        let target = null;
        if (e.detail === 0)
          this.clickStartedAtTarget = e.target;
        let clickStartedAtTarget = this.clickStartedAtTarget || e.target;
        target = closestPhxBinding(e.target, click);
        this.dispatchClickAway(e, clickStartedAtTarget);
        this.clickStartedAtTarget = null;
        let phxEvent = target && target.getAttribute(click);
        if (!phxEvent) {
          if (dom_default.isNewPageClick(e, window.location)) {
            this.unload();
          }
          return;
        }
        if (target.getAttribute("href") === "#") {
          e.preventDefault();
        }
        if (target.hasAttribute(PHX_REF_SRC)) {
          return;
        }
        this.debounce(target, e, "click", () => {
          this.withinOwners(target, (view) => {
            js_default.exec(e, "click", phxEvent, view, target, ["push", { data: this.eventMeta("click", e, target) }]);
          });
        });
      }, false);
    }
    dispatchClickAway(e, clickStartedAt) {
      let phxClickAway = this.binding("click-away");
      dom_default.all(document, `[${phxClickAway}]`, (el) => {
        if (!(el.isSameNode(clickStartedAt) || el.contains(clickStartedAt))) {
          this.withinOwners(el, (view) => {
            let phxEvent = el.getAttribute(phxClickAway);
            if (js_default.isVisible(el) && js_default.isInViewport(el)) {
              js_default.exec(e, "click", phxEvent, view, el, ["push", { data: this.eventMeta("click", e, e.target) }]);
            }
          });
        }
      });
    }
    bindNav() {
      if (!browser_default.canPushState()) {
        return;
      }
      if (history.scrollRestoration) {
        history.scrollRestoration = "manual";
      }
      let scrollTimer = null;
      window.addEventListener("scroll", (_e) => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          browser_default.updateCurrentState((state) => Object.assign(state, { scroll: window.scrollY }));
        }, 100);
      });
      window.addEventListener("popstate", (event) => {
        if (!this.registerNewLocation(window.location)) {
          return;
        }
        let { type, backType, id, root, scroll, position } = event.state || {};
        let href = window.location.href;
        let isForward = position > this.currentHistoryPosition;
        type = isForward ? type : backType || type;
        this.currentHistoryPosition = position || 0;
        this.sessionStorage.setItem(PHX_LV_HISTORY_POSITION, this.currentHistoryPosition.toString());
        dom_default.dispatchEvent(window, "phx:navigate", { detail: { href, patch: type === "patch", pop: true, direction: isForward ? "forward" : "backward" } });
        this.requestDOMUpdate(() => {
          if (this.main.isConnected() && (type === "patch" && id === this.main.id)) {
            this.main.pushLinkPatch(event, href, null, () => {
              this.maybeScroll(scroll);
            });
          } else {
            this.replaceMain(href, null, () => {
              if (root) {
                this.replaceRootHistory();
              }
              this.maybeScroll(scroll);
            });
          }
        });
      }, false);
      window.addEventListener("click", (e) => {
        let target = closestPhxBinding(e.target, PHX_LIVE_LINK);
        let type = target && target.getAttribute(PHX_LIVE_LINK);
        if (!type || !this.isConnected() || !this.main || dom_default.wantsNewTab(e)) {
          return;
        }
        let href = target.href instanceof SVGAnimatedString ? target.href.baseVal : target.href;
        let linkState = target.getAttribute(PHX_LINK_STATE);
        e.preventDefault();
        e.stopImmediatePropagation();
        if (this.pendingLink === href) {
          return;
        }
        this.requestDOMUpdate(() => {
          if (type === "patch") {
            this.pushHistoryPatch(e, href, linkState, target);
          } else if (type === "redirect") {
            this.historyRedirect(e, href, linkState, null, target);
          } else {
            throw new Error(`expected ${PHX_LIVE_LINK} to be "patch" or "redirect", got: ${type}`);
          }
          let phxClick = target.getAttribute(this.binding("click"));
          if (phxClick) {
            this.requestDOMUpdate(() => this.execJS(target, phxClick, "click"));
          }
        });
      }, false);
    }
    maybeScroll(scroll) {
      if (typeof scroll === "number") {
        requestAnimationFrame(() => {
          window.scrollTo(0, scroll);
        });
      }
    }
    dispatchEvent(event, payload = {}) {
      dom_default.dispatchEvent(window, `phx:${event}`, { detail: payload });
    }
    dispatchEvents(events) {
      events.forEach(([event, payload]) => this.dispatchEvent(event, payload));
    }
    withPageLoading(info, callback) {
      dom_default.dispatchEvent(window, "phx:page-loading-start", { detail: info });
      let done = () => dom_default.dispatchEvent(window, "phx:page-loading-stop", { detail: info });
      return callback ? callback(done) : done;
    }
    pushHistoryPatch(e, href, linkState, targetEl) {
      if (!this.isConnected() || !this.main.isMain()) {
        return browser_default.redirect(href);
      }
      this.withPageLoading({ to: href, kind: "patch" }, (done) => {
        this.main.pushLinkPatch(e, href, targetEl, (linkRef) => {
          this.historyPatch(href, linkState, linkRef);
          done();
        });
      });
    }
    historyPatch(href, linkState, linkRef = this.setPendingLink(href)) {
      if (!this.commitPendingLink(linkRef)) {
        return;
      }
      this.currentHistoryPosition++;
      this.sessionStorage.setItem(PHX_LV_HISTORY_POSITION, this.currentHistoryPosition.toString());
      browser_default.updateCurrentState((state) => __spreadProps(__spreadValues({}, state), { backType: "patch" }));
      browser_default.pushState(linkState, {
        type: "patch",
        id: this.main.id,
        position: this.currentHistoryPosition
      }, href);
      dom_default.dispatchEvent(window, "phx:navigate", { detail: { patch: true, href, pop: false, direction: "forward" } });
      this.registerNewLocation(window.location);
    }
    historyRedirect(e, href, linkState, flash, targetEl) {
      if (targetEl && e.isTrusted && e.type !== "popstate") {
        targetEl.classList.add("phx-click-loading");
      }
      if (!this.isConnected() || !this.main.isMain()) {
        return browser_default.redirect(href, flash);
      }
      if (/^\/$|^\/[^\/]+.*$/.test(href)) {
        let { protocol, host } = window.location;
        href = `${protocol}//${host}${href}`;
      }
      let scroll = window.scrollY;
      this.withPageLoading({ to: href, kind: "redirect" }, (done) => {
        this.replaceMain(href, flash, (linkRef) => {
          if (linkRef === this.linkRef) {
            this.currentHistoryPosition++;
            this.sessionStorage.setItem(PHX_LV_HISTORY_POSITION, this.currentHistoryPosition.toString());
            browser_default.updateCurrentState((state) => __spreadProps(__spreadValues({}, state), { backType: "redirect" }));
            browser_default.pushState(linkState, {
              type: "redirect",
              id: this.main.id,
              scroll,
              position: this.currentHistoryPosition
            }, href);
            dom_default.dispatchEvent(window, "phx:navigate", { detail: { href, patch: false, pop: false, direction: "forward" } });
            this.registerNewLocation(window.location);
          }
          done();
        });
      });
    }
    replaceRootHistory() {
      browser_default.pushState("replace", {
        root: true,
        type: "patch",
        id: this.main.id,
        position: this.currentHistoryPosition
        // Preserve current position
      });
    }
    registerNewLocation(newLocation) {
      let { pathname, search } = this.currentLocation;
      if (pathname + search === newLocation.pathname + newLocation.search) {
        return false;
      } else {
        this.currentLocation = clone(newLocation);
        return true;
      }
    }
    bindForms() {
      let iterations = 0;
      let externalFormSubmitted = false;
      this.on("submit", (e) => {
        let phxSubmit = e.target.getAttribute(this.binding("submit"));
        let phxChange = e.target.getAttribute(this.binding("change"));
        if (!externalFormSubmitted && phxChange && !phxSubmit) {
          externalFormSubmitted = true;
          e.preventDefault();
          this.withinOwners(e.target, (view) => {
            view.disableForm(e.target);
            window.requestAnimationFrame(() => {
              if (dom_default.isUnloadableFormSubmit(e)) {
                this.unload();
              }
              e.target.submit();
            });
          });
        }
      });
      this.on("submit", (e) => {
        let phxEvent = e.target.getAttribute(this.binding("submit"));
        if (!phxEvent) {
          if (dom_default.isUnloadableFormSubmit(e)) {
            this.unload();
          }
          return;
        }
        e.preventDefault();
        e.target.disabled = true;
        this.withinOwners(e.target, (view) => {
          js_default.exec(e, "submit", phxEvent, view, e.target, ["push", { submitter: e.submitter }]);
        });
      });
      for (let type of ["change", "input"]) {
        this.on(type, (e) => {
          if (e instanceof CustomEvent && e.target.form === void 0) {
            if (e.detail && e.detail.dispatcher) {
              throw new Error(`dispatching a custom ${type} event is only supported on input elements inside a form`);
            }
            return;
          }
          let phxChange = this.binding("change");
          let input = e.target;
          if (e.isComposing) {
            const key = `composition-listener-${type}`;
            if (!dom_default.private(input, key)) {
              dom_default.putPrivate(input, key, true);
              input.addEventListener("compositionend", () => {
                input.dispatchEvent(new Event(type, { bubbles: true }));
                dom_default.deletePrivate(input, key);
              }, { once: true });
            }
            return;
          }
          let inputEvent = input.getAttribute(phxChange);
          let formEvent = input.form && input.form.getAttribute(phxChange);
          let phxEvent = inputEvent || formEvent;
          if (!phxEvent) {
            return;
          }
          if (input.type === "number" && input.validity && input.validity.badInput) {
            return;
          }
          let dispatcher = inputEvent ? input : input.form;
          let currentIterations = iterations;
          iterations++;
          let { at, type: lastType } = dom_default.private(input, "prev-iteration") || {};
          if (at === currentIterations - 1 && type === "change" && lastType === "input") {
            return;
          }
          dom_default.putPrivate(input, "prev-iteration", { at: currentIterations, type });
          this.debounce(input, e, type, () => {
            this.withinOwners(dispatcher, (view) => {
              dom_default.putPrivate(input, PHX_HAS_FOCUSED, true);
              js_default.exec(e, "change", phxEvent, view, input, ["push", { _target: e.target.name, dispatcher }]);
            });
          });
        });
      }
      this.on("reset", (e) => {
        let form = e.target;
        dom_default.resetForm(form);
        let input = Array.from(form.elements).find((el) => el.type === "reset");
        if (input) {
          window.requestAnimationFrame(() => {
            input.dispatchEvent(new Event("input", { bubbles: true, cancelable: false }));
          });
        }
      });
    }
    debounce(el, event, eventType, callback) {
      if (eventType === "blur" || eventType === "focusout") {
        return callback();
      }
      let phxDebounce = this.binding(PHX_DEBOUNCE);
      let phxThrottle = this.binding(PHX_THROTTLE);
      let defaultDebounce = this.defaults.debounce.toString();
      let defaultThrottle = this.defaults.throttle.toString();
      this.withinOwners(el, (view) => {
        let asyncFilter = () => !view.isDestroyed() && document.body.contains(el);
        dom_default.debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, asyncFilter, () => {
          callback();
        });
      });
    }
    silenceEvents(callback) {
      this.silenced = true;
      callback();
      this.silenced = false;
    }
    on(event, callback) {
      this.boundEventNames.add(event);
      window.addEventListener(event, (e) => {
        if (!this.silenced) {
          callback(e);
        }
      });
    }
    jsQuerySelectorAll(sourceEl, query, defaultQuery) {
      let all = this.domCallbacks.jsQuerySelectorAll;
      return all ? all(sourceEl, query, defaultQuery) : defaultQuery();
    }
  };
  var TransitionSet = class {
    constructor() {
      this.transitions = /* @__PURE__ */ new Set();
      this.pendingOps = [];
    }
    reset() {
      this.transitions.forEach((timer) => {
        clearTimeout(timer);
        this.transitions.delete(timer);
      });
      this.flushPendingOps();
    }
    after(callback) {
      if (this.size() === 0) {
        callback();
      } else {
        this.pushPendingOp(callback);
      }
    }
    addTransition(time, onStart, onDone) {
      onStart();
      let timer = setTimeout(() => {
        this.transitions.delete(timer);
        onDone();
        this.flushPendingOps();
      }, time);
      this.transitions.add(timer);
    }
    pushPendingOp(op) {
      this.pendingOps.push(op);
    }
    size() {
      return this.transitions.size;
    }
    flushPendingOps() {
      if (this.size() > 0) {
        return;
      }
      let op = this.pendingOps.shift();
      if (op) {
        op();
        this.flushPendingOps();
      }
    }
  };

  // js/app.js
  var import_topbar = __toESM(require_topbar());

  // js/hooks.js
  var import_external = __toESM(require_external());
  var Hooks2 = {};
  Hooks2.SvgAnimationsClock1 = {
    mounted() {
      const thisEl = document.querySelector("#SvgAnimationsClock1");
      setInterval(function() {
        function clockMov(el, deg) {
          el.setAttribute("transform", "rotate(" + deg + " 500 500)");
        }
        var d = /* @__PURE__ */ new Date();
        clockMov(thisEl.querySelector(".sec"), 6 * d.getSeconds());
        clockMov(thisEl.querySelector(".min"), 6 * d.getMinutes());
        clockMov(thisEl.querySelector(".hour"), 30 * (d.getHours() % 12) + d.getMinutes() / 2);
      }, 1e3);
    }
  };
  Hooks2.SvgAnimationsClock2 = {
    mounted() {
      const thisEl = document.querySelector("#SvgAnimationsClock2");
      setInterval(function() {
        function clockMov(el, deg) {
          el.setAttribute("transform", "rotate(" + deg + " 500 500)");
        }
        var d = /* @__PURE__ */ new Date();
        clockMov(thisEl.querySelector(".sec"), 6 * d.getSeconds());
        clockMov(thisEl.querySelector(".min"), 6 * d.getMinutes());
        clockMov(thisEl.querySelector(".hour"), 30 * (d.getHours() % 12) + d.getMinutes() / 2);
      }, 1e3);
    }
  };
  Hooks2.SvgAnimationSignature = {
    mounted() {
      const elMain = document.querySelector("#SvgAnimationSignature");
      setTimeout(function() {
        elMain.querySelector(".path1").classList.add("name1");
        elMain.querySelector(".path2").classList.add("name2");
        elMain.querySelector(".path3").classList.add("paint");
        elMain.style.visibility = "visible";
      }, 1e3);
    }
  };
  Hooks2.UpdatingRotatingTextone = {
    mounted() {
      const elem = document.querySelector("#UpdatingRotatingTextone");
      rotatingTextAnimone = function(textId, firstRound) {
        Object.assign(elem.querySelector(".rotText.item" + textId).style, { bottom: "-75%", opacity: "0" });
        if (textId < 2) {
          if (textId == 1) {
            if (firstRound == "no") {
              elem.querySelector(".rotText.item2").style.bottom = "75%";
            } else {
            }
          } else {
            elem.querySelector(".rotText.item" + (textId - 1)).style.bottom = "75%";
          }
          Object.assign(elem.querySelector(".rotText.item" + (textId + 1)).style, { bottom: "0", opacity: "1" });
          var textId = textId + 1;
        } else {
          elem.querySelector(".rotText.item1").style.bottom = "75%";
          Object.assign(elem.querySelector(".rotText.item1").style, { bottom: "0", opacity: "1" });
          var textId = 1;
          var firstRound = "no";
        }
        setTimeout(function() {
          rotatingTextAnimone(textId, firstRound);
        }, 3e3);
      };
      setTimeout(function() {
        rotatingTextAnimone(1, "yes");
      }, 3e3);
    }
  };
  Hooks2.UpdatingRotatingTexttwo = {
    mounted() {
      const elem = document.querySelector("#UpdatingRotatingTexttwo");
      rotatingTextAnimtwo = function(textId, firstRound) {
        Object.assign(elem.querySelector(".rotText.item" + textId).style, { bottom: "-75%", opacity: "0" });
        if (textId < 2) {
          if (textId == 1) {
            if (firstRound == "no") {
              elem.querySelector(".rotText.item2").style.bottom = "75%";
            } else {
            }
          } else {
            elem.querySelector(".rotText.item" + (textId - 1)).style.bottom = "75%";
          }
          Object.assign(elem.querySelector(".rotText.item" + (textId + 1)).style, { bottom: "0", opacity: "1" });
          var textId = textId + 1;
        } else {
          elem.querySelector(".rotText.item1").style.bottom = "75%";
          Object.assign(elem.querySelector(".rotText.item1").style, { bottom: "0", opacity: "1" });
          var textId = 1;
          var firstRound = "no";
        }
        setTimeout(function() {
          rotatingTextAnimtwo(textId, firstRound);
        }, 3e3);
      };
      setTimeout(function() {
        rotatingTextAnimtwo(1, "yes");
      }, 3e3);
    }
  };
  function tooltip(prop) {
    if (prop.el.children[0].dataset.position == "top") {
      Array.from(prop.el.children).forEach((elem) => {
        elem.querySelector(".tooltip-text").style.bottom = parseFloat(window.getComputedStyle(prop.el.children[0]).getPropertyValue("font-size").replace("px", "")) * prop.el.children[0].dataset.hoverZoom * 1.25 + "px";
        elem.style.cssText += "--top: 100%; --rotate: 0deg;";
      });
    } else if (prop.el.children[0].dataset.position == "bottom") {
      Array.from(prop.el.children).forEach((elem) => {
        elem.querySelector(".tooltip-text").style.top = parseFloat(window.getComputedStyle(prop.el.children[0]).getPropertyValue("font-size").replace("px", "")) * prop.el.children[0].dataset.hoverZoom * 1.25 + "px";
        elem.style.cssText += "--bottom: 100%; --rotate: 180deg;";
      });
    }
  }
  Hooks2.Tooltip = {
    mounted() {
      tooltip(this);
    },
    updated() {
      tooltip(this);
    }
  };
  function calendar(prop) {
    const trelloPrompt = document.querySelector("#trello-calendar-prompt");
    const trelloCalendar = document.querySelector("#input-trello-due-date");
    if (trelloPrompt)
      trelloPrompt.addEventListener("click", () => main());
    if (trelloCalendar)
      trelloCalendar.addEventListener("change", () => {
        setTimeout(() => {
          main();
        }, 100);
      });
    main();
    function main() {
      let stylesheet;
      flatpickr(prop.el, {
        dateFormat: prop.el.dataset.timeFormat == "" || prop.el.dataset.dateFormat == "" ? prop.el.dataset.timeFormat == "" ? prop.el.dataset.dateFormat : prop.el.dataset.timeFormat : prop.el.dataset.dateFormat + " " + prop.el.dataset.timeFormat,
        enableTime: prop.el.dataset.timeFormat == "" ? false : true,
        altInput: prop.el.dataset.altFormat == "" ? false : true,
        altFormat: prop.el.dataset.altFormat == "" ? null : prop.el.dataset.altFormat,
        defaultDate: prop.el.dataset.defaultDate,
        minDate: prop.el.dataset.minDate,
        maxDate: prop.el.dataset.maxDate,
        disable: prop.el.dataset.disabledDates.includes(",") ? prop.el.dataset.disabledDates.split(",") : [prop.el.dataset.disabledDates],
        locale: { firstDayOfWeek: prop.el.dataset.weekStart },
        mode: prop.el.dataset.calendarMode == "month" ? "single" : prop.el.dataset.calendarMode,
        conjunction: prop.el.dataset.datesConjunction,
        noCalendar: prop.el.dataset.dateFormat == "" ? true : false,
        time_24hr: prop.el.dataset.clockType == "24" ? true : false,
        minTime: prop.el.dataset.minTime,
        maxTime: prop.el.dataset.maxTime,
        inline: prop.el.dataset.inlineCalendar == "1" ? true : false,
        weekNumbers: prop.el.dataset.weekNumbers == "1" ? true : false,
        allowInput: prop.el.dataset.allowInput == "1" ? true : false,
        enableSeconds: prop.el.dataset.enableSeconds == "1" ? true : false,
        minuteIncrement: prop.el.dataset.minuteIncrement,
        position: "auto",
        shorthandCurrentMonth: prop.el.dataset.shortMonthName == "1" ? true : false,
        showMonths: prop.el.dataset.showMonths,
        monthSelectorType: prop.el.dataset.monthSelectionType == "1" ? "dropdown" : "static",
        theme: prop.el.dataset.calendarTheme,
        onOpen: function() {
          stylesheet = document.createElement("link");
          stylesheet.type = "text/css";
          stylesheet.rel = "stylesheet";
          stylesheet.href = "/assets/flatpickr_themes/" + prop.el.dataset.calendarTheme + ".css";
          document.head.appendChild(stylesheet);
        },
        onClose: function() {
          document.head.removeChild(stylesheet);
        }
      });
      prop.el.nextElementSibling.style.cursor = "pointer";
    }
  }
  Hooks2.Calendar = {
    mounted() {
      calendar(this);
    }
  };
  function charts(prop) {
    let chart;
    classes_for_check = ["userDashboardPurchasesByUser", "userDashboardPurchasesByCategory", "userDashboardPurchasesByProduct"];
    if (classes_for_check.some((class_for_check) => prop.el.parentElement.parentElement.parentElement.parentElement.classList.contains(class_for_check))) {
      prop.el.parentElement.parentElement.parentElement.parentElement.querySelectorAll(".select_from_sidebar").forEach((item) => {
        item.addEventListener("click", () => {
          chart.destroy();
          setTimeout(() => {
            chart_generate();
          }, 500);
        });
      });
    }
    chart_generate();
    function chart_generate() {
      const ctx = prop.el;
      let dataset = [];
      let dataLabels;
      let pointColors;
      let pointBorderColors;
      let label;
      let dataPoints = [];
      if (["bar", "line", "doughnut", "pie", "polarArea", "radar", "mixed"].includes(ctx.dataset.type)) {
        let multiDataPoints = [];
        let multiPointColors = [];
        let multiPointBorderColors = [];
        if (ctx.dataset.points.replace(" ", "").includes("],[")) {
          dataPoints = ctx.dataset.points.slice(2, ctx.dataset.points.length - 2).split("],[");
          dataPoints.forEach((arr) => {
            multiDataPoints.push(arr.replace(/\[|]/g, "").split(","));
          });
        } else {
          dataPoints = ctx.dataset.points.replace(/\[|]/g, "").split(",");
        }
        dataLabels = ctx.dataset.labels.replace(/\[|"|]/g, "").split(",");
        if (ctx.dataset.pointsColor.includes("],[")) {
          ctx.dataset.pointsColor.includes(")") ? pointColors = ctx.dataset.pointsColor.slice(2, ctx.dataset.pointsColor.length - 2).replace(/\[|"|]/g, "").replaceAll("),", ")$").split("$") : pointColors = ctx.dataset.pointsColor.slice(2, ctx.dataset.pointsColor.length - 2).replace(/\[|"|]/g, "").split(",");
          pointColors.forEach((point) => {
            point.includes(")") ? multiPointColors.push(point.replace(/\[|"|]/g, "").replaceAll("),", ")$").split("$")) : multiPointColors.push(point.replace(/\[|"|]/g, "").split(","));
          });
        } else {
          ctx.dataset.pointsColor.includes(")") ? pointColors = ctx.dataset.pointsColor.replace(/\[|"|]/g, "").replaceAll("),", ")$").split("$") : pointColors = ctx.dataset.pointsColor.replace(/\[|"|]/g, "").split(",");
        }
        if (ctx.dataset.pointsBorderColor.includes("],[")) {
          ctx.dataset.pointsBorderColor.includes(")") ? pointBorderColors = ctx.dataset.pointsBorderColor.slice(2, ctx.dataset.pointsBorderColor.length - 2).replace(/\[|"|]/g, "").replaceAll("),", ")$").split("$") : pointBorderColors = ctx.dataset.pointsBorderColor.slice(2, ctx.dataset.pointsBorderColor.length - 2).replace(/\[|"|]/g, "").split(",");
          pointBorderColors.forEach((point) => {
            point.includes(")") ? multiPointBorderColors.push(point.replace(/\[|"|]/g, "").replaceAll("),", ")$").split("$")) : multiPointBorderColors.push(point.replace(/\[|"|]/g, "").split(","));
          });
        } else {
          ctx.dataset.pointsBorderColor.includes(")") ? pointBorderColors = ctx.dataset.pointsBorderColor.replace(/\[|"|]/g, "").replaceAll("),", ")$").split("$") : pointBorderColors = ctx.dataset.pointsBorderColor.replace(/\[|"|]/g, "").split(",");
        }
        if (ctx.dataset.dataLabel.includes('","')) {
          label = ctx.dataset.dataLabel.slice(2, ctx.dataset.dataLabel.length - 2).split('","');
        } else {
          label = ctx.dataset.dataLabel.replaceAll('"', "").replace("[", "").replace("]", "");
        }
        if (multiDataPoints.length == 0) {
          dataset = [{
            data: dataPoints,
            type: ctx.dataset.type == "mixed" ? ctx.dataset.chartMixedType.replace(/\[|"|]/g, "").split(",")[i] : "",
            label,
            backgroundColor: pointColors,
            borderColor: pointBorderColors,
            borderWidth: ctx.dataset.pointsBorderWidth
          }];
        } else {
          for (let i2 = 0; i2 < multiDataPoints.length; i2++) {
            dataset.push(
              {
                data: multiDataPoints[i2],
                type: ctx.dataset.type == "mixed" ? ctx.dataset.chartMixedType.replace(/\[|"|]/g, "").split(",")[i2] : "",
                label: label.length == 0 ? label : label[i2],
                backgroundColor: multiPointColors.length == 0 ? pointColors : multiPointColors[i2],
                borderColor: multiPointBorderColors.length == 0 ? pointBorderColors : multiPointBorderColors[i2],
                borderWidth: ctx.dataset.pointsBorderWidth
              }
            );
          }
        }
      } else if (["scatter", "bubble"].includes(ctx.dataset.type)) {
        let x_coords = ctx.dataset.xCoords.replace(/\[|]/g, "").split(",");
        let y_coords = ctx.dataset.yCoords.replace(/\[|]/g, "").split(",");
        let dot_radius = ctx.dataset.dotRadius.replace(/\[|]/g, "").split(",");
        for (let i2 = 0; i2 < x_coords.length; i2++) {
          ctx.dataset.type == "bubble" ? dataPoints.push({ x: parseFloat(x_coords[i2]), y: parseFloat(y_coords[i2]), r: parseFloat(dot_radius[i2]) }) : dataPoints.push({ x: parseFloat(x_coords[i2]), y: parseFloat(y_coords[i2]) });
        }
        ctx.dataset.pointsColor.includes(")") ? pointColors = ctx.dataset.pointsColor.replace(/\[|"|]/g, "").replaceAll("),", ")$").split("$") : pointColors = ctx.dataset.pointsColor.replace(/\[|"|]/g, "").split(",");
        ctx.dataset.pointsBorderColor.includes(")") ? pointBorderColors = ctx.dataset.pointsBorderColor.replace(/\[|"|]/g, "").replaceAll("),", ")$").split("$") : pointBorderColors = ctx.dataset.pointsBorderColor.replace(/\[|"|]/g, "").split(",");
        dataset = [{
          data: dataPoints,
          label: ctx.dataset.dataLabel.replaceAll('"', "").replace("[", "").replace("]", ""),
          backgroundColor: pointColors,
          borderColor: pointBorderColors,
          borderWidth: ctx.dataset.pointsBorderWidth
        }];
      }
      const data = {
        type: ctx.dataset.type,
        data: { labels: dataLabels, datasets: dataset },
        options: {
          indexAxis: ctx.dataset.mainAxis,
          scales: {
            x: { position: ctx.dataset.xScalePosition },
            y: { position: ctx.dataset.yScalePosition }
          }
        }
      };
      chart = new Chart(ctx, data);
    }
  }
  Hooks2.Charts = {
    mounted() {
      charts(this);
    }
  };
  function imageCarousel(prop) {
    const maxImages = parseInt(prop.el.dataset.maxImages);
    const allImages = prop.el.querySelectorAll(".additional-image-container");
    let currentPhotoId;
    for (let i2 = 0; i2 < allImages.length; i2++) {
      if (i2 >= maxImages)
        allImages[i2].classList.add("hidden");
    }
    const config = { attributes: true, childList: false, subtree: false };
    const callback = () => {
      currentPhotoId = parseInt(prop.el.dataset.currentPhotoId);
      for (let i2 = 0; i2 < allImages.length; i2++) {
        currentPhotoId == i2 ? allImages[i2].classList.add("active") : allImages[i2].classList.remove("active");
        if (currentPhotoId >= maxImages) {
          if (i2 <= currentPhotoId - maxImages) {
            allImages[i2].classList.add("hidden");
          } else if (i2 > currentPhotoId) {
            allImages[i2].classList.add("hidden");
          } else {
            allImages[i2].classList.remove("hidden");
          }
        } else {
          if (i2 >= maxImages)
            allImages[i2].classList.add("hidden");
        }
      }
    };
    const observer = new MutationObserver(callback);
    observer.observe(prop.el, config);
  }
  Hooks2.ImageCarousel = {
    mounted() {
      imageCarousel(this);
    }
  };
  function productCollapse() {
    document.querySelectorAll(".collapse-button").forEach((button) => {
      button.addEventListener("click", function() {
        let innerInfo = this.nextElementSibling;
        innerInfo.style.maxHeight ? innerInfo.style.maxHeight = null : innerInfo.style.maxHeight = innerInfo.scrollHeight * 3 + "px";
      });
    });
  }
  Hooks2.ProductCollapse = {
    mounted() {
      productCollapse();
    }
  };
  function contactFormValidation(prop) {
    validatable_inputs = [];
    for (let i2 = 0; i2 < prop.el.querySelectorAll("input").length; i2++) {
      if (prop.el.querySelectorAll("input")[i2].dataset.pattern != "" || prop.el.querySelectorAll("input")[i2].required)
        validatable_inputs.push(prop.el.querySelectorAll("input")[i2]);
    }
    for (let i2 = 0; i2 < prop.el.querySelectorAll("textarea").length; i2++) {
      if (prop.el.querySelectorAll("textarea")[i2].dataset.pattern != "" || prop.el.querySelectorAll("textarea")[i2].required)
        validatable_inputs.push(prop.el.querySelectorAll("textarea")[i2]);
    }
    for (let i2 = 0; i2 < prop.el.querySelectorAll("select").length; i2++) {
      if (prop.el.querySelectorAll("select")[i2].dataset.pattern != "" || prop.el.querySelectorAll("select")[i2].required)
        validatable_inputs.push(prop.el.querySelectorAll("select")[i2]);
    }
    prop.el.querySelector("button").addEventListener("mouseover", validate);
    validatable_inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        validate_this(input);
      });
    });
    function validate() {
      validatable_inputs.forEach((input) => reusable_validation(input));
    }
    function validate_this(input) {
      input.addEventListener("blur", () => reusable_validation(input));
    }
    function reusable_validation(input) {
      if (!new RegExp(input.dataset.pattern).test(input.value) || input.value == "") {
        input.classList.add("error");
        input.addEventListener("keydown", () => {
          if (new RegExp(input.dataset.pattern).test(input.value) || input.value == "")
            input.classList.remove("error");
        });
      } else {
        input.classList.remove("error");
      }
    }
  }
  Hooks2.ContactFormValidation = {
    mounted() {
      contactFormValidation(this);
    }
  };
  Hooks2.Cursordemo_one = {
    mounted() {
      const cursor = document.querySelector(".dotCursor.demo_one");
      const positionElement = (e) => {
        const mouseY = e.clientY;
        const mouseX = e.clientX;
        cursor.style.transform = `translate(${mouseX - cursor.offsetWidth / 2}px, ${mouseY - cursor.offsetHeight / 2}px)`;
        const elem = document.elementFromPoint(mouseX, mouseY);
        const rgb = getComputedStyle(elem).backgroundColor;
        cursor.style.filter = "invert(100%)";
        if (elem.tagName == "A") {
          Object.assign(cursor.style, { width: "4rem", height: "4rem" });
        } else {
          Object.assign(cursor.style, { width: "2rem", height: "2rem" });
        }
      };
      let cursorComponent = document.querySelector(".stateless_comp.cursor.demo_one");
      cursorComponent.addEventListener("mousemove", positionElement);
      cursorComponent.addEventListener("mouseenter", function() {
        cursor.style.display = "flex";
      });
      cursorComponent.addEventListener("mouseleave", function() {
        cursor.style.display = "none";
      });
    }
  };
  Hooks2.Cursordemo_two = {
    mounted() {
      const cursor = document.querySelector(".dotCursor.demo_two");
      const positionElement = (e) => {
        const mouseY = e.clientY;
        const mouseX = e.clientX;
        cursor.style.transform = `translate(${mouseX - cursor.offsetWidth / 2}px, ${mouseY - cursor.offsetHeight / 2}px)`;
        const elem = document.elementFromPoint(mouseX, mouseY);
        const rgb = getComputedStyle(elem).backgroundColor;
        cursor.style.filter = "invert(100%)";
        if (elem.tagName == "A") {
          Object.assign(cursor.style, { width: "4rem", height: "4rem" });
        } else {
          Object.assign(cursor.style, { width: "2rem", height: "2rem" });
        }
      };
      let cursorComponent = document.querySelector(".stateless_comp.cursor.demo_two");
      cursorComponent.addEventListener("mousemove", positionElement);
      cursorComponent.addEventListener("mouseenter", function() {
        cursor.style.display = "flex";
      });
      cursorComponent.addEventListener("mouseleave", function() {
        cursor.style.display = "none";
      });
    }
  };
  Hooks2.Cursordemo_three = {
    mounted() {
      const cursor = document.querySelector(".dotCursor.demo_three");
      const positionElement = (e) => {
        const mouseY = e.clientY;
        const mouseX = e.clientX;
        cursor.style.transform = `translate(${mouseX - cursor.offsetWidth / 2}px, ${mouseY - cursor.offsetHeight / 2}px)`;
        const elem = document.elementFromPoint(mouseX, mouseY);
        const rgb = getComputedStyle(elem).backgroundColor;
        cursor.style.backgroundColor = rgb;
        cursor.style.filter = "invert(100%)";
        if (elem.tagName == "A") {
          Object.assign(cursor.style, { width: "4rem", height: "4rem" });
        } else {
          Object.assign(cursor.style, { width: "2rem", height: "2rem" });
        }
      };
      let cursorComponent = document.querySelector(".stateless_comp.cursor.demo_three");
      cursorComponent.addEventListener("mousemove", positionElement);
      cursorComponent.addEventListener("mouseenter", function() {
        cursor.style.display = "flex";
      });
      cursorComponent.addEventListener("mouseleave", function() {
        cursor.style.display = "none";
      });
    }
  };
  Hooks2.Cursordemo_four = {
    mounted() {
      const cursor = document.querySelector(".dotCursor.demo_four");
      const positionElement = (e) => {
        const mouseY = e.clientY;
        const mouseX = e.clientX;
        cursor.style.transform = `translate(${mouseX - cursor.offsetWidth / 2}px, ${mouseY - cursor.offsetHeight / 2}px)`;
        const elem = document.elementFromPoint(mouseX, mouseY);
        const rgb = getComputedStyle(elem).backgroundColor;
        cursor.style.filter = "invert(100%)";
        if (elem.tagName == "A") {
          Object.assign(cursor.style, { width: "4rem", height: "4rem" });
        } else {
          Object.assign(cursor.style, { width: "2rem", height: "2rem" });
        }
      };
      let cursorComponent = document.querySelector(".stateless_comp.cursor.demo_four");
      cursorComponent.addEventListener("mousemove", positionElement);
      cursorComponent.addEventListener("mouseenter", function() {
        cursor.style.display = "flex";
      });
      cursorComponent.addEventListener("mouseleave", function() {
        cursor.style.display = "none";
      });
    }
  };
  function countdownLoad(prop) {
    if (!document.cookie.includes("countdown_shown=1")) {
      let Countdown = function(elem, seconds) {
        let that = {};
        that.elem = elem.querySelector(".time");
        that.seconds = seconds;
        that.totalTime = seconds * 100;
        that.usedTime = 0;
        that.startTime = (/* @__PURE__ */ new Date()).getTime();
        that.timer = null;
        that.count = function() {
          that.usedTime = Math.floor(((/* @__PURE__ */ new Date()).getTime() - that.startTime) / 10);
          let tt = that.totalTime - that.usedTime;
          if (tt <= 0) {
            that.elem.innerHTML = "00:00:00.000";
            zoomToMain(elem);
            clearInterval(that.timer);
          } else {
            let mi = Math.floor(tt / (60 * 100));
            let ss = Math.floor((tt - mi * 360 * 100) / 100);
            let ms = tt - (Math.floor(tt / 100) * 100).toFixed(3);
            that.elem.innerHTML = "00:" + that.fillZero(mi) + ":" + that.fillZero(ss) + "." + that.fillZero(ms) + Math.floor(Math.random() * 10).toString();
          }
        };
        that.start = function() {
          if (!that.timer)
            that.timer = setInterval(that.count, 1);
        };
        that.fillZero = function(num) {
          return num < 10 ? "0" + num : num;
        };
        return that;
      }, zoomToMain = function(elem) {
        elem.querySelector(".countdown").classList.remove("active");
        document.body.style.overflowY = "unset";
        setTimeout(() => {
          elem.querySelector(".countdown").style.display = "none";
          document.body.style.overflow = "unset";
        }, elem.dataset.animationSeconds * 500);
      };
      prop.el.querySelector(".countdown").style.display = "flex";
      globFuncs.cookie.set("countdown_shown", 1, parseInt(prop.el.dataset.cookieTime), prop.el.dataset.cookieUnits);
      document.body.style.overflow = "hidden";
      new Countdown(prop.el, parseInt(prop.el.dataset.seconds)).start();
      prop.el.querySelector(".skip-button").addEventListener("click", () => {
        new Countdown(prop.el, 0).start();
      });
    }
  }
  Hooks2.CountdownLoad = {
    mounted() {
      countdownLoad(this);
    }
  };
  Hooks2.ScrollToBottom = {
    mounted() {
      this.scrollToBottom();
    },
    updated() {
      this.scrollToBottom();
    },
    scrollToBottom() {
      let chatContainer = this.el;
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };
  function cookieBanner(prop) {
    const checkboxes = prop.el.querySelectorAll(".cookie-banner-checkbox");
    const accept_buttons = [prop.el.querySelector(".accept-button"), prop.el.querySelector(".modal-accept-button")];
    const decline_buttons = [prop.el.querySelector(".decline-button"), prop.el.querySelector(".modal-decline-button")];
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", () => {
        checkboxes.forEach((el) => {
          if (el.name == checkbox.name)
            el.checked = checkbox.checked;
        });
      });
    });
    accept_buttons.forEach((button) => button.addEventListener("click", () => control_checkboxes("accept")));
    decline_buttons.forEach((button) => button.addEventListener("click", () => control_checkboxes("decline")));
    function control_checkboxes(action) {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = action == "accept" ? true : false;
      });
    }
  }
  Hooks2.CookieBanner = {
    mounted() {
      cookieBanner(this);
    }
  };
  function headerScroll(prop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY == 0) {
        prop.el.querySelector("header").style.height = "6rem";
        prop.el.querySelector("section").style.marginTop = "7.5rem";
      } else {
        prop.el.querySelector("header").style.height = "3rem";
        prop.el.querySelector("section").style.marginTop = "4.5rem";
      }
    });
  }
  Hooks2.HeaderScroll = {
    mounted() {
      headerScroll(this);
    }
  };
  function changeColorInterval(prop) {
    prop.el.addEventListener("click", () => {
      prop.el.parentElement.querySelector(".payment-popup").classList.remove("hidden");
      prop.el.parentElement.querySelector(".payment-processing-loader1").style.animationDelay = "-0.75s";
      prop.el.parentElement.querySelector(".payment-processing-loader2").style.animationDelay = "-0.5s";
      const colorInterval = setInterval(() => {
        prop.el.parentElement.querySelector(".payment-processing-loader1").style.backgroundColor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
        prop.el.parentElement.querySelector(".payment-processing-loader2").style.backgroundColor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
        prop.el.parentElement.querySelector(".payment-processing-loader3").style.backgroundColor = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
      }, 1500);
      setTimeout(() => {
        clearInterval(colorInterval);
        prop.el.parentElement.querySelector(".payment-processing").classList.add("hidden");
        prop.el.parentElement.querySelector(".payment-complete").classList.remove("hidden");
      }, 1e4);
    });
  }
  Hooks2.ChangeColorInterval = {
    mounted() {
      changeColorInterval(this);
    }
  };
  function checkBannersCookies(prop) {
    if (!document.cookie.includes(prop.el.dataset.cookieName))
      prop.el.parentElement.classList.remove("hidden");
  }
  Hooks2.CheckBannersCookies = {
    mounted() {
      checkBannersCookies(this);
    }
  };
  function underscoreHook(prop) {
    prop.el.dataset.effectAction == "hover", prop.el.addEventListener("mouseover", () => keepUnderline());
    prop.el.dataset.effectAction == "load", prop.el.querySelector("svg").classList.add("loading");
    function keepUnderline() {
      if (!prop.el.querySelector("svg").classList.contains("active")) {
        prop.el.querySelector("svg").classList.add("hovered");
        setTimeout(() => {
          prop.el.querySelector("svg").classList.remove("hovered");
          prop.el.querySelector("svg").classList.add("active");
        }, prop.el.dataset.effectDuration * 1e3);
      }
    }
  }
  Hooks2.UnderscoreHook = {
    mounted() {
      underscoreHook(this);
    }
  };
  function dragAndDrop(prop) {
    let placeholder, draggedElement, labelsChanged, labels, fromListId;
    let boardCards = prop.el.querySelectorAll(".board-card");
    prop.el.addEventListener("cards_update", () => {
      setTimeout(async () => {
        const boardCardsUpdated = await fetchAllElements(".board-card", boardCards);
        boardCards = boardCardsUpdated;
        main();
      }, 500);
    });
    function createPlaceholder() {
      if (!draggedElement)
        return;
      placeholder = Object.assign(document.createElement("div"), { className: "placeholder-card" });
      Object.assign(placeholder.style, { height: `${draggedElement.offsetHeight}px`, width: `${draggedElement.offsetWidth}px` });
    }
    main();
    function main() {
      prop.el.querySelector(".add-list-button").addEventListener("click", () => {
        setTimeout(() => {
          prop.el.querySelector(".add-list-input").focus();
        }, 100);
      });
      boardCards.forEach((boardCard) => {
        boardCard.addEventListener("click", async () => {
          labelsChanged = true;
          const detailedCard = await fetchElement(`.detailed-card-${boardCard.dataset.cardId}`);
          if (labelsChanged) {
            let labelsRecursion = function() {
              labels = detailedCard.querySelectorAll(".label-item-choose");
              labels.forEach((label) => label.addEventListener("click", () => {
                const labelId = Number(label.parentElement.dataset.labelId);
                const currentLabels = JSON.parse(boardCard.dataset.labels);
                boardCard.dataset.labels = JSON.stringify(currentLabels.includes(labelId) ? currentLabels.filter((id) => id !== labelId) : [...currentLabels, labelId]);
                updateCardLabels(boardCard, labelId);
                update_text_fields();
              }));
            }, updateCardData = function(selector, dataAttribute) {
              const element = detailedCard.querySelector(selector);
              element.addEventListener("blur", () => {
                boardCard.dataset[dataAttribute] = dataAttribute == "cardDescription" ? /^(<br\s*\/?>|[\s\u00A0\r\n])*$/i.test(element.innerHTML) ? "" : element.innerHTML : element.textContent;
                dataAttribute == "cardDescription" ? updateCardDescription(element.innerHTML) : updateCardName(element.textContent);
              });
            }, checklistsRecursion = function() {
              setTimeout(() => {
                detailedCard.querySelectorAll(".checklist-title-edit").forEach((checklist_title) => {
                  const checklistId = checklist_title.dataset.checklistId;
                  const element = detailedCard.querySelector(`.checklist-title-edit-${checklistId}`);
                  element.addEventListener("blur", () => {
                    updateChecklistName(checklistId, element.textContent);
                  });
                });
              }, 500);
            }, update_text_fields = function() {
              setTimeout(() => {
                updateCardData(".card-title-edit", "cardName");
                updateCardData(".card-description-edit", "cardDescription");
                detailedCard.querySelectorAll(".checklist-title-edit").forEach((checklist_title) => {
                  updateCardData(`.checklist-title-edit-${checklist_title.dataset.checklistId}`, "checklistName");
                });
              }, 500);
            };
            if (detailedCard) {
              let resizeTextArea = function(comment) {
                if (comment == commentInput)
                  detailedCard.querySelector(".add-comment-button").addEventListener("click", () => {
                    setTimeout(() => {
                      comment.focus();
                    }, 100);
                  });
                const resizeTextarea = () => {
                  requestAnimationFrame(resizeTextarea);
                  comment.style.height = "auto";
                  comment.style.height = `${comment.scrollHeight}px`;
                };
                comment.addEventListener("input", resizeTextarea);
                comment.parentElement.querySelectorAll("button").forEach((button) => {
                  button.addEventListener("click", () => {
                    if (comment == commentInput)
                      comment.value = "";
                    resizeTextarea();
                  });
                });
                resizeTextarea();
              };
              const commentInput = detailedCard.querySelector(".comment-input");
              const commentEdits = detailedCard.querySelectorAll(".comment-edit");
              resizeTextArea(commentInput);
              commentEdits.forEach((commentEdit) => resizeTextArea(commentEdit));
            }
            labelsChanged = false;
            labelsRecursion();
            prop.el.addEventListener("reset_labels_form", () => {
              setTimeout(async () => {
                const form = await fetchElement(".new-label");
                form.querySelector('input[name="new-label"]').value = "";
                form.querySelector('input[name="new-label-color"]').value = "rgb(0,0,0)";
                labelsRecursion();
              }, 500);
            });
            detailedCard.querySelector(".card-title-edit").addEventListener("keydown", (event) => {
              if (event.keyCode == 13)
                event.preventDefault();
            });
            updateCardData(".card-title-edit", "cardName");
            updateCardData(".card-description-edit", "cardDescription");
            checklistsRecursion();
            detailedCard.querySelector(".add-new-checklist-button").addEventListener("click", () => checklistsRecursion());
            const dueDateModal = detailedCard.querySelector(".add-due-date");
            const calendar2 = detailedCard.querySelector("#input-trello-due-date");
            let completionCheck;
            calendar2.addEventListener("change", async () => {
              boardCard.dataset.dueDate = calendar2.value;
              updateDueDate(calendar2.value);
              dueDateCheckbox();
              update_text_fields();
            });
            dueDateCheckbox();
            dueDateModal.querySelector(".clear-due-date-button").addEventListener("click", () => {
              dueDateModal.querySelector("#input-trello-due-date").value = dueDateModal.querySelector("#input-trello-due-date").nextElementSibling.value = "";
              completionCheck.checked = boardCard.dataset.completed = false;
              completionCheck = null;
              calendar2.dispatchEvent(new Event("change"));
            });
            async function dueDateCheckbox() {
              completionCheck = await fetchElement(".due-date-completion");
              completionCheck.addEventListener("click", () => {
                boardCard.dataset.completed = completionCheck.checked;
                updateDueDateCheck(completionCheck.checked);
              });
            }
          }
        });
        boardCard.addEventListener("dragstart", (event) => {
          draggedElement = event.target;
          createPlaceholder();
          draggedElement.style.margin = `-${draggedElement.offsetHeight}px`;
          draggedElement.classList.add("dragged");
          fromListId = event.target.parentElement.parentElement.dataset.listId;
        });
        boardCard.addEventListener("dragend", (event) => {
          if (draggedElement) {
            draggedElement.style.margin = "0.5rem 0";
            draggedElement.classList.remove("dragged");
          }
          if (placeholder)
            placeholder.remove();
          placeholder = draggedElement = null;
          updateCardsInLists(event.target);
        });
      });
      prop.el.querySelectorAll(".board-cards-container").forEach((container) => {
        container.parentElement.querySelectorAll(".add-card-button").forEach((button) => button.addEventListener("click", () => {
          setTimeout(() => {
            container.scrollTop = container.scrollHeight;
            container.querySelector(".add-card-input").focus();
          }, 100);
        }));
        container.parentElement.querySelector(".create-card").addEventListener("click", () => {
          setTimeout(() => {
            container.scrollTop = container.scrollHeight;
          }, 100);
        });
        container.addEventListener("dragenter", (event) => {
          event.preventDefault();
          if (!placeholder)
            createPlaceholder();
        });
        container.addEventListener("dragover", (event) => {
          event.preventDefault();
          const targetCard = event.target.closest(".board-card");
          if (targetCard) {
            const rect = targetCard.getBoundingClientRect();
            const offset = event.clientY - rect.top;
            offset > rect.height / 2 ? targetCard.after(placeholder) : targetCard.before(placeholder);
          } else if (!container.contains(placeholder)) {
            container.appendChild(placeholder);
          }
        });
        container.addEventListener("dragleave", (event) => {
          if (!container.contains(event.relatedTarget) && event.relatedTarget !== placeholder && placeholder)
            removePlaceholder();
        });
        container.addEventListener("drop", (event) => {
          event.preventDefault();
          if (placeholder && draggedElement) {
            container.insertBefore(draggedElement, placeholder);
            removePlaceholder();
            boardCards = prop.el.querySelectorAll(".board-card");
            updateCardIds();
            updateCardOrders();
            updateCardList();
          }
        });
        function removePlaceholder() {
          placeholder.remove();
          placeholder = null;
        }
      });
    }
    function fetchElement(selector) {
      return new Promise((resolve, reject) => {
        const element = document.querySelector(selector);
        if (element) {
          resolve(element);
        } else {
          setTimeout(() => {
            fetchElement(selector).then(resolve).catch(reject);
          }, 500);
        }
      });
    }
    function fetchAllElements(selector, oldElements) {
      return new Promise((resolve, reject) => {
        const elements = document.querySelectorAll(selector);
        if (oldElements == elements) {
          setTimeout(() => {
            fetchElement(selector).then(resolve).catch(reject);
          }, 500);
        } else {
          resolve(elements);
        }
      });
    }
    function updateCardName(newName) {
      prop.pushEvent("update_card_title", { newName });
    }
    function updateCardDescription(newDescription) {
      prop.pushEvent("update_card_description", { newDescription });
    }
    function updateChecklistName(checklistId, newName) {
      prop.pushEvent("update_checklist_name", { checklistId, newName });
    }
    function updateCardLabels(element, labelId) {
      const cardId = element.dataset.cardId;
      prop.pushEvent("update_labels_in_card", { cardId, labelId });
    }
    function updateDueDate(dueDate) {
      prop.pushEvent("update_due_date_in_card", { dueDate });
    }
    function updateDueDateCheck(check) {
      prop.pushEvent("update_due_date_completion_in_card", { check });
    }
    function updateCardsInLists(element) {
      const movedCardId = element.dataset.cardId;
      const movedCardPosition = element.dataset.order;
      const targetListId = element.parentElement.parentElement.dataset.listId;
      prop.pushEvent("update_card_in_lists", { movedCardId, targetListId, movedCardPosition, fromListId });
      document.querySelectorAll(".board-card").forEach((card) => {
        const cardId = card.dataset.cardId;
        const cardOrder = card.dataset.order;
        prop.pushEvent("update_card_order", { cardId, cardOrder });
      });
    }
    function updateCardIds() {
      prop.el.querySelectorAll(".board-list").forEach((listEl) => {
        const listName = listEl.querySelector(".heading h4").textContent.trim().replace(/\s/g, "_");
        listEl.querySelectorAll(".board-card").forEach((cardEl, index) => {
          cardEl.id = `${listName}-${index + 1}`;
        });
      });
    }
    function updateCardOrders() {
      prop.el.querySelectorAll(".board-list").forEach((listEl) => {
        listEl.querySelectorAll(".board-card").forEach((cardEl, index) => {
          cardEl.dataset.order = index + 1;
        });
      });
    }
    function updateCardList() {
      prop.el.querySelectorAll(".board-list").forEach((listEl) => {
        listEl.querySelectorAll(".board-card").forEach((cardEl) => {
          cardEl.dataset.listId = listEl.dataset.listId;
        });
      });
    }
  }
  Hooks2.DragAndDrop = {
    mounted() {
      dragAndDrop(this);
    }
  };
  function cardsVisibilityHook(prop) {
    prop.el.addEventListener("click", () => globFuncs.cookie.set("cards_filtered_visibility", prop.el.checked, 1, "m"));
  }
  Hooks2.CardsVisibilityHook = {
    mounted() {
      cardsVisibilityHook(this);
    }
  };
  var hooks_default2 = Hooks2;

  // js/app.js
  var csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  var liveSocket = new LiveSocket("/live", Socket, {
    longPollFallbackMs: 2500,
    params: { _csrf_token: csrfToken },
    hooks: hooks_default2
    /*(1)*/
  });
  import_topbar.default.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" });
  window.addEventListener("phx:page-loading-start", (_info) => import_topbar.default.show(300));
  window.addEventListener("phx:page-loading-stop", (_info) => import_topbar.default.hide());
  liveSocket.connect();
  window.liveSocket = liveSocket;
})();
/**
 * @license MIT
 * topbar 2.0.0, 2023-02-04
 * https://buunguyen.github.io/topbar
 * Copyright (c) 2021 Buu Nguyen
 */
/* flatpickr v4.6.13,, @license MIT */
/*!
 * Chart.js v4.4.3
 * https://www.chartjs.org
 * (c) 2024 Chart.js Contributors
 * Released under the MIT License
 */
/*!
 * @kurkle/color v0.3.2
 * https://github.com/kurkle/color#readme
 * (c) 2023 Jukka Kurkela
 * Released under the MIT License
 */