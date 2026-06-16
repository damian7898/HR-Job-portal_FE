import { Chip } from '@mui/material';

const statusSx = {
  Disponible: { sx: { backgroundColor: 'var(--color-success)', color: 'var(--color-primary-foreground)' } },
  'En proceso': { sx: { backgroundColor: 'var(--color-warning)', color: 'var(--color-text)' } },
  Contratado: { sx: { backgroundColor: 'var(--color-primary)', color: 'var(--color-primary-foreground)' } },
  'No disponible': { sx: { backgroundColor: 'var(--color-border)', color: 'var(--color-text)' } },
};

function CandidateStatusChip({ status }) {
  const entry = statusSx[status];
  const sx = entry ? entry.sx : { backgroundColor: 'var(--color-border)', color: 'var(--color-text)' };
  return <Chip label={status} size="small" sx={sx} />;
}

export default CandidateStatusChip;
