import _ from 'lodash'
import Queue from 'queue-async'
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import Loader from '../../components/loader'
import ModelList from '../../components/model_list'
import ModelDetail from '../../components/model_detail'

const ITEMS_PER_PAGE = 10

export default function createModelList(model_admin) {
  const {load, loadPage, save, del} = model_admin.actions

  // const related_load_actions = []
  // _.forEach(model_admin.fields, field => {
  //   if (field.model_admin) related_load_actions.push(field.model_admin.actions.load)
  // })

  return @connect(state => ({model_store: state.admin[model_admin.path], id: state.router.params.id}), {load, save, del})
  class ModelEditorContainer extends Component {

    static propTypes = {
      model_store: PropTypes.object,
      id: PropTypes.string,
      load: PropTypes.func,
      save: PropTypes.func,
      del: PropTypes.func,
    }

    // static needs = related_load_actions.concat([load])

    static fetchData(store, callback) {
      const state = store.getState()
      const query = {}
      const is_detail = !!state.router.params.id

      _.forEach(model_admin.relation_fields, relation_field => {
        console.log('adding', relation_field.key)
        const include = []
        if (is_detail || relation_field.inline) include.push(relation_field.key)
        if (include.length) query.$include = include
      })

      if (state.router.params.id) {
        query.id = state.router.params.id
      }
      else {
        query.$limit = ITEMS_PER_PAGE
        const page = +state.router.location.query.page || 1
        if (page > 1) query.$offset = ITEMS_PER_PAGE * (page-1)
        console.log('loading page', page)
        console.log('query is', query)
        return store.dispatch(loadPage(page, query, callback))
      }

      console.log('single; query is', query)
      store.dispatch(load(query, callback))
    }

    hasData() {
      return this.props.model_store && !this.props.model_store.get('loading')
    }

    handleAdd = () => this.props.save({})
    handleSaveFn = model => data => this.props.save(_.extend(model, data))
    handleDeleteFn = model => () => this.props.del(model)

    render() {
      if (!this.hasData()) return (<Loader />)
      const {id, model_store} = this.props

      const component_props = {
        id,
        model_admin,
        model_store,
        onAdd: this.handleAdd,
        handleSaveFn: this.handleSaveFn,
        handleDeleteFn: this.handleDeleteFn,
        items_per_page: ITEMS_PER_PAGE,
      }

      if (id) return (<ModelDetail {...component_props} />)
      return (<ModelList {...component_props} />)
    }
  }

}
