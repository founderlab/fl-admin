import _ from 'lodash'
import React from 'react'
import warning from 'warning'
import SmartInput from '../components/inputs/SmartInput'

// yoinked from react-router
export function checkPropTypes(componentName='UnknownComponent', prop_types, props) {
  for (const prop_name in prop_types) {
    if (prop_types.hasOwnProperty(prop_name)) {
      const error = prop_types[prop_name](props, prop_name, componentName)
      if (error instanceof Error) warning(false, error.message)
    }
  }
}

const handleOnChangeFn = (field, target, model_field) => ev => {
  field.onChange(ev)
  target.onChange(model_field.link.parse ? model_field.link.parse(ev.target.value) : ev.target.value)
}

export function mapFieldsToInputs(model_admin, fields, _props={}, InputComponent=SmartInput) {
  return _.map(fields, (field, key) => {
    const model_field = model_admin.fields[key] || model_admin.relation_fields[key]
    warning(model_field, `[fl-admin] Can't find model_field for key ${key}: is this key the field name instead of the virtual_id_accessor?`)
    const props = _.clone(_props)
    if (model_field.link) props.onChange = handleOnChangeFn(field, fields[model_field.link.to], model_field)
    return (
      <InputComponent
        key={key}
        model_field={model_field}
        form_field={field}
        {...props}
      />
    )
  })
}

const NO_LIST_EDIT = ['hasMany', 'manyToMany']
export function editFieldInline(field) {
  return field.list_edit && NO_LIST_EDIT.indexOf(field.type) === -1
}
