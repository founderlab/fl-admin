'use strict';

exports.__esModule = true;
exports['default'] = ModelListTable;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
  var modelAdmin = props.modelAdmin;
  var config = props.config;
  var handleSaveFn = props.handleSaveFn;
  var handleDeleteFn = props.handleDeleteFn;

  var fields = {};
  _lodash2['default'].forEach(modelAdmin.fields, function (field, key) {
    if (_lib.editFieldInline(field)) fields[key] = field;
  });

  var modelListRows = _lodash2['default'].map(models, function (model) {
    var ModelListForm = _generatorsModelListForm2['default'](model);
    return _react2['default'].createElement(ModelListForm, {
      key: model.id,
      formKey: model.id,
      model: model,
      modelAdmin: modelAdmin,
      config: config,
      onSubmit: handleSaveFn(model),
      onDelete: handleDeleteFn(model),
      fields: _lodash2['default'].map(fields, function (f) {
        return f.virtual_id_accessor || f.key;
      })
    });
  });

  var editFields = _lodash2['default'].map(fields, function (field, key) {
    return _react2['default'].createElement(
      'th',
      { key: key, className: 'fla-list-edit-th' },
      key
    );
  });
  var headings = [_react2['default'].createElement(
    'th',
    { key: 'fl-name', className: 'fla-name-th' },
    'model'
  )].concat(editFields).concat(editFields.length ? [_react2['default'].createElement(
    'th',
    { key: 'fl-save', className: 'fla-save-th' },
    'save'
  )] : []).concat(modelAdmin.listDelete ? [_react2['default'].createElement(
    'th',
    { key: 'fl-delete', className: 'fla-delete-th' },
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
      modelListRows
    )
  );
}

ModelListTable.propTypes = {
  models: _react.PropTypes.array.isRequired,
  modelAdmin: _react.PropTypes.object.isRequired,
  config: _react.PropTypes.object.isRequired,
  handleSaveFn: _react.PropTypes.func.isRequired,
  handleDeleteFn: _react.PropTypes.func.isRequired
};
module.exports = exports['default'];