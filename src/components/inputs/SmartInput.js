import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Input} from 'react-bootstrap'
import warning from 'warning'
import Select from './Select'
import Datetime from './Datetime'
import FileUploader from './FileUploader'
import QuillEditor from './QuillEditor'

export default function SmartInput(props) {

  const {model, model_field, config, form_field, size, handleSubmit} = props
  let type = 'text'

  const input_props = _.merge({
    handleSubmit,
    label: size === 'large' ? model_field.key : null,
    bsSize: size,
    placeholder: model_field.key,
    help: form_field.touched && form_field.error,
  }, form_field)

  // Related model of some sort
  if (model_field.RelatedField) {
    return <model_field.RelatedField model={model} input_props={input_props} />
  }

  // Type of text input specified
  if (model_field.input) {
    const input_type = model_field.input.toLowerCase()

    if (input_type === 'textarea') {
      type = 'textarea'
    }
    else if (input_type === 'rich_text' || input_type === 'richtext') {
      return (<QuillEditor {...input_props} />)
    }
    else {
      warning(false, `Unknown input for field ${model_field.key}: ${input_type}`)
    }
  }

  // Select box
  if (model_field.options) {
    return (<Select options={model_field.options} {...input_props} />)
  }

  // File uploader
  if (model_field.type.toLowerCase() === 'file') {
    return (<FileUploader size={size} config={config} {...input_props} />)
  }

  // Datepicker
  if (model_field.type.toLowerCase() === 'date' || model_field.type.toLowerCase() === 'datetime') {
    return (<Datetime {...input_props} />)
  }

  // Checkbox
  if (model_field.type.toLowerCase() === 'boolean') {
    type = 'checkbox'
    input_props.label = model_field.key
  }

  // Bootstrap component
  return (<Input type={type} {...input_props} />)

}

SmartInput.propTypes = {
  model: PropTypes.object.isRequired,
  model_field: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  form_field: PropTypes.object.isRequired,
  size: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
}
