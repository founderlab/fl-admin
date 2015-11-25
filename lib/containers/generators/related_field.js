'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports['default'] = createRelatedField;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsLoader = require('../../components/loader');

var _componentsLoader2 = _interopRequireDefault(_componentsLoader);

var _componentsRelated_model_selector = require('../../components/related_model_selector');

var _componentsRelated_model_selector2 = _interopRequireDefault(_componentsRelated_model_selector);

function createRelatedField(relation_field) {
  var model_admin = relation_field.model_admin;
  var load = model_admin.actions.load;

  return (function (_Component) {
    _inherits(RelatedField, _Component);

    function RelatedField() {
      _classCallCheck(this, _RelatedField);

      _get(Object.getPrototypeOf(_RelatedField.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(RelatedField, [{
      key: 'hasData',
      value: function hasData() {
        return this.props.model_store && !this.props.model_store.get('loading');
      }
    }, {
      key: 'render',
      value: function render() {
        if (!this.hasData()) return _react2['default'].createElement(_componentsLoader2['default'], { type: 'inline' });
        var _props = this.props;
        var model = _props.model;
        var model_store = _props.model_store;
        var input_props = _props.input_props;

        return _react2['default'].createElement(_componentsRelated_model_selector2['default'], { relation_field: relation_field, model: model, model_store: model_store, input_props: input_props });
      }
    }], [{
      key: 'propTypes',
      value: {
        model: _react.PropTypes.object,
        model_store: _react.PropTypes.object,
        form_field: _react.PropTypes.object,
        load: _react.PropTypes.func
      },
      enumerable: true
    }, {
      key: 'needs',
      value: [load],
      enumerable: true
    }]);

    var _RelatedField = RelatedField;
    RelatedField = (0, _reactRedux.connect)(function (state) {
      return { model_store: state.admin[model_admin.path] };
    }, { load: load })(RelatedField) || RelatedField;
    return RelatedField;
  })(_react.Component);
}

module.exports = exports['default'];