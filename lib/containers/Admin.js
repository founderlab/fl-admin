'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _flReactUtils = require('fl-react-utils');

var _componentsNavbar = require('../components/Navbar');

var _componentsNavbar2 = _interopRequireDefault(_componentsNavbar);

var _componentsSidebar = require('../components/Sidebar');

var _componentsSidebar2 = _interopRequireDefault(_componentsSidebar);

var _libHeaderTags = require('../lib/headerTags');

var _libHeaderTags2 = _interopRequireDefault(_libHeaderTags);

var Admin = (function (_React$Component) {
  _inherits(Admin, _React$Component);

  function Admin() {
    _classCallCheck(this, Admin);

    _React$Component.apply(this, arguments);
  }

  Admin.prototype.render = function render() {
    var sidebar_props = {
      sidebar: _react2['default'].createElement(_componentsSidebar2['default'], null),
      react_sidebar_props: {
        sidebarClassName: 'fla-sidebar'
      }
    };

    return _react2['default'].createElement(
      _flReactUtils.Sidebar,
      sidebar_props,
      _react2['default'].createElement(_reactHelmet2['default'], _extends({
        title: '',
        titleTemplate: '%s - admin'
      }, _libHeaderTags2['default'](this.props))),
      _react2['default'].createElement(
        'div',
        { className: 'fla-main' },
        _react2['default'].createElement(_componentsNavbar2['default'], null),
        this.props.children
      )
    );
  };

  _createClass(Admin, null, [{
    key: 'propTypes',
    value: {
      children: _react2['default'].PropTypes.node
    },
    enumerable: true
  }]);

  return Admin;
})(_react2['default'].Component);

exports['default'] = Admin;
module.exports = exports['default'];