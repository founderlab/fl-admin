'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = Datetime;

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