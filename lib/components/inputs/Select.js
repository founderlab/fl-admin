'use strict';

var _reactTransformCatchErrors2 = require('react-transform-catch-errors');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _reactTransformCatchErrors3 = _interopRequireDefault(_reactTransformCatchErrors2);

var _react = require('react');

var _redboxReact = require('redbox-react');

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

exports.__esModule = true;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _components = {
  _$Select: {
    displayName: 'Select'
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/components/inputs/Select.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

var Select = (function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select() {
    _classCallCheck(this, _Select);

    _React$Component.apply(this, arguments);
  }

  Select.prototype.render = function render() {
    var options = this.props.options;

    var selectOptions = _lodash2['default'].map(options, function (value, name) {
      return _react2['default'].createElement(
        'option',
        { key: name, value: value },
        _inflection2['default'].humanize(name)
      );
    });

    //redux-form onFocus is buggy as of v3.0.0, skip it
    return _react2['default'].createElement(
      _reactBootstrap.Input,
      _extends({ type: 'select' }, _lodash2['default'].omit(this.props, 'onFocus')),
      _react2['default'].createElement('option', { value: null }),
      selectOptions
    );
  };

  var _Select = Select;
  Select = _wrapComponent('_$Select')(Select) || Select;
  return Select;
})(_react2['default'].Component);

exports['default'] = Select;

Select.propTypes = {
  options: _react.PropTypes.object.isRequired
};
module.exports = exports['default'];