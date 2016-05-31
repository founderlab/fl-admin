import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Input, FormControls} from 'react-bootstrap'
import warning from 'warning'
import {S3Uploader} from 'fl-react-utils'
import Select from './Select'
import Datetime from './Datetime'
import QuillEditor from './QuillEditor'

export default function SmartInput(props) {

  const {model, modelField, config, formField, size, handleSubmit, onChange} = props
  let type = 'text'

  const inputProps = _.merge({
    handleSubmit,
    label: size === 'large' ? modelField.key : null,
    bsSize: size,
    placeholder: modelField.key,
    help: formField.touched && formField.error,
  }, formField)
  if (onChange) inputProps.onChange = onChange

  // Related model of some sort
  if (modelField.RelatedField) {
    return <modelField.RelatedField model={model} inputProps={inputProps} />
  }

  // Type of text input specified
  if (modelField.input) {
    const inputType = modelField.input.toLowerCase()

    if (inputType === 'textarea') {
      type = 'textarea'
    }
    else if (inputType === 'rich' || inputType === 'richtext') {
      return (<QuillEditor {...inputProps} />)
    }
    else {
      warning(false, `Unknown input for field ${modelField.key}: ${inputType}`)
    }
  }

  // Select box
  if (modelField.options) {
    return (<Select options={modelField.options} {...inputProps} />)
  }

  // File uploader
  if (modelField.type.toLowerCase() === 'file') {
    return (<S3Uploader label={inputProps.label} size={size} config={config} inputProps={inputProps} />)
  }

  // Datepicker
  if (modelField.type.toLowerCase() === 'date' || modelField.type.toLowerCase() === 'datetime') {
    return (<Datetime {...inputProps} />)
  }

  // Checkbox
  if (modelField.type.toLowerCase() === 'boolean') {
    type = 'checkbox'
    inputProps.label = modelField.key
  }

  if (modelField.freeze && model.id) {
    return <FormControls.Static {...inputProps}>{formField.defaultValue}</FormControls.Static>
  }

  if (type === 'password') {
    inputProps.placeholder = 'Set a new password here'
  }

  // Bootstrap component
  return (<Input type={type} {...inputProps} />)
}

SmartInput.propTypes = {
  model: PropTypes.object.isRequired,
  modelField: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  formField: PropTypes.object.isRequired,
  size: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
}
