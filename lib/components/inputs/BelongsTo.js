'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = BelongsTo;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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