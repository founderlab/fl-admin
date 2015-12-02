'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = PaginationLinks;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function PaginationLinks(props) {
  var current_page = props.current_page;
  var total_pages = props.total_pages;
  var handleClick = props.handleClick;

  var links = [];
  console.log('current_page, total_pages', current_page, total_pages);
  for (var i = 1; i <= total_pages; i++) {
    links.push(_react2['default'].createElement(
      'a',
      { key: i, onClick: handleClick(i) },
      i
    ));
  }
  console.log('links, links', links);
  return _react2['default'].createElement(
    'div',
    null,
    _react2['default'].createElement(
      'p',
      null,
      current_page
    ),
    links
  );
}

PaginationLinks.propTypes = {
  current_page: _react.PropTypes.number,
  total_pages: _react.PropTypes.number,
  handleClick: _react.PropTypes.func
};
module.exports = exports['default'];