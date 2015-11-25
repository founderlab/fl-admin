import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Input} from 'react-bootstrap'

export default function RelatedModelSelector(props) {

  const {relation_field, model, model_store, input_props} = props
  const models = model_store.get('by_id').toJSON ? model_store.get('by_id').toJSON() : {}
  const select_options = _.map(models, model => (<option key={model.id} value={model.id}>{model.id}</option>))
// console.log(model)
// console.log('relation_field', relation_field, input_props)

  if (relation_field.type === 'hasMany') input_props.multiple = true

  //redux-form onFocus is buggy as of v3.0.0, skip it
  return (
    <Input type="select" label={relation_field.key} {..._.omit(input_props, 'onFocus')} >
      {!input_props.multiple ? (<option value="null"></option>) : null}
      {select_options}
    </Input>
  )
}

RelatedModelSelector.propTypes = {
  relation_field: PropTypes.object,
  model_admin: PropTypes.object,
  model_store: PropTypes.object,
}
