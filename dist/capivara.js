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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/lodash.get/index.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash.get/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/lodash.isequal/index.js":
/*!***********************************************!*\
  !*** ../node_modules/lodash.isequal/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../node_modules/lodash.set/index.js":
/*!*******************************************!*\
  !*** ../node_modules/lodash.set/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = isKey(path, object) ? [path] : castPath(path);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `_.setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * _.set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 */
function set(object, path, value) {
  return object == null ? object : baseSet(object, path, value);
}

module.exports = set;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/melanke-watchjs/src/watch.js":
/*!****************************************************!*\
  !*** ../node_modules/melanke-watchjs/src/watch.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * DEVELOPED BY
 * GIL LOPES BUENO
 * gilbueno.mail@gmail.com
 *
 * WORKS WITH:
 * IE8*, IE 9+, FF 4+, SF 5+, WebKit, CH 7+, OP 12+, BESEN, Rhino 1.7+
 * For IE8 (and other legacy browsers) WatchJS will use dirty checking  
 *
 * FORK:
 * https://github.com/melanke/Watch.JS
 *
 * LICENSE: MIT
 */


(function (factory) {
    if (true) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {}
}(function () {

    var WatchJS = {
        noMore: false,        // use WatchJS.suspend(obj) instead
        useDirtyCheck: false // use only dirty checking to track changes.
    },
    lengthsubjects = [];
    
    var dirtyChecklist = [];
    var pendingChanges = []; // used coalesce changes from defineProperty and __defineSetter__
    
    var supportDefineProperty = false;
    try {
        supportDefineProperty = Object.defineProperty && Object.defineProperty({},'x', {});
    } catch(ex) {  /* not supported */  }

    var isFunction = function (functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) == '[object Function]';
    };

    var isInt = function (x) {
        return x % 1 === 0;
    };

    var isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    var isObject = function(obj) {
        return {}.toString.apply(obj) === '[object Object]';
    };
    
    var getObjDiff = function(a, b){
        var aplus = [],
        bplus = [];

        if(!(typeof a == "string") && !(typeof b == "string")){

            if (isArray(a) && b) {
                for (var i=0; i<a.length; i++) {
                    if (b[i] === undefined) aplus.push(i);
                }
            } else {
                for(var i in a){
                    if (a.hasOwnProperty(i)) {
                        if(b && !b.hasOwnProperty(i)) {
                            aplus.push(i);
                        }
                    }
                }
            }

            if (isArray(b) && a) {
                for (var j=0; j<b.length; j++) {
                    if (a[j] === undefined) bplus.push(j);
                }
            } else {
                for(var j in b){
                    if (b.hasOwnProperty(j)) {
                        if(a && !a.hasOwnProperty(j)) {
                            bplus.push(j);
                        }
                    }
                }
            }
        }

        return {
            added: aplus,
            removed: bplus
        }
    };

    var clone = function(obj){

        if (null == obj || "object" != typeof obj) {
            return obj;
        }

        var copy = obj.constructor();

        for (var attr in obj) {
            copy[attr] = obj[attr];
        }

        return copy;        

    }

    var defineGetAndSet = function (obj, propName, getter, setter) {
        try {
            Object.defineProperty(obj, propName, {
                get: getter,
                set: function(value) {
                    setter.call(this,value,true); // coalesce changes
                },
                enumerable: true,
                configurable: true
            });
        }
        catch(e1) {
            try{
                Object.prototype.__defineGetter__.call(obj, propName, getter);
                Object.prototype.__defineSetter__.call(obj, propName, function(value) {
                    setter.call(this,value,true); // coalesce changes
                });
            }
            catch(e2) {
                observeDirtyChanges(obj,propName,setter);
                //throw new Error("watchJS error: browser not supported :/")
            }
        }

    };

    var defineProp = function (obj, propName, value) {
        try {
            Object.defineProperty(obj, propName, {
                enumerable: false,
                configurable: true,
                writable: false,
                value: value
            });
        } catch(error) {
            obj[propName] = value;
        }
    };

    var observeDirtyChanges = function(obj,propName,setter) {
        dirtyChecklist[dirtyChecklist.length] = {
            prop:       propName,
            object:     obj,
            orig:       clone(obj[propName]),
            callback:   setter
        }        
    }
    
    var watch = function () {

        if (isFunction(arguments[1])) {
            watchAll.apply(this, arguments);
        } else if (isArray(arguments[1])) {
            watchMany.apply(this, arguments);
        } else {
            watchOne.apply(this, arguments);
        }

    };


    var watchAll = function (obj, watcher, level, addNRemove) {

        if ((typeof obj == "string") || (!(obj instanceof Object) && !isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        if(isArray(obj)) {
            defineWatcher(obj, "__watchall__", watcher, level); // watch all changes on the array
            if (level===undefined||level > 0) {
                for (var prop = 0; prop < obj.length; prop++) { // watch objects in array
                   watchAll(obj[prop],watcher,level, addNRemove);
                }
            }
        } 
        else {
            var prop,props = [];
            for (prop in obj) { //for each attribute if obj is an object
                if (prop == "$val" || (!supportDefineProperty && prop === 'watchers')) {
                    continue;
                }

                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    props.push(prop); //put in the props
                }
            }
            watchMany(obj, props, watcher, level, addNRemove); //watch all items of the props
        }


        if (addNRemove) {
            pushToLengthSubjects(obj, "$$watchlengthsubjectroot", watcher, level);
        }
    };


    var watchMany = function (obj, props, watcher, level, addNRemove) {

        if ((typeof obj == "string") || (!(obj instanceof Object) && !isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        for (var i=0; i<props.length; i++) { //watch each property
            var prop = props[i];
            watchOne(obj, prop, watcher, level, addNRemove);
        }

    };

    var watchOne = function (obj, prop, watcher, level, addNRemove) {
        if ((typeof obj == "string") || (!(obj instanceof Object) && !isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        if(isFunction(obj[prop])) { //dont watch if it is a function
            return;
        }
        if(obj[prop] != null && (level === undefined || level > 0)){
            watchAll(obj[prop], watcher, level!==undefined? level-1 : level); //recursively watch all attributes of this
        }

        defineWatcher(obj, prop, watcher, level);

        if(addNRemove && (level === undefined || level > 0)){
            pushToLengthSubjects(obj, prop, watcher, level);
        }

    };

    var unwatch = function () {

        if (isFunction(arguments[1])) {
            unwatchAll.apply(this, arguments);
        } else if (isArray(arguments[1])) {
            unwatchMany.apply(this, arguments);
        } else {
            unwatchOne.apply(this, arguments);
        }

    };

    var unwatchAll = function (obj, watcher) {

        if (obj instanceof String || (!(obj instanceof Object) && !isArray(obj))) { //accepts only objects and array (not string)
            return;
        }

        if (isArray(obj)) {
            var props = ['__watchall__'];
            for (var prop = 0; prop < obj.length; prop++) { //for each item if obj is an array
                props.push(prop); //put in the props
            }
            unwatchMany(obj, props, watcher); //watch all itens of the props
        } else {
            var unwatchPropsInObject = function (obj2) {
                var props = [];
                for (var prop2 in obj2) { //for each attribute if obj is an object
                    if (obj2.hasOwnProperty(prop2)) {
                        if (obj2[prop2] instanceof Object) {
                            unwatchPropsInObject(obj2[prop2]); //recurs into object props
                        } else {
                            props.push(prop2); //put in the props
                        }
                    }
                }
                unwatchMany(obj2, props, watcher); //unwatch all of the props
            };
            unwatchPropsInObject(obj);
        }
    };


    var unwatchMany = function (obj, props, watcher) {

        for (var prop2 in props) { //watch each attribute of "props" if is an object
            if (props.hasOwnProperty(prop2)) {
                unwatchOne(obj, props[prop2], watcher);
            }
        }
    };

    var timeouts = [],
        timerID = null;
    function clearTimerID() {
        timerID = null;
        for(var i=0; i< timeouts.length; i++) {
            timeouts[i]();
        }
        timeouts.length = 0;
    }
    var getTimerID= function () {
        if (!timerID)  {
            timerID = setTimeout(clearTimerID);
        }
        return timerID;
    }
    var registerTimeout = function(fn) { // register function to be called on timeout
        if (timerID==null) getTimerID();
        timeouts[timeouts.length] = fn;
    }
    
    // Track changes made to an array, object or an object's property 
    // and invoke callback with a single change object containing type, value, oldvalue and array splices
    // Syntax: 
    //      trackChange(obj, callback, recursive, addNRemove)
    //      trackChange(obj, prop, callback, recursive, addNRemove)
    var trackChange = function() {
        var fn = (isFunction(arguments[2])) ? trackProperty : trackObject ;
        fn.apply(this,arguments);
    }

    // track changes made to an object and invoke callback with a single change object containing type, value and array splices
    var trackObject= function(obj, callback, recursive, addNRemove) {
        var change = null,lastTimerID = -1;
        var isArr = isArray(obj);
        var level,fn = function(prop, action, newValue, oldValue) {
            var timerID = getTimerID();
            if (lastTimerID!==timerID) { // check if timer has changed since last update
                lastTimerID = timerID;
                change = {
                    type: 'update'
                }
                change['value'] = obj;
                change['splices'] = null;
                registerTimeout(function() {
                    callback.call(this,change);
                    change = null;
                });
            }
            // create splices for array changes
            if (isArr && obj === this && change !== null)  {                
                if (action==='pop'||action==='shift') {
                    newValue = [];
                    oldValue = [oldValue];
                }
                else if (action==='push'||action==='unshift') {
                    newValue = [newValue];
                    oldValue = [];
                }
                else if (action!=='splice') { 
                    return; // return here - for reverse and sort operations we don't need to return splices. a simple update will do
                }
                if (!change.splices) change.splices = [];
                change.splices[change.splices.length] = {
                    index: prop,
                    deleteCount: oldValue ? oldValue.length : 0,
                    addedCount: newValue ? newValue.length : 0,
                    added: newValue,
                    deleted: oldValue
                };
            }

        }  
        level = (recursive==true) ? undefined : 0;        
        watchAll(obj,fn, level, addNRemove);
    }
    
    // track changes made to the property of an object and invoke callback with a single change object containing type, value, oldvalue and splices
    var trackProperty = function(obj,prop,callback,recursive, addNRemove) { 
        if (obj && prop) {
            watchOne(obj,prop,function(prop, action, newvalue, oldvalue) {
                var change = {
                    type: 'update'
                }
                change['value'] = newvalue;
                change['oldvalue'] = oldvalue;
                if (recursive && isObject(newvalue)||isArray(newvalue)) {
                    trackObject(newvalue,callback,recursive, addNRemove);
                }               
                callback.call(this,change);
            },0)
            
            if (recursive && isObject(obj[prop])||isArray(obj[prop])) {
                trackObject(obj[prop],callback,recursive, addNRemove);
            }                           
        }
    }
    
    
    var defineWatcher = function (obj, prop, watcher, level) {
        var newWatcher = false;
        var isArr = isArray(obj);
        
        if (!obj.watchers) {
            defineProp(obj, "watchers", {});
            if (isArr) {
                // watch array functions
                watchFunctions(obj, function(index,action,newValue, oldValue) {
                    addPendingChange(obj, index, action,newValue, oldValue);
                    if (level !== 0 && newValue && (isObject(newValue) || isArray(newValue))) {
                        var i,n, ln, wAll, watchList = obj.watchers[prop];
                        if ((wAll = obj.watchers['__watchall__'])) {
                            watchList = watchList ? watchList.concat(wAll) : wAll;
                        }
                        ln = watchList ?  watchList.length : 0;
                        for (i = 0; i<ln; i++) {
                            if (action!=='splice') {
                                watchAll(newValue, watchList[i], (level===undefined)?level:level-1);
                            }
                            else {
                                // watch spliced values
                                for(n=0; n < newValue.length; n++) {
                                    watchAll(newValue[n], watchList[i], (level===undefined)?level:level-1);
                                }
                            }
                        }
                    }
                });
            }
        }

        if (!obj.watchers[prop]) {
            obj.watchers[prop] = [];
            if (!isArr) newWatcher = true;
        }

        for (var i=0; i<obj.watchers[prop].length; i++) {
            if(obj.watchers[prop][i] === watcher){
                return;
            }
        }

        obj.watchers[prop].push(watcher); //add the new watcher to the watchers array

        if (newWatcher) {
            var val = obj[prop];            
            var getter = function () {
                return val;                        
            };

            var setter = function (newval, delayWatcher) {
                var oldval = val;
                val = newval;                
                if (level !== 0 
                    && obj[prop] && (isObject(obj[prop]) || isArray(obj[prop]))
                    && !obj[prop].watchers) {
                    // watch sub properties
                    var i,ln = obj.watchers[prop].length; 
                    for(i=0; i<ln; i++) {
                        watchAll(obj[prop], obj.watchers[prop][i], (level===undefined)?level:level-1);
                    }
                }

                //watchFunctions(obj, prop);
                
                if (isSuspended(obj, prop)) {
                    resume(obj, prop);
                    return;
                }

                if (!WatchJS.noMore){ // this does not work with Object.observe
                    //if (JSON.stringify(oldval) !== JSON.stringify(newval)) {
                    if (oldval !== newval) {
                        if (!delayWatcher) {
                            callWatchers(obj, prop, "set", newval, oldval);
                        }
                        else {
                            addPendingChange(obj, prop, "set", newval, oldval);
                        }
                        WatchJS.noMore = false;
                    }
                }
            };

            if (WatchJS.useDirtyCheck) {
                observeDirtyChanges(obj,prop,setter);
            }
            else {
                defineGetAndSet(obj, prop, getter, setter);
            }
        }

    };

    var callWatchers = function (obj, prop, action, newval, oldval) {
        if (prop !== undefined) {
            var ln, wl, watchList = obj.watchers[prop];
            if ((wl = obj.watchers['__watchall__'])) {
                watchList = watchList ? watchList.concat(wl) : wl;
            }
            ln = watchList ? watchList.length : 0;
            for (var wr=0; wr< ln; wr++) {
                watchList[wr].call(obj, prop, action, newval, oldval);
            }
        } else {
            for (var prop in obj) {//call all
                if (obj.hasOwnProperty(prop)) {
                    callWatchers(obj, prop, action, newval, oldval);
                }
            }
        }
    };

    var methodNames = ['pop', 'push', 'reverse', 'shift', 'sort', 'slice', 'unshift', 'splice'];
    var defineArrayMethodWatcher = function (obj, original, methodName, callback) {
        defineProp(obj, methodName, function () {
            var index = 0;
            var i,newValue, oldValue, response;                        
            // get values before splicing array 
            if (methodName === 'splice') {
               var start = arguments[0];
               var end = start + arguments[1];
               oldValue = obj.slice(start,end);
               newValue = [];
               for(i=2;i<arguments.length;i++) {
                   newValue[i-2] = arguments[i];
               }
               index = start;
            } 
            else {
                newValue = arguments.length > 0 ? arguments[0] : undefined;
            } 

            response = original.apply(obj, arguments);
            if (methodName !== 'slice') {
                if (methodName === 'pop') {
                    oldValue = response;
                    index = obj.length;
                }
                else if (methodName === 'push') {
                    index = obj.length-1;
                }
                else if (methodName === 'shift') {
                    oldValue = response;
                }
                else if (methodName !== 'unshift' && newValue===undefined) {
                    newValue = response;
                }
                callback.call(obj, index, methodName,newValue, oldValue)
            }
            return response;
        });
    };

    var watchFunctions = function(obj, callback) {

        if (!isFunction(callback) || !obj || (obj instanceof String) || (!isArray(obj))) {
            return;
        }

        for (var i = methodNames.length, methodName; i--;) {
            methodName = methodNames[i];
            defineArrayMethodWatcher(obj, obj[methodName], methodName, callback);
        }

    };

    var unwatchOne = function (obj, prop, watcher) {
        if (prop) {
            if (obj.watchers && obj.watchers[prop]) {
                if (watcher === undefined) {
                    delete obj.watchers[prop]; // remove all property watchers
                }
                else {
                    for (var i = 0; i < obj.watchers[prop].length; i++) {
                        var w = obj.watchers[prop][i];
                        if (w == watcher) {
                            obj.watchers[prop].splice(i, 1);
                        }
                    }
                }
            }
        } else {
            delete obj.watchers;
        }

        removeFromLengthSubjects(obj, prop, watcher);
        removeFromDirtyChecklist(obj, prop);
    };
    
    // suspend watchers until next update cycle
    var suspend = function(obj, prop) {
        if (obj.watchers) {
            var name = '__wjs_suspend__'+(prop!==undefined ? prop : '');
            obj.watchers[name] = true;
        }
    }
    
    var isSuspended = function(obj, prop) {
        return obj.watchers 
               && (obj.watchers['__wjs_suspend__'] || 
                   obj.watchers['__wjs_suspend__'+prop]);
    }
    
    // resumes preivously suspended watchers
    var resume = function(obj, prop) {
        registerTimeout(function() {
            delete obj.watchers['__wjs_suspend__'];
            delete obj.watchers['__wjs_suspend__'+prop];
        })
    }

    var pendingTimerID = null;
    var addPendingChange = function(obj,prop, mode, newval, oldval) {
        pendingChanges[pendingChanges.length] = {
            obj:obj,
            prop: prop,
            mode: mode,
            newval: newval,
            oldval: oldval
        };
        if (pendingTimerID===null) {
            pendingTimerID = setTimeout(applyPendingChanges);
        }
    };
    
    
    var applyPendingChanges = function()  {
        // apply pending changes
        var change = null;
        pendingTimerID = null;
        for(var i=0;i < pendingChanges.length;i++) {
            change = pendingChanges[i];
            callWatchers(change.obj, change.prop, change.mode, change.newval, change.oldval);
        }
        if (change) {
            pendingChanges = [];
            change = null;
        }        
    }

    var loop = function(){

        // check for new or deleted props
        for(var i=0; i<lengthsubjects.length; i++) {

            var subj = lengthsubjects[i];

            if (subj.prop === "$$watchlengthsubjectroot") {

                var difference = getObjDiff(subj.obj, subj.actual);

                if(difference.added.length || difference.removed.length){
                    if(difference.added.length){
                        watchMany(subj.obj, difference.added, subj.watcher, subj.level - 1, true);
                    }

                    subj.watcher.call(subj.obj, "root", "differentattr", difference, subj.actual);
                }
                subj.actual = clone(subj.obj);


            } else {

                var difference = getObjDiff(subj.obj[subj.prop], subj.actual);

                if(difference.added.length || difference.removed.length){
                    if(difference.added.length){
                        for (var j=0; j<subj.obj.watchers[subj.prop].length; j++) {
                            watchMany(subj.obj[subj.prop], difference.added, subj.obj.watchers[subj.prop][j], subj.level - 1, true);
                        }
                    }

                    callWatchers(subj.obj, subj.prop, "differentattr", difference, subj.actual);
                }

                subj.actual = clone(subj.obj[subj.prop]);

            }

        }
        
        // start dirty check
        var n, value;
        if (dirtyChecklist.length > 0) {
            for (var i = 0; i < dirtyChecklist.length; i++) {
                n = dirtyChecklist[i];
                value = n.object[n.prop];
                if (!compareValues(n.orig, value)) {
                    n.orig = clone(value);
                    n.callback(value);
                }
            }
        }

    };

    var compareValues =  function(a,b) {
        var i, state = true;
        if (a!==b)  {
            if (isObject(a)) {
                for(i in a) {
                    if (!supportDefineProperty && i==='watchers') continue;
                    if (a[i]!==b[i]) {
                        state = false;
                        break;
                    };
                }
            }
            else {
                state = false;
            }
        }
        return state;
    }
    
    var pushToLengthSubjects = function(obj, prop, watcher, level){

        var actual;

        if (prop === "$$watchlengthsubjectroot") {
            actual =  clone(obj);
        } else {
            actual = clone(obj[prop]);
        }

        lengthsubjects.push({
            obj: obj,
            prop: prop,
            actual: actual,
            watcher: watcher,
            level: level
        });
    };

    var removeFromLengthSubjects = function(obj, prop, watcher){
        for (var i=0; i<lengthsubjects.length; i++) {
            var subj = lengthsubjects[i];

            if (subj.obj == obj) {
                if (!prop || subj.prop == prop) {
                    if (!watcher || subj.watcher == watcher) {
                        // if we splice off one item at position i
                        // we need to decrement i as the array is one item shorter
                        // so when we increment i in the loop statement we
                        // will land at the correct index.
                        // if it's not decremented, you won't delete all length subjects
                        lengthsubjects.splice(i--, 1);
                    }
                }
            }
        }

    };
    
    var removeFromDirtyChecklist = function(obj, prop){
        var notInUse;
        for (var i=0; i<dirtyChecklist.length; i++) {
            var n = dirtyChecklist[i];
            var watchers = n.object.watchers;
            notInUse = (
                n.object == obj 
                && (!prop || n.prop == prop)
                && watchers
                && (!prop || !watchers[prop] || watchers[prop].length == 0 )
            );
            if (notInUse)  {
                // we use the same syntax as in removeFromLengthSubjects
                dirtyChecklist.splice(i--, 1);
            }
        }

    };    

    setInterval(loop, 50);

    WatchJS.watch = watch;
    WatchJS.unwatch = unwatch;
    WatchJS.callWatchers = callWatchers;
    WatchJS.suspend = suspend; // suspend watchers    
    WatchJS.onChange = trackChange;  // track changes made to object or  it's property and return a single change object

    return WatchJS;

}));


/***/ }),

/***/ "../node_modules/webpack/buildin/global.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "../node_modules/webpack/buildin/module.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/module.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "../src/common.ts":
/*!************************!*\
  !*** ../src/common.ts ***!
  \************************/
/*! exports provided: Common */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Common", function() { return Common; });
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.get */ "../node_modules/lodash.get/index.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_set__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash.set */ "../node_modules/lodash.set/index.js");
/* harmony import */ var lodash_set__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_set__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ */ "../src/index.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "../src/constants.ts");
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core */ "../src/core/index.ts");





var Common;
(function (Common) {
    function regexIndexOf(str, regex, startPos) {
        var indexOf = str.substring(startPos || 0).search(regex);
        return (indexOf >= 0) ? (indexOf + (startPos || 0)) : indexOf;
    }
    Common.regexIndexOf = regexIndexOf;
    /**
     * @description Executa o eval alterando as propriedades do source para seus determinados valores dentro do contexto.
     * @param source
     * @param context
     * @param prefix
     */
    function evalInContext(source, context) {
        if (source) {
            try {
                return _core__WEBPACK_IMPORTED_MODULE_4__["Eval"].exec(source, context);
            }
            catch (e) { }
        }
    }
    Common.evalInContext = evalInContext;
    function getFirstKey(str) {
        var firstKey = (str.indexOf('.') !== -1 ? str.substring(0, str.indexOf('.')) : str).replace(/ /g, '');
        return firstKey.split('(').join('').split(')').join('').replace(/!/g, '');
    }
    Common.getFirstKey = getFirstKey;
    function getAttributeCpShow(element) {
        return element.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].SHOW_ATTRIBUTE_NAME);
    }
    Common.getAttributeCpShow = getAttributeCpShow;
    function getAttributeCpIf(element) {
        return element.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].IF_ATTRIBUTE_NAME);
    }
    Common.getAttributeCpIf = getAttributeCpIf;
    function getAttributeCpElseIf(element) {
        return element.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].ELSE_IF_ATTRIBUTE_NAME);
    }
    Common.getAttributeCpElseIf = getAttributeCpElseIf;
    function getAttributeCpElse(element) {
        return element.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].ELSE_ATTRIBUTE_NAME);
    }
    Common.getAttributeCpElse = getAttributeCpElse;
    function getAttributeCpInit(element) {
        return element.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].INIT_ATTRIBUTE_NAME);
    }
    Common.getAttributeCpInit = getAttributeCpInit;
    function getAttributeCpStyle(element) {
        return element.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].STYLE_ATTRIBUTE_NAME);
    }
    Common.getAttributeCpStyle = getAttributeCpStyle;
    function getAttributeCpClass(element) {
        return element.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].CLASS_ATTRIBUTE_NAME);
    }
    Common.getAttributeCpClass = getAttributeCpClass;
    function getAttributeCpSrc(element) {
        return element.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].SRC_ATTRIBUTE_NAME);
    }
    Common.getAttributeCpSrc = getAttributeCpSrc;
    function getAttributeCpDisable(element) {
        return element.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].DISABLE_ATTRIBUTE_NAME);
    }
    Common.getAttributeCpDisable = getAttributeCpDisable;
    function getAttributeCpFocus(element) {
        return element.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].FOCUS_ATTRIBUTE_NAME);
    }
    Common.getAttributeCpFocus = getAttributeCpFocus;
    function getAttributeCpHide(element) {
        return element.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].HIDE_ATTRIBUTE_NAME);
    }
    Common.getAttributeCpHide = getAttributeCpHide;
    function getAttributeCpBlur(element) {
        return element.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].BLUR_ATTRIBUTE_NAME);
    }
    Common.getAttributeCpBlur = getAttributeCpBlur;
    function getScope(element) {
        return element[_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].SCOPE_ATTRIBUTE_NAME];
    }
    Common.getScope = getScope;
    function isComponent(element) {
        var component = window['capivara'].components[element.nodeName.toUpperCase()];
        return component ? true : false;
    }
    Common.isComponent = isComponent;
    function insideComponent(element) {
        if (element && element.parentNode) {
            if (isComponent(element.parentNode)) {
                return true;
            }
            else {
                return insideComponent(element.parentNode);
            }
        }
        return false;
    }
    Common.insideComponent = insideComponent;
    function executeFunctionCallback(element, attribute, additionalParameters) {
        return evalInMultiContext(element, attribute, additionalParameters);
    }
    Common.executeFunctionCallback = executeFunctionCallback;
    function isNative(fn) {
        return /{\s*\[native code]\s*}/.test('' + fn);
    }
    Common.isNative = isNative;
    function destroyElement(element, elementComment) {
        element.$$cpDestroyed = true;
        if (element.replaceWith) {
            element.replaceWith(elementComment);
        }
        ___WEBPACK_IMPORTED_MODULE_2__["default"].destroyIfComponent(element);
    }
    Common.destroyElement = destroyElement;
    function createElement(element, elementComment) {
        element.$$cpDestroyed = false;
        if (elementComment.replaceWith) {
            elementComment.replaceWith(element);
        }
        ___WEBPACK_IMPORTED_MODULE_2__["default"].constroyIfComponent(element, true);
    }
    Common.createElement = createElement;
    function getAllScopes(element, scopes) {
        if (element && element[_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].SCOPE_ATTRIBUTE_NAME]) {
            scopes.add(element[_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].SCOPE_ATTRIBUTE_NAME].scope);
        }
        if (element && element.parentNode) {
            return getAllScopes(element.parentNode, scopes);
        }
        return scopes;
    }
    Common.getAllScopes = getAllScopes;
    function evalInMultiContext(element, condition, additionalParameters) {
        var scopes = Array.from(getAllScopes(element, new Set())).reverse();
        if (additionalParameters) {
            scopes.push(additionalParameters);
        }
        return evalInContext(condition, scopes);
    }
    Common.evalInMultiContext = evalInMultiContext;
    function isValidCondition(element, condition) {
        return evalInMultiContext(element, condition);
    }
    Common.isValidCondition = isValidCondition;
    function appendBefore(element, elementToInsert) {
        element.parentNode.insertBefore(elementToInsert, element);
    }
    Common.appendBefore = appendBefore;
    function appendAfter(element, elementToInsert) {
        element.parentNode.insertBefore(elementToInsert, element.nextSibling);
    }
    Common.appendAfter = appendAfter;
    function setScopeId(scope) {
        if (!scope.id) {
            ___WEBPACK_IMPORTED_MODULE_2__["default"].LAST_SCOPE_ID++;
            window['capivara'].scopes.push(scope);
            scope.id = ___WEBPACK_IMPORTED_MODULE_2__["default"].LAST_SCOPE_ID;
        }
    }
    Common.setScopeId = setScopeId;
    function parentHasIgnore(element) {
        if (element.hasAttribute && (element.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_3__["Constants"].IGNORE_BINDINGS) || element.nodeName === 'CP-TRANSCLUDE')) {
            return true;
        }
        if (element.parentNode) {
            return parentHasIgnore(element.parentNode);
        }
    }
    Common.parentHasIgnore = parentHasIgnore;
    function parentHasRepeat(element) {
        if (element.classList && element.classList.contains('binding-repeat')) {
            return element;
        }
        if (element.parentNode) {
            return parentHasRepeat(element.parentNode);
        }
    }
    Common.parentHasRepeat = parentHasRepeat;
    function getFunctionArgs(func) {
        return (func + '')
            .replace(/[/][/].*$/mg, '') // strip single-line comments
            .replace(/\s+/g, '') // strip white space
            .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments
            .split('){', 1)[0].replace(/^[^(]*[(]/, '') // extract the parameters
            .replace(/=[^,]+/g, '') // strip any ES6 defaults
            .split(',').filter(Boolean); // split & filter [""]
    }
    Common.getFunctionArgs = getFunctionArgs;
    function deepText(node) {
        var A = [];
        if (node) {
            node = node.firstChild;
            while (node != null) {
                if (node.nodeType === 3) {
                    A[A.length] = node;
                }
                else {
                    A = A.concat(deepText(node));
                }
                node = node.nextSibling;
            }
        }
        return A;
    }
    Common.deepText = deepText;
    function get(obj, path) {
        return lodash_get__WEBPACK_IMPORTED_MODULE_0___default()(obj, path);
    }
    Common.get = get;
    function set(obj, path, value) {
        return lodash_set__WEBPACK_IMPORTED_MODULE_1___default()(obj, path, value);
    }
    Common.set = set;
})(Common || (Common = {}));


