/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _this = this;

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const generateHtml = htmlTemplate => {
    let temp = document.createElement('div');
    temp.innerHTML = htmlTemplate.toString();
    return Array.from(temp.children);
};
// TODO: conditional rendering
const populateTemplate = (htmlTemplate, props) => __awaiter(_this, void 0, void 0, function* () {
    // replace all of the format ${replaceMe}
    let regex = /\${(.*?)}/g;
    let match;
    let replace = {};
    while ((match = regex.exec(htmlTemplate)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (match.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        let replacement;
        // parse data if in object
        if (propsHasProperty(props, match[1])) {
            const propertyName = getPropertyName(match[1]);
            replacement = yield processProperty(props, propertyName);
        } else if (getDefaultValue(match[1])) {
            replacement = getDefaultValue(match[1]);
        } else {
            replacement = 'no data';
        }
        replace[match[0]] = replacement;
    }
    Object.keys(replace).forEach(key => {
        htmlTemplate = htmlTemplate.replace(key, replace[key]);
    });
    return generateHtml(htmlTemplate);
});
/* harmony export (immutable) */ __webpack_exports__["a"] = populateTemplate;

const processProperty = (props, propertyName) => __awaiter(_this, void 0, void 0, function* () {
    // execute function
    if (typeof props[propertyName] === 'function') return yield props[propertyName]();else if (Array.isArray(props[propertyName])) return props[propertyName].join(', ');else return props[propertyName];
});
const propsHasProperty = (props, property) => {
    return props[getPropertyName(property)];
};
const getPropertyName = match => {
    return match.split('=').length > 1 ? match.split('=')[0] : match;
};
const getDefaultValue = match => {
    return match.split('=').length > 1 ? match.split('=')[1] : null;
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return apiManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dummy_book_json__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dummy_book_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__dummy_book_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_json__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__settings_json__);
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const useCachedResults = false;
const localApiDelay = 0;
class ApiManager {
    constructor() {
        this.getSettings = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.getJsonFile('./settings.json', __WEBPACK_IMPORTED_MODULE_1__settings_json___default.a);
        });
        this.getBookData = isbn => __awaiter(this, void 0, void 0, function* () {
            return yield this.getJsonFromEndpoint(`https://openlibrary.org/isbn/${isbn}.json`, __WEBPACK_IMPORTED_MODULE_0__dummy_book_json___default.a);
        });
        /*
         Backend Functions
         */
        this.getJsonFile = (endpointUrl, cachedResult) => {
            return new Promise((returnResponse, returnError) => {
                // check if we are needing local data
                if (useCachedResults) {
                    setTimeout(() => {
                        returnResponse(cachedResult);
                    }, localApiDelay);
                } else {
                    fetch(endpointUrl).then(response => {
                        if (response.status == 200) {
                            returnResponse(response.json());
                        }
                        returnError({});
                    }).catch(() => {
                        returnError({});
                    });
                }
            });
        };
        this.getJsonFromEndpoint = (endpointUrl, cachedResult) => {
            return new Promise(returnResponse => {
                // check if we are needing local data
                if (useCachedResults) {
                    setTimeout(() => {
                        returnResponse(cachedResult);
                    }, localApiDelay);
                } else {
                    // get data from api
                    this.getResponseFromApi(endpointUrl).then(apiResponse => returnResponse(apiResponse));
                }
            });
        };
        this.getResponseFromApi = endpointUrl => {
            return fetch(endpointUrl).then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return {};
                }
            }).catch(response => {
                return {
                    status: 'error',
                    data: response,
                    message: `Fetch error. Data contains entire response.`
                };
            });
        };
    }
    getReviewData(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getJsonFile(endpoint);
        });
    }
}
let apiManager = new ApiManager();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_main_styl__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_main_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_main_styl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__templatelib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_root_html__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__templates_root_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__templates_root_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__apimanager__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__objects_book__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__objects_place__ = __webpack_require__(15);
var _this = this;

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







