import _ from 'lodash'
import Queue from 'queue-async'
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import Loader from '../../components/loader'
import ModelList from '../../components/model_list'
import ModelDetail from '../../components/model_detail'
import fetchRelated from '../../lib/fetch_related'

const ITEMS_PER_PAGE = 10

export default function createModelList(model_admin) {
  const {load, loadPage, save, del} = model_admin.actions


  return @connect(state => ({model_store: state.admin[model_admin.path], id: state.router.params.id}), {load, save, del})
  class ModelEditorContainer extends Component {

    static propTypes = {
      model_store: PropTypes.object,
      id: PropTypes.string,
      load: PropTypes.func,
      save: PropTypes.func,
      del: PropTypes.func,
    }

    static fetchData(store, callback) {
      const {router} = store.getState()
      const query = {}
      const model_id = router.params.id
      const queue = new Queue(1)

      if (model_id) {
        queue.defer(callback => {
          query.id = model_id
          store.dispatch(load(query, callback))
        })
      }
      else {
        queue.defer(callback => {
          query.$limit = ITEMS_PER_PAGE
          const page = +router.location.query.page || 1
          if (page > 1) query.$offset = ITEMS_PER_PAGE * (page-1)
          return store.dispatch(loadPage(page, query, callback))
        })
      }

      queue.await(err => {
        if (err) return console.log(err)
        fetchRelated({store, model_admin, load_all: !!model_id}, callback)
      })
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
