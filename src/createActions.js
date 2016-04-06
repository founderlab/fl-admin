import _ from 'lodash' // eslint-disable-line

export default function createActions(model_admin) {
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

    count: (query, callback) => {
      return {
        type: actionType('count'),
        request: callback => model_type.count(query, callback),
        callback,
      }
    },

    load: (query, callback) => {
      if (!query.$sort) query.$sort = model_admin.sort
      return {
        type: actionType('load'),
        request: model_type.cursor(query),
        callback,
      }
    },

    loadPage: (page, query, callback) => {
      if (!query.$sort) query.$sort = model_admin.sort
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
      return {
        type: actionType('del'),
        request: callback => model_type.destroy({id: data.id}, callback),
        deleted_model_id: data.id,
        callback,
      }
    },

  }
}
