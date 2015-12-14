import _ from 'lodash' // eslint-disable-line
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import {pushState} from 'redux-router'
import PaginationLinks from '../../components/PaginationLinks'

export default function createPagination(model_admin) {
  const {count, loadPage} = model_admin.actions

  return @connect(state => ({model_store: state.admin[model_admin.path], location: state.router.location}), {count, loadPage, pushState})
  class Pagination extends Component {

    static propTypes = {
      model_store: PropTypes.object,
      items_per_page: PropTypes.number,
      loadPage: PropTypes.func,
    }

    hasData() {
      return this.props.model_store && !this.props.model_store.get('loading')
    }

    handlePage = (page) => {
      const {location, pushState} = this.props
      pushState(null, `${location.pathname}?page=${page}`)
    }

    render() {
      if (!this.hasData()) return null
      const {model_store} = this.props
      const current_page = model_store.get('pagination').get('current_page')
      const total = model_store.get('pagination').get('total')
      const total_pages = Math.ceil(total / this.props.items_per_page)

      return (<PaginationLinks current_page={current_page} total_pages={total_pages} onPage={this.handlePage} />)
    }
  }

}
