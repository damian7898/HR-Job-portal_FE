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
