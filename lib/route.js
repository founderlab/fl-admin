'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _reactRouter = require('react-router');

var _reactRouterLibRouteUtils = require('react-router/lib/RouteUtils');

var _index = require('./index');

var _componentsApp = require('./components/app');

var _componentsApp2 = _interopRequireDefault(_componentsApp);

var _componentsModel_type_list = require('./components/model_type_list');

var _componentsModel_type_list2 = _interopRequireDefault(_componentsModel_type_list);

var _containersGeneratorsModel_detail = require('./containers/generators/model_detail');

var _containersGeneratorsModel_detail2 = _interopRequireDefault(_containersGeneratorsModel_detail);

var _containersGeneratorsModel_list = require('./containers/generators/model_list');

var _containersGeneratorsModel_list2 = _interopRequireDefault(_containersGeneratorsModel_list);

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

    _get(Object.getPrototypeOf(AdminRoute.prototype), 'constructor', this).call(this);
    _lodash2['default'].extend(this, options);
    if (!this.component) this.component = _componentsApp2['default'];
    this.indexRoute = { component: _componentsModel_type_list2['default'] };
  }

  _createClass(AdminRoute, [{
    key: 'getChildRoutes',
    value: function getChildRoutes(location, callback) {
      var _this = this;

      if (!this.child_routes) {
        this.child_routes = [];

        _index.model_admins.forEach(function (model_admin) {
          _this.child_routes.push(model_admin.list_route || {
            path: model_admin.path,
            component: model_admin.list_component || (0, _containersGeneratorsModel_list2['default'])(model_admin)
          });
          _this.child_routes.push(model_admin.detail_route || {
            path: model_admin.path + '/:id',
            component: model_admin.detail_component || (0, _containersGeneratorsModel_detail2['default'])(model_admin)
          });
        });
      }

      callback(null, this.child_routes);
    }

    // This method is used by react-router to go from a jsx entry to a route object
    // So we use it to check props and instantiate our base route
  }], [{
    key: 'createRouteFromReactElement',
    value: function createRouteFromReactElement(element /*, parent*/) {
      var type = element.type;
      var props = _lodash2['default'].extend({}, element.type.defaultProps, element.props);

      if (type.propTypes) (0, _lib.checkPropTypes)(type.displayName || type.name, type.propTypes, props);

      if (props.children) {
        var child_routes = (0, _reactRouterLibRouteUtils.createRoutesFromReactChildren)(props.children, props);
        if (child_routes.length) props.child_routes = child_routes;
        delete props.children;
      }
      return new AdminRoute(props);
    }
  }]);

  return AdminRoute;
})(_reactRouter.Route);

exports['default'] = AdminRoute;
module.exports = exports['default'];