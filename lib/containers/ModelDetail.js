'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = ModelDetail;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _reactRouter = require('react-router');

var _reactBootstrap = require('react-bootstrap');

var _componentsGeneratorsModelDetailForm = require('../components/generators/ModelDetailForm');

var _componentsGeneratorsModelDetailForm2 = _interopRequireDefault(_componentsGeneratorsModelDetailForm);

function ModelDetail(props) {
  var modelAdmin = props.modelAdmin;
  var modelStore = props.modelStore;
  var id = props.id;
  var config = props.config;
  var handleSaveFn = props.handleSaveFn;
  var handleDeleteFn = props.handleDeleteFn;

  var modelIm = modelStore.get('models').get(id);
  var model = modelIm ? modelIm.toJSON() : {};
  _warning2['default'](model, '[fl-admin] ModelDetail: Model ' + modelAdmin.name + ' not loaded with id ' + id);
  var ModelDetailForm = _componentsGeneratorsModelDetailForm2['default'](model);
  var fields = _lodash2['default'](modelAdmin.fields).map(function (f) {
    return f.virtual_id_accessor || f.key;
  }).compact().value();

  return _react2['default'].createElement(
    'section',
    { className: 'fla-model-detail' },
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
            { to: modelAdmin.link() },
            _react2['default'].createElement(_reactBootstrap.Glyphicon, { glyph: 'chevron-left' }),
            modelAdmin.plural
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
            modelAdmin.display(model)
          )
        )
      ),
      _react2['default'].createElement(ModelDetailForm, {
        formKey: model.id,
        model: model,
        modelAdmin: modelAdmin,
        config: config,
        onSubmit: handleSaveFn(model),
        onDelete: handleDeleteFn(model),
        fields: fields
      })
    )
  );
}

ModelDetail.propTypes = {
  id: _react.PropTypes.string,
  modelStore: _react.PropTypes.object,
  modelAdmin: _react.PropTypes.object,
  // config: PropTypes.object,
  handleSaveFn: _react.PropTypes.func,
  handleDeleteFn: _react.PropTypes.func
};
module.exports = exports['default'];