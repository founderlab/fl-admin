'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = BelongsTo;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

function BelongsTo(props) {
  var relation_field = props.relation_field;
  var model_store = props.model_store;
  var input_props = props.input_props;

  var models = model_store.get('by_id').toJSON ? model_store.get('by_id').toJSON() : {};

  var select_options = _lodash2['default'].map(models, function (model) {
    return _react2['default'].createElement(
      'option',
      { key: model.id, value: model.id },
      relation_field.model_admin.display(model)
    );
  });

  //redux-form onFocus is buggy as of v3.0.0, skip it
  return _react2['default'].createElement(
    _reactBootstrap.Input,
    _extends({ type: 'select', label: relation_field.key }, _lodash2['default'].omit(input_props, 'onFocus')),
    !input_props.multiple ? _react2['default'].createElement('option', { value: 'null' }) : null,
    select_options
  );
}

BelongsTo.propTypes = {
  relation_field: _react.PropTypes.object,
  model_admin: _react.PropTypes.object,
  model_store: _react.PropTypes.object
};
module.exports = exports['default'];