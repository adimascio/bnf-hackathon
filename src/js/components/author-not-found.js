import React, { PropTypes } from 'react'

export default function AuthorNotFound({ history, location, route}) {
  return (
    <div>
      author not fouund
    </div>
  )
}

AuthorNotFound.propTypes = {
  history: PropTypes.object.isRequired
}