'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ModelTypeList;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _index = require('../index');

// Landing page for the auto admin. Just links to all model index pages.

function ModelTypeList() {

  var links = [];

  _lodash2['default'].forEach(_index.model_admins, function (model_admin) {
    links.push(_react2['default'].createElement(
      'div',
      { key: model_admin.path, className: 'row' },
      _react2['default'].createElement(
        'div',
        { className: 'col-lg-8 col-lg-offset-1' },
        _react2['default'].createElement(
          _reactRouter.Link,
          { to: '/admin/' + model_admin.path },
          model_admin.plural
        )
      )
    ));
  });

  return _react2['default'].createElement(
    'div',
    { className: 'admin' },
    _react2['default'].createElement(
      'section',
      null,
      _react2['default'].createElement(
        'div',
        { className: 'container' },
        _react2['default'].createElement(
          'div',
          { className: 'row' },
          _react2['default'].createElement(
            'div',
            { className: 'col-lg-8 col-lg-offset-1' },
            _react2['default'].createElement(
              'h1',
              null,
              'Admin Home'
            )
          )
        ),
        links
      )
    )
  );
}

module.exports = exports['default'];