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

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Datetime = require('./Datetime');

var _Datetime2 = _interopRequireDefault(_Datetime);

var _FileUploader = require('./FileUploader');

var _FileUploader2 = _interopRequireDefault(_FileUploader);

var _QuillEditor = require('./QuillEditor');

var _QuillEditor2 = _interopRequireDefault(_QuillEditor);

function SmartInput(props) {
  var model = props.model;
  var model_field = props.model_field;
  var config = props.config;
  var form_field = props.form_field;
  var size = props.size;
  var handleSubmit = props.handleSubmit;

  var type = 'text';

  var input_props = _lodash2['default'].merge({
    handleSubmit: handleSubmit,
    label: size === 'large' ? model_field.key : null,
    bsSize: size,
    placeholder: model_field.key,
    help: form_field.touched && form_field.error
  }, form_field);

  // Related model of some sort
  if (model_field.RelatedField) {
    return _react2['default'].createElement(model_field.RelatedField, { model: model, input_props: input_props });
  }

  // Type of text input specified
  if (model_field.input) {
    var input_type = model_field.input.toLowerCase();

    if (input_type === 'textarea') {
      type = 'textarea';
    } else if (input_type === 'rich_text' || input_type === 'richtext') {
      return _react2['default'].createElement(_QuillEditor2['default'], input_props);
    } else {
      _warning2['default'](false, 'Unknown input for field ' + model_field.key + ': ' + input_type);
    }
  }

  // Select box
  if (model_field.options) {
    return _react2['default'].createElement(_Select2['default'], _extends({ options: model_field.options }, input_props));
  }

  // File uploader
  if (model_field.type.toLowerCase() === 'file') {
    return _react2['default'].createElement(_FileUploader2['default'], _extends({ size: size, config: config }, input_props));
  }

  // Datepicker
  if (model_field.type.toLowerCase() === 'date' || model_field.type.toLowerCase() === 'datetime') {
    return _react2['default'].createElement(_Datetime2['default'], input_props);
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
  size: _react.PropTypes.string,
  handleSubmit: _react.PropTypes.func.isRequired
};
module.exports = exports['default'];