'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _reactRouter = require('react-router');

var _reactRouterLibRouteUtils = require('react-router/lib/RouteUtils');

var _index = require('./index');

var _componentsAdmin = require('./components/Admin');

var _componentsAdmin2 = _interopRequireDefault(_componentsAdmin);

var _componentsModelTypeList = require('./components/ModelTypeList');

var _componentsModelTypeList2 = _interopRequireDefault(_componentsModelTypeList);

var _containersGeneratorsModelEditor = require('./containers/generators/ModelEditor');

var _containersGeneratorsModelEditor2 = _interopRequireDefault(_containersGeneratorsModelEditor);

var _lib = require('./lib');

var AdminRoute = (function (_Route) {
  _inherits(AdminRoute, _Route);

  _createClass(AdminRoute, null, [{
    key: 'propTypes',
    value: {
      path: _react.PropTypes.string,
      getComponent: _react.PropTypes.func,
      getComponents: _react.PropTypes.func,
      component: _reactRouter.PropTypes.component,
      components: _reactRouter.PropTypes.components
    },
    enumerable: true
  }]);

  function AdminRoute(options) {
    _classCallCheck(this, AdminRoute);

    _Route.call(this);
    _lodash2['default'].extend(this, options);
    if (!this.component) this.component = _componentsAdmin2['default'];
    this.indexRoute = { component: _componentsModelTypeList2['default'] };
  }

  AdminRoute.prototype.getChildRoutes = function getChildRoutes(location, callback) {
    var _this = this;

    if (!this.child_routes) {
      this.child_routes = [];

      _index.model_admins.forEach(function (model_admin) {
        _this.child_routes.push(model_admin.list_route || {
          path: model_admin.path,
          component: model_admin.list_component || _containersGeneratorsModelEditor2['default'](model_admin)
        });
        _this.child_routes.push(model_admin.detail_route || {
          path: model_admin.path + '/:id',
          component: model_admin.detail_component || _containersGeneratorsModelEditor2['default'](model_admin)
        });
      });
    }

    callback(null, this.child_routes);
  };

  // This method is used by react-router to go from a jsx entry to a route object
  // So we use it to check props and instantiate our base route

  AdminRoute.createRouteFromReactElement = function createRouteFromReactElement(element /*, parent*/) {
    var type = element.type;
    var props = _lodash2['default'].extend({}, element.type.defaultProps, element.props);

    if (type.propTypes) _lib.checkPropTypes(type.displayName || type.name, type.propTypes, props);

    if (props.children) {
      var child_routes = _reactRouterLibRouteUtils.createRoutesFromReactChildren(props.children, props);
      if (child_routes.length) props.child_routes = child_routes;
      delete props.children;
    }
    return new AdminRoute(props);
  };

  return AdminRoute;
})(_reactRouter.Route);

exports['default'] = AdminRoute;
module.exports = exports['default'];