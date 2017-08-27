import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Row, Col, Button, Glyphicon} from 'react-bootstrap'
import {reduxForm, Field} from 'redux-form'
import SmartInput from '../inputs/SmartInput'

export class ModelDetailForm extends React.Component {

  static propTypes = {
    model: PropTypes.object.isRequired,
    modelAdmin: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,

    // from redux-form
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const {modelAdmin, model, handleSubmit, onDelete} = this.props

    return (
      <div>
        <Row>
          <Col xs={12}>
            <form>
              {_.map(modelAdmin.fields, (modelField, key) => {
                if (!modelField || modelField.hidden) return null
                const fieldName = modelField.virtual_id_accessor || modelField.key || key

                if (modelField.readOnly && modelField.display) {
                  return (
                    <div key={key} className="form-group">
                      <label className="control-label">{modelField.label || fieldName}</label>
                      <div>{modelField.display(model)}</div>
                    </div>
                  )
                }

                return (
                  <Field
                    key={key}
                    name={fieldName}
                    model={model}
                    modelField={modelField}
                    label={modelField.label || fieldName}
                    component={modelField.RelatedField || SmartInput}
                  />
                )
              })}
            </form>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <Button bsStyle="danger" bsSize="xsmall" onClick={onDelete}><Glyphicon glyph="remove" /></Button>
          </Col>
          <Col xs={2} xsOffset={8}>
            <Button className="pull-right" bsStyle="primary" onClick={handleSubmit}>Save</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default function createModelDetailForm(model) {
  return reduxForm({
    form: 'model_detail',
    initialValues: model,
  })(ModelDetailForm)
}
