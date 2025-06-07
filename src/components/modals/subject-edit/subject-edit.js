import React, { useEffect, useRef, useState } from 'react'
import TabList from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import SubjectEditDescription from './subject-edit-description'
import SubjectEditSkills from './subject-edit-skills'
import SubjectEditOther from './subject-edit-other'
import PropTypes from 'prop-types'
import { apiDeleteRequest, apiPostRequest, apiPutRequest } from '../../../internal/api/api-communication'
import { validateSubject } from '../../../internal/types/subject'
import { FormControl, TextField } from '@mui/material'
import DeleteButton from '../../buttons/deleteButton'
import SaveButton from '../../buttons/saveButton'
import DeleteSubjectModal from '../delete-subject/deleteSubjectModal'
import { assert } from '../../../internal/tools'
import { useNotifications } from '@toolpad/core'
import { createNotificationProps, Severity } from '../../../internal/notifications/notifyTools'

/**
 * @param {Function} handleEditExit
 * @param {Subject} subject
 * @param {Function} handleEditAction
 * @returns {JSX.Element}
 */

function SubjectEdit ({ handleEditExit, subject, handleEditAction }) {
  const subjectEditReference = useRef(null)
  const [activeTab, setActiveTab] = useState(0)
  const [editedSubject, setEditedSubject] = useState(/** @type {Subject | null} */ null)
  const [subjectNameError, setSubjectNameError] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const notifications = useNotifications()

  useEffect(() => {
    setEditedSubject(subject)
  }, [subject])

  /**
   * @param {[boolean, Any]} validatedData - [Validation successful?, data]
   * @param {keyof Subject} key
   */
  const editSubject = (validatedData, key) => {
    const [validated, value] = validatedData

    if (!validated) return

    setEditedSubject(prevSubject => ({
      ...prevSubject,
      [key]: value
    }))
  }

  /**
   * @param {string} name
   * @returns {boolean}
   */
  const validateSubjectName = (name) => {
    if (!name) {
      setSubjectNameError('Subject name cannot be empty')
      return false
    }
    setSubjectNameError('')
    return true
  }

  async function handleDelete () {
    try {
      assert(subject.id !== null && subject.id !== undefined && subject.id !== '', 'Subject ID is required')
      await apiDeleteRequest(`semester/${subject.semester}/subject/${subject.id}`, editedSubject)
      handleEditAction()
      notifications.show('Subject deleted successfully', createNotificationProps(Severity.SUCCESS))
    } catch (error) {
      console.error(error)
      notifications.show(`Failed to delete subject: ${error.message}`, createNotificationProps(Severity.ERROR))
    }
  }

  async function handleSave () {
    try {
      const [isValid, message] = validateSubject(editedSubject)

      if (!isValid) {
        notifications.show(message, createNotificationProps(Severity.WARNING))
        return
      }

      if (subject.id === null || subject.id === undefined || subject.id === '') {
        await apiPostRequest(`semester/${editedSubject.semester}/subject`, editedSubject)
      } else {
        await apiPutRequest(`semester/${subject.semester}/subject`, editedSubject)
      }

      handleEditAction()
      notifications.show('Subject saved successfully', createNotificationProps(Severity.SUCCESS))
    } catch (error) {
      console.error(error)
      notifications.show(`Failed to alter subject: ${error.message}`, createNotificationProps(Severity.ERROR))
    }
  }

  if (!editedSubject) return null

  return (
        <div className="subject-edit-background">
            <div className="subject-edit" ref={subjectEditReference}>
                {
                  (showDeleteModal) &&
                  <DeleteSubjectModal
                    subjectName={subject.name}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDelete}
                  />
                }
                <div className="subject-edit-upper-panel">
                    <div className="subject-edit-upper-panel-left-side">
                        <FormControl>
                            <TextField
                                variant="standard"
                                error={!!subjectNameError}
                                defaultValue={(editedSubject.name) ? editedSubject.name : ''}
                                placeholder={'Subject name'}
                                label={subjectNameError}
                                onChange={(e) => editSubject([validateSubjectName(e.target.value), e.target.value], 'name')}
                                sx={{
                                  '& .MuiInputBase-input': {
                                    fontSize: '1.75rem',
                                    fontWeight: 'bold',
                                    color: '#062D73',
                                    fontFamily: 'Montserrat'
                                  },
                                  '& .MuiInput-underline:before': {
                                    borderBottom: 'none'
                                  },
                                  '& .MuiInput-underline:hover:before': {
                                    borderBottom: 'none'
                                  },
                                  '& .MuiFormLabel-root': {
                                    color: '#d32f2f',
                                    fontSize: '0.875rem'
                                  },
                                  '& .MuiFormLabel-root.Mui-focused': {
                                    color: '#d32f2f'
                                  }
                                }}
                            />
                        </FormControl>
                        <div className="subject-edit-upper-panel-semester">{`Semester ${subject.semester}`}</div>
                    </div>
                    <div className="subject-edit-upper-panel-right-side">
                        {(subject.id) && (<DeleteButton callback={() => setShowDeleteModal(true)}/>)}
                        <SaveButton callback={handleSave}/>
                        <div className="subject-edit-upper-panel-right-side-exit" onClick={handleEditExit}>Exit</div>
                    </div>
                </div>
                <TabList value={activeTab} onChange={(_, value) => setActiveTab(value)} className="subject-edit-tabs">
                    <Tab className="subject-edit-tabs-description" label={'Description'}></Tab>
                    <Tab className="subject-edit-tabs-skills" label={'Skills'}></Tab>
                    <Tab className="subject-edit-tabs-other" label={'Other'}></Tab>
                </TabList>
                <div className="subject-edit-content">
                    {(activeTab === 0) && <SubjectEditDescription subject={editedSubject} editSubject={editSubject}/>}
                    {(activeTab === 1) && <SubjectEditSkills editSubject={editSubject} editedSkillArray={editedSubject.skills}/>}
                    {(activeTab === 2) && <SubjectEditOther subject={editedSubject} editSubject={editSubject} refreshSubjects={handleEditAction}/>}
                </div>
            </div>
        </div>

  )
}

SubjectEdit.propTypes = {
  handleEditExit: PropTypes.func.isRequired,
  subject: PropTypes.object.isRequired,
  handleEditAction: PropTypes.func.isRequired
}

export default SubjectEdit
