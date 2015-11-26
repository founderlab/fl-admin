'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.checkPropTypes = checkPropTypes;
exports.mapFieldsToInputs = mapFieldsToInputs;
exports.editFieldInline = editFieldInline;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _componentsModel_field_input = require('../components/model_field_input');

var _componentsModel_field_input2 = _interopRequireDefault(_componentsModel_field_input);

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

function mapFieldsToInputs(model_admin, fields) {
  var props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var InputComponent = arguments.length <= 3 || arguments[3] === undefined ? _componentsModel_field_input2['default'] : arguments[3];

  return _lodash2['default'].map(fields, function (field, key) {
    var model_field = model_admin.fields[key] || model_admin.relations[key];
    if (!model_field) (0, _warning2['default'])('[fl-admin] Can\'t find model_field for key ' + key + ': is this key the field name instead of the virtual_id_accessor?');
    return _react2['default'].createElement(InputComponent, _extends({
      key: key,
      model_field: model_field,
      form_field: field
    }, props));
  });
}

var NO_INLINE = ['hasMany', 'manyToMany'];

function editFieldInline(field) {
  return field.inline && NO_INLINE.indexOf(field.type) === -1;
}