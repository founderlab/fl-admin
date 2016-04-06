import _ from 'lodash' // eslint-disable-line
import React from 'react'
import {Link} from 'react-router'
import {LinkContainer} from 'react-router-bootstrap'
import {Nav, NavItem, Glyphicon} from 'react-bootstrap'
import {model_admins} from '../index'

// Links to all model index pages for the sidebar
export default function Sidebar() {

  const links = _.map(model_admins, model_admin => (
    <LinkContainer key={model_admin.path} to={model_admin.link()}><NavItem>{model_admin.plural}</NavItem></LinkContainer>
  ))

  return (
    <div>
      <Link to="/admin" className="fla-sidebar-header">
        <Glyphicon glyph="ice-lolly-tasted" />
      </Link>
      <Nav bsStyle="pills" stacked>
        {links}
      </Nav>
    </div>
  )
}
