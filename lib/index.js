'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = configure;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _redux = require('redux');

var _flReactUtils = require('fl-react-utils');

var _containersGeneratorsRelatedField = require('./containers/generators/RelatedField');

var _containersGeneratorsRelatedField2 = _interopRequireDefault(_containersGeneratorsRelatedField);

var _libNaming = require('./lib/naming');

var _createActions = require('./createActions');

var _createActions2 = _interopRequireDefault(_createActions);

var _createReducer = require('./createReducer');

var _createReducer2 = _interopRequireDefault(_createReducer);

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

var ACTION_PREFIX = 'FL_ADMIN_';
var model_admins = [];
var actions = {};
var reducers = {};
var reducer = undefined;

var defaults = {
  root_path: '/admin',
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
      return model.name || model.title;
    },
    sort: 'created_at',
    per_page: 50,
    list_delete: false,
    path: _libNaming.table(model_type),
    root_path: options.root_path,
    plural: _libNaming.plural(model_type),
    action_type: '' + ACTION_PREFIX + _libNaming.upper(model_type),
    fields: {},
    relation_fields: {}, //references the same fields as `fields` (relations only) but is indexed by virtual_id_accessor
    components: {}
  };

  _lodash2['default'].defaults(model_admin, defaults);

  // Ensure the display fn always gives a string of some sort
  var wrapDisplay = function wrapDisplay(oldDisplay) {
    return function (model) {
      var res = undefined;
      try {
        res = oldDisplay ? oldDisplay(model) : null;
      } catch (err) {
        res = null;
      }
      return res || (model && model.id ? '[No name: ' + model.id + ']' : 'A brand new ' + model_admin.name);
    };
  };
  model_admin.display = wrapDisplay(model_admin.display);

  // Function to generate the path to a models edit page
  if (!model_admin.link) {
    model_admin.link = function (model) {
      var model_id = model ? model.id || model : '';
      return options.root_path + '/' + model_admin.path + '/' + model_id;
    };
    model_admin.createLink = function () {
      return model_admin.link('create');
    };
  }

  var schema = model_type.schema && model_type.schema('schema');
  var fields = schema.fields || {};
  var relation_fields = schema.relations || {};

  // Make sure we have config for every field in the models schema
  _lodash2['default'].forEach(fields, function (model_field, key) {
    var admin_field = model_admin.fields[key] = model_admin.fields[key] || {};
    _lodash2['default'].defaults(admin_field, model_field);
    admin_field.key = admin_field.key || key;
  });

  // Make sure we have config for every relation
  _lodash2['default'].forEach(relation_fields, function (relation, key) {
    var admin_field = model_admin.relation_fields[relation.virtual_id_accessor] = model_admin.fields[key] = model_admin.fields[key] || {};
    _lodash2['default'].defaults(admin_field, _lodash2['default'].pick(relation, 'type', 'virtual_id_accessor', 'components'));
    admin_field.model_type = relation.reverse_model_type;
    admin_field.key = admin_field.key || key;
    admin_field.relation = relation;
  });

  // Generate actions and a reducer for this model type
  model_admin.actions = actions[model_admin.path] = _createActions2['default'](model_admin);
  model_admin.reducer = reducers[model_admin.path] = _createReducer2['default'](model_admin);

  if (!model_admin.components.Pagination) model_admin.components.Pagination = _flReactUtils.Pagination;

  return model_admin;
}

function configure(_options) {
  var options = _lodash2['default'].merge(defaults, _options);

  _lodash2['default'].forEach(options.models, function (model_descriptor) {
    model_admins.push(createModelAdmin(options, model_descriptor));
  });

  // Second pass too hook up related model_admins
  _lodash2['default'].forEach(model_admins, function (model_admin) {
    _lodash2['default'].forEach(model_admin.relation_fields, function (admin_field) {
      admin_field.model_admin = _lodash2['default'].find(model_admins, function (ma) {
        return ma.model_type === admin_field.model_type;
      });
      _warning2['default'](admin_field.model_admin, '[fl-admin] configure: Couldnt find model_admin for the relation ' + admin_field.key + ' of ' + model_admin.name);
      if (!admin_field.RelatedField) admin_field.RelatedField = _containersGeneratorsRelatedField2['default'](admin_field);
    });
  });

  exports.reducer = reducer = _redux.combineReducers(reducers);
}

exports.actions = actions;
exports.reducer = reducer;
exports.model_admins = model_admins;
exports.AdminRoute = _route2['default'];