/***/ }),

/***/ "../src/constants.ts":
/*!***************************!*\
  !*** ../src/constants.ts ***!
  \***************************/
/*! exports provided: Constants */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Constants", function() { return Constants; });
var Constants = {
    SCOPE_ATTRIBUTE_NAME: '$scope',
    EVENT_ATTRIBUTE_NAME: '$event',
    REPEAT_ATTRIBUTE_NAME: 'cp-repeat',
    REPEAT_INDEX_NAME: '$index',
    REPEAT_ATTRIBUTE_OPERATOR: 'in',
    MODEL_ATTRIBUTE_NAME: 'cp-model',
    CLICK_ATTRIBUTE_NAME: 'cp-click',
    DBLCLICK_ATTRIBUTE_NAME: 'cp-dblclick',
    SHOW_ATTRIBUTE_NAME: 'cp-show',
    IF_ATTRIBUTE_NAME: 'cp-if',
    STEP_ATTRIBUTE_NAME: 'cp-step',
    MAX_ATTRIBUTE_NAME: 'cp-max',
    MAX_LENGTH_ATTRIBUTE_NAME: 'cp-maxlength',
    MIN_ATTRIBUTE_NAME: 'cp-min',
    ELSE_ATTRIBUTE_NAME: 'cp-else',
    ELSE_IF_ATTRIBUTE_NAME: 'cp-else-if',
    INIT_ATTRIBUTE_NAME: 'cp-init',
    STYLE_ATTRIBUTE_NAME: 'cp-style',
    CLASS_ATTRIBUTE_NAME: 'cp-class',
    SRC_ATTRIBUTE_NAME: 'cp-src',
    KEY_ATTRIBUTE_NAME: 'cp-key',
    ATTR_ATTRIBUTE_NAME: 'cp-attr',
    DISABLE_ATTRIBUTE_NAME: 'cp-disabled',
    START_INTERPOLATION: '[[',
    END_INTERPOLATION: ']]',
    IGNORE_BINDINGS: 'cp-non-bindable',
    FOCUS_ATTRIBUTE_NAME: 'cp-focus',
    HIDE_ATTRIBUTE_NAME: 'cp-hide',
    BLUR_ATTRIBUTE_NAME: 'cp-blur',
    TITLE_ATTRIBUTE_NAME: 'cp-title',
    PLACEHOLDER_ATTRIBUTE_NAME: 'cp-placeholder',
    MOUSE_ATTRIBUTE_NAME: 'cp-mouse',
    CHANGE_ATTRIBUTE_NAME: 'cp-change',
};


/***/ }),

/***/ "../src/core/capivara.instance.ts":
/*!****************************************!*\
  !*** ../src/core/capivara.instance.ts ***!
  \****************************************/
/*! exports provided: CapivaraInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CapivaraInstance", function() { return CapivaraInstance; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "../src/constants.ts");
/* harmony import */ var _scope_scope__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scope/scope */ "../src/scope/scope.ts");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component */ "../src/core/component.ts");
/* harmony import */ var _component_instance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component.instance */ "../src/core/component.instance.ts");




var CapivaraInstance = /** @class */ (function () {
    function CapivaraInstance() {
        var _this = this;
        this.LAST_SCOPE_ID = 0;
        this.DOMMutation = window['MutationObserver'] || window['WebKitMutationObserver'] || window['MozMutationObserver'];
        this.version = '3.10.1';
        this.components = {};
        this.scopes = [];
        this.$watchers = [];
        if (!Element.prototype.hasOwnProperty('getAttributeStartingWith')) {
            Object.defineProperty(Element.prototype, 'getAttributeStartingWith', {
                value: function hasAttributeStartingWith(attr) {
                    return Array.from(this.attributes).filter(function (attributeNode) {
                        return attributeNode.nodeName.indexOf(attr) === 0;
                    });
                },
                configurable: true,
            });
        }
        if (!Element.prototype.hasOwnProperty('hasAttributeStartingWith')) {
            Object.defineProperty(Element.prototype, 'hasAttributeStartingWith', {
                value: function hasAttributeStartingWith(attr) {
                    return this.getAttributeStartingWith(attr).length > 0;
                },
                configurable: true,
            });
        }
        if (document.readyState === 'complete' ||
            (document.readyState !== 'loading' && !document.documentElement['doScroll'])) {
            setTimeout(function () {
                _this.createListeners();
                _this.createComponents();
            });
        }
        else {
            document.addEventListener("DOMContentLoaded", function (event) {
                _this.createListeners();
                _this.createComponents();
            });
        }
    }
    CapivaraInstance.prototype.createComponents = function () {
        var _this = this;
        Object.keys(this.components).forEach(function (componentName) {
            var elms = document.querySelectorAll(componentName) || [];
            Array.from(elms).forEach(function (elm) {
                _this.constroyIfComponent(elm);
            });
        });
    };
    CapivaraInstance.prototype.hasRepeat = function (elm) {
        return elm && elm.classList && elm.classList.contains('binding-repeat');
    };
    CapivaraInstance.prototype.constroyIfComponent = function (addedNode, forceCreated) {
        var _this = this;
        var component = this.components[addedNode.nodeName];
        if (component && (forceCreated || !addedNode.created)) {
            addedNode.created = true;
            component.createNewInstance(addedNode).create();
        }
        if (addedNode.children && (forceCreated || !this.hasRepeat(addedNode))) {
            (Array.from(addedNode.children) || []).forEach(function (child) {
                _this.constroyIfComponent(child, forceCreated);
            });
        }
    };
    CapivaraInstance.prototype.destroyIfComponent = function (removedNode) {
        var _this = this;
        removedNode.created = false;
        if (removedNode['$instance'] && !removedNode['$instance'].destroyed) {
            removedNode['$instance'].destroy();
        }
        if (removedNode.children) {
            (Array.from(removedNode.children) || []).forEach(function (child) { return _this.destroyIfComponent(child); });
        }
    };
    CapivaraInstance.prototype.onMutation = function (mutations) {
        var _this = this;
        (mutations || []).forEach(function (mutation) {
            if (mutation.type === 'childList') {
                ((mutation && mutation.addedNodes && mutation.addedNodes.forEach) ? mutation.addedNodes : []).forEach(function (addedNode) {
                    _this.constroyIfComponent(addedNode);
                });
                ((mutation && mutation.removedNodes && mutation.removedNodes.forEach) ? mutation.removedNodes : []).forEach(function (removedNode) {
                    _this.destroyIfComponent(removedNode);
                });
            }
        });
    };
    CapivaraInstance.prototype.createListeners = function () {
        var _this = this;
        if (this.DOMMutation) {
            var observer = new this.DOMMutation(function (mutations) { return _this.onMutation(mutations); });
            observer.observe(document.body, {
                attributes: false,
                childList: true,
                subtree: true,
                characterData: false,
            });
        }
    };
    /**
     * @name capivara.component
     * @description Registra um novo componente capivara
     */
    CapivaraInstance.prototype.component = function (componentName, config) {
        if (window["capivara"].components[componentName]) {
            console.error("A registered component with this name already exists.");
            return;
        }
        window["capivara"].components[componentName.toUpperCase()] = new _component__WEBPACK_IMPORTED_MODULE_2__["Component"](componentName, config);
    };
    /**
     * @name capivara.componentBuilder
     * @description Faz a inicialização de um componente.
     */
    CapivaraInstance.prototype.componentBuilder = function (hashName) {
        return new Promise(function (resp) {
            var elms = window["capivara"].isElement(hashName) ? [hashName] : Array.from(document.querySelectorAll("[\\#" + hashName + "]"));
            if (elms.length === 0) {
                console.error("CapivaraJS did not find its component with the hash " + hashName);
            }
            var instance;
            var findElementAndCreateInstance = function () {
                elms = window["capivara"].isElement(hashName) ? [hashName] : Array.from(document.querySelectorAll("[\\#" + hashName + "]"));
                (elms || []).forEach(function (elm) {
                    var component = window["capivara"].components[elm.nodeName];
                    if (!component) {
                        console.error("We did not find a registered entry under the name: " + elm.nodeName);
                        return;
                    }
                    if (!instance) {
                        instance = elm['$instance'];
                    }
                });
                return instance;
            };
            setTimeout(function () {
                var componentInstance = findElementAndCreateInstance();
                resp(componentInstance);
            });
        });
    };
    /**
     * @name capivara.controller
     * @description Cria um novo controller para fazer manipulação de um determinado elemento.
     */
    CapivaraInstance.prototype.controller = function (elm, callback) {
        new _component_instance__WEBPACK_IMPORTED_MODULE_3__["ComponentInstance"](elm, { controller: callback }).create();
    };
    /**
     * @name capivara,isArray
     * @description Verifica se um valor é um Array.
     */
    CapivaraInstance.prototype.isArray = function (value) {
        return Array.isArray(value) || value instanceof Array;
    };
    /**
     * @name capivara,isObject
     * @description Verifica se um valor é um Objeto.
     */
    CapivaraInstance.prototype.isObject = function (value) {
        return value !== null && typeof value === "object";
    };
    CapivaraInstance.prototype.isObjectConstructor = function (obj) {
        if (!obj) {
            return false;
        }
        return obj.__proto__.constructor.name === 'Object';
    };
    /**
     * @name capivara,isDate
     * @description Verifica se um valor é uma Data.
     */
    CapivaraInstance.prototype.isDate = function (value) {
        return toString.call(value) === "[object Date]";
    };
    /**
     * @name capivara,isElement
     * @description Verifica se um valor é um NodeElement.
     */
    CapivaraInstance.prototype.isElement = function (value) {
        return !!(value &&
            (value.nodeName // We are a direct element.
                || (value.prop && value.attr && value.find)));
    };
    /**
     * @name capivara,isFunction
     * @description Verifica se um valor é uma função.
     */
    CapivaraInstance.prototype.isFunction = function (value) {
        return typeof value === "function";
    };
    /**
     * @name capivara,isNumber
     * @description Verifica se um valor é um número.
     */
    CapivaraInstance.prototype.isNumber = function (value) {
        return typeof value === "number";
    };
    /**
     * @name capivara,isString
     * @description Verifica se um valor é uma string.
     */
    CapivaraInstance.prototype.isString = function (value) {
        return typeof value === "string";
    };
    /**
     * @name capivara,merge
     * @description Faz a junção de objetos em um único objeto.
     */
    CapivaraInstance.prototype.merge = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Object.assign.apply(Object, args);
    };
    /**
     * @name capivara,copy
     * @description Faz a copia de um objeto para que seja criada a referência.
     */
    CapivaraInstance.prototype.copy = function (value) {
        return Object.assign(value);
    };
    /**
     * @name capivara,replaceAll
     * @description Faz a devida alteração em todas as  ocorrências
     */
    CapivaraInstance.prototype.replaceAll = function (str, needle, replacement) {
        return str.split(needle).join(replacement);
    };
    /**
     * @name capivara.constants
     * @description Modifica o nome das diretivas que são criadas pelo capivara.
     */
    CapivaraInstance.prototype.constants = function (obj) {
        Object.keys(obj).forEach(function (key) {
            if (_constants__WEBPACK_IMPORTED_MODULE_0__["Constants"][key]) {
                _constants__WEBPACK_IMPORTED_MODULE_0__["Constants"][key] = obj[key];
            }
        });
    };
    CapivaraInstance.prototype.$on = function (evtName, callback) {
        window["capivara"].$watchers.push({ evtName: evtName, callback: callback });
    };
    CapivaraInstance.prototype.$emit = function (evtName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        window["capivara"]
            .$watchers
            .filter(function (watcher) { return watcher.evtName === evtName; })
            .forEach(function (watcher) {
            watcher.callback.apply(watcher, args);
        });
    };
    CapivaraInstance.prototype.simpleCompare = function (a, b) {
        return a === b || (a !== a && b !== b);
    };
    CapivaraInstance.prototype.isRegExp = function (value) {
        return toString.call(value) === '[object RegExp]';
    };
    CapivaraInstance.prototype.isDefined = function (value) {
        return typeof value !== 'undefined';
    };
    CapivaraInstance.prototype.isWindow = function (value) {
        return value && value.window === value;
    };
    CapivaraInstance.prototype.isScope = function (value) {
        return value instanceof _scope_scope__WEBPACK_IMPORTED_MODULE_1__["Scope"];
    };
    CapivaraInstance.prototype.equals = function (o1, o2) {
        if (o1 === o2) {
            return true;
        }
        if (o1 === null || o2 === null) {
            return false;
        }
        if (o1 !== o1 && o2 !== o2) {
            return true;
        }
        /* tslint:disable */
        var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
        if (t1 === t2 && t1 === 'object') {
            if (this.isArray(o1)) {
                if (!this.isArray(o2)) {
                    return false;
                }
                ;
                if ((length = o1.length) === o2.length) {
                    for (key = 0; key < length; key++) {
                        if (!this.equals(o1[key], o2[key]))
                            return false;
                    }
                    return true;
                }
            }
            else if (this.isDate(o1)) {
                if (!this.isDate(o2))
                    return false;
                return this.simpleCompare(o1.getTime(), o2.getTime());
            }
            else if (this.isRegExp(o1)) {
                if (!this.isRegExp(o2))
                    return false;
                return o1.toString() === o2.toString();
            }
            else {
                if (this.isScope(o1) || this.isScope(o2) || this.isWindow(o1) || this.isWindow(o2) ||
                    this.isArray(o2) || this.isDate(o2) || this.isRegExp(o2))
                    return false;
                keySet = Object.create(null);
                for (key in o1) {
                    if (key.charAt(0) === '$' || this.isFunction(o1[key]))
                        continue;
                    if (!this.equals(o1[key], o2[key]))
                        return false;
                    keySet[key] = true;
                }
                for (key in o2) {
                    if (!(key in keySet) &&
                        key.charAt(0) !== '$' &&
                        this.isDefined(o2[key]) &&
                        !this.isFunction(o2[key]))
                        return false;
                }
                return true;
            }
        }
        return false;
    };
    return CapivaraInstance;
}());



