'use strict';

exports.__esModule = true;
exports['default'] = HasMany;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function HasMany(props) {
  var relationField = props.relationField;
  var model = props.model;
  var models = props.models;
  var inputProps = props.inputProps;

  // shortcut to avoid messing with saving relations: link to the related model for hasMany
  // the alternative is to set `inputProps.multiple = true` and figure it out
  var modelAdmin = relationField.modelAdmin;

  var links = [];

  _lodash2['default'].forEach(models, function (relatedModel) {
    if (relatedModel[relationField.relation.foreignKey] !== model.id) return;
    links.push(_react2['default'].createElement(
      _reactRouter.Link,
      { to: modelAdmin.link(relatedModel), className: 'list-group-item', key: relatedModel.id, target: '_blank' },
      modelAdmin.display(relatedModel),
      _react2['default'].createElement('br', null)
    ));
  });

  return _react2['default'].createElement(
    'div',
    null,
    inputProps.label ? _react2['default'].createElement(
      'label',
      { className: 'control-label' },
      inputProps.label
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
  models: _react.PropTypes.array.isRequired,
  relationField: _react.PropTypes.object.isRequired,
  inputProps: _react.PropTypes.object.isRequired
};
module.exports = exports['default'];