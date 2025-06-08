import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper, Typography, Box } from '@mui/material'
import { useTeachers } from '../../../internal/api/calls/teachers'
import TeacherAssignRow from './teacherAssignRow'
import PropTypes from 'prop-types'
import { SubjectType, teacherToAssignedTeacher } from '../../../internal/types/teacher'
import SubjectTeacherBox from '../../private/subject-list/subject-teacher-box'

/**
 * @param {object} param
 * @param {string} param.subjectName
 * @param {AssignedTeacher[]} param.teachersList
 * @param {Function} param.onClose
 * @param {Function} param.handleAssignTeachers
 * @returns {JSX.Element}
 */
function TeacherAssignModal ({ subjectName, teachersList, onClose, handleAssignTeachers }) {
  const { data: teachers, isLoading, error } = useTeachers()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTeachers, setSelectedTeachers] = useState(teachersList || [])

  const filteredTeachers = teachers.filter(teacher =>
    teacher.givenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.surname.toLowerCase().includes(searchTerm.toLowerCase())
  )

  /**
   * @param {Teacher} teacher
   * @param {'Laboratory' | 'Lecture'} subjectType
   */
  const handleTeacherSelect = (teacher, subjectType) => {
    const assignedTeacher = teacherToAssignedTeacher(teacher, subjectType)

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
      handleAssignTeachers(selectedTeachers)
      onClose()
    } catch (error) {
      console.error('Error assigning teachers:', error)
      alert(`Error assigning teachers: ${error.message}`)
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
        Assign Teachers to {subjectName}
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

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
          <SubjectTeacherBox teachers={selectedTeachers.filter(teacher => teacher.subjectType === SubjectType.LABORATORY)} title="Laboratory Teachers: " size="small" displayOneLine />
          <SubjectTeacherBox teachers={selectedTeachers.filter(teacher => teacher.subjectType === SubjectType.LECTURE)} title="Lecture Teachers: " size="small" displayOneLine />
        </Box>

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
  subjectName: PropTypes.string.isRequired,
  teachersList: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  handleAssignTeachers: PropTypes.func.isRequired
}

export default TeacherAssignModal
