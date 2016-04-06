import _ from 'lodash' // eslint-disable-line
import Queue from 'queue-async'
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import {pushState} from 'redux-router'
// import {createPaginationSelector} from 'fl-react-utils'
import Loader from '../../components/Loader'
import ModelList from '../../containers/ModelList'
import ModelDetail from '../../containers/ModelDetail'
import fetchRelated from '../../lib/fetchRelated'

export default function createModelEditor(model_admin) {
  const {load, loadPage, count, save, del} = model_admin.actions

  return @connect(
    // createPaginationSelector(
    //   state => state.admin[model_admin.path],
    //   state => ({
    //     model_store: state.admin[model_admin.path],
    //     id: state.router.params.id,
    //     config: state.config,
    //   })
    // ),
    state => ({
      model_store: state.admin[model_admin.path],
      id: state.router.params.id,
      config: state.config,
    }),
    {load, save, del, pushState}
  )
  class ModelEditor extends Component {

    static propTypes = {
      model_store: PropTypes.object.isRequired,
      id: PropTypes.string,
      load: PropTypes.func,
      save: PropTypes.func,
      del: PropTypes.func,
    }

    static fetchData({store, action}, callback) {
      const {router} = store.getState()

      // lookup the location from the incoming action here if one exists
      // if the ?page=xxx query was changed by redux-router the state won't have updated yet
      const location = (action && action.payload && action.payload.location ? action.payload.location : router.location)
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
          query.$limit = model_admin.per_page

          const page = +location.query.page || 1

          if (page > 1) query.$offset = model_admin.per_page * (page-1)
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
      return !this.props.model_store.get('loading')
    }

    handleAdd = () => this.props.save({})
    handleSaveFn = model => data => this.props.save(_.extend(model, data))

    // todo: make delete undoable
    handleDeleteFn = model => () => {
      if (window.confirm('Are you really, really sure you want to delete this model? You can\'t have it back.')) {
        this.props.del(model, err => err && console.log(err))
        if (this.props.id) pushState(model_admin.link())
      }
    }

    render() {
      if (!this.hasData()) return (<Loader />)
      // const {id, model_store, visible_items, location} = this.props
      const {id, model_store, location} = this.props
      const config = this.props.config.toJSON()

      const current_page = +(location.query.page || 1)
      const items_per_page = +(location.query.per_page || model_admin.per_page)

      // TODO: These should come from the pagination selector via createPaginationSelector,
      // but it's causing an infinite loop for whatever reason
      const pagination = model_store.get('pagination')
      const visible_ids = pagination.get('visible').toJSON()
      const total_items = +(pagination.get('total'))
      const visible_items = []
      _.forEach(visible_ids, id => visible_items.push(model_store.get('by_id').get(id).toJSON()))

      const component_props = {
        id,
        model_admin,
        model_store,
        config,
        visible_items,
        total_items,
        location,
        current_page,
        items_per_page,
        onAdd: this.handleAdd,
        handleSaveFn: this.handleSaveFn,
        handleDeleteFn: this.handleDeleteFn,
      }

      if (id) return (<ModelDetail {...component_props} />)
      return (<ModelList {...component_props} />)
    }
  }

}
