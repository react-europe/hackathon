/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(42);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/*global __DEV__ __CORDOVA__ StatusBar*/

	'use strict';

	__webpack_require__(43);
	__webpack_require__(44);
	var React = __webpack_require__(49);
	var App = __webpack_require__(200);

	function render() {
	  React.render(React.createElement(App, null), document.getElementById('container'));
	}

	function onDeviceReady() {
	  StatusBar.hide();
	  render();
	}

	if ((typeof cordova !== 'undefined')) {
	  document.addEventListener('deviceready', onDeviceReady, false);
	} else {
	  render();
	}

/***/ },
/* 43 */
/***/ function(module, exports) {

	(function() {
	  'use strict';

	  if (self.fetch) {
	    return
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = name.toString();
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = value.toString();
	    }
	    return value
	  }

	  function Headers(headers) {
	    this.map = {}

	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)

	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }

	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }

	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }

	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }

	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }

	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }

	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }

	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }

	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob();
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self
	  }

	  function Body() {
	    this.bodyUsed = false


	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (!body) {
	        this._bodyText = ''
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	    }

	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }

	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }

	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }

	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }

	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }

	    return this
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }

	  function Request(url, options) {
	    options = options || {}
	    this.url = url

	    this.credentials = options.credentials || 'omit'
	    this.headers = new Headers(options.headers)
	    this.method = normalizeMethod(options.method || 'GET')
	    this.mode = options.mode || null
	    this.referrer = null

	    if ((this.method === 'GET' || this.method === 'HEAD') && options.body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(options.body)
	  }

	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }

	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = xhr.getAllResponseHeaders().trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }

	  Body.call(Request.prototype)

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }

	    this._initBody(bodyInit)
	    this.type = 'default'
	    this.url = null
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	  }

	  Body.call(Response.prototype)

	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;

	  self.fetch = function(input, init) {
	    // TODO: Request constructor should accept input, init
	    var request
	    if (Request.prototype.isPrototypeOf(input) && !init) {
	      request = input
	    } else {
	      request = new Request(input, init)
	    }

	    return new Promise(function(resolve, reject) {
	      var xhr = new XMLHttpRequest()

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }

	        return;
	      }

	      xhr.onload = function() {
	        var status = (xhr.status === 1223) ? 204 : xhr.status
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'))
	          return
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options))
	      }

	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }

	      xhr.open(request.method, request.url, true)

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }

	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})();


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var m = __webpack_require__(45),
	    IntlPolyfill = m.default;

	// add locale data for all locales into runtime
	global.IntlPolyfill = IntlPolyfill;
	__webpack_require__(48);

	// hack to export the polyfill as global Intl if needed
	if (!global.Intl) {
	    global.Intl = IntlPolyfill;
	    IntlPolyfill.__applyLocaleSensitivePrototypes();
	}

	// providing an idiomatic api for the nodejs version of this module
	module.exports = exports = IntlPolyfill;
	// preserving the original api in case another module is relying on that
	exports.default = IntlPolyfill;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.seal(Object.defineProperties(exports, {
	    default: {
	        get: function() {
	            return src$core$$default;
	        },

	        enumerable: true
	    }
	}));

	var src$exp$$ = __webpack_require__(46), src$cldr$$ = __webpack_require__(47);

	var Intl = {},

	    realDefineProp = (function () {
	        var sentinel = {};
	        try {
	            Object.defineProperty(sentinel, 'a', {});
	            return 'a' in sentinel;
	        } catch (e) {
	            return false;
	        }
	    })(),

	    // Need a workaround for getters in ES3
	    es3  = !realDefineProp && !Object.prototype.__defineGetter__,

	    // We use this a lot (and need it for proto-less objects)
	    hop = Object.prototype.hasOwnProperty,

	    // Naive defineProperty for compatibility
	    defineProperty = realDefineProp ? Object.defineProperty : function (obj, name, desc) {
	        if ('get' in desc && obj.__defineGetter__)
	            obj.__defineGetter__(name, desc.get);

	        else if (!hop.call(obj, name) || 'value' in desc)
	            obj[name] = desc.value;
	    },

	    // Array.prototype.indexOf, as good as we need it to be
	    arrIndexOf = Array.prototype.indexOf || function (search) {
	        /*jshint validthis:true */
	        var t = this;
	        if (!t.length)
	            return -1;

	        for (var i = arguments[1] || 0, max = t.length; i < max; i++) {
	            if (t[i] === search)
	                return i;
	        }

	        return -1;
	    },

	    // Create an object with the specified prototype (2nd arg required for Record)
	    objCreate = Object.create || function (proto, props) {
	        var obj;

	        function F() {}
	        F.prototype = proto;
	        obj = new F();

	        for (var k in props) {
	            if (hop.call(props, k))
	                defineProperty(obj, k, props[k]);
	        }

	        return obj;
	    },

	    // Snapshot some (hopefully still) native built-ins
	    arrSlice  = Array.prototype.slice,
	    arrConcat = Array.prototype.concat,
	    arrPush   = Array.prototype.push,
	    arrJoin   = Array.prototype.join,
	    arrShift  = Array.prototype.shift,
	    arrUnshift= Array.prototype.unshift,

	    // Naive Function.prototype.bind for compatibility
	    fnBind = Function.prototype.bind || function (thisObj) {
	        var fn = this,
	            args = arrSlice.call(arguments, 1);

	        // All our (presently) bound functions have either 1 or 0 arguments. By returning
	        // different function signatures, we can pass some tests in ES3 environments
	        if (fn.length === 1) {
	            return function (a) {
	                return fn.apply(thisObj, arrConcat.call(args, arrSlice.call(arguments)));
	            };
	        }
	        else {
	            return function () {
	                return fn.apply(thisObj, arrConcat.call(args, arrSlice.call(arguments)));
	            };
	        }
	    },

	    // Default locale is the first-added locale data for us
	    defaultLocale,

	    // Object housing internal properties for constructors
	    internals = objCreate(null),

	    // Keep internal properties internal
	    secret = Math.random(),

	    // An object map of date component keys, saves using a regex later
	    dateWidths = objCreate(null, { narrow:{}, short:{}, long:{} }),

	    // Each constructor prototype should be an instance of the constructor itself, but we
	    // can't initialise them as such until some locale data has been added, so this is how
	    // we keep track
	    numberFormatProtoInitialised = false,
	    dateTimeFormatProtoInitialised = false,

	    // Some regular expressions we're using
	    expCurrencyCode = /^[A-Z]{3}$/,
	    expUnicodeExSeq = /-u(?:-[0-9a-z]{2,8})+/gi, // See `extension` below

	    // IANA Subtag Registry redundant tag and subtag maps
	    redundantTags = {
	        tags: {
	            "art-lojban":   "jbo",       "i-ami":        "ami",       "i-bnn":       "bnn",  "i-hak":      "hak",
	            "i-klingon":    "tlh",       "i-lux":        "lb",        "i-navajo":    "nv",   "i-pwn":      "pwn",
	            "i-tao":        "tao",       "i-tay":        "tay",       "i-tsu":       "tsu",  "no-bok":     "nb",
	            "no-nyn":       "nn",        "sgn-BE-FR":    "sfb",       "sgn-BE-NL":   "vgt",  "sgn-CH-DE":  "sgg",
	            "zh-guoyu":     "cmn",       "zh-hakka":     "hak",       "zh-min-nan":  "nan",  "zh-xiang":   "hsn",
	            "sgn-BR":       "bzs",       "sgn-CO":       "csn",       "sgn-DE":      "gsg",  "sgn-DK":     "dsl",
	            "sgn-ES":       "ssp",       "sgn-FR":       "fsl",       "sgn-GB":      "bfi",  "sgn-GR":     "gss",
	            "sgn-IE":       "isg",       "sgn-IT":       "ise",       "sgn-JP":      "jsl",  "sgn-MX":     "mfs",
	            "sgn-NI":       "ncs",       "sgn-NL":       "dse",       "sgn-NO":      "nsl",  "sgn-PT":     "psr",
	            "sgn-SE":       "swl",       "sgn-US":       "ase",       "sgn-ZA":      "sfs",  "zh-cmn":     "cmn",
	            "zh-cmn-Hans":  "cmn-Hans",  "zh-cmn-Hant":  "cmn-Hant",  "zh-gan":      "gan",  "zh-wuu":     "wuu",
	            "zh-yue":       "yue"
	        },
	        subtags: {
	              BU: "MM",   DD: "DE",   FX: "FR",   TP: "TL",   YD: "YE",   ZR: "CD",  heploc: "alalc97",
	            'in': "id",   iw: "he",   ji:  "yi",  jw: "jv",   mo: "ro",  ayx: "nun", bjd: "drl",
	             ccq: "rki", cjr: "mom", cka: "cmr", cmk: "xch", drh: "khk", drw: "prs", gav: "dev",
	             hrr: "jal", ibi: "opa", kgh: "kml", lcq: "ppr", mst: "mry", myt: "mry", sca: "hle",
	             tie: "ras", tkk: "twm", tlw: "weo", tnf: "prs", ybd: "rki", yma: "lrr"
	        },
	        extLang: {
	            aao: [ "aao", "ar"  ], abh: [ "abh", "ar"  ], abv: [ "abv", "ar"  ], acm: [ "acm", "ar"  ],
	            acq: [ "acq", "ar"  ], acw: [ "acw", "ar"  ], acx: [ "acx", "ar"  ], acy: [ "acy", "ar"  ],
	            adf: [ "adf", "ar"  ], ads: [ "ads", "sgn" ], aeb: [ "aeb", "ar"  ], aec: [ "aec", "ar"  ],
	            aed: [ "aed", "sgn" ], aen: [ "aen", "sgn" ], afb: [ "afb", "ar"  ], afg: [ "afg", "sgn" ],
	            ajp: [ "ajp", "ar"  ], apc: [ "apc", "ar"  ], apd: [ "apd", "ar"  ], arb: [ "arb", "ar"  ],
	            arq: [ "arq", "ar"  ], ars: [ "ars", "ar"  ], ary: [ "ary", "ar"  ], arz: [ "arz", "ar"  ],
	            ase: [ "ase", "sgn" ], asf: [ "asf", "sgn" ], asp: [ "asp", "sgn" ], asq: [ "asq", "sgn" ],
	            asw: [ "asw", "sgn" ], auz: [ "auz", "ar"  ], avl: [ "avl", "ar"  ], ayh: [ "ayh", "ar"  ],
	            ayl: [ "ayl", "ar"  ], ayn: [ "ayn", "ar"  ], ayp: [ "ayp", "ar"  ], bbz: [ "bbz", "ar"  ],
	            bfi: [ "bfi", "sgn" ], bfk: [ "bfk", "sgn" ], bjn: [ "bjn", "ms"  ], bog: [ "bog", "sgn" ],
	            bqn: [ "bqn", "sgn" ], bqy: [ "bqy", "sgn" ], btj: [ "btj", "ms"  ], bve: [ "bve", "ms"  ],
	            bvl: [ "bvl", "sgn" ], bvu: [ "bvu", "ms"  ], bzs: [ "bzs", "sgn" ], cdo: [ "cdo", "zh"  ],
	            cds: [ "cds", "sgn" ], cjy: [ "cjy", "zh"  ], cmn: [ "cmn", "zh"  ], coa: [ "coa", "ms"  ],
	            cpx: [ "cpx", "zh"  ], csc: [ "csc", "sgn" ], csd: [ "csd", "sgn" ], cse: [ "cse", "sgn" ],
	            csf: [ "csf", "sgn" ], csg: [ "csg", "sgn" ], csl: [ "csl", "sgn" ], csn: [ "csn", "sgn" ],
	            csq: [ "csq", "sgn" ], csr: [ "csr", "sgn" ], czh: [ "czh", "zh"  ], czo: [ "czo", "zh"  ],
	            doq: [ "doq", "sgn" ], dse: [ "dse", "sgn" ], dsl: [ "dsl", "sgn" ], dup: [ "dup", "ms"  ],
	            ecs: [ "ecs", "sgn" ], esl: [ "esl", "sgn" ], esn: [ "esn", "sgn" ], eso: [ "eso", "sgn" ],
	            eth: [ "eth", "sgn" ], fcs: [ "fcs", "sgn" ], fse: [ "fse", "sgn" ], fsl: [ "fsl", "sgn" ],
	            fss: [ "fss", "sgn" ], gan: [ "gan", "zh"  ], gds: [ "gds", "sgn" ], gom: [ "gom", "kok" ],
	            gse: [ "gse", "sgn" ], gsg: [ "gsg", "sgn" ], gsm: [ "gsm", "sgn" ], gss: [ "gss", "sgn" ],
	            gus: [ "gus", "sgn" ], hab: [ "hab", "sgn" ], haf: [ "haf", "sgn" ], hak: [ "hak", "zh"  ],
	            hds: [ "hds", "sgn" ], hji: [ "hji", "ms"  ], hks: [ "hks", "sgn" ], hos: [ "hos", "sgn" ],
	            hps: [ "hps", "sgn" ], hsh: [ "hsh", "sgn" ], hsl: [ "hsl", "sgn" ], hsn: [ "hsn", "zh"  ],
	            icl: [ "icl", "sgn" ], ils: [ "ils", "sgn" ], inl: [ "inl", "sgn" ], ins: [ "ins", "sgn" ],
	            ise: [ "ise", "sgn" ], isg: [ "isg", "sgn" ], isr: [ "isr", "sgn" ], jak: [ "jak", "ms"  ],
	            jax: [ "jax", "ms"  ], jcs: [ "jcs", "sgn" ], jhs: [ "jhs", "sgn" ], jls: [ "jls", "sgn" ],
	            jos: [ "jos", "sgn" ], jsl: [ "jsl", "sgn" ], jus: [ "jus", "sgn" ], kgi: [ "kgi", "sgn" ],
	            knn: [ "knn", "kok" ], kvb: [ "kvb", "ms"  ], kvk: [ "kvk", "sgn" ], kvr: [ "kvr", "ms"  ],
	            kxd: [ "kxd", "ms"  ], lbs: [ "lbs", "sgn" ], lce: [ "lce", "ms"  ], lcf: [ "lcf", "ms"  ],
	            liw: [ "liw", "ms"  ], lls: [ "lls", "sgn" ], lsg: [ "lsg", "sgn" ], lsl: [ "lsl", "sgn" ],
	            lso: [ "lso", "sgn" ], lsp: [ "lsp", "sgn" ], lst: [ "lst", "sgn" ], lsy: [ "lsy", "sgn" ],
	            ltg: [ "ltg", "lv"  ], lvs: [ "lvs", "lv"  ], lzh: [ "lzh", "zh"  ], max: [ "max", "ms"  ],
	            mdl: [ "mdl", "sgn" ], meo: [ "meo", "ms"  ], mfa: [ "mfa", "ms"  ], mfb: [ "mfb", "ms"  ],
	            mfs: [ "mfs", "sgn" ], min: [ "min", "ms"  ], mnp: [ "mnp", "zh"  ], mqg: [ "mqg", "ms"  ],
	            mre: [ "mre", "sgn" ], msd: [ "msd", "sgn" ], msi: [ "msi", "ms"  ], msr: [ "msr", "sgn" ],
	            mui: [ "mui", "ms"  ], mzc: [ "mzc", "sgn" ], mzg: [ "mzg", "sgn" ], mzy: [ "mzy", "sgn" ],
	            nan: [ "nan", "zh"  ], nbs: [ "nbs", "sgn" ], ncs: [ "ncs", "sgn" ], nsi: [ "nsi", "sgn" ],
	            nsl: [ "nsl", "sgn" ], nsp: [ "nsp", "sgn" ], nsr: [ "nsr", "sgn" ], nzs: [ "nzs", "sgn" ],
	            okl: [ "okl", "sgn" ], orn: [ "orn", "ms"  ], ors: [ "ors", "ms"  ], pel: [ "pel", "ms"  ],
	            pga: [ "pga", "ar"  ], pks: [ "pks", "sgn" ], prl: [ "prl", "sgn" ], prz: [ "prz", "sgn" ],
	            psc: [ "psc", "sgn" ], psd: [ "psd", "sgn" ], pse: [ "pse", "ms"  ], psg: [ "psg", "sgn" ],
	            psl: [ "psl", "sgn" ], pso: [ "pso", "sgn" ], psp: [ "psp", "sgn" ], psr: [ "psr", "sgn" ],
	            pys: [ "pys", "sgn" ], rms: [ "rms", "sgn" ], rsi: [ "rsi", "sgn" ], rsl: [ "rsl", "sgn" ],
	            sdl: [ "sdl", "sgn" ], sfb: [ "sfb", "sgn" ], sfs: [ "sfs", "sgn" ], sgg: [ "sgg", "sgn" ],
	            sgx: [ "sgx", "sgn" ], shu: [ "shu", "ar"  ], slf: [ "slf", "sgn" ], sls: [ "sls", "sgn" ],
	            sqk: [ "sqk", "sgn" ], sqs: [ "sqs", "sgn" ], ssh: [ "ssh", "ar"  ], ssp: [ "ssp", "sgn" ],
	            ssr: [ "ssr", "sgn" ], svk: [ "svk", "sgn" ], swc: [ "swc", "sw"  ], swh: [ "swh", "sw"  ],
	            swl: [ "swl", "sgn" ], syy: [ "syy", "sgn" ], tmw: [ "tmw", "ms"  ], tse: [ "tse", "sgn" ],
	            tsm: [ "tsm", "sgn" ], tsq: [ "tsq", "sgn" ], tss: [ "tss", "sgn" ], tsy: [ "tsy", "sgn" ],
	            tza: [ "tza", "sgn" ], ugn: [ "ugn", "sgn" ], ugy: [ "ugy", "sgn" ], ukl: [ "ukl", "sgn" ],
	            uks: [ "uks", "sgn" ], urk: [ "urk", "ms"  ], uzn: [ "uzn", "uz"  ], uzs: [ "uzs", "uz"  ],
	            vgt: [ "vgt", "sgn" ], vkk: [ "vkk", "ms"  ], vkt: [ "vkt", "ms"  ], vsi: [ "vsi", "sgn" ],
	            vsl: [ "vsl", "sgn" ], vsv: [ "vsv", "sgn" ], wuu: [ "wuu", "zh"  ], xki: [ "xki", "sgn" ],
	            xml: [ "xml", "sgn" ], xmm: [ "xmm", "ms"  ], xms: [ "xms", "sgn" ], yds: [ "yds", "sgn" ],
	            ysl: [ "ysl", "sgn" ], yue: [ "yue", "zh"  ], zib: [ "zib", "sgn" ], zlm: [ "zlm", "ms"  ],
	            zmi: [ "zmi", "ms"  ], zsl: [ "zsl", "sgn" ], zsm: [ "zsm", "ms"  ]
	        }
	    },

	    // Currency minor units output from tools/getISO4217data.js, formatted
	    currencyMinorUnits = {
	        BHD: 3, BYR: 0, XOF: 0, BIF: 0, XAF: 0, CLF: 0, CLP: 0, KMF: 0, DJF: 0,
	        XPF: 0, GNF: 0, ISK: 0, IQD: 3, JPY: 0, JOD: 3, KRW: 0, KWD: 3, LYD: 3,
	        OMR: 3, PYG: 0, RWF: 0, TND: 3, UGX: 0, UYI: 0, VUV: 0, VND: 0
	    };

	// Sect 6.2 Language Tags
	// ======================

	/**
	 * The IsStructurallyValidLanguageTag abstract operation verifies that the locale
	 * argument (which must be a String value)
	 *
	 * - represents a well-formed BCP 47 language tag as specified in RFC 5646 section
	 *   2.1, or successor,
	 * - does not include duplicate variant subtags, and
	 * - does not include duplicate singleton subtags.
	 *
	 * The abstract operation returns true if locale can be generated from the ABNF
	 * grammar in section 2.1 of the RFC, starting with Language-Tag, and does not
	 * contain duplicate variant or singleton subtags (other than as a private use
	 * subtag). It returns false otherwise. Terminal value characters in the grammar are
	 * interpreted as the Unicode equivalents of the ASCII octet values given.
	 */
	function /* 6.2.2 */IsStructurallyValidLanguageTag(locale) {
	    // represents a well-formed BCP 47 language tag as specified in RFC 5646
	    if (!src$exp$$.expBCP47Syntax.test(locale))
	        return false;

	    // does not include duplicate variant subtags, and
	    if (src$exp$$.expVariantDupes.test(locale))
	        return false;

	    // does not include duplicate singleton subtags.
	    if (src$exp$$.expSingletonDupes.test(locale))
	        return false;

	    return true;
	}

	/**
	 * The CanonicalizeLanguageTag abstract operation returns the canonical and case-
	 * regularized form of the locale argument (which must be a String value that is
	 * a structurally valid BCP 47 language tag as verified by the
	 * IsStructurallyValidLanguageTag abstract operation). It takes the steps
	 * specified in RFC 5646 section 4.5, or successor, to bring the language tag
	 * into canonical form, and to regularize the case of the subtags, but does not
	 * take the steps to bring a language tag into “extlang form” and to reorder
	 * variant subtags.

	 * The specifications for extensions to BCP 47 language tags, such as RFC 6067,
	 * may include canonicalization rules for the extension subtag sequences they
	 * define that go beyond the canonicalization rules of RFC 5646 section 4.5.
	 * Implementations are allowed, but not required, to apply these additional rules.
	 */
	function /* 6.2.3 */CanonicalizeLanguageTag (locale) {
	    var match, parts;

	    // A language tag is in 'canonical form' when the tag is well-formed
	    // according to the rules in Sections 2.1 and 2.2

	    // Section 2.1 says all subtags use lowercase...
	    locale = locale.toLowerCase();

	    // ...with 2 exceptions: 'two-letter and four-letter subtags that neither
	    // appear at the start of the tag nor occur after singletons.  Such two-letter
	    // subtags are all uppercase (as in the tags "en-CA-x-ca" or "sgn-BE-FR") and
	    // four-letter subtags are titlecase (as in the tag "az-Latn-x-latn").
	    parts = locale.split('-');
	    for (var i = 1, max = parts.length; i < max; i++) {
	        // Two-letter subtags are all uppercase
	        if (parts[i].length === 2)
	            parts[i] = parts[i].toUpperCase();

	        // Four-letter subtags are titlecase
	        else if (parts[i].length === 4)
	            parts[i] = parts[i].charAt(0).toUpperCase() + parts[i].slice(1);

	        // Is it a singleton?
	        else if (parts[i].length === 1 && parts[i] != 'x')
	            break;
	    }
	    locale = arrJoin.call(parts, '-');

	    // The steps laid out in RFC 5646 section 4.5 are as follows:

	    // 1.  Extension sequences are ordered into case-insensitive ASCII order
	    //     by singleton subtag.
	    if ((match = locale.match(src$exp$$.expExtSequences)) && match.length > 1) {
	        // The built-in sort() sorts by ASCII order, so use that
	        match.sort();

	        // Replace all extensions with the joined, sorted array
	        locale = locale.replace(
	            RegExp('(?:' + src$exp$$.expExtSequences.source + ')+', 'i'),
	            arrJoin.call(match, '')
	        );
	    }

	    // 2.  Redundant or grandfathered tags are replaced by their 'Preferred-
	    //     Value', if there is one.
	    if (hop.call(redundantTags.tags, locale))
	        locale = redundantTags.tags[locale];

	    // 3.  Subtags are replaced by their 'Preferred-Value', if there is one.
	    //     For extlangs, the original primary language subtag is also
	    //     replaced if there is a primary language subtag in the 'Preferred-
	    //     Value'.
	    parts = locale.split('-');

	    for (var i = 1, max = parts.length; i < max; i++) {
	        if (hop.call(redundantTags.subtags, parts[i]))
	            parts[i] = redundantTags.subtags[parts[i]];

	        else if (hop.call(redundantTags.extLang, parts[i])) {
	            parts[i] = redundantTags.extLang[parts[i]][0];

	            // For extlang tags, the prefix needs to be removed if it is redundant
	            if (i === 1 && redundantTags.extLang[parts[1]][1] === parts[0]) {
	                parts = arrSlice.call(parts, i++);
	                max -= 1;
	            }
	        }
	    }

	    return arrJoin.call(parts, '-');
	}

	/**
	 * The DefaultLocale abstract operation returns a String value representing the
	 * structurally valid (6.2.2) and canonicalized (6.2.3) BCP 47 language tag for the
	 * host environment’s current locale.
	 */
	function /* 6.2.4 */DefaultLocale () {
	    return defaultLocale;
	}

	// Sect 6.3 Currency Codes
	// =======================

	/**
	 * The IsWellFormedCurrencyCode abstract operation verifies that the currency argument
	 * (after conversion to a String value) represents a well-formed 3-letter ISO currency
	 * code. The following steps are taken:
	 */
	function /* 6.3.1 */IsWellFormedCurrencyCode(currency) {
	    var
	        // 1. Let `c` be ToString(currency)
	        c = String(currency),

	        // 2. Let `normalized` be the result of mapping c to upper case as described
	        //    in 6.1.
	        normalized = toLatinUpperCase(c);

	    // 3. If the string length of normalized is not 3, return false.
	    // 4. If normalized contains any character that is not in the range "A" to "Z"
	    //    (U+0041 to U+005A), return false.
	    if (expCurrencyCode.test(normalized) === false)
	        return false;

	    // 5. Return true
	    return true;
	}

	// Sect 9.2 Abstract Operations
	// ============================
	function /* 9.2.1 */CanonicalizeLocaleList (locales) {
	// The abstract operation CanonicalizeLocaleList takes the following steps:

	    // 1. If locales is undefined, then a. Return a new empty List
	    if (locales === undefined)
	        return new List();

	    var
	        // 2. Let seen be a new empty List.
	        seen = new List(),

	        // 3. If locales is a String value, then
	        //    a. Let locales be a new array created as if by the expression new
	        //    Array(locales) where Array is the standard built-in constructor with
	        //    that name and locales is the value of locales.
	        locales = typeof locales === 'string' ? [ locales ] : locales,

	        // 4. Let O be ToObject(locales).
	        O = toObject(locales),

	        // 5. Let lenValue be the result of calling the [[Get]] internal method of
	        //    O with the argument "length".
	        // 6. Let len be ToUint32(lenValue).
	        len = O.length,

	        // 7. Let k be 0.
	        k = 0;

	    // 8. Repeat, while k < len
	    while (k < len) {
	        var
	            // a. Let Pk be ToString(k).
	            Pk = String(k),

	            // b. Let kPresent be the result of calling the [[HasProperty]] internal
	            //    method of O with argument Pk.
	            kPresent = Pk in O;

	        // c. If kPresent is true, then
	        if (kPresent) {
	            var
	                // i. Let kValue be the result of calling the [[Get]] internal
	                //     method of O with argument Pk.
	                kValue = O[Pk];

	            // ii. If the type of kValue is not String or Object, then throw a
	            //     TypeError exception.
	            if (kValue == null || (typeof kValue !== 'string' && typeof kValue !== 'object'))
	                throw new TypeError('String or Object type expected');

	            var
	                // iii. Let tag be ToString(kValue).
	                tag = String(kValue);

	            // iv. If the result of calling the abstract operation
	            //     IsStructurallyValidLanguageTag (defined in 6.2.2), passing tag as
	            //     the argument, is false, then throw a RangeError exception.
	            if (!IsStructurallyValidLanguageTag(tag))
	                throw new RangeError("'" + tag + "' is not a structurally valid language tag");

	            // v. Let tag be the result of calling the abstract operation
	            //    CanonicalizeLanguageTag (defined in 6.2.3), passing tag as the
	            //    argument.
	            tag = CanonicalizeLanguageTag(tag);

	            // vi. If tag is not an element of seen, then append tag as the last
	            //     element of seen.
	            if (arrIndexOf.call(seen, tag) === -1)
	                arrPush.call(seen, tag);
	        }

	        // d. Increase k by 1.
	        k++;
	    }

	    // 9. Return seen.
	    return seen;
	}

	/**
	 * The BestAvailableLocale abstract operation compares the provided argument
	 * locale, which must be a String value with a structurally valid and
	 * canonicalized BCP 47 language tag, against the locales in availableLocales and
	 * returns either the longest non-empty prefix of locale that is an element of
	 * availableLocales, or undefined if there is no such element. It uses the
	 * fallback mechanism of RFC 4647, section 3.4. The following steps are taken:
	 */
	function /* 9.2.2 */BestAvailableLocale (availableLocales, locale) {
	    var
	       // 1. Let candidate be locale
	       candidate = locale;

	    // 2. Repeat
	    while (true) {
	        // a. If availableLocales contains an element equal to candidate, then return
	        // candidate.
	        if (arrIndexOf.call(availableLocales, candidate) > -1)
	            return candidate;

	        var
	            // b. Let pos be the character index of the last occurrence of "-"
	            // (U+002D) within candidate. If that character does not occur, return
	            // undefined.
	            pos = candidate.lastIndexOf('-');

	        if (pos < 0)
	            return;

	        // c. If pos ≥ 2 and the character "-" occurs at index pos-2 of candidate,
	        //    then decrease pos by 2.
	        if (pos >= 2 && candidate.charAt(pos - 2) == '-')
	            pos -= 2;

	        // d. Let candidate be the substring of candidate from position 0, inclusive,
	        //    to position pos, exclusive.
	        candidate = candidate.substring(0, pos);
	    }
	}

	/**
	 * The LookupMatcher abstract operation compares requestedLocales, which must be
	 * a List as returned by CanonicalizeLocaleList, against the locales in
	 * availableLocales and determines the best available language to meet the
	 * request. The following steps are taken:
	 */
	function /* 9.2.3 */LookupMatcher (availableLocales, requestedLocales) {
	    var
	        // 1. Let i be 0.
	        i = 0,

	        // 2. Let len be the number of elements in requestedLocales.
	        len = requestedLocales.length,

	        // 3. Let availableLocale be undefined.
	        availableLocale;

	    // 4. Repeat while i < len and availableLocale is undefined:
	    while (i < len && !availableLocale) {
	        var
	            // a. Let locale be the element of requestedLocales at 0-origined list
	            //    position i.
	            locale = requestedLocales[i],

	            // b. Let noExtensionsLocale be the String value that is locale with all
	            //    Unicode locale extension sequences removed.
	            noExtensionsLocale = String(locale).replace(expUnicodeExSeq, ''),

	            // c. Let availableLocale be the result of calling the
	            //    BestAvailableLocale abstract operation (defined in 9.2.2) with
	            //    arguments availableLocales and noExtensionsLocale.
	            availableLocale = BestAvailableLocale(availableLocales, noExtensionsLocale);

	        // d. Increase i by 1.
	        i++;
	    }

	    var
	        // 5. Let result be a new Record.
	        result = new Record();

	    // 6. If availableLocale is not undefined, then
	    if (availableLocale !== undefined) {
	        // a. Set result.[[locale]] to availableLocale.
	        result['[[locale]]'] = availableLocale;

	        // b. If locale and noExtensionsLocale are not the same String value, then
	        if (String(locale) !== String(noExtensionsLocale)) {
	            var
	                // i. Let extension be the String value consisting of the first
	                //    substring of locale that is a Unicode locale extension sequence.
	                extension = locale.match(expUnicodeExSeq)[0],

	                // ii. Let extensionIndex be the character position of the initial
	                //     "-" of the first Unicode locale extension sequence within locale.
	                extensionIndex = locale.indexOf('-u-');

	            // iii. Set result.[[extension]] to extension.
	            result['[[extension]]'] = extension;

	            // iv. Set result.[[extensionIndex]] to extensionIndex.
	            result['[[extensionIndex]]'] = extensionIndex;
	        }
	    }
	    // 7. Else
	    else
	        // a. Set result.[[locale]] to the value returned by the DefaultLocale abstract
	        //    operation (defined in 6.2.4).
	        result['[[locale]]'] = DefaultLocale();

	    // 8. Return result
	    return result;
	}

	/**
	 * The BestFitMatcher abstract operation compares requestedLocales, which must be
	 * a List as returned by CanonicalizeLocaleList, against the locales in
	 * availableLocales and determines the best available language to meet the
	 * request. The algorithm is implementation dependent, but should produce results
	 * that a typical user of the requested locales would perceive as at least as
	 * good as those produced by the LookupMatcher abstract operation. Options
	 * specified through Unicode locale extension sequences must be ignored by the
	 * algorithm. Information about such subsequences is returned separately.
	 * The abstract operation returns a record with a [[locale]] field, whose value
	 * is the language tag of the selected locale, which must be an element of
	 * availableLocales. If the language tag of the request locale that led to the
	 * selected locale contained a Unicode locale extension sequence, then the
	 * returned record also contains an [[extension]] field whose value is the first
	 * Unicode locale extension sequence, and an [[extensionIndex]] field whose value
	 * is the index of the first Unicode locale extension sequence within the request
	 * locale language tag.
	 */
	function /* 9.2.4 */BestFitMatcher (availableLocales, requestedLocales) {
	    return LookupMatcher(availableLocales, requestedLocales);
	}

	/**
	 * The ResolveLocale abstract operation compares a BCP 47 language priority list
	 * requestedLocales against the locales in availableLocales and determines the
	 * best available language to meet the request. availableLocales and
	 * requestedLocales must be provided as List values, options as a Record.
	 */
	function /* 9.2.5 */ResolveLocale (availableLocales, requestedLocales, options, relevantExtensionKeys, localeData) {
	    if (availableLocales.length === 0) {
	        throw new ReferenceError('No locale data has been provided for this object yet.');
	    }

	    // The following steps are taken:
	    var
	        // 1. Let matcher be the value of options.[[localeMatcher]].
	        matcher = options['[[localeMatcher]]'];

	    // 2. If matcher is "lookup", then
	    if (matcher === 'lookup')
	        var
	            // a. Let r be the result of calling the LookupMatcher abstract operation
	            //    (defined in 9.2.3) with arguments availableLocales and
	            //    requestedLocales.
	            r = LookupMatcher(availableLocales, requestedLocales);

	    // 3. Else
	    else
	        var
	            // a. Let r be the result of calling the BestFitMatcher abstract
	            //    operation (defined in 9.2.4) with arguments availableLocales and
	            //    requestedLocales.
	            r = BestFitMatcher(availableLocales, requestedLocales);

	    var
	        // 4. Let foundLocale be the value of r.[[locale]].
	        foundLocale = r['[[locale]]'];

	    // 5. If r has an [[extension]] field, then
	    if (hop.call(r, '[[extension]]'))
	        var
	            // a. Let extension be the value of r.[[extension]].
	            extension = r['[[extension]]'],
	            // b. Let extensionIndex be the value of r.[[extensionIndex]].
	            extensionIndex = r['[[extensionIndex]]'],
	            // c. Let split be the standard built-in function object defined in ES5,
	            //    15.5.4.14.
	            split = String.prototype.split,
	            // d. Let extensionSubtags be the result of calling the [[Call]] internal
	            //    method of split with extension as the this value and an argument
	            //    list containing the single item "-".
	            extensionSubtags = split.call(extension, '-'),
	            // e. Let extensionSubtagsLength be the result of calling the [[Get]]
	            //    internal method of extensionSubtags with argument "length".
	            extensionSubtagsLength = extensionSubtags.length;

	    var
	        // 6. Let result be a new Record.
	        result = new Record();

	    // 7. Set result.[[dataLocale]] to foundLocale.
	    result['[[dataLocale]]'] = foundLocale;

	    var
	        // 8. Let supportedExtension be "-u".
	        supportedExtension = '-u',
	        // 9. Let i be 0.
	        i = 0,
	        // 10. Let len be the result of calling the [[Get]] internal method of
	        //     relevantExtensionKeys with argument "length".
	        len = relevantExtensionKeys.length;

	    // 11 Repeat while i < len:
	    while (i < len) {
	        var
	            // a. Let key be the result of calling the [[Get]] internal method of
	            //    relevantExtensionKeys with argument ToString(i).
	            key = relevantExtensionKeys[i],
	            // b. Let foundLocaleData be the result of calling the [[Get]] internal
	            //    method of localeData with the argument foundLocale.
	            foundLocaleData = localeData[foundLocale],
	            // c. Let keyLocaleData be the result of calling the [[Get]] internal
	            //    method of foundLocaleData with the argument key.
	            keyLocaleData = foundLocaleData[key],
	            // d. Let value be the result of calling the [[Get]] internal method of
	            //    keyLocaleData with argument "0".
	            value = keyLocaleData['0'],
	            // e. Let supportedExtensionAddition be "".
	            supportedExtensionAddition = '',
	            // f. Let indexOf be the standard built-in function object defined in
	            //    ES5, 15.4.4.14.
	            indexOf = arrIndexOf;

	        // g. If extensionSubtags is not undefined, then
	        if (extensionSubtags !== undefined) {
	            var
	                // i. Let keyPos be the result of calling the [[Call]] internal
	                //    method of indexOf with extensionSubtags as the this value and
	                // an argument list containing the single item key.
	                keyPos = indexOf.call(extensionSubtags, key);

	            // ii. If keyPos ≠ -1, then
	            if (keyPos !== -1) {
	                // 1. If keyPos + 1 < extensionSubtagsLength and the length of the
	                //    result of calling the [[Get]] internal method of
	                //    extensionSubtags with argument ToString(keyPos +1) is greater
	                //    than 2, then
	                if (keyPos + 1 < extensionSubtagsLength
	                        && extensionSubtags[keyPos + 1].length > 2) {
	                    var
	                        // a. Let requestedValue be the result of calling the [[Get]]
	                        //    internal method of extensionSubtags with argument
	                        //    ToString(keyPos + 1).
	                        requestedValue = extensionSubtags[keyPos + 1],
	                        // b. Let valuePos be the result of calling the [[Call]]
	                        //    internal method of indexOf with keyLocaleData as the
	                        //    this value and an argument list containing the single
	                        //    item requestedValue.
	                        valuePos = indexOf.call(keyLocaleData, requestedValue);

	                    // c. If valuePos ≠ -1, then
	                    if (valuePos !== -1)
	                        var
	                            // i. Let value be requestedValue.
	                            value = requestedValue,
	                            // ii. Let supportedExtensionAddition be the
	                            //     concatenation of "-", key, "-", and value.
	                            supportedExtensionAddition = '-' + key + '-' + value;
	                }
	                // 2. Else
	                else {
	                    var
	                        // a. Let valuePos be the result of calling the [[Call]]
	                        // internal method of indexOf with keyLocaleData as the this
	                        // value and an argument list containing the single item
	                        // "true".
	                        valuePos = indexOf(keyLocaleData, 'true');

	                    // b. If valuePos ≠ -1, then
	                    if (valuePos !== -1)
	                        var
	                            // i. Let value be "true".
	                            value = 'true';
	                }
	            }
	        }
	        // h. If options has a field [[<key>]], then
	        if (hop.call(options, '[[' + key + ']]')) {
	            var
	                // i. Let optionsValue be the value of options.[[<key>]].
	                optionsValue = options['[[' + key + ']]'];

	            // ii. If the result of calling the [[Call]] internal method of indexOf
	            //     with keyLocaleData as the this value and an argument list
	            //     containing the single item optionsValue is not -1, then
	            if (indexOf.call(keyLocaleData, optionsValue) !== -1) {
	                // 1. If optionsValue is not equal to value, then
	                if (optionsValue !== value) {
	                    // a. Let value be optionsValue.
	                    value = optionsValue;
	                    // b. Let supportedExtensionAddition be "".
	                    supportedExtensionAddition = '';
	                }
	            }
	        }
	        // i. Set result.[[<key>]] to value.
	        result['[[' + key + ']]'] = value;

	        // j. Append supportedExtensionAddition to supportedExtension.
	        supportedExtension += supportedExtensionAddition;

	        // k. Increase i by 1.
	        i++;
	    }
	    // 12. If the length of supportedExtension is greater than 2, then
	    if (supportedExtension.length > 2) {
	        var
	            // a. Let preExtension be the substring of foundLocale from position 0,
	            //    inclusive, to position extensionIndex, exclusive.
	            preExtension = foundLocale.substring(0, extensionIndex),
	            // b. Let postExtension be the substring of foundLocale from position
	            //    extensionIndex to the end of the string.
	            postExtension = foundLocale.substring(extensionIndex),
	            // c. Let foundLocale be the concatenation of preExtension,
	            //    supportedExtension, and postExtension.
	            foundLocale = preExtension + supportedExtension + postExtension;
	    }
	    // 13. Set result.[[locale]] to foundLocale.
	    result['[[locale]]'] = foundLocale;

	    // 14. Return result.
	    return result;
	}

	/**
	 * The LookupSupportedLocales abstract operation returns the subset of the
	 * provided BCP 47 language priority list requestedLocales for which
	 * availableLocales has a matching locale when using the BCP 47 Lookup algorithm.
	 * Locales appear in the same order in the returned list as in requestedLocales.
	 * The following steps are taken:
	 */
	function /* 9.2.6 */LookupSupportedLocales (availableLocales, requestedLocales) {
	    var
	        // 1. Let len be the number of elements in requestedLocales.
	        len = requestedLocales.length,
	        // 2. Let subset be a new empty List.
	        subset = new List(),
	        // 3. Let k be 0.
	        k = 0;

	    // 4. Repeat while k < len
	    while (k < len) {
	        var
	            // a. Let locale be the element of requestedLocales at 0-origined list
	            //    position k.
	            locale = requestedLocales[k],
	            // b. Let noExtensionsLocale be the String value that is locale with all
	            //    Unicode locale extension sequences removed.
	            noExtensionsLocale = String(locale).replace(expUnicodeExSeq, ''),
	            // c. Let availableLocale be the result of calling the
	            //    BestAvailableLocale abstract operation (defined in 9.2.2) with
	            //    arguments availableLocales and noExtensionsLocale.
	            availableLocale = BestAvailableLocale(availableLocales, noExtensionsLocale);

	        // d. If availableLocale is not undefined, then append locale to the end of
	        //    subset.
	        if (availableLocale !== undefined)
	            arrPush.call(subset, locale);

	        // e. Increment k by 1.
	        k++;
	    }

	    var
	        // 5. Let subsetArray be a new Array object whose elements are the same
	        //    values in the same order as the elements of subset.
	        subsetArray = arrSlice.call(subset);

	    // 6. Return subsetArray.
	    return subsetArray;
	}

	/**
	 * The BestFitSupportedLocales abstract operation returns the subset of the
	 * provided BCP 47 language priority list requestedLocales for which
	 * availableLocales has a matching locale when using the Best Fit Matcher
	 * algorithm. Locales appear in the same order in the returned list as in
	 * requestedLocales. The steps taken are implementation dependent.
	 */
	function /*9.2.7 */BestFitSupportedLocales (availableLocales, requestedLocales) {
	    // ###TODO: implement this function as described by the specification###
	    return LookupSupportedLocales(availableLocales, requestedLocales);
	}

	/**
	 * The SupportedLocales abstract operation returns the subset of the provided BCP
	 * 47 language priority list requestedLocales for which availableLocales has a
	 * matching locale. Two algorithms are available to match the locales: the Lookup
	 * algorithm described in RFC 4647 section 3.4, and an implementation dependent
	 * best-fit algorithm. Locales appear in the same order in the returned list as
	 * in requestedLocales. The following steps are taken:
	 */
	function /*9.2.8 */SupportedLocales (availableLocales, requestedLocales, options) {
	    // 1. If options is not undefined, then
	    if (options !== undefined) {
	        var
	            // a. Let options be ToObject(options).
	            options = new Record(toObject(options)),
	            // b. Let matcher be the result of calling the [[Get]] internal method of
	            //    options with argument "localeMatcher".
	            matcher = options.localeMatcher;

	        // c. If matcher is not undefined, then
	        if (matcher !== undefined) {
	            // i. Let matcher be ToString(matcher).
	            matcher = String(matcher);

	            // ii. If matcher is not "lookup" or "best fit", then throw a RangeError
	            //     exception.
	            if (matcher !== 'lookup' && matcher !== 'best fit')
	                throw new RangeError('matcher should be "lookup" or "best fit"');
	        }
	    }
	    // 2. If matcher is undefined or "best fit", then
	    if (matcher === undefined || matcher === 'best fit')
	        var
	            // a. Let subset be the result of calling the BestFitSupportedLocales
	            //    abstract operation (defined in 9.2.7) with arguments
	            //    availableLocales and requestedLocales.
	            subset = BestFitSupportedLocales(availableLocales, requestedLocales);
	    // 3. Else
	    else
	        var
	            // a. Let subset be the result of calling the LookupSupportedLocales
	            //    abstract operation (defined in 9.2.6) with arguments
	            //    availableLocales and requestedLocales.
	            subset = LookupSupportedLocales(availableLocales, requestedLocales);

	    // 4. For each named own property name P of subset,
	    for (var P in subset) {
	        if (!hop.call(subset, P))
	            continue;

	        // a. Let desc be the result of calling the [[GetOwnProperty]] internal
	        //    method of subset with P.
	        // b. Set desc.[[Writable]] to false.
	        // c. Set desc.[[Configurable]] to false.
	        // d. Call the [[DefineOwnProperty]] internal method of subset with P, desc,
	        //    and true as arguments.
	        defineProperty(subset, P, {
	            writable: false, configurable: false, value: subset[P]
	        });
	    }
	    // "Freeze" the array so no new elements can be added
	    defineProperty(subset, 'length', { writable: false });

	    // 5. Return subset
	    return subset;
	}

	/**
	 * The GetOption abstract operation extracts the value of the property named
	 * property from the provided options object, converts it to the required type,
	 * checks whether it is one of a List of allowed values, and fills in a fallback
	 * value if necessary.
	 */
	function /*9.2.9 */GetOption (options, property, type, values, fallback) {
	    var
	        // 1. Let value be the result of calling the [[Get]] internal method of
	        //    options with argument property.
	        value = options[property];

	    // 2. If value is not undefined, then
	    if (value !== undefined) {
	        // a. Assert: type is "boolean" or "string".
	        // b. If type is "boolean", then let value be ToBoolean(value).
	        // c. If type is "string", then let value be ToString(value).
	        value = type === 'boolean' ? Boolean(value)
	                  : (type === 'string' ? String(value) : value);

	        // d. If values is not undefined, then
	        if (values !== undefined) {
	            // i. If values does not contain an element equal to value, then throw a
	            //    RangeError exception.
	            if (arrIndexOf.call(values, value) === -1)
	                throw new RangeError("'" + value + "' is not an allowed value for `" + property +'`');
	        }

	        // e. Return value.
	        return value;
	    }
	    // Else return fallback.
	    return fallback;
	}

	/**
	 * The GetNumberOption abstract operation extracts a property value from the
	 * provided options object, converts it to a Number value, checks whether it is
	 * in the allowed range, and fills in a fallback value if necessary.
	 */
	function /* 9.2.10 */GetNumberOption (options, property, minimum, maximum, fallback) {
	    var
	        // 1. Let value be the result of calling the [[Get]] internal method of
	        //    options with argument property.
	        value = options[property];

	    // 2. If value is not undefined, then
	    if (value !== undefined) {
	        // a. Let value be ToNumber(value).
	        value = Number(value);

	        // b. If value is NaN or less than minimum or greater than maximum, throw a
	        //    RangeError exception.
	        if (isNaN(value) || value < minimum || value > maximum)
	            throw new RangeError('Value is not a number or outside accepted range');

	        // c. Return floor(value).
	        return Math.floor(value);
	    }
	    // 3. Else return fallback.
	    return fallback;
	}

	// 11.1 The Intl.NumberFormat constructor
	// ======================================

	// Define the NumberFormat constructor internally so it cannot be tainted
	function NumberFormatConstructor () {
	    var locales = arguments[0];
	    var options = arguments[1];

	    if (!this || this === Intl) {
	        return new Intl.NumberFormat(locales, options);
	    }

	    return InitializeNumberFormat(toObject(this), locales, options);
	}

	defineProperty(Intl, 'NumberFormat', {
	    configurable: true,
	    writable: true,
	    value: NumberFormatConstructor
	});

	// Must explicitly set prototypes as unwritable
	defineProperty(Intl.NumberFormat, 'prototype', {
	    writable: false
	});

	/**
	 * The abstract operation InitializeNumberFormat accepts the arguments
	 * numberFormat (which must be an object), locales, and options. It initializes
	 * numberFormat as a NumberFormat object.
	 */
	function /*11.1.1.1 */InitializeNumberFormat (numberFormat, locales, options) {
	    var
	    // This will be a internal properties object if we're not already initialized
	        internal = getInternalProperties(numberFormat),

	    // Create an object whose props can be used to restore the values of RegExp props
	        regexpState = createRegExpRestore();

	    // 1. If numberFormat has an [[initializedIntlObject]] internal property with
	    // value true, throw a TypeError exception.
	    if (internal['[[initializedIntlObject]]'] === true)
	        throw new TypeError('`this` object has already been initialized as an Intl object');

	    // Need this to access the `internal` object
	    defineProperty(numberFormat, '__getInternalProperties', {
	        value: function () {
	            // NOTE: Non-standard, for internal use only
	            if (arguments[0] === secret)
	                return internal;
	        }
	    });

	    // 2. Set the [[initializedIntlObject]] internal property of numberFormat to true.
	    internal['[[initializedIntlObject]]'] = true;

	    var
	    // 3. Let requestedLocales be the result of calling the CanonicalizeLocaleList
	    //    abstract operation (defined in 9.2.1) with argument locales.
	        requestedLocales = CanonicalizeLocaleList(locales);

	    // 4. If options is undefined, then
	    if (options === undefined)
	        // a. Let options be the result of creating a new object as if by the
	        // expression new Object() where Object is the standard built-in constructor
	        // with that name.
	        options = {};

	    // 5. Else
	    else
	        // a. Let options be ToObject(options).
	        options = toObject(options);

	    var
	    // 6. Let opt be a new Record.
	        opt = new Record(),

	    // 7. Let matcher be the result of calling the GetOption abstract operation
	    //    (defined in 9.2.9) with the arguments options, "localeMatcher", "string",
	    //    a List containing the two String values "lookup" and "best fit", and
	    //    "best fit".
	        matcher =  GetOption(options, 'localeMatcher', 'string', new List('lookup', 'best fit'), 'best fit');

	    // 8. Set opt.[[localeMatcher]] to matcher.
	    opt['[[localeMatcher]]'] = matcher;

	    var
	    // 9. Let NumberFormat be the standard built-in object that is the initial value
	    //    of Intl.NumberFormat.
	    // 10. Let localeData be the value of the [[localeData]] internal property of
	    //     NumberFormat.
	        localeData = internals.NumberFormat['[[localeData]]'],

	    // 11. Let r be the result of calling the ResolveLocale abstract operation
	    //     (defined in 9.2.5) with the [[availableLocales]] internal property of
	    //     NumberFormat, requestedLocales, opt, the [[relevantExtensionKeys]]
	    //     internal property of NumberFormat, and localeData.
	        r = ResolveLocale(
	                internals.NumberFormat['[[availableLocales]]'], requestedLocales,
	                opt, internals.NumberFormat['[[relevantExtensionKeys]]'], localeData
	            );

	    // 12. Set the [[locale]] internal property of numberFormat to the value of
	    //     r.[[locale]].
	    internal['[[locale]]'] = r['[[locale]]'];

	    // 13. Set the [[numberingSystem]] internal property of numberFormat to the value
	    //     of r.[[nu]].
	    internal['[[numberingSystem]]'] = r['[[nu]]'];

	    // The specification doesn't tell us to do this, but it's helpful later on
	    internal['[[dataLocale]]'] = r['[[dataLocale]]'];

	    var
	    // 14. Let dataLocale be the value of r.[[dataLocale]].
	        dataLocale = r['[[dataLocale]]'],

	    // 15. Let s be the result of calling the GetOption abstract operation with the
	    //     arguments options, "style", "string", a List containing the three String
	    //     values "decimal", "percent", and "currency", and "decimal".
	        s = GetOption(options, 'style', 'string', new List('decimal', 'percent', 'currency'), 'decimal');

	    // 16. Set the [[style]] internal property of numberFormat to s.
	    internal['[[style]]'] = s;

	    var
	    // 17. Let c be the result of calling the GetOption abstract operation with the
	    //     arguments options, "currency", "string", undefined, and undefined.
	        c = GetOption(options, 'currency', 'string');

	    // 18. If c is not undefined and the result of calling the
	    //     IsWellFormedCurrencyCode abstract operation (defined in 6.3.1) with
	    //     argument c is false, then throw a RangeError exception.
	    if (c !== undefined && !IsWellFormedCurrencyCode(c))
	        throw new RangeError("'" + c + "' is not a valid currency code");

	    // 19. If s is "currency" and c is undefined, throw a TypeError exception.
	    if (s === 'currency' && c === undefined)
	        throw new TypeError('Currency code is required when style is currency');

	    // 20. If s is "currency", then
	    if (s === 'currency') {
	        // a. Let c be the result of converting c to upper case as specified in 6.1.
	        c = c.toUpperCase();

	        // b. Set the [[currency]] internal property of numberFormat to c.
	        internal['[[currency]]'] = c;

	        var
	        // c. Let cDigits be the result of calling the CurrencyDigits abstract
	        //    operation (defined below) with argument c.
	            cDigits = CurrencyDigits(c);
	    }

	    var
	    // 21. Let cd be the result of calling the GetOption abstract operation with the
	    //     arguments options, "currencyDisplay", "string", a List containing the
	    //     three String values "code", "symbol", and "name", and "symbol".
	        cd = GetOption(options, 'currencyDisplay', 'string', new List('code', 'symbol', 'name'), 'symbol');

	    // 22. If s is "currency", then set the [[currencyDisplay]] internal property of
	    //     numberFormat to cd.
	    if (s === 'currency')
	        internal['[[currencyDisplay]]'] = cd;

	    var
	    // 23. Let mnid be the result of calling the GetNumberOption abstract operation
	    //     (defined in 9.2.10) with arguments options, "minimumIntegerDigits", 1, 21,
	    //     and 1.
	        mnid = GetNumberOption(options, 'minimumIntegerDigits', 1, 21, 1);

	    // 24. Set the [[minimumIntegerDigits]] internal property of numberFormat to mnid.
	    internal['[[minimumIntegerDigits]]'] = mnid;

	    var
	    // 25. If s is "currency", then let mnfdDefault be cDigits; else let mnfdDefault
	    //     be 0.
	        mnfdDefault = s === 'currency' ? cDigits : 0,

	    // 26. Let mnfd be the result of calling the GetNumberOption abstract operation
	    //     with arguments options, "minimumFractionDigits", 0, 20, and mnfdDefault.
	        mnfd = GetNumberOption(options, 'minimumFractionDigits', 0, 20, mnfdDefault);

	    // 27. Set the [[minimumFractionDigits]] internal property of numberFormat to mnfd.
	    internal['[[minimumFractionDigits]]'] = mnfd;

	    var
	    // 28. If s is "currency", then let mxfdDefault be max(mnfd, cDigits); else if s
	    //     is "percent", then let mxfdDefault be max(mnfd, 0); else let mxfdDefault
	    //     be max(mnfd, 3).
	        mxfdDefault = s === 'currency' ? Math.max(mnfd, cDigits)
	                    : (s === 'percent' ? Math.max(mnfd, 0) : Math.max(mnfd, 3)),

	    // 29. Let mxfd be the result of calling the GetNumberOption abstract operation
	    //     with arguments options, "maximumFractionDigits", mnfd, 20, and mxfdDefault.
	        mxfd = GetNumberOption(options, 'maximumFractionDigits', mnfd, 20, mxfdDefault);

	    // 30. Set the [[maximumFractionDigits]] internal property of numberFormat to mxfd.
	    internal['[[maximumFractionDigits]]'] = mxfd;

	    var
	    // 31. Let mnsd be the result of calling the [[Get]] internal method of options
	    //     with argument "minimumSignificantDigits".
	        mnsd = options.minimumSignificantDigits,

	    // 32. Let mxsd be the result of calling the [[Get]] internal method of options
	    //     with argument "maximumSignificantDigits".
	        mxsd = options.maximumSignificantDigits;

	    // 33. If mnsd is not undefined or mxsd is not undefined, then:
	    if (mnsd !== undefined || mxsd !== undefined) {
	        // a. Let mnsd be the result of calling the GetNumberOption abstract
	        //    operation with arguments options, "minimumSignificantDigits", 1, 21,
	        //    and 1.
	        mnsd = GetNumberOption(options, 'minimumSignificantDigits', 1, 21, 1);

	        // b. Let mxsd be the result of calling the GetNumberOption abstract
	        //     operation with arguments options, "maximumSignificantDigits", mnsd,
	        //     21, and 21.
	        mxsd = GetNumberOption(options, 'maximumSignificantDigits', mnsd, 21, 21);

	        // c. Set the [[minimumSignificantDigits]] internal property of numberFormat
	        //    to mnsd, and the [[maximumSignificantDigits]] internal property of
	        //    numberFormat to mxsd.
	        internal['[[minimumSignificantDigits]]'] = mnsd;
	        internal['[[maximumSignificantDigits]]'] = mxsd;
	    }
	    var
	    // 34. Let g be the result of calling the GetOption abstract operation with the
	    //     arguments options, "useGrouping", "boolean", undefined, and true.
	        g = GetOption(options, 'useGrouping', 'boolean', undefined, true);

	    // 35. Set the [[useGrouping]] internal property of numberFormat to g.
	    internal['[[useGrouping]]'] = g;

	    var
	    // 36. Let dataLocaleData be the result of calling the [[Get]] internal method of
	    //     localeData with argument dataLocale.
	        dataLocaleData = localeData[dataLocale],

	    // 37. Let patterns be the result of calling the [[Get]] internal method of
	    //     dataLocaleData with argument "patterns".
	        patterns = dataLocaleData.patterns;

	    // 38. Assert: patterns is an object (see 11.2.3)

	    var
	    // 39. Let stylePatterns be the result of calling the [[Get]] internal method of
	    //     patterns with argument s.
	        stylePatterns = patterns[s];

	    // 40. Set the [[positivePattern]] internal property of numberFormat to the
	    //     result of calling the [[Get]] internal method of stylePatterns with the
	    //     argument "positivePattern".
	    internal['[[positivePattern]]'] = stylePatterns.positivePattern;

	    // 41. Set the [[negativePattern]] internal property of numberFormat to the
	    //     result of calling the [[Get]] internal method of stylePatterns with the
	    //     argument "negativePattern".
	    internal['[[negativePattern]]'] = stylePatterns.negativePattern;

	    // 42. Set the [[boundFormat]] internal property of numberFormat to undefined.
	    internal['[[boundFormat]]'] = undefined;

	    // 43. Set the [[initializedNumberFormat]] internal property of numberFormat to
	    //     true.
	    internal['[[initializedNumberFormat]]'] = true;

	    // In ES3, we need to pre-bind the format() function
	    if (es3)
	        numberFormat.format = GetFormatNumber.call(numberFormat);

	    // Restore the RegExp properties
	    regexpState.exp.test(regexpState.input);

	    // Return the newly initialised object
	    return numberFormat;
	}

	function CurrencyDigits(currency) {
	    // When the CurrencyDigits abstract operation is called with an argument currency
	    // (which must be an upper case String value), the following steps are taken:

	    // 1. If the ISO 4217 currency and funds code list contains currency as an
	    // alphabetic code, then return the minor unit value corresponding to the
	    // currency from the list; else return 2.
	    return currencyMinorUnits[currency] !== undefined
	                ? currencyMinorUnits[currency]
	                : 2;
	}

	/* 11.2.3 */internals.NumberFormat = {
	    '[[availableLocales]]': [],
	    '[[relevantExtensionKeys]]': ['nu'],
	    '[[localeData]]': {}
	};

	/**
	 * When the supportedLocalesOf method of Intl.NumberFormat is called, the
	 * following steps are taken:
	 */
	/* 11.2.2 */defineProperty(Intl.NumberFormat, 'supportedLocalesOf', {
	    configurable: true,
	    writable: true,
	    value: fnBind.call(supportedLocalesOf, internals.NumberFormat)
	});

	/**
	 * This named accessor property returns a function that formats a number
	 * according to the effective locale and the formatting options of this
	 * NumberFormat object.
	 */
	/* 11.3.2 */defineProperty(Intl.NumberFormat.prototype, 'format', {
	    configurable: true,
	    get: GetFormatNumber
	});

	function GetFormatNumber() {
	        var internal = this != null && typeof this === 'object' && getInternalProperties(this);

	        // Satisfy test 11.3_b
	        if (!internal || !internal['[[initializedNumberFormat]]'])
	            throw new TypeError('`this` value for format() is not an initialized Intl.NumberFormat object.');

	        // The value of the [[Get]] attribute is a function that takes the following
	        // steps:

	        // 1. If the [[boundFormat]] internal property of this NumberFormat object
	        //    is undefined, then:
	        if (internal['[[boundFormat]]'] === undefined) {
	            var
	            // a. Let F be a Function object, with internal properties set as
	            //    specified for built-in functions in ES5, 15, or successor, and the
	            //    length property set to 1, that takes the argument value and
	            //    performs the following steps:
	                F = function (value) {
	                    // i. If value is not provided, then let value be undefined.
	                    // ii. Let x be ToNumber(value).
	                    // iii. Return the result of calling the FormatNumber abstract
	                    //      operation (defined below) with arguments this and x.
	                    return FormatNumber(this, /* x = */Number(value));
	                },

	            // b. Let bind be the standard built-in function object defined in ES5,
	            //    15.3.4.5.
	            // c. Let bf be the result of calling the [[Call]] internal method of
	            //    bind with F as the this value and an argument list containing
	            //    the single item this.
	                bf = fnBind.call(F, this);

	            // d. Set the [[boundFormat]] internal property of this NumberFormat
	            //    object to bf.
	            internal['[[boundFormat]]'] = bf;
	        }
	        // Return the value of the [[boundFormat]] internal property of this
	        // NumberFormat object.
	        return internal['[[boundFormat]]'];
	    }

	/**
	 * When the FormatNumber abstract operation is called with arguments numberFormat
	 * (which must be an object initialized as a NumberFormat) and x (which must be a
	 * Number value), it returns a String value representing x according to the
	 * effective locale and the formatting options of numberFormat.
	 */
	function FormatNumber (numberFormat, x) {
	    var n,

	    // Create an object whose props can be used to restore the values of RegExp props
	        regexpState = createRegExpRestore(),

	        internal = getInternalProperties(numberFormat),
	        locale = internal['[[dataLocale]]'],
	        nums   = internal['[[numberingSystem]]'],
	        data   = internals.NumberFormat['[[localeData]]'][locale],
	        ild    = data.symbols[nums] || data.symbols.latn,

	    // 1. Let negative be false.
	        negative = false;

	    // 2. If the result of isFinite(x) is false, then
	    if (isFinite(x) === false) {
	        // a. If x is NaN, then let n be an ILD String value indicating the NaN value.
	        if (isNaN(x))
	            n = ild.nan;

	        // b. Else
	        else {
	            // a. Let n be an ILD String value indicating infinity.
	            n = ild.infinity;
	            // b. If x < 0, then let negative be true.
	            if (x < 0)
	                negative = true;
	        }
	    }
	    // 3. Else
	    else {
	        // a. If x < 0, then
	        if (x < 0) {
	            // i. Let negative be true.
	            negative = true;
	            // ii. Let x be -x.
	            x = -x;
	        }

	        // b. If the value of the [[style]] internal property of numberFormat is
	        //    "percent", let x be 100 × x.
	        if (internal['[[style]]'] === 'percent')
	            x *= 100;

	        // c. If the [[minimumSignificantDigits]] and [[maximumSignificantDigits]]
	        //    internal properties of numberFormat are present, then
	        if (hop.call(internal, '[[minimumSignificantDigits]]') &&
	                hop.call(internal, '[[maximumSignificantDigits]]'))
	            // i. Let n be the result of calling the ToRawPrecision abstract operation
	            //    (defined below), passing as arguments x and the values of the
	            //    [[minimumSignificantDigits]] and [[maximumSignificantDigits]]
	            //    internal properties of numberFormat.
	            n = ToRawPrecision(x,
	                  internal['[[minimumSignificantDigits]]'],
	                  internal['[[maximumSignificantDigits]]']);
	        // d. Else
	        else
	            // i. Let n be the result of calling the ToRawFixed abstract operation
	            //    (defined below), passing as arguments x and the values of the
	            //    [[minimumIntegerDigits]], [[minimumFractionDigits]], and
	            //    [[maximumFractionDigits]] internal properties of numberFormat.
	            n = ToRawFixed(x,
	                  internal['[[minimumIntegerDigits]]'],
	                  internal['[[minimumFractionDigits]]'],
	                  internal['[[maximumFractionDigits]]']);

	        // e. If the value of the [[numberingSystem]] internal property of
	        //    numberFormat matches one of the values in the “Numbering System” column
	        //    of Table 2 below, then
	        if (numSys[nums]) {
	            // i. Let digits be an array whose 10 String valued elements are the
	            //    UTF-16 string representations of the 10 digits specified in the
	            //    “Digits” column of Table 2 in the row containing the value of the
	            //    [[numberingSystem]] internal property.
	            var digits = numSys[internal['[[numberingSystem]]']];
	            // ii. Replace each digit in n with the value of digits[digit].
	            n = String(n).replace(/\d/g, function (digit) {
	                return digits[digit];
	            });
	        }
	        // f. Else use an implementation dependent algorithm to map n to the
	        //    appropriate representation of n in the given numbering system.
	        else
	            n = String(n); // ###TODO###

	        // g. If n contains the character ".", then replace it with an ILND String
	        //    representing the decimal separator.
	        n = n.replace(/\./g, ild.decimal);

	        // h. If the value of the [[useGrouping]] internal property of numberFormat
	        //    is true, then insert an ILND String representing a grouping separator
	        //    into an ILND set of locations within the integer part of n.
	        if (internal['[[useGrouping]]'] === true) {
	            var
	                parts  = n.split(ild.decimal),
	                igr    = parts[0],

	                // Primary group represents the group closest to the decimal
	                pgSize = data.patterns.primaryGroupSize || 3,

	                // Secondary group is every other group
	                sgSize = data.patterns.secondaryGroupSize || pgSize;

	            // Group only if necessary
	            if (igr.length > pgSize) {
	                var
	                    groups = new List(),

	                    // Index of the primary grouping separator
	                    end    = igr.length - pgSize,

	                    // Starting index for our loop
	                    idx    = end % sgSize,

	                    start  = igr.slice(0, idx);

	                if (start.length)
	                    arrPush.call(groups, start);

	                // Loop to separate into secondary grouping digits
	                while (idx < end) {
	                    arrPush.call(groups, igr.slice(idx, idx + sgSize));
	                    idx += sgSize;
	                }

	                // Add the primary grouping digits
	                arrPush.call(groups, igr.slice(end));

	                parts[0] = arrJoin.call(groups, ild.group);
	            }

	            n = arrJoin.call(parts, ild.decimal);
	        }
	    }

	    var
	    // 4. If negative is true, then let result be the value of the [[negativePattern]]
	    //    internal property of numberFormat; else let result be the value of the
	    //    [[positivePattern]] internal property of numberFormat.
	        result = internal[negative === true ? '[[negativePattern]]' : '[[positivePattern]]'];

	    // 5. Replace the substring "{number}" within result with n.
	    result = result.replace('{number}', n);

	    // 6. If the value of the [[style]] internal property of numberFormat is
	    //    "currency", then:
	    if (internal['[[style]]'] === 'currency') {
	        var cd,
	        // a. Let currency be the value of the [[currency]] internal property of
	        //    numberFormat.
	            currency = internal['[[currency]]'],

	        // Shorthand for the currency data
	            cData = data.currencies[currency];

	        // b. If the value of the [[currencyDisplay]] internal property of
	        //    numberFormat is "code", then let cd be currency.
	        // c. Else if the value of the [[currencyDisplay]] internal property of
	        //    numberFormat is "symbol", then let cd be an ILD string representing
	        //    currency in short form. If the implementation does not have such a
	        //    representation of currency, then use currency itself.
	        // d. Else if the value of the [[currencyDisplay]] internal property of
	        //    numberFormat is "name", then let cd be an ILD string representing
	        //    currency in long form. If the implementation does not have such a
	        //    representation of currency, then use currency itself.
	        switch (internal['[[currencyDisplay]]']) {
	            case 'symbol':
	                cd = cData || currency;
	                break;

	            default:
	            case 'code':
	            case 'name':
	                cd = currency;
	        }

	        // e. Replace the substring "{currency}" within result with cd.
	        result = result.replace('{currency}', cd);
	    }

	    // Restore the RegExp properties
	    regexpState.exp.test(regexpState.input);

	    // 7. Return result.
	    return result;
	}

	/**
	 * When the ToRawPrecision abstract operation is called with arguments x (which
	 * must be a finite non-negative number), minPrecision, and maxPrecision (both
	 * must be integers between 1 and 21) the following steps are taken:
	 */
	function ToRawPrecision (x, minPrecision, maxPrecision) {
	    var
	    // 1. Let p be maxPrecision.
	        p = maxPrecision;

	    // 2. If x = 0, then
	    if (x === 0) {
	        var
	        // a. Let m be the String consisting of p occurrences of the character "0".
	            m = arrJoin.call(Array (p + 1), '0'),
	        // b. Let e be 0.
	            e = 0;
	    }
	    // 3. Else
	    else {
	        // a. Let e and n be integers such that 10ᵖ⁻¹ ≤ n < 10ᵖ and for which the
	        //    exact mathematical value of n × 10ᵉ⁻ᵖ⁺¹ – x is as close to zero as
	        //    possible. If there are two such sets of e and n, pick the e and n for
	        //    which n × 10ᵉ⁻ᵖ⁺¹ is larger.
	        var
	            e = log10Floor(Math.abs(x)),

	            // Easier to get to m from here
	            f = Math.round(Math.exp((Math.abs(e - p + 1)) * Math.LN10)),

	        // b. Let m be the String consisting of the digits of the decimal
	        //    representation of n (in order, with no leading zeroes)
	            m = String(Math.round(e - p + 1 < 0 ? x * f : x / f));
	    }

	    // 4. If e ≥ p, then
	    if (e >= p)
	        // a. Return the concatenation of m and e-p+1 occurrences of the character "0".
	        return m + arrJoin.call(Array(e-p+1 + 1), '0');

	    // 5. If e = p-1, then
	    else if (e === p - 1)
	        // a. Return m.
	        return m;

	    // 6. If e ≥ 0, then
	    else if (e >= 0)
	        // a. Let m be the concatenation of the first e+1 characters of m, the character
	        //    ".", and the remaining p–(e+1) characters of m.
	        m = m.slice(0, e + 1) + '.' + m.slice(e + 1);

	    // 7. If e < 0, then
	    else if (e < 0)
	        // a. Let m be the concatenation of the String "0.", –(e+1) occurrences of the
	        //    character "0", and the string m.
	        m = '0.' + arrJoin.call(Array (-(e+1) + 1), '0') + m;

	    // 8. If m contains the character ".", and maxPrecision > minPrecision, then
	    if (m.indexOf(".") >= 0 && maxPrecision > minPrecision) {
	        var
	        // a. Let cut be maxPrecision – minPrecision.
	            cut = maxPrecision - minPrecision;

	        // b. Repeat while cut > 0 and the last character of m is "0":
	        while (cut > 0 && m.charAt(m.length-1) === '0') {
	            //  i. Remove the last character from m.
	            m = m.slice(0, -1);

	            //  ii. Decrease cut by 1.
	            cut--;
	        }

	        // c. If the last character of m is ".", then
	        if (m.charAt(m.length-1) === '.')
	            //    i. Remove the last character from m.
	            m = m.slice(0, -1);
	    }
	    // 9. Return m.
	    return m;
	}

	/**
	 * When the ToRawFixed abstract operation is called with arguments x (which must
	 * be a finite non-negative number), minInteger (which must be an integer between
	 * 1 and 21), minFraction, and maxFraction (which must be integers between 0 and
	 * 20) the following steps are taken:
	 */
	function ToRawFixed (x, minInteger, minFraction, maxFraction) {
	    // (or not because Number.toPrototype.toFixed does a lot of it for us)
	    var idx,

	        // We can pick up after the fixed formatted string (m) is created
	        m   = Number.prototype.toFixed.call(x, maxFraction),

	        // 4. If [maxFraction] ≠ 0, then
	        //    ...
	        //    e. Let int be the number of characters in a.
	        //
	        // 5. Else let int be the number of characters in m.
	        igr = m.split(".")[0].length,  // int is a reserved word

	        // 6. Let cut be maxFraction – minFraction.
	        cut = maxFraction - minFraction,

	        exp = (idx = m.indexOf('e')) > -1 ? m.slice(idx + 1) : 0;

	    if (exp) {
	        m = m.slice(0, idx).replace('.', '');
	        m += arrJoin.call(Array(exp - (m.length - 1) + 1), '0')
	          + '.' + arrJoin.call(Array(maxFraction + 1), '0');

	        igr = m.length;
	    }

	    // 7. Repeat while cut > 0 and the last character of m is "0":
	    while (cut > 0 && m.slice(-1) === "0") {
	        // a. Remove the last character from m.
	        m = m.slice(0, -1);

	        // b. Decrease cut by 1.
	        cut--;
	    }

	    // 8. If the last character of m is ".", then
	    if (m.slice(-1) === ".")
	        // a. Remove the last character from m.
	        m = m.slice(0, -1);

	    // 9. If int < minInteger, then
	    if (igr < minInteger)
	        // a. Let z be the String consisting of minInteger–int occurrences of the
	        //    character "0".
	        var z = arrJoin.call(Array(minInteger - igr + 1), '0');

	    // 10. Let m be the concatenation of Strings z and m.
	    // 11. Return m.
	    return (z ? z : '') + m;
	}

	// Sect 11.3.2 Table 2, Numbering systems
	// ======================================
	var numSys = {
	    arab:    [ '\u0660', '\u0661', '\u0662', '\u0663', '\u0664', '\u0665', '\u0666', '\u0667', '\u0668', '\u0669' ],
	    arabext: [ '\u06F0', '\u06F1', '\u06F2', '\u06F3', '\u06F4', '\u06F5', '\u06F6', '\u06F7', '\u06F8', '\u06F9' ],
	    bali:    [ '\u1B50', '\u1B51', '\u1B52', '\u1B53', '\u1B54', '\u1B55', '\u1B56', '\u1B57', '\u1B58', '\u1B59' ],
	    beng:    [ '\u09E6', '\u09E7', '\u09E8', '\u09E9', '\u09EA', '\u09EB', '\u09EC', '\u09ED', '\u09EE', '\u09EF' ],
	    deva:    [ '\u0966', '\u0967', '\u0968', '\u0969', '\u096A', '\u096B', '\u096C', '\u096D', '\u096E', '\u096F' ],
	    fullwide:[ '\uFF10', '\uFF11', '\uFF12', '\uFF13', '\uFF14', '\uFF15', '\uFF16', '\uFF17', '\uFF18', '\uFF19' ],
	    gujr:    [ '\u0AE6', '\u0AE7', '\u0AE8', '\u0AE9', '\u0AEA', '\u0AEB', '\u0AEC', '\u0AED', '\u0AEE', '\u0AEF' ],
	    guru:    [ '\u0A66', '\u0A67', '\u0A68', '\u0A69', '\u0A6A', '\u0A6B', '\u0A6C', '\u0A6D', '\u0A6E', '\u0A6F' ],
	    hanidec: [ '\u3007', '\u4E00', '\u4E8C', '\u4E09', '\u56DB', '\u4E94', '\u516D', '\u4E03', '\u516B', '\u4E5D' ],
	    khmr:    [ '\u17E0', '\u17E1', '\u17E2', '\u17E3', '\u17E4', '\u17E5', '\u17E6', '\u17E7', '\u17E8', '\u17E9' ],
	    knda:    [ '\u0CE6', '\u0CE7', '\u0CE8', '\u0CE9', '\u0CEA', '\u0CEB', '\u0CEC', '\u0CED', '\u0CEE', '\u0CEF' ],
	    laoo:    [ '\u0ED0', '\u0ED1', '\u0ED2', '\u0ED3', '\u0ED4', '\u0ED5', '\u0ED6', '\u0ED7', '\u0ED8', '\u0ED9' ],
	    latn:    [ '\u0030', '\u0031', '\u0032', '\u0033', '\u0034', '\u0035', '\u0036', '\u0037', '\u0038', '\u0039' ],
	    limb:    [ '\u1946', '\u1947', '\u1948', '\u1949', '\u194A', '\u194B', '\u194C', '\u194D', '\u194E', '\u194F' ],
	    mlym:    [ '\u0D66', '\u0D67', '\u0D68', '\u0D69', '\u0D6A', '\u0D6B', '\u0D6C', '\u0D6D', '\u0D6E', '\u0D6F' ],
	    mong:    [ '\u1810', '\u1811', '\u1812', '\u1813', '\u1814', '\u1815', '\u1816', '\u1817', '\u1818', '\u1819' ],
	    mymr:    [ '\u1040', '\u1041', '\u1042', '\u1043', '\u1044', '\u1045', '\u1046', '\u1047', '\u1048', '\u1049' ],
	    orya:    [ '\u0B66', '\u0B67', '\u0B68', '\u0B69', '\u0B6A', '\u0B6B', '\u0B6C', '\u0B6D', '\u0B6E', '\u0B6F' ],
	    tamldec: [ '\u0BE6', '\u0BE7', '\u0BE8', '\u0BE9', '\u0BEA', '\u0BEB', '\u0BEC', '\u0BED', '\u0BEE', '\u0BEF' ],
	    telu:    [ '\u0C66', '\u0C67', '\u0C68', '\u0C69', '\u0C6A', '\u0C6B', '\u0C6C', '\u0C6D', '\u0C6E', '\u0C6F' ],
	    thai:    [ '\u0E50', '\u0E51', '\u0E52', '\u0E53', '\u0E54', '\u0E55', '\u0E56', '\u0E57', '\u0E58', '\u0E59' ],
	    tibt:    [ '\u0F20', '\u0F21', '\u0F22', '\u0F23', '\u0F24', '\u0F25', '\u0F26', '\u0F27', '\u0F28', '\u0F29' ]
	};

	/**
	 * This function provides access to the locale and formatting options computed
	 * during initialization of the object.
	 *
	 * The function returns a new object whose properties and attributes are set as
	 * if constructed by an object literal assigning to each of the following
	 * properties the value of the corresponding internal property of this
	 * NumberFormat object (see 11.4): locale, numberingSystem, style, currency,
	 * currencyDisplay, minimumIntegerDigits, minimumFractionDigits,
	 * maximumFractionDigits, minimumSignificantDigits, maximumSignificantDigits, and
	 * useGrouping. Properties whose corresponding internal properties are not present
	 * are not assigned.
	 */
	/* 11.3.3 */defineProperty(Intl.NumberFormat.prototype, 'resolvedOptions', {
	    configurable: true,
	    writable: true,
	    value: function () {
	        var prop,
	            descs = new Record(),
	            props = [
	                'locale', 'numberingSystem', 'style', 'currency', 'currencyDisplay',
	                'minimumIntegerDigits', 'minimumFractionDigits', 'maximumFractionDigits',
	                'minimumSignificantDigits', 'maximumSignificantDigits', 'useGrouping'
	            ],
	            internal = this != null && typeof this === 'object' && getInternalProperties(this);

	        // Satisfy test 11.3_b
	        if (!internal || !internal['[[initializedNumberFormat]]'])
	            throw new TypeError('`this` value for resolvedOptions() is not an initialized Intl.NumberFormat object.');

	        for (var i = 0, max = props.length; i < max; i++) {
	            if (hop.call(internal, prop = '[['+ props[i] +']]'))
	                descs[props[i]] = { value: internal[prop], writable: true, configurable: true, enumerable: true };
	        }

	        return objCreate({}, descs);
	    }
	});

	// 12.1 The Intl.DateTimeFormat constructor
	// ==================================

	// Define the DateTimeFormat constructor internally so it cannot be tainted
	function DateTimeFormatConstructor () {
	    var locales = arguments[0];
	    var options = arguments[1];

	    if (!this || this === Intl) {
	        return new Intl.DateTimeFormat(locales, options);
	    }
	    return InitializeDateTimeFormat(toObject(this), locales, options);
	}

	defineProperty(Intl, 'DateTimeFormat', {
	    configurable: true,
	    writable: true,
	    value: DateTimeFormatConstructor
	});

	// Must explicitly set prototypes as unwritable
	defineProperty(DateTimeFormatConstructor, 'prototype', {
	    writable: false
	});

	/**
	 * The abstract operation InitializeDateTimeFormat accepts the arguments dateTimeFormat
	 * (which must be an object), locales, and options. It initializes dateTimeFormat as a
	 * DateTimeFormat object.
	 */
	function/* 12.1.1.1 */InitializeDateTimeFormat (dateTimeFormat, locales, options) {
	    var
	    // This will be a internal properties object if we're not already initialized
	        internal = getInternalProperties(dateTimeFormat),

	    // Create an object whose props can be used to restore the values of RegExp props
	        regexpState = createRegExpRestore();

	    // 1. If dateTimeFormat has an [[initializedIntlObject]] internal property with
	    //    value true, throw a TypeError exception.
	    if (internal['[[initializedIntlObject]]'] === true)
	        throw new TypeError('`this` object has already been initialized as an Intl object');

	    // Need this to access the `internal` object
	    defineProperty(dateTimeFormat, '__getInternalProperties', {
	        value: function () {
	            // NOTE: Non-standard, for internal use only
	            if (arguments[0] === secret)
	                return internal;
	        }
	    });

	    // 2. Set the [[initializedIntlObject]] internal property of numberFormat to true.
	    internal['[[initializedIntlObject]]'] = true;

	    var
	    // 3. Let requestedLocales be the result of calling the CanonicalizeLocaleList
	    //    abstract operation (defined in 9.2.1) with argument locales.
	        requestedLocales = CanonicalizeLocaleList(locales),

	    // 4. Let options be the result of calling the ToDateTimeOptions abstract
	    //    operation (defined below) with arguments options, "any", and "date".
	        options = ToDateTimeOptions(options, 'any', 'date'),

	    // 5. Let opt be a new Record.
	        opt = new Record();

	    // 6. Let matcher be the result of calling the GetOption abstract operation
	    //    (defined in 9.2.9) with arguments options, "localeMatcher", "string", a List
	    //    containing the two String values "lookup" and "best fit", and "best fit".
	        matcher = GetOption(options, 'localeMatcher', 'string', new List('lookup', 'best fit'), 'best fit');

	    // 7. Set opt.[[localeMatcher]] to matcher.
	    opt['[[localeMatcher]]'] = matcher;

	    var
	    // 8. Let DateTimeFormat be the standard built-in object that is the initial
	    //    value of Intl.DateTimeFormat.
	        DateTimeFormat = internals.DateTimeFormat, // This is what we *really* need

	    // 9. Let localeData be the value of the [[localeData]] internal property of
	    //    DateTimeFormat.
	        localeData = DateTimeFormat['[[localeData]]'],

	    // 10. Let r be the result of calling the ResolveLocale abstract operation
	    //     (defined in 9.2.5) with the [[availableLocales]] internal property of
	    //      DateTimeFormat, requestedLocales, opt, the [[relevantExtensionKeys]]
	    //      internal property of DateTimeFormat, and localeData.
	        r = ResolveLocale(DateTimeFormat['[[availableLocales]]'], requestedLocales,
	                opt, DateTimeFormat['[[relevantExtensionKeys]]'], localeData);

	    // 11. Set the [[locale]] internal property of dateTimeFormat to the value of
	    //     r.[[locale]].
	    internal['[[locale]]'] = r['[[locale]]'];

	    // 12. Set the [[calendar]] internal property of dateTimeFormat to the value of
	    //     r.[[ca]].
	    internal['[[calendar]]'] = r['[[ca]]'];

	    // 13. Set the [[numberingSystem]] internal property of dateTimeFormat to the value of
	    //     r.[[nu]].
	    internal['[[numberingSystem]]'] = r['[[nu]]'];

	    // The specification doesn't tell us to do this, but it's helpful later on
	    internal['[[dataLocale]]'] = r['[[dataLocale]]'];

	    var
	    // 14. Let dataLocale be the value of r.[[dataLocale]].
	        dataLocale = r['[[dataLocale]]'],

	    // 15. Let tz be the result of calling the [[Get]] internal method of options with
	    //     argument "timeZone".
	        tz = options.timeZone;

	    // 16. If tz is not undefined, then
	    if (tz !== undefined) {
	        // a. Let tz be ToString(tz).
	        // b. Convert tz to upper case as described in 6.1.
	        //    NOTE: If an implementation accepts additional time zone values, as permitted
	        //          under certain conditions by the Conformance clause, different casing
	        //          rules apply.
	        tz = toLatinUpperCase(tz);

	        // c. If tz is not "UTC", then throw a RangeError exception.
	        // ###TODO: accept more time zones###
	        if (tz !== 'UTC')
	            throw new RangeError('timeZone is not supported.');
	    }

	    // 17. Set the [[timeZone]] internal property of dateTimeFormat to tz.
	    internal['[[timeZone]]'] = tz;

	    // 18. Let opt be a new Record.
	    opt = new Record();

	    // 19. For each row of Table 3, except the header row, do:
	    for (var prop in dateTimeComponents) {
	        if (!hop.call(dateTimeComponents, prop))
	            continue;

	        var
	        // 20. Let prop be the name given in the Property column of the row.
	        // 21. Let value be the result of calling the GetOption abstract operation,
	        //     passing as argument options, the name given in the Property column of the
	        //     row, "string", a List containing the strings given in the Values column of
	        //     the row, and undefined.
	            value = GetOption(options, prop, 'string', dateTimeComponents[prop]);

	        // 22. Set opt.[[<prop>]] to value.
	        opt['[['+prop+']]'] = value;
	    }

	    var
	        // Assigned a value below
	        bestFormat,

	        // 23. Let dataLocaleData be the result of calling the [[Get]] internal method of
	        //     localeData with argument dataLocale.
	        dataLocaleData = localeData[dataLocale],

	        // 24. Let formats be the result of calling the [[Get]] internal method of
	        //     dataLocaleData with argument "formats".
	        //     Note: we process the CLDR formats into the spec'd structure
	        formats = ToDateTimeFormats(dataLocaleData.formats),

	        // 25. Let matcher be the result of calling the GetOption abstract operation with
	        //     arguments options, "formatMatcher", "string", a List containing the two String
	        //     values "basic" and "best fit", and "best fit".
	        matcher = GetOption(options, 'formatMatcher', 'string', new List('basic', 'best fit'), 'best fit');

	    // Optimization: caching the processed formats as a one time operation by
	    // replacing the initial structure from localeData
	    dataLocaleData.formats = formats;

	    // 26. If matcher is "basic", then
	    if (matcher === 'basic')
	        // 27. Let bestFormat be the result of calling the BasicFormatMatcher abstract
	        //     operation (defined below) with opt and formats.
	        bestFormat = BasicFormatMatcher(opt, formats);

	    // 28. Else
	    else
	        // 29. Let bestFormat be the result of calling the BestFitFormatMatcher
	        //     abstract operation (defined below) with opt and formats.
	        bestFormat = BestFitFormatMatcher(opt, formats);

	    // 30. For each row in Table 3, except the header row, do
	    for (var prop in dateTimeComponents) {
	        if (!hop.call(dateTimeComponents, prop))
	            continue;

	        // a. Let prop be the name given in the Property column of the row.
	        // b. Let pDesc be the result of calling the [[GetOwnProperty]] internal method of
	        //    bestFormat with argument prop.
	        // c. If pDesc is not undefined, then
	        if (hop.call(bestFormat, prop)) {
	            var
	            // i. Let p be the result of calling the [[Get]] internal method of bestFormat
	            //    with argument prop.
	                p = bestFormat[prop];

	            // ii. Set the [[<prop>]] internal property of dateTimeFormat to p.
	            internal['[['+prop+']]'] = p;
	        }
	    }

	    var
	        // Assigned a value below
	        pattern,

	    // 31. Let hr12 be the result of calling the GetOption abstract operation with
	    //     arguments options, "hour12", "boolean", undefined, and undefined.
	        hr12 = GetOption(options, 'hour12', 'boolean'/*, undefined, undefined*/);

	    // 32. If dateTimeFormat has an internal property [[hour]], then
	    if (internal['[[hour]]']) {
	        // a. If hr12 is undefined, then let hr12 be the result of calling the [[Get]]
	        //    internal method of dataLocaleData with argument "hour12".
	        hr12 = hr12 === undefined ? dataLocaleData.hour12 : hr12;

	        // b. Set the [[hour12]] internal property of dateTimeFormat to hr12.
	        internal['[[hour12]]'] = hr12;

	        // c. If hr12 is true, then
	        if (hr12 === true) {
	            var
	            // i. Let hourNo0 be the result of calling the [[Get]] internal method of
	            //    dataLocaleData with argument "hourNo0".
	                hourNo0 = dataLocaleData.hourNo0;

	            // ii. Set the [[hourNo0]] internal property of dateTimeFormat to hourNo0.
	            internal['[[hourNo0]]'] = hourNo0;

	            // iii. Let pattern be the result of calling the [[Get]] internal method of
	            //      bestFormat with argument "pattern12".
	            pattern = bestFormat.pattern12;
	        }

	        // d. Else
	        else
	            // i. Let pattern be the result of calling the [[Get]] internal method of
	            //    bestFormat with argument "pattern".
	            pattern = bestFormat.pattern;
	    }

	    // 33. Else
	    else
	        // a. Let pattern be the result of calling the [[Get]] internal method of
	        //    bestFormat with argument "pattern".
	        pattern = bestFormat.pattern;

	    // 34. Set the [[pattern]] internal property of dateTimeFormat to pattern.
	    internal['[[pattern]]'] = pattern;

	    // 35. Set the [[boundFormat]] internal property of dateTimeFormat to undefined.
	    internal['[[boundFormat]]'] = undefined;

	    // 36. Set the [[initializedDateTimeFormat]] internal property of dateTimeFormat to
	    //     true.
	    internal['[[initializedDateTimeFormat]]'] = true;

	    // In ES3, we need to pre-bind the format() function
	    if (es3)
	        dateTimeFormat.format = GetFormatDateTime.call(dateTimeFormat);

	    // Restore the RegExp properties
	    regexpState.exp.test(regexpState.input);

	    // Return the newly initialised object
	    return dateTimeFormat;
	}

	/**
	 * Several DateTimeFormat algorithms use values from the following table, which provides
	 * property names and allowable values for the components of date and time formats:
	 */
	var dateTimeComponents = {
	         weekday: [ "narrow", "short", "long" ],
	             era: [ "narrow", "short", "long" ],
	            year: [ "2-digit", "numeric" ],
	           month: [ "2-digit", "numeric", "narrow", "short", "long" ],
	             day: [ "2-digit", "numeric" ],
	            hour: [ "2-digit", "numeric" ],
	          minute: [ "2-digit", "numeric" ],
	          second: [ "2-digit", "numeric" ],
	    timeZoneName: [ "short", "long" ]
	};

	/**
	 * When the ToDateTimeOptions abstract operation is called with arguments options,
	 * required, and defaults, the following steps are taken:
	 */
	function ToDateTimeFormats(formats) {
	    if (Object.prototype.toString.call(formats) === '[object Array]') {
	        return formats;
	    }
	    return src$cldr$$.createDateTimeFormats(formats);
	}

	/**
	 * When the ToDateTimeOptions abstract operation is called with arguments options,
	 * required, and defaults, the following steps are taken:
	 */
	function ToDateTimeOptions (options, required, defaults) {
	    // 1. If options is undefined, then let options be null, else let options be
	    //    ToObject(options).
	    if (options === undefined)
	        options = null;

	    else {
	        // (#12) options needs to be a Record, but it also needs to inherit properties
	        var opt2 = toObject(options);
	        options = new Record();

	        for (var k in opt2)
	            options[k] = opt2[k];
	    }

	    var
	    // 2. Let create be the standard built-in function object defined in ES5, 15.2.3.5.
	        create = objCreate,

	    // 3. Let options be the result of calling the [[Call]] internal method of create with
	    //    undefined as the this value and an argument list containing the single item
	    //    options.
	        options = create(options),

	    // 4. Let needDefaults be true.
	        needDefaults = true;

	    // 5. If required is "date" or "any", then
	    if (required === 'date' || required === 'any') {
	        // a. For each of the property names "weekday", "year", "month", "day":
	            // i. If the result of calling the [[Get]] internal method of options with the
	            //    property name is not undefined, then let needDefaults be false.
	        if (options.weekday !== undefined || options.year !== undefined
	                || options.month !== undefined || options.day !== undefined)
	            needDefaults = false;
	    }

	    // 6. If required is "time" or "any", then
	    if (required === 'time' || required === 'any') {
	        // a. For each of the property names "hour", "minute", "second":
	            // i. If the result of calling the [[Get]] internal method of options with the
	            //    property name is not undefined, then let needDefaults be false.
	        if (options.hour !== undefined || options.minute !== undefined || options.second !== undefined)
	                needDefaults = false;
	    }

	    // 7. If needDefaults is true and defaults is either "date" or "all", then
	    if (needDefaults && (defaults === 'date' || defaults === 'all'))
	        // a. For each of the property names "year", "month", "day":
	            // i. Call the [[DefineOwnProperty]] internal method of options with the
	            //    property name, Property Descriptor {[[Value]]: "numeric", [[Writable]]:
	            //    true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
	        options.year = options.month = options.day = 'numeric';

	    // 8. If needDefaults is true and defaults is either "time" or "all", then
	    if (needDefaults && (defaults === 'time' || defaults === 'all'))
	        // a. For each of the property names "hour", "minute", "second":
	            // i. Call the [[DefineOwnProperty]] internal method of options with the
	            //    property name, Property Descriptor {[[Value]]: "numeric", [[Writable]]:
	            //    true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
	        options.hour = options.minute = options.second = 'numeric';

	    // 9. Return options.
	    return options;
	}

	/**
	 * When the BasicFormatMatcher abstract operation is called with two arguments options and
	 * formats, the following steps are taken:
	 */
	function BasicFormatMatcher (options, formats) {
	    return calculateScore(options, formats);
	}

	/**
	 * Calculates score for BestFitFormatMatcher and BasicFormatMatcher.
	 * Abstracted from BasicFormatMatcher section.
	 */
	function calculateScore (options, formats, bestFit) {
	    var
	    // Additional penalty type when bestFit === true
	       diffDataTypePenalty = 8,

	    // 1. Let removalPenalty be 120.
	        removalPenalty = 120,

	    // 2. Let additionPenalty be 20.
	        additionPenalty = 20,

	    // 3. Let longLessPenalty be 8.
	        longLessPenalty = 8,

	    // 4. Let longMorePenalty be 6.
	        longMorePenalty = 6,

	    // 5. Let shortLessPenalty be 6.
	        shortLessPenalty = 6,

	    // 6. Let shortMorePenalty be 3.
	        shortMorePenalty = 3,

	    // 7. Let bestScore be -Infinity.
	        bestScore = -Infinity,

	    // 8. Let bestFormat be undefined.
	        bestFormat,

	    // 9. Let i be 0.
	        i = 0,

	    // 10. Let len be the result of calling the [[Get]] internal method of formats with argument "length".
	        len = formats.length;

	    // 11. Repeat while i < len:
	    while (i < len) {
	        var
	        // a. Let format be the result of calling the [[Get]] internal method of formats with argument ToString(i).
	            format = formats[i],

	        // b. Let score be 0.
	            score = 0;

	        // c. For each property shown in Table 3:
	        for (var property in dateTimeComponents) {
	            if (!hop.call(dateTimeComponents, property))
	                continue;

	            var
	            // i. Let optionsProp be options.[[<property>]].
	                optionsProp = options['[['+ property +']]'],

	            // ii. Let formatPropDesc be the result of calling the [[GetOwnProperty]] internal method of format
	            //     with argument property.
	            // iii. If formatPropDesc is not undefined, then
	            //     1. Let formatProp be the result of calling the [[Get]] internal method of format with argument property.
	                formatProp = hop.call(format, property) ? format[property] : undefined;

	            // iv. If optionsProp is undefined and formatProp is not undefined, then decrease score by
	            //     additionPenalty.
	            if (optionsProp === undefined && formatProp !== undefined)
	                score -= additionPenalty;

	            // v. Else if optionsProp is not undefined and formatProp is undefined, then decrease score by
	            //    removalPenalty.
	            else if (optionsProp !== undefined && formatProp === undefined)
	                score -= removalPenalty;

	            // vi. Else
	            else {
	                var
	                // 1. Let values be the array ["2-digit", "numeric", "narrow", "short",
	                //    "long"].
	                    values = [ '2-digit', 'numeric', 'narrow', 'short', 'long' ],

	                // 2. Let optionsPropIndex be the index of optionsProp within values.
	                    optionsPropIndex = arrIndexOf.call(values, optionsProp),

	                // 3. Let formatPropIndex be the index of formatProp within values.
	                    formatPropIndex = arrIndexOf.call(values, formatProp),

	                // 4. Let delta be max(min(formatPropIndex - optionsPropIndex, 2), -2).
	                    delta = Math.max(Math.min(formatPropIndex - optionsPropIndex, 2), -2);

	                // When the bestFit argument is true, subtract additional penalty where data types are not the same
	                if (bestFit && (
	                    ((optionsProp === 'numeric' || optionsProp === '2-digit') && (formatProp !== 'numeric' && formatProp !== '2-digit'))
	                 || ((optionsProp !== 'numeric' && optionsProp !== '2-digit') && (formatProp === '2-digit' || formatProp === 'numeric'))
	                ))
	                    score -= diffDataTypePenalty;

	                // 5. If delta = 2, decrease score by longMorePenalty.
	                if (delta === 2)
	                    score -= longMorePenalty;

	                // 6. Else if delta = 1, decrease score by shortMorePenalty.
	                else if (delta === 1)
	                    score -= shortMorePenalty;

	                // 7. Else if delta = -1, decrease score by shortLessPenalty.
	                else if (delta === -1)
	                    score -= shortLessPenalty;

	                // 8. Else if delta = -2, decrease score by longLessPenalty.
	                else if (delta === -2)
	                    score -= longLessPenalty;
	            }
	        }

	        // d. If score > bestScore, then
	        if (score > bestScore) {
	            // i. Let bestScore be score.
	            bestScore = score;

	            // ii. Let bestFormat be format.
	            bestFormat = format;
	        }

	        // e. Increase i by 1.
	        i++;
	    }

	    // 12. Return bestFormat.
	    return bestFormat;
	}

	/**
	 * When the BestFitFormatMatcher abstract operation is called with two arguments options
	 * and formats, it performs implementation dependent steps, which should return a set of
	 * component representations that a typical user of the selected locale would perceive as
	 * at least as good as the one returned by BasicFormatMatcher.
	 *
	 * This polyfill defines the algorithm to be the same as BasicFormatMatcher,
	 * with the addition of bonus points awarded where the requested format is of
	 * the same data type as the potentially matching format.
	 *
	 * For example,
	 *
	 *     { month: 'numeric', day: 'numeric' }
	 *
	 * should match
	 *
	 *     { month: '2-digit', day: '2-digit' }
	 *
	 * rather than
	 *
	 *     { month: 'short', day: 'numeric' }
	 *
	 * This makes sense because a user requesting a formatted date with numeric parts would
	 * not expect to see the returned format containing narrow, short or long part names
	 */
	function BestFitFormatMatcher (options, formats) {
	    return calculateScore(options, formats, true);
	}

	/* 12.2.3 */internals.DateTimeFormat = {
	    '[[availableLocales]]': [],
	    '[[relevantExtensionKeys]]': ['ca', 'nu'],
	    '[[localeData]]': {}
	};

	/**
	 * When the supportedLocalesOf method of Intl.DateTimeFormat is called, the
	 * following steps are taken:
	 */
	/* 12.2.2 */defineProperty(Intl.DateTimeFormat, 'supportedLocalesOf', {
	    configurable: true,
	    writable: true,
	    value: fnBind.call(supportedLocalesOf, internals.DateTimeFormat)
	});

	/**
	 * This named accessor property returns a function that formats a number
	 * according to the effective locale and the formatting options of this
	 * DateTimeFormat object.
	 */
	/* 12.3.2 */defineProperty(Intl.DateTimeFormat.prototype, 'format', {
	    configurable: true,
	    get: GetFormatDateTime
	});

	function GetFormatDateTime() {
	    var internal = this != null && typeof this === 'object' && getInternalProperties(this);

	    // Satisfy test 12.3_b
	    if (!internal || !internal['[[initializedDateTimeFormat]]'])
	        throw new TypeError('`this` value for format() is not an initialized Intl.DateTimeFormat object.');

	    // The value of the [[Get]] attribute is a function that takes the following
	    // steps:

	    // 1. If the [[boundFormat]] internal property of this DateTimeFormat object
	    //    is undefined, then:
	    if (internal['[[boundFormat]]'] === undefined) {
	        var
	        // a. Let F be a Function object, with internal properties set as
	        //    specified for built-in functions in ES5, 15, or successor, and the
	        //    length property set to 0, that takes the argument date and
	        //    performs the following steps:
	            F = function () {
	                //   i. If date is not provided or is undefined, then let x be the
	                //      result as if by the expression Date.now() where Date.now is
	                //      the standard built-in function defined in ES5, 15.9.4.4.
	                //  ii. Else let x be ToNumber(date).
	                // iii. Return the result of calling the FormatDateTime abstract
	                //      operation (defined below) with arguments this and x.
	                var x = Number(arguments.length === 0 ? Date.now() : arguments[0]);
	                return FormatDateTime(this, x);
	            },
	        // b. Let bind be the standard built-in function object defined in ES5,
	        //    15.3.4.5.
	        // c. Let bf be the result of calling the [[Call]] internal method of
	        //    bind with F as the this value and an argument list containing
	        //    the single item this.
	            bf = fnBind.call(F, this);
	        // d. Set the [[boundFormat]] internal property of this NumberFormat
	        //    object to bf.
	        internal['[[boundFormat]]'] = bf;
	    }
	    // Return the value of the [[boundFormat]] internal property of this
	    // NumberFormat object.
	    return internal['[[boundFormat]]'];
	}

	/**
	 * When the FormatDateTime abstract operation is called with arguments dateTimeFormat
	 * (which must be an object initialized as a DateTimeFormat) and x (which must be a Number
	 * value), it returns a String value representing x (interpreted as a time value as
	 * specified in ES5, 15.9.1.1) according to the effective locale and the formatting
	 * options of dateTimeFormat.
	 */
	function FormatDateTime(dateTimeFormat, x) {
	    // 1. If x is not a finite Number, then throw a RangeError exception.
	    if (!isFinite(x))
	        throw new RangeError('Invalid valid date passed to format');

	    var
	        internal = dateTimeFormat.__getInternalProperties(secret),

	    // Creating restore point for properties on the RegExp object... please wait
	        regexpState = createRegExpRestore(),

	    // 2. Let locale be the value of the [[locale]] internal property of dateTimeFormat.
	        locale = internal['[[locale]]'],

	    // 3. Let nf be the result of creating a new NumberFormat object as if by the
	    // expression new Intl.NumberFormat([locale], {useGrouping: false}) where
	    // Intl.NumberFormat is the standard built-in constructor defined in 11.1.3.
	        nf = new Intl.NumberFormat([locale], {useGrouping: false}),

	    // 4. Let nf2 be the result of creating a new NumberFormat object as if by the
	    // expression new Intl.NumberFormat([locale], {minimumIntegerDigits: 2, useGrouping:
	    // false}) where Intl.NumberFormat is the standard built-in constructor defined in
	    // 11.1.3.
	        nf2 = new Intl.NumberFormat([locale], {minimumIntegerDigits: 2, useGrouping: false}),

	    // 5. Let tm be the result of calling the ToLocalTime abstract operation (defined
	    // below) with x, the value of the [[calendar]] internal property of dateTimeFormat,
	    // and the value of the [[timeZone]] internal property of dateTimeFormat.
	        tm = ToLocalTime(x, internal['[[calendar]]'], internal['[[timeZone]]']),

	    // 6. Let result be the value of the [[pattern]] internal property of dateTimeFormat.
	        result = internal['[[pattern]]'],

	    // Need the locale minus any extensions
	        dataLocale = internal['[[dataLocale]]'],

	    // Need the calendar data from CLDR
	        localeData = internals.DateTimeFormat['[[localeData]]'][dataLocale].calendars,
	        ca = internal['[[calendar]]'];

	    // 7. For each row of Table 3, except the header row, do:
	    for (var p in dateTimeComponents) {
	        // a. If dateTimeFormat has an internal property with the name given in the
	        //    Property column of the row, then:
	        if (hop.call(internal, '[['+ p +']]')) {
	            var
	            // Assigned values below
	                pm, fv,

	            //   i. Let p be the name given in the Property column of the row.
	            //  ii. Let f be the value of the [[<p>]] internal property of dateTimeFormat.
	                f = internal['[['+ p +']]'],

	            // iii. Let v be the value of tm.[[<p>]].
	                v = tm['[['+ p +']]'];

	            //  iv. If p is "year" and v ≤ 0, then let v be 1 - v.
	            if (p === 'year' && v <= 0)
	                v = 1 - v;

	            //   v. If p is "month", then increase v by 1.
	            else if (p === 'month')
	                v++;

	            //  vi. If p is "hour" and the value of the [[hour12]] internal property of
	            //      dateTimeFormat is true, then
	            else if (p === 'hour' && internal['[[hour12]]'] === true) {
	                // 1. Let v be v modulo 12.
	                v = v % 12;

	                // 2. If v is equal to the value of tm.[[<p>]], then let pm be false; else
	                //    let pm be true.
	                pm = v !== tm['[['+ p +']]'];

	                // 3. If v is 0 and the value of the [[hourNo0]] internal property of
	                //    dateTimeFormat is true, then let v be 12.
	                if (v === 0 && internal['[[hourNo0]]'] === true)
	                    v = 12;
	            }

	            // vii. If f is "numeric", then
	            if (f === 'numeric')
	                // 1. Let fv be the result of calling the FormatNumber abstract operation
	                //    (defined in 11.3.2) with arguments nf and v.
	                fv = FormatNumber(nf, v);

	            // viii. Else if f is "2-digit", then
	            else if (f === '2-digit') {
	                // 1. Let fv be the result of calling the FormatNumber abstract operation
	                //    with arguments nf2 and v.
	                fv = FormatNumber(nf2, v);

	                // 2. If the length of fv is greater than 2, let fv be the substring of fv
	                //    containing the last two characters.
	                if (fv.length > 2)
	                    fv = fv.slice(-2);
	            }

	            // ix. Else if f is "narrow", "short", or "long", then let fv be a String
	            //     value representing f in the desired form; the String value depends upon
	            //     the implementation and the effective locale and calendar of
	            //     dateTimeFormat. If p is "month", then the String value may also depend
	            //     on whether dateTimeFormat has a [[day]] internal property. If p is
	            //     "timeZoneName", then the String value may also depend on the value of
	            //     the [[inDST]] field of tm.
	            else if (f in dateWidths) {
	                switch (p) {
	                    case 'month':
	                        fv = resolveDateString(localeData, ca, 'months', f, tm['[['+ p +']]']);
	                        break;

	                    case 'weekday':
	                        try {
	                            fv = resolveDateString(localeData, ca, 'days', f, tm['[['+ p +']]']);
	                            // fv = resolveDateString(ca.days, f)[tm['[['+ p +']]']];
	                        } catch (e) {
	                            throw new Error('Could not find weekday data for locale '+locale);
	                        }
	                        break;

	                    case 'timeZoneName':
	                        fv = ''; // TODO
	                        break;

	                    // TODO: Era
	                    default:
	                        fv = tm['[['+ p +']]'];
	                }
	            }

	            // x. Replace the substring of result that consists of "{", p, and "}", with
	            //    fv.
	            result = result.replace('{'+ p +'}', fv);
	        }
	    }
	    // 8. If dateTimeFormat has an internal property [[hour12]] whose value is true, then
	    if (internal['[[hour12]]'] === true) {
	        // a. If pm is true, then let fv be an implementation and locale dependent String
	        //    value representing “post meridiem”; else let fv be an implementation and
	        //    locale dependent String value representing “ante meridiem”.
	        fv = resolveDateString(localeData, ca, 'dayPeriods', pm ? 'pm' : 'am');

	        // b. Replace the substring of result that consists of "{ampm}", with fv.
	        result = result.replace('{ampm}', fv);
	    }

	    // Restore properties of the RegExp object
	    regexpState.exp.test(regexpState.input);

	    // 9. Return result.
	    return result;
	}

	/**
	 * When the ToLocalTime abstract operation is called with arguments date, calendar, and
	 * timeZone, the following steps are taken:
	 */
	function ToLocalTime(date, calendar, timeZone) {
	    // 1. Apply calendrical calculations on date for the given calendar and time zone to
	    //    produce weekday, era, year, month, day, hour, minute, second, and inDST values.
	    //    The calculations should use best available information about the specified
	    //    calendar and time zone. If the calendar is "gregory", then the calculations must
	    //    match the algorithms specified in ES5, 15.9.1, except that calculations are not
	    //    bound by the restrictions on the use of best available information on time zones
	    //    for local time zone adjustment and daylight saving time adjustment imposed by
	    //    ES5, 15.9.1.7 and 15.9.1.8.
	    // ###TODO###
	    var d = new Date(date),
	        m = 'get' + (timeZone || '');

	    // 2. Return a Record with fields [[weekday]], [[era]], [[year]], [[month]], [[day]],
	    //    [[hour]], [[minute]], [[second]], and [[inDST]], each with the corresponding
	    //    calculated value.
	    return new Record({
	        '[[weekday]]': d[m + 'Day'](),
	        '[[era]]'    : +(d[m + 'FullYear']() >= 0),
	        '[[year]]'   : d[m + 'FullYear'](),
	        '[[month]]'  : d[m + 'Month'](),
	        '[[day]]'    : d[m + 'Date'](),
	        '[[hour]]'   : d[m + 'Hours'](),
	        '[[minute]]' : d[m + 'Minutes'](),
	        '[[second]]' : d[m + 'Seconds'](),
	        '[[inDST]]'  : false // ###TODO###
	    });
	}

	/**
	 * The function returns a new object whose properties and attributes are set as if
	 * constructed by an object literal assigning to each of the following properties the
	 * value of the corresponding internal property of this DateTimeFormat object (see 12.4):
	 * locale, calendar, numberingSystem, timeZone, hour12, weekday, era, year, month, day,
	 * hour, minute, second, and timeZoneName. Properties whose corresponding internal
	 * properties are not present are not assigned.
	 */
	/* 12.3.3 */defineProperty(Intl.DateTimeFormat.prototype, 'resolvedOptions', {
	    writable: true,
	    configurable: true,
	    value: function () {
	        var prop,
	            descs = new Record(),
	            props = [
	                'locale', 'calendar', 'numberingSystem', 'timeZone', 'hour12', 'weekday',
	                'era', 'year', 'month', 'day', 'hour', 'minute', 'second', 'timeZoneName'
	            ],
	            internal = this != null && typeof this === 'object' && getInternalProperties(this);

	        // Satisfy test 12.3_b
	        if (!internal || !internal['[[initializedDateTimeFormat]]'])
	            throw new TypeError('`this` value for resolvedOptions() is not an initialized Intl.DateTimeFormat object.');

	        for (var i = 0, max = props.length; i < max; i++) {
	            if (hop.call(internal, prop = '[[' + props[i] + ']]'))
	                descs[props[i]] = { value: internal[prop], writable: true, configurable: true, enumerable: true };
	        }

	        return objCreate({}, descs);
	    }
	});

	// Sect 13 Locale Sensitive Functions of the ECMAScript Language Specification
	// ===========================================================================

	var ls = Intl.__localeSensitiveProtos = {
	    Number: {},
	    Date:   {}
	};

	/**
	 * When the toLocaleString method is called with optional arguments locales and options,
	 * the following steps are taken:
	 */
	/* 13.2.1 */ls.Number.toLocaleString = function () {
	    // Satisfy test 13.2.1_1
	    if (Object.prototype.toString.call(this) !== '[object Number]')
	        throw new TypeError('`this` value must be a number for Number.prototype.toLocaleString()');

	    // 1. Let x be this Number value (as defined in ES5, 15.7.4).
	    // 2. If locales is not provided, then let locales be undefined.
	    // 3. If options is not provided, then let options be undefined.
	    // 4. Let numberFormat be the result of creating a new object as if by the
	    //    expression new Intl.NumberFormat(locales, options) where
	    //    Intl.NumberFormat is the standard built-in constructor defined in 11.1.3.
	    // 5. Return the result of calling the FormatNumber abstract operation
	    //    (defined in 11.3.2) with arguments numberFormat and x.
	    return FormatNumber(new NumberFormatConstructor(arguments[0], arguments[1]), this);
	};

	/**
	 * When the toLocaleString method is called with optional arguments locales and options,
	 * the following steps are taken:
	 */
	/* 13.3.1 */ls.Date.toLocaleString = function () {
	    // Satisfy test 13.3.0_1
	    if (Object.prototype.toString.call(this) !== '[object Date]')
	        throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleString()');

	    var
	    // 1. Let x be this time value (as defined in ES5, 15.9.5).
	        x = +this;

	    // 2. If x is NaN, then return "Invalid Date".
	    if (isNaN(x))
	        return 'Invalid Date';

	    var
	    // 3. If locales is not provided, then let locales be undefined.
	        locales = arguments[0],

	    // 4. If options is not provided, then let options be undefined.
	        options = arguments[1],

	    // 5. Let options be the result of calling the ToDateTimeOptions abstract
	    //    operation (defined in 12.1.1) with arguments options, "any", and "all".
	        options = ToDateTimeOptions(options, 'any', 'all'),

	    // 6. Let dateTimeFormat be the result of creating a new object as if by the
	    //    expression new Intl.DateTimeFormat(locales, options) where
	    //    Intl.DateTimeFormat is the standard built-in constructor defined in 12.1.3.
	        dateTimeFormat = new DateTimeFormatConstructor(locales, options);

	    // 7. Return the result of calling the FormatDateTime abstract operation (defined
	    //    in 12.3.2) with arguments dateTimeFormat and x.
	    return FormatDateTime(dateTimeFormat, x);
	};

	/**
	 * When the toLocaleDateString method is called with optional arguments locales and
	 * options, the following steps are taken:
	 */
	/* 13.3.2 */ls.Date.toLocaleDateString = function () {
	    // Satisfy test 13.3.0_1
	    if (Object.prototype.toString.call(this) !== '[object Date]')
	        throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleDateString()');

	    var
	    // 1. Let x be this time value (as defined in ES5, 15.9.5).
	        x = +this;

	    // 2. If x is NaN, then return "Invalid Date".
	    if (isNaN(x))
	        return 'Invalid Date';

	    var
	    // 3. If locales is not provided, then let locales be undefined.
	        locales = arguments[0],

	    // 4. If options is not provided, then let options be undefined.
	        options = arguments[1],

	    // 5. Let options be the result of calling the ToDateTimeOptions abstract
	    //    operation (defined in 12.1.1) with arguments options, "date", and "date".
	        options = ToDateTimeOptions(options, 'date', 'date'),

	    // 6. Let dateTimeFormat be the result of creating a new object as if by the
	    //    expression new Intl.DateTimeFormat(locales, options) where
	    //    Intl.DateTimeFormat is the standard built-in constructor defined in 12.1.3.
	        dateTimeFormat = new DateTimeFormatConstructor(locales, options);

	    // 7. Return the result of calling the FormatDateTime abstract operation (defined
	    //    in 12.3.2) with arguments dateTimeFormat and x.
	    return FormatDateTime(dateTimeFormat, x);
	};

	/**
	 * When the toLocaleTimeString method is called with optional arguments locales and
	 * options, the following steps are taken:
	 */
	/* 13.3.3 */ls.Date.toLocaleTimeString = function () {
	    // Satisfy test 13.3.0_1
	    if (Object.prototype.toString.call(this) !== '[object Date]')
	        throw new TypeError('`this` value must be a Date instance for Date.prototype.toLocaleTimeString()');

	    var
	    // 1. Let x be this time value (as defined in ES5, 15.9.5).
	        x = +this;

	    // 2. If x is NaN, then return "Invalid Date".
	    if (isNaN(x))
	        return 'Invalid Date';

	    var
	    // 3. If locales is not provided, then let locales be undefined.
	        locales = arguments[0],

	    // 4. If options is not provided, then let options be undefined.
	        options = arguments[1],

	    // 5. Let options be the result of calling the ToDateTimeOptions abstract
	    //    operation (defined in 12.1.1) with arguments options, "time", and "time".
	        options = ToDateTimeOptions(options, 'time', 'time'),

	    // 6. Let dateTimeFormat be the result of creating a new object as if by the
	    //    expression new Intl.DateTimeFormat(locales, options) where
	    //    Intl.DateTimeFormat is the standard built-in constructor defined in 12.1.3.
	        dateTimeFormat = new DateTimeFormatConstructor(locales, options);

	    // 7. Return the result of calling the FormatDateTime abstract operation (defined
	    //    in 12.3.2) with arguments dateTimeFormat and x.
	    return FormatDateTime(dateTimeFormat, x);
	};

	defineProperty(Intl, '__applyLocaleSensitivePrototypes', {
	    writable: true,
	    configurable: true,
	    value: function () {
	        defineProperty(Number.prototype, 'toLocaleString', { writable: true, configurable: true, value: ls.Number.toLocaleString });

	        for (var k in ls.Date) {
	            if (hop.call(ls.Date, k))
	                defineProperty(Date.prototype, k, { writable: true, configurable: true, value: ls.Date[k] });
	        }
	    }
	});

	/**
	 * Can't really ship a single script with data for hundreds of locales, so we provide
	 * this __addLocaleData method as a means for the developer to add the data on an
	 * as-needed basis
	 */
	defineProperty(Intl, '__addLocaleData', {
	    value: function (data) {
	        if (!IsStructurallyValidLanguageTag(data.locale))
	            throw new Error("Object passed doesn't identify itself with a valid language tag");

	        addLocaleData(data, data.locale);
	    }
	});

	function addLocaleData (data, tag) {
	    // Both NumberFormat and DateTimeFormat require number data, so throw if it isn't present
	    if (!data.number)
	        throw new Error("Object passed doesn't contain locale data for Intl.NumberFormat");

	    var locale,
	        locales = [ tag ],
	        parts   = tag.split('-');

	    // Create fallbacks for locale data with scripts, e.g. Latn, Hans, Vaii, etc
	    if (parts.length > 2 && parts[1].length == 4)
	        arrPush.call(locales, parts[0] + '-' + parts[2]);

	    while (locale = arrShift.call(locales)) {
	        // Add to NumberFormat internal properties as per 11.2.3
	        arrPush.call(internals.NumberFormat['[[availableLocales]]'], locale);
	        internals.NumberFormat['[[localeData]]'][locale] = data.number;

	        // ...and DateTimeFormat internal properties as per 12.2.3
	        if (data.date) {
	            data.date.nu = data.number.nu;
	            arrPush.call(internals.DateTimeFormat['[[availableLocales]]'], locale);
	            internals.DateTimeFormat['[[localeData]]'][locale] = data.date;
	        }
	    }

	    // If this is the first set of locale data added, make it the default
	    if (defaultLocale === undefined)
	        defaultLocale = tag;

	    // 11.3 (the NumberFormat prototype object is an Intl.NumberFormat instance)
	    if (!numberFormatProtoInitialised) {
	        InitializeNumberFormat(Intl.NumberFormat.prototype);
	        numberFormatProtoInitialised = true;
	    }

	    // 11.3 (the NumberFormat prototype object is an Intl.NumberFormat instance)
	    if (data.date && !dateTimeFormatProtoInitialised) {
	        InitializeDateTimeFormat(Intl.DateTimeFormat.prototype);
	        dateTimeFormatProtoInitialised = true;
	    }
	}

	// Helper functions
	// ================

	/**
	 * A function to deal with the inaccuracy of calculating log10 in pre-ES6
	 * JavaScript environments. Math.log(num) / Math.LN10 was responsible for
	 * causing issue #62.
	 */
	function log10Floor (n) {
	    // ES6 provides the more accurate Math.log10
	    if (typeof Math.log10 === 'function')
	        return Math.floor(Math.log10(n));

	    var x = Math.round(Math.log(n) * Math.LOG10E);
	    return x - (Number('1e' + x) > n);
	}

	/**
	 * A merge of the Intl.{Constructor}.supportedLocalesOf functions
	 * To make life easier, the function should be bound to the constructor's internal
	 * properties object.
	 */
	function supportedLocalesOf(locales) {
	    /*jshint validthis:true */

	    // Bound functions only have the `this` value altered if being used as a constructor,
	    // this lets us imitate a native function that has no constructor
	    if (!hop.call(this, '[[availableLocales]]'))
	        throw new TypeError('supportedLocalesOf() is not a constructor');

	    var
	    // Create an object whose props can be used to restore the values of RegExp props
	        regexpState = createRegExpRestore(),

	    // 1. If options is not provided, then let options be undefined.
	        options = arguments[1],

	    // 2. Let availableLocales be the value of the [[availableLocales]] internal
	    //    property of the standard built-in object that is the initial value of
	    //    Intl.NumberFormat.

	        availableLocales = this['[[availableLocales]]'],

	    // 3. Let requestedLocales be the result of calling the CanonicalizeLocaleList
	    //    abstract operation (defined in 9.2.1) with argument locales.
	        requestedLocales = CanonicalizeLocaleList(locales);

	    // Restore the RegExp properties
	    regexpState.exp.test(regexpState.input);

	    // 4. Return the result of calling the SupportedLocales abstract operation
	    //    (defined in 9.2.8) with arguments availableLocales, requestedLocales,
	    //    and options.
	    return SupportedLocales(availableLocales, requestedLocales, options);
	}

	/**
	 * Returns a string for a date component, resolved using multiple inheritance as specified
	 * as specified in the Unicode Technical Standard 35.
	 */
	function resolveDateString(data, ca, component, width, key) {
	    // From http://www.unicode.org/reports/tr35/tr35.html#Multiple_Inheritance:
	    // 'In clearly specified instances, resources may inherit from within the same locale.
	    //  For example, ... the Buddhist calendar inherits from the Gregorian calendar.'
	    var obj = data[ca] && data[ca][component]
	                ? data[ca][component]
	                : data.gregory[component],

	        // "sideways" inheritance resolves strings when a key doesn't exist
	        alts = {
	            narrow: ['short', 'long'],
	            short:  ['long', 'narrow'],
	            long:   ['short', 'narrow']
	        },

	        //
	        resolved = hop.call(obj, width)
	                  ? obj[width]
	                  : hop.call(obj, alts[width][0])
	                      ? obj[alts[width][0]]
	                      : obj[alts[width][1]];

	    // `key` wouldn't be specified for components 'dayPeriods'
	    return key != null ? resolved[key] : resolved;
	}

	/**
	 * A map that doesn't contain Object in its prototype chain
	 */
	Record.prototype = objCreate(null);
	function Record (obj) {
	    // Copy only own properties over unless this object is already a Record instance
	    for (var k in obj) {
	        if (obj instanceof Record || hop.call(obj, k))
	            defineProperty(this, k, { value: obj[k], enumerable: true, writable: true, configurable: true });
	    }
	}

	/**
	 * An ordered list
	 */
	List.prototype = objCreate(null);
	function List() {
	    defineProperty(this, 'length', { writable:true, value: 0 });

	    if (arguments.length)
	        arrPush.apply(this, arrSlice.call(arguments));
	}

	/**
	 * Constructs a regular expression to restore tainted RegExp properties
	 */
	function createRegExpRestore () {
	    var esc = /[.?*+^$[\]\\(){}|-]/g,
	        lm  = RegExp.lastMatch || '',
	        ml  = RegExp.multiline ? 'm' : '',
	        ret = { input: RegExp.input },
	        reg = new List(),
	        has = false,
	        cap = {};

	    // Create a snapshot of all the 'captured' properties
	    for (var i = 1; i <= 9; i++)
	        has = (cap['$'+i] = RegExp['$'+i]) || has;

	    // Now we've snapshotted some properties, escape the lastMatch string
	    lm = lm.replace(esc, '\\$&');

	    // If any of the captured strings were non-empty, iterate over them all
	    if (has) {
	        for (var i = 1; i <= 9; i++) {
	            var m = cap['$'+i];

	            // If it's empty, add an empty capturing group
	            if (!m)
	                lm = '()' + lm;

	            // Else find the string in lm and escape & wrap it to capture it
	            else {
	                m = m.replace(esc, '\\$&');
	                lm = lm.replace(m, '(' + m + ')');
	            }

	            // Push it to the reg and chop lm to make sure further groups come after
	            arrPush.call(reg, lm.slice(0, lm.indexOf('(') + 1));
	            lm = lm.slice(lm.indexOf('(') + 1);
	        }
	    }

	    // Create the regular expression that will reconstruct the RegExp properties
	    ret.exp = new RegExp(arrJoin.call(reg, '') + lm, ml);

	    return ret;
	}

	/**
	 * Convert only a-z to uppercase as per section 6.1 of the spec
	 */
	function toLatinUpperCase (str) {
	    var i = str.length;

	    while (i--) {
	        var ch = str.charAt(i);

	        if (ch >= "a" && ch <= "z")
	            str = str.slice(0, i) + ch.toUpperCase() + str.slice(i+1);
	    }

	    return str;
	}

	/**
	 * Mimics ES5's abstract ToObject() function
	 */
	function toObject (arg) {
	    if (arg == null)
	        throw new TypeError('Cannot convert null or undefined to object');

	    return Object(arg);
	}

	/**
	 * Returns "internal" properties for an object
	 */
	function getInternalProperties (obj) {
	    if (hop.call(obj, '__getInternalProperties'))
	        return obj.__getInternalProperties(secret);
	    else
	        return objCreate(null);
	}

	var src$core$$default = Intl;

	//# sourceMappingURL=core.js.map

/***/ },
/* 46 */
/***/ function(module, exports) {

	"use strict";

	Object.seal(Object.defineProperties(exports, {
	        expBCP47Syntax: {
	                get: function() {
	                        return expBCP47Syntax;
	                },

	                enumerable: true
	        },

	        expVariantDupes: {
	                get: function() {
	                        return expVariantDupes;
	                },

	                enumerable: true
	        },

	        expSingletonDupes: {
	                get: function() {
	                        return expSingletonDupes;
	                },

	                enumerable: true
	        },

	        expExtSequences: {
	                get: function() {
	                        return expExtSequences;
	                },

	                enumerable: true
	        }
	}));

	var
	    // extlang       = 3ALPHA              ; selected ISO 639 codes
	    //                 *2("-" 3ALPHA)      ; permanently reserved
	    extlang = '[a-z]{3}(?:-[a-z]{3}){0,2}',

	    // language      = 2*3ALPHA            ; shortest ISO 639 code
	    //                 ["-" extlang]       ; sometimes followed by
	    //                                     ; extended language subtags
	    //               / 4ALPHA              ; or reserved for future use
	    //               / 5*8ALPHA            ; or registered language subtag
	    language = '(?:[a-z]{2,3}(?:-' + extlang + ')?|[a-z]{4}|[a-z]{5,8})',

	    // script        = 4ALPHA              ; ISO 15924 code
	    script = '[a-z]{4}',

	    // region        = 2ALPHA              ; ISO 3166-1 code
	    //               / 3DIGIT              ; UN M.49 code
	    region = '(?:[a-z]{2}|\\d{3})',

	    // variant       = 5*8alphanum         ; registered variants
	    //               / (DIGIT 3alphanum)
	    variant = '(?:[a-z0-9]{5,8}|\\d[a-z0-9]{3})',

	    //                                     ; Single alphanumerics
	    //                                     ; "x" reserved for private use
	    // singleton     = DIGIT               ; 0 - 9
	    //               / %x41-57             ; A - W
	    //               / %x59-5A             ; Y - Z
	    //               / %x61-77             ; a - w
	    //               / %x79-7A             ; y - z
	    singleton = '[0-9a-wy-z]',

	    // extension     = singleton 1*("-" (2*8alphanum))
	    extension = singleton + '(?:-[a-z0-9]{2,8})+',

	    // privateuse    = "x" 1*("-" (1*8alphanum))
	    privateuse = 'x(?:-[a-z0-9]{1,8})+',

	    // irregular     = "en-GB-oed"         ; irregular tags do not match
	    //               / "i-ami"             ; the 'langtag' production and
	    //               / "i-bnn"             ; would not otherwise be
	    //               / "i-default"         ; considered 'well-formed'
	    //               / "i-enochian"        ; These tags are all valid,
	    //               / "i-hak"             ; but most are deprecated
	    //               / "i-klingon"         ; in favor of more modern
	    //               / "i-lux"             ; subtags or subtag
	    //               / "i-mingo"           ; combination
	    //               / "i-navajo"
	    //               / "i-pwn"
	    //               / "i-tao"
	    //               / "i-tay"
	    //               / "i-tsu"
	    //               / "sgn-BE-FR"
	    //               / "sgn-BE-NL"
	    //               / "sgn-CH-DE"
	    irregular = '(?:en-GB-oed'
	              + '|i-(?:ami|bnn|default|enochian|hak|klingon|lux|mingo|navajo|pwn|tao|tay|tsu)'
	              + '|sgn-(?:BE-FR|BE-NL|CH-DE))',

	    // regular       = "art-lojban"        ; these tags match the 'langtag'
	    //               / "cel-gaulish"       ; production, but their subtags
	    //               / "no-bok"            ; are not extended language
	    //               / "no-nyn"            ; or variant subtags: their meaning
	    //               / "zh-guoyu"          ; is defined by their registration
	    //               / "zh-hakka"          ; and all of these are deprecated
	    //               / "zh-min"            ; in favor of a more modern
	    //               / "zh-min-nan"        ; subtag or sequence of subtags
	    //               / "zh-xiang"
	    regular = '(?:art-lojban|cel-gaulish|no-bok|no-nyn'
	            + '|zh-(?:guoyu|hakka|min|min-nan|xiang))',

	    // grandfathered = irregular           ; non-redundant tags registered
	    //               / regular             ; during the RFC 3066 era
	    grandfathered = '(?:' + irregular + '|' + regular + ')',

	    // langtag       = language
	    //                 ["-" script]
	    //                 ["-" region]
	    //                 *("-" variant)
	    //                 *("-" extension)
	    //                 ["-" privateuse]
	    langtag = language + '(?:-' + script + ')?(?:-' + region + ')?(?:-'
	            + variant + ')*(?:-' + extension + ')*(?:-' + privateuse + ')?';

	var expBCP47Syntax = RegExp('^(?:'+langtag+'|'+privateuse+'|'+grandfathered+')$', 'i');

	var expVariantDupes = RegExp('^(?!x).*?-('+variant+')-(?:\\w{4,8}-(?!x-))*\\1\\b', 'i');

	var expSingletonDupes = RegExp('^(?!x).*?-('+singleton+')-(?:\\w+-(?!x-))*\\1\\b', 'i');

	var expExtSequences = RegExp('-'+extension, 'ig');

	//# sourceMappingURL=exp.js.map

/***/ },
/* 47 */
/***/ function(module, exports) {

	"use strict";

	Object.seal(Object.defineProperties(exports, {
	    createDateTimeFormat: {
	        get: function() {
	            return createDateTimeFormat;
	        },

	        enumerable: true
	    },

	    createDateTimeFormats: {
	        get: function() {
	            return createDateTimeFormats;
	        },

	        enumerable: true
	    }
	}));

	var expDTComponents = /(?:[Eec]{1,6}|G{1,5}|(?:[yYu]+|U{1,5})|[ML]{1,5}|d{1,2}|a|[hkHK]{1,2}|m{1,2}|s{1,2}|z{1,4})(?=([^']*'[^']*')*[^']*$)/g;

	// Skip over patterns with these datetime components
	var unwantedDTCs = /[QxXVOvZASjgFDwWIQqH]/;

	// Maps the number of characters in a CLDR pattern to the specification
	var dtcLengthMap = {
	        month:   [ 'numeric', '2-digit', 'short', 'long', 'narrow' ],
	        weekday: [ 'short', 'short', 'short', 'long', 'narrow' ],
	        era:     [ 'short', 'short', 'short', 'long', 'narrow' ]
	    };

	var dtKeys = ["weekday", "era", "year", "month", "day"];
	var tmKeys = ["hour", "minute", "second", "timeZoneName"];

	function isDateFormatOnly(obj) {
	    for (var i = 0; i < tmKeys.length; i += 1) {
	        if (obj.hasOwnProperty(tmKeys[i])) {
	            return false;
	        }
	    }
	    return true;
	}

	function isTimeFormatOnly(obj) {
	    for (var i = 0; i < dtKeys.length; i += 1) {
	        if (obj.hasOwnProperty(dtKeys[i])) {
	            return false;
	        }
	    }
	    return true;
	}

	function createDateTimeFormat(format) {
	    if (unwantedDTCs.test(format))
	        return undefined;

	    var formatObj = {};

	    // Replace the pattern string with the one required by the specification, whilst
	    // at the same time evaluating it for the subsets and formats
	    formatObj.pattern = format.replace(expDTComponents, function ($0) {
	        // See which symbol we're dealing with
	        switch ($0.charAt(0)) {
	            case 'E':
	            case 'e':
	            case 'c':
	                formatObj.weekday = dtcLengthMap.weekday[$0.length-1];
	                return '{weekday}';

	            // Not supported yet
	            case 'G':
	                formatObj.era = dtcLengthMap.era[$0.length-1];
	                return '{era}';

	            case 'y':
	            case 'Y':
	            case 'u':
	            case 'U':
	                formatObj.year = $0.length === 2 ? '2-digit' : 'numeric';
	                return '{year}';

	            case 'M':
	            case 'L':
	                formatObj.month = dtcLengthMap.month[$0.length-1];
	                return '{month}';

	            case 'd':
	                formatObj.day = $0.length === 2 ? '2-digit' : 'numeric';
	                return '{day}';

	            case 'a':
	                return '{ampm}';

	            case 'h':
	            case 'H':
	            case 'k':
	            case 'K':
	                formatObj.hour = $0.length === 2 ? '2-digit' : 'numeric';
	                return '{hour}';

	            case 'm':
	                formatObj.minute = $0.length === 2 ? '2-digit' : 'numeric';
	                return '{minute}';

	            case 's':
	                formatObj.second = $0.length === 2 ? '2-digit' : 'numeric';
	                return '{second}';

	            case 'z':
	                formatObj.timeZoneName = $0.length < 4 ? 'short' : 'long';
	                return '{timeZoneName}';
	        }
	    });

	    // From http://www.unicode.org/reports/tr35/tr35-dates.html#Date_Format_Patterns:
	    //  'In patterns, two single quotes represents a literal single quote, either
	    //   inside or outside single quotes. Text within single quotes is not
	    //   interpreted in any way (except for two adjacent single quotes).'
	    formatObj.pattern = formatObj.pattern.replace(/'([^']*)'/g, function ($0, literal) {
	        return literal ? literal : "'";
	    });

	    if (formatObj.pattern.indexOf('{ampm}') > -1) {
	        formatObj.hour12 = true;
	        formatObj.pattern12 = formatObj.pattern;
	        formatObj.pattern = formatObj.pattern.replace('{ampm}', '').trim();
	    }

	    return formatObj;
	}

	function createDateTimeFormats(formats) {
	    var availableFormats = formats.availableFormats;
	    var timeFormats = formats.timeFormats;
	    var dateFormats = formats.dateFormats;
	    var order = formats.medium;
	    var result = [];
	    var key, format, computed, i, j;
	    var timeRelatedFormats = [];
	    var dateRelatedFormats = [];

	    function expandFormat(key, pattern) {
	        // Expand component lengths if necessary, as allowed in the LDML spec
	        // Get the lengths of 'M' and 'E' substrings in the date pattern
	        // as arrays that can be joined to create a new substring
	        var M = new Array((key.match(/M/g)||[]).length + 1);
	        var E = new Array((key.match(/E/g)||[]).length + 1);

	        // note from caridy: I'm not sure we really need this, seems to be
	        //                   useless since it relies on the keys from CLDR
	        //                   instead of the actual format pattern, but I'm not sure.
	        if (M.length > 2)
	            pattern = pattern.replace(/(M|L)+/, M.join('$1'));

	        if (E.length > 2)
	            pattern = pattern.replace(/([Eec])+/, E.join('$1'));

	        return pattern;
	    }

	    // Map available (custom) formats into a pattern for createDateTimeFormats
	    for (key in availableFormats) {
	        if (availableFormats.hasOwnProperty(key)) {
	            format = expandFormat(key, availableFormats[key]);
	            computed = createDateTimeFormat(format);
	            if (computed) {
	                result.push(computed);
	                // in some cases, the format is only displaying date specific props
	                // or time specific props, in which case we need to also produce the
	                // combined formats.
	                if (isDateFormatOnly(computed)) {
	                    dateRelatedFormats.push(format);
	                } else if (isTimeFormatOnly(computed)) {
	                    timeRelatedFormats.push(format);
	                }
	            }
	        }
	    }

	    // combine custom time and custom date formats when they are orthogonals to complete the
	    // formats supported by browsers by relying on the value of "formats.medium" which defines
	    // how to join custom formats into a single pattern.
	    for (i = 0; i < timeRelatedFormats.length; i += 1) {
	        for (j = 0; j < dateRelatedFormats.length; j += 1) {
	            format = order
	                .replace('{0}', timeRelatedFormats[i])
	                .replace('{1}', dateRelatedFormats[j])
	                .replace(/^[,\s]+|[,\s]+$/gi, '');
	            computed = createDateTimeFormat(format);
	            if (computed) {
	                result.push(computed);
	            }
	        }
	    }

	    // Map time formats into a pattern for createDateTimeFormats
	    for (key in timeFormats) {
	        if (timeFormats.hasOwnProperty(key)) {
	            format = expandFormat(key, timeFormats[key]);
	            computed = createDateTimeFormat(format);
	            if (computed) {
	                result.push(computed);
	            }
	        }
	    }

	    // Map date formats into a pattern for createDateTimeFormats
	    for (key in dateFormats) {
	        if (dateFormats.hasOwnProperty(key)) {
	            format = expandFormat(key, dateFormats[key]);
	            computed = createDateTimeFormat(format);
	            if (computed) {
	                result.push(computed);
	            }
	        }
	    }

	    return result;
	}

	//# sourceMappingURL=cldr.js.map

/***/ },
/* 48 */
/***/ function(module, exports) {

	(function(addLocaleData){
	addLocaleData(b[5][1]);
	addLocaleData(b[5][2]);
	addLocaleData(b[5][3]);
	addLocaleData(b[5][4]);
	addLocaleData(b[5][5]);
	addLocaleData(b[5][6]);
	addLocaleData(b[5][7]);
	addLocaleData(b[5][8]);
	addLocaleData(b[5][9]);
	addLocaleData(b[5][10]);
	addLocaleData(b[5][11]);
	addLocaleData(b[5][12]);
	addLocaleData(b[5][13]);
	addLocaleData(b[5][14]);
	addLocaleData(b[5][15]);
	addLocaleData(b[5][16]);
	addLocaleData(b[5][17]);
	addLocaleData(b[5][18]);
	addLocaleData(b[5][19]);
	addLocaleData(b[5][20]);
	addLocaleData(b[5][21]);
	addLocaleData(b[5][22]);
	addLocaleData(b[5][23]);
	addLocaleData(b[5][24]);
	addLocaleData(b[5][25]);
	addLocaleData(b[5][26]);
	addLocaleData(b[5][27]);
	addLocaleData(b[5][28]);
	addLocaleData(b[5][29]);
	addLocaleData(b[5][30]);
	addLocaleData(b[5][31]);
	addLocaleData(b[5][32]);
	addLocaleData(b[5][33]);
	addLocaleData(b[5][34]);
	addLocaleData(b[5][35]);
	addLocaleData(b[5][36]);
	addLocaleData(b[5][37]);
	addLocaleData(b[5][38]);
	addLocaleData(b[5][39]);
	addLocaleData(b[5][40]);
	addLocaleData(b[5][41]);
	addLocaleData(b[5][42]);
	addLocaleData(b[5][43]);
	addLocaleData(b[5][44]);
	addLocaleData(b[5][45]);
	addLocaleData(b[5][46]);
	addLocaleData(b[5][47]);
	addLocaleData(b[5][48]);
	addLocaleData(b[5][49]);
	addLocaleData(b[5][50]);
	addLocaleData(b[5][51]);
	addLocaleData(b[5][52]);
	addLocaleData(b[5][53]);
	addLocaleData(b[5][54]);
	addLocaleData(b[5][55]);
	addLocaleData(b[5][56]);
	addLocaleData(b[5][57]);
	addLocaleData(b[5][58]);
	addLocaleData(b[5][59]);
	addLocaleData(b[5][60]);
	addLocaleData(b[5][61]);
	addLocaleData(b[5][62]);
	addLocaleData(b[5][63]);
	addLocaleData(b[5][64]);
	addLocaleData(b[5][65]);
	addLocaleData(b[5][66]);
	addLocaleData(b[5][67]);
	addLocaleData(b[5][68]);
	addLocaleData(b[5][69]);
	addLocaleData(b[5][70]);
	addLocaleData(b[5][71]);
	addLocaleData(b[5][72]);
	addLocaleData(b[5][73]);
	addLocaleData(b[5][74]);
	addLocaleData(b[5][75]);
	addLocaleData(b[5][76]);
	addLocaleData(b[5][77]);
	addLocaleData(b[5][78]);
	addLocaleData(b[5][79]);
	addLocaleData(b[5][80]);
	addLocaleData(b[5][81]);
	addLocaleData(b[5][82]);
	addLocaleData(b[5][83]);
	addLocaleData(b[5][84]);
	addLocaleData(b[5][85]);
	addLocaleData(b[5][86]);
	addLocaleData(b[5][87]);
	addLocaleData(b[5][88]);
	addLocaleData(b[5][89]);
	addLocaleData(b[5][90]);
	addLocaleData(b[5][91]);
	addLocaleData(b[5][92]);
	addLocaleData(b[5][93]);
	addLocaleData(b[5][94]);
	addLocaleData(b[5][95]);
	addLocaleData(b[5][96]);
	addLocaleData(b[5][97]);
	addLocaleData(b[5][98]);
	addLocaleData(b[5][99]);
	addLocaleData(b[5][100]);
	addLocaleData(b[5][101]);
	addLocaleData(b[5][102]);
	addLocaleData(b[5][103]);
	addLocaleData(b[5][104]);
	addLocaleData(b[5][105]);
	addLocaleData(b[5][106]);
	addLocaleData(b[5][107]);
	addLocaleData(b[5][108]);
	addLocaleData(b[5][109]);
	addLocaleData(b[5][110]);
	addLocaleData(b[5][111]);
	addLocaleData(b[5][112]);
	addLocaleData(b[5][113]);
	addLocaleData(b[5][114]);
	addLocaleData(b[5][115]);
	addLocaleData(b[5][116]);
	addLocaleData(b[5][117]);
	addLocaleData(b[5][118]);
	addLocaleData(b[5][119]);
	addLocaleData(b[5][120]);
	addLocaleData(b[5][121]);
	addLocaleData(b[5][122]);
	addLocaleData(b[5][123]);
	addLocaleData(b[5][124]);
	addLocaleData(b[5][125]);
	addLocaleData(b[5][126]);
	addLocaleData(b[5][127]);
	addLocaleData(b[5][128]);
	addLocaleData(b[5][129]);
	addLocaleData(b[5][130]);
	addLocaleData(b[5][131]);
	addLocaleData(b[5][132]);
	addLocaleData(b[5][133]);
	addLocaleData(b[5][134]);
	addLocaleData(b[5][135]);
	addLocaleData(b[5][136]);
	addLocaleData(b[5][137]);
	addLocaleData(b[5][138]);
	addLocaleData(b[5][139]);
	addLocaleData(b[5][140]);
	addLocaleData(b[5][141]);
	addLocaleData(b[5][142]);
	addLocaleData(b[5][143]);
	addLocaleData(b[5][144]);
	addLocaleData(b[5][145]);
	addLocaleData(b[5][146]);
	addLocaleData(b[5][147]);
	addLocaleData(b[5][148]);
	addLocaleData(b[5][149]);
	addLocaleData(b[5][150]);
	addLocaleData(b[5][151]);
	addLocaleData(b[5][152]);
	addLocaleData(b[5][153]);
	addLocaleData(b[5][154]);
	addLocaleData(b[5][155]);
	addLocaleData(b[5][156]);
	addLocaleData(b[5][157]);
	addLocaleData(b[5][158]);
	addLocaleData(b[5][159]);
	addLocaleData(b[5][160]);
	addLocaleData(b[5][161]);
	addLocaleData(b[5][162]);
	addLocaleData(b[5][163]);
	addLocaleData(b[5][164]);
	addLocaleData(b[5][165]);
	addLocaleData(b[5][166]);
	addLocaleData(b[5][167]);
	addLocaleData(b[5][168]);
	addLocaleData(b[5][169]);
	addLocaleData(b[5][170]);
	addLocaleData(b[5][171]);
	addLocaleData(b[5][172]);
	addLocaleData(b[5][173]);
	addLocaleData(b[5][174]);
	addLocaleData(b[5][175]);
	addLocaleData(b[5][176]);
	addLocaleData(b[5][177]);
	addLocaleData(b[5][178]);
	addLocaleData(b[5][179]);
	addLocaleData(b[5][180]);
	addLocaleData(b[5][181]);
	addLocaleData(b[5][182]);
	addLocaleData(b[5][183]);
	addLocaleData(b[5][184]);
	addLocaleData(b[5][185]);
	addLocaleData(b[5][186]);
	addLocaleData(b[5][187]);
	addLocaleData(b[5][188]);
	addLocaleData(b[5][189]);
	addLocaleData(b[5][190]);
	addLocaleData(b[5][191]);
	addLocaleData(b[5][192]);
	addLocaleData(b[5][193]);
	addLocaleData(b[5][194]);
	addLocaleData(b[5][195]);
	addLocaleData(b[5][196]);
	addLocaleData(b[5][197]);
	addLocaleData(b[5][198]);
	addLocaleData(b[5][199]);
	addLocaleData(b[5][200]);
	addLocaleData(b[5][201]);
	addLocaleData(b[5][202]);
	addLocaleData(b[5][203]);
	addLocaleData(b[5][204]);
	addLocaleData(b[5][205]);
	addLocaleData(b[5][206]);
	addLocaleData(b[5][207]);
	addLocaleData(b[5][208]);
	addLocaleData(b[5][209]);
	addLocaleData(b[5][210]);
	addLocaleData(b[5][211]);
	addLocaleData(b[5][212]);
	addLocaleData(b[5][213]);
	addLocaleData(b[5][214]);
	addLocaleData(b[5][215]);
	addLocaleData(b[5][216]);
	addLocaleData(b[5][217]);
	addLocaleData(b[5][218]);
	addLocaleData(b[5][219]);
	addLocaleData(b[5][220]);
	addLocaleData(b[5][221]);
	addLocaleData(b[5][222]);
	addLocaleData(b[5][223]);
	addLocaleData(b[5][224]);
	addLocaleData(b[5][225]);
	addLocaleData(b[5][226]);
	addLocaleData(b[5][227]);
	addLocaleData(b[5][228]);
	addLocaleData(b[5][229]);
	addLocaleData(b[5][230]);
	addLocaleData(b[5][231]);
	addLocaleData(b[5][232]);
	addLocaleData(b[5][233]);
	addLocaleData(b[5][234]);
	addLocaleData(b[5][235]);
	addLocaleData(b[5][236]);
	addLocaleData(b[5][237]);
	addLocaleData(b[5][238]);
	addLocaleData(b[5][239]);
	addLocaleData(b[5][240]);
	addLocaleData(b[5][241]);
	addLocaleData(b[5][242]);
	addLocaleData(b[5][243]);
	addLocaleData(b[5][244]);
	addLocaleData(b[5][245]);
	addLocaleData(b[5][246]);
	addLocaleData(b[5][247]);
	addLocaleData(b[5][248]);
	addLocaleData(b[5][249]);
	addLocaleData(b[5][250]);
	addLocaleData(b[5][251]);
	addLocaleData(b[5][252]);
	addLocaleData(b[5][253]);
	addLocaleData(b[5][254]);
	addLocaleData(b[5][255]);
	addLocaleData(b[5][256]);
	addLocaleData(b[5][257]);
	addLocaleData(b[5][258]);
	addLocaleData(b[5][259]);
	addLocaleData(b[5][260]);
	addLocaleData(b[5][261]);
	addLocaleData(b[5][262]);
	addLocaleData(b[5][263]);
	addLocaleData(b[5][264]);
	addLocaleData(b[5][265]);
	addLocaleData(b[5][266]);
	addLocaleData(b[5][267]);
	addLocaleData(b[5][268]);
	addLocaleData(b[5][269]);
	addLocaleData(b[5][270]);
	addLocaleData(b[5][271]);
	addLocaleData(b[5][272]);
	addLocaleData(b[5][273]);
	addLocaleData(b[5][274]);
	addLocaleData(b[5][275]);
	addLocaleData(b[5][276]);
	addLocaleData(b[5][277]);
	addLocaleData(b[5][278]);
	addLocaleData(b[5][279]);
	addLocaleData(b[5][280]);
	addLocaleData(b[5][281]);
	addLocaleData(b[5][282]);
	addLocaleData(b[5][283]);
	addLocaleData(b[5][284]);
	addLocaleData(b[5][285]);
	addLocaleData(b[5][286]);
	addLocaleData(b[5][287]);
	addLocaleData(b[5][288]);
	addLocaleData(b[5][289]);
	addLocaleData(b[5][290]);
	addLocaleData(b[5][291]);
	addLocaleData(b[5][292]);
	addLocaleData(b[5][293]);
	addLocaleData(b[5][294]);
	addLocaleData(b[5][295]);
	addLocaleData(b[5][296]);
	addLocaleData(b[5][297]);
	addLocaleData(b[5][298]);
	addLocaleData(b[5][299]);
	addLocaleData(b[5][300]);
	addLocaleData(b[5][301]);
	addLocaleData(b[5][302]);
	addLocaleData(b[5][303]);
	addLocaleData(b[5][304]);
	addLocaleData(b[5][305]);
	addLocaleData(b[5][306]);
	addLocaleData(b[5][307]);
	addLocaleData(b[5][308]);
	addLocaleData(b[5][309]);
	addLocaleData(b[5][310]);
	addLocaleData(b[5][311]);
	addLocaleData(b[5][312]);
	addLocaleData(b[5][313]);
	addLocaleData(b[5][314]);
	addLocaleData(b[5][315]);
	addLocaleData(b[5][316]);
	addLocaleData(b[5][317]);
	addLocaleData(b[5][318]);
	addLocaleData(b[5][319]);
	addLocaleData(b[5][320]);
	addLocaleData(b[5][321]);
	addLocaleData(b[5][322]);
	addLocaleData(b[5][323]);
	addLocaleData(b[5][324]);
	addLocaleData(b[5][325]);
	addLocaleData(b[5][326]);
	addLocaleData(b[5][327]);
	addLocaleData(b[5][328]);
	addLocaleData(b[5][329]);
	addLocaleData(b[5][330]);
	addLocaleData(b[5][331]);
	addLocaleData(b[5][332]);
	addLocaleData(b[5][333]);
	addLocaleData(b[5][334]);
	addLocaleData(b[5][335]);
	addLocaleData(b[5][336]);
	addLocaleData(b[5][337]);
	addLocaleData(b[5][338]);
	addLocaleData(b[5][339]);
	addLocaleData(b[5][340]);
	addLocaleData(b[5][341]);
	addLocaleData(b[5][342]);
	addLocaleData(b[5][343]);
	addLocaleData(b[5][344]);
	addLocaleData(b[5][345]);
	addLocaleData(b[5][346]);
	addLocaleData(b[5][347]);
	addLocaleData(b[5][348]);
	addLocaleData(b[5][349]);
	addLocaleData(b[5][350]);
	addLocaleData(b[5][351]);
	addLocaleData(b[5][352]);
	addLocaleData(b[5][353]);
	addLocaleData(b[5][354]);
	addLocaleData(b[5][355]);
	addLocaleData(b[5][356]);
	addLocaleData(b[5][357]);
	addLocaleData(b[5][358]);
	addLocaleData(b[5][359]);
	addLocaleData(b[5][360]);
	addLocaleData(b[5][361]);
	addLocaleData(b[5][362]);
	addLocaleData(b[5][363]);
	addLocaleData(b[5][364]);
	addLocaleData(b[5][365]);
	addLocaleData(b[5][366]);
	addLocaleData(b[5][367]);
	addLocaleData(b[5][368]);
	addLocaleData(b[5][369]);
	addLocaleData(b[5][370]);
	addLocaleData(b[5][371]);
	addLocaleData(b[5][372]);
	addLocaleData(b[5][373]);
	addLocaleData(b[5][374]);
	addLocaleData(b[5][375]);
	addLocaleData(b[5][376]);
	addLocaleData(b[5][377]);
	addLocaleData(b[5][378]);
	addLocaleData(b[5][379]);
	addLocaleData(b[5][380]);
	addLocaleData(b[5][381]);
	addLocaleData(b[5][382]);
	addLocaleData(b[5][383]);
	addLocaleData(b[5][384]);
	addLocaleData(b[5][385]);
	addLocaleData(b[5][386]);
	addLocaleData(b[5][387]);
	addLocaleData(b[5][388]);
	addLocaleData(b[5][389]);
	addLocaleData(b[5][390]);
	addLocaleData(b[5][391]);
	addLocaleData(b[5][392]);
	addLocaleData(b[5][393]);
	addLocaleData(b[5][394]);
	addLocaleData(b[5][395]);
	addLocaleData(b[5][396]);
	addLocaleData(b[5][397]);
	addLocaleData(b[5][398]);
	addLocaleData(b[5][399]);
	addLocaleData(b[5][400]);
	addLocaleData(b[5][401]);
	addLocaleData(b[5][402]);
	addLocaleData(b[5][403]);
	addLocaleData(b[5][404]);
	addLocaleData(b[5][405]);
	addLocaleData(b[5][406]);
	addLocaleData(b[5][407]);
	addLocaleData(b[5][408]);
	addLocaleData(b[5][409]);
	addLocaleData(b[5][410]);
	addLocaleData(b[5][411]);
	addLocaleData(b[5][412]);
	addLocaleData(b[5][413]);
	addLocaleData(b[5][414]);
	addLocaleData(b[5][415]);
	addLocaleData(b[5][416]);
	addLocaleData(b[5][417]);
	addLocaleData(b[5][418]);
	addLocaleData(b[5][419]);
	addLocaleData(b[5][420]);
	addLocaleData(b[5][421]);
	addLocaleData(b[5][422]);
	addLocaleData(b[5][423]);
	addLocaleData(b[5][424]);
	addLocaleData(b[5][425]);
	addLocaleData(b[5][426]);
	addLocaleData(b[5][427]);
	addLocaleData(b[5][428]);
	addLocaleData(b[5][429]);
	addLocaleData(b[5][430]);
	addLocaleData(b[5][431]);
	addLocaleData(b[5][432]);
	addLocaleData(b[5][433]);
	addLocaleData(b[5][434]);
	addLocaleData(b[5][435]);
	addLocaleData(b[5][436]);
	addLocaleData(b[5][437]);
	addLocaleData(b[5][438]);
	addLocaleData(b[5][439]);
	addLocaleData(b[5][440]);
	addLocaleData(b[5][441]);
	addLocaleData(b[5][442]);
	addLocaleData(b[5][443]);
	addLocaleData(b[5][444]);
	addLocaleData(b[5][445]);
	addLocaleData(b[5][446]);
	addLocaleData(b[5][447]);
	addLocaleData(b[5][448]);
	addLocaleData(b[5][449]);
	addLocaleData(b[5][450]);
	addLocaleData(b[5][451]);
	addLocaleData(b[5][452]);
	addLocaleData(b[5][453]);
	addLocaleData(b[5][454]);
	addLocaleData(b[5][455]);
	addLocaleData(b[5][456]);
	addLocaleData(b[5][457]);
	addLocaleData(b[5][458]);
	addLocaleData(b[5][459]);
	addLocaleData(b[5][460]);
	addLocaleData(b[5][461]);
	addLocaleData(b[5][462]);
	addLocaleData(b[5][463]);
	addLocaleData(b[5][464]);
	addLocaleData(b[5][465]);
	addLocaleData(b[5][466]);
	addLocaleData(b[5][467]);
	addLocaleData(b[5][468]);
	addLocaleData(b[5][469]);
	addLocaleData(b[5][470]);
	addLocaleData(b[5][471]);
	addLocaleData(b[5][472]);
	addLocaleData(b[5][473]);
	addLocaleData(b[5][474]);
	addLocaleData(b[5][475]);
	addLocaleData(b[5][476]);
	addLocaleData(b[5][477]);
	addLocaleData(b[5][478]);
	addLocaleData(b[5][479]);
	addLocaleData(b[5][480]);
	addLocaleData(b[5][481]);
	addLocaleData(b[5][482]);
	addLocaleData(b[5][483]);
	addLocaleData(b[5][484]);
	addLocaleData(b[5][485]);
	addLocaleData(b[5][486]);
	addLocaleData(b[5][487]);
	addLocaleData(b[5][488]);
	addLocaleData(b[5][489]);
	addLocaleData(b[5][490]);
	addLocaleData(b[5][491]);
	addLocaleData(b[5][492]);
	addLocaleData(b[5][493]);
	addLocaleData(b[5][494]);
	addLocaleData(b[5][495]);
	addLocaleData(b[5][496]);
	addLocaleData(b[5][497]);
	addLocaleData(b[5][498]);
	addLocaleData(b[5][499]);
	addLocaleData(b[5][500]);
	addLocaleData(b[5][501]);
	addLocaleData(b[5][502]);
	addLocaleData(b[5][503]);
	addLocaleData(b[5][504]);
	addLocaleData(b[5][505]);
	addLocaleData(b[5][506]);
	addLocaleData(b[5][507]);
	addLocaleData(b[5][508]);
	addLocaleData(b[5][509]);
	addLocaleData(b[5][510]);
	addLocaleData(b[5][511]);
	addLocaleData(b[5][512]);
	addLocaleData(b[5][513]);
	addLocaleData(b[5][514]);
	addLocaleData(b[5][515]);
	addLocaleData(b[5][516]);
	addLocaleData(b[5][517]);
	addLocaleData(b[5][518]);
	addLocaleData(b[5][519]);
	addLocaleData(b[5][520]);
	addLocaleData(b[5][521]);
	addLocaleData(b[5][522]);
	addLocaleData(b[5][523]);
	addLocaleData(b[5][524]);
	addLocaleData(b[5][525]);
	addLocaleData(b[5][526]);
	addLocaleData(b[5][527]);
	addLocaleData(b[5][528]);
	addLocaleData(b[5][529]);
	addLocaleData(b[5][530]);
	addLocaleData(b[5][531]);
	addLocaleData(b[5][532]);
	addLocaleData(b[5][533]);
	addLocaleData(b[5][534]);
	addLocaleData(b[5][535]);
	addLocaleData(b[5][536]);
	addLocaleData(b[5][537]);
	addLocaleData(b[5][538]);
	addLocaleData(b[5][539]);
	addLocaleData(b[5][540]);
	addLocaleData(b[5][541]);
	addLocaleData(b[5][542]);
	addLocaleData(b[5][543]);
	addLocaleData(b[5][544]);
	addLocaleData(b[5][545]);
	addLocaleData(b[5][546]);
	addLocaleData(b[5][547]);
	addLocaleData(b[5][548]);
	addLocaleData(b[5][549]);
	addLocaleData(b[5][550]);
	addLocaleData(b[5][551]);
	addLocaleData(b[5][552]);
	addLocaleData(b[5][553]);
	addLocaleData(b[5][554]);
	addLocaleData(b[5][555]);
	addLocaleData(b[5][556]);
	addLocaleData(b[5][557]);
	addLocaleData(b[5][558]);
	addLocaleData(b[5][559]);
	addLocaleData(b[5][560]);
	addLocaleData(b[5][561]);
	addLocaleData(b[5][562]);
	addLocaleData(b[5][563]);
	addLocaleData(b[5][564]);
	addLocaleData(b[5][565]);
	addLocaleData(b[5][566]);
	addLocaleData(b[5][567]);
	addLocaleData(b[5][568]);
	addLocaleData(b[5][569]);
	addLocaleData(b[5][570]);
	addLocaleData(b[5][571]);
	addLocaleData(b[5][572]);
	addLocaleData(b[5][573]);
	addLocaleData(b[5][574]);
	addLocaleData(b[5][575]);
	addLocaleData(b[5][576]);
	addLocaleData(b[5][577]);
	addLocaleData(b[5][578]);
	addLocaleData(b[5][579]);
	addLocaleData(b[5][580]);
	addLocaleData(b[5][581]);
	addLocaleData(b[5][582]);
	addLocaleData(b[5][583]);
	addLocaleData(b[5][584]);
	addLocaleData(b[5][585]);
	addLocaleData(b[5][586]);
	addLocaleData(b[5][587]);
	addLocaleData(b[5][588]);
	addLocaleData(b[5][589]);
	addLocaleData(b[5][590]);
	addLocaleData(b[5][591]);
	addLocaleData(b[5][592]);
	addLocaleData(b[5][593]);
	addLocaleData(b[5][594]);
	addLocaleData(b[5][595]);
	addLocaleData(b[5][596]);
	addLocaleData(b[5][597]);
	addLocaleData(b[5][598]);
	addLocaleData(b[5][599]);
	addLocaleData(b[5][600]);
	addLocaleData(b[5][601]);
	addLocaleData(b[5][602]);
	addLocaleData(b[5][603]);
	addLocaleData(b[5][604]);
	addLocaleData(b[5][605]);
	addLocaleData(b[5][606]);
	addLocaleData(b[5][607]);
	addLocaleData(b[5][608]);
	addLocaleData(b[5][609]);
	addLocaleData(b[5][610]);
	addLocaleData(b[5][611]);
	addLocaleData(b[5][612]);
	addLocaleData(b[5][613]);
	addLocaleData(b[5][614]);
	addLocaleData(b[5][615]);
	addLocaleData(b[5][616]);
	addLocaleData(b[5][617]);
	addLocaleData(b[5][618]);
	addLocaleData(b[5][619]);
	addLocaleData(b[5][620]);
	addLocaleData(b[5][621]);
	addLocaleData(b[5][622]);
	addLocaleData(b[5][623]);
	addLocaleData(b[5][624]);
	addLocaleData(b[5][625]);
	addLocaleData(b[5][626]);
	addLocaleData(b[5][627]);
	addLocaleData(b[5][628]);
	addLocaleData(b[5][629]);
	addLocaleData(b[5][630]);
	addLocaleData(b[5][631]);
	addLocaleData(b[5][632]);
	addLocaleData(b[5][633]);
	addLocaleData(b[5][634]);
	addLocaleData(b[5][635]);
	addLocaleData(b[5][636]);
	addLocaleData(b[5][637]);
	addLocaleData(b[5][638]);
	addLocaleData(b[5][639]);
	addLocaleData(b[5][640]);
	addLocaleData(b[5][641]);
	addLocaleData(b[5][642]);
	addLocaleData(b[5][643]);
	addLocaleData(b[5][644]);
	addLocaleData(b[5][645]);
	addLocaleData(b[5][646]);
	addLocaleData(b[5][647]);
	addLocaleData(b[5][648]);
	addLocaleData(b[5][649]);
	addLocaleData(b[5][650]);
	addLocaleData(b[5][651]);
	addLocaleData(b[5][652]);
	addLocaleData(b[5][653]);
	addLocaleData(b[5][654]);
	addLocaleData(b[5][655]);
	addLocaleData(b[5][656]);
	addLocaleData(b[5][657]);
	addLocaleData(b[5][658]);
	addLocaleData(b[5][659]);
	addLocaleData(b[5][660]);
	addLocaleData(b[5][661]);
	addLocaleData(b[5][662]);
	addLocaleData(b[5][663]);
	addLocaleData(b[5][664]);
	addLocaleData(b[5][665]);
	addLocaleData(b[5][666]);
	addLocaleData(b[5][667]);
	addLocaleData(b[5][668]);
	addLocaleData(b[5][669]);
	addLocaleData(b[5][670]);
	addLocaleData(b[5][671]);
	addLocaleData(b[5][672]);
	addLocaleData(b[5][673]);
	addLocaleData(b[5][674]);
	addLocaleData(b[5][675]);
	addLocaleData(b[5][676]);
	addLocaleData(b[5][677]);
	addLocaleData(b[5][678]);
	addLocaleData(b[5][679]);
	addLocaleData(b[5][680]);
	addLocaleData(b[5][681]);
	addLocaleData(b[5][682]);
	addLocaleData(b[5][683]);
	addLocaleData(b[5][684]);
	addLocaleData(b[5][685]);
	addLocaleData(b[5][686]);
	addLocaleData(b[5][687]);
	addLocaleData(b[5][688]);
	addLocaleData(b[5][689]);
	addLocaleData(b[5][690]);
	addLocaleData(b[5][691]);
	addLocaleData(b[5][692]);
	addLocaleData(b[5][693]);
	addLocaleData(b[5][694]);
	addLocaleData(b[5][695]);
	addLocaleData(b[5][696]);
	addLocaleData(b[5][697]);
	addLocaleData(b[5][698]);
	addLocaleData(b[5][699]);
	addLocaleData(b[5][700]);
	addLocaleData(b[5][701]);
	addLocaleData(b[5][702]);
	addLocaleData(b[5][703]);
	addLocaleData(b[5][704]);
	addLocaleData(b[5][705]);
	addLocaleData(b[5][706]);
	addLocaleData(b[5][707]);
	addLocaleData(b[5][708]);
	addLocaleData(b[5][709]);
	addLocaleData(b[5][710]);
	addLocaleData(b[5][711]);
	addLocaleData(b[5][712]);
	addLocaleData(b[5][713]);
	addLocaleData(b[5][714]);
	addLocaleData(b[5][715]);
	addLocaleData(b[5][716]);
	})(IntlPolyfill.__addLocaleData);

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(50);


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule React
	 */

	/* globals __REACT_DEVTOOLS_GLOBAL_HOOK__*/

	'use strict';

	var EventPluginUtils = __webpack_require__(51);
	var ReactChildren = __webpack_require__(55);
	var ReactComponent = __webpack_require__(69);
	var ReactClass = __webpack_require__(84);
	var ReactContext = __webpack_require__(61);
	var ReactCurrentOwner = __webpack_require__(64);
	var ReactElement = __webpack_require__(58);
	var ReactElementValidator = __webpack_require__(79);
	var ReactDOM = __webpack_require__(87);
	var ReactDOMTextComponent = __webpack_require__(89);
	var ReactDefaultInjection = __webpack_require__(138);
	var ReactInstanceHandles = __webpack_require__(66);
	var ReactMount = __webpack_require__(114);
	var ReactPerf = __webpack_require__(75);
	var ReactPropTypes = __webpack_require__(169);
	var ReactReconciler = __webpack_require__(76);
	var ReactServerRendering = __webpack_require__(197);

	var assign = __webpack_require__(62);
	var findDOMNode = __webpack_require__(142);
	var onlyChild = __webpack_require__(199);

	ReactDefaultInjection.inject();

	var createElement = ReactElement.createElement;
	var createFactory = ReactElement.createFactory;
	var cloneElement = ReactElement.cloneElement;

	if (false) {
	  createElement = ReactElementValidator.createElement;
	  createFactory = ReactElementValidator.createFactory;
	  cloneElement = ReactElementValidator.cloneElement;
	}

	var render = ReactPerf.measure('React', 'render', ReactMount.render);

	var React = {
	  Children: {
	    map: ReactChildren.map,
	    forEach: ReactChildren.forEach,
	    count: ReactChildren.count,
	    only: onlyChild
	  },
	  Component: ReactComponent,
	  DOM: ReactDOM,
	  PropTypes: ReactPropTypes,
	  initializeTouchEvents: function(shouldUseTouch) {
	    EventPluginUtils.useTouchEvents = shouldUseTouch;
	  },
	  createClass: ReactClass.createClass,
	  createElement: createElement,
	  cloneElement: cloneElement,
	  createFactory: createFactory,
	  createMixin: function(mixin) {
	    // Currently a noop. Will be used to validate and trace mixins.
	    return mixin;
	  },
	  constructAndRenderComponent: ReactMount.constructAndRenderComponent,
	  constructAndRenderComponentByID: ReactMount.constructAndRenderComponentByID,
	  findDOMNode: findDOMNode,
	  render: render,
	  renderToString: ReactServerRendering.renderToString,
	  renderToStaticMarkup: ReactServerRendering.renderToStaticMarkup,
	  unmountComponentAtNode: ReactMount.unmountComponentAtNode,
	  isValidElement: ReactElement.isValidElement,
	  withContext: ReactContext.withContext,

	  // Hook for JSX spread, don't use this for anything else.
	  __spread: assign
	};

	// Inject the runtime into a devtools global hook regardless of browser.
	// Allows for debugging when the hook is injected on the page.
	if (
	  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
	  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
	  __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
	    CurrentOwner: ReactCurrentOwner,
	    InstanceHandles: ReactInstanceHandles,
	    Mount: ReactMount,
	    Reconciler: ReactReconciler,
	    TextComponent: ReactDOMTextComponent
	  });
	}

	if (false) {
	  var ExecutionEnvironment = require("./ExecutionEnvironment");
	  if (ExecutionEnvironment.canUseDOM && window.top === window.self) {

	    // If we're in Chrome, look for the devtools marker and provide a download
	    // link if not installed.
	    if (navigator.userAgent.indexOf('Chrome') > -1) {
	      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
	        console.debug(
	          'Download the React DevTools for a better development experience: ' +
	          'https://fb.me/react-devtools'
	        );
	      }
	    }

	    var expectedFeatures = [
	      // shims
	      Array.isArray,
	      Array.prototype.every,
	      Array.prototype.forEach,
	      Array.prototype.indexOf,
	      Array.prototype.map,
	      Date.now,
	      Function.prototype.bind,
	      Object.keys,
	      String.prototype.split,
	      String.prototype.trim,

	      // shams
	      Object.create,
	      Object.freeze
	    ];

	    for (var i = 0; i < expectedFeatures.length; i++) {
	      if (!expectedFeatures[i]) {
	        console.error(
	          'One or more ES5 shim/shams expected by React are not available: ' +
	          'https://fb.me/react-warning-polyfills'
	        );
	        break;
	      }
	    }
	  }
	}

	React.version = '0.13.3';

	module.exports = React;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule EventPluginUtils
	 */

	'use strict';

	var EventConstants = __webpack_require__(52);

	var invariant = __webpack_require__(54);

	/**
	 * Injected dependencies:
	 */

	/**
	 * - `Mount`: [required] Module that can convert between React dom IDs and
	 *   actual node references.
	 */
	var injection = {
	  Mount: null,
	  injectMount: function(InjectedMount) {
	    injection.Mount = InjectedMount;
	    if (false) {
	      ("production" !== process.env.NODE_ENV ? invariant(
	        InjectedMount && InjectedMount.getNode,
	        'EventPluginUtils.injection.injectMount(...): Injected Mount module ' +
	        'is missing getNode.'
	      ) : invariant(InjectedMount && InjectedMount.getNode));
	    }
	  }
	};

	var topLevelTypes = EventConstants.topLevelTypes;

	function isEndish(topLevelType) {
	  return topLevelType === topLevelTypes.topMouseUp ||
	         topLevelType === topLevelTypes.topTouchEnd ||
	         topLevelType === topLevelTypes.topTouchCancel;
	}

	function isMoveish(topLevelType) {
	  return topLevelType === topLevelTypes.topMouseMove ||
	         topLevelType === topLevelTypes.topTouchMove;
	}
	function isStartish(topLevelType) {
	  return topLevelType === topLevelTypes.topMouseDown ||
	         topLevelType === topLevelTypes.topTouchStart;
	}


	var validateEventDispatches;
	if (false) {
	  validateEventDispatches = function(event) {
	    var dispatchListeners = event._dispatchListeners;
	    var dispatchIDs = event._dispatchIDs;

	    var listenersIsArr = Array.isArray(dispatchListeners);
	    var idsIsArr = Array.isArray(dispatchIDs);
	    var IDsLen = idsIsArr ? dispatchIDs.length : dispatchIDs ? 1 : 0;
	    var listenersLen = listenersIsArr ?
	      dispatchListeners.length :
	      dispatchListeners ? 1 : 0;

	    ("production" !== process.env.NODE_ENV ? invariant(
	      idsIsArr === listenersIsArr && IDsLen === listenersLen,
	      'EventPluginUtils: Invalid `event`.'
	    ) : invariant(idsIsArr === listenersIsArr && IDsLen === listenersLen));
	  };
	}

	/**
	 * Invokes `cb(event, listener, id)`. Avoids using call if no scope is
	 * provided. The `(listener,id)` pair effectively forms the "dispatch" but are
	 * kept separate to conserve memory.
	 */
	function forEachEventDispatch(event, cb) {
	  var dispatchListeners = event._dispatchListeners;
	  var dispatchIDs = event._dispatchIDs;
	  if (false) {
	    validateEventDispatches(event);
	  }
	  if (Array.isArray(dispatchListeners)) {
	    for (var i = 0; i < dispatchListeners.length; i++) {
	      if (event.isPropagationStopped()) {
	        break;
	      }
	      // Listeners and IDs are two parallel arrays that are always in sync.
	      cb(event, dispatchListeners[i], dispatchIDs[i]);
	    }
	  } else if (dispatchListeners) {
	    cb(event, dispatchListeners, dispatchIDs);
	  }
	}

	/**
	 * Default implementation of PluginModule.executeDispatch().
	 * @param {SyntheticEvent} SyntheticEvent to handle
	 * @param {function} Application-level callback
	 * @param {string} domID DOM id to pass to the callback.
	 */
	function executeDispatch(event, listener, domID) {
	  event.currentTarget = injection.Mount.getNode(domID);
	  var returnValue = listener(event, domID);
	  event.currentTarget = null;
	  return returnValue;
	}

	/**
	 * Standard/simple iteration through an event's collected dispatches.
	 */
	function executeDispatchesInOrder(event, cb) {
	  forEachEventDispatch(event, cb);
	  event._dispatchListeners = null;
	  event._dispatchIDs = null;
	}

	/**
	 * Standard/simple iteration through an event's collected dispatches, but stops
	 * at the first dispatch execution returning true, and returns that id.
	 *
	 * @return id of the first dispatch execution who's listener returns true, or
	 * null if no listener returned true.
	 */
	function executeDispatchesInOrderStopAtTrueImpl(event) {
	  var dispatchListeners = event._dispatchListeners;
	  var dispatchIDs = event._dispatchIDs;
	  if (false) {
	    validateEventDispatches(event);
	  }
	  if (Array.isArray(dispatchListeners)) {
	    for (var i = 0; i < dispatchListeners.length; i++) {
	      if (event.isPropagationStopped()) {
	        break;
	      }
	      // Listeners and IDs are two parallel arrays that are always in sync.
	      if (dispatchListeners[i](event, dispatchIDs[i])) {
	        return dispatchIDs[i];
	      }
	    }
	  } else if (dispatchListeners) {
	    if (dispatchListeners(event, dispatchIDs)) {
	      return dispatchIDs;
	    }
	  }
	  return null;
	}

	/**
	 * @see executeDispatchesInOrderStopAtTrueImpl
	 */
	function executeDispatchesInOrderStopAtTrue(event) {
	  var ret = executeDispatchesInOrderStopAtTrueImpl(event);
	  event._dispatchIDs = null;
	  event._dispatchListeners = null;
	  return ret;
	}

	/**
	 * Execution of a "direct" dispatch - there must be at most one dispatch
	 * accumulated on the event or it is considered an error. It doesn't really make
	 * sense for an event with multiple dispatches (bubbled) to keep track of the
	 * return values at each dispatch execution, but it does tend to make sense when
	 * dealing with "direct" dispatches.
	 *
	 * @return The return value of executing the single dispatch.
	 */
	function executeDirectDispatch(event) {
	  if (false) {
	    validateEventDispatches(event);
	  }
	  var dispatchListener = event._dispatchListeners;
	  var dispatchID = event._dispatchIDs;
	  (false ? invariant(
	    !Array.isArray(dispatchListener),
	    'executeDirectDispatch(...): Invalid `event`.'
	  ) : invariant(!Array.isArray(dispatchListener)));
	  var res = dispatchListener ?
	    dispatchListener(event, dispatchID) :
	    null;
	  event._dispatchListeners = null;
	  event._dispatchIDs = null;
	  return res;
	}

	/**
	 * @param {SyntheticEvent} event
	 * @return {bool} True iff number of dispatches accumulated is greater than 0.
	 */
	function hasDispatches(event) {
	  return !!event._dispatchListeners;
	}

	/**
	 * General utilities that are useful in creating custom Event Plugins.
	 */
	var EventPluginUtils = {
	  isEndish: isEndish,
	  isMoveish: isMoveish,
	  isStartish: isStartish,

	  executeDirectDispatch: executeDirectDispatch,
	  executeDispatch: executeDispatch,
	  executeDispatchesInOrder: executeDispatchesInOrder,
	  executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
	  hasDispatches: hasDispatches,
	  injection: injection,
	  useTouchEvents: false
	};

	module.exports = EventPluginUtils;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule EventConstants
	 */

	'use strict';

	var keyMirror = __webpack_require__(53);

	var PropagationPhases = keyMirror({bubbled: null, captured: null});

	/**
	 * Types of raw signals from the browser caught at the top level.
	 */
	var topLevelTypes = keyMirror({
	  topBlur: null,
	  topChange: null,
	  topClick: null,
	  topCompositionEnd: null,
	  topCompositionStart: null,
	  topCompositionUpdate: null,
	  topContextMenu: null,
	  topCopy: null,
	  topCut: null,
	  topDoubleClick: null,
	  topDrag: null,
	  topDragEnd: null,
	  topDragEnter: null,
	  topDragExit: null,
	  topDragLeave: null,
	  topDragOver: null,
	  topDragStart: null,
	  topDrop: null,
	  topError: null,
	  topFocus: null,
	  topInput: null,
	  topKeyDown: null,
	  topKeyPress: null,
	  topKeyUp: null,
	  topLoad: null,
	  topMouseDown: null,
	  topMouseMove: null,
	  topMouseOut: null,
	  topMouseOver: null,
	  topMouseUp: null,
	  topPaste: null,
	  topReset: null,
	  topScroll: null,
	  topSelectionChange: null,
	  topSubmit: null,
	  topTextInput: null,
	  topTouchCancel: null,
	  topTouchEnd: null,
	  topTouchMove: null,
	  topTouchStart: null,
	  topWheel: null
	});

	var EventConstants = {
	  topLevelTypes: topLevelTypes,
	  PropagationPhases: PropagationPhases
	};

	module.exports = EventConstants;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyMirror
	 * @typechecks static-only
	 */

	'use strict';

	var invariant = __webpack_require__(54);

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function(obj) {
	  var ret = {};
	  var key;
	  (false ? invariant(
	    obj instanceof Object && !Array.isArray(obj),
	    'keyMirror(...): Argument must be an object.'
	  ) : invariant(obj instanceof Object && !Array.isArray(obj)));
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	"use strict";

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactChildren
	 */

	'use strict';

	var PooledClass = __webpack_require__(56);
	var ReactFragment = __webpack_require__(57);

	var traverseAllChildren = __webpack_require__(65);
	var warning = __webpack_require__(59);

	var twoArgumentPooler = PooledClass.twoArgumentPooler;
	var threeArgumentPooler = PooledClass.threeArgumentPooler;

	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * traversal. Allows avoiding binding callbacks.
	 *
	 * @constructor ForEachBookKeeping
	 * @param {!function} forEachFunction Function to perform traversal with.
	 * @param {?*} forEachContext Context to perform context with.
	 */
	function ForEachBookKeeping(forEachFunction, forEachContext) {
	  this.forEachFunction = forEachFunction;
	  this.forEachContext = forEachContext;
	}
	PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

	function forEachSingleChild(traverseContext, child, name, i) {
	  var forEachBookKeeping = traverseContext;
	  forEachBookKeeping.forEachFunction.call(
	    forEachBookKeeping.forEachContext, child, i);
	}

	/**
	 * Iterates through children that are typically specified as `props.children`.
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} forEachFunc.
	 * @param {*} forEachContext Context for forEachContext.
	 */
	function forEachChildren(children, forEachFunc, forEachContext) {
	  if (children == null) {
	    return children;
	  }

	  var traverseContext =
	    ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
	  traverseAllChildren(children, forEachSingleChild, traverseContext);
	  ForEachBookKeeping.release(traverseContext);
	}

	/**
	 * PooledClass representing the bookkeeping associated with performing a child
	 * mapping. Allows avoiding binding callbacks.
	 *
	 * @constructor MapBookKeeping
	 * @param {!*} mapResult Object containing the ordered map of results.
	 * @param {!function} mapFunction Function to perform mapping with.
	 * @param {?*} mapContext Context to perform mapping with.
	 */
	function MapBookKeeping(mapResult, mapFunction, mapContext) {
	  this.mapResult = mapResult;
	  this.mapFunction = mapFunction;
	  this.mapContext = mapContext;
	}
	PooledClass.addPoolingTo(MapBookKeeping, threeArgumentPooler);

	function mapSingleChildIntoContext(traverseContext, child, name, i) {
	  var mapBookKeeping = traverseContext;
	  var mapResult = mapBookKeeping.mapResult;

	  var keyUnique = !mapResult.hasOwnProperty(name);
	  if (false) {
	    ("production" !== process.env.NODE_ENV ? warning(
	      keyUnique,
	      'ReactChildren.map(...): Encountered two children with the same key, ' +
	      '`%s`. Child keys must be unique; when two children share a key, only ' +
	      'the first child will be used.',
	      name
	    ) : null);
	  }

	  if (keyUnique) {
	    var mappedChild =
	      mapBookKeeping.mapFunction.call(mapBookKeeping.mapContext, child, i);
	    mapResult[name] = mappedChild;
	  }
	}

	/**
	 * Maps children that are typically specified as `props.children`.
	 *
	 * The provided mapFunction(child, key, index) will be called for each
	 * leaf child.
	 *
	 * TODO: This may likely break any calls to `ReactChildren.map` that were
	 * previously relying on the fact that we guarded against null children.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} mapFunction.
	 * @param {*} mapContext Context for mapFunction.
	 * @return {object} Object containing the ordered map of results.
	 */
	function mapChildren(children, func, context) {
	  if (children == null) {
	    return children;
	  }

	  var mapResult = {};
	  var traverseContext = MapBookKeeping.getPooled(mapResult, func, context);
	  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
	  MapBookKeeping.release(traverseContext);
	  return ReactFragment.create(mapResult);
	}

	function forEachSingleChildDummy(traverseContext, child, name, i) {
	  return null;
	}

	/**
	 * Count the number of children that are typically specified as
	 * `props.children`.
	 *
	 * @param {?*} children Children tree container.
	 * @return {number} The number of children.
	 */
	function countChildren(children, context) {
	  return traverseAllChildren(children, forEachSingleChildDummy, null);
	}

	var ReactChildren = {
	  forEach: forEachChildren,
	  map: mapChildren,
	  count: countChildren
	};

	module.exports = ReactChildren;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule PooledClass
	 */

	'use strict';

	var invariant = __webpack_require__(54);

	/**
	 * Static poolers. Several custom versions for each potential number of
	 * arguments. A completely generic pooler is easy to implement, but would
	 * require accessing the `arguments` object. In each of these, `this` refers to
	 * the Class itself, not an instance. If any others are needed, simply add them
	 * here, or in their own files.
	 */
	var oneArgumentPooler = function(copyFieldsFrom) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, copyFieldsFrom);
	    return instance;
	  } else {
	    return new Klass(copyFieldsFrom);
	  }
	};

	var twoArgumentPooler = function(a1, a2) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2);
	    return instance;
	  } else {
	    return new Klass(a1, a2);
	  }
	};

	var threeArgumentPooler = function(a1, a2, a3) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3);
	  }
	};

	var fiveArgumentPooler = function(a1, a2, a3, a4, a5) {
	  var Klass = this;
	  if (Klass.instancePool.length) {
	    var instance = Klass.instancePool.pop();
	    Klass.call(instance, a1, a2, a3, a4, a5);
	    return instance;
	  } else {
	    return new Klass(a1, a2, a3, a4, a5);
	  }
	};

	var standardReleaser = function(instance) {
	  var Klass = this;
	  (false ? invariant(
	    instance instanceof Klass,
	    'Trying to release an instance into a pool of a different type.'
	  ) : invariant(instance instanceof Klass));
	  if (instance.destructor) {
	    instance.destructor();
	  }
	  if (Klass.instancePool.length < Klass.poolSize) {
	    Klass.instancePool.push(instance);
	  }
	};

	var DEFAULT_POOL_SIZE = 10;
	var DEFAULT_POOLER = oneArgumentPooler;

	/**
	 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
	 * itself (statically) not adding any prototypical fields. Any CopyConstructor
	 * you give this may have a `poolSize` property, and will look for a
	 * prototypical `destructor` on instances (optional).
	 *
	 * @param {Function} CopyConstructor Constructor that can be used to reset.
	 * @param {Function} pooler Customizable pooler.
	 */
	var addPoolingTo = function(CopyConstructor, pooler) {
	  var NewKlass = CopyConstructor;
	  NewKlass.instancePool = [];
	  NewKlass.getPooled = pooler || DEFAULT_POOLER;
	  if (!NewKlass.poolSize) {
	    NewKlass.poolSize = DEFAULT_POOL_SIZE;
	  }
	  NewKlass.release = standardReleaser;
	  return NewKlass;
	};

	var PooledClass = {
	  addPoolingTo: addPoolingTo,
	  oneArgumentPooler: oneArgumentPooler,
	  twoArgumentPooler: twoArgumentPooler,
	  threeArgumentPooler: threeArgumentPooler,
	  fiveArgumentPooler: fiveArgumentPooler
	};

	module.exports = PooledClass;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	* @providesModule ReactFragment
	*/

	'use strict';

	var ReactElement = __webpack_require__(58);

	var warning = __webpack_require__(59);

	/**
	 * We used to allow keyed objects to serve as a collection of ReactElements,
	 * or nested sets. This allowed us a way to explicitly key a set a fragment of
	 * components. This is now being replaced with an opaque data structure.
	 * The upgrade path is to call React.addons.createFragment({ key: value }) to
	 * create a keyed fragment. The resulting data structure is opaque, for now.
	 */

	if (false) {
	  var fragmentKey = '_reactFragment';
	  var didWarnKey = '_reactDidWarn';
	  var canWarnForReactFragment = false;

	  try {
	    // Feature test. Don't even try to issue this warning if we can't use
	    // enumerable: false.

	    var dummy = function() {
	      return 1;
	    };

	    Object.defineProperty(
	      {},
	      fragmentKey,
	      {enumerable: false, value: true}
	    );

	    Object.defineProperty(
	      {},
	      'key',
	      {enumerable: true, get: dummy}
	    );

	    canWarnForReactFragment = true;
	  } catch (x) { }

	  var proxyPropertyAccessWithWarning = function(obj, key) {
	    Object.defineProperty(obj, key, {
	      enumerable: true,
	      get: function() {
	        ("production" !== process.env.NODE_ENV ? warning(
	          this[didWarnKey],
	          'A ReactFragment is an opaque type. Accessing any of its ' +
	          'properties is deprecated. Pass it to one of the React.Children ' +
	          'helpers.'
	        ) : null);
	        this[didWarnKey] = true;
	        return this[fragmentKey][key];
	      },
	      set: function(value) {
	        ("production" !== process.env.NODE_ENV ? warning(
	          this[didWarnKey],
	          'A ReactFragment is an immutable opaque type. Mutating its ' +
	          'properties is deprecated.'
	        ) : null);
	        this[didWarnKey] = true;
	        this[fragmentKey][key] = value;
	      }
	    });
	  };

	  var issuedWarnings = {};

	  var didWarnForFragment = function(fragment) {
	    // We use the keys and the type of the value as a heuristic to dedupe the
	    // warning to avoid spamming too much.
	    var fragmentCacheKey = '';
	    for (var key in fragment) {
	      fragmentCacheKey += key + ':' + (typeof fragment[key]) + ',';
	    }
	    var alreadyWarnedOnce = !!issuedWarnings[fragmentCacheKey];
	    issuedWarnings[fragmentCacheKey] = true;
	    return alreadyWarnedOnce;
	  };
	}

	var ReactFragment = {
	  // Wrap a keyed object in an opaque proxy that warns you if you access any
	  // of its properties.
	  create: function(object) {
	    if (false) {
	      if (typeof object !== 'object' || !object || Array.isArray(object)) {
	        ("production" !== process.env.NODE_ENV ? warning(
	          false,
	          'React.addons.createFragment only accepts a single object.',
	          object
	        ) : null);
	        return object;
	      }
	      if (ReactElement.isValidElement(object)) {
	        ("production" !== process.env.NODE_ENV ? warning(
	          false,
	          'React.addons.createFragment does not accept a ReactElement ' +
	          'without a wrapper object.'
	        ) : null);
	        return object;
	      }
	      if (canWarnForReactFragment) {
	        var proxy = {};
	        Object.defineProperty(proxy, fragmentKey, {
	          enumerable: false,
	          value: object
	        });
	        Object.defineProperty(proxy, didWarnKey, {
	          writable: true,
	          enumerable: false,
	          value: false
	        });
	        for (var key in object) {
	          proxyPropertyAccessWithWarning(proxy, key);
	        }
	        Object.preventExtensions(proxy);
	        return proxy;
	      }
	    }
	    return object;
	  },
	  // Extract the original keyed object from the fragment opaque type. Warn if
	  // a plain object is passed here.
	  extract: function(fragment) {
	    if (false) {
	      if (canWarnForReactFragment) {
	        if (!fragment[fragmentKey]) {
	          ("production" !== process.env.NODE_ENV ? warning(
	            didWarnForFragment(fragment),
	            'Any use of a keyed object should be wrapped in ' +
	            'React.addons.createFragment(object) before being passed as a ' +
	            'child.'
	          ) : null);
	          return fragment;
	        }
	        return fragment[fragmentKey];
	      }
	    }
	    return fragment;
	  },
	  // Check if this is a fragment and if so, extract the keyed object. If it
	  // is a fragment-like object, warn that it should be wrapped. Ignore if we
	  // can't determine what kind of object this is.
	  extractIfFragment: function(fragment) {
	    if (false) {
	      if (canWarnForReactFragment) {
	        // If it is the opaque type, return the keyed object.
	        if (fragment[fragmentKey]) {
	          return fragment[fragmentKey];
	        }
	        // Otherwise, check each property if it has an element, if it does
	        // it is probably meant as a fragment, so we can warn early. Defer,
	        // the warning to extract.
	        for (var key in fragment) {
	          if (fragment.hasOwnProperty(key) &&
	              ReactElement.isValidElement(fragment[key])) {
	            // This looks like a fragment object, we should provide an
	            // early warning.
	            return ReactFragment.extract(fragment);
	          }
	        }
	      }
	    }
	    return fragment;
	  }
	};

	module.exports = ReactFragment;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElement
	 */

	'use strict';

	var ReactContext = __webpack_require__(61);
	var ReactCurrentOwner = __webpack_require__(64);

	var assign = __webpack_require__(62);
	var warning = __webpack_require__(59);

	var RESERVED_PROPS = {
	  key: true,
	  ref: true
	};

	/**
	 * Warn for mutations.
	 *
	 * @internal
	 * @param {object} object
	 * @param {string} key
	 */
	function defineWarningProperty(object, key) {
	  Object.defineProperty(object, key, {

	    configurable: false,
	    enumerable: true,

	    get: function() {
	      if (!this._store) {
	        return null;
	      }
	      return this._store[key];
	    },

	    set: function(value) {
	      (false ? warning(
	        false,
	        'Don\'t set the %s property of the React element. Instead, ' +
	        'specify the correct value when initially creating the element.',
	        key
	      ) : null);
	      this._store[key] = value;
	    }

	  });
	}

	/**
	 * This is updated to true if the membrane is successfully created.
	 */
	var useMutationMembrane = false;

	/**
	 * Warn for mutations.
	 *
	 * @internal
	 * @param {object} element
	 */
	function defineMutationMembrane(prototype) {
	  try {
	    var pseudoFrozenProperties = {
	      props: true
	    };
	    for (var key in pseudoFrozenProperties) {
	      defineWarningProperty(prototype, key);
	    }
	    useMutationMembrane = true;
	  } catch (x) {
	    // IE will fail on defineProperty
	  }
	}

	/**
	 * Base constructor for all React elements. This is only used to make this
	 * work with a dynamic instanceof check. Nothing should live on this prototype.
	 *
	 * @param {*} type
	 * @param {string|object} ref
	 * @param {*} key
	 * @param {*} props
	 * @internal
	 */
	var ReactElement = function(type, key, ref, owner, context, props) {
	  // Built-in properties that belong on the element
	  this.type = type;
	  this.key = key;
	  this.ref = ref;

	  // Record the component responsible for creating this element.
	  this._owner = owner;

	  // TODO: Deprecate withContext, and then the context becomes accessible
	  // through the owner.
	  this._context = context;

	  if (false) {
	    // The validation flag and props are currently mutative. We put them on
	    // an external backing store so that we can freeze the whole object.
	    // This can be replaced with a WeakMap once they are implemented in
	    // commonly used development environments.
	    this._store = {props: props, originalProps: assign({}, props)};

	    // To make comparing ReactElements easier for testing purposes, we make
	    // the validation flag non-enumerable (where possible, which should
	    // include every environment we run tests in), so the test framework
	    // ignores it.
	    try {
	      Object.defineProperty(this._store, 'validated', {
	        configurable: false,
	        enumerable: false,
	        writable: true
	      });
	    } catch (x) {
	    }
	    this._store.validated = false;

	    // We're not allowed to set props directly on the object so we early
	    // return and rely on the prototype membrane to forward to the backing
	    // store.
	    if (useMutationMembrane) {
	      Object.freeze(this);
	      return;
	    }
	  }

	  this.props = props;
	};

	// We intentionally don't expose the function on the constructor property.
	// ReactElement should be indistinguishable from a plain object.
	ReactElement.prototype = {
	  _isReactElement: true
	};

	if (false) {
	  defineMutationMembrane(ReactElement.prototype);
	}

	ReactElement.createElement = function(type, config, children) {
	  var propName;

	  // Reserved names are extracted
	  var props = {};

	  var key = null;
	  var ref = null;

	  if (config != null) {
	    ref = config.ref === undefined ? null : config.ref;
	    key = config.key === undefined ? null : '' + config.key;
	    // Remaining properties are added to a new props object
	    for (propName in config) {
	      if (config.hasOwnProperty(propName) &&
	          !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  // Resolve default props
	  if (type && type.defaultProps) {
	    var defaultProps = type.defaultProps;
	    for (propName in defaultProps) {
	      if (typeof props[propName] === 'undefined') {
	        props[propName] = defaultProps[propName];
	      }
	    }
	  }

	  return new ReactElement(
	    type,
	    key,
	    ref,
	    ReactCurrentOwner.current,
	    ReactContext.current,
	    props
	  );
	};

	ReactElement.createFactory = function(type) {
	  var factory = ReactElement.createElement.bind(null, type);
	  // Expose the type on the factory and the prototype so that it can be
	  // easily accessed on elements. E.g. <Foo />.type === Foo.type.
	  // This should not be named `constructor` since this may not be the function
	  // that created the element, and it may not even be a constructor.
	  // Legacy hook TODO: Warn if this is accessed
	  factory.type = type;
	  return factory;
	};

	ReactElement.cloneAndReplaceProps = function(oldElement, newProps) {
	  var newElement = new ReactElement(
	    oldElement.type,
	    oldElement.key,
	    oldElement.ref,
	    oldElement._owner,
	    oldElement._context,
	    newProps
	  );

	  if (false) {
	    // If the key on the original is valid, then the clone is valid
	    newElement._store.validated = oldElement._store.validated;
	  }
	  return newElement;
	};

	ReactElement.cloneElement = function(element, config, children) {
	  var propName;

	  // Original props are copied
	  var props = assign({}, element.props);

	  // Reserved names are extracted
	  var key = element.key;
	  var ref = element.ref;

	  // Owner will be preserved, unless ref is overridden
	  var owner = element._owner;

	  if (config != null) {
	    if (config.ref !== undefined) {
	      // Silently steal the ref from the parent.
	      ref = config.ref;
	      owner = ReactCurrentOwner.current;
	    }
	    if (config.key !== undefined) {
	      key = '' + config.key;
	    }
	    // Remaining properties override existing props
	    for (propName in config) {
	      if (config.hasOwnProperty(propName) &&
	          !RESERVED_PROPS.hasOwnProperty(propName)) {
	        props[propName] = config[propName];
	      }
	    }
	  }

	  // Children can be more than one argument, and those are transferred onto
	  // the newly allocated props object.
	  var childrenLength = arguments.length - 2;
	  if (childrenLength === 1) {
	    props.children = children;
	  } else if (childrenLength > 1) {
	    var childArray = Array(childrenLength);
	    for (var i = 0; i < childrenLength; i++) {
	      childArray[i] = arguments[i + 2];
	    }
	    props.children = childArray;
	  }

	  return new ReactElement(
	    element.type,
	    key,
	    ref,
	    owner,
	    element._context,
	    props
	  );
	};

	/**
	 * @param {?object} object
	 * @return {boolean} True if `object` is a valid component.
	 * @final
	 */
	ReactElement.isValidElement = function(object) {
	  // ReactTestUtils is often used outside of beforeEach where as React is
	  // within it. This leads to two different instances of React on the same
	  // page. To identify a element from a different React instance we use
	  // a flag instead of an instanceof check.
	  var isElement = !!(object && object._isReactElement);
	  // if (isElement && !(object instanceof ReactElement)) {
	  // This is an indicator that you're using multiple versions of React at the
	  // same time. This will screw with ownership and stuff. Fix it, please.
	  // TODO: We could possibly warn here.
	  // }
	  return isElement;
	};

	module.exports = ReactElement;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule warning
	 */

	"use strict";

	var emptyFunction = __webpack_require__(60);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if (false) {
	  warning = function(condition, format ) {for (var args=[],$__0=2,$__1=arguments.length;$__0<$__1;$__0++) args.push(arguments[$__0]);
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || /^[s\W]*$/.test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' + format.replace(/%s/g, function()  {return args[argIndex++];});
	      console.warn(message);
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;


/***/ },
/* 60 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule emptyFunction
	 */

	function makeEmptyFunction(arg) {
	  return function() {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function() { return this; };
	emptyFunction.thatReturnsArgument = function(arg) { return arg; };

	module.exports = emptyFunction;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactContext
	 */

	'use strict';

	var assign = __webpack_require__(62);
	var emptyObject = __webpack_require__(63);
	var warning = __webpack_require__(59);

	var didWarn = false;

	/**
	 * Keeps track of the current context.
	 *
	 * The context is automatically passed down the component ownership hierarchy
	 * and is accessible via `this.context` on ReactCompositeComponents.
	 */
	var ReactContext = {

	  /**
	   * @internal
	   * @type {object}
	   */
	  current: emptyObject,

	  /**
	   * Temporarily extends the current context while executing scopedCallback.
	   *
	   * A typical use case might look like
	   *
	   *  render: function() {
	   *    var children = ReactContext.withContext({foo: 'foo'}, () => (
	   *
	   *    ));
	   *    return <div>{children}</div>;
	   *  }
	   *
	   * @param {object} newContext New context to merge into the existing context
	   * @param {function} scopedCallback Callback to run with the new context
	   * @return {ReactComponent|array<ReactComponent>}
	   */
	  withContext: function(newContext, scopedCallback) {
	    if (false) {
	      ("production" !== process.env.NODE_ENV ? warning(
	        didWarn,
	        'withContext is deprecated and will be removed in a future version. ' +
	        'Use a wrapper component with getChildContext instead.'
	      ) : null);

	      didWarn = true;
	    }

	    var result;
	    var previousContext = ReactContext.current;
	    ReactContext.current = assign({}, previousContext, newContext);
	    try {
	      result = scopedCallback();
	    } finally {
	      ReactContext.current = previousContext;
	    }
	    return result;
	  }

	};

	module.exports = ReactContext;


/***/ },
/* 62 */
/***/ function(module, exports) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Object.assign
	 */

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

	'use strict';

	function assign(target, sources) {
	  if (target == null) {
	    throw new TypeError('Object.assign target cannot be null or undefined');
	  }

	  var to = Object(target);
	  var hasOwnProperty = Object.prototype.hasOwnProperty;

	  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
	    var nextSource = arguments[nextIndex];
	    if (nextSource == null) {
	      continue;
	    }

	    var from = Object(nextSource);

	    // We don't currently support accessors nor proxies. Therefore this
	    // copy cannot throw. If we ever supported this then we must handle
	    // exceptions and side-effects. We don't support symbols so they won't
	    // be transferred.

	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }
	  }

	  return to;
	}

	module.exports = assign;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule emptyObject
	 */

	"use strict";

	var emptyObject = {};

	if (false) {
	  Object.freeze(emptyObject);
	}

	module.exports = emptyObject;


/***/ },
/* 64 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactCurrentOwner
	 */

	'use strict';

	/**
	 * Keeps track of the current owner.
	 *
	 * The current owner is the component who should own any components that are
	 * currently being constructed.
	 *
	 * The depth indicate how many composite components are above this render level.
	 */
	var ReactCurrentOwner = {

	  /**
	   * @internal
	   * @type {ReactComponent}
	   */
	  current: null

	};

	module.exports = ReactCurrentOwner;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule traverseAllChildren
	 */

	'use strict';

	var ReactElement = __webpack_require__(58);
	var ReactFragment = __webpack_require__(57);
	var ReactInstanceHandles = __webpack_require__(66);

	var getIteratorFn = __webpack_require__(68);
	var invariant = __webpack_require__(54);
	var warning = __webpack_require__(59);

	var SEPARATOR = ReactInstanceHandles.SEPARATOR;
	var SUBSEPARATOR = ':';

	/**
	 * TODO: Test that a single child and an array with one item have the same key
	 * pattern.
	 */

	var userProvidedKeyEscaperLookup = {
	  '=': '=0',
	  '.': '=1',
	  ':': '=2'
	};

	var userProvidedKeyEscapeRegex = /[=.:]/g;

	var didWarnAboutMaps = false;

	function userProvidedKeyEscaper(match) {
	  return userProvidedKeyEscaperLookup[match];
	}

	/**
	 * Generate a key string that identifies a component within a set.
	 *
	 * @param {*} component A component that could contain a manual key.
	 * @param {number} index Index that is used if a manual key is not provided.
	 * @return {string}
	 */
	function getComponentKey(component, index) {
	  if (component && component.key != null) {
	    // Explicit key
	    return wrapUserProvidedKey(component.key);
	  }
	  // Implicit key determined by the index in the set
	  return index.toString(36);
	}

	/**
	 * Escape a component key so that it is safe to use in a reactid.
	 *
	 * @param {*} key Component key to be escaped.
	 * @return {string} An escaped string.
	 */
	function escapeUserProvidedKey(text) {
	  return ('' + text).replace(
	    userProvidedKeyEscapeRegex,
	    userProvidedKeyEscaper
	  );
	}

	/**
	 * Wrap a `key` value explicitly provided by the user to distinguish it from
	 * implicitly-generated keys generated by a component's index in its parent.
	 *
	 * @param {string} key Value of a user-provided `key` attribute
	 * @return {string}
	 */
	function wrapUserProvidedKey(key) {
	  return '$' + escapeUserProvidedKey(key);
	}

	/**
	 * @param {?*} children Children tree container.
	 * @param {!string} nameSoFar Name of the key path so far.
	 * @param {!number} indexSoFar Number of children encountered until this point.
	 * @param {!function} callback Callback to invoke with each child found.
	 * @param {?*} traverseContext Used to pass information throughout the traversal
	 * process.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildrenImpl(
	  children,
	  nameSoFar,
	  indexSoFar,
	  callback,
	  traverseContext
	) {
	  var type = typeof children;

	  if (type === 'undefined' || type === 'boolean') {
	    // All of the above are perceived as null.
	    children = null;
	  }

	  if (children === null ||
	      type === 'string' ||
	      type === 'number' ||
	      ReactElement.isValidElement(children)) {
	    callback(
	      traverseContext,
	      children,
	      // If it's the only child, treat the name as if it was wrapped in an array
	      // so that it's consistent if the number of children grows.
	      nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar,
	      indexSoFar
	    );
	    return 1;
	  }

	  var child, nextName, nextIndex;
	  var subtreeCount = 0; // Count of children found in the current subtree.

	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      nextName = (
	        (nameSoFar !== '' ? nameSoFar + SUBSEPARATOR : SEPARATOR) +
	        getComponentKey(child, i)
	      );
	      nextIndex = indexSoFar + subtreeCount;
	      subtreeCount += traverseAllChildrenImpl(
	        child,
	        nextName,
	        nextIndex,
	        callback,
	        traverseContext
	      );
	    }
	  } else {
	    var iteratorFn = getIteratorFn(children);
	    if (iteratorFn) {
	      var iterator = iteratorFn.call(children);
	      var step;
	      if (iteratorFn !== children.entries) {
	        var ii = 0;
	        while (!(step = iterator.next()).done) {
	          child = step.value;
	          nextName = (
	            (nameSoFar !== '' ? nameSoFar + SUBSEPARATOR : SEPARATOR) +
	            getComponentKey(child, ii++)
	          );
	          nextIndex = indexSoFar + subtreeCount;
	          subtreeCount += traverseAllChildrenImpl(
	            child,
	            nextName,
	            nextIndex,
	            callback,
	            traverseContext
	          );
	        }
	      } else {
	        if (false) {
	          ("production" !== process.env.NODE_ENV ? warning(
	            didWarnAboutMaps,
	            'Using Maps as children is not yet fully supported. It is an ' +
	            'experimental feature that might be removed. Convert it to a ' +
	            'sequence / iterable of keyed ReactElements instead.'
	          ) : null);
	          didWarnAboutMaps = true;
	        }
	        // Iterator will provide entry [k,v] tuples rather than values.
	        while (!(step = iterator.next()).done) {
	          var entry = step.value;
	          if (entry) {
	            child = entry[1];
	            nextName = (
	              (nameSoFar !== '' ? nameSoFar + SUBSEPARATOR : SEPARATOR) +
	              wrapUserProvidedKey(entry[0]) + SUBSEPARATOR +
	              getComponentKey(child, 0)
	            );
	            nextIndex = indexSoFar + subtreeCount;
	            subtreeCount += traverseAllChildrenImpl(
	              child,
	              nextName,
	              nextIndex,
	              callback,
	              traverseContext
	            );
	          }
	        }
	      }
	    } else if (type === 'object') {
	      (false ? invariant(
	        children.nodeType !== 1,
	        'traverseAllChildren(...): Encountered an invalid child; DOM ' +
	        'elements are not valid children of React components.'
	      ) : invariant(children.nodeType !== 1));
	      var fragment = ReactFragment.extract(children);
	      for (var key in fragment) {
	        if (fragment.hasOwnProperty(key)) {
	          child = fragment[key];
	          nextName = (
	            (nameSoFar !== '' ? nameSoFar + SUBSEPARATOR : SEPARATOR) +
	            wrapUserProvidedKey(key) + SUBSEPARATOR +
	            getComponentKey(child, 0)
	          );
	          nextIndex = indexSoFar + subtreeCount;
	          subtreeCount += traverseAllChildrenImpl(
	            child,
	            nextName,
	            nextIndex,
	            callback,
	            traverseContext
	          );
	        }
	      }
	    }
	  }

	  return subtreeCount;
	}

	/**
	 * Traverses children that are typically specified as `props.children`, but
	 * might also be specified through attributes:
	 *
	 * - `traverseAllChildren(this.props.children, ...)`
	 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
	 *
	 * The `traverseContext` is an optional argument that is passed through the
	 * entire traversal. It can be used to store accumulations or anything else that
	 * the callback might find relevant.
	 *
	 * @param {?*} children Children tree object.
	 * @param {!function} callback To invoke upon traversing each child.
	 * @param {?*} traverseContext Context for traversal.
	 * @return {!number} The number of children in this subtree.
	 */
	function traverseAllChildren(children, callback, traverseContext) {
	  if (children == null) {
	    return 0;
	  }

	  return traverseAllChildrenImpl(children, '', 0, callback, traverseContext);
	}

	module.exports = traverseAllChildren;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactInstanceHandles
	 * @typechecks static-only
	 */

	'use strict';

	var ReactRootIndex = __webpack_require__(67);

	var invariant = __webpack_require__(54);

	var SEPARATOR = '.';
	var SEPARATOR_LENGTH = SEPARATOR.length;

	/**
	 * Maximum depth of traversals before we consider the possibility of a bad ID.
	 */
	var MAX_TREE_DEPTH = 100;

	/**
	 * Creates a DOM ID prefix to use when mounting React components.
	 *
	 * @param {number} index A unique integer
	 * @return {string} React root ID.
	 * @internal
	 */
	function getReactRootIDString(index) {
	  return SEPARATOR + index.toString(36);
	}

	/**
	 * Checks if a character in the supplied ID is a separator or the end.
	 *
	 * @param {string} id A React DOM ID.
	 * @param {number} index Index of the character to check.
	 * @return {boolean} True if the character is a separator or end of the ID.
	 * @private
	 */
	function isBoundary(id, index) {
	  return id.charAt(index) === SEPARATOR || index === id.length;
	}

	/**
	 * Checks if the supplied string is a valid React DOM ID.
	 *
	 * @param {string} id A React DOM ID, maybe.
	 * @return {boolean} True if the string is a valid React DOM ID.
	 * @private
	 */
	function isValidID(id) {
	  return id === '' || (
	    id.charAt(0) === SEPARATOR && id.charAt(id.length - 1) !== SEPARATOR
	  );
	}

	/**
	 * Checks if the first ID is an ancestor of or equal to the second ID.
	 *
	 * @param {string} ancestorID
	 * @param {string} descendantID
	 * @return {boolean} True if `ancestorID` is an ancestor of `descendantID`.
	 * @internal
	 */
	function isAncestorIDOf(ancestorID, descendantID) {
	  return (
	    descendantID.indexOf(ancestorID) === 0 &&
	    isBoundary(descendantID, ancestorID.length)
	  );
	}

	/**
	 * Gets the parent ID of the supplied React DOM ID, `id`.
	 *
	 * @param {string} id ID of a component.
	 * @return {string} ID of the parent, or an empty string.
	 * @private
	 */
	function getParentID(id) {
	  return id ? id.substr(0, id.lastIndexOf(SEPARATOR)) : '';
	}

	/**
	 * Gets the next DOM ID on the tree path from the supplied `ancestorID` to the
	 * supplied `destinationID`. If they are equal, the ID is returned.
	 *
	 * @param {string} ancestorID ID of an ancestor node of `destinationID`.
	 * @param {string} destinationID ID of the destination node.
	 * @return {string} Next ID on the path from `ancestorID` to `destinationID`.
	 * @private
	 */
	function getNextDescendantID(ancestorID, destinationID) {
	  (false ? invariant(
	    isValidID(ancestorID) && isValidID(destinationID),
	    'getNextDescendantID(%s, %s): Received an invalid React DOM ID.',
	    ancestorID,
	    destinationID
	  ) : invariant(isValidID(ancestorID) && isValidID(destinationID)));
	  (false ? invariant(
	    isAncestorIDOf(ancestorID, destinationID),
	    'getNextDescendantID(...): React has made an invalid assumption about ' +
	    'the DOM hierarchy. Expected `%s` to be an ancestor of `%s`.',
	    ancestorID,
	    destinationID
	  ) : invariant(isAncestorIDOf(ancestorID, destinationID)));
	  if (ancestorID === destinationID) {
	    return ancestorID;
	  }
	  // Skip over the ancestor and the immediate separator. Traverse until we hit
	  // another separator or we reach the end of `destinationID`.
	  var start = ancestorID.length + SEPARATOR_LENGTH;
	  var i;
	  for (i = start; i < destinationID.length; i++) {
	    if (isBoundary(destinationID, i)) {
	      break;
	    }
	  }
	  return destinationID.substr(0, i);
	}

	/**
	 * Gets the nearest common ancestor ID of two IDs.
	 *
	 * Using this ID scheme, the nearest common ancestor ID is the longest common
	 * prefix of the two IDs that immediately preceded a "marker" in both strings.
	 *
	 * @param {string} oneID
	 * @param {string} twoID
	 * @return {string} Nearest common ancestor ID, or the empty string if none.
	 * @private
	 */
	function getFirstCommonAncestorID(oneID, twoID) {
	  var minLength = Math.min(oneID.length, twoID.length);
	  if (minLength === 0) {
	    return '';
	  }
	  var lastCommonMarkerIndex = 0;
	  // Use `<=` to traverse until the "EOL" of the shorter string.
	  for (var i = 0; i <= minLength; i++) {
	    if (isBoundary(oneID, i) && isBoundary(twoID, i)) {
	      lastCommonMarkerIndex = i;
	    } else if (oneID.charAt(i) !== twoID.charAt(i)) {
	      break;
	    }
	  }
	  var longestCommonID = oneID.substr(0, lastCommonMarkerIndex);
	  (false ? invariant(
	    isValidID(longestCommonID),
	    'getFirstCommonAncestorID(%s, %s): Expected a valid React DOM ID: %s',
	    oneID,
	    twoID,
	    longestCommonID
	  ) : invariant(isValidID(longestCommonID)));
	  return longestCommonID;
	}

	/**
	 * Traverses the parent path between two IDs (either up or down). The IDs must
	 * not be the same, and there must exist a parent path between them. If the
	 * callback returns `false`, traversal is stopped.
	 *
	 * @param {?string} start ID at which to start traversal.
	 * @param {?string} stop ID at which to end traversal.
	 * @param {function} cb Callback to invoke each ID with.
	 * @param {?boolean} skipFirst Whether or not to skip the first node.
	 * @param {?boolean} skipLast Whether or not to skip the last node.
	 * @private
	 */
	function traverseParentPath(start, stop, cb, arg, skipFirst, skipLast) {
	  start = start || '';
	  stop = stop || '';
	  (false ? invariant(
	    start !== stop,
	    'traverseParentPath(...): Cannot traverse from and to the same ID, `%s`.',
	    start
	  ) : invariant(start !== stop));
	  var traverseUp = isAncestorIDOf(stop, start);
	  (false ? invariant(
	    traverseUp || isAncestorIDOf(start, stop),
	    'traverseParentPath(%s, %s, ...): Cannot traverse from two IDs that do ' +
	    'not have a parent path.',
	    start,
	    stop
	  ) : invariant(traverseUp || isAncestorIDOf(start, stop)));
	  // Traverse from `start` to `stop` one depth at a time.
	  var depth = 0;
	  var traverse = traverseUp ? getParentID : getNextDescendantID;
	  for (var id = start; /* until break */; id = traverse(id, stop)) {
	    var ret;
	    if ((!skipFirst || id !== start) && (!skipLast || id !== stop)) {
	      ret = cb(id, traverseUp, arg);
	    }
	    if (ret === false || id === stop) {
	      // Only break //after// visiting `stop`.
	      break;
	    }
	    (false ? invariant(
	      depth++ < MAX_TREE_DEPTH,
	      'traverseParentPath(%s, %s, ...): Detected an infinite loop while ' +
	      'traversing the React DOM ID tree. This may be due to malformed IDs: %s',
	      start, stop
	    ) : invariant(depth++ < MAX_TREE_DEPTH));
	  }
	}

	/**
	 * Manages the IDs assigned to DOM representations of React components. This
	 * uses a specific scheme in order to traverse the DOM efficiently (e.g. in
	 * order to simulate events).
	 *
	 * @internal
	 */
	var ReactInstanceHandles = {

	  /**
	   * Constructs a React root ID
	   * @return {string} A React root ID.
	   */
	  createReactRootID: function() {
	    return getReactRootIDString(ReactRootIndex.createReactRootIndex());
	  },

	  /**
	   * Constructs a React ID by joining a root ID with a name.
	   *
	   * @param {string} rootID Root ID of a parent component.
	   * @param {string} name A component's name (as flattened children).
	   * @return {string} A React ID.
	   * @internal
	   */
	  createReactID: function(rootID, name) {
	    return rootID + name;
	  },

	  /**
	   * Gets the DOM ID of the React component that is the root of the tree that
	   * contains the React component with the supplied DOM ID.
	   *
	   * @param {string} id DOM ID of a React component.
	   * @return {?string} DOM ID of the React component that is the root.
	   * @internal
	   */
	  getReactRootIDFromNodeID: function(id) {
	    if (id && id.charAt(0) === SEPARATOR && id.length > 1) {
	      var index = id.indexOf(SEPARATOR, 1);
	      return index > -1 ? id.substr(0, index) : id;
	    }
	    return null;
	  },

	  /**
	   * Traverses the ID hierarchy and invokes the supplied `cb` on any IDs that
	   * should would receive a `mouseEnter` or `mouseLeave` event.
	   *
	   * NOTE: Does not invoke the callback on the nearest common ancestor because
	   * nothing "entered" or "left" that element.
	   *
	   * @param {string} leaveID ID being left.
	   * @param {string} enterID ID being entered.
	   * @param {function} cb Callback to invoke on each entered/left ID.
	   * @param {*} upArg Argument to invoke the callback with on left IDs.
	   * @param {*} downArg Argument to invoke the callback with on entered IDs.
	   * @internal
	   */
	  traverseEnterLeave: function(leaveID, enterID, cb, upArg, downArg) {
	    var ancestorID = getFirstCommonAncestorID(leaveID, enterID);
	    if (ancestorID !== leaveID) {
	      traverseParentPath(leaveID, ancestorID, cb, upArg, false, true);
	    }
	    if (ancestorID !== enterID) {
	      traverseParentPath(ancestorID, enterID, cb, downArg, true, false);
	    }
	  },

	  /**
	   * Simulates the traversal of a two-phase, capture/bubble event dispatch.
	   *
	   * NOTE: This traversal happens on IDs without touching the DOM.
	   *
	   * @param {string} targetID ID of the target node.
	   * @param {function} cb Callback to invoke.
	   * @param {*} arg Argument to invoke the callback with.
	   * @internal
	   */
	  traverseTwoPhase: function(targetID, cb, arg) {
	    if (targetID) {
	      traverseParentPath('', targetID, cb, arg, true, false);
	      traverseParentPath(targetID, '', cb, arg, false, true);
	    }
	  },

	  /**
	   * Traverse a node ID, calling the supplied `cb` for each ancestor ID. For
	   * example, passing `.0.$row-0.1` would result in `cb` getting called
	   * with `.0`, `.0.$row-0`, and `.0.$row-0.1`.
	   *
	   * NOTE: This traversal happens on IDs without touching the DOM.
	   *
	   * @param {string} targetID ID of the target node.
	   * @param {function} cb Callback to invoke.
	   * @param {*} arg Argument to invoke the callback with.
	   * @internal
	   */
	  traverseAncestors: function(targetID, cb, arg) {
	    traverseParentPath('', targetID, cb, arg, true, false);
	  },

	  /**
	   * Exposed for unit testing.
	   * @private
	   */
	  _getFirstCommonAncestorID: getFirstCommonAncestorID,

	  /**
	   * Exposed for unit testing.
	   * @private
	   */
	  _getNextDescendantID: getNextDescendantID,

	  isAncestorIDOf: isAncestorIDOf,

	  SEPARATOR: SEPARATOR

	};

	module.exports = ReactInstanceHandles;


/***/ },
/* 67 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactRootIndex
	 * @typechecks
	 */

	'use strict';

	var ReactRootIndexInjection = {
	  /**
	   * @param {function} _createReactRootIndex
	   */
	  injectCreateReactRootIndex: function(_createReactRootIndex) {
	    ReactRootIndex.createReactRootIndex = _createReactRootIndex;
	  }
	};

	var ReactRootIndex = {
	  createReactRootIndex: null,
	  injection: ReactRootIndexInjection
	};

	module.exports = ReactRootIndex;


/***/ },
/* 68 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getIteratorFn
	 * @typechecks static-only
	 */

	'use strict';

	/* global Symbol */
	var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	/**
	 * Returns the iterator method function contained on the iterable object.
	 *
	 * Be sure to invoke the function with the iterable as context:
	 *
	 *     var iteratorFn = getIteratorFn(myIterable);
	 *     if (iteratorFn) {
	 *       var iterator = iteratorFn.call(myIterable);
	 *       ...
	 *     }
	 *
	 * @param {?object} maybeIterable
	 * @return {?function}
	 */
	function getIteratorFn(maybeIterable) {
	  var iteratorFn = maybeIterable && (
	    (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL])
	  );
	  if (typeof iteratorFn === 'function') {
	    return iteratorFn;
	  }
	}

	module.exports = getIteratorFn;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponent
	 */

	'use strict';

	var ReactUpdateQueue = __webpack_require__(70);

	var invariant = __webpack_require__(54);
	var warning = __webpack_require__(59);

	/**
	 * Base class helpers for the updating state of a component.
	 */
	function ReactComponent(props, context) {
	  this.props = props;
	  this.context = context;
	}

	/**
	 * Sets a subset of the state. Always use this to mutate
	 * state. You should treat `this.state` as immutable.
	 *
	 * There is no guarantee that `this.state` will be immediately updated, so
	 * accessing `this.state` after calling this method may return the old value.
	 *
	 * There is no guarantee that calls to `setState` will run synchronously,
	 * as they may eventually be batched together.  You can provide an optional
	 * callback that will be executed when the call to setState is actually
	 * completed.
	 *
	 * When a function is provided to setState, it will be called at some point in
	 * the future (not synchronously). It will be called with the up to date
	 * component arguments (state, props, context). These values can be different
	 * from this.* because your function may be called after receiveProps but before
	 * shouldComponentUpdate, and this new state, props, and context will not yet be
	 * assigned to this.
	 *
	 * @param {object|function} partialState Next partial state or function to
	 *        produce next partial state to be merged with current state.
	 * @param {?function} callback Called after state is updated.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.setState = function(partialState, callback) {
	  (false ? invariant(
	    typeof partialState === 'object' ||
	    typeof partialState === 'function' ||
	    partialState == null,
	    'setState(...): takes an object of state variables to update or a ' +
	    'function which returns an object of state variables.'
	  ) : invariant(typeof partialState === 'object' ||
	  typeof partialState === 'function' ||
	  partialState == null));
	  if (false) {
	    ("production" !== process.env.NODE_ENV ? warning(
	      partialState != null,
	      'setState(...): You passed an undefined or null state object; ' +
	      'instead, use forceUpdate().'
	    ) : null);
	  }
	  ReactUpdateQueue.enqueueSetState(this, partialState);
	  if (callback) {
	    ReactUpdateQueue.enqueueCallback(this, callback);
	  }
	};

	/**
	 * Forces an update. This should only be invoked when it is known with
	 * certainty that we are **not** in a DOM transaction.
	 *
	 * You may want to call this when you know that some deeper aspect of the
	 * component's state has changed but `setState` was not called.
	 *
	 * This will not invoke `shouldComponentUpdate`, but it will invoke
	 * `componentWillUpdate` and `componentDidUpdate`.
	 *
	 * @param {?function} callback Called after update is complete.
	 * @final
	 * @protected
	 */
	ReactComponent.prototype.forceUpdate = function(callback) {
	  ReactUpdateQueue.enqueueForceUpdate(this);
	  if (callback) {
	    ReactUpdateQueue.enqueueCallback(this, callback);
	  }
	};

	/**
	 * Deprecated APIs. These APIs used to exist on classic React classes but since
	 * we would like to deprecate them, we're not going to move them over to this
	 * modern base class. Instead, we define a getter that warns if it's accessed.
	 */
	if (false) {
	  var deprecatedAPIs = {
	    getDOMNode: [
	      'getDOMNode',
	      'Use React.findDOMNode(component) instead.'
	    ],
	    isMounted: [
	      'isMounted',
	      'Instead, make sure to clean up subscriptions and pending requests in ' +
	      'componentWillUnmount to prevent memory leaks.'
	    ],
	    replaceProps: [
	      'replaceProps',
	      'Instead, call React.render again at the top level.'
	    ],
	    replaceState: [
	      'replaceState',
	      'Refactor your code to use setState instead (see ' +
	      'https://github.com/facebook/react/issues/3236).'
	    ],
	    setProps: [
	      'setProps',
	      'Instead, call React.render again at the top level.'
	    ]
	  };
	  var defineDeprecationWarning = function(methodName, info) {
	    try {
	      Object.defineProperty(ReactComponent.prototype, methodName, {
	        get: function() {
	          ("production" !== process.env.NODE_ENV ? warning(
	            false,
	            '%s(...) is deprecated in plain JavaScript React classes. %s',
	            info[0],
	            info[1]
	          ) : null);
	          return undefined;
	        }
	      });
	    } catch (x) {
	      // IE will fail on defineProperty (es5-shim/sham too)
	    }
	  };
	  for (var fnName in deprecatedAPIs) {
	    if (deprecatedAPIs.hasOwnProperty(fnName)) {
	      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
	    }
	  }
	}

	module.exports = ReactComponent;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactUpdateQueue
	 */

	'use strict';

	var ReactLifeCycle = __webpack_require__(71);
	var ReactCurrentOwner = __webpack_require__(64);
	var ReactElement = __webpack_require__(58);
	var ReactInstanceMap = __webpack_require__(72);
	var ReactUpdates = __webpack_require__(73);

	var assign = __webpack_require__(62);
	var invariant = __webpack_require__(54);
	var warning = __webpack_require__(59);

	function enqueueUpdate(internalInstance) {
	  if (internalInstance !== ReactLifeCycle.currentlyMountingInstance) {
	    // If we're in a componentWillMount handler, don't enqueue a rerender
	    // because ReactUpdates assumes we're in a browser context (which is
	    // wrong for server rendering) and we're about to do a render anyway.
	    // See bug in #1740.
	    ReactUpdates.enqueueUpdate(internalInstance);
	  }
	}

	function getInternalInstanceReadyForUpdate(publicInstance, callerName) {
	  (false ? invariant(
	    ReactCurrentOwner.current == null,
	    '%s(...): Cannot update during an existing state transition ' +
	    '(such as within `render`). Render methods should be a pure function ' +
	    'of props and state.',
	    callerName
	  ) : invariant(ReactCurrentOwner.current == null));

	  var internalInstance = ReactInstanceMap.get(publicInstance);
	  if (!internalInstance) {
	    if (false) {
	      // Only warn when we have a callerName. Otherwise we should be silent.
	      // We're probably calling from enqueueCallback. We don't want to warn
	      // there because we already warned for the corresponding lifecycle method.
	      ("production" !== process.env.NODE_ENV ? warning(
	        !callerName,
	        '%s(...): Can only update a mounted or mounting component. ' +
	        'This usually means you called %s() on an unmounted ' +
	        'component. This is a no-op.',
	        callerName,
	        callerName
	      ) : null);
	    }
	    return null;
	  }

	  if (internalInstance === ReactLifeCycle.currentlyUnmountingInstance) {
	    return null;
	  }

	  return internalInstance;
	}

	/**
	 * ReactUpdateQueue allows for state updates to be scheduled into a later
	 * reconciliation step.
	 */
	var ReactUpdateQueue = {

	  /**
	   * Enqueue a callback that will be executed after all the pending updates
	   * have processed.
	   *
	   * @param {ReactClass} publicInstance The instance to use as `this` context.
	   * @param {?function} callback Called after state is updated.
	   * @internal
	   */
	  enqueueCallback: function(publicInstance, callback) {
	    (false ? invariant(
	      typeof callback === 'function',
	      'enqueueCallback(...): You called `setProps`, `replaceProps`, ' +
	      '`setState`, `replaceState`, or `forceUpdate` with a callback that ' +
	      'isn\'t callable.'
	    ) : invariant(typeof callback === 'function'));
	    var internalInstance = getInternalInstanceReadyForUpdate(publicInstance);

	    // Previously we would throw an error if we didn't have an internal
	    // instance. Since we want to make it a no-op instead, we mirror the same
	    // behavior we have in other enqueue* methods.
	    // We also need to ignore callbacks in componentWillMount. See
	    // enqueueUpdates.
	    if (!internalInstance ||
	        internalInstance === ReactLifeCycle.currentlyMountingInstance) {
	      return null;
	    }

	    if (internalInstance._pendingCallbacks) {
	      internalInstance._pendingCallbacks.push(callback);
	    } else {
	      internalInstance._pendingCallbacks = [callback];
	    }
	    // TODO: The callback here is ignored when setState is called from
	    // componentWillMount. Either fix it or disallow doing so completely in
	    // favor of getInitialState. Alternatively, we can disallow
	    // componentWillMount during server-side rendering.
	    enqueueUpdate(internalInstance);
	  },

	  enqueueCallbackInternal: function(internalInstance, callback) {
	    (false ? invariant(
	      typeof callback === 'function',
	      'enqueueCallback(...): You called `setProps`, `replaceProps`, ' +
	      '`setState`, `replaceState`, or `forceUpdate` with a callback that ' +
	      'isn\'t callable.'
	    ) : invariant(typeof callback === 'function'));
	    if (internalInstance._pendingCallbacks) {
	      internalInstance._pendingCallbacks.push(callback);
	    } else {
	      internalInstance._pendingCallbacks = [callback];
	    }
	    enqueueUpdate(internalInstance);
	  },

	  /**
	   * Forces an update. This should only be invoked when it is known with
	   * certainty that we are **not** in a DOM transaction.
	   *
	   * You may want to call this when you know that some deeper aspect of the
	   * component's state has changed but `setState` was not called.
	   *
	   * This will not invoke `shouldUpdateComponent`, but it will invoke
	   * `componentWillUpdate` and `componentDidUpdate`.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @internal
	   */
	  enqueueForceUpdate: function(publicInstance) {
	    var internalInstance = getInternalInstanceReadyForUpdate(
	      publicInstance,
	      'forceUpdate'
	    );

	    if (!internalInstance) {
	      return;
	    }

	    internalInstance._pendingForceUpdate = true;

	    enqueueUpdate(internalInstance);
	  },

	  /**
	   * Replaces all of the state. Always use this or `setState` to mutate state.
	   * You should treat `this.state` as immutable.
	   *
	   * There is no guarantee that `this.state` will be immediately updated, so
	   * accessing `this.state` after calling this method may return the old value.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} completeState Next state.
	   * @internal
	   */
	  enqueueReplaceState: function(publicInstance, completeState) {
	    var internalInstance = getInternalInstanceReadyForUpdate(
	      publicInstance,
	      'replaceState'
	    );

	    if (!internalInstance) {
	      return;
	    }

	    internalInstance._pendingStateQueue = [completeState];
	    internalInstance._pendingReplaceState = true;

	    enqueueUpdate(internalInstance);
	  },

	  /**
	   * Sets a subset of the state. This only exists because _pendingState is
	   * internal. This provides a merging strategy that is not available to deep
	   * properties which is confusing. TODO: Expose pendingState or don't use it
	   * during the merge.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} partialState Next partial state to be merged with state.
	   * @internal
	   */
	  enqueueSetState: function(publicInstance, partialState) {
	    var internalInstance = getInternalInstanceReadyForUpdate(
	      publicInstance,
	      'setState'
	    );

	    if (!internalInstance) {
	      return;
	    }

	    var queue =
	      internalInstance._pendingStateQueue ||
	      (internalInstance._pendingStateQueue = []);
	    queue.push(partialState);

	    enqueueUpdate(internalInstance);
	  },

	  /**
	   * Sets a subset of the props.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} partialProps Subset of the next props.
	   * @internal
	   */
	  enqueueSetProps: function(publicInstance, partialProps) {
	    var internalInstance = getInternalInstanceReadyForUpdate(
	      publicInstance,
	      'setProps'
	    );

	    if (!internalInstance) {
	      return;
	    }

	    (false ? invariant(
	      internalInstance._isTopLevel,
	      'setProps(...): You called `setProps` on a ' +
	      'component with a parent. This is an anti-pattern since props will ' +
	      'get reactively updated when rendered. Instead, change the owner\'s ' +
	      '`render` method to pass the correct value as props to the component ' +
	      'where it is created.'
	    ) : invariant(internalInstance._isTopLevel));

	    // Merge with the pending element if it exists, otherwise with existing
	    // element props.
	    var element = internalInstance._pendingElement ||
	                  internalInstance._currentElement;
	    var props = assign({}, element.props, partialProps);
	    internalInstance._pendingElement = ReactElement.cloneAndReplaceProps(
	      element,
	      props
	    );

	    enqueueUpdate(internalInstance);
	  },

	  /**
	   * Replaces all of the props.
	   *
	   * @param {ReactClass} publicInstance The instance that should rerender.
	   * @param {object} props New props.
	   * @internal
	   */
	  enqueueReplaceProps: function(publicInstance, props) {
	    var internalInstance = getInternalInstanceReadyForUpdate(
	      publicInstance,
	      'replaceProps'
	    );

	    if (!internalInstance) {
	      return;
	    }

	    (false ? invariant(
	      internalInstance._isTopLevel,
	      'replaceProps(...): You called `replaceProps` on a ' +
	      'component with a parent. This is an anti-pattern since props will ' +
	      'get reactively updated when rendered. Instead, change the owner\'s ' +
	      '`render` method to pass the correct value as props to the component ' +
	      'where it is created.'
	    ) : invariant(internalInstance._isTopLevel));

	    // Merge with the pending element if it exists, otherwise with existing
	    // element props.
	    var element = internalInstance._pendingElement ||
	                  internalInstance._currentElement;
	    internalInstance._pendingElement = ReactElement.cloneAndReplaceProps(
	      element,
	      props
	    );

	    enqueueUpdate(internalInstance);
	  },

	  enqueueElementInternal: function(internalInstance, newElement) {
	    internalInstance._pendingElement = newElement;
	    enqueueUpdate(internalInstance);
	  }

	};

	module.exports = ReactUpdateQueue;


/***/ },
/* 71 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactLifeCycle
	 */

	'use strict';

	/**
	 * This module manages the bookkeeping when a component is in the process
	 * of being mounted or being unmounted. This is used as a way to enforce
	 * invariants (or warnings) when it is not recommended to call
	 * setState/forceUpdate.
	 *
	 * currentlyMountingInstance: During the construction phase, it is not possible
	 * to trigger an update since the instance is not fully mounted yet. However, we
	 * currently allow this as a convenience for mutating the initial state.
	 *
	 * currentlyUnmountingInstance: During the unmounting phase, the instance is
	 * still mounted and can therefore schedule an update. However, this is not
	 * recommended and probably an error since it's about to be unmounted.
	 * Therefore we still want to trigger in an error for that case.
	 */

	var ReactLifeCycle = {
	  currentlyMountingInstance: null,
	  currentlyUnmountingInstance: null
	};

	module.exports = ReactLifeCycle;


/***/ },
/* 72 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactInstanceMap
	 */

	'use strict';

	/**
	 * `ReactInstanceMap` maintains a mapping from a public facing stateful
	 * instance (key) and the internal representation (value). This allows public
	 * methods to accept the user facing instance as an argument and map them back
	 * to internal methods.
	 */

	// TODO: Replace this with ES6: var ReactInstanceMap = new Map();
	var ReactInstanceMap = {

	  /**
	   * This API should be called `delete` but we'd have to make sure to always
	   * transform these to strings for IE support. When this transform is fully
	   * supported we can rename it.
	   */
	  remove: function(key) {
	    key._reactInternalInstance = undefined;
	  },

	  get: function(key) {
	    return key._reactInternalInstance;
	  },

	  has: function(key) {
	    return key._reactInternalInstance !== undefined;
	  },

	  set: function(key, value) {
	    key._reactInternalInstance = value;
	  }

	};

	module.exports = ReactInstanceMap;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactUpdates
	 */

	'use strict';

	var CallbackQueue = __webpack_require__(74);
	var PooledClass = __webpack_require__(56);
	var ReactCurrentOwner = __webpack_require__(64);
	var ReactPerf = __webpack_require__(75);
	var ReactReconciler = __webpack_require__(76);
	var Transaction = __webpack_require__(83);

	var assign = __webpack_require__(62);
	var invariant = __webpack_require__(54);
	var warning = __webpack_require__(59);

	var dirtyComponents = [];
	var asapCallbackQueue = CallbackQueue.getPooled();
	var asapEnqueued = false;

	var batchingStrategy = null;

	function ensureInjected() {
	  (false ? invariant(
	    ReactUpdates.ReactReconcileTransaction && batchingStrategy,
	    'ReactUpdates: must inject a reconcile transaction class and batching ' +
	    'strategy'
	  ) : invariant(ReactUpdates.ReactReconcileTransaction && batchingStrategy));
	}

	var NESTED_UPDATES = {
	  initialize: function() {
	    this.dirtyComponentsLength = dirtyComponents.length;
	  },
	  close: function() {
	    if (this.dirtyComponentsLength !== dirtyComponents.length) {
	      // Additional updates were enqueued by componentDidUpdate handlers or
	      // similar; before our own UPDATE_QUEUEING wrapper closes, we want to run
	      // these new updates so that if A's componentDidUpdate calls setState on
	      // B, B will update before the callback A's updater provided when calling
	      // setState.
	      dirtyComponents.splice(0, this.dirtyComponentsLength);
	      flushBatchedUpdates();
	    } else {
	      dirtyComponents.length = 0;
	    }
	  }
	};

	var UPDATE_QUEUEING = {
	  initialize: function() {
	    this.callbackQueue.reset();
	  },
	  close: function() {
	    this.callbackQueue.notifyAll();
	  }
	};

	var TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING];

	function ReactUpdatesFlushTransaction() {
	  this.reinitializeTransaction();
	  this.dirtyComponentsLength = null;
	  this.callbackQueue = CallbackQueue.getPooled();
	  this.reconcileTransaction =
	    ReactUpdates.ReactReconcileTransaction.getPooled();
	}

	assign(
	  ReactUpdatesFlushTransaction.prototype,
	  Transaction.Mixin, {
	  getTransactionWrappers: function() {
	    return TRANSACTION_WRAPPERS;
	  },

	  destructor: function() {
	    this.dirtyComponentsLength = null;
	    CallbackQueue.release(this.callbackQueue);
	    this.callbackQueue = null;
	    ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
	    this.reconcileTransaction = null;
	  },

	  perform: function(method, scope, a) {
	    // Essentially calls `this.reconcileTransaction.perform(method, scope, a)`
	    // with this transaction's wrappers around it.
	    return Transaction.Mixin.perform.call(
	      this,
	      this.reconcileTransaction.perform,
	      this.reconcileTransaction,
	      method,
	      scope,
	      a
	    );
	  }
	});

	PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);

	function batchedUpdates(callback, a, b, c, d) {
	  ensureInjected();
	  batchingStrategy.batchedUpdates(callback, a, b, c, d);
	}

	/**
	 * Array comparator for ReactComponents by mount ordering.
	 *
	 * @param {ReactComponent} c1 first component you're comparing
	 * @param {ReactComponent} c2 second component you're comparing
	 * @return {number} Return value usable by Array.prototype.sort().
	 */
	function mountOrderComparator(c1, c2) {
	  return c1._mountOrder - c2._mountOrder;
	}

	function runBatchedUpdates(transaction) {
	  var len = transaction.dirtyComponentsLength;
	  (false ? invariant(
	    len === dirtyComponents.length,
	    'Expected flush transaction\'s stored dirty-components length (%s) to ' +
	    'match dirty-components array length (%s).',
	    len,
	    dirtyComponents.length
	  ) : invariant(len === dirtyComponents.length));

	  // Since reconciling a component higher in the owner hierarchy usually (not
	  // always -- see shouldComponentUpdate()) will reconcile children, reconcile
	  // them before their children by sorting the array.
	  dirtyComponents.sort(mountOrderComparator);

	  for (var i = 0; i < len; i++) {
	    // If a component is unmounted before pending changes apply, it will still
	    // be here, but we assume that it has cleared its _pendingCallbacks and
	    // that performUpdateIfNecessary is a noop.
	    var component = dirtyComponents[i];

	    // If performUpdateIfNecessary happens to enqueue any new updates, we
	    // shouldn't execute the callbacks until the next render happens, so
	    // stash the callbacks first
	    var callbacks = component._pendingCallbacks;
	    component._pendingCallbacks = null;

	    ReactReconciler.performUpdateIfNecessary(
	      component,
	      transaction.reconcileTransaction
	    );

	    if (callbacks) {
	      for (var j = 0; j < callbacks.length; j++) {
	        transaction.callbackQueue.enqueue(
	          callbacks[j],
	          component.getPublicInstance()
	        );
	      }
	    }
	  }
	}

	var flushBatchedUpdates = function() {
	  // ReactUpdatesFlushTransaction's wrappers will clear the dirtyComponents
	  // array and perform any updates enqueued by mount-ready handlers (i.e.,
	  // componentDidUpdate) but we need to check here too in order to catch
	  // updates enqueued by setState callbacks and asap calls.
	  while (dirtyComponents.length || asapEnqueued) {
	    if (dirtyComponents.length) {
	      var transaction = ReactUpdatesFlushTransaction.getPooled();
	      transaction.perform(runBatchedUpdates, null, transaction);
	      ReactUpdatesFlushTransaction.release(transaction);
	    }

	    if (asapEnqueued) {
	      asapEnqueued = false;
	      var queue = asapCallbackQueue;
	      asapCallbackQueue = CallbackQueue.getPooled();
	      queue.notifyAll();
	      CallbackQueue.release(queue);
	    }
	  }
	};
	flushBatchedUpdates = ReactPerf.measure(
	  'ReactUpdates',
	  'flushBatchedUpdates',
	  flushBatchedUpdates
	);

	/**
	 * Mark a component as needing a rerender, adding an optional callback to a
	 * list of functions which will be executed once the rerender occurs.
	 */
	function enqueueUpdate(component) {
	  ensureInjected();

	  // Various parts of our code (such as ReactCompositeComponent's
	  // _renderValidatedComponent) assume that calls to render aren't nested;
	  // verify that that's the case. (This is called by each top-level update
	  // function, like setProps, setState, forceUpdate, etc.; creation and
	  // destruction of top-level components is guarded in ReactMount.)
	  (false ? warning(
	    ReactCurrentOwner.current == null,
	    'enqueueUpdate(): Render methods should be a pure function of props ' +
	    'and state; triggering nested component updates from render is not ' +
	    'allowed. If necessary, trigger nested updates in ' +
	    'componentDidUpdate.'
	  ) : null);

	  if (!batchingStrategy.isBatchingUpdates) {
	    batchingStrategy.batchedUpdates(enqueueUpdate, component);
	    return;
	  }

	  dirtyComponents.push(component);
	}

	/**
	 * Enqueue a callback to be run at the end of the current batching cycle. Throws
	 * if no updates are currently being performed.
	 */
	function asap(callback, context) {
	  (false ? invariant(
	    batchingStrategy.isBatchingUpdates,
	    'ReactUpdates.asap: Can\'t enqueue an asap callback in a context where' +
	    'updates are not being batched.'
	  ) : invariant(batchingStrategy.isBatchingUpdates));
	  asapCallbackQueue.enqueue(callback, context);
	  asapEnqueued = true;
	}

	var ReactUpdatesInjection = {
	  injectReconcileTransaction: function(ReconcileTransaction) {
	    (false ? invariant(
	      ReconcileTransaction,
	      'ReactUpdates: must provide a reconcile transaction class'
	    ) : invariant(ReconcileTransaction));
	    ReactUpdates.ReactReconcileTransaction = ReconcileTransaction;
	  },

	  injectBatchingStrategy: function(_batchingStrategy) {
	    (false ? invariant(
	      _batchingStrategy,
	      'ReactUpdates: must provide a batching strategy'
	    ) : invariant(_batchingStrategy));
	    (false ? invariant(
	      typeof _batchingStrategy.batchedUpdates === 'function',
	      'ReactUpdates: must provide a batchedUpdates() function'
	    ) : invariant(typeof _batchingStrategy.batchedUpdates === 'function'));
	    (false ? invariant(
	      typeof _batchingStrategy.isBatchingUpdates === 'boolean',
	      'ReactUpdates: must provide an isBatchingUpdates boolean attribute'
	    ) : invariant(typeof _batchingStrategy.isBatchingUpdates === 'boolean'));
	    batchingStrategy = _batchingStrategy;
	  }
	};

	var ReactUpdates = {
	  /**
	   * React references `ReactReconcileTransaction` using this property in order
	   * to allow dependency injection.
	   *
	   * @internal
	   */
	  ReactReconcileTransaction: null,

	  batchedUpdates: batchedUpdates,
	  enqueueUpdate: enqueueUpdate,
	  flushBatchedUpdates: flushBatchedUpdates,
	  injection: ReactUpdatesInjection,
	  asap: asap
	};

	module.exports = ReactUpdates;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CallbackQueue
	 */

	'use strict';

	var PooledClass = __webpack_require__(56);

	var assign = __webpack_require__(62);
	var invariant = __webpack_require__(54);

	/**
	 * A specialized pseudo-event module to help keep track of components waiting to
	 * be notified when their DOM representations are available for use.
	 *
	 * This implements `PooledClass`, so you should never need to instantiate this.
	 * Instead, use `CallbackQueue.getPooled()`.
	 *
	 * @class ReactMountReady
	 * @implements PooledClass
	 * @internal
	 */
	function CallbackQueue() {
	  this._callbacks = null;
	  this._contexts = null;
	}

	assign(CallbackQueue.prototype, {

	  /**
	   * Enqueues a callback to be invoked when `notifyAll` is invoked.
	   *
	   * @param {function} callback Invoked when `notifyAll` is invoked.
	   * @param {?object} context Context to call `callback` with.
	   * @internal
	   */
	  enqueue: function(callback, context) {
	    this._callbacks = this._callbacks || [];
	    this._contexts = this._contexts || [];
	    this._callbacks.push(callback);
	    this._contexts.push(context);
	  },

	  /**
	   * Invokes all enqueued callbacks and clears the queue. This is invoked after
	   * the DOM representation of a component has been created or updated.
	   *
	   * @internal
	   */
	  notifyAll: function() {
	    var callbacks = this._callbacks;
	    var contexts = this._contexts;
	    if (callbacks) {
	      (false ? invariant(
	        callbacks.length === contexts.length,
	        'Mismatched list of contexts in callback queue'
	      ) : invariant(callbacks.length === contexts.length));
	      this._callbacks = null;
	      this._contexts = null;
	      for (var i = 0, l = callbacks.length; i < l; i++) {
	        callbacks[i].call(contexts[i]);
	      }
	      callbacks.length = 0;
	      contexts.length = 0;
	    }
	  },

	  /**
	   * Resets the internal queue.
	   *
	   * @internal
	   */
	  reset: function() {
	    this._callbacks = null;
	    this._contexts = null;
	  },

	  /**
	   * `PooledClass` looks for this.
	   */
	  destructor: function() {
	    this.reset();
	  }

	});

	PooledClass.addPoolingTo(CallbackQueue);

	module.exports = CallbackQueue;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPerf
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * ReactPerf is a general AOP system designed to measure performance. This
	 * module only has the hooks: see ReactDefaultPerf for the analysis tool.
	 */
	var ReactPerf = {
	  /**
	   * Boolean to enable/disable measurement. Set to false by default to prevent
	   * accidental logging and perf loss.
	   */
	  enableMeasure: false,

	  /**
	   * Holds onto the measure function in use. By default, don't measure
	   * anything, but we'll override this if we inject a measure function.
	   */
	  storedMeasure: _noMeasure,

	  /**
	   * @param {object} object
	   * @param {string} objectName
	   * @param {object<string>} methodNames
	   */
	  measureMethods: function(object, objectName, methodNames) {
	    if (false) {
	      for (var key in methodNames) {
	        if (!methodNames.hasOwnProperty(key)) {
	          continue;
	        }
	        object[key] = ReactPerf.measure(
	          objectName,
	          methodNames[key],
	          object[key]
	        );
	      }
	    }
	  },

	  /**
	   * Use this to wrap methods you want to measure. Zero overhead in production.
	   *
	   * @param {string} objName
	   * @param {string} fnName
	   * @param {function} func
	   * @return {function}
	   */
	  measure: function(objName, fnName, func) {
	    if (false) {
	      var measuredFunc = null;
	      var wrapper = function() {
	        if (ReactPerf.enableMeasure) {
	          if (!measuredFunc) {
	            measuredFunc = ReactPerf.storedMeasure(objName, fnName, func);
	          }
	          return measuredFunc.apply(this, arguments);
	        }
	        return func.apply(this, arguments);
	      };
	      wrapper.displayName = objName + '_' + fnName;
	      return wrapper;
	    }
	    return func;
	  },

	  injection: {
	    /**
	     * @param {function} measure
	     */
	    injectMeasure: function(measure) {
	      ReactPerf.storedMeasure = measure;
	    }
	  }
	};

	/**
	 * Simply passes through the measured function, without measuring it.
	 *
	 * @param {string} objName
	 * @param {string} fnName
	 * @param {function} func
	 * @return {function}
	 */
	function _noMeasure(objName, fnName, func) {
	  return func;
	}

	module.exports = ReactPerf;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactReconciler
	 */

	'use strict';

	var ReactRef = __webpack_require__(77);
	var ReactElementValidator = __webpack_require__(79);

	/**
	 * Helper to call ReactRef.attachRefs with this composite component, split out
	 * to avoid allocations in the transaction mount-ready queue.
	 */
	function attachRefs() {
	  ReactRef.attachRefs(this, this._currentElement);
	}

	var ReactReconciler = {

	  /**
	   * Initializes the component, renders markup, and registers event listeners.
	   *
	   * @param {ReactComponent} internalInstance
	   * @param {string} rootID DOM ID of the root node.
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @return {?string} Rendered markup to be inserted into the DOM.
	   * @final
	   * @internal
	   */
	  mountComponent: function(internalInstance, rootID, transaction, context) {
	    var markup = internalInstance.mountComponent(rootID, transaction, context);
	    if (false) {
	      ReactElementValidator.checkAndWarnForMutatedProps(
	        internalInstance._currentElement
	      );
	    }
	    transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
	    return markup;
	  },

	  /**
	   * Releases any resources allocated by `mountComponent`.
	   *
	   * @final
	   * @internal
	   */
	  unmountComponent: function(internalInstance) {
	    ReactRef.detachRefs(internalInstance, internalInstance._currentElement);
	    internalInstance.unmountComponent();
	  },

	  /**
	   * Update a component using a new element.
	   *
	   * @param {ReactComponent} internalInstance
	   * @param {ReactElement} nextElement
	   * @param {ReactReconcileTransaction} transaction
	   * @param {object} context
	   * @internal
	   */
	  receiveComponent: function(
	    internalInstance, nextElement, transaction, context
	  ) {
	    var prevElement = internalInstance._currentElement;

	    if (nextElement === prevElement && nextElement._owner != null) {
	      // Since elements are immutable after the owner is rendered,
	      // we can do a cheap identity compare here to determine if this is a
	      // superfluous reconcile. It's possible for state to be mutable but such
	      // change should trigger an update of the owner which would recreate
	      // the element. We explicitly check for the existence of an owner since
	      // it's possible for an element created outside a composite to be
	      // deeply mutated and reused.
	      return;
	    }

	    if (false) {
	      ReactElementValidator.checkAndWarnForMutatedProps(nextElement);
	    }

	    var refsChanged = ReactRef.shouldUpdateRefs(
	      prevElement,
	      nextElement
	    );

	    if (refsChanged) {
	      ReactRef.detachRefs(internalInstance, prevElement);
	    }

	    internalInstance.receiveComponent(nextElement, transaction, context);

	    if (refsChanged) {
	      transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
	    }
	  },

	  /**
	   * Flush any dirty changes in a component.
	   *
	   * @param {ReactComponent} internalInstance
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   */
	  performUpdateIfNecessary: function(
	    internalInstance,
	    transaction
	  ) {
	    internalInstance.performUpdateIfNecessary(transaction);
	  }

	};

	module.exports = ReactReconciler;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactRef
	 */

	'use strict';

	var ReactOwner = __webpack_require__(78);

	var ReactRef = {};

	function attachRef(ref, component, owner) {
	  if (typeof ref === 'function') {
	    ref(component.getPublicInstance());
	  } else {
	    // Legacy ref
	    ReactOwner.addComponentAsRefTo(component, ref, owner);
	  }
	}

	function detachRef(ref, component, owner) {
	  if (typeof ref === 'function') {
	    ref(null);
	  } else {
	    // Legacy ref
	    ReactOwner.removeComponentAsRefFrom(component, ref, owner);
	  }
	}

	ReactRef.attachRefs = function(instance, element) {
	  var ref = element.ref;
	  if (ref != null) {
	    attachRef(ref, instance, element._owner);
	  }
	};

	ReactRef.shouldUpdateRefs = function(prevElement, nextElement) {
	  // If either the owner or a `ref` has changed, make sure the newest owner
	  // has stored a reference to `this`, and the previous owner (if different)
	  // has forgotten the reference to `this`. We use the element instead
	  // of the public this.props because the post processing cannot determine
	  // a ref. The ref conceptually lives on the element.

	  // TODO: Should this even be possible? The owner cannot change because
	  // it's forbidden by shouldUpdateReactComponent. The ref can change
	  // if you swap the keys of but not the refs. Reconsider where this check
	  // is made. It probably belongs where the key checking and
	  // instantiateReactComponent is done.

	  return (
	    nextElement._owner !== prevElement._owner ||
	    nextElement.ref !== prevElement.ref
	  );
	};

	ReactRef.detachRefs = function(instance, element) {
	  var ref = element.ref;
	  if (ref != null) {
	    detachRef(ref, instance, element._owner);
	  }
	};

	module.exports = ReactRef;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactOwner
	 */

	'use strict';

	var invariant = __webpack_require__(54);

	/**
	 * ReactOwners are capable of storing references to owned components.
	 *
	 * All components are capable of //being// referenced by owner components, but
	 * only ReactOwner components are capable of //referencing// owned components.
	 * The named reference is known as a "ref".
	 *
	 * Refs are available when mounted and updated during reconciliation.
	 *
	 *   var MyComponent = React.createClass({
	 *     render: function() {
	 *       return (
	 *         <div onClick={this.handleClick}>
	 *           <CustomComponent ref="custom" />
	 *         </div>
	 *       );
	 *     },
	 *     handleClick: function() {
	 *       this.refs.custom.handleClick();
	 *     },
	 *     componentDidMount: function() {
	 *       this.refs.custom.initialize();
	 *     }
	 *   });
	 *
	 * Refs should rarely be used. When refs are used, they should only be done to
	 * control data that is not handled by React's data flow.
	 *
	 * @class ReactOwner
	 */
	var ReactOwner = {

	  /**
	   * @param {?object} object
	   * @return {boolean} True if `object` is a valid owner.
	   * @final
	   */
	  isValidOwner: function(object) {
	    return !!(
	      (object &&
	      typeof object.attachRef === 'function' && typeof object.detachRef === 'function')
	    );
	  },

	  /**
	   * Adds a component by ref to an owner component.
	   *
	   * @param {ReactComponent} component Component to reference.
	   * @param {string} ref Name by which to refer to the component.
	   * @param {ReactOwner} owner Component on which to record the ref.
	   * @final
	   * @internal
	   */
	  addComponentAsRefTo: function(component, ref, owner) {
	    (false ? invariant(
	      ReactOwner.isValidOwner(owner),
	      'addComponentAsRefTo(...): Only a ReactOwner can have refs. This ' +
	      'usually means that you\'re trying to add a ref to a component that ' +
	      'doesn\'t have an owner (that is, was not created inside of another ' +
	      'component\'s `render` method). Try rendering this component inside of ' +
	      'a new top-level component which will hold the ref.'
	    ) : invariant(ReactOwner.isValidOwner(owner)));
	    owner.attachRef(ref, component);
	  },

	  /**
	   * Removes a component by ref from an owner component.
	   *
	   * @param {ReactComponent} component Component to dereference.
	   * @param {string} ref Name of the ref to remove.
	   * @param {ReactOwner} owner Component on which the ref is recorded.
	   * @final
	   * @internal
	   */
	  removeComponentAsRefFrom: function(component, ref, owner) {
	    (false ? invariant(
	      ReactOwner.isValidOwner(owner),
	      'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. This ' +
	      'usually means that you\'re trying to remove a ref to a component that ' +
	      'doesn\'t have an owner (that is, was not created inside of another ' +
	      'component\'s `render` method). Try rendering this component inside of ' +
	      'a new top-level component which will hold the ref.'
	    ) : invariant(ReactOwner.isValidOwner(owner)));
	    // Check that `component` is still the current ref because we do not want to
	    // detach the ref if another component stole it.
	    if (owner.getPublicInstance().refs[ref] === component.getPublicInstance()) {
	      owner.detachRef(ref);
	    }
	  }

	};

	module.exports = ReactOwner;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactElementValidator
	 */

	/**
	 * ReactElementValidator provides a wrapper around a element factory
	 * which validates the props passed to the element. This is intended to be
	 * used only in DEV and could be replaced by a static type checker for languages
	 * that support it.
	 */

	'use strict';

	var ReactElement = __webpack_require__(58);
	var ReactFragment = __webpack_require__(57);
	var ReactPropTypeLocations = __webpack_require__(80);
	var ReactPropTypeLocationNames = __webpack_require__(81);
	var ReactCurrentOwner = __webpack_require__(64);
	var ReactNativeComponent = __webpack_require__(82);

	var getIteratorFn = __webpack_require__(68);
	var invariant = __webpack_require__(54);
	var warning = __webpack_require__(59);

	function getDeclarationErrorAddendum() {
	  if (ReactCurrentOwner.current) {
	    var name = ReactCurrentOwner.current.getName();
	    if (name) {
	      return ' Check the render method of `' + name + '`.';
	    }
	  }
	  return '';
	}

	/**
	 * Warn if there's no key explicitly set on dynamic arrays of children or
	 * object keys are not valid. This allows us to keep track of children between
	 * updates.
	 */
	var ownerHasKeyUseWarning = {};

	var loggedTypeFailures = {};

	var NUMERIC_PROPERTY_REGEX = /^\d+$/;

	/**
	 * Gets the instance's name for use in warnings.
	 *
	 * @internal
	 * @return {?string} Display name or undefined
	 */
	function getName(instance) {
	  var publicInstance = instance && instance.getPublicInstance();
	  if (!publicInstance) {
	    return undefined;
	  }
	  var constructor = publicInstance.constructor;
	  if (!constructor) {
	    return undefined;
	  }
	  return constructor.displayName || constructor.name || undefined;
	}

	/**
	 * Gets the current owner's displayName for use in warnings.
	 *
	 * @internal
	 * @return {?string} Display name or undefined
	 */
	function getCurrentOwnerDisplayName() {
	  var current = ReactCurrentOwner.current;
	  return (
	    current && getName(current) || undefined
	  );
	}

	/**
	 * Warn if the element doesn't have an explicit key assigned to it.
	 * This element is in an array. The array could grow and shrink or be
	 * reordered. All children that haven't already been validated are required to
	 * have a "key" property assigned to it.
	 *
	 * @internal
	 * @param {ReactElement} element Element that requires a key.
	 * @param {*} parentType element's parent's type.
	 */
	function validateExplicitKey(element, parentType) {
	  if (element._store.validated || element.key != null) {
	    return;
	  }
	  element._store.validated = true;

	  warnAndMonitorForKeyUse(
	    'Each child in an array or iterator should have a unique "key" prop.',
	    element,
	    parentType
	  );
	}

	/**
	 * Warn if the key is being defined as an object property but has an incorrect
	 * value.
	 *
	 * @internal
	 * @param {string} name Property name of the key.
	 * @param {ReactElement} element Component that requires a key.
	 * @param {*} parentType element's parent's type.
	 */
	function validatePropertyKey(name, element, parentType) {
	  if (!NUMERIC_PROPERTY_REGEX.test(name)) {
	    return;
	  }
	  warnAndMonitorForKeyUse(
	    'Child objects should have non-numeric keys so ordering is preserved.',
	    element,
	    parentType
	  );
	}

	/**
	 * Shared warning and monitoring code for the key warnings.
	 *
	 * @internal
	 * @param {string} message The base warning that gets output.
	 * @param {ReactElement} element Component that requires a key.
	 * @param {*} parentType element's parent's type.
	 */
	function warnAndMonitorForKeyUse(message, element, parentType) {
	  var ownerName = getCurrentOwnerDisplayName();
	  var parentName = typeof parentType === 'string' ?
	    parentType : parentType.displayName || parentType.name;

	  var useName = ownerName || parentName;
	  var memoizer = ownerHasKeyUseWarning[message] || (
	    (ownerHasKeyUseWarning[message] = {})
	  );
	  if (memoizer.hasOwnProperty(useName)) {
	    return;
	  }
	  memoizer[useName] = true;

	  var parentOrOwnerAddendum =
	    ownerName ? (" Check the render method of " + ownerName + ".") :
	    parentName ? (" Check the React.render call using <" + parentName + ">.") :
	    '';

	  // Usually the current owner is the offender, but if it accepts children as a
	  // property, it may be the creator of the child that's responsible for
	  // assigning it a key.
	  var childOwnerAddendum = '';
	  if (element &&
	      element._owner &&
	      element._owner !== ReactCurrentOwner.current) {
	    // Name of the component that originally created this child.
	    var childOwnerName = getName(element._owner);

	    childOwnerAddendum = (" It was passed a child from " + childOwnerName + ".");
	  }

	  (false ? warning(
	    false,
	    message + '%s%s See https://fb.me/react-warning-keys for more information.',
	    parentOrOwnerAddendum,
	    childOwnerAddendum
	  ) : null);
	}

	/**
	 * Ensure that every element either is passed in a static location, in an
	 * array with an explicit keys property defined, or in an object literal
	 * with valid key property.
	 *
	 * @internal
	 * @param {ReactNode} node Statically passed child of any type.
	 * @param {*} parentType node's parent's type.
	 */
	function validateChildKeys(node, parentType) {
	  if (Array.isArray(node)) {
	    for (var i = 0; i < node.length; i++) {
	      var child = node[i];
	      if (ReactElement.isValidElement(child)) {
	        validateExplicitKey(child, parentType);
	      }
	    }
	  } else if (ReactElement.isValidElement(node)) {
	    // This element was passed in a valid location.
	    node._store.validated = true;
	  } else if (node) {
	    var iteratorFn = getIteratorFn(node);
	    // Entry iterators provide implicit keys.
	    if (iteratorFn) {
	      if (iteratorFn !== node.entries) {
	        var iterator = iteratorFn.call(node);
	        var step;
	        while (!(step = iterator.next()).done) {
	          if (ReactElement.isValidElement(step.value)) {
	            validateExplicitKey(step.value, parentType);
	          }
	        }
	      }
	    } else if (typeof node === 'object') {
	      var fragment = ReactFragment.extractIfFragment(node);
	      for (var key in fragment) {
	        if (fragment.hasOwnProperty(key)) {
	          validatePropertyKey(key, fragment[key], parentType);
	        }
	      }
	    }
	  }
	}

	/**
	 * Assert that the props are valid
	 *
	 * @param {string} componentName Name of the component for error messages.
	 * @param {object} propTypes Map of prop name to a ReactPropType
	 * @param {object} props
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @private
	 */
	function checkPropTypes(componentName, propTypes, props, location) {
	  for (var propName in propTypes) {
	    if (propTypes.hasOwnProperty(propName)) {
	      var error;
	      // Prop type validation may throw. In case they do, we don't want to
	      // fail the render phase where it didn't fail before. So we log it.
	      // After these have been cleaned up, we'll let them throw.
	      try {
	        // This is intentionally an invariant that gets caught. It's the same
	        // behavior as without this statement except with a better message.
	        (false ? invariant(
	          typeof propTypes[propName] === 'function',
	          '%s: %s type `%s` is invalid; it must be a function, usually from ' +
	          'React.PropTypes.',
	          componentName || 'React class',
	          ReactPropTypeLocationNames[location],
	          propName
	        ) : invariant(typeof propTypes[propName] === 'function'));
	        error = propTypes[propName](props, propName, componentName, location);
	      } catch (ex) {
	        error = ex;
	      }
	      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	        // Only monitor this failure once because there tends to be a lot of the
	        // same error.
	        loggedTypeFailures[error.message] = true;

	        var addendum = getDeclarationErrorAddendum(this);
	        (false ? warning(false, 'Failed propType: %s%s', error.message, addendum) : null);
	      }
	    }
	  }
	}

	var warnedPropsMutations = {};

	/**
	 * Warn about mutating props when setting `propName` on `element`.
	 *
	 * @param {string} propName The string key within props that was set
	 * @param {ReactElement} element
	 */
	function warnForPropsMutation(propName, element) {
	  var type = element.type;
	  var elementName = typeof type === 'string' ? type : type.displayName;
	  var ownerName = element._owner ?
	    element._owner.getPublicInstance().constructor.displayName : null;

	  var warningKey = propName + '|' + elementName + '|' + ownerName;
	  if (warnedPropsMutations.hasOwnProperty(warningKey)) {
	    return;
	  }
	  warnedPropsMutations[warningKey] = true;

	  var elementInfo = '';
	  if (elementName) {
	    elementInfo = ' <' + elementName + ' />';
	  }
	  var ownerInfo = '';
	  if (ownerName) {
	    ownerInfo = ' The element was created by ' + ownerName + '.';
	  }

	  (false ? warning(
	    false,
	    'Don\'t set .props.%s of the React component%s. Instead, specify the ' +
	    'correct value when initially creating the element or use ' +
	    'React.cloneElement to make a new element with updated props.%s',
	    propName,
	    elementInfo,
	    ownerInfo
	  ) : null);
	}

	// Inline Object.is polyfill
	function is(a, b) {
	  if (a !== a) {
	    // NaN
	    return b !== b;
	  }
	  if (a === 0 && b === 0) {
	    // +-0
	    return 1 / a === 1 / b;
	  }
	  return a === b;
	}

	/**
	 * Given an element, check if its props have been mutated since element
	 * creation (or the last call to this function). In particular, check if any
	 * new props have been added, which we can't directly catch by defining warning
	 * properties on the props object.
	 *
	 * @param {ReactElement} element
	 */
	function checkAndWarnForMutatedProps(element) {
	  if (!element._store) {
	    // Element was created using `new ReactElement` directly or with
	    // `ReactElement.createElement`; skip mutation checking
	    return;
	  }

	  var originalProps = element._store.originalProps;
	  var props = element.props;

	  for (var propName in props) {
	    if (props.hasOwnProperty(propName)) {
	      if (!originalProps.hasOwnProperty(propName) ||
	          !is(originalProps[propName], props[propName])) {
	        warnForPropsMutation(propName, element);

	        // Copy over the new value so that the two props objects match again
	        originalProps[propName] = props[propName];
	      }
	    }
	  }
	}

	/**
	 * Given an element, validate that its props follow the propTypes definition,
	 * provided by the type.
	 *
	 * @param {ReactElement} element
	 */
	function validatePropTypes(element) {
	  if (element.type == null) {
	    // This has already warned. Don't throw.
	    return;
	  }
	  // Extract the component class from the element. Converts string types
	  // to a composite class which may have propTypes.
	  // TODO: Validating a string's propTypes is not decoupled from the
	  // rendering target which is problematic.
	  var componentClass = ReactNativeComponent.getComponentClassForElement(
	    element
	  );
	  var name = componentClass.displayName || componentClass.name;
	  if (componentClass.propTypes) {
	    checkPropTypes(
	      name,
	      componentClass.propTypes,
	      element.props,
	      ReactPropTypeLocations.prop
	    );
	  }
	  if (typeof componentClass.getDefaultProps === 'function') {
	    (false ? warning(
	      componentClass.getDefaultProps.isReactClassApproved,
	      'getDefaultProps is only used on classic React.createClass ' +
	      'definitions. Use a static property named `defaultProps` instead.'
	    ) : null);
	  }
	}

	var ReactElementValidator = {

	  checkAndWarnForMutatedProps: checkAndWarnForMutatedProps,

	  createElement: function(type, props, children) {
	    // We warn in this case but don't throw. We expect the element creation to
	    // succeed and there will likely be errors in render.
	    (false ? warning(
	      type != null,
	      'React.createElement: type should not be null or undefined. It should ' +
	        'be a string (for DOM elements) or a ReactClass (for composite ' +
	        'components).'
	    ) : null);

	    var element = ReactElement.createElement.apply(this, arguments);

	    // The result can be nullish if a mock or a custom function is used.
	    // TODO: Drop this when these are no longer allowed as the type argument.
	    if (element == null) {
	      return element;
	    }

	    for (var i = 2; i < arguments.length; i++) {
	      validateChildKeys(arguments[i], type);
	    }

	    validatePropTypes(element);

	    return element;
	  },

	  createFactory: function(type) {
	    var validatedFactory = ReactElementValidator.createElement.bind(
	      null,
	      type
	    );
	    // Legacy hook TODO: Warn if this is accessed
	    validatedFactory.type = type;

	    if (false) {
	      try {
	        Object.defineProperty(
	          validatedFactory,
	          'type',
	          {
	            enumerable: false,
	            get: function() {
	              ("production" !== process.env.NODE_ENV ? warning(
	                false,
	                'Factory.type is deprecated. Access the class directly ' +
	                'before passing it to createFactory.'
	              ) : null);
	              Object.defineProperty(this, 'type', {
	                value: type
	              });
	              return type;
	            }
	          }
	        );
	      } catch (x) {
	        // IE will fail on defineProperty (es5-shim/sham too)
	      }
	    }


	    return validatedFactory;
	  },

	  cloneElement: function(element, props, children) {
	    var newElement = ReactElement.cloneElement.apply(this, arguments);
	    for (var i = 2; i < arguments.length; i++) {
	      validateChildKeys(arguments[i], newElement.type);
	    }
	    validatePropTypes(newElement);
	    return newElement;
	  }

	};

	module.exports = ReactElementValidator;


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypeLocations
	 */

	'use strict';

	var keyMirror = __webpack_require__(53);

	var ReactPropTypeLocations = keyMirror({
	  prop: null,
	  context: null,
	  childContext: null
	});

	module.exports = ReactPropTypeLocations;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypeLocationNames
	 */

	'use strict';

	var ReactPropTypeLocationNames = {};

	if (false) {
	  ReactPropTypeLocationNames = {
	    prop: 'prop',
	    context: 'context',
	    childContext: 'child context'
	  };
	}

	module.exports = ReactPropTypeLocationNames;


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactNativeComponent
	 */

	'use strict';

	var assign = __webpack_require__(62);
	var invariant = __webpack_require__(54);

	var autoGenerateWrapperClass = null;
	var genericComponentClass = null;
	// This registry keeps track of wrapper classes around native tags
	var tagToComponentClass = {};
	var textComponentClass = null;

	var ReactNativeComponentInjection = {
	  // This accepts a class that receives the tag string. This is a catch all
	  // that can render any kind of tag.
	  injectGenericComponentClass: function(componentClass) {
	    genericComponentClass = componentClass;
	  },
	  // This accepts a text component class that takes the text string to be
	  // rendered as props.
	  injectTextComponentClass: function(componentClass) {
	    textComponentClass = componentClass;
	  },
	  // This accepts a keyed object with classes as values. Each key represents a
	  // tag. That particular tag will use this class instead of the generic one.
	  injectComponentClasses: function(componentClasses) {
	    assign(tagToComponentClass, componentClasses);
	  },
	  // Temporary hack since we expect DOM refs to behave like composites,
	  // for this release.
	  injectAutoWrapper: function(wrapperFactory) {
	    autoGenerateWrapperClass = wrapperFactory;
	  }
	};

	/**
	 * Get a composite component wrapper class for a specific tag.
	 *
	 * @param {ReactElement} element The tag for which to get the class.
	 * @return {function} The React class constructor function.
	 */
	function getComponentClassForElement(element) {
	  if (typeof element.type === 'function') {
	    return element.type;
	  }
	  var tag = element.type;
	  var componentClass = tagToComponentClass[tag];
	  if (componentClass == null) {
	    tagToComponentClass[tag] = componentClass = autoGenerateWrapperClass(tag);
	  }
	  return componentClass;
	}

	/**
	 * Get a native internal component class for a specific tag.
	 *
	 * @param {ReactElement} element The element to create.
	 * @return {function} The internal class constructor function.
	 */
	function createInternalComponent(element) {
	  (false ? invariant(
	    genericComponentClass,
	    'There is no registered component for the tag %s',
	    element.type
	  ) : invariant(genericComponentClass));
	  return new genericComponentClass(element.type, element.props);
	}

	/**
	 * @param {ReactText} text
	 * @return {ReactComponent}
	 */
	function createInstanceForText(text) {
	  return new textComponentClass(text);
	}

	/**
	 * @param {ReactComponent} component
	 * @return {boolean}
	 */
	function isTextComponent(component) {
	  return component instanceof textComponentClass;
	}

	var ReactNativeComponent = {
	  getComponentClassForElement: getComponentClassForElement,
	  createInternalComponent: createInternalComponent,
	  createInstanceForText: createInstanceForText,
	  isTextComponent: isTextComponent,
	  injection: ReactNativeComponentInjection
	};

	module.exports = ReactNativeComponent;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Transaction
	 */

	'use strict';

	var invariant = __webpack_require__(54);

	/**
	 * `Transaction` creates a black box that is able to wrap any method such that
	 * certain invariants are maintained before and after the method is invoked
	 * (Even if an exception is thrown while invoking the wrapped method). Whoever
	 * instantiates a transaction can provide enforcers of the invariants at
	 * creation time. The `Transaction` class itself will supply one additional
	 * automatic invariant for you - the invariant that any transaction instance
	 * should not be run while it is already being run. You would typically create a
	 * single instance of a `Transaction` for reuse multiple times, that potentially
	 * is used to wrap several different methods. Wrappers are extremely simple -
	 * they only require implementing two methods.
	 *
	 * <pre>
	 *                       wrappers (injected at creation time)
	 *                                      +        +
	 *                                      |        |
	 *                    +-----------------|--------|--------------+
	 *                    |                 v        |              |
	 *                    |      +---------------+   |              |
	 *                    |   +--|    wrapper1   |---|----+         |
	 *                    |   |  +---------------+   v    |         |
	 *                    |   |          +-------------+  |         |
	 *                    |   |     +----|   wrapper2  |--------+   |
	 *                    |   |     |    +-------------+  |     |   |
	 *                    |   |     |                     |     |   |
	 *                    |   v     v                     v     v   | wrapper
	 *                    | +---+ +---+   +---------+   +---+ +---+ | invariants
	 * perform(anyMethod) | |   | |   |   |         |   |   | |   | | maintained
	 * +----------------->|-|---|-|---|-->|anyMethod|---|---|-|---|-|-------->
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | |   | |   |   |         |   |   | |   | |
	 *                    | +---+ +---+   +---------+   +---+ +---+ |
	 *                    |  initialize                    close    |
	 *                    +-----------------------------------------+
	 * </pre>
	 *
	 * Use cases:
	 * - Preserving the input selection ranges before/after reconciliation.
	 *   Restoring selection even in the event of an unexpected error.
	 * - Deactivating events while rearranging the DOM, preventing blurs/focuses,
	 *   while guaranteeing that afterwards, the event system is reactivated.
	 * - Flushing a queue of collected DOM mutations to the main UI thread after a
	 *   reconciliation takes place in a worker thread.
	 * - Invoking any collected `componentDidUpdate` callbacks after rendering new
	 *   content.
	 * - (Future use case): Wrapping particular flushes of the `ReactWorker` queue
	 *   to preserve the `scrollTop` (an automatic scroll aware DOM).
	 * - (Future use case): Layout calculations before and after DOM updates.
	 *
	 * Transactional plugin API:
	 * - A module that has an `initialize` method that returns any precomputation.
	 * - and a `close` method that accepts the precomputation. `close` is invoked
	 *   when the wrapped process is completed, or has failed.
	 *
	 * @param {Array<TransactionalWrapper>} transactionWrapper Wrapper modules
	 * that implement `initialize` and `close`.
	 * @return {Transaction} Single transaction for reuse in thread.
	 *
	 * @class Transaction
	 */
	var Mixin = {
	  /**
	   * Sets up this instance so that it is prepared for collecting metrics. Does
	   * so such that this setup method may be used on an instance that is already
	   * initialized, in a way that does not consume additional memory upon reuse.
	   * That can be useful if you decide to make your subclass of this mixin a
	   * "PooledClass".
	   */
	  reinitializeTransaction: function() {
	    this.transactionWrappers = this.getTransactionWrappers();
	    if (!this.wrapperInitData) {
	      this.wrapperInitData = [];
	    } else {
	      this.wrapperInitData.length = 0;
	    }
	    this._isInTransaction = false;
	  },

	  _isInTransaction: false,

	  /**
	   * @abstract
	   * @return {Array<TransactionWrapper>} Array of transaction wrappers.
	   */
	  getTransactionWrappers: null,

	  isInTransaction: function() {
	    return !!this._isInTransaction;
	  },

	  /**
	   * Executes the function within a safety window. Use this for the top level
	   * methods that result in large amounts of computation/mutations that would
	   * need to be safety checked.
	   *
	   * @param {function} method Member of scope to call.
	   * @param {Object} scope Scope to invoke from.
	   * @param {Object?=} args... Arguments to pass to the method (optional).
	   *                           Helps prevent need to bind in many cases.
	   * @return Return value from `method`.
	   */
	  perform: function(method, scope, a, b, c, d, e, f) {
	    (false ? invariant(
	      !this.isInTransaction(),
	      'Transaction.perform(...): Cannot initialize a transaction when there ' +
	      'is already an outstanding transaction.'
	    ) : invariant(!this.isInTransaction()));
	    var errorThrown;
	    var ret;
	    try {
	      this._isInTransaction = true;
	      // Catching errors makes debugging more difficult, so we start with
	      // errorThrown set to true before setting it to false after calling
	      // close -- if it's still set to true in the finally block, it means
	      // one of these calls threw.
	      errorThrown = true;
	      this.initializeAll(0);
	      ret = method.call(scope, a, b, c, d, e, f);
	      errorThrown = false;
	    } finally {
	      try {
	        if (errorThrown) {
	          // If `method` throws, prefer to show that stack trace over any thrown
	          // by invoking `closeAll`.
	          try {
	            this.closeAll(0);
	          } catch (err) {
	          }
	        } else {
	          // Since `method` didn't throw, we don't want to silence the exception
	          // here.
	          this.closeAll(0);
	        }
	      } finally {
	        this._isInTransaction = false;
	      }
	    }
	    return ret;
	  },

	  initializeAll: function(startIndex) {
	    var transactionWrappers = this.transactionWrappers;
	    for (var i = startIndex; i < transactionWrappers.length; i++) {
	      var wrapper = transactionWrappers[i];
	      try {
	        // Catching errors makes debugging more difficult, so we start with the
	        // OBSERVED_ERROR state before overwriting it with the real return value
	        // of initialize -- if it's still set to OBSERVED_ERROR in the finally
	        // block, it means wrapper.initialize threw.
	        this.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
	        this.wrapperInitData[i] = wrapper.initialize ?
	          wrapper.initialize.call(this) :
	          null;
	      } finally {
	        if (this.wrapperInitData[i] === Transaction.OBSERVED_ERROR) {
	          // The initializer for wrapper i threw an error; initialize the
	          // remaining wrappers but silence any exceptions from them to ensure
	          // that the first error is the one to bubble up.
	          try {
	            this.initializeAll(i + 1);
	          } catch (err) {
	          }
	        }
	      }
	    }
	  },

	  /**
	   * Invokes each of `this.transactionWrappers.close[i]` functions, passing into
	   * them the respective return values of `this.transactionWrappers.init[i]`
	   * (`close`rs that correspond to initializers that failed will not be
	   * invoked).
	   */
	  closeAll: function(startIndex) {
	    (false ? invariant(
	      this.isInTransaction(),
	      'Transaction.closeAll(): Cannot close transaction when none are open.'
	    ) : invariant(this.isInTransaction()));
	    var transactionWrappers = this.transactionWrappers;
	    for (var i = startIndex; i < transactionWrappers.length; i++) {
	      var wrapper = transactionWrappers[i];
	      var initData = this.wrapperInitData[i];
	      var errorThrown;
	      try {
	        // Catching errors makes debugging more difficult, so we start with
	        // errorThrown set to true before setting it to false after calling
	        // close -- if it's still set to true in the finally block, it means
	        // wrapper.close threw.
	        errorThrown = true;
	        if (initData !== Transaction.OBSERVED_ERROR && wrapper.close) {
	          wrapper.close.call(this, initData);
	        }
	        errorThrown = false;
	      } finally {
	        if (errorThrown) {
	          // The closer for wrapper i threw an error; close the remaining
	          // wrappers but silence any exceptions from them to ensure that the
	          // first error is the one to bubble up.
	          try {
	            this.closeAll(i + 1);
	          } catch (e) {
	          }
	        }
	      }
	    }
	    this.wrapperInitData.length = 0;
	  }
	};

	var Transaction = {

	  Mixin: Mixin,

	  /**
	   * Token to look for to determine if an error occured.
	   */
	  OBSERVED_ERROR: {}

	};

	module.exports = Transaction;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactClass
	 */

	'use strict';

	var ReactComponent = __webpack_require__(69);
	var ReactCurrentOwner = __webpack_require__(64);
	var ReactElement = __webpack_require__(58);
	var ReactErrorUtils = __webpack_require__(85);
	var ReactInstanceMap = __webpack_require__(72);
	var ReactLifeCycle = __webpack_require__(71);
	var ReactPropTypeLocations = __webpack_require__(80);
	var ReactPropTypeLocationNames = __webpack_require__(81);
	var ReactUpdateQueue = __webpack_require__(70);

	var assign = __webpack_require__(62);
	var invariant = __webpack_require__(54);
	var keyMirror = __webpack_require__(53);
	var keyOf = __webpack_require__(86);
	var warning = __webpack_require__(59);

	var MIXINS_KEY = keyOf({mixins: null});

	/**
	 * Policies that describe methods in `ReactClassInterface`.
	 */
	var SpecPolicy = keyMirror({
	  /**
	   * These methods may be defined only once by the class specification or mixin.
	   */
	  DEFINE_ONCE: null,
	  /**
	   * These methods may be defined by both the class specification and mixins.
	   * Subsequent definitions will be chained. These methods must return void.
	   */
	  DEFINE_MANY: null,
	  /**
	   * These methods are overriding the base class.
	   */
	  OVERRIDE_BASE: null,
	  /**
	   * These methods are similar to DEFINE_MANY, except we assume they return
	   * objects. We try to merge the keys of the return values of all the mixed in
	   * functions. If there is a key conflict we throw.
	   */
	  DEFINE_MANY_MERGED: null
	});


	var injectedMixins = [];

	/**
	 * Composite components are higher-level components that compose other composite
	 * or native components.
	 *
	 * To create a new type of `ReactClass`, pass a specification of
	 * your new class to `React.createClass`. The only requirement of your class
	 * specification is that you implement a `render` method.
	 *
	 *   var MyComponent = React.createClass({
	 *     render: function() {
	 *       return <div>Hello World</div>;
	 *     }
	 *   });
	 *
	 * The class specification supports a specific protocol of methods that have
	 * special meaning (e.g. `render`). See `ReactClassInterface` for
	 * more the comprehensive protocol. Any other properties and methods in the
	 * class specification will available on the prototype.
	 *
	 * @interface ReactClassInterface
	 * @internal
	 */
	var ReactClassInterface = {

	  /**
	   * An array of Mixin objects to include when defining your component.
	   *
	   * @type {array}
	   * @optional
	   */
	  mixins: SpecPolicy.DEFINE_MANY,

	  /**
	   * An object containing properties and methods that should be defined on
	   * the component's constructor instead of its prototype (static methods).
	   *
	   * @type {object}
	   * @optional
	   */
	  statics: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of prop types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  propTypes: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of context types for this component.
	   *
	   * @type {object}
	   * @optional
	   */
	  contextTypes: SpecPolicy.DEFINE_MANY,

	  /**
	   * Definition of context types this component sets for its children.
	   *
	   * @type {object}
	   * @optional
	   */
	  childContextTypes: SpecPolicy.DEFINE_MANY,

	  // ==== Definition methods ====

	  /**
	   * Invoked when the component is mounted. Values in the mapping will be set on
	   * `this.props` if that prop is not specified (i.e. using an `in` check).
	   *
	   * This method is invoked before `getInitialState` and therefore cannot rely
	   * on `this.state` or use `this.setState`.
	   *
	   * @return {object}
	   * @optional
	   */
	  getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * Invoked once before the component is mounted. The return value will be used
	   * as the initial value of `this.state`.
	   *
	   *   getInitialState: function() {
	   *     return {
	   *       isOn: false,
	   *       fooBaz: new BazFoo()
	   *     }
	   *   }
	   *
	   * @return {object}
	   * @optional
	   */
	  getInitialState: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * @return {object}
	   * @optional
	   */
	  getChildContext: SpecPolicy.DEFINE_MANY_MERGED,

	  /**
	   * Uses props from `this.props` and state from `this.state` to render the
	   * structure of the component.
	   *
	   * No guarantees are made about when or how often this method is invoked, so
	   * it must not have side effects.
	   *
	   *   render: function() {
	   *     var name = this.props.name;
	   *     return <div>Hello, {name}!</div>;
	   *   }
	   *
	   * @return {ReactComponent}
	   * @nosideeffects
	   * @required
	   */
	  render: SpecPolicy.DEFINE_ONCE,



	  // ==== Delegate methods ====

	  /**
	   * Invoked when the component is initially created and about to be mounted.
	   * This may have side effects, but any external subscriptions or data created
	   * by this method must be cleaned up in `componentWillUnmount`.
	   *
	   * @optional
	   */
	  componentWillMount: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component has been mounted and has a DOM representation.
	   * However, there is no guarantee that the DOM node is in the document.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been mounted (initialized and rendered) for the first time.
	   *
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidMount: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked before the component receives new props.
	   *
	   * Use this as an opportunity to react to a prop transition by updating the
	   * state using `this.setState`. Current props are accessed via `this.props`.
	   *
	   *   componentWillReceiveProps: function(nextProps, nextContext) {
	   *     this.setState({
	   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
	   *     });
	   *   }
	   *
	   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
	   * transition may cause a state change, but the opposite is not true. If you
	   * need it, you are probably looking for `componentWillUpdate`.
	   *
	   * @param {object} nextProps
	   * @optional
	   */
	  componentWillReceiveProps: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked while deciding if the component should be updated as a result of
	   * receiving new props, state and/or context.
	   *
	   * Use this as an opportunity to `return false` when you're certain that the
	   * transition to the new props/state/context will not require a component
	   * update.
	   *
	   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
	   *     return !equal(nextProps, this.props) ||
	   *       !equal(nextState, this.state) ||
	   *       !equal(nextContext, this.context);
	   *   }
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @return {boolean} True if the component should update.
	   * @optional
	   */
	  shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,

	  /**
	   * Invoked when the component is about to update due to a transition from
	   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
	   * and `nextContext`.
	   *
	   * Use this as an opportunity to perform preparation before an update occurs.
	   *
	   * NOTE: You **cannot** use `this.setState()` in this method.
	   *
	   * @param {object} nextProps
	   * @param {?object} nextState
	   * @param {?object} nextContext
	   * @param {ReactReconcileTransaction} transaction
	   * @optional
	   */
	  componentWillUpdate: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component's DOM representation has been updated.
	   *
	   * Use this as an opportunity to operate on the DOM when the component has
	   * been updated.
	   *
	   * @param {object} prevProps
	   * @param {?object} prevState
	   * @param {?object} prevContext
	   * @param {DOMElement} rootNode DOM element representing the component.
	   * @optional
	   */
	  componentDidUpdate: SpecPolicy.DEFINE_MANY,

	  /**
	   * Invoked when the component is about to be removed from its parent and have
	   * its DOM representation destroyed.
	   *
	   * Use this as an opportunity to deallocate any external resources.
	   *
	   * NOTE: There is no `componentDidUnmount` since your component will have been
	   * destroyed by that point.
	   *
	   * @optional
	   */
	  componentWillUnmount: SpecPolicy.DEFINE_MANY,



	  // ==== Advanced methods ====

	  /**
	   * Updates the component's currently mounted DOM representation.
	   *
	   * By default, this implements React's rendering and reconciliation algorithm.
	   * Sophisticated clients may wish to override this.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   * @overridable
	   */
	  updateComponent: SpecPolicy.OVERRIDE_BASE

	};

	/**
	 * Mapping from class specification keys to special processing functions.
	 *
	 * Although these are declared like instance properties in the specification
	 * when defining classes using `React.createClass`, they are actually static
	 * and are accessible on the constructor instead of the prototype. Despite
	 * being static, they must be defined outside of the "statics" key under
	 * which all other static methods are defined.
	 */
	var RESERVED_SPEC_KEYS = {
	  displayName: function(Constructor, displayName) {
	    Constructor.displayName = displayName;
	  },
	  mixins: function(Constructor, mixins) {
	    if (mixins) {
	      for (var i = 0; i < mixins.length; i++) {
	        mixSpecIntoComponent(Constructor, mixins[i]);
	      }
	    }
	  },
	  childContextTypes: function(Constructor, childContextTypes) {
	    if (false) {
	      validateTypeDef(
	        Constructor,
	        childContextTypes,
	        ReactPropTypeLocations.childContext
	      );
	    }
	    Constructor.childContextTypes = assign(
	      {},
	      Constructor.childContextTypes,
	      childContextTypes
	    );
	  },
	  contextTypes: function(Constructor, contextTypes) {
	    if (false) {
	      validateTypeDef(
	        Constructor,
	        contextTypes,
	        ReactPropTypeLocations.context
	      );
	    }
	    Constructor.contextTypes = assign(
	      {},
	      Constructor.contextTypes,
	      contextTypes
	    );
	  },
	  /**
	   * Special case getDefaultProps which should move into statics but requires
	   * automatic merging.
	   */
	  getDefaultProps: function(Constructor, getDefaultProps) {
	    if (Constructor.getDefaultProps) {
	      Constructor.getDefaultProps = createMergedResultFunction(
	        Constructor.getDefaultProps,
	        getDefaultProps
	      );
	    } else {
	      Constructor.getDefaultProps = getDefaultProps;
	    }
	  },
	  propTypes: function(Constructor, propTypes) {
	    if (false) {
	      validateTypeDef(
	        Constructor,
	        propTypes,
	        ReactPropTypeLocations.prop
	      );
	    }
	    Constructor.propTypes = assign(
	      {},
	      Constructor.propTypes,
	      propTypes
	    );
	  },
	  statics: function(Constructor, statics) {
	    mixStaticSpecIntoComponent(Constructor, statics);
	  }
	};

	function validateTypeDef(Constructor, typeDef, location) {
	  for (var propName in typeDef) {
	    if (typeDef.hasOwnProperty(propName)) {
	      // use a warning instead of an invariant so components
	      // don't show up in prod but not in __DEV__
	      (false ? warning(
	        typeof typeDef[propName] === 'function',
	        '%s: %s type `%s` is invalid; it must be a function, usually from ' +
	        'React.PropTypes.',
	        Constructor.displayName || 'ReactClass',
	        ReactPropTypeLocationNames[location],
	        propName
	      ) : null);
	    }
	  }
	}

	function validateMethodOverride(proto, name) {
	  var specPolicy = ReactClassInterface.hasOwnProperty(name) ?
	    ReactClassInterface[name] :
	    null;

	  // Disallow overriding of base class methods unless explicitly allowed.
	  if (ReactClassMixin.hasOwnProperty(name)) {
	    (false ? invariant(
	      specPolicy === SpecPolicy.OVERRIDE_BASE,
	      'ReactClassInterface: You are attempting to override ' +
	      '`%s` from your class specification. Ensure that your method names ' +
	      'do not overlap with React methods.',
	      name
	    ) : invariant(specPolicy === SpecPolicy.OVERRIDE_BASE));
	  }

	  // Disallow defining methods more than once unless explicitly allowed.
	  if (proto.hasOwnProperty(name)) {
	    (false ? invariant(
	      specPolicy === SpecPolicy.DEFINE_MANY ||
	      specPolicy === SpecPolicy.DEFINE_MANY_MERGED,
	      'ReactClassInterface: You are attempting to define ' +
	      '`%s` on your component more than once. This conflict may be due ' +
	      'to a mixin.',
	      name
	    ) : invariant(specPolicy === SpecPolicy.DEFINE_MANY ||
	    specPolicy === SpecPolicy.DEFINE_MANY_MERGED));
	  }
	}

	/**
	 * Mixin helper which handles policy validation and reserved
	 * specification keys when building React classses.
	 */
	function mixSpecIntoComponent(Constructor, spec) {
	  if (!spec) {
	    return;
	  }

	  (false ? invariant(
	    typeof spec !== 'function',
	    'ReactClass: You\'re attempting to ' +
	    'use a component class as a mixin. Instead, just use a regular object.'
	  ) : invariant(typeof spec !== 'function'));
	  (false ? invariant(
	    !ReactElement.isValidElement(spec),
	    'ReactClass: You\'re attempting to ' +
	    'use a component as a mixin. Instead, just use a regular object.'
	  ) : invariant(!ReactElement.isValidElement(spec)));

	  var proto = Constructor.prototype;

	  // By handling mixins before any other properties, we ensure the same
	  // chaining order is applied to methods with DEFINE_MANY policy, whether
	  // mixins are listed before or after these methods in the spec.
	  if (spec.hasOwnProperty(MIXINS_KEY)) {
	    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
	  }

	  for (var name in spec) {
	    if (!spec.hasOwnProperty(name)) {
	      continue;
	    }

	    if (name === MIXINS_KEY) {
	      // We have already handled mixins in a special case above
	      continue;
	    }

	    var property = spec[name];
	    validateMethodOverride(proto, name);

	    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
	      RESERVED_SPEC_KEYS[name](Constructor, property);
	    } else {
	      // Setup methods on prototype:
	      // The following member methods should not be automatically bound:
	      // 1. Expected ReactClass methods (in the "interface").
	      // 2. Overridden methods (that were mixed in).
	      var isReactClassMethod =
	        ReactClassInterface.hasOwnProperty(name);
	      var isAlreadyDefined = proto.hasOwnProperty(name);
	      var markedDontBind = property && property.__reactDontBind;
	      var isFunction = typeof property === 'function';
	      var shouldAutoBind =
	        isFunction &&
	        !isReactClassMethod &&
	        !isAlreadyDefined &&
	        !markedDontBind;

	      if (shouldAutoBind) {
	        if (!proto.__reactAutoBindMap) {
	          proto.__reactAutoBindMap = {};
	        }
	        proto.__reactAutoBindMap[name] = property;
	        proto[name] = property;
	      } else {
	        if (isAlreadyDefined) {
	          var specPolicy = ReactClassInterface[name];

	          // These cases should already be caught by validateMethodOverride
	          (false ? invariant(
	            isReactClassMethod && (
	              (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)
	            ),
	            'ReactClass: Unexpected spec policy %s for key %s ' +
	            'when mixing in component specs.',
	            specPolicy,
	            name
	          ) : invariant(isReactClassMethod && (
	            (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)
	          )));

	          // For methods which are defined more than once, call the existing
	          // methods before calling the new property, merging if appropriate.
	          if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
	            proto[name] = createMergedResultFunction(proto[name], property);
	          } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
	            proto[name] = createChainedFunction(proto[name], property);
	          }
	        } else {
	          proto[name] = property;
	          if (false) {
	            // Add verbose displayName to the function, which helps when looking
	            // at profiling tools.
	            if (typeof property === 'function' && spec.displayName) {
	              proto[name].displayName = spec.displayName + '_' + name;
	            }
	          }
	        }
	      }
	    }
	  }
	}

	function mixStaticSpecIntoComponent(Constructor, statics) {
	  if (!statics) {
	    return;
	  }
	  for (var name in statics) {
	    var property = statics[name];
	    if (!statics.hasOwnProperty(name)) {
	      continue;
	    }

	    var isReserved = name in RESERVED_SPEC_KEYS;
	    (false ? invariant(
	      !isReserved,
	      'ReactClass: You are attempting to define a reserved ' +
	      'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
	      'as an instance property instead; it will still be accessible on the ' +
	      'constructor.',
	      name
	    ) : invariant(!isReserved));

	    var isInherited = name in Constructor;
	    (false ? invariant(
	      !isInherited,
	      'ReactClass: You are attempting to define ' +
	      '`%s` on your component more than once. This conflict may be ' +
	      'due to a mixin.',
	      name
	    ) : invariant(!isInherited));
	    Constructor[name] = property;
	  }
	}

	/**
	 * Merge two objects, but throw if both contain the same key.
	 *
	 * @param {object} one The first object, which is mutated.
	 * @param {object} two The second object
	 * @return {object} one after it has been mutated to contain everything in two.
	 */
	function mergeIntoWithNoDuplicateKeys(one, two) {
	  (false ? invariant(
	    one && two && typeof one === 'object' && typeof two === 'object',
	    'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
	  ) : invariant(one && two && typeof one === 'object' && typeof two === 'object'));

	  for (var key in two) {
	    if (two.hasOwnProperty(key)) {
	      (false ? invariant(
	        one[key] === undefined,
	        'mergeIntoWithNoDuplicateKeys(): ' +
	        'Tried to merge two objects with the same key: `%s`. This conflict ' +
	        'may be due to a mixin; in particular, this may be caused by two ' +
	        'getInitialState() or getDefaultProps() methods returning objects ' +
	        'with clashing keys.',
	        key
	      ) : invariant(one[key] === undefined));
	      one[key] = two[key];
	    }
	  }
	  return one;
	}

	/**
	 * Creates a function that invokes two functions and merges their return values.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createMergedResultFunction(one, two) {
	  return function mergedResult() {
	    var a = one.apply(this, arguments);
	    var b = two.apply(this, arguments);
	    if (a == null) {
	      return b;
	    } else if (b == null) {
	      return a;
	    }
	    var c = {};
	    mergeIntoWithNoDuplicateKeys(c, a);
	    mergeIntoWithNoDuplicateKeys(c, b);
	    return c;
	  };
	}

	/**
	 * Creates a function that invokes two functions and ignores their return vales.
	 *
	 * @param {function} one Function to invoke first.
	 * @param {function} two Function to invoke second.
	 * @return {function} Function that invokes the two argument functions.
	 * @private
	 */
	function createChainedFunction(one, two) {
	  return function chainedFunction() {
	    one.apply(this, arguments);
	    two.apply(this, arguments);
	  };
	}

	/**
	 * Binds a method to the component.
	 *
	 * @param {object} component Component whose method is going to be bound.
	 * @param {function} method Method to be bound.
	 * @return {function} The bound method.
	 */
	function bindAutoBindMethod(component, method) {
	  var boundMethod = method.bind(component);
	  if (false) {
	    boundMethod.__reactBoundContext = component;
	    boundMethod.__reactBoundMethod = method;
	    boundMethod.__reactBoundArguments = null;
	    var componentName = component.constructor.displayName;
	    var _bind = boundMethod.bind;
	    /* eslint-disable block-scoped-var, no-undef */
	    boundMethod.bind = function(newThis ) {for (var args=[],$__0=1,$__1=arguments.length;$__0<$__1;$__0++) args.push(arguments[$__0]);
	      // User is trying to bind() an autobound method; we effectively will
	      // ignore the value of "this" that the user is trying to use, so
	      // let's warn.
	      if (newThis !== component && newThis !== null) {
	        ("production" !== process.env.NODE_ENV ? warning(
	          false,
	          'bind(): React component methods may only be bound to the ' +
	          'component instance. See %s',
	          componentName
	        ) : null);
	      } else if (!args.length) {
	        ("production" !== process.env.NODE_ENV ? warning(
	          false,
	          'bind(): You are binding a component method to the component. ' +
	          'React does this for you automatically in a high-performance ' +
	          'way, so you can safely remove this call. See %s',
	          componentName
	        ) : null);
	        return boundMethod;
	      }
	      var reboundMethod = _bind.apply(boundMethod, arguments);
	      reboundMethod.__reactBoundContext = component;
	      reboundMethod.__reactBoundMethod = method;
	      reboundMethod.__reactBoundArguments = args;
	      return reboundMethod;
	      /* eslint-enable */
	    };
	  }
	  return boundMethod;
	}

	/**
	 * Binds all auto-bound methods in a component.
	 *
	 * @param {object} component Component whose method is going to be bound.
	 */
	function bindAutoBindMethods(component) {
	  for (var autoBindKey in component.__reactAutoBindMap) {
	    if (component.__reactAutoBindMap.hasOwnProperty(autoBindKey)) {
	      var method = component.__reactAutoBindMap[autoBindKey];
	      component[autoBindKey] = bindAutoBindMethod(
	        component,
	        ReactErrorUtils.guard(
	          method,
	          component.constructor.displayName + '.' + autoBindKey
	        )
	      );
	    }
	  }
	}

	var typeDeprecationDescriptor = {
	  enumerable: false,
	  get: function() {
	    var displayName = this.displayName || this.name || 'Component';
	    (false ? warning(
	      false,
	      '%s.type is deprecated. Use %s directly to access the class.',
	      displayName,
	      displayName
	    ) : null);
	    Object.defineProperty(this, 'type', {
	      value: this
	    });
	    return this;
	  }
	};

	/**
	 * Add more to the ReactClass base class. These are all legacy features and
	 * therefore not already part of the modern ReactComponent.
	 */
	var ReactClassMixin = {

	  /**
	   * TODO: This will be deprecated because state should always keep a consistent
	   * type signature and the only use case for this, is to avoid that.
	   */
	  replaceState: function(newState, callback) {
	    ReactUpdateQueue.enqueueReplaceState(this, newState);
	    if (callback) {
	      ReactUpdateQueue.enqueueCallback(this, callback);
	    }
	  },

	  /**
	   * Checks whether or not this composite component is mounted.
	   * @return {boolean} True if mounted, false otherwise.
	   * @protected
	   * @final
	   */
	  isMounted: function() {
	    if (false) {
	      var owner = ReactCurrentOwner.current;
	      if (owner !== null) {
	        ("production" !== process.env.NODE_ENV ? warning(
	          owner._warnedAboutRefsInRender,
	          '%s is accessing isMounted inside its render() function. ' +
	          'render() should be a pure function of props and state. It should ' +
	          'never access something that requires stale data from the previous ' +
	          'render, such as refs. Move this logic to componentDidMount and ' +
	          'componentDidUpdate instead.',
	          owner.getName() || 'A component'
	        ) : null);
	        owner._warnedAboutRefsInRender = true;
	      }
	    }
	    var internalInstance = ReactInstanceMap.get(this);
	    return (
	      internalInstance &&
	      internalInstance !== ReactLifeCycle.currentlyMountingInstance
	    );
	  },

	  /**
	   * Sets a subset of the props.
	   *
	   * @param {object} partialProps Subset of the next props.
	   * @param {?function} callback Called after props are updated.
	   * @final
	   * @public
	   * @deprecated
	   */
	  setProps: function(partialProps, callback) {
	    ReactUpdateQueue.enqueueSetProps(this, partialProps);
	    if (callback) {
	      ReactUpdateQueue.enqueueCallback(this, callback);
	    }
	  },

	  /**
	   * Replace all the props.
	   *
	   * @param {object} newProps Subset of the next props.
	   * @param {?function} callback Called after props are updated.
	   * @final
	   * @public
	   * @deprecated
	   */
	  replaceProps: function(newProps, callback) {
	    ReactUpdateQueue.enqueueReplaceProps(this, newProps);
	    if (callback) {
	      ReactUpdateQueue.enqueueCallback(this, callback);
	    }
	  }
	};

	var ReactClassComponent = function() {};
	assign(
	  ReactClassComponent.prototype,
	  ReactComponent.prototype,
	  ReactClassMixin
	);

	/**
	 * Module for creating composite components.
	 *
	 * @class ReactClass
	 */
	var ReactClass = {

	  /**
	   * Creates a composite component class given a class specification.
	   *
	   * @param {object} spec Class specification (which must define `render`).
	   * @return {function} Component constructor function.
	   * @public
	   */
	  createClass: function(spec) {
	    var Constructor = function(props, context) {
	      // This constructor is overridden by mocks. The argument is used
	      // by mocks to assert on what gets mounted.

	      if (false) {
	        ("production" !== process.env.NODE_ENV ? warning(
	          this instanceof Constructor,
	          'Something is calling a React component directly. Use a factory or ' +
	          'JSX instead. See: https://fb.me/react-legacyfactory'
	        ) : null);
	      }

	      // Wire up auto-binding
	      if (this.__reactAutoBindMap) {
	        bindAutoBindMethods(this);
	      }

	      this.props = props;
	      this.context = context;
	      this.state = null;

	      // ReactClasses doesn't have constructors. Instead, they use the
	      // getInitialState and componentWillMount methods for initialization.

	      var initialState = this.getInitialState ? this.getInitialState() : null;
	      if (false) {
	        // We allow auto-mocks to proceed as if they're returning null.
	        if (typeof initialState === 'undefined' &&
	            this.getInitialState._isMockFunction) {
	          // This is probably bad practice. Consider warning here and
	          // deprecating this convenience.
	          initialState = null;
	        }
	      }
	      (false ? invariant(
	        typeof initialState === 'object' && !Array.isArray(initialState),
	        '%s.getInitialState(): must return an object or null',
	        Constructor.displayName || 'ReactCompositeComponent'
	      ) : invariant(typeof initialState === 'object' && !Array.isArray(initialState)));

	      this.state = initialState;
	    };
	    Constructor.prototype = new ReactClassComponent();
	    Constructor.prototype.constructor = Constructor;

	    injectedMixins.forEach(
	      mixSpecIntoComponent.bind(null, Constructor)
	    );

	    mixSpecIntoComponent(Constructor, spec);

	    // Initialize the defaultProps property after all mixins have been merged
	    if (Constructor.getDefaultProps) {
	      Constructor.defaultProps = Constructor.getDefaultProps();
	    }

	    if (false) {
	      // This is a tag to indicate that the use of these method names is ok,
	      // since it's used with createClass. If it's not, then it's likely a
	      // mistake so we'll warn you to use the static property, property
	      // initializer or constructor respectively.
	      if (Constructor.getDefaultProps) {
	        Constructor.getDefaultProps.isReactClassApproved = {};
	      }
	      if (Constructor.prototype.getInitialState) {
	        Constructor.prototype.getInitialState.isReactClassApproved = {};
	      }
	    }

	    (false ? invariant(
	      Constructor.prototype.render,
	      'createClass(...): Class specification must implement a `render` method.'
	    ) : invariant(Constructor.prototype.render));

	    if (false) {
	      ("production" !== process.env.NODE_ENV ? warning(
	        !Constructor.prototype.componentShouldUpdate,
	        '%s has a method called ' +
	        'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
	        'The name is phrased as a question because the function is ' +
	        'expected to return a value.',
	        spec.displayName || 'A component'
	      ) : null);
	    }

	    // Reduce time spent doing lookups by setting these on the prototype.
	    for (var methodName in ReactClassInterface) {
	      if (!Constructor.prototype[methodName]) {
	        Constructor.prototype[methodName] = null;
	      }
	    }

	    // Legacy hook
	    Constructor.type = Constructor;
	    if (false) {
	      try {
	        Object.defineProperty(Constructor, 'type', typeDeprecationDescriptor);
	      } catch (x) {
	        // IE will fail on defineProperty (es5-shim/sham too)
	      }
	    }

	    return Constructor;
	  },

	  injection: {
	    injectMixin: function(mixin) {
	      injectedMixins.push(mixin);
	    }
	  }

	};

	module.exports = ReactClass;


/***/ },
/* 85 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactErrorUtils
	 * @typechecks
	 */

	"use strict";

	var ReactErrorUtils = {
	  /**
	   * Creates a guarded version of a function. This is supposed to make debugging
	   * of event handlers easier. To aid debugging with the browser's debugger,
	   * this currently simply returns the original function.
	   *
	   * @param {function} func Function to be executed
	   * @param {string} name The name of the guard
	   * @return {function}
	   */
	  guard: function(func, name) {
	    return func;
	  }
	};

	module.exports = ReactErrorUtils;


/***/ },
/* 86 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule keyOf
	 */

	/**
	 * Allows extraction of a minified key. Let's the build system minify keys
	 * without loosing the ability to dynamically use key strings as values
	 * themselves. Pass in an object with a single key/val pair and it will return
	 * you the string key of that single record. Suppose you want to grab the
	 * value for a key 'className' inside of an object. Key/val minification may
	 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
	 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
	 * reuse those resolutions.
	 */
	var keyOf = function(oneKeyObj) {
	  var key;
	  for (key in oneKeyObj) {
	    if (!oneKeyObj.hasOwnProperty(key)) {
	      continue;
	    }
	    return key;
	  }
	  return null;
	};


	module.exports = keyOf;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOM
	 * @typechecks static-only
	 */

	'use strict';

	var ReactElement = __webpack_require__(58);
	var ReactElementValidator = __webpack_require__(79);

	var mapObject = __webpack_require__(88);

	/**
	 * Create a factory that creates HTML tag elements.
	 *
	 * @param {string} tag Tag name (e.g. `div`).
	 * @private
	 */
	function createDOMFactory(tag) {
	  if (false) {
	    return ReactElementValidator.createFactory(tag);
	  }
	  return ReactElement.createFactory(tag);
	}

	/**
	 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
	 * This is also accessible via `React.DOM`.
	 *
	 * @public
	 */
	var ReactDOM = mapObject({
	  a: 'a',
	  abbr: 'abbr',
	  address: 'address',
	  area: 'area',
	  article: 'article',
	  aside: 'aside',
	  audio: 'audio',
	  b: 'b',
	  base: 'base',
	  bdi: 'bdi',
	  bdo: 'bdo',
	  big: 'big',
	  blockquote: 'blockquote',
	  body: 'body',
	  br: 'br',
	  button: 'button',
	  canvas: 'canvas',
	  caption: 'caption',
	  cite: 'cite',
	  code: 'code',
	  col: 'col',
	  colgroup: 'colgroup',
	  data: 'data',
	  datalist: 'datalist',
	  dd: 'dd',
	  del: 'del',
	  details: 'details',
	  dfn: 'dfn',
	  dialog: 'dialog',
	  div: 'div',
	  dl: 'dl',
	  dt: 'dt',
	  em: 'em',
	  embed: 'embed',
	  fieldset: 'fieldset',
	  figcaption: 'figcaption',
	  figure: 'figure',
	  footer: 'footer',
	  form: 'form',
	  h1: 'h1',
	  h2: 'h2',
	  h3: 'h3',
	  h4: 'h4',
	  h5: 'h5',
	  h6: 'h6',
	  head: 'head',
	  header: 'header',
	  hr: 'hr',
	  html: 'html',
	  i: 'i',
	  iframe: 'iframe',
	  img: 'img',
	  input: 'input',
	  ins: 'ins',
	  kbd: 'kbd',
	  keygen: 'keygen',
	  label: 'label',
	  legend: 'legend',
	  li: 'li',
	  link: 'link',
	  main: 'main',
	  map: 'map',
	  mark: 'mark',
	  menu: 'menu',
	  menuitem: 'menuitem',
	  meta: 'meta',
	  meter: 'meter',
	  nav: 'nav',
	  noscript: 'noscript',
	  object: 'object',
	  ol: 'ol',
	  optgroup: 'optgroup',
	  option: 'option',
	  output: 'output',
	  p: 'p',
	  param: 'param',
	  picture: 'picture',
	  pre: 'pre',
	  progress: 'progress',
	  q: 'q',
	  rp: 'rp',
	  rt: 'rt',
	  ruby: 'ruby',
	  s: 's',
	  samp: 'samp',
	  script: 'script',
	  section: 'section',
	  select: 'select',
	  small: 'small',
	  source: 'source',
	  span: 'span',
	  strong: 'strong',
	  style: 'style',
	  sub: 'sub',
	  summary: 'summary',
	  sup: 'sup',
	  table: 'table',
	  tbody: 'tbody',
	  td: 'td',
	  textarea: 'textarea',
	  tfoot: 'tfoot',
	  th: 'th',
	  thead: 'thead',
	  time: 'time',
	  title: 'title',
	  tr: 'tr',
	  track: 'track',
	  u: 'u',
	  ul: 'ul',
	  'var': 'var',
	  video: 'video',
	  wbr: 'wbr',

	  // SVG
	  circle: 'circle',
	  clipPath: 'clipPath',
	  defs: 'defs',
	  ellipse: 'ellipse',
	  g: 'g',
	  line: 'line',
	  linearGradient: 'linearGradient',
	  mask: 'mask',
	  path: 'path',
	  pattern: 'pattern',
	  polygon: 'polygon',
	  polyline: 'polyline',
	  radialGradient: 'radialGradient',
	  rect: 'rect',
	  stop: 'stop',
	  svg: 'svg',
	  text: 'text',
	  tspan: 'tspan'

	}, createDOMFactory);

	module.exports = ReactDOM;


/***/ },
/* 88 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule mapObject
	 */

	'use strict';

	var hasOwnProperty = Object.prototype.hasOwnProperty;

	/**
	 * Executes the provided `callback` once for each enumerable own property in the
	 * object and constructs a new object from the results. The `callback` is
	 * invoked with three arguments:
	 *
	 *  - the property value
	 *  - the property name
	 *  - the object being traversed
	 *
	 * Properties that are added after the call to `mapObject` will not be visited
	 * by `callback`. If the values of existing properties are changed, the value
	 * passed to `callback` will be the value at the time `mapObject` visits them.
	 * Properties that are deleted before being visited are not visited.
	 *
	 * @grep function objectMap()
	 * @grep function objMap()
	 *
	 * @param {?object} object
	 * @param {function} callback
	 * @param {*} context
	 * @return {?object}
	 */
	function mapObject(object, callback, context) {
	  if (!object) {
	    return null;
	  }
	  var result = {};
	  for (var name in object) {
	    if (hasOwnProperty.call(object, name)) {
	      result[name] = callback.call(context, object[name], name, object);
	    }
	  }
	  return result;
	}

	module.exports = mapObject;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMTextComponent
	 * @typechecks static-only
	 */

	'use strict';

	var DOMPropertyOperations = __webpack_require__(90);
	var ReactComponentBrowserEnvironment =
	  __webpack_require__(94);
	var ReactDOMComponent = __webpack_require__(134);

	var assign = __webpack_require__(62);
	var escapeTextContentForBrowser = __webpack_require__(93);

	/**
	 * Text nodes violate a couple assumptions that React makes about components:
	 *
	 *  - When mounting text into the DOM, adjacent text nodes are merged.
	 *  - Text nodes cannot be assigned a React root ID.
	 *
	 * This component is used to wrap strings in elements so that they can undergo
	 * the same reconciliation that is applied to elements.
	 *
	 * TODO: Investigate representing React components in the DOM with text nodes.
	 *
	 * @class ReactDOMTextComponent
	 * @extends ReactComponent
	 * @internal
	 */
	var ReactDOMTextComponent = function(props) {
	  // This constructor and its argument is currently used by mocks.
	};

	assign(ReactDOMTextComponent.prototype, {

	  /**
	   * @param {ReactText} text
	   * @internal
	   */
	  construct: function(text) {
	    // TODO: This is really a ReactText (ReactNode), not a ReactElement
	    this._currentElement = text;
	    this._stringText = '' + text;

	    // Properties
	    this._rootNodeID = null;
	    this._mountIndex = 0;
	  },

	  /**
	   * Creates the markup for this text node. This node is not intended to have
	   * any features besides containing text content.
	   *
	   * @param {string} rootID DOM ID of the root node.
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @return {string} Markup for this text node.
	   * @internal
	   */
	  mountComponent: function(rootID, transaction, context) {
	    this._rootNodeID = rootID;
	    var escapedText = escapeTextContentForBrowser(this._stringText);

	    if (transaction.renderToStaticMarkup) {
	      // Normally we'd wrap this in a `span` for the reasons stated above, but
	      // since this is a situation where React won't take over (static pages),
	      // we can simply return the text as it is.
	      return escapedText;
	    }

	    return (
	      '<span ' + DOMPropertyOperations.createMarkupForID(rootID) + '>' +
	        escapedText +
	      '</span>'
	    );
	  },

	  /**
	   * Updates this component by updating the text content.
	   *
	   * @param {ReactText} nextText The next text content
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   */
	  receiveComponent: function(nextText, transaction) {
	    if (nextText !== this._currentElement) {
	      this._currentElement = nextText;
	      var nextStringText = '' + nextText;
	      if (nextStringText !== this._stringText) {
	        // TODO: Save this as pending props and use performUpdateIfNecessary
	        // and/or updateComponent to do the actual update for consistency with
	        // other component types?
	        this._stringText = nextStringText;
	        ReactDOMComponent.BackendIDOperations.updateTextContentByID(
	          this._rootNodeID,
	          nextStringText
	        );
	      }
	    }
	  },

	  unmountComponent: function() {
	    ReactComponentBrowserEnvironment.unmountIDFromEnvironment(this._rootNodeID);
	  }

	});

	module.exports = ReactDOMTextComponent;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DOMPropertyOperations
	 * @typechecks static-only
	 */

	'use strict';

	var DOMProperty = __webpack_require__(91);

	var quoteAttributeValueForBrowser = __webpack_require__(92);
	var warning = __webpack_require__(59);

	function shouldIgnoreValue(name, value) {
	  return value == null ||
	    (DOMProperty.hasBooleanValue[name] && !value) ||
	    (DOMProperty.hasNumericValue[name] && isNaN(value)) ||
	    (DOMProperty.hasPositiveNumericValue[name] && (value < 1)) ||
	    (DOMProperty.hasOverloadedBooleanValue[name] && value === false);
	}

	if (false) {
	  var reactProps = {
	    children: true,
	    dangerouslySetInnerHTML: true,
	    key: true,
	    ref: true
	  };
	  var warnedProperties = {};

	  var warnUnknownProperty = function(name) {
	    if (reactProps.hasOwnProperty(name) && reactProps[name] ||
	        warnedProperties.hasOwnProperty(name) && warnedProperties[name]) {
	      return;
	    }

	    warnedProperties[name] = true;
	    var lowerCasedName = name.toLowerCase();

	    // data-* attributes should be lowercase; suggest the lowercase version
	    var standardName = (
	      DOMProperty.isCustomAttribute(lowerCasedName) ?
	        lowerCasedName :
	      DOMProperty.getPossibleStandardName.hasOwnProperty(lowerCasedName) ?
	        DOMProperty.getPossibleStandardName[lowerCasedName] :
	        null
	    );

	    // For now, only warn when we have a suggested correction. This prevents
	    // logging too much when using transferPropsTo.
	    ("production" !== process.env.NODE_ENV ? warning(
	      standardName == null,
	      'Unknown DOM property %s. Did you mean %s?',
	      name,
	      standardName
	    ) : null);

	  };
	}

	/**
	 * Operations for dealing with DOM properties.
	 */
	var DOMPropertyOperations = {

	  /**
	   * Creates markup for the ID property.
	   *
	   * @param {string} id Unescaped ID.
	   * @return {string} Markup string.
	   */
	  createMarkupForID: function(id) {
	    return DOMProperty.ID_ATTRIBUTE_NAME + '=' +
	      quoteAttributeValueForBrowser(id);
	  },

	  /**
	   * Creates markup for a property.
	   *
	   * @param {string} name
	   * @param {*} value
	   * @return {?string} Markup string, or null if the property was invalid.
	   */
	  createMarkupForProperty: function(name, value) {
	    if (DOMProperty.isStandardName.hasOwnProperty(name) &&
	        DOMProperty.isStandardName[name]) {
	      if (shouldIgnoreValue(name, value)) {
	        return '';
	      }
	      var attributeName = DOMProperty.getAttributeName[name];
	      if (DOMProperty.hasBooleanValue[name] ||
	          (DOMProperty.hasOverloadedBooleanValue[name] && value === true)) {
	        return attributeName;
	      }
	      return attributeName + '=' + quoteAttributeValueForBrowser(value);
	    } else if (DOMProperty.isCustomAttribute(name)) {
	      if (value == null) {
	        return '';
	      }
	      return name + '=' + quoteAttributeValueForBrowser(value);
	    } else if (false) {
	      warnUnknownProperty(name);
	    }
	    return null;
	  },

	  /**
	   * Sets the value for a property on a node.
	   *
	   * @param {DOMElement} node
	   * @param {string} name
	   * @param {*} value
	   */
	  setValueForProperty: function(node, name, value) {
	    if (DOMProperty.isStandardName.hasOwnProperty(name) &&
	        DOMProperty.isStandardName[name]) {
	      var mutationMethod = DOMProperty.getMutationMethod[name];
	      if (mutationMethod) {
	        mutationMethod(node, value);
	      } else if (shouldIgnoreValue(name, value)) {
	        this.deleteValueForProperty(node, name);
	      } else if (DOMProperty.mustUseAttribute[name]) {
	        // `setAttribute` with objects becomes only `[object]` in IE8/9,
	        // ('' + value) makes it output the correct toString()-value.
	        node.setAttribute(DOMProperty.getAttributeName[name], '' + value);
	      } else {
	        var propName = DOMProperty.getPropertyName[name];
	        // Must explicitly cast values for HAS_SIDE_EFFECTS-properties to the
	        // property type before comparing; only `value` does and is string.
	        if (!DOMProperty.hasSideEffects[name] ||
	            ('' + node[propName]) !== ('' + value)) {
	          // Contrary to `setAttribute`, object properties are properly
	          // `toString`ed by IE8/9.
	          node[propName] = value;
	        }
	      }
	    } else if (DOMProperty.isCustomAttribute(name)) {
	      if (value == null) {
	        node.removeAttribute(name);
	      } else {
	        node.setAttribute(name, '' + value);
	      }
	    } else if (false) {
	      warnUnknownProperty(name);
	    }
	  },

	  /**
	   * Deletes the value for a property on a node.
	   *
	   * @param {DOMElement} node
	   * @param {string} name
	   */
	  deleteValueForProperty: function(node, name) {
	    if (DOMProperty.isStandardName.hasOwnProperty(name) &&
	        DOMProperty.isStandardName[name]) {
	      var mutationMethod = DOMProperty.getMutationMethod[name];
	      if (mutationMethod) {
	        mutationMethod(node, undefined);
	      } else if (DOMProperty.mustUseAttribute[name]) {
	        node.removeAttribute(DOMProperty.getAttributeName[name]);
	      } else {
	        var propName = DOMProperty.getPropertyName[name];
	        var defaultValue = DOMProperty.getDefaultValueForProperty(
	          node.nodeName,
	          propName
	        );
	        if (!DOMProperty.hasSideEffects[name] ||
	            ('' + node[propName]) !== defaultValue) {
	          node[propName] = defaultValue;
	        }
	      }
	    } else if (DOMProperty.isCustomAttribute(name)) {
	      node.removeAttribute(name);
	    } else if (false) {
	      warnUnknownProperty(name);
	    }
	  }

	};

	module.exports = DOMPropertyOperations;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DOMProperty
	 * @typechecks static-only
	 */

	/*jslint bitwise: true */

	'use strict';

	var invariant = __webpack_require__(54);

	function checkMask(value, bitmask) {
	  return (value & bitmask) === bitmask;
	}

	var DOMPropertyInjection = {
	  /**
	   * Mapping from normalized, camelcased property names to a configuration that
	   * specifies how the associated DOM property should be accessed or rendered.
	   */
	  MUST_USE_ATTRIBUTE: 0x1,
	  MUST_USE_PROPERTY: 0x2,
	  HAS_SIDE_EFFECTS: 0x4,
	  HAS_BOOLEAN_VALUE: 0x8,
	  HAS_NUMERIC_VALUE: 0x10,
	  HAS_POSITIVE_NUMERIC_VALUE: 0x20 | 0x10,
	  HAS_OVERLOADED_BOOLEAN_VALUE: 0x40,

	  /**
	   * Inject some specialized knowledge about the DOM. This takes a config object
	   * with the following properties:
	   *
	   * isCustomAttribute: function that given an attribute name will return true
	   * if it can be inserted into the DOM verbatim. Useful for data-* or aria-*
	   * attributes where it's impossible to enumerate all of the possible
	   * attribute names,
	   *
	   * Properties: object mapping DOM property name to one of the
	   * DOMPropertyInjection constants or null. If your attribute isn't in here,
	   * it won't get written to the DOM.
	   *
	   * DOMAttributeNames: object mapping React attribute name to the DOM
	   * attribute name. Attribute names not specified use the **lowercase**
	   * normalized name.
	   *
	   * DOMPropertyNames: similar to DOMAttributeNames but for DOM properties.
	   * Property names not specified use the normalized name.
	   *
	   * DOMMutationMethods: Properties that require special mutation methods. If
	   * `value` is undefined, the mutation method should unset the property.
	   *
	   * @param {object} domPropertyConfig the config as described above.
	   */
	  injectDOMPropertyConfig: function(domPropertyConfig) {
	    var Properties = domPropertyConfig.Properties || {};
	    var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
	    var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
	    var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};

	    if (domPropertyConfig.isCustomAttribute) {
	      DOMProperty._isCustomAttributeFunctions.push(
	        domPropertyConfig.isCustomAttribute
	      );
	    }

	    for (var propName in Properties) {
	      (false ? invariant(
	        !DOMProperty.isStandardName.hasOwnProperty(propName),
	        'injectDOMPropertyConfig(...): You\'re trying to inject DOM property ' +
	        '\'%s\' which has already been injected. You may be accidentally ' +
	        'injecting the same DOM property config twice, or you may be ' +
	        'injecting two configs that have conflicting property names.',
	        propName
	      ) : invariant(!DOMProperty.isStandardName.hasOwnProperty(propName)));

	      DOMProperty.isStandardName[propName] = true;

	      var lowerCased = propName.toLowerCase();
	      DOMProperty.getPossibleStandardName[lowerCased] = propName;

	      if (DOMAttributeNames.hasOwnProperty(propName)) {
	        var attributeName = DOMAttributeNames[propName];
	        DOMProperty.getPossibleStandardName[attributeName] = propName;
	        DOMProperty.getAttributeName[propName] = attributeName;
	      } else {
	        DOMProperty.getAttributeName[propName] = lowerCased;
	      }

	      DOMProperty.getPropertyName[propName] =
	        DOMPropertyNames.hasOwnProperty(propName) ?
	          DOMPropertyNames[propName] :
	          propName;

	      if (DOMMutationMethods.hasOwnProperty(propName)) {
	        DOMProperty.getMutationMethod[propName] = DOMMutationMethods[propName];
	      } else {
	        DOMProperty.getMutationMethod[propName] = null;
	      }

	      var propConfig = Properties[propName];
	      DOMProperty.mustUseAttribute[propName] =
	        checkMask(propConfig, DOMPropertyInjection.MUST_USE_ATTRIBUTE);
	      DOMProperty.mustUseProperty[propName] =
	        checkMask(propConfig, DOMPropertyInjection.MUST_USE_PROPERTY);
	      DOMProperty.hasSideEffects[propName] =
	        checkMask(propConfig, DOMPropertyInjection.HAS_SIDE_EFFECTS);
	      DOMProperty.hasBooleanValue[propName] =
	        checkMask(propConfig, DOMPropertyInjection.HAS_BOOLEAN_VALUE);
	      DOMProperty.hasNumericValue[propName] =
	        checkMask(propConfig, DOMPropertyInjection.HAS_NUMERIC_VALUE);
	      DOMProperty.hasPositiveNumericValue[propName] =
	        checkMask(propConfig, DOMPropertyInjection.HAS_POSITIVE_NUMERIC_VALUE);
	      DOMProperty.hasOverloadedBooleanValue[propName] =
	        checkMask(propConfig, DOMPropertyInjection.HAS_OVERLOADED_BOOLEAN_VALUE);

	      (false ? invariant(
	        !DOMProperty.mustUseAttribute[propName] ||
	          !DOMProperty.mustUseProperty[propName],
	        'DOMProperty: Cannot require using both attribute and property: %s',
	        propName
	      ) : invariant(!DOMProperty.mustUseAttribute[propName] ||
	        !DOMProperty.mustUseProperty[propName]));
	      (false ? invariant(
	        DOMProperty.mustUseProperty[propName] ||
	          !DOMProperty.hasSideEffects[propName],
	        'DOMProperty: Properties that have side effects must use property: %s',
	        propName
	      ) : invariant(DOMProperty.mustUseProperty[propName] ||
	        !DOMProperty.hasSideEffects[propName]));
	      (false ? invariant(
	        !!DOMProperty.hasBooleanValue[propName] +
	          !!DOMProperty.hasNumericValue[propName] +
	          !!DOMProperty.hasOverloadedBooleanValue[propName] <= 1,
	        'DOMProperty: Value can be one of boolean, overloaded boolean, or ' +
	        'numeric value, but not a combination: %s',
	        propName
	      ) : invariant(!!DOMProperty.hasBooleanValue[propName] +
	        !!DOMProperty.hasNumericValue[propName] +
	        !!DOMProperty.hasOverloadedBooleanValue[propName] <= 1));
	    }
	  }
	};
	var defaultValueCache = {};

	/**
	 * DOMProperty exports lookup objects that can be used like functions:
	 *
	 *   > DOMProperty.isValid['id']
	 *   true
	 *   > DOMProperty.isValid['foobar']
	 *   undefined
	 *
	 * Although this may be confusing, it performs better in general.
	 *
	 * @see http://jsperf.com/key-exists
	 * @see http://jsperf.com/key-missing
	 */
	var DOMProperty = {

	  ID_ATTRIBUTE_NAME: 'data-reactid',

	  /**
	   * Checks whether a property name is a standard property.
	   * @type {Object}
	   */
	  isStandardName: {},

	  /**
	   * Mapping from lowercase property names to the properly cased version, used
	   * to warn in the case of missing properties.
	   * @type {Object}
	   */
	  getPossibleStandardName: {},

	  /**
	   * Mapping from normalized names to attribute names that differ. Attribute
	   * names are used when rendering markup or with `*Attribute()`.
	   * @type {Object}
	   */
	  getAttributeName: {},

	  /**
	   * Mapping from normalized names to properties on DOM node instances.
	   * (This includes properties that mutate due to external factors.)
	   * @type {Object}
	   */
	  getPropertyName: {},

	  /**
	   * Mapping from normalized names to mutation methods. This will only exist if
	   * mutation cannot be set simply by the property or `setAttribute()`.
	   * @type {Object}
	   */
	  getMutationMethod: {},

	  /**
	   * Whether the property must be accessed and mutated as an object property.
	   * @type {Object}
	   */
	  mustUseAttribute: {},

	  /**
	   * Whether the property must be accessed and mutated using `*Attribute()`.
	   * (This includes anything that fails `<propName> in <element>`.)
	   * @type {Object}
	   */
	  mustUseProperty: {},

	  /**
	   * Whether or not setting a value causes side effects such as triggering
	   * resources to be loaded or text selection changes. We must ensure that
	   * the value is only set if it has changed.
	   * @type {Object}
	   */
	  hasSideEffects: {},

	  /**
	   * Whether the property should be removed when set to a falsey value.
	   * @type {Object}
	   */
	  hasBooleanValue: {},

	  /**
	   * Whether the property must be numeric or parse as a
	   * numeric and should be removed when set to a falsey value.
	   * @type {Object}
	   */
	  hasNumericValue: {},

	  /**
	   * Whether the property must be positive numeric or parse as a positive
	   * numeric and should be removed when set to a falsey value.
	   * @type {Object}
	   */
	  hasPositiveNumericValue: {},

	  /**
	   * Whether the property can be used as a flag as well as with a value. Removed
	   * when strictly equal to false; present without a value when strictly equal
	   * to true; present with a value otherwise.
	   * @type {Object}
	   */
	  hasOverloadedBooleanValue: {},

	  /**
	   * All of the isCustomAttribute() functions that have been injected.
	   */
	  _isCustomAttributeFunctions: [],

	  /**
	   * Checks whether a property name is a custom attribute.
	   * @method
	   */
	  isCustomAttribute: function(attributeName) {
	    for (var i = 0; i < DOMProperty._isCustomAttributeFunctions.length; i++) {
	      var isCustomAttributeFn = DOMProperty._isCustomAttributeFunctions[i];
	      if (isCustomAttributeFn(attributeName)) {
	        return true;
	      }
	    }
	    return false;
	  },

	  /**
	   * Returns the default property value for a DOM property (i.e., not an
	   * attribute). Most default values are '' or false, but not all. Worse yet,
	   * some (in particular, `type`) vary depending on the type of element.
	   *
	   * TODO: Is it better to grab all the possible properties when creating an
	   * element to avoid having to create the same element twice?
	   */
	  getDefaultValueForProperty: function(nodeName, prop) {
	    var nodeDefaults = defaultValueCache[nodeName];
	    var testElement;
	    if (!nodeDefaults) {
	      defaultValueCache[nodeName] = nodeDefaults = {};
	    }
	    if (!(prop in nodeDefaults)) {
	      testElement = document.createElement(nodeName);
	      nodeDefaults[prop] = testElement[prop];
	    }
	    return nodeDefaults[prop];
	  },

	  injection: DOMPropertyInjection
	};

	module.exports = DOMProperty;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule quoteAttributeValueForBrowser
	 */

	'use strict';

	var escapeTextContentForBrowser = __webpack_require__(93);

	/**
	 * Escapes attribute value to prevent scripting attacks.
	 *
	 * @param {*} value Value to escape.
	 * @return {string} An escaped string.
	 */
	function quoteAttributeValueForBrowser(value) {
	  return '"' + escapeTextContentForBrowser(value) + '"';
	}

	module.exports = quoteAttributeValueForBrowser;


/***/ },
/* 93 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule escapeTextContentForBrowser
	 */

	'use strict';

	var ESCAPE_LOOKUP = {
	  '&': '&amp;',
	  '>': '&gt;',
	  '<': '&lt;',
	  '"': '&quot;',
	  '\'': '&#x27;'
	};

	var ESCAPE_REGEX = /[&><"']/g;

	function escaper(match) {
	  return ESCAPE_LOOKUP[match];
	}

	/**
	 * Escapes text to prevent scripting attacks.
	 *
	 * @param {*} text Text value to escape.
	 * @return {string} An escaped string.
	 */
	function escapeTextContentForBrowser(text) {
	  return ('' + text).replace(ESCAPE_REGEX, escaper);
	}

	module.exports = escapeTextContentForBrowser;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponentBrowserEnvironment
	 */

	/*jslint evil: true */

	'use strict';

	var ReactDOMIDOperations = __webpack_require__(95);
	var ReactMount = __webpack_require__(114);

	/**
	 * Abstracts away all functionality of the reconciler that requires knowledge of
	 * the browser context. TODO: These callers should be refactored to avoid the
	 * need for this injection.
	 */
	var ReactComponentBrowserEnvironment = {

	  processChildrenUpdates:
	    ReactDOMIDOperations.dangerouslyProcessChildrenUpdates,

	  replaceNodeWithMarkupByID:
	    ReactDOMIDOperations.dangerouslyReplaceNodeWithMarkupByID,

	  /**
	   * If a particular environment requires that some resources be cleaned up,
	   * specify this in the injected Mixin. In the DOM, we would likely want to
	   * purge any cached node ID lookups.
	   *
	   * @private
	   */
	  unmountIDFromEnvironment: function(rootNodeID) {
	    ReactMount.purgeID(rootNodeID);
	  }

	};

	module.exports = ReactComponentBrowserEnvironment;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMIDOperations
	 * @typechecks static-only
	 */

	/*jslint evil: true */

	'use strict';

	var CSSPropertyOperations = __webpack_require__(96);
	var DOMChildrenOperations = __webpack_require__(105);
	var DOMPropertyOperations = __webpack_require__(90);
	var ReactMount = __webpack_require__(114);
	var ReactPerf = __webpack_require__(75);

	var invariant = __webpack_require__(54);
	var setInnerHTML = __webpack_require__(113);

	/**
	 * Errors for properties that should not be updated with `updatePropertyById()`.
	 *
	 * @type {object}
	 * @private
	 */
	var INVALID_PROPERTY_ERRORS = {
	  dangerouslySetInnerHTML:
	    '`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.',
	  style: '`style` must be set using `updateStylesByID()`.'
	};

	/**
	 * Operations used to process updates to DOM nodes. This is made injectable via
	 * `ReactDOMComponent.BackendIDOperations`.
	 */
	var ReactDOMIDOperations = {

	  /**
	   * Updates a DOM node with new property values. This should only be used to
	   * update DOM properties in `DOMProperty`.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {string} name A valid property name, see `DOMProperty`.
	   * @param {*} value New value of the property.
	   * @internal
	   */
	  updatePropertyByID: function(id, name, value) {
	    var node = ReactMount.getNode(id);
	    (false ? invariant(
	      !INVALID_PROPERTY_ERRORS.hasOwnProperty(name),
	      'updatePropertyByID(...): %s',
	      INVALID_PROPERTY_ERRORS[name]
	    ) : invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name)));

	    // If we're updating to null or undefined, we should remove the property
	    // from the DOM node instead of inadvertantly setting to a string. This
	    // brings us in line with the same behavior we have on initial render.
	    if (value != null) {
	      DOMPropertyOperations.setValueForProperty(node, name, value);
	    } else {
	      DOMPropertyOperations.deleteValueForProperty(node, name);
	    }
	  },

	  /**
	   * Updates a DOM node to remove a property. This should only be used to remove
	   * DOM properties in `DOMProperty`.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {string} name A property name to remove, see `DOMProperty`.
	   * @internal
	   */
	  deletePropertyByID: function(id, name, value) {
	    var node = ReactMount.getNode(id);
	    (false ? invariant(
	      !INVALID_PROPERTY_ERRORS.hasOwnProperty(name),
	      'updatePropertyByID(...): %s',
	      INVALID_PROPERTY_ERRORS[name]
	    ) : invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name)));
	    DOMPropertyOperations.deleteValueForProperty(node, name, value);
	  },

	  /**
	   * Updates a DOM node with new style values. If a value is specified as '',
	   * the corresponding style property will be unset.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {object} styles Mapping from styles to values.
	   * @internal
	   */
	  updateStylesByID: function(id, styles) {
	    var node = ReactMount.getNode(id);
	    CSSPropertyOperations.setValueForStyles(node, styles);
	  },

	  /**
	   * Updates a DOM node's innerHTML.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {string} html An HTML string.
	   * @internal
	   */
	  updateInnerHTMLByID: function(id, html) {
	    var node = ReactMount.getNode(id);
	    setInnerHTML(node, html);
	  },

	  /**
	   * Updates a DOM node's text content set by `props.content`.
	   *
	   * @param {string} id ID of the node to update.
	   * @param {string} content Text content.
	   * @internal
	   */
	  updateTextContentByID: function(id, content) {
	    var node = ReactMount.getNode(id);
	    DOMChildrenOperations.updateTextContent(node, content);
	  },

	  /**
	   * Replaces a DOM node that exists in the document with markup.
	   *
	   * @param {string} id ID of child to be replaced.
	   * @param {string} markup Dangerous markup to inject in place of child.
	   * @internal
	   * @see {Danger.dangerouslyReplaceNodeWithMarkup}
	   */
	  dangerouslyReplaceNodeWithMarkupByID: function(id, markup) {
	    var node = ReactMount.getNode(id);
	    DOMChildrenOperations.dangerouslyReplaceNodeWithMarkup(node, markup);
	  },

	  /**
	   * Updates a component's children by processing a series of updates.
	   *
	   * @param {array<object>} updates List of update configurations.
	   * @param {array<string>} markup List of markup strings.
	   * @internal
	   */
	  dangerouslyProcessChildrenUpdates: function(updates, markup) {
	    for (var i = 0; i < updates.length; i++) {
	      updates[i].parentNode = ReactMount.getNode(updates[i].parentID);
	    }
	    DOMChildrenOperations.processUpdates(updates, markup);
	  }
	};

	ReactPerf.measureMethods(ReactDOMIDOperations, 'ReactDOMIDOperations', {
	  updatePropertyByID: 'updatePropertyByID',
	  deletePropertyByID: 'deletePropertyByID',
	  updateStylesByID: 'updateStylesByID',
	  updateInnerHTMLByID: 'updateInnerHTMLByID',
	  updateTextContentByID: 'updateTextContentByID',
	  dangerouslyReplaceNodeWithMarkupByID: 'dangerouslyReplaceNodeWithMarkupByID',
	  dangerouslyProcessChildrenUpdates: 'dangerouslyProcessChildrenUpdates'
	});

	module.exports = ReactDOMIDOperations;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CSSPropertyOperations
	 * @typechecks static-only
	 */

	'use strict';

	var CSSProperty = __webpack_require__(99);
	var ExecutionEnvironment = __webpack_require__(100);

	var camelizeStyleName = __webpack_require__(101);
	var dangerousStyleValue = __webpack_require__(103);
	var hyphenateStyleName = __webpack_require__(97);
	var memoizeStringOnly = __webpack_require__(104);
	var warning = __webpack_require__(59);

	var processStyleName = memoizeStringOnly(function(styleName) {
	  return hyphenateStyleName(styleName);
	});

	var styleFloatAccessor = 'cssFloat';
	if (ExecutionEnvironment.canUseDOM) {
	  // IE8 only supports accessing cssFloat (standard) as styleFloat
	  if (document.documentElement.style.cssFloat === undefined) {
	    styleFloatAccessor = 'styleFloat';
	  }
	}

	if (false) {
	  // 'msTransform' is correct, but the other prefixes should be capitalized
	  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

	  // style values shouldn't contain a semicolon
	  var badStyleValueWithSemicolonPattern = /;\s*$/;

	  var warnedStyleNames = {};
	  var warnedStyleValues = {};

	  var warnHyphenatedStyleName = function(name) {
	    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	      return;
	    }

	    warnedStyleNames[name] = true;
	    ("production" !== process.env.NODE_ENV ? warning(
	      false,
	      'Unsupported style property %s. Did you mean %s?',
	      name,
	      camelizeStyleName(name)
	    ) : null);
	  };

	  var warnBadVendoredStyleName = function(name) {
	    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	      return;
	    }

	    warnedStyleNames[name] = true;
	    ("production" !== process.env.NODE_ENV ? warning(
	      false,
	      'Unsupported vendor-prefixed style property %s. Did you mean %s?',
	      name,
	      name.charAt(0).toUpperCase() + name.slice(1)
	    ) : null);
	  };

	  var warnStyleValueWithSemicolon = function(name, value) {
	    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
	      return;
	    }

	    warnedStyleValues[value] = true;
	    ("production" !== process.env.NODE_ENV ? warning(
	      false,
	      'Style property values shouldn\'t contain a semicolon. ' +
	      'Try "%s: %s" instead.',
	      name,
	      value.replace(badStyleValueWithSemicolonPattern, '')
	    ) : null);
	  };

	  /**
	   * @param {string} name
	   * @param {*} value
	   */
	  var warnValidStyle = function(name, value) {
	    if (name.indexOf('-') > -1) {
	      warnHyphenatedStyleName(name);
	    } else if (badVendoredStyleNamePattern.test(name)) {
	      warnBadVendoredStyleName(name);
	    } else if (badStyleValueWithSemicolonPattern.test(value)) {
	      warnStyleValueWithSemicolon(name, value);
	    }
	  };
	}

	/**
	 * Operations for dealing with CSS properties.
	 */
	var CSSPropertyOperations = {

	  /**
	   * Serializes a mapping of style properties for use as inline styles:
	   *
	   *   > createMarkupForStyles({width: '200px', height: 0})
	   *   "width:200px;height:0;"
	   *
	   * Undefined values are ignored so that declarative programming is easier.
	   * The result should be HTML-escaped before insertion into the DOM.
	   *
	   * @param {object} styles
	   * @return {?string}
	   */
	  createMarkupForStyles: function(styles) {
	    var serialized = '';
	    for (var styleName in styles) {
	      if (!styles.hasOwnProperty(styleName)) {
	        continue;
	      }
	      var styleValue = styles[styleName];
	      if (false) {
	        warnValidStyle(styleName, styleValue);
	      }
	      if (styleValue != null) {
	        serialized += processStyleName(styleName) + ':';
	        serialized += dangerousStyleValue(styleName, styleValue) + ';';
	      }
	    }
	    return serialized || null;
	  },

	  /**
	   * Sets the value for multiple styles on a node.  If a value is specified as
	   * '' (empty string), the corresponding style property will be unset.
	   *
	   * @param {DOMElement} node
	   * @param {object} styles
	   */
	  setValueForStyles: function(node, styles) {
	    var style = node.style;
	    for (var styleName in styles) {
	      if (!styles.hasOwnProperty(styleName)) {
	        continue;
	      }
	      if (false) {
	        warnValidStyle(styleName, styles[styleName]);
	      }
	      var styleValue = dangerousStyleValue(styleName, styles[styleName]);
	      if (styleName === 'float') {
	        styleName = styleFloatAccessor;
	      }
	      if (styleValue) {
	        style[styleName] = styleValue;
	      } else {
	        var expansion = CSSProperty.shorthandPropertyExpansions[styleName];
	        if (expansion) {
	          // Shorthand property that IE8 won't like unsetting, so unset each
	          // component to placate it
	          for (var individualStyleName in expansion) {
	            style[individualStyleName] = '';
	          }
	        } else {
	          style[styleName] = '';
	        }
	      }
	    }
	  }

	};

	module.exports = CSSPropertyOperations;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule hyphenateStyleName
	 * @typechecks
	 */

	"use strict";

	var hyphenate = __webpack_require__(98);

	var msPattern = /^ms-/;

	/**
	 * Hyphenates a camelcased CSS property name, for example:
	 *
	 *   > hyphenateStyleName('backgroundColor')
	 *   < "background-color"
	 *   > hyphenateStyleName('MozTransition')
	 *   < "-moz-transition"
	 *   > hyphenateStyleName('msTransition')
	 *   < "-ms-transition"
	 *
	 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
	 * is converted to `-ms-`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenateStyleName(string) {
	  return hyphenate(string).replace(msPattern, '-ms-');
	}

	module.exports = hyphenateStyleName;


/***/ },
/* 98 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule hyphenate
	 * @typechecks
	 */

	var _uppercasePattern = /([A-Z])/g;

	/**
	 * Hyphenates a camelcased string, for example:
	 *
	 *   > hyphenate('backgroundColor')
	 *   < "background-color"
	 *
	 * For CSS style names, use `hyphenateStyleName` instead which works properly
	 * with all vendor prefixes, including `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenate(string) {
	  return string.replace(_uppercasePattern, '-$1').toLowerCase();
	}

	module.exports = hyphenate;


/***/ },
/* 99 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CSSProperty
	 */

	'use strict';

	/**
	 * CSS properties which accept numbers but are not in units of "px".
	 */
	var isUnitlessNumber = {
	  boxFlex: true,
	  boxFlexGroup: true,
	  columnCount: true,
	  flex: true,
	  flexGrow: true,
	  flexPositive: true,
	  flexShrink: true,
	  flexNegative: true,
	  fontWeight: true,
	  lineClamp: true,
	  lineHeight: true,
	  opacity: true,
	  order: true,
	  orphans: true,
	  widows: true,
	  zIndex: true,
	  zoom: true,

	  // SVG-related properties
	  fillOpacity: true,
	  strokeDashoffset: true,
	  strokeOpacity: true,
	  strokeWidth: true
	};

	/**
	 * @param {string} prefix vendor-specific prefix, eg: Webkit
	 * @param {string} key style name, eg: transitionDuration
	 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
	 * WebkitTransitionDuration
	 */
	function prefixKey(prefix, key) {
	  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	}

	/**
	 * Support style names that may come passed in prefixed by adding permutations
	 * of vendor prefixes.
	 */
	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

	// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
	// infinite loop, because it iterates over the newly added props too.
	Object.keys(isUnitlessNumber).forEach(function(prop) {
	  prefixes.forEach(function(prefix) {
	    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
	  });
	});

	/**
	 * Most style properties can be unset by doing .style[prop] = '' but IE8
	 * doesn't like doing that with shorthand properties so for the properties that
	 * IE8 breaks on, which are listed here, we instead unset each of the
	 * individual properties. See http://bugs.jquery.com/ticket/12385.
	 * The 4-value 'clock' properties like margin, padding, border-width seem to
	 * behave without any problems. Curiously, list-style works too without any
	 * special prodding.
	 */
	var shorthandPropertyExpansions = {
	  background: {
	    backgroundImage: true,
	    backgroundPosition: true,
	    backgroundRepeat: true,
	    backgroundColor: true
	  },
	  border: {
	    borderWidth: true,
	    borderStyle: true,
	    borderColor: true
	  },
	  borderBottom: {
	    borderBottomWidth: true,
	    borderBottomStyle: true,
	    borderBottomColor: true
	  },
	  borderLeft: {
	    borderLeftWidth: true,
	    borderLeftStyle: true,
	    borderLeftColor: true
	  },
	  borderRight: {
	    borderRightWidth: true,
	    borderRightStyle: true,
	    borderRightColor: true
	  },
	  borderTop: {
	    borderTopWidth: true,
	    borderTopStyle: true,
	    borderTopColor: true
	  },
	  font: {
	    fontStyle: true,
	    fontVariant: true,
	    fontWeight: true,
	    fontSize: true,
	    lineHeight: true,
	    fontFamily: true
	  }
	};

	var CSSProperty = {
	  isUnitlessNumber: isUnitlessNumber,
	  shorthandPropertyExpansions: shorthandPropertyExpansions
	};

	module.exports = CSSProperty;


/***/ },
/* 100 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ExecutionEnvironment
	 */

	/*jslint evil: true */

	"use strict";

	var canUseDOM = !!(
	  (typeof window !== 'undefined' &&
	  window.document && window.document.createElement)
	);

	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  canUseEventListeners:
	    canUseDOM && !!(window.addEventListener || window.attachEvent),

	  canUseViewport: canUseDOM && !!window.screen,

	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};

	module.exports = ExecutionEnvironment;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule camelizeStyleName
	 * @typechecks
	 */

	"use strict";

	var camelize = __webpack_require__(102);

	var msPattern = /^-ms-/;

	/**
	 * Camelcases a hyphenated CSS property name, for example:
	 *
	 *   > camelizeStyleName('background-color')
	 *   < "backgroundColor"
	 *   > camelizeStyleName('-moz-transition')
	 *   < "MozTransition"
	 *   > camelizeStyleName('-ms-transition')
	 *   < "msTransition"
	 *
	 * As Andi Smith suggests
	 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
	 * is converted to lowercase `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelizeStyleName(string) {
	  return camelize(string.replace(msPattern, 'ms-'));
	}

	module.exports = camelizeStyleName;


/***/ },
/* 102 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule camelize
	 * @typechecks
	 */

	var _hyphenPattern = /-(.)/g;

	/**
	 * Camelcases a hyphenated string, for example:
	 *
	 *   > camelize('background-color')
	 *   < "backgroundColor"
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelize(string) {
	  return string.replace(_hyphenPattern, function(_, character) {
	    return character.toUpperCase();
	  });
	}

	module.exports = camelize;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule dangerousStyleValue
	 * @typechecks static-only
	 */

	'use strict';

	var CSSProperty = __webpack_require__(99);

	var isUnitlessNumber = CSSProperty.isUnitlessNumber;

	/**
	 * Convert a value into the proper css writable value. The style name `name`
	 * should be logical (no hyphens), as specified
	 * in `CSSProperty.isUnitlessNumber`.
	 *
	 * @param {string} name CSS property name such as `topMargin`.
	 * @param {*} value CSS property value such as `10px`.
	 * @return {string} Normalized style value with dimensions applied.
	 */
	function dangerousStyleValue(name, value) {
	  // Note that we've removed escapeTextForBrowser() calls here since the
	  // whole string will be escaped when the attribute is injected into
	  // the markup. If you provide unsafe user data here they can inject
	  // arbitrary CSS which may be problematic (I couldn't repro this):
	  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
	  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
	  // This is not an XSS hole but instead a potential CSS injection issue
	  // which has lead to a greater discussion about how we're going to
	  // trust URLs moving forward. See #2115901

	  var isEmpty = value == null || typeof value === 'boolean' || value === '';
	  if (isEmpty) {
	    return '';
	  }

	  var isNonNumeric = isNaN(value);
	  if (isNonNumeric || value === 0 ||
	      isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
	    return '' + value; // cast to string
	  }

	  if (typeof value === 'string') {
	    value = value.trim();
	  }
	  return value + 'px';
	}

	module.exports = dangerousStyleValue;


/***/ },
/* 104 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule memoizeStringOnly
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * Memoizes the return value of a function that accepts one string argument.
	 *
	 * @param {function} callback
	 * @return {function}
	 */
	function memoizeStringOnly(callback) {
	  var cache = {};
	  return function(string) {
	    if (!cache.hasOwnProperty(string)) {
	      cache[string] = callback.call(this, string);
	    }
	    return cache[string];
	  };
	}

	module.exports = memoizeStringOnly;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DOMChildrenOperations
	 * @typechecks static-only
	 */

	'use strict';

	var Danger = __webpack_require__(106);
	var ReactMultiChildUpdateTypes = __webpack_require__(111);

	var setTextContent = __webpack_require__(112);
	var invariant = __webpack_require__(54);

	/**
	 * Inserts `childNode` as a child of `parentNode` at the `index`.
	 *
	 * @param {DOMElement} parentNode Parent node in which to insert.
	 * @param {DOMElement} childNode Child node to insert.
	 * @param {number} index Index at which to insert the child.
	 * @internal
	 */
	function insertChildAt(parentNode, childNode, index) {
	  // By exploiting arrays returning `undefined` for an undefined index, we can
	  // rely exclusively on `insertBefore(node, null)` instead of also using
	  // `appendChild(node)`. However, using `undefined` is not allowed by all
	  // browsers so we must replace it with `null`.
	  parentNode.insertBefore(
	    childNode,
	    parentNode.childNodes[index] || null
	  );
	}

	/**
	 * Operations for updating with DOM children.
	 */
	var DOMChildrenOperations = {

	  dangerouslyReplaceNodeWithMarkup: Danger.dangerouslyReplaceNodeWithMarkup,

	  updateTextContent: setTextContent,

	  /**
	   * Updates a component's children by processing a series of updates. The
	   * update configurations are each expected to have a `parentNode` property.
	   *
	   * @param {array<object>} updates List of update configurations.
	   * @param {array<string>} markupList List of markup strings.
	   * @internal
	   */
	  processUpdates: function(updates, markupList) {
	    var update;
	    // Mapping from parent IDs to initial child orderings.
	    var initialChildren = null;
	    // List of children that will be moved or removed.
	    var updatedChildren = null;

	    for (var i = 0; i < updates.length; i++) {
	      update = updates[i];
	      if (update.type === ReactMultiChildUpdateTypes.MOVE_EXISTING ||
	          update.type === ReactMultiChildUpdateTypes.REMOVE_NODE) {
	        var updatedIndex = update.fromIndex;
	        var updatedChild = update.parentNode.childNodes[updatedIndex];
	        var parentID = update.parentID;

	        (false ? invariant(
	          updatedChild,
	          'processUpdates(): Unable to find child %s of element. This ' +
	          'probably means the DOM was unexpectedly mutated (e.g., by the ' +
	          'browser), usually due to forgetting a <tbody> when using tables, ' +
	          'nesting tags like <form>, <p>, or <a>, or using non-SVG elements ' +
	          'in an <svg> parent. Try inspecting the child nodes of the element ' +
	          'with React ID `%s`.',
	          updatedIndex,
	          parentID
	        ) : invariant(updatedChild));

	        initialChildren = initialChildren || {};
	        initialChildren[parentID] = initialChildren[parentID] || [];
	        initialChildren[parentID][updatedIndex] = updatedChild;

	        updatedChildren = updatedChildren || [];
	        updatedChildren.push(updatedChild);
	      }
	    }

	    var renderedMarkup = Danger.dangerouslyRenderMarkup(markupList);

	    // Remove updated children first so that `toIndex` is consistent.
	    if (updatedChildren) {
	      for (var j = 0; j < updatedChildren.length; j++) {
	        updatedChildren[j].parentNode.removeChild(updatedChildren[j]);
	      }
	    }

	    for (var k = 0; k < updates.length; k++) {
	      update = updates[k];
	      switch (update.type) {
	        case ReactMultiChildUpdateTypes.INSERT_MARKUP:
	          insertChildAt(
	            update.parentNode,
	            renderedMarkup[update.markupIndex],
	            update.toIndex
	          );
	          break;
	        case ReactMultiChildUpdateTypes.MOVE_EXISTING:
	          insertChildAt(
	            update.parentNode,
	            initialChildren[update.parentID][update.fromIndex],
	            update.toIndex
	          );
	          break;
	        case ReactMultiChildUpdateTypes.TEXT_CONTENT:
	          setTextContent(
	            update.parentNode,
	            update.textContent
	          );
	          break;
	        case ReactMultiChildUpdateTypes.REMOVE_NODE:
	          // Already removed by the for-loop above.
	          break;
	      }
	    }
	  }

	};

	module.exports = DOMChildrenOperations;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Danger
	 * @typechecks static-only
	 */

	/*jslint evil: true, sub: true */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(100);

	var createNodesFromMarkup = __webpack_require__(107);
	var emptyFunction = __webpack_require__(60);
	var getMarkupWrap = __webpack_require__(110);
	var invariant = __webpack_require__(54);

	var OPEN_TAG_NAME_EXP = /^(<[^ \/>]+)/;
	var RESULT_INDEX_ATTR = 'data-danger-index';

	/**
	 * Extracts the `nodeName` from a string of markup.
	 *
	 * NOTE: Extracting the `nodeName` does not require a regular expression match
	 * because we make assumptions about React-generated markup (i.e. there are no
	 * spaces surrounding the opening tag and there is at least one attribute).
	 *
	 * @param {string} markup String of markup.
	 * @return {string} Node name of the supplied markup.
	 * @see http://jsperf.com/extract-nodename
	 */
	function getNodeName(markup) {
	  return markup.substring(1, markup.indexOf(' '));
	}

	var Danger = {

	  /**
	   * Renders markup into an array of nodes. The markup is expected to render
	   * into a list of root nodes. Also, the length of `resultList` and
	   * `markupList` should be the same.
	   *
	   * @param {array<string>} markupList List of markup strings to render.
	   * @return {array<DOMElement>} List of rendered nodes.
	   * @internal
	   */
	  dangerouslyRenderMarkup: function(markupList) {
	    (false ? invariant(
	      ExecutionEnvironment.canUseDOM,
	      'dangerouslyRenderMarkup(...): Cannot render markup in a worker ' +
	      'thread. Make sure `window` and `document` are available globally ' +
	      'before requiring React when unit testing or use ' +
	      'React.renderToString for server rendering.'
	    ) : invariant(ExecutionEnvironment.canUseDOM));
	    var nodeName;
	    var markupByNodeName = {};
	    // Group markup by `nodeName` if a wrap is necessary, else by '*'.
	    for (var i = 0; i < markupList.length; i++) {
	      (false ? invariant(
	        markupList[i],
	        'dangerouslyRenderMarkup(...): Missing markup.'
	      ) : invariant(markupList[i]));
	      nodeName = getNodeName(markupList[i]);
	      nodeName = getMarkupWrap(nodeName) ? nodeName : '*';
	      markupByNodeName[nodeName] = markupByNodeName[nodeName] || [];
	      markupByNodeName[nodeName][i] = markupList[i];
	    }
	    var resultList = [];
	    var resultListAssignmentCount = 0;
	    for (nodeName in markupByNodeName) {
	      if (!markupByNodeName.hasOwnProperty(nodeName)) {
	        continue;
	      }
	      var markupListByNodeName = markupByNodeName[nodeName];

	      // This for-in loop skips the holes of the sparse array. The order of
	      // iteration should follow the order of assignment, which happens to match
	      // numerical index order, but we don't rely on that.
	      var resultIndex;
	      for (resultIndex in markupListByNodeName) {
	        if (markupListByNodeName.hasOwnProperty(resultIndex)) {
	          var markup = markupListByNodeName[resultIndex];

	          // Push the requested markup with an additional RESULT_INDEX_ATTR
	          // attribute.  If the markup does not start with a < character, it
	          // will be discarded below (with an appropriate console.error).
	          markupListByNodeName[resultIndex] = markup.replace(
	            OPEN_TAG_NAME_EXP,
	            // This index will be parsed back out below.
	            '$1 ' + RESULT_INDEX_ATTR + '="' + resultIndex + '" '
	          );
	        }
	      }

	      // Render each group of markup with similar wrapping `nodeName`.
	      var renderNodes = createNodesFromMarkup(
	        markupListByNodeName.join(''),
	        emptyFunction // Do nothing special with <script> tags.
	      );

	      for (var j = 0; j < renderNodes.length; ++j) {
	        var renderNode = renderNodes[j];
	        if (renderNode.hasAttribute &&
	            renderNode.hasAttribute(RESULT_INDEX_ATTR)) {

	          resultIndex = +renderNode.getAttribute(RESULT_INDEX_ATTR);
	          renderNode.removeAttribute(RESULT_INDEX_ATTR);

	          (false ? invariant(
	            !resultList.hasOwnProperty(resultIndex),
	            'Danger: Assigning to an already-occupied result index.'
	          ) : invariant(!resultList.hasOwnProperty(resultIndex)));

	          resultList[resultIndex] = renderNode;

	          // This should match resultList.length and markupList.length when
	          // we're done.
	          resultListAssignmentCount += 1;

	        } else if (false) {
	          console.error(
	            'Danger: Discarding unexpected node:',
	            renderNode
	          );
	        }
	      }
	    }

	    // Although resultList was populated out of order, it should now be a dense
	    // array.
	    (false ? invariant(
	      resultListAssignmentCount === resultList.length,
	      'Danger: Did not assign to every index of resultList.'
	    ) : invariant(resultListAssignmentCount === resultList.length));

	    (false ? invariant(
	      resultList.length === markupList.length,
	      'Danger: Expected markup to render %s nodes, but rendered %s.',
	      markupList.length,
	      resultList.length
	    ) : invariant(resultList.length === markupList.length));

	    return resultList;
	  },

	  /**
	   * Replaces a node with a string of markup at its current position within its
	   * parent. The markup must render into a single root node.
	   *
	   * @param {DOMElement} oldChild Child node to replace.
	   * @param {string} markup Markup to render in place of the child node.
	   * @internal
	   */
	  dangerouslyReplaceNodeWithMarkup: function(oldChild, markup) {
	    (false ? invariant(
	      ExecutionEnvironment.canUseDOM,
	      'dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a ' +
	      'worker thread. Make sure `window` and `document` are available ' +
	      'globally before requiring React when unit testing or use ' +
	      'React.renderToString for server rendering.'
	    ) : invariant(ExecutionEnvironment.canUseDOM));
	    (false ? invariant(markup, 'dangerouslyReplaceNodeWithMarkup(...): Missing markup.') : invariant(markup));
	    (false ? invariant(
	      oldChild.tagName.toLowerCase() !== 'html',
	      'dangerouslyReplaceNodeWithMarkup(...): Cannot replace markup of the ' +
	      '<html> node. This is because browser quirks make this unreliable ' +
	      'and/or slow. If you want to render to the root you must use ' +
	      'server rendering. See React.renderToString().'
	    ) : invariant(oldChild.tagName.toLowerCase() !== 'html'));

	    var newChild = createNodesFromMarkup(markup, emptyFunction)[0];
	    oldChild.parentNode.replaceChild(newChild, oldChild);
	  }

	};

	module.exports = Danger;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule createNodesFromMarkup
	 * @typechecks
	 */

	/*jslint evil: true, sub: true */

	var ExecutionEnvironment = __webpack_require__(100);

	var createArrayFromMixed = __webpack_require__(108);
	var getMarkupWrap = __webpack_require__(110);
	var invariant = __webpack_require__(54);

	/**
	 * Dummy container used to render all markup.
	 */
	var dummyNode =
	  ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;

	/**
	 * Pattern used by `getNodeName`.
	 */
	var nodeNamePattern = /^\s*<(\w+)/;

	/**
	 * Extracts the `nodeName` of the first element in a string of markup.
	 *
	 * @param {string} markup String of markup.
	 * @return {?string} Node name of the supplied markup.
	 */
	function getNodeName(markup) {
	  var nodeNameMatch = markup.match(nodeNamePattern);
	  return nodeNameMatch && nodeNameMatch[1].toLowerCase();
	}

	/**
	 * Creates an array containing the nodes rendered from the supplied markup. The
	 * optionally supplied `handleScript` function will be invoked once for each
	 * <script> element that is rendered. If no `handleScript` function is supplied,
	 * an exception is thrown if any <script> elements are rendered.
	 *
	 * @param {string} markup A string of valid HTML markup.
	 * @param {?function} handleScript Invoked once for each rendered <script>.
	 * @return {array<DOMElement|DOMTextNode>} An array of rendered nodes.
	 */
	function createNodesFromMarkup(markup, handleScript) {
	  var node = dummyNode;
	  (false ? invariant(!!dummyNode, 'createNodesFromMarkup dummy not initialized') : invariant(!!dummyNode));
	  var nodeName = getNodeName(markup);

	  var wrap = nodeName && getMarkupWrap(nodeName);
	  if (wrap) {
	    node.innerHTML = wrap[1] + markup + wrap[2];

	    var wrapDepth = wrap[0];
	    while (wrapDepth--) {
	      node = node.lastChild;
	    }
	  } else {
	    node.innerHTML = markup;
	  }

	  var scripts = node.getElementsByTagName('script');
	  if (scripts.length) {
	    (false ? invariant(
	      handleScript,
	      'createNodesFromMarkup(...): Unexpected <script> element rendered.'
	    ) : invariant(handleScript));
	    createArrayFromMixed(scripts).forEach(handleScript);
	  }

	  var nodes = createArrayFromMixed(node.childNodes);
	  while (node.lastChild) {
	    node.removeChild(node.lastChild);
	  }
	  return nodes;
	}

	module.exports = createNodesFromMarkup;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule createArrayFromMixed
	 * @typechecks
	 */

	var toArray = __webpack_require__(109);

	/**
	 * Perform a heuristic test to determine if an object is "array-like".
	 *
	 *   A monk asked Joshu, a Zen master, "Has a dog Buddha nature?"
	 *   Joshu replied: "Mu."
	 *
	 * This function determines if its argument has "array nature": it returns
	 * true if the argument is an actual array, an `arguments' object, or an
	 * HTMLCollection (e.g. node.childNodes or node.getElementsByTagName()).
	 *
	 * It will return false for other array-like objects like Filelist.
	 *
	 * @param {*} obj
	 * @return {boolean}
	 */
	function hasArrayNature(obj) {
	  return (
	    // not null/false
	    !!obj &&
	    // arrays are objects, NodeLists are functions in Safari
	    (typeof obj == 'object' || typeof obj == 'function') &&
	    // quacks like an array
	    ('length' in obj) &&
	    // not window
	    !('setInterval' in obj) &&
	    // no DOM node should be considered an array-like
	    // a 'select' element has 'length' and 'item' properties on IE8
	    (typeof obj.nodeType != 'number') &&
	    (
	      // a real array
	      (// HTMLCollection/NodeList
	      (Array.isArray(obj) ||
	      // arguments
	      ('callee' in obj) || 'item' in obj))
	    )
	  );
	}

	/**
	 * Ensure that the argument is an array by wrapping it in an array if it is not.
	 * Creates a copy of the argument if it is already an array.
	 *
	 * This is mostly useful idiomatically:
	 *
	 *   var createArrayFromMixed = require('createArrayFromMixed');
	 *
	 *   function takesOneOrMoreThings(things) {
	 *     things = createArrayFromMixed(things);
	 *     ...
	 *   }
	 *
	 * This allows you to treat `things' as an array, but accept scalars in the API.
	 *
	 * If you need to convert an array-like object, like `arguments`, into an array
	 * use toArray instead.
	 *
	 * @param {*} obj
	 * @return {array}
	 */
	function createArrayFromMixed(obj) {
	  if (!hasArrayNature(obj)) {
	    return [obj];
	  } else if (Array.isArray(obj)) {
	    return obj.slice();
	  } else {
	    return toArray(obj);
	  }
	}

	module.exports = createArrayFromMixed;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule toArray
	 * @typechecks
	 */

	var invariant = __webpack_require__(54);

	/**
	 * Convert array-like objects to arrays.
	 *
	 * This API assumes the caller knows the contents of the data type. For less
	 * well defined inputs use createArrayFromMixed.
	 *
	 * @param {object|function|filelist} obj
	 * @return {array}
	 */
	function toArray(obj) {
	  var length = obj.length;

	  // Some browse builtin objects can report typeof 'function' (e.g. NodeList in
	  // old versions of Safari).
	  (false ? invariant(
	    !Array.isArray(obj) &&
	    (typeof obj === 'object' || typeof obj === 'function'),
	    'toArray: Array-like object expected'
	  ) : invariant(!Array.isArray(obj) &&
	  (typeof obj === 'object' || typeof obj === 'function')));

	  (false ? invariant(
	    typeof length === 'number',
	    'toArray: Object needs a length property'
	  ) : invariant(typeof length === 'number'));

	  (false ? invariant(
	    length === 0 ||
	    (length - 1) in obj,
	    'toArray: Object should have keys for indices'
	  ) : invariant(length === 0 ||
	  (length - 1) in obj));

	  // Old IE doesn't give collections access to hasOwnProperty. Assume inputs
	  // without method will throw during the slice call and skip straight to the
	  // fallback.
	  if (obj.hasOwnProperty) {
	    try {
	      return Array.prototype.slice.call(obj);
	    } catch (e) {
	      // IE < 9 does not support Array#slice on collections objects
	    }
	  }

	  // Fall back to copying key by key. This assumes all keys have a value,
	  // so will not preserve sparsely populated inputs.
	  var ret = Array(length);
	  for (var ii = 0; ii < length; ii++) {
	    ret[ii] = obj[ii];
	  }
	  return ret;
	}

	module.exports = toArray;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getMarkupWrap
	 */

	var ExecutionEnvironment = __webpack_require__(100);

	var invariant = __webpack_require__(54);

	/**
	 * Dummy container used to detect which wraps are necessary.
	 */
	var dummyNode =
	  ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;

	/**
	 * Some browsers cannot use `innerHTML` to render certain elements standalone,
	 * so we wrap them, render the wrapped nodes, then extract the desired node.
	 *
	 * In IE8, certain elements cannot render alone, so wrap all elements ('*').
	 */
	var shouldWrap = {
	  // Force wrapping for SVG elements because if they get created inside a <div>,
	  // they will be initialized in the wrong namespace (and will not display).
	  'circle': true,
	  'clipPath': true,
	  'defs': true,
	  'ellipse': true,
	  'g': true,
	  'line': true,
	  'linearGradient': true,
	  'path': true,
	  'polygon': true,
	  'polyline': true,
	  'radialGradient': true,
	  'rect': true,
	  'stop': true,
	  'text': true
	};

	var selectWrap = [1, '<select multiple="true">', '</select>'];
	var tableWrap = [1, '<table>', '</table>'];
	var trWrap = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

	var svgWrap = [1, '<svg>', '</svg>'];

	var markupWrap = {
	  '*': [1, '?<div>', '</div>'],

	  'area': [1, '<map>', '</map>'],
	  'col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  'legend': [1, '<fieldset>', '</fieldset>'],
	  'param': [1, '<object>', '</object>'],
	  'tr': [2, '<table><tbody>', '</tbody></table>'],

	  'optgroup': selectWrap,
	  'option': selectWrap,

	  'caption': tableWrap,
	  'colgroup': tableWrap,
	  'tbody': tableWrap,
	  'tfoot': tableWrap,
	  'thead': tableWrap,

	  'td': trWrap,
	  'th': trWrap,

	  'circle': svgWrap,
	  'clipPath': svgWrap,
	  'defs': svgWrap,
	  'ellipse': svgWrap,
	  'g': svgWrap,
	  'line': svgWrap,
	  'linearGradient': svgWrap,
	  'path': svgWrap,
	  'polygon': svgWrap,
	  'polyline': svgWrap,
	  'radialGradient': svgWrap,
	  'rect': svgWrap,
	  'stop': svgWrap,
	  'text': svgWrap
	};

	/**
	 * Gets the markup wrap configuration for the supplied `nodeName`.
	 *
	 * NOTE: This lazily detects which wraps are necessary for the current browser.
	 *
	 * @param {string} nodeName Lowercase `nodeName`.
	 * @return {?array} Markup wrap configuration, if applicable.
	 */
	function getMarkupWrap(nodeName) {
	  (false ? invariant(!!dummyNode, 'Markup wrapping node not initialized') : invariant(!!dummyNode));
	  if (!markupWrap.hasOwnProperty(nodeName)) {
	    nodeName = '*';
	  }
	  if (!shouldWrap.hasOwnProperty(nodeName)) {
	    if (nodeName === '*') {
	      dummyNode.innerHTML = '<link />';
	    } else {
	      dummyNode.innerHTML = '<' + nodeName + '></' + nodeName + '>';
	    }
	    shouldWrap[nodeName] = !dummyNode.firstChild;
	  }
	  return shouldWrap[nodeName] ? markupWrap[nodeName] : null;
	}


	module.exports = getMarkupWrap;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactMultiChildUpdateTypes
	 */

	'use strict';

	var keyMirror = __webpack_require__(53);

	/**
	 * When a component's children are updated, a series of update configuration
	 * objects are created in order to batch and serialize the required changes.
	 *
	 * Enumerates all the possible types of update configurations.
	 *
	 * @internal
	 */
	var ReactMultiChildUpdateTypes = keyMirror({
	  INSERT_MARKUP: null,
	  MOVE_EXISTING: null,
	  REMOVE_NODE: null,
	  TEXT_CONTENT: null
	});

	module.exports = ReactMultiChildUpdateTypes;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule setTextContent
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(100);
	var escapeTextContentForBrowser = __webpack_require__(93);
	var setInnerHTML = __webpack_require__(113);

	/**
	 * Set the textContent property of a node, ensuring that whitespace is preserved
	 * even in IE8. innerText is a poor substitute for textContent and, among many
	 * issues, inserts <br> instead of the literal newline chars. innerHTML behaves
	 * as it should.
	 *
	 * @param {DOMElement} node
	 * @param {string} text
	 * @internal
	 */
	var setTextContent = function(node, text) {
	  node.textContent = text;
	};

	if (ExecutionEnvironment.canUseDOM) {
	  if (!('textContent' in document.documentElement)) {
	    setTextContent = function(node, text) {
	      setInnerHTML(node, escapeTextContentForBrowser(text));
	    };
	  }
	}

	module.exports = setTextContent;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule setInnerHTML
	 */

	/* globals MSApp */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(100);

	var WHITESPACE_TEST = /^[ \r\n\t\f]/;
	var NONVISIBLE_TEST = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/;

	/**
	 * Set the innerHTML property of a node, ensuring that whitespace is preserved
	 * even in IE8.
	 *
	 * @param {DOMElement} node
	 * @param {string} html
	 * @internal
	 */
	var setInnerHTML = function(node, html) {
	  node.innerHTML = html;
	};

	// Win8 apps: Allow all html to be inserted
	if (typeof MSApp !== 'undefined' && MSApp.execUnsafeLocalFunction) {
	  setInnerHTML = function(node, html) {
	    MSApp.execUnsafeLocalFunction(function() {
	      node.innerHTML = html;
	    });
	  };
	}

	if (ExecutionEnvironment.canUseDOM) {
	  // IE8: When updating a just created node with innerHTML only leading
	  // whitespace is removed. When updating an existing node with innerHTML
	  // whitespace in root TextNodes is also collapsed.
	  // @see quirksmode.org/bugreports/archives/2004/11/innerhtml_and_t.html

	  // Feature detection; only IE8 is known to behave improperly like this.
	  var testElement = document.createElement('div');
	  testElement.innerHTML = ' ';
	  if (testElement.innerHTML === '') {
	    setInnerHTML = function(node, html) {
	      // Magic theory: IE8 supposedly differentiates between added and updated
	      // nodes when processing innerHTML, innerHTML on updated nodes suffers
	      // from worse whitespace behavior. Re-adding a node like this triggers
	      // the initial and more favorable whitespace behavior.
	      // TODO: What to do on a detached node?
	      if (node.parentNode) {
	        node.parentNode.replaceChild(node, node);
	      }

	      // We also implement a workaround for non-visible tags disappearing into
	      // thin air on IE8, this only happens if there is no visible text
	      // in-front of the non-visible tags. Piggyback on the whitespace fix
	      // and simply check if any non-visible tags appear in the source.
	      if (WHITESPACE_TEST.test(html) ||
	          html[0] === '<' && NONVISIBLE_TEST.test(html)) {
	        // Recover leading whitespace by temporarily prepending any character.
	        // \uFEFF has the potential advantage of being zero-width/invisible.
	        node.innerHTML = '\uFEFF' + html;

	        // deleteData leaves an empty `TextNode` which offsets the index of all
	        // children. Definitely want to avoid this.
	        var textNode = node.firstChild;
	        if (textNode.data.length === 1) {
	          node.removeChild(textNode);
	        } else {
	          textNode.deleteData(0, 1);
	        }
	      } else {
	        node.innerHTML = html;
	      }
	    };
	  }
	}

	module.exports = setInnerHTML;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactMount
	 */

	'use strict';

	var DOMProperty = __webpack_require__(91);
	var ReactBrowserEventEmitter = __webpack_require__(115);
	var ReactCurrentOwner = __webpack_require__(64);
	var ReactElement = __webpack_require__(58);
	var ReactElementValidator = __webpack_require__(79);
	var ReactEmptyComponent = __webpack_require__(123);
	var ReactInstanceHandles = __webpack_require__(66);
	var ReactInstanceMap = __webpack_require__(72);
	var ReactMarkupChecksum = __webpack_require__(124);
	var ReactPerf = __webpack_require__(75);
	var ReactReconciler = __webpack_require__(76);
	var ReactUpdateQueue = __webpack_require__(70);
	var ReactUpdates = __webpack_require__(73);

	var emptyObject = __webpack_require__(63);
	var containsNode = __webpack_require__(126);
	var getReactRootElementInContainer = __webpack_require__(129);
	var instantiateReactComponent = __webpack_require__(130);
	var invariant = __webpack_require__(54);
	var setInnerHTML = __webpack_require__(113);
	var shouldUpdateReactComponent = __webpack_require__(133);
	var warning = __webpack_require__(59);

	var SEPARATOR = ReactInstanceHandles.SEPARATOR;

	var ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;
	var nodeCache = {};

	var ELEMENT_NODE_TYPE = 1;
	var DOC_NODE_TYPE = 9;

	/** Mapping from reactRootID to React component instance. */
	var instancesByReactRootID = {};

	/** Mapping from reactRootID to `container` nodes. */
	var containersByReactRootID = {};

	if (false) {
	  /** __DEV__-only mapping from reactRootID to root elements. */
	  var rootElementsByReactRootID = {};
	}

	// Used to store breadth-first search state in findComponentRoot.
	var findComponentRootReusableArray = [];

	/**
	 * Finds the index of the first character
	 * that's not common between the two given strings.
	 *
	 * @return {number} the index of the character where the strings diverge
	 */
	function firstDifferenceIndex(string1, string2) {
	  var minLen = Math.min(string1.length, string2.length);
	  for (var i = 0; i < minLen; i++) {
	    if (string1.charAt(i) !== string2.charAt(i)) {
	      return i;
	    }
	  }
	  return string1.length === string2.length ? -1 : minLen;
	}

	/**
	 * @param {DOMElement} container DOM element that may contain a React component.
	 * @return {?string} A "reactRoot" ID, if a React component is rendered.
	 */
	function getReactRootID(container) {
	  var rootElement = getReactRootElementInContainer(container);
	  return rootElement && ReactMount.getID(rootElement);
	}

	/**
	 * Accessing node[ATTR_NAME] or calling getAttribute(ATTR_NAME) on a form
	 * element can return its control whose name or ID equals ATTR_NAME. All
	 * DOM nodes support `getAttributeNode` but this can also get called on
	 * other objects so just return '' if we're given something other than a
	 * DOM node (such as window).
	 *
	 * @param {?DOMElement|DOMWindow|DOMDocument|DOMTextNode} node DOM node.
	 * @return {string} ID of the supplied `domNode`.
	 */
	function getID(node) {
	  var id = internalGetID(node);
	  if (id) {
	    if (nodeCache.hasOwnProperty(id)) {
	      var cached = nodeCache[id];
	      if (cached !== node) {
	        (false ? invariant(
	          !isValid(cached, id),
	          'ReactMount: Two valid but unequal nodes with the same `%s`: %s',
	          ATTR_NAME, id
	        ) : invariant(!isValid(cached, id)));

	        nodeCache[id] = node;
	      }
	    } else {
	      nodeCache[id] = node;
	    }
	  }

	  return id;
	}

	function internalGetID(node) {
	  // If node is something like a window, document, or text node, none of
	  // which support attributes or a .getAttribute method, gracefully return
	  // the empty string, as if the attribute were missing.
	  return node && node.getAttribute && node.getAttribute(ATTR_NAME) || '';
	}

	/**
	 * Sets the React-specific ID of the given node.
	 *
	 * @param {DOMElement} node The DOM node whose ID will be set.
	 * @param {string} id The value of the ID attribute.
	 */
	function setID(node, id) {
	  var oldID = internalGetID(node);
	  if (oldID !== id) {
	    delete nodeCache[oldID];
	  }
	  node.setAttribute(ATTR_NAME, id);
	  nodeCache[id] = node;
	}

	/**
	 * Finds the node with the supplied React-generated DOM ID.
	 *
	 * @param {string} id A React-generated DOM ID.
	 * @return {DOMElement} DOM node with the suppled `id`.
	 * @internal
	 */
	function getNode(id) {
	  if (!nodeCache.hasOwnProperty(id) || !isValid(nodeCache[id], id)) {
	    nodeCache[id] = ReactMount.findReactNodeByID(id);
	  }
	  return nodeCache[id];
	}

	/**
	 * Finds the node with the supplied public React instance.
	 *
	 * @param {*} instance A public React instance.
	 * @return {?DOMElement} DOM node with the suppled `id`.
	 * @internal
	 */
	function getNodeFromInstance(instance) {
	  var id = ReactInstanceMap.get(instance)._rootNodeID;
	  if (ReactEmptyComponent.isNullComponentID(id)) {
	    return null;
	  }
	  if (!nodeCache.hasOwnProperty(id) || !isValid(nodeCache[id], id)) {
	    nodeCache[id] = ReactMount.findReactNodeByID(id);
	  }
	  return nodeCache[id];
	}

	/**
	 * A node is "valid" if it is contained by a currently mounted container.
	 *
	 * This means that the node does not have to be contained by a document in
	 * order to be considered valid.
	 *
	 * @param {?DOMElement} node The candidate DOM node.
	 * @param {string} id The expected ID of the node.
	 * @return {boolean} Whether the node is contained by a mounted container.
	 */
	function isValid(node, id) {
	  if (node) {
	    (false ? invariant(
	      internalGetID(node) === id,
	      'ReactMount: Unexpected modification of `%s`',
	      ATTR_NAME
	    ) : invariant(internalGetID(node) === id));

	    var container = ReactMount.findReactContainerForID(id);
	    if (container && containsNode(container, node)) {
	      return true;
	    }
	  }

	  return false;
	}

	/**
	 * Causes the cache to forget about one React-specific ID.
	 *
	 * @param {string} id The ID to forget.
	 */
	function purgeID(id) {
	  delete nodeCache[id];
	}

	var deepestNodeSoFar = null;
	function findDeepestCachedAncestorImpl(ancestorID) {
	  var ancestor = nodeCache[ancestorID];
	  if (ancestor && isValid(ancestor, ancestorID)) {
	    deepestNodeSoFar = ancestor;
	  } else {
	    // This node isn't populated in the cache, so presumably none of its
	    // descendants are. Break out of the loop.
	    return false;
	  }
	}

	/**
	 * Return the deepest cached node whose ID is a prefix of `targetID`.
	 */
	function findDeepestCachedAncestor(targetID) {
	  deepestNodeSoFar = null;
	  ReactInstanceHandles.traverseAncestors(
	    targetID,
	    findDeepestCachedAncestorImpl
	  );

	  var foundNode = deepestNodeSoFar;
	  deepestNodeSoFar = null;
	  return foundNode;
	}

	/**
	 * Mounts this component and inserts it into the DOM.
	 *
	 * @param {ReactComponent} componentInstance The instance to mount.
	 * @param {string} rootID DOM ID of the root node.
	 * @param {DOMElement} container DOM element to mount into.
	 * @param {ReactReconcileTransaction} transaction
	 * @param {boolean} shouldReuseMarkup If true, do not insert markup
	 */
	function mountComponentIntoNode(
	    componentInstance,
	    rootID,
	    container,
	    transaction,
	    shouldReuseMarkup) {
	  var markup = ReactReconciler.mountComponent(
	    componentInstance, rootID, transaction, emptyObject
	  );
	  componentInstance._isTopLevel = true;
	  ReactMount._mountImageIntoNode(markup, container, shouldReuseMarkup);
	}

	/**
	 * Batched mount.
	 *
	 * @param {ReactComponent} componentInstance The instance to mount.
	 * @param {string} rootID DOM ID of the root node.
	 * @param {DOMElement} container DOM element to mount into.
	 * @param {boolean} shouldReuseMarkup If true, do not insert markup
	 */
	function batchedMountComponentIntoNode(
	    componentInstance,
	    rootID,
	    container,
	    shouldReuseMarkup) {
	  var transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
	  transaction.perform(
	    mountComponentIntoNode,
	    null,
	    componentInstance,
	    rootID,
	    container,
	    transaction,
	    shouldReuseMarkup
	  );
	  ReactUpdates.ReactReconcileTransaction.release(transaction);
	}

	/**
	 * Mounting is the process of initializing a React component by creating its
	 * representative DOM elements and inserting them into a supplied `container`.
	 * Any prior content inside `container` is destroyed in the process.
	 *
	 *   ReactMount.render(
	 *     component,
	 *     document.getElementById('container')
	 *   );
	 *
	 *   <div id="container">                   <-- Supplied `container`.
	 *     <div data-reactid=".3">              <-- Rendered reactRoot of React
	 *       // ...                                 component.
	 *     </div>
	 *   </div>
	 *
	 * Inside of `container`, the first element rendered is the "reactRoot".
	 */
	var ReactMount = {
	  /** Exposed for debugging purposes **/
	  _instancesByReactRootID: instancesByReactRootID,

	  /**
	   * This is a hook provided to support rendering React components while
	   * ensuring that the apparent scroll position of its `container` does not
	   * change.
	   *
	   * @param {DOMElement} container The `container` being rendered into.
	   * @param {function} renderCallback This must be called once to do the render.
	   */
	  scrollMonitor: function(container, renderCallback) {
	    renderCallback();
	  },

	  /**
	   * Take a component that's already mounted into the DOM and replace its props
	   * @param {ReactComponent} prevComponent component instance already in the DOM
	   * @param {ReactElement} nextElement component instance to render
	   * @param {DOMElement} container container to render into
	   * @param {?function} callback function triggered on completion
	   */
	  _updateRootComponent: function(
	      prevComponent,
	      nextElement,
	      container,
	      callback) {
	    if (false) {
	      ReactElementValidator.checkAndWarnForMutatedProps(nextElement);
	    }

	    ReactMount.scrollMonitor(container, function() {
	      ReactUpdateQueue.enqueueElementInternal(prevComponent, nextElement);
	      if (callback) {
	        ReactUpdateQueue.enqueueCallbackInternal(prevComponent, callback);
	      }
	    });

	    if (false) {
	      // Record the root element in case it later gets transplanted.
	      rootElementsByReactRootID[getReactRootID(container)] =
	        getReactRootElementInContainer(container);
	    }

	    return prevComponent;
	  },

	  /**
	   * Register a component into the instance map and starts scroll value
	   * monitoring
	   * @param {ReactComponent} nextComponent component instance to render
	   * @param {DOMElement} container container to render into
	   * @return {string} reactRoot ID prefix
	   */
	  _registerComponent: function(nextComponent, container) {
	    (false ? invariant(
	      container && (
	        (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE)
	      ),
	      '_registerComponent(...): Target container is not a DOM element.'
	    ) : invariant(container && (
	      (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE)
	    )));

	    ReactBrowserEventEmitter.ensureScrollValueMonitoring();

	    var reactRootID = ReactMount.registerContainer(container);
	    instancesByReactRootID[reactRootID] = nextComponent;
	    return reactRootID;
	  },

	  /**
	   * Render a new component into the DOM.
	   * @param {ReactElement} nextElement element to render
	   * @param {DOMElement} container container to render into
	   * @param {boolean} shouldReuseMarkup if we should skip the markup insertion
	   * @return {ReactComponent} nextComponent
	   */
	  _renderNewRootComponent: function(
	    nextElement,
	    container,
	    shouldReuseMarkup
	  ) {
	    // Various parts of our code (such as ReactCompositeComponent's
	    // _renderValidatedComponent) assume that calls to render aren't nested;
	    // verify that that's the case.
	    (false ? warning(
	      ReactCurrentOwner.current == null,
	      '_renderNewRootComponent(): Render methods should be a pure function ' +
	      'of props and state; triggering nested component updates from ' +
	      'render is not allowed. If necessary, trigger nested updates in ' +
	      'componentDidUpdate.'
	    ) : null);

	    var componentInstance = instantiateReactComponent(nextElement, null);
	    var reactRootID = ReactMount._registerComponent(
	      componentInstance,
	      container
	    );

	    // The initial render is synchronous but any updates that happen during
	    // rendering, in componentWillMount or componentDidMount, will be batched
	    // according to the current batching strategy.

	    ReactUpdates.batchedUpdates(
	      batchedMountComponentIntoNode,
	      componentInstance,
	      reactRootID,
	      container,
	      shouldReuseMarkup
	    );

	    if (false) {
	      // Record the root element in case it later gets transplanted.
	      rootElementsByReactRootID[reactRootID] =
	        getReactRootElementInContainer(container);
	    }

	    return componentInstance;
	  },

	  /**
	   * Renders a React component into the DOM in the supplied `container`.
	   *
	   * If the React component was previously rendered into `container`, this will
	   * perform an update on it and only mutate the DOM as necessary to reflect the
	   * latest React component.
	   *
	   * @param {ReactElement} nextElement Component element to render.
	   * @param {DOMElement} container DOM element to render into.
	   * @param {?function} callback function triggered on completion
	   * @return {ReactComponent} Component instance rendered in `container`.
	   */
	  render: function(nextElement, container, callback) {
	    (false ? invariant(
	      ReactElement.isValidElement(nextElement),
	      'React.render(): Invalid component element.%s',
	      (
	        typeof nextElement === 'string' ?
	          ' Instead of passing an element string, make sure to instantiate ' +
	          'it by passing it to React.createElement.' :
	        typeof nextElement === 'function' ?
	          ' Instead of passing a component class, make sure to instantiate ' +
	          'it by passing it to React.createElement.' :
	        // Check if it quacks like an element
	        nextElement != null && nextElement.props !== undefined ?
	          ' This may be caused by unintentionally loading two independent ' +
	          'copies of React.' :
	          ''
	      )
	    ) : invariant(ReactElement.isValidElement(nextElement)));

	    var prevComponent = instancesByReactRootID[getReactRootID(container)];

	    if (prevComponent) {
	      var prevElement = prevComponent._currentElement;
	      if (shouldUpdateReactComponent(prevElement, nextElement)) {
	        return ReactMount._updateRootComponent(
	          prevComponent,
	          nextElement,
	          container,
	          callback
	        ).getPublicInstance();
	      } else {
	        ReactMount.unmountComponentAtNode(container);
	      }
	    }

	    var reactRootElement = getReactRootElementInContainer(container);
	    var containerHasReactMarkup =
	      reactRootElement && ReactMount.isRenderedByReact(reactRootElement);

	    if (false) {
	      if (!containerHasReactMarkup || reactRootElement.nextSibling) {
	        var rootElementSibling = reactRootElement;
	        while (rootElementSibling) {
	          if (ReactMount.isRenderedByReact(rootElementSibling)) {
	            ("production" !== process.env.NODE_ENV ? warning(
	              false,
	              'render(): Target node has markup rendered by React, but there ' +
	              'are unrelated nodes as well. This is most commonly caused by ' +
	              'white-space inserted around server-rendered markup.'
	            ) : null);
	            break;
	          }

	          rootElementSibling = rootElementSibling.nextSibling;
	        }
	      }
	    }

	    var shouldReuseMarkup = containerHasReactMarkup && !prevComponent;

	    var component = ReactMount._renderNewRootComponent(
	      nextElement,
	      container,
	      shouldReuseMarkup
	    ).getPublicInstance();
	    if (callback) {
	      callback.call(component);
	    }
	    return component;
	  },

	  /**
	   * Constructs a component instance of `constructor` with `initialProps` and
	   * renders it into the supplied `container`.
	   *
	   * @param {function} constructor React component constructor.
	   * @param {?object} props Initial props of the component instance.
	   * @param {DOMElement} container DOM element to render into.
	   * @return {ReactComponent} Component instance rendered in `container`.
	   */
	  constructAndRenderComponent: function(constructor, props, container) {
	    var element = ReactElement.createElement(constructor, props);
	    return ReactMount.render(element, container);
	  },

	  /**
	   * Constructs a component instance of `constructor` with `initialProps` and
	   * renders it into a container node identified by supplied `id`.
	   *
	   * @param {function} componentConstructor React component constructor
	   * @param {?object} props Initial props of the component instance.
	   * @param {string} id ID of the DOM element to render into.
	   * @return {ReactComponent} Component instance rendered in the container node.
	   */
	  constructAndRenderComponentByID: function(constructor, props, id) {
	    var domNode = document.getElementById(id);
	    (false ? invariant(
	      domNode,
	      'Tried to get element with id of "%s" but it is not present on the page.',
	      id
	    ) : invariant(domNode));
	    return ReactMount.constructAndRenderComponent(constructor, props, domNode);
	  },

	  /**
	   * Registers a container node into which React components will be rendered.
	   * This also creates the "reactRoot" ID that will be assigned to the element
	   * rendered within.
	   *
	   * @param {DOMElement} container DOM element to register as a container.
	   * @return {string} The "reactRoot" ID of elements rendered within.
	   */
	  registerContainer: function(container) {
	    var reactRootID = getReactRootID(container);
	    if (reactRootID) {
	      // If one exists, make sure it is a valid "reactRoot" ID.
	      reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID);
	    }
	    if (!reactRootID) {
	      // No valid "reactRoot" ID found, create one.
	      reactRootID = ReactInstanceHandles.createReactRootID();
	    }
	    containersByReactRootID[reactRootID] = container;
	    return reactRootID;
	  },

	  /**
	   * Unmounts and destroys the React component rendered in the `container`.
	   *
	   * @param {DOMElement} container DOM element containing a React component.
	   * @return {boolean} True if a component was found in and unmounted from
	   *                   `container`
	   */
	  unmountComponentAtNode: function(container) {
	    // Various parts of our code (such as ReactCompositeComponent's
	    // _renderValidatedComponent) assume that calls to render aren't nested;
	    // verify that that's the case. (Strictly speaking, unmounting won't cause a
	    // render but we still don't expect to be in a render call here.)
	    (false ? warning(
	      ReactCurrentOwner.current == null,
	      'unmountComponentAtNode(): Render methods should be a pure function of ' +
	      'props and state; triggering nested component updates from render is ' +
	      'not allowed. If necessary, trigger nested updates in ' +
	      'componentDidUpdate.'
	    ) : null);

	    (false ? invariant(
	      container && (
	        (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE)
	      ),
	      'unmountComponentAtNode(...): Target container is not a DOM element.'
	    ) : invariant(container && (
	      (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE)
	    )));

	    var reactRootID = getReactRootID(container);
	    var component = instancesByReactRootID[reactRootID];
	    if (!component) {
	      return false;
	    }
	    ReactMount.unmountComponentFromNode(component, container);
	    delete instancesByReactRootID[reactRootID];
	    delete containersByReactRootID[reactRootID];
	    if (false) {
	      delete rootElementsByReactRootID[reactRootID];
	    }
	    return true;
	  },

	  /**
	   * Unmounts a component and removes it from the DOM.
	   *
	   * @param {ReactComponent} instance React component instance.
	   * @param {DOMElement} container DOM element to unmount from.
	   * @final
	   * @internal
	   * @see {ReactMount.unmountComponentAtNode}
	   */
	  unmountComponentFromNode: function(instance, container) {
	    ReactReconciler.unmountComponent(instance);

	    if (container.nodeType === DOC_NODE_TYPE) {
	      container = container.documentElement;
	    }

	    // http://jsperf.com/emptying-a-node
	    while (container.lastChild) {
	      container.removeChild(container.lastChild);
	    }
	  },

	  /**
	   * Finds the container DOM element that contains React component to which the
	   * supplied DOM `id` belongs.
	   *
	   * @param {string} id The ID of an element rendered by a React component.
	   * @return {?DOMElement} DOM element that contains the `id`.
	   */
	  findReactContainerForID: function(id) {
	    var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(id);
	    var container = containersByReactRootID[reactRootID];

	    if (false) {
	      var rootElement = rootElementsByReactRootID[reactRootID];
	      if (rootElement && rootElement.parentNode !== container) {
	        ("production" !== process.env.NODE_ENV ? invariant(
	          // Call internalGetID here because getID calls isValid which calls
	          // findReactContainerForID (this function).
	          internalGetID(rootElement) === reactRootID,
	          'ReactMount: Root element ID differed from reactRootID.'
	        ) : invariant(// Call internalGetID here because getID calls isValid which calls
	        // findReactContainerForID (this function).
	        internalGetID(rootElement) === reactRootID));

	        var containerChild = container.firstChild;
	        if (containerChild &&
	            reactRootID === internalGetID(containerChild)) {
	          // If the container has a new child with the same ID as the old
	          // root element, then rootElementsByReactRootID[reactRootID] is
	          // just stale and needs to be updated. The case that deserves a
	          // warning is when the container is empty.
	          rootElementsByReactRootID[reactRootID] = containerChild;
	        } else {
	          ("production" !== process.env.NODE_ENV ? warning(
	            false,
	            'ReactMount: Root element has been removed from its original ' +
	            'container. New container:', rootElement.parentNode
	          ) : null);
	        }
	      }
	    }

	    return container;
	  },

	  /**
	   * Finds an element rendered by React with the supplied ID.
	   *
	   * @param {string} id ID of a DOM node in the React component.
	   * @return {DOMElement} Root DOM node of the React component.
	   */
	  findReactNodeByID: function(id) {
	    var reactRoot = ReactMount.findReactContainerForID(id);
	    return ReactMount.findComponentRoot(reactRoot, id);
	  },

	  /**
	   * True if the supplied `node` is rendered by React.
	   *
	   * @param {*} node DOM Element to check.
	   * @return {boolean} True if the DOM Element appears to be rendered by React.
	   * @internal
	   */
	  isRenderedByReact: function(node) {
	    if (node.nodeType !== 1) {
	      // Not a DOMElement, therefore not a React component
	      return false;
	    }
	    var id = ReactMount.getID(node);
	    return id ? id.charAt(0) === SEPARATOR : false;
	  },

	  /**
	   * Traverses up the ancestors of the supplied node to find a node that is a
	   * DOM representation of a React component.
	   *
	   * @param {*} node
	   * @return {?DOMEventTarget}
	   * @internal
	   */
	  getFirstReactDOM: function(node) {
	    var current = node;
	    while (current && current.parentNode !== current) {
	      if (ReactMount.isRenderedByReact(current)) {
	        return current;
	      }
	      current = current.parentNode;
	    }
	    return null;
	  },

	  /**
	   * Finds a node with the supplied `targetID` inside of the supplied
	   * `ancestorNode`.  Exploits the ID naming scheme to perform the search
	   * quickly.
	   *
	   * @param {DOMEventTarget} ancestorNode Search from this root.
	   * @pararm {string} targetID ID of the DOM representation of the component.
	   * @return {DOMEventTarget} DOM node with the supplied `targetID`.
	   * @internal
	   */
	  findComponentRoot: function(ancestorNode, targetID) {
	    var firstChildren = findComponentRootReusableArray;
	    var childIndex = 0;

	    var deepestAncestor = findDeepestCachedAncestor(targetID) || ancestorNode;

	    firstChildren[0] = deepestAncestor.firstChild;
	    firstChildren.length = 1;

	    while (childIndex < firstChildren.length) {
	      var child = firstChildren[childIndex++];
	      var targetChild;

	      while (child) {
	        var childID = ReactMount.getID(child);
	        if (childID) {
	          // Even if we find the node we're looking for, we finish looping
	          // through its siblings to ensure they're cached so that we don't have
	          // to revisit this node again. Otherwise, we make n^2 calls to getID
	          // when visiting the many children of a single node in order.

	          if (targetID === childID) {
	            targetChild = child;
	          } else if (ReactInstanceHandles.isAncestorIDOf(childID, targetID)) {
	            // If we find a child whose ID is an ancestor of the given ID,
	            // then we can be sure that we only want to search the subtree
	            // rooted at this child, so we can throw out the rest of the
	            // search state.
	            firstChildren.length = childIndex = 0;
	            firstChildren.push(child.firstChild);
	          }

	        } else {
	          // If this child had no ID, then there's a chance that it was
	          // injected automatically by the browser, as when a `<table>`
	          // element sprouts an extra `<tbody>` child as a side effect of
	          // `.innerHTML` parsing. Optimistically continue down this
	          // branch, but not before examining the other siblings.
	          firstChildren.push(child.firstChild);
	        }

	        child = child.nextSibling;
	      }

	      if (targetChild) {
	        // Emptying firstChildren/findComponentRootReusableArray is
	        // not necessary for correctness, but it helps the GC reclaim
	        // any nodes that were left at the end of the search.
	        firstChildren.length = 0;

	        return targetChild;
	      }
	    }

	    firstChildren.length = 0;

	    (false ? invariant(
	      false,
	      'findComponentRoot(..., %s): Unable to find element. This probably ' +
	      'means the DOM was unexpectedly mutated (e.g., by the browser), ' +
	      'usually due to forgetting a <tbody> when using tables, nesting tags ' +
	      'like <form>, <p>, or <a>, or using non-SVG elements in an <svg> ' +
	      'parent. ' +
	      'Try inspecting the child nodes of the element with React ID `%s`.',
	      targetID,
	      ReactMount.getID(ancestorNode)
	    ) : invariant(false));
	  },

	  _mountImageIntoNode: function(markup, container, shouldReuseMarkup) {
	    (false ? invariant(
	      container && (
	        (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE)
	      ),
	      'mountComponentIntoNode(...): Target container is not valid.'
	    ) : invariant(container && (
	      (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE)
	    )));

	    if (shouldReuseMarkup) {
	      var rootElement = getReactRootElementInContainer(container);
	      if (ReactMarkupChecksum.canReuseMarkup(markup, rootElement)) {
	        return;
	      } else {
	        var checksum = rootElement.getAttribute(
	          ReactMarkupChecksum.CHECKSUM_ATTR_NAME
	        );
	        rootElement.removeAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);

	        var rootMarkup = rootElement.outerHTML;
	        rootElement.setAttribute(
	          ReactMarkupChecksum.CHECKSUM_ATTR_NAME,
	          checksum
	        );

	        var diffIndex = firstDifferenceIndex(markup, rootMarkup);
	        var difference = ' (client) ' +
	          markup.substring(diffIndex - 20, diffIndex + 20) +
	          '\n (server) ' + rootMarkup.substring(diffIndex - 20, diffIndex + 20);

	        (false ? invariant(
	          container.nodeType !== DOC_NODE_TYPE,
	          'You\'re trying to render a component to the document using ' +
	          'server rendering but the checksum was invalid. This usually ' +
	          'means you rendered a different component type or props on ' +
	          'the client from the one on the server, or your render() ' +
	          'methods are impure. React cannot handle this case due to ' +
	          'cross-browser quirks by rendering at the document root. You ' +
	          'should look for environment dependent code in your components ' +
	          'and ensure the props are the same client and server side:\n%s',
	          difference
	        ) : invariant(container.nodeType !== DOC_NODE_TYPE));

	        if (false) {
	          ("production" !== process.env.NODE_ENV ? warning(
	            false,
	            'React attempted to reuse markup in a container but the ' +
	            'checksum was invalid. This generally means that you are ' +
	            'using server rendering and the markup generated on the ' +
	            'server was not what the client was expecting. React injected ' +
	            'new markup to compensate which works but you have lost many ' +
	            'of the benefits of server rendering. Instead, figure out ' +
	            'why the markup being generated is different on the client ' +
	            'or server:\n%s',
	            difference
	          ) : null);
	        }
	      }
	    }

	    (false ? invariant(
	      container.nodeType !== DOC_NODE_TYPE,
	      'You\'re trying to render a component to the document but ' +
	        'you didn\'t use server rendering. We can\'t do this ' +
	        'without using server rendering due to cross-browser quirks. ' +
	        'See React.renderToString() for server rendering.'
	    ) : invariant(container.nodeType !== DOC_NODE_TYPE));

	    setInnerHTML(container, markup);
	  },

	  /**
	   * React ID utilities.
	   */

	  getReactRootID: getReactRootID,

	  getID: getID,

	  setID: setID,

	  getNode: getNode,

	  getNodeFromInstance: getNodeFromInstance,

	  purgeID: purgeID
	};

	ReactPerf.measureMethods(ReactMount, 'ReactMount', {
	  _renderNewRootComponent: '_renderNewRootComponent',
	  _mountImageIntoNode: '_mountImageIntoNode'
	});

	module.exports = ReactMount;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactBrowserEventEmitter
	 * @typechecks static-only
	 */

	'use strict';

	var EventConstants = __webpack_require__(52);
	var EventPluginHub = __webpack_require__(116);
	var EventPluginRegistry = __webpack_require__(117);
	var ReactEventEmitterMixin = __webpack_require__(120);
	var ViewportMetrics = __webpack_require__(121);

	var assign = __webpack_require__(62);
	var isEventSupported = __webpack_require__(122);

	/**
	 * Summary of `ReactBrowserEventEmitter` event handling:
	 *
	 *  - Top-level delegation is used to trap most native browser events. This
	 *    may only occur in the main thread and is the responsibility of
	 *    ReactEventListener, which is injected and can therefore support pluggable
	 *    event sources. This is the only work that occurs in the main thread.
	 *
	 *  - We normalize and de-duplicate events to account for browser quirks. This
	 *    may be done in the worker thread.
	 *
	 *  - Forward these native events (with the associated top-level type used to
	 *    trap it) to `EventPluginHub`, which in turn will ask plugins if they want
	 *    to extract any synthetic events.
	 *
	 *  - The `EventPluginHub` will then process each event by annotating them with
	 *    "dispatches", a sequence of listeners and IDs that care about that event.
	 *
	 *  - The `EventPluginHub` then dispatches the events.
	 *
	 * Overview of React and the event system:
	 *
	 * +------------+    .
	 * |    DOM     |    .
	 * +------------+    .
	 *       |           .
	 *       v           .
	 * +------------+    .
	 * | ReactEvent |    .
	 * |  Listener  |    .
	 * +------------+    .                         +-----------+
	 *       |           .               +--------+|SimpleEvent|
	 *       |           .               |         |Plugin     |
	 * +-----|------+    .               v         +-----------+
	 * |     |      |    .    +--------------+                    +------------+
	 * |     +-----------.--->|EventPluginHub|                    |    Event   |
	 * |            |    .    |              |     +-----------+  | Propagators|
	 * | ReactEvent |    .    |              |     |TapEvent   |  |------------|
	 * |  Emitter   |    .    |              |<---+|Plugin     |  |other plugin|
	 * |            |    .    |              |     +-----------+  |  utilities |
	 * |     +-----------.--->|              |                    +------------+
	 * |     |      |    .    +--------------+
	 * +-----|------+    .                ^        +-----------+
	 *       |           .                |        |Enter/Leave|
	 *       +           .                +-------+|Plugin     |
	 * +-------------+   .                         +-----------+
	 * | application |   .
	 * |-------------|   .
	 * |             |   .
	 * |             |   .
	 * +-------------+   .
	 *                   .
	 *    React Core     .  General Purpose Event Plugin System
	 */

	var alreadyListeningTo = {};
	var isMonitoringScrollValue = false;
	var reactTopListenersCounter = 0;

	// For events like 'submit' which don't consistently bubble (which we trap at a
	// lower node than `document`), binding at `document` would cause duplicate
	// events so we don't include them here
	var topEventMapping = {
	  topBlur: 'blur',
	  topChange: 'change',
	  topClick: 'click',
	  topCompositionEnd: 'compositionend',
	  topCompositionStart: 'compositionstart',
	  topCompositionUpdate: 'compositionupdate',
	  topContextMenu: 'contextmenu',
	  topCopy: 'copy',
	  topCut: 'cut',
	  topDoubleClick: 'dblclick',
	  topDrag: 'drag',
	  topDragEnd: 'dragend',
	  topDragEnter: 'dragenter',
	  topDragExit: 'dragexit',
	  topDragLeave: 'dragleave',
	  topDragOver: 'dragover',
	  topDragStart: 'dragstart',
	  topDrop: 'drop',
	  topFocus: 'focus',
	  topInput: 'input',
	  topKeyDown: 'keydown',
	  topKeyPress: 'keypress',
	  topKeyUp: 'keyup',
	  topMouseDown: 'mousedown',
	  topMouseMove: 'mousemove',
	  topMouseOut: 'mouseout',
	  topMouseOver: 'mouseover',
	  topMouseUp: 'mouseup',
	  topPaste: 'paste',
	  topScroll: 'scroll',
	  topSelectionChange: 'selectionchange',
	  topTextInput: 'textInput',
	  topTouchCancel: 'touchcancel',
	  topTouchEnd: 'touchend',
	  topTouchMove: 'touchmove',
	  topTouchStart: 'touchstart',
	  topWheel: 'wheel'
	};

	/**
	 * To ensure no conflicts with other potential React instances on the page
	 */
	var topListenersIDKey = '_reactListenersID' + String(Math.random()).slice(2);

	function getListeningForDocument(mountAt) {
	  // In IE8, `mountAt` is a host object and doesn't have `hasOwnProperty`
	  // directly.
	  if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
	    mountAt[topListenersIDKey] = reactTopListenersCounter++;
	    alreadyListeningTo[mountAt[topListenersIDKey]] = {};
	  }
	  return alreadyListeningTo[mountAt[topListenersIDKey]];
	}

	/**
	 * `ReactBrowserEventEmitter` is used to attach top-level event listeners. For
	 * example:
	 *
	 *   ReactBrowserEventEmitter.putListener('myID', 'onClick', myFunction);
	 *
	 * This would allocate a "registration" of `('onClick', myFunction)` on 'myID'.
	 *
	 * @internal
	 */
	var ReactBrowserEventEmitter = assign({}, ReactEventEmitterMixin, {

	  /**
	   * Injectable event backend
	   */
	  ReactEventListener: null,

	  injection: {
	    /**
	     * @param {object} ReactEventListener
	     */
	    injectReactEventListener: function(ReactEventListener) {
	      ReactEventListener.setHandleTopLevel(
	        ReactBrowserEventEmitter.handleTopLevel
	      );
	      ReactBrowserEventEmitter.ReactEventListener = ReactEventListener;
	    }
	  },

	  /**
	   * Sets whether or not any created callbacks should be enabled.
	   *
	   * @param {boolean} enabled True if callbacks should be enabled.
	   */
	  setEnabled: function(enabled) {
	    if (ReactBrowserEventEmitter.ReactEventListener) {
	      ReactBrowserEventEmitter.ReactEventListener.setEnabled(enabled);
	    }
	  },

	  /**
	   * @return {boolean} True if callbacks are enabled.
	   */
	  isEnabled: function() {
	    return !!(
	      (ReactBrowserEventEmitter.ReactEventListener && ReactBrowserEventEmitter.ReactEventListener.isEnabled())
	    );
	  },

	  /**
	   * We listen for bubbled touch events on the document object.
	   *
	   * Firefox v8.01 (and possibly others) exhibited strange behavior when
	   * mounting `onmousemove` events at some node that was not the document
	   * element. The symptoms were that if your mouse is not moving over something
	   * contained within that mount point (for example on the background) the
	   * top-level listeners for `onmousemove` won't be called. However, if you
	   * register the `mousemove` on the document object, then it will of course
	   * catch all `mousemove`s. This along with iOS quirks, justifies restricting
	   * top-level listeners to the document object only, at least for these
	   * movement types of events and possibly all events.
	   *
	   * @see http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
	   *
	   * Also, `keyup`/`keypress`/`keydown` do not bubble to the window on IE, but
	   * they bubble to document.
	   *
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   * @param {object} contentDocumentHandle Document which owns the container
	   */
	  listenTo: function(registrationName, contentDocumentHandle) {
	    var mountAt = contentDocumentHandle;
	    var isListening = getListeningForDocument(mountAt);
	    var dependencies = EventPluginRegistry.
	      registrationNameDependencies[registrationName];

	    var topLevelTypes = EventConstants.topLevelTypes;
	    for (var i = 0, l = dependencies.length; i < l; i++) {
	      var dependency = dependencies[i];
	      if (!(
	            (isListening.hasOwnProperty(dependency) && isListening[dependency])
	          )) {
	        if (dependency === topLevelTypes.topWheel) {
	          if (isEventSupported('wheel')) {
	            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
	              topLevelTypes.topWheel,
	              'wheel',
	              mountAt
	            );
	          } else if (isEventSupported('mousewheel')) {
	            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
	              topLevelTypes.topWheel,
	              'mousewheel',
	              mountAt
	            );
	          } else {
	            // Firefox needs to capture a different mouse scroll event.
	            // @see http://www.quirksmode.org/dom/events/tests/scroll.html
	            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
	              topLevelTypes.topWheel,
	              'DOMMouseScroll',
	              mountAt
	            );
	          }
	        } else if (dependency === topLevelTypes.topScroll) {

	          if (isEventSupported('scroll', true)) {
	            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(
	              topLevelTypes.topScroll,
	              'scroll',
	              mountAt
	            );
	          } else {
	            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
	              topLevelTypes.topScroll,
	              'scroll',
	              ReactBrowserEventEmitter.ReactEventListener.WINDOW_HANDLE
	            );
	          }
	        } else if (dependency === topLevelTypes.topFocus ||
	            dependency === topLevelTypes.topBlur) {

	          if (isEventSupported('focus', true)) {
	            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(
	              topLevelTypes.topFocus,
	              'focus',
	              mountAt
	            );
	            ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(
	              topLevelTypes.topBlur,
	              'blur',
	              mountAt
	            );
	          } else if (isEventSupported('focusin')) {
	            // IE has `focusin` and `focusout` events which bubble.
	            // @see http://www.quirksmode.org/blog/archives/2008/04/delegating_the.html
	            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
	              topLevelTypes.topFocus,
	              'focusin',
	              mountAt
	            );
	            ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
	              topLevelTypes.topBlur,
	              'focusout',
	              mountAt
	            );
	          }

	          // to make sure blur and focus event listeners are only attached once
	          isListening[topLevelTypes.topBlur] = true;
	          isListening[topLevelTypes.topFocus] = true;
	        } else if (topEventMapping.hasOwnProperty(dependency)) {
	          ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
	            dependency,
	            topEventMapping[dependency],
	            mountAt
	          );
	        }

	        isListening[dependency] = true;
	      }
	    }
	  },

	  trapBubbledEvent: function(topLevelType, handlerBaseName, handle) {
	    return ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(
	      topLevelType,
	      handlerBaseName,
	      handle
	    );
	  },

	  trapCapturedEvent: function(topLevelType, handlerBaseName, handle) {
	    return ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(
	      topLevelType,
	      handlerBaseName,
	      handle
	    );
	  },

	  /**
	   * Listens to window scroll and resize events. We cache scroll values so that
	   * application code can access them without triggering reflows.
	   *
	   * NOTE: Scroll events do not bubble.
	   *
	   * @see http://www.quirksmode.org/dom/events/scroll.html
	   */
	  ensureScrollValueMonitoring: function() {
	    if (!isMonitoringScrollValue) {
	      var refresh = ViewportMetrics.refreshScrollValues;
	      ReactBrowserEventEmitter.ReactEventListener.monitorScrollValue(refresh);
	      isMonitoringScrollValue = true;
	    }
	  },

	  eventNameDispatchConfigs: EventPluginHub.eventNameDispatchConfigs,

	  registrationNameModules: EventPluginHub.registrationNameModules,

	  putListener: EventPluginHub.putListener,

	  getListener: EventPluginHub.getListener,

	  deleteListener: EventPluginHub.deleteListener,

	  deleteAllListeners: EventPluginHub.deleteAllListeners

	});

	module.exports = ReactBrowserEventEmitter;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule EventPluginHub
	 */

	'use strict';

	var EventPluginRegistry = __webpack_require__(117);
	var EventPluginUtils = __webpack_require__(51);

	var accumulateInto = __webpack_require__(118);
	var forEachAccumulated = __webpack_require__(119);
	var invariant = __webpack_require__(54);

	/**
	 * Internal store for event listeners
	 */
	var listenerBank = {};

	/**
	 * Internal queue of events that have accumulated their dispatches and are
	 * waiting to have their dispatches executed.
	 */
	var eventQueue = null;

	/**
	 * Dispatches an event and releases it back into the pool, unless persistent.
	 *
	 * @param {?object} event Synthetic event to be dispatched.
	 * @private
	 */
	var executeDispatchesAndRelease = function(event) {
	  if (event) {
	    var executeDispatch = EventPluginUtils.executeDispatch;
	    // Plugins can provide custom behavior when dispatching events.
	    var PluginModule = EventPluginRegistry.getPluginModuleForEvent(event);
	    if (PluginModule && PluginModule.executeDispatch) {
	      executeDispatch = PluginModule.executeDispatch;
	    }
	    EventPluginUtils.executeDispatchesInOrder(event, executeDispatch);

	    if (!event.isPersistent()) {
	      event.constructor.release(event);
	    }
	  }
	};

	/**
	 * - `InstanceHandle`: [required] Module that performs logical traversals of DOM
	 *   hierarchy given ids of the logical DOM elements involved.
	 */
	var InstanceHandle = null;

	function validateInstanceHandle() {
	  var valid =
	    InstanceHandle &&
	    InstanceHandle.traverseTwoPhase &&
	    InstanceHandle.traverseEnterLeave;
	  (false ? invariant(
	    valid,
	    'InstanceHandle not injected before use!'
	  ) : invariant(valid));
	}

	/**
	 * This is a unified interface for event plugins to be installed and configured.
	 *
	 * Event plugins can implement the following properties:
	 *
	 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
	 *     Required. When a top-level event is fired, this method is expected to
	 *     extract synthetic events that will in turn be queued and dispatched.
	 *
	 *   `eventTypes` {object}
	 *     Optional, plugins that fire events must publish a mapping of registration
	 *     names that are used to register listeners. Values of this mapping must
	 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
	 *
	 *   `executeDispatch` {function(object, function, string)}
	 *     Optional, allows plugins to override how an event gets dispatched. By
	 *     default, the listener is simply invoked.
	 *
	 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
	 *
	 * @public
	 */
	var EventPluginHub = {

	  /**
	   * Methods for injecting dependencies.
	   */
	  injection: {

	    /**
	     * @param {object} InjectedMount
	     * @public
	     */
	    injectMount: EventPluginUtils.injection.injectMount,

	    /**
	     * @param {object} InjectedInstanceHandle
	     * @public
	     */
	    injectInstanceHandle: function(InjectedInstanceHandle) {
	      InstanceHandle = InjectedInstanceHandle;
	      if (false) {
	        validateInstanceHandle();
	      }
	    },

	    getInstanceHandle: function() {
	      if (false) {
	        validateInstanceHandle();
	      }
	      return InstanceHandle;
	    },

	    /**
	     * @param {array} InjectedEventPluginOrder
	     * @public
	     */
	    injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,

	    /**
	     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
	     */
	    injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName

	  },

	  eventNameDispatchConfigs: EventPluginRegistry.eventNameDispatchConfigs,

	  registrationNameModules: EventPluginRegistry.registrationNameModules,

	  /**
	   * Stores `listener` at `listenerBank[registrationName][id]`. Is idempotent.
	   *
	   * @param {string} id ID of the DOM element.
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   * @param {?function} listener The callback to store.
	   */
	  putListener: function(id, registrationName, listener) {
	    (false ? invariant(
	      !listener || typeof listener === 'function',
	      'Expected %s listener to be a function, instead got type %s',
	      registrationName, typeof listener
	    ) : invariant(!listener || typeof listener === 'function'));

	    var bankForRegistrationName =
	      listenerBank[registrationName] || (listenerBank[registrationName] = {});
	    bankForRegistrationName[id] = listener;
	  },

	  /**
	   * @param {string} id ID of the DOM element.
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   * @return {?function} The stored callback.
	   */
	  getListener: function(id, registrationName) {
	    var bankForRegistrationName = listenerBank[registrationName];
	    return bankForRegistrationName && bankForRegistrationName[id];
	  },

	  /**
	   * Deletes a listener from the registration bank.
	   *
	   * @param {string} id ID of the DOM element.
	   * @param {string} registrationName Name of listener (e.g. `onClick`).
	   */
	  deleteListener: function(id, registrationName) {
	    var bankForRegistrationName = listenerBank[registrationName];
	    if (bankForRegistrationName) {
	      delete bankForRegistrationName[id];
	    }
	  },

	  /**
	   * Deletes all listeners for the DOM element with the supplied ID.
	   *
	   * @param {string} id ID of the DOM element.
	   */
	  deleteAllListeners: function(id) {
	    for (var registrationName in listenerBank) {
	      delete listenerBank[registrationName][id];
	    }
	  },

	  /**
	   * Allows registered plugins an opportunity to extract events from top-level
	   * native browser events.
	   *
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @internal
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	    var events;
	    var plugins = EventPluginRegistry.plugins;
	    for (var i = 0, l = plugins.length; i < l; i++) {
	      // Not every plugin in the ordering may be loaded at runtime.
	      var possiblePlugin = plugins[i];
	      if (possiblePlugin) {
	        var extractedEvents = possiblePlugin.extractEvents(
	          topLevelType,
	          topLevelTarget,
	          topLevelTargetID,
	          nativeEvent
	        );
	        if (extractedEvents) {
	          events = accumulateInto(events, extractedEvents);
	        }
	      }
	    }
	    return events;
	  },

	  /**
	   * Enqueues a synthetic event that should be dispatched when
	   * `processEventQueue` is invoked.
	   *
	   * @param {*} events An accumulation of synthetic events.
	   * @internal
	   */
	  enqueueEvents: function(events) {
	    if (events) {
	      eventQueue = accumulateInto(eventQueue, events);
	    }
	  },

	  /**
	   * Dispatches all synthetic events on the event queue.
	   *
	   * @internal
	   */
	  processEventQueue: function() {
	    // Set `eventQueue` to null before processing it so that we can tell if more
	    // events get enqueued while processing.
	    var processingEventQueue = eventQueue;
	    eventQueue = null;
	    forEachAccumulated(processingEventQueue, executeDispatchesAndRelease);
	    (false ? invariant(
	      !eventQueue,
	      'processEventQueue(): Additional events were enqueued while processing ' +
	      'an event queue. Support for this has not yet been implemented.'
	    ) : invariant(!eventQueue));
	  },

	  /**
	   * These are needed for tests only. Do not use!
	   */
	  __purge: function() {
	    listenerBank = {};
	  },

	  __getListenerBank: function() {
	    return listenerBank;
	  }

	};

	module.exports = EventPluginHub;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule EventPluginRegistry
	 * @typechecks static-only
	 */

	'use strict';

	var invariant = __webpack_require__(54);

	/**
	 * Injectable ordering of event plugins.
	 */
	var EventPluginOrder = null;

	/**
	 * Injectable mapping from names to event plugin modules.
	 */
	var namesToPlugins = {};

	/**
	 * Recomputes the plugin list using the injected plugins and plugin ordering.
	 *
	 * @private
	 */
	function recomputePluginOrdering() {
	  if (!EventPluginOrder) {
	    // Wait until an `EventPluginOrder` is injected.
	    return;
	  }
	  for (var pluginName in namesToPlugins) {
	    var PluginModule = namesToPlugins[pluginName];
	    var pluginIndex = EventPluginOrder.indexOf(pluginName);
	    (false ? invariant(
	      pluginIndex > -1,
	      'EventPluginRegistry: Cannot inject event plugins that do not exist in ' +
	      'the plugin ordering, `%s`.',
	      pluginName
	    ) : invariant(pluginIndex > -1));
	    if (EventPluginRegistry.plugins[pluginIndex]) {
	      continue;
	    }
	    (false ? invariant(
	      PluginModule.extractEvents,
	      'EventPluginRegistry: Event plugins must implement an `extractEvents` ' +
	      'method, but `%s` does not.',
	      pluginName
	    ) : invariant(PluginModule.extractEvents));
	    EventPluginRegistry.plugins[pluginIndex] = PluginModule;
	    var publishedEvents = PluginModule.eventTypes;
	    for (var eventName in publishedEvents) {
	      (false ? invariant(
	        publishEventForPlugin(
	          publishedEvents[eventName],
	          PluginModule,
	          eventName
	        ),
	        'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.',
	        eventName,
	        pluginName
	      ) : invariant(publishEventForPlugin(
	        publishedEvents[eventName],
	        PluginModule,
	        eventName
	      )));
	    }
	  }
	}

	/**
	 * Publishes an event so that it can be dispatched by the supplied plugin.
	 *
	 * @param {object} dispatchConfig Dispatch configuration for the event.
	 * @param {object} PluginModule Plugin publishing the event.
	 * @return {boolean} True if the event was successfully published.
	 * @private
	 */
	function publishEventForPlugin(dispatchConfig, PluginModule, eventName) {
	  (false ? invariant(
	    !EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName),
	    'EventPluginHub: More than one plugin attempted to publish the same ' +
	    'event name, `%s`.',
	    eventName
	  ) : invariant(!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName)));
	  EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;

	  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
	  if (phasedRegistrationNames) {
	    for (var phaseName in phasedRegistrationNames) {
	      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
	        var phasedRegistrationName = phasedRegistrationNames[phaseName];
	        publishRegistrationName(
	          phasedRegistrationName,
	          PluginModule,
	          eventName
	        );
	      }
	    }
	    return true;
	  } else if (dispatchConfig.registrationName) {
	    publishRegistrationName(
	      dispatchConfig.registrationName,
	      PluginModule,
	      eventName
	    );
	    return true;
	  }
	  return false;
	}

	/**
	 * Publishes a registration name that is used to identify dispatched events and
	 * can be used with `EventPluginHub.putListener` to register listeners.
	 *
	 * @param {string} registrationName Registration name to add.
	 * @param {object} PluginModule Plugin publishing the event.
	 * @private
	 */
	function publishRegistrationName(registrationName, PluginModule, eventName) {
	  (false ? invariant(
	    !EventPluginRegistry.registrationNameModules[registrationName],
	    'EventPluginHub: More than one plugin attempted to publish the same ' +
	    'registration name, `%s`.',
	    registrationName
	  ) : invariant(!EventPluginRegistry.registrationNameModules[registrationName]));
	  EventPluginRegistry.registrationNameModules[registrationName] = PluginModule;
	  EventPluginRegistry.registrationNameDependencies[registrationName] =
	    PluginModule.eventTypes[eventName].dependencies;
	}

	/**
	 * Registers plugins so that they can extract and dispatch events.
	 *
	 * @see {EventPluginHub}
	 */
	var EventPluginRegistry = {

	  /**
	   * Ordered list of injected plugins.
	   */
	  plugins: [],

	  /**
	   * Mapping from event name to dispatch config
	   */
	  eventNameDispatchConfigs: {},

	  /**
	   * Mapping from registration name to plugin module
	   */
	  registrationNameModules: {},

	  /**
	   * Mapping from registration name to event name
	   */
	  registrationNameDependencies: {},

	  /**
	   * Injects an ordering of plugins (by plugin name). This allows the ordering
	   * to be decoupled from injection of the actual plugins so that ordering is
	   * always deterministic regardless of packaging, on-the-fly injection, etc.
	   *
	   * @param {array} InjectedEventPluginOrder
	   * @internal
	   * @see {EventPluginHub.injection.injectEventPluginOrder}
	   */
	  injectEventPluginOrder: function(InjectedEventPluginOrder) {
	    (false ? invariant(
	      !EventPluginOrder,
	      'EventPluginRegistry: Cannot inject event plugin ordering more than ' +
	      'once. You are likely trying to load more than one copy of React.'
	    ) : invariant(!EventPluginOrder));
	    // Clone the ordering so it cannot be dynamically mutated.
	    EventPluginOrder = Array.prototype.slice.call(InjectedEventPluginOrder);
	    recomputePluginOrdering();
	  },

	  /**
	   * Injects plugins to be used by `EventPluginHub`. The plugin names must be
	   * in the ordering injected by `injectEventPluginOrder`.
	   *
	   * Plugins can be injected as part of page initialization or on-the-fly.
	   *
	   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
	   * @internal
	   * @see {EventPluginHub.injection.injectEventPluginsByName}
	   */
	  injectEventPluginsByName: function(injectedNamesToPlugins) {
	    var isOrderingDirty = false;
	    for (var pluginName in injectedNamesToPlugins) {
	      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
	        continue;
	      }
	      var PluginModule = injectedNamesToPlugins[pluginName];
	      if (!namesToPlugins.hasOwnProperty(pluginName) ||
	          namesToPlugins[pluginName] !== PluginModule) {
	        (false ? invariant(
	          !namesToPlugins[pluginName],
	          'EventPluginRegistry: Cannot inject two different event plugins ' +
	          'using the same name, `%s`.',
	          pluginName
	        ) : invariant(!namesToPlugins[pluginName]));
	        namesToPlugins[pluginName] = PluginModule;
	        isOrderingDirty = true;
	      }
	    }
	    if (isOrderingDirty) {
	      recomputePluginOrdering();
	    }
	  },

	  /**
	   * Looks up the plugin for the supplied event.
	   *
	   * @param {object} event A synthetic event.
	   * @return {?object} The plugin that created the supplied event.
	   * @internal
	   */
	  getPluginModuleForEvent: function(event) {
	    var dispatchConfig = event.dispatchConfig;
	    if (dispatchConfig.registrationName) {
	      return EventPluginRegistry.registrationNameModules[
	        dispatchConfig.registrationName
	      ] || null;
	    }
	    for (var phase in dispatchConfig.phasedRegistrationNames) {
	      if (!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)) {
	        continue;
	      }
	      var PluginModule = EventPluginRegistry.registrationNameModules[
	        dispatchConfig.phasedRegistrationNames[phase]
	      ];
	      if (PluginModule) {
	        return PluginModule;
	      }
	    }
	    return null;
	  },

	  /**
	   * Exposed for unit testing.
	   * @private
	   */
	  _resetEventPlugins: function() {
	    EventPluginOrder = null;
	    for (var pluginName in namesToPlugins) {
	      if (namesToPlugins.hasOwnProperty(pluginName)) {
	        delete namesToPlugins[pluginName];
	      }
	    }
	    EventPluginRegistry.plugins.length = 0;

	    var eventNameDispatchConfigs = EventPluginRegistry.eventNameDispatchConfigs;
	    for (var eventName in eventNameDispatchConfigs) {
	      if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
	        delete eventNameDispatchConfigs[eventName];
	      }
	    }

	    var registrationNameModules = EventPluginRegistry.registrationNameModules;
	    for (var registrationName in registrationNameModules) {
	      if (registrationNameModules.hasOwnProperty(registrationName)) {
	        delete registrationNameModules[registrationName];
	      }
	    }
	  }

	};

	module.exports = EventPluginRegistry;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule accumulateInto
	 */

	'use strict';

	var invariant = __webpack_require__(54);

	/**
	 *
	 * Accumulates items that must not be null or undefined into the first one. This
	 * is used to conserve memory by avoiding array allocations, and thus sacrifices
	 * API cleanness. Since `current` can be null before being passed in and not
	 * null after this function, make sure to assign it back to `current`:
	 *
	 * `a = accumulateInto(a, b);`
	 *
	 * This API should be sparingly used. Try `accumulate` for something cleaner.
	 *
	 * @return {*|array<*>} An accumulation of items.
	 */

	function accumulateInto(current, next) {
	  (false ? invariant(
	    next != null,
	    'accumulateInto(...): Accumulated items must not be null or undefined.'
	  ) : invariant(next != null));
	  if (current == null) {
	    return next;
	  }

	  // Both are not empty. Warning: Never call x.concat(y) when you are not
	  // certain that x is an Array (x could be a string with concat method).
	  var currentIsArray = Array.isArray(current);
	  var nextIsArray = Array.isArray(next);

	  if (currentIsArray && nextIsArray) {
	    current.push.apply(current, next);
	    return current;
	  }

	  if (currentIsArray) {
	    current.push(next);
	    return current;
	  }

	  if (nextIsArray) {
	    // A bit too dangerous to mutate `next`.
	    return [current].concat(next);
	  }

	  return [current, next];
	}

	module.exports = accumulateInto;


/***/ },
/* 119 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule forEachAccumulated
	 */

	'use strict';

	/**
	 * @param {array} an "accumulation" of items which is either an Array or
	 * a single item. Useful when paired with the `accumulate` module. This is a
	 * simple utility that allows us to reason about a collection of items, but
	 * handling the case when there is exactly one item (and we do not need to
	 * allocate an array).
	 */
	var forEachAccumulated = function(arr, cb, scope) {
	  if (Array.isArray(arr)) {
	    arr.forEach(cb, scope);
	  } else if (arr) {
	    cb.call(scope, arr);
	  }
	};

	module.exports = forEachAccumulated;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactEventEmitterMixin
	 */

	'use strict';

	var EventPluginHub = __webpack_require__(116);

	function runEventQueueInBatch(events) {
	  EventPluginHub.enqueueEvents(events);
	  EventPluginHub.processEventQueue();
	}

	var ReactEventEmitterMixin = {

	  /**
	   * Streams a fired top-level event to `EventPluginHub` where plugins have the
	   * opportunity to create `ReactEvent`s to be dispatched.
	   *
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {object} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native environment event.
	   */
	  handleTopLevel: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	    var events = EventPluginHub.extractEvents(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent
	    );

	    runEventQueueInBatch(events);
	  }
	};

	module.exports = ReactEventEmitterMixin;


/***/ },
/* 121 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ViewportMetrics
	 */

	'use strict';

	var ViewportMetrics = {

	  currentScrollLeft: 0,

	  currentScrollTop: 0,

	  refreshScrollValues: function(scrollPosition) {
	    ViewportMetrics.currentScrollLeft = scrollPosition.x;
	    ViewportMetrics.currentScrollTop = scrollPosition.y;
	  }

	};

	module.exports = ViewportMetrics;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule isEventSupported
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(100);

	var useHasFeature;
	if (ExecutionEnvironment.canUseDOM) {
	  useHasFeature =
	    document.implementation &&
	    document.implementation.hasFeature &&
	    // always returns true in newer browsers as per the standard.
	    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
	    document.implementation.hasFeature('', '') !== true;
	}

	/**
	 * Checks if an event is supported in the current execution environment.
	 *
	 * NOTE: This will not work correctly for non-generic events such as `change`,
	 * `reset`, `load`, `error`, and `select`.
	 *
	 * Borrows from Modernizr.
	 *
	 * @param {string} eventNameSuffix Event name, e.g. "click".
	 * @param {?boolean} capture Check if the capture phase is supported.
	 * @return {boolean} True if the event is supported.
	 * @internal
	 * @license Modernizr 3.0.0pre (Custom Build) | MIT
	 */
	function isEventSupported(eventNameSuffix, capture) {
	  if (!ExecutionEnvironment.canUseDOM ||
	      capture && !('addEventListener' in document)) {
	    return false;
	  }

	  var eventName = 'on' + eventNameSuffix;
	  var isSupported = eventName in document;

	  if (!isSupported) {
	    var element = document.createElement('div');
	    element.setAttribute(eventName, 'return;');
	    isSupported = typeof element[eventName] === 'function';
	  }

	  if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
	    // This is the only way to test support for the `wheel` event in IE9+.
	    isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
	  }

	  return isSupported;
	}

	module.exports = isEventSupported;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactEmptyComponent
	 */

	'use strict';

	var ReactElement = __webpack_require__(58);
	var ReactInstanceMap = __webpack_require__(72);

	var invariant = __webpack_require__(54);

	var component;
	// This registry keeps track of the React IDs of the components that rendered to
	// `null` (in reality a placeholder such as `noscript`)
	var nullComponentIDsRegistry = {};

	var ReactEmptyComponentInjection = {
	  injectEmptyComponent: function(emptyComponent) {
	    component = ReactElement.createFactory(emptyComponent);
	  }
	};

	var ReactEmptyComponentType = function() {};
	ReactEmptyComponentType.prototype.componentDidMount = function() {
	  var internalInstance = ReactInstanceMap.get(this);
	  // TODO: Make sure we run these methods in the correct order, we shouldn't
	  // need this check. We're going to assume if we're here it means we ran
	  // componentWillUnmount already so there is no internal instance (it gets
	  // removed as part of the unmounting process).
	  if (!internalInstance) {
	    return;
	  }
	  registerNullComponentID(internalInstance._rootNodeID);
	};
	ReactEmptyComponentType.prototype.componentWillUnmount = function() {
	  var internalInstance = ReactInstanceMap.get(this);
	  // TODO: Get rid of this check. See TODO in componentDidMount.
	  if (!internalInstance) {
	    return;
	  }
	  deregisterNullComponentID(internalInstance._rootNodeID);
	};
	ReactEmptyComponentType.prototype.render = function() {
	  (false ? invariant(
	    component,
	    'Trying to return null from a render, but no null placeholder component ' +
	    'was injected.'
	  ) : invariant(component));
	  return component();
	};

	var emptyElement = ReactElement.createElement(ReactEmptyComponentType);

	/**
	 * Mark the component as having rendered to null.
	 * @param {string} id Component's `_rootNodeID`.
	 */
	function registerNullComponentID(id) {
	  nullComponentIDsRegistry[id] = true;
	}

	/**
	 * Unmark the component as having rendered to null: it renders to something now.
	 * @param {string} id Component's `_rootNodeID`.
	 */
	function deregisterNullComponentID(id) {
	  delete nullComponentIDsRegistry[id];
	}

	/**
	 * @param {string} id Component's `_rootNodeID`.
	 * @return {boolean} True if the component is rendered to null.
	 */
	function isNullComponentID(id) {
	  return !!nullComponentIDsRegistry[id];
	}

	var ReactEmptyComponent = {
	  emptyElement: emptyElement,
	  injection: ReactEmptyComponentInjection,
	  isNullComponentID: isNullComponentID
	};

	module.exports = ReactEmptyComponent;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactMarkupChecksum
	 */

	'use strict';

	var adler32 = __webpack_require__(125);

	var ReactMarkupChecksum = {
	  CHECKSUM_ATTR_NAME: 'data-react-checksum',

	  /**
	   * @param {string} markup Markup string
	   * @return {string} Markup string with checksum attribute attached
	   */
	  addChecksumToMarkup: function(markup) {
	    var checksum = adler32(markup);
	    return markup.replace(
	      '>',
	      ' ' + ReactMarkupChecksum.CHECKSUM_ATTR_NAME + '="' + checksum + '">'
	    );
	  },

	  /**
	   * @param {string} markup to use
	   * @param {DOMElement} element root React element
	   * @returns {boolean} whether or not the markup is the same
	   */
	  canReuseMarkup: function(markup, element) {
	    var existingChecksum = element.getAttribute(
	      ReactMarkupChecksum.CHECKSUM_ATTR_NAME
	    );
	    existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
	    var markupChecksum = adler32(markup);
	    return markupChecksum === existingChecksum;
	  }
	};

	module.exports = ReactMarkupChecksum;


/***/ },
/* 125 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule adler32
	 */

	/* jslint bitwise:true */

	'use strict';

	var MOD = 65521;

	// This is a clean-room implementation of adler32 designed for detecting
	// if markup is not what we expect it to be. It does not need to be
	// cryptographically strong, only reasonably good at detecting if markup
	// generated on the server is different than that on the client.
	function adler32(data) {
	  var a = 1;
	  var b = 0;
	  for (var i = 0; i < data.length; i++) {
	    a = (a + data.charCodeAt(i)) % MOD;
	    b = (b + a) % MOD;
	  }
	  return a | (b << 16);
	}

	module.exports = adler32;


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule containsNode
	 * @typechecks
	 */

	var isTextNode = __webpack_require__(127);

	/*jslint bitwise:true */

	/**
	 * Checks if a given DOM node contains or is another DOM node.
	 *
	 * @param {?DOMNode} outerNode Outer DOM node.
	 * @param {?DOMNode} innerNode Inner DOM node.
	 * @return {boolean} True if `outerNode` contains or is `innerNode`.
	 */
	function containsNode(outerNode, innerNode) {
	  if (!outerNode || !innerNode) {
	    return false;
	  } else if (outerNode === innerNode) {
	    return true;
	  } else if (isTextNode(outerNode)) {
	    return false;
	  } else if (isTextNode(innerNode)) {
	    return containsNode(outerNode, innerNode.parentNode);
	  } else if (outerNode.contains) {
	    return outerNode.contains(innerNode);
	  } else if (outerNode.compareDocumentPosition) {
	    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
	  } else {
	    return false;
	  }
	}

	module.exports = containsNode;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule isTextNode
	 * @typechecks
	 */

	var isNode = __webpack_require__(128);

	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM text node.
	 */
	function isTextNode(object) {
	  return isNode(object) && object.nodeType == 3;
	}

	module.exports = isTextNode;


/***/ },
/* 128 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule isNode
	 * @typechecks
	 */

	/**
	 * @param {*} object The object to check.
	 * @return {boolean} Whether or not the object is a DOM node.
	 */
	function isNode(object) {
	  return !!(object && (
	    ((typeof Node === 'function' ? object instanceof Node : typeof object === 'object' &&
	    typeof object.nodeType === 'number' &&
	    typeof object.nodeName === 'string'))
	  ));
	}

	module.exports = isNode;


/***/ },
/* 129 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getReactRootElementInContainer
	 */

	'use strict';

	var DOC_NODE_TYPE = 9;

	/**
	 * @param {DOMElement|DOMDocument} container DOM element that may contain
	 *                                           a React component
	 * @return {?*} DOM element that may have the reactRoot ID, or null.
	 */
	function getReactRootElementInContainer(container) {
	  if (!container) {
	    return null;
	  }

	  if (container.nodeType === DOC_NODE_TYPE) {
	    return container.documentElement;
	  } else {
	    return container.firstChild;
	  }
	}

	module.exports = getReactRootElementInContainer;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule instantiateReactComponent
	 * @typechecks static-only
	 */

	'use strict';

	var ReactCompositeComponent = __webpack_require__(131);
	var ReactEmptyComponent = __webpack_require__(123);
	var ReactNativeComponent = __webpack_require__(82);

	var assign = __webpack_require__(62);
	var invariant = __webpack_require__(54);
	var warning = __webpack_require__(59);

	// To avoid a cyclic dependency, we create the final class in this module
	var ReactCompositeComponentWrapper = function() { };
	assign(
	  ReactCompositeComponentWrapper.prototype,
	  ReactCompositeComponent.Mixin,
	  {
	    _instantiateReactComponent: instantiateReactComponent
	  }
	);

	/**
	 * Check if the type reference is a known internal type. I.e. not a user
	 * provided composite type.
	 *
	 * @param {function} type
	 * @return {boolean} Returns true if this is a valid internal type.
	 */
	function isInternalComponentType(type) {
	  return (
	    typeof type === 'function' &&
	    typeof type.prototype !== 'undefined' &&
	    typeof type.prototype.mountComponent === 'function' &&
	    typeof type.prototype.receiveComponent === 'function'
	  );
	}

	/**
	 * Given a ReactNode, create an instance that will actually be mounted.
	 *
	 * @param {ReactNode} node
	 * @param {*} parentCompositeType The composite type that resolved this.
	 * @return {object} A new instance of the element's constructor.
	 * @protected
	 */
	function instantiateReactComponent(node, parentCompositeType) {
	  var instance;

	  if (node === null || node === false) {
	    node = ReactEmptyComponent.emptyElement;
	  }

	  if (typeof node === 'object') {
	    var element = node;
	    if (false) {
	      ("production" !== process.env.NODE_ENV ? warning(
	        element && (typeof element.type === 'function' ||
	                    typeof element.type === 'string'),
	        'Only functions or strings can be mounted as React components.'
	      ) : null);
	    }

	    // Special case string values
	    if (parentCompositeType === element.type &&
	        typeof element.type === 'string') {
	      // Avoid recursion if the wrapper renders itself.
	      instance = ReactNativeComponent.createInternalComponent(element);
	      // All native components are currently wrapped in a composite so we're
	      // safe to assume that this is what we should instantiate.
	    } else if (isInternalComponentType(element.type)) {
	      // This is temporarily available for custom components that are not string
	      // represenations. I.e. ART. Once those are updated to use the string
	      // representation, we can drop this code path.
	      instance = new element.type(element);
	    } else {
	      instance = new ReactCompositeComponentWrapper();
	    }
	  } else if (typeof node === 'string' || typeof node === 'number') {
	    instance = ReactNativeComponent.createInstanceForText(node);
	  } else {
	    (false ? invariant(
	      false,
	      'Encountered invalid React node of type %s',
	      typeof node
	    ) : invariant(false));
	  }

	  if (false) {
	    ("production" !== process.env.NODE_ENV ? warning(
	      typeof instance.construct === 'function' &&
	      typeof instance.mountComponent === 'function' &&
	      typeof instance.receiveComponent === 'function' &&
	      typeof instance.unmountComponent === 'function',
	      'Only React Components can be mounted.'
	    ) : null);
	  }

	  // Sets up the instance. This can probably just move into the constructor now.
	  instance.construct(node);

	  // These two fields are used by the DOM and ART diffing algorithms
	  // respectively. Instead of using expandos on components, we should be
	  // storing the state needed by the diffing algorithms elsewhere.
	  instance._mountIndex = 0;
	  instance._mountImage = null;

	  if (false) {
	    instance._isOwnerNecessary = false;
	    instance._warnedAboutRefsInRender = false;
	  }

	  // Internal instances should fully constructed at this point, so they should
	  // not get any new fields added to them at this point.
	  if (false) {
	    if (Object.preventExtensions) {
	      Object.preventExtensions(instance);
	    }
	  }

	  return instance;
	}

	module.exports = instantiateReactComponent;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactCompositeComponent
	 */

	'use strict';

	var ReactComponentEnvironment = __webpack_require__(132);
	var ReactContext = __webpack_require__(61);
	var ReactCurrentOwner = __webpack_require__(64);
	var ReactElement = __webpack_require__(58);
	var ReactElementValidator = __webpack_require__(79);
	var ReactInstanceMap = __webpack_require__(72);
	var ReactLifeCycle = __webpack_require__(71);
	var ReactNativeComponent = __webpack_require__(82);
	var ReactPerf = __webpack_require__(75);
	var ReactPropTypeLocations = __webpack_require__(80);
	var ReactPropTypeLocationNames = __webpack_require__(81);
	var ReactReconciler = __webpack_require__(76);
	var ReactUpdates = __webpack_require__(73);

	var assign = __webpack_require__(62);
	var emptyObject = __webpack_require__(63);
	var invariant = __webpack_require__(54);
	var shouldUpdateReactComponent = __webpack_require__(133);
	var warning = __webpack_require__(59);

	function getDeclarationErrorAddendum(component) {
	  var owner = component._currentElement._owner || null;
	  if (owner) {
	    var name = owner.getName();
	    if (name) {
	      return ' Check the render method of `' + name + '`.';
	    }
	  }
	  return '';
	}

	/**
	 * ------------------ The Life-Cycle of a Composite Component ------------------
	 *
	 * - constructor: Initialization of state. The instance is now retained.
	 *   - componentWillMount
	 *   - render
	 *   - [children's constructors]
	 *     - [children's componentWillMount and render]
	 *     - [children's componentDidMount]
	 *     - componentDidMount
	 *
	 *       Update Phases:
	 *       - componentWillReceiveProps (only called if parent updated)
	 *       - shouldComponentUpdate
	 *         - componentWillUpdate
	 *           - render
	 *           - [children's constructors or receive props phases]
	 *         - componentDidUpdate
	 *
	 *     - componentWillUnmount
	 *     - [children's componentWillUnmount]
	 *   - [children destroyed]
	 * - (destroyed): The instance is now blank, released by React and ready for GC.
	 *
	 * -----------------------------------------------------------------------------
	 */

	/**
	 * An incrementing ID assigned to each component when it is mounted. This is
	 * used to enforce the order in which `ReactUpdates` updates dirty components.
	 *
	 * @private
	 */
	var nextMountID = 1;

	/**
	 * @lends {ReactCompositeComponent.prototype}
	 */
	var ReactCompositeComponentMixin = {

	  /**
	   * Base constructor for all composite component.
	   *
	   * @param {ReactElement} element
	   * @final
	   * @internal
	   */
	  construct: function(element) {
	    this._currentElement = element;
	    this._rootNodeID = null;
	    this._instance = null;

	    // See ReactUpdateQueue
	    this._pendingElement = null;
	    this._pendingStateQueue = null;
	    this._pendingReplaceState = false;
	    this._pendingForceUpdate = false;

	    this._renderedComponent = null;

	    this._context = null;
	    this._mountOrder = 0;
	    this._isTopLevel = false;

	    // See ReactUpdates and ReactUpdateQueue.
	    this._pendingCallbacks = null;
	  },

	  /**
	   * Initializes the component, renders markup, and registers event listeners.
	   *
	   * @param {string} rootID DOM ID of the root node.
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @return {?string} Rendered markup to be inserted into the DOM.
	   * @final
	   * @internal
	   */
	  mountComponent: function(rootID, transaction, context) {
	    this._context = context;
	    this._mountOrder = nextMountID++;
	    this._rootNodeID = rootID;

	    var publicProps = this._processProps(this._currentElement.props);
	    var publicContext = this._processContext(this._currentElement._context);

	    var Component = ReactNativeComponent.getComponentClassForElement(
	      this._currentElement
	    );

	    // Initialize the public class
	    var inst = new Component(publicProps, publicContext);

	    if (false) {
	      // This will throw later in _renderValidatedComponent, but add an early
	      // warning now to help debugging
	      ("production" !== process.env.NODE_ENV ? warning(
	        inst.render != null,
	        '%s(...): No `render` method found on the returned component ' +
	        'instance: you may have forgotten to define `render` in your ' +
	        'component or you may have accidentally tried to render an element ' +
	        'whose type is a function that isn\'t a React component.',
	        Component.displayName || Component.name || 'Component'
	      ) : null);
	    }

	    // These should be set up in the constructor, but as a convenience for
	    // simpler class abstractions, we set them up after the fact.
	    inst.props = publicProps;
	    inst.context = publicContext;
	    inst.refs = emptyObject;

	    this._instance = inst;

	    // Store a reference from the instance back to the internal representation
	    ReactInstanceMap.set(inst, this);

	    if (false) {
	      this._warnIfContextsDiffer(this._currentElement._context, context);
	    }

	    if (false) {
	      // Since plain JS classes are defined without any special initialization
	      // logic, we can not catch common errors early. Therefore, we have to
	      // catch them here, at initialization time, instead.
	      ("production" !== process.env.NODE_ENV ? warning(
	        !inst.getInitialState ||
	        inst.getInitialState.isReactClassApproved,
	        'getInitialState was defined on %s, a plain JavaScript class. ' +
	        'This is only supported for classes created using React.createClass. ' +
	        'Did you mean to define a state property instead?',
	        this.getName() || 'a component'
	      ) : null);
	      ("production" !== process.env.NODE_ENV ? warning(
	        !inst.getDefaultProps ||
	        inst.getDefaultProps.isReactClassApproved,
	        'getDefaultProps was defined on %s, a plain JavaScript class. ' +
	        'This is only supported for classes created using React.createClass. ' +
	        'Use a static property to define defaultProps instead.',
	        this.getName() || 'a component'
	      ) : null);
	      ("production" !== process.env.NODE_ENV ? warning(
	        !inst.propTypes,
	        'propTypes was defined as an instance property on %s. Use a static ' +
	        'property to define propTypes instead.',
	        this.getName() || 'a component'
	      ) : null);
	      ("production" !== process.env.NODE_ENV ? warning(
	        !inst.contextTypes,
	        'contextTypes was defined as an instance property on %s. Use a ' +
	        'static property to define contextTypes instead.',
	        this.getName() || 'a component'
	      ) : null);
	      ("production" !== process.env.NODE_ENV ? warning(
	        typeof inst.componentShouldUpdate !== 'function',
	        '%s has a method called ' +
	        'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
	        'The name is phrased as a question because the function is ' +
	        'expected to return a value.',
	        (this.getName() || 'A component')
	      ) : null);
	    }

	    var initialState = inst.state;
	    if (initialState === undefined) {
	      inst.state = initialState = null;
	    }
	    (false ? invariant(
	      typeof initialState === 'object' && !Array.isArray(initialState),
	      '%s.state: must be set to an object or null',
	      this.getName() || 'ReactCompositeComponent'
	    ) : invariant(typeof initialState === 'object' && !Array.isArray(initialState)));

	    this._pendingStateQueue = null;
	    this._pendingReplaceState = false;
	    this._pendingForceUpdate = false;

	    var childContext;
	    var renderedElement;

	    var previouslyMounting = ReactLifeCycle.currentlyMountingInstance;
	    ReactLifeCycle.currentlyMountingInstance = this;
	    try {
	      if (inst.componentWillMount) {
	        inst.componentWillMount();
	        // When mounting, calls to `setState` by `componentWillMount` will set
	        // `this._pendingStateQueue` without triggering a re-render.
	        if (this._pendingStateQueue) {
	          inst.state = this._processPendingState(inst.props, inst.context);
	        }
	      }

	      childContext = this._getValidatedChildContext(context);
	      renderedElement = this._renderValidatedComponent(childContext);
	    } finally {
	      ReactLifeCycle.currentlyMountingInstance = previouslyMounting;
	    }

	    this._renderedComponent = this._instantiateReactComponent(
	      renderedElement,
	      this._currentElement.type // The wrapping type
	    );

	    var markup = ReactReconciler.mountComponent(
	      this._renderedComponent,
	      rootID,
	      transaction,
	      this._mergeChildContext(context, childContext)
	    );
	    if (inst.componentDidMount) {
	      transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
	    }

	    return markup;
	  },

	  /**
	   * Releases any resources allocated by `mountComponent`.
	   *
	   * @final
	   * @internal
	   */
	  unmountComponent: function() {
	    var inst = this._instance;

	    if (inst.componentWillUnmount) {
	      var previouslyUnmounting = ReactLifeCycle.currentlyUnmountingInstance;
	      ReactLifeCycle.currentlyUnmountingInstance = this;
	      try {
	        inst.componentWillUnmount();
	      } finally {
	        ReactLifeCycle.currentlyUnmountingInstance = previouslyUnmounting;
	      }
	    }

	    ReactReconciler.unmountComponent(this._renderedComponent);
	    this._renderedComponent = null;

	    // Reset pending fields
	    this._pendingStateQueue = null;
	    this._pendingReplaceState = false;
	    this._pendingForceUpdate = false;
	    this._pendingCallbacks = null;
	    this._pendingElement = null;

	    // These fields do not really need to be reset since this object is no
	    // longer accessible.
	    this._context = null;
	    this._rootNodeID = null;

	    // Delete the reference from the instance to this internal representation
	    // which allow the internals to be properly cleaned up even if the user
	    // leaks a reference to the public instance.
	    ReactInstanceMap.remove(inst);

	    // Some existing components rely on inst.props even after they've been
	    // destroyed (in event handlers).
	    // TODO: inst.props = null;
	    // TODO: inst.state = null;
	    // TODO: inst.context = null;
	  },

	  /**
	   * Schedule a partial update to the props. Only used for internal testing.
	   *
	   * @param {object} partialProps Subset of the next props.
	   * @param {?function} callback Called after props are updated.
	   * @final
	   * @internal
	   */
	  _setPropsInternal: function(partialProps, callback) {
	    // This is a deoptimized path. We optimize for always having an element.
	    // This creates an extra internal element.
	    var element = this._pendingElement || this._currentElement;
	    this._pendingElement = ReactElement.cloneAndReplaceProps(
	      element,
	      assign({}, element.props, partialProps)
	    );
	    ReactUpdates.enqueueUpdate(this, callback);
	  },

	  /**
	   * Filters the context object to only contain keys specified in
	   * `contextTypes`
	   *
	   * @param {object} context
	   * @return {?object}
	   * @private
	   */
	  _maskContext: function(context) {
	    var maskedContext = null;
	    // This really should be getting the component class for the element,
	    // but we know that we're not going to need it for built-ins.
	    if (typeof this._currentElement.type === 'string') {
	      return emptyObject;
	    }
	    var contextTypes = this._currentElement.type.contextTypes;
	    if (!contextTypes) {
	      return emptyObject;
	    }
	    maskedContext = {};
	    for (var contextName in contextTypes) {
	      maskedContext[contextName] = context[contextName];
	    }
	    return maskedContext;
	  },

	  /**
	   * Filters the context object to only contain keys specified in
	   * `contextTypes`, and asserts that they are valid.
	   *
	   * @param {object} context
	   * @return {?object}
	   * @private
	   */
	  _processContext: function(context) {
	    var maskedContext = this._maskContext(context);
	    if (false) {
	      var Component = ReactNativeComponent.getComponentClassForElement(
	        this._currentElement
	      );
	      if (Component.contextTypes) {
	        this._checkPropTypes(
	          Component.contextTypes,
	          maskedContext,
	          ReactPropTypeLocations.context
	        );
	      }
	    }
	    return maskedContext;
	  },

	  /**
	   * @param {object} currentContext
	   * @return {object}
	   * @private
	   */
	  _getValidatedChildContext: function(currentContext) {
	    var inst = this._instance;
	    var childContext = inst.getChildContext && inst.getChildContext();
	    if (childContext) {
	      (false ? invariant(
	        typeof inst.constructor.childContextTypes === 'object',
	        '%s.getChildContext(): childContextTypes must be defined in order to ' +
	        'use getChildContext().',
	        this.getName() || 'ReactCompositeComponent'
	      ) : invariant(typeof inst.constructor.childContextTypes === 'object'));
	      if (false) {
	        this._checkPropTypes(
	          inst.constructor.childContextTypes,
	          childContext,
	          ReactPropTypeLocations.childContext
	        );
	      }
	      for (var name in childContext) {
	        (false ? invariant(
	          name in inst.constructor.childContextTypes,
	          '%s.getChildContext(): key "%s" is not defined in childContextTypes.',
	          this.getName() || 'ReactCompositeComponent',
	          name
	        ) : invariant(name in inst.constructor.childContextTypes));
	      }
	      return childContext;
	    }
	    return null;
	  },

	  _mergeChildContext: function(currentContext, childContext) {
	    if (childContext) {
	      return assign({}, currentContext, childContext);
	    }
	    return currentContext;
	  },

	  /**
	   * Processes props by setting default values for unspecified props and
	   * asserting that the props are valid. Does not mutate its argument; returns
	   * a new props object with defaults merged in.
	   *
	   * @param {object} newProps
	   * @return {object}
	   * @private
	   */
	  _processProps: function(newProps) {
	    if (false) {
	      var Component = ReactNativeComponent.getComponentClassForElement(
	        this._currentElement
	      );
	      if (Component.propTypes) {
	        this._checkPropTypes(
	          Component.propTypes,
	          newProps,
	          ReactPropTypeLocations.prop
	        );
	      }
	    }
	    return newProps;
	  },

	  /**
	   * Assert that the props are valid
	   *
	   * @param {object} propTypes Map of prop name to a ReactPropType
	   * @param {object} props
	   * @param {string} location e.g. "prop", "context", "child context"
	   * @private
	   */
	  _checkPropTypes: function(propTypes, props, location) {
	    // TODO: Stop validating prop types here and only use the element
	    // validation.
	    var componentName = this.getName();
	    for (var propName in propTypes) {
	      if (propTypes.hasOwnProperty(propName)) {
	        var error;
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          (false ? invariant(
	            typeof propTypes[propName] === 'function',
	            '%s: %s type `%s` is invalid; it must be a function, usually ' +
	            'from React.PropTypes.',
	            componentName || 'React class',
	            ReactPropTypeLocationNames[location],
	            propName
	          ) : invariant(typeof propTypes[propName] === 'function'));
	          error = propTypes[propName](props, propName, componentName, location);
	        } catch (ex) {
	          error = ex;
	        }
	        if (error instanceof Error) {
	          // We may want to extend this logic for similar errors in
	          // React.render calls, so I'm abstracting it away into
	          // a function to minimize refactoring in the future
	          var addendum = getDeclarationErrorAddendum(this);

	          if (location === ReactPropTypeLocations.prop) {
	            // Preface gives us something to blacklist in warning module
	            (false ? warning(
	              false,
	              'Failed Composite propType: %s%s',
	              error.message,
	              addendum
	            ) : null);
	          } else {
	            (false ? warning(
	              false,
	              'Failed Context Types: %s%s',
	              error.message,
	              addendum
	            ) : null);
	          }
	        }
	      }
	    }
	  },

	  receiveComponent: function(nextElement, transaction, nextContext) {
	    var prevElement = this._currentElement;
	    var prevContext = this._context;

	    this._pendingElement = null;

	    this.updateComponent(
	      transaction,
	      prevElement,
	      nextElement,
	      prevContext,
	      nextContext
	    );
	  },

	  /**
	   * If any of `_pendingElement`, `_pendingStateQueue`, or `_pendingForceUpdate`
	   * is set, update the component.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   */
	  performUpdateIfNecessary: function(transaction) {
	    if (this._pendingElement != null) {
	      ReactReconciler.receiveComponent(
	        this,
	        this._pendingElement || this._currentElement,
	        transaction,
	        this._context
	      );
	    }

	    if (this._pendingStateQueue !== null || this._pendingForceUpdate) {
	      if (false) {
	        ReactElementValidator.checkAndWarnForMutatedProps(
	          this._currentElement
	        );
	      }

	      this.updateComponent(
	        transaction,
	        this._currentElement,
	        this._currentElement,
	        this._context,
	        this._context
	      );
	    }
	  },

	  /**
	   * Compare two contexts, warning if they are different
	   * TODO: Remove this check when owner-context is removed
	   */
	   _warnIfContextsDiffer: function(ownerBasedContext, parentBasedContext) {
	    ownerBasedContext = this._maskContext(ownerBasedContext);
	    parentBasedContext = this._maskContext(parentBasedContext);
	    var parentKeys = Object.keys(parentBasedContext).sort();
	    var displayName = this.getName() || 'ReactCompositeComponent';
	    for (var i = 0; i < parentKeys.length; i++) {
	      var key = parentKeys[i];
	      (false ? warning(
	        ownerBasedContext[key] === parentBasedContext[key],
	        'owner-based and parent-based contexts differ '  +
	        '(values: `%s` vs `%s`) for key (%s) while mounting %s ' +
	        '(see: http://fb.me/react-context-by-parent)',
	        ownerBasedContext[key],
	        parentBasedContext[key],
	        key,
	        displayName
	      ) : null);
	    }
	  },

	  /**
	   * Perform an update to a mounted component. The componentWillReceiveProps and
	   * shouldComponentUpdate methods are called, then (assuming the update isn't
	   * skipped) the remaining update lifecycle methods are called and the DOM
	   * representation is updated.
	   *
	   * By default, this implements React's rendering and reconciliation algorithm.
	   * Sophisticated clients may wish to override this.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @param {ReactElement} prevParentElement
	   * @param {ReactElement} nextParentElement
	   * @internal
	   * @overridable
	   */
	  updateComponent: function(
	    transaction,
	    prevParentElement,
	    nextParentElement,
	    prevUnmaskedContext,
	    nextUnmaskedContext
	  ) {
	    var inst = this._instance;

	    var nextContext = inst.context;
	    var nextProps = inst.props;

	    // Distinguish between a props update versus a simple state update
	    if (prevParentElement !== nextParentElement) {
	      nextContext = this._processContext(nextParentElement._context);
	      nextProps = this._processProps(nextParentElement.props);

	      if (false) {
	        if (nextUnmaskedContext != null) {
	          this._warnIfContextsDiffer(
	            nextParentElement._context,
	            nextUnmaskedContext
	          );
	        }
	      }

	      // An update here will schedule an update but immediately set
	      // _pendingStateQueue which will ensure that any state updates gets
	      // immediately reconciled instead of waiting for the next batch.

	      if (inst.componentWillReceiveProps) {
	        inst.componentWillReceiveProps(nextProps, nextContext);
	      }
	    }

	    var nextState = this._processPendingState(nextProps, nextContext);

	    var shouldUpdate =
	      this._pendingForceUpdate ||
	      !inst.shouldComponentUpdate ||
	      inst.shouldComponentUpdate(nextProps, nextState, nextContext);

	    if (false) {
	      ("production" !== process.env.NODE_ENV ? warning(
	        typeof shouldUpdate !== 'undefined',
	        '%s.shouldComponentUpdate(): Returned undefined instead of a ' +
	        'boolean value. Make sure to return true or false.',
	        this.getName() || 'ReactCompositeComponent'
	      ) : null);
	    }

	    if (shouldUpdate) {
	      this._pendingForceUpdate = false;
	      // Will set `this.props`, `this.state` and `this.context`.
	      this._performComponentUpdate(
	        nextParentElement,
	        nextProps,
	        nextState,
	        nextContext,
	        transaction,
	        nextUnmaskedContext
	      );
	    } else {
	      // If it's determined that a component should not update, we still want
	      // to set props and state but we shortcut the rest of the update.
	      this._currentElement = nextParentElement;
	      this._context = nextUnmaskedContext;
	      inst.props = nextProps;
	      inst.state = nextState;
	      inst.context = nextContext;
	    }
	  },

	  _processPendingState: function(props, context) {
	    var inst = this._instance;
	    var queue = this._pendingStateQueue;
	    var replace = this._pendingReplaceState;
	    this._pendingReplaceState = false;
	    this._pendingStateQueue = null;

	    if (!queue) {
	      return inst.state;
	    }

	    if (replace && queue.length === 1) {
	      return queue[0];
	    }

	    var nextState = assign({}, replace ? queue[0] : inst.state);
	    for (var i = replace ? 1 : 0; i < queue.length; i++) {
	      var partial = queue[i];
	      assign(
	        nextState,
	        typeof partial === 'function' ?
	          partial.call(inst, nextState, props, context) :
	          partial
	      );
	    }

	    return nextState;
	  },

	  /**
	   * Merges new props and state, notifies delegate methods of update and
	   * performs update.
	   *
	   * @param {ReactElement} nextElement Next element
	   * @param {object} nextProps Next public object to set as properties.
	   * @param {?object} nextState Next object to set as state.
	   * @param {?object} nextContext Next public object to set as context.
	   * @param {ReactReconcileTransaction} transaction
	   * @param {?object} unmaskedContext
	   * @private
	   */
	  _performComponentUpdate: function(
	    nextElement,
	    nextProps,
	    nextState,
	    nextContext,
	    transaction,
	    unmaskedContext
	  ) {
	    var inst = this._instance;

	    var prevProps = inst.props;
	    var prevState = inst.state;
	    var prevContext = inst.context;

	    if (inst.componentWillUpdate) {
	      inst.componentWillUpdate(nextProps, nextState, nextContext);
	    }

	    this._currentElement = nextElement;
	    this._context = unmaskedContext;
	    inst.props = nextProps;
	    inst.state = nextState;
	    inst.context = nextContext;

	    this._updateRenderedComponent(transaction, unmaskedContext);

	    if (inst.componentDidUpdate) {
	      transaction.getReactMountReady().enqueue(
	        inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext),
	        inst
	      );
	    }
	  },

	  /**
	   * Call the component's `render` method and update the DOM accordingly.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @internal
	   */
	  _updateRenderedComponent: function(transaction, context) {
	    var prevComponentInstance = this._renderedComponent;
	    var prevRenderedElement = prevComponentInstance._currentElement;
	    var childContext = this._getValidatedChildContext();
	    var nextRenderedElement = this._renderValidatedComponent(childContext);
	    if (shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
	      ReactReconciler.receiveComponent(
	        prevComponentInstance,
	        nextRenderedElement,
	        transaction,
	        this._mergeChildContext(context, childContext)
	      );
	    } else {
	      // These two IDs are actually the same! But nothing should rely on that.
	      var thisID = this._rootNodeID;
	      var prevComponentID = prevComponentInstance._rootNodeID;
	      ReactReconciler.unmountComponent(prevComponentInstance);

	      this._renderedComponent = this._instantiateReactComponent(
	        nextRenderedElement,
	        this._currentElement.type
	      );
	      var nextMarkup = ReactReconciler.mountComponent(
	        this._renderedComponent,
	        thisID,
	        transaction,
	        this._mergeChildContext(context, childContext)
	      );
	      this._replaceNodeWithMarkupByID(prevComponentID, nextMarkup);
	    }
	  },

	  /**
	   * @protected
	   */
	  _replaceNodeWithMarkupByID: function(prevComponentID, nextMarkup) {
	    ReactComponentEnvironment.replaceNodeWithMarkupByID(
	      prevComponentID,
	      nextMarkup
	    );
	  },

	  /**
	   * @protected
	   */
	  _renderValidatedComponentWithoutOwnerOrContext: function() {
	    var inst = this._instance;
	    var renderedComponent = inst.render();
	    if (false) {
	      // We allow auto-mocks to proceed as if they're returning null.
	      if (typeof renderedComponent === 'undefined' &&
	          inst.render._isMockFunction) {
	        // This is probably bad practice. Consider warning here and
	        // deprecating this convenience.
	        renderedComponent = null;
	      }
	    }

	    return renderedComponent;
	  },

	  /**
	   * @private
	   */
	  _renderValidatedComponent: function(childContext) {
	    var renderedComponent;
	    var previousContext = ReactContext.current;
	    ReactContext.current = this._mergeChildContext(
	      this._currentElement._context,
	      childContext
	    );
	    ReactCurrentOwner.current = this;
	    try {
	      renderedComponent =
	        this._renderValidatedComponentWithoutOwnerOrContext();
	    } finally {
	      ReactContext.current = previousContext;
	      ReactCurrentOwner.current = null;
	    }
	    (false ? invariant(
	      // TODO: An `isValidNode` function would probably be more appropriate
	      renderedComponent === null || renderedComponent === false ||
	      ReactElement.isValidElement(renderedComponent),
	      '%s.render(): A valid ReactComponent must be returned. You may have ' +
	        'returned undefined, an array or some other invalid object.',
	      this.getName() || 'ReactCompositeComponent'
	    ) : invariant(// TODO: An `isValidNode` function would probably be more appropriate
	    renderedComponent === null || renderedComponent === false ||
	    ReactElement.isValidElement(renderedComponent)));
	    return renderedComponent;
	  },

	  /**
	   * Lazily allocates the refs object and stores `component` as `ref`.
	   *
	   * @param {string} ref Reference name.
	   * @param {component} component Component to store as `ref`.
	   * @final
	   * @private
	   */
	  attachRef: function(ref, component) {
	    var inst = this.getPublicInstance();
	    var refs = inst.refs === emptyObject ? (inst.refs = {}) : inst.refs;
	    refs[ref] = component.getPublicInstance();
	  },

	  /**
	   * Detaches a reference name.
	   *
	   * @param {string} ref Name to dereference.
	   * @final
	   * @private
	   */
	  detachRef: function(ref) {
	    var refs = this.getPublicInstance().refs;
	    delete refs[ref];
	  },

	  /**
	   * Get a text description of the component that can be used to identify it
	   * in error messages.
	   * @return {string} The name or null.
	   * @internal
	   */
	  getName: function() {
	    var type = this._currentElement.type;
	    var constructor = this._instance && this._instance.constructor;
	    return (
	      type.displayName || (constructor && constructor.displayName) ||
	      type.name || (constructor && constructor.name) ||
	      null
	    );
	  },

	  /**
	   * Get the publicly accessible representation of this component - i.e. what
	   * is exposed by refs and returned by React.render. Can be null for stateless
	   * components.
	   *
	   * @return {ReactComponent} the public component instance.
	   * @internal
	   */
	  getPublicInstance: function() {
	    return this._instance;
	  },

	  // Stub
	  _instantiateReactComponent: null

	};

	ReactPerf.measureMethods(
	  ReactCompositeComponentMixin,
	  'ReactCompositeComponent',
	  {
	    mountComponent: 'mountComponent',
	    updateComponent: 'updateComponent',
	    _renderValidatedComponent: '_renderValidatedComponent'
	  }
	);

	var ReactCompositeComponent = {

	  Mixin: ReactCompositeComponentMixin

	};

	module.exports = ReactCompositeComponent;


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactComponentEnvironment
	 */

	'use strict';

	var invariant = __webpack_require__(54);

	var injected = false;

	var ReactComponentEnvironment = {

	  /**
	   * Optionally injectable environment dependent cleanup hook. (server vs.
	   * browser etc). Example: A browser system caches DOM nodes based on component
	   * ID and must remove that cache entry when this instance is unmounted.
	   */
	  unmountIDFromEnvironment: null,

	  /**
	   * Optionally injectable hook for swapping out mount images in the middle of
	   * the tree.
	   */
	  replaceNodeWithMarkupByID: null,

	  /**
	   * Optionally injectable hook for processing a queue of child updates. Will
	   * later move into MultiChildComponents.
	   */
	  processChildrenUpdates: null,

	  injection: {
	    injectEnvironment: function(environment) {
	      (false ? invariant(
	        !injected,
	        'ReactCompositeComponent: injectEnvironment() can only be called once.'
	      ) : invariant(!injected));
	      ReactComponentEnvironment.unmountIDFromEnvironment =
	        environment.unmountIDFromEnvironment;
	      ReactComponentEnvironment.replaceNodeWithMarkupByID =
	        environment.replaceNodeWithMarkupByID;
	      ReactComponentEnvironment.processChildrenUpdates =
	        environment.processChildrenUpdates;
	      injected = true;
	    }
	  }

	};

	module.exports = ReactComponentEnvironment;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shouldUpdateReactComponent
	 * @typechecks static-only
	 */

	'use strict';

	var warning = __webpack_require__(59);

	/**
	 * Given a `prevElement` and `nextElement`, determines if the existing
	 * instance should be updated as opposed to being destroyed or replaced by a new
	 * instance. Both arguments are elements. This ensures that this logic can
	 * operate on stateless trees without any backing instance.
	 *
	 * @param {?object} prevElement
	 * @param {?object} nextElement
	 * @return {boolean} True if the existing instance should be updated.
	 * @protected
	 */
	function shouldUpdateReactComponent(prevElement, nextElement) {
	  if (prevElement != null && nextElement != null) {
	    var prevType = typeof prevElement;
	    var nextType = typeof nextElement;
	    if (prevType === 'string' || prevType === 'number') {
	      return (nextType === 'string' || nextType === 'number');
	    } else {
	      if (nextType === 'object' &&
	          prevElement.type === nextElement.type &&
	          prevElement.key === nextElement.key) {
	        var ownersMatch = prevElement._owner === nextElement._owner;
	        var prevName = null;
	        var nextName = null;
	        var nextDisplayName = null;
	        if (false) {
	          if (!ownersMatch) {
	            if (prevElement._owner != null &&
	                prevElement._owner.getPublicInstance() != null &&
	                prevElement._owner.getPublicInstance().constructor != null) {
	              prevName =
	                prevElement._owner.getPublicInstance().constructor.displayName;
	            }
	            if (nextElement._owner != null &&
	                nextElement._owner.getPublicInstance() != null &&
	                nextElement._owner.getPublicInstance().constructor != null) {
	              nextName =
	                nextElement._owner.getPublicInstance().constructor.displayName;
	            }
	            if (nextElement.type != null &&
	                nextElement.type.displayName != null) {
	              nextDisplayName = nextElement.type.displayName;
	            }
	            if (nextElement.type != null && typeof nextElement.type === 'string') {
	              nextDisplayName = nextElement.type;
	            }
	            if (typeof nextElement.type !== 'string' ||
	                nextElement.type === 'input' ||
	                nextElement.type === 'textarea') {
	              if ((prevElement._owner != null &&
	                  prevElement._owner._isOwnerNecessary === false) ||
	                  (nextElement._owner != null &&
	                  nextElement._owner._isOwnerNecessary === false)) {
	                if (prevElement._owner != null) {
	                  prevElement._owner._isOwnerNecessary = true;
	                }
	                if (nextElement._owner != null) {
	                  nextElement._owner._isOwnerNecessary = true;
	                }
	                ("production" !== process.env.NODE_ENV ? warning(
	                  false,
	                  '<%s /> is being rendered by both %s and %s using the same ' +
	                  'key (%s) in the same place. Currently, this means that ' +
	                  'they don\'t preserve state. This behavior should be very ' +
	                  'rare so we\'re considering deprecating it. Please contact ' +
	                  'the React team and explain your use case so that we can ' +
	                  'take that into consideration.',
	                  nextDisplayName || 'Unknown Component',
	                  prevName || '[Unknown]',
	                  nextName || '[Unknown]',
	                  prevElement.key
	                ) : null);
	              }
	            }
	          }
	        }
	        return ownersMatch;
	      }
	    }
	  }
	  return false;
	}

	module.exports = shouldUpdateReactComponent;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMComponent
	 * @typechecks static-only
	 */

	/* global hasOwnProperty:true */

	'use strict';

	var CSSPropertyOperations = __webpack_require__(96);
	var DOMProperty = __webpack_require__(91);
	var DOMPropertyOperations = __webpack_require__(90);
	var ReactBrowserEventEmitter = __webpack_require__(115);
	var ReactComponentBrowserEnvironment =
	  __webpack_require__(94);
	var ReactMount = __webpack_require__(114);
	var ReactMultiChild = __webpack_require__(135);
	var ReactPerf = __webpack_require__(75);

	var assign = __webpack_require__(62);
	var escapeTextContentForBrowser = __webpack_require__(93);
	var invariant = __webpack_require__(54);
	var isEventSupported = __webpack_require__(122);
	var keyOf = __webpack_require__(86);
	var warning = __webpack_require__(59);

	var deleteListener = ReactBrowserEventEmitter.deleteListener;
	var listenTo = ReactBrowserEventEmitter.listenTo;
	var registrationNameModules = ReactBrowserEventEmitter.registrationNameModules;

	// For quickly matching children type, to test if can be treated as content.
	var CONTENT_TYPES = {'string': true, 'number': true};

	var STYLE = keyOf({style: null});

	var ELEMENT_NODE_TYPE = 1;

	/**
	 * Optionally injectable operations for mutating the DOM
	 */
	var BackendIDOperations = null;

	/**
	 * @param {?object} props
	 */
	function assertValidProps(props) {
	  if (!props) {
	    return;
	  }
	  // Note the use of `==` which checks for null or undefined.
	  if (props.dangerouslySetInnerHTML != null) {
	    (false ? invariant(
	      props.children == null,
	      'Can only set one of `children` or `props.dangerouslySetInnerHTML`.'
	    ) : invariant(props.children == null));
	    (false ? invariant(
	      typeof props.dangerouslySetInnerHTML === 'object' &&
	      '__html' in props.dangerouslySetInnerHTML,
	      '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. ' +
	      'Please visit https://fb.me/react-invariant-dangerously-set-inner-html ' +
	      'for more information.'
	    ) : invariant(typeof props.dangerouslySetInnerHTML === 'object' &&
	    '__html' in props.dangerouslySetInnerHTML));
	  }
	  if (false) {
	    ("production" !== process.env.NODE_ENV ? warning(
	      props.innerHTML == null,
	      'Directly setting property `innerHTML` is not permitted. ' +
	      'For more information, lookup documentation on `dangerouslySetInnerHTML`.'
	    ) : null);
	    ("production" !== process.env.NODE_ENV ? warning(
	      !props.contentEditable || props.children == null,
	      'A component is `contentEditable` and contains `children` managed by ' +
	      'React. It is now your responsibility to guarantee that none of ' +
	      'those nodes are unexpectedly modified or duplicated. This is ' +
	      'probably not intentional.'
	    ) : null);
	  }
	  (false ? invariant(
	    props.style == null || typeof props.style === 'object',
	    'The `style` prop expects a mapping from style properties to values, ' +
	    'not a string. For example, style={{marginRight: spacing + \'em\'}} when ' +
	    'using JSX.'
	  ) : invariant(props.style == null || typeof props.style === 'object'));
	}

	function putListener(id, registrationName, listener, transaction) {
	  if (false) {
	    // IE8 has no API for event capturing and the `onScroll` event doesn't
	    // bubble.
	    ("production" !== process.env.NODE_ENV ? warning(
	      registrationName !== 'onScroll' || isEventSupported('scroll', true),
	      'This browser doesn\'t support the `onScroll` event'
	    ) : null);
	  }
	  var container = ReactMount.findReactContainerForID(id);
	  if (container) {
	    var doc = container.nodeType === ELEMENT_NODE_TYPE ?
	      container.ownerDocument :
	      container;
	    listenTo(registrationName, doc);
	  }
	  transaction.getPutListenerQueue().enqueuePutListener(
	    id,
	    registrationName,
	    listener
	  );
	}

	// For HTML, certain tags should omit their close tag. We keep a whitelist for
	// those special cased tags.

	var omittedCloseTags = {
	  'area': true,
	  'base': true,
	  'br': true,
	  'col': true,
	  'embed': true,
	  'hr': true,
	  'img': true,
	  'input': true,
	  'keygen': true,
	  'link': true,
	  'meta': true,
	  'param': true,
	  'source': true,
	  'track': true,
	  'wbr': true
	  // NOTE: menuitem's close tag should be omitted, but that causes problems.
	};

	// We accept any tag to be rendered but since this gets injected into abitrary
	// HTML, we want to make sure that it's a safe tag.
	// http://www.w3.org/TR/REC-xml/#NT-Name

	var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/; // Simplified subset
	var validatedTagCache = {};
	var hasOwnProperty = {}.hasOwnProperty;

	function validateDangerousTag(tag) {
	  if (!hasOwnProperty.call(validatedTagCache, tag)) {
	    (false ? invariant(VALID_TAG_REGEX.test(tag), 'Invalid tag: %s', tag) : invariant(VALID_TAG_REGEX.test(tag)));
	    validatedTagCache[tag] = true;
	  }
	}

	/**
	 * Creates a new React class that is idempotent and capable of containing other
	 * React components. It accepts event listeners and DOM properties that are
	 * valid according to `DOMProperty`.
	 *
	 *  - Event listeners: `onClick`, `onMouseDown`, etc.
	 *  - DOM properties: `className`, `name`, `title`, etc.
	 *
	 * The `style` property functions differently from the DOM API. It accepts an
	 * object mapping of style properties to values.
	 *
	 * @constructor ReactDOMComponent
	 * @extends ReactMultiChild
	 */
	function ReactDOMComponent(tag) {
	  validateDangerousTag(tag);
	  this._tag = tag;
	  this._renderedChildren = null;
	  this._previousStyleCopy = null;
	  this._rootNodeID = null;
	}

	ReactDOMComponent.displayName = 'ReactDOMComponent';

	ReactDOMComponent.Mixin = {

	  construct: function(element) {
	    this._currentElement = element;
	  },

	  /**
	   * Generates root tag markup then recurses. This method has side effects and
	   * is not idempotent.
	   *
	   * @internal
	   * @param {string} rootID The root DOM ID for this node.
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @return {string} The computed markup.
	   */
	  mountComponent: function(rootID, transaction, context) {
	    this._rootNodeID = rootID;
	    assertValidProps(this._currentElement.props);
	    var closeTag = omittedCloseTags[this._tag] ? '' : '</' + this._tag + '>';
	    return (
	      this._createOpenTagMarkupAndPutListeners(transaction) +
	      this._createContentMarkup(transaction, context) +
	      closeTag
	    );
	  },

	  /**
	   * Creates markup for the open tag and all attributes.
	   *
	   * This method has side effects because events get registered.
	   *
	   * Iterating over object properties is faster than iterating over arrays.
	   * @see http://jsperf.com/obj-vs-arr-iteration
	   *
	   * @private
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @return {string} Markup of opening tag.
	   */
	  _createOpenTagMarkupAndPutListeners: function(transaction) {
	    var props = this._currentElement.props;
	    var ret = '<' + this._tag;

	    for (var propKey in props) {
	      if (!props.hasOwnProperty(propKey)) {
	        continue;
	      }
	      var propValue = props[propKey];
	      if (propValue == null) {
	        continue;
	      }
	      if (registrationNameModules.hasOwnProperty(propKey)) {
	        putListener(this._rootNodeID, propKey, propValue, transaction);
	      } else {
	        if (propKey === STYLE) {
	          if (propValue) {
	            propValue = this._previousStyleCopy = assign({}, props.style);
	          }
	          propValue = CSSPropertyOperations.createMarkupForStyles(propValue);
	        }
	        var markup =
	          DOMPropertyOperations.createMarkupForProperty(propKey, propValue);
	        if (markup) {
	          ret += ' ' + markup;
	        }
	      }
	    }

	    // For static pages, no need to put React ID and checksum. Saves lots of
	    // bytes.
	    if (transaction.renderToStaticMarkup) {
	      return ret + '>';
	    }

	    var markupForID = DOMPropertyOperations.createMarkupForID(this._rootNodeID);
	    return ret + ' ' + markupForID + '>';
	  },

	  /**
	   * Creates markup for the content between the tags.
	   *
	   * @private
	   * @param {ReactReconcileTransaction|ReactServerRenderingTransaction} transaction
	   * @param {object} context
	   * @return {string} Content markup.
	   */
	  _createContentMarkup: function(transaction, context) {
	    var prefix = '';
	    if (this._tag === 'listing' ||
	        this._tag === 'pre' ||
	        this._tag === 'textarea') {
	      // Add an initial newline because browsers ignore the first newline in
	      // a <listing>, <pre>, or <textarea> as an "authoring convenience" -- see
	      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody.
	      prefix = '\n';
	    }

	    var props = this._currentElement.props;

	    // Intentional use of != to avoid catching zero/false.
	    var innerHTML = props.dangerouslySetInnerHTML;
	    if (innerHTML != null) {
	      if (innerHTML.__html != null) {
	        return prefix + innerHTML.__html;
	      }
	    } else {
	      var contentToUse =
	        CONTENT_TYPES[typeof props.children] ? props.children : null;
	      var childrenToUse = contentToUse != null ? null : props.children;
	      if (contentToUse != null) {
	        return prefix + escapeTextContentForBrowser(contentToUse);
	      } else if (childrenToUse != null) {
	        var mountImages = this.mountChildren(
	          childrenToUse,
	          transaction,
	          context
	        );
	        return prefix + mountImages.join('');
	      }
	    }
	    return prefix;
	  },

	  receiveComponent: function(nextElement, transaction, context) {
	    var prevElement = this._currentElement;
	    this._currentElement = nextElement;
	    this.updateComponent(transaction, prevElement, nextElement, context);
	  },

	  /**
	   * Updates a native DOM component after it has already been allocated and
	   * attached to the DOM. Reconciles the root DOM node, then recurses.
	   *
	   * @param {ReactReconcileTransaction} transaction
	   * @param {ReactElement} prevElement
	   * @param {ReactElement} nextElement
	   * @internal
	   * @overridable
	   */
	  updateComponent: function(transaction, prevElement, nextElement, context) {
	    assertValidProps(this._currentElement.props);
	    this._updateDOMProperties(prevElement.props, transaction);
	    this._updateDOMChildren(prevElement.props, transaction, context);
	  },

	  /**
	   * Reconciles the properties by detecting differences in property values and
	   * updating the DOM as necessary. This function is probably the single most
	   * critical path for performance optimization.
	   *
	   * TODO: Benchmark whether checking for changed values in memory actually
	   *       improves performance (especially statically positioned elements).
	   * TODO: Benchmark the effects of putting this at the top since 99% of props
	   *       do not change for a given reconciliation.
	   * TODO: Benchmark areas that can be improved with caching.
	   *
	   * @private
	   * @param {object} lastProps
	   * @param {ReactReconcileTransaction} transaction
	   */
	  _updateDOMProperties: function(lastProps, transaction) {
	    var nextProps = this._currentElement.props;
	    var propKey;
	    var styleName;
	    var styleUpdates;
	    for (propKey in lastProps) {
	      if (nextProps.hasOwnProperty(propKey) ||
	         !lastProps.hasOwnProperty(propKey)) {
	        continue;
	      }
	      if (propKey === STYLE) {
	        var lastStyle = this._previousStyleCopy;
	        for (styleName in lastStyle) {
	          if (lastStyle.hasOwnProperty(styleName)) {
	            styleUpdates = styleUpdates || {};
	            styleUpdates[styleName] = '';
	          }
	        }
	        this._previousStyleCopy = null;
	      } else if (registrationNameModules.hasOwnProperty(propKey)) {
	        deleteListener(this._rootNodeID, propKey);
	      } else if (
	          DOMProperty.isStandardName[propKey] ||
	          DOMProperty.isCustomAttribute(propKey)) {
	        BackendIDOperations.deletePropertyByID(
	          this._rootNodeID,
	          propKey
	        );
	      }
	    }
	    for (propKey in nextProps) {
	      var nextProp = nextProps[propKey];
	      var lastProp = propKey === STYLE ?
	        this._previousStyleCopy :
	        lastProps[propKey];
	      if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp) {
	        continue;
	      }
	      if (propKey === STYLE) {
	        if (nextProp) {
	          nextProp = this._previousStyleCopy = assign({}, nextProp);
	        } else {
	          this._previousStyleCopy = null;
	        }
	        if (lastProp) {
	          // Unset styles on `lastProp` but not on `nextProp`.
	          for (styleName in lastProp) {
	            if (lastProp.hasOwnProperty(styleName) &&
	                (!nextProp || !nextProp.hasOwnProperty(styleName))) {
	              styleUpdates = styleUpdates || {};
	              styleUpdates[styleName] = '';
	            }
	          }
	          // Update styles that changed since `lastProp`.
	          for (styleName in nextProp) {
	            if (nextProp.hasOwnProperty(styleName) &&
	                lastProp[styleName] !== nextProp[styleName]) {
	              styleUpdates = styleUpdates || {};
	              styleUpdates[styleName] = nextProp[styleName];
	            }
	          }
	        } else {
	          // Relies on `updateStylesByID` not mutating `styleUpdates`.
	          styleUpdates = nextProp;
	        }
	      } else if (registrationNameModules.hasOwnProperty(propKey)) {
	        putListener(this._rootNodeID, propKey, nextProp, transaction);
	      } else if (
	          DOMProperty.isStandardName[propKey] ||
	          DOMProperty.isCustomAttribute(propKey)) {
	        BackendIDOperations.updatePropertyByID(
	          this._rootNodeID,
	          propKey,
	          nextProp
	        );
	      }
	    }
	    if (styleUpdates) {
	      BackendIDOperations.updateStylesByID(
	        this._rootNodeID,
	        styleUpdates
	      );
	    }
	  },

	  /**
	   * Reconciles the children with the various properties that affect the
	   * children content.
	   *
	   * @param {object} lastProps
	   * @param {ReactReconcileTransaction} transaction
	   */
	  _updateDOMChildren: function(lastProps, transaction, context) {
	    var nextProps = this._currentElement.props;

	    var lastContent =
	      CONTENT_TYPES[typeof lastProps.children] ? lastProps.children : null;
	    var nextContent =
	      CONTENT_TYPES[typeof nextProps.children] ? nextProps.children : null;

	    var lastHtml =
	      lastProps.dangerouslySetInnerHTML &&
	      lastProps.dangerouslySetInnerHTML.__html;
	    var nextHtml =
	      nextProps.dangerouslySetInnerHTML &&
	      nextProps.dangerouslySetInnerHTML.__html;

	    // Note the use of `!=` which checks for null or undefined.
	    var lastChildren = lastContent != null ? null : lastProps.children;
	    var nextChildren = nextContent != null ? null : nextProps.children;

	    // If we're switching from children to content/html or vice versa, remove
	    // the old content
	    var lastHasContentOrHtml = lastContent != null || lastHtml != null;
	    var nextHasContentOrHtml = nextContent != null || nextHtml != null;
	    if (lastChildren != null && nextChildren == null) {
	      this.updateChildren(null, transaction, context);
	    } else if (lastHasContentOrHtml && !nextHasContentOrHtml) {
	      this.updateTextContent('');
	    }

	    if (nextContent != null) {
	      if (lastContent !== nextContent) {
	        this.updateTextContent('' + nextContent);
	      }
	    } else if (nextHtml != null) {
	      if (lastHtml !== nextHtml) {
	        BackendIDOperations.updateInnerHTMLByID(
	          this._rootNodeID,
	          nextHtml
	        );
	      }
	    } else if (nextChildren != null) {
	      this.updateChildren(nextChildren, transaction, context);
	    }
	  },

	  /**
	   * Destroys all event registrations for this instance. Does not remove from
	   * the DOM. That must be done by the parent.
	   *
	   * @internal
	   */
	  unmountComponent: function() {
	    this.unmountChildren();
	    ReactBrowserEventEmitter.deleteAllListeners(this._rootNodeID);
	    ReactComponentBrowserEnvironment.unmountIDFromEnvironment(this._rootNodeID);
	    this._rootNodeID = null;
	  }

	};

	ReactPerf.measureMethods(ReactDOMComponent, 'ReactDOMComponent', {
	  mountComponent: 'mountComponent',
	  updateComponent: 'updateComponent'
	});

	assign(
	  ReactDOMComponent.prototype,
	  ReactDOMComponent.Mixin,
	  ReactMultiChild.Mixin
	);

	ReactDOMComponent.injection = {
	  injectIDOperations: function(IDOperations) {
	    ReactDOMComponent.BackendIDOperations = BackendIDOperations = IDOperations;
	  }
	};

	module.exports = ReactDOMComponent;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactMultiChild
	 * @typechecks static-only
	 */

	'use strict';

	var ReactComponentEnvironment = __webpack_require__(132);
	var ReactMultiChildUpdateTypes = __webpack_require__(111);

	var ReactReconciler = __webpack_require__(76);
	var ReactChildReconciler = __webpack_require__(136);

	/**
	 * Updating children of a component may trigger recursive updates. The depth is
	 * used to batch recursive updates to render markup more efficiently.
	 *
	 * @type {number}
	 * @private
	 */
	var updateDepth = 0;

	/**
	 * Queue of update configuration objects.
	 *
	 * Each object has a `type` property that is in `ReactMultiChildUpdateTypes`.
	 *
	 * @type {array<object>}
	 * @private
	 */
	var updateQueue = [];

	/**
	 * Queue of markup to be rendered.
	 *
	 * @type {array<string>}
	 * @private
	 */
	var markupQueue = [];

	/**
	 * Enqueues markup to be rendered and inserted at a supplied index.
	 *
	 * @param {string} parentID ID of the parent component.
	 * @param {string} markup Markup that renders into an element.
	 * @param {number} toIndex Destination index.
	 * @private
	 */
	function enqueueMarkup(parentID, markup, toIndex) {
	  // NOTE: Null values reduce hidden classes.
	  updateQueue.push({
	    parentID: parentID,
	    parentNode: null,
	    type: ReactMultiChildUpdateTypes.INSERT_MARKUP,
	    markupIndex: markupQueue.push(markup) - 1,
	    textContent: null,
	    fromIndex: null,
	    toIndex: toIndex
	  });
	}

	/**
	 * Enqueues moving an existing element to another index.
	 *
	 * @param {string} parentID ID of the parent component.
	 * @param {number} fromIndex Source index of the existing element.
	 * @param {number} toIndex Destination index of the element.
	 * @private
	 */
	function enqueueMove(parentID, fromIndex, toIndex) {
	  // NOTE: Null values reduce hidden classes.
	  updateQueue.push({
	    parentID: parentID,
	    parentNode: null,
	    type: ReactMultiChildUpdateTypes.MOVE_EXISTING,
	    markupIndex: null,
	    textContent: null,
	    fromIndex: fromIndex,
	    toIndex: toIndex
	  });
	}

	/**
	 * Enqueues removing an element at an index.
	 *
	 * @param {string} parentID ID of the parent component.
	 * @param {number} fromIndex Index of the element to remove.
	 * @private
	 */
	function enqueueRemove(parentID, fromIndex) {
	  // NOTE: Null values reduce hidden classes.
	  updateQueue.push({
	    parentID: parentID,
	    parentNode: null,
	    type: ReactMultiChildUpdateTypes.REMOVE_NODE,
	    markupIndex: null,
	    textContent: null,
	    fromIndex: fromIndex,
	    toIndex: null
	  });
	}

	/**
	 * Enqueues setting the text content.
	 *
	 * @param {string} parentID ID of the parent component.
	 * @param {string} textContent Text content to set.
	 * @private
	 */
	function enqueueTextContent(parentID, textContent) {
	  // NOTE: Null values reduce hidden classes.
	  updateQueue.push({
	    parentID: parentID,
	    parentNode: null,
	    type: ReactMultiChildUpdateTypes.TEXT_CONTENT,
	    markupIndex: null,
	    textContent: textContent,
	    fromIndex: null,
	    toIndex: null
	  });
	}

	/**
	 * Processes any enqueued updates.
	 *
	 * @private
	 */
	function processQueue() {
	  if (updateQueue.length) {
	    ReactComponentEnvironment.processChildrenUpdates(
	      updateQueue,
	      markupQueue
	    );
	    clearQueue();
	  }
	}

	/**
	 * Clears any enqueued updates.
	 *
	 * @private
	 */
	function clearQueue() {
	  updateQueue.length = 0;
	  markupQueue.length = 0;
	}

	/**
	 * ReactMultiChild are capable of reconciling multiple children.
	 *
	 * @class ReactMultiChild
	 * @internal
	 */
	var ReactMultiChild = {

	  /**
	   * Provides common functionality for components that must reconcile multiple
	   * children. This is used by `ReactDOMComponent` to mount, update, and
	   * unmount child components.
	   *
	   * @lends {ReactMultiChild.prototype}
	   */
	  Mixin: {

	    /**
	     * Generates a "mount image" for each of the supplied children. In the case
	     * of `ReactDOMComponent`, a mount image is a string of markup.
	     *
	     * @param {?object} nestedChildren Nested child maps.
	     * @return {array} An array of mounted representations.
	     * @internal
	     */
	    mountChildren: function(nestedChildren, transaction, context) {
	      var children = ReactChildReconciler.instantiateChildren(
	        nestedChildren, transaction, context
	      );
	      this._renderedChildren = children;
	      var mountImages = [];
	      var index = 0;
	      for (var name in children) {
	        if (children.hasOwnProperty(name)) {
	          var child = children[name];
	          // Inlined for performance, see `ReactInstanceHandles.createReactID`.
	          var rootID = this._rootNodeID + name;
	          var mountImage = ReactReconciler.mountComponent(
	            child,
	            rootID,
	            transaction,
	            context
	          );
	          child._mountIndex = index;
	          mountImages.push(mountImage);
	          index++;
	        }
	      }
	      return mountImages;
	    },

	    /**
	     * Replaces any rendered children with a text content string.
	     *
	     * @param {string} nextContent String of content.
	     * @internal
	     */
	    updateTextContent: function(nextContent) {
	      updateDepth++;
	      var errorThrown = true;
	      try {
	        var prevChildren = this._renderedChildren;
	        // Remove any rendered children.
	        ReactChildReconciler.unmountChildren(prevChildren);
	        // TODO: The setTextContent operation should be enough
	        for (var name in prevChildren) {
	          if (prevChildren.hasOwnProperty(name)) {
	            this._unmountChildByName(prevChildren[name], name);
	          }
	        }
	        // Set new text content.
	        this.setTextContent(nextContent);
	        errorThrown = false;
	      } finally {
	        updateDepth--;
	        if (!updateDepth) {
	          if (errorThrown) {
	            clearQueue();
	          } else {
	            processQueue();
	          }
	        }
	      }
	    },

	    /**
	     * Updates the rendered children with new children.
	     *
	     * @param {?object} nextNestedChildren Nested child maps.
	     * @param {ReactReconcileTransaction} transaction
	     * @internal
	     */
	    updateChildren: function(nextNestedChildren, transaction, context) {
	      updateDepth++;
	      var errorThrown = true;
	      try {
	        this._updateChildren(nextNestedChildren, transaction, context);
	        errorThrown = false;
	      } finally {
	        updateDepth--;
	        if (!updateDepth) {
	          if (errorThrown) {
	            clearQueue();
	          } else {
	            processQueue();
	          }
	        }

	      }
	    },

	    /**
	     * Improve performance by isolating this hot code path from the try/catch
	     * block in `updateChildren`.
	     *
	     * @param {?object} nextNestedChildren Nested child maps.
	     * @param {ReactReconcileTransaction} transaction
	     * @final
	     * @protected
	     */
	    _updateChildren: function(nextNestedChildren, transaction, context) {
	      var prevChildren = this._renderedChildren;
	      var nextChildren = ReactChildReconciler.updateChildren(
	        prevChildren, nextNestedChildren, transaction, context
	      );
	      this._renderedChildren = nextChildren;
	      if (!nextChildren && !prevChildren) {
	        return;
	      }
	      var name;
	      // `nextIndex` will increment for each child in `nextChildren`, but
	      // `lastIndex` will be the last index visited in `prevChildren`.
	      var lastIndex = 0;
	      var nextIndex = 0;
	      for (name in nextChildren) {
	        if (!nextChildren.hasOwnProperty(name)) {
	          continue;
	        }
	        var prevChild = prevChildren && prevChildren[name];
	        var nextChild = nextChildren[name];
	        if (prevChild === nextChild) {
	          this.moveChild(prevChild, nextIndex, lastIndex);
	          lastIndex = Math.max(prevChild._mountIndex, lastIndex);
	          prevChild._mountIndex = nextIndex;
	        } else {
	          if (prevChild) {
	            // Update `lastIndex` before `_mountIndex` gets unset by unmounting.
	            lastIndex = Math.max(prevChild._mountIndex, lastIndex);
	            this._unmountChildByName(prevChild, name);
	          }
	          // The child must be instantiated before it's mounted.
	          this._mountChildByNameAtIndex(
	            nextChild, name, nextIndex, transaction, context
	          );
	        }
	        nextIndex++;
	      }
	      // Remove children that are no longer present.
	      for (name in prevChildren) {
	        if (prevChildren.hasOwnProperty(name) &&
	            !(nextChildren && nextChildren.hasOwnProperty(name))) {
	          this._unmountChildByName(prevChildren[name], name);
	        }
	      }
	    },

	    /**
	     * Unmounts all rendered children. This should be used to clean up children
	     * when this component is unmounted.
	     *
	     * @internal
	     */
	    unmountChildren: function() {
	      var renderedChildren = this._renderedChildren;
	      ReactChildReconciler.unmountChildren(renderedChildren);
	      this._renderedChildren = null;
	    },

	    /**
	     * Moves a child component to the supplied index.
	     *
	     * @param {ReactComponent} child Component to move.
	     * @param {number} toIndex Destination index of the element.
	     * @param {number} lastIndex Last index visited of the siblings of `child`.
	     * @protected
	     */
	    moveChild: function(child, toIndex, lastIndex) {
	      // If the index of `child` is less than `lastIndex`, then it needs to
	      // be moved. Otherwise, we do not need to move it because a child will be
	      // inserted or moved before `child`.
	      if (child._mountIndex < lastIndex) {
	        enqueueMove(this._rootNodeID, child._mountIndex, toIndex);
	      }
	    },

	    /**
	     * Creates a child component.
	     *
	     * @param {ReactComponent} child Component to create.
	     * @param {string} mountImage Markup to insert.
	     * @protected
	     */
	    createChild: function(child, mountImage) {
	      enqueueMarkup(this._rootNodeID, mountImage, child._mountIndex);
	    },

	    /**
	     * Removes a child component.
	     *
	     * @param {ReactComponent} child Child to remove.
	     * @protected
	     */
	    removeChild: function(child) {
	      enqueueRemove(this._rootNodeID, child._mountIndex);
	    },

	    /**
	     * Sets this text content string.
	     *
	     * @param {string} textContent Text content to set.
	     * @protected
	     */
	    setTextContent: function(textContent) {
	      enqueueTextContent(this._rootNodeID, textContent);
	    },

	    /**
	     * Mounts a child with the supplied name.
	     *
	     * NOTE: This is part of `updateChildren` and is here for readability.
	     *
	     * @param {ReactComponent} child Component to mount.
	     * @param {string} name Name of the child.
	     * @param {number} index Index at which to insert the child.
	     * @param {ReactReconcileTransaction} transaction
	     * @private
	     */
	    _mountChildByNameAtIndex: function(
	      child,
	      name,
	      index,
	      transaction,
	      context) {
	      // Inlined for performance, see `ReactInstanceHandles.createReactID`.
	      var rootID = this._rootNodeID + name;
	      var mountImage = ReactReconciler.mountComponent(
	        child,
	        rootID,
	        transaction,
	        context
	      );
	      child._mountIndex = index;
	      this.createChild(child, mountImage);
	    },

	    /**
	     * Unmounts a rendered child by name.
	     *
	     * NOTE: This is part of `updateChildren` and is here for readability.
	     *
	     * @param {ReactComponent} child Component to unmount.
	     * @param {string} name Name of the child in `this._renderedChildren`.
	     * @private
	     */
	    _unmountChildByName: function(child, name) {
	      this.removeChild(child);
	      child._mountIndex = null;
	    }

	  }

	};

	module.exports = ReactMultiChild;


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactChildReconciler
	 * @typechecks static-only
	 */

	'use strict';

	var ReactReconciler = __webpack_require__(76);

	var flattenChildren = __webpack_require__(137);
	var instantiateReactComponent = __webpack_require__(130);
	var shouldUpdateReactComponent = __webpack_require__(133);

	/**
	 * ReactChildReconciler provides helpers for initializing or updating a set of
	 * children. Its output is suitable for passing it onto ReactMultiChild which
	 * does diffed reordering and insertion.
	 */
	var ReactChildReconciler = {

	  /**
	   * Generates a "mount image" for each of the supplied children. In the case
	   * of `ReactDOMComponent`, a mount image is a string of markup.
	   *
	   * @param {?object} nestedChildNodes Nested child maps.
	   * @return {?object} A set of child instances.
	   * @internal
	   */
	  instantiateChildren: function(nestedChildNodes, transaction, context) {
	    var children = flattenChildren(nestedChildNodes);
	    for (var name in children) {
	      if (children.hasOwnProperty(name)) {
	        var child = children[name];
	        // The rendered children must be turned into instances as they're
	        // mounted.
	        var childInstance = instantiateReactComponent(child, null);
	        children[name] = childInstance;
	      }
	    }
	    return children;
	  },

	  /**
	   * Updates the rendered children and returns a new set of children.
	   *
	   * @param {?object} prevChildren Previously initialized set of children.
	   * @param {?object} nextNestedChildNodes Nested child maps.
	   * @param {ReactReconcileTransaction} transaction
	   * @param {object} context
	   * @return {?object} A new set of child instances.
	   * @internal
	   */
	  updateChildren: function(
	    prevChildren,
	    nextNestedChildNodes,
	    transaction,
	    context) {
	    // We currently don't have a way to track moves here but if we use iterators
	    // instead of for..in we can zip the iterators and check if an item has
	    // moved.
	    // TODO: If nothing has changed, return the prevChildren object so that we
	    // can quickly bailout if nothing has changed.
	    var nextChildren = flattenChildren(nextNestedChildNodes);
	    if (!nextChildren && !prevChildren) {
	      return null;
	    }
	    var name;
	    for (name in nextChildren) {
	      if (!nextChildren.hasOwnProperty(name)) {
	        continue;
	      }
	      var prevChild = prevChildren && prevChildren[name];
	      var prevElement = prevChild && prevChild._currentElement;
	      var nextElement = nextChildren[name];
	      if (shouldUpdateReactComponent(prevElement, nextElement)) {
	        ReactReconciler.receiveComponent(
	          prevChild, nextElement, transaction, context
	        );
	        nextChildren[name] = prevChild;
	      } else {
	        if (prevChild) {
	          ReactReconciler.unmountComponent(prevChild, name);
	        }
	        // The child must be instantiated before it's mounted.
	        var nextChildInstance = instantiateReactComponent(
	          nextElement,
	          null
	        );
	        nextChildren[name] = nextChildInstance;
	      }
	    }
	    // Unmount children that are no longer present.
	    for (name in prevChildren) {
	      if (prevChildren.hasOwnProperty(name) &&
	          !(nextChildren && nextChildren.hasOwnProperty(name))) {
	        ReactReconciler.unmountComponent(prevChildren[name]);
	      }
	    }
	    return nextChildren;
	  },

	  /**
	   * Unmounts all rendered children. This should be used to clean up children
	   * when this component is unmounted.
	   *
	   * @param {?object} renderedChildren Previously initialized set of children.
	   * @internal
	   */
	  unmountChildren: function(renderedChildren) {
	    for (var name in renderedChildren) {
	      var renderedChild = renderedChildren[name];
	      ReactReconciler.unmountComponent(renderedChild);
	    }
	  }

	};

	module.exports = ReactChildReconciler;


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule flattenChildren
	 */

	'use strict';

	var traverseAllChildren = __webpack_require__(65);
	var warning = __webpack_require__(59);

	/**
	 * @param {function} traverseContext Context passed through traversal.
	 * @param {?ReactComponent} child React child component.
	 * @param {!string} name String name of key path to child.
	 */
	function flattenSingleChildIntoContext(traverseContext, child, name) {
	  // We found a component instance.
	  var result = traverseContext;
	  var keyUnique = !result.hasOwnProperty(name);
	  if (false) {
	    ("production" !== process.env.NODE_ENV ? warning(
	      keyUnique,
	      'flattenChildren(...): Encountered two children with the same key, ' +
	      '`%s`. Child keys must be unique; when two children share a key, only ' +
	      'the first child will be used.',
	      name
	    ) : null);
	  }
	  if (keyUnique && child != null) {
	    result[name] = child;
	  }
	}

	/**
	 * Flattens children that are typically specified as `props.children`. Any null
	 * children will not be included in the resulting object.
	 * @return {!object} flattened children keyed by name.
	 */
	function flattenChildren(children) {
	  if (children == null) {
	    return children;
	  }
	  var result = {};
	  traverseAllChildren(children, flattenSingleChildIntoContext, result);
	  return result;
	}

	module.exports = flattenChildren;


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDefaultInjection
	 */

	'use strict';

	var BeforeInputEventPlugin = __webpack_require__(143);
	var ChangeEventPlugin = __webpack_require__(151);
	var ClientReactRootIndex = __webpack_require__(153);
	var DefaultEventPluginOrder = __webpack_require__(154);
	var EnterLeaveEventPlugin = __webpack_require__(155);
	var ExecutionEnvironment = __webpack_require__(100);
	var HTMLDOMPropertyConfig = __webpack_require__(159);
	var MobileSafariClickEventPlugin = __webpack_require__(160);
	var ReactBrowserComponentMixin = __webpack_require__(141);
	var ReactClass = __webpack_require__(84);
	var ReactComponentBrowserEnvironment =
	  __webpack_require__(94);
	var ReactDefaultBatchingStrategy = __webpack_require__(161);
	var ReactDOMComponent = __webpack_require__(134);
	var ReactDOMButton = __webpack_require__(162);
	var ReactDOMForm = __webpack_require__(165);
	var ReactDOMImg = __webpack_require__(166);
	var ReactDOMIDOperations = __webpack_require__(95);
	var ReactDOMIframe = __webpack_require__(139);
	var ReactDOMInput = __webpack_require__(167);
	var ReactDOMOption = __webpack_require__(170);
	var ReactDOMSelect = __webpack_require__(171);
	var ReactDOMTextarea = __webpack_require__(172);
	var ReactDOMTextComponent = __webpack_require__(89);
	var ReactElement = __webpack_require__(58);
	var ReactEventListener = __webpack_require__(173);
	var ReactInjection = __webpack_require__(176);
	var ReactInstanceHandles = __webpack_require__(66);
	var ReactMount = __webpack_require__(114);
	var ReactReconcileTransaction = __webpack_require__(177);
	var SelectEventPlugin = __webpack_require__(183);
	var ServerReactRootIndex = __webpack_require__(185);
	var SimpleEventPlugin = __webpack_require__(186);
	var SVGDOMPropertyConfig = __webpack_require__(195);

	var createFullPageComponent = __webpack_require__(196);

	function autoGenerateWrapperClass(type) {
	  return ReactClass.createClass({
	    tagName: type.toUpperCase(),
	    render: function() {
	      return new ReactElement(
	        type,
	        null,
	        null,
	        null,
	        null,
	        this.props
	      );
	    }
	  });
	}

	function inject() {
	  ReactInjection.EventEmitter.injectReactEventListener(
	    ReactEventListener
	  );

	  /**
	   * Inject modules for resolving DOM hierarchy and plugin ordering.
	   */
	  ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder);
	  ReactInjection.EventPluginHub.injectInstanceHandle(ReactInstanceHandles);
	  ReactInjection.EventPluginHub.injectMount(ReactMount);

	  /**
	   * Some important event plugins included by default (without having to require
	   * them).
	   */
	  ReactInjection.EventPluginHub.injectEventPluginsByName({
	    SimpleEventPlugin: SimpleEventPlugin,
	    EnterLeaveEventPlugin: EnterLeaveEventPlugin,
	    ChangeEventPlugin: ChangeEventPlugin,
	    MobileSafariClickEventPlugin: MobileSafariClickEventPlugin,
	    SelectEventPlugin: SelectEventPlugin,
	    BeforeInputEventPlugin: BeforeInputEventPlugin
	  });

	  ReactInjection.NativeComponent.injectGenericComponentClass(
	    ReactDOMComponent
	  );

	  ReactInjection.NativeComponent.injectTextComponentClass(
	    ReactDOMTextComponent
	  );

	  ReactInjection.NativeComponent.injectAutoWrapper(
	    autoGenerateWrapperClass
	  );

	  // This needs to happen before createFullPageComponent() otherwise the mixin
	  // won't be included.
	  ReactInjection.Class.injectMixin(ReactBrowserComponentMixin);

	  ReactInjection.NativeComponent.injectComponentClasses({
	    'button': ReactDOMButton,
	    'form': ReactDOMForm,
	    'iframe': ReactDOMIframe,
	    'img': ReactDOMImg,
	    'input': ReactDOMInput,
	    'option': ReactDOMOption,
	    'select': ReactDOMSelect,
	    'textarea': ReactDOMTextarea,

	    'html': createFullPageComponent('html'),
	    'head': createFullPageComponent('head'),
	    'body': createFullPageComponent('body')
	  });

	  ReactInjection.DOMProperty.injectDOMPropertyConfig(HTMLDOMPropertyConfig);
	  ReactInjection.DOMProperty.injectDOMPropertyConfig(SVGDOMPropertyConfig);

	  ReactInjection.EmptyComponent.injectEmptyComponent('noscript');

	  ReactInjection.Updates.injectReconcileTransaction(
	    ReactReconcileTransaction
	  );
	  ReactInjection.Updates.injectBatchingStrategy(
	    ReactDefaultBatchingStrategy
	  );

	  ReactInjection.RootIndex.injectCreateReactRootIndex(
	    ExecutionEnvironment.canUseDOM ?
	      ClientReactRootIndex.createReactRootIndex :
	      ServerReactRootIndex.createReactRootIndex
	  );

	  ReactInjection.Component.injectEnvironment(ReactComponentBrowserEnvironment);
	  ReactInjection.DOMComponent.injectIDOperations(ReactDOMIDOperations);

	  if (false) {
	    var url = (ExecutionEnvironment.canUseDOM && window.location.href) || '';
	    if ((/[?&]react_perf\b/).test(url)) {
	      var ReactDefaultPerf = require("./ReactDefaultPerf");
	      ReactDefaultPerf.start();
	    }
	  }
	}

	module.exports = {
	  inject: inject
	};


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMIframe
	 */

	'use strict';

	var EventConstants = __webpack_require__(52);
	var LocalEventTrapMixin = __webpack_require__(140);
	var ReactBrowserComponentMixin = __webpack_require__(141);
	var ReactClass = __webpack_require__(84);
	var ReactElement = __webpack_require__(58);

	var iframe = ReactElement.createFactory('iframe');

	/**
	 * Since onLoad doesn't bubble OR capture on the top level in IE8, we need to
	 * capture it on the <iframe> element itself. There are lots of hacks we could
	 * do to accomplish this, but the most reliable is to make <iframe> a composite
	 * component and use `componentDidMount` to attach the event handlers.
	 */
	var ReactDOMIframe = ReactClass.createClass({
	  displayName: 'ReactDOMIframe',
	  tagName: 'IFRAME',

	  mixins: [ReactBrowserComponentMixin, LocalEventTrapMixin],

	  render: function() {
	    return iframe(this.props);
	  },

	  componentDidMount: function() {
	    this.trapBubbledEvent(EventConstants.topLevelTypes.topLoad, 'load');
	  }
	});

	module.exports = ReactDOMIframe;


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule LocalEventTrapMixin
	 */

	'use strict';

	var ReactBrowserEventEmitter = __webpack_require__(115);

	var accumulateInto = __webpack_require__(118);
	var forEachAccumulated = __webpack_require__(119);
	var invariant = __webpack_require__(54);

	function remove(event) {
	  event.remove();
	}

	var LocalEventTrapMixin = {
	  trapBubbledEvent:function(topLevelType, handlerBaseName) {
	    (false ? invariant(this.isMounted(), 'Must be mounted to trap events') : invariant(this.isMounted()));
	    // If a component renders to null or if another component fatals and causes
	    // the state of the tree to be corrupted, `node` here can be null.
	    var node = this.getDOMNode();
	    (false ? invariant(
	      node,
	      'LocalEventTrapMixin.trapBubbledEvent(...): Requires node to be rendered.'
	    ) : invariant(node));
	    var listener = ReactBrowserEventEmitter.trapBubbledEvent(
	      topLevelType,
	      handlerBaseName,
	      node
	    );
	    this._localEventListeners =
	      accumulateInto(this._localEventListeners, listener);
	  },

	  // trapCapturedEvent would look nearly identical. We don't implement that
	  // method because it isn't currently needed.

	  componentWillUnmount:function() {
	    if (this._localEventListeners) {
	      forEachAccumulated(this._localEventListeners, remove);
	    }
	  }
	};

	module.exports = LocalEventTrapMixin;


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactBrowserComponentMixin
	 */

	'use strict';

	var findDOMNode = __webpack_require__(142);

	var ReactBrowserComponentMixin = {
	  /**
	   * Returns the DOM node rendered by this component.
	   *
	   * @return {DOMElement} The root node of this component.
	   * @final
	   * @protected
	   */
	  getDOMNode: function() {
	    return findDOMNode(this);
	  }
	};

	module.exports = ReactBrowserComponentMixin;


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule findDOMNode
	 * @typechecks static-only
	 */

	'use strict';

	var ReactCurrentOwner = __webpack_require__(64);
	var ReactInstanceMap = __webpack_require__(72);
	var ReactMount = __webpack_require__(114);

	var invariant = __webpack_require__(54);
	var isNode = __webpack_require__(128);
	var warning = __webpack_require__(59);

	/**
	 * Returns the DOM node rendered by this element.
	 *
	 * @param {ReactComponent|DOMElement} componentOrElement
	 * @return {DOMElement} The root node of this element.
	 */
	function findDOMNode(componentOrElement) {
	  if (false) {
	    var owner = ReactCurrentOwner.current;
	    if (owner !== null) {
	      ("production" !== process.env.NODE_ENV ? warning(
	        owner._warnedAboutRefsInRender,
	        '%s is accessing getDOMNode or findDOMNode inside its render(). ' +
	        'render() should be a pure function of props and state. It should ' +
	        'never access something that requires stale data from the previous ' +
	        'render, such as refs. Move this logic to componentDidMount and ' +
	        'componentDidUpdate instead.',
	        owner.getName() || 'A component'
	      ) : null);
	      owner._warnedAboutRefsInRender = true;
	    }
	  }
	  if (componentOrElement == null) {
	    return null;
	  }
	  if (isNode(componentOrElement)) {
	    return componentOrElement;
	  }
	  if (ReactInstanceMap.has(componentOrElement)) {
	    return ReactMount.getNodeFromInstance(componentOrElement);
	  }
	  (false ? invariant(
	    componentOrElement.render == null ||
	    typeof componentOrElement.render !== 'function',
	    'Component (with keys: %s) contains `render` method ' +
	    'but is not mounted in the DOM',
	    Object.keys(componentOrElement)
	  ) : invariant(componentOrElement.render == null ||
	  typeof componentOrElement.render !== 'function'));
	  (false ? invariant(
	    false,
	    'Element appears to be neither ReactComponent nor DOMNode (keys: %s)',
	    Object.keys(componentOrElement)
	  ) : invariant(false));
	}

	module.exports = findDOMNode;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015 Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule BeforeInputEventPlugin
	 * @typechecks static-only
	 */

	'use strict';

	var EventConstants = __webpack_require__(52);
	var EventPropagators = __webpack_require__(144);
	var ExecutionEnvironment = __webpack_require__(100);
	var FallbackCompositionState = __webpack_require__(145);
	var SyntheticCompositionEvent = __webpack_require__(147);
	var SyntheticInputEvent = __webpack_require__(150);

	var keyOf = __webpack_require__(86);

	var END_KEYCODES = [9, 13, 27, 32]; // Tab, Return, Esc, Space
	var START_KEYCODE = 229;

	var canUseCompositionEvent = (
	  ExecutionEnvironment.canUseDOM &&
	  'CompositionEvent' in window
	);

	var documentMode = null;
	if (ExecutionEnvironment.canUseDOM && 'documentMode' in document) {
	  documentMode = document.documentMode;
	}

	// Webkit offers a very useful `textInput` event that can be used to
	// directly represent `beforeInput`. The IE `textinput` event is not as
	// useful, so we don't use it.
	var canUseTextInputEvent = (
	  ExecutionEnvironment.canUseDOM &&
	  'TextEvent' in window &&
	  !documentMode &&
	  !isPresto()
	);

	// In IE9+, we have access to composition events, but the data supplied
	// by the native compositionend event may be incorrect. Japanese ideographic
	// spaces, for instance (\u3000) are not recorded correctly.
	var useFallbackCompositionData = (
	  ExecutionEnvironment.canUseDOM &&
	  (
	    (!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11)
	  )
	);

	/**
	 * Opera <= 12 includes TextEvent in window, but does not fire
	 * text input events. Rely on keypress instead.
	 */
	function isPresto() {
	  var opera = window.opera;
	  return (
	    typeof opera === 'object' &&
	    typeof opera.version === 'function' &&
	    parseInt(opera.version(), 10) <= 12
	  );
	}

	var SPACEBAR_CODE = 32;
	var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);

	var topLevelTypes = EventConstants.topLevelTypes;

	// Events and their corresponding property names.
	var eventTypes = {
	  beforeInput: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onBeforeInput: null}),
	      captured: keyOf({onBeforeInputCapture: null})
	    },
	    dependencies: [
	      topLevelTypes.topCompositionEnd,
	      topLevelTypes.topKeyPress,
	      topLevelTypes.topTextInput,
	      topLevelTypes.topPaste
	    ]
	  },
	  compositionEnd: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onCompositionEnd: null}),
	      captured: keyOf({onCompositionEndCapture: null})
	    },
	    dependencies: [
	      topLevelTypes.topBlur,
	      topLevelTypes.topCompositionEnd,
	      topLevelTypes.topKeyDown,
	      topLevelTypes.topKeyPress,
	      topLevelTypes.topKeyUp,
	      topLevelTypes.topMouseDown
	    ]
	  },
	  compositionStart: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onCompositionStart: null}),
	      captured: keyOf({onCompositionStartCapture: null})
	    },
	    dependencies: [
	      topLevelTypes.topBlur,
	      topLevelTypes.topCompositionStart,
	      topLevelTypes.topKeyDown,
	      topLevelTypes.topKeyPress,
	      topLevelTypes.topKeyUp,
	      topLevelTypes.topMouseDown
	    ]
	  },
	  compositionUpdate: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onCompositionUpdate: null}),
	      captured: keyOf({onCompositionUpdateCapture: null})
	    },
	    dependencies: [
	      topLevelTypes.topBlur,
	      topLevelTypes.topCompositionUpdate,
	      topLevelTypes.topKeyDown,
	      topLevelTypes.topKeyPress,
	      topLevelTypes.topKeyUp,
	      topLevelTypes.topMouseDown
	    ]
	  }
	};

	// Track whether we've ever handled a keypress on the space key.
	var hasSpaceKeypress = false;

	/**
	 * Return whether a native keypress event is assumed to be a command.
	 * This is required because Firefox fires `keypress` events for key commands
	 * (cut, copy, select-all, etc.) even though no character is inserted.
	 */
	function isKeypressCommand(nativeEvent) {
	  return (
	    (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) &&
	    // ctrlKey && altKey is equivalent to AltGr, and is not a command.
	    !(nativeEvent.ctrlKey && nativeEvent.altKey)
	  );
	}


	/**
	 * Translate native top level events into event types.
	 *
	 * @param {string} topLevelType
	 * @return {object}
	 */
	function getCompositionEventType(topLevelType) {
	  switch (topLevelType) {
	    case topLevelTypes.topCompositionStart:
	      return eventTypes.compositionStart;
	    case topLevelTypes.topCompositionEnd:
	      return eventTypes.compositionEnd;
	    case topLevelTypes.topCompositionUpdate:
	      return eventTypes.compositionUpdate;
	  }
	}

	/**
	 * Does our fallback best-guess model think this event signifies that
	 * composition has begun?
	 *
	 * @param {string} topLevelType
	 * @param {object} nativeEvent
	 * @return {boolean}
	 */
	function isFallbackCompositionStart(topLevelType, nativeEvent) {
	  return (
	    topLevelType === topLevelTypes.topKeyDown &&
	    nativeEvent.keyCode === START_KEYCODE
	  );
	}

	/**
	 * Does our fallback mode think that this event is the end of composition?
	 *
	 * @param {string} topLevelType
	 * @param {object} nativeEvent
	 * @return {boolean}
	 */
	function isFallbackCompositionEnd(topLevelType, nativeEvent) {
	  switch (topLevelType) {
	    case topLevelTypes.topKeyUp:
	      // Command keys insert or clear IME input.
	      return (END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1);
	    case topLevelTypes.topKeyDown:
	      // Expect IME keyCode on each keydown. If we get any other
	      // code we must have exited earlier.
	      return (nativeEvent.keyCode !== START_KEYCODE);
	    case topLevelTypes.topKeyPress:
	    case topLevelTypes.topMouseDown:
	    case topLevelTypes.topBlur:
	      // Events are not possible without cancelling IME.
	      return true;
	    default:
	      return false;
	  }
	}

	/**
	 * Google Input Tools provides composition data via a CustomEvent,
	 * with the `data` property populated in the `detail` object. If this
	 * is available on the event object, use it. If not, this is a plain
	 * composition event and we have nothing special to extract.
	 *
	 * @param {object} nativeEvent
	 * @return {?string}
	 */
	function getDataFromCustomEvent(nativeEvent) {
	  var detail = nativeEvent.detail;
	  if (typeof detail === 'object' && 'data' in detail) {
	    return detail.data;
	  }
	  return null;
	}

	// Track the current IME composition fallback object, if any.
	var currentComposition = null;

	/**
	 * @param {string} topLevelType Record from `EventConstants`.
	 * @param {DOMEventTarget} topLevelTarget The listening component root node.
	 * @param {string} topLevelTargetID ID of `topLevelTarget`.
	 * @param {object} nativeEvent Native browser event.
	 * @return {?object} A SyntheticCompositionEvent.
	 */
	function extractCompositionEvent(
	  topLevelType,
	  topLevelTarget,
	  topLevelTargetID,
	  nativeEvent
	) {
	  var eventType;
	  var fallbackData;

	  if (canUseCompositionEvent) {
	    eventType = getCompositionEventType(topLevelType);
	  } else if (!currentComposition) {
	    if (isFallbackCompositionStart(topLevelType, nativeEvent)) {
	      eventType = eventTypes.compositionStart;
	    }
	  } else if (isFallbackCompositionEnd(topLevelType, nativeEvent)) {
	    eventType = eventTypes.compositionEnd;
	  }

	  if (!eventType) {
	    return null;
	  }

	  if (useFallbackCompositionData) {
	    // The current composition is stored statically and must not be
	    // overwritten while composition continues.
	    if (!currentComposition && eventType === eventTypes.compositionStart) {
	      currentComposition = FallbackCompositionState.getPooled(topLevelTarget);
	    } else if (eventType === eventTypes.compositionEnd) {
	      if (currentComposition) {
	        fallbackData = currentComposition.getData();
	      }
	    }
	  }

	  var event = SyntheticCompositionEvent.getPooled(
	    eventType,
	    topLevelTargetID,
	    nativeEvent
	  );

	  if (fallbackData) {
	    // Inject data generated from fallback path into the synthetic event.
	    // This matches the property of native CompositionEventInterface.
	    event.data = fallbackData;
	  } else {
	    var customData = getDataFromCustomEvent(nativeEvent);
	    if (customData !== null) {
	      event.data = customData;
	    }
	  }

	  EventPropagators.accumulateTwoPhaseDispatches(event);
	  return event;
	}

	/**
	 * @param {string} topLevelType Record from `EventConstants`.
	 * @param {object} nativeEvent Native browser event.
	 * @return {?string} The string corresponding to this `beforeInput` event.
	 */
	function getNativeBeforeInputChars(topLevelType, nativeEvent) {
	  switch (topLevelType) {
	    case topLevelTypes.topCompositionEnd:
	      return getDataFromCustomEvent(nativeEvent);
	    case topLevelTypes.topKeyPress:
	      /**
	       * If native `textInput` events are available, our goal is to make
	       * use of them. However, there is a special case: the spacebar key.
	       * In Webkit, preventing default on a spacebar `textInput` event
	       * cancels character insertion, but it *also* causes the browser
	       * to fall back to its default spacebar behavior of scrolling the
	       * page.
	       *
	       * Tracking at:
	       * https://code.google.com/p/chromium/issues/detail?id=355103
	       *
	       * To avoid this issue, use the keypress event as if no `textInput`
	       * event is available.
	       */
	      var which = nativeEvent.which;
	      if (which !== SPACEBAR_CODE) {
	        return null;
	      }

	      hasSpaceKeypress = true;
	      return SPACEBAR_CHAR;

	    case topLevelTypes.topTextInput:
	      // Record the characters to be added to the DOM.
	      var chars = nativeEvent.data;

	      // If it's a spacebar character, assume that we have already handled
	      // it at the keypress level and bail immediately. Android Chrome
	      // doesn't give us keycodes, so we need to blacklist it.
	      if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
	        return null;
	      }

	      return chars;

	    default:
	      // For other native event types, do nothing.
	      return null;
	  }
	}

	/**
	 * For browsers that do not provide the `textInput` event, extract the
	 * appropriate string to use for SyntheticInputEvent.
	 *
	 * @param {string} topLevelType Record from `EventConstants`.
	 * @param {object} nativeEvent Native browser event.
	 * @return {?string} The fallback string for this `beforeInput` event.
	 */
	function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
	  // If we are currently composing (IME) and using a fallback to do so,
	  // try to extract the composed characters from the fallback object.
	  if (currentComposition) {
	    if (
	      topLevelType === topLevelTypes.topCompositionEnd ||
	      isFallbackCompositionEnd(topLevelType, nativeEvent)
	    ) {
	      var chars = currentComposition.getData();
	      FallbackCompositionState.release(currentComposition);
	      currentComposition = null;
	      return chars;
	    }
	    return null;
	  }

	  switch (topLevelType) {
	    case topLevelTypes.topPaste:
	      // If a paste event occurs after a keypress, throw out the input
	      // chars. Paste events should not lead to BeforeInput events.
	      return null;
	    case topLevelTypes.topKeyPress:
	      /**
	       * As of v27, Firefox may fire keypress events even when no character
	       * will be inserted. A few possibilities:
	       *
	       * - `which` is `0`. Arrow keys, Esc key, etc.
	       *
	       * - `which` is the pressed key code, but no char is available.
	       *   Ex: 'AltGr + d` in Polish. There is no modified character for
	       *   this key combination and no character is inserted into the
	       *   document, but FF fires the keypress for char code `100` anyway.
	       *   No `input` event will occur.
	       *
	       * - `which` is the pressed key code, but a command combination is
	       *   being used. Ex: `Cmd+C`. No character is inserted, and no
	       *   `input` event will occur.
	       */
	      if (nativeEvent.which && !isKeypressCommand(nativeEvent)) {
	        return String.fromCharCode(nativeEvent.which);
	      }
	      return null;
	    case topLevelTypes.topCompositionEnd:
	      return useFallbackCompositionData ? null : nativeEvent.data;
	    default:
	      return null;
	  }
	}

	/**
	 * Extract a SyntheticInputEvent for `beforeInput`, based on either native
	 * `textInput` or fallback behavior.
	 *
	 * @param {string} topLevelType Record from `EventConstants`.
	 * @param {DOMEventTarget} topLevelTarget The listening component root node.
	 * @param {string} topLevelTargetID ID of `topLevelTarget`.
	 * @param {object} nativeEvent Native browser event.
	 * @return {?object} A SyntheticInputEvent.
	 */
	function extractBeforeInputEvent(
	  topLevelType,
	  topLevelTarget,
	  topLevelTargetID,
	  nativeEvent
	) {
	  var chars;

	  if (canUseTextInputEvent) {
	    chars = getNativeBeforeInputChars(topLevelType, nativeEvent);
	  } else {
	    chars = getFallbackBeforeInputChars(topLevelType, nativeEvent);
	  }

	  // If no characters are being inserted, no BeforeInput event should
	  // be fired.
	  if (!chars) {
	    return null;
	  }

	  var event = SyntheticInputEvent.getPooled(
	    eventTypes.beforeInput,
	    topLevelTargetID,
	    nativeEvent
	  );

	  event.data = chars;
	  EventPropagators.accumulateTwoPhaseDispatches(event);
	  return event;
	}

	/**
	 * Create an `onBeforeInput` event to match
	 * http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105/#events-inputevents.
	 *
	 * This event plugin is based on the native `textInput` event
	 * available in Chrome, Safari, Opera, and IE. This event fires after
	 * `onKeyPress` and `onCompositionEnd`, but before `onInput`.
	 *
	 * `beforeInput` is spec'd but not implemented in any browsers, and
	 * the `input` event does not provide any useful information about what has
	 * actually been added, contrary to the spec. Thus, `textInput` is the best
	 * available event to identify the characters that have actually been inserted
	 * into the target node.
	 *
	 * This plugin is also responsible for emitting `composition` events, thus
	 * allowing us to share composition fallback code for both `beforeInput` and
	 * `composition` event types.
	 */
	var BeforeInputEventPlugin = {

	  eventTypes: eventTypes,

	  /**
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	    topLevelType,
	    topLevelTarget,
	    topLevelTargetID,
	    nativeEvent
	  ) {
	    return [
	      extractCompositionEvent(
	        topLevelType,
	        topLevelTarget,
	        topLevelTargetID,
	        nativeEvent
	      ),
	      extractBeforeInputEvent(
	        topLevelType,
	        topLevelTarget,
	        topLevelTargetID,
	        nativeEvent
	      )
	    ];
	  }
	};

	module.exports = BeforeInputEventPlugin;


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule EventPropagators
	 */

	'use strict';

	var EventConstants = __webpack_require__(52);
	var EventPluginHub = __webpack_require__(116);

	var accumulateInto = __webpack_require__(118);
	var forEachAccumulated = __webpack_require__(119);

	var PropagationPhases = EventConstants.PropagationPhases;
	var getListener = EventPluginHub.getListener;

	/**
	 * Some event types have a notion of different registration names for different
	 * "phases" of propagation. This finds listeners by a given phase.
	 */
	function listenerAtPhase(id, event, propagationPhase) {
	  var registrationName =
	    event.dispatchConfig.phasedRegistrationNames[propagationPhase];
	  return getListener(id, registrationName);
	}

	/**
	 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
	 * here, allows us to not have to bind or create functions for each event.
	 * Mutating the event's members allows us to not have to create a wrapping
	 * "dispatch" object that pairs the event with the listener.
	 */
	function accumulateDirectionalDispatches(domID, upwards, event) {
	  if (false) {
	    if (!domID) {
	      throw new Error('Dispatching id must not be null');
	    }
	  }
	  var phase = upwards ? PropagationPhases.bubbled : PropagationPhases.captured;
	  var listener = listenerAtPhase(domID, event, phase);
	  if (listener) {
	    event._dispatchListeners =
	      accumulateInto(event._dispatchListeners, listener);
	    event._dispatchIDs = accumulateInto(event._dispatchIDs, domID);
	  }
	}

	/**
	 * Collect dispatches (must be entirely collected before dispatching - see unit
	 * tests). Lazily allocate the array to conserve memory.  We must loop through
	 * each event and perform the traversal for each one. We can not perform a
	 * single traversal for the entire collection of events because each event may
	 * have a different target.
	 */
	function accumulateTwoPhaseDispatchesSingle(event) {
	  if (event && event.dispatchConfig.phasedRegistrationNames) {
	    EventPluginHub.injection.getInstanceHandle().traverseTwoPhase(
	      event.dispatchMarker,
	      accumulateDirectionalDispatches,
	      event
	    );
	  }
	}


	/**
	 * Accumulates without regard to direction, does not look for phased
	 * registration names. Same as `accumulateDirectDispatchesSingle` but without
	 * requiring that the `dispatchMarker` be the same as the dispatched ID.
	 */
	function accumulateDispatches(id, ignoredDirection, event) {
	  if (event && event.dispatchConfig.registrationName) {
	    var registrationName = event.dispatchConfig.registrationName;
	    var listener = getListener(id, registrationName);
	    if (listener) {
	      event._dispatchListeners =
	        accumulateInto(event._dispatchListeners, listener);
	      event._dispatchIDs = accumulateInto(event._dispatchIDs, id);
	    }
	  }
	}

	/**
	 * Accumulates dispatches on an `SyntheticEvent`, but only for the
	 * `dispatchMarker`.
	 * @param {SyntheticEvent} event
	 */
	function accumulateDirectDispatchesSingle(event) {
	  if (event && event.dispatchConfig.registrationName) {
	    accumulateDispatches(event.dispatchMarker, null, event);
	  }
	}

	function accumulateTwoPhaseDispatches(events) {
	  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
	}

	function accumulateEnterLeaveDispatches(leave, enter, fromID, toID) {
	  EventPluginHub.injection.getInstanceHandle().traverseEnterLeave(
	    fromID,
	    toID,
	    accumulateDispatches,
	    leave,
	    enter
	  );
	}


	function accumulateDirectDispatches(events) {
	  forEachAccumulated(events, accumulateDirectDispatchesSingle);
	}



	/**
	 * A small set of propagation patterns, each of which will accept a small amount
	 * of information, and generate a set of "dispatch ready event objects" - which
	 * are sets of events that have already been annotated with a set of dispatched
	 * listener functions/ids. The API is designed this way to discourage these
	 * propagation strategies from actually executing the dispatches, since we
	 * always want to collect the entire set of dispatches before executing event a
	 * single one.
	 *
	 * @constructor EventPropagators
	 */
	var EventPropagators = {
	  accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
	  accumulateDirectDispatches: accumulateDirectDispatches,
	  accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
	};

	module.exports = EventPropagators;


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule FallbackCompositionState
	 * @typechecks static-only
	 */

	'use strict';

	var PooledClass = __webpack_require__(56);

	var assign = __webpack_require__(62);
	var getTextContentAccessor = __webpack_require__(146);

	/**
	 * This helper class stores information about text content of a target node,
	 * allowing comparison of content before and after a given event.
	 *
	 * Identify the node where selection currently begins, then observe
	 * both its text content and its current position in the DOM. Since the
	 * browser may natively replace the target node during composition, we can
	 * use its position to find its replacement.
	 *
	 * @param {DOMEventTarget} root
	 */
	function FallbackCompositionState(root) {
	  this._root = root;
	  this._startText = this.getText();
	  this._fallbackText = null;
	}

	assign(FallbackCompositionState.prototype, {
	  /**
	   * Get current text of input.
	   *
	   * @return {string}
	   */
	  getText: function() {
	    if ('value' in this._root) {
	      return this._root.value;
	    }
	    return this._root[getTextContentAccessor()];
	  },

	  /**
	   * Determine the differing substring between the initially stored
	   * text content and the current content.
	   *
	   * @return {string}
	   */
	  getData: function() {
	    if (this._fallbackText) {
	      return this._fallbackText;
	    }

	    var start;
	    var startValue = this._startText;
	    var startLength = startValue.length;
	    var end;
	    var endValue = this.getText();
	    var endLength = endValue.length;

	    for (start = 0; start < startLength; start++) {
	      if (startValue[start] !== endValue[start]) {
	        break;
	      }
	    }

	    var minEnd = startLength - start;
	    for (end = 1; end <= minEnd; end++) {
	      if (startValue[startLength - end] !== endValue[endLength - end]) {
	        break;
	      }
	    }

	    var sliceTail = end > 1 ? 1 - end : undefined;
	    this._fallbackText = endValue.slice(start, sliceTail);
	    return this._fallbackText;
	  }
	});

	PooledClass.addPoolingTo(FallbackCompositionState);

	module.exports = FallbackCompositionState;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getTextContentAccessor
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(100);

	var contentKey = null;

	/**
	 * Gets the key used to access text content on a DOM node.
	 *
	 * @return {?string} Key used to access text content.
	 * @internal
	 */
	function getTextContentAccessor() {
	  if (!contentKey && ExecutionEnvironment.canUseDOM) {
	    // Prefer textContent to innerText because many browsers support both but
	    // SVG <text> elements don't support innerText even when <div> does.
	    contentKey = 'textContent' in document.documentElement ?
	      'textContent' :
	      'innerText';
	  }
	  return contentKey;
	}

	module.exports = getTextContentAccessor;


/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticCompositionEvent
	 * @typechecks static-only
	 */

	'use strict';

	var SyntheticEvent = __webpack_require__(148);

	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/#events-compositionevents
	 */
	var CompositionEventInterface = {
	  data: null
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticCompositionEvent(
	  dispatchConfig,
	  dispatchMarker,
	  nativeEvent) {
	  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticEvent.augmentClass(
	  SyntheticCompositionEvent,
	  CompositionEventInterface
	);

	module.exports = SyntheticCompositionEvent;


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticEvent
	 * @typechecks static-only
	 */

	'use strict';

	var PooledClass = __webpack_require__(56);

	var assign = __webpack_require__(62);
	var emptyFunction = __webpack_require__(60);
	var getEventTarget = __webpack_require__(149);

	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var EventInterface = {
	  type: null,
	  target: getEventTarget,
	  // currentTarget is set when dispatching; no use in copying it here
	  currentTarget: emptyFunction.thatReturnsNull,
	  eventPhase: null,
	  bubbles: null,
	  cancelable: null,
	  timeStamp: function(event) {
	    return event.timeStamp || Date.now();
	  },
	  defaultPrevented: null,
	  isTrusted: null
	};

	/**
	 * Synthetic events are dispatched by event plugins, typically in response to a
	 * top-level event delegation handler.
	 *
	 * These systems should generally use pooling to reduce the frequency of garbage
	 * collection. The system should check `isPersistent` to determine whether the
	 * event should be released into the pool after being dispatched. Users that
	 * need a persisted event should invoke `persist`.
	 *
	 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
	 * normalizing browser quirks. Subclasses do not necessarily have to implement a
	 * DOM interface; custom application-specific events can also subclass this.
	 *
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 */
	function SyntheticEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  this.dispatchConfig = dispatchConfig;
	  this.dispatchMarker = dispatchMarker;
	  this.nativeEvent = nativeEvent;

	  var Interface = this.constructor.Interface;
	  for (var propName in Interface) {
	    if (!Interface.hasOwnProperty(propName)) {
	      continue;
	    }
	    var normalize = Interface[propName];
	    if (normalize) {
	      this[propName] = normalize(nativeEvent);
	    } else {
	      this[propName] = nativeEvent[propName];
	    }
	  }

	  var defaultPrevented = nativeEvent.defaultPrevented != null ?
	    nativeEvent.defaultPrevented :
	    nativeEvent.returnValue === false;
	  if (defaultPrevented) {
	    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
	  } else {
	    this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
	  }
	  this.isPropagationStopped = emptyFunction.thatReturnsFalse;
	}

	assign(SyntheticEvent.prototype, {

	  preventDefault: function() {
	    this.defaultPrevented = true;
	    var event = this.nativeEvent;
	    if (event.preventDefault) {
	      event.preventDefault();
	    } else {
	      event.returnValue = false;
	    }
	    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
	  },

	  stopPropagation: function() {
	    var event = this.nativeEvent;
	    if (event.stopPropagation) {
	      event.stopPropagation();
	    } else {
	      event.cancelBubble = true;
	    }
	    this.isPropagationStopped = emptyFunction.thatReturnsTrue;
	  },

	  /**
	   * We release all dispatched `SyntheticEvent`s after each event loop, adding
	   * them back into the pool. This allows a way to hold onto a reference that
	   * won't be added back into the pool.
	   */
	  persist: function() {
	    this.isPersistent = emptyFunction.thatReturnsTrue;
	  },

	  /**
	   * Checks if this event should be released back into the pool.
	   *
	   * @return {boolean} True if this should not be released, false otherwise.
	   */
	  isPersistent: emptyFunction.thatReturnsFalse,

	  /**
	   * `PooledClass` looks for `destructor` on each instance it releases.
	   */
	  destructor: function() {
	    var Interface = this.constructor.Interface;
	    for (var propName in Interface) {
	      this[propName] = null;
	    }
	    this.dispatchConfig = null;
	    this.dispatchMarker = null;
	    this.nativeEvent = null;
	  }

	});

	SyntheticEvent.Interface = EventInterface;

	/**
	 * Helper to reduce boilerplate when creating subclasses.
	 *
	 * @param {function} Class
	 * @param {?object} Interface
	 */
	SyntheticEvent.augmentClass = function(Class, Interface) {
	  var Super = this;

	  var prototype = Object.create(Super.prototype);
	  assign(prototype, Class.prototype);
	  Class.prototype = prototype;
	  Class.prototype.constructor = Class;

	  Class.Interface = assign({}, Super.Interface, Interface);
	  Class.augmentClass = Super.augmentClass;

	  PooledClass.addPoolingTo(Class, PooledClass.threeArgumentPooler);
	};

	PooledClass.addPoolingTo(SyntheticEvent, PooledClass.threeArgumentPooler);

	module.exports = SyntheticEvent;


/***/ },
/* 149 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getEventTarget
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * Gets the target node from a native browser event by accounting for
	 * inconsistencies in browser DOM APIs.
	 *
	 * @param {object} nativeEvent Native browser event.
	 * @return {DOMEventTarget} Target node.
	 */
	function getEventTarget(nativeEvent) {
	  var target = nativeEvent.target || nativeEvent.srcElement || window;
	  // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
	  // @see http://www.quirksmode.org/js/events_properties.html
	  return target.nodeType === 3 ? target.parentNode : target;
	}

	module.exports = getEventTarget;


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticInputEvent
	 * @typechecks static-only
	 */

	'use strict';

	var SyntheticEvent = __webpack_require__(148);

	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/2013/WD-DOM-Level-3-Events-20131105
	 *      /#events-inputevents
	 */
	var InputEventInterface = {
	  data: null
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticInputEvent(
	  dispatchConfig,
	  dispatchMarker,
	  nativeEvent) {
	  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticEvent.augmentClass(
	  SyntheticInputEvent,
	  InputEventInterface
	);

	module.exports = SyntheticInputEvent;


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ChangeEventPlugin
	 */

	'use strict';

	var EventConstants = __webpack_require__(52);
	var EventPluginHub = __webpack_require__(116);
	var EventPropagators = __webpack_require__(144);
	var ExecutionEnvironment = __webpack_require__(100);
	var ReactUpdates = __webpack_require__(73);
	var SyntheticEvent = __webpack_require__(148);

	var isEventSupported = __webpack_require__(122);
	var isTextInputElement = __webpack_require__(152);
	var keyOf = __webpack_require__(86);

	var topLevelTypes = EventConstants.topLevelTypes;

	var eventTypes = {
	  change: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onChange: null}),
	      captured: keyOf({onChangeCapture: null})
	    },
	    dependencies: [
	      topLevelTypes.topBlur,
	      topLevelTypes.topChange,
	      topLevelTypes.topClick,
	      topLevelTypes.topFocus,
	      topLevelTypes.topInput,
	      topLevelTypes.topKeyDown,
	      topLevelTypes.topKeyUp,
	      topLevelTypes.topSelectionChange
	    ]
	  }
	};

	/**
	 * For IE shims
	 */
	var activeElement = null;
	var activeElementID = null;
	var activeElementValue = null;
	var activeElementValueProp = null;

	/**
	 * SECTION: handle `change` event
	 */
	function shouldUseChangeEvent(elem) {
	  return (
	    elem.nodeName === 'SELECT' ||
	    (elem.nodeName === 'INPUT' && elem.type === 'file')
	  );
	}

	var doesChangeEventBubble = false;
	if (ExecutionEnvironment.canUseDOM) {
	  // See `handleChange` comment below
	  doesChangeEventBubble = isEventSupported('change') && (
	    (!('documentMode' in document) || document.documentMode > 8)
	  );
	}

	function manualDispatchChangeEvent(nativeEvent) {
	  var event = SyntheticEvent.getPooled(
	    eventTypes.change,
	    activeElementID,
	    nativeEvent
	  );
	  EventPropagators.accumulateTwoPhaseDispatches(event);

	  // If change and propertychange bubbled, we'd just bind to it like all the
	  // other events and have it go through ReactBrowserEventEmitter. Since it
	  // doesn't, we manually listen for the events and so we have to enqueue and
	  // process the abstract event manually.
	  //
	  // Batching is necessary here in order to ensure that all event handlers run
	  // before the next rerender (including event handlers attached to ancestor
	  // elements instead of directly on the input). Without this, controlled
	  // components don't work properly in conjunction with event bubbling because
	  // the component is rerendered and the value reverted before all the event
	  // handlers can run. See https://github.com/facebook/react/issues/708.
	  ReactUpdates.batchedUpdates(runEventInBatch, event);
	}

	function runEventInBatch(event) {
	  EventPluginHub.enqueueEvents(event);
	  EventPluginHub.processEventQueue();
	}

	function startWatchingForChangeEventIE8(target, targetID) {
	  activeElement = target;
	  activeElementID = targetID;
	  activeElement.attachEvent('onchange', manualDispatchChangeEvent);
	}

	function stopWatchingForChangeEventIE8() {
	  if (!activeElement) {
	    return;
	  }
	  activeElement.detachEvent('onchange', manualDispatchChangeEvent);
	  activeElement = null;
	  activeElementID = null;
	}

	function getTargetIDForChangeEvent(
	    topLevelType,
	    topLevelTarget,
	    topLevelTargetID) {
	  if (topLevelType === topLevelTypes.topChange) {
	    return topLevelTargetID;
	  }
	}
	function handleEventsForChangeEventIE8(
	    topLevelType,
	    topLevelTarget,
	    topLevelTargetID) {
	  if (topLevelType === topLevelTypes.topFocus) {
	    // stopWatching() should be a noop here but we call it just in case we
	    // missed a blur event somehow.
	    stopWatchingForChangeEventIE8();
	    startWatchingForChangeEventIE8(topLevelTarget, topLevelTargetID);
	  } else if (topLevelType === topLevelTypes.topBlur) {
	    stopWatchingForChangeEventIE8();
	  }
	}


	/**
	 * SECTION: handle `input` event
	 */
	var isInputEventSupported = false;
	if (ExecutionEnvironment.canUseDOM) {
	  // IE9 claims to support the input event but fails to trigger it when
	  // deleting text, so we ignore its input events
	  isInputEventSupported = isEventSupported('input') && (
	    (!('documentMode' in document) || document.documentMode > 9)
	  );
	}

	/**
	 * (For old IE.) Replacement getter/setter for the `value` property that gets
	 * set on the active element.
	 */
	var newValueProp =  {
	  get: function() {
	    return activeElementValueProp.get.call(this);
	  },
	  set: function(val) {
	    // Cast to a string so we can do equality checks.
	    activeElementValue = '' + val;
	    activeElementValueProp.set.call(this, val);
	  }
	};

	/**
	 * (For old IE.) Starts tracking propertychange events on the passed-in element
	 * and override the value property so that we can distinguish user events from
	 * value changes in JS.
	 */
	function startWatchingForValueChange(target, targetID) {
	  activeElement = target;
	  activeElementID = targetID;
	  activeElementValue = target.value;
	  activeElementValueProp = Object.getOwnPropertyDescriptor(
	    target.constructor.prototype,
	    'value'
	  );

	  Object.defineProperty(activeElement, 'value', newValueProp);
	  activeElement.attachEvent('onpropertychange', handlePropertyChange);
	}

	/**
	 * (For old IE.) Removes the event listeners from the currently-tracked element,
	 * if any exists.
	 */
	function stopWatchingForValueChange() {
	  if (!activeElement) {
	    return;
	  }

	  // delete restores the original property definition
	  delete activeElement.value;
	  activeElement.detachEvent('onpropertychange', handlePropertyChange);

	  activeElement = null;
	  activeElementID = null;
	  activeElementValue = null;
	  activeElementValueProp = null;
	}

	/**
	 * (For old IE.) Handles a propertychange event, sending a `change` event if
	 * the value of the active element has changed.
	 */
	function handlePropertyChange(nativeEvent) {
	  if (nativeEvent.propertyName !== 'value') {
	    return;
	  }
	  var value = nativeEvent.srcElement.value;
	  if (value === activeElementValue) {
	    return;
	  }
	  activeElementValue = value;

	  manualDispatchChangeEvent(nativeEvent);
	}

	/**
	 * If a `change` event should be fired, returns the target's ID.
	 */
	function getTargetIDForInputEvent(
	    topLevelType,
	    topLevelTarget,
	    topLevelTargetID) {
	  if (topLevelType === topLevelTypes.topInput) {
	    // In modern browsers (i.e., not IE8 or IE9), the input event is exactly
	    // what we want so fall through here and trigger an abstract event
	    return topLevelTargetID;
	  }
	}

	// For IE8 and IE9.
	function handleEventsForInputEventIE(
	    topLevelType,
	    topLevelTarget,
	    topLevelTargetID) {
	  if (topLevelType === topLevelTypes.topFocus) {
	    // In IE8, we can capture almost all .value changes by adding a
	    // propertychange handler and looking for events with propertyName
	    // equal to 'value'
	    // In IE9, propertychange fires for most input events but is buggy and
	    // doesn't fire when text is deleted, but conveniently, selectionchange
	    // appears to fire in all of the remaining cases so we catch those and
	    // forward the event if the value has changed
	    // In either case, we don't want to call the event handler if the value
	    // is changed from JS so we redefine a setter for `.value` that updates
	    // our activeElementValue variable, allowing us to ignore those changes
	    //
	    // stopWatching() should be a noop here but we call it just in case we
	    // missed a blur event somehow.
	    stopWatchingForValueChange();
	    startWatchingForValueChange(topLevelTarget, topLevelTargetID);
	  } else if (topLevelType === topLevelTypes.topBlur) {
	    stopWatchingForValueChange();
	  }
	}

	// For IE8 and IE9.
	function getTargetIDForInputEventIE(
	    topLevelType,
	    topLevelTarget,
	    topLevelTargetID) {
	  if (topLevelType === topLevelTypes.topSelectionChange ||
	      topLevelType === topLevelTypes.topKeyUp ||
	      topLevelType === topLevelTypes.topKeyDown) {
	    // On the selectionchange event, the target is just document which isn't
	    // helpful for us so just check activeElement instead.
	    //
	    // 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
	    // propertychange on the first input event after setting `value` from a
	    // script and fires only keydown, keypress, keyup. Catching keyup usually
	    // gets it and catching keydown lets us fire an event for the first
	    // keystroke if user does a key repeat (it'll be a little delayed: right
	    // before the second keystroke). Other input methods (e.g., paste) seem to
	    // fire selectionchange normally.
	    if (activeElement && activeElement.value !== activeElementValue) {
	      activeElementValue = activeElement.value;
	      return activeElementID;
	    }
	  }
	}


	/**
	 * SECTION: handle `click` event
	 */
	function shouldUseClickEvent(elem) {
	  // Use the `click` event to detect changes to checkbox and radio inputs.
	  // This approach works across all browsers, whereas `change` does not fire
	  // until `blur` in IE8.
	  return (
	    elem.nodeName === 'INPUT' &&
	    (elem.type === 'checkbox' || elem.type === 'radio')
	  );
	}

	function getTargetIDForClickEvent(
	    topLevelType,
	    topLevelTarget,
	    topLevelTargetID) {
	  if (topLevelType === topLevelTypes.topClick) {
	    return topLevelTargetID;
	  }
	}

	/**
	 * This plugin creates an `onChange` event that normalizes change events
	 * across form elements. This event fires at a time when it's possible to
	 * change the element's value without seeing a flicker.
	 *
	 * Supported elements are:
	 * - input (see `isTextInputElement`)
	 * - textarea
	 * - select
	 */
	var ChangeEventPlugin = {

	  eventTypes: eventTypes,

	  /**
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {

	    var getTargetIDFunc, handleEventFunc;
	    if (shouldUseChangeEvent(topLevelTarget)) {
	      if (doesChangeEventBubble) {
	        getTargetIDFunc = getTargetIDForChangeEvent;
	      } else {
	        handleEventFunc = handleEventsForChangeEventIE8;
	      }
	    } else if (isTextInputElement(topLevelTarget)) {
	      if (isInputEventSupported) {
	        getTargetIDFunc = getTargetIDForInputEvent;
	      } else {
	        getTargetIDFunc = getTargetIDForInputEventIE;
	        handleEventFunc = handleEventsForInputEventIE;
	      }
	    } else if (shouldUseClickEvent(topLevelTarget)) {
	      getTargetIDFunc = getTargetIDForClickEvent;
	    }

	    if (getTargetIDFunc) {
	      var targetID = getTargetIDFunc(
	        topLevelType,
	        topLevelTarget,
	        topLevelTargetID
	      );
	      if (targetID) {
	        var event = SyntheticEvent.getPooled(
	          eventTypes.change,
	          targetID,
	          nativeEvent
	        );
	        EventPropagators.accumulateTwoPhaseDispatches(event);
	        return event;
	      }
	    }

	    if (handleEventFunc) {
	      handleEventFunc(
	        topLevelType,
	        topLevelTarget,
	        topLevelTargetID
	      );
	    }
	  }

	};

	module.exports = ChangeEventPlugin;


/***/ },
/* 152 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule isTextInputElement
	 */

	'use strict';

	/**
	 * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
	 */
	var supportedInputTypes = {
	  'color': true,
	  'date': true,
	  'datetime': true,
	  'datetime-local': true,
	  'email': true,
	  'month': true,
	  'number': true,
	  'password': true,
	  'range': true,
	  'search': true,
	  'tel': true,
	  'text': true,
	  'time': true,
	  'url': true,
	  'week': true
	};

	function isTextInputElement(elem) {
	  return elem && (
	    (elem.nodeName === 'INPUT' && supportedInputTypes[elem.type] || elem.nodeName === 'TEXTAREA')
	  );
	}

	module.exports = isTextInputElement;


/***/ },
/* 153 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ClientReactRootIndex
	 * @typechecks
	 */

	'use strict';

	var nextReactRootIndex = 0;

	var ClientReactRootIndex = {
	  createReactRootIndex: function() {
	    return nextReactRootIndex++;
	  }
	};

	module.exports = ClientReactRootIndex;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule DefaultEventPluginOrder
	 */

	'use strict';

	var keyOf = __webpack_require__(86);

	/**
	 * Module that is injectable into `EventPluginHub`, that specifies a
	 * deterministic ordering of `EventPlugin`s. A convenient way to reason about
	 * plugins, without having to package every one of them. This is better than
	 * having plugins be ordered in the same order that they are injected because
	 * that ordering would be influenced by the packaging order.
	 * `ResponderEventPlugin` must occur before `SimpleEventPlugin` so that
	 * preventing default on events is convenient in `SimpleEventPlugin` handlers.
	 */
	var DefaultEventPluginOrder = [
	  keyOf({ResponderEventPlugin: null}),
	  keyOf({SimpleEventPlugin: null}),
	  keyOf({TapEventPlugin: null}),
	  keyOf({EnterLeaveEventPlugin: null}),
	  keyOf({ChangeEventPlugin: null}),
	  keyOf({SelectEventPlugin: null}),
	  keyOf({BeforeInputEventPlugin: null}),
	  keyOf({AnalyticsEventPlugin: null}),
	  keyOf({MobileSafariClickEventPlugin: null})
	];

	module.exports = DefaultEventPluginOrder;


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule EnterLeaveEventPlugin
	 * @typechecks static-only
	 */

	'use strict';

	var EventConstants = __webpack_require__(52);
	var EventPropagators = __webpack_require__(144);
	var SyntheticMouseEvent = __webpack_require__(156);

	var ReactMount = __webpack_require__(114);
	var keyOf = __webpack_require__(86);

	var topLevelTypes = EventConstants.topLevelTypes;
	var getFirstReactDOM = ReactMount.getFirstReactDOM;

	var eventTypes = {
	  mouseEnter: {
	    registrationName: keyOf({onMouseEnter: null}),
	    dependencies: [
	      topLevelTypes.topMouseOut,
	      topLevelTypes.topMouseOver
	    ]
	  },
	  mouseLeave: {
	    registrationName: keyOf({onMouseLeave: null}),
	    dependencies: [
	      topLevelTypes.topMouseOut,
	      topLevelTypes.topMouseOver
	    ]
	  }
	};

	var extractedEvents = [null, null];

	var EnterLeaveEventPlugin = {

	  eventTypes: eventTypes,

	  /**
	   * For almost every interaction we care about, there will be both a top-level
	   * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
	   * we do not extract duplicate events. However, moving the mouse into the
	   * browser from outside will not fire a `mouseout` event. In this case, we use
	   * the `mouseover` top-level event.
	   *
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	    if (topLevelType === topLevelTypes.topMouseOver &&
	        (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
	      return null;
	    }
	    if (topLevelType !== topLevelTypes.topMouseOut &&
	        topLevelType !== topLevelTypes.topMouseOver) {
	      // Must not be a mouse in or mouse out - ignoring.
	      return null;
	    }

	    var win;
	    if (topLevelTarget.window === topLevelTarget) {
	      // `topLevelTarget` is probably a window object.
	      win = topLevelTarget;
	    } else {
	      // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
	      var doc = topLevelTarget.ownerDocument;
	      if (doc) {
	        win = doc.defaultView || doc.parentWindow;
	      } else {
	        win = window;
	      }
	    }

	    var from, to;
	    if (topLevelType === topLevelTypes.topMouseOut) {
	      from = topLevelTarget;
	      to =
	        getFirstReactDOM(nativeEvent.relatedTarget || nativeEvent.toElement) ||
	        win;
	    } else {
	      from = win;
	      to = topLevelTarget;
	    }

	    if (from === to) {
	      // Nothing pertains to our managed components.
	      return null;
	    }

	    var fromID = from ? ReactMount.getID(from) : '';
	    var toID = to ? ReactMount.getID(to) : '';

	    var leave = SyntheticMouseEvent.getPooled(
	      eventTypes.mouseLeave,
	      fromID,
	      nativeEvent
	    );
	    leave.type = 'mouseleave';
	    leave.target = from;
	    leave.relatedTarget = to;

	    var enter = SyntheticMouseEvent.getPooled(
	      eventTypes.mouseEnter,
	      toID,
	      nativeEvent
	    );
	    enter.type = 'mouseenter';
	    enter.target = to;
	    enter.relatedTarget = from;

	    EventPropagators.accumulateEnterLeaveDispatches(leave, enter, fromID, toID);

	    extractedEvents[0] = leave;
	    extractedEvents[1] = enter;

	    return extractedEvents;
	  }

	};

	module.exports = EnterLeaveEventPlugin;


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticMouseEvent
	 * @typechecks static-only
	 */

	'use strict';

	var SyntheticUIEvent = __webpack_require__(157);
	var ViewportMetrics = __webpack_require__(121);

	var getEventModifierState = __webpack_require__(158);

	/**
	 * @interface MouseEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var MouseEventInterface = {
	  screenX: null,
	  screenY: null,
	  clientX: null,
	  clientY: null,
	  ctrlKey: null,
	  shiftKey: null,
	  altKey: null,
	  metaKey: null,
	  getModifierState: getEventModifierState,
	  button: function(event) {
	    // Webkit, Firefox, IE9+
	    // which:  1 2 3
	    // button: 0 1 2 (standard)
	    var button = event.button;
	    if ('which' in event) {
	      return button;
	    }
	    // IE<9
	    // which:  undefined
	    // button: 0 0 0
	    // button: 1 4 2 (onmouseup)
	    return button === 2 ? 2 : button === 4 ? 1 : 0;
	  },
	  buttons: null,
	  relatedTarget: function(event) {
	    return event.relatedTarget || (
	      ((event.fromElement === event.srcElement ? event.toElement : event.fromElement))
	    );
	  },
	  // "Proprietary" Interface.
	  pageX: function(event) {
	    return 'pageX' in event ?
	      event.pageX :
	      event.clientX + ViewportMetrics.currentScrollLeft;
	  },
	  pageY: function(event) {
	    return 'pageY' in event ?
	      event.pageY :
	      event.clientY + ViewportMetrics.currentScrollTop;
	  }
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticMouseEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticUIEvent.augmentClass(SyntheticMouseEvent, MouseEventInterface);

	module.exports = SyntheticMouseEvent;


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticUIEvent
	 * @typechecks static-only
	 */

	'use strict';

	var SyntheticEvent = __webpack_require__(148);

	var getEventTarget = __webpack_require__(149);

	/**
	 * @interface UIEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var UIEventInterface = {
	  view: function(event) {
	    if (event.view) {
	      return event.view;
	    }

	    var target = getEventTarget(event);
	    if (target != null && target.window === target) {
	      // target is a window object
	      return target;
	    }

	    var doc = target.ownerDocument;
	    // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
	    if (doc) {
	      return doc.defaultView || doc.parentWindow;
	    } else {
	      return window;
	    }
	  },
	  detail: function(event) {
	    return event.detail || 0;
	  }
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticEvent}
	 */
	function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticEvent.augmentClass(SyntheticUIEvent, UIEventInterface);

	module.exports = SyntheticUIEvent;


/***/ },
/* 158 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getEventModifierState
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * Translation from modifier key to the associated property in the event.
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/#keys-Modifiers
	 */

	var modifierKeyToProp = {
	  'Alt': 'altKey',
	  'Control': 'ctrlKey',
	  'Meta': 'metaKey',
	  'Shift': 'shiftKey'
	};

	// IE8 does not implement getModifierState so we simply map it to the only
	// modifier keys exposed by the event itself, does not support Lock-keys.
	// Currently, all major browsers except Chrome seems to support Lock-keys.
	function modifierStateGetter(keyArg) {
	  /*jshint validthis:true */
	  var syntheticEvent = this;
	  var nativeEvent = syntheticEvent.nativeEvent;
	  if (nativeEvent.getModifierState) {
	    return nativeEvent.getModifierState(keyArg);
	  }
	  var keyProp = modifierKeyToProp[keyArg];
	  return keyProp ? !!nativeEvent[keyProp] : false;
	}

	function getEventModifierState(nativeEvent) {
	  return modifierStateGetter;
	}

	module.exports = getEventModifierState;


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule HTMLDOMPropertyConfig
	 */

	/*jslint bitwise: true*/

	'use strict';

	var DOMProperty = __webpack_require__(91);
	var ExecutionEnvironment = __webpack_require__(100);

	var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
	var MUST_USE_PROPERTY = DOMProperty.injection.MUST_USE_PROPERTY;
	var HAS_BOOLEAN_VALUE = DOMProperty.injection.HAS_BOOLEAN_VALUE;
	var HAS_SIDE_EFFECTS = DOMProperty.injection.HAS_SIDE_EFFECTS;
	var HAS_NUMERIC_VALUE = DOMProperty.injection.HAS_NUMERIC_VALUE;
	var HAS_POSITIVE_NUMERIC_VALUE =
	  DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;
	var HAS_OVERLOADED_BOOLEAN_VALUE =
	  DOMProperty.injection.HAS_OVERLOADED_BOOLEAN_VALUE;

	var hasSVG;
	if (ExecutionEnvironment.canUseDOM) {
	  var implementation = document.implementation;
	  hasSVG = (
	    implementation &&
	    implementation.hasFeature &&
	    implementation.hasFeature(
	      'http://www.w3.org/TR/SVG11/feature#BasicStructure',
	      '1.1'
	    )
	  );
	}


	var HTMLDOMPropertyConfig = {
	  isCustomAttribute: RegExp.prototype.test.bind(
	    /^(data|aria)-[a-z_][a-z\d_.\-]*$/
	  ),
	  Properties: {
	    /**
	     * Standard Properties
	     */
	    accept: null,
	    acceptCharset: null,
	    accessKey: null,
	    action: null,
	    allowFullScreen: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
	    allowTransparency: MUST_USE_ATTRIBUTE,
	    alt: null,
	    async: HAS_BOOLEAN_VALUE,
	    autoComplete: null,
	    // autoFocus is polyfilled/normalized by AutoFocusMixin
	    // autoFocus: HAS_BOOLEAN_VALUE,
	    autoPlay: HAS_BOOLEAN_VALUE,
	    cellPadding: null,
	    cellSpacing: null,
	    charSet: MUST_USE_ATTRIBUTE,
	    checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    classID: MUST_USE_ATTRIBUTE,
	    // To set className on SVG elements, it's necessary to use .setAttribute;
	    // this works on HTML elements too in all browsers except IE8. Conveniently,
	    // IE8 doesn't support SVG and so we can simply use the attribute in
	    // browsers that support SVG and the property in browsers that don't,
	    // regardless of whether the element is HTML or SVG.
	    className: hasSVG ? MUST_USE_ATTRIBUTE : MUST_USE_PROPERTY,
	    cols: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
	    colSpan: null,
	    content: null,
	    contentEditable: null,
	    contextMenu: MUST_USE_ATTRIBUTE,
	    controls: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    coords: null,
	    crossOrigin: null,
	    data: null, // For `<object />` acts as `src`.
	    dateTime: MUST_USE_ATTRIBUTE,
	    defer: HAS_BOOLEAN_VALUE,
	    dir: null,
	    disabled: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
	    download: HAS_OVERLOADED_BOOLEAN_VALUE,
	    draggable: null,
	    encType: null,
	    form: MUST_USE_ATTRIBUTE,
	    formAction: MUST_USE_ATTRIBUTE,
	    formEncType: MUST_USE_ATTRIBUTE,
	    formMethod: MUST_USE_ATTRIBUTE,
	    formNoValidate: HAS_BOOLEAN_VALUE,
	    formTarget: MUST_USE_ATTRIBUTE,
	    frameBorder: MUST_USE_ATTRIBUTE,
	    headers: null,
	    height: MUST_USE_ATTRIBUTE,
	    hidden: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
	    high: null,
	    href: null,
	    hrefLang: null,
	    htmlFor: null,
	    httpEquiv: null,
	    icon: null,
	    id: MUST_USE_PROPERTY,
	    label: null,
	    lang: null,
	    list: MUST_USE_ATTRIBUTE,
	    loop: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    low: null,
	    manifest: MUST_USE_ATTRIBUTE,
	    marginHeight: null,
	    marginWidth: null,
	    max: null,
	    maxLength: MUST_USE_ATTRIBUTE,
	    media: MUST_USE_ATTRIBUTE,
	    mediaGroup: null,
	    method: null,
	    min: null,
	    multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    name: null,
	    noValidate: HAS_BOOLEAN_VALUE,
	    open: HAS_BOOLEAN_VALUE,
	    optimum: null,
	    pattern: null,
	    placeholder: null,
	    poster: null,
	    preload: null,
	    radioGroup: null,
	    readOnly: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    rel: null,
	    required: HAS_BOOLEAN_VALUE,
	    role: MUST_USE_ATTRIBUTE,
	    rows: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
	    rowSpan: null,
	    sandbox: null,
	    scope: null,
	    scoped: HAS_BOOLEAN_VALUE,
	    scrolling: null,
	    seamless: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
	    selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
	    shape: null,
	    size: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
	    sizes: MUST_USE_ATTRIBUTE,
	    span: HAS_POSITIVE_NUMERIC_VALUE,
	    spellCheck: null,
	    src: null,
	    srcDoc: MUST_USE_PROPERTY,
	    srcSet: MUST_USE_ATTRIBUTE,
	    start: HAS_NUMERIC_VALUE,
	    step: null,
	    style: null,
	    tabIndex: null,
	    target: null,
	    title: null,
	    type: null,
	    useMap: null,
	    value: MUST_USE_PROPERTY | HAS_SIDE_EFFECTS,
	    width: MUST_USE_ATTRIBUTE,
	    wmode: MUST_USE_ATTRIBUTE,

	    /**
	     * Non-standard Properties
	     */
	    // autoCapitalize and autoCorrect are supported in Mobile Safari for
	    // keyboard hints.
	    autoCapitalize: null,
	    autoCorrect: null,
	    // itemProp, itemScope, itemType are for
	    // Microdata support. See http://schema.org/docs/gs.html
	    itemProp: MUST_USE_ATTRIBUTE,
	    itemScope: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
	    itemType: MUST_USE_ATTRIBUTE,
	    // itemID and itemRef are for Microdata support as well but
	    // only specified in the the WHATWG spec document. See
	    // https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
	    itemID: MUST_USE_ATTRIBUTE,
	    itemRef: MUST_USE_ATTRIBUTE,
	    // property is supported for OpenGraph in meta tags.
	    property: null,
	    // IE-only attribute that controls focus behavior
	    unselectable: MUST_USE_ATTRIBUTE
	  },
	  DOMAttributeNames: {
	    acceptCharset: 'accept-charset',
	    className: 'class',
	    htmlFor: 'for',
	    httpEquiv: 'http-equiv'
	  },
	  DOMPropertyNames: {
	    autoCapitalize: 'autocapitalize',
	    autoComplete: 'autocomplete',
	    autoCorrect: 'autocorrect',
	    autoFocus: 'autofocus',
	    autoPlay: 'autoplay',
	    // `encoding` is equivalent to `enctype`, IE8 lacks an `enctype` setter.
	    // http://www.w3.org/TR/html5/forms.html#dom-fs-encoding
	    encType: 'encoding',
	    hrefLang: 'hreflang',
	    radioGroup: 'radiogroup',
	    spellCheck: 'spellcheck',
	    srcDoc: 'srcdoc',
	    srcSet: 'srcset'
	  }
	};

	module.exports = HTMLDOMPropertyConfig;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule MobileSafariClickEventPlugin
	 * @typechecks static-only
	 */

	'use strict';

	var EventConstants = __webpack_require__(52);

	var emptyFunction = __webpack_require__(60);

	var topLevelTypes = EventConstants.topLevelTypes;

	/**
	 * Mobile Safari does not fire properly bubble click events on non-interactive
	 * elements, which means delegated click listeners do not fire. The workaround
	 * for this bug involves attaching an empty click listener on the target node.
	 *
	 * This particular plugin works around the bug by attaching an empty click
	 * listener on `touchstart` (which does fire on every element).
	 */
	var MobileSafariClickEventPlugin = {

	  eventTypes: null,

	  /**
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	    if (topLevelType === topLevelTypes.topTouchStart) {
	      var target = nativeEvent.target;
	      if (target && !target.onclick) {
	        target.onclick = emptyFunction;
	      }
	    }
	  }

	};

	module.exports = MobileSafariClickEventPlugin;


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDefaultBatchingStrategy
	 */

	'use strict';

	var ReactUpdates = __webpack_require__(73);
	var Transaction = __webpack_require__(83);

	var assign = __webpack_require__(62);
	var emptyFunction = __webpack_require__(60);

	var RESET_BATCHED_UPDATES = {
	  initialize: emptyFunction,
	  close: function() {
	    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
	  }
	};

	var FLUSH_BATCHED_UPDATES = {
	  initialize: emptyFunction,
	  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
	};

	var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];

	function ReactDefaultBatchingStrategyTransaction() {
	  this.reinitializeTransaction();
	}

	assign(
	  ReactDefaultBatchingStrategyTransaction.prototype,
	  Transaction.Mixin,
	  {
	    getTransactionWrappers: function() {
	      return TRANSACTION_WRAPPERS;
	    }
	  }
	);

	var transaction = new ReactDefaultBatchingStrategyTransaction();

	var ReactDefaultBatchingStrategy = {
	  isBatchingUpdates: false,

	  /**
	   * Call the provided function in a context within which calls to `setState`
	   * and friends are batched such that components aren't updated unnecessarily.
	   */
	  batchedUpdates: function(callback, a, b, c, d) {
	    var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;

	    ReactDefaultBatchingStrategy.isBatchingUpdates = true;

	    // The code is written this way to avoid extra allocations
	    if (alreadyBatchingUpdates) {
	      callback(a, b, c, d);
	    } else {
	      transaction.perform(callback, null, a, b, c, d);
	    }
	  }
	};

	module.exports = ReactDefaultBatchingStrategy;


/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMButton
	 */

	'use strict';

	var AutoFocusMixin = __webpack_require__(163);
	var ReactBrowserComponentMixin = __webpack_require__(141);
	var ReactClass = __webpack_require__(84);
	var ReactElement = __webpack_require__(58);

	var keyMirror = __webpack_require__(53);

	var button = ReactElement.createFactory('button');

	var mouseListenerNames = keyMirror({
	  onClick: true,
	  onDoubleClick: true,
	  onMouseDown: true,
	  onMouseMove: true,
	  onMouseUp: true,
	  onClickCapture: true,
	  onDoubleClickCapture: true,
	  onMouseDownCapture: true,
	  onMouseMoveCapture: true,
	  onMouseUpCapture: true
	});

	/**
	 * Implements a <button> native component that does not receive mouse events
	 * when `disabled` is set.
	 */
	var ReactDOMButton = ReactClass.createClass({
	  displayName: 'ReactDOMButton',
	  tagName: 'BUTTON',

	  mixins: [AutoFocusMixin, ReactBrowserComponentMixin],

	  render: function() {
	    var props = {};

	    // Copy the props; except the mouse listeners if we're disabled
	    for (var key in this.props) {
	      if (this.props.hasOwnProperty(key) &&
	          (!this.props.disabled || !mouseListenerNames[key])) {
	        props[key] = this.props[key];
	      }
	    }

	    return button(props, this.props.children);
	  }

	});

	module.exports = ReactDOMButton;


/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule AutoFocusMixin
	 * @typechecks static-only
	 */

	'use strict';

	var focusNode = __webpack_require__(164);

	var AutoFocusMixin = {
	  componentDidMount: function() {
	    if (this.props.autoFocus) {
	      focusNode(this.getDOMNode());
	    }
	  }
	};

	module.exports = AutoFocusMixin;


/***/ },
/* 164 */
/***/ function(module, exports) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule focusNode
	 */

	"use strict";

	/**
	 * @param {DOMElement} node input/textarea to focus
	 */
	function focusNode(node) {
	  // IE8 can throw "Can't move focus to the control because it is invisible,
	  // not enabled, or of a type that does not accept the focus." for all kinds of
	  // reasons that are too expensive and fragile to test.
	  try {
	    node.focus();
	  } catch(e) {
	  }
	}

	module.exports = focusNode;


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMForm
	 */

	'use strict';

	var EventConstants = __webpack_require__(52);
	var LocalEventTrapMixin = __webpack_require__(140);
	var ReactBrowserComponentMixin = __webpack_require__(141);
	var ReactClass = __webpack_require__(84);
	var ReactElement = __webpack_require__(58);

	var form = ReactElement.createFactory('form');

	/**
	 * Since onSubmit doesn't bubble OR capture on the top level in IE8, we need
	 * to capture it on the <form> element itself. There are lots of hacks we could
	 * do to accomplish this, but the most reliable is to make <form> a
	 * composite component and use `componentDidMount` to attach the event handlers.
	 */
	var ReactDOMForm = ReactClass.createClass({
	  displayName: 'ReactDOMForm',
	  tagName: 'FORM',

	  mixins: [ReactBrowserComponentMixin, LocalEventTrapMixin],

	  render: function() {
	    // TODO: Instead of using `ReactDOM` directly, we should use JSX. However,
	    // `jshint` fails to parse JSX so in order for linting to work in the open
	    // source repo, we need to just use `ReactDOM.form`.
	    return form(this.props);
	  },

	  componentDidMount: function() {
	    this.trapBubbledEvent(EventConstants.topLevelTypes.topReset, 'reset');
	    this.trapBubbledEvent(EventConstants.topLevelTypes.topSubmit, 'submit');
	  }
	});

	module.exports = ReactDOMForm;


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMImg
	 */

	'use strict';

	var EventConstants = __webpack_require__(52);
	var LocalEventTrapMixin = __webpack_require__(140);
	var ReactBrowserComponentMixin = __webpack_require__(141);
	var ReactClass = __webpack_require__(84);
	var ReactElement = __webpack_require__(58);

	var img = ReactElement.createFactory('img');

	/**
	 * Since onLoad doesn't bubble OR capture on the top level in IE8, we need to
	 * capture it on the <img> element itself. There are lots of hacks we could do
	 * to accomplish this, but the most reliable is to make <img> a composite
	 * component and use `componentDidMount` to attach the event handlers.
	 */
	var ReactDOMImg = ReactClass.createClass({
	  displayName: 'ReactDOMImg',
	  tagName: 'IMG',

	  mixins: [ReactBrowserComponentMixin, LocalEventTrapMixin],

	  render: function() {
	    return img(this.props);
	  },

	  componentDidMount: function() {
	    this.trapBubbledEvent(EventConstants.topLevelTypes.topLoad, 'load');
	    this.trapBubbledEvent(EventConstants.topLevelTypes.topError, 'error');
	  }
	});

	module.exports = ReactDOMImg;


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMInput
	 */

	'use strict';

	var AutoFocusMixin = __webpack_require__(163);
	var DOMPropertyOperations = __webpack_require__(90);
	var LinkedValueUtils = __webpack_require__(168);
	var ReactBrowserComponentMixin = __webpack_require__(141);
	var ReactClass = __webpack_require__(84);
	var ReactElement = __webpack_require__(58);
	var ReactMount = __webpack_require__(114);
	var ReactUpdates = __webpack_require__(73);

	var assign = __webpack_require__(62);
	var invariant = __webpack_require__(54);

	var input = ReactElement.createFactory('input');

	var instancesByReactID = {};

	function forceUpdateIfMounted() {
	  /*jshint validthis:true */
	  if (this.isMounted()) {
	    this.forceUpdate();
	  }
	}

	/**
	 * Implements an <input> native component that allows setting these optional
	 * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
	 *
	 * If `checked` or `value` are not supplied (or null/undefined), user actions
	 * that affect the checked state or value will trigger updates to the element.
	 *
	 * If they are supplied (and not null/undefined), the rendered element will not
	 * trigger updates to the element. Instead, the props must change in order for
	 * the rendered element to be updated.
	 *
	 * The rendered element will be initialized as unchecked (or `defaultChecked`)
	 * with an empty value (or `defaultValue`).
	 *
	 * @see http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
	 */
	var ReactDOMInput = ReactClass.createClass({
	  displayName: 'ReactDOMInput',
	  tagName: 'INPUT',

	  mixins: [AutoFocusMixin, LinkedValueUtils.Mixin, ReactBrowserComponentMixin],

	  getInitialState: function() {
	    var defaultValue = this.props.defaultValue;
	    return {
	      initialChecked: this.props.defaultChecked || false,
	      initialValue: defaultValue != null ? defaultValue : null
	    };
	  },

	  render: function() {
	    // Clone `this.props` so we don't mutate the input.
	    var props = assign({}, this.props);

	    props.defaultChecked = null;
	    props.defaultValue = null;

	    var value = LinkedValueUtils.getValue(this);
	    props.value = value != null ? value : this.state.initialValue;

	    var checked = LinkedValueUtils.getChecked(this);
	    props.checked = checked != null ? checked : this.state.initialChecked;

	    props.onChange = this._handleChange;

	    return input(props, this.props.children);
	  },

	  componentDidMount: function() {
	    var id = ReactMount.getID(this.getDOMNode());
	    instancesByReactID[id] = this;
	  },

	  componentWillUnmount: function() {
	    var rootNode = this.getDOMNode();
	    var id = ReactMount.getID(rootNode);
	    delete instancesByReactID[id];
	  },

	  componentDidUpdate: function(prevProps, prevState, prevContext) {
	    var rootNode = this.getDOMNode();
	    if (this.props.checked != null) {
	      DOMPropertyOperations.setValueForProperty(
	        rootNode,
	        'checked',
	        this.props.checked || false
	      );
	    }

	    var value = LinkedValueUtils.getValue(this);
	    if (value != null) {
	      // Cast `value` to a string to ensure the value is set correctly. While
	      // browsers typically do this as necessary, jsdom doesn't.
	      DOMPropertyOperations.setValueForProperty(rootNode, 'value', '' + value);
	    }
	  },

	  _handleChange: function(event) {
	    var returnValue;
	    var onChange = LinkedValueUtils.getOnChange(this);
	    if (onChange) {
	      returnValue = onChange.call(this, event);
	    }
	    // Here we use asap to wait until all updates have propagated, which
	    // is important when using controlled components within layers:
	    // https://github.com/facebook/react/issues/1698
	    ReactUpdates.asap(forceUpdateIfMounted, this);

	    var name = this.props.name;
	    if (this.props.type === 'radio' && name != null) {
	      var rootNode = this.getDOMNode();
	      var queryRoot = rootNode;

	      while (queryRoot.parentNode) {
	        queryRoot = queryRoot.parentNode;
	      }

	      // If `rootNode.form` was non-null, then we could try `form.elements`,
	      // but that sometimes behaves strangely in IE8. We could also try using
	      // `form.getElementsByName`, but that will only return direct children
	      // and won't include inputs that use the HTML5 `form=` attribute. Since
	      // the input might not even be in a form, let's just use the global
	      // `querySelectorAll` to ensure we don't miss anything.
	      var group = queryRoot.querySelectorAll(
	        'input[name=' + JSON.stringify('' + name) + '][type="radio"]');

	      for (var i = 0, groupLen = group.length; i < groupLen; i++) {
	        var otherNode = group[i];
	        if (otherNode === rootNode ||
	            otherNode.form !== rootNode.form) {
	          continue;
	        }
	        var otherID = ReactMount.getID(otherNode);
	        (false ? invariant(
	          otherID,
	          'ReactDOMInput: Mixing React and non-React radio inputs with the ' +
	          'same `name` is not supported.'
	        ) : invariant(otherID));
	        var otherInstance = instancesByReactID[otherID];
	        (false ? invariant(
	          otherInstance,
	          'ReactDOMInput: Unknown radio button ID %s.',
	          otherID
	        ) : invariant(otherInstance));
	        // If this is a controlled radio button group, forcing the input that
	        // was previously checked to update will cause it to be come re-checked
	        // as appropriate.
	        ReactUpdates.asap(forceUpdateIfMounted, otherInstance);
	      }
	    }

	    return returnValue;
	  }

	});

	module.exports = ReactDOMInput;


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule LinkedValueUtils
	 * @typechecks static-only
	 */

	'use strict';

	var ReactPropTypes = __webpack_require__(169);

	var invariant = __webpack_require__(54);

	var hasReadOnlyValue = {
	  'button': true,
	  'checkbox': true,
	  'image': true,
	  'hidden': true,
	  'radio': true,
	  'reset': true,
	  'submit': true
	};

	function _assertSingleLink(input) {
	  (false ? invariant(
	    input.props.checkedLink == null || input.props.valueLink == null,
	    'Cannot provide a checkedLink and a valueLink. If you want to use ' +
	    'checkedLink, you probably don\'t want to use valueLink and vice versa.'
	  ) : invariant(input.props.checkedLink == null || input.props.valueLink == null));
	}
	function _assertValueLink(input) {
	  _assertSingleLink(input);
	  (false ? invariant(
	    input.props.value == null && input.props.onChange == null,
	    'Cannot provide a valueLink and a value or onChange event. If you want ' +
	    'to use value or onChange, you probably don\'t want to use valueLink.'
	  ) : invariant(input.props.value == null && input.props.onChange == null));
	}

	function _assertCheckedLink(input) {
	  _assertSingleLink(input);
	  (false ? invariant(
	    input.props.checked == null && input.props.onChange == null,
	    'Cannot provide a checkedLink and a checked property or onChange event. ' +
	    'If you want to use checked or onChange, you probably don\'t want to ' +
	    'use checkedLink'
	  ) : invariant(input.props.checked == null && input.props.onChange == null));
	}

	/**
	 * @param {SyntheticEvent} e change event to handle
	 */
	function _handleLinkedValueChange(e) {
	  /*jshint validthis:true */
	  this.props.valueLink.requestChange(e.target.value);
	}

	/**
	  * @param {SyntheticEvent} e change event to handle
	  */
	function _handleLinkedCheckChange(e) {
	  /*jshint validthis:true */
	  this.props.checkedLink.requestChange(e.target.checked);
	}

	/**
	 * Provide a linked `value` attribute for controlled forms. You should not use
	 * this outside of the ReactDOM controlled form components.
	 */
	var LinkedValueUtils = {
	  Mixin: {
	    propTypes: {
	      value: function(props, propName, componentName) {
	        if (!props[propName] ||
	            hasReadOnlyValue[props.type] ||
	            props.onChange ||
	            props.readOnly ||
	            props.disabled) {
	          return null;
	        }
	        return new Error(
	          'You provided a `value` prop to a form field without an ' +
	          '`onChange` handler. This will render a read-only field. If ' +
	          'the field should be mutable use `defaultValue`. Otherwise, ' +
	          'set either `onChange` or `readOnly`.'
	        );
	      },
	      checked: function(props, propName, componentName) {
	        if (!props[propName] ||
	            props.onChange ||
	            props.readOnly ||
	            props.disabled) {
	          return null;
	        }
	        return new Error(
	          'You provided a `checked` prop to a form field without an ' +
	          '`onChange` handler. This will render a read-only field. If ' +
	          'the field should be mutable use `defaultChecked`. Otherwise, ' +
	          'set either `onChange` or `readOnly`.'
	        );
	      },
	      onChange: ReactPropTypes.func
	    }
	  },

	  /**
	   * @param {ReactComponent} input Form component
	   * @return {*} current value of the input either from value prop or link.
	   */
	  getValue: function(input) {
	    if (input.props.valueLink) {
	      _assertValueLink(input);
	      return input.props.valueLink.value;
	    }
	    return input.props.value;
	  },

	  /**
	   * @param {ReactComponent} input Form component
	   * @return {*} current checked status of the input either from checked prop
	   *             or link.
	   */
	  getChecked: function(input) {
	    if (input.props.checkedLink) {
	      _assertCheckedLink(input);
	      return input.props.checkedLink.value;
	    }
	    return input.props.checked;
	  },

	  /**
	   * @param {ReactComponent} input Form component
	   * @return {function} change callback either from onChange prop or link.
	   */
	  getOnChange: function(input) {
	    if (input.props.valueLink) {
	      _assertValueLink(input);
	      return _handleLinkedValueChange;
	    } else if (input.props.checkedLink) {
	      _assertCheckedLink(input);
	      return _handleLinkedCheckChange;
	    }
	    return input.props.onChange;
	  }
	};

	module.exports = LinkedValueUtils;


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTypes
	 */

	'use strict';

	var ReactElement = __webpack_require__(58);
	var ReactFragment = __webpack_require__(57);
	var ReactPropTypeLocationNames = __webpack_require__(81);

	var emptyFunction = __webpack_require__(60);

	/**
	 * Collection of methods that allow declaration and validation of props that are
	 * supplied to React components. Example usage:
	 *
	 *   var Props = require('ReactPropTypes');
	 *   var MyArticle = React.createClass({
	 *     propTypes: {
	 *       // An optional string prop named "description".
	 *       description: Props.string,
	 *
	 *       // A required enum prop named "category".
	 *       category: Props.oneOf(['News','Photos']).isRequired,
	 *
	 *       // A prop named "dialog" that requires an instance of Dialog.
	 *       dialog: Props.instanceOf(Dialog).isRequired
	 *     },
	 *     render: function() { ... }
	 *   });
	 *
	 * A more formal specification of how these methods are used:
	 *
	 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	 *   decl := ReactPropTypes.{type}(.isRequired)?
	 *
	 * Each and every declaration produces a function with the same signature. This
	 * allows the creation of custom validation functions. For example:
	 *
	 *  var MyLink = React.createClass({
	 *    propTypes: {
	 *      // An optional string or URI prop named "href".
	 *      href: function(props, propName, componentName) {
	 *        var propValue = props[propName];
	 *        if (propValue != null && typeof propValue !== 'string' &&
	 *            !(propValue instanceof URI)) {
	 *          return new Error(
	 *            'Expected a string or an URI for ' + propName + ' in ' +
	 *            componentName
	 *          );
	 *        }
	 *      }
	 *    },
	 *    render: function() {...}
	 *  });
	 *
	 * @internal
	 */

	var ANONYMOUS = '<<anonymous>>';

	var elementTypeChecker = createElementTypeChecker();
	var nodeTypeChecker = createNodeChecker();

	var ReactPropTypes = {
	  array: createPrimitiveTypeChecker('array'),
	  bool: createPrimitiveTypeChecker('boolean'),
	  func: createPrimitiveTypeChecker('function'),
	  number: createPrimitiveTypeChecker('number'),
	  object: createPrimitiveTypeChecker('object'),
	  string: createPrimitiveTypeChecker('string'),

	  any: createAnyTypeChecker(),
	  arrayOf: createArrayOfTypeChecker,
	  element: elementTypeChecker,
	  instanceOf: createInstanceTypeChecker,
	  node: nodeTypeChecker,
	  objectOf: createObjectOfTypeChecker,
	  oneOf: createEnumTypeChecker,
	  oneOfType: createUnionTypeChecker,
	  shape: createShapeTypeChecker
	};

	function createChainableTypeChecker(validate) {
	  function checkType(isRequired, props, propName, componentName, location) {
	    componentName = componentName || ANONYMOUS;
	    if (props[propName] == null) {
	      var locationName = ReactPropTypeLocationNames[location];
	      if (isRequired) {
	        return new Error(
	          ("Required " + locationName + " `" + propName + "` was not specified in ") +
	          ("`" + componentName + "`.")
	        );
	      }
	      return null;
	    } else {
	      return validate(props, propName, componentName, location);
	    }
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);

	  return chainedCheckType;
	}

	function createPrimitiveTypeChecker(expectedType) {
	  function validate(props, propName, componentName, location) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== expectedType) {
	      var locationName = ReactPropTypeLocationNames[location];
	      // `propValue` being instance of, say, date/regexp, pass the 'object'
	      // check, but we can offer a more precise error message here rather than
	      // 'of type `object`'.
	      var preciseType = getPreciseType(propValue);

	      return new Error(
	        ("Invalid " + locationName + " `" + propName + "` of type `" + preciseType + "` ") +
	        ("supplied to `" + componentName + "`, expected `" + expectedType + "`.")
	      );
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createAnyTypeChecker() {
	  return createChainableTypeChecker(emptyFunction.thatReturns(null));
	}

	function createArrayOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location) {
	    var propValue = props[propName];
	    if (!Array.isArray(propValue)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var propType = getPropType(propValue);
	      return new Error(
	        ("Invalid " + locationName + " `" + propName + "` of type ") +
	        ("`" + propType + "` supplied to `" + componentName + "`, expected an array.")
	      );
	    }
	    for (var i = 0; i < propValue.length; i++) {
	      var error = typeChecker(propValue, i, componentName, location);
	      if (error instanceof Error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createElementTypeChecker() {
	  function validate(props, propName, componentName, location) {
	    if (!ReactElement.isValidElement(props[propName])) {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error(
	        ("Invalid " + locationName + " `" + propName + "` supplied to ") +
	        ("`" + componentName + "`, expected a ReactElement.")
	      );
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createInstanceTypeChecker(expectedClass) {
	  function validate(props, propName, componentName, location) {
	    if (!(props[propName] instanceof expectedClass)) {
	      var locationName = ReactPropTypeLocationNames[location];
	      var expectedClassName = expectedClass.name || ANONYMOUS;
	      return new Error(
	        ("Invalid " + locationName + " `" + propName + "` supplied to ") +
	        ("`" + componentName + "`, expected instance of `" + expectedClassName + "`.")
	      );
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createEnumTypeChecker(expectedValues) {
	  function validate(props, propName, componentName, location) {
	    var propValue = props[propName];
	    for (var i = 0; i < expectedValues.length; i++) {
	      if (propValue === expectedValues[i]) {
	        return null;
	      }
	    }

	    var locationName = ReactPropTypeLocationNames[location];
	    var valuesString = JSON.stringify(expectedValues);
	    return new Error(
	      ("Invalid " + locationName + " `" + propName + "` of value `" + propValue + "` ") +
	      ("supplied to `" + componentName + "`, expected one of " + valuesString + ".")
	    );
	  }
	  return createChainableTypeChecker(validate);
	}

	function createObjectOfTypeChecker(typeChecker) {
	  function validate(props, propName, componentName, location) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error(
	        ("Invalid " + locationName + " `" + propName + "` of type ") +
	        ("`" + propType + "` supplied to `" + componentName + "`, expected an object.")
	      );
	    }
	    for (var key in propValue) {
	      if (propValue.hasOwnProperty(key)) {
	        var error = typeChecker(propValue, key, componentName, location);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createUnionTypeChecker(arrayOfTypeCheckers) {
	  function validate(props, propName, componentName, location) {
	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (checker(props, propName, componentName, location) == null) {
	        return null;
	      }
	    }

	    var locationName = ReactPropTypeLocationNames[location];
	    return new Error(
	      ("Invalid " + locationName + " `" + propName + "` supplied to ") +
	      ("`" + componentName + "`.")
	    );
	  }
	  return createChainableTypeChecker(validate);
	}

	function createNodeChecker() {
	  function validate(props, propName, componentName, location) {
	    if (!isNode(props[propName])) {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error(
	        ("Invalid " + locationName + " `" + propName + "` supplied to ") +
	        ("`" + componentName + "`, expected a ReactNode.")
	      );
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function createShapeTypeChecker(shapeTypes) {
	  function validate(props, propName, componentName, location) {
	    var propValue = props[propName];
	    var propType = getPropType(propValue);
	    if (propType !== 'object') {
	      var locationName = ReactPropTypeLocationNames[location];
	      return new Error(
	        ("Invalid " + locationName + " `" + propName + "` of type `" + propType + "` ") +
	        ("supplied to `" + componentName + "`, expected `object`.")
	      );
	    }
	    for (var key in shapeTypes) {
	      var checker = shapeTypes[key];
	      if (!checker) {
	        continue;
	      }
	      var error = checker(propValue, key, componentName, location);
	      if (error) {
	        return error;
	      }
	    }
	    return null;
	  }
	  return createChainableTypeChecker(validate);
	}

	function isNode(propValue) {
	  switch (typeof propValue) {
	    case 'number':
	    case 'string':
	    case 'undefined':
	      return true;
	    case 'boolean':
	      return !propValue;
	    case 'object':
	      if (Array.isArray(propValue)) {
	        return propValue.every(isNode);
	      }
	      if (propValue === null || ReactElement.isValidElement(propValue)) {
	        return true;
	      }
	      propValue = ReactFragment.extractIfFragment(propValue);
	      for (var k in propValue) {
	        if (!isNode(propValue[k])) {
	          return false;
	        }
	      }
	      return true;
	    default:
	      return false;
	  }
	}

	// Equivalent of `typeof` but with special handling for array and regexp.
	function getPropType(propValue) {
	  var propType = typeof propValue;
	  if (Array.isArray(propValue)) {
	    return 'array';
	  }
	  if (propValue instanceof RegExp) {
	    // Old webkits (at least until Android 4.0) return 'function' rather than
	    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	    // passes PropTypes.object.
	    return 'object';
	  }
	  return propType;
	}

	// This handles more types than `getPropType`. Only used for error messages.
	// See `createPrimitiveTypeChecker`.
	function getPreciseType(propValue) {
	  var propType = getPropType(propValue);
	  if (propType === 'object') {
	    if (propValue instanceof Date) {
	      return 'date';
	    } else if (propValue instanceof RegExp) {
	      return 'regexp';
	    }
	  }
	  return propType;
	}

	module.exports = ReactPropTypes;


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMOption
	 */

	'use strict';

	var ReactBrowserComponentMixin = __webpack_require__(141);
	var ReactClass = __webpack_require__(84);
	var ReactElement = __webpack_require__(58);

	var warning = __webpack_require__(59);

	var option = ReactElement.createFactory('option');

	/**
	 * Implements an <option> native component that warns when `selected` is set.
	 */
	var ReactDOMOption = ReactClass.createClass({
	  displayName: 'ReactDOMOption',
	  tagName: 'OPTION',

	  mixins: [ReactBrowserComponentMixin],

	  componentWillMount: function() {
	    // TODO (yungsters): Remove support for `selected` in <option>.
	    if (false) {
	      ("production" !== process.env.NODE_ENV ? warning(
	        this.props.selected == null,
	        'Use the `defaultValue` or `value` props on <select> instead of ' +
	        'setting `selected` on <option>.'
	      ) : null);
	    }
	  },

	  render: function() {
	    return option(this.props, this.props.children);
	  }

	});

	module.exports = ReactDOMOption;


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMSelect
	 */

	'use strict';

	var AutoFocusMixin = __webpack_require__(163);
	var LinkedValueUtils = __webpack_require__(168);
	var ReactBrowserComponentMixin = __webpack_require__(141);
	var ReactClass = __webpack_require__(84);
	var ReactElement = __webpack_require__(58);
	var ReactUpdates = __webpack_require__(73);

	var assign = __webpack_require__(62);

	var select = ReactElement.createFactory('select');

	function updateOptionsIfPendingUpdateAndMounted() {
	  /*jshint validthis:true */
	  if (this._pendingUpdate) {
	    this._pendingUpdate = false;
	    var value = LinkedValueUtils.getValue(this);
	    if (value != null && this.isMounted()) {
	      updateOptions(this, value);
	    }
	  }
	}

	/**
	 * Validation function for `value` and `defaultValue`.
	 * @private
	 */
	function selectValueType(props, propName, componentName) {
	  if (props[propName] == null) {
	    return null;
	  }
	  if (props.multiple) {
	    if (!Array.isArray(props[propName])) {
	      return new Error(
	        ("The `" + propName + "` prop supplied to <select> must be an array if ") +
	        ("`multiple` is true.")
	      );
	    }
	  } else {
	    if (Array.isArray(props[propName])) {
	      return new Error(
	        ("The `" + propName + "` prop supplied to <select> must be a scalar ") +
	        ("value if `multiple` is false.")
	      );
	    }
	  }
	}

	/**
	 * @param {ReactComponent} component Instance of ReactDOMSelect
	 * @param {*} propValue A stringable (with `multiple`, a list of stringables).
	 * @private
	 */
	function updateOptions(component, propValue) {
	  var selectedValue, i, l;
	  var options = component.getDOMNode().options;

	  if (component.props.multiple) {
	    selectedValue = {};
	    for (i = 0, l = propValue.length; i < l; i++) {
	      selectedValue['' + propValue[i]] = true;
	    }
	    for (i = 0, l = options.length; i < l; i++) {
	      var selected = selectedValue.hasOwnProperty(options[i].value);
	      if (options[i].selected !== selected) {
	        options[i].selected = selected;
	      }
	    }
	  } else {
	    // Do not set `select.value` as exact behavior isn't consistent across all
	    // browsers for all cases.
	    selectedValue = '' + propValue;
	    for (i = 0, l = options.length; i < l; i++) {
	      if (options[i].value === selectedValue) {
	        options[i].selected = true;
	        return;
	      }
	    }
	    if (options.length) {
	      options[0].selected = true;
	    }
	  }
	}

	/**
	 * Implements a <select> native component that allows optionally setting the
	 * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
	 * stringable. If `multiple` is true, the prop must be an array of stringables.
	 *
	 * If `value` is not supplied (or null/undefined), user actions that change the
	 * selected option will trigger updates to the rendered options.
	 *
	 * If it is supplied (and not null/undefined), the rendered options will not
	 * update in response to user actions. Instead, the `value` prop must change in
	 * order for the rendered options to update.
	 *
	 * If `defaultValue` is provided, any options with the supplied values will be
	 * selected.
	 */
	var ReactDOMSelect = ReactClass.createClass({
	  displayName: 'ReactDOMSelect',
	  tagName: 'SELECT',

	  mixins: [AutoFocusMixin, LinkedValueUtils.Mixin, ReactBrowserComponentMixin],

	  propTypes: {
	    defaultValue: selectValueType,
	    value: selectValueType
	  },

	  render: function() {
	    // Clone `this.props` so we don't mutate the input.
	    var props = assign({}, this.props);

	    props.onChange = this._handleChange;
	    props.value = null;

	    return select(props, this.props.children);
	  },

	  componentWillMount: function() {
	    this._pendingUpdate = false;
	  },

	  componentDidMount: function() {
	    var value = LinkedValueUtils.getValue(this);
	    if (value != null) {
	      updateOptions(this, value);
	    } else if (this.props.defaultValue != null) {
	      updateOptions(this, this.props.defaultValue);
	    }
	  },

	  componentDidUpdate: function(prevProps) {
	    var value = LinkedValueUtils.getValue(this);
	    if (value != null) {
	      this._pendingUpdate = false;
	      updateOptions(this, value);
	    } else if (!prevProps.multiple !== !this.props.multiple) {
	      // For simplicity, reapply `defaultValue` if `multiple` is toggled.
	      if (this.props.defaultValue != null) {
	        updateOptions(this, this.props.defaultValue);
	      } else {
	        // Revert the select back to its default unselected state.
	        updateOptions(this, this.props.multiple ? [] : '');
	      }
	    }
	  },

	  _handleChange: function(event) {
	    var returnValue;
	    var onChange = LinkedValueUtils.getOnChange(this);
	    if (onChange) {
	      returnValue = onChange.call(this, event);
	    }

	    this._pendingUpdate = true;
	    ReactUpdates.asap(updateOptionsIfPendingUpdateAndMounted, this);
	    return returnValue;
	  }

	});

	module.exports = ReactDOMSelect;


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMTextarea
	 */

	'use strict';

	var AutoFocusMixin = __webpack_require__(163);
	var DOMPropertyOperations = __webpack_require__(90);
	var LinkedValueUtils = __webpack_require__(168);
	var ReactBrowserComponentMixin = __webpack_require__(141);
	var ReactClass = __webpack_require__(84);
	var ReactElement = __webpack_require__(58);
	var ReactUpdates = __webpack_require__(73);

	var assign = __webpack_require__(62);
	var invariant = __webpack_require__(54);

	var warning = __webpack_require__(59);

	var textarea = ReactElement.createFactory('textarea');

	function forceUpdateIfMounted() {
	  /*jshint validthis:true */
	  if (this.isMounted()) {
	    this.forceUpdate();
	  }
	}

	/**
	 * Implements a <textarea> native component that allows setting `value`, and
	 * `defaultValue`. This differs from the traditional DOM API because value is
	 * usually set as PCDATA children.
	 *
	 * If `value` is not supplied (or null/undefined), user actions that affect the
	 * value will trigger updates to the element.
	 *
	 * If `value` is supplied (and not null/undefined), the rendered element will
	 * not trigger updates to the element. Instead, the `value` prop must change in
	 * order for the rendered element to be updated.
	 *
	 * The rendered element will be initialized with an empty value, the prop
	 * `defaultValue` if specified, or the children content (deprecated).
	 */
	var ReactDOMTextarea = ReactClass.createClass({
	  displayName: 'ReactDOMTextarea',
	  tagName: 'TEXTAREA',

	  mixins: [AutoFocusMixin, LinkedValueUtils.Mixin, ReactBrowserComponentMixin],

	  getInitialState: function() {
	    var defaultValue = this.props.defaultValue;
	    // TODO (yungsters): Remove support for children content in <textarea>.
	    var children = this.props.children;
	    if (children != null) {
	      if (false) {
	        ("production" !== process.env.NODE_ENV ? warning(
	          false,
	          'Use the `defaultValue` or `value` props instead of setting ' +
	          'children on <textarea>.'
	        ) : null);
	      }
	      (false ? invariant(
	        defaultValue == null,
	        'If you supply `defaultValue` on a <textarea>, do not pass children.'
	      ) : invariant(defaultValue == null));
	      if (Array.isArray(children)) {
	        (false ? invariant(
	          children.length <= 1,
	          '<textarea> can only have at most one child.'
	        ) : invariant(children.length <= 1));
	        children = children[0];
	      }

	      defaultValue = '' + children;
	    }
	    if (defaultValue == null) {
	      defaultValue = '';
	    }
	    var value = LinkedValueUtils.getValue(this);
	    return {
	      // We save the initial value so that `ReactDOMComponent` doesn't update
	      // `textContent` (unnecessary since we update value).
	      // The initial value can be a boolean or object so that's why it's
	      // forced to be a string.
	      initialValue: '' + (value != null ? value : defaultValue)
	    };
	  },

	  render: function() {
	    // Clone `this.props` so we don't mutate the input.
	    var props = assign({}, this.props);

	    (false ? invariant(
	      props.dangerouslySetInnerHTML == null,
	      '`dangerouslySetInnerHTML` does not make sense on <textarea>.'
	    ) : invariant(props.dangerouslySetInnerHTML == null));

	    props.defaultValue = null;
	    props.value = null;
	    props.onChange = this._handleChange;

	    // Always set children to the same thing. In IE9, the selection range will
	    // get reset if `textContent` is mutated.
	    return textarea(props, this.state.initialValue);
	  },

	  componentDidUpdate: function(prevProps, prevState, prevContext) {
	    var value = LinkedValueUtils.getValue(this);
	    if (value != null) {
	      var rootNode = this.getDOMNode();
	      // Cast `value` to a string to ensure the value is set correctly. While
	      // browsers typically do this as necessary, jsdom doesn't.
	      DOMPropertyOperations.setValueForProperty(rootNode, 'value', '' + value);
	    }
	  },

	  _handleChange: function(event) {
	    var returnValue;
	    var onChange = LinkedValueUtils.getOnChange(this);
	    if (onChange) {
	      returnValue = onChange.call(this, event);
	    }
	    ReactUpdates.asap(forceUpdateIfMounted, this);
	    return returnValue;
	  }

	});

	module.exports = ReactDOMTextarea;


/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactEventListener
	 * @typechecks static-only
	 */

	'use strict';

	var EventListener = __webpack_require__(174);
	var ExecutionEnvironment = __webpack_require__(100);
	var PooledClass = __webpack_require__(56);
	var ReactInstanceHandles = __webpack_require__(66);
	var ReactMount = __webpack_require__(114);
	var ReactUpdates = __webpack_require__(73);

	var assign = __webpack_require__(62);
	var getEventTarget = __webpack_require__(149);
	var getUnboundedScrollPosition = __webpack_require__(175);

	/**
	 * Finds the parent React component of `node`.
	 *
	 * @param {*} node
	 * @return {?DOMEventTarget} Parent container, or `null` if the specified node
	 *                           is not nested.
	 */
	function findParent(node) {
	  // TODO: It may be a good idea to cache this to prevent unnecessary DOM
	  // traversal, but caching is difficult to do correctly without using a
	  // mutation observer to listen for all DOM changes.
	  var nodeID = ReactMount.getID(node);
	  var rootID = ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);
	  var container = ReactMount.findReactContainerForID(rootID);
	  var parent = ReactMount.getFirstReactDOM(container);
	  return parent;
	}

	// Used to store ancestor hierarchy in top level callback
	function TopLevelCallbackBookKeeping(topLevelType, nativeEvent) {
	  this.topLevelType = topLevelType;
	  this.nativeEvent = nativeEvent;
	  this.ancestors = [];
	}
	assign(TopLevelCallbackBookKeeping.prototype, {
	  destructor: function() {
	    this.topLevelType = null;
	    this.nativeEvent = null;
	    this.ancestors.length = 0;
	  }
	});
	PooledClass.addPoolingTo(
	  TopLevelCallbackBookKeeping,
	  PooledClass.twoArgumentPooler
	);

	function handleTopLevelImpl(bookKeeping) {
	  var topLevelTarget = ReactMount.getFirstReactDOM(
	    getEventTarget(bookKeeping.nativeEvent)
	  ) || window;

	  // Loop through the hierarchy, in case there's any nested components.
	  // It's important that we build the array of ancestors before calling any
	  // event handlers, because event handlers can modify the DOM, leading to
	  // inconsistencies with ReactMount's node cache. See #1105.
	  var ancestor = topLevelTarget;
	  while (ancestor) {
	    bookKeeping.ancestors.push(ancestor);
	    ancestor = findParent(ancestor);
	  }

	  for (var i = 0, l = bookKeeping.ancestors.length; i < l; i++) {
	    topLevelTarget = bookKeeping.ancestors[i];
	    var topLevelTargetID = ReactMount.getID(topLevelTarget) || '';
	    ReactEventListener._handleTopLevel(
	      bookKeeping.topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      bookKeeping.nativeEvent
	    );
	  }
	}

	function scrollValueMonitor(cb) {
	  var scrollPosition = getUnboundedScrollPosition(window);
	  cb(scrollPosition);
	}

	var ReactEventListener = {
	  _enabled: true,
	  _handleTopLevel: null,

	  WINDOW_HANDLE: ExecutionEnvironment.canUseDOM ? window : null,

	  setHandleTopLevel: function(handleTopLevel) {
	    ReactEventListener._handleTopLevel = handleTopLevel;
	  },

	  setEnabled: function(enabled) {
	    ReactEventListener._enabled = !!enabled;
	  },

	  isEnabled: function() {
	    return ReactEventListener._enabled;
	  },


	  /**
	   * Traps top-level events by using event bubbling.
	   *
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {string} handlerBaseName Event name (e.g. "click").
	   * @param {object} handle Element on which to attach listener.
	   * @return {object} An object with a remove function which will forcefully
	   *                  remove the listener.
	   * @internal
	   */
	  trapBubbledEvent: function(topLevelType, handlerBaseName, handle) {
	    var element = handle;
	    if (!element) {
	      return null;
	    }
	    return EventListener.listen(
	      element,
	      handlerBaseName,
	      ReactEventListener.dispatchEvent.bind(null, topLevelType)
	    );
	  },

	  /**
	   * Traps a top-level event by using event capturing.
	   *
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {string} handlerBaseName Event name (e.g. "click").
	   * @param {object} handle Element on which to attach listener.
	   * @return {object} An object with a remove function which will forcefully
	   *                  remove the listener.
	   * @internal
	   */
	  trapCapturedEvent: function(topLevelType, handlerBaseName, handle) {
	    var element = handle;
	    if (!element) {
	      return null;
	    }
	    return EventListener.capture(
	      element,
	      handlerBaseName,
	      ReactEventListener.dispatchEvent.bind(null, topLevelType)
	    );
	  },

	  monitorScrollValue: function(refresh) {
	    var callback = scrollValueMonitor.bind(null, refresh);
	    EventListener.listen(window, 'scroll', callback);
	  },

	  dispatchEvent: function(topLevelType, nativeEvent) {
	    if (!ReactEventListener._enabled) {
	      return;
	    }

	    var bookKeeping = TopLevelCallbackBookKeeping.getPooled(
	      topLevelType,
	      nativeEvent
	    );
	    try {
	      // Event queue being processed in the same cycle allows
	      // `preventDefault`.
	      ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);
	    } finally {
	      TopLevelCallbackBookKeeping.release(bookKeeping);
	    }
	  }
	};

	module.exports = ReactEventListener;


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * @providesModule EventListener
	 * @typechecks
	 */

	var emptyFunction = __webpack_require__(60);

	/**
	 * Upstream version of event listener. Does not take into account specific
	 * nature of platform.
	 */
	var EventListener = {
	  /**
	   * Listen to DOM events during the bubble phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  listen: function(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, false);
	      return {
	        remove: function() {
	          target.removeEventListener(eventType, callback, false);
	        }
	      };
	    } else if (target.attachEvent) {
	      target.attachEvent('on' + eventType, callback);
	      return {
	        remove: function() {
	          target.detachEvent('on' + eventType, callback);
	        }
	      };
	    }
	  },

	  /**
	   * Listen to DOM events during the capture phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  capture: function(target, eventType, callback) {
	    if (!target.addEventListener) {
	      if (false) {
	        console.error(
	          'Attempted to listen to events during the capture phase on a ' +
	          'browser that does not support the capture phase. Your application ' +
	          'will not receive some events.'
	        );
	      }
	      return {
	        remove: emptyFunction
	      };
	    } else {
	      target.addEventListener(eventType, callback, true);
	      return {
	        remove: function() {
	          target.removeEventListener(eventType, callback, true);
	        }
	      };
	    }
	  },

	  registerDefault: function() {}
	};

	module.exports = EventListener;


/***/ },
/* 175 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getUnboundedScrollPosition
	 * @typechecks
	 */

	"use strict";

	/**
	 * Gets the scroll position of the supplied element or window.
	 *
	 * The return values are unbounded, unlike `getScrollPosition`. This means they
	 * may be negative or exceed the element boundaries (which is possible using
	 * inertial scrolling).
	 *
	 * @param {DOMWindow|DOMElement} scrollable
	 * @return {object} Map with `x` and `y` keys.
	 */
	function getUnboundedScrollPosition(scrollable) {
	  if (scrollable === window) {
	    return {
	      x: window.pageXOffset || document.documentElement.scrollLeft,
	      y: window.pageYOffset || document.documentElement.scrollTop
	    };
	  }
	  return {
	    x: scrollable.scrollLeft,
	    y: scrollable.scrollTop
	  };
	}

	module.exports = getUnboundedScrollPosition;


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactInjection
	 */

	'use strict';

	var DOMProperty = __webpack_require__(91);
	var EventPluginHub = __webpack_require__(116);
	var ReactComponentEnvironment = __webpack_require__(132);
	var ReactClass = __webpack_require__(84);
	var ReactEmptyComponent = __webpack_require__(123);
	var ReactBrowserEventEmitter = __webpack_require__(115);
	var ReactNativeComponent = __webpack_require__(82);
	var ReactDOMComponent = __webpack_require__(134);
	var ReactPerf = __webpack_require__(75);
	var ReactRootIndex = __webpack_require__(67);
	var ReactUpdates = __webpack_require__(73);

	var ReactInjection = {
	  Component: ReactComponentEnvironment.injection,
	  Class: ReactClass.injection,
	  DOMComponent: ReactDOMComponent.injection,
	  DOMProperty: DOMProperty.injection,
	  EmptyComponent: ReactEmptyComponent.injection,
	  EventPluginHub: EventPluginHub.injection,
	  EventEmitter: ReactBrowserEventEmitter.injection,
	  NativeComponent: ReactNativeComponent.injection,
	  Perf: ReactPerf.injection,
	  RootIndex: ReactRootIndex.injection,
	  Updates: ReactUpdates.injection
	};

	module.exports = ReactInjection;


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactReconcileTransaction
	 * @typechecks static-only
	 */

	'use strict';

	var CallbackQueue = __webpack_require__(74);
	var PooledClass = __webpack_require__(56);
	var ReactBrowserEventEmitter = __webpack_require__(115);
	var ReactInputSelection = __webpack_require__(178);
	var ReactPutListenerQueue = __webpack_require__(182);
	var Transaction = __webpack_require__(83);

	var assign = __webpack_require__(62);

	/**
	 * Ensures that, when possible, the selection range (currently selected text
	 * input) is not disturbed by performing the transaction.
	 */
	var SELECTION_RESTORATION = {
	  /**
	   * @return {Selection} Selection information.
	   */
	  initialize: ReactInputSelection.getSelectionInformation,
	  /**
	   * @param {Selection} sel Selection information returned from `initialize`.
	   */
	  close: ReactInputSelection.restoreSelection
	};

	/**
	 * Suppresses events (blur/focus) that could be inadvertently dispatched due to
	 * high level DOM manipulations (like temporarily removing a text input from the
	 * DOM).
	 */
	var EVENT_SUPPRESSION = {
	  /**
	   * @return {boolean} The enabled status of `ReactBrowserEventEmitter` before
	   * the reconciliation.
	   */
	  initialize: function() {
	    var currentlyEnabled = ReactBrowserEventEmitter.isEnabled();
	    ReactBrowserEventEmitter.setEnabled(false);
	    return currentlyEnabled;
	  },

	  /**
	   * @param {boolean} previouslyEnabled Enabled status of
	   *   `ReactBrowserEventEmitter` before the reconciliation occured. `close`
	   *   restores the previous value.
	   */
	  close: function(previouslyEnabled) {
	    ReactBrowserEventEmitter.setEnabled(previouslyEnabled);
	  }
	};

	/**
	 * Provides a queue for collecting `componentDidMount` and
	 * `componentDidUpdate` callbacks during the the transaction.
	 */
	var ON_DOM_READY_QUEUEING = {
	  /**
	   * Initializes the internal `onDOMReady` queue.
	   */
	  initialize: function() {
	    this.reactMountReady.reset();
	  },

	  /**
	   * After DOM is flushed, invoke all registered `onDOMReady` callbacks.
	   */
	  close: function() {
	    this.reactMountReady.notifyAll();
	  }
	};

	var PUT_LISTENER_QUEUEING = {
	  initialize: function() {
	    this.putListenerQueue.reset();
	  },

	  close: function() {
	    this.putListenerQueue.putListeners();
	  }
	};

	/**
	 * Executed within the scope of the `Transaction` instance. Consider these as
	 * being member methods, but with an implied ordering while being isolated from
	 * each other.
	 */
	var TRANSACTION_WRAPPERS = [
	  PUT_LISTENER_QUEUEING,
	  SELECTION_RESTORATION,
	  EVENT_SUPPRESSION,
	  ON_DOM_READY_QUEUEING
	];

	/**
	 * Currently:
	 * - The order that these are listed in the transaction is critical:
	 * - Suppresses events.
	 * - Restores selection range.
	 *
	 * Future:
	 * - Restore document/overflow scroll positions that were unintentionally
	 *   modified via DOM insertions above the top viewport boundary.
	 * - Implement/integrate with customized constraint based layout system and keep
	 *   track of which dimensions must be remeasured.
	 *
	 * @class ReactReconcileTransaction
	 */
	function ReactReconcileTransaction() {
	  this.reinitializeTransaction();
	  // Only server-side rendering really needs this option (see
	  // `ReactServerRendering`), but server-side uses
	  // `ReactServerRenderingTransaction` instead. This option is here so that it's
	  // accessible and defaults to false when `ReactDOMComponent` and
	  // `ReactTextComponent` checks it in `mountComponent`.`
	  this.renderToStaticMarkup = false;
	  this.reactMountReady = CallbackQueue.getPooled(null);
	  this.putListenerQueue = ReactPutListenerQueue.getPooled();
	}

	var Mixin = {
	  /**
	   * @see Transaction
	   * @abstract
	   * @final
	   * @return {array<object>} List of operation wrap proceedures.
	   *   TODO: convert to array<TransactionWrapper>
	   */
	  getTransactionWrappers: function() {
	    return TRANSACTION_WRAPPERS;
	  },

	  /**
	   * @return {object} The queue to collect `onDOMReady` callbacks with.
	   */
	  getReactMountReady: function() {
	    return this.reactMountReady;
	  },

	  getPutListenerQueue: function() {
	    return this.putListenerQueue;
	  },

	  /**
	   * `PooledClass` looks for this, and will invoke this before allowing this
	   * instance to be resused.
	   */
	  destructor: function() {
	    CallbackQueue.release(this.reactMountReady);
	    this.reactMountReady = null;

	    ReactPutListenerQueue.release(this.putListenerQueue);
	    this.putListenerQueue = null;
	  }
	};


	assign(ReactReconcileTransaction.prototype, Transaction.Mixin, Mixin);

	PooledClass.addPoolingTo(ReactReconcileTransaction);

	module.exports = ReactReconcileTransaction;


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactInputSelection
	 */

	'use strict';

	var ReactDOMSelection = __webpack_require__(179);

	var containsNode = __webpack_require__(126);
	var focusNode = __webpack_require__(164);
	var getActiveElement = __webpack_require__(181);

	function isInDocument(node) {
	  return containsNode(document.documentElement, node);
	}

	/**
	 * @ReactInputSelection: React input selection module. Based on Selection.js,
	 * but modified to be suitable for react and has a couple of bug fixes (doesn't
	 * assume buttons have range selections allowed).
	 * Input selection module for React.
	 */
	var ReactInputSelection = {

	  hasSelectionCapabilities: function(elem) {
	    return elem && (
	      ((elem.nodeName === 'INPUT' && elem.type === 'text') ||
	      elem.nodeName === 'TEXTAREA' || elem.contentEditable === 'true')
	    );
	  },

	  getSelectionInformation: function() {
	    var focusedElem = getActiveElement();
	    return {
	      focusedElem: focusedElem,
	      selectionRange:
	          ReactInputSelection.hasSelectionCapabilities(focusedElem) ?
	          ReactInputSelection.getSelection(focusedElem) :
	          null
	    };
	  },

	  /**
	   * @restoreSelection: If any selection information was potentially lost,
	   * restore it. This is useful when performing operations that could remove dom
	   * nodes and place them back in, resulting in focus being lost.
	   */
	  restoreSelection: function(priorSelectionInformation) {
	    var curFocusedElem = getActiveElement();
	    var priorFocusedElem = priorSelectionInformation.focusedElem;
	    var priorSelectionRange = priorSelectionInformation.selectionRange;
	    if (curFocusedElem !== priorFocusedElem &&
	        isInDocument(priorFocusedElem)) {
	      if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
	        ReactInputSelection.setSelection(
	          priorFocusedElem,
	          priorSelectionRange
	        );
	      }
	      focusNode(priorFocusedElem);
	    }
	  },

	  /**
	   * @getSelection: Gets the selection bounds of a focused textarea, input or
	   * contentEditable node.
	   * -@input: Look up selection bounds of this input
	   * -@return {start: selectionStart, end: selectionEnd}
	   */
	  getSelection: function(input) {
	    var selection;

	    if ('selectionStart' in input) {
	      // Modern browser with input or textarea.
	      selection = {
	        start: input.selectionStart,
	        end: input.selectionEnd
	      };
	    } else if (document.selection && input.nodeName === 'INPUT') {
	      // IE8 input.
	      var range = document.selection.createRange();
	      // There can only be one selection per document in IE, so it must
	      // be in our element.
	      if (range.parentElement() === input) {
	        selection = {
	          start: -range.moveStart('character', -input.value.length),
	          end: -range.moveEnd('character', -input.value.length)
	        };
	      }
	    } else {
	      // Content editable or old IE textarea.
	      selection = ReactDOMSelection.getOffsets(input);
	    }

	    return selection || {start: 0, end: 0};
	  },

	  /**
	   * @setSelection: Sets the selection bounds of a textarea or input and focuses
	   * the input.
	   * -@input     Set selection bounds of this input or textarea
	   * -@offsets   Object of same form that is returned from get*
	   */
	  setSelection: function(input, offsets) {
	    var start = offsets.start;
	    var end = offsets.end;
	    if (typeof end === 'undefined') {
	      end = start;
	    }

	    if ('selectionStart' in input) {
	      input.selectionStart = start;
	      input.selectionEnd = Math.min(end, input.value.length);
	    } else if (document.selection && input.nodeName === 'INPUT') {
	      var range = input.createTextRange();
	      range.collapse(true);
	      range.moveStart('character', start);
	      range.moveEnd('character', end - start);
	      range.select();
	    } else {
	      ReactDOMSelection.setOffsets(input, offsets);
	    }
	  }
	};

	module.exports = ReactInputSelection;


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactDOMSelection
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(100);

	var getNodeForCharacterOffset = __webpack_require__(180);
	var getTextContentAccessor = __webpack_require__(146);

	/**
	 * While `isCollapsed` is available on the Selection object and `collapsed`
	 * is available on the Range object, IE11 sometimes gets them wrong.
	 * If the anchor/focus nodes and offsets are the same, the range is collapsed.
	 */
	function isCollapsed(anchorNode, anchorOffset, focusNode, focusOffset) {
	  return anchorNode === focusNode && anchorOffset === focusOffset;
	}

	/**
	 * Get the appropriate anchor and focus node/offset pairs for IE.
	 *
	 * The catch here is that IE's selection API doesn't provide information
	 * about whether the selection is forward or backward, so we have to
	 * behave as though it's always forward.
	 *
	 * IE text differs from modern selection in that it behaves as though
	 * block elements end with a new line. This means character offsets will
	 * differ between the two APIs.
	 *
	 * @param {DOMElement} node
	 * @return {object}
	 */
	function getIEOffsets(node) {
	  var selection = document.selection;
	  var selectedRange = selection.createRange();
	  var selectedLength = selectedRange.text.length;

	  // Duplicate selection so we can move range without breaking user selection.
	  var fromStart = selectedRange.duplicate();
	  fromStart.moveToElementText(node);
	  fromStart.setEndPoint('EndToStart', selectedRange);

	  var startOffset = fromStart.text.length;
	  var endOffset = startOffset + selectedLength;

	  return {
	    start: startOffset,
	    end: endOffset
	  };
	}

	/**
	 * @param {DOMElement} node
	 * @return {?object}
	 */
	function getModernOffsets(node) {
	  var selection = window.getSelection && window.getSelection();

	  if (!selection || selection.rangeCount === 0) {
	    return null;
	  }

	  var anchorNode = selection.anchorNode;
	  var anchorOffset = selection.anchorOffset;
	  var focusNode = selection.focusNode;
	  var focusOffset = selection.focusOffset;

	  var currentRange = selection.getRangeAt(0);

	  // If the node and offset values are the same, the selection is collapsed.
	  // `Selection.isCollapsed` is available natively, but IE sometimes gets
	  // this value wrong.
	  var isSelectionCollapsed = isCollapsed(
	    selection.anchorNode,
	    selection.anchorOffset,
	    selection.focusNode,
	    selection.focusOffset
	  );

	  var rangeLength = isSelectionCollapsed ? 0 : currentRange.toString().length;

	  var tempRange = currentRange.cloneRange();
	  tempRange.selectNodeContents(node);
	  tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);

	  var isTempRangeCollapsed = isCollapsed(
	    tempRange.startContainer,
	    tempRange.startOffset,
	    tempRange.endContainer,
	    tempRange.endOffset
	  );

	  var start = isTempRangeCollapsed ? 0 : tempRange.toString().length;
	  var end = start + rangeLength;

	  // Detect whether the selection is backward.
	  var detectionRange = document.createRange();
	  detectionRange.setStart(anchorNode, anchorOffset);
	  detectionRange.setEnd(focusNode, focusOffset);
	  var isBackward = detectionRange.collapsed;

	  return {
	    start: isBackward ? end : start,
	    end: isBackward ? start : end
	  };
	}

	/**
	 * @param {DOMElement|DOMTextNode} node
	 * @param {object} offsets
	 */
	function setIEOffsets(node, offsets) {
	  var range = document.selection.createRange().duplicate();
	  var start, end;

	  if (typeof offsets.end === 'undefined') {
	    start = offsets.start;
	    end = start;
	  } else if (offsets.start > offsets.end) {
	    start = offsets.end;
	    end = offsets.start;
	  } else {
	    start = offsets.start;
	    end = offsets.end;
	  }

	  range.moveToElementText(node);
	  range.moveStart('character', start);
	  range.setEndPoint('EndToStart', range);
	  range.moveEnd('character', end - start);
	  range.select();
	}

	/**
	 * In modern non-IE browsers, we can support both forward and backward
	 * selections.
	 *
	 * Note: IE10+ supports the Selection object, but it does not support
	 * the `extend` method, which means that even in modern IE, it's not possible
	 * to programatically create a backward selection. Thus, for all IE
	 * versions, we use the old IE API to create our selections.
	 *
	 * @param {DOMElement|DOMTextNode} node
	 * @param {object} offsets
	 */
	function setModernOffsets(node, offsets) {
	  if (!window.getSelection) {
	    return;
	  }

	  var selection = window.getSelection();
	  var length = node[getTextContentAccessor()].length;
	  var start = Math.min(offsets.start, length);
	  var end = typeof offsets.end === 'undefined' ?
	            start : Math.min(offsets.end, length);

	  // IE 11 uses modern selection, but doesn't support the extend method.
	  // Flip backward selections, so we can set with a single range.
	  if (!selection.extend && start > end) {
	    var temp = end;
	    end = start;
	    start = temp;
	  }

	  var startMarker = getNodeForCharacterOffset(node, start);
	  var endMarker = getNodeForCharacterOffset(node, end);

	  if (startMarker && endMarker) {
	    var range = document.createRange();
	    range.setStart(startMarker.node, startMarker.offset);
	    selection.removeAllRanges();

	    if (start > end) {
	      selection.addRange(range);
	      selection.extend(endMarker.node, endMarker.offset);
	    } else {
	      range.setEnd(endMarker.node, endMarker.offset);
	      selection.addRange(range);
	    }
	  }
	}

	var useIEOffsets = (
	  ExecutionEnvironment.canUseDOM &&
	  'selection' in document &&
	  !('getSelection' in window)
	);

	var ReactDOMSelection = {
	  /**
	   * @param {DOMElement} node
	   */
	  getOffsets: useIEOffsets ? getIEOffsets : getModernOffsets,

	  /**
	   * @param {DOMElement|DOMTextNode} node
	   * @param {object} offsets
	   */
	  setOffsets: useIEOffsets ? setIEOffsets : setModernOffsets
	};

	module.exports = ReactDOMSelection;


/***/ },
/* 180 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getNodeForCharacterOffset
	 */

	'use strict';

	/**
	 * Given any node return the first leaf node without children.
	 *
	 * @param {DOMElement|DOMTextNode} node
	 * @return {DOMElement|DOMTextNode}
	 */
	function getLeafNode(node) {
	  while (node && node.firstChild) {
	    node = node.firstChild;
	  }
	  return node;
	}

	/**
	 * Get the next sibling within a container. This will walk up the
	 * DOM if a node's siblings have been exhausted.
	 *
	 * @param {DOMElement|DOMTextNode} node
	 * @return {?DOMElement|DOMTextNode}
	 */
	function getSiblingNode(node) {
	  while (node) {
	    if (node.nextSibling) {
	      return node.nextSibling;
	    }
	    node = node.parentNode;
	  }
	}

	/**
	 * Get object describing the nodes which contain characters at offset.
	 *
	 * @param {DOMElement|DOMTextNode} root
	 * @param {number} offset
	 * @return {?object}
	 */
	function getNodeForCharacterOffset(root, offset) {
	  var node = getLeafNode(root);
	  var nodeStart = 0;
	  var nodeEnd = 0;

	  while (node) {
	    if (node.nodeType === 3) {
	      nodeEnd = nodeStart + node.textContent.length;

	      if (nodeStart <= offset && nodeEnd >= offset) {
	        return {
	          node: node,
	          offset: offset - nodeStart
	        };
	      }

	      nodeStart = nodeEnd;
	    }

	    node = getLeafNode(getSiblingNode(node));
	  }
	}

	module.exports = getNodeForCharacterOffset;


/***/ },
/* 181 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getActiveElement
	 * @typechecks
	 */

	/**
	 * Same as document.activeElement but wraps in a try-catch block. In IE it is
	 * not safe to call document.activeElement if there is nothing focused.
	 *
	 * The activeElement will be null only if the document body is not yet defined.
	 */
	function getActiveElement() /*?DOMElement*/ {
	  try {
	    return document.activeElement || document.body;
	  } catch (e) {
	    return document.body;
	  }
	}

	module.exports = getActiveElement;


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPutListenerQueue
	 */

	'use strict';

	var PooledClass = __webpack_require__(56);
	var ReactBrowserEventEmitter = __webpack_require__(115);

	var assign = __webpack_require__(62);

	function ReactPutListenerQueue() {
	  this.listenersToPut = [];
	}

	assign(ReactPutListenerQueue.prototype, {
	  enqueuePutListener: function(rootNodeID, propKey, propValue) {
	    this.listenersToPut.push({
	      rootNodeID: rootNodeID,
	      propKey: propKey,
	      propValue: propValue
	    });
	  },

	  putListeners: function() {
	    for (var i = 0; i < this.listenersToPut.length; i++) {
	      var listenerToPut = this.listenersToPut[i];
	      ReactBrowserEventEmitter.putListener(
	        listenerToPut.rootNodeID,
	        listenerToPut.propKey,
	        listenerToPut.propValue
	      );
	    }
	  },

	  reset: function() {
	    this.listenersToPut.length = 0;
	  },

	  destructor: function() {
	    this.reset();
	  }
	});

	PooledClass.addPoolingTo(ReactPutListenerQueue);

	module.exports = ReactPutListenerQueue;


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SelectEventPlugin
	 */

	'use strict';

	var EventConstants = __webpack_require__(52);
	var EventPropagators = __webpack_require__(144);
	var ReactInputSelection = __webpack_require__(178);
	var SyntheticEvent = __webpack_require__(148);

	var getActiveElement = __webpack_require__(181);
	var isTextInputElement = __webpack_require__(152);
	var keyOf = __webpack_require__(86);
	var shallowEqual = __webpack_require__(184);

	var topLevelTypes = EventConstants.topLevelTypes;

	var eventTypes = {
	  select: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onSelect: null}),
	      captured: keyOf({onSelectCapture: null})
	    },
	    dependencies: [
	      topLevelTypes.topBlur,
	      topLevelTypes.topContextMenu,
	      topLevelTypes.topFocus,
	      topLevelTypes.topKeyDown,
	      topLevelTypes.topMouseDown,
	      topLevelTypes.topMouseUp,
	      topLevelTypes.topSelectionChange
	    ]
	  }
	};

	var activeElement = null;
	var activeElementID = null;
	var lastSelection = null;
	var mouseDown = false;

	/**
	 * Get an object which is a unique representation of the current selection.
	 *
	 * The return value will not be consistent across nodes or browsers, but
	 * two identical selections on the same node will return identical objects.
	 *
	 * @param {DOMElement} node
	 * @param {object}
	 */
	function getSelection(node) {
	  if ('selectionStart' in node &&
	      ReactInputSelection.hasSelectionCapabilities(node)) {
	    return {
	      start: node.selectionStart,
	      end: node.selectionEnd
	    };
	  } else if (window.getSelection) {
	    var selection = window.getSelection();
	    return {
	      anchorNode: selection.anchorNode,
	      anchorOffset: selection.anchorOffset,
	      focusNode: selection.focusNode,
	      focusOffset: selection.focusOffset
	    };
	  } else if (document.selection) {
	    var range = document.selection.createRange();
	    return {
	      parentElement: range.parentElement(),
	      text: range.text,
	      top: range.boundingTop,
	      left: range.boundingLeft
	    };
	  }
	}

	/**
	 * Poll selection to see whether it's changed.
	 *
	 * @param {object} nativeEvent
	 * @return {?SyntheticEvent}
	 */
	function constructSelectEvent(nativeEvent) {
	  // Ensure we have the right element, and that the user is not dragging a
	  // selection (this matches native `select` event behavior). In HTML5, select
	  // fires only on input and textarea thus if there's no focused element we
	  // won't dispatch.
	  if (mouseDown ||
	      activeElement == null ||
	      activeElement !== getActiveElement()) {
	    return null;
	  }

	  // Only fire when selection has actually changed.
	  var currentSelection = getSelection(activeElement);
	  if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
	    lastSelection = currentSelection;

	    var syntheticEvent = SyntheticEvent.getPooled(
	      eventTypes.select,
	      activeElementID,
	      nativeEvent
	    );

	    syntheticEvent.type = 'select';
	    syntheticEvent.target = activeElement;

	    EventPropagators.accumulateTwoPhaseDispatches(syntheticEvent);

	    return syntheticEvent;
	  }
	}

	/**
	 * This plugin creates an `onSelect` event that normalizes select events
	 * across form elements.
	 *
	 * Supported elements are:
	 * - input (see `isTextInputElement`)
	 * - textarea
	 * - contentEditable
	 *
	 * This differs from native browser implementations in the following ways:
	 * - Fires on contentEditable fields as well as inputs.
	 * - Fires for collapsed selection.
	 * - Fires after user input.
	 */
	var SelectEventPlugin = {

	  eventTypes: eventTypes,

	  /**
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {

	    switch (topLevelType) {
	      // Track the input node that has focus.
	      case topLevelTypes.topFocus:
	        if (isTextInputElement(topLevelTarget) ||
	            topLevelTarget.contentEditable === 'true') {
	          activeElement = topLevelTarget;
	          activeElementID = topLevelTargetID;
	          lastSelection = null;
	        }
	        break;
	      case topLevelTypes.topBlur:
	        activeElement = null;
	        activeElementID = null;
	        lastSelection = null;
	        break;

	      // Don't fire the event while the user is dragging. This matches the
	      // semantics of the native select event.
	      case topLevelTypes.topMouseDown:
	        mouseDown = true;
	        break;
	      case topLevelTypes.topContextMenu:
	      case topLevelTypes.topMouseUp:
	        mouseDown = false;
	        return constructSelectEvent(nativeEvent);

	      // Chrome and IE fire non-standard event when selection is changed (and
	      // sometimes when it hasn't).
	      // Firefox doesn't support selectionchange, so check selection status
	      // after each key entry. The selection changes after keydown and before
	      // keyup, but we check on keydown as well in the case of holding down a
	      // key, when multiple keydown events are fired but only one keyup is.
	      case topLevelTypes.topSelectionChange:
	      case topLevelTypes.topKeyDown:
	      case topLevelTypes.topKeyUp:
	        return constructSelectEvent(nativeEvent);
	    }
	  }
	};

	module.exports = SelectEventPlugin;


/***/ },
/* 184 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule shallowEqual
	 */

	'use strict';

	/**
	 * Performs equality by iterating through keys on an object and returning
	 * false when any key has values which are not strictly equal between
	 * objA and objB. Returns true when the values of all keys are strictly equal.
	 *
	 * @return {boolean}
	 */
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	  var key;
	  // Test for A's keys different from B.
	  for (key in objA) {
	    if (objA.hasOwnProperty(key) &&
	        (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
	      return false;
	    }
	  }
	  // Test for B's keys missing from A.
	  for (key in objB) {
	    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = shallowEqual;


/***/ },
/* 185 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ServerReactRootIndex
	 * @typechecks
	 */

	'use strict';

	/**
	 * Size of the reactRoot ID space. We generate random numbers for React root
	 * IDs and if there's a collision the events and DOM update system will
	 * get confused. In the future we need a way to generate GUIDs but for
	 * now this will work on a smaller scale.
	 */
	var GLOBAL_MOUNT_POINT_MAX = Math.pow(2, 53);

	var ServerReactRootIndex = {
	  createReactRootIndex: function() {
	    return Math.ceil(Math.random() * GLOBAL_MOUNT_POINT_MAX);
	  }
	};

	module.exports = ServerReactRootIndex;


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SimpleEventPlugin
	 */

	'use strict';

	var EventConstants = __webpack_require__(52);
	var EventPluginUtils = __webpack_require__(51);
	var EventPropagators = __webpack_require__(144);
	var SyntheticClipboardEvent = __webpack_require__(187);
	var SyntheticEvent = __webpack_require__(148);
	var SyntheticFocusEvent = __webpack_require__(188);
	var SyntheticKeyboardEvent = __webpack_require__(189);
	var SyntheticMouseEvent = __webpack_require__(156);
	var SyntheticDragEvent = __webpack_require__(192);
	var SyntheticTouchEvent = __webpack_require__(193);
	var SyntheticUIEvent = __webpack_require__(157);
	var SyntheticWheelEvent = __webpack_require__(194);

	var getEventCharCode = __webpack_require__(190);

	var invariant = __webpack_require__(54);
	var keyOf = __webpack_require__(86);
	var warning = __webpack_require__(59);

	var topLevelTypes = EventConstants.topLevelTypes;

	var eventTypes = {
	  blur: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onBlur: true}),
	      captured: keyOf({onBlurCapture: true})
	    }
	  },
	  click: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onClick: true}),
	      captured: keyOf({onClickCapture: true})
	    }
	  },
	  contextMenu: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onContextMenu: true}),
	      captured: keyOf({onContextMenuCapture: true})
	    }
	  },
	  copy: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onCopy: true}),
	      captured: keyOf({onCopyCapture: true})
	    }
	  },
	  cut: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onCut: true}),
	      captured: keyOf({onCutCapture: true})
	    }
	  },
	  doubleClick: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDoubleClick: true}),
	      captured: keyOf({onDoubleClickCapture: true})
	    }
	  },
	  drag: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDrag: true}),
	      captured: keyOf({onDragCapture: true})
	    }
	  },
	  dragEnd: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDragEnd: true}),
	      captured: keyOf({onDragEndCapture: true})
	    }
	  },
	  dragEnter: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDragEnter: true}),
	      captured: keyOf({onDragEnterCapture: true})
	    }
	  },
	  dragExit: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDragExit: true}),
	      captured: keyOf({onDragExitCapture: true})
	    }
	  },
	  dragLeave: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDragLeave: true}),
	      captured: keyOf({onDragLeaveCapture: true})
	    }
	  },
	  dragOver: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDragOver: true}),
	      captured: keyOf({onDragOverCapture: true})
	    }
	  },
	  dragStart: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDragStart: true}),
	      captured: keyOf({onDragStartCapture: true})
	    }
	  },
	  drop: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onDrop: true}),
	      captured: keyOf({onDropCapture: true})
	    }
	  },
	  focus: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onFocus: true}),
	      captured: keyOf({onFocusCapture: true})
	    }
	  },
	  input: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onInput: true}),
	      captured: keyOf({onInputCapture: true})
	    }
	  },
	  keyDown: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onKeyDown: true}),
	      captured: keyOf({onKeyDownCapture: true})
	    }
	  },
	  keyPress: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onKeyPress: true}),
	      captured: keyOf({onKeyPressCapture: true})
	    }
	  },
	  keyUp: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onKeyUp: true}),
	      captured: keyOf({onKeyUpCapture: true})
	    }
	  },
	  load: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onLoad: true}),
	      captured: keyOf({onLoadCapture: true})
	    }
	  },
	  error: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onError: true}),
	      captured: keyOf({onErrorCapture: true})
	    }
	  },
	  // Note: We do not allow listening to mouseOver events. Instead, use the
	  // onMouseEnter/onMouseLeave created by `EnterLeaveEventPlugin`.
	  mouseDown: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onMouseDown: true}),
	      captured: keyOf({onMouseDownCapture: true})
	    }
	  },
	  mouseMove: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onMouseMove: true}),
	      captured: keyOf({onMouseMoveCapture: true})
	    }
	  },
	  mouseOut: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onMouseOut: true}),
	      captured: keyOf({onMouseOutCapture: true})
	    }
	  },
	  mouseOver: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onMouseOver: true}),
	      captured: keyOf({onMouseOverCapture: true})
	    }
	  },
	  mouseUp: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onMouseUp: true}),
	      captured: keyOf({onMouseUpCapture: true})
	    }
	  },
	  paste: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onPaste: true}),
	      captured: keyOf({onPasteCapture: true})
	    }
	  },
	  reset: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onReset: true}),
	      captured: keyOf({onResetCapture: true})
	    }
	  },
	  scroll: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onScroll: true}),
	      captured: keyOf({onScrollCapture: true})
	    }
	  },
	  submit: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onSubmit: true}),
	      captured: keyOf({onSubmitCapture: true})
	    }
	  },
	  touchCancel: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onTouchCancel: true}),
	      captured: keyOf({onTouchCancelCapture: true})
	    }
	  },
	  touchEnd: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onTouchEnd: true}),
	      captured: keyOf({onTouchEndCapture: true})
	    }
	  },
	  touchMove: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onTouchMove: true}),
	      captured: keyOf({onTouchMoveCapture: true})
	    }
	  },
	  touchStart: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onTouchStart: true}),
	      captured: keyOf({onTouchStartCapture: true})
	    }
	  },
	  wheel: {
	    phasedRegistrationNames: {
	      bubbled: keyOf({onWheel: true}),
	      captured: keyOf({onWheelCapture: true})
	    }
	  }
	};

	var topLevelEventsToDispatchConfig = {
	  topBlur:        eventTypes.blur,
	  topClick:       eventTypes.click,
	  topContextMenu: eventTypes.contextMenu,
	  topCopy:        eventTypes.copy,
	  topCut:         eventTypes.cut,
	  topDoubleClick: eventTypes.doubleClick,
	  topDrag:        eventTypes.drag,
	  topDragEnd:     eventTypes.dragEnd,
	  topDragEnter:   eventTypes.dragEnter,
	  topDragExit:    eventTypes.dragExit,
	  topDragLeave:   eventTypes.dragLeave,
	  topDragOver:    eventTypes.dragOver,
	  topDragStart:   eventTypes.dragStart,
	  topDrop:        eventTypes.drop,
	  topError:       eventTypes.error,
	  topFocus:       eventTypes.focus,
	  topInput:       eventTypes.input,
	  topKeyDown:     eventTypes.keyDown,
	  topKeyPress:    eventTypes.keyPress,
	  topKeyUp:       eventTypes.keyUp,
	  topLoad:        eventTypes.load,
	  topMouseDown:   eventTypes.mouseDown,
	  topMouseMove:   eventTypes.mouseMove,
	  topMouseOut:    eventTypes.mouseOut,
	  topMouseOver:   eventTypes.mouseOver,
	  topMouseUp:     eventTypes.mouseUp,
	  topPaste:       eventTypes.paste,
	  topReset:       eventTypes.reset,
	  topScroll:      eventTypes.scroll,
	  topSubmit:      eventTypes.submit,
	  topTouchCancel: eventTypes.touchCancel,
	  topTouchEnd:    eventTypes.touchEnd,
	  topTouchMove:   eventTypes.touchMove,
	  topTouchStart:  eventTypes.touchStart,
	  topWheel:       eventTypes.wheel
	};

	for (var type in topLevelEventsToDispatchConfig) {
	  topLevelEventsToDispatchConfig[type].dependencies = [type];
	}

	var SimpleEventPlugin = {

	  eventTypes: eventTypes,

	  /**
	   * Same as the default implementation, except cancels the event when return
	   * value is false. This behavior will be disabled in a future release.
	   *
	   * @param {object} Event to be dispatched.
	   * @param {function} Application-level callback.
	   * @param {string} domID DOM ID to pass to the callback.
	   */
	  executeDispatch: function(event, listener, domID) {
	    var returnValue = EventPluginUtils.executeDispatch(event, listener, domID);

	    (false ? warning(
	      typeof returnValue !== 'boolean',
	      'Returning `false` from an event handler is deprecated and will be ' +
	      'ignored in a future release. Instead, manually call ' +
	      'e.stopPropagation() or e.preventDefault(), as appropriate.'
	    ) : null);

	    if (returnValue === false) {
	      event.stopPropagation();
	      event.preventDefault();
	    }
	  },

	  /**
	   * @param {string} topLevelType Record from `EventConstants`.
	   * @param {DOMEventTarget} topLevelTarget The listening component root node.
	   * @param {string} topLevelTargetID ID of `topLevelTarget`.
	   * @param {object} nativeEvent Native browser event.
	   * @return {*} An accumulation of synthetic events.
	   * @see {EventPluginHub.extractEvents}
	   */
	  extractEvents: function(
	      topLevelType,
	      topLevelTarget,
	      topLevelTargetID,
	      nativeEvent) {
	    var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
	    if (!dispatchConfig) {
	      return null;
	    }
	    var EventConstructor;
	    switch (topLevelType) {
	      case topLevelTypes.topInput:
	      case topLevelTypes.topLoad:
	      case topLevelTypes.topError:
	      case topLevelTypes.topReset:
	      case topLevelTypes.topSubmit:
	        // HTML Events
	        // @see http://www.w3.org/TR/html5/index.html#events-0
	        EventConstructor = SyntheticEvent;
	        break;
	      case topLevelTypes.topKeyPress:
	        // FireFox creates a keypress event for function keys too. This removes
	        // the unwanted keypress events. Enter is however both printable and
	        // non-printable. One would expect Tab to be as well (but it isn't).
	        if (getEventCharCode(nativeEvent) === 0) {
	          return null;
	        }
	        /* falls through */
	      case topLevelTypes.topKeyDown:
	      case topLevelTypes.topKeyUp:
	        EventConstructor = SyntheticKeyboardEvent;
	        break;
	      case topLevelTypes.topBlur:
	      case topLevelTypes.topFocus:
	        EventConstructor = SyntheticFocusEvent;
	        break;
	      case topLevelTypes.topClick:
	        // Firefox creates a click event on right mouse clicks. This removes the
	        // unwanted click events.
	        if (nativeEvent.button === 2) {
	          return null;
	        }
	        /* falls through */
	      case topLevelTypes.topContextMenu:
	      case topLevelTypes.topDoubleClick:
	      case topLevelTypes.topMouseDown:
	      case topLevelTypes.topMouseMove:
	      case topLevelTypes.topMouseOut:
	      case topLevelTypes.topMouseOver:
	      case topLevelTypes.topMouseUp:
	        EventConstructor = SyntheticMouseEvent;
	        break;
	      case topLevelTypes.topDrag:
	      case topLevelTypes.topDragEnd:
	      case topLevelTypes.topDragEnter:
	      case topLevelTypes.topDragExit:
	      case topLevelTypes.topDragLeave:
	      case topLevelTypes.topDragOver:
	      case topLevelTypes.topDragStart:
	      case topLevelTypes.topDrop:
	        EventConstructor = SyntheticDragEvent;
	        break;
	      case topLevelTypes.topTouchCancel:
	      case topLevelTypes.topTouchEnd:
	      case topLevelTypes.topTouchMove:
	      case topLevelTypes.topTouchStart:
	        EventConstructor = SyntheticTouchEvent;
	        break;
	      case topLevelTypes.topScroll:
	        EventConstructor = SyntheticUIEvent;
	        break;
	      case topLevelTypes.topWheel:
	        EventConstructor = SyntheticWheelEvent;
	        break;
	      case topLevelTypes.topCopy:
	      case topLevelTypes.topCut:
	      case topLevelTypes.topPaste:
	        EventConstructor = SyntheticClipboardEvent;
	        break;
	    }
	    (false ? invariant(
	      EventConstructor,
	      'SimpleEventPlugin: Unhandled event type, `%s`.',
	      topLevelType
	    ) : invariant(EventConstructor));
	    var event = EventConstructor.getPooled(
	      dispatchConfig,
	      topLevelTargetID,
	      nativeEvent
	    );
	    EventPropagators.accumulateTwoPhaseDispatches(event);
	    return event;
	  }

	};

	module.exports = SimpleEventPlugin;


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticClipboardEvent
	 * @typechecks static-only
	 */

	'use strict';

	var SyntheticEvent = __webpack_require__(148);

	/**
	 * @interface Event
	 * @see http://www.w3.org/TR/clipboard-apis/
	 */
	var ClipboardEventInterface = {
	  clipboardData: function(event) {
	    return (
	      'clipboardData' in event ?
	        event.clipboardData :
	        window.clipboardData
	    );
	  }
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticEvent.augmentClass(SyntheticClipboardEvent, ClipboardEventInterface);

	module.exports = SyntheticClipboardEvent;


/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticFocusEvent
	 * @typechecks static-only
	 */

	'use strict';

	var SyntheticUIEvent = __webpack_require__(157);

	/**
	 * @interface FocusEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var FocusEventInterface = {
	  relatedTarget: null
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticUIEvent.augmentClass(SyntheticFocusEvent, FocusEventInterface);

	module.exports = SyntheticFocusEvent;


/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticKeyboardEvent
	 * @typechecks static-only
	 */

	'use strict';

	var SyntheticUIEvent = __webpack_require__(157);

	var getEventCharCode = __webpack_require__(190);
	var getEventKey = __webpack_require__(191);
	var getEventModifierState = __webpack_require__(158);

	/**
	 * @interface KeyboardEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var KeyboardEventInterface = {
	  key: getEventKey,
	  location: null,
	  ctrlKey: null,
	  shiftKey: null,
	  altKey: null,
	  metaKey: null,
	  repeat: null,
	  locale: null,
	  getModifierState: getEventModifierState,
	  // Legacy Interface
	  charCode: function(event) {
	    // `charCode` is the result of a KeyPress event and represents the value of
	    // the actual printable character.

	    // KeyPress is deprecated, but its replacement is not yet final and not
	    // implemented in any major browser. Only KeyPress has charCode.
	    if (event.type === 'keypress') {
	      return getEventCharCode(event);
	    }
	    return 0;
	  },
	  keyCode: function(event) {
	    // `keyCode` is the result of a KeyDown/Up event and represents the value of
	    // physical keyboard key.

	    // The actual meaning of the value depends on the users' keyboard layout
	    // which cannot be detected. Assuming that it is a US keyboard layout
	    // provides a surprisingly accurate mapping for US and European users.
	    // Due to this, it is left to the user to implement at this time.
	    if (event.type === 'keydown' || event.type === 'keyup') {
	      return event.keyCode;
	    }
	    return 0;
	  },
	  which: function(event) {
	    // `which` is an alias for either `keyCode` or `charCode` depending on the
	    // type of the event.
	    if (event.type === 'keypress') {
	      return getEventCharCode(event);
	    }
	    if (event.type === 'keydown' || event.type === 'keyup') {
	      return event.keyCode;
	    }
	    return 0;
	  }
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticKeyboardEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent, KeyboardEventInterface);

	module.exports = SyntheticKeyboardEvent;


/***/ },
/* 190 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getEventCharCode
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * `charCode` represents the actual "character code" and is safe to use with
	 * `String.fromCharCode`. As such, only keys that correspond to printable
	 * characters produce a valid `charCode`, the only exception to this is Enter.
	 * The Tab-key is considered non-printable and does not have a `charCode`,
	 * presumably because it does not produce a tab-character in browsers.
	 *
	 * @param {object} nativeEvent Native browser event.
	 * @return {string} Normalized `charCode` property.
	 */
	function getEventCharCode(nativeEvent) {
	  var charCode;
	  var keyCode = nativeEvent.keyCode;

	  if ('charCode' in nativeEvent) {
	    charCode = nativeEvent.charCode;

	    // FF does not set `charCode` for the Enter-key, check against `keyCode`.
	    if (charCode === 0 && keyCode === 13) {
	      charCode = 13;
	    }
	  } else {
	    // IE8 does not implement `charCode`, but `keyCode` has the correct value.
	    charCode = keyCode;
	  }

	  // Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
	  // Must not discard the (non-)printable Enter-key.
	  if (charCode >= 32 || charCode === 13) {
	    return charCode;
	  }

	  return 0;
	}

	module.exports = getEventCharCode;


/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule getEventKey
	 * @typechecks static-only
	 */

	'use strict';

	var getEventCharCode = __webpack_require__(190);

	/**
	 * Normalization of deprecated HTML5 `key` values
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
	 */
	var normalizeKey = {
	  'Esc': 'Escape',
	  'Spacebar': ' ',
	  'Left': 'ArrowLeft',
	  'Up': 'ArrowUp',
	  'Right': 'ArrowRight',
	  'Down': 'ArrowDown',
	  'Del': 'Delete',
	  'Win': 'OS',
	  'Menu': 'ContextMenu',
	  'Apps': 'ContextMenu',
	  'Scroll': 'ScrollLock',
	  'MozPrintableKey': 'Unidentified'
	};

	/**
	 * Translation from legacy `keyCode` to HTML5 `key`
	 * Only special keys supported, all others depend on keyboard layout or browser
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent#Key_names
	 */
	var translateToKey = {
	  8: 'Backspace',
	  9: 'Tab',
	  12: 'Clear',
	  13: 'Enter',
	  16: 'Shift',
	  17: 'Control',
	  18: 'Alt',
	  19: 'Pause',
	  20: 'CapsLock',
	  27: 'Escape',
	  32: ' ',
	  33: 'PageUp',
	  34: 'PageDown',
	  35: 'End',
	  36: 'Home',
	  37: 'ArrowLeft',
	  38: 'ArrowUp',
	  39: 'ArrowRight',
	  40: 'ArrowDown',
	  45: 'Insert',
	  46: 'Delete',
	  112: 'F1', 113: 'F2', 114: 'F3', 115: 'F4', 116: 'F5', 117: 'F6',
	  118: 'F7', 119: 'F8', 120: 'F9', 121: 'F10', 122: 'F11', 123: 'F12',
	  144: 'NumLock',
	  145: 'ScrollLock',
	  224: 'Meta'
	};

	/**
	 * @param {object} nativeEvent Native browser event.
	 * @return {string} Normalized `key` property.
	 */
	function getEventKey(nativeEvent) {
	  if (nativeEvent.key) {
	    // Normalize inconsistent values reported by browsers due to
	    // implementations of a working draft specification.

	    // FireFox implements `key` but returns `MozPrintableKey` for all
	    // printable characters (normalized to `Unidentified`), ignore it.
	    var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
	    if (key !== 'Unidentified') {
	      return key;
	    }
	  }

	  // Browser does not implement `key`, polyfill as much of it as we can.
	  if (nativeEvent.type === 'keypress') {
	    var charCode = getEventCharCode(nativeEvent);

	    // The enter-key is technically both printable and non-printable and can
	    // thus be captured by `keypress`, no other non-printable key should.
	    return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
	  }
	  if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
	    // While user keyboard layout determines the actual meaning of each
	    // `keyCode` value, almost all function keys have a universal value.
	    return translateToKey[nativeEvent.keyCode] || 'Unidentified';
	  }
	  return '';
	}

	module.exports = getEventKey;


/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticDragEvent
	 * @typechecks static-only
	 */

	'use strict';

	var SyntheticMouseEvent = __webpack_require__(156);

	/**
	 * @interface DragEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var DragEventInterface = {
	  dataTransfer: null
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticDragEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticMouseEvent.augmentClass(SyntheticDragEvent, DragEventInterface);

	module.exports = SyntheticDragEvent;


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticTouchEvent
	 * @typechecks static-only
	 */

	'use strict';

	var SyntheticUIEvent = __webpack_require__(157);

	var getEventModifierState = __webpack_require__(158);

	/**
	 * @interface TouchEvent
	 * @see http://www.w3.org/TR/touch-events/
	 */
	var TouchEventInterface = {
	  touches: null,
	  targetTouches: null,
	  changedTouches: null,
	  altKey: null,
	  metaKey: null,
	  ctrlKey: null,
	  shiftKey: null,
	  getModifierState: getEventModifierState
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticUIEvent}
	 */
	function SyntheticTouchEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticUIEvent.augmentClass(SyntheticTouchEvent, TouchEventInterface);

	module.exports = SyntheticTouchEvent;


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SyntheticWheelEvent
	 * @typechecks static-only
	 */

	'use strict';

	var SyntheticMouseEvent = __webpack_require__(156);

	/**
	 * @interface WheelEvent
	 * @see http://www.w3.org/TR/DOM-Level-3-Events/
	 */
	var WheelEventInterface = {
	  deltaX: function(event) {
	    return (
	      'deltaX' in event ? event.deltaX :
	      // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
	      'wheelDeltaX' in event ? -event.wheelDeltaX : 0
	    );
	  },
	  deltaY: function(event) {
	    return (
	      'deltaY' in event ? event.deltaY :
	      // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
	      'wheelDeltaY' in event ? -event.wheelDeltaY :
	      // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
	      'wheelDelta' in event ? -event.wheelDelta : 0
	    );
	  },
	  deltaZ: null,

	  // Browsers without "deltaMode" is reporting in raw wheel delta where one
	  // notch on the scroll is always +/- 120, roughly equivalent to pixels.
	  // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
	  // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
	  deltaMode: null
	};

	/**
	 * @param {object} dispatchConfig Configuration used to dispatch this event.
	 * @param {string} dispatchMarker Marker identifying the event target.
	 * @param {object} nativeEvent Native browser event.
	 * @extends {SyntheticMouseEvent}
	 */
	function SyntheticWheelEvent(dispatchConfig, dispatchMarker, nativeEvent) {
	  SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
	}

	SyntheticMouseEvent.augmentClass(SyntheticWheelEvent, WheelEventInterface);

	module.exports = SyntheticWheelEvent;


/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule SVGDOMPropertyConfig
	 */

	/*jslint bitwise: true*/

	'use strict';

	var DOMProperty = __webpack_require__(91);

	var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;

	var SVGDOMPropertyConfig = {
	  Properties: {
	    clipPath: MUST_USE_ATTRIBUTE,
	    cx: MUST_USE_ATTRIBUTE,
	    cy: MUST_USE_ATTRIBUTE,
	    d: MUST_USE_ATTRIBUTE,
	    dx: MUST_USE_ATTRIBUTE,
	    dy: MUST_USE_ATTRIBUTE,
	    fill: MUST_USE_ATTRIBUTE,
	    fillOpacity: MUST_USE_ATTRIBUTE,
	    fontFamily: MUST_USE_ATTRIBUTE,
	    fontSize: MUST_USE_ATTRIBUTE,
	    fx: MUST_USE_ATTRIBUTE,
	    fy: MUST_USE_ATTRIBUTE,
	    gradientTransform: MUST_USE_ATTRIBUTE,
	    gradientUnits: MUST_USE_ATTRIBUTE,
	    markerEnd: MUST_USE_ATTRIBUTE,
	    markerMid: MUST_USE_ATTRIBUTE,
	    markerStart: MUST_USE_ATTRIBUTE,
	    offset: MUST_USE_ATTRIBUTE,
	    opacity: MUST_USE_ATTRIBUTE,
	    patternContentUnits: MUST_USE_ATTRIBUTE,
	    patternUnits: MUST_USE_ATTRIBUTE,
	    points: MUST_USE_ATTRIBUTE,
	    preserveAspectRatio: MUST_USE_ATTRIBUTE,
	    r: MUST_USE_ATTRIBUTE,
	    rx: MUST_USE_ATTRIBUTE,
	    ry: MUST_USE_ATTRIBUTE,
	    spreadMethod: MUST_USE_ATTRIBUTE,
	    stopColor: MUST_USE_ATTRIBUTE,
	    stopOpacity: MUST_USE_ATTRIBUTE,
	    stroke: MUST_USE_ATTRIBUTE,
	    strokeDasharray: MUST_USE_ATTRIBUTE,
	    strokeLinecap: MUST_USE_ATTRIBUTE,
	    strokeOpacity: MUST_USE_ATTRIBUTE,
	    strokeWidth: MUST_USE_ATTRIBUTE,
	    textAnchor: MUST_USE_ATTRIBUTE,
	    transform: MUST_USE_ATTRIBUTE,
	    version: MUST_USE_ATTRIBUTE,
	    viewBox: MUST_USE_ATTRIBUTE,
	    x1: MUST_USE_ATTRIBUTE,
	    x2: MUST_USE_ATTRIBUTE,
	    x: MUST_USE_ATTRIBUTE,
	    y1: MUST_USE_ATTRIBUTE,
	    y2: MUST_USE_ATTRIBUTE,
	    y: MUST_USE_ATTRIBUTE
	  },
	  DOMAttributeNames: {
	    clipPath: 'clip-path',
	    fillOpacity: 'fill-opacity',
	    fontFamily: 'font-family',
	    fontSize: 'font-size',
	    gradientTransform: 'gradientTransform',
	    gradientUnits: 'gradientUnits',
	    markerEnd: 'marker-end',
	    markerMid: 'marker-mid',
	    markerStart: 'marker-start',
	    patternContentUnits: 'patternContentUnits',
	    patternUnits: 'patternUnits',
	    preserveAspectRatio: 'preserveAspectRatio',
	    spreadMethod: 'spreadMethod',
	    stopColor: 'stop-color',
	    stopOpacity: 'stop-opacity',
	    strokeDasharray: 'stroke-dasharray',
	    strokeLinecap: 'stroke-linecap',
	    strokeOpacity: 'stroke-opacity',
	    strokeWidth: 'stroke-width',
	    textAnchor: 'text-anchor',
	    viewBox: 'viewBox'
	  }
	};

	module.exports = SVGDOMPropertyConfig;


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule createFullPageComponent
	 * @typechecks
	 */

	'use strict';

	// Defeat circular references by requiring this directly.
	var ReactClass = __webpack_require__(84);
	var ReactElement = __webpack_require__(58);

	var invariant = __webpack_require__(54);

	/**
	 * Create a component that will throw an exception when unmounted.
	 *
	 * Components like <html> <head> and <body> can't be removed or added
	 * easily in a cross-browser way, however it's valuable to be able to
	 * take advantage of React's reconciliation for styling and <title>
	 * management. So we just document it and throw in dangerous cases.
	 *
	 * @param {string} tag The tag to wrap
	 * @return {function} convenience constructor of new component
	 */
	function createFullPageComponent(tag) {
	  var elementFactory = ReactElement.createFactory(tag);

	  var FullPageComponent = ReactClass.createClass({
	    tagName: tag.toUpperCase(),
	    displayName: 'ReactFullPageComponent' + tag,

	    componentWillUnmount: function() {
	      (false ? invariant(
	        false,
	        '%s tried to unmount. Because of cross-browser quirks it is ' +
	        'impossible to unmount some top-level components (eg <html>, <head>, ' +
	        'and <body>) reliably and efficiently. To fix this, have a single ' +
	        'top-level component that never unmounts render these elements.',
	        this.constructor.displayName
	      ) : invariant(false));
	    },

	    render: function() {
	      return elementFactory(this.props);
	    }
	  });

	  return FullPageComponent;
	}

	module.exports = createFullPageComponent;


/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks static-only
	 * @providesModule ReactServerRendering
	 */
	'use strict';

	var ReactElement = __webpack_require__(58);
	var ReactInstanceHandles = __webpack_require__(66);
	var ReactMarkupChecksum = __webpack_require__(124);
	var ReactServerRenderingTransaction =
	  __webpack_require__(198);

	var emptyObject = __webpack_require__(63);
	var instantiateReactComponent = __webpack_require__(130);
	var invariant = __webpack_require__(54);

	/**
	 * @param {ReactElement} element
	 * @return {string} the HTML markup
	 */
	function renderToString(element) {
	  (false ? invariant(
	    ReactElement.isValidElement(element),
	    'renderToString(): You must pass a valid ReactElement.'
	  ) : invariant(ReactElement.isValidElement(element)));

	  var transaction;
	  try {
	    var id = ReactInstanceHandles.createReactRootID();
	    transaction = ReactServerRenderingTransaction.getPooled(false);

	    return transaction.perform(function() {
	      var componentInstance = instantiateReactComponent(element, null);
	      var markup =
	        componentInstance.mountComponent(id, transaction, emptyObject);
	      return ReactMarkupChecksum.addChecksumToMarkup(markup);
	    }, null);
	  } finally {
	    ReactServerRenderingTransaction.release(transaction);
	  }
	}

	/**
	 * @param {ReactElement} element
	 * @return {string} the HTML markup, without the extra React ID and checksum
	 * (for generating static pages)
	 */
	function renderToStaticMarkup(element) {
	  (false ? invariant(
	    ReactElement.isValidElement(element),
	    'renderToStaticMarkup(): You must pass a valid ReactElement.'
	  ) : invariant(ReactElement.isValidElement(element)));

	  var transaction;
	  try {
	    var id = ReactInstanceHandles.createReactRootID();
	    transaction = ReactServerRenderingTransaction.getPooled(true);

	    return transaction.perform(function() {
	      var componentInstance = instantiateReactComponent(element, null);
	      return componentInstance.mountComponent(id, transaction, emptyObject);
	    }, null);
	  } finally {
	    ReactServerRenderingTransaction.release(transaction);
	  }
	}

	module.exports = {
	  renderToString: renderToString,
	  renderToStaticMarkup: renderToStaticMarkup
	};


/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactServerRenderingTransaction
	 * @typechecks
	 */

	'use strict';

	var PooledClass = __webpack_require__(56);
	var CallbackQueue = __webpack_require__(74);
	var ReactPutListenerQueue = __webpack_require__(182);
	var Transaction = __webpack_require__(83);

	var assign = __webpack_require__(62);
	var emptyFunction = __webpack_require__(60);

	/**
	 * Provides a `CallbackQueue` queue for collecting `onDOMReady` callbacks
	 * during the performing of the transaction.
	 */
	var ON_DOM_READY_QUEUEING = {
	  /**
	   * Initializes the internal `onDOMReady` queue.
	   */
	  initialize: function() {
	    this.reactMountReady.reset();
	  },

	  close: emptyFunction
	};

	var PUT_LISTENER_QUEUEING = {
	  initialize: function() {
	    this.putListenerQueue.reset();
	  },

	  close: emptyFunction
	};

	/**
	 * Executed within the scope of the `Transaction` instance. Consider these as
	 * being member methods, but with an implied ordering while being isolated from
	 * each other.
	 */
	var TRANSACTION_WRAPPERS = [
	  PUT_LISTENER_QUEUEING,
	  ON_DOM_READY_QUEUEING
	];

	/**
	 * @class ReactServerRenderingTransaction
	 * @param {boolean} renderToStaticMarkup
	 */
	function ReactServerRenderingTransaction(renderToStaticMarkup) {
	  this.reinitializeTransaction();
	  this.renderToStaticMarkup = renderToStaticMarkup;
	  this.reactMountReady = CallbackQueue.getPooled(null);
	  this.putListenerQueue = ReactPutListenerQueue.getPooled();
	}

	var Mixin = {
	  /**
	   * @see Transaction
	   * @abstract
	   * @final
	   * @return {array} Empty list of operation wrap proceedures.
	   */
	  getTransactionWrappers: function() {
	    return TRANSACTION_WRAPPERS;
	  },

	  /**
	   * @return {object} The queue to collect `onDOMReady` callbacks with.
	   */
	  getReactMountReady: function() {
	    return this.reactMountReady;
	  },

	  getPutListenerQueue: function() {
	    return this.putListenerQueue;
	  },

	  /**
	   * `PooledClass` looks for this, and will invoke this before allowing this
	   * instance to be resused.
	   */
	  destructor: function() {
	    CallbackQueue.release(this.reactMountReady);
	    this.reactMountReady = null;

	    ReactPutListenerQueue.release(this.putListenerQueue);
	    this.putListenerQueue = null;
	  }
	};


	assign(
	  ReactServerRenderingTransaction.prototype,
	  Transaction.Mixin,
	  Mixin
	);

	PooledClass.addPoolingTo(ReactServerRenderingTransaction);

	module.exports = ReactServerRenderingTransaction;


/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule onlyChild
	 */
	'use strict';

	var ReactElement = __webpack_require__(58);

	var invariant = __webpack_require__(54);

	/**
	 * Returns the first child in a collection of children and verifies that there
	 * is only one child in the collection. The current implementation of this
	 * function assumes that a single child gets passed without a wrapper, but the
	 * purpose of this helper function is to abstract away the particular structure
	 * of children.
	 *
	 * @param {?object} children Child collection structure.
	 * @return {ReactComponent} The first and only `ReactComponent` contained in the
	 * structure.
	 */
	function onlyChild(children) {
	  (false ? invariant(
	    ReactElement.isValidElement(children),
	    'onlyChild must be passed a children with exactly one child.'
	  ) : invariant(ReactElement.isValidElement(children)));
	  return children;
	}

	module.exports = onlyChild;


/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(49);

	var _react2 = _interopRequireDefault(_react);

	var _touchstonejs = __webpack_require__(202);

	var _touchstonejs2 = _interopRequireDefault(_touchstonejs);

	__webpack_require__(260);

	var _viewsMangaList = __webpack_require__(201);

	var _viewsMangaList2 = _interopRequireDefault(_viewsMangaList);

	var _viewsMangaDetailsView = __webpack_require__(268);

	var _viewsMangaDetailsView2 = _interopRequireDefault(_viewsMangaDetailsView);

	var _viewsReader = __webpack_require__(269);

	var _viewsReader2 = _interopRequireDefault(_viewsReader);

	var views = {
	  home: _viewsMangaList2['default'],
	  details: _viewsMangaDetailsView2['default'],
	  reader: _viewsReader2['default']
	};

	exports['default'] = _react2['default'].createClass({
	  displayName: 'App',

	  mixins: [_touchstonejs2['default'].createApp(views)],

	  getInitialState: function getInitialState() {
	    return {
	      currentView: 'home'
	    };
	  },

	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      null,
	      this.getCurrentView()
	    );
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(49);

	var _react2 = _interopRequireDefault(_react);

	var _touchstonejs = __webpack_require__(202);

	var _servicesMangaService = __webpack_require__(255);

	var _reactPureRenderMixin = __webpack_require__(256);

	var _reactPureRenderMixin2 = _interopRequireDefault(_reactPureRenderMixin);

	var _reactTappable = __webpack_require__(259);

	var _reactTappable2 = _interopRequireDefault(_reactTappable);

	var formatter = new Intl.DateTimeFormat('en-US');

	var Search = _react2['default'].createClass({
	  displayName: 'Search',

	  mixins: [_reactPureRenderMixin2['default']],
	  propTypes: {
	    searchString: _react2['default'].PropTypes.string,
	    onChange: _react2['default'].PropTypes.func.isRequired
	  },

	  handleChange: function handleChange(event) {
	    this.props.onChange(event.target.value);
	  },

	  reset: function reset() {
	    this.props.onChange('');
	    this.refs.input.getDOMNode().focus();
	  },

	  render: function render() {

	    var clearIcon = this.props.searchString.length ? _react2['default'].createElement(_reactTappable2['default'], { onTap: this.reset, className: 'Headerbar-form-clear ion-close-circled' }) : null;

	    return _react2['default'].createElement(
	      _touchstonejs.UI.Headerbar,
	      { type: 'default', height: '36px', className: 'Headerbar-form Subheader' },
	      _react2['default'].createElement(
	        'div',
	        { className: 'Headerbar-form-field Headerbar-form-icon ion-ios7-search-strong' },
	        _react2['default'].createElement('input', {
	          ref: 'input',
	          value: this.props.searchString,
	          onChange: this.handleChange,
	          className: 'Headerbar-form-input',
	          placeholder: 'Search...' }),
	        clearIcon
	      )
	    );
	  }
	});

	var Item = _react2['default'].createClass({
	  displayName: 'Item',

	  mixins: [_touchstonejs.Navigation, _reactPureRenderMixin2['default']],
	  render: function render() {
	    var _props = this.props;
	    var title = _props.title;
	    var image = _props.image;
	    var lastChapterDate = _props.lastChapterDate;
	    var isFavorite = _props.isFavorite;
	    var fromFavorite = _props.fromFavorite;

	    var dateFormatted = undefined;
	    try {
	      dateFormatted = formatter.format(new Date(lastChapterDate * 1000));
	    } catch (e) {
	      dateFormatted = null;
	    }

	    return _react2['default'].createElement(
	      _touchstonejs.Link,
	      {
	        to: 'details',
	        viewTransition: 'show-from-right',
	        params: { mangaId: this.props.id, mangaTitle: this.props.title, isFavorite: isFavorite, fromFavorite: fromFavorite },
	        className: 'list-item manga-item is-tappable' },
	      _react2['default'].createElement(
	        'div',
	        { className: 'item-inner is-tappable' },
	        _react2['default'].createElement('img', { className: 'manga-item-img', src: image }),
	        _react2['default'].createElement(
	          'div',
	          { className: 'manga-item-title' },
	          title
	        ),
	        _react2['default'].createElement(
	          'div',
	          { className: 'manga-item-date' },
	          dateFormatted
	        )
	      )
	    );
	  }
	});

	var List = _react2['default'].createClass({
	  displayName: 'List',

	  mixins: [_reactPureRenderMixin2['default']],
	  getDefaultProps: function getDefaultProps() {
	    return {
	      searchString: '',
	      mangas: [],
	      pageNumber: 1,
	      favorites: {}
	    };
	  },

	  render: function render() {
	    var _props2 = this.props;
	    var searchString = _props2.searchString;
	    var mangas = _props2.mangas;
	    var pageNumber = _props2.pageNumber;
	    var favorites = _props2.favorites;
	    var isFavorite = _props2.isFavorite;

	    var filteredMangas = mangas.slice().sort(function (a, b) {
	      return b.lastChapterDate - a.lastChapterDate;
	    }).filter(function (manga) {
	      return manga.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
	    });
	    if (isFavorite) {
	      filteredMangas = filteredMangas.filter(function (manga) {
	        return favorites[manga.id];
	      });
	    }
	    var slicedMangas = filteredMangas.slice(0, pageNumber * 20);

	    if (!slicedMangas.length) {
	      return _react2['default'].createElement(
	        'div',
	        { className: 'view-feedback' },
	        _react2['default'].createElement(
	          'div',
	          { className: 'view-feedback-text' },
	          isFavorite ? 'You have no favorite manga!' : 'No match found...'
	        )
	      );
	    }
	    var mangasItems = slicedMangas.map(function (manga) {
	      return _react2['default'].createElement(Item, _extends({ key: manga.id }, manga, { isFavorite: favorites[manga.id], fromFavorite: isFavorite }));
	    });

	    var seeMore = filteredMangas.length !== slicedMangas.length && _react2['default'].createElement(
	      _reactTappable2['default'],
	      { onTap: this.props.onSeeMore, className: 'panel-button manga-list-seemore', component: 'button' },
	      'See More ...'
	    );
	    return _react2['default'].createElement(
	      'div',
	      { className: 'panel mb-0' },
	      mangasItems,
	      seeMore
	    );
	  }
	});

	var MangaList = _react2['default'].createClass({
	  displayName: 'MangaList',

	  mixins: [_touchstonejs.Navigation, _reactPureRenderMixin2['default']],

	  getDefaultProps: function getDefaultProps() {
	    return { isFavorite: false };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      mangas: [],
	      searchString: '',
	      pageNumber: 1,
	      isFavorite: this.props.isFavorite,
	      favorites: (0, _servicesMangaService.getFavorites)()
	    };
	  },

	  componentWillMount: function componentWillMount() {
	    var _this = this;

	    (0, _servicesMangaService.fetchMangas)().then(function (mangas) {
	      return _this.setState({ mangas: mangas });
	    });
	  },

	  updateSearch: function updateSearch(str) {
	    this.setState({ searchString: str, pageNumber: 1 });
	  },

	  onSeeMore: function onSeeMore() {
	    this.setState({ pageNumber: this.state.pageNumber + 1 });
	  },

	  goToMainList: function goToMainList() {
	    this.setState({ searchString: '', pageNumber: 1, isFavorite: false });
	  },

	  goToFavorite: function goToFavorite() {
	    this.setState({ searchString: '', pageNumber: 1, isFavorite: true });
	  },

	  render: function render() {
	    var _state = this.state;
	    var mangas = _state.mangas;
	    var pageNumber = _state.pageNumber;
	    var isFavorite = _state.isFavorite;
	    var searchString = _state.searchString;
	    var favorites = _state.favorites;

	    return _react2['default'].createElement(
	      _touchstonejs.UI.View,
	      null,
	      _react2['default'].createElement(_touchstonejs.UI.Headerbar, { type: 'default', label: isFavorite ? 'Favorites' : 'Mangas ' }),
	      !isFavorite && _react2['default'].createElement(Search, { searchString: searchString, onChange: this.updateSearch }),
	      _react2['default'].createElement(
	        _touchstonejs.UI.ViewContent,
	        { grow: true, scrollable: true },
	        _react2['default'].createElement(List, { mangas: mangas, favorites: favorites, isFavorite: isFavorite,
	          searchString: searchString, pageNumber: pageNumber, onSeeMore: this.onSeeMore })
	      ),
	      _react2['default'].createElement(
	        _touchstonejs.UI.Footerbar,
	        { type: 'default' },
	        _react2['default'].createElement(_touchstonejs.UI.FooterbarButton, { icon: 'ion-ios-list-outline',
	          active: !isFavorite, label: 'Mangas', onTap: this.goToMainList }),
	        _react2['default'].createElement(_touchstonejs.UI.FooterbarButton, { icon: 'ion-ios-star', label: 'Favorites',
	          active: isFavorite, onTap: this.goToFavorite })
	      )
	    );
	  }
	});

	exports['default'] = MangaList;
	module.exports = exports['default'];

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	var Touchstone = {
		createApp: __webpack_require__(203),
		Navigation: __webpack_require__(228),
		Link: __webpack_require__(254),
		UI: __webpack_require__(222)
	};

	module.exports = Touchstone;


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var xtend = __webpack_require__(204);
	var React = __webpack_require__(205);
	var UI = __webpack_require__(222);

	var DEFAULT_TRANSITION = 'none';
	var TRANSITIONS = __webpack_require__(253);

	/**
	 * Touchstone App
	 * ==============
	 *
	 * This function should be called with your app's views.
	 *
	 * It returns a Mixin which should be added to your App.
	 */
	function createApp(views) {
		return {
			componentWillMount: function componentWillMount() {
				this.views = {};

				for (var viewName in views) {
					var view = views[viewName];
					this.views[viewName] = React.createFactory(view);
				}
			},

			childContextTypes: {
				currentView: React.PropTypes.string,
				app: React.PropTypes.object.isRequired
			},

			getChildContext: function getChildContext() {
				return {
					currentView: this.state.currentView,
					app: this
				};
			},

			getCurrentView: function getCurrentView() {
				var viewsData = {};
				viewsData[this.state.currentView] = this.getView(this.state.currentView);
				var views = React.addons.createFragment(viewsData);
				return views;
			},

			getInitialState: function getInitialState() {
				return {
					viewTransition: this.getViewTransition(DEFAULT_TRANSITION)
				};
			},

			getView: function getView(key) {
				var view = views[key];
				if (!view) return this.getViewNotFound();

				var givenProps = this.state[key + '_props'];
				var props = xtend({
					key: key,
					app: this,
					viewClassName: this.state[key + '_class'] || 'view'
				}, givenProps);

				if (this.getViewProps) {
					xtend(props, this.getViewProps());
				}

				return React.createElement(view, props);
			},

			getViewNotFound: function getViewNotFound() {
				return React.createElement(
					UI.View,
					{ className: 'view' },
					React.createElement(
						UI.ViewContent,
						null,
						React.createElement(UI.Feedback, {
							iconKey: 'ion-alert-circled',
							iconType: 'danger',
							text: 'Sorry, the view <strong>"' + this.state.currentView + '"</strong> is not available.',
							actionText: 'Okay, take me home',
							actionFn: this.gotoDefaultView
						})
					)
				);
			},

			getViewTransition: function getViewTransition(key) {
				if (!TRANSITIONS[key]) {
					console.log('Invalid View Transition: ' + key);
					key = 'none';
				}

				return xtend({
					key: key,
					name: 'view-transition-' + key,
					'in': false,
					out: false
				}, TRANSITIONS[key]);
			},

			showView: function showView(key, transition, props, state) {
				if (typeof transition === 'object') {
					props = transition;
					transition = DEFAULT_TRANSITION;
				}

				if (typeof transition !== 'string') {
					transition = DEFAULT_TRANSITION;
				}

				console.log('Showing view |' + key + '| with transition |' + transition + '| and props ' + JSON.stringify(props));

				var newState = {
					currentView: key,
					previousView: this.state.currentView,
					viewTransition: this.getViewTransition(transition)
				};

				newState[key + '_class'] = 'view';
				newState[key + '_props'] = props || {};

				xtend(newState, state);

				this.setState(newState);
			}
		};
	}

	module.exports = createApp;

/***/ },
/* 204 */
/***/ function(module, exports) {

	module.exports = extend

	function extend(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i]

	        for (var key in source) {
	            if (source.hasOwnProperty(key)) {
	                target[key] = source[key]
	            }
	        }
	    }

	    return target
	}


/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(206);


/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactWithAddons
	 */

	/**
	 * This module exists purely in the open source project, and is meant as a way
	 * to create a separate standalone build of React. This build has "addons", or
	 * functionality we've built and think might be useful but doesn't have a good
	 * place to live inside React core.
	 */

	'use strict';

	var LinkedStateMixin = __webpack_require__(212);
	var React = __webpack_require__(50);
	var ReactComponentWithPureRenderMixin =
	  __webpack_require__(215);
	var ReactCSSTransitionGroup = __webpack_require__(216);
	var ReactFragment = __webpack_require__(57);
	var ReactTransitionGroup = __webpack_require__(207);
	var ReactUpdates = __webpack_require__(73);

	var cx = __webpack_require__(220);
	var cloneWithProps = __webpack_require__(209);
	var update = __webpack_require__(221);

	React.addons = {
	  CSSTransitionGroup: ReactCSSTransitionGroup,
	  LinkedStateMixin: LinkedStateMixin,
	  PureRenderMixin: ReactComponentWithPureRenderMixin,
	  TransitionGroup: ReactTransitionGroup,

	  batchedUpdates: ReactUpdates.batchedUpdates,
	  classSet: cx,
	  cloneWithProps: cloneWithProps,
	  createFragment: ReactFragment.create,
	  update: update
	};

	if (false) {
	  React.addons.Perf = require("./ReactDefaultPerf");
	  React.addons.TestUtils = require("./ReactTestUtils");
	}

	module.exports = React;


/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactTransitionGroup
	 */

	'use strict';

	var React = __webpack_require__(50);
	var ReactTransitionChildMapping = __webpack_require__(208);

	var assign = __webpack_require__(62);
	var cloneWithProps = __webpack_require__(209);
	var emptyFunction = __webpack_require__(60);

	var ReactTransitionGroup = React.createClass({
	  displayName: 'ReactTransitionGroup',

	  propTypes: {
	    component: React.PropTypes.any,
	    childFactory: React.PropTypes.func
	  },

	  getDefaultProps: function() {
	    return {
	      component: 'span',
	      childFactory: emptyFunction.thatReturnsArgument
	    };
	  },

	  getInitialState: function() {
	    return {
	      children: ReactTransitionChildMapping.getChildMapping(this.props.children)
	    };
	  },

	  componentWillMount: function() {
	    this.currentlyTransitioningKeys = {};
	    this.keysToEnter = [];
	    this.keysToLeave = [];
	  },

	  componentDidMount: function() {
	    var initialChildMapping = this.state.children;
	    for (var key in initialChildMapping) {
	      if (initialChildMapping[key]) {
	        this.performAppear(key);
	      }
	    }
	  },

	  componentWillReceiveProps: function(nextProps) {
	    var nextChildMapping = ReactTransitionChildMapping.getChildMapping(
	      nextProps.children
	    );
	    var prevChildMapping = this.state.children;

	    this.setState({
	      children: ReactTransitionChildMapping.mergeChildMappings(
	        prevChildMapping,
	        nextChildMapping
	      )
	    });

	    var key;

	    for (key in nextChildMapping) {
	      var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
	      if (nextChildMapping[key] && !hasPrev &&
	          !this.currentlyTransitioningKeys[key]) {
	        this.keysToEnter.push(key);
	      }
	    }

	    for (key in prevChildMapping) {
	      var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
	      if (prevChildMapping[key] && !hasNext &&
	          !this.currentlyTransitioningKeys[key]) {
	        this.keysToLeave.push(key);
	      }
	    }

	    // If we want to someday check for reordering, we could do it here.
	  },

	  componentDidUpdate: function() {
	    var keysToEnter = this.keysToEnter;
	    this.keysToEnter = [];
	    keysToEnter.forEach(this.performEnter);

	    var keysToLeave = this.keysToLeave;
	    this.keysToLeave = [];
	    keysToLeave.forEach(this.performLeave);
	  },

	  performAppear: function(key) {
	    this.currentlyTransitioningKeys[key] = true;

	    var component = this.refs[key];

	    if (component.componentWillAppear) {
	      component.componentWillAppear(
	        this._handleDoneAppearing.bind(this, key)
	      );
	    } else {
	      this._handleDoneAppearing(key);
	    }
	  },

	  _handleDoneAppearing: function(key) {
	    var component = this.refs[key];
	    if (component.componentDidAppear) {
	      component.componentDidAppear();
	    }

	    delete this.currentlyTransitioningKeys[key];

	    var currentChildMapping = ReactTransitionChildMapping.getChildMapping(
	      this.props.children
	    );

	    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
	      // This was removed before it had fully appeared. Remove it.
	      this.performLeave(key);
	    }
	  },

	  performEnter: function(key) {
	    this.currentlyTransitioningKeys[key] = true;

	    var component = this.refs[key];

	    if (component.componentWillEnter) {
	      component.componentWillEnter(
	        this._handleDoneEntering.bind(this, key)
	      );
	    } else {
	      this._handleDoneEntering(key);
	    }
	  },

	  _handleDoneEntering: function(key) {
	    var component = this.refs[key];
	    if (component.componentDidEnter) {
	      component.componentDidEnter();
	    }

	    delete this.currentlyTransitioningKeys[key];

	    var currentChildMapping = ReactTransitionChildMapping.getChildMapping(
	      this.props.children
	    );

	    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
	      // This was removed before it had fully entered. Remove it.
	      this.performLeave(key);
	    }
	  },

	  performLeave: function(key) {
	    this.currentlyTransitioningKeys[key] = true;

	    var component = this.refs[key];
	    if (component.componentWillLeave) {
	      component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
	    } else {
	      // Note that this is somewhat dangerous b/c it calls setState()
	      // again, effectively mutating the component before all the work
	      // is done.
	      this._handleDoneLeaving(key);
	    }
	  },

	  _handleDoneLeaving: function(key) {
	    var component = this.refs[key];

	    if (component.componentDidLeave) {
	      component.componentDidLeave();
	    }

	    delete this.currentlyTransitioningKeys[key];

	    var currentChildMapping = ReactTransitionChildMapping.getChildMapping(
	      this.props.children
	    );

	    if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
	      // This entered again before it fully left. Add it again.
	      this.performEnter(key);
	    } else {
	      var newChildren = assign({}, this.state.children);
	      delete newChildren[key];
	      this.setState({children: newChildren});
	    }
	  },

	  render: function() {
	    // TODO: we could get rid of the need for the wrapper node
	    // by cloning a single child
	    var childrenToRender = [];
	    for (var key in this.state.children) {
	      var child = this.state.children[key];
	      if (child) {
	        // You may need to apply reactive updates to a child as it is leaving.
	        // The normal React way to do it won't work since the child will have
	        // already been removed. In case you need this behavior you can provide
	        // a childFactory function to wrap every child, even the ones that are
	        // leaving.
	        childrenToRender.push(cloneWithProps(
	          this.props.childFactory(child),
	          {ref: key, key: key}
	        ));
	      }
	    }
	    return React.createElement(
	      this.props.component,
	      this.props,
	      childrenToRender
	    );
	  }
	});

	module.exports = ReactTransitionGroup;


/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks static-only
	 * @providesModule ReactTransitionChildMapping
	 */

	'use strict';

	var ReactChildren = __webpack_require__(55);
	var ReactFragment = __webpack_require__(57);

	var ReactTransitionChildMapping = {
	  /**
	   * Given `this.props.children`, return an object mapping key to child. Just
	   * simple syntactic sugar around ReactChildren.map().
	   *
	   * @param {*} children `this.props.children`
	   * @return {object} Mapping of key to child
	   */
	  getChildMapping: function(children) {
	    if (!children) {
	      return children;
	    }
	    return ReactFragment.extract(ReactChildren.map(children, function(child) {
	      return child;
	    }));
	  },

	  /**
	   * When you're adding or removing children some may be added or removed in the
	   * same render pass. We want to show *both* since we want to simultaneously
	   * animate elements in and out. This function takes a previous set of keys
	   * and a new set of keys and merges them with its best guess of the correct
	   * ordering. In the future we may expose some of the utilities in
	   * ReactMultiChild to make this easy, but for now React itself does not
	   * directly have this concept of the union of prevChildren and nextChildren
	   * so we implement it here.
	   *
	   * @param {object} prev prev children as returned from
	   * `ReactTransitionChildMapping.getChildMapping()`.
	   * @param {object} next next children as returned from
	   * `ReactTransitionChildMapping.getChildMapping()`.
	   * @return {object} a key set that contains all keys in `prev` and all keys
	   * in `next` in a reasonable order.
	   */
	  mergeChildMappings: function(prev, next) {
	    prev = prev || {};
	    next = next || {};

	    function getValueForKey(key) {
	      if (next.hasOwnProperty(key)) {
	        return next[key];
	      } else {
	        return prev[key];
	      }
	    }

	    // For each key of `next`, the list of keys to insert before that key in
	    // the combined list
	    var nextKeysPending = {};

	    var pendingKeys = [];
	    for (var prevKey in prev) {
	      if (next.hasOwnProperty(prevKey)) {
	        if (pendingKeys.length) {
	          nextKeysPending[prevKey] = pendingKeys;
	          pendingKeys = [];
	        }
	      } else {
	        pendingKeys.push(prevKey);
	      }
	    }

	    var i;
	    var childMapping = {};
	    for (var nextKey in next) {
	      if (nextKeysPending.hasOwnProperty(nextKey)) {
	        for (i = 0; i < nextKeysPending[nextKey].length; i++) {
	          var pendingNextKey = nextKeysPending[nextKey][i];
	          childMapping[nextKeysPending[nextKey][i]] = getValueForKey(
	            pendingNextKey
	          );
	        }
	      }
	      childMapping[nextKey] = getValueForKey(nextKey);
	    }

	    // Finally, add the keys which didn't appear before any key in `next`
	    for (i = 0; i < pendingKeys.length; i++) {
	      childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
	    }

	    return childMapping;
	  }
	};

	module.exports = ReactTransitionChildMapping;


/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks static-only
	 * @providesModule cloneWithProps
	 */

	'use strict';

	var ReactElement = __webpack_require__(58);
	var ReactPropTransferer = __webpack_require__(210);

	var keyOf = __webpack_require__(86);
	var warning = __webpack_require__(59);

	var CHILDREN_PROP = keyOf({children: null});

	/**
	 * Sometimes you want to change the props of a child passed to you. Usually
	 * this is to add a CSS class.
	 *
	 * @param {ReactElement} child child element you'd like to clone
	 * @param {object} props props you'd like to modify. className and style will be
	 * merged automatically.
	 * @return {ReactElement} a clone of child with props merged in.
	 */
	function cloneWithProps(child, props) {
	  if (false) {
	    ("production" !== process.env.NODE_ENV ? warning(
	      !child.ref,
	      'You are calling cloneWithProps() on a child with a ref. This is ' +
	      'dangerous because you\'re creating a new child which will not be ' +
	      'added as a ref to its parent.'
	    ) : null);
	  }

	  var newProps = ReactPropTransferer.mergeProps(props, child.props);

	  // Use `child.props.children` if it is provided.
	  if (!newProps.hasOwnProperty(CHILDREN_PROP) &&
	      child.props.hasOwnProperty(CHILDREN_PROP)) {
	    newProps.children = child.props.children;
	  }

	  // The current API doesn't retain _owner and _context, which is why this
	  // doesn't use ReactElement.cloneAndReplaceProps.
	  return ReactElement.createElement(child.type, newProps);
	}

	module.exports = cloneWithProps;


/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactPropTransferer
	 */

	'use strict';

	var assign = __webpack_require__(62);
	var emptyFunction = __webpack_require__(60);
	var joinClasses = __webpack_require__(211);

	/**
	 * Creates a transfer strategy that will merge prop values using the supplied
	 * `mergeStrategy`. If a prop was previously unset, this just sets it.
	 *
	 * @param {function} mergeStrategy
	 * @return {function}
	 */
	function createTransferStrategy(mergeStrategy) {
	  return function(props, key, value) {
	    if (!props.hasOwnProperty(key)) {
	      props[key] = value;
	    } else {
	      props[key] = mergeStrategy(props[key], value);
	    }
	  };
	}

	var transferStrategyMerge = createTransferStrategy(function(a, b) {
	  // `merge` overrides the first object's (`props[key]` above) keys using the
	  // second object's (`value`) keys. An object's style's existing `propA` would
	  // get overridden. Flip the order here.
	  return assign({}, b, a);
	});

	/**
	 * Transfer strategies dictate how props are transferred by `transferPropsTo`.
	 * NOTE: if you add any more exceptions to this list you should be sure to
	 * update `cloneWithProps()` accordingly.
	 */
	var TransferStrategies = {
	  /**
	   * Never transfer `children`.
	   */
	  children: emptyFunction,
	  /**
	   * Transfer the `className` prop by merging them.
	   */
	  className: createTransferStrategy(joinClasses),
	  /**
	   * Transfer the `style` prop (which is an object) by merging them.
	   */
	  style: transferStrategyMerge
	};

	/**
	 * Mutates the first argument by transferring the properties from the second
	 * argument.
	 *
	 * @param {object} props
	 * @param {object} newProps
	 * @return {object}
	 */
	function transferInto(props, newProps) {
	  for (var thisKey in newProps) {
	    if (!newProps.hasOwnProperty(thisKey)) {
	      continue;
	    }

	    var transferStrategy = TransferStrategies[thisKey];

	    if (transferStrategy && TransferStrategies.hasOwnProperty(thisKey)) {
	      transferStrategy(props, thisKey, newProps[thisKey]);
	    } else if (!props.hasOwnProperty(thisKey)) {
	      props[thisKey] = newProps[thisKey];
	    }
	  }
	  return props;
	}

	/**
	 * ReactPropTransferer are capable of transferring props to another component
	 * using a `transferPropsTo` method.
	 *
	 * @class ReactPropTransferer
	 */
	var ReactPropTransferer = {

	  /**
	   * Merge two props objects using TransferStrategies.
	   *
	   * @param {object} oldProps original props (they take precedence)
	   * @param {object} newProps new props to merge in
	   * @return {object} a new object containing both sets of props merged.
	   */
	  mergeProps: function(oldProps, newProps) {
	    return transferInto(assign({}, oldProps), newProps);
	  }

	};

	module.exports = ReactPropTransferer;


/***/ },
/* 211 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule joinClasses
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * Combines multiple className strings into one.
	 * http://jsperf.com/joinclasses-args-vs-array
	 *
	 * @param {...?string} classes
	 * @return {string}
	 */
	function joinClasses(className/*, ... */) {
	  if (!className) {
	    className = '';
	  }
	  var nextClass;
	  var argLength = arguments.length;
	  if (argLength > 1) {
	    for (var ii = 1; ii < argLength; ii++) {
	      nextClass = arguments[ii];
	      if (nextClass) {
	        className = (className ? className + ' ' : '') + nextClass;
	      }
	    }
	  }
	  return className;
	}

	module.exports = joinClasses;


/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule LinkedStateMixin
	 * @typechecks static-only
	 */

	'use strict';

	var ReactLink = __webpack_require__(213);
	var ReactStateSetters = __webpack_require__(214);

	/**
	 * A simple mixin around ReactLink.forState().
	 */
	var LinkedStateMixin = {
	  /**
	   * Create a ReactLink that's linked to part of this component's state. The
	   * ReactLink will have the current value of this.state[key] and will call
	   * setState() when a change is requested.
	   *
	   * @param {string} key state key to update. Note: you may want to use keyOf()
	   * if you're using Google Closure Compiler advanced mode.
	   * @return {ReactLink} ReactLink instance linking to the state.
	   */
	  linkState: function(key) {
	    return new ReactLink(
	      this.state[key],
	      ReactStateSetters.createStateKeySetter(this, key)
	    );
	  }
	};

	module.exports = LinkedStateMixin;


/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactLink
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * ReactLink encapsulates a common pattern in which a component wants to modify
	 * a prop received from its parent. ReactLink allows the parent to pass down a
	 * value coupled with a callback that, when invoked, expresses an intent to
	 * modify that value. For example:
	 *
	 * React.createClass({
	 *   getInitialState: function() {
	 *     return {value: ''};
	 *   },
	 *   render: function() {
	 *     var valueLink = new ReactLink(this.state.value, this._handleValueChange);
	 *     return <input valueLink={valueLink} />;
	 *   },
	 *   this._handleValueChange: function(newValue) {
	 *     this.setState({value: newValue});
	 *   }
	 * });
	 *
	 * We have provided some sugary mixins to make the creation and
	 * consumption of ReactLink easier; see LinkedValueUtils and LinkedStateMixin.
	 */

	var React = __webpack_require__(50);

	/**
	 * @param {*} value current value of the link
	 * @param {function} requestChange callback to request a change
	 */
	function ReactLink(value, requestChange) {
	  this.value = value;
	  this.requestChange = requestChange;
	}

	/**
	 * Creates a PropType that enforces the ReactLink API and optionally checks the
	 * type of the value being passed inside the link. Example:
	 *
	 * MyComponent.propTypes = {
	 *   tabIndexLink: ReactLink.PropTypes.link(React.PropTypes.number)
	 * }
	 */
	function createLinkTypeChecker(linkType) {
	  var shapes = {
	    value: typeof linkType === 'undefined' ?
	      React.PropTypes.any.isRequired :
	      linkType.isRequired,
	    requestChange: React.PropTypes.func.isRequired
	  };
	  return React.PropTypes.shape(shapes);
	}

	ReactLink.PropTypes = {
	  link: createLinkTypeChecker
	};

	module.exports = ReactLink;


/***/ },
/* 214 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactStateSetters
	 */

	'use strict';

	var ReactStateSetters = {
	  /**
	   * Returns a function that calls the provided function, and uses the result
	   * of that to set the component's state.
	   *
	   * @param {ReactCompositeComponent} component
	   * @param {function} funcReturningState Returned callback uses this to
	   *                                      determine how to update state.
	   * @return {function} callback that when invoked uses funcReturningState to
	   *                    determined the object literal to setState.
	   */
	  createStateSetter: function(component, funcReturningState) {
	    return function(a, b, c, d, e, f) {
	      var partialState = funcReturningState.call(component, a, b, c, d, e, f);
	      if (partialState) {
	        component.setState(partialState);
	      }
	    };
	  },

	  /**
	   * Returns a single-argument callback that can be used to update a single
	   * key in the component's state.
	   *
	   * Note: this is memoized function, which makes it inexpensive to call.
	   *
	   * @param {ReactCompositeComponent} component
	   * @param {string} key The key in the state that you should update.
	   * @return {function} callback of 1 argument which calls setState() with
	   *                    the provided keyName and callback argument.
	   */
	  createStateKeySetter: function(component, key) {
	    // Memoize the setters.
	    var cache = component.__keySetters || (component.__keySetters = {});
	    return cache[key] || (cache[key] = createStateKeySetter(component, key));
	  }
	};

	function createStateKeySetter(component, key) {
	  // Partial state is allocated outside of the function closure so it can be
	  // reused with every call, avoiding memory allocation when this function
	  // is called.
	  var partialState = {};
	  return function stateKeySetter(value) {
	    partialState[key] = value;
	    component.setState(partialState);
	  };
	}

	ReactStateSetters.Mixin = {
	  /**
	   * Returns a function that calls the provided function, and uses the result
	   * of that to set the component's state.
	   *
	   * For example, these statements are equivalent:
	   *
	   *   this.setState({x: 1});
	   *   this.createStateSetter(function(xValue) {
	   *     return {x: xValue};
	   *   })(1);
	   *
	   * @param {function} funcReturningState Returned callback uses this to
	   *                                      determine how to update state.
	   * @return {function} callback that when invoked uses funcReturningState to
	   *                    determined the object literal to setState.
	   */
	  createStateSetter: function(funcReturningState) {
	    return ReactStateSetters.createStateSetter(this, funcReturningState);
	  },

	  /**
	   * Returns a single-argument callback that can be used to update a single
	   * key in the component's state.
	   *
	   * For example, these statements are equivalent:
	   *
	   *   this.setState({x: 1});
	   *   this.createStateKeySetter('x')(1);
	   *
	   * Note: this is memoized function, which makes it inexpensive to call.
	   *
	   * @param {string} key The key in the state that you should update.
	   * @return {function} callback of 1 argument which calls setState() with
	   *                    the provided keyName and callback argument.
	   */
	  createStateKeySetter: function(key) {
	    return ReactStateSetters.createStateKeySetter(this, key);
	  }
	};

	module.exports = ReactStateSetters;


/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	* @providesModule ReactComponentWithPureRenderMixin
	*/

	'use strict';

	var shallowEqual = __webpack_require__(184);

	/**
	 * If your React component's render function is "pure", e.g. it will render the
	 * same result given the same props and state, provide this Mixin for a
	 * considerable performance boost.
	 *
	 * Most React components have pure render functions.
	 *
	 * Example:
	 *
	 *   var ReactComponentWithPureRenderMixin =
	 *     require('ReactComponentWithPureRenderMixin');
	 *   React.createClass({
	 *     mixins: [ReactComponentWithPureRenderMixin],
	 *
	 *     render: function() {
	 *       return <div className={this.props.className}>foo</div>;
	 *     }
	 *   });
	 *
	 * Note: This only checks shallow equality for props and state. If these contain
	 * complex data structures this mixin may have false-negatives for deeper
	 * differences. Only mixin to components which have simple props and state, or
	 * use `forceUpdate()` when you know deep data structures have changed.
	 */
	var ReactComponentWithPureRenderMixin = {
	  shouldComponentUpdate: function(nextProps, nextState) {
	    return !shallowEqual(this.props, nextProps) ||
	           !shallowEqual(this.state, nextState);
	  }
	};

	module.exports = ReactComponentWithPureRenderMixin;


/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 * @providesModule ReactCSSTransitionGroup
	 */

	'use strict';

	var React = __webpack_require__(50);

	var assign = __webpack_require__(62);

	var ReactTransitionGroup = React.createFactory(
	  __webpack_require__(207)
	);
	var ReactCSSTransitionGroupChild = React.createFactory(
	  __webpack_require__(217)
	);

	var ReactCSSTransitionGroup = React.createClass({
	  displayName: 'ReactCSSTransitionGroup',

	  propTypes: {
	    transitionName: React.PropTypes.string.isRequired,
	    transitionAppear: React.PropTypes.bool,
	    transitionEnter: React.PropTypes.bool,
	    transitionLeave: React.PropTypes.bool
	  },

	  getDefaultProps: function() {
	    return {
	      transitionAppear: false,
	      transitionEnter: true,
	      transitionLeave: true
	    };
	  },

	  _wrapChild: function(child) {
	    // We need to provide this childFactory so that
	    // ReactCSSTransitionGroupChild can receive updates to name, enter, and
	    // leave while it is leaving.
	    return ReactCSSTransitionGroupChild(
	      {
	        name: this.props.transitionName,
	        appear: this.props.transitionAppear,
	        enter: this.props.transitionEnter,
	        leave: this.props.transitionLeave
	      },
	      child
	    );
	  },

	  render: function() {
	    return (
	      ReactTransitionGroup(
	        assign({}, this.props, {childFactory: this._wrapChild})
	      )
	    );
	  }
	});

	module.exports = ReactCSSTransitionGroup;


/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @typechecks
	 * @providesModule ReactCSSTransitionGroupChild
	 */

	'use strict';

	var React = __webpack_require__(50);

	var CSSCore = __webpack_require__(218);
	var ReactTransitionEvents = __webpack_require__(219);

	var onlyChild = __webpack_require__(199);
	var warning = __webpack_require__(59);

	// We don't remove the element from the DOM until we receive an animationend or
	// transitionend event. If the user screws up and forgets to add an animation
	// their node will be stuck in the DOM forever, so we detect if an animation
	// does not start and if it doesn't, we just call the end listener immediately.
	var TICK = 17;
	var NO_EVENT_TIMEOUT = 5000;

	var noEventListener = null;


	if (false) {
	  noEventListener = function() {
	    ("production" !== process.env.NODE_ENV ? warning(
	      false,
	      'transition(): tried to perform an animation without ' +
	      'an animationend or transitionend event after timeout (' +
	      '%sms). You should either disable this ' +
	      'transition in JS or add a CSS animation/transition.',
	      NO_EVENT_TIMEOUT
	    ) : null);
	  };
	}

	var ReactCSSTransitionGroupChild = React.createClass({
	  displayName: 'ReactCSSTransitionGroupChild',

	  transition: function(animationType, finishCallback) {
	    var node = this.getDOMNode();
	    var className = this.props.name + '-' + animationType;
	    var activeClassName = className + '-active';
	    var noEventTimeout = null;

	    var endListener = function(e) {
	      if (e && e.target !== node) {
	        return;
	      }
	      if (false) {
	        clearTimeout(noEventTimeout);
	      }

	      CSSCore.removeClass(node, className);
	      CSSCore.removeClass(node, activeClassName);

	      ReactTransitionEvents.removeEndEventListener(node, endListener);

	      // Usually this optional callback is used for informing an owner of
	      // a leave animation and telling it to remove the child.
	      if (finishCallback) {
	        finishCallback();
	      }
	    };

	    ReactTransitionEvents.addEndEventListener(node, endListener);

	    CSSCore.addClass(node, className);

	    // Need to do this to actually trigger a transition.
	    this.queueClass(activeClassName);

	    if (false) {
	      noEventTimeout = setTimeout(noEventListener, NO_EVENT_TIMEOUT);
	    }
	  },

	  queueClass: function(className) {
	    this.classNameQueue.push(className);

	    if (!this.timeout) {
	      this.timeout = setTimeout(this.flushClassNameQueue, TICK);
	    }
	  },

	  flushClassNameQueue: function() {
	    if (this.isMounted()) {
	      this.classNameQueue.forEach(
	        CSSCore.addClass.bind(CSSCore, this.getDOMNode())
	      );
	    }
	    this.classNameQueue.length = 0;
	    this.timeout = null;
	  },

	  componentWillMount: function() {
	    this.classNameQueue = [];
	  },

	  componentWillUnmount: function() {
	    if (this.timeout) {
	      clearTimeout(this.timeout);
	    }
	  },

	  componentWillAppear: function(done) {
	    if (this.props.appear) {
	      this.transition('appear', done);
	    } else {
	      done();
	    }
	  },

	  componentWillEnter: function(done) {
	    if (this.props.enter) {
	      this.transition('enter', done);
	    } else {
	      done();
	    }
	  },

	  componentWillLeave: function(done) {
	    if (this.props.leave) {
	      this.transition('leave', done);
	    } else {
	      done();
	    }
	  },

	  render: function() {
	    return onlyChild(this.props.children);
	  }
	});

	module.exports = ReactCSSTransitionGroupChild;


/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CSSCore
	 * @typechecks
	 */

	var invariant = __webpack_require__(54);

	/**
	 * The CSSCore module specifies the API (and implements most of the methods)
	 * that should be used when dealing with the display of elements (via their
	 * CSS classes and visibility on screen. It is an API focused on mutating the
	 * display and not reading it as no logical state should be encoded in the
	 * display of elements.
	 */

	var CSSCore = {

	  /**
	   * Adds the class passed in to the element if it doesn't already have it.
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {DOMElement} the element passed in
	   */
	  addClass: function(element, className) {
	    (false ? invariant(
	      !/\s/.test(className),
	      'CSSCore.addClass takes only a single class name. "%s" contains ' +
	      'multiple classes.', className
	    ) : invariant(!/\s/.test(className)));

	    if (className) {
	      if (element.classList) {
	        element.classList.add(className);
	      } else if (!CSSCore.hasClass(element, className)) {
	        element.className = element.className + ' ' + className;
	      }
	    }
	    return element;
	  },

	  /**
	   * Removes the class passed in from the element
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {DOMElement} the element passed in
	   */
	  removeClass: function(element, className) {
	    (false ? invariant(
	      !/\s/.test(className),
	      'CSSCore.removeClass takes only a single class name. "%s" contains ' +
	      'multiple classes.', className
	    ) : invariant(!/\s/.test(className)));

	    if (className) {
	      if (element.classList) {
	        element.classList.remove(className);
	      } else if (CSSCore.hasClass(element, className)) {
	        element.className = element.className
	          .replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1')
	          .replace(/\s+/g, ' ') // multiple spaces to one
	          .replace(/^\s*|\s*$/g, ''); // trim the ends
	      }
	    }
	    return element;
	  },

	  /**
	   * Helper to add or remove a class from an element based on a condition.
	   *
	   * @param {DOMElement} element the element to set the class on
	   * @param {string} className the CSS className
	   * @param {*} bool condition to whether to add or remove the class
	   * @return {DOMElement} the element passed in
	   */
	  conditionClass: function(element, className, bool) {
	    return (bool ? CSSCore.addClass : CSSCore.removeClass)(element, className);
	  },

	  /**
	   * Tests whether the element has the class specified.
	   *
	   * @param {DOMNode|DOMWindow} element the element to set the class on
	   * @param {string} className the CSS className
	   * @return {boolean} true if the element has the class, false if not
	   */
	  hasClass: function(element, className) {
	    (false ? invariant(
	      !/\s/.test(className),
	      'CSS.hasClass takes only a single class name.'
	    ) : invariant(!/\s/.test(className)));
	    if (element.classList) {
	      return !!className && element.classList.contains(className);
	    }
	    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
	  }

	};

	module.exports = CSSCore;


/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ReactTransitionEvents
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(100);

	/**
	 * EVENT_NAME_MAP is used to determine which event fired when a
	 * transition/animation ends, based on the style property used to
	 * define that event.
	 */
	var EVENT_NAME_MAP = {
	  transitionend: {
	    'transition': 'transitionend',
	    'WebkitTransition': 'webkitTransitionEnd',
	    'MozTransition': 'mozTransitionEnd',
	    'OTransition': 'oTransitionEnd',
	    'msTransition': 'MSTransitionEnd'
	  },

	  animationend: {
	    'animation': 'animationend',
	    'WebkitAnimation': 'webkitAnimationEnd',
	    'MozAnimation': 'mozAnimationEnd',
	    'OAnimation': 'oAnimationEnd',
	    'msAnimation': 'MSAnimationEnd'
	  }
	};

	var endEvents = [];

	function detectEvents() {
	  var testEl = document.createElement('div');
	  var style = testEl.style;

	  // On some platforms, in particular some releases of Android 4.x,
	  // the un-prefixed "animation" and "transition" properties are defined on the
	  // style object but the events that fire will still be prefixed, so we need
	  // to check if the un-prefixed events are useable, and if not remove them
	  // from the map
	  if (!('AnimationEvent' in window)) {
	    delete EVENT_NAME_MAP.animationend.animation;
	  }

	  if (!('TransitionEvent' in window)) {
	    delete EVENT_NAME_MAP.transitionend.transition;
	  }

	  for (var baseEventName in EVENT_NAME_MAP) {
	    var baseEvents = EVENT_NAME_MAP[baseEventName];
	    for (var styleName in baseEvents) {
	      if (styleName in style) {
	        endEvents.push(baseEvents[styleName]);
	        break;
	      }
	    }
	  }
	}

	if (ExecutionEnvironment.canUseDOM) {
	  detectEvents();
	}

	// We use the raw {add|remove}EventListener() call because EventListener
	// does not know how to remove event listeners and we really should
	// clean up. Also, these events are not triggered in older browsers
	// so we should be A-OK here.

	function addEventListener(node, eventName, eventListener) {
	  node.addEventListener(eventName, eventListener, false);
	}

	function removeEventListener(node, eventName, eventListener) {
	  node.removeEventListener(eventName, eventListener, false);
	}

	var ReactTransitionEvents = {
	  addEndEventListener: function(node, eventListener) {
	    if (endEvents.length === 0) {
	      // If CSS transitions are not supported, trigger an "end animation"
	      // event immediately.
	      window.setTimeout(eventListener, 0);
	      return;
	    }
	    endEvents.forEach(function(endEvent) {
	      addEventListener(node, endEvent, eventListener);
	    });
	  },

	  removeEndEventListener: function(node, eventListener) {
	    if (endEvents.length === 0) {
	      return;
	    }
	    endEvents.forEach(function(endEvent) {
	      removeEventListener(node, endEvent, eventListener);
	    });
	  }
	};

	module.exports = ReactTransitionEvents;


/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule cx
	 */

	/**
	 * This function is used to mark string literals representing CSS class names
	 * so that they can be transformed statically. This allows for modularization
	 * and minification of CSS class names.
	 *
	 * In static_upstream, this function is actually implemented, but it should
	 * eventually be replaced with something more descriptive, and the transform
	 * that is used in the main stack should be ported for use elsewhere.
	 *
	 * @param string|object className to modularize, or an object of key/values.
	 *                      In the object case, the values are conditions that
	 *                      determine if the className keys should be included.
	 * @param [string ...]  Variable list of classNames in the string case.
	 * @return string       Renderable space-separated CSS className.
	 */

	'use strict';
	var warning = __webpack_require__(59);

	var warned = false;

	function cx(classNames) {
	  if (false) {
	    ("production" !== process.env.NODE_ENV ? warning(
	      warned,
	      'React.addons.classSet will be deprecated in a future version. See ' +
	      'http://fb.me/react-addons-classset'
	    ) : null);
	    warned = true;
	  }

	  if (typeof classNames == 'object') {
	    return Object.keys(classNames).filter(function(className) {
	      return classNames[className];
	    }).join(' ');
	  } else {
	    return Array.prototype.join.call(arguments, ' ');
	  }
	}

	module.exports = cx;


/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule update
	 */

	 /* global hasOwnProperty:true */

	'use strict';

	var assign = __webpack_require__(62);
	var keyOf = __webpack_require__(86);
	var invariant = __webpack_require__(54);
	var hasOwnProperty = {}.hasOwnProperty;

	function shallowCopy(x) {
	  if (Array.isArray(x)) {
	    return x.concat();
	  } else if (x && typeof x === 'object') {
	    return assign(new x.constructor(), x);
	  } else {
	    return x;
	  }
	}

	var COMMAND_PUSH = keyOf({$push: null});
	var COMMAND_UNSHIFT = keyOf({$unshift: null});
	var COMMAND_SPLICE = keyOf({$splice: null});
	var COMMAND_SET = keyOf({$set: null});
	var COMMAND_MERGE = keyOf({$merge: null});
	var COMMAND_APPLY = keyOf({$apply: null});

	var ALL_COMMANDS_LIST = [
	  COMMAND_PUSH,
	  COMMAND_UNSHIFT,
	  COMMAND_SPLICE,
	  COMMAND_SET,
	  COMMAND_MERGE,
	  COMMAND_APPLY
	];

	var ALL_COMMANDS_SET = {};

	ALL_COMMANDS_LIST.forEach(function(command) {
	  ALL_COMMANDS_SET[command] = true;
	});

	function invariantArrayCase(value, spec, command) {
	  (false ? invariant(
	    Array.isArray(value),
	    'update(): expected target of %s to be an array; got %s.',
	    command,
	    value
	  ) : invariant(Array.isArray(value)));
	  var specValue = spec[command];
	  (false ? invariant(
	    Array.isArray(specValue),
	    'update(): expected spec of %s to be an array; got %s. ' +
	    'Did you forget to wrap your parameter in an array?',
	    command,
	    specValue
	  ) : invariant(Array.isArray(specValue)));
	}

	function update(value, spec) {
	  (false ? invariant(
	    typeof spec === 'object',
	    'update(): You provided a key path to update() that did not contain one ' +
	    'of %s. Did you forget to include {%s: ...}?',
	    ALL_COMMANDS_LIST.join(', '),
	    COMMAND_SET
	  ) : invariant(typeof spec === 'object'));

	  if (hasOwnProperty.call(spec, COMMAND_SET)) {
	    (false ? invariant(
	      Object.keys(spec).length === 1,
	      'Cannot have more than one key in an object with %s',
	      COMMAND_SET
	    ) : invariant(Object.keys(spec).length === 1));

	    return spec[COMMAND_SET];
	  }

	  var nextValue = shallowCopy(value);

	  if (hasOwnProperty.call(spec, COMMAND_MERGE)) {
	    var mergeObj = spec[COMMAND_MERGE];
	    (false ? invariant(
	      mergeObj && typeof mergeObj === 'object',
	      'update(): %s expects a spec of type \'object\'; got %s',
	      COMMAND_MERGE,
	      mergeObj
	    ) : invariant(mergeObj && typeof mergeObj === 'object'));
	    (false ? invariant(
	      nextValue && typeof nextValue === 'object',
	      'update(): %s expects a target of type \'object\'; got %s',
	      COMMAND_MERGE,
	      nextValue
	    ) : invariant(nextValue && typeof nextValue === 'object'));
	    assign(nextValue, spec[COMMAND_MERGE]);
	  }

	  if (hasOwnProperty.call(spec, COMMAND_PUSH)) {
	    invariantArrayCase(value, spec, COMMAND_PUSH);
	    spec[COMMAND_PUSH].forEach(function(item) {
	      nextValue.push(item);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_UNSHIFT)) {
	    invariantArrayCase(value, spec, COMMAND_UNSHIFT);
	    spec[COMMAND_UNSHIFT].forEach(function(item) {
	      nextValue.unshift(item);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_SPLICE)) {
	    (false ? invariant(
	      Array.isArray(value),
	      'Expected %s target to be an array; got %s',
	      COMMAND_SPLICE,
	      value
	    ) : invariant(Array.isArray(value)));
	    (false ? invariant(
	      Array.isArray(spec[COMMAND_SPLICE]),
	      'update(): expected spec of %s to be an array of arrays; got %s. ' +
	      'Did you forget to wrap your parameters in an array?',
	      COMMAND_SPLICE,
	      spec[COMMAND_SPLICE]
	    ) : invariant(Array.isArray(spec[COMMAND_SPLICE])));
	    spec[COMMAND_SPLICE].forEach(function(args) {
	      (false ? invariant(
	        Array.isArray(args),
	        'update(): expected spec of %s to be an array of arrays; got %s. ' +
	        'Did you forget to wrap your parameters in an array?',
	        COMMAND_SPLICE,
	        spec[COMMAND_SPLICE]
	      ) : invariant(Array.isArray(args)));
	      nextValue.splice.apply(nextValue, args);
	    });
	  }

	  if (hasOwnProperty.call(spec, COMMAND_APPLY)) {
	    (false ? invariant(
	      typeof spec[COMMAND_APPLY] === 'function',
	      'update(): expected spec of %s to be a function; got %s.',
	      COMMAND_APPLY,
	      spec[COMMAND_APPLY]
	    ) : invariant(typeof spec[COMMAND_APPLY] === 'function'));
	    nextValue = spec[COMMAND_APPLY](nextValue);
	  }

	  for (var k in spec) {
	    if (!(ALL_COMMANDS_SET.hasOwnProperty(k) && ALL_COMMANDS_SET[k])) {
	      nextValue[k] = update(value[k], spec[k]);
	    }
	  }

	  return nextValue;
	}

	module.exports = update;


/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
		ActionButton: __webpack_require__(225),
		ActionButtons: __webpack_require__(229),
		Alertbar: __webpack_require__(230),
		Feedback: __webpack_require__(232),
		Footerbar: __webpack_require__(233),
		FooterbarButton: __webpack_require__(234),
		Headerbar: __webpack_require__(235),
		HeaderbarButton: __webpack_require__(236),
		Input: __webpack_require__(237),
		ItemMedia: __webpack_require__(238),
		ItemNote: __webpack_require__(239),
		Keypad: __webpack_require__(240),
		LabelInput: __webpack_require__(223),
		LabelSelect: __webpack_require__(243),
		LabelTextarea: __webpack_require__(244),
		LoadingButton: __webpack_require__(245),
		Modal: __webpack_require__(246),
		Passcode: __webpack_require__(247),
		RadioList: __webpack_require__(248),
		Switch: __webpack_require__(249),
		Textarea: __webpack_require__(250),
		Toggle: __webpack_require__(251),
		View: __webpack_require__(252),
		ViewContent: __webpack_require__(231)
	};

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(205),
	    classnames = __webpack_require__(224);

	module.exports = React.createClass({
		displayName: 'LabelInput',
		propTypes: {
			className: React.PropTypes.string,
			onChange: React.PropTypes.func,
			type: React.PropTypes.string,
			label: React.PropTypes.string,
			pattern: React.PropTypes.string,
			placeholder: React.PropTypes.string,
			ref: React.PropTypes.string,
			alignTop: React.PropTypes.bool,
			readonly: React.PropTypes.bool,
			disabled: React.PropTypes.bool,
			first: React.PropTypes.bool
		},
		getDefaultProps: function getDefaultProps() {
			return {
				type: 'text',
				readonly: false
			};
		},
		render: function render() {
			var className = classnames(this.props.className, {
				'list-item': true,
				'field-item': true,
				'is-first': this.props.first,
				'align-top': this.props.alignTop,
				'u-selectable': this.props.disabled
			});

			var renderInput = this.props.readonly ? React.createElement(
				'div',
				{ className: 'field u-selectable' },
				this.props.value
			) : React.createElement('input', { disabled: this.props.disabled, type: this.props.type, pattern: this.props.pattern, ref: this.props.ref, value: this.props.value, defaultValue: this.props.defaultValue, onChange: this.props.onChange, className: 'field', placeholder: this.props.placeholder });

			return React.createElement(
				'label',
				{ className: className },
				React.createElement(
					'div',
					{ className: 'item-inner' },
					React.createElement(
						'div',
						{ className: 'field-label' },
						this.props.label
					),
					React.createElement(
						'div',
						{ className: 'field-control' },
						renderInput,
						this.props.children
					)
				)
			);
		}
	});

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	(function () {
		'use strict';

		function classNames () {

			var classes = '';

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if ('string' === argType || 'number' === argType) {
					classes += ' ' + arg;

				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);

				} else if ('object' === argType) {
					for (var key in arg) {
						if (arg.hasOwnProperty(key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}

			return classes.substr(1);
		}

		if (true) {
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else {
			window.classNames = classNames;
		}

	}());


/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var blacklist = __webpack_require__(226);
	var classnames = __webpack_require__(224);

	var React = __webpack_require__(205);
	var Tappable = __webpack_require__(227);
	var Navigation = __webpack_require__(228);

	module.exports = React.createClass({
		displayName: 'ActionButton',
		mixins: [Navigation],

		getDefaultProps: function getDefaultProps() {
			return {
				component: 'button',
				disabled: false
			};
		},

		render: function render() {
			var className = classnames(this.props.className, this.props.icon, {
				'action-button': true,
				'disabled': this.props.disabled
			});

			var label = this.props.label ? React.createElement(
				'div',
				{ className: 'action-button-label' },
				this.props.label
			) : null;
			var curated = blacklist(this.props, {
				children: true,
				className: true,
				disabled: true,
				icon: true,
				label: true,
				showView: true,
				viewProps: true,
				viewTransition: true
			});

			// TODO: remove this behaviour in >0.2.0
			if (!curated.onTap && this.props.showView) {
				curated.onTap = this.showViewFn(this.props.showView, this.props.viewTransition, this.props.viewProps);
			}

			return React.createElement(
				'div',
				{ className: 'action-button-cell' },
				React.createElement(
					Tappable,
					_extends({ className: className }, curated),
					label,
					this.props.children
				)
			);
		}
	});

/***/ },
/* 226 */
/***/ function(module, exports) {

	module.exports = function blacklist (src) {
	  var copy = {}, filter = arguments[1]

	  if (typeof filter === 'string') {
	    filter = {}
	    for (var i = 1; i < arguments.length; i++) {
	      filter[arguments[i]] = true
	    }
	  }

	  for (var key in src) {
	    // blacklist?
	    if (filter[key]) continue

	    copy[key] = src[key]
	  }

	  return copy
	}


/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(49);

	// Enable React Touch Events
	React.initializeTouchEvents(true);

	function getTouchProps(touch) {
		if (!touch) return {};
		return {
			pageX: touch.pageX,
			pageY: touch.pageY,
			clientX: touch.clientX,
			clientY: touch.clientY
		};
	}

	function isDataOrAriaProp(key) {
		return key.indexOf('data-') === 0 || key.indexOf('aria-') === 0;
	}

	function getPinchProps(touches) {
		return {
			touches: Array.prototype.map.call(touches, function copyTouch(touch) {
				return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
			}),
			center: { x: (touches[0].pageX + touches[1].pageX) / 2, y: (touches[0].pageY + touches[1].pageY) / 2 },
			angle: Math.atan() * (touches[1].pageY - touches[0].pageY) / (touches[1].pageX - touches[0].pageX) * 180 / Math.PI,
			distance: Math.sqrt(Math.pow(Math.abs(touches[1].pageX - touches[0].pageX), 2) + Math.pow(Math.abs(touches[1].pageY - touches[0].pageY), 2))
		};
	}

	/**
	 * Tappable Mixin
	 * ==============
	 */

	var Mixin = {
		propTypes: {
			moveThreshold: React.PropTypes.number, // pixels to move before cancelling tap
			activeDelay: React.PropTypes.number, // ms to wait before adding the `-active` class
			pressDelay: React.PropTypes.number, // ms to wait before detecting a press
			pressMoveThreshold: React.PropTypes.number, // pixels to move before cancelling press
			preventDefault: React.PropTypes.bool, // whether to preventDefault on all events
			stopPropagation: React.PropTypes.bool, // whether to stopPropagation on all events

			onTap: React.PropTypes.func, // fires when a tap is detected
			onPress: React.PropTypes.func, // fires when a press is detected
			onTouchStart: React.PropTypes.func, // pass-through touch event
			onTouchMove: React.PropTypes.func, // pass-through touch event
			onTouchEnd: React.PropTypes.func, // pass-through touch event
			onMouseDown: React.PropTypes.func, // pass-through mouse event
			onMouseUp: React.PropTypes.func, // pass-through mouse event
			onMouseMove: React.PropTypes.func, // pass-through mouse event
			onMouseOut: React.PropTypes.func, // pass-through mouse event

			onPinchStart: React.PropTypes.func, // fires when a pinch gesture is started
			onPinchMove: React.PropTypes.func, // fires on every touch-move when a pinch action is active
			onPinchEnd: React.PropTypes.func // fires when a pinch action ends
		},

		getDefaultProps: function getDefaultProps() {
			return {
				activeDelay: 0,
				moveThreshold: 100,
				pressDelay: 1000,
				pressMoveThreshold: 5
			};
		},

		getInitialState: function getInitialState() {
			return {
				isActive: false,
				touchActive: false,
				pinchActive: false
			};
		},

		componentWillUnmount: function componentWillUnmount() {
			this.cleanupScrollDetection();
			this.cancelPressDetection();
			this.clearActiveTimeout();
		},

		processEvent: function processEvent(event) {
			if (this.props.preventDefault) event.preventDefault();
			if (this.props.stopPropagation) event.stopPropagation();
		},

		onTouchStart: function onTouchStart(event) {
			if (this.props.onTouchStart && this.props.onTouchStart(event) === false) return;
			this.processEvent(event);
			window._blockMouseEvents = true;
			if (event.touches.length === 1) {
				this._initialTouch = this._lastTouch = getTouchProps(event.touches[0]);
				this.initScrollDetection();
				this.initPressDetection(event, this.endTouch);
				this._activeTimeout = setTimeout(this.makeActive, this.props.activeDelay);
			} else if ((this.props.onPinchStart || this.props.onPinchMove || this.props.onPinchEnd) && event.touches.length === 2) {
				this.onPinchStart(event);
			}
		},

		makeActive: function makeActive() {
			if (!this.isMounted()) return;
			this.clearActiveTimeout();
			this.setState({
				isActive: true
			});
		},

		clearActiveTimeout: function clearActiveTimeout() {
			clearTimeout(this._activeTimeout);
			this._activeTimeout = false;
		},

		onPinchStart: function onPinchStart(event) {
			// in case the two touches didn't start exactly at the same time
			if (this._initialTouch) {
				this.endTouch();
			}
			var touches = event.touches;
			this._initialPinch = getPinchProps(touches);
			this._initialPinch = _extends(this._initialPinch, {
				displacement: { x: 0, y: 0 },
				displacementVelocity: { x: 0, y: 0 },
				rotation: 0,
				rotationVelocity: 0,
				zoom: 1,
				zoomVelocity: 0,
				time: Date.now()
			});
			this._lastPinch = this._initialPinch;
			this.props.onPinchStart && this.props.onPinchStart(this._initialPinch, event);
		},

		onPinchMove: function onPinchMove(event) {
			if (this._initialTouch) {
				this.endTouch();
			}
			var touches = event.touches;
			if (touches.length !== 2) {
				return this.onPinchEnd(event) // bail out before disaster
				;
			}

			var currentPinch = touches[0].identifier === this._initialPinch.touches[0].identifier && touches[1].identifier === this._initialPinch.touches[1].identifier ? getPinchProps(touches) // the touches are in the correct order
			: touches[1].identifier === this._initialPinch.touches[0].identifier && touches[0].identifier === this._initialPinch.touches[1].identifier ? getPinchProps(touches.reverse()) // the touches have somehow changed order
			: getPinchProps(touches); // something is wrong, but we still have two touch-points, so we try not to fail

			currentPinch.displacement = {
				x: currentPinch.center.x - this._initialPinch.center.x,
				y: currentPinch.center.y - this._initialPinch.center.y
			};

			currentPinch.time = Date.now();
			var timeSinceLastPinch = currentPinch.time - this._lastPinch.time;

			currentPinch.displacementVelocity = {
				x: (currentPinch.displacement.x - this._lastPinch.displacement.x) / timeSinceLastPinch,
				y: (currentPinch.displacement.y - this._lastPinch.displacement.y) / timeSinceLastPinch
			};

			currentPinch.rotation = currentPinch.angle - this._initialPinch.angle;
			currentPinch.rotationVelocity = currentPinch.rotation - this._lastPinch.rotation / timeSinceLastPinch;

			currentPinch.zoom = currentPinch.distance / this._initialPinch.distance;
			currentPinch.zoomVelocity = (currentPinch.zoom - this._lastPinch.zoom) / timeSinceLastPinch;

			this.props.onPinchMove && this.props.onPinchMove(currentPinch, event);

			this._lastPinch = currentPinch;
		},

		onPinchEnd: function onPinchEnd(event) {
			// TODO use helper to order touches by identifier and use actual values on touchEnd.
			var currentPinch = _extends({}, this._lastPinch);
			currentPinch.time = Date.now();

			if (currentPinch.time - this._lastPinch.time > 16) {
				currentPinch.displacementVelocity = 0;
				currentPinch.rotationVelocity = 0;
				currentPinch.zoomVelocity = 0;
			}

			this.props.onPinchEnd && this.props.onPinchEnd(currentPinch, event);

			this._initialPinch = this._lastPinch = null;

			// If one finger is still on screen, it should start a new touch event for swiping etc
			// But it should never fire an onTap or onPress event.
			// Since there is no support swipes yet, this should be disregarded for now
			// if (event.touches.length === 1) {
			// 	this.onTouchStart(event);
			// }
		},

		initScrollDetection: function initScrollDetection() {
			this._scrollPos = { top: 0, left: 0 };
			this._scrollParents = [];
			this._scrollParentPos = [];
			var node = this.getDOMNode();
			while (node) {
				if (node.scrollHeight > node.offsetHeight || node.scrollWidth > node.offsetWidth) {
					this._scrollParents.push(node);
					this._scrollParentPos.push(node.scrollTop + node.scrollLeft);
					this._scrollPos.top += node.scrollTop;
					this._scrollPos.left += node.scrollLeft;
				}
				node = node.parentNode;
			}
		},

		calculateMovement: function calculateMovement(touch) {
			return {
				x: Math.abs(touch.clientX - this._initialTouch.clientX),
				y: Math.abs(touch.clientY - this._initialTouch.clientY)
			};
		},

		detectScroll: function detectScroll() {
			var currentScrollPos = { top: 0, left: 0 };
			for (var i = 0; i < this._scrollParents.length; i++) {
				currentScrollPos.top += this._scrollParents[i].scrollTop;
				currentScrollPos.left += this._scrollParents[i].scrollLeft;
			}
			return !(currentScrollPos.top === this._scrollPos.top && currentScrollPos.left === this._scrollPos.left);
		},

		cleanupScrollDetection: function cleanupScrollDetection() {
			this._scrollParents = undefined;
			this._scrollPos = undefined;
		},

		initPressDetection: function initPressDetection(event, callback) {
			if (!this.props.onPress) return;
			this._pressTimeout = setTimeout((function () {
				this.props.onPress(event);
				callback();
			}).bind(this), this.props.pressDelay);
		},

		cancelPressDetection: function cancelPressDetection() {
			clearTimeout(this._pressTimeout);
		},

		onTouchMove: function onTouchMove(event) {
			if (this._initialTouch) {
				this.processEvent(event);

				if (this.detectScroll()) return this.endTouch(event);

				this.props.onTouchMove && this.props.onTouchMove(event);
				this._lastTouch = getTouchProps(event.touches[0]);
				var movement = this.calculateMovement(this._lastTouch);
				if (movement.x > this.props.pressMoveThreshold || movement.y > this.props.pressMoveThreshold) {
					this.cancelPressDetection();
				}
				if (movement.x > this.props.moveThreshold || movement.y > this.props.moveThreshold) {
					if (this.state.isActive) {
						this.setState({
							isActive: false
						});
					} else if (this._activeTimeout) {
						this.clearActiveTimeout();
					}
				} else {
					if (!this.state.isActive && !this._activeTimeout) {
						this.setState({
							isActive: true
						});
					}
				}
			} else if (this._initialPinch && event.touches.length === 2) {
				this.onPinchMove(event);
				event.preventDefault();
			}
		},

		onTouchEnd: function onTouchEnd(event) {
			var _this = this;

			if (this._initialTouch) {
				this.processEvent(event);
				var afterEndTouch;
				var movement = this.calculateMovement(this._lastTouch);
				if (movement.x <= this.props.moveThreshold && movement.y <= this.props.moveThreshold && this.props.onTap) {
					event.preventDefault();
					afterEndTouch = function () {
						var finalParentScrollPos = _this._scrollParents.map(function (node) {
							return node.scrollTop + node.scrollLeft;
						});
						var stoppedMomentumScroll = _this._scrollParentPos.some(function (end, i) {
							return end !== finalParentScrollPos[i];
						});
						if (!stoppedMomentumScroll) {
							_this.props.onTap(event);
						}
					};
				}
				this.endTouch(event, afterEndTouch);
			} else if (this._initialPinch && event.touches.length + event.changedTouches.length === 2) {
				this.onPinchEnd(event);
				event.preventDefault();
			}
		},

		endTouch: function endTouch(event, callback) {
			this.cancelPressDetection();
			this.clearActiveTimeout();
			if (event && this.props.onTouchEnd) {
				this.props.onTouchEnd(event);
			}
			this._initialTouch = null;
			this._lastTouch = null;
			if (this.state.isActive) {
				this.setState({
					isActive: false
				}, callback);
			} else if (callback) {
				callback();
			}
		},

		onMouseDown: function onMouseDown(event) {
			if (window._blockMouseEvents) {
				window._blockMouseEvents = false;
				return;
			}
			if (this.props.onMouseDown && this.props.onMouseDown(event) === false) return;
			this.processEvent(event);
			this.initPressDetection(event, this.endMouseEvent);
			this._mouseDown = true;
			this.setState({
				isActive: true
			});
		},

		onMouseMove: function onMouseMove(event) {
			if (window._blockMouseEvents || !this._mouseDown) return;
			this.processEvent(event);
			this.props.onMouseMove && this.props.onMouseMove(event);
		},

		onMouseUp: function onMouseUp(event) {
			if (window._blockMouseEvents || !this._mouseDown) return;
			this.processEvent(event);
			this.props.onMouseUp && this.props.onMouseUp(event);
			this.props.onTap && this.props.onTap(event);
			this.endMouseEvent();
		},

		onMouseOut: function onMouseOut(event) {
			if (window._blockMouseEvents || !this._mouseDown) return;
			this.processEvent(event);
			this.props.onMouseOut && this.props.onMouseOut(event);
			this.endMouseEvent();
		},

		endMouseEvent: function endMouseEvent() {
			this.cancelPressDetection();
			this._mouseDown = false;
			this.setState({
				isActive: false
			});
		},

		touchStyles: function touchStyles() {
			return {
				WebkitTapHighlightColor: 'rgba(0,0,0,0)',
				WebkitTouchCallout: 'none',
				WebkitUserSelect: 'none',
				KhtmlUserSelect: 'none',
				MozUserSelect: 'none',
				msUserSelect: 'none',
				userSelect: 'none',
				cursor: 'pointer'
			};
		},

		handlers: function handlers() {
			return {
				onTouchStart: this.onTouchStart,
				onTouchMove: this.onTouchMove,
				onTouchEnd: this.onTouchEnd,
				onMouseDown: this.onMouseDown,
				onMouseUp: this.onMouseUp,
				onMouseMove: this.onMouseMove,
				onMouseOut: this.onMouseOut
			};
		}
	};

	/**
	 * Tappable Component
	 * ==================
	 */

	var Component = React.createClass({

		displayName: 'Tappable',

		mixins: [Mixin],

		propTypes: {
			component: React.PropTypes.any, // component to create
			className: React.PropTypes.string, // optional className
			classBase: React.PropTypes.string, // base for generated classNames
			style: React.PropTypes.object, // additional style properties for the component
			disabled: React.PropTypes.bool // only applies to buttons
		},

		getDefaultProps: function getDefaultProps() {
			return {
				component: 'span',
				classBase: 'Tappable'
			};
		},

		render: function render() {
			var props = this.props;
			var className = props.classBase + (this.state.isActive ? '-active' : '-inactive');

			if (props.className) {
				className += ' ' + props.className;
			}

			var style = {};
			_extends(style, this.touchStyles(), props.style);

			var newComponentProps = _extends({}, props, {
				style: style,
				className: className,
				disabled: props.disabled,
				handlers: this.handlers
			}, this.handlers());

			delete newComponentProps.onTap;
			delete newComponentProps.onPress;
			delete newComponentProps.onPinchStart;
			delete newComponentProps.onPinchMove;
			delete newComponentProps.onPinchEnd;
			delete newComponentProps.moveThreshold;
			delete newComponentProps.pressDelay;
			delete newComponentProps.pressMoveThreshold;
			delete newComponentProps.preventDefault;
			delete newComponentProps.stopPropagation;
			delete newComponentProps.component;

			return React.createElement(props.component, newComponentProps, props.children);
		}
	});

	Component.Mixin = Mixin;
	module.exports = Component;

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(205);

	/**
	 * Touchstone Navigation Mixin
	 * ===========================
	 */

	module.exports = {

		displayName: 'Navigation',

		contextTypes: {
			currentView: React.PropTypes.string,
			app: React.PropTypes.object.isRequired
		},

		showView: function showView() {
			this.context.app.showView.apply(this.context.app, arguments);
		},

		showViewFn: function showViewFn() {
			var args = arguments;
			return (function () {
				this.context.app.showView.apply(this.context.app, args);
			}).bind(this);
		}

	};

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(205);

	module.exports = React.createClass({
		displayName: 'ActionButtons',
		propTypes: {
			className: React.PropTypes.string
		},
		getDefaultProps: function getDefaultProps() {
			return {
				className: ''
			};
		},
		render: function render() {
			var className = this.props.className ? this.props.className + ' action-buttons' : 'action-buttons';
			return React.createElement(
				'div',
				{ className: className },
				this.props.children
			);
		}
	});

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(205);
	var classnames = __webpack_require__(224);
	var ViewContent = __webpack_require__(231);

	var alertTypes = ['default', 'primary', 'success', 'warning', 'danger'];

	module.exports = React.createClass({
		displayName: 'Alertbar',
		propTypes: {
			className: React.PropTypes.string,
			height: React.PropTypes.string,
			pulse: React.PropTypes.bool,
			type: React.PropTypes.oneOf(alertTypes)
		},
		getDefaultProps: function getDefaultProps() {
			return {
				height: '30px',
				type: 'default'
			};
		},
		render: function render() {
			var className = classnames(this.props.className, this.props.type, {
				'Alertbar': true,
				'pulse': this.props.pulse
			});
			var content = this.props.pulse ? React.createElement(
				'div',
				{ className: 'Alertbar-inner' },
				this.props.children
			) : this.props.children;

			return React.createElement(
				ViewContent,
				{ height: this.props.height, className: className },
				content
			);
		}
	});

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(205),
	    classnames = __webpack_require__(224);

	module.exports = React.createClass({
		displayName: 'ViewContent',
		propTypes: {
			id: React.PropTypes.string,
			className: React.PropTypes.string,
			height: React.PropTypes.string,
			scrollable: React.PropTypes.bool,
			grow: React.PropTypes.bool
		},

		getDefaultProps: function getDefaultProps() {
			return {
				className: '',
				height: ''
			};
		},

		render: function render() {
			var className = classnames({
				'ViewContent': true,
				'springy-scrolling': this.props.scrollable
			}, this.props.className);

			var inlineStyle = {};

			// set height on blocks if provided
			if (this.props.height) {
				inlineStyle.height = this.props.height;
			}

			// stretch to take up space
			if (this.props.grow) {
				inlineStyle.WebkitBoxFlex = '1';
				inlineStyle.WebkitFlex = '1';
				inlineStyle.MozBoxFlex = '1';
				inlineStyle.MozFlex = '1';
				inlineStyle.MsFlex = '1';
				inlineStyle.flex = '1';
			}

			// allow blocks to be scrollable
			if (this.props.scrollable) {
				inlineStyle.overflowY = 'auto';
				inlineStyle.WebkitOverflowScrolling = 'touch';
			}

			return React.createElement(
				'div',
				{ className: className, id: this.props.id, style: inlineStyle },
				this.props.children
			);
		}
	});

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(205),
	    Tappable = __webpack_require__(227);

	module.exports = React.createClass({
		displayName: 'exports',

		propTypes: {
			className: React.PropTypes.string,
			iconKey: React.PropTypes.string,
			iconType: React.PropTypes.string,
			header: React.PropTypes.string,
			subheader: React.PropTypes.string,
			text: React.PropTypes.string,
			actionText: React.PropTypes.string,
			actionFn: React.PropTypes.func
		},
		getDefaultProps: function getDefaultProps() {
			return {
				className: ''
			};
		},
		render: function render() {
			var className = this.props.className ? 'view-feedback ' + this.props.className : 'view-feedback';

			var icon = this.props.iconKey ? React.createElement('div', { className: 'view-feedback-icon ' + this.props.iconKey + ' ' + this.props.iconType }) : null;
			var header = this.props.header ? React.createElement(
				'div',
				{ className: 'view-feedback-header' },
				this.props.header
			) : null;
			var subheader = this.props.subheader ? React.createElement(
				'div',
				{ className: 'view-feedback-subheader' },
				this.props.subheader
			) : null;
			var text = this.props.text ? React.createElement('div', { className: 'view-feedback-text', dangerouslySetInnerHTML: { __html: this.props.text } }) : null;
			var action = this.props.actionText ? React.createElement(
				Tappable,
				{ onTap: this.props.actionFn, className: 'view-feedback-action' },
				this.props.actionText
			) : null;

			return React.createElement(
				'div',
				{ className: className },
				icon,
				header,
				subheader,
				text,
				action
			);
		}
	});

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(205),
	    classnames = __webpack_require__(224),
	    ViewContent = __webpack_require__(231);

	module.exports = React.createClass({
		displayName: 'Footerbar',
		propTypes: {
			className: React.PropTypes.string,
			height: React.PropTypes.string,
			type: React.PropTypes.string
		},
		getDefaultProps: function getDefaultProps() {
			return {
				height: '44px'
			};
		},
		render: function render() {
			var className = classnames(this.props.className, this.props.type, {
				'Footerbar': true
			});

			return React.createElement(
				ViewContent,
				{ height: this.props.height, className: className },
				this.props.children
			);
		}
	});

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(205),
	    classnames = __webpack_require__(224),
	    Tappable = __webpack_require__(227),
	    Navigation = __webpack_require__(228);

	module.exports = React.createClass({
		mixins: [Navigation],
		displayName: 'ActionButton',
		propTypes: {
			className: React.PropTypes.string,
			component: React.PropTypes.string,
			showView: React.PropTypes.string,
			viewTransition: React.PropTypes.string,
			viewProps: React.PropTypes.object,
			disabled: React.PropTypes.bool,
			onTap: React.PropTypes.func,
			active: React.PropTypes.bool,
			label: React.PropTypes.string,
			icon: React.PropTypes.string
		},
		getDefaultProps: function getDefaultProps() {
			return {
				component: 'div',
				disabled: false,
				active: false
			};
		},
		render: function render() {
			var className = classnames(this.props.className, this.props.icon, {
				'Footerbar-button': true,
				'active': this.props.active,
				'disabled': this.props.disabled
			});

			var label = this.props.label ? React.createElement(
				'div',
				{ className: 'Footerbar-button-label' },
				this.props.label
			) : null;
			var action = this.props.showView ? this.showViewFn(this.props.showView, this.props.viewTransition, this.props.viewProps) : this.props.onTap;

			return React.createElement(
				Tappable,
				{ className: className, component: this.props.component, onTap: action },
				label,
				this.props.children
			);
		}
	});

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var classnames = __webpack_require__(224);

	var React = __webpack_require__(205);

	module.exports = React.createClass({
		displayName: 'Headerbar',

		propTypes: {
			className: React.PropTypes.string,
			height: React.PropTypes.string,
			label: React.PropTypes.string,
			fixed: React.PropTypes.bool,
			type: React.PropTypes.string
		},

		render: function render() {
			var className = classnames('Headerbar', this.props.className, this.props.type, { 'fixed': this.props.fixed });

			var label;
			if (this.props.label !== undefined) {
				label = React.createElement(
					'div',
					{ className: 'Headerbar-label' },
					this.props.label
				);
			}

			return React.createElement(
				'div',
				{ height: this.props.height, className: className },
				this.props.children,
				label
			);
		}
	});

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(205),
	    classnames = __webpack_require__(224),
	    Tappable = __webpack_require__(227),
	    Navigation = __webpack_require__(228);

	module.exports = React.createClass({
		displayName: 'HeaderbarButton',
		mixins: [Navigation],
		propTypes: {
			className: React.PropTypes.string,
			component: React.PropTypes.string,
			showView: React.PropTypes.string,
			viewTransition: React.PropTypes.string,
			viewProps: React.PropTypes.object,
			disabled: React.PropTypes.bool,
			visible: React.PropTypes.bool,
			primary: React.PropTypes.bool,
			onTap: React.PropTypes.func,
			position: React.PropTypes.string,
			label: React.PropTypes.string,
			icon: React.PropTypes.string
		},
		getDefaultProps: function getDefaultProps() {
			return {
				visible: true,
				disabled: false
			};
		},
		render: function render() {
			var className = classnames(this.props.className, this.props.position, this.props.icon, {
				'Headerbar-button': true,
				'hidden': !this.props.visible,
				'disabled': this.props.disabled,
				'is-primary': this.props.primary
			});

			var label = this.props.label ? React.createElement(
				'div',
				{ className: 'action-button-label' },
				this.props.label
			) : null;
			var action = this.props.showView ? this.showViewFn(this.props.showView, this.props.viewTransition, this.props.viewProps) : this.props.onTap;

			return React.createElement(
				Tappable,
				{ onTap: action, className: className, component: this.props.component },
				this.props.label,
				this.props.children
			);
		}
	});

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var blacklist = __webpack_require__(226);
	var classnames = __webpack_require__(224);

	var React = __webpack_require__(205);

	module.exports = React.createClass({
		displayName: 'Input',

		getDefaultProps: function getDefaultProps() {
			return {
				type: 'text'
			};
		},

		render: function render() {
			var disabled = this.props.disabled || this.props.readonly;
			var className = classnames(this.props.className, 'field-item list-item', {
				'is-first': this.props.first,
				'u-selectable': disabled
			});

			var curated = blacklist(this.props, {
				className: true,
				disabled: true,
				first: true,
				readonly: true,
				children: true
			});

			return React.createElement(
				'div',
				{ className: className },
				React.createElement(
					'div',
					{ className: 'item-inner' },
					React.createElement(
						'label',
						{ className: 'item-content' },
						React.createElement('input', _extends({ className: 'field', disabled: disabled }, curated))
					),
					this.props.children
				)
			);
		}
	});

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(205),
	    classnames = __webpack_require__(224);

	module.exports = React.createClass({
		displayName: 'ItemMedia',
		propTypes: {
			className: React.PropTypes.string,
			icon: React.PropTypes.string,
			avatar: React.PropTypes.string,
			thumbnail: React.PropTypes.string
		},

		render: function render() {
			var className = classnames({
				'item-media': true,
				'is-icon': this.props.icon,
				'is-avatar': this.props.avatar || this.props.avatarInitials,
				'is-thumbnail': this.props.thumbnail
			}, this.props.className);

			// media types
			var icon = this.props.icon ? React.createElement('div', { className: 'item-icon ' + this.props.icon }) : null;
			var avatar = this.props.avatar || this.props.avatarInitials ? React.createElement(
				'div',
				{ className: 'item-avatar' },
				this.props.avatar ? React.createElement('img', { src: this.props.avatar }) : this.props.avatarInitials
			) : null;
			var thumbnail = this.props.thumbnail ? React.createElement(
				'div',
				{ className: 'item-thumbnail' },
				React.createElement('img', { src: this.props.thumbnail })
			) : null;

			return React.createElement(
				'div',
				{ className: className },
				icon,
				avatar,
				thumbnail
			);
		}
	});

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(205),
	    classnames = __webpack_require__(224);

	module.exports = React.createClass({
		displayName: 'ItemNote',
		propTypes: {
			className: React.PropTypes.string,
			type: React.PropTypes.string,
			label: React.PropTypes.string,
			icon: React.PropTypes.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				type: 'default'
			};
		},

		render: function render() {
			var className = classnames({
				'item-note': true
			}, this.props.type, this.props.className);

			// elements
			var label = this.props.label ? React.createElement(
				'div',
				{ className: 'item-note-label' },
				this.props.label
			) : null;
			var icon = this.props.icon ? React.createElement('div', { className: 'item-note-icon ' + this.props.icon }) : null;

			return React.createElement(
				'div',
				{ className: className },
				label,
				icon
			);
		}
	});

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var classnames = __webpack_require__(224);
	var icons = {
		del: __webpack_require__(241)
	};

	var ViewContent = __webpack_require__(231);
	var KeypadButton = __webpack_require__(242);
	var React = __webpack_require__(205);

	module.exports = React.createClass({
		displayName: 'Keypad',
		propTypes: {
			action: React.PropTypes.func,
			className: React.PropTypes.string,
			stowed: React.PropTypes.bool,
			enableDel: React.PropTypes.bool,
			type: React.PropTypes.string, // options: 'black-translucent', 'white-translucent'
			wildkey: React.PropTypes.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				type: 'default'
			};
		},

		render: function render() {
			var action = this.props.action;
			var typeName = 'Keypad--' + this.props.type;
			var keypadClassName = classnames(this.props.className, typeName, 'Keypad', {
				'is-stowed': this.props.stowed
			});

			var wildkey;

			if (this.props.wildkey === 'decimal') {
				wildkey = React.createElement(KeypadButton, { value: 'decimal', primaryLabel: '·', aux: true });
			} else {
				wildkey = React.createElement(KeypadButton, { aux: true, disabled: true });
			}

			return React.createElement(
				ViewContent,
				{ className: keypadClassName },
				React.createElement(KeypadButton, { action: function () {
						return action('1');
					}, primaryLabel: '1' }),
				React.createElement(KeypadButton, { action: function () {
						return action('2');
					}, primaryLabel: '2', secondaryLabel: 'ABC' }),
				React.createElement(KeypadButton, { action: function () {
						return action('3');
					}, primaryLabel: '3', secondaryLabel: 'DEF' }),
				React.createElement(KeypadButton, { action: function () {
						return action('4');
					}, primaryLabel: '4', secondaryLabel: 'GHI' }),
				React.createElement(KeypadButton, { action: function () {
						return action('5');
					}, primaryLabel: '5', secondaryLabel: 'JKL' }),
				React.createElement(KeypadButton, { action: function () {
						return action('6');
					}, primaryLabel: '6', secondaryLabel: 'MNO' }),
				React.createElement(KeypadButton, { action: function () {
						return action('7');
					}, primaryLabel: '7', secondaryLabel: 'PQRS' }),
				React.createElement(KeypadButton, { action: function () {
						return action('8');
					}, primaryLabel: '8', secondaryLabel: 'TUV' }),
				React.createElement(KeypadButton, { action: function () {
						return action('9');
					}, primaryLabel: '9', secondaryLabel: 'WXYZ' }),
				wildkey,
				React.createElement(KeypadButton, { action: function () {
						return action('0');
					}, primaryLabel: '0' }),
				React.createElement(KeypadButton, { action: function () {
						return action('delete');
					}, icon: icons.del, disabled: !this.props.enableDel, aux: true })
			);
		}
	});

/***/ },
/* 241 */
/***/ function(module, exports) {

	'use strict';

	module.exports = '<?xml version="1.0" encoding="utf-8"?>' + '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' + '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"' + '\t viewBox="-242 183.4 90 65.4" enable-background="new -242 183.4 90 65.4" xml:space="preserve">' + '<path class="svg-path" d="M-166,183.4H-205c-3.8,0-7.4,1.5-10.1,4.2l-25.6,25.6c-1.6,1.6-1.6,4.2,0,5.8l25.6,25.6c2.7,2.7,6.3,4.2,10.1,4.2h39.1' + '\tc7.9,0,14-6.4,14-14.3v-36.8C-152,189.8-158.1,183.4-166,183.4 M-169.8,228.4l-4.3,4.3l-12.3-12.3l-12.3,12.3l-4.3-4.3l12.3-12.3' + '\tl-12.3-12.3l4.3-4.3l12.3,12.3l12.3-12.3l4.3,4.3l-12.3,12.3L-169.8,228.4z"/>' + '</svg>';

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var classnames = __webpack_require__(224);

	var React = __webpack_require__(205);
	var Tappable = __webpack_require__(227);

	module.exports = React.createClass({
		displayName: 'KeypadButton',
		propTypes: {
			action: React.PropTypes.func,
			aux: React.PropTypes.bool,
			className: React.PropTypes.string,
			'delete': React.PropTypes.bool,
			disabled: React.PropTypes.bool,
			primaryLabel: React.PropTypes.string,
			secondaryLabel: React.PropTypes.string,
			value: React.PropTypes.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				action: function action() {},
				className: '',
				secondaryLabel: ''
			};
		},

		render: function render() {
			var className = classnames('Keypad-button', {
				'is-auxiliary': this.props.aux || this.props['delete'],
				'disabled': this.props.disabled
			});

			var primaryLabel = this.props.primaryLabel ? React.createElement(
				'div',
				{ className: 'Keypad-button-primary-label' },
				this.props.primaryLabel
			) : null;
			var secondaryLabel = this.props.secondaryLabel ? React.createElement(
				'div',
				{ className: 'Keypad-button-secondary-label' },
				this.props.secondaryLabel
			) : null;
			var icon = this.props.icon ? React.createElement('span', { className: 'Keypad-button-icon', dangerouslySetInnerHTML: { __html: this.props.icon } }) : null;

			return React.createElement(
				'div',
				{ className: 'Keypad-cell' },
				React.createElement(
					Tappable,
					{ onTap: this.props.action, className: className, component: 'div' },
					icon,
					primaryLabel,
					secondaryLabel
				)
			);
		}
	});

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(205),
	    classnames = __webpack_require__(224);

	module.exports = React.createClass({
		displayName: 'LabelSelect',
		propTypes: {
			className: React.PropTypes.string,
			label: React.PropTypes.string,
			first: React.PropTypes.bool
		},
		getDefaultProps: function getDefaultProps() {
			return {
				className: ''
			};
		},
		getInitialState: function getInitialState() {
			return {
				value: this.props.value
			};
		},
		updateInputValue: function updateInputValue(event) {
			this.setState({
				value: event.target.value
			});
		},
		render: function render() {
			// Set Classes
			var className = classnames(this.props.className, {
				'list-item': true,
				'is-first': this.props.first
			});

			// Map Options
			var options = this.props.options.map((function (op) {
				return React.createElement(
					'option',
					{ key: 'option-' + op.value, value: op.value },
					op.label
				);
			}).bind(this));

			return React.createElement(
				'label',
				{ className: className },
				React.createElement(
					'div',
					{ className: 'item-inner' },
					React.createElement(
						'div',
						{ className: 'field-label' },
						this.props.label
					),
					React.createElement(
						'div',
						{ className: 'field-control' },
						React.createElement(
							'select',
							{ value: this.state.value, onChange: this.updateInputValue, className: 'select-field' },
							options
						),
						React.createElement(
							'div',
							{ className: 'select-field-indicator' },
							React.createElement('div', { className: 'select-field-indicator-arrow' })
						)
					)
				)
			);
		}
	});

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var blacklist = __webpack_require__(226);
	var classnames = __webpack_require__(224);

	var React = __webpack_require__(205);

	module.exports = React.createClass({
		displayName: 'LabelTextarea',
		getDefaultProps: function getDefaultProps() {
			return {
				rows: 3
			};
		},
		render: function render() {
			var disabled = this.props.disabled || this.props.readonly;
			var className = classnames(this.props.className, {
				'list-item': true,
				'field-item': true,
				'align-top': true,
				'is-first': this.props.first,
				'u-selectable': disabled
			});

			var curated = blacklist(this.props, {
				className: true,
				disabled: true,
				first: true,
				readonly: true,
				children: true,
				label: true
			});

			var renderInput = this.props.readonly ? React.createElement(
				'div',
				{ className: 'field u-selectable' },
				this.props.value
			) : React.createElement('textarea', _extends({ disabled: disabled }, curated, { className: 'field' }));

			return React.createElement(
				'div',
				{ className: className },
				React.createElement(
					'label',
					{ className: 'item-inner' },
					React.createElement(
						'div',
						{ className: 'field-label' },
						this.props.label
					),
					React.createElement(
						'div',
						{ className: 'field-control' },
						renderInput,
						this.props.children
					)
				)
			);
		}
	});

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(205),
	    classnames = __webpack_require__(224),
	    Tappable = __webpack_require__(227),
	    Navigation = __webpack_require__(228);

	module.exports = React.createClass({
		displayName: 'LoadingButton',
		mixins: [Navigation],
		propTypes: {
			className: React.PropTypes.string,
			showView: React.PropTypes.string,
			viewTransition: React.PropTypes.string,
			viewProps: React.PropTypes.object,
			component: React.PropTypes.string,
			onTap: React.PropTypes.func,
			type: React.PropTypes.string,
			disabled: React.PropTypes.bool,
			loading: React.PropTypes.bool,
			label: React.PropTypes.string
		},
		getDefaultProps: function getDefaultProps() {
			return {
				disabled: false,
				loading: false
			};
		},
		render: function render() {
			// Class Name
			var className = classnames(this.props.className, this.props.type, {
				'loading-button': true,
				'disabled': this.props.disabled,
				'is-loading': this.props.loading
			});

			// Set Variables
			var label = this.props.label && !this.props.loading ? React.createElement(
				'div',
				{ className: 'loading-button-text' },
				this.props.label
			) : null;
			var onTap = this.props.showView ? this.showViewFn(this.props.showView, this.props.viewTransition, this.props.viewProps) : this.props.onTap;
			var loadingElements = this.props.loading ? React.createElement(
				'span',
				{ className: 'loading-button-icon-wrapper' },
				React.createElement('span', { className: 'loading-button-icon' })
			) : null;

			// Output Component
			return React.createElement(
				Tappable,
				{ className: className, component: this.props.component, onTap: onTap },
				loadingElements,
				label,
				this.props.children
			);
		}
	});

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var classnames = __webpack_require__(224);

	var React = __webpack_require__(205);
	var Tappable = __webpack_require__(227);

	module.exports = React.createClass({
		displayName: 'Modal',
		propTypes: {
			className: React.PropTypes.string,
			showModal: React.PropTypes.bool,
			loading: React.PropTypes.bool,
			mini: React.PropTypes.bool,
			iconKey: React.PropTypes.string,
			iconType: React.PropTypes.string,
			header: React.PropTypes.string,
			text: React.PropTypes.string,
			primaryActionText: React.PropTypes.string,
			primaryActionFn: React.PropTypes.func,
			secondaryActionText: React.PropTypes.string,
			secondaryActionFn: React.PropTypes.func
		},

		getDefaultProps: function getDefaultProps() {
			return {
				showModal: false
			};
		},

		getInitialState: function getInitialState() {
			return {
				showModal: this.props.showModal
			};
		},

		// TODO: use ReactTransitionGroup to handle fade in/out
		componentDidMount: function componentDidMount() {
			var self = this;

			setTimeout(function () {
				if (!self.isMounted()) return;

				self.setState({ showModal: true });
			}, 1);
		},

		render: function render() {
			// Set classnames
			var dialogClassName = classnames({
				'Modal-dialog': true,
				'Modal-mini': this.props.mini,
				'Modal-loading': this.props.loading
			}, this.props.className);
			var modalClassName = classnames('Modal', {
				'enter': this.state.showModal
			});

			// Set dynamic content
			var icon = this.props.iconKey ? React.createElement('div', { className: 'Modal-icon ' + this.props.iconKey + ' ' + this.props.iconType }) : null;
			var header = this.props.header ? React.createElement(
				'div',
				{ className: 'Modal-header' },
				this.props.header
			) : null;
			var text = this.props.text ? React.createElement('div', { className: 'Modal-text', dangerouslySetInnerHTML: { __html: this.props.text } }) : null;
			var primaryAction = this.props.primaryActionText ? React.createElement(
				Tappable,
				{ onTap: this.props.primaryActionFn, className: 'Modal-action Modal-action-primary' },
				this.props.primaryActionText
			) : null;
			var secondaryAction = this.props.secondaryActionText ? React.createElement(
				Tappable,
				{ onTap: this.props.secondaryActionFn, className: 'Modal-action Modal-action-secondary' },
				this.props.secondaryActionText
			) : null;

			var actions = primaryAction ? React.createElement(
				'div',
				{ className: 'Modal-actions' },
				secondaryAction,
				primaryAction
			) : null;

			return React.createElement(
				'div',
				{ className: modalClassName },
				React.createElement(
					'div',
					{ className: dialogClassName },
					icon,
					header,
					text,
					actions
				),
				React.createElement('div', { className: 'Modal-backdrop' })
			);
		}
	});

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(205),
	    classnames = __webpack_require__(224),
	    Keypad = __webpack_require__(240),
	    ViewContent = __webpack_require__(231);

	module.exports = React.createClass({
		displayName: 'Passcode',
		propTypes: {
			action: React.PropTypes.func,
			className: React.PropTypes.string,
			keyboardIsStowed: React.PropTypes.bool,
			type: React.PropTypes.string,
			helpText: React.PropTypes.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				className: '',
				helpText: 'Enter your passcode',
				type: 'default'
			};
		},

		getInitialState: function getInitialState() {
			return {
				helpText: this.props.helpText,
				keyboardIsStowed: true,
				passcode: ''
			};
		},

		componentDidMount: function componentDidMount() {
			// slide the keyboard up after the view is shown
			setTimeout((function () {
				if (!this.isMounted()) return;
				this.setState({
					keyboardIsStowed: false
				});
			}).bind(this), 400);
		},

		handlePasscode: function handlePasscode(keyCode) {

			var passcode = this.state.passcode;

			if (keyCode === 'delete') {
				passcode = passcode.slice(0, -1);
			} else {
				passcode = passcode.concat(keyCode);
			}

			if (passcode.length !== 4) {
				return this.setState({
					passcode: passcode
				});
			}

			setTimeout((function () {
				return this.props.action(passcode);
			}).bind(this), 200); // the transition that stows the keyboard takes 150ms, it freezes if interrupted by the ReactCSSTransitionGroup

			return this.setState({
				passcode: passcode
			});
		},

		render: function render() {

			var passcodeClassName = classnames(this.props.type, {
				'Passcode': true
			});

			return React.createElement(
				ViewContent,
				{ grow: true },
				React.createElement(
					'div',
					{ className: passcodeClassName },
					React.createElement(
						'div',
						{ className: 'Passcode-label' },
						this.props.helpText
					),
					React.createElement(
						'div',
						{ className: 'Passcode-fields' },
						React.createElement(
							'div',
							{ className: 'Passcode-field' },
							React.createElement('div', { className: 'Passcode-input ' + (this.state.passcode.length > 0 ? 'has-value' : '') })
						),
						React.createElement(
							'div',
							{ className: 'Passcode-field' },
							React.createElement('div', { className: 'Passcode-input ' + (this.state.passcode.length > 1 ? 'has-value' : '') })
						),
						React.createElement(
							'div',
							{ className: 'Passcode-field' },
							React.createElement('div', { className: 'Passcode-input ' + (this.state.passcode.length > 2 ? 'has-value' : '') })
						),
						React.createElement(
							'div',
							{ className: 'Passcode-field' },
							React.createElement('div', { className: 'Passcode-input ' + (this.state.passcode.length > 3 ? 'has-value' : '') })
						)
					)
				),
				React.createElement(Keypad, { type: this.props.type, action: this.handlePasscode, enableDel: Boolean(this.state.passcode.length), stowed: this.state.keyboardIsStowed })
			);
		}
	});

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(49);
	var Tappable = __webpack_require__(227);

	module.exports = React.createClass({

		displayName: 'RadioList',

		propTypes: {
			options: React.PropTypes.array,
			value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
			icon: React.PropTypes.string,
			onChange: React.PropTypes.func
		},

		onChange: function onChange(value) {
			this.props.onChange(value);
		},

		render: function render() {

			var options = this.props.options.map((function (op, i) {
				var className = 'list-item' + (i === 0 ? ' is-first' : '');
				var checkMark = op.value === this.props.value ? React.createElement(
					'div',
					{ className: 'item-note primary' },
					React.createElement('div', { className: 'item-note-icon ion-checkmark' })
				) : null;

				var icon = op.icon ? React.createElement(
					'div',
					{ className: 'item-media' },
					React.createElement('span', { className: 'item-icon primary ' + op.icon })
				) : null;

				return React.createElement(
					Tappable,
					{ key: 'option-' + i, onTap: this.onChange.bind(this, op.value), className: className },
					icon,
					React.createElement(
						'div',
						{ className: 'item-inner' },
						React.createElement(
							'div',
							{ className: 'item-title' },
							op.label
						),
						checkMark
					)
				);
			}).bind(this));

			return React.createElement(
				'div',
				null,
				options
			);
		}

	});

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var classnames = __webpack_require__(224);

	var React = __webpack_require__(49);
	var Tappable = __webpack_require__(227);

	module.exports = React.createClass({
		displayName: 'Switch',

		propTypes: {
			className: React.PropTypes.string,
			on: React.PropTypes.bool,
			type: React.PropTypes.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				type: 'default'
			};
		},

		render: function render() {
			var className = classnames('switch', 'switch-' + this.props.type, { 'on': this.props.on });

			return React.createElement(
				Tappable,
				{ onTap: this.props.onTap, className: className, component: 'label' },
				React.createElement(
					'div',
					{ className: 'track' },
					React.createElement('div', { className: 'handle' })
				)
			);
		}
	});

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var blacklist = __webpack_require__(226);
	var classnames = __webpack_require__(224);

	var React = __webpack_require__(205);

	module.exports = React.createClass({
		displayName: 'Textarea',

		getDefaultProps: function getDefaultProps() {
			return {
				rows: 3
			};
		},

		render: function render() {
			var disabled = this.props.disabled || this.props.readonly;
			var className = classnames(this.props.className, 'field-item list-item', {
				'is-first': this.props.first,
				'u-selectable': disabled
			});

			var curated = blacklist(this.props, {
				children: true,
				className: true,
				disabled: true,
				first: true,
				inputRef: true,
				readonly: true
			});
			curated.ref = this.props.inputRef;

			return React.createElement(
				'div',
				{ className: className },
				React.createElement(
					'div',
					{ className: 'item-inner' },
					React.createElement(
						'label',
						{ className: 'item-content' },
						React.createElement('textarea', _extends({ className: 'field', disabled: disabled }, curated))
					),
					this.props.children
				)
			);
		}
	});

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(49);
	var classnames = __webpack_require__(224);
	var Tappable = __webpack_require__(227);

	module.exports = React.createClass({
		displayName: 'Toggle',

		propTypes: {
			className: React.PropTypes.string,
			onChange: React.PropTypes.func.isRequired,
			options: React.PropTypes.array.isRequired,
			type: React.PropTypes.string,
			value: React.PropTypes.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				type: 'primary'
			};
		},

		onChange: function onChange(value) {
			this.props.onChange(value);
		},

		render: function render() {

			var componentClassName = classnames(this.props.className, this.props.type, {
				'Toggle': true
			});

			var options = this.props.options.map((function (op) {
				var itemClassName = classnames({
					'Toggle-item': true,
					'active': op.value === this.props.value
				});
				return React.createElement(
					Tappable,
					{ key: 'option-' + op.value, onTap: this.onChange.bind(this, op.value), className: itemClassName },
					op.label
				);
			}).bind(this));

			return React.createElement(
				'div',
				{ className: componentClassName },
				options
			);
		}

	});

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(205);

	module.exports = React.createClass({
		displayName: 'View',

		propTypes: {
			className: React.PropTypes.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				className: ''
			};
		},

		render: function render() {
			var className = this.props.className ? 'View ' + this.props.className : 'View';

			// react does not currently support duplicate properties (which we need for vendor-prefixed values)
			// see https://github.com/facebook/react/issues/2020
			// moved the display properties to css/touchstone/view.less using the class ".View"

			// when supported, apply the following:
			// display: '-webkit-box',
			// display: '-webkit-flex',
			// display: '-moz-box',
			// display: '-moz-flex',
			// display: '-ms-flexbox',
			// display: 'flex',

			var inlineStyle = {
				WebkitFlexDirection: 'column',
				MozFlexDirection: 'column',
				msFlexDirection: 'column',
				FlexDirection: 'column',
				WebkitAlignItems: 'stretch',
				MozAlignItems: 'stretch',
				AlignItems: 'stretch',
				WebkitJustifyContent: 'space-between',
				MozJustifyContent: 'space-between',
				JustifyContent: 'space-between'
			};

			return React.createElement(
				'div',
				{ className: className, style: inlineStyle },
				this.props.children
			);
		}
	});

/***/ },
/* 253 */
/***/ function(module, exports) {

	/**
	 * View transition animations
	 * ==========================
	 */

	module.exports = {
		'none': { in: false, out: false },
		'fade': { in: true, out: true },
		'fade-contract': { in: true, out: true },
		'fade-expand': { in: true, out: true },
		'show-from-left': { in: true, out: true },
		'show-from-right': { in: true, out: true },
		'show-from-top': { in: true, out: true },
		'show-from-bottom': { in: true, out: true },
		'reveal-from-left': { in: true, out: true },
		'reveal-from-right': { in: true, out: true },
		'reveal-from-top': { in: false, out: true },
		'reveal-from-bottom': { in: false, out: true }
	};

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(205);
	var Tappable = __webpack_require__(227);
	var Navigation = __webpack_require__(228);

	var TRANSITION_KEYS = __webpack_require__(253);
	var validTransitions = Object.keys(TRANSITION_KEYS);

	/**
	 * Touchstone Link Component
	 * =========================
	 */

	module.exports = React.createClass({

		displayName: 'Link',

		mixins: [Navigation],

		propTypes: {
			to: React.PropTypes.string.isRequired,
			params: React.PropTypes.object,
			viewTransition: React.PropTypes.oneOf(validTransitions),
			component: React.PropTypes.any,
			className: React.PropTypes.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				viewTransition: 'none',
				component: 'span'
			};
		},

		action: function action() {
			var params = this.props.params;

			if ('function' === typeof params) {
				params = params.call(this);
			}

			this.showView(this.props.to, this.props.viewTransition, params);
		},

		render: function render() {
			return React.createElement(
				Tappable,
				{ onTap: this.action, className: this.props.className, component: this.props.component },
				this.props.children
			);
		}

	});

/***/ },
/* 255 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	exports.fetchMangas = fetchMangas;
	exports.fetchChapters = fetchChapters;
	exports.fetchChapter = fetchChapter;
	exports.getFavorites = getFavorites;
	exports.addFavorite = addFavorite;
	exports.removeFavorite = removeFavorite;
	var API_ENDPOINT = 'http://www.mangaeden.com/api/';

	function createUrl(endpoint, params) {
	  var url = API_ENDPOINT + endpoint;
	  if (params) {
	    url += '?' + Object.keys(params).map(function (key) {
	      return key + '=' + params[key];
	    }).join('&');
	  }
	  return url;
	}
	function mapManga(_ref) {
	  var im = _ref.im;
	  var t = _ref.t;
	  var i = _ref.i;
	  var a = _ref.a;
	  var s = _ref.s;
	  var c = _ref.c;
	  var ld = _ref.ld;
	  var h = _ref.h;

	  return {
	    image: 'https://cdn.mangaeden.com/mangasimg/' + im,
	    title: t,
	    id: i,
	    alias: a,
	    status: s,
	    category: c,
	    lastChapterDate: ld,
	    hits: h
	  };
	}

	function fetchMangas() {
	  return fetch(createUrl('list/0/')).then(function (response) {
	    return response.json();
	  }).then(function (_ref2) {
	    var manga = _ref2.manga;
	    return manga.map(mapManga);
	  });
	}

	function fetchChapters(mangaId) {
	  return fetch(createUrl('manga/' + mangaId + '/')).then(function (response) {
	    return response.json();
	  }).then(function (_ref3) {
	    var chapters = _ref3.chapters;
	    return chapters.map(function (_ref4) {
	      var _ref42 = _slicedToArray(_ref4, 4);

	      var order = _ref42[0];
	      var date = _ref42[1];
	      var title = _ref42[2];
	      var id = _ref42[3];
	      return { order: order, date: date, title: title, id: id };
	    });
	  });
	}

	function fetchChapter(chapterId) {
	  return fetch(createUrl('chapter/' + chapterId + '/')).then(function (response) {
	    return response.json();
	  }).then(function (_ref5) {
	    var images = _ref5.images;
	    return images.map(function (_ref6) {
	      var _ref62 = _slicedToArray(_ref6, 2);

	      var order = _ref62[0];
	      var url = _ref62[1];
	      return { order: order, url: 'https://cdn.mangaeden.com/mangasimg/' + url };
	    });
	  });
	}

	function getFavorites() {
	  var json = localStorage.getItem('manga-reader-favorite');
	  return json && JSON.parse(json) || {};
	}

	function addFavorite(mangaId) {
	  var favorites = getFavorites();
	  favorites[mangaId] = true;
	  return localStorage.setItem('manga-reader-favorite', JSON.stringify(favorites));
	}

	function removeFavorite(mangaId) {
	  var favorites = getFavorites();
	  delete favorites[mangaId];
	  return localStorage.setItem('manga-reader-favorite', JSON.stringify(favorites));
	}

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _function = __webpack_require__(257);

	var _function2 = _interopRequireDefault(_function);

	exports['default'] = {
	  shouldComponentUpdate: _function2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = shouldPureComponentUpdate;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _shallowEqual = __webpack_require__(258);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	function shouldPureComponentUpdate(nextProps, nextState) {
	  return !(0, _shallowEqual2['default'])(this.props, nextProps) || !(0, _shallowEqual2['default'])(this.state, nextState);
	}

	module.exports = exports['default'];

/***/ },
/* 258 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = shallowEqual;

	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
	  for (var i = 0; i < keysA.length; i++) {
	    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = exports['default'];

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(49);

	// Enable React Touch Events
	React.initializeTouchEvents(true);

	function getTouchProps(touch) {
		if (!touch) return {};
		return {
			pageX: touch.pageX,
			pageY: touch.pageY,
			clientX: touch.clientX,
			clientY: touch.clientY
		};
	}

	function isDataOrAriaProp(key) {
		return key.indexOf('data-') === 0 || key.indexOf('aria-') === 0;
	}

	function getPinchProps(touches) {
		return {
			touches: Array.prototype.map.call(touches, function copyTouch(touch) {
				return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY };
			}),
			center: { x: (touches[0].pageX + touches[1].pageX) / 2, y: (touches[0].pageY + touches[1].pageY) / 2 },
			angle: Math.atan() * (touches[1].pageY - touches[0].pageY) / (touches[1].pageX - touches[0].pageX) * 180 / Math.PI,
			distance: Math.sqrt(Math.pow(Math.abs(touches[1].pageX - touches[0].pageX), 2) + Math.pow(Math.abs(touches[1].pageY - touches[0].pageY), 2))
		};
	}

	/**
	 * Tappable Mixin
	 * ==============
	 */

	var Mixin = {
		propTypes: {
			moveThreshold: React.PropTypes.number, // pixels to move before cancelling tap
			activeDelay: React.PropTypes.number, // ms to wait before adding the `-active` class
			pressDelay: React.PropTypes.number, // ms to wait before detecting a press
			pressMoveThreshold: React.PropTypes.number, // pixels to move before cancelling press
			preventDefault: React.PropTypes.bool, // whether to preventDefault on all events
			stopPropagation: React.PropTypes.bool, // whether to stopPropagation on all events

			onTap: React.PropTypes.func, // fires when a tap is detected
			onPress: React.PropTypes.func, // fires when a press is detected
			onTouchStart: React.PropTypes.func, // pass-through touch event
			onTouchMove: React.PropTypes.func, // pass-through touch event
			onTouchEnd: React.PropTypes.func, // pass-through touch event
			onMouseDown: React.PropTypes.func, // pass-through mouse event
			onMouseUp: React.PropTypes.func, // pass-through mouse event
			onMouseMove: React.PropTypes.func, // pass-through mouse event
			onMouseOut: React.PropTypes.func, // pass-through mouse event

			onPinchStart: React.PropTypes.func, // fires when a pinch gesture is started
			onPinchMove: React.PropTypes.func, // fires on every touch-move when a pinch action is active
			onPinchEnd: React.PropTypes.func // fires when a pinch action ends
		},

		getDefaultProps: function getDefaultProps() {
			return {
				activeDelay: 0,
				moveThreshold: 100,
				pressDelay: 1000,
				pressMoveThreshold: 5
			};
		},

		getInitialState: function getInitialState() {
			return {
				isActive: false,
				touchActive: false,
				pinchActive: false
			};
		},

		componentWillUnmount: function componentWillUnmount() {
			this.cleanupScrollDetection();
			this.cancelPressDetection();
			this.clearActiveTimeout();
		},

		processEvent: function processEvent(event) {
			if (this.props.preventDefault) event.preventDefault();
			if (this.props.stopPropagation) event.stopPropagation();
		},

		onTouchStart: function onTouchStart(event) {
			if (this.props.onTouchStart && this.props.onTouchStart(event) === false) return;
			this.processEvent(event);
			window._blockMouseEvents = true;
			if (event.touches.length === 1) {
				this._initialTouch = this._lastTouch = getTouchProps(event.touches[0]);
				this.initScrollDetection();
				this.initPressDetection(event, this.endTouch);
				this._activeTimeout = setTimeout(this.makeActive, this.props.activeDelay);
			} else if ((this.props.onPinchStart || this.props.onPinchMove || this.props.onPinchEnd) && event.touches.length === 2) {
				this.onPinchStart(event);
			}
		},

		makeActive: function makeActive() {
			if (!this.isMounted()) return;
			this.clearActiveTimeout();
			this.setState({
				isActive: true
			});
		},

		clearActiveTimeout: function clearActiveTimeout() {
			clearTimeout(this._activeTimeout);
			this._activeTimeout = false;
		},

		onPinchStart: function onPinchStart(event) {
			// in case the two touches didn't start exactly at the same time
			if (this._initialTouch) {
				this.endTouch();
			}
			var touches = event.touches;
			this._initialPinch = getPinchProps(touches);
			this._initialPinch = _extends(this._initialPinch, {
				displacement: { x: 0, y: 0 },
				displacementVelocity: { x: 0, y: 0 },
				rotation: 0,
				rotationVelocity: 0,
				zoom: 1,
				zoomVelocity: 0,
				time: Date.now()
			});
			this._lastPinch = this._initialPinch;
			this.props.onPinchStart && this.props.onPinchStart(this._initialPinch, event);
		},

		onPinchMove: function onPinchMove(event) {
			if (this._initialTouch) {
				this.endTouch();
			}
			var touches = event.touches;
			if (touches.length !== 2) {
				return this.onPinchEnd(event) // bail out before disaster
				;
			}

			var currentPinch = touches[0].identifier === this._initialPinch.touches[0].identifier && touches[1].identifier === this._initialPinch.touches[1].identifier ? getPinchProps(touches) // the touches are in the correct order
			: touches[1].identifier === this._initialPinch.touches[0].identifier && touches[0].identifier === this._initialPinch.touches[1].identifier ? getPinchProps(touches.reverse()) // the touches have somehow changed order
			: getPinchProps(touches); // something is wrong, but we still have two touch-points, so we try not to fail

			currentPinch.displacement = {
				x: currentPinch.center.x - this._initialPinch.center.x,
				y: currentPinch.center.y - this._initialPinch.center.y
			};

			currentPinch.time = Date.now();
			var timeSinceLastPinch = currentPinch.time - this._lastPinch.time;

			currentPinch.displacementVelocity = {
				x: (currentPinch.displacement.x - this._lastPinch.displacement.x) / timeSinceLastPinch,
				y: (currentPinch.displacement.y - this._lastPinch.displacement.y) / timeSinceLastPinch
			};

			currentPinch.rotation = currentPinch.angle - this._initialPinch.angle;
			currentPinch.rotationVelocity = currentPinch.rotation - this._lastPinch.rotation / timeSinceLastPinch;

			currentPinch.zoom = currentPinch.distance / this._initialPinch.distance;
			currentPinch.zoomVelocity = (currentPinch.zoom - this._lastPinch.zoom) / timeSinceLastPinch;

			this.props.onPinchMove && this.props.onPinchMove(currentPinch, event);

			this._lastPinch = currentPinch;
		},

		onPinchEnd: function onPinchEnd(event) {
			// TODO use helper to order touches by identifier and use actual values on touchEnd.
			var currentPinch = _extends({}, this._lastPinch);
			currentPinch.time = Date.now();

			if (currentPinch.time - this._lastPinch.time > 16) {
				currentPinch.displacementVelocity = 0;
				currentPinch.rotationVelocity = 0;
				currentPinch.zoomVelocity = 0;
			}

			this.props.onPinchEnd && this.props.onPinchEnd(currentPinch, event);

			this._initialPinch = this._lastPinch = null;

			// If one finger is still on screen, it should start a new touch event for swiping etc
			// But it should never fire an onTap or onPress event.
			// Since there is no support swipes yet, this should be disregarded for now
			// if (event.touches.length === 1) {
			// 	this.onTouchStart(event);
			// }
		},

		initScrollDetection: function initScrollDetection() {
			this._scrollPos = { top: 0, left: 0 };
			this._scrollParents = [];
			this._scrollParentPos = [];
			var node = this.getDOMNode();
			while (node) {
				if (node.scrollHeight > node.offsetHeight || node.scrollWidth > node.offsetWidth) {
					this._scrollParents.push(node);
					this._scrollParentPos.push(node.scrollTop + node.scrollLeft);
					this._scrollPos.top += node.scrollTop;
					this._scrollPos.left += node.scrollLeft;
				}
				node = node.parentNode;
			}
		},

		calculateMovement: function calculateMovement(touch) {
			return {
				x: Math.abs(touch.clientX - this._initialTouch.clientX),
				y: Math.abs(touch.clientY - this._initialTouch.clientY)
			};
		},

		detectScroll: function detectScroll() {
			var currentScrollPos = { top: 0, left: 0 };
			for (var i = 0; i < this._scrollParents.length; i++) {
				currentScrollPos.top += this._scrollParents[i].scrollTop;
				currentScrollPos.left += this._scrollParents[i].scrollLeft;
			}
			return !(currentScrollPos.top === this._scrollPos.top && currentScrollPos.left === this._scrollPos.left);
		},

		cleanupScrollDetection: function cleanupScrollDetection() {
			this._scrollParents = undefined;
			this._scrollPos = undefined;
		},

		initPressDetection: function initPressDetection(event, callback) {
			if (!this.props.onPress) return;
			this._pressTimeout = setTimeout((function () {
				this.props.onPress(event);
				callback();
			}).bind(this), this.props.pressDelay);
		},

		cancelPressDetection: function cancelPressDetection() {
			clearTimeout(this._pressTimeout);
		},

		onTouchMove: function onTouchMove(event) {
			if (this._initialTouch) {
				this.processEvent(event);

				if (this.detectScroll()) return this.endTouch(event);

				this.props.onTouchMove && this.props.onTouchMove(event);
				this._lastTouch = getTouchProps(event.touches[0]);
				var movement = this.calculateMovement(this._lastTouch);
				if (movement.x > this.props.pressMoveThreshold || movement.y > this.props.pressMoveThreshold) {
					this.cancelPressDetection();
				}
				if (movement.x > this.props.moveThreshold || movement.y > this.props.moveThreshold) {
					if (this.state.isActive) {
						this.setState({
							isActive: false
						});
					} else if (this._activeTimeout) {
						this.clearActiveTimeout();
					}
				} else {
					if (!this.state.isActive && !this._activeTimeout) {
						this.setState({
							isActive: true
						});
					}
				}
			} else if (this._initialPinch && event.touches.length === 2) {
				this.onPinchMove(event);
				event.preventDefault();
			}
		},

		onTouchEnd: function onTouchEnd(event) {
			var _this = this;

			if (this._initialTouch) {
				this.processEvent(event);
				var afterEndTouch;
				var movement = this.calculateMovement(this._lastTouch);
				if (movement.x <= this.props.moveThreshold && movement.y <= this.props.moveThreshold && this.props.onTap) {
					event.preventDefault();
					afterEndTouch = function () {
						var finalParentScrollPos = _this._scrollParents.map(function (node) {
							return node.scrollTop + node.scrollLeft;
						});
						var stoppedMomentumScroll = _this._scrollParentPos.some(function (end, i) {
							return end !== finalParentScrollPos[i];
						});
						if (!stoppedMomentumScroll) {
							_this.props.onTap(event);
						}
					};
				}
				this.endTouch(event, afterEndTouch);
			} else if (this._initialPinch && event.touches.length + event.changedTouches.length === 2) {
				this.onPinchEnd(event);
				event.preventDefault();
			}
		},

		endTouch: function endTouch(event, callback) {
			this.cancelPressDetection();
			this.clearActiveTimeout();
			if (event && this.props.onTouchEnd) {
				this.props.onTouchEnd(event);
			}
			this._initialTouch = null;
			this._lastTouch = null;
			if (this.state.isActive) {
				this.setState({
					isActive: false
				}, callback);
			} else if (callback) {
				callback();
			}
		},

		onMouseDown: function onMouseDown(event) {
			if (window._blockMouseEvents) {
				window._blockMouseEvents = false;
				return;
			}
			if (this.props.onMouseDown && this.props.onMouseDown(event) === false) return;
			this.processEvent(event);
			this.initPressDetection(event, this.endMouseEvent);
			this._mouseDown = true;
			this.setState({
				isActive: true
			});
		},

		onMouseMove: function onMouseMove(event) {
			if (window._blockMouseEvents || !this._mouseDown) return;
			this.processEvent(event);
			this.props.onMouseMove && this.props.onMouseMove(event);
		},

		onMouseUp: function onMouseUp(event) {
			if (window._blockMouseEvents || !this._mouseDown) return;
			this.processEvent(event);
			this.props.onMouseUp && this.props.onMouseUp(event);
			this.props.onTap && this.props.onTap(event);
			this.endMouseEvent();
		},

		onMouseOut: function onMouseOut(event) {
			if (window._blockMouseEvents || !this._mouseDown) return;
			this.processEvent(event);
			this.props.onMouseOut && this.props.onMouseOut(event);
			this.endMouseEvent();
		},

		endMouseEvent: function endMouseEvent() {
			this.cancelPressDetection();
			this._mouseDown = false;
			this.setState({
				isActive: false
			});
		},

		touchStyles: function touchStyles() {
			return {
				WebkitTapHighlightColor: 'rgba(0,0,0,0)',
				WebkitTouchCallout: 'none',
				WebkitUserSelect: 'none',
				KhtmlUserSelect: 'none',
				MozUserSelect: 'none',
				msUserSelect: 'none',
				userSelect: 'none',
				cursor: 'pointer'
			};
		},

		handlers: function handlers() {
			return {
				onTouchStart: this.onTouchStart,
				onTouchMove: this.onTouchMove,
				onTouchEnd: this.onTouchEnd,
				onMouseDown: this.onMouseDown,
				onMouseUp: this.onMouseUp,
				onMouseMove: this.onMouseMove,
				onMouseOut: this.onMouseOut
			};
		}
	};

	/**
	 * Tappable Component
	 * ==================
	 */

	var Component = React.createClass({

		displayName: 'Tappable',

		mixins: [Mixin],

		propTypes: {
			component: React.PropTypes.any, // component to create
			className: React.PropTypes.string, // optional className
			classBase: React.PropTypes.string, // base for generated classNames
			style: React.PropTypes.object, // additional style properties for the component
			disabled: React.PropTypes.bool // only applies to buttons
		},

		getDefaultProps: function getDefaultProps() {
			return {
				component: 'span',
				classBase: 'Tappable'
			};
		},

		render: function render() {
			var props = this.props;
			var className = props.classBase + (this.state.isActive ? '-active' : '-inactive');

			if (props.className) {
				className += ' ' + props.className;
			}

			var style = {};
			_extends(style, this.touchStyles(), props.style);

			var newComponentProps = _extends({}, props, {
				style: style,
				className: className,
				disabled: props.disabled,
				handlers: this.handlers
			}, this.handlers());

			delete newComponentProps.onTap;
			delete newComponentProps.onPress;
			delete newComponentProps.onPinchStart;
			delete newComponentProps.onPinchMove;
			delete newComponentProps.onPinchEnd;
			delete newComponentProps.moveThreshold;
			delete newComponentProps.pressDelay;
			delete newComponentProps.pressMoveThreshold;
			delete newComponentProps.preventDefault;
			delete newComponentProps.stopPropagation;
			delete newComponentProps.component;

			return React.createElement(props.component, newComponentProps, props.children);
		}
	});

	Component.Mixin = Mixin;
	module.exports = Component;

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(261);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(267)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./styles.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./styles.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(263)();
	// imports


	// module

	// exports


/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "dd4781d1acc57ba4c4808d1b44301201.ttf"

/***/ },
/* 263 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "19e65b89cee273a249fba4c09b951b74.eot"

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "2c159d0d05473040b53ec79df8797d32.woff"

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "28df6ee7b407fd8a14b40bc01f4fd3ae.svg"

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(49);

	var _react2 = _interopRequireDefault(_react);

	var _touchstonejs = __webpack_require__(202);

	var _reactPureRenderMixin = __webpack_require__(256);

	var _reactPureRenderMixin2 = _interopRequireDefault(_reactPureRenderMixin);

	var _servicesMangaService = __webpack_require__(255);

	var formatter = new Intl.DateTimeFormat('en-US');

	var Item = _react2['default'].createClass({
	  displayName: 'Item',

	  mixins: [_touchstonejs.Navigation, _reactPureRenderMixin2['default']],

	  render: function render() {
	    var _props = this.props;
	    var order = _props.order;
	    var date = _props.date;
	    var title = _props.title;
	    var mangaId = _props.mangaId;
	    var mangaTitle = _props.mangaTitle;
	    var isFavorite = _props.isFavorite;
	    var fromFavorite = _props.fromFavorite;

	    var dateFormatted = undefined;
	    var chapterTitle = order + (title ? ' -' + title : '');
	    try {
	      dateFormatted = formatter.format(new Date(date * 1000));
	    } catch (e) {
	      dateFormatted = null;
	    }

	    return _react2['default'].createElement(
	      _touchstonejs.Link,
	      {
	        to: 'reader',
	        viewTransition: 'show-from-right',
	        params: { chapterId: this.props.id, chapterTitle: chapterTitle, mangaId: mangaId, mangaTitle: mangaTitle, isFavorite: isFavorite, fromFavorite: fromFavorite },
	        className: 'list-item manga-item is-tappable' },
	      _react2['default'].createElement(
	        'div',
	        { className: 'item-inner' },
	        _react2['default'].createElement(
	          'div',
	          { className: 'item-content' },
	          _react2['default'].createElement(
	            'div',
	            { className: 'item-title chapter-item-title' },
	            chapterTitle
	          )
	        ),
	        _react2['default'].createElement(_touchstonejs.UI.ItemNote, { type: 'default', label: dateFormatted, icon: 'ion-chevron-right' })
	      )
	    );
	  }
	});

	var MangaDetailsView = _react2['default'].createClass({
	  displayName: 'MangaDetailsView',

	  mixins: [_touchstonejs.Navigation, _reactPureRenderMixin2['default']],

	  componentWillMount: function componentWillMount() {
	    var _this = this;

	    (0, _servicesMangaService.fetchChapters)(this.props.mangaId).then(function (chapters) {
	      return _this.setState({ chapters: chapters });
	    });
	  },

	  getInitialState: function getInitialState() {
	    return { chapters: [], isFavorite: this.props.isFavorite };
	  },

	  toggleFavorite: function toggleFavorite() {
	    if (this.state.isFavorite) {
	      (0, _servicesMangaService.removeFavorite)(this.props.mangaId);
	      this.setState({ isFavorite: false });
	    } else {
	      (0, _servicesMangaService.addFavorite)(this.props.mangaId);
	      this.setState({ isFavorite: true });
	    }
	  },

	  render: function render() {
	    var _props2 = this.props;
	    var mangaTitle = _props2.mangaTitle;
	    var mangaId = _props2.mangaId;
	    var fromFavorite = _props2.fromFavorite;
	    var _state = this.state;
	    var chapters = _state.chapters;
	    var isFavorite = _state.isFavorite;

	    var chaptersItems = chapters.slice().sort(function (a, b) {
	      return b.order - a.order;
	    }).map(function (chapter) {
	      return _react2['default'].createElement(Item, _extends({ key: chapter.id }, chapter, { mangaId: mangaId, mangaTitle: mangaTitle, isFavorite: isFavorite,
	        fromFavorite: fromFavorite }));
	    });
	    return _react2['default'].createElement(
	      _touchstonejs.UI.View,
	      null,
	      _react2['default'].createElement(
	        _touchstonejs.UI.Headerbar,
	        { type: 'default', label: mangaTitle },
	        _react2['default'].createElement(_touchstonejs.UI.HeaderbarButton, {
	          showView: 'home', viewTransition: 'reveal-from-right', label: 'Back',
	          icon: 'ion-chevron-left',
	          viewProps: { isFavorite: fromFavorite } }),
	        _react2['default'].createElement(_touchstonejs.UI.HeaderbarButton, { position: 'right', icon: 'ion-ios-star', className: isFavorite ? '' : 'inactive', onTap: this.toggleFavorite })
	      ),
	      _react2['default'].createElement(
	        _touchstonejs.UI.ViewContent,
	        { grow: true, scrollable: true },
	        _react2['default'].createElement(
	          'div',
	          { className: 'panel mb-0' },
	          chaptersItems
	        )
	      )
	    );
	  }
	});

	exports['default'] = MangaDetailsView;
	module.exports = exports['default'];

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(49);

	var _react2 = _interopRequireDefault(_react);

	var _touchstonejs = __webpack_require__(202);

	var _servicesMangaService = __webpack_require__(255);

	var _reactPureRenderMixin = __webpack_require__(256);

	var _reactPureRenderMixin2 = _interopRequireDefault(_reactPureRenderMixin);

	var Reader = _react2['default'].createClass({
	  displayName: 'Reader',

	  mixins: [_touchstonejs.Navigation, _reactPureRenderMixin2['default']],

	  componentWillMount: function componentWillMount() {
	    var _this = this;

	    (0, _servicesMangaService.fetchChapter)(this.props.chapterId).then(function (images) {
	      return _this.setState({ images: images });
	    });
	  },

	  getInitialState: function getInitialState() {
	    return { images: [] };
	  },

	  render: function render() {
	    var _props = this.props;
	    var chapterTitle = _props.chapterTitle;
	    var mangaId = _props.mangaId;
	    var mangaTitle = _props.mangaTitle;
	    var isFavorite = _props.isFavorite;
	    var fromFavorite = _props.fromFavorite;
	    var images = this.state.images;

	    var imagesItems = images.slice().sort(function (a, b) {
	      return a.order - b.order;
	    }).map(function (_ref) {
	      var url = _ref.url;
	      var order = _ref.order;
	      return _react2['default'].createElement('img', { className: 'reader-img', key: order, src: url });
	    });
	    return _react2['default'].createElement(
	      _touchstonejs.UI.View,
	      null,
	      _react2['default'].createElement(
	        _touchstonejs.UI.Headerbar,
	        { type: 'default', label: chapterTitle },
	        _react2['default'].createElement(_touchstonejs.UI.HeaderbarButton, { showView: 'details', viewProps: { mangaId: mangaId, mangaTitle: mangaTitle, isFavorite: isFavorite, fromFavorite: fromFavorite },
	          viewTransition: 'reveal-from-right', label: 'Back', icon: 'ion-chevron-left' })
	      ),
	      _react2['default'].createElement(
	        _touchstonejs.UI.ViewContent,
	        { grow: true, scrollable: true },
	        imagesItems
	      )
	    );
	  }
	});

	exports['default'] = Reader;
	module.exports = exports['default'];

/***/ }
/******/ ]);