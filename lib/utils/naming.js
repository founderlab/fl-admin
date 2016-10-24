'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports.plural = plural;
exports.upper = upper;
exports.table = table;

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

function plural(Model) {
  return _inflection2['default'].pluralize(Model.name);
}

function upper(Model) {
  return _inflection2['default'].underscore(Model.name).toUpperCase();
}

function table(Model) {
  return _inflection2['default'].tableize(Model.name);
}