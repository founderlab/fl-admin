import _ from 'lodash' // eslint-disable-line
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import Loader from '../../components/loader'
import RelatedModelSelector from '../../components/related_model_selector'

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

    static needs = [load]

    hasData() {
      return this.props.model_store && !this.props.model_store.get('loading')
    }

    render() {
      if (!this.hasData()) return (<Loader type="inline" />)
      const {model, model_store, input_props} = this.props

      return (
        <RelatedModelSelector relation_field={relation_field} model={model} model_store={model_store} input_props={input_props} />
      )
    }
  }

}
