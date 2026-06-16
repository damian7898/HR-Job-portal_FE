import { Chip } from '@mui/material';

const statusSx = {
  Disponible: { sx: { backgroundColor: 'rgba(26,127,55,.15)', color: '#1a7f37', fontWeight: 700 } },
  'En proceso': { sx: { backgroundColor: 'rgba(210,153,34,.15)', color: '#9a6700', fontWeight: 700 } },
  Contratado: { sx: { backgroundColor: 'rgba(47,129,247,.15)', color: '#0969da', fontWeight: 700 } },
  'No disponible': { sx: { backgroundColor: 'rgba(101,109,118,.15)', color: '#656d76', fontWeight: 700 } },
};

function CandidateStatusChip({ status }) {
  const entry = statusSx[status];
  const sx = entry ? entry.sx : { backgroundColor: 'var(--color-border)', color: 'var(--color-text)' };
  return <Chip label={status} size="small" sx={sx} />;
}

export default CandidateStatusChip;
