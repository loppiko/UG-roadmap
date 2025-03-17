/**
 * @typedef {object} Subject
 * @property {string} name
 * @property {string} id
 * @property {number} ECTS
 * @property {number} semester
 * @property {number} lectureHours
 * @property {number} laboratoryHours
 * @property {Skill[]} skills
 * @property {string} description
 * @property {string} language
 * @property {string} professorLecture
 * @property {string} professorLaboratories
 * @property {string} link
 */

/**
 * @typedef {Subject & object} SubjectView
 * @property {boolean} displaySemesterName
 */
