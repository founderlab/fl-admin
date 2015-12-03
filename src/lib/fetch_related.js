import _ from 'lodash'
import Queue from 'queue-async'

function relatedQuery(model_store, model_ids, relation_field) {
  console.log('model_ids', model_ids)
  if (relation_field.type === 'belongsTo') {
    const related_ids = []
    _.forEach(model_store.get('by_id').toJSON(), (model, id) => {
      if (_.contains(model_ids, id)) related_ids.push(model[relation_field.virtual_id_accessor])
    })
    console.log('related_ids', related_ids)
    return {$ids: _.uniq(related_ids)}
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
        const related_query = relatedQuery(model_store, model_ids, relation_field)
        store.dispatch(relation_field.model_admin.actions.load(related_query, callback))
      })
    }
  })

  queue.await(callback)
}
