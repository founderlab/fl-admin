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

var _utilsShouldEditFieldInline = require('../utils/shouldEditFieldInline');

var _utilsShouldEditFieldInline2 = _interopRequireDefault(_utilsShouldEditFieldInline);

function ModelListTable(props) {
  var models = props.models;
  var modelAdmin = props.modelAdmin;
  var handleSaveFn = props.handleSaveFn;
  var handleDeleteFn = props.handleDeleteFn;

  var modelListRows = _lodash2['default'].map(models, function (model) {
    var ModelListForm = _generatorsModelListForm2['default'](model);
    return _react2['default'].createElement(ModelListForm, {
      key: model.id,
      formKey: model.id,
      model: model,
      modelAdmin: modelAdmin,
      onSubmit: handleSaveFn(model),
      onDelete: handleDeleteFn(model)
    });
  });

  var headings = [_react2['default'].createElement(
    'th',
    { key: 'fl-name', className: 'fla-name-th' },
    'Model'
  )];

  _lodash2['default'].forEach(modelAdmin.fields, function (field, key) {
    if (_utilsShouldEditFieldInline2['default'](field)) headings.push(_react2['default'].createElement(
      'th',
      { key: key, className: 'fla-list-edit-th' },
      field.label
    ));
  });

  _lodash2['default'].forEach(modelAdmin.relationFields, function (field, key) {
    if (_utilsShouldEditFieldInline2['default'](field)) headings.push(_react2['default'].createElement(
      'th',
      { key: key, className: 'fla-list-edit-th' },
      field.label
    ));
  });

  if (headings.length > 1) headings.push(_react2['default'].createElement(
    'th',
    { key: 'fl-save', className: 'fla-save-th' },
    'Save'
  ));
  if (modelAdmin.listDelete) headings.push(_react2['default'].createElement(
    'th',
    { key: 'fl-delete', className: 'fla-delete-th' },
    'Delete'
  ));

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