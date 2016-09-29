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

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _containersGeneratorsRelatedField = require('./containers/generators/RelatedField');

var _containersGeneratorsRelatedField2 = _interopRequireDefault(_containersGeneratorsRelatedField);

var _utilsNaming = require('./utils/naming');

var _createActions = require('./createActions');

var _createActions2 = _interopRequireDefault(_createActions);

var _createReducer = require('./createReducer');

var _createReducer2 = _interopRequireDefault(_createReducer);

var _route = require('./route');

var _route2 = _interopRequireDefault(_route);

var ACTION_PREFIX = 'FL_ADMIN_';
var modelAdmins = [];
var actions = {};
var reducers = {};
var reducer = undefined;

var defaults = {
  rootPath: '/admin',
  isAModel: function isAModel(Model) {
    return !!Model.schema;
  }
};

function createModelAdmin(options, modelDescriptor) {
  var modelAdmin = {};
  if (options.isAModel(modelDescriptor)) modelAdmin.Model = modelDescriptor;else if (_lodash2['default'].isObject(modelDescriptor)) _lodash2['default'].merge(modelAdmin, modelDescriptor);else throw new Error('[fl-admin] configure: Unrecognized model descriptor - provide a string or model or modelAdmin');

  var Model = modelAdmin.Model;

  var defaults = {
    name: Model.modelName,
    display: function display(model) {
      return model.name || model.title;
    },
    // sort: null,
    perPage: 50,
    listDelete: false,
    rootPath: options.rootPath,
    path: _utilsNaming.table(Model),
    plural: _utilsNaming.plural(Model),
    actionType: '' + ACTION_PREFIX + _utilsNaming.upper(Model),
    fields: {},
    readOnlyFields: ['createdDate'],
    relationFields: {}, //references the same fields as `fields` (relations only) but is indexed by virtual_id_accessor
    components: {}
  };

  _lodash2['default'].defaults(modelAdmin, defaults);

  // Ensure the display fn always gives a string of some sort
  var wrapDisplay = function wrapDisplay(oldDisplay) {
    return function (model) {
      var res = undefined;
      try {
        res = oldDisplay ? oldDisplay(model) : null;
      } catch (err) {
        res = null;
      }
      return res || (model && model.id ? '[No name: ' + model.id + ']' : 'A brand new ' + modelAdmin.name);
    };
  };
  modelAdmin.display = wrapDisplay(modelAdmin.display);

  // Function to generate the path to a models edit page
  if (!modelAdmin.link) {
    modelAdmin.link = function (model) {
      var modelId = model ? model.id || model : '';
      return options.rootPath + '/' + modelAdmin.path + '/' + modelId;
    };
    modelAdmin.createLink = function () {
      return modelAdmin.link('create');
    };
  }

  var schema = Model.schema && Model.schema('schema');
  var fields = schema.fields || {};
  var relationFields = schema.relations || {};

  // Make sure we have config for every field in the models schema
  _lodash2['default'].forEach(fields, function (modelField, key) {
    var adminField = modelAdmin.fields[key] = modelAdmin.fields[key] || {};
    _lodash2['default'].defaults(adminField, modelField);
    adminField.key = adminField.key || key;
    adminField.label = adminField.label || _inflection2['default'].humanize(_inflection2['default'].underscore(key));
    if (_lodash2['default'].includes(modelAdmin.readOnlyFields, key)) adminField.input = 'static';
  });

  // Make sure we have config for every relation
  _lodash2['default'].forEach(relationFields, function (relation, key) {
    var adminField = modelAdmin.relationFields[relation.virtual_id_accessor] = modelAdmin.fields[key] = modelAdmin.fields[key] || {};
    _lodash2['default'].defaults(adminField, _lodash2['default'].pick(relation, 'type', 'virtual_id_accessor', 'components'));
    adminField.Model = relation.reverse_model_type;
    adminField.key = adminField.key || key;
    adminField.label = adminField.label || _inflection2['default'].humanize(_inflection2['default'].underscore(key));
    adminField.relation = relation;
  });

  // Generate actions and a reducer for this model type
  modelAdmin.actions = actions[modelAdmin.path] = _createActions2['default'](modelAdmin);
  modelAdmin.reducer = reducers[modelAdmin.path] = _createReducer2['default'](modelAdmin);

  if (!modelAdmin.components.Pagination) modelAdmin.components.Pagination = _flReactUtils.Pagination;

  return modelAdmin;
}

function configure(_options) {
  var options = _lodash2['default'].merge(defaults, _options);

  _lodash2['default'].forEach(options.models, function (modelDescriptor) {
    modelAdmins.push(createModelAdmin(options, modelDescriptor));
  });

  // Second pass too hook up related modelAdmins
  _lodash2['default'].forEach(modelAdmins, function (modelAdmin) {
    _lodash2['default'].forEach(modelAdmin.relationFields, function (adminField) {
      adminField.modelAdmin = _lodash2['default'].find(modelAdmins, function (ma) {
        return ma.Model === adminField.Model;
      });
      _warning2['default'](adminField.modelAdmin, '[fl-admin] configure: Couldnt find modelAdmin for the relation ' + adminField.key + ' of ' + modelAdmin.name);
      if (!adminField.RelatedField) adminField.RelatedField = _containersGeneratorsRelatedField2['default'](adminField);
    });
  });

  exports.reducer = reducer = _redux.combineReducers(reducers);
}

exports.actions = actions;
exports.reducer = reducer;
exports.modelAdmins = modelAdmins;
exports.AdminRoute = _route2['default'];