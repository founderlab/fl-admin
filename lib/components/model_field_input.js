'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var FieldInput = (function (_React$Component) {
  _inherits(FieldInput, _React$Component);

  function FieldInput() {
    _classCallCheck(this, FieldInput);

    _get(Object.getPrototypeOf(FieldInput.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(FieldInput, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var model_field = _props.model_field;
      var form_field = _props.form_field;
      var size = _props.size;

      console.log('model_field, form_field', model_field, form_field);
      var type = 'text';
      return _react2['default'].createElement(_reactBootstrap.Input, _extends({
        type: type,
        label: size === 'large' ? model_field.name : null,
        bsSize: size,
        placeholder: model_field.name,
        help: form_field.touched && form_field.error
      }, form_field));
    }
  }], [{
    key: 'propTypes',
    value: {
      model_field: _react.PropTypes.object.isRequired,
      form_field: _react.PropTypes.object.isRequired,
      size: _react.PropTypes.string
    },
    enumerable: true
  }]);

  return FieldInput;
})(_react2['default'].Component);

exports['default'] = FieldInput;
module.exports = exports['default'];