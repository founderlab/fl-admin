import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Button, Glyphicon} from 'react-bootstrap'
import {Link} from 'react-router'
import {reduxForm} from 'redux-form'
import {mapFieldsToInputs} from '../../lib'

export class ModelListForm extends React.Component {

  static propTypes = {
    model: PropTypes.object.isRequired,
    model_admin: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  render() {
    const {model_admin, model, fields, handleSubmit, onDelete} = this.props
    const inputs = mapFieldsToInputs(model_admin, fields, {model, size: 'small'})
    const wrapped_inputs = _.map(inputs, (input, i) => (<td key={i}>{input}</td>))

    return (
      <tr>
        <td><Link to={`/admin/${model_admin.path}/${model.id}`}>{model_admin.display(model)}</Link></td>
        {wrapped_inputs}
        {inputs.length ? <td><Button bsStyle="primary" onClick={handleSubmit}><Glyphicon glyph="ok" /></Button></td> : null}
        <td><Button bsStyle="danger" bsSize="xsmall" onClick={onDelete}><Glyphicon glyph="remove" /></Button></td>
      </tr>
    )
  }
}

export default function createModelListForm(model) {
  console.log('initial model', model)
  return reduxForm(
    {
      form: 'model_list_row',
    },
    () => {
      return {
        initialValues: model,
      }
    }
  )(ModelListForm)
}
