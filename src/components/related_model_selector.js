import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {Input} from 'react-bootstrap'
// , ListGroup, ListItem
export default function RelatedModelSelector(props) {

  const {relation_field, model, model_store, input_props} = props
  const models = model_store.get('by_id').toJSON ? model_store.get('by_id').toJSON() : {}

  let content = null

  // shortcut to avoid messing with saving relations: link to the related model for hasMany
  // the alternative is to set `input_props.multiple = true` and figure it out
  if (relation_field.type === 'hasMany' || relation_field.type === 'hasOne') {
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
    content = (<div className="list-group">{links}</div>)
  }

  else if (relation_field.type === 'belongsTo' /*|| relation_field.type === 'hasOne' */) {
    const select_options = _.map(models, model => (<option key={model.id} value={model.id}>{relation_field.model_admin.display(model)}</option>))

    //redux-form onFocus is buggy as of v3.0.0, skip it
    content = (
      <Input type="select" label={relation_field.key} {..._.omit(input_props, 'onFocus')} >
        {!input_props.multiple ? (<option value="null"></option>) : null}
        {select_options}
      </Input>
    )
  }

  if (!content) return null

  return (
    <div>
      <label>{relation_field.key}</label>
      {content}
    </div>
  )
}

RelatedModelSelector.propTypes = {
  relation_field: PropTypes.object,
  model_admin: PropTypes.object,
  model_store: PropTypes.object,
}
