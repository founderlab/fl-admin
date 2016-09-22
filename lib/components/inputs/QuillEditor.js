'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactQuill = require('react-quill');

var _reactQuill2 = _interopRequireDefault(_reactQuill);

var QuillEditor = (function (_React$Component) {
  _inherits(QuillEditor, _React$Component);

  function QuillEditor() {
    _classCallCheck(this, QuillEditor);

    _React$Component.apply(this, arguments);
  }

  QuillEditor.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      { className: 'fla-quill form-group form-group-lg' },
      this.props.label ? _react2['default'].createElement(
        'label',
        { className: 'control-label' },
        this.props.label
      ) : null,
      _react2['default'].createElement(_reactQuill2['default'], _extends({ defaultValue: this.props.initialValue, theme: 'snow' }, this.props))
    );
  };

  return QuillEditor;
})(_react2['default'].Component);

exports['default'] = QuillEditor;

QuillEditor.propTypes = {
  label: _react.PropTypes.string,
  initialValue: _react.PropTypes.string
};
module.exports = exports['default'];