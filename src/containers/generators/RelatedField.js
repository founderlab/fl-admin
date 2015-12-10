import _ from 'lodash' // eslint-disable-line
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import warning from 'warning'
import Loader from '../../components/Loader'
import BelongsTo from '../../components/inputs/BelongsTo'
import HasMany from '../../components/inputs/HasMany'

export default function createRelatedField(relation_field) {
  const {model_admin} = relation_field
  const {load} = model_admin.actions

  return @connect(state => ({model_store: state.admin[model_admin.path]}), {load})
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

    render() {
      if (!this.hasData()) return (<Loader type="inline" />)
      const {model, model_store, input_props} = this.props

      if (relation_field.type === 'belongsTo' /*|| relation_field.type === 'hasOne' */) {
        return (<BelongsTo relation_field={relation_field} model={model} model_store={model_store} input_props={input_props} />)
      }

      if (relation_field.type === 'hasMany' || relation_field.type === 'hasOne') {
        return (<HasMany relation_field={relation_field} model={model} model_store={model_store} input_props={input_props} />)
      }

      warning(false, `[fl-admin] Relation does not have a known type: ${relation_field.type}`)
      return null
    }
  }

}
