import React, {PropTypes} from 'react'

export default function Loader(props) {
  if (props.inline) return (<span>loading...</span>)
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            loading...
          </div>
        </div>
      </div>
    </section>
  )
}

Loader.propTypes = {
  inline: PropTypes.string,
}
