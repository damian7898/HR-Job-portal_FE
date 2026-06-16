/**
 * @typedef {Object} JobPosition
 * @property {string} id
 * @property {string} titulo
 * @property {string} area
 * @property {string} modalidad
 * @property {string} seniority
 * @property {string} descripcion
 * @property {string[]} requisitos
 * @property {number} salarioMinimo
 * @property {number} salarioMaximo
 * @property {string} ubicacion
 * @property {string} fechaPublicacion
 * @property {string} estado
 */

export function createEmptyJob() {
  return {
    id: '',
    titulo: '',
    area: '',
    modalidad: '',
    seniority: '',
    descripcion: '',
    requisitos: [''],
    salarioMinimo: 0,
    salarioMaximo: 0,
    ubicacion: '',
    fechaPublicacion: new Date().toISOString(),
    estado: 'Activo',
  };
}
