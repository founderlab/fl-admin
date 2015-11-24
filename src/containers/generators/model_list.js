import _ from 'lodash'
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import Loader from '../../components/loader'
import List from '../../components/model_list'

export default function createModelList(model_admin) {
  const {load, save, del} = model_admin.actions

  const related_load_actions = []
  _.forEach(model_admin.fields, field => {
    // if (field.model_admin) console.log('adding action from', field.model_admin.name, 'to',  model_admin.name)
    if (field.model_admin) related_load_actions.push(field.model_admin.actions.load)
  })
  // console.log('related_load_actions', related_load_actions)
  return @connect(state => ({admin: state.admin[model_admin.path]}), {load, save, del})
  class ModelListContainer extends Component {

    static propTypes = {
      admin: PropTypes.object,
      load: PropTypes.func,
      save: PropTypes.func,
      del: PropTypes.func,
    }

    static needs = related_load_actions.concat([load])

    hasData() {
      return this.props.admin && !this.props.admin.get('loading')
    }

    handleAdd = () => this.props.save({}) //just save new blank model
    handleSaveFn = model => data => {this.props.save(_.extend(model, data))}
    handleDeleteFn = model => () => this.props.del(model)

    render() {
      if (!this.hasData()) return (<Loader />)
      const admin = this.props.admin

      return (
        <List model_admin={model_admin} model_store={admin}
          handleAdd={this.handleAdd}
          handleSaveFn={this.handleSaveFn}
          handleDeleteFn={this.handleDeleteFn} />
      )
    }
  }
}
