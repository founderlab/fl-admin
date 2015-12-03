import _ from 'lodash'
import Queue from 'queue-async'

function relatedQuery(model_store, relation_field) {
  const ids = model_store.get('pagination').get('visible').toJSON()
  if (relation_field.type === 'belongsTo') {
    const related_ids = []
    _.forEach(model_store.get('by_id').toJSON(), (model, id) => {
      if (_.contains(ids, id)) related_ids.push(model[relation_field.virtual_id_accessor])
    })
    return {$ids: related_ids}
  }
  return {[relation_field.relation.reverse_relation.virtual_id_accessor]: {$in: ids}}
}

// dispatch actions to load related models
// assumes the action to fetch models is called 'load'
export default function fetchRelated(options, callback) {
  const {store, model_admin, load_all} = options
  const queue = new Queue()

  _.forEach(model_admin.relation_fields, relation_field => {
    if (load_all || relation_field.inline) {
      queue.defer(callback => {
        const related_query = relatedQuery(store.getState().admin[model_admin.path], relation_field)
        store.dispatch(relation_field.model_admin.actions.load(related_query, callback))
      })
    }
  })

  queue.await(callback)
}
