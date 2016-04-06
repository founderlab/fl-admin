'use strict';

var _reactTransformCatchErrors2 = require('react-transform-catch-errors');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _reactTransformCatchErrors3 = _interopRequireDefault(_reactTransformCatchErrors2);

var _react = require('react');

var _redboxReact = require('redbox-react');

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

exports.__esModule = true;

var _react2 = _interopRequireDefault(_react);

var _reactSidebar = require('react-sidebar');

var _reactSidebar2 = _interopRequireDefault(_reactSidebar);

var _componentsNavbar = require('../components/Navbar');

var _componentsNavbar2 = _interopRequireDefault(_componentsNavbar);

var _componentsSidebar = require('../components/Sidebar');

var _componentsSidebar2 = _interopRequireDefault(_componentsSidebar);

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

  _createClass(Admin, null, [{
    key: 'propTypes',
    value: {
      children: _react2['default'].PropTypes.node
    },
    enumerable: true
  }]);

  function Admin() {
    var _this = this;

    _classCallCheck(this, _Admin);

    _React$Component.call(this);

    this.onSetOpen = function (open) {
      _this.setState({ open: open });
    };

    this.mediaQueryChanged = function () {
      _this.setState({ docked: _this.state.mql && _this.state.mql.matches });
    };

    this.handleSidebarToggle = function (ev) {
      _this.setState({ open: !_this.state.open });
      if (ev) ev.preventDefault();
    };

    this.state = { docked: false, open: false };
  }

  Admin.prototype.componentWillMount = function componentWillMount() {
    if (typeof window === 'undefined') return;
    var mql = window.matchMedia('(min-width: 768px)');
    mql.addListener(this.mediaQueryChanged);
    this.setState({ mql: mql, docked: mql.matches });
  };

  Admin.prototype.componentWillUnmount = function componentWillUnmount() {
    this.state.mql && this.state.mql.removeListener(this.mediaQueryChanged);
  };

  Admin.prototype.render = function render() {
    var sidebar_props = {
      sidebar: _react2['default'].createElement(_componentsSidebar2['default'], null),
      sidebarClassName: 'fla-sidebar',
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen
    };

    return _react2['default'].createElement(
      _reactSidebar2['default'],
      sidebar_props,
      _react2['default'].createElement(
        'div',
        { className: 'fla-main' },
        _react2['default'].createElement(_componentsNavbar2['default'], { show_sidebar_toggle: !this.state.docked, onToggleSidebar: this.handleSidebarToggle }),
        this.props.children
      )
    );
  };

  var _Admin = Admin;
  Admin = _wrapComponent('_$Admin')(Admin) || Admin;
  return Admin;
})(_react2['default'].Component);

exports['default'] = Admin;
module.exports = exports['default'];