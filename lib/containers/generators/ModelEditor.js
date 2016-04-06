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

// eslint-disable-line

var _queueAsync = require('queue-async');

var _queueAsync2 = _interopRequireDefault(_queueAsync);

var _reactRedux = require('react-redux');

var _react2 = _interopRequireDefault(_react);

var _reduxRouter = require('redux-router');

// import {createPaginationSelector} from 'fl-react-utils'

var _componentsLoader = require('../../components/Loader');

var _componentsLoader2 = _interopRequireDefault(_componentsLoader);

var _containersModelList = require('../../containers/ModelList');

var _containersModelList2 = _interopRequireDefault(_containersModelList);

var _containersModelDetail = require('../../containers/ModelDetail');

var _containersModelDetail2 = _interopRequireDefault(_containersModelDetail);

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
          if (window.confirm('Are you really, really sure you want to delete this model? You can\'t have it back.')) {
            _this.props.del(model, function (err) {
              return err && console.log(err);
            });
            if (_this.props.id) _reduxRouter.pushState(model_admin.link());
          }
        };
      };
    }

    ModelEditor.fetchData = function fetchData(_ref, callback) {
      var store = _ref.store;
      var action = _ref.action;

      var _store$getState = store.getState();

      var router = _store$getState.router;

      // lookup the location from the incoming action here if one exists
      // if the ?page=xxx query was changed by redux-router the state won't have updated yet
      var location = action && action.payload && action.payload.location ? action.payload.location : router.location;
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
          query.$limit = model_admin.per_page;

          var page = +location.query.page || 1;

          if (page > 1) query.$offset = model_admin.per_page * (page - 1);
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
      return !this.props.model_store.get('loading');
    };

    ModelEditor.prototype.render = function render() {
      if (!this.hasData()) return _react2['default'].createElement(_componentsLoader2['default'], null);
      // const {id, model_store, visible_items, location} = this.props
      var _props = this.props;
      var id = _props.id;
      var model_store = _props.model_store;
      var location = _props.location;

      var config = this.props.config.toJSON();

      var current_page = +(location.query.page || 1);
      var items_per_page = +(location.query.per_page || model_admin.per_page);

      // TODO: These should come from the pagination selector via createPaginationSelector,
      // but it's causing an infinite loop for whatever reason
      var pagination = model_store.get('pagination');
      var visible_ids = pagination.get('visible').toJSON();
      var total_items = +pagination.get('total');
      var visible_items = [];
      _lodash2['default'].forEach(visible_ids, function (id) {
        return visible_items.push(model_store.get('by_id').get(id).toJSON());
      });

      var component_props = {
        id: id,
        model_admin: model_admin,
        model_store: model_store,
        config: config,
        visible_items: visible_items,
        total_items: total_items,
        location: location,
        current_page: current_page,
        items_per_page: items_per_page,
        onAdd: this.handleAdd,
        handleSaveFn: this.handleSaveFn,
        handleDeleteFn: this.handleDeleteFn
      };

      if (id) return _react2['default'].createElement(_containersModelDetail2['default'], component_props);
      return _react2['default'].createElement(_containersModelList2['default'], component_props);
    };

    _createClass(ModelEditor, null, [{
      key: 'propTypes',
      value: {
        model_store: _react.PropTypes.object.isRequired,
        id: _react.PropTypes.string,
        load: _react.PropTypes.func,
        save: _react.PropTypes.func,
        del: _react.PropTypes.func
      },
      enumerable: true
    }]);

    var _ModelEditor = ModelEditor;
    ModelEditor = _wrapComponent('_$ModelEditor')(ModelEditor) || ModelEditor;
    ModelEditor = _reactRedux.connect(
    // createPaginationSelector(
    //   state => state.admin[model_admin.path],
    //   state => ({
    //     model_store: state.admin[model_admin.path],
    //     id: state.router.params.id,
    //     config: state.config,
    //   })
    // ),
    function (state) {
      return {
        model_store: state.admin[model_admin.path],
        id: state.router.params.id,
        config: state.config
      };
    }, { load: load, save: save, del: del, pushState: _reduxRouter.pushState })(ModelEditor) || ModelEditor;
    return ModelEditor;
  })(_react.Component);
}

module.exports = exports['default'];

// todo: make delete undoable