import _ from 'lodash'
import Queue from 'queue-async'

export function onlyExistingRelationsFilter(model_ids, model_store, relation_field) {
  const related_ids = []
  _.forEach(model_store.get('by_id').toJSON(), (model, id) => {
    const related_id = model[relation_field.virtual_id_accessor]
    if (_.includes(model_ids, id) && related_id) related_ids.push(related_id)
  })
  if (!related_ids.length) return null
  return {$ids: _.uniq(related_ids)}
}

function relatedQuery(model_ids, model_store, relation_field) {
  if (relation_field.filter) {
    return relation_field.filter(model_ids, model_store, relation_field)
  }
  else if (relation_field.type === 'belongsTo') {
    return {}
  }
  return {[relation_field.relation.reverse_relation.virtual_id_accessor]: {$in: model_ids}}
}

// dispatch actions to load related models
// assumes the action to fetch models is called 'load'
export default function fetchRelated(options, callback) {
  const {store, model_admin, load_all, model_ids} = options
  const queue = new Queue()
  const model_store = store.getState().admin[model_admin.path]

  _.forEach(model_admin.relation_fields, relation_field => {
    if (load_all || relation_field.list_edit) {
      queue.defer(callback => {
        const related_query = relatedQuery(model_ids, model_store, relation_field)
        if (!related_query) return callback()
        store.dispatch(relation_field.model_admin.actions.load(related_query, callback))
      })
    }
  })

  queue.await(callback)
}
