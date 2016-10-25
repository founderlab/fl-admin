'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = createActions;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function createActions(modelAdmin) {
  var actionType = function actionType(name) {
    return modelAdmin.actionType + '_' + name.toUpperCase();
  };
  var Model = modelAdmin.Model;

  return {
    loadOne: function loadOne(query, callback) {
      if (query === undefined) query = {};

      query.$one = true;
      return {
        type: actionType('load_one'),
        request: Model.cursor(query),
        callback: callback
      };
    },

    count: function count(query, callback) {
      return {
        type: actionType('count'),
        request: function request(callback) {
          return Model.count(query, callback);
        },
        callback: callback
      };
    },

    load: function load(query, callback) {
      if (!query.$sort && modelAdmin.sort) query.$sort = modelAdmin.sort;
      return {
        type: actionType('load'),
        request: Model.cursor(query),
        callback: callback
      };
    },

    loadPage: function loadPage(page, query, callback) {
      if (!query.$sort && modelAdmin.sort) query.$sort = modelAdmin.sort;
      return {
        page: page,
        type: actionType('load'),
        request: Model.cursor(query),
        callback: callback
      };
    },

    save: function save(data, callback) {
      var method = data.id ? 'put' : 'post';
      return {
        type: actionType('save'),
        request: _superagent2['default'][method](Model.prototype.urlRoot + '/' + data.id).send(data),
        callback: callback
      };
    },

    del: function del(data, callback) {
      return {
        type: actionType('del'),
        request: function request(callback) {
          return Model.destroy({ id: data.id }, callback);
        },
        deletedId: data.id,
        callback: callback
      };
    }

  };
}

module.exports = exports['default'];