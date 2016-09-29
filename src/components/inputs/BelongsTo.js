import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Input} from 'react-bootstrap'

export default function BelongsTo(props) {
  const {relationField, modelStore, inputProps} = props
  const models = modelStore.get('models').toJSON ? modelStore.get('models').toJSON() : {}

  const selectOptions = _.map(models, model => (<option key={model.id} value={model.id}>{relationField.modelAdmin.display(model)}</option>))

  //redux-form onFocus is buggy as of v3.0.0, skip it
  return (
    <Input type="select" label={inputProps.label} {..._.omit(inputProps, 'onFocus')} >
      {!inputProps.multiple ? (<option value={null}></option>) : null}
      {selectOptions}
    </Input>
  )
}

BelongsTo.propTypes = {
  relationField: PropTypes.object.isRequired,
  modelStore: PropTypes.object.isRequired,
  inputProps: PropTypes.object.isRequired,
}
