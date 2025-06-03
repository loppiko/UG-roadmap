import React from 'react'
import { Box, Typography, Chip, Avatar } from '@mui/material'
import PropTypes from 'prop-types'

function SelectedTeacherBox ({ title, teachers }) {
  return (
    <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="h8" sx={{ fontWeight: 'bold', alignSelf: 'center' }} >{title}</Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {teachers.length > 0
        ? (
            teachers.map((teacher, index) => (
            <Chip
            key={index}
          color="primary"
          variant="outlined"
          label={`${teacher.givenName} ${teacher.surname}`}
          avatar={<Avatar>{teacher.givenName.charAt(0)}</Avatar>}
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
