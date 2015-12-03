'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createReducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _immutable = require('immutable');

function createReducer(model_admin) {

  var p_default_state = (0, _immutable.fromJS)({
    visible: [],
    current_page: 1,
    endless_page: 1
  });

  // loading: false,
  function pagination() {
    var _state = arguments.length <= 0 || arguments[0] === undefined ? p_default_state : arguments[0];

    var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var state = _state; //.merge({loading: false})
    if (action.type === model_admin.action_type + '_COUNT_SUCCESS') {
      return state.merge({ total: +action.res });
    }

    if (action.type === model_admin.action_type + '_DEL_SUCCESS') {
      var visible = state.get('visible');
      return state.merge({ visible: _lodash2['default'].without(visible, action.deleted_id) });
    }

    if (action.page && action.page !== state.current_page) {
      state = state.merge({ visible: _lodash2['default'].keys(action.by_id), current_page: action.page });
    }

    return state;
  }

  var default_state = (0, _immutable.fromJS)({
    by_id: {},
    pagination: pagination()
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
          pagination: pagination(state.pagination, action)
        });
        return ss;

      case model_admin.action_type + '_SAVE_SUCCESS':
        return state.mergeDeep({
          loading: false,
          errors: null,
          by_id: action.by_id
        });

      case model_admin.action_type + '_DEL_SUCCESS':
        var by_id = (state.get('by_id') || {}).toJSON();
        delete by_id[action.deleted_id];
        return state.merge({
          loading: false,
          errors: null,
          by_id: by_id,
          pagination: pagination(state.pagination, action)
        });

      case model_admin.action_type + '_COUNT_SUCCESS':
        return state.mergeDeep({
          pagination: pagination(state.pagination, action)
        });

      default:
        return state;

    }
  };
}

module.exports = exports['default'];