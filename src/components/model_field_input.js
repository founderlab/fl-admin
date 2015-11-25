import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Input} from 'react-bootstrap'
import createRelatedField from '../containers/generators/related_field'

export default class FieldInput extends React.Component {
  static propTypes = {
    model: PropTypes.object.isRequired,
    model_field: PropTypes.object.isRequired,
    form_field: PropTypes.object.isRequired,
    size: PropTypes.string,
  }

  render() {
    const {model, model_field, form_field, size} = this.props
    const type = 'text'

    const input_props = _.merge({
      label: size === 'large' ? model_field.key : null,
      bsSize: size,
      placeholder: model_field.key,
      help: form_field.touched && form_field.error,
    }, form_field)

    if (model_field.model_admin) {
      const RelatedField = createRelatedField(model_field)
      return <RelatedField model={model} input_props={input_props} />
    }

    return (
      <Input
        type={type}
        {...input_props}
      />
    )
  }
}
