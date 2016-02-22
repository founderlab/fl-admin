import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {Grid, Row, Col, Glyphicon} from 'react-bootstrap'
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
    <section className="admin-detail">

      <Grid className="shadow-panel">
        <Row>
          <Col xs={12}>
            <Link to={model_admin.link()}><Glyphicon glyph="chevron-left" />{model_admin.plural}</Link>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h1>{model_admin.display(model)}</h1>
          </Col>
        </Row>
        <ModelDetailForm
          formKey={model.id}
          model={model}
          model_admin={model_admin}
          config={config}
          onSubmit={handleSaveFn(model)}
          onDelete={handleDeleteFn(model)}
          fields={fields}
        />
      </Grid>

    </section>
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
