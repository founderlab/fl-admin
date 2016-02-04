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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _react2 = _interopRequireDefault(_react);

var _reactDropzoneS3Uploader = require('react-dropzone-s3-uploader');

var _reactDropzoneS3Uploader2 = _interopRequireDefault(_reactDropzoneS3Uploader);

var _components = {
  _$FileUploader: {
    displayName: 'FileUploader'
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/components/inputs/FileUploader.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

var FileUploader = (function (_React$Component) {
  _inherits(FileUploader, _React$Component);

  function FileUploader() {
    var _this = this;

    _classCallCheck(this, _FileUploader);

    _React$Component.apply(this, arguments);

    this.handleFinishedUpload = function (info) {
      _this.props.onChange(info.filename);
      //TODO: Saving here causes a react warning. Revisit
      _this.props.handleSubmit();
    };
  }

  FileUploader.prototype.render = function render() {
    var _props = this.props;
    var config = _props.config;
    var size = _props.size;
    var value = _props.value;
    var defaultValue = _props.defaultValue;
    var url = config.url;
    var s3_url = config.s3_url;

    var max_file_size = config.max_file_upload_size;

    var style = {
      height: size === 'large' ? 200 : 100,
      border: 'dashed 2px #999',
      borderRadius: 5,
      position: 'relative',
      cursor: 'pointer'
    };

    var uploader_props = { style: style, max_file_size: max_file_size, s3_url: s3_url, filename: value || defaultValue, host: url };

    return _react2['default'].createElement(
      'div',
      { className: 'form-group form-group-lg' },
      this.props.label ? _react2['default'].createElement(
        'label',
        { className: 'control-label' },
        this.props.label
      ) : null,
      _react2['default'].createElement(_reactDropzoneS3Uploader2['default'], _extends({ onFinish: this.handleFinishedUpload }, uploader_props))
    );
  };

  _createClass(FileUploader, null, [{
    key: 'propTypes',
    value: {
      label: _react.PropTypes.string,
      size: _react.PropTypes.string,
      value: _react.PropTypes.string,
      defaultValue: _react.PropTypes.string,
      onChange: _react.PropTypes.func.isRequired,
      handleSubmit: _react.PropTypes.func.isRequired,
      config: _react.PropTypes.object.isRequired
    },
    enumerable: true
  }]);

  var _FileUploader = FileUploader;
  FileUploader = _wrapComponent('_$FileUploader')(FileUploader) || FileUploader;
  return FileUploader;
})(_react2['default'].Component);

exports['default'] = FileUploader;
module.exports = exports['default'];