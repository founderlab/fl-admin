'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = createModelActions;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

function createModelActions(model_admin) {
  var actionType = function actionType(name) {
    return model_admin.action_type + '_' + name.toUpperCase();
  };
  var model_type = model_admin.model_type;

  return {
    loadOne: function loadOne(query, callback) {
      if (query === undefined) query = {};

      query.$one = true;
      return {
        type: actionType('load_one'),
        request: model_type.cursor(query),
        callback: callback
      };
    },

    count: function count(query, callback) {
      return {
        type: actionType('count'),
        request: function request(callback) {
          return model_type.count(query, callback);
        },
        callback: callback
      };
    },

    load: function load(query, callback) {
      return {
        type: actionType('load'),
        request: model_type.cursor(query),
        callback: callback
      };
    },

    loadPage: function loadPage(page, query, callback) {
      return {
        page: page,
        type: actionType('load'),
        request: model_type.cursor(query),
        callback: callback
      };
    },

    save: function save(data, callback) {
      var model = new model_type(data);
      return {
        type: actionType('save'),
        request: model.save.bind(model),
        callback: callback
      };
    },

    del: function del(data, callback) {
      return {
        type: actionType('del'),
        request: function request(callback) {
          return model_type.destroy({ id: data.id }, callback);
        },
        deleted_model_id: data.id,
        callback: callback
      };
    }

  };
}

module.exports = exports['default'];