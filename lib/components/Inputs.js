'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.mapFieldsToInputs = mapFieldsToInputs;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _componentsInputsSmartInput = require('../components/inputs/SmartInput');

var _componentsInputsSmartInput2 = _interopRequireDefault(_componentsInputsSmartInput);

function mapFieldsToInputs(modelAdmin, fields) {
  var _props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var InputComponent = arguments.length <= 3 || arguments[3] === undefined ? _componentsInputsSmartInput2['default'] : arguments[3];
}

// return _.map(fields, (field, key) => {
//   const modelField = modelAdmin.fields[key] || modelAdmin.relationFields[key]

//   warning(modelField, `[fl-admin] Can't find modelField for key ${key}: is this key the field name instead of the virtual_id_accessor?`)
//   if (!modelField || modelField.hidden) return null

//   const props = _.clone(_props)
//   if (modelField.link) props.onChange = handleOnChangeFn(field, fields[modelField.link.to], modelField)

//   return (
//     <InputComponent
//       key={key}
//       modelField={modelField}
//       formField={field}
//       {...props}
//     />
//   )
// })

var Inputs = (function (_React$Component) {
  _inherits(Inputs, _React$Component);

  function Inputs() {
    _classCallCheck(this, Inputs);

    _React$Component.apply(this, arguments);

    this.handleOnChangeFn = function (field, target, modelField) {
      return function (ev) {
        field.onChange(ev);
        target.onChange(modelField.link.parse ? modelField.link.parse(ev.target.value) : ev.target.value);
      };
    };
  }

  Inputs.prototype.renderField = function renderField(field, key) {
    var modelAdmin = this.props.modelAdmin;

    var modelField = modelAdmin.fields[key] || modelAdmin.relationFields[key];

    _warning2['default'](modelField, '[fl-admin] Can\'t find modelField for key ' + key + ': is this key the field name instead of the virtual_id_accessor?');
    if (!modelField || modelField.hidden) return null;

    var props = _lodash2['default'].clone(_props);
    if (modelField.link) props.onChange = handleOnChangeFn(field, fields[modelField.link.to], modelField);

    return _react2['default'].createElement(InputComponent, _extends({
      key: key,
      modelField: modelField,
      formField: field
    }, props));
  };

  Inputs.prototype.render = function render() {
    var _this = this;

    return _react2['default'].createElement(
      'div',
      null,
      _lodash2['default'].map(fields, function (field, key) {
        return _this.renderField(field, key);
      })
    );
  };

  _createClass(Inputs, null, [{
    key: 'PropTypes',
    value: {
      modelAdmin: _react.PropTypes.object,
      InputComponent: _react.PropTypes['function']
    },
    enumerable: true
  }]);

  return Inputs;
})(_react2['default'].Component);

exports['default'] = Inputs;