import React from 'react'
import { Box, Typography, Chip } from '@mui/material'
import PropTypes from 'prop-types'
import TeacherChip from '../../modals/teacher-assign/teacherChip'

/**
 * @param {object} props
 * @param {AssignedTeacher[]} props.teachers
 * @param {string} props.title
 * @returns {JSX.Element}
 */
function SubjectTeacherBox ({ teachers, title }) {
  const renderTeachers = () => {
    if (!teachers || teachers.length === 0) {
      return <Typography variant="body2" color="text.secondary">No teachers assigned</Typography>
    }

    const teacherComponents = []

    for (let i = 0; i < Math.min(teachers.length, 2); i++) {
      teacherComponents.push(
        <TeacherChip
          key={i}
          teacher={teachers[i]}
        />
      )
    }

    if (teachers.length > 2) {
      teacherComponents.push(
        <Chip
          key="more"
          label={`+${teachers.length - 2} more`}
          variant="outlined"
          size="small"
          sx={{
            color: '#636363'
          }}
        />
      )
    }

    return teacherComponents
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, width: 'max-content' }}>
      <Typography variant="subtitle2">{title}</Typography>
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center', width: 'max-content' }}>
        {renderTeachers()}
      </Box>
    </Box>
  )
}

SubjectTeacherBox.propTypes = {
  teachers: PropTypes.array,
  title: PropTypes.string
}

export default SubjectTeacherBox
