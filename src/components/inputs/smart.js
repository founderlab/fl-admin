import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Input} from 'react-bootstrap'
import Datetime from './datetime'
import createRelatedField from '../../containers/generators/related_field'

export default class SmartInput extends React.Component {
  static propTypes = {
    model: PropTypes.object.isRequired,
    model_field: PropTypes.object.isRequired,
    form_field: PropTypes.object.isRequired,
    size: PropTypes.string,
  }

  render() {
    const {model, model_field, form_field, size} = this.props
    let type = 'text'

    const input_props = _.merge({
      label: size === 'large' ? model_field.key : null,
      bsSize: size,
      placeholder: model_field.key,
      help: form_field.touched && form_field.error,
    }, form_field)

    // Related model of some sort
    if (model_field.model_admin) {
      const RelatedField = createRelatedField(model_field)
      return <RelatedField model={model} input_props={input_props} />
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
}
