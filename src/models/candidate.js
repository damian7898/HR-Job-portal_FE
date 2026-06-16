/**
 * @typedef {Object} Candidate
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} dni
 * @property {string} birthDate
 * @property {string} gender
 * @property {string} nationality
 * @property {string} email
 * @property {string} phone
 * @property {string} address
 * @property {string} city
 * @property {string} province
 * @property {string} country
 * @property {string} currentPosition
 * @property {string} seniority
 * @property {number} expectedSalary
 * @property {string} workMode
 * @property {string} availability
 * @property {string} linkedinUrl
 * @property {string} portfolioUrl
 * @property {string} cvFileUrl
 * @property {string} cvFileName
 * @property {string} status
 * @property {string} createdAt
 * @property {string} updatedAt
 */

export function createEmptyCandidate() {
  return {
    id: '',
    firstName: '',
    lastName: '',
    dni: '',
    birthDate: '',
    gender: '',
    nationality: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    country: '',
    currentPosition: '',
    seniority: '',
    expectedSalary: 0,
    workMode: '',
    availability: '',
    linkedinUrl: '',
    portfolioUrl: '',
    cvFileUrl: '',
    cvFileName: '',
    status: 'Disponible',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
