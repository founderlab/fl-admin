import _ from 'lodash' // eslint-disable-line
import request from 'superagent'

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
      console.log('Model url', Model.url(data.id))
      const model = new Model(_.omit(data, 'createdDate'))
      console.log('saving model', model.attributes)
      model.set({tag_ids: data.tag_ids})
      console.log('saving model 2', model.attributes)
      model.set({tags: data.tag_ids})
      console.log('saving model 3', model.attributes)
      return {
        type: actionType('save'),
        // request: model.save.bind(model),
        request: request(Model.url(data.id)).send(data),
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
