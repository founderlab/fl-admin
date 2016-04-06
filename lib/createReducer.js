'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = createReducer;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _immutable = require('immutable');

var _flReactUtils = require('fl-react-utils');

function createReducer(model_admin) {

  var pagination = _flReactUtils.createPaginationReducer(model_admin.action_type);

  var p = pagination();
  var default_state = _immutable.fromJS({
    by_id: {},
    pagination: p
  });

  return function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? default_state : arguments[0];
    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    switch (action.type) {
      case model_admin.action_type + '_LOAD_START':
      case model_admin.action_type + '_SAVE_START':
      case model_admin.action_type + '_DEL_START':
        return state.merge({ loading: true, errors: null });

      case model_admin.action_type + '_LOAD_ERROR':
      case model_admin.action_type + '_SAVE_ERROR':
      case model_admin.action_type + '_DEL_ERROR':
        return state.merge({ loading: false, error: action.error || action.res.body.error });

      case model_admin.action_type + '_LOAD_SUCCESS':
        var ss = state.mergeDeep({
          loading: false,
          errors: null,
          by_id: action.by_id,
          pagination: pagination(state.get('pagination'), action)
        });
        return ss;

      case model_admin.action_type + '_SAVE_SUCCESS':
        return state.merge({
          loading: false,
          errors: null,
          last_saved: action.model
        }).mergeDeep({
          by_id: action.by_id
        });

      case model_admin.action_type + '_DEL_SUCCESS':
        var by_id = state.get('by_id').toJSON();
        delete by_id[action.deleted_model_id];
        return state.merge({
          loading: false,
          errors: null,
          by_id: by_id,
          pagination: pagination(state.get('pagination'), action)
        });

      case model_admin.action_type + '_COUNT_SUCCESS':
        return state.mergeDeep({
          pagination: pagination(state.get('pagination'), action)
        });

      default:
        return state;

    }
  };
}

module.exports = exports['default'];