/***/ }),

/***/ "../src/core/component.instance.ts":
/*!*****************************************!*\
  !*** ../src/core/component.instance.ts ***!
  \*****************************************/
/*! exports provided: ComponentInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentInstance", function() { return ComponentInstance; });
/* harmony import */ var melanke_watchjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! melanke-watchjs */ "../node_modules/melanke-watchjs/src/watch.js");
/* harmony import */ var melanke_watchjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(melanke_watchjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common */ "../src/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "../src/constants.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../index */ "../src/index.ts");
/* harmony import */ var _scope_scope_proxy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../scope/scope.proxy */ "../src/scope/scope.proxy.ts");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controller */ "../src/core/controller.ts");
/* harmony import */ var _magic_magic__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./magic/magic */ "../src/core/magic/magic.ts");
/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./observer */ "../src/core/observer/index.ts");








var ComponentInstance = /** @class */ (function () {
    function ComponentInstance(_element, _config) {
        this.constantsValue = {};
        this.functionsValue = {};
        this.bindingsValue = {};
        this.listenerContextBindings = {};
        _config.controllerAs = _config.controllerAs || '$ctrl';
        this.element = _element;
        this.element.$instance = this;
        this.config = _config;
        this.config.controller = this.config.controller || function isolatedScope() { };
        this.renderTemplate();
        this.destroyed = true;
        this.registerController();
    }
    ComponentInstance.prototype.renderTemplate = function () {
        if (this.config.template) {
            if (DOMParser) {
                var templateToElm_1 = new DOMParser().parseFromString(this.config.template, 'text/html');
                var transcludeTemplate = new DOMParser().parseFromString(this.element.innerHTML, 'text/html');
                if (transcludeTemplate && templateToElm_1 && transcludeTemplate.querySelectorAll) {
                    Array.from((transcludeTemplate.querySelectorAll('cp-transclude') || [])).forEach(function (transclude) {
                        var attrName = transclude.getAttribute('name');
                        var query = transclude.nodeName.toLowerCase() + (attrName ? '[name="' + attrName + '"]' : '');
                        Array.from((templateToElm_1.querySelectorAll(query) || [])).forEach(function (transcludeReference) {
                            Array.from(transclude.children).forEach(function (children) {
                                _common__WEBPACK_IMPORTED_MODULE_1__["Common"].appendAfter(transcludeReference, children);
                            });
                            transcludeReference.parentNode.removeChild(transcludeReference);
                        });
                    });
                    this.element.innerHTML = templateToElm_1.body.innerHTML;
                }
                else {
                    this.element.innerHTML = this.config.template;
                }
            }
            else {
                this.element.innerHTML = this.config.template;
            }
        }
    };
    ComponentInstance.prototype.registerController = function () {
        var _this = this;
        new _controller__WEBPACK_IMPORTED_MODULE_5__["Controller"](this.element, function (scope) {
            _this.componentScope = scope;
        });
    };
    ComponentInstance.prototype.initController = function () {
        var _a;
        if (this.destroyed) {
            this.destroyed = false;
            if (this.config.controller) {
                var args = [
                    this.componentScope.element[_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].SCOPE_ATTRIBUTE_NAME],
                    this.componentScope.mapDom.element,
                    this.componentScope.mapDom,
                ];
                this.componentScope[this.config.controllerAs] = new ((_a = this.config.controller).bind.apply(_a, [void 0].concat(args)))();
            }
            this.contextObj = _magic_magic__WEBPACK_IMPORTED_MODULE_6__["Magic"].getContext(this.element);
            this.applyConstantsComponentMagic();
            this.applyFunctionsComponentMagic();
            this.applyBindingsComponentMagic();
            if (this.componentScope[this.config.controllerAs] && this.componentScope[this.config.controllerAs].$onInit) {
                this.componentScope[this.config.controllerAs].$onInit();
            }
            Object.defineProperty(this.componentScope, '__$controllerAs__', {
                value: this.config.controllerAs,
                configurable: true,
            });
            var context = _common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(this.element);
            context.$emit('$onInit');
            context.mapDom.reload();
        }
    };
    /**
     * @description Aplica os bindings|constants|functions
     */
    ComponentInstance.prototype.build = function () {
        this.applyConstantsComponentBuilder();
        this.applyFunctionsComponentBuilder();
        if (this.contextObj) {
            this.applyBindingsComponentBuilder();
        }
        var context = _common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(this.element);
        if (context.scope.$ctrl.$onBuild) {
            context.scope.$ctrl.$onBuild();
        }
    };
    /**
     * @description Renderiza o template no elemento.
     */
    ComponentInstance.prototype.create = function () {
        this.initController();
    };
    /**
     * @description Função executada quando o elemento é destruído do documento.
     */
    ComponentInstance.prototype.destroy = function () {
        var _this = this;
        this.destroyed = true;
        this.element[_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].SCOPE_ATTRIBUTE_NAME].destroy();
        _observer__WEBPACK_IMPORTED_MODULE_7__["Observe"].unobserve(this.componentScope[this.config.controllerAs]);
        if (this.componentScope[this.config.controllerAs] && this.componentScope[this.config.controllerAs].$destroy) {
            this.componentScope[this.config.controllerAs].$destroy();
        }
        if (this.componentScope[this.config.controllerAs] && this.componentScope[this.config.controllerAs].$onDestroy) {
            this.componentScope[this.config.controllerAs].$onDestroy();
        }
        try {
            window['capivara'].scopes = window['capivara'].scopes.filter(function (scope) {
                return scope.id !== _this.componentScope.element[_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].SCOPE_ATTRIBUTE_NAME].id &&
                    scope.id !== _this.contextObj.element[_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].SCOPE_ATTRIBUTE_NAME].id;
            });
        }
        catch (e) { }
    };
    /**
     * @description
     * @param obj Contexto dos bindings, o contexto é o objeto que possui os valores dos bindings
     */
    ComponentInstance.prototype.context = function (obj) {
        this.contextObj = obj;
        return this;
    };
    /**
     * @description Cria os bindings que o componente espera.
     * @param _bindings Objeto com o nome dos bindings
     */
    ComponentInstance.prototype.bindings = function (_bindings) {
        if (_bindings === void 0) { _bindings = {}; }
        if (!this.contextObj) {
            console.error('Bindings ainda não aplicados. Primeiro, é necessário informar o contexto.');
            return this;
        }
        this.bindingsValue = Object.assign(this.bindingsValue, _bindings);
        return this;
    };
    ComponentInstance.prototype.applyBindingsComponentBuilder = function () {
        var _this = this;
        (this.config.bindings || []).forEach(function (key) {
            _this.setAttributeValue(_this.bindingsValue, key);
            _this.createObserverContext(_this.bindingsValue, key);
        });
        this.createObserverScope(this.bindingsValue);
    };
    ComponentInstance.prototype.applyBindingsComponentMagic = function () {
        var _this = this;
        if (!_common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(this.element).scope[this.config.controllerAs]['$bindings']) {
            _common__WEBPACK_IMPORTED_MODULE_1__["Common"].set(_common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(this.element).scope, this.config.controllerAs + '.$bindings', {});
            _common__WEBPACK_IMPORTED_MODULE_1__["Common"].set(_common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(this.element).scope, '$bindings', {});
        }
        (this.config.bindings || []).forEach(function (bindingKey) {
            var bindAttribute = bindingKey.replace(/([A-Z])/g, "-$1").toLowerCase();
            var valueAttribute = _this.element.getAttribute(bindAttribute);
            if (valueAttribute) {
                _this.bindingsValue[bindingKey] = valueAttribute;
                _this.setAttributeValue(_this.bindingsValue, bindingKey);
                _this.createObserverContext(_this.bindingsValue, bindingKey);
            }
        });
        this.createObserverScope(this.bindingsValue);
    };
    /**
    * @description Observa o componente quando houver alteração é modificado o contexto
    */
    ComponentInstance.prototype.createObserverScope = function (_bindings) {
        var _this = this;
        if (_bindings === void 0) { _bindings = {}; }
        var $ctrl = _common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(this.element).scope[this.config.controllerAs];
        Object.defineProperty($ctrl, '_$$checkBindings', {
            value: function (changes) {
                changes.forEach(function (change) {
                    if (change.type === 'update' && _bindings.hasOwnProperty(change.name)) {
                        _common__WEBPACK_IMPORTED_MODULE_1__["Common"].set(_this.contextObj, _bindings[change.name], change.object[change.name]);
                        _this.forceUpdateContext();
                    }
                });
            },
            writable: true,
            configurable: true,
        });
    };
    ComponentInstance.prototype.forceUpdateContext = function () {
        if (this.contextObj) {
            if (this.contextObj['$forceUpdate']) {
                this.contextObj['$forceUpdate']();
            }
            if (this.contextObj['$apply']) {
                this.contextObj['$apply']();
            }
            if (this.contextObj['forceUpdate']) {
                this.contextObj['forceUpdate']();
            }
            if (window['ng']) {
                var debugContext = window['ng'].probe(this.element);
                if (debugContext) {
                    debugContext.injector.get(window['ng'].coreTokens.ApplicationRef).tick();
                }
            }
        }
    };
    /**
     * @description Observa o contexto, quando houver alteração é modificado no escopo do componente
     */
    ComponentInstance.getFirstAttribute = function (_bindings, key) {
        if (_bindings === void 0) { _bindings = {}; }
        return _bindings[key].indexOf('.') !== -1 ? _bindings[key].substring(0, _bindings[key].indexOf('.')) : _bindings[key];
    };
    ComponentInstance.prototype.observeAndSetValues = function (obj, _bindings, key) {
        var _this = this;
        _observer__WEBPACK_IMPORTED_MODULE_7__["Observe"].observe(obj, function () {
            _this.setAttributeValue(_bindings, key);
        });
    };
    ComponentInstance.prototype.createObserverContext = function (_bindings, key) {
        var _this = this;
        if (!_bindings[key]) {
            return;
        }
        if (this.contextObj instanceof _scope_scope_proxy__WEBPACK_IMPORTED_MODULE_4__["ScopeProxy"]) {
            if (this.contextObj[this.config.controllerAs]) {
                this.observeAndSetValues(this.contextObj[this.config.controllerAs], _bindings, key);
            }
            else {
                this.observeAndSetValues(this.contextObj, _bindings, key);
            }
        }
        else {
            var attrToObserve = ComponentInstance.getFirstAttribute(_bindings, key);
            melanke_watchjs__WEBPACK_IMPORTED_MODULE_0___default.a.watch(this.contextObj, attrToObserve, function () {
                _this.setAttributeValue(_bindings, key);
            }, 1);
        }
    };
    ComponentInstance.prototype.setAttributeRecursive = function (element, bindKey) {
        var _this = this;
        var scope = _common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(element).scope;
        var bindKeyFormatted = bindKey.replace(/([A-Z])/g, "-$1").toLowerCase();
        Object.keys((_index__WEBPACK_IMPORTED_MODULE_3__["Capivara"].components)).forEach(function (key) {
            var componentName = key.toLowerCase();
            var components = Array.from(_this.element.querySelectorAll(componentName));
            components.forEach(function (component) {
                if (component.firstChild) {
                    var componentCtx = _common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(component.firstChild).scope;
                    _common__WEBPACK_IMPORTED_MODULE_1__["Common"].set(componentCtx[_this.config.controllerAs], '$bindings.' + bindKey, _common__WEBPACK_IMPORTED_MODULE_1__["Common"].get(scope, component.getAttribute(bindKeyFormatted)));
                }
            });
        });
    };
    ComponentInstance.prototype.setAttributeValue = function (_bindings, key) {
        if (_bindings === void 0) { _bindings = {}; }
        var parentRepeat = _common__WEBPACK_IMPORTED_MODULE_1__["Common"].parentHasRepeat(this.element), scope = _common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(this.element).scope;
        if (this.contextObj instanceof _scope_scope_proxy__WEBPACK_IMPORTED_MODULE_4__["ScopeProxy"] && _bindings[key].startsWith(this.config.controllerAs) && parentRepeat) {
            var ctx = _common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(parentRepeat);
            if (ctx.$parent) {
                _common__WEBPACK_IMPORTED_MODULE_1__["Common"].set(scope, this.config.controllerAs + '.$bindings.' + key, _common__WEBPACK_IMPORTED_MODULE_1__["Common"].get(ctx.$parent.scope, _bindings[key]));
                _common__WEBPACK_IMPORTED_MODULE_1__["Common"].set(scope, '$bindings.' + key, _common__WEBPACK_IMPORTED_MODULE_1__["Common"].get(ctx.$parent.scope, _bindings[key]));
            }
        }
        else {
            _common__WEBPACK_IMPORTED_MODULE_1__["Common"].set(scope[this.config.controllerAs], '$bindings.' + key, _common__WEBPACK_IMPORTED_MODULE_1__["Common"].get(this.contextObj, _bindings[key]));
            _common__WEBPACK_IMPORTED_MODULE_1__["Common"].set(scope, '$bindings.' + key, _common__WEBPACK_IMPORTED_MODULE_1__["Common"].get(this.contextObj, _bindings[key]));
        }
        this.setAttributeRecursive(this.element, key);
        if (scope[this.config.controllerAs] && scope[this.config.controllerAs].$onChanges) {
            scope[this.config.controllerAs].$onChanges();
        }
    };
    /**
     * @description Crie valores sem referências
     * @param _constants Objeto com o nome das constants
     */
    ComponentInstance.prototype.constants = function (_constants) {
        if (_constants === void 0) { _constants = {}; }
        this.constantsValue = _constants;
        return this;
    };
    ComponentInstance.prototype.applyConstantsComponentMagic = function () {
        var _this = this;
        if (!_common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(this.element).scope[this.config.controllerAs]['$constants']) {
            _common__WEBPACK_IMPORTED_MODULE_1__["Common"].set(_common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(this.element).scope, this.config.controllerAs + '.$constants', {});
            _common__WEBPACK_IMPORTED_MODULE_1__["Common"].set(_common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(this.element).scope, '$constants', {});
        }
        (this.config.constants || []).forEach(function (constantKey) {
            var bindAttribute = constantKey.replace(/([A-Z])/g, "-$1").toLowerCase();
            var valueAttribute = _this.element.getAttribute(bindAttribute);
            if (valueAttribute) {
                var constantValue = _common__WEBPACK_IMPORTED_MODULE_1__["Common"].evalInContext(valueAttribute, _this.contextObj);
                _common__WEBPACK_IMPORTED_MODULE_1__["Common"].set(_common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(_this.element).scope, _this.config.controllerAs + '.$constants.' + constantKey, constantValue);
                _common__WEBPACK_IMPORTED_MODULE_1__["Common"].set(_common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(_this.element).scope, '$constants.' + constantKey, constantValue);
            }
        });
    };
    ComponentInstance.prototype.applyConstantsComponentBuilder = function () {
        var _this = this;
        (this.config.constants || []).forEach(function (key) {
            _common__WEBPACK_IMPORTED_MODULE_1__["Common"].set(_common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(_this.element).scope, _this.config.controllerAs + '.$constants.' + key, _this.constantsValue[key]);
            // Mantém compatibilidade
            _common__WEBPACK_IMPORTED_MODULE_1__["Common"].set(_common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(_this.element).scope, '$constants.' + key, _this.constantsValue[key]);
        });
    };
    ComponentInstance.prototype.functions = function (_functions) {
        if (_functions === void 0) { _functions = {}; }
        this.functionsValue = _functions;
        return this;
    };
    ComponentInstance.prototype.applyFunctionsComponentMagic = function () {
        var _this = this;
        if (!_common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(this.element).scope[this.config.controllerAs]['$functions']) {
            _common__WEBPACK_IMPORTED_MODULE_1__["Common"].set(_common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(this.element).scope, this.config.controllerAs + '.$functions', {});
            _common__WEBPACK_IMPORTED_MODULE_1__["Common"].set(_common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(this.element).scope, '$functions', {});
        }
        (this.config.functions || []).forEach(function (functionKey) {
            var bindAttribute = functionKey.replace(/([A-Z])/g, "-$1").toLowerCase();
            var valueAttribute = _this.element.getAttribute(bindAttribute);
            if (valueAttribute) {
                var indexRelative = valueAttribute.indexOf('(');
                var callback = indexRelative !== -1 ? _common__WEBPACK_IMPORTED_MODULE_1__["Common"].get(_this.contextObj, valueAttribute.substring(0, indexRelative)) : _common__WEBPACK_IMPORTED_MODULE_1__["Common"].get(_this.contextObj, valueAttribute);
                if (callback) {
                    Object.defineProperty(callback, '__ctx__', {
                        value: _this.contextObj,
                        configurable: true,
                    });
                    _common__WEBPACK_IMPORTED_MODULE_1__["Common"].set(_common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(_this.element).scope, _this.config.controllerAs + '.$functions.' + functionKey, callback);
                    _common__WEBPACK_IMPORTED_MODULE_1__["Common"].set(_common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(_this.element).scope, '$functions.' + functionKey, callback);
                }
            }
        });
    };
    ComponentInstance.prototype.applyFunctionsComponentBuilder = function () {
        var _this = this;
        (this.config.functions || []).forEach(function (key) {
            _common__WEBPACK_IMPORTED_MODULE_1__["Common"].set(_common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(_this.element).scope, _this.config.controllerAs + '.$functions.' + key, _this.functionsValue[key]);
            _common__WEBPACK_IMPORTED_MODULE_1__["Common"].set(_common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(_this.element).scope, '$functions.' + key, _this.functionsValue[key]);
        });
    };
    return ComponentInstance;
}());



