'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.plural = plural;
exports.upper = upper;
exports.table = table;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

function plural(model_type) {
  return _inflection2['default'].pluralize(model_type.name);
}

function upper(model_type) {
  return _inflection2['default'].underscore(model_type.name).toUpperCase();
}

function table(model_type) {
  return _inflection2['default'].tableize(model_type.name);
}