import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap'

export default function PaginationLinks(props) {

  const {current_page, total_pages, onPage} = props
  const links = []
  const onPageFn = (i) => () => onPage(i)

  for (let i=1; i<=total_pages; i++) {
    const style = current_page === i ? 'primary' : 'default'
    links.push(<Button key={i} onClick={onPageFn(i)} bsStyle={style}>{i}</Button>)
  }

  return (
    <ButtonToolbar>
      <ButtonGroup bsSize="small">
        {links}
      </ButtonGroup>
    </ButtonToolbar>
  )

}

PaginationLinks.propTypes = {
  current_page: PropTypes.number,
  total_pages: PropTypes.number,
  onPage: PropTypes.func,
}
