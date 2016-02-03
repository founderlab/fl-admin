import _ from 'lodash' // eslint-disable-line
import Inflection from 'inflection'
import React, {PropTypes} from 'react'
import {Input} from 'react-bootstrap'

export default class Select extends React.Component {
  render() {
    const {options} = this.props
    const select_options = _.map(options, (value, name) => (<option key={name} value={value}>{Inflection.humanize(name)}</option>))

    //redux-form onFocus is buggy as of v3.0.0, skip it
    return (
      <Input type="select" {..._.omit(this.props, 'onFocus')}>
        <option value={null}></option>
        {select_options}
      </Input>
    )
  }
}

Select.propTypes = {
  options: PropTypes.object.isRequired,
}
