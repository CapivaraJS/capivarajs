'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));
var child_process = require('child_process');
var fs = require('fs');

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var WebpackNightWatchPlugin = function () {
  function WebpackNightWatchPlugin() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, WebpackNightWatchPlugin);

    var defaultOptions = {
      onEmit: false
    };
    this.options = Object.assign({}, defaultOptions, options);
  }

  createClass(WebpackNightWatchPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      compiler.plugin('compilation', function (compilation) {
        child_process.spawnSync('pkill', ['-f', 'selenium']);
      });

      compiler.plugin(this.options.onEmit ? 'emit' : 'done', function (compilation, callback) {
        var env = Object.assign({}, process.env, { LANG: 'en_US.UTF-8' });
        
        var nightwatchPath = path.join(__dirname, '../node_modules/.bin/nightwatch');
        if(!fs.existsSync(nightwatchPath)) {
          // leave the folder "lib" and the folder "webpack-nightwatch-plugin"
          nightwatchPath = path.join(__dirname, '../../node_modules/.bin/nightwatch');
        }
        var nightwatch = child_process.spawn(nightwatchPath, ['-c', _this.options.url], { env: env });

        nightwatch.stdout.on('data', function (data) {
          process.stdout.write(data.toString());
        });

        nightwatch.stderr.on('data', function (data) {
          process.stdout.write(data.toString());
        });

        nightwatch.on('close', function () {
          if (_this.options.onEmit) callback();
          child_process.spawnSync('pkill', ['-f', 'selenium']);
        });
      });

      //   compiler.plugin('done', (compilation) => {
      //     console.log('done')
      //     const env = Object.assign({}, process.env, {LANG: 'en_US.UTF-8'})
      //     const nightwatch = spawn(path.join(__dirname, '../node_modules/.bin/nightwatch'), [
      //       '-c',
      //       this.options.url
      //     ], {env})

      //     nightwatch.stdout.on('data', data => {
      //       process.stdout.write(data.toString())
      //     })

      //     nightwatch.stderr.on('data', data => {
      //       process.stdout.write(data.toString())
      //     })

      //     nightwatch.on('close', () => {
      //       spawnSync('pkill', ['-f', 'selenium'])
      //     })
      //   })
    }
  }]);
  return WebpackNightWatchPlugin;
}();

module.exports = WebpackNightWatchPlugin;
