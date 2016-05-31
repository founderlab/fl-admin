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

function createRelatedField(relationField) {
  var modelAdmin = relationField.modelAdmin;

  if (!modelAdmin) return null;
  var _modelAdmin$actions = modelAdmin.actions;
  var load = _modelAdmin$actions.load;
  var save = _modelAdmin$actions.save;
  var del = _modelAdmin$actions.del;

  return (function (_Component) {
    _inherits(RelatedField, _Component);

    function RelatedField() {
      var _this = this;

      _classCallCheck(this, _RelatedField);

      _Component.apply(this, arguments);

      this.hasManyRelationAttrs = function () {
        var _ref;

        return _ref = {}, _ref[relationField.relation.foreignKey] = _this.props.model.id, _ref;
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
      return this.props.modelStore && !this.props.modelStore.get('loading');
    };

    RelatedField.prototype.render = function render() {
      if (!this.hasData()) return _react2['default'].createElement(_componentsLoader2['default'], { type: 'inline' });
      var _props = this.props;
      var model = _props.model;
      var modelStore = _props.modelStore;
      var inputProps = _props.inputProps;

      var props = { relationField: relationField, model: model, modelStore: modelStore, inputProps: inputProps };

      if (relationField.type === 'belongsTo') {
        if (relationField.inline) console.log('[fl-admin] inline editing belongsTo relations is not yet supported');
        return _react2['default'].createElement(_componentsInputsBelongsTo2['default'], props);
      }

      if (relationField.type === 'hasMany' || relationField.type === 'hasOne') {

        // if (relatedModel[relationField.relation.foreignKey] !== model.id) return
        props.models = _lodash2['default'](modelStore.get('models').toJSON()).values().filter(function (relatedModel) {
          return relatedModel[relationField.relation.foreignKey] === model.id;
        }).value();

        //TODO: This should be made to work for belongsTo / manyToMany
        if (relationField.inline) {
          return _react2['default'].createElement(_componentsInputsInlineRelation2['default'], _extends({
            label: inputProps.label,
            config: this.props.config.toJSON(),
            onAdd: this.handleAdd,
            handleSaveFn: this.handleSaveFn,
            handleDeleteFn: this.handleDeleteFn
          }, props));
        }

        return _react2['default'].createElement(_componentsInputsHasMany2['default'], props);
      }

      _warning2['default'](false, '[fl-admin] Relation does not have a known type: ' + relationField.type + '. Note that manyToMany is not yet supported');
      return null;
    };

    _createClass(RelatedField, null, [{
      key: 'propTypes',
      value: {
        model: _react.PropTypes.object,
        modelStore: _react.PropTypes.object,
        formField: _react.PropTypes.object,
        load: _react.PropTypes.func
      },
      enumerable: true
    }]);

    var _RelatedField = RelatedField;
    RelatedField = _reactRedux.connect(function (state) {
      return { modelStore: state.admin[modelAdmin.path], config: state.config };
    }, { load: load, save: save, del: del })(RelatedField) || RelatedField;
    return RelatedField;
  })(_react.Component);
}

module.exports = exports['default'];