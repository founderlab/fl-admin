'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = AdminNavbar;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

function AdminNavbar(_ref) {
  var show_sidebar_toggle = _ref.show_sidebar_toggle;
  var onToggleSidebar = _ref.onToggleSidebar;

  return _react2['default'].createElement(
    _reactBootstrap.Navbar,
    { fluid: true },
    _react2['default'].createElement(
      _reactBootstrap.Nav,
      null,
      show_sidebar_toggle && _react2['default'].createElement(
        'li',
        { className: 'pull-left' },
        _react2['default'].createElement(
          'a',
          { onClick: onToggleSidebar },
          _react2['default'].createElement(_reactBootstrap.Glyphicon, { glyph: 'menu-hamburger' })
        )
      ),
      _react2['default'].createElement(
        'li',
        { className: 'pull-right' },
        _react2['default'].createElement(
          'a',
          { href: '/logout' },
          'Logout'
        )
      )
    )
  );
}

AdminNavbar.propTypes = {
  show_sidebar_toggle: _react2['default'].PropTypes.bool.isRequired,
  onToggleSidebar: _react2['default'].PropTypes.func.isRequired
};
module.exports = exports['default'];