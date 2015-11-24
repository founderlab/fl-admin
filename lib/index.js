'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = configure;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _redux = require('redux');

var _libNaming = require('./lib/naming');

var _create_actions = require('./create_actions');

var _create_actions2 = _interopRequireDefault(_create_actions);

var _create_reducer = require('./create_reducer');

var _create_reducer2 = _interopRequireDefault(_create_reducer);

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

var ACTION_PREFIX = 'FL_ADMIN_';
var model_admins = [];
var actions = {};
var reducers = {};
var reducer = undefined;

var defaults = {
  isAModel: function isAModel(model_type) {
    return !!model_type.schema;
  }
};

function createModelAdmin(options, model_descriptor) {
  var model_admin = {};
  if (options.isAModel(model_descriptor)) model_admin.model_type = model_descriptor;else if (_lodash2['default'].isObject(model_descriptor)) _lodash2['default'].merge(model_admin, model_descriptor);else throw new Error('[fl-admin] configure: Unrecognized model descriptor - provide a string or model or model_admin');

  var model_type = model_admin.model_type;

  var defaults = {
    name: model_type.model_name,
    display: function display(model) {
      return model.name || model.id;
    },
    path: (0, _libNaming.table)(model_type),
    plural: (0, _libNaming.plural)(model_type),
    action_type: '' + ACTION_PREFIX + (0, _libNaming.upper)(model_type),
    fields: {}
  };

  _lodash2['default'].defaults(model_admin, defaults);

  var model_fields = (model_type.schema ? model_type.schema('schema').fields : model_type.fields) || {};
  _lodash2['default'].forEach(model_fields, function (model_field, name) {
    var admin_field = model_admin.fields[name] = model_admin.fields[name] || {};
    _lodash2['default'].defaults(admin_field, model_field);
    admin_field.name = admin_field.name || name;
  });

  model_admin.actions = actions[model_admin.path] = (0, _create_actions2['default'])(model_admin);
  model_admin.reducer = reducers[model_admin.path] = (0, _create_reducer2['default'])(model_admin);

  return model_admin;
}

function configure(_options) {
  var options = _lodash2['default'].merge(defaults, _options);

  _lodash2['default'].forEach(options.models, function (model_descriptor) {
    model_admins.push(createModelAdmin(options, model_descriptor));
  });

  exports.reducer = reducer = (0, _redux.combineReducers)(reducers);
}

exports.actions = actions;
exports.reducer = reducer;
exports.model_admins = model_admins;
exports.AdminRoute = _route2['default'];