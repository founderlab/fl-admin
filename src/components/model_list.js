import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {Table, Glyphicon, Button} from 'react-bootstrap'
import createModelListForm from './generators/model_list_form'
import {editFieldInline} from '../lib'

export default function ModelList(props) {
  const {model_admin, model_store, items_per_page, onAdd, handleSaveFn, handleDeleteFn} = props
  const {Pagination} = model_admin.components

  const fields = {}
  _.forEach(model_admin.fields, (field, key) => {
    if (editFieldInline(field)) fields[key] = field
  })

  const to_display = _.pick(model_store.get('by_id').toJSON(), model_store.get('pagination').get('visible').toJSON())

  const model_list_rows = _.map(to_display, model => {
    const ModelListForm = createModelListForm(model)

    return (<ModelListForm
      key={model.id}
      formKey={model.id}
      model={model}
      model_admin={model_admin}
      onSubmit={handleSaveFn(model)}
      onDelete={handleDeleteFn(model)}
      fields={_.map(fields, f => f.virtual_id_accessor || f.key)}
    />)
  })

  const edit_fields = _.map(fields, (field, key) => (<th key={key}>{key}</th>))
  const headings = [<th key="__fl_model">model</th>]
    .concat(edit_fields)
    .concat(edit_fields.length ? [<th key="__fl_save">save</th>] : [])
    .concat([<th key="__fl_delete">delete</th>])

  return (
    <div className="admin-list">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Link to={model_admin.root_path}><Glyphicon glyph="chevron-left" />Admin home</Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-1">
              <h1>{model_admin.plural}</h1>
              <Button bsStyle="primary" className="pull-right" onClick={onAdd}><Glyphicon glyph="plus" /></Button>
              <Pagination items_per_page={items_per_page} />
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
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

ModelList.propTypes = {
  model_store: PropTypes.object.isRequired,
  model_admin: PropTypes.object.isRequired,
  onAdd: PropTypes.func.isRequired,
  handleSaveFn: PropTypes.func.isRequired,
  handleDeleteFn: PropTypes.func.isRequired,
}
