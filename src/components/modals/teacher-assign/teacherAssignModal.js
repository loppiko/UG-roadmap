import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper, Typography, Box } from '@mui/material'
import { useTeachers } from '../../../internal/api/calls/teachers'
import TeacherAssignRow from './teacherAssignRow'
import PropTypes from 'prop-types'

function TeacherAssignModal ({ subject, onClose, refreshSubjects }) {
  const { data: teachers, isLoading, error } = useTeachers()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTeachers, setSelectedTeachers] = useState([])

  const filteredTeachers = teachers.filter(teacher =>
    teacher.givenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.surname.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleTeacherSelect = (teacher, subjectType) => {
    const assignedTeacher = {
      ...teacher,
      subjectType
    }

    const existingIndex = selectedTeachers.findIndex(
      t => t.id === teacher.id && t.subjectType === subjectType
    )

    if (existingIndex > -1) {
      setSelectedTeachers(prev => prev.filter((_, index) => index !== existingIndex))
    } else {
      setSelectedTeachers(prev => [...prev, assignedTeacher])
    }
  }

  const handleSave = async () => {
    try {
      console.log('Saving assigned teachers:', selectedTeachers)

      refreshSubjects()
      onClose()
    } catch (error) {
      console.error('Error assigning teachers:', error)
    }
  }

  if (isLoading) {
    return (
      <Dialog open onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Typography>Loading teachers...</Typography>
        </DialogContent>
      </Dialog>
    )
  }

  if (error) {
    return (
      <Dialog open onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Typography color="error">Error loading teachers: {error.message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Assign Teachers to {subject.name}
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by name or surname..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />
        </Box>

        {selectedTeachers.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Selected Teachers:</Typography>
            {selectedTeachers.map((teacher, index) => (
              <Typography key={index} variant="body2">
                {teacher.givenName} {teacher.surname} - {teacher.subjectType}
              </Typography>
            ))}
          </Box>
        )}

        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="center">Lecture</TableCell>
                <TableCell align="center">Laboratory</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTeachers.length === 0
                ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography>No teachers found</Typography>
                  </TableCell>
                </TableRow>
                  )
                : (
                    filteredTeachers.map((teacher) => (
                  <TeacherAssignRow
                    key={teacher.id}
                    teacher={teacher}
                    selectedTeachers={selectedTeachers}
                    onTeacherSelect={handleTeacherSelect}
                  />
                    ))
                  )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={selectedTeachers.length === 0}
        >
          Assign Teachers ({selectedTeachers.length})
        </Button>
      </DialogActions>
    </Dialog>
  )
}

TeacherAssignModal.propTypes = {
  subject: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  refreshSubjects: PropTypes.func.isRequired
}

export default TeacherAssignModal
