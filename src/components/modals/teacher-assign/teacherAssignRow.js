import React from 'react'
import { TableRow, TableCell, Checkbox } from '@mui/material'
import PropTypes from 'prop-types'

function TeacherAssignRow ({ teacher, selectedTeachers, onTeacherSelect }) {
  const isLectureSelected = selectedTeachers.some(
    t => t.id === teacher.id && t.subjectType === 'Lecture'
  )

  const isLaboratorySelected = selectedTeachers.some(
    t => t.id === teacher.id && t.subjectType === 'Laboratory'
  )

  const handleLectureChange = () => {
    onTeacherSelect(teacher, 'Lecture')
  }

  const handleLaboratoryChange = () => {
    onTeacherSelect(teacher, 'Laboratory')
  }

  return (
    <TableRow hover>
      <TableCell>{teacher.givenName}</TableCell>
      <TableCell>{teacher.surname}</TableCell>
      <TableCell>{teacher.mail}</TableCell>
      <TableCell align="center">
        <Checkbox
          checked={isLectureSelected}
          onChange={handleLectureChange}
          color="primary"
        />
      </TableCell>
      <TableCell align="center">
        <Checkbox
          checked={isLaboratorySelected}
          onChange={handleLaboratoryChange}
          color="primary"
        />
      </TableCell>
    </TableRow>
  )
}

TeacherAssignRow.propTypes = {
  teacher: PropTypes.shape({
    id: PropTypes.string.isRequired,
    givenName: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    mail: PropTypes.string.isRequired
  }).isRequired,
  selectedTeachers: PropTypes.array.isRequired,
  onTeacherSelect: PropTypes.func.isRequired
}

export default TeacherAssignRow
