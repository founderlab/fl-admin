import React, {PropTypes} from 'react'

export default function Admin(props) {
  return (
    <div className="admin">
      {props.children}
    </div>
  )
}

Admin.propTypes = {
  children: PropTypes.node,
}
