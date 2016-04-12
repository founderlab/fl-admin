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
exports['default'] = createModelCreate;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _reactRedux = require('react-redux');

var _react2 = _interopRequireDefault(_react);

var _reduxRouter = require('redux-router');

var _containersModelDetail = require('../../containers/ModelDetail');

var _containersModelDetail2 = _interopRequireDefault(_containersModelDetail);

var _components = {
  _$ModelEditor: {
    displayName: 'ModelEditor',
    isInFunction: true
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/containers/generators/ModelCreate.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

function createModelCreate(model_admin) {
  var _model_admin$actions = model_admin.actions;
  var save = _model_admin$actions.save;
  var del = _model_admin$actions.del;

  return (function (_Component) {
    _inherits(ModelEditor, _Component);

    function ModelEditor() {
      var _this = this;

      _classCallCheck(this, _ModelEditor);

      _Component.apply(this, arguments);

      this.handleSaveFn = function () {
        return function (data) {
          _this.props.save(data, function (err) {
            if (err) return console.log(err);
            var model = _this.props.model_store.get('last_saved').toJSON();
            _this.props.pushState(null, model_admin.link(model.id));
          });
        };
      };

      this.handleDeleteFn = function (model) {
        return function () {
          if (window.confirm('Are you really, really sure you want to delete this model? You can\'t have it back.')) {
            _this.props.del(model, function (err) {
              return err && console.log(err);
            });
            if (_this.props.id) _reduxRouter.pushState(model_admin.link());
          }
        };
      };
    }

    ModelEditor.prototype.render = function render() {
      var model_store = this.props.model_store;

      var config = this.props.config.toJSON();

      var component_props = {
        model_admin: model_admin,
        model_store: model_store,
        config: config,
        handleSaveFn: this.handleSaveFn,
        handleDeleteFn: this.handleDeleteFn
      };

      return _react2['default'].createElement(_containersModelDetail2['default'], component_props);
    };

    _createClass(ModelEditor, null, [{
      key: 'propTypes',
      value: {
        model_store: _react.PropTypes.object.isRequired,
        save: _react.PropTypes.func,
        del: _react.PropTypes.func
      },
      enumerable: true
    }]);

    var _ModelEditor = ModelEditor;
    ModelEditor = _wrapComponent('_$ModelEditor')(ModelEditor) || ModelEditor;
    ModelEditor = _reactRedux.connect(function (state) {
      return {
        model_store: state.admin[model_admin.path],
        config: state.config
      };
    }, { save: save, del: del, pushState: _reduxRouter.pushState })(ModelEditor) || ModelEditor;
    return ModelEditor;
  })(_react.Component);
}

module.exports = exports['default'];

// todo: make delete undoable