'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = RelatedModelSelector;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function RelatedModelSelector(props) {
  var relation_field = props.relation_field;
  var model = props.model;
  var model_store = props.model_store;

  var models = model_store.get('by_id').toJSON ? model_store.get('by_id').toJSON() : {};

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
    { className: 'list-group' },
    links
  );
}

RelatedModelSelector.propTypes = {
  relation_field: _react.PropTypes.object,
  model_admin: _react.PropTypes.object,
  model_store: _react.PropTypes.object
};
module.exports = exports['default'];