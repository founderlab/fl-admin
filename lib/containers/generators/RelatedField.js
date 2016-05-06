'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = createRelatedField;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _componentsLoader = require('../../components/Loader');

var _componentsLoader2 = _interopRequireDefault(_componentsLoader);

var _componentsInputsBelongsTo = require('../../components/inputs/BelongsTo');

var _componentsInputsBelongsTo2 = _interopRequireDefault(_componentsInputsBelongsTo);

var _componentsInputsHasMany = require('../../components/inputs/HasMany');

var _componentsInputsHasMany2 = _interopRequireDefault(_componentsInputsHasMany);

var _componentsInputsInlineRelation = require('../../components/inputs/InlineRelation');

var _componentsInputsInlineRelation2 = _interopRequireDefault(_componentsInputsInlineRelation);

function createRelatedField(relation_field) {
  var model_admin = relation_field.model_admin;

  if (!model_admin) return null;
  var _model_admin$actions = model_admin.actions;
  var load = _model_admin$actions.load;
  var save = _model_admin$actions.save;
  var del = _model_admin$actions.del;

  return (function (_Component) {
    _inherits(RelatedField, _Component);

    function RelatedField() {
      var _this = this;

      _classCallCheck(this, _RelatedField);

      _Component.apply(this, arguments);

      this.hasManyRelationAttrs = function () {
        var _ref;

        return _ref = {}, _ref[relation_field.relation.foreign_key] = _this.props.model.id, _ref;
      };

      this.handleAdd = function () {
        _this.props.save(_this.hasManyRelationAttrs());
      };

      this.handleSaveFn = function (model) {
        return function (data) {
          return _this.props.save(_lodash2['default'].extend(_this.hasManyRelationAttrs(), model, data));
        };
      };

      this.handleDeleteFn = function (model) {
        return function () {
          return _this.props.del(model);
        };
      };
    }

    RelatedField.prototype.hasData = function hasData() {
      return this.props.model_store && !this.props.model_store.get('loading');
    };

    RelatedField.prototype.render = function render() {
      if (!this.hasData()) return _react2['default'].createElement(_componentsLoader2['default'], { type: 'inline' });
      var _props = this.props;
      var model = _props.model;
      var model_store = _props.model_store;
      var input_props = _props.input_props;

      var props = { relation_field: relation_field, model: model, model_store: model_store, input_props: input_props };

      if (relation_field.type === 'belongsTo') {
        if (relation_field.inline) console.log('[fl-admin] inline editing belongsTo relations is not yet supported');
        return _react2['default'].createElement(_componentsInputsBelongsTo2['default'], props);
      }

      if (relation_field.type === 'hasMany' || relation_field.type === 'hasOne') {

        // if (related_model[relation_field.relation.foreign_key] !== model.id) return
        props.models = _lodash2['default'](model_store.get('by_id').toJSON()).values().filter(function (related_model) {
          return related_model[relation_field.relation.foreign_key] === model.id;
        }).value();

        //TODO: This should be made to work for belongsTo / manyToMany
        if (relation_field.inline) {
          return _react2['default'].createElement(_componentsInputsInlineRelation2['default'], _extends({
            label: input_props.label,
            config: this.props.config.toJSON(),
            onAdd: this.handleAdd,
            handleSaveFn: this.handleSaveFn,
            handleDeleteFn: this.handleDeleteFn
          }, props));
        }

        return _react2['default'].createElement(_componentsInputsHasMany2['default'], props);
      }

      _warning2['default'](false, '[fl-admin] Relation does not have a known type: ' + relation_field.type + '. Note that manyToMany is not yet supported');
      return null;
    };

    _createClass(RelatedField, null, [{
      key: 'propTypes',
      value: {
        model: _react.PropTypes.object,
        model_store: _react.PropTypes.object,
        form_field: _react.PropTypes.object,
        load: _react.PropTypes.func
      },
      enumerable: true
    }]);

    var _RelatedField = RelatedField;
    RelatedField = _reactRedux.connect(function (state) {
      return { model_store: state.admin[model_admin.path], config: state.config };
    }, { load: load, save: save, del: del })(RelatedField) || RelatedField;
    return RelatedField;
  })(_react.Component);
}

module.exports = exports['default'];