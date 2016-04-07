import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Table} from 'react-bootstrap'
import createModelListForm from './generators/ModelListForm'
import {editFieldInline} from '../lib'

export default function ModelListTable(props) {
  const {models, model_admin, config, handleSaveFn, handleDeleteFn} = props

  const fields = {}
  _.forEach(model_admin.fields, (field, key) => {
    if (editFieldInline(field)) fields[key] = field
  })

  const model_list_rows = _.map(models, model => {
    const ModelListForm = createModelListForm(model)
    return (<ModelListForm
      key={model.id}
      formKey={model.id}
      model={model}
      model_admin={model_admin}
      config={config}
      onSubmit={handleSaveFn(model)}
      onDelete={handleDeleteFn(model)}
      fields={_.map(fields, f => f.virtual_id_accessor || f.key)}
    />)
  })

  const edit_fields = _.map(fields, (field, key) => (<th key={key} className="fla-list-edit-th">{key}</th>))
  const headings = [<th key="__fl_name" className="fla-name-th">model</th>]
    .concat(edit_fields)
    .concat(edit_fields.length ? [<th key="__fl_save" className="fla-save-th">save</th>] : [])
    .concat(model_admin.list_delete ? [<th key="__fl_delete" className="fla-delete-th">delete</th>] : [])

  return (
    <Table>
      <thead>
        <tr>
          {headings}
        </tr>
      </thead>
      <tbody>
        {model_list_rows}
      </tbody>
    </Table>
  )
}

ModelListTable.propTypes = {
  models: PropTypes.array.isRequired,
  model_admin: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  handleSaveFn: PropTypes.func.isRequired,
  handleDeleteFn: PropTypes.func.isRequired,
}
