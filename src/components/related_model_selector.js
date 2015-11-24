import _ from 'lodash'
import React, {PropTypes} from 'react'
import {Input} from 'react-bootstrap'

export default function RelatedModelSelector(props) {

  const {relation, model_admin, model_store, form_field} = props

// console.log('model_admin, model_admin', model_admin)
// console.log('relation, relation', relation)
  const models = model_store.get('by_id').toJSON ? model_store.get('by_id').toJSON() : {}
  console.log('model_store', model_admin.name, model_store.toJSON())
  // console.log('model_store.get', model_store.get('by_id'))
  // console.log('models', models)
  const select_options = _.map(models, model => {
    return (<option key={model.id} value={model.id}>{model.id}</option>)
  })

console.log('select_options', select_options)
  return (
    <Input type="select" label={relation.key} placeholder="" {...form_field}>
      <option value="null"></option>
      <option value="asd"></option>
      {select_options}
    </Input>
  )
}

RelatedModelSelector.propTypes = {
  relation: PropTypes.object,
  model_admin: PropTypes.object,
  model_store: PropTypes.object,
  form_field: PropTypes.object,
}
