import React from 'react'
import { Box, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import TeacherChip from './teacherChip'

/**
 * @param {object} props
 * @param {string} props.title
 * @param {AssignedTeacher[]} props.teachers
 * @returns {JSX.Element}
 */
function SelectedTeacherBox ({ title, teachers }) {
  return (
    <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="h8" sx={{ fontWeight: 'bold', alignSelf: 'center' }} >{title}</Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {teachers.length > 0
        ? (
            teachers.map((teacher, index) => (
              <TeacherChip
                key={index}
                teacher={teacher}
              />
            ))
          )
        : (
        <Typography variant="body1" sx={{ textAlign: 'center' }} >No teachers selected</Typography>
          )}
        </Box>
    </Box>
  )
}

SelectedTeacherBox.propTypes = {
  title: PropTypes.string.isRequired,
  teachers: PropTypes.array.isRequired
}

export default SelectedTeacherBox
