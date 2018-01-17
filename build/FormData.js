"use strict";

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.symbol");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

// ==ClosureCompiler==
// @output_file_name formdata.min.js
// @compilation_level ADVANCED_OPTIMIZATIONS
// ==/ClosureCompiler==
module.exports = function () {
  if (!window.FormData || !window.FormData.prototype.keys) {
    var normalizeValue = function normalizeValue(_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          value = _ref2[0],
          filename = _ref2[1];

      if (value instanceof Blob) // Should always returns a new File instance
        // console.assert(fd.get(x) !== fd.get(x))
        value = new File([value], filename, {
          type: value.type,
          lastModified: value.lastModified
        });
      return value;
    };

    var stringify = function stringify(name) {
      if (!arguments.length) throw new TypeError('1 argument required, but only 0 present.');
      return [name + ''];
    };

    var normalizeArgs = function normalizeArgs(name, value, filename) {
      if (arguments.length < 2) throw new TypeError("2 arguments required, but only ".concat(arguments.length, " present."));
      return value instanceof Blob // normalize name and filename if adding an attachment
      ? [name + '', value, filename !== undefined ? filename + '' // Cast filename to string if 3th arg isn't undefined
      : typeof value.name === 'string' // if name prop exist
      ? value.name // Use File.name
      : 'Blob'] // otherwise fallback to Blob
      // If no attachment, just cast the args to strings
      : [name + '', value + ''];
    };
    /**
     * @implements {Iterable}
     */


    // keep a reference to native implementation
    var _FormData = window.FormData; // To be monkey patched

    var _send = window.XMLHttpRequest.prototype.send;

    var _fetch = window.Request && window.fetch; // Unable to patch Request constructor correctly
    // const _Request = window.Request
    // only way is to use ES6 class extend
    // https://github.com/babel/babel/issues/1966


    var stringTag = window.Symbol && Symbol.toStringTag;
    var map = new WeakMap();

    var wm = function wm(o) {
      return map.get(o);
    };

    var arrayFrom = Array.from || function (obj) {
      return [].slice.call(obj);
    }; // Add missing stringTags to blob and files


    if (stringTag) {
      if (!Blob.prototype[stringTag]) {
        Blob.prototype[stringTag] = 'Blob';
      }

      if ('File' in window && !File.prototype[stringTag]) {
        File.prototype[stringTag] = 'File';
      }
    } // Fix so you can construct your own File


    try {
      new File([], '');
    } catch (a) {
      window.File = function (b, d, c) {
        var blob = new Blob(b, c);
        var t = c && void 0 !== c.lastModified ? new Date(c.lastModified) : new Date();
        Object.defineProperties(blob, {
          name: {
            value: d
          },
          lastModifiedDate: {
            value: t
          },
          lastModified: {
            value: +t
          },
          toString: {
            value: function value() {
              return '[object File]';
            }
          }
        });

        if (stringTag) {
          Object.defineProperty(blob, stringTag, {
            value: 'File'
          });
        }

        return blob;
      };
    }

    var FormDataPolyfill =
    /*#__PURE__*/
    function () {
      /**
       * FormData class
       *
       * @param {HTMLElement=} form
       */
      function FormDataPolyfill(form) {
        _classCallCheck(this, FormDataPolyfill);

        map.set(this, Object.create(null));
        if (!form) return this;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = arrayFrom(form.elements)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _elm = _step.value;
            if (!_elm.name || _elm.disabled) continue;

            if (_elm.type === 'file') {
              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = _elm.files[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var _file = _step2.value;
                  this.append(_elm.name, _file);
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                    _iterator2.return();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }
            } else if (_elm.type === 'select-multiple' || _elm.type === 'select-one') {
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = arrayFrom(_elm.options)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  var _opt = _step3.value;
                  _opt.selected && this.append(_elm.name, _opt.value);
                }
              } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                    _iterator3.return();
                  }
                } finally {
                  if (_didIteratorError3) {
                    throw _iteratorError3;
                  }
                }
              }
            } else if (_elm.type === 'checkbox' || _elm.type === 'radio') {
              if (_elm.checked) this.append(_elm.name, _elm.value);
            } else this.append(_elm.name, _elm.value);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
      /**
       * Append a field
       *
       * @param   {String}           name      field name
       * @param   {String|Blob|File} value     string / blob / file
       * @param   {String=}          filename  filename to use with blob
       * @return  {Undefined}
       */


      _createClass(FormDataPolyfill, [{
        key: "append",
        value: function append(name, value, filename) {
          var map = wm(this);
          if (!map[name]) map[name] = [];
          map[name].push([value, filename]);
        }
        /**
         * Delete all fields values given name
         *
         * @param   {String}  name  Field name
         * @return  {Undefined}
         */

      }, {
        key: "delete",
        value: function _delete(name) {
          delete wm(this)[name];
        }
        /**
         * Iterate over all fields as [name, value]
         *
         * @return {Iterator}
         */

      }, {
        key: "entries",
        value:
        /*#__PURE__*/
        regeneratorRuntime.mark(function entries() {
          var map, name, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _value;

          return regeneratorRuntime.wrap(function entries$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  map = wm(this);
                  _context.t0 = regeneratorRuntime.keys(map);

                case 2:
                  if ((_context.t1 = _context.t0()).done) {
                    _context.next = 32;
                    break;
                  }

                  name = _context.t1.value;
                  _iteratorNormalCompletion4 = true;
                  _didIteratorError4 = false;
                  _iteratorError4 = undefined;
                  _context.prev = 7;
                  _iterator4 = map[name][Symbol.iterator]();

                case 9:
                  if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                    _context.next = 16;
                    break;
                  }

                  _value = _step4.value;
                  _context.next = 13;
                  return [name, normalizeValue(_value)];

                case 13:
                  _iteratorNormalCompletion4 = true;
                  _context.next = 9;
                  break;

                case 16:
                  _context.next = 22;
                  break;

                case 18:
                  _context.prev = 18;
                  _context.t2 = _context["catch"](7);
                  _didIteratorError4 = true;
                  _iteratorError4 = _context.t2;

                case 22:
                  _context.prev = 22;
                  _context.prev = 23;

                  if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                    _iterator4.return();
                  }

                case 25:
                  _context.prev = 25;

                  if (!_didIteratorError4) {
                    _context.next = 28;
                    break;
                  }

                  throw _iteratorError4;

                case 28:
                  return _context.finish(25);

                case 29:
                  return _context.finish(22);

                case 30:
                  _context.next = 2;
                  break;

                case 32:
                case "end":
                  return _context.stop();
              }
            }
          }, entries, this, [[7, 18, 22, 30], [23,, 25, 29]]);
        })
        /**
         * Iterate over all fields
         *
         * @param   {Function}  callback  Executed for each item with parameters (value, name, thisArg)
         * @param   {Object=}   thisArg   `this` context for callback function
         * @return  {Undefined}
         */

      }, {
        key: "forEach",
        value: function forEach(callback, thisArg) {
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = this[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var _ref5 = _step5.value;

              var _ref4 = _slicedToArray(_ref5, 2);

              var _name = _ref4[0];
              var _value2 = _ref4[1];
              callback.call(thisArg, _value2, _name, this);
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                _iterator5.return();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
        }
        /**
         * Return first field value given name
         * or null if non existen
         *
         * @param   {String}  name      Field name
         * @return  {String|File|null}  value Fields value
         */

      }, {
        key: "get",
        value: function get(name) {
          var map = wm(this);
          return map[name] ? normalizeValue(map[name][0]) : null;
        }
        /**
         * Return all fields values given name
         *
         * @param   {String}  name  Fields name
         * @return  {Array}         [{String|File}]
         */

      }, {
        key: "getAll",
        value: function getAll(name) {
          return (wm(this)[name] || []).map(normalizeValue);
        }
        /**
         * Check for field name existence
         *
         * @param   {String}   name  Field name
         * @return  {boolean}
         */

      }, {
        key: "has",
        value: function has(name) {
          return name in wm(this);
        }
        /**
         * Iterate over all fields name
         *
         * @return {Iterator}
         */

      }, {
        key: "keys",
        value:
        /*#__PURE__*/
        regeneratorRuntime.mark(function keys() {
          var _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, _ref8, _ref7, _name2;

          return regeneratorRuntime.wrap(function keys$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _iteratorNormalCompletion6 = true;
                  _didIteratorError6 = false;
                  _iteratorError6 = undefined;
                  _context2.prev = 3;
                  _iterator6 = this[Symbol.iterator]();

                case 5:
                  if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                    _context2.next = 14;
                    break;
                  }

                  _ref8 = _step6.value;
                  _ref7 = _slicedToArray(_ref8, 1);
                  _name2 = _ref7[0];
                  _context2.next = 11;
                  return _name2;

                case 11:
                  _iteratorNormalCompletion6 = true;
                  _context2.next = 5;
                  break;

                case 14:
                  _context2.next = 20;
                  break;

                case 16:
                  _context2.prev = 16;
                  _context2.t0 = _context2["catch"](3);
                  _didIteratorError6 = true;
                  _iteratorError6 = _context2.t0;

                case 20:
                  _context2.prev = 20;
                  _context2.prev = 21;

                  if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
                    _iterator6.return();
                  }

                case 23:
                  _context2.prev = 23;

                  if (!_didIteratorError6) {
                    _context2.next = 26;
                    break;
                  }

                  throw _iteratorError6;

                case 26:
                  return _context2.finish(23);

                case 27:
                  return _context2.finish(20);

                case 28:
                case "end":
                  return _context2.stop();
              }
            }
          }, keys, this, [[3, 16, 20, 28], [21,, 23, 27]]);
        })
        /**
         * Overwrite all values given name
         *
         * @param   {String}    name      Filed name
         * @param   {String}    value     Field value
         * @param   {String=}   filename  Filename (optional)
         * @return  {Undefined}
         */

      }, {
        key: "set",
        value: function set(name, value, filename) {
          wm(this)[name] = [[value, filename]];
        }
        /**
         * Iterate over all fields
         *
         * @return {Iterator}
         */

      }, {
        key: "values",
        value:
        /*#__PURE__*/
        regeneratorRuntime.mark(function values() {
          var _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, _ref11, _ref10, _name3, _value3;

          return regeneratorRuntime.wrap(function values$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _iteratorNormalCompletion7 = true;
                  _didIteratorError7 = false;
                  _iteratorError7 = undefined;
                  _context3.prev = 3;
                  _iterator7 = this[Symbol.iterator]();

                case 5:
                  if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                    _context3.next = 15;
                    break;
                  }

                  _ref11 = _step7.value;
                  _ref10 = _slicedToArray(_ref11, 2);
                  _name3 = _ref10[0];
                  _value3 = _ref10[1];
                  _context3.next = 12;
                  return _value3;

                case 12:
                  _iteratorNormalCompletion7 = true;
                  _context3.next = 5;
                  break;

                case 15:
                  _context3.next = 21;
                  break;

                case 17:
                  _context3.prev = 17;
                  _context3.t0 = _context3["catch"](3);
                  _didIteratorError7 = true;
                  _iteratorError7 = _context3.t0;

                case 21:
                  _context3.prev = 21;
                  _context3.prev = 22;

                  if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
                    _iterator7.return();
                  }

                case 24:
                  _context3.prev = 24;

                  if (!_didIteratorError7) {
                    _context3.next = 27;
                    break;
                  }

                  throw _iteratorError7;

                case 27:
                  return _context3.finish(24);

                case 28:
                  return _context3.finish(21);

                case 29:
                case "end":
                  return _context3.stop();
              }
            }
          }, values, this, [[3, 17, 21, 29], [22,, 24, 28]]);
        })
        /**
         * Return a native (perhaps degraded) FormData with only a `append` method
         * Can throw if it's not supported
         *
         * @return {FormData}
         */

      }, {
        key: '_asNative',
        value: function _asNative() {
          var fd = new _FormData();
          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (var _iterator8 = this[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              var _ref14 = _step8.value;

              var _ref13 = _slicedToArray(_ref14, 2);

              var _name4 = _ref13[0];
              var _value4 = _ref13[1];
              fd.append(_name4, _value4);
            }
          } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
                _iterator8.return();
              }
            } finally {
              if (_didIteratorError8) {
                throw _iteratorError8;
              }
            }
          }

          return fd;
        }
        /**
         * [_blob description]
         *
         * @return {Blob} [description]
         */

      }, {
        key: '_blob',
        value: function _blob() {
          var boundary = '----formdata-polyfill-' + Math.random();
          var chunks = [];
          var _iteratorNormalCompletion9 = true;
          var _didIteratorError9 = false;
          var _iteratorError9 = undefined;

          try {
            for (var _iterator9 = this[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
              var _ref17 = _step9.value;

              var _ref16 = _slicedToArray(_ref17, 2);

              var _name5 = _ref16[0];
              var _value5 = _ref16[1];
              chunks.push("--".concat(boundary, "\r\n"));

              if (_value5 instanceof Blob) {
                chunks.push("Content-Disposition: form-data; name=\"".concat(_name5, "\"; filename=\"").concat(_value5.name, "\"\r\n"), "Content-Type: ".concat(_value5.type || 'application/octet-stream', "\r\n\r\n"), _value5, '\r\n');
              } else {
                chunks.push("Content-Disposition: form-data; name=\"".concat(_name5, "\"\r\n\r\n").concat(_value5, "\r\n"));
              }
            }
          } catch (err) {
            _didIteratorError9 = true;
            _iteratorError9 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
                _iterator9.return();
              }
            } finally {
              if (_didIteratorError9) {
                throw _iteratorError9;
              }
            }
          }

          chunks.push("--".concat(boundary, "--"));
          return new Blob(chunks, {
            type: 'multipart/form-data; boundary=' + boundary
          });
        }
        /**
         * The class itself is iterable
         * alias for formdata.entries()
         *
         * @return  {Iterator}
         */

      }, {
        key: Symbol.iterator,
        value: function value() {
          return this.entries();
        }
        /**
         * Create the default string description.
         *
         * @return  {String} [object FormData]
         */

      }, {
        key: "toString",
        value: function toString() {
          return '[object FormData]';
        }
      }]);

      return FormDataPolyfill;
    }();

    if (stringTag) {
      /**
       * Create the default string description.
       * It is accessed internally by the Object.prototype.toString().
       *
       * @return {String} FormData
       */
      FormDataPolyfill.prototype[stringTag] = 'FormData';
    }

    var decorations = [['append', normalizeArgs], ['delete', stringify], ['get', stringify], ['getAll', stringify], ['has', stringify], ['set', normalizeArgs]];
    decorations.forEach(function (arr) {
      var orig = FormDataPolyfill.prototype[arr[0]];

      FormDataPolyfill.prototype[arr[0]] = function () {
        return orig.apply(this, arr[1].apply(this, arrayFrom(arguments)));
      };
    }); // Patch xhr's send method to call _blob transparently

    XMLHttpRequest.prototype.send = function (data) {
      // I would check if Content-Type isn't already set
      // But xhr lacks getRequestHeaders functionallity
      // https://github.com/jimmywarting/FormData/issues/44
      if (data instanceof FormDataPolyfill) {
        var blob = data['_blob']();
        this.setRequestHeader('Content-Type', blob.type);

        _send.call(this, blob);
      } else {
        _send.call(this, data);
      }
    }; // Patch fetch's function to call _blob transparently


    if (_fetch) {
      var _fetch2 = window.fetch;

      window.fetch = function (input, init) {
        if (init && init.body && init.body instanceof FormDataPolyfill) {
          init.body = init.body['_blob']();
        }

        return _fetch2(input, init);
      };
    }

    window['FormData'] = FormDataPolyfill;
  }
};