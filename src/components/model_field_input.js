import React, {PropTypes} from 'react'
import {Input} from 'react-bootstrap'
import createRelatedField from '../containers/generators/related_field'

export default class FieldInput extends React.Component {
  static propTypes = {
    model_field: PropTypes.object.isRequired,
    form_field: PropTypes.object.isRequired,
    size: PropTypes.string,
  }

  render() {
    const {model_field, form_field, size} = this.props
    const type = 'text'
    if (model_field.model_admin) {
      const RelatedSelector = createRelatedField(model_field)
      return <RelatedSelector form_field={form_field} />
    }
    return (
      <Input
        type={type}
        label={size === 'large' ? model_field.key : null}
        bsSize={size}
        placeholder={model_field.key}
        help={form_field.touched && form_field.error}
        {...form_field}
      />
    )
  }
}
