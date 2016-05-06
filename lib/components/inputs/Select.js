'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var Select = (function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select() {
    _classCallCheck(this, Select);

    _React$Component.apply(this, arguments);
  }

  Select.prototype.render = function render() {
    var options = this.props.options;

    var select_options = _lodash2['default'].map(options, function (value, name) {
      return _react2['default'].createElement(
        'option',
        { key: name, value: value },
        _inflection2['default'].humanize(name)
      );
    });

    //redux-form onFocus is buggy as of v3.0.0, skip it
    return _react2['default'].createElement(
      _reactBootstrap.Input,
      _extends({ type: 'select' }, _lodash2['default'].omit(this.props, 'onFocus')),
      _react2['default'].createElement('option', { value: null }),
      select_options
    );
  };

  return Select;
})(_react2['default'].Component);

exports['default'] = Select;

Select.propTypes = {
  options: _react.PropTypes.object.isRequired
};
module.exports = exports['default'];