'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports['default'] = createModelList;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsLoader = require('../../components/loader');

var _componentsLoader2 = _interopRequireDefault(_componentsLoader);

var _componentsModel_list = require('../../components/model_list');

var _componentsModel_list2 = _interopRequireDefault(_componentsModel_list);

var _componentsModel_detail = require('../../components/model_detail');

var _componentsModel_detail2 = _interopRequireDefault(_componentsModel_detail);

function createModelList(model_admin) {
  var _model_admin$actions = model_admin.actions;
  var load = _model_admin$actions.load;
  var save = _model_admin$actions.save;
  var del = _model_admin$actions.del;

  var related_load_actions = [];
  _lodash2['default'].forEach(model_admin.fields, function (field) {
    if (field.model_admin) related_load_actions.push(field.model_admin.actions.load);
  });

  return (function (_Component) {
    _inherits(ModelEditorContainer, _Component);

    function ModelEditorContainer() {
      var _this = this;

      _classCallCheck(this, _ModelEditorContainer);

      _get(Object.getPrototypeOf(_ModelEditorContainer.prototype), 'constructor', this).apply(this, arguments);

      this.handleAdd = function () {
        return _this.props.save({});
      };

      this.handleSaveFn = function (model) {
        return function (data) {
          return _this.props.save(_lodash2['default'].extend(model, data));
        };
      };

      this.handleDeleteFn = function (model) {
        return function () {
          return _this.props.del(model);
        };
      };
    }

    _createClass(ModelEditorContainer, [{
      key: 'hasData',
      value: function hasData() {
        return this.props.model_store && !this.props.model_store.get('loading');
      }
    }, {
      key: 'render',
      value: function render() {
        if (!this.hasData()) return _react2['default'].createElement(_componentsLoader2['default'], null);
        var _props = this.props;
        var id = _props.id;
        var model_store = _props.model_store;

        var component_props = {
          id: id,
          model_admin: model_admin,
          model_store: model_store,
          onAdd: this.handleAdd,
          handleSaveFn: this.handleSaveFn,
          handleDeleteFn: this.handleDeleteFn
        };

        if (id) return _react2['default'].createElement(_componentsModel_detail2['default'], component_props);
        return _react2['default'].createElement(_componentsModel_list2['default'], component_props);
      }
    }], [{
      key: 'propTypes',
      value: {
        model_store: _react.PropTypes.object,
        id: _react.PropTypes.string,
        load: _react.PropTypes.func,
        save: _react.PropTypes.func,
        del: _react.PropTypes.func
      },
      enumerable: true
    }, {
      key: 'needs',
      value: related_load_actions.concat([load]),
      enumerable: true
    }]);

    var _ModelEditorContainer = ModelEditorContainer;
    ModelEditorContainer = (0, _reactRedux.connect)(function (state) {
      return { model_store: state.admin[model_admin.path], id: state.router.params.id };
    }, { load: load, save: save, del: del })(ModelEditorContainer) || ModelEditorContainer;
    return ModelEditorContainer;
  })(_react.Component);
}

module.exports = exports['default'];