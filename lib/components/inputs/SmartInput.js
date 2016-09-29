'use strict';

exports.__esModule = true;
exports['default'] = SmartInput;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _flReactUtils = require('fl-react-utils');

function SmartInput(_props) {
  var modelField = _props.modelField;

  var props = _objectWithoutProperties(_props, ['modelField']);

  // Type of text input specified
  var inputType = modelField.input || modelField.type || props.type;
  if (inputType) props.type = inputType.toLowerCase();

  // Options for select
  if (modelField.options) {
    props.type = 'react-select';
    props.options = modelField.options;
  }

  return _react2['default'].createElement(_flReactUtils.Input, props);
}

SmartInput.propTypes = {
  modelField: _react.PropTypes.object.isRequired
};
module.exports = exports['default'];