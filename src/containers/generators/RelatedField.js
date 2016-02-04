import _ from 'lodash' // eslint-disable-line
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import warning from 'warning'
import Loader from '../../components/Loader'
import BelongsTo from '../../components/inputs/BelongsTo'
import HasMany from '../../components/inputs/HasMany'
import InlineRelation from '../../components/inputs/InlineRelation'

export default function createRelatedField(relation_field) {
  const {model_admin} = relation_field
  if (!model_admin) return null
  const {load, save, del} = model_admin.actions

  return @connect(state => ({model_store: state.admin[model_admin.path], config: state.config}), {load, save, del})
  class RelatedField extends Component {

    static propTypes = {
      model: PropTypes.object,
      model_store: PropTypes.object,
      form_field: PropTypes.object,
      load: PropTypes.func,
    }

    hasData() {
      return this.props.model_store && !this.props.model_store.get('loading')
    }

    hasManyRelationAttrs = () => ({[relation_field.relation.foreign_key]: this.props.model.id})

    handleAdd = () => {
      this.props.save(this.hasManyRelationAttrs())
    }
    handleSaveFn = model => data => this.props.save(_.extend(this.hasManyRelationAttrs(), model, data))
    handleDeleteFn = model => () => this.props.del(model)

    render() {
      if (!this.hasData()) return (<Loader type="inline" />)
      const {model, model_store, input_props} = this.props
      const props = {relation_field, model, model_store, input_props}

      if (relation_field.type === 'belongsTo') {
        if (relation_field.inline) console.log('[fl-admin] inline editing belongsTo relations is not yet supported')
        return (<BelongsTo {...props} />)
      }

      if (relation_field.type === 'hasMany' || relation_field.type === 'hasOne') {

        // if (related_model[relation_field.relation.foreign_key] !== model.id) return
        props.models = _(model_store.get('by_id').toJSON()).values().filter(related_model => related_model[relation_field.relation.foreign_key] === model.id).value()

        //TODO: This should be made to work for belongsTo / manyToMany
        if (relation_field.inline) {
          return (
            <InlineRelation
              label={input_props.label}
              config={this.props.config.toJSON()}
              onAdd={this.handleAdd}
              handleSaveFn={this.handleSaveFn}
              handleDeleteFn={this.handleDeleteFn}
              {...props}
            />
          )
        }

        return (<HasMany {...props} />)
      }

      warning(false, `[fl-admin] Relation does not have a known type: ${relation_field.type}. Note that manyToMany is not yet supported`)
      return null
    }
  }

}
