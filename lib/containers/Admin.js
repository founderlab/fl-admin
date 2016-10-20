'use strict';

var _reactTransformCatchErrors2 = require('react-transform-catch-errors');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _reactTransformCatchErrors3 = _interopRequireDefault(_reactTransformCatchErrors2);

var _react = require('react');

var _redboxReact = require('redbox-react');

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

exports.__esModule = true;

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

var _components = {
  _$Admin: {
    displayName: 'Admin'
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/containers/Admin.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

var Admin = (function (_React$Component) {
  _inherits(Admin, _React$Component);

  function Admin() {
    _classCallCheck(this, _Admin);

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

  var _Admin = Admin;
  Admin = _wrapComponent('_$Admin')(Admin) || Admin;
  return Admin;
})(_react2['default'].Component);

exports['default'] = Admin;
module.exports = exports['default'];