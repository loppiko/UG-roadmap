import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Alert,
  CircularProgress,
  Grid2
} from '@mui/material'
import PropTypes from 'prop-types'
import { AVAILABLE_SEMESTERS } from '../../../internal/types/subject'
import { UseMoveSubject } from '../../../internal/api/calls/subject'

/**
 * @param {object} props
 * @param {Subject} props.subject - Subject to move
 * @param {Function} props.onClose - Function to close the modal
 * @param {Function} props.afterMove - Function to call after successful move
 * @returns {JSX.Element}
 */
function MoveSubjectModal ({ subject, onClose, afterMove }) {
  const [selectedSemester, setSelectedSemester] = useState(subject.semester)
  const { moveSubject, isLoading, error } = UseMoveSubject()

  const handleSemesterChange = (event) => {
    setSelectedSemester(parseInt(event.target.value, 10))
  }

  const handleMove = async () => {
    if (selectedSemester === subject.semester) {
      alert('Subject is already in this semester')
      return
    }

    try {
      await moveSubject(subject, selectedSemester)

      if (!error) {
        afterMove()
        onClose()
      }
    } catch (err) {
      console.error('Error moving subject:', err)
      alert(`Failed to move subject: ${err.message}`)
    }
  }

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Move Subject: {subject.name}
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <FormControl component="fieldset" fullWidth>
            <Alert severity="info" sx={{ mb: 2 }}>Remember that subject will be moved immediately</Alert>
            <RadioGroup
              value={selectedSemester}
              onChange={handleSemesterChange}
              sx={{ mt: 2 }}
            >
              <Grid2 container spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                {AVAILABLE_SEMESTERS.map((semester) => (
                  <Grid2 item xs={6} key={`semester-${semester}`}>
                    <FormControlLabel
                      value={semester}
                      control={<Radio />}
                      label={`Semester ${semester}`}
                      sx={{
                        margin: 0,
                        padding: 1,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        backgroundColor: selectedSemester === semester ? '#f5f5f5' : 'transparent',
                        '&:hover': {
                          backgroundColor: '#f9f9f9'
                        },
                        width: '100%'
                      }}
                    />
                  </Grid2>
                ))}
              </Grid2>
            </RadioGroup>
          </FormControl>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Failed to move subject: {error.message}
            </Alert>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleMove}
          variant="contained"
          disabled={isLoading || selectedSemester === subject.semester}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          {isLoading ? 'Moving...' : 'Move Subject'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

MoveSubjectModal.propTypes = {
  subject: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  afterMove: PropTypes.func.isRequired
}

export default MoveSubjectModal
