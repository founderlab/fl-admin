'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = SmartInput;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _datetime = require('./datetime');

var _datetime2 = _interopRequireDefault(_datetime);

// import createRelatedField from '../../containers/generators/related_field'

function SmartInput(props) {
  var model = props.model;
  var model_field = props.model_field;
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
    return _react2['default'].createElement(model_field.RelatedField, { input_props: input_props });
  }

  // Datepicker
  if (model_field.type.toLowerCase() === 'date' || model_field.type.toLowerCase() === 'datetime') {
    return _react2['default'].createElement(_datetime2['default'], input_props);
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
  form_field: _react.PropTypes.object.isRequired,
  size: _react.PropTypes.string
};
module.exports = exports['default'];