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
    fields: {},
    relations: {} };

  //references the same fields as `fields` but is indexed by virtual_id_accessor
  _lodash2['default'].defaults(model_admin, defaults);

  var schema = model_type.schema && model_type.schema('schema');
  var fields = schema.fields || {};
  var relations = schema.relations || {};

  _lodash2['default'].forEach(fields, function (model_field, key) {
    var admin_field = model_admin.fields[key] = model_admin.fields[key] || {};
    _lodash2['default'].defaults(admin_field, model_field);
    admin_field.key = admin_field.key || key;
  });

  _lodash2['default'].forEach(relations, function (relation, key) {
    var admin_field = model_admin.relations[relation.virtual_id_accessor] = model_admin.fields[key] = model_admin.fields[key] || {};
    _lodash2['default'].defaults(admin_field, _lodash2['default'].pick(relation, 'type', 'virtual_id_accessor'));
    admin_field.model_type = relation.reverse_model_type;
    admin_field.key = admin_field.key || key;
    admin_field.relation = relation;
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

  // Second pass too hook up related model_admins
  _lodash2['default'].forEach(model_admins, function (model_admin) {
    _lodash2['default'].forEach(model_admin.fields, function (field) {
      if (!field.model_type) return;
      field.model_admin = _lodash2['default'].find(model_admins, function (ma) {
        return ma.model_type === field.model_type;
      });
    });
  });

  exports.reducer = reducer = (0, _redux.combineReducers)(reducers);
}

exports.actions = actions;
exports.reducer = reducer;
exports.model_admins = model_admins;
exports.AdminRoute = _route2['default'];