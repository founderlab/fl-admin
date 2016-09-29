import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import warning from 'warning'
import {Button, Glyphicon} from 'react-bootstrap'
import {Link} from 'react-router'
import {reduxForm, Field} from 'redux-form'
import SmartInput from '../inputs/SmartInput'
import shouldEditFieldInline from '../../utils/shouldEditFieldInline'

export class ModelListForm extends React.Component {

  static propTypes = {
    model: PropTypes.object.isRequired,
    modelAdmin: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,

    // from redux-form
    handleSubmit: PropTypes.func.isRequired,
  }

  render() {
    const {modelAdmin, model, handleSubmit, onDelete} = this.props
    const showSave = _.some(_.values(modelAdmin.fields).concat(_.values(modelAdmin.relationFields)), f => shouldEditFieldInline(f))

    return (
      <tr>
        <td className="fla-name-td">
          <Link to={modelAdmin.link(model)}>
            {modelAdmin.display(model)}
            <Glyphicon glyph="pencil" />
          </Link>
        </td>

        {_.map(modelAdmin.fields, (modelField, key) => {
          if (!shouldEditFieldInline(modelField)) return null
          return (
            <td key={key} className="fla-list-edit-td">
              <Field
                key={key}
                name={key}
                modelField={modelField}
                component={SmartInput}
              />
            </td>
          )
        })}

        {_.map(modelAdmin.relationFields, (modelField, key) => {
          if (!shouldEditFieldInline(modelField)) return null
          return (
            <td key={key} className="fla-list-edit-td">
              <Field
                key={key}
                name={key}
                model={model}
                modelField={modelField}
                component={modelField.RelatedInput}
              />
            </td>
          )
        })}

        {showSave ? (
          <td className="fla-save-td">
            <Button bsStyle="primary" onClick={handleSubmit}><Glyphicon glyph="ok" /></Button>
          </td>
        ) : null}
        {modelAdmin.listDelete && (
          <td className="fla-delete-td">
            <Button bsStyle="danger" bsSize="xsmall" onClick={onDelete}><Glyphicon glyph="remove" /></Button>
          </td>
        )}
      </tr>
    )
  }
}

export default function createModelListForm(model) {
  return reduxForm(
    {
      form: `model_list_row_${model.id}`,
      initialValues: model,
    },
  )(ModelListForm)
}
