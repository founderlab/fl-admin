import _ from 'lodash' // eslint-disable-line
import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Navbar, Nav, NavItem, Glyphicon} from 'react-bootstrap'

export default function AdminNavbar({show_sidebar_toggle, onToggleSidebar}) {

  return (
    <Navbar fluid>
      <Nav>
        {show_sidebar_toggle && (
          <li className="pull-left">
            <a onClick={onToggleSidebar}>
              <Glyphicon glyph="menu-hamburger" />
            </a>
          </li>
        )}
        <LinkContainer to="/logout"><NavItem className="pull-right">Logout</NavItem></LinkContainer>
      </Nav>
    </Navbar>
  )
}

AdminNavbar.propTypes = {
  show_sidebar_toggle: React.PropTypes.bool.isRequired,
  onToggleSidebar: React.PropTypes.func.isRequired,
}
