'use strict';

var _reactTransformCatchErrors2 = require('react-transform-catch-errors');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _reactTransformCatchErrors3 = _interopRequireDefault(_reactTransformCatchErrors2);

var _react = require('react');

var _redboxReact = require('redbox-react');

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

exports.__esModule = true;
exports.mapFieldsToInputs = mapFieldsToInputs;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _componentsInputsSmartInput = require('../components/inputs/SmartInput');

var _componentsInputsSmartInput2 = _interopRequireDefault(_componentsInputsSmartInput);

var _components = {
  _$Inputs: {
    displayName: 'Inputs'
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/components/Inputs.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

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
    _classCallCheck(this, _Inputs);

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

  var _Inputs = Inputs;
  Inputs = _wrapComponent('_$Inputs')(Inputs) || Inputs;
  return Inputs;
})(_react2['default'].Component);

exports['default'] = Inputs;