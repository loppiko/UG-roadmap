import React, { useRef, useState } from 'react'
import TabList from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import SubjectEditDescription from './subject-edit-description'
import SubjectEditSkills from './subject-edit-skills'
import SubjectEditOther from './subject-edit-other'
import PropTypes from 'prop-types'
import { apiPostRequest, apiPutRequest } from '../../../internal/api/api-communication'
import { validateSubject } from '../../../internal/types/subject'
import { FormControl, TextField } from '@mui/material'
import DeleteButton from '../../buttons/deleteButton'
import SaveButton from '../../buttons/saveButton'

/**
 * @param {Function} handleEditExit
 * @param {Subject} subject
 * @returns {JSX.Element}
 */

function SubjectEdit ({ handleEditExit, subject }) {
  const subjectEditReference = useRef(null)
  const [activeTab, setActiveTab] = useState(0)
  const [editedSubject, setEditedSubject] = useState(/** @type {Subject} */ subject)
  const [subjectNameError, setSubjectNameError] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  console.log(showDeleteModal)

  /**
   * @param {[boolean, Any]} validatedData - [Validation successful?, data]
   * @param {string} key
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

  async function handleSave () {
    try {
      const [isValid, message] = validateSubject(editedSubject)

      if (!isValid) {
        alert(message)
        return
      }

      if (subject.id === null || subject.id === undefined || subject.id === '') {
        await apiPostRequest(`semester/${editedSubject.semester}/subject`, editedSubject)
      } else {
        await apiPutRequest(`semester/${subject.semester}/subject`, editedSubject)
      }
    } catch (error) {
      console.error(error)
      alert(`Failed to alter subject: ${error.message}`)
    }
    console.log(editedSubject)
  }

  return (
        <div className="subject-edit-background">
            <div className="subject-edit" ref={subjectEditReference}>
                {/* {(showDeleteModal) && <DeleteModal
                    title={'Delete Subject'}
                    message={`Are you sure to delete subject: ${subject.name}`}
                    handleExit={() => setShowDeleteModal(false)}
                    deleteCallback={handleDeleteSubject}
                />} */}
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
                    {(activeTab === 0) && <SubjectEditDescription subject={subject} editSubject={editSubject}/>}
                    {(activeTab === 1) && <SubjectEditSkills editSubject={editSubject} editedSkillArray={editedSubject.skills}/>}
                    {(activeTab === 2) && <SubjectEditOther subject={subject} editSubject={editSubject}/>}
                </div>
            </div>
        </div>

  )
}

SubjectEdit.propTypes = {
  handleEditExit: PropTypes.func.isRequired,
  subject: PropTypes.object.isRequired
}

export default SubjectEdit
