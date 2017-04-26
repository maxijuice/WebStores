var webStores =
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by maksim.bulakhau on 4/26/2017.
 */
// HTML ids, classes and string consts
var optionAll = "All";
var citySelectId = "selectCity";
var countrySelectId = "selectCountry";
var pagingClass = "paging";
var pagingUnitClass = "page";
var currentPagingUnitClass = "current-page";
var tableContainerId = "resultTableWrapper";

var itemsPerPage = 10;

// Require all json files
var cities = __webpack_require__(11);
var countries = __webpack_require__(12);
var stores = __webpack_require__(13);
var streets = __webpack_require__(14);
var zips = __webpack_require__(15);
var brands = __webpack_require__(10);
var fs = __webpack_require__(9);

// IndexedDB keys for jsons
var citiesKey = "cities.json";
var countriesKey = "countries.json";
var storesKey = "stores.json";
var streetsKey = "streets.json";
var zipsKey = "zips.json";
var brandsKey = "brands.json";

exports.itemsPerPage = itemsPerPage;
exports.fs = fs;
exports.cities = cities;
exports.countries = countries;
exports.stores = stores;
exports.streets = streets;
exports.zips = zips;
exports.brands = brands;
exports.optionAll = optionAll;
exports.citySelectId = citySelectId;
exports.countrySelectId = countrySelectId;
exports.citiesKey = citiesKey;
exports.countriesKey = countriesKey;
exports.storesKey = storesKey;
exports.streetsKey = streetsKey;
exports.zipsKey = zipsKey;
exports.brandsKey = brandsKey;
exports.pagingClass = pagingClass;
exports.pagingUnitClass = pagingUnitClass;
exports.tableContainerId = tableContainerId;
exports.currentPagingUnitClass = currentPagingUnitClass;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initDropdown = exports.updateCountriesDropdown = exports.updateCitiesDropdown = undefined;

var _consts = __webpack_require__(0);

var _stores = __webpack_require__(2);

/**
 * Created by maksim.bulakhau on 4/26/2017.
 */
function initDropdown(dropdownId, dataPromise) {
    var dropdown = document.getElementById(dropdownId);

    dropdown.add(new Option(_consts.optionAll));
    return dataPromise.then(function (dataItems) {
        dataItems.forEach(function (item) {
            dropdown.add(new Option(item.name, item.name));
        });
    });
}

function clearDropdown(dropdownId) {
    var dropdown = document.getElementById(dropdownId);

    while (dropdown.options.length > 0) {
        dropdown.remove(0);
    }
}

