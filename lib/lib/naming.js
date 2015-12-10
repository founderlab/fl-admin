'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports.plural = plural;
exports.upper = upper;
exports.table = table;

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