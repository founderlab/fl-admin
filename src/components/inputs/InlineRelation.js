import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Glyphicon, Button} from 'react-bootstrap'
import ModelListTable from '../ModelListTable'

export default function InlineRelation(props) {
  const {config, relation_field, model_store, label, onAdd, handleSaveFn, handleDeleteFn} = props
  const {model_admin} = relation_field
  const models = []//_.values(model_store.get('by_id').toJSON())
  const table_props = {models, model_admin, config, handleSaveFn, handleDeleteFn}

  return (
    <div>
      {label ? (<label className="control-label">{label}</label>) : null}
      <Button bsStyle="primary" className="pull-right" onClick={onAdd}><Glyphicon glyph="plus" /></Button>
      <ModelListTable {...table_props} />
    </div>
  )
}

InlineRelation.propTypes = {
  label: PropTypes.string.isRequired,
  relation_field: PropTypes.object.isRequired,

  model_store: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  handleSaveFn: PropTypes.func.isRequired,
  handleDeleteFn: PropTypes.func.isRequired,
}
