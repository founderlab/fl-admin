'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = fetchRelated;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _queueAsync = require('queue-async');

var _queueAsync2 = _interopRequireDefault(_queueAsync);

function relatedQuery(model_store, relation_field) {
  var ids = model_store.get('pagination').get('visible').toJSON();
  if (relation_field.type === 'belongsTo') {
    var _ret = (function () {
      var related_ids = [];
      _lodash2['default'].forEach(model_store.get('by_id').toJSON(), function (model, id) {
        if (_lodash2['default'].contains(ids, id)) related_ids.push(model[relation_field.virtual_id_accessor]);
      });
      return {
        v: { $ids: related_ids }
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  }
  return _defineProperty({}, relation_field.relation.reverse_relation.virtual_id_accessor, { $in: ids });
}

// dispatch actions to load related models
// assumes the action to fetch models is called 'load'

function fetchRelated(options, callback) {
  var store = options.store;
  var model_admin = options.model_admin;
  var load_all = options.load_all;

  var queue = new _queueAsync2['default']();

  _lodash2['default'].forEach(model_admin.relation_fields, function (relation_field) {
    if (load_all || relation_field.inline) {
      queue.defer(function (callback) {
        var related_query = relatedQuery(store.getState().admin[model_admin.path], relation_field);
        store.dispatch(relation_field.model_admin.actions.load(related_query, callback));
      });
    }
  });

  queue.await(callback);
}

module.exports = exports['default'];