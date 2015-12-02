import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'

export default function PaginationLinks(props) {

  const {current_page, total_pages, handleClick} = props

  const links = []
  console.log('current_page, total_pages', current_page, total_pages)
  for (let i=1; i<=total_pages; i++) {
    links.push(<a key={i} onClick={handleClick(i)}>{i}</a>)
  }
console.log('links, links', links)
  return (
    <div>
      <p>{current_page}</p>
      {links}
    </div>
  )

}

PaginationLinks.propTypes = {
  current_page: PropTypes.number,
  total_pages: PropTypes.number,
  handleClick: PropTypes.func,
}
