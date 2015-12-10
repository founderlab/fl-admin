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

var _generatorsModelListForm = require('./generators/ModelListForm');

var _generatorsModelListForm2 = _interopRequireDefault(_generatorsModelListForm);

var _lib = require('../lib');

function ModelList(props) {
  var model_admin = props.model_admin;
  var model_store = props.model_store;
  var config = props.config;
  var items_per_page = props.items_per_page;
  var onAdd = props.onAdd;
  var handleSaveFn = props.handleSaveFn;
  var handleDeleteFn = props.handleDeleteFn;
  var Pagination = model_admin.components.Pagination;

  var fields = {};
  _lodash2['default'].forEach(model_admin.fields, function (field, key) {
    if (_lib.editFieldInline(field)) fields[key] = field;
  });

  var to_display = _lodash2['default'].pick(model_store.get('by_id').toJSON(), model_store.get('pagination').get('visible').toJSON());

  var model_list_rows = _lodash2['default'].map(to_display, function (model) {
    var ModelListForm = _generatorsModelListForm2['default'](model);

    return _react2['default'].createElement(ModelListForm, {
      key: model.id,
      formKey: model.id,
      model: model,
      model_admin: model_admin,
      config: config,
      onSubmit: handleSaveFn(model),
      onDelete: handleDeleteFn(model),
      fields: _lodash2['default'].map(fields, function (f) {
        return f.virtual_id_accessor || f.key;
      })
    });
  });

  var edit_fields = _lodash2['default'].map(fields, function (field, key) {
    return _react2['default'].createElement(
      'th',
      { key: key },
      key
    );
  });
  var headings = [_react2['default'].createElement(
    'th',
    { key: '__fl_model' },
    'model'
  )].concat(edit_fields).concat(edit_fields.length ? [_react2['default'].createElement(
    'th',
    { key: '__fl_save' },
    'save'
  )] : []).concat([_react2['default'].createElement(
    'th',
    { key: '__fl_delete' },
    'delete'
  )]);

  return _react2['default'].createElement(
    'div',
    { className: 'admin-list' },
    _react2['default'].createElement(
      'section',
      null,
      _react2['default'].createElement(
        'div',
        { className: 'container' },
        _react2['default'].createElement(
          'div',
          { className: 'row' },
          _react2['default'].createElement(
            'div',
            { className: 'col-lg-12' },
            _react2['default'].createElement(
              _reactRouter.Link,
              { to: model_admin.root_path },
              _react2['default'].createElement(_reactBootstrap.Glyphicon, { glyph: 'chevron-left' }),
              'Admin home'
            )
          )
        )
      )
    ),
    _react2['default'].createElement(
      'section',
      null,
      _react2['default'].createElement(
        'div',
        { className: 'container' },
        _react2['default'].createElement(
          'div',
          { className: 'row' },
          _react2['default'].createElement(
            'div',
            { className: 'col-lg-8 col-lg-offset-1' },
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
            _react2['default'].createElement(Pagination, { items_per_page: items_per_page }),
            _react2['default'].createElement(
              _reactBootstrap.Table,
              null,
              _react2['default'].createElement(
                'thead',
                null,
                _react2['default'].createElement(
                  'tr',
                  null,
                  headings
                )
              ),
              _react2['default'].createElement(
                'tbody',
                null,
                model_list_rows
              )
            )
          )
        )
      )
    )
  );
}

ModelList.propTypes = {
  model_store: _react.PropTypes.object.isRequired,
  model_admin: _react.PropTypes.object.isRequired,
  config: _react.PropTypes.object.isRequired,
  onAdd: _react.PropTypes.func.isRequired,
  handleSaveFn: _react.PropTypes.func.isRequired,
  handleDeleteFn: _react.PropTypes.func.isRequired
};
module.exports = exports['default'];