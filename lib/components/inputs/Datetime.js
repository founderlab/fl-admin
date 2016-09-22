'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = Datetime;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDatetime = require('react-datetime');

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function Datetime(props) {
  var classes = {
    'form-group': true,
    'form-group-sm': props.size === 'small',
    'form-group-lg': props.size === 'large'
  };
  return _react2['default'].createElement(
    'div',
    { className: _classnames2['default'](classes) },
    props.label ? _react2['default'].createElement(
      'label',
      { className: 'control-label' },
      props.label
    ) : null,
    _react2['default'].createElement(_reactDatetime2['default'], _extends({}, props, { defaultValue: '1/1/1970 12:00am' }))
  );
}

Datetime.propTypes = {
  label: _react.PropTypes.string,
  size: _react.PropTypes.string
};
module.exports = exports['default'];