/***/ }),

/***/ "../src/core/component.ts":
/*!********************************!*\
  !*** ../src/core/component.ts ***!
  \********************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony import */ var _component_instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component.instance */ "../src/core/component.instance.ts");

var Component = /** @class */ (function () {
    function Component(_componentName, config) {
        this.componentName = _componentName;
        this.config = config;
        this.customElementsVue();
    }
    Component.prototype.customElementsVue = function () {
        var _this = this;
        if (window['Vue']) {
            window['Vue'].config.ignoredElements = window['Vue'].config.ignoredElements || [];
            if (window['Vue'].config.ignoredElements.filter(function (value) { return value === _this.componentName; }).length === 0) {
                window['Vue'].config.ignoredElements.push(this.componentName);
            }
        }
    };
    Component.prototype.createNewInstance = function (elm) {
        return new _component_instance__WEBPACK_IMPORTED_MODULE_0__["ComponentInstance"](elm, this.config);
    };
    return Component;
}());



/***/ }),

/***/ "../src/core/controller.ts":
/*!*********************************!*\
  !*** ../src/core/controller.ts ***!
  \*********************************/
/*! exports provided: Controller */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
/* harmony import */ var _scope_scope__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scope/scope */ "../src/scope/scope.ts");

var Controller = /** @class */ (function () {
    function Controller(element, callback) {
        var scope = new _scope_scope__WEBPACK_IMPORTED_MODULE_0__["Scope"](element);
        callback(scope.getScopeProxy());
    }
    return Controller;
}());



/***/ }),

/***/ "../src/core/element.ts":
/*!******************************!*\
  !*** ../src/core/element.ts ***!
  \******************************/
/*! exports provided: CapivaraElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CapivaraElement", function() { return CapivaraElement; });
var CapivaraElement = /** @class */ (function () {
    function CapivaraElement(element) {
        this.element = element;
        this.events = {};
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
    }
    CapivaraElement.prototype.on = function (eventName, callback) {
        var _this = this;
        if (this.events[eventName]) {
            this.events[eventName].push(callback);
        }
        else {
            this.events[eventName] = [callback];
            if (!this.onEvent) {
                this.onEvent = function (evt) {
                    (_this.events[evt.type] || []).forEach(function (cb) { return cb(evt); });
                };
            }
            this.element.addEventListener(eventName, this.onEvent);
        }
    };
    CapivaraElement.prototype.destroy = function () {
        var _this = this;
        Object.keys(this.events).forEach(function (eventName) {
            _this.element.removeEventListener(eventName, _this.onEvent);
        });
    };
    return CapivaraElement;
}());



/***/ }),

/***/ "../src/core/eval.ts":
/*!***************************!*\
  !*** ../src/core/eval.ts ***!
  \***************************/
/*! exports provided: Eval */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Eval", function() { return Eval; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common */ "../src/common.ts");

var Eval;
(function (Eval) {
    function replaceAt(input, search, replace, start, end) {
        return input.slice(0, start)
            + input.slice(start, end).replace(search, replace)
            + input.slice(end);
    }
    Eval.replaceAt = replaceAt;
    function getIndexStart(arr, currentIndex) {
        if (currentIndex === 0) {
            return 0;
        }
        var getPreviousSize = function (i, size) {
            var index = i - 1;
            if (index === -1) {
                return size;
            }
            size += arr[index].length;
            return getPreviousSize(index, size);
        };
        return getPreviousSize(currentIndex, 0);
    }
    Eval.getIndexStart = getIndexStart;
    function isVariable(str) {
        if (str === void 0) { str = ''; }
        var firstChar = str.charAt(0);
        return /[a-zA-Z]/g.test(firstChar)
            || firstChar === '$'
            || firstChar === '_';
    }
    Eval.isVariable = isVariable;
    function evaluation(source, context, prefix) {
        if (prefix === void 0) { prefix = ''; }
        var contexts = Array.isArray(context) ? context : [context];
        var referenceSelf = "this." + (prefix ? prefix += '.' : ''), regex = /\$*[a-z0-9.$]+\s*/gi, keys = source.match(regex);
        if (keys && Array.isArray(keys)) {
            keys.forEach(function (str, i) {
                var key = str.replace(/\s/g, ''), indexStart = getIndexStart(keys, i);
                var indexEnd = indexStart + source.substring(indexStart, source.length).indexOf(key) + key.length;
                if (!key.includes(referenceSelf)) {
                    var isVar = !prefix.trim() ? contexts.filter(function (c) { return c.hasOwnProperty(_common__WEBPACK_IMPORTED_MODULE_0__["Common"].getFirstKey(key)); }).length > 0 : isVariable(key);
                    if (isVar) {
                        source = replaceAt(source, key, "" + referenceSelf + key, indexStart, indexEnd);
                    }
                }
            });
        }
        try {
            return function executeCode(str) {
                var _this = this;
                (contexts || []).forEach(function (c) { return Object.keys(c).forEach(function (key) {
                    if (!_this[key]) {
                        _this[key] = c[key];
                    }
                }); });
                return eval(str);
            }.call({}, source);
        }
        catch (e) {
            throw e;
        }
    }
    Eval.evaluation = evaluation;
    function exec(source, context) {
        try {
            var contexts = (Array.isArray(context) ? context : [context]);
            var contextMerged_1 = Object.assign.apply(Object, [{}].concat(contexts));
            var params = Object.keys(contextMerged_1), paramsValues = params.map(function (param) { return contextMerged_1[param]; });
            var toReturn = new (Function.bind.apply(Function, [void 0].concat(params, ["\n        const value = " + source + ";\n        return value == undefined ? '' : Number.isNaN(value) ? 0 : value;\n      "])))().apply(void 0, paramsValues);
            if (toReturn === undefined) {
                return evaluation(source, context);
            }
            return toReturn;
        }
        catch (e) {
            return evaluation(source, context);
        }
    }
    Eval.exec = exec;
})(Eval || (Eval = {}));


/***/ }),

/***/ "../src/core/index.ts":
/*!****************************!*\
  !*** ../src/core/index.ts ***!
  \****************************/
/*! exports provided: CapivaraInstance, Controller, ComponentInstance, Component, Eval, Observe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _capivara_instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./capivara.instance */ "../src/core/capivara.instance.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CapivaraInstance", function() { return _capivara_instance__WEBPACK_IMPORTED_MODULE_0__["CapivaraInstance"]; });

/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller */ "../src/core/controller.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return _controller__WEBPACK_IMPORTED_MODULE_1__["Controller"]; });

/* harmony import */ var _component_instance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component.instance */ "../src/core/component.instance.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ComponentInstance", function() { return _component_instance__WEBPACK_IMPORTED_MODULE_2__["ComponentInstance"]; });

/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./component */ "../src/core/component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return _component__WEBPACK_IMPORTED_MODULE_3__["Component"]; });

/* harmony import */ var _eval__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./eval */ "../src/core/eval.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Eval", function() { return _eval__WEBPACK_IMPORTED_MODULE_4__["Eval"]; });

/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./observer */ "../src/core/observer/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Observe", function() { return _observer__WEBPACK_IMPORTED_MODULE_5__["Observe"]; });









/***/ }),

/***/ "../src/core/magic/check.context.ts":
/*!******************************************!*\
  !*** ../src/core/magic/check.context.ts ***!
  \******************************************/
/*! exports provided: CheckContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckContext", function() { return CheckContext; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "../src/common.ts");
/* harmony import */ var _types_angular_context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types/angular.context */ "../src/core/magic/types/angular.context.ts");
/* harmony import */ var _types_angularjs_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types/angularjs.context */ "../src/core/magic/types/angularjs.context.ts");
/* harmony import */ var _types_capivara_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./types/capivara.context */ "../src/core/magic/types/capivara.context.ts");
/* harmony import */ var _types_react_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types/react.context */ "../src/core/magic/types/react.context.ts");
/* harmony import */ var _types_vuejs_context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./types/vuejs.context */ "../src/core/magic/types/vuejs.context.ts");






var CheckContext;
(function (CheckContext) {
    /**
     * @pattern https://pt.wikipedia.org/wiki/Chain_of_Responsibility
     * @param element
     */
    function getContext(element) {
        if (_common__WEBPACK_IMPORTED_MODULE_0__["Common"].insideComponent(element)) {
            return new _types_capivara_context__WEBPACK_IMPORTED_MODULE_3__["CapivaraJSContext"]().getContext(element);
        }
        var context = new _types_angularjs_context__WEBPACK_IMPORTED_MODULE_2__["AngularJSContext"](new _types_angular_context__WEBPACK_IMPORTED_MODULE_1__["AngularContext"](new _types_vuejs_context__WEBPACK_IMPORTED_MODULE_5__["VueJSContext"](new _types_react_context__WEBPACK_IMPORTED_MODULE_4__["ReactContext"](new _types_capivara_context__WEBPACK_IMPORTED_MODULE_3__["CapivaraJSContext"]()))));
        return context.getContext(element);
    }
    CheckContext.getContext = getContext;
})(CheckContext || (CheckContext = {}));


/***/ }),

/***/ "../src/core/magic/context.ts":
/*!************************************!*\
  !*** ../src/core/magic/context.ts ***!
  \************************************/
/*! exports provided: Context */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Context", function() { return Context; });
var Context = /** @class */ (function () {
    function Context(context) {
        if (context) {
            this.successor = context;
        }
    }
    Context.prototype.getContext = function (element) {
        if (window[this.name]) {
            return this.process(element);
        }
        else if (this.successor) {
            return this.successor.getContext(element);
        }
    };
    return Context;
}());



/***/ }),

/***/ "../src/core/magic/magic.ts":
/*!**********************************!*\
  !*** ../src/core/magic/magic.ts ***!
  \**********************************/
/*! exports provided: Magic */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Magic", function() { return Magic; });
/* harmony import */ var _check_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./check.context */ "../src/core/magic/check.context.ts");

var Magic;
(function (Magic) {
    function getContext(element) {
        return _check_context__WEBPACK_IMPORTED_MODULE_0__["CheckContext"].getContext(element);
    }
    Magic.getContext = getContext;
})(Magic || (Magic = {}));


/***/ }),

/***/ "../src/core/magic/types/angular.context.ts":
/*!**************************************************!*\
  !*** ../src/core/magic/types/angular.context.ts ***!
  \**************************************************/
/*! exports provided: AngularContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularContext", function() { return AngularContext; });
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../context */ "../src/core/magic/context.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var AngularContext = /** @class */ (function (_super) {
    __extends(AngularContext, _super);
    function AngularContext(context) {
        var _this = _super.call(this, context) || this;
        _this.name = 'ng';
        return _this;
    }
    AngularContext.prototype.process = function (element) {
        var probe = window[this.name].probe(element);
        if (probe && probe._debugContext && probe._debugContext.context) {
            return probe._debugContext.context;
        }
    };
    return AngularContext;
}(_context__WEBPACK_IMPORTED_MODULE_0__["Context"]));



/***/ }),

/***/ "../src/core/magic/types/angularjs.context.ts":
/*!****************************************************!*\
  !*** ../src/core/magic/types/angularjs.context.ts ***!
  \****************************************************/
/*! exports provided: AngularJSContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularJSContext", function() { return AngularJSContext; });
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../context */ "../src/core/magic/context.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var AngularJSContext = /** @class */ (function (_super) {
    __extends(AngularJSContext, _super);
    function AngularJSContext(context) {
        var _this = _super.call(this, context) || this;
        _this.name = 'angular';
        return _this;
    }
    AngularJSContext.prototype.process = function (element) {
        return window[this.name].element(element).scope();
    };
    return AngularJSContext;
}(_context__WEBPACK_IMPORTED_MODULE_0__["Context"]));



/***/ }),

/***/ "../src/core/magic/types/capivara.context.ts":
/*!***************************************************!*\
  !*** ../src/core/magic/types/capivara.context.ts ***!
  \***************************************************/
/*! exports provided: CapivaraJSContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CapivaraJSContext", function() { return CapivaraJSContext; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../common */ "../src/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../constants */ "../src/constants.ts");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context */ "../src/core/magic/context.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var CapivaraJSContext = /** @class */ (function (_super) {
    __extends(CapivaraJSContext, _super);
    function CapivaraJSContext(context) {
        var _this = _super.call(this, context) || this;
        _this.name = 'capivara';
        return _this;
    }
    CapivaraJSContext.prototype.process = function (element) {
        if (_common__WEBPACK_IMPORTED_MODULE_0__["Common"].isComponent(element) && element.parentNode && element.parentNode[_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].SCOPE_ATTRIBUTE_NAME]) {
            return element.parentNode[_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].SCOPE_ATTRIBUTE_NAME].scope;
        }
        if (element && element[_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].SCOPE_ATTRIBUTE_NAME]) {
            return element[_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].SCOPE_ATTRIBUTE_NAME].scope;
        }
    };
    return CapivaraJSContext;
}(_context__WEBPACK_IMPORTED_MODULE_2__["Context"]));



/***/ }),

/***/ "../src/core/magic/types/react.context.ts":
/*!************************************************!*\
  !*** ../src/core/magic/types/react.context.ts ***!
  \************************************************/
/*! exports provided: ReactContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactContext", function() { return ReactContext; });
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../context */ "../src/core/magic/context.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ReactContext = /** @class */ (function (_super) {
    __extends(ReactContext, _super);
    function ReactContext(context) {
        var _this = _super.call(this, context) || this;
        _this.name = 'React';
        return _this;
    }
    ReactContext.prototype.constainsAttr = function (attr, element) {
        var keyValue;
        for (var key in element) {
            if (key.startsWith('__reactInternalInstance$')) {
                keyValue = key;
                break;
            }
        }
        return keyValue;
    };
    ReactContext.prototype.process = function (element) {
        var key = this.constainsAttr('__reactInternalInstance$', element);
        if (key) {
            var fiberNode = element[key];
            if (fiberNode && fiberNode._debugOwner) {
                return fiberNode._debugOwner.stateNode;
            }
        }
        else if (element.parentElement) {
            return this.process(element.parentElement);
        }
    };
    ReactContext.prototype.teste = function (element) {
        if (element.parentElement && element.parentElement.startsWith('__reactInternalInstance$')) {
            return element.parentElement.startsWith('__reactInternalInstance$');
        }
        else if (element.parentElement) {
            return this.teste(element.parentElement);
        }
        else {
            return;
        }
    };
    return ReactContext;
}(_context__WEBPACK_IMPORTED_MODULE_0__["Context"]));



/***/ }),

/***/ "../src/core/magic/types/vuejs.context.ts":
/*!************************************************!*\
  !*** ../src/core/magic/types/vuejs.context.ts ***!
  \************************************************/
/*! exports provided: VueJSContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VueJSContext", function() { return VueJSContext; });
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../context */ "../src/core/magic/context.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var VueJSContext = /** @class */ (function (_super) {
    __extends(VueJSContext, _super);
    function VueJSContext(context) {
        var _this = _super.call(this, context) || this;
        _this.name = 'Vue';
        return _this;
    }
    VueJSContext.prototype.process = function (element) {
        if (element.parentElement && element.parentElement.__vue__) {
            return element.parentElement.__vue__;
        }
        else if (element.parentElement) {
            return this.process(element.parentElement);
        }
        else {
            return;
        }
    };
    return VueJSContext;
}(_context__WEBPACK_IMPORTED_MODULE_0__["Context"]));



/***/ }),

/***/ "../src/core/observer/index.ts":
/*!*************************************!*\
  !*** ../src/core/observer/index.ts ***!
  \*************************************/
/*! exports provided: Observe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Observe", function() { return Observe; });
/* harmony import */ var _polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfill */ "../src/core/observer/polyfill.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "../src/core/observer/util.ts");


