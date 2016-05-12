'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = ModelList;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouterBootstrap = require('react-router-bootstrap');

var _reactBootstrap = require('react-bootstrap');

var _componentsModelListTable = require('../components/ModelListTable');

var _componentsModelListTable2 = _interopRequireDefault(_componentsModelListTable);

function ModelList(props) {
  var modelAdmin = props.modelAdmin;
  var config = props.config;
  var currentPage = props.currentPage;
  var itemsPerPage = props.itemsPerPage;
  var totalItems = props.totalItems;
  var visibleItems = props.visibleItems;
  var onAdd = props.onAdd;
  var handleSaveFn = props.handleSaveFn;
  var handleDeleteFn = props.handleDeleteFn;
  var Pagination = modelAdmin.components.Pagination;

  var tableProps = { modelAdmin: modelAdmin, config: config, handleSaveFn: handleSaveFn, handleDeleteFn: handleDeleteFn, models: visibleItems };

  var startCount = itemsPerPage * (currentPage - 1) + 1;
  var endCount = startCount + visibleItems.length - 1;

  return _react2['default'].createElement(
    'section',
    { className: 'fla-model-list' },
    _react2['default'].createElement(
      _reactBootstrap.Grid,
      { fluid: true },
      _react2['default'].createElement(
        _reactBootstrap.Row,
        null,
        _react2['default'].createElement(
          _reactBootstrap.Col,
          { xs: 12 },
          _react2['default'].createElement(
            _reactRouter.Link,
            { to: modelAdmin.rootPath },
            _react2['default'].createElement(_reactBootstrap.Glyphicon, { glyph: 'chevron-left' }),
            'Admin home'
          )
        )
      ),
      _react2['default'].createElement(
        _reactBootstrap.Row,
        null,
        _react2['default'].createElement(
          _reactBootstrap.Col,
          { xs: 12 },
          _react2['default'].createElement(
            'h1',
            null,
            modelAdmin.plural
          )
        )
      ),
      _react2['default'].createElement(
        _reactBootstrap.Row,
        null,
        _react2['default'].createElement(
          _reactBootstrap.Col,
          { xs: 12, className: 'fla-controls' },
          _react2['default'].createElement(
            _reactRouterBootstrap.LinkContainer,
            { to: modelAdmin.createLink() },
            _react2['default'].createElement(
              _reactBootstrap.Button,
              { bsStyle: 'primary', onClick: onAdd },
              _react2['default'].createElement(_reactBootstrap.Glyphicon, { glyph: 'plus' }),
              ' Add a new ',
              modelAdmin.name
            )
          ),
          _react2['default'].createElement(
            'div',
            { className: 'fla-pagination pull-right' },
            _react2['default'].createElement(Pagination, _extends({ className: 'pull-right' }, props)),
            totalItems && _react2['default'].createElement(
              'span',
              { className: 'fla-item-count pull-right' },
              startCount,
              ' - ',
              endCount,
              ' of ',
              totalItems
            )
          )
        )
      ),
      _react2['default'].createElement(
        _reactBootstrap.Row,
        null,
        _react2['default'].createElement(
          _reactBootstrap.Col,
          { xs: 12 },
          _react2['default'].createElement(_componentsModelListTable2['default'], tableProps)
        )
      )
    )
  );
}

ModelList.propTypes = {
  visibleItems: _react.PropTypes.array.isRequired,
  modelAdmin: _react.PropTypes.object.isRequired,
  config: _react.PropTypes.object.isRequired,
  onAdd: _react.PropTypes.func.isRequired,
  handleSaveFn: _react.PropTypes.func.isRequired,
  handleDeleteFn: _react.PropTypes.func.isRequired,
  itemsPerPage: _react.PropTypes.number.isRequired
};
module.exports = exports['default'];