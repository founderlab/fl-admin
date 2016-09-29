'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHelmet = require('react-helmet');

var _reactHelmet2 = _interopRequireDefault(_reactHelmet);

var _flReactUtils = require('fl-react-utils');

var _componentsNavbar = require('../components/Navbar');

var _componentsNavbar2 = _interopRequireDefault(_componentsNavbar);

var _componentsSidebar = require('../components/Sidebar');

var _componentsSidebar2 = _interopRequireDefault(_componentsSidebar);

var _utilsHeaderTags = require('../utils/headerTags');

var _utilsHeaderTags2 = _interopRequireDefault(_utilsHeaderTags);

var Admin = (function (_React$Component) {
  _inherits(Admin, _React$Component);

  function Admin() {
    _classCallCheck(this, Admin);

    _React$Component.apply(this, arguments);
  }

  Admin.prototype.render = function render() {
    var sidebarProps = {
      sidebar: _react2['default'].createElement(_componentsSidebar2['default'], null),
      reactSidebarProps: {
        sidebarClassName: 'fla-sidebar'
      }
    };

    return _react2['default'].createElement(
      _flReactUtils.Sidebar,
      sidebarProps,
      _react2['default'].createElement(_reactHelmet2['default'], _extends({
        title: '',
        titleTemplate: '%s - admin'
      }, _utilsHeaderTags2['default'](this.props))),
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