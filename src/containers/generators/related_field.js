import _ from 'lodash'
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import Loader from '../../components/loader'
import RelatedModelSelector from '../../components/related_model_selector'

export default function createRelatedField(relation) {
  const {model_admin} = relation
  const {load, save, del} = model_admin.actions

  return @connect(state => ({model_store: state.admin[model_admin.path]}), {load, save, del})
  class RelatedField extends Component {

    static propTypes = {
      model_store: PropTypes.object,
      form_field: PropTypes.object,
      load: PropTypes.func,
      save: PropTypes.func,
      del: PropTypes.func,
    }

    static needs = [load]

    hasData() {
      return this.props.model_store && !this.props.model_store.get('loading')
    }

    render() {
      console.log('this.hasData()', this.hasData())
      if (!this.hasData()) return (<Loader type="inline" />)
      const {model_store, form_field} = this.props

      return (
        <RelatedModelSelector relation={relation} model_admin={model_admin} model_store={model_store} form_field={form_field} />
      )
    }
  }

}
