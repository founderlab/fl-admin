import inflection from 'inflection'

export function plural(Model) {
  return inflection.pluralize(Model.name)
}

export function upper(Model) {
  return inflection.underscore(Model.name).toUpperCase()
}

export function table(Model) {
  return inflection.tableize(Model.name)
}

