import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import ReactDatetime from 'react-datetime'

export default function Datetime(props) {
  return (
    <div className="form-group form-group-sm">
      {props.label ? (<label className="control-label">{props.label}</label>) : null}
      <ReactDatetime {...props} />
    </div>
  )
}

Datetime.propTypes = {
  label: PropTypes.string,
  size: PropTypes.string,
}
