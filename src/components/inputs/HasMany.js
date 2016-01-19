import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Link} from 'react-router'

export default function HasMany(props) {

  const {relation_field, model, model_store, input_props} = props
  const models = model_store.get('by_id').toJSON ? model_store.get('by_id').toJSON() : {}

  // shortcut to avoid messing with saving relations: link to the related model for hasMany
  // the alternative is to set `input_props.multiple = true` and figure it out
  const {model_admin} = relation_field
  const links = []

  _.forEach(models, related_model => {
    if (related_model[relation_field.relation.foreign_key] !== model.id) return
    links.push(
      <Link to={model_admin.link(related_model)} className="list-group-item" key={related_model.id}>
        {model_admin.display(related_model)}
        <br />
      </Link>
    )
  })

  return (
    <div>
      {input_props.label ? (<label className="control-label">{input_props.label}</label>) : null}
      <div className="list-group">
        {links}
      </div>
    </div>
  )
}

HasMany.propTypes = {
  model: PropTypes.object.isRequired,
  model_admin: PropTypes.object.isRequired,
  relation_field: PropTypes.object.isRequired,
  model_store: PropTypes.object.isRequired,
  input_props: PropTypes.object.isRequired,
}
