import _ from 'lodash' // eslint-disable-line
import React from 'react'
import {Link} from 'react-router'
import {Navbar, Nav, Glyphicon} from 'react-bootstrap'

export default function AdminNavbar() {

  return (
    <Navbar fluid>
      <Nav>
        <li className="pull-right"><a href="/logout">Logout</a></li>
      </Nav>
    </Navbar>
  )
}

AdminNavbar.propTypes = {

}
