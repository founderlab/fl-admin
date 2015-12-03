'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createModelActions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
      var model = new model_type(data);
      return {
        type: actionType('del'),
        request: model.destroy.bind(model),
        deleted_model_id: model.id,
        callback: callback
      };
    }

  };
}

module.exports = exports['default'];