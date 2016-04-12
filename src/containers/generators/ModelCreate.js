import _ from 'lodash' // eslint-disable-line
import {connect} from 'react-redux'
import React, {Component, PropTypes} from 'react'
import {pushState} from 'redux-router'
import ModelDetail from '../../containers/ModelDetail'

export default function createModelCreate(model_admin) {
  const {save, del} = model_admin.actions

  return @connect(
    state => ({
      model_store: state.admin[model_admin.path],
      config: state.config,
    }),
    {save, del, pushState}
  )
  class ModelEditor extends Component {

    static propTypes = {
      model_store: PropTypes.object.isRequired,
      save: PropTypes.func,
      del: PropTypes.func,
    }

    handleSaveFn = () => data => {
      this.props.save(data, (err) => {
        if (err) return console.log(err)
        const model = this.props.model_store.get('last_saved').toJSON()
        this.props.pushState(null, model_admin.link(model.id))
      })
    }

    // todo: make delete undoable
    handleDeleteFn = model => () => {
      if (window.confirm('Are you really, really sure you want to delete this model? You can\'t have it back.')) {
        this.props.del(model, err => err && console.log(err))
        if (this.props.id) pushState(model_admin.link())
      }
    }

    render() {
      const {model_store} = this.props
      const config = this.props.config.toJSON()

      const component_props = {
        model_admin,
        model_store,
        config,
        handleSaveFn: this.handleSaveFn,
        handleDeleteFn: this.handleDeleteFn,
      }

      return (
        <ModelDetail {...component_props} />
      )
    }
  }
}
