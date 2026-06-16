export function formatCurrency(amount) {
  return amount
    ? new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        maximumFractionDigits: 0,
      }).format(amount)
    : 'N/A';
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(date);
}

export const areas = ['Talento', 'Reclutamiento', 'Marca Empleadora', 'Compensaciones'];
export const modalidades = ['Presencial', 'Híbrido', 'Remoto'];
export const seniorities = ['Junior', 'Semi-Senior', 'Senior'];
export const genders = ['Masculino', 'Femenino', 'No binario', 'Prefiero no decirlo'];
export const nationalities = ['México', 'Argentina', 'Colombia', 'Chile', 'España', 'Perú'];
export const workModes = ['Presencial', 'Híbrida', 'Remota'];
export const availabilityOptions = ['Inmediata', '1-2 semanas', '2-4 semanas', 'Disponible bajo aviso'];
export const candidateStatuses = ['Disponible', 'En proceso', 'Contratado', 'No disponible'];
