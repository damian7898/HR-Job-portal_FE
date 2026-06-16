import { createEmptyJob } from '../models/jobPosition';

const areas = ['Talento', 'Reclutamiento', 'Marca Empleadora', 'Compensaciones', 'Bienestar', 'Formación'];
const modalidades = ['Presencial', 'Híbrido', 'Remoto'];
const seniorities = ['Junior', 'Semi-Senior', 'Senior', 'Lead'];
const titles = [
  'Analista de Recursos Humanos',
  'Especialista en Desarrollo Organizacional',
  'Coordinador de Selección',
  'Talent Acquisition Partner',
  'Partner de Employer Branding',
  'Analista de Compensaciones',
  'Consultor de Talento',
  'Líder de Reclutamiento',
  'Gerente de Personas',
  'Especialista en Diversidad e Inclusión',
  'Coordinador de Onboarding',
  'Especialista en Employer Experience',
  'Analista de HR Analytics',
  'Consultor de Cambio Organizacional',
  'Manager de Cultura',
];
const locations = [
  'Ciudad de México',
  'Buenos Aires',
  'Medellín',
  'Santiago',
  'Madrid',
  'Lima',
  'Monterrey',
  'Guadalajara',
  'Bogotá',
  'Puebla',
  'Querétaro',
  'Rosario',
];
const states = ['Activo', 'Cerrado', 'Pendiente'];

const baseDescriptions = [
  'Gestiona procesos clave de talento y desarrollo organizacional.',
  'Coordina búsquedas, entrevistas y procesos de selección.',
  'Diseña estrategias de reclutamiento y retención de talento.',
  'Lidera iniciativas de formación y bienestar laboral.',
  'Analiza datos de RRHH para mejorar decisiones estratégicas.',
  'Impulsa la cultura organizacional y el compromiso interno.',
];

const requirements = [
  ['Comunicación efectiva', 'Trabajo en equipo', 'Orientación a resultados'],
  ['Conocimiento de ATS', 'Experiencia en selección', 'Habilidades interpersonales'],
  ['Analítica de datos', 'Excel avanzado', 'Presentación de informes'],
  ['Gestión de proyectos', 'Liderazgo', 'Pensamiento estratégico'],
  ['Orientación al servicio', 'Resolución de conflictos', 'Proactividad'],
  ['Capacidad de adaptación', 'Gestión del cambio', 'Visión global'],
];

const mockJobs = Array.from({ length: 100 }, (_, index) => {
  const area = areas[index % areas.length];
  const modalidad = modalidades[index % modalidades.length];
  const seniority = seniorities[index % seniorities.length];
  const title = titles[index % titles.length];
  const ubicacion = locations[index % locations.length];
  const descripcion = baseDescriptions[index % baseDescriptions.length];
  const requisitos = requirements[index % requirements.length];
  const salarioBase = 45000 + (index % 12) * 5000;
  const salarioMinimo = salarioBase;
  const salarioMaximo = salarioBase + 20000;
  const fechaPublicacion = new Date(2026, index % 12, (index % 28) + 1).toISOString();
  const estado = states[index % states.length];

  return {
    ...createEmptyJob(),
    id: `job-${String(index + 1).padStart(3, '0')}`,
    titulo: `${title} ${index + 1}`,
    area,
    modalidad,
    seniority,
    descripcion,
    requisitos,
    salarioMinimo,
    salarioMaximo,
    ubicacion,
    fechaPublicacion,
    estado,
  };
});

export default mockJobs;
