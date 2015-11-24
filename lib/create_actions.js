'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = createModelActions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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
        parseResponse: function parseResponse(action) {
          var by_id = {};
          var models = action.res ? action.res.body || action.res : [];
          _lodash2['default'].forEach(models, function (model) {
            return by_id[model.id] = _lodash2['default'].omit(model, '_rev');
          });
          return _extends({ by_id: by_id }, action);
        },
        callback: callback
      };
    },

    save: function save(data, callback) {
      var model = new model_type(data);
      return {
        type: actionType('save'),
        request: model.save.bind(model),
        parseResponse: function parseResponse(action) {
          var model_json = action.res ? action.res.toJSON() : {};
          action.by_id = _defineProperty({}, model_json.id, model_json);
          return action;
        },
        callback: callback
      };
    },

    del: function del(data, callback) {
      var model = new model_type(data);
      return {
        type: actionType('del'),
        request: model.destroy.bind(model),
        parseResponse: function parseResponse(action) {
          return _extends({ model_id: model.id }, action);
        },
        callback: callback
      };
    }

  };
}

module.exports = exports['default'];