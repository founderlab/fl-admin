'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports.checkPropTypes = checkPropTypes;
exports.mapFieldsToInputs = mapFieldsToInputs;
exports.editFieldInline = editFieldInline;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _componentsInputsSmartInput = require('../components/inputs/SmartInput');

var _componentsInputsSmartInput2 = _interopRequireDefault(_componentsInputsSmartInput);

// yoinked from react-router

function checkPropTypes(componentName, prop_types, props) {
  if (componentName === undefined) componentName = 'UnknownComponent';

  for (var prop_name in prop_types) {
    if (prop_types.hasOwnProperty(prop_name)) {
      var error = prop_types[prop_name](props, prop_name, componentName);
      if (error instanceof Error) _warning2['default'](false, error.message);
    }
  }
}

function mapFieldsToInputs(model_admin, fields) {
  var props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  var InputComponent = arguments.length <= 3 || arguments[3] === undefined ? _componentsInputsSmartInput2['default'] : arguments[3];

  return _lodash2['default'].map(fields, function (field, key) {
    var model_field = model_admin.fields[key] || model_admin.relation_fields[key];
    _warning2['default'](model_field, '[fl-admin] Can\'t find model_field for key ' + key + ': is this key the field name instead of the virtual_id_accessor?');
    return _react2['default'].createElement(InputComponent, _extends({
      key: key,
      model_field: model_field,
      form_field: field
    }, props));
  });
}

var NO_LIST_EDIT = ['hasMany', 'manyToMany'];

function editFieldInline(field) {
  return field.list_edit && NO_LIST_EDIT.indexOf(field.type) === -1;
}