let header = document.getElementById("header");
let nav = document.getElementById("nav");
let content = document.getElementById("content");
const initiateRouter = () => __awaiter(_this, void 0, void 0, function* () {
    const addRemainingRoutes = modules => __awaiter(this, void 0, void 0, function* () {
        const enabledModules = Object.keys(modules).filter(moduleName => modules[moduleName].enabled).map(moduleName => {
            modules[moduleName]['name'] = moduleName;
            return modules[moduleName];
        });
        enabledModules.forEach(module => {
            const generator = () => __awaiter(this, void 0, void 0, function* () {
                const data = yield __WEBPACK_IMPORTED_MODULE_4__apimanager__["a" /* apiManager */].getReviewData(module.json);
                let reviews;
                if (module.name === 'Books') {
                    reviews = data.map(object => new __WEBPACK_IMPORTED_MODULE_5__objects_book__["a" /* Book */](object));
                } else if (module.name === 'Places') {
                    reviews = data.map(object => new __WEBPACK_IMPORTED_MODULE_6__objects_place__["a" /* Place */](object));
                } else {
                    reviews = [];
                }
                const htmlElements = yield Promise.all(reviews.map(review => {
                    return review.render();
                }));
                return [].concat(...htmlElements);
            });
            __WEBPACK_IMPORTED_MODULE_1__router__["a" /* router */].addRoute({
                url: module.route,
                name: module.name,
                generator
            });
        });
    });
    __WEBPACK_IMPORTED_MODULE_1__router__["a" /* router */].getOrCreate(header, nav, content);
    __WEBPACK_IMPORTED_MODULE_1__router__["a" /* router */].addRoute({
        url: '',
        name: 'Home',
        generator: () => __awaiter(this, void 0, void 0, function* () {
            return yield Object(__WEBPACK_IMPORTED_MODULE_2__templatelib__["a" /* populateTemplate */])(__WEBPACK_IMPORTED_MODULE_3__templates_root_html__["toString"](), {});
        })
    });
    yield addRemainingRoutes((yield __WEBPACK_IMPORTED_MODULE_4__apimanager__["a" /* apiManager */].getSettings()).modules);
    yield __WEBPACK_IMPORTED_MODULE_1__router__["a" /* router */].generatePage();
    document.getElementById('body').className = "";
});
initiateRouter();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(7)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/stylus-loader/index.js!./main.styl", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/stylus-loader/index.js!./main.styl");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "/* latin */\n@font-face {\n  font-family: 'Roboto Mono';\n  font-style: normal;\n  font-weight: 300;\n  src: local('Roboto Mono Light'), local('RobotoMono-Light'), url(\"https://fonts.gstatic.com/s/robotomono/v4/N4duVc9C58uwPiY8_59Fz9TIkQYohD4BpHvJ3NvbHoA.woff2\") format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\n/* latin */\n@font-face {\n  font-family: 'Roboto Mono';\n  font-style: normal;\n  font-weight: 500;\n  src: local('Roboto Mono Medium'), local('RobotoMono-Medium'), url(\"https://fonts.gstatic.com/s/robotomono/v4/N4duVc9C58uwPiY8_59Fz3JuJo8UJJfpGKt7pXjBv4s.woff2\") format('woff2');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n}\nbody {\n  font-weight: 300;\n  font-size: 12px;\n  font-family: 'Roboto Mono', monospace;\n}\na {\n  color: #000;\n}\nh1 {\n  margin: 1em 0 0.5em 0;\n}\np {\n  margin: 0;\n}\nbody {\n  min-width: 372px;\n  display: flex;\n  flex-direction: column;\n  padding: 1em;\n}\nbody * {\n  transition: opacity 0.2s ease-in-out;\n}\nbody > header#header {\n  cursor: pointer;\n  font-weight: 500;\n  font-size: 3em;\n  margin: 1em;\n  text-align: center;\n  user-select: none;\n}\nbody > nav {\n  margin: 1em;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\nbody > nav div {\n  cursor: pointer;\n  margin: 0 1em;\n  font-size: 1.5em;\n  text-decoration: none;\n  text-transform: uppercase;\n  user-select: none;\n}\nbody > section {\n  max-width: 800px;\n  margin: 0 auto;\n  width: 100%;\n}\nbody > section.root {\n  text-align: justify;\n}\nbody > section article {\n  border-left: 2px solid #000;\n  font-size: 1.1em;\n}\nbody > section article.review {\n  margin: 1em 0;\n  padding: 1em;\n}\nbody > section article.review header {\n  font-weight: 500;\n  display: flex;\n  flex-direction: row;\n}\nbody > section article.review header div.rating {\n  margin-left: auto;\n}\nbody > section article.review main {\n  margin: 1em 0 0 0;\n}\n", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
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

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
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

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

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

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return router; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__apimanager__ = __webpack_require__(1);
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var ElementType;
(function (ElementType) {
    ElementType[ElementType["header"] = 0] = "header";
    ElementType[ElementType["nav"] = 1] = "nav";
    ElementType[ElementType["content"] = 2] = "content";
})(ElementType || (ElementType = {}));
class Router {
    constructor() {
        this.getOrCreate = (headerElement, navElement, contentElement) => {
            if (!this.root) {
                this.routes = [];
                this.root = "/reviews/";
                this.header = headerElement;
                this.nav = navElement;
                this.content = contentElement;
            }
            return this;
        };
        this.removeSlashes = path => {
            return path.toString().replace(/\/$/, '').replace(/^\//, '');
        };
        this.generatePage = () => __awaiter(this, void 0, void 0, function* () {
            return Promise.all([this.generateHeader(), this.generateNavBar(), this.generateContent()]);
        });
        this.generateHeader = () => __awaiter(this, void 0, void 0, function* () {
            const settings = (yield __WEBPACK_IMPORTED_MODULE_0__apimanager__["a" /* apiManager */].getSettings()).title;
            if (settings) this.header.innerText = settings;
            this.header.onclick = () => this.routeTo(this.root);
        });
        this.generateNavBar = () => __awaiter(this, void 0, void 0, function* () {
            const nav = document.createElement('nav');
            nav.id = 'nav';
            this.routes.forEach(route => {
                const navElement = document.createElement('div');
                navElement.innerHTML = route.name;
                navElement.onclick = () => {
                    this.routeTo(route.url);
                };
                nav.appendChild(navElement);
            });
            this.replaceElement(ElementType.nav, Array.from(nav.children));
        });
        this.generateContent = () => __awaiter(this, void 0, void 0, function* () {
            // this.content.className = 'loading';
            let matches = this.routes.filter(route => {
                return this.removeSlashes(this.root + route.url) === this.getCurrentUrl();
            });
            if (matches.length === 1) {
                try {
                    let pageElements = yield matches[0].generator();
                    this.replaceElement(ElementType.content, pageElements);
                } catch (e) {
                    console.error(e);
                    this.generateError(e.toString());
                }
            } else {
                this.generateError("FUCKING 404 M8");
            }
            setTimeout(() => this.content.className = '', 10);
        });
        this.replaceElement = (toBeReplaced, replacement) => {
            let element;
            if (toBeReplaced == ElementType.header) element = this.header;else if (toBeReplaced == ElementType.nav) element = this.nav;else element = this.content;
            const replacementArray = replacement instanceof Array ? replacement : [replacement];
            element.innerHTML = '';
            replacementArray.forEach(newChild => {
                element.appendChild(newChild);
            });
        };
        this.addRoute = route => {
            this.routes.push(route);
        };
        this.routeTo = path => {
            if (this.isRoute(path)) {
                history.pushState(null, path, this.root + this.removeSlashes(path));
                this.generateContent();
            }
        };
        this.isRoute = path => this.routes.some(route => route.url === path);
        window.onpopstate = () => {
            this.generatePage();
        };
    }
    getCurrentUrl() {
        let url = this.removeSlashes(decodeURI(location.pathname + location.search));
        url = url.replace(/\?(.*)$/, '');
        url = this.root != '/' ? url.replace(this.root, '') : url;
        return this.removeSlashes(url);
    }
    generateError(message) {
        let errorMessage = document.createElement('section');
        errorMessage.innerText = `Invalid Generator Function: ${message}`;
        this.replaceElement(ElementType.content, errorMessage);
    }
}
/* unused harmony export Router */

let router = new Router();

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {"publishers":["Prentice Hall"],"classifications":{},"key":"/books/OL26222911M","created":{"type":"/type/datetime","value":"2017-02-09T02:17:10.400677"},"title":"Clean Code","identifiers":{},"isbn_13":["978-0132350884"],"isbn_10":["0132350882"],"publish_date":"July 2008","last_modified":{"type":"/type/datetime","value":"2017-02-09T02:18:23.554296"},"ocaid":"CleanCode_201607","latest_revision":2,"works":[{"key":"/works/OL17618370W"}],"type":{"key":"/type/edition"},"revision":2}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {"title":"Alex's Reviews","modules":{"Books":{"enabled":true,"json":"/reviews/books.json","route":"books"},"Places":{"enabled":true,"json":"/reviews/places.json","route":"places"}}}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "<h1>Purpose</h1>\n<p>This is my page where I review bits and pieces that I enjoy. Feel free to read through my reviews. They\n    are mainly there to boost my own retention and make me remember my experiences.</p>\n\n<h1>Technology</h1>\n<p>This site was programmed over the course of 4 or 5 hours as a challenge to myself to create a json-powered and\n    routed review website without any clientside dependencies. It includes a (primitive) templating engine (using\n    the extremely cool Promise.all and a html5 history API compliant route manager as well. This creates a fast\n    (and simple) fetch API powered one page application. The styling used is intended to reflect that.</p>\n\n<h1>Source Code</h1>\n<p>If you'd like to read to source code (or host a copy of the site yourself) you can do so by downloading\n    the repo. It requires no server-side processing or database. It is all flat files and can be dropped into\n    the web folder and run immediately.</p>\n";

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__templates_book_html__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__templates_book_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__templates_book_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__templatelib__ = __webpack_require__(0);
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class Book {
    constructor(book) {
        this.render = () => __awaiter(this, void 0, void 0, function* () {
            return yield Object(__WEBPACK_IMPORTED_MODULE_1__templatelib__["a" /* populateTemplate */])(__WEBPACK_IMPORTED_MODULE_0__templates_book_html__["toString"](), this);
        });
        this.name = book.name;
        this.rating = book.rating;
        this.review = book.review;
        this.date = book.date;
        this.website = book.website;
        this.pros = book.pros;
        this.cons = book.cons;
        this.author = book.author;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Book;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "<article class=\"review book\">\n    <header>\n        ${name} - ${author}\n        <div class=\"rating\">${rating=no rating} out of 5</div>\n    </header>\n    <main>${review=no review}</main>\n</article>";

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__templates_place_html__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__templates_place_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__templates_place_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__templatelib__ = __webpack_require__(0);
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class Place {
    constructor(place) {
        this.render = () => __awaiter(this, void 0, void 0, function* () {
            return yield Object(__WEBPACK_IMPORTED_MODULE_1__templatelib__["a" /* populateTemplate */])(__WEBPACK_IMPORTED_MODULE_0__templates_place_html__["toString"](), this);
        });
        this.name = place.name;
        this.rating = place.rating;
        this.review = place.review;
        this.date = place.date;
        this.website = place.website;
        this.pros = place.pros;
        this.cons = place.cons;
        this.address = place.address;
        this.price = place.price;
        this.food = place.food;
        this.googlemaps = place.googlemaps;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Place;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "<article class=\"review place\">\n    <header>\n        <p><a href=\"${website=#}\">${name}</a> - <a href=\"https://goo.gl/maps/${googlemaps}\">${address}</a> - ${price=free?}</p>\n        <div class=\"rating\">${rating=no rating} out of 5</div>\n    </header>\n    <main>\n        <p><b>order:</b> ${food}</p>\n        <p><b>pros:</b> ${pros=none :(}</p>\n        <p><b>cons:</b> ${cons=none!}</p>\n        <p><b>review:</b> ${review=no clue}</p>\n    </main>\n</article>";

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map