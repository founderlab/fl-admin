import _ from 'lodash'
import Queue from 'queue-async'
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import Loader from '../../components/Loader'
import ModelList from '../../components/ModelList'
import ModelDetail from '../../components/ModelDetail'
import fetchRelated from '../../lib/fetchRelated'

const ITEMS_PER_PAGE = 10

export default function createModelEditor(model_admin) {
  const {load, loadPage, count, save, del} = model_admin.actions

  return @connect(
    state => ({
      model_store: state.admin[model_admin.path],
      id: state.router.params.id,
      config: state.config,
    }),
    {load, save, del}
  )
  class ModelEditor extends Component {

    static propTypes = {
      model_store: PropTypes.object,
      id: PropTypes.string,
      load: PropTypes.func,
      save: PropTypes.func,
      del: PropTypes.func,
    }

    static fetchData({store, action}, callback) {
      const {router} = store.getState()
      const model_id = router.params.id
      const query = {}
      const queue = new Queue()

      if (model_id) {
        queue.defer(callback => {
          query.id = model_id
          store.dispatch(load(query, callback))
        })
      }
      else {
        queue.defer(callback => store.dispatch(count(query, callback)))
        queue.defer(callback => {
          query.$limit = ITEMS_PER_PAGE

          // lookup the page from the incoming action here if one exists
          // if the ?page=xxx query was changed by redux-router the state won't have updated yet
          const page = +(action && action.payload ? action.payload.location.query.page : router.location.query.page) || 1

          if (page > 1) query.$offset = ITEMS_PER_PAGE * (page-1)
          return store.dispatch(loadPage(page, query, callback))
        })
      }

      queue.await(err => {
        if (err) return console.log(err)
        const model_store = store.getState().admin[model_admin.path]
        const model_ids = model_id ? [model_id] : model_store.get('pagination').get('visible').toJSON()
        fetchRelated({store, model_admin, model_ids, load_all: !!model_id}, callback)
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
      const config = this.props.config.toJSON()

      const component_props = {
        id,
        model_admin,
        model_store,
        config,
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