var Observe;
(function (Observe) {
    var watchers = new WeakMap();
    function observe(obj, handler) {
        if (!obj) {
            return;
        }
        if (!watchers.has(obj)) {
            watchers.set(obj, [handler]);
            this.create(obj, function (changes) {
                (watchers.get(obj) || []).forEach(function (watcher) {
                    watcher(changes);
                });
            });
        }
        else {
            var handlers = watchers.get(obj);
            handlers.push(handler);
            watchers.set(obj, handlers);
        }
    }
    Observe.observe = observe;
    function unobserve(obj) {
        this.destroy(obj);
        watchers.delete(obj);
    }
    Observe.unobserve = unobserve;
    function create(obj, handler, objCreated) {
        if (objCreated === void 0) { objCreated = []; }
        if (obj && obj.__observer__) {
            return false;
        }
        objCreated.push(obj);
        var props = _util__WEBPACK_IMPORTED_MODULE_1__["Util"].keys(obj);
        var propsL = props.length;
        _polyfill__WEBPACK_IMPORTED_MODULE_0__["Polyfill"].setDirtyCheck(obj, 50, updateProperties);
        for (var i = 0; i < propsL; i++) {
            if (Object.prototype.toString.call(obj[props[i]]) === '[object Object]' || Array.isArray(obj[props[i]])) {
                if (objCreated.indexOf(obj[props[i]]) === -1 && !obj[props[i]].__observer__) {
                    this.create(obj[props[i]], handler, objCreated);
                }
            }
            else {
                _polyfill__WEBPACK_IMPORTED_MODULE_0__["Polyfill"].watchProperty(obj, props[i], handler);
            }
        }
        function updateProperties() {
            if (!_util__WEBPACK_IMPORTED_MODULE_1__["Util"].compare(props, _util__WEBPACK_IMPORTED_MODULE_1__["Util"].keys(obj))) {
                _polyfill__WEBPACK_IMPORTED_MODULE_0__["Polyfill"].updateProperties(_util__WEBPACK_IMPORTED_MODULE_1__["Util"].diff(props, _util__WEBPACK_IMPORTED_MODULE_1__["Util"].keys(obj)), obj, handler);
                props = _util__WEBPACK_IMPORTED_MODULE_1__["Util"].keys(obj);
            }
        }
    }
    Observe.create = create;
    function destroy(obj, objDestroyed) {
        if (objDestroyed === void 0) { objDestroyed = []; }
        if (!obj || !obj.__observer__) {
            return false;
        }
        objDestroyed.push(obj);
        var props = Object.keys(obj), propsL = props.length;
        _polyfill__WEBPACK_IMPORTED_MODULE_0__["Polyfill"].clearDirtyCheck(obj);
        for (var i = 0; i < propsL; i++) {
            if (Object.prototype.toString.call(obj[props[i]]) === '[object Object]' || Array.isArray(obj[props[i]])) {
                if (objDestroyed.indexOf(obj[props[i]]) === -1 && obj[props[i]].__observer__) {
                    this.destroy(obj[props[i]], objDestroyed);
                }
            }
            else {
                _polyfill__WEBPACK_IMPORTED_MODULE_0__["Polyfill"].unWatchProperty(obj, props[i]);
            }
        }
    }
    Observe.destroy = destroy;
})(Observe || (Observe = {}));


/***/ }),

/***/ "../src/core/observer/polyfill.ts":
/*!****************************************!*\
  !*** ../src/core/observer/polyfill.ts ***!
  \****************************************/
/*! exports provided: Polyfill */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Polyfill", function() { return Polyfill; });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "../src/core/observer/index.ts");

var Polyfill;
(function (Polyfill) {
    var keyObserver = '__observer__';
    function watchProperty(obj, prop, handler) {
        var oldVal = obj[prop];
        var newVal = oldVal;
        var getter = function () {
            return newVal;
        };
        var setter = function (val) {
            oldVal = newVal;
            var value = (newVal = val);
            if (oldVal !== val) {
                handler([{
                        type: 'update',
                        object: obj,
                        name: prop,
                        oldValue: oldVal,
                    }]);
            }
            return value;
        };
        if (delete obj[prop]) {
            Object.defineProperty(obj, prop, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true,
            });
        }
    }
    Polyfill.watchProperty = watchProperty;
    function updateProperties(delta, obj, handler) {
        var added = delta.added, deleted = delta.deleted, hasAdded = !!added.length, hasDeleted = !!deleted.length, all = delta.all, allL = all.length, response = [];
        for (var i = 0; i < allL; i++) {
            watchProperty(obj, all[i], handler);
            if (hasAdded && i <= added.length) {
                response.push({
                    type: 'add',
                    object: obj,
                    name: added[i],
                });
            }
            if (hasDeleted && i <= deleted.length) {
                response.push({
                    type: 'deleted',
                    object: obj,
                    name: deleted[i],
                });
            }
        }
        _index__WEBPACK_IMPORTED_MODULE_0__["Observe"].destroy(obj);
        _index__WEBPACK_IMPORTED_MODULE_0__["Observe"].create(obj, handler);
        handler(response);
    }
    Polyfill.updateProperties = updateProperties;
    function unWatchProperty(obj, prop) {
        var val = obj[prop];
        delete obj[prop];
        obj[prop] = val;
    }
    Polyfill.unWatchProperty = unWatchProperty;
    function setDirtyCheck(obj, time, fn) {
        Object.defineProperty(obj, keyObserver, {
            enumerable: false,
            configurable: true,
            writable: false,
            value: setInterval(fn, time),
        });
    }
    Polyfill.setDirtyCheck = setDirtyCheck;
    function clearDirtyCheck(obj) {
        clearInterval(obj[keyObserver]);
        delete obj[keyObserver];
    }
    Polyfill.clearDirtyCheck = clearDirtyCheck;
})(Polyfill || (Polyfill = {}));


/***/ }),

/***/ "../src/core/observer/util.ts":
/*!************************************!*\
  !*** ../src/core/observer/util.ts ***!
  \************************************/
/*! exports provided: Util */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Util", function() { return Util; });
var Util;
(function (Util) {
    function compare(arr1, arr2) {
        if (!(arr1 instanceof Array) || !(arr2 instanceof Array)) {
            throw new TypeError('#compare accepts two parameters, both being Arrays.');
        }
        if (arr1.length !== arr2.length) {
            return false;
        }
        for (var i = 0, l = arr1.length; i < l; i++) {
            if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
                if (!this.compare(arr1[i], arr2[i])) {
                    return false;
                }
            }
            else if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }
    Util.compare = compare;
    function diff(arr1, arr2) {
        if (!arr1 || !arr2 || !(arr1 instanceof Array) || !(arr2 instanceof Array)) {
            throw new TypeError('#diff accepts two parameters, both being Arrays.');
        }
        var a = [], diffValue = {}, a1L = arr1.length, a2L = arr2.length;
        diffValue.added = [];
        diffValue.deleted = [];
        diffValue.all = [];
        for (var i = 0; i < a1L; i++) {
            a[arr1[i]] = 1;
        }
        for (var j = 0; j < a2L; j++) {
            if (a[arr2[j]]) {
                try {
                    delete a[arr2[j]];
                }
                catch (e) { }
            }
            else {
                a[arr2[j]] = 2;
            }
        }
        for (var k in a) {
            if (k) {
                diffValue.all.push(k);
                if (a[k] === 1) {
                    diffValue.deleted.push(k);
                }
                else {
                    diffValue.added.push(k);
                }
            }
        }
        return diffValue;
    }
    Util.diff = diff;
    function keys(obj) {
        if (Object.prototype.toString.call(obj) !== '[object Object]' && !Array.isArray(obj)) {
            return [];
        }
        var props = [];
        for (var prop in obj) {
            if (prop) {
                props.push(prop);
            }
        }
        return props;
    }
    Util.keys = keys;
    function clone(obj) {
        var a = [];
        for (var prop in obj) {
            if (prop) {
                a[prop] = obj[prop];
            }
        }
        return a;
    }
    Util.clone = clone;
})(Util || (Util = {}));


/***/ }),

/***/ "../src/core/util/keycodes.enum.ts":
/*!*****************************************!*\
  !*** ../src/core/util/keycodes.enum.ts ***!
  \*****************************************/
/*! exports provided: KeyCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyCode", function() { return KeyCode; });
var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["BACKSPACE"] = 8] = "BACKSPACE";
    KeyCode[KeyCode["TAB"] = 9] = "TAB";
    KeyCode[KeyCode["ENTER"] = 13] = "ENTER";
    KeyCode[KeyCode["SHIFT"] = 16] = "SHIFT";
    KeyCode[KeyCode["CTRL"] = 17] = "CTRL";
    KeyCode[KeyCode["ALT"] = 18] = "ALT";
    KeyCode[KeyCode["PAUSEBREAK"] = 19] = "PAUSEBREAK";
    KeyCode[KeyCode["CAPSLOCK"] = 20] = "CAPSLOCK";
    KeyCode[KeyCode["ESCAPE"] = 27] = "ESCAPE";
    KeyCode[KeyCode["SPACE"] = 32] = "SPACE";
    KeyCode[KeyCode["PAGEUP"] = 33] = "PAGEUP";
    KeyCode[KeyCode["PAGEDOWN"] = 34] = "PAGEDOWN";
    KeyCode[KeyCode["END"] = 35] = "END";
    KeyCode[KeyCode["HOME"] = 36] = "HOME";
    KeyCode[KeyCode["LEFTARROW"] = 37] = "LEFTARROW";
    KeyCode[KeyCode["UPARROW"] = 38] = "UPARROW";
    KeyCode[KeyCode["RIGHTARROW"] = 39] = "RIGHTARROW";
    KeyCode[KeyCode["DOWNARROW"] = 40] = "DOWNARROW";
    KeyCode[KeyCode["INSERT"] = 45] = "INSERT";
    KeyCode[KeyCode["DELETE"] = 46] = "DELETE";
    KeyCode[KeyCode["ZERO"] = 48] = "ZERO";
    KeyCode[KeyCode["CLOSEDPAREN"] = 48] = "CLOSEDPAREN";
    KeyCode[KeyCode["ONE"] = 49] = "ONE";
    KeyCode[KeyCode["EXCLAMATIONMARK"] = 49] = "EXCLAMATIONMARK";
    KeyCode[KeyCode["TWO"] = 50] = "TWO";
    KeyCode[KeyCode["ATSIGN"] = 50] = "ATSIGN";
    KeyCode[KeyCode["THREE"] = 51] = "THREE";
    KeyCode[KeyCode["POUNDSIGN"] = 51] = "POUNDSIGN";
    KeyCode[KeyCode["HASH"] = 51] = "HASH";
    KeyCode[KeyCode["FOUR"] = 52] = "FOUR";
    KeyCode[KeyCode["DOLLARSIGN"] = 52] = "DOLLARSIGN";
    KeyCode[KeyCode["FIVE"] = 53] = "FIVE";
    KeyCode[KeyCode["PERCENTSIGN"] = 53] = "PERCENTSIGN";
    KeyCode[KeyCode["SIX"] = 54] = "SIX";
    KeyCode[KeyCode["CARET"] = 54] = "CARET";
    KeyCode[KeyCode["HAT"] = 54] = "HAT";
    KeyCode[KeyCode["SEVEN"] = 55] = "SEVEN";
    KeyCode[KeyCode["AMPERSAND"] = 55] = "AMPERSAND";
    KeyCode[KeyCode["EIGHT"] = 56] = "EIGHT";
    KeyCode[KeyCode["STAR"] = 56] = "STAR";
    KeyCode[KeyCode["ASTERIK"] = 56] = "ASTERIK";
    KeyCode[KeyCode["NINE"] = 57] = "NINE";
    KeyCode[KeyCode["OPENPAREN"] = 57] = "OPENPAREN";
    KeyCode[KeyCode["A"] = 65] = "A";
    KeyCode[KeyCode["B"] = 66] = "B";
    KeyCode[KeyCode["C"] = 67] = "C";
    KeyCode[KeyCode["D"] = 68] = "D";
    KeyCode[KeyCode["E"] = 69] = "E";
    KeyCode[KeyCode["F"] = 70] = "F";
    KeyCode[KeyCode["G"] = 71] = "G";
    KeyCode[KeyCode["H"] = 72] = "H";
    KeyCode[KeyCode["I"] = 73] = "I";
    KeyCode[KeyCode["J"] = 74] = "J";
    KeyCode[KeyCode["K"] = 75] = "K";
    KeyCode[KeyCode["L"] = 76] = "L";
    KeyCode[KeyCode["M"] = 77] = "M";
    KeyCode[KeyCode["N"] = 78] = "N";
    KeyCode[KeyCode["O"] = 79] = "O";
    KeyCode[KeyCode["P"] = 80] = "P";
    KeyCode[KeyCode["Q"] = 81] = "Q";
    KeyCode[KeyCode["R"] = 82] = "R";
    KeyCode[KeyCode["S"] = 83] = "S";
    KeyCode[KeyCode["T"] = 84] = "T";
    KeyCode[KeyCode["U"] = 85] = "U";
    KeyCode[KeyCode["V"] = 86] = "V";
    KeyCode[KeyCode["W"] = 87] = "W";
    KeyCode[KeyCode["X"] = 88] = "X";
    KeyCode[KeyCode["Y"] = 89] = "Y";
    KeyCode[KeyCode["Z"] = 90] = "Z";
    KeyCode[KeyCode["LEFTWINDOWKEY"] = 91] = "LEFTWINDOWKEY";
    KeyCode[KeyCode["RIGHTWINDOWKEY"] = 92] = "RIGHTWINDOWKEY";
    KeyCode[KeyCode["SELECTKEY"] = 93] = "SELECTKEY";
    KeyCode[KeyCode["NUMPAD0"] = 96] = "NUMPAD0";
    KeyCode[KeyCode["NUMPAD1"] = 97] = "NUMPAD1";
    KeyCode[KeyCode["NUMPAD2"] = 98] = "NUMPAD2";
    KeyCode[KeyCode["NUMPAD3"] = 99] = "NUMPAD3";
    KeyCode[KeyCode["NUMPAD4"] = 100] = "NUMPAD4";
    KeyCode[KeyCode["NUMPAD5"] = 101] = "NUMPAD5";
    KeyCode[KeyCode["NUMPAD6"] = 102] = "NUMPAD6";
    KeyCode[KeyCode["NUMPAD7"] = 103] = "NUMPAD7";
    KeyCode[KeyCode["NUMPAD8"] = 104] = "NUMPAD8";
    KeyCode[KeyCode["NUMPAD9"] = 105] = "NUMPAD9";
    KeyCode[KeyCode["MULTIPLY"] = 106] = "MULTIPLY";
    KeyCode[KeyCode["ADD"] = 107] = "ADD";
    KeyCode[KeyCode["SUBTRACT"] = 109] = "SUBTRACT";
    KeyCode[KeyCode["DECIMALPOINT"] = 110] = "DECIMALPOINT";
    KeyCode[KeyCode["DIVIDE"] = 111] = "DIVIDE";
    KeyCode[KeyCode["F1"] = 112] = "F1";
    KeyCode[KeyCode["F2"] = 113] = "F2";
    KeyCode[KeyCode["F3"] = 114] = "F3";
    KeyCode[KeyCode["F4"] = 115] = "F4";
    KeyCode[KeyCode["F5"] = 116] = "F5";
    KeyCode[KeyCode["F6"] = 117] = "F6";
    KeyCode[KeyCode["F7"] = 118] = "F7";
    KeyCode[KeyCode["F8"] = 119] = "F8";
    KeyCode[KeyCode["F9"] = 120] = "F9";
    KeyCode[KeyCode["F10"] = 121] = "F10";
    KeyCode[KeyCode["F11"] = 122] = "F11";
    KeyCode[KeyCode["F12"] = 123] = "F12";
    KeyCode[KeyCode["NUMLOCK"] = 144] = "NUMLOCK";
    KeyCode[KeyCode["SCROLLLOCK"] = 145] = "SCROLLLOCK";
    KeyCode[KeyCode["SEMICOLON"] = 186] = "SEMICOLON";
    KeyCode[KeyCode["EQUALS"] = 187] = "EQUALS";
    KeyCode[KeyCode["COMMA"] = 188] = "COMMA";
    KeyCode[KeyCode["DASH"] = 189] = "DASH";
    KeyCode[KeyCode["PERIOD"] = 190] = "PERIOD";
    KeyCode[KeyCode["UNDERSCORE"] = 189] = "UNDERSCORE";
    KeyCode[KeyCode["PLUSSIGN"] = 187] = "PLUSSIGN";
    KeyCode[KeyCode["FORWARDSLASH"] = 191] = "FORWARDSLASH";
    KeyCode[KeyCode["TILDE"] = 192] = "TILDE";
    KeyCode[KeyCode["GRAVEACCENT"] = 192] = "GRAVEACCENT";
    KeyCode[KeyCode["OPENBRACKET"] = 219] = "OPENBRACKET";
    KeyCode[KeyCode["CLOSEDBRACKET"] = 221] = "CLOSEDBRACKET";
    KeyCode[KeyCode["QUOTE"] = 222] = "QUOTE";
})(KeyCode || (KeyCode = {}));


/***/ }),

/***/ "../src/decorators/component.ts":
/*!**************************************!*\
  !*** ../src/decorators/component.ts ***!
  \**************************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ */ "../src/index.ts");

var Component = function (componentConfig) {
    return function (target) {
        var config = {
            template: componentConfig.template,
            style: componentConfig.style,
            constants: componentConfig.constants,
            functions: componentConfig.functions,
            bindings: componentConfig.bindings,
            controllerAs: componentConfig.controllerAs,
            controller: target,
        };
        ___WEBPACK_IMPORTED_MODULE_0__["Capivara"].component(componentConfig.tag, config);
    };
};


/***/ }),

/***/ "../src/decorators/controller.ts":
/*!***************************************!*\
  !*** ../src/decorators/controller.ts ***!
  \***************************************/
/*! exports provided: Controller */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
var Controller = /** @class */ (function () {
    function Controller($scope, $element) {
        this.$scope = $scope;
        this.$element = $element;
    }
    return Controller;
}());



/***/ }),

/***/ "../src/decorators/index.ts":
/*!**********************************!*\
  !*** ../src/decorators/index.ts ***!
  \**********************************/
/*! exports provided: Component, Controller */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "../src/decorators/component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return _component__WEBPACK_IMPORTED_MODULE_0__["Component"]; });

/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller */ "../src/decorators/controller.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return _controller__WEBPACK_IMPORTED_MODULE_1__["Controller"]; });





/***/ }),

/***/ "../src/index.ts":
/*!***********************!*\
  !*** ../src/index.ts ***!
  \***********************/
/*! exports provided: Capivara, default, Component, Controller */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Capivara", function() { return Capivara; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ "../src/core/index.ts");
/* harmony import */ var _core_capivara_instance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/capivara.instance */ "../src/core/capivara.instance.ts");
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./decorators */ "../src/decorators/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return _decorators__WEBPACK_IMPORTED_MODULE_2__["Component"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return _decorators__WEBPACK_IMPORTED_MODULE_2__["Controller"]; });




var Capivara = (function initCapivara(ctx, aliasName) {
    if (!ctx[aliasName]) {
        ctx[aliasName] = new _core_capivara_instance__WEBPACK_IMPORTED_MODULE_1__["CapivaraInstance"]();
        ctx[aliasName].core = {
            Eval: _core__WEBPACK_IMPORTED_MODULE_0__["Eval"],
            Component: _decorators__WEBPACK_IMPORTED_MODULE_2__["Component"],
            Controller: _decorators__WEBPACK_IMPORTED_MODULE_2__["Controller"],
            Capivara: Capivara,
        };
    }
    else {
        console.warn("Gee! CapivaraJS tried to load more than once.");
    }
    return ctx[aliasName];
})(window, 'capivara');


/* harmony default export */ __webpack_exports__["default"] = (Capivara);


/***/ }),

/***/ "../src/map/directive/cp-attr.ts":
/*!***************************************!*\
  !*** ../src/map/directive/cp-attr.ts ***!
  \***************************************/
/*! exports provided: CPAttr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPAttr", function() { return CPAttr; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "../src/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "../src/constants.ts");


var CPAttr = /** @class */ (function () {
    function CPAttr(_element, _map) {
        var _this = this;
        this.attributes = [];
        this.element = _element;
        this.map = _map;
        Array.from(this.element.attributes).forEach(function (attribute) {
            if (attribute.nodeName && attribute.nodeName.startsWith(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].ATTR_ATTRIBUTE_NAME)) {
                if (!attribute.value) {
                    throw new Error("syntax error " + _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].ATTR_ATTRIBUTE_NAME + " expected arguments");
                }
                _this.attributes.push(attribute.name);
            }
        });
    }
    CPAttr.prototype.create = function () {
        this.init();
    };
    CPAttr.prototype.init = function () {
        var _this = this;
        this.attributes.forEach(function (attribute) {
            var attributeValue = _this.element.getAttribute(attribute);
            var attr = attribute.replace(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].ATTR_ATTRIBUTE_NAME + '.', '');
            var value = _common__WEBPACK_IMPORTED_MODULE_0__["Common"].evalInMultiContext(_this.element, attributeValue);
            if (value === undefined || value === null) {
                _this.element.setAttribute(attr, '');
            }
            else {
                _this.element.setAttribute(attr, value);
            }
        });
    };
    return CPAttr;
}());



