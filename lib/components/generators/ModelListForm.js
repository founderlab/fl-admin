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
exports['default'] = createModelListForm;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _reactBootstrap = require('react-bootstrap');

var _reactRouter = require('react-router');

var _reduxForm = require('redux-form');

var _inputsSmartInput = require('../inputs/SmartInput');

var _inputsSmartInput2 = _interopRequireDefault(_inputsSmartInput);

var _utilsShouldEditFieldInline = require('../../utils/shouldEditFieldInline');

var _utilsShouldEditFieldInline2 = _interopRequireDefault(_utilsShouldEditFieldInline);

var _components = {
  _$ModelListForm: {
    displayName: 'ModelListForm'
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/components/generators/ModelListForm.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

var ModelListForm = (function (_React$Component) {
  _inherits(ModelListForm, _React$Component);

  function ModelListForm() {
    _classCallCheck(this, _ModelListForm);

    _React$Component.apply(this, arguments);
  }

  ModelListForm.prototype.render = function render() {
    var _props = this.props;
    var modelAdmin = _props.modelAdmin;
    var model = _props.model;
    var handleSubmit = _props.handleSubmit;
    var onDelete = _props.onDelete;

    var showSave = _lodash2['default'].some(_lodash2['default'].values(modelAdmin.fields).concat(_lodash2['default'].values(modelAdmin.relationFields)), function (f) {
      return _utilsShouldEditFieldInline2['default'](f);
    });

    return _react2['default'].createElement(
      'tr',
      null,
      _react2['default'].createElement(
        'td',
        { className: 'fla-name-td' },
        _react2['default'].createElement(
          _reactRouter.Link,
          { to: modelAdmin.link(model) },
          modelAdmin.display(model),
          _react2['default'].createElement(_reactBootstrap.Glyphicon, { glyph: 'pencil' })
        )
      ),
      _lodash2['default'].map(modelAdmin.fields, function (modelField, key) {
        if (!_utilsShouldEditFieldInline2['default'](modelField)) return null;
        return _react2['default'].createElement(
          'td',
          { key: key, className: 'fla-list-edit-td' },
          _react2['default'].createElement(_reduxForm.Field, {
            key: key,
            name: key,
            modelField: modelField,
            component: _inputsSmartInput2['default']
          })
        );
      }),
      _lodash2['default'].map(modelAdmin.relationFields, function (modelField, key) {
        if (!_utilsShouldEditFieldInline2['default'](modelField)) return null;
        return _react2['default'].createElement(
          'td',
          { key: key, className: 'fla-list-edit-td' },
          _react2['default'].createElement(_reduxForm.Field, {
            key: key,
            name: key,
            model: model,
            modelField: modelField,
            component: modelField.RelatedField
          })
        );
      }),
      showSave ? _react2['default'].createElement(
        'td',
        { className: 'fla-save-td' },
        _react2['default'].createElement(
          _reactBootstrap.Button,
          { bsStyle: 'primary', onClick: handleSubmit },
          _react2['default'].createElement(_reactBootstrap.Glyphicon, { glyph: 'ok' })
        )
      ) : null,
      modelAdmin.listDelete && _react2['default'].createElement(
        'td',
        { className: 'fla-delete-td' },
        _react2['default'].createElement(
          _reactBootstrap.Button,
          { bsStyle: 'danger', bsSize: 'xsmall', onClick: onDelete },
          _react2['default'].createElement(_reactBootstrap.Glyphicon, { glyph: 'remove' })
        )
      )
    );
  };

  _createClass(ModelListForm, null, [{
    key: 'propTypes',
    value: {
      model: _react.PropTypes.object.isRequired,
      modelAdmin: _react.PropTypes.object.isRequired,
      onDelete: _react.PropTypes.func.isRequired,

      // from redux-form
      handleSubmit: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  var _ModelListForm = ModelListForm;
  ModelListForm = _wrapComponent('_$ModelListForm')(ModelListForm) || ModelListForm;
  return ModelListForm;
})(_react2['default'].Component);

exports.ModelListForm = ModelListForm;

function createModelListForm(model) {
  return _reduxForm.reduxForm({
    form: 'model_list_row_' + model.id,
    initialValues: model
  })(ModelListForm);
}