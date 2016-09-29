'use strict';

exports.__esModule = true;
exports['default'] = shouldEditFieldInline;
var NO_LIST_EDIT = ['hasMany', 'manyToMany'];

exports.NO_LIST_EDIT = NO_LIST_EDIT;

function shouldEditFieldInline(field) {
  return field && field.listEdit && !field.hidden && NO_LIST_EDIT.indexOf(field.type) === -1;
}