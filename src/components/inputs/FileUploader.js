import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import DropzoneS3Uploader from 'react-dropzone-s3-uploader'

export default class FileUploader extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    size: PropTypes.string,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
  }

  handleFinishedUpload = (info) => {
    this.props.onChange(info.filename)
  }

  render() {
    const {config, size, value, defaultValue} = this.props
    const {url, s3_url} = config
    const max_file_size = config.max_file_upload_size

    const style = {
      height: size === 'large' ? 200 : 100,
      border: 'dashed 2px #999',
      borderRadius: 5,
      position: 'relative',
      cursor: 'pointer',
    }

    const uploader_props = {style, max_file_size, s3_url, filename: value || defaultValue, host: url}

    return (
      <div className="form-group form-group-lg">
        {this.props.label ? (<label className="control-label">{this.props.label}</label>) : null}
        <DropzoneS3Uploader onFinish={this.handleFinishedUpload} {...uploader_props} />
      </div>
    )
  }
}