/***/ }),

/***/ "../src/map/directive/cp-blur.ts":
/*!***************************************!*\
  !*** ../src/map/directive/cp-blur.ts ***!
  \***************************************/
/*! exports provided: CPBlur */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPBlur", function() { return CPBlur; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "../src/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "../src/constants.ts");


var CPBlur = /** @class */ (function () {
    function CPBlur(_element, _map) {
        this.element = _element;
        this.map = _map;
        this.element['cpBlur'] = this;
        this.attribute = _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getAttributeCpBlur(this.element);
        if (this.attribute === undefined) {
            throw new Error("syntax error " + _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].BLUR_ATTRIBUTE_NAME + " expected arguments");
        }
    }
    CPBlur.prototype.create = function () {
        this.init();
    };
    CPBlur.prototype.onBlur = function (evt) {
        var _a;
        _common__WEBPACK_IMPORTED_MODULE_0__["Common"].executeFunctionCallback(evt.target['cpBlur'].element, evt.target['cpBlur'].attribute, (_a = {}, _a[_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].EVENT_ATTRIBUTE_NAME] = evt, _a));
    };
    CPBlur.prototype.init = function () {
        // Remove old event
        this.element.removeEventListener('blur', this.onBlur);
        // Add new event
        this.element.addEventListener('blur', this.onBlur);
    };
    return CPBlur;
}());



/***/ }),

/***/ "../src/map/directive/cp-change.ts":
/*!*****************************************!*\
  !*** ../src/map/directive/cp-change.ts ***!
  \*****************************************/
/*! exports provided: CPChange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPChange", function() { return CPChange; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "../src/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "../src/constants.ts");


var CPChange = /** @class */ (function () {
    function CPChange(_element, _map) {
        this.element = _element;
        this.map = _map;
        this.attribute = this.element.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].CHANGE_ATTRIBUTE_NAME);
        if (!this.attribute) {
            throw new Error("syntax error " + _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].CHANGE_ATTRIBUTE_NAME + " expected arguments");
        }
        if (!this.element.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].MODEL_ATTRIBUTE_NAME)) {
            throw new Error("syntax error " + _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].MODEL_ATTRIBUTE_NAME + " expected arguments");
        }
    }
    CPChange.prototype.create = function () {
        this.init();
    };
    CPChange.prototype.onModelChange = function (newValue, oldValue) {
        _common__WEBPACK_IMPORTED_MODULE_0__["Common"].executeFunctionCallback(this.element, this.attribute, { $newValue: newValue, $oldValue: oldValue });
    };
    CPChange.prototype.init = function () {
        var modelAttribute = this.element.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].MODEL_ATTRIBUTE_NAME).replace(_common__WEBPACK_IMPORTED_MODULE_0__["Common"].getScope(this.element).scope['__$controllerAs__'] + '.', '');
        _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getScope(this.element).$unwatch(modelAttribute, this.onModelChange);
        _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getScope(this.element).$watch(modelAttribute, this.onModelChange, this);
    };
    return CPChange;
}());



/***/ }),

/***/ "../src/map/directive/cp-class.ts":
/*!****************************************!*\
  !*** ../src/map/directive/cp-class.ts ***!
  \****************************************/
/*! exports provided: CPClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPClass", function() { return CPClass; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "../src/common.ts");

var CPClass = /** @class */ (function () {
    function CPClass(_element, _map) {
        this.element = _element;
        this.element['cpClass'] = this;
        this.map = _map;
        this.attribute = _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getAttributeCpClass(this.element);
        this.elementComment = document.createComment('cpClass ' + this.attribute);
        this.elmScope = _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getScope(_element);
    }
    CPClass.prototype.create = function () {
        this.init();
    };
    CPClass.prototype.setClassByObject = function (classObj) {
        var _this = this;
        if (classObj && window['capivara'].isObject(classObj)) {
            Object.keys(classObj).forEach(function (key) {
                if (classObj[key]) {
                    _this.addClass(key.replace(/ /g, ''));
                }
                else {
                    _this.removeClass(key.replace(/ /g, ''));
                }
            });
        }
    };
    CPClass.prototype.init = function () {
        var _this = this;
        try {
            this.attribute.split(',')
                .map(function (attr) {
                return {
                    key: attr.substring(0, attr.indexOf(':')).replace(/'/g, "").replace(/"/, '').replace(/{/g, '').replace(/}/, ''),
                    value: _common__WEBPACK_IMPORTED_MODULE_0__["Common"].evalInMultiContext(_this.element, attr.substring(attr.indexOf(':') + 1, attr.length).replace(/{/g, '').replace(/}/, '')),
                };
            })
                .forEach(function (cpClass) {
                if (window['capivara'].isObject(cpClass.value)) {
                    _this.setClassByObject(cpClass.value);
                }
                else {
                    if (cpClass.value) {
                        _this.addClass(cpClass.key.replace(/ /g, ''));
                    }
                    else {
                        _this.removeClass(cpClass.key.replace(/ /g, ''));
                    }
                }
            });
        }
        catch (e) {
        }
    };
    CPClass.prototype.removeClass = function (className) {
        if (this.element.classList && this.element.classList.contains(className)) {
            this.element.classList.remove(className);
        }
        else if (!this.element.classList && this.element.className.indexOf(className) !== -1) {
            this.element.className = this.element.className.replace(className, '');
        }
    };
    CPClass.prototype.addClass = function (className) {
        if (this.element.classList && !this.element.classList.contains(className)) {
            this.element.classList.add(className);
        }
        else if (!this.element.classList && this.element.className.indexOf(className) === -1) {
            this.element.className += " " + className;
        }
    };
    return CPClass;
}());



/***/ }),

/***/ "../src/map/directive/cp-click.ts":
/*!****************************************!*\
  !*** ../src/map/directive/cp-click.ts ***!
  \****************************************/
/*! exports provided: CPClick */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPClick", function() { return CPClick; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "../src/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "../src/constants.ts");


var CPClick = /** @class */ (function () {
    function CPClick(_element, _map) {
        this.element = _element;
        this.map = _map;
        this.attribute = this.element.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].CLICK_ATTRIBUTE_NAME);
        this.eventName = 'click';
        if (!this.attribute) {
            this.attribute = this.element.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].DBLCLICK_ATTRIBUTE_NAME);
            this.eventName = 'dblclick';
        }
        if (!this.attribute) {
            throw new Error("syntax error cp-" + this.eventName + " expected arguments");
        }
    }
    CPClick.prototype.create = function () {
        this.init();
    };
    CPClick.prototype.getIndexRow = function (element) {
        var index = _common__WEBPACK_IMPORTED_MODULE_0__["Common"].get(_common__WEBPACK_IMPORTED_MODULE_0__["Common"].getScope(element).scope, _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].REPEAT_INDEX_NAME);
        if (index === undefined && element.parentNode) {
            return this.getIndexRow(element.parentNode);
        }
        return index;
    };
    CPClick.prototype.init = function () {
        var _this = this;
        var onClick = function (evt) {
            var _a;
            _this.attribute = _this.attribute.trim();
            _common__WEBPACK_IMPORTED_MODULE_0__["Common"].executeFunctionCallback(_this.element, _this.attribute, (_a = {}, _a[_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].EVENT_ATTRIBUTE_NAME] = evt, _a));
        };
        // Remove old event
        this.element.removeEventListener(this.eventName, onClick);
        // Add new event
        this.element.addEventListener(this.eventName, onClick);
    };
    return CPClick;
}());



/***/ }),

/***/ "../src/map/directive/cp-disabled.ts":
/*!*******************************************!*\
  !*** ../src/map/directive/cp-disabled.ts ***!
  \*******************************************/
/*! exports provided: CPDisabled */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPDisabled", function() { return CPDisabled; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "../src/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "../src/constants.ts");


var CPDisabled = /** @class */ (function () {
    function CPDisabled(_element, _map) {
        this.element = _element;
        this.attribute = _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getAttributeCpDisable(this.element);
        if (!this.attribute) {
            throw new Error("syntax error " + _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].DISABLE_ATTRIBUTE_NAME + " expected arguments");
        }
    }
    CPDisabled.prototype.create = function () {
        this.init();
    };
    CPDisabled.prototype.init = function () {
        try {
            JSON.parse(_common__WEBPACK_IMPORTED_MODULE_0__["Common"].isValidCondition(this.element, _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getAttributeCpDisable(this.element))) ? this.elementDisabled() : this.elementEnabled();
        }
        catch (ex) {
            this.elementEnabled();
        }
    };
    CPDisabled.prototype.elementDisabled = function () {
        this.element.setAttribute('disabled', true);
    };
    CPDisabled.prototype.elementEnabled = function () {
        this.element.removeAttribute('disabled');
    };
    return CPDisabled;
}());



/***/ }),

/***/ "../src/map/directive/cp-else-if.ts":
/*!******************************************!*\
  !*** ../src/map/directive/cp-else-if.ts ***!
  \******************************************/
/*! exports provided: CPElseIf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPElseIf", function() { return CPElseIf; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "../src/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "../src/constants.ts");


var CPElseIf = /** @class */ (function () {
    function CPElseIf(_element, _map) {
        this.element = _element;
        this.element['cpElseIf'] = this;
        this.attribute = _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getAttributeCpElseIf(this.element);
        if (!this.attribute) {
            throw new Error("syntax error " + _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].ELSE_IF_ATTRIBUTE_NAME + " expected arguments");
        }
        this.prevElement = _element.previousSibling;
        this.map = _map;
        this.elementComment = document.createComment('CPElseIf ' + this.attribute);
    }
    CPElseIf.prototype.create = function () {
        if (this.element.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].REPEAT_ATTRIBUTE_NAME)) {
            return;
        }
        this.integrationCpElse();
        this.parentCondition = _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getScope(this.element).parentCondition;
        if (!this.parentCondition) {
            throw new Error("syntax error " + _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].ELSE_IF_ATTRIBUTE_NAME + " used on element " +
                ("<" + this.element.nodeName.toLowerCase() + "> without corresponding " + _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].IF_ATTRIBUTE_NAME + "."));
        }
        this.init();
    };
    CPElseIf.prototype.integrationCpElse = function () {
        var nextElement = this.element.nextElementSibling;
        if (nextElement && (nextElement.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].ELSE_ATTRIBUTE_NAME) || nextElement.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].ELSE_IF_ATTRIBUTE_NAME))) {
            _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getScope(nextElement).parentCondition = this;
        }
    };
    CPElseIf.prototype.init = function () {
        if (!this.element || this.element.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].REPEAT_ATTRIBUTE_NAME)) {
            return;
        }
        try {
            if (!_common__WEBPACK_IMPORTED_MODULE_0__["Common"].isValidCondition(this.parentCondition.element, _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getAttributeCpIf(this.parentCondition.element))) {
                _common__WEBPACK_IMPORTED_MODULE_0__["Common"].createElement(this.element, this.elementComment);
                if (!_common__WEBPACK_IMPORTED_MODULE_0__["Common"].isValidCondition(this.element, this.attribute)) {
                    _common__WEBPACK_IMPORTED_MODULE_0__["Common"].destroyElement(this.element, this.elementComment);
                }
            }
            else {
                _common__WEBPACK_IMPORTED_MODULE_0__["Common"].destroyElement(this.element, this.elementComment);
            }
        }
        catch (ex) {
            _common__WEBPACK_IMPORTED_MODULE_0__["Common"].destroyElement(this.element, this.elementComment);
        }
    };
    return CPElseIf;
}());



/***/ }),

/***/ "../src/map/directive/cp-else.ts":
/*!***************************************!*\
  !*** ../src/map/directive/cp-else.ts ***!
  \***************************************/
/*! exports provided: CPElse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPElse", function() { return CPElse; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "../src/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "../src/constants.ts");


var CPElse = /** @class */ (function () {
    function CPElse(_element, _map) {
        this.element = _element;
        if (_common__WEBPACK_IMPORTED_MODULE_0__["Common"].getAttributeCpElse(this.element)) {
            throw new Error(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].ELSE_ATTRIBUTE_NAME + " don't expect arguments");
        }
        this.prevElement = _element.previousSibling;
        this.map = _map;
        this.elementComment = document.createComment('cpElse');
    }
    CPElse.prototype.create = function () {
        if (this.element.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].REPEAT_ATTRIBUTE_NAME)) {
            return;
        }
        this.parentCondition = _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getScope(this.element).parentCondition;
        if (!this.parentCondition) {
            throw new Error("syntax error " + _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].ELSE_ATTRIBUTE_NAME + " used on element " +
                ("<" + this.element.nodeName.toLowerCase() + "> without corresponding " + _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].IF_ATTRIBUTE_NAME + "."));
        }
        this.init();
    };
    CPElse.prototype.hasValidCondition = function (_element, conditions) {
        if (_element && ((_element.hasAttribute && _element.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].IF_ATTRIBUTE_NAME)) || (_element.nodeType === 8 && _element.data.indexOf('cpIf') !== -1))) {
            if (_element['$$cpDestroyed']) {
                return false;
            }
            return !((_element.nodeType === 8 && _element.data.indexOf('cpIf') !== -1) && conditions.length === 0);
        }
        if (_element && _element.previousSibling) {
            if (_element.hasAttribute && _element.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].ELSE_IF_ATTRIBUTE_NAME)) {
                conditions.push(_element);
            }
            return this.hasValidCondition(_element.previousSibling, conditions);
        }
    };
    CPElse.prototype.init = function () {
        if (!this.element || this.element.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].REPEAT_ATTRIBUTE_NAME)) {
            return;
        }
        try {
            _common__WEBPACK_IMPORTED_MODULE_0__["Common"].createElement(this.element, this.elementComment);
            if (this.hasValidCondition(this.element, [])) {
                _common__WEBPACK_IMPORTED_MODULE_0__["Common"].destroyElement(this.element, this.elementComment);
            }
        }
        catch (ex) {
            _common__WEBPACK_IMPORTED_MODULE_0__["Common"].destroyElement(this.element, this.elementComment);
        }
    };
    return CPElse;
}());



/***/ }),

/***/ "../src/map/directive/cp-focus.ts":
/*!****************************************!*\
  !*** ../src/map/directive/cp-focus.ts ***!
  \****************************************/
/*! exports provided: CPFocus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPFocus", function() { return CPFocus; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "../src/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "../src/constants.ts");


var CPFocus = /** @class */ (function () {
    function CPFocus(_element, _map) {
        this.element = _element;
        this.map = _map;
        this.element['cpFocus'] = this;
        this.attribute = _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getAttributeCpFocus(this.element);
        if (this.attribute === undefined) {
            throw new Error("syntax error " + _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].FOCUS_ATTRIBUTE_NAME + " expected arguments");
        }
    }
    CPFocus.prototype.create = function () {
        this.init();
    };
    CPFocus.prototype.onFocus = function (evt) {
        var _a;
        _common__WEBPACK_IMPORTED_MODULE_0__["Common"].executeFunctionCallback(evt.target['cpFocus'].element, evt.target['cpFocus'].attribute, (_a = {}, _a[_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].EVENT_ATTRIBUTE_NAME] = evt, _a));
    };
    CPFocus.prototype.init = function () {
        // Remove old event
        this.element.removeEventListener('focus', this.onFocus);
        // Add new event
        this.element.addEventListener('focus', this.onFocus);
    };
    return CPFocus;
}());



/***/ }),

/***/ "../src/map/directive/cp-hide.ts":
/*!***************************************!*\
  !*** ../src/map/directive/cp-hide.ts ***!
  \***************************************/
/*! exports provided: CPHide */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPHide", function() { return CPHide; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "../src/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "../src/constants.ts");


var CPHide = /** @class */ (function () {
    function CPHide(_element, _map) {
        this.element = _element;
        this.initialDisplay = this.element.style.display || '';
        this.map = _map;
        this.attribute = _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getAttributeCpHide(this.element);
        if (!this.attribute) {
            throw new Error("syntax error " + _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].HIDE_ATTRIBUTE_NAME + " expected arguments");
        }
    }
    CPHide.prototype.create = function () {
        this.init();
    };
    CPHide.prototype.init = function () {
        try {
            _common__WEBPACK_IMPORTED_MODULE_0__["Common"].isValidCondition(this.element, _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getAttributeCpHide(this.element)) ? this.hide() : this.show();
        }
        catch (ex) {
            this.hide();
        }
    };
    CPHide.prototype.hide = function () {
        this.element.style.display = 'none';
    };
    CPHide.prototype.show = function () {
        this.element.style.display = this.initialDisplay;
    };
    return CPHide;
}());



/***/ }),

/***/ "../src/map/directive/cp-if.ts":
/*!*************************************!*\
  !*** ../src/map/directive/cp-if.ts ***!
  \*************************************/
/*! exports provided: CPIf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPIf", function() { return CPIf; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "../src/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "../src/constants.ts");


var CPIf = /** @class */ (function () {
    function CPIf(_element, _map) {
        this.element = _element;
        this.element['cpIf'] = this;
        this.map = _map;
        this.attribute = _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getAttributeCpIf(this.element);
        if (!this.attribute) {
            throw new Error("syntax error " + _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].IF_ATTRIBUTE_NAME + " expected arguments");
        }
        this.elementComment = document.createComment('cpIf ' + this.attribute);
    }
    CPIf.prototype.create = function () {
        if (this.element.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].REPEAT_ATTRIBUTE_NAME)) {
            return;
        }
        this.integrationCpElse();
        this.init();
    };
    CPIf.prototype.integrationCpElse = function () {
        var nextElement = this.element.nextElementSibling;
        if (nextElement && (nextElement.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].ELSE_ATTRIBUTE_NAME) || nextElement.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].ELSE_IF_ATTRIBUTE_NAME))) {
            _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getScope(nextElement).parentCondition = this;
        }
    };
    CPIf.prototype.init = function () {
        if (!this.element || this.element.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].REPEAT_ATTRIBUTE_NAME)) {
            return;
        }
        try {
            if (!_common__WEBPACK_IMPORTED_MODULE_0__["Common"].isValidCondition(this.element, _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getAttributeCpIf(this.element))) {
                _common__WEBPACK_IMPORTED_MODULE_0__["Common"].destroyElement(this.element, this.elementComment);
            }
            else {
                _common__WEBPACK_IMPORTED_MODULE_0__["Common"].createElement(this.element, this.elementComment);
            }
        }
        catch (ex) {
            _common__WEBPACK_IMPORTED_MODULE_0__["Common"].destroyElement(this.element, this.elementComment);
        }
    };
    return CPIf;
}());



/***/ }),

/***/ "../src/map/directive/cp-init.ts":
/*!***************************************!*\
  !*** ../src/map/directive/cp-init.ts ***!
  \***************************************/
/*! exports provided: CPInit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPInit", function() { return CPInit; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "../src/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "../src/constants.ts");


var CPInit = /** @class */ (function () {
    function CPInit(_element, _map) {
        this.element = _element;
        this.map = _map;
        this.attribute = _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getAttributeCpInit(this.element);
        if (!this.attribute) {
            throw new Error("syntax error " + _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].INIT_ATTRIBUTE_NAME + " expected arguments");
        }
    }
    CPInit.prototype.create = function () {
        this.init();
    };
    CPInit.prototype.init = function () {
        this.attribute = this.attribute.trim();
        _common__WEBPACK_IMPORTED_MODULE_0__["Common"].evalInMultiContext(this.element, this.attribute);
    };
    return CPInit;
}());



/***/ }),

