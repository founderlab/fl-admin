'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = HasMany;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function HasMany(props) {
  var relation_field = props.relation_field;
  var model = props.model;
  var models = props.models;
  var input_props = props.input_props;

  // shortcut to avoid messing with saving relations: link to the related model for hasMany
  // the alternative is to set `input_props.multiple = true` and figure it out
  var model_admin = relation_field.model_admin;

  var links = [];

  _lodash2['default'].forEach(models, function (related_model) {
    if (related_model[relation_field.relation.foreign_key] !== model.id) return;
    links.push(_react2['default'].createElement(
      _reactRouter.Link,
      { to: model_admin.link(related_model), className: 'list-group-item', key: related_model.id },
      model_admin.display(related_model),
      _react2['default'].createElement('br', null)
    ));
  });

  return _react2['default'].createElement(
    'div',
    null,
    input_props.label ? _react2['default'].createElement(
      'label',
      { className: 'control-label' },
      input_props.label
    ) : null,
    _react2['default'].createElement(
      'div',
      { className: 'list-group' },
      links
    )
  );
}

HasMany.propTypes = {
  model: _react.PropTypes.object.isRequired,
  relation_field: _react.PropTypes.object.isRequired,
  model_store: _react.PropTypes.object.isRequired,
  input_props: _react.PropTypes.object.isRequired
};
module.exports = exports['default'];