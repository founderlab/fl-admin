import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Table} from 'react-bootstrap'
import createModelListForm from './generators/ModelListForm'
import {editFieldInline} from '../lib'

export default function ModelListTable(props) {
  const {models, modelAdmin, config, handleSaveFn, handleDeleteFn} = props

  const fields = {}
  _.forEach(modelAdmin.fields, (field, key) => {
    if (editFieldInline(field)) fields[key] = field
  })

  const modelListRows = _.map(models, model => {
    const ModelListForm = createModelListForm(model)
    return (<ModelListForm
      key={model.id}
      formKey={model.id}
      model={model}
      modelAdmin={modelAdmin}
      config={config}
      onSubmit={handleSaveFn(model)}
      onDelete={handleDeleteFn(model)}
      fields={_.map(fields, f => f.virtual_id_accessor || f.key)}
    />)
  })

  const editFields = _.map(fields, (field, key) => (<th key={key} className="fla-list-edit-th">{key}</th>))
  const headings = [<th key="fl-name" className="fla-name-th">model</th>]
    .concat(editFields)
    .concat(editFields.length ? [<th key="fl-save" className="fla-save-th">save</th>] : [])
    .concat(modelAdmin.listDelete ? [<th key="fl-delete" className="fla-delete-th">delete</th>] : [])

  return (
    <Table>
      <thead>
        <tr>
          {headings}
        </tr>
      </thead>
      <tbody>
        {modelListRows}
      </tbody>
    </Table>
  )
}

ModelListTable.propTypes = {
  models: PropTypes.array.isRequired,
  modelAdmin: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  handleSaveFn: PropTypes.func.isRequired,
  handleDeleteFn: PropTypes.func.isRequired,
}
