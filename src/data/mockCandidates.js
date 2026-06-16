import { createEmptyCandidate } from '../models/candidate';

const firstNames = [
  'Ana', 'Pedro', 'Lucía', 'Martín', 'Carmen', 'Diego', 'Sofía', 'Javier', 'Valentina', 'Alejandro',
  'Mariana', 'Tomás', 'Paula', 'Gabriel', 'Elena', 'Rodrigo', 'Isabella', 'Lucas', 'Camila', 'Mateo',
];

const lastNames = [
  'Gómez', 'Pérez', 'Martínez', 'Rodríguez', 'López', 'Sánchez', 'Ramírez', 'Fernández', 'Torres', 'Vargas',
  'Rojas', 'Castro', 'Díaz', 'Cruz', 'Morales', 'Silva', 'Flores', 'Molina', 'Reyes', 'Herrera',
];

const genders = ['Femenino', 'Masculino', 'No binario', 'Prefiero no decirlo'];
const nationalities = ['México', 'Argentina', 'Colombia', 'Chile', 'España', 'Perú', 'Uruguay', 'Costa Rica'];
const countries = ['México', 'Argentina', 'Colombia', 'Chile', 'España', 'Perú', 'Uruguay', 'Costa Rica'];
const cities = ['Ciudad de México', 'Buenos Aires', 'Medellín', 'Santiago', 'Madrid', 'Lima', 'Montevideo', 'San José'];
const provinces = ['Ciudad de México', 'Buenos Aires', 'Antioquia', 'Región Metropolitana', 'Comunidad de Madrid', 'Lima', 'Montevideo', 'San José'];
const positions = [
  'Consultor de RRHH', 'Especialista en Talento', 'Recruiter', 'Coordinador de Selección', 'HR Business Partner',
  'Analista de Compensaciones', 'Talent Acquisition Partner', 'Líder de Desarrollo Organizacional',
  'Gerente de Employer Branding', 'Analista de Personas',
];
const seniorities = ['Junior', 'Semi-Senior', 'Senior', 'Lead'];
const workModes = ['Presencial', 'Híbrida', 'Remota'];
const availabilityOptions = ['Inmediata', '1-2 semanas', '2-4 semanas', 'Disponible bajo aviso'];
const statuses = ['Disponible', 'En proceso', 'Contratado', 'No disponible'];

const candidates = Array.from({ length: 100 }, (_, index) => {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[index % lastNames.length];
  const gender = genders[index % genders.length];
  const nationality = nationalities[index % nationalities.length];
  const country = countries[index % countries.length];
  const city = cities[index % cities.length];
  const province = provinces[index % provinces.length];
  const currentPosition = positions[index % positions.length];
  const seniority = seniorities[index % seniorities.length];
  const workMode = workModes[index % workModes.length];
  const availability = availabilityOptions[index % availabilityOptions.length];
  const status = statuses[index % statuses.length];
  const year = 1985 + ((index * 3) % 18);
  const month = 1 + ((index * 7) % 12);
  const day = 1 + ((index * 5) % 28);
  const createdDay = 1 + ((index * 3) % 30);
  const updatedDay = Math.min(28, createdDay + (index % 6));
  const dni = String(41000000 + index * 137).padStart(8, '0');

  const firstNameSlug = firstName.toLowerCase().replace(/\s+/g, '');
  const lastNameSlug = lastName.toLowerCase().replace(/\s+/g, '');
  const email = `${firstNameSlug}.${lastNameSlug}${index + 1}@example.com`;
  const phoneCode = ['+52', '+54', '+57', '+56', '+34', '+51', '+598', '+506'][index % 8];
  const phone = `${phoneCode} ${7000 + (index % 3000)} ${1000 + (index % 9000)}`;
  const address = `Calle ${index + 10} #${100 + (index % 90)}-${20 + (index % 70)}`;
  const cvFileName = index % 7 === 0 ? `cv-${firstNameSlug}-${lastNameSlug}.pdf` : '';
  const cvFileUrl = cvFileName ? `https://example.com/cv/${cvFileName}` : '';
  const linkedinUrl = `https://www.linkedin.com/in/${firstNameSlug}${lastNameSlug}${index + 1}`;
  const portfolioUrl = index % 4 === 0 ? `https://portfolio.example.com/${firstNameSlug}${lastNameSlug}` : '';

  return {
    ...createEmptyCandidate(),
    id: `cand-${String(index + 1).padStart(3, '0')}`,
    firstName,
    lastName,
    dni,
    birthDate: new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`).toISOString(),
    gender,
    nationality,
    email,
    phone,
    address,
    city,
    province,
    country,
    currentPosition,
    seniority,
    expectedSalary: 45000 + ((index % 12) * 5000),
    workMode,
    availability,
    linkedinUrl,
    portfolioUrl,
    cvFileUrl,
    cvFileName,
    status,
    createdAt: new Date(`2026-${String(((createdDay % 12) + 1)).padStart(2, '0')}-${String((createdDay % 28) + 1).padStart(2, '0')}`).toISOString(),
    updatedAt: new Date(`2026-${String(((createdDay % 12) + 1)).padStart(2, '0')}-${String(updatedDay).padStart(2, '0')}`).toISOString(),
  };
});

export default candidates;
