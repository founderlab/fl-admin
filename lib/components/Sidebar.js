'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = Sidebar;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouterBootstrap = require('react-router-bootstrap');

var _reactBootstrap = require('react-bootstrap');

var _index = require('../index');

// Links to all model index pages for the sidebar

function Sidebar() {

  var links = _lodash2['default'].map(_index.modelAdmins, function (modelAdmin) {
    return _react2['default'].createElement(
      _reactRouterBootstrap.LinkContainer,
      { key: modelAdmin.path, to: modelAdmin.link() },
      _react2['default'].createElement(
        _reactBootstrap.NavItem,
        null,
        modelAdmin.plural
      )
    );
  });

  return _react2['default'].createElement(
    'div',
    null,
    _react2['default'].createElement(
      _reactRouter.Link,
      { to: '/admin', className: 'fla-sidebar-header' },
      _react2['default'].createElement(_reactBootstrap.Glyphicon, { glyph: 'ice-lolly-tasted' })
    ),
    _react2['default'].createElement(
      _reactBootstrap.Nav,
      { bsStyle: 'pills', stacked: true },
      links
    )
  );
}

module.exports = exports['default'];