import React, { useEffect, useState } from 'react'
import SubjectListComponent from '../../components/private/subject-list/subject-list-component'
import { useSubjects } from '../../internal/api/calls/subject'
import SubjectEdit from '../../components/modals/subject-edit/subject-edit'
import { Button, CircularProgress, TextField, Typography } from '@mui/material'
import { useNotifications } from '@toolpad/core'
import { createNotificationProps, Severity } from '../../internal/notifications/notifyTools'
import UploadFileModal from '../../components/modals/upload-pdf/upload-file-modal'
import { usePdfFileUpload } from '../../internal/api/calls/uploadFile'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
/**
 * @returns {JSX.Element}
 */

function SubjectsList () {
  const { subjects, isLoading, error, refetchSubjects, emptySubject } = useSubjects()
  const [isSubjectEditVisible, setIsSubjectEditVisible] = useState(false)
  const [subjectToEdit, setSubjectToEdit] = useState(null)
  const notifications = useNotifications()
  const [uploadFileModalOpen, setUploadFileModalOpen] = useState(false)
  const { uploadFile } = usePdfFileUpload()
  const [filteredSubjects, setFilteredSubjects] = useState(/** @type {Subject[]} */([]))

  let lastFilter = ''

  function handleEditExit () {
    setSubjectToEdit(null)
    setIsSubjectEditVisible(false)
  }

  function handleEditAction () {
    setSubjectToEdit(null)
    setIsSubjectEditVisible(false)
    refetchSubjects()
  }

  /**
   * @param {File} file
   * @param {keyof typeof languages} language
   */
  async function handleUploadFile (file, language) {
    try {
      const partialSubject = await uploadFile(file, language)
      setSubjectToEdit({
        ...emptySubject,
        ...partialSubject
      })
      setIsSubjectEditVisible(true)
    } catch (error) {
      notifications.show(`Error: ${error.message}`, createNotificationProps(Severity.ERROR))
      console.log(error)
    }
  }

  /**
   * @param {Subject} subject
   */
  function handleEditSubject (subject) {
    setSubjectToEdit(subject)
    setIsSubjectEditVisible(true)
  }

  /**
   * @param {string} search
   */
  function filterSubjects (search) {
    const searchLower = search.toLowerCase()

    const subjectToFilter = (lastFilter.length > search.length) ? filteredSubjects : subjects

    if (search.length === 0) setFilteredSubjects(subjects)
    else {
      setFilteredSubjects(subjectToFilter.filter((subject) => {
        return subject.name.toLowerCase().includes(searchLower) ||
        subject.skills.some((skill) => skill.name.toLowerCase().includes(searchLower)) ||
        subject.teachers.some((teacher) => `${teacher.givenName} ${teacher.surname}`.toLowerCase().includes(searchLower))
      }))
    }

    lastFilter = search
  }

  useEffect(() => {
    setFilteredSubjects(subjects)
  }, [subjects])

  if (error) {
    notifications.show(`Error: ${error.message}`, createNotificationProps(Severity.ERROR))
  }

  return (
        <div className="subject-list-container" style={{ width: '1080px' }}>
            {
              uploadFileModalOpen &&
              <UploadFileModal
                open={uploadFileModalOpen}
                onClose={() => setUploadFileModalOpen(false)}
                onUpload={handleUploadFile}
                title="Upload Subject Syllabus"
              />
            }
            {
                isSubjectEditVisible &&
                subjectToEdit &&
                <SubjectEdit
                    handleEditExit={handleEditExit}
                    subject={subjectToEdit}
                    handleEditAction={handleEditAction}
                />
            }
            <div className="subject-list-container-upper-part">
                <div className="subject-list-container-title">List of subjects</div>
                <div className="subject-list-container-user-logo">Logo</div>
            </div>
            <div className="subject-list-container-box">
                <div className="subject-list-container-box-list-header">
                    <div className="subject-list-container-box-list-header-filter">
                        <TextField
                            variant="outlined"
                            placeholder="Search"
                            onChange={(e) => filterSubjects(e.target.value)}
                        />
                    </div>
                    <div className="subject-list-container-box-list-header-add">
                        <Button
                            onClick={() => handleEditSubject(emptySubject)}
                            variant="outlined"
                            color="primary"
                            startIcon={<AddCircleOutlineIcon />}
                        >
                            Add subject
                        </Button>
                        <Button
                            onClick={() => setUploadFileModalOpen(true)}
                            variant="contained"
                            color="primary"
                            startIcon={<AutoAwesomeIcon />}
                        >
                            Upload file
                        </Button>
                    </div>
                </div>
                {
                    (isLoading)
                      ? (
                        <div style={{ width: '100%', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <CircularProgress />
                        </div>
                        )
                      : (filteredSubjects.length > 0)
                          ? filteredSubjects.map((subject, index) => (
                        <SubjectListComponent
                            onClick={() => handleEditSubject(subject)}
                            subject={subject}
                            subjectIndex={index}
                            refreshSubjects={refetchSubjects}
                            key={`${subject.name}-${index}`}
                        />
                          ))
                          : (
                        <div style={{ width: '100%', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <Typography variant="h6">No subjects matches current filter</Typography>
                        </div>
                            )
                }
            </div>
        </div>
  )
}

export default SubjectsList
