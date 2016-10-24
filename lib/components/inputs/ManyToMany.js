'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = ManyToMany;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _flReactUtils = require('fl-react-utils');

function ManyToMany(_props) {
  var relationField = _props.relationField;
  var modelStore = _props.modelStore;

  var props = _objectWithoutProperties(_props, ['relationField', 'modelStore']);

  var models = modelStore.get('models').toJSON ? modelStore.get('models').toJSON() : {};

  // const selectOptions = _.map(models, model => (<option key={model.id} value={model.id}>{relationField.modelAdmin.display(model)}</option>))
  var options = _lodash2['default'].map(models, function (model) {
    return { label: relationField.modelAdmin.display(model), value: model.id };
  });

  return _react2['default'].createElement(_flReactUtils.Input, _extends({
    type: 'react-select',
    options: options,
    inputProps: { multi: true }
  }, props));
}

ManyToMany.propTypes = {
  relationField: _react.PropTypes.object.isRequired,
  modelStore: _react.PropTypes.object.isRequired
};
module.exports = exports['default'];