'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports['default'] = createModelListRowForm;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reactRouter = require('react-router');

var _reduxForm = require('redux-form');

var _model_field_input = require('../model_field_input');

var _model_field_input2 = _interopRequireDefault(_model_field_input);

var ModelListForm = (function (_React$Component) {
  _inherits(ModelListForm, _React$Component);

  function ModelListForm() {
    _classCallCheck(this, ModelListForm);

    _get(Object.getPrototypeOf(ModelListForm.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ModelListForm, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var model_admin = _props.model_admin;
      var model = _props.model;
      var handleDelete = _props.handleDelete;
      var fields = _props.fields;
      var handleSubmit = _props.handleSubmit;

      var inputs = [];

      _lodash2['default'].forEach(fields, function (field, name) {
        var model_field = model_admin.fields[name];
        inputs.push(_react2['default'].createElement(
          'td',
          { key: name },
          _react2['default'].createElement(_model_field_input2['default'], { model_field: model_field, form_field: field, size: 'small' })
        ));
      });

      return _react2['default'].createElement(
        'tr',
        null,
        _react2['default'].createElement(
          'td',
          null,
          _react2['default'].createElement(
            _reactRouter.Link,
            { to: '/admin/' + model_admin.path + '/' + model.id },
            model_admin.display(model)
          )
        ),
        inputs,
        inputs.length && _react2['default'].createElement(
          'td',
          null,
          _react2['default'].createElement(
            _reactBootstrap.Button,
            { bsStyle: 'primary', onClick: handleSubmit },
            _react2['default'].createElement(_reactBootstrap.Glyphicon, { glyph: 'ok' })
          )
        ),
        _react2['default'].createElement(
          'td',
          null,
          _react2['default'].createElement(
            _reactBootstrap.Button,
            { bsStyle: 'danger', bsSize: 'xsmall', onClick: handleDelete },
            _react2['default'].createElement(_reactBootstrap.Glyphicon, { glyph: 'remove' })
          )
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      model: _react.PropTypes.object,
      model_admin: _react.PropTypes.object,
      fields: _react.PropTypes.object,
      handleSubmit: _react.PropTypes.func,
      handleDelete: _react.PropTypes.func
    },
    enumerable: true
  }]);

  return ModelListForm;
})(_react2['default'].Component);

exports.ModelListForm = ModelListForm;

function createModelListRowForm(model) {
  return (0, _reduxForm.reduxForm)({
    form: 'model_list_row'
  }, function () {
    return {
      initialValues: model
    };
  })(ModelListRow);
}