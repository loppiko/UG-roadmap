import PropTypes from 'prop-types'
import React from 'react'

/**
 * @param {Teacher} teacher
 * @returns {JSX.Element}
 */

function TeacherView ({ teacher }) {
  return (
    <div>
      <h1>{{ teacher }}</h1>
    </div>
  )
}

TeacherView.propTypes = {
  teacher: PropTypes.object.isRequired
}

export default TeacherView
