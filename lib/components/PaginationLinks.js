'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = PaginationLinks;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

function PaginationLinks(props) {
  var current_page = props.current_page;
  var total_pages = props.total_pages;
  var onPage = props.onPage;

  var links = [];
  var onPageFn = function onPageFn(i) {
    return function () {
      return onPage(i);
    };
  };

  for (var i = 1; i <= total_pages; i++) {
    var style = current_page === i ? 'primary' : 'default';
    links.push(_react2['default'].createElement(
      _reactBootstrap.Button,
      { key: i, onClick: onPageFn(i), bsStyle: style },
      i
    ));
  }

  return _react2['default'].createElement(
    _reactBootstrap.ButtonToolbar,
    null,
    _react2['default'].createElement(
      _reactBootstrap.ButtonGroup,
      { bsSize: 'small' },
      links
    )
  );
}

PaginationLinks.propTypes = {
  current_page: _react.PropTypes.number,
  total_pages: _react.PropTypes.number,
  onPage: _react.PropTypes.func
};
module.exports = exports['default'];