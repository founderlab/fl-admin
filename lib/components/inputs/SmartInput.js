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

var _flReactUtils = require('fl-react-utils');

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Datetime = require('./Datetime');

var _Datetime2 = _interopRequireDefault(_Datetime);

var _QuillEditor = require('./QuillEditor');

var _QuillEditor2 = _interopRequireDefault(_QuillEditor);

function SmartInput(props) {
  var model = props.model;
  var modelField = props.modelField;
  var config = props.config;
  var formField = props.formField;
  var size = props.size;
  var handleSubmit = props.handleSubmit;
  var onChange = props.onChange;

  var type = 'text';

  var inputProps = _lodash2['default'].merge({
    handleSubmit: handleSubmit,
    label: size === 'large' ? modelField.key : null,
    bsSize: size,
    placeholder: modelField.key,
    help: formField.touched && formField.error
  }, formField);
  if (onChange) inputProps.onChange = onChange;

  // Related model of some sort
  if (modelField.RelatedField) {
    return _react2['default'].createElement(modelField.RelatedField, { model: model, inputProps: inputProps });
  }

  // Type of text input specified
  if (modelField.input) {
    var inputType = modelField.input.toLowerCase();

    if (inputType === 'textarea') {
      type = 'textarea';
    } else if (inputType === 'rich' || inputType === 'richtext') {
      return _react2['default'].createElement(_QuillEditor2['default'], inputProps);
    } else {
      _warning2['default'](false, 'Unknown input for field ' + modelField.key + ': ' + inputType);
    }
  }

  // Select box
  if (modelField.options) {
    return _react2['default'].createElement(_Select2['default'], _extends({ options: modelField.options }, inputProps));
  }

  // File uploader
  if (modelField.type.toLowerCase() === 'file') {
    return _react2['default'].createElement(_flReactUtils.S3Uploader, { label: inputProps.label, size: size, config: config, inputProps: inputProps });
  }

  // Datepicker
  if (modelField.type.toLowerCase() === 'date' || modelField.type.toLowerCase() === 'datetime') {
    return _react2['default'].createElement(_Datetime2['default'], inputProps);
  }

  // Checkbox
  if (modelField.type.toLowerCase() === 'boolean') {
    type = 'checkbox';
    inputProps.label = modelField.key;
  }

  if (modelField.freeze && model.id) {
    return _react2['default'].createElement(
      _reactBootstrap.FormControls.Static,
      inputProps,
      formField.defaultValue
    );
  }

  // Bootstrap component
  return _react2['default'].createElement(_reactBootstrap.Input, _extends({ type: type }, inputProps));
}

SmartInput.propTypes = {
  model: _react.PropTypes.object.isRequired,
  modelField: _react.PropTypes.object.isRequired,
  config: _react.PropTypes.object.isRequired,
  formField: _react.PropTypes.object.isRequired,
  size: _react.PropTypes.string,
  handleSubmit: _react.PropTypes.func.isRequired,
  onChange: _react.PropTypes.func
};
module.exports = exports['default'];