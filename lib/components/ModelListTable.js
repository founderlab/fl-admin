'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = ModelListTable;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _generatorsModelListForm = require('./generators/ModelListForm');

var _generatorsModelListForm2 = _interopRequireDefault(_generatorsModelListForm);

var _lib = require('../lib');

function ModelListTable(props) {
  var models = props.models;
  var model_admin = props.model_admin;
  var config = props.config;
  var handleSaveFn = props.handleSaveFn;
  var handleDeleteFn = props.handleDeleteFn;

  var fields = {};
  _lodash2['default'].forEach(model_admin.fields, function (field, key) {
    if (_lib.editFieldInline(field)) fields[key] = field;
  });

  var model_list_rows = _lodash2['default'].map(models, function (model) {
    var ModelListForm = _generatorsModelListForm2['default'](model);
    return _react2['default'].createElement(ModelListForm, {
      key: model.id,
      formKey: model.id,
      model: model,
      model_admin: model_admin,
      config: config,
      onSubmit: handleSaveFn(model),
      onDelete: handleDeleteFn(model),
      fields: _lodash2['default'].map(fields, function (f) {
        return f.virtual_id_accessor || f.key;
      })
    });
  });

  var edit_fields = _lodash2['default'].map(fields, function (field, key) {
    return _react2['default'].createElement(
      'th',
      { key: key, className: 'fla-list-edit-th' },
      key
    );
  });
  var headings = [_react2['default'].createElement(
    'th',
    { key: '__fl_name', className: 'fla-name-th' },
    'model'
  )].concat(edit_fields).concat(edit_fields.length ? [_react2['default'].createElement(
    'th',
    { key: '__fl_save', className: 'fla-save-th' },
    'save'
  )] : []).concat(model_admin.list_delete ? [_react2['default'].createElement(
    'th',
    { key: '__fl_delete', className: 'fla-delete-th' },
    'delete'
  )] : []);

  return _react2['default'].createElement(
    _reactBootstrap.Table,
    null,
    _react2['default'].createElement(
      'thead',
      null,
      _react2['default'].createElement(
        'tr',
        null,
        headings
      )
    ),
    _react2['default'].createElement(
      'tbody',
      null,
      model_list_rows
    )
  );
}

ModelListTable.propTypes = {
  models: _react.PropTypes.array.isRequired,
  model_admin: _react.PropTypes.object.isRequired,
  config: _react.PropTypes.object.isRequired,
  handleSaveFn: _react.PropTypes.func.isRequired,
  handleDeleteFn: _react.PropTypes.func.isRequired
};
module.exports = exports['default'];