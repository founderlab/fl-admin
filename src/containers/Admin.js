import React from 'react'
import Helmet from 'react-helmet'
import {Sidebar} from 'fl-react-utils'
import Navbar from '../components/Navbar'
import AdminSidebar from '../components/Sidebar'
import headerTags from '../lib/headerTags'

export default class Admin extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
  }

  render() {
    const sidebarProps = {
      sidebar: <AdminSidebar />,
      reactSidebarProps: {
        sidebarClassName: 'fla-sidebar',
      },
    }

    return (
      <Sidebar {...sidebarProps}>
        <Helmet
          title=""
          titleTemplate={`%s - admin`}
          {...headerTags(this.props)}
        />
        <div className="fla-main">
          <Navbar />
          {this.props.children}
        </div>
      </Sidebar>
    )
  }
}
