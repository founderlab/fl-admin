import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Link} from 'react-router'

export default function HasMany(props) {
  const {relationField, model, models, inputProps} = props

  // shortcut to avoid messing with saving relations: link to the related model for hasMany
  // the alternative is to set `inputProps.multiple = true` and figure it out
  const {modelAdmin} = relationField
  const links = []

  _.forEach(models, relatedModel => {
    if (relatedModel[relationField.relation.foreignKey] !== model.id) return
    links.push(
      <Link to={modelAdmin.link(relatedModel)} className="list-group-item" key={relatedModel.id} target="_blank">
        {modelAdmin.display(relatedModel)}
        <br />
      </Link>
    )
  })

  return (
    <div>
      {inputProps.label ? (<label className="control-label">{inputProps.label}</label>) : null}
      <div className="list-group">
        {links}
      </div>
    </div>
  )
}

HasMany.propTypes = {
  model: PropTypes.object.isRequired,
  models: PropTypes.array.isRequired,
  relationField: PropTypes.object.isRequired,
  inputProps: PropTypes.object.isRequired,
}
