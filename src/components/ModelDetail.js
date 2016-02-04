import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {Glyphicon} from 'react-bootstrap'
import createModelDetailForm from './generators/ModelDetailForm'
import warning from 'warning'

export default function ModelDetail(props) {

  const {model_admin, model_store, id, config, handleSaveFn, handleDeleteFn} = props
  const model_im = model_store.get('by_id').get(id)
  const model = model_im ? model_im.toJSON() : null
  warning(model, `[fl-admin] ModelDetail: Model ${model_admin.name} not loaded with id ${id}`)
  const ModelDetailForm = createModelDetailForm(model)
  const fields = _(model_admin.fields).map(f => f.virtual_id_accessor || f.key).compact().value()

  return (
    <div className="admin-detail">

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Link to={model_admin.link()}><Glyphicon glyph="chevron-left" />{model_admin.plural}</Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h1>{model_admin.display(model)}</h1>
            </div>
          </div>
        </div>
      </section>

      <ModelDetailForm
        formKey={model.id}
        model={model}
        model_admin={model_admin}
        config={config}
        onSubmit={handleSaveFn(model)}
        onDelete={handleDeleteFn(model)}
        fields={fields}
      />

    </div>
  )
}

ModelDetail.propTypes = {
  id: PropTypes.string,
  model_store: PropTypes.object,
  model_admin: PropTypes.object,
  // config: PropTypes.object,
  handleSaveFn: PropTypes.func,
  handleDeleteFn: PropTypes.func,
}
