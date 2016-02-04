'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = InlineRelation;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _ModelListTable = require('../ModelListTable');

var _ModelListTable2 = _interopRequireDefault(_ModelListTable);

function InlineRelation(props) {
  var config = props.config;
  var relation_field = props.relation_field;
  var model_store = props.model_store;
  var label = props.label;
  var onAdd = props.onAdd;
  var handleSaveFn = props.handleSaveFn;
  var handleDeleteFn = props.handleDeleteFn;
  var model_admin = relation_field.model_admin;

  var models = []; //_.values(model_store.get('by_id').toJSON())
  var table_props = { models: models, model_admin: model_admin, config: config, handleSaveFn: handleSaveFn, handleDeleteFn: handleDeleteFn };

  return _react2['default'].createElement(
    'div',
    null,
    label ? _react2['default'].createElement(
      'label',
      { className: 'control-label' },
      label
    ) : null,
    _react2['default'].createElement(
      _reactBootstrap.Button,
      { bsStyle: 'primary', className: 'pull-right', onClick: onAdd },
      _react2['default'].createElement(_reactBootstrap.Glyphicon, { glyph: 'plus' })
    ),
    _react2['default'].createElement(_ModelListTable2['default'], table_props)
  );
}

InlineRelation.propTypes = {
  label: _react.PropTypes.string.isRequired,
  relation_field: _react.PropTypes.object.isRequired,

  model_store: _react.PropTypes.object.isRequired,
  config: _react.PropTypes.object.isRequired,
  onAdd: _react.PropTypes.func.isRequired,
  handleSaveFn: _react.PropTypes.func.isRequired,
  handleDeleteFn: _react.PropTypes.func.isRequired
};
module.exports = exports['default'];