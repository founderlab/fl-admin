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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _queueAsync = require('queue-async');

var _queueAsync2 = _interopRequireDefault(_queueAsync);

var _reactRedux = require('react-redux');

var _react2 = _interopRequireDefault(_react);

var _reduxRouter = require('redux-router');

// import {createPaginationSelector} from 'fl-redux-utils'

var _componentsLoader = require('../../components/Loader');

var _componentsLoader2 = _interopRequireDefault(_componentsLoader);

var _containersModelList = require('../../containers/ModelList');

var _containersModelList2 = _interopRequireDefault(_containersModelList);

var _containersModelDetail = require('../../containers/ModelDetail');

var _containersModelDetail2 = _interopRequireDefault(_containersModelDetail);

var _utilsFetchRelated = require('../../utils/fetchRelated');

var _utilsFetchRelated2 = _interopRequireDefault(_utilsFetchRelated);

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

function createModelEditor(modelAdmin) {
  var _modelAdmin$actions = modelAdmin.actions;
  var load = _modelAdmin$actions.load;
  var loadPage = _modelAdmin$actions.loadPage;
  var count = _modelAdmin$actions.count;
  var save = _modelAdmin$actions.save;
  var del = _modelAdmin$actions.del;

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
          console.log('handleSaveFn', model, data);
          _this.props.save(_lodash2['default'].extend(model, data));
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

    ModelEditor.fetchData = function fetchData(_ref, callback) {
      var store = _ref.store;
      var action = _ref.action;

      var _store$getState = store.getState();

      var auth = _store$getState.auth;
      var router = _store$getState.router;

      // lookup the location from the incoming action here if one exists
      // if the ?page=xxx query was changed by redux-router the state won't have updated yet
      var location = action && action.payload && action.payload.location ? action.payload.location : router.location;
      var modelId = (action && action.payload && action.payload.params || router.params).id;
      var query = { $user_id: auth.get('user').get('id') };
      var queue = new _queueAsync2['default']();

      if (modelId) {
        queue.defer(function (callback) {
          query.id = modelId;
          store.dispatch(load(query, callback));
        });
      } else {
        queue.defer(function (callback) {
          return store.dispatch(count(query, callback));
        });
        queue.defer(function (callback) {
          query.$limit = modelAdmin.perPage;

          var page = +location.query.page || 1;

          if (page > 1) query.$offset = modelAdmin.perPage * (page - 1);
          return store.dispatch(loadPage(page, query, callback));
        });
      }

      queue.await(function (err) {
        if (err) return console.error(err);
        var modelStore = store.getState().admin[modelAdmin.path];
        var modelIds = modelId ? [modelId] : modelStore.get('pagination').get('visible').toJSON();
        _utilsFetchRelated2['default']({ store: store, modelAdmin: modelAdmin, modelIds: modelIds, loadAll: !!modelId }, callback);
      });
    };

    ModelEditor.prototype.hasData = function hasData() {
      return !this.props.modelStore.get('loading');
    };

    ModelEditor.prototype.render = function render() {
      if (!this.hasData()) return _react2['default'].createElement(_componentsLoader2['default'], null);
      // const {id, modelStore, visibleItems, location} = this.props
      var _props = this.props;
      var id = _props.id;
      var modelStore = _props.modelStore;
      var location = _props.location;

      var config = this.props.config.toJSON();

      var currentPage = +(location.query.page || 1);
      var itemsPerPage = +(location.query.perPage || modelAdmin.perPage);

      // TODO: These should come from the pagination selector via createPaginationSelector,
      // but it's causing an infinite loop for whatever reason
      var pagination = modelStore.get('pagination');
      var visibleIds = pagination.get('visible').toJSON();
      var totalItems = +pagination.get('total');
      var visibleItems = [];

      _lodash2['default'].forEach(visibleIds, function (id) {
        return visibleItems.push(modelStore.get('models').get(id).toJSON());
      });

      // Format dates for form initial values
      _lodash2['default'].forEach(visibleItems, function (model) {
        _lodash2['default'].forEach(modelAdmin.fields, function (f, key) {
          if (!f.type || f.type.toLowerCase() === 'datetime' && model[key]) {
            model[key] = _moment2['default'](new Date(model[key])).format('L LT');
          } else if (f.type.toLowerCase() === 'date' && model[key]) {
            model[key] = _moment2['default'](new Date(model[key])).format('L');
          }
        });
      });

      var componentProps = {
        id: id,
        modelAdmin: modelAdmin,
        modelStore: modelStore,
        config: config,
        visibleItems: visibleItems,
        totalItems: totalItems,
        location: location,
        currentPage: currentPage,
        itemsPerPage: itemsPerPage,
        onAdd: this.handleAdd,
        handleSaveFn: this.handleSaveFn,
        handleDeleteFn: this.handleDeleteFn
      };

      if (id) return _react2['default'].createElement(_containersModelDetail2['default'], componentProps);
      return _react2['default'].createElement(_containersModelList2['default'], componentProps);
    };

    _createClass(ModelEditor, null, [{
      key: 'propTypes',
      value: {
        modelStore: _react.PropTypes.object.isRequired,
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
    //   state => state.admin[modelAdmin.path],
    //   state => ({
    //     modelStore: state.admin[modelAdmin.path],
    //     id: state.router.params.id,
    //     config: state.config,
    //   })
    // ),
    function (state) {
      return {
        modelStore: state.admin[modelAdmin.path],
        id: state.router.params.id,
        config: state.config
      };
    }, { load: load, save: save, del: del, pushState: _reduxRouter.pushState })(ModelEditor) || ModelEditor;
    return ModelEditor;
  })(_react.Component);
}

module.exports = exports['default'];

// todo: make delete undoable