import _ from 'lodash' // eslint-disable-line
import React from 'react'
import {Link} from 'react-router'
import {Grid, Row, Col} from 'react-bootstrap'
import {model_admins} from '../index'

// Landing page for the auto admin. Just links to all model index pages.
export default function ModelTypeList() {

  const links = _.map(model_admins, model_admin => (
    <Row key={model_admin.path}>
      <Col lg={8} lgOffset={1}>
        <Link className="fla-model-type-list-link" to={model_admin.link()}>{model_admin.plural}</Link>
      </Col>
    </Row>
  ))

  return (
    <section className="fla-model-type-list">
      <Grid fluid>
        <Row>
          <Col lg={8} lgOffset={1}>
            <h1>Admin Home</h1>
          </Col>
        </Row>
        {links}
      </Grid>
    </section>
  )

}
