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

function AdminNavbar() {

  return _react2['default'].createElement(
    _reactBootstrap.Navbar,
    { fluid: true },
    _react2['default'].createElement(
      _reactBootstrap.Nav,
      null,
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

AdminNavbar.propTypes = {};
module.exports = exports['default'];