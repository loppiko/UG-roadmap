/**
 * @typedef {object} Teacher
 * @property {string} id
 * @property {string} givenName
 * @property {string} surname
 * @property {string} mail
 */

/**
 * @typedef {Teacher & object} AssignedTeacher
 * @property {'Laboratory' | 'Lecture'} subjectType
 */

export const SubjectType = {
  LECTURE: 'Lecture',
  LABORATORY: 'Laboratory'
}

/**
 * @param {Teacher} teacher
 * @param {'Laboratory' | 'Lecture'} subjectType
 * @returns {AssignedTeacher}
 */
export function teacherToAssignedTeacher (teacher, subjectType) {
  return {
    ...teacher,
    subjectType
  }
}

/**
 * @param {AssignedTeacher} assignedTeacher
 * @returns {Teacher}
 */
export function assignedTeacherToTeacher (assignedTeacher) {
  return {
    id: assignedTeacher.id,
    givenName: assignedTeacher.givenName,
    surname: assignedTeacher.surname,
    mail: assignedTeacher.mail
  }
}
