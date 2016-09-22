'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.mapFieldsToInputs = mapFieldsToInputs;
exports.editFieldInline = editFieldInline;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _componentsInputsSmartInput = require('../components/inputs/SmartInput');

var _componentsInputsSmartInput2 = _interopRequireDefault(_componentsInputsSmartInput);

var handleOnChangeFn = function handleOnChangeFn(field, target, modelField) {
  return function (ev) {
    field.onChange(ev);
    target.onChange(modelField.link.parse ? modelField.link.parse(ev.target.value) : ev.target.value);
  };
};

function mapFieldsToInputs(modelAdmin, fields) {
  var _props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var InputComponent = arguments.length <= 3 || arguments[3] === undefined ? _componentsInputsSmartInput2['default'] : arguments[3];

  return _lodash2['default'].map(fields, function (field, key) {
    var modelField = modelAdmin.fields[key] || modelAdmin.relationFields[key];

    _warning2['default'](modelField, '[fl-admin] Can\'t find modelField for key ' + key + ': is this key the field name instead of the virtual_id_accessor?');
    if (!modelField || modelField.hidden) return null;

    var props = _lodash2['default'].clone(_props);
    if (modelField.link) props.onChange = handleOnChangeFn(field, fields[modelField.link.to], modelField);

    return _react2['default'].createElement(InputComponent, _extends({
      key: key,
      modelField: modelField,
      formField: field
    }, props));
  });
}

var NO_LIST_EDIT = ['hasMany', 'manyToMany'];

function editFieldInline(field) {
  return field.listEdit && NO_LIST_EDIT.indexOf(field.type) === -1;
}