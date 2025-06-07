import React from 'react'
import { Typography, Chip } from '@mui/material'
import PropTypes from 'prop-types'
import TeacherChip from '../../modals/teacher-assign/teacherChip'

/**
 * @param {object} props
 * @param {AssignedTeacher[]} props.teachers
 * @param {string} props.title
 * @param {"small" | "medium"} props.size
 * @param {boolean} props.displayOneLine
 * @param {boolean} props.showReducedNumberOfTeachers
 * @returns {JSX.Element}
 */
function SubjectTeacherBox ({ teachers, title, size, displayOneLine, showReducedNumberOfTeachers = false }) {
  const typographyTitleVariant = size === 'small' ? 'subtitle2' : 'h5'
  const typographyBodyVariant = size === 'small' ? 'body2' : 'body1'

  const renderTeachers = () => {
    if (!teachers || teachers.length === 0) {
      return <Typography variant={typographyBodyVariant} color="text.secondary">No teachers assigned</Typography>
    }

    const teacherComponents = []
    const maxTeachersToShow = showReducedNumberOfTeachers ? Math.min(teachers.length, 2) : teachers.length

    for (let i = 0; i < maxTeachersToShow; i++) {
      teacherComponents.push(
        <TeacherChip
          key={i}
          teacher={teachers[i]}
        />
      )
    }

    if (teachers.length > 2 && showReducedNumberOfTeachers) {
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

  const subjectTeacherBoxStyle = {
    display: (displayOneLine) ? 'flex' : 'block',
    flexWrap: (displayOneLine) ? 'wrap' : 'nowrap',
    alignItems: (displayOneLine) ? 'center' : 'flex-start',
    width: (displayOneLine) ? 'max-content' : '100%'
  }

  return (
    <div className="subject-teacher-box" style={subjectTeacherBoxStyle}>
      <Typography variant={typographyTitleVariant} style={{ marginRight: (displayOneLine) ? '0.5rem' : '0' }}>{title}</Typography>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', width: (displayOneLine) ? 'max-content' : '100%' }}>
        {renderTeachers()}
      </div>
    </div>
  )
}

SubjectTeacherBox.propTypes = {
  teachers: PropTypes.array,
  title: PropTypes.string,
  size: PropTypes.string,
  displayOneLine: PropTypes.bool,
  showReducedNumberOfTeachers: PropTypes.bool
}

export default SubjectTeacherBox
