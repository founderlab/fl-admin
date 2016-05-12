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

var _containersAdmin = require('./containers/Admin');

var _containersAdmin2 = _interopRequireDefault(_containersAdmin);

var _containersModelTypeList = require('./containers/ModelTypeList');

var _containersModelTypeList2 = _interopRequireDefault(_containersModelTypeList);

var _containersGeneratorsModelEditor = require('./containers/generators/ModelEditor');

var _containersGeneratorsModelEditor2 = _interopRequireDefault(_containersGeneratorsModelEditor);

var _containersGeneratorsModelCreate = require('./containers/generators/ModelCreate');

var _containersGeneratorsModelCreate2 = _interopRequireDefault(_containersGeneratorsModelCreate);

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
    if (!this.component) this.component = _containersAdmin2['default'];
    this.indexRoute = { component: _containersModelTypeList2['default'] };
  }

  AdminRoute.prototype.getChildRoutes = function getChildRoutes(location, callback) {
    var _this = this;

    if (!this.childRoutes) {
      this.childRoutes = [];

      _index.modelAdmins.forEach(function (modelAdmin) {
        _this.childRoutes.push(modelAdmin.listRoute || {
          path: modelAdmin.path,
          component: modelAdmin.ListComponent || _containersGeneratorsModelEditor2['default'](modelAdmin)
        });
        _this.childRoutes.push(modelAdmin.createRoute || {
          path: modelAdmin.path + '/create',
          component: modelAdmin.CreateComponent || _containersGeneratorsModelCreate2['default'](modelAdmin)
        });
        _this.childRoutes.push(modelAdmin.detailRoute || {
          path: modelAdmin.path + '/:id',
          component: modelAdmin.DetailComponent || _containersGeneratorsModelEditor2['default'](modelAdmin)
        });
      });
    }

    callback(null, this.childRoutes);
  };

  // This method is used by react-router to go from a jsx entry to a route object
  // So we use it to check props and instantiate our base route

  AdminRoute.createRouteFromReactElement = function createRouteFromReactElement(element /*, parent*/) {
    var type = element.type;
    var props = _lodash2['default'].extend({}, element.type.defaultProps, element.props);

    if (type.propTypes) _lib.checkPropTypes(type.displayName || type.name, type.propTypes, props);

    if (props.children) {
      var childRoutes = _reactRouterLibRouteUtils.createRoutesFromReactChildren(props.children, props);
      if (childRoutes.length) props.childRoutes = childRoutes;
      delete props.children;
    }
    return new AdminRoute(props);
  };

  return AdminRoute;
})(_reactRouter.Route);

exports['default'] = AdminRoute;
module.exports = exports['default'];