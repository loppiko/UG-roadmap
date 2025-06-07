import React, { useState } from 'react'
import Textarea from '@mui/joy/Textarea'
import PropTypes from 'prop-types'
import addIcon from '../../../media/icons/add-icon.svg'
import trashIcon from '../../../media/icons/trash-icon.svg'
import { FormControl } from '@mui/material'
import { useNotifications } from '@toolpad/core'
import { createNotificationProps, Severity } from '../../../internal/notifications/notifyTools'

/**
 * @param {Function} editSubject
 * @param {Skill[]} editedSkillArray
 * @returns {JSX.Element}
 */

function SubjectEditSkills ({ editSubject, editedSkillArray }) {
  const [skillTitleErrorIds, setSkillTitleErrorIds] = useState(/** @type {number[]} */[])
  const [skillDescriptionErrorIds, setSkillDescriptionErrorIds] = useState(/** @type {number[]} */[])
  const notifications = useNotifications()

  /**
   * @param {string} value
   * @param {React.Dispatch} setErrorIds
   * @param {number} skillIndex
   * @param {string} key
   * @returns {[boolean, Skill[] | null]} - [is valid?, value]
   */
  const validateText = (value, setErrorIds, skillIndex, key) => {
    if (value.length === 0) {
      setErrorIds((previousErrorIds) => [...previousErrorIds, skillIndex])
      return [false, null]
    } else {
      setErrorIds((previousErrorIds) => previousErrorIds.filter(id => id !== skillIndex))
      const updatedSkills = [...editedSkillArray]
      updatedSkills[skillIndex] = /** @type {Skill} */{ ...updatedSkills[skillIndex], [key]: value }

      return [true, updatedSkills]
    }
  }

  /**
   * @param {number} indexToDelete
   * @returns {null}
   */
  const handleSkillDelete = (indexToDelete) => {
    if (editedSkillArray.length <= 3) {
      notifications.show('Subject cannot have less number of skills than 3.', createNotificationProps(Severity.WARNING))
      return null
    }

    editedSkillArray = editedSkillArray.filter((_, index) => indexToDelete !== index)
    editSubject([true, editedSkillArray], 'skills')
  }

  const handleSkillAdd = () => {
    /** @type {Skill} */
    const emptySkill = {
      name: '',
      description: ''
    }

    editedSkillArray.push(emptySkill)
    editSubject([true, editedSkillArray], 'skills')
  }

  return (
        <div className="subject-edit-skills">
            {editedSkillArray.map((skill, index) => (
                <div className="subject-edit-skill-edit" key={`${skill.id}`}>
                    <div className="subject-edit-skill-edit-upper-panel">
                        <FormControl>
                            <Textarea
                                maxRows={1}
                                variant={(skillTitleErrorIds.includes(index)) ? 'outlined' : 'plain'}
                                error={skillTitleErrorIds.includes(index)}
                                className="subject-edit-skill-edit-upper-panel-title"
                                defaultValue={skill.name}
                                onChange={(e) => editSubject(validateText(e.target.value, setSkillTitleErrorIds, index, 'name'), 'skills')}
                                placeholder="Skill title"
                                spellCheck={false}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault()
                                  }
                                }}
                            />
                        </FormControl>
                        <img className="subject-edit-trash-icon" src={trashIcon} alt="trash-icon" onClick={() => handleSkillDelete(index)}></img>
                    </div>
                    <Textarea
                        id="outlined-basic"
                        variant="outlined"
                        className="subject-edit-skill-edit-description-input"
                        minRows={3}
                        maxRows={5}
                        error={skillDescriptionErrorIds.includes(index)}
                        onChange={(e) => editSubject(validateText(e.target.value, setSkillDescriptionErrorIds, index, 'description'), 'skills')}
                        defaultValue={skill.description}
                    />
                </div>
            ))}
            {editedSkillArray.length < 4 && (<div className="subject-edit-add-box">
                <img className="subject-edit-addButton" src={addIcon} onClick={handleSkillAdd} alt="addIcon"/>
            </div>)}
        </div>
  )
}

SubjectEditSkills.propTypes = {
  editSubject: PropTypes.func.isRequired,
  editedSkillArray: PropTypes.array.isRequired
}

export default SubjectEditSkills
