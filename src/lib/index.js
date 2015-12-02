import _ from 'lodash'
import React from 'react'
import warning from 'warning'
import ModelFieldInput from '../components/inputs/smart'

// yoinked from react-router
export function checkPropTypes(componentName='UnknownComponent', prop_types, props) {
  for (const prop_name in prop_types) {
    if (prop_types.hasOwnProperty(prop_name)) {
      const error = prop_types[prop_name](props, prop_name, componentName)
      if (error instanceof Error) warning(false, error.message)
    }
  }
}

export function mapFieldsToInputs(model_admin, fields, props={}, InputComponent=ModelFieldInput) {
  return _.map(fields, (field, key) => {
    const model_field = model_admin.fields[key] || model_admin.relation_fields[key]
    warning(model_field, `[fl-admin] Can't find model_field for key ${key}: is this key the field name instead of the virtual_id_accessor?`)
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

const NO_INLINE = ['hasMany', 'manyToMany']
export function editFieldInline(field) {
  return field.inline && NO_INLINE.indexOf(field.type) === -1
}
