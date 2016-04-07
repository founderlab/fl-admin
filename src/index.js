import _ from 'lodash'
import warning from 'warning'
import {combineReducers} from 'redux'
import {Pagination} from 'fl-react-utils'

import createRelatedField from './containers/generators/RelatedField'
import {table, plural, upper} from './lib/naming'
import createActions from './createActions'
import createReducer from './createReducer'
import AdminRoute from './route'

const ACTION_PREFIX = 'FL_ADMIN_'
const model_admins = []
const actions = {}
const reducers = {}
let reducer

const defaults = {
  root_path: '/admin',
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
    display: model => model.name || model.title,
    sort: 'created_at',
    per_page: 50,
    list_delete: false,
    path: table(model_type),
    root_path: options.root_path,
    plural: plural(model_type),
    action_type: `${ACTION_PREFIX}${upper(model_type)}`,
    fields: {},
    relation_fields: {}, //references the same fields as `fields` (relations only) but is indexed by virtual_id_accessor
    components: {},
  }

  _.defaults(model_admin, defaults)

  // Ensure the display fn always gives a string of some sort
  const wrapDisplay = oldDisplay => model => {
    let res
    try {
      res = oldDisplay ? oldDisplay(model) : null
    }
    catch (err) {
      res = null
    }
    return res || (model && model.id ? `[No name: ${model.id}]` : `A brand new ${model_admin.name}`)
  }
  model_admin.display = wrapDisplay(model_admin.display)

  // Function to generate the path to a models edit page
  if (!model_admin.link) {
    model_admin.link = model => {
      const model_id = model ? model.id || model : ''
      return `${options.root_path}/${model_admin.path}/${model_id}`
    }
    model_admin.createLink = () => model_admin.link('create')
  }

  const schema = model_type.schema && model_type.schema('schema')
  const fields = schema.fields || {}
  const relation_fields = schema.relations || {}

  // Make sure we have config for every field in the models schema
  _.forEach(fields, (model_field, key) => {
    const admin_field = model_admin.fields[key] = model_admin.fields[key] || {}
    _.defaults(admin_field, model_field)
    admin_field.key = admin_field.key || key
  })

  // Make sure we have config for every relation
  _.forEach(relation_fields, (relation, key) => {
    const admin_field = model_admin.relation_fields[relation.virtual_id_accessor] = model_admin.fields[key] = model_admin.fields[key] || {}
    _.defaults(admin_field, _.pick(relation, 'type', 'virtual_id_accessor', 'components'))
    admin_field.model_type = relation.reverse_model_type
    admin_field.key = admin_field.key || key
    admin_field.relation = relation
  })

  // Generate actions and a reducer for this model type
  model_admin.actions = actions[model_admin.path] = createActions(model_admin)
  model_admin.reducer = reducers[model_admin.path] = createReducer(model_admin)

  if (!model_admin.components.Pagination) model_admin.components.Pagination = Pagination

  return model_admin
}

export default function configure(_options) {
  const options = _.merge(defaults, _options)

  _.forEach(options.models, model_descriptor => {
    model_admins.push(createModelAdmin(options, model_descriptor))
  })

  // Second pass too hook up related model_admins
  _.forEach(model_admins, model_admin => {
    _.forEach(model_admin.relation_fields, admin_field => {
      admin_field.model_admin = _.find(model_admins, ma => ma.model_type === admin_field.model_type)
      warning(admin_field.model_admin, `[fl-admin] configure: Couldnt find model_admin for the relation ${admin_field.key} of ${model_admin.name}`)
      if (!admin_field.RelatedField) admin_field.RelatedField = createRelatedField(admin_field)
    })
  })

  reducer = combineReducers(reducers)
}

export {actions, reducer, model_admins, AdminRoute}
