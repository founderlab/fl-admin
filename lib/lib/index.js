'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.checkPropTypes = checkPropTypes;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

// yoinked from react-router

function checkPropTypes(componentName, prop_types, props) {
  if (componentName === undefined) componentName = 'UnknownComponent';

  for (var prop_name in prop_types) {
    if (prop_types.hasOwnProperty(prop_name)) {
      var error = prop_types[prop_name](props, prop_name, componentName);
      if (error instanceof Error) (0, _warning2['default'])(false, error.message);
    }
  }
}