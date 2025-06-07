import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Alert } from '@mui/material'
import PropTypes from 'prop-types'
import DeleteButton from '../../buttons/deleteButton'

/**
 * @param {object} props
 * @param {Function} props.onClose - Function to close the modal
 * @param {Function} props.onDelete - Function to handle deletion
 * @param {boolean} props.isLoading - Whether deletion is in progress
 * @returns {JSX.Element}
 */
function DeleteSubjectModal ({ onClose, onDelete, isLoading = false }) {
  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ color: '#800000', fontWeight: 'bold' }}>
        Delete Subject
      </DialogTitle>

      <DialogContent>
        <Alert severity="warning">
            This action cannot be undone. All data associated with this subject will be permanently removed.
        </Alert>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={isLoading}
          sx={{ mr: 1 }}
        >
          Cancel
        </Button>

        <DeleteButton
          callback={onDelete}
          disabled={isLoading}
        />
      </DialogActions>
    </Dialog>
  )
}

DeleteSubjectModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
}

export default DeleteSubjectModal
