'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ModelDetail;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactBootstrap = require('react-bootstrap');

var _generatorsModel_detail_form = require('./generators/model_detail_form');

var _generatorsModel_detail_form2 = _interopRequireDefault(_generatorsModel_detail_form);

function ModelDetail(props) {
  var model_admin = props.model_admin;
  var model_store = props.model_store;
  var id = props.id;
  var handleSaveFn = props.handleSaveFn;
  var handleDeleteFn = props.handleDeleteFn;

  var model_im = model_store.get('by_id').get(id);
  var model = model_im ? model_im.toJSON() : {};
  var ModelDetailForm = (0, _generatorsModel_detail_form2['default'])(model);

  return _react2['default'].createElement(
    'div',
    { className: 'admin-detail' },
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
              { to: '/admin/' + model_admin.path },
              _react2['default'].createElement(_reactBootstrap.Glyphicon, { glyph: 'chevron-left' }),
              model_admin.plural
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
            { className: 'col-lg-12' },
            _react2['default'].createElement(
              'h1',
              null,
              model_admin.display(model)
            )
          )
        )
      )
    ),
    _react2['default'].createElement(ModelDetailForm, {
      formKey: model.id,
      model: model,
      model_admin: model_admin,
      onSubmit: handleSaveFn(model),
      onDelete: handleDeleteFn(model),
      fields: _lodash2['default'].map(model_admin.fields, function (f) {
        return f.virtual_id_accessor || f.key;
      })
    })
  );
}

ModelDetail.propTypes = {
  id: _react.PropTypes.string,
  model_store: _react.PropTypes.object,
  model_admin: _react.PropTypes.object,
  handleSaveFn: _react.PropTypes.func,
  handleDeleteFn: _react.PropTypes.func
};
module.exports = exports['default'];