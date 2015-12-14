'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = SmartInput;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _DatetimeInput = require('./DatetimeInput');

var _DatetimeInput2 = _interopRequireDefault(_DatetimeInput);

var _FileUploader = require('./FileUploader');

var _FileUploader2 = _interopRequireDefault(_FileUploader);

function SmartInput(props) {
  var model = props.model;
  var model_field = props.model_field;
  var config = props.config;
  var form_field = props.form_field;
  var size = props.size;

  var type = 'text';

  var input_props = _lodash2['default'].merge({
    label: size === 'large' ? model_field.key : null,
    bsSize: size,
    placeholder: model_field.key,
    help: form_field.touched && form_field.error
  }, form_field);

  // Related model of some sort
  if (model_field.RelatedField) {
    return _react2['default'].createElement(model_field.RelatedField, { model: model, input_props: input_props });
  }

  // File uploader
  if (model_field.type.toLowerCase() === 'file') {
    return _react2['default'].createElement(_FileUploader2['default'], { size: size, config: config, input_props: input_props });
  }

  // Datepicker
  if (model_field.type.toLowerCase() === 'date' || model_field.type.toLowerCase() === 'datetime') {
    return _react2['default'].createElement(_DatetimeInput2['default'], input_props);
  }

  // Checkbox
  if (model_field.type.toLowerCase() === 'boolean') {
    type = 'checkbox';
    input_props.label = model_field.key;
  }

  // Bootstrap component
  return _react2['default'].createElement(_reactBootstrap.Input, _extends({ type: type }, input_props));
}

SmartInput.propTypes = {
  model: _react.PropTypes.object.isRequired,
  model_field: _react.PropTypes.object.isRequired,
  config: _react.PropTypes.object.isRequired,
  form_field: _react.PropTypes.object.isRequired,
  size: _react.PropTypes.string
};
module.exports = exports['default'];