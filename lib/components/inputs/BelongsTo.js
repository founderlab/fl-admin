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
  var relationField = props.relationField;
  var modelStore = props.modelStore;
  var inputProps = props.inputProps;

  var models = modelStore.get('models').toJSON ? modelStore.get('models').toJSON() : {};

  var selectOptions = _lodash2['default'].map(models, function (model) {
    return _react2['default'].createElement(
      'option',
      { key: model.id, value: model.id },
      relationField.modelAdmin.display(model)
    );
  });

  //redux-form onFocus is buggy as of v3.0.0, skip it
  return _react2['default'].createElement(
    _reactBootstrap.Input,
    _extends({ type: 'select', label: inputProps.label }, _lodash2['default'].omit(inputProps, 'onFocus')),
    !inputProps.multiple ? _react2['default'].createElement('option', { value: null }) : null,
    selectOptions
  );
}

BelongsTo.propTypes = {
  relationField: _react.PropTypes.object.isRequired,
  modelStore: _react.PropTypes.object.isRequired,
  inputProps: _react.PropTypes.object.isRequired
};
module.exports = exports['default'];