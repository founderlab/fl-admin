import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import S3Upload from 'react-s3-uploader/s3upload'
import Dropzone from 'react-dropzone'

const MAX_FILE_SIZE_BYTES = 1024 * 1024 * 10

export default class FileUploader extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    size: PropTypes.string,
    input_props: PropTypes.object,
    config: PropTypes.object,
    value: PropTypes.string,
  }

  onProgress = (progress) => {
    this.setState({progress})
  }

  onError = (err) => {
    this.setState({error: err})
  }

  onFinish = (info) => {
    this.refs.input.value = info.filename
    this.setState({filename: info.filename, error: null, progress: null})
  }

  handleDrop = (files) => {
    let error = null
    const size = files[0].size

    if (files.length > 1) {
      error =`Only drop one file`
    }
    else if (size > MAX_FILE_SIZE_BYTES) {
      const size_mb = (size / 1024 / 1024).toFixed(2)
      const max_mb = (MAX_FILE_SIZE_BYTES / 1024 / 1024).toFixed(2)
      error = `Files nust be smaller than ${max_mb}kb. Yours is ${size_mb}`
    }
    this.setState({error})
    if (error) return

    new S3Upload({                                            // eslint-disable-line
      files,
      signingUrl: '/s3/sign',
      onProgress: this.onProgress,
      onFinishS3Put: this.onFinish,
      onError: this.onError,
      uploadRequestHeaders: {'x-amz-acl': 'public-read'},
      contentDisposition: 'auto',
      server: this.props.config.url || '/',
    })

  }

  render() {
    const {size, input_props} = this.props
    const state = this.state || {filename: this.props.value}
    const {filename, progress, error} = state
    const image_url = filename ? `${this.props.config.s3_url}/${filename}` : null

    const style = {
      height: size === 'large' ? 200 : 100,
      border: 'dashed 2px #999',
      borderRadius: 5,
      position: 'relative',
    }
    const imgStyle = {
      position: 'absolute',
      top: 0,
      width: 'auto',
      height: '100%',
    }

    return (
      <div className="form-group form-group-lg">
        {this.props.label ? (<label className="control-label">{this.props.label}</label>) : null}

        <input ref="input" type="text" style={{display: 'none'}} {...input_props} />

        <Dropzone  onDrop={this.handleDrop}>
          <h4 className="text-center">upload</h4>

          {image_url ? (<img src={image_url} style={imgStyle} />) : null}
          {progress ? (<small>{progress}</small>) : null}
          {error ? (<small>{error}</small>) : null}
        </Dropzone>

      </div>
    )
  }
}
// style={style}
