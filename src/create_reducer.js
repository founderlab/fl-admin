import _  from 'lodash'
import {fromJS} from 'immutable'

export default function createReducer(model_admin) {

  const p_default_state = fromJS({
    visible: [],
    current_page: 1,
    endless_page: 1,
    // loading: false,
  })

  function pagination(_state=p_default_state, action={}) {
    let state = _state//.merge({loading: false})

    if (action.type === model_admin.action_type + '_DEL_SUCCESS') {
      const visible = state.get('visible')
      return state.merge({visible: _.without(visible, action.deleted_id)})
    }

    if (action.page && (action.page !== state.current_page)) {
      state = state.merge({visible: _.keys(action.by_id), current_page: action.page})
    }

    return state
  }

  const default_state = fromJS({
    by_id: {},
    pagination: pagination(),
  })

  return function reducer(state=default_state, action={}) {

    switch (action.type) {
      case model_admin.action_type + '_LOAD_START':
      case model_admin.action_type + '_SAVE_START':
      case model_admin.action_type + '_DEL_START':
        return state.merge({loading: true, errors: null})

      case model_admin.action_type + '_LOAD_ERROR':
      case model_admin.action_type + '_SAVE_ERROR':
      case model_admin.action_type + '_DEL_ERROR':
        return state.merge({loading: false, error: action.error || action.res.body.error})

      case model_admin.action_type + '_LOAD_SUCCESS':
        const ss = state.mergeDeep({
          loading: false,
          errors: null,
          by_id: action.by_id,
          pagination: pagination(state.pagination, action),
        })
        return ss

      case model_admin.action_type + '_SAVE_SUCCESS':
        return state.mergeDeep({
          loading: false,
          errors: null,
          by_id: action.by_id,
        })

      case model_admin.action_type + '_DEL_SUCCESS':
        const by_id = (state.get('by_id') || {}).toJSON()
        delete by_id[action.deleted_id]
        return state.merge({
          loading: false,
          errors: null,
          by_id: by_id,
          pagination: pagination(state.pagination, action),
        })

      default:
        return state

    }
  }
}
