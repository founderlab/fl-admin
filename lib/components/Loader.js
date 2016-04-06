"use strict";

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

exports.__esModule = true;
exports["default"] = Loader;

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
          _react2["default"].createElement(
            "div",
            { className: "cssload-thecube" },
            _react2["default"].createElement("div", { className: "cssload-cube cssload-c1" }),
            _react2["default"].createElement("div", { className: "cssload-cube cssload-c2" }),
            _react2["default"].createElement("div", { className: "cssload-cube cssload-c4" }),
            _react2["default"].createElement("div", { className: "cssload-cube cssload-c3" })
          )
        )
      )
    )
  );
}

Loader.propTypes = {
  inline: _react.PropTypes.string
};
module.exports = exports["default"];