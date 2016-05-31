import _ from 'lodash' // eslint-disable-line

export default function createActions(modelAdmin) {
  const actionType = name => `${modelAdmin.actionType}_${name.toUpperCase()}`
  const {Model} = modelAdmin

  return {
    loadOne: (query={}, callback) => {
      query.$one = true
      return {
        type: actionType('load_one'),
        request: Model.cursor(query),
        callback,
      }
    },

    count: (query, callback) => {
      return {
        type: actionType('count'),
        request: callback => Model.count(query, callback),
        callback,
      }
    },

    load: (query, callback) => {
      if (!query.$sort && modelAdmin.sort) query.$sort = modelAdmin.sort
      return {
        type: actionType('load'),
        request: Model.cursor(query),
        callback,
      }
    },

    loadPage: (page, query, callback) => {
      if (!query.$sort&& modelAdmin.sort) query.$sort = modelAdmin.sort
      return {
        page,
        type: actionType('load'),
        request: Model.cursor(query),
        callback,
      }
    },

    save: (data, callback) => {
      const model = new Model(data)
      return {
        type: actionType('save'),
        request: model.save.bind(model),
        callback,
      }
    },

    del: (data, callback) => {
      return {
        type: actionType('del'),
        request: callback => Model.destroy({id: data.id}, callback),
        deletedId: data.id,
        callback,
      }
    },

  }
}
