'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = RelatedModelSelector;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

function RelatedModelSelector(props) {
  var relation = props.relation;
  var model_admin = props.model_admin;
  var model_store = props.model_store;
  var form_field = props.form_field;

  // console.log('model_admin, model_admin', model_admin)
  // console.log('relation, relation', relation)
  var models = model_store.get('by_id').toJSON ? model_store.get('by_id').toJSON() : {};
  console.log('model_store', model_admin.name, model_store.toJSON());
  // console.log('model_store.get', model_store.get('by_id'))
  // console.log('models', models)
  var select_options = _lodash2['default'].map(models, function (model) {
    return _react2['default'].createElement(
      'option',
      { key: model.id, value: model.id },
      model.id
    );
  });

  console.log('select_options', select_options);
  return _react2['default'].createElement(
    _reactBootstrap.Input,
    _extends({ type: 'select', label: relation.key, placeholder: '' }, form_field),
    _react2['default'].createElement('option', { value: 'null' }),
    _react2['default'].createElement('option', { value: 'asd' }),
    select_options
  );
}

RelatedModelSelector.propTypes = {
  relation: _react.PropTypes.object,
  model_admin: _react.PropTypes.object,
  model_store: _react.PropTypes.object,
  form_field: _react.PropTypes.object
};
module.exports = exports['default'];