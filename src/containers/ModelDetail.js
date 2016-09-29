import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import warning from 'warning'
import {Link} from 'react-router'
import {Grid, Row, Col, Glyphicon} from 'react-bootstrap'
import createModelDetailForm from '../components/generators/ModelDetailForm'

export default function ModelDetail(props) {

  const {modelAdmin, modelStore, id, config, handleSaveFn, handleDeleteFn} = props
  const modelIm = modelStore.get('models').get(id)
  const model = modelIm ? modelIm.toJSON() : {}
  warning(model, `[fl-admin] ModelDetail: Model ${modelAdmin.name} not loaded with id ${id}`)
  const ModelDetailForm = createModelDetailForm(model)
  // const fields = _(modelAdmin.fields).map(f => f.virtual_id_accessor || f.key).compact().value()

  return (
    <section className="fla-model-detail">
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <Link to={modelAdmin.link()}><Glyphicon glyph="chevron-left" />{modelAdmin.plural}</Link>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <h1>{modelAdmin.display(model)}</h1>
          </Col>
        </Row>
        <ModelDetailForm
          formKey={model.id}
          model={model}
          modelAdmin={modelAdmin}
          config={config}
          onSubmit={handleSaveFn(model)}
          onDelete={handleDeleteFn(model)}
          // fields={fields}
        />
      </Grid>
    </section>
  )
}

ModelDetail.propTypes = {
  id: PropTypes.string,
  modelStore: PropTypes.object,
  modelAdmin: PropTypes.object,
  // config: PropTypes.object,
  handleSaveFn: PropTypes.func,
  handleDeleteFn: PropTypes.func,
}
