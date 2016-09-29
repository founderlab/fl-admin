export const NO_LIST_EDIT = ['hasMany', 'manyToMany']

export default function shouldEditFieldInline(field) {
  return field && field.listEdit && !field.hidden && NO_LIST_EDIT.indexOf(field.type) === -1
}
