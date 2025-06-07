/**
 * @typedef {object} Subject
 * @property {string} name
 * @property {string} id
 * @property {number} ECTS
 * @property {number} semester
 * @property {number} letureHours
 * @property {number} laboratoryHours
 * @property {Skill[]} skills
 * @property {string} description
 * @property {string} language
 * @property {AssignedTeacher[] | undefined} teachers
 */

/**
 * @typedef {Subject & object} SubjectView
 * @property {boolean} displaySemesterName
 */

/**
 * @param {Subject} subject
 * @returns {[boolean, string]} [isValid, message]
 */
export function validateSubject (subject) {
  if (!subject.name) return [false, 'Subject name is required']
  if (!subject.description) return [false, 'Description is required']
  if (subject.skills.length < 3 || subject.skills.length > 4) return [false, 'Subject must have 3 or 4 skills']

  let counter = 1

  for (const skill of subject.skills) {
    if (!skill.name) return [false, `Skill name is required (Skill ${counter})`]
    if (!skill.description) return [false, `Skill description is required (Skill ${counter})`]
    counter++
  }
  return [true, '']
}

export const AVAILABLE_SEMESTERS = [1, 2, 3, 4, 5, 6]
