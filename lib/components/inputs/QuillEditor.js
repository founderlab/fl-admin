'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

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