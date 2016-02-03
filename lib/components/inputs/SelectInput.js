'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = Select;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _inflection = require('inflection');

var _inflection2 = _interopRequireDefault(_inflection);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

function Select(props) {
  var options = props.options;

  var select_options = _lodash2['default'].map(options, function (name, value) {
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
    select_options
  );
}

Select.propTypes = {
  options: _react.PropTypes.object.isRequired
};
module.exports = exports['default'];