'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = fetchRelated;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _queueAsync = require('queue-async');

var _queueAsync2 = _interopRequireDefault(_queueAsync);

function relatedQuery(model_store, model_ids, relation_field) {
  var _ref;

  console.log('model_ids', model_ids);
  if (relation_field.type === 'belongsTo') {
    var _ret = (function () {
      var related_ids = [];
      _lodash2['default'].forEach(model_store.get('by_id').toJSON(), function (model, id) {
        if (_lodash2['default'].contains(model_ids, id)) related_ids.push(model[relation_field.virtual_id_accessor]);
      });
      console.log('related_ids', related_ids);
      return {
        v: { $ids: _lodash2['default'].uniq(related_ids) }
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  }
  return _ref = {}, _ref[relation_field.relation.reverse_relation.virtual_id_accessor] = { $in: model_ids }, _ref;
}

// dispatch actions to load related models
// assumes the action to fetch models is called 'load'

function fetchRelated(options, callback) {
  var store = options.store;
  var model_admin = options.model_admin;
  var load_all = options.load_all;
  var model_ids = options.model_ids;

  var queue = new _queueAsync2['default']();
  var model_store = store.getState().admin[model_admin.path];

  _lodash2['default'].forEach(model_admin.relation_fields, function (relation_field) {
    if (load_all || relation_field.list_edit) {
      queue.defer(function (callback) {
        var related_query = relatedQuery(model_store, model_ids, relation_field);
        store.dispatch(relation_field.model_admin.actions.load(related_query, callback));
      });
    }
  });

  queue.await(callback);
}

module.exports = exports['default'];