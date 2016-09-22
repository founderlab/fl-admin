'use strict';

exports.__esModule = true;
exports['default'] = createReducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _immutable = require('immutable');

var _flReactUtils = require('fl-react-utils');

function createReducer(modelAdmin) {

  var pagination = _flReactUtils.createPaginationReducer(modelAdmin.actionType);

  var p = pagination();
  var defaultState = _immutable.fromJS({
    loading: false,
    errors: {},
    models: {},
    lastSaved: null,
    pagination: p
  });

  return function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? defaultState : arguments[0];
    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    switch (action.type) {
      case modelAdmin.actionType + '_LOAD_START':
      case modelAdmin.actionType + '_SAVE_START':
      case modelAdmin.actionType + '_DEL_START':
        return state.merge({ loading: true, errors: {} });

      case modelAdmin.actionType + '_LOAD_ERROR':
        return state.merge({ loading: false, errors: { load: action.error || action.res.body.error } });
      case modelAdmin.actionType + '_SAVE_ERROR':
        return state.merge({ loading: false, errors: { save: action.error || action.res.body.error } });
      case modelAdmin.actionType + '_DEL_ERROR':
        return state.merge({ loading: false, errors: { del: action.error || action.res.body.error } });

      case modelAdmin.actionType + '_LOAD_SUCCESS':
        var ss = state.mergeDeep({
          loading: false,
          errors: {},
          models: action.models,
          pagination: pagination(state.get('pagination'), action)
        });
        return ss;

      case modelAdmin.actionType + '_SAVE_SUCCESS':
        return state.merge({
          loading: false,
          errors: {},
          lastSaved: action.model
        }).mergeDeep({
          models: action.models
        });

      case modelAdmin.actionType + '_DEL_SUCCESS':
        var models = state.get('models').toJSON();
        delete models[action.deletedId];
        return state.merge({
          loading: false,
          errors: {},
          models: models,
          pagination: pagination(state.get('pagination'), action)
        });

      case modelAdmin.actionType + '_COUNT_SUCCESS':
        return state.mergeDeep({
          pagination: pagination(state.get('pagination'), action)
        });

      default:
        return state;

    }
  };
}

module.exports = exports['default'];