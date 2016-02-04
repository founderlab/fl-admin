import _ from 'lodash' // eslint-disable-line
import {fromJS} from 'immutable'
import {createPaginationReducer} from 'fl-react-utils'

export default function createReducer(model_admin) {

  const pagination = createPaginationReducer(model_admin.action_type)

  const p = pagination()
  const default_state = fromJS({
    by_id: {},
    pagination: p,
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
          pagination: pagination(state.get('pagination'), action),
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
          pagination: pagination(state.get('pagination'), action),
        })

      case model_admin.action_type + '_COUNT_SUCCESS':
        return state.mergeDeep({
          pagination: pagination(state.get('pagination'), action),
        })

      default:
        return state

    }
  }
}
