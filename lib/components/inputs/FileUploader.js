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

var _reactS3UploaderS3upload = require('react-s3-uploader/s3upload');

var _reactS3UploaderS3upload2 = _interopRequireDefault(_reactS3UploaderS3upload);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

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

var MAX_FILE_SIZE_BYTES = 1024 * 1024 * 10;

var FileUploader = (function (_React$Component) {
  _inherits(FileUploader, _React$Component);

  function FileUploader() {
    var _this = this;

    _classCallCheck(this, _FileUploader);

    _React$Component.apply(this, arguments);

    this.onProgress = function (progress) {
      _this.setState({ progress: progress });
    };

    this.onError = function (err) {
      _this.setState({ error: err });
    };

    this.onFinish = function (info) {
      _this.refs.input.value = info.filename;
      _this.setState({ filename: info.filename, error: null, progress: null });
    };

    this.handleDrop = function (files) {
      var error = null;
      var size = files[0].size;

      if (files.length > 1) {
        error = 'Only drop one file';
      } else if (size > MAX_FILE_SIZE_BYTES) {
        var size_mb = (size / 1024 / 1024).toFixed(2);
        var max_mb = (MAX_FILE_SIZE_BYTES / 1024 / 1024).toFixed(2);
        error = 'Files nust be smaller than ' + max_mb + 'kb. Yours is ' + size_mb;
      }
      _this.setState({ error: error });
      if (error) return;

      new _reactS3UploaderS3upload2['default']({ // eslint-disable-line
        files: files,
        signingUrl: '/s3/sign',
        onProgress: _this.onProgress,
        onFinishS3Put: _this.onFinish,
        onError: _this.onError,
        uploadRequestHeaders: { 'x-amz-acl': 'public-read' },
        contentDisposition: 'auto',
        server: _this.props.config.url || '/'
      });
    };
  }

  // style={style}

  FileUploader.prototype.render = function render() {
    var _props = this.props;
    var size = _props.size;
    var input_props = _props.input_props;

    var state = this.state || { filename: this.props.value };
    var filename = state.filename;
    var progress = state.progress;
    var error = state.error;

    var image_url = filename ? this.props.config.s3_url + '/' + filename : null;

    var style = {
      height: size === 'large' ? 200 : 100,
      border: 'dashed 2px #999',
      borderRadius: 5,
      position: 'relative'
    };
    var imgStyle = {
      position: 'absolute',
      top: 0,
      width: 'auto',
      height: '100%'
    };

    return _react2['default'].createElement(
      'div',
      { className: 'form-group form-group-lg' },
      this.props.label ? _react2['default'].createElement(
        'label',
        { className: 'control-label' },
        this.props.label
      ) : null,
      _react2['default'].createElement('input', _extends({ ref: 'input', type: 'text', style: { display: 'none' } }, input_props)),
      _react2['default'].createElement(
        _reactDropzone2['default'],
        { onDrop: this.handleDrop },
        _react2['default'].createElement(
          'h4',
          { className: 'text-center' },
          'upload'
        ),
        image_url ? _react2['default'].createElement('img', { src: image_url, style: imgStyle }) : null,
        progress ? _react2['default'].createElement(
          'small',
          null,
          progress
        ) : null,
        error ? _react2['default'].createElement(
          'small',
          null,
          error
        ) : null
      )
    );
  };

  _createClass(FileUploader, null, [{
    key: 'propTypes',
    value: {
      label: _react.PropTypes.string,
      size: _react.PropTypes.string,
      input_props: _react.PropTypes.object,
      config: _react.PropTypes.object,
      value: _react.PropTypes.string
    },
    enumerable: true
  }]);

  var _FileUploader = FileUploader;
  FileUploader = _wrapComponent('_$FileUploader')(FileUploader) || FileUploader;
  return FileUploader;
})(_react2['default'].Component);

exports['default'] = FileUploader;
module.exports = exports['default'];