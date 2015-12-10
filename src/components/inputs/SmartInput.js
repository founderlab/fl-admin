import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Input} from 'react-bootstrap'
import DatetimeInput from './DatetimeInput'
import FileUploader from './FileUploader'

export default function SmartInput(props) {

  const {model, model_field, config, form_field, size} = props
  let type = 'text'

  const input_props = _.merge({
    label: size === 'large' ? model_field.key : null,
    bsSize: size,
    placeholder: model_field.key,
    help: form_field.touched && form_field.error,
  }, form_field)

  // Related model of some sort
  if (model_field.RelatedField) {
    return <model_field.RelatedField input_props={input_props} />
  }

  // File uploader
  if (model_field.type.toLowerCase() === 'file') {
    return (<FileUploader size={size} config={config} input_props={input_props} />)
  }

  // Datepicker
  if (model_field.type.toLowerCase() === 'date' || model_field.type.toLowerCase() === 'datetime') {
    return (<DatetimeInput {...input_props} />)
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
}
