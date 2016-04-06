'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = ModelTypeList;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactBootstrap = require('react-bootstrap');

var _index = require('../index');

// Landing page for the auto admin. Just links to all model index pages.

function ModelTypeList() {

  var links = _lodash2['default'].map(_index.model_admins, function (model_admin) {
    return _react2['default'].createElement(
      _reactBootstrap.Row,
      { key: model_admin.path },
      _react2['default'].createElement(
        _reactBootstrap.Col,
        { lg: 8, lgOffset: 1 },
        _react2['default'].createElement(
          _reactRouter.Link,
          { className: 'fla-model-type-list-link', to: model_admin.link() },
          model_admin.plural
        )
      )
    );
  });

  return _react2['default'].createElement(
    'section',
    { className: 'fla-model-type-list' },
    _react2['default'].createElement(
      _reactBootstrap.Grid,
      { fluid: true },
      _react2['default'].createElement(
        _reactBootstrap.Row,
        null,
        _react2['default'].createElement(
          _reactBootstrap.Col,
          { lg: 8, lgOffset: 1 },
          _react2['default'].createElement(
            'h1',
            null,
            'Admin Home'
          )
        )
      ),
      links
    )
  );
}

module.exports = exports['default'];