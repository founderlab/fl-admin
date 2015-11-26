'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = RelatedModelSelector;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactBootstrap = require('react-bootstrap');

// , ListGroup, ListItem

function RelatedModelSelector(props) {
  var relation_field = props.relation_field;
  var model = props.model;
  var model_store = props.model_store;
  var input_props = props.input_props;

  var models = model_store.get('by_id').toJSON ? model_store.get('by_id').toJSON() : {};

  var content = null;

  // shortcut to avoid messing with saving relations: link to the related model for hasMany
  // the alternative is to set `input_props.multiple = true` and figure it out
  if (relation_field.type === 'hasMany' || relation_field.type === 'hasOne') {
    (function () {
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
      content = _react2['default'].createElement(
        'div',
        { className: 'list-group' },
        links
      );
    })();
  } else if (relation_field.type === 'belongsTo' /*|| relation_field.type === 'hasOne' */) {
      var select_options = _lodash2['default'].map(models, function (model) {
        return _react2['default'].createElement(
          'option',
          { key: model.id, value: model.id },
          relation_field.model_admin.display(model)
        );
      });

      //redux-form onFocus is buggy as of v3.0.0, skip it
      content = _react2['default'].createElement(
        _reactBootstrap.Input,
        _extends({ type: 'select', label: relation_field.key }, _lodash2['default'].omit(input_props, 'onFocus')),
        !input_props.multiple ? _react2['default'].createElement('option', { value: 'null' }) : null,
        select_options
      );
    }

  if (!content) return null;

  return _react2['default'].createElement(
    'div',
    null,
    _react2['default'].createElement(
      'label',
      null,
      relation_field.key
    ),
    content
  );
}

RelatedModelSelector.propTypes = {
  relation_field: _react.PropTypes.object,
  model_admin: _react.PropTypes.object,
  model_store: _react.PropTypes.object
};
module.exports = exports['default'];