'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

    var selectOptions = _lodash2['default'].map(options, function (value, name) {
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
      selectOptions
    );
  };

  return Select;
})(_react2['default'].Component);

exports['default'] = Select;

Select.propTypes = {
  options: _react.PropTypes.object.isRequired
};
module.exports = exports['default'];