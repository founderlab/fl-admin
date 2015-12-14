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
exports['default'] = createPagination;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _reactRedux = require('react-redux');

var _react2 = _interopRequireDefault(_react);

var _reduxRouter = require('redux-router');

var _componentsPaginationLinks = require('../../components/PaginationLinks');

var _componentsPaginationLinks2 = _interopRequireDefault(_componentsPaginationLinks);

var _components = {
  _$Pagination: {
    displayName: 'Pagination',
    isInFunction: true
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/containers/generators/Pagination_.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

function createPagination(model_admin) {
  var _model_admin$actions = model_admin.actions;
  var count = _model_admin$actions.count;
  var loadPage = _model_admin$actions.loadPage;

  return (function (_Component) {
    _inherits(Pagination, _Component);

    function Pagination() {
      var _this = this;

      _classCallCheck(this, _Pagination);

      _Component.apply(this, arguments);

      this.handlePage = function (page) {
        var _props = _this.props;
        var location = _props.location;
        var pushState = _props.pushState;

        pushState(null, location.pathname + '?page=' + page);
      };
    }

    Pagination.prototype.hasData = function hasData() {
      return this.props.model_store && !this.props.model_store.get('loading');
    };

    Pagination.prototype.render = function render() {
      if (!this.hasData()) return null;
      var model_store = this.props.model_store;

      var current_page = model_store.get('pagination').get('current_page');
      var total = model_store.get('pagination').get('total');
      var total_pages = Math.ceil(total / this.props.items_per_page);

      return _react2['default'].createElement(_componentsPaginationLinks2['default'], { current_page: current_page, total_pages: total_pages, onPage: this.handlePage });
    };

    _createClass(Pagination, null, [{
      key: 'propTypes',
      value: {
        model_store: _react.PropTypes.object,
        items_per_page: _react.PropTypes.number,
        loadPage: _react.PropTypes.func
      },
      enumerable: true
    }]);

    var _Pagination = Pagination;
    Pagination = _wrapComponent('_$Pagination')(Pagination) || Pagination;
    Pagination = _reactRedux.connect(function (state) {
      return { model_store: state.admin[model_admin.path], location: state.router.location };
    }, { count: count, loadPage: loadPage, pushState: _reduxRouter.pushState })(Pagination) || Pagination;
    return Pagination;
  })(_react.Component);
}

module.exports = exports['default'];