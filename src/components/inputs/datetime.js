import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import Datetime from 'react-datetime'

export default function DatetimeInput(props) {
  return (
    <div className="form-group form-group-lg">
      {props.label ? (<label className="control-label">{props.label}</label>) : null}
      <Datetime {...props} />
    </div>
  )
}

DatetimeInput.propTypes = {
  label: PropTypes.string,
  size: PropTypes.string,
}
