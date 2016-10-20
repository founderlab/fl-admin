import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import ReactDatetime from 'react-datetime'
import classNames from 'classnames'

export default function Datetime(props) {
  const classes = {
    'form-group': true,
    'form-group-sm': props.size === 'small',
    'form-group-lg': props.size === 'large',
  }
  return (
    <div className={classNames(classes)}>
      {props.label ? (<label className="control-label">{props.label}</label>) : null}
      <ReactDatetime {...props} defaultValue={'1/1/1970 12:00am'} />
    </div>
  )
}

Datetime.propTypes = {
  label: PropTypes.string,
  size: PropTypes.string,
}
