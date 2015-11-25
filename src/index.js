import _ from 'lodash'
import {combineReducers} from 'redux'

import {table, plural, upper} from './lib/naming'
import createActions from './create_actions'
import createReducer from './create_reducer'
import AdminRoute from './route'

const ACTION_PREFIX = 'FL_ADMIN_'
const model_admins = []
const actions = {}
const reducers = {}
let reducer

const defaults = {
  isAModel: (model_type) => !!model_type.schema,
}

function createModelAdmin(options, model_descriptor) {
  const model_admin = {}
  if (options.isAModel(model_descriptor)) model_admin.model_type = model_descriptor
  else if (_.isObject(model_descriptor)) _.merge(model_admin, model_descriptor)
  else throw new Error('[fl-admin] configure: Unrecognized model descriptor - provide a string or model or model_admin')

  const {model_type} = model_admin

  const defaults = {
    name: model_type.model_name,
    display: model => model.name || model.id,
    path: table(model_type),
    plural: plural(model_type),
    action_type: `${ACTION_PREFIX}${upper(model_type)}`,
    fields: {},
    relations: {}, //references the same fields as `fields` but is indexed by virtual_id_accessor
  }

  _.defaults(model_admin, defaults)

  const schema = model_type.schema && model_type.schema('schema')
  const fields = schema.fields || {}
  const relations = schema.relations || {}

  _.forEach(fields, (model_field, key) => {
    const admin_field = model_admin.fields[key] = model_admin.fields[key] || {}
    _.defaults(admin_field, model_field)
    admin_field.key = admin_field.key || key
  })

  _.forEach(relations, (relation, key) => {
    const admin_field = model_admin.relations[relation.virtual_id_accessor] = model_admin.fields[key] = model_admin.fields[key] || {}
    _.defaults(admin_field, _.pick(relation, 'type', 'virtual_id_accessor'))
    admin_field.model_type = relation.reverse_model_type
    admin_field.key = admin_field.key || key
    admin_field.relation = relation
  })

  model_admin.actions = actions[model_admin.path] = createActions(model_admin)
  model_admin.reducer = reducers[model_admin.path] = createReducer(model_admin)

  return model_admin
}

export default function configure(_options) {
  const options = _.merge(defaults, _options)

  _.forEach(options.models, model_descriptor => {
    model_admins.push(createModelAdmin(options, model_descriptor))
  })

  // Second pass too hook up related model_admins
  _.forEach(model_admins, model_admin => {
    _.forEach(model_admin.fields, field => {
      if (!field.model_type) return
      field.model_admin = _.find(model_admins, ma => ma.model_type === field.model_type)
    })
  })

  reducer = combineReducers(reducers)
}

export {actions, reducer, model_admins, AdminRoute}
