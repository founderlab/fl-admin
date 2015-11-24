"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Loader;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function Loader(props) {
  if (props.inline) return _react2["default"].createElement(
    "span",
    null,
    "loading..."
  );
  return _react2["default"].createElement(
    "section",
    null,
    _react2["default"].createElement(
      "div",
      { className: "container" },
      _react2["default"].createElement(
        "div",
        { className: "row" },
        _react2["default"].createElement(
          "div",
          { className: "col-lg-12" },
          "loading..."
        )
      )
    )
  );
}

Loader.propTypes = {
  inline: _react.PropTypes.string
};
module.exports = exports["default"];