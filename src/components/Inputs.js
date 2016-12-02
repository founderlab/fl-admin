import _ from 'lodash'
import React, {PropTypes} from 'react'
import warning from 'warning'
import SmartInput from '../components/inputs/SmartInput'

export default class Inputs extends React.Component {

  static PropTypes = {
    modelAdmin: PropTypes.object,
    InputComponent: PropTypes.function,
  }

  handleOnChangeFn = (field, target, modelField) => ev => {
    field.onChange(ev)
    target.onChange(modelField.link.parse ? modelField.link.parse(ev.target.value) : ev.target.value)
  }

  renderField(field, key) {
    const {modelAdmin} = this.props
    const modelField = modelAdmin.fields[key] || modelAdmin.relationFields[key]

    warning(modelField, `[fl-admin] Can't find modelField for key ${key}: is this key the field name instead of the virtual_id_accessor?`)
    if (!modelField || modelField.hidden) return null

    const props = _.clone(_props)
    if (modelField.link) props.onChange = handleOnChangeFn(field, fields[modelField.link.to], modelField)

    return (
      <InputComponent
        key={key}
        modelField={modelField}
        formField={field}
        {...props}
      />
    )
  }

  render() {
    return (
      <div>
        {_.map(fields, (field, key) => this.renderField(field, key))}
      </div>
    )
  }
}
