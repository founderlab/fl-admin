'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports.onlyExistingRelationsFilter = onlyExistingRelationsFilter;
exports['default'] = fetchRelated;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _queueAsync = require('queue-async');

var _queueAsync2 = _interopRequireDefault(_queueAsync);

function onlyExistingRelationsFilter(modelIds, modelStore, relationField) {
  var relatedIds = [];
  _lodash2['default'].forEach(modelStore.get('models').toJSON(), function (model, id) {
    var relatedId = model[relationField.virtual_id_accessor];
    if (_lodash2['default'].includes(modelIds, id) && relatedId) relatedIds.push(relatedId);
  });
  if (!relatedIds.length) return null;
  return { $ids: _lodash2['default'].uniq(relatedIds) };
}

function relatedQuery(modelIds, modelStore, relationField) {
  var _ref2;

  if (relationField.filter) {
    return relationField.filter(modelIds, modelStore, relationField);
  } else if (relationField.type === 'belongsTo') {
    return {};
  }
  // Many to many
  else if (relationField.type === 'hasMany' && relationField.relation.reverse_relation.type === 'hasMany') {
      var _ref;

      return _ref = {}, _ref[relationField.relation.foreign_key] = { $in: modelIds }, _ref;
    }
  return _ref2 = {}, _ref2[relationField.relation.reverse_relation.virtual_id_accessor] = { $in: modelIds }, _ref2;
}

// dispatch actions to load related models
// assumes the action to fetch models is called 'load'

function fetchRelated(options, callback) {
  var store = options.store;
  var modelAdmin = options.modelAdmin;
  var loadAll = options.loadAll;
  var modelIds = options.modelIds;

  var _store$getState = store.getState();

  var auth = _store$getState.auth;
  var admin = _store$getState.admin;

  var modelStore = admin[modelAdmin.path];
  var queue = new _queueAsync2['default']();

  _lodash2['default'].forEach(modelAdmin.relationFields, function (relationField) {
    if (loadAll || relationField.listEdit) {
      queue.defer(function (callback) {
        var query = relatedQuery(modelIds, modelStore, relationField);
        if (!query) return callback();

        query.$user_id = auth.get('user').get('id');
        store.dispatch(relationField.modelAdmin.actions.load(query, callback));
      });
    }
  });

  queue.await(callback);
}