import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Button, Glyphicon} from 'react-bootstrap'
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
        <section>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <form>
                  {inputs}
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-2">
                <Button bsStyle="danger" bsSize="xsmall" onClick={onDelete}><Glyphicon glyph="remove" /></Button>
              </div>
              <div className="col-xs-2 col-xs-offset-8">
                <Button className="pull-right" bsStyle="primary" onClick={handleSubmit}>Save</Button>
              </div>
            </div>
          </div>
        </section>
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
