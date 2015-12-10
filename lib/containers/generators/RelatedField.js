'use strict';

var _reactTransformCatchErrors2 = require('react-transform-catch-errors');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _reactTransformCatchErrors3 = _interopRequireDefault(_reactTransformCatchErrors2);

var _react = require('react');

var _redboxReact = require('redbox-react');

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

exports.__esModule = true;
exports['default'] = createRelatedField;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _reactRedux = require('react-redux');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _componentsLoader = require('../../components/Loader');

var _componentsLoader2 = _interopRequireDefault(_componentsLoader);

var _componentsInputsBelongsTo = require('../../components/inputs/BelongsTo');

var _componentsInputsBelongsTo2 = _interopRequireDefault(_componentsInputsBelongsTo);

var _componentsInputsHasMany = require('../../components/inputs/HasMany');

var _componentsInputsHasMany2 = _interopRequireDefault(_componentsInputsHasMany);

var _components = {
  _$RelatedField: {
    displayName: 'RelatedField',
    isInFunction: true
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/containers/generators/RelatedField.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

function createRelatedField(relation_field) {
  var model_admin = relation_field.model_admin;
  var load = model_admin.actions.load;

  return (function (_Component) {
    _inherits(RelatedField, _Component);

    function RelatedField() {
      _classCallCheck(this, _RelatedField);

      _Component.apply(this, arguments);
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

      if (relation_field.type === 'belongsTo' /*|| relation_field.type === 'hasOne' */) {
          return _react2['default'].createElement(_componentsInputsBelongsTo2['default'], { relation_field: relation_field, model: model, model_store: model_store, input_props: input_props });
        }

      if (relation_field.type === 'hasMany' || relation_field.type === 'hasOne') {
        return _react2['default'].createElement(_componentsInputsHasMany2['default'], { relation_field: relation_field, model: model, model_store: model_store, input_props: input_props });
      }

      _warning2['default'](false, '[fl-admin] Relation does not have a known type: ' + relation_field.type);
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
    RelatedField = _wrapComponent('_$RelatedField')(RelatedField) || RelatedField;
    RelatedField = _reactRedux.connect(function (state) {
      return { model_store: state.admin[model_admin.path] };
    }, { load: load })(RelatedField) || RelatedField;
    return RelatedField;
  })(_react.Component);
}

module.exports = exports['default'];