function setSelectedValue(dropdownId, value) {
    var dropdown = document.getElementById(dropdownId);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = dropdown.options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            if (item.value == value) {
                item.selected = true;
                break;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

function updateCitiesDropdown(countryName) {
    clearDropdown(_consts.citySelectId);
    var selector = countryName == _consts.optionAll ? _stores.service.cities : _stores.service.getCitiesByCountry(countryName);

    return initDropdown(_consts.citySelectId, selector);
}

function updateCountriesDropdown(cityName) {
    if (document.getElementById(_consts.countrySelectId).value != _consts.optionAll) {
        return;
    }

    var country = _stores.service.getCountryByCity(cityName);

    country.then(function (countries) {
        var countryName = countries[0].name;
        setSelectedValue(_consts.countrySelectId, countryName);
        updateCitiesDropdown(countryName).then(function (done) {
            return setSelectedValue(_consts.citySelectId, cityName);
        });
    });
}

exports.updateCitiesDropdown = updateCitiesDropdown;
exports.updateCountriesDropdown = updateCountriesDropdown;
exports.initDropdown = initDropdown;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.service = undefined;

var _consts = __webpack_require__(0);

var service = function () {

    function resolveJson(path, onDone, filters) {
        return new Promise(function resolver(resolve, reject) {
            _consts.fs.readString(path).then(function (data) {
                return resolve(onDone(filters, JSON.parse(data)));
            }, function (error) {
                return reject(error);
            });
        });
    }

    // This method requires to be pre-binded with first two arguments,
    // each for property names of filter and readed json correspondinly
    function getByProp(filterProp, sourceItemProp, filters, sourceArray) {
        var resultArray = [];

        filters.forEach(function (filter) {
            var temp = sourceArray.filter(function (sourceItem) {
                return filter[filterProp] == sourceItem[sourceItemProp];
            });
            temp.forEach(function (filtered) {
                return resultArray.push(filtered);
            });
        });

        return resultArray;
    }

    // This method works for occasions, when filter is a string already
    function getByName(filter, sourceArray) {
        return sourceArray.filter(function (sourceItem) {
            return sourceItem.name.search(filter) != -1;
        });
    }

    // Public methods for different purposes, which are wrappers on resolveJson calls
    function getStoresByCity(cityName) {
        return resolveJson(_consts.citiesKey, getByName, cityName).then(resolveJson.bind(null, _consts.zipsKey, getByProp.bind(null, "name", "city"))).then(resolveJson.bind(null, _consts.storesKey, getByProp.bind(null, "zip", "zip")));
    }

    function getStoresByCountry(countryName) {
        return resolveJson(_consts.countriesKey, getByName, countryName).then(resolveJson.bind(null, _consts.citiesKey, getByProp.bind(null, "name", "country"))).then(resolveJson.bind(null, _consts.zipsKey, getByProp.bind(null, "name", "city"))).then(resolveJson.bind(null, _consts.storesKey, getByProp.bind(null, "zip", "zip")));
    }

    function getCitiesByCountry(countryName) {
        return resolveJson(_consts.countriesKey, getByName, countryName).then(resolveJson.bind(null, _consts.citiesKey, getByProp.bind(null, "name", "country")));
    }

    function getCountryByCity(cityName) {
        return resolveJson(_consts.citiesKey, getByName, cityName).then(resolveJson.bind(null, _consts.countriesKey, getByProp.bind(null, "country", "name")));
    }

    function getTable(path) {
        return resolveJson(path, getByName, "");
    }

    return {
        cities: getTable(_consts.citiesKey),
        countries: getTable(_consts.countriesKey),
        getCitiesByCountry: getCitiesByCountry,
        getCountryByCity: getCountryByCity,
        getStoresByCity: getStoresByCity,
        getStoresByCountry: getStoresByCountry
    };
}(); /**
      * Created by maksim.bulakhau on 4/19/2017.
      */
exports.service = service;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*fs-web@1.0.0#directory_entry*/

Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _path = __webpack_require__(4);
var _path2 = _interopRequireDefault(_path);
function DirectoryEntry(fullPath, type) {
    this.path = fullPath;
    this.name = _path2['default'].basename(fullPath);
    this.dir = _path2['default'].dirname(fullPath);
    this.type = type;
}
exports['default'] = DirectoryEntry;
module.exports = exports['default'];

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Created by maksim.bulakhau on 3/27/2017.
 */
/*
 Array Library object for operating on arrays
 */

/*
 It would be great to add static keyword, which could be applied on classes
 In ES5 that would look like:

 var StaticClass = function() {};
 StaticClass.prototype = Object.create(null);
 StaticClass.method1 = function() { / native code / };
 */


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArrayLibrary = function () {
    function ArrayLibrary() {
        _classCallCheck(this, ArrayLibrary);
    }

    _createClass(ArrayLibrary, null, [{
        key: "take",
        value: function take(array, n) {
            return array.slice(0, n);
        }
    }, {
        key: "skip",
        value: function skip(array, n) {
            return array.slice(n);
        }
    }, {
        key: "map",
        value: function map(array, callback) {
            var newArray = [];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    if (typeof item !== "undefined") {
                        newArray.push(callback(item));
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return newArray;
        }
    }, {
        key: "reduce",
        value: function reduce(array, callback) {
            var value = 0;

            if ((arguments.length <= 2 ? 0 : arguments.length - 2) > 0) {
                value = arguments.length <= 2 ? undefined : arguments[2];
            } else {
                value = array[0];
                array = array.slice(1);
            }

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = array[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;

                    if (typeof item !== "undefined") {
                        value = callback(value, item);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return value;
        }
    }, {
        key: "foreach",
        value: function foreach(array, callback) {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = array[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var item = _step3.value;

                    if (typeof item !== "undefined") {
                        callback(item, array.indexOf(item), array);
                    }
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }, {
        key: "filter",
        value: function filter(array, callback) {
            var newArray = [];

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = array[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var item = _step4.value;

                    if (callback(item, array.indexOf(item), array)) {
                        newArray.push(item);
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return newArray;
        }
    }, {
        key: "chain",
        value: function chain(initArray) {
            var _this = this;

            var wrapChain = function wrapChain(callback) {
                callback = callback.bind(null, initArray);
                return function () {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    return _this.chain(callback.apply(null, args));
                };
            };

            return {
                take: wrapChain(this.take),
                skip: wrapChain(this.skip),
                map: wrapChain(this.map),
                foreach: wrapChain(this.foreach),
                filter: wrapChain(this.filter),
                value: function value() {
                    return initArray;
                }
            };
        }
    }, {
        key: "sum",
        value: function sum(array, start, end) {
            if (!this.memo) {
                this.memo = {};
            }

            function summarize(array, start, end, memo) {
                var property = array + ", " + start + ", " + end;

                if (property in memo) {
                    return memo[property];
                } else {
                    var resultSum = 0;
                    for (var i = start; i <= end; i++) {
                        resultSum += array[i];
                    }
                    memo[property] = resultSum;
                    return resultSum;
                }
            }

            return summarize(array, start, end, this.memo);
        }
    }]);

    return ArrayLibrary;
}();

exports.default = ArrayLibrary;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.submitStoresSearch = undefined;

var _consts = __webpack_require__(0);

var _arraylib = __webpack_require__(5);

var _arraylib2 = _interopRequireDefault(_arraylib);

var _stores = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by maksim.bulakhau on 4/26/2017.
 */
var dataSet;

function getDataSet() {
    var selectedCity = document.getElementById(_consts.citySelectId).value;
    var stores = [];

    if (selectedCity === _consts.optionAll) {
        var selectedCountry = document.getElementById(_consts.countrySelectId).value;
        selectedCountry = selectedCountry === _consts.optionAll ? "" : selectedCountry;
        stores = _stores.service.getStoresByCountry(selectedCountry);
    } else {
        stores = _stores.service.getStoresByCity(selectedCity);
    }

    return stores;
}

function initStoresTable(data, page) {

    // Delete previous table.
    var tableWrapperDiv = document.getElementById(_consts.tableContainerId);
    while (tableWrapperDiv.firstChild) {
        tableWrapperDiv.removeChild(tableWrapperDiv.firstChild);
    }

    // Create table with proper bootstrap classes.
    var storesTable = document.createElement("table");
    storesTable.classList.add("table", "table-striped", "table-hover");

    data.then(function (stores) {
        if (stores.length > 0) {

            var _data = _arraylib2.default.chain(stores).skip((page - 1) * _consts.itemsPerPage).take(_consts.itemsPerPage).value();

            // Table head init.
            var propNames = Object.getOwnPropertyNames(stores[0]);
            var headRow = document.createElement("tr");

            propNames.forEach(function (propName) {
                var cell = document.createElement("th");
                var cellText = document.createTextNode(propName);
                cell.appendChild(cellText);
                headRow.appendChild(cell);
            });

            storesTable.appendChild(headRow);

            // Table data init.
            _data.forEach(function (store) {
                var row = document.createElement("tr");

                propNames.forEach(function (property) {
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(store[property]);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                });

                storesTable.appendChild(row);
            });
        } else {
            var errorMsg = document.createElement("tr");
            errorMsg.innerHTML = "No results found";
            storesTable.appendChild(errorMsg);
        }

        tableWrapperDiv.appendChild(storesTable);

        // Enable paging if result set is too big
        if (stores.length > _consts.itemsPerPage) {
            initPaging((stores.length / _consts.itemsPerPage).toFixed(), page);
        }
    });
}

function submitStoresSearch() {
    dataSet = getDataSet();
    initStoresTable(dataSet, 1);
}

function goToPage(pageNum) {
    initStoresTable(dataSet, pageNum);
}

function initPaging(pagesAmount, currentPage) {
    var tableContainerDiv = document.getElementById(_consts.tableContainerId);
    var paging = document.createElement("div");
    paging.classList.add(_consts.pagingClass);

    for (var i = 1; i <= pagesAmount; i++) {
        var page = document.createElement("a");
        page.setAttribute("href", "#");
        page.innerHTML = i;
        page.classList.add(_consts.pagingUnitClass);
        page.addEventListener("click", goToPage.bind(null, i));
        if (i == currentPage) {
            page.classList.add(_consts.currentPagingUnitClass);
        }

        paging.appendChild(page);
    }

    tableContainerDiv.appendChild(paging);
}

exports.submitStoresSearch = submitStoresSearch;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dropdowns = exports.submitStoresSearch = undefined;

var _consts = __webpack_require__(0);

var _dropdowns = __webpack_require__(1);

var dropdowns = _interopRequireWildcard(_dropdowns);

var _table = __webpack_require__(6);

var _stores = __webpack_require__(2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(function initFs(done) {
    _consts.fs.writeFile(_consts.citiesKey, JSON.stringify(_consts.cities)).then(function () {
        return _consts.fs.writeFile(_consts.countriesKey, JSON.stringify(_consts.countries));
    }).then(function () {
        return _consts.fs.writeFile(_consts.storesKey, JSON.stringify(_consts.stores));
    }).then(function () {
        return _consts.fs.writeFile(_consts.brandsKey, JSON.stringify(_consts.brands));
    }).then(function () {
        return _consts.fs.writeFile(_consts.zipsKey, JSON.stringify(_consts.zips));
    }).then(function () {
        return _consts.fs.writeFile(_consts.streetsKey, JSON.stringify(_consts.streets));
    }).then(function () {
        done;
    });
})(); /**
       * Created by maksim.bulakhau on 4/21/2017.
       */


(function initPageDropdowns() {
    dropdowns.initDropdown(_consts.countrySelectId, _stores.service.countries);
    dropdowns.initDropdown(_consts.citySelectId, _stores.service.cities);
})();

exports.submitStoresSearch = _table.submitStoresSearch;
exports.dropdowns = dropdowns;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*fs-web@1.0.0#core*/

Object.defineProperty(exports, '__esModule', { value: true });
exports.readFile = readFile;
exports.readString = readString;
exports.writeFile = writeFile;
exports.removeFile = removeFile;
exports.readdir = readdir;
exports.mkdir = mkdir;
exports.rmdir = rmdir;
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _path = __webpack_require__(4);
var _path2 = _interopRequireDefault(_path);
var _directory_entry = __webpack_require__(3);
var _directory_entry2 = _interopRequireDefault(_directory_entry);
function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}
function str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2);
    var bufView = new Uint16Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
var DB_NAME = window.location.host + '_filesystem', OS_NAME = 'files', DIR_IDX = 'dir';
function init(callback) {
    var req = window.indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = function (e) {
        var db = e.target.result;
        var objectStore = db.createObjectStore(OS_NAME, { keyPath: 'path' });
        objectStore.createIndex(DIR_IDX, 'dir', { unique: false });
    };
    req.onsuccess = function (e) {
        callback(e.target.result);
    };
}
function initOS(type, callback) {
    init(function (db) {
        var trans = db.transaction([OS_NAME], type), os = trans.objectStore(OS_NAME);
        callback(os);
    });
}
var readFrom = function readFrom(fileName) {
    return new Promise(function (resolve, reject) {
        initOS('readonly', function (os) {
            var req = os.get(fileName);
            req.onerror = reject;
            req.onsuccess = function (e) {
                var res = e.target.result;
                if (res && res.data) {
                    resolve(res.data);
                } else {
                    reject('File not found');
                }
            };
        });
    });
};
function readFile(fileName) {
    return readFrom(fileName).then(function (data) {
        if (!(data instanceof ArrayBuffer)) {
            data = str2ab(data.toString());
        }
        return data;
    });
}
function readString(fileName) {
    return readFrom(fileName).then(function (data) {
        if (data instanceof ArrayBuffer) {
            data = ab2str(data);
        }
        return data;
    });
}
;
function writeFile(fileName, data) {
    return new Promise(function (resolve, reject) {
        initOS('readwrite', function (os) {
            var req = os.put({
                'path': fileName,
                'dir': _path2['default'].dirname(fileName),
                'type': 'file',
                'data': data
            });
            req.onerror = reject;
            req.onsuccess = function (e) {
                resolve();
            };
        });
    });
}
;
function removeFile(fileName) {
    return new Promise(function (resolve) {
        initOS('readwrite', function (os) {
            var req = os['delete'](fileName);
            req.onerror = req.onsuccess = function (e) {
                resolve();
            };
        });
    });
}
;
function withTrailingSlash(path) {
    var directoryWithTrailingSlash = path[path.length - 1] === '/' ? path : path + '/';
    return directoryWithTrailingSlash;
}
function readdir(directoryName) {
    return new Promise(function (resolve, reject) {
        initOS('readonly', function (os) {
            var dir = _path2['default'].dirname(withTrailingSlash(directoryName));
            var idx = os.index(DIR_IDX);
            var range = IDBKeyRange.only(dir);
            var req = idx.openCursor(range);
            req.onerror = function (e) {
                reject(e);
            };
            var results = [];
            req.onsuccess = function (e) {
                var cursor = e.target.result;
                if (cursor) {
                    var value = cursor.value;
                    var entry = new _directory_entry2['default'](value.path, value.type);
                    results.push(entry);
                    cursor['continue']();
                } else {
                    resolve(results);
                }
            };
        });
    });
}
;
function mkdir(fullPath) {
    return new Promise(function (resolve, reject) {
        initOS('readwrite', function (os) {
            var dir = withTrailingSlash(_path2['default']);
            var req = os.put({
                'path': fullPath,
                'dir': _path2['default'].dirname(dir),
                'type': 'directory'
            });
            req.onerror = reject;
            req.onsuccess = function (e) {
                resolve();
            };
        });
    });
}
;
function rmdir(fullPath) {
    return readdir(fullPath).then(function removeFiles(files) {
        if (!files || !files.length) {
            return removeFile(fullPath);
        }
        var file = files.shift(), func = file.type === 'directory' ? rmdir : removeFile;
        return func(file.name).then(function () {
            return removeFiles(files);
        });
    });
}
;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*fs-web@1.0.0#fs*/

Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                    newObj[key] = obj[key];
            }
        }
        newObj['default'] = obj;
        return newObj;
    }
}
function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var value = Object.getOwnPropertyDescriptor(defaults, key);
        if (value && value.configurable && obj[key] === undefined) {
            Object.defineProperty(obj, key, value);
        }
    }
    return obj;
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}
var _core = __webpack_require__(8);
var _directory_entry = __webpack_require__(3);
var _directory_entry2 = _interopRequireDefault(_directory_entry);
_directory_entry2['default'].prototype.readFile = function (callback) {
    if (this.type !== 'file') {
        throw new TypeError('Not a file.');
    }
    return (0, _core.readFile)(this.path, callback);
};
_defaults(exports, _interopRequireWildcard(_core));
exports.DirectoryEntry = _directory_entry2['default'];

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = [
	{
		"name": "Nike"
	},
	{
		"name": "Adidas"
	},
	{
		"name": "Avirex"
	},
	{
		"name": "Waserman"
	},
	{
		"name": "Calvin Klein"
	},
	{
		"name": "Champion"
	},
	{
		"name": "Dolce & Gabbana"
	},
	{
		"name": "Donna Karan"
	},
	{
		"name": "Everlast"
	},
	{
		"name": "Fruit of the Loom"
	},
	{
		"name": "Jennifer Lopez"
	},
	{
		"name": "Svitanak"
	},
	{
		"name": "Milavitsa"
	},
	{
		"name": "Levi's"
	},
	{
		"name": "Mango"
	},
	{
		"name": "Zara"
	},
	{
		"name": "Reserved"
	},
	{
		"name": "Oxygen"
	},
	{
		"name": "Quicksilver"
	},
	{
		"name": "Tommy Hilfiger"
	},
	{
		"name": "Yves Saint Laurent"
	},
	{
		"name": "Belkelme"
	},
	{
		"name": "Bulbash"
	}
];

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = [
	{
		"name": "Minsk",
		"country": "Belarus"
	},
	{
		"name": "Grodno",
		"country": "Belarus"
	},
	{
		"name": "Vitebsk",
		"country": "Belarus"
	},
	{
		"name": "Mogilyov",
		"country": "Belarus"
	},
	{
		"name": "Brest",
		"country": "Belarus"
	},
	{
		"name": "Gomel",
		"country": "Belarus"
	},
	{
		"name": "London",
		"country": "United Kingdom"
	},
	{
		"name": "Liverpool",
		"country": "United Kingdom"
	},
	{
		"name": "Manchester",
		"country": "United Kingdom"
	},
	{
		"name": "Newcastle",
		"country": "United Kingdom"
	},
	{
		"name": "Washington",
		"country": "United States"
	},
	{
		"name": "Atlanta",
		"country": "United States"
	},
	{
		"name": "Miami",
		"country": "United States"
	},
	{
		"name": "San Francisco",
		"country": "United States"
	},
	{
		"name": "New York",
		"country": "United States"
	},
	{
		"name": "Chicago",
		"country": "United States"
	},
	{
		"name": "Seattle",
		"country": "United States"
	},
	{
		"name": "Houston",
		"country": "United States"
	},
	{
		"name": "Denver",
		"country": "United States"
	},
	{
		"name": "Kansas City",
		"country": "United States"
	},
	{
		"name": "Dallas",
		"country": "United States"
	},
	{
		"name": "Phoenix",
		"country": "United States"
	},
	{
		"name": "Las Vegas",
		"country": "United States"
	},
	{
		"name": "Detroit",
		"country": "United States"
	}
];

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = [
	{
		"name": "Afghanistan",
		"code": "AF"
	},
	{
		"name": "Åland Islands",
		"code": "AX"
	},
	{
		"name": "Albania",
		"code": "AL"
	},
	{
		"name": "Algeria",
		"code": "DZ"
	},
	{
		"name": "American Samoa",
		"code": "AS"
	},
	{
		"name": "AndorrA",
		"code": "AD"
	},
	{
		"name": "Angola",
		"code": "AO"
	},
	{
		"name": "Anguilla",
		"code": "AI"
	},
	{
		"name": "Antarctica",
		"code": "AQ"
	},
	{
		"name": "Antigua and Barbuda",
		"code": "AG"
	},
	{
		"name": "Argentina",
		"code": "AR"
	},
	{
		"name": "Armenia",
		"code": "AM"
	},
	{
		"name": "Aruba",
		"code": "AW"
	},
	{
		"name": "Australia",
		"code": "AU"
	},
	{
		"name": "Austria",
		"code": "AT"
	},
	{
		"name": "Azerbaijan",
		"code": "AZ"
	},
	{
		"name": "Bahamas",
		"code": "BS"
	},
	{
		"name": "Bahrain",
		"code": "BH"
	},
	{
		"name": "Bangladesh",
		"code": "BD"
	},
	{
		"name": "Barbados",
		"code": "BB"
	},
	{
		"name": "Belarus",
		"code": "BY"
	},
	{
		"name": "Belgium",
		"code": "BE"
	},
	{
		"name": "Belize",
		"code": "BZ"
	},
	{
		"name": "Benin",
		"code": "BJ"
	},
	{
		"name": "Bermuda",
		"code": "BM"
	},
	{
		"name": "Bhutan",
		"code": "BT"
	},
	{
		"name": "Bolivia",
		"code": "BO"
	},
	{
		"name": "Bosnia and Herzegovina",
		"code": "BA"
	},
	{
		"name": "Botswana",
		"code": "BW"
	},
	{
		"name": "Bouvet Island",
		"code": "BV"
	},
	{
		"name": "Brazil",
		"code": "BR"
	},
	{
		"name": "British Indian Ocean Territory",
		"code": "IO"
	},
	{
		"name": "Brunei Darussalam",
		"code": "BN"
	},
	{
		"name": "Bulgaria",
		"code": "BG"
	},
	{
		"name": "Burkina Faso",
		"code": "BF"
	},
	{
		"name": "Burundi",
		"code": "BI"
	},
	{
		"name": "Cambodia",
		"code": "KH"
	},
	{
		"name": "Cameroon",
		"code": "CM"
	},
	{
		"name": "Canada",
		"code": "CA"
	},
	{
		"name": "Cape Verde",
		"code": "CV"
	},
	{
		"name": "Cayman Islands",
		"code": "KY"
	},
	{
		"name": "Central African Republic",
		"code": "CF"
	},
	{
		"name": "Chad",
		"code": "TD"
	},
	{
		"name": "Chile",
		"code": "CL"
	},
	{
		"name": "China",
		"code": "CN"
	},
	{
		"name": "Christmas Island",
		"code": "CX"
	},
	{
		"name": "Cocos (Keeling) Islands",
		"code": "CC"
	},
	{
		"name": "Colombia",
		"code": "CO"
	},
	{
		"name": "Comoros",
		"code": "KM"
	},
	{
		"name": "Congo",
		"code": "CG"
	},
	{
		"name": "Congo, The Democratic Republic of the",
		"code": "CD"
	},
	{
		"name": "Cook Islands",
		"code": "CK"
	},
	{
		"name": "Costa Rica",
		"code": "CR"
	},
	{
		"name": "Cote D'Ivoire",
		"code": "CI"
	},
	{
		"name": "Croatia",
		"code": "HR"
	},
	{
		"name": "Cuba",
		"code": "CU"
	},
	{
		"name": "Cyprus",
		"code": "CY"
	},
	{
		"name": "Czech Republic",
		"code": "CZ"
	},
	{
		"name": "Denmark",
		"code": "DK"
	},
	{
		"name": "Djibouti",
		"code": "DJ"
	},
	{
		"name": "Dominica",
		"code": "DM"
	},
	{
		"name": "Dominican Republic",
		"code": "DO"
	},
	{
		"name": "Ecuador",
		"code": "EC"
	},
	{
		"name": "Egypt",
		"code": "EG"
	},
	{
		"name": "El Salvador",
		"code": "SV"
	},
	{
		"name": "Equatorial Guinea",
		"code": "GQ"
	},
	{
		"name": "Eritrea",
		"code": "ER"
	},
	{
		"name": "Estonia",
		"code": "EE"
	},
	{
		"name": "Ethiopia",
		"code": "ET"
	},
	{
		"name": "Falkland Islands (Malvinas)",
		"code": "FK"
	},
	{
		"name": "Faroe Islands",
		"code": "FO"
	},
	{
		"name": "Fiji",
		"code": "FJ"
	},
	{
		"name": "Finland",
		"code": "FI"
	},
	{
		"name": "France",
		"code": "FR"
	},
	{
		"name": "French Guiana",
		"code": "GF"
	},
	{
		"name": "French Polynesia",
		"code": "PF"
	},
	{
		"name": "French Southern Territories",
		"code": "TF"
	},
	{
		"name": "Gabon",
		"code": "GA"
	},
	{
		"name": "Gambia",
		"code": "GM"
	},
	{
		"name": "Georgia",
		"code": "GE"
	},
	{
		"name": "Germany",
		"code": "DE"
	},
	{
		"name": "Ghana",
		"code": "GH"
	},
	{
		"name": "Gibraltar",
		"code": "GI"
	},
	{
		"name": "Greece",
		"code": "GR"
	},
	{
		"name": "Greenland",
		"code": "GL"
	},
	{
		"name": "Grenada",
		"code": "GD"
	},
	{
		"name": "Guadeloupe",
		"code": "GP"
	},
	{
		"name": "Guam",
		"code": "GU"
	},
	{
		"name": "Guatemala",
		"code": "GT"
	},
	{
		"name": "Guernsey",
		"code": "GG"
	},
	{
		"name": "Guinea",
		"code": "GN"
	},
	{
		"name": "Guinea-Bissau",
		"code": "GW"
	},
	{
		"name": "Guyana",
		"code": "GY"
	},
	{
		"name": "Haiti",
		"code": "HT"
	},
	{
		"name": "Heard Island and Mcdonald Islands",
		"code": "HM"
	},
	{
		"name": "Holy See (Vatican City State)",
		"code": "VA"
	},
	{
		"name": "Honduras",
		"code": "HN"
	},
	{
		"name": "Hong Kong",
		"code": "HK"
	},
	{
		"name": "Hungary",
		"code": "HU"
	},
	{
		"name": "Iceland",
		"code": "IS"
	},
	{
		"name": "India",
		"code": "IN"
	},
	{
		"name": "Indonesia",
		"code": "ID"
	},
	{
		"name": "Iran, Islamic Republic Of",
		"code": "IR"
	},
	{
		"name": "Iraq",
		"code": "IQ"
	},
	{
		"name": "Ireland",
		"code": "IE"
	},
	{
		"name": "Isle of Man",
		"code": "IM"
	},
	{
		"name": "Israel",
		"code": "IL"
	},
	{
		"name": "Italy",
		"code": "IT"
	},
	{
		"name": "Jamaica",
		"code": "JM"
	},
	{
		"name": "Japan",
		"code": "JP"
	},
	{
		"name": "Jersey",
		"code": "JE"
	},
	{
		"name": "Jordan",
		"code": "JO"
	},
	{
		"name": "Kazakhstan",
		"code": "KZ"
	},
	{
		"name": "Kenya",
		"code": "KE"
	},
	{
		"name": "Kiribati",
		"code": "KI"
	},
	{
		"name": "Korea, Democratic People's Republic of",
		"code": "KP"
	},
	{
		"name": "Korea, Republic of",
		"code": "KR"
	},
	{
		"name": "Kuwait",
		"code": "KW"
	},
	{
		"name": "Kyrgyzstan",
		"code": "KG"
	},
	{
		"name": "Lao People's Democratic Republic",
		"code": "LA"
	},
	{
		"name": "Latvia",
		"code": "LV"
	},
	{
		"name": "Lebanon",
		"code": "LB"
	},
	{
		"name": "Lesotho",
		"code": "LS"
	},
	{
		"name": "Liberia",
		"code": "LR"
	},
	{
		"name": "Libyan Arab Jamahiriya",
		"code": "LY"
	},
	{
		"name": "Liechtenstein",
		"code": "LI"
	},
	{
		"name": "Lithuania",
		"code": "LT"
	},
	{
		"name": "Luxembourg",
		"code": "LU"
	},
	{
		"name": "Macao",
		"code": "MO"
	},
	{
		"name": "Macedonia, The Former Yugoslav Republic of",
		"code": "MK"
	},
	{
		"name": "Madagascar",
		"code": "MG"
	},
	{
		"name": "Malawi",
		"code": "MW"
	},
	{
		"name": "Malaysia",
		"code": "MY"
	},
	{
		"name": "Maldives",
		"code": "MV"
	},
	{
		"name": "Mali",
		"code": "ML"
	},
	{
		"name": "Malta",
		"code": "MT"
	},
	{
		"name": "Marshall Islands",
		"code": "MH"
	},
	{
		"name": "Martinique",
		"code": "MQ"
	},
	{
		"name": "Mauritania",
		"code": "MR"
	},
	{
		"name": "Mauritius",
		"code": "MU"
	},
	{
		"name": "Mayotte",
		"code": "YT"
	},
	{
		"name": "Mexico",
		"code": "MX"
	},
	{
		"name": "Micronesia, Federated States of",
		"code": "FM"
	},
	{
		"name": "Moldova, Republic of",
		"code": "MD"
	},
	{
		"name": "Monaco",
		"code": "MC"
	},
	{
		"name": "Mongolia",
		"code": "MN"
	},
	{
		"name": "Montserrat",
		"code": "MS"
	},
	{
		"name": "Morocco",
		"code": "MA"
	},
	{
		"name": "Mozambique",
		"code": "MZ"
	},
	{
		"name": "Myanmar",
		"code": "MM"
	},
	{
		"name": "Namibia",
		"code": "NA"
	},
	{
		"name": "Nauru",
		"code": "NR"
	},
	{
		"name": "Nepal",
		"code": "NP"
	},
	{
		"name": "Netherlands",
		"code": "NL"
	},
	{
		"name": "Netherlands Antilles",
		"code": "AN"
	},
	{
		"name": "New Caledonia",
		"code": "NC"
	},
	{
		"name": "New Zealand",
		"code": "NZ"
	},
	{
		"name": "Nicaragua",
		"code": "NI"
	},
	{
		"name": "Niger",
		"code": "NE"
	},
	{
		"name": "Nigeria",
		"code": "NG"
	},
	{
		"name": "Niue",
		"code": "NU"
	},
	{
		"name": "Norfolk Island",
		"code": "NF"
	},
	{
		"name": "Northern Mariana Islands",
		"code": "MP"
	},
	{
		"name": "Norway",
		"code": "NO"
	},
	{
		"name": "Oman",
		"code": "OM"
	},
	{
		"name": "Pakistan",
		"code": "PK"
	},
	{
		"name": "Palau",
		"code": "PW"
	},
	{
		"name": "Palestinian Territory, Occupied",
		"code": "PS"
	},
	{
		"name": "Panama",
		"code": "PA"
	},
	{
		"name": "Papua New Guinea",
		"code": "PG"
	},
	{
		"name": "Paraguay",
		"code": "PY"
	},
	{
		"name": "Peru",
		"code": "PE"
	},
	{
		"name": "Philippines",
		"code": "PH"
	},
	{
		"name": "Pitcairn",
		"code": "PN"
	},
	{
		"name": "Poland",
		"code": "PL"
	},
	{
		"name": "Portugal",
		"code": "PT"
	},
	{
		"name": "Puerto Rico",
		"code": "PR"
	},
	{
		"name": "Qatar",
		"code": "QA"
	},
	{
		"name": "Reunion",
		"code": "RE"
	},
	{
		"name": "Romania",
		"code": "RO"
	},
	{
		"name": "Russian Federation",
		"code": "RU"
	},
	{
		"name": "Rwanda",
		"code": "RW"
	},
	{
		"name": "Saint Helena",
		"code": "SH"
	},
	{
		"name": "Saint Kitts and Nevis",
		"code": "KN"
	},
	{
		"name": "Saint Lucia",
		"code": "LC"
	},
	{
		"name": "Saint Pierre and Miquelon",
		"code": "PM"
	},
	{
		"name": "Saint Vincent and the Grenadines",
		"code": "VC"
	},
	{
		"name": "Samoa",
		"code": "WS"
	},
	{
		"name": "San Marino",
		"code": "SM"
	},
	{
		"name": "Sao Tome and Principe",
		"code": "ST"
	},
	{
		"name": "Saudi Arabia",
		"code": "SA"
	},
	{
		"name": "Senegal",
		"code": "SN"
	},
	{
		"name": "Serbia and Montenegro",
		"code": "CS"
	},
	{
		"name": "Seychelles",
		"code": "SC"
	},
	{
		"name": "Sierra Leone",
		"code": "SL"
	},
	{
		"name": "Singapore",
		"code": "SG"
	},
	{
		"name": "Slovakia",
		"code": "SK"
	},
	{
		"name": "Slovenia",
		"code": "SI"
	},
	{
		"name": "Solomon Islands",
		"code": "SB"
	},
	{
		"name": "Somalia",
		"code": "SO"
	},
	{
		"name": "South Africa",
		"code": "ZA"
	},
	{
		"name": "South Georgia and the South Sandwich Islands",
		"code": "GS"
	},
	{
		"name": "Spain",
		"code": "ES"
	},
	{
		"name": "Sri Lanka",
		"code": "LK"
	},
	{
		"name": "Sudan",
		"code": "SD"
	},
	{
		"name": "Suriname",
		"code": "SR"
	},
	{
		"name": "Svalbard and Jan Mayen",
		"code": "SJ"
	},
	{
		"name": "Swaziland",
		"code": "SZ"
	},
	{
		"name": "Sweden",
		"code": "SE"
	},
	{
		"name": "Switzerland",
		"code": "CH"
	},
	{
		"name": "Syrian Arab Republic",
		"code": "SY"
	},
	{
		"name": "Taiwan, Province of China",
		"code": "TW"
	},
	{
		"name": "Tajikistan",
		"code": "TJ"
	},
	{
		"name": "Tanzania, United Republic of",
		"code": "TZ"
	},
	{
		"name": "Thailand",
		"code": "TH"
	},
	{
		"name": "Timor-Leste",
		"code": "TL"
	},
	{
		"name": "Togo",
		"code": "TG"
	},
	{
		"name": "Tokelau",
		"code": "TK"
	},
	{
		"name": "Tonga",
		"code": "TO"
	},
	{
		"name": "Trinidad and Tobago",
		"code": "TT"
	},
	{
		"name": "Tunisia",
		"code": "TN"
	},
	{
		"name": "Turkey",
		"code": "TR"
	},
	{
		"name": "Turkmenistan",
		"code": "TM"
	},
	{
		"name": "Turks and Caicos Islands",
		"code": "TC"
	},
	{
		"name": "Tuvalu",
		"code": "TV"
	},
	{
		"name": "Uganda",
		"code": "UG"
	},
	{
		"name": "Ukraine",
		"code": "UA"
	},
	{
		"name": "United Arab Emirates",
		"code": "AE"
	},
	{
		"name": "United Kingdom",
		"code": "GB"
	},
	{
		"name": "United States",
		"code": "US"
	},
	{
		"name": "United States Minor Outlying Islands",
		"code": "UM"
	},
	{
		"name": "Uruguay",
		"code": "UY"
	},
	{
		"name": "Uzbekistan",
		"code": "UZ"
	},
	{
		"name": "Vanuatu",
		"code": "VU"
	},
	{
		"name": "Venezuela",
		"code": "VE"
	},
	{
		"name": "Viet Nam",
		"code": "VN"
	},
	{
		"name": "Virgin Islands, British",
		"code": "VG"
	},
	{
		"name": "Virgin Islands, U.S.",
		"code": "VI"
	},
	{
		"name": "Wallis and Futuna",
		"code": "WF"
	},
	{
		"name": "Western Sahara",
		"code": "EH"
	},
	{
		"name": "Yemen",
		"code": "YE"
	},
	{
		"name": "Zambia",
		"code": "ZM"
	},
	{
		"name": "Zimbabwe",
		"code": "ZW"
	}
];

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = [
	{
		"street": "Tolstoy",
		"zip": "11",
		"brand": "Nike"
	},
	{
		"street": "Investigators'",
		"zip": "11",
		"brand": "Adidas"
	},
	{
		"street": "Green",
		"zip": "12",
		"brand": "Avirex"
	},
	{
		"street": "Newton",
		"zip": "12",
		"brand": "Waserman"
	},
	{
		"street": "Victory",
		"zip": "14",
		"brand": "Calvin Klein"
	},
	{
		"street": "Shagal",
		"zip": "14",
		"brand": "Champion"
	},
	{
		"street": "Lenin",
		"zip": "13",
		"brand": "Dolce & Gabbana"
	},
	{
		"street": "Pushkin",
		"zip": "13",
		"brand": "Donna Karan"
	},
	{
		"street": "Chehov",
		"zip": "15",
		"brand": "Everlast"
	},
	{
		"street": "Bogdanovich",
		"zip": "15",
		"brand": "Fruit of the Loom"
	},
	{
		"street": "Kolas",
		"zip": "16",
		"brand": "Jennifer Lopez"
	},
	{
		"street": "Victory",
		"zip": "16",
		"brand": "Svitanak"
	},
	{
		"street": "Factory",
		"zip": "91",
		"brand": "Milavitsa"
	},
	{
		"street": "Industrial",
		"zip": "92",
		"brand": "Levi's"
	},
	{
		"street": "Ceremonial",
		"zip": "93",
		"brand": "Mango"
	},
	{
		"street": "Crucial",
		"zip": "94",
		"brand": "Zara"
	},
	{
		"street": "Radziwill",
		"zip": "91",
		"brand": "Reserved"
	},
	{
		"street": "Jewish",
		"zip": "92",
		"brand": "Oxygen"
	},
	{
		"street": "Euler",
		"zip": "93",
		"brand": "Quicksilver"
	},
	{
		"street": "Aristotel",
		"zip": "94",
		"brand": "Tommy Hilfiger"
	},
	{
		"street": "Ronaldo",
		"zip": "31",
		"brand": "Yves Saint Laurent"
	},
	{
		"street": "Key",
		"zip": "31",
		"brand": "Belkelme"
	},
	{
		"street": "Forbidden",
		"zip": "32",
		"brand": "Bulbash"
	},
	{
		"street": "Henry",
		"zip": "32",
		"brand": "Nike"
	},
	{
		"street": "Forgotten",
		"zip": "33",
		"brand": "Adidas"
	},
	{
		"street": "New",
		"zip": "34",
		"brand": "Avirex"
	},
	{
		"street": "Beach",
		"zip": "34",
		"brand": "Waserman"
	},
	{
		"street": "Forlan",
		"zip": "33",
		"brand": "Waserman"
	},
	{
		"street": "Old-fashioned",
		"zip": "35",
		"brand": "Calvin Klein"
	},
	{
		"street": "Forest",
		"zip": "35",
		"brand": "Champion"
	},
	{
		"street": "Stalin",
		"zip": "36",
		"brand": "Dolce & Gabbana"
	},
	{
		"street": "Oak",
		"zip": "36",
		"brand": "Donna Karan"
	},
	{
		"street": "Lenin",
		"zip": "37",
		"brand": "Bulbash"
	},
	{
		"street": "Pine",
		"zip": "37",
		"brand": "Bulbash"
	},
	{
		"street": "Brodskiy",
		"zip": "38",
		"brand": "Everlast"
	},
	{
		"street": "Apple",
		"zip": "38",
		"brand": "Fruit of the Loom"
	},
	{
		"street": "Putin",
		"zip": "39",
		"brand": "Zara"
	},
	{
		"street": "Pen",
		"zip": "39",
		"brand": "Zara"
	},
	{
		"street": "Merkel",
		"zip": "131",
		"brand": "Reserved"
	},
	{
		"street": "Tolstoy",
		"zip": "11",
		"brand": "Mango"
	},
	{
		"street": "Forgotten",
		"zip": "33",
		"brand": "Oxygen"
	},
	{
		"street": "Shagal",
		"zip": "14",
		"brand": "Quicksilver"
	},
	{
		"street": "Tolstoy",
		"zip": "11",
		"brand": "Tommy Hilfiger"
	},
	{
		"street": "New",
		"zip": "34",
		"brand": "Belkelme"
	},
	{
		"street": "Key",
		"zip": "31",
		"brand": "Levi's"
	},
	{
		"street": "Newton",
		"zip": "12",
		"brand": "Jennifer Lopez"
	},
	{
		"street": "Dog",
		"zip": "131",
		"brand": "Jennifer Lopez"
	},
	{
		"street": "Trumpy",
		"zip": "132",
		"brand": "Avirex"
	},
	{
		"street": "Boxing",
		"zip": "132",
		"brand": "Nike"
	},
	{
		"street": "Cycling",
		"zip": "133",
		"brand": "Waserman"
	},
	{
		"street": "Obama",
		"zip": "133",
		"brand": "Belkelme"
	},
	{
		"street": "Fine",
		"zip": "134",
		"brand": "Svitanak"
	},
	{
		"street": "Gold",
		"zip": "134",
		"brand": "Milavitsa"
	},
	{
		"street": "Round",
		"zip": "135",
		"brand": "Quicksilver"
	},
	{
		"street": "Explorers'",
		"zip": "135",
		"brand": "Oxygen"
	}
];

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = [
	{
		"name": "Tolstoy",
		"type": "AVENUE",
		"city": "Minsk"
	},
	{
		"name": "Green",
		"type": "STREET",
		"city": "Grodno"
	},
	{
		"name": "Lenin",
		"type": "BOULEVARD",
		"city": "Vitebsk"
	},
	{
		"name": "Victory",
		"type": "RPOSPEKT",
		"city": "Mogilyov"
	},
	{
		"name": "Chehov",
		"type": "SQUARE",
		"city": "Gomel"
	},
	{
		"name": "Victory",
		"type": "BOULEVARD",
		"city": "Brest"
	},
	{
		"name": "Factory",
		"type": "STREET",
		"city": "London"
	},
	{
		"name": "Industrial",
		"type": "STREET",
		"city": "Liverpool"
	},
	{
		"name": "Ceremonial",
		"type": "AVENUE",
		"city": "Manchester"
	},
	{
		"name": "Crucial",
		"type": "STREET",
		"city": "Newcastle"
	},
	{
		"name": "Key",
		"type": "STREET",
		"city": "Washington"
	},
	{
		"name": "Forbidden",
		"type": "STREET",
		"city": "Atlanta"
	},
	{
		"name": "Forgotten",
		"type": "AVENUE",
		"city": "Miami"
	},
	{
		"name": "New",
		"type": "BOULEVARD",
		"city": "San Francisco"
	},
	{
		"name": "Old-fashioned",
		"type": "STREET",
		"city": "New York"
	},
	{
		"name": "Stalin",
		"type": "AVENUE",
		"city": "Chicago"
	},
	{
		"name": "Lenin",
		"type": "AVENUE",
		"city": "Seattle"
	},
	{
		"name": "Brodskiy",
		"type": "RPOSPEKT",
		"city": "Houston"
	},
	{
		"name": "Putin",
		"type": "AVENUE",
		"city": "Denver"
	},
	{
		"name": "Merkel",
		"type": "RPOSPEKT",
		"city": "Kansas City"
	},
	{
		"name": "Trumpy",
		"type": "STREET",
		"city": "Dallas"
	},
	{
		"name": "Obama",
		"type": "SQUARE",
		"city": "Phoenix"
	},
	{
		"name": "Fine",
		"type": "STREET",
		"city": "Las Vegas"
	},
	{
		"name": "Exporers'",
		"type": "STREET",
		"city": "Detroit"
	},
	{
		"name": "Investigators'",
		"type": "STREET",
		"city": "Minsk"
	},
	{
		"name": "Newton",
		"type": "SQUARE",
		"city": "Grodno"
	},
	{
		"name": "Pushkin",
		"type": "RPOSPEKT",
		"city": "Vitebsk"
	},
	{
		"name": "Shagal",
		"type": "AVENUE",
		"city": "Mogilyov"
	},
	{
		"name": "Bogdanovich",
		"type": "AVENUE",
		"city": "Gomel"
	},
	{
		"name": "Kolas",
		"type": "AVENUE",
		"city": "Brest"
	},
	{
		"name": "Radziwill",
		"type": "STREET",
		"city": "London"
	},
	{
		"name": "Jewish",
		"type": "BOULEVARD",
		"city": "Liverpool"
	},
	{
		"name": "Euler",
		"type": "AVENUE",
		"city": "Manchester"
	},
	{
		"name": "Aristotel",
		"type": "BOULEVARD",
		"city": "Newcastle"
	},
	{
		"name": "Ronaldo",
		"type": "AVENUE",
		"city": "Washington"
	},
	{
		"name": "Henry",
		"type": "STREET",
		"city": "Atlanta"
	},
	{
		"name": "Forlan",
		"type": "SQUARE",
		"city": "Miami"
	},
	{
		"name": "Beach",
		"type": "BOULEVARD",
		"city": "San Francisco"
	},
	{
		"name": "Forest",
		"type": "AVENUE",
		"city": "New York"
	},
	{
		"name": "Oak",
		"type": "SQUARE",
		"city": "Chicago"
	},
	{
		"name": "Pine",
		"type": "STREET",
		"city": "Seattle"
	},
	{
		"name": "Apple",
		"type": "STREET",
		"city": "Houston"
	},
	{
		"name": "Pen",
		"type": "SQUARE",
		"city": "Denver"
	},
	{
		"name": "Dog",
		"type": "AVENUE",
		"city": "Kansas City"
	},
	{
		"name": "Boxing",
		"type": "AVENUE",
		"city": "Dallas"
	},
	{
		"name": "Cycling",
		"type": "RPOSPEKT",
		"city": "Phoenix"
	},
	{
		"name": "Gold",
		"type": "STREET",
		"city": "Las Vegas"
	},
	{
		"name": "Round",
		"type": "AVENUE",
		"city": "Detroit"
	}
];

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = [
	{
		"zip": 11,
		"city": "Minsk"
	},
	{
		"zip": 12,
		"city": "Grodno"
	},
	{
		"zip": 13,
		"city": "Vitebsk"
	},
	{
		"zip": 14,
		"city": "Mogilyov"
	},
	{
		"zip": 15,
		"city": "Gomel"
	},
	{
		"zip": 16,
		"city": "Brest"
	},
	{
		"zip": 91,
		"city": "London"
	},
	{
		"zip": 92,
		"city": "Liverpool"
	},
	{
		"zip": 93,
		"city": "Manchester"
	},
	{
		"zip": 94,
		"city": "Newcastle"
	},
	{
		"zip": 31,
		"city": "Washington"
	},
	{
		"zip": 32,
		"city": "Atlanta"
	},
	{
		"zip": 33,
		"city": "Miami"
	},
	{
		"zip": 34,
		"city": "San Francisco"
	},
	{
		"zip": 35,
		"city": "New York"
	},
	{
		"zip": 36,
		"city": "Chicago"
	},
	{
		"zip": 37,
		"city": "Seattle"
	},
	{
		"zip": 38,
		"city": "Houston"
	},
	{
		"zip": 39,
		"city": "Denver"
	},
	{
		"zip": 131,
		"city": "Kansas City"
	},
	{
		"zip": 132,
		"city": "Dallas"
	},
	{
		"zip": 133,
		"city": "Phoenix"
	},
	{
		"zip": 134,
		"city": "Las Vegas"
	},
	{
		"zip": 135,
		"city": "Detroit"
	}
];

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ })
/******/ ]);
//# sourceMappingURL=app.bundle.js.map