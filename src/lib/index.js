import _ from 'lodash'
import React from 'react'
import warning from 'warning'
import SmartInput from '../components/inputs/SmartInput'

// yoinked from react-router
export function checkPropTypes(componentName='UnknownComponent', propTypes, props) {
  for (const propName in propTypes) {
    if (propTypes.hasOwnProperty(propName)) {
      const error = propTypes[propName](props, propName, componentName)
      if (error instanceof Error) warning(false, error.message)
    }
  }
}

const handleOnChangeFn = (field, target, modelField) => ev => {
  field.onChange(ev)
  target.onChange(modelField.link.parse ? modelField.link.parse(ev.target.value) : ev.target.value)
}

export function mapFieldsToInputs(modelAdmin, fields, _props={}, InputComponent=SmartInput) {
  return _.map(fields, (field, key) => {
    const modelField = modelAdmin.fields[key] || modelAdmin.relationFields[key]
    warning(modelField, `[fl-admin] Can't find modelField for key ${key}: is this key the field name instead of the virtual_id_accessor?`)
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
  })
}

const NO_LIST_EDIT = ['hasMany', 'manyToMany']
export function editFieldInline(field) {
  return field.listEdit && NO_LIST_EDIT.indexOf(field.type) === -1
}
