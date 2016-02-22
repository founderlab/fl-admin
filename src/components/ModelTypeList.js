import _ from 'lodash' // eslint-disable-line
import React from 'react'
import {Link} from 'react-router'
import {model_admins} from '../index'

// Landing page for the auto admin. Just links to all model index pages.
export default function ModelTypeList() {

  const links = _.map(model_admins, model_admin => (
    <div key={model_admin.path} className="row">
      <div className="col-lg-8 col-lg-offset-1">
        <h4><Link to={model_admin.link()}>{model_admin.plural}</Link></h4>
      </div>
    </div>
  ))

  return (
    <div className="admin">
      <section>
        <div className="container shadow-panel">
          <div className="row">
            <div className="col-lg-8 col-lg-offset-1">
              <h1>Admin Home</h1>
            </div>
          </div>
          {links}
        </div>
      </section>
    </div>
  )

}
