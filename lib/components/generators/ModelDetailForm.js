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
exports['default'] = createModelDetailForm;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _reactBootstrap = require('react-bootstrap');

var _reduxForm = require('redux-form');

var _inputsSmartInput = require('../inputs/SmartInput');

var _inputsSmartInput2 = _interopRequireDefault(_inputsSmartInput);

var _components = {
  _$ModelDetailForm: {
    displayName: 'ModelDetailForm'
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/components/generators/ModelDetailForm.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

var ModelDetailForm = (function (_React$Component) {
  _inherits(ModelDetailForm, _React$Component);

  function ModelDetailForm() {
    _classCallCheck(this, _ModelDetailForm);

    _React$Component.apply(this, arguments);
  }

  ModelDetailForm.prototype.render = function render() {
    var _props = this.props;
    var modelAdmin = _props.modelAdmin;
    var model = _props.model;
    var handleSubmit = _props.handleSubmit;
    var onDelete = _props.onDelete;

    return _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(
        _reactBootstrap.Row,
        null,
        _react2['default'].createElement(
          _reactBootstrap.Col,
          { xs: 12 },
          _react2['default'].createElement(
            'form',
            null,
            _lodash2['default'].map(modelAdmin.fields, function (modelField, key) {
              if (!modelField || modelField.hidden) return null;
              return _react2['default'].createElement(_reduxForm.Field, {
                key: key,
                name: key,
                modelField: modelField,
                label: modelField.label,
                component: _inputsSmartInput2['default']
              });
            }),
            _lodash2['default'].map(modelAdmin.relationFields, function (modelField, key) {
              if (!modelField || modelField.hidden) return null;
              return _react2['default'].createElement(_reduxForm.Field, {
                key: key,
                name: key,
                model: model,
                modelField: modelField,
                label: modelField.label,
                component: modelField.RelatedInput
              });
            })
          )
        )
      ),
      _react2['default'].createElement(
        _reactBootstrap.Row,
        null,
        _react2['default'].createElement(
          _reactBootstrap.Col,
          { xs: 2 },
          _react2['default'].createElement(
            _reactBootstrap.Button,
            { bsStyle: 'danger', bsSize: 'xsmall', onClick: onDelete },
            _react2['default'].createElement(_reactBootstrap.Glyphicon, { glyph: 'remove' })
          )
        ),
        _react2['default'].createElement(
          _reactBootstrap.Col,
          { xs: 2, xsOffset: 8 },
          _react2['default'].createElement(
            _reactBootstrap.Button,
            { className: 'pull-right', bsStyle: 'primary', onClick: handleSubmit },
            'Save'
          )
        )
      )
    );
  };

  _createClass(ModelDetailForm, null, [{
    key: 'propTypes',
    value: {
      model: _react.PropTypes.object.isRequired,
      modelAdmin: _react.PropTypes.object.isRequired,
      config: _react.PropTypes.object.isRequired,
      onDelete: _react.PropTypes.func.isRequired,

      // from redux-form
      handleSubmit: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  var _ModelDetailForm = ModelDetailForm;
  ModelDetailForm = _wrapComponent('_$ModelDetailForm')(ModelDetailForm) || ModelDetailForm;
  return ModelDetailForm;
})(_react2['default'].Component);

exports.ModelDetailForm = ModelDetailForm;

function createModelDetailForm(model) {
  return _reduxForm.reduxForm({
    form: 'model_detail',
    initialValues: model
  })(ModelDetailForm);
}