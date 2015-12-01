'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = Admin;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function Admin(props) {
  return _react2['default'].createElement(
    'div',
    null,
    props.children
  );
}

Admin.propTypes = {
  children: _react.PropTypes.node
};
module.exports = exports['default'];