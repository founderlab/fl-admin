'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports['default'] = createModelListForm;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

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

var ModelListForm = (function (_React$Component) {
  _inherits(ModelListForm, _React$Component);

  function ModelListForm() {
    _classCallCheck(this, ModelListForm);

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

  return ModelListForm;
})(_react2['default'].Component);

exports.ModelListForm = ModelListForm;

function createModelListForm(model) {
  return _reduxForm.reduxForm({
    form: 'model_list_row_' + model.id,
    initialValues: model
  })(ModelListForm);
}