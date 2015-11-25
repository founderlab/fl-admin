'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports['default'] = createModelDetailForm;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reduxForm = require('redux-form');

var _lib = require('../../lib');

var ModelDetailForm = (function (_React$Component) {
  _inherits(ModelDetailForm, _React$Component);

  function ModelDetailForm() {
    _classCallCheck(this, ModelDetailForm);

    _get(Object.getPrototypeOf(ModelDetailForm.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ModelDetailForm, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var model_admin = _props.model_admin;
      var model = _props.model;
      var fields = _props.fields;
      var handleSubmit = _props.handleSubmit;
      var onDelete = _props.onDelete;

      var inputs = (0, _lib.mapFieldsToInputs)(model_admin, fields, { model: model, size: 'large' });

      return _react2['default'].createElement(
        'div',
        null,
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
                  'form',
                  null,
                  inputs
                )
              )
            ),
            _react2['default'].createElement(
              'div',
              { className: 'row' },
              _react2['default'].createElement(
                'div',
                { className: 'col-xs-2' },
                _react2['default'].createElement(
                  _reactBootstrap.Button,
                  { bsStyle: 'danger', bsSize: 'xsmall', onClick: onDelete },
                  _react2['default'].createElement(_reactBootstrap.Glyphicon, { glyph: 'remove' })
                )
              ),
              _react2['default'].createElement(
                'div',
                { className: 'col-xs-2 col-xs-offset-8' },
                _react2['default'].createElement(
                  _reactBootstrap.Button,
                  { className: 'pull-right', bsStyle: 'primary', onClick: handleSubmit },
                  'Save'
                )
              )
            )
          )
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      model: _react.PropTypes.object.isRequired,
      model_admin: _react.PropTypes.object.isRequired,
      fields: _react.PropTypes.object.isRequired,
      handleSubmit: _react.PropTypes.func.isRequired,
      onDelete: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  return ModelDetailForm;
})(_react2['default'].Component);

exports.ModelDetailForm = ModelDetailForm;

function createModelDetailForm(model) {
  console.log('initial model', model);
  return (0, _reduxForm.reduxForm)({
    form: 'model_detail'
  }, function () {
    return {
      initialValues: model
    };
  })(ModelDetailForm);
}