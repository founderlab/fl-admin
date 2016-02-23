import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Row, Col, Button, Glyphicon} from 'react-bootstrap'
import {reduxForm} from 'redux-form'
import {mapFieldsToInputs} from '../../lib'

export class ModelDetailForm extends React.Component {

  static propTypes = {
    model: PropTypes.object.isRequired,
    model_admin: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,

    // from redux-form
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const {model_admin, model, config, fields, handleSubmit, onDelete} = this.props
    const inputs = mapFieldsToInputs(model_admin, fields, {model, config, handleSubmit, size: 'large'})

    return (
      <div>
        <Row>
          <Col xs={12}>
            <form>
              {inputs}
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
  return reduxForm(
    {
      form: 'model_detail',
    },
    () => {
      return {
        initialValues: model,
      }
    }
  )(ModelDetailForm)
}