/***/ "../src/map/directive/cp-key.ts":
/*!**************************************!*\
  !*** ../src/map/directive/cp-key.ts ***!
  \**************************************/
/*! exports provided: CPKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPKey", function() { return CPKey; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "../src/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "../src/constants.ts");
/* harmony import */ var _core_util_keycodes_enum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/util/keycodes.enum */ "../src/core/util/keycodes.enum.ts");



var CPKey = /** @class */ (function () {
    function CPKey(_element, _map) {
        var _this = this;
        this.element = _element;
        this.attributes = [];
        this.map = _map;
        Array.from(this.element.attributes).forEach(function (attribute) {
            if (attribute.nodeName && attribute.nodeName.startsWith(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].KEY_ATTRIBUTE_NAME)) {
                if (!attribute.value) {
                    throw new Error("syntax error " + _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].KEY_ATTRIBUTE_NAME + " expected arguments");
                }
                _this.element[attribute.name] = _this;
                _this.attributes.push(attribute.name);
            }
        });
    }
    CPKey.prototype.create = function () {
        this.init();
    };
    CPKey.prototype.onKeyPress = function (evt) {
        var _a, _b;
        var directiveName = 'cp-' + evt.type;
        if (evt.target && evt.target.hasAttributeStartingWith(directiveName)) {
            var attribute = evt.target.getAttributeStartingWith(directiveName)[0].name;
            var indexSeparator = attribute.lastIndexOf('.');
            if (indexSeparator === -1) {
                _common__WEBPACK_IMPORTED_MODULE_0__["Common"].executeFunctionCallback(evt.target[attribute].element, evt.target[attribute].element.getAttribute(attribute), (_a = {}, _a[_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].EVENT_ATTRIBUTE_NAME] = evt, _a));
            }
            else {
                var watchKeyName = attribute.substring(attribute.lastIndexOf('.') + 1);
                var watchKey = !isNaN(watchKeyName) ? Number(watchKeyName) : _core_util_keycodes_enum__WEBPACK_IMPORTED_MODULE_2__["KeyCode"][(watchKeyName || '').toUpperCase()];
                if (watchKey !== undefined && evt.keyCode === watchKey) {
                    _common__WEBPACK_IMPORTED_MODULE_0__["Common"].executeFunctionCallback(evt.target[attribute].element, evt.target[attribute].element.getAttribute(attribute), (_b = {}, _b[_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].EVENT_ATTRIBUTE_NAME] = evt, _b));
                }
            }
        }
    };
    CPKey.prototype.init = function () {
        var _this = this;
        this.attributes.forEach(function (attribute) {
            var indexSeparator = attribute.lastIndexOf('.');
            var keyType = attribute.substring(0, (indexSeparator === -1 ? attribute.length : indexSeparator)).replace(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].KEY_ATTRIBUTE_NAME, '');
            // Remove old event
            _this.element.removeEventListener("key" + keyType, _this.onKeyPress);
            // Add new event
            _this.element.addEventListener("key" + keyType, _this.onKeyPress);
        });
    };
    return CPKey;
}());



/***/ }),

/***/ "../src/map/directive/cp-model.ts":
/*!****************************************!*\
  !*** ../src/map/directive/cp-model.ts ***!
  \****************************************/
/*! exports provided: CPModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPModel", function() { return CPModel; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "../src/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "../src/constants.ts");


var CPModel = /** @class */ (function () {
    function CPModel(_element, _map) {
        this.element = _element;
        this.element['cpModel'] = this;
        this.map = _map;
        this.attribute = this.element.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].MODEL_ATTRIBUTE_NAME);
        if (!this.attribute) {
            throw new Error("syntax error " + _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].MODEL_ATTRIBUTE_NAME + " expected arguments");
        }
    }
    CPModel.prototype.create = function (_element) {
        this.init();
        this.applyModelInValue();
    };
    CPModel.prototype.init = function () {
        this.map.addCpModels(this);
        if (!_common__WEBPACK_IMPORTED_MODULE_0__["Common"].isComponent(this.element)) {
            this.element.removeEventListener('input', this.applyValueInModel);
            this.element.addEventListener('input', this.applyValueInModel);
        }
    };
    CPModel.prototype.applyModelInValue = function () {
        var value = _common__WEBPACK_IMPORTED_MODULE_0__["Common"].get(_common__WEBPACK_IMPORTED_MODULE_0__["Common"].getScope(this.element).scope, this.attribute);
        switch (this.element.type) {
            case 'date':
                if (this.element.valueAsDate && this.element.valueAsDate.getTime() !== value.getTime()) {
                    this.element.valueAsDate = value || null;
                }
                break;
            case 'number':
                if (value !== this.element.valueAsNumber && value !== undefined) {
                    this.element.valueAsNumber = value || null;
                }
                break;
            default:
                if (this.element.value !== value) {
                    this.element.value = value || null;
                }
        }
    };
    CPModel.prototype.applyValueInModel = function (evt) {
        var self = (evt ? (evt.target || evt.srcElement) : this.element)['cpModel'];
        switch (self.element.type) {
            case 'date':
                _common__WEBPACK_IMPORTED_MODULE_0__["Common"].set(_common__WEBPACK_IMPORTED_MODULE_0__["Common"].getScope(self.element).scope, self.attribute, self.element.valueAsDate);
                break;
            case 'number':
                _common__WEBPACK_IMPORTED_MODULE_0__["Common"].set(_common__WEBPACK_IMPORTED_MODULE_0__["Common"].getScope(self.element).scope, self.attribute, isNaN(self.element.valueAsNumber) ? undefined : self.element.valueAsNumber);
                break;
            default:
                _common__WEBPACK_IMPORTED_MODULE_0__["Common"].set(_common__WEBPACK_IMPORTED_MODULE_0__["Common"].getScope(self.element).scope, self.attribute, self.element.value);
        }
    };
    return CPModel;
}());



/***/ }),

/***/ "../src/map/directive/cp-mouse.ts":
/*!****************************************!*\
  !*** ../src/map/directive/cp-mouse.ts ***!
  \****************************************/
/*! exports provided: CPMouse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPMouse", function() { return CPMouse; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "../src/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "../src/constants.ts");


var CPMouse = /** @class */ (function () {
    function CPMouse(_element, _map) {
        var _this = this;
        this.element = _element;
        this.attributes = [];
        this.map = _map;
        Array.from(this.element.attributes).forEach(function (attribute) {
            if (attribute.nodeName && attribute.nodeName.startsWith(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].MOUSE_ATTRIBUTE_NAME)) {
                if (!attribute.value) {
                    throw new Error("syntax error " + _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].MOUSE_ATTRIBUTE_NAME + " expected arguments");
                }
                _this.element[attribute.name] = _this;
                _this.attributes.push(attribute.name);
            }
        });
    }
    CPMouse.prototype.create = function () {
        this.init();
    };
    CPMouse.prototype.onMouse = function (evt) {
        var _a;
        var directiveName = 'cp-' + evt.type;
        if (evt.target && evt.target[directiveName]) {
            _common__WEBPACK_IMPORTED_MODULE_0__["Common"].executeFunctionCallback(evt.target[directiveName].element, evt.target[directiveName].element.getAttribute(directiveName), (_a = {}, _a[_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].EVENT_ATTRIBUTE_NAME] = evt, _a));
        }
    };
    CPMouse.prototype.init = function () {
        var _this = this;
        this.attributes.forEach(function (attribute) {
            var indexSeparator = attribute.lastIndexOf('.');
            var eventType = attribute.substring(0, (indexSeparator === -1 ? attribute.length : indexSeparator)).replace(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].MOUSE_ATTRIBUTE_NAME, '');
            // Remove old event
            _this.element.removeEventListener("mouse" + eventType, function (evt) { return _this.onMouse(evt); });
            // Add new event
            _this.element.addEventListener("mouse" + eventType, _this.onMouse);
        });
    };
    return CPMouse;
}());



/***/ }),

/***/ "../src/map/directive/cp-repeat.ts":
/*!*****************************************!*\
  !*** ../src/map/directive/cp-repeat.ts ***!
  \*****************************************/
/*! exports provided: CPRepeat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPRepeat", function() { return CPRepeat; });
/* harmony import */ var lodash_isequal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.isequal */ "../node_modules/lodash.isequal/index.js");
/* harmony import */ var lodash_isequal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isequal__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common */ "../src/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../constants */ "../src/constants.ts");
/* harmony import */ var _core_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/controller */ "../src/core/controller.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../index */ "../src/index.ts");





var CPRepeat = /** @class */ (function () {
    function CPRepeat(_element, _map) {
        this.lastArray = [];
        this.elms = [];
        this.element = _element.cloneNode(true);
        this.element.removeAttribute(_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].REPEAT_ATTRIBUTE_NAME);
        this.element.classList.add('binding-repeat');
        this.originalElement = _element;
        this.map = _map;
        this.attribute = _element.getAttribute(_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].REPEAT_ATTRIBUTE_NAME).replace(/\s+/g, ' ');
        this.regex = new RegExp('^[\\s*|\\S]+\\s+' + _constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].REPEAT_ATTRIBUTE_OPERATOR.replace(/ /g, '') + '\\s+\\S+\\s*', 'g');
        var matches = this.attribute.match(this.regex);
        if (!this.attribute || (!matches || matches.length === 0)) {
            throw new Error("syntax error invalid " + _constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].REPEAT_ATTRIBUTE_NAME + " expresion: " + this.attribute);
        }
        this.referenceNode = document.createComment('start repeat ' + this.attribute);
        if (this.originalElement.parentNode.replaceChild) {
            this.originalElement.parentNode.replaceChild(this.referenceNode, this.originalElement);
        }
    }
    CPRepeat.prototype.create = function () {
        var operator = " " + _constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].REPEAT_ATTRIBUTE_OPERATOR + " ";
        this.attributeAlias = this.attribute.substring(0, this.attribute.indexOf(operator)).replace(/ /g, '');
        this.attributeScope = this.attribute.substring(this.attribute.indexOf(operator) + operator.length, this.attribute.length).replace(/ /g, '');
        this.applyLoop();
    };
    CPRepeat.prototype.applyLoop = function () {
        var array = _common__WEBPACK_IMPORTED_MODULE_1__["Common"].evalInMultiContext(this.originalElement, this.attributeScope);
        if (array && !lodash_isequal__WEBPACK_IMPORTED_MODULE_0___default()(array, this.lastArray)) {
            this.lastArray = array.slice();
            this.removeChildes();
            this.loop(array, this.attributeAlias);
        }
    };
    CPRepeat.prototype.removeChildes = function () {
        var _this = this;
        this.elms.forEach(function (elm) { return _this.referenceNode.parentNode.removeChild(elm); });
    };
    CPRepeat.prototype.loop = function (array, attributeAlias) {
        var _this = this;
        this.elms = []; // reset elements render
        var lastAdded = this.referenceNode;
        array.forEach(function (row, index) {
            var elm = _this.element.cloneNode(true);
            new _core_controller__WEBPACK_IMPORTED_MODULE_3__["Controller"](elm, function () { });
            _common__WEBPACK_IMPORTED_MODULE_1__["Common"].appendAfter(lastAdded, elm);
            var elementContext = _common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(elm);
            elementContext.scope[attributeAlias] = row;
            elementContext.scope[_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].REPEAT_INDEX_NAME] = index;
            elementContext.$parent = _common__WEBPACK_IMPORTED_MODULE_1__["Common"].getScope(_this.referenceNode.parentNode);
            _this.createChildrenComponents(elm);
            lastAdded = elm;
            _this.elms.push(elm); // add element reference.
        });
        if (lastAdded) {
            _common__WEBPACK_IMPORTED_MODULE_1__["Common"].appendAfter(lastAdded, this.referenceNode.parentNode.appendChild(document.createComment('end repeat ' + this.attribute)));
        }
    };
    CPRepeat.prototype.createChildrenComponents = function (elm) {
        (Array.from(elm.children) || []).forEach(function (child) {
            _index__WEBPACK_IMPORTED_MODULE_4__["default"].constroyIfComponent(child);
        });
    };
    return CPRepeat;
}());



/***/ }),

/***/ "../src/map/directive/cp-show.ts":
/*!***************************************!*\
  !*** ../src/map/directive/cp-show.ts ***!
  \***************************************/
/*! exports provided: CPShow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPShow", function() { return CPShow; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "../src/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../constants */ "../src/constants.ts");


var CPShow = /** @class */ (function () {
    function CPShow(_element, _map) {
        this.element = _element;
        this.initialDisplay = this.element.style.display || '';
        this.map = _map;
        this.attribute = _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getAttributeCpShow(this.element);
        if (!this.attribute) {
            throw new Error("syntax error " + _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].SHOW_ATTRIBUTE_NAME + " expected arguments");
        }
    }
    CPShow.prototype.create = function () {
        this.init();
    };
    CPShow.prototype.init = function () {
        try {
            _common__WEBPACK_IMPORTED_MODULE_0__["Common"].isValidCondition(this.element, _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getAttributeCpShow(this.element)) ? this.show() : this.hide();
        }
        catch (ex) {
            this.hide();
        }
    };
    CPShow.prototype.hide = function () {
        this.element.style.display = 'none';
    };
    CPShow.prototype.show = function () {
        this.element.style.display = this.initialDisplay;
    };
    return CPShow;
}());



/***/ }),

/***/ "../src/map/directive/cp-style.ts":
/*!****************************************!*\
  !*** ../src/map/directive/cp-style.ts ***!
  \****************************************/
/*! exports provided: CPStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPStyle", function() { return CPStyle; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common */ "../src/common.ts");

var CPStyle = /** @class */ (function () {
    function CPStyle(_element, _map) {
        this.element = _element;
        this.element['cpStyle'] = this;
        this.map = _map;
        this.attribute = _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getAttributeCpStyle(this.element);
        this.elementComment = document.createComment('cpStyle ' + this.attribute);
        this.elmScope = _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getScope(_element);
    }
    CPStyle.prototype.create = function () {
        this.init();
    };
    CPStyle.prototype.setStyleByObject = function (style) {
        var _this = this;
        if (style && window['capivara'].isObject(style)) {
            Object.keys(style).forEach(function (key) {
                _this.element.style.setProperty(key.replace(/ /g, ''), style[key]);
            });
        }
    };
    CPStyle.prototype.init = function () {
        var _this = this;
        try {
            this.attribute.split(',')
                .map(function (attr) {
                return {
                    key: attr.substring(0, attr.indexOf(':')).replace(/'/g, "").replace(/"/, '').replace(/{/g, '').replace(/}/, ''),
                    value: _common__WEBPACK_IMPORTED_MODULE_0__["Common"].evalInMultiContext(_this.element, attr.substring(attr.indexOf(':') + 1, attr.length).replace(/{/g, '').replace(/}/, '')),
                };
            })
                .forEach(function (style) {
                if (window['capivara'].isString(style.value)) {
                    _this.element.style.setProperty(style.key.replace(/ /g, ''), style.value);
                }
                else {
                    _this.setStyleByObject(style.value);
                }
            });
        }
        catch (e) {
            this.setStyleByObject(_common__WEBPACK_IMPORTED_MODULE_0__["Common"].executeFunctionCallback(this.element, this.attribute));
        }
    };
    return CPStyle;
}());



/***/ }),

/***/ "../src/map/map-dom.ts":
/*!*****************************!*\
  !*** ../src/map/map-dom.ts ***!
  \*****************************/
/*! exports provided: MapDom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapDom", function() { return MapDom; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common */ "../src/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "../src/constants.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../index */ "../src/index.ts");
/* harmony import */ var _directive_cp_attr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./directive/cp-attr */ "../src/map/directive/cp-attr.ts");
/* harmony import */ var _directive_cp_blur__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./directive/cp-blur */ "../src/map/directive/cp-blur.ts");
/* harmony import */ var _directive_cp_change__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./directive/cp-change */ "../src/map/directive/cp-change.ts");
/* harmony import */ var _directive_cp_class__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./directive/cp-class */ "../src/map/directive/cp-class.ts");
/* harmony import */ var _directive_cp_click__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./directive/cp-click */ "../src/map/directive/cp-click.ts");
/* harmony import */ var _directive_cp_disabled__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./directive/cp-disabled */ "../src/map/directive/cp-disabled.ts");
/* harmony import */ var _directive_cp_else__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./directive/cp-else */ "../src/map/directive/cp-else.ts");
/* harmony import */ var _directive_cp_else_if__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./directive/cp-else-if */ "../src/map/directive/cp-else-if.ts");
/* harmony import */ var _directive_cp_focus__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./directive/cp-focus */ "../src/map/directive/cp-focus.ts");
/* harmony import */ var _directive_cp_hide__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./directive/cp-hide */ "../src/map/directive/cp-hide.ts");
/* harmony import */ var _directive_cp_if__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./directive/cp-if */ "../src/map/directive/cp-if.ts");
/* harmony import */ var _directive_cp_init__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./directive/cp-init */ "../src/map/directive/cp-init.ts");
/* harmony import */ var _directive_cp_key__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./directive/cp-key */ "../src/map/directive/cp-key.ts");
/* harmony import */ var _directive_cp_model__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./directive/cp-model */ "../src/map/directive/cp-model.ts");
/* harmony import */ var _directive_cp_mouse__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./directive/cp-mouse */ "../src/map/directive/cp-mouse.ts");
/* harmony import */ var _directive_cp_repeat__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./directive/cp-repeat */ "../src/map/directive/cp-repeat.ts");
/* harmony import */ var _directive_cp_show__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./directive/cp-show */ "../src/map/directive/cp-show.ts");
/* harmony import */ var _directive_cp_style__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./directive/cp-style */ "../src/map/directive/cp-style.ts");





















