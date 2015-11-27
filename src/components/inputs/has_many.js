import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Link} from 'react-router'

export default function RelatedModelSelector(props) {

  const {relation_field, model, model_store} = props
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
  return (<div className="list-group">{links}</div>)
}

RelatedModelSelector.propTypes = {
  relation_field: PropTypes.object,
  model_admin: PropTypes.object,
  model_store: PropTypes.object,
}
