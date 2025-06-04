import React from 'react'
import PropTypes from 'prop-types'
import SubjectTeacherBox from './subject-teacher-box'
import { SubjectType } from '../../../internal/types/teacher'

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
                    <SubjectTeacherBox
                        teachers={subject.teachers.filter(teacher => teacher.subjectType === SubjectType.LECTURE) || []}
                        title={'Lec: '}
                    />
                    <SubjectTeacherBox
                        teachers={subject.teachers.filter(teacher => teacher.subjectType === SubjectType.LABORATORY) || []}
                        title={'Lab: '}
                    />
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
