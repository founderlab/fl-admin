'use strict';

exports.__esModule = true;
exports['default'] = InlineRelation;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
  var relationField = props.relationField;
  var models = props.models;
  var label = props.label;
  var onAdd = props.onAdd;
  var handleSaveFn = props.handleSaveFn;
  var handleDeleteFn = props.handleDeleteFn;
  var modelAdmin = relationField.modelAdmin;

  var tableProps = { models: models, modelAdmin: modelAdmin, config: config, handleSaveFn: handleSaveFn, handleDeleteFn: handleDeleteFn };

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
    _react2['default'].createElement(_ModelListTable2['default'], tableProps)
  );
}

InlineRelation.propTypes = {
  label: _react.PropTypes.string.isRequired,
  relationField: _react.PropTypes.object.isRequired,

  models: _react.PropTypes.array.isRequired,
  config: _react.PropTypes.object.isRequired,
  onAdd: _react.PropTypes.func.isRequired,
  handleSaveFn: _react.PropTypes.func.isRequired,
  handleDeleteFn: _react.PropTypes.func.isRequired
};
module.exports = exports['default'];