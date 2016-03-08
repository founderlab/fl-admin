"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

exports.__esModule = true;
exports["default"] = Admin;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function Admin(props) {
  return _react2["default"].createElement(
    "div",
    { className: "admin" },
    props.children
  );
}

Admin.propTypes = {
  children: _react.PropTypes.node
};
module.exports = exports["default"];