import React from 'react'
import { Chip, Avatar } from '@mui/material'
import PropTypes from 'prop-types'

/**
 * @param {object} props
 * @param {AssignedTeacher | Teacher} props.teacher
 * @returns {JSX.Element}
 */
function TeacherChip ({ teacher }) {
  return (
    <Chip
      color="primary"
      variant="outlined"
      label={`${teacher.givenName} ${teacher.surname}`}
      avatar={<Avatar>{teacher.givenName.charAt(0)}</Avatar>}
      onClick={() => {}}
    />
  )
}

TeacherChip.propTypes = {
  teacher: PropTypes.object.isRequired
}

export default TeacherChip