var MapDom = /** @class */ (function () {
    function MapDom(_element) {
        this.directives = {
            /**
             * Mapa de atributos com os elementos que os observam.
             */
            cpModelsElements: {},
            /**
             * Array com os cp-repeat
             */
            cpIfs: [],
            cpModels: [],
            repeats: [],
            cpShows: [],
            cpElses: [],
            cpElseIfs: [],
            cpStyles: [],
            cpClasses: [],
            cpClicks: [],
            cpInits: [],
            cpKeys: [],
            cpAttrs: [],
            cpDisables: [],
            cpFocus: [],
            cpHide: [],
            cpBlur: [],
            cpMouse: [],
            cpChange: [],
        };
        this.element = _element;
        this.regexInterpolation = new RegExp(/({{).*?(}})/g);
        this.setRenderedView(false);
        if (this.element) {
            this.$addScope();
        }
    }
    /**
     * @method void Percorre os elementos filhos do elemento principal criando os binds.
     */
    MapDom.prototype.$addScope = function () {
        var _this = this;
        this.createDirectives(this.element);
        var recursiveBind = function (element) {
            Array.from(element.children).forEach(function (child) {
                child[_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].SCOPE_ATTRIBUTE_NAME] = _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getScope(_this.element);
                _this.createDirectives(child);
                if (child.children) {
                    recursiveBind(child);
                }
            });
        };
        recursiveBind(this.element);
        this.$directivesInit();
    };
    MapDom.prototype.setRenderedView = function (value) {
        this.renderedView = value;
    };
    MapDom.prototype.$directivesInit = function () {
        var _this = this;
        _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getScope(this.element).$on('$onInit', function () {
            Object.keys(_this.directives).forEach(function (key) {
                var directives = _this.directives[key];
                if (Array.isArray(directives)) {
                    directives.forEach(function (directive) { return directive.create(); });
                }
            });
            _this.$viewInit();
        });
    };
    MapDom.prototype.$viewInit = function () {
        this.setRenderedView(true);
        if (this.element['$instance']) {
            var ctrl = _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getScope(this.element).scope[this.element['$instance'].config.controllerAs];
            if (ctrl && ctrl['$onViewInit']) {
                ctrl['$onViewInit']();
            }
        }
    };
    /**
     * @method void Cria uma nova instancia de bind de acordo com o atributo declarado no elemento child.
     * @param child Elemento que utiliza algum tipo de bind.
     */
    MapDom.prototype.createDirectives = function (child) {
        if (child.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].MODEL_ATTRIBUTE_NAME)) {
            this.createCPModel(child);
        }
        if (child.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].IF_ATTRIBUTE_NAME)) {
            this.createCPIf(child);
        }
        if (child.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].CLICK_ATTRIBUTE_NAME) || child.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].DBLCLICK_ATTRIBUTE_NAME)) {
            this.createCPClick(child);
        }
        if (child.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].REPEAT_ATTRIBUTE_NAME)) {
            this.createCPRepeat(child);
        }
        if (child.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].SHOW_ATTRIBUTE_NAME)) {
            this.createCPShow(child);
        }
        if (child.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].ELSE_ATTRIBUTE_NAME)) {
            this.createCPElse(child);
        }
        if (child.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].ELSE_IF_ATTRIBUTE_NAME)) {
            this.createCPElseIf(child);
        }
        if (child.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].INIT_ATTRIBUTE_NAME)) {
            this.createCPInit(child);
        }
        if (child.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].STYLE_ATTRIBUTE_NAME)) {
            this.createCPStyle(child);
        }
        if (child.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].CLASS_ATTRIBUTE_NAME)) {
            this.createCPClass(child);
        }
        if (child.hasAttributeStartingWith(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].KEY_ATTRIBUTE_NAME)) {
            this.createCPKey(child);
        }
        if (child.hasAttributeStartingWith(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].ATTR_ATTRIBUTE_NAME)) {
            this.createCPAttr(child);
        }
        if (child.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].DISABLE_ATTRIBUTE_NAME)) {
            this.createCPDisabled(child);
        }
        if (child.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].FOCUS_ATTRIBUTE_NAME)) {
            this.createCPFocus(child);
        }
        if (child.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].HIDE_ATTRIBUTE_NAME)) {
            this.createCPHide(child);
        }
        if (child.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].BLUR_ATTRIBUTE_NAME)) {
            this.createCPBlur(child);
        }
        if (child.hasAttributeStartingWith(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].MOUSE_ATTRIBUTE_NAME)) {
            this.createCPmouse(child);
        }
        if (child.hasAttribute(_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].CHANGE_ATTRIBUTE_NAME)) {
            this.createCPChange(child);
        }
    };
    MapDom.prototype.reloadElementChildes = function (element, initialScope) {
        var _this = this;
        if (element.children) {
            Array.from(element.children).forEach(function (child) {
                var childScope = _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getScope(child);
                if (childScope && childScope.mapDom && childScope.id !== initialScope.id) {
                    childScope.mapDom.reloadDirectives();
                }
                _this.reloadElementChildes(child, initialScope);
            });
        }
    };
    MapDom.prototype.reloadDirectives = function () {
        var _this = this;
        // Update input values
        Object.keys(this.directives.cpModelsElements)
            .forEach(function (key) { return _this.directives.cpModelsElements[key].forEach(function (bind) { return bind.applyModelInValue(); }); });
        // Update cp repeats
        this.directives.repeats.forEach(function (repeat) { return repeat.applyLoop(); });
        // Update cp show
        this.directives.cpShows.forEach(function (cpShow) { return cpShow.init(); });
        // Update cp if
        this.directives.cpIfs.forEach(function (cpIf) { return cpIf.init(); });
        // Update cp else-if
        this.directives.cpElseIfs.forEach(function (cpElseIf) { return cpElseIf.init(); });
        // Update cp else
        this.directives.cpElses.forEach(function (cpElse) { return cpElse.init(); });
        // Update cp style
        this.directives.cpStyles.forEach(function (cpStyle) { return cpStyle.init(); });
        // Update cp class
        this.directives.cpClasses.forEach(function (cpClass) { return cpClass.init(); });
        // Update cp key
        this.directives.cpKeys.forEach(function (cpKey) { return cpKey.init(); });
        // Update cp disable
        this.directives.cpDisables.forEach(function (cpDisable) { return cpDisable.init(); });
        // Update cp focus
        this.directives.cpFocus.forEach(function (cpFocus) { return cpFocus.init(); });
        // Update cp hide
        this.directives.cpHide.forEach(function (cpHide) { return cpHide.init(); });
        // Update cp blur
        this.directives.cpBlur.forEach(function (cpBlur) { return cpBlur.init(); });
        // Update cp Mouse
        this.directives.cpMouse.forEach(function (cpMouse) { return cpMouse.init(); });
        // Update cp change
        this.directives.cpChange.forEach(function (cpChange) { return cpChange.init(); });
        // Update cp attr
        this.directives.cpAttrs.forEach(function (cpAttr) { return cpAttr.init(); });
    };
    /**
     * @method void Atualiza os valores dos elementos HTML de acordo com o atributo que está sendo observado.
     */
    MapDom.prototype.reload = function () {
        if (!this.renderedView) {
            return;
        }
        this.reloadDirectives();
        this.reloadElementChildes(this.element, _common__WEBPACK_IMPORTED_MODULE_0__["Common"].getScope(this.element));
        this.processInterpolation();
    };
    /**
     * @description Percorre os elementos para processar os interpolations.
     * @param element
     */
    MapDom.prototype.processInterpolation = function () {
        var _this = this;
        this.getNodeTexts().forEach(function (nodeTextReference) { return _this.interpolation(nodeTextReference); });
    };
    MapDom.prototype.getNodeTexts = function () {
        var n;
        var a = [], walk = document.createTreeWalker(this.element, NodeFilter.SHOW_TEXT, null, false);
        while (n = walk.nextNode()) {
            a.push(n);
        }
        return a;
    };
    MapDom.prototype.getInterpolationValue = function (content, childNode) {
        try {
            return _common__WEBPACK_IMPORTED_MODULE_0__["Common"].evalInMultiContext(childNode, content.trim().startsWith(':') ? content.trim().slice(1) : content, undefined) + '';
        }
        catch (e) {
            return '';
        }
    };
    /**
     * @description Função que modifica o texto da interpolação pelo determinado valor.
     * @param childNode
     */
    MapDom.prototype.interpolation = function (childNode) {
        var _this = this;
        if (!_common__WEBPACK_IMPORTED_MODULE_0__["Common"].parentHasIgnore(childNode)) {
            childNode.originalValue = childNode.originalValue || childNode.nodeValue;
            childNode.$immutableInterpolation = childNode.$immutableInterpolation || false;
            if (childNode.$immutableInterpolation) {
                return;
            }
            var nodeModified_1 = childNode.originalValue, str = childNode.originalValue;
            str = _index__WEBPACK_IMPORTED_MODULE_2__["Capivara"].replaceAll(str, _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].START_INTERPOLATION, '{{');
            str = _index__WEBPACK_IMPORTED_MODULE_2__["Capivara"].replaceAll(str, _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].END_INTERPOLATION, '}}');
            (str.match(this.regexInterpolation) || []).forEach(function (key) {
                var content = key.replace('{{', '').replace('}}', '');
                if (!childNode.$immutableInterpolation) {
                    try {
                        var evalValue = _this.getInterpolationValue(content, childNode);
                        key = _index__WEBPACK_IMPORTED_MODULE_2__["Capivara"].replaceAll(key, '{{', _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].START_INTERPOLATION);
                        key = _index__WEBPACK_IMPORTED_MODULE_2__["Capivara"].replaceAll(key, '}}', _constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].END_INTERPOLATION);
                        nodeModified_1 = nodeModified_1.replace(key, evalValue);
                        childNode.nodeValue = nodeModified_1;
                    }
                    catch (e) { }
                }
                if (content.trim().startsWith(':') && !childNode.$immutableInterpolation) {
                    childNode.$immutableInterpolation = true;
                }
            });
            childNode.nodeValue = childNode.nodeValue.replace(this.regexInterpolation, '');
        }
    };
    /**
     * @method void Retorna um mapa de atributos e elementos escutando alterações desse atributo.
     */
    MapDom.prototype.getCpModels = function () {
        return this.directives.cpModels;
    };
    /**
     * @method void Adiciona um tipo de bind em um mapa, esse bind possui um elemento HTML que será atualizado quando o valor do atributo for alterado.
     * @param capivaraBind Tipo de bind que será monitorado.
     */
    MapDom.prototype.addCpModels = function (capivaraBind) {
        this.directives.cpModelsElements[capivaraBind.attribute] = this.directives.cpModelsElements[capivaraBind.attribute] || [];
        this.directives.cpModelsElements[capivaraBind.attribute].push(capivaraBind);
    };
    /**
     *
     * @param child Elemento que está sendo criado o bind de model
     */
    MapDom.prototype.createCPModel = function (child) {
        this.directives.cpModels.push(new _directive_cp_model__WEBPACK_IMPORTED_MODULE_16__["CPModel"](child, this));
    };
    /**
     *
     * @param child Elemento que está sendo criado o bind de click
     */
    MapDom.prototype.createCPClick = function (child) {
        this.directives.cpClicks.push(new _directive_cp_click__WEBPACK_IMPORTED_MODULE_7__["CPClick"](child, this));
    };
    /**
     *
     * @param child Elemento que está sendo criado o bind de show
     */
    MapDom.prototype.createCPShow = function (child) {
        this.directives.cpShows.push(new _directive_cp_show__WEBPACK_IMPORTED_MODULE_19__["CPShow"](child, this));
    };
    /**
     *
     * @param child Elemento que está sendo criado o bind do if
     */
    MapDom.prototype.createCPIf = function (child) {
        this.directives.cpIfs.push(new _directive_cp_if__WEBPACK_IMPORTED_MODULE_13__["CPIf"](child, this));
    };
    /**
     *
     * @param child Elemento que está sendo criado o bind do else
     */
    MapDom.prototype.createCPElse = function (child) {
        this.directives.cpElses.push(new _directive_cp_else__WEBPACK_IMPORTED_MODULE_9__["CPElse"](child, this));
    };
    /**
     *
     * @param child Elemento que está sendo criado o bind do else if
     */
    MapDom.prototype.createCPElseIf = function (child) {
        this.directives.cpElseIfs.push(new _directive_cp_else_if__WEBPACK_IMPORTED_MODULE_10__["CPElseIf"](child, this));
    };
    /**
     *
     * @param child Elemento que está sendo criado o bind de repeat.
     */
    MapDom.prototype.createCPRepeat = function (child) {
        this.directives.repeats.push(new _directive_cp_repeat__WEBPACK_IMPORTED_MODULE_18__["CPRepeat"](child, this));
    };
    /**
     *
     * @param child Elemento que está sendo criado o bind do init.
     */
    MapDom.prototype.createCPInit = function (child) {
        this.directives.cpInits.push(new _directive_cp_init__WEBPACK_IMPORTED_MODULE_14__["CPInit"](child, this));
    };
    /**
     *
     * @param child Elemento que está sendo criado o bind do style.
     */
    MapDom.prototype.createCPStyle = function (child) {
        this.directives.cpStyles.push(new _directive_cp_style__WEBPACK_IMPORTED_MODULE_20__["CPStyle"](child, this));
    };
    /**
     *
     * @param child Elemento que está sendo criado o bind do class.
     */
    MapDom.prototype.createCPClass = function (child) {
        this.directives.cpClasses.push(new _directive_cp_class__WEBPACK_IMPORTED_MODULE_6__["CPClass"](child, this));
    };
    /**
     *
     * @param child Elemento que está sendo criado o bind do key.
     */
    MapDom.prototype.createCPKey = function (child) {
        this.directives.cpKeys.push(new _directive_cp_key__WEBPACK_IMPORTED_MODULE_15__["CPKey"](child, this));
    };
    /**
     * @param child Elemento que está criando a bind do attr.
     */
    MapDom.prototype.createCPAttr = function (child) {
        this.directives.cpAttrs.push(new _directive_cp_attr__WEBPACK_IMPORTED_MODULE_3__["CPAttr"](child, this));
    };
    /**
     * @param child Elemento que está sendo criado o bind do disable.
     */
    MapDom.prototype.createCPDisabled = function (child) {
        this.directives.cpDisables.push(new _directive_cp_disabled__WEBPACK_IMPORTED_MODULE_8__["CPDisabled"](child, this));
    };
    /**
     * @param child Elemento que está sendo criado o bind do focus.
     */
    MapDom.prototype.createCPFocus = function (child) {
        this.directives.cpFocus.push(new _directive_cp_focus__WEBPACK_IMPORTED_MODULE_11__["CPFocus"](child, this));
    };
    /**
     * @param child Elemento que está sendo criado o bind do hide.
     */
    MapDom.prototype.createCPHide = function (child) {
        this.directives.cpHide.push(new _directive_cp_hide__WEBPACK_IMPORTED_MODULE_12__["CPHide"](child, this));
    };
    /**
     * @param child Elemento que está sendo criado o bind do blur.
     */
    MapDom.prototype.createCPBlur = function (child) {
        this.directives.cpBlur.push(new _directive_cp_blur__WEBPACK_IMPORTED_MODULE_4__["CPBlur"](child, this));
    };
    /**
    * @param child Elemento que está sendo criado o bind do dbTitle.
    */
    MapDom.prototype.createCPmouse = function (child) {
        this.directives.cpMouse.push(new _directive_cp_mouse__WEBPACK_IMPORTED_MODULE_17__["CPMouse"](child, this));
    };
    /**
    * @param child Elemento que está sendo criado o bind do placeholder.
    */
    MapDom.prototype.createCPChange = function (child) {
        this.directives.cpChange.push(new _directive_cp_change__WEBPACK_IMPORTED_MODULE_5__["CPChange"](child, this));
    };
    return MapDom;
}());



/***/ }),

/***/ "../src/scope/scope.proxy.ts":
/*!***********************************!*\
  !*** ../src/scope/scope.proxy.ts ***!
  \***********************************/
/*! exports provided: ScopeProxy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScopeProxy", function() { return ScopeProxy; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "../src/constants.ts");
/* harmony import */ var _core_observer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/observer */ "../src/core/observer/index.ts");


var ScopeProxy = /** @class */ (function () {
    function ScopeProxy(_scope, _mapDom, _element) {
        this.mapDom = _mapDom;
        this.element = _element;
        this.createWatcherScope(_scope, this);
    }
    ScopeProxy.prototype.createWatcherScope = function (scope, objectObserve) {
        var _this = this;
        if (this.element['$instance']) {
            scope.$on('$onInit', function () {
                _core_observer__WEBPACK_IMPORTED_MODULE_1__["Observe"].observe(objectObserve[_this.element['$instance'].config.controllerAs], function (changes) {
                    if (changes.length > 0) {
                        _this.updateScopes(objectObserve.element[_constants__WEBPACK_IMPORTED_MODULE_0__["Constants"].SCOPE_ATTRIBUTE_NAME]);
                    }
                    scope.$emit('$onChanges', changes);
                    _this.executeObservers(objectObserve, '$onChanges', changes);
                    _this.executeObservers(objectObserve, '_$$checkBindings', changes);
                });
            });
        }
    };
    ScopeProxy.prototype.updateScopes = function (scope) {
        if (!scope.$parent) {
            scope.mapDom.reload();
        }
        else {
            this.updateScopes(scope.$parent);
        }
    };
    ScopeProxy.prototype.executeObservers = function (objectObserve, observeName, changes) {
        if (objectObserve[this.element['$instance'].config.controllerAs][observeName]) {
            objectObserve[this.element['$instance'].config.controllerAs][observeName](changes);
        }
    };
    return ScopeProxy;
}());



/***/ }),

/***/ "../src/scope/scope.ts":
/*!*****************************!*\
  !*** ../src/scope/scope.ts ***!
  \*****************************/
/*! exports provided: Scope */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scope", function() { return Scope; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common */ "../src/common.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "../src/constants.ts");
/* harmony import */ var _core_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/element */ "../src/core/element.ts");
/* harmony import */ var _core_eval__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/eval */ "../src/core/eval.ts");
/* harmony import */ var _map_map_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../map/map-dom */ "../src/map/map-dom.ts");
/* harmony import */ var _scope_proxy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./scope.proxy */ "../src/scope/scope.proxy.ts");






var Scope = /** @class */ (function () {
    function Scope(_element) {
        var _this = this;
        this.cpElements = {};
        this.$on = function (evtName, callback) {
            _this.watchers.push({ evtName: evtName, callback: callback });
        };
        this.$emit = function (evtName) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            _this.watchers
                .filter(function (watcher) { return watcher.evtName === evtName; })
                .forEach(function (watcher) {
                var _a;
                (_a = watcher.callback).call.apply(_a, [_this].concat(args));
            });
        };
        this.$eval = function (source) {
            return _core_eval__WEBPACK_IMPORTED_MODULE_3__["Eval"].exec(_this.scope, source);
        };
        if (!_element || !_element.nodeName) {
            console.warn('Unable to create a scope, it is necessary to report an html element.');
        }
        _common__WEBPACK_IMPORTED_MODULE_0__["Common"].setScopeId(this);
        this.watchers = [];
        Scope.addScope(_element, this);
        this.mapDom = new _map_map_dom__WEBPACK_IMPORTED_MODULE_4__["MapDom"](_element);
        this.scope = new _scope_proxy__WEBPACK_IMPORTED_MODULE_5__["ScopeProxy"](this, this.mapDom, _element);
        if (!_element['$instance']) {
            this.$emit('$onInit');
        }
        this.observers = [];
        this.$on('$onChanges', this.onChanges);
        if (_element && _element.parentNode && _element.parentNode[_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].SCOPE_ATTRIBUTE_NAME]) {
            this.$parent = _element.parentNode[_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].SCOPE_ATTRIBUTE_NAME];
        }
    }
    Scope.prototype.getScopeProxy = function () {
        return this.scope;
    };
    /** #Mudar não poderia ser adicionar a referencia do scope do componente no elemento do componente
     * @method void Aplicado um escopo em um elemento HTML.
     * @param element Elemento que será aplicado o escopo
     * @param scope Escopo que será aplicado no elemento
     */
    Scope.addScope = function (element, scope) {
        if (element && element.nodeName) {
            element[_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].SCOPE_ATTRIBUTE_NAME] = scope;
        }
    };
    Scope.prototype.onChanges = function (changes) {
        this.observers.forEach(function (observer) {
            changes.filter(function (change) { return change.type === 'update' && change.name === observer.key; }).forEach(function (change) {
                observer.callback.call(observer.ctx, change.object[change.name], change.oldValue);
            });
        });
    };
    Scope.prototype.$watch = function (key, callback, ctx) {
        this.observers.push({
            key: key,
            callback: callback,
            ctx: ctx,
        });
    };
    Scope.prototype.$unwatch = function (key, callback) {
        this.observers = this.observers.filter(function (observer) { return observer.key !== key; });
    };
    Scope.prototype.element = function (element) {
        if (this.cpElements[element] && this.cpElements[element].element === element) {
            return this.cpElements[element];
        }
        var capivaraElement = new _core_element__WEBPACK_IMPORTED_MODULE_2__["CapivaraElement"](element);
        this.cpElements[element] = capivaraElement;
        return capivaraElement;
    };
    Scope.prototype.destroy = function () {
        var _this = this;
        Object.keys(this.cpElements).forEach(function (key) {
            _this.cpElements[key].destroy();
        });
    };
    Scope.prototype.refresh = function () {
        this.mapDom.reload();
    };
    return Scope;
}());



/***/ })

/******/ });
//# sourceMappingURL=capivara.js.map