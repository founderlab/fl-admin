'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports['default'] = createPagination;

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

var _componentsPagination_links = require('../../components/pagination_links');

var _componentsPagination_links2 = _interopRequireDefault(_componentsPagination_links);

function createPagination(model_admin) {
  var _model_admin$actions = model_admin.actions;
  var count = _model_admin$actions.count;
  var loadPage = _model_admin$actions.loadPage;

  return (function (_Component) {
    _inherits(PaginationContainer, _Component);

    function PaginationContainer() {
      var _this = this;

      _classCallCheck(this, _PaginationContainer);

      _get(Object.getPrototypeOf(_PaginationContainer.prototype), 'constructor', this).apply(this, arguments);

      this.handlePage = function (page) {
        var _props = _this.props;
        var location = _props.location;
        var pushState = _props.pushState;

        pushState(null, location.pathname + '?page=' + page);
      };
    }

    _createClass(PaginationContainer, [{
      key: 'hasData',
      value: function hasData() {
        return this.props.model_store && !this.props.model_store.get('loading');
      }
    }, {
      key: 'render',
      value: function render() {
        if (!this.hasData()) return null;
        var model_store = this.props.model_store;

        var current_page = model_store.get('pagination').get('current_page');
        var total = model_store.get('pagination').get('total');
        console.log('total', total);
        var total_pages = Math.ceil(total / this.props.items_per_page);

        return _react2['default'].createElement(_componentsPagination_links2['default'], { current_page: current_page, total_pages: total_pages, onPage: this.handlePage });
      }
    }], [{
      key: 'propTypes',
      value: {
        model_store: _react.PropTypes.object,
        items_per_page: _react.PropTypes.number,
        loadPage: _react.PropTypes.func
      },
      enumerable: true
    }]);

    var _PaginationContainer = PaginationContainer;
    PaginationContainer = (0, _reactRedux.connect)(function (state) {
      return { model_store: state.admin[model_admin.path], location: state.router.location };
    }, { count: count, loadPage: loadPage, pushState: _reduxRouter.pushState })(PaginationContainer) || PaginationContainer;
    return PaginationContainer;
  })(_react.Component);
}

module.exports = exports['default'];