import React from 'react'
import Sidebar from 'react-sidebar'
import Navbar from '../components/Navbar'
import AdminSidebar from '../components/Sidebar'

export default class Admin extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
  }

  constructor() {
    super()
    this.state = {docked: false, open: false}
  }

  componentWillMount() {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia(`(min-width: 768px)`)
    mql.addListener(this.mediaQueryChanged)
    this.setState({mql, docked: mql.matches})
  }

  componentWillUnmount() {
    this.state.mql && this.state.mql.removeListener(this.mediaQueryChanged)
  }

  onSetOpen = open => {
    this.setState({open})
  }

  mediaQueryChanged = () => {
    this.setState({docked: this.state.mql && this.state.mql.matches})
  }

  handleSidebarToggle = ev => {
    this.setState({open: !this.state.open})
    if (ev) ev.preventDefault()
  }

  render() {
    const sidebar_props = {
      sidebar: <AdminSidebar />,
      sidebarClassName: 'fla-sidebar',
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen,
    }

    return (
      <Sidebar {...sidebar_props}>
        <div className="fla-main">
          <Navbar show_sidebar_toggle={!this.state.docked} onToggleSidebar={this.handleSidebarToggle} />
          {this.props.children}
        </div>
      </Sidebar>
    )
  }
}
