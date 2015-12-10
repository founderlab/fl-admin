'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = DatetimeInput;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDatetime = require('react-datetime');

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

function DatetimeInput(props) {
  return _react2['default'].createElement(
    'div',
    { className: 'form-group form-group-lg' },
    props.label ? _react2['default'].createElement(
      'label',
      { className: 'control-label' },
      props.label
    ) : null,
    _react2['default'].createElement(_reactDatetime2['default'], props)
  );
}

DatetimeInput.propTypes = {
  label: _react.PropTypes.string,
  size: _react.PropTypes.string
};
module.exports = exports['default'];