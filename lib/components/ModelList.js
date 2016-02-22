'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = ModelList;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactBootstrap = require('react-bootstrap');

var _ModelListTable = require('./ModelListTable');

var _ModelListTable2 = _interopRequireDefault(_ModelListTable);

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
    'div',
    { className: 'admin-list' },
    _react2['default'].createElement(
      'section',
      null,
      _react2['default'].createElement(
        _reactBootstrap.Grid,
        { className: 'shadow-panel' },
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
            { sm: 8, smOffset: 1 },
            _react2['default'].createElement(
              'h1',
              null,
              model_admin.plural
            ),
            _react2['default'].createElement(
              _reactBootstrap.Button,
              { bsStyle: 'primary', className: 'pull-right', onClick: onAdd },
              _react2['default'].createElement(_reactBootstrap.Glyphicon, { glyph: 'plus' })
            ),
            _react2['default'].createElement(Pagination, props),
            _react2['default'].createElement(_ModelListTable2['default'], table_props)
          )
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