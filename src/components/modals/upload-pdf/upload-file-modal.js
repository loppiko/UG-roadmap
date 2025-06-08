import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Alert, IconButton, CircularProgress } from '@mui/material'
import {
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon
} from '@mui/icons-material'
import PropTypes from 'prop-types'
import { languages } from '../../../internal/consts/consts'

/**
 * Modal component for uploading PDF files
 * @param {object} props
 * @param {boolean} props.open - Whether the modal is open
 * @param {() => void} props.onClose - Function to call when modal should be closed
 * @param {(file: File, language: string) => Promise<void>} props.onUpload - Function to call when file is uploaded (file) => Promise
 * @param {string} props.title - Modal title
 * @returns {JSX.Element}
 */
function UploadFileModal ({ open, onClose, onUpload, title = 'Upload PDF File' }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    validateFile(file)

    if (error) return

    setUploading(true)
    await onUpload(file, languages.ENGLISH)
    setUploading(false)
    if (error) return

    onClose()
  }

  const validateFile = (file) => {
    setError('')

    if (!file) return

    // Validate file type
    if (file.type !== 'application/pdf') {
      setError('Please select a PDF file')
      return
    }

    const maxSize = 20 * 1024 * 1024 // 20MB
    if (file.size > maxSize) {
      setError('File size must be less than 20MB')
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragOver(false)

    const file = event.dataTransfer.files[0]
    validateFile(file)
  }

  const handleClose = () => {
    setError('')
    setUploading(false)
    setDragOver(false)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

    {(!uploading)
      ? <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* File Drop Zone */}
        <Box
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            border: `2px dashed ${dragOver ? '#062D73' : '#ccc'}`,
            borderRadius: 2,
            padding: 4,
            textAlign: 'center',
            backgroundColor: dragOver ? 'rgba(6, 45, 115, 0.05)' : 'transparent',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            mb: 2
          }}
          onClick={() => document.getElementById('file-input').click()}
        >
          <input
            id="file-input"
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />

          <CloudUploadIcon sx={{ fontSize: 48, color: '#062D73', mb: 1 }} />

          <Typography variant="h6" gutterBottom>
            {dragOver ? 'Drop your PDF here' : 'Drop PDF here or click to browse'}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Maximum file size: 10MB
          </Typography>
        </Box>
      </DialogContent>
      : <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
            <Typography variant="body2" gutterBottom sx={{ display: 'block', marginTop: '0.5rem' }}>Uploading. This action may take up to 60 seconds.</Typography>
        </Box>
      </DialogContent>
    }

      <DialogActions sx={{ padding: 3, paddingTop: 1 }}>
        <Button onClick={handleClose} disabled={uploading} variant="outlined" color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

UploadFileModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpload: PropTypes.func.isRequired,
  title: PropTypes.string
}

export default UploadFileModal
