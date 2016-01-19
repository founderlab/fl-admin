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
exports['default'] = createModelEditor;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _queueAsync = require('queue-async');

var _queueAsync2 = _interopRequireDefault(_queueAsync);

var _reactRedux = require('react-redux');

var _react2 = _interopRequireDefault(_react);

var _componentsLoader = require('../../components/Loader');

var _componentsLoader2 = _interopRequireDefault(_componentsLoader);

var _componentsModelList = require('../../components/ModelList');

var _componentsModelList2 = _interopRequireDefault(_componentsModelList);

var _componentsModelDetail = require('../../components/ModelDetail');

var _componentsModelDetail2 = _interopRequireDefault(_componentsModelDetail);

var _libFetchRelated = require('../../lib/fetchRelated');

var _libFetchRelated2 = _interopRequireDefault(_libFetchRelated);

var _components = {
  _$ModelEditor: {
    displayName: 'ModelEditor',
    isInFunction: true
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/containers/generators/ModelEditor.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

var ITEMS_PER_PAGE = 10;

function createModelEditor(model_admin) {
  var _model_admin$actions = model_admin.actions;
  var load = _model_admin$actions.load;
  var loadPage = _model_admin$actions.loadPage;
  var count = _model_admin$actions.count;
  var save = _model_admin$actions.save;
  var del = _model_admin$actions.del;

  return (function (_Component) {
    _inherits(ModelEditor, _Component);

    function ModelEditor() {
      var _this = this;

      _classCallCheck(this, _ModelEditor);

      _Component.apply(this, arguments);

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

    ModelEditor.fetchData = function fetchData(_ref, callback) {
      var store = _ref.store;
      var action = _ref.action;

      var _store$getState = store.getState();

      var router = _store$getState.router;

      var model_id = router.params.id;
      var query = {};
      var queue = new _queueAsync2['default']();

      if (model_id) {
        queue.defer(function (callback) {
          query.id = model_id;
          store.dispatch(load(query, callback));
        });
      } else {
        queue.defer(function (callback) {
          return store.dispatch(count(query, callback));
        });
        queue.defer(function (callback) {
          query.$limit = ITEMS_PER_PAGE;

          // lookup the page from the incoming action here if one exists
          // if the ?page=xxx query was changed by redux-router the state won't have updated yet
          var page = +(action && action.payload ? action.payload.location.query.page : router.location.query.page) || 1;

          if (page > 1) query.$offset = ITEMS_PER_PAGE * (page - 1);
          return store.dispatch(loadPage(page, query, callback));
        });
      }

      queue.await(function (err) {
        if (err) return console.log(err);
        var model_store = store.getState().admin[model_admin.path];
        var model_ids = model_id ? [model_id] : model_store.get('pagination').get('visible').toJSON();
        _libFetchRelated2['default']({ store: store, model_admin: model_admin, model_ids: model_ids, load_all: !!model_id }, callback);
      });
    };

    ModelEditor.prototype.hasData = function hasData() {
      return this.props.model_store && !this.props.model_store.get('loading');
    };

    ModelEditor.prototype.render = function render() {
      if (!this.hasData()) return _react2['default'].createElement(_componentsLoader2['default'], null);
      var _props = this.props;
      var id = _props.id;
      var model_store = _props.model_store;

      var config = this.props.config.toJSON();

      var component_props = {
        id: id,
        model_admin: model_admin,
        model_store: model_store,
        config: config,
        onAdd: this.handleAdd,
        handleSaveFn: this.handleSaveFn,
        handleDeleteFn: this.handleDeleteFn,
        items_per_page: ITEMS_PER_PAGE
      };

      if (id) return _react2['default'].createElement(_componentsModelDetail2['default'], component_props);
      return _react2['default'].createElement(_componentsModelList2['default'], component_props);
    };

    _createClass(ModelEditor, null, [{
      key: 'propTypes',
      value: {
        model_store: _react.PropTypes.object,
        id: _react.PropTypes.string,
        load: _react.PropTypes.func,
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
        id: state.router.params.id,
        config: state.config
      };
    }, { load: load, save: save, del: del })(ModelEditor) || ModelEditor;
    return ModelEditor;
  })(_react.Component);
}

module.exports = exports['default'];