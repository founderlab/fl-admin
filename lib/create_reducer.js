'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createReducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

function createReducer(model_admin) {
  var default_state = new _immutable2['default'].Map({ by_id: {} });

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

      // case model_admin.action_type + '_LOAD_ONE_SUCCESS':
      //   let models = state.get('models')
      //   const data = action.res.body
      //   models = models.set(data.id, data)
      //   return state.merge({
      //     loading: false,
      //     errors: null,
      //     models,
      //   })

      case model_admin.action_type + '_LOAD_SUCCESS':
        var ss = state.mergeDeep({
          loading: false,
          errors: null,
          by_id: action.by_id
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
        delete by_id[action.model_id];
        return state.merge({
          loading: false,
          errors: null,
          by_id: by_id
        });

      default:
        return state;

    }
  };
}

module.exports = exports['default'];