import React from 'react'
import PropTypes from 'prop-types'

/**
 * @param {Function} onClick
 * @param {SubjectView} subject
 * @param {number} subjectIndex
 */

function SubjectListComponent ({ onClick, subject, subjectIndex }) {
  const skillListTitles = subject.skills && subject.skills.length
    ? subject.skills.map((skill, index) => (
            `${skill.name}${index + 1 !== subject.skills.length ? ', ' : ''}`
    )).join('')
    : ''

  return (
        <div className="subject-list-component" key={`${subject.name}-${subjectIndex}`} onClick={onClick}>
            {subject.displaySemesterName && <div className="subject-list-component-semesterName">{'semester ' + subject.semester}</div>}
            <div className="subject-list-component-box">
                <div className="subject-list-component-left-part">
                    <div className="subject-list-component-title">{subject.name}</div>
                    <div className="subject-list-component-skills">
                        {'Skills: ' + skillListTitles}
                    </div>
                </div>
                <div className="subject-list-component-right-part">
                    {subject.professorLecture && <div className="subject-list-component-lec-prof-box">
                        <span>Lec.</span>
                        <span>{subject.professorLecture}</span>
                    </div>}
                    {subject.professorLaboratories && <div className="subject-list-component-lab-prof-box">
                        <span>Lab.</span>
                        <span>{subject.professorLaboratories}</span>
                    </div>}
                </div>
            </div>
        </div>
  )
}

SubjectListComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  subject: PropTypes.object.isRequired,
  subjectIndex: PropTypes.number.isRequired
}

export default SubjectListComponent
