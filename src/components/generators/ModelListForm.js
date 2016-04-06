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
    config: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,

    // from redux-form
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const {model_admin, model, config, fields, handleSubmit, onDelete} = this.props
    const inputs = mapFieldsToInputs(model_admin, fields, {model, config, handleSubmit, size: 'small'})
    const wrapped_inputs = _.map(inputs, (input, i) => (<td key={i} className="fla-list-edit-td">{input}</td>))

    return (
      <tr>
        <td className="fla-name-td">
          <Link to={model_admin.link(model)}>
            {model_admin.display(model)}
            <Glyphicon glyph="pencil" />
          </Link>
        </td>
        {wrapped_inputs}
        {inputs.length ? <td className="fla-save-td"><Button bsStyle="primary" onClick={handleSubmit}><Glyphicon glyph="ok" /></Button></td> : null}
        {model_admin.list_delete && <td className="fla-delete-td"><Button bsStyle="danger" bsSize="xsmall" onClick={onDelete}><Glyphicon glyph="remove" /></Button></td>}
      </tr>
    )
  }
}

export default function createModelListForm(model) {
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
