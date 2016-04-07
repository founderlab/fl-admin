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
  var model_admin = props.model_admin;
  var config = props.config;
  var visible_items = props.visible_items;
  var onAdd = props.onAdd;
  var handleSaveFn = props.handleSaveFn;
  var handleDeleteFn = props.handleDeleteFn;
  var Pagination = model_admin.components.Pagination;

  var table_props = { model_admin: model_admin, config: config, handleSaveFn: handleSaveFn, handleDeleteFn: handleDeleteFn, models: visible_items };

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
            { to: model_admin.root_path },
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
            model_admin.plural
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
            { to: model_admin.createLink() },
            _react2['default'].createElement(
              _reactBootstrap.Button,
              { bsStyle: 'primary', onClick: onAdd },
              _react2['default'].createElement(_reactBootstrap.Glyphicon, { glyph: 'plus' }),
              ' Add a new ',
              model_admin.name
            )
          ),
          _react2['default'].createElement(Pagination, _extends({ className: 'pull-right' }, props))
        )
      ),
      _react2['default'].createElement(
        _reactBootstrap.Row,
        null,
        _react2['default'].createElement(
          _reactBootstrap.Col,
          { xs: 12 },
          _react2['default'].createElement(_componentsModelListTable2['default'], table_props)
        )
      )
    )
  );
}

ModelList.propTypes = {
  visible_items: _react.PropTypes.array.isRequired,
  model_admin: _react.PropTypes.object.isRequired,
  config: _react.PropTypes.object.isRequired,
  onAdd: _react.PropTypes.func.isRequired,
  handleSaveFn: _react.PropTypes.func.isRequired,
  handleDeleteFn: _react.PropTypes.func.isRequired,
  items_per_page: _react.PropTypes.number.isRequired
};
module.exports = exports['default'];