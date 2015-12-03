import _ from 'lodash' // eslint-disable-line

export default function createModelActions(model_admin) {
  const actionType = name => `${model_admin.action_type}_${name.toUpperCase()}`
  const model_type = model_admin.model_type

  return {
    loadOne: (query={}, callback) => {
      query.$one = true
      return {
        type: actionType('load_one'),
        request: model_type.cursor(query),
        callback,
      }
    },

    load: (query, callback) => {
      return {
        type: actionType('load'),
        request: model_type.cursor(query),
        callback,
      }
    },

    loadPage: (page, query, callback) => {
      return {
        page,
        type: actionType('load'),
        request: model_type.cursor(query),
        callback,
      }
    },

    save: (data, callback) => {
      const model = new model_type(data)
      return {
        type: actionType('save'),
        request: model.save.bind(model),
        callback,
      }
    },

    del: (data, callback) => {
      const model = new model_type(data)
      return {
        type: actionType('del'),
        request: model.destroy.bind(model),
        deleted_model_id: model.id,
        callback,
      }
    },

  }
}
