'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = createModelCreate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxRouter = require('redux-router');

var _containersModelDetail = require('../../containers/ModelDetail');

var _containersModelDetail2 = _interopRequireDefault(_containersModelDetail);

function createModelCreate(modelAdmin) {
  var _modelAdmin$actions = modelAdmin.actions;
  var save = _modelAdmin$actions.save;
  var del = _modelAdmin$actions.del;

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
            var model = _this.props.modelStore.get('lastSaved').toJSON();
            _this.props.pushState(null, modelAdmin.link(model.id));
          });
        };
      };

      this.handleDeleteFn = function (model) {
        return function () {
          if (window.confirm('Are you really, really sure you want to delete this model? You can\'t have it back.')) {
            _this.props.del(model, function (err) {
              return err && console.log(err);
            });
            if (_this.props.id) _reduxRouter.pushState(modelAdmin.link());
          }
        };
      };
    }

    ModelEditor.prototype.render = function render() {
      var modelStore = this.props.modelStore;

      var config = this.props.config.toJSON();

      var componentProps = {
        modelAdmin: modelAdmin,
        modelStore: modelStore,
        config: config,
        handleSaveFn: this.handleSaveFn,
        handleDeleteFn: this.handleDeleteFn
      };

      return _react2['default'].createElement(_containersModelDetail2['default'], componentProps);
    };

    _createClass(ModelEditor, null, [{
      key: 'propTypes',
      value: {
        modelStore: _react.PropTypes.object.isRequired,
        save: _react.PropTypes.func,
        del: _react.PropTypes.func
      },
      enumerable: true
    }]);

    var _ModelEditor = ModelEditor;
    ModelEditor = _reactRedux.connect(function (state) {
      return {
        modelStore: state.admin[modelAdmin.path],
        config: state.config
      };
    }, { save: save, del: del, pushState: _reduxRouter.pushState })(ModelEditor) || ModelEditor;
    return ModelEditor;
  })(_react.Component);
}

module.exports = exports['default'];

// todo: make delete undoable